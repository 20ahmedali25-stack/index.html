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

  var ST = { classCode:'', date:todayStr(), period:'1', students:[], data:{} };

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
      +'</div>'
      // المحددات: الفصل · التاريخ · الحصة
      +'<div style="display:flex;gap:8px;flex-wrap:wrap;">'
      +  '<select id="sfu-class" style="flex:1;min-width:120px;border:1.5px solid #B8924A;border-radius:10px;padding:9px 11px;font-family:Cairo;font-weight:800;font-size:.8rem;background:#FDFAF3;color:#3D0918;">'+classes.map(function(c){return '<option value="'+esc2(c.code)+'"'+(c.code===ST.classCode?' selected':'')+'>'+esc2(c.name)+(c.subject?' · '+esc2(c.subject):'')+'</option>';}).join('')+'</select>'
      +  '<input id="sfu-date" type="date" value="'+ST.date+'" style="border:1.5px solid #B8924A;border-radius:10px;padding:9px 11px;font-family:Cairo;font-weight:700;font-size:.78rem;background:#FDFAF3;color:#3D0918;">'
      +  '<select id="sfu-period" style="border:1.5px solid #B8924A;border-radius:10px;padding:9px 11px;font-family:Cairo;font-weight:800;font-size:.8rem;background:#FDFAF3;color:#3D0918;">'+[1,2,3,4,5,6,7].map(function(p){return '<option value="'+p+'">الحصة '+p+'</option>';}).join('')+'</select>'
      +'</div></div>'
      // شريط الإجراءات الجماعية
      +'<div style="padding:12px 20px 0;"><div style="display:flex;gap:7px;flex-wrap:wrap;">'
      +  '<button onclick="hhSfuBulkAll(\'present\')" style="background:linear-gradient(135deg,#3D6B53,#2C5340);color:#fff;border:none;border-radius:10px;padding:8px 13px;font-family:Cairo;font-weight:800;font-size:.72rem;cursor:pointer;">الجميع حاضرون</button>'
      +  '<button onclick="hhSfuBulkPart()" style="background:rgba(184,146,74,.15);border:1px solid #B8924A;color:#8A6D2E;border-radius:10px;padding:8px 13px;font-family:Cairo;font-weight:800;font-size:.72rem;cursor:pointer;">+ مشاركة للمحدّدين</button>'
      +  '<button onclick="hhSfuBulkHw()" style="background:rgba(184,146,74,.15);border:1px solid #B8924A;color:#8A6D2E;border-radius:10px;padding:8px 13px;font-family:Cairo;font-weight:800;font-size:.72rem;cursor:pointer;">أنجز الواجب للمحدّدين</button>'
      +'</div></div>'
      +'<div id="sfu-list" style="padding:14px 20px 90px;"></div>'
      // شريط الحفظ السفلي
      +'<div style="position:fixed;bottom:0;right:0;left:0;max-width:760px;margin:0 auto;background:#FFFDF8;border-top:2px solid #B8924A;padding:12px 20px;display:flex;gap:10px;align-items:center;box-shadow:0 -4px 14px rgba(94,14,38,.1);">'
      +  '<div id="sfu-summary" style="flex:1;font-size:.72rem;color:#8A7A63;font-weight:700;"></div>'
      +  '<button onclick="hhSfuSaveAll()" style="background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;border-radius:12px;padding:12px 28px;font-family:Cairo;font-weight:900;font-size:.88rem;cursor:pointer;box-shadow:0 6px 16px rgba(138,21,56,.25);">حفظ اليوم</button>'
      +'</div>';
    document.getElementById('sfu-class').onchange=function(){ ST.classCode=this.value; loadStudents(); };
    document.getElementById('sfu-date').onchange=function(){ ST.date=this.value; };
    document.getElementById('sfu-period').onchange=function(){ ST.period=this.value; };
    loadStudents();
  }

  async function loadStudents(){
    var list=document.getElementById('sfu-list'); if(list) list.innerHTML='<div style="text-align:center;color:#8A7A63;padding:20px;font-weight:800;">جارٍ تحميل الطلاب…</div>';
    ST.students=[]; ST.data={};
    try{
      var qs=await db().collection('classroom_students').where('classCode','==',ST.classCode).where('active','==',true).get();
      qs.forEach(function(d){ var s=d.data(); ST.students.push({id:d.id, name:s.studentName||s.name||'طالب'}); });
    }catch(e){ console.warn(e); }
    ST.students.forEach(function(s){ ST.data[s.id]={att:'present', part:0, hw:null, behavior:null, sel:false}; });
    renderList();
  }

  function renderList(){
    var el=document.getElementById('sfu-list'); if(!el)return;
    if(!ST.students.length){ el.innerHTML='<div style="text-align:center;color:#8A7A63;padding:30px;font-weight:700;background:#FBF5E9;border:1px dashed #D9C79E;border-radius:12px;">لا طلاب في هذا الفصل بعد · أضفهم من «صفوفي وطلابي»</div>'; updateSummary(); return; }
    el.innerHTML=ST.students.map(function(s){
      var d=ST.data[s.id];
      var attColors={present:['حاضر','#3D6B53'],absent:['غائب','#8A1538'],late:['متأخر','#B8924A'],excused:['مستأذن','#1F4E79']};
      return '<div class="sfu-row" data-id="'+esc2(s.id)+'" style="background:#FFFDF8;border:1.5px solid '+(d.sel?'#8A1538':'#EDE3CE')+';border-radius:14px;padding:11px 13px;margin-bottom:9px;">'
        +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:9px;">'
        +  '<input type="checkbox" '+(d.sel?'checked':'')+' onchange="hhSfuToggleSel(\''+esc2(s.id)+'\')" style="width:18px;height:18px;accent-color:#8A1538;flex-shrink:0;">'
        +  '<div style="flex:1;font-weight:900;color:#3D0918;font-size:.92rem;cursor:pointer;" onclick="hhOpenStudentFile(\''+esc2(s.id)+'\',\''+esc2(ST.classCode)+'\')" title="افتح ملف الطالب">'+esc2(s.name)+'</div>'
        +'</div>'
        // أزرار الحضور
        +'<div style="display:flex;gap:5px;margin-bottom:8px;">'
        + ['present','absent','late','excused'].map(function(k){ var m=attColors[k]; var on=(d.att===k);
            return '<button onclick="hhSfuSetAtt(\''+esc2(s.id)+'\',\''+k+'\')" style="flex:1;border:1.5px solid '+m[1]+';background:'+(on?m[1]:'transparent')+';color:'+(on?'#fff':m[1])+';border-radius:9px;padding:6px 4px;font-family:Cairo;font-weight:800;font-size:.68rem;cursor:pointer;">'+m[0]+'</button>';
          }).join('')
        +'</div>'
        // مشاركة · واجب · سلوك
        +'<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">'
        +  '<div style="display:flex;align-items:center;gap:4px;background:#FBF5E9;border-radius:9px;padding:3px;"><button onclick="hhSfuPart(\''+esc2(s.id)+'\',-1)" style="width:26px;height:26px;border:none;background:#e8d9b8;border-radius:7px;font-weight:900;cursor:pointer;color:#5E0E26;">−</button><span style="min-width:44px;text-align:center;font-size:.68rem;font-weight:800;color:#8A6D2E;">مشاركة '+d.part+'</span><button onclick="hhSfuPart(\''+esc2(s.id)+'\',1)" style="width:26px;height:26px;border:none;background:linear-gradient(135deg,#EAD9B0,#B8924A);border-radius:7px;font-weight:900;cursor:pointer;color:#2a0810;">+</button></div>'
        +  '<button onclick="hhSfuHw(\''+esc2(s.id)+'\')" style="border:1.5px solid '+(d.hw===true?'#3D6B53':(d.hw===false?'#8A1538':'#B8924A'))+';background:'+(d.hw===true?'#3D6B53':(d.hw===false?'#8A1538':'transparent'))+';color:'+(d.hw!=null?'#fff':'#8A6D2E')+';border-radius:9px;padding:6px 11px;font-family:Cairo;font-weight:800;font-size:.68rem;cursor:pointer;">واجب '+(d.hw===true?'✓':(d.hw===false?'✗':'—'))+'</button>'
        +  '<button onclick="hhSfuBehav(\''+esc2(s.id)+'\')" style="border:1.5px solid '+(d.behavior==='good'?'#3D6B53':(d.behavior==='bad'?'#8A1538':'#B8924A'))+';background:'+(d.behavior==='good'?'#3D6B53':(d.behavior==='bad'?'#8A1538':'transparent'))+';color:'+(d.behavior!=null?'#fff':'#8A6D2E')+';border-radius:9px;padding:6px 11px;font-family:Cairo;font-weight:800;font-size:.68rem;cursor:pointer;">سلوك '+(d.behavior==='good'?'★':(d.behavior==='bad'?'!':'—'))+'</button>'
        +'</div></div>';
    }).join('');
    updateSummary();
  }

  function updateSummary(){
    var s=document.getElementById('sfu-summary'); if(!s)return;
    var present=0,absent=0,sel=0;
    Object.keys(ST.data).forEach(function(k){ var d=ST.data[k]; if(d.att==='present')present++; if(d.att==='absent')absent++; if(d.sel)sel++; });
    s.textContent = ST.students.length+' طالباً · '+present+' حاضر · '+absent+' غائب'+(sel?' · '+sel+' محدّد':'');
  }

  // إجراءات فردية
  window.hhSfuSetAtt=function(id,k){ ST.data[id].att=k; renderList(); };
  window.hhSfuPart=function(id,n){ ST.data[id].part=Math.max(0,ST.data[id].part+n); renderList(); };
  window.hhSfuHw=function(id){ var d=ST.data[id]; d.hw = d.hw===null?true:(d.hw===true?false:null); renderList(); };
  window.hhSfuBehav=function(id){ var d=ST.data[id]; d.behavior = d.behavior===null?'good':(d.behavior==='good'?'bad':null); renderList(); };
  window.hhSfuToggleSel=function(id){ ST.data[id].sel=!ST.data[id].sel; renderList(); };
  // إجراءات جماعية
  window.hhSfuBulkAll=function(status){ ST.students.forEach(function(s){ ST.data[s.id].att=status; }); renderList(); toast2('عُيّن الجميع: حاضرون','success'); };
  window.hhSfuBulkPart=function(){ var n=0; ST.students.forEach(function(s){ if(ST.data[s.id].sel){ ST.data[s.id].part++; n++; } }); renderList(); toast2(n?('+مشاركة لـ'+n+' طلاب'):'حدّد طلاباً أولاً', n?'success':'info'); };
  window.hhSfuBulkHw=function(){ var n=0; ST.students.forEach(function(s){ if(ST.data[s.id].sel){ ST.data[s.id].hw=true; n++; } }); renderList(); toast2(n?('أُنجز الواجب لـ'+n+' طلاب'):'حدّد طلاباً أولاً', n?'success':'info'); };

  // ═══ الحفظ · ينتقل لكل ملف طالب ═══
  window.hhSfuSaveAll=async function(){
    var btn=event&&event.target; if(btn){ btn.disabled=true; btn.textContent='جارٍ الحفظ…'; }
    var date=ST.date, period=ST.period, ok=0, fail=0;
    for(var i=0;i<ST.students.length;i++){
      var s=ST.students[i], d=ST.data[s.id];
      try{
        var updates={};
        // الحضور
        updates.attendance = firebase.firestore.FieldValue.arrayUnion({ date:date, period:period, status:d.att, at:Date.now() });
        // المشاركة
        if(d.part>0) updates.participation = firebase.firestore.FieldValue.arrayUnion({ date:date, period:period, points:d.part, at:Date.now() });
        // الواجب
        if(d.hw!=null) updates.homework = firebase.firestore.FieldValue.arrayUnion({ date:date, done:d.hw, at:Date.now() });
        // السلوك
        if(d.behavior!=null) updates.behavior = firebase.firestore.FieldValue.arrayUnion({ date:date, type:d.behavior, at:Date.now() });
        await db().collection('student_records').doc(s.id).set(updates, {merge:true});
        ok++;
      }catch(e){ fail++; console.warn('save student', s.id, e); }
    }
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
    toast2(fail? ('حُفظ '+ok+' · تعذّر '+fail) : ('حُفظ سجل اليوم ('+ok+' طالب) · انتقل لملفاتهم'), fail?'error':'success');
  };

})();
