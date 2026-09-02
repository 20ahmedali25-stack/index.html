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
  /* تغليف فتح الدفتر الذكي دون مساس بالأصل */
  if(typeof window.hhOpenSmartFollowup==='function' && !window._hhSfuOrigOpen){
    window._hhSfuOrigOpen = window.hhOpenSmartFollowup;
    window.hhOpenSmartFollowup = function(preCode){
      if(typeof currentUser==='undefined' || !currentUser){
        if(typeof toast==='function') toast('يجب تسجيل الدخول أولاً','error');
        return;
      }
      pendingCode = preCode||'';
      screen();
    };
  }
})();
