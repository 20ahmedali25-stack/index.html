/* ============================================================
   المُلهم التعليمي — إبداع، استوديو الألعاب التعليمية
   almulhimedu.org
   ------------------------------------------------------------
   القوالب، ألعاب جاهزة، ألعابي، المحرر (ثلاثة أعمدة)، الاستيراد
   طريقتا اللعب: مباشر على أجهزة الطلاب (almulhim-live.js)
                 أو على شاشة الصف بلا أجهزة (almulhim-ibdaa-screen.js)
   البيانات: محلياً hh_ib_games فوراً ثم Firestore /games (المالك فقط)
   الألعاب الجاهزة: تُبنى من فئات «العب الآن» نفسها + admin_qdb/ib_ready
   (zzzzzzbr)
   ============================================================ */
(function(){
'use strict';

var _ib={ games:[], sessions:[], view:'rack', gameId:null, qIdx:0, saveT:null, loaded:false, mtab:'edit', ready:null, readyGame:null, grade:'g7t1', readySaveT:null };

var TEMPLATES=[
  {id:'race', name:'سباق المُلهم المباشر', kind:'live', ready:true, ico:'bolt', bg:'linear-gradient(135deg,#8A1538,#5E0E26)', desc:'باركود وهواتف الطلاب، نقاط بالسرعة، سؤال بدرجة مضاعفة، إخفاء الترتيب حتى النهاية.'},
  {id:'tf', name:'صح أم خطأ السريع', kind:'live', ready:true, ico:'check', bg:'linear-gradient(135deg,#3D6B53,#2C5340)', desc:'جولات خاطفة من عبارات صح أو خطأ، زمن قصير، مناسبة لتهيئة الحصة.'},
  {id:'cloud', name:'سحابة الكلمات', kind:'live', ready:true, ico:'cloud', bg:'linear-gradient(135deg,#8A6D2E,#5c4816)', desc:'سؤال مفتوح تتجمع إجاباته سحابةً على الشاشة. للعصف الذهني والتقويم القبلي.'},
  {id:'order', name:'رتّب وصنّف', kind:'live', ready:true, ico:'sort', bg:'linear-gradient(135deg,#1F4E79,#132f4a)', desc:'سحب العناصر لترتيب زمني أو تصنيف في مجموعات. للتاريخ والجغرافيا.'},
  {id:'s-boxes', scr:'boxes', name:'صناديق الأسرار', kind:'screen', ready:true, ico:'box', bg:'linear-gradient(135deg,#8A1538,#5E0E26)', desc:'يختار الفريق رقماً فينفتح سؤال. للمراجعة السريعة.'},
  {id:'s-show', scr:'show', name:'المسابقة الكبرى', kind:'screen', ready:true, ico:'tv', bg:'linear-gradient(135deg,#1F4E79,#132f4a)', desc:'سؤال على الشاشة بأدوار للفرق ووسائل مساعدة.'},
  {id:'s-wheel', scr:'wheel', name:'عجلة الأسئلة', kind:'screen', ready:true, ico:'wheel', bg:'linear-gradient(135deg,#8A6D2E,#5c4816)', desc:'تدور العجلة وتقف على سؤال يجيب عنه الفريق.'},
  {id:'s-flip', scr:'flip', name:'البطاقات المقلوبة', kind:'screen', ready:true, ico:'flip', bg:'linear-gradient(135deg,#4A0B1E,#2A0810)', desc:'وجه البطاقة السؤال وظهرها الإجابة. تصلح للأسئلة المقالية.'},
  {id:'s-tf', scr:'tfs', name:'صح أم خطأ على الشاشة', kind:'screen', ready:true, ico:'check', bg:'linear-gradient(135deg,#3D6B53,#2C5340)', desc:'عبارات تظهر تباعاً والصف يصوّت برفع اليد.'},
  {id:'s-match', scr:'match', name:'التوصيل', kind:'screen', ready:true, ico:'link', bg:'linear-gradient(135deg,#1F4E79,#132f4a)', desc:'صل كل مصطلح بمعناه. الخطأ ينقل الدور إلى الفريق التالي.'},
  {id:'s-memory', scr:'memory', name:'بطاقات الذاكرة', kind:'screen', ready:true, ico:'grid', bg:'linear-gradient(135deg,#8A1538,#5E0E26)', desc:'يقلب الفريق بطاقتين، فإن تطابقتا بقيتا مكشوفتين واحتُسبت النقاط.'},
  {id:'s-order', scr:'order', name:'رتّب الأحداث', kind:'screen', ready:true, ico:'sort', bg:'linear-gradient(135deg,#8A6D2E,#5c4816)', desc:'رتّب الأحداث زمنياً أو الخطوات بالتسلسل الصحيح.'},
  {id:'s-odd', scr:'odd', name:'اختر الدخيل', kind:'screen', ready:true, ico:'grid', bg:'linear-gradient(135deg,#6A42A8,#46297a)', desc:'أربعة عناصر، يكتشف الفريق الدخيل بينها ويذكر السبب. اكتب العناصر الأربعة واجعل الدخيل هو الإجابة الصحيحة.'},
  {id:'s-time', scr:'time', name:'الخط الزمني', kind:'screen', ready:true, ico:'sort', bg:'linear-gradient(135deg,#C2862B,#8a5e1a)', desc:'أحداث توضع على خط الزمن من الأقدم إلى الأحدث، والخطأ ينقل الدور.'},
  {id:'s-map', scr:'map', name:'الخريطة الصامتة', kind:'screen', ready:true, ico:'globe', bg:'linear-gradient(135deg,#0E8288,#0a5a5e)', desc:'صورة خريطة بلا أسماء هي السؤال، ويختار الفريق اسم الموقع. أضف صورة لكل سؤال.'},
  {id:'weekly', name:'تحدي الأسبوع', kind:'async', ready:false, ico:'target', bg:'linear-gradient(135deg,#4A0B1E,#2A0810)', desc:'اختبار برابط ومهلة، يُحل من البيت، والنتائج تدخل ملف الطالب ودفتر المتابعة.'},
  {id:'cards', name:'بطاقات المراجعة', kind:'async', ready:false, ico:'grid', bg:'linear-gradient(135deg,#7A1330,#4A0B1E)', desc:'بطاقات مصطلحات من الدرس يراجعها الطالب بنظام التكرار المتباعد.'}
];
var SCR={ boxes:{name:'صناديق الأسرار', types:['mcq','tf','open']}, show:{name:'المسابقة الكبرى', types:['mcq','tf']}, wheel:{name:'عجلة الأسئلة', types:['mcq','tf','open']}, flip:{name:'البطاقات المقلوبة', types:['mcq','tf','open']}, tfs:{name:'صح أم خطأ على الشاشة', types:['tf']}, match:{name:'التوصيل', types:['pair']}, memory:{name:'بطاقات الذاكرة', types:['pair']}, order:{name:'رتّب الأحداث', types:['order']}, odd:{name:'اختر الدخيل', types:['mcq']}, time:{name:'الخط الزمني', types:['order']}, map:{name:'الخريطة الصامتة', types:['mcq']} };
window.HH_SCR_TPL=SCR;
var SOON_SCR='الفرز في مجموعات، الخريطة الصمّاء، الكلمة الناقصة، خمّن الكلمة';

function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function toastX(m,k){ if(typeof toast==='function') toast(m,k||'info'); }
function uid(){ try{ return (firebase.auth().currentUser||{}).uid||''; }catch(e){ return ''; } }
function db(){ return firebase.firestore(); }
function isAdm(){ try{ return typeof hhIsAdmin==='function'&&!!hhIsAdmin(); }catch(e){ return false; } }
function canUse(){ try{ return isAdm() || (typeof _hhMyRole!=='undefined'&&_hhMyRole==='teacher'); }catch(e){ return false; } }
function newId(p){ return (p||'g')+'_'+Date.now().toString(36)+Math.random().toString(36).slice(2,6); }
function clone(o){ return JSON.parse(JSON.stringify(o)); }
function ico(n,sz,sw){
  var P={lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',moon:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',flask:'<path d="M9 3h6M10 3v6L4 19a1.5 1.5 0 0 0 1.3 2h13.4A1.5 1.5 0 0 0 20 19l-6-10V3"/>',calc:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2M14 12h2M8 16h2M14 16h2"/>',abc:'<path d="M4 20 10 4h1l6 16M6.5 14h8"/>',more:'<circle cx="12" cy="5" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="19" r="1.6"/>',folder:'<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',check:'<path d="M20 6L9 17l-5-5"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>',
    cloud:'<path d="M7 18a4 4 0 0 1-.5-8 6 6 0 0 1 11.5 2h.5a3 3 0 0 1 0 6z"/>',sort:'<path d="M8 4v16M8 20l-3-3M8 20l3-3M16 20V4M16 4l-3 3M16 4l3 3"/>',grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',back:'<path d="M9 5l7 7-7 7"/>',play:'<path d="M6 4l14 8-14 8z"/>',edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',up:'<path d="M12 19V5M5 12l7-7 7 7"/>',down:'<path d="M12 5v14M19 12l-7 7-7-7"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
    import:'<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',star:'<path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.5 5.7 21l1.5-7L2 9.3l7-.8z"/>',x:'<path d="M18 6L6 18M6 6l12 12"/>',
    box:'<path d="M3 8l9-4 9 4v8l-9 4-9-4z"/><path d="M3 8l9 4 9-4M12 12v8"/>',tv:'<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M8 3l4 3 4-3"/>',wheel:'<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"/>',flip:'<rect x="3" y="5" width="8" height="14" rx="2"/><rect x="13" y="5" width="8" height="14" rx="2"/>',
    monitor:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    img:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',drag:'<circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/>',
    file:'<path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4"/>',paste:'<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6"/>',list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    note:'<path d="M4 4h16v12l-4 4H4z"/><path d="M16 20v-4h4"/>',x2:'<path d="M4 7l6 10M10 7l-6 10"/><path d="M14 9a2.5 2.5 0 1 1 5 0c0 2-5 4-5 8h5"/>',users:'<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14c3 0 5 2 5 5"/>',
    dice:'<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="15" r="1"/><circle cx="15" cy="9" r="1"/><circle cx="9" cy="15" r="1"/>',alert:'<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',col:'<path d="M4 20h16M6 20V9M10 20V9M14 20V9M18 20V9M3 9l9-5 9 5z"/>',award:'<circle cx="12" cy="9" r="5"/><path d="M9 13l-1 8 4-2 4 2-1-8"/>',
    book:'<path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/>',save:'<path d="M5 12l5 5L20 7"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',download:'<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',send:'<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>',link:'<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1"/><path d="M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>',spark:'<path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>'};
  var s=sz||16; return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(sw||2)+'" stroke-linecap="round" stroke-linejoin="round">'+(P[n]||'')+'</svg>';
}
window._hhIbIco=ico;

/* ── التخزين ── */
function loadLocal(){ try{ _ib.games=JSON.parse(localStorage.getItem('hh_ib_games')||'[]')||[]; }catch(e){ _ib.games=[]; } }
function saveLocal(){ try{ localStorage.setItem('hh_ib_games', JSON.stringify(_ib.games)); }catch(e){ toastX('مساحة الجهاز ممتلئة، قلّل الصور في الأسئلة','error'); } }
async function loadCloud(){
  var u=uid(); if(!u) return;
  try{
    var qs=await db().collection('games').where('ownerUid','==',u).get();
    var cloud=[]; qs.forEach(function(d){ var g=d.data(); g.id=d.id; cloud.push(g); });
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
  g.updatedAt=Date.now(); markDirty();
  if(g._ready){ scheduleReadySave(g); return; }
  saveLocal();
  clearTimeout(_ib.saveT); _ib.pendG=g;
  var doIt=async function(){
    _ib.saveT=null; _ib.pendG=null; markBusy();
    var u=uid();
    if(!u){ markSaved(true,'local'); return; }
    try{ g.ownerUid=u; try{ g.ownerEmail=firebase.auth().currentUser.email||''; }catch(e){}
      await db().collection('games').doc(g.id).set(g,{merge:false}); markSaved(); }
    catch(e){ markSaved(true, (e&&e.code)); }
  };
  if(now) doIt(); else _ib.saveT=setTimeout(doIt, 900);
}
/* zzzzzzce: زر الحفظ الصريح */
function flushOwn(){ if(_ib.saveT&&_ib.pendG){ clearTimeout(_ib.saveT); var g=_ib.pendG; _ib.saveT=null; persist(g,true); } }
function flushAll(){ try{ flushOwn(); }catch(e){} try{ flushReady(); }catch(e){} }
var SVI={save:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M5 3h11l3 3v15H5z"/><path d="M8 3v6h8V3M8 21v-7h8v7"/></svg>',ok:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg>'};
function svState(st,msg){ _ib.svSt=st; document.querySelectorAll('#hh-ib .e2-svb').forEach(function(b){ b.className='e2-svb '+st+(b.classList.contains('m')?' m':'');
    var m=b.classList.contains('m');
    b.innerHTML=st==='dirty'?SVI.save+' حفظ'+(m?'':' <kbd>Ctrl+S</kbd>'):st==='busy'?'<span class="spn"></span> جارٍ الحفظ':st==='err'?'أعد المحاولة':SVI.ok+' تم الحفظ'; });
  var t=document.getElementById('ib-save-st'); if(t){ t.className='e2-svs '+st; t.innerHTML='<i></i>'+(msg||''); } }
window.hhIbSaveNow=function(){ var g=cur(); if(!g) return; _ib.manualSave=true; if(g._ready){ clearTimeout(_ib.readySaveT); _ib.readySaveT=null; markBusy(); setTimeout(function(){ readySave(g); },30); } else { clearTimeout(_ib.saveT); _ib.saveT=null; persist(g,true); } };
function markBusy(){ svState('busy','جارٍ الحفظ'); }
document.addEventListener('keydown',function(e){ if((e.ctrlKey||e.metaKey)&&(e.key==='s'||e.key==='S'||e.code==='KeyS')&&_ib&&_ib.view==='editor'&&document.getElementById('hh-ib')){ e.preventDefault(); hhIbSaveNow(); } },true);
function markDirty(){ svState('dirty','تغييرات غير محفوظة'); }
function hhm(){ var d=new Date(); return d.getHours()+':'+('0'+d.getMinutes()).slice(-2); }
function markSaved(err, code){ var man=_ib.manualSave; _ib.manualSave=false;
  if(err){ svState('err',code==='local'?'محفوظ على الجهاز فقط، سجّل الدخول للمزامنة':code==='admin'?'التعديل على الألعاب الجاهزة للمشرف فقط':('محفوظ على الجهاز فقط، تعذّرت المزامنة'+(code&&String(code).indexOf('permission')>-1?' (صلاحيات Firestore)':''))); if(man) toastX('تعذّر الحفظ في الحساب','error'); }
  else { _ib.svTime=hhm(); svState('ok','محفوظ في حسابك، '+_ib.svTime); if(man) toastX('حُفظت اللعبة','success'); } }

/* ── الأنماط ── */

/* ── أنماط المحرر الجديد والمكتبة (zzzzzzbr) ── */
var E2CSS=[
'html body #hh-ib.ib2.ib-editing > .top{display:none !important;}',
'#hh-ib.ib-editing > .wrap{max-width:1440px !important;padding:14px 20px 90px !important;}',
'#hh-ib .e2-tb{display:flex;align-items:center;gap:10px;background:#fff;border:1.5px solid #E7DAC0;border-radius:18px;padding:10px 12px;margin-bottom:12px;flex-wrap:wrap;}',
'#hh-ib .e2-bk{width:40px;height:40px;border-radius:12px;border:1.5px solid #E7DAC0;background:#fff;color:#5E0E26;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;}',
'#hh-ib .e2-tt{display:flex;flex-direction:column;min-width:0;flex:1 1 220px;}',
'#hh-ib .e2-tt small{font-family:Cairo;font-weight:700;font-size:12px;color:#7A6A54;}',
'#hh-ib .e2-tt input{border:0;border-bottom:1.5px dashed transparent;font-family:Cairo;font-weight:800;font-size:19px;color:#3D0918;background:transparent;padding:2px 0;width:100%;outline:none;}',
'#hh-ib .e2-tt input:hover,#hh-ib .e2-tt input:focus{border-bottom-color:#B8924A;}',
'#hh-ib .e2-sv{display:inline-flex;align-items:center;gap:6px;font-family:Cairo;font-weight:700;font-size:12.5px;color:#2F6A4E;background:#EEF4F0;border-radius:99px;padding:3px 12px;white-space:nowrap;}',
'#hh-ib .e2-mode{display:inline-flex;background:#F5F3F0;border-radius:14px;padding:4px;gap:4px;}',
'#hh-ib .e2-mode button{display:inline-flex;align-items:center;gap:7px;height:40px;padding:0 14px;border-radius:11px;border:0;background:transparent;font-family:Cairo;font-weight:800;font-size:14px;color:#7A6A54;cursor:pointer;white-space:nowrap;}',
'#hh-ib .e2-mode button small{font-family:Tajawal;font-weight:500;font-size:12px;opacity:.9;}',
'#hh-ib .e2-mode button.on{background:#5E0E26;color:#fff;box-shadow:0 6px 14px rgba(94,14,38,.22);}',
'#hh-ib .e2-mode button:disabled{opacity:.45;cursor:default;}',
'#hh-ib .e2-b{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:42px;padding:0 15px;border-radius:12px;font-family:Cairo;font-weight:700;font-size:14px;border:1.5px solid #E7DAC0;background:#fff;color:#5E0E26;white-space:nowrap;cursor:pointer;}',
'#hh-ib .e2-b.p{background:linear-gradient(135deg,#8A1538,#5E0E26);color:#fff;border-color:transparent;box-shadow:0 8px 20px rgba(94,14,38,.22);}',
'#hh-ib .e2-b.s{height:34px;padding:0 11px;font-size:13px;border-radius:10px;}',
'#hh-ib .e2-b.d{color:#B3261E;}',
'#hh-ib .e2-b:disabled{opacity:.45;cursor:default;}',
'#hh-ib .e2-strip{display:flex;align-items:center;gap:8px;background:#fff;border:1.5px solid #E7DAC0;border-radius:16px;padding:9px 12px;margin-bottom:12px;flex-wrap:wrap;font-family:Cairo;}',
'#hh-ib .e2-strip .k{font-weight:700;font-size:12.5px;color:#7A6A54;}',
'#hh-ib .e2-strip .v{font-weight:800;font-size:15px;color:#3D0918;}',
'#hh-ib .e2-ch{display:inline-flex;align-items:center;gap:6px;height:36px;padding:0 12px;border-radius:10px;border:1.5px solid #E7DAC0;font-family:Cairo;font-weight:700;font-size:13px;color:#3D2A16;background:#fff;cursor:pointer;white-space:nowrap;}',
'#hh-ib .e2-ch svg{color:#8A6D2E;}',
'#hh-ib .e2-ch.on{background:#5E0E26;color:#fff;border-color:#5E0E26;}',
'#hh-ib .e2-ch.on svg{color:#fff;}',
'#hh-ib .e2-ch select{border:0;background:transparent;font-family:Cairo;font-weight:700;font-size:13px;color:inherit;outline:none;cursor:pointer;}',
'#hh-ib .e2-banner{display:flex;align-items:center;gap:10px;background:#F6E9EE;border:1.5px solid #E9C9D3;color:#5E0E26;border-radius:14px;padding:10px 14px;margin-bottom:12px;font-family:Cairo;font-weight:700;font-size:13.5px;line-height:1.7;}',
'#hh-ib .e2-gr{display:grid;grid-template-columns:300px minmax(0,1fr) 330px;gap:14px;align-items:start;}',
'#hh-ib .e2-cd{background:#fff;border:1.5px solid #E7DAC0;border-radius:18px;}',
'#hh-ib .e2-hd{display:flex;align-items:center;gap:8px;padding:11px 14px;border-bottom:1px solid #EFEBE5;font-family:Cairo;font-weight:800;font-size:15px;color:#3D0918;}',
'#hh-ib .e2-hd em{font-style:normal;font-size:12px;background:#F5F3F0;color:#7A6A54;border-radius:99px;padding:0 8px;}',
'#hh-ib .e2-ql{padding:8px;display:flex;flex-direction:column;gap:6px;max-height:calc(100vh - 380px);min-height:120px;overflow-y:auto;}',
'#hh-ib .e2-qi{display:grid;grid-template-columns:16px 28px minmax(0,1fr) auto;gap:8px;align-items:center;padding:8px 9px;border:1.5px solid #EFEBE5;border-radius:12px;font-family:Cairo;font-weight:700;font-size:13.5px;color:#2A1A0E;cursor:pointer;background:#fff;}',
'#hh-ib .e2-qi.on{border-color:#5E0E26;background:#FBF4F6;box-shadow:inset -3px 0 0 #5E0E26;}',
'#hh-ib .e2-qi.drag{opacity:.4;} #hh-ib .e2-qi.over{border-color:#B8924A;border-style:dashed;}',
'#hh-ib .e2-qi .dg{color:#B8AE9A;cursor:grab;display:flex;} #hh-ib .e2-qi .n{width:28px;height:28px;border-radius:9px;background:#5E0E26;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12.5px;}',
'#hh-ib .e2-qi .tx{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;} #hh-ib .e2-qi .tx small{display:block;font-family:Tajawal;font-weight:500;font-size:12px;color:#7A6A54;}',
'#hh-ib .e2-qi .rt{display:flex;align-items:center;gap:5px;} #hh-ib .e2-qi .st{width:9px;height:9px;border-radius:50%;background:#3D6B53;} #hh-ib .e2-qi .st.w{background:#C98A1B;}',
'#hh-ib .e2-tag{font-family:Cairo;font-weight:800;font-size:11px;border-radius:99px;padding:1px 7px;background:#F6E9EE;color:#8A1538;}',
'#hh-ib .e2-add{margin:4px 8px 10px;border:1.5px dashed #D9D2C7;border-radius:12px;height:44px;display:flex;align-items:center;justify-content:center;gap:8px;font-family:Cairo;font-weight:700;color:#5E0E26;font-size:14px;cursor:pointer;background:#fff;width:calc(100% - 16px);}',
'#hh-ib .e2-imp{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;padding:0 8px 10px;}',
'#hh-ib .e2-imp button{display:flex;flex-direction:column;align-items:center;gap:4px;border:1.5px solid #EFEBE5;border-radius:12px;padding:8px 4px;font-family:Cairo;font-weight:700;font-size:12px;color:#3D2A16;background:#fff;cursor:pointer;}',
'#hh-ib .e2-imp button svg{color:#8A6D2E;}',
'#hh-ib .e2-sl{padding:0 10px;font-family:Cairo;font-weight:700;font-size:12.5px;color:#7A6A54;margin:2px 0 6px;}',
'#hh-ib .e2-ed{padding:16px 18px;}',
'#hh-ib .e2-typ{display:inline-flex;gap:3px;background:#F5F3F0;border-radius:12px;padding:3px;margin-bottom:12px;flex-wrap:wrap;}',
'#hh-ib .e2-typ button{height:36px;display:inline-flex;align-items:center;padding:0 13px;border-radius:9px;border:0;background:transparent;font-family:Cairo;font-weight:700;font-size:13.5px;color:#7A6A54;cursor:pointer;}',
'#hh-ib .e2-typ button.on{background:#5E0E26;color:#fff;} #hh-ib .e2-typ button:disabled{opacity:.4;cursor:default;}',
'#hh-ib .e2-qt{position:relative;}',
'#hh-ib .e2-qt textarea{width:100%;box-sizing:border-box;border:1.5px solid #E7DAC0;border-radius:14px;padding:14px 16px 26px;font-family:Cairo;font-weight:800;font-size:21px;color:#2A1A0E;min-height:92px;resize:vertical;outline:none;line-height:1.5;}',
'#hh-ib .e2-qt textarea:focus{border-color:#B8924A;box-shadow:0 0 0 3px rgba(184,146,74,.18);}',
'#hh-ib .e2-qt .cnt{position:absolute;bottom:8px;left:14px;font-family:Tajawal;font-size:12px;color:#7A6A54;}',
'#hh-ib .e2-ims{display:flex;align-items:center;gap:10px;margin:10px 0 14px;border:1.5px dashed #D9D2C7;border-radius:12px;padding:9px 12px;color:#7A6A54;font-size:13.5px;cursor:pointer;}',
'#hh-ib .e2-ims svg{color:#8A6D2E;} #hh-ib .e2-ims img{height:64px;border-radius:8px;} #hh-ib .e2-ims .x{margin-inline-start:auto;}',
'#hh-ib .e2-lab{font-family:Cairo;font-weight:800;font-size:14px;color:#3D0918;margin:0 0 8px;display:flex;align-items:center;gap:8px;}',
'#hh-ib .e2-lab small{font-family:Tajawal;font-weight:500;color:#7A6A54;font-size:12.5px;}',
'#hh-ib .e2-ans{display:grid;grid-template-columns:1fr 1fr;gap:10px;}',
'#hh-ib .e2-an{display:flex;align-items:center;gap:10px;border-radius:14px;padding:9px;min-height:62px;background:var(--a);color:#fff;position:relative;}',
'#hh-ib .e2-an i{width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-style:normal;font-size:16px;flex-shrink:0;}',
'#hh-ib .e2-an input{flex:1;min-width:0;background:transparent;border:0;border-bottom:1.5px solid rgba(255,255,255,.35);color:#fff;font-family:Cairo;font-weight:700;font-size:16px;outline:none;padding:4px 2px;}',
'#hh-ib .e2-an input::placeholder{color:rgba(255,255,255,.65);}',
'#hh-ib .e2-an .ok{width:34px;height:34px;border-radius:50%;border:2px solid rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center;flex-shrink:0;background:transparent;color:transparent;cursor:pointer;}',
'#hh-ib .e2-an.cr .ok{background:#fff;color:#2F6A4E;border-color:#fff;}',
'#hh-ib .e2-an.cr{box-shadow:0 0 0 3px #fff,0 0 0 5px #2F6A4E;}',
'#hh-ib .e2-pts{display:flex;flex-direction:column;gap:8px;}',
'#hh-ib .e2-pt{display:flex;align-items:center;gap:8px;}',
'#hh-ib .e2-pt i{width:32px;height:32px;border-radius:9px;background:#2F6A4E;color:#fff;font-style:normal;font-family:Cairo;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
'#hh-ib .e2-pt input{flex:1;border:1.5px solid #E7DAC0;border-radius:10px;padding:8px 11px;font-family:Cairo;font-weight:700;font-size:15px;color:#2A1A0E;outline:none;}',
'#hh-ib .e2-pt input:focus{border-color:#B8924A;}',
'#hh-ib .e2-pt button{width:34px;height:34px;border-radius:9px;border:1.5px solid #E7DAC0;background:#fff;color:#B3261E;cursor:pointer;display:flex;align-items:center;justify-content:center;}',
'#hh-ib .e2-prs{display:flex;flex-direction:column;gap:8px;}',
'#hh-ib .e2-pr{display:grid;grid-template-columns:minmax(0,1fr) 36px minmax(0,1.6fr) 34px;gap:8px;align-items:center;}',
'#hh-ib .e2-pr input{width:100%;box-sizing:border-box;height:46px;border:1.5px solid #E7DAC0;border-radius:11px;padding:0 12px;font-family:Cairo;font-weight:700;font-size:15px;color:#2A1A0E;outline:none;}',
'#hh-ib .e2-pr input:focus{border-color:#B8924A;}',
'#hh-ib .e2-pr .lk{width:36px;height:36px;border-radius:50%;background:#F5F3F0;color:#8A6D2E;display:flex;align-items:center;justify-content:center;}',
'#hh-ib .e2-pr button{width:34px;height:34px;border-radius:9px;border:1.5px solid #E7DAC0;background:#fff;color:#B3261E;cursor:pointer;display:flex;align-items:center;justify-content:center;}',
'#hh-ib .e2-cv{display:flex;align-items:center;gap:10px;background:#FBF1E0;border:1.5px solid #EBD3A6;border-radius:12px;padding:10px 12px;font-size:13.5px;color:#6E4A0E;margin-top:12px;font-family:Cairo;font-weight:700;line-height:1.6;}',
'#hh-ib .e2-cv span{flex:1;} #hh-ib .e2-cv svg{flex-shrink:0;}',
'@media (max-width:640px){ #hh-ib .e2-pr{grid-template-columns:1fr 34px;} #hh-ib .e2-pr .lk{display:none;} #hh-ib .e2-pr input:nth-of-type(2){grid-column:1;} }',
'#hh-ib .e2-opt{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;padding-top:12px;border-top:1px dashed #E7DAC0;align-items:center;}',
'#hh-ib .e2-qa{display:flex;gap:6px;margin-inline-start:auto;}',
'#hh-ib .e2-note{margin-top:10px;} #hh-ib .e2-note input{width:100%;box-sizing:border-box;border:1.5px solid #E7DAC0;border-radius:10px;padding:9px 12px;font-family:Cairo;font-size:14px;outline:none;}',
'#hh-ib .e2-pv{padding:14px;}',
'#hh-ib .e2-ph{width:226px;margin:0 auto;border-radius:30px;background:#1F1A1C;padding:10px;box-shadow:0 18px 40px rgba(30,6,15,.22);}',
'#hh-ib .e2-scr{background:#F5F4F2;border-radius:22px;overflow:hidden;height:410px;display:flex;flex-direction:column;}',
'#hh-ib .e2-sb{background:linear-gradient(175deg,#4A0B1E,#5E0E26);color:#fff;padding:9px 12px;display:flex;justify-content:space-between;font-family:Cairo;font-weight:700;font-size:11.5px;}',
'#hh-ib .e2-sq{padding:14px 12px;font-family:Cairo;font-weight:800;font-size:14.5px;color:#2A1A0E;text-align:center;line-height:1.5;}',
'#hh-ib .e2-sa{display:grid;grid-template-columns:1fr 1fr;gap:7px;padding:12px;margin-top:auto;}',
'#hh-ib .e2-sa span{height:68px;border-radius:12px;background:var(--a);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:18px;gap:2px;}',
'#hh-ib .e2-sa span small{font-family:Cairo;font-weight:700;font-size:11px;opacity:.9;padding:0 4px;text-align:center;}',
'#hh-ib .e2-tv{border-radius:14px;overflow:hidden;border:1.5px solid #E7DAC0;aspect-ratio:16/10;display:flex;flex-direction:column;background:#F5F4F2;}',
'#hh-ib .e2-tv .h{height:30px;background:linear-gradient(175deg,#4A0B1E,#5E0E26);border-bottom:2px solid #B8924A;color:#fff;font-family:Cairo;font-weight:700;font-size:11px;display:flex;align-items:center;justify-content:space-between;padding:0 10px;}',
'#hh-ib .e2-tv .q{flex:1;display:flex;align-items:center;justify-content:center;text-align:center;padding:8px 12px;font-family:Cairo;font-weight:800;font-size:15px;color:#2A1A0E;line-height:1.5;}',
'#hh-ib .e2-tv .a{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:0 10px 10px;}',
'#hh-ib .e2-tv .a span{height:26px;border-radius:7px;background:var(--a);color:#fff;font-family:Cairo;font-weight:700;font-size:10.5px;display:flex;align-items:center;justify-content:center;padding:0 4px;overflow:hidden;white-space:nowrap;}',
'#hh-ib .e2-cap{text-align:center;font-family:Cairo;font-weight:700;font-size:12.5px;color:#7A6A54;margin:10px 0 0;}',
'#hh-ib .e2-chk{padding:12px 14px;border-top:1px solid #EFEBE5;}',
'#hh-ib .e2-chk h4{margin:0 0 8px;font-family:Cairo;font-weight:800;font-size:14px;color:#3D0918;display:flex;align-items:center;gap:8px;}',
'#hh-ib .e2-chk h4 em{margin-inline-start:auto;font-style:normal;font-size:12px;color:#2F6A4E;background:#EEF4F0;border-radius:99px;padding:1px 9px;}',
'#hh-ib .e2-chk h4 em.w{color:#8A5A10;background:#FBF1E0;}',
'#hh-ib .e2-ln{display:flex;align-items:center;gap:8px;font-size:13.5px;color:#2A1A0E;padding:4px 0;font-family:Tajawal;}',
'#hh-ib .e2-ln i{width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;flex-shrink:0;}',
'#hh-ib .e2-ln i.g{background:#EEF4F0;color:#2F6A4E;} #hh-ib .e2-ln i.w{background:#FBF1E0;color:#A8650F;}',
'#hh-ib .e2-ln a{margin-inline-start:auto;font-family:Cairo;font-weight:700;font-size:12.5px;color:#8A1538;cursor:pointer;text-decoration:none;}',
'#hh-ib .e2-sum{padding:12px 14px;border-top:1px solid #EFEBE5;display:grid;grid-template-columns:1fr 1fr;gap:8px;}',
'#hh-ib .e2-sum div{background:#F5F3F0;border-radius:10px;padding:8px 10px;font-size:12px;color:#7A6A54;font-family:Tajawal;}',
'#hh-ib .e2-sum b{display:block;font-family:Cairo;font-weight:800;font-size:13.5px;color:#2A1A0E;}',
'#hh-ib .e2-mt{display:none;}',
'#hh-ib .e2-stk{display:none;}',
'@media (max-width:1180px){ #hh-ib .e2-gr{grid-template-columns:270px minmax(0,1fr);} #hh-ib .e2-colp{display:none;} }',
'@media (max-width:900px){',
'  #hh-ib.ib-editing > .wrap{padding:10px 12px 120px !important;}',
'  #hh-ib .e2-gr{grid-template-columns:1fr;}',
'  #hh-ib .e2-mt{display:flex;gap:4px;background:#fff;border:1.5px solid #E7DAC0;border-radius:14px;padding:4px;margin-bottom:10px;}',
'  #hh-ib .e2-mt button{flex:1;height:40px;border-radius:10px;border:0;background:transparent;font-family:Cairo;font-weight:800;font-size:14px;color:#7A6A54;}',
'  #hh-ib .e2-mt button.on{background:#5E0E26;color:#fff;}',
'  #hh-ib .e2-gr > *{display:none;} #hh-ib .e2-gr > .on{display:block !important;}',
'  #hh-ib .e2-ql{max-height:none;}',
'  #hh-ib .e2-ans{grid-template-columns:1fr;}',
'  #hh-ib .e2-tb .e2-hide{display:none;}',
'  #hh-ib .e2-mode button small{display:none;}',
'  #hh-ib .e2-stk{display:flex;gap:8px;position:sticky;bottom:0;margin:12px -12px -120px;padding:10px 12px;background:#fff;border-top:1.5px solid #E7DAC0;z-index:4;}',
'  #hh-ib .e2-stk .e2-b{flex:1;}',
'  #hh-ib .e2-qt textarea{font-size:18px;}',
'}',
/* نافذة الاستيراد */
'#ib-imp2{position:fixed;inset:0;background:rgba(42,8,16,.55);z-index:99996;display:flex;align-items:center;justify-content:center;padding:16px;direction:rtl;font-family:Cairo,Tajawal,sans-serif;}',
'#ib-imp2 .md{background:#fff;border-radius:22px;width:min(980px,100%);max-height:calc(100vh - 32px);display:flex;flex-direction:column;overflow:hidden;box-shadow:0 30px 70px rgba(30,6,15,.35);}',
'#ib-imp2 .mh{display:flex;align-items:center;gap:10px;padding:16px 20px;border-bottom:1px solid #EFEBE5;font-weight:800;font-size:18px;color:#3D0918;}',
'#ib-imp2 .mh button{margin-inline-start:auto;width:38px;height:38px;border-radius:11px;border:1.5px solid #E7DAC0;background:#fff;color:#5E0E26;cursor:pointer;display:flex;align-items:center;justify-content:center;}',
'#ib-imp2 .mt{display:flex;gap:4px;padding:12px 20px 0;flex-wrap:wrap;}',
'#ib-imp2 .mt button{display:inline-flex;align-items:center;gap:7px;height:40px;padding:0 15px;border-radius:11px;border:1.5px solid #E7DAC0;background:#fff;font-family:Cairo;font-weight:700;font-size:14px;color:#7A6A54;cursor:pointer;}',
'#ib-imp2 .mt button.on{background:#5E0E26;color:#fff;border-color:#5E0E26;}',
'#ib-imp2 .mb{padding:14px 20px;overflow:auto;flex:1;min-height:0;}',
'#ib-imp2 .two{display:grid;grid-template-columns:280px minmax(0,1fr);gap:14px;min-height:0;}',
'#ib-imp2 .srch{display:flex;align-items:center;gap:8px;border:1.5px solid #E7DAC0;border-radius:11px;padding:0 10px;height:40px;margin-bottom:8px;color:#7A6A54;}',
'#ib-imp2 .srch input{border:0;outline:none;flex:1;font-family:Cairo;font-size:14px;}',
'#ib-imp2 .cl{display:flex;flex-direction:column;gap:4px;max-height:52vh;overflow:auto;}',
'#ib-imp2 .cl div{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:10px;font-weight:700;font-size:13.5px;color:#2A1A0E;cursor:pointer;border:1.5px solid transparent;}',
'#ib-imp2 .cl div small{margin-inline-start:auto;font-size:12px;color:#7A6A54;background:#F5F3F0;border-radius:99px;padding:0 8px;}',
'#ib-imp2 .cl div.on{background:#FBF4F6;border-color:#5E0E26;color:#5E0E26;}',
'#ib-imp2 .qh{display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap;}',
'#ib-imp2 .qh b{font-weight:800;color:#3D0918;}',
'#ib-imp2 .qq{display:flex;flex-direction:column;gap:5px;max-height:48vh;overflow:auto;}',
'#ib-imp2 .qq label{display:flex;align-items:flex-start;gap:9px;padding:9px 10px;border:1.5px solid #EFEBE5;border-radius:11px;font-size:14px;color:#2A1A0E;cursor:pointer;line-height:1.6;}',
'#ib-imp2 .qq label.on{border-color:#2F6A4E;background:#F3F8F5;}',
'#ib-imp2 .qq input{margin-top:5px;accent-color:#2F6A4E;width:16px;height:16px;flex-shrink:0;}',
'#ib-imp2 .qq small{display:block;font-size:12px;color:#7A6A54;font-family:Tajawal;}',
'#ib-imp2 .mf{display:flex;align-items:center;gap:10px;padding:12px 20px;border-top:1px solid #EFEBE5;font-size:13px;color:#7A6A54;flex-wrap:wrap;}',
'#ib-imp2 .mf .sp{flex:1;}',
'#ib-imp2 .bt{display:inline-flex;align-items:center;gap:8px;height:42px;padding:0 16px;border-radius:12px;font-family:Cairo;font-weight:700;font-size:14px;border:1.5px solid #E7DAC0;background:#fff;color:#5E0E26;cursor:pointer;}',
'#ib-imp2 .bt.p{background:linear-gradient(135deg,#8A1538,#5E0E26);color:#fff;border-color:transparent;}',
'#ib-imp2 .bt.s{height:32px;padding:0 11px;font-size:12.5px;border-radius:9px;}',
'#ib-imp2 .bt:disabled{opacity:.45;cursor:default;}',
'#ib-imp2 textarea{width:100%;box-sizing:border-box;min-height:220px;border:1.5px solid #E7DAC0;border-radius:12px;padding:12px;font-family:Cairo;font-size:14.5px;line-height:1.8;outline:none;}',
'#ib-imp2 .hint{font-size:13px;color:#7A6A54;line-height:1.8;background:#F5F3F0;border-radius:12px;padding:10px 12px;margin-bottom:10px;}',
'#ib-imp2 .hint code{font-family:Cairo;background:#fff;border-radius:6px;padding:0 6px;color:#3D0918;}',
'#ib-imp2 .drop{border:2px dashed #D9D2C7;border-radius:14px;padding:26px;text-align:center;color:#7A6A54;font-weight:700;cursor:pointer;display:block;}',
'#ib-imp2 .prev{margin-top:10px;font-size:13.5px;color:#2A1A0E;}',
'#ib-imp2 .prev div{padding:6px 10px;border-bottom:1px solid #F0ECE6;}',
'@media (max-width:760px){ #ib-imp2 .two{grid-template-columns:1fr;} #ib-imp2 .cl{max-height:26vh;} }',
/* المكتبة الجاهزة */
'#hh-ib .rl-fl{display:flex;gap:8px;align-items:center;margin:0 0 16px;flex-wrap:wrap;}',
'#hh-ib .rl-fl .e2-ch:disabled{opacity:.5;cursor:default;}',
'#hh-ib .rl-src{font-family:Cairo;font-weight:700;font-size:12.5px;color:#7A6A54;display:flex;align-items:center;gap:6px;margin:-4px 0 12px;}',
'#hh-ib .rl-g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-bottom:22px;}',
'@media (max-width:1000px){ #hh-ib .rl-g{grid-template-columns:repeat(2,minmax(0,1fr));} }',
'@media (max-width:640px){ #hh-ib .rl-g{grid-template-columns:1fr;} }',
'#hh-ib .rl-c{background:#fff;border:1.5px solid #E7DAC0;border-radius:18px;overflow:hidden;display:flex;flex-direction:column;}',
'#hh-ib .rl-c.draft{border-style:dashed;border-color:#C98A1B;}',
'#hh-ib .rl-c .gh{height:82px;padding:13px 15px;display:flex;align-items:flex-start;justify-content:space-between;color:#fff;background:var(--c);}',
'#hh-ib .rl-c .gi{width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,.16);display:flex;align-items:center;justify-content:center;}',
'#hh-ib .rl-c .md{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end;}',
'#hh-ib .rl-c .md span{display:inline-flex;align-items:center;gap:4px;font-family:Cairo;font-weight:700;font-size:11.5px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.3);border-radius:99px;padding:2px 9px;}',
'#hh-ib .rl-c .gb{padding:12px 15px 14px;display:flex;flex-direction:column;gap:6px;flex:1;}',
'#hh-ib .rl-c .gb b{font-family:Cairo;font-weight:800;font-size:16.5px;color:#3D0918;}',
'#hh-ib .rl-c .mt{font-family:Cairo;font-weight:700;font-size:12.5px;color:#7A6A54;display:flex;gap:6px;flex-wrap:wrap;}',
'#hh-ib .rl-c .mt i{font-style:normal;background:#F5F3F0;border-radius:99px;padding:1px 9px;}',
'#hh-ib .rl-c .mt i.w{background:#FBF1E0;color:#8A5A10;}',
'#hh-ib .rl-c p{margin:0;font-size:13px;color:#7A6A54;line-height:1.6;font-family:Tajawal;}',
'#hh-ib .rl-c .ac{display:flex;gap:8px;margin-top:auto;padding-top:8px;}',
'#hh-ib .rl-c .ac .e2-b{flex:1;height:40px;font-size:13.5px;padding:0 10px;}',
'#hh-ib .rl-c .lk{display:flex;justify-content:center;gap:14px;padding-top:4px;flex-wrap:wrap;}',
'#hh-ib .rl-c .lk a{font-family:Cairo;font-weight:700;font-size:12.5px;color:#5E0E26;display:inline-flex;align-items:center;gap:5px;cursor:pointer;text-decoration:none;}',
'#hh-ib .rl-c .lk a.adm{color:#8A5A10;}',
'#hh-ib .rl-h{display:flex;align-items:center;gap:10px;margin:6px 0 12px;flex-wrap:wrap;}',
'#hh-ib .rl-h h3{margin:0;font-family:Cairo;font-weight:800;font-size:18px;color:#3D0918;display:flex;align-items:center;gap:10px;}',
'#hh-ib .rl-h h3:before{content:"";width:11px;height:11px;background:#B8924A;transform:rotate(45deg);border-radius:2px;}',
'#hh-ib .rl-h small{font-family:Tajawal;font-size:13px;color:#7A6A54;}',
'#hh-ib .rl-soon{background:#fff;border:1.5px dashed #D9D2C7;border-radius:16px;padding:22px;text-align:center;color:#7A6A54;font-family:Cairo;font-weight:700;line-height:1.9;}',
'#hh-ib .ib2-soonline{margin:-6px 0 18px;font-family:Cairo;font-weight:700;font-size:13px;color:#7A6A54;}'
].join('\n');

function style(){
  if(document.getElementById('hh-ib-style')) return;
  var st=document.createElement('style'); st.id='hh-ib-style';
  st.textContent=
   '#hh-ib{position:fixed;inset:0;background:linear-gradient(180deg,#F5F4F2,#F5F4F2);z-index:99990;overflow-y:auto;direction:rtl;font-family:Cairo,Tajawal,sans-serif;color:#3D0918;}'
  +'#hh-ib .top{background:linear-gradient(175deg,#4A0B1E,#5E0E26);border-bottom:2px solid #B8924A;box-shadow:0 3px 14px rgba(61,9,24,.3);padding:10px 16px;display:flex;align-items:center;justify-content:space-between;gap:10px;position:sticky;top:0;z-index:5;color:#EAD9B0;}'
  +'#hh-ib .top b{color:#FFFDF8;font-size:1rem;} #hh-ib .top small{display:block;font-size:.64rem;color:#D4BC85;font-weight:700;}'
  +'#hh-ib .tb{background:rgba(212,188,133,.12);border:1px solid rgba(212,188,133,.5);border-radius:9px;height:34px;padding:0 13px;color:#F5E6C4;font-weight:800;font-size:.78rem;cursor:pointer;font-family:Cairo;display:inline-flex;align-items:center;gap:6px;}'
  +'#hh-ib .tb.gold{background:#FFFFFF;border-color:#FDF3DD;color:#2a0810;}'
  +'#hh-ib .wrap{max-width:1240px;margin:0 auto;padding:16px;}'
  +'#hh-ib .tabs{display:flex;gap:8px;margin:0 0 14px;flex-wrap:wrap;} #hh-ib .tabs button{background:#fff;border:1.5px solid #B8924A;color:#8A6D2E;border-radius:99px;padding:6px 16px;font-weight:800;font-size:.76rem;cursor:pointer;font-family:Cairo;} #hh-ib .tabs button.on{background:#5E0E26;color:#EAD9B0;border-color:#5E0E26;}'
  +'#hh-ib .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;}'
  +'#hh-ib .card{background:#FFFFFF;border:1.5px solid #B8924A;border-radius:18px;overflow:hidden;box-shadow:0 8px 22px rgba(94,14,38,.08);display:flex;flex-direction:column;}'
  +'#hh-ib .card .hd{height:96px;display:flex;align-items:center;justify-content:center;color:#EAD9B0;position:relative;} #hh-ib .card .hd small{position:absolute;top:10px;left:12px;font-size:.6rem;font-weight:900;background:rgba(0,0,0,.3);border:1px solid rgba(234,217,176,.5);border-radius:99px;padding:3px 10px;}'
  +'#hh-ib .card .bd{padding:12px 14px;flex:1;display:flex;flex-direction:column;} #hh-ib .card b{font-size:.98rem;} #hh-ib .card p{margin:4px 0 10px;color:#6b5a48;font-size:.72rem;line-height:1.7;font-weight:700;flex:1;}'
  +'#hh-ib .row{display:flex;gap:6px;} #hh-ib .btn{flex:1;text-align:center;border-radius:10px;padding:8px;font-size:.74rem;font-weight:900;cursor:pointer;font-family:Cairo;border:1.5px solid #B8924A;background:#fff;color:#8A6D2E;}'
  +'#hh-ib .btn.p{background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border-color:#8A1538;} #hh-ib .btn.g{background:linear-gradient(135deg,#3D6B53,#2C5340);color:#fff;border-color:#2C5340;} #hh-ib .btn.d{border-color:#c0392b;color:#c0392b;} #hh-ib .btn:disabled{opacity:.45;cursor:default;}'
  +'#hh-ib .sec{margin:18px 0 8px;font-weight:900;color:#5E0E26;font-size:.95rem;display:flex;align-items:center;gap:8px;} #hh-ib .sec::before{content:"";width:5px;height:20px;background:linear-gradient(#EAD9B0,#B8924A);border-radius:9px;}'
  +'#hh-ib .line{background:#fff;border:1px solid #EAE0CA;border-radius:12px;padding:10px 14px;display:flex;align-items:center;gap:10px;font-size:.76rem;font-weight:800;margin-bottom:6px;flex-wrap:wrap;} #hh-ib .line .t{flex:1;min-width:200px;} #hh-ib .line .sb{display:block;color:#8A7A63;font-size:.64rem;font-weight:700;}'
  +'#hh-ib .pill{border-radius:99px;padding:2px 10px;font-size:.6rem;font-weight:900;} #hh-ib .pill.live{background:#E6F2EA;color:#2C5340;} #hh-ib .pill.pause{background:#F5F3F0;color:#8A6D2E;} #hh-ib .pill.done{background:#ECE8E3;color:#8a7a63;} #hh-ib .pill.draft{background:#F7ECEF;color:#8A1538;}'
  +'#hh-ib .empty{background:#FFFFFF;border:1.5px dashed #B8924A;border-radius:16px;padding:26px;text-align:center;color:#8A6D2E;font-weight:800;line-height:1.9;}'
  /* المحرر */
  +'#hh-ib .ed{display:grid;grid-template-columns:340px 1fr;gap:14px;align-items:start;} @media(max-width:900px){#hh-ib .ed{grid-template-columns:1fr;}}'
  +'#hh-ib .pane{background:#FFFFFF;border:1.5px solid #B8924A;border-radius:16px;overflow:hidden;} #hh-ib .pane .ph{background:linear-gradient(135deg,#4A0B1E,#5E0E26);color:#EAD9B0;padding:9px 14px;font-weight:900;font-size:.82rem;display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #B8924A;}'
  +'#hh-ib .ql{max-height:70vh;overflow-y:auto;padding:8px;} #hh-ib .qi{display:flex;align-items:center;gap:8px;padding:8px 10px;border:1.5px solid #EAE0CA;border-radius:11px;margin-bottom:6px;cursor:pointer;background:#fff;font-size:.74rem;font-weight:800;} #hh-ib .qi.on{border-color:#8A1538;background:#F7ECEF;} #hh-ib .qi .n{width:24px;height:24px;border-radius:8px;background:#5E0E26;color:#EAD9B0;display:flex;align-items:center;justify-content:center;font-size:.66rem;flex-shrink:0;} #hh-ib .qi .tx{flex:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;} #hh-ib .qi .tg{font-size:.58rem;color:#8A6D2E;background:#F5F3F0;border-radius:6px;padding:1px 6px;flex-shrink:0;} #hh-ib .qi .tg.x2{background:#5E0E26;color:#EAD9B0;}'
  +'#hh-ib .f{margin-bottom:10px;} #hh-ib .f label{display:block;font-size:.72rem;font-weight:800;color:#5E0E26;margin-bottom:4px;} #hh-ib .f input,#hh-ib .f textarea,#hh-ib .f select{width:100%;border:1.5px solid #B8924A;border-radius:10px;padding:8px 11px;font-family:Cairo;font-size:.84rem;color:#3D0918;background:#fff;box-sizing:border-box;} #hh-ib .f textarea{min-height:70px;resize:vertical;}'
  +'#hh-ib .opt{display:flex;align-items:center;gap:8px;margin-bottom:7px;} #hh-ib .opt i{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;color:#fff;font-style:normal;font-weight:900;flex-shrink:0;} #hh-ib .opt input[type=text]{flex:1;border:1.5px solid #B8924A;border-radius:10px;padding:7px 10px;font-family:Cairo;font-size:.82rem;} #hh-ib .opt label.ok{display:flex;align-items:center;gap:4px;font-size:.66rem;font-weight:800;color:#3D6B53;white-space:nowrap;}'
  +'#hh-ib .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;} #hh-ib .g2{display:grid;grid-template-columns:1fr 1fr;gap:8px;}'
  +'#hh-ib .chip{display:inline-flex;align-items:center;gap:6px;border:1.5px solid #B8924A;border-radius:99px;padding:5px 12px;font-size:.7rem;font-weight:800;cursor:pointer;color:#8A6D2E;background:#fff;} #hh-ib .chip.on{background:#5E0E26;color:#EAD9B0;border-color:#5E0E26;}'
  +'#hh-ib .hint{font-size:.64rem;color:#8A7A63;font-weight:700;line-height:1.7;}'
  +'#hh-ib .undo{position:fixed;bottom:18px;left:50%;transform:translateX(-50%);background:#2A0810;color:#EAD9B0;border:1px solid #B8924A;border-radius:12px;padding:10px 16px;font-weight:800;font-size:.76rem;z-index:99999;display:flex;gap:12px;align-items:center;} #hh-ib .undo button{background:#EAD9B0;color:#2A0810;border:none;border-radius:8px;padding:5px 12px;font-family:Cairo;font-weight:900;cursor:pointer;}';
  st.textContent+='\n'+E2CSS+'\n'+IB4CSS+'\n'+(typeof IB6CSS==='string'?IB6CSS:'');
  document.head.appendChild(st);
}

/* ── الفتح ── */
async function open(view, gameId){
  style();
  try{ document.body.classList.remove('hh-immersive'); }catch(e){}
  var old=document.getElementById('hh-ib'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-ib'; ov.className='ib2';
  ov.innerHTML='<div class="ib2-hero"><span class="ib2-hi">'+ico('star',30)+'</span><div style="position:relative;z-index:1"><h1>الإبداع، استوديو الألعاب التعليمية</h1><p>أنشئ لعبتك أو اختر لعبة جاهزة، وشغّلها مباشرة على أجهزة الطلاب أو اعرضها على شاشة الصف</p></div><div class="ib2-hx"><button class="ib2-btn g" onclick="hhIbView(\'rack\')">'+ico('plus',16)+' أنشئ لعبة جديدة</button></div></div><div class="top"><button class="tb" onclick="hhIbBack()">'+ico('back')+' رجوع</button><div style="text-align:center;"><b>الإبداع</b></div><span id="ib-save"></span></div><div class="wrap" id="ib-body"></div>';
  document.body.appendChild(ov);
  try{ if(window.hhNavMark) hhNavMark('ib'); }catch(e){}
  loadLocal(); loadReadyLocal();
  _ib.view=view||'rack'; _ib.gameId=gameId||null;
  render();
  if(!_ib.loaded){ await Promise.all([loadCloud(), loadReadyCloud()]); _ib.loaded=true; render(); }
}
function close(){ var e=document.getElementById('hh-ib'); if(e) e.remove(); try{ document.body.classList.remove('hh-immersive'); }catch(e){} try{ if(window.hhNavMark) hhNavMark(null); }catch(e){} }
window.hhIbClose=close;
window.hhIbBack=function(){ if(_ib.view==='editor'){ try{ flushOwn(); }catch(e){} var wasReady=!!_ib.readyGame; flushReady(); _ib.readyGame=null; _ib.view=wasReady?'ready':'mine'; render(); } else close(); };

function render(){
  var b=document.getElementById('ib-body'); if(!b) return;
  var _ov=document.getElementById('hh-ib'); if(_ov) _ov.classList.toggle('ib-editing', _ib.view==='editor');
  if(_ib.view==='editor'){ b.innerHTML=renderEditor(); bindEditor(); try{ _ov.scrollTop=_ov.scrollTop; }catch(e){} return; }
  if(_ib.view==='live'||_ib.view==='screen'){ _ib.mode=_ib.view; _ib.view='rack'; }
  var sec=cySecBar(); if(_ov) _ov.classList.toggle('ib-pub', _ib.sec==='pub');
  setTimeout(cyAfter,0); setTimeout(cyAfter,160); setTimeout(cyAfter,500);
  if(_ib.sec==='pub'){ b.innerHTML=sec+cyPub(); return; }
  var tabs=ib4Tabs();
  if(_ib.view==='mine'){ b.innerHTML=sec+tabs+renderMine(); return; }
  if(_ib.view==='ready'){ b.innerHTML=sec+tabs+renderReady(); return; }
  var html=sec+tabs+ib4Rack();
  b.innerHTML=html;
}
function tplCard(t){
  var md=t.kind==='live'?ico('bolt',13)+' مباشرة':t.kind==='screen'?ico('monitor',13)+' على الشاشة':ico('clock',13)+' غير متزامنة';
  return '<div class="card ib2-tp'+(t.ready?'':' off')+'"><div class="hd" style="background:'+t.bg+'"><span class="md">'+md+'</span>'+(t.ready?'':'<span class="rb">قريباً</span>')+ico(t.ico,44)+'</div><div class="bd"><b>'+esc(t.name)+'</b><p>'+esc(t.desc)+'</p><div class="row">'
    +(t.ready?'<button class="btn p" onclick="hhIbCreate(\''+t.id+'\')">'+ico('plus',16)+' أنشئ لعبة</button>':'<button class="btn" disabled>'+ico('clock',16)+' المرحلة القادمة</button>')
    +'</div></div></div>';
}
window.hhIbView=function(v){ _ib.view=v; render(); var o=document.getElementById('hh-ib'); if(o) o.scrollTop=0; };
window.hhIbSuggest=function(){ toastX('أرسل فكرتك لفريق المُلهم من صفحة التواصل، وستُضاف كقالب عند نضجها','info'); };

function modeOf(g){ return g&&g.mode==='screen'?'screen':'live'; }
function tplName(g){ if(modeOf(g)==='screen') return (SCR[g.screenTpl]||SCR.boxes).name; var t=TEMPLATES.filter(function(x){ return x.id===g.template; })[0]; return t?t.name:''; }
/* zzzzzzcc، «ألعابي» بطاقات بهوية المُلهم: فلتر وبحث، زر أساسي، وتعديل، وقائمة ⋮ */
var MINE_SICO={boxes:'grid',show:'award',wheel:'wheel',flip:'flip',tfs:'check',match:'link',order:'sort'};
function ib4Qn(n){ return n===0?'بلا أسئلة':n===1?'سؤال واحد':n===2?'سؤالان':(n>2&&n<11)?n+' أسئلة':n+' سؤالاً'; }
function ib4Date(ts){ var d=new Date(ts||Date.now()); var p=function(x){ return (x<10?'0':'')+x; }; return p(d.getDate())+'/'+p(d.getMonth()+1)+'/'+d.getFullYear(); }
function ib4Title(t){ return String(t||'بلا عنوان').replace(/\s*[·\-–—]\s*\d{1,2}\/\d{1,2}\/\d{2,4}\s*$/,'').trim()||'بلا عنوان'; }
function ib4MineCard(g){
  var n=(g.questions||[]).length, st=g.status||'draft', scr=modeOf(g)==='screen';
  var T=TEMPLATES.filter(function(x){ return x.id===g.template; })[0]||{};
  var bg=scr?'linear-gradient(135deg,#5E0E26,#3D0918)':(T.bg||'linear-gradient(135deg,#8A1538,#5E0E26)');
  var ic=scr?(MINE_SICO[g.screenTpl]||'tv'):(T.ico||'bolt');
  var md='<span>'+ico(scr?'tv':'phone',12,2.2)+' '+(scr?'على الشاشة':'مباشر')+'</span><span class="'+(st==='ready'?'ok':'dr')+'">'+(st==='ready'?'جاهزة':'مسودة')+'</span>';
  var prim=scr?'<button class="e2-b p" '+(n?'':'disabled')+' onclick="hhIbShow(\''+g.id+'\')">'+ico('tv',15)+' على الشاشة</button>'
             :'<button class="e2-b p" '+(n?'':'disabled')+' onclick="hhIbRun(\''+g.id+'\')">'+ico('play',15)+' تشغيل مباشر</button>';
  var menu='<span class="ib4-mi" onclick="hhIbMineDo(event,\'dup\',\''+g.id+'\')">'+ico('copy',15)+' نسخ اللعبة</span><span class="ib4-mi d" onclick="hhIbMineDo(event,\'del\',\''+g.id+'\')">'+ico('x',15)+' حذف</span>';
  var title=ib4Title(g.title);
  return '<div class="rl-c ib4-c ib4-mc" style="--c:'+bg+'" data-m="'+(scr?'screen':'live')+'" data-t="'+esc((title+' '+tplName(g)).toLowerCase())+'"><div class="gh"><span class="gi">'+ico(ic,24,2)+'</span><div class="md">'+md+'</div></div>'
    +'<div class="gb">'+(tplName(g)&&tplName(g)!==title?'<span class="ib4-ty">'+esc(tplName(g))+'</span>':'<span class="ib4-ty">'+(scr?'على شاشة الصف':'على أجهزة الطلاب')+'</span>')+'<b>'+esc(title)+'</b><div class="mt"><i>'+ib4Qn(n)+'</i><i>عُدّلت '+ib4Date(g.updatedAt)+'</i></div>'
    +(n?'':'<p class="ib4-warn">أضف سؤالاً واحداً على الأقل لتشغيلها.</p>')
    +'<div class="ac">'+prim+'<button class="e2-b" onclick="hhIbEdit(\''+g.id+'\')">'+ico('edit',15)+' تعديل</button><button class="ib4-more" aria-label="خيارات أخرى" onclick="hhIbMenu(event,this)">'+ico('more',18)+'</button></div><div class="ib4-menu" hidden>'+menu+'</div></div></div>';
}
function renderMine(){
  var games=_ib.games.slice().sort(function(a,b){ return (b.updatedAt||0)-(a.updatedAt||0); });
  var F=_ib.mf=_ib.mf||{m:'',q:''};
  var nl=games.filter(function(g){ return modeOf(g)!=='screen'; }).length, ns=games.length-nl;
  var html='<div class="ib4-mh"><div class="ib4-mode">'+[['','الكل',games.length],['live','مباشر',nl],['screen','على الشاشة',ns]].map(function(x){ return '<button class="e2-ch'+(F.m===x[0]?' on':'')+'" onclick="hhIbMF(\'m\',\''+x[0]+'\',this)">'+x[1]+' <em>'+x[2]+'</em></button>'; }).join('')+'</div>'
    +'<label class="e2-ch ib4-q">'+ico('search',14)+'<input type="search" placeholder="ابحث في ألعابك" value="'+esc(F.q)+'" oninput="hhIbMF(\'q\',this.value)" aria-label="بحث في ألعابي"></label>'
    +'<button class="e2-b p s" onclick="hhIbView(\'rack\')">'+ico('plus',15)+' أنشئ لعبة جديدة</button></div>';
  if(!games.length) html+='<div class="empty">لا ألعاب بعد.<br>ابدأ من القوالب، أو انسخ لعبة جاهزة إلى ألعابك.</div>';
  else html+='<div class="rl-g ib4-g" id="ib4-mgrid">'+games.map(ib4MineCard).join('')+'</div><div class="rl-soon" id="ib4-mnone" hidden>لا ألعاب تطابق بحثك.</div>';
  var sess=_ib.sessions.filter(function(s){ return s.state!=='ended'; });
  html+='<div class="ib2-sec ib4-ss"><h2>جولات مباشرة يمكن إكمالها</h2><small>'+(sess.length?sess.length+' '+(sess.length===1?'جولة':sess.length===2?'جولتان':'جولات'):'')+'</small></div>';
  if(!sess.length) html+='<div class="ib4-note">لا جولات متوقفة. أي جولة مباشرة تُوقفها تُحفظ هنا بنقاطها لتُستأنف لاحقاً.</div>';
  else html+='<div class="ib4-rows">'+sess.map(function(s){
    return '<div class="ib4-row"><span class="ib4-rt"><b>'+esc(ib4Title(s.title))+'</b><small>الرمز <bdi dir="ltr">'+esc(s.code)+'</bdi>، السؤال '+((s.qIndex||0)+1)+' من '+(s.total||'؟')+'، '+(s.playersCount||0)+' لاعباً</small></span>'
      +'<span class="pill '+(s.state==='paused'?'pause':'live')+'">'+(s.state==='paused'?'متوقفة مؤقتاً':s.state==='lobby'?'في الانتظار':'جارية')+'</span>'
      +'<button class="e2-b p s" onclick="hhLiveResume(\''+esc(s.code)+'\')">'+ico('play',14)+' إكمال</button><button class="e2-b s ib4-end" onclick="hhLiveEndSession(\''+esc(s.code)+'\')">إنهاء</button></div>'; }).join('')+'</div>';
  var done=_ib.sessions.filter(function(s){ return s.state==='ended'; }).slice(0,8);
  if(done.length) html+='<div class="ib2-sec ib4-ss"><h2>جولات منتهية</h2><small>آخر '+done.length+'</small></div><div class="ib4-rows">'+done.map(function(s){ return '<div class="ib4-row"><span class="ib4-rt"><b>'+esc(ib4Title(s.title))+'</b><small>'+(s.playersCount||0)+' لاعباً، '+ib4Date(s.updatedAt||s.createdAt)+'</small></span><span class="pill done">منتهية</span></div>'; }).join('')+'</div>';
  setTimeout(ib4MFilter,0);
  return html;
}
function ib4MFilter(){
  var F=_ib.mf||{m:'',q:''}, q=String(F.q||'').trim().toLowerCase(), n=0;
  document.querySelectorAll('#ib4-mgrid .ib4-mc').forEach(function(c){ var ok=(!F.m||c.getAttribute('data-m')===F.m)&&(!q||c.getAttribute('data-t').indexOf(q)>-1); c.hidden=!ok; if(ok) n++; });
  var none=document.getElementById('ib4-mnone'); if(none) none.hidden=n>0;
}
window.hhIbMF=function(k,v,btn){ _ib.mf=_ib.mf||{m:'',q:''}; _ib.mf[k]=v; if(btn){ btn.parentNode.querySelectorAll('button').forEach(function(b){ b.classList.toggle('on',b===btn); }); } ib4MFilter(); };
window.hhIbMineDo=function(ev,act,id){ ev.stopPropagation(); ib4Close(); if(act==='dup') hhIbDup(id); else if(act==='del') hhIbDel(id); };


/* ── إنشاء وحذف ونسخ ── */
function defSettings(tid){ return { hideRank:'last', hideLastN:5, scoring:'speed', shuffleQ:false, shuffleOpts:true, showAnswerEach:true, defaultTime:(tid==='tf'||tid==='s-tf'?10:20), teams:2, basePts:20 }; }
window.hhIbCreate=function(tid){
  if(!canUse()){ toastX('سجّل الدخول بحساب المعلم أولاً','error'); return; }
  var t=TEMPLATES.filter(function(x){ return x.id===tid; })[0]; if(!t||!t.ready) return;
  var g={ id:newId('g'), template:(t.kind==='screen'?(t.scr==='tfs'?'tf':'race'):tid), mode:(t.kind==='screen'?'screen':'live'), screenTpl:(t.scr||'boxes'), title:t.name+'، '+new Date().toLocaleDateString('en-GB'), status:'draft', createdAt:Date.now(), updatedAt:Date.now(), settings:defSettings(tid), questions:[] };
  _ib.games.push(g); persist(g,true); _ib.gameId=g.id; _ib.readyGame=null; _ib.qIdx=0; _ib.mtab='edit'; _ib.view='editor'; render();
  addQuestion();
};
window.hhIbEdit=function(id){ _ib.readyGame=null; _ib.gameId=id; _ib.qIdx=0; _ib.mtab='edit'; _ib.view='editor'; render(); var o=document.getElementById('hh-ib'); if(o) o.scrollTop=0; };
window.hhIbDup=function(id){ var g=getGame(id); if(!g) return; var c=clone(g); c.id=newId('g'); c.title=g.title+' (نسخة)'; c.createdAt=Date.now(); c.status='draft'; _ib.games.push(c); persist(c,true); render(); toastX('نُسخت اللعبة','success'); };
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
function liveRun(g){
  if(g.extras&&g.extras.length&&!g._exDone){ askExtras(g,function(){ liveRun(g); }); return; }
  var qs=(g.questions||[]).filter(function(q){ return q.type!=='open'&&q.type!=='pair'; });
  if(!qs.length){ toastX('لا أسئلة صالحة للتشغيل المباشر، المقالي والأزواج تُعرض على الشاشة فقط','info'); return; }
  if(!uid()){ toastX('سجّل الدخول بحساب المعلم لبدء جولة مباشرة','error'); return; }
  if(typeof hhLiveHost!=='function'){ toastX('وحدة التشغيل المباشر غير محمّلة، تأكد من رفع almulhim-live.js','error'); return; }
  var c=clone(g); c.questions=qs; delete c.extras; if(!c.id) c.id=newId('g'); close(); hhLiveHost(c);
}
function screenRun(g){
  var qs=(g.questions||[]).filter(function(q){ return complete(q); });
  if(!qs.length&&!(g.extras&&g.extras.length)){ toastX('أكمل سؤالاً واحداً على الأقل','info'); return; }
  if(typeof hhScreenPlay!=='function'){ toastX('وحدة العرض على الشاشة غير محمّلة، تأكد من رفع almulhim-ibdaa-screen.js','error'); return; }
  var c=clone(g); c.questions=qs; hhScreenPlay(c);
}
/* zzzzzzcc، نافذة الأسئلة الإضافية قبل السباق المباشر */
function exUnits(extras){ var o=[], seen={}; (extras||[]).forEach(function(q){ if(q.uk&&!seen[q.uk]){ seen[q.uk]=1; o.push({k:q.uk,n:q.un||q.uk,c:0}); } }); o.forEach(function(u){ u.c=extras.filter(function(q){ return q.uk===u.k; }).length; }); return o; }
function askExtras(g,done){
  var core=(g.questions||[]).length, ex=g.extras||[], U=exUnits(ex);
  var st={n:core?0:ex.length, u:U.map(function(x){ return x.k; })};
  var ov=document.createElement('div'); ov.className='ib5-exov'; (document.getElementById('hh-ib')||document.body).appendChild(ov);
  function pool(){ return ex.filter(function(q){ return st.u.indexOf(q.uk)>-1; }).length; }
  function draw(){ var P=pool(); if(st.n>P) st.n=P;
    ov.innerHTML='<div class="ib5-ex" role="dialog" aria-label="أسئلة اللعبة"><h3>أسئلة اللعبة</h3><div class="ib5-exg"><div class="bk core"><b>'+ico('lock',16)+' الأساسية، ثابتة</b><span class="big">'+core+'</span><small>'+(core?'أسئلة بنك الأسئلة':'لا أسئلة أساسية لهذه الوحدة بعد')+'</small></div>'
      +'<div class="bk"><b>'+ico('plus',16)+' أضف من بنك «مدرستي»</b><small>اكتب العدد الذي تريده، واختر الوحدات. تُوزَّع بالتساوي على الوحدات ومستويات الصعوبة.</small>'
      +'<div class="nm"><button type="button" data-d="-1" aria-label="أنقص">−</button><input type="number" inputmode="numeric" min="0" max="'+P+'" value="'+st.n+'" aria-label="عدد الأسئلة الإضافية"><button type="button" data-d="1" aria-label="زد">+</button><span>من '+P+'</span></div>'
      +(U.length>1?'<div class="un">'+U.map(function(u){ return '<label><input type="checkbox" data-u="'+u.k+'"'+(st.u.indexOf(u.k)>-1?' checked':'')+'>'+esc(u.n)+' <em>'+u.c+'</em></label>'; }).join('')+'</div>':'')+'</div></div>'
      +'<div class="tot">مجموع أسئلة اللعبة <b>'+(core+st.n)+'</b></div><div class="ac"><button type="button" class="e2-b" data-x="0">إلغاء</button><button type="button" class="e2-b p" data-x="1" '+(core+st.n?'':'disabled')+'>'+ico('play',15)+' ابدأ</button></div></div>';
    ov.querySelectorAll('[data-d]').forEach(function(b){ b.onclick=function(){ st.n=Math.max(0,Math.min(pool(),st.n+(+b.getAttribute('data-d'))*(pool()>40?5:1))); draw(); }; });
    var inp=ov.querySelector('input[type=number]'); if(inp) inp.onchange=function(){ st.n=Math.max(0,Math.min(pool(),parseInt(inp.value,10)||0)); draw(); };
    ov.querySelectorAll('[data-u]').forEach(function(c){ c.onchange=function(){ var k=c.getAttribute('data-u'); st.u=st.u.filter(function(x){ return x!==k; }); if(c.checked) st.u.push(k); draw(); }; });
    ov.querySelector('[data-x="0"]').onclick=function(){ ov.remove(); };
    ov.querySelector('[data-x="1"]').onclick=function(){ ov.remove(); g.questions=(g.questions||[]).concat(pickExtras(ex,st.n,st.u)); g._exDone=true; done(); };
  }
  draw();
}
window.hhIbRun=function(id){ flushAll(); var g=(_ib.readyGame&&_ib.readyGame.id===id)?_ib.readyGame:getGame(id); if(!g||!(g.questions||[]).length){ toastX('أضف أسئلة أولاً','info'); return; } liveRun(g); };
window.hhIbShow=function(id){ flushAll(); var g=(_ib.readyGame&&_ib.readyGame.id===id)?_ib.readyGame:getGame(id); if(!g||!(g.questions||[]).length){ toastX('أضف أسئلة أولاً','info'); return; } screenRun(g); };

/* ── المحرر (ثلاثة أعمدة) ── */
var LET=['أ','ب','ج','د']; var OC=['#8A1538','#3D6B53','#8A6D2E','#1F4E79']; var OS=['◆','●','▲','■'];
function cur(){ return _ib.readyGame || getGame(_ib.gameId); }
function blankQ(g, type){
  var S=(g&&g.settings)||{}; var sc=(g.mode==='screen')?g.screenTpl:''; var t=type||(g.template==='cloud'?'poll':(g.template==='order'||sc==='order')?'order':(sc==='match'||sc==='memory')?'pair':(g.template==='tf'||sc==='tfs')?'tf':(g._ready&&g._ready.kind==='open')?'open':'mcq');
  var base={ id:newId('q'), type:t, q:'', time:S.defaultTime||(t==='tf'?10:20), mult:1, flash:false, note:'' };
  if(t==='poll'){ base.opts=[]; base.correct=[]; base.time=30; }
  else if(t==='order'){ base.opts=['','','']; base.correct=[0,1,2]; base.time=30; }
  else if(t==='tf'){ base.opts=['صح','خطأ']; base.correct=[0]; }
  else if(t==='open'){ base.opts=[]; base.correct=[]; base.pts=['']; base.time=45; }
  else if(t==='pair'){ base.opts=[]; base.correct=[]; base.pairs=[{a:'',b:''},{a:'',b:''},{a:'',b:''}]; base.time=90; base.q='صل كل مصطلح بمعناه'; }
  else { base.opts=['','','','']; base.correct=[0]; }
  return base;
}
function complete(q){
  if(!q||!String(q.q||'').trim()) return false;
  if(q.type==='tf'||q.type==='poll') return true;
  if(q.type==='open') return (q.pts||[]).some(function(p){ return String(p||'').trim(); });
  if(q.type==='order') return (q.opts||[]).filter(function(o){ return String(o||'').trim(); }).length>=2;
  if(q.type==='pair') return pairsOk(q).length>=3;
  var filled=(q.opts||[]).filter(function(o){ return String(o||'').trim(); }).length;
  var c=(q.correct||[])[0]; return filled>=2 && c!=null && String((q.opts||[])[c]||'').trim()!=='';
}
function pairsOk(q){ return (q.pairs||[]).filter(function(p){ return p&&String(p.a||'').trim()&&String(p.b||'').trim(); }); }
window._hhIbPairsOk=pairsOk;
function issue(q,g){
  if(!String(q.q||'').trim()) return 'نص السؤال فارغ';
  if(q.type==='mcq'){ var filled=(q.opts||[]).filter(function(o){ return String(o||'').trim(); }).length; if(filled<2) return 'يحتاج بديلين على الأقل'; var c=(q.correct||[])[0]; if(c==null||!String((q.opts||[])[c]||'').trim()) return 'الإجابة الصحيحة بلا نص'; }
  if(q.type==='open' && !complete(q)) return 'أضف نقطة واحدة على الأقل للإجابة';
  if(q.type==='order' && !complete(q)) return 'يحتاج عنصرين على الأقل';
  if(q.type==='pair' && !complete(q)) return 'يحتاج 3 أزواج مكتملة على الأقل';
  if(modeOf(g)==='live' && q.type==='pair') return 'الأزواج لا تظهر في التشغيل المباشر';
  if(modeOf(g)==='live' && q.type==='open') return 'المقالي لا يظهر في التشغيل المباشر';
  if(modeOf(g)==='screen'){ var ok=(SCR[g.screenTpl||'boxes']||SCR.boxes).types; if(ok.indexOf(q.type)<0) return 'لا يناسب قالب «'+(SCR[g.screenTpl]||SCR.boxes).name+'»'; }
  return '';
}
function addQuestion(type){ var g=cur(); if(!g) return; if(g._ready&&g._ready.noAdd){ toastX(g._ready.noAdd,'info'); return; } g.questions=g.questions||[]; var q=blankQ(g,type); if(g._ready&&g._ready.defCat) q.srcCat=g._ready.defCat; g.questions.push(q); _ib.qIdx=g.questions.length-1; _ib.mtab='edit'; persist(g); render(); setTimeout(function(){ var e=document.getElementById('ibq-text'); if(e) e.focus(); },50); }
window.hhIbAddQ=function(){ addQuestion(); };
window.hhIbSel=function(i){ _ib.qIdx=i; _ib.mtab='edit'; render(); };
window.hhIbMove=function(i,d){ var g=cur(); var qs=g.questions; var j=i+d; if(j<0||j>=qs.length) return; var t=qs[i]; qs[i]=qs[j]; qs[j]=t; _ib.qIdx=j; persist(g); render(); };
window.hhIbDelQ=function(i){ var g=cur(); var q=g.questions.splice(i,1)[0]; _ib.qIdx=Math.max(0,Math.min(i,g.questions.length-1)); persist(g); render(); undoBar('حُذف السؤال', function(){ g.questions.splice(i,0,q); _ib.qIdx=i; persist(g); render(); }); };
window.hhIbDupQ=function(i){ var g=cur(); var c=clone(g.questions[i]); c.id=newId('q'); delete c.srcIdx; g.questions.splice(i+1,0,c); _ib.qIdx=i+1; persist(g); render(); };
window.hhIbMTab=function(t){ _ib.mtab=t; render(); };

function renderEditor(){
  var g=cur(); if(!g) return '<div class="empty">اللعبة غير موجودة</div>';
  var qs=g.questions||[]; if(_ib.qIdx>=qs.length) _ib.qIdx=Math.max(0,qs.length-1);
  var q=qs[_ib.qIdx]; var S=g.settings||{}; var md=modeOf(g); var R=g._ready;
  var liveOnly=(g.template==='cloud'||g.template==='order');
  var crumb=R?'ألعاب جاهزة › '+esc(R.crumb||''):'الإبداع › '+esc(tplName(g));
  var top='<div class="e2-tb"><button class="e2-bk" title="رجوع" onclick="hhIbBack()">'+ico('back',18)+'</button>'
    +'<div class="e2-tt"><small>'+crumb+'</small><input id="ibg-title" value="'+esc(g.title||'')+'" aria-label="عنوان اللعبة"></div>'
    +'<span class="e2-svs '+(_ib.svSt||'ok')+'" id="ib-save-st"><i></i>'+(_ib.svSt==='dirty'?'تغييرات غير محفوظة':_ib.svSt==='err'?'محفوظ على الجهاز فقط':(_ib.svTime?'محفوظ في حسابك، '+_ib.svTime:'محفوظ'))+'</span><button type="button" class="e2-svb '+(_ib.svSt||'ok')+'" id="ib-save" onclick="hhIbSaveNow()">'+(_ib.svSt==='dirty'?SVI.save+' حفظ <kbd>Ctrl+S</kbd>':_ib.svSt==='busy'?'<span class="spn"></span> جارٍ الحفظ':_ib.svSt==='err'?'أعد المحاولة':SVI.ok+' تم الحفظ')+'</button>'
    +'<div class="e2-mode"><button class="'+(md==='live'?'on':'')+'" onclick="hhIbMode(\'live\')">'+ico('phone',16)+' مباشر <small>على أجهزة الطلاب</small></button><button class="'+(md==='screen'?'on':'')+'" '+(liveOnly?'disabled title="هذا القالب مباشر فقط"':'')+' onclick="hhIbMode(\'screen\')">'+ico('monitor',16)+' على شاشة الصف <small>بلا أجهزة</small></button></div>'
    +'<button class="e2-b e2-hide" onclick="hhIbSettings()">'+ico('gear',16)+' إعدادات اللعبة</button>'
    +(md==='screen'?'<button class="e2-b p" onclick="hhIbShow(\''+g.id+'\')">'+ico('monitor',16)+' اعرض على الشاشة</button>':'<button class="e2-b p" onclick="hhIbRun(\''+g.id+'\')">'+ico('play',16)+' تشغيل مباشر</button>')
    +'</div>';
  var strip='';
  if(md==='screen'){
    var st=SCR[g.screenTpl||'boxes']||SCR.boxes;
    strip='<div class="e2-strip">'+ico('monitor',18)+'<span class="k">القالب</span><span class="v">'+esc(st.name)+'</span><button class="e2-ch" onclick="hhIbTplPick()">'+ico('grid',14)+' غيّر القالب</button><span style="flex:1"></span>'
      +'<span class="e2-ch">'+ico('users',14)+' <select id="ibs-teams">'+[1,2,3,4].map(function(n){ return '<option value="'+n+'"'+((S.teams||2)==n?' selected':'')+'>'+(n===1?'بلا فرق':n+' فرق')+'</option>'; }).join('')+'</select></span>'
      +'<span class="e2-ch">'+ico('star',14)+' <select id="ibs-pts">'+[10,20,50,100].map(function(n){ return '<option value="'+n+'"'+((S.basePts||20)==n?' selected':'')+'>'+n+' نقطة للسؤال</option>'; }).join('')+'</select></span>'
      +'<span class="e2-ch">'+ico('dice',14)+' اختيار الطالب من قائمة الشعبة عند العرض</span></div>';
  }
  var banner='';
  if(R){
    banner='<div class="e2-banner">'+ico('alert',18)+'<span>'+(R.kind==='tf'?'تعديلاتك هنا تُحفظ في الألعاب الجاهزة وتظهر لكل المعلمين'+(R.published?'.':' بعد النشر.'):R.kind==='custom'?'لعبة جاهزة إضافية، تظهر لكل المعلمين في تبويب «ألعاب جاهزة».':'تعديلاتك هنا تُحفظ في المصدر نفسه: تظهر لكل المعلمين هنا وفي «العب الآن» ('+esc((R.cats||[]).join('، '))+').')+(R.noAdd?' '+esc(R.noAdd):'')+'</span>'
      +(R.kind==='tf'&&!R.published?'<button class="e2-b s p" style="margin-inline-start:auto" onclick="hhIbReadyPublish(\''+R.rid+'\')">'+ico('send',14)+' انشر للمعلمين</button>':'')+'</div>';
  }
  /* الأسئلة */
  var list=qs.map(function(x,i){
    var ok=complete(x)&&!issue(x,g);
    var tags=(x.mult>1?'<span class="e2-tag">×'+x.mult+'</span>':'')+(x.flash?'<span class="e2-tag">برق</span>':'');
    var sub=x.type==='tf'?'صح أم خطأ':x.type==='open'?'مقالي':x.type==='poll'?'سحابة كلمات':x.type==='order'?((x.opts||[]).filter(function(o){return String(o||'').trim();}).length+' عناصر للترتيب'):x.type==='pair'?(pairsOk(x).length+' أزواج'):((x.opts||[]).filter(function(o){return String(o||'').trim();}).length+' بدائل');
    return '<div class="e2-qi '+(i===_ib.qIdx?'on':'')+'" draggable="true" data-i="'+i+'" onclick="hhIbSel('+i+')"><span class="dg">'+ico('drag',14)+'</span><span class="n">'+(i+1)+'</span><span class="tx">'+esc(x.q||'(سؤال فارغ)')+'<small><em class="tk tk-'+x.type+'">'+({mcq:'اختيار',tf:'صح وخطأ',open:'مقالي',pair:'أزواج',order:'ترتيب',poll:'سحابة'}[x.type]||'')+'</em>'+(x.diff?'<em class="tk tk-d">'+({easy:'سهل',med:'متوسط',hard:'صعب'}[x.diff]||'')+'</em>':'')+(x.type==='tf'||x.type==='open'?'':esc(sub))+'</small></span><span class="rt">'+tags+'<span class="st'+(ok?'':' w')+'" title="'+(ok?'مكتمل':esc(issue(x,g)||'غير مكتمل'))+'"></span></span></div>';
  }).join('');
  var colQ='<div class="e2-cd e2-colq'+(_ib.mtab==='list'?' on':'')+'"><div class="e2-hd">'+ico('list',16)+' الأسئلة <em>'+qs.length+'</em></div><div class="e2-ql" id="ib-ql">'+(list||'<div class="hint" style="padding:10px;">لا أسئلة بعد</div>')+'</div>'
    +'<button class="e2-add" onclick="hhIbAddQ()">'+ico('plus',18)+' سؤال جديد</button>'
    +(R&&R.noAdd?'':'<div class="e2-sl">أو استورد</div><div class="e2-imp"><button onclick="hhIbImport(\'cats\')">'+ico('grid',18)+' من الفئات</button><button onclick="hhIbImport(\'xls\')">'+ico('file',18)+' من ملف Excel</button><button onclick="hhIbImport(\'paste\')">'+ico('paste',18)+' لصق نص</button></div>')+'</div>';
  /* التحرير */
  var body;
  if(!q){ body='<div class="e2-ed"><div class="empty">أضف أول سؤال من «سؤال جديد» أو استورد أسئلة.</div></div>'; }
  else{
    var lockType=!!(R&&R.kind!=='custom');
    var types=[['mcq','اختيار من متعدد'],['tf','صح أم خطأ'],['open','مقالي، بطاقة'],['pair','أزواج للتوصيل'],['order','ترتيب']];
    if(q.type==='poll') types=[['poll','سحابة كلمات']];
    if(g.template==='order') types=[['order','رتّب العناصر']];
    var typ='<div class="e2-typ">'+types.map(function(t){ return '<button class="'+(q.type===t[0]?'on':'')+'" '+((lockType||q.type==='poll'||g.template==='order')&&q.type!==t[0]?'disabled':'')+' onclick="hhIbQType(\''+t[0]+'\')">'+t[1]+'</button>'; }).join('')+'</div>';
    var len=String(q.q||'').length;
    var qt='<div class="e2-qt"><textarea id="ibq-text" maxlength="240" placeholder="اكتب السؤال كما سيظهر للطلاب">'+esc(q.q||'')+'</textarea><span class="cnt" id="ibq-cnt" dir="ltr">'+len+' / 240</span></div>';
    var ims='<label class="e2-ims">'+(q.img?'<img src="'+esc(q.img)+'" alt=""><span>صورة السؤال</span><button class="e2-b s d x" onclick="event.preventDefault();hhIbImgDel()">'+ico('trash',13)+' إزالة</button>':ico('img',20)+'<span>أضف صورة أو خريطة للسؤال (اختياري)</span>')+'<input type="file" accept="image/*" id="ibq-img" style="display:none"></label>';
    var ans='';
    if(q.type==='mcq'||q.type==='tf'){
      var opts=q.type==='tf'?['صح','خطأ']:(q.opts||['','','','']); while(q.type==='mcq'&&opts.length<4) opts.push('');
      ans='<div class="e2-lab">'+(q.type==='tf'?'الإجابة الصحيحة':'البدائل')+' <small>'+(q.type==='tf'?'اضغط الدائرة على الإجابة الصحيحة':'اضغط الدائرة على الإجابة الصحيحة')+'</small></div><div class="e2-ans">'+opts.slice(0,q.type==='tf'?2:4).map(function(o,i){
        var cr=(q.correct||[]).indexOf(i)>-1;
        return '<div class="e2-an'+(cr?' cr':'')+'" style="--a:'+(q.type==='tf'?(i===0?'#3D6B53':'#B3261E'):OC[i])+'"><i>'+(q.type==='tf'?(i===0?ico('check',18,2.6):ico('x',18,2.6)):OS[i])+'</i><input id="ibq-o'+i+'" value="'+esc(o)+'" placeholder="البديل '+LET[i]+'" '+(q.type==='tf'?'readonly':'')+'><button class="ok" title="الإجابة الصحيحة" onclick="hhIbCorrect('+i+')">'+ico('check',16,3)+'</button></div>';
      }).join('')+'</div>';
    } else if(q.type==='open'){
      var pts=(q.pts&&q.pts.length)?q.pts:[''];
      ans='<div class="e2-lab">نقاط الإجابة النموذجية <small>تنكشف على الشاشة نقطة نقطة، والفريق يأخذ نقاطاً بعدد ما ذكره</small></div><div class="e2-pts">'+pts.map(function(p,i){ return '<div class="e2-pt"><i>'+(i+1)+'</i><input id="ibq-p'+i+'" value="'+esc(p)+'" placeholder="النقطة '+(i+1)+'"><button title="حذف" onclick="hhIbPtDel('+i+')">'+ico('x',14)+'</button></div>'; }).join('')+'</div>'
        +'<button class="e2-b s" style="margin-top:8px" onclick="hhIbPtAdd()">'+ico('plus',14)+' نقطة</button>';
    } else if(q.type==='pair'){
      var prs=(q.pairs&&q.pairs.length)?q.pairs:[{a:'',b:''}];
      var elig=eligibleMcq(g).length;
      ans='<div class="e2-lab">الأزواج <small>من 3 إلى 8 أزواج، تُخلط على الشاشة تلقائياً</small></div><div class="e2-prs">'+prs.map(function(p,i){ return '<div class="e2-pr"><input id="ibq-pa'+i+'" value="'+esc(p.a||'')+'" placeholder="المصطلح"><span class="lk">'+ico('link',16)+'</span><input id="ibq-pb'+i+'" value="'+esc(p.b||'')+'" placeholder="معناه"><button title="حذف" onclick="hhIbPairDel('+i+')">'+ico('x',14)+'</button></div>'; }).join('')+'</div>'
        +'<button class="e2-b s" style="margin-top:8px" onclick="hhIbPairAdd()">'+ico('plus',14)+' زوج</button>'
        +(elig&&!(R&&R.kind!=='custom')?'<div class="e2-cv">'+ico('spark',18)+'<span>تحويل سريع: أنشئ أزواجاً من أسئلة الاختيار في هذه اللعبة (السؤال ↔ إجابته الصحيحة)، '+elig+' '+(elig>2&&elig<11?'أسئلة مناسبة':'سؤالاً مناسباً')+'</span><button class="e2-b s" onclick="hhIbConvert()">حوّل</button></div>':'');
    } else {
      var isPoll=q.type==='poll'; var arr=(q.opts&&q.opts.length)?q.opts:[''];
      ans='<div class="e2-lab">'+(isPoll?'إجابات مقترحة <small>اختيارية وتظهر كتلميح فقط</small>':'العناصر بالترتيب الصحيح <small>تُخلط على الشاشة ويرتّبها الطلاب</small>')+'</div><div class="e2-pts">'+arr.map(function(o,i){ return '<div class="e2-pt"><i style="background:'+(isPoll?'#8A6D2E':'#1F4E79')+'">'+(i+1)+'</i><input id="ibq-o'+i+'" value="'+esc(o)+'" placeholder="'+(isPoll?'إجابة مقترحة':'العنصر')+' '+(i+1)+'"><button title="حذف" onclick="hhIbOptDel('+i+')">'+ico('x',14)+'</button></div>'; }).join('')+'</div><button class="e2-b s" style="margin-top:8px" onclick="hhIbAddOpt()">'+ico('plus',14)+' عنصر</button>';
    }
    var times=[5,8,10,15,20,30,45,60,90,120];
    var opt='<div class="e2-opt"><span class="e2-ch">'+ico('clock',14)+' <select id="ibq-time">'+times.map(function(t){ return '<option value="'+t+'"'+(q.time==t?' selected':'')+'>'+t+' ثانية</option>'; }).join('')+'</select></span>'
      +'<button class="e2-ch'+(q.mult>1?' on':'')+'" onclick="hhIbToggle(\'mult\')">'+ico('x2',14)+' درجة مضاعفة</button>'
      +'<button class="e2-ch'+(q.flash?' on':'')+'" onclick="hhIbToggle(\'flash\')">'+ico('bolt',14)+' سؤال البرق</button>'
      +'<button class="e2-ch'+(q.note?' on':'')+'" onclick="hhIbToggle(\'note\')">'+ico('note',14)+' ملاحظة للمعلم</button>'
      +'<span class="e2-qa"><button class="e2-b s" title="أعلى" onclick="hhIbMove('+_ib.qIdx+',-1)">'+ico('up',14)+'</button><button class="e2-b s" title="أسفل" onclick="hhIbMove('+_ib.qIdx+',1)">'+ico('down',14)+'</button><button class="e2-b s" onclick="hhIbDupQ('+_ib.qIdx+')">'+ico('copy',14)+' تكرار</button><button class="e2-b s d" onclick="hhIbDelQ('+_ib.qIdx+')">'+ico('trash',14)+' حذف</button></span></div>'
      +'<div class="e2-note" id="ibq-notew" style="'+(q.note||_ib.noteOpen?'':'display:none')+'"><input id="ibq-note" value="'+esc(q.note||'')+'" placeholder="'+(q.type==='tf'?'التصحيح أو الشرح الذي يظهر بعد كشف الإجابة':'شرح يظهر بعد كشف الإجابة')+'"></div>';
    var iss=issue(q,g);
    if(q.type!=='poll') opt+='<div class="e2-df">الصعوبة'+[['easy','سهل'],['med','متوسط'],['hard','صعب']].map(function(d){ return '<button type="button" class="'+(q.diff===d[0]?'on':'')+'" onclick="hhIbDiff(\''+d[0]+'\')">'+d[1]+'</button>'; }).join('')+'<small>تُرتَّب بها صناديق الأسرار في صفوف</small></div>';
    body='<div class="e2-ed">'+typ+qt+ims+ans+opt+(iss?'<div class="e2-ln" style="margin-top:10px"><i class="w">!</i>'+esc(iss)+'</div>':'')+'</div>';
  }
  var colE='<div class="e2-cd e2-cole'+(_ib.mtab==='edit'?' on':'')+'">'+body+'</div>';
  /* المعاينة والجاهزية */
  var pv='';
  if(q){
    if(md==='live'){
      var po=q.type==='tf'?['صح','خطأ']:(q.opts||[]);
      pv='<div class="e2-ph"><div class="e2-scr"><div class="e2-sb"><span>السؤال '+(_ib.qIdx+1)+' من '+qs.length+'</span><span>'+(q.time||20)+' ث</span></div><div class="e2-sq">'+esc(q.q||'نص السؤال')+'</div>'
        +(q.type==='open'||q.type==='pair'?'<div class="e2-sq" style="color:#B3261E;font-size:12.5px">'+(q.type==='pair'?'الأزواج تُعرض على الشاشة فقط':'المقالي لا يظهر في التشغيل المباشر')+'</div>':'<div class="e2-sa">'+po.slice(0,4).map(function(o,i){ return '<span style="--a:'+(q.type==='tf'?(i===0?'#3D6B53':'#B3261E'):OC[i])+'">'+(q.type==='tf'?'':OS[i])+'<small>'+esc(o||'')+'</small></span>'; }).join('')+'</div>')+'</div></div><div class="e2-cap">كما يراه الطالب على جواله</div>';
    } else {
      var so=q.type==='tf'?['صح','خطأ']:(q.opts||[]);
      pv='<div class="e2-tv"><div class="h"><span>'+esc((SCR[g.screenTpl]||SCR.boxes).name)+'</span><span>'+(_ib.qIdx+1)+' من '+qs.length+'</span></div><div class="q">'+esc(q.q||'نص السؤال')+'</div>'
        +(q.type==='pair'?'<div class="a">'+pairsOk(q).slice(0,4).map(function(p){ return '<span style="--a:#1F4E79">'+esc(p.a)+'</span><span style="--a:#5E0E26">'+esc(p.b)+'</span>'; }).join('')+'</div>':q.type==='order'?'<div class="a">'+(q.opts||[]).filter(function(o){return String(o||'').trim();}).slice(0,4).map(function(o,i){ return '<span style="--a:#8A6D2E">'+(i+1)+'. '+esc(o)+'</span>'; }).join('')+'</div>':q.type==='open'?'<div class="a">'+(q.pts||[]).slice(0,4).map(function(p,i){ return '<span style="--a:#2F6A4E">'+(i+1)+'. '+esc(p||'')+'</span>'; }).join('')+'</div>':'<div class="a">'+so.slice(0,4).map(function(o,i){ return '<span style="--a:'+(q.type==='tf'?(i===0?'#3D6B53':'#B3261E'):OC[i])+'">'+esc(o||'')+'</span>'; }).join('')+'</div>')+'</div><div class="e2-cap">كما يظهر على شاشة الصف</div>';
    }
  }
  var okN=qs.filter(function(x){ return complete(x)&&!issue(x,g); }).length;
  var bad=qs.map(function(x,i){ return {i:i,m:issue(x,g)}; }).filter(function(x){ return x.m; });
  var chk='<div class="e2-chk"><h4>'+ico('check',16)+' الجاهزية <em class="'+(bad.length?'w':'')+'">'+okN+' من '+qs.length+' أسئلة مكتملة</em></h4>'
    +(qs.length?'':'<div class="e2-ln"><i class="w">!</i>لا أسئلة بعد</div>')
    +(bad.length?bad.slice(0,6).map(function(x){ return '<div class="e2-ln"><i class="w">!</i>السؤال '+(x.i+1)+': '+esc(x.m)+'<a onclick="hhIbSel('+x.i+')">انتقل</a></div>'; }).join('')+(bad.length>6?'<div class="e2-ln"><i class="w">+</i>'+(bad.length-6)+' ملاحظات أخرى</div>':''):(qs.length?'<div class="e2-ln"><i class="g">'+ico('check',12,3)+'</i>كل الأسئلة جاهزة للعرض</div>':''))
    +(qs.length?(qs.length<=25?'<div class="e2-ln"><i class="g">'+ico('check',12,3)+'</i>'+(qs.length===1?'سؤال واحد':qs.length===2?'سؤالان':qs.length+' '+(qs.length<11?'أسئلة':'سؤالاً'))+'، مناسب لحصة واحدة</div>':'<div class="e2-ln"><i class="w">!</i>'+qs.length+' سؤالاً، قد تحتاج أكثر من حصة</div>'):'')
    +(function(){ var d={easy:0,med:0,hard:0}, n=0; qs.forEach(function(x){ if(d[x.diff]!=null){ d[x.diff]++; n++; } }); if(n<Math.max(4,Math.ceil(qs.length/2))) return ''; if(!d.hard) return '<div class="e2-ln"><i class="w">!</i>لا توجد أسئلة صعبة، أضف سؤالين</div>'; if(!d.easy) return '<div class="e2-ln"><i class="w">!</i>لا توجد أسئلة سهلة للبداية</div>'; return '<div class="e2-ln"><i class="g">'+ico('check',12,3)+'</i>الصعوبة متوازنة: '+d.easy+' سهل، '+d.med+' متوسط، '+d.hard+' صعب</div>'; })()+'</div>';
  var sum='<div class="e2-sum"><div>الطريقة<b>'+(md==='screen'?'على شاشة الصف':'مباشر')+'</b></div><div>'+(md==='screen'?'الفرق':'الترتيب')+'<b>'+(md==='screen'?((S.teams||2)===1?'بلا فرق':(S.teams||2)+' فرق'):(S.hideRank==='always'?'مخفي حتى النهاية':S.hideRank==='never'?'بعد كل سؤال':'يُخفى في الأخير'))+'</b></div><div>الزمن الافتراضي<b>'+(S.defaultTime||20)+' ثانية</b></div><div>'+(md==='screen'?'نقاط السؤال':'النقاط')+'<b>'+(md==='screen'?(S.basePts||20):(S.scoring==='fixed'?'ثابتة':'بالسرعة'))+'</b></div></div>';
  var colP='<div class="e2-cd e2-colp'+(_ib.mtab==='prev'?' on':'')+'"><div class="e2-hd">'+ico('eye',16)+' المعاينة</div><div class="e2-pv">'+(pv||'<div class="hint">ستظهر المعاينة عند إضافة سؤال</div>')+'</div>'+chk+sum+'</div>';
  var mt='<div class="e2-mt"><button class="'+(_ib.mtab==='list'?'on':'')+'" onclick="hhIbMTab(\'list\')">الأسئلة '+qs.length+'</button><button class="'+(_ib.mtab==='edit'?'on':'')+'" onclick="hhIbMTab(\'edit\')">التحرير</button><button class="'+(_ib.mtab==='prev'?'on':'')+'" onclick="hhIbMTab(\'prev\')">المعاينة</button></div>';
  var stk='<div class="e2-stk"><button class="e2-b" onclick="hhIbAddQ()">'+ico('plus',16)+' سؤال</button><button type="button" class="e2-svb m '+(_ib.svSt||'ok')+'" onclick="hhIbSaveNow()">'+(_ib.svSt==='dirty'?SVI.save+' حفظ':_ib.svSt==='busy'?'<span class="spn"></span> جارٍ الحفظ':_ib.svSt==='err'?'أعد المحاولة':SVI.ok+' تم الحفظ')+'</button>'+(md==='screen'?'<button class="e2-b p" onclick="hhIbShow(\''+g.id+'\')">'+ico('monitor',16)+' اعرض</button>':'<button class="e2-b p" onclick="hhIbRun(\''+g.id+'\')">'+ico('play',16)+' تشغيل</button>')+'</div>';
  return top+banner+strip+mt+'<div class="e2-gr">'+colQ+colE+colP+'</div>'+stk;
}
function bindEditor(){
  var g=cur(); if(!g) return; var q=(g.questions||[])[_ib.qIdx];
  var on=function(id,ev,fn){ var e=document.getElementById(id); if(e) e.addEventListener(ev,fn); };
  on('ibg-title','input',function(e){ g.title=e.target.value; persist(g); });
  on('ibs-teams','change',function(e){ g.settings=g.settings||{}; g.settings.teams=parseInt(e.target.value,10)||2; persist(g); render(); });
  on('ibs-pts','change',function(e){ g.settings=g.settings||{}; g.settings.basePts=parseInt(e.target.value,10)||20; persist(g); render(); });
  /* السحب لإعادة الترتيب */
  var ql=document.getElementById('ib-ql');
  if(ql){ var from=-1;
    ql.querySelectorAll('.e2-qi').forEach(function(it){
      it.addEventListener('dragstart',function(e){ from=+it.getAttribute('data-i'); it.classList.add('drag'); try{ e.dataTransfer.effectAllowed='move'; e.dataTransfer.setData('text/plain',String(from)); }catch(x){} });
      it.addEventListener('dragend',function(){ it.classList.remove('drag'); });
      it.addEventListener('dragover',function(e){ e.preventDefault(); it.classList.add('over'); });
      it.addEventListener('dragleave',function(){ it.classList.remove('over'); });
      it.addEventListener('drop',function(e){ e.preventDefault(); it.classList.remove('over'); var to=+it.getAttribute('data-i'); if(from<0||from===to) return; var arr=g.questions; var m=arr.splice(from,1)[0]; arr.splice(to,0,m); _ib.qIdx=to; persist(g); render(); });
    });
  }
  if(!q) return;
  on('ibq-text','input',function(e){ q.q=e.target.value; var c=document.getElementById('ibq-cnt'); if(c) c.textContent=q.q.length+' / 240'; persist(g); syncListItem(); });
  on('ibq-text','keydown',function(e){ if(e.ctrlKey&&e.key==='Enter'){ e.preventDefault(); addQuestion(); } });
  for(var pi=0;pi<10;pi++){ (function(i){ on('ibq-pa'+i,'input',function(e){ q.pairs=q.pairs||[]; while(q.pairs.length<=i) q.pairs.push({a:'',b:''}); q.pairs[i].a=e.target.value; persist(g); }); on('ibq-pb'+i,'input',function(e){ q.pairs=q.pairs||[]; while(q.pairs.length<=i) q.pairs.push({a:'',b:''}); q.pairs[i].b=e.target.value; persist(g); }); })(pi); }
  for(var i=0;i<8;i++){ (function(i){ on('ibq-o'+i,'input',function(e){ q.opts=q.opts||[]; while(q.opts.length<=i) q.opts.push(''); q.opts[i]=e.target.value; persist(g); }); on('ibq-p'+i,'input',function(e){ q.pts=q.pts||['']; q.pts[i]=e.target.value; persist(g); }); })(i); }
  on('ibq-time','change',function(e){ q.time=parseInt(e.target.value,10)||20; persist(g); });
  on('ibq-note','input',function(e){ q.note=e.target.value; persist(g); });
  on('ibq-img','change',function(e){ var f=e.target.files&&e.target.files[0]; if(!f) return; shrinkImg(f, function(url){ if(!url){ toastX('تعذّر قراءة الصورة','error'); return; } q.img=url; persist(g); render(); }); });
}
function shrinkImg(file, cb){
  try{ var r=new FileReader(); r.onload=function(ev){ var im=new Image(); im.onload=function(){ var M=900, w=im.width, h=im.height, k=Math.min(1, M/Math.max(w,h)); var c=document.createElement('canvas'); c.width=Math.round(w*k); c.height=Math.round(h*k); var x=c.getContext('2d'); x.fillStyle='#fff'; x.fillRect(0,0,c.width,c.height); x.drawImage(im,0,0,c.width,c.height); cb(c.toDataURL('image/jpeg',.78)); }; im.onerror=function(){ cb(null); }; im.src=ev.target.result; }; r.readAsDataURL(file); }catch(e){ cb(null); }
}
window.hhIbImgDel=function(){ var g=cur(); var q=g.questions[_ib.qIdx]; delete q.img; q._imgRemoved=true; persist(g); render(); };
function syncListItem(){ var g=cur(); var q=g.questions[_ib.qIdx]; var it=document.querySelector('#hh-ib .e2-qi[data-i="'+_ib.qIdx+'"] .tx'); if(!it) return; var sm=it.querySelector('small'); it.firstChild&&it.firstChild.nodeType===3?it.firstChild.nodeValue=(q.q||'(سؤال فارغ)'):it.insertBefore(document.createTextNode(q.q||'(سؤال فارغ)'),sm); }
window.hhIbCorrect=function(i){ var g=cur(); var q=g.questions[_ib.qIdx]; q.correct=[i]; persist(g); render(); };
window.hhIbDiff=function(v){ var g=cur(); if(!g) return; var q=(g.questions||[])[_ib.qIdx]; if(!q) return; if(q.diff===v) delete q.diff; else q.diff=v; persist(g); render(); };
window.hhIbToggle=function(k){ var g=cur(); var q=g.questions[_ib.qIdx]; if(k==='note'){ var w=document.getElementById('ibq-notew'); if(!w) return; var show=(w.style.display==='none'); if(!show&&String(q.note||'').trim()){ w.querySelector('input').focus(); return; } w.style.display=show?'':'none'; _ib.noteOpen=show; if(show){ var i=w.querySelector('input'); if(i) i.focus(); } return; } if(k==='mult') q.mult=(q.mult>1?1:2); else if(k==='flash') q.flash=!q.flash; persist(g); render(); };
window.hhIbPtAdd=function(){ var g=cur(); var q=g.questions[_ib.qIdx]; q.pts=q.pts||[]; if(q.pts.length>=10){ toastX('الحد عشر نقاط','info'); return; } q.pts.push(''); persist(g); render(); setTimeout(function(){ var e=document.getElementById('ibq-p'+(q.pts.length-1)); if(e) e.focus(); },30); };
window.hhIbPtDel=function(i){ var g=cur(); var q=g.questions[_ib.qIdx]; q.pts=q.pts||['']; q.pts.splice(i,1); if(!q.pts.length) q.pts=['']; persist(g); render(); };
window.hhIbAddOpt=function(){ var g=cur(); var q=g.questions[_ib.qIdx]; q.opts=q.opts||[]; if(q.opts.length>=8){ toastX('الحد ثمانية عناصر','info'); return; } q.opts.push(''); if(q.type==='order') q.correct=q.opts.map(function(_,i){return i;}); persist(g); render(); };
window.hhIbQType=function(t){ var g=cur(); var q=g.questions[_ib.qIdx]; if(q.type===t) return; var old=q.type; q.type=t;
  if(t==='tf'){ q.opts=['صح','خطأ']; q.correct=[0]; if(!q.time||q.time>15) q.time=10; }
  else if(t==='open'){ var cA=(old==='mcq'&&q.opts)?q.opts[(q.correct||[0])[0]]:''; q.pts=(q.pts&&q.pts.length)?q.pts:[cA||'']; q.opts=[]; q.correct=[]; if(!q.time||q.time<30) q.time=45; }
  else if(t==='pair'){ q.pairs=(q.pairs&&q.pairs.length)?q.pairs:[{a:'',b:''},{a:'',b:''},{a:'',b:''}]; q.opts=[]; q.correct=[]; if(!q.time||q.time<60) q.time=90; }
  else if(t==='order'){ var ok2=(old==='mcq'&&q.opts)?q.opts.filter(function(o){ return String(o||'').trim(); }):[]; q.opts=ok2.length>=2?ok2:['','','']; q.correct=q.opts.map(function(_,i){ return i; }); if(!q.time||q.time<30) q.time=60; }
  else { var keep=(old==='open'&&q.pts)?q.pts[0]:''; q.opts=(old==='mcq'&&q.opts&&q.opts.length>=4)?q.opts:[keep||'','','','']; q.correct=[0]; if(q.time>30) q.time=20; }
  persist(g); render(); };
window.hhIbPairAdd=function(){ var g=cur(); var q=g.questions[_ib.qIdx]; q.pairs=q.pairs||[]; if(q.pairs.length>=8){ toastX('الحد ثمانية أزواج','info'); return; } q.pairs.push({a:'',b:''}); persist(g); render(); setTimeout(function(){ var e=document.getElementById('ibq-pa'+(q.pairs.length-1)); if(e) e.focus(); },30); };
window.hhIbPairDel=function(i){ var g=cur(); var q=g.questions[_ib.qIdx]; q.pairs=q.pairs||[]; q.pairs.splice(i,1); if(!q.pairs.length) q.pairs=[{a:'',b:''}]; persist(g); render(); };
window.hhIbOptDel=function(i){ var g=cur(); var q=g.questions[_ib.qIdx]; q.opts=q.opts||[]; if(q.opts.length<=2){ toastX('يلزم عنصران على الأقل','info'); return; } q.opts.splice(i,1); if(q.type==='order') q.correct=q.opts.map(function(_,k){return k;}); persist(g); render(); };
/* التحويل السريع: أسئلة الاختيار ← أزواج */
function stemDef(t){ t=String(t||'').trim(); var m=t.match(/«([^»]{3,})»/); if(m) return m[1].trim(); return t.replace(/^(أيّ|أي)\s+مما\s+يلي\s+/,'').replace(/\s*(يشير التعريف السابق إلى مفهوم)\s*:?\s*$/,'').replace(/[\s:：؟?]+$/,'').trim(); }
window._hhIbStemDef=stemDef;
function eligibleMcq(g){ return (g.questions||[]).filter(function(q){ if(q.type!=='mcq') return false; var a=String((q.opts||[])[(q.correct||[0])[0]]||'').trim(); var b=stemDef(q.q); return a && a.length<=34 && b && b.length<=110; }); }
function mcqToPairs(list){ var n=list.length; if(n<3) return []; var k=Math.ceil(n/8), per=Math.ceil(n/k), out=[];
  for(var i=0;i<n;i+=per){ var ch=list.slice(i,i+per); if(ch.length<3&&out.length){ out[out.length-1].pairs=out[out.length-1].pairs.concat(ch.map(toP)); continue; } out.push({ id:newId('q'), type:'pair', q:'صل كل مصطلح بمعناه', pairs:ch.map(toP), opts:[], correct:[], time:90, mult:1, flash:false, note:'' }); }
  function toP(q){ return { a:String(q.opts[(q.correct||[0])[0]]).trim(), b:stemDef(q.q) }; }
  return out; }
window._hhIbMcqToPairs=mcqToPairs;
window.hhIbConvert=function(after){
  var g=cur(); var L=eligibleMcq(g); if(L.length<3){ toastX('يلزم 3 أسئلة اختيار مناسبة على الأقل (إجابة قصيرة)','info'); return; }
  var d=document.createElement('div'); d.id='ib-imp2';
  d.innerHTML='<div class="md" style="width:min(820px,100%)"><div class="mh">إنشاء أزواج من أسئلة الاختيار<button onclick="this.closest(\'#ib-imp2\').remove()">'+ico('x',18)+'</button></div><div class="mb"><div class="hint">كل سؤال يصبح زوجاً: الإجابة الصحيحة ↔ نص السؤال مختصراً. اختر ما تريد، وتُقسَّم الأزواج إلى جولات من 8 على الأكثر. أسئلة الاختيار نفسها تبقى كما هي.</div><div class="qq">'
    +L.map(function(q,i){ return '<label class="on"><input type="checkbox" data-i="'+i+'" checked><span><b>'+esc(q.opts[(q.correct||[0])[0]])+'</b> ↔ '+esc(stemDef(q.q))+'</span></label>'; }).join('')+'</div></div><div class="mf"><span class="sp"></span><button class="bt" onclick="this.closest(\'#ib-imp2\').remove()">إلغاء</button><button class="bt p" id="ibc-go">'+ico('link',16)+' أنشئ الأزواج</button></div></div>';
  document.body.appendChild(d);
  d.querySelectorAll('.qq input').forEach(function(el){ el.onchange=function(){ el.closest('label').classList.toggle('on',el.checked); }; });
  document.getElementById('ibc-go').onclick=function(){
    var pick=[]; d.querySelectorAll('.qq input').forEach(function(el){ if(el.checked) pick.push(L[+el.getAttribute('data-i')]); });
    var add=mcqToPairs(pick); if(!add.length){ toastX('اختر 3 أسئلة على الأقل','info'); return; }
    var cq=g.questions[_ib.qIdx]; var pos=g.questions.length;
    if(cq&&cq.type==='pair'&&!pairsOk(cq).length){ pos=_ib.qIdx; g.questions.splice(_ib.qIdx,1); }
    Array.prototype.splice.apply(g.questions,[pos,0].concat(add)); _ib.qIdx=pos;
    if(after) { g.screenTpl=after; g.mode='screen'; }
    persist(g,true); d.remove(); var t2=document.getElementById('ib-imp2'); if(t2) t2.remove(); render(); toastX('أُنشئت '+add.length+' '+(add.length===1?'جولة':'جولات')+' توصيل من '+pick.length+' سؤالاً','success');
  };
};
window.hhIbMode=function(m){ var g=cur(); if(!g) return; if(g.template==='cloud'||g.template==='order'){ if(m==='screen'){ toastX('هذا القالب يعمل مباشراً فقط','info'); } return; }
  g.mode=m; if(m==='screen'&&!g.screenTpl) g.screenTpl='boxes';
  if(m==='live'){ var n=(g.questions||[]).filter(function(q){ return q.type==='open'||q.type==='pair'; }).length; if(n) toastX(n+' من الأسئلة (مقالي أو أزواج) لن يظهر في التشغيل المباشر، يظهر على الشاشة فقط','info'); }
  persist(g); render(); };
window.hhIbTplPick=function(){
  var g=cur(); if(!g) return;
  var types={}; (g.questions||[]).forEach(function(q){ types[q.type]=(types[q.type]||0)+1; });
  var d=document.createElement('div'); d.id='ib-imp2';
  d.innerHTML='<div class="md" style="width:min(760px,100%)"><div class="mh">اختر قالب الشاشة<button onclick="this.closest(\'#ib-imp2\').remove()">'+ico('x',18)+'</button></div><div class="mb"><div class="hint">المحتوى نفسه، والقالب يتغير بنقرة. يظهر بجانب كل قالب عدد أسئلتك التي تناسبه.</div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:10px;">'
    +TEMPLATES.filter(function(t){ return t.kind==='screen'; }).map(function(t){ var fit=0; SCR[t.scr].types.forEach(function(ty){ fit+=(types[ty]||0); }); var onx=(g.screenTpl===t.scr);
      return '<button onclick="hhIbSetTpl(\''+t.scr+'\')" style="text-align:right;display:flex;flex-direction:column;gap:6px;border:1.5px solid '+(onx?'#5E0E26':'#E7DAC0')+';border-radius:16px;padding:12px;background:'+(onx?'#FBF4F6':'#fff')+';cursor:pointer;font-family:Cairo;"><span style="width:42px;height:42px;border-radius:12px;background:'+t.bg+';color:#fff;display:flex;align-items:center;justify-content:center">'+ico(t.ico,22)+'</span><b style="font-size:15px;color:#3D0918">'+esc(t.name)+'</b><span style="font-family:Tajawal;font-size:12.5px;color:#7A6A54;line-height:1.6">'+esc(t.desc)+'</span><span style="font-size:12px;font-weight:800;color:'+(fit?'#2F6A4E':'#A8650F')+'">'+fit+' من '+(g.questions||[]).length+' أسئلة تناسبه</span>'+(!fit&&(t.scr==='match'||t.scr==='memory')&&eligibleMcq(g).length>=3&&!(g._ready&&g._ready.kind!=='custom')?'<span onclick="event.stopPropagation();hhIbConvert(\''+t.scr+'\')" style="margin-top:2px;font-size:12.5px;font-weight:800;color:#fff;background:#5E0E26;border-radius:9px;padding:5px 10px">أنشئ الأزواج من أسئلتك ('+eligibleMcq(g).length+')</span>':'')+'</button>'; }).join('')
    +'</div><div class="hint" style="margin-top:10px">قريباً: '+SOON_SCR+'</div></div></div>';
  document.body.appendChild(d);
};
window.hhIbSetTpl=function(s){ var g=cur(); g.screenTpl=s; g.mode='screen'; persist(g); var d=document.getElementById('ib-imp2'); if(d) d.remove(); render(); };
window.hhIbSettings=function(){
  var g=cur(); if(!g) return; var S=g.settings||{};
  var sel=function(id,opts,v){ return '<select id="'+id+'" style="width:100%;border:1.5px solid #E7DAC0;border-radius:10px;padding:8px;font-family:Cairo;font-size:14px">'+opts.map(function(o){ return '<option value="'+o[0]+'"'+(String(v)===String(o[0])?' selected':'')+'>'+o[1]+'</option>'; }).join('')+'</select>'; };
  var f=function(l,c){ return '<div style="margin-bottom:10px"><div style="font-weight:800;font-size:13px;color:#3D0918;margin-bottom:4px">'+l+'</div>'+c+'</div>'; };
  var d=document.createElement('div'); d.id='ib-imp2';
  d.innerHTML='<div class="md" style="width:min(640px,100%)"><div class="mh">إعدادات اللعبة<button onclick="this.closest(\'#ib-imp2\').remove()">'+ico('x',18)+'</button></div><div class="mb">'
    +f('الزمن الافتراضي للسؤال الجديد',sel('st-time',[[10,'10 ثوانٍ'],[20,'20 ثانية'],[30,'30 ثانية'],[45,'45 ثانية'],[60,'60 ثانية']],S.defaultTime||20))
    +'<div style="font-weight:800;color:#5E0E26;margin:14px 0 8px">التشغيل المباشر</div>'
    +(g.template==='race'?f('نمط اللعبة',sel('st-mode',[['classic','سباق كلاسيكي (نقاط بالسرعة)'],['market','السوق، عملات وتعزيزات بين الأسئلة']],S.mode||'classic')):'')
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+f('الترتيب',sel('st-hide',[['never','يظهر بعد كل سؤال'],['last','يُخفى في الأسئلة الأخيرة'],['always','مخفي حتى النهاية']],S.hideRank||'last'))
    +f('عدد الأسئلة الأخيرة المخفية','<input id="st-n" type="number" min="1" max="20" value="'+(S.hideLastN||5)+'" style="width:100%;box-sizing:border-box;border:1.5px solid #E7DAC0;border-radius:10px;padding:8px;font-family:Cairo">')
    +f('النقاط',sel('st-scoring',[['speed','بالسرعة (حتى 1000)'],['fixed','ثابتة (1000 للصحيح)']],S.scoring||'speed'))
    +f('ترتيب الأسئلة',sel('st-shq',[[0,'ثابت'],[1,'عشوائي']],S.shuffleQ?1:0))
    +f('خلط البدائل لكل جهاز',sel('st-sho',[[1,'نعم'],[0,'لا']],S.shuffleOpts===false?0:1))
    +f('إظهار الإجابة الصحيحة',sel('st-show',[[1,'بعد كل سؤال'],[0,'في النهاية فقط']],S.showAnswerEach===false?0:1))+'</div>'
    +'<div style="font-weight:800;color:#5E0E26;margin:14px 0 8px">على شاشة الصف</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'
    +f('الفرق',sel('st-teams',[[1,'بلا فرق'],[2,'فريقان'],[3,'3 فرق'],[4,'4 فرق']],S.teams||2))
    +f('نقاط السؤال',sel('st-pts',[[10,'10'],[20,'20'],[50,'50'],[100,'100']],S.basePts||20))+'</div>'
    +'</div><div class="mf"><span class="sp"></span><button class="bt" onclick="this.closest(\'#ib-imp2\').remove()">إلغاء</button><button class="bt p" onclick="hhIbSettingsSave()">'+ico('save',16)+' حفظ</button></div></div>';
  document.body.appendChild(d);
};
window.hhIbSettingsSave=function(){ var g=cur(); var v=function(id){ var e=document.getElementById(id); return e?e.value:null; }; var S=g.settings=g.settings||{};
  S.defaultTime=parseInt(v('st-time'),10)||20; if(v('st-mode')!==null) S.mode=v('st-mode'); S.hideRank=v('st-hide')||'last'; S.hideLastN=parseInt(v('st-n'),10)||5; S.scoring=v('st-scoring')||'speed'; S.shuffleQ=v('st-shq')==='1'; S.shuffleOpts=v('st-sho')!=='0'; S.showAnswerEach=v('st-show')!=='0'; S.teams=parseInt(v('st-teams'),10)||2; S.basePts=parseInt(v('st-pts'),10)||20;
  persist(g); var d=document.getElementById('ib-imp2'); if(d) d.remove(); render(); toastX('حُفظت الإعدادات','success'); };

/* ── الاستيراد: من فئات المنصة، من ملف Excel، لصق نص ── */
var _imp={ tab:'cats', cat:'', sel:{}, find:'', rows:[] };
function qdb(){ return (typeof QDB==='object'&&QDB)?QDB:{}; }
function parsePts(a){ var s=String(a||'').trim(); if(!s) return [''];
  /* zzzzzzcr: أسطر بنقاط تحت عناوين، ثم الترقيم، ثم جمل بعناوين */
  if(/\n/.test(s)){ var out=[], head=''; s.split(/\n+/).forEach(function(l){ l=l.trim(); if(!l) return; var b=l.replace(/^[-–•*]\s*/,'').replace(/^\d{1,2}\s*[-–.)]\s+/,''); var bul=b!==l;
      if(!bul&&/[:：]$/.test(l)){ head=l.replace(/[:：]$/,'').trim(); return; } b=b.replace(/[.]\s*$/,''); if(b) out.push(head?head+': '+b:b); });
    if(out.length>1) return out; }
  var parts=s.split(/\s*(?:^|\s)\d{1,2}\s*[-–.)]\s+/).map(function(x){ return x.trim(); }).filter(Boolean); if(parts.length>1) return parts;
  var seg=s.split(/[.]\s+(?=[^.:،\n]{2,24}:\s)/).map(function(x){ return x.trim().replace(/[.]\s*$/,''); }).filter(Boolean);
  if(seg.length>1&&seg.every(function(x){ return /^[^.:،\n]{2,24}:\s*\S/.test(x); })) return seg;
  return [s]; }
window._hhIbParsePts=parsePts;
function fromQDB(src, cat, g){
  var a=String(src.a==null?'':src.a).trim(); var S=(g&&g.settings)||{};
  var base={ id:newId('q'), q:String(src.q||'').replace(/^[^:]{2,20}:\s*(?=\S)/,function(m){ return /[«"]/.test(m)?m:''; }), time:S.defaultTime||20, mult:1, flash:false, note:'', srcCat:cat, srcDiff:src.diff||'' };
  if(src.img) base.img=src.img;
  if(Array.isArray(src.opts)&&src.opts.length>=2){
    var opts=[]; src.opts.forEach(function(o){ o=String(o).trim(); if(o&&opts.indexOf(o)<0) opts.push(o); });
    if(opts.indexOf(a)<0) opts.unshift(a); opts=opts.slice(0,4); if(opts.indexOf(a)<0) opts[0]=a;
    /* zzzzzzcq: خلط الخيارات، فالإجابة الصحيحة كانت دائماً الأولى (العنابية) */
    for(var _i=opts.length-1;_i>0;_i--){ var _j=Math.floor(Math.random()*(_i+1)), _t=opts[_i]; opts[_i]=opts[_j]; opts[_j]=_t; }
    while(opts.length<4) opts.push('');
    base.type='mcq'; base.opts=opts; base.correct=[opts.indexOf(a)]; return base;
  }
  if(modeOf(g)==='screen'){ base.type='open'; base.pts=parsePts(a); base.opts=[]; base.correct=[]; base.time=45; return base; }
  var all=(qdb()[cat]||[]).map(function(q){ return String(q.a||'').trim(); }).filter(function(x){ return x&&x!==a&&x.length<60; });
  var others=[]; all.sort(function(){ return Math.random()-.5; }).forEach(function(x){ if(others.length<3&&others.indexOf(x)<0) others.push(x); });
  while(others.length<3) others.push('');
  var o4=[a].concat(others); var order=[0,1,2,3].sort(function(){ return Math.random()-.5; });
  base.type='mcq'; base.opts=order.map(function(i){ return o4[i]; }); base.correct=[order.indexOf(0)]; base.autoOpts=true; return base;
}
window.hhIbImport=function(tab){
  var g=cur(); if(!g) return;
  _imp.tab=tab||_imp.tab||'cats';
  var cats=Object.keys(qdb()).filter(function(c){ return (qdb()[c]||[]).length; });
  if(!_imp.cat||cats.indexOf(_imp.cat)<0){ _imp.cat=cats.filter(function(c){ return /سابع ف1/.test(c); })[0]||cats[0]||''; _imp.sel={}; }
  var old=document.getElementById('ib-imp2'); if(old) old.remove();
  var d=document.createElement('div'); d.id='ib-imp2'; document.body.appendChild(d); impRender();
};
function impRender(){
  var d=document.getElementById('ib-imp2'); if(!d) return; var g=cur();
  var tabs=[['cats','grid','من فئات المنصة'],['xls','file','من ملف Excel'],['paste','paste','لصق نص']].map(function(t){ return '<button class="'+(_imp.tab===t[0]?'on':'')+'" onclick="hhIbImpTab(\''+t[0]+'\')">'+ico(t[1],15)+' '+t[2]+'</button>'; }).join('');
  var body='', foot='', n=0;
  if(_imp.tab==='cats'){
    var cats=Object.keys(qdb()).filter(function(c){ return (qdb()[c]||[]).length && (!_imp.find || c.indexOf(_imp.find)>-1); });
    var list=qdb()[_imp.cat]||[];
    n=Object.keys(_imp.sel).filter(function(k){ return _imp.sel[k]; }).length;
    var DL={easy:'200',med:'400',hard:'600',elite:'800',legend:'1000',l1200:'1200'};
    body='<div class="two"><div><label class="srch">'+ico('search',16)+'<input id="imp-find" placeholder="ابحث عن فئة…" value="'+esc(_imp.find)+'"></label><div class="cl">'+cats.map(function(c){ return '<div class="'+(c===_imp.cat?'on':'')+'" data-c="'+esc(c)+'">'+ico('grid',14)+' '+esc(c)+'<small>'+(qdb()[c]||[]).length+'</small></div>'; }).join('')+'</div></div>'
      +'<div><div class="qh"><b>'+esc(_imp.cat)+'</b><span style="flex:1"></span><button class="bt s" onclick="hhIbImpAll()">تحديد الكل</button><button class="bt s" onclick="hhIbImpRand(10)">عشوائي 10</button><button class="bt s" onclick="hhIbImpNone()">إلغاء التحديد</button></div><div class="qq">'
      +list.map(function(q,i){ var on=!!_imp.sel[i]; var kind=(Array.isArray(q.opts)&&q.opts.length>=2)?'اختيار من متعدد':(modeOf(g)==='screen'?'مقالي، بطاقة':'اختيار ببدائل تلقائية'); return '<label class="'+(on?'on':'')+'"><input type="checkbox" data-i="'+i+'" '+(on?'checked':'')+'><span>'+esc(q.q||'')+'<small>'+(DL[q.diff]?DL[q.diff]+' نقطة، ':'')+kind+(q.img?'، بصورة':'')+'</small></span></label>'; }).join('')+'</div></div></div>';
    var auto=Object.keys(_imp.sel).filter(function(k){ var q=list[k]; return _imp.sel[k]&&q&&!(Array.isArray(q.opts)&&q.opts.length>=2); }).length;
    foot=n+' أسئلة محددة'+(auto?(modeOf(g)==='screen'?'، '+auto+' منها مقالية تُضاف بطاقات':'، '+auto+' منها بلا بدائل: تُولَّد بدائلها من إجابات الفئة، راجعها'):'، تُضاف بالبدائل والإجابات كما هي');
  } else if(_imp.tab==='xls'){
    n=_imp.rows.length;
    body='<div class="hint">الأعمدة بالترتيب: <code>السؤال</code> <code>البديل أ</code> <code>البديل ب</code> <code>البديل ج</code> <code>البديل د</code> <code>الصحيح</code> <code>الزمن</code>.<br>«الصحيح» رقم من 1 إلى 4 أو نص البديل. لعبارة صح أم خطأ اترك البدائل فارغة واكتب «صح» أو «خطأ». للسؤال المقالي اترك البدائل فارغة واكتب نقاط الإجابة في «الصحيح» مفصولة بـ «؛».</div>'
      +'<div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap"><button class="bt" onclick="hhIbXlsTpl()">'+ico('download',16)+' حمّل القالب</button></div>'
      +'<label class="drop">'+ico('file',22)+'<br>اختر ملف Excel أو CSV<input type="file" id="imp-file" accept=".xlsx,.xls,.csv,.txt" style="display:none"></label>'+impPreview();
    foot=n?(n+' أسئلة جاهزة للإضافة'):'لم يُقرأ ملف بعد';
  } else {
    n=_imp.rows.length;
    body='<div class="hint">اكتب كل سؤال في سطر، وتحته البدائل كل بديل في سطر، وضع <code>*</code> قبل الصحيح. افصل بين الأسئلة بسطر فارغ.<br>عبارة صح أم خطأ: سطر واحد ينتهي بـ <code>(صح)</code> أو <code>(خطأ)</code>. السؤال المقالي: السؤال ثم سطر يبدأ بـ <code>الإجابة:</code> ونقاطها مفصولة بـ «؛». أزواج التوصيل: كل زوج في سطر بالشكل <code>المصطلح = معناه</code>.</div>'
      +'<textarea id="imp-txt" placeholder="ما عاصمة دولة قطر؟&#10;*الدوحة&#10;الوكرة&#10;الخور&#10;&#10;الكوس من الرياح المحلية في قطر (صح)&#10;&#10;اذكر عناصر المناخ.&#10;الإجابة: الحرارة؛ الضغط الجوي؛ الرياح؛ الرطوبة">'+esc(_imp.txt||'')+'</textarea>'+impPreview();
    foot=n?(n+' أسئلة مقروءة'):'الصق الأسئلة لتظهر المعاينة';
  }
  d.innerHTML='<div class="md"><div class="mh">استيراد أسئلة إلى «'+esc(g.title||'')+'»<button onclick="hhIbImpClose()">'+ico('x',18)+'</button></div><div class="mt">'+tabs+'</div><div class="mb">'+body+'</div><div class="mf">'+foot+'<span class="sp"></span><button class="bt" onclick="hhIbImpClose()">إلغاء</button><button class="bt p" '+(n?'':'disabled')+' onclick="hhIbImpGo()">'+ico('import',16)+' أضف '+n+' '+(n>2&&n<11?'أسئلة':'سؤالاً')+'</button></div></div>';
  var f=document.getElementById('imp-find'); if(f){ f.addEventListener('input',function(e){ _imp.find=e.target.value; var pos=e.target.selectionStart; impRender(); var f2=document.getElementById('imp-find'); if(f2){ f2.focus(); try{ f2.setSelectionRange(pos,pos); }catch(x){} } }); }
  d.querySelectorAll('.cl div').forEach(function(el){ el.onclick=function(){ _imp.cat=el.getAttribute('data-c'); _imp.sel={}; impRender(); }; });
  d.querySelectorAll('.qq input').forEach(function(el){ el.onchange=function(){ _imp.sel[el.getAttribute('data-i')]=el.checked; impRender(); }; });
  var fi=document.getElementById('imp-file'); if(fi) fi.onchange=function(e){ var file=e.target.files&&e.target.files[0]; if(file) readSheet(file); };
  var tx=document.getElementById('imp-txt'); if(tx) tx.addEventListener('input',function(e){ _imp.txt=e.target.value; _imp.rows=parsePaste(_imp.txt); var p=document.getElementById('imp-prev'); if(p) p.outerHTML=impPreview(); var b=d.querySelector('.bt.p'); var n2=_imp.rows.length; if(b){ b.disabled=!n2; b.innerHTML=ico('import',16)+' أضف '+n2+' '+(n2>2&&n2<11?'أسئلة':'سؤالاً'); } var ft=d.querySelector('.mf'); if(ft&&ft.firstChild&&ft.firstChild.nodeType===3) ft.firstChild.nodeValue=n2?(n2+' أسئلة مقروءة'):'الصق الأسئلة لتظهر المعاينة'; });
}
function impPreview(){ var r=_imp.rows||[]; if(!r.length) return '<div class="prev" id="imp-prev"></div>';
  var TN={mcq:'اختيار',tf:'صح أم خطأ',open:'مقالي',pair:'أزواج'};
  return '<div class="prev" id="imp-prev">'+r.slice(0,8).map(function(q,i){ return '<div><b>'+(i+1)+'.</b> '+esc(q.q)+' <small style="color:#7A6A54">'+TN[q.type]+(q.type==='mcq'?'، الصحيح: '+esc(q.opts[q.correct[0]]||''):q.type==='tf'?'، '+(q.correct[0]===0?'صح':'خطأ'):q.type==='pair'?'، '+q.pairs.length+' أزواج':'، '+q.pts.length+' نقاط')+'</small></div>'; }).join('')+(r.length>8?'<div>و'+(r.length-8)+' أخرى…</div>':'')+'</div>'; }
window.hhIbImpTab=function(t){ _imp.tab=t; _imp.rows=(t==='paste'&&_imp.txt)?parsePaste(_imp.txt):[]; impRender(); };
window.hhIbImpClose=function(){ var d=document.getElementById('ib-imp2'); if(d) d.remove(); };
window.hhIbImpAll=function(){ (qdb()[_imp.cat]||[]).forEach(function(_,i){ _imp.sel[i]=true; }); impRender(); };
window.hhIbImpNone=function(){ _imp.sel={}; impRender(); };
window.hhIbImpRand=function(k){ var L=(qdb()[_imp.cat]||[]).map(function(_,i){ return i; }).sort(function(){ return Math.random()-.5; }).slice(0,k); _imp.sel={}; L.forEach(function(i){ _imp.sel[i]=true; }); impRender(); };
function mkQ(g,type,q,opts,correct,time,pts){ var S=(g&&g.settings)||{}; var o={ id:newId('q'), type:type, q:q, time:time||S.defaultTime||(type==='tf'?10:type==='open'?45:20), mult:1, flash:false, note:'' };
  if(type==='tf'){ o.opts=['صح','خطأ']; o.correct=[correct]; } else if(type==='open'){ o.opts=[]; o.correct=[]; o.pts=pts; } else { while(opts.length<4) opts.push(''); o.opts=opts.slice(0,4); o.correct=[correct]; } return o; }
function rowToQ(g,cells){
  var c=cells.map(function(x){ return String(x==null?'':x).trim(); }); var q=c[0]; if(!q) return null;
  var opts=c.slice(1,5).filter(function(x){ return x; }); var k=c[5]||''; var t=parseInt(c[6],10)||0;
  if(!opts.length){ if(/^(صح|صحيح|true|t|✓)$/i.test(k)) return mkQ(g,'tf',q,null,0,t); if(/^(خطأ|خاطئ|false|f|✗)$/i.test(k)) return mkQ(g,'tf',q,null,1,t); if(k) return mkQ(g,'open',q,null,null,t,k.split(/\s*[؛;\n]\s*/).filter(Boolean)); return null; }
  var ci=-1; var L={'أ':0,'ا':0,'ب':1,'ج':2,'د':3,'a':0,'b':1,'c':2,'d':3};
  if(/^\d$/.test(k)) ci=parseInt(k,10)-1; else if(L[k.toLowerCase()]!=null) ci=L[k.toLowerCase()]; else ci=opts.indexOf(k);
  if(ci<0||ci>=opts.length) ci=0; return mkQ(g,'mcq',q,opts,ci,t);
}
function readSheet(file){
  var g=cur(); var isX=/\.xlsx?$/i.test(file.name);
  var done=function(rows){ if(rows.length&&/السؤال|سؤال|question/i.test(String(rows[0][0]||''))) rows=rows.slice(1); _imp.rows=rows.map(function(r){ return rowToQ(g,r); }).filter(Boolean); if(!_imp.rows.length) toastX('لم أجد أسئلة صالحة في الملف، راجع ترتيب الأعمدة','error'); impRender(); };
  if(isX){ loadXLSX().then(function(){ var r=new FileReader(); r.onload=function(e){ try{ var wb=XLSX.read(new Uint8Array(e.target.result),{type:'array'}); var ws=wb.Sheets[wb.SheetNames[0]]; done(XLSX.utils.sheet_to_json(ws,{header:1,defval:''})); }catch(x){ toastX('تعذّرت قراءة الملف','error'); } }; r.readAsArrayBuffer(file); }).catch(function(){ toastX('تعذّر تحميل قارئ Excel، احفظ الملف بصيغة CSV وجرّب','error'); }); }
  else { var r=new FileReader(); r.onload=function(e){ var txt=String(e.target.result||'').replace(/^﻿/,''); var sep=txt.indexOf('\t')>-1?'\t':(txt.split(';').length>txt.split(',').length?';':','); done(txt.split(/\r?\n/).filter(function(l){ return l.trim(); }).map(function(l){ return csvSplit(l,sep); })); }; r.readAsText(file,'utf-8'); }
}
function csvSplit(line,sep){ var out=[],cur2='',q=false; for(var i=0;i<line.length;i++){ var ch=line[i]; if(ch==='"'){ if(q&&line[i+1]==='"'){ cur2+='"'; i++; } else q=!q; } else if(ch===sep&&!q){ out.push(cur2); cur2=''; } else cur2+=ch; } out.push(cur2); return out; }
function loadXLSX(){ if(window.XLSX) return Promise.resolve(); if(typeof hhClsLoadSheetJS==='function') return hhClsLoadSheetJS(); return new Promise(function(res,rej){ var s=document.createElement('script'); s.src='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'; s.onload=res; s.onerror=rej; document.head.appendChild(s); }); }
window.hhIbXlsTpl=function(){
  var rows=[['السؤال','البديل أ','البديل ب','البديل ج','البديل د','الصحيح','الزمن'],['ما عاصمة دولة قطر؟','الدوحة','الوكرة','الخور','دخان',1,20],['الكوس من الرياح المحلية التي تهب على قطر','','','','','صح',10],['اذكر عناصر المناخ.','','','','','الحرارة؛ الضغط الجوي؛ الرياح؛ الرطوبة',45]];
  loadXLSX().then(function(){ var ws=XLSX.utils.aoa_to_sheet(rows); ws['!cols']=[{wch:44},{wch:16},{wch:16},{wch:16},{wch:16},{wch:30},{wch:8}]; var wb=XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb,ws,'الأسئلة'); XLSX.writeFile(wb,'قالب-أسئلة-الإبداع.xlsx'); })
  .catch(function(){ var csv='﻿'+rows.map(function(r){ return r.map(function(x){ x=String(x); return /[",\n]/.test(x)?'"'+x.replace(/"/g,'""')+'"':x; }).join(','); }).join('\n'); var a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})); a.download='قالب-أسئلة-الإبداع.csv'; document.body.appendChild(a); a.click(); a.remove(); });
};
function parsePaste(txt){
  var g=cur(); var out=[];
  String(txt||'').split(/\n\s*\n/).forEach(function(block){
    var L=block.split('\n').map(function(l){ return l.trim(); }).filter(Boolean); if(!L.length) return;
    var q=L[0].replace(/^\d{1,3}\s*[-.)]\s*/,'');
    if(L.length===1){ var m=q.match(/^(.*?)[\s\-–:]*\(?\s*(صح|خطأ|صحيح|خاطئ)\s*\)?\s*$/); if(m&&m[1]) out.push(mkQ(g,'tf',m[1].trim(),null,/^صح/.test(m[2])?0:1)); return; }
    var eqL=L.filter(function(l){ return /\s=\s/.test(l); });
    if(eqL.length>=3&&eqL.length>=L.length-1){ var pq=(L[0].indexOf(' = ')<0)?q:'صل كل مصطلح بمعناه'; var o=mkQ(g,'open',pq,null,null,90,['']); o.type='pair'; delete o.pts; o.pairs=eqL.slice(0,8).map(function(l){ var p=l.split(/\s=\s/); return {a:p[0].trim(),b:p.slice(1).join(' = ').trim()}; }); out.push(o); return; }
    var ans=L.slice(1).filter(function(l){ return /^الإجابة\s*[:：]/.test(l); })[0];
    if(ans){ var pts=ans.replace(/^الإجابة\s*[:：]\s*/,'').split(/\s*[؛;]\s*/).filter(Boolean); out.push(mkQ(g,'open',q,null,null,0,pts.length?pts:[''])); return; }
    var opts=[], ci=0; L.slice(1,5).forEach(function(l,i){ var cor=/^\*|✓\s*$|\(صحيح\)\s*$/.test(l); var t=l.replace(/^\*\s*/,'').replace(/\s*(✓|\(صحيح\))\s*$/,'').replace(/^[أبجد]\s*[-.)]\s*/,'').trim(); if(cor) ci=i; opts.push(t); });
    if(opts.length>=2) out.push(mkQ(g,'mcq',q,opts,ci));
  });
  return out;
}
window.hhIbImpGo=function(){
  var g=cur(); if(!g) return; var add=[];
  if(_imp.tab==='cats'){ var list=qdb()[_imp.cat]||[]; Object.keys(_imp.sel).forEach(function(k){ if(_imp.sel[k]&&list[k]) add.push(fromQDB(list[k],_imp.cat,g)); }); add.forEach(function(q){ if(g._ready) delete q.srcCat; }); }
  else add=_imp.rows.slice();
  if(g._ready&&g._ready.defCat) add.forEach(function(q){ q.srcCat=g._ready.defCat; });
  if(g._ready&&g._ready.kind==='open') add=add.filter(function(q){ return q.type==='open'; });
  if(g._ready&&g._ready.kind==='mcq') add=add.filter(function(q){ return q.type==='mcq'; });
  if(g._ready&&g._ready.kind==='tf') add=add.filter(function(q){ return q.type==='tf'; });
  if(!add.length){ toastX('لا أسئلة مناسبة لهذه اللعبة في التحديد','info'); return; }
  g.questions=g.questions||[]; var start=g.questions.length; add.forEach(function(q){ g.questions.push(q); });
  _ib.qIdx=start; persist(g,true); hhIbImpClose(); _imp.sel={}; _imp.rows=[]; render();
  var auto=add.filter(function(q){ return q.autoOpts; }).length;
  toastX('أُضيف '+add.length+' '+(add.length>2&&add.length<11?'أسئلة':'سؤالاً')+(auto?'، راجع البدائل المولّدة':''),'success');
};

/* ── الألعاب الجاهزة: تُبنى من فئات «العب الآن» + admin_qdb/ib_ready ── */
var GRADES=[{id:'g7t1',name:'السابع، ف1',ok:true},{id:'g7t2',name:'السابع، ف2'},{id:'g8t2',name:'الثامن، ف2'},{id:'g6',name:'السادس'}];
var UNITS={ g7t1:[
  {k:'u1',name:'الوحدة الأولى، الأرض من حولي',short:'الأرض من حولي',sid:'t1u1',mcq:'سابع ف1 - الأرض من حولي (اختياري)',open:'سابع ف1 - الأرض من حولي (مقالي)',c:'linear-gradient(135deg,#1F4E79,#132f4a)',ic:'globe',d:'المناخ وعناصره والرياح والأقاليم المناخية.'},
  {k:'u2',name:'الوحدة الثانية، بلاد الرافدين',short:'بلاد الرافدين',sid:'t1u2',mcq:'سابع ف1 - بلاد الرافدين (اختياري)',open:'سابع ف1 - بلاد الرافدين (مقالي)',c:'linear-gradient(135deg,#8A6D2E,#5c4816)',ic:'col',d:'الشعوب والكتابة والحكم وحمورابي وطبقات المجتمع.'},
  /* zzzzzzcc: الوحدات الأربع الباقية من أسئلة «مدرستي» */
  {k:'u3',sid:'t1u3',name:'الوحدة الثالثة، السلطات الدستورية',short:'السلطات الدستورية',mcq:'',open:'',c:'linear-gradient(135deg,#5A3A8E,#3a2560)',ic:'users',d:'السلطة التشريعية والتنفيذية والقضائية في دولة قطر والعلاقة بينها.'},
  {k:'u4',sid:'t1u4',name:'الوحدة الرابعة، التوزيع الجغرافي للسكان',short:'التوزيع الجغرافي للسكان',mcq:'',open:'',c:'linear-gradient(135deg,#0F6E56,#0a4a3a)',ic:'target',d:'العوامل الطبيعية والبشرية المؤثرة في توزيع السكان.'},
  {k:'u5',sid:'t1u5',name:'الوحدة الخامسة، الخلافة العباسية',short:'الخلافة العباسية',mcq:'',open:'',c:'linear-gradient(135deg,#B5801F,#7a5410)',ic:'star',d:'نشأة الدولة العباسية وأهم خلفائها وفتوحاتها ونهايتها.'},
  {k:'u6',sid:'t1u6',name:'الوحدة السادسة، الأمن الوطني',short:'الأمن الوطني',mcq:'',open:'',c:'linear-gradient(135deg,#3D4A7A,#262f52)',ic:'eye',d:'الأمن الوطني وأبعاده ومقوماته ومؤسساته.'}
]};
/* عبارات صح أم خطأ المقترحة (مسودة حتى يعتمدها المدير) */
var TF_DEF={
  'g7t1-u1':[
    {s:'«حركة الهواء الأفقية على سطح الأرض» هي الرياح.',v:true},
    {s:'«بخار الماء الموجود في الهواء» يُسمّى الضغط الجوي.',v:false,fix:'الصحيح: الرطوبة.'},
    {s:'«المنطقة المتشابهة في خصائصها المناخية» تُسمّى الإقليم المناخي.',v:true},
    {s:'من الرياح المحلية التي تهب على دولة قطر الرياح التجارية.',v:false,fix:'الصحيح: الكوس.'},
    {s:'المنطقة الحارة هي أكبر المناطق الحرارية امتداداً على سطح الأرض.',v:true},
    {s:'الكوس من أنواع الرياح المحلية الباردة.',v:false,fix:'الصحيح: المسترال من الرياح المحلية الباردة.'},
    {s:'يمتد الإقليم القطبي بين دائرتي عرض 60° و90° شمال وجنوب خط الاستواء.',v:true},
    {s:'يمتد الإقليم الاستوائي بين دائرتي عرض 18° و30° شمال وجنوب خط الاستواء.',v:false,fix:'الصحيح: الإقليم الصحراوي.'}
  ],
  'g7t1-u2':[
    {s:'يُطلق على المناطق الواقعة بين نهري دجلة والفرات اسم بلاد الرافدين.',v:true},
    {s:'البابليون أول الشعوب التي سكنت بلاد الرافدين.',v:false,fix:'الصحيح: السومريون.'},
    {s:'استخدم سكان بلاد الرافدين قديماً الكتابة المسمارية.',v:true},
    {s:'كان نظام الحكم في بلاد الرافدين قديماً جمهورياً.',v:false,fix:'الصحيح: ملكياً وراثياً.'},
    {s:'حمورابي هو الملك البابلي الذي ثبّت دعائم دولته بالقوانين والتشريعات.',v:true},
    {s:'حدائق بابل من روائع حضارة بلاد الرافدين في مجال النحت.',v:false,fix:'الصحيح: الثور المجنح.'},
    {s:'تمثلت الطبقة العليا في مجتمع بلاد الرافدين في العمال والفلاحين.',v:false,fix:'الصحيح: الكهنة وملاك الأراضي وكبار التجار.'}
  ]
};
function loadReadyLocal(){ if(_ib.ready) return; try{ _ib.ready=JSON.parse(localStorage.getItem('hh_ib_ready')||'null'); }catch(e){} if(!_ib.ready||typeof _ib.ready!=='object') _ib.ready={tf:{},custom:[]}; _ib.ready.tf=_ib.ready.tf||{}; _ib.ready.custom=_ib.ready.custom||[]; }
async function loadReadyCloud(){
  try{ var d=await db().collection('admin_qdb').doc('ib_ready').get(); if(d.exists){ var x=d.data()||{}; var data=x.data?JSON.parse(x.data):null; if(data&&typeof data==='object'){ data.tf=data.tf||{}; data.custom=data.custom||[]; _ib.ready=data; try{ localStorage.setItem('hh_ib_ready',JSON.stringify(data)); }catch(e){} } } }catch(e){}
}
async function saveReadyDoc(){
  try{ localStorage.setItem('hh_ib_ready',JSON.stringify(_ib.ready)); }catch(e){}
  if(!isAdm()){ markSaved(true,'admin'); return false; }
  try{ await db().collection('admin_qdb').doc('ib_ready').set({ data:JSON.stringify(_ib.ready), updatedAt:Date.now(), updatedBy:(firebase.auth().currentUser||{}).email||'' }); markSaved(); return true; }
  catch(e){ markSaved(true,(e&&e.code)); return false; }
}
function tfItems(key){ var t=(_ib.ready&&_ib.ready.tf&&_ib.ready.tf[key]); return (t&&t.items)?t.items:TF_DEF[key]||[]; }
function tfPublished(key){ var t=(_ib.ready&&_ib.ready.tf&&_ib.ready.tf[key]); return !!(t&&t.published); }
function eligibleSrc(list){ return list.filter(function(q){ var a=String(q.a||'').trim(), b=stemDef(q.q); return Array.isArray(q.opts)&&q.opts.length>=2&&a&&a.length<=34&&b&&b.length<=110; }); }
/* zzzzzzcb: المراجعة الشاملة تضم كل أسئلة الاختيار في الفصل: بنك الوحدات + أسئلة «مدرستي» للوحدات الست */
function normQ(t){ return String(t||'').replace(/[«»"'.:؟?،,\s]+/g,'').replace(/[ًٌٍَُِّْـ]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي'); }
function schoolQs(G){
  var T=(G==='g7t1')?window._HH_SCHOOL_T1:null, out=[];
  if(!T||!Array.isArray(T.units)) return out;
  T.units.forEach(function(u){ (u.lessons||[]).forEach(function(l){ (l.q||[]).forEach(function(q){
    if(q&&q.q&&q.a&&Array.isArray(q.o)&&q.o.length>=2) out.push({src:{diff:q.d||'med',q:q.q,a:q.a,opts:q.o},unit:u.unit||'',sid:u.id}); }); }); });
  return out;
}
function unitMcq(G,u){
  var seen={}, L=[]; if(!u) return L;
  if(u.mcq) (qdb()[u.mcq]||[]).forEach(function(src,i){ seen[normQ(src.q)]=1; L.push({src:src,cat:u.mcq,idx:i}); });
  if(u.sid) schoolQs(G).forEach(function(o){ if(o.sid!==u.sid) return; var k=normQ(o.src.q); if(seen[k]) return; seen[k]=1; L.push({src:o.src,cat:'__school',idx:null}); });
  return L;
}
function allMcq(G){
  var seen={}, L=[];
  (UNITS[G]||[]).forEach(function(x){ (qdb()[x.mcq]||[]).forEach(function(src,i){ seen[normQ(src.q)]=1; L.push({src:src,cat:x.mcq,idx:i}); }); });
  schoolQs(G).forEach(function(o){ var k=normQ(o.src.q); if(seen[k]) return; seen[k]=1; L.push({src:o.src,cat:'__school',idx:null}); });
  return L;
}
/* zzzzzzcc، الأسئلة الأساسية ثابتة، والإضافية من «مدرستي» يختارها المعلم */
function diffOf(d){ d=String(d||''); return d==='easy'?'easy':(d==='hard'||d==='elite'||d==='legend'||d==='l1200')?'hard':'med'; }
function hexOf(c){ var m=String(c||'').match(/#[0-9a-f]{6}/i); return m?m[0]:'#5E0E26'; }
function unitBySid(G,sid){ return (UNITS[G]||[]).filter(function(u){ return u.sid===sid; })[0]||null; }
function tagQ(q,u,diff,kt){ if(u){ q.uk=u.k; q.un=u.short; q.uc=hexOf(u.c); } q.diff=diffOf(diff); if(kt) q.kt=kt; return q; }
function coreMcq(G,u){ var L=[]; (u?[u]:(UNITS[G]||[])).forEach(function(x){ if(!x.mcq) return; (qdb()[x.mcq]||[]).forEach(function(src,i){ L.push({src:src,cat:x.mcq,idx:i,u:x}); }); }); return L; }
function extraMcq(G,u){ var seen={}; coreMcq(G,null).forEach(function(o){ seen[normQ(o.src.q)]=1; }); var L=[]; schoolQs(G).forEach(function(o){ if(u&&o.sid!==u.sid) return; var k=normQ(o.src.q); if(seen[k]) return; seen[k]=1; L.push({src:o.src,cat:'__school',idx:null,u:unitBySid(G,o.sid)}); }); return L; }
function mixParts(G){
  var P={mcq:coreMcq(G,null).length,tf:0,open:0,order:0};
  (UNITS[G]||[]).forEach(function(u){ var key=G+'-'+u.k; if(tfPublished(key)) P.tf+=tfItems(key).length; (qdb()[u.open]||[]).forEach(function(q){ if(/←/.test(String(q.a||''))) P.order++; else P.open++; }); });
  P.draftTf=(UNITS[G]||[]).reduce(function(s,u){ var key=G+'-'+u.k; return s+(tfPublished(key)?0:tfItems(key).length); },0);
  P.n=P.mcq+P.tf+P.open+P.order; return P;
}
function buildExtras(G,u,g){ return extraMcq(G,u).map(function(o){ var q=fromQDB(o.src,o.cat,{settings:g.settings,mode:'live'}); q.extra=true; return tagQ(q,o.u,o.src.diff,'mcq'); }); }
/* اختيار الإضافية: بالتساوي على الوحدات المختارة ثم على مستويات الصعوبة */
function pickExtras(extras,n,units){
  var pool=(extras||[]).filter(function(q){ return !units||!units.length||units.indexOf(q.uk)>-1; }); n=Math.max(0,Math.min(n|0,pool.length)); if(!n) return [];
  var byU={}; pool.forEach(function(q){ var k=q.uk||'_'; (byU[k]=byU[k]||{easy:[],med:[],hard:[]})[q.diff||'med'].push(q); });
  Object.keys(byU).forEach(function(k){ ['easy','med','hard'].forEach(function(d){ byU[k][d].sort(function(){ return Math.random()-.5; }); }); });
  var out=[], ks=Object.keys(byU), di=0, D=['easy','med','hard'];
  while(out.length<n){ var moved=false; for(var a=0;a<ks.length&&out.length<n;a++){ var B=byU[ks[a]]; for(var t=0;t<3;t++){ var d=D[(di+t)%3]; if(B[d].length){ out.push(B[d].shift()); moved=true; break; } } } di++; if(!moved) break; }
  return out;
}
window._hhIbPickExtras=pickExtras;
function readyList(){
  var L=[], G=_ib.grade||'g7t1', adm=isAdm();
  (UNITS[G]||[]).forEach(function(u,ui){
    var qm=(qdb()[u.mcq]||[]), qo=(qdb()[u.open]||[]), key=G+'-'+u.k;
    if(ui===0){ var cc=coreMcq(G,null).length, ce=extraMcq(G,null).length, MP=mixParts(G);
      var MX=MP.open+MP.order+MP.tf>0; L.push({rid:G+'-all',sec:'all',kind:'mcq',title:'المراجعة الشاملة',n:MX?MP.n:(cc||ce),extra:MX?ce:(cc?ce:0),mixed:MX,unit:null,c:'linear-gradient(135deg,#8A1538,#5E0E26)',ic:'award',d:MX?'اختيار من متعدد وصح أم خطأ ومقالي وترتيب من كل الوحدات في لعبة واحدة، ويضيف المعلم ما يريد من أسئلة «مدرستي».':'أسئلة الاختيار الأساسية للوحدات، ويضيف المعلم ما يريد من أسئلة «مدرستي»، مرتبة من السهل إلى الصعب.',cats:(UNITS[G]||[]).map(function(x){ return x.mcq; }).filter(Boolean)});
      if(false) L.push({rid:G+'-mix',sec:'all',kind:'mix',title:'المراجعة الشاملة المنوّعة',n:MP.n,extra:ce,parts:MP,unit:null,c:'linear-gradient(135deg,#8A1538,#5E0E26)',ic:'award',d:'اختيار من متعدد وصح أم خطأ ومقالي وترتيب في لعبة واحدة. على شاشة الصف فقط.',cats:[],noEdit:true,screenOnly:true}); }
    var umc=coreMcq(G,u).length, ume=extraMcq(G,u).length; if(umc||ume) L.push({rid:key+'-mcq',sec:u.k,kind:'mcq',title:'مراجعة '+u.short,n:(umc+qo.length)||ume,extra:umc?ume:0,unit:u,c:u.c,ic:u.ic,d:u.d,cats:u.mcq?[u.mcq]:[],school:!umc});
    var pub=tfPublished(key); if((adm||pub)&&tfItems(key).length) L.push({rid:key+'-tf',sec:u.k,kind:'tf',title:'صح أم خطأ في '+u.short,n:tfItems(key).length,unit:u,c:'linear-gradient(135deg,#3D6B53,#2C5340)',ic:'check',d:'عبارات مبنية من أسئلة الوحدة. يصوّت الصف برفع اليد.',draft:!pub,tfKey:key});
    var pq=(UNITS[G]&&qm.length)?eligibleSrc(qm).length:0; if(pq>=3) L.push({rid:key+'-pairs',sec:u.k,kind:'pairs',title:'مفاهيم '+u.short,n:pq,unit:u,c:'linear-gradient(135deg,#1F4E79,#132f4a)',ic:'link',d:'كل مصطلح مع معناه من أسئلة الوحدة. تصلح للتوصيل أو بطاقات الذاكرة.',cats:[u.mcq],src:key+'-mcq',screenOnly:true});
    var oq=qo.filter(function(q){ return /←/.test(String(q.a||'')); }); if(oq.length) L.push({rid:key+'-order',sec:u.k,kind:'order',title:'رتّب أحداث '+u.short,n:oq.length,unit:u,c:'linear-gradient(135deg,#8A6D2E,#5c4816)',ic:'sort',d:oq.map(function(q){ return String(q.q).replace(/[:.]?\s*\(.*$/,'').replace(/\.$/,''); }).join('، ')+'.',cats:[u.open],src:key+'-open'});
    if(qo.length) L.push({rid:key+'-open',sec:u.k,kind:'open',title:u.short+' بأسئلة مقالية',n:qo.length,unit:u,c:'linear-gradient(135deg,#4A0B1E,#2A0810)',ic:'flip',d:'وجه البطاقة السؤال، وظهرها الإجابة النموذجية نقطة نقطة. للشاشة فقط.',cats:[u.open],img:qo.some(function(q){ return q.img; })});
  });
  (_ib.ready.custom||[]).forEach(function(c){ if(!c.cat&&(c.grade||'g7t1')!==G) return; L.push({rid:'c:'+c.id,sec:'custom',kind:'custom',title:c.title||'لعبة جاهزة',n:(c.questions||[]).length,c:'linear-gradient(135deg,#5E0E26,#3D0918)',ic:'star',d:c.desc||'لعبة إضافية من إعداد المُلهم.',custom:c}); });
  return L;
}
function buildReady(rid){
  var R=readyList().filter(function(x){ return x.rid===rid; })[0]; if(!R) return null;
  var g={ id:'ready_'+rid.replace(/[^a-z0-9_-]/gi,'_'), title:R.title, template:'race', mode:'screen', screenTpl:'boxes', settings:defSettings('race'), questions:[], status:'ready' };
  if(R.kind==='mcq'&&R.sec==='all'&&R.mixed) R=Object.assign({},R,{kind:'mix'});
  var meta={ rid:rid, kind:R.kind, crumb:R.title, cats:R.cats||[], defCat:null, noAdd:'' };
  if(R.kind==='mcq'){
    var DO={easy:0,med:1,hard:2,elite:3,legend:4,l1200:5};
    var GG=_ib.grade||'g7t1';
    coreMcq(GG,R.sec==='all'?null:R.unit).forEach(function(o){ var q=fromQDB(o.src,o.cat,{settings:g.settings,mode:'live'}); if(o.idx!=null) q.srcIdx=o.idx; q._d=DO[o.src.diff]==null?1:DO[o.src.diff]; tagQ(q,o.u,o.src.diff,'mcq'); g.questions.push(q); });
    g.extras=buildExtras(GG,R.sec==='all'?null:R.unit,g);
    if(R.sec==='all'){ g.questions.sort(function(a,b){ return a._d-b._d; }); meta.noAdd='لإضافة سؤال افتح لعبة الوحدة نفسها، فيظهر هنا تلقائياً.'; }
    else { (qdb()[R.unit.open]||[]).forEach(function(src){ if(/←/.test(String(src.a||''))){ var it=String(src.a).split(/\s*←\s*/).map(function(x){ return x.trim(); }).filter(Boolean); if(it.length<2) return; var qo=mkQ(g,'open',String(src.q).replace(/\s*\([^)]*\)\.?\s*$/,'').replace(/[:.]\s*$/,''),null,null,60); qo.pts=it; qo.opts=[]; qo.correct=[]; tagQ(qo,R.unit,'hard','order'); g.questions.push(qo); return; } var q=fromQDB(src,R.unit.open,{settings:g.settings,mode:'screen'}); if(q.type!=='open'){ q.type='open'; q.pts=parsePts(src.a); q.opts=[]; q.correct=[]; } tagQ(q,R.unit,'hard','open'); g.questions.push(q); }); meta.defCat=R.cats[0]; if(!R.cats.length){ meta.noAdd='أسئلة هذه الوحدة من مسار «مدرستي»، وتُعدَّل من هناك.'; g.questions.sort(function(a,b){ return a._d-b._d; }); } }
    g.screenTpl='boxes';
  } else if(R.kind==='mix'){
    var G2=_ib.grade||'g7t1';
    coreMcq(G2,null).forEach(function(o){ var q=fromQDB(o.src,o.cat,{settings:g.settings,mode:'live'}); tagQ(q,o.u,o.src.diff,'mcq'); g.questions.push(q); });
    (UNITS[G2]||[]).forEach(function(u){ var key=G2+'-'+u.k;
      if(tfPublished(key)) tfItems(key).forEach(function(it){ var q=mkQ(g,'tf',it.s,null,it.v?0:1,10); q.note=it.fix||''; tagQ(q,u,'easy','tf'); g.questions.push(q); });
      (qdb()[u.open]||[]).forEach(function(src){
        if(/←/.test(String(src.a||''))){ var items=String(src.a).split(/\s*←\s*/).map(function(x){ return x.trim(); }).filter(Boolean); if(items.length<2) return;
          var qo=mkQ(g,'open',String(src.q).replace(/\s*\([^)]*\)\.?\s*$/,'').replace(/[:.]\s*$/,''),null,null,60); qo.pts=items; qo.opts=[]; qo.correct=[]; tagQ(qo,u,'hard','order'); g.questions.push(qo); return; }
        var q=fromQDB(src,u.open,{settings:g.settings,mode:'screen'}); if(q.type!=='open'){ q.type='open'; q.pts=parsePts(src.a); q.opts=[]; q.correct=[]; } tagQ(q,u,'hard','open'); g.questions.push(q); }); });
    g.extras=buildExtras(G2,null,g); g.screenTpl='boxes'; g.title=R.title||'المراجعة الشاملة';
    meta.noAdd='هذه اللعبة تُبنى من الألعاب الأخرى، فعدّل أسئلتها من هناك.';
  } else if(R.kind==='open'){
    R.cats.forEach(function(cat){ (qdb()[cat]||[]).forEach(function(src,i){ var q=fromQDB(src,cat,{settings:g.settings,mode:'screen'}); if(q.type!=='open'){ q.type='open'; q.pts=parsePts(src.a); q.opts=[]; q.correct=[]; } q.srcIdx=i; g.questions.push(q); }); });
    meta.defCat=R.cats[0]; g.screenTpl='flip';
  } else if(R.kind==='pairs'){
    var src=eligibleSrc(qdb()[R.cats[0]]||[]).map(function(x){ return {type:'mcq',q:x.q,opts:[x.a],correct:[0]}; });
    g.questions=mcqToPairs(src); g.screenTpl='match';
  } else if(R.kind==='order'){
    (qdb()[R.cats[0]]||[]).forEach(function(src2){ if(!/←/.test(String(src2.a||''))) return; var items=String(src2.a).split(/\s*←\s*/).map(function(x){ return x.trim(); }).filter(Boolean); if(items.length<2) return;
      g.questions.push({ id:newId('q'), type:'order', q:String(src2.q).replace(/\s*\([^)]*\)\.?\s*$/,'').replace(/[:.]\s*$/,'')+(/من الأقدم/.test(src2.q)?'':''), opts:items, correct:items.map(function(_,k){ return k; }), time:60, mult:1, flash:false, note:'' }); });
    g.screenTpl='order';
  } else if(R.kind==='tf'){
    tfItems(R.tfKey).forEach(function(it){ var q=mkQ(g,'tf',it.s,null,it.v?0:1,10); q.note=it.fix||''; g.questions.push(q); });
    meta.tfKey=R.tfKey; meta.published=!R.draft; g.screenTpl='tfs'; g.template='tf';
  } else if(R.kind==='custom'){
    var c=clone(R.custom); g.title=c.title; g.questions=c.questions||[]; g.screenTpl=c.screenTpl||'boxes'; g.mode=c.mode||'screen'; g.settings=Object.assign(defSettings('race'),c.settings||{}); meta.customId=c.id; meta.crumb='لعبة إضافية';
  }
  g._ready=meta; return g;
}
/* ═══ zzzzzzbw، استوديو إبداع: ثلاثة تبويبات، فلاتر، شبكة واحدة، قائمة ⋮، بهوية المُلهم الأصلية ═══ */
var IB4_TYPES={mcq:'اختيار من متعدد',tf:'صح أم خطأ',pairs:'مطابقة',order:'ترتيب',open:'أسئلة مقالية',custom:'لعبة إضافية'};
function ib4Tabs(){
  var c={rack:TEMPLATES.filter(function(t){return t.ready;}).length, ready:ib5Count(), mine:_ib.games.length};
  return '<div class="tabs ib2-seg ib4-seg">'+[['rack',ico('grid',15)+' القوالب'],['ready',ico('star',15)+' ألعاب جاهزة'],['mine',ico('folder',15)+' ألعابي']].map(function(t){ return '<button class="'+(_ib.view===t[0]?'on':'')+'" onclick="hhIbView(\''+t[0]+'\')">'+t[1]+' <em>'+c[t[0]]+'</em></button>'; }).join('')+'</div>';
}
function ib4Rack(){
  var m=_ib.mode||'all';
  var seg='<div class="ib4-bar"><div class="ib4-mode">'+[['all','الكل',''],['screen','على الشاشة','monitor'],['live','مباشر','bolt']].map(function(x){ return '<button class="e2-ch'+(m===x[0]?' on':'')+'" onclick="hhIbMode4(\''+x[0]+'\')">'+(x[2]?ico(x[2],14):'')+x[1]+'</button>'; }).join('')+'</div></div>';
  var how='<div class="ib2-how"><div><b>1</b>اختر قالباً أو لعبة جاهزة</div><div><b>2</b>أضف أسئلتك أو استوردها من الفئات أو من ملف</div><div><b>3</b>شغّلها مباشرة أو اعرضها على الشاشة</div></div>';
  var groups=m==='screen'?['screen']:m==='live'?['live']:['live','screen','async'];
  var GN={live:'قوالب مباشرة على أجهزة الطلاب',screen:'قوالب شاشة الصف بلا أجهزة',async:'قوالب غير متزامنة'};
  var html=seg+how;
  groups.forEach(function(k){
    var shown=TEMPLATES.filter(function(t){ return t.kind===k; }); if(!shown.length) return;
    var rd=shown.filter(function(t){ return t.ready; }).length, sn=shown.length-rd;
    html+='<div class="ib2-sec"><h2>'+GN[k]+'</h2><small>'+(rd?rd+' جاهزة الآن':'')+(sn?(rd?'، ':'')+sn+' قريباً':'')+'</small></div>';
    if(k==='screen') html+='<div class="ib2-soonline">قريباً على الشاشة: '+SOON_SCR.split('، ').join('، ')+'</div>';
    html+='<div class="grid ib2-grid">'+shown.map(tplCard).join('')+(k===groups[groups.length-1]?'<div class="card ib2-new"><span class="si">'+ico('plus',28)+'</span><b>عندك فكرة قالب؟</b><p>ألغاز الخريطة، البحث عن الكنز، الجدار التعاوني…</p><button class="btn" onclick="hhIbSuggest()">اقترح فكرة</button></div>':'')+'</div>';
  });
  return html;
}
window.hhIbMode4=function(m){ _ib.mode=m; render(); };
function ib4Count(R){ return R.kind==='open'?R.n+' بطاقات':R.kind==='tf'?R.n+' عبارات':R.kind==='pairs'?R.n+' أزواج':R.kind==='order'?(R.n===1?'سؤال ترتيب واحد':R.n+' أسئلة ترتيب'):(R.n+' '+(R.n>2&&R.n<11?'أسئلة':'سؤالاً')); }
function ib4Unit(R){ if(R.sec==='all') return 'كل الوحدات'; if(R.sec==='custom') return 'لعبة إضافية'; return ((R.unit&&R.unit.name)||'').split('، ')[0]; }
function ib4Sort(L){ var O={mcq:1,tf:2,pairs:3,order:4,open:5,custom:6}; return L.map(function(r,i){ return [r.sec==='all'?0:(O[r.kind]||7),i,r]; }).sort(function(a,b){ return a[0]-b[0]||a[1]-b[1]; }).map(function(x){ return x[2]; }); }
function ib4Card(R,adm){
  var so=(R.kind==='open'||R.kind==='pairs'), feat=(R.sec==='all');
  var uname=R.sec==='all'?'كل الوحدات':R.sec==='custom'?'لعبة إضافية':((R.unit&&R.unit.name)||'').split('، ')[0];
  var meta='<i>'+ib4Count(R)+'</i>'+(R.img?'<i>مع صورة الخريطة</i>':'')+(R.draft?'<i class="w">مسودة بانتظار مراجعتك</i>':'');
  if(feat){ var dd={easy:0,med:0,hard:0}; try{ allMcq(_ib.grade||'g7t1').forEach(function(o){ var k=o.src.diff==='easy'?'easy':(o.src.diff==='med'||!o.src.diff)?'med':'hard'; dd[k]++; }); }catch(e){}
    meta='<i>'+(UNITS[_ib.grade||'g7t1']||[]).length+' وحدات</i><i class="e">سهل '+dd.easy+'</i><i class="m">متوسط '+dd.med+'</i><i class="h">صعب '+dd.hard+'</i>'; }
  var btns=so?'<button class="e2-b p" onclick="hhIbReadyShow(\''+R.rid+'\')">'+ico('monitor',15)+' اعرض على الشاشة</button>'
    :'<button class="e2-b p" onclick="hhIbReadyShow(\''+R.rid+'\')">'+ico('monitor',15)+' على الشاشة</button><button class="e2-b" onclick="hhIbReadyLive(\''+R.rid+'\')">'+ico('phone',15)+' مباشر</button>';
  var menu='<span class="ib4-mi" onclick="hhIbMenuDo(event,\'copy\',\''+R.rid+'\')">'+ico('copy',15)+' انسخ إلى ألعابي وعدّل</span>';
  if(adm){ var adml='';
    if(!R.school) adml+='<span class="ib4-mi" onclick="hhIbMenuDo(event,\'edit\',\''+(R.src||R.rid)+'\')">'+ico('edit',15)+' عدّل الأصل</span>';
    if(R.draft) adml+='<span class="ib4-mi" onclick="hhIbMenuDo(event,\'publish\',\''+R.rid+'\')">'+ico('send',15)+' انشر لكل المعلمين</span>';
    if(R.kind==='custom') adml+='<span class="ib4-mi d" onclick="hhIbMenuDo(event,\'del\',\''+R.rid+'\')">'+ico('trash',15)+' احذف من الألعاب الجاهزة</span>';
    if(adml) menu+='<small>للمدير</small>'+adml; }
  var txt=(R.title+' '+R.d+' '+uname+' '+(IB4_TYPES[R.kind]||'')).toLowerCase();
  var band=feat?'<div class="gh"><span class="gi">'+ico(R.ic,30,2)+'</span><div class="big"><b>'+R.n+'</b><small>'+(R.n>2&&R.n<11?'أسئلة':'سؤالاً')+'</small></div><span class="un">الفصل الدراسي كاملاً</span></div>'
    :'<div class="gh"><span class="gi">'+ico(R.ic,20,2)+'</span><span class="un">'+esc(uname)+'</span>'+(so?'<span class="so">للشاشة</span>':'')+'</div>';
  return '<div class="rl-c ib4-c'+(feat?' feat':'')+(R.draft?' draft':'')+'" style="--c:'+R.c+'" data-k="'+R.kind+'" data-u="'+R.sec+'" data-t="'+esc(txt)+'">'+band+'<div class="gb"><span class="ib4-ty">'+(feat?'اختيار من متعدد، مرتبة من السهل إلى الصعب':(IB4_TYPES[R.kind]||''))+'</span><b>'+esc(R.title)+'</b><div class="mt">'+meta+'</div><p>'+esc(R.d)+'</p><div class="ac'+(so?' one':'')+'">'+btns+'<button class="ib4-more" aria-label="خيارات أخرى" onclick="hhIbMenu(event,this)">'+ico('more',18)+'</button></div><div class="ib4-menu" hidden>'+menu+'</div></div></div>';
}
/* zzzzzzcc، الألعاب الجاهزة: بطاقة شاملة واحدة، وبطاقة لكل وحدة بداخلها أنواع ألعابها، وفوقها المرحلة والمادة والصف */
var IB5_SHORT={mcq:'مراجعة',tf:'صح أم خطأ',pairs:'مفاهيم',order:'ترتيب',open:'مقالي',mix:'منوّعة'};
var IB5_ICO={mcq:'target',tf:'check',pairs:'link',order:'sort',open:'edit',mix:'grid'};
var IB5_ORD={mcq:1,tf:2,pairs:3,order:4,open:5};
var IB5_ST=[['p','الابتدائية'],['m','الإعدادية'],['s','الثانوية']];
var IB5_SUB=[['soc','الدراسات الاجتماعية','#1F4E79','globe'],['isl','التربية الإسلامية','#2C5340','moon'],['ar','اللغة العربية','#8A1538','book'],['sci','العلوم','#0F6E56','flask'],['math','الرياضيات','#5A3A8E','calc'],['en','اللغة الإنجليزية','#B5801F','abc']];
var IB5_ORDN=['الأولى','الثانية','الثالثة','الرابعة','الخامسة','السادسة','السابعة','الثامنة'];
function ib5Groups(L){
  var G=_ib.grade||'g7t1', g={comp:L.filter(function(r){ return r.sec==='all'; }), units:[], custom:L.filter(function(r){ return r.sec==='custom'; })};
  (UNITS[G]||[]).forEach(function(u,i){ var it=L.filter(function(r){ return r.sec===u.k; }).sort(function(a,b){ return (IB5_ORD[a.kind]||9)-(IB5_ORD[b.kind]||9); }); if(it.length) g.units.push({u:u,i:i,items:it}); });
  return g;
}
function ib5Count(){ var g=ib5Groups(readyList()); return (g.comp.length?1:0)+g.units.length+g.custom.length; }
function ib5Btns(R){
  var so=(R.kind==='open'||R.kind==='pairs'||R.kind==='mix');
  return so?'<button class="e2-b p" onclick="hhIbReadyShow(\''+R.rid+'\')">'+ico('monitor',15)+' اعرض على الشاشة</button>'
    :'<button class="e2-b p" onclick="hhIbReadyShow(\''+R.rid+'\')">'+ico('monitor',15)+' على الشاشة</button><button class="e2-b" onclick="hhIbReadyLive(\''+R.rid+'\')">'+ico('phone',15)+' مباشر</button>';
}
function ib5Menu(R,adm){
  var m='<span class="ib4-mi" onclick="hhIbMenuDo(event,\'copy\',\''+R.rid+'\')">'+ico('copy',15)+' انسخ إلى ألعابي وعدّل</span>', a='';
  if(adm){ if(!R.school&&!R.noEdit) a+='<span class="ib4-mi" onclick="hhIbMenuDo(event,\'edit\',\''+(R.src||R.rid)+'\')">'+ico('edit',15)+' عدّل الأصل</span>';
    if(R.draft) a+='<span class="ib4-mi" onclick="hhIbMenuDo(event,\'publish\',\''+R.rid+'\')">'+ico('send',15)+' انشر لكل المعلمين</span>';
    if(R.kind==='custom') a+='<span class="ib4-mi d" onclick="hhIbMenuDo(event,\'del\',\''+R.rid+'\')">'+ico('trash',15)+' احذف من الألعاب الجاهزة</span>'; }
  return m+(a?'<small>للمدير</small>'+a:'');
}
function ib5Num(R){ return R.extra?'<em>'+R.n+'<small>+'+R.extra+'</small></em>':'<em>'+R.n+'</em>'; }
function ib5CompCard(items,adm){
  var mode=_ib.cmode==='mix'&&items.some(function(r){ return r.kind==='mix'; })?'mix':'mcq';
  var R=items.filter(function(r){ return r.kind===mode; })[0]||items[0], G=_ib.grade||'g7t1', nu=(UNITS[G]||[]).length;
  var meta=mode==='mix'&&R.parts?'<i>'+R.parts.mcq+' اختيار</i>'+(R.parts.tf?'<i>'+R.parts.tf+' صح وخطأ</i>':'')+'<i>'+R.parts.open+' مقالي</i>'+(R.parts.order?'<i>'+R.parts.order+' ترتيب</i>':'')+(adm&&R.parts.draftTf?'<i class="w">'+R.parts.draftTf+' صح وخطأ بعد نشرها</i>':'')
    :'<i>'+nu+' وحدات</i><i>'+R.n+' أساسية</i>'+(R.extra?'<i class="e">+'+R.extra+' إضافية يختارها المعلم</i>':'');
  var seg=items.length>1?'<div class="ib5-seg" role="tablist">'+items.map(function(r){ return '<button type="button" role="tab" aria-selected="'+(r===R)+'" class="'+(r===R?'on':'')+'" onclick="hhIbCMode(\''+r.kind+'\')">'+(r.kind==='mix'?'منوّعة':'اختيار من متعدد')+'</button>'; }).join('')+'</div>':'';
  var txt=(R.title+' '+R.d+' الشاملة').toLowerCase();
  return '<div class="rl-c ib4-c feat ib5-c" style="--c:'+R.c+'" data-k="'+items.map(function(r){ return r.kind; }).join(' ')+'" data-u="all" data-t="'+esc(txt)+'"><div class="gh"><span class="gi">'+ico('award',30,2)+'</span><div class="big"><b>'+R.n+'</b><small>'+(R.n>2&&R.n<11?'أسئلة أساسية':'سؤالاً أساسياً')+'</small></div><span class="un">'+(R.extra?'ويضيف المعلم ما يريد':'الفصل الدراسي كاملاً')+'</span></div>'
    +'<div class="gb"><span class="ib4-ty">الفصل الدراسي كاملاً</span><b>'+esc(R.title)+'</b>'+seg+'<div class="mt">'+meta+'</div><p>'+esc(R.d)+'</p><div class="ac'+(mode==='mix'?' one':'')+'">'+ib5Btns(R)+'<button class="ib4-more" aria-label="خيارات أخرى" onclick="hhIbMenu(event,this)">'+ico('more',18)+'</button></div><div class="ib4-menu" hidden>'+ib5Menu(R,adm)+'</div></div></div>';
}
function ib5UnitCard(gr,adm){
  var u=gr.u, it=gr.items; _ib.csel=_ib.csel||{}; var R=it.filter(function(r){ return r.rid===_ib.csel[u.k]; })[0]||it[0];
  var so=(R.kind==='open'||R.kind==='pairs');
  var ty='<div class="ib5-ty">'+it.map(function(r){ return '<button type="button" class="'+(r===R?'on':'')+(r.draft?' dr':'')+'" aria-pressed="'+(r===R)+'" onclick="hhIbCSel(\''+u.k+'\',\''+r.rid+'\')">'+ico(IB5_ICO[r.kind]||'grid',15)+'<span>'+IB5_SHORT[r.kind]+(r.draft?'<small>مسودة</small>':'')+'</span>'+ib5Num(r)+'</button>'; }).join('')+'</div>';
  var txt=(u.short+' '+u.d+' '+it.map(function(r){ return r.title+' '+(IB4_TYPES[r.kind]||''); }).join(' ')).toLowerCase();
  return '<div class="rl-c ib4-c ib5-c ib5-u" style="--c:'+u.c+';--h:'+hexOf(u.c)+'" data-k="'+it.map(function(r){ return r.kind; }).join(' ')+'" data-u="'+u.k+'" data-t="'+esc(txt)+'"><div class="gh"><span class="gi">'+ico(u.ic,20,2)+'</span><span class="un">الوحدة '+(IB5_ORDN[gr.i]||(gr.i+1))+'</span>'+(R.school?'<span class="so">من «مدرستي»</span>':'')+'</div>'
    +'<div class="gb"><b>'+esc(u.short)+'</b><p>'+esc(u.d)+'</p>'+ty+'<div class="ac'+(so?' one':'')+'">'+ib5Btns(R)+'<button class="ib4-more" aria-label="خيارات أخرى" onclick="hhIbMenu(event,this)">'+ico('more',18)+'</button></div><div class="ib4-menu" hidden>'+ib5Menu(R,adm)+'</div></div></div>';
}
function ib5Path(){
  var G=_ib.grade||'g7t1', n=ib5Count();
  var st='<div class="ib5-st" role="tablist" aria-label="المرحلة">'+IB5_ST.map(function(x){ var on=x[0]==='m'; return '<button type="button" class="'+(on?'on':'')+'" '+(on?'aria-selected="true"':'disabled')+'>'+x[1]+(on?'':' <small>قريباً</small>')+'</button>'; }).join('')+'</div>';
  var sb='<div class="ib5-sb">'+IB5_SUB.map(function(x){ var on=x[0]==='soc'; return '<button type="button" class="ib5-s'+(on?' on':' off')+'" style="--c:'+x[2]+'" '+(on?'':'disabled')+'><i>'+ico(x[3],20,2)+'</i><span><b>'+x[1]+'</b><small>'+(on?(n===1?'بطاقة واحدة':n===2?'بطاقتان':(n>2&&n<11)?n+' بطاقات':n+' بطاقة'):'قريباً')+'</small></span></button>'; }).join('')+'</div>';
  var gr='<div class="ib5-gr"><span>الصف:</span><button type="button" class="e2-ch on">السابع</button><button type="button" class="e2-ch" disabled>الثامن، قريباً</button><button type="button" class="e2-ch" disabled>التاسع، قريباً</button><span class="sp"></span><span>الفصل:</span>'
    +'<button type="button" class="e2-ch'+(G==='g7t1'?' on':'')+'" onclick="hhIbGrade(\'g7t1\')">الأول</button><button type="button" class="e2-ch" disabled>الثاني، قريباً</button></div>';
  return '<div class="ib5-path">'+st+sb+gr+'</div><div class="ib5-crumb">الإعدادية <span>‹</span> الدراسات الاجتماعية <span>‹</span> السابع <span>‹</span> الفصل '+(G==='g7t1'?'الأول':'الثاني')+'</div>';
}
function renderReady(){
  var adm=isAdm(), G=_ib.grade||'g7t1', F=_ib.rf=_ib.rf||{u:'',k:'',q:''};
  var L=readyList(), GR=ib5Groups(L);
  var kinds=[]; L.forEach(function(r){ if(r.kind!=='custom'&&kinds.indexOf(r.kind)<0) kinds.push(r.kind); }); kinds.sort(function(a,b){ return (IB5_ORD[a]||(a==='mix'?0:9))-(IB5_ORD[b]||(b==='mix'?0:9)); });
  var flt='<div class="ib4-flt ib5-flt">'
    +'<label class="e2-ch ib4-sel">'+ico('list',14)+'<select onchange="hhIbRF(\'u\',this.value)" aria-label="الوحدة"><option value="">كل الوحدات</option><option value="all"'+(F.u==='all'?' selected':'')+'>المراجعة الشاملة</option>'+(UNITS[G]||[]).map(function(u){ return '<option value="'+u.k+'"'+(F.u===u.k?' selected':'')+'>'+esc(u.name.replace('، ','، '))+'</option>'; }).join('')+'</select></label>'
    +'<label class="e2-ch ib4-sel">'+ico('grid',14)+'<select onchange="hhIbRF(\'k\',this.value)" aria-label="نوع اللعبة"><option value="">كل الأنواع</option>'+kinds.map(function(k){ return '<option value="'+k+'"'+(F.k===k?' selected':'')+'>'+(k==='mix'?'منوّعة':IB4_TYPES[k])+'</option>'; }).join('')+'</select></label>'
    +'<label class="e2-ch ib4-q">'+ico('search',14)+'<input type="search" placeholder="ابحث عن وحدة أو موضوع" value="'+esc(F.q)+'" oninput="hhIbRQ(this.value)" aria-label="بحث"></label>'
    +(adm?'<button class="e2-b s p" onclick="hhIbReadyNew()">'+ico('plus',14)+' لعبة جاهزة جديدة</button>':'')+'</div>';
  var top=ib5Path()+flt;
  if(!L.length) return top+'<div class="rl-soon">ألعاب هذا الصف قيد الإعداد، قريباً بإذن الله</div>';
  var cards=(GR.comp.length?ib5CompCard(GR.comp,adm):'')+GR.units.map(function(g){ return ib5UnitCard(g,adm); }).join('')+GR.custom.map(function(R){ return ib4Card(R,adm); }).join('');
  var src='<div class="rl-src">'+ico('book',14)+' <b id="ib4-n">'+ib4N(ib5Count())+'</b><span class="ib4-sync">الأسئلة الأساسية ثابتة، ويضيف المعلم من «مدرستي» ما يريد</span></div>';
  var html=top+src+'<div class="rl-g ib4-g" id="ib4-grid">'+cards+'</div><div class="rl-soon" id="ib4-none" hidden>لا ألعاب تطابق اختيارك. غيّر الوحدة أو النوع، أو امسح البحث.</div>';
  if(!adm) html+='<div class="hint" style="text-align:center">العرض على الشاشة متاح للجميع، والتشغيل المباشر والنسخ إلى «ألعابي» بحساب المعلم</div>';
  setTimeout(ib4Filter,0);
  return html;
}
window.hhIbCSel=function(k,rid){ _ib.csel=_ib.csel||{}; _ib.csel[k]=rid; render(); };
window.hhIbCMode=function(m){ _ib.cmode=m; render(); };
function ib4N(n){ return n===1?'لعبة جاهزة واحدة':n===2?'لعبتان جاهزتان':(n>2&&n<11)?n+' ألعاب جاهزة':n+' لعبة جاهزة'; }
function ib4Filter(){
  var F=_ib.rf||{u:'',k:'',q:''}, q=String(F.q||'').trim().toLowerCase(), n=0;
  document.querySelectorAll('#ib4-grid .ib4-c').forEach(function(c){ var ok=(!F.u||c.getAttribute('data-u')===F.u)&&(!F.k||(' '+c.getAttribute('data-k')+' ').indexOf(' '+F.k+' ')>-1)&&(!q||c.getAttribute('data-t').indexOf(q)>-1); c.hidden=!ok; if(ok) n++; });
  var none=document.getElementById('ib4-none'); if(none) none.hidden=n>0;
  var nn=document.getElementById('ib4-n'); if(nn) nn.textContent=ib4N(n);
}
window.hhIbRF=function(k,v){ _ib.rf=_ib.rf||{u:'',k:'',q:''}; _ib.rf[k]=v;
  if(k==='k'&&v){ _ib.csel=_ib.csel||{}; var L=readyList(); if(v==='mix'||v==='mcq') _ib.cmode=v==='mix'?'mix':'mcq'; (UNITS[_ib.grade||'g7t1']||[]).forEach(function(u){ var r=L.filter(function(x){ return x.sec===u.k&&x.kind===v; })[0]; if(r) _ib.csel[u.k]=r.rid; }); render(); return; }
  ib4Filter(); };
window.hhIbRQ=function(v){ _ib.rf=_ib.rf||{u:'',k:'',q:''}; _ib.rf.q=v; ib4Filter(); };
function ib4Close(){ document.querySelectorAll('#hh-ib .ib4-menu').forEach(function(m){ m.hidden=true; }); }
window.hhIbMenu=function(ev,btn){ ev.stopPropagation(); var m=btn.closest('.ib4-c').querySelector('.ib4-menu'); var was=!m.hidden; ib4Close(); if(!was) m.hidden=false; };
window.hhIbMenuDo=function(ev,act,rid){ ev.stopPropagation(); ib4Close(); if(act==='copy') hhIbReadyCopy(rid); else if(act==='edit') hhIbReadyEdit(rid); else if(act==='publish') hhIbReadyPublish(rid); else if(act==='del') hhIbReadyDel(rid); };
document.addEventListener('click',function(e){ if(!e.target.closest||!e.target.closest('.ib4-menu')) ib4Close(); });
document.addEventListener('keydown',function(e){ if(e.key==='Escape') ib4Close(); });

var IB4CSS="#hh-ib [hidden]{display:none !important;}\n#hh-ib.ib2 .ib4-seg button em{margin-inline-start:4px;}\n#hh-ib .ib4-bar{display:flex;justify-content:flex-start;margin:14px 0 0;}\n#hh-ib .ib4-mode{display:flex;gap:8px;flex-wrap:wrap;}\n#hh-ib .ib4-flt{display:grid;grid-template-columns:220px 240px 190px minmax(0,1fr) auto;gap:10px;align-items:center;margin:16px 0 12px;}\n#hh-ib .ib4-flt .e2-ch{height:44px;border-radius:12px;padding:0 12px;min-width:0;}\n#hh-ib .ib4-sel select{flex:1;min-width:0;height:100%;font-size:14px;}\n#hh-ib .ib4-q input{flex:1;min-width:0;border:0;outline:0;background:transparent;font-family:Cairo;font-weight:600;font-size:14px;color:#3D2A16;height:100%;}\n#hh-ib .ib4-q:focus-within{border-color:#B8924A;box-shadow:0 0 0 3px rgba(184,146,74,.2);}\n#hh-ib .ib4-flt .e2-b{height:44px;}\nhtml body #hh-ib .rl-g.ib4-g{grid-template-columns:repeat(4,minmax(0,1fr));}\n#hh-ib .ib4-c{position:relative;overflow:visible;}\n#hh-ib .ib4-c .gh{border-radius:16px 16px 0 0;}\n#hh-ib .ib4-ty{font-family:Cairo;font-weight:700;font-size:12px;color:#8A6D2E;}\n#hh-ib .ib4-c .ac{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr) 40px;gap:8px;}\n#hh-ib .ib4-c .ac.one{grid-template-columns:minmax(0,1fr) 40px;}\n#hh-ib .ib4-c .ac .e2-b{height:40px;padding:0 8px;font-size:13.5px;min-width:0;}\n#hh-ib .ib4-more{width:40px;height:40px;border-radius:12px;border:1.5px solid #E7DAC0;background:#fff;color:#5E0E26;display:grid;place-items:center;cursor:pointer;padding:0;}\n#hh-ib .ib4-more:hover{border-color:#B8924A;background:#FBF7EE;}\n#hh-ib .ib4-menu{position:absolute;bottom:60px;left:12px;width:240px;max-width:calc(100% - 24px);background:#fff;border:1.5px solid #E7DAC0;border-radius:14px;box-shadow:0 14px 30px rgba(61,9,24,.16);padding:6px;z-index:20;display:grid;}\n#hh-ib .ib4-mi{display:flex;align-items:center;gap:10px;padding:10px;border-radius:10px;font-family:Cairo;font-weight:700;font-size:13.5px;color:#3D0918;cursor:pointer;}\n#hh-ib .ib4-mi svg{color:#8A6D2E;}\n#hh-ib .ib4-mi:hover{background:#F7ECEF;}\n#hh-ib .ib4-mi.d{color:#B3261E;} #hh-ib .ib4-mi.d svg{color:#B3261E;}\n#hh-ib .ib4-menu small{font-family:Cairo;font-weight:700;font-size:11.5px;color:#8A7A63;padding:6px 10px 2px;border-top:1px solid #F0E6D3;margin-top:4px;}\n@media (max-width:1200px){ html body #hh-ib .rl-g.ib4-g{grid-template-columns:repeat(3,minmax(0,1fr));} #hh-ib .ib4-flt{grid-template-columns:repeat(3,minmax(0,1fr));} #hh-ib .ib4-q{grid-column:1 / span 2;} }\n@media (max-width:900px){ html body #hh-ib .rl-g.ib4-g{grid-template-columns:repeat(2,minmax(0,1fr));} }\n@media (max-width:640px){\n  html body #hh-ib .rl-g.ib4-g{grid-template-columns:1fr;}\n  #hh-ib .ib4-flt{grid-template-columns:1fr 1fr;}\n  #hh-ib .ib4-flt > .e2-ch:first-child, #hh-ib .ib4-q, #hh-ib .ib4-flt > .e2-b{grid-column:1 / -1;}\n  html body #hh-ib.ib2 .ib2-seg.ib4-seg{display:flex !important;width:100% !important;overflow:visible;}\n  html body #hh-ib.ib2 .ib2-seg.ib4-seg button{flex:1 1 0;min-width:0;justify-content:center;padding:0 4px !important;font-size:.86rem !important;gap:4px !important;}\n  html body #hh-ib.ib2 .ib2-seg.ib4-seg button svg{display:none;}\n  #hh-ib .ib4-sync{flex-basis:100%;margin-top:2px;padding-inline-start:20px;}\n  #hh-ib .ib4-c .ac .e2-b, #hh-ib .ib4-more{height:44px;}\n}\n\n#hh-ib .rl-src #ib4-n{color:#5E0E26;font-weight:800;margin-inline-end:8px;}\n#hh-ib .rl-src{flex-wrap:wrap;} #hh-ib .rl-src #ib4-n{white-space:nowrap;}\n\n#hh-ib .ib4-mh{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:10px;align-items:center;margin:16px 0 14px;}\n#hh-ib .ib4-mh .ib4-mode .e2-ch em{font-style:normal;font-size:.78rem;background:#F5F3F0;color:#8A6D2E;border-radius:99px;padding:0 7px;margin-inline-start:2px;}\n#hh-ib .ib4-mh .ib4-mode .e2-ch.on em{background:rgba(245,230,196,.22);color:#F5E6C4;}\n#hh-ib .ib4-mh .ib4-q{height:44px;border-radius:12px;padding:0 12px;min-width:0;}\n#hh-ib .ib4-mh > .e2-b{height:44px;}\n#hh-ib .ib4-mc .gh .md span.ok{background:#E6F2EA;color:#2C5340;border-color:transparent;}\n#hh-ib .ib4-mc .gh .md span.dr{background:#FBF1DA;color:#8A6D2E;border-color:transparent;}\n#hh-ib .ib4-mc .gb p.ib4-warn{color:#B3261E;font-weight:700;}\n#hh-ib .ib4-mc .e2-b:disabled{opacity:.45;cursor:not-allowed;}\n#hh-ib .ib4-ss{margin-top:28px;}\n#hh-ib .ib4-note{background:#fff;border:1.5px dashed #D9C08A;border-radius:14px;padding:14px 18px;color:#8A7A63;font-family:Cairo;font-weight:700;font-size:.92rem;}\n#hh-ib .ib4-rows{display:grid;gap:8px;}\n#hh-ib .ib4-row{display:flex;align-items:center;gap:12px;background:#fff;border:1.5px solid #E7DAC0;border-radius:14px;padding:10px 14px;font-family:Cairo;}\n#hh-ib .ib4-rt{flex:1;min-width:0;display:flex;flex-direction:column;}\n#hh-ib .ib4-rt b{font-weight:800;color:#3D0918;font-size:.98rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}\n#hh-ib .ib4-rt small{font-weight:700;color:#8A7A63;font-size:.82rem;}\n#hh-ib .ib4-row .e2-b{flex:0 0 auto;width:auto;}\n#hh-ib .ib4-row .ib4-end{color:#B3261E;border-color:#E9B9B5;}\n@media (max-width:900px){ #hh-ib .ib4-mh{grid-template-columns:1fr;} #hh-ib .ib4-mh .ib4-mode{display:grid;grid-template-columns:repeat(3,1fr);} #hh-ib .ib4-mh .ib4-mode .e2-ch{justify-content:center;} }\n@media (max-width:640px){ #hh-ib .ib4-row{flex-wrap:wrap;} #hh-ib .ib4-rt{flex-basis:100%;} #hh-ib .ib4-row .e2-b{flex:1;} }\n\n/* zzzzzzcc، بطاقات الألعاب الجاهزة: شريط أقصر، اسم الوحدة في الشريط، والمراجعة الشاملة بطاقة مميزة */\n#hh-ib .ib4-c .gh{height:54px;padding:0 14px;align-items:center;justify-content:flex-start;gap:10px;}\n#hh-ib .ib4-c .gh .gi{width:34px;height:34px;border-radius:10px;}\n#hh-ib .ib4-c .gh .un{font-family:Cairo;font-weight:800;font-size:13.5px;color:#fff;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}\n#hh-ib .ib4-c .gh .so{font-family:Cairo;font-weight:700;font-size:11.5px;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.35);border-radius:99px;padding:1px 9px;color:#fff;}\n#hh-ib .ib4-c .gb p{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}\n#hh-ib .ib4-c.feat{grid-column:span 2;flex-direction:row;border:1.5px solid #B8924A;box-shadow:0 12px 28px rgba(94,14,38,.12);position:relative;}\n#hh-ib .ib4-c.feat .gh{height:auto;width:190px;flex-shrink:0;flex-direction:column;align-items:flex-start;justify-content:space-between;padding:18px;border-radius:0;position:relative;overflow:hidden;}\n#hh-ib .ib4-c.feat .gh::after{content:\"\";position:absolute;inset:8px;border:1px solid rgba(230,206,142,.45);border-radius:12px;pointer-events:none;}\n#hh-ib .ib4-c.feat .gh .gi{width:52px;height:52px;border-radius:14px;color:#E6CE8E;background:rgba(230,206,142,.14);border:1px solid rgba(230,206,142,.45);}\n#hh-ib .ib4-c.feat .big b{display:block;font-family:Cairo;font-weight:900;font-size:46px;line-height:1;color:#fff;}\n#hh-ib .ib4-c.feat .big small{font-family:Cairo;font-weight:800;font-size:15px;color:#E6CE8E;}\n#hh-ib .ib4-c.feat .gh .un{flex:0 0 auto;font-size:12.5px;color:#F1E2C8;white-space:normal;}\n#hh-ib .ib4-c.feat .gb{padding:18px 20px;}\n#hh-ib .ib4-c.feat .gb b{font-size:21px;}\n#hh-ib .ib4-c.feat .mt i.e{background:#E6F2EA;color:#2C5340;} #hh-ib .ib4-c.feat .mt i.m{background:#FBF1DA;color:#8A6D2E;} #hh-ib .ib4-c.feat .mt i.h{background:#F7ECEF;color:#8A1538;}\n#hh-ib .ib4-c.feat .ac{grid-template-columns:minmax(0,1fr) minmax(0,1fr) 40px;max-width:420px;}\n#hh-ib .ib4-c.feat .ib4-menu{left:12px;bottom:66px;}\n@media (max-width:900px){ #hh-ib .ib4-c.feat{grid-column:span 1;} }\n@media (max-width:640px){ #hh-ib .ib4-c.feat{flex-direction:column;} #hh-ib .ib4-c.feat .gh{width:auto;flex-direction:row;align-items:center;gap:12px;padding:14px 16px;} #hh-ib .ib4-c.feat .big{display:flex;align-items:baseline;gap:6px;} #hh-ib .ib4-c.feat .big b{font-size:34px;} #hh-ib .ib4-c.feat .gh .un{display:none;} #hh-ib .ib4-c.feat .gh::after{inset:6px;} }\n\n#hh-ib .ib4-c.feat{overflow:hidden;} #hh-ib .ib4-c.feat .ib4-menu{position:absolute;}\n#hh-ib .ib4-c.feat{overflow:visible;} #hh-ib .ib4-c.feat .gh{border-start-start-radius:16px;border-end-start-radius:16px;}\n@media (max-width:640px){ #hh-ib .ib4-c.feat .gh{border-radius:16px 16px 0 0;} }\n\n.ib5-exov{position:fixed;inset:0;z-index:100060;background:rgba(42,8,16,.55);display:flex;align-items:center;justify-content:center;padding:16px;direction:rtl;font-family:Cairo,sans-serif;}\n.ib5-ex{width:min(760px,100%);max-height:94vh;overflow:auto;background:#fff;border:1.5px solid #B8924A;border-radius:22px;padding:20px 22px;box-shadow:0 30px 70px rgba(0,0,0,.35);color:#3D0918;}\n.ib5-ex h3{margin:0 0 12px;font-size:22px;font-weight:900;}\n.ib5-exg{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.7fr);gap:12px;}\n.ib5-ex .bk{border:1.5px solid #E7DAC0;border-radius:16px;padding:14px;background:#FFFDF8;display:flex;flex-direction:column;gap:6px;}\n.ib5-ex .bk.core{background:linear-gradient(160deg,#FFFFFF,#F5EEDF);border-color:#B8924A;}\n.ib5-ex .bk b{display:flex;align-items:center;gap:6px;font-weight:900;font-size:15px;} .ib5-ex .bk b svg{color:#8A6D2E;}\n.ib5-ex .big{font-size:40px;font-weight:900;color:#5E0E26;line-height:1.1;}\n.ib5-ex small{font-weight:700;color:#8A7A63;font-size:13px;line-height:1.7;}\n.ib5-ex .nm{display:flex;align-items:center;gap:8px;margin:6px 0;}\n.ib5-ex .nm button{width:44px;height:44px;border-radius:12px;border:1.5px solid #B8924A;background:#fff;font-size:24px;font-weight:900;color:#5E0E26;cursor:pointer;font-family:Cairo;}\n.ib5-ex .nm input{width:96px;height:44px;border:2px solid #5E0E26;border-radius:12px;text-align:center;font-family:Cairo;font-size:22px;font-weight:900;color:#5E0E26;}\n.ib5-ex .nm span{font-weight:700;font-size:13px;color:#8A7A63;}\n.ib5-ex .un{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;}\n.ib5-ex .un label{display:flex;align-items:center;gap:6px;font-weight:800;font-size:13px;border:1.5px solid #E7DAC0;border-radius:10px;padding:6px 8px;background:#fff;cursor:pointer;}\n.ib5-ex .un input{accent-color:#5E0E26;width:16px;height:16px;} .ib5-ex .un em{font-style:normal;margin-inline-start:auto;color:#8A7A63;font-weight:700;}\n.ib5-ex .tot{display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:12px;border-top:1px dashed #D9C08A;font-weight:900;} .ib5-ex .tot b{font-size:22px;color:#2C5340;}\n.ib5-ex .ac{display:flex;gap:8px;justify-content:flex-end;margin-top:12px;} .ib5-ex .ac .e2-b{height:46px;padding:0 20px;}\n@media (max-width:640px){ .ib5-exg{grid-template-columns:1fr;} }\n\n/* zzzzzzcc، بطاقات الوحدات والمسار */\n#hh-ib .ib5-path{background:#fff;border:1.5px solid #E7DAC0;border-radius:20px;padding:14px;margin:16px 0 8px;display:grid;gap:12px;}\n#hh-ib .ib5-st{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;background:#F5F3F0;border-radius:14px;padding:4px;}\n#hh-ib .ib5-st button{height:44px;border:0;border-radius:11px;background:transparent;font-family:Cairo;font-weight:800;font-size:15px;color:#8A6D2E;display:flex;align-items:center;justify-content:center;gap:6px;}\n#hh-ib .ib5-st button small{font-size:11.5px;font-weight:700;opacity:.8;}\n#hh-ib .ib5-st button.on{background:#5E0E26;color:#F5E6C4;box-shadow:0 4px 10px rgba(61,9,24,.22);}\n#hh-ib .ib5-st button:disabled{cursor:default;}\n#hh-ib .ib5-sb{display:flex;gap:8px;overflow-x:auto;padding-bottom:2px;scrollbar-width:thin;}\n#hh-ib .ib5-s{flex:0 0 auto;min-width:150px;border:1.5px solid #E7DAC0;border-radius:16px;padding:10px 12px;display:flex;align-items:center;gap:10px;background:#FFFDF8;font-family:Cairo;text-align:right;}\n#hh-ib .ib5-s i{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;color:#fff;background:var(--c);flex-shrink:0;}\n#hh-ib .ib5-s b{display:block;font-weight:800;font-size:14.5px;color:#3D0918;} #hh-ib .ib5-s small{font-weight:700;font-size:12px;color:#8A7A63;}\n#hh-ib .ib5-s.on{border-color:var(--c);box-shadow:0 0 0 3px color-mix(in srgb,var(--c) 22%,transparent);background:#fff;}\n#hh-ib .ib5-s.off{opacity:.55;cursor:default;} #hh-ib .ib5-s.off small{color:#B8924A;}\n#hh-ib .ib5-gr{display:flex;gap:8px;flex-wrap:wrap;align-items:center;font-family:Cairo;font-weight:800;font-size:13px;color:#8A7A63;}\n#hh-ib .ib5-gr .e2-ch{height:38px;} #hh-ib .ib5-gr .e2-ch:disabled{opacity:.5;cursor:default;} #hh-ib .ib5-gr .sp{width:14px;}\n#hh-ib .ib5-crumb{font-family:Cairo;font-weight:800;color:#5E0E26;font-size:14px;display:flex;align-items:center;gap:6px;margin:4px 2px 0;flex-wrap:wrap;} #hh-ib .ib5-crumb span{color:#B8924A;}\nhtml body #hh-ib .ib4-flt.ib5-flt{grid-template-columns:240px 190px minmax(0,1fr) auto;}\n#hh-ib .ib5-ty{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;}\n#hh-ib .ib5-ty button{display:flex;align-items:center;gap:6px;border:1.5px solid #E7DAC0;border-radius:11px;padding:6px 8px;background:#FFFDF8;font-family:Cairo;font-weight:800;font-size:12.5px;color:#3D2A16;cursor:pointer;text-align:start;min-height:38px;}\n#hh-ib .ib5-ty button svg{color:var(--h);flex-shrink:0;}\n#hh-ib .ib5-ty button span{flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.2;} #hh-ib .ib5-ty button span small{font-size:10.5px;color:#8A5A10;font-weight:800;}\n#hh-ib .ib5-ty button em{font-style:normal;color:#8A7A63;font-weight:800;display:flex;align-items:baseline;gap:2px;} #hh-ib .ib5-ty button em small{font-size:10.5px;color:#2C5340;}\n#hh-ib .ib5-ty button.on{border-color:var(--h);background:color-mix(in srgb,var(--h) 8%,#fff);box-shadow:0 0 0 2px color-mix(in srgb,var(--h) 18%,transparent);}\n#hh-ib .ib5-ty button.dr{border-style:dashed;}\n#hh-ib .ib5-ty button:focus-visible{outline:2px solid #B8924A;outline-offset:2px;}\n#hh-ib .ib5-u .gb b{font-size:18px;}\n#hh-ib .ib5-seg{display:grid;grid-template-columns:1fr 1fr;gap:4px;background:#F5F3F0;border-radius:12px;padding:4px;max-width:420px;}\n#hh-ib .ib5-seg button{height:36px;border:0;border-radius:9px;background:transparent;font-family:Cairo;font-weight:800;font-size:13.5px;color:#8A6D2E;cursor:pointer;}\n#hh-ib .ib5-seg button.on{background:#5E0E26;color:#F5E6C4;}\n#hh-ib .ib4-c.feat .mt i.e{background:#E6F2EA;color:#2C5340;}\n@media (max-width:900px){ html body #hh-ib .ib4-flt.ib5-flt{grid-template-columns:1fr 1fr;} #hh-ib .ib5-flt .ib4-q, #hh-ib .ib5-flt > .e2-b{grid-column:1 / -1;} }\n@media (max-width:640px){ #hh-ib .ib5-st button{font-size:13.5px;} #hh-ib .ib5-s{min-width:132px;} }\n\n/* zzzzzzcd: المحرر بالهوية */\n#hh-ib .e2-tb{border:2px solid #B8924A;position:relative;}\n#hh-ib .e2-cd{border:2px solid #B8924A;border-radius:20px;position:relative;}\n#hh-ib .e2-cd::before{content:\"\";position:absolute;inset:6px;border:1px solid rgba(184,146,74,.28);border-radius:15px;pointer-events:none;}\n#hh-ib .e2-hd{border-bottom:1.5px solid #EADFC8;font-weight:900;}\n#hh-ib .e2-hd em{background:#FBF1DA;color:#8A5A10;font-weight:800;}\n#hh-ib .e2-qi{border-width:2px;border-color:#EDE3CF;}\n#hh-ib .e2-qi.on{border-color:#5E0E26;background:#FBF6F7;box-shadow:none;}\n#hh-ib .e2-qi .tx small{font-family:Cairo;font-weight:700;display:flex;align-items:center;gap:5px;}\n#hh-ib .e2-qi .tk{font-style:normal;font-size:10.5px;font-weight:800;border-radius:6px;padding:0 6px;line-height:17px;}\n#hh-ib .tk-mcq{background:#EEF4F0;color:#2F6A4E;} #hh-ib .tk-tf{background:#FBF1DA;color:#8A5A10;} #hh-ib .tk-open{background:#F6E9EE;color:#8A1538;} #hh-ib .tk-order{background:#E8EEF5;color:#1F4E79;} #hh-ib .tk-pair{background:#EFE8F5;color:#5B3A7A;} #hh-ib .tk-poll{background:#F5F1E8;color:#6B5A44;}\n#hh-ib .tk-d{background:#F5F1E8;color:#6B5A44;}\n#hh-ib .e2-typ{background:#F5F1E8;border-radius:14px;padding:4px;}\n#hh-ib .e2-typ button{font-weight:800;}\n#hh-ib .e2-typ button.on{background:#fff;color:#5E0E26;box-shadow:0 2px 6px rgba(61,9,24,.1);outline:1.5px solid #B8924A;}\n#hh-ib .e2-qt textarea{border:2px solid #E7DAC0 !important;background:#FFFDF8 !important;border-radius:14px !important;font-weight:800;}\n#hh-ib .e2-qt textarea:focus{border-color:#B8924A !important;}\n#hh-ib .e2-lab{color:#8A6D2E;font-weight:900;}\n#hh-ib .e2-an{background:#fff;color:#2A1A0E;border:2px solid #E7DAC0;min-height:58px;}\n#hh-ib .e2-an i{background:var(--a);color:#fff;}\n#hh-ib .e2-an input{color:#2A1A0E;border-bottom:1.5px solid #EDE3CF;}\n#hh-ib .e2-an input::placeholder{color:#B8AE9A;}\n#hh-ib .e2-an .ok{border-color:#D9D2C7;}\n#hh-ib .e2-an .ok:hover{border-color:#2F6A4E;color:#2F6A4E;}\n#hh-ib .e2-an.cr{border-color:#2F6A4E;background:#EEF4F0;box-shadow:none;}\n#hh-ib .e2-an.cr .ok{background:#2F6A4E;color:#fff;border-color:#2F6A4E;}\n#hh-ib .e2-df{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:12px;font-family:Cairo;font-weight:900;font-size:13.5px;color:#8A6D2E;}\n#hh-ib .e2-df button{height:34px;padding:0 14px;border-radius:99px;border:1.5px solid #E7DAC0;background:#fff;font-family:Cairo;font-weight:800;font-size:13px;color:#3D2A16;cursor:pointer;}\n#hh-ib .e2-df button.on{background:#5E0E26;border-color:#5E0E26;color:#F5E6C4;}\n#hh-ib .e2-df small{font-family:Cairo;font-weight:700;color:#8A7A63;font-size:12px;}\n#hh-ib .e2-tv{border:2px solid #B8924A;background:#F5F1E8;}\n#hh-ib .e2-tv .q{margin:8px 8px 6px;background:#fff;border:1.5px solid #B8924A;border-radius:10px;}\n#hh-ib .e2-chk h4{font-weight:900;}\n#hh-ib .e2-ln{font-family:Cairo;font-weight:700;font-size:13px;}\n#hh-ib .e2-sum div{background:#F5F1E8;}\n\n/* zzzzzzce: زر الحفظ */\n#hh-ib .e2-svs{display:inline-flex;align-items:center;gap:6px;font-family:Cairo;font-weight:800;font-size:12.5px;white-space:nowrap;}\n#hh-ib .e2-svs i{width:9px;height:9px;border-radius:50%;display:block;background:#2F6A4E;}\n#hh-ib .e2-svs.ok{color:#2F6A4E;} #hh-ib .e2-svs.dirty{color:#8A5A10;} #hh-ib .e2-svs.dirty i{background:#C98A1B;} #hh-ib .e2-svs.busy{color:#8A5A10;} #hh-ib .e2-svs.busy i{background:#E6CE8E;} #hh-ib .e2-svs.err{color:#B3261E;} #hh-ib .e2-svs.err i{background:#B3261E;}\n#hh-ib .e2-svb{height:40px;border-radius:12px;padding:0 16px;font-family:Cairo;font-weight:900;font-size:14px;display:inline-flex;align-items:center;justify-content:center;gap:7px;white-space:nowrap;border:2px solid;cursor:pointer;transition:background .2s,box-shadow .2s;}\n#hh-ib .e2-svb.dirty{background:linear-gradient(135deg,#B8924A,#8A6D2E);color:#fff;border-color:#8A6D2E;box-shadow:0 0 0 4px rgba(184,146,74,.25);}\n#hh-ib .e2-svb.busy{background:#FBF1E0;color:#8A5A10;border-color:#E6CE8E;cursor:default;}\n#hh-ib .e2-svb.ok{background:#EEF4F0;color:#2F6A4E;border-color:#CFE3D7;}\n#hh-ib .e2-svb.err{background:#FCEEEC;color:#B3261E;border-color:#F2C4BD;}\n#hh-ib .e2-svb kbd{font-family:Cairo;font-size:10.5px;background:rgba(255,255,255,.25);border-radius:5px;padding:0 5px;}\n#hh-ib .e2-svb .spn{width:15px;height:15px;border:2.5px solid #E6CE8E;border-top-color:#8A5A10;border-radius:50%;animation:hhIbSpn .8s linear infinite;}\n@keyframes hhIbSpn{to{transform:rotate(360deg)}}\n#hh-ib .e2-stk .e2-svb{flex:1;height:44px;}\n@media (max-width:900px){ #hh-ib .e2-tb .e2-svs{display:none;} #hh-ib .e2-tb #ib-save{display:none;} }\n";
window.hhIbGrade=function(g){ _ib.grade=g; _ib.rf={u:'',k:'',q:''}; render(); };
window.hhIbReadyShow=function(rid){ var g=buildReady(rid); if(!g) return; screenRun(g); };
window.hhIbReadyLive=function(rid){ var g=buildReady(rid); if(!g) return; if(!canUse()){ toastX('التشغيل المباشر بحساب المعلم، سجّل الدخول أولاً','info'); return; } g.mode='live'; liveRun(g); };
window.hhIbReadyCopy=function(rid){
  if(!canUse()){ toastX('النسخ إلى «ألعابي» بحساب المعلم، سجّل الدخول أولاً','info'); return; }
  var g=buildReady(rid); if(!g) return; if(!(g.questions||[]).length&&g.extras) g.questions=g.extras; delete g.extras; delete g._ready; g.id=newId('g'); g.status='draft'; g.createdAt=Date.now(); g.questions.forEach(function(q){ delete q.srcCat; delete q.srcIdx; delete q._d; q.id=newId('q'); });
  _ib.games.push(g); persist(g,true); toastX('نُسخت إلى ألعابك، عدّلها كما تشاء','success'); hhIbEdit(g.id);
};
window.hhIbReadyEdit=function(rid){ if(!isAdm()){ toastX('تعديل الأصل للمدير فقط','error'); return; } var g=buildReady(rid); if(!g) return; _ib.readyGame=g; _ib.gameId=g.id; _ib.qIdx=0; _ib.mtab='edit'; _ib.view='editor'; render(); var o=document.getElementById('hh-ib'); if(o) o.scrollTop=0; };
window.hhIbReadyPublish=async function(rid){
  if(!isAdm()) return; var R=readyList().filter(function(x){ return x.rid===rid; })[0]; var key=R&&R.tfKey; if(!key) return;
  if(_ib.readyGame&&_ib.readyGame._ready&&_ib.readyGame._ready.tfKey===key) flushReady();
  _ib.ready.tf[key]=_ib.ready.tf[key]||{items:clone(tfItems(key))}; _ib.ready.tf[key].published=true;
  if(_ib.readyGame&&_ib.readyGame._ready) _ib.readyGame._ready.published=true;
  var ok=await saveReadyDoc(); toastX(ok?'نُشرت العبارات لكل المعلمين':'حُفظ النشر على جهازك فقط، تعذّرت المزامنة',ok?'success':'error'); render();
};
window.hhIbReadyNew=function(){
  if(!isAdm()) return; var c={ id:newId('c'), grade:_ib.grade||'g7t1', title:'لعبة جاهزة جديدة', mode:'screen', screenTpl:'boxes', settings:defSettings('race'), questions:[] };
  _ib.ready.custom.push(c); saveReadyDoc(); hhIbReadyEdit('c:'+c.id); addQuestion();
};
window.hhIbReadyDel=function(rid){ if(!isAdm()) return; var id=rid.replace(/^c:/,''); var arr=_ib.ready.custom; var i=arr.map(function(c){ return c.id; }).indexOf(id); if(i<0) return; if(!confirm('حذف «'+(arr[i].title||'')+'» من الألعاب الجاهزة لكل المعلمين؟')) return; arr.splice(i,1); saveReadyDoc(); render(); };
/* حفظ تعديلات المدير في المصدر */
function scheduleReadySave(g){ clearTimeout(_ib.readySaveT); _ib.readySaveT=setTimeout(function(){ readySave(g); },1200); }
function flushReady(){ if(_ib.readySaveT&&_ib.readyGame){ clearTimeout(_ib.readySaveT); _ib.readySaveT=null; readySave(_ib.readyGame); } }
function readySave(g){
  _ib.readySaveT=null; var M=g._ready; if(!M) return;
  if(!isAdm()){ markSaved(true,'admin'); return; }
  if(M.kind==='mcq'||M.kind==='open'){
    var touched=[];
    M.cats.forEach(function(cat){
      var orig=(qdb()[cat]||[]).slice();
      var mine=g.questions.filter(function(q){ return (q.srcCat||M.defCat)===cat; });
      var arr=mine.map(function(q){ var o=(q.srcIdx!=null&&orig[q.srcIdx])?clone(orig[q.srcIdx]):{diff:'med'};
        o.q=String(q.q||'').trim();
        if(M.kind==='mcq'){ var ops=(q.opts||[]).map(function(x){ return String(x||'').trim(); }); var a=ops[(q.correct||[0])[0]]||''; o.a=a; o.opts=ops.filter(Boolean); }
        else { var p=(q.pts||[]).map(function(x){ return String(x||'').trim(); }).filter(Boolean); o.a=p.length>1?p.map(function(x,i){ return (i+1)+'- '+x; }).join(' '):(p[0]||''); if(o.opts) delete o.opts; }
        if(q.img) o.img=q.img; else if(q._imgRemoved) delete o.img;
        return o; }).filter(function(o){ return o.q; });
      if(JSON.stringify(arr)!==JSON.stringify(orig)){ qdb()[cat]=arr; touched.push(cat); }
      var k=0; g.questions.forEach(function(q){ if((q.srcCat||M.defCat)===cat && String(q.q||'').trim()){ q.srcCat=cat; q.srcIdx=k++; } });
    });
    if(!touched.length){ markSaved(); return; }
    try{ touched.forEach(function(cat){ if(typeof saveAdminQuestion_persist==='function') saveAdminQuestion_persist(cat); else if(typeof saveQDBToCloud==='function') saveQDBToCloud(); }); markSaved(); }
    catch(e){ markSaved(true,(e&&e.code)); }
    try{ if(typeof buildCatSelect==='function') buildCatSelect(); }catch(e){}
  } else if(M.kind==='tf'){
    var items=g.questions.filter(function(q){ return String(q.q||'').trim(); }).map(function(q){ return {s:String(q.q).trim(), v:(q.correct||[0])[0]===0, fix:q.note||''}; });
    _ib.ready.tf[M.tfKey]={ items:items, published:!!M.published };
    saveReadyDoc();
  } else if(M.kind==='custom'){
    var c=(_ib.ready.custom||[]).filter(function(x){ return x.id===M.customId; })[0]; if(!c) return;
    c.title=g.title; c.questions=clone(g.questions); c.mode=g.mode; c.screenTpl=g.screenTpl; c.settings=clone(g.settings||{}); c.updatedAt=Date.now();
    saveReadyDoc();
  }
}

/* ── زر «إبداع» في الشاشة الرئيسة والتنقل السفلي ── */
var IB_ICON='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.2 5.3 5.8.5-4.4 3.8 1.3 5.7L12 14.3 7.1 17.3l1.3-5.7L4 7.8l5.8-.5z"/><path d="M5 21l2-2M19 21l-2-2"/></svg>';
function injectEntry(){
  try{
    // شريط الشاشة الرئيسة: زر إبداع مستقل بجانب البرامج التربوية (لكلٍّ بابه)
    if(!document.getElementById('hh-ib-entry')){
      var ref=document.querySelector('.hh-crown-btn[onclick="hhOpenLeaderPrograms()"]') || document.querySelector('.hh-crown-btn[onclick="hhSchoolEntry()"]');
      if(ref){ var b=document.createElement('button'); b.className='hh-crown-btn'; b.id='hh-ib-entry'; b.setAttribute('onclick','hhIbOpen()'); b.innerHTML=IB_ICON+'<span>الإبداع</span>'; ref.insertAdjacentElement('afterend',b); }
    }
    // شريط التنقل السفلي
    if(!document.getElementById('hh-ib-nav')){
      var nav=document.querySelector('.hh-nav-item[onclick="hhOpenLeaderPrograms()"]');
      if(nav){ var n=nav.cloneNode(true); n.id='hh-ib-nav'; n.setAttribute('onclick','hhIbOpen()'); var sp=n.querySelector('.hh-nav-label,span:last-child'); if(sp) sp.textContent='الإبداع'; var ic=n.querySelector('.hh-nav-icon'); if(ic) ic.innerHTML=IB_ICON; nav.insertAdjacentElement('afterend',n); }
    }
  }catch(e){}
}
var _ibTries=0; var _ibIv=setInterval(function(){ injectEntry(); if((document.getElementById('hh-ib-entry')&&document.getElementById('hh-ib-nav')) || ++_ibTries>30) clearInterval(_ibIv); }, 800);
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', injectEntry); else injectEntry();


/* ═══ zzzzzzci، الإبداع المختصر: بطاقات قليلة الكلام، تصفية واحدة، مسار مختصر، وقائمة ألعابي ═══ */
function ib6Hex(bg){ var m=String(bg||'').match(/#[0-9a-f]{6}/i); return m?m[0]:'#8A1538'; }
function ib4Tabs(){
  var c={rack:TEMPLATES.filter(function(t){return t.ready;}).length, ready:ib5Count(), mine:_ib.games.length};
  return '<div class="tabs ib2-seg ib4-seg">'+[['rack',ico('grid',15)+' القوالب'],['ready',ico('star',15)+' جاهزة'],['mine',ico('folder',15)+' ألعابي']].map(function(t){ return '<button class="'+(_ib.view===t[0]?'on':'')+'" onclick="hhIbView(\''+t[0]+'\')">'+t[1]+' <em>'+c[t[0]]+'</em></button>'; }).join('')+'</div>';
}
function tplCard(t){
  var md=t.kind==='live'?ico('phone',13)+' على الأجهزة':t.kind==='screen'?ico('monitor',13)+' على الشاشة':'قريباً';
  if(!t.ready) md='قريباً';
  return '<button type="button" class="ib6-tp'+(t.ready?'':' off')+'" style="--c:'+ib6Hex(t.bg)+'" '+(t.ready?'onclick="hhIbCreate(\''+t.id+'\')"':'disabled')+' title="'+esc(t.desc||'')+'"><span class="ic">'+ico(t.ico,24,2)+'</span><span class="tx"><b>'+esc(t.name)+'</b><small>'+md+'</small></span><span class="pl">'+(t.ready?ico('plus',16,2.6):'قريباً')+'</span></button>';
}
function ib4Rack(){
  var m=_ib.mode||'all'; if(m==='live'||m==='screen'||m==='all'){} else m='all';
  var seg='<div class="ib6-bar"><div class="ib6-seg">'+[['all','الكل',''],['screen','على الشاشة','monitor'],['live','على الأجهزة','phone']].map(function(x){ return '<button type="button" class="'+(m===x[0]?'on':'')+'" onclick="hhIbMode4(\''+x[0]+'\')">'+(x[2]?ico(x[2],15):'')+x[1]+'</button>'; }).join('')+'</div></div>';
  var order=m==='screen'?['screen']:m==='live'?['live']:['screen','live','async'];
  var L=[]; order.forEach(function(k){ TEMPLATES.forEach(function(t){ if(t.kind===k) L.push(t); }); });
  return seg+'<div class="ib6-grid">'+L.map(tplCard).join('')+'</div>';
}
function ib5Path(){
  var G=_ib.grade||'g7t1';
  function sel(label,opts,on){ return '<label class="ib6-pp"><select aria-label="'+label+'"'+(on?' onchange="'+on+'"':'')+'>'+opts.map(function(o){ return '<option value="'+o[0]+'"'+(o[2]?' selected':'')+(o[3]?' disabled':'')+'>'+o[1]+'</option>'; }).join('')+'</select>'+'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>'+'</label>'; }
  var st=sel('المرحلة',[['p','الابتدائية، قريباً',0,1],['m','الإعدادية',1],['s','الثانوية، قريباً',0,1]]);
  var sb=sel('المادة',IB5_SUB.map(function(x){ var on=x[0]==='soc'; return [x[0],x[1]+(on?'':'، قريباً'),on,!on]; }));
  var gr=sel('الصف',[['7','السابع',1],['8','الثامن، قريباً',0,1],['9','التاسع، قريباً',0,1]]);
  var tm=sel('الفصل',[['g7t1','الفصل الأول',G==='g7t1'],['g7t2','الفصل الثاني، قريباً',0,1]],"hhIbGrade(this.value)");
  return '<div class="ib6-path">'+st+'<span>›</span>'+sb+'<span>›</span>'+gr+'<span>›</span>'+tm+'</div>';
}
function ib6Btns(R){
  var so=(R.kind==='open'||R.kind==='pairs'||R.kind==='mix');
  return '<button class="ib6-b p" onclick="hhIbReadyShow(\''+R.rid+'\')">'+ico('monitor',15)+' على الشاشة</button>'+(so?'':'<button class="ib6-b" onclick="hhIbReadyLive(\''+R.rid+'\')">'+ico('phone',15)+' على الأجهزة</button>');
}
function ib5CompCard(items,adm){
  var mode=_ib.cmode==='mix'&&items.some(function(r){ return r.kind==='mix'; })?'mix':'mcq';
  var R=items.filter(function(r){ return r.kind===mode; })[0]||items[0], G=_ib.grade||'g7t1', nu=(UNITS[G]||[]).length;
  var seg=items.length>1?'<div class="ib6-ty">'+items.map(function(r){ return '<button type="button" class="'+(r===R?'on':'')+'" aria-pressed="'+(r===R)+'" onclick="hhIbCMode(\''+r.kind+'\')">'+(r.kind==='mix'?'منوّعة':'اختيار من متعدد')+'</button>'; }).join('')+'</div>':'';
  var txt=(R.title+' '+R.d+' الشاملة').toLowerCase();
  return '<div class="ib4-c ib6-u all" data-k="'+items.map(function(r){ return r.kind; }).join(' ')+'" data-u="all" data-t="'+esc(txt)+'"><div class="h"><span class="no">'+ico('award',20,2)+'</span><div class="t"><b>المراجعة الشاملة</b><small>'+nu+' وحدات، '+R.n+' '+(R.n>2&&R.n<11?'أسئلة':'سؤالاً')+'</small></div></div>'+seg
    +'<div class="ac">'+ib6Btns(R)+'<button class="ib4-more" aria-label="خيارات أخرى" onclick="hhIbMenu(event,this)">'+ico('more',18)+'</button></div><div class="ib4-menu" hidden>'+ib5Menu(R,adm)+'</div></div>';
}
function ib5UnitCard(gr,adm){
  var u=gr.u, it=gr.items; _ib.csel=_ib.csel||{}; var R=it.filter(function(r){ return r.rid===_ib.csel[u.k]; })[0]||it[0];
  var ty=it.length>1?'<div class="ib6-ty">'+it.map(function(r){ return '<button type="button" class="'+(r===R?'on':'')+'" aria-pressed="'+(r===R)+'" onclick="hhIbCSel(\''+u.k+'\',\''+r.rid+'\')">'+IB5_SHORT[r.kind]+' <em>'+r.n+'</em>'+(r.draft?' <small>مسودة</small>':'')+'</button>'; }).join('')+'</div>':'';
  var txt=(u.short+' '+u.d+' '+it.map(function(r){ return r.title+' '+(IB4_TYPES[r.kind]||''); }).join(' ')).toLowerCase();
  return '<div class="ib4-c ib6-u" data-k="'+it.map(function(r){ return r.kind; }).join(' ')+'" data-u="'+u.k+'" data-t="'+esc(txt)+'"><div class="h"><span class="no">'+(gr.i+1)+'</span><div class="t"><b>'+esc(u.short)+'</b><small>'+ib4Count(R)+'</small></div></div>'+ty
    +'<div class="ac">'+ib6Btns(R)+'<button class="ib4-more" aria-label="خيارات أخرى" onclick="hhIbMenu(event,this)">'+ico('more',18)+'</button></div><div class="ib4-menu" hidden>'+ib5Menu(R,adm)+'</div></div>';
}
function renderReady(){
  var adm=isAdm(), L=readyList(), GR=ib5Groups(L);
  var top='<div class="ib6-bar">'+ib5Path()+(adm?'<button class="ib6-b p s" onclick="hhIbReadyNew()">'+ico('plus',14)+' لعبة جاهزة جديدة</button>':'')+'</div>';
  if(!L.length) return top+'<div class="rl-soon">ألعاب هذا الصف قيد الإعداد</div>';
  _ib.rf={u:'',k:'',q:''};
  var cards=(GR.comp.length?ib5CompCard(GR.comp,adm):'')+GR.units.map(function(g){ return ib5UnitCard(g,adm); }).join('')+GR.custom.map(function(R){ return ib4Card(R,adm); }).join('');
  return top+'<div class="ib6-units" id="ib4-grid">'+cards+'</div>';
}
var IB6_SICO={boxes:'box',show:'tv',wheel:'wheel',flip:'flip',tfs:'check',match:'link',memory:'grid',order:'sort'};
function ib4MineCard(g){
  var n=(g.questions||[]).length, st=g.status||'draft', scr=modeOf(g)==='screen';
  var T=TEMPLATES.filter(function(x){ return x.id===g.template; })[0]||{};
  var c=scr?'#8A1538':ib6Hex(T.bg), ic=scr?(IB6_SICO[g.screenTpl]||'tv'):(T.ico||'bolt');
  var title=ib4Title(g.title), tn=tplName(g)||(scr?'على الشاشة':'على الأجهزة');
  var prim=scr?'<button class="ib6-b p" '+(n?'':'disabled')+' onclick="hhIbShow(\''+g.id+'\')">'+ico('monitor',14)+' اعرض</button>'
             :'<button class="ib6-b p" '+(n?'':'disabled')+' onclick="hhIbRun(\''+g.id+'\')">'+ico('play',14)+' شغّل</button>';
  var menu='<span class="ib4-mi" onclick="hhIbMineDo(event,\'dup\',\''+g.id+'\')">'+ico('copy',15)+' نسخ</span><span class="ib4-mi d" onclick="hhIbMineDo(event,\'del\',\''+g.id+'\')">'+ico('x',15)+' حذف</span>';
  return '<div class="ib4-c ib4-mc ib6-r" style="--c:'+c+'" data-m="'+(scr?'screen':'live')+'" data-t="'+esc((title+' '+tn).toLowerCase())+'"><span class="ic">'+ico(ic,20,2)+'</span><div class="t"><b>'+esc(title)+'</b><small>'+esc(tn)+'، '+ib4Qn(n)+(st==='ready'?'':'، مسودة')+'</small></div>'
    +prim+'<button class="ib6-i" aria-label="تعديل" onclick="hhIbEdit(\''+g.id+'\')">'+ico('edit',16)+'</button><button class="ib4-more ib6-i" aria-label="خيارات أخرى" onclick="hhIbMenu(event,this)">'+ico('more',18)+'</button><div class="ib4-menu" hidden>'+menu+'</div></div>';
}
function renderMine(){
  var games=_ib.games.slice().sort(function(a,b){ return (b.updatedAt||0)-(a.updatedAt||0); });
  var F=_ib.mf=_ib.mf||{m:'',q:''};
  var sess=_ib.sessions.filter(function(s){ return s.state!=='ended'; });
  var html='';
  if(games.length>5) html+='<div class="ib6-bar"><label class="ib6-q">'+ico('search',15)+'<input type="search" placeholder="ابحث" value="'+esc(F.q)+'" oninput="hhIbMF(\'q\',this.value)" aria-label="بحث في ألعابي"></label></div>';
  if(sess.length) html+='<div class="ib6-list ib6-sess">'+sess.map(function(s){
    return '<div class="ib6-r"><span class="ic live">'+ico('play',18,2)+'</span><div class="t"><b>'+esc(ib4Title(s.title))+'</b><small>'+(s.state==='paused'?'متوقفة':s.state==='lobby'?'في الانتظار':'جارية')+'، السؤال '+((s.qIndex||0)+1)+' من '+(s.total||'؟')+'، الرمز <bdi dir="ltr">'+esc(s.code)+'</bdi></small></div><button class="ib6-b p" onclick="hhLiveResume(\''+esc(s.code)+'\')">'+ico('play',14)+' أكمل</button><button class="ib6-b" onclick="hhLiveEndSession(\''+esc(s.code)+'\')">إنهاء</button></div>'; }).join('')+'</div>';
  if(!games.length) html+='<div class="ib6-empty"><b>لا ألعاب بعد</b><button class="ib6-b p" onclick="hhIbView(\'rack\')">'+ico('plus',15)+' لعبة جديدة</button></div>';
  else html+='<div class="ib6-list" id="ib4-mgrid">'+games.map(ib4MineCard).join('')+'</div><div class="rl-soon" id="ib4-mnone" hidden>لا ألعاب تطابق بحثك.</div>';
  setTimeout(ib4MFilter,0);
  return html;
}
var IB6CSS=[
'#hh-ib.ib2 .ib6-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:0 0 18px;}',
'#hh-ib.ib2 .ib6-seg{display:flex;background:#fff;border:1px solid #E7DCC6;border-radius:12px;padding:3px;}',
'#hh-ib.ib2 .ib6-seg button{border:0;background:none;color:#7A6A54;font-family:Cairo,sans-serif;font-weight:800;font-size:13.5px;padding:7px 14px;border-radius:9px;display:flex;align-items:center;gap:6px;cursor:pointer;}',
'#hh-ib.ib2 .ib6-seg button.on{background:#5E0E26;color:#fff;}',
'#hh-ib.ib2 .ib6-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;}',
'#hh-ib.ib2 .ib6-tp{background:#fff;border:1px solid #E7DCC6;border-radius:14px;padding:14px;display:flex;align-items:center;gap:12px;text-align:start;color:#3D0918;font-family:Cairo,sans-serif;cursor:pointer;transition:border-color .15s,transform .15s;min-width:0;}',
'#hh-ib.ib2 .ib6-tp:hover{border-color:#B8924A;transform:translateY(-2px);}',
'#hh-ib.ib2 .ib6-tp .ic{width:48px;height:48px;border-radius:12px;display:grid;place-items:center;flex-shrink:0;background:color-mix(in srgb,var(--c) 12%,#fff);color:var(--c);}',
'#hh-ib.ib2 .ib6-tp .tx{min-width:0;}',
'#hh-ib.ib2 .ib6-tp b{display:block;font-size:15px;font-weight:900;line-height:1.35;}',
'#hh-ib.ib2 .ib6-tp small{display:flex;align-items:center;gap:5px;font-size:12px;font-weight:700;color:#7A6A54;}',
'#hh-ib.ib2 .ib6-tp .pl{margin-inline-start:auto;min-width:30px;height:30px;border-radius:9px;background:#FAF6EE;display:grid;place-items:center;color:#7A6A54;flex-shrink:0;font-size:11px;font-weight:900;padding:0 6px;}',
'#hh-ib.ib2 .ib6-tp:hover .pl{background:#5E0E26;color:#fff;}',
'#hh-ib.ib2 .ib6-tp.off{opacity:.55;cursor:default;}',
'#hh-ib.ib2 .ib6-tp.off:hover{transform:none;border-color:#E7DCC6;} #hh-ib.ib2 .ib6-tp.off:hover .pl{background:#FAF6EE;color:#7A6A54;}',
'#hh-ib.ib2 .ib6-path{display:flex;align-items:center;gap:6px;flex-wrap:wrap;background:#fff;border:1px solid #E7DCC6;border-radius:12px;padding:6px;}',
'#hh-ib.ib2 .ib6-path > span{color:#7A6A54;font-weight:800;}',
'#hh-ib.ib2 .ib6-pp{position:relative;display:inline-flex;align-items:center;background:#FAF6EE;border-radius:9px;}',
'#hh-ib.ib2 .ib6-pp select{appearance:none;-webkit-appearance:none;border:0;background:transparent;font-family:Cairo,sans-serif;font-weight:800;font-size:13.5px;color:#3D0918;padding:6px 12px 6px 28px;cursor:pointer;}',
'#hh-ib.ib2 .ib6-pp svg{position:absolute;left:10px;pointer-events:none;color:#7A6A54;}',
'#hh-ib.ib2 .ib6-units{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;}',
'#hh-ib.ib2 .ib6-u{position:relative;background:#fff;border:1px solid #E7DCC6;border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:12px;}',
'#hh-ib.ib2 .ib6-u .h{display:flex;align-items:center;gap:12px;}',
'#hh-ib.ib2 .ib6-u .no{width:40px;height:40px;border-radius:11px;background:#FAF6EE;display:grid;place-items:center;font-weight:900;font-size:17px;color:#8A1538;flex-shrink:0;font-family:Cairo,sans-serif;}',
'#hh-ib.ib2 .ib6-u .t{min-width:0;} #hh-ib.ib2 .ib6-u b{display:block;font-size:15.5px;font-weight:900;color:#3D0918;line-height:1.35;} #hh-ib.ib2 .ib6-u small{font-size:12px;font-weight:700;color:#7A6A54;}',
'#hh-ib.ib2 .ib6-u.all{grid-column:1/-1;flex-direction:row;align-items:center;flex-wrap:wrap;background:#FBF1DA;border-color:#B8924A;}',
'#hh-ib.ib2 .ib6-u.all .no{background:#fff;color:#B8924A;}',
'#hh-ib.ib2 .ib6-u.all .ac{margin-inline-start:auto;min-width:320px;}',
'#hh-ib.ib2 .ib6-ty{display:flex;gap:6px;flex-wrap:wrap;}',
'#hh-ib.ib2 .ib6-ty button{border:1px solid #E7DCC6;background:#fff;color:#7A6A54;font-family:Cairo,sans-serif;font-weight:800;font-size:12px;padding:3px 10px;border-radius:8px;cursor:pointer;}',
'#hh-ib.ib2 .ib6-ty button em{font-style:normal;font-weight:900;color:#3D0918;} #hh-ib.ib2 .ib6-ty button.on{border-color:#8A1538;background:#FBF1DA;color:#3D0918;}',
'#hh-ib.ib2 .ib6-u .ac,#hh-ib.ib2 .ib6-r{display:flex;gap:8px;align-items:center;}',
'#hh-ib.ib2 .ib6-b{flex:1;height:38px;border-radius:10px;border:1px solid #E7DCC6;background:#fff;color:#3D0918;font-family:Cairo,sans-serif;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center;gap:6px;cursor:pointer;padding:0 12px;white-space:nowrap;}',
'#hh-ib.ib2 .ib6-b.p{background:#5E0E26;border-color:#5E0E26;color:#fff;} #hh-ib.ib2 .ib6-b[disabled]{opacity:.45;cursor:default;} #hh-ib.ib2 .ib6-b.s{flex:0 0 auto;height:36px;}',
'#hh-ib.ib2 .ib6-u .ib4-more,#hh-ib.ib2 .ib6-i{width:38px;height:38px;flex:0 0 38px;border-radius:10px;border:1px solid #E7DCC6;background:#fff;color:#7A6A54;display:grid;place-items:center;cursor:pointer;padding:0;}',
'#hh-ib.ib2 .ib6-u .ib4-menu,#hh-ib.ib2 .ib6-r .ib4-menu{position:absolute;left:12px;bottom:56px;z-index:5;}',
'#hh-ib.ib2 .ib6-list{background:#fff;border:1px solid #E7DCC6;border-radius:14px;overflow:visible;margin-bottom:16px;}',
'#hh-ib.ib2 .ib6-r{position:relative;padding:12px 14px;}',
'#hh-ib.ib2 .ib6-r + .ib6-r{border-top:1px solid #E7DCC6;}',
'#hh-ib.ib2 .ib6-r .ic{width:40px;height:40px;border-radius:11px;display:grid;place-items:center;flex-shrink:0;background:color-mix(in srgb,var(--c,#8A1538) 12%,#fff);color:var(--c,#8A1538);}',
'#hh-ib.ib2 .ib6-r .ic.live{background:#EEF4F0;color:#2F6A4E;}',
'#hh-ib.ib2 .ib6-r .t{flex:1;min-width:0;} #hh-ib.ib2 .ib6-r b{display:block;font-size:15px;font-weight:900;color:#3D0918;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;} #hh-ib.ib2 .ib6-r small{font-size:12px;font-weight:700;color:#7A6A54;}',
'#hh-ib.ib2 .ib6-r .ib6-b{flex:0 0 auto;height:36px;}',
'#hh-ib.ib2 .ib6-r .ib4-menu{top:52px;bottom:auto;}',
'#hh-ib.ib2 .ib6-empty{background:#fff;border:1px dashed #E7DCC6;border-radius:14px;padding:28px;display:flex;flex-direction:column;align-items:center;gap:12px;font-family:Cairo,sans-serif;color:#7A6A54;}',
'#hh-ib.ib2 .ib6-empty .ib6-b{flex:0 0 auto;}',
'#hh-ib.ib2 .ib6-q{display:flex;align-items:center;gap:6px;background:#fff;border:1px solid #E7DCC6;border-radius:10px;padding:0 10px;height:38px;color:#7A6A54;} #hh-ib.ib2 .ib6-q input{border:0;outline:0;background:transparent;font-family:Cairo,sans-serif;font-weight:700;font-size:13.5px;}',
'body.dark-mode #hh-ib.ib2 .ib6-tp,body.dark-mode #hh-ib.ib2 .ib6-u,body.dark-mode #hh-ib.ib2 .ib6-list,body.dark-mode #hh-ib.ib2 .ib6-seg,body.dark-mode #hh-ib.ib2 .ib6-path,body.dark-mode #hh-ib.ib2 .ib6-b,body.dark-mode #hh-ib.ib2 .ib6-i,body.dark-mode #hh-ib.ib2 .ib6-u .ib4-more,body.dark-mode #hh-ib.ib2 .ib6-ty button,body.dark-mode #hh-ib.ib2 .ib6-empty,body.dark-mode #hh-ib.ib2 .ib6-q{background:#22121A;border-color:#3E2C24;color:#F5E6C4;}',
'body.dark-mode #hh-ib.ib2 .ib6-tp b,body.dark-mode #hh-ib.ib2 .ib6-u b,body.dark-mode #hh-ib.ib2 .ib6-r b,body.dark-mode #hh-ib.ib2 .ib6-ty button em,body.dark-mode #hh-ib.ib2 .ib6-pp select{color:#F5E6C4;}',
'body.dark-mode #hh-ib.ib2 .ib6-tp small,body.dark-mode #hh-ib.ib2 .ib6-u small,body.dark-mode #hh-ib.ib2 .ib6-r small{color:#B8A68A;}',
'body.dark-mode #hh-ib.ib2 .ib6-tp .ic,body.dark-mode #hh-ib.ib2 .ib6-r .ic{background:color-mix(in srgb,var(--c,#8A1538) 22%,#22121A);color:#F5E6C4;}',
'body.dark-mode #hh-ib.ib2 .ib6-tp .pl,body.dark-mode #hh-ib.ib2 .ib6-u .no,body.dark-mode #hh-ib.ib2 .ib6-pp{background:#2A1720;color:#E6CE8E;}',
'body.dark-mode #hh-ib.ib2 .ib6-u.all,body.dark-mode #hh-ib.ib2 .ib6-ty button.on{background:#3A2A10;border-color:#C9A35A;}',
'body.dark-mode #hh-ib.ib2 .ib6-seg button.on,body.dark-mode #hh-ib.ib2 .ib6-b.p{background:#8A1538;border-color:#8A1538;color:#fff;}',
'body.dark-mode #hh-ib.ib2:not(.ib-editing),body.dark-mode #hh-ib.ib2:not(.ib-editing) #ib-body{background:#160A0F !important;}',
'body.dark-mode #hh-ib.ib2:not(.ib-editing) .gvh-tabs button.on{background:#160A0F !important;color:#F5E6C4 !important;}',
'body.dark-mode #hh-ib.ib2 .rl-soon,body.dark-mode #hh-ib.ib2 .ib6-empty b{color:#B8A68A;}',
'@media (max-width:1000px){ #hh-ib.ib2 .ib6-grid{grid-template-columns:repeat(2,minmax(0,1fr));} #hh-ib.ib2 .ib6-units{grid-template-columns:repeat(2,minmax(0,1fr));} }',
'@media (max-width:640px){',
' #hh-ib.ib2 .ib6-grid{gap:8px;}',
' #hh-ib.ib2 .ib6-tp{flex-direction:column;align-items:center;text-align:center;padding:12px 8px;gap:8px;}',
' #hh-ib.ib2 .ib6-tp .pl{display:none;} #hh-ib.ib2 .ib6-tp b{font-size:13px;} #hh-ib.ib2 .ib6-tp small{justify-content:center;font-size:11px;}',
' #hh-ib.ib2 .ib6-units{grid-template-columns:1fr;} #hh-ib.ib2 .ib6-u.all{flex-direction:column;align-items:stretch;} #hh-ib.ib2 .ib6-u.all .ac{min-width:0;margin:0;}',
' #hh-ib.ib2 .ib6-seg{width:100%;} #hh-ib.ib2 .ib6-seg button{flex:1;justify-content:center;padding:7px 6px;font-size:12.5px;}',
' #hh-ib.ib2 .ib6-r{flex-wrap:wrap;} #hh-ib.ib2 .ib6-r .t{flex-basis:calc(100% - 52px);} #hh-ib.ib2 .ib6-r .ib6-b{flex:1;}',
'}',
'@media (prefers-reduced-motion:reduce){ #hh-ib.ib2 .ib6-tp{transition:none;} }'
].join('\n');

/* ═══ zzzzzzco، الجاهزة: تصنيفات يضيفها المدير، مسار مختصر، بطاقات متساوية، والمسودة نقطة ذهبية ═══ */
var IB7_PAL=['#1F4E79','#2F6A4E','#8A1538','#B8924A','#5A3A8E','#0F6E56','#B5801F'];
function ib7Cats(){ _ib.ready=_ib.ready||{}; return Array.isArray(_ib.ready.cats)?_ib.ready.cats:[]; }
function ib7CatGames(id){ return (_ib.ready.custom||[]).filter(function(c){ return c.cat===id; }); }
function ib7CustomR(c){ return {rid:'c:'+c.id,sec:'custom',kind:'custom',title:c.title||'لعبة جاهزة',n:(c.questions||[]).length,c:'linear-gradient(135deg,#5E0E26,#3D0918)',ic:'star',d:c.desc||'',custom:c}; }
var _ib5Count0=ib5Count;
ib5Count=function(){ var n=_ib5Count0(); ib7Cats().forEach(function(k){ n+=ib7CatGames(k.id).length; }); return n; };
var _ib5Groups0=ib5Groups;
ib5Groups=function(L){ var g=_ib5Groups0(L); g.custom=g.custom.filter(function(R){ return !(R.custom&&R.custom.cat); }); return g; };
function ib7Chips(adm){
  var cats=ib7Cats(); if(!cats.length&&!adm) return '';
  var on=_ib.rcat||'cur';
  var h='<nav class="ib7-cats" aria-label="التصنيف"><button type="button" class="'+(on==='cur'?'on':'')+'" style="--c:#1F4E79" onclick="hhIbRCat(\'cur\')"><i></i>المنهج الدراسي<em>'+_ib5Count0()+'</em></button>';
  cats.forEach(function(k){ h+='<button type="button" class="'+(on===k.id?'on':'')+'" style="--c:'+esc(k.c||'#8A1538')+'" onclick="hhIbRCat(\''+esc(k.id)+'\')"><i></i>'+esc(k.t)+'<em>'+ib7CatGames(k.id).length+'</em></button>'; });
  if(adm) h+='<button type="button" class="add" onclick="hhIbRCatAdd()">+ تصنيف</button>';
  return h+'</nav>';
}
function ib7Crumb(){
  if(_ib.pathEdit) return ib5Path()+'<button type="button" class="ib7-chg" onclick="hhIbPathEdit(0)">تم</button>';
  var G=_ib.grade||'g7t1';
  return '<div class="ib7-crumb">الإعدادية<span>›</span>الدراسات الاجتماعية<span>›</span>السابع<span>›</span>'+(G==='g7t2'?'الفصل الثاني':'الفصل الأول')+'</div><button type="button" class="ib7-chg" onclick="hhIbPathEdit(1)">تغيير</button>';
}
var ADMB=function(){ return '<button type="button" class="ib7-adm" onclick="hhIbReadyNew()">'+ico('plus',14,2.6)+' لعبة جاهزة (للمدير)</button>'; };
function ib7Custom(R,adm){
  return '<div class="ib4-c ib6-u" data-k="custom" data-u="custom" data-t="'+esc((R.title+' '+R.d).toLowerCase())+'"><div class="h"><span class="no">'+ico('star',18,2)+'</span><div class="t"><b>'+esc(R.title)+'</b><small>'+(R.n===0?'بلا أسئلة بعد':R.n===1?'سؤال واحد':R.n===2?'سؤالان':ib4Count({kind:'mcq',n:R.n}))+'</small></div></div>'
    +'<div class="ac">'+ib6Btns(R)+'<button class="ib4-more" aria-label="خيارات أخرى" onclick="hhIbMenu(event,this)">'+ico('more',18)+'</button></div><div class="ib4-menu" hidden>'+ib5Menu(R,adm)+'</div></div>';
}
ib5UnitCard=function(gr,adm){
  var u=gr.u, it=gr.items; _ib.csel=_ib.csel||{}; var R=it.filter(function(r){ return r.rid===_ib.csel[u.k]; })[0]||it[0];
  var tot=it.reduce(function(a,r){ return a+(r.n||0); },0);
  var sub=it.length>1?(it.length===2?'لعبتان':it.length+' ألعاب')+'، '+tot+' '+(tot>2&&tot<11?'أسئلة':'سؤالاً'):ib4Count(R);
  var ty=it.length>1?'<div class="ib6-ty ib7-ty">'+it.map(function(r){ return '<button type="button" class="'+(r===R?'on':'')+(r.draft&&adm?' dr':'')+'" aria-pressed="'+(r===R)+'"'+(r.draft&&adm?' title="مسودة، تظهر لك فقط"':'')+' onclick="hhIbCSel(\''+u.k+'\',\''+r.rid+'\')">'+IB5_SHORT[r.kind]+'<em>'+r.n+'</em></button>'; }).join('')+'</div>':'<div class="ib7-sp"></div>';
  var txt=(u.short+' '+u.d+' '+it.map(function(r){ return r.title+' '+(IB4_TYPES[r.kind]||''); }).join(' ')).toLowerCase();
  return '<div class="ib4-c ib6-u" data-k="'+it.map(function(r){ return r.kind; }).join(' ')+'" data-u="'+u.k+'" data-t="'+esc(txt)+'"><div class="h"><span class="no">'+(gr.i+1)+'</span><div class="t"><b>'+esc(u.short)+'</b><small>'+sub+'</small></div></div>'+ty
    +'<div class="ac">'+ib6Btns(R)+'<button class="ib4-more" aria-label="خيارات أخرى" onclick="hhIbMenu(event,this)">'+ico('more',18)+'</button></div><div class="ib4-menu" hidden>'+ib5Menu(R,adm)+'</div></div>';
};
renderReady=function(){
  var adm=isAdm(), cats=ib7Cats(), on=_ib.rcat||'cur';
  if(on!=='cur'&&!cats.some(function(k){ return k.id===on; })) on=_ib.rcat='cur';
  var chips=ib7Chips(adm);
  if(on!=='cur'){
    var K=cats.filter(function(k){ return k.id===on; })[0], G=ib7CatGames(on);
    var bar='<div class="ib7-path"><label class="ib6-q ib7-q">'+ico('search',15)+'<input type="search" placeholder="ابحث في '+esc(K.t)+'" oninput="hhIbRQ(this.value)" aria-label="بحث"></label><span class="ib7-f"></span>'
      +(adm&&!G.length?'<button type="button" class="ib7-chg" onclick="hhIbRCatDel(\''+esc(on)+'\')">حذف التصنيف</button>':'')+(adm?ADMB():'')+'</div>';
    if(!G.length) return chips+bar+'<div class="rl-soon">لا ألعاب في هذا التصنيف بعد</div>';
    return chips+bar+'<div class="ib6-units" id="ib4-grid">'+G.map(function(c){ return ib7Custom(ib7CustomR(c),adm); }).join('')+'</div><div class="rl-soon" id="ib7-none" hidden>لا نتائج</div>';
  }
  var L=readyList().filter(function(R){ return !(R.custom&&R.custom.cat); }), GR=ib5Groups(L);
  var top=chips+'<div class="ib7-path">'+ib7Crumb()+'<span class="ib7-f"></span>'+(adm?ADMB():'')+'</div>';
  if(!L.length) return top+'<div class="rl-soon">ألعاب هذا الصف قيد الإعداد</div>';
  _ib.rf={u:'',k:'',q:''};
  var cards=(GR.comp.length?ib5CompCard(GR.comp,adm):'')+GR.units.map(function(g){ return ib5UnitCard(g,adm); }).join('')+GR.custom.map(function(R){ return ib7Custom(R,adm); }).join('');
  return top+'<div class="ib6-units" id="ib4-grid">'+cards+'</div>';
};
window.hhIbRCat=function(id){ _ib.rcat=id; render(); };
window.hhIbPathEdit=function(v){ _ib.pathEdit=!!v; render(); };
window.hhIbRQ=function(q){ q=String(q||'').trim().toLowerCase(); var n=0; document.querySelectorAll('#ib4-grid > .ib6-u').forEach(function(c){ var ok=!q||(c.getAttribute('data-t')||'').indexOf(q)>-1; c.style.display=ok?'':'none'; if(ok) n++; }); var e=document.getElementById('ib7-none'); if(e) e.hidden=n>0; };
window.hhIbRCatAdd=function(){ if(!isAdm()) return; var t=prompt('اسم التصنيف الجديد'); t=String(t||'').trim().slice(0,40); if(!t) return; var cats=ib7Cats(); if(cats.some(function(k){ return k.t===t; })){ toastX('التصنيف موجود','info'); return; }
  var k={id:newId('k'),t:t,c:IB7_PAL[(cats.length+1)%IB7_PAL.length]}; _ib.ready.cats=cats.concat([k]); _ib.rcat=k.id; saveReadyDoc(); render(); };
window.hhIbRCatDel=function(id){ if(!isAdm()) return; if(ib7CatGames(id).length){ toastX('انقل ألعاب التصنيف أو احذفها أولاً','info'); return; } var cats=ib7Cats(), k=cats.filter(function(x){ return x.id===id; })[0]; if(!k||!confirm('حذف تصنيف «'+k.t+'»؟')) return; _ib.ready.cats=cats.filter(function(x){ return x.id!==id; }); _ib.rcat='cur'; saveReadyDoc(); render(); };
var _readyNew0=window.hhIbReadyNew;
window.hhIbReadyNew=function(){ if(!isAdm()) return; var n0=(_ib.ready.custom||[]).length; var cat=(_ib.rcat&&_ib.rcat!=='cur')?_ib.rcat:''; if(cat){ var c0=_ib.ready.custom; var push0=c0.push; c0.push=function(c){ c.cat=cat; c0.push=push0; return push0.call(c0,c); }; } _readyNew0(); };
var IB7CSS=[
'#hh-ib.ib2 .ib7-cats{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;margin:0 0 14px;padding-bottom:2px;}',
'#hh-ib.ib2 .ib7-cats::-webkit-scrollbar{display:none;}',
'#hh-ib.ib2 .ib7-cats button{flex:0 0 auto;height:40px;border:1.5px solid #E7DCC6;background:#fff;border-radius:11px;padding:0 14px;font-family:Cairo,sans-serif;font-weight:800;font-size:14px;color:#3D0918;display:flex;align-items:center;gap:7px;cursor:pointer;}',
'#hh-ib.ib2 .ib7-cats button i{width:10px;height:10px;border-radius:3px;background:var(--c);}',
'#hh-ib.ib2 .ib7-cats button em{font-style:normal;font-size:12px;font-weight:900;color:#7A6A54;}',
'#hh-ib.ib2 .ib7-cats button.on{border-color:#8A1538;box-shadow:inset 0 0 0 1px #8A1538;background:#FBF1DA;}',
'#hh-ib.ib2 .ib7-cats button.add{border-style:dashed;color:#7A6A54;}',
'#hh-ib.ib2 .ib7-path{display:flex;align-items:center;gap:10px;margin:0 0 16px;flex-wrap:wrap;}',
'#hh-ib.ib2 .ib7-crumb{display:flex;align-items:center;gap:8px;font-family:Cairo,sans-serif;font-weight:800;font-size:15px;color:#3D0918;flex-wrap:wrap;}',
'#hh-ib.ib2 .ib7-crumb span{color:#7A6A54;}',
'#hh-ib.ib2 .ib7-chg{height:34px;border:1px solid #E7DCC6;background:#fff;border-radius:9px;font-family:Cairo,sans-serif;font-weight:800;font-size:13px;color:#8A1538;padding:0 12px;cursor:pointer;}',
'#hh-ib.ib2 .ib7-f{flex:1;}',
'#hh-ib.ib2 .ib7-adm{height:36px;border:1px dashed #B8924A;background:transparent;border-radius:9px;font-family:Cairo,sans-serif;font-weight:800;font-size:13px;color:#3D0918;padding:0 12px;display:flex;align-items:center;gap:6px;cursor:pointer;}',
'#hh-ib.ib2 .ib7-q{min-width:240px;}',
'#hh-ib.ib2 #ib4-grid > .ib6-u:not(.all){display:grid;grid-template-rows:auto auto 1fr auto;}',
'#hh-ib.ib2 #ib4-grid > .ib6-u:not(.all) > .ac{align-self:end;}',
'#hh-ib.ib2 #ib4-grid > .ib6-u:not(.all) > .ib6-ty,#hh-ib.ib2 #ib4-grid > .ib6-u:not(.all) > .ib7-sp{grid-row:2;}',
'#hh-ib.ib2 #ib4-grid > .ib6-u:not(.all) > .ac{grid-row:4;}',
'#hh-ib.ib2 .ib7-ty,#hh-ib.ib2 .ib6-u.all .ib6-ty{flex-wrap:nowrap;gap:4px;background:#FAF6EE;border-radius:10px;padding:3px;overflow-x:auto;scrollbar-width:none;}',
'#hh-ib.ib2 .ib7-ty::-webkit-scrollbar{display:none;}',
'#hh-ib.ib2 .ib7-ty button,#hh-ib.ib2 .ib6-u.all .ib6-ty button{flex:1 0 auto;border:0;background:none;border-radius:8px;padding:6px 6px;white-space:nowrap;position:relative;color:#7A6A54;}',
'#hh-ib.ib2 .ib7-ty button em{margin-inline-start:4px;color:#8A1538;}',
'#hh-ib.ib2 .ib7-ty button.on,#hh-ib.ib2 .ib6-u.all .ib6-ty button.on{background:#fff;color:#3D0918;box-shadow:0 1px 3px rgba(61,9,24,.12);border:0;}',
'#hh-ib.ib2 .ib7-ty button.dr::after{content:"";position:absolute;top:4px;left:4px;width:6px;height:6px;border-radius:50%;background:#B8924A;}',
'body.dark-mode #hh-ib.ib2 .ib7-cats button,body.dark-mode #hh-ib.ib2 .ib7-chg{background:#22121A;border-color:#3E2C24;color:#F5E6C4;}',
'body.dark-mode #hh-ib.ib2 .ib7-cats button.on{background:#3A2A10;border-color:#C9A35A;box-shadow:none;}',
'body.dark-mode #hh-ib.ib2 .ib7-crumb,body.dark-mode #hh-ib.ib2 .ib7-adm{color:#F5E6C4;}',
'body.dark-mode #hh-ib.ib2 .ib7-ty,body.dark-mode #hh-ib.ib2 .ib6-u.all .ib6-ty{background:#2A1720;} body.dark-mode #hh-ib.ib2 .ib6-u.all .ib6-ty button.on{background:#22121A;color:#F5E6C4;} body.dark-mode #hh-ib.ib2 .ib7-ty button.on{background:#22121A;color:#F5E6C4;} body.dark-mode #hh-ib.ib2 .ib7-ty button em{color:#E6CE8E;}',
'body.dark-mode #hh-ib.ib2 .ib7-ty button,body.dark-mode #hh-ib.ib2 .ib6-u.all .ib6-ty button{background:none !important;border:0 !important;color:#B8A68A;} body.dark-mode #hh-ib.ib2 .ib7-ty button.on,body.dark-mode #hh-ib.ib2 .ib6-u.all .ib6-ty button.on{background:#3A2A10 !important;color:#F5E6C4;}',
'@media (max-width:640px){ #hh-ib.ib2 .ib7-crumb{font-size:12.5px;gap:4px;} #hh-ib.ib2 .ib7-path{gap:8px;} #hh-ib.ib2 .ib7-q{min-width:0;flex:1 1 100%;} #hh-ib.ib2 .ib7-q input{width:100%;} #hh-ib.ib2 .ib7-adm{width:100%;justify-content:center;} }'
].join('\n');
IB6CSS+='\n'+IB7CSS;
/* ═══ zzzzzzcr، الجاهزة: بابان (المدرسة والعامة)، ألوان الوحدات، الإتاحة من المدير، شكل اللعبة، ولوحة التحكم ═══ */
var RD_PAL=['#8A1538','#1D5C99','#23855A','#C2862B','#6A42A8','#0E8288','#C0562F','#2C3E73'];
var RD_GRADES=[['g6','السادس'],['g7t1','السابع، الفصل الأول'],['g7t2','السابع، الفصل الثاني'],['g8','الثامن'],['g9','التاسع']];
var RD_SHAPES=[
  {k:'boxes',n:'صناديق الأسرار',ic:'box',c:'#8A1538',m:'screen'},
  {k:'wheel',n:'عجلة الأسئلة',ic:'wheel',c:'#8A6D2E',m:'screen'},
  {k:'show',n:'المسابقة الكبرى',ic:'tv',c:'#1D5C99',m:'screen'},
  {k:'flip',n:'البطاقات المقلوبة',ic:'flip',c:'#5E0E26',m:'screen'},
  {k:'tfs',n:'صح أم خطأ',ic:'check',c:'#23855A',m:'screen'},
  {k:'match',n:'التوصيل',ic:'link',c:'#1D5C99',m:'screen'},
  {k:'memory',n:'بطاقات الذاكرة',ic:'grid',c:'#8A1538',m:'screen'},
  {k:'order',n:'رتّب الأحداث',ic:'sort',c:'#C2862B',m:'screen'},
  {k:'mixb',n:'المراجعة المنوّعة',ic:'award',c:'#6A42A8',m:'screen',comp:1},
  {k:'race',n:'سباق المُلهم',ic:'bolt',c:'#8A1538',m:'live'},
  {k:'tfl',n:'صح أم خطأ السريع',ic:'check',c:'#23855A',m:'live'},
  {k:'ordl',n:'رتّب وصنّف',ic:'sort',c:'#1D5C99',m:'live'}
];
var _rd={dlg:null,saveT:null};
window._hhIbUnits=UNITS;
function rdLS(k,v){ try{ if(v===undefined) return localStorage.getItem(k); localStorage.setItem(k,v); }catch(e){ return null; } }
(function(){ var g=rdLS('hh_ib_grade'); if(g&&UNITS[g]) _ib.grade=g; var d=rdLS('hh_ib_door'); if(d==='gen'||d==='school') _ib.door=d; })();
function rdCfgAll(){ _ib.ready=_ib.ready||{tf:{},custom:[]}; if(!_ib.ready.units||typeof _ib.ready.units!=='object') _ib.ready.units={}; return _ib.ready.units; }
function rdUnit(G,u,i){ var c=rdCfgAll()[G+'-'+u.k]||{}; return { key:G+'-'+u.k, c:/^#[0-9a-f]{6}$/i.test(c.c||'')?c.c:RD_PAL[i%RD_PAL.length], on:c.on!=null?!!c.on:i<2, hide:Array.isArray(c.hide)?c.hide:[], t:String(c.t||'').trim()||u.short, o:typeof c.o==='number'?c.o:i }; }
function rdSet(key,patch){ var A=rdCfgAll(); A[key]=Object.assign({},A[key]||{},patch); rdSave(); }
function rdSave(){ clearTimeout(_rd.saveT); _rd.saveT=setTimeout(function(){ saveReadyDoc(); },500); }
function rdGn(n){ return n===0?'بلا ألعاب':n===1?'لعبة واحدة':n===2?'لعبتان':(n>2&&n<11)?n+' ألعاب':n+' لعبة'; }
function rdQn(n){ return n===0?'بلا أسئلة':n===1?'سؤال واحد':n===2?'سؤالان':(n>2&&n<11)?n+' أسئلة':n+' سؤالاً'; }
function rdItems(G,uk){ return readyList().filter(function(r){ return uk==='all'?r.sec==='all':r.sec===uk; }); }
function rdBy(items){ var by={}; items.forEach(function(r){ if(!by[r.kind]) by[r.kind]=r; }); return by; }
function rdRid(items,k){ var by=rdBy(items);
  if(k==='boxes'||k==='wheel'||k==='show'||k==='race') return by.mcq;
  if(k==='flip') return by.open||by.mcq; if(k==='tfs'||k==='tfl') return by.tf; if(k==='match'||k==='memory') return by.pairs;
  if(k==='order'||k==='ordl') return by.order; if(k==='mixb') return by.mix; return null; }
function rdTotal(items){ var by=rdBy(items), R=by.mcq; return R?(R.n||0)+(R.extra||0):items.reduce(function(a,r){ return a+(r.n||0); },0); }
function rdUnits(G){ return (UNITS[G]||[]).map(function(u,i){ return {u:u,i:i,cfg:rdUnit(G,u,i)}; }).sort(function(a,b){ return a.cfg.o-b.cfg.o||a.i-b.i; }); }
function rdSw(on,act,lab){ return '<button type="button" class="rd-sw'+(on?' on':'')+'" aria-pressed="'+on+'" onclick="event.stopPropagation();'+act+'"><span>'+(lab||(on?'متاحة':'مقفلة'))+'</span><i></i></button>'; }

/* البابان */
function rdDoors(adm){
  var d=_ib.door||'school';
  var D=[['school','المدرسة','من منهج صفك','cap'],['gen','العامة','ثقافة ومعرفة','globe']];
  return '<div class="rd-doors">'+D.map(function(x){ return '<button type="button" class="rd-door'+(d===x[0]?' on':'')+'" aria-pressed="'+(d===x[0])+'" onclick="hhRdDoor(\''+x[0]+'\')"><span class="ic">'+(x[3]==='cap'?'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg>':ico('globe',26,2))+'</span><span class="tx"><b>'+x[1]+'</b><small>'+x[2]+'</small></span></button>'; }).join('')
    +'</div>'+(adm?'<div class="rd-admbar"><button type="button" class="rd-ab" onclick="hhRdPanel(1)">'+ico('gear',15)+' لوحة التحكم بالألعاب الجاهزة</button></div>':'');
}
window.hhRdDoor=function(d){ _ib.door=d; rdLS('hh_ib_door',d); render(); };
window.hhRdGrade=function(g){ if(!UNITS[g]) return; _ib.grade=g; rdLS('hh_ib_grade',g); render(); };
function rdGrades(){ var G=_ib.grade||'g7t1';
  return '<div class="rd-grades"><span>صفك:</span>'+RD_GRADES.map(function(x){ var has=UNITS[x[0]]&&UNITS[x[0]].length; return '<button type="button" class="rd-ch'+(G===x[0]?' on':'')+'"'+(has?'':' disabled')+' onclick="hhRdGrade(\''+x[0]+'\')">'+x[1]+(has?'':'، قريباً')+'</button>'; }).join('')+'</div>'; }

/* بطاقة وحدة */
function rdMenu(items,adm,uk){
  var by=rdBy(items), m='';
  if(by.mcq) m+='<span class="ib4-mi" onclick="hhIbMenuDo(event,\'copy\',\''+by.mcq.rid+'\')">'+ico('copy',15)+' انسخ إلى ألعابي وعدّل</span>';
  if(adm){ var a='';
    [['mcq','أسئلة الاختيار'],['tf','عبارات صح أم خطأ'],['open','الأسئلة المقالية'],['order','أسئلة الترتيب']].forEach(function(x){ var R=by[x[0]]; if(R&&!R.school&&!R.noEdit) a+='<span class="ib4-mi" onclick="hhIbMenuDo(event,\'edit\',\''+(R.src||R.rid)+'\')">'+ico('edit',15)+' عدّل '+x[1]+'</span>'; });
    if(by.tf&&by.tf.draft) a+='<span class="ib4-mi" onclick="hhIbMenuDo(event,\'publish\',\''+by.tf.rid+'\')">'+ico('send',15)+' انشر صح أم خطأ للمعلمين</span>';
    if(a) m+='<small>للمدير</small>'+a; }
  return m||'<span class="ib4-mi" style="cursor:default">لا خيارات أخرى</span>';
}
function rdUnitCard(G,x,adm,no){
  var u=x.u, C=x.cfg, items=rdItems(G,u.k); if(!items.length) return '';
  var lock=!C.on, n=rdTotal(items), dr=adm&&items.some(function(r){ return r.draft; });
  var hd='<div class="hd"><span class="no">'+no+'</span><div class="tt"><b>'+esc(C.t)+'</b><small>'+rdQn(n)+(dr?'، فيها مسودة':'')+'</small></div>'+(adm?rdSw(C.on,'hhRdOn(\''+C.key+'\')'):(lock?'<span class="lk">'+ico('lock',12,2.4)+' قريباً</span>':''))+'</div>';
  var bd='<div class="bd"><button type="button" class="rd-b p"'+(lock&&!adm?' disabled':'')+' onclick="hhRdOpen(\''+u.k+'\')">'+(lock&&!adm?ico('lock',16,2.2)+' قريباً':ico('play',16,2.2)+' العب')+'</button><button type="button" class="rd-b mo" aria-label="خيارات أخرى" onclick="hhIbMenu(event,this)">'+ico('more',18)+'</button><div class="ib4-menu" hidden>'+rdMenu(items,adm,u.k)+'</div></div>';
  return '<div class="rd-u ib4-c'+(lock?' lock':'')+'" style="--c:'+C.c+'">'+hd+bd+'</div>';
}
function rdCompCard(G,adm){
  var items=rdItems(G,'all'); if(!items.length) return '';
  var n=rdTotal(items), nu=(UNITS[G]||[]).length;
  return '<div class="rd-u rd-comp ib4-c" style="--c:#5E0E26"><div class="hd"><span class="no">'+ico('award',20,2)+'</span><div class="tt"><b>المراجعة الشاملة</b><small>'+nu+' وحدات، '+rdQn(n)+'</small></div></div>'
    +'<div class="bd"><button type="button" class="rd-b p" onclick="hhRdOpen(\'all\')">'+ico('play',16,2.2)+' العب</button><button type="button" class="rd-b mo" aria-label="خيارات أخرى" onclick="hhIbMenu(event,this)">'+ico('more',18)+'</button><div class="ib4-menu" hidden>'+rdMenu(items,adm,'all')+'</div></div></div>';
}
function rdCustomCard(R,adm,no){
  return '<div class="rd-u ib4-c" style="--c:#8A6D2E"><div class="hd"><span class="no">'+(no||ico('star',18,2))+'</span><div class="tt"><b>'+esc(R.title)+'</b><small>'+rdQn(R.n)+'</small></div></div>'
    +'<div class="bd">'+(R.n?'<button type="button" class="rd-b p" onclick="hhIbReadyShow(\''+R.rid+'\')">'+ico('monitor',15)+' على الشاشة</button><button type="button" class="rd-b" onclick="hhIbReadyLive(\''+R.rid+'\')">'+ico('phone',15)+' على الأجهزة</button>':'<button type="button" class="rd-b p" disabled>بلا أسئلة بعد</button>')+'<button type="button" class="rd-b mo" aria-label="خيارات أخرى" onclick="hhIbMenu(event,this)">'+ico('more',18)+'</button><div class="ib4-menu" hidden>'+ib5Menu(R,adm)+'</div></div></div>';
}
function rdSchool(adm){
  var G=_ib.grade||'g7t1', U=rdUnits(G);
  var cards=rdCompCard(G,adm)+U.map(function(x,k){ return rdUnitCard(G,x,adm,k+1); }).join('');
  var cust=readyList().filter(function(R){ return R.sec==='custom'&&!(R.custom&&R.custom.cat); });
  cards+=cust.map(function(R){ return rdCustomCard(R,adm); }).join('');
  var open=U.filter(function(x){ return x.cfg.on; }).length;
  var head='<div class="rd-head"><b>'+esc((RD_GRADES.filter(function(x){ return x[0]===G; })[0]||[,''])[1])+'</b>'+(adm&&U.length?'<small>'+open+' من '+U.length+' وحدات متاحة للمعلمين والطلاب</small>':'')+'<span class="sp"></span>'+(adm?'<button type="button" class="rd-ab" onclick="hhIbReadyNew()">'+ico('plus',14,2.6)+' لعبة جاهزة</button>':'')+'</div>';
  return rdGrades()+head+(cards?'<div class="rd-grid">'+cards+'</div>':'<div class="rl-soon">ألعاب هذا الصف قيد الإعداد</div>')+'<p class="rd-note">يُحفظ صفك، فلا يُسأل عنه مرة أخرى.</p>';
}
window.hhRdOn=function(key){ if(!isAdm()) return; var A=rdCfgAll(), cur=A[key]; var G=_ib.grade||'g7t1', i=(UNITS[G]||[]).map(function(u){ return G+'-'+u.k; }).indexOf(key); var on=cur&&cur.on!=null?!!cur.on:i<2; rdSet(key,{on:!on}); render(); };

/* العامة */
function rdCats(adm){ return ib7Cats().filter(function(k){ return adm||k.on!==false; }); }
function rdGeneral(adm){
  var cats=rdCats(adm), on=_ib.rcat; if(!cats.some(function(k){ return k.id===on; })) on=_ib.rcat=(cats[0]||{}).id;
  var tiles='<div class="rd-cats">'+cats.map(function(k,i){ var n=ib7CatGames(k.id).length, c=/^#[0-9a-f]{6}$/i.test(k.c||'')?k.c:RD_PAL[i%RD_PAL.length]; return '<button type="button" class="rd-cat'+(on===k.id?' on':'')+(k.on===false?' off':'')+'" style="--c:'+c+'" onclick="hhIbRCat(\''+esc(k.id)+'\')"><span class="lt">'+esc(String(k.t||'').replace(/^ال/,'').charAt(0))+'</span><span class="tx"><b>'+esc(k.t)+'</b><small>'+rdGn(n)+(k.on===false?'، مخفي':'')+'</small></span></button>'; }).join('')
    +(adm?'<button type="button" class="rd-cat add" onclick="hhIbRCatAdd()"><span class="lt">+</span><span class="tx"><b>تصنيف جديد</b><small>للمدير</small></span></button>':'')+'</div>';
  if(!cats.length) return tiles+'<div class="rl-soon">لا ألعاب عامة بعد'+(adm?'، أضف تصنيفاً ثم ألعابه':'')+'</div>';
  var K=cats.filter(function(k){ return k.id===on; })[0], G=ib7CatGames(on);
  var head='<div class="rd-head"><b>'+esc(K.t)+'</b><small>'+rdGn(G.length)+'</small><span class="sp"></span>'+(adm&&!G.length?'<button type="button" class="rd-ab" onclick="hhIbRCatDel(\''+esc(on)+'\')">حذف التصنيف</button>':'')+(adm?'<button type="button" class="rd-ab" onclick="hhIbReadyNew()">'+ico('plus',14,2.6)+' لعبة في هذا التصنيف</button>':'')+'</div>';
  return tiles+head+(G.length?'<div class="rd-grid">'+G.map(function(c,i){ return rdCustomCard(ib7CustomR(c),adm,i+1); }).join('')+'</div>':'<div class="rl-soon">لا ألعاب في هذا التصنيف بعد</div>');
}

/* نافذة شكل اللعبة */
window.hhRdOpen=function(uk){
  var G=_ib.grade||'g7t1', adm=isAdm(), items=rdItems(G,uk); if(!items.length) return;
  var name='المراجعة الشاملة', col='#5E0E26', hide=[];
  if(uk!=='all'){ var U=rdUnits(G).filter(function(x){ return x.u.k===uk; })[0]; if(!U) return; if(!U.cfg.on&&!adm){ toastX('هذه الوحدة غير متاحة بعد','info'); return; } name=U.cfg.t; col=U.cfg.c; hide=U.cfg.hide; }
  var list=RD_SHAPES.filter(function(s){ return (!s.comp||uk==='all')&&(adm||hide.indexOf(s.k)<0); }).map(function(s){ return {s:s,R:rdRid(items,s.k),hid:hide.indexOf(s.k)>-1}; }).filter(function(x){ return !(x.s.comp&&!x.R); });
  var last=rdLS('hh_ib_shape'), pick=list.filter(function(x){ return x.R&&x.s.k===last; })[0]||list.filter(function(x){ return x.R; })[0];
  _rd.dlg={uk:uk,items:items,list:list,sel:pick?pick.s.k:null,name:name,col:col};
  rdDraw();
};
function rdTile(x){ var on=_rd.dlg.sel===x.s.k; return '<button type="button" class="sh'+(on?' on':'')+'" style="--k:'+x.s.c+'"'+(x.R?'':' disabled')+' aria-pressed="'+on+'" data-sk="'+x.s.k+'"><i>'+ico(x.s.ic,24,2)+'</i><b>'+x.s.n+'</b>'+(x.R?(x.hid?'<small>مخفي عن المعلمين</small>':''):'<small>لا أسئلة كافية</small>')+'</button>'; }
function rdDraw(){
  var D=_rd.dlg, host=document.getElementById('hh-ib'); if(!D||!host) return;
  var ov=document.getElementById('rd-scrim'); if(!ov){ ov=document.createElement('div'); ov.id='rd-scrim'; ov.className='rd-scrim'; host.appendChild(ov); ov.addEventListener('click',function(e){ if(e.target===ov) hhRdClose(); }); }
  var scr=D.list.filter(function(x){ return x.s.m==='screen'; }), live=D.list.filter(function(x){ return x.s.m==='live'; });
  var cur=D.list.filter(function(x){ return x.s.k===D.sel; })[0];
  ov.innerHTML='<div class="rd-dlg" role="dialog" aria-modal="true" aria-label="اختر شكل اللعبة" style="--c:'+D.col+'"><div class="dh"><div><b>'+esc(D.name)+'</b><small>اختر شكل اللعبة</small></div><button type="button" class="x" aria-label="إغلاق" onclick="hhRdClose()">'+ico('x',16,2.4)+'</button></div><div class="in">'
    +(scr.length?'<h4>'+ico('monitor',16)+' على الشاشة</h4><div class="shapes">'+scr.map(rdTile).join('')+'</div>':'')
    +(live.length?'<h4>'+ico('phone',16)+' على أجهزة الطلاب</h4><div class="shapes">'+live.map(rdTile).join('')+'</div>':'')
    +'<div class="go"><small>'+(cur?'الشكل: '+cur.s.n:'اختر شكلاً')+'</small><button type="button" class="rd-b p" '+(cur&&cur.R?'':'disabled')+' onclick="hhRdStart()">'+ico('play',16,2.2)+' ابدأ</button></div></div></div>';
  ov.querySelectorAll('[data-sk]').forEach(function(b){ b.onclick=function(){ D.sel=b.getAttribute('data-sk'); rdDraw(); }; b.ondblclick=function(){ D.sel=b.getAttribute('data-sk'); hhRdStart(); }; });
  var f=ov.querySelector('.sh.on')||ov.querySelector('.x'); if(f&&!ov._f){ ov._f=1; try{ f.focus({preventScroll:true}); }catch(e){} }
}
window.hhRdClose=function(){ _rd.dlg=null; var o=document.getElementById('rd-scrim'); if(o) o.remove(); };
window.hhRdStart=function(){
  var D=_rd.dlg; if(!D) return; var x=D.list.filter(function(y){ return y.s.k===D.sel; })[0]; if(!x||!x.R) return;
  if(x.s.m==='live'&&!canUse()){ toastX('التشغيل على أجهزة الطلاب بحساب المعلم، سجّل الدخول أولاً','info'); return; }
  rdLS('hh_ib_shape',x.s.k); hhRdClose();
  var g=buildReady(x.R.rid); if(!g) return;
  if(x.s.m==='screen'){ if(x.s.k!=='mixb') g.screenTpl=x.s.k; g.mode='screen'; screenRun(g); return; }
  g.mode='live'; g.template=x.s.k==='race'?'race':x.s.k==='tfl'?'tf':'order'; liveRun(g);
};
document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&_rd.dlg){ e.stopPropagation(); hhRdClose(); } },true);

/* لوحة التحكم بالألعاب الجاهزة */
window.hhRdPanel=function(v){ if(!isAdm()) return; _ib.radm=!!v; render(); var o=document.getElementById('hh-ib'); if(o) o.scrollTop=0; };
function rdPal(cur,act){ return '<div class="pal" role="radiogroup" aria-label="اللون">'+RD_PAL.map(function(c){ return '<button type="button" role="radio" aria-checked="'+(c===cur)+'" aria-label="'+c+'" class="'+(c===cur?'on':'')+'" style="--k:'+c+'" onclick="'+act.replace('$C',c)+'"></button>'; }).join('')+'</div>'; }
function rdPanel(){
  var tab=_ib.rptab||'school', G=_ib.grade||'g7t1';
  var top='<div class="rd-pn-top"><button type="button" class="rd-ab" onclick="hhRdPanel(0)">'+ico('back',14,2.4)+' رجوع</button><b>لوحة التحكم، الألعاب الجاهزة</b><small>كل تعديل يسري على المعلمين والطلاب فوراً</small></div>';
  var tb='<div class="ptb">'+[['school','المدرسة'],['gen','العامة']].map(function(x){ return '<button type="button" class="rd-ch'+(tab===x[0]?' on':'')+'" onclick="hhRdPTab(\''+x[0]+'\')">'+x[1]+'</button>'; }).join('')+'<span class="sp"></span>'+(tab==='school'?RD_GRADES.map(function(x){ var has=UNITS[x[0]]&&UNITS[x[0]].length; return '<button type="button" class="rd-ch'+(G===x[0]?' on':'')+'"'+(has?'':' disabled')+' onclick="hhRdGrade(\''+x[0]+'\')">'+x[1]+'</button>'; }).join(''):'<button type="button" class="rd-ab" onclick="hhIbRCatAdd()">'+ico('plus',14,2.6)+' تصنيف</button>')+'</div>';
  var rows='', foot='';
  if(tab==='school'){
    var U=rdUnits(G);
    rows=U.map(function(x,k){ var C=x.cfg, items=rdItems(G,x.u.k), by=rdBy(items), n=rdTotal(items);
      var shp=RD_SHAPES.filter(function(s){ return !s.comp&&rdRid(items,s.k); }).map(function(s){ var on=C.hide.indexOf(s.k)<0; return '<button type="button" class="'+(on?'on':'')+'" aria-pressed="'+on+'" title="'+(on?'ظاهر، اضغط لإخفائه':'مخفي، اضغط لإظهاره')+'" onclick="hhRdShp(\''+C.key+'\',\''+s.k+'\')">'+s.n+'</button>'; }).join('');
      return '<div class="row" style="--c:'+C.c+'"><span class="mv"><button type="button" aria-label="لأعلى" '+(k?'':'disabled')+' onclick="hhRdMove(\''+x.u.k+'\',-1)">'+ico('up',14,2.4)+'</button><button type="button" aria-label="لأسفل" '+(k<U.length-1?'':'disabled')+' onclick="hhRdMove(\''+x.u.k+'\',1)">'+ico('down',14,2.4)+'</button></span><span class="nb">'+(k+1)+'</span>'
        +'<input type="text" value="'+esc(C.t)+'" aria-label="اسم الوحدة" maxlength="40" onchange="hhRdName(\''+C.key+'\',this.value)">'+rdPal(C.c,'hhRdCol(\''+C.key+'\',\'$C\')')
        +'<span class="tgw">'+rdSw(C.on,'hhRdOn(\''+C.key+'\')')+'</span><div class="shp">'+(shp||'<em>لا أسئلة بعد</em>')+'</div>'
        +(by.mcq&&!by.mcq.school?'<button type="button" class="ed" onclick="hhIbReadyEdit(\''+by.mcq.rid+'\')">الأسئلة '+n+'</button>':'<span class="ed na">الأسئلة '+n+'</span>')+'</div>'; }).join('');
    foot=U.filter(function(x){ return x.cfg.on; }).length+' من '+U.length+' وحدات متاحة. اضغط شكل اللعبة لإخفائه عن هذه الوحدة، والأسهم لتغيير الترتيب.';
  } else {
    var cats=ib7Cats();
    rows=cats.length?cats.map(function(k,i){ var c=/^#[0-9a-f]{6}$/i.test(k.c||'')?k.c:RD_PAL[i%RD_PAL.length], n=ib7CatGames(k.id).length;
      return '<div class="row gen" style="--c:'+c+'"><span class="mv"></span><span class="nb">'+esc(String(k.t||'').replace(/^ال/,'').charAt(0))+'</span><input type="text" value="'+esc(k.t)+'" aria-label="اسم التصنيف" maxlength="40" onchange="hhRdCatName(\''+esc(k.id)+'\',this.value)">'+rdPal(c,'hhRdCatCol(\''+esc(k.id)+'\',\'$C\')')
        +'<span class="tgw">'+rdSw(k.on!==false,'hhRdCatOn(\''+esc(k.id)+'\')',k.on!==false?'ظاهر':'مخفي')+'</span><div class="shp"><em>'+rdGn(n)+'</em></div>'
        +(n?'<button type="button" class="ed" onclick="hhRdPanel(0);hhRdDoor(\'gen\');hhIbRCat(\''+esc(k.id)+'\')">الألعاب</button>':'<button type="button" class="ed" onclick="hhIbRCatDel(\''+esc(k.id)+'\')">حذف</button>')+'</div>'; }).join(''):'<div class="row emp">لا تصنيفات بعد، أضف تصنيفاً من الزر في الأعلى.</div>';
    foot='التصنيفات المخفية لا تظهر للمعلمين والطلاب.';
  }
  return top+'<div class="rd-pn">'+tb+rows+'<div class="bt">'+foot+'</div></div>';
}
window.hhRdPTab=function(t){ _ib.rptab=t; render(); };
window.hhRdCol=function(key,c){ rdSet(key,{c:c}); render(); };
window.hhRdName=function(key,v){ rdSet(key,{t:String(v||'').trim().slice(0,40)}); render(); };
window.hhRdShp=function(key,s){ var A=rdCfgAll(), h=((A[key]||{}).hide||[]).slice(), i=h.indexOf(s); if(i>-1) h.splice(i,1); else h.push(s); rdSet(key,{hide:h}); render(); };
window.hhRdMove=function(uk,d){ var G=_ib.grade||'g7t1', U=rdUnits(G), i=U.map(function(x){ return x.u.k; }).indexOf(uk), j=i+d; if(i<0||j<0||j>=U.length) return; var t=U[i]; U[i]=U[j]; U[j]=t; U.forEach(function(x,k){ rdCfgAll()[x.cfg.key]=Object.assign({},rdCfgAll()[x.cfg.key]||{},{o:k}); }); rdSave(); render(); };
function rdCatPatch(id,p){ var cats=ib7Cats(); cats.forEach(function(k){ if(k.id===id) Object.assign(k,p); }); _ib.ready.cats=cats; rdSave(); render(); }
window.hhRdCatName=function(id,v){ v=String(v||'').trim().slice(0,40); if(v) rdCatPatch(id,{t:v}); };
window.hhRdCatCol=function(id,c){ rdCatPatch(id,{c:c}); };
window.hhRdCatOn=function(id){ var k=ib7Cats().filter(function(x){ return x.id===id; })[0]; if(k) rdCatPatch(id,{on:k.on===false}); };

renderReady=function(){
  var adm=isAdm();
  if(adm&&_ib.radm) return rdPanel();
  var d=_ib.door||'school';
  return '<div class="rd8">'+rdDoors(adm)+(d==='gen'?rdGeneral(adm):rdSchool(adm))+'</div>';
};
var _rdCount0=ib5Count;
ib5Count=function(){ try{ var G=_ib.grade||'g7t1', adm=isAdm(); var n=rdUnits(G).filter(function(x){ return rdItems(G,x.u.k).length&&(adm||x.cfg.on); }).length+(rdItems(G,'all').length?1:0); rdCats(adm).forEach(function(k){ n+=ib7CatGames(k.id).length; }); return n; }catch(e){ return _rdCount0(); } };

var RD8CSS=[
'#hh-ib.ib2 .rd8,#hh-ib.ib2 .rd-pn,#hh-ib.ib2 .rd-pn-top,#hh-ib .rd-scrim{--rs:#fff;--rso:#FAF6EE;--rl:#E7DCC6;--ri:#3D0918;--rm:#7A6A54;--rg:#B8924A;--rgb:#FBF1DA;}',
'body.dark-mode #hh-ib.ib2 .rd8,body.dark-mode #hh-ib.ib2 .rd-pn,body.dark-mode #hh-ib.ib2 .rd-pn-top,body.dark-mode #hh-ib .rd-scrim{--rs:#22121A;--rso:#2A1720;--rl:#3E2C24;--ri:#F5E6C4;--rm:#B8A68A;--rgb:#3A2A10;}',
'#hh-ib.ib2 .rd-doors{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:0 0 16px;}',
'#hh-ib.ib2 .rd-door{display:flex;align-items:center;gap:14px;padding:16px 18px;border-radius:16px;border:1.5px solid var(--rl);background:var(--rs);color:var(--ri);font-family:Cairo,sans-serif;text-align:start;cursor:pointer;transition:border-color .2s,background .2s;}',
'#hh-ib.ib2 .rd-door .ic{width:52px;height:52px;border-radius:14px;display:grid;place-items:center;background:var(--rso);color:#8A1538;flex-shrink:0;}',
'#hh-ib.ib2 .rd-door .tx b{display:block;font-size:20px;font-weight:900;} #hh-ib.ib2 .rd-door .tx small{font-size:13px;font-weight:700;color:var(--rm);}',
'#hh-ib.ib2 .rd-door.on{border-color:#8A1538;background:var(--rgb);} #hh-ib.ib2 .rd-door.on .ic{background:#5E0E26;color:#fff;}',
'#hh-ib.ib2 .rd-admbar{display:flex;justify-content:flex-end;margin:-6px 0 12px;}',
'#hh-ib.ib2 .rd-ab{height:36px;border:1px dashed var(--rg);background:transparent;border-radius:10px;font-family:Cairo,sans-serif;font-weight:800;font-size:13px;color:var(--ri);padding:0 12px;display:inline-flex;align-items:center;gap:6px;cursor:pointer;white-space:nowrap;}',
'#hh-ib.ib2 .rd-grades{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:0 0 14px;} #hh-ib.ib2 .rd-grades > span{font-weight:800;font-size:13px;color:var(--rm);}',
'#hh-ib.ib2 .rd-ch{height:38px;border:1.5px solid var(--rl);background:var(--rs);border-radius:20px;padding:0 14px;font-family:Cairo,sans-serif;font-weight:800;font-size:13.5px;color:var(--ri);cursor:pointer;white-space:nowrap;}',
'#hh-ib.ib2 .rd-ch.on{background:#5E0E26;border-color:#5E0E26;color:#fff;} #hh-ib.ib2 .rd-ch:disabled{opacity:.5;cursor:default;}',
'#hh-ib.ib2 .rd-head{display:flex;align-items:center;gap:10px;margin:0 0 12px;flex-wrap:wrap;} #hh-ib.ib2 .rd-head b{font-size:18px;font-weight:900;color:var(--ri);} #hh-ib.ib2 .rd-head small{font-size:13px;font-weight:700;color:var(--rm);} #hh-ib.ib2 .rd-head .sp{flex:1;}',
'#hh-ib.ib2 .rd-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;}',
'#hh-ib.ib2 .rd-u{background:var(--rs);border:1px solid var(--rl);border-radius:16px;overflow:visible;display:flex;flex-direction:column;min-width:0;position:relative;animation:rdIn .4s ease both;}',
'@keyframes rdIn{from{opacity:0;transform:translateY(8px)}}',
'#hh-ib.ib2 .rd-u .hd{background:var(--c);background-image:radial-gradient(circle at 12% 120%,rgba(255,255,255,.18) 0 38%,transparent 39%),radial-gradient(circle at 0 -30%,rgba(255,255,255,.1) 0 30%,transparent 31%);color:#fff;padding:14px 16px;display:flex;align-items:center;gap:12px;min-height:84px;border-radius:15px 15px 0 0;}',
'#hh-ib.ib2 .rd-u .hd .no{width:40px;height:40px;border-radius:11px;background:rgba(255,255,255,.18);display:grid;place-items:center;font-weight:900;font-size:18px;flex-shrink:0;}',
'#hh-ib.ib2 .rd-u .hd .tt{flex:1;min-width:0;} #hh-ib.ib2 .rd-u .hd b{display:block;font-size:17px;font-weight:900;line-height:1.35;color:#fff;} #hh-ib.ib2 .rd-u .hd small{font-size:12.5px;font-weight:700;opacity:.88;color:#fff;}',
'#hh-ib.ib2 .rd-u .bd{padding:12px 14px 14px;display:flex;gap:8px;margin-top:auto;position:relative;}',
'#hh-ib.ib2 .rd-b{height:44px;border-radius:11px;border:1px solid var(--rl);background:var(--rs);color:var(--ri);font-family:Cairo,sans-serif;font-weight:800;font-size:14.5px;display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:0 14px;cursor:pointer;}',
'#hh-ib.ib2 .rd-b.p,#hh-ib .rd-scrim .rd-b.p{flex:1;background:var(--c,#5E0E26);border-color:transparent;color:#fff;} #hh-ib.ib2 .rd-u .rd-b:not(.p):not(.mo){flex:1;} #hh-ib.ib2 .rd-b.mo{width:46px;padding:0;flex:0 0 auto;}',
'#hh-ib.ib2 .rd-b:disabled{opacity:.6;cursor:default;}',
'#hh-ib.ib2 .rd-u .ib4-menu{position:absolute;bottom:58px;left:14px;z-index:6;}',
'#hh-ib.ib2 .rd-u.lock .hd{background:#A79D90;background-image:none;} #hh-ib.ib2 .rd-u.lock .rd-b.p{background:var(--rso);color:var(--rm);border-color:var(--rl);}',
'#hh-ib.ib2 .rd-u .lk{font-size:11.5px;font-weight:900;background:rgba(255,255,255,.2);border-radius:20px;padding:2px 10px;display:inline-flex;align-items:center;gap:5px;align-self:flex-start;}',
'#hh-ib .rd-sw{display:inline-flex;align-items:center;gap:6px;border:0;background:rgba(0,0,0,.25);color:#fff;border-radius:20px;padding:3px 4px 3px 10px;font-family:Cairo,sans-serif;font-size:12px;font-weight:800;cursor:pointer;align-self:flex-start;white-space:nowrap;}',
'#hh-ib .rd-sw i{width:34px;height:20px;border-radius:20px;background:rgba(255,255,255,.35);position:relative;} #hh-ib .rd-sw i::after{content:"";position:absolute;top:2px;right:2px;width:16px;height:16px;border-radius:50%;background:#fff;transition:right .15s;}',
'#hh-ib .rd-sw.on i{background:#5FD08A;} #hh-ib .rd-sw.on i::after{right:16px;}',
'#hh-ib.ib2 .rd-note{font-size:13px;font-weight:700;color:var(--rm);margin:14px 2px 0;}',
'#hh-ib.ib2 .rd-cats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin:0 0 18px;}',
'#hh-ib.ib2 .rd-cat{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:14px;border:1.5px solid var(--rl);background:var(--rs);font-family:Cairo,sans-serif;text-align:start;color:var(--ri);cursor:pointer;min-width:0;}',
'#hh-ib.ib2 .rd-cat .lt{width:40px;height:40px;border-radius:11px;display:grid;place-items:center;font-weight:900;font-size:18px;background:color-mix(in srgb,var(--c) 14%,var(--rs));color:var(--c);flex-shrink:0;}',
'#hh-ib.ib2 .rd-cat .tx{min-width:0;} #hh-ib.ib2 .rd-cat b{display:block;font-size:15px;font-weight:900;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;} #hh-ib.ib2 .rd-cat small{font-size:12px;font-weight:700;color:var(--rm);}',
'#hh-ib.ib2 .rd-cat.on{border-color:var(--c);background:color-mix(in srgb,var(--c) 7%,var(--rs));} #hh-ib.ib2 .rd-cat.off{opacity:.6;} #hh-ib.ib2 .rd-cat.add{border-style:dashed;--c:#B8924A;}',
'#hh-ib .rd-scrim{position:fixed;inset:0;background:rgba(20,5,10,.5);display:grid;place-items:center;padding:16px;z-index:99999;animation:rdF .2s;} @keyframes rdF{from{opacity:0}}',
'#hh-ib .rd-dlg{width:min(780px,100%);max-height:calc(100vh - 32px);overflow:auto;background:var(--rs);border-radius:18px;box-shadow:0 20px 60px rgba(0,0,0,.3);font-family:Cairo,sans-serif;color:var(--ri);animation:rdP .3s cubic-bezier(.3,1.4,.5,1);} @keyframes rdP{from{transform:scale(.94);opacity:0}}',
'#hh-ib .rd-dlg .dh{background:var(--c);background-image:linear-gradient(135deg,rgba(255,255,255,.12),transparent);color:#fff;padding:16px 18px;display:flex;align-items:center;gap:10px;}',
'#hh-ib .rd-dlg .dh b{font-size:18px;font-weight:900;color:#fff;} #hh-ib .rd-dlg .dh small{display:block;font-size:12.5px;font-weight:700;opacity:.88;color:#fff;}',
'#hh-ib .rd-dlg .x{margin-inline-start:auto;width:36px;height:36px;border-radius:10px;border:0;background:rgba(255,255,255,.18);color:#fff;display:grid;place-items:center;cursor:pointer;}',
'#hh-ib .rd-dlg .in{padding:16px 18px 18px;} #hh-ib .rd-dlg h4{margin:0 0 10px;font-size:14px;font-weight:900;color:var(--rm);display:flex;align-items:center;gap:6px;}',
'#hh-ib .rd-dlg .shapes{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:16px;}',
'#hh-ib .rd-dlg .sh{border:2px solid var(--rl);background:var(--rs);border-radius:14px;padding:12px 8px;display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;color:var(--ri);font-family:Cairo,sans-serif;cursor:pointer;transition:border-color .15s,transform .15s;}',
'#hh-ib .rd-dlg .sh i{width:52px;height:52px;border-radius:14px;background:color-mix(in srgb,var(--k) 13%,var(--rs));color:var(--k);display:grid;place-items:center;}',
'#hh-ib .rd-dlg .sh b{font-size:13.5px;font-weight:900;line-height:1.3;} #hh-ib .rd-dlg .sh small{font-size:11px;font-weight:700;color:var(--rm);margin-top:-6px;}',
'#hh-ib .rd-dlg .sh:not([disabled]):hover{border-color:var(--k);transform:translateY(-2px);} #hh-ib .rd-dlg .sh.on{border-color:var(--k);background:color-mix(in srgb,var(--k) 7%,var(--rs));} #hh-ib .rd-dlg .sh[disabled]{opacity:.4;cursor:default;}',
'#hh-ib .rd-dlg .go{display:flex;align-items:center;gap:10px;border-top:1px solid var(--rl);padding-top:14px;} #hh-ib .rd-dlg .go small{flex:1;font-size:13px;font-weight:800;color:var(--rm);}',
'#hh-ib .rd-dlg .go .rd-b{height:44px;border-radius:11px;border:0;font-family:Cairo,sans-serif;font-weight:900;font-size:15px;display:inline-flex;align-items:center;gap:7px;padding:0 26px;cursor:pointer;flex:0 0 auto;background:var(--c);color:#fff;} #hh-ib .rd-dlg .go .rd-b:disabled{opacity:.5;}',
'#hh-ib.ib2 .rd-pn-top{display:flex;align-items:center;gap:12px;margin:0 0 14px;flex-wrap:wrap;} #hh-ib.ib2 .rd-pn-top b{font-size:19px;font-weight:900;color:var(--ri);} #hh-ib.ib2 .rd-pn-top small{font-size:13px;font-weight:700;color:var(--rm);}',
'#hh-ib.ib2 .rd-pn{background:var(--rs);border:1px solid var(--rl);border-radius:16px;overflow:hidden;font-family:Cairo,sans-serif;color:var(--ri);}',
'#hh-ib.ib2 .rd-pn .ptb{display:flex;align-items:center;gap:8px;padding:12px 14px;border-bottom:1px solid var(--rl);flex-wrap:wrap;} #hh-ib.ib2 .rd-pn .ptb .sp{flex:1;}',
'#hh-ib.ib2 .rd-pn .row{display:grid;grid-template-columns:30px 44px minmax(150px,1.3fr) auto auto minmax(200px,1.6fr) auto;align-items:center;gap:12px;padding:12px 14px;border-bottom:1px solid var(--rl);}',
'#hh-ib.ib2 .rd-pn .row.emp{display:block;color:var(--rm);font-weight:800;}',
'#hh-ib.ib2 .rd-pn .mv{display:flex;flex-direction:column;gap:2px;} #hh-ib.ib2 .rd-pn .mv button{width:28px;height:20px;border:1px solid var(--rl);background:var(--rs);border-radius:6px;color:var(--rm);display:grid;place-items:center;cursor:pointer;padding:0;} #hh-ib.ib2 .rd-pn .mv button:disabled{opacity:.3;cursor:default;}',
'#hh-ib.ib2 .rd-pn .nb{width:40px;height:40px;border-radius:11px;background:var(--c);color:#fff;display:grid;place-items:center;font-weight:900;}',
'#hh-ib.ib2 .rd-pn input{height:38px;border:1px solid var(--rl);border-radius:9px;background:var(--rso);padding:0 10px;font-family:inherit;font-weight:800;font-size:14px;color:var(--ri);width:100%;min-width:0;}',
'#hh-ib.ib2 .rd-pn .pal{display:flex;gap:4px;} #hh-ib.ib2 .rd-pn .pal button{width:22px;height:22px;border-radius:50%;border:2px solid transparent;background:var(--k);padding:0;cursor:pointer;} #hh-ib.ib2 .rd-pn .pal button.on{border-color:var(--rs);box-shadow:0 0 0 2px var(--k);}',
'#hh-ib.ib2 .rd-pn .tgw .rd-sw{background:var(--rso);color:var(--rm);border:1px solid var(--rl);} #hh-ib.ib2 .rd-pn .tgw .rd-sw i{background:var(--rl);} #hh-ib.ib2 .rd-pn .tgw .rd-sw.on{color:#23855A;} #hh-ib.ib2 .rd-pn .tgw .rd-sw.on i{background:#23855A;}',
'#hh-ib.ib2 .rd-pn .shp{display:flex;gap:4px;flex-wrap:wrap;} #hh-ib.ib2 .rd-pn .shp button{height:28px;border-radius:8px;border:1px solid var(--rl);background:var(--rs);padding:0 8px;font-family:inherit;font-weight:800;font-size:12px;color:var(--rm);cursor:pointer;text-decoration:line-through;} #hh-ib.ib2 .rd-pn .shp button.on{background:var(--rgb);border-color:var(--rg);color:var(--ri);text-decoration:none;} #hh-ib.ib2 .rd-pn .shp em{font-style:normal;font-size:12.5px;font-weight:800;color:var(--rm);}',
'#hh-ib.ib2 .rd-pn .ed{height:36px;border-radius:9px;border:1px solid var(--rl);background:var(--rs);font-family:inherit;font-weight:800;font-size:13px;color:#8A1538;padding:0 12px;white-space:nowrap;cursor:pointer;display:inline-flex;align-items:center;} #hh-ib.ib2 .rd-pn .ed.na{color:var(--rm);cursor:default;} body.dark-mode #hh-ib.ib2 .rd-pn .ed{color:#E6CE8E;}',
'#hh-ib.ib2 .rd-pn .bt{display:flex;gap:10px;align-items:center;padding:12px 14px;background:var(--rso);font-size:13px;font-weight:800;color:var(--rm);}',
'@media (max-width:1000px){ #hh-ib.ib2 .rd-pn .row{grid-template-columns:30px 44px minmax(0,1fr) auto;} #hh-ib.ib2 .rd-pn .row .pal,#hh-ib.ib2 .rd-pn .row .shp{grid-column:3 / -1;} #hh-ib.ib2 .rd-pn .row .ed{grid-column:3;justify-self:start;} #hh-ib.ib2 .rd-grid{grid-template-columns:repeat(2,minmax(0,1fr));} #hh-ib.ib2 .rd-cats{grid-template-columns:repeat(3,minmax(0,1fr));} }',
'@media (max-width:640px){ #hh-ib.ib2 .rd-doors{gap:8px;} #hh-ib.ib2 .rd-door{padding:12px;gap:10px;} #hh-ib.ib2 .rd-door .ic{width:42px;height:42px;} #hh-ib.ib2 .rd-door .tx b{font-size:17px;} #hh-ib.ib2 .rd-door .tx small{font-size:12px;}',
'  #hh-ib.ib2 .rd-grid{grid-template-columns:minmax(0,1fr);} #hh-ib.ib2 .rd-cats{grid-template-columns:repeat(2,minmax(0,1fr));} #hh-ib.ib2 .rd-grades{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;} #hh-ib.ib2 .rd-grades > span{display:none;}',
'  #hh-ib .rd-dlg .shapes{grid-template-columns:repeat(3,minmax(0,1fr));} #hh-ib .rd-dlg .sh i{width:44px;height:44px;} #hh-ib .rd-dlg .sh b{font-size:12.5px;}',
'  #hh-ib.ib2 .rd-pn .row{grid-template-columns:30px 40px minmax(0,1fr);} #hh-ib.ib2 .rd-pn .row .tgw,#hh-ib.ib2 .rd-pn .row .pal,#hh-ib.ib2 .rd-pn .row .shp,#hh-ib.ib2 .rd-pn .row .ed{grid-column:2 / -1;} #hh-ib.ib2 .rd-pn .ptb{flex-wrap:nowrap;overflow-x:auto;} }',
'@media (prefers-reduced-motion:reduce){ #hh-ib.ib2 .rd-u,#hh-ib .rd-scrim,#hh-ib .rd-dlg{animation:none;} }'
].join('\n');
IB6CSS+='\n'+RD8CSS;

/* ═══ zzzzzzcr، صفحة القوالب: تصفية، وثلاثة أقسام ملونة (الشاشة، الأجهزة، الوسائل التعليمية) ═══ */
var TP8_I={
  box:'<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/>',tv:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 3l4 4 4-4"/>',
  wheel:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M12 3v7M12 14v7M3 12h7M14 12h7"/>',flip:'<rect x="3" y="5" width="8" height="14" rx="1.5"/><rect x="13" y="5" width="8" height="14" rx="1.5"/>',
  check:'<path d="M5 12l5 5L20 7"/>',link:'<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  sort:'<path d="M7 4v16M3 8l4-4 4 4M17 20V4M13 16l4 4 4-4"/>',bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',cloud:'<path d="M7 18a5 5 0 010-10 6 6 0 0111.5 2A4 4 0 0118 18z"/>',
  map:'<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>',line:'<path d="M3 12h18"/><circle cx="6" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="12" r="2"/>',
  abc:'<path d="M4 18l4-12 4 12M5.5 14h5M14 6h4a3 3 0 010 6h-4zM14 12h5a3 3 0 010 6h-5z"/>',odd:'<circle cx="7" cy="7" r="3"/><circle cx="17" cy="7" r="3"/><circle cx="7" cy="17" r="3"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
  cross:'<rect x="3" y="3" width="6" height="6"/><rect x="9" y="3" width="6" height="6"/><rect x="9" y="9" width="6" height="6"/><rect x="9" y="15" width="6" height="6"/><rect x="15" y="9" width="6" height="6"/>',
  mount:'<path d="M3 20l6-10 4 6 3-4 5 8z"/><path d="M14 4v4M14 4l3 1-3 1"/>',timer:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/>',
  dice:'<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.3" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0113 0"/><path d="M16 4.5a3.5 3.5 0 010 7M21.5 20a6.5 6.5 0 00-4-6"/>',score:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  vol:'<path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13"/>',board:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21l4-4 4 4M7 9h6M7 12h9"/>',
  traffic:'<rect x="8" y="2" width="8" height="20" rx="3"/><circle cx="12" cy="7" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="17" r="1.6"/>',
  qr:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3M21 14v7h-4"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',open:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
  mon:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',ph:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',tool:'<path d="M14 4l6 6-11 11H3v-6L14 4z"/>'
};
function tp8S(k){ return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(TP8_I[k]||'')+'</svg>'; }
var TP8_C={m:'#8A1538',b:'#1D5C99',g:'#23855A',y:'#C2862B',p:'#6A42A8',t:'#0E8288',o:'#C0562F',n:'#2C3E73'};
/* [المعرّف، الأيقونة، الاسم، اللون، جديد] ، المعرّف هو قالب TEMPLATES أو أداة */
var TP8={ scr:[['s-boxes','box','صناديق الأسرار','m'],['s-show','tv','المسابقة الكبرى','b'],['s-wheel','wheel','عجلة الأسئلة','y'],['s-flip','flip','البطاقات المقلوبة','n'],['s-tf','check','صح أم خطأ','g'],['s-match','link','التوصيل','t'],['s-memory','grid','بطاقات الذاكرة','p'],['s-order','sort','رتّب الأحداث','o'],
    ['s-map','map','الخريطة الصامتة','t',1],['s-time','line','الخط الزمني','y',1],['s-odd','odd','اختر الدخيل','p',1],['s-word','abc','الكلمة المخفية','m',1],['s-cross','cross','الكلمات المتقاطعة','b',1]],
  dev:[['race','bolt','سباق المُلهم','m'],['tf','check','صح أم خطأ السريع','g'],['cloud','cloud','سحابة الكلمات','y'],['order','sort','رتّب وصنّف','b'],['d-climb','mount','تسلّق القمة','o',1],['d-where','map','أين يقع؟','t',1]],
  tool:[['timer','timer','المؤقت','m'],['pick','dice','الاختيار العشوائي','b'],['groups','users','تقسيم المجموعات','g'],['score','score','لوحة النقاط','y'],['quiet','vol','مقياس الهدوء','p'],['signal','traffic','إشارة العمل','o'],['board','board','السبورة','n'],['qr','qr','رمز الدخول','t']] };
function tp8Ready(id,m){ if(m==='tool') return typeof window.hhTool==='function'&&(!window.hhToolHas||window.hhToolHas(id)); var t=TEMPLATES.filter(function(x){ return x.id===id; })[0]; return !!(t&&t.ready); }
function tp8Hid(id){ var h=(_ib.ready&&_ib.ready.hideTpl)||[]; return h.indexOf(id)>-1; }
function tp8Card(x,m){ var ok=tp8Ready(x[0],m), tool=m==='tool', hid=tp8Hid(x[0]); if(hid&&!isAdm()) return '';
  var act=!ok?'':tool?'hhTool(\''+x[0]+'\')':'hhIbCreate(\''+x[0]+'\')';
  return '<button type="button" class="tp8'+(tool?' tool':'')+(ok?'':' off')+'" style="--c:'+TP8_C[x[3]]+'"'+(ok?' onclick="'+act+'"':' disabled')+'><span class="ic">'+tp8S(x[1])+'</span><span class="tx"><b>'+esc(x[2])+(x[4]&&ok?'<span class="nw">جديد</span>':'')+'</b><small>'+(!ok?'قريباً':tool?'تفتح فوراً':m==='scr'?'على الشاشة':'على الأجهزة')+'</small></span><span class="go">'+tp8S(tool?'open':'plus')+'</span></button>'; }
ib4Rack=function(){
  var F=_ib.tpf||'all';
  var seg='<div class="tp8-seg" role="tablist">'+[['all','الكل'],['scr','على الشاشة'],['dev','على الأجهزة'],['tool','وسائل تعليمية']].map(function(x){ return '<button type="button" role="tab" aria-selected="'+(F===x[0])+'" class="'+(F===x[0]?'on':'')+'" onclick="hhIbTpf(\''+x[0]+'\')">'+x[1]+'</button>'; }).join('')+'</div>';
  function sec(m,ic,t,unit){ var arr=TP8[m], n=arr.filter(function(x){ return tp8Ready(x[0],m)&&(!tp8Hid(x[0])||isAdm()); }).length; return '<div class="tp8-sec"><i>'+tp8S(ic)+'</i><h2>'+t+'</h2><small>'+n+' '+unit+'</small></div><div class="tp8-grid">'+arr.map(function(x){ return tp8Card(x,m); }).join('')+'</div>'; }
  var h='<div class="tp8">'+seg;
  if(F==='all'||F==='scr') h+=sec('scr','mon','على الشاشة',(function(){ var n=TP8.scr.filter(function(x){ return tp8Ready(x[0],'scr'); }).length; return n>2&&n<11?'ألعاب':'لعبة'; })());
  if(F==='all'||F==='dev') h+=sec('dev','ph','على أجهزة الطلاب','ألعاب');
  if(F==='all'||F==='tool') h+=sec('tool','tool','وسائل تعليمية','أدوات');
  return h+'<p class="tp8-sug">عندك فكرة لعبة أو وسيلة؟ <button type="button" onclick="hhIbSuggest()">اقترحها</button></p></div>';
};
window.hhIbTpf=function(f){ _ib.tpf=f; render(); };
var TP8CSS=[
'#hh-ib.ib2 .tp8{--rs:#fff;--rso:#FAF6EE;--rl:#E7DCC6;--ri:#3D0918;--rm:#7A6A54;--rgb:#FBF1DA;}',
'body.dark-mode #hh-ib.ib2 .tp8{--rs:#22121A;--rso:#2A1720;--rl:#3E2C24;--ri:#F5E6C4;--rm:#B8A68A;--rgb:#3A2A10;}',
'#hh-ib.ib2 .tp8-seg{display:inline-flex;background:var(--rs);border:1px solid var(--rl);border-radius:12px;padding:3px;margin-bottom:18px;max-width:100%;overflow-x:auto;scrollbar-width:none;}',
'#hh-ib.ib2 .tp8-seg button{border:0;background:none;color:var(--rm);font-family:Cairo,sans-serif;font-weight:800;font-size:14px;padding:8px 14px;border-radius:9px;white-space:nowrap;cursor:pointer;}',
'#hh-ib.ib2 .tp8-seg button.on{background:#5E0E26;color:#fff;}',
'#hh-ib.ib2 .tp8-sec{display:flex;align-items:center;gap:10px;margin:6px 0 12px;} #hh-ib.ib2 .tp8-sec i{width:30px;height:30px;border-radius:9px;background:var(--rgb);color:#8A6D2E;display:grid;place-items:center;} #hh-ib.ib2 .tp8-sec i svg{width:17px;height:17px;}',
'#hh-ib.ib2 .tp8-sec h2{margin:0;font-size:18px;font-weight:900;color:var(--ri);} #hh-ib.ib2 .tp8-sec small{font-size:13px;font-weight:700;color:var(--rm);}',
'#hh-ib.ib2 .tp8-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:26px;}',
'#hh-ib.ib2 .tp8{position:relative;} #hh-ib.ib2 button.tp8{position:relative;display:flex;align-items:center;gap:12px;border:1px solid var(--rl);background:var(--rs);border-radius:16px;padding:12px;text-align:start;color:var(--ri);min-width:0;transition:transform .12s,box-shadow .12s,border-color .12s;overflow:hidden;font-family:Cairo,sans-serif;cursor:pointer;}',
'#hh-ib.ib2 button.tp8:not(.off):hover{transform:translateY(-2px);box-shadow:0 10px 24px color-mix(in srgb,var(--c) 22%,transparent);border-color:var(--c);}',
'#hh-ib.ib2 button.tp8 .ic{width:52px;height:52px;border-radius:14px;background:var(--c);color:#fff;display:grid;place-items:center;flex-shrink:0;box-shadow:inset 0 -3px 0 rgba(0,0,0,.15);} #hh-ib.ib2 button.tp8 .ic svg{width:26px;height:26px;}',
'#hh-ib.ib2 button.tp8 .tx{min-width:0;flex:1;} #hh-ib.ib2 button.tp8 b{display:block;font-size:15.5px;font-weight:900;line-height:1.35;} #hh-ib.ib2 button.tp8 small{font-size:12.5px;font-weight:700;color:var(--rm);}',
'#hh-ib.ib2 button.tp8 .go{width:34px;height:34px;border-radius:10px;background:color-mix(in srgb,var(--c) 12%,var(--rs));color:var(--c);display:grid;place-items:center;flex-shrink:0;} #hh-ib.ib2 button.tp8 .go svg{width:17px;height:17px;}',
'#hh-ib.ib2 button.tp8:not(.off):hover .go{background:var(--c);color:#fff;}',
'#hh-ib.ib2 button.tp8 .nw{display:inline-block;vertical-align:middle;margin-inline-start:6px;font-size:10.5px;font-weight:900;color:#fff;background:#C0562F;border-radius:20px;padding:0 8px;line-height:18px;}',
'#hh-ib.ib2 button.tp8.tool .ic{border-radius:50%;}',
'#hh-ib.ib2 button.tp8.off{cursor:default;} #hh-ib.ib2 button.tp8.off .ic{filter:saturate(.25);opacity:.55;} #hh-ib.ib2 button.tp8.off .go{opacity:.35;}',
'#hh-ib.ib2 .tp8-sug{font-size:13.5px;font-weight:700;color:var(--rm);} #hh-ib.ib2 .tp8-sug button{border:0;background:none;color:#8A1538;font-family:Cairo,sans-serif;font-weight:900;cursor:pointer;text-decoration:underline;} body.dark-mode #hh-ib.ib2 .tp8-sug button{color:#E6CE8E;}',
'@media (max-width:1000px){ #hh-ib.ib2 .tp8-grid{grid-template-columns:repeat(2,minmax(0,1fr));} }',
'@media (max-width:560px){ #hh-ib.ib2 .tp8-grid{grid-template-columns:minmax(0,1fr);} }',
'@media (prefers-reduced-motion:reduce){ #hh-ib.ib2 button.tp8{transition:none;} }'
].join('\n');
IB6CSS+='\n'+TP8CSS;

/* ═══ zzzzzzcy، أقسام «الإبداع»: الأنشطة العامة | الأنشطة الإبداعية المدرسية ═══ */
function cySv(p,s){ return '<svg viewBox="0 0 24 24" width="'+(s||22)+'" height="'+(s||22)+'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'; }
var CYI={pub:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',sch:'<path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-5h6v5"/>',trophy:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',tag:'<path d="M3 12V3h9l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',hand:'<path d="M11 17l-1.5 1.5a2.1 2.1 0 0 1-3-3L8 14"/><path d="M14 7l2-2a3 3 0 0 1 4.5 4L17 12.5a2.2 2.2 0 0 1-3.2 0L13 11.7"/><path d="M8 14l5-5"/>',play:'<path d="M7 4v16l13-8z"/>'};
function cyClean(s){ return String(s||'').replace(/\s+[-–—]\s+/g,'، ').replace(/\s*·\s*/g,'، ').trim(); }
function cyHidden(){ try{ return JSON.parse(localStorage.getItem('hh_hidden_cats')||'[]'); }catch(e){ return []; } }
function cyLevel(id){ try{ return (typeof CAT_LEVELS!=='undefined'?CAT_LEVELS:[]).filter(function(l){ return l.id===id; })[0]||null; }catch(e){ return null; } }
function cyGroup(gid){ try{ return (typeof CAT_GROUPS!=='undefined'?CAT_GROUPS:[]).filter(function(g){ return g.id===gid; })[0]||null; }catch(e){ return null; } }
function cyQn(c){ try{ return (typeof QDB!=='undefined'&&QDB[c])?QDB[c].length:0; }catch(e){ return 0; } }
function cyOrg(gid){ if(/^ajyal/.test(gid)) return 'مركز أجيال'; if(/^wellbeing/.test(gid)) return 'مركز الحياة الطيبة'; if(/^perf/.test(gid)) return 'بيرف آب'; if(/^mprog/.test(gid)) return 'المُلهم'; return ''; }
function cyComps(){ var L=cyLevel('competitions'), H=cyHidden(), out=[], seen={};
  try{ if(typeof _hhEnsurePartnerQs==='function') _hhEnsurePartnerQs(); }catch(e){}
  ((L&&L.groupIds)||[]).forEach(function(gid){ var g=cyGroup(gid); if(!g) return; (g.cats||[]).forEach(function(c){ if(seen[c]||H.indexOf(c)>-1) return; var n=cyQn(c); if(!n) return; seen[c]=1; out.push({cat:c,gid:gid,n:n,org:cyOrg(gid)}); }); });
  return out; }
function cyGroups(lv){ var L=cyLevel(lv), H=cyHidden();
  return ((L&&L.groupIds)||[]).map(cyGroup).filter(function(g){ return g&&g.id!=='custom'; }).map(function(g){ var cs=(g.cats||[]).filter(function(c){ return H.indexOf(c)===-1&&cyQn(c)>0; }); return {gid:g.id,t:cyClean(g.label||g.id).replace(/،\s*شريك$/,''),n:cs.length}; }).filter(function(x){ return x.n>0; }); }
var CYSEC=[
  {k:'pub',t:'الأنشطة العامة',s:'مسابقات جاهزة للفعاليات والمجالس والأسرة',c:'#1F4E79',c1:'#E4ECF5',cd:'#93B8DE'},
  {k:'sch',t:'الأنشطة الإبداعية المدرسية',s:'ألعاب من المنهج للحصة، جاهزة أو من تصميمك',c:'#3D6B53',c1:'#E6F0EA',cd:'#93C7A8'}
];
function cySecN(k){ if(k==='pub'){ var n=cyComps().length; return n===1?'مسابقة واحدة':n===2?'مسابقتان':(n>2&&n<11)?n+' مسابقات':n+' مسابقة'; }
  var m=TEMPLATES.filter(function(x){ return x.ready; }).length; return m===1?'قالب واحد':m===2?'قالبان':(m>2&&m<11)?m+' قوالب':m+' قالباً'; }
function cySecBar(){ var cur=_ib.sec==='pub'?'pub':'sch';
  return '<div class="cy-tabs" role="tablist" aria-label="أقسام الإبداع">'+CYSEC.map(function(s){ var on=s.k===cur;
    return '<button type="button" role="tab" aria-selected="'+on+'" class="cy-tab'+(on?' on':'')+'" data-sec="'+s.k+'" style="--k:'+s.c+';--k1:'+s.c1+';--kd:'+s.cd+'" onclick="hhIbSection(\''+s.k+'\')"><i>'+cySv(CYI[s.k])+'</i><span class="tx"><b>'+s.t+'</b><small>'+s.s+'</small></span><em>'+cySecN(s.k)+'</em></button>'; }).join('')+'</div>'; }
function cyPub(){ var C=cyComps(), G=cyGroups('general'), PR=cyGroups('partners'), s=CYSEC[0];
  var h='<div class="cy-panel" style="--k:'+s.c+';--k1:'+s.c1+';--kd:'+s.cd+'"><div class="cy-pnh"><h2>'+s.t+'</h2><p>'+s.s+'</p></div>';
  h+='<div class="cy-sub first">'+cySv(CYI.trophy,18)+'المسابقات الجاهزة <small>تُلعب على الشاشة بالفرق</small></div>';
  h+=C.length?'<div class="cy-g3">'+C.map(function(x){ var qn=x.n>2&&x.n<11?x.n+' أسئلة':x.n+' سؤالاً';
      return '<div class="cy-c"><div class="t"><span>'+cySv(CYI.trophy,19)+'</span><b>'+esc(cyClean(x.cat))+'</b></div><small>'+qn+(x.org?'، '+esc(x.org):'')+'</small><div class="ac"><button type="button" class="cy-b" data-cat="'+esc(x.cat)+'" onclick="hhIbPubComp(this.getAttribute(\'data-cat\'))">'+cySv(CYI.play,13)+'ابدأ المسابقة</button></div></div>'; }).join('')+'</div>'
    :'<div class="rl-soon">المسابقات قيد التحميل</div>';
  if(G.length) h+='<div class="cy-sub">'+cySv(CYI.tag,18)+'فئات عامة <small>تختار منها وتبني لعبتك</small></div><div class="cy-chips">'+G.map(function(g){ return '<button type="button" class="cy-ch" onclick="hhIbPubCat(\'general\',\''+esc(g.gid)+'\')">'+esc(g.t)+'<em>'+g.n+'</em></button>'; }).join('')+'</div>';
  if(PR.length) h+='<div class="cy-sub">'+cySv(CYI.hand,18)+'فئات الشركاء <small>أسئلة أعدّتها الجهات الشريكة</small></div><div class="cy-chips">'+PR.map(function(g){ return '<button type="button" class="cy-ch" onclick="hhIbPubCat(\'partners\',\''+esc(g.gid)+'\')">'+esc(g.t)+'<em>'+g.n+'</em></button>'; }).join('')+'</div>';
  return h+'</div>'; }
function cyAfter(){ var ov=document.getElementById('hh-ib'); if(!ov) return;
  var bc=ov.querySelector('.gvh-bc'); var cur=CYSEC.filter(function(s){ return s.k===(_ib.sec==='pub'?'pub':'sch'); })[0];
  if(bc&&_ib.view!=='editor'){ var want='الإبداع › '+cur.t; if(bc.getAttribute('data-cy')!==want){ bc.setAttribute('data-cy',want); bc.innerHTML='<button type="button" onclick="hhGvGo(\'home\')">الرئيسية</button> › <button type="button" onclick="hhIbSection(\'sch\')">الإبداع</button> › '+cur.t; } }
  var tb=ov.querySelector('.cy-tabs'), on=tb&&tb.querySelector('.cy-tab.on');
  if(tb&&on&&tb.scrollWidth>tb.clientWidth+2){ var tr=tb.getBoundingClientRect(), r=on.getBoundingClientRect(); if(r.left<tr.left+8||r.right>tr.right-8){ tb.scrollLeft+= (r.left+r.width/2)-(tr.left+tr.width/2); } } }
function cyGoSetup(tab,after){ try{ if(window.hhCloseFramedOverlays) hhCloseFramedOverlays(); }catch(e){} close();
  try{ if(typeof hhStartGameNow==='function') hhStartGameNow(); else if(typeof hhNavigate==='function') hhNavigate('screen-setup'); }catch(e){}
  var n=0; (function step(){ var g=document.getElementById('ms-cat-grid'); if(!g&&++n<25){ setTimeout(step,120); return; }
    try{ if(typeof msSwitchTab==='function') msSwitchTab(tab); }catch(e){}
    setTimeout(function(){ try{ if(after) after(document.getElementById('ms-cat-grid')); }catch(e){} },260); })(); }
window.hhIbPubComp=function(cat){ cyGoSetup('competitions',function(g){ if(!g) return; var b=[].slice.call(g.querySelectorAll('.cat-btn')).filter(function(x){ return x.dataset.cat===cat; })[0]; if(b&&!b.classList.contains('active')) b.click(); if(b&&b.scrollIntoView) b.scrollIntoView({block:'center'}); }); };
window.hhIbPubCat=function(lv,gid){ cyGoSetup(lv==='partners'?'partners':'general',function(g){ if(!g||!gid) return; var c=[].slice.call(g.querySelectorAll('[data-sxg]')).filter(function(x){ return x.getAttribute('data-sxg')===gid; })[0]; if(c){ c.click(); return; }
  var hd=[].slice.call(g.querySelectorAll('.cat-btn')).filter(function(x){ return x.dataset.group===gid; })[0]; if(hd&&hd.scrollIntoView) hd.scrollIntoView({block:'center'}); }); };
window.hhIbSection=function(sec){ sec=sec==='pub'?'pub':'sch'; _ib.sec=sec;
  var ov=document.getElementById('hh-ib');
  if(!ov){ open('rack'); return; }
  if(_ib.view==='editor'){ try{ flushOwn(); }catch(e){} try{ flushReady(); }catch(e){} _ib.readyGame=null; _ib.view='rack'; }
  render(); try{ ov.scrollTop=0; }catch(e){} };
var CYCSS=[
'#hh-ib.ib2 .cy-tabs{--cs:#fff;--cl:#E9E1D1;--ch:#3D0918;--cm:#7A7062;--cb:#F5F4F2;position:sticky;top:0;z-index:6;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;padding:12px 0 14px;margin:-6px 0 6px;background:var(--cb);}',
'body.dark-mode #hh-ib.ib2 .cy-tabs{--cs:#22121A;--cl:#3E2C24;--ch:#F5E6C4;--cm:#B8A68A;--cb:#160A0F;}',
'#hh-ib.ib2 .cy-tab{all:unset;cursor:pointer;box-sizing:border-box;display:flex;gap:12px;align-items:center;min-width:0;background:var(--cs);border:1.5px solid var(--cl);border-radius:18px;padding:12px 14px;position:relative;font-family:Cairo,sans-serif;transition:border-color .2s,box-shadow .2s;}',
'#hh-ib.ib2 .cy-tab:hover{border-color:var(--k);} #hh-ib.ib2 .cy-tab:focus-visible{outline:3px solid #B8924A;outline-offset:2px;}',
'#hh-ib.ib2 .cy-tab i{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;background:var(--k1);color:var(--k);flex-shrink:0;} #hh-ib.ib2 .cy-tab i svg{width:22px;height:22px;}',
'#hh-ib.ib2 .cy-tab .tx{min-width:0;flex:1;} #hh-ib.ib2 .cy-tab b{display:block;font-size:16px;font-weight:900;color:var(--ch);line-height:1.4;} #hh-ib.ib2 .cy-tab small{display:block;font-size:12.5px;font-weight:700;color:var(--cm);line-height:1.6;}',
'#hh-ib.ib2 .cy-tab em{font-style:normal;margin-inline-start:auto;font-size:12px;font-weight:900;color:var(--k);background:var(--k1);border-radius:999px;padding:3px 10px;white-space:nowrap;flex-shrink:0;}',
'#hh-ib.ib2 .cy-tab.on{border-color:var(--k);box-shadow:0 12px 26px -18px var(--k);}',
'#hh-ib.ib2 .cy-tab.on::after{content:"";position:absolute;bottom:-8px;right:50%;width:14px;height:14px;background:var(--cs);border-right:1.5px solid var(--k);border-bottom:1.5px solid var(--k);transform:translateX(50%) rotate(45deg);}',
'body.dark-mode #hh-ib.ib2 .cy-tab{--k:var(--kd) !important;} body.dark-mode #hh-ib.ib2 .cy-tab i,body.dark-mode #hh-ib.ib2 .cy-tab em{background:#2E1A22;}',
'#hh-ib.ib-pub .gvh-act{display:none !important;}',
'#hh-ib.ib2 .cy-tabs + .ib4-seg{margin-bottom:10px;}',
'#hh-ib.ib2 .cy-panel{--cs:#fff;--cl:#E9E1D1;--ch:#3D0918;--cm:#7A7062;--cb:#FAF7F1;margin-top:8px;background:var(--cs);border:1px solid var(--cl);border-top:4px solid var(--k);border-radius:24px;padding:20px 22px 24px;}',
'body.dark-mode #hh-ib.ib2 .cy-panel{--cs:#22121A;--cl:#3E2C24;--ch:#F5E6C4;--cm:#B8A68A;--cb:#2A1720;--k:var(--kd) !important;}',
'#hh-ib.ib2 .cy-pnh{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;margin-bottom:8px;} #hh-ib.ib2 .cy-pnh h2{margin:0;font-size:21px;font-weight:900;color:var(--ch);} #hh-ib.ib2 .cy-pnh p{margin:0;font-size:13.5px;font-weight:700;color:var(--cm);}',
'#hh-ib.ib2 .cy-sub{margin:22px 0 10px;font-size:15px;font-weight:900;color:var(--ch);display:flex;gap:8px;align-items:center;flex-wrap:wrap;} #hh-ib.ib2 .cy-sub.first{margin-top:10px;} #hh-ib.ib2 .cy-sub svg{color:var(--k);flex-shrink:0;} #hh-ib.ib2 .cy-sub small{font-size:12.5px;color:var(--cm);font-weight:700;}',
'#hh-ib.ib2 .cy-g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;}',
'#hh-ib.ib2 .cy-c{background:var(--cb);border:1px solid var(--cl);border-radius:18px;padding:14px;display:flex;flex-direction:column;gap:6px;min-width:0;}',
'#hh-ib.ib2 .cy-c .t{display:flex;gap:10px;align-items:center;min-width:0;} #hh-ib.ib2 .cy-c .t span{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:var(--k1);color:var(--k);flex-shrink:0;}',
'body.dark-mode #hh-ib.ib2 .cy-c .t span{background:#3A2530;}',
'#hh-ib.ib2 .cy-c b{font-size:15px;font-weight:900;color:var(--ch);line-height:1.5;min-width:0;} #hh-ib.ib2 .cy-c small{font-size:12.5px;font-weight:700;color:var(--cm);line-height:1.7;}',
'#hh-ib.ib2 .cy-c .ac{margin-top:auto;padding-top:6px;display:flex;}',
'#hh-ib.ib2 .cy-b{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:6px;font-family:Cairo,sans-serif;font-size:13px;font-weight:900;border-radius:10px;padding:7px 14px;background:#1F4E79;color:#fff;} #hh-ib.ib2 .cy-b:hover{filter:brightness(1.12);} #hh-ib.ib2 .cy-b:focus-visible{outline:3px solid #B8924A;outline-offset:2px;}',
'body.dark-mode #hh-ib.ib2 .cy-b{background:#2D6296;}',
'#hh-ib.ib2 .cy-chips{display:flex;gap:10px;flex-wrap:wrap;}',
'#hh-ib.ib2 .cy-ch{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:8px;background:var(--cb);border:1px solid var(--cl);border-radius:999px;padding:8px 14px;font-family:Cairo,sans-serif;font-size:13.5px;font-weight:800;color:var(--ch);} #hh-ib.ib2 .cy-ch:hover{border-color:var(--k);}',
'#hh-ib.ib2 .cy-ch em{font-style:normal;font-size:11.5px;font-weight:900;color:var(--k);background:var(--k1);border-radius:99px;padding:0 8px;} body.dark-mode #hh-ib.ib2 .cy-ch em{background:#3A2530;}',
'@media (max-width:1000px){ #hh-ib.ib2 .cy-g3{grid-template-columns:repeat(2,minmax(0,1fr));} }',
'@media (max-width:900px){',
' #hh-ib.ib2 .cy-tabs{display:flex;overflow-x:auto;gap:8px;margin:-6px -14px 4px;padding:8px 14px 10px;scrollbar-width:none;} #hh-ib.ib2 .cy-tabs::-webkit-scrollbar{display:none;}',
' #hh-ib.ib2 .cy-tab{flex:0 0 auto;padding:8px 12px;border-radius:14px;gap:8px;} #hh-ib.ib2 .cy-tab small,#hh-ib.ib2 .cy-tab em{display:none;} #hh-ib.ib2 .cy-tab i{width:32px;height:32px;border-radius:10px;} #hh-ib.ib2 .cy-tab i svg{width:18px;height:18px;} #hh-ib.ib2 .cy-tab b{font-size:14px;white-space:nowrap;}',
' #hh-ib.ib2 .cy-tab.on::after{display:none;} #hh-ib.ib2 .cy-tab.on{background:var(--k);border-color:var(--k);} #hh-ib.ib2 .cy-tab.on b{color:#fff;} #hh-ib.ib2 .cy-tab.on i{background:rgba(255,255,255,.2);color:#fff;}',
' body.dark-mode #hh-ib.ib2 .cy-tab.on{background:color-mix(in srgb,var(--kd) 30%,#22121A);} ',
' #hh-ib.ib2 .cy-panel{padding:16px;border-radius:20px;} #hh-ib.ib2 .cy-g3{grid-template-columns:minmax(0,1fr);}',
'}'
].join('\n');
IB6CSS+='\n'+CYCSS;
window.hhIbOpen=function(v,id){ _ib.sec='sch'; open(v,id); };
window.hhIbRefresh=function(){ _ib.loaded=false; if(document.getElementById('hh-ib')) open(_ib.view==='editor'?'mine':_ib.view); };
window._hhIb=_ib; window._hhIbTemplates=TEMPLATES; window._hhIbGetGame=getGame; window._hhIbReadyList=readyList; window._hhIbBuildReady=buildReady;
})();
