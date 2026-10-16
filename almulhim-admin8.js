/* ============================================================
   المُلهم التعليمي، لوحة التحكم الشاملة (zzzzzzcr)
   قائمة جانبية بثماني مجموعات وبحث سريع، نظرة عامة جديدة مع تنبيه النسخ الاحتياطي،
   وصفحات جديدة: الإبداع، البرامج والتسجيلات، الشهادات، بوابة المدرسة، المحبرة،
   الإشعارات، رسالة للمعلم، المسابقات الخاصة، الشخصيات المؤثرة، الإعدادات العامة
   ============================================================ */
(function(){
'use strict';
if(window._hhAd8) return; window._hhAd8=true;
function SV(p,s,w){ return '<svg width="'+(s||18)+'" height="'+(s||18)+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||1.9)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'; }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function fmt(n){ return (Number(n)||0).toLocaleString('en-US'); }
function db(){ return firebase.firestore(); }
function $(id){ return document.getElementById(id); }
function call(n){ var a=[].slice.call(arguments,1); try{ if(typeof window[n]==='function') return window[n].apply(window,a); }catch(e){ console.warn(n,e); } }
function toastX(m,k){ try{ if(typeof toast==='function') toast(m,k||'info'); }catch(e){} }
function ms(v){ if(!v) return 0; if(typeof v==='number') return v; if(typeof v.toMillis==='function') return v.toMillis(); if(v.seconds) return v.seconds*1000; var t=Date.parse(v); return isNaN(t)?0:t; }
function me(){ try{ return (typeof currentUser!=='undefined'&&currentUser)||firebase.auth().currentUser||{}; }catch(e){ return {}; } }
function rel(t){ if(!t) return ''; var m=Math.floor((Date.now()-t)/60000); if(m<1) return 'الآن'; if(m<60) return 'قبل '+m+' د'; var h=Math.floor(m/60); if(h<24) return 'قبل '+h+' س'; var d=Math.floor(h/24); return d===1?'أمس':d===2?'قبل يومين':d<11?'قبل '+d+' أيام':'قبل '+d+' يوماً'; }
function dstr(t){ if(!t) return ''; try{ return new Date(t).toLocaleDateString('ar-QA-u-nu-latn',{day:'numeric',month:'short',year:'numeric'}); }catch(e){ return ''; } }
function audit(action,detail){ try{ db().collection('admin_audit').add({action:action,detail:detail,by:me().email||'',at:Date.now()}); }catch(e){} }
var P={home:'<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-5h4v5"/>',pulse:'<path d="M3 12h4l3-8 4 16 3-8h4"/>',shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
 q:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4"/><path d="M12 17h.01"/>',check:'<path d="M20 6L9 17l-5-5"/>',grid:'<rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/>',
 route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7"/>',trophy:'<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 21h8M9 17h6"/>',
 lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',star:'<path d="M12 3l2.8 5.9 6.2.9-4.5 4.4 1 6.3L12 17.6 6.5 20.5l1-6.3L3 9.8l6.2-.9z"/>',box:'<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/>',
 play:'<path d="M7 4l13 8-13 8z"/>',school:'<path d="M3 20h18M5 20V9l7-5 7 5v11"/><path d="M10 20v-5h4v5"/>',book:'<path d="M6 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6z"/><path d="M6 17h13"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14a5 5 0 0 1 6 5"/>',
 pen:'<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',badge:'<circle cx="12" cy="9" r="5"/><path d="M9 13l-1 8 4-2 4 2-1-8"/>',doc:'<path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
 key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3"/>',flag:'<path d="M5 21V4h11l-2 4 2 4H5"/>',layout:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/>',mega:'<path d="M3 11v2a2 2 0 0 0 2 2h2l5 4V5L7 9H5a2 2 0 0 0-2 2z"/><path d="M16 9a4 4 0 0 1 0 6"/>',
 bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21h4"/>',msg:'<path d="M4 5h16v11H8l-4 4z"/>',spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
 chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',save:'<path d="M5 3h11l3 3v15H5z"/><path d="M8 3v5h7M8 21v-7h8v7"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',plus:'<path d="M12 5v14M5 12h14"/>',alert:'<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/>',arrow:'<path d="M15 5l-7 7 7 7"/>',refresh:'<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',
 bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',x:'<path d="M18 6L6 18M6 6l12 12"/>',send:'<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>',dl:'<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',open:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
 timer:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/>'};

/* ═══ القائمة الجانبية ═══ */
var NEW={priv8:1,ib8:1,tpl8:1,live8:1,games8:1,mh8:1,gate8:1,prog8:1,reg8:1,cert8:1,notif8:1,msg8:1,infl8:1,set8:1};
var NAV8=[
 ['عام',[['home','نظرة عامة','home'],['activity','سجل النشاط','pulse'],['healthcheck','فحص المنصة','shield']]],
 ['المحتوى',[['questions','الأسئلة','q'],['review','المراجعة','check'],['categories','الفئات','grid'],['paths','المسارات','route'],['competitions','المسابقات','trophy'],['priv8','المسابقات الخاصة','lock',1]]],
 ['الإبداع',[['ib8','الألعاب الجاهزة','star',1],['tpl8','القوالب والوسائل','box',1],['live8','الجولات المباشرة','play'],['games8','ألعاب المعلمين','grid',1]]],
 ['التعليم',[['schools','المدارس','school'],['curricula','المناهج','book'],['curriculum','مركز المنهج','doc'],['classes','الصفوف والطلاب','users'],['toolbox','أدوات المعلم','pen'],['mh8','المحبرة','pen'],['gate8','بوابة المدرسة','lock',1]]],
 ['البرامج',[['prog8','البرامج والدورات','badge',1],['reg8','التسجيلات','users'],['cert8','الشهادات','doc',1]]],
 ['الناس',[['users','المستخدمون','user'],['teachers','اعتماد المعلمين','badge'],['directory','دليل المعلمين','book'],['permissions','الصلاحيات','key'],['reviews','التقييمات','star'],['reports','البلاغات','flag']]],
 ['التواصل',[['landing','الرئيسية والاختصارات','layout'],['announcements','الإعلانات','mega'],['notif8','الإشعارات','bell',1],['msg8','رسالة للمعلم','msg',1],['whatsnew','ماذا الجديد','spark'],['sponsors','الرعاة والشركاء','heart'],['infl8','الشخصيات المؤثرة','star',1]]],
 ['النظام',[['stats','الإحصائيات والأثر','chart'],['backup','النسخ الاحتياطي','save'],['set8','الإعدادات العامة','gear',1]]]
];
var META8={priv8:['المحتوى','المسابقات الخاصة','مسابقات برموز دخول للشركاء والمناسبات'],ib8:['الإبداع','الإبداع','كل ما يخص الألعاب: القوالب، الجاهزة، الجولات، وألعاب المعلمين'],tpl8:['الإبداع','القوالب والوسائل','إظهار القوالب والوسائل التعليمية أو إخفاؤها عن المعلمين'],
 live8:['الإبداع','الجولات المباشرة','الجولات الجارية الآن على أجهزة الطلاب'],games8:['الإبداع','ألعاب المعلمين','الألعاب التي أنشأها المعلمون في الإبداع'],mh8:['التعليم','المحبرة','الصفوف والطلاب والسجلات في المحبرة'],
 gate8:['التعليم','بوابة المدرسة','طلبات اعتماد المعلمين، والقبول والرفض مع ذكر السبب'],prog8:['البرامج','البرامج والدورات','البرامج الحضورية وأعداد المسجلين'],reg8:['البرامج','التسجيلات','طلبات التسجيل في كل البرامج'],
 cert8:['البرامج','الشهادات','الشهادات الصادرة من المنصة'],notif8:['التواصل','الإشعارات','إشعار يصل لجرس المستخدمين'],msg8:['التواصل','رسالة للمعلم','رسالة خاصة تصل لإشعارات معلم واحد'],
 infl8:['التواصل','الشخصيات المؤثرة','صفحة الملهمين الداعمين للمنصة'],set8:['النظام','الإعدادات العامة','بيانات التواصل الظاهرة في المنصة']};
var SUBTAB={ib8:'ready',tpl8:'tpl',live8:'live',games8:'games'};
function buildNav8(){
  var sb=document.querySelector('#screen-admin .mc-sidebar-scroll'); if(!sb||sb.querySelector('.ad8-nav')) return;
  var old=sb.querySelector('.ad2-nav');
  var nav=document.createElement('div'); nav.className='ad2-nav ad8-nav';
  if(!document.querySelector('#screen-admin .mc-cmd-trigger')) nav.innerHTML='<label class="ad8-sr">'+SV(P.search,16)+'<input type="search" id="ad8-q" placeholder="بحث سريع" aria-label="بحث في أقسام لوحة التحكم"><kbd>Ctrl K</kbd></label>';
  var used={};
  NAV8.forEach(function(g){
    var items=g[1].map(function(it){ var b=sb.querySelector('.mc-item[data-tab="'+it[0]+'"]');
      if(!b&&!NEW[it[0]]) return null;
      if(!b){ b=document.createElement('button'); b.type='button'; b.className='mc-item'; b.setAttribute('data-tab',it[0]); b.setAttribute('onclick',"adminTab('"+it[0]+"')"); b.innerHTML='<span class="mc-item-icon"></span><span class="mc-item-label"></span>'; }
      used[it[0]]=1;
      var ic=b.querySelector('.mc-item-icon'); if(ic){ var w=document.createElement('span'); w.innerHTML=SV(P[it[2]]||P.star,18); var n=w.firstChild; n.setAttribute('class','mc-item-icon'); ic.replaceWith(n); }
      var lb=b.querySelector('.mc-item-label'); if(lb){ var bd=lb.querySelector('.hhc-badge'); lb.textContent=it[1]; if(bd) lb.appendChild(bd); }
      if(!b.querySelector('.ad2-n')){ var em=document.createElement('em'); em.className='ad2-n'; em.hidden=true; b.appendChild(em); }
      if(it[3]&&!b.querySelector('.ad8-new')){ var nw=document.createElement('i'); nw.className='ad8-new'; nw.textContent='جديد'; b.appendChild(nw); }
      return b; }).filter(Boolean);
    if(!items.length) return;
    var lab=document.createElement('div'); lab.className='ad2-gl'; lab.textContent=g[0]; nav.appendChild(lab);
    items.forEach(function(b){ nav.appendChild(b); });
  });
  var rest=[].slice.call(sb.querySelectorAll('.mc-item[data-tab]')).filter(function(b){ return !used[b.dataset.tab]&&!nav.contains(b); });
  if(rest.length){ var l=document.createElement('div'); l.className='ad2-gl'; l.textContent='أخرى'; nav.appendChild(l); rest.forEach(function(b){ nav.appendChild(b); }); }
  if(old) old.replaceWith(nav); else sb.insertBefore(nav,sb.firstChild);
  sb.querySelectorAll('.mc-group').forEach(function(g){ g.style.display='none'; });
  var q=$('ad8-q'); if(q) q.addEventListener('input',function(){ var v=q.value.trim(); nav.querySelectorAll('.mc-item').forEach(function(b){ b.style.display=!v||b.textContent.indexOf(v)>-1?'':'none'; }); nav.querySelectorAll('.ad2-gl').forEach(function(l){ var n=l.nextElementSibling, any=false; while(n&&!n.classList.contains('ad2-gl')){ if(n.style.display!=='none') any=true; n=n.nextElementSibling; } l.style.display=any||!v?'':'none'; }); });
  if(q) q.addEventListener('keydown',function(e){ if(e.key==='Enter'){ var f=[].filter.call(nav.querySelectorAll('.mc-item'),function(b){ return b.style.display!=='none'; })[0]; if(f){ f.click(); q.value=''; q.dispatchEvent(new Event('input')); } } if(e.key==='Escape'){ q.value=''; q.dispatchEvent(new Event('input')); q.blur(); } });
}
document.addEventListener('keydown',function(e){ if((e.ctrlKey||e.metaKey)&&(e.key==='k'||e.key==='K')&&document.body.classList.contains('hh-admin')){ var q=$('ad8-q'); if(q){ e.preventDefault(); q.focus(); } } });
function setN(tab,n,warn){ var b=document.querySelector('#screen-admin .mc-item[data-tab="'+tab+'"] .ad2-n'); if(!b) return; b.hidden=!n; b.textContent=typeof n==='string'?n:fmt(n); b.classList.toggle('w',!!warn); }

/* ═══ البيانات المشتركة ═══ */
var D={};
async function get(k,fn,force){ if(D[k]&&!force&&Date.now()-D[k].t<60000) return D[k].v; try{ var v=await fn(); D[k]={v:v,t:Date.now()}; return v; }catch(e){ console.warn('ad8',k,e); return null; } }
function qdbCounts(){ var qs=0,cats=0; try{ cats=Object.keys(QDB||{}).length; Object.keys(QDB||{}).forEach(function(k){ qs+=(QDB[k]||[]).length; }); }catch(e){} return {qs:qs,cats:cats}; }
async function usersAll(f){ return get('users',async function(){ var o=[]; var s=await db().collection('users').get(); s.forEach(function(d){ var u=d.data()||{}; u._id=d.id; o.push(u); }); return o; },f); }
async function sessAll(f){ return get('sess',async function(){ var o=[]; var s=await db().collection('game_sessions').orderBy('createdAt','desc').limit(300).get(); s.forEach(function(d){ var x=d.data()||{}; x._id=d.id; o.push(x); }); return o; },f); }
async function regsAll(f){ return get('regs',async function(){ var o=[]; var s=await db().collection('program_registrations').get(); s.forEach(function(d){ var x=d.data()||{}; x._id=d.id; o.push(x); }); return o; },f); }
async function progsAll(f){ return get('progs',async function(){ var o=[]; var s=await db().collection('custom_programs').get(); s.forEach(function(d){ var x=d.data()||{}; x._id=d.id; if(!x.id) x.id=d.id; o.push(x); }); return o; },f); }
async function treqAll(f){ return get('treq',async function(){ var o=[]; var s=await db().collection('teacher_requests').get(); s.forEach(function(d){ var x=d.data()||{}; x._id=d.id; o.push(x); }); return o; },f); }
async function backupAt(f){ return get('bk',async function(){ var l=parseInt(localStorage.getItem('hh_last_backup_at')||'0',10)||0, c=0; try{ var d=await db().collection('platform_settings').doc('backup_meta').get(); if(d.exists) c=ms((d.data()||{}).at); }catch(e){} return Math.max(l,c); },f); }
async function ibReady(f){ return get('ibr',async function(){ var d=await db().collection('admin_qdb').doc('ib_ready').get(); var x=d.exists?(d.data()||{}):{}; var data={}; try{ data=x.data?JSON.parse(x.data):{}; }catch(e){} return data||{}; },f); }
async function ibReadySave(patch){ var d=await db().collection('admin_qdb').doc('ib_ready').get(); var x=d.exists?(d.data()||{}):{}; var data={}; try{ data=x.data?JSON.parse(x.data):{}; }catch(e){} Object.assign(data,patch(data)||{}); data.tf=data.tf||{}; data.custom=data.custom||[];
  await db().collection('admin_qdb').doc('ib_ready').set({data:JSON.stringify(data),updatedAt:Date.now(),updatedBy:me().email||''}); D.ibr={v:data,t:Date.now()};
  try{ if(window._hhIb){ window._hhIb.ready=data; localStorage.setItem('hh_ib_ready',JSON.stringify(data)); } }catch(e){} }
/* النسخة الاحتياطية تُسجَّل على السحابة لتظهر في كل الأجهزة */
(function wrapBackup(n){ if(typeof window.exportBackup!=='function'){ if(n<40) setTimeout(function(){ wrapBackup(n+1); },500); return; } if(window.exportBackup._ad8) return;
  var o=window.exportBackup; var w=async function(){ var r=await o.apply(this,arguments); try{ await db().collection('platform_settings').doc('backup_meta').set({at:Date.now(),by:me().email||''},{merge:true}); D.bk=null; }catch(e){} return r; }; w._ad8=1; window.exportBackup=w; })(0);
function backupNow(){ if(typeof window.exportBackup==='function') window.exportBackup(); else call('adminTab','backup'); }
window.hhAd8Backup=backupNow;

/* ═══ النظرة العامة ═══ */
var DAYS=['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
function kpi(a,ic,l,v,s,cls,act){ return '<button type="button" class="ad2-k ad8-k" style="--a:'+a+'" onclick="'+act+'"><span class="ad2-kl"><i>'+SV(P[ic])+'</i>'+l+'</span><b>'+v+'</b><small class="'+(cls||'')+'">'+s+'</small></button>'; }
function task(a,ic,t,s,n,act,cls){ return '<button type="button" class="ad2-task" style="--a:'+a+'" onclick="'+act+'"><i>'+SV(P[ic])+'</i><span><b>'+t+'</b><small>'+s+'</small></span><em class="'+(cls||'')+'">'+n+'</em><span class="ad2-go">'+SV(P.arrow,16)+'</span></button>'; }
window.hhAd2Home=async function(force){
  var panel=$('admin-home-panel'); if(!panel) return;
  panel.classList.add('ad2-home-on');
  var box=$('ad2-home'); if(!box){ box=document.createElement('div'); box.id='ad2-home'; panel.insertBefore(box,panel.firstChild); }
  box.classList.add('ad8-home');
  function draw(x){
    var c=qdbCounts(), U=x.users, S=x.sess, R=x.regs, T=x.treq, bk=x.bk;
    var now=Date.now(), wk=now-7*864e5, wk2=now-14*864e5;
    var g1=S?S.filter(function(s){ return ms(s.createdAt)>=wk; }).length:null, g0=S?S.filter(function(s){ var t=ms(s.createdAt); return t>=wk2&&t<wk; }).length:0;
    var live=S?S.filter(function(s){ return s.state!=='ended'&&now-ms(s.updatedAt||s.createdAt)<3*3600e3; }).length:null;
    var rp=R?R.filter(function(r){ return !r.status||r.status==='pending'; }).length:null, tp=T?T.filter(function(r){ return !r.status||r.status==='pending'; }).length:null;
    var teachers=U?U.filter(function(u){ return u.role==='teacher'; }).length:0, students=U?U.filter(function(u){ return u.role==='student'; }).length:0;
    var delta=g1!=null&&g0?Math.round((g1-g0)/g0*100):null;
    var bdays=bk?Math.floor((now-bk)/864e5):null, bwarn=!bk||bdays>=7;
    var B=[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]], L=[];
    for(var i=6;i>=0;i--){ var dt=new Date(now-i*864e5); L.push(DAYS[dt.getDay()]); }
    function di(t){ var a=new Date(t); a.setHours(0,0,0,0); var b=new Date(now); b.setHours(0,0,0,0); return 6-Math.round((b-a)/864e5); }
    (S||[]).forEach(function(s){ var k=di(ms(s.createdAt)); if(k>=0&&k<7) B[k][0]++; });
    (U||[]).forEach(function(u){ var k=di(ms(u.createdAt)); if(k>=0&&k<7) B[k][1]++; });
    var mx=Math.max(1,Math.max.apply(null,B.map(function(b){ return Math.max(b[0],b[1]); })));
    var bars=B.map(function(b,i){ return '<div class="ad8-bc"><span class="v">'+(b[0]||b[1]?b[0]:'')+'</span><div class="pr"><i class="u" style="height:'+Math.max(2,Math.round(b[1]/mx*100))+'%"></i><i class="g" style="height:'+Math.max(2,Math.round(b[0]/mx*100))+'%"></i></div><span class="d">'+L[i]+'</span></div>'; }).join('');
    var QA=[['plus','سؤال جديد',"adminTab('questions')"],['star','لعبة جاهزة',"hhAd8OpenReady(1)"],['bell','إشعار للجميع',"adminTab('notif8')"],['mega','إعلان',"adminTab('announcements')"],['badge','برنامج جديد',"hhAd8NewProg()"],['doc','شهادة',"hhAd8Cert()"],['lock','مسابقة خاصة',"adminTab('priv8')"],['save','نسخة احتياطية',"hhAd8Backup()"]];
    box.innerHTML=(bwarn?'<div class="ad8-alert" role="alert">'+SV(P.alert,20)+'<span>'+(bk?'آخر نسخة احتياطية قبل '+bdays+' '+(bdays===1?'يوم':bdays===2?'يومين':bdays<11?'أيام':'يوماً'):'لم تُؤخذ نسخة احتياطية بعد')+'</span><button type="button" onclick="hhAd8Backup()">'+SV(P.save,16)+' انسخ الآن</button></div>':'')
      +'<div class="ad2-kp ad8-kp5">'
      +kpi('#8A1538','play','ألعاب هذا الأسبوع',g1==null?'…':fmt(g1),delta==null?'جولات مباشرة':((delta>=0?'+':'')+delta+'% عن الأسبوع الماضي'),delta!=null&&delta>=0?'u':'',"adminTab('live8')")
      +kpi('#1D5C99','users','المستخدمون',U?fmt(U.length):'…',U?('معلمون '+teachers+'، طلاب '+students):'جارٍ الجلب','',"adminTab('users')")
      +kpi('#23855A','bolt','جولات مباشرة الآن',live==null?'…':fmt(live),live?'<span class="ad8-live"></span>تجري الآن':'لا جولات الآن',live?'u':'',"adminTab('live8')")
      +kpi('#C2862B','q','الأسئلة',fmt(c.qs),'في '+c.cats+' فئة','',"adminTab('questions')")
      +kpi('#6A42A8','badge','طلبات تنتظرك',rp==null?'…':fmt((rp||0)+(tp||0)),'تسجيلات '+(rp||0)+'، اعتماد '+(tp||0),(rp||tp)?'w':'',"adminTab('reg8')")+'</div>'
      +'<div class="ad2-row ad8-r2"><div class="ad2-cd"><h3>'+SV(P.chart)+' نشاط الأسبوع <em>آخر 7 أيام</em></h3><div class="ad8-bars">'+bars+'</div><div class="ad8-lg"><span><i class="g"></i>ألعاب لُعبت</span><span><i class="u"></i>مستخدمون جدد</span></div></div>'
      +'<div class="ad2-cd"><h3>'+SV(P.alert)+' تحتاج انتباهك</h3>'
      +task('#C0562F','save','النسخة الاحتياطية',bk?rel(bk):'لم تُؤخذ بعد',bwarn?'!':'✓','hhAd8Backup()',bwarn?'sm':'')
      +task('#6A42A8','users','تسجيلات البرامج',rp?rp+' طلبات جديدة':'لا طلبات جديدة',rp==null?'—':fmt(rp),"adminTab('reg8')")
      +task('#8A6D2E','check','أسئلة بانتظار المراجعة','ابدأ من الأكثر استخداماً',fmt(x.pending||0),"adminTab('review')")
      +task('#1D5C99','badge','طلبات اعتماد معلمين',tp?'بانتظار قرارك':'لا طلبات معلقة',tp==null?'—':fmt(tp),"adminTab('gate8')")
      +task('#8A1538','flag','بلاغات على أسئلة',x.rep?'افتح البلاغات وراجعها':'لا بلاغات مفتوحة',fmt(x.rep||0),"adminTab('reports')")+'</div></div>'
      +'<div class="ad2-cd ad8-qa"><h3>'+SV(P.bolt)+' إجراء سريع</h3><div class="g">'+QA.map(function(q){ return '<button type="button" onclick="'+q[2]+'"><i>'+SV(P[q[0]],16)+'</i>'+q[1]+'</button>'; }).join('')+'</div></div>';
    setN('reg8',rp||0,!!rp); setN('gate8',tp||0,!!tp); setN('live8',live||0); setN('backup',bwarn?(bk?bdays+' يوماً':'!'):0,bwarn);
  }
  var rev=0; try{ var cc=JSON.parse(localStorage.getItem('mc_review_cache')||'{}'); Object.keys(cc).forEach(function(k){ if(cc[k]==='reviewed'||cc[k]==='needs') rev++; }); }catch(e){}
  var rep=0; try{ rep=(window._allReports||[]).filter(function(r){ return !r.resolved; }).length; }catch(e){}
  var base={pending:Math.max(0,qdbCounts().qs-rev),rep:rep};
  draw(base);
  var r=await Promise.all([usersAll(force),sessAll(force),regsAll(force),treqAll(force),backupAt(force)]);
  draw(Object.assign(base,{users:r[0],sess:r[1],regs:r[2],treq:r[3],bk:r[4]}));
};

/* ═══ الصفحات الجديدة ═══ */
function lbl(p){ p.querySelectorAll('.ad8-tbl table').forEach(function(t){ var h=[].map.call(t.querySelectorAll('thead th'),function(x){ return x.textContent; }); t.querySelectorAll('tbody tr').forEach(function(r){ [].forEach.call(r.children,function(td,i){ if(h[i]&&!td.hasAttribute('data-l')) td.setAttribute('data-l',h[i]); }); }); }); }
function panel(){ var host=document.querySelector('#screen-admin .mc-content'); if(!host) return null; var p=$('admin-ad8-panel'); if(!p){ p=document.createElement('div'); p.id='admin-ad8-panel'; p.className='admin-section ad8-pg'; host.appendChild(p); new MutationObserver(function(){ lbl(p); }).observe(p,{childList:true,subtree:true}); } return p; }
function head8(tab){ var ph=$('ad2-ph'); if(!ph) return; var m=META8[tab]; if(!m) return; var mob=ph.querySelector('.ad2-mob'); ph.innerHTML=(mob?mob.outerHTML:'')+'<div><div class="ad2-cr">لوحة التحكم › <b>'+esc(m[0]+'، '+m[1])+'</b></div><h1>'+esc(m[1])+'</h1><p>'+esc(m[2])+'</p></div>'+(ACT[tab]?'<div class="ad2-ac">'+ACT[tab]+'</div>':''); }
var ACT={ib8:'<button type="button" class="ad2-b ad2-b--p" onclick="hhAd8OpenReady(1)">'+SV(P.plus)+' لعبة جاهزة</button>',prog8:'<button type="button" class="ad2-b ad2-b--p" onclick="hhAd8NewProg()">'+SV(P.plus)+' برنامج جديد</button>',
  reg8:'<button type="button" class="ad2-b" onclick="hhAd8RegCSV()">'+SV(P.dl)+' تصدير CSV</button>',cert8:'<button type="button" class="ad2-b ad2-b--p" onclick="hhAd8Cert()">'+SV(P.plus)+' شهادة</button>'};
function emp(t,s){ return '<div class="ad8-emp">'+SV(P.spark,26)+'<b>'+t+'</b>'+(s?'<small>'+s+'</small>':'')+'</div>'; }
function load(p){ p.innerHTML='<div class="ad8-load"><i></i>جارٍ التحميل</div>'; }
var R8={};

/* الإبداع */
var IBS={tab:'ready'};
var TPLX=[['s-boxes','صناديق الأسرار','box','#8A1538','boxes'],['s-show','المسابقة الكبرى','tv','#1D5C99','show'],['s-wheel','عجلة الأسئلة','wheel','#C2862B','wheel'],['s-flip','البطاقات المقلوبة','grid','#2C3E73','flip'],['s-tf','صح أم خطأ','check','#23855A','tfs'],['s-match','التوصيل','route','#0E8288','match'],['s-memory','بطاقات الذاكرة','grid','#6A42A8','memory'],['s-order','رتّب الأحداث','route','#C0562F','order'],['s-odd','اختر الدخيل','grid','#6A42A8','odd'],['s-time','الخط الزمني','route','#C2862B','time'],['s-map','الخريطة الصامتة','school','#0E8288','map'],['race','سباق المُلهم','bolt','#8A1538','race'],['tf','صح أم خطأ السريع','check','#23855A','tf'],['cloud','سحابة الكلمات','msg','#C2862B','cloud'],['order','رتّب وصنّف','route','#1D5C99','order']];
var TOOLX=[['timer','المؤقت','timer','#8A1538'],['pick','الاختيار العشوائي','grid','#1D5C99'],['groups','تقسيم المجموعات','users','#23855A'],['score','لوحة النقاط','chart','#C2862B'],['quiet','مقياس الهدوء','mega','#6A42A8'],['signal','إشارة العمل','alert','#C0562F'],['board','السبورة','pen','#2C3E73'],['qr','رمز الدخول','grid','#0E8288']];
R8.ib8=async function(p,force){
  load(p);
  var r=await Promise.all([ibReady(force),sessAll(force),get('games',async function(){ var o=[]; var s=await db().collection('games').get(); s.forEach(function(d){ var x=d.data()||{}; x._id=d.id; o.push(x); }); return o; },force),usersAll(force)]);
  var ib=r[0]||{}, S=r[1]||[], G=r[2]||[], U=r[3]||[], now=Date.now(), day=new Date(); day.setHours(0,0,0,0);
  var hide=ib.hideTpl||[], owners={}; G.forEach(function(g){ if(g.ownerUid) owners[g.ownerUid]=1; });
  var today=S.filter(function(s){ return ms(s.createdAt)>=day.getTime(); }), live=S.filter(function(s){ return s.state!=='ended'&&now-ms(s.updatedAt||s.createdAt)<3*3600e3; });
  var plays=S.filter(function(s){ return ms(s.createdAt)>=now-7*864e5; }).reduce(function(a,s){ return a+(s.playersCount||Object.keys(s.names||{}).length||0); },0);
  var cnt={}; G.forEach(function(g){ var k=g.mode==='screen'?(g.screenTpl||'boxes'):(g.template||'race'); cnt[k]=(cnt[k]||0)+1; }); S.forEach(function(s){ var k=s.template||'race'; cnt[k]=(cnt[k]||0)+1; });
  var top=Object.keys(cnt).sort(function(a,b){ return cnt[b]-cnt[a]; })[0], topN=(TPLX.filter(function(t){ return t[4]===top||t[0]===top; })[0]||[])[1]||'—';
  var UN=(window._hhIbUnits&&window._hhIbUnits.g7t1)||[], ucfg=ib.units||{}, open=UN.filter(function(u,i){ var c=ucfg['g7t1-'+u.k]; return c&&c.on!=null?!!c.on:i<2; }).length;
  var name={}; U.forEach(function(u){ name[u._id]=u.name||u.displayName||u.email||''; });
  var tabs=[['ready','الجاهزة: المدرسة'],['gen','الجاهزة: العامة'],['tpl','القوالب',TPLX.length],['tools','الوسائل التعليمية',TOOLX.length],['live','الجولات المباشرة',live.length],['games','ألعاب المعلمين',G.length]];
  var h='<div class="ad2-kp ad8-kp5">'
    +kpi('#8A1538','grid','ألعاب المعلمين',fmt(G.length),'من '+Object.keys(owners).length+' معلماً','',"hhAd8IbTab('games')")
    +kpi('#23855A','play','جولات اليوم',fmt(today.length),live.length?'<span class="ad8-live"></span>'+live.length+' تجري الآن':'لا جولات الآن',live.length?'u':'',"hhAd8IbTab('live')")
    +kpi('#C2862B','star','الأكثر لعباً','<span class="tx">'+esc(topN)+'</span>',top?fmt(cnt[top])+' مرة':'','',"hhAd8IbTab('tpl')")
    +kpi('#1D5C99','users','لاعبون هذا الأسبوع',fmt(plays),'على أجهزة الطلاب','',"hhAd8IbTab('live')")
    +kpi('#6A42A8','school','وحدات متاحة',UN.length?open+' من '+UN.length:'—','السابع، الفصل الأول','',"hhAd8OpenReady(0)")+'</div>'
    +'<div class="ad8-tabs" role="tablist">'+tabs.map(function(t){ return '<button type="button" role="tab" aria-selected="'+(IBS.tab===t[0])+'" class="'+(IBS.tab===t[0]?'on':'')+'" onclick="hhAd8IbTab(\''+t[0]+'\')">'+t[1]+(t[2]!=null?'<em>'+t[2]+'</em>':'')+'</button>'; }).join('')+'</div>';
  var b='';
  if(IBS.tab==='ready'){
    b='<div class="ad8-rows">'+(UN.length?UN.map(function(u,i){ var c=ucfg['g7t1-'+u.k]||{}, on=c.on!=null?!!c.on:i<2, col=c.c||['#8A1538','#1D5C99','#23855A','#C2862B','#6A42A8','#0E8288'][i%6];
      return '<div class="ad8-row"><span class="nb" style="--c:'+col+'">'+(i+1)+'</span><span class="tx"><b>'+esc(c.t||u.short)+'</b><small>'+(c.hide&&c.hide.length?c.hide.length+' أشكال مخفية':'كل الأشكال ظاهرة')+'</small></span><button type="button" class="ad8-sw'+(on?' on':'')+'" onclick="hhAd8UnitOn(\''+u.k+'\','+i+')"><span>'+(on?'متاحة':'مقفلة')+'</span><i></i></button></div>'; }).join(''):emp('لا وحدات','افتح الإبداع مرة لتحميل الوحدات'))+'</div>'
      +'<div class="ad8-foot"><span>الألوان وأشكال اللعب وترتيب الوحدات من لوحة الوحدات الكاملة.</span><button type="button" class="ad2-b ad2-b--p" onclick="hhAd8OpenReady(0)">'+SV(P.open)+' لوحة الوحدات الكاملة</button></div>';
  } else if(IBS.tab==='gen'){
    var cats=ib.cats||[], cust=ib.custom||[];
    b='<div class="ad8-rows">'+(cats.length?cats.map(function(k){ var n=cust.filter(function(c){ return c.cat===k.id; }).length; return '<div class="ad8-row"><span class="nb" style="--c:'+esc(k.c||'#8A1538')+'">'+esc(String(k.t||'').replace(/^ال/,'').charAt(0))+'</span><span class="tx"><b>'+esc(k.t)+'</b><small>'+(n===1?'لعبة واحدة':n===2?'لعبتان':n+' ألعاب')+'</small></span><button type="button" class="ad8-sw'+(k.on!==false?' on':'')+'" onclick="hhAd8CatOn(\''+esc(k.id)+'\')"><span>'+(k.on!==false?'ظاهر':'مخفي')+'</span><i></i></button></div>'; }).join(''):emp('لا تصنيفات عامة بعد','أضف تصنيفاً من صفحة الإبداع، تبويب «جاهزة»، باب «العامة»'))+'</div>'
      +'<div class="ad8-foot"><span>إضافة التصنيفات وألعابها من صفحة الإبداع نفسها.</span><button type="button" class="ad2-b ad2-b--p" onclick="hhAd8OpenReady(2)">'+SV(P.open)+' افتح الجاهزة العامة</button></div>';
  } else if(IBS.tab==='tpl'||IBS.tab==='tools'){
    var L=IBS.tab==='tpl'?TPLX:TOOLX;
    b='<div class="ad8-tg">'+L.map(function(t){ var on=hide.indexOf(t[0])<0, n=cnt[t[4]]||cnt[t[0]]||0; return '<div class="ad8-tc"><span class="ic" style="--c:'+t[3]+'">'+SV(P[t[2]]||P.star,20,2)+'</span><span class="tx"><b>'+esc(t[1])+'</b><small>'+(IBS.tab==='tpl'?(n?fmt(n)+' مرة':'لم يُستخدم بعد'):'وسيلة على الشاشة')+'</small></span><button type="button" class="ad8-sw'+(on?' on':'')+'" onclick="hhAd8Hide(\''+t[0]+'\')"><span>'+(on?'ظاهر':'مخفي')+'</span><i></i></button></div>'; }).join('')+'</div>'
      +'<div class="ad8-foot"><span>المخفي لا يظهر للمعلمين في صفحة القوالب، ويبقى ظاهراً لك بعلامة «مخفي».</span></div>';
  } else if(IBS.tab==='live'){
    var rows=live.concat(today.filter(function(s){ return live.indexOf(s)<0; })).slice(0,60);
    b=rows.length?'<div class="ad8-tbl"><table><thead><tr><th>اللعبة</th><th>المعلم</th><th>اللاعبون</th><th>السؤال</th><th>الحالة</th></tr></thead><tbody>'+rows.map(function(s){ var st=s.state||'lobby', on=live.indexOf(s)>-1; var nq=(s.questions||[]).length;
      return '<tr><td><b>'+esc(s.title||s.gameTitle||'جولة')+'</b><small>'+esc(s._id)+'</small></td><td>'+esc(name[s.hostUid]||s.hostName||'—')+'</td><td>'+fmt(s.playersCount||Object.keys(s.names||{}).length||0)+'</td><td>'+(st==='lobby'?'انتظار':nq?((s.qIndex||0)+1)+' من '+nq:'—')+'</td><td>'+(on?(st==='lobby'?'<span class="ad8-pill y">في الانتظار</span>':'<span class="ad8-pill g"><i></i>جارية</span>'):'<span class="ad8-pill">انتهت</span>')+'</td></tr>'; }).join('')+'</tbody></table></div>':emp('لا جولات اليوم','تظهر هنا الجولات المباشرة فور بدئها');
  } else {
    var GG=G.slice().sort(function(a,b){ return ms(b.updatedAt||b.createdAt)-ms(a.updatedAt||a.createdAt); }).slice(0,80);
    b=GG.length?'<div class="ad8-tbl"><table><thead><tr><th>اللعبة</th><th>المعلم</th><th>الشكل</th><th>الأسئلة</th><th>آخر تعديل</th></tr></thead><tbody>'+GG.map(function(g){ var k=g.mode==='screen'?(g.screenTpl||'boxes'):(g.template||'race'), tn=(TPLX.filter(function(t){ return t[4]===k||t[0]===k; })[0]||[])[1]||k;
      return '<tr><td><b>'+esc(g.title||'بلا عنوان')+'</b></td><td>'+esc(name[g.ownerUid]||'—')+'</td><td>'+esc(tn)+'</td><td>'+fmt((g.questions||[]).length)+'</td><td>'+dstr(ms(g.updatedAt||g.createdAt))+'</td></tr>'; }).join('')+'</tbody></table></div>':emp('لا ألعاب للمعلمين بعد');
  }
  p.innerHTML=h+'<div class="ad2-cd ad8-body">'+b+'</div>';
};
window.hhAd8IbTab=function(t){ IBS.tab=t; var p=panel(); if(p) R8.ib8(p); };
window.hhAd8Hide=async function(id){ try{ await ibReadySave(function(d){ var h=(d.hideTpl||[]).slice(), i=h.indexOf(id); if(i>-1) h.splice(i,1); else h.push(id); return {hideTpl:h}; }); audit('ib_hide',id); R8.ib8(panel()); }catch(e){ toastX('تعذّر الحفظ','error'); } };
window.hhAd8UnitOn=async function(k,i){ try{ await ibReadySave(function(d){ var u=d.units||{}, key='g7t1-'+k, c=u[key]||{}, on=c.on!=null?!!c.on:i<2; u[key]=Object.assign({},c,{on:!on}); return {units:u}; }); audit('ib_unit',k); R8.ib8(panel()); }catch(e){ toastX('تعذّر الحفظ','error'); } };
window.hhAd8CatOn=async function(id){ try{ await ibReadySave(function(d){ var c=(d.cats||[]).map(function(k){ return k.id===id?Object.assign({},k,{on:k.on===false}):k; }); return {cats:c}; }); R8.ib8(panel()); }catch(e){ toastX('تعذّر الحفظ','error'); } };
window.hhAd8OpenReady=function(mode){ if(typeof window.hhIbOpen!=='function'){ toastX('وحدة الإبداع غير محمّلة','error'); return; } hhIbOpen('ready'); setTimeout(function(){ try{ if(mode===0) hhRdPanel(1); else if(mode===2){ hhRdDoor('gen'); } else if(mode===1){ hhIbReadyNew(); } }catch(e){} },400); };
R8.tpl8=function(p,f){ IBS.tab='tpl'; return R8.ib8(p,f); }; R8.live8=function(p,f){ IBS.tab='live'; return R8.ib8(p,f); }; R8.games8=function(p,f){ IBS.tab='games'; return R8.ib8(p,f); };

/* البرامج والتسجيلات */
R8.prog8=async function(p,force){
  load(p); var r=await Promise.all([progsAll(force),regsAll(force)]); var PR=r[0]||[], RG=r[1]||[];
  if(!PR.length){ p.innerHTML='<div class="ad2-cd">'+emp('لا برامج بعد','أضف أول برنامج من الزر في الأعلى')+'</div>'; return; }
  p.innerHTML='<div class="ad8-pg3">'+PR.map(function(x){ var rg=RG.filter(function(g){ return g.programId===x.id; }), pend=rg.filter(function(g){ return !g.status||g.status==='pending'; }).length, conf=rg.filter(function(g){ return g.status==='confirmed'; }).length, seats=+x.seats||0;
    return '<div class="ad8-prog"><div class="hd" style="--c:'+esc(x.color||'#8A1538')+'">'+(x.img?'<img src="'+esc(x.img)+'" alt="">':'')+'<b>'+esc(x.name||'برنامج')+'</b><small>'+esc(x.date||x.startDate||x.when||'')+'</small></div>'
      +'<div class="st"><span><b>'+conf+'</b>مؤكد</span><span class="'+(pend?'w':'')+'"><b>'+pend+'</b>بانتظار</span><span><b>'+(seats||'—')+'</b>مقعداً</span></div>'+(seats?'<div class="br"><i style="width:'+Math.min(100,Math.round(conf/seats*100))+'%"></i></div>':'')
      +'<div class="ac"><button type="button" class="ad2-b ad2-b--p" onclick="hhAd8Regs(\''+esc(x.id)+'\')">الطلبات</button><button type="button" class="ad2-b" onclick="hhAd8EditProg(\''+esc(x.id)+'\')">تعديل</button></div></div>'; }).join('')+'</div>';
};
window.hhAd8NewProg=function(){ call('hhAdminAddProgram'); };
window.hhAd8EditProg=function(id){ call('hhAdminAddProgram',id); };
window.hhAd8Regs=function(id){ RGS.prog=id; RGS.st='all'; adminTab('reg8'); };
var RGS={st:'pending',prog:'',rows:[]};
R8.reg8=async function(p,force){
  load(p); var r=await Promise.all([regsAll(force),progsAll(force)]); var RG=(r[0]||[]).slice(), PR=r[1]||[], pn={}; PR.forEach(function(x){ pn[x.id]=x.name; });
  RG.sort(function(a,b){ return ms(b.createdAt)-ms(a.createdAt); });
  var f=RG.filter(function(x){ return (RGS.st==='all'||(RGS.st==='pending'?(!x.status||x.status==='pending'):x.status===RGS.st))&&(!RGS.prog||x.programId===RGS.prog); }); RGS.rows=f;
  var cnt=function(s){ return RG.filter(function(x){ return (!RGS.prog||x.programId===RGS.prog)&&(s==='all'||(s==='pending'?(!x.status||x.status==='pending'):x.status===s)); }).length; };
  var top='<div class="ad8-fl"><div class="ad8-tabs" role="tablist">'+[['pending','بانتظار التأكيد'],['confirmed','مؤكدة'],['all','الكل']].map(function(t){ return '<button type="button" class="'+(RGS.st===t[0]?'on':'')+'" onclick="hhAd8RegSt(\''+t[0]+'\')">'+t[1]+'<em>'+cnt(t[0])+'</em></button>'; }).join('')+'</div>'
    +'<select id="ad8-rgp" aria-label="البرنامج"><option value="">كل البرامج</option>'+PR.map(function(x){ return '<option value="'+esc(x.id)+'"'+(RGS.prog===x.id?' selected':'')+'>'+esc(x.name||x.id)+'</option>'; }).join('')+'</select></div>';
  p.innerHTML=top+'<div class="ad2-cd ad8-body">'+(f.length?'<div class="ad8-tbl"><table><thead><tr><th>الطالب</th><th>البرنامج</th><th>ولي الأمر</th><th>الجوال</th><th>التاريخ</th><th>الحالة</th><th></th></tr></thead><tbody>'+f.map(function(x){ var c=x.status==='confirmed';
      return '<tr><td><b>'+esc(x.studentName||'')+'</b><small>'+esc((x.grade||'')+(x.school?'، '+x.school:''))+'</small></td><td>'+esc(pn[x.programId]||x.programName||'')+'</td><td>'+esc(x.parentName||'')+'</td><td dir="ltr">'+esc(x.phone||'')+'</td><td>'+dstr(ms(x.createdAt))+'</td><td>'+(c?'<span class="ad8-pill g">مؤكد</span>':'<span class="ad8-pill y">بانتظار</span>')+'</td>'
        +'<td class="ac">'+(c?'<button type="button" class="ad2-b" onclick="hhAd8RegSet(\''+x._id+'\',\'pending\')">إلغاء التأكيد</button>':'<button type="button" class="ad2-b ad2-b--p" onclick="hhAd8RegSet(\''+x._id+'\',\'confirmed\')">تأكيد</button>')+'<button type="button" class="ad2-b ad8-del" aria-label="حذف" onclick="hhAd8RegDel(\''+x._id+'\')">'+SV(P.x,14,2.4)+'</button></td></tr>'; }).join('')+'</tbody></table></div>':emp('لا طلبات هنا','تظهر طلبات التسجيل فور إرسالها من صفحة البرامج'))+'</div>';
  var s=$('ad8-rgp'); if(s) s.onchange=function(){ RGS.prog=s.value; R8.reg8(panel()); };
};
window.hhAd8RegSt=function(s){ RGS.st=s; R8.reg8(panel()); };
window.hhAd8RegSet=async function(id,status){ var RG=(D.regs&&D.regs.v)||[], r=RG.filter(function(x){ return x._id===id; })[0]; if(!r) return;
  try{ var b=db().batch(); b.set(db().collection('program_registrations').doc(id),{status:status,confirmedAt:status==='confirmed'?Date.now():null},{merge:true});
    var d=(status==='confirmed'?1:0)-(r.status==='confirmed'?1:0); if(d&&r.programId) b.set(db().collection('custom_programs').doc(r.programId),{confirmedCount:firebase.firestore.FieldValue.increment(d)},{merge:true});
    await b.commit(); r.status=status; audit('program_reg_'+status,(r.studentName||'')+'، '+(r.programName||'')); toastX(status==='confirmed'?'أُكّد التسجيل':'أُلغي التأكيد','success'); try{ if(typeof hhPgLoad==='function') hhPgLoad(true); }catch(e){} R8.reg8(panel(),true); }catch(e){ toastX('تعذّر التحديث','error'); } };
window.hhAd8RegDel=async function(id){ var RG=(D.regs&&D.regs.v)||[], r=RG.filter(function(x){ return x._id===id; })[0]; if(!r||!confirm('حذف طلب '+(r.studentName||'')+'؟')) return;
  try{ var b=db().batch(); b.delete(db().collection('program_registrations').doc(id)); if(r.status==='confirmed'&&r.programId) b.set(db().collection('custom_programs').doc(r.programId),{confirmedCount:firebase.firestore.FieldValue.increment(-1)},{merge:true}); await b.commit(); toastX('حُذف الطلب','success'); R8.reg8(panel(),true); }catch(e){ toastX('تعذّر الحذف','error'); } };
window.hhAd8RegCSV=function(){ var rows=RGS.rows||[]; var q=function(s){ return '"'+String(s==null?'':s).replace(/"/g,'""')+'"'; };
  var head=['الطالب','الصف','المدرسة','البرنامج','ولي الأمر','الجوال','البريد','الحالة','التاريخ'];
  var csv='﻿'+head.map(q).join(',')+'\n'+rows.map(function(r){ return [r.studentName,r.grade,r.school,r.programName,r.parentName,r.phone,r.email,r.status==='confirmed'?'مؤكد':'بانتظار',dstr(ms(r.createdAt))].map(q).join(','); }).join('\n');
  var a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})); a.download='registrations.csv'; document.body.appendChild(a); a.click(); a.remove(); };

/* الشهادات */
R8.cert8=async function(p,force){
  load(p); var C=await get('certs',async function(){ var o=[]; var s=await db().collection('certificates').limit(300).get(); s.forEach(function(d){ var x=d.data()||{}; x._id=d.id; o.push(x); }); return o; },force)||[];
  C.sort(function(a,b){ return ms(b.createdAt)-ms(a.createdAt); });
  var m=Date.now()-30*864e5, n30=C.filter(function(c){ return ms(c.createdAt)>=m; }).length, by={}; C.forEach(function(c){ var k=c.issuedBy||c.teacher||'—'; by[k]=(by[k]||0)+1; });
  p.innerHTML='<div class="ad2-kp ad8-kp3">'+kpi('#8A1538','doc','كل الشهادات',fmt(C.length),'صادرة من المنصة','','')+kpi('#23855A','spark','آخر 30 يوماً',fmt(n30),'شهادة جديدة','','')+kpi('#C2862B','users','المُصدِرون',fmt(Object.keys(by).length),'معلماً ومشرفاً','','')+'</div>'
    +'<div class="ad2-cd ad8-body">'+(C.length?'<div class="ad8-tbl"><table><thead><tr><th>الحاصل عليها</th><th>النوع</th><th>السبب</th><th>المُصدِر</th><th>الرقم</th><th>التاريخ</th></tr></thead><tbody>'+C.slice(0,150).map(function(c){ return '<tr><td><b>'+esc(c.student||c.studentName||c.name||'')+'</b></td><td>'+esc(c.template||c.type||'')+'</td><td>'+esc(c.reason||'')+'</td><td>'+esc(c.teacher||c.issuedBy||'')+'</td><td dir="ltr">'+esc(c.serial||'')+'</td><td>'+dstr(ms(c.createdAt))+'</td></tr>'; }).join('')+'</tbody></table></div>':emp('لا شهادات بعد'))+'</div>';
};
window.hhAd8Cert=function(){ if(typeof window.hhOpenCertificates==='function') hhOpenCertificates(); else toastX('وحدة الشهادات غير محمّلة','error'); };

/* بوابة المدرسة */
var GTS={st:'pending'};
R8.gate8=async function(p,force){
  load(p); var T=(await treqAll(force)||[]).slice(); T.sort(function(a,b){ return ms(b.createdAt)-ms(a.createdAt); });
  var c={pending:0,approved:0,rejected:0}; T.forEach(function(r){ c[r.status&&c[r.status]!=null?r.status:'pending']++; });
  var f=T.filter(function(r){ return (r.status&&c[r.status]!=null?r.status:'pending')===GTS.st; });
  p.innerHTML='<div class="ad8-gate-note">'+SV(P.lock,18)+'<span>المدرسة مفتوحة للمعلم المعتمد فقط. غير المعتمد يرى نموذج طلب الاعتماد، والطالب يدخل فصله برمز المعلم.</span></div>'
    +'<div class="ad8-fl"><div class="ad8-tabs">'+[['pending','بانتظار القرار'],['approved','معتمدون'],['rejected','مرفوضون']].map(function(t){ return '<button type="button" class="'+(GTS.st===t[0]?'on':'')+'" onclick="hhAd8GateSt(\''+t[0]+'\')">'+t[1]+'<em>'+c[t[0]]+'</em></button>'; }).join('')+'</div></div>'
    +'<div class="ad2-cd ad8-body">'+(f.length?'<div class="ad8-tbl"><table><thead><tr><th>المعلم</th><th>المدرسة</th><th>المادة</th><th>التواصل</th><th>التاريخ</th><th></th></tr></thead><tbody>'+f.map(function(r){ var id=r.uid||r._id;
      return '<tr><td><b>'+esc(r.name||'')+'</b>'+(r.reason?'<small class="rs">السبب: '+esc(r.reason)+'</small>':'')+'</td><td>'+esc(r.school||'')+'</td><td>'+esc(r.subject||'')+'</td><td><small dir="ltr">'+esc(r.phone||'')+'</small><small dir="ltr">'+esc(r.email||'')+'</small></td><td>'+dstr(ms(r.createdAt))+'</td>'
        +'<td class="ac">'+(GTS.st!=='approved'?'<button type="button" class="ad2-b ad2-b--p" onclick="hhAd8Gate(\''+esc(id)+'\',\'approved\')">اعتماد</button>':'')+(GTS.st!=='rejected'?'<button type="button" class="ad2-b" onclick="hhAd8Gate(\''+esc(id)+'\',\'rejected\')">رفض</button>':'')+'</td></tr>'; }).join('')+'</tbody></table></div>':emp(GTS.st==='pending'?'لا طلبات بانتظار قرارك':'لا أحد هنا بعد'))+'</div>';
};
window.hhAd8GateSt=function(s){ GTS.st=s; R8.gate8(panel()); };
window.hhAd8Gate=async function(uid,status){
  var reason='';
  if(status==='rejected'){ reason=prompt('سبب الرفض، يظهر للمعلم في صفحة المدرسة:',''); if(reason===null) return; reason=String(reason).trim().slice(0,160); }
  try{
    if(status==='approved'&&typeof window.hhSetTeacherStatus==='function'){ await hhSetTeacherStatus(uid,'approved'); }
    else{ await db().collection('teacher_requests').doc(uid).set({status:status,reason:reason||firebase.firestore.FieldValue.delete(),reviewedAt:new Date().toISOString(),reviewedBy:me().email||''},{merge:true});
      try{ await db().collection('user_notifications').add({toUid:uid,title:status==='approved'?'اعتُمد حسابك كمعلم':'تحديث بشأن طلب الاعتماد',body:status==='approved'?'اعتُمد حسابك كمعلم، وتفتح لك المدرسة الآن بكل أدواتها.':('لم يُعتمد طلبك'+(reason?'. السبب: '+reason:'')+'. عدّل بياناتك وأعد الإرسال من صفحة المدرسة.'),from:'إدارة المُلهِم',read:false,createdAt:firebase.firestore.FieldValue.serverTimestamp()}); }catch(e){} }
    if(status==='rejected'&&reason) await db().collection('teacher_requests').doc(uid).set({reason:reason},{merge:true});
    audit('teacher_'+status,uid); toastX(status==='approved'?'اعتُمد المعلم':'رُفض الطلب','success'); R8.gate8(panel(),true);
  }catch(e){ toastX('تعذّر التحديث','error'); }
};

/* المحبرة */
R8.mh8=async function(p,force){
  load(p);
  var r=await Promise.all([get('cls',async function(){ var s=await db().collection('classrooms').get(); var o=[]; s.forEach(function(d){ var x=d.data()||{}; x._id=d.id; o.push(x); }); return o; },force),get('cst',async function(){ var s=await db().collection('classroom_students').get(); return s.size; },force),usersAll(force)]);
  var C=r[0]||[], n=r[1]||0, U=r[2]||[], tch={}; C.forEach(function(c){ if(c.teacherId) tch[c.teacherId]=(tch[c.teacherId]||0)+1; });
  var mh=U.filter(function(u){ return u.mh2; }).length, name={}; U.forEach(function(u){ name[u._id]=u.name||u.email||''; });
  var top=Object.keys(tch).sort(function(a,b){ return tch[b]-tch[a]; }).slice(0,10);
  p.innerHTML='<div class="ad2-kp">'+kpi('#8A1538','users','الصفوف',fmt(C.length),'في المحبرة والمدرسة','','')+kpi('#1D5C99','user','الطلاب في الصفوف',fmt(n),'بأسمائهم','','')+kpi('#23855A','pen','معلمون يستخدمونها',fmt(Object.keys(tch).length),mh?mh+' خصّصوا إعداداتهم':'','','')+kpi('#C2862B','chart','متوسط الصف',C.length?fmt(Math.round(n/C.length)):'—','طالباً','','')+'</div>'
    +'<div class="ad2-cd ad8-body"><h3 class="ad8-h">'+SV(P.users)+' أكثر المعلمين صفوفاً</h3>'+(top.length?'<div class="ad8-tbl"><table><thead><tr><th>المعلم</th><th>الصفوف</th></tr></thead><tbody>'+top.map(function(id){ return '<tr><td><b>'+esc(name[id]||id)+'</b></td><td>'+tch[id]+'</td></tr>'; }).join('')+'</tbody></table></div>':emp('لا صفوف بعد'))
    +'<div class="ad8-foot"><span>تفاصيل الصفوف والطلاب من «الصفوف والطلاب».</span><button type="button" class="ad2-b" onclick="adminTab(\'classes\')">الصفوف والطلاب</button><button type="button" class="ad2-b ad2-b--p" onclick="hhGvGo(\'tool\')">'+SV(P.open)+' افتح المحبرة</button></div></div>';
};

/* الإشعارات ورسالة للمعلم */
R8.notif8=async function(p){
  p.innerHTML='<div class="ad2-cd ad8-form"><h3 class="ad8-h">'+SV(P.bell)+' إشعار جديد</h3>'
    +'<div class="ad8-aud" role="radiogroup">'+[['all','الجميع'],['teacher','المعلمون'],['student','الطلاب']].map(function(a,i){ return '<label><input type="radio" name="ad8-aud" value="'+a[0]+'"'+(i===0?' checked':'')+'><span>'+a[1]+'</span></label>'; }).join('')+'</div>'
    +'<label>العنوان<input id="ad8-nt" maxlength="80" placeholder="مثال: لعبة جديدة في الإبداع"></label><label>النص<textarea id="ad8-nb" rows="4" maxlength="400" placeholder="اكتب ما تريد أن يصل للجميع"></textarea></label>'
    +'<div class="ad8-foot"><span id="ad8-ns">يصل لجرس الإشعارات عند المستخدمين.</span><button type="button" class="ad2-b ad2-b--p" id="ad8-nsend">'+SV(P.send)+' أرسل</button></div></div>';
  $('ad8-nsend').onclick=async function(){ var t=$('ad8-nt').value.trim(), b=$('ad8-nb').value.trim(), a=(document.querySelector('input[name=ad8-aud]:checked')||{}).value||'all'; if(!t||!b){ toastX('اكتب العنوان والنص','error'); return; }
    var U=(await usersAll(true)||[]).filter(function(u){ return a==='all'||u.role===a; }); if(!U.length){ toastX('لا مستخدمين','info'); return; }
    if(!confirm('إرسال الإشعار إلى '+U.length+' مستخدم؟')) return; var btn=this; btn.disabled=true; $('ad8-ns').textContent='جارٍ الإرسال';
    try{ for(var i=0;i<U.length;i+=400){ var bt=db().batch(); U.slice(i,i+400).forEach(function(u){ bt.set(db().collection('user_notifications').doc(),{toUid:u._id,title:t,body:b,from:'إدارة المُلهِم',read:false,createdAt:firebase.firestore.FieldValue.serverTimestamp()}); }); await bt.commit(); }
      audit('notify_'+a,t+'، '+U.length); toastX('أُرسل الإشعار إلى '+U.length,'success'); $('ad8-nt').value=''; $('ad8-nb').value=''; $('ad8-ns').textContent='أُرسل إلى '+U.length+' مستخدم'; }catch(e){ toastX('تعذّر الإرسال','error'); $('ad8-ns').textContent='تعذّر الإرسال'; }
    btn.disabled=false; };
};
R8.msg8=async function(p,force){
  load(p); var U=(await usersAll(force)||[]).filter(function(u){ return u.role==='teacher'; }).sort(function(a,b){ return String(a.name||'').localeCompare(String(b.name||''),'ar'); });
  p.innerHTML='<div class="ad2-cd ad8-form"><h3 class="ad8-h">'+SV(P.msg)+' رسالة لمعلم</h3><label>المعلم<select id="ad8-mt"><option value="">اختر المعلم</option>'+U.map(function(u){ return '<option value="'+esc(u._id)+'">'+esc(u.name||u.email||u._id)+'</option>'; }).join('')+'</select></label>'
    +'<label>العنوان<input id="ad8-mh" maxlength="80" placeholder="مثال: شكراً على جهودك"></label><label>الرسالة<textarea id="ad8-mb" rows="5" maxlength="600"></textarea></label>'
    +'<div class="ad8-foot"><span>تصل لإشعاراته فقط.</span><button type="button" class="ad2-b ad2-b--p" id="ad8-msend">'+SV(P.send)+' أرسل</button></div></div>';
  $('ad8-msend').onclick=async function(){ var to=$('ad8-mt').value, t=$('ad8-mh').value.trim(), b=$('ad8-mb').value.trim(); if(!to||!t||!b){ toastX('اختر المعلم واكتب العنوان والرسالة','error'); return; }
    try{ await db().collection('user_notifications').add({toUid:to,title:t,body:b,from:'إدارة المُلهِم',read:false,createdAt:firebase.firestore.FieldValue.serverTimestamp()}); audit('message_teacher',t); toastX('أُرسلت الرسالة','success'); $('ad8-mh').value=''; $('ad8-mb').value=''; }catch(e){ toastX('تعذّر الإرسال','error'); } };
};

/* المسابقات الخاصة، الشخصيات المؤثرة، الإعدادات العامة */
R8.priv8=function(p){ p.innerHTML='<div class="ad2-cd ad8-launch">'+SV(P.lock,30)+'<b>المسابقات الخاصة</b><small>مسابقات تفتح برمز دخول أو قائمة بريد، للشركاء والمناسبات.</small><button type="button" class="ad2-b ad2-b--p" onclick="hhPrivAdmin&&hhPrivAdmin()">'+SV(P.open)+' افتح إدارة المسابقات الخاصة</button></div>'; };
R8.infl8=function(p){ p.innerHTML='<div class="ad2-cd ad8-launch">'+SV(P.star,30)+'<b>الشخصيات المؤثرة</b><small>تعديل الصور والأسماء يتم من الصفحة نفسها، وتظهر لك أزرار التعديل لأنك مدير.</small><button type="button" class="ad2-b ad2-b--p" onclick="hhNavigate&&hhNavigate(\'screen-influencers\')">'+SV(P.open)+' افتح الصفحة</button></div>'; };
R8.set8=async function(p){
  load(p); var c={}; try{ var d=await db().collection('platform_settings').doc('contact').get(); if(d.exists) c=d.data()||{}; }catch(e){}
  var f=[['email','البريد الإلكتروني','email','ltr'],['whatsapp','واتساب','tel','ltr'],['instagram','انستقرام','text','ltr'],['website','الموقع','text','ltr']];
  p.innerHTML='<div class="ad2-cd ad8-form"><h3 class="ad8-h">'+SV(P.msg)+' بيانات التواصل</h3><p class="ad8-p">تظهر في صفحة التواصل والدعم وتذييل المنصة.</p><div class="g2">'+f.map(function(x){ return '<label>'+x[1]+'<input id="ad8-s-'+x[0]+'" type="'+x[2]+'" dir="'+x[3]+'" value="'+esc(c[x[0]]||'')+'"></label>'; }).join('')+'</div>'
    +'<div class="ad8-foot"><span id="ad8-ss"></span><button type="button" class="ad2-b ad2-b--p" id="ad8-ssave">'+SV(P.save)+' احفظ</button></div></div>';
  $('ad8-ssave').onclick=async function(){ var o={}; f.forEach(function(x){ var v=$('ad8-s-'+x[0]).value.trim(); if(x[0]==='instagram') v=v.replace(/^@/,''); if(x[0]==='website') v=v.replace(/^https?:\/\//,''); o[x[0]]=v; });
    try{ await db().collection('platform_settings').doc('contact').set(o,{merge:true}); audit('settings_contact','بيانات التواصل'); $('ad8-ss').textContent='حُفظت'; toastX('حُفظت الإعدادات','success'); }catch(e){ $('ad8-ss').textContent='تعذّر الحفظ'; } };
};

/* ═══ الربط مع لوحة التحكم ═══ */
function show8(tab){
  var p=panel(); if(!p) return;
  var n=!!R8[tab]; p.style.display=n?'block':'none';
  var sc=$('screen-admin'); if(sc) sc.classList.toggle('ad8-on',n);
  if(!n) return;
  head8(tab); p.setAttribute('data-tab',tab);
  try{ R8[tab](p); }catch(e){ console.warn(e); p.innerHTML='<div class="ad2-cd">'+emp('تعذّر فتح الصفحة')+'</div>'; }
}
function hook8(){
  if(typeof window.adminTab!=='function'||!window.adminTab._ad2) return false; if(window.adminTab._ad8) return true;
  var o=window.adminTab; var w=function(tab){ var r=o.apply(this,arguments); try{ buildNav8(); }catch(e){} show8(tab); return r; }; w._ad2=true; w._ad8=true; w._ovHooked=true; window.adminTab=w; return true;
}
var _k=0, iv=setInterval(function(){ if(hook8()||++_k>60) clearInterval(iv); },400); hook8();
var _ss=window.showScreen;
if(typeof _ss==='function'){ window.showScreen=function(id){ var r=_ss.apply(this,arguments); if(id==='screen-admin') setTimeout(function(){ try{ buildNav8(); var a=document.querySelector('#screen-admin .mc-item.active[data-tab]'); if(a&&R8[a.dataset.tab]) show8(a.dataset.tab); }catch(e){} },120); return r; }; }

/* ═══ الأنماط ═══ */
var CSS=[
'#screen-admin .ad8-sr{display:flex;align-items:center;gap:8px;margin:4px 6px 12px;height:40px;border:1.5px solid var(--ad-line);border-radius:12px;background:var(--ad-card);padding:0 10px;color:var(--ad-mute);}',
'#screen-admin .ad8-sr input{flex:1;min-width:0;border:0;background:transparent;font-family:Cairo,sans-serif;font-weight:800;font-size:14px;color:var(--ad-ink);outline:0;}',
'#screen-admin .ad8-sr kbd{font-family:Cairo,sans-serif;font-size:10.5px;font-weight:800;border:1px solid var(--ad-line);border-radius:6px;padding:0 5px;color:var(--ad-mute);white-space:nowrap;}',
'#screen-admin .ad8-nav .mc-item .ad8-new{font-style:normal;margin-inline-start:auto;font-size:10.5px;font-weight:900;color:#fff;background:#C0562F;border-radius:20px;padding:0 8px;line-height:18px;}',
'#screen-admin .ad8-nav .mc-item .ad2-n:not([hidden])~.ad8-new{display:none;}',
'#screen-admin .ad8-nav .mc-item .ad2-n.w{background:#C0562F !important;color:#fff !important;}',
'#screen-admin.ad8-on #admin-ad8-panel{display:block;}',
'.ad8-alert{display:flex;align-items:center;gap:12px;background:#FCEEEC;border:1.5px solid #F2C9C2;color:#B3261E;border-radius:16px;padding:12px 16px;margin:0 0 16px;font-family:Cairo,sans-serif;font-weight:900;font-size:15px;}',
'.ad8-alert span{flex:1;} .ad8-alert button{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:6px;border:1.5px solid #B3261E;border-radius:10px;padding:6px 14px;font-weight:900;font-size:14px;}',
'.ad8-alert button:hover{background:#B3261E;color:#fff;}',
'.ad2-kp.ad8-kp5{grid-template-columns:repeat(5,minmax(0,1fr));margin-bottom:16px;} .ad2-kp.ad8-kp3{grid-template-columns:repeat(3,minmax(0,1fr));margin-bottom:16px;}',
'.ad8-k{border-bottom:4px solid var(--a) !important;} .ad8-k small.u{color:#23855A !important;} .ad8-k small.w{color:#C0562F !important;}',
'.ad8-k b .tx{font-size:22px;line-height:1.3;display:block;}',
'.ad8-live{display:inline-block;width:8px;height:8px;border-radius:50%;background:#23855A;margin-inline-end:6px;animation:ad8p 1.6s infinite;vertical-align:middle;} @keyframes ad8p{50%{box-shadow:0 0 0 5px rgba(35,133,90,.2)}}',
'.ad8-r2{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:16px;margin-bottom:16px;}',
'.ad8-bars{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:10px;align-items:end;height:220px;padding:10px 4px 0;border-bottom:1px solid var(--ad-line);}',
'.ad8-bc{display:flex;flex-direction:column;align-items:center;gap:4px;height:100%;} .ad8-bc .v{font-size:12px;font-weight:900;color:var(--ad-mute);min-height:16px;}',
'.ad8-bc .pr{flex:1;width:100%;display:flex;align-items:flex-end;justify-content:center;gap:5px;} .ad8-bc .pr i{width:34%;max-width:30px;border-radius:7px 7px 0 0;animation:ad8g .7s cubic-bezier(.2,.8,.2,1) both;}',
'.ad8-bc .pr i.g{background:linear-gradient(180deg,#8A1538,#5E0E26);} .ad8-bc .pr i.u{background:#C9A35A;} @keyframes ad8g{from{height:0 !important}}',
'.ad8-bc .d{font-size:12px;font-weight:800;color:var(--ad-mute);transform:translateY(22px);}',
'.ad8-lg{display:flex;gap:16px;margin-top:30px;font-size:13px;font-weight:800;color:var(--ad-mute);} .ad8-lg i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-inline-end:6px;} .ad8-lg i.g{background:#8A1538;} .ad8-lg i.u{background:#C9A35A;}',
'.ad8-qa .g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;}',
'.ad8-qa .g button{all:unset;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;gap:10px;border:1.5px solid var(--ad-line);border-radius:14px;padding:12px 14px;font-family:Cairo,sans-serif;font-weight:900;font-size:14.5px;color:var(--ad-head);transition:border-color .15s,transform .15s;}',
'.ad8-qa .g button:hover{border-color:var(--ad-gold);transform:translateY(-2px);} .ad8-qa .g i{width:32px;height:32px;border-radius:10px;background:var(--ad-cream);color:var(--ad-m3);display:grid;place-items:center;flex-shrink:0;}',
'.ad8-tabs{display:flex;gap:4px;border-bottom:2px solid var(--ad-line);margin:0 0 14px;overflow-x:auto;scrollbar-width:none;flex:1;min-width:0;} .ad8-tabs::-webkit-scrollbar{display:none;}',
'.ad8-tabs button{all:unset;cursor:pointer;flex:0 0 auto;padding:10px 14px;font-family:Cairo,sans-serif;font-weight:900;font-size:14.5px;color:var(--ad-mute);border-bottom:3px solid transparent;margin-bottom:-2px;display:inline-flex;align-items:center;gap:6px;}',
'.ad8-tabs button.on{color:var(--ad-head);border-bottom-color:var(--ad-m3);} .ad8-tabs em{font-style:normal;font-size:11.5px;background:var(--ad-cream);border-radius:20px;padding:0 8px;color:var(--ad-gold7);}',
'.ad8-fl{display:flex;align-items:flex-end;gap:10px;flex-wrap:wrap;} .ad8-fl select{height:38px;border:1.5px solid var(--ad-line);border-radius:10px;background:var(--ad-card);font-family:Cairo,sans-serif;font-weight:800;color:var(--ad-ink);padding:0 10px;margin-bottom:14px;}',
'.ad8-body{padding:6px 8px !important;} .ad8-h{display:flex;align-items:center;gap:8px;margin:6px 8px 12px;font-family:Cairo,sans-serif;font-size:17px;font-weight:900;color:var(--ad-head);}',
'.ad8-rows{display:grid;gap:0;} .ad8-row{display:flex;align-items:center;gap:12px;padding:12px;border-bottom:1px dashed var(--ad-line);} .ad8-row:last-child{border-bottom:0;}',
'.ad8-row .nb,.ad8-tc .ic{width:40px;height:40px;border-radius:11px;background:var(--c);color:#fff;display:grid;place-items:center;font-weight:900;flex-shrink:0;}',
'.ad8-row .tx,.ad8-tc .tx{flex:1;min-width:0;} .ad8-row b,.ad8-tc b{display:block;font-family:Cairo,sans-serif;font-size:15.5px;font-weight:900;color:var(--ad-head);} .ad8-row small,.ad8-tc small{font-size:12.5px;font-weight:700;color:var(--ad-mute);}',
'.ad8-sw{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:8px;font-family:Cairo,sans-serif;font-weight:800;font-size:13px;color:var(--ad-mute);white-space:nowrap;}',
'.ad8-sw i{width:40px;height:23px;border-radius:20px;background:var(--ad-line);position:relative;transition:background .2s;} .ad8-sw i::after{content:"";position:absolute;top:3px;right:3px;width:17px;height:17px;border-radius:50%;background:#fff;transition:right .2s;box-shadow:0 1px 3px rgba(0,0,0,.2);}',
'.ad8-sw.on{color:#23855A;} .ad8-sw.on i{background:#23855A;} .ad8-sw.on i::after{right:20px;} .ad8-sw:focus-visible{outline:3px solid var(--ad-gold);outline-offset:3px;border-radius:12px;}',
'.ad8-tg{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;padding:8px;} .ad8-tc{display:flex;align-items:center;gap:12px;border:1.5px solid var(--ad-line);border-radius:14px;padding:12px;}',
'.ad8-foot{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:12px 8px 6px;border-top:1px solid var(--ad-line);margin-top:6px;font-size:13px;font-weight:800;color:var(--ad-mute);} .ad8-foot span{flex:1;min-width:200px;}',
'.ad8-tbl{overflow-x:auto;} .ad8-tbl table{width:100%;border-collapse:separate;border-spacing:0;font-family:Cairo,sans-serif;}',
'.ad8-tbl th{background:var(--ad-cream);color:var(--ad-mute);font-size:12.5px;font-weight:900;text-align:start;padding:10px 12px;white-space:nowrap;} .ad8-tbl th:first-child{border-radius:0 10px 10px 0;} .ad8-tbl th:last-child{border-radius:10px 0 0 10px;}',
'.ad8-tbl td{padding:11px 12px;border-bottom:1px solid var(--ad-line);font-size:14px;font-weight:800;color:var(--ad-ink);vertical-align:middle;} .ad8-tbl td b{display:block;font-weight:900;color:var(--ad-head);} .ad8-tbl td small{display:block;font-size:12px;font-weight:700;color:var(--ad-mute);} .ad8-tbl td small.rs{color:#B3261E;}',
'.ad8-tbl td.ac{white-space:nowrap;text-align:end;} .ad8-tbl td.ac .ad2-b{margin-inline-start:6px;height:34px;padding:0 12px;font-size:13px;} .ad8-del{width:34px;padding:0 !important;justify-content:center;color:#B3261E !important;}',
'.ad8-pill{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:900;border-radius:20px;padding:2px 10px;background:var(--ad-soft);color:var(--ad-mute);white-space:nowrap;} .ad8-pill.g{background:#EAF5EF;color:#23855A;} .ad8-pill.y{background:#FBF1DA;color:#8A6D2E;} .ad8-pill.g i{width:7px;height:7px;border-radius:50%;background:#23855A;}',
'.ad8-emp{display:grid;justify-items:center;gap:6px;padding:34px 10px;color:var(--ad-mute);text-align:center;} .ad8-emp b{font-family:Cairo,sans-serif;font-size:16px;font-weight:900;color:var(--ad-head);} .ad8-emp small{font-size:13px;font-weight:700;}',
'.ad8-load{display:flex;align-items:center;justify-content:center;gap:10px;padding:50px 0;font-family:Cairo,sans-serif;font-weight:800;color:var(--ad-mute);} .ad8-load i{width:20px;height:20px;border-radius:50%;border:3px solid var(--ad-line);border-top-color:var(--ad-gold);animation:ad8s 1s linear infinite;} @keyframes ad8s{to{transform:rotate(360deg)}}',
'.ad8-pg3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;}',
'.ad8-prog{background:var(--ad-card);border:1.5px solid var(--ad-line);border-radius:18px;overflow:hidden;display:flex;flex-direction:column;}',
'.ad8-prog .hd{position:relative;background:var(--c);color:#fff;padding:16px;min-height:96px;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;} .ad8-prog .hd img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.35;} .ad8-prog .hd b,.ad8-prog .hd small{position:relative;} .ad8-prog .hd b{font-family:Cairo,sans-serif;font-size:17px;font-weight:900;} .ad8-prog .hd small{font-size:12.5px;font-weight:700;opacity:.9;}',
'.ad8-prog .st{display:grid;grid-template-columns:repeat(3,1fr);padding:12px 14px 6px;text-align:center;} .ad8-prog .st span{font-size:12px;font-weight:800;color:var(--ad-mute);} .ad8-prog .st b{display:block;font-family:Cairo,sans-serif;font-size:22px;font-weight:900;color:var(--ad-head);} .ad8-prog .st .w b{color:#C0562F;}',
'.ad8-prog .br{height:6px;border-radius:6px;background:var(--ad-soft);margin:4px 14px 0;overflow:hidden;} .ad8-prog .br i{display:block;height:100%;background:linear-gradient(90deg,#B8924A,#E6CE8E);}',
'.ad8-prog .ac{display:flex;gap:8px;padding:12px 14px 14px;margin-top:auto;} .ad8-prog .ac .ad2-b{flex:1;justify-content:center;}',
'.ad8-form{display:grid;gap:12px;max-width:760px;} .ad8-form label{display:flex;flex-direction:column;gap:6px;font-family:Cairo,sans-serif;font-size:13px;font-weight:800;color:var(--ad-mute);}',
'.ad8-form input,.ad8-form textarea,.ad8-form select{border:1.5px solid var(--ad-line);border-radius:12px;background:var(--ad-cream);padding:10px 12px;font-family:Cairo,sans-serif;font-size:15px;font-weight:700;color:var(--ad-ink);}',
'.ad8-form input:focus,.ad8-form textarea:focus,.ad8-form select:focus{outline:0;border-color:var(--ad-gold);} .ad8-form .g2{display:grid;grid-template-columns:1fr 1fr;gap:12px;} .ad8-p{margin:0;font-size:13.5px;font-weight:700;color:var(--ad-mute);}',
'.ad8-aud{display:flex;gap:8px;flex-wrap:wrap;} .ad8-aud label{flex-direction:row;} .ad8-aud input{position:absolute;opacity:0;} .ad8-aud span{border:1.5px solid var(--ad-line);border-radius:20px;padding:6px 16px;font-weight:900;color:var(--ad-ink);cursor:pointer;} .ad8-aud input:checked+span{background:var(--ad-m);border-color:var(--ad-m);color:#fff;} .ad8-aud input:focus-visible+span{outline:3px solid var(--ad-gold);}',
'.ad8-launch{display:grid;justify-items:center;gap:10px;text-align:center;padding:40px 20px !important;color:var(--ad-m3);} .ad8-launch b{font-family:Cairo,sans-serif;font-size:20px;font-weight:900;color:var(--ad-head);} .ad8-launch small{font-size:14px;font-weight:700;color:var(--ad-mute);max-width:440px;line-height:1.8;}',
'.ad8-gate-note{display:flex;align-items:center;gap:10px;background:var(--ad-cream);border:1.5px solid var(--ad-line);border-radius:14px;padding:10px 14px;margin:0 0 14px;font-family:Cairo,sans-serif;font-weight:800;font-size:13.5px;color:var(--ad-head);}',
'@media (max-width:1100px){ .ad2-kp.ad8-kp5{grid-template-columns:repeat(3,minmax(0,1fr));} .ad8-qa .g{grid-template-columns:repeat(2,minmax(0,1fr));} .ad8-pg3,.ad8-tg{grid-template-columns:repeat(2,minmax(0,1fr));} }',
'@media (max-width:760px){ .ad2-kp.ad8-kp5,.ad2-kp.ad8-kp3{grid-template-columns:repeat(2,minmax(0,1fr));} .ad8-r2{grid-template-columns:minmax(0,1fr);} .ad8-pg3,.ad8-tg,.ad8-form .g2{grid-template-columns:minmax(0,1fr);} .ad8-bars{height:170px;gap:4px;} .ad8-bc .d{font-size:10px;} .ad8-alert{flex-wrap:wrap;} }',
'@media (max-width:760px){ .ad8-tbl thead{display:none;} .ad8-tbl table,.ad8-tbl tbody{display:block;} .ad8-tbl tr{display:grid;grid-template-columns:1fr 1fr;gap:4px 12px;padding:12px 4px;border-bottom:1px solid var(--ad-line);} .ad8-tbl td{border:0;padding:2px 0;font-size:13.5px;min-width:0;overflow-wrap:anywhere;} .ad8-tbl td[data-l]:not(:first-child)::before{content:attr(data-l);display:block;font-size:11px;font-weight:800;color:var(--ad-mute);} .ad8-tbl td:first-child{grid-column:1/-1;} .ad8-tbl td.ac{grid-column:1/-1;text-align:start;} .ad8-tbl td.ac::before{display:none !important;} .ad8-tbl td.ac .ad2-b{margin:0 0 0 6px;} .ad8-tabs button{padding:10px;font-size:13.5px;} }',
'body.dark-mode #screen-admin .ad2-ph h1{color:#F3E6CF !important;} body.dark-mode #screen-admin .ad2-ph p,body.dark-mode #screen-admin .ad2-cr{color:#CDBFA8 !important;} body.dark-mode #screen-admin .ad2-cr b{color:#E6CE8E !important;} body.dark-mode #screen-admin .ad8-tabs{border-color:rgba(255,255,255,.14);} body.dark-mode #screen-admin .ad8-tabs button{color:#CDBFA8;} body.dark-mode #screen-admin .ad8-tabs button.on{color:#F3E6CF;border-bottom-color:#C9A35A;}',
'body.dark-mode #screen-admin .ad8-alert{background:#3A1512;border-color:#6A2A22;color:#FF9C92;} body.dark-mode #screen-admin .ad8-pill.g{background:#173226;} body.dark-mode #screen-admin .ad8-pill.y{background:#3A2A10;color:#E6CE8E;}',
'@media (prefers-reduced-motion:reduce){ .ad8-bc .pr i,.ad8-live,.ad8-load i{animation:none !important;} }'
].join('\n');
var st=document.createElement('style'); st.id='hh-admin8-css'; st.textContent=CSS; (document.head||document.documentElement).appendChild(st);
})();
