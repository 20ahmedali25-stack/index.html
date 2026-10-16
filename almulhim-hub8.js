/* ============================================================
   المُلهم التعليمي، اختصاراتك المتحركة، وبوابة المدرسة للمعلم المعتمد
   almulhimedu.org (zzzzzzcr)
   ============================================================ */
(function(){
'use strict';
if(window._hhHub8) return; window._hhHub8=true;
function S(p,w){ return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'; }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function call(n){ var a=[].slice.call(arguments,1); try{ if(typeof window[n]==='function') return window[n].apply(window,a); }catch(e){} }
function isAdm(){ try{ return typeof hhIsAdmin==='function'&&!!hhIsAdmin(); }catch(e){ return false; } }
function user(){ try{ return (typeof currentUser!=='undefined'&&currentUser)||(firebase.auth().currentUser)||null; }catch(e){ return null; } }
var RM=(function(){ try{ return matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){ return false; } })();
var AR=S('<path d="M15 5l-7 7 7 7"/>',2.6);

/* ═══ 1) اختصاراتك ═══ */
var TCH=[
  {k:'#1D5C99',t:'المدرسة',d:'مسار الصف وبوابات الإتقان',ic:'<path d="M3 21h18"/><path d="M5 21V9l7-5 7 5v12"/><path d="M10 21v-5h4v5"/>',go:function(){ call('hhGvGo','school'); }},
  {k:'#C2862B',t:'البرامج',d:'معسكرات المُلهم وبرامج القادة',ic:'<circle cx="12" cy="8" r="6"/><path d="M8.5 13.5L7 22l5-3 5 3-1.5-8.5"/>',go:function(){ call('hhGvGo','prog'); }},
  {k:'#8A1538',t:'المحبرة',d:'الحصة والطلاب والتقارير',ic:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/>',go:function(){ call('hhGvGo','tool'); }},
  {k:'#23855A',t:'الإبداع',d:'استوديو الألعاب التعليمية',ic:'<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/>',nw:1,go:function(){ call('hhGvGo','ib'); }}
];
var ADMK=['#6A42A8','#C2862B','#1D5C99','#0E8288','#23855A','#8A1538','#2C3E73'];
function hist(){ try{ var h=JSON.parse(localStorage.getItem('hh_game_history')||'[]'); return Array.isArray(h)?h:[]; }catch(e){ return []; } }
function ago(ts){ if(!ts) return ''; var d=Math.floor((Date.now()-ts)/864e5); if(d<=0) return 'اليوم'; if(d===1) return 'أمس'; if(d===2) return 'قبل يومين'; if(d<11) return 'قبل '+d+' أيام'; return 'قبل '+d+' يوماً'; }
function gn(n){ return n===1?'لعبة واحدة':n===2?'لعبتان':(n>2&&n<11)?n+' ألعاب':n+' لعبة'; }
function admTiles(){ var a=document.getElementById('sc2-adm-tiles'); if(!a) return []; return [].slice.call(a.querySelectorAll('.hv2-tile')).filter(function(t){ return t.style.display!=='none'; }); }
var scBusy=false;
function scRender(){
  var sc=document.getElementById('hv2-sc'); if(!sc||scBusy) return; scBusy=true;
  try{
    sc.classList.add('sc8h');
    var adm=admTiles(), h=hist();
    var sig=adm.map(function(t){ return t.textContent.trim(); }).join('|')+'#'+h.length+'#'+(h[0]?h[0].name+h[0].timestamp:'');
    var box=document.getElementById('sc8'); if(box&&box.dataset.sig===sig){ scBusy=false; return; }
    if(!box){ box=document.createElement('section'); box.id='sc8'; box.className='sc8'; box.setAttribute('aria-label','اختصاراتك'); sc.appendChild(box); }
    box.dataset.sig=sig;
    var total=1+TCH.length+adm.length, last=h[0];
    var html='<div class="hd"><span class="dm"></span><h2>اختصاراتك</h2><span class="n">'+total+' اختصارات</span></div>'
      +(adm.length?'<div class="lbl">للمعلم</div>':'')
      +'<div class="row1"><button type="button" class="hero rv" style="--i:0" data-sc="mg"><span class="fl"><i></i><i></i><i></i><i></i></span>'
      +'<span class="tp"><span class="ic">'+S('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>')+'</span>'+(h.length?'<span class="cnt"><span data-to="'+h.length+'">'+(RM?h.length:0)+'</span> '+(h.length===1?'لعبة':h.length===2?'لعبتان':h.length<11?'ألعاب':'لعبة')+'</span>':'')+'</span>'
      +'<b class="h3">ألعابي المحفوظة</b><span class="p">تشكيلاتك السابقة جاهزة بضغطة</span>'
      +'<span class="bt">'+(last?'<span class="last"><span class="dot"></span>آخر لعبة: <b>'+esc(last.name||'لعبة')+'</b>، '+ago(last.timestamp)+'</span>':'<span class="last">لا ألعاب بعد، ابدأ أول لعبة</span>')+'<span class="go">'+AR+'</span></span></button>'
      +TCH.map(function(x,i){ return '<button type="button" class="c rv" style="--i:'+(i+1)+';--k:'+x.k+'" data-sc="t'+i+'">'+(x.nw?'<span class="bdg">جديد</span>':'')+'<span class="ic">'+S(x.ic)+'</span><span class="tx"><b>'+x.t+'</b><small>'+x.d+'</small></span><span class="ar">'+AR+'</span></button>'; }).join('')+'</div>';
    if(adm.length){
      html+='<div class="lbl">أدوات الإدارة</div><div class="row2">'+adm.map(function(t,i){ var b=t.querySelector('b'), sm=t.querySelector('small'), sv=t.querySelector('svg'); var nm=(b?b.textContent:t.textContent).trim(), ds=(sm?sm.textContent:'').replace(/\s*·\s*/g,'، ').trim();
        return '<button type="button" class="a rv" style="--i:'+(i+5)+';--k:'+ADMK[i%ADMK.length]+'" data-sc="a'+i+'"><span class="ic">'+(sv?sv.outerHTML:'')+'</span><b>'+esc(nm)+'</b>'+(ds?'<small>'+esc(ds)+'</small>':'')+'</button>'; }).join('')+'</div>';
    }
    box.innerHTML=html;
    box.querySelectorAll('[data-sc]').forEach(function(el){ el.onclick=function(){ var k=el.getAttribute('data-sc');
      if(k==='mg'){ call('hhNavigate','screen-mygames'); return; }
      if(k.charAt(0)==='t'){ TCH[+k.slice(1)].go(); return; }
      var t=admTiles()[+k.slice(1)]; if(t) t.click(); }; });
    scIn(box);
  }catch(e){}
  scBusy=false;
}
function scCount(box){ box.querySelectorAll('[data-to]').forEach(function(e){ var to=+e.getAttribute('data-to'); if(RM){ e.textContent=to; return; } var t0=null; function st(t){ if(!t0) t0=t; var k=Math.min(1,(t-t0)/900); e.textContent=Math.round(to*(1-Math.pow(1-k,3))); if(k<1) requestAnimationFrame(st); } requestAnimationFrame(st); }); }
function scIn(box){
  if(RM||box.classList.contains('in')){ box.classList.add('in'); box.querySelectorAll('[data-to]').forEach(function(e){ e.textContent=e.getAttribute('data-to'); }); return; }
  if('IntersectionObserver' in window){ var io=new IntersectionObserver(function(es){ es.forEach(function(x){ if(x.isIntersecting){ box.classList.add('in'); scCount(box); io.disconnect(); } }); },{threshold:.12}); io.observe(box); setTimeout(function(){ if(!box.classList.contains('in')){ box.classList.add('in'); scCount(box); } },2600); }
  else { box.classList.add('in'); scCount(box); }
}
function scBoot(){
  var sc=document.getElementById('hv2-sc'); if(!sc){ return setTimeout(scBoot,500); }
  scRender();
  var mo=new MutationObserver(function(){ clearTimeout(scBoot._t); scBoot._t=setTimeout(scRender,60); });
  mo.observe(sc,{childList:true,subtree:true});
  window.addEventListener('storage',function(e){ if(e.key==='hh_game_history') scRender(); });
}

/* ═══ 2) بوابة المدرسة للمعلم المعتمد ═══ */
var SCH='<path d="M3 21h18"/><path d="M5 21V9l7-5 7 5v12"/><path d="M10 21v-5h4v5"/>';
var I={lock:S('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>',2.4),clk:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',2.4),x:S('<path d="M18 6L6 18M6 6l12 12"/>',2.8),
  ck:S('<path d="M5 12l5 5L20 7"/>',2.6),sh:S('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>'),send:S('<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>')};
var SUBJ=['الدراسات الاجتماعية','التربية الإسلامية','اللغة العربية','العلوم','الرياضيات','اللغة الإنجليزية','الحوسبة وتكنولوجيا المعلومات','التربية البدنية','الفنون البصرية','أخرى'];
var _sg={st:'none',req:null,busy:false};
function approved(){ try{ if(isAdm()) return true; if(typeof _hhMyRole!=='undefined'&&(_hhMyRole==='teacher'||_hhMyRole==='admin')) return true; }catch(e){} return false; }
function badge(c,i){ return '<div class="sg-badge '+(c||'')+'">'+S(SCH)+'<i>'+i+'</i></div>'; }
var PERKS='<div class="sg-perks"><span>'+I.ck+'صفوفي وطلابي</span><span>'+I.ck+'دفتر المتابعة</span><span>'+I.ck+'الشهادات المعتمدة</span><span>'+I.ck+'دروسي الخاصة</span></div>';
var ALT='<div class="sg-alt">طالب؟ <button type="button" data-a="stu">ادخل فصلك برمز المعلم</button></div>';
function V(){ var R=_sg.req||{}, u=user()||{};
  switch(_sg.st){
  case 'load': return '<div class="sg-load"><i></i>جارٍ التحقق من حسابك</div>';
  case 'guest': return badge('',I.lock)+'<h2>المدرسة للمعلم المعتمد</h2><p>سجّل الدخول بحساب المعلم، ثم قدّم طلب اعتمادك.</p>'+PERKS+'<div class="sg-acts"><button type="button" class="sg-b p" data-a="login">تسجيل الدخول</button><button type="button" class="sg-b" data-a="home">العودة للرئيسية</button></div>'+ALT;
  case 'form': return badge('',I.send)+'<h2>طلب اعتماد معلم</h2><p>بياناتك تصل للإدارة فقط.</p><div class="sg-form">'
      +'<label class="f">الاسم الثلاثي<input id="sg-name" autocomplete="name" maxlength="60" placeholder="مثال: أحمد علي الكواري" value="'+esc(R.name||u.displayName||'')+'"></label>'
      +'<label>المدرسة<input id="sg-school" maxlength="80" placeholder="اسم مدرستك" value="'+esc(R.school||'')+'"></label>'
      +'<label>المادة<select id="sg-subject">'+SUBJ.map(function(s){ return '<option'+(R.subject===s?' selected':'')+'>'+s+'</option>'; }).join('')+'</select></label>'
      +'<label>رقم الجوال<input id="sg-phone" inputmode="tel" dir="ltr" maxlength="20" placeholder="+974" value="'+esc(R.phone||'')+'"></label>'
      +'<label>البريد<input id="sg-email" dir="ltr" readonly value="'+esc(R.email||u.email||'')+'"></label>'
      +'<div class="sg-note">'+I.sh+'يُراجع الطلب عادة خلال يومين.</div><div class="sg-err" id="sg-err" role="alert"></div></div>'
      +'<div class="sg-acts" style="margin-top:18px"><button type="button" class="sg-b p" data-a="send">'+I.send+'أرسل الطلب</button><button type="button" class="sg-b" data-a="back">رجوع</button></div>';
  case 'wait': return badge('w',I.clk)+'<h2>طلبك قيد المراجعة</h2><div class="sg-steps"><span class="d"><i>'+I.ck+'</i><b>أُرسل</b></span><em></em><span class="n"><i>2</i><b>المراجعة</b></span><em></em><span><i>3</i><b>الاعتماد</b></span></div><p>تصلك رسالة في الإشعارات فور الاعتماد. حتى ذلك الحين تستطيع اللعب من «العب الآن» والإبداع.</p><div class="sg-acts"><button type="button" class="sg-b p" data-a="play">العب الآن</button><button type="button" class="sg-b" data-a="form">تعديل الطلب</button></div>'+ALT;
  case 'no': return badge('r',I.x)+'<h2>لم يُعتمد طلبك</h2>'+(R.reason||R.rejectReason||R.note?'<div class="sg-reason">السبب: '+esc(R.reason||R.rejectReason||R.note)+'</div>':'')+'<p>عدّل بياناتك وأعد الإرسال.</p><div class="sg-acts"><button type="button" class="sg-b p" data-a="form">'+I.send+'أعد التقديم</button><button type="button" class="sg-b" data-a="contact">تواصل معنا</button></div>';
  default: return badge('',I.lock)+'<h2>هذا القسم خاص بالمعلم المعتمد</h2><p>قدّم طلب اعتمادك مرة واحدة، وبعد قبوله تفتح لك المدرسة بكل أدواتها.</p>'+PERKS+'<div class="sg-acts"><button type="button" class="sg-b p" data-a="form">'+I.send+'قدّم طلب اعتماد</button><button type="button" class="sg-b" data-a="home">العودة للرئيسية</button></div>'+ALT;
  }
}
function sgDraw(){
  var ov=document.getElementById('hh-sch-wiz'); if(!ov||!ov.classList.contains('sg8')) return;
  var c=ov.querySelector('.sg-card'); if(!c) return; c.innerHTML=V(); c.classList.remove('sg-anim'); void c.offsetWidth; c.classList.add('sg-anim');
  var f=c.querySelector('#sg-name')||c.querySelector('.sg-b.p'); if(f&&_sg.st==='form') try{ f.focus({preventScroll:true}); }catch(e){}
}
function sgClose(){ var ov=document.getElementById('hh-sch-wiz'); if(ov) ov.remove(); call('hhNavMark',null); }
async function sgLoad(){
  var u=user(); if(!u){ _sg.st='guest'; sgDraw(); return; }
  _sg.st='load'; sgDraw();
  try{ var d=await firebase.firestore().collection('teacher_requests').doc(u.uid).get(); _sg.req=d.exists?(d.data()||{}):null; }catch(e){ _sg.req=null; }
  var st=_sg.req&&_sg.req.status;
  if(st==='approved'||approved()){ sgClose(); _openSchool(); return; }
  _sg.st=st==='pending'?'wait':st==='rejected'?'no':'none'; sgDraw();
}
async function sgSend(){
  if(_sg.busy) return; var g=function(id){ var e=document.getElementById(id); return e?String(e.value||'').trim():''; };
  var name=g('sg-name'), school=g('sg-school'), subject=g('sg-subject'), phone=g('sg-phone'), email=g('sg-email'), err=document.getElementById('sg-err');
  function bad(m,id){ if(err) err.textContent=m; var e=document.getElementById(id); if(e) try{ e.focus(); }catch(x){} }
  if(name.split(/\s+/).filter(Boolean).length<2) return bad('اكتب اسمك الثلاثي','sg-name');
  if(school.length<3) return bad('اكتب اسم مدرستك','sg-school');
  if(!/^\+?[0-9\s]{8,16}$/.test(phone)) return bad('اكتب رقم جوال صحيحاً','sg-phone');
  var u=user(); if(!u){ _sg.st='guest'; sgDraw(); return; }
  _sg.busy=true; var b=document.querySelector('#hh-sch-wiz [data-a="send"]'); if(b){ b.disabled=true; b.lastChild.textContent='جارٍ الإرسال'; }
  try{
    var data={uid:u.uid,name:name,subject:subject,school:school,phone:phone,email:email||u.email||'',status:'pending',createdAt:new Date().toISOString()};
    await firebase.firestore().collection('teacher_requests').doc(u.uid).set(data);
    _sg.req=data; _sg.st='wait'; sgDraw();
    call('toast','أُرسل طلب اعتمادك','success'); call('hhLogActivity','teacher_request',name+'، '+school);
  }catch(e){ if(err) err.textContent='تعذّر الإرسال، تأكد من اتصالك وحاول ثانية'; if(b){ b.disabled=false; b.lastChild.textContent='أرسل الطلب'; } }
  _sg.busy=false;
}
function sgOpen(){
  call('hhCloseFramedOverlays','school');
  var old=document.getElementById('hh-sch-wiz'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-sch-wiz'; ov.className='sp2 sg8';
  ov.innerHTML='<div class="sp2-wrap"><div class="sg-card sg-anim"></div></div>';
  document.body.appendChild(ov); call('hhNavMark','school');
  ov.addEventListener('click',function(e){ var a=e.target.closest('[data-a]'); if(!a) return; var k=a.getAttribute('data-a');
    if(k==='login'){ sgClose(); if(typeof hhNavigate==='function') hhNavigate('screen-login'); else call('showScreen','screen-login'); }
    else if(k==='home'){ sgClose(); call('hhGvGo','home'); }
    else if(k==='form'){ _sg.st='form'; sgDraw(); }
    else if(k==='back'){ _sg.st=_sg.req&&_sg.req.status==='pending'?'wait':_sg.req&&_sg.req.status==='rejected'?'no':'none'; sgDraw(); }
    else if(k==='send'){ sgSend(); }
    else if(k==='play'){ sgClose(); call('hhGvPlay'); }
    else if(k==='contact'){ sgClose(); call('hhNavigate','screen-contact'); }
    else if(k==='stu'){ sgClose(); try{ localStorage.setItem('hh_sch_wiz_role','student'); }catch(x){} _openSchool('student'); }
  });
  ov.addEventListener('keydown',function(e){ if(e.key==='Enter'&&_sg.st==='form'&&e.target.tagName==='INPUT'){ e.preventDefault(); sgSend(); } });
  sgLoad();
}
var _se0=null;
function _openSchool(role){ if(_se0) return _se0.call(window,role||undefined); }
function wrapEntry(){
  if(typeof window.hhSchoolEntry!=='function'||window.hhSchoolEntry._sg8) return !!(window.hhSchoolEntry&&window.hhSchoolEntry._sg8);
  _se0=window.hhSchoolEntry;
  var w=function(role){ if(approved()) return _se0.apply(this,arguments); sgOpen(); };
  w._sg8=1; window.hhSchoolEntry=w; return true;
}
(function tryWrap(n){ if(!wrapEntry()&&n<40) setTimeout(function(){ tryWrap(n+1); },250); })(0);
window.hhSchoolGate=sgOpen;

/* ═══ الأنماط ═══ */
var CSS=[
'#sc8,#hh-sch-wiz.sg8{--s:#fff;--so:#FAF6EE;--l:#E7DCC6;--ink:#3D0918;--mu:#7A6A54;--gd:#B8924A;--gl:#E6CE8E;--gb:#FBF1DA;--m2:#8A1538;--gr:#23855A;--grb:#EAF5EF;--rd:#B3261E;--rdb:#FCEEEC;}',
'body.dark-mode #sc8,body.dark-mode #hh-sch-wiz.sg8{--s:#22121A;--so:#2A1720;--l:#3E2C24;--ink:#F5E6C4;--mu:#B8A68A;--gb:#3A2A10;--grb:#173226;--rdb:#3A1512;}',
/* اختصاراتك */
'#hv2-sc.sc8h{background:none !important;border:0 !important;padding:0 !important;box-shadow:none !important;}',
'#hv2-sc.sc8h::before,#hv2-sc.sc8h::after{display:none !important;}',
'#hv2-sc.sc8h > .hv2-sec,#hv2-sc.sc8h > .hv2-tiles,#hv2-sc.sc8h > .sc2-lab,#hv2-sc.sc8h > .sc2-adm{display:none !important;}',
'#sc8{background:var(--s);border:1px solid var(--l);border-radius:22px;padding:22px;box-shadow:0 14px 40px rgba(61,9,24,.06);font-family:Cairo,Tajawal,sans-serif;color:var(--ink);text-align:start;direction:rtl;}',
'#sc8 button{font-family:inherit;cursor:pointer;text-align:start;}',
'#sc8 .hd{display:flex;align-items:center;gap:10px;margin-bottom:18px;}',
'#sc8 .hd h2{margin:0 !important;font-size:26px !important;font-weight:900;color:var(--ink) !important;font-family:Cairo,sans-serif !important;line-height:1.4 !important;}',
'#sc8 .hd .dm{width:12px;height:12px;background:var(--gd);transform:rotate(45deg);border-radius:2px;animation:sc8spin 6s linear infinite;}',
'@keyframes sc8spin{to{transform:rotate(405deg)}}',
'#sc8 .hd .n{margin-inline-start:auto;font-size:13px;font-weight:800;color:#8A6D2E;background:var(--gb);border-radius:20px;padding:4px 12px;}',
'body.dark-mode #sc8 .hd .n,body.dark-mode #sc8 .lbl{color:#E6CE8E;}',
'#sc8 .lbl{font-size:13px;font-weight:900;color:#8A6D2E;margin:6px 2px 10px;display:flex;align-items:center;gap:8px;}',
'#sc8 .lbl::after{content:"";flex:1;height:1px;background:linear-gradient(to left,var(--l),transparent);}',
'#sc8 .row1{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr) minmax(0,1fr);grid-template-rows:auto auto;gap:14px;margin-bottom:22px;}',
'#sc8 .hero{grid-row:span 2;position:relative;overflow:hidden;border-radius:20px;padding:22px;color:#fff;border:0;background:linear-gradient(130deg,#4A0B1E,#8A1538 55%,#5E0E26);background-size:200% 200%;animation:sc8shift 12s ease-in-out infinite;display:flex;flex-direction:column;min-height:260px;isolation:isolate;}',
'@keyframes sc8shift{50%{background-position:100% 50%}}',
'#sc8 .hero .fl{position:absolute;inset:0;z-index:-1;pointer-events:none;}',
'#sc8 .hero .fl i{position:absolute;width:44px;height:44px;border-radius:12px;border:1.5px solid rgba(230,206,142,.35);background:rgba(255,255,255,.05);animation:sc8float 9s ease-in-out infinite;}',
'#sc8 .hero .fl i:nth-child(1){top:18%;left:8%;} #sc8 .hero .fl i:nth-child(2){top:58%;left:20%;width:30px;height:30px;animation-delay:-3s;} #sc8 .hero .fl i:nth-child(3){top:12%;left:38%;width:22px;height:22px;border-radius:50%;animation-delay:-5s;} #sc8 .hero .fl i:nth-child(4){bottom:12%;left:44%;width:36px;height:36px;border-radius:50%;animation-delay:-1.5s;}',
'@keyframes sc8float{50%{transform:translateY(-14px) rotate(12deg)}}',
'#sc8 .hero .tp{display:flex;align-items:flex-start;justify-content:space-between;}',
'#sc8 .hero .ic{width:66px;height:66px;border-radius:18px;background:#fff;color:#8A1538;display:grid;place-items:center;box-shadow:0 8px 20px rgba(0,0,0,.2);transition:transform .35s cubic-bezier(.3,1.6,.5,1);} #sc8 .hero .ic svg{width:32px;height:32px;}',
'#sc8 .hero:hover .ic{transform:rotate(-8deg) scale(1.08);}',
'#sc8 .hero .cnt{background:#fff;color:#8A1538;border-radius:20px;padding:3px 12px;font-weight:900;font-size:14px;}',
'#sc8 .hero .h3{display:block;margin:auto 0 4px;font-size:30px;font-weight:900;color:#fff;}',
'#sc8 .hero .p{display:block;margin:0 0 14px;font-size:16px;font-weight:800;color:#E6CE8E;}',
'#sc8 .hero .bt{display:flex;align-items:center;gap:10px;}',
'#sc8 .hero .last{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(230,206,142,.45);border-radius:12px;padding:7px 14px;font-weight:800;font-size:14px;color:#F5E6C4;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}',
'#sc8 .hero .last b{color:#fff;}',
'#sc8 .hero .dot{width:8px;height:8px;border-radius:50%;background:#5FD08A;flex-shrink:0;animation:sc8pulse 2s infinite;}',
'@keyframes sc8pulse{0%{box-shadow:0 0 0 0 rgba(95,208,138,.6)}70%{box-shadow:0 0 0 8px rgba(95,208,138,0)}100%{box-shadow:0 0 0 0 rgba(95,208,138,0)}}',
'#sc8 .hero .go{margin-inline-start:auto;width:46px;height:46px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:grid;place-items:center;transition:background .2s,transform .25s;flex-shrink:0;} #sc8 .hero .go svg{width:18px;height:18px;}',
'#sc8 .hero:hover .go{background:#fff;color:#8A1538;transform:translateX(-6px);}',
'#sc8 .hero::after{content:"";position:absolute;top:0;bottom:0;width:40%;left:-60%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.14),transparent);transform:skewX(-18deg);transition:left .8s ease;}',
'#sc8 .hero:hover::after{left:120%;}',
'#sc8 .c{position:relative;display:flex;align-items:center;gap:14px;border:1.5px solid var(--l);background:var(--s);color:var(--ink);border-radius:18px;padding:18px;overflow:hidden;transition:transform .25s,box-shadow .25s,border-color .25s;}',
'#sc8 .c::before{content:"";position:absolute;inset:auto 0 0 0;height:3px;background:var(--k);transform:scaleX(0);transform-origin:right;transition:transform .35s ease;}',
'#sc8 .c:hover{transform:translateY(-4px);border-color:color-mix(in srgb,var(--k) 45%,var(--l));box-shadow:0 14px 30px color-mix(in srgb,var(--k) 18%,transparent);} #sc8 .c:hover::before{transform:scaleX(1);}',
'#sc8 .c .ic{width:56px;height:56px;border-radius:16px;background:color-mix(in srgb,var(--k) 12%,var(--s));color:var(--k);display:grid;place-items:center;flex-shrink:0;transition:background .25s,color .25s,transform .4s cubic-bezier(.3,1.6,.5,1);} #sc8 .c .ic svg{width:27px;height:27px;}',
'#sc8 .c:hover .ic{background:var(--k);color:#fff;transform:rotate(-8deg) scale(1.06);}',
'#sc8 .c .tx{min-width:0;flex:1;} #sc8 .c b{display:block;font-size:19px;font-weight:900;} #sc8 .c small{display:block;font-size:13.5px;font-weight:700;color:var(--mu);line-height:1.6;}',
'#sc8 .c .ar{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;color:var(--k);opacity:0;transform:translateX(8px);transition:opacity .25s,transform .25s;flex-shrink:0;} #sc8 .c .ar svg{width:16px;height:16px;} #sc8 .c:hover .ar{opacity:1;transform:none;}',
'#sc8 .c .bdg{position:absolute;top:10px;left:12px;font-size:11px;font-weight:900;color:#fff;background:#C0562F;border-radius:20px;padding:1px 9px;}',
'#sc8 .row2{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;}',
'#sc8 .a{position:relative;border:1.5px solid var(--l);background:var(--s);color:var(--ink);border-radius:16px;padding:16px 10px 14px;text-align:center !important;display:flex;flex-direction:column;align-items:center;gap:6px;transition:transform .25s,box-shadow .25s,border-color .25s;}',
'#sc8 .a:hover{transform:translateY(-4px);border-color:color-mix(in srgb,var(--k) 45%,var(--l));box-shadow:0 12px 26px color-mix(in srgb,var(--k) 16%,transparent);}',
'#sc8 .a .ic{width:50px;height:50px;border-radius:14px;background:color-mix(in srgb,var(--k) 12%,var(--s));color:var(--k);display:grid;place-items:center;transition:background .25s,color .25s;} #sc8 .a .ic svg{width:24px;height:24px;}',
'#sc8 .a:hover .ic{background:var(--k);color:#fff;} #sc8 .a:hover .ic svg{animation:sc8wig .5s ease;}',
'@keyframes sc8wig{25%{transform:rotate(-12deg)}75%{transform:rotate(10deg)}}',
'#sc8 .a b{font-size:16px;font-weight:900;} #sc8 .a small{font-size:12.5px;font-weight:700;color:var(--mu);}',
'#sc8 .rv{opacity:0;transform:translateY(16px);} #sc8.in .rv{animation:sc8up .6s cubic-bezier(.2,.8,.2,1) forwards;animation-delay:calc(var(--i)*70ms);}',
'@keyframes sc8up{to{opacity:1;transform:none}}',
'#sc8 :focus-visible{outline:3px solid var(--gd);outline-offset:3px;}',
'@media (max-width:980px){ #sc8 .row1{grid-template-columns:minmax(0,1fr) minmax(0,1fr);} #sc8 .hero{grid-column:1 / -1;grid-row:auto;min-height:220px;} #sc8 .row2{grid-template-columns:repeat(3,minmax(0,1fr));} }',
'@media (max-width:600px){ #sc8{padding:16px;} #sc8 .hd h2{font-size:21px !important;} #sc8 .row1{grid-template-columns:minmax(0,1fr);} #sc8 .c{padding:14px;} #sc8 .c .ar{opacity:1;transform:none;} #sc8 .row2{grid-template-columns:repeat(2,minmax(0,1fr));} #sc8 .hero .h3{font-size:25px;} }',
/* البوابة */
'#hh-sch-wiz.sg8 .sp2-wrap{max-width:760px !important;}',
'#hh-sch-wiz.sg8 .sg-card{max-width:720px;margin:0 auto;background:var(--s);border:1px solid var(--l);border-radius:22px;padding:30px 26px;text-align:center;box-shadow:0 14px 40px rgba(61,9,24,.06);color:var(--ink);font-family:Cairo,sans-serif;}',
'#hh-sch-wiz.sg8 .sg-anim{animation:sg8up .45s cubic-bezier(.2,.8,.2,1);} @keyframes sg8up{from{opacity:0;transform:translateY(12px)}}',
'#hh-sch-wiz.sg8 button,#hh-sch-wiz.sg8 input,#hh-sch-wiz.sg8 select{font-family:Cairo,sans-serif;}',
'#hh-sch-wiz.sg8 .sg-badge{width:84px;height:84px;margin:0 auto 14px;border-radius:24px;display:grid;place-items:center;position:relative;background:var(--gb);color:#8A6D2E;}',
'#hh-sch-wiz.sg8 .sg-badge > svg{width:40px;height:40px;}',
'#hh-sch-wiz.sg8 .sg-badge i{position:absolute;bottom:-6px;left:-6px;width:34px;height:34px;border-radius:50%;background:#5E0E26;color:#fff;display:grid;place-items:center;border:3px solid var(--s);} #hh-sch-wiz.sg8 .sg-badge i svg{width:16px;height:16px;}',
'#hh-sch-wiz.sg8 .sg-badge.w i{background:var(--gd);} #hh-sch-wiz.sg8 .sg-badge.r i{background:var(--rd);}',
'#hh-sch-wiz.sg8 .sg-card h2{margin:0 0 6px !important;font-size:24px !important;line-height:1.45 !important;font-weight:900;color:var(--ink) !important;font-family:Cairo,sans-serif !important;}',
'#hh-sch-wiz.sg8 .sg-card p{margin:0 auto 18px;max-width:440px;font-size:15px;font-weight:700;color:var(--mu);line-height:1.8;}',
'#hh-sch-wiz.sg8 .sg-perks{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-bottom:22px;}',
'#hh-sch-wiz.sg8 .sg-perks span{display:inline-flex;align-items:center;gap:6px;background:var(--so);border:1px solid var(--l);border-radius:20px;padding:5px 12px;font-size:13.5px;font-weight:800;} #hh-sch-wiz.sg8 .sg-perks svg{width:15px;height:15px;color:var(--gd);}',
'#hh-sch-wiz.sg8 .sg-acts{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;}',
'#hh-sch-wiz.sg8 .sg-b{height:48px;border-radius:12px;border:1.5px solid var(--l);background:var(--s);color:var(--ink);font-weight:900;font-size:15.5px;padding:0 22px;display:inline-flex;align-items:center;gap:8px;cursor:pointer;}',
'#hh-sch-wiz.sg8 .sg-b.p{background:#5E0E26;border-color:#5E0E26;color:#fff;} #hh-sch-wiz.sg8 .sg-b svg{width:17px;height:17px;} #hh-sch-wiz.sg8 .sg-b:disabled{opacity:.6;cursor:default;}',
'#hh-sch-wiz.sg8 .sg-alt{margin-top:16px;font-size:13.5px;font-weight:800;color:var(--mu);} #hh-sch-wiz.sg8 .sg-alt button{border:0;background:none;padding:0;color:var(--m2);font-weight:900;font-size:13.5px;border-bottom:1px dashed currentColor;cursor:pointer;}',
'body.dark-mode #hh-sch-wiz.sg8 .sg-alt button{color:#E6CE8E;}',
'#hh-sch-wiz.sg8 .sg-form{text-align:start;display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:6px;}',
'#hh-sch-wiz.sg8 .sg-form label{display:flex;flex-direction:column;gap:5px;font-size:13px;font-weight:800;color:var(--mu);} #hh-sch-wiz.sg8 .sg-form label.f{grid-column:1 / -1;}',
'#hh-sch-wiz.sg8 .sg-form input,#hh-sch-wiz.sg8 .sg-form select{height:46px;border:1.5px solid var(--l);border-radius:12px;background:var(--so);padding:0 12px;font-size:15px;font-weight:700;color:var(--ink);width:100%;min-width:0;}',
'#hh-sch-wiz.sg8 .sg-form input:focus,#hh-sch-wiz.sg8 .sg-form select:focus{border-color:var(--gd);outline:0;} #hh-sch-wiz.sg8 .sg-form input[readonly]{opacity:.7;}',
'#hh-sch-wiz.sg8 .sg-note{grid-column:1 / -1;font-size:12.5px;font-weight:700;color:var(--mu);display:flex;gap:6px;align-items:center;} #hh-sch-wiz.sg8 .sg-note svg{width:15px;height:15px;color:var(--gr);flex-shrink:0;}',
'#hh-sch-wiz.sg8 .sg-err{grid-column:1 / -1;font-size:13px;font-weight:800;color:var(--rd);min-height:0;} body.dark-mode #hh-sch-wiz.sg8 .sg-err{color:#FF9C92;}',
'#hh-sch-wiz.sg8 .sg-steps{display:flex;justify-content:center;align-items:center;gap:6px;margin:4px 0 18px;}',
'#hh-sch-wiz.sg8 .sg-steps span{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:800;color:var(--mu);}',
'#hh-sch-wiz.sg8 .sg-steps i{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-style:normal;font-size:12px;font-weight:900;background:var(--l);color:var(--mu);} #hh-sch-wiz.sg8 .sg-steps i svg{width:14px;height:14px;}',
'#hh-sch-wiz.sg8 .sg-steps .d i{background:var(--gr);color:#fff;} #hh-sch-wiz.sg8 .sg-steps .n i{background:var(--gd);color:#fff;animation:sg8p 1.8s infinite;}',
'@keyframes sg8p{50%{box-shadow:0 0 0 6px rgba(184,146,74,.25)}}',
'#hh-sch-wiz.sg8 .sg-steps em{width:28px;height:2px;background:var(--l);}',
'#hh-sch-wiz.sg8 .sg-reason{background:var(--rdb);color:var(--rd);border-radius:12px;padding:10px 14px;font-size:14px;font-weight:800;margin:0 auto 18px;max-width:440px;} body.dark-mode #hh-sch-wiz.sg8 .sg-reason{color:#FF9C92;}',
'#hh-sch-wiz.sg8 .sg-load{display:flex;align-items:center;justify-content:center;gap:10px;padding:40px 0;font-weight:800;color:var(--mu);} #hh-sch-wiz.sg8 .sg-load i{width:20px;height:20px;border-radius:50%;border:3px solid var(--l);border-top-color:var(--gd);animation:sg8s 1s linear infinite;} @keyframes sg8s{to{transform:rotate(360deg)}}',
'#hh-sch-wiz.sg8 :focus-visible{outline:3px solid var(--gd);outline-offset:2px;}',
'@media (max-width:560px){ #hh-sch-wiz.sg8 .sg-card{padding:22px 16px;} #hh-sch-wiz.sg8 .sg-form{grid-template-columns:1fr;} #hh-sch-wiz.sg8 .sg-b{flex:1;justify-content:center;white-space:nowrap;font-size:14.5px;padding:0 12px;} #hh-sch-wiz.sg8 .sg-card h2{font-size:21px !important;} #hh-sch-wiz.sg8 .sg-steps span b{display:none;} }',
'@media (prefers-reduced-motion:reduce){ #sc8 *,#sc8 *::before,#sc8 *::after,#hh-sch-wiz.sg8 *{animation:none !important;transition:none !important;} #sc8 .rv{opacity:1;transform:none;} }'
].join('\n');
var st=document.createElement('style'); st.id='hh-hub8-css'; st.textContent=CSS; (document.head||document.documentElement).appendChild(st);
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',scBoot); else scBoot();
})();
