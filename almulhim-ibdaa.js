/* ============================================================
   المُلهم التعليمي — إبداع · استوديو الألعاب التعليمية (المرحلة الأولى)
   almulhimedu.org
   ------------------------------------------------------------
   الرف (القوالب) · ألعابي · المحرر المضمّن بحفظ تلقائي
   البيانات: محلياً hh_ib_games فوراً ثم Firestore /games (المالك فقط)
   التشغيل المباشر في almulhim-live.js (hhLiveHost)
   ============================================================ */
(function(){
'use strict';

var C={m:'#4A0B1E',m2:'#5E0E26',r:'#8A1538',g:'#B8924A',g2:'#EAD9B0',iv:'#FFFDF8',ink:'#3D0918',mute:'#8A7A63',green:'#3D6B53',blue:'#1F4E79'};
var _ib={ games:[], sessions:[], view:'rack', gameId:null, qIdx:0, saveT:null, dirty:false, loaded:false };

var TEMPLATES=[
  {id:'race', name:'سباق المُلهم المباشر', kind:'live', ready:true, ico:'bolt', bg:'linear-gradient(135deg,#8A1538,#5E0E26)', desc:'باركود وهواتف الطلاب، نقاط بالسرعة، سؤال بدرجة مضاعفة، إخفاء الترتيب حتى النهاية.'},
  {id:'tf', name:'صح أم خطأ السريع', kind:'live', ready:true, ico:'check', bg:'linear-gradient(135deg,#3D6B53,#2C5340)', desc:'جولات خاطفة من عبارات صح أو خطأ، زمن قصير، مناسبة لتهيئة الحصة.'},
  {id:'weekly', name:'تحدي الأسبوع', kind:'async', ready:false, ico:'target', bg:'linear-gradient(135deg,#4A0B1E,#2A0810)', desc:'اختبار برابط ومهلة، يُحل من البيت، والنتائج تدخل ملف الطالب ودفتر المتابعة.'},
  {id:'cloud', name:'سحابة الكلمات', kind:'live', ready:false, ico:'cloud', bg:'linear-gradient(135deg,#8A6D2E,#5c4816)', desc:'سؤال مفتوح تتجمع إجاباته سحابةً على الشاشة. للعصف الذهني والتقويم القبلي.'},
  {id:'order', name:'رتّب وصنّف', kind:'live', ready:false, ico:'sort', bg:'linear-gradient(135deg,#1F4E79,#132f4a)', desc:'سحب العناصر لترتيب زمني أو تصنيف في مجموعات. للتاريخ والجغرافيا.'},
  {id:'cards', name:'بطاقات المراجعة', kind:'async', ready:false, ico:'grid', bg:'linear-gradient(135deg,#7A1330,#4A0B1E)', desc:'بطاقات مصطلحات من الدرس يراجعها الطالب بنظام التكرار المتباعد.'}
];

function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function toastX(m,k){ if(typeof toast==='function') toast(m,k||'info'); }
function uid(){ try{ return (firebase.auth().currentUser||{}).uid||''; }catch(e){ return ''; } }
function db(){ return firebase.firestore(); }
function canUse(){ try{ return (typeof hhIsAdmin==='function'&&hhIsAdmin()) || (typeof _hhMyRole!=='undefined'&&_hhMyRole==='teacher'); }catch(e){ return false; } }
function newId(p){ return (p||'g')+'_'+Date.now().toString(36)+Math.random().toString(36).slice(2,6); }
function ico(n,sz){
  var P={bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',check:'<path d="M20 6L9 17l-5-5"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>',
    cloud:'<path d="M7 18a4 4 0 0 1-.5-8 6 6 0 0 1 11.5 2h.5a3 3 0 0 1 0 6z"/>',sort:'<path d="M8 4v16M8 20l-3-3M8 20l3-3M16 20V4M16 4l-3 3M16 4l3 3"/>',grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',back:'<path d="M9 5l7 7-7 7"/>',play:'<path d="M6 4l14 8-14 8z"/>',edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',up:'<path d="M12 19V5M5 12l7-7 7 7"/>',down:'<path d="M12 5v14M19 12l-7 7-7-7"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    import:'<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',star:'<path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.5 5.7 21l1.5-7L2 9.3l7-.8z"/>',x:'<path d="M18 6L6 18M6 6l12 12"/>',pause:'<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',save:'<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>'};
  var s=sz||16; return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+(P[n]||'')+'</svg>';
}

/* ── التخزين ── */
function loadLocal(){ try{ _ib.games=JSON.parse(localStorage.getItem('hh_ib_games')||'[]')||[]; }catch(e){ _ib.games=[]; } }
function saveLocal(){ try{ localStorage.setItem('hh_ib_games', JSON.stringify(_ib.games)); }catch(e){} }
async function loadCloud(){
  var u=uid(); if(!u) return;
  try{
    var qs=await db().collection('games').where('ownerUid','==',u).get();
    var cloud=[]; qs.forEach(function(d){ var g=d.data(); g.id=d.id; cloud.push(g); });
    // دمج: الأحدث يفوز
    var map={}; _ib.games.forEach(function(g){ map[g.id]=g; });
    cloud.forEach(function(g){ if(!map[g.id] || (g.updatedAt||0)>=(map[g.id].updatedAt||0)) map[g.id]=g; });
    _ib.games=Object.keys(map).map(function(k){ return map[k]; });
    saveLocal();
  }catch(e){ console.warn('ibdaa cloud:', e&&e.code); }
  try{
    var ss=await db().collection('game_sessions').where('hostUid','==',u).get();
    _ib.sessions=[]; ss.forEach(function(d){ var s=d.data(); s.code=d.id; _ib.sessions.push(s); });
    _ib.sessions.sort(function(a,b){ return (b.updatedAt||b.createdAt||0)-(a.updatedAt||a.createdAt||0); });
  }catch(e){}
}
function getGame(id){ return _ib.games.filter(function(g){ return g.id===id; })[0]||null; }
function persist(g, now){
  g.updatedAt=Date.now(); saveLocal(); markDirty();
  clearTimeout(_ib.saveT);
  var doIt=async function(){
    var u=uid();
    if(!u){ var e0=document.getElementById('ib-save'); if(e0){ e0.textContent='حُفظ على الجهاز · سجّل الدخول للمزامنة'; e0.style.color='#8A6D2E'; } return; }
    try{ g.ownerUid=u; try{ g.ownerEmail=firebase.auth().currentUser.email||''; }catch(e){}
      await db().collection('games').doc(g.id).set(g,{merge:false}); markSaved(); }
    catch(e){ markSaved(true, (e&&e.code)); }
  };
  if(now) doIt(); else _ib.saveT=setTimeout(doIt, 500);
}
function markDirty(){ var e=document.getElementById('ib-save'); if(e){ e.textContent='جارٍ الحفظ…'; e.style.color='#8A6D2E'; } }
function markSaved(err, code){ var e=document.getElementById('ib-save'); if(e){ e.textContent=err?('حُفظ على الجهاز · تعذّرت المزامنة'+(code&&code.indexOf('permission')>-1?' (انشر قاعدة Firestore)':'')):'حُفظ ✓'; e.style.color=err?'#c0392b':'#3D6B53'; } }

/* ── الأنماط ── */
function style(){
  if(document.getElementById('hh-ib-style')) return;
  var st=document.createElement('style'); st.id='hh-ib-style';
  st.textContent=
   '#hh-ib{position:fixed;inset:0;background:linear-gradient(180deg,#F6F1E7,#EFE7D6);z-index:99990;overflow-y:auto;direction:rtl;font-family:Cairo,Tajawal,sans-serif;color:#3D0918;}'
  +'#hh-ib .top{background:linear-gradient(175deg,#4A0B1E,#5E0E26);border-bottom:2px solid #B8924A;box-shadow:0 3px 14px rgba(61,9,24,.3);padding:10px 16px;display:flex;align-items:center;justify-content:space-between;gap:10px;position:sticky;top:0;z-index:5;color:#EAD9B0;}'
  +'#hh-ib .top b{color:#FFFDF8;font-size:1rem;} #hh-ib .top small{display:block;font-size:.64rem;color:#D4BC85;font-weight:700;}'
  +'#hh-ib .tb{background:rgba(212,188,133,.12);border:1px solid rgba(212,188,133,.5);border-radius:9px;height:34px;padding:0 13px;color:#F5E6C4;font-weight:800;font-size:.78rem;cursor:pointer;font-family:Cairo;display:inline-flex;align-items:center;gap:6px;}'
  +'#hh-ib .tb.gold{background:linear-gradient(135deg,#EAD9B0,#B8924A);border-color:#FDF3DD;color:#2a0810;}'
  +'#hh-ib .wrap{max-width:1240px;margin:0 auto;padding:16px;}'
  +'#hh-ib .tabs{display:flex;gap:8px;margin:0 0 14px;flex-wrap:wrap;} #hh-ib .tabs button{background:#fff;border:1.5px solid #B8924A;color:#8A6D2E;border-radius:99px;padding:6px 16px;font-weight:800;font-size:.76rem;cursor:pointer;font-family:Cairo;} #hh-ib .tabs button.on{background:#5E0E26;color:#EAD9B0;border-color:#5E0E26;}'
  +'#hh-ib .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;}'
  +'#hh-ib .card{background:#FFFDF8;border:1.5px solid #B8924A;border-radius:18px;overflow:hidden;box-shadow:0 8px 22px rgba(94,14,38,.08);display:flex;flex-direction:column;}'
  +'#hh-ib .card .hd{height:96px;display:flex;align-items:center;justify-content:center;color:#EAD9B0;position:relative;} #hh-ib .card .hd small{position:absolute;top:10px;left:12px;font-size:.6rem;font-weight:900;background:rgba(0,0,0,.3);border:1px solid rgba(234,217,176,.5);border-radius:99px;padding:3px 10px;}'
  +'#hh-ib .card .bd{padding:12px 14px;flex:1;display:flex;flex-direction:column;} #hh-ib .card b{font-size:.98rem;} #hh-ib .card p{margin:4px 0 10px;color:#6b5a48;font-size:.72rem;line-height:1.7;font-weight:700;flex:1;}'
  +'#hh-ib .row{display:flex;gap:6px;} #hh-ib .btn{flex:1;text-align:center;border-radius:10px;padding:8px;font-size:.74rem;font-weight:900;cursor:pointer;font-family:Cairo;border:1.5px solid #B8924A;background:#fff;color:#8A6D2E;}'
  +'#hh-ib .btn.p{background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border-color:#8A1538;} #hh-ib .btn.g{background:linear-gradient(135deg,#3D6B53,#2C5340);color:#fff;border-color:#2C5340;} #hh-ib .btn.d{border-color:#c0392b;color:#c0392b;} #hh-ib .btn:disabled{opacity:.45;cursor:default;}'
  +'#hh-ib .sec{margin:18px 0 8px;font-weight:900;color:#5E0E26;font-size:.95rem;display:flex;align-items:center;gap:8px;} #hh-ib .sec::before{content:"";width:5px;height:20px;background:linear-gradient(#EAD9B0,#B8924A);border-radius:9px;}'
  +'#hh-ib .line{background:#fff;border:1px solid #EAE0CA;border-radius:12px;padding:10px 14px;display:flex;align-items:center;gap:10px;font-size:.76rem;font-weight:800;margin-bottom:6px;flex-wrap:wrap;} #hh-ib .line .t{flex:1;min-width:200px;} #hh-ib .line .sb{display:block;color:#8A7A63;font-size:.64rem;font-weight:700;}'
  +'#hh-ib .pill{border-radius:99px;padding:2px 10px;font-size:.6rem;font-weight:900;} #hh-ib .pill.live{background:#E6F2EA;color:#2C5340;} #hh-ib .pill.pause{background:#FDF3DD;color:#8A6D2E;} #hh-ib .pill.done{background:#EDE7DA;color:#8a7a63;} #hh-ib .pill.draft{background:#F7ECEF;color:#8A1538;}'
  +'#hh-ib .empty{background:#FFFDF8;border:1.5px dashed #B8924A;border-radius:16px;padding:26px;text-align:center;color:#8A6D2E;font-weight:800;line-height:1.9;}'
  /* المحرر */
  +'#hh-ib .ed{display:grid;grid-template-columns:340px 1fr;gap:14px;align-items:start;} @media(max-width:900px){#hh-ib .ed{grid-template-columns:1fr;}}'
  +'#hh-ib .pane{background:#FFFDF8;border:1.5px solid #B8924A;border-radius:16px;overflow:hidden;} #hh-ib .pane .ph{background:linear-gradient(135deg,#4A0B1E,#5E0E26);color:#EAD9B0;padding:9px 14px;font-weight:900;font-size:.82rem;display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #B8924A;}'
  +'#hh-ib .ql{max-height:70vh;overflow-y:auto;padding:8px;} #hh-ib .qi{display:flex;align-items:center;gap:8px;padding:8px 10px;border:1.5px solid #EAE0CA;border-radius:11px;margin-bottom:6px;cursor:pointer;background:#fff;font-size:.74rem;font-weight:800;} #hh-ib .qi.on{border-color:#8A1538;background:#F7ECEF;} #hh-ib .qi .n{width:24px;height:24px;border-radius:8px;background:#5E0E26;color:#EAD9B0;display:flex;align-items:center;justify-content:center;font-size:.66rem;flex-shrink:0;} #hh-ib .qi .tx{flex:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;} #hh-ib .qi .tg{font-size:.58rem;color:#8A6D2E;background:#FDF3DD;border-radius:6px;padding:1px 6px;flex-shrink:0;} #hh-ib .qi .tg.x2{background:#5E0E26;color:#EAD9B0;}'
  +'#hh-ib .f{margin-bottom:10px;} #hh-ib .f label{display:block;font-size:.72rem;font-weight:800;color:#5E0E26;margin-bottom:4px;} #hh-ib .f input,#hh-ib .f textarea,#hh-ib .f select{width:100%;border:1.5px solid #B8924A;border-radius:10px;padding:8px 11px;font-family:Cairo;font-size:.84rem;color:#3D0918;background:#fff;box-sizing:border-box;} #hh-ib .f textarea{min-height:70px;resize:vertical;}'
  +'#hh-ib .opt{display:flex;align-items:center;gap:8px;margin-bottom:7px;} #hh-ib .opt i{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;color:#fff;font-style:normal;font-weight:900;flex-shrink:0;} #hh-ib .opt input[type=text]{flex:1;border:1.5px solid #B8924A;border-radius:10px;padding:7px 10px;font-family:Cairo;font-size:.82rem;} #hh-ib .opt label.ok{display:flex;align-items:center;gap:4px;font-size:.66rem;font-weight:800;color:#3D6B53;white-space:nowrap;}'
  +'#hh-ib .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;} #hh-ib .g2{display:grid;grid-template-columns:1fr 1fr;gap:8px;}'
  +'#hh-ib .chip{display:inline-flex;align-items:center;gap:6px;border:1.5px solid #B8924A;border-radius:99px;padding:5px 12px;font-size:.7rem;font-weight:800;cursor:pointer;color:#8A6D2E;background:#fff;} #hh-ib .chip.on{background:#5E0E26;color:#EAD9B0;border-color:#5E0E26;}'
  +'#hh-ib .hint{font-size:.64rem;color:#8A7A63;font-weight:700;line-height:1.7;}'
  +'#hh-ib .undo{position:fixed;bottom:18px;left:50%;transform:translateX(-50%);background:#2A0810;color:#EAD9B0;border:1px solid #B8924A;border-radius:12px;padding:10px 16px;font-weight:800;font-size:.76rem;z-index:99999;display:flex;gap:12px;align-items:center;} #hh-ib .undo button{background:#EAD9B0;color:#2A0810;border:none;border-radius:8px;padding:5px 12px;font-family:Cairo;font-weight:900;cursor:pointer;}';
  document.head.appendChild(st);
}

/* ── الفتح ── */
async function open(view, gameId){
  style();
  try{ document.body.classList.add('hh-immersive'); }catch(e){}
  if(!canUse()){ toastX('إبداع متاح للمعلم المعتمد والمدير بعد تسجيل الدخول','info'); }
  var old=document.getElementById('hh-ib'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-ib';
  ov.innerHTML='<div class="top"><button class="tb" onclick="hhIbBack()">'+ico('back')+' رجوع</button><div style="text-align:center;"><b>إبداع · استوديو الألعاب التعليمية</b><small>أنشئ لعبة من القوالب، اضبطها، شغّلها مباشرة</small></div><span id="ib-save" style="font-size:.7rem;font-weight:800;color:#D4BC85;min-width:90px;text-align:left;"></span></div><div class="wrap" id="ib-body"></div>';
  document.body.appendChild(ov);
  loadLocal();
  _ib.view=view||'rack'; _ib.gameId=gameId||null;
  render();
  if(!_ib.loaded){ await loadCloud(); _ib.loaded=true; render(); }
}
function close(){ var e=document.getElementById('hh-ib'); if(e) e.remove(); try{ document.body.classList.remove('hh-immersive'); }catch(e){} }
window.hhIbBack=function(){ if(_ib.view==='editor'){ _ib.view='mine'; render(); } else close(); };

function render(){
  var b=document.getElementById('ib-body'); if(!b) return;
  var tabs='<div class="tabs">'+[['rack','القوالب'],['mine','ألعابي'],['live','مباشرة'],['async','غير مباشرة']].map(function(t){ return '<button class="'+(_ib.view===t[0]?'on':'')+'" onclick="hhIbView(\''+t[0]+'\')">'+t[1]+'</button>'; }).join('')+'</div>';
  if(_ib.view==='editor'){ b.innerHTML=renderEditor(); bindEditor(); return; }
  if(_ib.view==='mine'){ b.innerHTML=tabs+renderMine(); return; }
  var kind=(_ib.view==='live')?'live':(_ib.view==='async')?'async':null;
  b.innerHTML=tabs+'<div class="grid">'+TEMPLATES.filter(function(t){ return !kind||t.kind===kind; }).map(function(t){
    return '<div class="card"><div class="hd" style="background:'+t.bg+'"><small>'+(t.kind==='live'?'مباشرة':'غير مباشرة')+'</small>'+ico(t.ico,40)+'</div><div class="bd"><b>'+esc(t.name)+'</b><p>'+esc(t.desc)+'</p><div class="row">'
      +(t.ready?'<button class="btn p" onclick="hhIbCreate(\''+t.id+'\')">'+ico('plus',14)+' إنشاء</button>':'<button class="btn" disabled>المرحلة القادمة</button>')
      +'</div></div></div>';
  }).join('')+'<div class="card"><div class="hd" style="background:repeating-linear-gradient(45deg,#EFE7D6,#EFE7D6 10px,#F6F1E7 10px,#F6F1E7 20px);border-bottom:2px dashed #B8924A;color:#8A6D2E;">'+ico('plus',40)+'</div><div class="bd"><b>قالب جديد</b><p>مساحة للأفكار القادمة: ألغاز الخريطة، البحث عن الكنز، الجدار التعاوني.</p><div class="row"><button class="btn" onclick="hhIbSuggest()">اقترح فكرة</button></div></div></div></div>';
}
window.hhIbView=function(v){ _ib.view=v; render(); };
window.hhIbSuggest=function(){ toastX('أرسل فكرتك لفريق المُلهم من صفحة التواصل، وستُضاف كقالب عند نضجها','info'); };

function renderMine(){
  var games=_ib.games.slice().sort(function(a,b){ return (b.updatedAt||0)-(a.updatedAt||0); });
  var html='<div class="sec">ألعابي · '+games.length+'</div>';
  if(!games.length) html+='<div class="empty">لا ألعاب بعد.<br>ابدأ من القوالب وأنشئ أول لعبة.</div>';
  games.forEach(function(g){
    var t=TEMPLATES.filter(function(x){ return x.id===g.template; })[0]||{};
    var n=(g.questions||[]).length; var st=g.status||'draft';
    html+='<div class="line"><span class="t">'+esc(g.title||'بلا عنوان')+'<span class="sb">'+esc(t.name||'')+' · '+n+' سؤالاً · '+new Date(g.updatedAt||Date.now()).toLocaleDateString('en-GB')+'</span></span>'
      +'<span class="pill '+(st==='ready'?'live':'draft')+'">'+(st==='ready'?'جاهزة':'مسودة')+'</span>'
      +'<button class="btn g" style="flex:0 0 auto;" '+(n?'':'disabled')+' onclick="hhIbRun(\''+g.id+'\')">'+ico('play',13)+' تشغيل مباشر</button>'
      +'<button class="btn" style="flex:0 0 auto;" onclick="hhIbEdit(\''+g.id+'\')">'+ico('edit',13)+' تعديل</button>'
      +'<button class="btn" style="flex:0 0 auto;" onclick="hhIbDup(\''+g.id+'\')">'+ico('copy',13)+' نسخ</button>'
      +'<button class="btn d" style="flex:0 0 auto;" onclick="hhIbDel(\''+g.id+'\')">'+ico('trash',13)+'</button></div>';
  });
  var sess=_ib.sessions.filter(function(s){ return s.state!=='ended'; });
  html+='<div class="sec">جولات يمكن إكمالها · '+sess.length+'</div>';
  if(!sess.length) html+='<div class="empty" style="padding:16px;">لا جولات متوقفة. أي جولة مباشرة تُوقفها تُحفظ هنا بنقاطها لتُستأنف لاحقاً.</div>';
  sess.forEach(function(s){
    html+='<div class="line"><span class="t">'+esc(s.title||'')+' · الرمز <b dir="ltr">'+esc(s.code)+'</b><span class="sb">السؤال '+((s.qIndex||0)+1)+' من '+(s.total||'؟')+' · '+(s.playersCount||0)+' لاعباً</span></span>'
      +'<span class="pill '+(s.state==='paused'?'pause':'live')+'">'+(s.state==='paused'?'متوقفة مؤقتاً':s.state==='lobby'?'في الانتظار':'جارية')+'</span>'
      +'<button class="btn g" style="flex:0 0 auto;" onclick="hhLiveResume(\''+esc(s.code)+'\')">'+ico('play',13)+' إكمال</button>'
      +'<button class="btn d" style="flex:0 0 auto;" onclick="hhLiveEndSession(\''+esc(s.code)+'\')">إنهاء</button></div>';
  });
  var done=_ib.sessions.filter(function(s){ return s.state==='ended'; }).slice(0,8);
  if(done.length){ html+='<div class="sec">جولات منتهية</div>'; done.forEach(function(s){ html+='<div class="line"><span class="t">'+esc(s.title||'')+'<span class="sb">'+(s.playersCount||0)+' لاعباً · '+new Date(s.updatedAt||s.createdAt||0).toLocaleDateString('en-GB')+'</span></span><span class="pill done">منتهية</span><button class="btn" style="flex:0 0 auto;" onclick="hhLiveResults(\''+esc(s.code)+'\')">النتائج</button></div>'; }); }
  return html;
}

/* ── إنشاء وحذف ونسخ ── */
window.hhIbCreate=function(tid){
  if(!canUse()){ toastX('سجّل الدخول بحساب المعلم أولاً','error'); return; }
  var t=TEMPLATES.filter(function(x){ return x.id===tid; })[0]; if(!t||!t.ready) return;
  var g={ id:newId('g'), template:tid, title:t.name+' · '+new Date().toLocaleDateString('en-GB'), status:'draft', createdAt:Date.now(), updatedAt:Date.now(),
    settings:{ hideRank:'last', hideLastN:5, scoring:'speed', shuffleQ:false, shuffleOpts:true, showAnswerEach:true, defaultTime:(tid==='tf'?10:20) }, questions:[] };
  _ib.games.push(g); persist(g,true); _ib.gameId=g.id; _ib.qIdx=0; _ib.view='editor'; render();
  addQuestion();
};
window.hhIbEdit=function(id){ _ib.gameId=id; _ib.qIdx=0; _ib.view='editor'; render(); };
window.hhIbDup=function(id){ var g=getGame(id); if(!g) return; var c=JSON.parse(JSON.stringify(g)); c.id=newId('g'); c.title=g.title+' (نسخة)'; c.createdAt=Date.now(); c.status='draft'; _ib.games.push(c); persist(c,true); render(); toastX('نُسخت اللعبة','success'); };
window.hhIbDel=function(id){
  var g=getGame(id); if(!g) return;
  var idx=_ib.games.indexOf(g); _ib.games.splice(idx,1); saveLocal(); render();
  undoBar('حُذفت «'+(g.title||'')+'»', function(){ _ib.games.splice(idx,0,g); saveLocal(); render(); }, function(){ try{ db().collection('games').doc(id).delete(); }catch(e){} });
};
function undoBar(msg, onUndo, onCommit){
  var old=document.querySelector('#hh-ib .undo'); if(old) old.remove();
  var d=document.createElement('div'); d.className='undo'; d.innerHTML='<span>'+esc(msg)+'</span><button>تراجع</button>';
  var done=false; var t=setTimeout(function(){ if(done) return; done=true; d.remove(); onCommit&&onCommit(); },5000);
  d.querySelector('button').onclick=function(){ if(done) return; done=true; clearTimeout(t); d.remove(); onUndo&&onUndo(); };
  var host=document.getElementById('hh-ib'); if(host) host.appendChild(d);
}
window.hhIbRun=function(id){ var g=getGame(id); if(!g||!(g.questions||[]).length){ toastX('أضف أسئلة أولاً','info'); return; } if(!uid()){ toastX('سجّل الدخول بحساب المعلم لبدء جولة مباشرة','error'); return; } if(typeof hhLiveHost==='function'){ close(); hhLiveHost(g); } else toastX('وحدة التشغيل المباشر غير محمّلة · تأكد من رفع almulhim-live.js','error'); };

/* ── المحرر ── */
var LET=['أ','ب','ج','د']; var OC=['#8A1538','#3D6B53','#8A6D2E','#1F4E79']; var OS=['◆','●','▲','■'];
function blankQ(g){ var tf=(g.template==='tf'); return { id:newId('q'), type:tf?'tf':'mcq', q:'', opts:tf?['صح','خطأ']:['','','',''], correct:[0], time:(g.settings&&g.settings.defaultTime)||20, mult:1, flash:false, note:'' }; }
function addQuestion(){ var g=getGame(_ib.gameId); if(!g) return; g.questions=g.questions||[]; g.questions.push(blankQ(g)); _ib.qIdx=g.questions.length-1; persist(g); render(); setTimeout(function(){ var e=document.getElementById('ibq-text'); if(e) e.focus(); },50); }
window.hhIbAddQ=addQuestion;
window.hhIbSel=function(i){ _ib.qIdx=i; render(); };
window.hhIbMove=function(i,d){ var g=getGame(_ib.gameId); var qs=g.questions; var j=i+d; if(j<0||j>=qs.length) return; var t=qs[i]; qs[i]=qs[j]; qs[j]=t; _ib.qIdx=j; persist(g); render(); };
window.hhIbDelQ=function(i){ var g=getGame(_ib.gameId); var q=g.questions.splice(i,1)[0]; _ib.qIdx=Math.max(0,Math.min(i,g.questions.length-1)); persist(g); render(); undoBar('حُذف السؤال', function(){ g.questions.splice(i,0,q); _ib.qIdx=i; persist(g); render(); }); };
window.hhIbDupQ=function(i){ var g=getGame(_ib.gameId); var c=JSON.parse(JSON.stringify(g.questions[i])); c.id=newId('q'); g.questions.splice(i+1,0,c); _ib.qIdx=i+1; persist(g); render(); };

function renderEditor(){
  var g=getGame(_ib.gameId); if(!g) return '<div class="empty">اللعبة غير موجودة</div>';
  var qs=g.questions||[]; var q=qs[_ib.qIdx]; var S=g.settings||{};
  var list=qs.map(function(x,i){ return '<div class="qi '+(i===_ib.qIdx?'on':'')+'" onclick="hhIbSel('+i+')"><span class="n">'+(i+1)+'</span><span class="tx">'+esc(x.q||'(سؤال فارغ)')+'</span>'+(x.mult>1?'<span class="tg x2">×'+x.mult+'</span>':'')+(x.flash?'<span class="tg">برق</span>':'')+'<span class="tg">'+(x.type==='tf'?'صح/خطأ':'اختيار')+'</span></div>'; }).join('');
  var left='<div class="pane"><div class="ph"><span>الأسئلة · '+qs.length+'</span><span style="display:flex;gap:6px;"><button class="tb" style="height:28px;padding:0 10px;font-size:.7rem;" onclick="hhIbImport()">'+ico('import',13)+' استيراد</button><button class="tb gold" style="height:28px;padding:0 10px;font-size:.7rem;" onclick="hhIbAddQ()">'+ico('plus',13)+' سؤال</button></span></div><div class="ql">'+(list||'<div class="hint" style="padding:10px;">لا أسئلة بعد</div>')+'</div></div>';
  var head='<div class="pane" style="margin-bottom:12px;"><div class="ph"><span>اللعبة</span><span style="display:flex;gap:6px;"><button class="tb" style="height:28px;padding:0 10px;font-size:.7rem;" onclick="hhIbSettings()">'+ico('gear',13)+' الإعدادات</button><button class="tb gold" style="height:28px;padding:0 10px;font-size:.7rem;" onclick="hhIbRun(\''+g.id+'\')">'+ico('play',13)+' تشغيل مباشر</button></span></div><div style="padding:12px 14px;"><div class="f" style="margin:0;"><label>عنوان اللعبة</label><input id="ibg-title" value="'+esc(g.title||'')+'"></div>'
    +'<div id="ibg-settings" style="display:none;margin-top:12px;border-top:1px dashed #EAD9B0;padding-top:12px;">'
    +(g.template==='race'?'<div class="f"><label>نمط اللعبة</label><select id="ibs-mode"><option value="classic"'+((S.mode||'classic')==='classic'?' selected':'')+'>سباق كلاسيكي (نقاط بالسرعة)</option><option value="market"'+(S.mode==='market'?' selected':'')+'>السوق · اقتصاد (عملات وتعزيزات: مضاعف، درع، سطو)</option></select><div class="hint">في نمط السوق يفتح بين الأسئلة سوقٌ يشتري فيه اللاعب بعملاته: مضاعف ×2، درع يصدّ السطو، أو سطو 15% من محفظة المتصدر.</div></div>':'')
    +'<div class="g3"><div class="f"><label>الترتيب</label><select id="ibs-hide"><option value="never"'+(S.hideRank==='never'?' selected':'')+'>يظهر بعد كل سؤال</option><option value="last"'+(S.hideRank==='last'?' selected':'')+'>يُخفى في الأسئلة الأخيرة</option><option value="always"'+(S.hideRank==='always'?' selected':'')+'>مخفي حتى النهاية</option></select></div>'
    +'<div class="f"><label>عدد الأسئلة الأخيرة المخفية</label><input id="ibs-n" type="number" min="1" max="20" value="'+(S.hideLastN||5)+'"></div>'
    +'<div class="f"><label>النقاط</label><select id="ibs-scoring"><option value="speed"'+(S.scoring==='speed'?' selected':'')+'>بالسرعة (حتى 1000)</option><option value="fixed"'+(S.scoring==='fixed'?' selected':'')+'>ثابتة (1000 للصحيح)</option></select></div></div>'
    +'<div class="g3"><div class="f"><label>ترتيب الأسئلة</label><select id="ibs-shq"><option value="0"'+(!S.shuffleQ?' selected':'')+'>ثابت</option><option value="1"'+(S.shuffleQ?' selected':'')+'>عشوائي</option></select></div>'
    +'<div class="f"><label>خلط البدائل لكل جهاز</label><select id="ibs-sho"><option value="1"'+(S.shuffleOpts!==false?' selected':'')+'>نعم</option><option value="0"'+(S.shuffleOpts===false?' selected':'')+'>لا</option></select></div>'
    +'<div class="f"><label>إظهار الإجابة الصحيحة</label><select id="ibs-show"><option value="1"'+(S.showAnswerEach!==false?' selected':'')+'>بعد كل سؤال</option><option value="0"'+(S.showAnswerEach===false?' selected':'')+'>في النهاية فقط</option></select></div></div>'
    +'<div class="hint">الكشف الختامي تصاعدي دائماً: الخامس ثم الرابع حتى الأول.</div></div></div></div>';
  var body;
  if(!q){ body='<div class="empty">أضف أول سؤال من الزر أعلاه.</div>'; }
  else{
    var opts=(q.type==='tf')?['صح','خطأ']:(q.opts||['','','','']);
    body='<div class="pane"><div class="ph"><span>السؤال '+(_ib.qIdx+1)+'</span><span style="display:flex;gap:6px;"><button class="tb" style="height:28px;padding:0 8px;" title="أعلى" onclick="hhIbMove('+_ib.qIdx+',-1)">'+ico('up',13)+'</button><button class="tb" style="height:28px;padding:0 8px;" title="أسفل" onclick="hhIbMove('+_ib.qIdx+',1)">'+ico('down',13)+'</button><button class="tb" style="height:28px;padding:0 8px;" title="نسخ" onclick="hhIbDupQ('+_ib.qIdx+')">'+ico('copy',13)+'</button><button class="tb" style="height:28px;padding:0 8px;color:#f5b7b1;" title="حذف" onclick="hhIbDelQ('+_ib.qIdx+')">'+ico('trash',13)+'</button></span></div><div style="padding:12px 14px;">'
    +'<div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;"><span class="chip '+(q.type==='mcq'?'on':'')+'" onclick="hhIbQType(\'mcq\')">اختيار من متعدد</span><span class="chip '+(q.type==='tf'?'on':'')+'" onclick="hhIbQType(\'tf\')">صح أم خطأ</span></div>'
    +'<div class="f"><label>نص السؤال</label><textarea id="ibq-text" placeholder="اكتب السؤال كما سيظهر على الشاشة">'+esc(q.q||'')+'</textarea></div>'
    +'<div class="f"><label>البدائل · علّم الصحيح (يمكن أكثر من واحد)</label>'+opts.map(function(o,i){ return '<div class="opt"><i style="background:'+OC[i]+'">'+OS[i]+'</i><input type="text" id="ibq-o'+i+'" value="'+esc(o)+'" placeholder="البديل '+LET[i]+'" '+(q.type==='tf'?'readonly':'')+'><label class="ok"><input type="checkbox" id="ibq-c'+i+'" '+((q.correct||[]).indexOf(i)>-1?'checked':'')+'> صحيح</label></div>'; }).join('')+'</div>'
    +'<div class="g3"><div class="f"><label>الزمن (ثانية)</label><select id="ibq-time">'+[5,8,10,15,20,30,45,60,90,120].map(function(t){ return '<option value="'+t+'"'+(q.time==t?' selected':'')+'>'+t+'</option>'; }).join('')+'</select></div>'
    +'<div class="f"><label>مضاعف النقاط</label><select id="ibq-mult"><option value="1"'+(q.mult==1?' selected':'')+'>عادي ×1</option><option value="2"'+(q.mult==2?' selected':'')+'>مضاعف ×2</option><option value="3"'+(q.mult==3?' selected':'')+'>ثلاثي ×3</option></select></div>'
    +'<div class="f"><label>سؤال البرق</label><select id="ibq-flash"><option value="0"'+(!q.flash?' selected':'')+'>لا</option><option value="1"'+(q.flash?' selected':'')+'>نعم · نصف الزمن وضعف النقاط</option></select></div></div>'
    +'<div class="f"><label>شرح يظهر بعد الكشف (اختياري)</label><input id="ibq-note" value="'+esc(q.note||'')+'" placeholder="لماذا هذه الإجابة صحيحة"></div>'
    +'<div class="hint">الحفظ تلقائي أثناء الكتابة. Ctrl+Enter يضيف سؤالاً جديداً.</div></div></div>';
  }
  return '<div class="ed">'+left+'<div>'+head+body+'</div></div>';
}
function bindEditor(){
  var g=getGame(_ib.gameId); if(!g) return; var q=(g.questions||[])[_ib.qIdx];
  var on=function(id,ev,fn){ var e=document.getElementById(id); if(e) e.addEventListener(ev,fn); };
  on('ibg-title','input',function(e){ g.title=e.target.value; persist(g); });
  ['ibs-hide','ibs-n','ibs-scoring','ibs-shq','ibs-sho','ibs-show','ibs-mode'].forEach(function(id){ on(id,'change',function(){ readSettings(g); persist(g); }); });
  if(!q) return;
  on('ibq-text','input',function(e){ q.q=e.target.value; persist(g); syncListItem(); });
  on('ibq-text','keydown',function(e){ if(e.ctrlKey&&e.key==='Enter'){ e.preventDefault(); addQuestion(); } });
  for(var i=0;i<4;i++){ (function(i){ on('ibq-o'+i,'input',function(e){ q.opts=q.opts||['','','','']; q.opts[i]=e.target.value; persist(g); }); on('ibq-c'+i,'change',function(){ q.correct=[]; for(var k=0;k<4;k++){ var c=document.getElementById('ibq-c'+k); if(c&&c.checked) q.correct.push(k); } if(!q.correct.length){ q.correct=[i]; var c2=document.getElementById('ibq-c'+i); if(c2) c2.checked=true; } persist(g); }); })(i); }
  on('ibq-time','change',function(e){ q.time=parseInt(e.target.value,10)||20; persist(g); });
  on('ibq-mult','change',function(e){ q.mult=parseInt(e.target.value,10)||1; persist(g); syncListItem(); });
  on('ibq-flash','change',function(e){ q.flash=e.target.value==='1'; persist(g); syncListItem(); });
  on('ibq-note','input',function(e){ q.note=e.target.value; persist(g); });
}
function readSettings(g){ var v=function(id){ var e=document.getElementById(id); return e?e.value:null; }; g.settings=g.settings||{}; g.settings.hideRank=v('ibs-hide')||'last'; g.settings.hideLastN=parseInt(v('ibs-n')||'5',10)||5; g.settings.scoring=v('ibs-scoring')||'speed'; g.settings.shuffleQ=v('ibs-shq')==='1'; g.settings.shuffleOpts=v('ibs-sho')!=='0'; g.settings.showAnswerEach=v('ibs-show')!=='0'; if(v('ibs-mode')!==null) g.settings.mode=v('ibs-mode'); }
function syncListItem(){ var g=getGame(_ib.gameId); var q=g.questions[_ib.qIdx]; var items=document.querySelectorAll('#hh-ib .qi'); var it=items[_ib.qIdx]; if(!it) return; it.querySelector('.tx').textContent=q.q||'(سؤال فارغ)'; var tags=it.querySelectorAll('.tg'); tags.forEach(function(t){ t.remove(); }); if(q.mult>1){ var s=document.createElement('span'); s.className='tg x2'; s.textContent='×'+q.mult; it.appendChild(s); } if(q.flash){ var s2=document.createElement('span'); s2.className='tg'; s2.textContent='برق'; it.appendChild(s2); } var s3=document.createElement('span'); s3.className='tg'; s3.textContent=(q.type==='tf'?'صح/خطأ':'اختيار'); it.appendChild(s3); }
window.hhIbQType=function(t){ var g=getGame(_ib.gameId); var q=g.questions[_ib.qIdx]; q.type=t; if(t==='tf'){ q.opts=['صح','خطأ']; q.correct=[(q.correct||[0])[0]<2?(q.correct||[0])[0]:0]; if(!q.time||q.time>15) q.time=10; } else { if(!q.opts||q.opts.length<4) q.opts=['','','','']; } persist(g); render(); };
window.hhIbSettings=function(){ var e=document.getElementById('ibg-settings'); if(e) e.style.display=(e.style.display==='none')?'block':'none'; };

/* ── الاستيراد من بنوك المنصة (بدائل تلقائية من الفئة نفسها، قابلة للتعديل) ── */
window.hhIbImport=function(){
  var g=getGame(_ib.gameId); if(!g) return;
  var cats=(typeof QDB==='object')?Object.keys(QDB).filter(function(c){ return (QDB[c]||[]).length>=4; }):[];
  var old=document.getElementById('ib-import'); if(old) old.remove();
  var d=document.createElement('div'); d.id='ib-import'; d.style.cssText='position:fixed;inset:0;background:rgba(42,8,16,.8);z-index:99996;display:flex;align-items:center;justify-content:center;padding:16px;direction:rtl;font-family:Cairo;';
  d.innerHTML='<div style="background:#FFFDF8;border:2px solid #B8924A;border-radius:18px;max-width:560px;width:100%;overflow:hidden;"><div class="ph" style="background:linear-gradient(135deg,#4A0B1E,#5E0E26);color:#EAD9B0;padding:11px 16px;font-weight:900;display:flex;justify-content:space-between;align-items:center;"><span>استيراد أسئلة من بنوك المُلهم</span><button onclick="document.getElementById(\'ib-import\').remove()" style="background:none;border:1px solid #B8924A;color:#EAD9B0;border-radius:8px;width:30px;height:30px;cursor:pointer;">✕</button></div><div style="padding:14px 16px;">'
   +'<div class="f"><label style="display:block;font-size:.72rem;font-weight:800;color:#5E0E26;margin-bottom:4px;">الفئة</label><select id="ibi-cat" style="width:100%;border:1.5px solid #B8924A;border-radius:10px;padding:8px;font-family:Cairo;">'+cats.map(function(c){ return '<option value="'+esc(c)+'">'+esc(c)+' ('+QDB[c].length+')</option>'; }).join('')+'</select></div>'
   +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;"><div class="f"><label style="display:block;font-size:.72rem;font-weight:800;color:#5E0E26;margin-bottom:4px;">المستوى</label><select id="ibi-diff" style="width:100%;border:1.5px solid #B8924A;border-radius:10px;padding:8px;font-family:Cairo;"><option value="">كل المستويات</option><option value="easy">200</option><option value="med">400</option><option value="hard">600</option><option value="elite">800</option><option value="legend">1000</option></select></div><div class="f"><label style="display:block;font-size:.72rem;font-weight:800;color:#5E0E26;margin-bottom:4px;">العدد</label><input id="ibi-n" type="number" value="10" min="1" max="40" style="width:100%;border:1.5px solid #B8924A;border-radius:10px;padding:8px;font-family:Cairo;"></div></div>'
   +'<div style="font-size:.66rem;color:#8A7A63;font-weight:700;line-height:1.7;margin-bottom:10px;">البدائل الخاطئة تُؤخذ من إجابات أسئلة أخرى في الفئة نفسها، وتُعدَّل من المحرر كما تشاء. الصور لا تُستورد في هذه المرحلة.</div>'
   +'<button class="btn p" style="width:100%;padding:10px;border-radius:10px;font-family:Cairo;font-weight:900;cursor:pointer;background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;" onclick="hhIbImportGo()">استيراد</button></div></div>';
  document.body.appendChild(d);
};
window.hhIbImportGo=function(){
  var g=getGame(_ib.gameId); var cat=document.getElementById('ibi-cat').value; var diff=document.getElementById('ibi-diff').value; var n=parseInt(document.getElementById('ibi-n').value,10)||10;
  var pool=(QDB[cat]||[]).filter(function(q){ return q.q&&q.a&&!q.img&&(!diff||q.diff===diff); });
  var allA=(QDB[cat]||[]).map(function(q){ return String(q.a||'').trim(); }).filter(Boolean);
  pool=pool.slice().sort(function(){ return Math.random()-.5; }).slice(0,n);
  var added=0;
  pool.forEach(function(src){
    var a=String(src.a).trim();
    // البدائل من المحور نفسه ثم المستوى نفسه ثم بقية الفئة
    var pick=function(list){ return list.map(function(q){ return String(q.a||'').trim(); }).filter(function(x){ return x && x!==a; }); };
    var same=(QDB[cat]||[]).filter(function(q){ return q!==src && src.sub!==undefined && q.sub===src.sub; });
    var others=pick(same).sort(function(){ return Math.random()-.5; }).slice(0,3);
    if(others.length<3){ var more=allA.filter(function(x){ return x!==a && others.indexOf(x)<0; }).sort(function(){ return Math.random()-.5; }); others=others.concat(more).slice(0,3); }
    while(others.length<3) others.push('');
    var opts=[a].concat(others); var order=[0,1,2,3].sort(function(){ return Math.random()-.5; }); var o2=order.map(function(i){ return opts[i]; }); var correct=[order.indexOf(0)];
    g.questions.push({ id:newId('q'), type:'mcq', q:String(src.q).replace(/^[^:]{2,20}:\s*/,''), opts:o2, correct:correct, time:(g.settings&&g.settings.defaultTime)||20, mult:1, flash:false, note:'', srcCat:cat, srcDiff:src.diff||'' }); added++;
  });
  persist(g,true); document.getElementById('ib-import').remove(); _ib.qIdx=Math.max(0,g.questions.length-added); render(); toastX('استُورد '+added+' سؤالاً · راجع البدائل','success');
};

/* ── زر «إبداع» في الشاشة الرئيسة والتنقل السفلي ── */
var IB_ICON='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.2 5.3 5.8.5-4.4 3.8 1.3 5.7L12 14.3 7.1 17.3l1.3-5.7L4 7.8l5.8-.5z"/><path d="M5 21l2-2M19 21l-2-2"/></svg>';
function injectEntry(){
  try{
    // شريط الشاشة الرئيسة: زر إبداع مستقل بجانب البرامج التربوية (لكلٍّ بابه)
    if(!document.getElementById('hh-ib-entry')){
      var ref=document.querySelector('.hh-crown-btn[onclick="hhOpenLeaderPrograms()"]') || document.querySelector('.hh-crown-btn[onclick="hhSchoolEntry()"]');
      if(ref){ var b=document.createElement('button'); b.className='hh-crown-btn'; b.id='hh-ib-entry'; b.setAttribute('onclick','hhIbOpen()'); b.innerHTML=IB_ICON+'<span>إبداع</span>'; ref.insertAdjacentElement('afterend',b); }
    }
    // شريط التنقل السفلي
    if(!document.getElementById('hh-ib-nav')){
      var nav=document.querySelector('.hh-nav-item[onclick="hhOpenLeaderPrograms()"]');
      if(nav){ var n=nav.cloneNode(true); n.id='hh-ib-nav'; n.setAttribute('onclick','hhIbOpen()'); var sp=n.querySelector('.hh-nav-label,span:last-child'); if(sp) sp.textContent='إبداع'; var ic=n.querySelector('.hh-nav-icon'); if(ic) ic.innerHTML=IB_ICON; nav.insertAdjacentElement('afterend',n); }
    }
  }catch(e){}
}
var _ibTries=0; var _ibIv=setInterval(function(){ injectEntry(); if((document.getElementById('hh-ib-entry')&&document.getElementById('hh-ib-nav')) || ++_ibTries>30) clearInterval(_ibIv); }, 800);
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', injectEntry); else injectEntry();

window.hhIbOpen=function(v,id){ open(v,id); };
window.hhIbRefresh=function(){ _ib.loaded=false; if(document.getElementById('hh-ib')) open(_ib.view); };
window._hhIb=_ib; window._hhIbTemplates=TEMPLATES; window._hhIbGetGame=getGame;
})();
