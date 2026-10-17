/* ============================================================
   المُلهم التعليمي، «تعلّم» (zzzzzzcv)
   برامج تعليمية سؤالاً سؤالاً: فكّر، تعلّم، الدليل، طبّق، احفظ
   البرنامج الأول: ما لا يسع أطفال المسلمين جهله
   ثلاث طرق: أتعلّم بنفسي، أعرض على الصف، مع دخول الطلاب
   ============================================================ */
(function(){
'use strict';
if(window._hhLearn) return; window._hhLearn=true;

/* ═══ أدوات ═══ */
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function $(id){ return document.getElementById(id); }
function toastX(m,k){ try{ if(typeof toast==='function') toast(m,k||'info'); }catch(e){} }
function me(){ try{ return (typeof currentUser!=='undefined'&&currentUser)||(window.firebase&&firebase.auth&&firebase.auth().currentUser)||null; }catch(e){ return null; } }
function isTeacher(){ try{ if(typeof hhIsAdmin==='function'&&hhIsAdmin()) return true; }catch(e){} return window._hhMyRole==='teacher'||window._hhMyRole==='admin'; }
function seed(s){ var h=2166136261; s=String(s); for(var i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); } return function(){ h^=h<<13; h^=h>>>17; h^=h<<5; return ((h>>>0)%100000)/100000; }; }
function shuf(a,key){ var r=seed(key||Math.random()), b=a.slice(); for(var i=b.length-1;i>0;i--){ var j=Math.floor(r()*(i+1)); var t=b[i]; b[i]=b[j]; b[j]=t; } return b; }
function plural(n,one,two,few,many){ return n===1?one:n===2?two:(n>=3&&n<=10)?n+' '+few:n+' '+many; }
var RM=false; try{ RM=window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}
var P={book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h7M8 11h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6"/>',tv:'<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',
 phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',play:'<path d="M7 4l13 8-13 8z" fill="currentColor"/>',x:'<path d="M18 6L6 18M6 6l12 12"/>',back:'<path d="M9 5l7 7-7 7"/>',next:'<path d="M15 5l-7 7 7 7"/>',
 check:'<path d="M20 6 9 17l-5-5"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',star:'<path d="M12 3l2.8 5.9 6.2.9-4.5 4.4 1 6.3L12 17.6 6.5 20.5l1-6.3L3 9.8l6.2-.9z" fill="currentColor" stroke="none"/>',
 q:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4M12 17h.01"/>',quote:'<path d="M6 17h4l2-4V7H6v6h3zM14 17h4l2-4V7h-6v6h3z" fill="currentColor" stroke="none"/>',hands:'<path d="M7 11V6a1.5 1.5 0 0 1 3 0v4M10 9V4.5a1.5 1.5 0 0 1 3 0V10M13 9V5.5a1.5 1.5 0 0 1 3 0V12M16 10.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-1a6 6 0 0 1-5.2-3L4 15.5a1.5 1.5 0 0 1 2.6-1.5L7 15"/>',
 brain:'<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V4.5A2.5 2.5 0 0 0 9 4zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>',moon:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
 route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7"/>',scroll:'<path d="M8 21h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H8M8 21a2 2 0 0 1-2-2V7H4V5a2 2 0 0 1 4 0v14a2 2 0 0 1-2 2M11 8h6M11 12h6"/>',
 heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
 badge:'<circle cx="12" cy="9" r="5"/><path d="M9 13l-1 8 4-2 4 2-1-8"/>',grid:'<rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/>',
 refresh:'<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',full:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
 eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',print:'<path d="M6 9V3h12v6M6 18H4v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6h-2M8 14h8v7H8z"/>',sort:'<path d="M8 4v16M8 20l-3-3M8 20l3-3M16 20V4M16 4l-3 3M16 4l3 3"/>',
 link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',boxes:'<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/>',fire:'<path d="M12 22c4 0 7-3 7-7 0-5-5-7-5-12-3 2-5 5-5 8-1-1-2-2-2-4-2 2-2 5-2 8 0 4 3 7 7 7z"/>'};
function sv(k,s,w){ return '<svg width="'+(s||18)+'" height="'+(s||18)+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||1.9)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(P[k]||'')+'</svg>'; }

/* ═══ الحالة والتقدم ═══ */
var PROGS=[{id:'mala'}];
var V={view:'home',bk:'mala',sec:0,qi:0,step:0,mode:'self',st:{},quiz:null,rev:null};
var ST=null, _saveT=null;
function book(){ return (window.HH_LEARN||{})[V.bk]; }
function today(){ return Math.floor(Date.now()/864e5); }
var BOX=[0,1,3,7,16,35];
function stKey(){ return 'hh_learn_'+V.bk; }
function loadST(){ var s=null; try{ s=JSON.parse(localStorage.getItem(stKey())||'null'); }catch(e){} ST=s||{seen:{},mem:{},quiz:{},xp:0,last:null,days:{},t:0};
  ['seen','mem','quiz','days'].forEach(function(k){ if(!ST[k]) ST[k]={}; });
  var u=me(); if(u&&u.uid&&window.firebase&&firebase.firestore){ try{ firebase.firestore().collection('program_progress').doc(u.uid).get().then(function(d){ var r=d&&d.exists&&d.data&&(d.data()||{})['learn_'+V.bk]; if(r&&(r.t||0)>(ST.t||0)){ ST=r; ['seen','mem','quiz','days'].forEach(function(k){ if(!ST[k]) ST[k]={}; }); try{ localStorage.setItem(stKey(),JSON.stringify(ST)); }catch(e){} if($('hh-learn')&&V.view!=='lesson') render(); } }).catch(function(){}); }catch(e){} } }
function saveST(){ ST.t=Date.now(); try{ localStorage.setItem(stKey(),JSON.stringify(ST)); }catch(e){}
  clearTimeout(_saveT); _saveT=setTimeout(function(){ var u=me(); if(!u||!u.uid||!window.firebase||!firebase.firestore) return; var o={}; o['learn_'+V.bk]=ST; try{ firebase.firestore().collection('program_progress').doc(u.uid).set(o,{merge:true}).catch(function(){}); }catch(e){} },1500); }
function qid(si,qi){ var B=book(); return B.secs[si].k+'-'+B.secs[si].qs[qi].n; }
function secSeen(si){ var B=book(), n=0; B.secs[si].qs.forEach(function(q,i){ if(ST.seen[qid(si,i)]) n++; }); return n; }
function secPassed(si){ return (ST.quiz[book().secs[si].k]||0)>=70; }
function unlocked(si){ if(si===0||V.mode!=='self'||isTeacher()) return true; return secPassed(si-1); }
function dueList(){ var B=book(), L=[], d=today(); B.secs.forEach(function(s,si){ s.qs.forEach(function(q,qi){ var m=ST.mem[qid(si,qi)]; if(m&&m[1]<=d) L.push([si,qi]); }); }); return L; }
function totalSeen(){ return Object.keys(ST.seen).length; }
function addXp(n){ ST.xp=(ST.xp||0)+n; ST.days[today()]=1; saveST(); var x=document.querySelector('#hh-learn .ln-xp b'); if(x) x.textContent=ST.xp; }
function streak(){ var d=today(), n=0; if(!ST.days[d]) d--; while(ST.days[d]){ n++; d--; } return n; }

/* ═══ الفتح والإغلاق ═══ */
window.hhLearnOpen=function(path){
  style();
  try{ if(window.hhCloseFramedOverlays) hhCloseFramedOverlays('learn'); }catch(e){}
  var old=$('hh-learn'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-learn'; ov.setAttribute('role','region'); ov.setAttribute('aria-label','تعلّم');
  document.body.appendChild(ov);
  try{ if(window.hhNavMark) hhNavMark('learn'); }catch(e){}
  V.view='home'; V.mode=V.mode||'self';
  if(path&&book()){ V.view='book'; }
  loadST(); render(); ov.scrollTop=0;
};
window.hhLearnClose=function(){ var e=$('hh-learn'); if(e) e.remove(); document.body.classList.remove('ln-stage'); try{ if(window.hhNavMark) hhNavMark(null); }catch(e2){} };
(function wrapClose(n){ var f=window.hhCloseFramedOverlays; if(!f){ if(n<40) setTimeout(function(){ wrapClose(n+1); },400); return; } if(f._ln) return; var w=function(keep){ if(keep!=='learn'&&$('hh-learn')) hhLearnClose(); return f.apply(this,arguments); }; w._ln=1; window.hhCloseFramedOverlays=w; })(0);
function go(view,o){ V.view=view; if(o) Object.keys(o).forEach(function(k){ V[k]=o[k]; }); render(); var h=$('hh-learn'); if(h) h.scrollTop=0; }
window.hhLnGo=function(view,a,b){ if(view==='book') go('book'); else if(view==='home') go('home'); else if(view==='sec') openSec(a); else if(view==='lesson') startLesson(a,b||0); else if(view==='quiz') startQuiz(a); else if(view==='review') startReview(); };
window.hhLnMode=function(m){ if(m==='live'){ liveDlg(); return; } V.mode=m; try{ localStorage.setItem('hh_learn_mode',m); }catch(e){} render(); };
try{ var _m=localStorage.getItem('hh_learn_mode'); if(_m==='self'||_m==='screen') V.mode=_m; }catch(e){}

/* ═══ الرسم ═══ */
function render(){
  var h=$('hh-learn'); if(!h) return; var B=book();
  var stage=(V.mode==='screen'&&(V.view==='lesson'||V.view==='quiz'));
  h.className='ln'+(stage?' ln-stg':'')+(V.view==='lesson'||V.view==='quiz'||V.view==='review'?' ln-dk':'');
  document.body.classList.toggle('ln-stage',stage);
  var body=V.view==='home'?vHome():!B?'<div class="ln-wrap"><div class="ln-emp">البرنامج غير محمّل</div></div>':V.view==='book'?vBook():V.view==='sec'?vSec():V.view==='lesson'?vLesson():V.view==='quiz'?vQuiz():V.view==='review'?vReview():V.view==='cert'?vCert():vHome();
  h.innerHTML=body; bind(h);
}
function crumbs(L){ return '<nav class="ln-cr" aria-label="مسار التنقل">'+L.map(function(x,i){ return i<L.length-1?'<button type="button" onclick="'+x[1]+'">'+esc(x[0])+'</button><span>›</span>':'<b>'+esc(x[0])+'</b>'; }).join('')+'</nav>'; }
function cover(B,big){ return '<div class="ln-cov'+(big?' big':'')+'"><span class="sp"></span><b>ما لا يسع<br>أطفال المسلمين<br>جهله</b><small>'+esc(B.author)+'</small></div>'; }

/* الصفحة الأولى: تعلّم */
function vHome(){
  var B=book(), n=B?B.n:0, s=B?totalSeen():0, pc=n?Math.round(s/n*100):0;
  return '<div class="ln-wrap"><div class="ln-hero"><i class="pat"></i><div class="tx"><small>جديد في المُلهم</small><h1>تعلّم</h1><p>برامج تعليمية تمشي مع الطالب سؤالاً سؤالاً: يفكّر، ثم يتعلّم، ثم يرى الدليل، ثم يطبّق، ثم يحفظ. ويعرضها المعلم على شاشة الصف، أو يدخل بها الطلاب من أجهزتهم.</p></div><div class="ic">'+sv('book',58,1.6)+'</div></div>'
   +'<div class="ln-progs">'
   +(B?'<button type="button" class="ln-pc ft" onclick="hhLnGo(\'book\')"><div class="cv">'+cover(B)+'<div class="t"><em>البرنامج الأول</em><h3>'+esc(B.title)+'</h3><small>'+esc(B.author)+'، من '+esc(B.src)+'</small></div></div><div class="bd"><div class="st"><span><b>'+B.secs.length+'</b>فنون</span><span><b>'+n+'</b>سؤالاً</span><span><b>'+pc+'%</b>تقدمك</span></div><span class="go">'+(s?'تابع التعلّم':'ابدأ البرنامج')+' '+sv('next',16,2.4)+'</span></div></button>':'')
   +((window.HH_LEARN||{}).nmodel?'<button type="button" class="ln-pc p2" onclick="hhLn2Open()"><div class="cv"><div class="c2"><b>التفكير بالنظرية<br>أم التفكير بالنموذج؟</b><small>د. نايف بن نهار</small></div></div><div class="bd"><em>البرنامج الثاني، دراسة في التحليل السياسي</em><span class="go">افتح البرنامج '+sv('next',16,2.4)+'</span></div></button>':'<div class="ln-pc soon"><div class="cv"><span>قريباً</span></div><div class="bd"><h4>البرنامج الثاني</h4><small>يُعلن عنه قريباً</small></div></div>')
   +'<div class="ln-pc soon"><div class="cv"><span>قريباً</span></div><div class="bd"><h4>البرنامج الثالث</h4><small>يُعلن عنه لاحقاً</small></div></div></div></div>';
}

/* صفحة الكتاب: المسار */
function modeSeg(){ return '<div class="ln-mode" role="group" aria-label="طريقة التعلّم">'+[['self','cap','أتعلّم بنفسي'],['screen','tv','أعرض على الصف'],['live','phone','مع دخول الطلاب']].map(function(m){ return '<button type="button" class="'+(V.mode===m[0]?'on':'')+'" aria-pressed="'+(V.mode===m[0])+'" onclick="hhLnMode(\''+m[0]+'\')">'+sv(m[1],16)+m[2]+'</button>'; }).join('')+'</div>'; }
function vBook(){
  var B=book(), n=B.n, s=totalSeen(), pc=Math.round(s/n*100), due=dueList().length, sk=streak(), last=ST.last;
  var nextSi=0; for(var i=0;i<B.secs.length;i++){ if(secSeen(i)<B.secs[i].qs.length||!secPassed(i)){ nextSi=i; break; } }
  var cont=last&&B.secs[last.si]?'hhLnGo(\'lesson\','+last.si+','+Math.min(last.qi,B.secs[last.si].qs.length-1)+')':'hhLnGo(\'sec\','+nextSi+')';
  return '<div class="ln-wrap">'+crumbs([['تعلّم',"hhLnGo('home')"],[B.title]])
   +'<div class="ln-bk"><div class="l">'+cover(B,1)+'</div><div class="m"><em>البرنامج الأول في «تعلّم»</em><h1>'+esc(B.title)+'</h1><p class="in">'+esc(B.intro)+'</p>'
   +'<div class="st"><span><b>'+B.secs.length+'</b>فنون</span><span><b>'+n+'</b>سؤالاً</span><span><b>'+B.secs[3].qs.length+'</b>سورة مفسّرة</span><span><b>'+B.secs[4].qs.length+'</b>حديثاً</span></div>'
   +'<div class="ac"><button type="button" class="ln-b p" onclick="'+cont+'">'+sv('play',16)+(s?'تابع من حيث وقفت':'ابدأ التعلّم')+'</button>'+(due?'<button type="button" class="ln-b g" onclick="hhLnGo(\'review\')">'+sv('brain',16)+'مراجعة اليوم <em>'+due+'</em></button>':'')+'</div></div>'
   +'<div class="r"><div class="ring" style="--p:'+pc+'"><b>'+pc+'%</b><small>تقدمك</small></div><div class="kv"><span>'+sv('star',15)+'<b class="ln-xp"><b>'+(ST.xp||0)+'</b></b> نقطة</span><span>'+sv('fire',15)+'<b>'+sk+'</b> '+(sk===1?'يوم متتابع':'أيام متتابعة')+'</span><span>'+sv('check',15,2.4)+'<b>'+s+'</b> من '+n+'</span></div></div></div>'
   +'<div class="ln-au"><span class="ic">'+sv('user',22)+'</span><div><b>عن المؤلف</b><p>'+esc(B.bio)+'</p></div></div>'
   +'<div class="ln-sh"><h2>مسار الكتاب</h2><small>تسع محطات بترتيب الكتاب'+(V.mode==='self'?'، وتُفتح المحطة التالية بعد اجتياز اختبار المحطة':'')+'</small>'+modeSeg()+'</div>'
   +'<div class="ln-path">'+B.secs.map(function(S,si){ var seen=secSeen(si), tot=S.qs.length, pass=secPassed(si), lk=!unlocked(si), now=!lk&&!pass&&(si===nextSi);
      var tag=pass?'<span class="tg ok">'+sv('check',12,3)+'اجتزتها</span>':lk?'<span class="tg lk">'+sv('lock',12,2.4)+'مقفلة</span>':now?'<span class="tg now">أنت هنا</span>':seen?'<span class="tg go">بدأتها</span>':'';
      return '<button type="button" class="ln-stn'+(lk?' lk':'')+(now?' now':'')+'" style="--c:'+S.c+'" onclick="hhLnGo(\'sec\','+si+')"'+(lk?' aria-disabled="true"':'')+'><span class="n"><em>'+(si+1)+'</em>'+sv(S.ic,26)+'</span><span class="tx"><b>'+esc(S.t)+'</b><small>'+(S.k==='tafseer'?tot+' سورة':S.k==='hadith'?tot+' حديثاً':tot+' سؤالاً')+'</small></span>'+tag+'<span class="ac">'+sv('hands',14)+ACTN[S.k]+'</span><span class="pr"><i style="width:'+Math.round(seen/tot*100)+'%"></i></span></button>'; }).join('')+'</div>'
   +'<p class="ln-src">المصدر: كتاب «'+esc(B.title)+'» للشيخ '+esc(B.author)+'، '+esc(B.src)+'. نُقلت الأسئلة والأجوبة والأدلة كما في الكتاب، والآيات بالرسم العثماني.</p></div>';
}
var ACTN={aqeedah:'بطاقات وأدلة، وصواب أم خطأ',fiqh:'رتّب الخطوات، وصنّف الأفعال',seerah:'الخط الزمني لحياة النبي ﷺ',tafseer:'اقرأ الآية وصلها بمعناها',hadith:'أكمل الحديث، واستخرج الفائدة',adab:'ماذا تفعل لو؟ مواقف من يومك',akhlaq:'الخلق وضده، ومواقف',adhkar:'متى تقولها؟ الموقف والذكر',misc:'تحدٍّ في كل ما سبق'};

/* صفحة المحطة */
function openSec(si){ if(!unlocked(si)){ toastX('اجتز اختبار المحطة السابقة لتُفتح هذه المحطة','info'); return; } go('sec',{sec:si}); }
function vSec(){
  var B=book(), S=B.secs[V.sec], si=V.sec, seen=secSeen(si), tot=S.qs.length, best=ST.quiz[S.k];
  var first=0; for(var i=0;i<tot;i++){ if(!ST.seen[qid(si,i)]){ first=i; break; } }
  return '<div class="ln-wrap">'+crumbs([['تعلّم',"hhLnGo('home')"],[B.title,"hhLnGo('book')"],[S.t]])
   +'<div class="ln-sc" style="--c:'+S.c+'"><span class="n">'+sv(S.ic,34,1.7)+'</span><div class="m"><em>المحطة '+(si+1)+' من '+B.secs.length+'</em><h1>'+esc(S.t)+'</h1>'+(S.intro?'<p>'+esc(S.intro)+'</p>':'')+'</div>'
   +'<div class="r"><div class="ring sm" style="--p:'+Math.round(seen/tot*100)+'"><b>'+seen+'/'+tot+'</b></div>'+(best!=null?'<small>أفضل نتيجة في الاختبار '+best+'%</small>':'')+'</div></div>'
   +'<div class="ln-sa">'+modeSeg()+'<div class="bt"><button type="button" class="ln-b p" onclick="hhLnGo(\'lesson\','+si+','+first+')">'+sv('play',16)+(seen?'تابع الدروس':'ابدأ الدروس')+'</button>'
   +'<button type="button" class="ln-b" onclick="hhLnGo(\'quiz\','+si+')">'+sv('badge',16)+'اختبار المحطة</button>'
   +'<button type="button" class="ln-b" onclick="hhLnGame('+si+')">'+sv('boxes',16)+'العبها على الشاشة</button></div></div>'
   +'<div class="ln-ql">'+S.qs.map(function(q,qi){ var id=qid(si,qi), sn=!!ST.seen[id], m=ST.mem[id];
      return '<button type="button" class="ln-qi'+(sn?' sn':'')+'" onclick="hhLnGo(\'lesson\','+si+','+qi+')"><span class="nb">'+(sn?sv('check',14,3):q.n)+'</span><span class="tx">'+esc(q.q)+'</span>'+(m?'<span class="mb" title="درجة الحفظ">'+'<i class="'+(m[0]>=1?'on':'')+'"></i><i class="'+(m[0]>=3?'on':'')+'"></i><i class="'+(m[0]>=5?'on':'')+'"></i></span>':'')+'</button>'; }).join('')+'</div></div>';
}

/* ═══ الدرس ═══ */
var STEPS={think:['فكّر','q'],learn:['تعلّم','book'],ev:['الدليل','quote'],act:['طبّق','hands'],mem:['احفظ','brain']};
function stepsOf(q){ var L=['think','learn']; if(q.ev&&q.ev.length) L.push('ev'); if(q.act) L.push('act'); L.push('mem'); return L; }
function startLesson(si,qi){ if(!unlocked(si)){ toastX('هذه المحطة مقفلة بعد','info'); return; } V.sec=si; V.qi=qi; V.step=0; V.st={}; ST.last={si:si,qi:qi}; saveST(); go('lesson'); }
function curQ(){ return book().secs[V.sec].qs[V.qi]; }
function vLesson(){
  var B=book(), S=B.secs[V.sec], q=curQ(), L=stepsOf(q), k=L[V.step]||'think', scr=V.mode==='screen';
  var head='<div class="ln-lh"><button type="button" class="ln-ib" onclick="hhLnExit()" aria-label="خروج">'+sv('x',18,2.4)+'</button><span class="chip" style="--c:'+S.c+'">'+sv(S.ic,15)+esc(S.t)+'</span><h4>'+(S.k==='tafseer'?'السورة':S.k==='hadith'?'الحديث':'السؤال')+' '+(V.qi+1)+' من '+S.qs.length+'</h4>'
    +(scr?'<button type="button" class="ln-ib" onclick="hhLnFull()" aria-label="ملء الشاشة">'+sv('full',18)+'</button>':'<span class="xp">'+sv('star',14)+'<b class="ln-xp"><b>'+(ST.xp||0)+'</b></b></span>')+'</div>';
  var steps='<div class="ln-steps">'+L.map(function(s,i){ return '<button type="button" class="'+(i<V.step?'dn':i===V.step?'on':'')+'" onclick="hhLnStep('+i+')"><i></i><span>'+sv(STEPS[s][1],14)+STEPS[s][0]+'</span></button>'; }).join('')+'</div>';
  var body=k==='think'?sThink(q):k==='learn'?sLearn(q,S):k==='ev'?sEv(q,S):k==='act'?sAct(q,S):sMem(q);
  var last=V.step>=L.length-1, lastQ=V.qi>=S.qs.length-1;
  var foot='<div class="ln-lf"><button type="button" class="ln-b d" onclick="hhLnPrev()" '+(V.step===0&&V.qi===0?'disabled':'')+'>'+sv('back',16,2.4)+'السابق</button><span class="kb">'+(scr?'الأسهم للتنقل، والمسافة لكشف النقطة التالية':'')+'</span>'
    +(last?'<button type="button" class="ln-b g" onclick="hhLnNextQ()">'+(lastQ?'أنهِ المحطة':'السؤال التالي')+sv('next',16,2.4)+'</button>':'<button type="button" class="ln-b g" onclick="hhLnNext()">'+STEPS[L[V.step+1]][0]+sv('next',16,2.4)+'</button>')+'</div>';
  return '<div class="ln-ls'+(scr?' big':'')+'" style="--c:'+S.c+'">'+head+steps+'<div class="ln-lb" data-k="'+k+'">'+body+'</div>'+foot+'</div>';
}
function qTitle(q,S){ return '<div class="ln-qt"><span class="qn">'+(S.k==='tafseer'?'سورة':'س '+q.n)+'</span><h2>'+esc(q.q)+'</h2></div>'; }
/* فكّر */
function sThink(q){
  var S=book().secs[V.sec], o=q.pick.o, ord=shuf(o.map(function(_,i){ return i; }),qid(V.sec,V.qi)), ch=V.st.pick;
  var pq=q.pick.q?'<p class="ln-pq">'+esc(q.pick.q)+'</p>':'';
  return '<div class="ln-think">'+qTitle(q,S)+pq+'<p class="ln-hint">'+(ch==null?(V.mode==='screen'?'ناقش الصف، ثم اختر الجواب الذي اتفقوا عليه':'فكّر قبل أن ترى الجواب، واختر ما تراه صحيحاً'):ch===0?'أحسنت، جوابك صحيح':'ليس هذا، والصحيح هو المضيء. تعلّم السبب في الخطوة التالية')+'</p>'
   +'<div class="ln-opts">'+ord.map(function(i,j){ var c=ch==null?'':i===0?' ok':i===ch?' no':' off'; return '<button type="button" class="ln-op'+c+'" onclick="hhLnPick('+i+')" '+(ch!=null?'disabled':'')+'><span class="l">'+['أ','ب','ج','د'][j]+'</span><span class="t">'+esc(o[i])+'</span></button>'; }).join('')+'</div>'
   +(ch==null?'<button type="button" class="ln-skip" onclick="hhLnPick(-1)">'+sv('eye',15)+'اكشف الجواب</button>':'')+'</div>';
}
window.hhLnPick=function(i){ if(V.st.pick!=null) return; V.st.pick=i; if(i===0){ addXp(10); burst(); } render(); };
/* تعلّم */
function sLearn(q,S){
  var A=q.a||[], shown=V.st.shown==null?(A.length?1:0):V.st.shown;
  if(S.k==='tafseer'&&q.ev&&q.ev[0]&&q.ev[0].v){
    var mm={}; A.forEach(function(x){ var m=String(x).match(/^\s*(\d+)\s*[:：]\s*(.*)$/); if(m) mm[m[1]]=m[2]; });
    var V2=q.ev[0].v; shown=V.st.shown==null?1:V.st.shown;
    return '<div class="ln-learn">'+qTitle(q,S)+(q.lead?'<p class="ln-lead">'+esc(q.lead)+'</p>':'')+'<div class="ln-taf">'+V2.map(function(v,i){ var h=i>=shown; return '<div class="ln-tr'+(h?' hid':'')+'"><p class="ay">'+esc(v[1])+' <i>'+v[0]+'</i></p><p class="mn">'+(h?'':esc(mm[v[0]]||''))+'</p></div>'; }).join('')+'</div>'
      +(shown<V2.length?'<div class="ln-rv"><button type="button" class="ln-b" onclick="hhLnShow(1)">'+sv('eye',15)+'الآية التالية</button><button type="button" class="ln-b d" onclick="hhLnShow(99)">اكشف الكل</button></div>':'')+(q.note&&shown>=V2.length?'<p class="ln-note">'+sv('spark',15)+esc(q.note)+'</p>':'')+'</div>';
  }
  return '<div class="ln-learn">'+qTitle(q,S)+(q.lead?'<p class="ln-lead">'+esc(q.lead)+'</p>':'')+(!q.lead&&!A.length&&q.ev&&q.ev.length?'<p class="ln-lead">'+esc(q.ev[0].t==='q'?'جوابه في الآية الكريمة، تراها في الخطوة التالية.':'جوابه في '+(q.ev[0].t==='h'?'الحديث الشريف':'النص')+'، تراه في الخطوة التالية.')+'</p>':'')
   +(A.length?'<div class="ln-pts">'+A.map(function(x,i){ var h=i>=shown, hd=/[:：]$/.test(String(x).trim()); return '<div class="ln-pt'+(h?' hid':'')+(hd?' hd':'')+'">'+(hd?'':'<b>'+(i+1)+'</b>')+'<span>'+(h?'':fmtPt(x))+'</span></div>'; }).join('')+'</div>'
     +(shown<A.length?'<div class="ln-rv"><button type="button" class="ln-b" onclick="hhLnShow(1)">'+sv('eye',15)+'النقطة التالية</button><button type="button" class="ln-b d" onclick="hhLnShow(99)">اكشف الكل</button></div>':''):'')
   +(q.yr?'<p class="ln-yr">'+sv('route',15)+'متى؟ <b>'+esc(q.yr)+'</b></p>':'')
   +(q.note&&(shown>=A.length)?'<p class="ln-note">'+sv('spark',15)+esc(q.note)+'</p>':'')+'</div>';
}
function fmtPt(x){ x=String(x); var m=x.match(/^([^:：]{2,30})[:：]\s*(.+)$/); return m?'<em>'+esc(m[1])+'</em> '+esc(m[2]):esc(x); }
window.hhLnShow=function(n){ var q=curQ(), S=book().secs[V.sec], max=(S.k==='tafseer'&&q.ev[0]&&q.ev[0].v)?q.ev[0].v.length:(q.a||[]).length; var cur=V.st.shown==null?1:V.st.shown; V.st.shown=Math.min(max,cur+n); render(); };
/* الدليل */
function evHTML(e){
  if(e.t==='q') return '<div class="ln-ev q"><small>'+sv('book',14)+'قال الله تعالى</small><p class="ay">﴿'+e.v.map(function(v){ return esc(v[1])+(e.v.length>1?' <i>'+v[0]+'</i>':''); }).join(' ')+(e.part?' ...':'')+'﴾</p><em>'+esc(e.ref)+'</em></div>';
  return '<div class="ln-ev '+(e.t==='h'?'h':'s')+'"><small>'+sv('quote',14)+(e.t==='h'?'من السنة':'قول')+'</small><p>'+esc(e.x)+'</p>'+(e.r?'<em>'+esc(e.r)+'</em>':'')+'</div>';
}
function sEv(q,S){ return '<div class="ln-evs">'+qTitle(q,S)+(S.k==='tafseer'?'<p class="ln-hint">اقرأ السورة كاملة، ورددها حتى تحفظها</p>':'')+q.ev.map(evHTML).join('')+'</div>'; }
/* طبّق */
function sAct(q,S){ var a=q.act, t=a.type, f=ACT[t]; return '<div class="ln-act">'+qTitle(q,S)+(f?f(a,q):'')+'</div>'; }
var ACTT={order:'رتّب بالترتيب الصحيح',sort:'صنّف كل عبارة في مكانها',cloze:'أكمل الفراغات',match:'صل كل عنصر بما يناسبه',tf:'صواب أم خطأ؟',scene:'ماذا تفعل؟'};
function ahead(t,s){ return '<div class="ln-ah"><h3>'+sv(t==='order'?'sort':t==='match'?'link':t==='scene'?'hands':t==='cloze'?'scroll':t==='sort'?'grid':'check',18,2)+ACTT[t]+'</h3>'+(s?'<p>'+s+'</p>':'')+'</div>'; }
function aFoot(ok,msg){ return '<div class="ln-af'+(ok===true?' ok':ok===false?' no':'')+'"><span>'+(msg||'')+'</span>'+(ok===true?'':'<button type="button" class="ln-b g" onclick="hhLnCheck()">تحقّق</button>')+(ok===false?'<button type="button" class="ln-b d" onclick="hhLnReset()">أعد المحاولة</button>':'')+'</div>'; }
var ACT={
 order:function(a,q){ var st=V.st.a||(V.st.a={sel:[]}), items=a.items, pool=shuf(items.concat(a.trap||[]),'o'+qid(V.sec,V.qi)), done=st.ok;
   return ahead('order',(a.trap&&a.trap.length?'اضغط العناصر بالترتيب. انتبه: بينها عنصر دخيل ليس منها.':'اضغط العناصر بالترتيب من الأول إلى الأخير.'))
    +'<div class="ln-slots">'+items.map(function(_,i){ var v=st.sel[i], c=done!=null&&v!=null?(v===items[i]?' ok':' no'):''; return '<button type="button" class="ln-slot'+(v!=null?' f':'')+c+'" onclick="hhLnUn('+i+')"><i>'+(i+1)+'</i><span>'+esc(v||'')+'</span></button>'; }).join('')+'</div>'
    +'<div class="ln-pool">'+pool.map(function(x,i){ var u=st.sel.indexOf(x)>-1; return '<button type="button" class="ln-chip'+(u?' us':'')+'" onclick="hhLnPut('+i+')" '+(u||done===true?'disabled':'')+' data-v="'+esc(x)+'">'+esc(x)+'</button>'; }).join('')+'</div>'
    +aFoot(done,done===true?'ممتاز، الترتيب صحيح':done===false?'بعض المواضع غير صحيحة':st.sel.length+' من '+items.length); },
 sort:function(a){ var st=V.st.a||(V.st.a={put:{},cur:null}), done=st.ok, it=shuf(a.items.map(function(x,i){ return i; }),'s'+qid(V.sec,V.qi));
   var free=it.filter(function(i){ return st.put[i]==null; });
   return ahead('sort','اختر العبارة، ثم اضغط السلة المناسبة لها.')
    +'<div class="ln-pool">'+free.map(function(i){ return '<button type="button" class="ln-chip'+(st.cur===i?' cur':'')+'" onclick="hhLnSel('+i+')">'+esc(a.items[i][0])+'</button>'; }).join('')+(free.length?'':'<span class="ln-dn">'+sv('check',14,3)+'وُزّعت كل العبارات</span>')+'</div>'
    +'<div class="ln-bins" style="--n:'+a.bins.length+'">'+a.bins.map(function(b,bi){ var ins=it.filter(function(i){ return st.put[i]===bi; }); return '<div class="ln-bin" onclick="hhLnBin('+bi+')" role="button" tabindex="0"><h4>'+esc(b)+'</h4>'+ins.map(function(i){ var c=done!=null?(a.items[i][1]===bi?' ok':' no'):''; return '<button type="button" class="ln-chip in'+c+'" onclick="event.stopPropagation();hhLnOut('+i+')">'+esc(a.items[i][0])+'</button>'; }).join('')+'</div>'; }).join('')+'</div>'
    +aFoot(done,done===true?'ممتاز، كل عبارة في مكانها':done===false?'بعض العبارات في غير مكانها':''); },
 cloze:function(a){ var st=V.st.a||(V.st.a={f:{}}), done=st.ok, parts=String(a.x).split(/(\[\[[^\]]+\]\])/), ans=[], bank;
   parts.forEach(function(p){ var m=p.match(/^\[\[(.+)\]\]$/); if(m) ans.push(m[1]); });
   bank=shuf(ans.concat(a.alt||[]),'c'+qid(V.sec,V.qi)); var bi=0;
   var txt=parts.map(function(p){ var m=p.match(/^\[\[(.+)\]\]$/); if(!m) return esc(p); var i=bi++, v=st.f[i], c=done!=null&&v!=null?(v===ans[i]?' ok':' no'):''; return '<button type="button" class="ln-gap'+(v!=null?' f':'')+c+'" onclick="hhLnGapOut('+i+')">'+(v!=null?esc(v):'&nbsp;')+'</button>'; }).join('');
   var used={}; Object.keys(st.f).forEach(function(k){ used[st.f[k]]=(used[st.f[k]]||0)+1; });
   return ahead('cloze','اضغط الكلمة لتضعها في أول فراغ.')+'<p class="ln-clz">'+txt+'</p><div class="ln-pool">'+bank.map(function(w,i){ var u=used[w]>0; if(u) used[w]--; return '<button type="button" class="ln-chip'+(u?' us':'')+'" '+(u||done===true?'disabled':'')+' onclick="hhLnGap('+i+')" data-w="'+esc(w)+'">'+esc(w)+'</button>'; }).join('')+'</div>'
    +aFoot(done,done===true?'أحسنت، النص صحيح':done===false?'راجع الكلمات الحمراء':''); },
 match:function(a){ var st=V.st.a||(V.st.a={m:{},cur:null}), done=st.ok, P=a.pairs, R=shuf(P.map(function(_,i){ return i; }),'m'+qid(V.sec,V.qi)), col=['#C2274F','#1E8A5C','#C88A1E','#1F5E9E','#6A42A8','#0E8288','#C0562F','#2C3E73'];
   var rev={}; Object.keys(st.m).forEach(function(l){ rev[st.m[l]]=+l; });
   function L(x){ return x&&typeof x==='object'?'<span class="ay">'+esc(x.x)+' <i>'+x.ay+'</i></span>':esc(x); }
   return ahead('match','اضغط عنصراً من اليمين، ثم ما يقابله من اليسار.')+'<div class="ln-mt"><div class="cl"><h5>'+esc(a.l||'')+'</h5>'+P.map(function(p,i){ var m=st.m[i], c=m!=null?' f':'', ok=done!=null&&m!=null?(m===i?' ok':' no'):''; return '<button type="button" class="ln-mi'+c+ok+(st.cur===i?' cur':'')+'" style="'+(m!=null?'--k:'+col[i%8]:'')+'" onclick="hhLnML('+i+')">'+L(p[0])+'</button>'; }).join('')+'</div>'
    +'<div class="cl"><h5>'+esc(a.r||'')+'</h5>'+R.map(function(j){ var l=rev[j], ok=done!=null&&l!=null?(l===j?' ok':' no'):''; return '<button type="button" class="ln-mi'+(l!=null?' f':'')+ok+'" style="'+(l!=null?'--k:'+col[l%8]:'')+'" onclick="hhLnMR('+j+')">'+esc(P[j][1])+'</button>'; }).join('')+'</div></div>'
    +aFoot(done,done===true?'ممتاز، كل التوصيلات صحيحة':done===false?'بعض التوصيلات غير صحيحة':''); },
 tf:function(a){ var st=V.st.a||(V.st.a={v:{}}), done=st.ok;
   return ahead('tf','احكم على كل عبارة.')+'<div class="ln-tfs">'+a.items.map(function(it,i){ var v=st.v[i], ok=done!=null&&v!=null?(v===it[1]):null; return '<div class="ln-tf'+(ok===true?' ok':ok===false?' no':'')+'"><p>'+esc(it[0])+'</p><div class="b"><button type="button" class="'+(v===true?'on':'')+'" onclick="hhLnTF('+i+',1)">'+sv('check',15,3)+'صواب</button><button type="button" class="'+(v===false?'on':'')+'" onclick="hhLnTF('+i+',0)">'+sv('x',15,3)+'خطأ</button></div>'+(done!=null&&!it[1]&&it[2]?'<small>'+sv('spark',13)+esc(it[2])+'</small>':'')+'</div>'; }).join('')+'</div>'
    +aFoot(done,done===true?'ممتاز، كل أحكامك صحيحة':done===false?'راجع العبارات الحمراء':''); },
 scene:function(a){ var st=V.st.a||(V.st.a={}), ch=st.c, ord=shuf(a.o.map(function(_,i){ return i; }),'sc'+qid(V.sec,V.qi));
   return ahead('scene')+'<div class="ln-scn"><span class="ic">'+sv('user',26)+'</span><p>'+esc(a.x)+'</p></div><div class="ln-opts">'+ord.map(function(i,j){ var c=ch==null?'':i===0?' ok':i===ch?' no':' off'; return '<button type="button" class="ln-op'+c+'" onclick="hhLnScene('+i+')" '+(ch!=null?'disabled':'')+'><span class="l">'+['أ','ب','ج','د'][j]+'</span><span class="t">'+esc(a.o[i])+'</span></button>'; }).join('')+'</div>'
    +(ch!=null?'<div class="ln-af '+(ch===0?'ok':'no')+'"><span>'+(ch===0?'أحسنت، هذا هو التصرف الصحيح':'التصرف الصحيح هو المضيء')+'</span></div>':''); }
};
function A(){ return V.st.a; }
window.hhLnPut=function(i){ var q=curQ(), a=q.act, st=A(), pool=shuf(a.items.concat(a.trap||[]),'o'+qid(V.sec,V.qi)); if(st.sel.length>=a.items.length) return; st.sel.push(pool[i]); st.ok=null; if(st.sel.length===a.items.length) return hhLnCheck(); render(); };
window.hhLnUn=function(i){ var st=A(); if(st.ok===true) return; if(st.sel[i]==null) return; st.sel.splice(i,1); st.ok=null; render(); };
window.hhLnSel=function(i){ var st=A(); st.cur=st.cur===i?null:i; render(); };
window.hhLnBin=function(b){ var st=A(); if(st.cur==null||st.ok===true) return; st.put[st.cur]=b; st.cur=null; st.ok=null; var a=curQ().act; if(Object.keys(st.put).length===a.items.length) return hhLnCheck(); render(); };
window.hhLnOut=function(i){ var st=A(); if(st.ok===true) return; delete st.put[i]; st.ok=null; render(); };
window.hhLnGap=function(i){ var a=curQ().act, st=A(), parts=String(a.x).match(/\[\[[^\]]+\]\]/g)||[], ans=parts.map(function(p){ return p.slice(2,-2); }), bank=shuf(ans.concat(a.alt||[]),'c'+qid(V.sec,V.qi)), w=bank[i];
  for(var k=0;k<ans.length;k++){ if(st.f[k]==null){ st.f[k]=w; break; } } st.ok=null; if(Object.keys(st.f).length===ans.length) return hhLnCheck(); render(); };
window.hhLnGapOut=function(i){ var st=A(); if(st.ok===true) return; delete st.f[i]; st.ok=null; render(); };
window.hhLnML=function(i){ var st=A(); if(st.ok===true) return; if(st.m[i]!=null){ delete st.m[i]; st.ok=null; } st.cur=st.cur===i?null:i; render(); };
window.hhLnMR=function(j){ var st=A(); if(st.ok===true) return; var P=curQ().act.pairs; Object.keys(st.m).forEach(function(l){ if(st.m[l]===j) delete st.m[l]; }); if(st.cur!=null){ st.m[st.cur]=j; st.cur=null; } st.ok=null; if(Object.keys(st.m).length===P.length) return hhLnCheck(); render(); };
window.hhLnTF=function(i,v){ var st=A(); if(st.ok===true) return; st.v[i]=!!v; st.ok=null; var a=curQ().act; if(Object.keys(st.v).length===a.items.length) return hhLnCheck(); render(); };
window.hhLnScene=function(i){ var st=A(); if(st.c!=null) return; st.c=i; if(i===0){ addXp(15); burst(); } render(); };
window.hhLnCheck=function(){ var a=curQ().act, st=A(), ok=false;
  if(a.type==='order') ok=st.sel.length===a.items.length&&st.sel.every(function(v,i){ return v===a.items[i]; });
  else if(a.type==='sort') ok=a.items.every(function(x,i){ return st.put[i]===x[1]; });
  else if(a.type==='cloze'){ var ans=(String(a.x).match(/\[\[[^\]]+\]\]/g)||[]).map(function(p){ return p.slice(2,-2); }); ok=ans.every(function(w,i){ return st.f[i]===w; }); }
  else if(a.type==='match') ok=a.pairs.every(function(_,i){ return st.m[i]===i; });
  else if(a.type==='tf') ok=a.items.every(function(it,i){ return st.v[i]===it[1]; });
  st.ok=ok; if(ok){ if(!st.xp){ st.xp=1; addXp(st.tries?10:20); } burst(); } else st.tries=(st.tries||0)+1; render(); };
window.hhLnReset=function(){ V.st.a=null; render(); };
/* احفظ */
function sMem(q){
  var S=book().secs[V.sec], id=qid(V.sec,V.qi), m=ST.mem[id], rv=V.st.mrev;
  var ans=q.lead?'<p class="ln-lead sm">'+esc(q.lead)+'</p>':'';
  if(q.a&&q.a.length&&S.k!=='tafseer') ans+='<ol class="ln-mol">'+q.a.filter(function(x){ return !/[:：]$/.test(String(x).trim()); }).map(function(x){ return '<li>'+fmtPt(x)+'</li>'; }).join('')+'</ol>';
  if(!ans&&q.ev&&q.ev[0]) ans=evHTML(q.ev[0]);
  if(S.k==='tafseer') ans='<p class="ln-lead sm">اقرأ سورة '+esc(String(q.q).replace(/^.*سورة\s*/,'').replace(/\s*وفسرها.*$/,'').replace(/["«»]/g,''))+' من حفظك، ثم اكشف لتتأكد.</p>'+(rv?evHTML(q.ev[0]):'');
  return '<div class="ln-mem"><div class="ln-card'+(rv?' fl':'')+'"><div class="fr"><span class="tg">'+sv('brain',15)+'سمّع من حفظك</span>'+qTitle(q,S)+(rv?'<div class="an">'+ans+'</div>':'<button type="button" class="ln-b g" onclick="hhLnMRev()">'+sv('eye',16)+'اكشف الجواب</button>')+'</div></div>'
   +(rv?'<div class="ln-mb"><p>هل حفظته؟</p><div><button type="button" class="ln-b ok" onclick="hhLnRate(1)">'+sv('check',16,3)+'حفظته</button><button type="button" class="ln-b d" onclick="hhLnRate(0)">'+sv('refresh',16)+'أحتاج مراجعة</button></div><small>'+(m?'يعود إليك هذا السؤال للمراجعة بعد أيام، وكلما حفظته طالت المدة':'سنذكّرك بهذا السؤال في «مراجعة اليوم»')+'</small></div>':'')+'</div>';
}
window.hhLnMRev=function(){ V.st.mrev=1; render(); };
function rate(id,ok){ var m=ST.mem[id]||[0,0]; var b=ok?Math.min(5,m[0]+1):0; ST.mem[id]=[b,today()+(ok?BOX[b]:0)+(ok?0:1)]; }
window.hhLnRate=function(ok){ rate(qid(V.sec,V.qi),ok); if(ok) addXp(5); else saveST(); hhLnNextQ(); };
/* التنقل */
function markSeen(){ var id=qid(V.sec,V.qi); if(!ST.seen[id]){ ST.seen[id]=today(); if(!ST.mem[id]) ST.mem[id]=[0,today()+1]; addXp(5); } }
window.hhLnStep=function(i){ V.step=i; if(i>=1) V.st.shown=V.st.shown; render(); };
window.hhLnNext=function(){ var L=stepsOf(curQ()); if(V.step<L.length-1){ V.step++; if(L[V.step]==='mem') markSeen(); render(); } else hhLnNextQ(); };
window.hhLnPrev=function(){ if(V.step>0){ V.step--; render(); return; } if(V.qi>0){ V.qi--; V.st={}; V.step=stepsOf(curQ()).length-1; render(); } };
window.hhLnNextQ=function(){ markSeen(); var S=book().secs[V.sec]; if(V.qi<S.qs.length-1){ V.qi++; V.step=0; V.st={}; ST.last={si:V.sec,qi:V.qi}; saveST(); render(); var h=$('hh-learn'); if(h) h.scrollTop=0; } else { saveST(); go('sec'); toastX('أنهيت دروس «'+S.t+'»، ادخل اختبار المحطة','success'); } };
window.hhLnExit=function(){ if(document.fullscreenElement){ try{ document.exitFullscreen(); }catch(e){} } go(V.view==='review'?'book':'sec'); };
window.hhLnFull=function(){ try{ if(document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen(); }catch(e){} };
document.addEventListener('keydown',function(e){ if(!$('hh-learn')||V.view!=='lesson') return; var t=e.target; if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA')) return;
  if(e.key==='ArrowLeft'){ e.preventDefault(); hhLnNext(); } else if(e.key==='ArrowRight'){ e.preventDefault(); hhLnPrev(); } else if(e.key===' '&&stepsOf(curQ())[V.step]==='learn'){ e.preventDefault(); hhLnShow(1); } else if(e.key==='Escape'){ hhLnExit(); } });

/* ═══ اختبار المحطة ═══ */
function startQuiz(si){ if(!unlocked(si)) return; var S=book().secs[si], idx=shuf(S.qs.map(function(_,i){ return i; })).slice(0,Math.min(10,S.qs.length));
  V.sec=si; V.quiz={idx:idx,i:0,ok:0,ch:null,ord:null}; go('quiz'); }
function vQuiz(){
  var Q=V.quiz, S=book().secs[V.sec], scr=V.mode==='screen';
  if(Q.i>=Q.idx.length){ var pc=Math.round(Q.ok/Q.idx.length*100), pass=pc>=70, best=ST.quiz[S.k]||0;
    if(!Q.saved){ Q.saved=1; if(pc>best) ST.quiz[S.k]=pc; addXp(Q.ok*5); }
    var stars=pc>=90?3:pc>=70?2:pc>=40?1:0, nx=V.sec+1<book().secs.length;
    return '<div class="ln-ls'+(scr?' big':'')+'" style="--c:'+S.c+'"><div class="ln-res"><div class="stars">'+[0,1,2].map(function(i){ return '<i class="'+(i<stars?'on':'')+'">'+sv('star',46)+'</i>'; }).join('')+'</div><h2>'+(pass?'أحسنت! اجتزت محطة «'+esc(S.t)+'»':'قاربت، راجع الدروس وحاول مرة أخرى')+'</h2><p class="sc"><b>'+Q.ok+'</b> من '+Q.idx.length+' <span>'+pc+'%</span></p>'
      +'<div class="bt">'+(pass&&nx?'<button type="button" class="ln-b g" onclick="hhLnGo(\'sec\','+(V.sec+1)+')">المحطة التالية'+sv('next',16,2.4)+'</button>':'')+(pass?'<button type="button" class="ln-b" onclick="hhLnCertOpen()">'+sv('badge',16)+'شهادة الإنجاز</button>':'')+'<button type="button" class="ln-b" onclick="hhLnGo(\'quiz\','+V.sec+')">'+sv('refresh',16)+'أعد الاختبار</button><button type="button" class="ln-b d" onclick="hhLnGo(\'sec\','+V.sec+')">صفحة المحطة</button></div></div></div>';
  }
  var q=S.qs[Q.idx[Q.i]], o=q.pick.o; if(!Q.ord) Q.ord=shuf(o.map(function(_,i){ return i; }));
  return '<div class="ln-ls'+(scr?' big':'')+'" style="--c:'+S.c+'"><div class="ln-lh"><button type="button" class="ln-ib" onclick="hhLnGo(\'sec\','+V.sec+')" aria-label="خروج">'+sv('x',18,2.4)+'</button><span class="chip" style="--c:'+S.c+'">'+sv('badge',15)+'اختبار '+esc(S.t)+'</span><h4>'+(Q.i+1)+' من '+Q.idx.length+'</h4><span class="xp">'+sv('check',14,3)+Q.ok+'</span></div>'
   +'<div class="ln-qbar"><i style="width:'+Math.round(Q.i/Q.idx.length*100)+'%"></i></div><div class="ln-lb">'+qTitle(q,S)+(q.pick.q?'<p class="ln-pq">'+esc(q.pick.q)+'</p>':'')
   +'<div class="ln-opts">'+Q.ord.map(function(i,j){ var c=Q.ch==null?'':i===0?' ok':i===Q.ch?' no':' off'; return '<button type="button" class="ln-op'+c+'" onclick="hhLnQ('+i+')" '+(Q.ch!=null?'disabled':'')+'><span class="l">'+['أ','ب','ج','د'][j]+'</span><span class="t">'+esc(o[i])+'</span></button>'; }).join('')+'</div></div>'
   +'<div class="ln-lf"><span></span>'+(Q.ch!=null?'<button type="button" class="ln-b g" onclick="hhLnQN()">'+(Q.i+1<Q.idx.length?'التالي':'النتيجة')+sv('next',16,2.4)+'</button>':'')+'</div></div>';
}
window.hhLnQ=function(i){ var Q=V.quiz; if(Q.ch!=null) return; Q.ch=i; if(i===0){ Q.ok++; burst(); } render(); };
window.hhLnQN=function(){ var Q=V.quiz; Q.i++; Q.ch=null; Q.ord=null; render(); };

/* ═══ مراجعة اليوم ═══ */
function startReview(){ var L=dueList(); if(!L.length){ toastX('لا أسئلة للمراجعة اليوم','info'); return; } V.rev={L:shuf(L).slice(0,15),i:0,show:0,ok:0}; go('review'); }
function vReview(){
  var R=V.rev, B=book();
  if(R.i>=R.L.length) return '<div class="ln-ls"><div class="ln-res"><div class="stars"><i class="on">'+sv('brain',46)+'</i></div><h2>أنهيت مراجعة اليوم</h2><p class="sc"><b>'+R.ok+'</b> من '+R.L.length+' حفظتها</p><div class="bt"><button type="button" class="ln-b g" onclick="hhLnGo(\'book\')">العودة إلى المسار</button></div></div></div>';
  var si=R.L[R.i][0], qi=R.L[R.i][1], S=B.secs[si], q=S.qs[qi]; var sv0=V.sec, qv0=V.qi; V.sec=si; V.qi=qi; V.st={mrev:R.show};
  var card=sMem(q).replace(/hhLnMRev\(\)/g,'hhLnRvShow()').replace(/hhLnRate\(/g,'hhLnRvRate(');
  return '<div class="ln-ls" style="--c:'+S.c+'"><div class="ln-lh"><button type="button" class="ln-ib" onclick="hhLnGo(\'book\')" aria-label="خروج">'+sv('x',18,2.4)+'</button><span class="chip" style="--c:'+S.c+'">'+sv('brain',15)+'مراجعة اليوم، '+esc(S.t)+'</span><h4>'+(R.i+1)+' من '+R.L.length+'</h4></div><div class="ln-qbar"><i style="width:'+Math.round(R.i/R.L.length*100)+'%"></i></div><div class="ln-lb">'+card+'</div></div>';
}
window.hhLnRvShow=function(){ V.rev.show=1; render(); };
window.hhLnRvRate=function(ok){ var R=V.rev, x=R.L[R.i]; rate(qid(x[0],x[1]),ok); if(ok){ R.ok++; addXp(5); } else saveST(); R.i++; R.show=0; render(); };

/* ═══ الشهادة ═══ */
window.hhLnCertOpen=function(){ go('cert'); };
function vCert(){ var B=book(), S=B.secs[V.sec], u=me(), nm=(u&&(u.displayName||''))||'', pc=ST.quiz[S.k]||0;
  return '<div class="ln-wrap">'+crumbs([['تعلّم',"hhLnGo('home')"],[B.title,"hhLnGo('book')"],[S.t,"hhLnGo('sec',"+V.sec+")"],['شهادة الإنجاز']])
   +'<div class="ln-cert" id="ln-cert"><div class="in"><i class="cr tl"></i><i class="cr tr"></i><i class="cr bl"></i><i class="cr br"></i><small>منصة المُلهم التعليمي، برنامج «تعلّم»</small><h1>شهادة إنجاز</h1><p>تشهد المنصة بأن</p><input id="ln-cn" value="'+esc(nm)+'" placeholder="اكتب اسم الطالب" aria-label="اسم الطالب"><p>أتمّ محطة <b>«'+esc(S.t)+'»</b> من كتاب <b>«'+esc(B.title)+'»</b><br>واجتاز اختبارها بنتيجة <b>'+pc+'%</b></p><div class="ft"><span>'+new Date().toLocaleDateString('ar-QA-u-nu-latn',{day:'numeric',month:'long',year:'numeric'})+'</span><span class="sl">'+sv('badge',40,1.5)+'</span><span>المُلهم</span></div></div></div>'
   +'<div class="ln-cact"><button type="button" class="ln-b p" onclick="hhLnPrint()">'+sv('print',16)+'اطبع الشهادة</button><button type="button" class="ln-b d" onclick="hhLnGo(\'sec\','+V.sec+')">رجوع</button></div></div>'; }
window.hhLnPrint=function(){ var c=$('ln-cert'); if(!c) return; var n=$('ln-cn'); var nm=n?n.value.trim():''; if(!nm){ toastX('اكتب اسم الطالب أولاً','info'); if(n) n.focus(); return; }
  var w=window.open('','_blank'); if(!w) return; var h=c.outerHTML.replace(/<input[^>]*>/,'<div class="nm">'+esc(nm)+'</div>');
  w.document.write('<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>شهادة إنجاز</title><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;900&family=Amiri:wght@700&family=Reem+Kufi:wght@700&display=swap" rel="stylesheet"><style>@page{size:A4 landscape;margin:0}body{margin:0;font-family:Cairo,sans-serif}'+CERTCSS+'.ln-cert{width:297mm;height:210mm;border-radius:0;box-shadow:none}</style></head><body>'+h+'<script>setTimeout(function(){print()},700)<\/script></body></html>'); w.document.close(); };

/* ═══ الشاشة والمباشر ═══ */
function gameQs(si){ var S=book().secs[si]; return S.qs.map(function(q){ var o=q.pick.o, ord=shuf(o.map(function(_,i){ return i; }),'g'+S.k+q.n), opts=ord.map(function(i){ return o[i]; }); while(opts.length<4) opts.push('');
  return {id:'ln_'+S.k+'_'+q.n,type:'mcq',q:(q.pick.q||q.q),opts:opts.slice(0,4),correct:[ord.indexOf(0)],time:20,mult:1,flash:false,note:'',uk:S.k,un:S.t,uc:S.c}; }); }
function gameOf(si,mode){ var S=book().secs[si]; return {id:'learn_'+book().id+'_'+S.k,title:'«'+S.t+'» من '+book().title,template:'race',mode:mode,screenTpl:'boxes',settings:{},questions:gameQs(si),status:'ready'}; }
window.hhLnGame=function(si){ if(typeof window.hhScreenPlay!=='function'){ toastX('وحدة العرض على الشاشة غير محمّلة','error'); return; } hhScreenPlay(gameOf(si,'screen')); };
function liveDlg(){
  var B=book(), h=$('hh-learn'); if(!h) return;
  var ov=document.createElement('div'); ov.className='ln-scrim'; ov.id='ln-live';
  ov.innerHTML='<div class="ln-dlg" role="dialog" aria-modal="true" aria-label="مع دخول الطلاب"><div class="dh"><div><b>مع دخول الطلاب</b><small>يدخل الطلاب برمز من أجهزتهم، ويجيبون عن أسئلة المحطة في جولة مباشرة، والنتائج على شاشة الصف</small></div><button type="button" class="x" aria-label="إغلاق" onclick="this.closest(\'.ln-scrim\').remove()">'+sv('x',16,2.4)+'</button></div>'
    +'<div class="in"><h4>اختر المحطة</h4><div class="g">'+B.secs.map(function(S,si){ return '<button type="button" style="--c:'+S.c+'" onclick="hhLnLive('+si+')"><i>'+sv(S.ic,20)+'</i><b>'+esc(S.t)+'</b><small>'+S.qs.length+' سؤالاً</small></button>'; }).join('')+'</div>'
    +'<p class="nt">'+sv('tv',15)+'تحتاج حساب معلم. ولشرح الدروس على الشاشة دون دخول الطلاب اختر «أعرض على الصف».</p></div></div>';
  h.appendChild(ov); ov.addEventListener('click',function(e){ if(e.target===ov) ov.remove(); });
}
window.hhLnLive=function(si){ var d=$('ln-live'); if(d) d.remove(); var u=me(); if(!u||!u.uid){ toastX('سجّل الدخول بحساب المعلم لبدء جولة مباشرة','error'); return; }
  if(typeof window.hhLiveHost!=='function'){ toastX('وحدة التشغيل المباشر غير محمّلة','error'); return; } var g=gameOf(si,'live'); hhLearnClose(); hhLiveHost(g); };

/* ═══ تأثير النجاح ═══ */
function burst(){ if(RM) return; var h=$('hh-learn'); if(!h) return; var b=document.createElement('div'); b.className='ln-burst'; for(var i=0;i<18;i++){ var s=document.createElement('i'); s.style.setProperty('--a',(i*20)+'deg'); s.style.setProperty('--d',(60+Math.random()*80)+'px'); s.style.background=['#E6CE8E','#3FB884','#fff','#C2274F'][i%4]; b.appendChild(s); } h.appendChild(b); setTimeout(function(){ b.remove(); },900); }
function bind(h){ var f=V.mode==='screen'?null:h.querySelector('.ln-lf .ln-b.g'); if(f&&V.view==='lesson'&&h._lv!==V.qi+'-'+V.step){ h._lv=V.qi+'-'+V.step; try{ f.focus({preventScroll:true}); }catch(e){} } }

/* ═══ الأنماط ═══ */
var CERTCSS='.ln-cert{position:relative;background:#FFFDF8;border-radius:20px;padding:22px;box-shadow:0 20px 50px rgba(61,9,24,.12);aspect-ratio:1.414;max-width:900px;margin:0 auto;box-sizing:border-box}'
 +'.ln-cert .in{position:relative;height:100%;border:3px double #B8924A;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;padding:24px;box-sizing:border-box;background:radial-gradient(70% 60% at 50% 40%,#FBF1DA,transparent)}'
 +'.ln-cert .cr{position:absolute;width:46px;height:46px;border:3px solid #8A1538}.ln-cert .tl{top:10px;right:10px;border-width:3px 3px 0 0;border-radius:0 12px 0 0}.ln-cert .tr{top:10px;left:10px;border-width:3px 0 0 3px;border-radius:12px 0 0 0}.ln-cert .bl{bottom:10px;right:10px;border-width:0 3px 3px 0;border-radius:0 0 12px 0}.ln-cert .br{bottom:10px;left:10px;border-width:0 0 3px 3px;border-radius:0 0 0 12px}'
 +'.ln-cert small{font-size:14px;font-weight:800;color:#8A6D2E}.ln-cert h1{margin:0;font-family:"Reem Kufi",Cairo;font-size:52px;color:#8A1538}.ln-cert p{margin:0;font-size:19px;font-weight:700;color:#3D0918;line-height:1.9}.ln-cert b{color:#8A1538}'
 +'.ln-cert input,.ln-cert .nm{font-family:Amiri,serif;font-size:42px;font-weight:700;color:#3D0918;text-align:center;border:0;border-bottom:2px dashed #B8924A;background:transparent;min-width:60%;max-width:100%;box-sizing:border-box;padding:2px 10px;outline:0}.ln-cert .nm{border-bottom-style:solid}'
 +'.ln-cert .ft{display:flex;justify-content:space-between;align-items:center;width:80%;margin-top:14px;font-weight:800;color:#7A6A54}.ln-cert .sl{color:#B8924A}';
var CSS=[
'#hh-learn{--m:#8A1538;--m7:#5E0E26;--m9:#3D0918;--g:#B8924A;--gl:#E6CE8E;--bg:#F7F2EA;--card:#fff;--ln:#E7DAC0;--ink:#2A1A0E;--hd:#3D0918;--mu:#7A6A54;--soft:#F5EEE2;position:fixed;top:var(--hh-bar,80px);bottom:var(--hh-bar-b,0px);left:0;right:0;z-index:2900;overflow-y:auto;background:var(--bg);color:var(--ink);direction:rtl;font-family:Cairo,Tahoma,sans-serif;font-variant-numeric:tabular-nums;}',
'body.dark-mode #hh-learn{--bg:#160A0F;--card:#22121A;--ln:#3E2C24;--ink:#EFE3CC;--hd:#F5E6C4;--mu:#B8A68A;--soft:#2A1720;}',
'#hh-learn *{box-sizing:border-box;} #hh-learn button{font-family:inherit;} #hh-learn svg{flex-shrink:0;}',
'#hh-learn.ln-dk{background:radial-gradient(120% 80% at 70% -10%,#5A1029,transparent 60%),linear-gradient(180deg,#3A0A1B,#1E050E);color:#FFF8EA;}',
'#hh-learn.ln-stg{top:0;bottom:0;z-index:100050;}',
'.ln-wrap{max-width:1180px;margin:0 auto;padding:24px 24px 60px;}',
'.ln-cr{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:13px;font-weight:800;color:var(--mu);margin:0 0 14px;} .ln-cr button{all:unset;cursor:pointer;color:var(--m);} .ln-cr button:hover{text-decoration:underline;} .ln-cr b{color:var(--hd);}',
'body.dark-mode #hh-learn .ln-cr button{color:var(--gl);}',
'.ln-b{all:unset;box-sizing:border-box;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;height:46px;padding:0 20px;border-radius:13px;font-weight:900;font-size:15px;border:1.5px solid var(--ln);color:var(--hd);background:var(--card);transition:transform .15s,box-shadow .15s;white-space:nowrap;}',
'.ln-b:hover{transform:translateY(-1px);} .ln-b:focus-visible{outline:3px solid var(--g);outline-offset:2px;} .ln-b[disabled]{opacity:.4;cursor:default;transform:none;}',
'.ln-b.p{background:linear-gradient(180deg,#8A1538,#5E0E26);color:#fff;border-color:transparent;box-shadow:0 8px 18px rgba(138,21,56,.25);}',
'.ln-b.g{background:linear-gradient(180deg,#F1DC9E,#C9A35A);color:#3D0918;border-color:transparent;box-shadow:0 6px 0 #9C7A3A;} .ln-b.g:active{transform:translateY(3px);box-shadow:0 3px 0 #9C7A3A;}',
'.ln-b.ok{background:#23855A;color:#fff;border-color:transparent;} .ln-b em{font-style:normal;background:#8A1538;color:#fff;border-radius:20px;padding:0 8px;font-size:12px;}',
'#hh-learn.ln-dk .ln-b:not(.g):not(.p):not(.ok){background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.18);color:#FFF8EA;}',
/* home */
'.ln-hero{position:relative;overflow:hidden;border-radius:26px;background:radial-gradient(90% 130% at 85% 0%,#A3274C,transparent 60%),linear-gradient(135deg,#5E0E26,#2A0711);color:#fff;padding:34px 36px;display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center;}',
'.ln-hero .pat{position:absolute;inset:0;opacity:.08;background-image:radial-gradient(circle at 20px 20px,#fff 2px,transparent 3px);background-size:40px 40px;}',
'.ln-hero .tx{position:relative;} .ln-hero small{display:inline-block;font-size:12.5px;font-weight:900;background:rgba(230,206,142,.18);color:var(--gl);border-radius:20px;padding:2px 12px;}',
'.ln-hero h1{margin:6px 0 8px;font-family:"Reem Kufi",Cairo;font-size:48px;color:var(--gl);line-height:1.2;} .ln-hero p{margin:0;font-size:16.5px;font-weight:700;line-height:1.95;opacity:.92;max-width:680px;}',
'.ln-hero .ic{position:relative;width:120px;height:120px;border-radius:32px;background:rgba(255,255,255,.1);border:1.5px solid rgba(230,206,142,.4);display:grid;place-items:center;color:var(--gl);}',
'.ln-progs{display:grid;grid-template-columns:2fr 1fr 1fr;gap:16px;margin-top:18px;}',
'.ln-pc{all:unset;box-sizing:border-box;background:var(--card);border:1.5px solid var(--ln);border-radius:22px;overflow:hidden;display:flex;flex-direction:column;}',
'button.ln-pc{cursor:pointer;transition:transform .2s,box-shadow .2s;} button.ln-pc:hover{transform:translateY(-3px);box-shadow:0 18px 40px rgba(138,21,56,.16);} button.ln-pc:focus-visible{outline:3px solid var(--g);outline-offset:3px;}',
'.ln-pc.ft{border-color:var(--g);} .ln-pc .cv{min-height:190px;background:linear-gradient(135deg,#E6F4F7,#C4E3EA);display:flex;align-items:center;gap:24px;padding:20px 26px;}',
'.ln-pc .cv .t em{font-style:normal;display:inline-block;font-size:12px;font-weight:900;color:#1F7A93;background:#fff;border-radius:20px;padding:2px 12px;margin-bottom:8px;}',
'.ln-pc .cv .t h3{margin:0;font-family:Amiri,serif;font-size:32px;line-height:1.35;color:#14586B;} .ln-pc .cv .t small{display:block;margin-top:6px;font-size:13px;font-weight:800;color:#4D8594;}',
'.ln-pc .bd{padding:16px 20px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;} .ln-pc .st{display:flex;gap:18px;flex:1;flex-wrap:wrap;}',
'.ln-pc .st span,.ln-bk .st span{font-size:13px;font-weight:800;color:var(--mu);} .ln-pc .st b,.ln-bk .st b{font-size:21px;font-weight:900;color:var(--hd);margin-inline-end:5px;}',
'.ln-pc .go{display:inline-flex;align-items:center;gap:6px;font-weight:900;color:#fff;background:linear-gradient(180deg,#8A1538,#5E0E26);border-radius:12px;padding:10px 16px;font-size:14.5px;}',
'.ln-pc.soon .cv{justify-content:center;background:repeating-linear-gradient(45deg,var(--soft),var(--soft) 10px,var(--bg) 10px,var(--bg) 20px);} .ln-pc.soon .cv span{font-weight:900;color:var(--mu);background:var(--card);border:1.5px dashed var(--ln);border-radius:20px;padding:6px 18px;}',
'.ln-pc.p2 .cv{background:linear-gradient(150deg,#E9F4F3,#FBF6EA);justify-content:center;} .ln-pc.p2 .c2{text-align:center;display:grid;gap:8px;} .ln-pc.p2 .c2 b{font-family:"Reem Kufi",Cairo;font-size:22px;line-height:1.45;color:#123C44;} .ln-pc.p2 .c2 small{font-size:12.5px;font-weight:800;color:#B8924A;} .ln-pc.p2 .bd{flex-direction:column;align-items:stretch;} .ln-pc.p2 .bd em{font-style:normal;font-size:12.5px;font-weight:800;color:var(--mu);} .ln-pc.p2 .go{background:#1F6F7A;justify-content:center;}',
'.ln-pc.soon .bd{display:block;} .ln-pc.soon h4{margin:0;font-size:17px;font-weight:900;color:var(--mu);} .ln-pc.soon small{font-size:13px;font-weight:700;color:var(--mu);}',
'.ln-cov{position:relative;flex-shrink:0;width:118px;height:158px;border-radius:6px 16px 16px 6px;background:linear-gradient(90deg,#BFE1E8,#F4FBFC 28%,#DDEFF2);box-shadow:inset 7px 0 0 #93CAD4,0 16px 30px rgba(14,90,110,.28);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:12px 10px 12px 6px;text-align:center;}',
'.ln-cov b{font-family:Amiri,serif;font-size:18px;line-height:1.35;color:#1F7A93;} .ln-cov small{font-size:10.5px;font-weight:800;color:#5A8C99;} .ln-cov.big{width:170px;height:228px;} .ln-cov.big b{font-size:26px;} .ln-cov.big small{font-size:13px;}',
'.ln-cov::after{content:"";position:absolute;inset:8px 8px 8px 14px;border:1px solid rgba(31,122,147,.25);border-radius:4px 10px 10px 4px;pointer-events:none;}',
/* book */
'.ln-bk{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:28px;align-items:center;background:var(--card);border:1.5px solid var(--ln);border-radius:24px;padding:24px 28px;}',
'.ln-bk em{font-style:normal;font-size:12.5px;font-weight:900;color:var(--g);} .ln-bk h1{margin:4px 0 8px;font-family:Amiri,serif;font-size:40px;line-height:1.3;color:var(--hd);} .ln-bk .in{margin:0 0 14px;font-size:15px;font-weight:700;line-height:1.95;color:var(--mu);}',
'.ln-bk .st{display:flex;gap:20px;flex-wrap:wrap;margin-bottom:16px;} .ln-bk .ac{display:flex;gap:10px;flex-wrap:wrap;}',
'.ln-bk .r{display:grid;justify-items:center;gap:14px;}',
'.ring{--p:0;width:120px;height:120px;border-radius:50%;background:conic-gradient(var(--m) calc(var(--p)*1%),var(--soft) 0);display:grid;place-items:center;position:relative;}',
'.ring::before{content:"";position:absolute;inset:11px;border-radius:50%;background:var(--card);} .ring b{position:relative;font-size:26px;font-weight:900;color:var(--m);line-height:1;} .ring small{position:absolute;bottom:28px;font-size:11.5px;font-weight:800;color:var(--mu);}',
'.ring.sm{width:92px;height:92px;} .ring.sm b{font-size:18px;} body.dark-mode #hh-learn .ring b{color:var(--gl);}',
'.ln-bk .kv{display:grid;gap:6px;} .ln-bk .kv span{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:800;color:var(--mu);} .ln-bk .kv svg{color:var(--g);} .ln-bk .kv b{font-size:16px;color:var(--hd);}',
'.ln-au{display:flex;gap:16px;align-items:flex-start;margin:16px 0 0;background:var(--soft);border:1.5px solid var(--ln);border-radius:20px;padding:16px 20px;}',
'.ln-au .ic{width:48px;height:48px;border-radius:14px;background:var(--card);color:var(--m);display:grid;place-items:center;flex-shrink:0;} .ln-au b{font-size:16px;font-weight:900;color:var(--hd);} .ln-au p{margin:4px 0 0;font-size:14.5px;font-weight:700;line-height:1.95;color:var(--ink);}',
'.ln-sh{display:flex;align-items:flex-end;gap:12px;flex-wrap:wrap;margin:28px 0 14px;} .ln-sh h2{margin:0;font-size:24px;font-weight:900;color:var(--hd);} .ln-sh small{flex:1;font-size:13px;font-weight:700;color:var(--mu);min-width:200px;}',
'.ln-mode{display:flex;background:var(--soft);border:1px solid var(--ln);border-radius:15px;padding:4px;flex-wrap:wrap;} .ln-mode button{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:11px;font-weight:900;font-size:14px;color:var(--mu);}',
'.ln-mode button.on{background:var(--card);color:var(--m);box-shadow:0 2px 8px rgba(0,0,0,.08);} .ln-mode button:focus-visible{outline:3px solid var(--g);} body.dark-mode #hh-learn .ln-mode button.on{color:var(--gl);}',
'.ln-path{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;}',
'.ln-stn{all:unset;box-sizing:border-box;cursor:pointer;position:relative;background:var(--card);border:1.5px solid var(--ln);border-radius:20px;padding:16px;display:grid;grid-template-columns:auto 1fr;gap:12px 14px;transition:transform .2s,box-shadow .2s,border-color .2s;}',
'.ln-stn:hover{transform:translateY(-3px);border-color:var(--c);box-shadow:0 14px 30px color-mix(in srgb,var(--c) 18%,transparent);} .ln-stn:focus-visible{outline:3px solid var(--g);outline-offset:2px;}',
'.ln-stn .n{width:56px;height:56px;border-radius:17px;background:var(--c);color:#fff;display:grid;place-items:center;position:relative;box-shadow:inset 0 -4px 0 rgba(0,0,0,.18);}',
'.ln-stn .n em{position:absolute;top:-8px;inset-inline-start:-8px;width:24px;height:24px;border-radius:50%;background:var(--card);border:2px solid var(--c);color:var(--c);font-style:normal;font-size:12px;font-weight:900;display:grid;place-items:center;}',
'.ln-stn .tx b{display:block;font-size:18px;font-weight:900;color:var(--hd);} .ln-stn .tx small{font-size:12.5px;font-weight:800;color:var(--mu);}',
'.ln-stn .ac{grid-column:1/-1;display:flex;align-items:center;gap:8px;background:color-mix(in srgb,var(--c) 8%,var(--card));border-radius:12px;padding:8px 10px;font-size:13px;font-weight:800;color:color-mix(in srgb,var(--c) 75%,var(--ink));}',
'.ln-stn .pr{grid-column:1/-1;height:7px;border-radius:7px;background:var(--soft);overflow:hidden;} .ln-stn .pr i{display:block;height:100%;background:var(--c);border-radius:7px;}',
'.ln-stn .tg{position:absolute;top:14px;inset-inline-end:14px;display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:900;border-radius:20px;padding:2px 10px;}',
'.ln-stn .tg.ok{background:#EAF5EF;color:#23855A;} .ln-stn .tg.now{background:#FBF1DA;color:#8A6D2E;} .ln-stn .tg.go{background:var(--soft);color:var(--mu);} .ln-stn .tg.lk{background:var(--soft);color:var(--mu);}',
'.ln-stn.now{border-color:var(--c);box-shadow:0 12px 30px color-mix(in srgb,var(--c) 20%,transparent);} .ln-stn.lk{opacity:.55;} .ln-stn.lk:hover{transform:none;box-shadow:none;}',
'.ln-src{margin:22px 0 0;font-size:12.5px;font-weight:700;color:var(--mu);line-height:1.9;}',
/* sec */
'.ln-sc{display:grid;grid-template-columns:auto 1fr auto;gap:22px;align-items:center;border-radius:24px;padding:24px 28px;color:#fff;background:linear-gradient(135deg,var(--c),color-mix(in srgb,var(--c) 55%,#000));position:relative;overflow:hidden;}',
'.ln-sc .n{width:76px;height:76px;border-radius:22px;background:rgba(255,255,255,.16);display:grid;place-items:center;} .ln-sc em{font-style:normal;font-size:12.5px;font-weight:900;opacity:.85;} .ln-sc h1{margin:2px 0 6px;font-size:34px;font-weight:900;} .ln-sc p{margin:0;font-size:14.5px;font-weight:700;line-height:1.9;opacity:.92;max-width:720px;}',
'.ln-sc .r{display:grid;justify-items:center;gap:6px;} .ln-sc .r small{font-size:12px;font-weight:800;opacity:.9;} .ln-sc .ring{background:conic-gradient(#fff calc(var(--p)*1%),rgba(255,255,255,.2) 0);} .ln-sc .ring::before{background:color-mix(in srgb,var(--c) 70%,#000);} .ln-sc .ring b{color:#fff;}',
'.ln-sa{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin:16px 0;} .ln-sa .bt{display:flex;gap:10px;flex-wrap:wrap;}',
'.ln-ql{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;}',
'.ln-qi{all:unset;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;gap:12px;background:var(--card);border:1.5px solid var(--ln);border-radius:14px;padding:10px 14px;transition:border-color .15s;}',
'.ln-qi:hover{border-color:var(--g);} .ln-qi:focus-visible{outline:3px solid var(--g);} .ln-qi .nb{width:32px;height:32px;border-radius:10px;background:var(--soft);color:var(--mu);display:grid;place-items:center;font-weight:900;font-size:13px;flex-shrink:0;}',
'.ln-qi.sn .nb{background:#23855A;color:#fff;} .ln-qi .tx{flex:1;font-size:15px;font-weight:800;color:var(--hd);line-height:1.6;} .ln-qi .mb{display:flex;gap:3px;} .ln-qi .mb i{width:7px;height:16px;border-radius:3px;background:var(--soft);} .ln-qi .mb i.on{background:var(--g);}',
/* lesson stage */
'.ln-ls{max-width:1180px;margin:0 auto;padding:16px 22px 26px;min-height:100%;display:flex;flex-direction:column;}',
'.ln-lh{display:flex;align-items:center;gap:12px;padding:4px 0 12px;} .ln-lh h4{margin:0;flex:1;font-size:15px;font-weight:800;color:rgba(255,248,234,.75);}',
'.ln-lh .chip{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:6px 14px;font-size:13.5px;font-weight:900;color:var(--gl);}',
'.ln-ib{all:unset;cursor:pointer;width:42px;height:42px;border-radius:12px;display:grid;place-items:center;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);color:#FFF8EA;} .ln-ib:hover{background:rgba(255,255,255,.16);} .ln-ib:focus-visible{outline:3px solid var(--gl);}',
'.ln-lh .xp{display:inline-flex;align-items:center;gap:6px;background:rgba(230,206,142,.14);color:var(--gl);border-radius:20px;padding:6px 14px;font-weight:900;font-size:14px;} .ln-lh .xp b{font-weight:900;}',
'.ln-steps{display:flex;gap:6px;margin:0 0 18px;} .ln-steps button{all:unset;cursor:pointer;flex:1;display:grid;gap:7px;justify-items:center;font-size:12.5px;font-weight:900;color:rgba(255,248,234,.45);}',
'.ln-steps button i{width:100%;height:6px;border-radius:6px;background:rgba(255,255,255,.12);} .ln-steps button span{display:inline-flex;align-items:center;gap:5px;} .ln-steps button.dn i{background:var(--gl);} .ln-steps button.on i{background:linear-gradient(90deg,var(--gl),#fff);box-shadow:0 0 12px rgba(230,206,142,.6);} .ln-steps button.on,.ln-steps button.dn{color:var(--gl);}',
'.ln-steps button:focus-visible{outline:2px solid var(--gl);outline-offset:4px;border-radius:6px;}',
'.ln-lb{flex:1;animation:lnIn .35s cubic-bezier(.2,.8,.2,1) both;} @keyframes lnIn{from{opacity:0;transform:translateY(10px)}}',
'.ln-qt{position:relative;background:#FFF8EA;color:var(--m9);border-radius:22px;padding:26px 26px 22px;margin:8px 0 18px;box-shadow:0 14px 34px rgba(0,0,0,.25);}',
'.ln-qt .qn{position:absolute;top:-13px;inset-inline-start:22px;background:linear-gradient(180deg,#F1DC9E,#C9A35A);color:var(--m9);font-size:13px;font-weight:900;border-radius:20px;padding:3px 14px;}',
'.ln-qt h2{margin:0;font-size:clamp(22px,2.6vw,34px);font-weight:900;line-height:1.55;}',
'.ln-hint{margin:0 0 14px;font-size:15px;font-weight:800;color:rgba(255,248,234,.75);text-align:center;} .ln-pq{margin:-6px 0 14px;font-size:18px;font-weight:800;color:var(--gl);text-align:center;}',
'.ln-opts{display:grid;grid-template-columns:1fr 1fr;gap:12px;}',
'.ln-op{all:unset;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;gap:14px;min-height:74px;padding:12px 16px;border-radius:18px;background:rgba(255,255,255,.07);border:2px solid rgba(255,255,255,.14);transition:transform .15s,background .15s,border-color .15s;}',
'.ln-op:hover:not([disabled]){transform:translateY(-2px);background:rgba(255,255,255,.12);border-color:var(--gl);} .ln-op:focus-visible{outline:3px solid var(--gl);outline-offset:2px;}',
'.ln-op .l{width:40px;height:40px;border-radius:12px;background:rgba(255,255,255,.12);display:grid;place-items:center;font-weight:900;font-size:17px;color:var(--gl);flex-shrink:0;} .ln-op .t{font-size:clamp(16px,1.6vw,21px);font-weight:900;line-height:1.5;}',
'.ln-op.ok{background:rgba(35,133,90,.28);border-color:#3FB884;animation:lnPop .4s;} .ln-op.ok .l{background:#23855A;color:#fff;} .ln-op.no{background:rgba(194,39,79,.25);border-color:#E05A7E;animation:lnShake .4s;} .ln-op.no .l{background:#C2274F;color:#fff;} .ln-op.off{opacity:.45;} .ln-op[disabled]{cursor:default;}',
'@keyframes lnPop{50%{transform:scale(1.03)}} @keyframes lnShake{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}',
'.ln-skip{all:unset;cursor:pointer;display:flex;align-items:center;gap:6px;margin:16px auto 0;font-size:14px;font-weight:800;color:rgba(255,248,234,.65);} .ln-skip:hover{color:var(--gl);}',
'.ln-lead{margin:0 0 14px;background:rgba(255,255,255,.07);border:1.5px solid rgba(230,206,142,.3);border-radius:18px;padding:16px 20px;font-size:clamp(17px,1.7vw,23px);font-weight:800;line-height:1.9;color:#FFF8EA;} .ln-lead.sm{font-size:17px;}',
'.ln-pts{display:grid;gap:10px;} .ln-pt{display:flex;align-items:flex-start;gap:14px;background:#FFF8EA;color:var(--m9);border-radius:16px;padding:12px 16px;animation:lnIn .35s both;}',
'.ln-pt b{width:34px;height:34px;border-radius:10px;background:var(--c);color:#fff;display:grid;place-items:center;font-size:15px;font-weight:900;flex-shrink:0;} .ln-pt span{font-size:clamp(16px,1.5vw,20px);font-weight:800;line-height:1.75;padding-top:2px;} .ln-pt em{font-style:normal;color:var(--c);font-weight:900;}',
'.ln-pt.hd{background:transparent;color:var(--gl);padding:4px 4px 0;} .ln-pt.hd span{font-weight:900;}',
'.ln-pt.hid{background:repeating-linear-gradient(45deg,rgba(255,255,255,.06),rgba(255,255,255,.06) 8px,rgba(255,255,255,.02) 8px,rgba(255,255,255,.02) 16px);border:1.5px dashed rgba(255,255,255,.18);min-height:56px;} .ln-pt.hid b{background:rgba(255,255,255,.12);color:rgba(255,248,234,.4);}',
'.ln-rv{display:flex;justify-content:center;gap:10px;margin-top:14px;}',
'.ln-note,.ln-yr{display:flex;align-items:flex-start;gap:8px;margin:14px 0 0;background:rgba(230,206,142,.1);border-radius:14px;padding:12px 14px;font-size:15px;font-weight:700;line-height:1.85;color:var(--gl);} .ln-yr b{color:#fff;}',
'.ln-taf{display:grid;gap:10px;} .ln-tr{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:0;border-radius:16px;overflow:hidden;background:#FFF8EA;color:var(--m9);animation:lnIn .35s both;}',
'.ln-tr .ay{margin:0;padding:12px 16px;font-family:"Amiri Quran",Amiri,serif;font-size:clamp(20px,2vw,27px);line-height:2;background:#F3E9D3;} .ln-tr .ay i,.ln-ev .ay i,.ln-mi .ay i{font-style:normal;display:inline-grid;place-items:center;min-width:26px;height:26px;border-radius:50%;border:1.5px solid #B8924A;font-family:Cairo;font-size:12px;font-weight:900;color:#8A6D2E;vertical-align:middle;margin:0 2px;}',
'.ln-tr .mn{margin:0;padding:12px 16px;font-size:clamp(15px,1.4vw,18px);font-weight:800;line-height:1.8;align-self:center;} .ln-tr.hid .mn{background:repeating-linear-gradient(45deg,#F5EEE2,#F5EEE2 8px,#FBF7F0 8px,#FBF7F0 16px);align-self:stretch;}',
'.ln-evs{display:grid;gap:14px;align-content:start;} .ln-evs .ln-qt{margin-bottom:4px;}',
'.ln-ev{border-radius:20px;padding:18px 22px;position:relative;} .ln-ev small{display:flex;align-items:center;gap:6px;font-size:12.5px;font-weight:900;margin-bottom:8px;}',
'.ln-ev.q{background:linear-gradient(135deg,#0F4E5E,#0A3540);color:#fff;border:1.5px solid rgba(159,220,230,.25);} .ln-ev.q small{color:#9FDCE6;} .ln-ev.q .ay{margin:0;font-family:"Amiri Quran",Amiri,serif;font-size:clamp(22px,2.3vw,31px);line-height:2.1;text-align:center;}',
'.ln-ev.q .ay i{border-color:#9FDCE6;color:#9FDCE6;} .ln-ev em{display:block;font-style:normal;font-size:13px;font-weight:800;margin-top:8px;text-align:center;} .ln-ev.q em{color:#9FDCE6;}',
'.ln-ev.h,.ln-ev.s{background:#FFF8EA;color:var(--m9);} .ln-ev.h small,.ln-ev.s small{color:var(--g);} .ln-ev.h p,.ln-ev.s p{margin:0;font-family:Amiri,serif;font-size:clamp(19px,1.9vw,25px);font-weight:700;line-height:2;} .ln-ev.h em,.ln-ev.s em{color:var(--mu);text-align:start;}',
'.ln-ev.h::before{content:"";position:absolute;inset-inline-start:0;top:18px;bottom:18px;width:5px;border-radius:5px;background:var(--g);}',
'.ln-act{display:grid;gap:0;} .ln-act .ln-qt{padding:18px 22px;} .ln-act .ln-qt h2{font-size:clamp(18px,2vw,24px);}',
'.ln-ah h3{margin:0 0 4px;display:flex;align-items:center;gap:8px;font-size:20px;font-weight:900;color:var(--gl);} .ln-ah p{margin:0 0 14px;font-size:14px;font-weight:700;color:rgba(255,248,234,.7);}',
'.ln-slots{display:grid;gap:8px;} .ln-slot{all:unset;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;gap:12px;min-height:54px;padding:8px 14px;border-radius:14px;border:2px dashed rgba(255,255,255,.22);font-weight:900;font-size:16.5px;}',
'.ln-slot i{width:30px;height:30px;border-radius:9px;background:rgba(255,255,255,.12);display:grid;place-items:center;font-style:normal;font-size:13px;flex-shrink:0;} .ln-slot.f{border-style:solid;border-color:rgba(230,206,142,.5);background:rgba(230,206,142,.1);}',
'.ln-slot.ok{border-color:#3FB884;background:rgba(35,133,90,.2);} .ln-slot.ok i{background:#23855A;} .ln-slot.no{border-color:#E05A7E;background:rgba(194,39,79,.2);} .ln-slot.no i{background:#C2274F;}',
'.ln-pool{display:flex;flex-wrap:wrap;gap:9px;margin:16px 0 4px;min-height:44px;}',
'.ln-chip{all:unset;box-sizing:border-box;cursor:pointer;background:#FFF8EA;color:var(--m9);border-radius:13px;padding:10px 15px;font-weight:900;font-size:15.5px;line-height:1.5;box-shadow:0 4px 0 #CDB98F;transition:transform .12s;}',
'.ln-chip:hover:not([disabled]){transform:translateY(-2px);} .ln-chip:focus-visible{outline:3px solid var(--gl);outline-offset:2px;} .ln-chip.us{opacity:.25;box-shadow:none;cursor:default;} .ln-chip.cur{background:var(--gl);box-shadow:0 0 0 3px #fff,0 4px 0 #9C7A3A;}',
'.ln-chip.in{font-size:14px;padding:7px 12px;box-shadow:none;} .ln-chip.ok{background:#CFEEDD;color:#14533A;} .ln-chip.no{background:#F7D3DD;color:#8A1538;}',
'.ln-dn{display:inline-flex;align-items:center;gap:6px;font-weight:900;color:#8FD6B3;}',
'.ln-bins{display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr));gap:12px;margin-top:12px;} .ln-bin{min-height:150px;border-radius:18px;border:2px dashed rgba(230,206,142,.4);background:rgba(255,255,255,.04);padding:12px;display:flex;flex-wrap:wrap;align-content:flex-start;gap:8px;cursor:pointer;}',
'.ln-bin:hover{border-color:var(--gl);background:rgba(230,206,142,.08);} .ln-bin h4{width:100%;margin:0 0 4px;text-align:center;font-size:17px;font-weight:900;color:var(--gl);}',
'.ln-clz{margin:0;background:#FFF8EA;color:var(--m9);border-radius:20px;padding:20px 22px;font-family:Amiri,serif;font-size:clamp(20px,2vw,26px);font-weight:700;line-height:2.4;}',
'.ln-gap{all:unset;cursor:pointer;display:inline-block;min-width:90px;padding:0 12px;margin:0 3px;border-radius:10px;border-bottom:3px solid var(--g);background:#F3E9D3;font-family:Cairo;font-size:.78em;font-weight:900;line-height:1.7;text-align:center;color:var(--m);vertical-align:baseline;}',
'.ln-gap.f{background:#FBF1DA;} .ln-gap.ok{background:#CFEEDD;border-color:#23855A;color:#14533A;} .ln-gap.no{background:#F7D3DD;border-color:#C2274F;}',
'.ln-mt{display:grid;grid-template-columns:1fr 1fr;gap:16px;} .ln-mt .cl{display:grid;gap:8px;align-content:start;} .ln-mt h5{margin:0;text-align:center;font-size:14px;font-weight:900;color:var(--gl);}',
'.ln-mi{all:unset;box-sizing:border-box;cursor:pointer;min-height:54px;padding:10px 14px;border-radius:14px;background:#FFF8EA;color:var(--m9);font-weight:900;font-size:15.5px;line-height:1.6;border:3px solid transparent;transition:transform .12s;}',
'.ln-mi:hover{transform:translateY(-2px);} .ln-mi:focus-visible{outline:3px solid var(--gl);} .ln-mi.cur{border-color:var(--gl);box-shadow:0 0 0 3px rgba(230,206,142,.4);} .ln-mi.f{border-color:var(--k);box-shadow:inset 6px 0 0 var(--k);}',
'.ln-mi.ok{background:#CFEEDD;} .ln-mi.no{background:#F7D3DD;} .ln-mi .ay{font-family:"Amiri Quran",Amiri,serif;font-size:19px;font-weight:400;line-height:1.9;}',
'.ln-tfs{display:grid;gap:10px;} .ln-tf{background:rgba(255,255,255,.06);border:2px solid rgba(255,255,255,.12);border-radius:16px;padding:12px 16px;display:grid;grid-template-columns:1fr auto;gap:6px 14px;align-items:center;}',
'.ln-tf p{margin:0;font-size:16.5px;font-weight:800;line-height:1.7;} .ln-tf .b{display:flex;gap:6px;} .ln-tf .b button{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:5px;padding:8px 12px;border-radius:11px;background:rgba(255,255,255,.08);font-weight:900;font-size:14px;color:#FFF8EA;}',
'.ln-tf .b button.on{background:var(--gl);color:var(--m9);} .ln-tf .b button:focus-visible{outline:2px solid var(--gl);} .ln-tf.ok{border-color:#3FB884;background:rgba(35,133,90,.18);} .ln-tf.no{border-color:#E05A7E;background:rgba(194,39,79,.18);}',
'.ln-tf small{grid-column:1/-1;display:flex;gap:6px;font-size:13.5px;font-weight:800;color:var(--gl);}',
'.ln-scn{display:flex;gap:14px;align-items:center;background:#FFF8EA;color:var(--m9);border-radius:20px;padding:18px 20px;margin-bottom:14px;} .ln-scn .ic{width:54px;height:54px;border-radius:16px;background:var(--c);color:#fff;display:grid;place-items:center;flex-shrink:0;} .ln-scn p{margin:0;font-size:clamp(17px,1.7vw,22px);font-weight:800;line-height:1.8;}',
'.ln-af{display:flex;align-items:center;gap:10px;margin-top:16px;padding:12px 14px;border-radius:16px;background:rgba(255,255,255,.05);} .ln-af span{flex:1;font-size:14.5px;font-weight:900;color:rgba(255,248,234,.75);}',
'.ln-af.ok{background:rgba(35,133,90,.22);} .ln-af.ok span{color:#9FE3C1;} .ln-af.no{background:rgba(194,39,79,.2);} .ln-af.no span{color:#F5A9BD;}',
'.ln-mem{display:grid;gap:14px;max-width:820px;margin:0 auto;width:100%;} .ln-card .fr{background:linear-gradient(180deg,#FFF8EA,#F5E9CF);color:var(--m9);border-radius:24px;padding:24px;text-align:center;box-shadow:0 20px 44px rgba(0,0,0,.3);display:grid;gap:14px;justify-items:center;}',
'.ln-card .tg{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:900;color:var(--g);} .ln-card .ln-qt{box-shadow:none;background:transparent;padding:0;margin:0;} .ln-card .ln-qt .qn{position:static;display:inline-block;margin-bottom:6px;}',
'.ln-card .an{width:100%;text-align:start;animation:lnIn .35s both;} .ln-card .an .ln-lead{background:#fff;color:var(--m9);border-color:#E7DAC0;} .ln-mol{margin:0;padding:0 22px 0 0;display:grid;gap:6px;font-size:16.5px;font-weight:800;line-height:1.75;} .ln-mol em{font-style:normal;color:var(--m);}',
'.ln-mb{text-align:center;} .ln-mb p{margin:0 0 10px;font-size:17px;font-weight:900;color:var(--gl);} .ln-mb div{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;} .ln-mb small{display:block;margin-top:10px;font-size:13px;font-weight:700;color:rgba(255,248,234,.6);}',
'.ln-lf{display:flex;align-items:center;gap:12px;padding-top:18px;margin-top:20px;border-top:1px solid rgba(255,255,255,.1);} .ln-lf .kb{flex:1;text-align:center;font-size:12.5px;font-weight:700;color:rgba(255,248,234,.5);} .ln-lf > span:first-child{flex:1;}',
'.ln-b.d{background:transparent !important;}',
'.ln-qbar{height:8px;border-radius:8px;background:rgba(255,255,255,.1);overflow:hidden;margin-bottom:12px;} .ln-qbar i{display:block;height:100%;background:linear-gradient(90deg,var(--gl),#fff);border-radius:8px;transition:width .4s;}',
'.ln-res{flex:1;display:grid;justify-items:center;align-content:center;gap:14px;text-align:center;padding:40px 10px;} .ln-res .stars{display:flex;gap:10px;} .ln-res .stars i{color:rgba(255,255,255,.15);} .ln-res .stars i.on{color:var(--gl);animation:lnPop .6s both;}',
'.ln-res h2{margin:0;font-size:clamp(24px,3vw,36px);font-weight:900;} .ln-res .sc{margin:0;font-size:20px;font-weight:800;color:rgba(255,248,234,.8);} .ln-res .sc b{font-size:46px;color:var(--gl);} .ln-res .sc span{background:rgba(230,206,142,.16);border-radius:20px;padding:2px 12px;color:var(--gl);font-weight:900;}',
'.ln-res .bt{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:8px;}',
'.ln-ls.big .ln-qt h2{font-size:clamp(28px,3.4vw,46px);} .ln-ls.big .ln-op .t{font-size:clamp(20px,2vw,28px);} .ln-ls.big .ln-op{min-height:96px;} .ln-ls.big .ln-pt span{font-size:clamp(19px,1.9vw,26px);} .ln-ls.big .ln-lead{font-size:clamp(20px,2vw,28px);} .ln-ls.big .ln-ev.q .ay{font-size:clamp(28px,2.8vw,40px);} .ln-ls.big .ln-ev.h p{font-size:clamp(23px,2.3vw,32px);}',
'.ln-ls.big{max-width:1500px;}',
'.ln-scrim{position:fixed;inset:0;z-index:100060;background:rgba(20,5,10,.55);display:grid;place-items:center;padding:16px;animation:lnIn .2s both;}',
'.ln-dlg{width:min(680px,100%);max-height:calc(100vh - 32px);overflow:auto;background:var(--card);color:var(--ink);border-radius:22px;box-shadow:0 30px 70px rgba(0,0,0,.35);}',
'.ln-dlg .dh{display:flex;gap:12px;align-items:flex-start;padding:18px 20px;background:linear-gradient(135deg,#8A1538,#5E0E26);color:#fff;} .ln-dlg .dh b{font-size:19px;font-weight:900;} .ln-dlg .dh small{display:block;font-size:13px;font-weight:700;opacity:.88;line-height:1.8;margin-top:2px;}',
'.ln-dlg .x{all:unset;cursor:pointer;margin-inline-start:auto;width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,.18);display:grid;place-items:center;flex-shrink:0;}',
'.ln-dlg .in{padding:16px 20px 20px;} .ln-dlg h4{margin:0 0 10px;font-size:15px;font-weight:900;color:var(--hd);} .ln-dlg .g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;}',
'.ln-dlg .g button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;justify-items:center;gap:4px;text-align:center;border:1.5px solid var(--ln);border-radius:16px;padding:12px 8px;} .ln-dlg .g button:hover{border-color:var(--c);} .ln-dlg .g button:focus-visible{outline:3px solid var(--g);}',
'.ln-dlg .g i{width:42px;height:42px;border-radius:12px;background:var(--c);color:#fff;display:grid;place-items:center;} .ln-dlg .g b{font-size:14.5px;font-weight:900;color:var(--hd);} .ln-dlg .g small{font-size:12px;font-weight:700;color:var(--mu);}',
'.ln-dlg .nt{display:flex;gap:8px;align-items:flex-start;margin:14px 0 0;font-size:13px;font-weight:700;color:var(--mu);line-height:1.8;}',
'.ln-cact{display:flex;gap:10px;justify-content:center;margin-top:18px;}',
'.ln-burst{position:absolute;left:50%;top:40%;width:0;height:0;pointer-events:none;z-index:5;} .ln-burst i{position:absolute;width:9px;height:9px;border-radius:2px;animation:lnB .8s cubic-bezier(.2,.8,.2,1) forwards;} @keyframes lnB{from{transform:rotate(var(--a)) translateY(0);opacity:1}to{transform:rotate(var(--a)) translateY(calc(var(--d)*-1));opacity:0}}',
'.ln-emp{padding:60px;text-align:center;font-weight:900;color:var(--mu);}',
'body.ln-stage #gv-hd,body.ln-stage #main-nav{visibility:hidden;}',
'@media (max-width:1000px){ .ln-path{grid-template-columns:repeat(2,minmax(0,1fr));} .ln-progs{grid-template-columns:1fr 1fr;} .ln-progs .ft{grid-column:1/-1;} .ln-bk{grid-template-columns:auto 1fr;} .ln-bk .r{grid-column:1/-1;grid-template-columns:auto 1fr;justify-items:start;align-items:center;} }',
'@media (max-width:760px){ .ln-wrap{padding:16px 14px 50px;} .ln-hero{grid-template-columns:1fr;padding:24px 20px;} .ln-hero .ic{display:none;} .ln-hero h1{font-size:36px;}',
'  .ln-progs,.ln-path,.ln-ql,.ln-opts,.ln-mt{grid-template-columns:minmax(0,1fr);} .ln-pc .cv{flex-direction:column;text-align:center;} .ln-bk{grid-template-columns:1fr;justify-items:center;text-align:center;padding:20px;} .ln-bk h1{font-size:30px;} .ln-bk .st,.ln-bk .ac{justify-content:center;}',
'  .ln-sc{grid-template-columns:auto 1fr;padding:20px;} .ln-sc .r{grid-column:1/-1;justify-items:start;} .ln-sc h1{font-size:26px;} .ln-sa{flex-direction:column;align-items:stretch;} .ln-sa .bt .ln-b{flex:1;}',
'  .ln-ls{padding:12px 12px 20px;} .ln-steps button span{font-size:11px;} .ln-steps button span svg{display:none;} .ln-qt{padding:22px 16px 16px;} .ln-tr{grid-template-columns:1fr;} .ln-bins{grid-template-columns:minmax(0,1fr);} .ln-bin{min-height:90px;}',
'  .ln-lf .kb{display:none;} .ln-lf .ln-b{padding:0 14px;} .ln-dlg .g{grid-template-columns:repeat(2,minmax(0,1fr));} .ln-mode{width:100%;} .ln-mode button{flex:1;justify-content:center;padding:8px 6px;font-size:13px;} .ln-cert{aspect-ratio:auto;padding:12px;} .ln-cert .in{padding:40px 16px;} .ln-cert h1{font-size:34px;} .ln-cert input{font-size:28px;min-width:90%;} .ln-cert p{font-size:16px;} .ln-cert .ft{width:100%;} }',
'@media (prefers-reduced-motion:reduce){ #hh-learn *{animation:none !important;transition:none !important;} }',
CERTCSS,
'@media (max-width:760px){ #hh-learn .ln-cert{aspect-ratio:auto;padding:12px;} #hh-learn .ln-cert .in{padding:44px 16px;} #hh-learn .ln-cert h1{font-size:34px;} #hh-learn .ln-cert input{font-size:26px;min-width:0;width:100%;} #hh-learn .ln-cert p{font-size:16px;} #hh-learn .ln-cert .ft{width:100%;} }'
].join('\n');
function style(){ if($('hh-learn-css')) return; try{ if(!$('hh-learn-font')){ var l=document.createElement('link'); l.id='hh-learn-font'; l.rel='stylesheet'; l.href='https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Amiri:wght@400;700&display=swap'; document.head.appendChild(l); } }catch(e){} var s=document.createElement('style'); s.id='hh-learn-css'; s.textContent=CSS; document.head.appendChild(s); }
window._hhLn=function(){ return {V:V,ST:ST}; };
})();
