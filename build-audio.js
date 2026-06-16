// build-audio.js — 把 sfx_output 里的真实摇盒录音转为内联 base64，生成 audio-data.js
// 目的：让 shakesecret-game.html 双击(file://)即可播放音效，无需起本地服务器。
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'sfx_output');
const OUT = path.join(__dirname, 'audio-data.js');

// 摇盒探测用的 3 段 clean 录音（基因系统底音）
const CLEAN = ['摇晃1_clean.mp3', '摇晃2_clean.mp3', '摇晃3_clean.mp3'];
// 单次冲击/揭晓用的 single 录音
const SINGLE = ['摇晃1_single.mp3', '摇晃2_single.mp3', '摇晃3_single.mp3'];

function toDataURI(file) {
  const p = path.join(DIR, file);
  const buf = fs.readFileSync(p);
  const kb = (buf.length / 1024).toFixed(1);
  console.log(`  ${file}  ${kb}KB`);
  return 'data:audio/mpeg;base64,' + buf.toString('base64');
}

console.log('编码 clean 音效:');
const clean = CLEAN.map(toDataURI);
console.log('编码 single 音效:');
const single = SINGLE.map(toDataURI);

const js = `// 自动生成于 build-audio.js —— 请勿手改。重新生成: node build-audio.js
window.SFX = {
  clean: [
    "${clean[0]}",
    "${clean[1]}",
    "${clean[2]}"
  ],
  single: [
    "${single[0]}",
    "${single[1]}",
    "${single[2]}"
  ]
};
`;

fs.writeFileSync(OUT, js);
const outKb = (fs.statSync(OUT).size / 1024).toFixed(1);
console.log(`\n已生成 ${path.basename(OUT)} (${outKb}KB)`);
