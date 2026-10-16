/* ============================================================
   المُلهم التعليمي، الوسائل التعليمية الثماني على شاشة الصف
   المؤقت، الاختيار العشوائي، تقسيم المجموعات، لوحة النقاط،
   مقياس الهدوء، إشارة العمل، السبورة، رمز الدخول
   almulhimedu.org (zzzzzzcr)
   ============================================================ */
(function(){
'use strict';
if(window._hhTools8) return; window._hhTools8=true;
function S(p,w){ return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'; }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function $(id){ return document.getElementById(id); }
function ls(k,v){ try{ if(v===undefined) return localStorage.getItem(k); localStorage.setItem(k,v); }catch(e){ return null; } }
function sfx(n){ try{ if(window.hhSfx) hhSfx.play(n); }catch(e){} }
function toastX(m,k){ try{ if(typeof toast==='function') toast(m,k||'info'); }catch(e){} }
var RM=(function(){ try{ return matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){ return false; } })();
var IC={
  timer:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/>',dice:'<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.3" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0113 0"/><path d="M16 4.5a3.5 3.5 0 010 7M21.5 20a6.5 6.5 0 00-4-6"/>',score:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  vol:'<path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13"/>',traffic:'<rect x="8" y="2" width="8" height="20" rx="3"/><circle cx="12" cy="7" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="17" r="1.6"/>',
  board:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21l4-4 4 4M7 9h6M7 12h9"/>',qr:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3M21 14v7h-4"/>',
  x:'<path d="M18 6L6 18M6 6l12 12"/>',full:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',play:'<path d="M7 4l13 8-13 8z"/>',pause:'<path d="M7 4h4v16H7zM13 4h4v16h-4z"/>',
  reset:'<path d="M3 12a9 9 0 103-6.7L3 8M3 3v5h5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',shuffle:'<path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>',
  undo:'<path d="M9 14L4 9l5-5"/><path d="M4 9h11a5 5 0 010 10h-3"/>',trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',pen:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/>',
  eraser:'<path d="M7 21h10M4 15l8-8 7 7-6 6H8z"/>',mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/>',copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>'
};
var TOOLS={
  timer:{t:'المؤقت',ic:'timer',c:'#8A1538'},pick:{t:'الاختيار العشوائي',ic:'dice',c:'#1D5C99'},groups:{t:'تقسيم المجموعات',ic:'users',c:'#23855A'},score:{t:'لوحة النقاط',ic:'score',c:'#C2862B'},
  quiet:{t:'مقياس الهدوء',ic:'vol',c:'#6A42A8'},signal:{t:'إشارة العمل',ic:'traffic',c:'#C0562F'},board:{t:'السبورة',ic:'board',c:'#2C3E73'},qr:{t:'رمز الدخول',ic:'qr',c:'#0E8288'}
};
var GC=['#C2274F','#1F5E9E','#1E8A5C','#C88A1E','#6A42A8','#0E8288','#C0562F','#2C3E73'];
var T={k:null,cleanup:[]};
function names(){ try{ var a=JSON.parse(ls('hh_tool_names')||'[]'); return Array.isArray(a)?a:[]; }catch(e){ return []; } }
function setNames(a){ ls('hh_tool_names',JSON.stringify(a.slice(0,80))); }

/* ── الإطار ── */
function shell(k){
  close(true);
  var D=TOOLS[k], ov=document.createElement('div'); ov.id='hh-tool'; ov.className='tl8'; ov.setAttribute('role','dialog'); ov.setAttribute('aria-modal','true'); ov.setAttribute('aria-label',D.t);
  ov.style.setProperty('--tc',D.c);
  ov.innerHTML='<div class="tl8-top"><span class="ic">'+S(IC[D.ic])+'</span><b>'+D.t+'</b><span class="sp"></span><button type="button" class="ib" title="ملء الشاشة" onclick="hhToolFull()">'+S(IC.full)+'</button><button type="button" class="ib" title="إغلاق" onclick="hhToolClose()">'+S(IC.x,2.6)+'</button></div><div class="tl8-body" id="tl8-b"></div>';
  document.body.appendChild(ov); T.k=k; document.addEventListener('keydown',onKey,true);
  return $('tl8-b');
}
function close(silent){ T.cleanup.forEach(function(f){ try{ f(); }catch(e){} }); T.cleanup=[]; var o=$('hh-tool'); if(o) o.remove(); T.k=null; document.removeEventListener('keydown',onKey,true); try{ if(document.fullscreenElement) document.exitFullscreen(); }catch(e){} }
function onKey(e){ if(e.key==='Escape'&&T.k&&!document.fullscreenElement){ e.preventDefault(); close(); } else if(T.k&&T.keys&&T.keys[e.key]&&!/INPUT|TEXTAREA/.test((e.target||{}).tagName||'')){ e.preventDefault(); T.keys[e.key](); } }
window.hhToolClose=function(){ close(); };
window.hhToolFull=function(){ var r=$('hh-tool'); try{ if(document.fullscreenElement) document.exitFullscreen(); else if(r&&r.requestFullscreen) r.requestFullscreen(); }catch(e){} };

/* ── 1) المؤقت ── */
function tTimer(){
  var b=shell('timer'), st={total:+(ls('hh_tool_t')||300),left:0,run:false,iv:null};
  st.left=st.total; T.keys={' ':function(){ toggle(); }};
  function fmt(s){ var m=Math.floor(s/60), x=s%60; return m+':'+(x<10?'0':'')+x; }
  function draw(){
    var p=st.total?st.left/st.total:0, R=46, C=2*Math.PI*R;
    b.innerHTML='<div class="tm8"><div class="ring'+(st.left<=10&&st.left>0&&st.run?' hot':'')+(st.left===0?' end':'')+'"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="'+R+'" class="tr"/><circle cx="50" cy="50" r="'+R+'" class="pr" style="stroke-dasharray:'+C.toFixed(1)+';stroke-dashoffset:'+(C*(1-p)).toFixed(1)+'"/></svg><div class="v"><b>'+fmt(st.left)+'</b><small>'+(st.left===0?'انتهى الوقت':st.run?'يعمل':'متوقف')+'</small></div></div>'
      +'<div class="pre">'+[1,2,3,5,10,15].map(function(m){ return '<button type="button" class="ch'+(st.total===m*60?' on':'')+'" data-m="'+m+'">'+m+' د</button>'; }).join('')+'</div>'
      +'<div class="ctl"><button type="button" class="b" data-adj="-30">'+S(IC.minus)+' 30 ث</button><button type="button" class="b p" data-go>'+S(st.run?IC.pause:IC.play)+(st.run?' إيقاف':' ابدأ')+'</button><button type="button" class="b" data-adj="30">'+S(IC.plus)+' 30 ث</button><button type="button" class="b" data-rst>'+S(IC.reset)+' إعادة</button></div></div>';
    b.querySelectorAll('[data-m]').forEach(function(x){ x.onclick=function(){ stop(); st.total=st.left=+x.getAttribute('data-m')*60; ls('hh_tool_t',String(st.total)); draw(); }; });
    b.querySelectorAll('[data-adj]').forEach(function(x){ x.onclick=function(){ var d=+x.getAttribute('data-adj'); st.left=Math.max(0,st.left+d); if(st.left>st.total) st.total=st.left; draw(); }; });
    b.querySelector('[data-go]').onclick=toggle; b.querySelector('[data-rst]').onclick=function(){ stop(); st.left=st.total; draw(); };
  }
  function stop(){ st.run=false; clearInterval(st.iv); }
  function toggle(){ if(st.run){ stop(); draw(); return; } if(st.left<=0) st.left=st.total; st.run=true; sfx('select');
    st.iv=setInterval(function(){ st.left=Math.max(0,st.left-1); if(st.left<=5&&st.left>0) sfx('progress-step'); if(st.left===0){ stop(); sfx('achievement'); } draw(); },1000); draw(); }
  T.cleanup.push(stop); draw();
}

/* ── 2) الاختيار العشوائي ── */
function tPick(){
  var b=shell('pick'), st={mode:names().length?'names':'num',n:+(ls('hh_tool_n')||28),used:{},spin:false,cur:null,hist:[]};
  T.keys={' ':function(){ go(); }};
  function pool(){ if(st.mode==='names') return names(); var a=[]; for(var i=1;i<=st.n;i++) a.push(String(i)); return a; }
  function draw(){
    var P=pool(), left=P.filter(function(x){ return !st.used[x]; });
    b.innerHTML='<div class="pk8"><div class="seg"><button type="button" class="'+(st.mode==='num'?'on':'')+'" data-md="num">أرقام الطلاب</button><button type="button" class="'+(st.mode==='names'?'on':'')+'" data-md="names">أسماء</button></div>'
      +(st.mode==='num'?'<label class="nin">عدد الطلاب<input type="number" min="2" max="60" value="'+st.n+'" id="pk-n"></label>':'<label class="tin">اكتب الأسماء، اسماً في كل سطر<textarea id="pk-t" rows="4" placeholder="أحمد&#10;خالد&#10;سعد">'+esc(names().join('\n'))+'</textarea></label>')
      +'<div class="stage"><div class="card'+(st.spin?' spin':'')+(st.cur&&!st.spin?' won':'')+'"><small>'+(st.mode==='num'?'الطالب رقم':'الطالب')+'</small><b id="pk-v">'+(st.cur?esc(st.cur):'؟')+'</b></div></div>'
      +'<div class="ctl"><button type="button" class="b p" data-go '+(P.length?'':'disabled')+'>'+S(IC.dice)+' اختر</button><button type="button" class="b" data-rst>'+S(IC.reset)+' ابدأ دورة جديدة</button></div>'
      +'<div class="meta">'+(P.length?('بقي '+left.length+' من '+P.length+' لم يُختاروا'):'أضف الأسماء أولاً')+'</div>'
      +(st.hist.length?'<div class="hist">'+st.hist.slice(-12).map(function(x){ return '<span>'+esc(x)+'</span>'; }).join('')+'</div>':'')+'</div>';
    b.querySelectorAll('[data-md]').forEach(function(x){ x.onclick=function(){ st.mode=x.getAttribute('data-md'); st.used={}; st.cur=null; st.hist=[]; draw(); }; });
    var ni=$('pk-n'); if(ni) ni.onchange=function(){ st.n=Math.max(2,Math.min(60,parseInt(ni.value,10)||28)); ls('hh_tool_n',String(st.n)); st.used={}; st.hist=[]; draw(); };
    var ti=$('pk-t'); if(ti) ti.onchange=function(){ setNames(ti.value.split(/\n+/).map(function(x){ return x.trim(); }).filter(Boolean)); st.used={}; st.hist=[]; draw(); };
    b.querySelector('[data-go]').onclick=go; b.querySelector('[data-rst]').onclick=function(){ st.used={}; st.hist=[]; st.cur=null; draw(); };
  }
  function go(){ if(st.spin) return; var P=pool(); if(!P.length) return; var left=P.filter(function(x){ return !st.used[x]; }); if(!left.length){ st.used={}; left=P.slice(); toastX('اختير الجميع، تبدأ دورة جديدة'); }
    var fin=left[Math.floor(Math.random()*left.length)]; st.spin=true; draw(); var n=0, v=$('pk-v'); sfx('select');
    var iv=setInterval(function(){ n++; if(v) v.textContent=P[Math.floor(Math.random()*P.length)]; if(n>(RM?1:16)){ clearInterval(iv); st.spin=false; st.cur=fin; st.used[fin]=1; st.hist.push(fin); sfx('success'); draw(); } },80); }
  draw();
}

/* ── 3) تقسيم المجموعات ── */
function tGroups(){
  var b=shell('groups'), st={mode:names().length?'names':'num',n:+(ls('hh_tool_n')||28),g:+(ls('hh_tool_g')||4),res:null};
  function pool(){ if(st.mode==='names') return names(); var a=[]; for(var i=1;i<=st.n;i++) a.push('الطالب '+i); return a; }
  function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)), t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
  function make(){ var P=shuffle(pool()), G=[]; for(var i=0;i<st.g;i++) G.push([]); P.forEach(function(x,i){ G[i%st.g].push(x); }); st.res=G; sfx('success'); draw(); }
  function draw(){
    b.innerHTML='<div class="gr8"><div class="opts"><div class="seg"><button type="button" class="'+(st.mode==='num'?'on':'')+'" data-md="num">أرقام</button><button type="button" class="'+(st.mode==='names'?'on':'')+'" data-md="names">أسماء</button></div>'
      +(st.mode==='num'?'<label class="nin">عدد الطلاب<input type="number" min="2" max="60" value="'+st.n+'" id="gr-n"></label>':'<label class="tin">الأسماء، اسماً في كل سطر<textarea id="gr-t" rows="3">'+esc(names().join('\n'))+'</textarea></label>')
      +'<label class="nin">عدد المجموعات<span class="stp"><button type="button" data-g="-1">'+S(IC.minus)+'</button><b>'+st.g+'</b><button type="button" data-g="1">'+S(IC.plus)+'</button></span></label>'
      +'<button type="button" class="b p" data-go>'+S(IC.shuffle)+(st.res?' أعد التقسيم':' قسّم')+'</button></div>'
      +(st.res?'<div class="gg">'+st.res.map(function(G,i){ return '<div class="gc" style="--g:'+GC[i%GC.length]+';--i:'+i+'"><h4><i>'+(i+1)+'</i>المجموعة '+(i+1)+'<em>'+G.length+'</em></h4><ul>'+G.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('')+'</ul></div>'; }).join('')+'</div>':'<div class="emp">اختر العدد، ثم اضغط «قسّم»</div>')+'</div>';
    b.querySelectorAll('[data-md]').forEach(function(x){ x.onclick=function(){ st.mode=x.getAttribute('data-md'); st.res=null; draw(); }; });
    var ni=$('gr-n'); if(ni) ni.onchange=function(){ st.n=Math.max(2,Math.min(60,parseInt(ni.value,10)||28)); ls('hh_tool_n',String(st.n)); st.res=null; draw(); };
    var ti=$('gr-t'); if(ti) ti.onchange=function(){ setNames(ti.value.split(/\n+/).map(function(x){ return x.trim(); }).filter(Boolean)); st.res=null; draw(); };
    b.querySelectorAll('[data-g]').forEach(function(x){ x.onclick=function(){ st.g=Math.max(2,Math.min(8,st.g+(+x.getAttribute('data-g')))); ls('hh_tool_g',String(st.g)); if(st.res) make(); else draw(); }; });
    b.querySelector('[data-go]').onclick=make;
  }
  draw();
}

/* ── 4) لوحة النقاط ── */
function tScore(){
  var b=shell('score'), st; try{ st=JSON.parse(ls('hh_tool_sc')||'null'); }catch(e){} if(!st||!Array.isArray(st.t)) st={t:[{n:'الفريق الأول',s:0},{n:'الفريق الثاني',s:0}],step:1};
  function save(){ ls('hh_tool_sc',JSON.stringify(st)); }
  function draw(){
    var mx=Math.max.apply(null,st.t.map(function(x){ return x.s; }));
    b.innerHTML='<div class="sc8b"><div class="opts"><span>الزيادة</span>'+[1,5,10].map(function(v){ return '<button type="button" class="ch'+(st.step===v?' on':'')+'" data-st="'+v+'">'+v+'</button>'; }).join('')+'<span class="sp"></span><button type="button" class="b" data-add '+(st.t.length>=6?'disabled':'')+'>'+S(IC.plus)+' فريق</button><button type="button" class="b" data-rst>'+S(IC.reset)+' تصفير</button></div>'
      +'<div class="tt" style="--n:'+st.t.length+'">'+st.t.map(function(x,i){ return '<div class="tc'+(x.s===mx&&mx>0?' lead':'')+'" style="--g:'+GC[i%GC.length]+'"><input value="'+esc(x.n)+'" data-nm="'+i+'" aria-label="اسم الفريق" maxlength="24"><b data-sv="'+i+'">'+x.s+'</b><div class="pm"><button type="button" data-d="-1" data-i="'+i+'" aria-label="أنقص">'+S(IC.minus,2.6)+'</button><button type="button" data-d="1" data-i="'+i+'" aria-label="زد">'+S(IC.plus,2.6)+'</button></div>'+(st.t.length>2?'<button type="button" class="rm" data-rm="'+i+'" aria-label="حذف الفريق">'+S(IC.x,2.4)+'</button>':'')+'</div>'; }).join('')+'</div></div>';
    b.querySelectorAll('[data-st]').forEach(function(x){ x.onclick=function(){ st.step=+x.getAttribute('data-st'); save(); draw(); }; });
    b.querySelectorAll('[data-d]').forEach(function(x){ x.onclick=function(){ var i=+x.getAttribute('data-i'), d=+x.getAttribute('data-d'); st.t[i].s=Math.max(0,st.t[i].s+d*st.step); save(); sfx(d>0?'success':'select'); draw(); var e=b.querySelector('[data-sv="'+i+'"]'); if(e&&!RM){ e.classList.add('bump'); } }; });
    b.querySelectorAll('[data-nm]').forEach(function(x){ x.onchange=function(){ st.t[+x.getAttribute('data-nm')].n=x.value.trim()||'فريق'; save(); }; });
    b.querySelectorAll('[data-rm]').forEach(function(x){ x.onclick=function(){ st.t.splice(+x.getAttribute('data-rm'),1); save(); draw(); }; });
    b.querySelector('[data-add]').onclick=function(){ if(st.t.length>=6) return; st.t.push({n:'الفريق '+(st.t.length+1),s:0}); save(); draw(); };
    b.querySelector('[data-rst]').onclick=function(){ if(!confirm('تصفير نقاط كل الفرق؟')) return; st.t.forEach(function(x){ x.s=0; }); save(); draw(); };
  }
  draw();
}

/* ── 5) مقياس الهدوء ── */
function tQuiet(){
  var b=shell('quiet'), st={lim:+(ls('hh_tool_q')||55),stream:null,ctx:null,raf:0,lvl:0,over:0};
  function stop(){ cancelAnimationFrame(st.raf); try{ if(st.stream) st.stream.getTracks().forEach(function(t){ t.stop(); }); }catch(e){} try{ if(st.ctx) st.ctx.close(); }catch(e){} st.stream=null; st.ctx=null; }
  T.cleanup.push(stop);
  function intro(msg){
    b.innerHTML='<div class="qt8"><div class="intro"><span class="big">'+S(IC.mic,1.8)+'</span><h3>مقياس الهدوء</h3><p>'+(msg||'يقيس مستوى الصوت في الصف من الميكروفون، ولا يسجّل شيئاً ولا يرسله.')+'</p><button type="button" class="b p" data-st>'+S(IC.mic)+' شغّل المقياس</button></div></div>';
    b.querySelector('[data-st]').onclick=start;
  }
  async function start(){
    if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){ intro('هذا المتصفح لا يدعم الميكروفون.'); return; }
    try{ st.stream=await navigator.mediaDevices.getUserMedia({audio:true}); }catch(e){ intro('لم يُسمح باستخدام الميكروفون. اسمح به من إعدادات المتصفح ثم أعد المحاولة.'); return; }
    var AC=window.AudioContext||window.webkitAudioContext; st.ctx=new AC(); var src=st.ctx.createMediaStreamSource(st.stream), an=st.ctx.createAnalyser(); an.fftSize=1024; src.connect(an);
    var buf=new Uint8Array(an.fftSize);
    b.innerHTML='<div class="qt8"><div class="face" id="qt-f"><div class="em" id="qt-e"></div><b id="qt-l">هادئ</b></div><div class="mtr"><i id="qt-bar"></i><span class="lim" id="qt-lim" style="inset-inline-start:'+st.lim+'%"></span></div>'
      +'<label class="nin">الحد المسموح<input type="range" min="20" max="90" value="'+st.lim+'" id="qt-r"></label></div>';
    var r=$('qt-r'); r.oninput=function(){ st.lim=+r.value; ls('hh_tool_q',String(st.lim)); var l=$('qt-lim'); if(l) l.style.insetInlineStart=st.lim+'%'; };
    (function loop(){ an.getByteTimeDomainData(buf); var s=0; for(var i=0;i<buf.length;i++){ var v=(buf[i]-128)/128; s+=v*v; } var rms=Math.sqrt(s/buf.length), lv=Math.min(100,Math.round(rms*260));
      st.lvl=st.lvl*0.82+lv*0.18; var bar=$('qt-bar'), f=$('qt-f'), l=$('qt-l'); if(!bar) return;
      bar.style.width=st.lvl.toFixed(1)+'%'; var k=st.lvl<st.lim*0.6?'ok':st.lvl<st.lim?'mid':'hi';
      if(f.dataset.k!==k){ f.dataset.k=k; l.textContent=k==='ok'?'هادئ':k==='mid'?'مقبول':'مرتفع'; }
      st.raf=requestAnimationFrame(loop); })();
  }
  intro();
}

/* ── 6) إشارة العمل ── */
function tSignal(){
  var b=shell('signal'), M=[['quiet','صمت','العمل فردي وبلا كلام','#C2274F'],['whisper','همس','نتحدث بهدوء مع الزميل','#D49A2A'],['talk','نقاش','نعمل في المجموعات بصوت معتدل','#1E9E6A']], cur=ls('hh_tool_sig')||'quiet';
  T.keys={'1':function(){ set('quiet'); },'2':function(){ set('whisper'); },'3':function(){ set('talk'); }};
  function set(k){ cur=k; ls('hh_tool_sig',k); sfx('select'); draw(); }
  function draw(){ var m=M.filter(function(x){ return x[0]===cur; })[0]||M[0];
    b.innerHTML='<div class="sg8b" style="--sc:'+m[3]+'"><div class="lamp">'+M.map(function(x){ return '<button type="button" class="'+(x[0]===cur?'on':'')+'" style="--lc:'+x[3]+'" data-k="'+x[0]+'" aria-label="'+x[1]+'"></button>'; }).join('')+'</div><div class="lbl"><b>'+m[1]+'</b><small>'+m[2]+'</small></div><div class="keys">اختصارات: <kbd>1</kbd> صمت <kbd>2</kbd> همس <kbd>3</kbd> نقاش</div></div>';
    b.querySelectorAll('[data-k]').forEach(function(x){ x.onclick=function(){ set(x.getAttribute('data-k')); }; }); }
  draw();
}

/* ── 7) السبورة ── */
function tBoard(){
  var b=shell('board'), st={c:'#2A0711',w:5,er:false,strokes:[],cur:null};
  var CL=['#2A0711','#C2274F','#1F5E9E','#1E8A5C','#C88A1E'];
  b.innerHTML='<div class="bd8"><div class="tools">'+CL.map(function(c){ return '<button type="button" class="cl'+(c===st.c?' on':'')+'" style="--k:'+c+'" data-c="'+c+'" aria-label="لون"></button>'; }).join('')
    +'<span class="sep"></span>'+[3,6,12].map(function(w){ return '<button type="button" class="wd'+(w===6?' on':'')+'" data-w="'+w+'" aria-label="السماكة"><i style="width:'+(w+4)+'px;height:'+(w+4)+'px"></i></button>'; }).join('')
    +'<span class="sep"></span><button type="button" class="tb" data-er title="ممحاة">'+S(IC.eraser)+'</button><button type="button" class="tb" data-un title="تراجع">'+S(IC.undo)+'</button><button type="button" class="tb" data-cl title="مسح الكل">'+S(IC.trash)+'</button></div><div class="cv"><canvas id="bd-c"></canvas></div></div>';
  st.w=6;
  var cv=$('bd-c'), ctx=cv.getContext('2d'), wrap=cv.parentNode;
  function size(){ var r=wrap.getBoundingClientRect(), d=window.devicePixelRatio||1; cv.width=Math.max(10,r.width*d); cv.height=Math.max(10,r.height*d); cv.style.width=r.width+'px'; cv.style.height=r.height+'px'; ctx.setTransform(d,0,0,d,0,0); redraw(); }
  function line(s){ if(!s.p.length) return; ctx.globalCompositeOperation=s.er?'destination-out':'source-over'; ctx.strokeStyle=s.c; ctx.lineWidth=s.er?s.w*4:s.w; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.beginPath(); ctx.moveTo(s.p[0][0],s.p[0][1]); for(var i=1;i<s.p.length;i++) ctx.lineTo(s.p[i][0],s.p[i][1]); if(s.p.length===1) ctx.lineTo(s.p[0][0]+.1,s.p[0][1]+.1); ctx.stroke(); }
  function redraw(){ ctx.clearRect(0,0,cv.width,cv.height); st.strokes.forEach(line); ctx.globalCompositeOperation='source-over'; }
  function pt(e){ var r=cv.getBoundingClientRect(); return [e.clientX-r.left,e.clientY-r.top]; }
  cv.addEventListener('pointerdown',function(e){ cv.setPointerCapture(e.pointerId); st.cur={c:st.c,w:st.w,er:st.er,p:[pt(e)]}; st.strokes.push(st.cur); redraw(); });
  cv.addEventListener('pointermove',function(e){ if(!st.cur) return; st.cur.p.push(pt(e)); redraw(); });
  ['pointerup','pointercancel','pointerleave'].forEach(function(ev){ cv.addEventListener(ev,function(){ st.cur=null; }); });
  b.querySelectorAll('[data-c]').forEach(function(x){ x.onclick=function(){ st.c=x.getAttribute('data-c'); st.er=false; b.querySelectorAll('[data-c],[data-er]').forEach(function(y){ y.classList.toggle('on',y===x); }); }; });
  b.querySelectorAll('[data-w]').forEach(function(x){ x.onclick=function(){ st.w=+x.getAttribute('data-w'); b.querySelectorAll('[data-w]').forEach(function(y){ y.classList.toggle('on',y===x); }); }; });
  b.querySelector('[data-er]').onclick=function(){ st.er=!st.er; this.classList.toggle('on',st.er); b.querySelectorAll('[data-c]').forEach(function(y){ y.classList.toggle('on',!st.er&&y.getAttribute('data-c')===st.c); }); };
  b.querySelector('[data-un]').onclick=function(){ st.strokes.pop(); redraw(); };
  b.querySelector('[data-cl]').onclick=function(){ if(st.strokes.length&&!confirm('مسح السبورة؟')) return; st.strokes=[]; redraw(); };
  T.keys={z:function(){ st.strokes.pop(); redraw(); }};
  var ro=window.ResizeObserver?new ResizeObserver(size):null; if(ro){ ro.observe(wrap); T.cleanup.push(function(){ ro.disconnect(); }); } else { window.addEventListener('resize',size); T.cleanup.push(function(){ window.removeEventListener('resize',size); }); }
  setTimeout(size,30);
}

/* ── 8) رمز الدخول ── */
function tQr(){
  var b=shell('qr'), st={items:[{t:'المنصة',v:location.origin&&/^http/.test(location.origin)?location.origin:'https://almulhimedu.org',c:''}],sel:0,custom:''};
  function url(code){ return (location.origin&&/^http/.test(location.origin)?location.origin:'https://almulhimedu.org')+'/?join='+code; }
  function draw(){
    var it=st.sel==='c'?{t:'نص مخصص',v:st.custom}:st.items[st.sel]||st.items[0];
    b.innerHTML='<div class="qr8"><div class="pick">'+st.items.map(function(x,i){ return '<button type="button" class="ch'+(st.sel===i?' on':'')+'" data-i="'+i+'">'+esc(x.t)+'</button>'; }).join('')+'<button type="button" class="ch'+(st.sel==='c'?' on':'')+'" data-i="c">رابط أو نص آخر</button></div>'
      +(st.sel==='c'?'<label class="tin">الرابط أو النص<input id="qr-in" dir="ltr" value="'+esc(st.custom)+'" placeholder="https://"></label>':'')
      +'<div class="show"><div class="code" id="qr-box"></div><div class="tx">'+(it.c?'<small>رمز الصف</small><b class="cd">'+esc(it.c)+'</b>':'')+'<small>'+(it.c?'أو امسح الرمز بكاميرا الجوال':'امسح الرمز بكاميرا الجوال')+'</small><span class="u" dir="ltr">'+esc((it.v||'').replace(/^https?:\/\//,''))+'</span><button type="button" class="b" data-cp>'+S(IC.copy)+' انسخ الرابط</button></div></div></div>';
    b.querySelectorAll('[data-i]').forEach(function(x){ x.onclick=function(){ var v=x.getAttribute('data-i'); st.sel=v==='c'?'c':+v; draw(); }; });
    var inp=$('qr-in'); if(inp){ inp.oninput=function(){ st.custom=inp.value.trim(); clearTimeout(inp._t); inp._t=setTimeout(function(){ qr(st.custom); },300); }; }
    b.querySelector('[data-cp]').onclick=function(){ try{ navigator.clipboard.writeText(it.v||''); toastX('نُسخ الرابط','success'); }catch(e){} };
    qr(it.v);
  }
  function qr(text){ var box=$('qr-box'); if(!box) return; box.innerHTML=''; if(!text){ box.innerHTML='<div class="nq">اكتب رابطاً</div>'; return; }
    var go=function(){ try{ box.innerHTML=''; new QRCode(box,{text:text,width:280,height:280,colorDark:'#2A0711',colorLight:'#FFFFFF',correctLevel:QRCode.CorrectLevel.M}); }catch(e){ box.innerHTML='<div class="nq">تعذّر رسم الرمز</div>'; } };
    if(window.QRCode) return go(); var sc=document.createElement('script'); sc.src='https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'; sc.onload=go; sc.onerror=function(){ box.innerHTML='<div class="nq">تعذّر تحميل أداة الرمز، استخدم الرابط</div>'; }; document.head.appendChild(sc); }
  draw();
  (async function(){ try{ var u=(typeof currentUser!=='undefined'&&currentUser)||(firebase.auth().currentUser); if(!u) return;
    var qs=await firebase.firestore().collection('classrooms').where('teacherId','==',u.uid).limit(20).get(); var add=[]; qs.forEach(function(d){ var c=d.data()||{}; if(c.active===false||c.archived) return; add.push({t:c.className||d.id,v:url(d.id),c:d.id}); });
    if(add.length&&T.k==='qr'){ st.items=add.concat(st.items); if(st.sel!=='c') st.sel=0; draw(); } }catch(e){} })();
}

var RUN={timer:tTimer,pick:tPick,groups:tGroups,score:tScore,quiet:tQuiet,signal:tSignal,board:tBoard,qr:tQr};
window.hhTool=function(k){ if(!RUN[k]) return; T.keys=null; RUN[k](); };
window.hhToolHas=function(k){ return !!RUN[k]; };

/* ── الأنماط ── */
var CSS=[
'#hh-tool.tl8{position:fixed;inset:0;z-index:100060;display:flex;flex-direction:column;direction:rtl;font-family:Cairo,Tajawal,sans-serif;color:#FFF8EA;background:radial-gradient(120% 90% at 50% 0%,#6E1430 0%,#4A0B1E 38%,#2A0711 100%);animation:tl8f .25s;--gd:#D9B25F;--gl:#F1DC9E;--cr:#FFF8EA;--ink:#2A0711;}',
'@keyframes tl8f{from{opacity:0}}',
'#hh-tool.tl8 *{box-sizing:border-box;} #hh-tool.tl8 button,#hh-tool.tl8 input,#hh-tool.tl8 textarea{font-family:inherit;} #hh-tool.tl8 button{cursor:pointer;} #hh-tool.tl8 svg{display:block;}',
'#hh-tool.tl8 :focus-visible{outline:3px solid var(--gl);outline-offset:3px;}',
'#hh-tool .tl8-top{display:flex;align-items:center;gap:12px;padding:14px clamp(14px,2vw,28px);}',
'#hh-tool .tl8-top .ic{width:44px;height:44px;border-radius:13px;background:var(--tc);display:grid;place-items:center;box-shadow:inset 0 -3px 0 rgba(0,0,0,.18);} #hh-tool .tl8-top .ic svg{width:22px;height:22px;}',
'#hh-tool .tl8-top b{font-size:clamp(18px,1.6vw,24px);font-weight:900;} #hh-tool .tl8-top .sp{flex:1;}',
'#hh-tool .ib{width:42px;height:42px;border-radius:12px;border:1.5px solid rgba(255,255,255,.18);background:rgba(255,255,255,.05);color:var(--cr);display:grid;place-items:center;} #hh-tool .ib svg{width:19px;height:19px;}',
'#hh-tool .tl8-body{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;padding:10px clamp(14px,2vw,30px) 24px;overflow:auto;}',
'#hh-tool .b{height:50px;border-radius:14px;border:1.5px solid rgba(255,255,255,.2);background:rgba(255,255,255,.06);color:var(--cr);font-weight:900;font-size:16px;padding:0 20px;display:inline-flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;}',
'#hh-tool .b svg{width:18px;height:18px;} #hh-tool .b.p{background:linear-gradient(135deg,var(--gl),var(--gd));color:var(--ink);border-color:transparent;} #hh-tool .b:disabled{opacity:.4;cursor:default;}',
'#hh-tool .ch{height:40px;border-radius:20px;border:1.5px solid rgba(255,255,255,.2);background:rgba(255,255,255,.05);color:var(--cr);font-weight:800;font-size:15px;padding:0 16px;} #hh-tool .ch.on{background:var(--gl);color:var(--ink);border-color:transparent;}',
'#hh-tool .seg{display:inline-flex;background:rgba(0,0,0,.25);border-radius:14px;padding:4px;gap:4px;} #hh-tool .seg button{border:0;background:none;color:rgba(255,248,234,.75);font-weight:900;font-size:15px;padding:8px 18px;border-radius:10px;} #hh-tool .seg button.on{background:var(--gl);color:var(--ink);}',
'#hh-tool .nin,#hh-tool .tin{display:flex;flex-direction:column;gap:6px;font-size:14px;font-weight:800;color:rgba(255,248,234,.8);} #hh-tool .nin input[type=number],#hh-tool .tin input,#hh-tool .tin textarea{background:rgba(255,255,255,.08);border:1.5px solid rgba(255,255,255,.2);border-radius:12px;color:var(--cr);font-size:17px;font-weight:800;padding:10px 12px;} #hh-tool .nin input[type=number]{width:120px;text-align:center;} #hh-tool .tin textarea{resize:vertical;min-width:min(420px,80vw);}',
'#hh-tool .ctl{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;}',
/* المؤقت */
'#hh-tool .tm8{display:flex;flex-direction:column;align-items:center;gap:22px;width:100%;}',
'#hh-tool .tm8 .ring{position:relative;width:min(58vh,72vw,460px);aspect-ratio:1;} #hh-tool .tm8 .ring svg{width:100%;height:100%;transform:rotate(-90deg);}',
'#hh-tool .tm8 .tr{fill:none;stroke:rgba(255,255,255,.1);stroke-width:7;} #hh-tool .tm8 .pr{fill:none;stroke:var(--gl);stroke-width:7;stroke-linecap:round;transition:stroke-dashoffset .9s linear,stroke .3s;}',
'#hh-tool .tm8 .ring.hot .pr{stroke:#FF6B81;} #hh-tool .tm8 .ring.hot{animation:tl8p .5s infinite alternate;} @keyframes tl8p{to{transform:scale(1.03)}}',
'#hh-tool .tm8 .ring.end .tr{stroke:#FF6B81;}',
'#hh-tool .tm8 .v{position:absolute;inset:0;display:grid;place-items:center;align-content:center;gap:4px;} #hh-tool .tm8 .v b{font-size:clamp(56px,12vh,120px);font-weight:900;line-height:1;font-variant-numeric:tabular-nums;} #hh-tool .tm8 .v small{font-size:16px;font-weight:800;opacity:.7;}',
'#hh-tool .tm8 .pre{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;}',
/* الاختيار العشوائي */
'#hh-tool .pk8{display:flex;flex-direction:column;align-items:center;gap:16px;width:min(760px,100%);}',
'#hh-tool .pk8 .stage{width:100%;display:grid;place-items:center;padding:10px 0;}',
'#hh-tool .pk8 .card{min-width:min(520px,90vw);min-height:min(34vh,260px);background:var(--cr);color:var(--ink);border-radius:30px;display:grid;place-items:center;align-content:center;gap:4px;padding:24px;box-shadow:0 30px 60px rgba(0,0,0,.4);text-align:center;}',
'#hh-tool .pk8 .card small{font-size:18px;font-weight:800;opacity:.6;} #hh-tool .pk8 .card b{font-size:clamp(48px,10vh,110px);font-weight:900;line-height:1.15;}',
'#hh-tool .pk8 .card.spin b{opacity:.55;filter:blur(.5px);} #hh-tool .pk8 .card.won{animation:tl8w .6s cubic-bezier(.3,1.5,.5,1);} @keyframes tl8w{0%{transform:scale(.85)}60%{transform:scale(1.05)}}',
'#hh-tool .pk8 .meta{font-weight:800;opacity:.75;} #hh-tool .hist{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;} #hh-tool .hist span{background:rgba(255,255,255,.08);border-radius:20px;padding:2px 12px;font-weight:800;font-size:14px;}',
/* المجموعات */
'#hh-tool .gr8{display:flex;flex-direction:column;gap:18px;width:min(1200px,100%);align-self:flex-start;}',
'#hh-tool .gr8 .opts{display:flex;gap:14px;align-items:flex-end;flex-wrap:wrap;justify-content:center;}',
'#hh-tool .gr8 .stp{display:flex;align-items:center;gap:10px;} #hh-tool .gr8 .stp button{width:44px;height:44px;border-radius:12px;border:1.5px solid rgba(255,255,255,.2);background:rgba(255,255,255,.06);color:var(--cr);display:grid;place-items:center;} #hh-tool .gr8 .stp svg{width:18px;height:18px;} #hh-tool .gr8 .stp b{font-size:24px;font-weight:900;min-width:30px;text-align:center;}',
'#hh-tool .gr8 .gg{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;}',
'#hh-tool .gr8 .gc{background:var(--cr);color:var(--ink);border-radius:20px;overflow:hidden;box-shadow:0 14px 30px rgba(0,0,0,.3);animation:tl8u .5s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i)*70ms);} @keyframes tl8u{from{opacity:0;transform:translateY(16px)}}',
'#hh-tool .gr8 .gc h4{margin:0;background:var(--g);color:#fff;padding:12px 14px;display:flex;align-items:center;gap:8px;font-size:17px;font-weight:900;} #hh-tool .gr8 .gc h4 i{width:30px;height:30px;border-radius:9px;background:rgba(255,255,255,.22);display:grid;place-items:center;font-style:normal;} #hh-tool .gr8 .gc h4 em{margin-inline-start:auto;font-style:normal;font-size:13px;background:rgba(0,0,0,.2);border-radius:20px;padding:0 10px;}',
'#hh-tool .gr8 .gc ul{list-style:none;margin:0;padding:10px 14px 14px;display:grid;gap:6px;} #hh-tool .gr8 .gc li{font-size:17px;font-weight:800;padding:4px 10px;border-radius:10px;background:#FAF6EE;}',
'#hh-tool .gr8 .emp{text-align:center;font-weight:800;opacity:.7;padding:40px 0;}',
/* لوحة النقاط */
'#hh-tool .sc8b{display:flex;flex-direction:column;gap:18px;width:100%;height:100%;}',
'#hh-tool .sc8b .opts{display:flex;align-items:center;gap:8px;flex-wrap:wrap;} #hh-tool .sc8b .opts > span{font-weight:800;opacity:.8;} #hh-tool .sc8b .opts .sp{flex:1;}',
'#hh-tool .sc8b .tt{flex:1;display:grid;grid-template-columns:repeat(min(var(--n),3),minmax(0,1fr));gap:16px;min-height:0;}',
'#hh-tool .sc8b .tc{position:relative;border-radius:26px;background:linear-gradient(180deg,color-mix(in srgb,var(--g) 85%,#fff 0%),color-mix(in srgb,var(--g) 60%,#000));display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:18px;box-shadow:0 16px 34px rgba(0,0,0,.35);min-height:200px;}',
'#hh-tool .sc8b .tc.lead{box-shadow:0 0 0 4px var(--gl),0 16px 34px rgba(0,0,0,.35);}',
'#hh-tool .sc8b .tc input{background:transparent;border:0;border-bottom:2px dashed rgba(255,255,255,.35);color:#fff;font-size:clamp(18px,2vw,26px);font-weight:900;text-align:center;width:90%;padding:4px;}',
'#hh-tool .sc8b .tc b{font-size:clamp(60px,11vh,120px);font-weight:900;line-height:1;font-variant-numeric:tabular-nums;} #hh-tool .sc8b .tc b.bump{animation:tl8w .5s;}',
'#hh-tool .sc8b .pm{display:flex;gap:12px;} #hh-tool .sc8b .pm button{width:64px;height:56px;border-radius:16px;border:0;background:rgba(255,255,255,.2);color:#fff;display:grid;place-items:center;} #hh-tool .sc8b .pm button:last-child{background:#fff;color:var(--g);} #hh-tool .sc8b .pm svg{width:26px;height:26px;}',
'#hh-tool .sc8b .rm{position:absolute;top:10px;left:10px;width:32px;height:32px;border-radius:50%;border:0;background:rgba(0,0,0,.25);color:#fff;display:grid;place-items:center;} #hh-tool .sc8b .rm svg{width:14px;height:14px;}',
/* الهدوء */
'#hh-tool .qt8{display:flex;flex-direction:column;align-items:center;gap:26px;width:min(820px,100%);}',
'#hh-tool .qt8 .intro{text-align:center;display:grid;justify-items:center;gap:12px;} #hh-tool .qt8 .intro .big{width:110px;height:110px;border-radius:32px;background:var(--tc);display:grid;place-items:center;} #hh-tool .qt8 .intro .big svg{width:54px;height:54px;} #hh-tool .qt8 .intro h3{margin:0;font-size:28px;font-weight:900;} #hh-tool .qt8 .intro p{margin:0;max-width:460px;font-weight:700;opacity:.8;line-height:1.8;}',
'#hh-tool .qt8 .face{width:min(42vh,320px);aspect-ratio:1;border-radius:50%;display:grid;place-items:center;align-content:center;gap:8px;background:#1E9E6A;box-shadow:0 0 0 14px rgba(30,158,106,.18),0 30px 60px rgba(0,0,0,.4);transition:background .4s,box-shadow .4s;}',
'#hh-tool .qt8 .face[data-k=mid]{background:#D49A2A;box-shadow:0 0 0 14px rgba(212,154,42,.2),0 30px 60px rgba(0,0,0,.4);} #hh-tool .qt8 .face[data-k=hi]{background:#C2274F;box-shadow:0 0 0 14px rgba(194,39,79,.25),0 30px 60px rgba(0,0,0,.4);animation:tl8p .35s infinite alternate;}',
'#hh-tool .qt8 .face b{font-size:clamp(36px,6vh,60px);font-weight:900;}',
'#hh-tool .qt8 .em{width:56%;height:22%;border-bottom:8px solid rgba(255,255,255,.9);border-radius:0 0 50% 50%;transition:all .4s;} #hh-tool .qt8 .face[data-k=mid] .em{border-radius:0;height:0;} #hh-tool .qt8 .face[data-k=hi] .em{border-bottom:0;border-top:8px solid rgba(255,255,255,.9);border-radius:50% 50% 0 0;}',
'#hh-tool .qt8 .mtr{position:relative;width:100%;height:26px;border-radius:20px;background:rgba(255,255,255,.1);overflow:visible;} #hh-tool .qt8 .mtr i{display:block;height:100%;border-radius:20px;background:linear-gradient(90deg,#1E9E6A,#D49A2A 60%,#C2274F);width:0;transition:width .1s;}',
'#hh-tool .qt8 .lim{position:absolute;top:-8px;bottom:-8px;width:4px;border-radius:4px;background:var(--gl);} #hh-tool .qt8 input[type=range]{width:min(400px,80vw);accent-color:#D9B25F;}',
/* الإشارة */
'#hh-tool .sg8b{display:flex;align-items:center;justify-content:center;gap:clamp(24px,6vw,80px);flex-wrap:wrap;}',
'#hh-tool .sg8b .lamp{background:#1A0509;border-radius:60px;padding:22px;display:flex;flex-direction:column;gap:18px;box-shadow:inset 0 0 0 4px rgba(217,178,95,.4),0 30px 60px rgba(0,0,0,.5);}',
'#hh-tool .sg8b .lamp button{width:min(17vh,130px);aspect-ratio:1;border-radius:50%;border:0;background:color-mix(in srgb,var(--lc) 22%,#1A0509);transition:all .35s;} #hh-tool .sg8b .lamp button.on{background:var(--lc);box-shadow:0 0 50px var(--lc),0 0 0 6px color-mix(in srgb,var(--lc) 40%,transparent);}',
'#hh-tool .sg8b .lbl{display:grid;gap:8px;text-align:center;} #hh-tool .sg8b .lbl b{font-size:clamp(60px,12vh,130px);font-weight:900;color:var(--sc);line-height:1.1;text-shadow:0 0 40px color-mix(in srgb,var(--sc) 50%,transparent);} #hh-tool .sg8b .lbl small{font-size:clamp(18px,2vw,26px);font-weight:800;opacity:.85;}',
'#hh-tool .sg8b .keys{width:100%;text-align:center;font-size:13px;font-weight:800;opacity:.55;} #hh-tool kbd{font-family:inherit;border:1px solid rgba(255,255,255,.35);border-radius:6px;padding:0 6px;margin:0 2px;}',
/* السبورة */
'#hh-tool .bd8{display:flex;flex-direction:column;gap:12px;width:100%;height:100%;}',
'#hh-tool .bd8 .tools{display:flex;align-items:center;gap:8px;flex-wrap:wrap;background:rgba(0,0,0,.25);border-radius:16px;padding:8px 12px;align-self:center;}',
'#hh-tool .bd8 .cl{width:34px;height:34px;border-radius:50%;border:3px solid transparent;background:var(--k);} #hh-tool .bd8 .cl.on{border-color:#fff;}',
'#hh-tool .bd8 .wd{width:36px;height:36px;border-radius:10px;border:1.5px solid transparent;background:rgba(255,255,255,.06);display:grid;place-items:center;} #hh-tool .bd8 .wd i{display:block;border-radius:50%;background:#fff;} #hh-tool .bd8 .wd.on{border-color:var(--gl);}',
'#hh-tool .bd8 .tb{width:38px;height:38px;border-radius:10px;border:1.5px solid transparent;background:rgba(255,255,255,.06);color:var(--cr);display:grid;place-items:center;} #hh-tool .bd8 .tb svg{width:19px;height:19px;} #hh-tool .bd8 .tb.on{border-color:var(--gl);background:rgba(241,220,158,.15);}',
'#hh-tool .bd8 .sep{width:1px;height:26px;background:rgba(255,255,255,.2);}',
'#hh-tool .bd8 .cv{flex:1;min-height:0;background:#FFFDF8;border-radius:22px;box-shadow:0 20px 40px rgba(0,0,0,.35);overflow:hidden;touch-action:none;} #hh-tool .bd8 canvas{display:block;cursor:crosshair;touch-action:none;}',
/* الرمز */
'#hh-tool .qr8{display:flex;flex-direction:column;align-items:center;gap:18px;width:min(960px,100%);}',
'#hh-tool .qr8 .pick{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;} #hh-tool .qr8 .tin input{min-width:min(460px,80vw);text-align:left;}',
'#hh-tool .qr8 .show{display:flex;align-items:center;gap:clamp(20px,4vw,50px);flex-wrap:wrap;justify-content:center;}',
'#hh-tool .qr8 .code{background:#fff;border-radius:26px;padding:20px;box-shadow:0 30px 60px rgba(0,0,0,.4);min-width:240px;min-height:240px;display:grid;place-items:center;} #hh-tool .qr8 .code img,#hh-tool .qr8 .code canvas{display:block;width:min(42vh,280px) !important;height:auto !important;}',
'#hh-tool .qr8 .nq{color:#7A6A54;font-weight:800;}',
'#hh-tool .qr8 .tx{display:grid;gap:8px;justify-items:start;max-width:420px;} #hh-tool .qr8 .tx small{font-weight:800;opacity:.75;font-size:15px;} #hh-tool .qr8 .cd{font-size:clamp(48px,9vh,96px);font-weight:900;letter-spacing:8px;color:var(--gl);direction:ltr;line-height:1.1;} #hh-tool .qr8 .u{font-size:18px;font-weight:800;word-break:break-all;}',
'@media (max-width:700px){ #hh-tool .sc8b .tt{grid-template-columns:repeat(2,minmax(0,1fr));} #hh-tool .sc8b .tc{min-height:150px;} #hh-tool .sg8b .lamp{flex-direction:row;padding:14px;} #hh-tool .sg8b .lamp button{width:70px;} #hh-tool .b{height:46px;font-size:15px;padding:0 14px;} #hh-tool .tl8-body{align-items:flex-start;} }',
'@media (prefers-reduced-motion:reduce){ #hh-tool *,#hh-tool *::before,#hh-tool *::after{animation:none !important;transition:none !important;} }'
].join('\n');
var stl=document.createElement('style'); stl.id='hh-tools8-css'; stl.textContent=CSS; (document.head||document.documentElement).appendChild(stl);
})();
