#!/usr/bin/env python3
"""
ShakeSecret — Real Box Recording Acoustic Analysis
Extracts features from the 3 m4a recordings to calibrate GENES parameters.
Focus: impact event detection, frequency spectrum, decay characteristics.
"""

import numpy as np
from scipy.io import wavfile
from scipy.signal import find_peaks, spectrogram
from scipy.ndimage import uniform_filter1d, maximum_filter1d
import json, os

BASE = "/Users/allenzqwei/WorkBuddy/2026-06-13-02-33-08/sfx_output"
OUT_DIR = "/Users/allenzqwei/WorkBuddy/2026-06-13-02-33-08/audio_analysis"

def load_wav(path):
    sr, data = wavfile.read(path)
    if data.ndim == 2:
        data = data.mean(axis=1).astype(np.float32)
    if data.dtype == np.int16:
        data = data.astype(np.float32) / 32768.0
    elif data.dtype == np.int32:
        data = data.astype(np.float32) / 2147483648.0
    return sr, data

def detect_impacts(data, sr, min_interval_ms=100):
    """Detect distinct shake/impact events in the audio."""
    envelope = np.abs(data)
    # Smooth envelope
    window_samples = int(sr * 0.008)  # 8ms smoothing
    if window_samples < 3: window_samples = 3
    envelope_smooth = uniform_filter1d(envelope, size=window_samples)
    
    # Find peaks - need reasonable prominence to avoid noise
    min_distance = int(sr * min_interval_ms / 1000)
    max_amp = np.max(envelope_smooth)
    
    if max_amp < 0.01:
        return [], [], [], envelope_smooth
    
    prominence = max_amp * 0.15  # Need at least 15% of peak amplitude
    
    peaks, props = find_peaks(
        envelope_smooth,
        distance=min_distance,
        prominence=prominence,
        width=int(sr * 0.01),  # At least 10ms wide
    )
    
    peak_amps = envelope_smooth[peaks]
    intervals_ms = np.diff(peaks) / sr * 1000 if len(peaks) > 1 else np.array([])
    
    return peaks, peak_amps, intervals_ms, envelope_smooth


def spectral_features(data, sr, center_sample, window_ms=60):
    """Extract frequency-domain features around an impact."""
    half_win = int(sr * window_ms / 2000)
    start = max(0, center_sample - half_win)
    end = min(len(data), center_sample + half_win)
    
    segment = data[start:end]
    n = len(segment)
    if n < 64: return {}
    
    # FFT
    fft = np.abs(np.fft.rfft(segment))
    freqs = np.fft.rfftfreq(n, 1.0/sr)
    
    # Only look at meaningful range: 80Hz - 8000Hz
    valid = (freqs >= 80) & (freqs <= 8000)
    valid_fft = fft[valid]
    valid_freqs = freqs[valid]
    
    if len(valid_fft) == 0 or np.max(valid_fft) < 1e-10:
        return {"peak_freq": 0, "spectral_centroid": 0, "bandwidth": 0}
    
    # Normalize
    valid_fft_norm = valid_fft / (np.max(valid_fft) + 1e-12)
    
    # Spectral centroid (weighted mean frequency)
    centroid = np.sum(valid_freqs * valid_fft_norm) / (np.sum(valid_fft_norm) + 1e-12)
    
    # Peak frequency
    peak_freq_idx = np.argmax(valid_fft)
    peak_freq = valid_freqs[peak_freq_idx]
    
    # Bandwidth (spread around peak)
    above_half = valid_freqs[valid_fft_norm > 0.5]
    bandwidth = (np.max(above_half) - np.min(above_half)) if len(above_half) > 1 else 0
    
    # Energy in bands
    low_band = valid_fft[(freqs >= 80) & (freqs < 500)]
    mid_band = valid_fft[(freqs >= 500) & (freqs < 2000)]
    high_band = valid_fft[(freqs >= 2000) & (freqs <= 8000)]
    
    total_energy = np.sum(valid_fft**2) + 1e-12
    
    return {
        "peak_freq_hz": round(float(peak_freq), 1),
        "spectral_centroid_hz": round(float(centroid), 1),
        "bandwidth_hz": round(float(bandwidth), 1),
        "low_energy_ratio": round(float(np.sum(low_band**2)/total_energy), 3),
        "mid_energy_ratio": round(float(np.sum(mid_band**2)/total_energy), 3),
        "high_energy_ratio": round(float(np.sum(high_band**2)/total_energy), 3),
        "total_db": round(20*np.log10(np.sqrt(total_energy)+1e-12), 1),
    }


def decay_analysis(data, sr, peak_idx):
    """Measure how quickly sound decays after an impact."""
    start = peak_idx
    end = min(len(data), peak_idx + int(sr * 0.5))  # Look up to 500ms after
    
    segment = data[start:end]
    if len(segment) < 20: return {"decay_time_ms": 50, "rt60_ms": 300}
    
    envelope = np.abs(segment)
    smoothed = uniform_filter1d(envelope, size=max(3, int(sr*0.002)))
    
    peak_val = np.max(smoothed)
    if peak_val < 0.001: return {"decay_time_ms": 20, "rt60_ms": 100}
    
    threshold_90 = peak_val * 0.1  # 10% of peak = ~-20dB
    cross_points = np.where(smoothed < threshold_90)[0]
    
    decay_time_ms = (cross_points[0] / sr * 1000) if len(cross_points) > 0 else 400
    
    # RT60 estimate (time to drop 60dB, extrapolated from available data)
    if decay_time_ms > 0:
        rt60 = decay_time_ms * (60.0 / 20.0)  # Extrapolate from -20dB to -60dB
    else:
        rt60 = 300
    
    return {
        "decay_to_10pct_ms": round(decay_time_ms, 1),
        "rt60_estimated_ms": round(min(rt60, 999), 1),
        "peak_amplitude": round(float(peak_val), 4),
    }


def analyze_recording(filepath, label):
    """Full analysis pipeline for one recording."""
    print(f"\n{'='*55}")
    print(f"Analyzing: {label}")
    print(f"{'='*55}")
    
    sr, data = load_wav(filepath)
    duration_s = len(data) / sr
    print(f"Duration: {duration_s:.2f}s | SR: {sr}Hz | Samples: {len(data)}")
    
    # Detect impacts
    peaks, amps, intervals, env = detect_impacts(data, sr)
    print(f"Impact events detected: {len(peaks)}")
    
    if len(peaks) == 0:
        print("WARNING: No impacts detected! Audio may be too quiet or too noisy.")
        return None
    
    print(f"Amplitude range: {np.min(amps):.4f} – {np.max(amps):.4f}")
    if len(intervals) > 0:
        print(f"Interval between impacts: {np.mean(intervals):.0f}ms avg, "
              f"{np.min(intervals):.0f}–{np.max(intervals):.0f}ms")
    
    # Analyze each impact
    impacts_data = []
    for i, pk in enumerate(peaks[:min(15, len(peaks))]):  # Cap at first 15 impacts
        spec = spectral_features(data, sr, pk)
        decay = decay_analysis(data, sr, pk)
        
        impact_entry = {
            "impact_num": i+1,
            "position_ms": round(pk / sr * 1000, 1),
            "amplitude": round(float(amps[i]), 4),
            **spec,
            **decay,
        }
        impacts_data.append(impact_entry)
    
    # Aggregate statistics across all impacts
    all_peak_freqs = [d["peak_freq_hz"] for d in impacts_data if d.get("peak_freq_hz",0)>0]
    all_centroids = [d["spectral_centroid_hz"] for d in impacts_data if d.get("spectral_centroid_hz",0)>0]
    all_decays = [d["decay_to_10pct_ms"] for d in impacts_data if d.get("decay_to_10pct_ms",0)>0]
    all_lows = [d["low_energy_ratio"] for d in impacts_data]
    all_highs = [d["high_energy_ratio"] for d in impacts_data]
    
    summary = {
        "file_label": label,
        "file_path": filepath,
        "duration_s": round(duration_s, 2),
        "sample_rate": sr,
        "impact_count": len(peaks),
        "avg_impact_interval_ms": round(float(np.mean(intervals)), 1) if len(intervals)>0 else 0,
        
        # These map directly to our GENES parameters:
        "mass_proxy": round(float(np.mean([d["total_db"] for d in impacts_data])), 1) if impacts_data else 0,       # louder → heavier
        "fill_proxy": round(float(np.mean(all_lows)), 3) if all_lows else 0.5,   # more low freq → more filled (less hollow)
        "looseness_proxy": round(float(np.std(all_decays)/max(np.mean(all_decays),1)), 3) if len(all_decays)>1 else 0.3,  # variable decay → looser
        "parts_proxy": round(len(peaks) / max(duration_s,1) * 2, 1),           # more impacts/sec → more parts rattling
        
        "avg_peak_freq_hz": round(float(np.mean(all_peak_freqs)), 1) if all_peak_freqs else 0,
        "avg_spectral_centroid_hz": round(float(np.mean(all_centroids)), 1) if all_centroids else 0,
        "avg_decay_ms": round(float(np.mean(all_decays)), 1) if all_decays else 0,
        "avg_low_energy": round(float(np.mean(all_lows)), 3) if all_lows else 0,
        "avg_high_energy": round(float(np.mean(all_highs)), 3) if all_highs else 0,
        
        "impacts_detail": impacts_data[:8],  # First 8 for reference
    }
    
    # Print summary
    print(f"\n--- Summary ---")
    print(f"Impacts: {summary['impact_count']} ({summary['parts_proxy']} parts proxy)")
    print(f"Avg Peak Freq: {summary['avg_peak_freq_hz']} Hz (pitch proxy)")
    print(f"Spectral Centroid: {summary['avg_spectral_centroid_hz']} Hz")
    print(f"Low Energy Ratio: {summary['avg_low_energy']}: fill proxy (higher=fuller)")
    print(f"High Energy Ratio: {summary['avg_high_energy']}: click proxy (higher=more clicks)")
    print(f"Avg Decay: {summary['avg_decay_ms']} ms (looseness proxy)")
    print(f"Loudness (mass proxy): {summary['mass_proxy']} dB")
    
    return summary


# ===== MAIN =====
if __name__ == "__main__":
    files = [
        ("摇晃1_clean.wav", "Box 1"),
        ("摇晃2_clean.wav", "Box 2"),
        ("摇晃3_clean.wav", "Box 3"),
    ]
    
    results = []
    for fname, label in files:
        fpath = os.path.join(BASE, fname)
        if os.path.exists(fpath):
            result = analyze_recording(fpath, label)
            if result: results.append(result)
        else:
            print(f"File not found: {fpath}")
    
    # Save results
    out_path = os.path.join(OUT_DIR, "acoustic_analysis_results.json")
    with open(out_path, 'w') as f:
        json.dump(results, f, indent=2)
    print(f"\n\nResults saved to: {out_path}")
    
    # Comparison table
    if len(results) >= 2:
        print("\n\n" + "="*70)
        print("COMPARISON TABLE (for GENES calibration)")
        print("="*70)
        header = f"{'Box':<8}|{'Mass':>7}|{'Fill':>7}|{'Loose':>7}|{'Parts':>7}|{'Pitch':>7}|{'Decay':>7}"
        print(header)
        print("-"*70)
        for r in results:
            print(f"{r['file_label']:<8}|{r['mass_proxy']:>7.1f}|{r['fill_proxy']:>7.3f}|{r['looseness_proxy']:>7.3f}|{r['parts_proxy']:>7.1f}|{r['avg_peak_freq_hz']:>7.0f}|{r['avg_decay_ms']:>7.0f}")
