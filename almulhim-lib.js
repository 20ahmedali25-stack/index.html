/* ============================================================
   المُلهم التعليمي، «تعلّم»: مكتبة المؤلفين (zzzzzzcy)
   مجلد لكل مؤلف، وصفحة لكل كتاب بكل الخدمات: الخريطة، المحطات، الاختبار مع «لماذا؟»،
   المواقف، الإضاءات، المصطلحات، لوحة الصف، الشهادة، الأوضاع الثلاثة،
   واسأل المكتبة، ودفتر الإضاءات، والروابط بين الكتب، وشهادة المسار
   ============================================================ */
(function(){
'use strict';
if(window._hhLib) return;
/* ═══ أدوات ═══ */
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function $(id){ return document.getElementById(id); }
function toastX(m,k){ try{ if(typeof toast==='function') toast(m,k||'info'); }catch(e){} }
function me(){ try{ return (typeof currentUser!=='undefined'&&currentUser)||(window.firebase&&firebase.auth&&firebase.auth().currentUser)||null; }catch(e){ return null; } }
function db(){ try{ return window.firebase&&firebase.firestore?firebase.firestore():null; }catch(e){ return null; } }
function seed(s){ var h=2166136261; s=String(s); for(var i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); } return function(){ h^=h<<13; h^=h>>>17; h^=h<<5; return ((h>>>0)%100000)/100000; }; }
function shuf(a,key){ var r=seed(key==null?Math.random():key), b=a.slice(); for(var i=b.length-1;i>0;i--){ var j=Math.floor(r()*(i+1)); var t=b[i]; b[i]=b[j]; b[j]=t; } return b; }
function norm(s){ return String(s||'').replace(/[ً-ْـ]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي'); }
function isTeacher(){ try{ if(typeof hhIsAdmin==='function'&&hhIsAdmin()) return true; }catch(e){} return window._hhMyRole==='teacher'||window._hhMyRole==='admin'; }
var P={book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h7M8 11h5"/>',play:'<path d="M7 4l13 8-13 8z" fill="currentColor" stroke="none"/>',x:'<path d="M18 6L6 18M6 6l12 12"/>',next:'<path d="M15 5l-7 7 7 7"/>',back:'<path d="M9 5l7 7-7 7"/>',
 eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',check:'<path d="M20 6 9 17l-5-5"/>',q:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4M12 17h.01"/>',
 map:'<circle cx="12" cy="12" r="9"/><path d="M15 9l-2 6-4 2 2-6z"/>',flag:'<path d="M5 21V4h11l-2 4 2 4H5"/>',hand:'<path d="M7 11V6a1.5 1.5 0 0 1 3 0v4M10 9V4.5a1.5 1.5 0 0 1 3 0V10M13 9V5.5a1.5 1.5 0 0 1 3 0V12M16 10.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-1a6 6 0 0 1-5.2-3L4 15.5"/>',
 bulb:'<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14a5 5 0 0 1 6 5"/>',
 tv:'<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',badge:'<circle cx="12" cy="9" r="5"/><path d="M9 13l-1 8 4-2 4 2-1-8"/>',tag:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',print:'<path d="M6 9V3h12v6M6 18H4v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6h-2M8 14h8v7H8z"/>',refresh:'<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',
 star:'<path d="M12 3l2.8 5.9 6.2.9-4.5 4.4 1 6.3L12 17.6 6.5 20.5l1-6.3L3 9.8l6.2-.9z" fill="currentColor" stroke="none"/>',save:'<path d="M6 3h12v18l-6-4-6 4z"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
 full:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',cap:'<path d="M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6"/>',plus:'<path d="M12 5v14M5 12h14"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7"/>',trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'};
function sv(k,s,w){ return '<svg width="'+(s||18)+'" height="'+(s||18)+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||1.9)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(P[k]||'')+'</svg>'; }
function X(){ return window.HH_LIBX||{authors:[],books:{},cats:{}}; }
function BM(id){ return X().books[id]; }
function AU(id){ return X().authors.filter(function(a){ return a.id===id; })[0]; }
function BC(id){ return (window.HH_LIB||{})[id]; }
function ordN(i){ return ['الأول','الثاني','الثالث','الرابع','الخامس','السادس','السابع','الثامن','التاسع','العاشر','الحادي عشر','الثاني عشر'][i]||String(i+1); }
function nBooks(n){ return n===1?'كتاب واحد':n===2?'كتابان':n<=10?n+' كتب':n+' كتاباً'; }

/* ═══ تحميل محتوى الكتاب عند الطلب ═══ */
var LOAD={};
function need(id,cb){ if(BC(id)){ cb(); return; } var m=BM(id); if(!m||!m.file){ cb(); return; }
  if(LOAD[id]){ LOAD[id].push(cb); return; } LOAD[id]=[cb];
  var s=document.createElement('script'); s.src=m.file+'?v='+(X().v||''); s.charset='utf-8'; s.onload=function(){ var L=LOAD[id]; delete LOAD[id]; L.forEach(function(f){ try{ f(); }catch(e){ console.warn(e); } }); };
  s.onerror=function(){ delete LOAD[id]; toastX('تعذّر تحميل الكتاب، تحقق من الاتصال','error'); }; document.head.appendChild(s); }

/* ═══ الحالة ═══ */
var V={v:'home',aid:'',bid:'',ci:0,si:0,mode:'self',a:{},gq:'',q:''};
var ST={};
function sk(id){ return 'hh_lib_'+id; }
function st(id){ if(ST[id]) return ST[id]; var s=null; try{ s=JSON.parse(localStorage.getItem(sk(id))||'null'); }catch(e){} s=s||{}; ['read','quiz','sc'].forEach(function(k){ if(!s[k]) s[k]={}; }); ST[id]=s;
  var u=me(), d=db(); if(u&&u.uid&&d&&!s._r){ s._r=1; d.collection('program_progress').doc(u.uid).get().then(function(x){ var r=x&&x.exists&&(x.data()||{})['lib_'+id]; if(r&&(r.t||0)>(s.t||0)){ ['read','quiz','sc'].forEach(function(k){ if(!r[k]) r[k]={}; }); r._r=1; ST[id]=r; try{ localStorage.setItem(sk(id),JSON.stringify(r)); }catch(e){} if(host()&&V.bid===id) render(); } }).catch(function(){}); }
  return s; }
var _t={};
function save(id){ var s=st(id); s.t=Date.now(); try{ localStorage.setItem(sk(id),JSON.stringify(s)); }catch(e){}
  clearTimeout(_t[id]); _t[id]=setTimeout(function(){ var u=me(), d=db(); if(!u||!u.uid||!d) return; var o={}; var c=JSON.parse(JSON.stringify(s)); delete c._r; o['lib_'+id]=c; try{ d.collection('program_progress').doc(u.uid).set(o,{merge:true}).catch(function(){}); }catch(e){} },1500);
  var b=BC(id); if(b) board(id,b.title,pct(id),passN(id),b.chapters.length,s.quiz); }
function chP(id,ci){ var b=BC(id), c=b.chapters[ci], s=st(id), n=c.sections.length+1, r=0; c.sections.forEach(function(_,i){ if(s.read[c.k+'-'+i]) r++; }); if(s.quiz[c.k]!=null) r++; return Math.round(r/n*100); }
function pct(id){ var b=BC(id), s=st(id); if(!b){ return s.p||0; } var t=0; b.chapters.forEach(function(_,i){ t+=chP(id,i); }); var p=Math.round(t/b.chapters.length); if(s.p!==p){ s.p=p; } return p; }
function passN(id){ var b=BC(id), s=st(id); if(!b) return 0; return b.chapters.filter(function(c){ return (s.quiz[c.k]||0)>=70; }).length; }

/* لوحة الصف: ملخص تقدم الطالب يقرؤه معلمه (learn_progress/{uid}) */
var _bq={}, _bt=null;
function board(id,title,p,pass,tot,q){ _bq[id]={t:Date.now(),title:title,pct:p,pass:pass,tot:tot,q:q||{}}; clearTimeout(_bt); _bt=setTimeout(function(){ var u=me(), d=db(); if(!u||!u.uid||!d) return; var o={name:u.displayName||'',at:Date.now(),books:_bq}; _bq={}; try{ d.collection('learn_progress').doc(u.uid).set(o,{merge:true}).catch(function(){}); }catch(e){} },2500); }
window.hhLearnBoardPush=board;

/* ═══ الفتح ═══ */
function host(){ return $('hh-learn'); }
function ensureHost(cb){ if(!host()){ if(typeof window.hhLearnOpen==='function') hhLearnOpen(); else return; } style(); cb(); }
function go(v,o){ V.v=v; V.a={}; if(o) Object.keys(o).forEach(function(k){ V[k]=o[k]; }); render(); var h=host(); if(h) h.scrollTop=0; }
window.hhLibAuthor=function(aid){ ensureHost(function(){ go('author',{aid:aid}); }); };
window.hhLibBook=function(bid,tab){ var m=BM(bid); if(m&&m.ext){ try{ (new Function(m.ext))(); }catch(e){} return; } ensureHost(function(){ V.v='load'; render(); need(bid,function(){ go('book',{bid:bid,aid:m?m.aid:V.aid,tab:tab||'map'}); }); }); };
window.hhLibGo=function(v,a,b){ if(v==='st') need(V.bid,function(){ go('st',{ci:a||0,si:b||0}); }); else if(v==='quiz') startQuiz(a); else if(v==='book') go('book',{tab:a||V.tab||'map'}); else if(v==='author') go('author',{aid:a||V.aid}); else if(v==='notes') go('notes'); else if(v==='ask') go('ask'); else if(v==='board') go('board',{bid:a||V.bid}); else if(v==='pcert') go('pcert',{aid:a||V.aid}); else go(v); };
window.hhLibTab=function(t){ V.tab=t; V.a={}; render(); };
window.hhLibMode=function(m){ if(m==='live'){ liveDlg(); return; } V.mode=m; render(); };
function render(){ var h=host(); if(!h) return; var scr=V.mode==='screen'&&(V.v==='st'||V.v==='quiz');
  h.className='ln ln2 lb'+(scr?' ln2-stg':''); document.body.classList.toggle('ln-stage',scr);
  var m=V.bid?BM(V.bid):null; h.style.setProperty('--t',m&&m.k||'#1F6F7A'); h.style.setProperty('--t1',m&&m.k1||'#E7F2F1'); h.style.setProperty('--t2',m&&m.k2||'#CFE6E4');
  h.innerHTML=V.v==='load'?'<div class="l2-wrap"><div class="lb-load"><i></i>جارٍ فتح الكتاب</div></div>':V.v==='author'?vAuthor():V.v==='book'?vBook():V.v==='st'?vSt():V.v==='quiz'?vQuiz():V.v==='notes'?vNotes():V.v==='ask'?vAsk():V.v==='board'?vBoard():V.v==='pcert'?vPcert():V.v==='cert'?vCert():vAuthor();
  if(V.v==='st') markRead();
  if(V.v==='book'&&V.tab==='map') setTimeout(layMap,30);
  var q=$('lb-gq'); if(q){ q.oninput=function(){ V.gq=q.value; var L=$('lb-gl'); if(L) L.innerHTML=glossList(); }; }
  var aq=$('lb-aq'); if(aq){ aq.onkeydown=function(e){ if(e.key==='Enter'){ e.preventDefault(); hhLibAsk(aq.value); } }; }
  if(V.v==='board') boardLoad(); }
function crumbs(L){ return '<nav class="l2-cr" aria-label="مسار التنقل">'+L.map(function(x,i){ return i<L.length-1?'<button type="button" onclick="'+x[1]+'">'+esc(x[0])+'</button><span>›</span>':'<b>'+esc(x[0])+'</b>'; }).join('')+'</nav>'; }
function cAuthor(a){ return [['تعلّم',"hhLnGo('home')"],[a?a.name:'المكتبة',a?"hhLibAuthor('"+a.id+"')":"hhLnGo('home')"]]; }
function cover(m,big){ return '<div class="lb-cov'+(big?' big':'')+'" style="--c:'+m.c+(m.ct?';--ct:'+m.ct:'')+'"><b>'+esc(m.cv||m.title)+'</b><small>'+esc(m.author)+'</small></div>'; }

/* ═══ الصفحة الأولى في «تعلّم»: الجيل الصاعد، ثم المؤلفون، ثم البرامج الموضوعية ═══ */
var HF='all';
window.hhLibCat=function(c){ HF=c; var g=$('lb-ag'); if(g) g.innerHTML=authorsGrid(); document.querySelectorAll('#lb-cats button').forEach(function(b){ b.classList.toggle('on',b.getAttribute('data-c')===c); b.setAttribute('aria-pressed',b.getAttribute('data-c')===c); }); };
window.hhLibFind=function(q){ V.q=q; var g=$('lb-ag'); if(g) g.innerHTML=authorsGrid(); };
function bookPct(id){ var m=BM(id); if(m&&m.pct){ try{ return (new Function('return '+m.pct))()||0; }catch(e){ return 0; } } return st(id).p||0; }
function authorsGrid(){ var x=X(), q=norm(V.q||'').trim();
  var L=x.authors.filter(function(a){ return !a.feat; }).filter(function(a){ var bs=a.books.map(BM).filter(Boolean); return (HF==='all'||bs.some(function(b){ return b.cat===HF; }))&&(!q||norm(a.name+' '+bs.map(function(b){ return b.title+' '+(b.sub||''); }).join(' ')).indexOf(q)>-1); });
  return L.map(function(a){ var bs=a.books.map(BM).filter(Boolean), cats=[]; bs.forEach(function(b){ if(cats.indexOf(b.cat)<0) cats.push(b.cat); });
    return '<button type="button" class="lb-fd" style="--k:'+a.k+'" onclick="hhLibAuthor(\''+a.id+'\')"><span class="h"><span class="av">'+esc(a.ini)+'</span><span><b>'+esc(a.name)+'</b>'+(a.note?'<small>'+esc(a.note)+'</small>':'')+'</span></span>'
     +'<span class="stk">'+bs.slice(0,5).map(function(b){ return '<i style="--c:'+b.c+'"></i>'; }).join('')+'</span>'
     +'<span class="tg">'+cats.map(function(c){ return '<em>'+esc(x.cats[c])+'</em>'; }).join('')+'<span class="n">'+nBooks(bs.length)+'</span></span></button>'; }).join('')
   +(L.length?'':'<p class="lb-emp">لا نتائج، جرّب كلمة أخرى</p>'); }
window.hhLibHomeHTML=function(){ var x=X(); if(!x.authors.length) return '';
  var f=x.authors.filter(function(a){ return a.feat; })[0], fb=f&&BM(f.books[0]);
  var feat=fb?'<div class="lb-feat" style="--c:'+fb.c+'"><div class="cv">'+cover(fb,1)+'</div><div class="tx"><em>'+esc(f.feat)+'</em><h2>'+esc(fb.title)+'</h2><p>'+esc(fb.lead||'')+'</p><span class="by">'+esc(fb.author)+(fb.pub?'، '+esc(fb.pub):'')+'</span>'
    +(fb.chs?'<div class="tp">'+fb.chs.slice(0,5).map(function(t){ return '<span>'+esc(t)+'</span>'; }).join('')+(fb.chs.length>5?'<span>+'+(fb.chs.length-5)+'</span>':'')+'</div>':'')+'</div>'
    +'<button type="button" class="go" onclick="hhLibBook(\''+fb.id+'\')">'+sv('play',15)+(bookPct(fb.id)?'تابع الرحلة':'ابدأ الرحلة')+'</button></div>':'';
  var cats=[]; x.authors.forEach(function(a){ a.books.forEach(function(id){ var b=BM(id); if(b&&cats.indexOf(b.cat)<0) cats.push(b.cat); }); });
  var tp=(x.topics||[]).map(function(t){ var p=bookPct(t.id); return '<button type="button" class="lb-tp" style="--k:'+t.k+'" onclick="'+t.ext+'"><span class="stk">'+t.covers.map(function(c){ return '<i style="--c:'+c+'"></i>'; }).join('')+'</span><span class="t"><b>'+esc(t.title)+'</b><small>'+esc(t.sub)+'</small></span><span class="p"><i style="width:'+p+'%"></i></span></button>'; }).join('');
  var nt=notes().length;
  return feat+'<div class="lh-fb lb-hb"><h2>مكتبة المؤلفين</h2><label class="lb-srch">'+sv('search',16)+'<input placeholder="ابحث عن مؤلف أو كتاب" aria-label="ابحث في المكتبة" oninput="hhLibFind(this.value)" value="'+esc(V.q||'')+'"></label>'
   +'<div class="ch" id="lb-cats" role="group" aria-label="تصفية بالمجال">'+[['all','الكل']].concat(cats.map(function(c){ return [c,x.cats[c]]; })).map(function(c){ return '<button type="button" data-c="'+c[0]+'" class="'+(HF===c[0]?'on':'')+'" aria-pressed="'+(HF===c[0])+'" onclick="hhLibCat(\''+c[0]+'\')">'+esc(c[1])+'</button>'; }).join('')+'</div></div>'
   +'<div class="lb-ag" id="lb-ag">'+authorsGrid()+'</div>'
   +(tp?'<div class="lh-fb"><h2>برامج موضوعية</h2></div><div class="lb-tps">'+tp+'</div>':'')
   +'<div class="lb-tools"><button type="button" onclick="hhLibGo(\'ask\')">'+sv('search',18)+'<span><b>اسأل المكتبة</b><small>ابحث في كل الكتب عن جواب سؤالك</small></span></button><button type="button" onclick="hhLibGo(\'notes\')">'+sv('bulb',18)+'<span><b>دفتر الإضاءات</b><small>'+(nt?nt+' عبارة حفظتها':'احفظ العبارات التي تعجبك من كل الكتب')+'</small></span></button>'+(isTeacher()?'<button type="button" onclick="hhLibGo(\'board\',\'\')">'+sv('users',18)+'<span><b>لوحة الصف</b><small>تقدم طلابك في كل برامج «تعلّم»</small></span></button>':'')+'</div>'; };

/* ═══ ملف المؤلف ═══ */
function vAuthor(){ var a=AU(V.aid); if(!a) return '<div class="l2-wrap"><p class="lb-emp">المؤلف غير موجود</p></div>'; var x=X(), bs=a.books.map(BM).filter(Boolean), cats=[]; bs.forEach(function(b){ if(cats.indexOf(b.cat)<0) cats.push(b.cat); });
  var F=V.a.f||'all', shown=bs.filter(function(b){ return F==='all'||b.cat===F; });
  var h='<div class="l2-wrap">'+crumbs([['تعلّم',"hhLnGo('home')"],[a.name]])
   +'<div class="lb-ah" style="--k:'+a.k+'"><span class="av">'+esc(a.ini)+'</span><div class="tx"><em>ملف المؤلف</em><h1>'+esc(a.name)+'</h1>'+(a.bio?'<p>'+esc(a.bio)+'</p>':'')+(a.facts&&a.facts.length?'<div class="fx">'+a.facts.map(function(f){ return '<span>'+esc(f)+'</span>'; }).join('')+'</div>':'')+(a.src?'<small class="sr">'+esc(a.src)+'</small>':'')+'</div>'
   +'<div class="kp"><div><b>'+bs.length+'</b><span>'+(bs.length===1?'كتاب في المنصة':bs.length===2?'كتابان في المنصة':'كتب في المنصة')+'</span></div>'+cats.slice(0,2).map(function(c){ return '<div><b>'+bs.filter(function(b){ return b.cat===c; }).length+'</b><span>'+esc(x.cats[c])+'</span></div>'; }).join('')+'</div></div>';
  if(a.ask&&a.ask.length) h+='<div class="lb-ask"><h3>من أين أبدأ؟</h3><p>اختر ما يشغلك الآن، ونرشّح لك الكتاب المناسب.</p><div class="chips">'+a.ask.map(function(q,i){ return '<button type="button" class="'+(V.a.ask===i?'on':'')+'" onclick="hhLibAsk2('+i+')">'+esc(q[0])+'</button>'; }).join('')+'</div>'
    +(V.a.ask!=null?(function(){ var q=a.ask[V.a.ask], b=BM(q[1]); return '<div class="ans"><span>نرشّح لك: <b>«'+esc(b.title)+'»</b>'+(b.sub?'، '+esc(b.sub):'')+'</span><button type="button" class="l2-b p" onclick="hhLibBook(\''+b.id+'\')">افتح الكتاب</button></div>'; })():'')+'</div>';
  h+='<div class="l2-sh"><h2>الكتب</h2>'+(cats.length>1?'<div class="lh-fb" style="margin:0"><div class="ch">'+[['all','الكل']].concat(cats.map(function(c){ return [c,x.cats[c]]; })).map(function(c){ return '<button type="button" class="'+(F===c[0]?'on':'')+'" onclick="hhLibAF(\''+c[0]+'\')">'+esc(c[1])+'</button>'; }).join('')+'</div></div>':'')+'</div>'
   +'<div class="lb-shelf">'+shown.map(function(b){ var p=bookPct(b.id); return '<button type="button" class="lb-bk" style="--c1:'+(b.k1||'#F3EFE6')+'" onclick="hhLibBook(\''+b.id+'\')"><span class="cv">'+(b.series?'<em>'+esc(b.series)+'</em>':'')+cover(b)+'</span><span class="bd"><b>'+esc(b.title)+'</b><small>'+esc(b.sub||'')+'</small><span class="mt">'+(p?'<span>تقدمك</span><i><s style="width:'+p+'%"></s></i><span>'+p+'%</span>':'<span class="nw">ابدأ الكتاب</span>')+(b.chn?'<span class="cn">'+b.chn+' محطات</span>':'')+'</span></span></button>'; }).join('')+'</div>';
  if(a.path&&a.path.length){ var done=a.path.filter(function(id){ var b=BM(id); return b&&b.chn&&passOf(id)>=b.chn; }).length;
    h+='<div class="l2-sh"><h2>'+esc(a.pathT||'مسار مقترح')+'</h2><small>'+done+' من '+a.path.length+' أتممتها</small></div><div class="lb-path">'+a.path.map(function(id,i){ var b=BM(id), ok=b&&b.chn&&passOf(id)>=b.chn; return '<button type="button" class="'+(ok?'dn':'')+'" onclick="hhLibBook(\''+id+'\')"><i>'+(ok?sv('check',13,3):i+1)+'</i><b>'+esc(b.title)+'</b><small>'+esc((a.pathW||[])[i]||'')+'</small></button>'; }).join('')+'</div>'
     +(a.pcert?'<div class="l2-qz"><div><b>'+sv('badge',18)+esc(a.pcert)+'</b><small>تُمنح بعد اجتياز اختبارات كتب المسار كلها بنسبة 70% فأكثر</small></div><button type="button" class="l2-b'+(done===a.path.length?' p':'')+'" onclick="hhLibGo(\'pcert\',\''+a.id+'\')">'+(done===a.path.length?'اطبع الشهادة':'تفاصيل الشهادة')+'</button></div>':''); }
  h+='<div class="lb-tools">'+(a.books.length>1?'<button type="button" onclick="hhLibAskIn(\''+a.id+'\')">'+sv('search',18)+'<span><b>اسأل كتب '+esc(a.short||a.name)+'</b><small>جواب سؤالك من كل كتبه، مع الصفحة</small></span></button>':'')+'<button type="button" onclick="hhLibGo(\'notes\')">'+sv('bulb',18)+'<span><b>دفتر الإضاءات</b><small>عباراتك المحفوظة من كل الكتب</small></span></button></div>';
  return h+'</div>'; }
function passOf(id){ var s=st(id), n=0; Object.keys(s.quiz||{}).forEach(function(k){ if(s.quiz[k]>=70) n++; }); return n; }
window.hhLibAF=function(c){ V.a.f=c; render(); };
window.hhLibAsk2=function(i){ V.a.ask=V.a.ask===i?null:i; render(); };

/* ═══ صفحة الكتاب ═══ */
var TABS=[['map','map','خريطة الكتاب','الكتاب كله في نظرة'],['st','flag','المحطات','فصول الكتاب بالترتيب'],['quiz','q','الاختبارات','مع «لماذا؟» بعد كل إجابة'],['scene','hand','ماذا تفعل لو؟','مواقف من الواقع'],['lit','bulb','الإضاءات','عبارات الكتاب المضيئة'],['gloss','tag','المصطلحات','بتعريف الكتاب'],['board','users','لوحة الصف','تقدم الطلاب والمتدربين'],['cert','badge','الشهادة','بعد اجتياز المحطات']];
function vBook(){ var b=BC(V.bid), m=BM(V.bid), a=AU(m.aid); if(!b) return '<div class="l2-wrap"><p class="lb-emp">الكتاب غير محمّل</p></div>';
  var p=pct(V.bid), next=0; for(var i=0;i<b.chapters.length;i++){ if(chP(V.bid,i)<100){ next=i; break; } }
  var s=st(V.bid), cont=s.last&&b.chapters[s.last.ci]?"hhLibGo('st',"+s.last.ci+","+s.last.si+")":"hhLibGo('st',"+next+",0)";
  var T=TABS.filter(function(t){ if(t[0]==='scene') return b.chapters.some(function(c){ return c.scene; }); if(t[0]==='gloss') return (b.concepts||[]).length; if(t[0]==='lit') return (b.highlights||[]).length; if(t[0]==='board') return isTeacher(); return true; });
  if(!T.some(function(t){ return t[0]===V.tab; })) V.tab='map';
  var nq=0; b.chapters.forEach(function(c){ nq+=(c.quiz||[]).length; });
  var h='<div class="l2-wrap">'+crumbs(cAuthor(a).concat([[b.title]]))
   +'<div class="lb-bh"><div class="cv">'+cover(m,1)+'</div><div class="tx"><em>'+esc(m.series||(a?a.name:''))+'</em><h1>'+esc(b.title)+'</h1>'+(b.sub?'<p class="sb">'+esc(b.sub)+'</p>':'')+'<p>'+esc(b.lead||'')+'</p>'
   +'<div class="st"><span><b>'+b.chapters.length+'</b>محطات</span><span><b>'+nq+'</b>سؤالاً</span>'+((b.highlights||[]).length?'<span><b>'+b.highlights.length+'</b>إضاءة</span>':'')+((b.concepts||[]).length?'<span><b>'+b.concepts.length+'</b>مصطلحاً</span>':'')+'</div>'
   +'<div class="bt"><button type="button" class="l2-b p" onclick="'+cont+'">'+sv('play',15)+(p?'تابع من حيث وقفت':'ابدأ المحطة الأولى')+'</button></div>'+modeSeg()+'</div><div class="pr"><div class="ring" style="--p:'+p+'"><b>'+p+'%</b></div><small>تقدمك</small></div></div>'
   +'<div class="lb-svc" role="tablist">'+T.map(function(t){ return '<button type="button" role="tab" aria-selected="'+(V.tab===t[0])+'" class="'+(V.tab===t[0]?'on':'')+'" onclick="hhLibTab(\''+t[0]+'\')"><i>'+sv(t[1],19)+'</i><b>'+t[2]+'</b><small>'+t[3]+'</small></button>'; }).join('')+'</div>'
   +'<div class="lb-pane">'+pane(b,m)+'</div>'
   +'<p class="l2-src">المصدر: «'+esc(b.title)+'»، '+esc(b.author)+(b.translator?'، ترجمة '+esc(b.translator):'')+(b.publisher?'، '+esc(b.publisher):'')+(b.year?'، '+esc(b.year):'')+'. النصوص بين «» منقولة من الكتاب بأرقام صفحاتها، والباقي تلخيص.</p></div>';
  return h; }
function modeSeg(){ return '<div class="l2-mode" role="group" aria-label="طريقة العرض">'+[['self','cap','أتعلّم بنفسي'],['screen','tv','أعرض على الصف'],['live','phone','مع دخول الطلاب']].map(function(m){ return '<button type="button" class="'+(V.mode===m[0]?'on':'')+'" aria-pressed="'+(V.mode===m[0])+'" onclick="hhLibMode(\''+m[0]+'\')">'+sv(m[1],15)+m[2]+'</button>'; }).join('')+'</div>'; }
function pane(b,m){ var t=V.tab, s=st(V.bid);
  if(t==='map') return '<div class="lb-map" id="lb-map"><svg id="lb-ms"></svg><div class="core"><div><b>'+esc(m.cv||b.title)+'</b><small>'+b.chapters.length+' محطات</small></div></div></div><div id="lb-mc">'+mapCard(0)+'</div>';
  if(t==='st') return '<div class="lb-chs">'+b.chapters.map(function(c,i){ var p=chP(V.bid,i), q=s.quiz[c.k]; return '<button type="button" class="'+(p>=100?'dn':'')+'" onclick="hhLibGo(\'st\','+i+',0)"><i>'+(i+1)+'</i><span><b>'+esc(c.t)+'</b><small>'+esc(c.q||'')+'</small></span><span class="pr"><s style="width:'+p+'%"></s></span>'+(q!=null?'<em class="'+(q>=70?'ok':'')+'">'+q+'%</em>':'')+'</button>'; }).join('')+'</div>';
  if(t==='quiz') return '<div class="lb-qs">'+b.chapters.map(function(c,i){ var q=s.quiz[c.k]; return '<button type="button" onclick="hhLibGo(\'quiz\','+i+')"><b>'+esc(c.t)+'</b><small>'+(c.quiz||[]).length+' أسئلة'+(q!=null?'، أفضل نتيجة '+q+'%':'')+'</small><span class="l2-b'+(q>=70?' ok':' p')+'">'+(q>=70?sv('check',14,3)+'اجتزته':q!=null?'أعد':'ابدأ')+'</span></button>'; }).join('')+'</div>';
  if(t==='scene'){ var L=[]; b.chapters.forEach(function(c,i){ if(c.scene) L.push([c,i]); }); return '<div class="lb-scs">'+L.map(function(x){ return sceneHTML(x[0],x[1]); }).join('')+'</div>'; }
  if(t==='lit') return '<div class="lb-lit">'+(b.highlights||[]).map(function(x,i){ var on=hasNote(V.bid,x.x); return '<figure><span class="ic">'+sv('bulb',20)+'</span><blockquote>«'+esc(x.x)+'»</blockquote><figcaption>'+(x.pg?'صفحة '+x.pg:'')+'<button type="button" class="'+(on?'on':'')+'" onclick="hhLibNote('+i+')" aria-pressed="'+on+'">'+sv(on?'check':'save',14,2.2)+(on?'في دفتري':'احفظ في دفتري')+'</button></figcaption></figure>'; }).join('')+'</div>';
  if(t==='gloss') return '<label class="l2-gs">'+sv('search',18)+'<input id="lb-gq" type="search" placeholder="ابحث عن مصطلح" value="'+esc(V.gq||'')+'" aria-label="ابحث في المصطلحات"></label><div class="l2-gl" id="lb-gl">'+glossList()+'</div>';
  if(t==='board') return '<div class="lb-bd-in"><p>تابع تقدم طلابك في هذا الكتاب، محطة محطة.</p><button type="button" class="l2-b p" onclick="hhLibGo(\'board\',\''+V.bid+'\')">'+sv('users',16)+'افتح لوحة الصف</button></div>';
  if(t==='cert'){ var n=b.chapters.length, ps=passN(V.bid); return '<div class="lb-ct"><div class="ring big" style="--p:'+Math.round(ps/n*100)+'"><b>'+ps+'/'+n+'</b></div><div><h3>'+(ps===n?'أتممت الكتاب':'تبقّى '+(n-ps)+' من اختبارات المحطات')+'</h3><p>اجتز اختبار كل محطة بنسبة 70% فأكثر لتحصل على شهادة الإتمام.</p><button type="button" class="l2-b'+(ps===n?' p':'')+'" onclick="hhLibGo(\'cert\')">'+(ps===n?'اطبع الشهادة':'اعرض الشهادة')+'</button></div></div>'; }
  return ''; }
function mapCard(i){ var b=BC(V.bid), c=b.chapters[i]; if(!c) return ''; return '<div class="lb-mcard"><em>المحطة '+(i+1)+' من '+b.chapters.length+'</em><b>'+esc(c.t)+'</b>'+(c.essence?'<p>'+esc(c.essence)+'</p>':'')+((c.kw||[]).length?'<ul>'+c.kw.map(function(k){ return '<li>'+esc(k)+'</li>'; }).join('')+'</ul>':'')+'<button type="button" class="l2-b" onclick="hhLibGo(\'st\','+i+',0)">ادخل المحطة'+sv('next',14,2.4)+'</button></div>'; }
function layMap(){ var c=$('lb-map'), b=BC(V.bid); if(!c||!b) return; c.querySelectorAll('.nd').forEach(function(x){ x.remove(); }); var wide=innerWidth>900, W=c.offsetWidth, H=c.offsetHeight||460, cx=W/2, cy=H/2, n=b.chapters.length, s='';
  b.chapters.forEach(function(ch,i){ var a=-Math.PI/2+i*2*Math.PI/n, rx=Math.min(W*.39,380), ry=Math.min(H*.4,190), x=cx+Math.cos(a)*rx, y=cy+Math.sin(a)*ry;
    var e=document.createElement('button'); e.type='button'; e.className='nd'+(i===(V.a.mi||0)?' on':'')+(chP(V.bid,i)>=100?' dn':''); if(wide){ e.style.left=x+'px'; e.style.top=y+'px'; s+='<path d="M'+cx+' '+cy+' Q'+(cx+Math.cos(a+.3)*rx*.55)+' '+(cy+Math.sin(a+.3)*ry*.55)+' '+x+' '+y+'" fill="none" stroke="var(--t2)" stroke-width="2.5" stroke-linecap="round"/>'; }
    e.innerHTML='<em>'+(i+1)+'</em>'+esc(ch.t); e.onclick=function(){ V.a.mi=i; c.querySelectorAll('.nd').forEach(function(z){ z.classList.toggle('on',z===e); }); var mc=$('lb-mc'); if(mc) mc.innerHTML=mapCard(i); }; c.appendChild(e); });
  var sg=$('lb-ms'); if(sg) sg.innerHTML=s; }
addEventListener('resize',function(){ if(V.v==='book'&&V.tab==='map') layMap(); });

/* ═══ القراءة ═══ */
function markRead(){ var c=BC(V.bid).chapters[V.ci]; if(V.si<c.sections.length){ var s=st(V.bid); s.last={ci:V.ci,si:V.si}; s.read[c.k+'-'+V.si]=1; save(V.bid); } }
function hl(p,key){ var t=esc(p); if(key){ var k=esc(key); var i=t.indexOf(k); if(i>-1) t=t.slice(0,i)+'<mark>'+k+'</mark>'+t.slice(i+k.length); } return t; }
function vSt(){ var b=BC(V.bid), m=BM(V.bid), a=AU(m.aid), c=b.chapters[V.ci], S=c.sections, endp=V.si>=S.length, scr=V.mode==='screen', s=st(V.bid);
  var toc='<aside class="l2-toc"><h5>المحطة '+(V.ci+1)+'</h5>'+S.map(function(x,i){ return '<button type="button" class="'+(i===V.si?'on':'')+(s.read[c.k+'-'+i]?' dn':'')+'" onclick="hhLibSec('+i+')"><i>'+(s.read[c.k+'-'+i]&&i!==V.si?sv('check',12,3):i+1)+'</i>'+esc(x.t)+'</button>'; }).join('')
   +'<button type="button" class="'+(endp?'on':'')+(s.quiz[c.k]!=null?' dn':'')+'" onclick="hhLibSec('+S.length+')"><i>'+sv('q',13)+'</i>موقف واختبار</button></aside>';
  var body;
  if(!endp){ var x=S[V.si];
    body='<article class="l2-pg"><span class="ch">المحطة '+(V.ci+1)+'، '+esc(c.t)+'</span><h2>'+esc(x.t)+'</h2>'+(V.si===0&&c.q?'<p class="l2-cq">'+sv('q',16)+esc(c.q)+'</p>':'')
     +(x.key?'<blockquote class="l2-key">«'+esc(x.key)+'»<small>'+(x.pg?'صفحة '+x.pg:'من الكتاب')+'</small></blockquote>':'')
     +(x.p||[]).map(function(p){ return '<p class="l2-p">'+hl(p,x.key)+'</p>'; }).join('')
     +((x.items||[]).length?'<div class="l2-items">'+x.items.map(function(it,i){ var o=V.a['it'+i], has=it.x&&it.x!==it.h; return has?'<button type="button" class="it'+(o?' op':'')+'" aria-expanded="'+(!!o)+'" onclick="hhLibIt('+i+')"><span class="h"><i>'+(i+1)+'</i><b>'+esc(it.h)+'</b><em>'+sv(o?'x':'eye',14)+'</em></span>'+(o?'<span class="x">'+esc(it.x)+'</span>':'')+'</button>':'<div class="it pl"><span class="h"><i>'+(i+1)+'</i><b>'+esc(it.h||it.x)+'</b></span></div>'; }).join('')+'</div>':'')
     +(x.pg?'<div class="lb-pgf"><span>'+sv('book',12)+'صفحة '+x.pg+'</span></div>':'')+'</article>';
  } else body=chEnd(b,c);
  var nav='<div class="l2-nav"><button type="button" class="l2-b" onclick="hhLibSec('+(V.si-1)+')" '+(V.si===0&&V.ci===0?'disabled':'')+'>'+sv('back',15,2.4)+'السابق</button><span>'+(endp?'موقف واختبار':(V.si+1)+' من '+S.length)+'</span>'
   +(endp?(V.ci<b.chapters.length-1?'<button type="button" class="l2-b p" onclick="hhLibGo(\'st\','+(V.ci+1)+',0)">المحطة '+(V.ci+2)+sv('next',15,2.4)+'</button>':'<button type="button" class="l2-b p" onclick="hhLibTab(\'cert\');hhLibGo(\'book\',\'cert\')">الشهادة'+sv('next',15,2.4)+'</button>'):'<button type="button" class="l2-b p" onclick="hhLibSec('+(V.si+1)+')">التالي'+sv('next',15,2.4)+'</button>')+'</div>';
  var head=scr?'<div class="l2-stg"><button type="button" class="l2-ib" onclick="hhLibMode(\'self\')" aria-label="خروج من العرض">'+sv('x',18,2.4)+'</button><b>'+esc(c.t)+'</b><button type="button" class="l2-ib" onclick="hhLn2Full&&hhLn2Full()" aria-label="ملء الشاشة">'+sv('full',18)+'</button></div>':crumbs(cAuthor(a).concat([[b.title,"hhLibGo('book','st')"],['المحطة '+(V.ci+1)]]));
  var n=b.chapters.length;
  return '<div class="l2-wrap'+(scr?' big':'')+'">'+head+'<div class="l2-chbar" style="grid-template-columns:repeat('+n+',minmax(0,1fr))">'+b.chapters.map(function(x,i){ return '<button type="button" class="'+(i===V.ci?'on':'')+(chP(V.bid,i)>=100?' dn':'')+'" onclick="hhLibGo(\'st\','+i+',0)" title="'+esc(x.t)+'"><i><s style="width:'+chP(V.bid,i)+'%"></s></i><span>'+(n>8?(i+1):esc(x.t))+'</span></button>'; }).join('')+'</div>'
   +'<div class="l2-rd">'+(scr?'':toc)+'<div class="l2-main">'+body+nav+'</div></div></div>'; }
window.hhLibSec=function(i){ var c=BC(V.bid).chapters[V.ci]; if(i<0){ if(V.ci>0){ var p=BC(V.bid).chapters[V.ci-1]; go('st',{ci:V.ci-1,si:p.sections.length}); } return; } V.si=Math.min(i,c.sections.length); V.a={}; render(); var h=host(); if(h) h.scrollTop=0; };
window.hhLibIt=function(i){ V.a['it'+i]=!V.a['it'+i]; var h=host(), y=h?h.scrollTop:0; render(); if(h) h.scrollTop=y; };
function sceneHTML(c,ci){ var sc=c.scene, ch=V.a['sc'+ci], best=0, ord=shuf(sc.opts.map(function(_,i){ return i; }),'sc'+V.bid+ci);
  return '<div class="lb-sc"><em>المحطة '+(ci+1)+'، '+esc(c.t)+'</em><b>'+esc(sc.t||'ماذا تفعل لو؟')+'</b><p>'+esc(sc.x)+'</p><div class="o">'+ord.map(function(i){ var k=ch==null?'':i===best?' ok':i===ch?' no':' off'; return '<button type="button" class="'+k+'" onclick="hhLibScene('+ci+','+i+')" '+(ch!=null?'disabled':'')+'>'+esc(sc.opts[i])+'</button>'; }).join('')+'</div>'
   +(ch!=null?'<div class="ex"><b>'+(ch===best?'أحسنت، هذا ما يقترحه الكتاب.':'يقترح الكتاب غير ذلك:')+'</b> «'+esc(sc.why)+'»'+(sc.pg?'<small>صفحة '+sc.pg+'</small>':'')+'</div>':'')+'</div>'; }
window.hhLibScene=function(ci,i){ V.a['sc'+ci]=i; var s=st(V.bid); s.sc[ci]=1; save(V.bid); var h=host(), y=h?h.scrollTop:0; render(); if(h) h.scrollTop=y; };
function related(c){ var L=(c.rel||[]).filter(function(r){ return BM(r.b); }); return L.length?'<h3 class="l2-h3">'+sv('link',17)+'للمزيد في المكتبة</h3><div class="lb-rel">'+L.map(function(r){ var m=BM(r.b); return '<button type="button" onclick="hhLibOpenAt(\''+r.b+'\','+r.ci+')"><i style="--c:'+m.c+'"></i><span><b>'+esc(r.t)+'</b><small>«'+esc(m.title)+'»، '+esc(m.author)+'</small></span></button>'; }).join('')+'</div>':''; }
window.hhLibOpenAt=function(bid,ci){ var m=BM(bid); if(m&&m.ext){ hhLibBook(bid); return; } need(bid,function(){ go('st',{bid:bid,aid:m.aid,ci:ci||0,si:0}); }); };
function chEnd(b,c){ var s=st(V.bid), best=s.quiz[c.k];
  return '<article class="l2-pg end"><span class="ch">المحطة '+(V.ci+1)+'، '+esc(c.t)+'</span><h2>موقف واختبار</h2>'+(c.scene?sceneHTML(c,V.ci):'')+related(c)
   +((c.quiz||[]).length?'<div class="l2-qz"><div><b>'+sv('badge',18)+'اختبار المحطة '+(V.ci+1)+'</b><small>'+c.quiz.length+' أسئلة من الكتاب'+(best!=null?'، أفضل نتيجة '+best+'%':'')+'</small></div><button type="button" class="l2-b p" onclick="hhLibGo(\'quiz\','+V.ci+')">'+(best!=null?'أعد الاختبار':'ابدأ الاختبار')+'</button></div>':'')+'</article>'; }

/* ═══ الاختبار ═══ */
function startQuiz(ci){ var c=BC(V.bid).chapters[ci]; V.qz={idx:shuf(c.quiz.map(function(_,i){ return i; })),i:0,ok:0,ch:null,ord:null}; go('quiz',{ci:ci,qz:V.qz}); }
function vQuiz(){ var b=BC(V.bid), c=b.chapters[V.ci], Q=V.qz, scr=V.mode==='screen';
  if(Q.i>=Q.idx.length){ var p=Math.round(Q.ok/Q.idx.length*100); if(!Q.sv){ Q.sv=1; var s=st(V.bid); if(p>(s.quiz[c.k]||-1)) s.quiz[c.k]=p; save(V.bid); }
    return '<div class="l2-wrap'+(scr?' big':'')+'"><div class="l2-res"><div class="ring big" style="--p:'+p+'"><b>'+p+'%</b></div><h2>'+(p>=70?'أحسنت! اجتزت المحطة '+(V.ci+1):'قاربت، راجع المحطة وحاول مرة أخرى')+'</h2><p>'+Q.ok+' من '+Q.idx.length+' إجابات صحيحة</p><div class="bt">'
     +(V.ci<b.chapters.length-1?'<button type="button" class="l2-b p" onclick="hhLibGo(\'st\','+(V.ci+1)+',0)">المحطة '+(V.ci+2)+sv('next',15,2.4)+'</button>':'<button type="button" class="l2-b p" onclick="hhLibGo(\'book\',\'cert\')">الشهادة</button>')+'<button type="button" class="l2-b" onclick="hhLibGo(\'quiz\','+V.ci+')">'+sv('refresh',15)+'أعد الاختبار</button><button type="button" class="l2-b" onclick="hhLibGo(\'st\','+V.ci+',0)">ارجع إلى المحطة</button></div></div></div>'; }
  var q=c.quiz[Q.idx[Q.i]]; if(!Q.ord) Q.ord=shuf(q.o.map(function(_,i){ return i; }));
  return '<div class="l2-wrap'+(scr?' big':'')+'"><div class="l2-qh"><button type="button" class="l2-ib" onclick="hhLibGo(\'st\','+V.ci+',0)" aria-label="خروج">'+sv('x',18,2.4)+'</button><b>اختبار المحطة '+(V.ci+1)+'، '+esc(c.t)+'</b><span>'+(Q.i+1)+' من '+Q.idx.length+'</span></div><div class="l2-qbar"><i style="width:'+Math.round(Q.i/Q.idx.length*100)+'%"></i></div>'
   +'<div class="l2-qq"><h2>'+esc(q.q)+'</h2><div class="l2-opts">'+Q.ord.map(function(i,j){ var k=Q.ch==null?'':i===0?' ok':i===Q.ch?' no':' off'; return '<button type="button" class="op'+k+'" onclick="hhLibQ('+i+')" '+(Q.ch!=null?'disabled':'')+'><span class="l">'+['أ','ب','ج','د'][j]+'</span><span>'+esc(q.o[i])+'</span></button>'; }).join('')+'</div>'
   +(Q.ch!=null?(q.why?'<div class="lb-why"><b>لماذا؟</b> «'+esc(q.why)+'»'+(q.pg?'<small>صفحة '+q.pg+'</small>':'')+'</div>':'')+'<div class="l2-nav"><span>'+(Q.ch===0?'إجابة صحيحة':'الإجابة الصحيحة هي المضيئة')+'</span><button type="button" class="l2-b p" onclick="hhLibQN()">'+(Q.i+1<Q.idx.length?'التالي':'النتيجة')+sv('next',15,2.4)+'</button></div>':'')+'</div></div>'; }
window.hhLibQ=function(i){ var Q=V.qz; if(!Q||Q.ch!=null) return; Q.ch=i; if(i===0) Q.ok++; render(); };
window.hhLibQN=function(){ var Q=V.qz; if(!Q) return; Q.i++; Q.ch=null; Q.ord=null; render(); var h=host(); if(h) h.scrollTop=0; };

/* ═══ المصطلحات ═══ */
function glossList(){ var b=BC(V.bid), T=norm(V.gq||'').trim().split(/\s+/).filter(Boolean).map(function(w){ return w.replace(/^ال/,'').replace(/(ه|ات|ون|ين|يه|ي)$/,''); }).filter(function(w){ return w.length>1; });
  var L=(b.concepts||[]).filter(function(c){ var h=norm(c.term+' '+c.def); return !T.length||T.every(function(w){ return h.indexOf(w)>-1; }); });
  return L.length?L.map(function(c){ return '<div class="gi"><b>'+esc(c.term)+'</b><p>'+esc(c.def)+'</p>'+(c.pg?'<small>صفحة '+c.pg+'</small>':'')+'</div>'; }).join(''):'<p class="l2-emp">لا مصطلح بهذا الاسم</p>'; }

/* ═══ دفتر الإضاءات ═══ */
function notes(){ try{ return JSON.parse(localStorage.getItem('hh_lib_notes')||'[]'); }catch(e){ return []; } }
function setNotes(L){ try{ localStorage.setItem('hh_lib_notes',JSON.stringify(L)); }catch(e){} }
function hasNote(bid,x){ return notes().some(function(n){ return n.b===bid&&n.x===x; }); }
window.hhLibNote=function(i){ var b=BC(V.bid), h=b.highlights[i], L=notes(), k=-1; L.forEach(function(n,j){ if(n.b===V.bid&&n.x===h.x) k=j; }); if(k>-1) L.splice(k,1); else { L.unshift({b:V.bid,x:h.x,pg:h.pg||0,t:Date.now()}); toastX('حُفظت في دفتر الإضاءات','success'); } setNotes(L); var hh=host(), y=hh?hh.scrollTop:0; render(); if(hh) hh.scrollTop=y; };
window.hhLibNoteDel=function(i){ var L=notes(); L.splice(i,1); setNotes(L); render(); };
function vNotes(){ var L=notes();
  return '<div class="l2-wrap">'+crumbs([['تعلّم',"hhLnGo('home')"],['دفتر الإضاءات']])+'<div class="l2-lh lb-lh"><span class="ic">'+sv('bulb',30)+'</span><div><h1>دفتر الإضاءات</h1><p>العبارات التي حفظتها من كتب المكتبة. تُحفظ على جهازك، وتطبعها بطاقات.</p></div><div class="r"><b>'+L.length+'</b><small>عبارة</small></div></div>'
   +(L.length?'<div class="lb-lit">'+L.map(function(n,i){ var m=BM(n.b)||{title:'',author:''}; return '<figure><span class="ic">'+sv('bulb',20)+'</span><blockquote>«'+esc(n.x)+'»</blockquote><figcaption>«'+esc(m.title)+'»، '+esc(m.author)+(n.pg?'، صفحة '+n.pg:'')+'<button type="button" onclick="hhLibNoteDel('+i+')" aria-label="احذف">'+sv('trash',14)+'</button></figcaption></figure>'; }).join('')+'</div><div class="l2-ca"><button type="button" class="l2-b p" onclick="hhLibNotesPrint()">'+sv('print',16)+'اطبع البطاقات</button></div>':'<p class="lb-emp">دفترك فارغ. افتح أي كتاب، ثم «الإضاءات»، واحفظ ما يعجبك.</p>')+'</div>'; }
window.hhLibNotesPrint=function(){ var L=notes(); if(!L.length) return; var w=window.open('','_blank'); if(!w) return;
  w.document.write('<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>دفتر الإضاءات</title><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;900&family=Amiri:wght@700&display=swap" rel="stylesheet"><style>@page{size:A4;margin:12mm}body{font-family:Cairo,sans-serif;margin:0}h1{font-size:22px;color:#3D0918}.g{display:grid;grid-template-columns:1fr 1fr;gap:10px}.c{border:2px solid #E6CE8E;border-radius:14px;padding:14px;break-inside:avoid;background:#FFFCF5}.c q{display:block;font-family:Amiri;font-size:19px;line-height:1.8;color:#3D0918;quotes:"«" "»"}.c small{display:block;margin-top:8px;font-size:11px;color:#7A6A54}</style></head><body><h1>دفتر الإضاءات، منصة المُلهم</h1><div class="g">'
   +L.map(function(n){ var m=BM(n.b)||{title:'',author:''}; return '<div class="c"><q>'+esc(n.x)+'</q><small>«'+esc(m.title)+'»، '+esc(m.author)+(n.pg?'، صفحة '+n.pg:'')+'</small></div>'; }).join('')+'</div><script>setTimeout(function(){print()},600)<\/script></body></html>'); w.document.close(); };

/* ═══ اسأل المكتبة ═══ */
var ASK={scope:'',q:'',res:null,busy:0};
window.hhLibAskIn=function(aid){ ASK.scope=aid; ASK.q=''; ASK.res=null; ensureHost(function(){ go('ask'); }); };
window.hhLibAsk=function(q){ ASK.q=String(q||'').trim(); if(ASK.q.length<2) return; var ids=[]; X().authors.forEach(function(a){ if(!ASK.scope||a.id===ASK.scope) a.books.forEach(function(id){ var m=BM(id); if(m&&m.file) ids.push(id); }); });
  ASK.busy=1; render(); var n=ids.length; if(!n){ ASK.busy=0; ASK.res=[]; render(); return; } ids.forEach(function(id){ need(id,function(){ if(--n===0){ ASK.busy=0; ASK.res=search(ids,ASK.q); render(); var i=$('lb-aq'); if(i) i.focus(); } }); }); };
function search(ids,q){ var T=norm(q).split(/\s+/).map(function(w){ return w.replace(/^(و|ف|ب|ل)?ال/,'').replace(/(ه|ها|هم|ات|ون|ين|يه|ي)$/,''); }).filter(function(w){ return w.length>2; }); if(!T.length) return [];
  var R=[]; ids.forEach(function(id){ var b=BC(id); if(!b) return; b.chapters.forEach(function(c,ci){ c.sections.forEach(function(s,si){ var txt=[s.t,s.key].concat(s.p||[]).concat((s.items||[]).map(function(i){ return (i.h||'')+' '+(i.x||''); })).join(' '), h=norm(txt), sc=0;
      T.forEach(function(w){ var k=h.split(w).length-1; if(k) sc+=1+Math.min(k,4)*.25; if(norm(s.t).indexOf(w)>-1) sc+=1.5; });
      if(sc>=Math.min(T.length,2)){ var sn=(s.key||(s.p||[])[0]||'').slice(0,190); R.push({id:id,ci:ci,si:si,sc:sc,t:s.t,ct:c.t,x:sn,pg:s.pg}); } }); }); });
  R.sort(function(a,b){ return b.sc-a.sc; }); return R.slice(0,20); }
function vAsk(){ var a=ASK.scope?AU(ASK.scope):null;
  var h='<div class="l2-wrap">'+crumbs(a?cAuthor(a).concat([['اسأل الكتب']]):[['تعلّم',"hhLnGo('home')"],['اسأل المكتبة']])+'<div class="l2-lh lb-lh"><span class="ic">'+sv('search',30)+'</span><div><h1>'+(a?'اسأل كتب '+esc(a.short||a.name):'اسأل المكتبة')+'</h1><p>اكتب سؤالك بكلماتك، ونبحث لك في '+(a?'كتب المؤلف':'كتب المكتبة كلها')+'، ونعرض لك المواضع التي تجيب عنه مع رقم الصفحة.</p></div></div>'
   +'<div class="lb-askbar"><label class="l2-gs">'+sv('search',18)+'<input id="lb-aq" type="search" placeholder="مثال: كيف أتعامل مع كذب ابني؟" value="'+esc(ASK.q)+'" aria-label="سؤالك"></label><button type="button" class="l2-b p" onclick="hhLibAsk(document.getElementById(\'lb-aq\').value)">ابحث</button></div>';
  if(ASK.busy) h+='<div class="lb-load"><i></i>نقرأ الكتب</div>';
  else if(ASK.res) h+=ASK.res.length?'<div class="lb-res">'+ASK.res.map(function(r){ var m=BM(r.id); return '<button type="button" onclick="hhLibOpenAt2(\''+r.id+'\','+r.ci+','+r.si+')"><i style="--c:'+m.c+'"></i><span><em>«'+esc(m.title)+'»، '+esc(r.ct)+(r.pg?'، صفحة '+r.pg:'')+'</em><b>'+esc(r.t)+'</b><small>'+esc(r.x)+'</small></span></button>'; }).join('')+'</div>':'<p class="lb-emp">لم نجد موضعاً يجيب عن سؤالك. جرّب كلمات أخرى، مثل اسم المشكلة أو السلوك.</p>';
  return h+'</div>'; }
window.hhLibOpenAt2=function(bid,ci,si){ var m=BM(bid); need(bid,function(){ go('st',{bid:bid,aid:m.aid,ci:ci,si:si}); }); };

/* ═══ لوحة الصف ═══ */
var BD={cls:null,code:'',rows:null,err:''};
function vBoard(){ var m=V.bid?BM(V.bid):null, b=V.bid?BC(V.bid):null;
  var h='<div class="l2-wrap">'+crumbs(m?cAuthor(AU(m.aid)).concat([[m.title,"hhLibGo('book','board')"],['لوحة الصف']]):[['تعلّم',"hhLnGo('home')"],['لوحة الصف']])
   +'<div class="l2-lh lb-lh"><span class="ic">'+sv('users',30)+'</span><div><h1>لوحة الصف</h1><p>'+(m?'تقدم طلاب صفك في «'+esc(m.title)+'» محطة محطة.':'تقدم طلاب صفك في برامج «تعلّم» كلها.')+' يظهر هنا الطالب الذي انضم إلى صفك من «صفوفي وطلابي» ودخل بحسابه.</p></div></div>';
  if(!isTeacher()) return h+'<p class="lb-emp">لوحة الصف للمعلمين المعتمدين.</p></div>';
  if(BD.err) return h+'<p class="lb-emp">'+esc(BD.err)+'</p></div>';
  if(!BD.cls) return h+'<div class="lb-load"><i></i>نحضر صفوفك</div></div>';
  h+='<div class="lb-bdh"><label>الصف<select onchange="hhLibBoardCls(this.value)">'+BD.cls.map(function(c){ return '<option value="'+esc(c.id)+'"'+(c.id===BD.code?' selected':'')+'>'+esc(c.name)+'</option>'; }).join('')+'</select></label></div>';
  if(!BD.cls.length) return h+'<p class="lb-emp">لا صفوف لك بعد. أنشئ صفاً من «المدرسة، صفوفي وطلابي»، وشارك رمزه مع طلابك.</p></div>';
  if(!BD.rows) return h+'<div class="lb-load"><i></i>نحضر تقدم الطلاب</div></div>';
  if(!BD.rows.length) return h+'<p class="lb-emp">لا طلاب في هذا الصف بعد.</p></div>';
  if(b){ h+='<div class="l2-tbl lb-bt"><table><thead><tr><th>الطالب</th>'+b.chapters.map(function(c,i){ return '<th title="'+esc(c.t)+'">'+(i+1)+'</th>'; }).join('')+'<th>التقدم</th></tr></thead><tbody>'+BD.rows.map(function(r){ var x=(r.books||{})[V.bid]||null, q=x&&x.q||{};
     return '<tr><td class="k">'+esc(r.name)+'</td>'+b.chapters.map(function(c){ var v=q[c.k]; return '<td><span class="dot '+(v>=70?'f':v!=null?'h':'')+'" title="'+(v!=null?v+'%':'لم يختبر')+'"></span></td>'; }).join('')+'<td><b>'+(x?x.pct:0)+'%</b></td></tr>'; }).join('')+'</tbody></table></div><div class="lb-lg"><span><i class="dot f"></i>اجتاز</span><span><i class="dot h"></i>اختبر ولم يجتز</span><span><i class="dot"></i>لم يختبر</span></div>'; }
  else { var ids={}; BD.rows.forEach(function(r){ Object.keys(r.books||{}).forEach(function(k){ ids[k]=(r.books[k].title)||k; }); }); var K=Object.keys(ids);
    h+=K.length?'<div class="l2-tbl lb-bt"><table><thead><tr><th>الطالب</th>'+K.map(function(k){ return '<th>'+esc(ids[k])+'</th>'; }).join('')+'</tr></thead><tbody>'+BD.rows.map(function(r){ return '<tr><td class="k">'+esc(r.name)+'</td>'+K.map(function(k){ var x=(r.books||{})[k]; return '<td>'+(x?'<b>'+x.pct+'%</b><small>'+(x.pass||0)+'/'+(x.tot||0)+'</small>':'<span class="mu">لم يبدأ</span>')+'</td>'; }).join('')+'</tr>'; }).join('')+'</tbody></table></div>':'<p class="lb-emp">لم يبدأ طلاب هذا الصف أي برنامج في «تعلّم» بعد.</p>'; }
  return h+'</div>'; }
function boardLoad(){ if(!isTeacher()||BD._busy) return; var u=me(), d=db(); if(!u||!u.uid||!d){ BD.err='سجّل الدخول بحساب المعلم.'; return; }
  if(!BD.cls){ BD._busy=1; d.collection('classrooms').where('teacherId','==',u.uid).limit(50).get().then(function(s){ var L=[]; s.forEach(function(x){ var c=x.data()||{}; L.push({id:x.id,name:c.name||c.title||c.className||x.id}); }); BD.cls=L; BD.code=L[0]?L[0].id:''; BD._busy=0; render(); }).catch(function(){ BD._busy=0; BD.err='تعذّر تحميل صفوفك.'; render(); }); return; }
  if(BD.code&&!BD.rows){ BD._busy=1; d.collection('classroom_students').where('teacherId','==',u.uid).where('classCode','==',BD.code).limit(200).get().then(function(s){ var S=[]; s.forEach(function(x){ var c=x.data()||{}; if(c.active===false) return; S.push({uid:c.userId,name:c.studentName||c.name||'طالب'}); });
    return Promise.all(S.map(function(x){ if(!x.uid) return Promise.resolve(x); return d.collection('learn_progress').doc(x.uid).get().then(function(p){ x.books=(p.exists&&(p.data()||{}).books)||{}; return x; }).catch(function(){ return x; }); })); }).then(function(R){ BD.rows=(R||[]).sort(function(a,b){ return String(a.name).localeCompare(String(b.name),'ar'); }); BD._busy=0; render(); }).catch(function(){ BD._busy=0; BD.err='تعذّر تحميل الطلاب.'; render(); }); } }
window.hhLibBoardCls=function(c){ BD.code=c; BD.rows=null; render(); };

/* ═══ الشهادات ═══ */
function certBox(id,title,line,by){ var u=me(); return '<div class="ln-cert lbc" id="'+id+'"><div class="in"><i class="cr tl"></i><i class="cr tr"></i><i class="cr bl"></i><i class="cr br"></i><small>منصة المُلهم التعليمي، برنامج «تعلّم»</small><h1>شهادة إتمام</h1><p>تشهد المنصة بأن</p><input id="'+id+'-n" value="'+esc((u&&u.displayName)||'')+'" placeholder="اكتب الاسم" aria-label="الاسم"><p>'+line+'</p><div class="ft"><span>'+new Date().toLocaleDateString('ar-QA-u-nu-latn',{day:'numeric',month:'long',year:'numeric'})+'</span><span class="sl">'+sv('badge',40,1.5)+'</span><span>المُلهم</span></div></div></div>'; }
function vCert(){ var b=BC(V.bid), m=BM(V.bid), n=b.chapters.length, ps=passN(V.bid);
  var h='<div class="l2-wrap">'+crumbs(cAuthor(AU(m.aid)).concat([[b.title,"hhLibGo('book','cert')"],['الشهادة']]));
  if(ps<n) return h+'<div class="l2-res"><div class="ring big" style="--p:'+Math.round(ps/n*100)+'"><b>'+ps+'/'+n+'</b></div><h2>تبقّى '+(n-ps)+' من اختبارات المحطات</h2><p>اجتز اختبار كل محطة بنسبة 70% فأكثر.</p><div class="bt">'+b.chapters.map(function(c,i){ var s=st(V.bid).quiz[c.k]; return '<button type="button" class="l2-b'+(s>=70?' ok':'')+'" onclick="hhLibGo(\'quiz\','+i+')">'+(s>=70?sv('check',14,3):'')+(i+1)+'. '+esc(c.t)+(s!=null?' '+s+'%':'')+'</button>'; }).join('')+'</div></div></div>';
  return h+certBox('lb-cert','','أتمّ كتاب <b>«'+esc(b.title)+'»</b><br>'+esc(b.author)+'، واجتاز اختبارات محطاته')+'<div class="l2-ca"><button type="button" class="l2-b p" onclick="hhLibPrint(\'lb-cert\')">'+sv('print',16)+'اطبع الشهادة</button></div></div>'; }
function vPcert(){ var a=AU(V.aid); if(!a) return ''; var miss=[]; a.path.forEach(function(id){ var b=BM(id); if(!(b&&b.chn&&passOf(id)>=b.chn)) miss.push(b); });
  var h='<div class="l2-wrap">'+crumbs(cAuthor(a).concat([[a.pcert]]));
  if(miss.length) return h+'<div class="l2-res"><div class="ring big" style="--p:'+Math.round((a.path.length-miss.length)/a.path.length*100)+'"><b>'+(a.path.length-miss.length)+'/'+a.path.length+'</b></div><h2>'+esc(a.pcert)+'</h2><p>تُمنح بعد اجتياز اختبارات كتب المسار كلها. تبقّى:</p><div class="bt">'+miss.map(function(b){ return '<button type="button" class="l2-b" onclick="hhLibBook(\''+b.id+'\')">'+esc(b.title)+'</button>'; }).join('')+'</div></div></div>';
  return h+certBox('lb-pc','','أتمّ <b>«'+esc(a.pcert)+'»</b> في كتب '+esc(a.name)+'<br>'+a.path.map(function(id){ return '«'+esc(BM(id).title)+'»'; }).join('، '))+'<div class="l2-ca"><button type="button" class="l2-b p" onclick="hhLibPrint(\'lb-pc\')">'+sv('print',16)+'اطبع الشهادة</button></div></div>'; }
window.hhLibPrint=function(id){ var c=$(id), n=$(id+'-n'), nm=n?n.value.trim():''; if(!nm){ toastX('اكتب الاسم أولاً','info'); if(n) n.focus(); return; }
  var css=($('hh-learn-css')||{}).textContent||''; var k=css.indexOf('.ln-cert{'); css=k>-1?css.slice(k):''; var w=window.open('','_blank'); if(!w) return;
  w.document.write('<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>شهادة إتمام</title><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;900&family=Amiri:wght@700&family=Reem+Kufi:wght@700&display=swap" rel="stylesheet"><style>@page{size:A4 landscape;margin:0}body{margin:0;font-family:Cairo,sans-serif}'+css+'.ln-cert{width:297mm;height:210mm;border-radius:0;box-shadow:none;max-width:none}</style></head><body>'+c.outerHTML.replace(/<input[^>]*>/,'<div class="nm">'+esc(nm)+'</div>')+'<script>setTimeout(function(){print()},700)<\/script></body></html>'); w.document.close(); };

/* ═══ مع دخول الطلاب ═══ */
function liveDlg(){ var b=BC(V.bid), h=host(); if(!h||!b) return; var ov=document.createElement('div'); ov.className='ln-scrim'; ov.id='lb-live';
  ov.innerHTML='<div class="ln-dlg" role="dialog" aria-modal="true" aria-label="مع دخول الطلاب"><div class="dh"><div><b>مع دخول الطلاب</b><small>يدخل المشاركون برمز من أجهزتهم، ويجيبون عن أسئلة المحطة، والنتائج على الشاشة</small></div><button type="button" class="x" aria-label="إغلاق" onclick="this.closest(\'.ln-scrim\').remove()">'+sv('x',16,2.4)+'</button></div>'
   +'<div class="in"><h4>اختر المحطة</h4><div class="g">'+b.chapters.map(function(c,i){ return '<button type="button" onclick="hhLibLive('+i+')"><i>'+(i+1)+'</i><b>'+esc(c.t)+'</b><small>'+(c.quiz||[]).length+' أسئلة</small></button>'; }).join('')+'<button type="button" onclick="hhLibLive(-1)"><i>'+sv('star',18)+'</i><b>الكتاب كله</b><small>كل الأسئلة</small></button></div><p class="nt">'+sv('tv',15)+'تحتاج حساب معلم.</p></div></div>';
  h.appendChild(ov); ov.addEventListener('click',function(e){ if(e.target===ov) ov.remove(); }); }
window.hhLibLive=function(ci){ var d=$('lb-live'); if(d) d.remove(); var u=me(); if(!u||!u.uid){ toastX('سجّل الدخول بحساب المعلم لبدء جولة مباشرة','error'); return; } if(typeof window.hhLiveHost!=='function'){ toastX('وحدة التشغيل المباشر غير محمّلة','error'); return; }
  var b=BC(V.bid), C=ci<0?b.chapters:[b.chapters[ci]], qs=[]; C.forEach(function(c){ (c.quiz||[]).forEach(function(q,n){ var od=shuf(q.o.map(function(_,i){ return i; }),'L'+V.bid+c.k+n); qs.push({id:'lb_'+V.bid+'_'+c.k+'_'+n,type:'mcq',q:q.q,opts:od.map(function(i){ return q.o[i]; }),correct:[od.indexOf(0)],time:25,mult:1,flash:false,note:''}); }); });
  var g={id:'learn_'+V.bid+'_'+(ci<0?'all':b.chapters[ci].k),title:ci<0?b.title:'«'+b.chapters[ci].t+'» من '+b.title,template:'race',mode:'live',screenTpl:'boxes',settings:{},questions:qs,status:'ready'};
  if(typeof window.hhLearnClose==='function') hhLearnClose(); hhLiveHost(g); };

document.addEventListener('keydown',function(e){ var h=host(); if(!h||!h.classList.contains('lb')) return; var t=e.target; if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.tagName==='SELECT')) return;
  if(V.v==='st'){ if(e.key==='ArrowLeft'){ e.preventDefault(); hhLibSec(V.si+1); } else if(e.key==='ArrowRight'){ e.preventDefault(); hhLibSec(V.si-1); } } });
function style(){ try{ if(window.hhLn2Style) hhLn2Style(); }catch(e){} if($('hh-lib-css')) return; var s=document.createElement('style'); s.id='hh-lib-css'; s.textContent=CSS; document.head.appendChild(s); }
window._hhLib=function(){ return {V:V,ST:ST,BD:BD}; };
window.hhLibStyle=style;
/* آخر كتاب فتحه المستخدم من المكتبة، لبطاقة «تابع من حيث وقفت» */
window.hhLibRecent=function(){ var best=null; Object.keys(X().books).forEach(function(id){ var m=BM(id); if(!m||m.ext) return; var s=null; try{ s=JSON.parse(localStorage.getItem(sk(id))||'null'); }catch(e){} if(!s||!s.last||!s.t) return; if(!best||s.t>best.t) best={id:id,t:s.t,s:s,m:m}; });
  if(!best) return null; var m=best.m, L=best.s.last, ct=(m.chs||[])[L.ci]||'';
  return {id:best.id,n:'مكتبة المؤلفين',title:m.title,mini:m.cv||m.title,c:m.c,ct:m.ct,pct:best.s.p||0,t:best.t,tone:'p',res:{h:'المحطة '+(L.ci+1)+(m.chn?' من '+m.chn:''),x:ct,go:"hhLibOpenAt2('"+best.id+"',"+L.ci+","+L.si+")",k:[[(best.s.p||0)+'%','تقدمك'],[Object.keys(best.s.quiz||{}).filter(function(k){ return best.s.quiz[k]>=70; }).length+'/'+(m.chn||0),'محطة اجتزتها'],[m.author.split(' ').slice(-1)[0],'المؤلف']]}}; };

var CSS=[
"#hh-learn.lb{--bg:#FAF7F1;--card:#fff;--soft:#F4EFE6;--ln:#E6DCC8;--ink:#2A2620;--hd:#2A2420;--mu:#776E60;--g:#B8924A;--g1:#FBF3E2;--g2:#F0DDB5;--r:#A3354F;--r1:#FBEDEF;background:var(--bg);color:var(--ink);}",
"body.dark-mode #hh-learn.lb{--bg:#181512;--card:#221E1A;--soft:#2B2621;--ln:#3A332B;--ink:#ECE4D8;--hd:#F4EBDD;--mu:#B3A693;--g1:#2E2716;--g2:#5A4A26;--r1:#3A1E25;}",
"#hh-learn.lb .l2-b.p{background:var(--t);}",
".lb-load{display:flex;gap:10px;align-items:center;justify-content:center;padding:60px 10px;font-weight:900;color:var(--mu);} .lb-load i{width:22px;height:22px;border-radius:50%;border:3px solid var(--ln);border-top-color:var(--t,#1F6F7A);animation:lbsp .8s linear infinite;} @keyframes lbsp{to{transform:rotate(360deg)}}",
".lb-emp{text-align:center;font-weight:800;color:var(--mu);padding:30px 10px;line-height:1.9;grid-column:1/-1;}",
".lb-cov{width:100px;height:136px;border-radius:4px 11px 11px 4px;background:var(--c);box-shadow:inset 7px 0 0 rgba(0,0,0,.13),0 14px 24px rgba(0,0,0,.17);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;text-align:center;padding:10px 8px 10px 5px;flex-shrink:0;}",
".lb-cov b{font-family:\"Reem Kufi\",Cairo;font-size:15px;line-height:1.4;color:var(--ct,#fff);} .lb-cov small{font-size:9px;font-weight:800;color:var(--ct,#fff);opacity:.82;line-height:1.4;}",
".lb-cov.big{width:140px;height:192px;} .lb-cov.big b{font-size:21px;} .lb-cov.big small{font-size:10.5px;}",
"/* الصفحة الأولى */",
".lb-feat{position:relative;overflow:hidden;margin-top:18px;border-radius:26px;background:linear-gradient(135deg,#1E2A44,#2E3D63);color:#fff;padding:24px 28px;display:grid;grid-template-columns:auto 1fr auto;gap:22px;align-items:center;}",
".lb-feat::after{content:\"\";position:absolute;inset:-40% -8% auto auto;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(230,206,142,.22),transparent 70%);pointer-events:none;}",
".lb-feat .cv{position:relative;z-index:1;} .lb-feat .tx{position:relative;z-index:1;min-width:0;}",
".lb-feat em{font-style:normal;font-size:12px;font-weight:900;color:#E6CE8E;background:rgba(230,206,142,.14);border-radius:20px;padding:3px 12px;}",
".lb-feat h2{margin:8px 0 4px;font-family:\"Reem Kufi\",Cairo;font-size:38px;color:#fff;line-height:1.25;} .lb-feat p{margin:0;font-size:14.5px;font-weight:700;line-height:1.9;color:#DCE2EE;max-width:640px;} .lb-feat .by{display:block;margin-top:4px;font-size:12.5px;font-weight:800;color:#B9C3D8;}",
".lb-feat .tp{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px;} .lb-feat .tp span{background:rgba(255,255,255,.1);border-radius:10px;padding:4px 10px;font-size:12px;font-weight:800;}",
".lb-feat .go{all:unset;cursor:pointer;position:relative;z-index:1;display:inline-flex;gap:8px;align-items:center;background:linear-gradient(180deg,#E9CE87,#C9A35A);color:#2A1A06;font-weight:900;border-radius:14px;padding:12px 20px;white-space:nowrap;} .lb-feat .go:focus-visible{outline:3px solid #fff;outline-offset:3px;}",
".lb-hb{gap:10px;} .lb-srch{display:flex;gap:8px;align-items:center;background:var(--card);border:1.5px solid var(--ln);border-radius:13px;padding:0 12px;height:42px;min-width:220px;color:var(--mu);} .lb-srch input{all:unset;flex:1;font-weight:800;font-size:14px;color:var(--ink);min-width:0;}",
".lb-ag{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;}",
".lb-fd{all:unset;box-sizing:border-box;cursor:pointer;position:relative;background:var(--card);border:1px solid var(--ln);border-radius:20px;padding:16px;display:flex;flex-direction:column;gap:10px;transition:transform .2s,box-shadow .2s;min-width:0;}",
".lb-fd::before{content:\"\";position:absolute;top:-1px;inset-inline-start:18px;width:70px;height:9px;border-radius:9px 9px 0 0;background:var(--k);opacity:.85;}",
".lb-fd:hover{transform:translateY(-3px);box-shadow:0 16px 34px rgba(61,9,24,.09);} .lb-fd:focus-visible{outline:3px solid var(--g);outline-offset:2px;}",
".lb-fd .h{display:flex;gap:10px;align-items:center;min-width:0;} .lb-fd .av{width:46px;height:46px;border-radius:14px;background:var(--k);color:#fff;display:grid;place-items:center;font-family:\"Reem Kufi\",Cairo;font-size:22px;flex-shrink:0;}",
".lb-fd b{display:block;font-size:15px;color:var(--hd);line-height:1.5;} .lb-fd .h small{display:block;font-size:12px;font-weight:800;color:var(--mu);line-height:1.5;}",
".lb-fd .stk,.lb-tp .stk{display:flex;height:62px;align-items:flex-end;padding-inline-start:12px;} .lb-fd .stk i,.lb-tp .stk i{width:40px;height:56px;border-radius:3px 8px 8px 3px;margin-inline-start:-13px;background:var(--c);border:2px solid var(--card);box-shadow:0 6px 12px rgba(0,0,0,.12);}",
".lb-fd .tg{display:flex;gap:5px;flex-wrap:wrap;align-items:center;} .lb-fd .tg em{font-style:normal;font-size:11px;font-weight:900;border-radius:20px;padding:2px 8px;background:var(--soft);color:var(--mu);} .lb-fd .n{margin-inline-start:auto;font-size:12px;font-weight:900;color:var(--k);}",
".lb-tps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;}",
".lb-tp{all:unset;box-sizing:border-box;cursor:pointer;display:grid;grid-template-columns:auto 1fr;gap:6px 14px;align-items:center;background:linear-gradient(135deg,#FFFBF6,#FBEFE4);border:1px solid var(--ln);border-radius:20px;padding:14px 16px;} body.dark-mode #hh-learn .lb-tp{background:var(--card);}",
".lb-tp b{display:block;font-size:16px;color:var(--hd);} .lb-tp small{font-size:12.5px;font-weight:700;color:var(--mu);} .lb-tp .p{grid-column:1/-1;height:6px;border-radius:6px;background:var(--soft);overflow:hidden;} .lb-tp .p i{display:block;height:100%;background:var(--k);}",
".lb-tools{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-top:18px;}",
".lb-tools button{all:unset;box-sizing:border-box;cursor:pointer;display:flex;gap:12px;align-items:center;background:var(--card);border:1px solid var(--ln);border-radius:18px;padding:14px 16px;color:var(--t,#8A1538);} .lb-tools button:hover{border-color:var(--g2);} .lb-tools button:focus-visible{outline:3px solid var(--g);}",
".lb-tools b{display:block;font-size:15px;color:var(--hd);} .lb-tools small{font-size:12.5px;font-weight:700;color:var(--mu);}",
"/* ملف المؤلف */",
".lb-ah{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:22px;align-items:center;border-radius:26px;background:radial-gradient(70% 120% at 90% 0%,color-mix(in srgb,var(--k) 14%,transparent),transparent 60%),linear-gradient(160deg,#FDFBF6,#F6F1E6);border:1px solid var(--ln);padding:28px 30px;}",
"body.dark-mode #hh-learn .lb-ah{background:var(--card);}",
".lb-ah .av{width:110px;height:110px;border-radius:32px;background:var(--k);display:grid;place-items:center;color:#F7EBCB;font-family:\"Reem Kufi\",Cairo;font-size:44px;box-shadow:0 14px 30px rgba(0,0,0,.18);}",
".lb-ah em{font-style:normal;font-size:12.5px;font-weight:900;color:var(--k);background:var(--card);border:1px solid var(--ln);border-radius:20px;padding:3px 12px;} .lb-ah h1{margin:8px 0 6px;font-family:\"Reem Kufi\",Cairo;font-size:40px;color:var(--hd);line-height:1.25;}",
".lb-ah p{margin:0;font-size:15px;font-weight:700;line-height:2;color:var(--ink);max-width:700px;} .lb-ah .fx{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;} .lb-ah .fx span{background:var(--card);border:1px solid var(--ln);border-radius:12px;padding:5px 10px;font-size:12.5px;font-weight:800;color:var(--hd);}",
".lb-ah .sr{display:block;margin-top:8px;font-size:11.5px;font-weight:700;color:var(--mu);} .lb-ah .kp{display:grid;gap:8px;} .lb-ah .kp div{background:var(--card);border:1px solid var(--ln);border-radius:16px;padding:10px 16px;text-align:center;min-width:120px;} .lb-ah .kp b{display:block;font-size:24px;color:var(--k);} .lb-ah .kp span{font-size:12px;font-weight:800;color:var(--mu);}",
".lb-ask{margin-top:16px;background:var(--card);border:1.5px solid var(--ln);border-radius:22px;padding:16px 18px;} .lb-ask h3{margin:0 0 4px;font-size:18px;color:var(--hd);} .lb-ask p{margin:0 0 10px;font-size:13.5px;font-weight:700;color:var(--mu);}",
".lb-ask .chips{display:flex;gap:8px;flex-wrap:wrap;} .lb-ask .chips button{all:unset;cursor:pointer;background:var(--soft);color:var(--hd);border-radius:12px;padding:8px 12px;font-size:13.5px;font-weight:900;} .lb-ask .chips button.on{background:var(--hd);color:var(--card);} .lb-ask .chips button:focus-visible{outline:3px solid var(--g);}",
".lb-ask .ans{margin-top:10px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;background:var(--g1);border-radius:14px;padding:10px 14px;font-size:14px;font-weight:800;} .lb-ask .ans span{flex:1;min-width:200px;}",
".lb-shelf{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;}",
".lb-bk{all:unset;box-sizing:border-box;cursor:pointer;background:var(--card);border:1px solid var(--ln);border-radius:20px;overflow:hidden;display:flex;flex-direction:column;transition:transform .2s,box-shadow .2s;min-width:0;}",
".lb-bk:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(0,0,0,.08);} .lb-bk:focus-visible{outline:3px solid var(--g);outline-offset:2px;}",
".lb-bk .cv{position:relative;height:188px;display:grid;place-items:center;background:radial-gradient(80% 90% at 70% 20%,var(--card),var(--c1));} .lb-bk .cv em{position:absolute;top:10px;inset-inline-start:10px;font-style:normal;font-size:10.5px;font-weight:900;background:var(--card);border-radius:20px;padding:2px 8px;color:var(--hd);}",
".lb-bk .lb-cov{transform:rotate(-3deg);transition:transform .3s;} .lb-bk:hover .lb-cov{transform:rotate(0) scale(1.04);}",
".lb-bk .bd{padding:12px 14px 14px;display:flex;flex-direction:column;gap:5px;flex:1;} .lb-bk .bd>b{font-family:Amiri,serif;font-size:20px;line-height:1.35;color:var(--hd);} .lb-bk .bd>small{font-size:12px;font-weight:700;color:var(--mu);line-height:1.7;}",
".lb-bk .mt{margin-top:auto;display:flex;gap:8px;align-items:center;font-size:11.5px;font-weight:900;color:var(--mu);padding-top:8px;border-top:1px dashed var(--ln);} .lb-bk .mt i{flex:1;height:6px;border-radius:6px;background:var(--soft);overflow:hidden;} .lb-bk .mt s{display:block;height:100%;background:var(--g);} .lb-bk .nw{color:var(--hd);} .lb-bk .cn{margin-inline-start:auto;}",
".lb-path{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;} .lb-path button{all:unset;box-sizing:border-box;cursor:pointer;flex:1;min-width:150px;background:var(--card);border:1px solid var(--ln);border-radius:16px;padding:10px 12px;}",
".lb-path i{font-style:normal;width:26px;height:26px;border-radius:8px;background:var(--hd);color:var(--card);display:inline-grid;place-items:center;font-size:12px;font-weight:900;} .lb-path .dn i{background:#2F8F5B;color:#fff;} .lb-path b{display:block;margin-top:4px;font-size:14px;color:var(--hd);} .lb-path small{font-size:12px;font-weight:700;color:var(--mu);}",
"/* صفحة الكتاب */",
".lb-bh{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:24px;align-items:center;background:linear-gradient(160deg,#FFFDF8,#F7F0E2);border:1px solid var(--ln);border-radius:28px;padding:24px 28px;} body.dark-mode #hh-learn .lb-bh{background:var(--card);}",
".lb-bh em{font-style:normal;font-size:12.5px;font-weight:900;color:var(--g);} .lb-bh h1{margin:6px 0 2px;font-family:\"Reem Kufi\",Cairo;font-size:36px;color:var(--hd);line-height:1.3;} .lb-bh .sb{margin:0 0 8px;font-size:15px;font-weight:800;color:var(--t);}",
".lb-bh p{margin:0;font-size:14.5px;font-weight:700;line-height:2;color:var(--ink);} .lb-bh .st{display:flex;gap:16px;flex-wrap:wrap;margin-top:10px;font-size:13px;font-weight:800;color:var(--mu);} .lb-bh .st b{font-size:19px;color:var(--hd);margin-inline-end:4px;}",
".lb-bh .bt{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;} .lb-bh .l2-mode{margin-top:10px;width:max-content;max-width:100%;} .lb-bh .pr{display:grid;justify-items:center;gap:4px;} .lb-bh .pr small{font-size:12px;font-weight:800;color:var(--mu);}",
".lb-svc{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:14px;}",
".lb-svc button{all:unset;cursor:pointer;box-sizing:border-box;background:var(--card);border:1.5px solid var(--ln);border-radius:18px;padding:11px 13px;display:grid;grid-template-columns:auto 1fr;gap:1px 10px;align-items:center;min-width:0;} .lb-svc button:focus-visible{outline:3px solid var(--g);}",
".lb-svc button.on{border-color:var(--t);background:var(--t1);} .lb-svc i{grid-row:span 2;width:38px;height:38px;border-radius:12px;background:var(--t1);color:var(--t);display:grid;place-items:center;} .lb-svc button.on i{background:var(--t);color:#fff;}",
".lb-svc b{font-size:14.5px;color:var(--hd);} .lb-svc small{font-size:11.5px;font-weight:700;color:var(--mu);}",
".lb-pane{margin-top:14px;background:var(--card);border:1px solid var(--ln);border-radius:24px;padding:18px;min-height:180px;}",
".lb-map{position:relative;height:460px;} .lb-map svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}",
".lb-map .core{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:170px;height:170px;border-radius:50%;background:radial-gradient(circle,var(--card) 55%,var(--t1));border:2px solid var(--t2);display:grid;place-items:center;text-align:center;box-shadow:0 0 0 14px color-mix(in srgb,var(--t2) 35%,transparent);padding:14px;}",
".lb-map .core b{font-family:\"Reem Kufi\",Cairo;font-size:19px;color:var(--hd);line-height:1.35;} .lb-map .core small{display:block;font-size:11.5px;font-weight:800;color:var(--mu);margin-top:4px;}",
".lb-map .nd{all:unset;cursor:pointer;position:absolute;transform:translate(-50%,-50%);width:156px;box-sizing:border-box;background:var(--card);border:1.5px solid var(--ln);border-radius:15px;padding:8px 10px;text-align:center;font-size:12.5px;font-weight:900;color:var(--hd);line-height:1.5;transition:transform .2s;}",
".lb-map .nd em{display:block;font-style:normal;font-size:11px;color:var(--g);} .lb-map .nd:hover,.lb-map .nd.on{border-color:var(--t);background:var(--t1);transform:translate(-50%,-50%) scale(1.05);} .lb-map .nd.dn em::after{content:\" ✓\";color:#2F8F5B;} .lb-map .nd:focus-visible{outline:3px solid var(--g);}",
".lb-mcard{margin-top:10px;border-inline-start:5px solid var(--t);background:var(--soft);border-radius:14px;padding:12px 16px;display:grid;gap:6px;justify-items:start;} .lb-mcard em{font-style:normal;font-size:12px;font-weight:900;color:var(--t);} .lb-mcard b{font-size:17px;color:var(--hd);} .lb-mcard p{margin:0;font-size:14.5px;font-weight:700;color:var(--ink);}",
".lb-mcard ul{margin:0;padding:0;list-style:none;display:flex;gap:6px;flex-wrap:wrap;} .lb-mcard li{background:var(--card);border-radius:10px;padding:4px 10px;font-size:12.5px;font-weight:800;}",
".lb-chs,.lb-qs{display:grid;gap:8px;} .lb-chs button,.lb-qs button{all:unset;cursor:pointer;box-sizing:border-box;display:flex;gap:12px;align-items:center;background:var(--soft);border-radius:16px;padding:12px 14px;} .lb-chs button:focus-visible,.lb-qs button:focus-visible{outline:3px solid var(--g);}",
".lb-chs i{font-style:normal;width:32px;height:32px;border-radius:10px;background:var(--card);color:var(--t);display:grid;place-items:center;font-weight:900;flex-shrink:0;} .lb-chs .dn i{background:var(--t);color:#fff;}",
".lb-chs span:not(.pr){flex:1;min-width:0;} .lb-chs b,.lb-qs b{display:block;font-size:15px;color:var(--hd);line-height:1.6;} .lb-chs small,.lb-qs small{font-size:12.5px;font-weight:700;color:var(--mu);}",
".lb-chs .pr{width:90px;height:6px;border-radius:6px;background:var(--card);overflow:hidden;flex-shrink:0;} .lb-chs .pr s{display:block;height:100%;background:var(--t);} .lb-chs em{font-style:normal;font-size:12px;font-weight:900;color:var(--r);} .lb-chs em.ok{color:#2F8F5B;}",
".lb-qs button{justify-content:space-between;} .lb-qs button>b{flex:1;} .lb-qs .l2-b{height:38px;padding:0 14px;font-size:13px;}",
".lb-scs{display:grid;gap:12px;} .lb-sc{background:var(--soft);border-radius:18px;padding:14px 16px;margin-bottom:12px;} .lb-sc em{font-style:normal;font-size:12px;font-weight:900;color:var(--t);} .lb-sc>b{display:block;font-size:17px;color:var(--hd);margin:2px 0 6px;} .lb-sc>p{margin:0 0 10px;font-size:15px;font-weight:700;line-height:1.9;}",
".lb-sc .o{display:grid;gap:6px;} .lb-sc .o button{all:unset;cursor:pointer;box-sizing:border-box;background:var(--card);border:1.5px solid var(--ln);border-radius:12px;padding:9px 12px;font-size:14px;font-weight:800;line-height:1.7;} .lb-sc .o button:focus-visible{outline:3px solid var(--g);}",
".lb-sc .o button.ok{border-color:#7FC39C;background:#E8F5EE;} .lb-sc .o button.no{border-color:#E5B0B8;background:#FBEDEF;} .lb-sc .o button.off{opacity:.55;}",
"body.dark-mode #hh-learn .lb-sc .o button.ok{background:#1E3027;} body.dark-mode #hh-learn .lb-sc .o button.no{background:#3A1E25;}",
".lb-sc .ex,.lb-why{margin-top:10px;background:var(--t1);border-inline-start:4px solid var(--t);border-radius:12px;padding:10px 14px;font-size:14.5px;font-weight:700;line-height:1.9;} .lb-sc .ex small,.lb-why small{display:block;font-size:12px;color:var(--mu);} .lb-why{margin:12px 0 0;}",
".lb-rel{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;} .lb-rel button{all:unset;cursor:pointer;box-sizing:border-box;display:flex;gap:10px;align-items:center;background:var(--soft);border-radius:14px;padding:10px 12px;} .lb-rel button:focus-visible{outline:3px solid var(--g);}",
".lb-rel i{width:26px;height:36px;border-radius:2px 6px 6px 2px;background:var(--c);flex-shrink:0;} .lb-rel b{display:block;font-size:14px;color:var(--hd);line-height:1.5;} .lb-rel small{font-size:12px;font-weight:700;color:var(--mu);}",
".lb-lit{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;} .lb-lit figure{margin:0;background:var(--g1);border:1px solid var(--g2);border-radius:18px;padding:16px;display:flex;flex-direction:column;gap:8px;}",
".lb-lit .ic{color:var(--g);} .lb-lit blockquote{margin:0;font-family:Amiri,serif;font-size:19px;line-height:1.85;color:var(--hd);} .lb-lit figcaption{margin-top:auto;display:flex;gap:8px;align-items:center;justify-content:space-between;font-size:12px;font-weight:800;color:var(--mu);}",
".lb-lit figcaption button{all:unset;cursor:pointer;display:inline-flex;gap:5px;align-items:center;font-size:12px;font-weight:900;color:var(--g);border:1.5px solid var(--g2);border-radius:10px;padding:4px 9px;} .lb-lit figcaption button.on{background:var(--g);color:#fff;border-color:transparent;} .lb-lit figcaption button:focus-visible{outline:3px solid var(--g);}",
".lb-pgf{margin-top:16px;padding-top:10px;border-top:1px dashed var(--ln);display:flex;justify-content:flex-end;} .lb-pgf span{display:inline-flex;gap:5px;align-items:center;font-size:12px;font-weight:900;color:var(--mu);background:var(--soft);border-radius:20px;padding:3px 10px;}",
".lb-ct{display:flex;gap:20px;align-items:center;flex-wrap:wrap;} .lb-ct h3{margin:0 0 4px;font-size:19px;color:var(--hd);} .lb-ct p{margin:0 0 10px;font-size:14px;font-weight:700;color:var(--mu);}",
".lb-bd-in{display:flex;gap:14px;align-items:center;flex-wrap:wrap;} .lb-bd-in p{margin:0;flex:1;font-weight:700;color:var(--mu);}",
".lb-lh{background:var(--t1,#E7F2F1) !important;border-color:var(--t2,#CFE6E4) !important;} .lb-lh .ic{background:var(--card) !important;color:var(--t,#1F6F7A) !important;}",
".lb-askbar{display:flex;gap:10px;align-items:center;margin-bottom:14px;} .lb-askbar .l2-gs{flex:1;margin:0;}",
".lb-res{display:grid;gap:8px;} .lb-res button{all:unset;cursor:pointer;box-sizing:border-box;display:flex;gap:12px;align-items:flex-start;background:var(--card);border:1px solid var(--ln);border-radius:16px;padding:12px 14px;} .lb-res button:hover{border-color:var(--g2);} .lb-res button:focus-visible{outline:3px solid var(--g);}",
".lb-res i{width:28px;height:40px;border-radius:2px 6px 6px 2px;background:var(--c);flex-shrink:0;} .lb-res em{display:block;font-style:normal;font-size:12px;font-weight:900;color:var(--g);} .lb-res b{display:block;font-size:15.5px;color:var(--hd);margin:2px 0;} .lb-res small{font-size:13.5px;font-weight:700;color:var(--ink);line-height:1.8;}",
".lb-bdh{display:flex;gap:10px;margin-bottom:12px;} .lb-bdh label{display:flex;gap:8px;align-items:center;font-weight:900;color:var(--hd);} .lb-bdh select{font:inherit;font-weight:800;border:1.5px solid var(--ln);border-radius:12px;padding:8px 12px;background:var(--card);color:var(--ink);}",
".lb-bt td{text-align:center;} .lb-bt td.k{text-align:right;} .lb-bt small{display:block;font-size:11px;color:var(--mu);} .lb-bt .mu{font-size:12px;color:var(--mu);}",
"#hh-learn.lb .dot{display:inline-block;width:13px;height:13px;border-radius:50%;background:#E3DACB;} #hh-learn.lb .dot.h{background:#E6C27A;} #hh-learn.lb .dot.f{background:#2F8F5B;}",
".lb-lg{display:flex;gap:14px;margin-top:8px;font-size:12px;font-weight:800;color:var(--mu);} .lb-lg span{display:inline-flex;gap:5px;align-items:center;}",
".lbc .cr{border-color:var(--t,#1F6F7A) !important;} .lbc h1{color:var(--hd) !important;}",
"@media (max-width:1100px){ .lb-ag,.lb-shelf{grid-template-columns:repeat(3,minmax(0,1fr));} .lb-svc{grid-template-columns:repeat(4,minmax(0,1fr));} .lb-lit{grid-template-columns:repeat(2,minmax(0,1fr));} .lb-tps{grid-template-columns:repeat(2,minmax(0,1fr));} }",
"@media (max-width:900px){ .lb-map{height:auto;} .lb-map svg{display:none;} .lb-map .core{position:relative;left:auto;top:auto;transform:none;margin:0 auto 12px;} .lb-map .nd{position:relative !important;left:auto !important;top:auto !important;transform:none !important;width:100%;display:block;margin-bottom:6px;text-align:right;} .lb-map .nd em{display:inline;margin-inline-end:8px;}",
"  .lb-ah,.lb-bh{grid-template-columns:minmax(0,1fr);text-align:center;justify-items:center;padding:22px 16px;} .lb-ah .fx,.lb-bh .bt,.lb-bh .st{justify-content:center;} .lb-ah .kp{grid-template-columns:repeat(3,minmax(0,1fr));width:100%;} .lb-ah .kp div{min-width:0;padding:8px;} .lb-ah h1{font-size:28px;} .lb-ah .av{width:90px;height:90px;font-size:34px;} .lb-bh h1{font-size:28px;}",
"  .lb-feat{grid-template-columns:minmax(0,1fr);text-align:center;justify-items:center;padding:22px 16px;} .lb-feat h2{font-size:28px;} .lb-feat .tp{justify-content:center;} }",
"@media (max-width:760px){ .lb-ag,.lb-shelf{grid-template-columns:repeat(2,minmax(0,1fr));} .lb-svc{grid-template-columns:repeat(2,minmax(0,1fr));} .lb-lit,.lb-rel,.lb-tps{grid-template-columns:minmax(0,1fr);} .lb-srch{min-width:0;width:100%;} .lb-askbar{flex-direction:column;align-items:stretch;} .lb-chs .pr{display:none;} .lb-bh .l2-mode{width:100%;} }",
"@media (max-width:480px){ .lb-ag{grid-template-columns:minmax(0,1fr);} }",
"body.dark-mode #hh-learn.lb{--t1:color-mix(in srgb,var(--t) 20%,#1B1815) !important;--t2:color-mix(in srgb,var(--t) 42%,#1B1815) !important;}",
"body.dark-mode #hh-learn.lb .l2-key,body.dark-mode #hh-learn.lb .l2-why{color:var(--ink);}",
"#hh-learn.lb .l2-res{padding:32px 14px;min-width:0;overflow:hidden;} #hh-learn.lb .l2-res h2{font-size:clamp(20px,5.6vw,28px);line-height:1.5;} #hh-learn.lb .l2-res .bt{max-width:100%;} #hh-learn.lb .l2-res .bt .l2-b{white-space:normal;max-width:100%;text-align:center;line-height:1.6;height:auto;}",
"#hh-learn #lb-cats{flex-wrap:wrap;max-width:100%;min-width:0;}"
].join('\n');
})();
