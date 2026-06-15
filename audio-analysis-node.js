#!/usr/bin/env node
/**
 * ShakeSecret — Audio Feature Extraction via Node.js (no numpy/scipy needed)
 * Uses raw WAV parsing + simple DSP for acoustic feature extraction.
 * Calibrates GENES parameters from real box recordings.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BASE = path.join(__dirname, 'sfx_output');
const OUT_DIR = path.join(__dirname, 'audio_analysis');

// ========== Simple DSP utilities ==========
class FloatArray {
  constructor(arr) { this.data = arr; }
  get length() { return this.data.length; }
  get(i) { return this.data[i]; }

  // Moving average smoothing
  static smooth(arr, window) {
    const out = new Array(arr.length);
    const hw = Math.floor(window / 2);
    for (let i = 0; i < arr.length; i++) {
      let sum = 0, count = 0;
      for (let j = Math.max(0, i - hw); j <= Math.min(arr.length - 1, i + hw); j++) {
        sum += arr[j]; count++;
      }
      out[i] = sum / count;
    }
    return out;
  }

  // Simple peak detection
  static findPeaks(data, minDistance, minProminence) {
    const peaks = [];
    const n = data.length;
    
    // Find local maxima
    for (let i = 1; i < n - 1; i++) {
      if (data[i] > data[i-1] && data[i] > data[i+1]) {
        // Check prominence against neighbors
        let leftMin = data[i], rightMin = data[i];
        for (let j = i-1; j > Math.max(0,i-minDistance); j--) leftMin = Math.min(leftMin, data[j]);
        for (let j = i+1; j < Math.min(n,i+minDistance); j++) rightMin = Math.min(rightMin, data[j]);
        const prom = data[i] - Math.max(leftMin, rightMin);
        
        if (prom > minProminence) peaks.push({ idx: i, val: data[i], prom });
      }
    }

    // Sort by prominence descending
    peaks.sort((a,b) => b.prom - a.prom);

    // Greedy selection: pick highest prominence, remove neighbors within minDistance
    const selected = [];
    const used = new Set();
    for (const p of peaks) {
      if (used.has(p.idx)) continue;
      selected.push(p);
      for (let d = -minDistance; d <= minDistance; d++) used.add(p.idx + d);
    }

    // Re-sort by index
    selected.sort((a,b) => a.idx - b.idx);
    return selected;
  }
}

// Read WAV file manually
function readWav(filepath) {
  const buf = fs.readFileSync(filepath);

  // Parse RIFF header
  const riff = buf.toString('ascii', 0, 4);
  console.assert(riff === 'RIFF', 'Not a valid WAV file');
  
  const wave = buf.toString('ascii', 8, 12);
  console.assert(wave === 'WAVE', 'Missing WAVE chunk');
  
  // Find fmt chunk
  let pos = 12;
  while (pos < buf.length) {
    const chunkId = buf.toString('ascii', pos, pos + 4);
    const chunkSize = buf.readUInt32LE(pos + 4);

    if (chunkId === 'fmt ') {
      const audioFormat = buf.readUInt16LE(pos + 8); // 1=PCM, 3=float
      const numChannels = buf.readUInt16LE(pos + 10);
      const sampleRate = buf.readUInt32LE(pos + 12);
      const bitsPerSample = buf.readUInt16LE(pos + 22);

      // Find data chunk
      let dataPos = pos + 8 + chunkSize;
      while (dataPos < buf.length - 8) {
        const dcId = buf.toString('ascii', dataPos, dataPos + 4);
        const dcSize = buf.readUInt32LE(dataPos + 4);
        if (dcId === 'data') {
          const rawData = Buffer.from(buf.buffer, buf.byteOffset + dataPos + 8, dcSize);

          // Convert to float array
          let samples;
          if (bitsPerSample === 16) {
            samples = new Float32Array(rawData.length / 2);
            for (let i = 0; i < samples.length; i++) {
              samples[i] = rawData.readInt16LE(i * 2) / 32768.0;
            }
          } else if (bitsPerSample === 24) {
            samples = new Float32Array(Math.floor(rawData.length / 3));
            for (let i = 0; i < samples.length; i++) {
              const b0 = rawData[i*3];
              const b1 = rawData[i*3+1];
              const b2 = rawData[i*3+2];
              const val = (b2 << 16 | (b1 << 8) | b0) >> 8; // Sign extend from 24-bit
              samples[i] = val / 8388608.0;
            }
          } else if (bitsPerSample === 32 && audioFormat === 3) {
            samples = new Float32Array(rawData.buffer, rawData.byteOffset, rawData.length / 4);
          } else {
            throw new Error(`Unsupported format: ${bitsPerSample}bit fmt=${audioFormat}`);
          }

          // Mix to mono if stereo
          if (numChannels > 1) {
            const mono = new Float32Array(samples.length / numChannels);
            for (let i = 0; i < mono.length; i++) {
              let sum = 0;
              for (let c = 0; c < numChannels; c++) sum += samples[i * numChannels + c];
              mono[i] = sum / numChannels;
            }
            samples = mono;
          }

          return { sampleRate, bitsPerSample, duration: samples.length / sampleRate, samples };
        }
        dataPos += 8 + ((dcSize + 1) & ~1); // Align to 2 bytes
      }
      break;
    }
    pos += 8 + ((chunkSize + 1) & ~1);
  }

  throw new Error('Could not find data chunk in WAV file');
}

// Simple DFT at specific frequencies (much cheaper than full FFT)
function energyAtFrequency(samples, sr, freqHz, bandwidth) {
  // Goertzel-like approach: correlate with sine wave at target frequency
  const k = Math.round(freqHz / sr * samples.length);
  const N = samples.length;
  let real = 0, imag = 0;
  for (let n = 0; n < N; n++) {
    const angle = 2 * Math.PI * freqHz * n / sr;
    real += samples[n] * Math.cos(angle);
    imag += samples[n] * Math.sin(angle);
  }
  return (real * real + imag * imag) / (N * N);
}

function analyzeSegment(samples, sr, startIdx, winSamples) {
  const s = Math.max(0, startIdx);
  const e = Math.min(samples.length, s + winSamples);
  const seg = samples.slice(s, e);
  const n = seg.length;
  if (n < 64) return null;

  // Compute RMS
  let rms = 0;
  for (let i = 0; i < n; i++) rms += seg[i]*seg[i];
  rms = Math.sqrt(rms / n);

  // Energy bands
  const lowE = energyAtFrequency(seg, sr, 200, 100);   // 80-500Hz band proxy
  const midE = energyAtFrequency(seg, sr, 1200, 300);  // 500-2000Hz
  const highE = energyAtFrequency(seg, sr, 4000, 800);  // 2000-8000Hz
  const total = lowE + midE + highE;

  if (total < 1e-15) return { rms, peakFreq: 0, centroid: 0, lowR: 0, midR: 0, highR: 0 };

  // Peak frequency estimate (check multiple frequencies)
  const testFreqs = [80, 150, 250, 350, 500, 750, 1000, 1500, 2000, 3000, 4000, 6000];
  let maxE = 0, maxF = 100;
  for (const f of testFreqs) {
    const e = energyAtFrequency(seg, sr, f, f*0.5);
    if (e > maxE) { maxE = e; maxF = f; }
  }

  // Spectral centroid estimate
  let weightedSum = 0;
  for (const f of testFreqs) {
    const e = energyAtFrequency(seg, sr, f, f*0.5);
    weightedSum += f * e;
  }
  const centroid = total > 0 ? weightedSum / total : 1000;

  return {
    rms,
    peakFreq: maxF,
    centroid,
    lowR: total > 0 ? lowE / total : 0,
    midR: total > 0 ? midE / total : 0,
    highR: total > 0 ? highE / total : 0,
    db: rms > 0 ? 20 * Math.log10(rms) : -60,
  };
}

// Decay measurement after impact
function measureDecay(samples, sr, peakIdx, lookAheadMs) {
  const end = Math.min(samples.length, peakIdx + Math.floor(sr * lookAheadMs / 1000));
  if (end <= peakIdx) return { decayMs: 50, rt60Estimate: 300 };

  let maxVal = 0;
  for (let i = peakIdx; i < Math.min(peakIdx + 50, end); i++) {
    maxVal = Math.max(maxVal, Math.abs(samples[i]));
  }
  
  const threshold = maxVal * 0.1;
  let crossIdx = end - peakIdx;
  for (let i = peakIdx; i < end; i++) {
    if (Math.abs(samples[i]) < threshold) {
      crossIdx = i - peakIdx;
      break;
    }
  }

  const decayMs = crossIdx / sr * 1000;
  // Extrapolate RT60 from -20dB point
  const rt60 = decayMs * 3; // rough approximation

  return { 
    decayMs: Math.round(decayMs), 
    rt60Estimate: Math.min(Math.round(rt60), 999),
    peakAmp: parseFloat(maxVal.toFixed(4))
  };
}


// ========== Main Analysis ==========
function analyzeFile(filename, label) {
  const filepath = path.join(BASE, filename);
  console.log(`\n${'='.repeat(58)}`);
  console.log(`Analyzing: ${label} (${filename})`);
  console.log(`${'='.split('').join('=').slice(0,58)}`);

  const { sampleRate: sr, duration, samples } = readWav(filepath);
  console.log(`Duration: ${duration.toFixed(2)}s | SR: ${sr}Hz | Samples: ${samples.length}`);

  // Build envelope
  const envelope = new Float32Array(samples.length);
  for (let i = 0; i < samples.length; i++) envelope[i] = Math.abs(samples[i]);

  // Smooth envelope (10ms window)
  const smoothWin = Math.max(3, Math.floor(sr * 0.008));
  const smoothed = new Float32Array(envelope.length);
  for (let i = 0; i < envelope.length; i++) {
    let sum = 0, cnt = 0;
    for (let j = Math.max(0, i-smoothWin); j <= Math.min(envelope.length-1, i+smoothWin); j++) {
      sum += envelope[j]; cnt++;
    }
    smoothed[i] = sum / cnt;
  }

  // Detect impact events
  const maxAmp = Math.max(...smoothed);
  if (maxAmp < 0.01) {
    console.log('WARNING: Signal too quiet, no impacts detected.');
    return null;
  }

  const minDist = Math.floor(sr * 0.12);  // 120ms between impacts
  const minProm = maxAmp * 0.18;

  const peaksRaw = [];
  for (let i = 2; i < smoothed.length - 2; i++) {
    if (smoothed[i] > smoothed[i-1] && smoothed[i] > smoothed[i+1]) {
      let lo = smoothed[i], hi = smoothed[i];
      for (let j = Math.max(0, i-minDist); j < i; j++) lo = Math.min(lo, smoothed[j]);
      for (let j = i+1; j < Math.min(smoothed.length, i+minDist); j++) hi = Math.min(hi, smoothed[j]);
      const prom = smoothed[i] - Math.max(lo, hi);
      if (prom > minProm) peaksRaw.push({ idx: i, amp: smoothed[i], prom });
    }
  }

  // Select non-overlapping peaks by prominence
  peaksRaw.sort((a,b) => b.prom - a.prom);
  const selected = [];
  const used = new Set();
  for (const p of peaksRaw) {
    if (used.has(p.idx)) continue;
    selected.push({ ...p });
    for (let d = -minDist; d <= minDist; d++) used.add(p.idx + d);
  }
  selected.sort((a,b) => a.idx - b.idx);

  console.log(`Impact events: ${selected.length}`);

  if (selected.length === 0) return null;

  const intervals = [];
  for (let i = 1; i < selected.length; i++) intervals.push((selected[i].idx - selected[i-1].idx) / sr * 1000);
  const avgInterval = intervals.length > 0 ? intervals.reduce((a,b)=>a+b,0)/intervals.length : 0;

  console.log(`Avg interval: ${avgInterval.toFixed(0)}ms`);

  // Analyze each impact
  const impacts = [];
  let totalLowE = 0, totalHighE = 0, totalDecay = 0, totalDb = 0;
  const winMs = 55; // 55ms analysis window around each impact

  for (let i = 0; i < Math.min(selected.length, 15); i++) {
    const pk = selected[i];
    const spec = analyzeSegment(samples, sr, pk.idx - Math.floor(sr*0.01), Math.floor(sr*winMs/1000));
    const decay = measureDecay(samples, sr, pk.idx, 450);

    if (!spec) continue;

    impacts.push({
      n: i+1,
      timeMs: Math.round(pk.idx/sr*1000),
      amp: parseFloat(pk.amp.toFixed(4)),
      ...spec,
      ...decay
    });

    totalLowE += spec.lowR;
    totalHighE += spec.highR;
    totalDecay += decay.decayMs;
    totalDb += spec.db;
  }

  const nImpacts = impacts.length;
  if (nImpacts === 0) return null;

  // Summary — maps to our GENES params
  const summary = {
    file_label: label,
    file: filename,
    duration_s: parseFloat(duration.toFixed(2)),
    sr: sr,
    impact_count: selected.length,
    impacts_per_sec: parseFloat((selected.length/duration).toFixed(2)),
    avg_interval_ms: parseFloat(avgInterval.toFixed(0)),

    // GENES mapping:
    mass_proxy:     parseFloat((totalDb/nImpacts).toFixed(1)),       // loudness → mass
    fill_proxy:     parseFloat((totalLowE/nImpacts).toFixed(3)),     // low-freq energy → fill (hollow vs solid)
    looseness_proxy: (()=>{                                          // variance in decay → wobble space
      if(nImpacts<2) return 0.3;
      let v=0,m=totalDecay/nImpacts;
      for(const im of impacts){v+=Math.pow(im.decayMs-m,2);}
      return parseFloat(Math.sqrt(v/(nImpacts-1))/(m||1).toFixed(3));
    })(),
    parts_proxy:    parseFloat((selected.length/Math.max(duration,1)*2).toFixed(1)), // impact density → parts rattling
    pitch_proxy:    (()=>{                                          // spectral centroid → pitch
      let wc=0,wt=0;
      for(const im of impacts){wc+=im.centroid*(im.db+60); wt+=(im.db+60);}
      return parseFloat((wc/(wt||1)).toFixed(0));
    })(),
    click_proxy:    parseFloat((totalHighE/nImpacts).toFixed(3)),    // high-freq energy → accessory clicks

    avg_decay_ms:   Math.round(totalDecay/nImpacts),
    avg_db:         parseFloat((totalDb/nImpacts).toFixed(1)),
    
    details: impacts.slice(0, 6),
  };

  // Print
  console.log(`\n─── Acoustic Profile ───`);
  console.log(`Mass (loudness):    ${summary.mass_proxy} dB → gene.mass ≈ ${mappingHelpers.mass_db_to_mass(summary.mass_proxy).toFixed(2)}`);
  console.log(`Fill (low-freq):    ${summary.fill_proxy} → gene.fill ≈ ${mappingHelpers.mass_fill_from_low_energy(summary.fill_proxy).toFixed(2)}`);
  console.log(`Looseness (var):    ${summary.looseness_proxy} → gene.looseness ≈ ${mappingHelpers.looseness_from_var(summary.looseness_proxy).toFixed(2)}`);
  console.log(`Parts (impacts):    ${summary.parts_proxy} → gene.parts ≈ ${Math.round(summary.parts_proxy)}`);
  console.log(`Pitch (centroid):   ${summary.pitch_proxy} Hz`);
  console.log(`Click (high-freq):  ${summary.click_proxy} → gene.parts bonus: ${summary.click_proxy>0.25?'+1':'±0'}`);
  console.log(`Decay:              ${summary.avg_decay_ms} ms`);

  return summary;
}

// Mapping helpers (attached to summary object for convenience)
const mappingHelpers = {
  mass_db_to_mass(db) {
    // Map dB range (~-30 to -5) to mass range (0.7–1.4)
    return Math.max(0.65, Math.min(1.4, 0.65 + (db+35)*0.02));
  },
  mass_fill_from_low_energy(le) {
    // Low energy ratio 0.2→hollow(fill=.45), 0.7→solid(fill=.9)
    return Math.max(0.4, Math.min(0.95, 0.3 + le * 0.85));
  },
  looseness_from_var(v) {
    // Variance 0→tight(loose=.1), 0.5+→loose(loose=.6)
    return Math.max(0.1, Math.min(0.65, 0.08 + v * 1.1));
  },
  mass_pitch_from_centroid(hz) {
    // Centroid 300Hz→pitch=1.3(high), 1500Hz→pitch=0.85(low)
    return parseFloat(Math.max(0.8, Math.min(1.35, 1.4 - hz * 0.00037)).toFixed(2));
  }
};

Object.assign(mappingHelpers);


// ===== MAIN =====
console.log('ShakeSecret — Real Box Recording Acoustic Analysis');
console.log('(Pure Node.js, no scipy/numpy dependency)\n');

const files = [
  ['摇晃1_clean.wav', 'Box #1'],
  ['摇晃2_clean.wav', 'Box #2'],
  ['摇晃3_clean.wav', 'Box #3'],
];

const results = [];
for (const [fn, label] of files) {
  const fp = path.join(BASE, fn);
  if (fs.existsSync(fp)) {
    const r = analyzeFile(fn, label);
    if (r) results.push(r);
  } else {
    console.log(`File not found: ${fp}`);
  }
}

// Comparison table
if (results.length >= 2) {
  console.log(`\n${'='.repeat(72)}`);
  console.log('COMPARISON TABLE → GENES calibration values');
  console.log(`${'='.repeat(72)}`);
  console.log(
    `|${'Box'.padEnd(8)}|${'mass'.padStart(6)}|${'fill'.padStart(6)}|${'loose'.padStart(6)}|${'parts'.padStart(6)}|${'pitch'.padStart(7)}|${'click'.padStart(6)}|`
  );
  console.log('|--------|------|------|------|------|-------|------|');
  
  for (const r of results) {
    const m = mappingHelpers.mass_db_to_mass(r.mass_proxy);
    const f = mappingHelpers.mass_fill_from_low_energy(r.fill_proxy);
    const l = mappingHelpers.looseness_from_var(r.looseness_proxy);
    const p = Math.round(r.parts_proxy);
    console.log(
      `|${r.file_label.padEnd(8)}|${m.toFixed(2).padStart(6)}|${f.toFixed(2).padStart(6)}|${l.toFixed(2).padStart(6)}|${String(p).padStart(6)}|${r.pitch_proxy.toString().padStart(7)}|${r.click_proxy.toFixed(2).padStart(6)}|`
    );
  }
}

// Save results
const outPath = path.join(OUT_DIR, 'acoustic_analysis_results.json');
fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
console.log(`\nResults saved: ${outPath}`);

// Generate calibrated GENES suggestion
if (results.length >= 3) {
  console.log(`\n${'='.repeat(72)}`);
  console.log('SUGGESTED CALIBRATED GENES (based on recordings)');
  console.log(`${'='.repeat(72)}`);

  // Sort by mass to identify which is "heavy" vs "light"
  const sorted = [...results].sort((a,b)=>b.mass_proxy-a.mass_proxy);
  
  for (const r of sorted) {
    const m = mappingHelpers.mass_db_to_mass(r.mass_proxy);
    const f = mappingHelpers.mass_fill_from_low_energy(r.fill_proxy);
    const l = mappingHelpers.looseness_from_var(r.looseness_proxy);
    const p = Math.round(Math.max(1, r.parts_proxy));
    const extraClick = r.click_proxy > 0.28 ? 1 : 0;
    const pt = mappingHelpers.mass_pitch_from_centroid(r.pitch_proxy);
    
    console.log(`\n${r.file_label}:`);
    console.log(`  { mass:${m.toFixed(2)}, parts:${p+extraClick}, fill:${f.toFixed(2)}, looseness:${l.toFixed(2)}, pitch:${pt.toFixed(2)} }`);
  }
}
