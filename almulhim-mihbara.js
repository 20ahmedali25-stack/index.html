/* ============================================================
   المُلهم التعليمي، المحبرة (zzzzzzco)
   أربعة تبويبات: الحصة، الطلاب، الدرجات، التقارير، ونافذة إعدادات
   الأسماء تُحفظ في المنصة (classroom_students.studentName)
   التسجيلات في student_records/{id}.mh، والدرجات في mhGrades، والملاحظة في mhNote، والغياب في mhAtt
   المعايير والسلوكيات وأعمدة الدرجات وبيانات المدرسة في users/{uid}.mh2
   ============================================================ */
(function(){
'use strict';
if(window.hhMhOpen) return;

/* ── أدوات عامة ── */
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function $(id){ return document.getElementById(id); }
function toast(m,k){ try{ if(typeof window.toast==='function'){ window.toast(m,k||'info'); return; } }catch(e){} }
function fdb(){ return firebase.firestore(); }
function FV(){ return firebase.firestore.FieldValue; }
function uid(){ try{ return (firebase.auth().currentUser||{}).uid||((typeof currentUser!=='undefined'&&currentUser)?currentUser.uid:''); }catch(e){ return ''; } }
function todayISO(d){ d=d||new Date(); return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2); }
var MONTHS=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
function clone(o){ return JSON.parse(JSON.stringify(o)); }
function arN(n,one,two,few,many){ return n===1?one:n===2?two:(n>2&&n<11)?n+' '+few:n+' '+many; }

/* ── أيقونات ── */
var I={
  class:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0113 0"/><path d="M16 4.5a3.5 3.5 0 010 7M21.5 20a6.5 6.5 0 00-4-6"/>',
  grade:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  rep:'<path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
  dice:'<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.3" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/>',
  timer:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/>',
  group:'<circle cx="6" cy="7" r="2.5"/><circle cx="18" cy="7" r="2.5"/><circle cx="6" cy="17" r="2.5"/><circle cx="18" cy="17" r="2.5"/>',
  att:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>',
  plus:'<path d="M12 5v14M5 12h14"/>', x:'<path d="M18 6L6 18M6 6l12 12"/>', trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',
  file:'<path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z"/><path d="M14 3v6h6"/>',
  paste:'<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/>',
  cert:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M7 9h10M7 12h6"/><circle cx="17" cy="19" r="2.5"/>',
  letter:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  month:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  dl:'<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>', undo:'<path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 010 12h-3"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/>',
  print:'<path d="M6 9V3h12v6M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="7"/>'
};
function sv(k){ return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+I[k]+'</svg>'; }

/* ── الإعدادات الافتراضية ── */
var DEF={
  crit:[{k:'part',t:'المشاركة',c:'#2F6A4E'},{k:'beh',t:'السلوك',c:'#8A1538'},{k:'book',t:'الأدوات',c:'#B8924A'},{k:'inter',t:'التعاون',c:'#1F4E79'}],
  pos:['يجيب عن الأسئلة','يطرح سؤالاً عميقاً','يساعد زميله','ينجز المهمة بإتقان','يلتزم بالتعليمات','يحضر أدواته'],
  neg:[['يتحدث أثناء الشرح',1],['لم يحضر الكتاب',1],['لم يسلّم الواجب',1],['استخدام الجوال',2],['السخرية من زميل',2],['الإساءة للمعلم',3]],
  cols:[{k:'q1',t:'اختبار قصير',m:10},{k:'task',t:'مهمة أدائية',m:10},{k:'proj',t:'مشروع',m:20}],
  school:'', subject:'', teacher:''
};
var M={demo:false,why:'',classes:[],cur:'',st:[],loading:false,err:false,set:clone(DEF)};
var S={tab:'class',crit1:'part',mode:'rec',groups:0,timer:0,tmi:null,rep:'month',rs:0,tpl:'classic',log:[],setTab:'crit'};
try{ var t0=localStorage.getItem('hh_mh2_tab'); if(t0&&/^(class|students|grades|reports)$/.test(t0)) S.tab=t0; }catch(e){}

function C(){ return M.classes.filter(function(c){ return c.k===M.cur; })[0]||{k:'',n:''}; }
function crit(k){ return M.set.crit.filter(function(c){ return c.k===k; })[0]||M.set.crit[0]||{k:'part',t:'المشاركة',c:'#2F6A4E'}; }
function sum(s,k){ return s.ev.filter(function(e){ return !k||e.c===k; }).reduce(function(a,e){ return a+e.v; },0); }
function initials(n){ return String(n||'').trim().replace(/^(أ\.|ال)/,'').charAt(0)||'؟'; }
function pct(s){ var g=0,m=0; M.set.cols.forEach(function(c){ var v=s.gr[c.k]; if(v!=null&&v!==''){ g+=+v; m+=c.m; } }); return m?Math.round(100*g/m):null; }
function lvl(p){ return p==null?['لم يُرصد','n']:p>=90?['ممتاز','g']:p>=75?['جيد جداً','g']:p>=60?['جيد','a']:['يحتاج دعماً','r']; }
function isPh(n){ return !n||/^\s*طالب\s*\d*\s*$/.test(String(n)); }

/* ── إعدادات المعلم ── */
function loadSettings(){
  var s=null; try{ s=JSON.parse(localStorage.getItem('hh_mh2_set')||'null'); }catch(e){}
  try{ var p=window.currentUserData||window._hhUserDoc||{}; if(p.mh2) s=p.mh2; }catch(e){}
  applySet(s);
  if(uid()) fdb().collection('users').doc(uid()).get().then(function(d){ var x=d.exists?(d.data()||{}):{}; if(x.mh2){ applySet(x.mh2); render(); }
    else { var p2=x; if(!M.set.school&&(p2.school||p2.schoolName)) M.set.school=p2.school||p2.schoolName; if(!M.set.subject&&p2.subject) M.set.subject=p2.subject; } }).catch(function(){});
}
function applySet(s){
  var o=clone(DEF);
  if(s&&typeof s==='object'){ ['crit','pos','neg','cols'].forEach(function(k){ if(Array.isArray(s[k])&&s[k].length) o[k]=s[k]; }); ['school','subject','teacher'].forEach(function(k){ if(typeof s[k]==='string') o[k]=s[k]; }); }
  if(!o.teacher){ try{ if(typeof currentUser!=='undefined'&&currentUser&&currentUser.name) o.teacher=String(currentUser.name); }catch(e){} }
  M.set=o; if(!o.crit.some(function(c){ return c.k===S.crit1; })) S.crit1=o.crit[0].k;
}
var saveT=null;
function saveSettings(){ try{ localStorage.setItem('hh_mh2_set',JSON.stringify(M.set)); }catch(e){}
  clearTimeout(saveT); saveT=setTimeout(function(){ if(!uid()) return; fdb().collection('users').doc(uid()).set({mh2:M.set},{merge:true}).catch(function(){ toast('تعذّر حفظ الإعدادات في الحساب','error'); }); },700); }

/* ── الحفظ في المنصة ── */
function rec(s,data){ if(M.demo||!s.id||!uid()) return Promise.resolve(); data.classCode=M.cur; data.teacherId=uid();
  return fdb().collection('student_records').doc(s.id).set(data,{merge:true}).catch(function(e){ console.warn('mh save',e); toast('تعذّر الحفظ، تحقّق من الاتصال','error'); }); }
function saveEv(s,o,remove){ return rec(s,{mh:remove?FV().arrayRemove(o):FV().arrayUnion(o)}); }
function saveGr(s){ var g={}; Object.keys(s.gr).forEach(function(k){ g[k]=s.gr[k]==null?FV().delete():s.gr[k]; }); g.at=Date.now(); return rec(s,{mhGrades:g}); }
function saveNote(s){ return rec(s,{mhNote:s.note||''}); }
function saveAtt(s){ var o={}; o[todayISO()]=s.abs?'a':FV().delete(); return rec(s,{mhAtt:o}); }
function saveName(s){ if(M.demo||!s.id) return; fdb().collection('classroom_students').doc(s.id).update({studentName:s.name}).catch(function(){ toast('تعذّر حفظ الاسم','error'); }); }

/* ── التحميل ── */
var FN=['عبدالله','محمد','حمد','خليفة','سعود','فهد','جاسم','ناصر','يوسف','علي','عمر','خالد','راشد','سلطان','مبارك','تميم','حسن','أحمد','سالم','منصور','عيسى','فيصل','ماجد','بدر','نايف','طلال','هزاع','غانم','زايد','مشعل'];
var LN=['الكعبي','المري','الهاجري','السليطي','النعيمي','العبدالله','الكواري','المهندي','الدوسري','الخاطر'];
function demoClass(n,seed){ var a=[]; for(var i=0;i<n;i++) a.push({id:'',num:i+1,name:FN[(i*7+seed)%FN.length]+' '+LN[(i*3+seed)%LN.length],abs:false,ev:[],gr:{},note:''}); return a; }
var DEMO={};
function makeDemo(why){
  M.demo=true; M.why=why||''; M.classes=[{k:'d1',n:'السابع 2',c:18},{k:'d2',n:'الثامن 1',c:14}];
  if(!DEMO.d1){ DEMO.d1=demoClass(18,1); DEMO.d2=demoClass(14,4);
    var st=DEMO.d1, d=todayISO(); [[0,'part',1],[0,'part',1],[1,'beh',-1],[2,'inter',1],[3,'part',1],[3,'beh',1],[5,'book',-1],[7,'part',1],[7,'part',1],[7,'inter',1]].forEach(function(x,i){ st[x[0]].ev.push({c:x[1],v:x[2],t:x[2]>0?'شارك بإجابة':'لم يحضر الكتاب',date:d,at:Date.now()-i*36e5}); });
    st[0].gr={q1:9,proj:18}; st[1].gr={q1:5}; st[2].gr={q1:8,task:7}; st[3].gr={q1:10,task:9,proj:19}; }
  if(!DEMO[M.cur]) M.cur='d1';
  M.st=DEMO[M.cur]; M.loading=false;
}
async function loadClasses(){
  loadSettings();
  if(!uid()){ makeDemo('login'); render(); return; }
  M.loading=true; render();
  try{
    var qs=(typeof hhClsFetchMine==='function')?await hhClsFetchMine():await fdb().collection('classrooms').where('teacherId','==',uid()).get();
    var r=[]; qs.forEach(function(d){ var c=d.data()||{}; if(c.active===false||c.archived) return; r.push({k:d.id,n:c.className||d.id,c:c.studentCount||0,school:c.schoolName||''}); });
    r.sort(function(a,b){ return String(a.n).localeCompare(String(b.n),'ar'); });
    if(!r.length){ makeDemo('none'); render(); return; }
    M.demo=false; M.why=''; M.classes=r;
    if(!M.set.school){ var sc=r.filter(function(x){ return x.school; })[0]; if(sc) M.set.school=sc.school; }
    var pref=''; try{ pref=localStorage.getItem('hh_mh_cls')||''; }catch(e){}
    M.cur=r.some(function(x){ return x.k===pref; })?pref:r[0].k;
    await loadClass(M.cur);
  }catch(e){ console.warn('mihbara classes',e); makeDemo('err'); render(); }
}
async function loadClass(code){
  if(M.demo){ M.cur=code; M.st=DEMO[code]||[]; render(); return; }
  M.cur=code; M.loading=true; M.err=false; M.st=[]; S.log=[]; render();
  try{
    var qs=await fdb().collection('classroom_students').where('classCode','==',code).where('active','==',true).get();
    var st=[]; qs.forEach(function(d){ var x=d.data()||{}; var n=parseInt(x.num,10); if(!(n>0)){ var m=String(x.studentName||'').match(/(\d+)/); n=m?+m[1]:0; } st.push({id:d.id,num:n,name:String(x.studentName||'').trim(),abs:false,ev:[],gr:{},note:''}); });
    st.sort(function(a,b){ return (a.num||999)-(b.num||999); }); st.forEach(function(s,i){ if(!s.num) s.num=i+1; });
    /* نقل الأسماء المحفوظة على هذا الجهاز سابقاً إلى المنصة */
    var loc={}; try{ loc=JSON.parse(localStorage.getItem('hh_cls_local_'+code)||'{}')||{}; }catch(e){}
    var moved=[]; st.forEach(function(s){ var ln=String(loc[s.num]||'').trim(); if(isPh(s.name)&&ln){ s.name=ln; moved.push(s); } if(isPh(s.name)) s.name='طالب '+s.num; });
    if(moved.length){ try{ var b=fdb().batch(); moved.forEach(function(s){ b.update(fdb().collection('classroom_students').doc(s.id),{studentName:s.name}); }); await b.commit(); toast('نُقلت '+arN(moved.length,'اسم طالب واحد','اسما طالبين','أسماء','اسماً')+' من جهازك إلى حسابك','success'); }catch(e){ console.warn('mh names',e); } }
    var recs=await Promise.all(st.map(function(s){ return fdb().collection('student_records').doc(s.id).get().catch(function(){ return null; }); }));
    var d=todayISO();
    recs.forEach(function(r,i){ if(!r||!r.exists) return; var x=r.data()||{}, s=st[i];
      (x.mh||[]).forEach(function(e){ var v=typeof e.v==='number'?e.v:(e.p?1:-(e.lvl||1)); s.ev.push({c:e.c,v:v,t:e.txt||'',date:e.date||'',at:e.at||0,_o:e}); });
      s.ev.sort(function(a,b){ return (a.at||0)-(b.at||0); });
      var g=x.mhGrades||{}; Object.keys(g).forEach(function(k){ if(k!=='at'&&g[k]!=null) s.gr[k]=g[k]; });
      s.note=x.mhNote||''; s.abs=!!(x.mhAtt&&x.mhAtt[d]==='a'); });
    if(M.cur!==code) return;
    M.st=st; M.loading=false;
    var c=C(); if(c) c.c=st.length;
  }catch(e){ console.warn('mihbara class',e); M.loading=false; M.err=true; }
  render();
}

/* ── الإطار ── */
var TABS=[['class','الحصة','class'],['students','الطلاب','users'],['grades','الدرجات','grade'],['reports','التقارير','rep']];
function frame(){
  var sel=$('mh-cls');
  if(sel){ var h=M.classes.map(function(c){ return '<option value="'+esc(c.k)+'"'+(c.k===M.cur?' selected':'')+'>'+esc(c.n)+(c.c?'، '+c.c+' طالباً':'')+'</option>'; }).join('')+(M.demo?'':'<option value="__new">+ شعبة جديدة</option>');
    if(sel.dataset.h!==h){ sel.dataset.h=h; sel.innerHTML=h; } sel.value=M.cur; }
  var tb=$('mh-tabs');
  if(tb){ var t=TABS.map(function(x){ return '<button type="button" role="tab" aria-selected="'+(S.tab===x[0])+'" class="'+(S.tab===x[0]?'on':'')+'" data-mtab="'+x[0]+'">'+x[1]+'</button>'; }).join(''); if(tb.dataset.h!==t){ tb.dataset.h=t; tb.innerHTML=t; } }
}
function demoNote(){
  if(!M.demo) return '';
  var t=M.why==='login'?'عينة بأسماء وهمية. سجّل الدخول لتظهر شعبك.':M.why==='none'?'عينة بأسماء وهمية. أنشئ شعبتك الأولى لتبدأ.':'تعذّر تحميل شعبك الآن، فهذه عينة مؤقتة.';
  var b=M.why==='login'?'<button type="button" class="mx-b p s" data-act="login">تسجيل الدخول</button>':M.why==='none'?'<button type="button" class="mx-b p s" data-act="newcls">أنشئ شعبة</button>':'';
  return '<div class="mx-note"><span>'+t+'</span>'+b+'</div>';
}
function render(){
  if(!$('hh-mh')) return;
  frame();
  var app=$('mh-app'); if(!app) return;
  if(M.loading){ app.innerHTML='<div class="mx-empty">جارٍ تحميل الشعبة…</div>'; return; }
  if(M.err){ app.innerHTML='<div class="mx-empty">تعذّر تحميل الشعبة.<button type="button" class="mx-b p" data-act="reload">أعد المحاولة</button></div>'; return; }
  if(!M.st.length&&S.tab!=='students'){ app.innerHTML=demoNote()+'<div class="mx-empty"><b>لا طلاب في هذه الشعبة بعد</b><button type="button" class="mx-b p" data-act="gostudents">'+sv('plus')+'أضف الطلاب</button></div>'; return; }
  app.innerHTML=demoNote()+({class:vClass,students:vStudents,grades:vGrades,reports:vReports}[S.tab]||vClass)();
  if(S.tab==='reports'&&S.rep==='letter'){ var le=$('mh-letter'); if(le) le.oninput=function(){ S.letterTxt=le.innerText; S.letterFor=S.rs; }; }
}
function go(tab){ S.tab=tab; try{ localStorage.setItem('hh_mh2_tab',tab); }catch(e){} render(); var r=$('hh-mh'); if(r) r.scrollTo({top:0}); try{ if(window.hhShellApply) hhShellApply(); }catch(e){} }

/* ── الحصة ── */
function fmt(t){ var m=Math.floor(t/60), s=t%60; return m+':'+(s<10?'0':'')+s; }
function vClass(){
  var st=M.st, rec=S.mode==='rec';
  var h='<div class="mx-bar mx-cb"><div class="mx-crits">'+M.set.crit.map(function(c){ return '<button type="button" class="mx-chip'+(rec&&S.crit1===c.k?' on':'')+'" style="--c:'+esc(c.c)+'" data-crit="'+esc(c.k)+'"><i></i>'+esc(c.t)+'</button>'; }).join('')+'</div>'
    +'<span class="mx-sp"></span><div class="mx-tools">'
    +(S.timer?'<span class="mx-timer" id="mh-tm">'+fmt(S.timer)+'</span>':'')
    +'<button type="button" class="mx-b s'+(S.mode==='att'?' on':'')+'" data-act="att">'+sv('att')+'الحضور</button>'
    +'<button type="button" class="mx-b s" data-act="pick">'+sv('dice')+'عشوائي</button>'
    +'<button type="button" class="mx-b s'+(S.timer?' on':'')+'" data-act="timer">'+sv('timer')+(S.timer?'إيقاف':'مؤقت')+'</button>'
    +'<button type="button" class="mx-b s'+(S.groups?' on':'')+'" data-act="groups">'+sv('group')+(S.groups?S.groups+' مجموعات':'مجموعات')+'</button>'
    +(S.log.length?'<button type="button" class="mx-b s" data-act="undo">'+sv('undo')+'تراجع</button>':'')+'</div></div>';
  var abs=st.filter(function(s){ return s.abs; }).length;
  h+='<div class="mx-seats">'+st.map(function(s,i){ var v=sum(s); var g=S.groups?' g'+((i%S.groups)+1):'';
    return '<div class="mx-st'+(s.abs?' abs':'')+g+'" data-i="'+i+'" role="button" tabindex="0" aria-label="'+esc(s.name)+'"><span class="no">'+s.num+'</span><span class="av">'+esc(initials(s.name))+'</span><b>'+esc(s.name)+'</b><span class="pt'+(v<0?' neg':'')+'"><bdi dir="ltr">'+(v>0?'+':'')+v+'</bdi></span></div>'; }).join('')+'</div>';
  h+='<div class="mx-hint">'+(S.mode==='att'?'اضغط الطالب الغائب'+(abs?'، الغائبون اليوم '+abs:'')+'، ثم اضغط «الحضور» للعودة.':'اضغط الطالب لنقطة '+esc(crit(S.crit1).t)+'، أو اضغط مطولاً للخيارات.')+'</div>';
  return h;
}
function addEv(i,c,v,t){
  var s=M.st[i]; if(!s) return;
  var o={c:c,p:v>0,v:v,lvl:v<0?-v:0,txt:t,date:todayISO(),at:Date.now()};
  s.ev.push({c:c,v:v,t:t,date:o.date,at:o.at,_o:o}); S.log.push(i); saveEv(s,o);
  render(); var el=document.querySelector('#hh-mh .mx-st[data-i="'+i+'"]'); if(el){ var f=document.createElement('span'); f.className='fl'+(v<0?' n':''); f.textContent=(v>0?'+':'')+v; f.dir='ltr'; el.appendChild(f); }
}
function undo(){ var i=S.log.pop(); if(i==null) return; var s=M.st[i]; if(!s||!s.ev.length){ render(); return; } var e=s.ev.pop(); saveEv(s,e._o,true); render(); toast('تم التراجع'); }

/* ── الطبقات ── */
function layer(html){ var L=$('mh-layer'); if(!L) return null; L.innerHTML='<div class="mx-scrim" id="mh-sc"><div class="mx-drawer" role="dialog">'+html+'</div></div>'; return L; }
function closeLayer(){ var L=$('mh-layer'); if(L){ L.innerHTML=''; L.onclick=null; L.oninput=null; L.onchange=null; } }
function quick(i){
  var s=M.st[i]; if(!s) return; var T='pos';
  var L=layer('<h3>'+esc(s.name)+'<button type="button" class="mx-ib x" data-close aria-label="إغلاق">'+sv('x')+'</button></h3>'
   +'<div class="mx-seg"><button type="button" class="on" data-q="pos">إيجابي</button><button type="button" data-q="neg">يحتاج متابعة</button></div><div class="mx-qk" id="mh-qk"></div>'
   +'<h4>ملاحظة خاصة</h4><textarea id="mh-qn" style="min-height:80px" placeholder="تظهر في ملف الطالب فقط">'+esc(s.note)+'</textarea>'
   +'<div class="mx-acts"><button type="button" class="mx-b p" data-file="'+i+'">'+sv('file')+'افتح الملف</button></div>');
  function fill(){ $('mh-qk').innerHTML=(T==='pos'?M.set.pos.map(function(x){ return '<button type="button" data-qp="'+esc(x)+'">'+esc(x)+'</button>'; }):M.set.neg.map(function(x){ return '<button type="button" class="n" data-qn="'+esc(x[0])+'" data-qv="'+(+x[1]||1)+'">'+esc(x[0])+(+x[1]>1?' <em><bdi dir="ltr">-'+x[1]+'</bdi></em>':'')+'</button>'; })).join(''); }
  fill();
  function keepNote(){ var n=$('mh-qn'); if(n&&n.value!==s.note){ s.note=n.value; saveNote(s); } }
  L.onclick=function(e){ var t=e.target.closest('button'); if(e.target.id==='mh-sc'||(t&&t.hasAttribute('data-close'))){ keepNote(); closeLayer(); render(); return; } if(!t) return;
    if(t.dataset.q){ T=t.dataset.q; L.querySelectorAll('[data-q]').forEach(function(x){ x.classList.toggle('on',x===t); }); fill(); }
    else if(t.dataset.qp){ keepNote(); closeLayer(); addEv(i,S.crit1,1,t.dataset.qp); toast('+1 '+s.name); }
    else if(t.dataset.qn){ keepNote(); closeLayer(); var negC=M.set.crit.some(function(c){ return c.k==='beh'; })?'beh':S.crit1; addEv(i,negC,-(+t.dataset.qv||1),t.dataset.qn); toast('سُجّلت ملاحظة'); }
    else if(t.dataset.file){ keepNote(); openFile(+t.dataset.file); } };
}
function openFile(i){
  var s=M.st[i]; if(!s) return; var p=pct(s), l=lvl(p);
  var L=layer('<h3>'+esc(s.name)+'<button type="button" class="mx-ib x" data-close aria-label="إغلاق">'+sv('x')+'</button></h3>'
   +'<div class="mx-pills">'+M.set.crit.map(function(c){ var x=sum(s,c.k); return '<span class="mx-pill '+(x<0?'r':x>0?'g':'n')+'">'+esc(c.t)+' <bdi dir="ltr">'+(x>0?'+':'')+x+'</bdi></span>'; }).join('')+'<span class="mx-pill '+l[1]+'">'+(p==null?l[0]:p+'%، '+l[0])+'</span></div>'
   +'<h4>السجل</h4><div class="mx-tl">'+(s.ev.length?s.ev.slice().reverse().slice(0,40).map(function(e){ return '<div><span class="mx-pill '+(e.v>0?'g':'r')+'"><bdi dir="ltr">'+(e.v>0?'+':'')+e.v+'</bdi></span>'+esc(e.t||crit(e.c).t)+'<small>'+esc(crit(e.c).t)+(e.date?'، '+esc(e.date.slice(5).split('-').reverse().join('/')):'')+'</small></div>'; }).join(''):'<div class="mx-muted">لا تسجيلات بعد</div>')+'</div>'
   +'<h4>ملاحظة خاصة</h4><textarea id="mh-fn" style="min-height:90px">'+esc(s.note)+'</textarea>'
   +'<div class="mx-acts"><button type="button" class="mx-b p" data-goletter="'+i+'">'+sv('letter')+'تقرير ولي الأمر</button><button type="button" class="mx-b" data-gocert="'+i+'">'+sv('cert')+'شهادة</button></div>');
  function keepNote(){ var n=$('mh-fn'); if(n&&n.value!==s.note){ s.note=n.value; saveNote(s); } }
  L.onclick=function(e){ var t=e.target.closest('button'); if(e.target.id==='mh-sc'||(t&&t.hasAttribute('data-close'))){ keepNote(); closeLayer(); render(); return; }
    if(t&&t.dataset.goletter){ keepNote(); closeLayer(); S.rep='letter'; S.rs=+t.dataset.goletter; S.letterTxt=null; go('reports'); }
    if(t&&t.dataset.gocert){ keepNote(); closeLayer(); S.rep='cert'; S.rs=+t.dataset.gocert; go('reports'); } };
}

/* ── الطلاب ── */
function vStudents(){
  var st=M.st;
  var h='<div class="mx-bar"><button type="button" class="mx-b p" data-act="add">'+sv('plus')+'طالب</button><button type="button" class="mx-b" data-act="paste">'+sv('paste')+'الصق قائمة</button><span class="mx-sp"></span><span class="mx-pill n">'+arN(st.length,'طالب واحد','طالبان','طلاب','طالباً')+'</span></div>';
  if(!st.length) return h+'<div class="mx-empty">أضف طلابك واحداً واحداً، أو الصق قائمتهم من Excel أو نظام المدرسة.</div>';
  h+='<div class="mx-tw"><table><thead><tr><th>#</th><th>الاسم</th>'+M.set.crit.map(function(c){ return '<th>'+esc(c.t)+'</th>'; }).join('')+'<th>المجموع</th><th></th></tr></thead><tbody>'
   +st.map(function(s,i){ var v=sum(s), neg=s.ev.filter(function(e){ return e.v<0; }).length;
     return '<tr><td class="mx-n">'+s.num+'</td><td><input class="nm" data-nm="'+i+'" value="'+esc(s.name)+'" aria-label="اسم الطالب '+s.num+'"></td>'+M.set.crit.map(function(c){ var x=sum(s,c.k); return '<td><b style="color:'+(x<0?'var(--red)':x>0?'var(--green)':'var(--muted)')+'"><bdi dir="ltr">'+(x>0?'+':'')+x+'</bdi></b></td>'; }).join('')
       +'<td>'+(neg>=2?'<span class="mx-pill r">متابعة</span>':'<span class="mx-pill '+(v>0?'g':'n')+'"><bdi dir="ltr">'+(v>0?'+':'')+v+'</bdi></span>')+'</td><td class="mx-nw"><button type="button" class="mx-ib" data-file="'+i+'" aria-label="ملف '+esc(s.name)+'">'+sv('file')+'</button> <button type="button" class="mx-ib" data-del="'+i+'" aria-label="حذف '+esc(s.name)+'">'+sv('trash')+'</button></td></tr>'; }).join('')
   +'</tbody></table></div>';
  return h;
}
async function addStudents(names,replace){
  names=names.map(function(n){ return String(n).trim().slice(0,60); }).filter(Boolean);
  if(!names.length) return;
  if(M.demo){ var base=replace?[]:M.st; var mx=base.reduce(function(a,s){ return Math.max(a,s.num); },0);
    var add=names.map(function(n,j){ return {id:'',num:mx+j+1,name:n,abs:false,ev:[],gr:{},note:''}; });
    M.st=DEMO[M.cur]=base.concat(add); var c=C(); c.c=M.st.length; render(); toast('أُضيف '+arN(add.length,'طالب واحد','طالبان','طلاب','طالباً'),'success'); return; }
  var db=fdb(), code=M.cur, c2=C();
  try{
    if(replace&&M.st.length){ var b0=db.batch(); M.st.forEach(function(s){ b0.update(db.collection('classroom_students').doc(s.id),{active:false}); }); await b0.commit();
      await db.collection('classrooms').doc(code).update({studentCount:FV().increment(-M.st.length)}).catch(function(){}); M.st=[]; }
    var mx2=M.st.reduce(function(a,s){ return Math.max(a,s.num); },0), made=[];
    for(var i=0;i<names.length;i+=400){ var b=db.batch();
      names.slice(i,i+400).forEach(function(n,j){ var num=mx2+i+j+1, ref=db.collection('classroom_students').doc();
        b.set(ref,{classCode:code,className:c2.n||'',schoolName:c2.school||M.set.school||'',teacherId:uid(),teacherName:M.set.teacher||'',studentName:n,num:num,sid:'',email:'',userId:null,active:true,addedAt:FV().serverTimestamp()});
        made.push({id:ref.id,num:num,name:n,abs:false,ev:[],gr:{},note:''}); });
      await b.commit(); }
    await db.collection('classrooms').doc(code).update({studentCount:FV().increment(made.length)}).catch(function(){});
    M.st=M.st.concat(made); c2.c=M.st.length; render(); toast('أُضيف '+arN(made.length,'طالب واحد','طالبان','طلاب','طالباً'),'success');
    return made;
  }catch(e){ console.warn('mh add',e); toast('تعذّرت الإضافة، تحقّق من الاتصال','error'); }
}
async function delStudent(i){
  var s=M.st[i]; if(!s) return; if(!confirm('حذف «'+s.name+'» من الشعبة؟')) return;
  if(!M.demo&&s.id){ try{ await fdb().collection('classroom_students').doc(s.id).update({active:false}); await fdb().collection('classrooms').doc(M.cur).update({studentCount:FV().increment(-1)}).catch(function(){}); }catch(e){ toast('تعذّر الحذف','error'); return; } }
  M.st.splice(i,1); if(M.demo) DEMO[M.cur]=M.st; S.log=[]; var c=C(); c.c=M.st.length; render(); toast('حُذف الطالب');
}
function pasteList(){
  var L=layer('<h3>الصق قائمة الطلاب<button type="button" class="mx-ib x" data-close aria-label="إغلاق">'+sv('x')+'</button></h3><p class="mx-muted" style="margin:6px 0 10px">اسم في كل سطر، من Excel أو نظام المدرسة.</p><textarea id="mh-pl"></textarea><div class="mx-acts"><button type="button" class="mx-b p" data-ok>أضف</button>'+(M.st.length?'<button type="button" class="mx-b" data-rep>استبدل القائمة</button>':'')+'</div>');
  L.onclick=async function(e){ var t=e.target.closest('button'); if(e.target.id==='mh-sc'||(t&&t.hasAttribute('data-close'))){ closeLayer(); return; } if(!t) return;
    var names=$('mh-pl').value.split(/\n+/).map(function(x){ return x.split('\t')[0].replace(/^\s*\d+[\s.\-:)]*/,'').trim(); }).filter(Boolean);
    if(!names.length){ toast('القائمة فارغة'); return; }
    if(names.length>80){ toast('الحد 80 اسماً في المرة الواحدة','error'); return; }
    var rep=t.hasAttribute('data-rep'); if(rep&&!confirm('ستُستبدل القائمة الحالية، ويبقى سجل الطلاب السابقين محفوظاً. متابعة؟')) return;
    closeLayer(); await addStudents(names,rep); };
}

/* ── الدرجات ── */
function vGrades(){
  var st=M.st, P=st.map(pct), done=P.filter(function(p){ return p!=null; });
  var h='<div class="mx-bar"><button type="button" class="mx-b" data-act="addcol">'+sv('plus')+'عمود</button><span class="mx-sp"></span><span class="mx-pill n">'+done.length+' من '+st.length+' رُصدت درجاتهم</span></div>';
  h+='<div class="mx-tw"><table><thead><tr><th>#</th><th>الاسم</th>'+M.set.cols.map(function(c,j){ return '<th><span class="thx"><span contenteditable="true" data-colt="'+j+'" title="غيّر الاسم">'+esc(c.t)+'</span> (<span contenteditable="true" inputmode="numeric" data-colm="'+j+'" title="الدرجة العظمى">'+c.m+'</span>)<button type="button" data-delcol="'+j+'" aria-label="حذف عمود '+esc(c.t)+'">'+sv('x')+'</button></span></th>'; }).join('')+'<th>النسبة</th><th>المستوى</th></tr></thead><tbody>'
   +st.map(function(s,i){ var l=lvl(P[i]); return '<tr><td class="mx-n">'+s.num+'</td><td><b>'+esc(s.name)+'</b></td>'+M.set.cols.map(function(c){ return '<td><input class="g" inputmode="numeric" data-g="'+i+'|'+esc(c.k)+'" value="'+(s.gr[c.k]==null?'':s.gr[c.k])+'" aria-label="'+esc(c.t)+'، '+esc(s.name)+'"></td>'; }).join('')+'<td><b>'+(P[i]==null?'':P[i]+'%')+'</b></td><td><span class="mx-pill '+l[1]+'">'+l[0]+'</span></td></tr>'; }).join('')
   +'</tbody></table></div>';
  return h;
}

/* ── التقارير ── */
var WK=['الأسبوع 1','الأسبوع 2','الأسبوع 3','الأسبوع 4'];
function weeksOf(s){
  var d=new Date(), m=d.getMonth(), y=d.getFullYear(), W=[{},{},{},{}];
  M.set.crit.forEach(function(c){ for(var i=0;i<4;i++) W[i][c.k]={p:0,n:0}; });
  s.ev.forEach(function(e){ if(!e.date) return; var t=new Date(e.date+'T00:00:00'); if(t.getMonth()!==m||t.getFullYear()!==y) return; var wi=Math.min(3,Math.floor((t.getDate()-1)/7)); var b=W[wi][e.c]; if(b){ if(e.v>0) b.p++; else b.n++; } });
  return W.map(function(o){ var r={}; M.set.crit.forEach(function(c){ var b=o[c.k]; r[c.k]=(!b.p&&!b.n)?'n':(b.n>=2||b.n>b.p)?'w':(b.p>=2&&!b.n)?'e':'g'; }); return r; });
}
var MK={e:['م','e'],g:['ج','g'],w:['ت','w'],n:['','n']};
function letterText(s){
  var cr=M.set.crit, best=cr.slice().sort(function(a,b){ return sum(s,b.k)-sum(s,a.k); })[0], weak=cr.slice().sort(function(a,b){ return sum(s,a.k)-sum(s,b.k); })[0], p=pct(s);
  var sub=M.set.subject?'في مادة '+M.set.subject:'في المادة';
  return 'ولي أمر الطالب '+s.name+' المحترم،\nنود إطلاعكم على مستوى ابنكم '+sub+'. '+(sum(s,best.k)>0?'يتميز في '+best.t:'نتطلع إلى مزيد من مشاركته')+(sum(s,weak.k)<0?'، ويحتاج متابعة في '+weak.t:'')+'.'+(p!=null?' ونسبته في التقويم '+p+'%.':'')+(s.note?'\n'+s.note:'')+'\nشاكرين تعاونكم.'+(M.set.teacher?'\n'+M.set.teacher:'');
}
function certBest(s){ return M.set.crit.slice().sort(function(a,b){ return sum(s,b.k)-sum(s,a.k); })[0]; }
function certInner(t,s){
  var LG=window._HH_LOGO_MAROON?'<img class="lg" src="'+window._HH_LOGO_MAROON+'" alt="شعار المُلهم">':'';
  var why=t==='thanks'?'تقديراً لتعاونه وحسن خلقه':'لتميزه في '+esc(certBest(s).t)+(M.set.subject?' في مادة '+esc(M.set.subject):'');
  return '<div class="ct '+t+'">'+LG+'<div class="t1">'+(t==='thanks'?'شكر وتقدير':'شهادة تميز')+'</div><div class="t2">تُمنح للطالب</div><div class="nm" contenteditable="true" id="mh-cn">'+esc(s.name)+'</div><div class="rs" contenteditable="true" id="mh-cr">'+why+'</div><div class="ft"><span>'+esc(M.set.school)+'</span><span>'+esc(M.set.teacher)+'</span></div></div>';
}
function vReports(){
  var st=M.st; if(S.rs>=st.length) S.rs=0;
  var cards=[['month','المتابعة الشهرية','تُعبّأ من الحصص','month','#B8924A'],['letter','تقرير ولي الأمر','يُكتب تلقائياً','letter','#5E0E26'],['cert','الشهادات','3 قوالب بالشعار','cert','#2F6A4E']];
  var h='<div class="mx-rg">'+cards.map(function(c){ return '<button type="button" class="mx-rc'+(S.rep===c[0]?' on':'')+'" style="--c:'+c[4]+'" data-rep="'+c[0]+'"><span class="ic">'+sv(c[3])+'</span><span><b>'+c[1]+'</b><small>'+c[2]+'</small></span></button>'; }).join('')+'</div>';
  var sel='<select id="mh-rs" aria-label="الطالب">'+st.map(function(s,i){ return '<option value="'+i+'"'+(i===S.rs?' selected':'')+'>'+esc(s.name)+'</option>'; }).join('')+'</select>';
  if(S.rep==='month'){
    h+='<div class="mx-pane"><div class="tl"><b>'+esc(C().n)+(M.set.subject?'، '+esc(M.set.subject):'')+'، '+MONTHS[new Date().getMonth()]+'</b><span class="mx-sp"></span><button type="button" class="mx-b p s" data-act="wmonth">'+sv('dl')+'Word</button></div><div class="mx-tw flat"><table><thead><tr><th>الاسم</th>'+WK.map(function(w){ return '<th>'+w+'</th>'; }).join('')+'</tr></thead><tbody>'
     +st.map(function(s){ var W=weeksOf(s); return '<tr><td><b>'+esc(s.name)+'</b></td>'+W.map(function(o){ return '<td class="mx-nw">'+M.set.crit.map(function(c){ var m=MK[o[c.k]]; return '<span class="mk '+m[1]+'" title="'+esc(c.t)+'">'+m[0]+'</span>'; }).join('')+'</td>'; }).join('')+'</tr>'; }).join('')
     +'</tbody></table></div><div class="mx-muted mx-leg"><span class="mk e">م</span>متميز <span class="mk g">ج</span>جيد <span class="mk w">ت</span>يحتاج متابعة، والترتيب: '+M.set.crit.map(function(c){ return esc(c.t); }).join('، ')+'</div></div>';
  } else if(S.rep==='letter'){
    var s=st[S.rs], txt=(S.letterTxt!=null&&S.letterFor===S.rs)?S.letterTxt:letterText(s);
    h+='<div class="mx-pane"><div class="tl">'+sel+'<span class="mx-sp"></span><button type="button" class="mx-b s" data-act="regen">أعد الكتابة</button><button type="button" class="mx-b p s" data-act="wletter">'+sv('dl')+'Word</button></div><div class="mx-letter" id="mh-letter" contenteditable="true">'+esc(txt)+'</div><div class="mx-muted" style="margin-top:8px">النص قابل للتعديل قبل التنزيل.</div></div>';
  } else {
    var t=S.tpl||'classic', s2=st[S.rs];
    h+='<div class="mx-pane"><div class="tl">'+sel+'<div class="mx-tpls">'+[['classic','كلاسيكية'],['modern','حديثة'],['thanks','شكر']].map(function(x){ return '<button type="button" class="mx-chip'+(t===x[0]?' on':'')+'" style="--c:#8A1538" data-tpl="'+x[0]+'">'+x[1]+'</button>'; }).join('')+'</div><span class="mx-sp"></span><button type="button" class="mx-b p s" data-act="print">'+sv('print')+'اطبع</button></div>'
     +'<div class="mx-cert">'+certInner(t,s2)+'</div>'+(M.set.school&&M.set.teacher?'':'<div class="mx-muted" style="margin-top:8px">أضف اسم المدرسة والمعلم من الإعدادات لتظهر في الشهادة.</div>')+'</div>';
  }
  return h;
}
function dl(name,html){ var doc='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><style>body{font-family:"Sakkal Majalla","Traditional Arabic",Arial;direction:rtl}table{border-collapse:collapse;width:100%}td,th{border:1px solid #B8924A;padding:4px;text-align:center;font-size:12pt}th{background:#F5F1E8;color:#5E0E26}h1,h2{color:#5E0E26;margin:4px 0}p{font-size:14pt;line-height:1.8}</style></head><body dir="rtl">'+html+'</body></html>';
  try{ var b=new Blob(['﻿',doc],{type:'application/msword'}); var a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download=name+'.doc'; document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); },800); toast('نُزّل الملف','success'); }catch(e){ toast('تعذّر التنزيل','error'); } }
function wordMonth(){
  var L={e:'م',g:'ج',w:'ت',n:''};
  var h=(M.set.school?'<h1>'+esc(M.set.school)+'</h1>':'')+'<h2>المتابعة الشهرية، '+esc(C().n)+(M.set.subject?'، '+esc(M.set.subject):'')+'، '+MONTHS[new Date().getMonth()]+' '+new Date().getFullYear()+'</h2><table><tr><th rowspan="2">#</th><th rowspan="2">الاسم</th>'+WK.map(function(w){ return '<th colspan="'+M.set.crit.length+'">'+w+'</th>'; }).join('')+'</tr><tr>'+WK.map(function(){ return M.set.crit.map(function(c){ return '<th>'+esc(c.t)+'</th>'; }).join(''); }).join('')+'</tr>'
   +M.st.map(function(s){ return '<tr><td>'+s.num+'</td><td>'+esc(s.name)+'</td>'+weeksOf(s).map(function(o){ return M.set.crit.map(function(c){ return '<td>'+L[o[c.k]]+'</td>'; }).join(''); }).join('')+'</tr>'; }).join('')
   +'</table><p style="font-size:11pt">م: متميز، ج: جيد، ت: يحتاج متابعة</p>'+(M.set.teacher?'<p>'+esc(M.set.teacher)+'</p>':'');
  dl('المتابعة الشهرية '+C().n+' '+MONTHS[new Date().getMonth()],h);
}
function wordLetter(){ var s=M.st[S.rs], le=$('mh-letter'), txt=le?le.innerText:letterText(s);
  dl('تقرير ولي الأمر '+s.name,(M.set.school?'<h2>'+esc(M.set.school)+'</h2>':'')+'<p>'+esc(txt).replace(/\n/g,'<br>')+'</p>'); }
var CERTCSS='.ct{width:100%;aspect-ratio:1.414;background:#fff;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;text-align:center;color:#3D0918;font-family:Amiri,serif;padding:28px;box-sizing:border-box}'
 +'.ct.classic{border:10px double #B8924A;outline:2px solid #5E0E26;outline-offset:-22px}.ct.modern{border-top:16px solid #5E0E26;border-bottom:6px solid #B8924A}.ct.thanks{border:2px solid #2F6A4E;box-shadow:inset 0 0 0 10px #fff,inset 0 0 0 12px #2F6A4E}'
 +'.ct .lg{height:64px;mix-blend-mode:multiply}.ct .t1{font-size:30px;font-weight:700;color:#8A1538}.ct.thanks .t1{color:#2F6A4E}.ct .t2{font-size:17px}.ct .nm{font-size:34px;font-weight:700;border-bottom:1.5px dashed #B8924A;padding:0 20px;outline:0}.ct .rs{font-size:18px;max-width:80%;line-height:1.7;outline:0}'
 +'.ct .ft{position:absolute;bottom:22px;left:40px;right:40px;display:flex;justify-content:space-between;font-family:Cairo,sans-serif;font-size:12px;font-weight:800;color:#7A6A54}';
function printCert(){
  var box=document.querySelector('#hh-mh .mx-cert .ct'); if(!box) return;
  var w=window.open('','_blank'); if(!w){ toast('اسمح بالنوافذ المنبثقة للطباعة','error'); return; }
  var html=box.outerHTML.replace(/ contenteditable="true"/g,'');
  w.document.write('<!doctype html><html dir="rtl"><head><meta charset="utf-8"><title>شهادة</title><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&family=Amiri:wght@700&display=swap" rel="stylesheet"><style>@page{size:A4 landscape;margin:10mm}body{margin:0}'+CERTCSS+'.ct .ft{bottom:30px}</style></head><body>'+html+'<script>window.onload=function(){ setTimeout(function(){ window.print(); },600); };<\/script></body></html>');
  w.document.close();
}

/* ── الإعدادات ── */
function settings(){
  var T=S.setTab||'crit';
  function body(){
    var h='<h3>الإعدادات<button type="button" class="mx-ib x" data-close aria-label="إغلاق">'+sv('x')+'</button></h3><div class="mx-seg">'+[['crit','المعايير'],['beh','السلوكيات'],['info','البيانات']].map(function(x){ return '<button type="button" class="'+(T===x[0]?'on':'')+'" data-st="'+x[0]+'">'+x[1]+'</button>'; }).join('')+'</div>';
    if(T==='crit') h+='<p class="mx-muted">معايير الحصة والمتابعة الشهرية.</p>'+M.set.crit.map(function(c,j){ return '<div class="mx-row"><input type="color" value="'+esc(c.c)+'" data-cc="'+j+'" aria-label="لون '+esc(c.t)+'"><input type="text" value="'+esc(c.t)+'" data-ct="'+j+'" maxlength="24" aria-label="اسم المعيار"><button type="button" class="mx-ib" data-cdel="'+j+'" aria-label="حذف '+esc(c.t)+'">'+sv('trash')+'</button></div>'; }).join('')+(M.set.crit.length<8?'<button type="button" class="mx-chip add" data-cadd>'+sv('plus')+'معيار</button>':'');
    if(T==='beh') h+='<h4>إيجابي</h4><div>'+M.set.pos.map(function(x,j){ return '<span class="mx-tag"><button type="button" data-pdel="'+j+'" aria-label="حذف '+esc(x)+'">'+sv('x')+'</button>'+esc(x)+'</span>'; }).join('')+'</div><div class="mx-row"><input type="text" id="mh-np" maxlength="40" placeholder="سلوك إيجابي جديد"><button type="button" class="mx-b s" data-padd aria-label="أضف">'+sv('plus')+'</button></div>'
      +'<h4>يحتاج متابعة</h4><div>'+M.set.neg.map(function(x,j){ return '<span class="mx-tag"><button type="button" data-ndel="'+j+'" aria-label="حذف '+esc(x[0])+'">'+sv('x')+'</button>'+esc(x[0])+' <b class="mx-red"><bdi dir="ltr">-'+(+x[1]||1)+'</bdi></b></span>'; }).join('')+'</div><div class="mx-row"><input type="text" id="mh-nn" maxlength="40" placeholder="سلوك جديد"><select id="mh-nv" aria-label="النقاط"><option value="1">-1</option><option value="2">-2</option><option value="3">-3</option></select><button type="button" class="mx-b s" data-nadd aria-label="أضف">'+sv('plus')+'</button></div>';
    if(T==='info') h+=[['school','المدرسة','مثال: مدرسة علي بن أبي طالب'],['subject','المادة','مثال: الدراسات الاجتماعية'],['teacher','المعلم','مثال: أ. أحمد']].map(function(x){ return '<h4>'+x[1]+'</h4><div class="mx-row"><input type="text" maxlength="60" value="'+esc(M.set[x[0]])+'" placeholder="'+x[2]+'" data-set="'+x[0]+'"></div>'; }).join('')+'<p class="mx-muted">تظهر في التقارير والشهادات.</p>';
    return h;
  }
  var L=layer(body());
  function draw(){ var d=L.querySelector('.mx-drawer'); if(d) d.innerHTML=body(); }
  L.onclick=function(e){ var t=e.target.closest('button'); if(e.target.id==='mh-sc'||(t&&t.hasAttribute('data-close'))){ closeLayer(); render(); return; } if(!t) return;
    var ch=true;
    if(t.dataset.st){ T=S.setTab=t.dataset.st; ch=false; }
    else if(t.hasAttribute('data-cadd')){ M.set.crit.push({k:'c'+Date.now().toString(36),t:'معيار جديد',c:'#5A3A8E'}); }
    else if(t.dataset.cdel){ if(M.set.crit.length>1){ var rm=M.set.crit.splice(+t.dataset.cdel,1)[0]; if(S.crit1===rm.k) S.crit1=M.set.crit[0].k; } else { toast('يبقى معيار واحد على الأقل'); ch=false; } }
    else if(t.dataset.pdel){ M.set.pos.splice(+t.dataset.pdel,1); }
    else if(t.dataset.ndel){ M.set.neg.splice(+t.dataset.ndel,1); }
    else if(t.hasAttribute('data-padd')){ var v=$('mh-np').value.trim(); if(v) M.set.pos.push(v); else ch=false; }
    else if(t.hasAttribute('data-nadd')){ var n=$('mh-nn').value.trim(), p=Math.max(1,Math.min(3,parseInt($('mh-nv').value,10)||1)); if(n) M.set.neg.push([n,p]); else ch=false; }
    else ch=false;
    if(ch) saveSettings(); draw(); };
  L.oninput=function(e){ var t=e.target; if(t.dataset.ct!=null){ M.set.crit[+t.dataset.ct].t=t.value.trim()||M.set.crit[+t.dataset.ct].t; saveSettings(); } if(t.dataset.cc!=null){ M.set.crit[+t.dataset.cc].c=t.value; saveSettings(); } if(t.dataset.set){ M.set[t.dataset.set]=t.value.trim(); saveSettings(); } };
  L.onkeydown=function(e){ if(e.key==='Enter'&&(e.target.id==='mh-np'||e.target.id==='mh-nn')){ var b=L.querySelector(e.target.id==='mh-np'?'[data-padd]':'[data-nadd]'); if(b) b.click(); } };
}

/* ── الأحداث ── */
var press=null;
function inMh(e){ var r=$('hh-mh'); return r&&r.contains(e.target)&&!(e.target.closest&&e.target.closest('#mh-layer')); }
document.addEventListener('click',function(e){
  if(!inMh(e)) return;
  var t=e.target.closest('[data-mtab],[data-crit],[data-act],[data-del],[data-file],[data-rep],[data-tpl],[data-delcol],.mx-st,#mh-gear'); if(!t) return;
  if(t.id==='mh-gear'){ settings(); return; }
  if(t.dataset.mtab){ go(t.dataset.mtab); return; }
  if(t.dataset.crit){ S.crit1=t.dataset.crit; S.mode='rec'; render(); return; }
  if(t.dataset.rep){ S.rep=t.dataset.rep; render(); return; }
  if(t.dataset.tpl){ S.tpl=t.dataset.tpl; render(); return; }
  if(t.dataset.file){ openFile(+t.dataset.file); return; }
  if(t.dataset.del){ delStudent(+t.dataset.del); return; }
  if(t.dataset.delcol){ if(M.set.cols.length<=1){ toast('يبقى عمود واحد على الأقل'); return; } var c=M.set.cols[+t.dataset.delcol]; if(!confirm('حذف عمود «'+c.t+'»؟ تبقى الدرجات المرصودة محفوظة إن أعدته.')) return; M.set.cols.splice(+t.dataset.delcol,1); saveSettings(); render(); return; }
  if(t.classList.contains('mx-st')){ if(press&&press.done){ press=null; return; } var i2=+t.dataset.i, s=M.st[i2]; if(!s) return;
    if(S.mode==='att'){ s.abs=!s.abs; saveAtt(s); render(); return; } if(s.abs){ toast('الطالب غائب اليوم'); return; } addEv(i2,S.crit1,1,'+1 '+crit(S.crit1).t); return; }
  var a=t.dataset.act;
  if(a==='att'){ S.mode=S.mode==='att'?'rec':'att'; render(); }
  else if(a==='pick'){ var pool=M.st.map(function(_,i){ return i; }).filter(function(i){ return !M.st[i].abs; }); if(!pool.length) return; var r=pool[Math.floor(Math.random()*pool.length)]; render(); var el=document.querySelector('#hh-mh .mx-st[data-i="'+r+'"]'); if(el){ el.classList.add('pick'); try{ el.scrollIntoView({block:'center',behavior:'smooth'}); }catch(x){} } toast(M.st[r].name); }
  else if(a==='timer'){ clearInterval(S.tmi); S.timer=S.timer?0:300; if(S.timer){ S.tmi=setInterval(function(){ S.timer=Math.max(0,S.timer-1); var e2=$('mh-tm'); if(e2) e2.textContent=fmt(S.timer); if(!S.timer){ clearInterval(S.tmi); toast('انتهى الوقت'); render(); } },1000); } render(); }
  else if(a==='groups'){ S.groups=S.groups>=6?0:(S.groups?S.groups+1:2); render(); }
  else if(a==='undo') undo();
  else if(a==='add'){ (async function(){ var made=await addStudents(['طالب '+((M.st.reduce(function(x,s){ return Math.max(x,s.num); },0))+1)]); var ins=document.querySelector('#hh-mh [data-nm="'+(M.st.length-1)+'"]'); if(ins){ ins.focus(); ins.select(); } })(); }
  else if(a==='paste') pasteList();
  else if(a==='addcol'){ M.set.cols.push({k:'k'+Date.now().toString(36),t:'تقويم جديد',m:10}); saveSettings(); render(); toast('أُضيف عمود، اضغط اسمه لتغييره'); }
  else if(a==='wmonth') wordMonth();
  else if(a==='wletter') wordLetter();
  else if(a==='regen'){ S.letterTxt=null; render(); }
  else if(a==='print') printCert();
  else if(a==='gostudents') go('students');
  else if(a==='reload') loadClass(M.cur);
  else if(a==='login'){ hhMhClose(); try{ showScreen('screen-login'); }catch(x){} }
  else if(a==='newcls') hhMhAddClass();
});
document.addEventListener('change',function(e){ if(!inMh(e)) return; var t=e.target;
  if(t.id==='mh-cls'){ if(t.value==='__new'){ t.value=M.cur; hhMhAddClass(); return; } try{ localStorage.setItem('hh_mh_cls',t.value); }catch(x){} S.log=[]; S.rs=0; S.letterTxt=null; loadClass(t.value); return; }
  if(t.id==='mh-rs'){ S.rs=+t.value; S.letterTxt=null; render(); return; }
  if(t.dataset&&t.dataset.nm!=null){ var s=M.st[+t.dataset.nm]; if(!s) return; var v=t.value.trim().slice(0,60); if(!v){ t.value=s.name; return; } if(v!==s.name){ s.name=v; saveName(s); toast('حُفظ الاسم','success'); } return; }
  if(t.dataset&&t.dataset.g){ var p=t.dataset.g.split('|'), c=M.set.cols.filter(function(x){ return x.k===p[1]; })[0], st=M.st[+p[0]], raw=String(t.value).trim(); if(!c||!st) return;
    st.gr[p[1]]=raw===''?null:Math.max(0,Math.min(c.m,parseFloat(raw.replace(/[٠-٩]/g,function(d){ return '٠١٢٣٤٥٦٧٨٩'.indexOf(d); }))||0)); saveGr(st); render();
    var nx=document.querySelector('#hh-mh [data-g="'+(+p[0]+1)+'|'+p[1]+'"]'); if(nx) nx.focus(); }
});
document.addEventListener('focusout',function(e){ if(!inMh(e)) return; var t=e.target;
  if(t.dataset&&t.dataset.colt!=null){ var c=M.set.cols[+t.dataset.colt]; var v=t.textContent.trim().slice(0,30); if(c&&v&&v!==c.t){ c.t=v; saveSettings(); } }
  if(t.dataset&&t.dataset.colm!=null){ var c2=M.set.cols[+t.dataset.colm]; var m=parseInt(t.textContent,10); if(c2&&m>0&&m!==c2.m){ c2.m=Math.min(1000,m); saveSettings(); render(); } else if(c2) t.textContent=c2.m; }
});
document.addEventListener('keydown',function(e){ if(!$('hh-mh')) return;
  if(e.key==='Escape'){ closeLayer(); return; }
  var t=e.target; if(t.dataset&&(t.dataset.colt!=null||t.dataset.colm!=null)&&e.key==='Enter'){ e.preventDefault(); t.blur(); }
  if(t.classList&&t.classList.contains('mx-st')&&(e.key==='Enter'||e.key===' ')){ e.preventDefault(); t.click(); }
});
document.addEventListener('pointerdown',function(e){ var t=e.target.closest&&e.target.closest('#hh-mh .mx-st'); if(!t||S.mode!=='rec') return; press={done:false,h:setTimeout(function(){ press.done=true; quick(+t.dataset.i); },450)}; });
['pointerup','pointerleave','pointercancel'].forEach(function(ev){ document.addEventListener(ev,function(){ if(press&&!press.done){ clearTimeout(press.h); press=null; } }); });
document.addEventListener('contextmenu',function(e){ var t=e.target.closest&&e.target.closest('#hh-mh .mx-st'); if(t){ e.preventDefault(); if(press){ clearTimeout(press.h); press=null; } quick(+t.dataset.i); } });

/* ── الأنماط ── */
var R='html body #hh-mh ';
var CSS=[
'#hh-mh{--bg:#F5F2EC;--surface:#FFFFFF;--soft:#FAF6EE;--line:#E7DCC6;--ink:#3D0918;--text:#2A1A0E;--muted:#7A6A54;--maroon:#5E0E26;--maroon2:#8A1538;--gold:#B8924A;--goldBg:#FBF1DA;--green:#2F6A4E;--greenBg:#EEF4F0;--red:#B3261E;--redBg:#FCEEEC;--amber:#A8650F;}',
'body.dark-mode #hh-mh{--bg:#160A0F;--surface:#22121A;--soft:#2A1720;--line:#3E2C24;--ink:#F5E6C4;--text:#EFE3CC;--muted:#B8A68A;--maroon:#8A1538;--maroon2:#E6CE8E;--gold:#C9A35A;--goldBg:#3A2A10;--green:#5FB58A;--greenBg:#173226;--red:#F07A6E;--redBg:#3A1512;--amber:#E0A04A;}',
'html body #hh-mh{position:fixed;top:var(--hh-bar,80px);bottom:var(--hh-bar-b,0px);left:0;right:0;z-index:2900;overflow-y:auto;background:var(--bg);color:var(--text);direction:rtl;font-family:Cairo,Tahoma,sans-serif;font-size:15px;line-height:1.6;font-variant-numeric:tabular-nums;}',
R+'*{box-sizing:border-box;}',
R+'svg{display:block;}',
R+'button,'+R+'input,'+R+'select,'+R+'textarea{font-family:inherit;}',
R+'button{cursor:pointer;}',
R+':focus-visible{outline:3px solid var(--gold);outline-offset:2px;}',
R+'.mx-head{display:none;}',
R+'.mh-cls{display:flex;align-items:center;gap:8px;}',
R+'.mh-cls select,.gvh-meta .mh-cls select{height:40px;border-radius:10px;border:0;padding:0 12px;font-family:Cairo,sans-serif;font-weight:800;font-size:14px;background:#fff;color:#5E0E26;max-width:240px;}',
'.gvh-meta .mh-cls{display:flex;align-items:center;gap:8px;} .gvh-meta .mh-cls select{height:40px;border-radius:10px;border:0;padding:0 12px;font-family:Cairo,sans-serif;font-weight:800;font-size:14px;background:#fff;color:#5E0E26;max-width:240px;}',
'.gvh-meta #mh-gear{width:40px;height:40px;border-radius:10px;border:1px solid rgba(255,255,255,.35);background:transparent;color:#fff;display:grid;place-items:center;cursor:pointer;padding:0;} .gvh-meta #mh-gear svg{width:20px;height:20px;display:block;} .gvh-meta #mh-gear:hover{background:rgba(255,255,255,.1);}',
R+'.wrap{max-width:1200px;margin:0 auto;padding:20px 16px 60px;}',
R+'.mx-bar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:14px;}',
R+'.mx-sp{flex:1;}',
R+'.mx-crits,'+R+'.mx-tools{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}',
R+'.mx-chip{border:1.5px solid var(--line);background:var(--surface);color:var(--text);font-weight:800;font-size:13.5px;height:38px;padding:0 14px;border-radius:10px;display:inline-flex;align-items:center;gap:7px;width:auto;margin:0;}',
R+'.mx-chip i{width:10px;height:10px;border-radius:3px;background:var(--c);}',
R+'.mx-chip.on{border-color:var(--c);box-shadow:inset 0 0 0 1px var(--c);background:color-mix(in srgb,var(--c) 10%,var(--surface));}',
R+'.mx-chip svg{width:16px;height:16px;} '+R+'.mx-chip.add{border-style:dashed;color:var(--muted);margin-top:8px;}',
R+'.mx-b{height:40px;border-radius:10px;border:1.5px solid var(--line);background:var(--surface);color:var(--ink);font-weight:800;font-size:14px;padding:0 14px;display:inline-flex;align-items:center;justify-content:center;gap:7px;width:auto;margin:0;box-shadow:none;transform:none;white-space:nowrap;}',
R+'.mx-b svg{width:17px;height:17px;} '+R+'.mx-b.p{background:var(--maroon);border-color:var(--maroon);color:#fff;} '+R+'.mx-b.s{height:36px;font-size:13px;padding:0 11px;} '+R+'.mx-b.on{border-color:var(--gold);background:var(--goldBg);}',
R+'.mx-b:hover{filter:brightness(.97);}',
R+'.mx-ib{width:32px;height:32px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--muted);display:inline-grid;place-items:center;padding:0;margin:0;vertical-align:middle;}',
R+'.mx-ib svg{width:15px;height:15px;}',
R+'.mx-note{display:flex;align-items:center;gap:10px;flex-wrap:wrap;background:var(--goldBg);border:1px dashed var(--gold);border-radius:12px;padding:8px 12px;margin-bottom:14px;font-weight:800;font-size:13.5px;color:var(--ink);} '+R+'.mx-note span{flex:1;}',
R+'.mx-empty{background:var(--surface);border:1px dashed var(--line);border-radius:14px;padding:30px 16px;text-align:center;color:var(--muted);font-weight:700;display:flex;flex-direction:column;align-items:center;gap:12px;} '+R+'.mx-empty b{color:var(--ink);font-size:16px;}',
R+'.mx-muted{color:var(--muted);font-weight:700;font-size:13px;}',
/* المقاعد */
R+'.mx-seats{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;}',
R+'.mx-st{position:relative;background:var(--surface);border:1.5px solid var(--line);border-radius:14px;padding:12px 10px 10px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px;min-width:0;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;cursor:pointer;transition:transform .12s,border-color .12s;}',
R+'.mx-st:hover{border-color:var(--gold);} '+R+'.mx-st:active{transform:scale(.97);}',
R+'.mx-st .av{width:44px;height:44px;border-radius:50%;background:var(--goldBg);color:var(--maroon2);display:grid;place-items:center;font-weight:900;font-size:17px;}',
R+'.mx-st b{font-size:14px;font-weight:800;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;}',
R+'.mx-st .pt{font-size:12.5px;font-weight:900;color:var(--green);} '+R+'.mx-st .pt.neg{color:var(--red);}',
R+'.mx-st .no{position:absolute;top:6px;right:8px;font-size:11px;font-weight:800;color:var(--muted);}',
R+'.mx-st.abs{opacity:.4;border-style:dashed;}',
R+'.mx-st.pick{border-color:var(--gold);box-shadow:0 0 0 4px color-mix(in srgb,var(--gold) 40%,transparent);animation:mxpk .6s ease-in-out 3 alternate;}',
'@keyframes mxpk{to{transform:translateY(-4px);}}',
R+'.mx-st .fl{position:absolute;top:-8px;left:50%;transform:translateX(-50%);background:var(--green);color:#fff;font-size:12px;font-weight:900;border-radius:20px;padding:0 8px;animation:mxfl .8s forwards;pointer-events:none;} '+R+'.mx-st .fl.n{background:var(--red);}',
'@keyframes mxfl{to{transform:translate(-50%,-22px);opacity:0;}}',
R+'.mx-st.g1{box-shadow:inset 0 -4px 0 #8A1538;}'+R+'.mx-st.g2{box-shadow:inset 0 -4px 0 #1F4E79;}'+R+'.mx-st.g3{box-shadow:inset 0 -4px 0 #2F6A4E;}'+R+'.mx-st.g4{box-shadow:inset 0 -4px 0 #B8924A;}'+R+'.mx-st.g5{box-shadow:inset 0 -4px 0 #5A3A8E;}'+R+'.mx-st.g6{box-shadow:inset 0 -4px 0 #A8650F;}',
R+'.mx-timer{font-size:15px;font-weight:900;color:var(--maroon2);background:var(--goldBg);border-radius:10px;height:36px;padding:0 12px;display:inline-flex;align-items:center;}',
R+'.mx-hint{font-size:12.5px;font-weight:700;color:var(--muted);margin-top:10px;}',
/* الجداول */
R+'.mx-tw{background:var(--surface);border:1px solid var(--line);border-radius:14px;overflow-x:auto;} '+R+'.mx-tw.flat{border:0;}',
R+'table{width:100%;border-collapse:collapse;min-width:640px;}',
R+'th,'+R+'td{padding:10px 12px;text-align:start;border-bottom:1px solid var(--line);font-size:14px;color:var(--text);}',
R+'th{font-size:12.5px;font-weight:800;color:var(--muted);background:var(--soft);white-space:nowrap;}',
R+'th [contenteditable]{border-radius:5px;padding:0 3px;outline:1px dashed transparent;} '+R+'th [contenteditable]:hover{outline-color:var(--gold);}',
R+'.mx-n{color:var(--muted);font-weight:800;width:44px;} '+R+'.mx-nw{white-space:nowrap;}',
R+'td input.nm{border:1px solid transparent;background:transparent;font-weight:800;font-size:14px;color:var(--ink);border-radius:8px;padding:4px 6px;width:100%;min-width:150px;height:auto;margin:0;}',
R+'td input.nm:hover,'+R+'td input.nm:focus{border-color:var(--line);background:var(--soft);}',
R+'td input.g{width:58px;height:34px;text-align:center;border:1px solid var(--line);border-radius:8px;background:var(--soft);font-weight:800;color:var(--ink);padding:0;margin:0;}',
R+'.mx-pill{font-size:12px;font-weight:800;border-radius:20px;padding:2px 10px;white-space:nowrap;display:inline-block;}',
R+'.mx-pill.g{background:var(--greenBg);color:var(--green);}'+R+'.mx-pill.r{background:var(--redBg);color:var(--red);}'+R+'.mx-pill.a{background:var(--goldBg);color:var(--amber);}'+R+'.mx-pill.n{background:var(--soft);color:var(--muted);}',
R+'.mx-pills{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px;}',
R+'.thx{display:inline-flex;align-items:center;gap:4px;} '+R+'.thx button{border:0;background:none;color:var(--muted);padding:0;width:18px;height:18px;display:grid;place-items:center;margin:0;} '+R+'.thx button svg{width:13px;height:13px;}',
/* التقارير */
R+'.mx-rg{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:16px;}',
R+'.mx-rc{background:var(--surface);border:1.5px solid var(--line);border-radius:14px;padding:16px;display:flex;align-items:center;gap:12px;text-align:start;color:var(--ink);width:auto;margin:0;}',
R+'.mx-rc.on{border-color:var(--gold);background:var(--goldBg);}',
R+'.mx-rc .ic{width:46px;height:46px;border-radius:12px;background:color-mix(in srgb,var(--c) 13%,transparent);color:var(--c);display:grid;place-items:center;flex-shrink:0;} '+R+'.mx-rc .ic svg{width:23px;height:23px;}',
R+'.mx-rc b{display:block;font-size:15.5px;font-weight:900;} '+R+'.mx-rc small{font-size:12.5px;font-weight:700;color:var(--muted);}',
R+'.mx-pane{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;}',
R+'.mx-pane .tl{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:12px;} '+R+'.mx-pane .tl > b{color:var(--ink);}',
R+'.mx-pane select{height:38px;border-radius:10px;border:1px solid var(--line);background:var(--soft);font-weight:800;color:var(--ink);padding:0 10px;max-width:240px;}',
R+'.mx-letter{font-family:Amiri,serif;font-size:18px;line-height:2;color:var(--text);background:var(--soft);border-radius:12px;padding:16px 20px;white-space:pre-line;outline:1px dashed transparent;} '+R+'.mx-letter:focus{outline-color:var(--gold);}',
R+'.mk{display:inline-grid;place-items:center;width:24px;height:24px;border-radius:6px;font-size:12px;font-weight:900;margin-inline-end:3px;vertical-align:middle;}',
R+'.mk.e{background:var(--greenBg);color:var(--green);}'+R+'.mk.g{background:var(--goldBg);color:var(--amber);}'+R+'.mk.w{background:var(--redBg);color:var(--red);}'+R+'.mk.n{background:var(--soft);}',
R+'.mx-leg{margin-top:10px;display:flex;align-items:center;gap:4px;flex-wrap:wrap;}',
R+'.mx-tpls{display:flex;gap:8px;flex-wrap:wrap;}',
R+'.mx-cert{margin-top:12px;background:#FBF7EE;border-radius:12px;padding:16px;display:grid;place-items:center;}',
R+'.mx-cert .ct{max-width:640px;}',
CERTCSS.replace(/\.ct/g,R+'.mx-cert .ct'),
/* الطبقات */
R+'.mx-scrim{position:fixed;top:var(--hh-bar,80px);bottom:0;left:0;right:0;background:rgba(20,5,10,.45);z-index:50;display:flex;justify-content:flex-start;}',
R+'.mx-drawer{width:min(460px,100%);height:100%;background:var(--surface);overflow:auto;padding:18px;box-shadow:10px 0 40px rgba(0,0,0,.25);}',
R+'.mx-drawer h3{margin:0 0 4px;font-size:20px;font-weight:900;color:var(--ink);display:flex;align-items:center;gap:10px;} '+R+'.mx-drawer h3 .x{margin-inline-start:auto;}',
R+'.mx-drawer h4{margin:18px 0 8px;font-size:14px;font-weight:900;color:var(--ink);}',
R+'.mx-row{display:flex;align-items:center;gap:8px;padding:6px 0;}',
R+'.mx-row input[type=text]{flex:1;height:38px;border:1px solid var(--line);border-radius:9px;background:var(--soft);padding:0 10px;font-weight:700;color:var(--ink);min-width:0;margin:0;}',
R+'.mx-row input[type=color]{width:38px;height:38px;border:0;background:none;padding:0;flex-shrink:0;}',
R+'.mx-row select{height:38px;border:1px solid var(--line);border-radius:9px;background:var(--soft);font-weight:800;color:var(--red);padding:0 6px;}',
R+'.mx-tag{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--line);border-radius:9px;padding:3px 8px 3px 4px;font-size:13px;font-weight:700;margin:3px;color:var(--text);}',
R+'.mx-tag button{border:0;background:none;color:var(--muted);width:20px;height:20px;display:grid;place-items:center;padding:0;margin:0;} '+R+'.mx-tag button svg{width:12px;height:12px;}',
R+'.mx-red{color:var(--red);}',
R+'.mx-seg{display:flex;background:var(--soft);border-radius:10px;padding:3px;margin:10px 0;}',
R+'.mx-seg button{flex:1;border:0;background:none;padding:7px;border-radius:8px;font-weight:800;color:var(--muted);margin:0;width:auto;}',
R+'.mx-seg button.on{background:var(--surface);color:var(--ink);box-shadow:0 1px 3px rgba(0,0,0,.08);}',
R+'.mx-qk{display:flex;flex-wrap:wrap;gap:6px;}',
R+'.mx-qk button{border:1.5px solid var(--line);background:var(--surface);border-radius:10px;padding:7px 10px;font-weight:700;font-size:13.5px;color:var(--text);width:auto;margin:0;}',
R+'.mx-qk button:hover{border-color:var(--gold);} '+R+'.mx-qk button.n{border-color:color-mix(in srgb,var(--red) 35%,var(--line));} '+R+'.mx-qk button em{font-style:normal;color:var(--red);font-weight:900;}',
R+'.mx-tl div{display:flex;gap:8px;align-items:center;padding:7px 0;border-bottom:1px dashed var(--line);font-size:13.5px;font-weight:700;} '+R+'.mx-tl small{color:var(--muted);margin-inline-start:auto;white-space:nowrap;}',
R+'.mx-drawer textarea{width:100%;min-height:150px;border:1px solid var(--line);border-radius:10px;background:var(--soft);padding:10px;font-weight:700;font-size:14px;color:var(--ink);margin:0;}',
R+'.mx-acts{margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;}',
'body.dark-mode #hh-mh .mx-rc .ic{color:#E6CE8E;background:rgba(230,206,142,.1);}',
'@media (max-width:760px){',
' '+R+'.wrap{padding:14px 12px 50px;}',
' '+R+'.mx-rg{grid-template-columns:1fr;}',
' '+R+'.mx-seats{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;}',
' '+R+'.mx-st{padding:10px 4px 8px;} '+R+'.mx-st .av{width:36px;height:36px;font-size:14px;} '+R+'.mx-st b{font-size:12px;}',
' '+R+'.mx-bar .mx-b.s{padding:0 9px;}',
' '+R+'.mx-cb{flex-direction:column;align-items:stretch;gap:8px;} '+R+'.mx-cb .mx-sp{display:none;}',
' '+R+'.mx-crits,'+R+'.mx-tools{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;margin:0 -12px;padding:0 12px;} '+R+'.mx-crits::-webkit-scrollbar,'+R+'.mx-tools::-webkit-scrollbar{display:none;}',
' '+R+'.mx-crits > *,'+R+'.mx-tools > *{flex-shrink:0;}',
' .gvh-meta .mh-cls{width:100%;} .gvh-meta .mh-cls select{flex:1;max-width:none;}',
' '+R+'.mx-cert{padding:8px;} '+R+'.mx-cert .ct{padding:14px;gap:2px;} '+R+'.mx-cert .ct .lg{height:36px;} '+R+'.mx-cert .ct .t1{font-size:19px;} '+R+'.mx-cert .ct .nm{font-size:20px;} '+R+'.mx-cert .ct .rs{font-size:12px;} '+R+'.mx-cert .ct .t2{font-size:12px;} '+R+'.mx-cert .ct .ft{bottom:10px;left:16px;right:16px;font-size:9px;}',
'}',
'@media (prefers-reduced-motion:reduce){ '+R+'.mx-st,'+R+'.mx-st.pick,'+R+'.mx-st .fl{animation:none !important;transition:none;} }'
].join('\n');
function mhStyle(){ if($('hh-mh-style')) return; var s=document.createElement('style'); s.id='hh-mh-style'; s.textContent=CSS; document.head.appendChild(s); }

/* ── الفتح والإغلاق ── */
window.hhMhOpen=function(tab){
  mhStyle();
  try{ if(window.hhCloseFramedOverlays) hhCloseFramedOverlays('mh'); }catch(e){}
  var old=$('hh-mh'); if(old) old.remove();
  try{ document.body.classList.remove('hh-immersive'); }catch(e){}
  var ov=document.createElement('div'); ov.id='hh-mh'; ov.className='mh3';
  ov.innerHTML='<div class="mx-head"><div class="mh-cls"><select id="mh-cls" aria-label="الشعبة"></select><button type="button" id="mh-gear" aria-label="الإعدادات" title="الإعدادات">'+sv('gear')+'</button></div><nav id="mh-tabs" role="tablist" aria-label="أقسام المحبرة"></nav></div><main class="wrap" id="mh-app"></main><div id="mh-layer"></div>';
  document.body.appendChild(ov);
  if(tab&&/^(class|students|grades|reports)$/.test(tab)) S.tab=tab;
  try{ if(window.hhNavMark) hhNavMark('mh'); }catch(e){}
  render(); loadClasses();
};
window.hhMhClose=function(){ clearInterval(S.tmi); S.timer=0; var e=$('hh-mh'); if(e) e.remove(); try{ if(window.hhNavMark) hhNavMark(null); }catch(e2){} };
window.hhMhAddClass=function(){ try{ if(typeof hhOpenClasses==='function'){ hhMhClose(); hhOpenClasses(); return; } }catch(e){} toast('افتح «صفوفي» لإنشاء شعبة'); };
window._hhMh=function(){ return {M:M,S:S}; };
/* الإغلاق عند الانتقال لأي وجهة أخرى */
function wrapClose(){ var f=window.hhCloseFramedOverlays; if(f&&!f._mh){ var w=function(keep){ if(keep!=='mh'&&$('hh-mh')) hhMhClose(); return f.apply(this,arguments); }; w._mh=1; window.hhCloseFramedOverlays=w; }
  var s=window.showScreen; if(typeof s==='function'&&!s._mh){ var w2=function(){ if($('hh-mh')) hhMhClose(); return s.apply(this,arguments); }; w2._mh=1; window.showScreen=w2; } }
wrapClose(); setTimeout(wrapClose,1500);
})();
