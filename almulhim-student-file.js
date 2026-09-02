// ═══════════════════════════════════════════════════════════
//  ملف الطالب المتكامل · منظومة المعلم — المرحلة ١
//  يجمع: المعلومات، الحضور، المشاركة، الواجبات، الاختبارات،
//  الدرجات، الملاحظات، السلوك، المهارات، التطوّر، الخطط.
//  يبني على: classroom_students (الموجود) + student_records (جديد)
// ═══════════════════════════════════════════════════════════
(function(){
  'use strict';
  function db(){ return firebase.firestore(); }
  function esc2(s){ return (typeof esc==='function') ? esc(s) : String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function toast2(m,k){ if(typeof toast==='function') toast(m,k||'info'); }

  // جلب سجل الطالب (يدمج البيانات الأساسية مع السجل المتراكم)
  async function fetchStudentRecord(studentId, classCode){
    var rec = { id:studentId, classCode:classCode, name:'', attendance:[], participation:[], homework:[], exams:[], grades:[], notes:[], behavior:[], skills:{mastered:[],needs:[]}, timeline:[], plans:[] };
    try{
      // البيانات الأساسية من classroom_students الموجود
      var sSnap = await db().collection('classroom_students').doc(studentId).get();
      if(sSnap.exists){ var d=sSnap.data(); rec.name=d.name||d.studentName||''; rec.classCode=d.classCode||classCode; rec._base=d; }
      // السجل المتراكم من student_records الجديد
      var rSnap = await db().collection('student_records').doc(studentId).get();
      if(rSnap.exists){ Object.assign(rec, rSnap.data()); }
    }catch(e){ console.warn('fetchStudentRecord:', e); }
    return rec;
  }

  // حساب مؤشرات سريعة من السجل
  function computeStats(rec){
    var att = rec.attendance||[];
    var present = att.filter(function(a){return a.status==='present';}).length;
    var attRate = att.length ? Math.round(present/att.length*100) : null;
    var grades = (rec.grades||[]).map(function(g){return typeof g.score==='number'?g.score:null;}).filter(function(x){return x!=null;});
    var avg = grades.length ? Math.round(grades.reduce(function(a,b){return a+b;},0)/grades.length) : null;
    var part = (rec.participation||[]).length;
    return { attRate:attRate, avg:avg, participationCount:part, examCount:(rec.exams||[]).length };
  }

  // مستوى الطالب من المتوسط
  function levelOf(avg){
    if(avg==null) return {t:'—',c:'#8A7A63'};
    if(avg>=85) return {t:'متميّز',c:'#3D6B53'};
    if(avg>=70) return {t:'جيد',c:'#8A6D2E'};
    if(avg>=50) return {t:'متوسط',c:'#B8924A'};
    return {t:'يحتاج دعماً',c:'#8A1538'};
  }

  // ═══ الشاشة الرئيسية لملف الطالب ═══
  window.hhOpenStudentFile = async function(studentId, classCode){
    var ov=document.createElement('div'); ov.id='hh-student-file';
    ov.style.cssText='position:fixed;inset:0;background:rgba(42,8,16,.8);z-index:99993;overflow-y:auto;direction:rtl;font-family:Cairo,sans-serif;padding:0;';
    ov.innerHTML='<div style="max-width:760px;margin:0 auto;min-height:100vh;background:linear-gradient(180deg,#F6F1E7,#EFE7D6);"><div style="padding:40px;text-align:center;color:#8A7A63;font-weight:800;">جارٍ تحميل ملف الطالب…</div></div>';
    document.body.appendChild(ov);
    var rec = await fetchStudentRecord(studentId, classCode);
    var stats = computeStats(rec);
    var lvl = levelOf(stats.avg);
    renderStudentFile(ov, rec, stats, lvl);
  };

  function statCard(label, val, sub, color){
    return '<div style="flex:1;min-width:88px;background:#FFFDF8;border:1.5px solid #EDE3CE;border-radius:14px;padding:12px 8px;text-align:center;">'
      +'<div style="font-size:1.5rem;font-weight:900;color:'+(color||'#8A1538')+';line-height:1;">'+val+'</div>'
      +'<div style="font-size:.62rem;color:#8A7A63;font-weight:700;margin-top:3px;">'+label+'</div>'
      +(sub?'<div style="font-size:.55rem;color:#B8AD94;margin-top:1px;">'+sub+'</div>':'')+'</div>';
  }

  function renderStudentFile(ov, rec, stats, lvl){
    var initial = (rec.name||'؟').charAt(0);
    var tabs = [
      {id:'overview', t:'نظرة عامة'},
      {id:'attendance', t:'الحضور'},
      {id:'grades', t:'الدرجات'},
      {id:'traits', t:'الشخصية'},
      {id:'guard', t:'أولياء الأمر'},
      {id:'contact', t:'التواصل'},
      {id:'plans', t:'خطة الدعم'},
      {id:'skills', t:'المهارات'},
      {id:'notes', t:'الملاحظات'},
      {id:'report', t:'التقرير'}
    ];
    ov.innerHTML='<div style="max-width:760px;margin:0 auto;min-height:100vh;background:linear-gradient(180deg,#F6F1E7,#EFE7D6);">'
      // ترويسة
      +'<div style="background:linear-gradient(135deg,#4A0B1E,#5E0E26);padding:18px 20px;position:sticky;top:0;z-index:5;box-shadow:0 3px 14px rgba(42,8,16,.3);">'
      +  '<div style="display:flex;align-items:center;gap:14px;">'
      +    '<button onclick="document.getElementById(\'hh-student-file\').remove()" style="background:rgba(212,188,133,.14);border:1px solid #B8924A;border-radius:10px;width:36px;height:36px;color:#F5E6C4;font-weight:900;cursor:pointer;flex-shrink:0;">→</button>'
      +    '<div style="width:52px;height:52px;border-radius:15px;background:linear-gradient(135deg,#EAD9B0,#B8924A);color:#2a0810;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:1.4rem;flex-shrink:0;">'+esc2(initial)+'</div>'
      +    '<div style="flex:1;min-width:0;"><div style="color:#FFFDF8;font-weight:900;font-size:1.2rem;">'+esc2(rec.name||'طالب')+'</div>'
      +      '<div style="color:#D4BC85;font-size:.72rem;font-weight:700;">'+esc2(rec.classCode||'')+' · <span style="color:'+lvl.c.replace('#8A1538','#EAD9B0')+';">'+lvl.t+'</span></div></div>'
      +  '</div>'
      // تبويبات
      +  '<div id="hh-sf-tabs" style="display:flex;gap:6px;margin-top:14px;overflow-x:auto;padding-bottom:2px;">'
      +    tabs.map(function(t,i){ return '<button class="hh-sf-tab" data-tab="'+t.id+'" style="flex-shrink:0;border:1.5px solid '+(i===0?'#EAD9B0':'rgba(212,188,133,.35)')+';background:'+(i===0?'linear-gradient(135deg,#EAD9B0,#B8924A)':'rgba(212,188,133,.08)')+';color:'+(i===0?'#2a0810':'#EAD9B0')+';border-radius:10px;padding:7px 14px;font-family:Cairo;font-weight:800;font-size:.75rem;cursor:pointer;white-space:nowrap;">'+t.t+'</button>'; }).join('')
      +  '</div>'
      +'</div>'
      +'<div id="hh-sf-body" style="padding:18px 20px 60px;"></div>'
      +'</div>';

    function renderTab(tab){
      var body=document.getElementById('hh-sf-body'); if(!body)return;
      if(tab==='overview'){
        body.innerHTML='<div style="display:flex;gap:9px;flex-wrap:wrap;margin-bottom:18px;">'
          + statCard('المعدّل', stats.avg!=null?stats.avg+'%':'—', 'الدرجات', lvl.c)
          + statCard('الحضور', stats.attRate!=null?stats.attRate+'%':'—', 'نسبة', '#3D6B53')
          + statCard('المشاركة', stats.participationCount, 'مرة', '#8A6D2E')
          + statCard('الاختبارات', stats.examCount, 'اختبار', '#1F4E79')
          +'</div>'
          + sectionBox('تطوّر المستوى', renderTimeline(rec))
          + sectionBox('نظرة سريعة', '<div style="font-size:.82rem;color:#5E0E26;font-weight:600;line-height:1.8;">'
            + 'المستوى الحالي: <b style="color:'+lvl.c+';">'+lvl.t+'</b><br>'
            + 'المهارات المتقنة: <b>'+((rec.skills&&rec.skills.mastered)||[]).length+'</b> · تحتاج تحسيناً: <b>'+((rec.skills&&rec.skills.needs)||[]).length+'</b><br>'
            + 'الملاحظات المسجّلة: <b>'+((rec.notes)||[]).length+'</b>'
            + '</div>')
          + (window.hhSf2Extra ? window.hhSf2Extra(rec) : '');
      }
      else if(tab==='attendance'){
        var att=rec.attendance||[];
        body.innerHTML = sectionBox('سجل الحضور', att.length
          ? '<div style="display:flex;flex-direction:column;gap:7px;">'+att.slice(-20).reverse().map(function(a){
              var m={present:['حاضر','#3D6B53'],absent:['غائب','#8A1538'],late:['متأخر','#B8924A'],excused:['مستأذن','#1F4E79']}[a.status]||['—','#8A7A63'];
              return '<div style="display:flex;justify-content:space-between;align-items:center;background:#FFFDF8;border:1px solid #EDE3CE;border-radius:10px;padding:9px 12px;"><span style="font-size:.78rem;color:#5E0E26;font-weight:700;">'+esc2(a.date||'')+'</span><span style="font-size:.72rem;font-weight:900;color:'+m[1]+';">'+m[0]+'</span></div>';
            }).join('')+'</div>'
          : emptyState('لا سجل حضور بعد · يُسجَّل من دفتر المتابعة'));
      }
      else if(tab==='grades'){
        var gr=rec.grades||[];
        body.innerHTML = sectionBox('الدرجات', gr.length
          ? '<div style="display:flex;flex-direction:column;gap:7px;">'+gr.slice().reverse().map(function(g){
              return '<div style="display:flex;justify-content:space-between;align-items:center;background:#FFFDF8;border:1px solid #EDE3CE;border-radius:10px;padding:9px 12px;"><span style="font-size:.78rem;color:#5E0E26;font-weight:700;">'+esc2(g.title||'تقييم')+'</span><span style="font-size:.85rem;font-weight:900;color:'+levelOf(g.score).c+';">'+esc2(g.score)+(g.max?'/'+esc2(g.max):'%')+'</span></div>';
            }).join('')+'</div>'
          : emptyState('لا درجات بعد · تدخل تلقائياً من الاختبارات والتصحيح'));
      }
      else if(tab==='skills'){
        var m=(rec.skills&&rec.skills.mastered)||[], n=(rec.skills&&rec.skills.needs)||[];
        body.innerHTML = sectionBox('المهارات المتقنة', m.length? chips(m,'#3D6B53') : emptyState('لم تُرصد مهارات متقنة بعد'))
          + sectionBox('مهارات تحتاج تحسيناً', n.length? chips(n,'#8A1538') : emptyState('لا مهارات ضعيفة مرصودة · تظهر من تحليل النتائج'));
      }
      else if(tab==='notes'){
        var notes=rec.notes||[];
        body.innerHTML = '<div style="margin-bottom:12px;"><div style="display:flex;gap:8px;"><input id="hh-sf-note-in" placeholder="أضف ملاحظة عن الطالب…" style="flex:1;border:1.5px solid #B8924A;border-radius:11px;padding:10px 12px;font-family:Cairo;font-size:.82rem;background:#FDFAF3;box-sizing:border-box;"><button onclick="hhSfAddNote(\''+rec.id+'\')" style="background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;border-radius:11px;padding:10px 18px;font-family:Cairo;font-weight:800;cursor:pointer;">حفظ</button></div></div>'
          + (notes.length? '<div style="display:flex;flex-direction:column;gap:7px;">'+notes.slice().reverse().map(function(nt){
              return '<div style="background:#FFFDF8;border:1px solid #EDE3CE;border-radius:11px;padding:11px 13px;"><div style="font-size:.8rem;color:#3D0918;font-weight:600;line-height:1.6;">'+esc2(nt.text||nt)+'</div>'+(nt.date?'<div style="font-size:.6rem;color:#B8AD94;margin-top:4px;">'+esc2(nt.date)+'</div>':'')+'</div>';
            }).join('')+'</div>' : emptyState('لا ملاحظات بعد'));
      }
      else if(window.hhSf2TabHtml && (tab==='plans'||tab==='traits'||tab==='guard'||tab==='contact'||tab==='report')){
        body.innerHTML = window.hhSf2TabHtml(tab, rec);
        if(window.hhSf2AfterRender) window.hhSf2AfterRender(tab);
      }
    }
    // ربط التبويبات
    ov.querySelectorAll('.hh-sf-tab').forEach(function(b){ b.onclick=function(){
      ov.querySelectorAll('.hh-sf-tab').forEach(function(x){ x.style.background='rgba(212,188,133,.08)'; x.style.color='#EAD9B0'; x.style.borderColor='rgba(212,188,133,.35)'; });
      b.style.background='linear-gradient(135deg,#EAD9B0,#B8924A)'; b.style.color='#2a0810'; b.style.borderColor='#EAD9B0';
      renderTab(b.getAttribute('data-tab'));
    }; });
    window._hhSfRec = rec;
    window._hhSfId = rec.id;
    window._hhSfRender = renderTab;
    renderTab('overview');
  }

  function sectionBox(title, inner){
    return '<div style="margin-bottom:16px;"><div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;"><span style="width:4px;height:16px;background:linear-gradient(#EAD9B0,#B8924A);border-radius:9px;"></span><b style="color:#3D0918;font-size:.92rem;font-weight:900;">'+title+'</b></div>'+inner+'</div>';
  }
  function emptyState(msg){
    return '<div style="text-align:center;color:#8A7A63;font-weight:700;font-size:.8rem;padding:22px 14px;background:#FBF5E9;border:1px dashed #D9C79E;border-radius:12px;">'+msg+'</div>';
  }
  function chips(arr, color){
    return '<div style="display:flex;gap:7px;flex-wrap:wrap;">'+arr.map(function(s){ return '<span style="background:'+color+'18;border:1px solid '+color+';color:'+color+';border-radius:99px;padding:5px 13px;font-size:.74rem;font-weight:800;">'+esc2(s)+'</span>'; }).join('')+'</div>';
  }
  function renderTimeline(rec){
    var tl=rec.timeline||[];
    if(!tl.length) return emptyState('يظهر تطوّر المستوى هنا بعد رصد عدة تقييمات');
    // خط بسيط
    return '<div style="display:flex;align-items:flex-end;gap:8px;height:90px;padding:8px;background:#FFFDF8;border:1px solid #EDE3CE;border-radius:12px;">'
      + tl.slice(-8).map(function(pt){
          var h=Math.max(8,Math.min(100,(pt.value||0)));
          return '<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;"><div style="width:100%;height:'+h+'%;background:linear-gradient(180deg,#B8924A,#5E0E26);border-radius:5px 5px 0 0;min-height:6px;"></div><span style="font-size:.5rem;color:#8A7A63;font-weight:700;">'+esc2(pt.label||'')+'</span></div>';
        }).join('')
      +'</div>';
  }

  // إضافة ملاحظة (تُحفظ في student_records)
  window.hhSfAddNote = async function(studentId){
    var inp=document.getElementById('hh-sf-note-in'); if(!inp)return;
    var text=(inp.value||'').trim(); if(!text) return;
    var note={ text:text, date:new Date().toLocaleDateString('ar-QA'), by:(typeof currentUser!=='undefined'&&currentUser)?currentUser.uid:'' , at:Date.now()};
    try{
      await db().collection('student_records').doc(studentId).set({
        notes: firebase.firestore.FieldValue.arrayUnion(note)
      }, {merge:true});
      inp.value='';
      // تحديث محلي وإعادة العرض
      var rec=window._hhSfRec; if(rec){ rec.notes=rec.notes||[]; rec.notes.push(note); }
      toast2('حُفظت الملاحظة','success');
      // أعد عرض تبويب الملاحظات
      var body=document.getElementById('hh-sf-body');
      var activeTab=document.querySelector('.hh-sf-tab[data-tab="notes"]');
      if(activeTab) activeTab.click();
    }catch(e){ toast2('تعذّر الحفظ · تحقق من الاتصال','error'); }
  };

})();
