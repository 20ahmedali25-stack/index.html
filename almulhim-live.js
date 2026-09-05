/* ============================================================
   المُلهم التعليمي — سباق المُلهم المباشر (التشغيل الحي) · المرحلة الأولى
   ------------------------------------------------------------
   المضيف: hhLiveHost(game) · الاستئناف: hhLiveResume(code) · النتائج: hhLiveResults(code)
   اللاعب: يُفتح تلقائياً عند وجود ?join=CODE في الرابط (بلا حساب)
   Firestore: game_sessions/{code} + game_sessions/{code}/players/{pid}
   ============================================================ */
(function(){
'use strict';
var L={ code:null, game:null, sess:null, unsub:null, unsubP:null, players:{}, timer:null, order:[], lastN:5, revealCache:{}, host:false, pid:null, pname:'', myAns:{}, myShop:{}, qReceivedAt:0 };
var OC=['#8A1538','#3D6B53','#8A6D2E','#1F4E79']; var OS=['◆','●','▲','■'];
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function toastX(m,k){ if(typeof toast==='function') toast(m,k||'info'); }
function db(){ return firebase.firestore(); }
function uid(){ try{ return (firebase.auth().currentUser||{}).uid||''; }catch(e){ return ''; } }
function code5(){ var A='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; var s=''; for(var i=0;i<5;i++) s+=A[Math.floor(Math.random()*A.length)]; return s; }
function joinUrl(code){ return location.origin+location.pathname+'?join='+code; }
function icon(n){ var P={play:'<path d="M6 4l14 8-14 8z"/>',next:'<path d="M5 12h14M12 5l7 7-7 7"/>',pause:'<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',stop:'<rect x="5" y="5" width="14" height="14" rx="2"/>',users:'<path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/>',bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',back:'<path d="M9 5l7 7-7 7"/>',dl:'<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',eye:'<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>'}; return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'+(P[n]||'')+'</svg>'; }

function style(){
  if(document.getElementById('hh-lv-style')) return;
  var st=document.createElement('style'); st.id='hh-lv-style';
  st.textContent=
   '#hh-lv{position:fixed;inset:0;background:radial-gradient(ellipse at top,#6B1230 0%,#4A0B1E 55%,#2A0810 100%);z-index:99992;overflow-y:auto;direction:rtl;font-family:Cairo,Tajawal,sans-serif;color:#EAD9B0;display:flex;flex-direction:column;}'
  +'#hh-lv .hd{display:flex;justify-content:space-between;align-items:center;padding:12px 18px;gap:10px;flex-wrap:wrap;}'
  +'#hh-lv .pill{background:rgba(0,0,0,.28);border:1px solid rgba(184,146,74,.6);border-radius:99px;padding:6px 14px;font-weight:800;font-size:.8rem;} #hh-lv .pill b{color:#FFFDF8;font-size:1rem;}'
  +'#hh-lv .tb{background:rgba(212,188,133,.12);border:1px solid rgba(212,188,133,.5);border-radius:10px;height:38px;padding:0 14px;color:#F5E6C4;font-weight:900;font-size:.8rem;cursor:pointer;font-family:Cairo;display:inline-flex;align-items:center;gap:7px;} #hh-lv .tb.gold{background:linear-gradient(135deg,#EAD9B0,#B8924A);border-color:#FDF3DD;color:#2a0810;} #hh-lv .tb.red{background:linear-gradient(135deg,#8A1538,#5E0E26);border-color:#B8924A;} #hh-lv .tb:disabled{opacity:.4;cursor:default;}'
  +'#hh-lv .main{flex:1;display:flex;flex-direction:column;padding:6px 22px 16px;max-width:1300px;margin:0 auto;width:100%;}'
  +'#hh-lv .q{background:#FFFDF8;color:#3D0918;border:2px solid #B8924A;border-radius:16px;padding:16px 22px;font-size:1.5rem;font-weight:900;text-align:center;margin:8px 0 12px;box-shadow:0 8px 24px rgba(0,0,0,.3);line-height:1.6;}'
  +'#hh-lv .tm{display:flex;align-items:center;gap:14px;justify-content:center;margin-bottom:12px;} #hh-lv .ring{width:66px;height:66px;border-radius:50%;background:conic-gradient(#EAD9B0 var(--p,100%),rgba(255,255,255,.12) 0);display:flex;align-items:center;justify-content:center;} #hh-lv .ring i{width:54px;height:54px;border-radius:50%;background:#4A0B1E;display:flex;align-items:center;justify-content:center;font-style:normal;font-weight:900;color:#FFFDF8;font-size:1.25rem;}'
  +'#hh-lv .opts{display:grid;grid-template-columns:1fr 1fr;gap:12px;flex:1;} #hh-lv .opt{border-radius:16px;padding:18px 20px;font-weight:900;font-size:1.2rem;color:#FFFDF8;display:flex;align-items:center;gap:14px;border:2px solid rgba(255,255,255,.18);box-shadow:0 8px 22px rgba(0,0,0,.25);position:relative;transition:opacity .3s;} #hh-lv .opt span{width:46px;height:46px;border-radius:12px;background:rgba(0,0,0,.28);display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;border:1px solid rgba(234,217,176,.5);} #hh-lv .opt.dim{opacity:.28;} #hh-lv .opt.ok{outline:4px solid #EAD9B0;}'
  +'#hh-lv .opt .cnt{position:absolute;left:14px;bottom:10px;font-size:.78rem;background:rgba(0,0,0,.35);border-radius:8px;padding:2px 10px;} #hh-lv .opt .bar{position:absolute;left:0;bottom:0;height:6px;background:#EAD9B0;border-radius:0 0 14px 14px;opacity:.9;}'
  +'#hh-lv .ft{display:flex;justify-content:space-between;align-items:center;margin-top:12px;font-size:.78rem;font-weight:800;gap:12px;} #hh-lv .bar2{flex:1;height:10px;background:rgba(0,0,0,.3);border-radius:99px;overflow:hidden;} #hh-lv .bar2 i{display:block;height:100%;background:linear-gradient(90deg,#B8924A,#EAD9B0);}'
  +'#hh-lv .lobby{display:grid;grid-template-columns:360px 1fr;gap:20px;flex:1;} @media(max-width:800px){#hh-lv .lobby{grid-template-columns:1fr;}}'
  +'#hh-lv .qrbox{background:#FFFDF8;border:2px solid #B8924A;border-radius:18px;padding:16px;text-align:center;color:#3D0918;} #hh-lv .qrbox #lv-qr{width:220px;height:220px;margin:6px auto;display:flex;align-items:center;justify-content:center;} #hh-lv .qrbox #lv-qr img,#hh-lv .qrbox #lv-qr canvas{width:220px;height:220px;} #hh-lv .code{background:#4A0B1E;color:#EAD9B0;border:1.5px solid #B8924A;border-radius:12px;padding:8px;font-weight:900;letter-spacing:8px;font-size:2rem;margin:8px 0;direction:ltr;} #hh-lv .url{font-size:.72rem;color:#8A6D2E;font-weight:800;direction:ltr;word-break:break-all;}'
  +'#hh-lv .plist{background:rgba(0,0,0,.22);border:1px solid rgba(184,146,74,.5);border-radius:18px;padding:16px;display:flex;flex-wrap:wrap;gap:8px;align-content:flex-start;} #hh-lv .pl{background:#FFFDF8;color:#3D0918;border-radius:99px;padding:6px 14px;font-weight:900;font-size:.85rem;animation:pop .3s;} @keyframes pop{from{transform:scale(.6);opacity:0}}'
  +'#hh-lv .rank{max-width:760px;margin:0 auto;width:100%;} #hh-lv .rk{display:flex;align-items:center;gap:12px;background:#FFFDF8;color:#3D0918;border:1.5px solid #B8924A;border-radius:14px;padding:10px 16px;margin-bottom:8px;font-weight:900;font-size:1.05rem;animation:slide .4s both;} @keyframes slide{from{transform:translateY(20px);opacity:0}} #hh-lv .rk .n{width:36px;height:36px;border-radius:10px;background:#5E0E26;color:#EAD9B0;display:flex;align-items:center;justify-content:center;flex-shrink:0;} #hh-lv .rk.g1 .n{background:linear-gradient(135deg,#EAD9B0,#B8924A);color:#2a0810;} #hh-lv .rk .nm{flex:1;} #hh-lv .rk .pt{color:#5E0E26;} #hh-lv .rk .dl{font-size:.7rem;color:#3D6B53;}'
  +'#hh-lv .hidden-note{text-align:center;padding:30px;font-size:1.3rem;font-weight:900;color:#FFFDF8;} #hh-lv .hidden-note small{display:block;font-size:.85rem;color:#D4BC85;margin-top:6px;}'
  +'#hh-lv .final{text-align:center;} #hh-lv .final h1{color:#FFFDF8;font-size:2.2rem;margin:10px 0;text-shadow:0 3px 14px rgba(0,0,0,.4);}'
  /* اللاعب */
  +'#hh-pl{position:fixed;inset:0;background:linear-gradient(180deg,#F6F1E7,#EFE7D6);z-index:99995;direction:rtl;font-family:Cairo,Tajawal,sans-serif;display:flex;flex-direction:column;color:#3D0918;overflow:hidden;}'
  +'#hh-pl .top{background:linear-gradient(135deg,#4A0B1E,#5E0E26);color:#EAD9B0;padding:12px 14px 9px;text-align:center;border-bottom:2px solid #B8924A;} #hh-pl .top b{display:block;color:#FFFDF8;font-size:1rem;} #hh-pl .top span{font-size:.66rem;font-weight:700;color:#D4BC85;}'
  +'#hh-pl .body{flex:1;display:flex;flex-direction:column;padding:12px;gap:10px;min-height:0;}'
  +'#hh-pl .center{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:10px;padding:10px;} #hh-pl .center b{font-size:1.15rem;} #hh-pl .center p{color:#8A7A63;font-weight:700;font-size:.78rem;margin:0;line-height:1.7;}'
  +'#hh-pl input{width:100%;border:1.5px solid #B8924A;border-radius:12px;padding:12px;font-family:Cairo;font-size:1rem;text-align:center;box-sizing:border-box;} #hh-pl .go{width:100%;background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;border-radius:12px;padding:13px;font-family:Cairo;font-weight:900;font-size:1rem;cursor:pointer;}'
  +'#hh-pl .ans{flex:1;display:grid;grid-template-rows:repeat(4,1fr);gap:10px;min-height:0;} #hh-pl .ans.two{grid-template-rows:repeat(2,1fr);} #hh-pl .ans button{border:none;border-radius:16px;color:#fff;font-family:Cairo;font-weight:900;font-size:1.05rem;display:flex;align-items:center;gap:12px;padding:0 16px;cursor:pointer;box-shadow:0 6px 16px rgba(0,0,0,.18);text-align:right;} #hh-pl .ans button span{width:34px;height:34px;border-radius:10px;background:rgba(0,0,0,.28);display:flex;align-items:center;justify-content:center;flex-shrink:0;} #hh-pl .ans button:disabled{opacity:.35;}'
  +'#hh-pl .bar{height:8px;background:#EAE0CA;border-radius:99px;overflow:hidden;} #hh-pl .bar i{display:block;height:100%;background:linear-gradient(90deg,#8A1538,#B8924A);transition:width .25s linear;}'
  +'#hh-pl .big{font-size:3rem;font-weight:900;line-height:1;} #hh-pl .okc{color:#3D6B53;} #hh-pl .badc{color:#c0392b;}';
  document.head.appendChild(st);
}

/* ═══════════ المضيف ═══════════ */
window.hhLiveHost=async function(game){
  if(!uid()){ toastX('سجّل الدخول أولاً','error'); return; }
  style();
  var qs=(game.questions||[]).filter(function(q){ return q.q && (q.correct||[]).length; });
  if(!qs.length){ toastX('لا أسئلة صالحة في اللعبة','error'); return; }
  var S=game.settings||{}; var order=qs.map(function(_,i){ return i; }); if(S.shuffleQ) order.sort(function(){ return Math.random()-.5; });
  var code=code5();
  var sess={ code:code, gameId:game.id, hostUid:uid(), title:game.title||'', state:'lobby', qIndex:0, total:qs.length, order:order, qStartedAt:0, settings:S,
    questions:qs.map(function(q){ return { id:q.id, type:q.type, q:q.q, opts:q.opts, correct:q.correct, time:q.flash?Math.max(5,Math.round(q.time/2)):q.time, mult:(q.mult||1)*(q.flash?2:1), flash:!!q.flash, note:q.note||'' }; }),
    scores:{}, names:{}, playersCount:0, createdAt:Date.now(), updatedAt:Date.now() };
  try{ await db().collection('game_sessions').doc(code).set(sess); }catch(e){ toastX('تعذر إنشاء الجولة · '+((e&&e.code)||''),'error'); return; }
  hostOpen(code);
};
window.hhLiveResume=async function(code){ if(!uid()) return; style(); hostOpen(code); };
window.hhLiveEndSession=async function(code){ if(!confirm('إنهاء الجولة '+code+' نهائياً؟')) return; try{ await db().collection('game_sessions').doc(code).set({state:'ended',updatedAt:Date.now()},{merge:true}); toastX('أُنهيت الجولة','success'); if(typeof hhIbRefresh==='function') hhIbRefresh(); }catch(e){ toastX('تعذر الإنهاء','error'); } };
window.hhLiveResults=async function(code){ style(); hostOpen(code, true); };

function hostOpen(code, viewOnly){
  L.host=true; L.code=code; L.players={};
  var old=document.getElementById('hh-lv'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-lv'; ov.innerHTML='<div class="hd"></div><div class="main"><div class="hidden-note">جارٍ التحميل…</div></div>'; document.body.appendChild(ov);
  if(L.unsub) L.unsub(); if(L.unsubP) L.unsubP();
  L.unsub=db().collection('game_sessions').doc(code).onSnapshot(function(d){ if(!d.exists){ return; } L.sess=d.data(); L.sess.code=code; hostRender(); }, function(e){ toastX('انقطع الاتصال بالجولة','error'); });
  L.unsubP=db().collection('game_sessions').doc(code).collection('players').onSnapshot(function(qs){ L.players={}; qs.forEach(function(d){ L.players[d.id]=d.data(); }); hostRender(); });
}
function hostClose(){ if(L.unsub){ L.unsub(); L.unsub=null; } if(L.unsubP){ L.unsubP(); L.unsubP=null; } clearInterval(L.timer); var e=document.getElementById('hh-lv'); if(e) e.remove(); L.host=false; if(typeof hhIbRefresh==='function') hhIbRefresh(); }
window.hhLiveClose=hostClose;
async function setState(patch){ patch.updatedAt=Date.now(); try{ await db().collection('game_sessions').doc(L.code).set(patch,{merge:true}); }catch(e){ toastX('تعذر التحديث','error'); } }

function curQ(){ var s=L.sess; if(!s) return null; var oi=(s.order||[])[s.qIndex]; return s.questions[oi==null?s.qIndex:oi]; }
function rankHidden(){ var s=L.sess; var S=s.settings||{}; if(S.hideRank==='always') return true; if(S.hideRank==='last'){ return (s.total-(s.qIndex+1)) < (S.hideLastN||5); } return false; }
function pointsFor(q, ans, S){
  if(!ans||!ans.c||!ans.c.length) return 0;
  var corr=(q.correct||[]).slice().sort().join(','); var got=(ans.c||[]).slice().sort().join(','); if(corr!==got) return 0;
  var base=1000; if((S.scoring||'speed')==='speed'){ var frac=Math.min(1,Math.max(0,(ans.t||0)/(q.time*1000))); base=Math.round(1000*(1-frac/2)); }
  return base*(q.mult||1);
}
var SHOP={ x2:{label:'مضاعف ×2',desc:'السؤال التالي يمنح ضعف العملات',cost:300,ico:'✕2'}, shield:{label:'درع',desc:'يصدّ أول سطو عليك',cost:250,ico:'◈'}, steal:{label:'سطو',desc:'تأخذ 15% من محفظة المتصدر عند الكشف التالي',cost:400,ico:'➶'} };
function isMarket(){ return ((L.sess&&L.sess.settings)||{}).mode==='market'; }
function qAt(qi){ var s=L.sess; var oi=(s.order||[])[qi]; return s.questions[oi==null?qi:oi]; }
// إعادة احتساب كاملة وحتمية من إجابات اللاعبين ومشترياتهم: المضيف هو المرجع الوحيد للأرقام
function computeScores(uptoQ){
  var s=L.sess; var S=s.settings||{}; var scores={}; var names={}; var events=[]; var market=(S.mode==='market');
  var pids=Object.keys(L.players); pids.forEach(function(pid){ names[pid]=L.players[pid].name||'لاعب'; scores[pid]=0; });
  var last=(uptoQ==null)?s.qIndex:uptoQ; var shields={}; var x2={};
  for(var qi=0; qi<=last; qi++){
    var q=qAt(qi); if(!q) continue;
    var steals=[];
    if(market && qi>0){
      pids.forEach(function(pid){ var sh=(L.players[pid].shop||{})[qi]; if(!sh||!SHOP[sh.buy]) return; var cost=SHOP[sh.buy].cost; if(scores[pid]<cost) return; scores[pid]-=cost;
        if(sh.buy==='x2') x2[pid]=true; else if(sh.buy==='shield') shields[pid]=true; else if(sh.buy==='steal') steals.push(pid); });
    }
    pids.forEach(function(pid){ var a=(L.players[pid].a||{})[qi]; var pts=pointsFor(q,a,S); if(market && x2[pid]){ pts*=2; delete x2[pid]; } scores[pid]+=pts; });
    steals.forEach(function(thief){
      var leader=null; pids.forEach(function(pid){ if(pid===thief) return; if(leader===null||scores[pid]>scores[leader]) leader=pid; });
      if(leader===null) return;
      if(shields[leader]){ delete shields[leader]; events.push({qi:qi,type:'blocked',from:names[thief],to:names[leader]}); return; }
      var amt=Math.round(scores[leader]*0.15); scores[leader]-=amt; scores[thief]+=amt; events.push({qi:qi,type:'steal',from:names[thief],to:names[leader],amt:amt});
    });
  }
  return {scores:scores,names:names,events:events};
}
function playersArr(){ return Object.keys(L.players).map(function(pid){ return {pid:pid, name:(L.players[pid].name||'لاعب')}; }); }

function hostRender(){
  var s=L.sess; var root=document.getElementById('hh-lv'); if(!root||!s) return;
  var hd=root.querySelector('.hd'); var main=root.querySelector('.main');
  var n=Object.keys(L.players).length;
  var q=curQ();
  var answered=q?Object.keys(L.players).filter(function(pid){ var A=L.players[pid].a||{}; return !!A[s.qIndex]; }).length:0;
  hd.innerHTML='<span class="pill">'+(s.state==='lobby'?'الانتظار':'السؤال <b>'+(s.qIndex+1)+' / '+s.total+'</b>')+'</span>'
    +'<span class="pill" style="font-size:.95rem;color:#FFFDF8;">'+esc(s.title)+' · سباق مباشر · الرمز <b dir="ltr">'+esc(s.code)+'</b></span>'
    +'<span class="pill">'+icon('users')+' <b>'+n+'</b>'+(s.state==='question'?' · أجاب <b>'+answered+'</b>':'')+'</span>';
  var ctl='';
  if(s.state==='lobby') ctl='<button class="tb gold" '+(n?'':'disabled')+' onclick="hhLvStart()">'+icon('play')+' ابدأ السباق</button><button class="tb" onclick="hhLiveClose()">'+icon('back')+' رجوع (تبقى الجولة محفوظة)</button>';
  else if(s.state==='question') ctl='<button class="tb gold" onclick="hhLvReveal()">'+icon('eye')+' اكشف الإجابة</button><button class="tb" onclick="hhLvPause()">'+icon('pause')+' إيقاف مؤقت</button>';
  else if(s.state==='reveal') ctl=(isMarket()&&s.qIndex+1<s.total?'<button class="tb gold" onclick="hhLvShop()">'+icon('next')+' افتح السوق</button>':'<button class="tb gold" onclick="hhLvRank()">'+icon('next')+(rankHidden()?' التالي':' الترتيب')+'</button>')+'<button class="tb" onclick="hhLvPause()">'+icon('pause')+' إيقاف مؤقت</button>';
  else if(s.state==='shop') ctl='<button class="tb gold" onclick="hhLvRank()">'+icon('next')+' أغلق السوق</button><button class="tb" onclick="hhLvPause()">'+icon('pause')+' إيقاف مؤقت</button>';
  else if(s.state==='rank') ctl='<button class="tb gold" onclick="hhLvNext()">'+icon('next')+(s.qIndex+1>=s.total?' الختام':' السؤال التالي')+'</button><button class="tb" onclick="hhLvPause()">'+icon('pause')+' إيقاف مؤقت</button>';
  else if(s.state==='paused') ctl='<button class="tb gold" onclick="hhLvUnpause()">'+icon('play')+' استئناف</button><button class="tb" onclick="hhLiveClose()">'+icon('back')+' رجوع</button><button class="tb red" onclick="hhLvEnd()">'+icon('stop')+' إنهاء</button>';
  else if(s.state==='ended') ctl='<button class="tb" onclick="hhLvCSV()">'+icon('dl')+' تصدير CSV</button><button class="tb" onclick="hhLiveClose()">'+icon('back')+' رجوع</button>';
  if(s.state!=='ended'&&s.state!=='lobby'&&s.state!=='paused') ctl+='<button class="tb red" onclick="hhLvEnd()">'+icon('stop')+' إنهاء</button>';
  hd.innerHTML+='<span style="display:flex;gap:8px;flex-wrap:wrap;">'+ctl+'</span>';

  var vk=s.state+':'+s.qIndex+':'+(s.qStartedAt||0);
  if(s.state==='question' && L.viewKey===vk){ var e1=document.getElementById('lv-ans'); if(e1) e1.textContent='أجاب '+answered+' من '+n; return; }
  L.viewKey=vk;
  clearInterval(L.timer);
  if(s.state==='lobby'){
    main.innerHTML='<div class="lobby"><div class="qrbox"><div style="font-weight:900;font-size:.9rem;">امسح الباركود أو ادخل الرمز</div><div id="lv-qr"></div><div class="code">'+esc(s.code)+'</div><div class="url">'+esc(joinUrl(s.code))+'</div><div style="font-size:.66rem;color:#8A7A63;font-weight:700;margin-top:6px;">لا يحتاج الطالب إلى حساب، فقط اسمه</div></div>'
      +'<div><div style="font-weight:900;font-size:1.1rem;color:#FFFDF8;margin-bottom:8px;">المنضمون · '+n+'</div><div class="plist">'+(n?playersArr().map(function(p){ return '<span class="pl">'+esc(p.name)+'</span>'; }).join(''):'<span style="color:#D4BC85;font-weight:700;">بانتظار أول لاعب…</span>')+'</div></div></div>';
    drawQR(joinUrl(s.code));
  } else if(s.state==='question'&&q){
    var left=Math.max(0, Math.round((q.time*1000-(Date.now()-(s.qStartedAt||Date.now())))/1000));
    main.innerHTML=(q.mult>1||q.flash?'<div style="text-align:center;margin-top:4px;"><span class="pill" style="background:linear-gradient(135deg,#EAD9B0,#B8924A);color:#2a0810;border:none;">'+(q.flash?icon('bolt')+' سؤال البرق · ':'')+'النقاط ×'+q.mult+'</span></div>':'')
      +'<div class="q">'+esc(q.q)+'</div><div class="tm"><div class="ring" id="lv-ring" style="--p:100%"><i id="lv-left">'+left+'</i></div><span style="font-weight:800;font-size:.85rem;color:#D4BC85;">'+(isMarket()?'العملات تنقص مع الوقت · الصحيحة الفورية تمنح 1000 عملة':((s.settings||{}).scoring==='fixed'?'1000 نقطة للإجابة الصحيحة':'النقاط تنقص مع الوقت · الصحيحة الفورية تمنح 1000'))+'</span></div>'
      +'<div class="opts">'+(q.opts||[]).map(function(o,i){ return '<div class="opt" style="background:linear-gradient(135deg,'+OC[i]+',#1a0308)"><span>'+OS[i]+'</span>'+esc(o)+'</div>'; }).join('')+'</div>'
      +'<div class="ft"><span>الرمز <b dir="ltr">'+esc(s.code)+'</b></span><div class="bar2"><i style="width:'+Math.round((s.qIndex)/s.total*100)+'%"></i></div><span id="lv-ans">أجاب '+answered+' من '+n+'</span></div>';
    L.timer=setInterval(function(){ var ms=q.time*1000-(Date.now()-(s.qStartedAt||Date.now())); var sec=Math.max(0,Math.ceil(ms/1000)); var e=document.getElementById('lv-left'); var r=document.getElementById('lv-ring'); if(e) e.textContent=sec; if(r) r.style.setProperty('--p',Math.max(0,ms/(q.time*1000)*100)+'%'); if(ms<=0){ clearInterval(L.timer); if(L.sess&&L.sess.state==='question') window.hhLvReveal(); } },250);
  } else if(s.state==='reveal'&&q){
    var cnt=[0,0,0,0]; var tot=0; Object.keys(L.players).forEach(function(pid){ var a=(L.players[pid].a||{})[s.qIndex]; if(a&&a.c){ a.c.forEach(function(c){ cnt[c]=(cnt[c]||0)+1; }); tot++; } });
    main.innerHTML='<div class="q">'+esc(q.q)+'</div><div style="text-align:center;margin-bottom:10px;"><span class="pill" style="background:#EAD9B0;color:#2a0810;border:none;font-size:.9rem;">الإجابة الصحيحة: '+(q.correct||[]).map(function(i){ return OS[i]+' '+esc(q.opts[i]); }).join(' · ')+'</span>'+(q.note?'<div style="margin-top:8px;color:#D4BC85;font-weight:700;font-size:.85rem;">'+esc(q.note)+'</div>':'')+'</div>'
      +'<div class="opts">'+(q.opts||[]).map(function(o,i){ var ok=(q.correct||[]).indexOf(i)>-1; var pc=tot?Math.round(cnt[i]/tot*100):0; return '<div class="opt '+(ok?'ok':'dim')+'" style="background:linear-gradient(135deg,'+OC[i]+',#1a0308)"><span>'+OS[i]+'</span>'+esc(o)+'<span class="cnt">'+cnt[i]+' · '+pc+'%</span><i class="bar" style="width:'+pc+'%"></i></div>'; }).join('')+'</div>'
      +(isMarket()&&(s.events||[]).filter(function(e){ return e.qi===s.qIndex; }).length?'<div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">'+(s.events||[]).filter(function(e){ return e.qi===s.qIndex; }).map(function(e){ return '<span class="pill" style="background:'+(e.type==='steal'?'rgba(138,21,56,.55)':'rgba(61,107,83,.55)')+';">'+(e.type==='steal'?('سطو: '+esc(e.from)+' أخذ '+e.amt+' من '+esc(e.to)):('درع: '+esc(e.to)+' صدّ سطو '+esc(e.from)))+'</span>'; }).join('')+'</div>':'')
      +'<div class="ft"><span>أجاب '+tot+' من '+n+'</span><div class="bar2"><i style="width:'+Math.round((s.qIndex+1)/s.total*100)+'%"></i></div><span>'+(s.qIndex+1)+' / '+s.total+'</span></div>';
  } else if(s.state==='shop'){
    var cnt={x2:0,shield:0,steal:0,save:0}; Object.keys(L.players).forEach(function(pid){ var sh=(L.players[pid].shop||{})[s.qIndex+1]; if(sh&&cnt[sh.buy]!=null) cnt[sh.buy]++; });
    main.innerHTML='<div class="hidden-note" style="padding-bottom:6px;">السوق مفتوح<small>كل لاعب يقرر على هاتفه: يشتري تعزيزاً أو يحتفظ بعملاته</small></div>'
      +'<div class="opts" style="flex:0;max-width:900px;margin:0 auto;width:100%;grid-template-columns:repeat(4,1fr);">'
      +['x2','shield','steal'].map(function(k){ return '<div class="opt" style="background:linear-gradient(135deg,#4A0B1E,#1a0308);flex-direction:column;align-items:flex-start;gap:4px;padding:14px 16px;"><b style="font-size:1.1rem;">'+SHOP[k].ico+' '+SHOP[k].label+'</b><small style="font-size:.72rem;color:#D4BC85;font-weight:700;">'+SHOP[k].desc+' · '+SHOP[k].cost+'</small><span style="position:static;width:auto;height:auto;border-radius:99px;padding:2px 10px;font-size:.78rem;">اشتراه '+cnt[k]+'</span></div>'; }).join('')
      +'<div class="opt" style="background:linear-gradient(135deg,#3D6B53,#1a2f24);flex-direction:column;align-items:flex-start;gap:4px;padding:14px 16px;"><b style="font-size:1.1rem;">◇ احتفظ</b><small style="font-size:.72rem;color:#D4BC85;font-weight:700;">بلا شراء</small><span style="position:static;width:auto;height:auto;border-radius:99px;padding:2px 10px;font-size:.78rem;">'+cnt.save+'</span></div></div>';
  } else if(s.state==='rank'){
    if(rankHidden()){ main.innerHTML='<div class="hidden-note">الترتيب مخفي حتى النهاية<small>لا أحد يعرف من يتصدر… تابعوا السباق</small></div>'; }
    else main.innerHTML=rankHTML(5, false);
  } else if(s.state==='paused'){
    main.innerHTML='<div class="hidden-note">الجولة متوقفة مؤقتاً<small>محفوظة بنقاطها عند السؤال '+(s.qIndex+1)+' من '+s.total+' · استأنفها من هنا أو من «ألعابي» في أي وقت</small></div>';
  } else if(s.state==='ended'){
    main.innerHTML='<div class="final"><h1>النتيجة النهائية</h1><div style="color:#D4BC85;font-weight:700;margin-bottom:14px;">'+esc(s.title)+' · '+n+' لاعباً · '+s.total+' سؤالاً</div>'+rankHTML(10, true)+'</div>';
    if(!L._revealed){ L._revealed=true; progressiveReveal(); }
  }
}
function rankHTML(limit, full){
  var s=L.sess; var sc=s.scores||{}; var nm=s.names||{};
  var arr=Object.keys(sc).map(function(pid){ return {pid:pid,name:nm[pid]||'لاعب',pts:sc[pid]||0}; }).sort(function(a,b){ return b.pts-a.pts; }).slice(0,limit);
  return '<div class="rank">'+arr.map(function(p,i){ return '<div class="rk '+(i===0?'g1':'')+'" data-i="'+i+'"><span class="n">'+(i+1)+'</span><span class="nm">'+esc(p.name)+'</span><span class="pt">'+p.pts.toLocaleString('en-US')+'</span></div>'; }).join('')+(arr.length?'':'<div class="hidden-note">لا نتائج بعد</div>')+'</div>';
}
function progressiveReveal(){
  var rows=Array.prototype.slice.call(document.querySelectorAll('#hh-lv .rk')); rows.forEach(function(r){ r.style.opacity='0'; });
  var top=rows.slice(0,5).reverse(); var rest=rows.slice(5);
  rest.forEach(function(r){ r.style.opacity='1'; });
  top.forEach(function(r,i){ setTimeout(function(){ r.style.opacity='1'; r.style.animation='slide .5s both'; },700*i+400); });
}
function drawQR(url){
  var box=document.getElementById('lv-qr'); if(!box) return; box.innerHTML='';
  var go=function(){ try{ new QRCode(box,{text:url,width:220,height:220,colorDark:'#3D0918',colorLight:'#FFFDF8',correctLevel:QRCode.CorrectLevel.M}); }catch(e){ box.innerHTML='<div style="font-size:.72rem;color:#8A6D2E;">استخدم الرمز أو الرابط</div>'; } };
  if(window.QRCode) return go();
  var sc=document.createElement('script'); sc.src='https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'; sc.onload=go; sc.onerror=function(){ box.innerHTML='<div style="font-size:.72rem;color:#8A6D2E;">تعذر رسم الباركود · استخدم الرمز أو الرابط</div>'; }; document.head.appendChild(sc);
}
window.hhLvStart=function(){ L._revealed=false; setState({state:'question', qIndex:0, qStartedAt:Date.now()}); };
window.hhLvReveal=async function(){ var r=computeScores(); await setState({state:'reveal', scores:r.scores, names:r.names, events:r.events, playersCount:Object.keys(L.players).length}); };
window.hhLvRank=function(){ setState({state:'rank'}); };
window.hhLvShop=function(){ setState({state:'shop'}); };
window.hhLvNext=function(){ var s=L.sess; if(s.qIndex+1>=s.total){ window.hhLvEnd(); return; } setState({state:'question', qIndex:s.qIndex+1, qStartedAt:Date.now()}); };
window.hhLvPause=function(){ setState({state:'paused', pausedFrom:L.sess.state}); };
window.hhLvUnpause=function(){ var s=L.sess; var from=s.pausedFrom||'question'; if(from==='question') setState({state:'question', qStartedAt:Date.now()}); else setState({state:from}); };
window.hhLvEnd=async function(){ var r=computeScores(); await setState({state:'ended', scores:r.scores, names:r.names, events:r.events, playersCount:Object.keys(L.players).length}); };
window.hhLvCSV=function(){
  var s=L.sess; var sc=s.scores||{}; var nm=s.names||{}; var q=function(x){ return '"'+String(x==null?'':x).replace(/"/g,'""')+'"'; };
  var head=['الترتيب','الاسم','النقاط'].concat(s.questions.map(function(_,i){ return 'س'+(i+1); }));
  var arr=Object.keys(sc).map(function(pid){ return {pid:pid,name:nm[pid],pts:sc[pid]}; }).sort(function(a,b){ return b.pts-a.pts; });
  var lines=[head.map(q).join(',')].concat(arr.map(function(p,i){ var P=L.players[p.pid]||{}; var A=P.a||{}; return [i+1,p.name,p.pts].concat(s.questions.map(function(_,qi){ var oi=(s.order||[]).indexOf(qi); var a=A[oi]; if(!a) return ''; var qq=s.questions[qi]; return (qq.correct.slice().sort().join(',')===(a.c||[]).slice().sort().join(','))?'✓':'✗'; })).map(q).join(','); }));
  var blob=new Blob(['\ufeff'+lines.join('\r\n')],{type:'text/csv;charset=utf-8'}); var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='سباق-'+(s.title||'').replace(/[\\/:*?"<>|]/g,' ')+'-'+s.code+'.csv'; document.body.appendChild(a); a.click(); setTimeout(function(){ a.remove(); },500);
};

/* ═══════════ اللاعب ═══════════ */
function playerBoot(){
  var m=location.search.match(/[?&]join=([A-Za-z0-9]{4,8})/); if(!m) return;
  var code=m[1].toUpperCase(); style();
  L.code=code; L.pid=localStorage.getItem('hh_lv_pid_'+code)||('p_'+Math.random().toString(36).slice(2,10)); L.pname=localStorage.getItem('hh_lv_name')||'';
  var ov=document.createElement('div'); ov.id='hh-pl'; document.body.appendChild(ov);
  try{ document.body.classList.add('hh-immersive'); }catch(e){}
  playerRender('join');
  try{ if(firebase.auth&&!firebase.auth().currentUser) firebase.auth().signInAnonymously().catch(function(){}); }catch(e){}
}
function playerRender(mode, extra){
  var ov=document.getElementById('hh-pl'); if(!ov) return; var s=L.sess;
  var top='<div class="top"><b>'+esc(L.pname||'سباق المُلهم المباشر')+'</b><span>'+(s?(esc(s.title)+' · الرمز '+esc(L.code)+(s.scores&&s.scores[L.pid]!=null&&!playerRankHidden()?' · '+s.scores[L.pid].toLocaleString('en-US')+' نقطة':'')):'انضم بالرمز '+esc(L.code))+'</span></div>';
  var body='';
  if(mode==='join') body='<div class="center"><b>سباق المُلهم المباشر</b><p>اكتب اسمك أو اسم فريقك كما تريد أن يظهر على الشاشة</p><input id="pl-name" maxlength="30" value="'+esc(L.pname)+'" placeholder="اسمك"><button class="go" onclick="hhPlJoin()">انضم إلى السباق</button></div>';
  else if(mode==='wait') body='<div class="center"><b>'+esc(extra||'انتظر بدء السباق')+'</b><p>عيناك على الشاشة الرئيسة، والأزرار ستظهر هنا مع كل سؤال</p></div>';
  else if(mode==='question'){ var q=L.curQ; var two=(q.opts||[]).length===2; var order=L.optOrder;
    body='<div class="bar"><i id="pl-bar" style="width:100%"></i></div><div class="center" style="flex:0;padding:4px;"><p>السؤال '+(s.qIndex+1)+' من '+s.total+(q.mult>1?' · النقاط ×'+q.mult:'')+'</p></div><div class="ans '+(two?'two':'')+'">'+order.map(function(i){ return '<button style="background:linear-gradient(135deg,'+OC[i]+',#1a0308)" onclick="hhPlAnswer('+i+')"><span>'+OS[i]+'</span>'+esc(q.opts[i])+'</button>'; }).join('')+'</div>'; }
  else if(mode==='answered') body='<div class="center"><b>تم استلام إجابتك</b><p>انتظر الكشف على الشاشة</p></div>';
  else if(mode==='reveal'){ var r=extra||{}; body='<div class="center"><div class="big '+(r.ok?'okc':'badc')+'">'+(r.ok?'✓':'✗')+'</div><b>'+(r.ok?'إجابة صحيحة':(r.none?'لم تُجب':'إجابة خاطئة'))+'</b>'+(r.ok?'<p>+'+r.pts.toLocaleString('en-US')+(isMarket()?' عملة':' نقطة')+'</p>':'')+(r.showAns?'<p>الإجابة: '+esc(r.ans)+'</p>':'')+'</div>'; }
  else if(mode==='rank'){ body='<div class="center">'+(extra.hidden?'<b>الترتيب مخفي حتى النهاية</b><p>تابع السباق، كل سؤال يغيّر كل شيء</p>':'<b>ترتيبك: '+extra.rank+' من '+extra.n+'</b><p>'+extra.pts.toLocaleString('en-US')+' نقطة</p>')+'</div>'; }
  else if(mode==='shop'){ var bal=(s.scores||{})[L.pid]||0; var mine=L.myShop[s.qIndex+1];
    body='<div class="center" style="flex:0;padding:6px;"><b>محفظتك: '+bal.toLocaleString('en-US')+'</b><p>'+(mine?('اخترت: '+(mine==='save'?'الاحتفاظ':SHOP[mine].label)):'اختر تعزيزاً للسؤال التالي أو احتفظ بعملاتك')+'</p></div>'
      +'<div class="ans" style="grid-template-rows:repeat(4,1fr);">'+['x2','shield','steal'].map(function(k){ var can=bal>=SHOP[k].cost && !mine; return '<button style="background:linear-gradient(135deg,'+(k==='x2'?'#8A1538':k==='shield'?'#1F4E79':'#8A6D2E')+',#1a0308);flex-direction:column;align-items:flex-start;gap:2px;" '+(can?'':'disabled')+' onclick="hhPlBuy(\''+k+'\')"><b>'+SHOP[k].ico+' '+SHOP[k].label+' · '+SHOP[k].cost+'</b><small style="font-size:.7rem;font-weight:700;opacity:.9;">'+SHOP[k].desc+'</small></button>'; }).join('')
      +'<button style="background:linear-gradient(135deg,#3D6B53,#1a2f24);" '+(mine?'disabled':'')+' onclick="hhPlBuy(\'save\')"><span>◇</span>احتفظ بعملاتي</button></div>'; }
  else if(mode==='paused') body='<div class="center"><b>توقفت الجولة مؤقتاً</b><p>ابقَ في الصفحة، ستُستأنف من المكان نفسه بنقاطك</p></div>';
  else if(mode==='ended'){ body='<div class="center"><b>انتهى السباق</b><div class="big" style="color:#5E0E26;">'+extra.rank+'</div><p>ترتيبك من '+extra.n+' · '+extra.pts.toLocaleString('en-US')+' نقطة</p><p style="color:#8A6D2E;">شكراً لمشاركتك في المُلهم</p></div>'; }
  ov.innerHTML=top+'<div class="body">'+body+'</div>';
}
function playerRankHidden(){ var s=L.sess; if(!s) return true; var S=s.settings||{}; if(S.hideRank==='always') return true; if(S.hideRank==='last') return (s.total-(s.qIndex+1)) < (S.hideLastN||5); return false; }
window.hhPlJoin=async function(){
  var nm=(document.getElementById('pl-name').value||'').trim().slice(0,30); if(!nm){ toastX('اكتب اسمك','info'); return; }
  L.pname=nm; localStorage.setItem('hh_lv_name',nm); localStorage.setItem('hh_lv_pid_'+L.code,L.pid);
  try{
    var ref=db().collection('game_sessions').doc(L.code); var d=await ref.get(); if(!d.exists){ toastX('الرمز غير صحيح','error'); return; }
    if(d.data().state==='ended'){ playerRender('wait','انتهت هذه الجولة'); return; }
    await ref.collection('players').doc(L.pid).set({name:nm, joinedAt:Date.now()},{merge:true});
    playerRender('wait');
    if(L.unsub) L.unsub();
    L.unsub=ref.onSnapshot(function(snap){ var prev=L.sess; L.sess=snap.data(); L.sess.code=L.code; playerOnState(prev); }, function(e){ playerRender('wait','انقطع الاتصال، أعد تحميل الصفحة'); });
  }catch(e){ toastX('تعذر الانضمام · '+((e&&e.code)||''),'error'); }
}
function playerOnState(prev){
  var s=L.sess; var key=s.state+':'+s.qIndex+':'+(s.qStartedAt||0);
  if(L.lastKey===key) return; L.lastKey=key;
  if(s.state==='lobby') playerRender('wait');
  else if(s.state==='question'){ var oi=(s.order||[])[s.qIndex]; var q=s.questions[oi==null?s.qIndex:oi]; L.curQ=q; L.qReceivedAt=Date.now(); var n=(q.opts||[]).length; L.optOrder=[]; for(var i=0;i<n;i++) L.optOrder.push(i); if((s.settings||{}).shuffleOpts!==false && n>2) L.optOrder.sort(function(){ return Math.random()-.5; });
    if(L.myAns[s.qIndex]) { playerRender('answered'); return; }
    playerRender('question'); clearInterval(L.timer); L.timer=setInterval(function(){ var ms=q.time*1000-(Date.now()-L.qReceivedAt); var b=document.getElementById('pl-bar'); if(b) b.style.width=Math.max(0,ms/(q.time*1000)*100)+'%'; if(ms<=0){ clearInterval(L.timer); var btns=document.querySelectorAll('#hh-pl .ans button'); btns.forEach(function(x){ x.disabled=true; }); } },200); }
  else if(s.state==='reveal'){ clearInterval(L.timer); var q2=L.curQ||s.questions[(s.order||[])[s.qIndex]]; var a=L.myAns[s.qIndex]; var ok=false; if(a&&q2){ ok=(q2.correct||[]).slice().sort().join(',')===(a.c||[]).slice().sort().join(','); }
    var pts=0; if(ok&&q2){ var S=s.settings||{}; var base=1000; if((S.scoring||'speed')==='speed'){ var frac=Math.min(1,Math.max(0,(a.t||0)/(q2.time*1000))); base=Math.round(1000*(1-frac/2)); } pts=base*(q2.mult||1); }
    playerRender('reveal',{ok:ok,none:!a,pts:pts,showAns:(s.settings||{}).showAnswerEach!==false,ans:q2?(q2.correct||[]).map(function(i){ return q2.opts[i]; }).join(' · '):''}); }
  else if(s.state==='rank'){ var sc=s.scores||{}; var arr=Object.keys(sc).sort(function(x,y){ return sc[y]-sc[x]; }); playerRender('rank',{hidden:playerRankHidden(), rank:arr.indexOf(L.pid)+1, n:arr.length, pts:sc[L.pid]||0}); }
  else if(s.state==='shop'){ playerRender('shop'); }
  else if(s.state==='paused') playerRender('paused');
  else if(s.state==='ended'){ var sc2=s.scores||{}; var arr2=Object.keys(sc2).sort(function(x,y){ return sc2[y]-sc2[x]; }); playerRender('ended',{rank:arr2.indexOf(L.pid)+1||'—', n:arr2.length, pts:sc2[L.pid]||0}); }
}
window.hhPlBuy=async function(k){
  var s=L.sess; if(!s||s.state!=='shop') return; var target=s.qIndex+1; if(L.myShop[target]) return;
  var bal=(s.scores||{})[L.pid]||0; if(k!=='save' && (!SHOP[k] || bal<SHOP[k].cost)){ toastX('عملاتك لا تكفي','info'); return; }
  L.myShop[target]=k; playerRender('shop');
  try{ var o={}; o[target]={buy:k, t:Date.now()}; await db().collection('game_sessions').doc(L.code).collection('players').doc(L.pid).set({shop:o, name:L.pname},{merge:true}); }catch(e){ toastX('تعذر إرسال الاختيار','error'); }
};
window.hhPlAnswer=async function(i){
  var s=L.sess; if(!s||s.state!=='question') return; if(L.myAns[s.qIndex]) return;
  var t=Date.now()-L.qReceivedAt; var ans={c:[i], t:t}; L.myAns[s.qIndex]=ans; playerRender('answered');
  try{ await db().collection('game_sessions').doc(L.code).collection('players').doc(L.pid).set({a:(function(){ var o={}; o[s.qIndex]=ans; return o; })(), name:L.pname},{merge:true}); }catch(e){ toastX('تعذر إرسال الإجابة','error'); }
};
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', playerBoot); else playerBoot();
})();
