/* ============================================================
   المُلهم التعليمي، التنقل الموحّد بأسلوب المواقع الحكومية (zzzzzzce)
   شريط خدمات رفيع + صف الشعار والبحث والحساب + شريط أقسام نصي
   يحل محل الشريط السفلي الثابت، ويضيف تذييلاً في آخر الصفحات
   ============================================================ */
(function(){
'use strict';
if(window._hhGovNav) return; window._hhGovNav=true;

function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function call(fn){ try{ var f=window[fn]; if(typeof f==='function') return f.apply(window,[].slice.call(arguments,1)); }catch(e){ console.warn('govnav',fn,e); } }
function closeOv(keep){ try{ if(window.hhCloseFramedOverlays) hhCloseFramedOverlays(keep); }catch(e){} }

/* الأقسام */
var SEC=[
  {k:'home',  t:'الرئيسية', go:function(){ closeOv(); call('hhNavigate','screen-menu'); }},
  {k:'school',t:'المدرسة',  go:function(){ closeOv('school'); call('hhSchoolEntry'); }},
  {k:'tool',  t:'المحبرة',  go:function(){ if(typeof window.hhMhOpen==='function'){ closeOv('mh'); hhMhOpen(); } else { closeOv(); call('hhNavigate','screen-toolbox'); } }},
  {k:'ib',    t:'الإبداع',    go:function(){ closeOv('ib'); call('hhIbOpen'); }},
  {k:'prog',  t:'البرامج',  go:function(){ closeOv('prog'); call('hhOpenLeaderPrograms'); }},
  {k:'lb',    t:'المتصدرون',go:function(){ closeOv(); call('hhNavigate','screen-lb'); }}
];
var DD={
  sup:{t:'الداعمون', items:[
    {k:'spons',t:'الرعاة',s:'الجهات الراعية للمنصة وبرامجها',go:function(){ closeOv(); call('hhNavigate','screen-sponsors'); }},
    {k:'spons',t:'الشركاء',s:'الجهات المتعاونة معنا',go:function(){ closeOv(); call('hhNavigate','screen-sponsors'); }},
    {k:'infl',t:'الشخصيات المؤثرة',s:'الملهمون الداعمون للمنصة',go:function(){ closeOv(); call('hhNavigate','screen-influencers'); }}
  ]},
  about:{t:'عن المنصة', items:[
    {k:'story',t:'قصتنا',s:'رسالة المنصة ورؤيتها',go:function(){ closeOv(); call('hhNavigate','screen-story'); }},
    {k:'rev',t:'آراء المستخدمين',s:'شاركنا رأيك في المنصة',go:function(){ closeOv(); call('hhNavigate','screen-reviews'); }},
    {k:'mg',t:'ألعابي المحفوظة',s:'تشكيلاتك السابقة جاهزة بضغطة',go:function(){ closeOv(); call('hhNavigate','screen-mygames'); }},
    {k:'ref',t:'المراجع',s:'مصادر المحتوى والأسئلة',go:function(){ closeOv(); call('hhNavigate','screen-references'); }},
    {k:'guide',t:'دليل الاستخدام',s:'للمعلم وللطالب',go:function(){ call('hhOpenGuide'); }},
    {k:'contact',t:'التواصل والدعم',s:'راسلنا أو اطلب المساعدة',go:function(){ closeOv(); call('hhNavigate','screen-contact'); }}
  ]}
};
var SCR2K={'screen-menu':'home','screen-toolbox':'tool','screen-lb':'lb','screen-sponsors':'sup','screen-influencers':'sup','screen-story':'about','screen-reviews':'about','screen-mygames':'about','screen-references':'about','screen-contact':'about','screen-about':'about'};
var OV2K={school:'school',ib:'ib',prog:'prog',mh:'tool'};
var cur='home', curOv=null;

function playNow(){ closeOv(); if(typeof window.hhStartGameNow==='function') hhStartGameNow(); else call('hhNavigate','screen-setup'); }
window.hhGvPlay=playNow;
window.hhGvGo=function(k){ var s=SEC.filter(function(x){ return x.k===k; })[0]; closeMenus(); closeSheet(); if(s){ s.go(); setTimeout(paint,60); } };
window.hhGvDD=function(g,i){ var it=DD[g]&&DD[g].items[i]; closeMenus(); closeSheet(); if(it){ it.go(); setTimeout(paint,60); } };

/* ── البناء ── */
function logo(){ var src=window._HH_LOGO_MAROON||''; return src?'<img src="'+src+'" alt="المُلهم">':'<span class="gv-lm">م</span>'; }
function build(){
  var nav=document.getElementById('main-nav'); if(!nav||document.getElementById('gv-hd')) return !!nav;
  var hd=document.createElement('div'); hd.id='gv-hd';
  hd.innerHTML=
    '<div class="gv-ut"><div class="gv-in"><span class="gv-ut-t">منصة تعليمية قطرية للمعلمين والطلاب</span><span class="gv-sp"></span><span class="gv-ut-l" id="gv-ut-l"></span></div></div>'
   +'<div class="gv-lr"><div class="gv-in"><button type="button" class="gv-lg" onclick="hhGvGo(\'home\')" aria-label="الرئيسية"><span class="gv-lgi" id="gv-lgi">'+logo()+'</span><span class="gv-lgt"><b>المُلهم</b><small>حيث يبدأ الإلهام</small></span></button>'
   +'<span class="gv-vl"></span><span class="gv-org">نُلهم اليوم... لنصنع الغد</span><span class="gv-sp"></span><span class="gv-srch" id="gv-srch"></span><span class="gv-acc" id="gv-acc"></span>'
   +'<button type="button" class="gv-play gv-m" onclick="hhGvPlay()">العب الآن</button><button type="button" class="gv-mbtn gv-m" id="gv-mbtn" onclick="hhGvSheet()" aria-expanded="false">القائمة</button></div></div>'
   +'<div class="gv-nv"><div class="gv-in" id="gv-nv-in">'
   +SEC.map(function(s){ return '<button type="button" class="gv-a" data-k="'+s.k+'" onclick="hhGvGo(\''+s.k+'\')">'+s.t+'</button>'; }).join('')
   +Object.keys(DD).map(function(g){ return '<div class="gv-dd" data-g="'+g+'"><button type="button" class="gv-a dd" data-k="'+g+'" onclick="hhGvMenu(\''+g+'\',event)" aria-haspopup="true" aria-expanded="false">'+DD[g].t+'</button><div class="gv-mn"><h5>'+DD[g].t+'</h5>'+DD[g].items.map(function(it,i){ return '<button type="button" onclick="hhGvDD(\''+g+'\','+i+')"><b>'+it.t+'</b><small>'+it.s+'</small></button>'; }).join('')+'</div></div>'; }).join('')
   +'<button type="button" class="gv-play gv-d" onclick="hhGvPlay()">العب الآن</button></div></div>';
  nav.appendChild(hd);
  nav.classList.add('gv-on'); document.documentElement.classList.add('gv-on');
  // نقل العناصر الحية من الشريط القديم مع الحفاظ على وظائفها
  var sc=nav.querySelector('.nav-search-container'); if(sc) document.getElementById('gv-srch').appendChild(sc);
  var acc=document.getElementById('gv-acc');
  ['nav-login-btn','nav-profile-btn'].forEach(function(id){ var e=document.getElementById(id); if(e) acc.appendChild(e); });
  var ut=document.getElementById('gv-ut-l');
  var links=[['nav-notif-btn','الإشعارات'],['nav-tm-btn','رسالة للمعلم'],['nav-wn-btn','جديدنا'],['nav-tour-btn','دليل الاستخدام'],['dark-toggle','الوضع الليلي']];
  var c=document.createElement('button'); c.type='button'; c.className='gv-ul'; c.textContent='التواصل والدعم'; c.onclick=function(){ closeOv(); call('hhNavigate','screen-contact'); }; ut.appendChild(c);
  links.forEach(function(l){ var e=document.getElementById(l[0]); if(!e) return; e.classList.add('gv-ul'); var t=document.createElement('span'); t.className='gv-ult'; t.textContent=l[1]; e.appendChild(t); ut.appendChild(e); });
  // ورقة الجوال
  var sh=document.createElement('div'); sh.id='gv-sheet'; sh.setAttribute('role','dialog'); sh.setAttribute('aria-label','القائمة');
  sh.innerHTML='<div class="gv-sh-in">'+SEC.map(function(s){ return '<button type="button" data-k="'+s.k+'" onclick="hhGvGo(\''+s.k+'\')">'+s.t+'<i>›</i></button>'; }).join('')
    +Object.keys(DD).map(function(g){ return '<h6>'+DD[g].t+'</h6>'+DD[g].items.map(function(it,i){ return '<button type="button" onclick="hhGvDD(\''+g+'\','+i+')">'+it.t+'<i>›</i></button>'; }).join(''); }).join('')
    +'<h6>الحساب</h6><button type="button" onclick="hhGvAcc()">حسابي<i>›</i></button><button type="button" onclick="hhGvSheet(false);toggleDarkMode()">الوضع الليلي<i>›</i></button></div>';
  document.body.appendChild(sh);
  var dim=document.createElement('div'); dim.id='gv-dim'; dim.onclick=function(){ closeSheet(); }; document.body.appendChild(dim);
  // التذييل
  var ft=document.createElement('footer'); ft.id='gv-ft';
  ft.innerHTML='<div class="gv-ft-g"><div><h4>المُلهم</h4><p>منصة تعليمية قطرية تجمع الألعاب الصفية، ومسارات الإتقان، وأدوات المعلم في مكان واحد.</p></div>'
    +'<div><h4>المنصة</h4><button type="button" onclick="hhGvPlay()">العب الآن</button>'+SEC.slice(1,5).map(function(s){ return '<button type="button" onclick="hhGvGo(\''+s.k+'\')">'+s.t+'</button>'; }).join('')+'</div>'
    +'<div><h4>الداعمون</h4>'+DD.sup.items.map(function(it,i){ return '<button type="button" onclick="hhGvDD(\'sup\','+i+')">'+it.t+'</button>'; }).join('')+'</div>'
    +'<div><h4>عن المنصة</h4><button type="button" onclick="hhGvDD(\'about\',0)">قصتنا</button><button type="button" onclick="hhGvDD(\'about\',5)">التواصل والدعم</button><button type="button" onclick="hhGvDD(\'about\',1)">شاركنا رأيك</button><button type="button" onclick="call2(\'screen-terms\')">شروط الاستخدام</button></div></div>'
    +'<div class="gv-ft-b"><span>جميع الحقوق محفوظة لمنصة المُلهم '+new Date().getFullYear()+'</span><span>almulhimedu.org</span></div>';
  window.call2=function(id){ closeOv(); try{ showScreen(id); }catch(e){} };
  window._gvFoot=ft;
  return true;
}
window.hhGvAcc=function(){ closeSheet(); var p=document.getElementById('nav-profile-btn'), l=document.getElementById('nav-login-btn'); if(l&&getComputedStyle(l).display!=='none'){ l.click(); return; } if(p) p.click(); };

/* القوائم المنسدلة */
function closeMenus(){ document.querySelectorAll('#gv-hd .gv-dd.op').forEach(function(d){ d.classList.remove('op'); var b=d.querySelector('.gv-a'); if(b) b.setAttribute('aria-expanded','false'); }); }
window.hhGvMenu=function(g,e){ if(e) e.stopPropagation(); var d=document.querySelector('#gv-hd .gv-dd[data-g="'+g+'"]'); if(!d) return; var was=d.classList.contains('op'); closeMenus(); if(!was){ d.classList.add('op'); d.querySelector('.gv-a').setAttribute('aria-expanded','true'); } };
document.addEventListener('click',function(e){ if(!e.target.closest||!e.target.closest('#gv-hd .gv-dd')) closeMenus(); });
document.addEventListener('keydown',function(e){ if(e.key==='Escape'){ closeMenus(); closeSheet(); } });
function closeSheet(){ document.documentElement.classList.remove('gv-sheet-on'); var b=document.getElementById('gv-mbtn'); if(b){ b.textContent='القائمة'; b.setAttribute('aria-expanded','false'); } }
window.hhGvSheet=function(force){ var on=typeof force==='boolean'?force:!document.documentElement.classList.contains('gv-sheet-on'); if(!on){ closeSheet(); return; } document.documentElement.classList.add('gv-sheet-on'); var b=document.getElementById('gv-mbtn'); if(b){ b.textContent='إغلاق'; b.setAttribute('aria-expanded','true'); } paint(); };

/* القسم النشط */
function paint(){
  var k=curOv?OV2K[curOv]||cur:cur;
  document.querySelectorAll('#gv-hd .gv-a, #gv-sheet [data-k]').forEach(function(b){ b.classList.toggle('on',b.getAttribute('data-k')===k); });
}
var _nm=window.hhNavMark;
function wrapMark(){ var f=window.hhNavMark; if(!f||f._gv) return; var w=function(k){ var r=f.apply(this,arguments); curOv=k||null; paint(); placeFoot(); return r; }; w._gv=1; window.hhNavMark=w; }
function wrapNav(){ var f=window.hh_updateBottomNav; if(typeof f!=='function'||f._gv) return; var w=function(id){ var r=f.apply(this,arguments); cur=SCR2K[id]||cur; if(id&&!SCR2K[id]) cur='';
    curScr=id; try{ hhGvMiniReset(); }catch(e){} paint(); placeFoot(); try{ if(window.hhShellApply) hhShellApply(); }catch(e){} return r; }; w._gv=1; window.hh_updateBottomNav=w; try{ hh_updateBottomNav=w; }catch(e){} }
var curScr='';
function darkLabel(){ var d=document.getElementById('dark-toggle'); if(!d) return; var t=d.querySelector('.gv-ult'); if(!t){ t=document.createElement('span'); t.className='gv-ult'; d.appendChild(t); } t.textContent=document.body.classList.contains('dark-mode')?'الوضع النهاري':'الوضع الليلي'; }
function wrapDark(){ var f=window.toggleDarkMode; if(typeof f!=='function'||f._gv) return; var w=function(){ var r=f.apply(this,arguments); darkLabel(); return r; }; w._gv=1; window.toggleDarkMode=w; try{ toggleDarkMode=w; }catch(e){} darkLabel(); }

/* التذييل في آخر الصفحة المعروضة */
var FOOT_SCR=['screen-menu','screen-toolbox','screen-lb','screen-sponsors','screen-influencers','screen-story','screen-reviews','screen-mygames','screen-references','screen-contact','screen-about'];
function placeFoot(){
  var ft=window._gvFoot; if(!ft) return;
  var host=null;
  if(curOv){ host=document.getElementById(curOv==='ib'?'hh-ib':curOv==='prog'?'hh-pg':curOv==='mh'?'hh-mh':'hh-sch-wiz')||(curOv==='school'?document.getElementById('hh-school-hub'):null); }
  else if(FOOT_SCR.indexOf(curScr)>-1){ host=document.getElementById(curScr); }
  if(host){ if(ft.parentNode!==host||host.lastElementChild!==ft) host.appendChild(ft); ft.style.display=''; }
  else ft.style.display='none';
}
window.hhGvPlaceFoot=placeFoot;
// إبقاء التذييل في آخر الطبقات عند إعادة رسمها
var mo=new MutationObserver(function(){ if(window._gvFoot&&window._gvFoot.style.display!=='none'&&window._gvFoot.parentNode&&window._gvFoot.parentNode.lastElementChild!==window._gvFoot) placeFoot(); });

/* انكماش الشريط عند التمرير */
var miniOn=false;
function onScroll(e){ if(window.innerWidth<901){ if(miniOn){ miniOn=false; document.documentElement.classList.remove('gv-mini'); } return; }
  var t=e&&e.target, y=0;
  if(!t||t===document||t===document.documentElement||t===document.body) y=window.scrollY||document.documentElement.scrollTop||0;
  else { if(!t.closest||!(t.closest('.screen.active')||t.closest('#hh-ib,#hh-pg,#hh-sch-wiz,#hh-school-hub,#hh-mh'))) return; y=t.scrollTop||0; }
  if(!miniOn&&y>120){ miniOn=true; document.documentElement.classList.add('gv-mini'); }
  else if(miniOn&&y<12){ miniOn=false; document.documentElement.classList.remove('gv-mini'); } }
document.addEventListener('scroll',onScroll,true);
window.hhGvMiniReset=function(){ miniOn=false; document.documentElement.classList.remove('gv-mini'); };
function boot(){
  if(!build()) return false;
  wrapMark(); wrapNav(); wrapDark();
  try{ var a=document.querySelector('.screen.active'); if(a){ curScr=a.id; cur=SCR2K[a.id]||cur; } }catch(e){}
  paint(); placeFoot();
  try{ mo.observe(document.body,{childList:true,subtree:true}); }catch(e){}
  // الشعار يُحمَّل لاحقاً
  var t=0, iv=setInterval(function(){ var g=document.getElementById('gv-lgi'); if(g&&window._HH_LOGO_MAROON&&!g.querySelector('img')){ g.innerHTML=logo(); } if(++t>10) clearInterval(iv); },700);
  try{ if(window.hhSetupV2Sync) setTimeout(hhSetupV2Sync,300); }catch(e){}
  return true;
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
setTimeout(function(){ if(!document.getElementById('gv-hd')) boot(); wrapMark(); wrapNav(); },1200);
})();

/* ── الأنماط ── */
(function(){
var P='html.gv-on body #main-nav #gv-hd ';
var css=[
':root.gv-on{--hh-bar:142px;--hh-bar-b:0px;}',
'html.gv-on body #hh-bottom-nav,html.gv-on body #hh-more-sheet,html.gv-on body #hh-more-dim{display:none !important;}',
'html.gv-on body #main-nav{height:var(--hh-bar) !important;min-height:var(--hh-bar) !important;padding:0 !important;background:#fff !important;border-bottom:0 !important;box-shadow:0 6px 18px rgba(61,9,24,.10) !important;}',
'html.gv-on body #main-nav::before,html.gv-on body #main-nav::after{display:none !important;}',
'html.gv-on body #main-nav > .main-nav-inner,html.gv-on body #main-nav > #mobile-menu,html.gv-on body #mobile-menu{display:none !important;}',
'#gv-hd{direction:rtl;font-family:Cairo,Tajawal,sans-serif;height:100%;display:flex;flex-direction:column;}',
'#gv-hd button{font-family:Cairo,sans-serif;cursor:pointer;}',
'#gv-hd .gv-in{max-width:1280px;margin:0 auto;padding:0 28px;height:100%;display:flex;align-items:center;gap:16px;}',
'#gv-hd .gv-sp{flex:1;}',
/* شريط الخدمات */
'#gv-hd .gv-ut{height:32px;background:#3D0918;color:#E6CE8E;flex-shrink:0;}',
'#gv-hd .gv-ut-t{font-size:12.5px;font-weight:700;color:#E6CE8E;white-space:nowrap;}',
'#gv-hd .gv-ut-l{display:flex;align-items:center;gap:4px;height:100%;}',
P+'.gv-ul{all:unset;box-sizing:border-box;display:inline-flex !important;align-items:center;gap:6px;height:100%;padding:0 10px !important;color:#F5E6C4 !important;font-family:Cairo,sans-serif !important;font-weight:700 !important;font-size:12.5px !important;cursor:pointer;position:relative;white-space:nowrap;width:auto !important;min-width:0 !important;border:0 !important;background:none !important;border-radius:0 !important;box-shadow:none !important;}',
P+'.gv-ul:hover{color:#fff !important;text-decoration:underline;text-underline-offset:4px;}',
P+'.gv-ul > svg{display:none !important;}',
P+'.gv-ul + .gv-ul::before{content:"";position:absolute;right:0;top:9px;bottom:9px;width:1px;background:rgba(230,206,142,.3);}',
P+'#hh-notif-badge{position:static !important;margin-inline-start:2px;border:0 !important;}',
P+'#nav-wn-badge{position:static !important;}',
/* صف الشعار */
'#gv-hd .gv-lr{height:62px;background:#fff;border-bottom:1px solid #EADFC8;flex-shrink:0;}',
'#gv-hd .gv-lg{all:unset;display:flex;align-items:center;gap:10px;cursor:pointer;}',
'#gv-hd .gv-lgi{width:44px;height:44px;display:grid;place-items:center;} #gv-hd .gv-lgi img{max-width:100%;max-height:100%;object-fit:contain;} #gv-hd .gv-lm{width:44px;height:44px;border-radius:10px;background:#5E0E26;color:#E6CE8E;display:grid;place-items:center;font-weight:900;font-size:22px;}',
'#gv-hd .gv-lgt b{display:block;font-size:22px;font-weight:900;color:#5E0E26;line-height:1.15;} #gv-hd .gv-lgt small{font-size:11.5px;font-weight:700;color:#8A6D2E;}',
'#gv-hd .gv-vl{width:1px;height:36px;background:#E7DAC0;} #gv-hd .gv-org{font-family:\"Reem Kufi\",Cairo,sans-serif;font-size:21px;font-weight:700;color:#8A1538;line-height:1.3;white-space:nowrap;}',
'#gv-hd .gv-srch{display:flex;}',
P+'.nav-search-container{display:block !important;width:300px !important;max-width:300px !important;flex:0 0 300px !important;position:relative;}',
P+'.nav-search-wrap{height:40px !important;border-radius:8px !important;background:#fff !important;border:1.5px solid #E7DAC0 !important;box-shadow:none !important;}',
P+'.nav-search-input{color:#3D0918 !important;font-family:Cairo,sans-serif !important;font-size:13.5px !important;font-weight:600 !important;} '+P+'.nav-search-input::placeholder{color:#A89A82 !important;}',
P+'.nav-search-icon{color:#8A6D2E !important;}',
'#gv-hd .gv-acc{display:flex;align-items:center;gap:8px;}',
P+'.nav-login-btn{height:40px !important;min-height:40px !important;border-radius:8px !important;background:#5E0E26 !important;color:#fff !important;border:0 !important;padding:0 18px !important;font-family:Cairo,sans-serif !important;font-weight:800 !important;font-size:14px !important;box-shadow:none !important;}',
P+'.nav-login-btn svg{display:none !important;}',
P+'.profile-btn{height:40px !important;border-radius:8px !important;background:#fff !important;border:1.5px solid #5E0E26 !important;color:#5E0E26 !important;padding:0 6px 0 14px !important;display:inline-flex !important;align-items:center !important;gap:8px !important;box-shadow:none !important;}',
P+'.profile-btn #ub-name{color:#5E0E26 !important;font-family:Cairo,sans-serif !important;font-weight:800 !important;font-size:14px !important;-webkit-text-fill-color:#5E0E26 !important;}',
P+'.profile-avatar{width:28px !important;height:28px !important;border-radius:6px !important;background:#5E0E26 !important;color:#fff !important;font-size:13px !important;}',
/* شريط الأقسام */
'#gv-hd .gv-nv{height:47px;background:#5E0E26;border-bottom:1px solid rgba(255,255,255,.85);flex-shrink:0;}',
'#gv-hd .gv-nv .gv-in{gap:0;align-items:stretch;}',
'#gv-hd .gv-a{background:none;border:0;color:#F5E6C4;font-weight:800;font-size:15px;padding:0 18px;height:100%;display:flex;align-items:center;gap:8px;position:relative;white-space:nowrap;}',
'#gv-hd .gv-a:hover{background:rgba(0,0,0,.14);color:#fff;}',
'#gv-hd .gv-a.on{background:#4A0B1E;color:#fff;} #gv-hd .gv-a.on::after{content:"";position:absolute;right:0;left:0;bottom:-1px;height:3px;background:#fff;}',
'#gv-hd .gv-a.dd::before{content:"";width:6px;height:6px;border-left:2px solid #E6CE8E;border-bottom:2px solid #E6CE8E;transform:rotate(-45deg);margin-top:-4px;order:2;}',
'#gv-hd .gv-dd{position:relative;display:flex;}',
'#gv-hd .gv-mn{display:none;position:absolute;top:calc(100% + 3px);right:0;min-width:520px;background:#fff;border:1px solid #E7DAC0;border-top:3px solid #B8924A;box-shadow:0 18px 40px rgba(61,9,24,.16);padding:14px;grid-template-columns:1fr 1fr;gap:2px 14px;z-index:20;}',
'#gv-hd .gv-dd.op .gv-mn{display:grid;} #gv-hd .gv-dd.op .gv-a{background:#4A0B1E;}',
'#gv-hd .gv-mn h5{grid-column:1 / -1;margin:0 0 6px;font-size:12.5px;color:#8A6D2E;font-weight:800;}',
'#gv-hd .gv-mn button{all:unset;cursor:pointer;display:block;padding:9px 10px;border-radius:6px;text-align:right;} #gv-hd .gv-mn button:hover{background:#F5F1E8;}',
'#gv-hd .gv-mn b{display:block;color:#3D0918;font-family:Cairo,sans-serif;font-weight:800;font-size:14.5px;} #gv-hd .gv-mn small{display:block;color:#8A7A63;font-family:Cairo,sans-serif;font-weight:600;font-size:12px;}',
'#gv-hd .gv-dd[data-g="sup"] .gv-mn{min-width:600px;grid-template-columns:1fr 1fr 1fr;}',
'#gv-hd .gv-play{margin-inline-start:auto;align-self:center;height:36px;border-radius:8px;border:0;background:linear-gradient(135deg,#C9A24E,#8A6D2E);color:#fff;font-weight:900;font-size:14.5px;padding:0 22px;box-shadow:0 0 0 2px rgba(230,206,142,.35);white-space:nowrap;}',
'#gv-hd .gv-play:hover{filter:brightness(1.08);}',
'#gv-hd .gv-m{display:none;}',
'@media (max-width:1240px){ #gv-hd .gv-a{padding:0 12px;font-size:14px;} #gv-hd .gv-org,#gv-hd .gv-vl{display:none;} '+P+'.nav-search-container{width:220px !important;max-width:220px !important;flex-basis:220px !important;} }',
'@media (max-width:1040px){ #gv-hd .gv-ut-t{display:none;} #gv-hd .gv-a{padding:0 9px;font-size:13.5px;} }',
/* الجوال */
'@media (max-width:900px){',
' :root.gv-on{--hh-bar:102px;}',
' #gv-hd .gv-ut{display:none;} #gv-hd .gv-in{padding:0 12px;gap:8px;}',
' #gv-hd .gv-lr{height:58px;border-bottom:0;} #gv-hd .gv-lgi{width:38px;height:38px;} #gv-hd .gv-lgt b{font-size:18px;} #gv-hd .gv-lgt small{font-size:10px;}',
' #gv-hd .gv-srch,#gv-hd .gv-acc,#gv-hd .gv-d,#gv-hd .gv-dd{display:none !important;}',
' #gv-hd .gv-m{display:inline-flex;align-items:center;height:36px;margin:0;}',
' #gv-hd .gv-mbtn{border:0;border-radius:8px;background:#5E0E26;color:#fff;font-weight:800;font-size:14px;padding:0 14px;}',
' #gv-hd .gv-play.gv-m{padding:0 14px;font-size:13.5px;}',
' #gv-hd .gv-nv{height:44px;} #gv-hd .gv-nv .gv-in{padding:0;overflow-x:auto;scrollbar-width:none;} #gv-hd .gv-nv .gv-in::-webkit-scrollbar{display:none;}',
' #gv-hd .gv-a{font-size:14px;padding:0 14px;flex-shrink:0;}',
'}',
/* ورقة الجوال */
'#gv-sheet{position:fixed;top:var(--hh-bar);right:0;left:0;bottom:0;background:#fff;z-index:100040;overflow-y:auto;display:none;direction:rtl;font-family:Cairo,sans-serif;}',
'#gv-dim{display:none;}',
'html.gv-sheet-on #gv-sheet{display:block;}',
'#gv-sheet button{all:unset;box-sizing:border-box;width:100%;cursor:pointer;display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-bottom:1px solid #EFE6D4;font-family:Cairo,sans-serif;font-weight:800;font-size:15.5px;color:#3D0918;}',
'#gv-sheet button.on{border-right:4px solid #B8924A;background:#FBF6EC;} #gv-sheet button i{font-style:normal;color:#B8924A;font-weight:900;}',
'#gv-sheet h6{margin:0;padding:12px 18px 6px;font-size:12.5px;color:#8A6D2E;font-weight:800;background:#F5F1E8;}',
/* التذييل */
'#gv-ft{background:#3D0918;color:#F5E6C4;padding:34px 0 0;margin-top:40px;direction:rtl;font-family:Cairo,sans-serif;width:100%;flex-shrink:0;align-self:stretch;}',
'#gv-ft .gv-ft-g{max-width:1224px;margin:0 auto;padding:0 28px 24px;display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:28px;border-bottom:1px solid rgba(230,206,142,.2);}',
'#gv-ft h4{margin:0 0 12px;color:#E6CE8E;font-size:15px;font-weight:900;padding-bottom:8px;border-bottom:2px solid #B8924A;display:inline-block;}',
'#gv-ft p{margin:0;font-size:13.5px;line-height:1.9;color:#E9DCC3;font-weight:600;}',
'#gv-ft button{all:unset;display:block;cursor:pointer;color:#F5E6C4;font-family:Cairo,sans-serif;font-weight:600;font-size:14px;padding:4px 0;} #gv-ft button:hover{color:#fff;text-decoration:underline;text-underline-offset:4px;}',
'#gv-ft .gv-ft-b{max-width:1224px;margin:0 auto;padding:14px 28px;display:flex;justify-content:space-between;font-size:12.5px;color:#C9B796;font-weight:600;gap:10px;flex-wrap:wrap;}',
'@media (max-width:900px){ #gv-ft .gv-ft-g{grid-template-columns:1fr 1fr;gap:20px;padding:0 18px 20px;} #gv-ft .gv-ft-g > div:first-child{grid-column:1 / -1;} #gv-ft .gv-ft-b{padding:14px 18px;} }',
'body.hh-immersive #gv-sheet{display:none !important;}',
'@media (min-width:901px){ :root.gv-on.gv-mini{--hh-bar:48px;} html.gv-mini #gv-hd .gv-ut,html.gv-mini #gv-hd .gv-lr{display:none !important;} html.gv-mini #gv-hd .gv-nv .gv-in::before{content:"المُلهم";color:#fff;font-family:Cairo,sans-serif;font-weight:900;font-size:19px;display:flex;align-items:center;padding-left:20px;margin-left:6px;border-left:1px solid rgba(255,255,255,.25);cursor:pointer;} }',
'html.gv-on body #screen-menu.active,html.gv-on body #screen-about.active{padding-top:calc(var(--hh-bar) - 60px) !important;} html.gv-on body #screen-reviews.active{padding-top:calc(var(--hh-bar) - 36px) !important;}',
'@media (max-width:900px){  html.gv-on body #screen-mygames.active,html.gv-on body #screen-references.active,html.gv-on body #screen-contact.active{padding-top:calc(var(--hh-bar) - 74px) !important;} }',
'html.gv-on body .screen.active > .top-bar{display:none !important;}',
'html.gv-on body.hh-has-bottom-nav .screen.active{padding-bottom:0 !important;}',
'html.gv-on body.dark-mode #main-nav,body.dark-mode #gv-hd .gv-lr{background:#1E0D14 !important;border-color:#3A2A20 !important;} body.dark-mode #gv-hd .gv-lgt b{color:#F5E6C4;} body.dark-mode #gv-hd .gv-org{color:#E6CE8E;} body.dark-mode #gv-sheet{background:#1E0D14;} body.dark-mode #gv-sheet button{color:#F5E6C4;border-color:#3A2A20;} body.dark-mode #gv-sheet h6{background:#2A1219;}'
].join('\n');
function add(){ if(document.getElementById('gv-style')) return; var s=document.createElement('style'); s.id='gv-style'; s.textContent=css; document.head.appendChild(s); }
add();
})();

/* ═══ القالب الموحّد للصفحات الفرعية (zzzzzzce) ═══ */
(function(){
'use strict';
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
var IC={
  tool:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4l6 6-11 11H3v-6L14 4z"/><path d="M13 5l6 6"/></svg>',
  lb:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18l-1.5-10-4.5 4-3-6-3 6-4.5-4z"/></svg>',
  star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 3 2.6 5.6 6.1.6-4.6 4.1 1.3 6L12 16.4 6.6 19.3l1.3-6L3.3 9.2l6.1-.6z"/></svg>',
  hand:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/></svg>',
  school:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V9l7-5 7 5v12"/><path d="M10 21v-5h4v5"/></svg>',
  award:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="5"/><path d="M9 13.5 7.5 21l4.5-2.5 4.5 2.5L15 13.5"/></svg>'
};
/* كل صفحة: الحاوية، العنوان، الوصف، المسار، الأيقونة، العناصر التي تُخفى، والتبويبات والأزرار */
var PAGES=[
  {id:'screen-toolbox',scr:1,ic:'tool',bc:'المحبرة',t:'أدوات المعلم',s:'أدوات احترافية تختصر وقتك، وتكبّر أثرك',hide:['.tbx-hero'],meta:'.tb2-chips'},
  {id:'screen-lb',scr:1,ic:'lb',bc:'المتصدرون',t:'المتصدرون',s:'ترتيب المشاركين في مسابقات المنصة، يتحدّث بعد كل لعبة',tabs:'[id^="lb-tab-"]',hideTabs:1},
  {id:'screen-sponsors',scr:1,ic:'hand',bc:'الداعمون › الرعاة والشركاء',t:'الرعاة والشركاء',s:'الجهات الراعية للمنصة وبرامجها، والجهات المتعاونة معنا'},
  {id:'screen-influencers',scr:1,ic:'star',bc:'الداعمون › الشخصيات المؤثرة',t:'الشخصيات المؤثرة',s:'الملهمون، الأيادي البيضاء التي أضاءت طريقنا',hideFirst:1},
  {id:'screen-story',scr:1,ic:'book',bc:'عن المنصة › قصتنا',t:'قصتنا',s:'كيف بدأت فكرة المُلهم، ولماذا'},
  {id:'hh-ib',ic:'star',icFrom:'.ib2-hi',bc:'الإبداع',t:'الإبداع',s:'أنشئ لعبتك أو اختر لعبة جاهزة، وشغّلها على أجهزة الطلاب أو اعرضها على شاشة الصف',hide:['.ib2-hero'],act:'.ib2-hx button',actT:'لعبة جديدة',hideWhen:'.e2-tb',tabs:'.ib2-seg > button',hideTabs:1},
  {id:'hh-mh',ic:'tool',bc:'المحبرة',t:'المحبرة',s:'سجّل ما يحدث في الحصة، وتابع كل طالب، واطبع تقاريرك جاهزة',meta:'.mh-cls',tabs:'#mh-tabs > button',hideTabs:1},
  {id:'hh-pg',ic:'award',icFrom:'.p2-hi',bc:'البرامج',t:'البرامج',s:'برامج حضورية للطلاب وأولياء الأمور، بمواعيد معلنة وتسجيل مباشر',hide:['.p2-hero'],meta:'#hh-pg-counts'},
  {id:'hh-sch-wiz',ic:'school',icFrom:'.sp2-hi',bc:'المدرسة',t:'المدرسة',s:'اختر مسارك مرة واحدة، ونحفظه لك في كل زيارة',hide:['.sp2-hero']},
  {id:'hh-school-hub',ic:'school',bc:'المدرسة',t:'المدرسة',s:'مسارك الدراسي وبوابات الإتقان',hide:['.sh2-hero','.sp2-hero']}
];
function hid(e){ if(!e) return; e.classList.add('gv-hid'); if(e.style.getPropertyValue('display')!=='none') e.style.setProperty('display','none','important'); }
function isOn(b){ return b.classList.contains('on')||b.classList.contains('active')||b.getAttribute('aria-selected')==='true'||/255, 255, 255|#fff\b/i.test(b.style.color||''); }
function cleanTxt(b){ var c=b.cloneNode(true); c.querySelectorAll('svg,em,small,i').forEach(function(x){ x.remove(); }); return c.textContent.replace(/\s+/g,' ').trim(); }
function apply1(P){
  var host=document.getElementById(P.id); if(!host) return;
  if(P.scr&&!host.classList.contains('active')) return;
  host.classList.add('gvs');
  if(P.scr){ host.style.setProperty('padding-top','var(--hh-bar)','important'); host.style.setProperty('padding-left','0','important'); host.style.setProperty('padding-right','0','important'); host.style.setProperty('justify-content','flex-start','important'); }
  (P.hide||[]).forEach(function(sel){ host.querySelectorAll(sel).forEach(hid); });
  if(P.hideFirst){ var w=host.querySelector(':scope > .gvs-c'); if(w&&w.firstElementChild) hid(w.firstElementChild); }
  var band=host.querySelector(':scope > .gvh');
  if(!band){
    band=document.createElement('div'); band.className='gvh';
    var ic=IC[P.ic]||IC.star;
    if(P.icFrom){ var src=host.querySelector(P.icFrom); if(src&&src.querySelector('svg')) ic=src.querySelector('svg').outerHTML; }
    band.innerHTML='<div class="gvh-in"><span class="gvh-md">'+ic+'</span><div class="gvh-tx"><div class="gvh-bc"><button type="button" onclick="hhGvGo(\'home\')">الرئيسية</button> › '+esc(P.bc)+'</div><h1>'+esc(P.t)+'</h1></div><div class="gvh-meta"></div></div><div class="gvh-tabs"></div>';
    var tb2=host.querySelector(':scope > .top-bar');
    if(tb2&&tb2.nextSibling) host.insertBefore(band,tb2.nextSibling); else host.insertBefore(band,host.firstChild);
    var nx=band.nextElementSibling; if(nx) nx.classList.add('gvs-c');
  }
  if(P.scr){ ['width:100vw','max-width:none','margin-left:calc(50% - 50vw)','margin-right:calc(50% - 50vw)','align-self:center'].forEach(function(d){ var p=d.split(':'); band.style.setProperty(p[0],p.slice(1).join(':'),'important'); }); }
  if(P.hideWhen){ var hw=!!host.querySelector(P.hideWhen); band.style.display=hw?'none':''; }
  // البيانات الجانبية والزر الرئيسي
  var meta=band.querySelector('.gvh-meta');
  if(P.meta){ var m=host.querySelector(P.meta); if(m&&m.parentNode!==meta){ meta.insertBefore(m,meta.firstChild); } }
  if(P.act){ var a=host.querySelector(P.act); var pb=meta.querySelector('.gvh-act');
    if(a&&!pb){ pb=document.createElement('button'); pb.type='button'; pb.className='gvh-act'; meta.appendChild(pb); }
    if(a&&pb){ pb.textContent=P.actT||cleanTxt(a)||'ابدأ'; pb.onclick=function(){ a.click(); }; } }
  // التبويبات المتصلة بالرأس
  var tw=band.querySelector('.gvh-tabs');
  if(P.tabs){ var src2=[].slice.call(host.querySelectorAll(P.tabs)).filter(function(b){ return !band.contains(b); });
    if(src2.length){ var sig=src2.map(function(b){ return cleanTxt(b)+'|'+(b.querySelector('em')?b.querySelector('em').textContent:'')+'|'+(isOn(b)?1:0); }).join(';');
      if(tw.dataset.sig!==sig){ tw.dataset.sig=sig; tw.innerHTML=''; src2.forEach(function(b,i){ var on=isOn(b); var em=b.querySelector('em'); var t=document.createElement('button'); t.type='button'; t.className=on?'on':''; t.innerHTML=esc(cleanTxt(b))+(em&&em.textContent.trim()?' <em>'+esc(em.textContent.trim())+'</em>':''); t.onclick=function(){ b.click(); setTimeout(applyAll,60); }; tw.appendChild(t); }); }
      if(P.hideTabs){ var par=src2[0].parentNode; if(par&&!par.classList.contains('gvh-tabs')) hid(par); }
      band.classList.add('has-tabs'); }
    else { tw.innerHTML=''; tw.dataset.sig=''; band.classList.remove('has-tabs'); } }
}
var busy=false;
function applyAll(){ if(busy) return; busy=true; try{ PAGES.forEach(function(P){ try{ apply1(P); }catch(e){ console.warn('shell',P.id,e); } }); fillEmpty(); }finally{ busy=false; } }
/* صفحات تُبنى محتواها عند الفتح: نضمن بناءها مهما كان طريق الوصول إليها */
function fillEmpty(){ var sc=document.getElementById('screen-sponsors'), sp=document.getElementById('sp-page'); if(sc&&sp&&sc.classList.contains('active')&&!sp.children.length&&typeof window.renderSponsorsPage==='function'){ try{ window.renderSponsorsPage(); }catch(e){ console.warn('sponsors',e); } } }
window.hhShellApply=applyAll;
var mo=new MutationObserver(function(){ if(!busy){ clearTimeout(mo._t); mo._t=setTimeout(applyAll,40); } });
function boot(){ applyAll(); try{ mo.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class']}); }catch(e){} }
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
var css=[
'html.gv-on body::before,html.gv-on body::after{display:none !important;}',
'.gv-hid{display:none !important;}',
'.gvh{background:#5E0E26;color:#fff;border-bottom:1px solid rgba(255,255,255,.85);position:relative;overflow:hidden;direction:rtl;font-family:Cairo,sans-serif;width:100%;align-self:stretch;flex-shrink:0;box-sizing:border-box;}',
'.gvh-in{max-width:1200px;margin:0 auto;padding:16px 24px 14px;display:flex;align-items:center;gap:18px;position:relative;z-index:1;box-sizing:content-box;}',
'.gvh.has-tabs .gvh-in{padding-bottom:10px;}',
'.gvh-md{width:48px;height:48px;border-radius:12px;background:#fff;color:#5E0E26;display:grid;place-items:center;flex-shrink:0;}',
'.gvh-md svg{width:24px;height:24px;color:#5E0E26;fill:currentColor;} .gvh-md svg[fill="none"]{fill:none;}',
'.gvh-tx{min-width:0;}',
'.gvh-bc{font-size:12.5px;font-weight:800;color:#E6CE8E;} .gvh-bc button{all:unset;cursor:pointer;color:#E6CE8E;font-weight:800;} .gvh-bc button:hover{text-decoration:underline;}',
'.gvh h1{margin:2px 0 0 !important;font-size:clamp(20px,1.9vw,24px) !important;font-weight:900 !important;line-height:1.3 !important;color:#fff !important;font-family:Cairo,sans-serif !important;}',
'.gvh p{margin:0 !important;font-size:13px !important;font-weight:700 !important;color:#F5E6C4 !important;opacity:.92;line-height:1.7 !important;}',
'.gvh-meta{margin-inline-start:auto;display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:flex-end;}',
'.gvh-act{height:44px;border-radius:12px;border:0;background:#fff;color:#5E0E26;font-family:Cairo,sans-serif;font-weight:900;font-size:14.5px;padding:0 18px;cursor:pointer;white-space:nowrap;}',
'.gvh-act:hover{background:#F5E6C4;}',
'.gvh-meta .tb2-chips span,.gvh-meta .tb2-chips > *{background:rgba(255,255,255,.1) !important;border:1px solid rgba(230,206,142,.4) !important;color:#fff !important;}',
'.gvh-meta .p2-hx{background:transparent !important;} .gvh-meta .p2-hx *{color:#fff !important;}',
'.gvh-tabs{max-width:1200px;margin:0 auto;padding:0 24px;display:flex;gap:4px;position:relative;z-index:1;box-sizing:content-box;}',
'.gvh-tabs:empty{display:none;}',
'.gvh-tabs button{all:unset;cursor:pointer;padding:8px 16px 10px;font-family:Cairo,sans-serif;font-weight:800;font-size:14.5px;color:#E6CE8E;border-radius:12px 12px 0 0;display:inline-flex;align-items:center;gap:8px;white-space:nowrap;}',
'.gvh-tabs button:hover{color:#fff;background:rgba(255,255,255,.06);}',
'.gvh-tabs button em{font-style:normal;font-size:11.5px;background:rgba(255,255,255,.14);border-radius:99px;padding:0 8px;}',
'.gvh-tabs button.on{background:#F5F4F2;color:#5E0E26;} .gvh-tabs button.on em{background:#FBF1DA;color:#8A5A10;}',
/* الشاشات: الرأس مباشرة تحت الشريط */
'html.gv-on body .screen.gvs.active{padding-top:var(--hh-bar) !important;padding-left:0 !important;padding-right:0 !important;}',
'.screen.gvs > .gvh{margin:0 calc(50% - 50vw) 4px;width:100vw;max-width:100vw;}',
'.gvs-c{margin-top:22px !important;}',
'#hh-mh.gvs > .gvh,#hh-ib.gvs > .gvh,#hh-pg.gvs > .gvh,#hh-sch-wiz.gvs > .gvh,#hh-school-hub.gvs > .gvh{margin:0;}',
'#hh-pg.gvs .pg-wrap,#hh-sch-wiz.gvs .sp2-wrap{padding-top:22px !important;}',
'#hh-ib.gvs #ib-body{padding-top:18px !important;}',
'#hh-mh.gvs .mh-top{display:none;}',
'@media (max-width:900px){ #hh-mh .gvh-meta{display:flex !important;margin:0;} #hh-mh .gvh-in{flex-wrap:wrap;} }',
/* عرض واحد للمحتوى */
'#hh-ib.gvs #ib-body.wrap,#hh-pg.gvs .pg-wrap,#hh-sch-wiz.gvs .sp2-wrap,#hh-school-hub.gvs .sh2-wrap{max-width:1248px !important;margin-left:auto !important;margin-right:auto !important;}',
'#screen-toolbox.gvs .gvs-c{max-width:1200px !important;width:100% !important;}',
'@media (max-width:900px){ .gvh-in{padding:16px 16px 18px;gap:12px;} .gvh-md{width:46px;height:46px;border-radius:13px;} .gvh-md svg{width:22px;height:22px;} .gvh p{font-size:12.5px !important;} .gvh-meta{display:none;} .gvh-tabs{padding:0 10px;overflow-x:auto;scrollbar-width:none;} .gvh-tabs button{padding:9px 13px 11px;font-size:13.5px;} }',
'body.dark-mode .gvh-tabs button.on{background:#1A0A10;color:#F5E6C4;}'
].join('\n');
var st=document.createElement('style'); st.id='gv-shell-style'; st.textContent=css; document.head.appendChild(st);
})();
