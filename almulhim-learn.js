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
 link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',boxes:'<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/>',plus:'<path d="M12 5v14M5 12h14"/>',scale:'<path d="M12 3v18M5 21h14M6 7h12M6 7l-3 7a3 3 0 0 0 6 0zM18 7l-3 7a3 3 0 0 0 6 0z"/>',fire:'<path d="M12 22c4 0 7-3 7-7 0-5-5-7-5-12-3 2-5 5-5 8-1-1-2-2-2-4-2 2-2 5-2 8 0 4 3 7 7 7z"/>'};
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
function saveST(){ try{ if(window.hhLearnBoardPush&&V.bk==='mala'){ var _B=book(), _p=0, _q={}; _B.secs.forEach(function(s){ var v=ST.quiz[s.k]; if(v!=null) _q[s.k]=v; if((v||0)>=70) _p++; }); hhLearnBoardPush('mala',_B.title,Math.round(totalSeen()/_B.n*100),_p,_B.secs.length,_q); } }catch(e){} ST.t=Date.now(); try{ localStorage.setItem(stKey(),JSON.stringify(ST)); }catch(e){}
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
  var stage=(V.mode==='screen'&&(V.view==='lesson'||V.view==='quiz'))||(V.view==='map'&&!!V.mapScr);
  h.className='ln'+(stage?' ln-stg':'')+(V.view==='lesson'||V.view==='quiz'||V.view==='review'?' ln-dk':'');
  document.body.classList.toggle('ln-stage',stage);
  var body=V.view==='home'?vHome():!B?'<div class="ln-wrap"><div class="ln-emp">البرنامج غير محمّل</div></div>':V.view==='book'?vBook():V.view==='sec'?vSec():V.view==='lesson'?vLesson():V.view==='quiz'?vQuiz():V.view==='review'?vReview():V.view==='cert'?vCert():V.view==='map'?vMap():V.view==='wird'?vWird():V.view==='listen'?vListen():vHome();
  h.innerHTML=body; bind(h);
}
function crumbs(L){ return '<nav class="ln-cr" aria-label="مسار التنقل">'+L.map(function(x,i){ return i<L.length-1?'<button type="button" onclick="'+x[1]+'">'+esc(x[0])+'</button><span>›</span>':'<b>'+esc(x[0])+'</b>'; }).join('')+'</nav>'; }
function cover(B,big){ return '<div class="ln-cov'+(big?' big':'')+'"><span class="sp"></span><b>ما لا يسع<br>أطفال المسلمين<br>جهله</b><small>'+esc(B.author)+'</small></div>'; }

/* الصفحة الأولى: تعلّم */
/* صفحة قسم «تعلّم» بثلاثة تبويبات: التعلم الذاتي، الكتب التربوية، المواضيع القيادية (zzcy) */
P.doc='<path d="M14 3v5h5M14 3H6v18h12V8z"/><path d="M9 13h6M9 17h4"/>';
P.hand='<path d="M7 11V6a2 2 0 1 1 4 0v5M11 10V4a2 2 0 1 1 4 0v6M15 10V6a2 2 0 1 1 4 0v8a7 7 0 0 1-14 0v-3a2 2 0 1 1 4 0"/>';
P.bulb='<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>';
P.chat='<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>';
P.search='<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>';
P.users='<circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14a5 5 0 0 1 6 5"/>';
P.lead='<path d="M12 2l2.6 6.2 6.4.5-4.9 4.2 1.5 6.3L12 15.9 6.4 19.2l1.5-6.3L3 8.7l6.4-.5z"/>';
P.wheel='<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/><path d="M12 3v6.5M12 14.5V21M3 12h6.5M14.5 12H21"/>';
P.flag='<path d="M5 21V4h11l-2 4 2 4H5"/>';
P.chart='<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>';
P.board='<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20l4-4 4 4"/>';
var HCAT={sh:['العلوم الشرعية','moon'],th:['الفكر والتحليل','scale'],pro:['النمو المهني','heart']}, HF='all';
function malaInfo(){ var L=window.HH_LEARN||{}, B=L.mala; if(!B) return null; var s=null; try{ s=JSON.parse(localStorage.getItem('hh_learn_mala')||'null'); }catch(e){} s=s||{};
  var seen=Object.keys(s.seen||{}).length, pc=Math.round(seen/B.n*100), d=today(), due=0, sk=0, dd=d;
  Object.keys(s.mem||{}).forEach(function(k){ if(s.mem[k][1]<=d) due++; }); var D=s.days||{}; if(!D[dd]) dd--; while(D[dd]){ sk++; dd--; }
  var L2=s.last&&B.secs[s.last.si]?s.last:null, S=L2?B.secs[L2.si]:null, qi=L2?Math.min(L2.qi,S.qs.length-1):0;
  return {id:'mala',n:'البرنامج الأول',cat:'sh',aud:'للأطفال والناشئة',title:B.title,cover:'<b>ما لا يسع<br>أطفال المسلمين<br>جهله</b><small>'+esc(B.author)+'</small>',mini:'ما لا يسع أطفال المسلمين جهله',
    au:B.author+'، من '+B.src,st:[[B.secs.length,'فنون'],[B.n,'سؤالاً'],['','شهادة','badge']],pct:pc,t:s.t||0,tone:'p',
    open:"hhLnGo('book')",scr:"hhLnScr('mala')",res:L2?{h:S.t+'، السؤال '+(qi+1)+' من '+S.qs.length,x:S.qs[qi].q,go:"hhLnGo('book');hhLnGo('lesson',"+L2.si+","+qi+")",k:[[s.xp||0,'نقطة'],[sk,sk===1?'يوم متتابع':'أيام متتابعة'],[due,'للمراجعة اليوم']]}:null}; }
function progs(){ var L=[], a=malaInfo(); if(a) L.push(a);
  [['hhLn2Info'],['hhLn3Info']].forEach(function(f){ var fn=window[f[0]]; if(typeof fn==='function'){ try{ var x=fn(); if(x) L.push(x); }catch(e){} } });
  return L; }
window.hhLnScr=function(id){ if(id==='mala'){ V.mode='screen'; try{ localStorage.setItem('hh_learn_mode','screen'); }catch(e){} go('book'); } else if(id==='nmodel'&&window.hhLn2Open){ hhLn2Open(); hhLn2Mode('screen'); } else if(id==='burn'&&window.hhLn3Open){ hhLn3Open(); hhLn3Mode('screen'); } };
window.hhLnCat=function(c){ HF=c; render(); };
window.hhLnMalaInfo=malaInfo;
window.hhLnCert=function(){ V.bk='mala'; loadST(); go('cert'); };

/* ═══ الحالة ═══ */
var LTABS={self:['التعلم الذاتي','جرّب، واختر مسارك، وتابع رحلتك','cap'],books:['الكتب التربوية','مكتبة المؤلفين، كل كتاب في محطات','book'],lead:['المواضيع القيادية','برامج موضوعية مركّزة، بأدوات للورش','lead']};
var LT='self'; try{ var _lt=localStorage.getItem('hh_learn_tab'); if(LTABS[_lt]) LT=_lt; }catch(e){}
var TR={i:0,st:0,a:{}}, PO=-1, AUX=0, CRT=0, LEADX={nmodel:1};
function setLT(t){ LT=t; try{ localStorage.setItem('hh_learn_tab',t); }catch(e){} }
function nextTrial(){ var n=0; try{ n=parseInt(localStorage.getItem('hh_learn_trial')||'0',10)||0; localStorage.setItem('hh_learn_trial',String(n+1)); }catch(e){ n=Math.floor(Math.random()*50); } return n; }
var _hlo=window.hhLearnOpen;
window.hhLearnOpen=function(tab){ var t=LTABS[tab]?tab:null; if(t){ setLT(t); setLP(tabPage(t)); } TR={i:nextTrial(),st:0,a:{}}; TB=TR.i%Math.max(1,(LX().trial||[]).length); TOPEN=0; PO=-1; CRT=0; DR.id=''; return _hlo.call(this,t?undefined:tab); };
window.hhLearnTab=function(t){ if(!LTABS[t]) t='self'; setLT(t); if(lpGroup(LP)!==t||desk()) setLP(tabPage(t)); PO=-1; CRT=0; TOPEN=0; var h=$('hh-learn'); if(!h) return hhLearnOpen(t); if(V.view!=='home'||h.classList.contains('lb')||desk()){ go('home'); return; }
  var tb=h.querySelector('.lh6-tabs'), top=tb?tb.offsetTop:0, y=h.scrollTop; render(); h.scrollTop=y>top?top:y; };
function rr(){ var h=$('hh-learn'), y=h?h.scrollTop:0; render(); if(h) h.scrollTop=y; }
function LX(){ return window.HH_LIBX||{books:{},authors:[],cats:{},trial:[],paths:[]}; }
function BMx(id){ return LX().books[id]; }
function rd(k){ try{ return JSON.parse(localStorage.getItem(k)||'null'); }catch(e){ return null; } }
function nAr(n,w){ var W={b:['كتاب واحد','كتابان','كتب','كتاباً'],s:['محطة واحدة','محطتان','محطات','محطة'],p:['مسار واحد','مساران','مسارات','مساراً'],q:['سؤال واحد','سؤالان','أسئلة','سؤالاً'],h:['إضاءة واحدة','إضاءتان','إضاءات','إضاءة'],f:['فن واحد','فنّان','فنون','فناً']}[w];
  return n===1?W[0]:n===2?W[1]:(n%100>=3&&n%100<=10)?n+' '+W[2]:n+' '+W[3]; }
function auName(m){ var a=(LX().authors||[]).filter(function(x){ return x.id===m.aid; })[0]; return a?a.name:(m.author||''); }
function bare(n){ return String(n||'').replace(/^(أ\.د\.|م\.د\.|د\.)\s*/,''); }
function hkey(s){ var h=0; s=String(s); for(var i=0;i<s.length;i++){ h=(h*31+s.charCodeAt(i))|0; } return h; }
function ordOf(n,key){ var a=[]; for(var i=0;i<n;i++) a.push(i); return a.sort(function(x,y){ return hkey(key+x)-hkey(key+y); }); }
function shelf(){ var x=LX(), L=[]; (x.authors||[]).forEach(function(a){ a.books.forEach(function(id){ var m=x.books[id]; if(m&&!LEADX[id]&&L.indexOf(id)<0) L.push(id); }); }); return L; }

/* ═══ أجزاء مشتركة ═══ */
var ORN={edu:'<circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" stroke-width="10"/><circle cx="60" cy="60" r="22" fill="currentColor"/>',tch:'<path d="M10 100 60 20l50 80z" fill="none" stroke="currentColor" stroke-width="10"/>',thk:'<path d="M60 8l14 38h40l-32 24 12 40-34-24-34 24 12-40L6 46h40z" fill="currentColor"/>',sh:'<path d="M60 6l16 26 30 4-22 22 6 30-30-14-30 14 6-30L14 36l30-4z" fill="none" stroke="currentColor" stroke-width="9"/>',lng:'<rect x="14" y="14" width="92" height="92" rx="20" fill="none" stroke="currentColor" stroke-width="10"/>',lit:'<path d="M10 60c25-40 75-40 100 0-25 40-75 40-100 0z" fill="none" stroke="currentColor" stroke-width="10"/>'};
function bcover(m){ var t=m.cv||m.title||''; return '<span class="lh6-cv" style="background:'+m.c+';color:'+(m.ct||'#fff')+'"><svg class="orn" viewBox="0 0 120 120" aria-hidden="true">'+(ORN[m.cat]||'')+'</svg><em>'+esc((LX().cats||{})[m.cat]||'')+'</em><b'+(t.length>22?' class="lg"':'')+'>'+esc(t)+'</b><span class="au">'+esc(bare(auName(m)))+'</span></span>'; }
function mini(m){ return '<span class="lh6-mini" style="background:'+(m&&m.c||'#8A1538')+'"></span>'; }
function recent(){ var A=progs(); try{ var lr=window.hhLibRecent&&hhLibRecent(); if(lr) A.push(lr); }catch(e){} try{ var dd=window.hhDaaInfo&&hhDaaInfo(); if(dd&&dd.res) A.push({id:'daa',title:dd.title,mini:dd.title,c:(BMx('daa')||{}).c,pct:dd.pct,t:dd.t||0,res:dd.res}); }catch(e){} return A.filter(function(p){ return p.res; }).sort(function(a,b){ return b.t-a.t; })[0]||null; }
function daaCard(){ if(typeof window.hhDaaOpen!=='function') return ''; var d={}; try{ d=(window.hhDaaInfo&&hhDaaInfo())||{}; }catch(e){} var p=Math.max(0,Math.min(100,Math.round(+d.pct||0)));
  return '<div class="lh6-daa"><span class="ic">'+sv('spark',26)+'</span><div class="tx"><em>برنامج رئيس</em><h3>'+esc(d.title||'الداء والدواء')+'</h3>'+(d.sub?'<p>'+esc(d.sub)+'</p>':'')+'<div class="pr"><div class="br"><i style="width:'+p+'%"></i></div><span>'+p+'%</span></div></div>'
   +'<button type="button" class="lh6-gb" onclick="hhDaaOpen()">'+sv('play',14)+(p?'تابع البرنامج':'ابدأ البرنامج')+'</button></div>'; }
function tools(){ var nt=(rd('hh_lib_notes')||[]).length;
  return '<div class="lh6-tools">'+[['search','اسأل المكتبة','ابحث في كل الكتب عن جواب سؤالك',"hhLibAskIn('')"],['bulb','دفتر الإضاءات',nt?nt+' عبارة حفظتها':'العبارات التي تحفظها من الكتب',"hhLibGo('notes')"]]
     .concat(isTeacher()?[['users','لوحة الصف','تقدم طلابك في كل برامج «تعلّم»',"hhLibGo('board','')"]]:[]).concat([['plus','اقترح كتاباً','نحوّله إلى برنامج تفاعلي',"hhLnSuggest()"]])
     .map(function(t){ return '<button type="button" onclick="'+t[3]+'"><i>'+sv(t[0],18)+'</i><span><b>'+t[1]+'</b><small>'+esc(t[2])+'</small></span></button>'; }).join('')+'</div>'; }
function sub(ic,t,s){ return '<h3 class="lh6-sub">'+sv(ic,18)+t+(s?' <small>'+s+'</small>':'')+'</h3>'; }

/* ═══ محطة التجربة ═══ */
var TSTEPS=[['q','فكّر','سؤال قبل القراءة'],['book','اقرأ','النص بكلمات المؤلف'],['doc','الدليل','من الصفحة نفسها'],['hand','طبّق','ماذا تفعل لو؟'],['bulb','احفظ','ما تأخذه معك']];
function q2(s){ s=String(s||'').replace(/^[«"\s]+|[»"\s]+$/g,'').replace(/[.،:]\s*$/,''); return '«'+esc(s)+'»'; }
function mcq(o,key,why,pg,sk){ var a=TR.a[key], ord=ordOf(o.length,sk+key);
  return '<div class="lh6-opts" role="group">'+ord.map(function(i,j){ var c=a==null?'':(i===0?' ok':(i===a?' no':' dim')); return '<button type="button" class="lh6-opt'+c+'"'+(a!=null?' aria-disabled="true"':'')+' onclick="hhLhPick(\''+key+'\','+i+')"><span>'+['أ','ب','ج','د','هـ'][j]+'</span>'+esc(o[i])+'</button>'; }).join('')+'</div>'
   +(a!=null&&why?'<div class="lh6-why"><b>'+(a===0?'أحسنت.':'قريب، لكن انظر.')+' لماذا؟</b>'+q2(why)+(pg?'<small>صفحة '+esc(pg)+'</small>':'')+'</div>':''); }
function hasN(b,x){ return (rd('hh_lib_notes')||[]).some(function(n){ return n.b===b&&n.x===x; }); }
function trialBody(s,m){ var k=s.b+s.ci;
  if(TR.st===0) return '<div class="ey">'+sv('q',16)+'فكّر قبل أن تقرأ</div><h3>'+esc(s.th.q)+'</h3>'+mcq(s.th.o,'q',s.th.why,s.th.pg,k);
  if(TR.st===1) return '<div class="ey">'+sv('book',16)+'اقرأ، بكلمات المؤلف</div><h3>'+esc(s.rd.t)+'</h3><blockquote class="lh6-quote">'+q2(s.rd.x)+'<small>صفحة '+esc(s.rd.pg)+'</small></blockquote>'
    +(s.rd.its.length?'<div class="lh6-its">'+s.rd.its.map(function(x,i){ var op=TR.a['it'+i]; return '<button type="button" class="it'+(op?' op':'')+'" aria-expanded="'+(op?'true':'false')+'" onclick="hhLhIt('+i+')"><b>'+esc(x[0])+'<span>'+sv(op?'x':'plus',14,2.4)+'</span></b><p>'+esc(x[1])+'</p></button>'; }).join('')+'</div>':'');
  if(TR.st===2) return '<div class="ey">'+sv('doc',16)+'الدليل من الصفحة</div><h3>'+esc(s.ev.t)+'</h3><div class="lh6-page"><div class="paper">'+q2(s.ev.x)+'<small>صفحة '+esc(s.ev.pg)+'</small></div>'
    +(s.ev.its.length?'<div class="ex">'+s.ev.its.map(function(x,i){ return '<b'+(i?' style="margin-top:12px"':'')+'>'+esc(x[0])+'</b><p>'+esc(x[1])+'</p>'; }).join('')+'</div>':'')+'</div>';
  if(TR.st===3) return '<div class="ey">'+sv('hand',16)+'ماذا تفعل لو؟</div><div class="lh6-scene">'+sv('chat',24)+'<span>'+esc(s.sc.x)+'</span></div>'+mcq(s.sc.o,'s',s.sc.why,s.sc.pg,k);
  var ok=(TR.a.q===0?1:0)+(TR.a.s===0?1:0), sv1=hasN(s.b,s.sv.x);
  return '<div class="ey">'+sv('bulb',16)+'احفظ ما تأخذه معك</div><h3>خلاصة المحطة: '+esc(s.ess)+'</h3><div class="lh6-save"><div class="card">'+q2(s.sv.x)+'<small>«'+esc(m.title)+'»، صفحة '+esc(s.sv.pg)+'</small>'
    +'<button type="button" class="nb'+(sv1?' on':'')+'" onclick="hhLhNote()">'+sv(sv1?'check':'bulb',14,2.2)+(sv1?'في دفتر الإضاءات':'احفظ في دفتر الإضاءات')+'</button></div>'
    +'<div class="sum"><h4>أفكار المحطة في الكتاب</h4><ul>'+s.sv.take.map(function(t){ return '<li>'+esc(t)+'</li>'; }).join('')+'</ul><p class="sc">'+ok+' من 2 إجابات صحيحة</p></div></div>'; }
function trialHTML(){ var L=LX().trial||[]; if(!L.length) return ''; var ix=((TR.i%L.length)+L.length)%L.length, s=L[ix], m=BMx(s.b); if(!m) return '';
  var others=[]; for(var j=1;j<L.length&&others.length<3;j++){ var o=L[(ix+j)%L.length]; if(o.b!==s.b) others.push([(ix+j)%L.length,o]); }
  return '<section class="lh6-stage" aria-label="جرّب محطة من كتاب"><aside class="side"><div class="lb">جرّب الآن، محطة حقيقية من كتاب</div><h2>'+esc(s.t)+'</h2>'
   +'<div class="bk">'+mini(m)+'<div><b>«'+esc(m.title)+'»</b><small>'+esc(auName(m))+'، المحطة '+(s.ci+1)+' من '+s.n+'</small></div></div>'
   +'<p>كل محطة في المكتبة تمشي بك خمس خطوات: تفكر قبل أن تقرأ، ثم ترى النص، ثم الدليل من الصفحة، ثم تطبّق، ثم تحفظ ما تعلمته.</p>'
   +'<ol class="rail">'+TSTEPS.map(function(x,i){ return '<li class="'+(i<TR.st?'dn':i===TR.st?'on':'')+'"><button type="button" onclick="hhLhStep('+i+')"'+(i===TR.st?' aria-current="step"':'')+'><i>'+(i<TR.st?sv('check',13,3.4):i+1)+'</i><span><b>'+x[1]+'</b><small>'+x[2]+'</small></span></button></li>'; }).join('')+'</ol>'
   +(others.length?'<div class="try">جرّب محطة من كتاب آخر<div>'+others.map(function(o){ return '<button type="button" onclick="hhLhTry('+o[0]+')">'+esc(o[1].t)+'</button>'; }).join('')+'</div></div>':'')+'</aside>'
   +'<div class="main"><div class="bar">'+TSTEPS.map(function(_,i){ return '<i class="'+(i<=TR.st?'on':'')+'"></i>'; }).join('')+'</div>'+trialBody(s,m)
   +'<div class="nav">'+(TR.st>0?'<button type="button" class="lh6-b2" onclick="hhLhStep('+(TR.st-1)+')">السابق</button>':'')
   +(TR.st<4?'<button type="button" class="lh6-b1" onclick="hhLhStep('+(TR.st+1)+')">التالي: '+TSTEPS[TR.st+1][1]+'</button>':'<button type="button" class="lh6-b1" onclick="hhLibOpenAt(\''+s.b+'\','+s.ci+')">'+sv('play',13)+'أكمل الكتاب من المحطة '+(s.ci+1)+'</button><button type="button" class="lh6-b2" onclick="hhLhTry('+ix+')">أعد المحطة</button>')
   +'<span class="sp">الخطوة '+(TR.st+1)+' من 5</span></div></div></section>'; }
window.hhLhStep=function(i){ TR.st=Math.max(0,Math.min(4,i)); rr(); var e=document.querySelector('#hh-learn .lh6-stage .main'); if(e&&e.getBoundingClientRect().top<0) e.scrollIntoView({block:'start'}); };
window.hhLhPick=function(k,i){ if(TR.a[k]!=null) return; TR.a[k]=i; rr(); };
window.hhLhIt=function(i){ TR.a['it'+i]=!TR.a['it'+i]; rr(); };
window.hhLhTry=function(i){ TR={i:i,st:0,a:{}}; rr(); };
window.hhLhNote=function(){ var L=LX().trial||[], s=L[((TR.i%L.length)+L.length)%L.length]; if(!s) return; var N=rd('hh_lib_notes')||[], k=-1;
  N.forEach(function(n,j){ if(n.b===s.b&&n.x===s.sv.x) k=j; }); if(k>-1) N.splice(k,1); else { N.unshift({b:s.b,x:s.sv.x,pg:s.sv.pg||0,t:Date.now()}); toastX('حُفظت في دفتر الإضاءات','success'); }
  try{ localStorage.setItem('hh_lib_notes',JSON.stringify(N)); }catch(e){} rr(); };

/* ═══ ابدأ من سؤالك، ورحلتي ═══ */
function stDone(b,ci){ var s=rd('hh_lib_'+b); if(!s) return 0; var k='c'+(ci+1); if((s.quiz||{})[k]>=70) return 2; return Object.keys(s.read||{}).some(function(r){ return r.indexOf(k+'-')===0; })?1:0; }
function pathsHTML(){ var x=LX(), L=x.paths||[]; if(!L.length) return '';
  var cov=function(st){ var c=[]; st.forEach(function(s){ var col=s.c||(x.books[s.b]||{}).c; if(col&&c.indexOf(col)<0) c.push(col); }); return c.slice(0,3); };
  var g='<div class="lh6-qg">'+L.map(function(p,i){ return '<button type="button" class="qb'+(PO===i?' on':'')+'" aria-expanded="'+(PO===i)+'" onclick="hhLhPath('+i+')"><span class="cvs">'+cov(p.st).map(function(c){ return '<span style="background:'+c+'"></span>'; }).join('')+'</span><b>'+esc(p.q)+'</b><small>'+nAr(p.st.length,'s')+'</small></button>'; }).join('')+'</div>';
  if(PO<0||!L[PO]) return g; var p=L[PO], dn=0;
  var rows=p.st.map(function(s,i){ var m=s.b?x.books[s.b]:null, d=s.b?stDone(s.b,s.ci):0; if(d===2) dn++; var go=s.b?"hhLibOpenAt('"+s.b+"',"+s.ci+")":s.x;
    return '<li class="'+(d===2?'dn':'')+'"><i>'+(d===2?sv('check',13,3.2):i+1)+'</i><span><b>'+esc(s.t)+'</b><small>'+esc(m?'«'+m.title+'»، '+auName(m)+'، المحطة '+(s.ci+1):s.bk||'')+'</small></span><button type="button" class="lh6-b1 sm" onclick="'+go+'">'+(d===2?'راجعها':d?'تابع':'ابدأ')+'</button></li>'; }).join('');
  return g+'<div class="lh6-path" id="lh6-path"><div class="hd"><b>'+esc(p.q)+'</b><small>'+nAr(p.st.length,'s')+' بترتيب مقترح، أنهيت منها '+dn+'</small><button type="button" class="x" aria-label="إغلاق المسار" onclick="hhLhPath('+PO+')">'+sv('x',15,2.4)+'</button></div><ol>'+rows+'</ol></div>'; }
window.hhLhPath=function(i){ PO=PO===i?-1:i; rr(); var e=$('lh6-path'); if(e){ var r=e.getBoundingClientRect(); if(r.bottom>innerHeight) e.scrollIntoView({behavior:'smooth',block:'nearest'}); } };
function journey(){ var x=LX(), b=0, s=0, C=[];
  Object.keys(x.books||{}).forEach(function(id){ var m=x.books[id]; if(m.ext) return; var t=rd('hh_lib_'+id); if(!t) return; var q=t.quiz||{}, ps=Object.keys(q).filter(function(k){ return q[k]>=70; }).length;
    if(Object.keys(t.read||{}).length||Object.keys(q).length) b++; s+=ps; if(m.chn&&ps>=m.chn) C.push([m.title,"hhLibBook('"+id+"','cert')",id]); });
  var H=window.HH_LEARN||{};
  [['mala','hhLnCert()'],['nmodel',"hhLn2Open('cert')"],['burn',"hhLn3Open('cert')"]].forEach(function(p){ var B=H[p[0]], t=rd('hh_learn_'+p[0]); if(!B||!t) return; var q=t.quiz||{}, ps=Object.keys(q).filter(function(k){ return q[k]>=70; }).length, n=(B.secs||B.chapters||[]).length;
    if(Object.keys(t.seen||t.read||{}).length||Object.keys(q).length) b++; s+=ps; if(n&&ps>=n) C.push([B.title,p[1],p[0]]); });
  try{ var di=window.hhDaaInfo&&hhDaaInfo(); if(di){ if(di.pct>0||di.res) b++; s+=+di.pass||0; if(di.tot&&di.pass>=di.tot) C.push([di.title,'hhDaaOpen()','daa']); } }catch(e){}
  return {b:b,s:s,h:(rd('hh_lib_notes')||[]).length,C:C}; }
function journeyHTML(R){ var J=journey();
  var T=[[J.b,J.b===1?'كتاب بدأته':'كتب بدأتها',"hhLearnTab('books')"],[J.s,'محطة اجتزتها',R?R.res.go:"hhLearnTab('books')"],[J.h,'إضاءة حفظتها',"hhLibGo('notes')"],[J.C.length,J.C.length===1?'شهادة':'شهادات','hhLhCerts()']];
  return '<div class="lh6-me">'+T.map(function(t,i){ return '<button type="button"'+(i===3?' aria-expanded="'+(CRT?'true':'false')+'"':'')+' onclick="'+t[2]+'"><b>'+t[0]+'</b><small>'+t[1]+'</small></button>'; }).join('')+'</div>'
   +(CRT?'<div class="lh6-certs">'+(J.C.length?J.C.map(function(c){ return '<button type="button" onclick="'+c[1]+'">'+sv('badge',16)+'<span>شهادة «'+esc(c[0])+'»</span></button>'; }).join(''):'<p>اجتز اختبارات محطات أي كتاب بنسبة 70% فأكثر، فتظهر شهادته هنا.</p>')+'</div>':''); }
window.hhLhCerts=function(){ CRT=!CRT; rr(); };

/* ═══ الكتب التربوية ═══ */
window.hhLhCat=function(c){ LB.cat=c||'all'; rr(); };
window.hhLhAu=function(){ AUX=!AUX; rr(); };
var INS=[['خريطة الكتاب','الكتاب كله في نظرة','<svg viewBox="0 0 80 60" width="80" height="60" aria-hidden="true"><circle cx="40" cy="30" r="11" fill="#F6EEDC" stroke="#B8924A" stroke-width="2"/><g fill="#8A1538"><circle cx="12" cy="12" r="5"/><circle cx="68" cy="12" r="5"/><circle cx="12" cy="48" r="5"/><circle cx="68" cy="48" r="5"/></g><path d="M16 15 31 25M64 15 49 25M16 45l15-10M64 45 49 35" stroke="#B8924A" stroke-width="1.6"/></svg>'],
 ['محطات بخمس خطوات','فكّر، اقرأ، الدليل، طبّق، احفظ','<svg viewBox="0 0 80 60" width="80" height="60" aria-hidden="true"><path d="M8 30h64" stroke="#E9E1D1" stroke-width="3"/><circle cx="10" cy="30" r="6" fill="#B8924A"/><circle cx="25" cy="30" r="6" fill="#B8924A"/><circle cx="40" cy="30" r="7" fill="#8A1538"/><circle cx="55" cy="30" r="6" fill="#F4EFE5" stroke="#D9CDB6"/><circle cx="70" cy="30" r="6" fill="#F4EFE5" stroke="#D9CDB6"/></svg>'],
 ['اختبار مع «لماذا؟»','تعرف سبب الإجابة من الكتاب','<svg viewBox="0 0 80 60" width="80" height="60" aria-hidden="true"><rect x="12" y="8" width="56" height="12" rx="4" fill="#E7F4EC" stroke="#2F8F5B"/><rect x="12" y="24" width="56" height="12" rx="4" fill="#F4EFE5"/><rect x="12" y="40" width="56" height="14" rx="4" fill="#F6EEDC"/><path d="M14 47h20" stroke="#B8924A" stroke-width="3"/></svg>'],
 ['ماذا تفعل لو؟','مواقف من الواقع','<svg viewBox="0 0 80 60" width="80" height="60" aria-hidden="true"><path d="M10 10h50a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H26l-12 10V40h-4a6 6 0 0 1-6-6V16a6 6 0 0 1 6-6z" fill="#F4EFE5" stroke="#8A1538" stroke-width="2"/><path d="M18 22h34M18 30h22" stroke="#8A1538" stroke-width="2.4" stroke-linecap="round"/></svg>'],
 ['دفتر الإضاءات','عبارات تحفظها وتطبعها','<svg viewBox="0 0 80 60" width="80" height="60" aria-hidden="true"><rect x="16" y="6" width="48" height="48" rx="8" fill="#8A1538"/><path d="M24 22h32M24 30h26M24 38h18" stroke="#E9CF98" stroke-width="2.4" stroke-linecap="round"/></svg>'],
 ['شهادة إتمام','بعد اجتياز المحطات','<svg viewBox="0 0 80 60" width="80" height="60" aria-hidden="true"><circle cx="40" cy="24" r="16" fill="#F6EEDC" stroke="#B8924A" stroke-width="2.4"/><path d="m32 38-4 18 12-7 12 7-4-18" fill="#B8924A"/></svg>']];
function booksTab(){ return libHTML()
   +'<div class="lh6-sh"><h3>في كل كتاب</h3><small>التجربة نفسها، بمحتوى كل كتاب</small></div><div class="lh6-ins">'+INS.map(function(t){ return '<div><span class="v">'+t[2]+'</span><b>'+t[0]+'</b><small>'+esc(t[1])+'</small></div>'; }).join('')+'</div>'
   +'<div class="lh6-sh"><h3>المؤلفون</h3><small>لكل مؤلف ملفه، وكل كتاب جديد يُضاف إلى مجلده</small></div>'+authorsHTML(1)+tools(); }

/* ═══ المواضيع القيادية ═══ */
function leadCards(){ var H=window.HH_LEARN||{}, C=[];
  var info=function(f){ try{ return (window[f]&&window[f]())||{}; }catch(e){ return {}; } };
  if(H.burn&&window.hhLn3Open){ var b=H.burn, i3=info('hhLn3Info'); C.push({id:'burn',k:'#B4592A',ic:'fire',em:'برنامج موضوعي',t:'الاحتراق الوظيفي',s:'دليل إرشادي و'+((b.studies||[]).length===3?'ثلاث':(b.studies||[]).length)+' دراسات ميدانية في '+b.chapters.length+' محطات، مع عجلة التوازن ونسخة ورشة «المعلم الذي لا يحترق».',p:i3.pct||0,go:'hhLn3Open()',
    T:[['board','نسخة الورشة',"hhLn3Open('ws')"],['wheel','عجلة التوازن',"hhLn3Open('wheel')"],['eye','افحص نفسك',"hhLn3Open('check')"],['route','خطتي',"hhLn3Open('plan')"],['doc','الدراسات',"hhLn3Open('studies')"],['tv','اعرض على الصف',"hhLnScr('burn')"]],cv:'<span class="bk burn"><b>الاحتراق<br>الوظيفي</b><small>من الاحتراق<br>إلى الإشراق</small></span>'}); }
  if(H.nmodel&&window.hhLn2Open){ var n=H.nmodel, i2=info('hhLn2Info'); C.push({id:'nmodel',k:'#1F6F7A',ic:'brain',em:'د. نايف بن نهار',t:'التفكير بالنظرية أم بالنموذج؟',s:'دراسة في التحليل السياسي في '+n.chapters.length+' محطات، مع مختبر المحلل ولوحة المحلل وتصويت القاعة.',p:i2.pct||0,go:'hhLn2Open()',
    T:[['flag','مختبر المحلل',"hhLn2Open('labs')"],['grid','لوحة المحلل',"hhLn2Open();hhLn2Go('pad')"],['chart','تصويت القاعة',"hhLn2Open();hhLn2Go('vote')"],['tv','اعرض على الصف',"hhLnScr('nmodel')"]],cv:'<span class="bk nmodel"><b>التفكير<br>بالنظرية أم<br>بالنموذج؟</b><small>د. نايف بن نهار</small></span>'}); }
  return C; }
function leadTab(){ return '<div class="lh6-lead">'+leadCards().map(leadCardHTML).join('')+SOON+'</div>'; }

/* ═══ zzda: الحاسوب، «تعلّم» بقائمة جانبية، والمكتبة شبكة أغلفة مع معاينة ═══ */
P.list='<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>';
P.map='<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>';
P.today='<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>';
function desk(){ return innerWidth>=1100; }
var LP='today'; try{ var _lp=localStorage.getItem('hh_learn_page'); if(_lp) LP=_lp; }catch(e){}
function lpGroup(p){ return String(p).indexOf('lead:')===0?'lead':['lib','authors','ask'].indexOf(p)>-1?'books':'self'; }
function setLP(p){ LP=p; try{ localStorage.setItem('hh_learn_page',p); }catch(e){} var g=lpGroup(p); if(LT!==g) setLT(g); }
function tabPage(t){ return t==='books'?'lib':t==='lead'?'lead:'+((leadCards()[0]||{}).id||''):'today'; }
function clampP(v){ return Math.max(0,Math.min(100,Math.round(+v||0))); }
function nrm2(s){ return String(s||'').replace(/[ً-ْـ]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').toLowerCase(); }
function cov(m,o){ return window.hhLibCover?hhLibCover(m,o):bcover(m); }
function hasDaa(){ return typeof window.hhDaaOpen==='function'&&!!BMx('daa'); }
function daaI(){ try{ return (window.hhDaaInfo&&hhDaaInfo())||{}; }catch(e){ return {}; } }
function libList(){ return shelf().filter(function(id){ return id!=='daa'; }); }
function unitW(n,id){ return id==='mala'?'فنون':(n>=3&&n<=10)?'محطات':'محطة'; }
function togN(b,x,pg){ var N=rd('hh_lib_notes')||[], k=-1; N.forEach(function(n,j){ if(n.b===b&&n.x===x) k=j; }); if(k>-1) N.splice(k,1); else { N.unshift({b:b,x:x,pg:pg||0,t:Date.now()}); toastX('حُفظت في دفتر الإضاءات','success'); } try{ localStorage.setItem('hh_lib_notes',JSON.stringify(N)); }catch(e){} }

/* معلومات الكتاب للشبكة والمعاينة: كلها من البيانات والتقدم المحفوظ */
function binfo(id){ var m=BMx(id); if(!m) return null; var x={id:id,m:m,ch:[],done:[],pc:0,t:0,n:m.chn||0,nq:m.nq||0,lead:m.lead||'',page:"hhLibBook('"+id+"')"};
  if(id==='mala'){ var B=(window.HH_LEARN||{}).mala; if(!B) return null; var s=rd('hh_learn_mala')||{}, q=s.quiz||{}, mi=malaInfo()||{};
    x.ch=B.secs.map(function(c){ return [c.t,nAr(c.qs.length,'q'),(c.qs[0]||{}).q||'']; }); x.done=B.secs.map(function(c){ return (q[c.k]||0)>=70; });
    x.pc=mi.pct||0; x.t=s.t||0; x.n=B.secs.length; x.nq=B.n; x.lead=B.intro||''; x.page="hhLnGo('book')"; x.go=mi.res?mi.res.go:"hhLnGo('book')"; }
  else { var t=rd('hh_lib_'+id)||{}, qq=t.quiz||{}; x.ch=m.ess||[]; x.done=x.ch.map(function(_,i){ return (qq['c'+(i+1)]||0)>=70; }); x.pc=clampP(t.p); x.t=t.t||0; }
  x.next=x.done.indexOf(false); x.started=!!(x.t||x.pc||x.done.some(Boolean));
  if(id!=='mala') x.go=x.next>=0?"hhLibOpenAt('"+id+"',"+x.next+")":x.page;
  x.lbl=id==='mala'?(x.started?'تابع البرنامج':'ابدأ البرنامج'):!x.started?'ابدأ الكتاب':x.next>=0?'تابع المحطة '+(x.next+1):'راجع الكتاب';
  return x; }

/* ═══ المكتبة ═══ */
var LB={cat:'all',q:'',sort:'sug',view:'grid'}; try{ var _lb=JSON.parse(localStorage.getItem('hh_learn_lib')||'null'); if(_lb){ if(['sug','new','prog'].indexOf(_lb.sort)>-1) LB.sort=_lb.sort; if(_lb.view==='list') LB.view='list'; } }catch(e){}
function lbSave(){ try{ localStorage.setItem('hh_learn_lib',JSON.stringify({sort:LB.sort,view:LB.view})); }catch(e){} }
function libCats(){ var x=LX(), c=[]; libList().forEach(function(id){ var k=x.books[id].cat; if(c.indexOf(k)<0) c.push(k); }); return c; }
function libItems(){ var x=LX(), all=libList(), q=nrm2(LB.q).trim().split(/\s+/).filter(Boolean);
  var L=all.filter(function(id){ var m=x.books[id]; if(LB.cat!=='all'&&m.cat!==LB.cat) return false; if(!q.length) return true; var h=nrm2([m.title,m.sub,m.cv,auName(m),x.cats[m.cat],m.series].join(' ')); return q.every(function(w){ return h.indexOf(w)>-1; }); });
  var I={}; L.forEach(function(id,i){ var b=binfo(id); if(b){ b.i=all.indexOf(id); I[id]=b; } }); L=L.filter(function(id){ return I[id]; });
  var grp=function(b){ return b.pc>0&&b.pc<100||b.started&&b.next>=0?0:!b.started?1:2; };
  L.sort(function(a,b){ var A=I[a], B=I[b];
    if(LB.sort==='new') return (B.m.ord||0)-(A.m.ord||0);
    if(LB.sort==='prog') return (B.pc-A.pc)||(B.t-A.t)||(A.i-B.i);
    return (grp(A)-grp(B))||(grp(A)===0?B.t-A.t:0)||(A.i-B.i); });
  return L.map(function(id){ return I[id]; }); }
function bkCard(b){ var m=b.m, x=LX(), tg=m.new?'<span class="tag">جديد</span>':(b.pc>=70&&b.pc<100?'<span class="tag c">قاربت</span>':'');
  return '<button type="button" class="lh7-bk" data-id="'+b.id+'" aria-haspopup="dialog" onclick="hhLhBk(\''+b.id+'\')">'+tg+'<span class="cvw">'+cov(m,{pr:b.pc})+'</span><span class="meta"><b>'+esc(m.title)+'</b>'
   +'<span class="ex">'+esc(bare(auName(m)))+'، '+esc(x.cats[m.cat]||'')+'</span><small>'+(b.pc?'تقدمك '+b.pc+'%':b.n+' '+unitW(b.n,b.id))+'</small>'+(LB.view==='list'&&b.pc?'<span class="lpr"><i style="width:'+b.pc+'%"></i></span>':'')+'</span></button>'; }
function gridInner(){ var L=libItems(); return L.length?L.map(bkCard).join(''):'<p class="lh7-emp">لا كتاب بهذا الاسم في هذا المجال، جرّب كلمة أخرى</p>'; }
function featHTML(){ if(!hasDaa()) return ''; var d=daaI(), m=BMx('daa'), p=clampP(d.pct), n=d.total||m.chn||0;
  return '<div class="lh7-feat"><span class="cvw">'+cov(m,{pr:p})+'</span><div class="tx"><small>البرنامج الرئيس في المكتبة</small><h2>'+esc(d.title||m.title)+'</h2><p>'+esc((d.author||m.author||'')+(n?'، '+n+' '+unitW(n)+(d.ready&&d.ready<n?'، منها '+d.ready+' متاحة الآن':''):''))+'</p>'+(d.sub||m.sub?'<p class="sb">'+esc(d.sub||m.sub)+'</p>':'')
   +'<div class="lv">'+(d.lvName?'<span>مستواك: '+esc(d.lvName)+'</span>':'')+(p?'<span>تقدمك '+p+'%</span>':'')+(d.tot?'<span>'+(d.pass||0)+' من '+d.tot+' للشهادة</span>':'')+'</div></div>'
   +'<button type="button" class="go" onclick="hhDaaOpen()">'+sv('play',13)+(p?'تابع البرنامج':'ابدأ البرنامج')+'</button></div>'; }
function libHTML(){ var x=LX(), all=libList(), cats=libCats(); if(LB.cat!=='all'&&cats.indexOf(LB.cat)<0) LB.cat='all';
  var cnt=function(c){ return all.filter(function(id){ return c==='all'||x.books[id].cat===c; }).length; };
  return featHTML()+'<div class="lh7-bar"><div class="chips" role="group" aria-label="تصفية بالمجال">'+[['all','الكل']].concat(cats.map(function(c){ return [c,x.cats[c]]; })).map(function(c){ var on=LB.cat===c[0]; return '<button type="button" class="'+(on?'on':'')+'" aria-pressed="'+on+'" onclick="hhLhLc(\''+c[0]+'\')">'+esc(c[1])+' <em>'+cnt(c[0])+'</em></button>'; }).join('')+'</div>'
   +'<div class="tools"><label class="srch">'+sv('search',15)+'<input type="search" id="lh7-q" placeholder="ابحث في الكتب" aria-label="ابحث في الكتب: العنوان أو المؤلف" value="'+esc(LB.q)+'" oninput="hhLhQ(this.value)"></label>'
   +'<label class="sel">'+sv('sort',15)+'<select aria-label="ترتيب الكتب" onchange="hhLhSort(this.value)">'+[['sug','مقترح لك'],['new','الأحدث'],['prog','تقدمي']].map(function(o){ return '<option value="'+o[0]+'"'+(LB.sort===o[0]?' selected':'')+'>'+o[1]+'</option>'; }).join('')+'</select></label>'
   +'<div class="vt" role="group" aria-label="طريقة العرض">'+[['grid','grid','شبكة الأغلفة'],['list','list','قائمة']].map(function(v){ var on=LB.view===v[0]; return '<button type="button" class="'+(on?'on':'')+'" aria-pressed="'+on+'" aria-label="'+v[2]+'" title="'+v[2]+'" onclick="hhLhView(\''+v[0]+'\')">'+sv(v[1],17)+'</button>'; }).join('')+'</div></div></div>'
   +'<div class="lh7-grid'+(LB.view==='list'?' list':'')+'" id="lh7-grid">'+gridInner()+'</div>'; }
window.hhLhLc=function(c){ LB.cat=c; rr(); };
window.hhLhQ=function(v){ LB.q=String(v||''); var g=$('lh7-grid'); if(g) g.innerHTML=gridInner(); };
window.hhLhSort=function(v){ LB.sort=v; lbSave(); rr(); };
window.hhLhView=function(v){ LB.view=v==='list'?'list':'grid'; lbSave(); rr(); };

/* ═══ المعاينة: لوحة جانبية في الحاسوب، ولوحة من الأسفل في الجوال ═══ */
var DR={id:'',all:0,ret:null};
function drHTML(){ var x=binfo(DR.id); if(!x) return ''; var m=x.m, lim=innerWidth<700?4:6, L=x.ch, sh=DR.all?L:L.slice(0,lim), cat=(LX().cats||{})[m.cat]||'', nx=x.next>=0?L[x.next]:null;
  return '<div class="top"><button type="button" class="x" aria-label="إغلاق المعاينة" onclick="hhLhDrX()">'+sv('x',18,2.2)+'</button><span class="cvw">'+cov(m,{pr:x.pc})+'</span><div class="hd"><small class="em">'+esc(cat+(m.series?'، '+m.series:''))+'</small><h3 id="lh7-drt">'+esc(m.title)+'</h3><div class="by">'+esc(auName(m))+'</div>'
   +'<div class="nums"><span><b>'+x.n+'</b>'+unitW(x.n,x.id)+'</span><span><b>'+x.nq+'</b>سؤالاً</span><span><b>'+x.pc+'%</b>تقدمك</span></div></div></div>'
   +'<div class="in">'+(x.lead?'<p class="ld">'+esc(x.lead)+'</p>':'')+'<h4>'+sv('map',16)+'الكتاب في نظرة</h4><ol class="mp">'+sh.map(function(c,i){ var d=x.done[i]; return '<li class="'+(d?'d':'')+(i===x.next&&x.started?' nx':'')+'"><i>'+(d?sv('check',13,3):i+1)+'</i><span><b>'+esc(c[0])+'</b>'+(c[1]?'<small>'+esc(c[1])+'</small>':'')+'</span>'+(d?'<em>اجتزتها</em>':'')+'</li>'; }).join('')+'</ol>'
   +(L.length>lim?'<button type="button" class="more" aria-expanded="'+(!!DR.all)+'" onclick="hhLhDrAll()">'+(DR.all?'اعرض أقل':'عرض الكل ('+L.length+')')+'</button>':'')
   +(nx&&nx[2]?'<div class="fq"><small>'+(x.started?(x.id==='mala'?'فنّك التالي يبدأ بسؤال':'محطتك التالية تبدأ بسؤال'):(x.id==='mala'?'الفن الأول يبدأ بسؤال':'المحطة الأولى تبدأ بسؤال'))+'</small>'+esc(nx[2])+'</div>':'')
   +'<div class="acts"><button type="button" class="p" onclick="hhLhDrGo(0)">'+sv('play',13)+esc(x.lbl)+'</button><button type="button" class="s" onclick="hhLhDrGo(1)">صفحة الكتاب</button>'+(m.aid?'<button type="button" class="s" onclick="hhLhDrGo(2)">ملف المؤلف</button>':'')+'</div></div>'; }
function drMark(){ document.querySelectorAll('#hh-learn .lh7-bk').forEach(function(b){ b.classList.toggle('on',b.getAttribute('data-id')===DR.id&&!!$('lh7-drw')); }); }
window.hhLhBk=function(id){ var h=$('hh-learn'); if(!h||!binfo(id)) return; var ret=document.activeElement; hhLhDrX(1); DR={id:id,all:0,ret:ret};
  var m=BMx(id), dim=document.createElement('div'); dim.className='lh7-dim'; dim.id='lh7-dim'; dim.addEventListener('click',function(){ hhLhDrX(); });
  var d=document.createElement('div'); d.className='lh7-drw'; d.id='lh7-drw'; d.setAttribute('role','dialog'); d.setAttribute('aria-modal','true'); d.setAttribute('aria-labelledby','lh7-drt'); d.style.setProperty('--k',m.k||'#8A1538'); d.style.setProperty('--k1',m.k1||'#F7E6EB');
  d.innerHTML=drHTML(); h.appendChild(dim); h.appendChild(d); drMark();
  requestAnimationFrame(function(){ dim.classList.add('in'); d.classList.add('in'); }); var x=d.querySelector('.x'); if(x) try{ x.focus({preventScroll:true}); }catch(e){} };
window.hhLhDrX=function(silent){ var d=$('lh7-drw'), m=$('lh7-dim'), h=$('hh-learn'); if(d) d.remove(); if(m) m.remove(); drMark();
  if(silent!==1){ var r=DR.ret, id=DR.id; DR.id=''; if(r&&r.isConnected){ try{ r.focus({preventScroll:true}); }catch(e){} } else if(id){ var c=document.querySelector('#hh-learn .lh7-bk[data-id="'+id+'"]'); if(c) try{ c.focus({preventScroll:true}); }catch(e){} } } };
window.hhLhDrAll=function(){ DR.all=!DR.all; var d=$('lh7-drw'); if(!d) return; var y=d.scrollTop; d.innerHTML=drHTML(); d.scrollTop=y; var b=d.querySelector('.more'); if(b) try{ b.focus({preventScroll:true}); }catch(e){} };
window.hhLhDrGo=function(k){ var x=binfo(DR.id); if(!x) return; DR.ret=null; hhLhDrX(); var c=k===0?x.go:k===1?x.page:"hhLibAuthor('"+x.m.aid+"')"; try{ (new Function(c))(); }catch(e){ console.warn(e); } };
document.addEventListener('keydown',function(e){ var d=$('lh7-drw'); if(!d) return; if(e.key==='Escape'){ e.preventDefault(); hhLhDrX(); return; }
  if(e.key==='Tab'){ var F=[].slice.call(d.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')).filter(function(x){ return !x.disabled&&x.offsetParent!==null; }); if(!F.length) return; var a=F[0], z=F[F.length-1];
    if(!d.contains(document.activeElement)){ e.preventDefault(); a.focus(); } else if(e.shiftKey&&document.activeElement===a){ e.preventDefault(); z.focus(); } else if(!e.shiftKey&&document.activeElement===z){ e.preventDefault(); a.focus(); } } });

/* ═══ صفحات القائمة الجانبية ═══ */
function welc(t,s){ return '<div class="lh7-welc"><h2>'+t+'</h2>'+(s?'<small>'+s+'</small>':'')+'</div>'; }
function h2(t,s,btn){ return '<div class="lh7-h2"><h3>'+t+'</h3>'+(s?'<small>'+s+'</small>':'')+(btn||'')+'</div>'; }
function bigc(R){ var cv=function(id,c,t){ var m=BMx(id); return m?cov(m,{}):'<span class="blk" style="background:'+(c||'#2F6B5A')+'">'+esc(t||'')+'</span>'; };
  if(R){ var p=clampP(R.pct), L=R.res||{};
    return '<div class="lh7-big"><span class="cvw">'+cv(R.id,R.c,R.mini||R.title)+'</span><div class="tx"><small>تابع من حيث وقفت</small><b>'+esc(R.title||R.mini||'')+'</b><span class="ln1">'+esc((L.h||'')+(L.x?': '+L.x:''))+'</span><div class="br"><i style="width:'+p+'%"></i></div><small class="pc">تقدمك '+p+'%</small></div><button type="button" class="go" onclick="'+L.go+'">تابع'+sv('play',13)+'</button></div>'; }
  if(hasDaa()){ var d=daaI(), m=BMx('daa'), pd=clampP(d.pct);
    return '<div class="lh7-big"><span class="cvw">'+cov(m,{pr:pd})+'</span><div class="tx"><small>ابدأ من البرنامج الرئيس في المكتبة</small><b>'+esc(d.title||m.title)+'</b><span class="ln1">'+esc(d.sub||m.sub||'')+'</span><div class="br"><i style="width:'+pd+'%"></i></div><small class="pc">'+esc(d.author||m.author||'')+'</small></div><button type="button" class="go" onclick="hhDaaOpen()">'+(pd?'تابع':'ابدأ')+sv('play',13)+'</button></div>'; }
  var j=BMx('jeel'); if(!j) return '';
  return '<div class="lh7-big"><span class="cvw">'+cov(j,{})+'</span><div class="tx"><small>ابدأ من هنا</small><b>'+esc(j.title)+'</b><span class="ln1">'+esc(j.sub||'')+'</span><small class="pc">'+esc(auName(j))+'، '+j.chn+' '+unitW(j.chn)+'</small></div><button type="button" class="go" onclick="hhLibBook(\'jeel\')">ابدأ'+sv('play',13)+'</button></div>'; }
function litHTML(){ var L=LX().lits||[]; if(!L.length) return ''; var h=L[today()%L.length], m=BMx(h.b)||{}, on=hasN(h.b,h.x);
  return '<div class="lh7-lit"><h4>إضاءة اليوم</h4><blockquote>'+q2(h.x)+'</blockquote><div class="ft"><small>«'+esc(m.title||'')+'»، '+esc(bare(auName(m)))+'، صفحة '+esc(h.pg)+'</small><button type="button" class="'+(on?'on':'')+'" aria-pressed="'+on+'" onclick="hhLhLit()">'+sv(on?'check':'bulb',14,2.2)+(on?'في دفترك':'احفظها في الدفتر')+'</button></div></div>'; }
window.hhLhLit=function(){ var L=LX().lits||[]; if(!L.length) return; var h=L[today()%L.length]; togN(h.b,h.x,h.pg); rr(); };
function dqGet(){ var s=rd('hh_learn_dq'); return s&&s.d===today()?s:{d:today(),a:null}; }
function dqQ(){ var L=LX().dq||[]; return L.length?L[(today()*7+3)%L.length]:null; }
function dqHTML(){ var q=dqQ(); if(!q) return ''; var m=BMx(q.b)||{}, a=dqGet().a, ord=ordOf(q.o.length,'dq'+today());
  return '<div class="lh7-dq"><h4>سؤال اليوم</h4><b>'+esc(q.q)+'</b><div class="o" role="group" aria-label="خيارات سؤال اليوم">'+ord.map(function(i){ var c=a==null?'':i===0?' ok':i===a?' no':' dim'; return '<button type="button" class="'+c+'"'+(a!=null?' aria-disabled="true"':'')+' onclick="hhLhDq('+i+')">'+esc(q.o[i])+'</button>'; }).join('')+'</div>'
   +(a!=null?'<div class="why"><b>'+(a===0?'أحسنت.':'الإجابة الصحيحة هي المضيئة.')+' لماذا؟</b>'+q2(q.why)+'<span class="ft"><small>«'+esc(m.title||'')+'»'+(q.pg?'، صفحة '+esc(q.pg):'')+'</small><button type="button" onclick="hhLibOpenAt(\''+q.b+'\','+q.ci+')">افتح المحطة</button></span></div>':'<small class="src">من «'+esc(m.title||'')+'»، '+esc(bare(auName(m)))+'</small>')+'</div>'; }
window.hhLhDq=function(i){ var s=dqGet(); if(s.a!=null) return; s.a=i; try{ localStorage.setItem('hh_learn_dq',JSON.stringify(s)); }catch(e){} rr(); };
var TOPEN=0, TB=0;
function tryHTML(){ var L=LX().trial||[]; if(!L.length) return '';
  var hd=h2('جرّب محطة من كتاب آخر','خمس خطوات، دقائق قليلة',TOPEN?'<button type="button" onclick="hhLhTryX()">'+sv('x',14,2.4)+'أغلق المحطة</button>':(L.length>3?'<button type="button" onclick="hhLhTryM()">'+sv('refresh',14)+'محطات أخرى</button>':''));
  if(TOPEN) return hd+'<div id="lh7-try">'+trialHTML()+'</div>';
  var C=[]; for(var j=0;j<Math.min(3,L.length);j++){ var ix=(TB+j)%L.length, s=L[ix], m=BMx(s.b)||{}; C.push('<button type="button" class="st2" style="--sk:'+(m.k||'#8A1538')+';--sk1:'+(m.k1||'#F7E6EB')+'" onclick="hhLhTry2('+ix+')"><span class="n">'+(s.ci+1)+'</span><span><b>'+esc(s.t)+'</b><small>«'+esc(m.title||'')+'»، '+esc(bare(auName(m)))+'</small></span>'+sv('play',13)+'</button>'); }
  return hd+'<div class="lh7-mini3">'+C.join('')+'</div>'; }
window.hhLhTry2=function(i){ TR={i:i,st:0,a:{}}; TOPEN=1; rr(); var e=$('lh7-try'); if(e){ var r=e.getBoundingClientRect(); if(r.top<80||r.top>innerHeight*.6) e.scrollIntoView({block:'start'}); var b=e.querySelector('.lh6-opt'); if(b) try{ b.focus({preventScroll:true}); }catch(x){} } };
window.hhLhTryX=function(){ TOPEN=0; rr(); };
window.hhLhTryM=function(){ var n=(LX().trial||[]).length||1; TB=(TB+3)%n; rr(); };
function pcovs(st){ var x=LX(), c=[]; st.forEach(function(s){ var col=s.c||(x.books[s.b]||{}).c; if(col&&c.indexOf(col)<0) c.push(col); }); return c.slice(0,3).map(function(k){ return '<span style="background:'+k+'"></span>'; }).join(''); }
function pathCards(){ var L=LX().paths||[]; if(!L.length) return '';
  return h2('ابدأ من سؤالك','مسارات قصيرة من أكثر من كتاب',L.length>3?'<button type="button" onclick="hhLhPage(\'paths\')">كل المسارات</button>':'')+'<div class="lh7-paths">'+L.slice(0,3).map(function(p,i){ var nb=[]; p.st.forEach(function(s){ var k=s.b||s.bk; if(nb.indexOf(k)<0) nb.push(k); });
    return '<button type="button" class="pc" onclick="hhLhPage(\'paths\','+i+')"><b>'+esc(p.q)+'</b><small>'+nAr(p.st.length,'s')+(nb.length>1?' من '+nAr(nb.length,'b'):'')+'</small><span class="cvs">'+pcovs(p.st)+'</span></button>'; }).join('')+'</div>'; }
function pToday(R){ return welc('اليوم','تابع رحلتك، وخذ جرعة اليوم')+bigc(R)+'<div class="lh7-today">'+litHTML()+dqHTML()+'</div>'+tryHTML()+pathCards(); }
function pCerts(){ var J=journey();
  return welc('شهاداتي','تظهر هنا شهادة كل كتاب أو برنامج تتم اختبارات محطاته')+(J.C.length?'<div class="lh7-certs">'+J.C.map(function(c){ return '<button type="button" onclick="'+c[1]+'"><i>'+sv('badge',22)+'</i><span><b>شهادة «'+esc(c[0])+'»</b><small>جاهزة، اكتب اسمك واطبعها</small></span></button>'; }).join('')+'</div>'
   :'<div class="lh7-emp2"><i>'+sv('badge',30)+'</i><b>لا شهادات بعد</b><p>اجتز اختبارات محطات أي كتاب بنسبة 70% فأكثر، فتظهر شهادته هنا.</p><button type="button" class="lh6-b1" onclick="hhLhPage(\'lib\')">'+sv('book',15)+'اختر كتاباً</button></div>'); }
function authorsHTML(cap){ var x=LX(), A=x.authors||[];
  var au=A.map(function(a,i){ var n=a.books.filter(function(b){ return x.books[b]; }).length; return '<button type="button" class="ap'+(cap&&i>=8?' mx':'')+'" onclick="hhLibAuthor(\''+a.id+'\')"><i style="background:'+(a.k||'#8A1538')+'">'+esc(a.ini)+'</i><b>'+esc(a.name)+'</b><small>'+nAr(n,'b')+'</small></button>'; }).join('');
  return '<div class="lh6-au'+(AUX||!cap?' all':'')+'">'+au+(cap&&A.length>8?'<button type="button" class="ap more" onclick="hhLhAu()">'+(AUX?'اعرض أقل':'و'+(A.length-8)+' آخرون')+'</button>':'')+'</div>'; }
function leadCardHTML(c){ return '<article class="lc" style="--lk:'+c.k+'"><div class="cvw '+c.id+'">'+c.cv+'</div><div class="bd"><em>'+esc(c.em)+'</em><h3>'+esc(c.t)+'</h3><p>'+esc(c.s)+'</p>'
  +'<div class="pr"><span>تقدمك</span><div class="br"><i style="width:'+c.p+'%"></i></div><span>'+c.p+'%</span></div>'
  +'<button type="button" class="lh6-b1" onclick="'+c.go+'">'+sv('play',13)+(c.p?'تابع البرنامج':'ابدأ البرنامج')+'</button>'
  +'<div class="tl">'+c.T.map(function(t){ return '<button type="button" onclick="'+t[2]+'">'+sv(t[0],15)+t[1]+'</button>'; }).join('')+'</div></div></article>'; }
var SOON='<article class="lc soon"><span class="pl">'+sv('plus',30,2.2)+'</span><b>موضوعات قيادية قادمة</b><small>تُضاف هنا تباعاً، برامج مركّزة بأدوات للورش</small></article>';
function pLead(id){ var C=leadCards(), c=C.filter(function(x){ return x.id===id; })[0]||C[0]; if(!c) return welc('المواضيع القيادية')+'<div class="lh6-lead one">'+SOON+'</div>';
  return welc(esc(c.t),'برنامج موضوعي مركّز، بأدوات للورش')+'<div class="lh6-lead one">'+leadCardHTML(c)+SOON+'</div>'; }
function pageHTML(R){ var x=LX(), p=LP;
  if(p==='paths'&&(x.paths||[]).length) return welc('ابدأ من سؤالك','محطات مختارة من أكثر من كتاب، بترتيب مقترح')+pathsHTML();
  if(p==='journey') return jPage(R)+tools();
  if(p==='certs') return pCerts();
  if(p==='lib'){ var n=libList().length+(hasDaa()?1:0); return welc('المكتبة',nAr(n,'b')+' في '+libCats().length+' مجالات، كل كتاب في محطات')+libHTML(); }
  if(p==='authors') return welc('المؤلفون','لكل مؤلف ملفه، وكل كتاب جديد يُضاف إلى مجلده')+authorsHTML(0)+tools();
  if(p.indexOf('lead:')===0) return pLead(p.slice(5));
  LP='today'; return pToday(R); }
function journeyMini(){ var J=journey(), tot=0; libList().forEach(function(id){ tot+=(BMx(id)||{}).chn||0; }); var pb=tot?Math.min(100,Math.round(J.s/tot*100)):0;
  return '<div class="mp"><b>رحلتك في «تعلّم»</b><small>'+(J.s||J.b||J.h?'محطات اجتزتها: '+J.s+'<br>كتب بدأتها: '+J.b+'<br>إضاءات حفظتها: '+J.h:'ابدأ أول محطة، ويظهر تقدمك هنا')+'</small><div class="br" role="img" aria-label="اجتزت '+pb+'% من محطات المكتبة"><i style="width:'+pb+'%"></i></div></div>'; }
function sbHTML(cur){ var x=LX(), J=journey(), np=(x.paths||[]).length, nt=(rd('hh_lib_notes')||[]).length, LC=leadCards(), nb=libList().length+(hasDaa()?1:0), na=(x.authors||[]).length;
  var L=function(k,ic,t,n,go){ var on=k===cur; return '<button type="button" class="'+(on?'on':'')+'"'+(on?' aria-current="page"':'')+' onclick="'+(go||"hhLhPage('"+k+"')")+'">'+sv(ic,17)+'<span>'+esc(t)+'</span>'+(n?'<em>'+n+'</em>':'')+'</button>'; };
  return '<aside class="lh7-sb"><nav aria-label="أقسام تعلّم">'
   +'<h5>'+sv('cap',15)+'التعلم الذاتي</h5>'+L('today','today','اليوم')+(np?L('paths','route','ابدأ من سؤالك',np):'')+L('journey','user','رحلتي')+L('notes','bulb','دفتر الإضاءات',nt,"hhLibGo('notes')")+L('certs','badge','شهاداتي',J.C.length)
   +'<h5>'+sv('book',15)+'الكتب التربوية</h5>'+L('lib','book','المكتبة',nb)+L('authors','users','المؤلفون',na)+L('ask','search','اسأل المكتبة','',"hhLibAskIn('')")
   +(LC.length?'<h5>'+sv('lead',15)+'المواضيع القيادية</h5>'+LC.map(function(c){ return L('lead:'+c.id,c.ic,c.t); }).join(''):'')
   +'</nav>'+journeyMini()+'</aside>'; }
var PT={today:'اليوم',paths:'ابدأ من سؤالك',journey:'رحلتي',certs:'شهاداتي',notes:'دفتر الإضاءات',lib:'المكتبة',authors:'المؤلفون',ask:'اسأل المكتبة'};
function shell(cur,body){ var lc=String(cur).indexOf('lead:')===0?leadCards().filter(function(c){ return 'lead:'+c.id===cur; })[0]:null;
  return '<div class="ln-wrap lh lh6 lh7">'+crumbs([['الرئيسية','hhLearnClose()'],['تعلّم',"hhLhPage('today')"],[lc?lc.t:PT[cur]||'']])+'<div class="lh7-app">'+sbHTML(cur)+'<div class="lh7-main k-'+lpGroup(cur)+'">'+body+'</div></div></div>'; }
window.hhLnShell=function(cur,body){ try{ return desk()?shell(cur,body):null; }catch(e){ return null; } };
window.hhLhPage=function(p,a){ setLP(p); TOPEN=0; PO=p==='paths'&&a!=null?a:-1; CRT=0; if(!$('hh-learn')){ hhLearnOpen(); return; } go('home');
  if(PO>-1) setTimeout(function(){ var e=$('lh6-path'); if(e) e.scrollIntoView({block:'nearest'}); },40); };
var _dsk=desk();
addEventListener('resize',function(){ var d=desk(), h=$('hh-learn'); if(d===_dsk){ var w=$('lh7-drw'); if(w&&!w._rz){ w._rz=1; setTimeout(function(){ w._rz=0; if(w.isConnected){ var y=w.scrollTop; w.innerHTML=drHTML(); w.scrollTop=y; } },150); } return; } _dsk=d; if(h&&V.view==='home'&&!h.classList.contains('lb')&&h.querySelector('.lh6')){ hhLhDrX(1); rr(); } });

/* ═══ الصفحة ═══ */
function selfTab(R){ var x=LX(), np=(x.paths||[]).length;
  return daaCard()+trialHTML()
   +(np?sub('route','ابدأ من سؤالك','محطات مختارة من أكثر من كتاب، بترتيب مقترح')+pathsHTML():'')
   +sub('user','رحلتي','من تقدمك المحفوظ')+journeyHTML(R)+jOpenBtn()+tools(); }
function cntHTML(R){ if(!R) return '<button type="button" class="lh6-cnt" onclick="hhLibBook(\'jeel\')">'+mini(BMx('jeel'))+'<span><small>ابدأ من هنا</small><b>«إلى الجيل الصاعد»</b></span></button>';
  var p=Math.max(0,Math.min(100,Math.round(+R.pct||0)));
  return '<button type="button" class="lh6-cnt" onclick="'+R.res.go+'" title="'+esc(R.res.x||'')+'">'+(R.c?'<span class="lh6-mini" style="background:'+R.c+'"></span>':'<span class="lh6-mini '+R.id+'"></span>')+'<span><small>تابع من حيث وقفت</small><b>'+esc(R.mini||R.title)+'، '+esc(R.res.h)+'</b></span><span class="r" style="--p:'+p+'%"><span>'+p+'%</span></span></button>'; }
function vHome(){
  try{ if(window.hhLibStyle) hhLibStyle(); }catch(e){}
  var x=LX(), R=recent(); if(JM&&!desk()) return jMob(R); if(desk()){ if(lpGroup(LP)!==LT) LP=tabPage(LT); return shell(LP,pageHTML(R)); }
  var nb=libList().length+(hasDaa()?1:0), nl=((window.HH_LEARN||{}).burn?1:0)+((window.HH_LEARN||{}).nmodel?1:0), np=(x.paths||[]).length;
  var N={self:np?nAr(np,'p'):'',books:nb?nAr(nb,'b'):'',lead:nl===2?'برنامجان':nl?'برنامج واحد':''}, T=LTABS[LT], body=LT==='books'?booksTab():LT==='lead'?leadTab():selfTab(R);
  return '<div class="ln-wrap lh lh6">'+crumbs([['الرئيسية','hhLearnClose()'],['تعلّم',"hhLearnTab('self')"],[T[0]]])
   +'<div class="lh6-ph"><h1>تعلّم</h1><p>تعلّم بنفسك، من كتب حقيقية وموضوعات مركّزة</p></div>'
   +'<div class="lh6-tabs" role="tablist" aria-label="أقسام تعلّم">'+['self','books','lead'].map(function(k){ var t=LTABS[k], on=k===LT; return '<button type="button" role="tab" id="lh6-t-'+k+'" aria-selected="'+on+'" aria-controls="lh6-pn" class="tab k-'+k+(on?' on':'')+'" onclick="hhLearnTab(\''+k+'\')"><i>'+sv(t[2],22)+'</i><span><b>'+t[0]+'</b><small>'+t[1]+'</small></span>'+(N[k]?'<em>'+N[k]+'</em>':'')+'</button>'; }).join('')+'</div>'
   +'<section class="lh6-pn k-'+LT+'" id="lh6-pn" role="tabpanel" aria-labelledby="lh6-t-'+LT+'"><div class="pnh"><h2>'+T[0]+'</h2><p>'+T[1]+'</p>'+(LT==='self'?cntHTML(R):'')+'</div>'+body+'</section></div>';
}
function lhBind(h){ var on=h.querySelector('.lh6-tabs .tab.on'), tb=on&&on.parentNode; if(!tb||tb.scrollWidth<=tb.clientWidth+1) return;
  var r=on.getBoundingClientRect(), R=tb.getBoundingClientRect(); if(r.left<R.left+8||r.right>R.right-8) tb.scrollLeft+=(r.left+r.width/2)-(R.left+R.width/2); }
/* اقتراح كتاب: يُحفظ في البلاغات بنوع مستقل ويظهر للأدمن في «اقتراحات الكتب» */
window.hhLnSuggest=function(){ var h=$('hh-learn'); if(!h) return; var u=me(); var ov=document.createElement('div'); ov.className='ln-scrim'; ov.id='ln-sug';
  ov.innerHTML='<form class="ln-dlg lh-sd" role="dialog" aria-modal="true" aria-labelledby="ln-sgt" onsubmit="event.preventDefault();hhLnSugSend()"><div class="dh"><div><b id="ln-sgt">اقترح كتاباً</b><small>نقرأ كل اقتراح، ونختار منها ما يصلح أن يكون برنامجاً تفاعلياً</small></div><button type="button" class="x" aria-label="إغلاق" onclick="this.closest(\'.ln-scrim\').remove()">'+sv('x',16,2.4)+'</button></div>'
   +'<div class="in"><label>اسم الكتاب<input id="ln-sg1" required maxlength="150" placeholder="مثال: الأربعون النووية"></label><label>المؤلف<input id="ln-sg2" maxlength="120" placeholder="اختياري"></label>'
   +'<label>لمن يناسب؟<select id="ln-sg3"><option>للأطفال والناشئة</option><option>للطلاب</option><option>للمعلمين</option><option>عام</option></select></label>'
   +'<label>لماذا تقترحه؟<textarea id="ln-sg4" rows="3" maxlength="600" placeholder="اختياري: ماذا يميّزه، وكيف تراه يُدرَّس"></textarea></label>'
   +'<label>اسمك<input id="ln-sg5" maxlength="60" value="'+esc((u&&u.displayName)||'')+'" placeholder="اختياري"></label>'
   +'<button type="submit" class="lh-b p" id="ln-sgb">'+sv('check',15,2.4)+'أرسل الاقتراح</button></div></form>';
  h.appendChild(ov); ov.addEventListener('click',function(e){ if(e.target===ov) ov.remove(); }); setTimeout(function(){ var i=$('ln-sg1'); if(i) i.focus(); },50); };
window.hhLnSugSend=function(){ var v=function(id){ var e=$(id); return e?String(e.value||'').trim():''; }, t=v('ln-sg1'); if(!t){ toastX('اكتب اسم الكتاب','info'); return; }
  var u=me(), b=$('ln-sgb'); if(b) b.disabled=true;
  var d={type:'book_suggestion',description:('اقتراح كتاب: '+t+(v('ln-sg2')?'، تأليف '+v('ln-sg2'):'')).slice(0,1900),bookTitle:t.slice(0,150),bookAuthor:v('ln-sg2').slice(0,120),audience:v('ln-sg3'),why:v('ln-sg4').slice(0,600),reporterName:v('ln-sg5').slice(0,60),
    user:u&&u.uid?{uid:u.uid,email:u.email||null,displayName:u.displayName||null}:{anonymous:true},url:location.pathname,status:'new',createdAt:(window.firebase&&firebase.firestore&&firebase.firestore.FieldValue)?firebase.firestore.FieldValue.serverTimestamp():new Date().toISOString()};
  var done=function(ok){ var s=$('ln-sug'); if(s) s.remove(); toastX(ok?'شكراً لك، وصل اقتراحك':'حُفظ اقتراحك على جهازك، وسيُرسل لاحقاً',ok?'success':'info'); };
  try{ if(window.firebase&&firebase.firestore){ firebase.firestore().collection('problem_reports').add(d).then(function(){ done(1); }).catch(function(){ if(b) b.disabled=false; toastX('تعذّر الإرسال، حاول مرة أخرى','error'); }); return; } }catch(e){}
  try{ var L=JSON.parse(localStorage.getItem('hh_problem_reports')||'[]'); d._localId=Date.now(); L.push(d); localStorage.setItem('hh_problem_reports',JSON.stringify(L)); }catch(e){} done(0); };
/* ═══ رحلتي الشاملة (zzzzzzdc): وقت التعلم لكل محطة، الأخطاء المحفوظة، المستويات، الهدف الأسبوعي ═══
   التخزين: localStorage 'hh_journey' ويُدفع إلى program_progress/{uid}.journey بالدمج. لا يقرأ hh_daa_me ولا يدفعه. */
P.lock='<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>';
P.target='<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>';
var JR=null, JP='all', JM=0, JX={wr:0,bk:0,rt:null,gl:0,gk:'s'}, JLA=Date.now(), JLK={lb:'',ln3:''}, _jPT=null, _jLP=0, _jDirty=0, _jRem=0, _jN=0;
try{ var _jp=localStorage.getItem('hh_journey_p'); if(_jp==='wk'||_jp==='mo'||_jp==='all') JP=_jp; }catch(e){}
var JLV=['مبتدئ','قارئ','قارئ متأمل','قارئ متعمق','باحث'], JWD=['الخميس','الجمعة','السبت','الأحد','الاثنين','الثلاثاء','الأربعاء'];
function jDay(t){ t=t||Date.now(); return Math.floor((t-new Date(t).getTimezoneOffset()*6e4)/864e5); }
function jDays(n){ return n===1?'يوم واحد':n===2?'يومان':(n%100>=3&&n%100<=10)?n+' أيام':n+' يوماً'; }
function jFix(s){ s=s&&typeof s==='object'&&!Array.isArray(s)?s:{}; ['tm','tmd','an','ps','bs','cs','rm'].forEach(function(k){ if(!s[k]||typeof s[k]!=='object'||Array.isArray(s[k])) s[k]={}; }); ['wr','ev'].forEach(function(k){ if(!Array.isArray(s[k])) s[k]=[]; }); s.t=+s.t||0; return s; }
function jLoad(){ if(!JR) JR=jFix(rd('hh_journey')); jRemote(); return JR; }
function jLocal(){ if(!JR) return; JR.t=Date.now(); try{ localStorage.setItem('hh_journey',JSON.stringify(JR)); }catch(e){} _jDirty=0; }
function jPersist(){ jLocal(); clearTimeout(_jPT); _jPT=setTimeout(function(){ _jLP=Date.now(); jPush(); },Math.max(3000,60000-(Date.now()-_jLP))); }
function jTrim(){ var d=jDay()-400, o=JSON.parse(JSON.stringify(JR)); ['tmd','an'].forEach(function(k){ Object.keys(o[k]).forEach(function(x){ if(+x<d) delete o[k][x]; }); });
  o.wr=o.wr.slice(0,60); o.ev=o.ev.slice(0,40); var R=Object.keys(o.rm).sort(function(a,b){ return o.rm[b]-o.rm[a]; }).slice(0,120), r={}; R.forEach(function(k){ r[k]=o.rm[k]; }); o.rm=r; return o; }
function jPush(){ var u=me(); if(!u||!u.uid||!window.firebase||!firebase.firestore||!JR) return; try{ firebase.firestore().collection('program_progress').doc(u.uid).set({journey:jTrim()},{merge:true}).catch(function(){}); }catch(e){} }
function jRemote(){ if(_jRem) return; var u=me(); if(!u||!u.uid||!window.firebase||!firebase.firestore) return; _jRem=1;
  try{ firebase.firestore().collection('program_progress').doc(u.uid).get().then(function(d){ var r=d&&d.exists&&(d.data()||{}).journey; if(r&&typeof r==='object'){ jMerge(jFix(r)); jLocal(); if($('lhj')) rr(); } }).catch(function(){ _jRem=0; }); }catch(e){ _jRem=0; } }
function jD0(v){ return Array.isArray(v)?(+v[0]||0):(+v||0); }
function jMerge(r){ var L=JR;
  ['tm','tmd'].forEach(function(k){ Object.keys(r[k]).forEach(function(x){ if((+r[k][x]||0)>(L[k][x]||0)) L[k][x]=+r[k][x]; }); });
  Object.keys(r.an).forEach(function(d){ var a=r.an[d]||{}, b=L.an[d]||(L.an[d]={}); Object.keys(a).forEach(function(k){ if(Array.isArray(a[k])&&(!b[k]||(a[k][1]||0)>(b[k][1]||0))) b[k]=a[k]; }); });
  ['ps','bs','cs'].forEach(function(k){ Object.keys(r[k]).forEach(function(x){ var a=r[k][x], b=L[k][x]; if(b==null||(jD0(a)&&(!jD0(b)||jD0(a)<jD0(b)))) L[k][x]=a; }); });
  Object.keys(r.rm).forEach(function(id){ if((+r.rm[id]||0)>(L.rm[id]||0)) L.rm[id]=+r.rm[id]; });
  var W={}; L.wr.concat(r.wr).forEach(function(w){ if(!w||!w.id||!Array.isArray(w.o)||(L.rm[w.id]||0)>=(w.t||0)) return; if(!W[w.id]||(w.t||0)>(W[w.id].t||0)) W[w.id]=w; });
  L.wr=Object.keys(W).map(function(k){ return W[k]; }).sort(function(a,b){ return b.t-a.t; }).slice(0,60);
  var E={}; L.ev.concat(r.ev).forEach(function(e){ if(e&&e.k) E[e.k+e.b+':'+e.ci+':'+e.t]=e; }); L.ev=Object.keys(E).map(function(k){ return E[k]; }).sort(function(a,b){ return b.t-a.t; }).slice(0,40);
  if(r.goal&&(!L.goal||(r.goal.t||0)>(L.goal.t||0))) L.goal=r.goal; if(r.goal===null&&L.goal&&(r.gt||0)>(L.goal.t||0)) L.goal=null;
  if(r.init) L.init=1; }

/* مصادر التقدم الحالية، تُقرأ ولا تُعدَّل */
function jSrc(){ var x=LX(), H=window.HH_LEARN||{}, R={sc:{},bk:{},ce:{},tt:{},tot:{}};
  Object.keys(x.books||{}).forEach(function(id){ var m=x.books[id]; if(!m||m.ext) return; var t=rd('hh_lib_'+id); if(!t) return; var q=t.quiz||{}, ps=0;
    Object.keys(q).forEach(function(k){ var ci=parseInt(String(k).replace(/^c/,''),10)-1; if(ci>=0&&q[k]!=null){ R.sc[id+':'+ci]=+q[k]; if(q[k]>=70) ps++; } });
    if(Object.keys(t.read||{}).length||Object.keys(q).length) R.bk[id]=1; R.tot[id]=m.chn||0; if(m.chn&&ps>=m.chn) R.ce[id]=1; R.tt[id]=+t.t||0; });
  ['mala','nmodel','burn'].forEach(function(p){ var B=H[p], t=rd('hh_learn_'+p); if(!B||!t) return; var L=B.secs||B.chapters||[], q=t.quiz||{}, ps=0;
    L.forEach(function(s,ci){ if(q[s.k]!=null){ R.sc[p+':'+ci]=+q[s.k]; if(q[s.k]>=70) ps++; } });
    if(Object.keys(t.seen||t.read||{}).length||Object.keys(q).length) R.bk[p]=1; R.tot[p]=L.length; if(L.length&&ps>=L.length) R.ce[p]=1; R.tt[p]=+t.t||0; });
  try{ var di=window.hhDaaInfo&&hhDaaInfo(), D=typeof window._hhDaa==='function'&&_hhDaa(), S=(window.HH_DAA||{}).stations||[];
    if(di&&D&&D.ST){ var M=(D.ST.st||{})[D.ST.lv||'yth']||{}; S.forEach(function(s,ci){ var r=M[s.k]; if(r&&r.q!=null) R.sc['daa:'+ci]=+r.q; });
      if(di.pct>0||di.res) R.bk.daa=1; R.tot.daa=di.tot||0; if(di.tot&&di.pass>=di.tot) R.ce.daa=1; R.tt.daa=+D.ST.t||0; } }catch(e){}
  return R; }
/* يقارن التقدم الحالي بآخر لقطة فيسجّل تاريخ كل اجتياز وبداية كتاب وشهادة من الآن فصاعداً */
function jSync(){ var J=jLoad(), R=jSrc(), now=Date.now(), ch=0, first=!J.init;
  var tOf=function(b){ var tt=R.tt[b]; return tt&&tt<=now&&tt>now-864e5*400?tt:now; }, nw=function(b){ return !first||(R.tt[b]&&now-R.tt[b]<6e5); };
  Object.keys(R.sc).forEach(function(k){ var v=R.sc[k]; if(v<70) return; var o=J.ps[k], b=k.split(':')[0], ci=+k.split(':')[1];
    if(!o){ var t=tOf(b), n=nw(b); J.ps[k]=[n?jDay(t):0,v]; ch=1; if(n) J.ev.unshift({k:'pass',b:b,ci:ci,p:v,t:t}); } else if(v>(o[1]||0)){ o[1]=v; ch=1; } });
  Object.keys(R.bk).forEach(function(b){ if(J.bs[b]==null){ var t=tOf(b), n=nw(b); J.bs[b]=n?jDay(t):0; ch=1; if(n) J.ev.unshift({k:'start',b:b,t:t}); } });
  Object.keys(R.ce).forEach(function(b){ if(J.cs[b]==null){ var t=tOf(b), n=nw(b); J.cs[b]=n?jDay(t):0; ch=1; if(n) J.ev.unshift({k:'cert',b:b,t:t+1}); } });
  if(first){ J.init=1; ch=1; }
  if(ch){ J.ev.sort(function(a,b){ return b.t-a.t; }); J.ev=J.ev.slice(0,40); jPersist(); }
  return R; }

/* تسجيل الإجابات: الصحيحة تزيل السؤال من المراجعة، والخاطئة تُحفظ بالسؤال وإجابة المتعلم والصحيحة والمصدر */
function jWi(id){ for(var i=0;i<JR.wr.length;i++) if(JR.wr[i].id===id) return i; return -1; }
function jAns(b,ci,q,o,ch,why,pg){ if(!b||!q||!o||!o.length||ch==null||ch<0||ch>=o.length) return; var J=jLoad(), d=jDay(), A=J.an[d]||(J.an[d]={}), a=A[b]||(A[b]=[0,0]), id=b+':'+ci+':'+hkey(q), i=jWi(id), now=Date.now();
  a[1]++;
  if(ch===0){ a[0]++; if(i>-1){ J.wr.splice(i,1); J.rm[id]=now; J.ev.unshift({k:'master',b:b,ci:ci,t:now}); J.ev=J.ev.slice(0,40); } }
  else { var w=i>-1?J.wr.splice(i,1)[0]:{}; J.wr.unshift({id:id,b:b,ci:ci,q:String(q).slice(0,400),o:o.map(function(x){ return String(x).slice(0,300); }),a:ch,why:why?String(why).slice(0,500):'',pg:pg||'',t:now,n:(w.n||0)+1}); delete J.rm[id]; J.wr=J.wr.slice(0,60); }
  jPersist(); }
function jTxt(e){ return e?String(e.textContent||'').trim():''; }
function jFindLib(h){ var qt=jTxt(h.querySelector('.l2-qq h2')), hd=jTxt(h.querySelector('.l2-qh b')), m=hd.match(/المحطة\s+(\d+)/), ci=m?+m[1]-1:-1, L=window.HH_LIB||{}, best=null; if(!qt) return null;
  Object.keys(L).forEach(function(b){ ((L[b]||{}).chapters||[]).forEach(function(c,j){ if(ci>-1&&j!==ci) return; (c.quiz||[]).forEach(function(q){ if(q.q===qt&&(!best||hd.indexOf(c.t)>-1)) best={b:b,ci:j,q:q}; }); }); });
  return best; }
function jFindP(p,h){ var qt=jTxt(h.querySelector('.l2-qq h2')), B=(window.HH_LEARN||{})[p], f=null; if(!qt||!B) return null;
  (B.chapters||[]).forEach(function(c,j){ (c.quiz||[]).forEach(function(q){ if(!f&&q.q===qt) f={ci:j,q:q}; }); }); return f; }
function jWrap(n,f){ var o=window[n]; if(typeof o!=='function'||o._j) return; var w=function(){ try{ f.apply(this,arguments); }catch(e){} return o.apply(this,arguments); }; w._j=1; window[n]=w; }
function jHook(){ try{ jSync(); }catch(e){}
  jWrap('hhLnPick',function(i){ if(V.st.pick!=null||i<0) return; var B=book(), S=B&&B.secs[V.sec], q=S&&S.qs[V.qi]; if(q&&q.pick) jAns(V.bk,V.sec,q.q,q.pick.o,i,q.pick.why,q.pick.pg); });
  jWrap('hhLnQ',function(i){ var Q=V.quiz; if(!Q||Q.ch!=null) return; var B=book(), S=B&&B.secs[V.sec], q=S&&S.qs[Q.idx[Q.i]]; if(q&&q.pick) jAns(V.bk,V.sec,q.q,q.pick.o,i,q.pick.why,q.pick.pg); });
  jWrap('hhLibQ',function(i){ var h=$('hh-learn'); if(!h||h.querySelector('.l2-opts .op[disabled]')) return; var f=jFindLib(h); if(f) jAns(f.b,f.ci,f.q.q,f.q.o,i,f.q.why,f.q.pg); });
  jWrap('hhLn2Q',function(i){ var X=typeof window._hhLn2==='function'&&_hhLn2(), Q=X&&X.V&&X.V.qz, B=(window.HH_LEARN||{}).nmodel; if(!Q||Q.ch!=null||!B||Q.i>=Q.idx.length) return; var c=B.chapters[X.V.ci], q=c&&(c.quiz||[])[Q.idx[Q.i]]; if(q) jAns('nmodel',X.V.ci,q.q,q.o,i,q.why,q.pg); });
  jWrap('hhLn3Q',function(i){ var h=$('hh-learn'); if(!h||h.querySelector('.l2-opts .op[disabled]')) return; var f=jFindP('burn',h); if(f) jAns('burn',f.ci,f.q.q,f.q.o,i,f.q.why,f.q.pg); }); }
if(document.readyState==='complete') setTimeout(jHook,0); else addEventListener('load',jHook);
/* «الداء والدواء»: إجابات الاختبار عبر data-a (يُلتقط قبل معالج البرنامج، ولا يُقرأ hh_daa_me) */
document.addEventListener('click',function(e){ try{ var b=e.target&&e.target.closest&&e.target.closest('#hh-learn.daa [data-a="qz-o"]'); if(!b||b.disabled) return; var D=typeof window._hhDaa==='function'&&_hhDaa(); if(!D||!D.V||!D.V.a||!D.V.a.qz||D.V.a.qz.ch!=null) return;
  var S=(window.HH_DAA||{}).stations||[], ci=-1; S.forEach(function(s,i){ if(s.k===D.V.k) ci=i; }); if(ci<0) return; var box=b.closest('.dq-qz'), qt=jTxt(box&&box.querySelector('h3')), s=S[ci], f=null;
  Object.keys(s.lv||{}).forEach(function(k){ ((s.lv[k]||{}).quiz||[]).forEach(function(q){ if(!f&&q.q===qt) f=q; }); });
  if(f) jAns('daa',ci,f.q,f.o,+b.getAttribute('data-v'),f.why,f.pg); }catch(x){} },true);

/* وقت التعلم: يُحسب كل 5 ثوانٍ والمحطة مفتوحة، ويتوقف إذا خُفي التبويب أو خمل المتعلم 90 ثانية */
function jLibBy(idx,title,n){ var L=window.HH_LIB||{}, r=''; Object.keys(L).forEach(function(b){ var C=(L[b]||{}).chapters||[]; if(!r&&C.length===n&&C[idx]&&C[idx].t===title) r=b; }); return r; }
function jCur(h){ var cl=h.classList, bar=h.querySelector('.l2-chbar'), on, idx;
  if(cl.contains('daa')){ var D=typeof window._hhDaa==='function'&&_hhDaa(); if(!D||!D.V||D.V.view!=='st') return ''; var S=(window.HH_DAA||{}).stations||[]; for(var i=0;i<S.length;i++) if(S[i].k===D.V.k) return 'daa:'+i; return ''; }
  if(cl.contains('lb')){ if(bar){ on=bar.querySelector('button.on'); idx=on?[].indexOf.call(bar.children,on):-1; var b=idx>-1?jLibBy(idx,on.getAttribute('title')||'',bar.children.length):''; return JLK.lb=b?b+':'+idx:''; }
    if(h.querySelector('.l2-qh')){ var f=jFindLib(h); if(f) JLK.lb=f.b+':'+f.ci; return JLK.lb; } return ''; }
  if(cl.contains('ln3')){ if(bar){ on=bar.querySelector('button.on'); idx=on?[].indexOf.call(bar.children,on):-1; return JLK.ln3=idx>-1?'burn:'+idx:''; } return h.querySelector('.l2-qh')?JLK.ln3:''; }
  if(cl.contains('ln2')){ var X=typeof window._hhLn2==='function'&&_hhLn2(); return X&&X.V&&(X.V.view==='ch'||X.V.view==='quiz')?'nmodel:'+X.V.ci:''; }
  return V.bk==='mala'&&(V.view==='sec'||V.view==='lesson'||V.view==='quiz')?'mala:'+V.sec:''; }
['pointerdown','keydown','wheel','touchstart','scroll'].forEach(function(n){ document.addEventListener(n,function(){ JLA=Date.now(); },{passive:true,capture:true}); });
var _jMM=0; document.addEventListener('mousemove',function(){ var n=Date.now(); if(n-_jMM>4000){ _jMM=n; JLA=n; } },{passive:true});
setInterval(function(){ try{ if(document.hidden) return; var h=$('hh-learn'); if(!h) return; _jN++; if(_jN%3===0) jSync(); if(Date.now()-JLA>90000) return; var k=jCur(h); if(!k) return;
  var J=jLoad(), d=jDay(); J.tm[k]=(J.tm[k]||0)+5; J.tmd[d]=(J.tmd[d]||0)+5; _jDirty++; if(_jDirty>=6) jPersist(); }catch(e){} },5000);
function jFlush(){ if(_jDirty&&JR){ jLocal(); jPush(); } }
document.addEventListener('visibilitychange',function(){ if(document.hidden) jFlush(); }); addEventListener('pagehide',jFlush);

/* ═══ عرض «رحلتي» ═══ */
function jTitle(b){ var H=window.HH_LEARN||{}; if(H[b]&&H[b].title) return H[b].title; if(b==='daa') return (BMx('daa')||{}).title||(window.HH_DAA||{}).title||'الداء والدواء'; return (BMx(b)||{}).title||''; }
function jStN(b,ci){ var H=window.HH_LEARN||{}; if(b==='mala'&&H.mala) return (H.mala.secs[ci]||{}).t||''; if((b==='nmodel'||b==='burn')&&H[b]) return (H[b].chapters[ci]||{}).t||''; if(b==='daa') return (((window.HH_DAA||{}).stations||[])[ci]||{}).t||''; return ((BMx(b)||{}).chs||[])[ci]||''; }
function jCat(b){ return b==='mala'?'sh':b==='nmodel'?'thk':b==='burn'?'tch':(BMx(b)||{}).cat||''; }
function jCol(b){ var m=BMx(b); if(m&&m.c) return m.c; return {mala:'linear-gradient(165deg,#8A1538,#5E0E26)',nmodel:'linear-gradient(165deg,#1F6F7A,#14474F)',burn:'linear-gradient(165deg,#C9A55E,#8A6D2E)'}[b]||'linear-gradient(165deg,#8A1538,#5E0E26)'; }
function jFmt(s){ if(s>0&&s<60) return 'أقل من دقيقة'; var m=Math.round((s||0)/60); if(m<60) return m+' د'; var h=Math.floor(m/60), r=m%60; return h+' س'+(r?' '+r+' د':''); }
function jDate(d){ try{ return new Date(d*864e5+new Date(d*864e5).getTimezoneOffset()*6e4+432e5).toLocaleDateString('ar-QA-u-nu-latn',{day:'numeric',month:'long'}); }catch(e){ return ''; } }
function jWhen(t){ var d=jDay(t), n=jDay()-d; return n<=0?'اليوم':n===1?'أمس':n<7?JWD[((d%7)+7)%7]:jDate(d); }
function jFrom(p){ var t0=jDay(); if(p==='wk') return t0-(t0+5)%7; if(p==='mo'){ var n=new Date(); return jDay(new Date(n.getFullYear(),n.getMonth(),1,12).getTime()); } return -1e9; }
function jAcc(f,t){ var ok=0,n=0; Object.keys(JR.an).forEach(function(d){ if(+d<f||(t!=null&&+d>t)) return; var A=JR.an[d]; Object.keys(A).forEach(function(b){ ok+=A[b][0]||0; n+=A[b][1]||0; }); }); return [ok,n]; }
function jCnt(o,f){ return Object.keys(o).filter(function(k){ var d=jD0(o[k]); return d&&d>=f; }).length; }
function jSec(f){ var s=0; Object.keys(JR.tmd).forEach(function(d){ if(+d>=f) s+=JR.tmd[d]; }); return s; }
function jNotes(){ return (rd('hh_lib_notes')||[]).filter(function(n){ return n&&n.x; }); }
/* نشاط كل يوم من البيانات الفعلية: دقائق التعلم، والإجابات، والاجتيازات، والإضاءات، وأيام البرنامج الأول */
function jAct(){ var A={}, add=function(d,v){ if(d) A[d]=(A[d]||0)+v; };
  Object.keys(JR.tmd).forEach(function(d){ add(+d,JR.tmd[d]/60); }); Object.keys(JR.an).forEach(function(d){ var X=JR.an[d]; Object.keys(X).forEach(function(b){ add(+d,X[b][1]||0); }); });
  Object.keys(JR.ps).forEach(function(k){ add(jD0(JR.ps[k]),3); }); jNotes().forEach(function(n){ if(n.t) add(jDay(n.t),1); });
  var m=rd('hh_learn_mala'); if(m&&m.days) Object.keys(m.days).forEach(function(d){ if(m.days[d]) add(+d,2); });
  return A; }
function jStreak(A){ var t0=jDay(), d=A[t0]?t0:t0-1, cur=0, best=0, run=0; while(A[d]>0){ cur++; d--; }
  var D=Object.keys(A).map(Number).filter(function(x){ return A[x]>0; }).sort(function(a,b){ return a-b; }); D.forEach(function(x,i){ run=i&&x===D[i-1]+1?run+1:1; if(run>best) best=run; }); return {cur:cur,best:best}; }
function jSeg(){ return '<div class="lhj-seg" role="group" aria-label="الفترة">'+[['wk','هذا الأسبوع'],['mo','هذا الشهر'],['all','منذ البداية']].map(function(x){ return '<button type="button" aria-pressed="'+(JP===x[0])+'" onclick="hhJPer(\''+x[0]+'\')">'+x[1]+'</button>'; }).join('')+'</div>'; }
function jHero(JJ,K){ var s=JJ.s, L=Math.min(5,Math.floor(s/6)+1), inL=s-(L-1)*6, pc=L>=5?100:Math.round(inL/6*100), left=6-inL, ch=[];
  if(s) ch.push('أكملت '+nAr(s,'s')); if(JJ.b) ch.push('بدأت '+nAr(JJ.b,'b')); if(K.best>1) ch.push('أطول سلسلة '+jDays(K.best));
  return '<div class="lhj-lvl"><div class="lhj-ring" style="--p:'+pc+'%" role="img" aria-label="المستوى '+L+'، '+pc+'% منه"><div><span><b>'+L+'</b><small>المستوى</small></span></div></div><div class="tx"><h2>'+JLV[L-1]+'</h2>'
   +'<p>'+(L<5?'بقي لك '+nAr(left,'s')+' لتصل إلى المستوى '+(L+1)+': «'+JLV[L]+'».':'بلغت أعلى مستوى في «تعلّم»، فواصل القراءة والمراجعة.')+(s?'':' كل 6 محطات تجتاز اختبارها مستوى جديد.')+'</p>'
   +(ch.length?'<div class="nx">'+ch.map(function(c){ return '<span>'+c+'</span>'; }).join('')+'</div>':'')+'</div></div>'; }
function jWeek(K){ var J=JR, g=J.goal, t0=jDay(), w0=t0-(t0+5)%7, k=g?g.k:'s', D=['س','ح','ن','ث','ر','خ','ج'], tot=0, sec=0, pd={}, c='';
  Object.keys(J.ps).forEach(function(x){ var d=jD0(J.ps[x]); if(d) pd[d]=(pd[d]||0)+1; });
  for(var i=0;i<7;i++){ var d=w0+i, v=k==='m'?Math.round((J.tmd[d]||0)/60):(pd[d]||0); if(k==='m') sec+=J.tmd[d]||0; else tot+=pd[d]||0;
    c+='<div><span aria-hidden="true">'+D[i]+'</span><i class="'+(v>0?'on':'')+(d===t0?' td':'')+'" title="'+JWD[(d%7+7)%7]+(v>0?'، '+v+(k==='m'?' دقيقة':' '+(v===1?'محطة':'محطات')):'')+'">'+(v>0?v:d===t0?'اليوم':'')+'</i></div>'; }
  if(k==='m') tot=Math.round(sec/60);
  var gl=g?(k==='m'?g.n+' دقيقة':nAr(g.n,'s')):'', sk=K.cur?'سلسلة '+jDays(K.cur):'ابدأ سلسلتك اليوم', row;
  if(JX.gl){ var vals=JX.gk==='m'?[30,60,90,120,180]:[2,3,5,7,10];
    row='<div class="lhj-gp"><div class="k" role="group" aria-label="نوع الهدف">'+[['s','محطات'],['m','دقائق']].map(function(x){ return '<button type="button" aria-pressed="'+(JX.gk===x[0])+'" onclick="hhJGoalK(\''+x[0]+'\')">'+x[1]+'</button>'; }).join('')+'</div>'
     +'<div class="v">'+vals.map(function(n){ return '<button type="button" class="'+(g&&g.k===JX.gk&&g.n===n?'on':'')+'" onclick="hhJGoalSet('+n+')">'+(JX.gk==='m'?n+' دقيقة':nAr(n,'s'))+'</button>'; }).join('')+'</div>'
     +'<div class="f">'+(g?'<button type="button" onclick="hhJGoalSet(0)">احذف الهدف</button>':'')+'<button type="button" onclick="hhJGoal()">إغلاق</button></div></div>'; }
  else if(g){ var p=Math.min(100,Math.round(tot/g.n*100)); row='<div class="lhj-goal"><span>'+(tot>=g.n?'بلغت هدفك':tot+' من '+g.n+(k==='m'?' دقيقة':''))+'</span><div class="bar" role="img" aria-label="'+p+'% من هدف الأسبوع"><i style="width:'+p+'%"></i></div><span>'+sk+'</span></div>'; }
  else row='<div class="lhj-goal"><span class="mu">اختر هدفاً أسبوعياً: عدد محطات أو دقائق، وتابع تقدمك نحوه</span><span>'+sk+'</span></div>';
  return '<div class="lhj-wk"><div class="hd"><h4>هذا الأسبوع</h4><button type="button" class="gb" aria-expanded="'+(!!JX.gl)+'" onclick="hhJGoal()">'+sv('target',15)+(g?'هدفك: '+gl:'اختر هدفك')+'</button></div><div class="lhj-days">'+c+'</div>'+row+'</div>'; }
function jKpi(JJ,R){ var f=jFrom(JP), all=JP==='all', mo=jFrom('mo'), N=jNotes(), ac=all?jAcc(-1e9):jAcc(f), acp=null;
  if(JP==='mo'){ var pm=new Date(), a0=jDay(new Date(pm.getFullYear(),pm.getMonth()-1,1,12).getTime()); acp=jAcc(a0,f-1); }
  var ps=all?JJ.s:jCnt(JR.ps,f), bs=all?JJ.b:jCnt(JR.bs,f), nt=all?N.length:N.filter(function(n){ return n.t&&jDay(n.t)>=f; }).length, ce=all?JJ.C.length:jCnt(JR.cs,f);
  var sec=0; if(all) Object.keys(JR.tm).forEach(function(k){ sec+=JR.tm[k]; }); else sec=jSec(f);
  var pm1=jCnt(JR.ps,mo), bm1=jCnt(JR.bs,mo), acc=ac[1]?Math.round(ac[0]/ac[1]*100):null, dif='';
  if(acc!=null&&acp&&acp[1]>=5&&ac[1]>=5){ var o=Math.round(acp[0]/acp[1]*100), d=acc-o; dif=d>0?'أعلى بـ '+d+'% من الشهر الماضي':d<0?'أقل بـ '+(-d)+'% من الشهر الماضي':'مثل الشهر الماضي'; }
  var T=[[ps,'محطة اجتزتها',all&&pm1?'+'+pm1+' هذا الشهر':'',R&&R.res?R.res.go:"hhJGo('lhj-bks')"],[bs,bs===1?'كتاب بدأته':'كتب بدأتها',all&&bm1?'+'+bm1+' هذا الشهر':'',"hhJGo('lhj-bks')"],
    [acc==null?null:acc+'%','دقة الإجابات',dif||(ac[1]?'في '+nAr(ac[1],'q'):'تُحسب من إجاباتك في الاختبارات'),"hhJGo('lhj-rv')"],[nt,nt===1?'إضاءة حفظتها':'إضاءات حفظتها','',"hhLibGo('notes')"],
    [jFmt(sec),'وقت التعلم',sec?'':'يُحسب وأنت داخل المحطات',''],[ce,ce===1?'شهادة':'شهادات','',"hhJGo('lhj-ce')"]];
  return '<div class="lhj-kp">'+T.map(function(t){ var inner=(t[0]==null?'<b class="na">لا إجابات بعد</b>':'<b'+(t[0]==='أقل من دقيقة'?' class="na"':'')+'>'+t[0]+'</b>')+'<small>'+t[1]+'</small>'+(t[2]?'<em'+(/^أقل|^تُحسب|^يُحسب|^في /.test(t[2])?' class="mu"':'')+'>'+t[2]+'</em>':'');
    return t[3]?'<button type="button" onclick="'+t[3]+'">'+inner+'</button>':'<div>'+inner+'</div>'; }).join('')+'</div>'; }
function jBooks(){ var x=LX(), L=[];
  Object.keys(x.books||{}).forEach(function(id){ var m=x.books[id]; if(!m||m.ext) return; var s=rd('hh_lib_'+id); if(!s||!(Object.keys(s.read||{}).length||Object.keys(s.quiz||{}).length)) return; var p=Math.max(0,Math.min(100,Math.round(+s.p||0))); if(p>=100) return;
    var la=s.last, ci=la?la.ci:0; L.push({b:id,t:+s.t||0,p:p,c:m.c,sub:la?'المحطة '+(ci+1)+(jStN(id,ci)?': '+jStN(id,ci):''):'',go:la?"hhLibOpenAt2('"+id+"',"+ci+","+(la.si||0)+")":"hhLibOpenAt('"+id+"',0)"}); });
  progs().forEach(function(i){ var p=Math.max(0,Math.min(100,Math.round(+i.pct||0))); if(!(i.res||p>0)||p>=100) return; L.push({b:i.id,t:+i.t||0,p:p,c:jCol(i.id),sub:i.res?i.res.h:'',go:i.res?i.res.go:i.open}); });
  try{ var di=window.hhDaaInfo&&hhDaaInfo(); if(di){ var p=Math.max(0,Math.min(100,Math.round(+di.pct||0))); if((di.res||p>0)&&p<100) L.push({b:'daa',t:+di.t||0,p:p,c:jCol('daa'),sub:di.res?di.res.h+(di.res.x?': '+di.res.x:''):'',go:di.res?di.res.go:'hhDaaOpen()'}); } }catch(e){}
  return L.sort(function(a,b){ return b.t-a.t; }); }
function jBooksHTML(L){ if(!L.length) return '<div class="lhj-box lhj-emp"><p>لم تبدأ كتاباً بعد. اختر كتاباً، وابدأ محطته الأولى.</p><button type="button" class="lhj-go" onclick="'+(desk()?"hhLhPage('lib')":"hhLearnTab('books')")+'">'+sv('book',15)+'اختر كتاباً</button></div>';
  return '<div class="lhj-box">'+(JX.bk?L:L.slice(0,4)).map(function(b){ return '<div class="lhj-bk"><span class="cv" style="background:'+b.c+'"></span><div class="tx"><b>'+esc(jTitle(b.b))+'</b>'+(b.sub?'<small>'+esc(b.sub)+'</small>':'')+'</div><div class="pg"><div class="pb" role="img" aria-label="تقدمك '+b.p+'%"><i style="width:'+b.p+'%"></i></div><span>'+b.p+'%</span></div><button type="button" class="lhj-go" onclick="'+b.go+'">تابع</button></div>'; }).join('')+'</div>'; }
function jHeat(A){ var t0=jDay(), h='', any=0;
  for(var d=t0-89;d<=t0;d++){ var v=A[d]||0, l=v<=0?0:v<5?1:v<15?2:v<30?3:4, mn=Math.round((JR.tmd[d]||0)/60); if(v>0) any=1; h+='<i class="'+(l?'l'+l:'')+(d===t0?' td':'')+'" title="'+jDate(d)+(mn?'، '+mn+' دقيقة':'')+(v>0?'':'، لا نشاط')+'"></i>'; }
  return '<div class="lhj-hm" role="img" aria-label="نشاطك في آخر 90 يوماً">'+h+'</div><div class="lhj-lg"><span>أقل</span><i></i><i class="l1"></i><i class="l2"></i><i class="l3"></i><i class="l4"></i><span>أكثر</span></div>'
   +(any?'':'<p class="lhj-hint">تظهر هنا أيام تعلّمك: كلما قرأت أو أجبت أو اجتزت محطة ازداد لون اليوم.</p>'); }
function jStrength(R){ var C={}, cats=LX().cats||{};
  Object.keys(R.sc).forEach(function(k){ var b=k.split(':')[0], c=jCat(b); if(!c||!cats[c]) return; var o=C[c]||(C[c]=[0,0]); o[0]+=R.sc[k]; o[1]++; });
  var L=Object.keys(C).map(function(c){ return [cats[c],Math.round(C[c][0]/C[c][1]),C[c][1]]; }).sort(function(a,b){ return b[1]-a[1]; }).slice(0,5);
  if(!L.length) return '<p class="lhj-hint">اختبر نفسك في محطة، فيظهر هنا أين أنت أقوى.</p>';
  return '<div class="lhj-sk">'+L.map(function(x){ var col=x[1]>=80?'#2F8F5B':x[1]>=60?'#C9961A':'#C0425E'; return '<div title="'+nAr(x[2],'s')+'"><span>'+esc(x[0])+'</span><span class="bar" role="img" aria-label="'+x[1]+'%"><i style="width:'+x[1]+'%;background:'+col+'"></i></span><b>'+x[1]+'%</b></div>'; }).join('')+'</div>'; }
function jSrcT(w){ return '«'+esc(jTitle(w.b))+'»، المحطة '+(w.ci+1); }
function jRetry(){ var R=JX.rt; if(!R) return ''; var w=R.w, ord=ordOf(w.o.length,w.id+R.n), ch=R.ch;
  return '<div class="lhj-rt" id="lhj-rt"><div class="hd"><small>'+jSrcT(w)+'</small><button type="button" class="x" aria-label="إغلاق" onclick="hhJTryX()">'+sv('x',15,2.4)+'</button></div><h4>'+esc(w.q)+'</h4><div class="op" role="group">'
   +ord.map(function(i,j){ var c=ch==null?'':i===0?' ok':i===ch?' no':' dim'; return '<button type="button" class="'+c+'"'+(ch!=null?' disabled':'')+' onclick="hhJPick('+i+')"><span>'+['أ','ب','ج','د','هـ'][j]+'</span>'+esc(w.o[i])+'</button>'; }).join('')+'</div>'
   +(ch!=null?'<div class="why'+(ch===0?' ok':'')+'"><b>'+(ch===0?'أحسنت، أتقنته، وأُزيل من قائمة المراجعة.':'ليس بعد، والصحيح هو المضيء. يبقى في قائمتك لتعود إليه.')+'</b>'+(w.why?'<p>لماذا؟ '+q2(w.why)+(w.pg?' <small>صفحة '+esc(w.pg)+'</small>':'')+'</p>':'')
     +'<div class="ft">'+(jNext(w.id)?'<button type="button" class="lhj-go" onclick="hhJTry(\''+jNext(w.id)+'\')">السؤال التالي</button>':'')+'<button type="button" class="lhj-s" onclick="'+jGoSt(w.b,w.ci)+'">افتح المحطة</button></div></div>':'<p class="was">إجابتك السابقة: '+esc(w.o[w.a]||'')+'</p>')+'</div>'; }
function jNext(id){ var r=''; JR.wr.forEach(function(x){ if(!r&&x.id!==id) r=x.id; }); return r; }
function jGoSt(b,ci){ if(b==='mala') return "hhLnGo('book');hhLnGo('sec',"+ci+")"; if(b==='nmodel') return "hhLn2Open('ch',"+ci+")"; if(b==='burn') return "hhLn3Open('ch',"+ci+")";
  if(b==='daa'){ var s=((window.HH_DAA||{}).stations||[])[ci]; return s?"hhDaaOpen({st:'"+s.k+"'})":'hhDaaOpen()'; } return "hhLibOpenAt('"+b+"',"+ci+")"; }
function jReview(){ var W=JR.wr, act=JX.rt&&JX.rt.w.id, L=W.filter(function(w){ return w.id!==act; });
  var list=(JX.wr?L:L.slice(0,3)).map(function(w,i){ return '<div class="lhj-rv"><i>'+(i+1)+'</i><div class="tx"><b>'+esc(w.q)+'</b><small>'+jSrcT(w)+(w.n>1?'، أخطأت فيه '+(w.n===2?'مرتين':w.n<=10?w.n+' مرات':w.n+' مرة'):'')+'</small></div><button type="button" class="lhj-s" onclick="hhJTry(\''+w.id+'\')">أعد المحاولة</button></div>'; }).join('');
  if(!W.length&&!JX.rt) return '<div class="lhj-box lhj-emp"><p>لا أسئلة للمراجعة. كل سؤال لا تصيب فيه في اختبارات المحطات يُحفظ هنا مع جوابه الصحيح، لتعيد المحاولة حتى تتقنه.</p></div>';
  return '<div class="lhj-box">'+jRetry()+list+'</div>'; }
function jTimeline(){ var E=JR.ev.map(function(e){ var T=jTitle(e.b), x=e.k==='pass'?'اجتزت اختبار المحطة '+(e.ci+1)+' في «'+T+'» بنسبة '+e.p+'%':e.k==='start'?'بدأت «'+T+'»':e.k==='cert'?'أتممت «'+T+'» واستحققت شهادته':e.k==='master'?'أتقنت سؤالاً أخطأت فيه من «'+T+'»':''; return x?{t:e.t,x:x}:null; }).filter(Boolean);
  jNotes().forEach(function(n){ if(n.t) E.push({t:n.t,x:'حفظت إضاءة: «'+String(n.x).replace(/^[«"\s]+|[»"\s.]+$/g,'').slice(0,70)+(String(n.x).length>72?'…':'')+'»'}); });
  E.sort(function(a,b){ return b.t-a.t; }); E=E.slice(0,5);
  if(!E.length) return '<div class="lhj-box lhj-emp"><p>يظهر هنا ما تنجزه أولاً بأول: المحطات التي تجتازها، والكتب التي تبدؤها، والإضاءات التي تحفظها.</p></div>';
  return '<div class="lhj-box lhj-tl">'+E.map(function(e){ return '<div><span>'+jWhen(e.t)+'</span><i aria-hidden="true"></i><p>'+esc(e.x)+'</p></div>'; }).join('')+'</div>'; }
function jCerts(JJ,R){ var C=JJ.C.map(function(c){ var d=jD0(JR.cs[c[2]]); return '<button type="button" class="c" onclick="'+c[1]+'"><span class="md">'+sv('badge',26)+'</span><b>«'+esc(c[0])+'»</b><small>'+(d?'اكتسبتها في '+jDate(d):'جاهزة، اكتب اسمك واطبعها')+'</small></button>'; });
  var N=[]; Object.keys(R.bk).forEach(function(b){ if(R.ce[b]||!R.tot[b]) return; var ps=0; Object.keys(R.sc).forEach(function(k){ if(k.split(':')[0]===b&&R.sc[k]>=70) ps++; }); N.push([b,R.tot[b]-ps,Math.round(ps/R.tot[b]*100)]); });
  N.sort(function(a,b){ return a[1]-b[1]; });
  var cards=C.concat(N.map(function(n){ return '<div class="c lock"><span class="md">'+sv('lock',24)+'</span><b>«'+esc(jTitle(n[0]))+'»</b><small>بقيت '+nAr(n[1],'s')+'</small><span class="bar" role="img" aria-label="اجتزت '+n[2]+'%"><i style="width:'+n[2]+'%"></i></span></div>'; })).slice(0,4);
  if(!cards.length) return '<div class="lhj-box lhj-emp"><p>اجتز اختبارات محطات أي كتاب بنسبة 70% فأكثر، فتظهر شهادته هنا، ومعها الشهادات القريبة منك.</p></div>';
  return '<div class="lhj-ce">'+cards.join('')+'</div>'; }
function jLit(){ var N=jNotes().slice().sort(function(a,b){ return (b.t||0)-(a.t||0); }).slice(0,3);
  if(!N.length) return '<div class="lhj-box lhj-emp"><p>احفظ عبارة من أي محطة في دفتر الإضاءات، فتظهر هنا.</p></div>';
  return '<div class="lhj-lit">'+N.map(function(n){ var T=jTitle(n.b); return '<div class="lt">'+q2(n.x)+'<small>'+(T?'«'+esc(T)+'»':'')+(n.pg?(T?'، ':'')+'صفحة '+esc(n.pg):'')+'</small></div>'; }).join('')+'</div>'; }
function jPage(R){ var J=jLoad(), S=jSync(), JJ=journey(), A=jAct(), K=jStreak(A), BK=jBooks(), nN=jNotes().length, nW=J.wr.length;
  return '<div class="lhj" id="lhj"><div class="lhj-top"><div class="tt"><h1>رحلتي</h1><small>كل ما تعلمته في «تعلّم»، في مكان واحد</small></div>'+jSeg()+'</div>'
   +'<div class="lhj-hero">'+jHero(JJ,K)+jWeek(K)+'</div>'+jKpi(JJ,R)
   +'<div class="lhj-g2"><div id="lhj-bks">'+h2('كتبي الجارية','تابع من حيث وقفت',BK.length>4?'<button type="button" onclick="hhJBkAll()">'+(JX.bk?'اعرض أقل':'كل كتبي '+BK.length)+'</button>':'')+jBooksHTML(BK)+'</div>'
   +'<div>'+h2('نشاطي','آخر 90 يوماً')+'<div class="lhj-box">'+jHeat(A)+'<div class="lhj-h3"><b>أين أنا أقوى؟</b><small>متوسط أفضل نتائجي في اختبارات كل مجال</small></div>'+jStrength(S)+'</div></div></div>'
   +'<div class="lhj-g2"><div id="lhj-rv">'+h2('راجع ما أخطأت فيه','أسئلة لم تُصب فيها، مع «لماذا؟»',nW>3?'<button type="button" onclick="hhJWrAll()">'+(JX.wr?'اعرض أقل':'كل المراجعة '+nW)+'</button>':'')+jReview()+'</div>'
   +'<div>'+h2('آخر نشاطي')+jTimeline()+'</div></div>'
   +'<div id="lhj-ce">'+h2('شهاداتي','المكتسبة والقريبة',desk()?'<button type="button" onclick="hhLhPage(\'certs\')">كل الشهادات</button>':'')+jCerts(JJ,S)+'</div>'
   +h2('من دفتر إضاءاتي','',nN?'<button type="button" onclick="hhLibGo(\'notes\')">الدفتر كاملاً '+nN+'</button>':'')+jLit()+'</div>'; }
function jMob(R){ return '<div class="ln-wrap lh lh6">'+crumbs([['الرئيسية','hhLearnClose()'],['تعلّم',"hhLearnTab('self')"],['رحلتي']])+jPage(R)+tools()+'</div>'; }
function jOpenBtn(){ return '<button type="button" class="lhj-open" onclick="hhJourney()"><i>'+sv('user',20)+'</i><span><b>افتح رحلتي كاملة</b><small>مستواك، وهدفك الأسبوعي، ووقت تعلّمك، وما أخطأت فيه</small></span>'+sv('back',16,2.4)+'</button>'; }
window.hhJourney=function(){ if(!$('hh-learn')){ hhLearnOpen('self'); } if(desk()){ hhLhPage('journey'); return; } setLP('journey'); JM=1; go('home'); };
window.hhJPer=function(p){ JP=p==='wk'||p==='mo'?p:'all'; try{ localStorage.setItem('hh_journey_p',JP); }catch(e){} rr(); };
window.hhJGoal=function(){ JX.gl=!JX.gl; JX.gk=(JR&&JR.goal&&JR.goal.k)||'s'; rr(); };
window.hhJGoalK=function(k){ JX.gk=k==='m'?'m':'s'; rr(); };
window.hhJGoalSet=function(n){ jLoad(); if(n>0){ JR.goal={k:JX.gk,n:n,t:Date.now()}; toastX('هدفك هذا الأسبوع: '+(JX.gk==='m'?n+' دقيقة':nAr(n,'s')),'success'); } else { JR.goal=null; JR.gt=Date.now(); } JX.gl=0; jPersist(); rr(); };
window.hhJTry=function(id){ jLoad(); var w=null; JR.wr.forEach(function(x){ if(x.id===id) w=x; }); if(!w) return; JX.rt={w:JSON.parse(JSON.stringify(w)),ch:null,n:(JX.rt?JX.rt.n+1:0)}; rr(); var e=$('lhj-rt'); if(e){ var r=e.getBoundingClientRect(); if(r.top<70||r.bottom>innerHeight) e.scrollIntoView({block:'nearest'}); var b=e.querySelector('.op button'); if(b) try{ b.focus({preventScroll:true}); }catch(x){} } };
window.hhJPick=function(i){ var R=JX.rt; if(!R||R.ch!=null) return; R.ch=i; var w=R.w; jAns(w.b,w.ci,w.q,w.o,i,w.why,w.pg); rr(); };
window.hhJTryX=function(){ JX.rt=null; rr(); };
window.hhJWrAll=function(){ JX.wr=!JX.wr; rr(); };
window.hhJBkAll=function(){ JX.bk=!JX.bk; rr(); };
window.hhJGo=function(id){ var e=$(id); if(e) e.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'}); };
/* ملخص للقراءة فقط (اختبارات وأجزاء أخرى) */
window.hhJourneyInfo=function(){ jLoad(); var JJ=journey(), L=Math.min(5,Math.floor(JJ.s/6)+1), s=0; Object.keys(JR.tm).forEach(function(k){ s+=JR.tm[k]; }); return {level:L,name:JLV[L-1],stations:JJ.s,books:JJ.b,sec:s,tm:JSON.parse(JSON.stringify(JR.tm)),wrong:JR.wr.length,goal:JR.goal||null}; };
(function(){ var r=function(){ JM=0; JX.rt=null; JX.gl=0; };
  ['hhLearnTab','hhLhPage','hhLearnOpen'].forEach(function(n){ var o=window[n]; if(typeof o!=='function'||o._jm) return; var w=function(){ r(); return o.apply(this,arguments); }; w._jm=1; window[n]=w; });
  var g=window.hhLnGo; if(typeof g==='function'){ var w=function(v){ if(v!=='home') JM=0; return g.apply(this,arguments); }; window.hhLnGo=w; } })();

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
   +lnTools()+'<div class="ln-sh"><h2>مسار الكتاب</h2><small>تسع محطات بترتيب الكتاب'+(V.mode==='self'?'، وتُفتح المحطة التالية بعد اجتياز اختبار المحطة':'')+'</small>'+modeSeg()+'</div>'
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
   +'<button type="button" class="ln-b" onclick="hhLnGame('+si+')">'+sv('boxes',16)+'العبها على الشاشة</button>'+(S.k==='tafseer'?'<button type="button" class="ln-b" onclick="hhLnGo(\'listen\',0)">'+sv('play',16)+'استمع ثم احفظ</button>':S.k==='adhkar'?'<button type="button" class="ln-b" onclick="hhLnGo(\'wird\')">'+sv('spark',16)+'ورد الأذكار اليومي</button>':'')+'</div></div>'
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
   +(ch==null?'<button type="button" class="ln-skip" onclick="hhLnPick(-1)">'+sv('eye',15)+'اكشف الجواب</button>':whyBox(q))+'</div>';
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
function sEv(q,S){ return '<div class="ln-evs">'+qTitle(q,S)+(S.k==='tafseer'?'<p class="ln-hint">اقرأ السورة كاملة، ورددها حتى تحفظها</p><p class="ln-hint"><button type="button" class="ln-b" onclick="hhLnGo(\'listen\','+V.qi+')">'+sv('play',15)+'استمع ثم احفظ</button></p>':'')+q.ev.map(evHTML).join('')+'</div>'; }
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
   +'<div class="ln-opts">'+Q.ord.map(function(i,j){ var c=Q.ch==null?'':i===0?' ok':i===Q.ch?' no':' off'; return '<button type="button" class="ln-op'+c+'" onclick="hhLnQ('+i+')" '+(Q.ch!=null?'disabled':'')+'><span class="l">'+['أ','ب','ج','د'][j]+'</span><span class="t">'+esc(o[i])+'</span></button>'; }).join('')+'</div>'+(Q.ch!=null?whyBox(q):'')+'</div>'
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

/* ═══ إضافات البرنامج الأول: زهرة الفنون، ورد الأذكار، استمع ثم احفظ، لماذا؟ ═══ */
P.pause='<path d="M8 5v14M16 5v14"/>';
function secBy(k){ var B=book(), r=-1; if(B) B.secs.forEach(function(s,i){ if(s.k===k) r=i; }); return r; }
function cntTxt(S){ var n=S.qs.length; return S.k==='tafseer'?n+' سورة':S.k==='hadith'?n+' حديثاً':n+' سؤالاً'; }
function whyBox(q){ var w=q&&q.pick&&q.pick.why; if(!w) return ''; w=String(w); return '<div class="ln-why"><b>'+sv('q',15)+'لماذا؟</b><p>'+(w.indexOf('«')>-1?esc(w):'«'+esc(w.replace(/[.،]\s*$/,''))+'»')+'</p>'+(q.pick.pg?'<small>صفحة '+esc(q.pick.pg)+'</small>':'')+'</div>'; }
function lnTools(){ var B=book(), ti=secBy('tafseer'), ai=secBy('adhkar'), W=wItems(), w=wGet(), dn=W.filter(function(x){ return (w.c[x.id]||0)>=x.n; }).length;
  var L=[['#1F7A93','grid','زهرة الفنون التسعة','الكتاب كله في نظرة واحدة: '+B.secs.length+' فنون، و'+B.n+' سؤالاً',"hhLnGo('map')"]];
  if(ai>-1&&W.length) L.push([B.secs[ai].c,'spark','ورد الأذكار اليومي',dn?'أتممت اليوم '+dn+' من '+W.length:W.length+' ذكراً من الكتاب، بعدّاد لكل ذكر',"hhLnGo('wird')"]);
  if(ti>-1) L.push([B.secs[ti].c,'play','استمع ثم احفظ',B.secs[ti].qs.length+' سورة بصوت العفاسي، ثم اختبار حفظ',"hhLnGo('listen',0)"]);
  return '<div class="ln-tools">'+L.map(function(x){ return '<button type="button" style="--k:'+x[0]+'" onclick="'+x[4]+'"><i>'+sv(x[1],22)+'</i><span><b>'+x[2]+'</b><small>'+esc(x[3])+'</small></span></button>'; }).join('')+'</div>'; }
var _lnGo=window.hhLnGo;
window.hhLnGo=function(v,a,b){ lnStop(); if(V.mapScr){ V.mapScr=0; try{ if(document.fullscreenElement) document.exitFullscreen(); }catch(e){} }
  if(v==='map'){ if(!book()) return; go('map'); }
  else if(v==='wird'){ if(!wItems().length) return; go('wird'); }
  else if(v==='listen'){ var T=tafS(); if(!T) return; var i=Math.max(0,Math.min(T.qs.length-1,+a||0)); if(!V.ls||V.ls.i!==i) V.ls={i:i,a:0,rep:(V.ls&&V.ls.rep)||1,pl:0,t:null}; go('listen'); }
  else _lnGo(v,a,b); };
var _lnCl=window.hhLearnClose; window.hhLearnClose=function(){ lnStop(); if(V.mapScr){ V.mapScr=0; try{ if(document.fullscreenElement) document.exitFullscreen(); }catch(e){} } return _lnCl.apply(this,arguments); };

/* زهرة الفنون التسعة */
function mapSamples(S){ return S.qs.slice(0,3).map(function(q){ return S.k==='tafseer'&&q.ev&&q.ev[0]&&q.ev[0].ref?String(q.ev[0].ref).split(':')[0].trim():q.q; }); }
function mapCard(i){ var B=book(), S=B.secs[i];
  return '<div class="ln-mc" id="ln-mc" style="--k:'+S.c+'"><div class="tx"><em>الفن '+(i+1)+' من '+B.secs.length+'، '+cntTxt(S)+'</em><b>'+esc(S.t)+'</b>'+(S.intro?'<p>'+esc(S.intro)+'</p>':'')+'<ul>'+mapSamples(S).map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('')+'</ul></div>'
   +(V.mapScr?'':'<button type="button" class="ln-b p" onclick="hhLnGo(\'sec\','+i+')">'+sv('play',15)+'افتح المحطة</button>')+'</div>'; }
function vMap(){ var B=book(), scr=!!V.mapScr, mi=V.mapI||0;
  return '<div class="ln-wrap ln-mapw'+(scr?' scr':'')+'">'+(scr?'':crumbs([['تعلّم',"hhLnGo('home')"],[B.title,"hhLnGo('book')"],['زهرة الفنون التسعة']]))
   +'<div class="ln-mhd"><h1>زهرة الفنون التسعة</h1><p>الكتاب كله في نظرة واحدة: كل ورقة فنّ، اضغطها لترى أمثلة من أسئلته.</p><div class="bt">'
   +(scr?'<button type="button" class="ln-b" onclick="hhLnMapScr(0)">'+sv('x',16,2.4)+'إنهاء العرض</button>':'<button type="button" class="ln-b" onclick="hhLnMapPrint()">'+sv('print',16)+'اطبعها</button><button type="button" class="ln-b" onclick="hhLnMapScr(1)">'+sv('tv',16)+'اعرضها على الصف</button>')+'</div></div>'
   +'<div class="ln-fl" id="ln-fl"><svg id="ln-flsvg" aria-hidden="true"></svg><div class="core"><div><b>ما لا يسع<br>أطفال المسلمين<br>جهله</b><small>'+B.n+' سؤالاً في '+B.secs.length+' فنون</small></div></div>'
   +B.secs.map(function(S,i){ return '<button type="button" class="pt'+(i===mi?' on':'')+'" style="--k:'+S.c+'" aria-pressed="'+(i===mi)+'" onclick="hhLnMapPick('+i+')"><i>'+(i+1)+'</i><b>'+esc(S.t)+'</b><small>'+cntTxt(S)+'</small></button>'; }).join('')+'</div>'
   +mapCard(mi)+'</div>'; }
function layMap(){ var fl=$('ln-fl'), sg=$('ln-flsvg'); if(!fl||!sg) return; var L=fl.querySelectorAll('.pt');
  if(window.innerWidth<=860){ L.forEach(function(b){ b.style.left=''; b.style.top=''; }); sg.innerHTML=''; return; }
  var W=fl.offsetWidth, H=fl.offsetHeight, cx=W/2, cy=H/2, r=Math.min(W*.36,H*.384), s='', B=book();
  L.forEach(function(b,i){ var a=-Math.PI/2+i*2*Math.PI/L.length, x=cx+Math.cos(a)*r*1.18, y=cy+Math.sin(a)*r, c=B.secs[i].c;
    s+='<path d="M'+cx+' '+cy+' Q'+(cx+Math.cos(a+.35)*r*.6)+' '+(cy+Math.sin(a+.35)*r*.6)+' '+x+' '+y+'" fill="none" stroke="'+c+'" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/>';
    b.style.left=x+'px'; b.style.top=y+'px'; });
  sg.innerHTML=s; }
window.addEventListener('resize',function(){ if($('hh-learn')&&V.view==='map') layMap(); });
window.hhLnMapPick=function(i){ V.mapI=i; var fl=$('ln-fl'); if(fl) fl.querySelectorAll('.pt').forEach(function(b,j){ b.classList.toggle('on',j===i); b.setAttribute('aria-pressed',j===i); }); var c=$('ln-mc'); if(c){ c.outerHTML=mapCard(i); if(window.innerWidth<=860){ c=$('ln-mc'); try{ c.scrollIntoView({behavior:RM?'auto':'smooth',block:'nearest'}); }catch(e){} } } };
window.hhLnMapScr=function(on){ V.mapScr=on?1:0; try{ if(on&&!document.fullscreenElement&&document.documentElement.requestFullscreen){ var p=document.documentElement.requestFullscreen(); if(p&&p.catch) p.catch(function(){}); } else if(!on&&document.fullscreenElement) document.exitFullscreen(); }catch(e){} render(); var h=$('hh-learn'); if(h) h.scrollTop=0; };
document.addEventListener('keydown',function(e){ if($('hh-learn')&&V.view==='map'&&V.mapScr&&e.key==='Escape') hhLnMapScr(0); });
document.addEventListener('fullscreenchange',function(){ if(!document.fullscreenElement&&$('hh-learn')&&V.view==='map'&&V.mapScr){ V.mapScr=0; render(); } });
window.hhLnMapPrint=function(){ var B=book(); if(!B) return; var w=window.open('','_blank'); if(!w){ toastX('اسمح بالنوافذ المنبثقة لتطبع الخريطة','info'); return; }
  var cards=B.secs.map(function(S,i){ return '<div class="c" style="--k:'+S.c+'"><div class="h"><i>'+(i+1)+'</i><b>'+esc(S.t)+'</b><small>'+cntTxt(S)+'</small></div><ul>'+mapSamples(S).map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('')+'</ul></div>'; }).join('');
  w.document.write('<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>زهرة الفنون التسعة</title><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;800;900&family=Amiri:wght@700&family=Reem+Kufi:wght@700&display=swap" rel="stylesheet"><style>@page{size:A4 portrait;margin:12mm}*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}body{margin:0;font-family:Cairo,sans-serif;color:#2A2420}'
   +'h1{margin:0;text-align:center;font-family:"Reem Kufi",Cairo;font-size:34px;color:#3D0918}.sub{text-align:center;margin:4px 0 14px;font-size:14px;font-weight:700;color:#7A6E62}'
   +'.core{width:170px;height:170px;margin:0 auto 16px;border-radius:50%;background:linear-gradient(160deg,#E6F4F7,#C9E6EC);display:grid;place-items:center;text-align:center}.core b{font-family:Amiri,serif;font-size:21px;line-height:1.35;color:#1F7A93}.core small{display:block;font-size:11px;font-weight:800;color:#5A8C99}'
   +'.g{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.c{border:1.5px solid #E8DFCD;border-top:6px solid var(--k);border-radius:14px;padding:10px 12px;break-inside:avoid}.h{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.h i{width:24px;height:24px;border-radius:50%;background:var(--k);color:#fff;font-style:normal;font-size:12px;font-weight:900;display:grid;place-items:center}.h b{font-size:15px;color:#3D0918}.h small{font-size:11px;font-weight:800;color:#7A6E62;margin-inline-start:auto}'
   +'ul{margin:8px 0 0;padding:0 16px 0 0;font-size:12px;font-weight:700;line-height:1.8}.ft{margin-top:14px;text-align:center;font-size:11px;font-weight:700;color:#7A6E62}</style></head><body>'
   +'<h1>زهرة الفنون التسعة</h1><p class="sub">الكتاب كله في نظرة واحدة: كل ورقة فنّ، وتحتها أمثلة من أسئلته</p><div class="core"><div><b>ما لا يسع<br>أطفال المسلمين<br>جهله</b><small>'+B.n+' سؤالاً في '+B.secs.length+' فنون</small></div></div><div class="g">'+cards+'</div>'
   +'<p class="ft">كتاب «'+esc(B.title)+'» للشيخ '+esc(B.author)+'، منصة المُلهم التعليمي</p><script>setTimeout(function(){print()},700)<\/script></body></html>'); w.document.close(); };

/* ورد الأذكار اليومي */
var WT=[['الصباح والمساء',[19]],['في يومك',[4,5,9,10,11,12,13,15,16,17]],['في البيت وقبل النوم',[14,21,22,20]]], WPICK={18:1};
var NUMW=[[/مائة مرة/,100],[/عشر مرات/,10],[/سبع مرات/,7],[/ثلاث مرات/,3],[/مرتين/,2]];
function wCnt(s){ s=String(s||''); for(var i=0;i<NUMW.length;i++){ if(NUMW[i][0].test(s)) return NUMW[i][1]; } return 1; }
var _wI=null;
function wIt(q,e,ti,i,lb,n){ return {id:q.n+'_'+i,tab:ti,t:lb,q:e.t==='q',v:e.t==='q'?e.v:null,x:e.t==='q'?'':e.x,r:e.t==='q'?e.ref:(e.r||''),n:n}; }
function wItems(){ if(_wI) return _wI; var si=secBy('adhkar'); if(si<0) return []; var S=book().secs[si], by={}, L=[]; S.qs.forEach(function(q){ by[q.n]=q; });
  WT.forEach(function(tb,ti){ tb[1].forEach(function(n){ var q=by[n]; if(!q||!q.ev||!q.ev.length) return;
    if(q.a&&q.ev.length>1&&q.a.length===q.ev.length) q.ev.forEach(function(e,i){ L.push(wIt(q,e,ti,i,e.t==='q'?q.a[i]:q.q,wCnt(q.a[i]))); });
    else { var e=q.ev[WPICK[n]||0]||q.ev[0]; L.push(wIt(q,e,ti,0,q.q,1)); } }); });
  _wI=L; return L; }
function wGet(){ var w=null; try{ w=JSON.parse(localStorage.getItem('hh_learn_wird')||'null'); }catch(e){} if(!w||w.d!==today()) w={d:today(),c:{},ok:0}; if(!w.c) w.c={}; return w; }
function wSave(w){ try{ localStorage.setItem('hh_learn_wird',JSON.stringify(w)); }catch(e){} }
function wDone(w,x){ return (w.c[x.id]||0)>=x.n; }
function wTab(){ var D=V.wd||(V.wd={tab:0,id:null}); return wItems().filter(function(x){ return x.tab===D.tab; }); }
function wCur(w){ var T=wTab(), D=V.wd; return T.filter(function(x){ return x.id===D.id; })[0]||T.filter(function(x){ return !wDone(w,x); })[0]||T[0]; }
function wX(x){ return x.q?'﴿'+x.v.map(function(v){ return esc(v[1])+' <i>'+v[0]+'</i>'; }).join(' ')+'﴾':esc(x.x); }
function wTg(c,n){ return c>=n?'أتممته، بارك الله فيك':n>1?'اضغط الدائرة مع كل مرة، الهدف '+n+' مرات، بقي '+(n-c):'قله، ثم اضغط الدائرة'; }
function vWird(){ var B=book(), W=wItems(), w=wGet(), T=wTab(), cur=wCur(w), si=secBy('adhkar'), S=B.secs[si];
  var c=Math.min(cur.n,w.c[cur.id]||0), p=Math.round(c/cur.n*100), dn=W.filter(function(x){ return wDone(w,x); }).length;
  return '<div class="ln-wrap">'+crumbs([['تعلّم',"hhLnGo('home')"],[B.title,"hhLnGo('book')"],['ورد الأذكار اليومي']])
   +'<div class="ln-wh"><div><em>من محطة «'+esc(S.t)+'»</em><h1>ورد الأذكار اليومي</h1><p>اختر الوقت، ثم قل الذكر واضغط الدائرة. يُحفظ وردك على جهازك لهذا اليوم، ويبدأ من جديد غداً.</p></div>'
   +'<div class="sum"><div class="ln-pbar"><i style="width:'+Math.round(dn/W.length*100)+'%"></i></div><span><b>'+dn+'</b> من '+W.length+' أتممتها اليوم</span></div></div>'
   +'<div class="ln-wtabs" role="tablist" aria-label="أوقات الورد">'+WT.map(function(tb,ti){ var L=W.filter(function(x){ return x.tab===ti; }), d=L.filter(function(x){ return wDone(w,x); }).length; return '<button type="button" role="tab" aria-selected="'+(ti===V.wd.tab)+'" class="'+(ti===V.wd.tab?'on':'')+'" onclick="hhLnWTab('+ti+')">'+(d===L.length?sv('check',14,3):'')+tb[0]+'<small>'+d+'/'+L.length+'</small></button>'; }).join('')+'</div>'
   +'<div class="ln-wk"><button type="button" class="ln-wring'+(c>=cur.n?' dn':'')+'" id="ln-wr" style="--p:'+p+'" onclick="hhLnWTap()" aria-label="اضغط للعدّ"><span id="ln-wc">'+(c>=cur.n?sv('check',44,3):c)+'</span></button>'
   +'<div class="tx"><small class="lb">'+esc(cur.t)+'</small><p class="dk'+(cur.q?' ay':'')+'">'+wX(cur)+'</p>'+(cur.r?'<em>'+esc(cur.r)+'</em>':'')+'<small class="tg" id="ln-wt">'+wTg(c,cur.n)+'</small></div></div>'
   +'<div class="ln-wl">'+T.map(function(x,i){ var k=Math.min(x.n,w.c[x.id]||0), d=k>=x.n; return '<button type="button" class="'+(x.id===cur.id?'on':'')+(d?' dn':'')+'" onclick="hhLnWSel(\''+x.id+'\')"><i>'+(d?sv('check',13,3):(i+1))+'</i><span>'+esc(x.t)+'</span><b'+(x.id===cur.id?' id="ln-wn"':'')+'>'+k+'/'+x.n+'</b></button>'; }).join('')+'</div>'
   +'<div class="ln-wf"><button type="button" class="ln-b" onclick="hhLnWReset()">'+sv('refresh',15)+'أعد ورد «'+WT[V.wd.tab][0]+'»</button><button type="button" class="ln-b" onclick="hhLnGo(\'sec\','+si+')">'+sv('spark',15)+'صفحة المحطة</button></div>'
   +'<p class="ln-src">الأذكار ونصوصها وعدد مراتها من كتاب «'+esc(B.title)+'»، وما لم يذكر له الكتاب عدداً يُقال مرة.</p></div>'; }
window.hhLnWTab=function(t){ V.wd={tab:t,id:null}; render(); };
window.hhLnWSel=function(id){ V.wd.id=id; render(); };
window.hhLnWReset=function(){ var w=wGet(); wTab().forEach(function(x){ delete w.c[x.id]; }); wSave(w); V.wd.id=null; render(); };
window.hhLnWTap=function(){ var w=wGet(), cur=wCur(w); if(!cur) return; var c=w.c[cur.id]||0; if(c>=cur.n) return; c++; w.c[cur.id]=c; V.wd.id=cur.id;
  try{ if(navigator.vibrate) navigator.vibrate(12); }catch(e){}
  var all=wItems().every(function(x){ return wDone(w,x); }); if(all&&!w.ok){ w.ok=1; wSave(w); addXp(10); toastX('أتممت ورد اليوم كاملاً، تقبّل الله منك','success'); }
  wSave(w);
  if(c<cur.n){ var r=$('ln-wr'), n=$('ln-wc'), g=$('ln-wt'), b=$('ln-wn'); if(r) r.style.setProperty('--p',Math.round(c/cur.n*100)); if(n) n.textContent=c; if(g) g.textContent=wTg(c,cur.n); if(b) b.textContent=c+'/'+cur.n; return; }
  burst(); render(); setTimeout(function(){ if(V.view!=='wird'||!$('hh-learn')) return; var nx=wTab().filter(function(x){ return !wDone(wGet(),x); })[0]; if(nx&&V.wd.id===cur.id){ V.wd.id=nx.id; render(); } },650); };

/* استمع ثم احفظ */
var SURA={'الفاتحة':1,'الزلزلة':99,'العاديات':100,'القارعة':101,'التكاثر':102,'العصر':103,'الهمزة':104,'الفيل':105,'قريش':106,'الماعون':107,'الكوثر':108,'الكافرون':109,'النصر':110,'المسد':111,'الإخلاص':112,'الفلق':113,'الناس':114};
var AU=null;
function tafS(){ var si=secBy('tafseer'); return si<0?null:book().secs[si]; }
function surOf(q){ var nm=String(q.ev[0].ref).split(':')[0].trim(); return {nm:nm,n:SURA[nm]||(q.pick&&q.pick.ref&&q.pick.ref.s)||0,v:q.ev[0].v}; }
function pad3(n){ return ('00'+n).slice(-3); }
function auUrl(s,a){ return 'https://everyayah.com/data/Alafasy_128kbps/'+pad3(s)+pad3(a)+'.mp3'; }
function lnStop(){ if(AU){ var a=AU; AU=null; try{ a.onended=null; a.onerror=null; a.pause(); a.removeAttribute('src'); }catch(e){} } if(V.ls) V.ls.pl=0; }
function lnFail(){ lnStop(); if(V.ls) V.ls.err=1; toastX('تعذّر تشغيل التلاوة، تحقق من اتصالك بالإنترنت','error'); if(V.view==='listen') render(); }
function lnPlayAy(ai,all){ var L=V.ls, T=tafS(); if(!L||!T) return; var s=surOf(T.qs[L.i]); lnStop(); if(!s.n||!s.v[ai]) return;
  L.a=ai; L.err=0; if(navigator.onLine===false){ lnFail(); return; } L.pl=all?2:1; L.left=L.rep||1;
  var me; try{ me=AU=new Audio(auUrl(s.n,s.v[ai][0])); }catch(e){ lnFail(); return; }
  var bad=function(){ if(AU===me) lnFail(); };
  me.onerror=bad;
  me.onended=function(){ if(AU!==me) return; L.left--; if(L.left>0){ try{ me.currentTime=0; var p=me.play(); if(p&&p.catch) p.catch(bad); }catch(e){ bad(); } return; }
    if(L.pl===2&&ai+1<s.v.length) lnPlayAy(ai+1,true); else lnStop(); if(V.view==='listen') render(); };
  try{ var p=me.play(); if(p&&p.catch) p.catch(bad); }catch(e){ bad(); } }
function lsTabs(L,T){ return '<div class="ln-sur" role="tablist" aria-label="السور">'+T.qs.map(function(q,i){ return '<button type="button" role="tab" aria-selected="'+(i===L.i)+'" class="'+(i===L.i?'on':'')+'" onclick="hhLnLsSur('+i+')">'+esc(surOf(q).nm)+'</button>'; }).join('')+'</div>'
  +'<div class="ln-seg" role="group" aria-label="الطريقة"><button type="button" class="'+(L.t?'':'on')+'" aria-pressed="'+!L.t+'" onclick="hhLnLsMode(0)">'+sv('play',14)+'استمع</button><button type="button" class="'+(L.t?'on':'')+'" aria-pressed="'+!!L.t+'" onclick="hhLnLsMode(1)">'+sv('brain',14)+'اختبر حفظك</button></div>'; }
function lsWave(on){ var r=seed('wv'), s=''; for(var i=0;i<16;i++) s+='<i style="--h:'+(6+Math.round(r()*20))+'px;--d:'+(i*60)+'ms"></i>'; return '<div class="ln-wave'+(on?' on':'')+'" aria-hidden="true">'+s+'</div>'; }
function lsPlayer(L,s){ var cur=s.v[L.a]||s.v[0];
  return '<div class="ln-ply"><div class="now"><button type="button" class="pb" onclick="hhLnLsPlay()" aria-label="'+(L.pl?'إيقاف':'تشغيل السورة')+'">'+sv(L.pl?'pause':'play',20,2.6)+'</button><div class="tx"><p class="ay">'+esc(cur[1])+'</p><small>سورة '+esc(s.nm)+'، الآية '+cur[0]+' من '+s.v.length+'</small></div>'+lsWave(L.pl)+'</div>'
   +'<div class="ctl"><button type="button" class="ln-b" onclick="hhLnLsStep(-1)" '+(L.a<=0?'disabled':'')+'>'+sv('back',15,2.4)+'السابقة</button><div class="ln-rep"><span>كرّر كل آية</span>'+[1,3,5].map(function(n){ return '<button type="button" class="'+((L.rep||1)===n?'on':'')+'" aria-pressed="'+((L.rep||1)===n)+'" onclick="hhLnLsRep('+n+')">'+n+'</button>'; }).join('')+'</div><button type="button" class="ln-b" onclick="hhLnLsStep(1)" '+(L.a>=s.v.length-1?'disabled':'')+'>التالية'+sv('next',15,2.4)+'</button></div>'
   +(L.err?'<p class="ln-off">'+sv('x',15,2.4)+'التلاوة تحتاج اتصالاً بالإنترنت. اقرأ من النص الآن، وحاول الاستماع لاحقاً.</p>':'')
   +'<ol class="ln-ayl">'+s.v.map(function(v,i){ return '<li class="'+(i===L.a?'on':'')+'"><button type="button" onclick="hhLnLsAy('+i+')" aria-label="استمع للآية '+v[0]+'">'+sv(i===L.a&&L.pl?'pause':'play',13,2.6)+'</button><p class="ay">'+esc(v[1])+' <i>'+v[0]+'</i></p></li>'; }).join('')+'</ol></div>'; }
function newTest(i,lv){ var s=surOf(tafS().qs[i]), r=seed('m'+s.n+'_'+lv), H=[], W=[];
  s.v.forEach(function(v,ai){ var ws=String(v[1]).split(/\s+/).filter(Boolean); ws.forEach(function(x,wi){ var last=wi===ws.length-1, h=lv===1?last:lv===2?(last||r()<.34):(last||r()<.7); W.push([ai,x,h?H.length:-1]); if(h) H.push(x); }); });
  return {lv:lv,W:W,H:H,k:0,used:{},err:0,bad:-1,ord:shuf(H.map(function(_,j){ return j; }),'b'+s.n+'_'+lv),fin:0}; }
function lsTest(L,s){ var T=L.t, rows=[], lvT=['','أُخفيت آخر كلمة من كل آية','أُخفي نحو ثلث الكلمات','أُخفيت أكثر الكلمات'];
  s.v.forEach(function(v,ai){ rows.push('<p class="ay">'+T.W.filter(function(w){ return w[0]===ai; }).map(function(w){ return w[2]<0?esc(w[1]):w[2]<T.k?'<span class="ln-hw ok">'+esc(w[1])+'</span>':'<span class="ln-hw'+(w[2]===T.k?' cur':'')+'" aria-label="كلمة مخفية">'+esc(w[1])+'</span>'; }).join(' ')+' <i>'+v[0]+'</i></p>'); });
  return '<div class="ln-mz"><div class="hd"><b>اختبار الحفظ، المستوى '+T.lv+' من 3</b><small>'+lvT[T.lv]+'. اضغط الكلمات بالترتيب لتكمل السورة.</small></div><div class="txt">'+rows.join('')+'</div>'
   +(T.fin?'<div class="ln-mzr"><b>'+sv('check',16,3)+' أحسنت، أكملت سورة '+esc(s.nm)+(T.err?'، وعدد الأخطاء '+T.err:' دون خطأ')+'</b>'+(T.lv<3?'<button type="button" class="ln-b ok" onclick="hhLnLsLv('+(T.lv+1)+')">المستوى '+(T.lv+1)+sv('next',15,2.4)+'</button>':'')+'<button type="button" class="ln-b" onclick="hhLnLsLv('+T.lv+')">'+sv('refresh',15)+'أعد</button></div>'
     :'<div class="ln-mzb">'+T.ord.map(function(j){ var u=!!T.used[j]; return '<button type="button" class="'+(u?'us':'')+(T.bad===j?' bad':'')+'" '+(u?'disabled':'')+' onclick="hhLnLsW('+j+')">'+esc(T.H[j])+'</button>'; }).join('')+'</div>'
       +'<div class="ft"><span>'+T.k+' من '+T.H.length+'، الأخطاء '+T.err+'</span><button type="button" class="ln-b" onclick="hhLnLsHint()">'+sv('play',14)+'استمع للآية</button><button type="button" class="ln-b" onclick="hhLnLsLv('+T.lv+')">'+sv('refresh',15)+'من جديد</button></div>')
   +(L.err?'<p class="ln-off" style="margin-top:10px">'+sv('x',15,2.4)+'التلاوة تحتاج اتصالاً بالإنترنت، ويمكنك إكمال الاختبار دونها.</p>':'')+'</div>'; }
function lsCenter(h){ try{ var p=h.querySelector('.ln-sur'), s=p&&p.querySelector('.on'); if(!s||p.scrollWidth<=p.clientWidth) return; p.scrollLeft=s.offsetLeft+s.offsetWidth/2-p.clientWidth/2-(p.scrollWidth-p.clientWidth); }catch(e){} }
function vListen(){ var B=book(), T=tafS(), L=V.ls||(V.ls={i:0,a:0,rep:1,pl:0,t:null}), q=T.qs[L.i], s=surOf(q), si=secBy('tafseer');
  return '<div class="ln-wrap">'+crumbs([['تعلّم',"hhLnGo('home')"],[B.title,"hhLnGo('book')"],[T.t,"hhLnGo('sec',"+si+")"],['استمع ثم احفظ']])
   +'<div class="ln-wh"><div><em>من محطة «'+esc(T.t)+'»</em><h1>استمع ثم احفظ</h1><p>استمع إلى السورة آية آية بصوت الشيخ مشاري العفاسي، وردّد خلفه، ثم اختبر حفظك بإكمال الكلمات المخفية.</p></div></div>'
   +lsTabs(L,T)+(L.t?lsTest(L,s):lsPlayer(L,s))
   +'<div class="ln-wf"><button type="button" class="ln-b" onclick="hhLnGo(\'lesson\','+si+','+L.i+')">'+sv('book',15)+'تفسير سورة '+esc(s.nm)+'</button></div></div>'; }
window.hhLnLsSur=function(i){ var L=V.ls; lnStop(); V.ls={i:i,a:0,rep:L.rep||1,pl:0,t:L.t?newTest(i,L.t.lv):null}; render(); };
window.hhLnLsMode=function(m){ var L=V.ls; lnStop(); L.err=0; L.t=m?newTest(L.i,1):null; render(); };
window.hhLnLsPlay=function(){ var L=V.ls; if(L.pl){ lnStop(); render(); return; } lnPlayAy(L.a||0,true); render(); };
window.hhLnLsAy=function(i){ var L=V.ls; if(L.pl&&L.a===i){ lnStop(); render(); return; } lnPlayAy(i,false); render(); };
window.hhLnLsStep=function(d){ var L=V.ls, s=surOf(tafS().qs[L.i]), a=Math.max(0,Math.min(s.v.length-1,(L.a||0)+d)); if(L.pl) lnPlayAy(a,L.pl===2); else L.a=a; render(); };
window.hhLnLsRep=function(n){ V.ls.rep=n; render(); };
window.hhLnLsLv=function(lv){ lnStop(); V.ls.t=newTest(V.ls.i,lv); render(); };
window.hhLnLsW=function(j){ var T=V.ls.t; if(!T||T.fin||T.used[j]||T.k>=T.H.length) return; if(T.H[j]===T.H[T.k]){ T.used[j]=1; T.k++; T.bad=-1; if(T.k===T.H.length){ T.fin=1; addXp(5); burst(); } } else { T.err++; T.bad=j; } render(); };
window.hhLnLsHint=function(){ var T=V.ls.t; if(!T) return; var w=T.W.filter(function(x){ return x[2]===T.k; })[0]; lnPlayAy(w?w[0]:0,false); render(); };
document.addEventListener('visibilitychange',function(){ if(document.hidden&&AU){ lnStop(); if($('hh-learn')&&V.view==='listen') render(); } });

/* ═══ تأثير النجاح ═══ */
function burst(){ if(RM) return; var h=$('hh-learn'); if(!h) return; var b=document.createElement('div'); b.className='ln-burst'; for(var i=0;i<18;i++){ var s=document.createElement('i'); s.style.setProperty('--a',(i*20)+'deg'); s.style.setProperty('--d',(60+Math.random()*80)+'px'); s.style.background=['#E6CE8E','#3FB884','#fff','#C2274F'][i%4]; b.appendChild(s); } h.appendChild(b); setTimeout(function(){ b.remove(); },900); }
function bind(h){ if(V.view==='map') layMap(); if(V.view==='listen') lsCenter(h);  if(V.view==='home') lhBind(h); var f=V.mode==='screen'?null:h.querySelector('.ln-lf .ln-b.g'); if(f&&V.view==='lesson'&&h._lv!==V.qi+'-'+V.step){ h._lv=V.qi+'-'+V.step; try{ f.focus({preventScroll:true}); }catch(e){} } }

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
"#hh-learn .lh{--t:#1F6F7A;--m1:#F8ECEF;--g2:#F0DDB5;--g1:#F6EEDC;--ok:#2F8F5B;}",
"body.dark-mode #hh-learn .lh{--g1:#2E2716;}",
".lh-b{all:unset;box-sizing:border-box;cursor:pointer;display:inline-flex;gap:8px;align-items:center;justify-content:center;height:46px;padding:0 18px;border-radius:13px;font-weight:900;font-size:15px;border:1.5px solid var(--ln);background:var(--card);color:var(--hd);transition:transform .15s,box-shadow .15s;white-space:nowrap;}",
".lh-b:hover{transform:translateY(-1px);} .lh-b:focus-visible{outline:3px solid var(--g);outline-offset:2px;} .lh-b[disabled]{opacity:.5;cursor:default;}",
".lh-b.p{background:#8A1538;color:#fff;border-color:transparent;box-shadow:0 8px 18px rgba(138,21,56,.22);}",
".lh-fb{display:flex;align-items:center;gap:12px;margin:28px 0 14px;flex-wrap:wrap;} .lh-fb h2{margin:0;font-size:24px;color:var(--hd);flex:1;}",
".lh-fb .ch{display:flex;gap:6px;background:var(--card);border:1px solid var(--ln);border-radius:14px;padding:4px;}",
".lh-fb .ch button{all:unset;cursor:pointer;padding:7px 14px;border-radius:10px;font-size:13.5px;font-weight:900;color:var(--mu);} .lh-fb .ch button.on{background:var(--hd);color:var(--card);} .lh-fb .ch button:focus-visible{outline:3px solid var(--g);}",
".lh-sd .in{display:grid;gap:12px;} .lh-sd label{display:grid;gap:6px;font-size:13.5px;font-weight:900;color:var(--hd);}",
".lh-sd input,.lh-sd select,.lh-sd textarea{font:inherit;font-weight:700;font-size:15px;border:1.5px solid var(--ln);border-radius:12px;padding:10px 12px;background:var(--card);color:var(--ink);width:100%;box-sizing:border-box;resize:vertical;} .lh-sd input:focus,.lh-sd select:focus,.lh-sd textarea:focus{outline:3px solid rgba(184,146,74,.35);border-color:var(--g);}",
"body.dark-mode #hh-learn .lh-b.p{background:#A3274C;}",
"#hh-learn .lh6{max-width:1240px;}",
".lh6 button{font-family:inherit;} .lh6 button:focus-visible{outline:3px solid var(--g);outline-offset:2px;}",
".lh6 .k-self{--k:#1F6F7A;--k1:#E3F1EF;} .lh6 .k-books{--k:#8A1538;--k1:#F7E6EB;} .lh6 .k-lead{--k:#8A6D2E;--k1:#F6EEDC;}",
"body.dark-mode #hh-learn .lh6 .k-self{--k:#7FC3CF;--k1:#1D2F33;} body.dark-mode #hh-learn .lh6 .k-books{--k:#EBA6BA;--k1:#3A1E28;} body.dark-mode #hh-learn .lh6 .k-lead{--k:#E6CE8E;--k1:#2E2716;}",
".lh6-ph{display:flex;align-items:flex-end;gap:16px;flex-wrap:wrap;margin:4px 0 6px;} .lh6-ph h1{margin:0;font-family:\"Reem Kufi\",Cairo;font-weight:700;font-size:36px;color:var(--hd);line-height:1.3;} .lh6-ph p{margin:0 0 6px;font-size:14.5px;font-weight:800;color:var(--mu);}",
".lh6-tabs{position:sticky;top:0;z-index:6;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;padding:10px 0;background:var(--bg);}",
".lh6-tabs .tab{all:unset;cursor:pointer;box-sizing:border-box;display:flex;gap:12px;align-items:center;background:var(--card);border:1.5px solid var(--ln);border-radius:18px;padding:12px 14px;position:relative;min-width:0;transition:border-color .2s,box-shadow .2s;}",
".lh6-tabs .tab:hover{border-color:var(--k);} .lh6-tabs .tab:focus-visible{outline:3px solid var(--g);outline-offset:2px;}",
".lh6-tabs .tab i{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;background:var(--k1);color:var(--k);flex-shrink:0;}",
".lh6-tabs .tab>span{min-width:0;} .lh6-tabs .tab b{display:block;font-size:16px;color:var(--hd);white-space:nowrap;} .lh6-tabs .tab small{display:block;font-size:12.5px;font-weight:700;color:var(--mu);line-height:1.6;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}",
".lh6-tabs .tab em{font-style:normal;margin-inline-start:auto;font-size:12px;font-weight:900;color:var(--k);background:var(--k1);border-radius:999px;padding:3px 10px;white-space:nowrap;}",
".lh6-tabs .tab.on{border-color:var(--k);box-shadow:0 12px 26px -18px var(--k);}",
".lh6-tabs .tab.on::after{content:\"\";position:absolute;bottom:-8px;right:50%;width:14px;height:14px;background:var(--card);border-right:1.5px solid var(--k);border-bottom:1.5px solid var(--k);transform:translateX(50%) rotate(45deg);}",
".lh6-pn{margin-top:6px;background:var(--card);border:1px solid var(--ln);border-top:4px solid var(--k);border-radius:24px;padding:20px 22px 24px;min-width:0;}",
".lh6-pn .pnh{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:16px;} .lh6-pn .pnh h2{margin:0;font-size:22px;color:var(--hd);} .lh6-pn .pnh p{margin:0;font-size:13.5px;font-weight:700;color:var(--mu);}",
".lh6-cnt{all:unset;cursor:pointer;box-sizing:border-box;margin-inline-start:auto;display:flex;gap:12px;align-items:center;max-width:430px;min-width:0;background:var(--bg);border:1px solid var(--ln);border-radius:16px;padding:7px 10px 7px 14px;}",
".lh6-cnt:hover{border-color:var(--g);} .lh6-cnt>span:nth-child(2){min-width:0;flex:1;} .lh6-cnt small{display:block;font-size:11.5px;font-weight:800;color:var(--mu);} .lh6-cnt b{display:block;font-size:14px;color:var(--hd);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}",
".lh6-cnt .r{width:40px;height:40px;border-radius:50%;flex-shrink:0;background:conic-gradient(var(--g) var(--p),var(--soft) 0);display:grid;place-items:center;font-size:10.5px;font-weight:900;color:var(--hd);} .lh6-cnt .r span{width:32px;height:32px;border-radius:50%;background:var(--card);display:grid;place-items:center;}",
".lh6-mini{width:34px;height:46px;border-radius:3px 7px 7px 3px;flex-shrink:0;box-shadow:inset 3px 0 0 rgba(0,0,0,.12);}",
".lh6-mini.mala{background:linear-gradient(90deg,#BFE1E8,#F4FBFC 30%,#DDEFF2);} .lh6-mini.nmodel{background:linear-gradient(160deg,#0F3B44,#0A2A31);} .lh6-mini.burn{background:linear-gradient(170deg,#FFF7EE,#FBDCC4);}",
".lh6-sub{margin:26px 0 12px;font-size:16px;font-weight:900;color:var(--hd);display:flex;gap:8px;align-items:center;flex-wrap:wrap;} .lh6-sub svg{color:var(--k);} .lh6-sub small{font-size:12.5px;color:var(--mu);font-weight:700;}",
".lh6-daa{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:16px;align-items:center;background:linear-gradient(150deg,#3D0918,#7A1431);color:#fff;border-radius:20px;padding:18px 22px;margin-bottom:16px;box-shadow:0 18px 40px -26px rgba(61,9,24,.7);}",
".lh6-daa .ic{width:54px;height:54px;border-radius:16px;display:grid;place-items:center;background:rgba(233,207,152,.16);color:#E9CF98;} .lh6-daa em{font-style:normal;font-size:12px;font-weight:900;color:#E9CF98;}",
".lh6-daa h3{margin:2px 0;font-family:\"Reem Kufi\",Cairo;font-size:22px;line-height:1.4;} .lh6-daa p{margin:0;font-size:13.5px;font-weight:700;opacity:.85;line-height:1.8;}",
".lh6-daa .pr{display:flex;gap:10px;align-items:center;margin-top:8px;max-width:360px;font-size:12px;font-weight:900;} .lh6-daa .br{flex:1;height:7px;border-radius:7px;background:rgba(255,255,255,.16);overflow:hidden;} .lh6-daa .br i{display:block;height:100%;background:#E9CF98;border-radius:7px;}",
".lh6-gb{all:unset;cursor:pointer;display:inline-flex;gap:8px;align-items:center;background:#E9CF98;color:#3D0918;font-weight:900;font-size:14.5px;border-radius:13px;padding:11px 20px;white-space:nowrap;}",
".lh6-b1{all:unset;box-sizing:border-box;cursor:pointer;display:inline-flex;gap:8px;align-items:center;justify-content:center;background:#8A1538;color:#fff;font-weight:900;font-size:14.5px;border-radius:13px;padding:10px 20px;white-space:nowrap;}",
".lh6-b1:hover{background:#A3274C;} .lh6-b1.sm{font-size:13px;padding:7px 14px;border-radius:10px;}",
".lh6-b2{all:unset;box-sizing:border-box;cursor:pointer;display:inline-flex;gap:8px;align-items:center;justify-content:center;border:1.5px solid var(--ln);font-weight:900;font-size:14px;border-radius:13px;padding:9px 16px;color:var(--hd);background:var(--card);white-space:nowrap;} .lh6-b2:hover{border-color:var(--g);}",
"body.dark-mode #hh-learn .lh6-b1{background:#A3274C;}",
".lh6-stage{border-radius:26px;overflow:hidden;display:grid;grid-template-columns:290px minmax(0,1fr);background:var(--card);border:1px solid var(--ln);box-shadow:0 30px 60px -44px rgba(61,9,24,.5);}",
".lh6-stage .side{background:linear-gradient(170deg,#3D0918,#5E0E26 60%,#7A1431);color:#fff;padding:22px 20px;display:flex;flex-direction:column;gap:14px;min-width:0;}",
".lh6-stage .side .lb{font-size:12px;font-weight:900;color:#E9CF98;} .lh6-stage .side h2{margin:0;font-family:\"Reem Kufi\",Cairo;font-size:23px;line-height:1.45;color:#fff;} .lh6-stage .side p{margin:0;font-size:13px;font-weight:700;opacity:.82;line-height:1.8;}",
".lh6-stage .side .bk{display:flex;gap:12px;align-items:center;background:rgba(255,255,255,.08);border-radius:14px;padding:8px;} .lh6-stage .side .bk b{font-size:13.5px;} .lh6-stage .side .bk small{display:block;font-size:11.5px;opacity:.78;line-height:1.6;}",
".lh6-stage .rail{list-style:none;margin:2px 0 0;padding:0;display:grid;gap:4px;position:relative;} .lh6-stage .rail::before{content:\"\";position:absolute;right:17px;top:14px;bottom:14px;width:2px;background:rgba(255,255,255,.15);}",
".lh6-stage .rail button{all:unset;cursor:pointer;display:flex;gap:12px;align-items:center;width:100%;box-sizing:border-box;padding:6px;border-radius:12px;position:relative;color:#fff;}",
".lh6-stage .rail i{width:24px;height:24px;margin:0 5px;border-radius:50%;display:grid;place-items:center;background:#4A0B1E;border:2px solid rgba(255,255,255,.25);font-style:normal;font-size:11px;font-weight:900;flex-shrink:0;}",
".lh6-stage .rail b{font-size:14.5px;} .lh6-stage .rail small{display:block;font-size:11.5px;opacity:.72;font-weight:700;}",
".lh6-stage .rail li.dn i{background:#E9CF98;border-color:#E9CF98;color:#3D0918;} .lh6-stage .rail li.on button{background:rgba(255,255,255,.1);} .lh6-stage .rail li.on i{background:#fff;color:#5E0E26;border-color:#fff;box-shadow:0 0 0 4px rgba(233,207,152,.35);}",
".lh6-stage .try{margin-top:auto;font-size:12px;font-weight:800;opacity:.9;} .lh6-stage .try div{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px;} .lh6-stage .try button{all:unset;cursor:pointer;background:rgba(255,255,255,.12);border-radius:9px;padding:5px 9px;font-size:12px;font-weight:800;color:#fff;} .lh6-stage .try button:hover{background:rgba(255,255,255,.2);}",
".lh6-stage .main{padding:24px 30px 20px;display:flex;flex-direction:column;min-height:480px;min-width:0;}",
".lh6-stage .bar{display:flex;gap:6px;margin-bottom:18px;} .lh6-stage .bar i{flex:1;height:5px;border-radius:5px;background:var(--soft);} .lh6-stage .bar i.on{background:var(--g);}",
".lh6-stage .ey{font-size:12.5px;font-weight:900;color:var(--k);display:flex;gap:6px;align-items:center;}",
".lh6-stage h3{margin:6px 0 14px;font-size:24px;line-height:1.6;color:var(--hd);}",
".lh6-opt{all:unset;cursor:pointer;display:flex;gap:12px;align-items:center;box-sizing:border-box;width:100%;border:1.5px solid var(--ln);border-radius:16px;padding:12px 16px;margin-bottom:9px;font-size:15.5px;font-weight:800;line-height:1.7;background:var(--bg);color:var(--ink);transition:border-color .2s;}",
".lh6-opt:hover{border-color:var(--g);} .lh6-opt span{width:28px;height:28px;border-radius:9px;display:grid;place-items:center;background:var(--soft);font-size:13px;font-weight:900;flex-shrink:0;}",
".lh6-opt.ok{border-color:#2F8F5B;background:#E7F4EC;color:#1E5A39;} .lh6-opt.ok span{background:#2F8F5B;color:#fff;} .lh6-opt.no{border-color:#C0425E;background:#FBEAEE;color:#7A1F35;} .lh6-opt.no span{background:#C0425E;color:#fff;} .lh6-opt.dim{opacity:.55;}",
".lh6-opt[aria-disabled=\"true\"]{cursor:default;}",
"body.dark-mode #hh-learn .lh6-opt.ok{background:#1E3027;color:#BFE6CE;} body.dark-mode #hh-learn .lh6-opt.no{background:#3A1E25;color:#F2C2CD;}",
".lh6-why{margin-top:6px;border-inline-start:4px solid var(--g);background:var(--g1);border-radius:12px;padding:10px 14px;font-size:14px;font-weight:800;line-height:1.9;color:var(--ink);} .lh6-why b{color:#8A6D2E;margin-inline-end:4px;} .lh6-why small{display:block;color:var(--mu);font-size:12px;}",
"body.dark-mode #hh-learn .lh6-why b{color:var(--gl);}",
".lh6-quote{margin:0;font-family:Amiri,serif;font-size:26px;line-height:1.85;color:var(--hd);background:linear-gradient(150deg,var(--g1),transparent);border-radius:20px;padding:18px 22px;border-inline-start:4px solid var(--g);} .lh6-quote small{display:block;font-family:Cairo,sans-serif;font-size:12.5px;font-weight:800;color:var(--mu);}",
".lh6-its{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:14px;}",
".lh6-its .it{all:unset;cursor:pointer;box-sizing:border-box;border:1px solid var(--ln);border-radius:14px;padding:10px 14px;background:var(--card);min-width:0;} .lh6-its .it b{display:flex;justify-content:space-between;gap:8px;font-size:14.5px;color:var(--hd);} .lh6-its .it b span{color:var(--g);}",
".lh6-its .it p{margin:6px 0 0;font-size:13.5px;font-weight:700;color:var(--mu);line-height:1.8;display:none;} .lh6-its .it.op p{display:block;} .lh6-its .it.op{border-color:var(--g);}",
".lh6-page{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:16px;}",
".lh6-page .paper{background:#FFFDF8;border:1px solid #EADFC8;border-radius:6px;padding:18px 20px 30px;font-family:Amiri,serif;font-size:20px;line-height:2;color:#2A2420;box-shadow:0 14px 30px -24px rgba(0,0,0,.5);position:relative;}",
".lh6-page .paper small{position:absolute;left:12px;bottom:6px;font-family:Cairo,sans-serif;font-size:11px;color:#7A7062;font-weight:800;}",
"body.dark-mode #hh-learn .lh6-page .paper{background:#2B2023;color:#EFE3CC;border-color:#3E2C24;} body.dark-mode #hh-learn .lh6-page .paper small{color:var(--mu);}",
".lh6-page .ex{background:var(--soft);border-radius:16px;padding:14px 16px;} .lh6-page .ex b{display:block;font-size:14px;color:var(--m);margin-bottom:6px;} .lh6-page .ex p{margin:0;font-size:14.5px;font-weight:700;line-height:1.9;color:var(--ink);}",
"body.dark-mode #hh-learn .lh6-page .ex b{color:#EBA6BA;}",
".lh6-scene{background:var(--soft);border-radius:18px;padding:14px 18px;margin-bottom:12px;font-size:16.5px;font-weight:800;line-height:1.9;display:flex;gap:12px;align-items:flex-start;color:var(--ink);} .lh6-scene svg{flex-shrink:0;color:var(--m);margin-top:4px;}",
"body.dark-mode #hh-learn .lh6-scene svg{color:#EBA6BA;}",
".lh6-save{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px;align-items:stretch;}",
".lh6-save .card{border-radius:20px;padding:22px;background:linear-gradient(150deg,#5E0E26,#8A1538);color:#fff;font-family:Amiri,serif;font-size:22px;line-height:1.8;display:flex;flex-direction:column;gap:10px;position:relative;overflow:hidden;}",
".lh6-save .card::after{content:\"\";position:absolute;left:-40px;bottom:-40px;width:160px;height:160px;border-radius:50%;border:24px solid rgba(233,207,152,.15);pointer-events:none;}",
".lh6-save .card small{font-family:Cairo,sans-serif;font-size:12px;font-weight:800;color:#E9CF98;margin-top:auto;}",
".lh6-save .nb{all:unset;cursor:pointer;align-self:flex-start;display:inline-flex;gap:6px;align-items:center;font-family:Cairo,sans-serif;font-size:13px;font-weight:900;background:rgba(255,255,255,.14);border-radius:10px;padding:7px 12px;color:#fff;position:relative;z-index:1;} .lh6-save .nb.on{background:#E9CF98;color:#3D0918;}",
".lh6-save .sum{border:1px solid var(--ln);border-radius:20px;padding:16px 18px;} .lh6-save .sum h4{margin:0 0 8px;font-size:15px;color:var(--hd);} .lh6-save .sum ul{margin:0;padding-inline-start:18px;} .lh6-save .sum li{font-size:14px;font-weight:700;line-height:1.9;color:var(--ink);} .lh6-save .sc{margin:10px 0 0;font-size:13px;font-weight:900;color:var(--k);}",
".lh6-stage .nav{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:auto;padding-top:18px;} .lh6-stage .nav .sp{margin-inline-start:auto;font-size:12.5px;font-weight:800;color:var(--mu);}",
".lh6-qg{display:flex;gap:10px;flex-wrap:wrap;}",
".lh6-qg .qb{all:unset;cursor:pointer;box-sizing:border-box;display:flex;gap:10px;align-items:center;max-width:100%;background:var(--card);border:1px solid var(--ln);border-radius:16px;padding:11px 16px;color:var(--hd);} .lh6-qg .qb:hover,.lh6-qg .qb.on{border-color:var(--k);} .lh6-qg .qb.on{box-shadow:0 0 0 2px var(--k1);}",
".lh6-qg .qb b{font-size:15px;line-height:1.6;} .lh6-qg .qb small{font-size:12px;font-weight:800;color:var(--mu);white-space:nowrap;} .lh6-qg .cvs{display:flex;flex-shrink:0;} .lh6-qg .cvs span{width:16px;height:22px;border-radius:2px 4px 4px 2px;margin-inline-end:-5px;box-shadow:0 0 0 2px var(--card);}",
".lh6-path{margin-top:12px;border:1.5px solid var(--k);border-radius:20px;padding:14px 16px;background:var(--bg);}",
".lh6-path .hd{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;margin-bottom:8px;} .lh6-path .hd b{font-size:16px;color:var(--hd);} .lh6-path .hd small{font-size:12.5px;font-weight:800;color:var(--mu);}",
".lh6-path .x{all:unset;cursor:pointer;margin-inline-start:auto;width:30px;height:30px;border-radius:9px;display:grid;place-items:center;color:var(--mu);} .lh6-path .x:hover{background:var(--soft);}",
".lh6-path ol{list-style:none;margin:0;padding:0;display:grid;gap:6px;} .lh6-path li{display:flex;gap:12px;align-items:center;background:var(--card);border:1px solid var(--ln);border-radius:14px;padding:9px 12px;}",
".lh6-path li i{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-style:normal;font-size:12px;font-weight:900;background:var(--k1);color:var(--k);flex-shrink:0;} .lh6-path li.dn i{background:var(--ok);color:#fff;}",
".lh6-path li>span{flex:1;min-width:0;} .lh6-path li b{display:block;font-size:14.5px;color:var(--hd);line-height:1.6;} .lh6-path li small{display:block;font-size:12px;font-weight:700;color:var(--mu);line-height:1.6;}",
".lh6-me{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;}",
".lh6-me button{all:unset;cursor:pointer;box-sizing:border-box;background:var(--bg);border:1px solid var(--ln);border-radius:16px;padding:12px 14px;min-width:0;} .lh6-me button:hover{border-color:var(--k);} .lh6-me b{display:block;font-size:26px;color:var(--k);line-height:1.3;} .lh6-me small{font-size:12.5px;font-weight:800;color:var(--mu);}",
".lh6-certs{margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;} .lh6-certs p{margin:0;font-size:13.5px;font-weight:700;color:var(--mu);background:var(--bg);border:1px dashed var(--ln);border-radius:14px;padding:10px 14px;}",
".lh6-certs button{all:unset;cursor:pointer;display:inline-flex;gap:8px;align-items:center;background:var(--g1);border:1px solid var(--g2);border-radius:12px;padding:8px 12px;font-size:13.5px;font-weight:900;color:var(--hd);} .lh6-certs svg{color:var(--g);}",
"body.dark-mode #hh-learn .lh6-certs button{border-color:#5A4A26;}",
".lh6-tools{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin-top:22px;padding-top:18px;border-top:1px dashed var(--ln);}",
".lh6-tools button{all:unset;cursor:pointer;box-sizing:border-box;display:flex;gap:10px;align-items:center;background:var(--bg);border:1px solid var(--ln);border-radius:16px;padding:10px 12px;min-width:0;} .lh6-tools button:hover{border-color:var(--g);}",
".lh6-tools i{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:var(--g1);color:#8A6D2E;flex-shrink:0;} .lh6-tools span{min-width:0;} .lh6-tools b{display:block;font-size:14px;color:var(--hd);} .lh6-tools small{display:block;font-size:12px;font-weight:700;color:var(--mu);line-height:1.6;}",
"body.dark-mode #hh-learn .lh6-tools i{color:var(--gl);}",
".lh6-sh{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin:30px 0 12px;} .lh6-sh:first-child,.lh6-daa+.lh6-sh{margin-top:4px;} .lh6-sh h3{margin:0;font-family:\"Reem Kufi\",Cairo;font-weight:700;font-size:23px;color:var(--hd);} .lh6-sh small{font-size:13px;font-weight:800;color:var(--mu);}",
".lh6-sh .chips{display:flex;gap:6px;flex-wrap:wrap;margin-inline-start:auto;} .lh6-sh .chips button{all:unset;cursor:pointer;border:1px solid var(--ln);border-radius:11px;padding:6px 12px;font-size:13px;font-weight:900;color:var(--mu);background:var(--card);} .lh6-sh .chips button.on{background:var(--hd);color:var(--card);border-color:var(--hd);}",
".lh6-row{display:flex;gap:14px;overflow-x:auto;padding:12px 8px 14px;scroll-snap-type:x proximity;min-width:0;}",
".lh6-row .bk2{all:unset;cursor:pointer;flex:0 0 128px;scroll-snap-align:start;transition:transform .2s;} .lh6-row .bk2.on{transform:translateY(-8px);} .lh6-row .bk2.on .lh6-cv{box-shadow:0 0 0 3px var(--card),0 0 0 5px var(--g),0 18px 30px -16px rgba(61,9,24,.6);}",
".lh6-row .bk2:focus-visible{outline:none;} .lh6-row .bk2:focus-visible .lh6-cv{outline:3px solid var(--g);outline-offset:3px;}",
".lh6-cv{position:relative;height:178px;border-radius:5px 12px 12px 5px;padding:12px 11px 10px 15px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 10px 22px -12px rgba(61,9,24,.45);box-sizing:border-box;}",
".lh6-cv::before{content:\"\";position:absolute;top:0;bottom:0;right:0;width:6px;background:linear-gradient(90deg,rgba(0,0,0,.12),rgba(255,255,255,.18));}",
".lh6-cv .orn{position:absolute;inset:auto -18px -20px auto;width:100px;height:100px;opacity:.16;} .lh6-cv em{font-style:normal;font-size:10px;font-weight:900;opacity:.8;position:relative;}",
".lh6-cv b{font-family:\"Reem Kufi\",Cairo;font-weight:700;font-size:17px;line-height:1.35;margin:auto 0;position:relative;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;} .lh6-cv b.lg{font-size:14.5px;} .lh6-cv .au{font-size:10.5px;font-weight:800;opacity:.85;position:relative;}",
".lh6-row .bk2.sg .lh6-cv{background:transparent;border:1.5px dashed var(--g2);box-shadow:none;align-items:center;justify-content:center;text-align:center;gap:6px;color:var(--g);padding:12px;} .lh6-row .bk2.sg .lh6-cv::before{display:none;} .lh6-row .bk2.sg b{margin:0;font-family:Cairo,sans-serif;font-size:14px;color:var(--hd);} .lh6-row .bk2.sg .au{color:var(--mu);}",
"body.dark-mode #hh-learn .lh6-row .bk2.sg .lh6-cv{border-color:#5A4A26;}",
".lh6-pv{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.5fr);gap:24px;background:var(--bg);border:1px solid var(--ln);border-radius:24px;padding:22px 24px;scroll-margin-top:112px;}",
".lh6-pv .em{font-size:12px;font-weight:900;color:#8A6D2E;} body.dark-mode #hh-learn .lh6-pv .em{color:var(--gl);}",
".lh6-pv h3{margin:4px 0 2px;font-family:\"Reem Kufi\",Cairo;font-weight:700;font-size:26px;color:var(--hd);line-height:1.45;} .lh6-pv .by{font-size:13.5px;font-weight:800;color:var(--mu);}",
".lh6-pv .ld{font-size:14px;font-weight:700;line-height:1.95;color:var(--ink);margin:10px 0;display:-webkit-box;-webkit-line-clamp:6;-webkit-box-orient:vertical;overflow:hidden;}",
".lh6-pv .nums{display:flex;gap:18px;flex-wrap:wrap;margin:8px 0 14px;} .lh6-pv .nums span{font-size:12.5px;font-weight:800;color:var(--mu);} .lh6-pv .nums b{display:block;font-size:22px;color:var(--m);} body.dark-mode #hh-learn .lh6-pv .nums b{color:#EBA6BA;}",
".lh6-pv .first{display:flex;gap:10px;align-items:center;flex-wrap:wrap;background:var(--soft);border-radius:16px;padding:12px 14px;} .lh6-pv .first>span{font-size:14px;font-weight:800;flex:1 1 100%;color:var(--hd);line-height:1.7;} .lh6-pv .first>span:empty{display:none;} .lh6-pv .first small{display:block;font-size:12px;color:var(--mu);}",
".lh6-pv .map h5{margin:0 0 10px;font-size:13.5px;font-weight:900;color:var(--mu);display:flex;gap:6px;align-items:center;}",
".lh6-pv .path{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px 14px;counter-reset:n;}",
".lh6-pv .path div{display:flex;gap:10px;align-items:flex-start;counter-increment:n;padding:6px 0;border-bottom:1px dashed var(--ln);min-width:0;}",
".lh6-pv .path div::before{content:counter(n);width:24px;height:24px;border-radius:50%;background:var(--pk,#8A1538);color:#fff;display:grid;place-items:center;font-size:11.5px;font-weight:900;flex-shrink:0;margin-top:2px;}",
".lh6-pv .path span{min-width:0;} .lh6-pv .path b{display:block;font-size:13.5px;color:var(--hd);line-height:1.6;} .lh6-pv .path small{font-size:12.5px;font-weight:700;color:var(--mu);line-height:1.6;}",
".lh6-pv .more{all:unset;cursor:pointer;display:none;margin-top:10px;font-size:13px;font-weight:900;color:var(--m);border:1px solid var(--ln);border-radius:10px;padding:6px 12px;background:var(--card);} body.dark-mode #hh-learn .lh6-pv .more{color:#EBA6BA;}",
".lh6-ins{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:12px;}",
".lh6-ins div{background:var(--bg);border:1px solid var(--ln);border-radius:20px;padding:14px;text-align:center;min-width:0;} .lh6-ins .v{height:66px;display:grid;place-items:center;margin-bottom:8px;} .lh6-ins b{display:block;font-size:14.5px;color:var(--hd);} .lh6-ins small{font-size:12px;font-weight:700;color:var(--mu);line-height:1.7;display:block;}",
".lh6-au{display:flex;gap:12px;flex-wrap:wrap;}",
".lh6-au .ap{all:unset;cursor:pointer;box-sizing:border-box;flex:0 0 104px;text-align:center;padding:4px 0;border-radius:14px;} .lh6-au .ap:hover b{color:var(--m);}",
".lh6-au .ap i{display:grid;place-items:center;margin:0 auto 7px;width:60px;height:60px;border-radius:50%;font-style:normal;font-family:\"Reem Kufi\",Cairo;font-size:25px;color:#fff;box-shadow:0 0 0 3px var(--card),0 0 0 5px var(--ln);}",
".lh6-au .ap b{display:block;font-size:12.5px;line-height:1.5;color:var(--hd);} .lh6-au .ap small{font-size:11.5px;font-weight:800;color:var(--mu);} .lh6-au .ap.more{display:none;}",
".lh6-lead{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;}",
".lh6-lead .lc{background:var(--bg);border:1px solid var(--ln);border-radius:22px;overflow:hidden;display:flex;flex-direction:column;min-width:0;}",
".lh6-lead .cvw{height:190px;display:grid;place-items:center;} .lh6-lead .cvw.burn{background:radial-gradient(80% 90% at 70% 15%,#FFFBF4,#F9E6D6);} .lh6-lead .cvw.nmodel{background:radial-gradient(80% 90% at 70% 20%,#F3F6EF,#E3EEEC);}",
"body.dark-mode #hh-learn .lh6-lead .cvw.burn{background:radial-gradient(80% 90% at 70% 15%,#3A271D,#2A1C15);} body.dark-mode #hh-learn .lh6-lead .cvw.nmodel{background:radial-gradient(80% 90% at 70% 20%,#16302F,#0F2222);}",
".lh6-lead .bk{width:112px;height:150px;border-radius:5px 14px 14px 5px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;text-align:center;padding:12px 10px 12px 6px;transform:rotate(-3deg);transition:transform .3s;position:relative;overflow:hidden;}",
".lh6-lead .lc:hover .bk{transform:rotate(0) scale(1.03);}",
".lh6-lead .bk.burn{background:linear-gradient(175deg,#FFFDF8,#FBE1CB);box-shadow:inset 8px 0 0 #E8A06C,0 18px 30px rgba(154,74,28,.22);} .lh6-lead .bk.burn b{font-family:\"Reem Kufi\",Cairo;font-size:17px;line-height:1.45;color:#9A4A1C;} .lh6-lead .bk.burn small{font-size:10px;font-weight:800;color:#A0715A;}",
".lh6-lead .bk.nmodel{background:linear-gradient(165deg,#13434D,#0A2A31);box-shadow:inset 8px 0 0 #C9A35A,0 18px 30px rgba(10,42,49,.35);} .lh6-lead .bk.nmodel b{font-family:\"Reem Kufi\",Cairo;font-size:15px;line-height:1.45;color:#EBD49A;} .lh6-lead .bk.nmodel small{font-size:10px;font-weight:800;color:#A9C6C9;}",
".lh6-lead .bd{padding:16px 18px 18px;display:flex;flex-direction:column;gap:10px;flex:1;} .lh6-lead .bd em{font-style:normal;font-size:12px;font-weight:900;color:var(--lk);} body.dark-mode #hh-learn .lh6-lead .bd em{color:var(--gl);}",
".lh6-lead .bd h3{margin:0;font-size:20px;line-height:1.5;color:var(--hd);} .lh6-lead .bd p{margin:0;font-size:13.5px;font-weight:700;line-height:1.9;color:var(--mu);}",
".lh6-lead .pr{display:flex;gap:10px;align-items:center;font-size:12.5px;font-weight:900;color:var(--mu);margin-top:auto;} .lh6-lead .br{flex:1;height:8px;border-radius:8px;background:var(--soft);overflow:hidden;} .lh6-lead .br i{display:block;height:100%;border-radius:8px;background:linear-gradient(90deg,var(--g),var(--m));}",
".lh6-lead .tl{display:flex;gap:6px;flex-wrap:wrap;} .lh6-lead .tl button{all:unset;cursor:pointer;display:inline-flex;gap:6px;align-items:center;font-size:12.5px;font-weight:900;border-radius:10px;padding:6px 10px;background:var(--card);border:1px solid var(--ln);color:var(--hd);} .lh6-lead .tl button:hover{border-color:var(--lk);} .lh6-lead .tl svg{color:var(--lk);}",
"body.dark-mode #hh-learn .lh6-lead .tl svg{color:var(--gl);}",
".lh6-lead .soon{border-style:dashed;background:transparent;align-items:center;justify-content:center;text-align:center;gap:8px;padding:28px 18px;min-height:240px;} .lh6-lead .soon .pl{width:72px;height:72px;border-radius:22px;border:1.5px dashed var(--g2);display:grid;place-items:center;color:var(--g);} .lh6-lead .soon b{font-size:17px;color:var(--mu);} .lh6-lead .soon small{font-size:13px;font-weight:700;color:var(--mu);}",
"@media (max-width:1100px){ .lh6-ins{grid-template-columns:repeat(3,minmax(0,1fr));} .lh6-lead{grid-template-columns:repeat(2,minmax(0,1fr));} .lh6-stage{grid-template-columns:250px minmax(0,1fr);} .lh6-stage .main{padding:22px 22px 18px;} }",
"@media (max-width:900px){",
" .lh6-ph h1{font-size:28px;} .lh6-ph p{font-size:13.5px;}",
" .lh6-tabs{display:flex;overflow-x:auto;gap:8px;margin:0 -14px;padding:8px 14px;scrollbar-width:none;} .lh6-tabs::-webkit-scrollbar{display:none;}",
" .lh6-tabs .tab{flex:0 0 auto;padding:7px 12px 7px 14px;border-radius:14px;gap:8px;} .lh6-tabs .tab small,.lh6-tabs .tab em{display:none;} .lh6-tabs .tab i{width:32px;height:32px;border-radius:10px;} .lh6-tabs .tab i svg{width:18px;height:18px;} .lh6-tabs .tab b{font-size:14px;}",
" .lh6-tabs .tab.on::after{display:none;} .lh6-tabs .tab.on{background:var(--k);border-color:var(--k);} .lh6-tabs .tab.on b{color:#fff;} .lh6-tabs .tab.on i{background:rgba(255,255,255,.2);color:#fff;}",
" body.dark-mode #hh-learn .lh6-tabs .tab.on b,body.dark-mode #hh-learn .lh6-tabs .tab.on i{color:#1A0C12;}",
" .lh6-pn{padding:16px 14px 18px;border-radius:20px;} .lh6-pn .pnh h2{font-size:19px;} .lh6-cnt{margin:0;width:100%;max-width:none;}",
" .lh6-stage{grid-template-columns:minmax(0,1fr);border-radius:20px;} .lh6-stage .side{padding:16px;gap:10px;} .lh6-stage .side p,.lh6-stage .try{display:none;} .lh6-stage .side h2{font-size:20px;}",
" .lh6-stage .rail{display:flex;gap:4px;overflow-x:auto;} .lh6-stage .rail::before{display:none;} .lh6-stage .rail li{flex:1 0 auto;} .lh6-stage .rail button{flex-direction:column;gap:4px;padding:6px 6px;text-align:center;} .lh6-stage .rail small{display:none;} .lh6-stage .rail b{font-size:12.5px;}",
" .lh6-stage .main{padding:18px 16px;min-height:0;} .lh6-stage h3{font-size:19px;} .lh6-quote{font-size:21px;padding:14px 16px;} .lh6-opt{font-size:14.5px;padding:11px 12px;}",
" .lh6-its,.lh6-page,.lh6-save,.lh6-pv,.lh6-pv .path{grid-template-columns:minmax(0,1fr);} .lh6-save .card{font-size:19px;}",
" .lh6-daa{grid-template-columns:auto minmax(0,1fr);padding:16px;} .lh6-daa .lh6-gb{grid-column:1/-1;justify-content:center;} .lh6-daa h3{font-size:19px;}",
" .lh6-me{grid-template-columns:repeat(2,minmax(0,1fr));} .lh6-ins{grid-template-columns:repeat(2,minmax(0,1fr));} .lh6-lead{grid-template-columns:minmax(0,1fr);}",
" .lh6-sh h3{font-size:20px;} .lh6-sh .chips{margin:0;flex-wrap:nowrap;overflow-x:auto;width:100%;padding-bottom:2px;} .lh6-sh .chips button{white-space:nowrap;}",
" .lh6-pv{padding:16px;gap:16px;} .lh6-pv h3{font-size:22px;} .lh6-pv .map:not(.all) .path .mx{display:none;} .lh6-pv .more{display:inline-block;}",
" .lh6-pv .first .lh6-b1{flex:1;}",
" .lh6-qg .qb{width:100%;} .lh6-qg .qb b{flex:1;font-size:14.5px;}",
" .lh6-path li{flex-wrap:wrap;} .lh6-path li .lh6-b1{margin-inline-start:38px;}",
" .lh6-au{gap:8px;} .lh6-au .ap{flex:0 1 auto;display:flex;gap:8px;align-items:center;text-align:start;background:var(--bg);border:1px solid var(--ln);border-radius:999px;padding:4px 12px 4px 4px;}",
" .lh6-au .ap i{width:30px;height:30px;font-size:14px;margin:0;box-shadow:none;flex-shrink:0;} .lh6-au .ap b{font-size:13px;} .lh6-au .ap small{display:none;}",
" .lh6-au:not(.all) .ap.mx{display:none;} .lh6-au .ap.more{display:flex;padding:8px 14px;font-size:13px;font-weight:900;color:var(--hd);}",
" .lh6-tools{grid-template-columns:minmax(0,1fr);}",
"}",
"/* ═══ zzda: «تعلّم» بقائمة جانبية في الحاسوب، والمكتبة شبكة أغلفة ═══ */",
"#hh-learn .lh7{max-width:1288px;}",
".lh7 button{font-family:inherit;}",
".lh7-app{display:grid;grid-template-columns:250px minmax(0,1fr);gap:22px;align-items:start;margin-top:6px;}",
".lh7-sb{position:sticky;top:14px;background:var(--card);border:1px solid var(--ln);border-radius:20px;padding:10px;max-height:calc(100vh - var(--hh-bar,80px) - var(--hh-bar-b,0px) - 28px);overflow:auto;box-sizing:border-box;}",
".lh7-sb h5{margin:12px 10px 6px;font-size:12px;font-weight:900;color:#8A6D2E;display:flex;gap:6px;align-items:center;} body.dark-mode #hh-learn .lh7-sb h5{color:var(--gl);}",
".lh7-sb nav button{all:unset;cursor:pointer;box-sizing:border-box;display:flex;align-items:center;gap:10px;width:100%;padding:9px 12px;border-radius:12px;font-weight:800;font-size:14px;color:var(--ink);}",
".lh7-sb nav button svg{color:var(--mu);flex-shrink:0;} .lh7-sb nav button span{flex:1;min-width:0;line-height:1.5;}",
".lh7-sb nav button em{font-style:normal;font-size:11.5px;font-weight:900;color:var(--mu);background:var(--soft);border-radius:999px;padding:1px 8px;}",
".lh7-sb nav button:hover{background:var(--soft);} .lh7-sb nav button:focus-visible{outline:3px solid var(--g);outline-offset:-2px;}",
".lh7-sb nav button.on{background:#E3F1EF;color:#1F6F7A;} .lh7-sb nav button.on svg{color:#1F6F7A;} .lh7-sb nav button.on em{background:#fff;color:#1F6F7A;}",
"body.dark-mode #hh-learn .lh7-sb nav button.on{background:#1D2F33;color:#9FDCE5;} body.dark-mode #hh-learn .lh7-sb nav button.on svg{color:#9FDCE5;} body.dark-mode #hh-learn .lh7-sb nav button.on em{background:var(--card);color:#9FDCE5;}",
".lh7-sb .mp{margin:10px 6px 4px;padding:12px;border-radius:14px;background:var(--bg);} .lh7-sb .mp b{font-size:13px;color:var(--hd);} .lh7-sb .mp small{display:block;font-size:12px;font-weight:700;color:var(--mu);line-height:1.7;}",
".lh7-sb .mp .br{height:6px;border-radius:6px;background:var(--soft);margin-top:8px;overflow:hidden;} .lh7-sb .mp .br i{display:block;height:100%;background:var(--g);border-radius:6px;}",
".lh7-main{min-width:0;} .lh7-main>.l2-wrap{max-width:none;padding:0;margin:0;} .lh7-main .l2-cr{display:none;}",
".lh7-welc{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin:0 2px 12px;} .lh7-welc h2{margin:0;font-family:\"Reem Kufi\",Cairo;font-weight:700;font-size:26px;color:var(--hd);} .lh7-welc small{font-size:13.5px;font-weight:700;color:var(--mu);}",
".lh7-h2{display:flex;align-items:baseline;gap:10px;margin:26px 2px 12px;flex-wrap:wrap;} .lh7-h2 h3{margin:0;font-size:19px;color:var(--hd);} .lh7-h2 small{font-size:13px;font-weight:700;color:var(--mu);}",
".lh7-h2 button{all:unset;cursor:pointer;margin-inline-start:auto;font-size:13px;font-weight:900;color:var(--m);display:inline-flex;gap:6px;align-items:center;} .lh7-h2 button:focus-visible{outline:3px solid var(--g);border-radius:6px;} body.dark-mode #hh-learn .lh7-h2 button{color:#EBA6BA;}",
".lh7-big{display:grid;grid-template-columns:70px minmax(0,1fr) auto;gap:18px;align-items:center;background:linear-gradient(150deg,#173D33,#2F6B5A);color:#fff;border-radius:22px;padding:18px 22px;}",
".lh7-big .cvw{width:70px;display:block;} .lh7-big .blk{display:grid;place-items:center;aspect-ratio:2/3;border-radius:4px 10px 10px 4px;font-family:\"Reem Kufi\",Cairo;font-size:11px;line-height:1.4;text-align:center;padding:6px;color:#fff;box-shadow:inset 3px 0 0 rgba(0,0,0,.15);}",
".lh7-big .tx{min-width:0;} .lh7-big small{color:#E9CF98;font-weight:800;font-size:12.5px;} .lh7-big b{display:block;font-size:21px;margin:2px 0;line-height:1.45;color:#fff;}",
".lh7-big .ln1{display:block;font-size:14px;font-weight:700;opacity:.88;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}",
".lh7-big .br{height:6px;border-radius:6px;background:rgba(255,255,255,.18);margin:8px 0 4px;overflow:hidden;max-width:520px;} .lh7-big .br i{display:block;height:100%;background:#E9CF98;}",
".lh7-big .pc{color:#fff;opacity:.8;font-weight:700;}",
".lh7-big .go,.lh7-feat .go{all:unset;cursor:pointer;box-sizing:border-box;height:48px;padding:0 22px;border-radius:14px;background:#E9CF98;color:#173D33;font-weight:900;font-size:15px;display:flex;align-items:center;gap:8px;white-space:nowrap;position:relative;z-index:1;}",
".lh7-big .go:focus-visible,.lh7-feat .go:focus-visible{outline:3px solid #fff;outline-offset:2px;}",
".lh7-today{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px;margin-top:14px;align-items:start;}",
".lh7-lit{background:var(--g1);border-radius:18px;padding:16px 18px;} .lh7-lit h4,.lh7-dq h4{margin:0 0 6px;font-size:12.5px;font-weight:900;color:#8A6D2E;} body.dark-mode #hh-learn .lh7-lit h4,body.dark-mode #hh-learn .lh7-dq h4{color:var(--gl);}",
".lh7-lit blockquote{margin:0;font-family:Amiri,serif;font-size:20px;line-height:1.85;color:var(--hd);}",
".lh7-lit .ft{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:8px;} .lh7-lit .ft small{font-size:12px;font-weight:800;color:var(--mu);flex:1;min-width:0;}",
".lh7-lit .ft button{all:unset;cursor:pointer;display:inline-flex;gap:6px;align-items:center;font-size:12.5px;font-weight:900;color:#8A6D2E;background:var(--card);border:1px solid var(--g2);border-radius:10px;padding:5px 10px;} .lh7-lit .ft button.on{background:#2F8F5B;border-color:#2F8F5B;color:#fff;} .lh7-lit .ft button:focus-visible{outline:3px solid var(--g);}",
"body.dark-mode #hh-learn .lh7-lit .ft button{color:var(--gl);border-color:#5A4A26;} body.dark-mode #hh-learn .lh7-lit .ft button.on{color:#fff;}",
".lh7-dq{background:var(--card);border:1px solid var(--ln);border-radius:18px;padding:14px 16px;} .lh7-dq>b{display:block;font-size:15px;color:var(--hd);margin-bottom:8px;line-height:1.6;}",
".lh7-dq .o{display:grid;gap:6px;} .lh7-dq .o button{all:unset;cursor:pointer;box-sizing:border-box;border:1.5px solid var(--ln);border-radius:11px;padding:7px 12px;font-size:13.5px;font-weight:800;background:var(--bg);color:var(--ink);line-height:1.6;}",
".lh7-dq .o button:hover{border-color:var(--g);} .lh7-dq .o button:focus-visible{outline:3px solid var(--g);} .lh7-dq .o button[aria-disabled]{cursor:default;}",
".lh7-dq .o .ok{border-color:#2F8F5B;background:#E7F4EC;color:#1E5A39;} .lh7-dq .o .no{border-color:#C0392B;background:#FBEAEA;color:#8A1F15;} .lh7-dq .o .dim{opacity:.55;}",
"body.dark-mode #hh-learn .lh7-dq .o .ok{background:#1E3027;color:#BFE6CE;} body.dark-mode #hh-learn .lh7-dq .o .no{background:#3A1E25;color:#F2C2CD;}",
".lh7-dq .why{margin-top:10px;border-inline-start:4px solid var(--g);background:var(--g1);border-radius:12px;padding:10px 14px;font-size:13.5px;font-weight:800;line-height:1.9;color:var(--ink);} .lh7-dq .why b{color:#8A6D2E;margin-inline-end:4px;} body.dark-mode #hh-learn .lh7-dq .why b{color:var(--gl);}",
".lh7-dq .why .ft{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:4px;} .lh7-dq .why small{font-size:12px;color:var(--mu);flex:1;} .lh7-dq .why button{all:unset;cursor:pointer;font-size:12.5px;font-weight:900;color:var(--m);} body.dark-mode #hh-learn .lh7-dq .why button{color:#EBA6BA;}",
".lh7-dq .src{display:block;margin-top:8px;font-size:12px;color:var(--mu);font-weight:700;}",
".lh7-mini3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;}",
".lh7-mini3 .st2{all:unset;cursor:pointer;box-sizing:border-box;background:var(--card);border:1px solid var(--ln);border-radius:18px;padding:14px;display:flex;gap:12px;align-items:center;min-width:0;transition:border-color .2s,transform .2s;}",
".lh7-mini3 .st2:hover{border-color:var(--sk);transform:translateY(-2px);} .lh7-mini3 .st2:focus-visible{outline:3px solid var(--g);outline-offset:2px;}",
".lh7-mini3 .n{width:46px;height:46px;border-radius:14px;display:grid;place-items:center;background:var(--sk1);color:var(--sk);flex-shrink:0;font-weight:900;font-size:16px;}",
"body.dark-mode #hh-learn .lh7-mini3 .n{background:color-mix(in srgb,var(--sk) 26%,var(--card));color:color-mix(in srgb,var(--sk) 40%,#fff);}",
".lh7-mini3 .st2>span:nth-child(2){flex:1;min-width:0;} .lh7-mini3 b{display:block;font-size:14.5px;color:var(--hd);line-height:1.5;} .lh7-mini3 small{display:block;font-size:12px;font-weight:700;color:var(--mu);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;} .lh7-mini3 svg{color:var(--mu);flex-shrink:0;}",
".lh7-paths{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;}",
".lh7-paths .pc{all:unset;cursor:pointer;box-sizing:border-box;background:var(--card);border:1px solid var(--ln);border-radius:18px;padding:14px;display:flex;flex-direction:column;gap:6px;min-width:0;} .lh7-paths .pc:hover{border-color:var(--g);} .lh7-paths .pc:focus-visible{outline:3px solid var(--g);outline-offset:2px;}",
".lh7-paths b{font-size:15px;color:var(--hd);line-height:1.5;} .lh7-paths small{font-size:12.5px;font-weight:700;color:var(--mu);} .lh7-paths .cvs{display:flex;margin-top:4px;} .lh7-paths .cvs span{width:18px;height:26px;border-radius:2px 5px 5px 2px;margin-inline-end:-6px;box-shadow:0 0 0 2px var(--card);}",
".lh7-certs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;}",
".lh7-certs button{all:unset;cursor:pointer;box-sizing:border-box;display:flex;gap:12px;align-items:center;background:var(--card);border:1px solid var(--ln);border-radius:16px;padding:14px;} .lh7-certs button:hover{border-color:var(--g);} .lh7-certs button:focus-visible{outline:3px solid var(--g);}",
".lh7-certs i{width:46px;height:46px;border-radius:14px;display:grid;place-items:center;background:var(--g1);color:#8A6D2E;flex-shrink:0;} body.dark-mode #hh-learn .lh7-certs i{color:var(--gl);} .lh7-certs b{display:block;font-size:15px;color:var(--hd);} .lh7-certs small{font-size:12.5px;font-weight:700;color:var(--mu);}",
".lh7-emp2{background:var(--card);border:1.5px dashed var(--g2);border-radius:20px;padding:30px 20px;text-align:center;display:grid;justify-items:center;gap:8px;} .lh7-emp2 i{color:var(--g);} .lh7-emp2 b{font-size:17px;color:var(--hd);} .lh7-emp2 p{margin:0 0 6px;color:var(--mu);font-weight:700;font-size:14px;}",
"body.dark-mode #hh-learn .lh7-emp2{border-color:#5A4A26;}",
".lh6-lead.one{grid-template-columns:minmax(0,1fr);} .lh6-lead.one .lc:not(.soon){flex-direction:row;} .lh6-lead.one .cvw{width:300px;height:auto;min-height:250px;flex-shrink:0;} .lh6-lead.one .bd{padding:20px 22px;} .lh6-lead.one .soon{min-height:0;padding:20px;flex-direction:row;gap:14px;} .lh6-lead.one .soon .pl{width:52px;height:52px;border-radius:16px;}",
"/* المكتبة */",
".lh7-feat{display:grid;grid-template-columns:100px minmax(0,1fr) auto;gap:22px;align-items:center;background:linear-gradient(120deg,#173D33,#2F6B5A);color:#fff;border-radius:24px;padding:18px 24px;position:relative;overflow:hidden;}",
".lh7-feat::after{content:\"\";position:absolute;inset:auto -60px -80px auto;width:260px;height:260px;border-radius:50%;border:38px solid rgba(233,207,152,.08);pointer-events:none;}",
".lh7-feat .cvw{display:block;width:100px;} .lh7-feat .tx{min-width:0;} .lh7-feat small{color:#E9CF98;font-weight:900;font-size:12.5px;} .lh7-feat h2{margin:2px 0;font-family:\"Reem Kufi\",Cairo;font-weight:700;font-size:28px;color:#fff;line-height:1.35;}",
".lh7-feat p{margin:0;opacity:.9;font-weight:700;font-size:14px;line-height:1.8;} .lh7-feat .sb{opacity:.72;font-size:13px;}",
".lh7-feat .lv{display:flex;gap:6px;margin-top:10px;flex-wrap:wrap;} .lh7-feat .lv span{background:rgba(255,255,255,.12);border-radius:9px;padding:4px 10px;font-size:12px;font-weight:800;} .lh7-feat .lv:empty{display:none;}",
".lh7-bar{display:flex;gap:10px;align-items:center;margin:18px 0 16px;flex-wrap:wrap;}",
".lh7-bar .chips{display:flex;gap:6px;flex-wrap:wrap;min-width:0;}",
".lh7-bar .chips button{all:unset;cursor:pointer;box-sizing:border-box;height:38px;padding:0 13px;border-radius:12px;border:1px solid var(--ln);background:var(--card);display:inline-flex;align-items:center;gap:6px;font-size:13.5px;font-weight:900;color:var(--mu);white-space:nowrap;flex-shrink:0;}",
".lh7-bar .chips button em{font-style:normal;font-size:11.5px;opacity:.75;} .lh7-bar .chips button:hover{border-color:var(--g);} .lh7-bar .chips button:focus-visible{outline:3px solid var(--g);outline-offset:1px;}",
".lh7-bar .chips button.on{background:var(--hd);border-color:var(--hd);color:var(--card);}",
".lh7-bar .tools{margin-inline-start:auto;display:flex;gap:8px;align-items:center;min-width:0;}",
".lh7-bar .srch{width:220px;height:38px;border:1px solid var(--ln);background:var(--card);border-radius:12px;display:flex;align-items:center;gap:6px;padding:0 12px;color:var(--mu);box-sizing:border-box;min-width:0;}",
".lh7-bar .srch input{all:unset;flex:1;min-width:0;font-family:inherit;font-size:13.5px;font-weight:700;color:var(--ink);} .lh7-bar .srch input::placeholder{color:var(--mu);opacity:.85;} .lh7-bar .srch:focus-within{border-color:var(--g);box-shadow:0 0 0 3px rgba(184,146,74,.25);}",
".lh7-bar .srch input::-webkit-search-cancel-button{filter:grayscale(1);}",
".lh7-bar .sel{height:38px;border:1px solid var(--ln);background:var(--card);border-radius:12px;display:flex;align-items:center;gap:6px;padding:0 10px;color:var(--hd);box-sizing:border-box;flex-shrink:0;} .lh7-bar .sel:focus-within{border-color:var(--g);box-shadow:0 0 0 3px rgba(184,146,74,.25);}",
".lh7-bar .sel select{all:unset;cursor:pointer;font-family:inherit;font-size:13px;font-weight:900;color:var(--hd);padding-inline-end:2px;} body.dark-mode #hh-learn .lh7-bar .sel select{color-scheme:dark;} .lh7-bar .sel option{color:#2A1A0E;background:#fff;} body.dark-mode #hh-learn .lh7-bar .sel option{color:#EFE3CC;background:#22121A;}",
".lh7-bar .vt{display:flex;background:var(--soft);border-radius:11px;padding:3px;flex-shrink:0;} .lh7-bar .vt button{all:unset;cursor:pointer;width:34px;height:32px;border-radius:9px;display:grid;place-items:center;color:var(--mu);} .lh7-bar .vt button.on{background:var(--card);color:var(--hd);box-shadow:0 2px 6px -3px rgba(0,0,0,.3);} .lh7-bar .vt button:focus-visible{outline:3px solid var(--g);}",
".lh7-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:22px 18px;}",
".lh7-bk{all:unset;cursor:pointer;box-sizing:border-box;position:relative;display:block;min-width:0;}",
".lh7-bk .cvw{display:block;} .lh7-bk .hc-cv{transition:transform .25s,box-shadow .25s;}",
".lh7-bk:hover .hc-cv,.lh7-bk.on .hc-cv{transform:translateY(-6px) rotate(-.6deg);box-shadow:0 26px 36px -20px rgba(61,9,24,.7);}",
".lh7-bk.on .hc-cv,.lh7-bk:focus-visible .hc-cv{outline:3px solid var(--g);outline-offset:3px;}",
".lh7-bk .meta{display:block;margin-top:10px;min-width:0;} .lh7-bk .meta b{display:block;font-size:14.5px;color:var(--hd);line-height:1.5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;} .lh7-bk .meta small{font-size:12.5px;font-weight:700;color:var(--mu);} .lh7-bk .ex{display:none;}",
".lh7-bk .tag{position:absolute;top:-8px;left:-6px;z-index:3;background:#2F8F5B;color:#fff;font-size:11px;font-weight:900;border-radius:8px;padding:2px 8px;box-shadow:0 4px 10px -4px rgba(0,0,0,.4);} .lh7-bk .tag.c{background:var(--g);}",
".lh7-grid.list{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;}",
".lh7-grid.list .lh7-bk{display:flex;gap:14px;align-items:center;background:var(--card);border:1px solid var(--ln);border-radius:16px;padding:10px 12px;} .lh7-grid.list .lh7-bk:hover{border-color:var(--g);}",
".lh7-grid.list .cvw{width:54px;flex-shrink:0;} .lh7-grid.list .hc-cv{box-shadow:0 8px 14px -10px rgba(61,9,24,.6);} .lh7-grid.list .lh7-bk:hover .hc-cv{transform:none;} .lh7-grid.list .lh7-bk.on .hc-cv{transform:none;}",
".lh7-grid.list .meta{margin:0;flex:1;} .lh7-grid.list .ex{display:block;font-size:12.5px;font-weight:700;color:var(--mu);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}",
".lh7-grid.list .lpr{display:block;height:5px;border-radius:5px;background:var(--soft);overflow:hidden;margin-top:6px;max-width:220px;} .lh7-grid.list .lpr i{display:block;height:100%;background:var(--g);}",
".lh7-grid.list .tag{top:8px;left:10px;}",
".lh7-emp{grid-column:1/-1;margin:10px 0;padding:24px;text-align:center;border:1.5px dashed var(--ln);border-radius:16px;color:var(--mu);font-weight:800;}",
"/* المعاينة */",
".lh7-dim{position:fixed;left:0;right:0;top:var(--hh-bar,80px);bottom:var(--hh-bar-b,0px);background:rgba(30,10,16,.34);z-index:30;opacity:0;transition:opacity .2s;} .lh7-dim.in{opacity:1;}",
".lh7-drw{position:fixed;top:var(--hh-bar,80px);bottom:var(--hh-bar-b,0px);left:0;width:480px;max-width:100%;z-index:31;background:var(--bg);box-shadow:24px 0 60px -30px rgba(0,0,0,.5);overflow:auto;overscroll-behavior:contain;transform:translateX(-100%);transition:transform .25s ease;box-sizing:border-box;}",
".lh7-drw.in{transform:none;}",
"@media (prefers-reduced-motion:reduce){ .lh7-drw,.lh7-dim,.lh7-bk .hc-cv{transition:none;} }",
".lh7-drw .top{position:relative;padding:22px 24px 20px;display:grid;grid-template-columns:130px minmax(0,1fr);gap:18px;align-items:end;background:linear-gradient(170deg,var(--k1),var(--bg));}",
"body.dark-mode #hh-learn .lh7-drw .top{background:linear-gradient(170deg,color-mix(in srgb,var(--k) 24%,var(--card)),var(--bg));}",
".lh7-drw .x{all:unset;cursor:pointer;position:absolute;top:14px;left:14px;width:38px;height:38px;border-radius:12px;background:var(--card);border:1px solid var(--ln);display:grid;place-items:center;color:var(--hd);box-sizing:border-box;z-index:2;} .lh7-drw .x:focus-visible{outline:3px solid var(--g);outline-offset:2px;}",
".lh7-drw .cvw{display:block;} .lh7-drw .hd{min-width:0;} .lh7-drw .em{display:block;font-size:12px;font-weight:900;color:#8A6D2E;padding-inline-end:40px;} body.dark-mode #hh-learn .lh7-drw .em{color:var(--gl);}",
".lh7-drw h3{margin:2px 0;font-family:\"Reem Kufi\",Cairo;font-weight:700;font-size:26px;color:var(--hd);line-height:1.35;} .lh7-drw .by{font-size:13.5px;font-weight:800;color:var(--mu);}",
".lh7-drw .nums{display:flex;gap:16px;margin-top:10px;flex-wrap:wrap;} .lh7-drw .nums span{font-size:12px;font-weight:800;color:var(--mu);} .lh7-drw .nums b{display:block;font-size:20px;color:var(--m);} body.dark-mode #hh-learn .lh7-drw .nums b{color:#EBA6BA;}",
".lh7-drw .in{padding:0 24px;} .lh7-drw .ld{font-size:14px;font-weight:700;line-height:1.95;margin:14px 0;color:var(--ink);display:-webkit-box;-webkit-line-clamp:5;-webkit-box-orient:vertical;overflow:hidden;}",
".lh7-drw h4{margin:16px 0 8px;font-size:14px;color:var(--hd);display:flex;gap:6px;align-items:center;} .lh7-drw h4 svg{color:var(--g);}",
".lh7-drw .mp{list-style:none;margin:0;padding:0;} .lh7-drw .mp li{display:grid;grid-template-columns:28px minmax(0,1fr) auto;gap:10px;padding:7px 0;position:relative;align-items:start;}",
".lh7-drw .mp li::before{content:\"\";position:absolute;right:13px;top:35px;bottom:-6px;width:2px;background:var(--ln);} .lh7-drw .mp li:last-child::before{display:none;}",
".lh7-drw .mp i{--kk:var(--k);width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:var(--card);border:2px solid var(--kk);color:var(--kk);font-style:normal;font-size:12px;font-weight:900;position:relative;z-index:1;box-sizing:border-box;}",
".lh7-drw .mp li.d i{background:var(--kk);color:#fff;} .lh7-drw .mp li.nx i{box-shadow:0 0 0 4px color-mix(in srgb,var(--kk) 22%,transparent);}",
"body.dark-mode #hh-learn .lh7-drw .mp i{--kk:color-mix(in srgb,var(--k) 50%,#fff);} body.dark-mode #hh-learn .lh7-drw .mp li.d i{color:#1A0C12;}",
".lh7-drw .mp b{display:block;font-size:13.5px;color:var(--hd);line-height:1.5;} .lh7-drw .mp small{display:block;font-size:12.5px;font-weight:700;color:var(--mu);line-height:1.6;}",
".lh7-drw .mp em{font-style:normal;font-size:11px;font-weight:900;color:#2F8F5B;background:rgba(47,143,91,.12);border-radius:999px;padding:2px 8px;margin-top:3px;white-space:nowrap;}",
".lh7-drw .more{all:unset;cursor:pointer;margin-top:6px;font-size:13px;font-weight:900;color:var(--m);border:1px solid var(--ln);border-radius:10px;padding:6px 12px;background:var(--card);} .lh7-drw .more:focus-visible{outline:3px solid var(--g);} body.dark-mode #hh-learn .lh7-drw .more{color:#EBA6BA;}",
".lh7-drw .fq{margin-top:14px;background:var(--soft);border-radius:16px;padding:12px 14px;font-weight:800;font-size:14px;color:var(--hd);line-height:1.7;} .lh7-drw .fq small{display:block;font-size:12px;color:var(--mu);}",
".lh7-drw .acts{display:flex;gap:8px;margin-top:14px;position:sticky;bottom:0;z-index:3;background:var(--bg);padding:12px 0 16px;}",
".lh7-drw .acts button{all:unset;cursor:pointer;box-sizing:border-box;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;gap:8px;font-weight:900;font-size:14.5px;} .lh7-drw .acts button:focus-visible{outline:3px solid var(--g);outline-offset:2px;}",
".lh7-drw .acts .p{flex:1;background:#8A1538;color:#fff;padding:0 14px;} body.dark-mode #hh-learn .lh7-drw .acts .p{background:#A3274C;} .lh7-drw .acts .s{padding:0 14px;border:1.5px solid var(--ln);color:var(--hd);background:var(--card);white-space:nowrap;}",
"/* الأحجام */",
"@media (max-width:1280px){ .lh7-grid{grid-template-columns:repeat(5,minmax(0,1fr));} }",
"@media (max-width:1099px){ .lh7-grid{grid-template-columns:repeat(5,minmax(0,1fr));gap:20px 14px;} .lh7-bar .tools{margin-inline-start:0;flex:1 1 100%;} .lh7-bar .srch{flex:1;width:auto;} }",
"@media (max-width:899px){ .lh7-grid{grid-template-columns:repeat(4,minmax(0,1fr));} .lh7-grid.list{grid-template-columns:minmax(0,1fr);} .lh7-feat{grid-template-columns:80px minmax(0,1fr);gap:14px;padding:16px;} .lh7-feat .cvw{width:80px;} .lh7-feat .go{grid-column:1/-1;justify-content:center;} .lh7-feat h2{font-size:23px;} }",
"@media (max-width:699px){ .lh7-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:18px 10px;} .lh7-bk .meta b{font-size:12.5px;} .lh7-bk .meta small{font-size:11.5px;} .lh7-bk .tag{font-size:10px;padding:1px 6px;left:-4px;}",
"  .lh7-bar{margin:14px 0 12px;} .lh7-bar .chips{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;flex:1 1 100%;padding:2px;margin:-2px;} .lh7-bar .chips::-webkit-scrollbar{display:none;} .lh7-bar .chips button{height:34px;font-size:13px;padding:0 11px;}",
"  .lh7-bar .sel{padding:0 8px;} .lh7-bar .sel select{font-size:12.5px;} .lh7-bar .srch{padding:0 10px;}",
"  .lh7-drw{top:auto;left:0;right:0;width:auto;max-height:82vh;max-height:82dvh;border-radius:22px 22px 0 0;transform:translateY(100%);box-shadow:0 -20px 50px -20px rgba(0,0,0,.45);}",
"  .lh7-drw::before{content:\"\";display:block;width:44px;height:5px;border-radius:5px;background:var(--ln);margin:8px auto 0;}",
"  .lh7-drw .top{grid-template-columns:92px minmax(0,1fr);padding:12px 16px 14px;gap:14px;} .lh7-drw h3{font-size:21px;} .lh7-drw .nums{gap:12px;} .lh7-drw .nums b{font-size:18px;}",
"  .lh7-drw .in{padding:0 16px;} .lh7-drw .acts{flex-wrap:wrap;padding-bottom:calc(14px + env(safe-area-inset-bottom,0px));} .lh7-drw .acts .p{flex:1 1 100%;} .lh7-drw .acts .s{flex:1;height:44px;} }",
"body.dark-mode #hh-learn .lh7-bar .srch input,body.dark-mode #hh-learn .lh7-bar .sel select{background:transparent !important;border:0;box-shadow:none;padding:0;color:var(--ink) !important;}",
".lhj{--jt:#1F6F7A;--jt1:#E3F1EF;--jh1:#D9EBE8;--jh2:#9FCFC9;--jh3:#3E9AA4;--jh4:#1F6F7A;--jok:#2F8F5B;}",
"body.dark-mode #hh-learn .lhj{--jt:#7CC9D2;--jt1:#173236;--jh1:#1C3A3D;--jh2:#24605F;--jh3:#3A8F96;--jh4:#78CBD3;--jok:#7FD3A2;}",
".lhj button{font-family:inherit;} .lhj button:focus-visible{outline:3px solid var(--g);outline-offset:2px;}",
".lhj-top{display:flex;align-items:center;gap:12px 16px;flex-wrap:wrap;margin:0 2px 16px;} .lhj-top .tt{display:flex;align-items:baseline;gap:4px 14px;flex-wrap:wrap;min-width:0;}",
".lhj-top h1{margin:0;font-family:\"Reem Kufi\",Cairo,sans-serif;font-weight:700;font-size:32px;line-height:1.35;color:var(--hd);} .lhj-top small{font-size:14px;font-weight:700;color:var(--mu);}",
".lhj-seg{margin-inline-start:auto;display:flex;gap:2px;background:var(--soft);border-radius:14px;padding:4px;}",
".lhj-seg button{all:unset;cursor:pointer;box-sizing:border-box;min-height:40px;padding:0 14px;border-radius:10px;font-size:13px;font-weight:900;color:var(--mu);display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;} .lhj-seg button[aria-pressed=true]{background:var(--card);color:var(--hd);box-shadow:0 1px 4px rgba(0,0,0,.08);} .lhj-seg button:focus-visible{outline:3px solid var(--g);}",
".lhj-hero{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:16px;}",
".lhj-lvl{background:linear-gradient(150deg,#3D0918,#7A1431);color:#fff;border-radius:24px;padding:20px 24px;display:grid;grid-template-columns:auto minmax(0,1fr);gap:20px;align-items:center;min-width:0;}",
".lhj-ring{width:118px;height:118px;border-radius:50%;background:conic-gradient(#E9CF98 var(--p),rgba(255,255,255,.15) 0);display:grid;place-items:center;} .lhj-ring>div{width:96px;height:96px;border-radius:50%;background:#5E0E26;display:grid;place-items:center;text-align:center;}",
".lhj-ring b{display:block;font-size:30px;line-height:1;color:#fff;} .lhj-ring small{font-size:12px;color:#E9CF98;font-weight:800;}",
".lhj-lvl h2{margin:0;font-size:24px;color:#fff;font-family:Cairo,sans-serif;} .lhj-lvl p{margin:4px 0 12px;font-size:14px;line-height:1.8;color:rgba(255,255,255,.88);font-weight:700;}",
".lhj-lvl .nx{display:flex;gap:8px;flex-wrap:wrap;} .lhj-lvl .nx span{background:rgba(255,255,255,.13);border-radius:10px;padding:5px 11px;font-size:12.5px;font-weight:800;color:#fff;}",
".lhj-wk{background:var(--card);border:1px solid var(--ln);border-radius:24px;padding:16px 20px;min-width:0;}",
".lhj-wk .hd{display:flex;align-items:center;justify-content:space-between;gap:10px;} .lhj-wk h4{margin:0;font-size:15px;color:var(--hd);}",
".lhj-wk .gb{all:unset;cursor:pointer;box-sizing:border-box;min-height:40px;padding:0 12px;border-radius:11px;border:1px solid var(--ln);font-size:12.5px;font-weight:900;color:var(--mu);display:inline-flex;gap:6px;align-items:center;} .lhj-wk .gb:hover{color:var(--m);border-color:var(--m);} body.dark-mode #hh-learn .lhj-wk .gb:hover{color:#EBA6BA;border-color:#EBA6BA;}",
".lhj-days{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:8px;margin:12px 0;} .lhj-days div{text-align:center;font-size:12px;font-weight:800;color:var(--mu);min-width:0;}",
".lhj-days i{display:grid;place-items:center;height:42px;border-radius:12px;background:var(--soft);margin-top:4px;font-style:normal;font-size:13px;color:var(--hd);font-weight:900;overflow:hidden;} .lhj-days i.on{background:var(--g);color:#fff;} .lhj-days i.td{box-shadow:0 0 0 2px var(--m) inset;background:var(--card);font-size:12px;} .lhj-days i.on.td{background:var(--g);color:#fff;}",
"body.dark-mode #hh-learn .lhj-days i.td{box-shadow:0 0 0 2px #EBA6BA inset;} body.dark-mode #hh-learn .lhj-days i.on{color:#1A1208;} body.dark-mode #hh-learn .lhj-days i.on.td{color:#1A1208;}",
".lhj-goal{display:flex;align-items:center;gap:10px;font-size:13.5px;font-weight:800;color:var(--ink);flex-wrap:wrap;} .lhj-goal .mu{flex:1 1 200px;color:var(--mu);font-size:13px;line-height:1.7;} .lhj-goal .bar{flex:1 1 80px;height:8px;border-radius:8px;background:var(--soft);overflow:hidden;} .lhj-goal .bar i{display:block;height:100%;background:var(--jt);border-radius:8px;}",
".lhj-gp{display:grid;gap:10px;} .lhj-gp .k{display:flex;gap:2px;background:var(--soft);border-radius:12px;padding:4px;justify-self:start;}",
".lhj-gp .k button{all:unset;cursor:pointer;box-sizing:border-box;min-height:40px;padding:0 16px;border-radius:9px;font-size:13px;font-weight:900;color:var(--mu);display:inline-flex;align-items:center;} .lhj-gp .k button[aria-pressed=true]{background:var(--card);color:var(--hd);}",
".lhj-gp .v{display:flex;gap:6px;flex-wrap:wrap;} .lhj-gp .v button{all:unset;cursor:pointer;box-sizing:border-box;min-height:44px;padding:0 14px;border-radius:12px;border:1.5px solid var(--ln);font-size:13.5px;font-weight:900;color:var(--hd);display:inline-flex;align-items:center;} .lhj-gp .v button:hover,.lhj-gp .v button.on{border-color:var(--jt);color:var(--jt);background:var(--jt1);}",
".lhj-gp .f{display:flex;gap:14px;justify-content:flex-end;} .lhj-gp .f button{all:unset;cursor:pointer;min-height:40px;font-size:13px;font-weight:900;color:var(--m);display:inline-flex;align-items:center;} body.dark-mode #hh-learn .lhj-gp .f button{color:#EBA6BA;}",
".lhj-kp{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:12px;margin-top:16px;}",
".lhj-kp>button,.lhj-kp>div{all:unset;box-sizing:border-box;display:block;background:var(--card);border:1px solid var(--ln);border-radius:18px;padding:12px 14px;min-width:0;} .lhj-kp>button{cursor:pointer;} .lhj-kp>button:hover{border-color:var(--jt);} .lhj-kp>button:focus-visible{outline:3px solid var(--g);}",
".lhj-kp b{display:block;font-size:26px;color:var(--jt);line-height:1.3;white-space:nowrap;} .lhj-kp b.na{font-size:15px;color:var(--mu);line-height:2.2;white-space:normal;} .lhj-kp small{display:block;font-size:12.5px;font-weight:800;color:var(--mu);} .lhj-kp em{display:block;font-style:normal;font-size:12px;font-weight:800;color:var(--jok);margin-top:2px;line-height:1.6;} .lhj-kp em.mu{color:var(--mu);font-weight:700;}",
".lhj-g2{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:16px;} .lhj-g2>div{min-width:0;}",
".lhj-box{background:var(--card);border:1px solid var(--ln);border-radius:20px;padding:14px 16px;}",
".lhj-emp{display:grid;justify-items:start;gap:10px;} .lhj-emp p{margin:0;font-size:14px;font-weight:700;line-height:1.9;color:var(--mu);}",
".lhj-go{all:unset;cursor:pointer;box-sizing:border-box;min-height:40px;padding:0 16px;border-radius:11px;background:var(--m);color:#fff;font-size:13px;font-weight:900;display:inline-flex;gap:6px;align-items:center;justify-content:center;white-space:nowrap;} .lhj-go:hover{filter:brightness(1.08);} .lhj-go:focus-visible{outline:3px solid var(--g);outline-offset:2px;}",
".lhj-s{all:unset;cursor:pointer;box-sizing:border-box;min-height:40px;padding:0 12px;border-radius:10px;border:1.5px solid var(--ln);font-size:12.5px;font-weight:900;color:var(--hd);display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;} .lhj-s:hover{border-color:var(--m);color:var(--m);} body.dark-mode #hh-learn .lhj-s:hover{border-color:#EBA6BA;color:#EBA6BA;} .lhj-s:focus-visible{outline:3px solid var(--g);}",
".lhj-bk{display:grid;grid-template-columns:44px minmax(0,1fr) 120px auto;grid-template-areas:\"cv tx pg go\";gap:6px 12px;align-items:center;padding:10px 4px;border-bottom:1px dashed var(--ln);} .lhj-bk:last-child{border-bottom:0;}",
".lhj-bk .cv{grid-area:cv;width:44px;height:60px;border-radius:3px 8px 8px 3px;display:block;box-shadow:0 2px 6px rgba(0,0,0,.12);} .lhj-bk .tx{grid-area:tx;min-width:0;} .lhj-bk .pg{grid-area:pg;} .lhj-bk .lhj-go{grid-area:go;}",
".lhj-bk b{display:block;font-size:14.5px;color:var(--hd);line-height:1.6;} .lhj-bk small{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:12.5px;font-weight:700;color:var(--mu);line-height:1.7;}",
".lhj-bk .pb{height:7px;border-radius:7px;background:var(--soft);overflow:hidden;} .lhj-bk .pb i{display:block;height:100%;background:var(--g);border-radius:7px;} .lhj-bk .pg span{display:block;font-size:12px;font-weight:900;color:var(--mu);margin-top:4px;text-align:center;}",
".lhj-hm{display:grid;grid-template-columns:repeat(15,minmax(0,1fr));gap:4px;margin-top:2px;} .lhj-hm i{aspect-ratio:1;border-radius:4px;background:var(--soft);} .lhj-hm i.td{box-shadow:0 0 0 1.5px var(--m) inset;} body.dark-mode #hh-learn .lhj-hm i.td{box-shadow:0 0 0 1.5px #EBA6BA inset;}",
".lhj-hm i.l1,.lhj-lg i.l1{background:var(--jh1);} .lhj-hm i.l2,.lhj-lg i.l2{background:var(--jh2);} .lhj-hm i.l3,.lhj-lg i.l3{background:var(--jh3);} .lhj-hm i.l4,.lhj-lg i.l4{background:var(--jh4);}",
".lhj-lg{display:flex;gap:6px;align-items:center;justify-content:flex-end;font-size:12px;font-weight:800;color:var(--mu);margin-top:8px;} .lhj-lg i{width:12px;height:12px;border-radius:3px;background:var(--soft);}",
".lhj-hint{margin:8px 0 0;font-size:13px;font-weight:700;line-height:1.8;color:var(--mu);}",
".lhj-h3{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;margin:16px 0 8px;} .lhj-h3 b{font-size:15px;color:var(--hd);} .lhj-h3 small{font-size:12.5px;font-weight:700;color:var(--mu);}",
".lhj-sk{display:grid;gap:10px;} .lhj-sk>div{display:grid;grid-template-columns:120px minmax(0,1fr) 44px;gap:10px;align-items:center;font-size:13.5px;font-weight:800;color:var(--ink);} .lhj-sk .bar{height:10px;border-radius:10px;background:var(--soft);overflow:hidden;} .lhj-sk .bar i{display:block;height:100%;border-radius:10px;} .lhj-sk b{font-size:13px;color:var(--ink);}",
".lhj-rv{display:flex;gap:12px;align-items:center;padding:10px 4px;border-bottom:1px dashed var(--ln);} .lhj-rv:last-child{border-bottom:0;}",
".lhj-rv>i{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;background:var(--m1);color:var(--m);font-style:normal;font-weight:900;flex-shrink:0;} body.dark-mode #hh-learn .lhj-rv>i{background:#3A1E25;color:#F2C2CD;}",
".lhj-rv .tx{flex:1;min-width:0;} .lhj-rv b{display:block;font-size:14px;color:var(--hd);line-height:1.7;} .lhj-rv small{font-size:12px;font-weight:700;color:var(--mu);}",
".lhj-rt{border:1.5px solid var(--g2);background:var(--g1);border-radius:16px;padding:12px 14px;margin-bottom:6px;} body.dark-mode #hh-learn .lhj-rt{border-color:#5A4A26;}",
".lhj-rt .hd{display:flex;align-items:center;gap:8px;} .lhj-rt .hd small{flex:1;font-size:12.5px;font-weight:800;color:#8A6D2E;} body.dark-mode #hh-learn .lhj-rt .hd small{color:var(--gl);}",
".lhj-rt .x{all:unset;cursor:pointer;width:44px;height:44px;border-radius:12px;display:grid;place-items:center;color:var(--mu);} .lhj-rt .x:hover{background:var(--card);} .lhj-rt .x:focus-visible{outline:3px solid var(--g);}",
".lhj-rt h4{margin:2px 0 10px;font-size:16px;line-height:1.8;color:var(--hd);}",
".lhj-rt .op{display:grid;gap:8px;} .lhj-rt .op button{all:unset;cursor:pointer;box-sizing:border-box;min-height:46px;padding:9px 12px;border-radius:12px;border:1.5px solid var(--ln);background:var(--card);font-size:15px;font-weight:800;line-height:1.7;color:var(--ink);display:flex;gap:10px;align-items:center;}",
".lhj-rt .op button span{width:28px;height:28px;border-radius:8px;background:var(--soft);display:grid;place-items:center;font-size:13px;font-weight:900;color:var(--mu);flex-shrink:0;} .lhj-rt .op button:hover:not([disabled]){border-color:var(--m);} .lhj-rt .op button[disabled]{cursor:default;}",
".lhj-rt .op button.ok{border-color:#2F8F5B;background:#E8F4EC;color:#1E5C3A;} .lhj-rt .op button.no{border-color:#C0425E;background:#FBEAEE;color:#8A1538;} .lhj-rt .op button.dim{opacity:.6;}",
"body.dark-mode #hh-learn .lhj-rt .op button.ok{background:#1E3027;color:#BFE6CE;} body.dark-mode #hh-learn .lhj-rt .op button.no{background:#3A1E25;color:#F2C2CD;}",
".lhj-rt .why{margin-top:10px;border-inline-start:4px solid #C0425E;background:var(--card);border-radius:12px;padding:10px 14px;} .lhj-rt .why.ok{border-color:#2F8F5B;} .lhj-rt .why b{display:block;font-size:14px;color:var(--hd);line-height:1.8;} .lhj-rt .why p{margin:4px 0 0;font-size:14px;font-weight:700;line-height:1.9;color:var(--ink);} .lhj-rt .why small{font-size:12px;color:var(--mu);}",
".lhj-rt .why .ft{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;} .lhj-rt .was{margin:8px 0 0;font-size:12.5px;font-weight:800;color:var(--mu);}",
".lhj-tl>div{display:grid;grid-template-columns:72px 14px minmax(0,1fr);gap:12px;align-items:start;padding:8px 0;} .lhj-tl span{font-size:12.5px;font-weight:800;color:var(--mu);line-height:1.9;} .lhj-tl i{width:12px;height:12px;border-radius:50%;background:var(--jt);margin-top:8px;box-shadow:0 0 0 4px var(--jt1);} .lhj-tl p{margin:0;font-size:13.5px;font-weight:800;line-height:1.9;color:var(--ink);}",
".lhj-ce{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;}",
".lhj-ce .c{all:unset;box-sizing:border-box;display:block;background:var(--card);border:1px solid var(--ln);border-radius:18px;padding:14px;text-align:center;min-width:0;} .lhj-ce button.c{cursor:pointer;} .lhj-ce button.c:hover{border-color:var(--g);} .lhj-ce button.c:focus-visible{outline:3px solid var(--g);}",
".lhj-ce .md{width:58px;height:58px;margin:0 auto 8px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(150deg,#E9CF98,#B8924A);color:#3D0918;} .lhj-ce .lock .md{background:var(--soft);color:#B7AA92;}",
".lhj-ce b{display:block;font-size:14px;color:var(--hd);line-height:1.6;} .lhj-ce small{display:block;font-size:12px;font-weight:700;color:var(--mu);margin-top:2px;} .lhj-ce .bar{display:block;height:6px;border-radius:6px;background:var(--soft);margin-top:8px;overflow:hidden;} .lhj-ce .bar i{display:block;height:100%;background:var(--g);}",
".lhj-lit{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;} .lhj-lit .lt{background:var(--g1);border-radius:16px;padding:14px 16px;font-family:Amiri,serif;font-size:18px;line-height:1.8;color:var(--hd);min-width:0;} .lhj-lit .lt small{display:block;font-family:Cairo,sans-serif;font-size:12px;font-weight:800;color:var(--mu);margin-top:4px;}",
".lhj-open{all:unset;cursor:pointer;box-sizing:border-box;width:100%;display:flex;gap:12px;align-items:center;margin-top:12px;background:var(--card);border:1.5px solid var(--ln);border-radius:16px;padding:12px 14px;min-height:56px;} .lhj-open:hover{border-color:var(--k,#1F6F7A);} .lhj-open:focus-visible{outline:3px solid var(--g);}",
".lhj-open i{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;background:#E3F1EF;color:#1F6F7A;flex-shrink:0;} body.dark-mode #hh-learn .lhj-open i{background:#173236;color:#7CC9D2;} .lhj-open span{flex:1;min-width:0;} .lhj-open b{display:block;font-size:15px;color:var(--hd);} .lhj-open small{font-size:12.5px;font-weight:700;color:var(--mu);line-height:1.7;} .lhj-open>svg{color:var(--mu);}",
"@media (max-width:1280px){ .lhj-kp{grid-template-columns:repeat(3,minmax(0,1fr));} }",
"@media (max-width:900px){ .lhj-hero,.lhj-g2{grid-template-columns:minmax(0,1fr);} .lhj-ce{grid-template-columns:repeat(2,minmax(0,1fr));} .lhj-lit{grid-template-columns:minmax(0,1fr);} }",
"@media (max-width:600px){ .lhj-top h1{font-size:26px;} .lhj-seg{margin-inline-start:0;width:100%;} .lhj-seg button{flex:1;min-height:44px;padding:0 6px;} .lhj-kp{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;} .lhj-kp b{font-size:23px;}",
" .lhj-lvl{padding:16px;gap:14px;border-radius:20px;} .lhj-ring{width:96px;height:96px;} .lhj-ring>div{width:78px;height:78px;} .lhj-ring b{font-size:26px;} .lhj-lvl h2{font-size:20px;} .lhj-lvl p{font-size:13.5px;}",
" .lhj-wk{padding:14px;border-radius:20px;} .lhj-wk .gb,.lhj-gp .k button,.lhj-gp .f button,.lhj-go,.lhj-s{min-height:44px;} .lhj-days{gap:5px;} .lhj-days i{height:40px;}",
" .lhj-bk{grid-template-columns:44px minmax(0,1fr) auto;grid-template-areas:\"cv tx go\" \"cv pg go\";} .lhj-bk .pg{display:flex;align-items:center;gap:8px;} .lhj-bk .pb{flex:1;} .lhj-bk .pg span{margin:0;}",
" .lhj-rv{flex-wrap:wrap;align-items:flex-start;} .lhj-rv .tx{flex:1 1 calc(100% - 48px);} .lhj-rv .lhj-s{margin-inline-start:48px;} .lhj .lh7-h2 button{min-height:44px;} .lhj-gp .f button{padding:0 10px;} .lhj-sk>div{grid-template-columns:104px minmax(0,1fr) 40px;font-size:13px;} .lhj-tl>div{grid-template-columns:60px 12px minmax(0,1fr);gap:10px;} .lhj-hm{gap:3px;} .lhj-ce{gap:10px;} .lhj-lit .lt{font-size:17px;} }",
'@media (max-width:760px){ #hh-learn .ln-cert{aspect-ratio:auto;padding:12px;} #hh-learn .ln-cert .in{padding:44px 16px;} #hh-learn .ln-cert h1{font-size:34px;} #hh-learn .ln-cert input{font-size:26px;min-width:0;width:100%;} #hh-learn .ln-cert p{font-size:16px;} #hh-learn .ln-cert .ft{width:100%;} }',
".ln-tools{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:16px;}",
".ln-tools button{all:unset;box-sizing:border-box;cursor:pointer;display:flex;gap:12px;align-items:center;background:var(--card);border:1.5px solid var(--ln);border-radius:18px;padding:14px 16px;min-width:0;transition:transform .2s,border-color .2s,box-shadow .2s;}",
".ln-tools button:hover{transform:translateY(-2px);border-color:var(--k);box-shadow:0 12px 26px color-mix(in srgb,var(--k) 16%,transparent);} .ln-tools button:focus-visible{outline:3px solid var(--g);outline-offset:2px;}",
".ln-tools i{width:46px;height:46px;border-radius:14px;display:grid;place-items:center;background:color-mix(in srgb,var(--k) 12%,var(--card));color:var(--k);flex-shrink:0;} .ln-tools span{min-width:0;}",
".ln-tools b{display:block;font-size:16px;font-weight:900;color:var(--hd);} .ln-tools small{display:block;font-size:12.5px;font-weight:700;color:var(--mu);line-height:1.7;}",
"body.dark-mode #hh-learn .ln-tools i{color:color-mix(in srgb,var(--k) 50%,#fff);background:color-mix(in srgb,var(--k) 24%,var(--card));}",
".ln-why{margin:14px auto 0;max-width:820px;background:rgba(255,255,255,.08);border-inline-start:4px solid #7FD0C9;border-radius:12px;padding:10px 14px;text-align:right;}",
".ln-why b{display:flex;gap:6px;align-items:center;font-size:13.5px;font-weight:900;color:#9FDCD5;} .ln-why p{margin:2px 0 0;font-size:15.5px;font-weight:700;line-height:1.9;color:#FFF8EA;} .ln-why small{display:block;font-size:12px;font-weight:800;color:#D9CBB0;}",
".ln-ls.big .ln-why p{font-size:22px;} .ln-ls.big .ln-why b{font-size:17px;}",
".ln-mhd,.ln-wh{display:flex;align-items:flex-end;gap:12px 18px;margin-bottom:14px;flex-wrap:wrap;} .ln-mhd h1,.ln-wh h1{margin:2px 0 4px;font-family:\"Reem Kufi\",Cairo;font-size:34px;font-weight:700;color:var(--hd);line-height:1.3;}",
".ln-mhd p{margin:0;flex:1;min-width:240px;font-size:14.5px;font-weight:700;color:var(--mu);line-height:1.9;} .ln-mhd .bt{display:flex;gap:8px;flex-wrap:wrap;} .ln-mhd .ln-b,.ln-wf .ln-b,.ln-ply .ctl .ln-b,.ln-mz .ln-b,.ln-mzr .ln-b{height:40px;padding:0 14px;font-size:13.5px;}",
".ln-fl{position:relative;height:560px;background:radial-gradient(60% 60% at 50% 50%,#F2FAFB,var(--card) 70%);border:1px solid var(--ln);border-radius:28px;overflow:hidden;}",
".ln-fl svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}",
".ln-fl .core{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:190px;height:190px;border-radius:50%;background:linear-gradient(160deg,#E6F4F7,#C9E6EC);box-shadow:0 0 0 12px rgba(201,230,236,.35),0 20px 40px rgba(14,90,110,.15);display:grid;place-items:center;text-align:center;}",
".ln-fl .core b{font-family:Amiri,serif;font-size:23px;line-height:1.35;color:#1F7A93;} .ln-fl .core small{display:block;font-size:12px;font-weight:800;color:#5A8C99;margin-top:4px;}",
".ln-fl .pt{all:unset;box-sizing:border-box;cursor:pointer;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:132px;border-radius:20px;background:var(--card);border:2px solid color-mix(in srgb,var(--k) 30%,var(--card));padding:10px 8px;text-align:center;transition:transform .2s,box-shadow .2s,border-color .2s;}",
".ln-fl .pt:hover,.ln-fl .pt.on{transform:translate(-50%,-50%) scale(1.07);box-shadow:0 14px 28px color-mix(in srgb,var(--k) 25%,transparent);border-color:var(--k);} .ln-fl .pt:focus-visible{outline:3px solid var(--g);outline-offset:3px;}",
".ln-fl .pt i{display:block;width:30px;height:30px;margin:0 auto 4px;border-radius:50%;background:var(--k);color:#fff;font-style:normal;font-size:13px;font-weight:900;line-height:30px;text-align:center;}",
".ln-fl .pt b{display:block;font-size:14.5px;color:var(--hd);} .ln-fl .pt small{font-size:11.5px;font-weight:800;color:var(--mu);}",
".ln-mc{margin-top:12px;background:var(--card);border:1px solid var(--ln);border-inline-start:6px solid var(--k);border-radius:18px;padding:14px 18px;display:flex;gap:14px;align-items:center;animation:lnIn .3s;} .ln-mc .tx{flex:1;min-width:0;}",
".ln-mc em{font-style:normal;font-size:12px;font-weight:900;color:var(--k);} .ln-mc b{display:block;font-size:18px;color:var(--hd);margin:2px 0 6px;} .ln-mc p{margin:0 0 8px;font-size:13.5px;font-weight:700;color:var(--mu);line-height:1.8;}",
".ln-mc ul{margin:0;padding:0;list-style:none;display:flex;gap:6px;flex-wrap:wrap;} .ln-mc li{background:var(--soft);border-radius:10px;padding:5px 10px;font-size:13px;font-weight:800;color:var(--ink);}",
"@keyframes lnIn{from{opacity:0;transform:translateY(6px)}}",
".ln-mapw.scr{max-width:none;padding:18px 28px 28px;} .ln-mapw.scr .ln-fl{height:calc(100vh - 260px);min-height:560px;} .ln-mapw.scr .ln-mhd h1{font-size:44px;} .ln-mapw.scr .ln-mc b{font-size:24px;} .ln-mapw.scr .ln-mc li{font-size:16px;}",
"body.dark-mode #hh-learn .ln-fl{background:radial-gradient(60% 60% at 50% 50%,#1C2A2E,var(--card) 70%);} body.dark-mode #hh-learn .ln-fl .core{background:linear-gradient(160deg,#173A44,#0F2A31);box-shadow:0 0 0 12px rgba(31,122,147,.14);}",
"body.dark-mode #hh-learn .ln-fl .core b{color:#BFE6EE;} body.dark-mode #hh-learn .ln-fl .core small{color:#8FBCC6;} body.dark-mode #hh-learn .ln-mc em{color:color-mix(in srgb,var(--k) 50%,#fff);}",
".ln-wh>div:first-child{flex:1;min-width:260px;} .ln-wh em{font-style:normal;font-size:12.5px;font-weight:900;color:var(--g);} .ln-wh p{margin:0;font-size:14.5px;font-weight:700;color:var(--mu);line-height:1.9;}",
".ln-wh .sum{width:240px;max-width:100%;display:grid;gap:6px;font-size:13px;font-weight:800;color:var(--mu);} .ln-wh .sum b{color:var(--hd);font-size:16px;}",
".ln-pbar{height:10px;border-radius:10px;background:var(--soft);overflow:hidden;} .ln-pbar i{display:block;height:100%;background:#1F6F7A;border-radius:10px;transition:width .3s;}",
".ln-wtabs{display:flex;gap:6px;flex-wrap:wrap;background:var(--card);border:1px solid var(--ln);border-radius:16px;padding:5px;margin-bottom:14px;}",
".ln-wtabs button{all:unset;cursor:pointer;padding:8px 14px;border-radius:12px;font-weight:900;font-size:14px;color:var(--mu);display:inline-flex;gap:6px;align-items:center;} .ln-wtabs button small{font-size:11.5px;font-weight:900;background:var(--soft);border-radius:20px;padding:0 8px;}",
".ln-wtabs button.on{background:#1F6F7A;color:#fff;} .ln-wtabs button.on small{background:rgba(255,255,255,.22);color:#fff;} .ln-wtabs button:focus-visible,.ln-sur button:focus-visible,.ln-seg button:focus-visible,.ln-rep button:focus-visible,.ln-ayl button:focus-visible,.ln-mzb button:focus-visible,.ln-wl button:focus-visible,.ln-ply .pb:focus-visible{outline:3px solid var(--g);outline-offset:2px;}",
".ln-wk{display:grid;grid-template-columns:auto minmax(0,1fr);gap:24px;align-items:center;background:var(--card);border:1px solid var(--ln);border-radius:24px;padding:22px;}",
".ln-wring{--p:0;all:unset;cursor:pointer;width:150px;height:150px;border-radius:50%;background:conic-gradient(#1F6F7A calc(var(--p)*1%),var(--soft) 0);display:grid;place-items:center;transition:transform .1s;-webkit-tap-highlight-color:transparent;} .ln-wring:active{transform:scale(.96);} .ln-wring:focus-visible{outline:3px solid var(--g);outline-offset:4px;}",
".ln-wring span{width:120px;height:120px;border-radius:50%;background:var(--card);display:grid;place-items:center;font-size:40px;font-weight:900;color:#1F6F7A;} .ln-wring.dn{background:#2F8F5B;cursor:default;} .ln-wring.dn span{color:#2F8F5B;}",
".ln-wk .tx{min-width:0;} .ln-wk .lb{display:block;font-size:13px;font-weight:900;color:var(--mu);line-height:1.7;} .ln-wk .dk{margin:4px 0 6px;font-family:Amiri,serif;font-size:24px;line-height:2;color:var(--hd);}",
".ln-wk .dk.ay{font-family:\"Amiri Quran\",Amiri,serif;font-size:22px;line-height:2.3;} .ln-wk .dk i,.ln-ayl .ay i,.ln-mz .ay i{font-style:normal;font-size:.7em;color:var(--g);}",
".ln-wk em{display:block;font-style:normal;font-size:12.5px;font-weight:800;color:var(--g);} .ln-wk .tg{display:inline-block;margin-top:8px;font-size:13px;font-weight:900;color:#1F6F7A;background:#E7F2F1;border-radius:10px;padding:4px 10px;}",
".ln-wl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:14px;}",
".ln-wl button{all:unset;box-sizing:border-box;cursor:pointer;display:flex;gap:10px;align-items:center;background:var(--card);border:1.5px solid var(--ln);border-radius:14px;padding:9px 12px;min-width:0;} .ln-wl button.on{border-color:#1F6F7A;box-shadow:0 6px 16px rgba(31,111,122,.12);}",
".ln-wl i{width:26px;height:26px;border-radius:8px;background:var(--soft);display:grid;place-items:center;font-style:normal;font-size:12px;font-weight:900;color:#1F6F7A;flex-shrink:0;} .ln-wl .dn i{background:#2F8F5B;color:#fff;}",
".ln-wl span{flex:1;min-width:0;font-size:13.5px;font-weight:800;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;} .ln-wl b{font-size:12.5px;color:var(--mu);flex-shrink:0;}",
".ln-wf{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px;}",
".ln-sur{position:relative;display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;} .ln-sur button{all:unset;cursor:pointer;padding:6px 12px;border-radius:12px;background:var(--card);border:1px solid var(--ln);font-size:13.5px;font-weight:900;color:var(--mu);} .ln-sur button.on{background:#0E8288;border-color:#0E8288;color:#fff;}",
".ln-seg{display:inline-flex;gap:4px;background:var(--soft);border-radius:14px;padding:4px;margin-bottom:14px;} .ln-seg button{all:unset;cursor:pointer;display:inline-flex;gap:6px;align-items:center;padding:8px 16px;border-radius:11px;font-weight:900;font-size:14px;color:var(--mu);} .ln-seg button.on{background:var(--card);color:#1F6F7A;box-shadow:0 2px 8px rgba(0,0,0,.08);}",
".ln-ply,.ln-mz{background:var(--card);border:1px solid var(--ln);border-radius:24px;padding:18px;}",
".ln-ply .now{display:flex;gap:14px;align-items:center;background:#E7F2F1;border-radius:18px;padding:14px 16px;} .ln-ply .now .tx{flex:1;min-width:0;}",
".ln-ply .pb{all:unset;cursor:pointer;width:54px;height:54px;border-radius:50%;background:#1F6F7A;color:#fff;display:grid;place-items:center;flex-shrink:0;box-shadow:0 8px 18px rgba(31,111,122,.25);}",
".ln-ply .now .ay{margin:0;font-family:\"Amiri Quran\",Amiri,serif;font-size:25px;line-height:2.1;color:var(--hd);} .ln-ply .now small{display:block;font-size:12.5px;font-weight:800;color:var(--mu);}",
".ln-wave{display:flex;gap:3px;align-items:center;height:30px;flex-shrink:0;} .ln-wave i{width:3px;height:var(--h);border-radius:3px;background:#1F6F7A;opacity:.4;} .ln-wave.on i{opacity:.85;animation:lnWv 1s ease-in-out infinite;animation-delay:var(--d);} @keyframes lnWv{50%{transform:scaleY(.35)}}",
".ln-ply .ctl{display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin:12px 0;}",
".ln-rep{display:flex;gap:6px;align-items:center;font-size:13px;font-weight:800;color:var(--mu);} .ln-rep button{all:unset;cursor:pointer;width:34px;height:34px;border-radius:10px;background:var(--soft);display:grid;place-items:center;font-weight:900;color:var(--hd);} .ln-rep button.on{background:#1F6F7A;color:#fff;}",
".ln-off{display:flex;gap:8px;align-items:center;background:#FBF3E2;color:#7A5E24;border-radius:12px;padding:9px 12px;font-size:13.5px;font-weight:800;margin:0 0 10px;line-height:1.7;}",
".ln-ayl{list-style:none;margin:0;padding:0;display:grid;gap:6px;} .ln-ayl li{display:flex;gap:10px;align-items:center;border-radius:14px;padding:4px 10px;border:1px solid transparent;}",
".ln-ayl li.on{background:color-mix(in srgb,#1F6F7A 8%,var(--card));border-color:color-mix(in srgb,#1F6F7A 30%,var(--card));}",
".ln-ayl button{all:unset;cursor:pointer;width:34px;height:34px;border-radius:50%;border:1.5px solid var(--ln);display:grid;place-items:center;color:#1F6F7A;flex-shrink:0;} .ln-ayl .ay{margin:0;flex:1;min-width:0;font-family:\"Amiri Quran\",Amiri,serif;font-size:21px;line-height:2.1;color:var(--hd);}",
".ln-mz .hd b{display:block;font-size:16px;color:var(--hd);} .ln-mz .hd small{font-size:13px;font-weight:700;color:var(--mu);}",
".ln-mz .txt{background:#FBF3E2;border-radius:16px;padding:12px 16px;margin:12px 0;} .ln-mz .ay{margin:0;font-family:\"Amiri Quran\",Amiri,serif;font-size:22px;line-height:2.4;color:var(--hd);}",
".ln-hw{display:inline-block;min-width:44px;background:#EAD9AE;color:transparent;border-radius:6px;user-select:none;-webkit-user-select:none;line-height:1.5;padding:0 4px;} .ln-hw.cur{outline:2px solid #B8924A;outline-offset:1px;background:#F1E2BC;} .ln-hw.ok{background:#E6F4EC;color:#23704A;}",
".ln-mzb{display:flex;gap:8px;flex-wrap:wrap;} .ln-mzb button{all:unset;cursor:pointer;font-family:\"Amiri Quran\",Amiri,serif;font-size:20px;line-height:1.7;padding:2px 14px;border-radius:12px;background:var(--card);border:1.5px solid var(--ln);color:var(--hd);} .ln-mzb button:hover{border-color:#1F6F7A;}",
".ln-mzb button.us{opacity:.3;cursor:default;} .ln-mzb button.bad{border-color:#B23A48;background:#FBEBED;animation:lnSh .3s;} @keyframes lnSh{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}",
".ln-mz .ft{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:12px;} .ln-mz .ft span{flex:1;font-size:13px;font-weight:800;color:var(--mu);min-width:140px;}",
".ln-mzr{display:flex;gap:10px;align-items:center;flex-wrap:wrap;background:#E6F4EC;border-radius:16px;padding:12px 16px;} .ln-mzr b{flex:1;min-width:200px;display:flex;gap:6px;align-items:center;color:#23704A;font-size:15px;}",
"body.dark-mode #hh-learn .ln-wring span{color:#7FD0C9;} body.dark-mode #hh-learn .ln-wring.dn span{color:#8FD9AE;} body.dark-mode #hh-learn .ln-wk .tg{background:rgba(31,111,122,.28);color:#9FDCD5;} body.dark-mode #hh-learn .ln-wl i,body.dark-mode #hh-learn .ln-ayl button{color:#9FDCD5;}",
"body.dark-mode #hh-learn .ln-ply .now{background:rgba(31,111,122,.22);} body.dark-mode #hh-learn .ln-seg button.on{color:#9FDCD5;} body.dark-mode #hh-learn .ln-wave i{background:#7FD0C9;} body.dark-mode #hh-learn .ln-off{background:#3A2E18;color:#E8D2A0;}",
"body.dark-mode #hh-learn .ln-mz .txt{background:#2A2016;} body.dark-mode #hh-learn .ln-hw{background:#5A4A2A;} body.dark-mode #hh-learn .ln-hw.cur{background:#6A5630;} body.dark-mode #hh-learn .ln-hw.ok{background:rgba(47,143,91,.25);color:#8FD9AE;}",
"body.dark-mode #hh-learn .ln-mzb button.bad{background:#3A1A20;} body.dark-mode #hh-learn .ln-mzr{background:rgba(47,143,91,.18);} body.dark-mode #hh-learn .ln-mzr b{color:#8FD9AE;}",
"@media (max-width:860px){ .ln-fl{height:auto;padding:16px;} .ln-fl svg{display:none;} .ln-fl .core{position:relative;left:auto;top:auto;transform:none;margin:0 auto 14px;width:170px;height:170px;} .ln-fl .core b{font-size:21px;} .ln-fl .pt{position:relative;left:auto !important;top:auto !important;transform:none !important;width:100%;display:grid;grid-template-columns:auto 1fr;gap:2px 10px;align-items:center;text-align:right;margin-bottom:8px;} .ln-fl .pt i{grid-row:span 2;margin:0;} .ln-mc{flex-direction:column;align-items:stretch;} .ln-mapw.scr .ln-fl{height:auto;min-height:0;} .ln-tools{grid-template-columns:minmax(0,1fr);} }",
"@media (max-width:760px){ .ln-mhd h1,.ln-wh h1{font-size:26px;} .ln-wk{grid-template-columns:minmax(0,1fr);justify-items:center;text-align:center;padding:18px;} .ln-wl{grid-template-columns:minmax(0,1fr);} .ln-wtabs{flex-wrap:nowrap;} .ln-wtabs button{flex:1 1 0;min-width:0;flex-direction:column;justify-content:center;gap:2px;padding:7px 4px;font-size:12.5px;line-height:1.4;text-align:center;} .ln-ply,.ln-mz{padding:12px;} .ln-ply .now{padding:12px;} .ln-ply .now .ay{font-size:22px;} .ln-wave{display:none;} .ln-ply .ctl{justify-content:center;} .ln-mapw.scr{padding:14px;} .ln-sur{flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px;scrollbar-width:thin;} .ln-sur button{flex-shrink:0;} }"
].join('\n');
function style(){ if($('hh-learn-css')) return; try{ if(!$('hh-learn-font')){ var l=document.createElement('link'); l.id='hh-learn-font'; l.rel='stylesheet'; l.href='https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Amiri:wght@400;700&display=swap'; document.head.appendChild(l); } }catch(e){} var s=document.createElement('style'); s.id='hh-learn-css'; s.textContent=CSS; document.head.appendChild(s); }
window._hhLn=function(){ return {V:V,ST:ST}; };
})();
