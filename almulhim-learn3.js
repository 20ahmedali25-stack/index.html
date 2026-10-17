/* ============================================================
   المُلهم التعليمي، «تعلّم»: البرنامج الثالث (zzzzzzcx)
   «الاحتراق الوظيفي: من الاحتراق إلى الإشراق»
   دليل إرشادي وثلاث دراسات ميدانية: المحطات، ماذا تقول الدراسات،
   افحص نفسك، خطتي، المصطلحات، الاختبارات، الشهادة، الأوضاع الثلاثة
   ============================================================ */
(function(){
'use strict';
if(window._hhLearn3) return; window._hhLearn3=true;
var P0={book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h7M8 11h5"/>',play:'<path d="M7 4l13 8-13 8z" fill="currentColor" stroke="none"/>',flag:'<path d="M5 21V4h11l-2 4 2 4H5"/>',x:'<path d="M18 6L6 18M6 6l12 12"/>',
 next:'<path d="M15 5l-7 7 7 7"/>',back:'<path d="M9 5l7 7-7 7"/>',eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
 lens:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',scale:'<path d="M12 3v18M5 21h14M6 7h12M6 7l-3 7a3 3 0 0 0 6 0zM18 7l-3 7a3 3 0 0 0 6 0z"/>',
 cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',bulb:'<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/>',
 check:'<path d="M20 6 9 17l-5-5"/>',q:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4M12 17h.01"/>',quote:'<path d="M6 17h4l2-4V7H6v6h3zM14 17h4l2-4V7h-6v6h3z" fill="currentColor" stroke="none"/>',
 tag:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',grid:'<rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/>',
 link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',tv:'<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',
 phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',cap:'<path d="M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6"/>',full:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',badge:'<circle cx="12" cy="9" r="5"/><path d="M9 13l-1 8 4-2 4 2-1-8"/>',print:'<path d="M6 9V3h12v6M6 18H4v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6h-2M8 14h8v7H8z"/>',
 refresh:'<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',star:'<path d="M12 3l2.8 5.9 6.2.9-4.5 4.4 1 6.3L12 17.6 6.5 20.5l1-6.3L3 9.8l6.2-.9z" fill="currentColor" stroke="none"/>'};

var P=P0; [['fire','<path d="M12 22c4 0 7-3 7-7 0-5-5-7-5-12-3 2-5 5-5 8-1-1-2-2-2-4-2 2-2 5-2 8 0 4 3 7 7 7z"/>'],['sun','<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'],
 ['heart','<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'],['shield','<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>'],['leaf','<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19l7-7"/>'],
 ['users','<circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14a5 5 0 0 1 6 5"/>'],['pulse','<path d="M3 12h4l3-8 4 16 3-8h4"/>'],['plus','<path d="M12 5v14M5 12h14"/>'],
 ['clip','<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3"/>'],['doc','<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>'],['globe','<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'],
 ['bat','<rect x="2" y="7" width="17" height="10" rx="2"/><path d="M22 11v2M6 10v4"/>'],['layers','<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'],['route','<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7"/>'],
 ['trash','<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'],['lock','<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>']].forEach(function(x){ P[x[0]]=x[1]; });
function sv(k,s,w){ return '<svg width="'+(s||18)+'" height="'+(s||18)+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||1.9)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(P[k]||'')+'</svg>'; }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function $(id){ return document.getElementById(id); }
function toastX(m,k){ try{ if(typeof toast==='function') toast(m,k||'info'); }catch(e){} }
function me(){ try{ return (typeof currentUser!=='undefined'&&currentUser)||(window.firebase&&firebase.auth&&firebase.auth().currentUser)||null; }catch(e){ return null; } }
function B(){ return (window.HH_LEARN||{}).burn; }
function seed(s){ var h=2166136261; s=String(s); for(var i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); } return function(){ h^=h<<13; h^=h>>>17; h^=h<<5; return ((h>>>0)%100000)/100000; }; }
function shuf(a,key){ var r=seed(key==null?Math.random():key), b=a.slice(); for(var i=b.length-1;i>0;i--){ var j=Math.floor(r()*(i+1)); var t=b[i]; b[i]=b[j]; b[j]=t; } return b; }
function SRC(id){ var b=B(); return (b.sources||[]).filter(function(s){ return s.id===id; })[0]||{short:id}; }
function STU(id){ return (B().studies||[]).filter(function(s){ return s.id===id; })[0]; }
function chName(c){ return c.t; }
function ord(i){ return ['المحطة الأولى','المحطة الثانية','المحطة الثالثة','المحطة الرابعة','المحطة الخامسة','المحطة السادسة','المحطة السابعة','المحطة الثامنة','المحطة التاسعة'][i]||('المحطة '+(i+1)); }

/* ═══ الحالة: التقدم يُحفظ في الحساب، أما الفحص الذاتي والخطة فعلى الجهاز فقط ═══ */
var V={view:'home',ci:0,si:0,sid:'',a:{},mode:'self',gq:''};
var ST=null, PV=null, _t=null;
function loadST(){ try{ ST=JSON.parse(localStorage.getItem('hh_learn_burn')||'null'); }catch(e){} ST=ST||{}; ['read','quiz','act','stu'].forEach(function(k){ if(!ST[k]) ST[k]={}; });
  try{ PV=JSON.parse(localStorage.getItem('hh_learn_burn_me')||'null'); }catch(e){} PV=PV||{}; if(!PV.chk) PV.chk={}; if(!PV.plan) PV.plan={};
  var u=me(); if(u&&u.uid&&window.firebase&&firebase.firestore){ try{ firebase.firestore().collection('program_progress').doc(u.uid).get().then(function(d){ var r=d&&d.exists&&d.data&&(d.data()||{}).learn_burn; if(r&&(r.t||0)>(ST.t||0)){ ST=r; ['read','quiz','act','stu'].forEach(function(k){ if(!ST[k]) ST[k]={}; }); try{ localStorage.setItem('hh_learn_burn',JSON.stringify(ST)); }catch(e){} var h=host(); if(h&&h.classList.contains('ln3')&&V.view==='home') render(); } }).catch(function(){}); }catch(e){} } }
function save(){ ST.t=Date.now(); try{ localStorage.setItem('hh_learn_burn',JSON.stringify(ST)); }catch(e){} clearTimeout(_t); _t=setTimeout(function(){ var u=me(); if(!u||!u.uid||!window.firebase||!firebase.firestore) return; try{ firebase.firestore().collection('program_progress').doc(u.uid).set({learn_burn:ST},{merge:true}).catch(function(){}); }catch(e){} },1500); }
function saveMe(){ try{ localStorage.setItem('hh_learn_burn_me',JSON.stringify(PV)); }catch(e){} }
function chProg(ci){ var c=B().chapters[ci], n=c.sections.length+1, r=0; c.sections.forEach(function(_,i){ if(ST.read[c.k+'-'+i]) r++; }); if(ST.quiz[c.k]!=null) r++; return Math.round(r/n*100); }
function chkDone(){ var n=0; (B().check.groups||[]).forEach(function(g){ n+=g.items.length; }); return n&&Object.keys(PV.chk).length>=n; }
function planN(){ return Object.keys(PV.plan).length; }
function totalProg(){ var b=B(), s=0; b.chapters.forEach(function(_,i){ s+=chProg(i); }); var st=(b.studies||[]).length?Object.keys(ST.stu).length/b.studies.length*100:0; return Math.round((s/b.chapters.length)*0.8+st*0.1+(ST.chk?5:0)+(ST.plan?5:0)); }

/* ═══ الفتح ═══ */
window.hhLn3Open=function(view,a){
  if(!$('hh-learn')){ if(typeof window.hhLearnOpen==='function') hhLearnOpen(); else return; }
  style(); loadST(); V.view=view||'home'; V.a={}; if(view==='ch'){ V.ci=a||0; V.si=0; } if(view==='study') V.sid=a; render(); var h=host(); if(h) h.scrollTop=0;
};
function host(){ return $('hh-learn'); }
function go(v,o){ V.view=v; V.a={}; if(o) Object.keys(o).forEach(function(k){ V[k]=o[k]; }); render(); var h=host(); if(h) h.scrollTop=0; }
window.hhLn3Go=function(v,a,b){ if(v==='ch') go('ch',{ci:a||0,si:b||0}); else if(v==='study') go('study',{sid:a}); else if(v==='quiz') startQuiz(a); else go(v); };
window.hhLn3Mode=function(m){ if(m==='live'){ liveDlg(); return; } V.mode=m; render(); };
function render(){
  var h=host(); if(!h||!B()) return;
  var stage=V.mode==='screen'&&(V.view==='ch'||V.view==='quiz'||V.view==='study');
  h.className='ln ln2 ln3'+(stage?' ln2-stg':'');
  document.body.classList.toggle('ln-stage',stage);
  h.innerHTML=V.view==='ch'?vCh():V.view==='check'?vCheck():V.view==='plan'?vPlan():V.view==='studies'?vStudies():V.view==='study'?vStudy():V.view==='gloss'?vGloss():V.view==='quiz'?vQuiz():V.view==='cert'?vCert():vHome();
  if(V.view==='ch') markRead();
  var q=$('ln3-gq'); if(q){ q.oninput=function(){ V.gq=q.value; var L=$('ln3-gl'); if(L) L.innerHTML=glossList(); }; }
}
function crumbs(L){ return '<nav class="l2-cr" aria-label="مسار التنقل">'+L.map(function(x,i){ return i<L.length-1?'<button type="button" onclick="'+x[1]+'">'+esc(x[0])+'</button><span>›</span>':'<b>'+esc(x[0])+'</b>'; }).join('')+'</nav>'; }
function base(){ return [['تعلّم',"hhLnGo('home')"],[B().title,"hhLn3Go('home')"]]; }
function modeSeg(){ return '<div class="l2-mode" role="group" aria-label="طريقة العرض">'+[['self','cap','أتعلّم بنفسي'],['screen','tv','أعرض على الصف'],['live','phone','مع دخول الطلاب']].map(function(m){ return '<button type="button" class="'+(V.mode===m[0]?'on':'')+'" aria-pressed="'+(V.mode===m[0])+'" onclick="hhLn3Mode(\''+m[0]+'\')">'+sv(m[1],15)+m[2]+'</button>'; }).join('')+'</div>'; }
function stage(t){ return '<div class="l2-stg"><button type="button" class="l2-ib" onclick="hhLn3Mode(\'self\')" aria-label="خروج من العرض">'+sv('x',18,2.4)+'</button><b>'+esc(t)+'</b><button type="button" class="l2-ib" onclick="hhLn2Full&&hhLn2Full()" aria-label="ملء الشاشة">'+sv('full',18)+'</button></div>'; }
function srcTag(id,pg){ var s=SRC(id); return '<span class="l3-src '+esc(id)+'">'+sv(id==='guide'?'book':'doc',12)+esc(s.short)+(pg?'، صفحة '+pg:'')+'</span>'; }
/* إبراز الأرقام في نص النتائج */
function nums(t){ return esc(t).replace(/(\d+(?:[.,]\d+)?\s?%|\d+(?:[.,]\d+)?)/g,'<b class="nm">$1</b>'); }

/* ═══ الصفحة الرئيسية ═══ */
function vHome(){
  var b=B(), pc=totalProg(), nst=(b.strategies||[]).length;
  var nextCi=0; for(var i=0;i<b.chapters.length;i++){ if(chProg(i)<100){ nextCi=i; break; } }
  return '<div class="l2-wrap">'+crumbs([['تعلّم',"hhLnGo('home')"],[b.title]])
   +'<div class="l2-hero l3-hero"><div class="tx"><small>'+sv('heart',14)+'البرنامج الثالث في «تعلّم»، النمو المهني</small>'
   +'<h1>الاحتراق <span>الوظيفي</span></h1><p class="sb">'+esc(b.sub)+'</p><p>'+esc(b.lead)+'</p>'
   +'<div class="st"><span><b>'+b.chapters.length+'</b>محطات</span><span><b>'+(b.studies||[]).length+'</b>دراسات علمية</span><span><b>'+nst+'</b>استراتيجية عملية</span><span><b>'+b.concepts.length+'</b>مصطلحاً</span></div>'
   +'<div class="bt"><button type="button" class="l2-b p" onclick="hhLn3Go(\'ch\','+nextCi+')">'+sv('play',15)+(pc?'تابع الرحلة':'ابدأ الرحلة')+'</button><button type="button" class="l2-b" onclick="hhLn3Go(\'check\')">'+sv('pulse',16)+'افحص نفسك</button><button type="button" class="l2-b" onclick="hhLn3Go(\'plan\')">'+sv('route',16)+'خطتي</button></div></div>'
   +'<div class="l3-sun" aria-hidden="true"><div class="sky"></div><div class="orb"></div><div class="rays"></div><div class="hz"></div><span class="a">الاحتراق</span><span class="z">الإشراق</span><div class="pth">'+b.chapters.map(function(c,i){ return '<i style="--i:'+i+';--n:'+b.chapters.length+'" class="'+(chProg(i)>=100?'dn':'')+'"></i>'; }).join('')+'</div></div></div>'
   +'<div class="l3-srcs"><h3>'+sv('layers',17)+'أربعة مصادر في برنامج واحد</h3><div class="g">'+b.sources.map(function(s){ return '<div class="sc '+esc(s.id)+'"><em>'+esc(s.kind)+'</em><b>'+esc(s.t)+'</b><small>'+esc(s.by)+'</small><span>'+sv('globe',13)+esc(s.where)+'، '+esc(s.year)+'</span>'+(s.id==='guide'?'<i class="sp">العمود الفقري للبرنامج</i>':'<button type="button" onclick="hhLn3Go(\'study\',\''+esc(s.id)+'\')">'+sv('eye',13)+'بطاقة الدراسة</button>')+'</div>'; }).join('')+'</div></div>'
   +'<div class="l2-au"><span class="ic">'+sv('shield',22)+'</span><div><b>قبل أن تبدأ</b><p>'+esc(b.note)+'</p></div><div class="pr"><div class="ring" style="--p:'+pc+'"><b>'+pc+'%</b></div><small>تقدمك</small></div></div>'
   +'<div class="l2-sh"><h2>رحلة البرنامج</h2><small>'+b.chapters.length+' محطات بترتيب الدليل، وفي آخر كل محطة: ماذا تقول الدراسات، ونشاط، واختبار</small>'+modeSeg()+'</div>'
   +'<div class="l2-map l3-map" style="--n:'+b.chapters.length+'">'+b.chapters.map(function(c,i){ var p=chProg(i); return '<button type="button" class="nd'+(i===nextCi&&p<100?' on':'')+(p>=100?' dn':'')+'" onclick="hhLn3Go(\'ch\','+i+')"><span class="ic">'+sv(c.ic||'book',20)+'</span><em>'+ord(i)+'</em><b>'+esc(c.t)+'</b><span class="q">'+esc(c.q)+'</span><span class="pr"><i style="width:'+p+'%"></i></span></button>'; }).join('')+'</div>'
   +'<div class="l2-tri l3-tri"><button type="button" onclick="hhLn3Go(\'check\')"><i>'+sv('pulse',22)+'</i><b>افحص نفسك</b><small>مؤشرات الدليل المنذرة، تراجعها بهدوء. ليست تشخيصاً، ولا تُرسل إلى أحد</small><span>'+(chkDone()?'أتممته':'ابدأ')+'</span></button>'
   +'<button type="button" onclick="hhLn3Go(\'plan\')"><i>'+sv('route',22)+'</i><b>خطتي</b><small>اختر من '+nst+' استراتيجية للوقاية والتعافي، واكتب خطوتك الأولى، واطبعها</small><span>'+planN()+' في خطتك</span></button>'
   +'<button type="button" onclick="hhLn3Go(\'studies\')"><i>'+sv('doc',22)+'</i><b>ماذا تقول الدراسات</b><small>'+(b.studies||[]).length+' دراسات ميدانية: العينة والأداة والنتائج بالأرقام والتوصيات</small><span>'+Object.keys(ST.stu).length+' من '+(b.studies||[]).length+'</span></button>'
   +'<button type="button" onclick="hhLn3Go(\'gloss\')"><i>'+sv('tag',22)+'</i><b>المصطلحات</b><small>'+b.concepts.length+' مصطلحاً بتعريف مصادرها</small><span>ابحث</span></button>'
   +'<button type="button" onclick="hhLn3Go(\'cert\')"><i>'+sv('badge',22)+'</i><b>شهادة الإتمام</b><small>بعد اجتياز اختبارات المحطات بنسبة 70% فأكثر</small><span>'+Object.keys(ST.quiz).filter(function(k){ return ST.quiz[k]>=70; }).length+' من '+b.chapters.length+'</span></button></div>'
   +(b.stats&&b.stats.length?'<div class="l2-sh"><h2>بالأرقام</h2><small>كل رقم معه مصدره كما ورد</small></div><div class="l3-nums">'+b.stats.map(function(s){ return '<div><b>'+esc(s.n)+'</b><p>'+esc(s.x)+'</p><small>'+sv('doc',12)+esc(s.src)+'</small></div>'; }).join('')+'</div>':'')
   +'<p class="l2-src">'+esc(b.credit)+'</p></div>';
}

/* ═══ القراءة ═══ */
function markRead(){ var c=B().chapters[V.ci]; if(V.si<c.sections.length){ var k=c.k+'-'+V.si; ST.last={ci:V.ci,si:V.si}; if(!ST.read[k]) ST.read[k]=1; save(); } }
function hl(p,key){ var t=esc(p); if(key){ var k=esc(key); var i=t.indexOf(k); if(i>-1) t=t.slice(0,i)+'<mark>'+k+'</mark>'+t.slice(i+k.length); } return t; }
function tbl(T){ return '<div class="l2-tbl"><table><thead><tr>'+T.head.map(function(h){ return '<th>'+esc(h)+'</th>'; }).join('')+'</tr></thead><tbody>'+T.rows.map(function(r){ return '<tr>'+r.map(function(x,i){ return '<td'+(i===0?' class="k"':'')+'>'+esc(x)+'</td>'; }).join('')+'</tr>'; }).join('')+'</tbody></table></div>'; }
function itemsHTML(L){ var grp={}, order=[]; L.forEach(function(it,i){ var g=it.grp||''; if(!grp[g]){ grp[g]=[]; order.push(g); } grp[g].push([it,i]); });
  return order.map(function(g){ return (g?'<h4 class="l3-grp">'+esc(g)+'</h4>':'')+'<div class="l2-items">'+grp[g].map(function(x){ var it=x[0], i=x[1], o=V.a['it'+i], has=it.x&&it.x!==it.h; return has?'<button type="button" class="it'+(o?' op':'')+'" aria-expanded="'+(!!o)+'" onclick="hhLn3It('+i+')"><span class="h"><i>'+(i+1)+'</i><b>'+esc(it.h)+'</b><em>'+sv(o?'x':'eye',14)+'</em></span>'+(o?'<span class="x">'+esc(it.x)+'</span>':'')+'</button>':'<div class="it pl"><span class="h"><i>'+(i+1)+'</i><b>'+esc(it.h||it.x)+'</b></span></div>'; }).join('')+'</div>'; }).join(''); }
function vCh(){
  var b=B(), c=b.chapters[V.ci], S=c.sections, endp=V.si>=S.length, scr=V.mode==='screen';
  var toc='<aside class="l2-toc"><h5>'+ord(V.ci)+'</h5>'+S.map(function(s,i){ return '<button type="button" class="'+(i===V.si?'on':'')+(ST.read[c.k+'-'+i]?' dn':'')+'" onclick="hhLn3Sec('+i+')"><i>'+(ST.read[c.k+'-'+i]&&i!==V.si?sv('check',12,3):i+1)+'</i>'+esc(s.t)+'</button>'; }).join('')
    +'<button type="button" class="'+(endp?'on':'')+(ST.quiz[c.k]!=null?' dn':'')+'" onclick="hhLn3Sec('+S.length+')"><i>'+sv('doc',13)+'</i>الدراسات والنشاط والاختبار</button></aside>';
  var body;
  if(!endp){ var s=S[V.si], n=(s.items||[]).filter(function(it){ return it.x&&it.x!==it.h; }).length;
    body='<article class="l2-pg"><span class="ch">'+esc(ord(V.ci))+'، '+esc(c.t)+'</span><h2>'+esc(s.t)+'</h2>'
     +(V.si===0?'<p class="l2-cq">'+sv('q',16)+esc(c.q)+'</p>':'')
     +(s.key?'<blockquote class="l2-key">'+esc(s.key)+'<small>'+esc(SRC(s.src||'guide').short)+'</small></blockquote>':'')
     +(s.p||[]).map(function(p){ return '<p class="l2-p">'+hl(p,s.key)+'</p>'; }).join('')
     +(s.items&&s.items.length?itemsHTML(s.items)+(n>1?'<button type="button" class="l2-all" onclick="hhLn3ItAll('+s.items.length+')">'+sv('eye',14)+'اعرض الكل</button>':''):'')
     +(s.table?tbl(s.table):'')
     +(s.stats&&s.stats.length?'<div class="l3-nums in">'+s.stats.map(function(x){ return '<div><b>'+esc(x.n)+'</b><p>'+esc(x.x)+'</p><small>'+sv('doc',12)+esc(x.src)+'</small></div>'; }).join('')+'</div>':'')
     +(s.quote?'<figure class="l3-qt"><blockquote>«'+esc(s.quote.x)+'»</blockquote><figcaption>'+esc(s.quote.by)+'</figcaption></figure>':'')
     +'<div class="l3-pgf">'+srcTag(s.src||'guide',s.pg)+'</div></article>';
  } else body=chEnd(c);
  var nav='<div class="l2-nav"><button type="button" class="l2-b" onclick="hhLn3Sec('+(V.si-1)+')" '+(V.si===0&&V.ci===0?'disabled':'')+'>'+sv('back',15,2.4)+'السابق</button><span>'+(endp?'الدراسات والاختبار':(V.si+1)+' من '+S.length)+'</span>'
    +(endp?(V.ci<b.chapters.length-1?'<button type="button" class="l2-b p" onclick="hhLn3Go(\'ch\','+(V.ci+1)+')">'+ord(V.ci+1)+sv('next',15,2.4)+'</button>':'<button type="button" class="l2-b p" onclick="hhLn3Go(\'plan\')">إلى خطتي'+sv('next',15,2.4)+'</button>'):'<button type="button" class="l2-b p" onclick="hhLn3Sec('+(V.si+1)+')">التالي'+sv('next',15,2.4)+'</button>')+'</div>';
  var head=scr?stage(c.t):crumbs(base().concat([[ord(V.ci)]]));
  return '<div class="l2-wrap'+(scr?' big':'')+'">'+head+'<div class="l2-chbar" style="grid-template-columns:repeat('+b.chapters.length+',minmax(0,1fr))">'+b.chapters.map(function(x,i){ return '<button type="button" class="'+(i===V.ci?'on':'')+(chProg(i)>=100?' dn':'')+'" onclick="hhLn3Go(\'ch\','+i+')" title="'+esc(x.t)+'"><i><s style="width:'+chProg(i)+'%"></s></i><span>'+esc(x.t)+'</span></button>'; }).join('')+'</div>'
   +'<div class="l2-rd">'+(scr?'':toc)+'<div class="l2-main">'+body+nav+'</div></div></div>';
}
window.hhLn3Sec=function(i){ var c=B().chapters[V.ci]; if(i<0){ if(V.ci>0){ var p=B().chapters[V.ci-1]; go('ch',{ci:V.ci-1,si:p.sections.length}); } return; } V.si=Math.min(i,c.sections.length); V.a={}; render(); var h=host(); if(h) h.scrollTop=0; };
window.hhLn3It=function(i){ V.a['it'+i]=!V.a['it'+i]; render(); };
window.hhLn3ItAll=function(n){ for(var i=0;i<n;i++) V.a['it'+i]=1; render(); };
function evCards(L){ return '<div class="l3-ev">'+L.map(function(e){ var s=STU(e.sid)||{}; return '<div class="e '+esc(e.sid)+'"><span class="bd">'+sv('doc',13)+esc(SRC(e.sid).short)+(e.th?'، من الإطار النظري':'، من النتائج')+'</span><p>'+nums(e.x)+'</p><button type="button" onclick="hhLn3Go(\'study\',\''+esc(e.sid)+'\')">'+esc(s.where||'')+(s.year?'، '+esc(s.year):'')+'، بطاقة الدراسة'+sv('next',12,2.4)+'</button></div>'; }).join('')+'</div>'; }
function stratCards(L){ return '<div class="l3-stg">'+L.map(function(s){ var o=V.a['s'+s.id], on=!!PV.plan[s.id]; return '<div class="s'+(o?' op':'')+'"><button type="button" class="h" aria-expanded="'+(!!o)+'" onclick="hhLn3SO(\''+s.id+'\')"><i>'+sv(s.kind==='recover'?'sun':'shield',16)+'</i><b>'+esc(s.t)+'</b><em>'+sv(o?'x':'eye',14)+'</em></button>'
   +(o?'<div class="x">'+(s.why?'<p>'+esc(s.why)+'</p>':'')+(s.steps&&s.steps.length?'<ol>'+s.steps.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('')+'</ol>':'')+'</div>':'')
   +'<button type="button" class="ad'+(on?' on':'')+'" onclick="hhLn3Plan(\''+s.id+'\')">'+sv(on?'check':'plus',14,2.4)+(on?'في خطتي':'أضف إلى خطتي')+'</button></div>'; }).join('')+'</div>'; }
window.hhLn3SO=function(id){ V.a['s'+id]=!V.a['s'+id]; render(); };
window.hhLn3Plan=function(id){ if(PV.plan[id]) delete PV.plan[id]; else { PV.plan[id]={step:'',when:'هذا الأسبوع',at:Date.now()}; ST.plan=1; save(); } saveMe(); var h=host(), y=h?h.scrollTop:0; render(); if(h) h.scrollTop=y; };
function chEnd(c){
  var b=B(), best=ST.quiz[c.k], ev=c.ev||[], stg=(b.strategies||[]).filter(function(s){ return (c.strat||[]).indexOf(s.id)>-1; }), SL={prevent:['shield','استراتيجيات الوقاية'],recover:['sun','استراتيجيات التعافي'],org:['star','بروتوكولات النجاح المهني ومهاراته']}[c.k]||['shield','استراتيجيات'];
  return '<article class="l2-pg end"><span class="ch">'+esc(ord(V.ci))+'، '+esc(c.t)+'</span><h2>الدراسات والنشاط والاختبار</h2>'
   +(ev.length?'<h3 class="l2-h3">'+sv('doc',17)+'ماذا تقول الدراسات؟ <em>'+ev.length+'</em></h3><p class="l3-lead">ما وجده الباحثون في الميدان عن هذه المحطة، بنص نتائجهم وأرقامهم.</p>'+evCards(ev):'')
   +(stg.length?'<h3 class="l2-h3">'+sv(SL[0],17)+SL[1]+' <em>'+stg.length+'</em></h3><p class="l3-lead">افتح الاستراتيجية لتقرأ خطواتها، وأضف ما يناسبك إلى خطتك.</p>'+stratCards(stg):'')
   +(c.sort?actSort(c):'')+(c.match?actMatch(c):'')
   +(c.quiz&&c.quiz.length?'<div class="l2-qz"><div><b>'+sv('badge',18)+'اختبار '+esc(ord(V.ci))+'</b><small>'+c.quiz.length+' أسئلة من نص المصادر'+(best!=null?'، أفضل نتيجة '+best+'%':'')+'</small></div><button type="button" class="l2-b p" onclick="hhLn3Go(\'quiz\','+V.ci+')">'+(best!=null?'أعد الاختبار':'ابدأ الاختبار')+'</button></div>':'')+'</article>';
}
/* نشاط التصنيف */
function actSort(c){ var A=c.sort, st=V.a.sort||(V.a.sort={put:{},cur:null}), od=shuf(A.items.map(function(_,i){ return i; }),'s'+c.k), free=od.filter(function(i){ return st.put[i]==null; });
  return '<div class="l2-act"><h3>'+sv('grid',17)+esc(A.t)+'</h3><p>'+esc(A.s)+' اختر العبارة، ثم اضغط مكانها.</p><div class="pool">'+free.map(function(i){ return '<button type="button" class="ch'+(st.cur===i?' cur':'')+'" onclick="hhLn3SSel('+i+')">'+esc(A.items[i][0])+'</button>'; }).join('')+(free.length?'':'<span class="dn">'+sv('check',14,3)+'وُزّعت كل العبارات</span>')+'</div>'
   +'<div class="bins" style="--n:'+A.bins.length+'">'+A.bins.map(function(bn,bi){ return '<div class="bin" role="button" tabindex="0" onclick="hhLn3SBin('+bi+')"><h4>'+esc(bn)+'</h4>'+od.filter(function(i){ return st.put[i]===bi; }).map(function(i){ var k=st.ok!=null?(A.items[i][1]===bi?' ok':' no'):''; return '<button type="button" class="ch in'+k+'" onclick="event.stopPropagation();hhLn3SOut('+i+')">'+esc(A.items[i][0])+'</button>'; }).join('')+'</div>'; }).join('')+'</div>'
   +(st.ok!=null?'<div class="res '+(st.ok?'ok':'no')+'">'+(st.ok?'أحسنت، كل عبارة في مكانها كما في المصدر':'بعض العبارات في غير مكانها، أعد المحاولة')+(st.ok?'':'<button type="button" class="l2-b" onclick="hhLn3SReset()">أعد</button>')+'</div>':'')+'</div>'; }
window.hhLn3SSel=function(i){ var st=V.a.sort; st.cur=st.cur===i?null:i; render(); };
window.hhLn3SBin=function(bn){ var st=V.a.sort; if(!st||st.cur==null||st.ok) return; st.put[st.cur]=bn; st.cur=null; var A=B().chapters[V.ci].sort; if(Object.keys(st.put).length===A.items.length){ st.ok=A.items.every(function(x,i){ return st.put[i]===x[1]; }); if(st.ok){ ST.act[B().chapters[V.ci].k+'-s']=1; save(); } } render(); };
window.hhLn3SOut=function(i){ var st=V.a.sort; if(st.ok) return; delete st.put[i]; st.ok=null; render(); };
window.hhLn3SReset=function(){ V.a.sort=null; render(); };
/* نشاط التوصيل */
function actMatch(c){ var A=c.match, st=V.a.mt||(V.a.mt={m:{},cur:null}), R=shuf(A.pairs.map(function(_,i){ return i; }),'m'+c.k), rev={}, col=['#B4592A','#B8924A','#A3354F','#5B6FA8','#2F8F5B','#1F6F7A'];
  Object.keys(st.m).forEach(function(l){ rev[st.m[l]]=+l; });
  return '<div class="l2-act"><h3>'+sv('link',17)+esc(A.t)+'</h3><p>'+esc(A.s)+' اضغط عنصراً من اليمين، ثم ما يقابله من اليسار.</p><div class="mt"><div class="cl"><h5>'+esc(A.l)+'</h5>'+A.pairs.map(function(p,i){ var m=st.m[i], k=st.ok!=null&&m!=null?(m===i?' ok':' no'):''; return '<button type="button" class="mi'+(m!=null?' f':'')+k+(st.cur===i?' cur':'')+'" style="'+(m!=null?'--k:'+col[i%6]:'')+'" onclick="hhLn3ML('+i+')">'+esc(p[0])+'</button>'; }).join('')+'</div>'
   +'<div class="cl"><h5>'+esc(A.r)+'</h5>'+R.map(function(j){ var l=rev[j], k=st.ok!=null&&l!=null?(l===j?' ok':' no'):''; return '<button type="button" class="mi'+(l!=null?' f':'')+k+'" style="'+(l!=null?'--k:'+col[l%6]:'')+'" onclick="hhLn3MR('+j+')">'+esc(A.pairs[j][1])+'</button>'; }).join('')+'</div></div>'
   +(st.ok!=null?'<div class="res '+(st.ok?'ok':'no')+'">'+(st.ok?'ممتاز، كل التوصيلات صحيحة':'بعض التوصيلات غير صحيحة')+(st.ok?'':'<button type="button" class="l2-b" onclick="hhLn3MReset()">أعد</button>')+'</div>':'')+'</div>'; }
window.hhLn3ML=function(i){ var st=V.a.mt; if(st.ok) return; if(st.m[i]!=null){ delete st.m[i]; st.ok=null; } st.cur=st.cur===i?null:i; render(); };
window.hhLn3MR=function(j){ var st=V.a.mt; if(st.ok) return; Object.keys(st.m).forEach(function(l){ if(st.m[l]===j) delete st.m[l]; }); if(st.cur!=null){ st.m[st.cur]=j; st.cur=null; } st.ok=null; var A=B().chapters[V.ci].match; if(Object.keys(st.m).length===A.pairs.length){ st.ok=A.pairs.every(function(_,i){ return st.m[i]===i; }); if(st.ok){ ST.act[B().chapters[V.ci].k+'-m']=1; save(); } } render(); };
window.hhLn3MReset=function(){ V.a.mt=null; render(); };

/* ═══ افحص نفسك: مؤشرات الدليل، على الجهاز فقط ═══ */
var CHO=[['نادراً',0],['أحياناً',1],['غالباً',2]];
function vCheck(){
  var b=B(), K=b.check, G=K.groups, tot=0, ans=0, sc=0;
  G.forEach(function(g,gi){ g.items.forEach(function(_,ii){ tot++; var v=PV.chk[gi+'-'+ii]; if(v!=null){ ans++; sc+=v; } }); });
  var all=ans===tot, ratio=tot?sc/(tot*2):0, lvl=ratio<0.34?0:ratio<0.6?1:2;
  var res=ans?'<div class="l3-cr"><h3>'+sv('pulse',18)+'قراءتك'+(all?'':' حتى الآن')+'</h3><div class="bars">'+G.map(function(g,gi){ var n=0,s=0; g.items.forEach(function(_,ii){ var v=PV.chk[gi+'-'+ii]; if(v!=null){ n++; s+=v; } }); var p=n?Math.round(s/(n*2)*100):0; return '<div><span>'+esc(g.t)+'</span><i><em style="width:'+p+'%;--h:'+(p<34?'#7FB89A':p<60?'#E2B46A':'#D9825B')+'"></em></i><b>'+(n?'':'لم تُجب')+'</b></div>'; }).join('')+'</div>'
     +(all?'<div class="msg l'+lvl+'"><b>'+esc(K.levels[lvl].t)+'</b><p>'+esc(K.levels[lvl].x)+'</p></div><div class="bt"><button type="button" class="l2-b p" onclick="hhLn3Go(\'plan\')">'+sv('route',15)+'ابنِ خطتك</button>'+K.go.map(function(g){ return '<button type="button" class="l2-b" onclick="hhLn3Go(\'ch\','+g[0]+')">'+esc(g[1])+'</button>'; }).join('')+'<button type="button" class="l2-b" onclick="hhLn3ChkClr()">'+sv('trash',15)+'امسح إجاباتي</button></div>':'<p class="nt">أجب عن كل المؤشرات لتظهر لك القراءة كاملة.</p>')+'</div>':'';
  if(all&&!ST.chk){ ST.chk=1; save(); }
  return '<div class="l2-wrap">'+crumbs(base().concat([['افحص نفسك']]))
   +'<div class="l2-lh l3-lh"><span class="ic">'+sv('pulse',30)+'</span><div><h1>افحص نفسك</h1><p>'+esc(K.intro)+'</p></div><div class="r"><b>'+ans+'/'+tot+'</b><small>مؤشراً أجبت عنه</small></div></div>'
   +'<div class="l3-warn">'+sv('shield',18)+'<p><b>ليس تشخيصاً.</b> '+esc(K.note)+'</p></div>'
   +'<div class="l3-ck">'+G.map(function(g,gi){ return '<section><h3><i>'+sv(g.ic||'pulse',16)+'</i>'+esc(g.t)+'</h3>'+g.items.map(function(it,ii){ var k=gi+'-'+ii, v=PV.chk[k]; return '<div class="r'+(v!=null?' a':'')+'"><span>'+esc(it)+'</span><span class="sg" role="group" aria-label="'+esc(it)+'">'+CHO.map(function(c){ return '<button type="button" class="'+(v===c[1]?'on v'+c[1]:'')+'" aria-pressed="'+(v===c[1])+'" onclick="hhLn3Chk(\''+k+'\','+c[1]+')">'+c[0]+'</button>'; }).join('')+'</span></div>'; }).join('')+'</section>'; }).join('')+'</div>'
   +res+'<p class="l2-src">'+sv('lock',13)+' إجاباتك تُحفظ على جهازك فقط، ولا تُرسل إلى المنصة ولا إلى معلمك. المؤشرات من '+esc(SRC('guide').t)+'، '+esc(SRC('guide').by)+'.</p></div>';
}
window.hhLn3Chk=function(k,v){ if(PV.chk[k]===v) delete PV.chk[k]; else PV.chk[k]=v; saveMe(); var h=host(), y=h?h.scrollTop:0; render(); if(h) h.scrollTop=y; };
window.hhLn3ChkClr=function(){ if(!confirm('مسح كل إجاباتك في الفحص؟')) return; PV.chk={}; saveMe(); render(); };

/* ═══ خطتي ═══ */
var WHEN=['اليوم','هذا الأسبوع','هذا الشهر','كل يوم'];
function vPlan(){
  var b=B(), S=b.strategies||[], mine=S.filter(function(s){ return PV.plan[s.id]; });
  var pre=S.filter(function(s){ return s.kind==='prevent'; }), rec=S.filter(function(s){ return s.kind==='recover'; });
  return '<div class="l2-wrap">'+crumbs(base().concat([['خطتي']]))
   +'<div class="l2-lh l3-lh"><span class="ic">'+sv('route',30)+'</span><div><h1>خطتي من الاحتراق إلى الإشراق</h1><p>اختر ما يناسبك من استراتيجيات الدليل للوقاية والتعافي، واكتب أمام كل واحدة خطوتك الأولى ومتى تبدأ بها، ثم اطبع خطتك وعلّقها أمامك.</p></div><div class="r"><b>'+mine.length+'</b><small>في خطتك</small></div></div>'
   +'<div class="l3-pl" id="ln3-plan"><h3>'+sv('clip',18)+'خطتي'+(mine.length?'':'، فارغة بعد')+'</h3>'+(mine.length?mine.map(function(s,i){ var p=PV.plan[s.id]; return '<div class="r"><i>'+(i+1)+'</i><div class="t"><b>'+esc(s.t)+'</b><small>'+(s.kind==='recover'?'تعافٍ':'وقاية')+'</small></div><label class="st"><span>خطوتي الأولى</span><input data-id="'+s.id+'" class="ln3-ps" maxlength="140" value="'+esc(p.step||'')+'" placeholder="اكتب خطوة صغيرة تبدأ بها"></label><label class="wh"><span>متى؟</span><select data-id="'+s.id+'" class="ln3-pw">'+WHEN.map(function(w){ return '<option'+(p.when===w?' selected':'')+'>'+w+'</option>'; }).join('')+'</select></label><button type="button" class="l2-ib" aria-label="احذف من الخطة" onclick="hhLn3Plan(\''+s.id+'\')">'+sv('x',15,2.4)+'</button></div>'; }).join('')
     +'<div class="bt"><button type="button" class="l2-b p" onclick="hhLn3PlanPrint()">'+sv('print',15)+'اطبع خطتي</button></div>':'<p class="nt">أضف استراتيجية من القائمتين بالأسفل لتبدأ.</p>')+'<p class="pv">'+sv('lock',13)+' خطتك تُحفظ على جهازك فقط.</p></div>'
   +'<div class="l3-two"><section><h3 class="l2-h3">'+sv('shield',17)+'استراتيجيات الوقاية <em>'+pre.length+'</em></h3>'+stratCards(pre)+'</section><section><h3 class="l2-h3">'+sv('sun',17)+'استراتيجيات التعافي <em>'+rec.length+'</em></h3>'+stratCards(rec)+'</section></div></div>';
}
document.addEventListener('input',function(e){ var t=e.target; if(!t||!t.classList) return; if(t.classList.contains('ln3-ps')||t.classList.contains('ln3-pw')){ var p=PV.plan[t.getAttribute('data-id')]; if(!p) return; if(t.classList.contains('ln3-ps')) p.step=t.value.slice(0,140); else p.when=t.value; saveMe(); } },true);
document.addEventListener('change',function(e){ var t=e.target; if(t&&t.classList&&t.classList.contains('ln3-pw')){ var p=PV.plan[t.getAttribute('data-id')]; if(p){ p.when=t.value; saveMe(); } } },true);
window.hhLn3PlanPrint=function(){ var b=B(), S=(b.strategies||[]).filter(function(s){ return PV.plan[s.id]; }); if(!S.length) return; var u=me();
  var w=window.open('','_blank'); if(!w) return;
  w.document.write('<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>خطتي</title><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;800;900&family=Reem+Kufi:wght@700&display=swap" rel="stylesheet"><style>@page{size:A4;margin:14mm}body{font-family:Cairo,sans-serif;color:#33261E;margin:0}h1{font-family:"Reem Kufi";color:#9A4A1C;margin:0 0 4px;font-size:30px}.s{color:#7E6C60;font-weight:800;margin:0 0 18px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #EBD9C8;padding:10px;text-align:right;vertical-align:top;font-size:14px}th{background:#FDF1E8;color:#5A2A14}td small{display:block;color:#7E6C60}td.c{width:28px;text-align:center}.f{margin-top:18px;font-size:12px;color:#7E6C60}</style></head><body><h1>خطتي من الاحتراق إلى الإشراق</h1><p class="s">'+esc((u&&u.displayName)||'')+' '+new Date().toLocaleDateString('ar-QA-u-nu-latn',{day:'numeric',month:'long',year:'numeric'})+'</p><table><thead><tr><th class="c"></th><th>الاستراتيجية</th><th>خطوتي الأولى</th><th>متى</th></tr></thead><tbody>'
   +S.map(function(s,i){ var p=PV.plan[s.id]; return '<tr><td class="c">'+(i+1)+'</td><td><b>'+esc(s.t)+'</b><small>'+(s.kind==='recover'?'تعافٍ':'وقاية')+'</small></td><td>'+esc(p.step||'')+'</td><td>'+esc(p.when||'')+'</td></tr>'; }).join('')+'</tbody></table><p class="f">من برنامج «'+esc(b.title)+'» في منصة المُلهم التعليمي، والاستراتيجيات من '+esc(SRC('guide').t)+'.</p><script>setTimeout(function(){print()},600)<\/script></body></html>'); w.document.close(); };

/* ═══ ماذا تقول الدراسات ═══ */
function vStudies(){ var b=B(), L=b.studies||[];
  return '<div class="l2-wrap">'+crumbs(base().concat([['ماذا تقول الدراسات']]))
   +'<div class="l2-lh l3-lh"><span class="ic">'+sv('doc',30)+'</span><div><h1>ماذا تقول الدراسات؟</h1><p>'+L.length+' دراسات ميدانية عربية في بيئات عمل مختلفة. قارن بينها، ثم افتح كل دراسة لترى عينتها وأداتها ونتائجها بالأرقام وتوصياتها.</p></div></div>'
   +'<div class="l2-tbl l3-cmp"><table><thead><tr><th>الدراسة</th><th>أين؟</th><th>العينة</th><th>الأداة</th><th>أبرز ما وجدته</th></tr></thead><tbody>'+L.map(function(s){ return '<tr><td class="k"><b>'+esc(s.short)+'</b><small>'+esc(s.author)+'، '+esc(s.year)+'</small></td><td>'+esc(s.where)+'</td><td>'+nums(String(s.sample.n).split(' (')[0])+'</td><td>'+esc(s.toolShort||s.tool)+'</td><td>'+nums(s.head)+'</td></tr>'; }).join('')+'</tbody></table></div>'
   +'<div class="l3-scs">'+L.map(function(s){ return '<button type="button" class="'+esc(s.id)+(ST.stu[s.id]?' dn':'')+'" onclick="hhLn3Go(\'study\',\''+esc(s.id)+'\')"><em>'+esc(s.type)+'، '+esc(s.where)+'، '+esc(s.year)+'</em><b>'+esc(s.title)+'</b><small>'+esc(s.author)+(s.uni?'، '+esc(s.uni):'')+'</small><span class="go">'+(ST.stu[s.id]?sv('check',13,3)+'قرأتها':sv('eye',13)+'افتح البطاقة')+'</span></button>'; }).join('')+'</div></div>'; }
function vStudy(){ var b=B(), s=STU(V.sid), scr=V.mode==='screen'; if(!s) return vStudies(); if(!ST.stu[s.id]){ ST.stu[s.id]=1; save(); }
  var ix=b.studies.indexOf(s), nx=b.studies[ix+1];
  var head=scr?stage(s.short):crumbs(base().concat([['ماذا تقول الدراسات',"hhLn3Go('studies')"],[s.short]]));
  return '<div class="l2-wrap'+(scr?' big':'')+'">'+head
   +'<div class="l3-sh '+esc(s.id)+'"><em>'+esc(s.type)+'، '+esc(s.where)+'، '+esc(s.year)+'</em><h1>'+esc(s.title)+'</h1><p>'+esc(s.author)+(s.supervisor?'، إشراف '+esc(s.supervisor):'')+(s.uni?'، '+esc(s.uni):'')+'</p></div>'
   +'<div class="l3-sg"><div><small>'+sv('flag',14)+'الهدف</small><p>'+esc(s.aim)+'</p></div><div><small>'+sv('users',14)+'العينة</small><p>'+nums(s.sample.n)+(s.sample.who?'، '+esc(s.sample.who):'')+(s.sample.pop?'<br><span>المجتمع: '+nums(s.sample.pop)+'</span>':'')+(s.sample.rate?'<br><span>'+nums(s.sample.rate)+'</span>':'')+'</p></div><div><small>'+sv('lens',14)+'المنهج</small><p>'+esc(s.method)+'</p></div><div><small>'+sv('clip',14)+'الأداة</small><p>'+esc(s.tool)+'</p></div></div>'
   +'<h3 class="l2-h3">'+sv('chart',17)+'النتائج <em>'+s.results.length+'</em></h3><ol class="l3-rs">'+s.results.map(function(r){ return '<li>'+nums(r.x)+'</li>'; }).join('')+'</ol>'
   +(s.tables||[]).map(function(T){ return '<h3 class="l2-h3">'+sv('grid',17)+esc(T.t)+'</h3>'+tbl(T); }).join('')
   +(s.recs&&s.recs.length?'<h3 class="l2-h3">'+sv('bulb',17)+'التوصيات <em>'+s.recs.length+'</em></h3><ul class="l3-rc">'+s.recs.map(function(r){ return '<li>'+esc(r)+'</li>'; }).join('')+'</ul>':'')
   +'<div class="l2-nav"><button type="button" class="l2-b" onclick="hhLn3Go(\'studies\')">'+sv('back',15,2.4)+'كل الدراسات</button><span></span>'+(nx?'<button type="button" class="l2-b p" onclick="hhLn3Go(\'study\',\''+esc(nx.id)+'\')">'+esc(nx.short)+sv('next',15,2.4)+'</button>':'')+'</div></div>'; }

/* ═══ الاختبار ═══ */
function startQuiz(ci){ var c=B().chapters[ci]; V.ci=ci; V.qz={idx:shuf(c.quiz.map(function(_,i){ return i; })),i:0,ok:0,ch:null,ord:null}; go('quiz',{ci:ci,qz:V.qz}); }
function vQuiz(){
  var b=B(), c=b.chapters[V.ci], Q=V.qz, scr=V.mode==='screen';
  if(Q.i>=Q.idx.length){ var pc=Math.round(Q.ok/Q.idx.length*100); if(!Q.sv){ Q.sv=1; if(pc>(ST.quiz[c.k]||-1)) ST.quiz[c.k]=pc; save(); }
    return '<div class="l2-wrap'+(scr?' big':'')+'"><div class="l2-res"><div class="ring big" style="--p:'+pc+'"><b>'+pc+'%</b></div><h2>'+(pc>=70?'أحسنت! أتممت '+esc(ord(V.ci)):'قاربت، راجع المحطة وحاول مرة أخرى')+'</h2><p>'+Q.ok+' من '+Q.idx.length+' إجابات صحيحة</p><div class="bt">'
     +(V.ci<b.chapters.length-1?'<button type="button" class="l2-b p" onclick="hhLn3Go(\'ch\','+(V.ci+1)+')">'+ord(V.ci+1)+sv('next',15,2.4)+'</button>':'<button type="button" class="l2-b p" onclick="hhLn3Go(\'cert\')">شهادة الإتمام</button>')+'<button type="button" class="l2-b" onclick="hhLn3Go(\'quiz\','+V.ci+')">'+sv('refresh',15)+'أعد الاختبار</button><button type="button" class="l2-b" onclick="hhLn3Go(\'ch\','+V.ci+')">ارجع إلى المحطة</button></div></div></div>'; }
  var q=c.quiz[Q.idx[Q.i]]; if(!Q.ord) Q.ord=shuf(q.o.map(function(_,i){ return i; }));
  return '<div class="l2-wrap'+(scr?' big':'')+'"><div class="l2-qh"><button type="button" class="l2-ib" onclick="hhLn3Go(\'ch\','+V.ci+')" aria-label="خروج">'+sv('x',18,2.4)+'</button><b>اختبار '+esc(ord(V.ci))+'، '+esc(c.t)+'</b><span>'+(Q.i+1)+' من '+Q.idx.length+'</span></div><div class="l2-qbar"><i style="width:'+Math.round(Q.i/Q.idx.length*100)+'%"></i></div>'
   +'<div class="l2-qq"><h2>'+esc(q.q)+'</h2><div class="l2-opts">'+Q.ord.map(function(i,j){ var k=Q.ch==null?'':i===0?' ok':i===Q.ch?' no':' off'; return '<button type="button" class="op'+k+'" onclick="hhLn3Q('+i+')" '+(Q.ch!=null?'disabled':'')+'><span class="l">'+['أ','ب','ج','د'][j]+'</span><span>'+esc(q.o[i])+'</span></button>'; }).join('')+'</div>'
   +(Q.ch!=null?'<div class="l2-nav"><span>'+(Q.ch===0?'إجابة صحيحة':'الإجابة الصحيحة هي المضيئة')+(q.src?'، '+esc(SRC(q.src).short):'')+'</span><button type="button" class="l2-b p" onclick="hhLn3QN()">'+(Q.i+1<Q.idx.length?'التالي':'النتيجة')+sv('next',15,2.4)+'</button></div>':'')+'</div></div>';
}
window.hhLn3Q=function(i){ var Q=V.qz; if(!Q||Q.ch!=null||Q.i>=Q.idx.length) return; Q.ch=i; if(i===0) Q.ok++; render(); };
window.hhLn3QN=function(){ var Q=V.qz; if(!Q||Q.i>=Q.idx.length) return; Q.i++; Q.ch=null; Q.ord=null; render(); };

/* ═══ المصطلحات ═══ */
function norm(s){ return String(s||'').replace(/[ً-ْ]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي'); }
function glossList(){ var T=norm(V.gq||'').trim().split(/\s+/).filter(Boolean).map(function(w){ return w.replace(/^ال/,'').replace(/(ه|ات|ون|ين|يه|ي)$/,''); }).filter(function(w){ return w.length>1; }), L=B().concepts.filter(function(c){ var h=norm(c.term+' '+c.def+' '+(c.en||'')); return !T.length||T.every(function(w){ return h.indexOf(w)>-1; }); }); L.sort(function(a,b){ return (T.length&&norm(a.term).indexOf(T[0])>-1?0:1)-(T.length&&norm(b.term).indexOf(T[0])>-1?0:1); });
  return L.length?L.map(function(c){ return '<div class="gi"><b>'+esc(c.term)+(c.en?' <em dir="ltr">'+esc(c.en)+'</em>':'')+'</b><p>'+esc(c.def)+'</p>'+(c.src?'<small>'+esc(SRC(c.src).short)+'</small>':'')+'</div>'; }).join(''):'<p class="l2-emp">لا مصطلح بهذا الاسم</p>'; }
function vGloss(){ var b=B();
  return '<div class="l2-wrap">'+crumbs(base().concat([['المصطلحات']]))
   +'<div class="l2-lh l3-lh"><span class="ic">'+sv('tag',30)+'</span><div><h1>المصطلحات</h1><p>'+b.concepts.length+' مصطلحاً بتعريف مصادرها.</p></div></div>'
   +'<label class="l2-gs">'+sv('search',18)+'<input id="ln3-gq" type="search" placeholder="ابحث عن مصطلح أو كلمة في تعريفه" value="'+esc(V.gq||'')+'" aria-label="ابحث في المصطلحات"></label><div class="l2-gl" id="ln3-gl">'+glossList()+'</div>'
   +(b.defs&&b.defs.length?'<h3 class="l2-h3">'+sv('quote',16)+'كيف عرّفه الباحثون؟ <em>'+b.defs.length+'</em></h3><div class="l2-qu">'+b.defs.map(function(d){ return '<figure><blockquote>«'+esc(d.x)+'»</blockquote><figcaption>'+esc(d.by)+'، نقلاً عن '+esc(SRC(d.src).short)+'</figcaption></figure>'; }).join('')+'</div>':'')+'</div>'; }

/* ═══ الشهادة ═══ */
function vCert(){ var b=B(), n=b.chapters.length, pass=b.chapters.filter(function(c){ return (ST.quiz[c.k]||0)>=70; }).length, all=pass===n, u=me();
  if(!all) return '<div class="l2-wrap">'+crumbs(base().concat([['شهادة الإتمام']]))+'<div class="l2-res"><div class="ring big" style="--p:'+Math.round(pass/n*100)+'"><b>'+pass+'/'+n+'</b></div><h2>تبقّى '+(n-pass)+' من اختبارات المحطات</h2><p>اجتز اختبار كل محطة بنسبة 70% فأكثر لتحصل على الشهادة.</p><div class="bt">'+b.chapters.map(function(c,i){ var s=ST.quiz[c.k]; return '<button type="button" class="l2-b'+(s>=70?' ok':'')+'" onclick="hhLn3Go(\'quiz\','+i+')">'+(s>=70?sv('check',14,3):'')+esc(c.t)+(s!=null?' '+s+'%':'')+'</button>'; }).join('')+'</div></div></div>';
  return '<div class="l2-wrap">'+crumbs(base().concat([['شهادة الإتمام']]))
   +'<div class="ln-cert l3c" id="ln3-cert"><div class="in"><i class="cr tl"></i><i class="cr tr"></i><i class="cr bl"></i><i class="cr br"></i><small>منصة المُلهم التعليمي، برنامج «تعلّم»</small><h1>شهادة إتمام</h1><p>تشهد المنصة بأن</p><input id="ln3-cn" value="'+esc((u&&u.displayName)||'')+'" placeholder="اكتب الاسم" aria-label="الاسم"><p>أتمّ برنامج <b>«'+esc(b.title)+': '+esc(b.sub)+'»</b><br>واجتاز اختبارات محطاته '+(n===7?'السبع':'كلها')+'</p><div class="ft"><span>'+new Date().toLocaleDateString('ar-QA-u-nu-latn',{day:'numeric',month:'long',year:'numeric'})+'</span><span class="sl">'+sv('sun',40,1.5)+'</span><span>المُلهم</span></div></div></div>'
   +'<div class="l2-ca"><button type="button" class="l2-b p" onclick="hhLn3Print()">'+sv('print',16)+'اطبع الشهادة</button></div></div>'; }
window.hhLn3Print=function(){ var c=$('ln3-cert'), n=$('ln3-cn'), nm=n?n.value.trim():''; if(!nm){ toastX('اكتب الاسم أولاً','info'); if(n) n.focus(); return; }
  var css=($('hh-learn-css')||{}).textContent||''; var m=css.indexOf('.ln-cert{'); css=m>-1?css.slice(m):'';
  var w=window.open('','_blank'); if(!w) return; w.document.write('<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>شهادة إتمام</title><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;900&family=Amiri:wght@700&family=Reem+Kufi:wght@700&display=swap" rel="stylesheet"><style>@page{size:A4 landscape;margin:0}body{margin:0;font-family:Cairo,sans-serif}'+css+'.ln-cert{width:297mm;height:210mm;border-radius:0;box-shadow:none;max-width:none}.ln-cert .cr{border-color:#B4592A}.ln-cert h1{color:#9A4A1C}.ln-cert .sl{color:#E39A5B}</style></head><body>'+c.outerHTML.replace(/<input[^>]*>/,'<div class="nm">'+esc(nm)+'</div>')+'<script>setTimeout(function(){print()},700)<\/script></body></html>'); w.document.close(); };

/* ═══ مع دخول الطلاب ═══ */
function liveDlg(){ var b=B(), h=host(); if(!h) return; var ov=document.createElement('div'); ov.className='ln-scrim'; ov.id='ln3-live';
  ov.innerHTML='<div class="ln-dlg l3d" role="dialog" aria-modal="true" aria-label="مع دخول الطلاب"><div class="dh"><div><b>مع دخول الطلاب</b><small>يدخل المشاركون برمز من أجهزتهم، ويجيبون عن أسئلة المحطة في جولة مباشرة، والنتائج على الشاشة</small></div><button type="button" class="x" aria-label="إغلاق" onclick="this.closest(\'.ln-scrim\').remove()">'+sv('x',16,2.4)+'</button></div>'
   +'<div class="in"><h4>اختر المحطة</h4><div class="g">'+b.chapters.map(function(c,i){ return '<button type="button" onclick="hhLn3Live('+i+')"><i>'+sv(c.ic||'book',20)+'</i><b>'+esc(c.t)+'</b><small>'+(c.quiz||[]).length+' أسئلة</small></button>'; }).join('')+'<button type="button" onclick="hhLn3Live(-1)"><i>'+sv('star',20)+'</i><b>البرنامج كله</b><small>كل الأسئلة</small></button></div><p class="nt">'+sv('tv',15)+'تحتاج حساب معلم. ولشرح البرنامج على الشاشة دون دخول المشاركين اختر «أعرض على الصف».</p></div></div>';
  h.appendChild(ov); ov.addEventListener('click',function(e){ if(e.target===ov) ov.remove(); }); }
window.hhLn3Live=function(ci){ var d=$('ln3-live'); if(d) d.remove(); var u=me(); if(!u||!u.uid){ toastX('سجّل الدخول بحساب المعلم لبدء جولة مباشرة','error'); return; } if(typeof window.hhLiveHost!=='function'){ toastX('وحدة التشغيل المباشر غير محمّلة','error'); return; }
  var b=B(), C=ci<0?b.chapters:[b.chapters[ci]], qs=[]; C.forEach(function(c){ (c.quiz||[]).forEach(function(q,n){ var od=shuf(q.o.map(function(_,i){ return i; }),'L'+c.k+n); qs.push({id:'l3_'+c.k+'_'+n,type:'mcq',q:q.q,opts:od.map(function(i){ return q.o[i]; }),correct:[od.indexOf(0)],time:25,mult:1,flash:false,note:''}); }); });
  var g={id:'learn_burn_'+(ci<0?'all':b.chapters[ci].k),title:ci<0?b.title:'«'+b.chapters[ci].t+'» من '+b.title,template:'race',mode:'live',screenTpl:'boxes',settings:{},questions:qs,status:'ready'};
  if(typeof window.hhLearnClose==='function') hhLearnClose(); hhLiveHost(g); };

document.addEventListener('keydown',function(e){ var h=host(); if(!h||!h.classList.contains('ln3')) return; var t=e.target; if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.tagName==='SELECT')) return;
  if(V.view==='ch'){ if(e.key==='ArrowLeft'){ e.preventDefault(); hhLn3Sec(V.si+1); } else if(e.key==='ArrowRight'){ e.preventDefault(); hhLn3Sec(V.si-1); } } });

/* بطاقة البرنامج في صفحة «تعلّم» */
window.hhLn3Info=function(){ var b=B(); if(!b) return null; if(!ST) loadST(); var pc=totalProg(), L=ST.last&&b.chapters[ST.last.ci]?ST.last:null, c=L?b.chapters[L.ci]:null, si=L?Math.min(L.si,c.sections.length-1):0, rd=Object.keys(ST.read).length, ns=0; b.chapters.forEach(function(x){ ns+=x.sections.length; });
  return {id:'burn',n:'البرنامج الثالث',cat:'pro',aud:'للمعلمين والعاملين',title:b.title,cover:'<b>الاحتراق<br>الوظيفي</b><small>من الاحتراق<br>إلى الإشراق</small>',mini:'الاحتراق الوظيفي',au:'دليل إرشادي، وثلاث دراسات ميدانية',
    st:[[b.chapters.length,'محطات'],[(b.studies||[]).length,'دراسات'],[(b.strategies||[]).length,'استراتيجية']],pct:pc,t:ST.t||0,tone:'o',open:'hhLn3Open()',scr:"hhLnScr('burn')",
    res:L?{h:ord(L.ci)+'، الفقرة '+(si+1)+' من '+c.sections.length,x:c.sections[si].t,go:'hhLn3Open(\'ch\','+L.ci+');hhLn3Sec('+si+')',k:[[pc+'%','تقدمك'],[rd+'/'+ns,'فقرة قرأتها'],[planN(),'في خطتي']]}:null}; };

function style(){ try{ if(window.hhLn2Style) hhLn2Style(); }catch(e){} if($('hh-learn3-css')) return; var s=document.createElement('style'); s.id='hh-learn3-css'; s.textContent=CSS; document.head.appendChild(s); }
window._hhLn3=function(){ return {V:V,ST:ST,PV:PV}; };

var CSS=[
"#hh-learn.ln2.ln3{--bg:#FCF8F3;--card:#FFFFFF;--soft:#F6EFE7;--ln:#EADCCB;--ink:#33261E;--hd:#5A2A14;--mu:#7E6C60;--t:#B4592A;--t1:#FDF1E8;--t2:#F3D3BC;--g:#B8924A;--g1:#FBF3E2;--g2:#F0DDB5;--r:#A3354F;--r1:#FBEDEF;--e1:#FFF4EA;--gz:#2F7F8F;--jd:#5B6FA8;--sy:#2F8F5B;}",
"body.dark-mode #hh-learn.ln2.ln3{--bg:#1C1612;--card:#251D18;--soft:#2D241E;--ln:#3D3129;--ink:#EDE3DA;--hd:#F6E7D8;--mu:#B5A497;--t:#E9976A;--t1:#3A271D;--t2:#5A3A28;--g1:#2E2716;--g2:#5A4A26;--r1:#3A1E25;--e1:#2D221B;--gz:#7FC3CF;--jd:#9FB0E0;--sy:#7FCBA2;}",
"#hh-learn.ln3 .l2-b.p{box-shadow:0 8px 20px rgba(180,89,42,.22);} #hh-learn.ln3 .l2-act,#hh-learn.ln3 .l2-cases button.dn{background:var(--e1);}",
".l3-hero{background:radial-gradient(70% 110% at 85% 0%,#FDE7D3 0,transparent 60%),linear-gradient(160deg,#FFFBF6,#FBF5EC 75%) !important;box-shadow:0 18px 50px rgba(154,74,28,.07) !important;}",
"body.dark-mode #hh-learn .l3-hero{background:linear-gradient(160deg,#2A1F18,#1C1612) !important;}",
".l3-hero .sb{margin:-4px 0 10px !important;font-family:\"Reem Kufi\",Cairo;font-size:22px !important;color:var(--t) !important;opacity:1 !important;}",
".l3-sun{position:relative;aspect-ratio:1.1;max-width:360px;width:100%;justify-self:center;border-radius:30px;overflow:hidden;background:linear-gradient(180deg,#FFF6EC 0%,#FDE6CF 55%,#F8D8BC 56%,#FBEADC 100%);border:1px solid var(--ln);}",
"body.dark-mode #hh-learn .l3-sun{background:linear-gradient(180deg,#3A2A20 0%,#4A3020 55%,#3A2418 56%,#2D221B 100%);}",
".l3-sun .orb{position:absolute;left:50%;top:50%;width:44%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle at 50% 40%,#FFE7B0,#F7B061 55%,#EC8A4C);box-shadow:0 0 0 10px rgba(247,176,97,.18),0 0 70px rgba(246,160,90,.6);animation:l3rise 1.6s ease-out both;}",
".l3-sun .rays{position:absolute;left:50%;top:50%;width:92%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:repeating-conic-gradient(rgba(246,182,110,.22) 0 6deg,transparent 6deg 18deg);-webkit-mask:radial-gradient(circle,transparent 26%,#000 27%,#000 60%,transparent 70%);mask:radial-gradient(circle,transparent 26%,#000 27%,#000 60%,transparent 70%);animation:l3rot 60s linear infinite;}",
".l3-sun .hz{position:absolute;left:0;right:0;top:62%;bottom:0;background:linear-gradient(180deg,rgba(255,250,244,.92),#FFF8F1);border-top:2px solid #F0C9A6;}",
"body.dark-mode #hh-learn .l3-sun .hz{background:linear-gradient(180deg,rgba(37,29,24,.94),#251D18);border-color:#6A4630;}",
".l3-sun .a,.l3-sun .z{position:absolute;bottom:14px;font-family:\"Reem Kufi\",Cairo;font-size:17px;font-weight:700;} .l3-sun .a{right:18px;color:#C0612B;} .l3-sun .z{left:18px;color:#B8924A;}",
".l3-sun .pth{position:absolute;left:14%;right:14%;bottom:50px;height:40px;border-bottom:2px dashed #EDC7A5;} .l3-sun .pth i{position:absolute;bottom:-8px;right:calc(var(--i) / (var(--n) - 1) * 100%);width:14px;height:14px;margin-right:-7px;border-radius:50%;background:#fff;border:3px solid #E8A06C;}",
".l3-sun .pth i.dn{background:#E8A06C;border-color:#C0612B;}",
"@keyframes l3rise{from{top:76%;opacity:.5}to{top:50%;opacity:1}} @keyframes l3rot{to{transform:translate(-50%,-50%) rotate(360deg)}}",
".l3-srcs{margin-top:16px;background:var(--card);border:1px solid var(--ln);border-radius:24px;padding:16px 18px;} .l3-srcs h3{margin:0 0 12px;display:flex;gap:8px;align-items:center;font-size:17px;color:var(--hd);}",
".l3-srcs .g{display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:10px;} .l3-srcs .sc{position:relative;display:flex;flex-direction:column;gap:5px;border-radius:18px;padding:14px;background:var(--soft);border-top:4px solid var(--k,var(--t));min-width:0;}",
".l3-srcs .sc.guide{--k:var(--t);background:var(--t1);} .l3-srcs .sc.gaza2010{--k:var(--gz);} .l3-srcs .sc.jeddah{--k:var(--jd);} .l3-srcs .sc.syria{--k:var(--sy);}",
".l3-srcs em{font-style:normal;font-size:11.5px;font-weight:900;color:var(--k);} .l3-srcs b{font-size:14.5px;line-height:1.6;color:var(--hd);} .l3-srcs small{font-size:12.5px;font-weight:700;color:var(--mu);line-height:1.7;} .l3-srcs .sc>span{display:inline-flex;gap:5px;align-items:center;font-size:12px;font-weight:800;color:var(--mu);}",
".l3-srcs .sp{font-style:normal;margin-top:auto;font-size:12px;font-weight:900;color:var(--t);} .l3-srcs button{all:unset;cursor:pointer;margin-top:auto;display:inline-flex;gap:5px;align-items:center;font-size:12.5px;font-weight:900;color:var(--k);} .l3-srcs button:hover{text-decoration:underline;} .l3-srcs button:focus-visible{outline:3px solid var(--g);}",
".l3-map{grid-template-columns:repeat(var(--n),minmax(0,1fr)) !important;}",
"#hh-learn.ln3 .l2-map .nd .q{color:#8A5A2E;} body.dark-mode #hh-learn.ln3 .l2-map .nd .q{color:var(--g2);}",
".l3-tri{grid-template-columns:repeat(5,minmax(0,1fr)) !important;} .l3-tri button{grid-template-columns:1fr !important;align-content:start;} .l3-tri i{grid-row:auto !important;margin-bottom:6px;}",
".l3-nums{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;} .l3-nums div{background:var(--card);border:1px solid var(--ln);border-radius:18px;padding:14px 16px;display:flex;flex-direction:column;gap:4px;min-width:0;}",
".l3-nums b{font-size:26px;font-weight:900;color:var(--t);line-height:1.3;overflow-wrap:anywhere;} .l3-nums p{margin:0;font-size:14px;font-weight:700;line-height:1.8;color:var(--ink);} .l3-nums small{margin-top:auto;display:flex;gap:5px;align-items:flex-start;font-size:11.5px;font-weight:800;color:var(--mu);line-height:1.6;}",
".l3-nums.in{grid-template-columns:repeat(auto-fill,minmax(210px,1fr));margin:12px 0;} .l3-nums.in div{background:var(--e1);border-color:var(--t2);}",
".l3-grp{margin:14px 0 6px;font-size:15px;font-weight:900;color:var(--t);} .l2-items .it.pl{cursor:default;}",
".l3-qt{margin:16px 0 0;background:var(--g1);border:1px solid var(--g2);border-radius:18px;padding:16px 20px;} .l3-qt blockquote{margin:0;font-family:Amiri,serif;font-size:21px;line-height:1.9;color:var(--hd);} .l3-qt figcaption{margin-top:6px;font-size:13px;font-weight:800;color:var(--mu);}",
".l3-pgf{margin-top:18px;padding-top:12px;border-top:1px dashed var(--ln);display:flex;justify-content:flex-end;}",
".l3-src{display:inline-flex;gap:6px;align-items:center;font-size:12px;font-weight:900;color:var(--mu);background:var(--soft);border-radius:20px;padding:3px 10px;}",
".l3-lead{margin:-4px 0 10px;font-size:14px;font-weight:700;color:var(--mu);line-height:1.8;}",
".l3-ev{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;} .l3-ev .e{display:flex;flex-direction:column;gap:8px;background:var(--card);border:1px solid var(--ln);border-inline-start:5px solid var(--k);border-radius:16px;padding:14px 16px;}",
".l3-ev .e.gaza2010{--k:var(--gz);} .l3-ev .e.jeddah{--k:var(--jd);} .l3-ev .e.syria{--k:var(--sy);} .l3-ev .e.guide{--k:var(--t);}",
".l3-ev .bd{display:inline-flex;gap:5px;align-items:center;width:max-content;font-size:12px;font-weight:900;color:var(--k);} .l3-ev p{margin:0;font-size:15.5px;font-weight:700;line-height:2;color:var(--ink);}",
".l3-ev button{all:unset;cursor:pointer;margin-top:auto;display:inline-flex;gap:5px;align-items:center;font-size:12.5px;font-weight:800;color:var(--mu);} .l3-ev button:hover{color:var(--k);} .l3-ev button:focus-visible{outline:3px solid var(--g);}",
"b.nm{font-weight:900;color:var(--t);background:var(--t1);border-radius:6px;padding:0 4px;}",
".l3-stg{display:grid;gap:10px;} .l3-stg .s{background:var(--card);border:1.5px solid var(--ln);border-radius:16px;padding:6px;display:grid;grid-template-columns:1fr auto;gap:6px;align-items:center;}",
".l3-stg .s.op{border-color:var(--t2);} .l3-stg .h{all:unset;cursor:pointer;display:flex;gap:10px;align-items:center;padding:8px;border-radius:12px;min-width:0;} .l3-stg .h:focus-visible{outline:3px solid var(--g);}",
".l3-stg .h i{width:34px;height:34px;border-radius:10px;background:var(--t1);color:var(--t);display:grid;place-items:center;flex-shrink:0;} .l3-stg .h b{flex:1;font-size:15.5px;line-height:1.6;color:var(--hd);} .l3-stg .h em{color:var(--mu);}",
".l3-stg .x{grid-column:1/-1;padding:0 12px 10px;} .l3-stg .x p{margin:0 0 8px;font-size:15px;font-weight:600;line-height:2;color:var(--ink);} .l3-stg .x ol{margin:0;padding-inline-start:22px;display:grid;gap:6px;} .l3-stg .x li{font-size:15px;font-weight:700;line-height:1.9;color:var(--ink);}",
".l3-stg .ad{all:unset;cursor:pointer;display:inline-flex;gap:6px;align-items:center;font-size:13px;font-weight:900;color:var(--t);border:1.5px solid var(--t2);border-radius:11px;padding:7px 12px;white-space:nowrap;margin-inline-end:6px;} .l3-stg .ad.on{background:var(--t);color:#fff;border-color:transparent;} .l3-stg .ad:focus-visible{outline:3px solid var(--g);}",
".l3-lh{background:var(--t1) !important;border-color:var(--t2) !important;} .l3-lh .ic{background:var(--card) !important;color:var(--t) !important;}",
".l3-warn{display:flex;gap:10px;align-items:flex-start;margin:0 0 14px;background:var(--g1);border:1px solid var(--g2);border-radius:16px;padding:12px 16px;color:#7A5E24;} .l3-warn p{margin:0;font-size:14.5px;font-weight:700;line-height:1.9;} body.dark-mode #hh-learn .l3-warn{color:var(--g2);}",
".l3-ck{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;align-items:start;} .l3-ck section{background:var(--card);border:1px solid var(--ln);border-radius:20px;padding:14px 16px;}",
".l3-ck h3{margin:0 0 6px;display:flex;gap:8px;align-items:center;font-size:16px;color:var(--hd);} .l3-ck h3 i{width:30px;height:30px;border-radius:9px;background:var(--t1);color:var(--t);display:grid;place-items:center;}",
".l3-ck .r{display:flex;gap:10px;align-items:center;padding:8px 0;border-top:1px dashed var(--soft);} .l3-ck .r>span:first-child{flex:1;font-size:14.5px;font-weight:700;line-height:1.8;color:var(--ink);}",
".l3-ck .sg{display:flex;background:var(--soft);border-radius:11px;padding:3px;flex-shrink:0;} .l3-ck .sg button{all:unset;cursor:pointer;padding:5px 9px;border-radius:8px;font-size:12.5px;font-weight:900;color:var(--mu);} .l3-ck .sg button:focus-visible{outline:2px solid var(--g);}",
".l3-ck .sg button.on{background:var(--card);box-shadow:0 2px 6px rgba(0,0,0,.08);} .l3-ck .sg button.v0{color:#2F8F5B;} .l3-ck .sg button.v1{color:#B07A1E;} .l3-ck .sg button.v2{color:#C0612B;}",
".l3-cr{margin-top:14px;background:var(--card);border:1.5px solid var(--t2);border-radius:22px;padding:18px;} .l3-cr h3{margin:0 0 12px;display:flex;gap:8px;align-items:center;font-size:18px;color:var(--hd);}",
".l3-cr .bars{display:grid;gap:8px;} .l3-cr .bars div{display:grid;grid-template-columns:180px 1fr 60px;gap:10px;align-items:center;font-size:13.5px;font-weight:800;color:var(--ink);} .l3-cr .bars i{height:10px;border-radius:10px;background:var(--soft);overflow:hidden;} .l3-cr .bars em{display:block;height:100%;border-radius:10px;background:var(--h);} .l3-cr .bars b{font-size:12px;color:var(--mu);}",
".l3-cr .msg{margin-top:14px;border-radius:16px;padding:14px 16px;} .l3-cr .msg.l0{background:#EAF6EF;} .l3-cr .msg.l1{background:#FCF3E1;} .l3-cr .msg.l2{background:#FCEBE1;} .l3-cr .msg b{font-size:16px;color:var(--hd);} .l3-cr .msg p{margin:4px 0 0;font-size:15px;font-weight:700;line-height:1.95;color:var(--ink);}",
"body.dark-mode #hh-learn .l3-cr .msg.l0{background:#1E3027;} body.dark-mode #hh-learn .l3-cr .msg.l1{background:#33291A;} body.dark-mode #hh-learn .l3-cr .msg.l2{background:#3A251B;}",
".l3-cr .bt{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;} .l3-cr .nt,.l3-pl .nt{margin:10px 0 0;font-size:13.5px;font-weight:800;color:var(--mu);}",
".l3-pl{background:var(--card);border:1.5px solid var(--t2);border-radius:22px;padding:16px 18px;margin-bottom:18px;} .l3-pl h3{margin:0 0 8px;display:flex;gap:8px;align-items:center;font-size:18px;color:var(--hd);}",
".l3-pl .r{display:grid;grid-template-columns:auto minmax(0,1.1fr) minmax(0,1.4fr) 150px auto;gap:10px;align-items:end;padding:10px 0;border-top:1px dashed var(--soft);}",
".l3-pl .r>i{width:30px;height:30px;border-radius:9px;background:var(--t);color:#fff;display:grid;place-items:center;font-style:normal;font-weight:900;font-size:13px;align-self:center;} .l3-pl .t b{display:block;font-size:15px;line-height:1.6;color:var(--hd);} .l3-pl .t small{font-size:12px;font-weight:800;color:var(--t);}",
".l3-pl label{display:grid;gap:4px;font-size:12px;font-weight:900;color:var(--mu);} .l3-pl input,.l3-pl select{font:inherit;font-size:14px;font-weight:700;border:1.5px solid var(--ln);border-radius:11px;padding:8px 10px;background:var(--bg);color:var(--ink);width:100%;box-sizing:border-box;} .l3-pl input:focus,.l3-pl select:focus{outline:3px solid rgba(184,146,74,.3);border-color:var(--g);}",
".l3-pl .bt{margin-top:12px;} .l3-pl .pv{margin:10px 0 0;display:flex;gap:6px;align-items:center;font-size:12.5px;font-weight:800;color:var(--mu);}",
".l3-two{display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start;} .l3-two .l2-h3{margin-top:0;}",
".l3-cmp td small{display:block;font-size:12px;font-weight:700;color:var(--mu);margin-top:2px;} .l3-cmp td{vertical-align:top;line-height:1.8;}",
".l3-scs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:14px;} .l3-scs button{all:unset;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;gap:6px;background:var(--card);border:1.5px solid var(--ln);border-top:5px solid var(--k);border-radius:20px;padding:16px;transition:transform .2s;}",
".l3-scs button:hover{transform:translateY(-3px);} .l3-scs button:focus-visible{outline:3px solid var(--g);} .l3-scs .gaza2010,.l3-sh.gaza2010{--k:var(--gz);} .l3-scs .jeddah,.l3-sh.jeddah{--k:var(--jd);} .l3-scs .syria,.l3-sh.syria{--k:var(--sy);}",
".l3-scs em{font-style:normal;font-size:12px;font-weight:900;color:var(--k);} .l3-scs b{font-size:16px;line-height:1.7;color:var(--hd);} .l3-scs small{font-size:12.5px;font-weight:700;color:var(--mu);line-height:1.7;} .l3-scs .go{margin-top:auto;display:inline-flex;gap:6px;align-items:center;font-size:13px;font-weight:900;color:var(--k);}",
".l3-sh{background:var(--card);border:1px solid var(--ln);border-top:6px solid var(--k);border-radius:24px;padding:22px 24px;} .l3-sh em{font-style:normal;font-size:12.5px;font-weight:900;color:var(--k);} .l3-sh h1{margin:6px 0;font-family:\"Reem Kufi\",Cairo;font-size:28px;line-height:1.5;color:var(--hd);} .l3-sh p{margin:0;font-size:14px;font-weight:800;color:var(--mu);}",
".l3-sg{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:12px;} .l3-sg div{background:var(--soft);border-radius:18px;padding:14px;} .l3-sg small{display:flex;gap:6px;align-items:center;font-size:12.5px;font-weight:900;color:var(--t);} .l3-sg p{margin:6px 0 0;font-size:14.5px;font-weight:700;line-height:1.9;color:var(--ink);} .l3-sg p span{font-size:13px;color:var(--mu);}",
".l3-rs,.l3-rc{margin:0;padding:0;list-style:none;display:grid;gap:8px;counter-reset:r;} .l3-rs li,.l3-rc li{position:relative;background:var(--card);border:1px solid var(--ln);border-radius:14px;padding:12px 16px 12px 16px;padding-inline-start:48px;font-size:15.5px;font-weight:700;line-height:2;color:var(--ink);counter-increment:r;}",
".l3-rs li::before,.l3-rc li::before{content:counter(r);position:absolute;inset-inline-start:12px;top:12px;width:26px;height:26px;border-radius:8px;background:var(--t1);color:var(--t);display:grid;place-items:center;font-size:12.5px;font-weight:900;} .l3-rc li::before{background:var(--g1);color:var(--g);}",
".l2-wrap.big .l3-rs li,.l2-wrap.big .l3-rc li,.l2-wrap.big .l3-ev p{font-size:22px;} .l2-wrap.big .l3-sg p{font-size:19px;}",
".l3c .cr{border-color:#B4592A !important;} .l3c h1{color:#9A4A1C !important;} .l3c .sl{color:#E39A5B !important;} .l3c .in{background:radial-gradient(70% 60% at 50% 40%,#FDEBD8,transparent) !important;}",
".l3d .dh{background:linear-gradient(135deg,#C0612B,#8A3B12) !important;} .l3d .g i{background:#C0612B !important;}",
"@media (prefers-reduced-motion:reduce){ .l3-sun .orb,.l3-sun .rays{animation:none;} }",
"@media (max-width:1100px){ .l3-map{grid-template-columns:repeat(4,minmax(0,1fr)) !important;} .l3-tri{grid-template-columns:repeat(3,minmax(0,1fr)) !important;} .l3-srcs .g,.l3-nums{grid-template-columns:repeat(2,minmax(0,1fr));} .l3-sg{grid-template-columns:repeat(2,minmax(0,1fr));} .l3-pl .r{grid-template-columns:auto minmax(0,1fr) auto;} .l3-pl .r .st,.l3-pl .r .wh{grid-column:2/3;} }",
"@media (max-width:760px){ .l3-sun{max-width:280px;} .l3-map,.l3-tri{grid-template-columns:repeat(2,minmax(0,1fr)) !important;} .l3-srcs .g,.l3-nums,.l3-ev,.l3-ck,.l3-two,.l3-scs,.l3-sg{grid-template-columns:minmax(0,1fr);} .l3-nums.in{grid-template-columns:minmax(0,1fr);}",
"  #hh-learn.ln3 .l2-chbar button:not(.on) span{display:none;} #hh-learn.ln3 .l2-chbar button.on{grid-column:span 2;} .l3-ck .r{flex-wrap:wrap;} .l3-ck .r>span:first-child{flex-basis:100%;} .l3-cr .bars div{grid-template-columns:110px 1fr;} .l3-cr .bars b{display:none;} .l3-stg .s{grid-template-columns:1fr;} .l3-stg .ad{justify-self:start;margin:0 8px 6px;} .l3-sh h1{font-size:22px;} .l3-hero .sb{font-size:18px !important;} }"
].join('\n');
})();
