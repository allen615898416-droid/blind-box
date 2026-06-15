const fs = require('fs');
const path = require('path');

// Read base64 images
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
html,body{width:100%;height:100%;overflow:hidden;font-family:-apple-system,"PingFang SC",sans-serif;background:#FFF8F0;user-select:none;-webkit-user-select:none}
#app{width:100%;max-width:430px;height:100vh;margin:0 auto;position:relative;overflow:hidden;background:#FFF8F0}

.page{position:absolute;top:0;left:0;width:100%;height:100%;background-size:cover;background-position:center;background-repeat:no-repeat;display:none}
.page.active{display:block}

/* P1 */
#pg1{background-image:url(data:image/png;base64,${p1})}
.btn-start{position:absolute;bottom:22%;left:50%;transform:translateX(-50%);width:70%;height:58px;border-radius:29px;background:transparent;border:none;cursor:pointer}
.btn-collection{position:absolute;bottom:12%;left:50%;transform:translateX(-50%);width:55%;height:42px;border-radius:21px;background:transparent;border:none;cursor:pointer}

/* P2 */
#pg2{background-image:url(data:image/png;base64,${p2})}
.tab-bar{position:absolute;top:7%;left:4%;right:4%;display:flex;gap:2px}
.tab-item{flex:1;text-align:center;padding:6px 2px;font-size:10px;color:#A0937D;border-bottom:2px solid transparent;cursor:pointer}
.tab-item.active{color:#5C4A3A;border-bottom-color:#D4618C;font-weight:700}
.grid-cell{position:absolute;width:28%;aspect-ratio:1;border-radius:14px;cursor:pointer;transition:transform .15s}
.grid-cell:active{transform:scale(.95)}
.preview-btn{position:absolute;top:16.5%;right:5.5%;width:32px;height:32px;border-radius:50%;background:transparent;border:none;font-size:18px;cursor:pointer}
.close-btn{position:absolute;top:3%;left:4%;width:32px;height:32px;font-size:20px;color:#5C4A3A;background:transparent;border:none;cursor:pointer}

/* P3 */
#pg3{background-image:url(data:image/png;base64,${p3})}
.target-area{position:absolute;top:3.5%;left:50%;transform:translateX(-50%);width:85%;height:44px;display:flex;align-items:center;gap:10px;font-size:15px;color:#5C4A3A}
.game-tab-bar{position:absolute;top:9.5%;left:4%;right:4%;display:flex;gap:2px}
.box-area{position:absolute;top:18%;left:0;right:0;height:38%;display:flex;align-items:center;justify-content:center}
.box-wrap{position:relative;width:36%;height:100%;transition:all .35s cubic-bezier(.25,.8,.25,1)}
.box-wrap.side{width:24%;opacity:.55;transform:scale(.78)}
.box-inner{width:100%;height:100%;cursor:pointer;transition:transform .08s}
.box-inner:active{transform:scale(.96)}
.box-binding{position:absolute;top:-28px;left:50%;transform:translateX(-50%);width:36px;height:36px;border-radius:50%;border:2.5px solid #D4618C;overflow:hidden;background:#FFF;display:none;align-items:center;justify-content:center}
.shake-btn{position:absolute;top:56.5%;left:50%;transform:translateX(-50%);width:48%;height:46px;border-radius:23px;background:transparent;border:none;cursor:pointer}
.shake-count{position:absolute;top:57%;right:19%;font-size:17px;font-weight:800;color:#E67E22}
.candidate-row{position:absolute;top:65.5%;left:50%;transform:translateX(-50%);width:92%;display:flex;gap:2.5%}
.candidate-card{flex:1;aspect-ratio:.82;border-radius:12px;cursor:pointer;border:2.5px solid transparent;transition:all .15s;display:flex;flex-direction:column;align-items:center;justify-content:center}
.candidate-card.selected{border-color:#D4618C;transform:scale(1.06)}
.candidate-name{font-size:9px;color:#5C4A3A;margin-top:2px;font-weight:600}
.confirm-btn{position:absolute;bottom:3%;left:4%;width:92%;height:52px;border-radius:26px;background:transparent;border:none;cursor:pointer;transition:opacity .3s}
.confirm-btn.ready{animation:pulse-glow 1.2s infinite}
.instruction{position:absolute;top:54%;left:50%;transform:translateX(-50%);font-size:12px;color:#B8A08C;font-weight:600;letter-spacing:1px}
@keyframes pulse-glow{50%{filter:brightness(1.05)}}
@keyframes shake-box{
0%,100%{transform:rotate(0) translateX(0)}10%{transform:rotate(-8deg) translateX(-4px)}20%{transform:rotate(7deg) translateX(3px)}30%{transform:rotate(-6deg) translateX(-3px)}40%{transform:rotate(5deg) translateX(2px)}50%{transform:rotate(-4deg) translateX(-2px)}60%{transform:rotate(3deg) translateX(1px)}70%{transform:rotate(-2deg) translateX(1px)}80%{transform:rotate(1deg) translateX(0)}90%{transform:rotate(0) translateX(0)}
}
.shaking .box-inner,.shaking.box-wrap.center{animation:shake-box .55s ease-in-out}

/* P4 */
#pg4{background-image:url(data:image/png;base64,${p4})}
.result-btn{position:absolute;bottom:8%;left:50%;transform:translateX(-50%);width:65%;height:48px;border-radius:24px;background:transparent;border:none;cursor:pointer}
.confetti-particle{position:absolute;width:8px;height:8px;z-index:100;pointer-events:none;animation:confetti-fall 2s ease-out forwards}
@keyframes confetti-fall{100%{opacity:0;transform:translateY(300px) rotate(720deg) scale(.3)}}

.visual-pulse{position:fixed;top:0;left:0;right:0;bottom:0;background:radial-gradient(circle,rgba(212,97,140,.18),transparent 70%);z-index:999;pointer-events:none;opacity:0;transition:opacity .15s}
.visual-pulse.active{opacity:1}
.toast{position:fixed;top:15%;left:50%;transform:translateX(-50%) translateY(-20px);padding:10px 24px;background:rgba(44,33,22,.88);color:#FFF8F0;border-radius:20px;font-size:13px;z-index:200;opacity:0;transition:all .3s;pointer-events:none}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
.modal-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.45);z-index:150;display:none;align-items:center;justify-content:center}
.modal-overlay.show{display:flex}
.modal-content{width:85%;max-height:70vh;background:#FFF8F0;border-radius:20px;padding:20px;display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
.modal-char{width:22%;aspect-ratio:1;border-radius:12px;display:flex;flex-direction:column;align-items:center}
</style>
</head>
<body>
<div id="app">

<div class="page active" id="pg1">
<button class="btn-start" onclick="goToGame()"></button>
<button class="btn-collection" onclick="goToCollection()"></button>
</div>

<div class="page" id="pg2">
<button class="close-btn" onclick="goHome()">✕</button>
<div class="tab-bar" id="tabBar"></div>
<button class="preview-btn" onclick="togglePreview()">👁</button>
</div>

<div class="page" id="pg3">
<div class="target-area" id="targetArea">find: <span id="targetIcon">?</span> (<span id="targetCounter">0</span>/1)</div>
<div class="game-tab-bar" id="gameTabBar"></div>
<div class="instruction">Match →</div>
<div class="box-area" id="boxArea">
<div class="box-wrap side" id="boxL"><div class="box-inner" onclick="selectBox(0)" ontouchstart="selectBox(0)"></div><div class="box-binding" id="bind0"></div></div>
<div class="box-wrap center" id="boxC"><div class="box-inner" onclick="selectBox(1)" ontouchstart="selectBox(1)"></div><div class="box-binding" id="bind1"></div></div>
<div class="box-wrap side" id="boxR"><div class="box-inner" onclick="selectBox(2)" ontouchstart="selectBox(2)"></div><div class="box-binding" id="bind2"></div></div>
</div>
<button class="shake-btn" id="shakeBtn" onclick="doShake()"></button><div class="shake-count" id="shakeCount">x7</div>
<div class="candidate-row" id="candidateRow"></div>
<button class="confirm-btn" id="confirmBtn" onclick="doConfirm()"></button>
</div>

<div class="page" id="pg4">
<div id="confettiContainer"></div>
<button class="result-btn" id="resultBtn" onclick="handleResult()"></button>
</div>

</div>

<div class="visual-pulse" id="visualPulse"></div>
<div class="toast" id="toast"></div>
<div class="modal-overlay" id="previewModal"><div class="modal-content" id="previewContent"></div></div>

<script>
var SERIES={
  name:"COZY FRIENDS",
  tabs:["COZY FRIENDS","SWEET DREAMS","BERRY BUDDIES","FOREST TALES","PUFFY LAND"],
  characters:[
    {id:"pip",name:"Pip",emoji:"\u{1F425}",collected:true},
    {id:"mochi",name:"Mochi",emoji:"\u{1F430}",collected:false},
    {id:"biscuit",name:"Biscuit",emoji:"\u{1F43B}",collected:true},
    {id:"lumi",name:"Lumi",emoji:"\u{1F9DA}",collected:false},
    {id:"creme",name:"Crème Puff",emoji:"\u{1F431}",collected:true},
    {id:"daisy",name:"Daisy",emoji:"\u{1F411}",collected:true},
    {id:"hugo",name:"Hugo",emoji:"\u{1F994}",collected:true},
    {id:"t",name:"?",emoji:"\u{1F995}",collected:false},
    {id:"hidden",name:"HIDDEN",emoji:"\u{1F512}",isHidden:true,collected:false},
  ]
};

var GENES={
  pip:{mass:1.1,parts:1,fill:0.85,looseness:0.2},
  mochi:{mass:0.85,parts:1,fill:0.6,looseness:0.5},
  biscuit:{mass:1.3,parts:2,fill:0.9,looseness:0.15},
  lumi:{mass:0.7,parts:1,fill:0.45,looseness:0.6},
  creme:{mass:0.95,parts:2,fill:0.75,looseness:0.3},
  daisy:{mass:1.15,parts:1,fill:0.88,looseness:0.18},
  hugo:{mass:1.0,parts:3,fill:0.7,looseness:0.35},
  t:{mass:1.2,parts:1,fill:0.82,looseness:0.22},
  hidden:{mass:0.9,parts:2,fill:0.55,looseness:0.45},
};

var state={page:"home",focusIdx:1,bindings:[null,null,null],shakeCount:7,targetChar:null,candidates:[],resultChar:null,isNewResult:false,isTargetHit:false,seriesIdx:0};
var audioCtx=null;

function getAC(){if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext);return audioCtx;}

function playImpact(gene){
  var ac=getAC();if(ac.state==="suspended")ac.resume();
  var now=ac.currentTime;
  var hitCount=Math.round(gene.parts*2)+Math.floor(Math.random()*2);
  var baseVol=gene.mass*0.25+0.15;
  for(var i=0;i<hitCount;i++){
    var delay=now+i*(0.04+Math.random()*0.07);
    var osc=ac.createOscillator();
    var gain=ac.createGain();
    var filter=ac.createBiquadFilter();
    osc.type="triangle";
    osc.frequency.setValueAtTime(120+(gene.fill*180)+Math.random()*60,delay);
    osc.frequency.exponentialRampToValueAtTime(40+gene.looseness*30,delay+0.12);
    filter.type="lowpass";
    filter.frequency.setValueAtTime(2500-(gene.mass*800),delay);
    filter.Q.value=1+gene.looseness*3;
    gain.gain.setValueAtTime(baseVol*(0.7+Math.random()*0.3),delay);
    gain.gain.exponentialRampToValueAtTime(0.001,delay+0.15+(gene.looseness*0.1));
    osc.connect(filter).connect(gain).connect(ac.destination);
    osc.start(delay);osc.stop(delay+0.2);
    if(gene.parts>=1.5&&i%2===0){
      var o2=ac.createOscillator();var g2=ac.createGain();
      o2.type="sine";o2.frequency.setValueAtTime(2200+Math.random()*1500,delay+0.02);
      o2.frequency.exponentialRampToValueAtTime(800,delay+0.06);
      g2.gain.setValueAtTime(baseVol*0.35,delay+0.02);
      g2.gain.exponentialRampToValueAtTime(0.001,delay+0.08);
      o2.connect(g2).connect(ac.destination);o2.start(delay+0.02);o2.stop(delay+0.1);
    }
  }
  if(gene.fill<0.7){
    var noise=ac.createOscillator();var ng=ac.createGain();var nf=ac.createBiquadFilter();
    noise.type="sawtooth";noise.frequency.value=80+gene.fill*120;
    nf.type="bandpass";nf.frequency.value=400+gene.looseness*500;nf.Q.value=2+gene.fill*4;
    ng.gain.setValueAtTime(baseVol*0.12,now+hitCount*0.05);
    ng.gain.exponentialRampToValueAtTime(0.001,now+hitCount*0.05+0.25);
    noise.connect(nf).connect(ng).connect(ac.destination);
    noise.start(now+hitCount*0.05);noise.stop(now+0.5);
  }
  if(typeof navigator.vibrate==="function"){
    var pattern=[];for(var j=0;j<hitCount;j++){pattern.push(30+Math.floor(Math.random()*40));pattern.push(20+Math.floor(gene.looseness*50));}
    navigator.vibrate(pattern.slice(0,-1));
  }else{showVisualPulse();}
}
function showVisualPulse(){var el=document.getElementById("visualPulse");el.classList.add("active");setTimeout(function(){el.classList.remove("active")},150);}

function showPage(id){document.querySelectorAll(".page").forEach(function(p){p.classList.remove("active")});document.getElementById(id).classList.add("active");state.page=id.replace("pg","");if(id==="pg3")initRound();if(id==="pg4")showConfetti();}
function goHome(){showPage("pg1")}
function goToCollection(){buildCollection();showPage("pg2")}
function goToGame(){showPage("pg3")}

function buildCollection(){
  var tabEl=document.getElementById("tabBar");tabEl.innerHTML="";
  SERIES.tabs.forEach(function(t,i){
    var d=document.createElement("div");d.className="tab-item"+(i===state.seriesIdx?" active":"");d.textContent=t;d.onclick=function(){switchSeries(i)};tabEl.appendChild(d);
  });
  var pg=document.getElementById("pg2");document.querySelectorAll(".grid-cell").forEach(function(e){e.remove()});
  var pos=[[8,26],[37,26],[66,26],[8,51],[37,51],[66,51],[8,76],[37,76],[66,76]];
  SERIES.characters.forEach(function(ch,i){
    var cell=document.createElement("div");cell.className="grid-cell";cell.style.left=pos[i][0]+"%";cell.style.top=pos[i][1]+"%";
    if(ch.isHidden)cell.style.border="2.5px solid #DAA520";
    if(!ch.collected&&!ch.isHidden)cell.style.opacity=".45";
    cell.onclick=function(){enterLevel(i)};pg.appendChild(cell);
  });
}
function switchSeries(idx){state.seriesIdx=idx;document.querySelectorAll(".tab-item").forEach(function(t,i){t.classList.toggle("active",i===idx)});}
function enterLevel(charIdx){if(SERIES.characters[charIdx].isHidden){toast("This character is hidden — find it by playing!");return;}state.targetChar=SERIES.characters[charIdx];goToGame();}
function togglePreview(){var m=document.getElementById("previewModal");m.classList.toggle("show");if(m.classList.contains("show"))buildPreview();}
function buildPreview(){
  var c=document.getElementById("previewContent");c.innerHTML="";
  SERIES.characters.filter(function(x){return !x.isHidden}).forEach(function(ch){
    var d=document.createElement("div");d.className="modal-char";d.innerHTML="<span style='font-size:28px'>"+ch.emoji+"</span><span>"+ch.name+"</span>";c.appendChild(d);
  });
}
document.getElementById("previewModal").onclick=function(e){if(e.target===this)this.classList.remove("show")};

function initRound(){
  if(!state.targetChar){var r=SERIES.characters.filter(function(c){return!c.isHidden});state.targetChar=r[Math.floor(Math.random()*r.length)];}
  var pool=SERIES.characters.filter(function(c){return!c.isHidden}).filter(function(c){return c.id!==state.targetChar.id});
  shuffle(pool);state.candidates=[state.targetChar,pool[0],pool[1]];shuffle(state.candidates);
  state.focusIdx=1;state.bindings=[null,null,null];state.shakeCount=7;updateUI();
  var gt=document.getElementById("gameTabBar");gt.innerHTML="";
  SERIES.tabs.forEach(function(t,i){var d=document.createElement("div");d.className="tab-item"+(i===0?" active":"");d.textContent=t;d.onclick=function(){switchSeries(i)};gt.appendChild(d)});
  document.getElementById("targetIcon").textContent=state.targetChar.emoji+"?";
  document.getElementById("targetCounter").textContent="0";
  buildCandidates();updateBoxFocus();
}
function buildCandidates(){
  var row=document.getElementById("candidateRow");row.innerHTML="";
  state.candidates.forEach(function(ch,i){
    var card=document.createElement("div");card.className="candidate-card";card.id="cand"+i;
    card.innerHTML="<span style='font-size:32px'>"+ch.emoji+"</span><div class='candidate-name'>"+ch.name+"</div>";
    card.onclick=function(){selectCandidate(i)};row.appendChild(card);
  });
}
function selectCandidate(idx){
  state.bindings[state.focusIdx]=state.candidates[idx];
  document.querySelectorAll(".candidate-card").forEach(function(c,i){c.classList.toggle("selected",state.bindings.includes(state.candidates[i]));});
  var bindEl=document.getElementById("bind"+state.focusIdx);
  bindEl.innerHTML="<span style='font-size:20px'>"+state.candidates[idx].emoji+"</span>";
  bindEl.style.display="flex";updateUI();
}
function selectBox(idx){state.focusIdx=idx;updateBoxFocus();}
function updateBoxFocus(){
  ["boxL","boxC","boxR"].forEach(function(id,i){var el=document.getElementById(id);el.classList.toggle("center",i===state.focusIdx);el.classList.toggle("side",i!==state.focusIdx);});
}
function doShake(){
  if(state.shakeCount<=0){toast("No more shakes!");return;}
  state.shakeCount--;document.getElementById("shakeCount").textContent="x"+state.shakeCount;
  var boundCh=state.bindings[state.focusIdx];
  var gene=boundCh?GENES[boundCh.id]:GENES.t;
  playImpact(gene);
  var boxWrap=document.getElementById(["boxL","boxC","boxR"][state.focusIdx]);
  boxWrap.classList.add("shaking");
  setTimeout(function(){boxWrap.classList.remove("shaking")},580);
  if(state.shakeCount<=0)document.getElementById("shakeBtn").style.opacity=".4";
}
function doConfirm(){
  var bound=state.bindings[1];if(!bound){toast("Pick a character for the center box first!");return;}
  var hitTarget=bound.id===state.targetChar.id;
  if(hitTarget||Math.random()<0.35){state.resultChar=state.targetChar;state.isTargetHit=true;}
  else{var others=state.candidates.filter(function(c){return c.id!==state.targetChar.id});state.resultChar=others[Math.floor(Math.random()*others.length)]||bound;state.isTargetHit=false;}
  state.isNewResult=!SERIES.characters.find(function(c){return c.id===state.resultChar.id})?.collected;
  showPage("pg4");
}
function handleResult(){
  var ch=SERIES.characters.find(function(c){return c.id===state.resultChar.id});if(ch)ch.collected=true;
  if(state.isTargetHit)document.getElementById("targetCounter").textContent="1";
  state.isTargetHit?goToCollection():goHome();
}
function showConfetti(){
  var c=document.getElementById("confettiContainer");c.innerHTML="";
  if(!state.isNewResult)return;
  var colors=["#FFD4E5","#F5E6D3","#D4618C","#FFE082","#98D8C8","#B8A0D0"];
  for(var i=0;i<30;i++){
    var p=document.createElement("div");p.className="confetti-particle";
    p.style.left=(40+Math.random()*20)+"%";p.style.top="30%";
    p.style.backgroundColor=colors[Math.floor(Math.random()*colors.length)];
    p.style.borderRadius=Math.random()>.5?"50%":"2px";p.style.animationDelay=(Math.random()*.8)+"s";c.appendChild(p);
  }
}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}}
function toast(msg){var t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(function(){t.classList.remove("show")},1800);}

var tx=0;
document.getElementById("boxArea").addEventListener("touchstart",function(e){tx=e.touches[0].clientX});
document.getElementById("boxArea").addEventListener("touchend",function(e){
  var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>40){if(dx<0&&state.focusIdx<2)selectBox(state.focusIdx+1);else if(dx>0&&state.focusIdx>0)selectBox(state.focusIdx-1);}
});
function updateUI(){
  var btn=document.getElementById("confirmBtn");var hasCenterBind=state.bindings[1]!=null;
  btn.classList.toggle("ready",hasCenterBind);btn.style.opacity=hasCenterBind?"1":".5";
}

buildCollection();
</script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname,'shakesecret-demo.html'), html);
console.log('Demo written:', Math.round(html.length/1024)+'KB');
