// ═══════════════════════════════════════════════════════════
//  دفتر المتابعة الذكي · منظومة المعلم — المرحلة ٢
//  إدخال سريع (حضور/مشاركة/سلوك/واجب) بإجراءات جماعية.
//  كل ما يُسجَّل ينتقل تلقائياً إلى student_records (ملف الطالب م١).
//  يبني على: classrooms + classroom_students (الموجود).
// ═══════════════════════════════════════════════════════════
(function(){
  'use strict';
  function db(){ return firebase.firestore(); }
  function esc2(s){ return (typeof esc==='function') ? esc(s) : String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function toast2(m,k){ if(typeof toast==='function') toast(m,k||'info'); }
  function todayStr(){ return new Date().toISOString().slice(0,10); }
  function arDate(iso){
    try{ var d=iso?new Date(iso+'T00:00:00'):new Date();
      return d.toLocaleDateString('ar',{weekday:'long',day:'numeric',month:'long'});
    }catch(e){ return iso||''; }
  }

  var ST = { classCode:'', date:todayStr(), period:'1', students:[], data:{}, undo:[], dirty:false };
  var ATT6=[['present','حاضر','#3D6B53'],['absent','غائب','#8A1538'],['excabs','بعذر','#1F4E79'],['late','متأخر','#B8924A'],['excused','مستأذن','#8A6D2E'],['left','خرج مبكراً','#7a6a58']];
  var HW6=[['done','سلّم','#3D6B53'],['hwlate','متأخراً','#B8924A'],['partial','ناقص','#b5801f'],['missing','لم يسلّم','#8A1538'],['hwexc','بعذر','#1F4E79'],['redo','إعادة','#5E0E26']];
  function cfg(){ return (window._hhDPlusCfg&&window._hhDPlusCfg())||{tpls:[],counters:[]}; }
  var _saveTimer=null, _saving=false;
  function pushUndo(desc,fn){ ST.undo.push({d:desc,f:fn}); ST.dirty=true; refreshBar(); scheduleAutosave(); }
  function scheduleAutosave(){
    if(_saveTimer) clearTimeout(_saveTimer);
    _saveTimer=setTimeout(function(){ autosave(); }, 2000);
  }
  async function autosave(){
    if(_saving || !ST.dirty || !ST.students.length) return;
    _saving=true; setSaver('saving');
    try{ await hhSfuSaveAll(true); setSaver('saved'); }
    catch(e){ setSaver('offline'); }
    _saving=false;
  }
  function setSaver(state){
    var ind=document.getElementById('sfu-saveind'); if(!ind) return;
    if(state==='saving'){ ind.textContent='يحفظ…'; ind.style.color='#8A6D2E'; }
    else if(state==='saved'){ ind.textContent='محفوظ تلقائياً ✓'; ind.style.color='#3D6B53'; }
    else if(state==='offline'){ ind.textContent='بانتظار الاتصال'; ind.style.color='#c0392b'; }
  }
  function refreshBar(){
    var u=document.getElementById('sfu-undo'); if(u){ u.disabled=!ST.undo.length; u.style.opacity=ST.undo.length?'1':'.45'; }
    var ind=document.getElementById('sfu-saveind'); if(ind && !_saving){ ind.textContent=ST.dirty?'يحفظ تلقائياً…':'محفوظ تلقائياً ✓'; ind.style.color=ST.dirty?'#8A6D2E':'#3D6B53'; }
  }

  // ═══ فتح الدفتر الذكي ═══
  window.hhOpenSmartFollowup = async function(preCode){
    if(typeof currentUser==='undefined' || !currentUser){ toast2('يجب تسجيل الدخول أولاً','error'); return; }
    var isTeacher = (typeof _hhMyRole!=='undefined' && _hhMyRole==='teacher') || (typeof hhIsAdmin==='function' && hhIsAdmin());
    var ov=document.createElement('div'); ov.id='hh-sfu';
    ov.style.cssText='position:fixed;inset:0;background:rgba(42,8,16,.8);z-index:99992;overflow-y:auto;direction:rtl;font-family:Cairo,sans-serif;';
    ov.innerHTML='<div style="max-width:760px;margin:0 auto;min-height:100vh;background:linear-gradient(180deg,#F6F1E7,#EFE7D6);">'
      +'<div style="padding:40px;text-align:center;color:#8A7A63;font-weight:800;">جارٍ تحميل الفصول…</div></div>';
    document.body.appendChild(ov);
    // جلب فصول المعلم من classrooms (الموجود)
    var classes=[];
    try{
      var qs=await db().collection('classrooms').where('teacherId','==',currentUser.uid).get();
      qs.forEach(function(d){ var c=d.data(); if(c.active!==false) classes.push({code:d.id, name:c.className||'فصل', subject:c.subject||'', count:c.studentCount||0}); });
    }catch(e){ console.warn(e); }
    renderShell(ov, classes, preCode);
  };

  function renderShell(ov, classes, preCode){
    if(!classes.length){
      ov.querySelector('div').innerHTML='<div style="padding:60px 24px;text-align:center;">'
        +'<div style="color:#8A1538;font-weight:900;font-size:1.1rem;margin-bottom:8px;">لا فصول بعد</div>'
        +'<div style="color:#8A7A63;font-size:.85rem;">أنشئ فصلاً من «صفوفي وطلابي» أولاً</div>'
        +'<button onclick="document.getElementById(\'hh-sfu\').remove()" style="margin-top:16px;background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;border-radius:12px;padding:11px 24px;font-family:Cairo;font-weight:800;cursor:pointer;">رجوع</button></div>';
      return;
    }
    ST.classCode = preCode || classes[0].code;
    var wrap=ov.querySelector('div');
    wrap.innerHTML='<div style="background:linear-gradient(135deg,#4A0B1E,#5E0E26);padding:16px 20px;position:sticky;top:0;z-index:5;box-shadow:0 3px 14px rgba(42,8,16,.3);">'
      +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:13px;">'
      +  '<button onclick="document.getElementById(\'hh-sfu\').remove()" style="background:rgba(212,188,133,.14);border:1px solid #B8924A;border-radius:10px;width:36px;height:36px;color:#F5E6C4;font-weight:900;cursor:pointer;flex-shrink:0;">→</button>'
      +  '<div style="flex:1;"><div style="color:#FFFDF8;font-weight:900;font-size:1.15rem;">دفتر المتابعة الذكي</div><div style="color:#D4BC85;font-size:.68rem;">إدخال سريع · ينتقل تلقائياً لملف الطالب</div></div>'
      +  '<button onclick="hhSfuGuide()" title="الدليل الكامل" style="background:rgba(212,188,133,.14);border:1px solid #B8924A;border-radius:10px;padding:7px 13px;color:#F5E6C4;font-family:Cairo;font-weight:900;font-size:.72rem;cursor:pointer;flex-shrink:0;">الدليل</button>'
      +'</div>'
      // المحددات: الفصل · التاريخ · الحصة
      +'<div style="display:flex;gap:8px;flex-wrap:wrap;">'
      +  '<button onclick="hhSfuRenameClass()" title="تعديل اسم الفصل" style="border:1.5px solid #B8924A;background:#FDFAF3;color:#8A6D2E;border-radius:10px;width:38px;font-family:Cairo;font-weight:900;font-size:.85rem;cursor:pointer;flex-shrink:0;">✎</button>'
      +  '<select id="sfu-class" style="flex:1;min-width:120px;border:1.5px solid #B8924A;border-radius:10px;padding:9px 11px;font-family:Cairo;font-weight:800;font-size:.8rem;background:#FDFAF3;color:#3D0918;">'+classes.map(function(c){return '<option value="'+esc2(c.code)+'"'+(c.code===ST.classCode?' selected':'')+'>'+esc2(c.name)+(c.subject?' · '+esc2(c.subject):'')+'</option>';}).join('')+'</select>'
      +  '<div id="sfu-datechip" style="display:flex;align-items:center;gap:7px;background:rgba(212,188,133,.16);border:1.5px solid #B8924A;border-radius:10px;padding:7px 11px;">'
      +    '<span id="sfu-datetxt" style="color:#FFFFFF;font-weight:900;font-size:.72rem;">'+arDate(ST.date)+'</span>'
      +    '<span id="sfu-dateauto" style="background:#3D6B53;color:#fff;border-radius:8px;padding:1px 7px;font-size:.52rem;font-weight:900;">تلقائي</span>'
      +    '<span onclick="hhSfuDatePick()" style="color:#8A6D2E;font-size:.6rem;font-weight:800;text-decoration:underline;cursor:pointer;">تغيير</span>'
      +    '<input id="sfu-date" type="date" value="'+ST.date+'" style="display:none;">'
      +  '</div>'
      +  '<select id="sfu-period" style="border:1.5px solid #B8924A;border-radius:10px;padding:9px 11px;font-family:Cairo;font-weight:800;font-size:.8rem;background:#FDFAF3;color:#3D0918;">'+[1,2,3,4,5,6,7].map(function(p){return '<option value="'+p+'">الحصة '+p+'</option>';}).join('')+'</select>'
      +'</div></div>'
      // ═══ شريط التبويبات النظيف ═══
      +'<div style="padding:10px 20px 0;">'
      +'<div id="sfu-tabs" style="display:flex;gap:4px;border-bottom:2px solid #4A0B1E;">'
      +  '<button data-tab="record" onclick="hhSfuTab(\'record\')" class="sfu-tab sfu-tab-on" style="flex:1;padding:9px 4px;border:none;border-radius:9px 9px 0 0;font-family:Cairo;font-weight:900;font-size:.7rem;cursor:pointer;background:#4A0B1E;color:#F5E6C4;">الرصد</button>'
      +  '<button data-tab="report" onclick="hhSfuTab(\'report\')" class="sfu-tab" style="flex:1;padding:9px 4px;border:none;border-radius:9px 9px 0 0;font-family:Cairo;font-weight:900;font-size:.7rem;cursor:pointer;background:#EDE3CE;color:#8a7a60;">تقرير الصف</button>'
      +  '<button data-tab="command" onclick="hhSfuTab(\'command\')" class="sfu-tab" style="flex:1;padding:9px 4px;border:none;border-radius:9px 9px 0 0;font-family:Cairo;font-weight:900;font-size:.7rem;cursor:pointer;background:#EDE3CE;color:#8a7a60;">مركز القيادة</button>'
      +  '<button data-tab="manage" onclick="hhSfuTab(\'manage\')" class="sfu-tab" style="flex:1;padding:9px 4px;border:none;border-radius:9px 9px 0 0;font-family:Cairo;font-weight:900;font-size:.7rem;cursor:pointer;background:#EDE3CE;color:#8a7a60;">إدارة الفصل</button>'
      +  '<button data-tab="settings" onclick="hhSfuTab(\'settings\')" class="sfu-tab" style="flex:1;padding:9px 4px;border:none;border-radius:9px 9px 0 0;font-family:Cairo;font-weight:900;font-size:.7rem;cursor:pointer;background:#EDE3CE;color:#8a7a60;">الإعدادات</button>'
      +'</div>'
      // شريط الرصد الجماعي (يظهر في تبويب الرصد فقط)
      +'<div id="sfu-bulkbar" style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;padding-top:9px;">'
      +  '<button onclick="hhSfuBulkAll(\'present\')" style="background:linear-gradient(135deg,#3D6B53,#2C5340);color:#fff;border:none;border-radius:10px;padding:8px 13px;font-family:Cairo;font-weight:800;font-size:.72rem;cursor:pointer;">الجميع حاضرون</button>'
      +  '<button onclick="hhSfuBulkPart()" style="background:rgba(184,146,74,.15);border:1px solid #B8924A;color:#8A6D2E;border-radius:10px;padding:8px 13px;font-family:Cairo;font-weight:800;font-size:.72rem;cursor:pointer;">+ مشاركة للمحدّدين</button>'
      +  '<button onclick="hhSfuBulkHw()" style="background:rgba(184,146,74,.15);border:1px solid #B8924A;color:#8A6D2E;border-radius:10px;padding:8px 13px;font-family:Cairo;font-weight:800;font-size:.72rem;cursor:pointer;">أنجز الواجب للمحدّدين</button>'
      +  '<button id="sfu-undo" onclick="hhSfuUndo()" style="background:#FFFDF8;border:1px solid #8A1538;color:#8A1538;border-radius:10px;padding:8px 13px;font-family:Cairo;font-weight:800;font-size:.72rem;cursor:pointer;opacity:.45;">تراجع</button>'
      +  '<span id="sfu-saveind" style="font-size:.66rem;font-weight:800;color:#3D6B53;align-self:center;">محفوظ ✓</span>'
      +'</div>'
      // منصة الخدمات (تعرض محتوى التبويب المختار · فارغة في تبويب الرصد)
      +'<div id="sfu-stage" style="display:none;background:#fbfaf7;border:1.5px solid #EDE3CE;border-top:none;border-radius:0 0 12px 12px;padding:14px;margin-bottom:4px;"></div>'
      +'</div>'
      +'<div id="sfu-list" style="padding:14px 20px 90px;"></div>'
      // شريط الحفظ السفلي
      +'<div style="position:fixed;bottom:0;right:0;left:0;max-width:760px;margin:0 auto;background:#FFFDF8;border-top:2px solid #B8924A;padding:12px 20px;display:flex;gap:10px;align-items:center;box-shadow:0 -4px 14px rgba(94,14,38,.1);">'
      +  '<div id="sfu-summary" style="flex:1;font-size:.72rem;color:#8A7A63;font-weight:700;"></div>'
      +  '<button onclick="hhSfuSaveAll()" style="background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;border-radius:12px;padding:12px 28px;font-family:Cairo;font-weight:900;font-size:.88rem;cursor:pointer;box-shadow:0 6px 16px rgba(138,21,56,.25);">حفظ اليوم</button>'
      +'</div>';
    document.getElementById('sfu-class').onchange=function(){ ST.classCode=this.value; loadStudents(); };
    // التاريخ يصحح نفسه لليوم عند كل فتح
    ST.date=todayStr();
    (function(){ var dt=document.getElementById('sfu-datetxt'); if(dt) dt.textContent=arDate(ST.date); var di=document.getElementById('sfu-date'); if(di) di.value=ST.date; })();
    document.getElementById('sfu-date').onchange=function(){
      ST.date=this.value;
      var dt=document.getElementById('sfu-datetxt'); if(dt) dt.textContent=arDate(ST.date);
      var au=document.getElementById('sfu-dateauto');
      var isToday=(ST.date===todayStr());
      if(au){ au.textContent=isToday?'تلقائي':'يوم سابق'; au.style.background=isToday?'#3D6B53':'#B8924A'; }
      var chip=document.getElementById('sfu-datechip'); if(chip) chip.style.borderColor=isToday?'#B8924A':'#8A1538';
    };
    document.getElementById('sfu-period').onchange=function(){ ST.period=this.value; };
    loadStudents();
  }

  async function loadStudents(){
    var list=document.getElementById('sfu-list'); if(list) list.innerHTML='<div style="text-align:center;color:#8A7A63;padding:20px;font-weight:800;">جارٍ تحميل الطلاب…</div>';
    ST.students=[]; ST.data={};
    try{
      var base=db().collection('classroom_students').where('classCode','==',ST.classCode).where('active','==',true);
      var qs=await base.where('teacherId','==',currentUser.uid).get();
      if((!qs.docs || !qs.docs.length) && typeof hhIsAdmin==='function' && hhIsAdmin()){
        try{ qs=await base.get(); }catch(e2){}
      }
      qs.forEach(function(d){ var s=d.data(); ST.students.push({id:d.id, name:s.studentName||s.name||'طالب'}); });
    }catch(e){
      console.warn('sfu load', e);
      if(list) list.innerHTML='<div style="background:#fff6f4;border:1.5px solid #c0392b;border-radius:14px;padding:18px;text-align:center;">'
        +'<div style="font-weight:900;color:#8A1538;font-size:.84rem;margin-bottom:8px;">تعذر تحميل طلاب الفصل</div>'
        +'<div style="color:#8A7A63;font-size:.7rem;font-weight:700;margin-bottom:10px;">تحقق من اتصالك، وإن استمر الأمر فربما تحتاج نشر آخر نسخة من قواعد Firestore</div>'
        +'<button onclick="hhSfuReload()" style="background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;border-radius:10px;padding:9px 22px;font-family:Cairo;font-weight:900;font-size:.76rem;cursor:pointer;">إعادة المحاولة</button></div>';
      updateSummary(); return;
    }
    ST.students.forEach(function(s){ ST.data[s.id]={att:'present', part:0, hw:null, hwOpen:false, behavior:null, stars:0, cust:{}, sel:false, open:false}; });
    ST.undo=[]; ST.dirty=false;
    renderList();
  }

  function renderList(){
    var el=document.getElementById('sfu-list'); if(!el)return;
    var bb=document.getElementById('sfu-bulkbar');
    var inRecord = (window._sfuTab||'record')==='record';
    if(bb) bb.style.display = (inRecord && ST.students.length) ? 'flex' : 'none';
    if(!ST.students.length){
      el.innerHTML='<div style="background:#FFFDF8;border:1.5px dashed #C9B37E;border-radius:16px;padding:28px 18px;text-align:center;">'
        +'<div style="font-weight:900;color:#3D0918;font-size:.95rem;margin-bottom:5px;">الفصل جاهز وينتظر طلابه</div>'
        +'<div style="color:#8A7A63;font-size:.72rem;font-weight:700;margin-bottom:15px;">أضفهم واحداً واحداً، أو استورد ملف Excel وفيه عمود الفصل فتتوزع الشعب تلقائياً</div>'
        +'<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">'
        +'<button onclick="hhSfuAddStudent()" style="background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;border-radius:12px;padding:12px 24px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;">إضافة طالب</button>'
        +'<button onclick="if(window.hhDPlusImport)hhDPlusImport()" style="background:#FFFDF8;border:1.5px solid #1F4E79;color:#1F4E79;border-radius:12px;padding:12px 24px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;">استيراد من Excel</button>'
        +'</div></div>';
      updateSummary(); refreshBar(); return;
    }
    var counters=cfg().counters||[];
    el.innerHTML=ST.students.map(function(s){
      var d=ST.data[s.id];
      var hwSt=HW6.filter(function(x){return x[0]===d.hw;})[0];
      var isP=(d.att!=='absent');
      var counters=cfg().counters||[];
      /* شارات ملخص لما رُصد، تُرى والبطاقة مطوية */
      var hints='';
      if(d.part>0) hints+='<span style="font-size:.6rem;font-weight:900;color:#1F4E79;">مشاركة '+d.part+'</span>';
      if(hwSt) hints+='<span style="font-size:.6rem;font-weight:900;color:'+hwSt[2]+';">واجب: '+hwSt[1]+'</span>';
      if(d.stars>0) hints+='<span style="font-size:.6rem;font-weight:900;color:#B8924A;">★'+d.stars+'</span>';
      if(d.behavior==='good') hints+='<span style="font-size:.6rem;font-weight:900;color:#3D6B53;">سلوك ★</span>';
      if(d.behavior==='bad') hints+='<span style="font-size:.6rem;font-weight:900;color:#8A1538;">سلوك !</span>';
      counters.forEach(function(cn){ var n=d.cust[cn.name]||0; if(n) hints+='<span style="font-size:.6rem;font-weight:900;color:#8A6D2E;">'+esc2(cn.name)+' '+n+'</span>'; });
      if(hints) hints='<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:2px;">'+hints+'</div>';
      /* التفصيل: كل أدوات الرصد عند الطلب */
      var detail='';
      if(d.open){
        // دائرة أداة سريعة
        function circ(icon,label,color,filled,badge,onclick){
          return '<div style="text-align:center;cursor:pointer;" onclick="'+onclick+'">'
            +'<div style="position:relative;width:46px;height:46px;border-radius:50%;border:2px solid '+color+';background:'+(filled||'#fff')+';color:'+(filled?'#fff':color)+';display:flex;align-items:center;justify-content:center;font-size:1.15rem;font-weight:900;margin:0 auto;">'+icon
            +(badge?'<span style="position:absolute;top:-5px;left:-4px;background:#8A1538;color:#fff;border-radius:9px;min-width:17px;height:17px;font-size:.56rem;font-weight:900;display:flex;align-items:center;justify-content:center;padding:0 4px;">'+badge+'</span>':'')
            +'</div><div style="font-size:.54rem;font-weight:900;color:#8a7a60;margin-top:3px;">'+label+'</div></div>';
        }
        var hwIcon = d.hw==='done'||d.hw==='hwlate' ? '✓' : (d.hw==='missing'||d.hw==='partial' ? '✗' : '📋');
        var hwFill = (d.hw==='done'||d.hw==='hwlate') ? '#3D6B53' : ((d.hw==='missing'||d.hw==='partial') ? '#c0392b' : '');
        var hwColor= hwFill||'#B8924A';
        var behFill= d.behavior==='good'?'#3D6B53':(d.behavior==='bad'?'#8A1538':'');
        var circles='<div style="display:flex;gap:11px;flex-wrap:wrap;">'
          + circ('✋','مشاركة','#1F4E79', d.part?'#1F4E79':'', d.part||'', "hhSfuPart('"+esc2(s.id)+"',1)")
          + circ(hwIcon, d.hw?(HW6.filter(function(x){return x[0]===d.hw;})[0]||['','واجب'])[1]:'واجب', hwColor, hwFill, '', "hhSfuHwQuick('"+esc2(s.id)+"')")
          + circ('★','تميز','#B8924A', d.stars?'linear-gradient(135deg,#EAD9B0,#B8924A)':'', d.stars||'', "hhSfuStar('"+esc2(s.id)+"')")
          + circ('👍','سلوك','#3D6B53', behFill, '', "hhSfuBehav('"+esc2(s.id)+"')")
          + circ('✎','ملاحظة','#8A1538','','', "hhSfuNote('"+esc2(s.id)+"')")
          + circ('٪','درجة','#1F4E79','','', "hhSfuGrade('"+esc2(s.id)+"')")
          + (counters||[]).map(function(cn,ci){ var n=d.cust[cn.name]||0;
              return circ(esc2(cn.name.slice(0,2)), esc2(cn.name), '#8A6D2E', n?'#8A6D2E':'', n||'', "hhSfuCust('"+esc2(s.id)+"',"+ci+")"); }).join('')
          +'</div>';
        // قسم الرأي والملاحظات
        var opText = d.__opdraft!=null ? d.__opdraft : (d.__oprec||'');
        var opSection='<div style="margin-top:9px;background:#FBF7EE;border:1.5px solid #B8924A;border-radius:12px;padding:9px 11px;">'
          +'<div style="display:flex;align-items:center;gap:6px;font-weight:900;font-size:.68rem;color:#4A0B1E;margin-bottom:6px;">رأي المعلم <span style="background:#3D6B53;color:#fff;border-radius:7px;padding:1px 7px;font-size:.48rem;font-weight:900;">تلقائي · قابل للتعديل</span></div>'
          +'<textarea id="sfu-op-'+esc2(s.id)+'" placeholder="يُصاغ تلقائياً، عدّله أو أضف إليه…" style="width:100%;box-sizing:border-box;border:1.4px solid #E3D9C6;border-radius:9px;padding:7px 9px;font-family:Cairo;font-size:.66rem;font-weight:700;color:#3b2a1a;line-height:1.85;min-height:52px;background:#fff;">'+esc2(opText)+'</textarea>'
          +'<div style="display:flex;gap:6px;margin-top:6px;">'
          +'<button onclick="hhSfuOpSave(\''+esc2(s.id)+'\')" style="background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;border-radius:9px;padding:6px 13px;font-family:Cairo;font-weight:900;font-size:.62rem;cursor:pointer;">حفظ الرأي</button>'
          +'<button onclick="hhSfuOpRegen(\''+esc2(s.id)+'\')" style="background:#fff;border:1.4px solid #B8924A;color:#8A6D2E;border-radius:9px;padding:6px 11px;font-family:Cairo;font-weight:900;font-size:.6rem;cursor:pointer;">↻ إعادة توليد</button>'
          +'</div>'
          + (d.__ophist&&d.__ophist.length ? '<div style="margin-top:6px;">'+d.__ophist.slice(-2).reverse().map(function(h){ return '<div style="background:#fff;border:1px solid #EDE3CE;border-radius:8px;padding:5px 9px;margin-top:4px;font-size:.58rem;font-weight:700;color:#5a4a30;">رأي سابق: '+esc2(h.text)+' <span style="color:#a99;font-size:.52rem;">('+esc2(h.date)+')</span></div>'; }).join('')+'</div>':'')
          +'</div>';
        var noteSection='<div style="margin-top:8px;background:#fff;border:1.5px solid #c9a0ab;border-radius:12px;padding:9px 11px;">'
          +'<div style="font-weight:900;font-size:.66rem;color:#8A1538;margin-bottom:5px;">ملاحظات سريعة</div>'
          +'<div style="display:flex;gap:4px;flex-wrap:wrap;">'
          +['تفاعل ممتاز اليوم','لم يحضر الأدوات','يحتاج متابعة','تحسّن ملحوظ'].map(function(t){
             return '<button onclick="hhSfuQuickNote(\''+esc2(s.id)+'\',\''+t+'\')" style="background:#FBF5E9;border:1px solid #E8DCC2;border-radius:11px;padding:4px 10px;font-family:Cairo;font-weight:800;font-size:.58rem;color:#5a4a30;cursor:pointer;">'+t+'</button>'; }).join('')
          +'<button onclick="hhSfuNote(\''+esc2(s.id)+'\')" style="background:#8A1538;color:#fff;border:none;border-radius:11px;padding:4px 12px;font-family:Cairo;font-weight:800;font-size:.58rem;cursor:pointer;">✎ ملاحظة مطوّلة</button>'
          +'</div></div>';
        detail = '<div style="margin-top:9px;padding-top:9px;border-top:1px dashed #EDE3CE;">'+circles+opSection+noteSection+'</div>';
      }
            return '<div class="sfu-row" data-id="'+esc2(s.id)+'" style="background:#FFFDF8;border:1.5px solid '+(d.sel?'#8A1538':'#EDE3CE')+';border-radius:14px;padding:10px 13px;margin-bottom:8px;">'
        +'<div style="display:flex;align-items:center;gap:9px;">'
        +  '<input type="checkbox" '+(d.sel?'checked':'')+' onchange="hhSfuToggleSel(\''+esc2(s.id)+'\')" style="width:17px;height:17px;accent-color:#8A1538;flex-shrink:0;">'
        +  '<div style="flex:1;min-width:0;"><div style="font-weight:900;color:#3D0918;font-size:.88rem;cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-bottom:1px dashed #C9B37E;display:inline-block;max-width:100%;padding-bottom:1px;" onclick="hhOpenStudentFile(\''+esc2(s.id)+'\',\''+esc2(ST.classCode)+'\')" title="افتح ملف الطالب">'+esc2(s.name)+'</div>'+hints+'</div>'
        +  '<button onclick="hhSfuStudentReport(\''+esc2(s.id)+'\')" title="التقرير التربوي الفردي" style="background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;border-radius:9px;padding:7px 10px;font-weight:900;font-size:.64rem;font-family:Cairo;cursor:pointer;flex-shrink:0;">تقرير</button>'
        +  '<span style="display:flex;border-radius:11px;overflow:hidden;border:1.8px solid '+(isP?'#3D6B53':'#8A1538')+';flex-shrink:0;">'
        +    '<button onclick="hhSfuSetAtt(\''+esc2(s.id)+'\',\'present\')" style="padding:7px 15px;font-size:.72rem;font-weight:900;font-family:Cairo;border:none;cursor:pointer;background:'+(isP?'#3D6B53':'#fff')+';color:'+(isP?'#fff':'#3D6B53')+';">حاضر</button>'
        +    '<button onclick="hhSfuSetAtt(\''+esc2(s.id)+'\',\'absent\')" style="padding:7px 15px;font-size:.72rem;font-weight:900;font-family:Cairo;border:none;cursor:pointer;background:'+(isP?'#fff':'#8A1538')+';color:'+(isP?'#8A1538':'#fff')+';">غائب</button>'
        +  '</span>'
        +  '<button onclick="hhSfuOpen(\''+esc2(s.id)+'\')" style="border:1.5px solid #C9B37E;color:#8A6D2E;border-radius:9px;padding:7px 10px;font-weight:900;font-size:.68rem;background:#FFFDF8;font-family:Cairo;cursor:pointer;flex-shrink:0;">'+(d.open?'▴':'▾')+' التفصيل</button>'
        +'</div>'
        + detail
        +'</div>';
    }).join('');
    updateSummary(); refreshBar();
  }

  function updateSummary(){
    var s=document.getElementById('sfu-summary'); if(!s)return;
    var present=0,absent=0,sel=0;
    Object.keys(ST.data).forEach(function(k){ var d=ST.data[k]; if(d.att==='present')present++; if(d.att==='absent')absent++; if(d.sel)sel++; });
    s.textContent = ST.students.length+' طالباً · '+present+' حاضر · '+absent+' غائب'+(sel?' · '+sel+' محدّد':'');
  }

  // إجراءات فردية (كلها قابلة للتراجع قبل الحفظ)
  window.hhSfuToggleManage=function(){
    var m=document.getElementById('sfu-mng'), b=document.getElementById('sfu-mngbtn');
    if(!m) return;
    var open=m.style.display!=='flex';
    m.style.display=open?'flex':'none';
    if(b) b.textContent=open?'إدارة الفصل ▴':'إدارة الفصل ▾';
  };
  window.hhSfuReload=function(){ loadStudents(); };
  window.hhSfuSetAtt=function(id,k){ var p=ST.data[id].att; if(p===k)return; ST.data[id].att=k; pushUndo('حضور',function(){ST.data[id].att=p;}); renderList(); };
  window.hhSfuPart=function(id,n){ var p=ST.data[id].part; var v=Math.max(0,p+n); if(v===p)return; ST.data[id].part=v; pushUndo('مشاركة',function(){ST.data[id].part=p;}); renderList(); };
  window.hhSfuHwToggle=function(id){ ST.data[id].hwOpen=!ST.data[id].hwOpen; renderList(); };
  window.hhSfuHwSet=function(id,st){ var p=ST.data[id].hw; ST.data[id].hw=st; ST.data[id].hwOpen=false; if(p!==st) pushUndo('واجب',function(){ST.data[id].hw=p;}); renderList(); };
  window.hhSfuBehav=function(id){ var p=ST.data[id].behavior; ST.data[id].behavior = p===null?'good':(p==='good'?'bad':null); pushUndo('سلوك',function(){ST.data[id].behavior=p;}); renderList(); };
  window.hhSfuStar=function(id){ ST.data[id].stars++; pushUndo('تميز',function(){ST.data[id].stars=Math.max(0,ST.data[id].stars-1);}); renderList(); };
  // الواجب السريع: فارغ ← سلّم ← لم يسلّم ← فارغ
  window.hhSfuHwQuick=function(id){
    var cur=ST.data[id].hw, nx = cur==null?'done':(cur==='done'?'missing':null);
    var p=cur; ST.data[id].hw=nx; if(p!==nx) pushUndo('واجب',function(){ST.data[id].hw=p;}); renderList();
  };
  // الملاحظة السريعة بقالب جاهز: حفظ فوري
  window.hhSfuQuickNote=async function(id,txt){
    try{
      await db().collection('student_records').doc(id).set({
        notes: firebase.firestore.FieldValue.arrayUnion({ text:txt, date:ST.date, by:currentUser.uid, at:Date.now() })
      },{merge:true});
      toast2('سُجّلت الملاحظة','success');
    }catch(e){ toast2('تعذر الحفظ','error'); }
  };
  // رأي المعلم: تعديل، حفظ (بسجل)، إعادة توليد
  window.hhSfuOpSave=async function(id){
    var el=document.getElementById('sfu-op-'+id); if(!el) return;
    var txt=(el.value||'').trim().slice(0,700);
    if(!txt){ toast2('اكتب الرأي أولاً','info'); return; }
    ST.data[id].__opdraft=txt;
    try{
      await db().collection('student_records').doc(id).set({
        opinion: txt,
        opinionHistory: firebase.firestore.FieldValue.arrayUnion({ text:txt, date:ST.date, at:Date.now() })
      },{merge:true});
      ST.data[id].__oprec=txt;
      ST.data[id].__ophist=(ST.data[id].__ophist||[]).concat([{text:txt,date:ST.date}]);
      toast2('حُفظ رأي المعلم في ملف الطالب','success');
    }catch(e){ toast2('تعذر الحفظ، تحقق من الاتصال','error'); }
  };
  window.hhSfuOpRegen=function(id){
    var stu=ST.students.filter(function(x){return x.id===id;})[0];
    var rec=ST.data[id].__recCache||{};
    var draft = window.hhDPlusOpinionDraft ? window.hhDPlusOpinionDraft(rec) : 'تابع الرصد اليومي وسيتكوّن الرأي تلقائياً.';
    ST.data[id].__opdraft=draft;
    var el=document.getElementById('sfu-op-'+id); if(el) el.value=draft;
  };
  window.hhSfuCust=function(id,ci){ var c=(cfg().counters||[])[ci]; if(!c)return; var n=ST.data[id].cust[c.name]||0; ST.data[id].cust[c.name]=n+1; pushUndo(c.name,function(){ST.data[id].cust[c.name]=n;}); renderList(); };
  window.hhSfuDatePick=function(){
    var di=document.getElementById('sfu-date'); if(!di) return;
    di.style.display='inline-block';
    if(di.showPicker){ try{ di.showPicker(); }catch(e){ di.focus(); } } else { di.focus(); }
  };
  // ═══ مبدّل التبويبات · يعرض الخدمة داخل الدفتر دون مغادرة ═══
  window._sfuTab='record';
  window.hhSfuTab=function(tab){
    window._sfuTab=tab;
    // تلوين التبويب النشط
    var tabs=document.querySelectorAll('#sfu-tabs .sfu-tab');
    tabs.forEach(function(b){
      var on=(b.getAttribute('data-tab')===tab);
      b.style.background=on?'#4A0B1E':'#EDE3CE';
      b.style.color=on?'#F5E6C4':'#8a7a60';
    });
    var stage=document.getElementById('sfu-stage');
    var list=document.getElementById('sfu-list');
    var bulk=document.getElementById('sfu-bulkbar');
    if(!stage) return;
    if(tab==='record'){
      // الرصد: القائمة ظاهرة، المنصة مخفية، شريط الرصد ظاهر
      stage.style.display='none';
      if(list) list.style.display='';
      if(bulk) bulk.style.display = ST.students.length?'flex':'none';
      return;
    }
    // بقية التبويبات: القائمة والرصد يختفيان، المنصة تعرض الخدمة
    if(list) list.style.display='none';
    if(bulk) bulk.style.display='none';
    stage.style.display='block';
    stage.innerHTML='<div style="text-align:center;color:#8A7A63;font-weight:800;font-size:.74rem;padding:14px;">جارٍ التحضير…</div>';
    if(tab==='report'){ hhSfuStageReport(stage); }
    else if(tab==='command'){ hhSfuStageCommand(stage); }
    else if(tab==='manage'){ hhSfuStageManage(stage); }
    else if(tab==='settings'){ hhSfuStageSettings(stage); }
  };

  // تقرير الصف داخل المنصة
  function hhSfuStageReport(stage){
    stage.innerHTML='<div style="text-align:center;padding:6px 0 12px;">'
      +'<div style="font-weight:900;font-size:.86rem;color:#4A0B1E;margin-bottom:6px;">تقرير الصف الجامع</div>'
      +'<div style="font-size:.68rem;color:#8A7A63;font-weight:700;margin-bottom:12px;line-height:1.9;">متوسطات الفصل وجدول كل طالب وقائمة من يحتاج دعماً، بشعار مدرستك وتواقيعها، جاهز للطباعة PDF أو Excel.</div>'
      +'<button onclick="if(window.hhDPlusClassReport)hhDPlusClassReport(ST.classCode,ST.students)" style="background:linear-gradient(135deg,#8A6D2E,#6a5320);color:#fff;border:none;border-radius:11px;padding:11px 26px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;">فتح تقرير الصف</button>'
      +'</div>';
  }
  // مركز القيادة داخل المنصة
  function hhSfuStageCommand(stage){
    stage.innerHTML='<div id="sfu-cc-mount"></div>';
    // نعيد استخدام دالة القيادة لكن نوجّه مخرجها للمنصة
    hhSfuCommandInto(document.getElementById('sfu-cc-mount'));
  }
  // إدارة الفصل داخل المنصة
  function hhSfuStageManage(stage){
    stage.innerHTML='<div style="display:flex;gap:7px;flex-wrap:wrap;">'
      +'<button onclick="hhSfuAddStudent()" style="background:#FFFDF8;border:1.5px solid #3D6B53;color:#3D6B53;border-radius:10px;padding:9px 14px;font-family:Cairo;font-weight:900;font-size:.72rem;cursor:pointer;">إضافة طالب</button>'
      +'<button onclick="if(window.hhDPlusImport)hhDPlusImport()" style="background:#FFFDF8;border:1.5px solid #1F4E79;color:#1F4E79;border-radius:10px;padding:9px 14px;font-family:Cairo;font-weight:900;font-size:.72rem;cursor:pointer;">استيراد Excel</button>'
      +'<button onclick="hhSfuRenameClass()" style="background:#FFFDF8;border:1.5px solid #B8924A;color:#8A6D2E;border-radius:10px;padding:9px 14px;font-family:Cairo;font-weight:900;font-size:.72rem;cursor:pointer;">تعديل اسم الفصل</button>'
      +(typeof hhOpenGradebook==='function' ? '<button onclick="hhOpenGradebook()" style="background:#FFFDF8;border:1.5px solid #8A6D2E;color:#8A6D2E;border-radius:10px;padding:9px 14px;font-family:Cairo;font-weight:900;font-size:.72rem;cursor:pointer;">أدوات الدرجات المتقدمة</button>' : '')
      +'<button onclick="hhSfuDeleteSel()" style="background:#FFFDF8;border:1.5px solid #8A1538;color:#8A1538;border-radius:10px;padding:9px 14px;font-family:Cairo;font-weight:900;font-size:.72rem;cursor:pointer;">حذف المحدّدين</button>'
      +'<button onclick="hhSfuDeleteAll()" style="background:#FFFDF8;border:1.5px solid #7a2a2a;color:#7a2a2a;border-radius:10px;padding:9px 14px;font-family:Cairo;font-weight:900;font-size:.72rem;cursor:pointer;">حذف كل الطلاب</button>'
      +'</div>'
      +'<div style="font-size:.64rem;color:#8A7A63;font-weight:700;margin-top:10px;line-height:1.8;">تُدار كل شؤون الفصل من هنا. الحذف يخفي الطالب من القوائم وتبقى سجلاته التاريخية محفوظة في ملفه.</div>';
  }
  // الإعدادات داخل المنصة
  function hhSfuStageSettings(stage){
    stage.innerHTML='<div style="text-align:center;padding:6px 0 12px;">'
      +'<div style="font-weight:900;font-size:.86rem;color:#4A0B1E;margin-bottom:6px;">إعدادات المتابعة والتقارير</div>'
      +'<div style="font-size:.68rem;color:#8A7A63;font-weight:700;margin-bottom:12px;line-height:1.9;">قوالب ملاحظاتك وعدّاداتك المخصصة وشعار المدرسة وأسماء التقارير وخيارات إظهارها، تُحفظ في حسابك وتتبعك على كل أجهزتك.</div>'
      +'<button onclick="if(window.hhDPlusSettings)hhDPlusSettings()" style="background:linear-gradient(135deg,#B8924A,#8A6D2E);color:#fff;border:none;border-radius:11px;padding:11px 26px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;">فتح الإعدادات</button>'
      +'</div>';
  }

  window.hhSfuOpen=async function(id){
    ST.data[id].open=!ST.data[id].open;
    // أول فتح: اجلب سجل الطالب لتجهيز الرأي التلقائي والملاحظات
    if(ST.data[id].open && ST.data[id].__oprec===undefined){
      renderList();
      try{
        var snap=await db().collection('student_records').doc(id).get();
        var rec = snap.exists ? snap.data() : {};
        var stu=ST.students.filter(function(x){return x.id===id;})[0];
        rec.name=(stu&&stu.name)||rec.name; 
        ST.data[id].__recCache=rec;
        ST.data[id].__oprec = rec.opinion || (window.hhDPlusOpinionDraft?window.hhDPlusOpinionDraft(rec):'');
        ST.data[id].__ophist = (rec.opinionHistory||[]).map(function(h){return {text:h.text,date:h.date};});
      }catch(e){ ST.data[id].__oprec=''; ST.data[id].__ophist=[]; }
    }
    renderList();
  };
  window.hhSfuStudentReport=async function(id){
    var stu=ST.students.filter(function(x){return x.id===id;})[0]; if(!stu) return;
    toast2('جارٍ تجهيز التقرير التربوي…','info');
    var rec={ name:stu.name, classCode:ST.classCode };
    try{
      var snap=await db().collection('student_records').doc(id).get();
      if(snap.exists) rec=Object.assign(rec, snap.data(), {name:stu.name, classCode:ST.classCode});
    }catch(e){}
    // متوسطات الفصل للمقارنة (قراءة متوازية خفيفة)
    var classStats=null;
    try{
      var snaps=await Promise.all(ST.students.map(function(x){
        return db().collection('student_records').doc(x.id).get().catch(function(){return null;});
      }));
      var gs=[], hs=[];
      snaps.forEach(function(sn){
        if(!sn||!sn.exists) return;
        var st=window.hhDPlusStats?window.hhDPlusStats(sn.data()):null;
        if(st){ if(st.avg!==null) gs.push(st.avg); if(st.hwPct!==null) hs.push(st.hwPct); }
      });
      classStats={ avgG: gs.length?Math.round(gs.reduce(function(a,c){return a+c;},0)/gs.length):null,
                   avgH: hs.length?Math.round(hs.reduce(function(a,c){return a+c;},0)/hs.length):null };
    }catch(e){}
    if(window.hhDPlusStudentReport) window.hhDPlusStudentReport(rec, classStats);
    else toast2('تعذر فتح التقرير، حدّث الصفحة','error');
  };
  window.hhSfuToggleSel=function(id){ ST.data[id].sel=!ST.data[id].sel; renderList(); };
  window.hhSfuUndo=function(){ var u=ST.undo.pop(); if(!u)return; u.f(); if(!ST.undo.length) ST.dirty=false; renderList(); toast2('تراجعت عن: '+u.d,'info'); };
  // ملاحظة سريعة بقوالب المعلم · تُحفظ فوراً في ملف الطالب
  window.hhSfuNote=function(id){
    var st=ST.students.filter(function(x){return x.id===id;})[0]; if(!st)return;
    var tpls=(cfg().tpls&&cfg().tpls.length)?cfg().tpls:[
      'تفاعل اليوم بشكل ملحوظ وشارك بفاعلية.','لم يحضر الكتاب والأدوات اليوم.',
      'لم يسلّم الواجب وتمت متابعته وتذكيره.','يُلاحظ تحسن واضح في مستواه مؤخراً.',
      'يحتاج تواصلاً مع ولي الأمر لمتابعة مستواه.'];
    var old=document.getElementById('sfu-note'); if(old) old.remove();
    var ov=document.createElement('div'); ov.id='sfu-note';
    ov.style.cssText='position:fixed;inset:0;background:rgba(42,8,16,.7);z-index:99996;display:flex;align-items:center;justify-content:center;padding:14px;direction:rtl;font-family:Cairo,sans-serif;';
    ov.innerHTML='<div style="background:#FFFDF8;border:2px solid #B8924A;border-radius:18px;max-width:430px;width:100%;padding:16px 17px;max-height:88vh;overflow-y:auto;">'
      +'<div style="font-weight:900;font-size:.9rem;color:#3D0918;margin-bottom:8px;">ملاحظة: '+esc2(st.name)+'</div>'
      + tpls.map(function(t,ti){ return '<button onclick="document.getElementById(\'sfu-note-txt\').value='+"'"+'\''+"'"+'" data-t="'+ti+'" class="sfu-tpl" style="display:block;width:100%;text-align:right;background:#FBF5E9;border:1px solid #E8DCC2;border-radius:9px;padding:7px 10px;font-family:Cairo;font-weight:700;font-size:.7rem;color:#5a4a30;cursor:pointer;margin-bottom:5px;">'+esc2(t)+'</button>'; }).join('')
      +'<textarea id="sfu-note-txt" placeholder="نص الملاحظة" style="width:100%;box-sizing:border-box;border:1.5px solid #E8DCC2;border-radius:10px;padding:9px;font-family:Cairo;font-size:.76rem;min-height:64px;margin-top:4px;"></textarea>'
      +'<div style="display:flex;gap:7px;margin-top:10px;">'
      +'<button onclick="hhSfuNoteSave(\''+esc2(id)+'\')" style="flex:1;background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;border-radius:10px;padding:10px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;">حفظ الملاحظة</button>'
      +'<button onclick="document.getElementById(\'sfu-note\').remove()" style="background:#FFFDF8;color:#999;border:1.5px solid #ddd;border-radius:10px;padding:10px 14px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;">إلغاء</button>'
      +'</div></div>';
    document.body.appendChild(ov);
    ov.querySelectorAll('.sfu-tpl').forEach(function(b){ b.onclick=function(){ document.getElementById('sfu-note-txt').value=tpls[parseInt(b.getAttribute('data-t'),10)]; }; });
  };
  window.hhSfuNoteSave=async function(id){
    var txt=((document.getElementById('sfu-note-txt')||{}).value||'').trim().slice(0,300);
    if(!txt){ toast2('اكتب الملاحظة أولاً','info'); return; }
    try{
      await db().collection('student_records').doc(id).set({
        notes: firebase.firestore.FieldValue.arrayUnion({ text:txt, date:ST.date, by:currentUser.uid, at:Date.now() })
      },{merge:true});
      toast2('سُجّلت الملاحظة في ملف الطالب','success');
    }catch(e){ toast2('تعذر الحفظ، تحقق من الاتصال','error'); }
    var e=document.getElementById('sfu-note'); if(e) e.remove();
  };
  // درجة سريعة · تُحفظ فوراً كنسبة مئوية موحدة
  window.hhSfuGrade=function(id){
    var st=ST.students.filter(function(x){return x.id===id;})[0]; if(!st)return;
    var title=prompt('اسم التقييم (مثال: اختبار الوحدة الأولى):'); if(!title||!title.trim())return;
    var sc=prompt('درجة الطالب:'); if(sc===null)return;
    var mx=prompt('الدرجة الكاملة:','10'); if(mx===null)return;
    var score=parseFloat(sc), max=parseFloat(mx);
    if(isNaN(score)||isNaN(max)||max<=0){ toast2('أدخل أرقاماً صحيحة','error'); return; }
    var pct=Math.round(score/max*100);
    db().collection('student_records').doc(id).set({
      grades: firebase.firestore.FieldValue.arrayUnion({ title:title.trim().slice(0,80), score:pct, raw:score, rawMax:max, date:ST.date, at:Date.now() })
    },{merge:true}).then(function(){ toast2('رُصدت الدرجة: '+pct+'%','success'); })
    .catch(function(){ toast2('تعذر الحفظ','error'); });
  };
  // إجراءات جماعية
  window.hhSfuBulkAll=function(status){ var prev=ST.students.map(function(s){return ST.data[s.id].att;}); ST.students.forEach(function(s){ ST.data[s.id].att=status; }); pushUndo('الجميع حاضرون',function(){ ST.students.forEach(function(s,i){ ST.data[s.id].att=prev[i]; }); }); renderList(); toast2('عُيّن الجميع: حاضرون','success'); };
  window.hhSfuBulkPart=function(){ var ids=ST.students.filter(function(s){return ST.data[s.id].sel;}).map(function(s){return s.id;}); if(!ids.length){toast2('حدّد طلاباً أولاً','info');return;} ids.forEach(function(id){ST.data[id].part++;}); pushUndo('مشاركة جماعية',function(){ ids.forEach(function(id){ST.data[id].part=Math.max(0,ST.data[id].part-1);}); }); renderList(); toast2('+مشاركة لـ'+ids.length+' طلاب','success'); };
  window.hhSfuBulkHw=function(){ var ids=ST.students.filter(function(s){return ST.data[s.id].sel;}).map(function(s){return s.id;}); if(!ids.length){toast2('حدّد طلاباً أولاً','info');return;} var prev={}; ids.forEach(function(id){prev[id]=ST.data[id].hw; ST.data[id].hw='done';}); pushUndo('واجب جماعي',function(){ ids.forEach(function(id){ST.data[id].hw=prev[id];}); }); renderList(); toast2('أُنجز الواجب لـ'+ids.length+' طلاب','success'); };
  // مركز القيادة · قراءة واحدة لكل طالب عند الطلب
  // مركز القيادة موجّهاً إلى عنصر (لتبويب المنصة)
  window.hhSfuCommandInto=async function(mount){
    if(!mount) return;
    if(!ST.students.length){ mount.innerHTML='<div style="text-align:center;color:#8A7A63;font-weight:800;font-size:.74rem;padding:10px;">لا طلاب في الفصل بعد</div>'; return; }
    mount.innerHTML='<div style="text-align:center;color:#8A7A63;font-weight:800;font-size:.74rem;padding:10px;">جارٍ تحليل سجلات الفصل…</div>';
    var d7=new Date(); d7.setDate(d7.getDate()-7); var s7=d7.toISOString().slice(0,10);
    var d14=new Date(); d14.setDate(d14.getDate()-14); var s14=d14.toISOString().slice(0,10);
    var absL=[], hwL=[], praiseL=[];
    var snaps=await Promise.all(ST.students.map(function(st){
      return db().collection('student_records').doc(st.id).get().catch(function(){ return null; });
    }));
    snaps.forEach(function(snap, i){
      if(!snap || !snap.exists) return;
      var st=ST.students[i], r=snap.data();
      var abs=(r.attendance||[]).filter(function(a){return a.date>=s7&&(a.status==='absent'||a.status==='excabs');}).length;
      var miss=(r.homework||[]).filter(function(h){return h.date>=s14&&(h.status==='missing'||h.status==='partial'||h.done===false);}).length;
      var pos=(r.achievements||[]).filter(function(x){return x.date>=s7;}).length + (r.participation||[]).filter(function(p){return p.date>=s7;}).length;
      if(abs>=2) absL.push(st.name);
      if(miss>=2) hwL.push(st.name);
      if(pos>=3) praiseL.push(st.name);
    });
    function grp(t,arr,c){ return '<div style="margin-bottom:8px;"><span style="font-weight:900;font-size:.72rem;color:'+c+';">'+t+' ('+arr.length+')</span>'
      +(arr.length?'<div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:4px;">'+arr.map(function(n){return '<span style="background:#FBF5E9;border:1px solid #E8DCC2;border-radius:13px;padding:3px 10px;font-size:.66rem;font-weight:800;color:#3D0918;">'+esc2(n)+'</span>';}).join('')+'</div>':'')+'</div>'; }
    mount.innerHTML='<div style="font-weight:900;font-size:.8rem;color:#3D0918;margin-bottom:8px;">مركز القيادة · آخر أسبوعين</div>'
      + grp('غياب متكرر',absL,'#8A1538') + grp('واجبات متعثرة',hwL,'#B8924A') + grp('يستحق إشادة',praiseL,'#3D6B53')
      + ((absL.length+hwL.length+praiseL.length)?'':'<div style="font-size:.68rem;color:#8A7A63;font-weight:700;">كل شيء تحت السيطرة</div>');
  };
  window.hhSfuCommand=async function(){
    var old=document.getElementById('sfu-cc'); if(old){ old.remove(); return; }
    toast2('جارٍ تحليل سجلات الفصل…','info');
    var d7=new Date(); d7.setDate(d7.getDate()-7); var s7=d7.toISOString().slice(0,10);
    var d14=new Date(); d14.setDate(d14.getDate()-14); var s14=d14.toISOString().slice(0,10);
    var absL=[], hwL=[], praiseL=[];
    var snaps=await Promise.all(ST.students.map(function(st){
      return db().collection('student_records').doc(st.id).get().catch(function(){ return null; });
    }));
    snaps.forEach(function(snap, i){
      if(!snap || !snap.exists) return;
      var st=ST.students[i], r=snap.data();
      var abs=(r.attendance||[]).filter(function(a){return a.date>=s7&&(a.status==='absent'||a.status==='excabs');}).length;
      var miss=(r.homework||[]).filter(function(h){return h.date>=s14&&(h.status==='missing'||h.status==='partial'||h.done===false);}).length;
      var pos=(r.achievements||[]).filter(function(x){return x.date>=s7;}).length + (r.participation||[]).filter(function(p){return p.date>=s7;}).length;
      if(abs>=2) absL.push(st.name);
      if(miss>=2) hwL.push(st.name);
      if(pos>=3) praiseL.push(st.name);
    });
    function grp(t,arr,c){ return '<div style="margin-bottom:8px;"><span style="font-weight:900;font-size:.72rem;color:'+c+';">'+t+' ('+arr.length+')</span>'
      +(arr.length?'<div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:4px;">'+arr.map(function(n){return '<span style="background:#FBF5E9;border:1px solid #E8DCC2;border-radius:13px;padding:3px 10px;font-size:.66rem;font-weight:800;color:#3D0918;">'+esc2(n)+'</span>';}).join('')+'</div>':'')+'</div>'; }
    var box=document.createElement('div'); box.id='sfu-cc';
    box.style.cssText='margin:0 20px 12px;background:#FFFDF8;border:1.5px solid #B8924A;border-radius:14px;padding:11px 14px;';
    box.innerHTML='<div style="font-weight:900;font-size:.8rem;color:#3D0918;margin-bottom:8px;">مركز القيادة · آخر أسبوعين</div>'
      + grp('غياب متكرر',absL,'#8A1538') + grp('واجبات متعثرة',hwL,'#B8924A') + grp('يستحق إشادة',praiseL,'#3D6B53')
      + ((absL.length+hwL.length+praiseL.length)?'':'<div style="font-size:.68rem;color:#8A7A63;font-weight:700;">كل شيء تحت السيطرة</div>');
    var list=document.getElementById('sfu-list');
    if(list) list.parentNode.insertBefore(box, list);
  };

  // ═══ إدارة الفصل: تعديل الاسم وحذف الطلاب ═══
  window.hhSfuAddStudent=async function(){
    if(!ST.classCode){ toast2('اختر فصلاً أولاً','info'); return; }
    var n=prompt('اسم الطالب:');
    if(n===null) return;
    n=n.trim().slice(0,60);
    if(!n){ toast2('اكتب اسماً صالحاً','info'); return; }
    var dup=ST.students.some(function(s){ return s.name===n; });
    if(dup && !window.confirm('يوجد طالب بهذا الاسم في الفصل، أتضيفه رغم ذلك؟')) return;
    try{
      await db().collection('classroom_students').add({
        classCode:ST.classCode, teacherId:currentUser.uid,
        studentName:n, name:n, active:true,
        addedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      try{ await db().collection('classrooms').doc(ST.classCode).set({studentCount:firebase.firestore.FieldValue.increment(1)},{merge:true}); }catch(e){}
      toast2('أُضيف الطالب: '+n,'success');
      loadStudents();
    }catch(e){ toast2('تعذرت الإضافة، تحقق من الاتصال','error'); }
  };
  window.hhSfuRenameClass=async function(){
    if(!ST.classCode){ toast2('اختر فصلاً أولاً','info'); return; }
    var sel=document.getElementById('sfu-class');
    var cur=sel? sel.options[sel.selectedIndex].text.split(' ·')[0] : '';
    var n=prompt('الاسم الجديد للفصل:', cur);
    if(n===null) return;
    n=n.trim().slice(0,60);
    if(!n){ toast2('اكتب اسماً صالحاً','info'); return; }
    try{
      await db().collection('classrooms').doc(ST.classCode).set({className:n},{merge:true});
      if(sel) sel.options[sel.selectedIndex].text=n;
      toast2('عُدّل اسم الفصل إلى: '+n,'success');
    }catch(e){ toast2('تعذر التعديل، تحقق من الاتصال','error'); }
  };
  // ═══ الحذف السريع: نافذة ملكية، تأكيد بالكتابة للجماعي، تقدم حي، ودفعات متوازية ═══
  function _sfuDelDialog(count, needWord){
    return new Promise(function(resolve){
      var old=document.getElementById('sfu-del'); if(old) old.remove();
      var ov=document.createElement('div'); ov.id='sfu-del';
      ov.style.cssText='position:fixed;inset:0;background:rgba(42,8,16,.78);z-index:99998;display:flex;align-items:center;justify-content:center;padding:16px;direction:rtl;font-family:Cairo,sans-serif;';
      ov.innerHTML='<div style="background:#FFFDF8;border:2px solid #8A1538;border-radius:20px;max-width:380px;width:100%;padding:20px 19px;text-align:center;">'
        +'<div style="font-weight:900;font-size:.95rem;color:#8A1538;margin-bottom:6px;">حذف '+count+' طالباً من الفصل</div>'
        +'<div style="font-size:.72rem;color:#8A7A63;font-weight:700;line-height:1.9;margin-bottom:12px;">يُخفَون من القوائم وينقص عداد الفصل،<br>وسجلاتهم التاريخية تبقى محفوظة في ملفاتهم.</div>'
        +(needWord?'<input id="sfu-del-word" placeholder="للتأكيد اكتب: حذف" style="width:100%;box-sizing:border-box;border:1.5px solid #E3D9C6;border-radius:10px;padding:10px;font-family:Cairo;font-weight:800;font-size:.8rem;text-align:center;margin-bottom:12px;">':'')
        +'<div style="display:flex;gap:8px;">'
        +'<button id="sfu-del-go" style="flex:1;background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;border-radius:11px;padding:11px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;">تأكيد الحذف</button>'
        +'<button id="sfu-del-no" style="background:#FFFDF8;color:#999;border:1.5px solid #ddd;border-radius:11px;padding:11px 16px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;">إلغاء</button>'
        +'</div></div>';
      document.body.appendChild(ov);
      var inp=document.getElementById('sfu-del-word');
      if(inp) setTimeout(function(){ inp.focus(); },100);
      document.getElementById('sfu-del-no').onclick=function(){ ov.remove(); resolve(false); };
      document.getElementById('sfu-del-go').onclick=function(){
        if(needWord){
          var w=(inp&&inp.value||'').trim();
          if(w!=='حذف'){
            if(inp){ inp.style.borderColor='#c0392b'; inp.placeholder='اكتب كلمة: حذف'; inp.value=''; }
            return;
          }
        }
        ov.remove(); resolve(true);
      };
    });
  }
  function _sfuProgress(total){
    var p=document.createElement('div'); p.id='sfu-prog';
    p.style.cssText='position:fixed;bottom:90px;right:50%;transform:translateX(50%);background:linear-gradient(135deg,#4A0B1E,#5E0E26);color:#F5E6C4;border:1.5px solid #B8924A;border-radius:14px;padding:11px 22px;z-index:99999;font-family:Cairo;font-weight:900;font-size:.8rem;box-shadow:0 8px 24px rgba(42,8,16,.4);direction:rtl;';
    p.textContent='جارٍ الحذف… 0 من '+total;
    document.body.appendChild(p);
    return {
      set:function(done){ p.textContent='جارٍ الحذف… '+done+' من '+total; },
      end:function(){ p.remove(); }
    };
  }
  async function _sfuDeactivate(ids){
    var total=ids.length, done=0, CH=40;
    var prog=_sfuProgress(total);
    for(var i=0;i<ids.length;i+=CH){
      var slice=ids.slice(i,i+CH);
      await Promise.all(slice.map(function(id){
        return db().collection('classroom_students').doc(id)
          .set({active:false, removedAt:Date.now()},{merge:true})
          .then(function(){ done++; })
          .catch(function(){});
      }));
      prog.set(done);
    }
    prog.end();
    if(done){
      try{ await db().collection('classrooms').doc(ST.classCode).set({studentCount:firebase.firestore.FieldValue.increment(-done)},{merge:true}); }catch(e){}
    }
    return done;
  }
  window.hhSfuDeleteSel=async function(){
    var ids=ST.students.filter(function(s){return ST.data[s.id].sel;}).map(function(s){return s.id;});
    if(!ids.length){ toast2('حدّد طلاباً أولاً','info'); return; }
    var yes=await _sfuDelDialog(ids.length, false);
    if(!yes) return;
    var ok=await _sfuDeactivate(ids);
    toast2('حُذف '+ok+' طالباً من الفصل','success');
    loadStudents();
  };
  window.hhSfuDeleteAll=async function(){
    if(!ST.students.length){ toast2('لا طلاب في الفصل','info'); return; }
    var yes=await _sfuDelDialog(ST.students.length, true);
    if(!yes) return;
    var ok=await _sfuDeactivate(ST.students.map(function(s){return s.id;}));
    toast2('حُذف '+ok+' طالباً من الفصل','success');
    loadStudents();
  };

  // ═══ الحفظ · ينتقل لكل ملف طالب ═══
  window.hhSfuSaveAll=async function(silent){
    var btn=(!silent&&typeof event!=='undefined'&&event)?event.target:null; if(btn){ btn.disabled=true; btn.textContent='جارٍ الحفظ…'; }
    var date=ST.date, period=ST.period, ok=0, fail=0;
    var jobs=ST.students.map(function(s){
      var d=ST.data[s.id];
      try{
        var updates={};
        // الحضور
        updates.attendance = firebase.firestore.FieldValue.arrayUnion({ date:date, period:period, status:d.att, at:Date.now() });
        // المشاركة
        if(d.part>0) updates.participation = firebase.firestore.FieldValue.arrayUnion({ date:date, period:period, points:d.part, at:Date.now() });
        // الواجب (سداسي الحالات · مع توافق done القديم)
        if(d.hw!=null) updates.homework = firebase.firestore.FieldValue.arrayUnion({ date:date, status:d.hw, done:(d.hw==='done'||d.hw==='hwlate'), at:Date.now() });
        // السلوك
        if(d.behavior!=null) updates.behavior = firebase.firestore.FieldValue.arrayUnion({ date:date, type:d.behavior, at:Date.now() });
        // التميز
        if(d.stars>0) updates.achievements = firebase.firestore.FieldValue.arrayUnion({ date:date, type:'star', n:d.stars, at:Date.now() });
        // العدادات المخصصة
        var custKeys=Object.keys(d.cust||{}).filter(function(k){return d.cust[k]>0;});
        if(custKeys.length) updates.custom = firebase.firestore.FieldValue.arrayUnion.apply(null, custKeys.map(function(k){ return { date:date, kind:k, n:d.cust[k], at:Date.now() }; }));
        return db().collection('student_records').doc(s.id).set(updates, {merge:true})
          .then(function(){ ok++; })
          .catch(function(e){ fail++; console.warn('save student', s.id, e); });
      }catch(e){ fail++; return Promise.resolve(); }
    });
    await Promise.all(jobs);
    // سجل الحصة في follow_up_sessions (ملخصات)
    try{
      await db().collection('follow_up_sessions').add({
        teacherId: currentUser.uid, classCode:ST.classCode, date:date, period:period,
        count:ST.students.length,
        present: ST.students.filter(function(s){return ST.data[s.id].att==='present';}).length,
        absent: ST.students.filter(function(s){return ST.data[s.id].att==='absent';}).length,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }catch(e){}
    if(btn){ btn.disabled=false; btn.textContent='حفظ اليوم'; }
    if(!fail){ ST.undo=[]; ST.dirty=false; refreshBar(); }
    if(!silent) toast2(fail? ('حُفظ '+ok+' · تعذّر '+fail) : ('حُفظ سجل اليوم ('+ok+' طالب) · انتقل لملفاتهم'), fail?'error':'success');
    if(fail && silent) throw new Error('partial');
  };

})();

/* ═══════════════════════════════════════════════════════════
   قفل الدفتر الذكي · رمز رباعي خاص بكل معلم
   أول دخول: إنشاء الرمز مرتين. كل دخول بعدها: إدخاله.
   بعد ثلاث محاولات خاطئة: استعادة الرمز أو مراسلة الدعم.
   الرمز يُخزَّن مُشفَّراً (SHA-256 مملّحاً بمعرف المعلم)
   محلياً وفي وثيقة المستخدم ليتبعه بين أجهزته.
   الحماية الفعلية للبيانات تبقى في قواعد Firestore؛
   هذا قفل شاشة يمنع فتح الدفتر من جهاز بيد غير صاحبه.
   ═══════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var buf='', stage='enter', first='', fails=0, coolUntil=0, pendingCode='';

  function uid(){ return (typeof currentUser!=='undefined'&&currentUser&&currentUser.uid)?currentUser.uid:'local'; }
  function key(){ return 'hh_sfu_pin_'+uid(); }
  function hashPin(pin){
    var s='almulhim·'+uid()+'·'+pin;
    if(window.crypto&&crypto.subtle&&crypto.subtle.digest&&window.TextEncoder){
      return crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)).then(function(b){
        return Array.prototype.map.call(new Uint8Array(b),function(x){return ('0'+x.toString(16)).slice(-2);}).join('');
      });
    }
    var h=5381; for(var i=0;i<s.length;i++){ h=((h<<5)+h+s.charCodeAt(i))>>>0; }
    return Promise.resolve('djb2·'+h.toString(16));
  }
  function stored(){ try{ return localStorage.getItem(key())||''; }catch(e){ return ''; } }
  function store(h){
    try{ localStorage.setItem(key(), h); }catch(e){}
    try{
      if(typeof firebase!=='undefined'&&firebase.firestore&&typeof currentUser!=='undefined'&&currentUser){
        firebase.firestore().collection('users').doc(currentUser.uid).set({gbPinHash:h},{merge:true}).catch(function(){});
      }
    }catch(e){}
  }
  function clearPin(){
    try{ localStorage.removeItem(key()); }catch(e){}
    try{
      if(typeof firebase!=='undefined'&&firebase.firestore&&typeof currentUser!=='undefined'&&currentUser){
        firebase.firestore().collection('users').doc(currentUser.uid).set({gbPinHash:''},{merge:true}).catch(function(){});
      }
    }catch(e){}
  }
  function syncFromCloud(){
    try{
      if(typeof firebase!=='undefined'&&firebase.firestore&&typeof currentUser!=='undefined'&&currentUser&&!stored()){
        firebase.firestore().collection('users').doc(currentUser.uid).get().then(function(d){
          var h=(d&&d.exists&&d.data())?(d.data().gbPinHash||''):'';
          if(h){
            try{ localStorage.setItem(key(),h); }catch(e){}
            if(document.getElementById('hh-sfupin') && stage!=='enter'){ stage='enter'; buf=''; first=''; paint(); }
          }
        }).catch(function(){});
      }
    }catch(e){}
  }
  function btnCss(sec){
    return 'background:'+(sec?'#FBF5E9':'#FFFDF8')+';border:1.5px solid '+(sec?'#C9B37E':'#E8DCC2')
      +';border-radius:13px;padding:13px 0;font-family:Cairo,sans-serif;font-weight:900;'
      +'font-size:1.05rem;color:'+(sec?'#8A6D2E':'#3D0918')+';cursor:pointer;user-select:none;';
  }
  function screen(){
    buf=''; first='';
    stage = stored() ? 'enter' : 'setup1';
    fails=0; coolUntil=0;
    var old=document.getElementById('hh-sfupin'); if(old) old.remove();
    var ov=document.createElement('div'); ov.id='hh-sfupin';
    ov.style.cssText='position:fixed;inset:0;background:linear-gradient(160deg,#4A0B1E,#5E0E26);'
      +'z-index:99995;display:flex;align-items:center;justify-content:center;direction:rtl;'
      +'font-family:Cairo,sans-serif;padding:16px;';
    var digits=['١','٢','٣','٤','٥','٦','٧','٨','٩'];
    var pad='';
    for(var i=0;i<9;i++){ pad+='<button onclick="window._hhSfuPinPress('+(i+1)+')" style="'+btnCss()+'">'+digits[i]+'</button>'; }
    pad+='<button onclick="window._hhSfuPinForgot()" style="'+btnCss(true)+'font-size:.58rem;">نسيت<br>الرمز</button>';
    pad+='<button onclick="window._hhSfuPinPress(0)" style="'+btnCss()+'">٠</button>';
    pad+='<button onclick="window._hhSfuPinBack()" style="'+btnCss(true)+'">⌫</button>';
    ov.innerHTML='<div style="background:#FFFDF8;border:2px solid #B8924A;border-radius:22px;'
      +'padding:26px 22px 16px;width:100%;max-width:330px;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.45);">'
      +'<svg width="46" height="46" viewBox="0 0 24 24" fill="none" style="margin-bottom:6px;">'
      +'<rect x="4" y="10" width="16" height="10.5" rx="2.6" stroke="#8A6D2E" stroke-width="1.7"/>'
      +'<path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="#8A6D2E" stroke-width="1.7"/>'
      +'<circle cx="12" cy="15.2" r="1.7" fill="#8A1538"/></svg>'
      +'<div id="sfupin-title" style="font-weight:900;font-size:1rem;color:#3D0918;"></div>'
      +'<div id="sfupin-sub" style="font-size:.72rem;color:#8A6D2E;margin:4px 0 15px;font-weight:700;min-height:16px;"></div>'
      +'<div id="sfupin-dots" style="display:flex;justify-content:center;gap:15px;margin-bottom:17px;"></div>'
      +'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:9px;direction:ltr;">'+pad+'</div>'
      +'<div id="sfupin-actions" style="display:none;gap:8px;margin-top:13px;">'
      +'<button onclick="window._hhSfuPinForgot()" style="flex:1;background:#FFFDF8;border:1.5px solid #8A1538;color:#8A1538;'
      +'border-radius:11px;padding:9px;font-family:Cairo;font-weight:900;font-size:.72rem;cursor:pointer;">نسيت كلمة السر</button>'
      +'<button onclick="window._hhSfuPinSupport()" style="flex:1;background:#FFFDF8;border:1.5px solid #3D6B53;color:#3D6B53;'
      +'border-radius:11px;padding:9px;font-family:Cairo;font-weight:900;font-size:.72rem;cursor:pointer;">التواصل مع الدعم</button>'
      +'</div>'
      +'<button onclick="window._hhSfuPinCancel()" style="margin-top:13px;background:none;border:none;color:#b3a08f;'
      +'font-family:Cairo;font-weight:800;font-size:.74rem;cursor:pointer;">إلغاء والعودة</button>'
      +'</div>';
    document.body.appendChild(ov);
    document.addEventListener('keydown', keyHandler);
    paint();
    syncFromCloud();
  }
  function paint(msg){
    var t=document.getElementById('sfupin-title'), s=document.getElementById('sfupin-sub'),
        d=document.getElementById('sfupin-dots');
    if(!t||!s||!d) return;
    if(stage==='setup1'){ t.textContent='أنشئ كلمة السر'; s.textContent=msg||'اختر أربعة أرقام خاصة بك، لن يفتح الدفتر بدونها'; }
    else if(stage==='setup2'){ t.textContent='تأكيد كلمة السر'; s.textContent=msg||'أعد إدخال الأرقام الأربعة نفسها'; }
    else { t.textContent='الدفتر الذكي مقفل'; s.textContent=msg||'أدخل كلمة السر المكوّنة من أربعة أرقام'; }
    var dots='';
    for(var i=0;i<4;i++){
      dots+='<span style="width:15px;height:15px;border-radius:50%;display:inline-block;'
        +(i<buf.length ? 'background:#8A1538;border:2px solid #8A1538;' : 'background:none;border:2px solid #C9B37E;')
        +'"></span>';
    }
    d.innerHTML=dots;
  }
  function shake(){
    var box=document.getElementById('hh-sfupin');
    if(box&&box.firstChild&&box.firstChild.animate){
      box.firstChild.animate(
        [{transform:'translateX(0)'},{transform:'translateX(-9px)'},{transform:'translateX(9px)'},
         {transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}],{duration:340});
    }
  }
  function done(msg){
    cancel();
    if(msg && typeof toast==='function') toast(msg,'success');
    if(window._hhSfuOrigOpen) window._hhSfuOrigOpen(pendingCode||undefined);
  }
  function cancel(){
    var e=document.getElementById('hh-sfupin'); if(e) e.remove();
    document.removeEventListener('keydown', keyHandler);
  }
  function keyHandler(ev){
    if(!document.getElementById('hh-sfupin')) return;
    if(ev.key>='0'&&ev.key<='9'){ press(parseInt(ev.key,10)); ev.preventDefault(); }
    else if(ev.key==='Backspace'){ back(); ev.preventDefault(); }
    else if(ev.key==='Escape'){ cancel(); }
  }
  function press(n){
    if(Date.now()<coolUntil){ paint('محاولات كثيرة، انتظر قليلاً ثم أعد المحاولة'); return; }
    if(buf.length>=4) return;
    buf+=String(n); paint();
    if(buf.length<4) return;
    var entered=buf;
    if(stage==='setup1'){
      first=entered; buf=''; stage='setup2';
      setTimeout(paint,160); return;
    }
    if(stage==='setup2'){
      if(entered===first){
        hashPin(entered).then(function(h){ store(h); done('أُنشئت كلمة السر بنجاح'); });
      } else {
        buf=''; first=''; stage='setup1'; shake();
        setTimeout(function(){ paint('الرمزان غير متطابقين، ابدأ من جديد'); },200);
      }
      return;
    }
    hashPin(entered).then(function(h){
      if(h===stored()){ fails=0; done(); }
      else {
        fails++; buf='';
        if(fails>=3){ var ac=document.getElementById('sfupin-actions'); if(ac) ac.style.display='flex'; }
        if(fails>=5){ coolUntil=Date.now()+30000; }
        shake();
        setTimeout(function(){
          paint(Date.now()<coolUntil ? 'محاولات كثيرة، انتظر ثلاثين ثانية'
            : (fails>=3 ? 'رمز غير صحيح، يمكنك استعادته أو مراسلة الدعم' : 'رمز غير صحيح، حاول مرة أخرى'));
        },200);
      }
    });
  }
  function back(){ if(buf.length){ buf=buf.slice(0,-1); paint(); } }
  window._hhSfuPinPress=press;
  window._hhSfuPinBack=back;
  window._hhSfuPinCancel=cancel;
  window._hhSfuPinForgot=function(){
    if(stage!=='enter') return;
    if(!window.confirm('ستُحذف كلمة السر الحالية من حسابك وتُنشئ واحدة جديدة الآن.\nهل أنت متأكد؟')) return;
    clearPin();
    fails=0; coolUntil=0;
    var ac=document.getElementById('sfupin-actions'); if(ac) ac.style.display='none';
    buf=''; first=''; stage='setup1'; paint();
  };
  window._hhSfuPinSupport=function(){
    var em=(typeof currentUser!=='undefined'&&currentUser&&currentUser.email)?currentUser.email:'';
    var msg='السلام عليكم، أحتاج مساعدة في استعادة كلمة سر الدفتر الذكي في منصة المُلهم التعليمية.'
      +(em?'\nحسابي: '+em:'');
    window.open('https://wa.me/97471776644?text='+encodeURIComponent(msg),'_blank');
  };
  /* رمز التحقق أُلغي بقرار المعلم: الدفتر يفتح مباشرة،
     ودوال القفل تبقى خاملة هنا إن أراد إعادتها يوماً */
})();

/* ═══════════════════════════════════════════════════════════
   الدليل الاحترافي الكامل لدفتر المتابعة الذكي
   ═══════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  function esc3(s){ return (typeof esc==='function') ? esc(s) : String(s==null?'':s); }
  var GUIDE=[
    ['البدء في ثلاث ثوانٍ',
     'اختر الفصل من القائمة العلوية، وحدد التاريخ والحصة، وستجد طلابك أمامك فوراً. زر القلم بجوار القائمة يعدل اسم الفصل متى شئت.'],
    ['رصد الحضور',
     'ضغطة واحدة: حاضر أو غائب. وزر «الجميع حاضرون» يرصد الفصل كله ثم تعدل الغائبين فقط، وكل ما سوى الحضور يسكن خلف زر «التفصيل» فلا يزاحمك.'],
    ['الواجب بست حالات',
     'اضغط زر «واجب» فتنسدل الحالات: سلّم، سلّم متأخراً، ناقص، لم يسلّم، بعذر، وإعادة. اختر وتنطوي القائمة، وزر «مسح» يلغي الرصد. وللإسراع حدد مجموعة طلاب بمربعات الاختيار ثم «أنجز الواجب للمحدّدين».'],
    ['المشاركة والسلوك والتميز',
     'عداد المشاركة بزري زائد وناقص، والسلوك يتنقل بين إيجابي بالنجمة وسلبي بعلامة التنبيه، وزر «تميز» يمنح نجوماً تتراكم وتظهر في ملف الطالب وتقاريره.'],
    ['الملاحظات والدرجات الفورية',
     'زر «ملاحظة» يفتح قوالبك الجاهزة أو كتابة حرة، وتُحفظ فور حفظها في ملف الطالب مباشرة. وزر «درجة» يرصد أي تقييم باسمه ودرجته فيتحول تلقائياً نسبة مئوية موحدة تدخل في متوسط الطالب.'],
    ['العدادات المخصصة',
     'أنشئ من الإعدادات أي نوع رصد باسمك أنت: نقطة نظام، حفظ، إحضار الأدوات، أو ما تشاء، فيظهر زراً في بطاقة كل طالب يرصد بضغطة.'],
    ['التراجع ومؤشر الحفظ',
     'كل رصد قبل الحفظ قابل للتراجع بزر «تراجع» خطوة خطوة، ومؤشر «تعديلات غير محفوظة» يذكرك، فإذا ضغطت «حفظ اليوم» انتقل كل شيء إلى ملفات الطلاب في السحابة وصار المؤشر «محفوظ».'],
    ['ملف الطالب الشامل',
     'اضغط اسم أي طالب يفتح ملفه بعشرة تبويبات: نظرة عامة برأي المعلم التلقائي القابل للتعديل ورسم تطوره ستة أسابيع، ثم الحضور والدرجات والشخصية بنقاط القوة والتطوير، وأولياء الأمر بصفاتهم ودرجات تجاوبهم، وسجل التواصل بجمله المفتاحية، وخطة الدعم بحالاتها الخمس، والمهارات والملاحظات، وتبويب التقرير.'],
    ['مركز القيادة',
     'زر واحد يحلل آخر أسبوعين لكل الفصل ويسمي لك: من تكرر غيابه، ومن تعثرت واجباته، ومن يستحق إشادة، فتعرف أين تضع جهدك اليوم.'],
    ['إدارة الفصل',
     'زر «إدارة الفصل» يطوي تحته كل شيء: إضافة طالب باسمه، استيراد ملف Excel وإن كان فيه عمود الفصل أنشأ الشعب الناقصة ووزع الطلاب تلقائياً، تعديل اسم الفصل، أدوات الدرجات المتقدمة، وحذف المحددين أو الكل بتأكيد مزدوج، والحذف يخفي الطالب من القوائم وتبقى سجلاته التاريخية محفوظة.'],
    ['التقارير الجاهزة للتوقيع',
     'تقرير الصف الجامع بمتوسطاته وجدول طلابه وقائمة من يحتاج دعماً، وتقرير كل طالب بمؤشراته ودرجاته وخطته ورأي معلمه، كلاهما يطبع PDF أو ينزل Excel، وبشعار مدرستك واسمك واسم المنسق وفراغات التوقيع.'],
    ['الإعدادات تتبعك',
     'قوالب ملاحظاتك وعداداتك وشعار مدرستك وأسماء التقارير وخيارات إظهارها، كلها تُحفظ في حسابك وتجدها على أي جهاز تدخل منه.']
  ];
  window.hhSfuGuide=function(){
    var old=document.getElementById('hh-sfug'); if(old){ old.remove(); return; }
    var ov=document.createElement('div'); ov.id='hh-sfug';
    ov.style.cssText='position:fixed;inset:0;background:rgba(42,8,16,.82);z-index:99997;display:flex;align-items:flex-start;justify-content:center;padding:14px;overflow-y:auto;direction:rtl;font-family:Cairo,sans-serif;';
    var secs=GUIDE.map(function(g,i){
      return '<div style="display:flex;gap:11px;margin-bottom:15px;">'
        +'<div style="flex-shrink:0;width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#EAD9B0,#B8924A);color:#2a0810;font-weight:900;font-size:.8rem;display:flex;align-items:center;justify-content:center;">'+(i+1)+'</div>'
        +'<div style="flex:1;"><div style="font-weight:900;font-size:.86rem;color:#3D0918;margin-bottom:3px;">'+esc3(g[0])+'</div>'
        +'<div style="font-size:.74rem;color:#6a5a48;font-weight:700;line-height:2;">'+esc3(g[1])+'</div></div></div>';
    }).join('');
    ov.innerHTML='<div style="background:#FFFDF8;border:2px solid #B8924A;border-radius:22px;max-width:640px;width:100%;overflow:hidden;margin-bottom:24px;">'
      +'<div style="background:linear-gradient(135deg,#4A0B1E,#5E0E26);color:#F5E6C4;padding:18px 20px;display:flex;justify-content:space-between;align-items:center;">'
      +'<div><div style="font-weight:900;font-size:1.1rem;">دليل دفتر المتابعة الذكي</div>'
      +'<div style="font-size:.72rem;opacity:.85;margin-top:2px;">اثنتا عشرة قدرة بين يديك، من الرصد إلى التقرير الموقع</div></div>'
      +'<button onclick="document.getElementById(\'hh-sfug\').remove()" style="background:none;border:none;color:#F5E6C4;font-size:1.2rem;cursor:pointer;">✕</button></div>'
      +'<div style="padding:18px 20px 10px;">'+secs+'</div>'
      +'<div style="padding:0 20px 18px;text-align:center;">'
      +'<button onclick="document.getElementById(\'hh-sfug\').remove()" style="background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;border-radius:12px;padding:11px 30px;font-family:Cairo;font-weight:900;font-size:.84rem;cursor:pointer;">فهمت، إلى العمل</button>'
      +'</div></div>';
    document.body.appendChild(ov);
  };
})();
