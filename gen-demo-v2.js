const fs = require('fs');
const path = require('path');

const p1 = fs.readFileSync(path.join(__dirname,'assets','p1.txt'),'utf8');
const p2 = fs.readFileSync(path.join(__dirname,'assets','p2.txt'),'utf8');
const p3 = fs.readFileSync(path.join(__dirname,'assets','p3.txt'),'utf8');
const p4 = fs.readFileSync(path.join(__dirname,'assets','p4.txt'),'utf8');

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>ShakeSecret</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{width:100%;height:100%;overflow:hidden;font-family:-apple-system,"PingFang SC","Helvetica Neue",sans-serif;background:#FFF8F0;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}
#app{width:100%;max-width:450px;height:100vh;margin:0 auto;position:relative;overflow:hidden;background:#FFF8F0}

/* ===== PAGE BASE ===== */
.page{position:absolute;top:0;left:0;width:100%;height:100%;background-size:cover;background-position:center;background-repeat:no-repeat;display:none;opacity:0;transition:opacity .3s ease}
.page.active{display:block;opacity:1}

/* ===== PAGE 1 HOME ===== */
#pg1{background-image:url(data:image/png;base64,${p1})}
.btn-start{
  position:absolute;bottom:22.5%;left:50%;transform:translateX(-50%);
  width:72%;height:60px;border-radius:30px;
  background:transparent;border:none;cursor:pointer;z-index:10
}
.btn-start:active{transform:translateX(-50%) scale(.96)}
.btn-collection{
  position:absolute;bottom:11%;left:50%;transform:translateX(-50%);
  width:56%;height:44px;border-radius:22px;
  background:transparent;border:none;cursor:pointer;z-index:10
}
.btn-collection:active{transform:translateX(-50%) scale(.96)}
/* Daily quota display on home */
.quota-display{
  position:absolute;top:4%;right:5%;
  padding:5px 14px;background:rgba(255,248,240,.85);
  border-radius:16px;border:1.5px solid #E8DDD0;
  font-size:13px;color:#5C4A3A;font-weight:600;z-index:10
}

/* ===== PAGE 2 COLLECTION ===== */
#pg2{background-image:url(data:image/png;base64,${p2});display:flex;flex-direction:column}
.close-btn{
  position:absolute;top:3.5%;left:4%;width:34px;height:34px;
  font-size:20px;color:#5C4A3A;background:rgba(255,248,240,.7);
  border:1.5px solid #E8DDD0;border-radius:50%;cursor:pointer;z-index:20;
  display:flex;align-items:center;justify-content:center
}
.preview-btn{
  position:absolute;top:15.5%;right:5%;width:36px;height:36px;
  font-size:20px;background:rgba(255,248,240,.7);
  border:1.5px solid #E8DDD0;border-radius:50%;cursor:pointer;z-index:20;
  display:flex;align-items:center;justify-content:center
}
.grid-cell{
  position:absolute;width:28.5%;aspect-ratio:.95;border-radius:14px;
  cursor:pointer;transition:transform .15s,box-shadow .15s;
  z-index:5
}
.grid-cell:active{transform:scale(.93)}
.grid-cell.collected::after{
  content:'';position:absolute;inset:0;border-radius:14px;
  border:2.5px solid rgba(106,176,76,.5);pointer-events:none
}
.grid-cell.locked{border:2.5px solid #DAA520}
.grid-cell.empty{opacity:.35}
.grid-cell .cell-name{
  position:absolute;bottom:-2px;left:50%;transform:translateX(-50%);
  font-size:11px;color:#5C4A3A;font-weight:700;white-space:nowrap;
  text-shadow:0 0 8px rgba(255,248,240,.9);z-index:6
}
/* Progress & share row */
.progress-row{position:absolute;bottom:7%;left:0;right:0;display:flex;justify-content:center;gap:8%;padding:0 6%;z-index:10}

/* ===== PAGE 3 GAME ===== */
#pg3{background-image:url(data:image/png;base64,${p3})}
.target-pill{
  position:absolute;top:3.2%;left:50%;transform:translateX(-50%);
  width:84%;height:46px;background:rgba(255,248,240,.75);
  border:1.5px dashed #D4B896;border-radius:23px;
  display:flex;align-items:center;justify-content:center;gap:8px;
  font-size:16px;color:#5C4A3A;font-weight:600;z-index:10
}
.target-icon{font-size:26px}
/* Box area */
.box-area{
  position:absolute;top:17%;left:0;right:0;height:40%;
  display:flex;align-items:center;justify-content:center;z-index:5
}
.box-wrap{
  position:relative;width:33%;height:100%;
  transition:all .4s cubic-bezier(.25,.8,.25,1);cursor:pointer;z-index:5
}
.box-wrap.side{width:21%;opacity:.45;filter:brightness(.85);transform:scale(.75)}
.box-inner{
  width:100%;height:100%;transition:transform .06s ease
}
.box-inner:active{transform:scale(.94)}
/* Binding tag above box */
.box-binding{
  position:absolute;top:-30px;left:50%;transform:translateX(-50%);
  width:38px;height:38px;border-radius:50%;
  border:2.5px solid #D4618C;background:#FFF;
  display:none;align-items:center;justify-content:center;
  z-index:15;font-size:20px;box-shadow:0 2px 8px rgba(212,97,140,.25)
}
/* Shake zone */
.shake-btn{
  position:absolute;top:55.5%;left:50%;transform:translateX(-50%);
  width:50%;height:48px;border-radius:24px;
  background:transparent;border:none;cursor:pointer;z-index:10
}
.shake-btn:active{transform:translateX(-50%) scale(.95)}
.shake-count{
  position:absolute;top:56.5%;right:17%;
  font-size:18px;font-weight:800;color:#E67E22;z-index:10
}
.instruction{
  position:absolute;top:52.5%;left:50%;transform:translateX(-50%);
  font-size:13px;color:#B8A08C;font-weight:700;letter-spacing:1.5px;z-index:6
}
/* Candidate row */
.candidate-row{
  position:absolute;top:65%;left:50%;transform:translateX(-50%);
  width:94%;display:flex;gap:2.5%;z-index:10
}
.candidate-card{
  flex:1;aspect-ratio:.78;border-radius:13px;
  cursor:pointer;border:2.5px solid transparent;
  transition:all .18s ease;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  background:rgba(255,248,240,.55)
}
.candidate-card:active{transform:scale(.93)}
.candidate-card.selected{
  border-color:#D4618C;background:rgba(212,97,140,.08);
  transform:scale(1.05);box-shadow:0 3px 12px rgba(212,97,140,.2)
}
.candidate-card .cand-emoji{font-size:28px}
.candidate-card .cand-name{
  font-size:9px;color:#5C4A3A;margin-top:2px;font-weight:700
}
/* Confirm */
.confirm-btn{
  position:absolute;bottom:2.5%;left:4%;width:92%;height:54px;
  border-radius:27px;background:transparent;border:none;
  cursor:pointer;z-index:10;transition:opacity .3s,filter .3s
}
.confirm-btn.ready{animation:pulse-ready 1.3s ease-in-out infinite}
@keyframes pulse-ready{
  0%,100%{filter:brightness(1)}50%{filter:brightness(1.06)}
}

/* ===== Shake Animation ===== */
@keyframes shake-l{
  0%,100%{transform:rotate(0) translateX(0)}10%{transform:rotate(-7deg) translateX(-3px)}
  20%{transform:rotate(6deg) translateX(2px)}30%{transform:rotate(-5deg) translateX(-2px)}
  40%{transform:rotate(4deg) translateX(1.5px)}50%{transform:rotate(-3deg) translateX(-1px)}
  60%{transform:rotate(2deg) translateX(1px)}70%{transform:rotate(-1.5deg) translateX(0.5px)}
  80%{transform:rotate(1deg) translateX(0)}90%{transform:rotate(0) translateX(0)}
}
@keyframes shake-c{
  0%,100%{transform:rotate(0) translateY(0) scale(1)}
  10%{transform:rotate(-9deg) translateY(-4px) scale(1.02)}
  20%{transform:rotate(8deg) translateY(3px) scale(1.01)}
  30%{transform:rotate(-7deg) translateY(-2px) scale(1.02)}
  40%{transform:rotate(6deg) translateY(2px) scale(1)}
  50%{transform:rotate(-5deg) translateY(-1px) scale(1.01)}
  60%{transform:rotate(4deg) translateY(1px) scale(1)}
  70%{transform:rotate(-3deg) translateY(0) scale(1)}
  80%{transform:rotate(2deg) translateY(0) scale(1)}90%{transform:rotate(0) translateY(0) scale(1)}
}
@keyframes shake-r{
  0%,100%{transform:scale(.75) rotate(0) translateX(0)}
  10%{transform:scale(.75) rotate(7deg) translateX(3px)}
  20%{transform:scale(.75) rotate(-6deg) translateX(-2px)}
  30%{transform:scale(.75) rotate(5deg) translateX(2px)}
  40%{transform:scale(.75) rotate(-4deg) translateX(-1.5px)}
  50%{transform:scale(.75) rotate(3deg) translateX(1px)}
  60%{transform:scale(.75) rotate(-2deg) translateX(-1px)}
  70%{transform:scale(.75) rotate(1.5deg) translateX(0.5px)}
  80%{transform:scale(.75) rotate(-1deg) translateX(0)}
  90%{transform:scale(.75) rotate(0) translateX(0)}
}
.shaking#boxL{animation:shake-l .6s ease-in-out}
.shaking#boxC{animation:shake-c .65s ease-in-out}
.shaking#boxR{animation:shake-r .6s ease-in-out}

/* ===== PAGE 4 RESULT ===== */
#pg4{background-image:url(data:image/png;base64,${p4})}
.result-btn{
  position:absolute;bottom:7.5%;left:50%;transform:translateX(-50%);
  width:64%;height:50px;border-radius:25px;
  background:transparent;border:none;cursor:pointer;z-index:10
}
.result-btn:active{transform:translateX(-50%) scale(.95)}

/* ===== CONFETTI ===== */
.confetti-particle{
  position:absolute;width:7px;height:7px;border-radius:1px;
  z-index:100;pointer-events:none;
  animation:confetti-fall 2.2s cubic-bezier(.25,.46,.45,.94) forwards
}
@keyframes confetti-fall{
  0%{opacity:1;transform:translateY(0) rotate(0deg) scale(1)}
  100%{opacity:0;transform:translateY(350px) rotate(720deg) scale(.2)}
}

/* ===== VISUAL PULSE (iOS fallback) ===== */
.visual-pulse{
  position:fixed;top:0;left:0;right:0;bottom:0;
  background:radial-gradient(circle at center,rgba(212,97,140,.2) 0%,rgba(212,97,140,.06) 40%,transparent 70%);
  z-index:999;pointer-events:none;opacity:0;transition:opacity .12s ease
}
.visual-pulse.active{opacity:1}

/* ===== TOAST ===== */
.toast{
  position:fixed;top:14%;left:50%;transform:translateX(-50%) translateY(-15px);
  padding:11px 26px;background:rgba(44,33,22,.9);
  color:#FFF8F0;border-radius:22px;font-size:14px;
  z-index:300;opacity:0;transition:all .3s cubic-bezier(.25,.8,.25,1);
  pointer-events:none;font-weight:500;letter-spacing:.3px
}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}

/* ===== PREVIEW MODAL ===== */
.modal-overlay{
  position:fixed;top:0;left:0;right:0;bottom:0;
  background:rgba(0,0,0,.5);z-index:200;
  display:none;align-items:center;justify-content:center;
  backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)
}
.modal-overlay.show{display:flex}
.modal-content{
  width:86%;max-height:72vh;background:#FFF8F0;
  border-radius:22px;padding:22px 16px;
  display:flex;flex-wrap:wrap;gap:12px;justify-content:center;
  box-shadow:0 12px 48px rgba(0,0,0,.2)
}
.modal-char{
  width:23%;aspect-ratio:1;border-radius:14px;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  background:#FFF;box-shadow:0 2px 8px rgba(0,0,0,.06);
  transition:transform .15s
}
.modal-char:active{transform:scale(.92)}
.modal-char .mc-emoji{font-size:32px}
.modal-char .mc-name{font-size:9px;color:#5C4A3A;margin-top:4px;font-weight:600}

/* ===== AD MODAL ===== */
.ad-modal{
  position:fixed;top:0;left:0;right:0;bottom:0;
  background:rgba(0,0,0,.6);z-index:250;
  display:none;align-items:center;justify-content:center
}
.ad-modal.show{display:flex}
.ad-modal-inner{
  width:82%;background:#FFF8F0;border-radius:22px;padding:32px 24px;
  text-align:center;box-shadow:0 16px 56px rgba(0,0,0,.25)
}
.ad-modal-title{font-size:20px;color:#2D2016;font-weight:800;margin-bottom:12px}
.ad-modal-sub{font-size:14px;color:#7F8C8D;margin-bottom:24px;line-height:1.5}
.ad-btn-watch{
  display:inline-block;padding:14px 40px;
  background:linear-gradient(135deg,#D4618C,#E67E22);
  color:#fff;border-radius:25px;font-size:16px;font-weight:700;
  border:none;cursor:pointer;letter-spacing:1px
}
.ad-btn-skip{
  display:block;margin-top:14px;padding:10px;
  background:transparent;border:none;color:#A0937D;font-size:13px;
  cursor:pointer
}

/* ===== Page transition animations ===== */
.page-enter{animation:pageIn .35s ease-out}
@keyframes pageIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
</style>
</head>
<body>

<div id="app">

<!-- ========== PAGE 1 HOME ========== -->
<div class="page active" id="pg1">
  <div class="quota-display" id="quotaDisplay">🎁 x8</div>
  <button class="btn-start" onclick="goToGame()"></button>
  <button class="btn-collection" onclick="goToCollection()"></button>
</div>

<!-- ========== PAGE 2 COLLECTION ========== -->
<div class="page" id="pg2">
  <button class="close-btn" onclick="goHome()">✕</button>
  <button class="preview-btn" onclick="togglePreview()">👁</button>
  <!-- grid cells injected by JS -->
  <div class="progress-row">
    <!-- matches design's progress/share area -->
  </div>
</div>

<!-- ========== PAGE 3 GAME ========== -->
<div class="page" id="pg3">
  <div class="target-pill" id="targetArea">
    find: <span class="target-icon" id="targetIcon">?</span> (<span id="targetCounter">0</span>/1)
  </div>
  <div class="instruction" id="instructionText">Match →</div>
  <div class="box-area" id="boxArea">
    <div class="box-wrap side" id="boxL">
      <div class="box-inner" ontouchstart="selectBox(0)"></div>
      <div class="box-binding" id="bind0"></div>
    </div>
    <div class="box-wrap center" id="boxC">
      <div class="box-inner" ontouchstart="selectBox(1)"></div>
      <div class="box-binding" id="bind1"></div>
    </div>
    <div class="box-wrap side" id="boxR">
      <div class="box-inner" ontouchstart="selectBox(2)"></div>
      <div class="box-binding" id="bind2"></div>
    </div>
  </div>
  <button class="shake-btn" id="shakeBtn" ontouchstart="doShake()"></button>
  <div class="shake-count" id="shakeCount">x7</div>
  <div class="candidate-row" id="candidateRow"></div>
  <button class="confirm-btn" id="confirmBtn" onclick="doConfirm()"></button>
</div>

<!-- ========== PAGE 4 RESULT ========== -->
<div class="page" id="pg4">
  <div id="confettiContainer"></div>
  <button class="result-btn" id="resultBtn" onclick="handleResult()"></button>
</div>

</div><!-- /app -->

<!-- Overlays -->
<div class="visual-pulse" id="visualPulse"></div>
<div class="toast" id="toast"></div>
<div class="modal-overlay" id="previewModal">
  <div class="modal-content" id="previewContent"></div>
</div>
<div class="ad-modal" id="adModal">
  <div class="ad-modal-inner">
    <div class="ad-modal-title">🎁 Stock Refill</div>
    <div class="ad-modal-sub">Today's free shakes are used up!<br>Watch a short ad to get +1 shake.</div>
    <button class="ad-btn-watch" onclick="watchAd()">Watch Ad →</button>
    <button class="ad-btn-skip" onclick="closeAdModal()">Maybe later</button>
  </div>
</div>

<script>
// ============================================================
// DATA
// ============================================================
var SERIES={
  name:"COZY FRIENDS",
  desc:"Snuggly buddies who warm your heart",
  tabs:["COZY FRIENDS","SWEET DREAMS","BERRY BUDDIES","FOREST TALES","PUFFY LAND"],
  characters:[
    {id:"pip",     name:"Pip",       emoji:"\\u{1F425}",collected:true},
    {id:"mochi",   name:"Mochi",     emoji:"\\u{1F430}",collected:false},
    {id:"biscuit", name:"Biscuit",   emoji:"\\u{1F43B}",collected:true},
    {id:"lumi",    name:"Lumi",      emoji:"\\u{1F9DA}",collected:false},
    {id:"creme",   name:"Cr\\u00e8me Puff",emoji:"\\u{1F431}",collected:true},
    {id:"daisy",   name:"Daisy",     emoji:"\\u{1F411}",collected:true},
    {id:"hugo",    name:"Hugo",      emoji:"\\u{1F994}",collected:true},
    {id:"t",       name:"?",         emoji:"\\u{1F995}",collected:false},
    {id:"hidden",  name:"HIDDEN",    emoji:"\\u{1F512}",isHidden:true,collected:false},
  ]
};

// Gene profiles — calibrated for sound differentiation
var GENES={
  pip:{mass:1.1,parts:1,fill:0.85,looseness:0.2,pitch:1.0},       // medium-full, warm thud
  mochi:{mass:0.85,parts:1,fill:0.6,looseness:0.5,pitch:1.15},     // light, wobbly, higher
  biscuit:{mass:1.3,parts:2,fill:0.9,looseness:0.15,pitch:0.88},   // heavy, accessory click, low
  lumi:{mass:0.7,parts:1,fill:0.45,looseness:0.6,pitch:1.25},      // lightest, airy, highest
  creme:{mass:0.95,parts:2,fill:0.75,looseness:0.3,pitch:1.05},   // medium, double click
  daisy:{mass:1.15,parts:1,fill:0.88,looseness:0.18,pitch:0.92},   // full, dull thud
  hugo:{mass:1.0,parts:3,fill:0.7,looseness:0.35,pitch:0.98},      // spiky, multi-click
  t:{mass:1.2,parts:1,fill:0.82,looseness:0.22,pitch:0.9},         // heavy-ish, low
  hidden:{mass:0.9,parts:2,fill:0.55,looseness:0.45,pitch:1.1},    // mysterious, mid-high
};

// State
var state={
  page:"home",
  focusIdx:1,
  bindings:[null,null,null],
  shakeCount:7,
  maxShakes:7,
  targetChar:null,
  candidates:[],
  resultChar:null,
  isNewResult:false,
  isTargetHit:false,
  seriesIdx:0,

  // Quota system
  quotaFree:8,
  quotaMax:8,
  lastQuotaTime:Date.now(),
  cooldownMs:90*60*1000,  // 90 minutes
  adCooldownEnd:0,
  totalUsedToday:0,
};

// ============================================================
// AUDIO ENGINE (Web Audio API)
// ============================================================
var audioCtx=null;
function getAC(){
  if(!audioCtx) audioCtx=new(window.AudioContext||window.webkitAudioContext);
  return audioCtx;
}

function playImpact(gene){
  var ac=getAC();
  if(ac.state==="suspended") ac.resume();

  var now=ac.currentTime;
  var hitCount=Math.round(gene.parts*1.8)+Math.floor(Math.random()*2);
  var baseVol=(gene.mass*0.22+0.14)*(gene.pitch<1?0.92+gene.pitch*0.08:1);

  // Main impact sounds
  for(var i=0;i<hitCount;i++){
    var delay=now+i*(0.045+Math.random()*0.065);

    // Primary body thud
    var osc=ac.createOscillator();
    var gain=ac.createGain();
    var filter=ac.createBiquadFilter();
    osc.type="triangle";
    var baseFreq=110+(gene.fill*190)*gene.pitch+Math.random()*50;
    osc.frequency.setValueAtTime(baseFreq, delay);
    osc.frequency.exponentialRampToValueAtTime(35+gene.looseness*28, delay+0.13);
    filter.type="lowpass";
    filter.frequency.setValueAtTime(2600-(gene.mass*750), delay);
    filter.Q.value=1+gene.looseness*2.8;
    gain.gain.setValueAtTime(baseVol*(0.68+Math.random()*0.32), delay);
    gain.gain.exponentialRampToValueAtTime(0.001, delay+0.16+(gene.looseness*0.09));
    osc.connect(filter).connect(gain).connect(ac.destination);
    osc.start(delay); osc.stop(delay+0.22);

    // Accessory click (if parts > 1, every other hit)
    if(gene.parts>=1.5 && i%2===0){
      var o2=ac.createOscillator(); var g2=ac.createGain();
      o2.type="sine";
      o2.frequency.setValueAtTime(2100*gene.pitch+Math.random()*1400, delay+0.018);
      o2.frequency.exponentialRampToValueAtTime(750, delay+0.058);
      g2.gain.setValueAtTime(baseVol*0.32, delay+0.018);
      g2.gain.exponentialRampToValueAtTime(0.001, delay+0.078);
      o2.connect(g2).connect(ac.destination);
      o2.start(delay+0.018); o2.stop(delay+0.098);
    }
  }

  // Cavity resonance (hollow sound when fill is low)
  if(gene.fill<0.72){
    var noise=ac.createOscillator(); var ng=ac.createGain(); var nf=ac.createBiquadFilter();
    noise.type="sawtooth";
    noise.frequency.value=75+gene.fill*115;
    nf.type="bandpass";
    nf.frequency.value=380+gene.looseness*480;
    nf.Q.value=2.2+gene.fill*3.8;
    ng.gain.setValueAtTime(baseVol*0.11, now+hitCount*0.048);
    ng.gain.exponentialRampToValueAtTime(0.001, now+hitCount*0.048+0.28);
    noise.connect(nf).connect(ng).connect(ac.destination);
    noise.start(now+hitCount*0.048); noise.stop(now+0.52);
  }

  // Vibration (Android) or visual pulse (iOS)
  if(typeof navigator.vibrate==="function"){
    var pat=[];
    for(var j=0;j<hitCount;j++){
      pat.push(28+Math.floor(Math.random()*36));
      pat.push(18+Math.floor(gene.looseness*48));
    }
    navigator.vibrate(pat.slice(0,-1));
  }else{
    showVisualPulse();
  }
}

function showVisualPulse(){
  var el=document.getElementById("visualPulse");
  el.classList.add("active");
  setTimeout(function(){el.classList.remove("active")},160);
}

// ============================================================
// NAVIGATION
// ============================================================
function showPage(id){
  document.querySelectorAll(".page").forEach(function(p){
    p.classList.remove("active");
  });
  var pg=document.getElementById(id);
  pg.classList.add("active");
  pg.classList.add("page-enter");
  setTimeout(function(){pg.classList.remove("page-enter")},360);
  state.page=id.replace("pg","");

  if(id==="pg3"){ initRound(); updateQuotaDisplay(); }
  if(id==="pg4"){ showConfetti(); }
  if(id==="pg1"){ updateQuotaDisplay(); }
}

function goHome(){showPage("pg1")}
function goToCollection(){buildCollection();showPage("pg2")}
function goToGame(){
  checkQuotaRefill();
  if(state.quotaFree<=0 && Date.now()<state.adCooldownEnd){
    showAdModal();
    return;
  }
  state.targetChar=null;
  showPage("pg3");
}

// ============================================================
// QUOTA SYSTEM (回血式配额)
// ============================================================
function checkQuotaRefill(){
  var elapsed=Date.now()-state.lastQuotaTime;
  var refills=Math.floor(elapsed/state.cooldownMs);
  if(refills>0){
    state.quotaFree=Math.min(state.quotaMax,state.quotaFree+refills);
    state.lastQuotaTime=Date.now()-(elapsed%state.cooldownMs);
  }
  updateQuotaDisplay();
}

function updateQuotaDisplay(){
  var el=document.getElementById("quotaDisplay");
  if(el) el.textContent="🎁 x"+state.quotaFree;
}

function useQuota(){
  if(state.quotaFree>0){ state.quotaFree--; return true; }
  return false;
}

function showAdModal(){
  document.getElementById("adModal").classList.add("show");
}
function closeAdModal(){
  document.getElementById("adModal").classList.remove("show");
}
function watchAd(){
  closeAdModal();
  state.quotaFree++;
  state.adCooldownEnd=Date.now()+30000; // 30s cooldown
  state.totalUsedToday++;
  toast("+1 Shake! 🎉");
  updateQuotaDisplay();
}

// ============================================================
// COLLECTION PAGE
// ============================================================
function buildCollection(){
  // Tabs (visual overlay only — tabs drawn in PNG)
  var pg=document.getElementById("pg2");

  // Clear existing cells
  document.querySelectorAll(".grid-cell").forEach(function(e){e.remove()});

  // Grid positions matching the 3x3 layout in the PNG
  var pos=[
    [8.5,24],  [36.5,24], [64.5,24],
    [8.5,49],  [36.5,49], [64.5,49],
    [8.5,74],  [36.5,74], [64.5,74]
  ];

  SERIES.characters.forEach(function(ch,i){
    var cell=document.createElement("div");
    cell.className="grid-cell";
    if(ch.isHidden) cell.classList.add("locked");
    else if(!ch.collected) cell.classList.add("empty");
    else cell.classList.add("collected");

    cell.style.left=pos[i][0]+"%";
    cell.style.top=pos[i][1]+"%";

    // Name label
    var nameSpan=document.createElement("div");
    nameSpan.className="cell-name";
    nameSpan.textContent=ch.isHidden?"???":ch.name;
    cell.appendChild(nameSpan);

    cell.onclick=function(){enterLevel(i)};
    pg.appendChild(cell);
  });
}

function enterLevel(charIdx){
  var ch=SERIES.characters[charIdx];
  if(ch.isHidden){
    toast("Hidden edition — find it by playing!");
    return;
  }
  if(ch.collected){
    toast("You already have "+ch.name+"! ✨");
    return;
  }
  state.targetChar=ch;

  // Check quota before entering
  checkQuotaRefill();
  goToGame();
}

// Preview modal
function togglePreview(){
  var m=document.getElementById("previewModal");
  m.classList.toggle("show");
  if(m.classList.contains("show")) buildPreview();
}
function buildPreview(){
  var c=document.getElementById("previewContent");
  c.innerHTML="";
  SERIES.characters.filter(function(x){return !x.isHidden}).forEach(function(ch){
    var d=document.createElement("div");
    d.className="modal-char";
    d.innerHTML="<span class='mc-emoji'>"+ch.emoji+"</span><span class='mc-name'>"+ch.name+"</span>";
    c.appendChild(d);
  });
}
document.getElementById("previewModal").onclick=function(e){
  if(e.target===this)this.classList.remove("show")
};

// ============================================================
// GAME PAGE
// ============================================================
function initRound(){
  // Pick target if coming from home (random)
  if(!state.targetChar){
    var r=SERIES.characters.filter(function(c){return !c.isHidden && !c.collected});
    if(r.length===0) r=SERIES.characters.filter(function(c){return !c.isHidden});
    state.targetChar=r[Math.floor(Math.random()*r.length)];
  }

  // Build candidates: target + 2 random others + 2 fillers = 5 cards total
  // (matching the design's 5 candidate slots)
  var pool=SERIES.characters.filter(function(c){return !c.isHidden});
  pool=pool.filter(function(c){return c.id!==state.targetChar.id});
  shuffle(pool);
  state.candidates=[state.targetChar,pool[0],pool[1]];
  // Add 2 more random fillers for 5-slot candidate row
  var extras=pool.slice(2);
  if(extras.length>0) state.candidates.push(extras[0]);
  if(extras.length>1) state.candidates.push(extras[1]);
  else{
    // Reuse some if not enough unique ones
    state.candidates.push(pool[0]||state.targetChar);
  }
  // Ensure exactly 5
  while(state.candidates.length<5) state.candidates.push(state.candidates[0]);

  shuffle(state.candidates);

  // Reset round state
  state.focusIdx=1;
  state.bindings=[null,null,null];

  // Determine shake count based on difficulty
  state.maxShakes=7;
  state.shakeCount=state.maxShakes;

  // UI updates
  var ti=document.getElementById("targetIcon");
  ti.textContent=state.targetChar.emoji+"?";
  document.getElementById("targetCounter").textContent="0";
  document.getElementById("shakeCount").textContent="x"+state.shakeCount;
  document.getElementById("shakeBtn").style.opacity="1";

  buildCandidates();
  updateBoxFocus();
  updateUI();
}

function buildCandidates(){
  var row=document.getElementById("candidateRow");
  row.innerHTML="";
  // Show first 5 candidates (design has 5 slots)
  var showCount=Math.min(5,state.candidates.length);
  for(var i=0;i<showCount;i++){
    (function(idx){
      var ch=state.candidates[idx];
      var card=document.createElement("div");
      card.className="candidate-card"; card.id="cand"+idx;
      card.innerHTML=
        "<span class='cand-emoji'>"+ch.emoji+"</span>"+
        "<div class='cand-name'>"+ch.name+"</div>";
      card.onclick=function(){selectCandidate(idx)};
      row.appendChild(card);
    })(i);
  }
}

function selectCandidate(idx){
  if(state.focusIdx<0 || state.focusIdx>2) return;

  // Bind this candidate to currently focused box
  state.bindings[state.focusIdx]=state.candidates[idx];

  // Update selected visuals
  document.querySelectorAll(".candidate-card").forEach(function(c,i){
    var isBound=state.bindings.some(function(b){return b&&b.id===state.candidates[i].id});
    c.classList.toggle("selected",isBound);
  });

  // Show binding tag on focused box
  var bindEl=document.getElementById("bind"+state.focusIdx);
  bindEl.innerHTML=state.candidates[idx].emoji;
  bindEl.style.display="flex";

  // Play a tiny confirmation sound
  playImpact({mass:0.5,parts:1,fill:0.8,looseness:0.1,pitch:1.3});

  updateUI();
}

function selectBox(idx){
  state.focusIdx=idx;
  updateBoxFocus();
}

function updateBoxFocus(){
  ["boxL","boxC","boxR"].forEach(function(id,i){
    var el=document.getElementById(id);
    if(i===state.focusIdx){
      el.classList.remove("side");
      el.classList.add("center");
    }else{
      el.classList.remove("center");
      el.classList.add("side");
    }
  });
}

// ============================================================
// SHAKE ACTION
// ============================================================
function doShake(){
  // Check quota first
  checkQuotaRefill();

  // Check if we need to use quota or show ad
  if(state.shakeCount<=0){
    // Check if we can auto-refill
    if(state.quotaFree>0){
      state.shakeCount=state.quotaFree;
      state.quotaFree=0;
      updateQuotaDisplay();
    }else if(Date.now()>=state.adCooldownEnd){
      showAdModal();
      return;
    }else{
      showAdModal();
      return;
    }
  }

  state.shakeCount--;
  document.getElementById("shakeCount").textContent="x"+state.shakeCount;

  // Get gene of bound candidate for current box, or default
  var boundCh=state.bindings[state.focusIdx];
  var gene=boundCh ? GENES[boundCh.id] : GENES.t;

  // Play sound/vibration
  playImpact(gene);

  // Animate the specific box being shaken
  var boxId=["boxL","boxC","boxR"][state.focusIdx];
  var boxWrap=document.getElementById(boxId);
  boxWrap.classList.add("shaking");
  setTimeout(function(){boxWrap.classList.remove("shaking")},680);

  // Dim shake button if running low
  if(state.shakeCount<=1){
    document.getElementById("shakeBtn").style.opacity=".5";
  }

  // Update instruction text after first few shakes
  if(state.shakeCount===4){
    var inst=document.getElementById("instructionText");
    if(inst) inst.textContent="Listen closely...";
  }
  if(state.shakeCount===1){
    var inst2=document.getElementById("instructionText");
    if(inst2) inst2.textContent="Last chance!";
  }
}

// ============================================================
// CONFIRM / PICK IT
// ============================================================
function doConfirm(){
  var bound=state.bindings[1]; // Only center box matters
  if(!bound){
    toast("Tap a character below, then Pick it!");
    return;
  }

  // Determine result
  var hitTarget=bound.id===state.targetChar.id;

  // Probability weighted by how many shakes used (more info = better odds)
  // Base 33% blind guess, up to ~60% with full info
  var infoBonus=Math.min(0.27,(state.maxShakes-state.shakeCount)/state.maxShakes*0.27);
  var successRate=0.33+infoBonus;
  if(hitTarget){
    // Player picked correctly — high chance of getting target
    state.resultChar=state.targetChar;
    state.isTargetHit=true;
  }else{
    // Wrong guess — still small chance of lucky pull
    if(Math.random()<0.2){
      state.resultChar=state.targetChar;
      state.isTargetHit=true;
    }else{
      // Get a non-target result
      var others=state.candidates.filter(function(c){return c.id!==state.targetChar.id});
      state.resultChar=others[Math.floor(Math.random()*others.length)]||bound;
      state.isTargetHit=false;
    }
  }

  // Check if new
  var existing=SERIES.characters.find(function(c){return c.id===state.resultChar.id});
  state.isNewResult=existing? !existing.collected : true;

  // Transition to result
  showPage("pg4");
}

// ============================================================
// RESULT PAGE
// ============================================================
function handleResult(){
  // Mark collected
  var ch=SERIES.characters.find(function(c){return c.id===state.resultChar.id});
  if(ch) ch.collected=true;

  // Update target counter if we got our target
  if(state.isTargetHit){
    document.getElementById("targetCounter").textContent="1";
  }

  // Navigate: if target hit → collection (pick next target)
  //            if miss → home (try again)
  if(state.isTargetHit){
    // Small delay then go to collection
    setTimeout(function(){goToCollection()},200);
  }else{
    setTimeout(function(){goHome()},200);
  }
}

function showConfetti(){
  var c=document.getElementById("confettiContainer");c.innerHTML="";
  if(!state.isNewResult)return;

  var colors=["#FFD4E5","#F5E6D3","#D4618C","#FFE082","#98D8C8","#B8A0D0","#E67E22","#F39C12"];
  for(var i=0;i<40;i++){
    var p=document.createElement("div");
    p.className="confetti-particle";
    p.style.left=(35+Math.random()*30)+"%";
    p.style.top=(25+Math.random()*15)+"%";
    p.style.backgroundColor=colors[Math.floor(Math.random()*colors.length)];
    p.style.borderRadius=Math.random()>0.5?"50%":"2px";
    p.style.width=(5+Math.random()*6)+"px";
    p.style.height=(5+Math.random()*6)+"px";
    p.style.animationDelay=(Math.random()*1.2)+"s";
    p.style.animationDuration=(1.8+Math.random()*1)+"s";
    c.appendChild(p);
  }
}

// ============================================================
// UTILITIES
// ============================================================
function shuffle(a){
  for(var i=a.length-1;i>0;i--){
    var j=Math.floor(Math.random()*(i+1));
    var t=a[i];a[i]=a[j];a[j]=t;
  }
}

function toast(msg){
  var t=document.getElementById("toast");
  t.textContent=msg;t.classList.add("show");
  setTimeout(function(){t.classList.remove("show")},2000);
}

// Swipe detection for box carousel
var touchStartX=0;
document.getElementById("boxArea").addEventListener("touchstart",function(e){
  touchStartX=e.touches[0].clientX;
},{passive:true});
document.getElementById("boxArea").addEventListener("touchend",function(e){
  var dx=e.changedTouches[0].clientX-touchStartX;
  if(Math.abs(dx)>45){
    if(dx<0 && state.focusIdx<2) selectBox(state.focusIdx+1);
    else if(dx>0 && state.focusIdx>0) selectBox(state.focusIdx-1);
  }
},{passive:true});

// Keyboard support for desktop testing
document.addEventListener("keydown",function(e){
  if(state.page!=="game")return;
  if(e.key==="ArrowLeft") selectBox(Math.max(0,state.focusIdx-1));
  if(e.key==="ArrowRight") selectBox(Math.min(2,state.focusIdx+1));
  if(e.key===" " || e.key==="Enter"){e.preventDefault();doShake();}
  if(e.key==="1") selectCandidate(0);
  if(e.key==="2") selectCandidate(1);
  if(e.key==="3") selectCandidate(2);
  if(e.key==="4") selectCandidate(3);
  if(e.key==="5") selectCandidate(4);
});

function updateUI(){
  var btn=document.getElementById("confirmBtn");
  var hasCenterBind=state.bindings[1]!=null;
  btn.classList.toggle("ready",hasCenterBind);
  btn.style.opacity=hasCenterBind?"1":".42";
}

// ============================================================
// INIT
// ============================================================
checkQuotaRefill();
updateQuotaDisplay();
buildCollection();

// Warm up AudioContext on first user interaction (required for iOS/Safari)
var _audioWarmed=false;
function warmAudio(){
  if(_audioWarmed) return;
  try{ var c=new(window.AudioContext||window.webkitAudioContext); if(c.state==='suspended')c.resume(); _audioWarmed=true; }catch(e){}
}
document.addEventListener('touchstart',warmAudio,{once:true});
document.addEventListener('click',warmAudio,{once:true});

// Show subtle hint on first visit to game page
var _firstGame=true;
var _origInitRound=initRound; // reference for hook

console.log("ShakeSecret Demo loaded 🎁");
console.log("Desktop keys: ←→ switch box | Space shake | 1-5 pick candidate | Enter confirm");
</script>
</body>
</html>`;

var outFile=path.join(__dirname,'shakesecret-demo.html');
fs.writeFileSync(outFile, html);
console.log('Demo written:', Math.round(html.length/1024)+'KB', '('+Math.round(fs.statSync(outFile).size/1024)+'KB disk)');
