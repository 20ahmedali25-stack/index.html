/* ============================================================
   المُلهم التعليمي — إبداع · استوديو الألعاب التعليمية
   almulhimedu.org
   ------------------------------------------------------------
   القوالب · ألعاب جاهزة · ألعابي · المحرر (ثلاثة أعمدة) · الاستيراد
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
  {id:'weekly', name:'تحدي الأسبوع', kind:'async', ready:false, ico:'target', bg:'linear-gradient(135deg,#4A0B1E,#2A0810)', desc:'اختبار برابط ومهلة، يُحل من البيت، والنتائج تدخل ملف الطالب ودفتر المتابعة.'},
  {id:'cards', name:'بطاقات المراجعة', kind:'async', ready:false, ico:'grid', bg:'linear-gradient(135deg,#7A1330,#4A0B1E)', desc:'بطاقات مصطلحات من الدرس يراجعها الطالب بنظام التكرار المتباعد.'}
];
var SCR={ boxes:{name:'صناديق الأسرار', types:['mcq','tf','open']}, show:{name:'المسابقة الكبرى', types:['mcq','tf']}, wheel:{name:'عجلة الأسئلة', types:['mcq','tf','open']}, flip:{name:'البطاقات المقلوبة', types:['mcq','tf','open']}, tfs:{name:'صح أم خطأ على الشاشة', types:['tf']} };
window.HH_SCR_TPL=SCR;
var SOON_SCR='التوصيل · بطاقات الذاكرة · رتّب الأحداث · الفرز في مجموعات · الخريطة الصمّاء · الكلمة الناقصة · خمّن الكلمة';

function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function toastX(m,k){ if(typeof toast==='function') toast(m,k||'info'); }
function uid(){ try{ return (firebase.auth().currentUser||{}).uid||''; }catch(e){ return ''; } }
function db(){ return firebase.firestore(); }
function isAdm(){ try{ return typeof hhIsAdmin==='function'&&!!hhIsAdmin(); }catch(e){ return false; } }
function canUse(){ try{ return isAdm() || (typeof _hhMyRole!=='undefined'&&_hhMyRole==='teacher'); }catch(e){ return false; } }
function newId(p){ return (p||'g')+'_'+Date.now().toString(36)+Math.random().toString(36).slice(2,6); }
function clone(o){ return JSON.parse(JSON.stringify(o)); }
function ico(n,sz,sw){
  var P={clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',check:'<path d="M20 6L9 17l-5-5"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>',
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
    book:'<path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/>',save:'<path d="M5 12l5 5L20 7"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',download:'<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',send:'<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>'};
  var s=sz||16; return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(sw||2)+'" stroke-linecap="round" stroke-linejoin="round">'+(P[n]||'')+'</svg>';
}
window._hhIbIco=ico;

/* ── التخزين ── */
function loadLocal(){ try{ _ib.games=JSON.parse(localStorage.getItem('hh_ib_games')||'[]')||[]; }catch(e){ _ib.games=[]; } }
function saveLocal(){ try{ localStorage.setItem('hh_ib_games', JSON.stringify(_ib.games)); }catch(e){ toastX('مساحة الجهاز ممتلئة · قلّل الصور في الأسئلة','error'); } }
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
  clearTimeout(_ib.saveT);
  var doIt=async function(){
    var u=uid();
    if(!u){ markSaved(true,'local'); return; }
    try{ g.ownerUid=u; try{ g.ownerEmail=firebase.auth().currentUser.email||''; }catch(e){}
      await db().collection('games').doc(g.id).set(g,{merge:false}); markSaved(); }
    catch(e){ markSaved(true, (e&&e.code)); }
  };
  if(now) doIt(); else _ib.saveT=setTimeout(doIt, 500);
}
function markDirty(){ var e=document.getElementById('ib-save'); if(e){ e.innerHTML='جارٍ الحفظ…'; e.style.color='#8A6D2E'; e.style.background='#FBF1E0'; } }
function markSaved(err, code){ var e=document.getElementById('ib-save'); if(!e) return;
  if(err){ e.innerHTML=code==='local'?'حُفظ على الجهاز · سجّل الدخول للمزامنة':('حُفظ على الجهاز · تعذّرت المزامنة'+(code&&String(code).indexOf('permission')>-1?' (انشر قاعدة Firestore)':'')); e.style.color='#B3261E'; e.style.background='#FCEEEC'; }
  else { e.innerHTML=ico('save',14)+' حُفظ قبل ثوانٍ'; e.style.color='#2F6A4E'; e.style.background='#EEF4F0'; } }

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
  st.textContent+='\n'+E2CSS;
  document.head.appendChild(st);
}

/* ── الفتح ── */
async function open(view, gameId){
  style();
  try{ document.body.classList.remove('hh-immersive'); }catch(e){}
  var old=document.getElementById('hh-ib'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-ib'; ov.className='ib2';
  ov.innerHTML='<div class="ib2-hero"><span class="ib2-hi">'+ico('star',30)+'</span><div style="position:relative;z-index:1"><h1>إبداع · استوديو الألعاب التعليمية</h1><p>أنشئ لعبتك أو اختر لعبة جاهزة، وشغّلها مباشرة على أجهزة الطلاب أو اعرضها على شاشة الصف</p></div><div class="ib2-hx"><button class="ib2-btn g" onclick="hhIbView(\'ready\')">'+ico('play',16)+' ألعاب جاهزة</button></div></div><div class="top"><button class="tb" onclick="hhIbBack()">'+ico('back')+' رجوع</button><div style="text-align:center;"><b>إبداع</b></div><span id="ib-save"></span></div><div class="wrap" id="ib-body"></div>';
  document.body.appendChild(ov);
  try{ if(window.hhNavMark) hhNavMark('ib'); }catch(e){}
  loadLocal(); loadReadyLocal();
  _ib.view=view||'rack'; _ib.gameId=gameId||null;
  render();
  if(!_ib.loaded){ await Promise.all([loadCloud(), loadReadyCloud()]); _ib.loaded=true; render(); }
}
function close(){ var e=document.getElementById('hh-ib'); if(e) e.remove(); try{ document.body.classList.remove('hh-immersive'); }catch(e){} try{ if(window.hhNavMark) hhNavMark(null); }catch(e){} }
window.hhIbClose=close;
window.hhIbBack=function(){ if(_ib.view==='editor'){ var wasReady=!!_ib.readyGame; flushReady(); _ib.readyGame=null; _ib.view=wasReady?'ready':'mine'; render(); } else close(); };

function render(){
  var b=document.getElementById('ib-body'); if(!b) return;
  var _ov=document.getElementById('hh-ib'); if(_ov) _ov.classList.toggle('ib-editing', _ib.view==='editor');
  if(_ib.view==='editor'){ b.innerHTML=renderEditor(); bindEditor(); try{ _ov.scrollTop=_ov.scrollTop; }catch(e){} return; }
  var _cnt={rack:TEMPLATES.filter(function(t){return t.ready;}).length, ready:readyList().length, mine:_ib.games.length};
  var tabs='<div class="tabs ib2-seg">'+[['rack','القوالب'],['ready',ico('star',15)+' ألعاب جاهزة'],['mine','ألعابي'],['live',ico('bolt',15)+' مباشرة'],['screen',ico('monitor',15)+' على شاشة الصف']].map(function(t){ return '<button class="'+(_ib.view===t[0]?'on':'')+'" onclick="hhIbView(\''+t[0]+'\')">'+t[1]+(_cnt[t[0]]!=null?' <em>'+_cnt[t[0]]+'</em>':'')+'</button>'; }).join('')+'</div>';
  if(_ib.view==='mine'){ b.innerHTML=tabs+renderMine(); return; }
  if(_ib.view==='ready'){ b.innerHTML=tabs+renderReady(); return; }
  var kind=(_ib.view==='live')?'live':(_ib.view==='screen')?'screen':null;
  var how=(_ib.view==='rack')?'<div class="ib2-how"><div><b>1</b>اختر قالباً أو لعبة جاهزة</div><div><b>2</b>أضف أسئلتك أو استوردها من الفئات أو من ملف</div><div><b>3</b>شغّلها مباشرة أو اعرضها على الشاشة</div></div>':'';
  var groups=kind?[kind]:['live','screen','async'];
  var GN={live:'قوالب مباشرة · على أجهزة الطلاب',screen:'قوالب شاشة الصف · بلا أجهزة',async:'قوالب غير متزامنة'};
  var html=tabs+how;
  groups.forEach(function(k){
    var shown=TEMPLATES.filter(function(t){ return t.kind===k; }); if(!shown.length) return;
    var rd=shown.filter(function(t){ return t.ready; }).length, sn=shown.length-rd;
    html+='<div class="ib2-sec"><h2>'+GN[k]+'</h2><small>'+(rd?rd+' جاهزة الآن':'')+(sn?(rd?' · ':'')+sn+' قريباً':'')+'</small></div>';
    if(k==='screen') html+='<div class="ib2-soonline">قريباً على الشاشة: '+SOON_SCR+'</div>';
    html+='<div class="grid ib2-grid">'+shown.map(tplCard).join('')+(k===groups[groups.length-1]?'<div class="card ib2-new"><span class="si">'+ico('plus',28)+'</span><b>عندك فكرة قالب؟</b><p>ألغاز الخريطة، البحث عن الكنز، الجدار التعاوني…</p><button class="btn" onclick="hhIbSuggest()">اقترح فكرة</button></div>':'')+'</div>';
  });
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
function renderMine(){
  var games=_ib.games.slice().sort(function(a,b){ return (b.updatedAt||0)-(a.updatedAt||0); });
  var html='<div class="sec">ألعابي · '+games.length+'</div>';
  if(!games.length) html+='<div class="empty">لا ألعاب بعد.<br>ابدأ من القوالب أو انسخ لعبة جاهزة إلى ألعابك.</div>';
  games.forEach(function(g){
    var n=(g.questions||[]).length; var st=g.status||'draft'; var scr=modeOf(g)==='screen';
    html+='<div class="line"><span class="t">'+esc(g.title||'بلا عنوان')+'<span class="sb">'+(scr?'على شاشة الصف · ':'مباشر · ')+esc(tplName(g))+' · '+n+' سؤالاً · '+new Date(g.updatedAt||Date.now()).toLocaleDateString('en-GB')+'</span></span>'
      +'<span class="pill '+(st==='ready'?'live':'draft')+'">'+(st==='ready'?'جاهزة':'مسودة')+'</span>'
      +(scr?'<button class="btn g" style="flex:0 0 auto;" '+(n?'':'disabled')+' onclick="hhIbShow(\''+g.id+'\')">'+ico('monitor',13)+' اعرض على الشاشة</button>'
           :'<button class="btn g" style="flex:0 0 auto;" '+(n?'':'disabled')+' onclick="hhIbRun(\''+g.id+'\')">'+ico('play',13)+' تشغيل مباشر</button>')
      +'<button class="btn" style="flex:0 0 auto;" onclick="hhIbEdit(\''+g.id+'\')">'+ico('edit',13)+' تعديل</button>'
      +'<button class="btn" style="flex:0 0 auto;" onclick="hhIbDup(\''+g.id+'\')">'+ico('copy',13)+' نسخ</button>'
      +'<button class="btn d" style="flex:0 0 auto;" onclick="hhIbDel(\''+g.id+'\')">'+ico('trash',13)+'</button></div>';
  });
  var sess=_ib.sessions.filter(function(s){ return s.state!=='ended'; });
  html+='<div class="sec">جولات مباشرة يمكن إكمالها · '+sess.length+'</div>';
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
function defSettings(tid){ return { hideRank:'last', hideLastN:5, scoring:'speed', shuffleQ:false, shuffleOpts:true, showAnswerEach:true, defaultTime:(tid==='tf'||tid==='s-tf'?10:20), teams:2, basePts:20 }; }
window.hhIbCreate=function(tid){
  if(!canUse()){ toastX('سجّل الدخول بحساب المعلم أولاً','error'); return; }
  var t=TEMPLATES.filter(function(x){ return x.id===tid; })[0]; if(!t||!t.ready) return;
  var g={ id:newId('g'), template:(t.kind==='screen'?(t.scr==='tfs'?'tf':'race'):tid), mode:(t.kind==='screen'?'screen':'live'), screenTpl:(t.scr||'boxes'), title:t.name+' · '+new Date().toLocaleDateString('en-GB'), status:'draft', createdAt:Date.now(), updatedAt:Date.now(), settings:defSettings(tid), questions:[] };
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
  var qs=(g.questions||[]).filter(function(q){ return q.type!=='open'; });
  if(!qs.length){ toastX('لا أسئلة صالحة للتشغيل المباشر · الأسئلة المقالية تُعرض على الشاشة فقط','info'); return; }
  if(!uid()){ toastX('سجّل الدخول بحساب المعلم لبدء جولة مباشرة','error'); return; }
  if(typeof hhLiveHost!=='function'){ toastX('وحدة التشغيل المباشر غير محمّلة · تأكد من رفع almulhim-live.js','error'); return; }
  var c=clone(g); c.questions=qs; if(!c.id) c.id=newId('g'); close(); hhLiveHost(c);
}
function screenRun(g){
  var qs=(g.questions||[]).filter(function(q){ return complete(q); });
  if(!qs.length){ toastX('أكمل سؤالاً واحداً على الأقل','info'); return; }
  if(typeof hhScreenPlay!=='function'){ toastX('وحدة العرض على الشاشة غير محمّلة · تأكد من رفع almulhim-ibdaa-screen.js','error'); return; }
  var c=clone(g); c.questions=qs; hhScreenPlay(c);
}
window.hhIbRun=function(id){ var g=(_ib.readyGame&&_ib.readyGame.id===id)?_ib.readyGame:getGame(id); if(!g||!(g.questions||[]).length){ toastX('أضف أسئلة أولاً','info'); return; } liveRun(g); };
window.hhIbShow=function(id){ var g=(_ib.readyGame&&_ib.readyGame.id===id)?_ib.readyGame:getGame(id); if(!g||!(g.questions||[]).length){ toastX('أضف أسئلة أولاً','info'); return; } screenRun(g); };

/* ── المحرر (ثلاثة أعمدة) ── */
var LET=['أ','ب','ج','د']; var OC=['#8A1538','#3D6B53','#8A6D2E','#1F4E79']; var OS=['◆','●','▲','■'];
function cur(){ return _ib.readyGame || getGame(_ib.gameId); }
function blankQ(g, type){
  var S=(g&&g.settings)||{}; var t=type||(g.template==='cloud'?'poll':g.template==='order'?'order':(g.template==='tf'||g.screenTpl==='tfs')?'tf':(g._ready&&g._ready.kind==='open')?'open':'mcq');
  var base={ id:newId('q'), type:t, q:'', time:S.defaultTime||(t==='tf'?10:20), mult:1, flash:false, note:'' };
  if(t==='poll'){ base.opts=[]; base.correct=[]; base.time=30; }
  else if(t==='order'){ base.opts=['','','']; base.correct=[0,1,2]; base.time=30; }
  else if(t==='tf'){ base.opts=['صح','خطأ']; base.correct=[0]; }
  else if(t==='open'){ base.opts=[]; base.correct=[]; base.pts=['']; base.time=45; }
  else { base.opts=['','','','']; base.correct=[0]; }
  return base;
}
function complete(q){
  if(!q||!String(q.q||'').trim()) return false;
  if(q.type==='tf'||q.type==='poll') return true;
  if(q.type==='open') return (q.pts||[]).some(function(p){ return String(p||'').trim(); });
  if(q.type==='order') return (q.opts||[]).filter(function(o){ return String(o||'').trim(); }).length>=2;
  var filled=(q.opts||[]).filter(function(o){ return String(o||'').trim(); }).length;
  var c=(q.correct||[])[0]; return filled>=2 && c!=null && String((q.opts||[])[c]||'').trim()!=='';
}
function issue(q,g){
  if(!String(q.q||'').trim()) return 'نص السؤال فارغ';
  if(q.type==='mcq'){ var filled=(q.opts||[]).filter(function(o){ return String(o||'').trim(); }).length; if(filled<2) return 'يحتاج بديلين على الأقل'; var c=(q.correct||[])[0]; if(c==null||!String((q.opts||[])[c]||'').trim()) return 'الإجابة الصحيحة بلا نص'; }
  if(q.type==='open' && !complete(q)) return 'أضف نقطة واحدة على الأقل للإجابة';
  if(q.type==='order' && !complete(q)) return 'يحتاج عنصرين على الأقل';
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
  var crumb=R?'ألعاب جاهزة › '+esc(R.crumb||''):'إبداع › '+esc(tplName(g));
  var top='<div class="e2-tb"><button class="e2-bk" title="رجوع" onclick="hhIbBack()">'+ico('back',18)+'</button>'
    +'<div class="e2-tt"><small>'+crumb+'</small><input id="ibg-title" value="'+esc(g.title||'')+'" aria-label="عنوان اللعبة"></div>'
    +'<span class="e2-sv e2-hide" id="ib-save">'+ico('save',14)+' محفوظ</span>'
    +'<div class="e2-mode"><button class="'+(md==='live'?'on':'')+'" onclick="hhIbMode(\'live\')">'+ico('phone',16)+' مباشر <small>· على أجهزة الطلاب</small></button><button class="'+(md==='screen'?'on':'')+'" '+(liveOnly?'disabled title="هذا القالب مباشر فقط"':'')+' onclick="hhIbMode(\'screen\')">'+ico('monitor',16)+' على شاشة الصف <small>· بلا أجهزة</small></button></div>'
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
    banner='<div class="e2-banner">'+ico('alert',18)+'<span>'+(R.kind==='tf'?'تعديلاتك هنا تُحفظ في الألعاب الجاهزة وتظهر لكل المعلمين'+(R.published?'.':' بعد النشر.'):R.kind==='custom'?'لعبة جاهزة إضافية · تظهر لكل المعلمين في تبويب «ألعاب جاهزة».':'تعديلاتك هنا تُحفظ في المصدر نفسه: تظهر لكل المعلمين هنا وفي «العب الآن» ('+esc((R.cats||[]).join(' · '))+').')+(R.noAdd?' '+esc(R.noAdd):'')+'</span>'
      +(R.kind==='tf'&&!R.published?'<button class="e2-b s p" style="margin-inline-start:auto" onclick="hhIbReadyPublish(\''+R.rid+'\')">'+ico('send',14)+' انشر للمعلمين</button>':'')+'</div>';
  }
  /* الأسئلة */
  var list=qs.map(function(x,i){
    var ok=complete(x)&&!issue(x,g);
    var tags=(x.mult>1?'<span class="e2-tag">×'+x.mult+'</span>':'')+(x.flash?'<span class="e2-tag">برق</span>':'');
    var sub=x.type==='tf'?'صح أم خطأ':x.type==='open'?'مقالي':x.type==='poll'?'سحابة كلمات':x.type==='order'?'ترتيب':((x.opts||[]).filter(function(o){return String(o||'').trim();}).length+' بدائل');
    return '<div class="e2-qi '+(i===_ib.qIdx?'on':'')+'" draggable="true" data-i="'+i+'" onclick="hhIbSel('+i+')"><span class="dg">'+ico('drag',14)+'</span><span class="n">'+(i+1)+'</span><span class="tx">'+esc(x.q||'(سؤال فارغ)')+'<small>'+sub+'</small></span><span class="rt">'+tags+'<span class="st'+(ok?'':' w')+'" title="'+(ok?'مكتمل':esc(issue(x,g)||'غير مكتمل'))+'"></span></span></div>';
  }).join('');
  var colQ='<div class="e2-cd e2-colq'+(_ib.mtab==='list'?' on':'')+'"><div class="e2-hd">'+ico('list',16)+' الأسئلة <em>'+qs.length+'</em></div><div class="e2-ql" id="ib-ql">'+(list||'<div class="hint" style="padding:10px;">لا أسئلة بعد</div>')+'</div>'
    +'<button class="e2-add" onclick="hhIbAddQ()">'+ico('plus',18)+' سؤال جديد</button>'
    +(R&&R.noAdd?'':'<div class="e2-sl">أو استورد</div><div class="e2-imp"><button onclick="hhIbImport(\'cats\')">'+ico('grid',18)+' من الفئات</button><button onclick="hhIbImport(\'xls\')">'+ico('file',18)+' من ملف Excel</button><button onclick="hhIbImport(\'paste\')">'+ico('paste',18)+' لصق نص</button></div>')+'</div>';
  /* التحرير */
  var body;
  if(!q){ body='<div class="e2-ed"><div class="empty">أضف أول سؤال من «سؤال جديد» أو استورد أسئلة.</div></div>'; }
  else{
    var lockType=!!(R&&R.kind!=='custom');
    var types=[['mcq','اختيار من متعدد'],['tf','صح أم خطأ'],['open','مقالي · بطاقة']];
    if(q.type==='poll'||q.type==='order') types=[[q.type,q.type==='poll'?'سحابة كلمات':'رتّب العناصر']];
    var typ='<div class="e2-typ">'+types.map(function(t){ return '<button class="'+(q.type===t[0]?'on':'')+'" '+((lockType||q.type==='poll'||q.type==='order')&&q.type!==t[0]?'disabled':'')+' onclick="hhIbQType(\''+t[0]+'\')">'+t[1]+'</button>'; }).join('')+'</div>';
    var len=String(q.q||'').length;
    var qt='<div class="e2-qt"><textarea id="ibq-text" maxlength="240" placeholder="اكتب السؤال كما سيظهر للطلاب">'+esc(q.q||'')+'</textarea><span class="cnt" id="ibq-cnt" dir="ltr">'+len+' / 240</span></div>';
    var ims='<label class="e2-ims">'+(q.img?'<img src="'+esc(q.img)+'" alt=""><span>صورة السؤال</span><button class="e2-b s d x" onclick="event.preventDefault();hhIbImgDel()">'+ico('trash',13)+' إزالة</button>':ico('img',20)+'<span>أضف صورة أو خريطة للسؤال (اختياري)</span>')+'<input type="file" accept="image/*" id="ibq-img" style="display:none"></label>';
    var ans='';
    if(q.type==='mcq'||q.type==='tf'){
      var opts=q.type==='tf'?['صح','خطأ']:(q.opts||['','','','']); while(q.type==='mcq'&&opts.length<4) opts.push('');
      ans='<div class="e2-lab">'+(q.type==='tf'?'الإجابة الصحيحة':'البدائل')+' <small>· '+(q.type==='tf'?'اضغط الدائرة على الإجابة الصحيحة':'اضغط الدائرة على الإجابة الصحيحة')+'</small></div><div class="e2-ans">'+opts.slice(0,q.type==='tf'?2:4).map(function(o,i){
        var cr=(q.correct||[]).indexOf(i)>-1;
        return '<div class="e2-an'+(cr?' cr':'')+'" style="--a:'+(q.type==='tf'?(i===0?'#3D6B53':'#B3261E'):OC[i])+'"><i>'+(q.type==='tf'?(i===0?ico('check',18,2.6):ico('x',18,2.6)):OS[i])+'</i><input id="ibq-o'+i+'" value="'+esc(o)+'" placeholder="البديل '+LET[i]+'" '+(q.type==='tf'?'readonly':'')+'><button class="ok" title="الإجابة الصحيحة" onclick="hhIbCorrect('+i+')">'+ico('check',16,3)+'</button></div>';
      }).join('')+'</div>';
    } else if(q.type==='open'){
      var pts=(q.pts&&q.pts.length)?q.pts:[''];
      ans='<div class="e2-lab">نقاط الإجابة النموذجية <small>· تنكشف على الشاشة نقطة نقطة، والفريق يأخذ نقاطاً بعدد ما ذكره</small></div><div class="e2-pts">'+pts.map(function(p,i){ return '<div class="e2-pt"><i>'+(i+1)+'</i><input id="ibq-p'+i+'" value="'+esc(p)+'" placeholder="النقطة '+(i+1)+'"><button title="حذف" onclick="hhIbPtDel('+i+')">'+ico('x',14)+'</button></div>'; }).join('')+'</div>'
        +'<button class="e2-b s" style="margin-top:8px" onclick="hhIbPtAdd()">'+ico('plus',14)+' نقطة</button>';
    } else {
      var isPoll=q.type==='poll'; var arr=(q.opts&&q.opts.length)?q.opts:[''];
      ans='<div class="e2-lab">'+(isPoll?'إجابات مقترحة <small>· اختيارية وتظهر كتلميح فقط</small>':'العناصر بالترتيب الصحيح')+'</div><div class="e2-pts">'+arr.map(function(o,i){ return '<div class="e2-pt"><i style="background:'+(isPoll?'#8A6D2E':'#1F4E79')+'">'+(i+1)+'</i><input id="ibq-o'+i+'" value="'+esc(o)+'" placeholder="'+(isPoll?'إجابة مقترحة':'العنصر')+' '+(i+1)+'"></div>'; }).join('')+'</div><button class="e2-b s" style="margin-top:8px" onclick="hhIbAddOpt()">'+ico('plus',14)+' عنصر</button>';
    }
    var times=[5,8,10,15,20,30,45,60,90,120];
    var opt='<div class="e2-opt"><span class="e2-ch">'+ico('clock',14)+' <select id="ibq-time">'+times.map(function(t){ return '<option value="'+t+'"'+(q.time==t?' selected':'')+'>'+t+' ثانية</option>'; }).join('')+'</select></span>'
      +'<button class="e2-ch'+(q.mult>1?' on':'')+'" onclick="hhIbToggle(\'mult\')">'+ico('x2',14)+' درجة مضاعفة</button>'
      +'<button class="e2-ch'+(q.flash?' on':'')+'" onclick="hhIbToggle(\'flash\')">'+ico('bolt',14)+' سؤال البرق</button>'
      +'<button class="e2-ch'+(q.note?' on':'')+'" onclick="hhIbToggle(\'note\')">'+ico('note',14)+' ملاحظة للمعلم</button>'
      +'<span class="e2-qa"><button class="e2-b s" title="أعلى" onclick="hhIbMove('+_ib.qIdx+',-1)">'+ico('up',14)+'</button><button class="e2-b s" title="أسفل" onclick="hhIbMove('+_ib.qIdx+',1)">'+ico('down',14)+'</button><button class="e2-b s" onclick="hhIbDupQ('+_ib.qIdx+')">'+ico('copy',14)+' تكرار</button><button class="e2-b s d" onclick="hhIbDelQ('+_ib.qIdx+')">'+ico('trash',14)+' حذف</button></span></div>'
      +'<div class="e2-note" id="ibq-notew" style="'+(q.note||_ib.noteOpen?'':'display:none')+'"><input id="ibq-note" value="'+esc(q.note||'')+'" placeholder="'+(q.type==='tf'?'التصحيح أو الشرح الذي يظهر بعد كشف الإجابة':'شرح يظهر بعد كشف الإجابة')+'"></div>';
    var iss=issue(q,g);
    body='<div class="e2-ed">'+typ+qt+ims+ans+opt+(iss?'<div class="e2-ln" style="margin-top:10px"><i class="w">!</i>'+esc(iss)+'</div>':'')+'</div>';
  }
  var colE='<div class="e2-cd e2-cole'+(_ib.mtab==='edit'?' on':'')+'">'+body+'</div>';
  /* المعاينة والجاهزية */
  var pv='';
  if(q){
    if(md==='live'){
      var po=q.type==='tf'?['صح','خطأ']:(q.opts||[]);
      pv='<div class="e2-ph"><div class="e2-scr"><div class="e2-sb"><span>السؤال '+(_ib.qIdx+1)+' من '+qs.length+'</span><span>'+(q.time||20)+' ث</span></div><div class="e2-sq">'+esc(q.q||'نص السؤال')+'</div>'
        +(q.type==='open'?'<div class="e2-sq" style="color:#B3261E;font-size:12.5px">المقالي لا يظهر في التشغيل المباشر</div>':'<div class="e2-sa">'+po.slice(0,4).map(function(o,i){ return '<span style="--a:'+(q.type==='tf'?(i===0?'#3D6B53':'#B3261E'):OC[i])+'">'+(q.type==='tf'?'':OS[i])+'<small>'+esc(o||'')+'</small></span>'; }).join('')+'</div>')+'</div></div><div class="e2-cap">كما يراه الطالب على جواله</div>';
    } else {
      var so=q.type==='tf'?['صح','خطأ']:(q.opts||[]);
      pv='<div class="e2-tv"><div class="h"><span>'+esc((SCR[g.screenTpl]||SCR.boxes).name)+'</span><span>'+(_ib.qIdx+1)+' من '+qs.length+'</span></div><div class="q">'+esc(q.q||'نص السؤال')+'</div>'
        +(q.type==='open'?'<div class="a">'+(q.pts||[]).slice(0,4).map(function(p,i){ return '<span style="--a:#2F6A4E">'+(i+1)+'. '+esc(p||'')+'</span>'; }).join('')+'</div>':'<div class="a">'+so.slice(0,4).map(function(o,i){ return '<span style="--a:'+(q.type==='tf'?(i===0?'#3D6B53':'#B3261E'):OC[i])+'">'+esc(o||'')+'</span>'; }).join('')+'</div>')+'</div><div class="e2-cap">كما يظهر على شاشة الصف</div>';
    }
  }
  var okN=qs.filter(function(x){ return complete(x)&&!issue(x,g); }).length;
  var bad=qs.map(function(x,i){ return {i:i,m:issue(x,g)}; }).filter(function(x){ return x.m; });
  var chk='<div class="e2-chk"><h4>'+ico('check',16)+' الجاهزية <em class="'+(bad.length?'w':'')+'">'+okN+' من '+qs.length+' أسئلة مكتملة</em></h4>'
    +(qs.length?'':'<div class="e2-ln"><i class="w">!</i>لا أسئلة بعد</div>')
    +(bad.length?bad.slice(0,6).map(function(x){ return '<div class="e2-ln"><i class="w">!</i>السؤال '+(x.i+1)+': '+esc(x.m)+'<a onclick="hhIbSel('+x.i+')">انتقل</a></div>'; }).join('')+(bad.length>6?'<div class="e2-ln"><i class="w">+</i>'+(bad.length-6)+' ملاحظات أخرى</div>':''):(qs.length?'<div class="e2-ln"><i class="g">'+ico('check',12,3)+'</i>كل الأسئلة جاهزة للعرض</div>':''))+'</div>';
  var sum='<div class="e2-sum"><div>الطريقة<b>'+(md==='screen'?'على شاشة الصف':'مباشر')+'</b></div><div>'+(md==='screen'?'الفرق':'الترتيب')+'<b>'+(md==='screen'?((S.teams||2)===1?'بلا فرق':(S.teams||2)+' فرق'):(S.hideRank==='always'?'مخفي حتى النهاية':S.hideRank==='never'?'بعد كل سؤال':'يُخفى في الأخير'))+'</b></div><div>الزمن الافتراضي<b>'+(S.defaultTime||20)+' ثانية</b></div><div>'+(md==='screen'?'نقاط السؤال':'النقاط')+'<b>'+(md==='screen'?(S.basePts||20):(S.scoring==='fixed'?'ثابتة':'بالسرعة'))+'</b></div></div>';
  var colP='<div class="e2-cd e2-colp'+(_ib.mtab==='prev'?' on':'')+'"><div class="e2-hd">'+ico('eye',16)+' المعاينة</div><div class="e2-pv">'+(pv||'<div class="hint">ستظهر المعاينة عند إضافة سؤال</div>')+'</div>'+chk+sum+'</div>';
  var mt='<div class="e2-mt"><button class="'+(_ib.mtab==='list'?'on':'')+'" onclick="hhIbMTab(\'list\')">الأسئلة '+qs.length+'</button><button class="'+(_ib.mtab==='edit'?'on':'')+'" onclick="hhIbMTab(\'edit\')">التحرير</button><button class="'+(_ib.mtab==='prev'?'on':'')+'" onclick="hhIbMTab(\'prev\')">المعاينة</button></div>';
  var stk='<div class="e2-stk"><button class="e2-b" onclick="hhIbAddQ()">'+ico('plus',16)+' سؤال</button>'+(md==='screen'?'<button class="e2-b p" onclick="hhIbShow(\''+g.id+'\')">'+ico('monitor',16)+' اعرض</button>':'<button class="e2-b p" onclick="hhIbRun(\''+g.id+'\')">'+ico('play',16)+' تشغيل</button>')+'</div>';
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
window.hhIbToggle=function(k){ var g=cur(); var q=g.questions[_ib.qIdx]; if(k==='note'){ var w=document.getElementById('ibq-notew'); if(!w) return; var show=(w.style.display==='none'); if(!show&&String(q.note||'').trim()){ w.querySelector('input').focus(); return; } w.style.display=show?'':'none'; _ib.noteOpen=show; if(show){ var i=w.querySelector('input'); if(i) i.focus(); } return; } if(k==='mult') q.mult=(q.mult>1?1:2); else if(k==='flash') q.flash=!q.flash; persist(g); render(); };
window.hhIbPtAdd=function(){ var g=cur(); var q=g.questions[_ib.qIdx]; q.pts=q.pts||[]; if(q.pts.length>=10){ toastX('الحد عشر نقاط','info'); return; } q.pts.push(''); persist(g); render(); setTimeout(function(){ var e=document.getElementById('ibq-p'+(q.pts.length-1)); if(e) e.focus(); },30); };
window.hhIbPtDel=function(i){ var g=cur(); var q=g.questions[_ib.qIdx]; q.pts=q.pts||['']; q.pts.splice(i,1); if(!q.pts.length) q.pts=['']; persist(g); render(); };
window.hhIbAddOpt=function(){ var g=cur(); var q=g.questions[_ib.qIdx]; q.opts=q.opts||[]; if(q.opts.length>=8){ toastX('الحد ثمانية عناصر','info'); return; } q.opts.push(''); if(q.type==='order') q.correct=q.opts.map(function(_,i){return i;}); persist(g); render(); };
window.hhIbQType=function(t){ var g=cur(); var q=g.questions[_ib.qIdx]; if(q.type===t) return; var old=q.type; q.type=t;
  if(t==='tf'){ q.opts=['صح','خطأ']; q.correct=[0]; if(!q.time||q.time>15) q.time=10; }
  else if(t==='open'){ var cA=(old==='mcq'&&q.opts)?q.opts[(q.correct||[0])[0]]:''; q.pts=(q.pts&&q.pts.length)?q.pts:[cA||'']; q.opts=[]; q.correct=[]; if(!q.time||q.time<30) q.time=45; }
  else { var keep=(old==='open'&&q.pts)?q.pts[0]:''; q.opts=(old==='mcq'&&q.opts&&q.opts.length>=4)?q.opts:[keep||'','','','']; q.correct=[0]; if(q.time>30) q.time=20; }
  persist(g); render(); };
window.hhIbMode=function(m){ var g=cur(); if(!g) return; if(g.template==='cloud'||g.template==='order'){ if(m==='screen'){ toastX('هذا القالب يعمل مباشراً فقط','info'); } return; }
  g.mode=m; if(m==='screen'&&!g.screenTpl) g.screenTpl='boxes';
  if(m==='live'){ var n=(g.questions||[]).filter(function(q){ return q.type==='open'; }).length; if(n) toastX(n+' سؤالاً مقالياً لن يظهر في التشغيل المباشر · يظهر على الشاشة فقط','info'); }
  persist(g); render(); };
window.hhIbTplPick=function(){
  var g=cur(); if(!g) return;
  var types={}; (g.questions||[]).forEach(function(q){ types[q.type]=(types[q.type]||0)+1; });
  var d=document.createElement('div'); d.id='ib-imp2';
  d.innerHTML='<div class="md" style="width:min(760px,100%)"><div class="mh">اختر قالب الشاشة<button onclick="this.closest(\'#ib-imp2\').remove()">'+ico('x',18)+'</button></div><div class="mb"><div class="hint">المحتوى نفسه، والقالب يتغير بنقرة. يظهر بجانب كل قالب عدد أسئلتك التي تناسبه.</div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:10px;">'
    +TEMPLATES.filter(function(t){ return t.kind==='screen'; }).map(function(t){ var fit=0; SCR[t.scr].types.forEach(function(ty){ fit+=(types[ty]||0); }); var onx=(g.screenTpl===t.scr);
      return '<button onclick="hhIbSetTpl(\''+t.scr+'\')" style="text-align:right;display:flex;flex-direction:column;gap:6px;border:1.5px solid '+(onx?'#5E0E26':'#E7DAC0')+';border-radius:16px;padding:12px;background:'+(onx?'#FBF4F6':'#fff')+';cursor:pointer;font-family:Cairo;"><span style="width:42px;height:42px;border-radius:12px;background:'+t.bg+';color:#fff;display:flex;align-items:center;justify-content:center">'+ico(t.ico,22)+'</span><b style="font-size:15px;color:#3D0918">'+esc(t.name)+'</b><span style="font-family:Tajawal;font-size:12.5px;color:#7A6A54;line-height:1.6">'+esc(t.desc)+'</span><span style="font-size:12px;font-weight:800;color:'+(fit?'#2F6A4E':'#A8650F')+'">'+fit+' من '+(g.questions||[]).length+' أسئلة تناسبه</span></button>'; }).join('')
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
    +(g.template==='race'?f('نمط اللعبة',sel('st-mode',[['classic','سباق كلاسيكي (نقاط بالسرعة)'],['market','السوق · عملات وتعزيزات بين الأسئلة']],S.mode||'classic')):'')
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

/* ── الاستيراد: من فئات المنصة · من ملف Excel · لصق نص ── */
var _imp={ tab:'cats', cat:'', sel:{}, find:'', rows:[] };
function qdb(){ return (typeof QDB==='object'&&QDB)?QDB:{}; }
function parsePts(a){ var s=String(a||'').trim(); if(!s) return ['']; var parts=s.split(/\s*(?:^|\s)\d{1,2}\s*[-–.)]\s+/).map(function(x){ return x.trim(); }).filter(Boolean); return parts.length>1?parts:[s]; }
window._hhIbParsePts=parsePts;
function fromQDB(src, cat, g){
  var a=String(src.a==null?'':src.a).trim(); var S=(g&&g.settings)||{};
  var base={ id:newId('q'), q:String(src.q||'').replace(/^[^:]{2,20}:\s*(?=\S)/,function(m){ return /[«"]/.test(m)?m:''; }), time:S.defaultTime||20, mult:1, flash:false, note:'', srcCat:cat, srcDiff:src.diff||'' };
  if(src.img) base.img=src.img;
  if(Array.isArray(src.opts)&&src.opts.length>=2){
    var opts=[]; src.opts.forEach(function(o){ o=String(o).trim(); if(o&&opts.indexOf(o)<0) opts.push(o); });
    if(opts.indexOf(a)<0) opts.unshift(a); opts=opts.slice(0,4); if(opts.indexOf(a)<0) opts[0]=a;
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
      +list.map(function(q,i){ var on=!!_imp.sel[i]; var kind=(Array.isArray(q.opts)&&q.opts.length>=2)?'اختيار من متعدد':(modeOf(g)==='screen'?'مقالي · بطاقة':'اختيار ببدائل تلقائية'); return '<label class="'+(on?'on':'')+'"><input type="checkbox" data-i="'+i+'" '+(on?'checked':'')+'><span>'+esc(q.q||'')+'<small>'+(DL[q.diff]?DL[q.diff]+' نقطة · ':'')+kind+(q.img?' · بصورة':'')+'</small></span></label>'; }).join('')+'</div></div></div>';
    var auto=Object.keys(_imp.sel).filter(function(k){ var q=list[k]; return _imp.sel[k]&&q&&!(Array.isArray(q.opts)&&q.opts.length>=2); }).length;
    foot=n+' أسئلة محددة'+(auto?(modeOf(g)==='screen'?' · '+auto+' منها مقالية تُضاف بطاقات':' · '+auto+' منها بلا بدائل: تُولَّد بدائلها من إجابات الفئة، راجعها'):' · تُضاف بالبدائل والإجابات كما هي');
  } else if(_imp.tab==='xls'){
    n=_imp.rows.length;
    body='<div class="hint">الأعمدة بالترتيب: <code>السؤال</code> <code>البديل أ</code> <code>البديل ب</code> <code>البديل ج</code> <code>البديل د</code> <code>الصحيح</code> <code>الزمن</code>.<br>«الصحيح» رقم من 1 إلى 4 أو نص البديل. لعبارة صح أم خطأ اترك البدائل فارغة واكتب «صح» أو «خطأ». للسؤال المقالي اترك البدائل فارغة واكتب نقاط الإجابة في «الصحيح» مفصولة بـ «؛».</div>'
      +'<div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap"><button class="bt" onclick="hhIbXlsTpl()">'+ico('download',16)+' حمّل القالب</button></div>'
      +'<label class="drop">'+ico('file',22)+'<br>اختر ملف Excel أو CSV<input type="file" id="imp-file" accept=".xlsx,.xls,.csv,.txt" style="display:none"></label>'+impPreview();
    foot=n?(n+' أسئلة جاهزة للإضافة'):'لم يُقرأ ملف بعد';
  } else {
    n=_imp.rows.length;
    body='<div class="hint">اكتب كل سؤال في سطر، وتحته البدائل كل بديل في سطر، وضع <code>*</code> قبل الصحيح. افصل بين الأسئلة بسطر فارغ.<br>عبارة صح أم خطأ: سطر واحد ينتهي بـ <code>(صح)</code> أو <code>(خطأ)</code>. السؤال المقالي: السؤال ثم سطر يبدأ بـ <code>الإجابة:</code> ونقاطها مفصولة بـ «؛».</div>'
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
  var TN={mcq:'اختيار',tf:'صح أم خطأ',open:'مقالي'};
  return '<div class="prev" id="imp-prev">'+r.slice(0,8).map(function(q,i){ return '<div><b>'+(i+1)+'.</b> '+esc(q.q)+' <small style="color:#7A6A54">· '+TN[q.type]+(q.type==='mcq'?' · الصحيح: '+esc(q.opts[q.correct[0]]||''):q.type==='tf'?' · '+(q.correct[0]===0?'صح':'خطأ'):' · '+q.pts.length+' نقاط')+'</small></div>'; }).join('')+(r.length>8?'<div>و'+(r.length-8)+' أخرى…</div>':'')+'</div>'; }
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
  var done=function(rows){ if(rows.length&&/السؤال|سؤال|question/i.test(String(rows[0][0]||''))) rows=rows.slice(1); _imp.rows=rows.map(function(r){ return rowToQ(g,r); }).filter(Boolean); if(!_imp.rows.length) toastX('لم أجد أسئلة صالحة في الملف · راجع ترتيب الأعمدة','error'); impRender(); };
  if(isX){ loadXLSX().then(function(){ var r=new FileReader(); r.onload=function(e){ try{ var wb=XLSX.read(new Uint8Array(e.target.result),{type:'array'}); var ws=wb.Sheets[wb.SheetNames[0]]; done(XLSX.utils.sheet_to_json(ws,{header:1,defval:''})); }catch(x){ toastX('تعذّرت قراءة الملف','error'); } }; r.readAsArrayBuffer(file); }).catch(function(){ toastX('تعذّر تحميل قارئ Excel · احفظ الملف بصيغة CSV وجرّب','error'); }); }
  else { var r=new FileReader(); r.onload=function(e){ var txt=String(e.target.result||'').replace(/^﻿/,''); var sep=txt.indexOf('\t')>-1?'\t':(txt.split(';').length>txt.split(',').length?';':','); done(txt.split(/\r?\n/).filter(function(l){ return l.trim(); }).map(function(l){ return csvSplit(l,sep); })); }; r.readAsText(file,'utf-8'); }
}
function csvSplit(line,sep){ var out=[],cur2='',q=false; for(var i=0;i<line.length;i++){ var ch=line[i]; if(ch==='"'){ if(q&&line[i+1]==='"'){ cur2+='"'; i++; } else q=!q; } else if(ch===sep&&!q){ out.push(cur2); cur2=''; } else cur2+=ch; } out.push(cur2); return out; }
function loadXLSX(){ if(window.XLSX) return Promise.resolve(); if(typeof hhClsLoadSheetJS==='function') return hhClsLoadSheetJS(); return new Promise(function(res,rej){ var s=document.createElement('script'); s.src='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'; s.onload=res; s.onerror=rej; document.head.appendChild(s); }); }
window.hhIbXlsTpl=function(){
  var rows=[['السؤال','البديل أ','البديل ب','البديل ج','البديل د','الصحيح','الزمن'],['ما عاصمة دولة قطر؟','الدوحة','الوكرة','الخور','دخان',1,20],['الكوس من الرياح المحلية التي تهب على قطر','','','','','صح',10],['اذكر عناصر المناخ.','','','','','الحرارة؛ الضغط الجوي؛ الرياح؛ الرطوبة',45]];
  loadXLSX().then(function(){ var ws=XLSX.utils.aoa_to_sheet(rows); ws['!cols']=[{wch:44},{wch:16},{wch:16},{wch:16},{wch:16},{wch:30},{wch:8}]; var wb=XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb,ws,'الأسئلة'); XLSX.writeFile(wb,'قالب-أسئلة-إبداع.xlsx'); })
  .catch(function(){ var csv='﻿'+rows.map(function(r){ return r.map(function(x){ x=String(x); return /[",\n]/.test(x)?'"'+x.replace(/"/g,'""')+'"':x; }).join(','); }).join('\n'); var a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})); a.download='قالب-أسئلة-إبداع.csv'; document.body.appendChild(a); a.click(); a.remove(); });
};
function parsePaste(txt){
  var g=cur(); var out=[];
  String(txt||'').split(/\n\s*\n/).forEach(function(block){
    var L=block.split('\n').map(function(l){ return l.trim(); }).filter(Boolean); if(!L.length) return;
    var q=L[0].replace(/^\d{1,3}\s*[-.)]\s*/,'');
    if(L.length===1){ var m=q.match(/^(.*?)[\s\-–:]*\(?\s*(صح|خطأ|صحيح|خاطئ)\s*\)?\s*$/); if(m&&m[1]) out.push(mkQ(g,'tf',m[1].trim(),null,/^صح/.test(m[2])?0:1)); return; }
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
  toastX('أُضيف '+add.length+' '+(add.length>2&&add.length<11?'أسئلة':'سؤالاً')+(auto?' · راجع البدائل المولّدة':''),'success');
};

/* ── الألعاب الجاهزة: تُبنى من فئات «العب الآن» + admin_qdb/ib_ready ── */
var GRADES=[{id:'g7t1',name:'السابع · ف1',ok:true},{id:'g7t2',name:'السابع · ف2'},{id:'g8t2',name:'الثامن · ف2'},{id:'g6',name:'السادس'}];
var UNITS={ g7t1:[
  {k:'u1',name:'الوحدة الأولى · الأرض من حولي',short:'الأرض من حولي',mcq:'سابع ف1 - الأرض من حولي (اختياري)',open:'سابع ف1 - الأرض من حولي (مقالي)',c:'linear-gradient(135deg,#1F4E79,#132f4a)',ic:'globe',d:'المناخ وعناصره والرياح والأقاليم المناخية.'},
  {k:'u2',name:'الوحدة الثانية · بلاد الرافدين',short:'بلاد الرافدين',mcq:'سابع ف1 - بلاد الرافدين (اختياري)',open:'سابع ف1 - بلاد الرافدين (مقالي)',c:'linear-gradient(135deg,#8A6D2E,#5c4816)',ic:'col',d:'الشعوب والكتابة والحكم وحمورابي وطبقات المجتمع.'}
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
function readyList(){
  var L=[], G=_ib.grade||'g7t1', adm=isAdm();
  (UNITS[G]||[]).forEach(function(u,ui){
    var qm=(qdb()[u.mcq]||[]), qo=(qdb()[u.open]||[]), key=G+'-'+u.k;
    if(ui===0){ var all=(UNITS[G]||[]).reduce(function(s,x){ return s+(qdb()[x.mcq]||[]).length; },0); L.push({rid:G+'-all',sec:'all',kind:'mcq',title:'المراجعة الشاملة · '+(GRADES.filter(function(x){return x.id===G;})[0]||{}).name,n:all,unit:null,c:'linear-gradient(135deg,#8A1538,#5E0E26)',ic:'award',d:'أسئلة الوحدات في لعبة واحدة، مرتبة من السهل إلى الصعب.',cats:(UNITS[G]||[]).map(function(x){ return x.mcq; })}); }
    if(qm.length) L.push({rid:key+'-mcq',sec:u.k,kind:'mcq',title:u.short+' · مراجعة',n:qm.length,unit:u,c:u.c,ic:u.ic,d:u.d+' تصلح لصناديق الأسرار أو السباق المباشر.',cats:[u.mcq]});
    var pub=tfPublished(key); if(adm||pub) L.push({rid:key+'-tf',sec:u.k,kind:'tf',title:u.short+' · صح أم خطأ',n:tfItems(key).length,unit:u,c:'linear-gradient(135deg,#3D6B53,#2C5340)',ic:'check',d:'عبارات مبنية من أسئلة الوحدة. يصوّت الصف برفع اليد.',draft:!pub,tfKey:key});
    if(qo.length) L.push({rid:key+'-open',sec:u.k,kind:'open',title:u.short+' · بطاقات الأسئلة المقالية',n:qo.length,unit:u,c:'linear-gradient(135deg,#4A0B1E,#2A0810)',ic:'flip',d:'وجه البطاقة السؤال، وظهرها الإجابة النموذجية نقطة نقطة. للشاشة فقط.',cats:[u.open],img:qo.some(function(q){ return q.img; })});
  });
  (_ib.ready.custom||[]).forEach(function(c){ if((c.grade||'g7t1')!==G) return; L.push({rid:'c:'+c.id,sec:'custom',kind:'custom',title:c.title||'لعبة جاهزة',n:(c.questions||[]).length,c:'linear-gradient(135deg,#5E0E26,#3D0918)',ic:'star',d:c.desc||'لعبة إضافية من إعداد المُلهم.',custom:c}); });
  return L;
}
function buildReady(rid){
  var R=readyList().filter(function(x){ return x.rid===rid; })[0]; if(!R) return null;
  var g={ id:'ready_'+rid.replace(/[^a-z0-9_-]/gi,'_'), title:R.title, template:'race', mode:'screen', screenTpl:'boxes', settings:defSettings('race'), questions:[], status:'ready' };
  var meta={ rid:rid, kind:R.kind, crumb:R.title, cats:R.cats||[], defCat:null, noAdd:'' };
  if(R.kind==='mcq'){
    var DO={easy:0,med:1,hard:2,elite:3,legend:4,l1200:5};
    R.cats.forEach(function(cat){ (qdb()[cat]||[]).forEach(function(src,i){ var q=fromQDB(src,cat,{settings:g.settings,mode:'live'}); q.srcIdx=i; q._d=DO[src.diff]==null?1:DO[src.diff]; g.questions.push(q); }); });
    if(R.sec==='all'){ g.questions.sort(function(a,b){ return a._d-b._d; }); meta.noAdd='لإضافة سؤال افتح لعبة الوحدة نفسها، فيظهر هنا تلقائياً.'; }
    else meta.defCat=R.cats[0];
    g.screenTpl='boxes';
  } else if(R.kind==='open'){
    R.cats.forEach(function(cat){ (qdb()[cat]||[]).forEach(function(src,i){ var q=fromQDB(src,cat,{settings:g.settings,mode:'screen'}); if(q.type!=='open'){ q.type='open'; q.pts=parsePts(src.a); q.opts=[]; q.correct=[]; } q.srcIdx=i; g.questions.push(q); }); });
    meta.defCat=R.cats[0]; g.screenTpl='flip';
  } else if(R.kind==='tf'){
    tfItems(R.tfKey).forEach(function(it){ var q=mkQ(g,'tf',it.s,null,it.v?0:1,10); q.note=it.fix||''; g.questions.push(q); });
    meta.tfKey=R.tfKey; meta.published=!R.draft; g.screenTpl='tfs'; g.template='tf';
  } else if(R.kind==='custom'){
    var c=clone(R.custom); g.title=c.title; g.questions=c.questions||[]; g.screenTpl=c.screenTpl||'boxes'; g.mode=c.mode||'screen'; g.settings=Object.assign(defSettings('race'),c.settings||{}); meta.customId=c.id; meta.crumb='لعبة إضافية';
  }
  g._ready=meta; return g;
}
function renderReady(){
  var adm=isAdm(), G=_ib.grade||'g7t1';
  var fl='<div class="rl-fl">'+GRADES.map(function(x){ return '<button class="e2-ch'+(x.id===G?' on':'')+'" '+(x.ok?'onclick="hhIbGrade(\''+x.id+'\')"':'disabled title="قريباً"')+'>'+esc(x.name)+(x.ok?'':' · قريباً')+'</button>'; }).join('')+'<span style="flex:1"></span>'+(adm?'<button class="e2-b s p" onclick="hhIbReadyNew()">'+ico('plus',14)+' لعبة جاهزة جديدة</button>':'')+'</div>';
  var L=readyList(); if(!L.length) return fl+'<div class="rl-soon">ألعاب هذا الصف قيد الإعداد · قريباً بإذن الله</div>';
  var card=function(R){
    var modes=(R.kind==='open'?[['monitor','شاشة']]:[['monitor','شاشة'],['phone','مباشر']]).map(function(m){ return '<span>'+ico(m[0],12,2.2)+' '+m[1]+'</span>'; }).join('');
    var nLbl=R.kind==='open'?R.n+' بطاقات':R.kind==='tf'?R.n+' عبارات':R.n+' '+(R.n>2&&R.n<11?'أسئلة':'سؤالاً')+(R.kind==='mcq'?' اختيار':'');
    var meta='<i>'+nLbl+'</i>'+(R.img?'<i>مع صورة الخريطة</i>':'')+(R.draft?'<i class="w">مسودة · بانتظار مراجعتك</i>':'');
    var btns=(R.kind==='open'?'<button class="e2-b p" onclick="hhIbReadyShow(\''+R.rid+'\')">'+ico('monitor',15)+' اعرض على الشاشة</button>':'<button class="e2-b p" onclick="hhIbReadyShow(\''+R.rid+'\')">'+ico('monitor',15)+' على الشاشة</button><button class="e2-b" onclick="hhIbReadyLive(\''+R.rid+'\')">'+ico('phone',15)+' مباشر</button>');
    var lk='<a onclick="hhIbReadyCopy(\''+R.rid+'\')">'+ico('copy',13)+' انسخ إلى ألعابي وعدّل</a>'+(adm?'<a class="adm" onclick="hhIbReadyEdit(\''+R.rid+'\')">'+ico('edit',13)+' عدّل الأصل</a>':'')+(adm&&R.draft?'<a class="adm" onclick="hhIbReadyPublish(\''+R.rid+'\')">'+ico('send',13)+' انشر</a>':'')+(adm&&R.kind==='custom'?'<a class="adm" onclick="hhIbReadyDel(\''+R.rid+'\')">'+ico('trash',13)+' احذف</a>':'');
    return '<div class="rl-c'+(R.draft?' draft':'')+'" style="--c:'+R.c+'"><div class="gh"><span class="gi">'+ico(R.ic,24,2)+'</span><div class="md">'+modes+'</div></div><div class="gb"><b>'+esc(R.title)+'</b><div class="mt">'+meta+'</div><p>'+esc(R.d)+'</p><div class="ac">'+btns+'</div><div class="lk">'+lk+'</div></div></div>';
  };
  var html=fl+'<div class="rl-src">'+ico('book',14)+' المصدر: فئات «العب الآن › المدارس › '+esc((GRADES.filter(function(x){return x.id===G;})[0]||{}).name)+'» · تتحدّث تلقائياً عند تعديل الأسئلة</div>';
  var all=L.filter(function(r){ return r.sec==='all'; }); if(all.length) html+='<div class="rl-h"><h3>المراجعة الشاملة</h3><small>· الوحدات معاً</small></div><div class="rl-g">'+all.map(card).join('')+'</div>';
  (UNITS[G]||[]).forEach(function(u){ var us=L.filter(function(r){ return r.sec===u.k; }); if(us.length) html+='<div class="rl-h"><h3>'+esc(u.name)+'</h3></div><div class="rl-g">'+us.map(card).join('')+'</div>'; });
  var cu=L.filter(function(r){ return r.sec==='custom'; }); if(cu.length) html+='<div class="rl-h"><h3>ألعاب إضافية</h3></div><div class="rl-g">'+cu.map(card).join('')+'</div>';
  if(!adm) html+='<div class="hint" style="text-align:center;margin-top:-6px">العرض على الشاشة متاح للجميع · التشغيل المباشر والنسخ إلى «ألعابي» بحساب المعلم</div>';
  return html;
}
window.hhIbGrade=function(g){ _ib.grade=g; render(); };
window.hhIbReadyShow=function(rid){ var g=buildReady(rid); if(!g) return; screenRun(g); };
window.hhIbReadyLive=function(rid){ var g=buildReady(rid); if(!g) return; if(!canUse()){ toastX('التشغيل المباشر بحساب المعلم · سجّل الدخول أولاً','info'); return; } g.mode='live'; liveRun(g); };
window.hhIbReadyCopy=function(rid){
  if(!canUse()){ toastX('النسخ إلى «ألعابي» بحساب المعلم · سجّل الدخول أولاً','info'); return; }
  var g=buildReady(rid); if(!g) return; delete g._ready; g.id=newId('g'); g.status='draft'; g.createdAt=Date.now(); g.questions.forEach(function(q){ delete q.srcCat; delete q.srcIdx; delete q._d; q.id=newId('q'); });
  _ib.games.push(g); persist(g,true); toastX('نُسخت إلى ألعابك · عدّلها كما تشاء','success'); hhIbEdit(g.id);
};
window.hhIbReadyEdit=function(rid){ if(!isAdm()){ toastX('تعديل الأصل للمدير فقط','error'); return; } var g=buildReady(rid); if(!g) return; _ib.readyGame=g; _ib.gameId=g.id; _ib.qIdx=0; _ib.mtab='edit'; _ib.view='editor'; render(); var o=document.getElementById('hh-ib'); if(o) o.scrollTop=0; };
window.hhIbReadyPublish=async function(rid){
  if(!isAdm()) return; var R=readyList().filter(function(x){ return x.rid===rid; })[0]; var key=R&&R.tfKey; if(!key) return;
  if(_ib.readyGame&&_ib.readyGame._ready&&_ib.readyGame._ready.tfKey===key) flushReady();
  _ib.ready.tf[key]=_ib.ready.tf[key]||{items:clone(tfItems(key))}; _ib.ready.tf[key].published=true;
  if(_ib.readyGame&&_ib.readyGame._ready) _ib.readyGame._ready.published=true;
  var ok=await saveReadyDoc(); toastX(ok?'نُشرت العبارات لكل المعلمين':'حُفظ النشر على جهازك فقط · تعذّرت المزامنة',ok?'success':'error'); render();
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
window.hhIbRefresh=function(){ _ib.loaded=false; if(document.getElementById('hh-ib')) open(_ib.view==='editor'?'mine':_ib.view); };
window._hhIb=_ib; window._hhIbTemplates=TEMPLATES; window._hhIbGetGame=getGame; window._hhIbReadyList=readyList; window._hhIbBuildReady=buildReady;
})();
