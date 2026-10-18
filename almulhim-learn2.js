/* ============================================================
   المُلهم التعليمي، «تعلّم»: البرنامج الثاني (zzzzzzcw)
   «التفكير بالنظرية أم التفكير بالنموذج؟» د. نايف بن نهار
   خريطة الحجة، القراءة التفاعلية، مختبر المحلل، المصطلحات، الاختبارات
   ============================================================ */
(function(){
'use strict';
if(window._hhLearn2) return; window._hhLearn2=true;
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function $(id){ return document.getElementById(id); }
function toastX(m,k){ try{ if(typeof toast==='function') toast(m,k||'info'); }catch(e){} }
function me(){ try{ return (typeof currentUser!=='undefined'&&currentUser)||(window.firebase&&firebase.auth&&firebase.auth().currentUser)||null; }catch(e){ return null; } }
function B(){ return (window.HH_LEARN||{}).nmodel; }
function seed(s){ var h=2166136261; s=String(s); for(var i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); } return function(){ h^=h<<13; h^=h>>>17; h^=h<<5; return ((h>>>0)%100000)/100000; }; }
function shuf(a,key){ var r=seed(key==null?Math.random():key), b=a.slice(); for(var i=b.length-1;i>0;i--){ var j=Math.floor(r()*(i+1)); var t=b[i]; b[i]=b[j]; b[j]=t; } return b; }
var P={book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h7M8 11h5"/>',play:'<path d="M7 4l13 8-13 8z" fill="currentColor" stroke="none"/>',flag:'<path d="M5 21V4h11l-2 4 2 4H5"/>',x:'<path d="M18 6L6 18M6 6l12 12"/>',
 next:'<path d="M15 5l-7 7 7 7"/>',back:'<path d="M9 5l7 7-7 7"/>',eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
 lens:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',scale:'<path d="M12 3v18M5 21h14M6 7h12M6 7l-3 7a3 3 0 0 0 6 0zM18 7l-3 7a3 3 0 0 0 6 0z"/>',
 cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',bulb:'<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/>',
 check:'<path d="M20 6 9 17l-5-5"/>',q:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4M12 17h.01"/>',quote:'<path d="M6 17h4l2-4V7H6v6h3zM14 17h4l2-4V7h-6v6h3z" fill="currentColor" stroke="none"/>',
 tag:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',grid:'<rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/>',
 link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',tv:'<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',
 phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',cap:'<path d="M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6"/>',full:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',badge:'<circle cx="12" cy="9" r="5"/><path d="M9 13l-1 8 4-2 4 2-1-8"/>',print:'<path d="M6 9V3h12v6M6 18H4v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6h-2M8 14h8v7H8z"/>',
 refresh:'<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',star:'<path d="M12 3l2.8 5.9 6.2.9-4.5 4.4 1 6.3L12 17.6 6.5 20.5l1-6.3L3 9.8l6.2-.9z" fill="currentColor" stroke="none"/>'};
function sv(k,s,w){ return '<svg width="'+(s||18)+'" height="'+(s||18)+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||1.9)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(P[k]||'')+'</svg>'; }
var CHI={intro:'eye',ch1:'user',ch2:'lens',ch3:'chart',ch4:'scale',ch5:'cpu',conclusion:'bulb'};
var CHS={intro:'المقدمة',ch1:'المبحث الأول',ch2:'المبحث الثاني',ch3:'المبحث الثالث',ch4:'المبحث الرابع',ch5:'المبحث الخامس',conclusion:'الخاتمة'};
function chName(c){ return String(c.t).replace(/^[^:]+:\s*/,''); }

/* الحالة */
var V={view:'home',ci:0,si:0,lab:0,st:0,a:{},mode:'self',gq:''};
var ST=null, _t=null;
function loadST(){ try{ ST=JSON.parse(localStorage.getItem('hh_learn_nmodel')||'null'); }catch(e){} ST=ST||{}; ['read','quiz','labs','act'].forEach(function(k){ if(!ST[k]) ST[k]={}; });
  var u=me(); if(u&&u.uid&&window.firebase&&firebase.firestore){ try{ firebase.firestore().collection('program_progress').doc(u.uid).get().then(function(d){ var r=d&&d.exists&&(d.data()||{}).learn_nmodel; if(r&&(r.t||0)>(ST.t||0)){ ST=r; ['read','quiz','labs','act'].forEach(function(k){ if(!ST[k]) ST[k]={}; }); render(); } }).catch(function(){}); }catch(e){} } }
function save(){ try{ if(window.hhLearnBoardPush){ var _b=B(), _p=0; _b.chapters.forEach(function(c){ if((ST.quiz[c.k]||0)>=70) _p++; }); hhLearnBoardPush('nmodel',_b.title,totalProg(),_p,_b.chapters.length,ST.quiz); } }catch(e){} ST.t=Date.now(); try{ localStorage.setItem('hh_learn_nmodel',JSON.stringify(ST)); }catch(e){} clearTimeout(_t); _t=setTimeout(function(){ var u=me(); if(!u||!u.uid||!window.firebase||!firebase.firestore) return; try{ firebase.firestore().collection('program_progress').doc(u.uid).set({learn_nmodel:ST},{merge:true}).catch(function(){}); }catch(e){} },1500); }
function chProg(ci){ var c=B().chapters[ci], n=c.sections.length+1, r=0; c.sections.forEach(function(_,i){ if(ST.read[c.k+'-'+i]) r++; }); if(ST.quiz[c.k]!=null) r++; return Math.round(r/n*100); }
function totalProg(){ var b=B(), s=0; b.chapters.forEach(function(_,i){ s+=chProg(i); }); var l=Object.keys(ST.labs).length/b.labs.length*100; return Math.round((s/b.chapters.length)*0.75+l*0.25); }

/* الفتح */
window.hhLn2Open=function(view,a){
  if(!$('hh-learn')){ if(typeof window.hhLearnOpen==='function') hhLearnOpen(); else return; }
  style(); loadST(); V.view=view||'home'; if(view==='ch') { V.ci=a||0; V.si=0; } render();
};
function host(){ return $('hh-learn'); }
function go(v,o){ V.view=v; V.a={}; V.st=0; if(o) Object.keys(o).forEach(function(k){ V[k]=o[k]; }); render(); var h=host(); if(h) h.scrollTop=0; }
window.hhLn2Go=function(v,a,b){ if(v==='ch') go('ch',{ci:a||0,si:b||0}); else if(v==='case') go('case',{lab:a||0}); else if(v==='quiz') startQuiz(a); else if(v==='pad'){ go('labs'); setTimeout(function(){ var p=$('ln2-pad'); if(p) p.scrollIntoView({behavior:'smooth',block:'start'}); },60); } else if(v==='vote'){ vtLoad(); go('vote'); } else if(v==='ladder'){ V.mode='screen'; go('ladder'); } else go(v); };
window.hhLn2Mode=function(m){ if(m==='live'){ liveDlg(); return; } V.mode=m; render(); };
function render(){
  var h=host(); if(!h||!B()) return;
  var stage=(V.mode==='screen'&&(V.view==='ch'||V.view==='case'||V.view==='quiz'))||V.view==='vote'||V.view==='ladder';
  h.className='ln ln2'+(stage?' ln2-stg':'');
  document.body.classList.toggle('ln-stage',stage);
  h.innerHTML=V.view==='ch'?vCh():V.view==='labs'?vLabs():V.view==='case'?vCase():V.view==='gloss'?vGloss():V.view==='quiz'?vQuiz():V.view==='cert'?vCert():V.view==='vote'?vVote():V.view==='ladder'?vLadder():vHome();
  if(V.view==='ch') markRead();
  var q=$('ln2-gq'); if(q){ q.oninput=function(){ V.gq=q.value; var L=$('ln2-gl'); if(L) L.innerHTML=glossList(); }; }
}
function crumbs(L){ return '<nav class="l2-cr">'+L.map(function(x,i){ return i<L.length-1?'<button type="button" onclick="'+x[1]+'">'+esc(x[0])+'</button><span>›</span>':'<b>'+esc(x[0])+'</b>'; }).join('')+'</nav>'; }
function modeSeg(){ return '<div class="l2-mode" role="group" aria-label="طريقة العرض">'+[['self','cap','أتعلّم بنفسي'],['screen','tv','أعرض على الصف'],['live','phone','مع دخول الطلاب']].map(function(m){ return '<button type="button" class="'+(V.mode===m[0]?'on':'')+'" onclick="hhLn2Mode(\''+m[0]+'\')">'+sv(m[1],15)+m[2]+'</button>'; }).join('')+'</div>'; }

/* ═══ الصفحة الرئيسية للبرنامج ═══ */
function vHome(){
  var b=B(), pc=totalProg(), ex=0, nq=0; b.chapters.forEach(function(c){ ex+=(c.examples||[]).length; nq+=(c.quiz||[]).length; });
  var nextCi=0; for(var i=0;i<b.chapters.length;i++){ if(chProg(i)<100){ nextCi=i; break; } }
  return '<div class="l2-wrap">'+crumbs([['تعلّم',"hhLnGo('home')"],[b.title]])
   +'<div class="l2-hero"><div class="wm">التفكير بالنموذج</div><div class="tx"><small>'+sv('book',14)+'البرنامج الثاني في «تعلّم»، دراسة في التحليل السياسي</small>'
   +'<h1>التفكير بالنظرية<br>أم <span>التفكير بالنموذج؟</span></h1><p>'+esc(b.lead)+'</p>'
   +'<div class="by"><i>ن</i><span><b>'+esc(b.author)+'</b><span>إصدار '+esc(b.pub)+'</span></span></div>'
   +'<div class="st"><span><b>'+(b.chapters.length-2)+'</b>مباحث</span><span><b>'+b.labs.length+'</b>حالة في المختبر</span><span><b>'+ex+'</b>شاهداً من الواقع</span><span><b>'+b.concepts.length+'</b>مصطلحاً</span></div>'
   +'<div class="bt"><button type="button" class="l2-b p" onclick="hhLn2Go(\'ch\','+nextCi+')">'+sv('play',15)+(pc?'تابع الرحلة':'ابدأ الرحلة')+'</button><button type="button" class="l2-b" onclick="hhLn2Go(\'labs\')">'+sv('flag',16)+'مختبر المحلل</button><button type="button" class="l2-b" onclick="hhLn2Go(\'gloss\')">'+sv('tag',16)+'المصطلحات</button></div></div>'
   +'<div class="q3"><div class="c"></div><div class="n" style="--k:#B8924A;top:0;left:50%;transform:translateX(-50%)"><span>الإرادة<small>ماذا يريد؟</small></span></div><div class="n" style="--k:#1F6F7A;bottom:6%;right:0"><span>القدرة<small>هل يستطيع؟</small></span></div><div class="n" style="--k:#A3354F;bottom:6%;left:0"><span>الطريقة<small>كيف سيفعل؟</small></span></div><div class="core">صانع<br>القرار</div></div></div>'
   +'<div class="l2-au"><span class="ic">'+sv('user',22)+'</span><div><b>عن المؤلف</b><p>'+esc(b.bio)+'</p></div><div class="pr"><div class="ring" style="--p:'+pc+'"><b>'+pc+'%</b></div><small>تقدمك</small></div></div>'
   +ladderSec()
   +'<div class="l2-tri"><button type="button" onclick="hhLn2Go(\'labs\')"><i>'+sv('flag',22)+'</i><b>مختبر المحلل</b><small>'+b.labs.length+' حالة من الكتاب: تنبّأ بعدسة النظرية، ثم بعدسة النموذج، ثم اقرأ رأي المؤلف</small><span>'+Object.keys(ST.labs).length+' من '+b.labs.length+'</span></button>'
   +'<button type="button" onclick="hhLn2Go(\'gloss\')"><i>'+sv('tag',22)+'</i><b>معجم المصطلحات</b><small>'+b.concepts.length+' مصطلحاً بتعريف المؤلف، مع البحث والبطاقات</small><span>ابحث</span></button>'
   +'<button type="button" onclick="hhLn2Go(\'cert\')"><i>'+sv('badge',22)+'</i><b>شهادة الإتمام</b><small>بعد اجتياز اختبارات المحطات السبع بنسبة 70% فأكثر</small><span>'+Object.keys(ST.quiz).filter(function(k){ return ST.quiz[k]>=70; }).length+' من '+b.chapters.length+'</span></button></div>'
   +'<p class="l2-src">المصدر: كتاب «'+esc(b.title)+'»، تأليف '+esc(b.author)+'، '+esc(b.pub)+'. النصوص منقولة بحرفها من الكتاب، وفيه '+(b.refs_detail?b.refs_detail.ar+' مصدراً عربياً و'+b.refs_detail.en+' مصدراً إنجليزياً':b.refs_count+' مصدراً')+'.</p></div>';
}

/* ═══ القراءة ═══ */
function markRead(){ var c=B().chapters[V.ci]; if(V.si<c.sections.length){ var k=c.k+'-'+V.si; ST.last={ci:V.ci,si:V.si}; if(!ST.read[k]){ ST.read[k]=1; } save(); } }
function hl(p,key){ var t=esc(p); if(key){ var k=esc(key); var i=t.indexOf(k); if(i>-1) t=t.slice(0,i)+'<mark>'+k+'</mark>'+t.slice(i+k.length); } return t; }
function tbl(T){ return '<div class="l2-tbl"><table><thead><tr>'+T.head.map(function(h){ return '<th>'+esc(h)+'</th>'; }).join('')+'</tr></thead><tbody>'+T.rows.map(function(r){ return '<tr>'+r.map(function(x,i){ return '<td'+(i===0?' class="k"':'')+'>'+esc(x)+'</td>'; }).join('')+'</tr>'; }).join('')+'</tbody></table></div>'; }
function chLabs(c){ var n=CHS[c.k]; return B().labs.map(function(l,i){ return [l,i]; }).filter(function(x){ return x[0].ch===n; }); }
function vCh(){
  var b=B(), c=b.chapters[V.ci], S=c.sections, endp=V.si>=S.length, scr=V.mode==='screen';
  var toc='<aside class="l2-toc"><h5>'+CHS[c.k]+'</h5>'+S.map(function(s,i){ return '<button type="button" class="'+(i===V.si?'on':'')+(ST.read[c.k+'-'+i]?' dn':'')+'" onclick="hhLn2Sec('+i+')"><i>'+(ST.read[c.k+'-'+i]&&i!==V.si?sv('check',12,3):i+1)+'</i>'+esc(s.t)+'</button>'; }).join('')
    +'<button type="button" class="'+(endp?'on':'')+(ST.quiz[c.k]!=null?' dn':'')+'" onclick="hhLn2Sec('+S.length+')"><i>'+sv('q',13)+'</i>شواهد ونشاطات واختبار</button></aside>';
  var body;
  if(!endp){ var s=S[V.si];
    body='<article class="l2-pg"><span class="ch">'+esc(c.t)+'</span><h2>'+esc(s.t)+'</h2>'
     +(V.si===0?'<p class="l2-cq">'+sv('q',16)+esc(c.q)+'</p>':'')
     +(s.key?'<blockquote class="l2-key">'+esc(s.key)+'<small>من الكتاب</small></blockquote>':'')
     +(s.p||[]).map(function(p){ return '<p class="l2-p">'+hl(p,s.key)+'</p>'; }).join('')
     +(s.items&&s.items.length?'<div class="l2-items">'+s.items.map(function(it,i){ var o=V.a['it'+i]; return '<button type="button" class="it'+(o?' op':'')+'" onclick="hhLn2It('+i+')"><span class="h"><i>'+(i+1)+'</i><b>'+esc(it.h)+'</b><em>'+sv(o?'x':'eye',14)+'</em></span>'+(o?'<span class="x">'+esc(it.x)+'</span>':'')+'</button>'; }).join('')+'</div>'+(s.items.length>1?'<button type="button" class="l2-all" onclick="hhLn2ItAll('+s.items.length+')">'+sv('eye',14)+'اعرض الكل</button>':''):'')
     +(s.table?tbl(s.table):'')+'</article>';
  } else body=chEnd(c);
  var nav='<div class="l2-nav"><button type="button" class="l2-b" onclick="hhLn2Sec('+(V.si-1)+')" '+(V.si===0&&V.ci===0?'disabled':'')+'>'+sv('back',15,2.4)+'السابق</button><span>'+(endp?'الشواهد والاختبار':(V.si+1)+' من '+S.length)+'</span>'
    +(endp?(V.ci<b.chapters.length-1?'<button type="button" class="l2-b p" onclick="hhLn2Go(\'ch\','+(V.ci+1)+')">'+esc(CHS[b.chapters[V.ci+1].k])+sv('next',15,2.4)+'</button>':'<button type="button" class="l2-b p" onclick="hhLn2Go(\'cert\')">شهادة الإتمام'+sv('next',15,2.4)+'</button>'):'<button type="button" class="l2-b p" onclick="hhLn2Sec('+(V.si+1)+')">التالي'+sv('next',15,2.4)+'</button>')+'</div>';
  var head=scr?'<div class="l2-stg"><button type="button" class="l2-ib" onclick="hhLn2Mode(\'self\')" aria-label="خروج">'+sv('x',18,2.4)+'</button><b>'+esc(c.t)+'</b><button type="button" class="l2-ib" onclick="hhLn2Full()" aria-label="ملء الشاشة">'+sv('full',18)+'</button></div>':crumbs([['تعلّم',"hhLnGo('home')"],[b.title,"hhLn2Go('home')"],[CHS[c.k]]]);
  return '<div class="l2-wrap'+(scr?' big':'')+'">'+head+'<div class="l2-chbar">'+b.chapters.map(function(x,i){ return '<button type="button" class="'+(i===V.ci?'on':'')+(chProg(i)>=100?' dn':'')+'" onclick="hhLn2Go(\'ch\','+i+')" title="'+esc(chName(x))+'"><i><s style="width:'+chProg(i)+'%"></s></i><span>'+CHS[x.k]+'</span></button>'; }).join('')+'</div>'
   +'<div class="l2-rd">'+(scr?'':toc)+'<div class="l2-main">'+body+nav+'</div></div></div>';
}
window.hhLn2Sec=function(i){ var c=B().chapters[V.ci]; if(i<0){ if(V.ci>0){ var p=B().chapters[V.ci-1]; go('ch',{ci:V.ci-1,si:p.sections.length}); } return; } V.si=Math.min(i,c.sections.length); V.a={}; render(); var h=host(); if(h) h.scrollTop=0; };
window.hhLn2It=function(i){ V.a['it'+i]=!V.a['it'+i]; render(); };
window.hhLn2ItAll=function(n){ for(var i=0;i<n;i++) V.a['it'+i]=1; render(); };
window.hhLn2Full=function(){ try{ if(document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen(); }catch(e){} };
function chEnd(c){
  var ex=c.examples||[], qu=c.quotes||[], labs=chLabs(c), best=ST.quiz[c.k];
  return '<article class="l2-pg end"><span class="ch">'+esc(c.t)+'</span><h2>شواهد ونشاطات واختبار</h2>'
   +(ex.length?'<h3 class="l2-h3">'+sv('flag',17)+'شواهد من الواقع <em>'+ex.length+'</em></h3><div class="l2-ex">'+ex.map(function(e,i){ var o=V.a['ex'+i]; return '<button type="button" class="'+(o?'op':'')+'" onclick="hhLn2Ex('+i+')"><b>'+esc(e.who)+'</b>'+(o?'<span>'+esc(e.x)+'</span><small>صفحة '+e.pg+'</small>':'<small>'+sv('eye',13)+'اقرأ الشاهد</small>')+'</button>'; }).join('')+'</div>':'')
   +(qu.length?'<h3 class="l2-h3">'+sv('quote',16)+'قالوا <em>'+qu.length+'</em></h3><div class="l2-qu">'+qu.map(function(q){ return '<figure><blockquote>«'+esc(q.x)+'»</blockquote><figcaption>'+esc(q.by)+'</figcaption></figure>'; }).join('')+'</div>':'')
   +(c.sort?actSort(c):'')+(c.match?actMatch(c):'')
   +(labs.length?'<h3 class="l2-h3">'+sv('flag',17)+'حالات هذا المبحث في المختبر <em>'+labs.length+'</em></h3><div class="l2-lk">'+labs.map(function(x){ return '<button type="button" onclick="hhLn2Go(\'case\','+x[1]+')">'+(ST.labs[x[0].id]?sv('check',14,3):sv('flag',14))+esc(x[0].title)+'</button>'; }).join('')+'</div>':'')
   +(c.quiz&&c.quiz.length?'<div class="l2-qz"><div><b>'+sv('badge',18)+'اختبار '+esc(CHS[c.k])+'</b><small>'+c.quiz.length+' أسئلة من نص الكتاب'+(best!=null?'، أفضل نتيجة '+best+'%':'')+'</small></div><button type="button" class="l2-b p" onclick="hhLn2Go(\'quiz\','+V.ci+')">'+(best!=null?'أعد الاختبار':'ابدأ الاختبار')+'</button></div>':'')+'</article>';
}
window.hhLn2Ex=function(i){ V.a['ex'+i]=!V.a['ex'+i]; render(); };
/* نشاط التصنيف */
function actSort(c){ var A=c.sort, st=V.a.sort||(V.a.sort={put:{},cur:null}), ord=shuf(A.items.map(function(_,i){ return i; }),'s'+c.k), free=ord.filter(function(i){ return st.put[i]==null; });
  return '<div class="l2-act"><h3>'+sv('grid',17)+esc(A.t)+'</h3><p>'+esc(A.s)+' اختر العبارة، ثم اضغط مكانها.</p><div class="pool">'+free.map(function(i){ return '<button type="button" class="ch'+(st.cur===i?' cur':'')+'" onclick="hhLn2SSel('+i+')">'+esc(A.items[i][0])+'</button>'; }).join('')+(free.length?'':'<span class="dn">'+sv('check',14,3)+'وُزّعت كل العبارات</span>')+'</div>'
   +'<div class="bins" style="--n:'+A.bins.length+'">'+A.bins.map(function(b,bi){ return '<div class="bin" role="button" tabindex="0" onclick="hhLn2SBin('+bi+')"><h4>'+esc(b)+'</h4>'+ord.filter(function(i){ return st.put[i]===bi; }).map(function(i){ var k=st.ok!=null?(A.items[i][1]===bi?' ok':' no'):''; return '<button type="button" class="ch in'+k+'" onclick="event.stopPropagation();hhLn2SOut('+i+')">'+esc(A.items[i][0])+'</button>'; }).join('')+'</div>'; }).join('')+'</div>'
   +(st.ok!=null?'<div class="res '+(st.ok?'ok':'no')+'">'+(st.ok?'أحسنت، كل عبارة في مكانها كما صنّفها المؤلف':'بعض العبارات في غير مكانها، أعد المحاولة')+(st.ok?'':'<button type="button" class="l2-b" onclick="hhLn2SReset()">أعد</button>')+'</div>':'')+'</div>'; }
window.hhLn2SSel=function(i){ var st=V.a.sort; st.cur=st.cur===i?null:i; render(); };
window.hhLn2SBin=function(b){ var st=V.a.sort; if(!st||st.cur==null||st.ok) return; st.put[st.cur]=b; st.cur=null; var A=B().chapters[V.ci].sort; if(Object.keys(st.put).length===A.items.length){ st.ok=A.items.every(function(x,i){ return st.put[i]===x[1]; }); if(st.ok){ ST.act[B().chapters[V.ci].k+'-s']=1; save(); } } render(); };
window.hhLn2SOut=function(i){ var st=V.a.sort; if(st.ok) return; delete st.put[i]; st.ok=null; render(); };
window.hhLn2SReset=function(){ V.a.sort=null; render(); };
/* نشاط التوصيل */
function actMatch(c){ var A=c.match, st=V.a.mt||(V.a.mt={m:{},cur:null}), R=shuf(A.pairs.map(function(_,i){ return i; }),'m'+c.k), rev={}, col=['#1F6F7A','#B8924A','#A3354F','#5B6FA8','#2F8F5B'];
  Object.keys(st.m).forEach(function(l){ rev[st.m[l]]=+l; });
  return '<div class="l2-act"><h3>'+sv('link',17)+esc(A.t)+'</h3><p>'+esc(A.s)+' اضغط عنصراً من اليمين، ثم ما يقابله من اليسار.</p><div class="mt"><div class="cl"><h5>'+esc(A.l)+'</h5>'+A.pairs.map(function(p,i){ var m=st.m[i], k=st.ok!=null&&m!=null?(m===i?' ok':' no'):''; return '<button type="button" class="mi'+(m!=null?' f':'')+k+(st.cur===i?' cur':'')+'" style="'+(m!=null?'--k:'+col[i%5]:'')+'" onclick="hhLn2ML('+i+')">'+esc(p[0])+'</button>'; }).join('')+'</div>'
   +'<div class="cl"><h5>'+esc(A.r)+'</h5>'+R.map(function(j){ var l=rev[j], k=st.ok!=null&&l!=null?(l===j?' ok':' no'):''; return '<button type="button" class="mi'+(l!=null?' f':'')+k+'" style="'+(l!=null?'--k:'+col[l%5]:'')+'" onclick="hhLn2MR('+j+')">'+esc(A.pairs[j][1])+'</button>'; }).join('')+'</div></div>'
   +(st.ok!=null?'<div class="res '+(st.ok?'ok':'no')+'">'+(st.ok?'ممتاز، كل التوصيلات صحيحة':'بعض التوصيلات غير صحيحة')+(st.ok?'':'<button type="button" class="l2-b" onclick="hhLn2MReset()">أعد</button>')+'</div>':'')+'</div>'; }
window.hhLn2ML=function(i){ var st=V.a.mt; if(st.ok) return; if(st.m[i]!=null){ delete st.m[i]; st.ok=null; } st.cur=st.cur===i?null:i; render(); };
window.hhLn2MR=function(j){ var st=V.a.mt; if(st.ok) return; Object.keys(st.m).forEach(function(l){ if(st.m[l]===j) delete st.m[l]; }); if(st.cur!=null){ st.m[st.cur]=j; st.cur=null; } st.ok=null; var A=B().chapters[V.ci].match; if(Object.keys(st.m).length===A.pairs.length){ st.ok=A.pairs.every(function(_,i){ return st.m[i]===i; }); if(st.ok){ ST.act[B().chapters[V.ci].k+'-m']=1; save(); } } render(); };
window.hhLn2MReset=function(){ V.a.mt=null; render(); };

/* ═══ الاختبار ═══ */
function startQuiz(ci){ var c=B().chapters[ci]; V.ci=ci; V.qz={idx:shuf(c.quiz.map(function(_,i){ return i; })),i:0,ok:0,ch:null,ord:null}; go('quiz',{ci:ci,qz:V.qz}); }
function vQuiz(){
  var c=B().chapters[V.ci], Q=V.qz, scr=V.mode==='screen';
  if(Q.i>=Q.idx.length){ var pc=Math.round(Q.ok/Q.idx.length*100); if(!Q.sv){ Q.sv=1; if(pc>(ST.quiz[c.k]||-1)) ST.quiz[c.k]=pc; save(); }
    return '<div class="l2-wrap'+(scr?' big':'')+'"><div class="l2-res"><div class="ring big" style="--p:'+pc+'"><b>'+pc+'%</b></div><h2>'+(pc>=70?'أحسنت! أتممت '+esc(CHS[c.k]):'قاربت، راجع المبحث وحاول مرة أخرى')+'</h2><p>'+Q.ok+' من '+Q.idx.length+' إجابات صحيحة</p><div class="bt">'
     +(V.ci<B().chapters.length-1?'<button type="button" class="l2-b p" onclick="hhLn2Go(\'ch\','+(V.ci+1)+')">'+esc(CHS[B().chapters[V.ci+1].k])+sv('next',15,2.4)+'</button>':'<button type="button" class="l2-b p" onclick="hhLn2Go(\'cert\')">شهادة الإتمام</button>')+'<button type="button" class="l2-b" onclick="hhLn2Go(\'quiz\','+V.ci+')">'+sv('refresh',15)+'أعد الاختبار</button><button type="button" class="l2-b" onclick="hhLn2Go(\'ch\','+V.ci+')">ارجع إلى المبحث</button></div></div></div>'; }
  var q=c.quiz[Q.idx[Q.i]]; if(!Q.ord) Q.ord=shuf(q.o.map(function(_,i){ return i; }));
  return '<div class="l2-wrap'+(scr?' big':'')+'"><div class="l2-qh"><button type="button" class="l2-ib" onclick="hhLn2Go(\'ch\','+V.ci+')" aria-label="خروج">'+sv('x',18,2.4)+'</button><b>اختبار '+esc(CHS[c.k])+'</b><span>'+(Q.i+1)+' من '+Q.idx.length+'</span></div><div class="l2-qbar"><i style="width:'+Math.round(Q.i/Q.idx.length*100)+'%"></i></div>'
   +'<div class="l2-qq"><h2>'+esc(q.q)+'</h2><div class="l2-opts">'+Q.ord.map(function(i,j){ var k=Q.ch==null?'':i===0?' ok':i===Q.ch?' no':' off'; return '<button type="button" class="op'+k+'" onclick="hhLn2Q('+i+')" '+(Q.ch!=null?'disabled':'')+'><span class="l">'+['أ','ب','ج','د'][j]+'</span><span>'+esc(q.o[i])+'</span></button>'; }).join('')+'</div>'
   +(Q.ch!=null?(q.why?'<div class="l2-why" role="note"><b>لماذا؟</b>«'+esc(q.why)+'»'+(q.pg?'<small>صفحة '+esc(q.pg)+'</small>':'')+'</div>':'')+'<div class="l2-nav"><span>'+(Q.ch===0?'إجابة صحيحة':'الإجابة الصحيحة هي المضيئة')+'</span><button type="button" class="l2-b p" onclick="hhLn2QN()">'+(Q.i+1<Q.idx.length?'التالي':'النتيجة')+sv('next',15,2.4)+'</button></div>':'')+'</div></div>';
}
window.hhLn2Q=function(i){ var Q=V.qz; if(!Q||Q.ch!=null||Q.i>=Q.idx.length) return; Q.ch=i; if(i===0) Q.ok++; render(); };
window.hhLn2QN=function(){ var Q=V.qz; if(!Q||Q.i>=Q.idx.length) return; Q.i++; Q.ch=null; Q.ord=null; render(); };

/* ═══ مختبر المحلل ═══ */
function vLabs(){
  var b=B();
  return '<div class="l2-wrap">'+crumbs([['تعلّم',"hhLnGo('home')"],[b.title,"hhLn2Go('home')"],['مختبر المحلل']])
   +'<div class="l2-lh"><span class="ic">'+sv('flag',30)+'</span><div><h1>مختبر المحلل</h1><p>'+b.labs.length+' حالة ضربها المؤلف في كتابه. في كل حالة: تقرأ الموقف، ثم ترى جواب النظرية الجاهز، ثم تفكّر بأسئلة النموذج: الإرادة والقدرة والطريقة، ثم تقرأ رأي المؤلف بنصه.</p></div><div class="r"><b>'+Object.keys(ST.labs).length+'/'+b.labs.length+'</b><small>حالة أنجزتها</small></div></div>'
   +'<div class="l2-tri l2-tri2"><button type="button" onclick="hhLn2Go(\'pad\')"><i>'+sv('cpu',22)+'</i><b>لوحة المحلل: طبّق النموذج بنفسك</b><small>اختر صانع قرار من الواقع، واملأ الإرادة والقدرة والطريقة، ثم احكم واطبع بطاقتك</small><span>افتح اللوحة</span></button>'+'<button type="button" onclick="hhLn2Go(\'vote\')"><i>'+sv('chart',22)+'</i><b>نظرية أم نموذج؟ تصويت الصف</b><small>اعرض حالة على الشاشة، واجمع أيدي الطلاب قبل رأي المؤلف وبعده</small><span>وضع العرض</span></button></div>'+'<div class="l2-cases">'+b.labs.map(function(l,i){ return '<button type="button" class="'+(ST.labs[l.id]?'dn':'')+'" onclick="hhLn2Go(\'case\','+i+')"><em>'+esc(l.ch)+'، صفحة '+l.pg+'</em><b>'+esc(l.title)+'</b><span class="tg">'+(l.theory?sv('book',13)+esc(l.theory.name):sv('cpu',13)+'النموذج مباشرة')+'</span>'+(ST.labs[l.id]?'<i class="ck">'+sv('check',13,3)+'</i>':'')+'</button>'; }).join('')+'</div>'+vPad()+'</div>';
}
var CSTEPS=['الموقف','عدسة النظرية','عدسة النموذج','رأي المؤلف'];
function vCase(){
  var b=B(), l=b.labs[V.lab], scr=V.mode==='screen', steps=l.theory?[0,1,2,3]:[0,2,3], k=steps[V.st]||0, last=V.st>=steps.length-1;
  var M=l.model||{}, pil=[['will','الإرادة','المبادئ، المصالح، الرغبات','#B8924A'],['ability','القدرة','الذاتية، الداخلية، الخارجية','#1F6F7A'],['approach','الطريقة','الصفرية أم التراكمية','#A3354F']];
  var allQ=[]; pil.forEach(function(p){ (M[p[0]]||[]).forEach(function(q,i){ allQ.push(p[0]+i); }); });
  var known=allQ.filter(function(x){ return V.a[x]===1; }).length;
  var body='';
  if(k===0) body='<div class="l2-scene"><span class="ic">'+sv('flag',28)+'</span><div><small>الحالة '+(V.lab+1)+' من '+b.labs.length+'، '+esc(l.ch)+'</small><h2>'+esc(l.title)+'</h2><p>'+esc(l.scene)+'</p></div></div>'
    +'<div class="l2-guess"><b>قبل أن تكمل: كيف ستجيب عن هذا السؤال؟</b><div><button type="button" class="'+(V.a.g===1?'on':'')+'" onclick="hhLn2G(1)">'+sv('book',16)+'أبحث عن نظرية تجيب عنه</button><button type="button" class="'+(V.a.g===2?'on':'')+'" onclick="hhLn2G(2)">'+sv('user',16)+'أدرس صانع القرار نفسه</button></div>'+(V.a.g?'<small>'+(V.a.g===1?'لنرَ ماذا تقول النظرية، ثم ماذا يقول النموذج.':'هذا ما يقترحه المؤلف، لكن لنرَ أولاً ماذا كانت ستقول النظرية.')+'</small>':'')+'</div>';
  else if(k===1){ var T=l.theory; body='<div class="l2-lens th"><h3>'+sv('book',18)+'عدسة النظرية: '+esc(T.name)+'</h3><p class="cl">«'+esc(T.claim)+'»</p><div class="ans"><small>جواب النظرية الجاهز</small><b>'+esc(T.answer)+'</b><span class="stamp">إجابة قبل السؤال</span></div><p class="ask">'+sv('q',15)+'هل يكفي هذا الجواب للحكم على صانع القرار في هذه الحالة؟</p></div>'; }
  else if(k===2) body='<div class="l2-lens md"><h3>'+sv('cpu',18)+'عدسة النموذج: ابدأ من صانع القرار نفسه</h3><p class="sub">هذه أسئلة النموذج في هذه الحالة كما يطرحها المؤلف. أمام كل سؤال: هل تعرف جوابه، أم يحتاج إلى بحث؟</p>'
    +pil.map(function(p){ var L=M[p[0]]||[]; return '<div class="pl" style="--k:'+p[3]+'"><div class="h"><b>'+p[1]+'</b><small>'+p[2]+'</small></div>'+(L.length?L.map(function(q,i){ var v=V.a[p[0]+i]; return '<div class="qq"><span>'+esc(q)+'</span><span class="sg"><button type="button" class="'+(v===1?'on':'')+'" onclick="hhLn2K(\''+p[0]+i+'\',1)">أعرف</button><button type="button" class="'+(v===2?'on':'')+'" onclick="hhLn2K(\''+p[0]+i+'\',2)">يحتاج بحثاً</button></span></div>'; }).join(''):'<p class="na">لم يتوقف المؤلف عند هذه الركيزة في هذه الحالة.</p>')+'</div>'; }).join('')
    +(allQ.length?'<div class="meter"><span>ما تعرفه عن صانع القرار</span><i><em style="width:'+Math.round(known/allQ.length*100)+'%"></em></i><b>'+known+' من '+allQ.length+'</b></div><p class="sub">كلما قلّ ما تعرفه، احتجت إلى دراسة الفاعل نفسه قبل أي حكم. وهذا هو معنى أن «النموذج يبدأ من السؤال».</p>':'')+'</div>';
  else body='<div class="l2-auth"><small>'+sv('quote',15)+'رأي المؤلف، صفحة '+l.pg+'</small><blockquote>'+esc(l.author)+'</blockquote><span>'+esc(b.author)+'</span></div>'
    +(l.theory?'<div class="l2-twin"><div><small>النظرية</small><b>'+esc(l.theory.answer)+'</b><em>تبدأ من الإجابة</em></div><div class="m"><small>النموذج</small><b>أسئلة عن الإرادة والقدرة والطريقة</b><em>يبدأ من السؤال</em></div></div>':'');
  if(k===3&&!ST.labs[l.id]){ ST.labs[l.id]=1; save(); }
  var head=scr?'<div class="l2-stg"><button type="button" class="l2-ib" onclick="hhLn2Mode(\'self\')" aria-label="خروج">'+sv('x',18,2.4)+'</button><b>مختبر المحلل</b><button type="button" class="l2-ib" onclick="hhLn2Full()" aria-label="ملء الشاشة">'+sv('full',18)+'</button></div>':crumbs([['تعلّم',"hhLnGo('home')"],[b.title,"hhLn2Go('home')"],['مختبر المحلل',"hhLn2Go('labs')"],['الحالة '+(V.lab+1)]]);
  return '<div class="l2-wrap'+(scr?' big':'')+'">'+head+'<div class="l2-cs">'+steps.map(function(s,i){ return '<button type="button" class="'+(i<V.st?'dn':i===V.st?'on':'')+'" onclick="hhLn2CS('+i+')"><i></i><span>'+CSTEPS[s]+'</span></button>'; }).join('')+'</div>'
   +'<div class="l2-cb">'+body+'</div><div class="l2-nav"><button type="button" class="l2-b" onclick="hhLn2CS('+(V.st-1)+')" '+(V.st===0?'disabled':'')+'>'+sv('back',15,2.4)+'السابق</button><span>'+CSTEPS[k]+'</span>'
   +(last?(V.lab<b.labs.length-1?'<button type="button" class="l2-b p" onclick="hhLn2Go(\'case\','+(V.lab+1)+')">الحالة التالية'+sv('next',15,2.4)+'</button>':'<button type="button" class="l2-b p" onclick="hhLn2Go(\'labs\')">كل الحالات</button>'):'<button type="button" class="l2-b p" onclick="hhLn2CS('+(V.st+1)+')">'+CSTEPS[steps[V.st+1]]+sv('next',15,2.4)+'</button>')+'</div></div>';
}
window.hhLn2CS=function(i){ if(i<0) return; V.st=i; render(); var h=host(); if(h) h.scrollTop=0; };
window.hhLn2G=function(v){ V.a.g=v; render(); };
window.hhLn2K=function(k,v){ V.a[k]=V.a[k]===v?0:v; render(); };

/* ═══ المصطلحات ═══ */
function norm(s){ return String(s||'').replace(/[ً-ْ]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي'); }
function glossList(){ var T=norm(V.gq||'').trim().split(/\s+/).filter(Boolean).map(function(w){ return w.replace(/^ال/,'').replace(/(ه|ات|ون|ين)$/,''); }).filter(function(w){ return w.length>1; }), L=B().concepts.filter(function(c){ var h=norm(c.term+' '+c.def+' '+(c.en||'')); return !T.length||T.every(function(w){ return h.indexOf(w)>-1; }); }); L.sort(function(a,b){ return (T.length&&norm(a.term).indexOf(T[0])>-1?0:1)-(T.length&&norm(b.term).indexOf(T[0])>-1?0:1); });
  return L.length?L.map(function(c){ return '<div class="gi"><b>'+esc(c.term)+(c.en?' <em dir="ltr">'+esc(c.en)+'</em>':'')+'</b><p>'+esc(c.def)+'</p></div>'; }).join(''):'<p class="l2-emp">لا مصطلح بهذا الاسم</p>'; }
function vGloss(){ var b=B();
  return '<div class="l2-wrap">'+crumbs([['تعلّم',"hhLnGo('home')"],[b.title,"hhLn2Go('home')"],['المصطلحات']])
   +'<div class="l2-lh"><span class="ic">'+sv('tag',30)+'</span><div><h1>معجم المصطلحات</h1><p>'+b.concepts.length+' مصطلحاً عرّفها المؤلف في كتابه، بنص تعريفه.</p></div></div>'
   +'<label class="l2-gs">'+sv('search',18)+'<input id="ln2-gq" type="search" placeholder="ابحث عن مصطلح أو كلمة في تعريفه" value="'+esc(V.gq||'')+'"></label><div class="l2-gl" id="ln2-gl">'+glossList()+'</div></div>'; }

/* ═══ الشهادة ═══ */
function vCert(){ var b=B(), pass=b.chapters.filter(function(c){ return (ST.quiz[c.k]||0)>=70; }).length, all=pass===b.chapters.length, u=me();
  if(!all) return '<div class="l2-wrap">'+crumbs([['تعلّم',"hhLnGo('home')"],[b.title,"hhLn2Go('home')"],['شهادة الإتمام']])+'<div class="l2-res"><div class="ring big" style="--p:'+Math.round(pass/b.chapters.length*100)+'"><b>'+pass+'/'+b.chapters.length+'</b></div><h2>تبقّى '+(b.chapters.length-pass)+' من اختبارات المحطات</h2><p>اجتز اختبار كل محطة بنسبة 70% فأكثر لتحصل على الشهادة.</p><div class="bt">'+b.chapters.map(function(c,i){ var s=ST.quiz[c.k]; return '<button type="button" class="l2-b'+(s>=70?' ok':'')+'" onclick="hhLn2Go(\'quiz\','+i+')">'+(s>=70?sv('check',14,3):'')+esc(CHS[c.k])+(s!=null?' '+s+'%':'')+'</button>'; }).join('')+'</div></div></div>';
  return '<div class="l2-wrap">'+crumbs([['تعلّم',"hhLnGo('home')"],[b.title,"hhLn2Go('home')"],['شهادة الإتمام']])
   +'<div class="ln-cert l2c" id="ln2-cert"><div class="in"><i class="cr tl"></i><i class="cr tr"></i><i class="cr bl"></i><i class="cr br"></i><small>منصة المُلهم التعليمي، برنامج «تعلّم»</small><h1>شهادة إتمام</h1><p>تشهد المنصة بأن</p><input id="ln2-cn" value="'+esc((u&&u.displayName)||'')+'" placeholder="اكتب الاسم" aria-label="الاسم"><p>أتمّ برنامج <b>«'+esc(b.title)+'»</b><br>تأليف '+esc(b.author)+'، واجتاز اختبارات محطاته السبع</p><div class="ft"><span>'+new Date().toLocaleDateString('ar-QA-u-nu-latn',{day:'numeric',month:'long',year:'numeric'})+'</span><span class="sl">'+sv('badge',40,1.5)+'</span><span>المُلهم</span></div></div></div>'
   +'<div class="l2-ca"><button type="button" class="l2-b p" onclick="hhLn2Print()">'+sv('print',16)+'اطبع الشهادة</button></div></div>'; }
window.hhLn2Print=function(){ var c=$('ln2-cert'), n=$('ln2-cn'), nm=n?n.value.trim():''; if(!nm){ toastX('اكتب الاسم أولاً','info'); if(n) n.focus(); return; }
  var css=($('hh-learn-css')||{}).textContent||''; var m=css.indexOf('.ln-cert{'); css=m>-1?css.slice(m):'';
  var w=window.open('','_blank'); if(!w) return; w.document.write('<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>شهادة إتمام</title><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;900&family=Amiri:wght@700&family=Reem+Kufi:wght@700&display=swap" rel="stylesheet"><style>@page{size:A4 landscape;margin:0}body{margin:0;font-family:Cairo,sans-serif}'+css+'.ln-cert{width:297mm;height:210mm;border-radius:0;box-shadow:none;max-width:none}.ln-cert .cr{border-color:#1F6F7A}.ln-cert h1{color:#123C44}</style></head><body>'+c.outerHTML.replace(/<input[^>]*>/,'<div class="nm">'+esc(nm)+'</div>')+'<script>setTimeout(function(){print()},700)<\/script></body></html>'); w.document.close(); };


P.minus='<path d="M5 12h14"/>'; P.plus='<path d="M12 5v14M5 12h14"/>';
/* ═══ سلّم الحجة ═══ */
var LANS={intro:'التنبؤ فهو أمام خيارات متعددة، وهو ما يجعله أكثر صعوبة وتعقيدًا',ch1:'الباحث السياسي يدرس الفاعل ليفهم التفاعلات',ch2:'المعرفة التفسيرية المتحققة في سياقٍ ما',ch3:'نخدم النظريات أكثر مما تخدمنا',ch4:'إضافة مكلفة تضر بموضوعية البحث ودقته',ch5:'البحث في إرادته وقدراته وطرائقه',conclusion:'النظرية مهمة لتوسيع الفهم لا لتأسيسه'};
function lAns(c){ var f=LANS[c.k], S=c.sections||[], i;
  if(f) for(i=0;i<S.length;i++){ if(S[i].key&&S[i].key.indexOf(f)>-1) return {s:f,full:S[i].key,si:i}; }
  for(i=0;i<S.length;i++){ if(S[i].key) return {s:S[i].key,full:S[i].key,si:i}; }
  return {s:'',full:'',si:0}; }
function thesis(){ var r=null; B().chapters.forEach(function(c){ (c.sections||[]).forEach(function(s){ var m=s.key&&String(s.key).match(/^فإذا كانت (.+?) فإن (.+?)\.?$/); if(m&&!r&&m[1].indexOf('النظرية')===0) r=[m[1],m[2],CHS[c.k]]; }); }); return r; }
function stepCard(i){ var b=B(), c=b.chapters[i], a=lAns(c), p=chProg(i), s=ST.quiz[c.k];
  return '<em>'+esc(CHS[c.k])+'، الدرجة '+(i+1)+' من '+b.chapters.length+'</em><b>'+esc(chName(c))+'</b><p class="q">'+sv('q',15)+'<span>'+esc(c.q)+'</span></p>'
   +(a.full?'<blockquote>«'+esc(a.full)+'»</blockquote>':'')
   +'<div class="ft"><span class="pr"><i style="width:'+p+'%"></i></span><small>أنجزت '+p+'% من المحطة'+(s!=null?'، ونتيجة اختبارها '+s+'%':'')+'</small><button type="button" class="l2-b p" onclick="hhLn2Go(\'ch\','+i+','+a.si+')">'+sv('book',15)+'اقرأ المحطة</button><button type="button" class="l2-b" onclick="hhLn2Go(\'quiz\','+i+')">'+sv('q',15)+'اختبر نفسك</button></div>'; }
function ladder(big){ var b=B(), C=b.chapters, n=C.length, sel=V.ls!=null&&V.ls<n?V.ls:n-1, th=thesis();
  return '<div class="l2-ldr'+(big?' big':'')+'"><div class="steps" style="--n:'+n+'">'+C.map(function(c,i){ var a=lAns(c), p=chProg(i);
     return '<button type="button" class="st'+(i===n-1?' last':'')+(i===sel?' on':'')+(p>=100?' dn':'')+'" style="--h:'+(i*34)+'px" aria-pressed="'+(i===sel)+'" onclick="hhLn2Step('+i+')"><span class="no">'+(i+1)+'</span><em>'+esc(CHS[c.k])+'</em><b>'+esc(c.q)+'</b>'+(a.s?'<span class="a">«'+esc(a.s)+'»</span>':'')+(p>=100?'<i class="ck">'+sv('check',12,3)+'</i>':'')+'</button>'; }).join('')+'</div>'
   +(th?'<div class="thesis"><span>'+esc(th[0])+'</span><i>'+sv('next',18,2.4)+'</i><span class="m">'+esc(th[1])+'</span><small>بنص المؤلف في '+esc(th[2])+'</small></div>':'')+'</div>'
   +'<div class="l2-stc" id="ln2-stc" aria-live="polite">'+stepCard(sel)+'</div>'; }
function ladderSec(){ var n=B().chapters.length;
  return '<div class="l2-sh"><h2>سلّم الحجة</h2><small>'+n+' درجات من سؤال المقدمة إلى خلاصة الخاتمة: في كل درجة سؤال المحطة، وتحته جوابه بكلمات المؤلف</small><div class="l2-lbt"><button type="button" class="l2-b" onclick="hhLn2LPrint()">'+sv('print',15)+'اطبعها</button><button type="button" class="l2-b" onclick="hhLn2Go(\'ladder\')">'+sv('tv',15)+'اعرضها على الصف</button></div>'+modeSeg()+'</div>'+ladder(false); }
function vLadder(){ var b=B();
  return '<div class="l2-wrap big"><div class="l2-stg"><button type="button" class="l2-ib" onclick="hhLn2LdrX()" aria-label="خروج">'+sv('x',18,2.4)+'</button><b>سلّم الحجة، «'+esc(b.title)+'»</b><button type="button" class="l2-ib" onclick="hhLn2LPrint()" aria-label="طباعة">'+sv('print',18)+'</button><button type="button" class="l2-ib" onclick="hhLn2Full()" aria-label="ملء الشاشة">'+sv('full',18)+'</button></div>'+ladder(true)+'</div>'; }
window.hhLn2Step=function(i){ var b=B(); if(!b||i<0||i>=b.chapters.length) return; V.ls=i; var h=host(); if(!h) return;
  h.querySelectorAll('.l2-ldr .st').forEach(function(x,j){ x.classList.toggle('on',j===i); x.setAttribute('aria-pressed',String(j===i)); });
  var c=$('ln2-stc'); if(c){ c.innerHTML=stepCard(i); c.style.animation='none'; void c.offsetWidth; c.style.animation=''; } };
window.hhLn2LdrX=function(){ V.mode='self'; go('home'); };
var PCSS=':root{--bg:#FAF7F1;--card:#fff;--soft:#F4EFE6;--ln:#E6DCC8;--ink:#23302F;--hd:#123C44;--mu:#6E7C7B;--t:#1F6F7A;--t1:#E7F2F1;--t2:#CFE6E4;--g:#B8924A;--g1:#FBF3E2;--g2:#F0DDB5;--r:#A3354F;--r1:#FBEDEF}'
 +'@page{size:A4;margin:14mm}*{box-sizing:border-box}body{margin:0;font-family:Cairo,sans-serif;color:var(--ink);-webkit-print-color-adjust:exact;print-color-adjust:exact}'
 +'h1{font-family:"Reem Kufi",Cairo;color:var(--hd);font-size:26px;margin:0 0 2px}.sub{color:var(--mu);font-weight:700;font-size:13px;margin:0 0 14px}'
 +'.pr-row{display:grid;grid-template-columns:34px 1fr;gap:4px 12px;border:1px solid var(--ln);border-radius:12px;padding:10px 12px;margin-bottom:8px;break-inside:avoid}.pr-row i{grid-row:span 3;width:30px;height:30px;border-radius:50%;background:var(--t);color:#fff;display:grid;place-items:center;font-style:normal;font-weight:900}'
 +'.pr-row em{font-style:normal;font-size:12px;font-weight:900;color:var(--g)}.pr-row b{font-size:15px;color:var(--hd)}.pr-row span{font-family:Amiri,serif;font-size:17px;line-height:1.8;color:var(--t)}'
 +'.pr-th{display:flex;gap:10px;justify-content:center;align-items:center;margin-top:12px;font-weight:900}.pr-th span{background:var(--g1);border:1px solid var(--g2);border-radius:10px;padding:5px 12px}.pr-th span.m{background:var(--t1);border-color:var(--t2)}';
function printDoc(ti,body){ var w=window.open('','_blank'); if(!w){ toastX('اسمح بالنوافذ المنبثقة لتتم الطباعة','info'); return; }
  w.document.write('<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>'+esc(ti)+'</title><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&family=Amiri:wght@400;700&family=Reem+Kufi:wght@700&display=swap" rel="stylesheet"><style>'+PCSS+PADCSS+'</style></head><body>'+body+'<script>setTimeout(function(){print()},700)<\/script></body></html>'); w.document.close(); }
window.hhLn2LPrint=function(){ var b=B(), th=thesis();
  printDoc('سلّم الحجة','<h1>سلّم الحجة</h1><p class="sub">«'+esc(b.title)+'»، '+esc(b.author)+'. في كل درجة سؤال المحطة، وتحته جوابه بكلمات المؤلف.</p>'
   +b.chapters.map(function(c,i){ var a=lAns(c); return '<div class="pr-row"><i>'+(i+1)+'</i><em>'+esc(CHS[c.k])+'، '+esc(chName(c))+'</em><b>'+esc(c.q)+'</b><span>«'+esc(a.full)+'»</span></div>'; }).join('')
   +(th?'<div class="pr-th"><span>'+esc(th[0])+'</span><b>&#8592;</b><span class="m">'+esc(th[1])+'</span></div>':'')); };

/* ═══ لوحة المحلل: طبّق النموذج بنفسك (تُحفظ على الجهاز فقط) ═══ */
var PADCSS=".l2-pc{margin-top:12px;background:var(--card);border:1.5px solid var(--t2);border-radius:20px;padding:16px 18px;color:var(--ink);} .l2-pc .ph small{font-size:11.5px;font-weight:900;color:var(--t);} .l2-pc .ph b{display:block;font-size:20px;color:var(--hd);overflow-wrap:anywhere;} .l2-pc .ph span{display:block;font-size:14.5px;font-weight:700;overflow-wrap:anywhere;} .l2-pc .ph em{display:inline-block;margin-top:6px;font-style:normal;font-size:12px;font-weight:900;color:var(--g);background:var(--g1);border-radius:20px;padding:2px 10px;} .l2-pc .cols{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:10px;} .l2-pc .col{background:var(--soft);border-top:4px solid var(--k);border-radius:12px;padding:8px 10px;min-width:0;} .l2-pc .col > b{font-size:14.5px;color:var(--hd);} .l2-pc ul{margin:4px 0 0;padding:0;list-style:none;display:grid;gap:4px;} .l2-pc li{font-size:13px;font-weight:700;line-height:1.7;overflow-wrap:anywhere;} .l2-pc li em{display:block;font-style:normal;font-size:11.5px;font-weight:900;color:var(--mu);} .l2-pc .e{color:var(--mu);font-weight:600;} .l2-pc .vr{margin-top:10px;border-radius:12px;padding:8px 12px;background:var(--t1);} .l2-pc .vr.no{background:var(--g1);} .l2-pc .vr b{font-size:15px;color:var(--hd);} .l2-pc .vr small{display:block;font-size:12.5px;font-weight:800;color:var(--mu);line-height:1.8;} .l2-pc .pf{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-top:10px;font-size:11.5px;font-weight:800;color:var(--mu);}";
var PK='hh_learn_nmodel_pad', PD=null, _md=null;
function padLoad(){ var d=null; try{ d=JSON.parse(localStorage.getItem(PK)||'null'); }catch(e){} d=(d&&typeof d==='object')?d:{};
  ['who','cs','m','me'].forEach(function(k){ d[k]=typeof d[k]==='string'?d[k]:''; }); d.goal=d.goal==='ex'?'ex':'pr';
  ['w','a'].forEach(function(k){ var x=Array.isArray(d[k])?d[k]:[]; d[k]=[0,1,2].map(function(i){ return typeof x[i]==='string'?x[i]:''; }); }); PD=d; return d; }
function padSave(){ try{ localStorage.setItem(PK,JSON.stringify(PD)); }catch(e){} }
function mdl(){ if(_md) return _md; var c=B().chapters.filter(function(x){ return x.k==='ch5'; })[0]||{sections:[]}, S=c.sections, T=null, sec={};
  S.forEach(function(s){ if(s.table&&s.table.head&&s.table.head[0]==='صانع القرار') { T=s.table; sec.def=s.key; }
    if(/^الركيزة الأولى/.test(s.t)) sec.w=s; if(/^الركيزة الثانية/.test(s.t)) sec.a=s; if(/^الركيزة الثالثة/.test(s.t)) sec.m=s; if(/للتفسير/.test(s.t)) sec.ex=s.key; });
  var nm=function(h){ return String(h||'').replace(/\s*\(.*?\)\s*/g,'').trim(); }, ls=function(x){ return String(x||'').split('،').map(function(y){ return y.trim(); }).filter(Boolean); },
      first=function(x){ return String(x||'').split(/[.،؛:]/)[0].trim(); }, hs=function(s){ return ((s&&s.items)||[]).map(function(it){ return first(it.x); }); };
  var H=T?T.head:['','الإرادة','القدرة','الطريقة'], R=T?T.rows[0]:['','المبادئ، المصالح، الرغبات','الذاتية، الداخلية، الخارجية','الصفرية، التراكمية'];
  _md={P:[{k:'w',n:nm(H[1]),c:'#B8924A',L:ls(R[1]),H:hs(sec.w)},{k:'a',n:nm(H[2]),c:'#1F6F7A',L:ls(R[2]),H:hs(sec.a)},{k:'m',n:nm(H[3]),c:'#A3354F',L:ls(R[3]),H:hs(sec.m)}],
    def:sec.def||'',ex:sec.ex||'',ab:(sec.a&&sec.a.key)||'',pg:c.k};
  return _md; }
function fl(s){ return String(s||'').trim().length>=2; }
function padEval(){ var M=mdl(), d=PD, w=d.w.filter(fl).length, a=d.a.filter(fl).length, mc=d.m?1:0, me=fl(d.me)?1:0, miss=[];
  d.w.forEach(function(x,i){ if(!fl(x)&&M.P[0].L[i]) miss.push(M.P[0].n+': '+M.P[0].L[i]); });
  if(d.goal==='pr'){ d.a.forEach(function(x,i){ if(!fl(x)&&M.P[1].L[i]) miss.push(M.P[1].n+': '+M.P[1].L[i]); }); if(!mc) miss.push(M.P[2].n+': '+M.P[2].L.join(' أم ')); else if(!me) miss.push(M.P[2].n+': شواهد من سلوكه'); }
  var ok=d.goal==='ex'?w>=1:(w>=1&&a===3&&mc===1);
  var h=d.goal==='ex'?(w===0?'التفسير لم يكتمل بعد':w===3?'التفسير ممكن':'التفسير ممكن مبدئياً'):(ok?(w===3&&me?'التنبؤ ممكن بقدر ما تصدق معلوماتك':'التنبؤ ممكن مبدئياً'):'التنبؤ يحتاج بحثاً');
  return {w:w,a:a,mc:mc,me:me,ok:ok,h:h,miss:miss,ex:Math.round(w/3*100),pr:Math.round((w+a+mc+me)/8*100),rule:d.goal==='ex'?M.ex:M.ab}; }
function padVerdict(){ var E=padEval(), d=PD;
  if(!fl(d.who)) return '<div class="l2-pv"><div class="hd e">'+sv('user',18)+'ابدأ باسم صانع القرار: شخص بعينه، لا دولة ولا مؤسسة</div></div>';
  return '<div class="l2-pv"><div class="hd '+(E.ok?'ok':'no')+'"><i>'+sv(E.ok?'check':'search',15,2.6)+'</i>حكمك: '+E.h+'</div>'
   +'<div class="mt" style="--k:#1F6F7A"><span>جاهزية التفسير</span><i><em style="width:'+E.ex+'%"></em></i><b>'+E.ex+'%</b></div>'
   +'<div class="mt" style="--k:#B8924A"><span>جاهزية التنبؤ</span><i><em style="width:'+E.pr+'%"></em></i><b>'+E.pr+'%</b></div>'
   +(E.miss.length?'<p class="ms">'+sv('flag',14)+'ينقصك: '+esc(E.miss.join('، '))+'</p>':'')
   +(E.rule?'<blockquote>«'+esc(E.rule)+'»<small>'+esc(B().author)+'، '+esc(CHS.ch5)+'</small></blockquote>':'')+'</div>'; }
function padCard(){ var M=mdl(), d=PD, E=padEval(), b=B(), v=function(x){ return fl(x)?esc(x):'<span class="e">لم يُحدَّد بعد</span>'; };
  var cols=M.P.map(function(p){ var li;
    if(p.k==='m') li='<li><em>الطريقة المرجّحة</em>'+(d.m?esc(p.L[d.m==='t'?1:0]||''):'<span class="e">لم يُحدَّد بعد</span>')+'</li><li><em>الشواهد</em>'+v(d.me)+'</li>';
    else li=p.L.map(function(l,i){ return '<li><em>'+esc(l)+'</em>'+v(d[p.k][i])+'</li>'; }).join('');
    return '<div class="col" style="--k:'+p.c+'"><b>'+esc(p.n)+'</b><ul>'+li+'</ul></div>'; }).join('');
  return '<div class="ph"><small>بطاقة تحليل بعدسة النموذج</small><b>'+(fl(d.who)?esc(d.who):'صانع القرار')+'</b><span>'+(fl(d.cs)?esc(d.cs):'الموقف لم يُكتب بعد')+'</span><em>'+(d.goal==='ex'?'الغاية: تفسير قرار وقع':'الغاية: التنبؤ بقرار لم يقع')+'</em></div>'
   +'<div class="cols">'+cols+'</div><div class="vr '+(E.ok?'ok':'no')+'"><b>الحكم: '+E.h+'</b><small>جاهزية التفسير '+E.ex+'%، وجاهزية التنبؤ '+E.pr+'%'+(E.miss.length?'. ينقص: '+esc(E.miss.join('، ')):'')+'</small></div>'
   +'<div class="pf"><span>بنموذج «الإرادة والقدرة والطريقة» من كتاب «'+esc(b.title)+'»، '+esc(b.author)+'</span><span>'+new Date().toLocaleDateString('ar-QA-u-nu-latn',{day:'numeric',month:'long',year:'numeric'})+'</span></div>'; }
function vPad(){ if(!PD) padLoad(); var M=mdl(), d=PD;
  var col=function(p){ var hd='<div class="h"><b>'+esc(p.n)+'</b><small>'+esc(p.L.join('، '))+'</small></div>';
    if(p.k==='m') return '<div class="pc" style="--k:'+p.c+'">'+hd+'<div class="mc" role="group" aria-label="'+esc(p.n)+'">'+p.L.map(function(l,i){ var id=i?'t':'z'; return '<button type="button" class="'+(d.m===id?'on':'')+'" aria-pressed="'+(d.m===id)+'" onclick="hhLn2PadM(\''+id+'\')"><b>'+esc(l)+'</b>'+(p.H[i]?'<small>«'+esc(p.H[i])+'»</small>':'')+'</button>'; }).join('')+'</div>'
      +'<label class="f"><span>شواهد من سلوكه السابق</span><textarea data-f="me" rows="2" oninput="hhLn2Pad(this)" placeholder="مواقف سابقة تدل على طريقته">'+esc(d.me)+'</textarea></label></div>';
    return '<div class="pc" style="--k:'+p.c+'">'+hd+p.L.map(function(l,i){ return '<label class="f"><span>'+esc(l)+'</span>'+(p.H[i]?'<small>«'+esc(p.H[i])+'»</small>':'')+'<textarea data-f="'+p.k+i+'" rows="2" oninput="hhLn2Pad(this)" placeholder="ما الذي تعرفه؟">'+esc(d[p.k][i])+'</textarea></label>'; }).join('')+'</div>'; };
  return '<section class="l2-pad" id="ln2-pad"><div class="l2-sh"><h2>لوحة المحلل: طبّق النموذج بنفسك</h2><small>اختر صانع قرار وموقفاً من الواقع، واملأ ركائز النموذج الثلاث بما تعرفه، ثم احكم: هل يكفي ما تعرفه للتفسير أو للتنبؤ؟ ما تكتبه يُحفظ على جهازك فقط.</small></div>'
   +'<div class="l2-pdb">'+(M.def?'<p class="df">'+sv('quote',14)+'«'+esc(M.def)+'»</p>':'')
   +'<div class="who"><label><span>صانع القرار</span><input data-f="who" oninput="hhLn2Pad(this)" value="'+esc(d.who)+'" placeholder="اسم شخص بعينه، لا دولة" maxlength="120"></label><label><span>الموقف أو القرار</span><input data-f="cs" oninput="hhLn2Pad(this)" value="'+esc(d.cs)+'" placeholder="مثال: هل سينضم إلى تحالف اقتصادي؟" maxlength="240"></label></div>'
   +'<div class="gl" role="group" aria-label="الغاية"><span>غايتك:</span><button type="button" class="'+(d.goal==='ex'?'on':'')+'" aria-pressed="'+(d.goal==='ex')+'" onclick="hhLn2PadG(\'ex\')">تفسير قرار وقع</button><button type="button" class="'+(d.goal==='pr'?'on':'')+'" aria-pressed="'+(d.goal==='pr')+'" onclick="hhLn2PadG(\'pr\')">التنبؤ بقرار لم يقع</button></div>'
   +'<div class="cv3">'+M.P.map(col).join('')+'</div><div id="ln2-padv">'+padVerdict()+'</div>'
   +'<div class="bt"><button type="button" class="l2-b p" onclick="hhLn2PadPrint()">'+sv('print',15)+'اطبع البطاقة</button><button type="button" class="l2-b" onclick="hhLn2PadClr()">'+sv('refresh',15)+'امسح اللوحة</button></div></div>'
   +'<div class="l2-pc" id="ln2-padc">'+padCard()+'</div></section>'; }
function padUpd(){ var v=$('ln2-padv'), c=$('ln2-padc'); if(v) v.innerHTML=padVerdict(); if(c) c.innerHTML=padCard(); }
window.hhLn2Pad=function(el){ if(!PD) padLoad(); var f=el&&el.getAttribute('data-f'); if(!f) return; var m=f.match(/^([wa])([0-2])$/);
  if(m) PD[m[1]][+m[2]]=el.value; else if(f==='who'||f==='cs'||f==='me') PD[f]=el.value; padSave(); padUpd(); };
function padBtns(sel,val){ var h=host(); if(!h) return; h.querySelectorAll(sel).forEach(function(x){ var on=x.getAttribute('onclick').indexOf("'"+val+"'")>-1; x.classList.toggle('on',on); x.setAttribute('aria-pressed',String(on)); }); }
window.hhLn2PadG=function(g){ if(!PD) padLoad(); PD.goal=g==='ex'?'ex':'pr'; padSave(); padBtns('.l2-pdb .gl button',PD.goal); padUpd(); };
window.hhLn2PadM=function(m){ if(!PD) padLoad(); PD.m=PD.m===m?'':m; padSave(); padBtns('.l2-pdb .mc button',PD.m||'_'); padUpd(); };
window.hhLn2PadClr=function(){ if(!confirm('امسح كل ما كتبته في لوحة المحلل؟')) return; try{ localStorage.removeItem(PK); }catch(e){} PD=null; padLoad(); var s=$('ln2-pad'); if(s) s.outerHTML=vPad(); };
window.hhLn2PadPrint=function(){ if(!PD) padLoad(); if(!fl(PD.who)){ toastX('اكتب اسم صانع القرار أولاً','info'); var i=document.querySelector('#ln2-pad input[data-f="who"]'); if(i) i.focus(); return; }
  printDoc('بطاقة تحليل: '+PD.who,'<div class="l2-pc">'+padCard()+'</div>'); };

/* ═══ نظرية أم نموذج؟ تصويت الصف (عدّ يدوي، بلا خادم) ═══ */
var VK='hh_learn_nmodel_vote', VT=null;
function TL(){ return B().labs.filter(function(l){ return !!l.theory; }); }
function vtLoad(){ var d=null; try{ d=JSON.parse(localStorage.getItem(VK)||'null'); }catch(e){} d=(d&&typeof d==='object')?d:{}; var n=TL().length;
  d.li=(d.li>=0&&d.li<n)?d.li|0:0; d.ph=(d.ph===1||d.ph===2)?d.ph:0; ['a','b'].forEach(function(k){ var x=Array.isArray(d[k])?d[k]:[]; d[k]=[Math.max(0,x[0]|0),Math.max(0,x[1]|0)]; }); VT=d; return d; }
function vtSave(){ try{ localStorage.setItem(VK,JSON.stringify(VT)); }catch(e){} }
function pc(x){ var n=x[0]+x[1]; return n?Math.round(x[0]/n*100):0; }
function vVote(){ if(!VT) vtLoad(); var b=B(), L=TL(), D=VT, l=L[D.li], cur=D.ph===0?D.a:D.b, ph=D.ph;
  var head='<div class="l2-stg"><button type="button" class="l2-ib" onclick="hhLn2Go(\'labs\')" aria-label="خروج">'+sv('x',18,2.4)+'</button><b>نظرية أم نموذج؟ تصويت الصف</b><button type="button" class="l2-ib" onclick="hhLn2Full()" aria-label="ملء الشاشة">'+sv('full',18)+'</button></div>';
  var cs='<div class="l2-vh"><button type="button" class="l2-ib" onclick="hhLn2Vt(\'c\',-1)" '+(D.li===0?'disabled':'')+' aria-label="الحالة السابقة">'+sv('back',18,2.4)+'</button><div><small>الحالة '+(D.li+1)+' من '+L.length+'، '+esc(l.ch)+'، صفحة '+esc(l.pg)+'</small><h2>'+esc(l.title)+'</h2><p>'+esc(l.scene)+'</p></div><button type="button" class="l2-ib" onclick="hhLn2Vt(\'c\',1)" '+(D.li>=L.length-1?'disabled':'')+' aria-label="الحالة التالية">'+sv('next',18,2.4)+'</button></div>';
  var rd='<div class="l2-vr">'+['الجولة الأولى: قبل رأي المؤلف','الجولة الثانية: بعد رأي المؤلف','النتيجة'].map(function(x,i){ return '<span class="'+(i===ph?'on':i<ph?'dn':'')+'">'+x+'</span>'; }).join('')+'</div>';
  var auth=ph>=1?'<div class="l2-auth"><small>'+sv('quote',15)+'رأي المؤلف، صفحة '+esc(l.pg)+'</small><blockquote>'+esc(l.author)+'</blockquote><span>'+esc(b.author)+'</span></div><div class="l2-twin"><div><small>النظرية: '+esc(l.theory.name)+'</small><b>'+esc(l.theory.answer)+'</b><em>تبدأ من الإجابة</em></div><div class="m"><small>النموذج</small><b>أسئلة عن الإرادة والقدرة والطريقة</b><em>يبدأ من السؤال</em></div></div>':'';
  var body;
  if(ph<2){ var T=[['book','أبحث عن نظرية تجيب عنه','#B8924A'],['user','أدرس صانع القرار نفسه','#1F6F7A']];
    body=auth+'<div class="l2-vq">'+(ph===0?'بأي العدستين تبدأ الإجابة عن هذا السؤال؟':'بعد رأي المؤلف: بأي العدستين تبدأ الآن؟')+'<small>اطلب رفع الأيدي، وأضف العدد هنا، أو اضغط 1 و 2 من لوحة المفاتيح</small></div>'
     +'<div class="l2-vt">'+T.map(function(x,i){ return '<div class="tl" style="--k:'+x[2]+'"><b>'+sv(x[0],20)+esc(x[1])+'</b><span class="n" aria-live="polite">'+cur[i]+'</span><div class="pm"><button type="button" onclick="hhLn2Vt(\'d\','+i+')" aria-label="أنقص واحداً" '+(cur[i]?'':'disabled')+'>'+sv('minus',24,2.6)+'</button><button type="button" class="p" onclick="hhLn2Vt(\'i\','+i+')" aria-label="أضف واحداً">'+sv('plus',24,2.6)+'</button></div><small>المفتاح '+(i+1)+'</small></div>'; }).join('')+'</div>'
     +'<div class="l2-vb">'+(ph===0?'<button type="button" class="l2-b p" onclick="hhLn2Vt(\'p\',1)">'+sv('eye',16)+'اكشف رأي المؤلف</button>':'<button type="button" class="l2-b" onclick="hhLn2Vt(\'p\',0)">'+sv('back',15,2.4)+'الجولة الأولى</button><button type="button" class="l2-b p" onclick="hhLn2Vt(\'p\',2)">'+sv('chart',16)+'اعرض النتيجة</button>')+'<button type="button" class="l2-b" onclick="hhLn2Vt(\'z\',0)">'+sv('refresh',15)+'صفّر العدّ</button></div>';
  } else { var A=pc(D.a), Z=pc(D.b), df=Z-A, na=D.a[0]+D.a[1], nb=D.b[0]+D.b[1];
    body=auth+'<div class="l2-vres"><p>نسبة من بدأ بالنظرية في كل جولة</p>'
     +'<div class="r" style="--k:#B8924A"><span>قبل رأي المؤلف</span><i><em style="width:'+A+'%"></em></i><b>'+A+'%</b></div>'
     +'<div class="r" style="--k:#1F6F7A"><span>بعد رأي المؤلف</span><i><em style="width:'+Z+'%"></em></i><b>'+Z+'%</b></div>'
     +'<p class="ch">'+(!na||!nb?'أكمل عدّ الجولتين لتظهر المقارنة':df<0?'تراجعت نسبة من بدأ بالنظرية '+(-df)+' نقطة بعد رأي المؤلف':df>0?'زادت نسبة من بدأ بالنظرية '+df+' نقطة بعد رأي المؤلف':'لم تتغير النسبة بين الجولتين')+'</p>'
     +'<p>عدد المصوتين: '+na+' في الجولة الأولى، و'+nb+' في الثانية</p></div>'
     +'<div class="l2-vb"><button type="button" class="l2-b" onclick="hhLn2Vt(\'p\',1)">'+sv('back',15,2.4)+'الجولة الثانية</button><button type="button" class="l2-b" onclick="hhLn2Vt(\'z\',0)">'+sv('refresh',15)+'جولة جديدة</button>'+(D.li<L.length-1?'<button type="button" class="l2-b p" onclick="hhLn2Vt(\'c\',1)">الحالة التالية'+sv('next',15,2.4)+'</button>':'')+'</div>'; }
  return '<div class="l2-wrap big">'+head+cs+rd+body+'<p class="l2-vnt">العدّ يدوي على جهاز المعلم فقط، ولا يحتاج اتصالاً ولا حسابات للطلاب.</p></div>'; }
window.hhLn2Vt=function(op,x){ if(!VT) vtLoad(); var D=VT, L=TL(), cur=D.ph===0?D.a:D.b;
  if(op==='c'){ var n=D.li+x; if(n<0||n>=L.length) return; D.li=n; D.ph=0; D.a=[0,0]; D.b=[0,0]; }
  else if(op==='i'){ if(D.ph>1) return; cur[x]=Math.min(999,cur[x]+1); }
  else if(op==='d'){ if(D.ph>1) return; cur[x]=Math.max(0,cur[x]-1); }
  else if(op==='p'){ D.ph=x; }
  else if(op==='z'){ D.ph=0; D.a=[0,0]; D.b=[0,0]; }
  vtSave(); var h=host(), y=h?h.scrollTop:0; render(); if(h) h.scrollTop=(op==='c'||op==='z')?0:y; };
document.addEventListener('keydown',function(e){ var h=host(); if(!h||!h.classList.contains('ln2')||h.classList.contains('ln3')||V.view!=='vote'||!VT||VT.ph>1||!h.querySelector('.l2-vt')) return; var t=e.target; if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA')) return;
  if(e.key==='1'||e.key==='2'){ e.preventDefault(); hhLn2Vt('i',+e.key-1); } });

/* ═══ مع دخول الطلاب ═══ */
function liveDlg(){ var b=B(), h=host(); if(!h) return; var ov=document.createElement('div'); ov.className='ln-scrim'; ov.id='ln2-live';
  ov.innerHTML='<div class="ln-dlg l2d" role="dialog" aria-modal="true"><div class="dh"><div><b>مع دخول الطلاب</b><small>يدخل الطلاب برمز من أجهزتهم، ويجيبون عن أسئلة المحطة في جولة مباشرة، والنتائج على شاشة الصف</small></div><button type="button" class="x" aria-label="إغلاق" onclick="this.closest(\'.ln-scrim\').remove()">'+sv('x',16,2.4)+'</button></div>'
   +'<div class="in"><h4>اختر المحطة</h4><div class="g">'+b.chapters.map(function(c,i){ return '<button type="button" onclick="hhLn2Live('+i+')"><i>'+sv(CHI[c.k],20)+'</i><b>'+esc(CHS[c.k])+'</b><small>'+(c.quiz||[]).length+' أسئلة</small></button>'; }).join('')+'<button type="button" onclick="hhLn2Live(-1)"><i>'+sv('star',20)+'</i><b>الكتاب كله</b><small>كل الأسئلة</small></button></div><p class="nt">'+sv('tv',15)+'تحتاج حساب معلم. ولشرح الكتاب على الشاشة دون دخول الطلاب اختر «أعرض على الصف».</p></div></div>';
  h.appendChild(ov); ov.addEventListener('click',function(e){ if(e.target===ov) ov.remove(); }); }
window.hhLn2Live=function(ci){ var d=$('ln2-live'); if(d) d.remove(); var u=me(); if(!u||!u.uid){ toastX('سجّل الدخول بحساب المعلم لبدء جولة مباشرة','error'); return; } if(typeof window.hhLiveHost!=='function'){ toastX('وحدة التشغيل المباشر غير محمّلة','error'); return; }
  var b=B(), C=ci<0?b.chapters:[b.chapters[ci]], qs=[]; C.forEach(function(c){ (c.quiz||[]).forEach(function(q,n){ var ord=shuf(q.o.map(function(_,i){ return i; }),'L'+c.k+n); qs.push({id:'l2_'+c.k+'_'+n,type:'mcq',q:q.q,opts:ord.map(function(i){ return q.o[i]; }),correct:[ord.indexOf(0)],time:25,mult:1,flash:false,note:''}); }); });
  var g={id:'learn_nmodel_'+(ci<0?'all':b.chapters[ci].k),title:ci<0?b.title:'«'+chName(b.chapters[ci])+'» من '+b.title,template:'race',mode:'live',screenTpl:'boxes',settings:{},questions:qs,status:'ready'};
  if(typeof window.hhLearnClose==='function') hhLearnClose(); hhLiveHost(g); };

document.addEventListener('keydown',function(e){ var h=host(); if(!h||!h.classList.contains('ln2')) return; var t=e.target; if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA')) return;
  if(V.view==='ch'){ if(e.key==='ArrowLeft'){ e.preventDefault(); hhLn2Sec(V.si+1); } else if(e.key==='ArrowRight'){ e.preventDefault(); hhLn2Sec(V.si-1); } }
  else if(V.view==='case'){ var l=B().labs[V.lab], n=l.theory?4:3; if(e.key==='ArrowLeft'&&V.st<n-1){ e.preventDefault(); hhLn2CS(V.st+1); } else if(e.key==='ArrowRight'){ e.preventDefault(); hhLn2CS(V.st-1); } } });

/* ═══ الأنماط: ألوان فاتحة مريحة للعين ═══ */
var CSS=[
'#hh-learn.ln2{--bg:#FAF7F1;--card:#FFFFFF;--soft:#F4EFE6;--ln:#E6DCC8;--ink:#23302F;--hd:#123C44;--mu:#6E7C7B;--t:#1F6F7A;--t1:#E7F2F1;--t2:#CFE6E4;--g:#B8924A;--g1:#FBF3E2;--g2:#F0DDB5;--r:#A3354F;--r1:#FBEDEF;background:var(--bg);color:var(--ink);}',
'body.dark-mode #hh-learn.ln2{--bg:#14201F;--card:#1B2928;--soft:#223231;--ln:#2E4140;--ink:#E3ECEA;--hd:#EAF4F2;--mu:#9DB2B0;--t:#6FC3C9;--t1:#1E3A3B;--t2:#2C5153;--g1:#2E2716;--g2:#5A4A26;--r1:#3A1E25;}',
'#hh-learn.ln2.ln2-stg{top:0;bottom:0;z-index:100050;}',
'.l2-wrap{max-width:1180px;margin:0 auto;padding:22px 24px 60px;} .l2-wrap.big{max-width:1400px;}',
'.l2-cr{display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-size:13px;font-weight:800;color:var(--mu);margin-bottom:14px;} .l2-cr button{all:unset;cursor:pointer;color:var(--t);} .l2-cr button:hover{text-decoration:underline;} .l2-cr b{color:var(--hd);}',
'.l2-b{all:unset;box-sizing:border-box;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;height:46px;padding:0 18px;border-radius:13px;font-weight:900;font-size:15px;border:1.5px solid var(--ln);color:var(--hd);background:var(--card);white-space:nowrap;transition:transform .15s;}',
'.l2-b:hover{transform:translateY(-1px);border-color:var(--t2);} .l2-b:focus-visible{outline:3px solid var(--g);outline-offset:2px;} .l2-b[disabled]{opacity:.4;cursor:default;transform:none;}',
'.l2-b.p{background:var(--t);color:#fff;border-color:transparent;box-shadow:0 8px 20px rgba(31,111,122,.2);} .l2-b.ok{border-color:var(--t);color:var(--t);background:var(--t1);}',
'.l2-hero{position:relative;border-radius:28px;overflow:hidden;background:radial-gradient(70% 110% at 85% 0%,#DCEFEC 0,transparent 60%),linear-gradient(160deg,#F3F9F8,#FBF7EE 75%);padding:38px 42px;display:grid;grid-template-columns:1.25fr .75fr;gap:30px;align-items:center;border:1px solid var(--ln);box-shadow:0 18px 50px rgba(18,60,68,.07);}',
'body.dark-mode #hh-learn .l2-hero{background:linear-gradient(160deg,#1B2E2D,#14201F);}',
'.l2-hero .wm{position:absolute;inset:auto 0 -40px 0;font-family:"Reem Kufi",Cairo;font-size:150px;line-height:1;color:rgba(31,111,122,.05);white-space:nowrap;text-align:center;pointer-events:none;}',
'.l2-hero .tx{position:relative;} .l2-hero small{display:inline-flex;gap:8px;align-items:center;font-size:12.5px;font-weight:900;color:var(--t);background:var(--card);border:1px solid var(--t2);border-radius:20px;padding:3px 12px;}',
'.l2-hero h1{margin:14px 0 10px;font-family:"Reem Kufi",Cairo;font-weight:700;font-size:52px;line-height:1.25;color:var(--hd);} .l2-hero h1 span{color:var(--g);}',
'.l2-hero p{margin:0;font-size:17px;font-weight:700;line-height:2;color:var(--ink);opacity:.9;max-width:640px;}',
'.l2-hero .by{display:flex;gap:14px;align-items:center;margin-top:18px;} .l2-hero .by i{width:46px;height:46px;border-radius:14px;background:var(--g1);border:1px solid var(--g2);display:grid;place-items:center;color:var(--g);font-style:normal;font-family:"Reem Kufi";font-size:20px;}',
'.l2-hero .by b{display:block;font-size:16px;color:var(--hd);} .l2-hero .by span{font-size:13px;color:var(--mu);font-weight:700;}',
'.l2-hero .st{display:flex;gap:22px;margin-top:20px;flex-wrap:wrap;} .l2-hero .st span{font-size:13px;font-weight:800;color:var(--mu);} .l2-hero .st b{font-size:24px;color:var(--t);margin-inline-end:5px;}',
'.l2-hero .bt{display:flex;gap:10px;margin-top:22px;flex-wrap:wrap;}',
'.l2-hero .q3{position:relative;aspect-ratio:1;max-width:330px;justify-self:center;width:100%;} .l2-hero .q3 .c{position:absolute;inset:0;border-radius:50%;border:1.5px dashed var(--g2);animation:l2r 60s linear infinite;} @keyframes l2r{to{transform:rotate(360deg)}}',
'.l2-hero .q3 .n{position:absolute;width:116px;height:116px;border-radius:50%;display:grid;place-items:center;text-align:center;font-weight:900;font-size:15px;line-height:1.5;background:var(--card);border:2.5px solid var(--k);color:var(--hd);box-shadow:0 10px 26px color-mix(in srgb,var(--k) 18%,transparent);} .l2-hero .q3 .n small{display:block;background:none;border:0;padding:0;font-size:11px;color:var(--mu);}',
'.l2-hero .q3 .core{position:absolute;inset:36%;border-radius:50%;background:var(--g1);border:2px solid var(--g2);color:var(--hd);display:grid;place-items:center;text-align:center;font-weight:900;font-size:14px;line-height:1.4;}',
'.l2-au{display:grid;grid-template-columns:auto 1fr auto;gap:16px;align-items:center;margin-top:16px;background:var(--card);border:1px solid var(--ln);border-radius:20px;padding:16px 20px;} .l2-au .ic{width:48px;height:48px;border-radius:14px;background:var(--t1);color:var(--t);display:grid;place-items:center;} .l2-au b{font-size:16px;color:var(--hd);} .l2-au p{margin:4px 0 0;font-size:14.5px;font-weight:700;line-height:1.95;}',
'.l2-au .pr{display:grid;justify-items:center;gap:4px;} .l2-au .pr small{font-size:12px;font-weight:800;color:var(--mu);}',
'#hh-learn.ln2 .ring{--p:0;width:86px;height:86px;border-radius:50%;background:conic-gradient(var(--t) calc(var(--p)*1%),var(--soft) 0);display:grid;place-items:center;position:relative;} #hh-learn.ln2 .ring::before{content:"";position:absolute;inset:9px;border-radius:50%;background:var(--card);} #hh-learn.ln2 .ring b{position:relative;font-size:19px;font-weight:900;color:var(--t);}',
'#hh-learn.ln2 .ring.big{width:150px;height:150px;} #hh-learn.ln2 .ring.big::before{inset:13px;} #hh-learn.ln2 .ring.big b{font-size:34px;}',
'.l2-sh{display:flex;align-items:flex-end;gap:12px;flex-wrap:wrap;margin:28px 0 14px;} .l2-sh h2{margin:0;font-size:24px;font-weight:900;color:var(--hd);} .l2-sh small{flex:1;min-width:200px;font-size:13px;font-weight:700;color:var(--mu);}',
'.l2-mode{display:flex;background:var(--soft);border:1px solid var(--ln);border-radius:14px;padding:4px;flex-wrap:wrap;} .l2-mode button{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:10px;font-weight:900;font-size:14px;color:var(--mu);} .l2-mode button.on{background:var(--card);color:var(--t);box-shadow:0 2px 8px rgba(0,0,0,.06);}',
'.l2-map{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:10px;}',
'.l2-map .nd{all:unset;box-sizing:border-box;cursor:pointer;position:relative;border-radius:20px;padding:16px 14px;background:var(--card);border:1.5px solid var(--ln);display:flex;flex-direction:column;gap:8px;transition:transform .2s,border-color .2s;}',
'.l2-map .nd:hover{transform:translateY(-4px);border-color:var(--t2);} .l2-map .nd:focus-visible{outline:3px solid var(--g);} .l2-map .nd.on{background:var(--t1);border-color:var(--t);box-shadow:0 14px 34px rgba(31,111,122,.12);}',
'.l2-map .nd .ic{width:40px;height:40px;border-radius:12px;background:var(--t1);color:var(--t);display:grid;place-items:center;} .l2-map .nd.dn .ic{background:var(--t);color:#fff;}',
'.l2-map .nd em{font-style:normal;font-size:11px;font-weight:900;color:var(--g);} .l2-map .nd b{font-size:15px;font-weight:900;line-height:1.5;color:var(--hd);}',
'.l2-map .nd .q{margin-top:auto;font-size:12px;font-weight:800;color:#8A6D2E;background:var(--g1);border-radius:10px;padding:6px 8px;line-height:1.7;} body.dark-mode #hh-learn .l2-map .nd .q{color:var(--g2);}',
'.l2-map .nd .pr{height:5px;border-radius:5px;background:var(--soft);overflow:hidden;} .l2-map .nd .pr i{display:block;height:100%;background:var(--t);}',
'.l2-tri{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:16px;}',
'.l2-tri button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;grid-template-columns:auto 1fr;gap:4px 14px;align-items:center;background:var(--card);border:1.5px solid var(--ln);border-radius:20px;padding:16px;transition:border-color .2s;} .l2-tri button:hover{border-color:var(--t2);}',
'.l2-tri i{grid-row:span 3;width:54px;height:54px;border-radius:16px;background:var(--g1);color:var(--g);display:grid;place-items:center;} .l2-tri b{font-size:17px;font-weight:900;color:var(--hd);} .l2-tri small{font-size:13px;font-weight:700;color:var(--mu);line-height:1.7;} .l2-tri span{font-size:12.5px;font-weight:900;color:var(--t);}',
'.l2-src{margin:22px 0 0;font-size:12.5px;font-weight:700;color:var(--mu);line-height:1.9;}',
/* reader */
'.l2-chbar{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px;margin-bottom:16px;} .l2-chbar button{all:unset;cursor:pointer;display:grid;gap:6px;font-size:11.5px;font-weight:900;color:var(--mu);text-align:center;} .l2-chbar button i{display:block;height:6px;border-radius:6px;background:var(--soft);overflow:hidden;} .l2-chbar button i s{display:block;height:100%;background:var(--t);text-decoration:none;}',
'.l2-chbar button.on span{color:var(--t);} .l2-chbar button.on i{box-shadow:0 0 0 2px var(--t2);}',
'.l2-rd{display:grid;grid-template-columns:270px minmax(0,1fr);gap:20px;align-items:start;} .l2-wrap.big .l2-rd{grid-template-columns:minmax(0,1fr);}',
'.l2-toc{position:sticky;top:12px;background:var(--card);border:1px solid var(--ln);border-radius:20px;padding:12px;display:grid;gap:3px;} .l2-toc h5{margin:4px 8px 8px;font-size:13px;color:var(--mu);}',
'.l2-toc button{all:unset;cursor:pointer;display:flex;gap:10px;align-items:center;padding:9px 10px;border-radius:12px;font-size:14px;font-weight:800;line-height:1.5;color:var(--ink);} .l2-toc button:hover{background:var(--soft);}',
'.l2-toc button i{width:26px;height:26px;border-radius:8px;background:var(--soft);display:grid;place-items:center;font-style:normal;font-size:12px;flex-shrink:0;} .l2-toc button.dn i{background:var(--t2);color:var(--t);} .l2-toc button.on{background:var(--t1);color:var(--t);} .l2-toc button.on i{background:var(--t);color:#fff;}',
'.l2-pg{background:var(--card);border:1px solid var(--ln);border-radius:24px;padding:30px 36px;animation:l2in .35s both;} @keyframes l2in{from{opacity:0;transform:translateY(8px)}}',
'.l2-pg .ch{font-size:12.5px;font-weight:900;color:var(--t);} .l2-pg h2{margin:4px 0 16px;font-family:"Reem Kufi",Cairo;font-size:32px;line-height:1.4;color:var(--hd);}',
'.l2-cq{display:flex;gap:8px;align-items:flex-start;margin:0 0 16px;background:var(--g1);border:1px solid var(--g2);border-radius:14px;padding:10px 14px;font-size:15.5px;font-weight:900;color:#7A5E24;line-height:1.8;} body.dark-mode #hh-learn .l2-cq{color:var(--g2);}',
'.l2-key{position:relative;margin:0 0 20px;padding:18px 22px;border-radius:18px;background:var(--t1);border-inline-start:5px solid var(--t);color:var(--hd);font-family:Amiri,serif;font-size:25px;font-weight:700;line-height:1.85;} .l2-key small{display:block;font-family:Cairo;font-size:12px;font-weight:800;color:var(--t);margin-top:4px;}',
'.l2-p{margin:0 0 16px;font-size:18px;font-weight:600;line-height:2.15;color:var(--ink);} .l2-p mark{background:linear-gradient(transparent 55%,var(--g2) 55%);color:inherit;font-weight:800;padding:0 2px;}',
'.l2-wrap.big .l2-p{font-size:24px;} .l2-wrap.big .l2-key{font-size:32px;} .l2-wrap.big .l2-pg h2{font-size:42px;} .l2-wrap.big .l2-items .it .x{font-size:21px;}',
'.l2-items{display:grid;gap:10px;margin:6px 0 10px;} .l2-items .it{all:unset;box-sizing:border-box;cursor:pointer;display:grid;gap:10px;border:1.5px solid var(--ln);border-radius:16px;padding:14px 16px;background:var(--bg);transition:border-color .2s;} .l2-items .it:hover{border-color:var(--t2);} .l2-items .it:focus-visible{outline:3px solid var(--g);}',
'.l2-items .it .h{display:flex;gap:12px;align-items:center;} .l2-items .it .h i{width:34px;height:34px;border-radius:10px;background:var(--g1);border:1px solid var(--g2);color:#8A6D2E;display:grid;place-items:center;font-style:normal;font-weight:900;flex-shrink:0;} .l2-items .it .h b{flex:1;font-size:16.5px;color:var(--hd);} .l2-items .it .h em{color:var(--mu);}',
'.l2-items .it.op{background:var(--card);border-color:var(--t2);} .l2-items .it .x{font-size:16.5px;font-weight:600;line-height:2;color:var(--ink);animation:l2in .3s both;}',
'.l2-all{all:unset;cursor:pointer;display:inline-flex;gap:6px;align-items:center;font-size:13.5px;font-weight:900;color:var(--t);margin-bottom:10px;}',
'.l2-tbl{overflow-x:auto;margin:10px 0;} .l2-tbl table{width:100%;border-collapse:separate;border-spacing:0;border:1px solid var(--ln);border-radius:16px;overflow:hidden;} .l2-tbl th{background:var(--t1);color:var(--t);font-size:15px;font-weight:900;padding:12px 14px;text-align:start;}',
'.l2-tbl td{padding:12px 14px;border-top:1px solid var(--soft);font-size:15.5px;font-weight:700;color:var(--ink);} .l2-tbl td.k{color:var(--mu);font-weight:800;background:var(--bg);}',
'.l2-nav{display:flex;align-items:center;gap:12px;margin-top:16px;} .l2-nav span{flex:1;text-align:center;font-size:13px;font-weight:800;color:var(--mu);}',
'.l2-h3{display:flex;gap:8px;align-items:center;margin:22px 0 10px;font-size:19px;font-weight:900;color:var(--hd);} .l2-h3 em{font-style:normal;font-size:12px;background:var(--soft);color:var(--mu);border-radius:20px;padding:0 9px;}',
'.l2-ex{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;} .l2-ex button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;gap:6px;align-content:start;border:1.5px solid var(--ln);border-radius:16px;padding:12px 14px;background:var(--bg);}',
'.l2-ex button:hover{border-color:var(--t2);} .l2-ex button b{font-size:15px;font-weight:900;color:var(--hd);line-height:1.6;} .l2-ex button small{display:flex;gap:5px;align-items:center;font-size:12px;font-weight:800;color:var(--t);} .l2-ex button span{font-size:15px;font-weight:600;line-height:2;color:var(--ink);}',
'.l2-ex button.op{grid-column:1/-1;background:var(--card);border-color:var(--t2);}',
'.l2-qu{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;} .l2-qu figure{margin:0;background:var(--g1);border:1px solid var(--g2);border-radius:16px;padding:14px 16px;} .l2-qu blockquote{margin:0;font-family:Amiri,serif;font-size:19px;line-height:1.85;color:var(--hd);} .l2-qu figcaption{margin-top:6px;font-size:12.5px;font-weight:900;color:#8A6D2E;}',
'.l2-act{margin-top:22px;border:1.5px solid var(--t2);background:#F6FBFA;border-radius:20px;padding:16px 18px;} body.dark-mode #hh-learn .l2-act{background:var(--t1);}',
'.l2-act h3{margin:0 0 4px;display:flex;gap:8px;align-items:center;font-size:18px;color:var(--hd);} .l2-act > p{margin:0 0 12px;font-size:13.5px;font-weight:700;color:var(--mu);}',
'.l2-act .pool{display:flex;flex-wrap:wrap;gap:8px;min-height:44px;margin-bottom:10px;} .l2-act .ch{all:unset;box-sizing:border-box;cursor:pointer;background:var(--card);border:1.5px solid var(--ln);border-radius:12px;padding:9px 14px;font-weight:900;font-size:14.5px;color:var(--hd);box-shadow:0 3px 0 var(--ln);}',
'.l2-act .ch.cur{border-color:var(--t);background:var(--t1);box-shadow:0 0 0 3px var(--t2);} .l2-act .ch.in{box-shadow:none;font-size:13.5px;padding:6px 10px;} .l2-act .ch.ok{background:#E3F4EC;border-color:#5FB58A;} .l2-act .ch.no{background:var(--r1);border-color:#E3A9B6;color:var(--r);}',
'.l2-act .dn{display:inline-flex;gap:6px;align-items:center;font-weight:900;color:var(--t);}',
'.l2-act .bins{display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr));gap:10px;} .l2-act .bin{min-height:110px;border:2px dashed var(--t2);border-radius:16px;background:var(--card);padding:10px;display:flex;flex-wrap:wrap;align-content:flex-start;gap:6px;cursor:pointer;} .l2-act .bin:hover{border-color:var(--t);} .l2-act .bin h4{width:100%;margin:0 0 4px;text-align:center;font-size:15px;color:var(--t);}',
'.l2-act .mt{display:grid;grid-template-columns:1fr 1fr;gap:12px;} .l2-act .cl{display:grid;gap:8px;align-content:start;} .l2-act h5{margin:0;text-align:center;font-size:13px;color:var(--mu);}',
'.l2-act .mi{all:unset;box-sizing:border-box;cursor:pointer;background:var(--card);border:2px solid var(--ln);border-radius:14px;padding:10px 12px;font-size:14.5px;font-weight:800;line-height:1.7;color:var(--ink);} .l2-act .mi.cur{border-color:var(--t);box-shadow:0 0 0 3px var(--t2);} .l2-act .mi.f{border-color:var(--k);box-shadow:inset 5px 0 0 var(--k);} .l2-act .mi.ok{background:#E3F4EC;} .l2-act .mi.no{background:var(--r1);}',
'.l2-act .res{display:flex;gap:10px;align-items:center;margin-top:12px;padding:10px 12px;border-radius:12px;font-weight:900;font-size:14px;} .l2-act .res.ok{background:#E3F4EC;color:#1E6B47;} .l2-act .res.no{background:var(--r1);color:var(--r);} .l2-act .res .l2-b{margin-inline-start:auto;height:36px;}',
'.l2-lk{display:flex;flex-wrap:wrap;gap:8px;} .l2-lk button{all:unset;cursor:pointer;display:inline-flex;gap:6px;align-items:center;background:var(--g1);border:1px solid var(--g2);border-radius:12px;padding:8px 12px;font-size:13.5px;font-weight:800;color:var(--hd);line-height:1.6;}',
'.l2-qz{display:flex;gap:14px;align-items:center;margin-top:22px;background:var(--t1);border-radius:18px;padding:14px 18px;} .l2-qz div{flex:1;} .l2-qz b{display:flex;gap:8px;align-items:center;font-size:17px;color:var(--hd);} .l2-qz small{font-size:13px;font-weight:700;color:var(--mu);}',
/* quiz */
'.l2-qh{display:flex;gap:12px;align-items:center;margin-bottom:10px;} .l2-qh b{flex:1;font-size:16px;color:var(--hd);} .l2-qh span{font-size:13px;font-weight:900;color:var(--mu);}',
'.l2-ib{all:unset;cursor:pointer;width:42px;height:42px;border-radius:12px;display:grid;place-items:center;background:var(--card);border:1px solid var(--ln);color:var(--hd);flex-shrink:0;}',
'.l2-qbar{height:8px;border-radius:8px;background:var(--soft);overflow:hidden;margin-bottom:18px;} .l2-qbar i{display:block;height:100%;background:var(--t);border-radius:8px;transition:width .4s;}',
'.l2-qq{background:var(--card);border:1px solid var(--ln);border-radius:24px;padding:26px;} .l2-qq h2{margin:0 0 18px;font-size:clamp(21px,2.4vw,30px);font-weight:900;line-height:1.6;color:var(--hd);}',
'.l2-opts{display:grid;grid-template-columns:1fr 1fr;gap:10px;} .l2-opts .op{all:unset;box-sizing:border-box;cursor:pointer;display:flex;gap:12px;align-items:center;min-height:64px;padding:10px 14px;border-radius:16px;border:2px solid var(--ln);background:var(--bg);font-size:16.5px;font-weight:800;line-height:1.6;color:var(--ink);transition:border-color .15s;}',
'.l2-opts .op:hover:not([disabled]){border-color:var(--t);} .l2-opts .op .l{width:36px;height:36px;border-radius:10px;background:var(--soft);display:grid;place-items:center;font-weight:900;color:var(--t);flex-shrink:0;}',
'.l2-opts .op.ok{border-color:#5FB58A;background:#E3F4EC;} .l2-opts .op.ok .l{background:#2F8F5B;color:#fff;} .l2-opts .op.no{border-color:#E3A9B6;background:var(--r1);} .l2-opts .op.no .l{background:var(--r);color:#fff;} .l2-opts .op.off{opacity:.5;} .l2-opts .op[disabled]{cursor:default;}',
'.l2-wrap.big .l2-qq h2{font-size:40px;} .l2-wrap.big .l2-opts .op{font-size:24px;min-height:90px;}',
'.l2-res{display:grid;justify-items:center;gap:12px;text-align:center;padding:40px 10px;background:var(--card);border:1px solid var(--ln);border-radius:24px;} .l2-res h2{margin:0;font-size:28px;color:var(--hd);} .l2-res p{margin:0;font-size:15px;font-weight:700;color:var(--mu);} .l2-res .bt{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:6px;}',
/* labs */
'.l2-lh{display:grid;grid-template-columns:auto 1fr auto;gap:18px;align-items:center;background:var(--g1);border:1.5px solid var(--g2);border-radius:24px;padding:22px 24px;margin-bottom:16px;} .l2-lh .ic{width:68px;height:68px;border-radius:20px;background:var(--card);color:var(--g);display:grid;place-items:center;}',
'.l2-lh h1{margin:0 0 4px;font-family:"Reem Kufi",Cairo;font-size:32px;color:var(--hd);} .l2-lh p{margin:0;font-size:14.5px;font-weight:700;line-height:1.9;color:var(--ink);} .l2-lh .r{text-align:center;} .l2-lh .r b{display:block;font-size:28px;color:var(--t);} .l2-lh .r small{font-size:12px;font-weight:800;color:var(--mu);}',
'.l2-cases{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;} .l2-cases button{all:unset;box-sizing:border-box;cursor:pointer;position:relative;display:grid;gap:8px;align-content:start;background:var(--card);border:1.5px solid var(--ln);border-radius:18px;padding:14px 16px;transition:transform .2s,border-color .2s;}',
'.l2-cases button:hover{transform:translateY(-3px);border-color:var(--t2);} .l2-cases em{font-style:normal;font-size:11.5px;font-weight:900;color:var(--g);} .l2-cases b{font-size:15.5px;font-weight:900;line-height:1.7;color:var(--hd);padding-inline-end:22px;}',
'.l2-cases .tg{display:inline-flex;gap:6px;align-items:center;width:max-content;max-width:100%;font-size:12px;font-weight:800;color:var(--t);background:var(--t1);border-radius:20px;padding:3px 10px;} .l2-cases .ck{position:absolute;top:12px;inset-inline-end:12px;width:24px;height:24px;border-radius:50%;background:var(--t);color:#fff;display:grid;place-items:center;}',
'.l2-cases button.dn{background:#F6FBFA;border-color:var(--t2);} body.dark-mode #hh-learn .l2-cases button.dn{background:var(--t1);}',
'.l2-cs{display:flex;gap:6px;margin-bottom:16px;} .l2-cs button{all:unset;cursor:pointer;flex:1;display:grid;gap:6px;justify-items:center;font-size:12.5px;font-weight:900;color:var(--mu);} .l2-cs button i{width:100%;height:6px;border-radius:6px;background:var(--soft);} .l2-cs button.dn i{background:var(--t2);} .l2-cs button.on i{background:var(--t);} .l2-cs button.on{color:var(--t);}',
'.l2-cb{animation:l2in .35s both;}',
'.l2-scene{display:flex;gap:16px;align-items:flex-start;background:var(--card);border:1px solid var(--ln);border-radius:22px;padding:22px;} .l2-scene .ic{width:60px;height:60px;border-radius:18px;background:var(--g1);color:var(--g);display:grid;place-items:center;flex-shrink:0;}',
'.l2-scene small{font-size:12.5px;font-weight:900;color:var(--g);} .l2-scene h2{margin:4px 0 8px;font-size:clamp(21px,2.4vw,30px);line-height:1.6;color:var(--hd);} .l2-scene p{margin:0;font-size:17px;font-weight:600;line-height:2.05;}',
'.l2-guess{margin-top:14px;background:var(--t1);border-radius:18px;padding:16px;display:grid;gap:10px;} .l2-guess b{font-size:16px;color:var(--hd);} .l2-guess div{display:flex;gap:10px;flex-wrap:wrap;} .l2-guess button{all:unset;cursor:pointer;display:inline-flex;gap:8px;align-items:center;background:var(--card);border:2px solid var(--ln);border-radius:14px;padding:10px 16px;font-weight:900;font-size:15px;color:var(--hd);}',
'.l2-guess button.on{border-color:var(--t);color:var(--t);} .l2-guess small{font-size:14px;font-weight:800;color:var(--t);}',
'.l2-lens{border-radius:22px;padding:20px;border:1.5px solid var(--ln);background:var(--card);} .l2-lens h3{margin:0 0 10px;display:flex;gap:8px;align-items:center;font-size:20px;color:var(--hd);} .l2-lens .sub{margin:0 0 12px;font-size:14px;font-weight:700;color:var(--mu);line-height:1.8;}',
'.l2-lens.th{border-style:dashed;} .l2-lens .cl{margin:0 0 12px;font-family:Amiri,serif;font-size:21px;line-height:1.9;color:var(--ink);} .l2-lens .ans{display:grid;gap:6px;background:var(--soft);border-radius:16px;padding:16px;} .l2-lens .ans small{font-size:13px;font-weight:800;color:var(--mu);} .l2-lens .ans b{font-size:23px;color:var(--hd);line-height:1.6;}',
'.l2-lens .stamp{justify-self:start;font-size:12px;font-weight:900;color:var(--r);border:2px solid #E3A9B6;background:var(--card);border-radius:8px;padding:2px 10px;transform:rotate(-4deg);}',
'.l2-lens .ask{display:flex;gap:8px;align-items:center;margin:14px 0 0;font-size:15px;font-weight:900;color:var(--t);}',
'.l2-lens.md{border-color:var(--t2);background:#F6FBFA;} body.dark-mode #hh-learn .l2-lens.md{background:var(--t1);}',
'.l2-lens .pl{background:var(--card);border:1px solid var(--ln);border-inline-start:5px solid var(--k);border-radius:16px;padding:12px 14px;margin-bottom:10px;} .l2-lens .pl .h{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;} .l2-lens .pl .h b{font-size:16px;color:var(--k);} .l2-lens .pl .h small{font-size:12px;font-weight:800;color:var(--mu);}',
'.l2-lens .qq{display:flex;gap:10px;align-items:center;padding:6px 0;border-top:1px dashed var(--soft);font-size:15px;font-weight:800;line-height:1.7;} .l2-lens .qq > span:first-child{flex:1;} .l2-lens .sg{display:flex;background:var(--soft);border-radius:10px;padding:3px;flex-shrink:0;}',
'.l2-lens .sg button{all:unset;cursor:pointer;padding:5px 10px;border-radius:8px;font-size:12.5px;font-weight:900;color:var(--mu);} .l2-lens .sg button.on{background:var(--t);color:#fff;} .l2-lens .na{margin:0;font-size:13.5px;font-weight:700;color:var(--mu);}',
'.l2-lens .meter{display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;margin-top:12px;font-size:14px;font-weight:900;color:var(--hd);} .l2-lens .meter i{height:12px;border-radius:12px;background:var(--soft);overflow:hidden;} .l2-lens .meter em{display:block;height:100%;background:var(--t);border-radius:12px;transition:width .3s;}',
'.l2-auth{background:var(--card);border:1px solid var(--ln);border-radius:22px;padding:22px 24px;} .l2-auth small{display:flex;gap:6px;align-items:center;font-size:12.5px;font-weight:900;color:var(--g);} .l2-auth blockquote{margin:10px 0;font-family:Amiri,serif;font-size:23px;font-weight:700;line-height:2;color:var(--hd);} .l2-auth > span{font-size:13px;font-weight:800;color:var(--mu);}',
'.l2-twin{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;} .l2-twin div{border-radius:18px;padding:14px 16px;background:var(--soft);display:grid;gap:4px;} .l2-twin div.m{background:var(--t1);} .l2-twin small{font-size:12px;font-weight:900;color:var(--mu);} .l2-twin b{font-size:16px;color:var(--hd);line-height:1.6;} .l2-twin em{font-style:normal;font-size:13px;font-weight:900;color:var(--t);}',
'.l2-wrap.big .l2-scene h2{font-size:40px;} .l2-wrap.big .l2-scene p,.l2-wrap.big .l2-lens .qq{font-size:22px;} .l2-wrap.big .l2-auth blockquote{font-size:32px;} .l2-wrap.big .l2-lens .ans b{font-size:32px;}',
'.l2-stg{display:flex;gap:12px;align-items:center;margin-bottom:14px;} .l2-stg b{flex:1;font-size:16px;color:var(--hd);}',
/* gloss */
'.l2-gs{display:flex;gap:10px;align-items:center;height:52px;border:1.5px solid var(--ln);border-radius:16px;background:var(--card);padding:0 14px;color:var(--mu);margin-bottom:14px;} .l2-gs input{flex:1;border:0;outline:0;background:transparent;font-family:Cairo,sans-serif;font-weight:800;font-size:16px;color:var(--ink);}',
'.l2-gl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;} .l2-gl .gi{background:var(--card);border:1px solid var(--ln);border-radius:16px;padding:14px 16px;} .l2-gl .gi b{display:block;font-size:17px;font-weight:900;color:var(--t);} .l2-gl .gi b em{font-style:normal;font-size:12.5px;color:var(--mu);font-weight:800;}',
'.l2-gl .gi p{margin:6px 0 0;font-size:15px;font-weight:600;line-height:2;color:var(--ink);} .l2-emp{grid-column:1/-1;text-align:center;font-weight:900;color:var(--mu);padding:30px;}',
'.l2c{margin-top:6px;} .l2c .cr{border-color:#1F6F7A !important;} .l2c h1{color:#123C44 !important;} .l2-ca{display:flex;justify-content:center;margin-top:16px;}',
'.l2d .dh{background:linear-gradient(135deg,#1F6F7A,#123C44) !important;} .l2d .g i{background:#1F6F7A !important;}',
'@media (max-width:1100px){ .l2-map{grid-template-columns:repeat(4,minmax(0,1fr));} .l2-cases{grid-template-columns:repeat(2,minmax(0,1fr));} }',
'@media (max-width:760px){ .l2-wrap{padding:14px 12px 50px;} .l2-hero{grid-template-columns:1fr;padding:24px 18px;} .l2-hero h1{font-size:34px;} .l2-hero .wm{font-size:80px;} .l2-hero .q3{max-width:250px;} .l2-hero .q3 .n{width:92px;height:92px;font-size:13px;}',
'  .l2-au{grid-template-columns:auto 1fr;} .l2-au .pr{grid-column:1/-1;grid-template-columns:auto auto;justify-content:start;align-items:center;} .l2-map{grid-template-columns:repeat(2,minmax(0,1fr));} .l2-tri,.l2-cases,.l2-gl,.l2-ex,.l2-qu,.l2-opts,.l2-twin{grid-template-columns:minmax(0,1fr);}',
'  .l2-rd{grid-template-columns:minmax(0,1fr);} .l2-toc{display:none;} .l2-pg{padding:20px 16px;} .l2-pg h2{font-size:25px;} .l2-key{font-size:20px;padding:14px 16px;} .l2-p{font-size:16.5px;line-height:2.05;} .l2-chbar span{font-size:9px;}',
'  .l2-act .bins{grid-template-columns:minmax(0,1fr);} .l2-act .mt{grid-template-columns:minmax(0,1fr);} .l2-lh{grid-template-columns:auto 1fr;} .l2-lh .r{grid-column:1/-1;} .l2-lh h1{font-size:24px;} .l2-scene{flex-direction:column;}',
'  .l2-lens .qq{flex-wrap:wrap;} .l2-mode{width:100%;} .l2-mode button{flex:1;justify-content:center;padding:8px 4px;font-size:12.5px;} .l2-nav .l2-b{padding:0 12px;} .l2-qq{padding:18px 14px;} }',
'.l2-why{margin-top:14px;background:var(--t1);border-inline-start:4px solid var(--t);border-radius:12px;padding:10px 14px;font-size:15px;font-weight:700;line-height:1.9;color:var(--ink);animation:l2in .3s both;} .l2-why b{color:var(--t);margin-inline-end:6px;} .l2-why small{display:block;font-size:12px;font-weight:800;color:var(--mu);} .l2-wrap.big .l2-why{font-size:22px;}',
'.l2-lbt{display:flex;gap:8px;flex-wrap:wrap;} .l2-lbt .l2-b{height:40px;padding:0 14px;font-size:13.5px;}',
'.l2-ldr{position:relative;border:1px solid var(--ln);border-radius:28px;padding:26px 22px 18px;background:linear-gradient(180deg,#F3F6EF,var(--card) 60%);} body.dark-mode #hh-learn .l2-ldr{background:linear-gradient(180deg,#1C2E2C,var(--card) 60%);}',
'.l2-ldr .steps{display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr));gap:10px;align-items:end;}',
'.l2-ldr .st{all:unset;box-sizing:border-box;cursor:pointer;position:relative;display:flex;flex-direction:column;gap:6px;min-height:calc(190px + var(--h));min-width:0;background:var(--card);border:1.5px solid var(--ln);border-radius:18px;padding:12px 10px;transition:transform .2s,border-color .2s,box-shadow .2s;}',
'.l2-ldr .st:hover,.l2-ldr .st.on{transform:translateY(-4px);border-color:var(--t);box-shadow:0 12px 26px rgba(31,111,122,.14);} .l2-ldr .st:focus-visible{outline:3px solid var(--g);outline-offset:2px;}',
'.l2-ldr .st .no{width:26px;height:26px;border-radius:50%;background:var(--t1);color:var(--t);display:grid;place-items:center;font-size:12px;font-weight:900;} .l2-ldr .st em{font-style:normal;font-size:11px;font-weight:900;color:var(--g);} .l2-ldr .st b{font-size:13.5px;font-weight:900;line-height:1.6;color:var(--hd);}',
'.l2-ldr .st .a{margin-top:auto;font-family:Amiri,serif;font-size:15.5px;line-height:1.6;color:var(--t);border-top:1px dashed var(--ln);padding-top:6px;} .l2-ldr .st .ck{position:absolute;top:12px;inset-inline-end:10px;width:20px;height:20px;border-radius:50%;background:var(--t);color:#fff;display:grid;place-items:center;}',
'.l2-ldr .st.last{background:#13434D;border-color:#13434D;} .l2-ldr .st.last b,.l2-ldr .st.last em{color:#EBD49A;} .l2-ldr .st.last .a{color:#fff;border-color:rgba(255,255,255,.2);} .l2-ldr .st.last .no{background:rgba(255,255,255,.12);color:#EBD49A;} .l2-ldr .st.last.on{border-color:#EBD49A;} .l2-ldr .st.last .ck{background:#EBD49A;color:#13434D;}',
'body.dark-mode #hh-learn .l2-ldr .st.last{background:#0F3940;border-color:#2C5153;}',
'.l2-ldr .thesis{display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap;margin-top:16px;font-weight:900;font-size:15px;color:var(--hd);} .l2-ldr .thesis span{background:var(--g1);border:1px solid var(--g2);border-radius:12px;padding:6px 12px;} .l2-ldr .thesis span.m{background:var(--t1);border-color:var(--t2);} .l2-ldr .thesis i{color:var(--t);display:grid;} .l2-ldr .thesis small{flex-basis:100%;text-align:center;font-size:11.5px;font-weight:800;color:var(--mu);}',
'.l2-stc{margin-top:12px;background:var(--card);border:1px solid var(--ln);border-inline-start:6px solid var(--t);border-radius:18px;padding:14px 18px;animation:l2in .3s both;} .l2-stc em{font-style:normal;font-size:12px;font-weight:900;color:var(--t);} .l2-stc > b{display:block;font-size:19px;color:var(--hd);margin:2px 0 4px;}',
'.l2-stc .q{display:flex;gap:6px;align-items:flex-start;margin:0 0 8px;font-size:14.5px;font-weight:800;color:var(--mu);line-height:1.8;} .l2-stc .q svg{margin-top:5px;} .l2-stc blockquote{margin:0 0 10px;font-family:Amiri,serif;font-size:22px;font-weight:700;line-height:1.85;color:var(--hd);}',
'.l2-stc .ft{display:flex;gap:10px;align-items:center;flex-wrap:wrap;} .l2-stc .ft .pr{width:120px;height:6px;border-radius:6px;background:var(--soft);overflow:hidden;} .l2-stc .ft .pr i{display:block;height:100%;background:var(--t);} .l2-stc .ft small{flex:1;min-width:140px;font-size:12.5px;font-weight:800;color:var(--mu);} .l2-stc .ft .l2-b{height:40px;font-size:14px;}',
'.l2-ldr.big .st{min-height:calc(250px + var(--h) * 1.3);} .l2-ldr.big .st b{font-size:17px;} .l2-ldr.big .st .a{font-size:19px;} .l2-ldr.big .thesis{font-size:19px;} .l2-wrap.big .l2-stc blockquote{font-size:30px;} .l2-wrap.big .l2-stc > b{font-size:26px;} .l2-wrap.big .l2-stc .q{font-size:19px;}',
'.l2-tri.l2-tri2{grid-template-columns:repeat(2,minmax(0,1fr));margin:0 0 16px;}',
'.l2-cases button{grid-template-columns:minmax(0,1fr);} .l2-cases .tg{width:auto;justify-self:start;}',
'.l2-pad{margin-top:10px;scroll-margin-top:12px;} .l2-pdb{background:var(--card);border:1px solid var(--ln);border-radius:22px;padding:18px;} .l2-pdb .df{display:flex;gap:8px;align-items:flex-start;margin:0 0 12px;font-family:Amiri,serif;font-size:17px;line-height:1.8;color:var(--hd);} .l2-pdb .df svg{color:var(--g);margin-top:6px;}',
'.l2-pdb .who{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.6fr);gap:10px;margin-bottom:12px;} .l2-pdb label{display:grid;gap:4px;min-width:0;} .l2-pdb label > span{font-size:13px;font-weight:900;color:var(--hd);}',
'.l2-pdb input,.l2-pdb textarea{box-sizing:border-box;width:100%;max-width:100%;border:1.5px solid var(--ln);border-radius:12px;padding:9px 12px;font-family:Cairo,sans-serif;font-size:14.5px;font-weight:700;color:var(--ink);background:var(--bg);outline:0;} .l2-pdb input:focus,.l2-pdb textarea:focus{border-color:var(--t);box-shadow:0 0 0 3px var(--t2);} .l2-pdb textarea{resize:vertical;min-height:58px;line-height:1.8;} .l2-pdb ::placeholder{color:var(--mu);opacity:.8;}',
'.l2-pdb .gl{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;font-size:13.5px;font-weight:900;color:var(--hd);} .l2-pdb .gl button{all:unset;cursor:pointer;padding:7px 14px;border-radius:11px;border:1.5px solid var(--ln);background:var(--bg);font-size:13.5px;font-weight:900;color:var(--mu);} .l2-pdb .gl button.on{background:var(--t);border-color:var(--t);color:#fff;} .l2-pdb .gl button:focus-visible,.l2-pdb .mc button:focus-visible{outline:3px solid var(--g);outline-offset:2px;}',
'.l2-pdb .cv3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;} .l2-pdb .pc{border-radius:16px;padding:12px;background:var(--soft);border-top:4px solid var(--k);display:grid;gap:10px;align-content:start;min-width:0;}',
'.l2-pdb .pc .h b{display:block;font-size:18px;color:var(--k);} body.dark-mode #hh-learn .l2-pdb .pc .h b{color:color-mix(in srgb,var(--k) 55%,#fff);} .l2-pdb .pc .h small{font-size:11.5px;font-weight:800;color:var(--mu);} .l2-pdb .f > small,.l2-pdb .mc small{font-family:Amiri,serif;font-size:14px;font-weight:400;line-height:1.7;color:var(--mu);}',
'.l2-pdb .mc{display:grid;gap:6px;} .l2-pdb .mc button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;gap:2px;background:var(--card);border:1.5px solid var(--ln);border-radius:12px;padding:8px 10px;} .l2-pdb .mc button b{font-size:14.5px;color:var(--hd);} .l2-pdb .mc button.on{border-color:var(--k);box-shadow:0 0 0 2px var(--k);}',
'.l2-pv{margin-top:12px;display:grid;gap:8px;} .l2-pv .hd{display:flex;gap:8px;align-items:center;font-size:17px;font-weight:900;color:var(--hd);} .l2-pv .hd.e{font-size:14.5px;color:var(--mu);} .l2-pv .hd i{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;color:#fff;background:var(--t);} .l2-pv .hd.no i{background:var(--g);}',
'.l2-pv .mt{display:grid;grid-template-columns:110px minmax(0,1fr) 46px;gap:10px;align-items:center;font-size:13.5px;font-weight:800;color:var(--ink);} .l2-pv .mt i{height:12px;border-radius:12px;background:var(--soft);overflow:hidden;} .l2-pv .mt em{display:block;height:100%;background:var(--k);border-radius:12px;transition:width .3s;} .l2-pv .mt b{color:var(--hd);}',
'.l2-pv .ms{display:flex;gap:6px;align-items:flex-start;margin:0;font-size:13px;font-weight:800;line-height:1.8;color:var(--r);} .l2-pv .ms svg{margin-top:4px;} body.dark-mode #hh-learn .l2-pv .ms{color:#E7A2B2;}',
'.l2-pv blockquote{margin:0;font-family:Amiri,serif;font-size:17px;line-height:1.85;color:var(--hd);background:var(--t1);border-inline-start:4px solid var(--t);border-radius:12px;padding:8px 12px;} .l2-pv blockquote small{display:block;font-family:Cairo,sans-serif;font-size:11.5px;font-weight:800;color:var(--t);}',
'.l2-pdb .bt{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;}',
'.l2-pc{margin-top:12px;background:var(--card);border:1.5px solid var(--t2);border-radius:20px;padding:16px 18px;color:var(--ink);} .l2-pc .ph small{font-size:11.5px;font-weight:900;color:var(--t);} .l2-pc .ph b{display:block;font-size:20px;color:var(--hd);overflow-wrap:anywhere;} .l2-pc .ph span{display:block;font-size:14.5px;font-weight:700;overflow-wrap:anywhere;} .l2-pc .ph em{display:inline-block;margin-top:6px;font-style:normal;font-size:12px;font-weight:900;color:var(--g);background:var(--g1);border-radius:20px;padding:2px 10px;} .l2-pc .cols{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:10px;} .l2-pc .col{background:var(--soft);border-top:4px solid var(--k);border-radius:12px;padding:8px 10px;min-width:0;} .l2-pc .col > b{font-size:14.5px;color:var(--hd);} .l2-pc ul{margin:4px 0 0;padding:0;list-style:none;display:grid;gap:4px;} .l2-pc li{font-size:13px;font-weight:700;line-height:1.7;overflow-wrap:anywhere;} .l2-pc li em{display:block;font-style:normal;font-size:11.5px;font-weight:900;color:var(--mu);} .l2-pc .e{color:var(--mu);font-weight:600;} .l2-pc .vr{margin-top:10px;border-radius:12px;padding:8px 12px;background:var(--t1);} .l2-pc .vr.no{background:var(--g1);} .l2-pc .vr b{font-size:15px;color:var(--hd);} .l2-pc .vr small{display:block;font-size:12.5px;font-weight:800;color:var(--mu);line-height:1.8;} .l2-pc .pf{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-top:10px;font-size:11.5px;font-weight:800;color:var(--mu);}',
'body.dark-mode #hh-learn.ln2 .l2-b.p,body.dark-mode #hh-learn.ln2 .l2-pdb .gl button.on{color:#0E2A2E;} body.dark-mode #hh-learn.ln2 .l2-pv .hd i,body.dark-mode #hh-learn.ln2 .l2-ldr .st .ck{color:#0E2A2E;}',
'body.dark-mode #hh-learn.ln2 .l2-opts .op.ok,body.dark-mode #hh-learn.ln2 .l2-act .ch.ok,body.dark-mode #hh-learn.ln2 .l2-act .mi.ok{background:#1D3A2D;border-color:#3E8F66;color:var(--ink);} body.dark-mode #hh-learn.ln2 .l2-act .res.ok{background:#1D3A2D;color:#9FDDBC;}',
'.l2-vh{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:12px;align-items:center;background:var(--card);border:1px solid var(--ln);border-radius:22px;padding:16px;} .l2-vh .l2-ib[disabled]{opacity:.35;cursor:default;} .l2-vh small{font-size:12.5px;font-weight:900;color:var(--g);}',
'.l2-vh h2{margin:2px 0 6px;font-size:clamp(20px,2.4vw,32px);line-height:1.5;color:var(--hd);} .l2-vh p{margin:0;font-size:clamp(15px,1.5vw,20px);font-weight:600;line-height:1.9;color:var(--ink);}',
'.l2-vr{display:flex;gap:6px;margin:14px 0;} .l2-vr span{flex:1;text-align:center;font-size:12.5px;font-weight:900;color:var(--mu);border-top:5px solid var(--soft);padding-top:6px;} .l2-vr span.on{color:var(--t);border-color:var(--t);} .l2-vr span.dn{border-color:var(--t2);}',
'.l2-vq{text-align:center;font-size:clamp(17px,2vw,26px);font-weight:900;color:var(--hd);margin:14px 0 12px;line-height:1.6;} .l2-vq small{display:block;font-size:13px;font-weight:800;color:var(--mu);}',
'.l2-vt{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;} .l2-vt .tl{background:var(--card);border:1.5px solid var(--ln);border-top:6px solid var(--k);border-radius:22px;padding:16px 12px;display:grid;justify-items:center;gap:8px;text-align:center;min-width:0;} .l2-vt .tl > b{display:flex;gap:8px;align-items:center;font-size:clamp(15px,1.8vw,22px);line-height:1.5;color:var(--hd);}',
'.l2-vt .n{font-size:clamp(54px,7vw,96px);font-weight:900;line-height:1;color:var(--k);font-variant-numeric:tabular-nums;} body.dark-mode #hh-learn .l2-vt .n{color:color-mix(in srgb,var(--k) 60%,#fff);}',
'.l2-vt .pm{display:flex;gap:10px;} .l2-vt .pm button{all:unset;cursor:pointer;width:56px;height:56px;border-radius:16px;display:grid;place-items:center;font-size:30px;font-weight:900;background:var(--soft);color:var(--hd);} .l2-vt .pm button.p{background:var(--k);color:#fff;} .l2-vt .pm button[disabled]{opacity:.35;cursor:default;} .l2-vt .pm button:focus-visible{outline:3px solid var(--g);outline-offset:2px;} .l2-vt .tl small{font-size:11.5px;font-weight:800;color:var(--mu);}',
'.l2-vres{display:grid;gap:12px;margin-top:14px;background:var(--card);border:1px solid var(--ln);border-radius:22px;padding:18px;} .l2-vres .r{display:grid;grid-template-columns:150px minmax(0,1fr) 60px;gap:12px;align-items:center;font-size:15px;font-weight:900;color:var(--hd);}',
'.l2-vres .r i{height:28px;border-radius:10px;background:var(--soft);overflow:hidden;} .l2-vres .r em{display:block;height:100%;background:var(--k);border-radius:10px;transition:width .5s;} .l2-vres p{margin:0;font-size:14px;font-weight:800;color:var(--mu);} .l2-vres p.ch{font-size:18px;font-weight:900;color:var(--t);}',
'.l2-vb{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:14px;} .l2-vnt{margin:14px 0 0;text-align:center;font-size:12.5px;font-weight:700;color:var(--mu);} .l2-wrap.big .l2-vh ~ .l2-auth,.l2-wrap.big .l2-vr + .l2-auth{margin-top:4px;}',
'@media (max-width:1000px){ .l2-ldr{padding:14px;} .l2-ldr .steps{grid-template-columns:minmax(0,1fr);gap:8px;} .l2-ldr .st,.l2-ldr.big .st{min-height:0;display:grid;grid-template-columns:auto minmax(0,1fr);gap:2px 12px;align-items:start;padding:12px 12px 12px 36px;} .l2-ldr .st:hover,.l2-ldr .st.on{transform:none;} .l2-ldr .st .no{grid-row:span 3;} .l2-ldr .st .a{margin-top:4px;} .l2-ldr .st .ck{inset-inline-end:auto;left:10px;} }',
'@media (max-width:760px){ .l2-tri.l2-tri2,.l2-pdb .who,.l2-pdb .cv3,.l2-pc .cols{grid-template-columns:minmax(0,1fr);} .l2-pdb{padding:14px 12px;} .l2-pc{padding:14px 12px;} .l2-pv .mt{grid-template-columns:92px minmax(0,1fr) 42px;font-size:12.5px;} .l2-stc{padding:12px 14px;} .l2-stc blockquote{font-size:19px;} .l2-ldr .thesis{font-size:13.5px;}',
'  .l2-vh{grid-template-columns:auto minmax(0,1fr) auto;padding:12px 10px;gap:8px;} .l2-vh .l2-ib{width:36px;height:36px;} .l2-vt{gap:8px;} .l2-vt .tl{padding:12px 8px;} .l2-vt .pm button{width:48px;height:48px;} .l2-vr span{font-size:11px;} .l2-vres .r{grid-template-columns:92px minmax(0,1fr) 44px;font-size:13px;} }'
].join('\n');
function style(){ if($('hh-learn2-css')) return; var s=document.createElement('style'); s.id='hh-learn2-css'; s.textContent=CSS; document.head.appendChild(s); }
window.hhLn2Style=style;
window.hhLn2Info=function(){ var b=B(); if(!b) return null; if(!ST) loadST(); var pc=totalProg(), L=ST.last&&b.chapters[ST.last.ci]?ST.last:null, c=L?b.chapters[L.ci]:null, si=L?Math.min(L.si,c.sections.length-1):0, rd=Object.keys(ST.read).length, ns=0; b.chapters.forEach(function(x){ ns+=x.sections.length; });
  return {id:'nmodel',n:'البرنامج الثاني',cat:'th',aud:'عام',title:b.title,cover:'<b>التفكير بالنظرية<br>أم التفكير<br>بالنموذج؟</b><small>'+esc(b.author)+'</small>',mini:'التفكير بالنظرية أم بالنموذج؟',au:b.author+'، '+b.pub,
    st:[[b.chapters.length,'محطات'],[b.labs.length,'حالة في المختبر'],[b.concepts.length,'مصطلحاً']],pct:pc,t:ST.t||0,tone:'t',open:'hhLn2Open()',scr:"hhLnScr('nmodel')",
    res:L?{h:CHS[c.k]+'، الفقرة '+(si+1)+' من '+c.sections.length,x:c.sections[si].t,go:'hhLn2Open(\'ch\','+L.ci+');hhLn2Sec('+si+')',k:[[pc+'%','تقدمك'],[rd+'/'+ns,'فقرة قرأتها'],[Object.keys(ST.labs).length,'حالة حللتها']]}:null}; };
window._hhLn2=function(){ return {V:V,ST:ST}; };
})();
