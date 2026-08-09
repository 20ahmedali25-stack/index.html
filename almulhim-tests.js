#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════
   🛡️ سلة اختبارات منصة المُلهِم — تُشغَّل قبل كل نشر
   الاستخدام:  node almulhim-tests.js [رابط المنصة]
   الافتراضي:  http://localhost:8077/index.html
   المتطلبات:  Node + Puppeteer (أو مسار Chrome عبر CHROME_PATH)
   ═══════════════════════════════════════════════════════════════════ */
const BASE = process.argv[2] || 'http://localhost:8077/index.html';
const CHROME = process.env.CHROME_PATH || '/home/claude/.cache/puppeteer/chrome/linux-131.0.6778.204/chrome-linux64/chrome';
let puppeteer;
try { puppeteer = require('puppeteer'); }
catch(e){ puppeteer = require('/home/claude/.npm-global/lib/node_modules/@mermaid-js/mermaid-cli/node_modules/puppeteer'); }

const results = [];
const T = (name, ok, note='') => { results.push({name, ok, note}); console.log((ok?'✅':'❌')+' '+name+(note?' — '+note:'')); };

// مقيّم صامد أمام إعادة التحميل (تحديثات Service Worker)
async function safeEval(page, fn, arg){
  for(let i=0;i<6;i++){
    try{ return await page.evaluate(fn, arg); }
    catch(e){
      if(String(e).includes('Execution context was destroyed') || String(e).includes('Cannot find context')){
        await new Promise(r=>setTimeout(r,1500));
        try{ await page.evaluate(()=>{ ['privacy-consent-modal','hh-whatsnew-modal','onboarding-modal'].forEach(id=>{const el=document.getElementById(id);if(el)el.remove();}); }); }catch(_){}
        continue;
      }
      throw e;
    }
  }
  throw new Error('context unstable');
}

(async()=>{
  const browser = await puppeteer.launch({ executablePath: CHROME, args:['--no-sandbox','--lang=ar'] });
  const page = await browser.newPage();
  await page.setViewport({width:1400, height:900});
  page.on('dialog', async d=>{ await d.accept(); });
  const pageErrors = [];
  page.on('pageerror', e=> pageErrors.push(String(e).slice(0,120)));
  await page.evaluateOnNewDocument(()=>{try{
    localStorage.setItem('hh_privacy_consent','yes');
    localStorage.setItem('hh_onboarding_seen','1');
    localStorage.setItem('hh_wn_last_seen','zz');
  }catch(e){}});

  // ── 1) الإقلاع ──
  await page.goto(BASE,{waitUntil:'load',timeout:90000}).catch(()=>{});
  let ready=false;
  for(let t=0;t<35 && !ready;t++){ await new Promise(r=>setTimeout(r,1000));
    try{ ready=await page.evaluate(()=> typeof startGame==='function' && typeof QDB!=='undefined'); }catch(e){}
  }
  T('إقلاع المنصة وجاهزية المحرك', ready);
  if(!ready){ console.log('⛔ توقف: المنصة لم تقلع'); await browser.close(); process.exit(1); }
  await page.evaluate(()=>{ ['privacy-consent-modal','hh-whatsnew-modal','onboarding-modal'].forEach(id=>{const e=document.getElementById(id);if(e)e.remove();}); });

  // ── 2) شاشة الدخول ──
  const login = await safeEval(page, ()=>{
    try{ showScreen('screen-login'); }catch(e){}
    const t=document.querySelector('#screen-login .logo-title');
    return { title:t?t.textContent:'', hasFields: !!document.querySelector('#screen-login input[type="email"], #screen-login input') };
  });
  T('شاشة الدخول: الشعار والحقول', login.title.includes('لهِم') && login.hasFields, login.title);

  // ── 3) سلامة البنوك ──
  const banks = await safeEval(page, ()=>{
    const out={};
    const sz=c=> (QDB[c]||[]).length;
    out.caps=sz('عواصم الدول'); out.flags=sz('أعلام الدول'); out.math=sz('الرياضيات الذهنية');
    out.legends=['أساطير السيرة','أساطير الحضارة','أساطير القادة','أساطير النساء','أساطير الأمثال','أساطير الطب'].map(sz);
    out.qatar=['تاريخ قطر','قطر والخليج','العمل التطوعي في قطر','معلومات عامة عن قطر'].map(sz);
    out.flagImgs=(QDB['أعلام الدول']||[]).every(q=>q.img && q.img.startsWith('data:image/svg'));
    const vol=(typeof _HH_AJYVOL_CAT!=='undefined')?(QDB[_HH_AJYVOL_CAT]||[]):[];
    out.volOpts = vol.length===24 && vol.every(q=>Array.isArray(q.opts)&&q.opts.length>=4);
    // صمام جزء عم
    const JUZ=new Set(['النبأ','النازعات','عبس','التكوير','الانفطار','المطففين','الانشقاق','البروج','الطارق','الأعلى','الغاشية','الفجر','البلد','الشمس','الليل','الضحى','الشرح','التين','العلق','القدر','البينة','الزلزلة','العاديات','القارعة','التكاثر','العصر','الهمزة','الفيل','قريش','الماعون','الكوثر','الكافرون','النصر','المسد','الإخلاص','الفلق','الناس']);
    const norm=t=>String(t||'').replace(/^سورة\s+/,'').replace(/^ال/,'').trim();
    const JN=new Set([...JUZ].map(norm));
    const hints=['عروس القرآن','الرحمن','يس','الكهف','البقرة','الملك','الواقعة','مريم','يوسف','آل عمران','الفاتحة'];
    out.juzIntruders=(QDB['جزء عم']||[]).filter(q=>{
      const ansOk=/\d/.test(String(q.a||''))||JN.has(norm(q.a));
      const hint=hints.find(h=>(q.q||'').includes(h)||(q.a||'').includes(h));
      return !ansOk||hint;
    }).length;
    return out;
  });
  T('عواصم الدول = 36', banks.caps===36, String(banks.caps));
  T('أعلام الدول = 36 وصورها مضمّنة', banks.flags===36 && banks.flagImgs, String(banks.flags));
  T('الرياضيات الذهنية = 36', banks.math===36, String(banks.math));
  T('فئات الأساطير الست = 36 لكل فئة', banks.legends.every(n=>n===36), banks.legends.join('/'));
  T('الفئات القطرية الأربع = 24 لكل فئة', banks.qatar.every(n=>n===24), banks.qatar.join('/'));
  T('مسابقة التطوع: 24 سؤالاً بخيارات كاملة', banks.volOpts);
  T('جزء عم: لا أسئلة دخيلة', banks.juzIntruders===0, banks.juzIntruders+' دخيل');

  // ── 4) المسابقات الخمس ──
  const compVars=['_HH_AJYVOL_CAT','_HH_AJYSEC_CAT','_HH_AJYALC_CAT','_HH_WAFA_CAT'];
  for(const v of compVars){
    const r=await safeEval(page, async(vn)=>{
      if(typeof window[vn]==='undefined') return {skip:true};
      try{ startGame(['فريق أ','فريق ب'],[window[vn]],'اختبار'); }catch(e){ return {err:e.message}; }
      await new Promise(r=>setTimeout(r,1500));
      const img=document.querySelector('.wafa-frame img');
      return { cells:document.querySelectorAll('#board-grid .qcell').length,
        imgOK: !!(img&&img.complete&&img.naturalWidth>0),
        hdr:(document.querySelector('.wafa-header')||{}).textContent||'' };
    }, v);
    if(r.skip){ T('مسابقة '+v, false, 'المتغير غير معرف'); continue; }
    T('مسابقة '+(r.hdr||v)+': 24 خلية وصورة الوسط', r.cells===24 && r.imgOK, r.err||('خلايا: '+r.cells));
  }
  const perfFin=await safeEval(page, async()=>{
    if(typeof _HH_PERFFIN_CAT==='undefined') return {skip:true};
    const bank=(QDB[_HH_PERFFIN_CAT]||[]).length;
    try{ startGame(['أ','ب'],[_HH_PERFFIN_CAT],'ختامي'); }catch(e){ return {err:e.message}; }
    await new Promise(r=>setTimeout(r,1600));
    const img=document.querySelector('.wafa-frame img');
    return { bank, cells:document.querySelectorAll('#board-grid .qcell').length,
      imgOK: !!(img&&img.complete&&img.naturalWidth>0) };
  });
  T('مسابقة الحفل الختامي: بنك 48 ولوحة موسعة 36 وشعار بيرف', !perfFin.skip && !perfFin.err && perfFin.bank===48 && perfFin.cells===36 && perfFin.imgOK, perfFin.err||('بنك:'+(perfFin.bank||0)+' خلايا:'+(perfFin.cells||0)));

  const quran=await safeEval(page, async()=>{
    const cat='مسابقة أجيال في القرآن الكريم';
    if(!QDB[cat]) return {skip:true};
    try{ startGame(['أ','ب'],[cat],'قرآن'); }catch(e){ return {err:e.message}; }
    await new Promise(r=>setTimeout(r,1500));
    return { cells:document.querySelectorAll('#board-grid .qcell').length };
  });
  T('مسابقة القرآن الكريم: اللوحة تُبنى', !quran.skip && !quran.err && quran.cells>=24, quran.err||('خلايا: '+(quran.cells||0)));

  // ── 5) لوحة عامة بثمانية فرق ──
  const eight=await safeEval(page, async()=>{
    try{ startGame(['ف1','ف2','ف3','ف4','ف5','ف6','ف7','ف8'],['دين','أساطير الأمثال'],'ثمانية'); }catch(e){ return {err:e.message}; }
    await new Promise(r=>setTimeout(r,1500));
    const row=document.getElementById('b-scores-row');
    return { cards:row.querySelectorAll('.team-score-card').length,
      noScroll: row.scrollWidth<=row.clientWidth+2,
      cells:document.querySelectorAll('#board-grid .qcell').length };
  });
  T('ثمانية فرق: شريط ممتد بلا تمرير', eight.cards===8 && eight.noScroll, eight.err||('بطاقات: '+eight.cards));
  T('لوحة فئتين عامتين: خلايا مبنية', eight.cells>0, 'خلايا: '+eight.cells);

  // ── 6) مسار السؤال: الكشف ثم صوّب ثم الإغلاق ──
  const flow=await safeEval(page, async()=>{
    document.querySelector('#board-grid .qcell').click();
    await new Promise(r=>setTimeout(r,800));
    const out={};
    out.correctionHiddenBefore = document.getElementById('qm-correct-wrap').style.display==='none';
    try{ revealAnswer(); }catch(e){ out.err='reveal:'+e.message; }
    await new Promise(r=>setTimeout(r,300));
    out.answerShown = document.getElementById('answer-box').classList.contains('show');
    out.correctionShownAfter = document.getElementById('qm-correct-wrap').style.display!=='none';
    try{ closeModal(); }catch(e){ out.err='close:'+e.message; }
    await new Promise(r=>setTimeout(r,300));
    out.closed = getComputedStyle(document.getElementById('q-modal')).display==='none';
    return out;
  });
  T('مسار السؤال: كشف + صوّب بعد الكشف فقط + إغلاق', flow.answerShown && flow.correctionHiddenBefore && flow.correctionShownAfter && flow.closed, flow.err||'');

  // ── 7) سؤال أعلام بصورة محمّلة ──
  const flag=await safeEval(page, async()=>{
    try{ startGame(['أ','ب'],['أعلام الدول'],'أعلام'); }catch(e){ return {err:e.message}; }
    await new Promise(r=>setTimeout(r,1200));
    document.querySelector('#board-grid .qcell').click();
    await new Promise(r=>setTimeout(r,800));
    const el=document.getElementById('qm-img')||document.querySelector('#q-modal img');
    return { loaded: !!(el&&el.complete&&el.naturalWidth>0) };
  });
  T('سؤال أعلام: الصورة تظهر فعلاً', !!flag.loaded, flag.err||'');

  // ── 8) عدة المقدم ──
  const presenter=await safeEval(page, async()=>{
    const out={};
    try{ hhBlackout(true); out.bOn=document.getElementById('hh-blackout').style.display!=='none';
      hhBlackout(false); out.bOff=document.getElementById('hh-blackout').style.display==='none'; }catch(e){ out.err='B:'+e.message; }
    try{ out.fnExists = typeof hhToggleFullscreen==='function' && typeof hhToggleTimerPause==='function' && typeof hhToggleShortcutsHelp==='function'; }catch(e){}
    return out;
  });
  T('عدة المقدم: التعتيم والدوال الست', presenter.bOn && presenter.bOff && presenter.fnExists, presenter.err||'');

  // ── 9) أخطاء الصفحة ──
  T('لا أخطاء JavaScript قاتلة أثناء الجولة', pageErrors.length===0, pageErrors.slice(0,2).join(' | '));

  // ── الخلاصة ──
  const pass=results.filter(r=>r.ok).length;
  console.log('═'.repeat(50));
  console.log(`النتيجة: ${pass}/${results.length} ${pass===results.length?'— جاهزة للنشر ✅':'— أصلح الإخفاقات قبل النشر ⛔'}`);
  await browser.close();
  process.exit(pass===results.length?0:1);
})();
