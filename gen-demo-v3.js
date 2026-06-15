const fs = require('fs');
const path = require('path');

const BASE = '/Users/allenzqwei/WorkBuddy/2026-06-13-02-33-08';
const p1 = fs.readFileSync(path.join(BASE, 'assets/p1.txt'), 'utf8');
const p2 = fs.readFileSync(path.join(BASE, 'assets/p2.txt'), 'utf8');
const p3 = fs.readFileSync(path.join(BASE, 'assets/p3.txt'), 'utf8');
const p4 = fs.readFileSync(path.join(BASE, 'assets/p4.txt'), 'utf8');

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
<title>ShakeSecret</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{width:100%;height:100%;overflow:hidden;font-family:-apple-system,"PingFang SC","Helvetica Neue",sans-serif;background:#1a1a1a;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}

#app{width:100%;max-width:430px;height:100vh;height:100dvh;margin:0 auto;position:relative;overflow:hidden}

/* ===== PAGES ===== */
.page{position:absolute;top:0;left:0;width:100%;height:100%;display:none;flex-direction:column}
.page.active{display:flex}

/* Background layer */
.page-bg{position:absolute;top:0;left:0;width:100%;height:100%;background-size:cover;background-position:center top;z-index:0}

/* Content layer on top of background */
.page-content{position:relative;z-index:1;width:100%;height:100%;display:flex;flex-direction:column}

/* ===== PAGE 1 — HOME ===== */
#pg1 .page-bg{background-image:url(data:image/png;base64,${p1})}

.home-content{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:max(8vh,40px);gap:14px}
.quota-badge{
  position:absolute;top:max(env(safe-area-inset-top),12px);right:16px;
  padding:6px 16px;background:rgba(255,248,240,.88);border-radius:18px;
  font-size:14px;color:#5C4A3A;font-weight:700;
  box-shadow:0 2px 10px rgba(0,0,0,.08);z-index:5
}
.btn-start{
  width:72%;height:60px;border-radius:30px;
  background:linear-gradient(135deg,#E8739A,#D4618C);color:#fff;
  font-size:22px;font-weight:800;letter-spacing:3px;
  border:none;cursor:pointer;
  box-shadow:0 6px 24px rgba(212,97,140,.35);
  transition:transform .12s,box-shadow .12s
}
.btn-start:active{transform:scale(.94);box-shadow:0 2px 8px rgba(212,97,140,.25)}
.btn-collection{
  width:56%;height:46px;border-radius:23px;
  background:rgba(255,248,240,.75);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
  color:#5C4A3A;font-size:15px;font-weight:600;letter-spacing:1px;
  border:1.5px solid #E8DDD0;cursor:pointer;
  transition:transform .12s
}
.btn-collection:active{transform:scale(.95)}

/* ===== PAGE 2 — COLLECTION ===== */
#pg2 .page-bg{background-image:url(data:image/png;base64,${p2})}

.coll-header{
  padding:max(env(safe-area-inset-top,12px) 0 0 0;text-align:center
}
.series-name{
  margin-top:8px;font-size:14px;color:#B8A08C;font-weight:600;letter-spacing:2px;
  text-align:center;padding:0 16px
}
.series-name .preview-eye{
  display:inline-block;margin-left:8px;cursor:pointer;font-size:16px;
  background:rgba(255,248,240,.7);border-radius:50%;width:28px;height:28px;
  line-height:28px;text-align:center;vertical-align:middle
}
.coll-top{
  display:flex;align-items:center;padding:4px 16px 0;gap:8px
}
.coll-close{
  width:34px;height:34px;border-radius:50%;font-size:18px;
  background:rgba(255,248,240,.7);border:1.5px solid #E8DDD0;
  color:#5C4A3A;cursor:pointer;display:flex;align-items:center;justify-content:center;
  flex-shrink:0
}
.coll-tabs{display:flex;gap:4px;flex:1;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.coll-tabs::-webkit-scrollbar{display:none}
.coll-tab{
  white-space:nowrap;padding:5px 10px;font-size:11px;color:#A0937D;
  border-bottom:2px solid transparent;cursor:pointer;font-weight:600;flex-shrink:0
}
.coll-tab.active{color:#5C4A3A;border-bottom-color:#D4618C}

.coll-grid{
  flex:1;display:grid;grid-template-columns:repeat(3,1fr);
  gap:12px;padding:20px 20px 8px;align-content:start
}
.grid-cell{
  aspect-ratio:1;border-radius:14px;cursor:pointer;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  background:rgba(255,248,240,.5);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);
  border:2px solid #E8DDD0;transition:transform .15s;position:relative
}
.grid-cell:active{transform:scale(.92)}
.grid-cell.collected{background:rgba(255,248,240,.75);border-color:rgba(106,176,76,.4)}
.grid-cell.empty{opacity:.5;background:rgba(200,190,175,.3)}
.grid-cell.locked{border-color:#DAA520;background:rgba(218,165,32,.08)}
.cell-emoji{font-size:32px}
.cell-name{font-size:10px;color:#5C4A3A;font-weight:700;margin-top:3px}
.cell-lock{position:absolute;top:6px;right:6px;font-size:12px}
.coll-footer{
  display:flex;justify-content:center;align-items:center;gap:24px;
  padding:8px 0 max(env(safe-area-inset-bottom,8px),12px)
}
.coll-progress{font-size:13px;color:#5C4A3A;font-weight:600}
.coll-share{
  padding:6px 18px;border-radius:16px;font-size:12px;font-weight:600;
  background:rgba(212,97,140,.12);color:#D4618C;border:1px solid rgba(212,97,140,.25);
  cursor:pointer
}

/* ===== PAGE 3 — GAME ===== */
#pg3 .page-bg{background-image:url(data:image/png;base64,${p3})}

.game-header{
  padding:max(env(safe-area-inset-top,8px),8px) 12px 0;
  display:flex;flex-direction:column;gap:4px
}
.game-tabs{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none}
.game-tabs::-webkit-scrollbar{display:none}
.game-tab{
  white-space:nowrap;padding:4px 9px;font-size:10px;color:#A0937D;
  border-bottom:2px solid transparent;cursor:pointer;font-weight:600;flex-shrink:0
}
.game-tab.active{color:#5C4A3A;border-bottom-color:#D4618C}
.target-pill{
  margin:6px auto 0;
  padding:7px 22px;background:rgba(255,248,240,.78);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
  border:1.5px dashed #D4B896;border-radius:22px;
  font-size:15px;color:#5C4A3A;font-weight:600;
  display:flex;align-items:center;gap:8px
}
.target-icon{font-size:22px}

/* Box carousel */
.box-area{
  flex:1;display:flex;align-items:center;justify-content:center;
  gap:8px;padding:8px 6px;min-height:0
}
.box-wrap{
  position:relative;display:flex;align-items:center;justify-content:center;
  transition:all .35s cubic-bezier(.25,.8,.25,1);cursor:pointer
}
.box-wrap.center{width:38%;height:85%}
.box-wrap.side{width:22%;height:60%;opacity:.4;filter:brightness(.8)}
.box-inner{
  width:100%;height:100%;border-radius:16px;
  background:linear-gradient(145deg,#FFF5E8,#F0E0CC);
  border:3px solid #E8D5BE;
  display:flex;align-items:center;justify-content:center;
  font-size:48px;color:#C4A882;
  box-shadow:0 8px 28px rgba(0,0,0,.08);
  transition:transform .06s
}
.box-wrap.center .box-inner{font-size:60px;border-width:3.5px;box-shadow:0 10px 36px rgba(0,0,0,.12)}
.box-inner:active{transform:scale(.95)}
.box-binding{
  position:absolute;top:-8px;right:-8px;
  width:32px;height:32px;border-radius:50%;
  border:2.5px solid #D4618C;background:#FFF;
  display:none;align-items:center;justify-content:center;
  font-size:16px;box-shadow:0 2px 8px rgba(212,97,140,.3);z-index:5
}

/* Shake zone */
.shake-zone{
  display:flex;align-items:center;justify-content:center;gap:10px;
  padding:4px 0
}
.shake-btn{
  padding:10px 32px;border-radius:24px;
  background:linear-gradient(135deg,#FFB347,#E67E22);color:#fff;
  font-size:16px;font-weight:700;letter-spacing:1.5px;
  border:none;cursor:pointer;
  box-shadow:0 4px 16px rgba(230,126,34,.3);
  transition:transform .12s,opacity .2s
}
.shake-btn:active{transform:scale(.94)}
.shake-btn.disabled{opacity:.35;pointer-events:none}
.shake-count{font-size:17px;font-weight:800;color:#E67E22}
.instruction{font-size:12px;color:#B8A08C;font-weight:700;letter-spacing:1.5px;text-align:center;padding:2px 0}

/* Candidate row */
.candidate-row{
  display:flex;gap:6px;padding:4px 10px;justify-content:center
}
.candidate-card{
  flex:1;max-width:72px;aspect-ratio:.78;border-radius:12px;
  cursor:pointer;border:2.5px solid transparent;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  background:rgba(255,248,240,.7);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);
  transition:all .15s;padding:4px 2px
}
.candidate-card:active{transform:scale(.9)}
.candidate-card.selected{
  border-color:#D4618C;background:rgba(212,97,140,.1);
  box-shadow:0 3px 12px rgba(212,97,140,.2);transform:scale(1.06)
}
.cand-emoji{font-size:24px}
.cand-name{font-size:8px;color:#5C4A3A;font-weight:700;margin-top:1px;text-align:center;line-height:1.1}

/* Confirm */
.confirm-zone{padding:4px 12px max(env(safe-area-inset-bottom,8px),10px)}
.confirm-btn{
  width:100%;height:52px;border-radius:26px;
  background:linear-gradient(135deg,#D4618C,#C0486A);color:#fff;
  font-size:18px;font-weight:800;letter-spacing:2px;
  border:none;cursor:pointer;
  box-shadow:0 4px 18px rgba(212,97,140,.3);
  transition:opacity .3s,transform .12s
}
.confirm-btn:active{transform:scale(.97)}
.confirm-btn.disabled{opacity:.3;pointer-events:none}
.confirm-btn.ready{animation:pulse-ready 1.3s ease-in-out infinite}
@keyframes pulse-ready{0%,100%{box-shadow:0 4px 18px rgba(212,97,140,.3)}50%{box-shadow:0 4px 28px rgba(212,97,140,.55)}}

/* Shake animations */
@keyframes shake-box{
  0%,100%{transform:rotate(0) translateX(0)}
  10%{transform:rotate(-8deg) translateX(-4px)}
  20%{transform:rotate(7deg) translateX(3px)}
  30%{transform:rotate(-6deg) translateX(-2px)}
  40%{transform:rotate(5deg) translateX(2px)}
  50%{transform:rotate(-4deg) translateX(-1px)}
  60%{transform:rotate(3deg) translateX(1px)}
  70%{transform:rotate(-2deg)}
  80%{transform:rotate(1deg)}
  90%{transform:rotate(0)}
}
.shaking .box-inner{animation:shake-box .6s ease-in-out}

/* ===== PAGE 4 — RESULT ===== */
#pg4 .page-bg{background-image:url(data:image/png;base64,${p4})}

.result-content{
  flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:20px
}
.result-card{
  width:80%;max-width:280px;aspect-ratio:.85;border-radius:22px;
  background:rgba(255,248,240,.92);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  box-shadow:0 16px 56px rgba(0,0,0,.2);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:20px;position:relative;overflow:hidden
}
.result-card::before{
  content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;
  background:conic-gradient(from 0deg,transparent,rgba(212,97,140,.06),transparent,rgba(230,126,34,.06),transparent);
  animation:spin-glow 4s linear infinite
}
@keyframes spin-glow{to{transform:rotate(360deg)}}
.result-new{
  position:absolute;top:12px;right:12px;
  padding:3px 10px;border-radius:10px;
  background:#D4618C;color:#fff;font-size:11px;font-weight:800;letter-spacing:1px
}
.result-emoji{font-size:72px;position:relative;z-index:1}
.result-name{font-size:22px;color:#2D2016;font-weight:800;margin-top:8px;position:relative;z-index:1}
.result-sub{font-size:13px;color:#A0937D;margin-top:4px;position:relative;z-index:1}
.result-btn{
  margin-top:28px;padding:14px 56px;border-radius:28px;
  background:linear-gradient(135deg,#D4618C,#E67E22);color:#fff;
  font-size:17px;font-weight:700;letter-spacing:1.5px;
  border:none;cursor:pointer;position:relative;z-index:1;
  box-shadow:0 6px 22px rgba(212,97,140,.35)
}
.result-btn:active{transform:scale(.95)}

/* Confetti */
.confetti-particle{
  position:absolute;z-index:100;pointer-events:none;
  animation:confetti-fall 2.2s cubic-bezier(.25,.46,.45,.94) forwards
}
@keyframes confetti-fall{
  0%{opacity:1;transform:translateY(0) rotate(0deg) scale(1)}
  100%{opacity:0;transform:translateY(400px) rotate(720deg) scale(.2)}
}

/* Visual pulse (iOS vibration fallback) */
.visual-pulse{
  position:fixed;top:0;left:0;right:0;bottom:0;
  background:radial-gradient(circle at center,rgba(212,97,140,.18) 0%,transparent 70%);
  z-index:999;pointer-events:none;opacity:0;transition:opacity .12s
}
.visual-pulse.active{opacity:1}

/* Toast */
.toast{
  position:fixed;top:14%;left:50%;transform:translateX(-50%) translateY(-15px);
  padding:11px 26px;background:rgba(44,33,22,.9);color:#FFF8F0;
  border-radius:22px;font-size:14px;font-weight:500;z-index:300;
  opacity:0;transition:all .3s;pointer-events:none
}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}

/* Preview modal */
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
  display:flex;flex-wrap:wrap;gap:10px;justify-content:center;
  box-shadow:0 12px 48px rgba(0,0,0,.2)
}
.modal-char{
  width:23%;aspect-ratio:1;border-radius:14px;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  background:#FFF;box-shadow:0 2px 8px rgba(0,0,0,.06)
}
.modal-char .mc-emoji{font-size:30px}
.modal-char .mc-name{font-size:9px;color:#5C4A3A;margin-top:3px;font-weight:600}

/* Ad modal */
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
  background:transparent;border:none;color:#A0937D;font-size:13px;cursor:pointer
}

/* Page transitions */
.page-enter{animation:pageIn .3s ease-out}
@keyframes pageIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
</style>
</head>
<body>

<div id="app">

<!-- ========== PAGE 1 HOME ========== -->
<div class="page active" id="pg1">
  <div class="page-bg"></div>
  <div class="page-content">
    <div class="quota-badge" id="quotaDisplay">🎁 x8</div>
    <div class="home-content">
      <button class="btn-start" onclick="goToGame()">START</button>
      <button class="btn-collection" onclick="goToCollection()">Collection Guide</button>
    </div>
  </div>
</div>

<!-- ========== PAGE 2 COLLECTION ========== -->
<div class="page" id="pg2">
  <div class="page-bg"></div>
  <div class="page-content">
    <div class="coll-top">
      <button class="coll-close" onclick="goHome()">✕</button>
      <div class="coll-tabs" id="collTabs"></div>
    </div>
    <div class="series-name">✦ COZY FRIENDS ✦ <span class="preview-eye" onclick="togglePreview()">👁</span></div>
    <div class="coll-grid" id="collGrid"></div>
    <div class="coll-footer">
      <span class="coll-progress" id="collProgress">5/9</span>
      <button class="coll-share" onclick="toast('Shared! 🎉')">SHARE</button>
    </div>
  </div>
</div>

<!-- ========== PAGE 3 GAME ========== -->
<div class="page" id="pg3">
  <div class="page-bg"></div>
  <div class="page-content">
    <div class="game-header">
      <div class="game-tabs" id="gameTabs"></div>
      <div class="target-pill" id="targetPill">
        find: <span class="target-icon" id="targetIcon">❓</span> (<span id="targetCounter">0</span>/1)
      </div>
    </div>
    <div class="instruction" id="instructionText">Match →</div>
    <div class="box-area" id="boxArea">
      <div class="box-wrap side" id="boxL" onclick="selectBox(0)">
        <div class="box-inner">?</div>
        <div class="box-binding" id="bind0"></div>
      </div>
      <div class="box-wrap center" id="boxC" onclick="selectBox(1)">
        <div class="box-inner">?</div>
        <div class="box-binding" id="bind1"></div>
      </div>
      <div class="box-wrap side" id="boxR" onclick="selectBox(2)">
        <div class="box-inner">?</div>
        <div class="box-binding" id="bind2"></div>
      </div>
    </div>
    <div class="shake-zone">
      <button class="shake-btn" id="shakeBtn" onclick="doShake()">SHAKE</button>
      <span class="shake-count" id="shakeCount">x7</span>
    </div>
    <div class="candidate-row" id="candidateRow"></div>
    <div class="confirm-zone">
      <button class="confirm-btn disabled" id="confirmBtn" onclick="doConfirm()">Pick it</button>
    </div>
  </div>
</div>

<!-- ========== PAGE 4 RESULT ========== -->
<div class="page" id="pg4">
  <div class="page-bg"></div>
  <div class="page-content">
    <div id="confettiContainer"></div>
    <div class="result-content">
      <div class="result-card" id="resultCard">
        <div class="result-new" id="resultNew" style="display:none">NEW!</div>
        <div class="result-emoji" id="resultEmoji">🐥</div>
        <div class="result-name" id="resultName">Pip</div>
        <div class="result-sub" id="resultSub">Got new character!</div>
      </div>
      <button class="result-btn" id="resultBtn" onclick="handleResult()">Continue</button>
    </div>
  </div>
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
    <div class="ad-modal-sub">Today's free shakes are used up!<br>Watch a short ad to get +1.</div>
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
    {id:"t",       name:"T-Rex",     emoji:"\\u{1F995}",collected:false},
    {id:"hidden",  name:"HIDDEN",    emoji:"\\u{1F512}",isHidden:true,collected:false},
  ]
};

var GENES={
  pip:{mass:1.1,parts:1,fill:0.85,looseness:0.2,pitch:1.0},
  mochi:{mass:0.85,parts:1,fill:0.6,looseness:0.5,pitch:1.15},
  biscuit:{mass:1.3,parts:2,fill:0.9,looseness:0.15,pitch:0.88},
  lumi:{mass:0.7,parts:1,fill:0.45,looseness:0.6,pitch:1.25},
  creme:{mass:0.95,parts:2,fill:0.75,looseness:0.3,pitch:1.05},
  daisy:{mass:1.15,parts:1,fill:0.88,looseness:0.18,pitch:0.92},
  hugo:{mass:1.0,parts:3,fill:0.7,looseness:0.35,pitch:0.98},
  t:{mass:1.2,parts:1,fill:0.82,looseness:0.22,pitch:0.9},
  hidden:{mass:0.9,parts:2,fill:0.55,looseness:0.45,pitch:1.1},
};

// ============================================================
// STATE
// ============================================================
var state={
  page:"home",  // "home" | "collection" | "game" | "result"
  focusIdx:1,   // 0=L, 1=C, 2=R
  bindings:[null,null,null],
  shakeCount:7,
  maxShakes:7,
  targetChar:null,
  candidates:[],
  resultChar:null,
  isNewResult:false,
  isTargetHit:false,
  seriesIdx:0,
  quotaFree:8,
  quotaMax:8,
  lastQuotaTime:Date.now(),
  cooldownMs:90*60*1000,
  adCooldownEnd:0,
};

// ============================================================
// AUDIO ENGINE
// ============================================================
var audioCtx=null;
function getAC(){
  if(!audioCtx) audioCtx=new(window.AudioContext||window.webkitAudioContext)();
  return audioCtx;
}

function playImpact(gene){
  try{
    var ac=getAC();
    if(ac.state==="suspended") ac.resume();
    var now=ac.currentTime;
    var hitCount=Math.round(gene.parts*1.8)+Math.floor(Math.random()*2);
    var baseVol=(gene.mass*0.22+0.14)*(gene.pitch<1?0.92+gene.pitch*0.08:1);

    for(var i=0;i<hitCount;i++){
      var delay=now+i*(0.045+Math.random()*0.065);
      var osc=ac.createOscillator();
      var gain=ac.createGain();
      var filter=ac.createBiquadFilter();
      osc.type="triangle";
      var baseFreq=110+(gene.fill*190)*gene.pitch+Math.random()*50;
      osc.frequency.setValueAtTime(Math.max(20,baseFreq),delay);
      osc.frequency.exponentialRampToValueAtTime(Math.max(20,35+gene.looseness*28),delay+0.13);
      filter.type="lowpass";
      filter.frequency.setValueAtTime(Math.max(100,2600-(gene.mass*750)),delay);
      filter.Q.value=1+gene.looseness*2.8;
      gain.gain.setValueAtTime(baseVol*(0.68+Math.random()*0.32),delay);
      gain.gain.exponentialRampToValueAtTime(0.001,delay+0.16+(gene.looseness*0.09));
      osc.connect(filter);filter.connect(gain);gain.connect(ac.destination);
      osc.start(delay);osc.stop(delay+0.22);

      if(gene.parts>=1.5 && i%2===0){
        var o2=ac.createOscillator();var g2=ac.createGain();
        o2.type="sine";
        o2.frequency.setValueAtTime(Math.max(100,2100*gene.pitch+Math.random()*1400),delay+0.018);
        o2.frequency.exponentialRampToValueAtTime(Math.max(100,750),delay+0.058);
        g2.gain.setValueAtTime(baseVol*0.32,delay+0.018);
        g2.gain.exponentialRampToValueAtTime(0.001,delay+0.078);
        o2.connect(g2);g2.connect(ac.destination);
        o2.start(delay+0.018);o2.stop(delay+0.098);
      }
    }

    if(gene.fill<0.72){
      var noise=ac.createOscillator();var ng=ac.createGain();var nf=ac.createBiquadFilter();
      noise.type="sawtooth";noise.frequency.value=Math.max(20,75+gene.fill*115);
      nf.type="bandpass";nf.frequency.value=Math.max(100,380+gene.looseness*480);
      nf.Q.value=2.2+gene.fill*3.8;
      ng.gain.setValueAtTime(baseVol*0.11,now+hitCount*0.048);
      ng.gain.exponentialRampToValueAtTime(0.001,now+hitCount*0.048+0.28);
      noise.connect(nf);nf.connect(ng);ng.connect(ac.destination);
      noise.start(now+hitCount*0.048);noise.stop(now+0.52);
    }
  }catch(e){}

  if(typeof navigator.vibrate==="function"){
    var pat=[];
    for(var j=0;j<(hitCount||1);j++){pat.push(28+Math.floor(Math.random()*36));pat.push(18+Math.floor(Math.random()*48));}
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
  document.querySelectorAll(".page").forEach(function(p){p.classList.remove("active")});
  var pg=document.getElementById(id);
  pg.classList.add("active");pg.classList.add("page-enter");
  setTimeout(function(){pg.classList.remove("page-enter")},320);

  if(id==="pg1") state.page="home";
  else if(id==="pg2") state.page="collection";
  else if(id==="pg3"){state.page="game";initRound();}
  else if(id==="pg4"){state.page="result";showConfetti();}

  if(id==="pg1") updateQuotaDisplay();
}

function goHome(){showPage("pg1")}
function goToCollection(){buildCollection();showPage("pg2")}
function goToGame(){
  checkQuotaRefill();
  if(state.quotaFree<=0){
    showAdModal();
    return;
  }
  state.quotaFree--;
  state.targetChar=null;
  updateQuotaDisplay();
  showPage("pg3");
}

// ============================================================
// QUOTA SYSTEM
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
function showAdModal(){document.getElementById("adModal").classList.add("show")}
function closeAdModal(){document.getElementById("adModal").classList.remove("show")}
function watchAd(){
  closeAdModal();
  if(Date.now()<state.adCooldownEnd){
    toast("Wait a moment...");
    return;
  }
  state.quotaFree++;
  state.adCooldownEnd=Date.now()+30000;
  toast("+1 Shake! 🎉");
  updateQuotaDisplay();
}

// ============================================================
// COLLECTION PAGE
// ============================================================
function buildCollection(){
  // Tabs
  var tabsEl=document.getElementById("collTabs");
  tabsEl.innerHTML="";
  SERIES.tabs.forEach(function(t,i){
    var tab=document.createElement("div");
    tab.className="coll-tab"+(i===state.seriesIdx?" active":"");
    tab.textContent=t;
    tab.onclick=function(){
      state.seriesIdx=i;
      document.querySelectorAll(".coll-tab").forEach(function(tt,j){tt.classList.toggle("active",j===i)});
    };
    tabsEl.appendChild(tab);
  });

  // Grid
  var grid=document.getElementById("collGrid");
  grid.innerHTML="";
  SERIES.characters.forEach(function(ch,i){
    var cell=document.createElement("div");
    cell.className="grid-cell";
    if(ch.isHidden) cell.classList.add("locked");
    else if(!ch.collected) cell.classList.add("empty");
    else cell.classList.add("collected");

    if(ch.isHidden){
      cell.innerHTML='<span class="cell-emoji">❓</span><span class="cell-name">???</span><span class="cell-lock">🔒</span>';
    }else if(ch.collected){
      cell.innerHTML='<span class="cell-emoji">'+ch.emoji+'</span><span class="cell-name">'+ch.name+'</span>';
    }else{
      cell.innerHTML='<span class="cell-emoji" style="opacity:.3">'+ch.emoji+'</span><span class="cell-name">'+ch.name+'</span>';
    }
    cell.onclick=function(){enterLevel(i)};
    grid.appendChild(cell);
  });

  // Progress
  var collected=SERIES.characters.filter(function(c){return c.collected}).length;
  document.getElementById("collProgress").textContent=collected+"/"+SERIES.characters.length;
}

function enterLevel(charIdx){
  var ch=SERIES.characters[charIdx];
  if(ch.isHidden){
    toast("Hidden edition \\u2014 find it by playing!");
    return;
  }
  if(ch.collected){
    toast("You already have "+ch.name+"! \\u2728");
    return;
  }
  state.targetChar=ch;
  checkQuotaRefill();
  if(state.quotaFree<=0){
    showAdModal();
    return;
  }
  state.quotaFree--;
  updateQuotaDisplay();
  showPage("pg3");
}

function togglePreview(){
  var m=document.getElementById("previewModal");
  m.classList.toggle("show");
  if(m.classList.contains("show")) buildPreview();
}
function buildPreview(){
  var c=document.getElementById("previewContent");c.innerHTML="";
  SERIES.characters.filter(function(x){return !x.isHidden}).forEach(function(ch){
    var d=document.createElement("div");d.className="modal-char";
    d.innerHTML='<span class="mc-emoji">'+ch.emoji+'</span><span class="mc-name">'+ch.name+'</span>';
    c.appendChild(d);
  });
}
document.getElementById("previewModal").onclick=function(e){if(e.target===this)this.classList.remove("show")};

// ============================================================
// GAME PAGE
// ============================================================
function initRound(){
  if(!state.targetChar){
    var r=SERIES.characters.filter(function(c){return !c.isHidden && !c.collected});
    if(r.length===0) r=SERIES.characters.filter(function(c){return !c.isHidden});
    state.targetChar=r[Math.floor(Math.random()*r.length)];
  }

  // Build 5 candidates
  var pool=SERIES.characters.filter(function(c){return !c.isHidden && c.id!==state.targetChar.id});
  shuffle(pool);
  state.candidates=[state.targetChar];
  for(var i=0;i<pool.length && state.candidates.length<5;i++){
    state.candidates.push(pool[i]);
  }
  while(state.candidates.length<5) state.candidates.push(pool[0]||state.targetChar);
  shuffle(state.candidates);

  // Reset
  state.focusIdx=1;
  state.bindings=[null,null,null];
  state.maxShakes=7;
  state.shakeCount=state.maxShakes;

  // UI
  document.getElementById("targetIcon").textContent=state.targetChar.emoji+"❓";
  document.getElementById("targetCounter").textContent="0";
  document.getElementById("shakeCount").textContent="x"+state.shakeCount;
  document.getElementById("shakeBtn").className="shake-btn";
  document.getElementById("instructionText").textContent="Match \\u2192";

  // Clear bindings
  for(var b=0;b<3;b++){
    document.getElementById("bind"+b).style.display="none";
    document.getElementById("bind"+b).innerHTML="";
  }

  // Game tabs
  var gt=document.getElementById("gameTabs");gt.innerHTML="";
  SERIES.tabs.forEach(function(t,i){
    var tab=document.createElement("div");
    tab.className="game-tab"+(i===state.seriesIdx?" active":"");
    tab.textContent=t;
    gt.appendChild(tab);
  });

  buildCandidates();
  updateBoxFocus();
  updateConfirmBtn();
}

function buildCandidates(){
  var row=document.getElementById("candidateRow");row.innerHTML="";
  for(var i=0;i<Math.min(5,state.candidates.length);i++){
    (function(idx){
      var ch=state.candidates[idx];
      var card=document.createElement("div");
      card.className="candidate-card";card.id="cand"+idx;
      card.innerHTML='<span class="cand-emoji">'+ch.emoji+'</span><div class="cand-name">'+ch.name+'</div>';
      card.onclick=function(){selectCandidate(idx)};
      row.appendChild(card);
    })(i);
  }
}

function selectCandidate(idx){
  if(state.page!=="game") return;
  var ch=state.candidates[idx];

  // Toggle: if this candidate is already bound to focused box, unbind
  if(state.bindings[state.focusIdx] && state.bindings[state.focusIdx].id===ch.id){
    state.bindings[state.focusIdx]=null;
    document.getElementById("bind"+state.focusIdx).style.display="none";
    document.getElementById("bind"+state.focusIdx).innerHTML="";
  }else{
    // Remove this candidate from any other box
    for(var b=0;b<3;b++){
      if(state.bindings[b] && state.bindings[b].id===ch.id){
        state.bindings[b]=null;
        document.getElementById("bind"+b).style.display="none";
        document.getElementById("bind"+b).innerHTML="";
      }
    }
    state.bindings[state.focusIdx]=ch;
    var bindEl=document.getElementById("bind"+state.focusIdx);
    bindEl.innerHTML=ch.emoji;
    bindEl.style.display="flex";
  }

  // Update candidate card selection visuals
  document.querySelectorAll(".candidate-card").forEach(function(c,i){
    if(i>=state.candidates.length) return;
    var isBound=state.bindings.some(function(b){return b && b.id===state.candidates[i].id});
    c.classList.toggle("selected",isBound);
  });

  updateConfirmBtn();
}

function selectBox(idx){
  state.focusIdx=idx;
  updateBoxFocus();
}

function updateBoxFocus(){
  var ids=["boxL","boxC","boxR"];
  for(var i=0;i<3;i++){
    var el=document.getElementById(ids[i]);
    if(i===state.focusIdx){
      el.classList.remove("side");el.classList.add("center");
    }else{
      el.classList.remove("center");el.classList.add("side");
    }
  }
}

function updateConfirmBtn(){
  var btn=document.getElementById("confirmBtn");
  var hasCenterBind=state.bindings[1]!=null;
  if(hasCenterBind){
    btn.className="confirm-btn ready";
  }else{
    btn.className="confirm-btn disabled";
  }
}

// ============================================================
// SHAKE
// ============================================================
function doShake(){
  if(state.shakeCount<=0){
    toast("No more shakes! Make your pick.");
    return;
  }
  state.shakeCount--;
  document.getElementById("shakeCount").textContent="x"+state.shakeCount;

  if(state.shakeCount<=1){
    document.getElementById("shakeBtn").className="shake-btn disabled";
  }

  // Get gene
  var boundCh=state.bindings[state.focusIdx];
  var gene=boundCh?GENES[boundCh.id]:GENES.t;
  playImpact(gene);

  // Animate box
  var boxId=["boxL","boxC","boxR"][state.focusIdx];
  var boxWrap=document.getElementById(boxId);
  boxWrap.classList.add("shaking");
  setTimeout(function(){boxWrap.classList.remove("shaking")},650);

  // Update instruction
  if(state.shakeCount===4) document.getElementById("instructionText").textContent="Listen closely...";
  if(state.shakeCount===1) document.getElementById("instructionText").textContent="Last chance!";
  if(state.shakeCount===0) document.getElementById("instructionText").textContent="Pick now!";
}

// ============================================================
// CONFIRM
// ============================================================
function doConfirm(){
  var bound=state.bindings[1];
  if(!bound){
    toast("Tap a character below, then Pick it!");
    return;
  }

  var hitTarget=bound.id===state.targetChar.id;
  if(hitTarget){
    state.resultChar=state.targetChar;
    state.isTargetHit=true;
  }else{
    if(Math.random()<0.2){
      state.resultChar=state.targetChar;
      state.isTargetHit=true;
    }else{
      var others=state.candidates.filter(function(c){return c.id!==state.targetChar.id});
      state.resultChar=others[Math.floor(Math.random()*others.length)]||bound;
      state.isTargetHit=false;
    }
  }

  state.isNewResult=!SERIES.characters.find(function(c){return c.id===state.resultChar.id}).collected;

  // Update result page
  document.getElementById("resultEmoji").textContent=state.resultChar.emoji;
  document.getElementById("resultName").textContent=state.resultChar.name;
  document.getElementById("resultNew").style.display=state.isNewResult?"block":"none";
  document.getElementById("resultSub").textContent=state.isTargetHit?"You found the target! \\u2728":"Better luck next time!";
  document.getElementById("resultBtn").textContent=state.isTargetHit?"Continue":"Play Again";

  showPage("pg4");
}

// ============================================================
// RESULT
// ============================================================
function handleResult(){
  var ch=SERIES.characters.find(function(c){return c.id===state.resultChar.id});
  if(ch) ch.collected=true;

  if(state.isTargetHit){
    goToCollection();
  }else{
    goHome();
  }
}

function showConfetti(){
  var c=document.getElementById("confettiContainer");c.innerHTML="";
  if(!state.isNewResult) return;
  var colors=["#FFD4E5","#F5E6D3","#D4618C","#FFE082","#98D8C8","#B8A0D0","#E67E22"];
  for(var i=0;i<35;i++){
    var p=document.createElement("div");
    p.className="confetti-particle";
    p.style.left=(30+Math.random()*40)+"%";
    p.style.top=(20+Math.random()*20)+"%";
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
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}}
function toast(msg){var t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(function(){t.classList.remove("show")},2200);}

// Swipe on box area
var touchStartX=0;
document.getElementById("boxArea").addEventListener("touchstart",function(e){touchStartX=e.touches[0].clientX},{passive:true});
document.getElementById("boxArea").addEventListener("touchend",function(e){
  var dx=e.changedTouches[0].clientX-touchStartX;
  if(Math.abs(dx)>45){
    if(dx<0 && state.focusIdx<2) selectBox(state.focusIdx+1);
    else if(dx>0 && state.focusIdx>0) selectBox(state.focusIdx-1);
  }
},{passive:true});

// Desktop keyboard
document.addEventListener("keydown",function(e){
  if(state.page!=="game") return;
  if(e.key==="ArrowLeft") selectBox(Math.max(0,state.focusIdx-1));
  if(e.key==="ArrowRight") selectBox(Math.min(2,state.focusIdx+1));
  if(e.key===" "){e.preventDefault();doShake();}
  if(e.key>="1" && e.key<="5") selectCandidate(parseInt(e.key)-1);
  if(e.key==="Enter") doConfirm();
});

// Warm up AudioContext on iOS
var _aw=false;
function warmAudio(){if(_aw)return;try{var c=new(window.AudioContext||window.webkitAudioContext)();if(c.state==="suspended")c.resume();_aw=true;}catch(e){}}
document.addEventListener("touchstart",warmAudio,{once:true});
document.addEventListener("click",warmAudio,{once:true});

// INIT
checkQuotaRefill();
updateQuotaDisplay();
console.log("ShakeSecret Demo v3 loaded \\uD83C\\uDF81");
</script>
</body>
</html>`;

fs.writeFileSync(path.join(BASE, 'shakesecret-demo.html'), html);
console.log('Done! Size: ' + Math.round(html.length/1024) + ' KB');
