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
  {k:'learn', t:'تعلّم',    go:function(){ closeOv('learn'); call('hhLearnOpen'); }},
  {k:'school',t:'المدرسة',  go:function(){ closeOv('school'); call('hhSchoolEntry'); }},
  {k:'ib',    t:'الإبداع',    go:function(){ closeOv('ib'); call('hhIbOpen'); }},
  {k:'prog',  t:'المعسكرات التربوية',  go:function(){ closeOv('prog'); call('hhOpenLeaderPrograms'); }}
];
/* المدرسة: قائمة منسدلة تضم ما كان في المحبرة */
function schGo(dest){ closeOv('school'); call('hhSchoolEntry'); if(dest) setTimeout(function(){ try{ if(document.getElementById('hh-school-hub')&&typeof window.hhHubGo==='function') hhHubGo(dest); }catch(e){} },350); }
function mhGo(tab){ if(typeof window.hhMhOpen==='function'){ closeOv('mh'); hhMhOpen(tab); } else { closeOv(); call('hhNavigate','screen-toolbox'); } }
window.hhGvMh=mhGo;
var NAVORD=['home','learn','school','ib','prog','sup','about'];
function lrnGo(tab){ closeOv('learn'); call('hhLearnOpen',tab); }
function ibGo(sec){ closeOv('ib'); if(typeof window.hhIbSection==='function') hhIbSection(sec); else call('hhIbOpen'); }
var RIC={self:'<path d="M12 3 2 8l10 5 10-5-10-5z"/><path d="M6 10v5c3 2 9 2 12 0v-5"/>',book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h7M8 11h5"/>',lead:'<path d="M12 2l2.6 6.2 6.4.5-4.9 4.2 1.5 6.3L12 15.9 6.4 19.2l1.5-6.3L3 8.7l6.4-.5z"/>',pub:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',sch:'<path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-5h6v5"/>'};
function ric(k,s){ return '<svg viewBox="0 0 24 24" width="'+(s||22)+'" height="'+(s||22)+'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(RIC[k]||'')+'</svg>'; }
var RCH='<svg class="gv-rch" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>';
var DD={
  learn:{t:'تعلّم', rows:1, ft:'كل أقسام «تعلّم»', fn:'3 أقسام', items:[
    {k:'self',ic:'self',c:'#1F6F7A',c1:'#E3F1EF',cd:'#8FCFC8',t:'التعلم الذاتي',s:'محطات تمشي بها وحدك، ومسارات تبدأ من سؤالك',go:function(){ lrnGo('self'); }},
    {k:'books',ic:'book',c:'#8A1538',c1:'#F7E6EB',cd:'#E9A0B4',t:'الكتب التربوية',s:'مكتبة المؤلفين، كل كتاب في محطات تفاعلية',go:function(){ lrnGo('books'); }},
    {k:'lead',ic:'lead',c:'#8A6D2E',c1:'#F6EEDC',cd:'#E6CE8E',t:'المواضيع القيادية',s:'برامج موضوعية مركّزة، مثل الاحتراق الوظيفي',go:function(){ lrnGo('lead'); }}
  ]},
  ib:{t:'الإبداع', rows:1, ft:'كل أقسام «الإبداع»', fn:'قسمان', items:[
    {k:'pub',ic:'pub',c:'#1F4E79',c1:'#E4ECF5',cd:'#93B8DE',t:'الأنشطة العامة',s:'مسابقات وألعاب جاهزة للفعاليات والمجالس والأسرة',go:function(){ ibGo('pub'); }},
    {k:'sch',ic:'sch',c:'#3D6B53',c1:'#E6F0EA',cd:'#93C7A8',t:'الأنشطة الإبداعية المدرسية',s:'ألعاب من المنهج للحصة، تصممها أو تختارها جاهزة',go:function(){ ibGo('sch'); }}
  ]},
  school:{t:'المدرسة', items:[
    {k:'sch',t:'الرئيسة',s:'مدخل المدرسة ومسارك الدراسي',go:function(){ schGo(); }},
    {k:'sch',t:'المنهج والاختبارات',s:'الدروس والاختبارات بحسب الصف',go:function(){ schGo('school'); }},
    {k:'sch',t:'دروسي الخاصة',s:'دروس المعلم ومرفقاته',go:function(){ schGo('lessons'); }},
    {k:'mh',t:'الحصة',s:'السلوك والاختيار العشوائي والمؤقت والمجموعات',go:function(){ mhGo('class'); }},
    {k:'sch',t:'صفوفي وطلابي',s:'الصفوف والأسماء في مكان واحد',go:function(){ schGo('classes'); }},
    {k:'mh',t:'الدرجات',s:'رصد درجات الطلاب في الحصة',go:function(){ mhGo('grades'); }},
    {k:'sch',t:'دفتر المتابعة',s:'الحضور والسلوك والمهارات وتقرير جامع',go:function(){ schGo('gradebook'); }},
    {k:'mh',t:'التقارير',s:'المتابعة الشهرية وتقرير ولي الأمر',go:function(){ mhGo('reports'); }},
    {k:'sch',t:'الشهادات',s:'شهادات الطلاب',go:function(){ schGo('certs'); }}
  ]},
  sup:{t:'الداعمون', items:[
    {k:'spons',t:'الرعاة',s:'الجهات الراعية للمنصة وبرامجها',go:function(){ closeOv(); call('hhNavigate','screen-sponsors'); }},
    {k:'spons',t:'الشركاء',s:'الجهات المتعاونة معنا',go:function(){ closeOv(); call('hhNavigate','screen-sponsors'); }},
    {k:'infl',t:'الشخصيات المؤثرة',s:'الملهمون الداعمون للمنصة',go:function(){ closeOv(); call('hhNavigate','screen-influencers'); }}
  ]},
  about:{t:'عن المنصة', items:[
    {k:'story',t:'قصتنا',s:'رسالة المنصة ورؤيتها',go:function(){ closeOv(); call('hhNavigate','screen-story'); }},
    {k:'lb',t:'المتصدرون',s:'ترتيب المشاركين في مسابقات المنصة',go:function(){ closeOv(); call('hhNavigate','screen-lb'); }},
    {k:'rev',t:'آراء المستخدمين',s:'شاركنا رأيك في المنصة',go:function(){ closeOv(); call('hhNavigate','screen-reviews'); }},
    {k:'mg',t:'ألعابي المحفوظة',s:'تشكيلاتك السابقة جاهزة بضغطة',go:function(){ closeOv(); call('hhNavigate','screen-mygames'); }},
    {k:'ref',t:'المراجع',s:'مصادر المحتوى والأسئلة',go:function(){ closeOv(); call('hhNavigate','screen-references'); }},
    {k:'guide',t:'دليل الاستخدام',s:'للمعلم وللطالب',go:function(){ call('hhOpenGuide'); }},
    {k:'contact',t:'التواصل والدعم',s:'راسلنا أو اطلب المساعدة',go:function(){ closeOv(); call('hhNavigate','screen-contact'); }}
  ]}
};
var SCR2K={'screen-menu':'home','screen-toolbox':'school','screen-lb':'about','screen-sponsors':'sup','screen-influencers':'sup','screen-story':'about','screen-reviews':'about','screen-mygames':'about','screen-references':'about','screen-contact':'about','screen-about':'about'};
var OV2K={school:'school',ib:'ib',prog:'prog',mh:'school',learn:'learn'};
var cur='home', curOv=null;

function playNow(){ closeOv(); if(typeof window.hhStartGameNow==='function') hhStartGameNow(); else call('hhNavigate','screen-setup'); }
window.hhGvPlay=playNow;
window.hhGvGo=function(k){ var s=SEC.filter(function(x){ return x.k===k; })[0]; closeMenus(); closeSheet(); if(s){ s.go(); setTimeout(paint,60); } };
window.hhGvDD=function(g,i){ var it=DD[g]&&DD[g].items[i]; closeMenus(); closeSheet(); if(it){ it.go(); setTimeout(paint,60); } };

/* ── البناء ── */
function mnHtml(g){ var D=DD[g];
  if(!D.rows) return '<div class="gv-mn"><h5>'+D.t+'</h5>'+D.items.map(function(it,i){ return '<button type="button" onclick="hhGvDD(\''+g+'\','+i+')"><b>'+it.t+'</b><small>'+it.s+'</small></button>'; }).join('')+'</div>';
  return '<div class="gv-mn gv-mr" role="menu">'+D.items.map(function(it,i){ return '<button type="button" role="menuitem" class="gv-row" style="--k:'+it.c+';--k1:'+it.c1+';--kd:'+it.cd+'" onclick="hhGvDD(\''+g+'\','+i+')"><i>'+ric(it.ic)+'</i><span><b>'+it.t+'</b><small>'+it.s+'</small></span>'+RCH+'</button>'; }).join('')
    +'<button type="button" class="gv-mft" onclick="hhGvGo(\''+g+'\')">'+D.ft+' ‹<span>'+D.fn+'</span></button></div>'; }
function shRows(g){ var D=DD[g]; return '<div class="gv-shs" data-shs="'+g+'">'+D.items.map(function(it,i){ return '<button type="button" class="gv-shr" style="--k:'+it.c+';--kd:'+it.cd+'" onclick="hhGvDD(\''+g+'\','+i+')"><i>'+ric(it.ic,18)+'</i><span><b>'+it.t+'</b><small>'+it.s+'</small></span></button>'; }).join('')+'</div>'; }
window.hhGvShx=function(g){ var w=document.querySelector('#gv-sheet .gv-shs[data-shs="'+g+'"]'), b=document.querySelector('#gv-sheet [data-shx="'+g+'"]'); if(!w) return; var op=!w.classList.contains('op');
  document.querySelectorAll('#gv-sheet .gv-shs.op').forEach(function(x){ x.classList.remove('op'); }); document.querySelectorAll('#gv-sheet [data-shx]').forEach(function(x){ x.classList.remove('op'); x.setAttribute('aria-expanded','false'); });
  if(op){ w.classList.add('op'); if(b){ b.classList.add('op'); b.setAttribute('aria-expanded','true'); } } };
function logo(){ var src=window._HH_LOGO_MAROON||'', iv=window._HH_LOGO_IVORY||''; return src?'<img class="gv-lo-m" src="'+src+'" alt="المُلهم">'+(iv?'<img class="gv-lo-i" src="'+iv+'" alt="">':''):'<span class="gv-lm">م</span>'; }
function build(){
  var nav=document.getElementById('main-nav'); if(!nav||document.getElementById('gv-hd')) return !!nav;
  var hd=document.createElement('div'); hd.id='gv-hd';
  var BELL='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 003.4 0"/></svg>';
  var CHEV='<svg class="gv-chv" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
  hd.innerHTML=
    '<div class="gv-lr"><div class="gv-in"><button type="button" class="gv-lg" onclick="hhGvGo(\'home\')" aria-label="الرئيسية"><span class="gv-lgi" id="gv-lgi">'+logo()+'</span><span class="gv-lgt"><b>المُلهم</b><small>حيث يبدأ الإلهام</small></span></button>'
   +'<span class="gv-vl"></span><span class="gv-org">نُلهم اليوم ... لنصنع الغد</span><span class="gv-sp"></span><span class="gv-srch" id="gv-srch"></span><span class="gv-bl" id="gv-bl"></span>'
   +'<div class="gv-am" id="gv-am"><span class="gv-acc" id="gv-acc"></span><button type="button" class="gv-mt" onclick="hhGvAm(event)" aria-label="المزيد" aria-haspopup="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button><div class="gv-amn" id="gv-amn" role="menu"></div></div>'
   +'<button type="button" class="gv-play gv-m" onclick="hhGvPlay()">العب الآن</button><button type="button" class="gv-mbtn gv-m" id="gv-mbtn" onclick="hhGvSheet()" aria-expanded="false">القائمة</button></div></div>'
   +'<div class="gv-nv"><div class="gv-in" id="gv-nv-in">'
   +NAVORD.map(function(k){ var s=DD[k]?null:SEC.filter(function(x){ return x.k===k; })[0]; if(s) return '<button type="button" class="gv-a" data-k="'+s.k+'" onclick="hhGvGo(\''+s.k+'\')">'+s.t+'</button>'; var g=k; if(!DD[g]) return ''; return '<div class="gv-dd" data-g="'+g+'"><button type="button" class="gv-a dd" data-k="'+g+'" onclick="hhGvMenu(\''+g+'\',event)" aria-haspopup="true" aria-expanded="false">'+DD[g].t+'</button>'+mnHtml(g)+'</div>'; }).join('')
   +'<span class="gv-soc gv-d"><a class="gv-sig" href="https://instagram.com/almulhim_edu" target="_blank" rel="noopener" aria-label="إنستغرام almulhim_edu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a><a class="gv-swa" href="https://chat.whatsapp.com/JiOJLpf7PS49dqzpRloj7j" target="_blank" rel="noopener" aria-label="مجتمع المُلهم"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 01-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1121 11.5z"/></svg><b>مجتمع المُلهم</b></a></span>'
   +'<button type="button" class="gv-play gv-d" onclick="hhGvPlay()"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 001.5.9l10-6.5a1 1 0 000-1.7l-10-6.5A1 1 0 008 5.5z"/></svg>العب الآن</button></div></div>';
  nav.appendChild(hd);
  nav.classList.add('gv-on'); document.documentElement.classList.add('gv-on');
  // نقل العناصر الحية من الشريط القديم مع الحفاظ على وظائفها
  var sc=nav.querySelector('.nav-search-container'); if(sc) document.getElementById('gv-srch').appendChild(sc);
  var acc=document.getElementById('gv-acc');
  ['nav-login-btn','nav-profile-btn'].forEach(function(id){ var e=document.getElementById(id); if(e) acc.appendChild(e); });
  var pbn=document.getElementById('nav-profile-btn'); if(pbn&&!pbn.querySelector('.gv-chv')) pbn.insertAdjacentHTML('beforeend',CHEV);
  // الضغط على الحساب يفتح قائمة الحساب
  acc.addEventListener('click',function(e){ var p=e.target.closest&&e.target.closest('#nav-profile-btn'); if(!p) return; e.preventDefault(); e.stopPropagation(); window.hhGvAm(e); },true);
  var bl=document.getElementById('gv-bl'), nb=document.getElementById('nav-notif-btn');
  if(nb){ nb.classList.add('gv-ib'); var ov=nb.querySelector('svg'); if(ov) ov.outerHTML=BELL; nb.setAttribute('aria-label','الإشعارات'); bl.appendChild(nb); }
  // روابط الشريط العلوي القديم تبقى حية في حاوية مخفية، وتُستدعى من قائمة الحساب
  var hold=document.createElement('div'); hold.id='gv-hold'; hold.hidden=true;
  ['nav-tm-btn','nav-wn-btn','nav-tour-btn','dark-toggle'].forEach(function(id){ var e=document.getElementById(id); if(e) hold.appendChild(e); });
  hd.appendChild(hold);
  // ورقة الجوال
  var sh=document.createElement('div'); sh.id='gv-sheet'; sh.setAttribute('role','dialog'); sh.setAttribute('aria-label','القائمة');
  sh.innerHTML='<div class="gv-sh-in">'+NAVORD.filter(function(k){ return SEC.some(function(x){ return x.k===k; }); }).map(function(k){ return SEC.filter(function(x){ return x.k===k; })[0]; }).map(function(s){ if(DD[s.k]&&DD[s.k].rows) return '<button type="button" class="gv-shx" data-k="'+s.k+'" data-shx="'+s.k+'" aria-expanded="false" onclick="hhGvShx(\''+s.k+'\')">'+s.t+'<i class="gv-shc"></i></button>'+shRows(s.k); return '<button type="button" data-k="'+s.k+'" onclick="hhGvGo(\''+s.k+'\')">'+s.t+'<i>›</i></button>'; }).join('')
    +Object.keys(DD).filter(function(g){ return !DD[g].rows; }).map(function(g){ return '<h6>'+DD[g].t+'</h6>'+DD[g].items.map(function(it,i){ return '<button type="button" onclick="hhGvDD(\''+g+'\','+i+')">'+it.t+'<i>›</i></button>'; }).join(''); }).join('')
    +'<h6>الحساب</h6><button type="button" onclick="hhGvAcc()">حسابي<i>›</i></button><button type="button" onclick="hhGvSheet(false);hhToggleNotifPanel()">الإشعارات<i>›</i></button><button type="button" onclick="hhGvSheet(false);openTeacherMessage()">رسالة للمعلم<i>›</i></button><button type="button" onclick="hhGvSheet(false);openWhatsNew()">جديدنا<i>›</i></button><button type="button" onclick="hhGvSheet(false);toggleDarkMode()">الوضع الليلي<i>›</i></button></div>';
  document.body.appendChild(sh);
  var dim=document.createElement('div'); dim.id='gv-dim'; dim.onclick=function(){ closeSheet(); }; document.body.appendChild(dim);
  // التذييل
  var ft=document.createElement('footer'); ft.id='gv-ft';
  var IG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>';
  var WA='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 01-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1121 11.5z"/></svg>';
  ft.innerHTML='<div class="gv-ft-t"><div class="gv-ft-in">'
    +'<button type="button" class="gv-ft-br" onclick="hhGvGo(\'home\')" aria-label="الرئيسية"><span class="gv-ft-lg" id="gv-ft-lg"></span><span class="gv-ft-tg">نُلهم اليوم ... لنصنع الغد</span></button>'
    +'<nav class="gv-ft-lk" aria-label="روابط التذييل"><button type="button" onclick="hhGvDD(\'about\',0)">قصتنا</button><button type="button" onclick="hhGvDD(\'sup\',0)">الرعاة والشركاء</button><button type="button" onclick="hhGvDD(\'about\',5)">التواصل والدعم</button><button type="button" onclick="hhGvDD(\'about\',1)">شاركنا رأيك</button><button type="button" onclick="call2(\'screen-terms\')">شروط الاستخدام</button></nav>'
    +'<div class="gv-ft-ac"><a class="gv-ft-ig" href="https://instagram.com/almulhim_edu" target="_blank" rel="noopener" aria-label="إنستغرام almulhim_edu">'+IG+'</a>'
    +'<a class="gv-ft-wa" href="https://chat.whatsapp.com/JiOJLpf7PS49dqzpRloj7j" target="_blank" rel="noopener">'+WA+'مجتمع المُلهم</a>'
    +'<button type="button" class="gv-ft-p" onclick="hhGvPlay()"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 001.5.9l10-6.5a1 1 0 000-1.7l-10-6.5A1 1 0 008 5.5z"/></svg>العب الآن</button></div>'
    +'</div></div><div class="gv-ft-b"><div class="gv-ft-in"><span>© '+new Date().getFullYear()+' المُلهم</span><button type="button" class="gv-ft-pv" onclick="call2(\'screen-privacy\')">سياسة الخصوصية</button><span class="gv-sp"></span><span class="gv-ft-qa"><i></i>صُنع في قطر</span></div></div>';
  function ftLogo(){ var g=ft.querySelector('#gv-ft-lg'); if(g&&!g.firstChild&&window._HH_LOGO_IVORY){ g.innerHTML='<img src="'+window._HH_LOGO_IVORY+'" alt="المُلهم">'; } }
  ftLogo(); var ti=0, tv=setInterval(function(){ ftLogo(); if(++ti>12) clearInterval(tv); },700);
  window.call2=function(id){ closeOv(); try{ showScreen(id); }catch(e){} };
  window._gvFoot=ft;
  return true;
}
var AM=[
  {t:'حسابي',a:1,go:function(){ call('toggleProfile'); }},
  {t:'التواصل والدعم',go:function(){ closeOv(); call('hhNavigate','screen-contact'); }},
  {t:'رسالة للمعلم',go:function(){ call('openTeacherMessage'); }},
  {t:'جديدنا',dot:'nav-wn-badge',go:function(){ call('openWhatsNew'); }},
  {t:'دليل الاستخدام',go:function(){ call('hhOpenGuide'); }}
];
function amClose(){ var m=document.getElementById('gv-am'); if(m) m.classList.remove('op'); }
window.hhGvAm=function(e){ if(e&&e.stopPropagation) e.stopPropagation(); var w=document.getElementById('gv-am'), mn=document.getElementById('gv-amn'); if(!w||!mn) return; if(w.classList.contains('op')){ amClose(); return; }
  var authed=document.body.classList.contains('hh-authed'), dk=document.body.classList.contains('dark-mode');
  mn.innerHTML=AM.filter(function(x){ return !x.a||authed; }).map(function(x){ var i=AM.indexOf(x); var b=x.dot&&document.getElementById(x.dot); var on=b&&b.style.display&&b.style.display!=='none';
    return (x.dark?'<hr>':'')+'<button type="button" role="menuitem" data-am="'+i+'">'+(x.dark?(dk?'الوضع النهاري':'الوضع الليلي'):x.t)+(on?'<i></i>':'')+'</button>'; }).join('');
  w.classList.add('op'); };
document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('#gv-amn [data-am]'); if(b){ var x=AM[+b.getAttribute('data-am')]; amClose(); if(x) x.go(); return; } if(!e.target.closest||!e.target.closest('#gv-am')) amClose(); });
document.addEventListener('keydown',function(e){ if(e.key==='Escape') amClose(); });
window.hhGvAcc=function(){ closeSheet(); var l=document.getElementById('nav-login-btn'); if(!document.body.classList.contains('hh-authed')&&l){ l.click(); return; } call('toggleProfile'); };

/* القوائم المنسدلة */
function closeMenus(){ document.querySelectorAll('#gv-hd .gv-dd.op').forEach(function(d){ d.classList.remove('op'); var b=d.querySelector('.gv-a'); if(b) b.setAttribute('aria-expanded','false'); }); }
window.hhGvMenu=function(g,e){ if(e) e.stopPropagation(); if(window.innerWidth<=900&&SEC.some(function(x){ return x.k===g; })){ hhGvGo(g); return; } var d=document.querySelector('#gv-hd .gv-dd[data-g="'+g+'"]'); if(!d) return; var was=d.classList.contains('op'); closeMenus(); if(!was){ d.classList.add('op'); d.querySelector('.gv-a').setAttribute('aria-expanded','true'); } };
document.addEventListener('click',function(e){ if(!e.target.closest||!e.target.closest('#gv-hd .gv-dd')) closeMenus(); });
document.addEventListener('keydown',function(e){ if(e.key==='Escape'){ closeMenus(); closeSheet(); } });
function closeSheet(){ document.documentElement.classList.remove('gv-sheet-on'); var b=document.getElementById('gv-mbtn'); if(b){ b.textContent='القائمة'; b.setAttribute('aria-expanded','false'); } }
window.hhGvSheet=function(force){ var on=typeof force==='boolean'?force:!document.documentElement.classList.contains('gv-sheet-on'); if(!on){ closeSheet(); return; } document.documentElement.classList.add('gv-sheet-on'); var b=document.getElementById('gv-mbtn'); if(b){ b.textContent='إغلاق'; b.setAttribute('aria-expanded','true'); } paint(); };

/* القسم النشط */
function paint(){
  var k=curOv?OV2K[curOv]||cur:cur;
  document.querySelectorAll('#gv-hd .gv-a, #gv-sheet [data-k]').forEach(function(b){ b.classList.toggle('on',b.getAttribute('data-k')===k); });
  try{ if(innerWidth<=900){ var _nv=document.querySelector('#gv-hd .gv-nv'), _c=_nv&&_nv.querySelector('.gv-a.on'); if(_c){ var r1=_nv.getBoundingClientRect(), r2=_c.getBoundingClientRect(); _nv.scrollLeft+= (r2.left+r2.width/2)-(r1.left+r1.width/2); } } }catch(e){}
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
  if(curOv){ host=document.getElementById(curOv==='ib'?'hh-ib':curOv==='prog'?'hh-pg':curOv==='mh'?'hh-mh':curOv==='learn'?'hh-learn':'hh-sch-wiz')||(curOv==='school'?document.getElementById('hh-school-hub'):null); }
  else if(FOOT_SCR.indexOf(curScr)>-1){ host=document.getElementById(curScr); }
  if(host){ if(ft.parentNode!==host||host.lastElementChild!==ft) host.appendChild(ft); ft.style.display=''; ft.classList.toggle('gv-ft-w',host.classList.contains('screen')); fitFoot(); }
  else ft.style.display='none';
}
/* التذييل بعرض الشاشة كاملاً مهما ضاقت الحاوية */
function fitFoot(){ var ft=window._gvFoot; if(!ft) return; ft.style.removeProperty('margin-left'); ft.style.removeProperty('margin-right'); ft.style.removeProperty('width');
  if(!ft.classList.contains('gv-ft-w')||ft.style.display==='none'||!ft.offsetParent&&getComputedStyle(ft).position!=='fixed') return;
  var vw=document.documentElement.clientWidth, r=ft.getBoundingClientRect(); if(!r.width) return;
  ft.style.setProperty('width',vw+'px','important'); ft.style.setProperty('max-width','none','important');
  ft.style.setProperty('margin-left',(-r.left)+'px','important'); ft.style.setProperty('margin-right',(r.right-vw)+'px','important'); }
window.addEventListener('resize',function(){ clearTimeout(fitFoot._t); fitFoot._t=setTimeout(fitFoot,120); });
window.hhGvPlaceFoot=placeFoot;
// إبقاء التذييل في آخر الطبقات عند إعادة رسمها
var mo=new MutationObserver(function(){ if(window._gvFoot&&window._gvFoot.style.display!=='none'&&window._gvFoot.parentNode&&window._gvFoot.parentNode.lastElementChild!==window._gvFoot) placeFoot(); });

/* انكماش الشريط عند التمرير */
var miniOn=false;
function onScroll(e){ if(window.innerWidth<901){ if(miniOn){ miniOn=false; document.documentElement.classList.remove('gv-mini'); } return; }
  var t=e&&e.target, y=0;
  if(!t||t===document||t===document.documentElement||t===document.body) y=window.scrollY||document.documentElement.scrollTop||0;
  else { if(!t.closest||!(t.closest('.screen.active')||t.closest('#hh-ib,#hh-pg,#hh-sch-wiz,#hh-school-hub,#hh-mh,#hh-learn'))) return; y=t.scrollTop||0; }
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
':root.gv-on{--hh-bar:118px;--hh-bar-b:0px;}',
'html.gv-on body #hh-bottom-nav,html.gv-on body #hh-more-sheet,html.gv-on body #hh-more-dim{display:none !important;}',
'html.gv-on body #main-nav{height:var(--hh-bar) !important;min-height:var(--hh-bar) !important;padding:0 !important;background:#fff !important;border-bottom:0 !important;box-shadow:0 6px 18px rgba(61,9,24,.10) !important;}',
'html.gv-on body #main-nav::before,html.gv-on body #main-nav::after{display:none !important;}',
'html.gv-on body #main-nav > .main-nav-inner,html.gv-on body #main-nav > #mobile-menu,html.gv-on body #mobile-menu{display:none !important;}',
'#gv-hd{direction:rtl;font-family:Cairo,Tajawal,sans-serif;height:100%;display:flex;flex-direction:column;}',
'#gv-hd button{font-family:Cairo,sans-serif;cursor:pointer;}',
'#gv-hd .gv-in{max-width:1280px;margin:0 auto;padding:0 28px;height:100%;display:flex;align-items:center;gap:16px;}',
'#gv-hd .gv-sp{flex:1;}',
/* الجرس وقائمة الحساب */
'#gv-hd .gv-bl{display:flex;}',
P+'.gv-ib{all:unset;box-sizing:border-box;width:42px !important;height:42px !important;min-width:42px !important;border-radius:11px !important;border:1.5px solid #E7DAC0 !important;background:#fff !important;color:#3D0918 !important;display:grid !important;place-items:center;cursor:pointer;position:relative !important;box-shadow:none !important;margin:0 !important;padding:0 !important;}',
P+'.gv-ib:hover{border-color:#B8924A !important;}',
P+'.gv-ib svg{width:19px !important;height:19px !important;display:block;fill:none !important;stroke:currentColor !important;}',
P+'#hh-notif-badge{position:absolute !important;top:-5px !important;left:-5px !important;border:2px solid #fff !important;}',
'#gv-hold{display:none !important;}',
'html.gv-on body:not(.hh-authed) #main-nav #gv-hd .profile-btn{display:none !important;}',
'#gv-hd .gv-am{position:relative;display:flex;align-items:center;gap:8px;}',
'#gv-hd .gv-mt{width:42px;height:42px;border-radius:11px;border:1.5px solid #5E0E26;background:#fff;color:#5E0E26;display:none;place-items:center;padding:0;}',
'body:not(.hh-authed) #gv-hd .gv-mt{display:grid;}',
'#gv-hd .gv-mt svg{width:19px;height:19px;}',
P+'.profile-btn .gv-chv{width:12px;height:12px;flex-shrink:0;color:#5E0E26;margin-inline-start:2px;}',
'#gv-hd .gv-amn{display:none;position:absolute;top:calc(100% + 8px);left:0;min-width:230px;background:#fff;border:1px solid #E7DAC0;border-top:3px solid #B8924A;border-radius:0 0 12px 12px;box-shadow:0 18px 40px rgba(61,9,24,.16);padding:6px;z-index:30;}',
'#gv-hd .gv-am.op .gv-amn{display:block;}',
'#gv-hd .gv-amn button{all:unset;box-sizing:border-box;width:100%;cursor:pointer;display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:8px;font-family:Cairo,sans-serif;font-weight:800;font-size:14.5px;color:#3D0918;}',
'#gv-hd .gv-amn button:hover{background:#F5F1E8;}',
'#gv-hd .gv-amn button i{width:8px;height:8px;border-radius:50%;background:#c0392b;margin-inline-start:auto;}',
'#gv-hd .gv-amn hr{border:0;border-top:1px solid #EFE6D4;margin:6px 4px;}',
'html.gv-on body #hh-notif-panel{top:calc(var(--hh-bar) + 8px) !important;left:max(14px,calc(50% - 620px)) !important;}',
/* صف الشعار */
'#gv-hd .gv-lr{height:68px;background:#fff;border-bottom:1px solid #EADFC8;flex-shrink:0;}',
'#gv-hd .gv-lg{all:unset;display:flex;align-items:center;gap:10px;cursor:pointer;}',
'#gv-hd .gv-lgi{width:50px;height:50px;display:grid;place-items:center;} #gv-hd .gv-lgi img{max-width:100%;max-height:100%;object-fit:contain;} #gv-hd .gv-lm{width:44px;height:44px;border-radius:10px;background:#5E0E26;color:#E6CE8E;display:grid;place-items:center;font-weight:900;font-size:22px;}',
'#gv-hd .gv-lgt b{display:block;font-size:22px;font-weight:900;color:#5E0E26;line-height:1.15;} #gv-hd .gv-lgt small{font-size:11.5px;font-weight:700;color:#8A6D2E;}',
'#gv-hd .gv-vl{width:1px;height:36px;background:#E7DAC0;} #gv-hd .gv-org{font-family:\"Reem Kufi\",Cairo,sans-serif;font-size:19px;font-weight:600;color:#8A6D2E;line-height:1.3;white-space:nowrap;}',
'#gv-hd .gv-srch{display:flex;}',
P+'.nav-search-container{display:block !important;width:300px !important;max-width:300px !important;flex:0 0 300px !important;position:relative;}',
P+'.nav-search-wrap{height:42px !important;border-radius:11px !important;background:#FAF6EE !important;border:1.5px solid #E7DAC0 !important;box-shadow:none !important;}',
P+'.nav-search-input{color:#3D0918 !important;font-family:Cairo,sans-serif !important;font-size:13.5px !important;font-weight:600 !important;} '+P+'.nav-search-input::placeholder{color:#A89A82 !important;}',
P+'.nav-search-icon{color:#8A6D2E !important;}',
'#gv-hd .gv-acc{display:flex;align-items:center;gap:8px;}',
P+'.nav-login-btn{height:42px !important;min-height:42px !important;border-radius:11px !important;margin:0 !important;background:#5E0E26 !important;color:#fff !important;border:0 !important;padding:0 18px !important;font-family:Cairo,sans-serif !important;font-weight:800 !important;font-size:14px !important;box-shadow:none !important;}',
P+'.nav-login-btn svg{display:none !important;}',
P+'.profile-btn{height:42px !important;border-radius:11px !important;margin:0 !important;background:#fff !important;border:1.5px solid #5E0E26 !important;color:#5E0E26 !important;padding:0 6px 0 14px !important;display:inline-flex !important;align-items:center !important;gap:8px !important;box-shadow:none !important;}',
P+'.profile-btn #ub-name{color:#5E0E26 !important;font-family:Cairo,sans-serif !important;font-weight:800 !important;font-size:14px !important;-webkit-text-fill-color:#5E0E26 !important;}',
P+'.profile-avatar{width:28px !important;height:28px !important;border-radius:6px !important;background:#5E0E26 !important;color:#fff !important;font-size:13px !important;}',
/* شريط الأقسام */
'#gv-hd .gv-nv{height:50px;background:#5E0E26;border-bottom:1px solid rgba(255,255,255,.85);flex-shrink:0;}',
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
'#gv-hd .gv-soc{margin-inline-start:auto;display:inline-flex;align-items:center;gap:8px;align-self:center;margin-inline-end:8px;} #gv-hd .gv-soc+.gv-play{margin-inline-start:0;}',
'#gv-hd .gv-sig{width:36px;height:36px;border-radius:8px;border:1px solid rgba(245,230,196,.25);display:grid;place-items:center;color:#F5E6C4;box-sizing:border-box;} #gv-hd .gv-sig:hover{border-color:#E6CE8E;color:#fff;} #gv-hd .gv-sig svg{width:18px;height:18px;display:block;}',
'#gv-hd .gv-swa{display:inline-flex;align-items:center;gap:7px;height:36px;padding:0 14px;border-radius:8px;background:#1F7A4D;color:#fff;font-weight:900;font-size:14px;text-decoration:none;box-sizing:border-box;white-space:nowrap;} #gv-hd .gv-swa:hover{background:#23905a;} #gv-hd .gv-swa svg{width:17px;height:17px;display:block;}',
'#gv-hd .gv-play.gv-d{display:inline-flex;align-items:center;gap:7px;} #gv-hd .gv-play.gv-d svg{width:13px;height:13px;}',
'@media (max-width:1250px){ #gv-hd .gv-swa b{display:none;} #gv-hd .gv-swa{width:36px;padding:0;justify-content:center;} }',
'@media (max-width:900px){ #gv-hd .gv-soc{display:none !important;} }',
'#gv-hd .gv-m{display:none;}',
/* zzzzzzcy: قائمة بأسطر لكل قسم (تعلّم، الإبداع) */
'#gv-hd .gv-mn.gv-mr{min-width:0;width:420px;padding:8px;border:0;border-radius:0 0 18px 18px;border-top:3px solid #B8924A;box-shadow:0 24px 50px -18px rgba(61,9,24,.35),0 0 0 1px #EFE6D4;}',
'#gv-hd .gv-dd.op .gv-mn.gv-mr{display:block;}',
'#gv-hd .gv-mr .gv-row{display:flex;gap:14px;align-items:center;width:100%;box-sizing:border-box;padding:12px;border-radius:13px;}',
'#gv-hd .gv-mr .gv-row:hover,#gv-hd .gv-mr .gv-row:focus-visible{background:#FBF6EC;outline:0;}',
'#gv-hd .gv-mr .gv-row i{width:46px;height:46px;border-radius:14px;display:grid;place-items:center;background:var(--k1);color:var(--k);flex-shrink:0;} #gv-hd .gv-mr .gv-row i svg{width:23px;height:23px;}',
'#gv-hd .gv-mr .gv-row span{min-width:0;flex:1;} #gv-hd .gv-mr .gv-row b{font-size:15.5px;font-weight:900;color:#3D0918;} #gv-hd .gv-mr .gv-row small{font-size:12.5px;font-weight:700;color:#7A7062;line-height:1.6;}',
'#gv-hd .gv-mr .gv-rch{width:14px;height:14px;color:#C9B994;flex-shrink:0;} #gv-hd .gv-mr .gv-row:hover .gv-rch{color:var(--k);}',
'#gv-hd .gv-mr .gv-mft{display:flex;justify-content:space-between;align-items:center;width:calc(100% - 12px);box-sizing:border-box;margin:4px 6px 2px;padding:10px 8px 6px;border-top:1px solid #F0E8D8;border-radius:0;font-size:12.5px;font-weight:900;color:#8A1538;font-family:Cairo,sans-serif;}',
'#gv-hd .gv-mr .gv-mft span{color:#7A7062;font-weight:700;} #gv-hd .gv-mr .gv-mft:hover{background:none;text-decoration:underline;}',
'body.dark-mode #gv-hd .gv-mn.gv-mr{background:#22121A;box-shadow:0 24px 50px -18px rgba(0,0,0,.6),0 0 0 1px #3E2C24;}',
'body.dark-mode #gv-hd .gv-mr .gv-row{--k:var(--kd) !important;} body.dark-mode #gv-hd .gv-mr .gv-row i{background:#2E1A22;} body.dark-mode #gv-hd .gv-mr .gv-row b{color:#F5E6C4;} body.dark-mode #gv-hd .gv-mr .gv-row small{color:#B8A68A;}',
'body.dark-mode #gv-hd .gv-mr .gv-row:hover,body.dark-mode #gv-hd .gv-mr .gv-row:focus-visible{background:#2E1A22;} body.dark-mode #gv-hd .gv-mr .gv-mft{border-color:#3E2C24;color:#E6CE8E;} body.dark-mode #gv-hd .gv-mr .gv-mft span{color:#B8A68A;}',
'#gv-hd .gv-a{white-space:nowrap;flex-shrink:0;} #gv-hd .gv-nv .gv-in{flex-wrap:nowrap;}',
'@media (max-width:1240px){ #gv-hd .gv-a{padding:0 12px;font-size:14px;} #gv-hd .gv-org,#gv-hd .gv-vl{display:none;} '+P+'.nav-search-container{width:220px !important;max-width:220px !important;flex-basis:220px !important;} }',
'@media (max-width:1100px){ #gv-hd .gv-a{padding:0 8px;font-size:13.5px;gap:6px;} #gv-hd .gv-play.gv-d{padding:0 14px;font-size:13.5px;} #gv-hd .gv-in{padding:0 18px;} }',
'@media (max-width:1040px) and (min-width:901px){ #gv-hd .gv-a{padding:0 7px;font-size:13px;} #gv-hd .gv-a.dd::before{width:5px;height:5px;} }',
/* الجوال */
'@media (max-width:900px){',
' :root.gv-on{--hh-bar:102px;}',
' #gv-hd .gv-in{padding:0 12px;gap:8px;}',
' #gv-hd .gv-lr{height:58px;border-bottom:0;} #gv-hd .gv-lgi{width:40px;height:40px;} #gv-hd .gv-lgt b{font-size:18px;} #gv-hd .gv-lgt small{font-size:10px;}',
' #gv-hd .gv-srch,#gv-hd .gv-am,#gv-hd .gv-d,#gv-hd .gv-dd{display:none !important;} #gv-hd .gv-dd[data-g="school"],#gv-hd .gv-dd[data-g="learn"],#gv-hd .gv-dd[data-g="ib"]{display:flex !important;} #gv-hd .gv-dd[data-g="school"] .gv-mn,#gv-hd .gv-dd[data-g="learn"] .gv-mn,#gv-hd .gv-dd[data-g="ib"] .gv-mn{display:none !important;} #gv-hd .gv-dd .gv-a.dd::before{display:none;}',
' '+P+'.gv-ib{width:38px !important;height:38px !important;min-width:38px !important;}',
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
'#gv-sheet .gv-shc{width:8px;height:8px;border-left:2.5px solid #B8924A;border-bottom:2.5px solid #B8924A;transform:rotate(-45deg);margin-top:-4px;transition:transform .2s;} #gv-sheet .gv-shx.op .gv-shc{transform:rotate(135deg);margin-top:4px;}',
'#gv-sheet .gv-shx.op{background:#FBF6EC;}',
'#gv-sheet .gv-shs{display:none;background:#FCFAF6;border-bottom:1px solid #EFE6D4;padding:4px 0 8px;} #gv-sheet .gv-shs.op{display:block;}',
'#gv-sheet .gv-shs .gv-shr{justify-content:flex-start;gap:12px;padding:11px 26px;border-bottom:0;font-size:14.5px;}',
'#gv-sheet .gv-shr i{color:var(--k);display:flex;flex-shrink:0;} #gv-sheet .gv-shr span{min-width:0;} #gv-sheet .gv-shr b{display:block;font-size:14.5px;font-weight:900;color:#3D0918;} #gv-sheet .gv-shr small{display:block;font-size:12px;font-weight:700;color:#7A7062;line-height:1.6;}',
'body.dark-mode #gv-sheet .gv-shx.op{background:#2A1720;} body.dark-mode #gv-sheet .gv-shs{background:#1E0D14;border-color:#3E2C24;} body.dark-mode #gv-sheet .gv-shr{--k:var(--kd) !important;} body.dark-mode #gv-sheet .gv-shr b{color:#F5E6C4;} body.dark-mode #gv-sheet .gv-shr small{color:#B8A68A;}',
'#gv-sheet h6{margin:0;padding:12px 18px 6px;font-size:12.5px;color:#8A6D2E;font-weight:800;background:#F5F1E8;}',
/* التذييل */
'#gv-ft{background:#3D0918;color:#F5E6C4;margin-top:40px;direction:rtl;font-family:Cairo,sans-serif;width:100%;flex-shrink:0;align-self:stretch;}',
'#gv-ft .gv-ft-in{max-width:1224px;margin:0 auto;padding:0 28px;display:flex;align-items:center;gap:20px;flex-wrap:wrap;box-sizing:border-box;}',
'#gv-ft .gv-ft-t .gv-ft-in{padding-top:24px;padding-bottom:24px;}',
'#gv-ft .gv-sp{flex:1;}',
'#gv-ft .gv-ft-br{all:unset;cursor:pointer;display:flex;align-items:center;gap:14px;}',
'#gv-ft .gv-ft-lg{display:block;height:50px;min-width:40px;} #gv-ft .gv-ft-lg img{height:50px;width:auto;display:block;}',
'#gv-ft .gv-ft-tg{font-family:\"Reem Kufi\",Cairo,sans-serif;font-weight:600;font-size:20px;color:#E6CE8E;padding-inline-start:14px;border-inline-start:1px solid rgba(245,230,196,.14);white-space:nowrap;}',
'#gv-ft .gv-ft-lk{display:flex;gap:4px 18px;flex-wrap:wrap;flex:1;justify-content:center;}',
'#gv-ft .gv-ft-lk button{all:unset;cursor:pointer;font-family:Cairo,sans-serif;font-size:14.5px;font-weight:700;color:rgba(245,230,196,.85);padding:4px 0;} #gv-ft .gv-ft-lk button:hover{color:#fff;}',
'#gv-ft .gv-ft-ac{display:flex;gap:8px;align-items:center;}',
'#gv-ft .gv-ft-ig{width:42px;height:42px;border-radius:11px;border:1px solid rgba(245,230,196,.2);display:grid;place-items:center;color:#F5E6C4;box-sizing:border-box;} #gv-ft .gv-ft-ig:hover{border-color:#B8924A;color:#fff;}',
'#gv-ft svg{display:block;} #gv-ft .gv-ft-ig svg{width:19px;height:19px;}',
'#gv-ft .gv-ft-wa{display:inline-flex;align-items:center;gap:8px;height:42px;padding:0 16px;border-radius:11px;background:#1F7A4D;color:#fff;font-weight:900;font-size:14px;text-decoration:none;box-sizing:border-box;} #gv-ft .gv-ft-wa:hover{background:#23905a;} #gv-ft .gv-ft-wa svg{width:18px;height:18px;}',
'#gv-ft .gv-ft-p{all:unset;cursor:pointer;box-sizing:border-box;height:42px;padding:0 18px;border-radius:11px;background:linear-gradient(#C9A35A,#9C7A3A);color:#fff;font-family:Cairo,sans-serif;font-weight:900;font-size:14.5px;display:inline-flex;align-items:center;gap:8px;border:1px solid #E6CE8E;} #gv-ft .gv-ft-p svg{width:14px;height:14px;}',
'#gv-ft .gv-ft-b{background:#2E0712;} #gv-ft .gv-ft-b .gv-ft-in{padding-top:13px;padding-bottom:13px;font-size:13px;font-weight:700;color:rgba(245,230,196,.7);}',
'#gv-ft .gv-ft-qa{display:inline-flex;align-items:center;gap:6px;} #gv-ft .gv-ft-qa i{display:inline-block;width:16px;height:10px;border-radius:2px;background:linear-gradient(90deg,#fff 34%,#8A1538 34%);}',
'@media (max-width:900px){ #gv-ft .gv-ft-in{padding:0 18px;} #gv-ft .gv-ft-t .gv-ft-in{flex-direction:column;align-items:stretch;text-align:center;gap:16px;} #gv-ft .gv-ft-br{justify-content:center;} #gv-ft .gv-ft-tg{font-size:17px;} #gv-ft .gv-ft-ac{justify-content:center;flex-wrap:wrap;} }',
'#gv-ft .gv-ft-pv{all:unset;cursor:pointer;color:rgba(245,230,196,.7);font-family:Cairo,sans-serif;font-weight:700;font-size:13px;} #gv-ft .gv-ft-pv:hover{color:#fff;}',
'html.gv-on body .screen.active:has(> #gv-ft){padding-bottom:0 !important;}',
'html.gv-on #hh-fin-tr,html.gv-on #hh-fin-tl,html.gv-on #hh-fin-br,html.gv-on #hh-fin-bl{display:none !important;}',
'html.gv-on #screen-menu .royal-about-section > footer,html.gv-on #screen-menu .royal-footer{display:none !important;}',
'html.gv-on body #main-nav #gv-hd .profile-btn::after,html.gv-on body #main-nav #gv-hd .profile-btn::before{display:none !important;content:none !important;}',
'body.hh-immersive #gv-sheet{display:none !important;}',
'html.gv-on body.hh-immersive{--hh-bar:0px;}',
'@media (min-width:901px){ :root.gv-on.gv-mini{--hh-bar:50px;} html.gv-mini #gv-hd .gv-lr{display:none !important;} html.gv-mini #gv-hd .gv-nv .gv-in::before{content:"المُلهم";color:#fff;font-family:Cairo,sans-serif;font-weight:900;font-size:19px;display:flex;align-items:center;padding-left:20px;margin-left:6px;border-left:1px solid rgba(255,255,255,.25);cursor:pointer;} }',
'html.gv-on body #screen-menu.active,html.gv-on body #screen-about.active{padding-top:calc(var(--hh-bar) - 60px) !important;} html.gv-on body #screen-reviews.active{padding-top:calc(var(--hh-bar) - 36px) !important;}',
'@media (max-width:900px){  html.gv-on body #screen-mygames.active,html.gv-on body #screen-references.active,html.gv-on body #screen-contact.active{padding-top:calc(var(--hh-bar) - 74px) !important;} }',
'html.gv-on body .screen.active > .top-bar:not(.gv-keep){display:none !important;}',
'html.gv-on body .screen.active > .top-bar.gv-keep:not(#board-top-bar){top:var(--hh-bar) !important;z-index:150 !important;}',
'html.gv-on body.hh-has-bottom-nav .screen.active{padding-bottom:0 !important;}',
'html.gv-on body.dark-mode #main-nav,body.dark-mode #gv-hd .gv-lr{background:#1E0D14 !important;border-color:#3A2A20 !important;} body.dark-mode #gv-hd .gv-lgt b{color:#F5E6C4;} body.dark-mode #gv-hd .gv-org{color:#E6CE8E;} #gv-hd .gv-lo-i{display:none;} body.dark-mode #gv-hd .gv-lgi:has(.gv-lo-i) .gv-lo-m{display:none;} body.dark-mode #gv-hd .gv-lo-i{display:block;} body.dark-mode #gv-hd .gv-amn{background:#22121A;border-color:#3E2C24;} body.dark-mode #gv-hd .gv-amn button{color:#F5E6C4;} body.dark-mode #gv-hd .gv-amn button:hover{background:#2E1820;} body.dark-mode #gv-hd .gv-amn hr{border-color:#3E2C24;} html.gv-on body.dark-mode #main-nav #gv-hd .gv-ib,body.dark-mode #gv-hd .gv-mt{background:#22121A !important;border-color:#3E2C24 !important;color:#F5E6C4 !important;} html.gv-on body.dark-mode #main-nav #gv-hd .profile-btn{background:#22121A !important;border-color:#E6CE8E !important;} html.gv-on body.dark-mode #main-nav #gv-hd .profile-btn #ub-name{color:#F5E6C4 !important;-webkit-text-fill-color:#F5E6C4 !important;} html.gv-on body.dark-mode #main-nav #gv-hd .profile-btn .gv-chv{color:#E6CE8E;} html.gv-on body.dark-mode #main-nav #gv-hd .nav-search-wrap{background:#22121A !important;border-color:#3E2C24 !important;} body.dark-mode #gv-sheet{background:#1E0D14;} body.dark-mode #gv-sheet button{color:#F5E6C4;border-color:#3A2A20;} body.dark-mode #gv-sheet h6{background:#2A1219;}'
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
  {id:'screen-toolbox',scr:1,ic:'tool',bc:'المدرسة',t:'أدوات المعلم',s:'أدوات احترافية تختصر وقتك، وتكبّر أثرك',hide:['.tbx-hero'],meta:'.tb2-chips'},
  {id:'screen-lb',scr:1,ic:'lb',bc:'عن المنصة › المتصدرون',t:'المتصدرون',s:'ترتيب المشاركين في مسابقات المنصة، يتحدّث بعد كل لعبة',tabs:'[id^="lb-tab-"]',hideTabs:1},
  {id:'screen-sponsors',scr:1,ic:'hand',bc:'الداعمون › الرعاة والشركاء',t:'الرعاة والشركاء',s:'الجهات الراعية للمنصة وبرامجها، والجهات المتعاونة معنا'},
  {id:'screen-influencers',scr:1,ic:'star',bc:'الداعمون › الشخصيات المؤثرة',t:'الشخصيات المؤثرة',s:'الملهمون، الأيادي البيضاء التي أضاءت طريقنا',hideFirst:1},
  {id:'screen-story',scr:1,ic:'book',bc:'عن المنصة › قصتنا',t:'قصتنا',s:'كيف بدأت فكرة المُلهم، ولماذا'},
  {id:'hh-ib',ic:'star',icFrom:'.ib2-hi',bc:'الإبداع',t:'الإبداع',s:'أنشئ لعبتك أو اختر لعبة جاهزة، وشغّلها على أجهزة الطلاب أو اعرضها على شاشة الصف',hide:['.ib2-hero'],act:'.ib2-hx button',actT:'لعبة جديدة',hideWhen:'.e2-tb'},
  {id:'hh-mh',ic:'tool',bc:'المدرسة › الحصة والطلاب',t:'الحصة والطلاب',s:'سجّل ما يحدث في الحصة، وتابع كل طالب، واطبع تقاريرك جاهزة',meta:'.mh-cls',tabs:'#mh-tabs > button',hideTabs:1},
  {id:'hh-pg',ic:'award',icFrom:'.p2-hi',bc:'المعسكرات التربوية',t:'المعسكرات التربوية',s:'برامج حضورية للطلاب وأولياء الأمور، بمواعيد معلنة وتسجيل مباشر',hide:['.p2-hero'],meta:'#hh-pg-counts'},
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
/* شرائط علوية فيها أدوات عمل (إنهاء اللعبة، تعديل الشعبة…) تبقى ظاهرة */
function keepBars(){ document.querySelectorAll('.screen > .top-bar:not(.gv-keep)').forEach(function(tb){ var k=tb.id==='board-top-bar'||Array.prototype.some.call(tb.querySelectorAll('[onclick]'),function(x){ return !/^\s*(goBack|showScreen\('screen-menu'\)|hhGoHome|hhNavigate\('screen-menu'\))/.test(x.getAttribute('onclick')||''); }); if(k) tb.classList.add('gv-keep'); }); }
function fillEmpty(){ keepBars(); var sc=document.getElementById('screen-sponsors'), sp=document.getElementById('sp-page'); if(sc&&sp&&sc.classList.contains('active')&&!sp.children.length&&typeof window.renderSponsorsPage==='function'){ try{ window.renderSponsorsPage(); }catch(e){ console.warn('sponsors',e); } } }
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
(function(){ /* zzzzzzdf: لا وضع ليلي في المنصة */
  try{ ['hh_dark','hh_dark_mode','hh_scr_dark'].forEach(function(k){ localStorage.setItem(k,'0'); }); }catch(e){}
  function off(){ var B=document.body, H=document.documentElement; if(B&&B.classList.contains('dark-mode')) B.classList.remove('dark-mode'); if(H.classList.contains('dark-mode')) H.classList.remove('dark-mode'); var r=document.getElementById('hh-scr'); if(r&&r.classList.contains('dk')) r.classList.remove('dk'); }
  window.toggleDarkMode=function(){ off(); }; window.hhScrDark=function(){ off(); };
  var s=document.createElement('style'); s.id='hh-nodark'; s.textContent='#dark-toggle,#dark-toggle-hidden,#board-dark-btn,.hh-dk-btn,[onclick*="toggleDarkMode"],[onclick*="hhScrDark"]{display:none !important}'; document.head.appendChild(s);
  off(); if(document.body) new MutationObserver(off).observe(document.body,{attributes:true,attributeFilter:['class']});
  document.addEventListener('DOMContentLoaded',function(){ off(); new MutationObserver(off).observe(document.body,{attributes:true,attributeFilter:['class']}); });
})();
(function(){ if(document.getElementById('hh-mfix')) return; var s=document.createElement('style'); s.id='hh-mfix'; s.textContent="@media (max-width:900px){\n/* 1 \u0627\u0644\u0634\u0631\u064a\u0637 \u0627\u0644\u0639\u0644\u0648\u064a: \u062a\u0644\u0645\u064a\u062d \u062a\u0645\u0631\u064a\u0631 \u0648\u062a\u0645\u0631\u064a\u0631 \u0627\u0644\u0639\u0646\u0635\u0631 \u0627\u0644\u062d\u0627\u0644\u064a \u0625\u0644\u0649 \u0627\u0644\u0648\u0633\u0637 */\n#gv-hd .gv-nv{-webkit-mask-image:linear-gradient(to left,#000 88%,transparent);mask-image:linear-gradient(to left,#000 88%,transparent);scroll-padding:0 24px}\n#gv-hd .gv-nv .gv-a{min-height:44px;padding:0 14px !important}\n#gv-hd .gv-m,#gv-hd .gv-ib,#gv-hd [aria-label=\"\u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062a\"]{min-height:44px !important;min-width:44px !important}\n/* 2 \u062a\u0628\u0648\u064a\u0628\u0627\u062a \u062a\u0639\u0644\u0651\u0645 \u0648\u0627\u0644\u0625\u0628\u062f\u0627\u0639: \u0643\u0644\u0647\u0627 \u0638\u0627\u0647\u0631\u0629 \u0628\u0644\u0627 \u0642\u0635 */\n#hh-learn .lh6-tabs{display:grid !important;grid-template-columns:repeat(3,minmax(0,1fr)) !important;gap:6px !important;overflow:visible !important}\n#hh-learn .lh6-tabs .tab{flex-direction:column !important;gap:4px !important;padding:8px 4px !important;min-height:60px;justify-content:center;text-align:center}\n#hh-learn .lh6-tabs .tab b{font-size:12.5px !important;white-space:normal !important;line-height:1.35}\n#hh-learn .lh6-tabs .tab i{width:26px !important;height:26px !important;margin:0 auto}\n#hh-ib .cy-tabs{display:grid !important;grid-template-columns:1fr 1fr !important;gap:6px !important;overflow:visible !important}\n#hh-ib .cy-tab{min-width:0 !important;padding:8px 6px !important;min-height:52px}\n#hh-ib .cy-tab b{font-size:12.5px !important;white-space:normal !important;line-height:1.35}\n/* 3 \u0628\u0637\u0627\u0642\u0627\u062a \u0627\u0644\u0645\u0633\u0627\u0628\u0642\u0627\u062a: \u0635\u0641\u0648\u0641 \u0645\u0636\u063a\u0648\u0637\u0629\u060c \u0632\u0631 \u0627\u0644\u062a\u0634\u063a\u064a\u0644 \u0641\u064a \u0627\u0644\u0645\u062a\u0646\u0627\u0648\u0644 */\n#hh-ib .cy-g3{display:grid !important;grid-template-columns:1fr !important;gap:8px !important}\n#hh-ib .cy-c{display:grid !important;grid-template-columns:minmax(0,1fr) auto !important;align-items:center;gap:2px 10px;padding:10px 12px !important;min-height:64px}\n#hh-ib .cy-c .t{grid-column:1}#hh-ib .cy-c small{grid-column:1}\n#hh-ib .cy-c .ac{grid-column:2;grid-row:1/span 2;margin:0 !important}\n#hh-ib .cy-c .cy-b{width:48px !important;height:48px !important;min-width:48px !important;min-height:48px !important;flex:0 0 48px !important;padding:0 !important;border-radius:50% !important;font-size:0 !important;display:grid;place-items:center;background:#1F4E79 !important;background-image:none !important;color:#fff !important;box-shadow:none !important;border:0 !important}#hh-ib .cy-c .cy-b *{color:#fff !important;stroke:#fff}#hh-ib .cy-c .cy-b svg{width:18px;height:18px}#hh-ib .cy-c .cy-b:after{content:'';font-size:0}#hh-ib .cy-c b{font-size:15px}\n/* 4 \u0645\u062d\u0637\u0629 \u0627\u0644\u062f\u0627\u0621 \u0648\u0627\u0644\u062f\u0648\u0627\u0621: \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u062a\u0646\u0642\u0644 \u062b\u0627\u0628\u062a\u0629 \u0623\u0633\u0641\u0644 \u0627\u0644\u0634\u0627\u0634\u0629\u060c \u0648\u0627\u0633\u0645 \u0627\u0644\u062e\u0637\u0648\u0629 \u0627\u0644\u062d\u0627\u0644\u064a\u0629 \u0638\u0627\u0647\u0631 */\n#hh-learn .dq-snav{position:fixed !important;bottom:0;left:0;right:0;margin:0 !important;padding-left:16px !important;padding-right:16px !important;z-index:5;background:var(--dq-bg,#FBF6EC);padding:10px 0 calc(10px + env(safe-area-inset-bottom)) !important;box-shadow:0 -10px 20px -14px rgba(0,0,0,.35)}\n#hh-learn .dq-snav{display:flex !important;gap:8px}#hh-learn .dq-snav button{min-height:50px}#hh-learn .dq-snav button.p{flex:1;justify-content:center}\n#hh-learn .dq-rail li:not(.on) span{opacity:.0}\n#hh-learn .dq-rail li.on span{font-weight:900;font-size:12.5px;white-space:nowrap}\n/* 5 \u0627\u0644\u062d\u0635\u0629: \u0623\u062f\u0648\u0627\u062a \u062a\u0644\u062a\u0641 \u0628\u062f\u0644 \u0627\u0644\u0642\u0635 */\n#hh-mh .mx-crits{display:grid !important;grid-template-columns:repeat(4,minmax(0,1fr)) !important;gap:6px !important;overflow:visible !important;-webkit-mask-image:none !important;mask-image:none !important}#hh-mh .mx-tools{display:grid !important;grid-template-columns:repeat(4,minmax(0,1fr)) !important;gap:6px !important;overflow:visible !important;-webkit-mask-image:none !important;mask-image:none !important}#hh-mh .mx-chip,#hh-mh .mx-tools .mx-b{min-width:0 !important;padding:0 4px !important;font-size:12.5px !important;justify-content:center}#hh-mh .mx-chip,#hh-mh .mx-tools .mx-b{min-height:44px}\n/* 6 \u062d\u0642\u0648\u0644 \u0627\u0644\u0625\u062f\u062e\u0627\u0644 16 \u0644\u0645\u0646\u0639 \u062a\u0643\u0628\u064a\u0631 \u0622\u064a\u0641\u0648\u0646\u060c \u0648\u0623\u062f\u0646\u0649 \u062e\u0637 12 */\ninput,select,textarea{font-size:16px !important}\nsmall,em{font-size:max(12px,1em)}\n}"; document.head.appendChild(s); })();
