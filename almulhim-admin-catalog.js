/* ============================================================
   المُلهم التعليمي — كتالوج لوحة التحكم: المدارس والمناهج التربوية
   almulhimedu.org · almulhim-admin-catalog.js
   ------------------------------------------------------------
   يُحمَّل بعد almulhim-engine.js. يغلّف adminTab بحفظ المرجع
   (لا يلمس جسد الدالة الأصلية) ويضيف تبويبي «المدارس» و«المناهج».
   مجموعتا Firestore:
     admin_catalog_schools/{id}    — المدارس
     admin_catalog_curricula/{id}  — المناهج (كل منهج مربوط بمدرسة)
   الحقل status: 'live' (ظاهر) | 'hidden' (مخفي). القراءة عامة في القواعد،
   والاستعلامات العامة تقيد بـ where('status','==','live')؛ اللوحة تقرأ الكل.
   ============================================================ */
// حفظ مرجع الدالة الأصلية قبل أي تغليف (لا نلمس جسدها في المحرك)
var _origAdminTab = (typeof adminTab === 'function') ? adminTab : null;

(function(){
  'use strict';

  var COL_SCHOOLS   = 'admin_catalog_schools';
  var COL_CURRICULA = 'admin_catalog_curricula';

  var STAGES   = ['ابتدائي','إعدادي','ثانوي'];
  var GRADES   = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  var TERMS    = ['الفصل الأول','الفصل الثاني'];
  var TYPES    = ['حكومية','خاصة','دولية'];
  var SUBJECTS = ['الدراسات الاجتماعية','العلوم','التربية الإسلامية','اللغة العربية','الرياضيات','اللغة الإنجليزية'];

  var _S = { schools:[], curricula:[], loaded:false, loading:false,
             q1:'', fType:'', fStage:'',
             q2:'', fSchool:'', fGrade:'', fTerm:'', fSubject:'',
             editS:null, editC:null, formS:false, formC:false };

  function esc(s){ var d=document.createElement('div'); d.textContent=(s==null?'':String(s)); return d.innerHTML; }
  function db(){ return firebase.firestore(); }
  function toastMsg(m,t){ if(typeof toast==='function') toast(m,t||'info'); }
  function isAdm(){ try{ return typeof hhIsAdmin==='function' && hhIsAdmin(); }catch(e){ return false; } }
  function ico(name){
    var P={
      plus:'<path d="M12 5v14M5 12h14"/>', edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
      eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
      eyeoff:'<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><path d="M1 1l22 22"/>',
      trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>', search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
      school:'<path d="M22 9L12 4 2 9l10 5 10-5z"/><path d="M6 11.5V17c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5"/>',
      book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 4.5v15z"/><path d="M20 17v5H6.5a2.5 2.5 0 0 1 0-5"/>',
      link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
      refresh:'<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>'
    };
    return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(P[name]||'')+'</svg>';
  }
  function arCount(n, one, two, few, many){
    if(n===0) return 'بلا '+many;
    if(n===1) return one; if(n===2) return two;
    if(n>=3 && n<=10) return n+' '+few; return n+' '+many;
  }
  function gradesLabel(arr){ if(!arr||!arr.length) return '—'; return 'الصفوف '+arr.join('، '); }
  function schoolById(id){ for(var i=0;i<_S.schools.length;i++) if(_S.schools[i].id===id) return _S.schools[i]; return null; }
  function curriculaOf(sid){ return _S.curricula.filter(function(c){ return c.schoolId===sid; }); }

  // ─────────── المصادر المضمّنة في الكود (تُقرأ تلقائياً) ───────────
  function embeddedSources(){
    var out=[];
    [['_HH_SCHOOL_T1','مضمّن: مدرستي · الفصل الأول'],['_HH_SCHOOL','مضمّن: مدرستي · الفصل الثاني'],['_HH_SCHOOL_SCI7','مضمّن: علوم · الصف السابع']].forEach(function(p){
      var d=window[p[0]]; if(d && d.units){ var lessons=0; d.units.forEach(function(u){ lessons+=(u.lessons||[]).length; }); out.push({key:p[0],label:p[1],units:d.units.length,lessons:lessons}); }
    });
    return out;
  }

  // ─────────── التحميل ───────────
  function loadAll(force){
    if(_S.loading) return Promise.resolve();
    if(_S.loaded && !force) return Promise.resolve();
    _S.loading=true;
    return Promise.all([ db().collection(COL_SCHOOLS).get(), db().collection(COL_CURRICULA).get() ]).then(function(r){
      _S.schools=[]; r[0].forEach(function(d){ var x=d.data(); x.id=d.id; _S.schools.push(x); });
      _S.curricula=[]; r[1].forEach(function(d){ var x=d.data(); x.id=d.id; _S.curricula.push(x); });
      var byOrder=function(a,b){ return (a.order||0)-(b.order||0) || String(a.name||a.title||'').localeCompare(String(b.name||b.title||''),'ar'); };
      _S.schools.sort(byOrder); _S.curricula.sort(byOrder);
      _S.loaded=true; _S.loading=false; updateBadges();
    }).catch(function(e){ _S.loading=false; console.warn('catalog load', e); toastMsg('تعذر تحميل الكتالوج — تحقق من الاتصال','error'); });
  }
  function updateBadges(){
    var a=document.getElementById('hhc-badge-schools'), b=document.getElementById('hhc-badge-curricula');
    if(a) a.textContent=_S.schools.length; if(b) b.textContent=_S.curricula.length;
  }

  // ─────────── الحفظ / الإخفاء / الحذف ───────────
  function saveDoc(col, id, data){
    data.updatedAt=firebase.firestore.FieldValue.serverTimestamp();
    try{ data.updatedBy=(typeof currentUser!=='undefined' && currentUser && currentUser.uid)||null; }catch(e){}
    if(id) return db().collection(col).doc(id).set(data,{merge:true});
    data.createdAt=firebase.firestore.FieldValue.serverTimestamp();
    return db().collection(col).add(data);
  }
  function toggleStatus(col, item){
    var next = item.status==='hidden' ? 'live' : 'hidden';
    return db().collection(col).doc(item.id).update({status:next, updatedAt:firebase.firestore.FieldValue.serverTimestamp()}).then(function(){
      item.status=next; toastMsg(next==='live'?'أُظهر للجميع':'أُخفي عن الجميع','success'); renderAll();
    }).catch(function(e){ toastMsg('تعذر التحديث: '+e.message,'error'); });
  }
  function removeDoc(col, item, label){
    if(!confirm('حذف «'+label+'» نهائياً؟ لا يمكن التراجع.')) return;
    return db().collection(col).doc(item.id).delete().then(function(){
      if(col===COL_SCHOOLS) _S.schools=_S.schools.filter(function(x){ return x.id!==item.id; });
      else _S.curricula=_S.curricula.filter(function(x){ return x.id!==item.id; });
      toastMsg('تم الحذف','success'); updateBadges(); renderAll();
    }).catch(function(e){ toastMsg('تعذر الحذف: '+e.message,'error'); });
  }

  // ═══════════════ المدارس ═══════════════
  function filteredSchools(){
    var q=_S.q1.trim().toLowerCase();
    return _S.schools.filter(function(s){
      if(_S.fType && s.type!==_S.fType) return false;
      if(_S.fStage && (s.stages||[]).indexOf(_S.fStage)===-1) return false;
      if(q && ((s.name||'')+' '+(s.city||'')+' '+(s.code||'')).toLowerCase().indexOf(q)===-1) return false;
      return true;
    });
  }
  function schoolFormHTML(s){
    s=s||{};
    function opt(list, val, multi){ return list.map(function(v){ var sel = multi ? (val||[]).indexOf(v)!==-1 : val===v; return '<option value="'+esc(v)+'"'+(sel?' selected':'')+'>'+esc(v)+'</option>'; }).join(''); }
    return '<div class="hhc-form" id="hhc-form-school">'
      +'<div class="hhc-form-title">'+ico('school')+' '+(s.id?'تعديل مدرسة':'إضافة مدرسة')+'</div>'
      +'<div class="hhc-grid">'
      +'<label>اسم المدرسة<input id="hhc-s-name" type="text" value="'+esc(s.name||'')+'" placeholder="مدرسة قطر الإعدادية للبنين"></label>'
      +'<label>النوع<select id="hhc-s-type">'+opt(TYPES, s.type||TYPES[0])+'</select></label>'
      +'<label>المدينة<input id="hhc-s-city" type="text" value="'+esc(s.city||'')+'" placeholder="الدوحة"></label>'
      +'<label>الرمز الوزاري (اختياري)<input id="hhc-s-code" type="text" value="'+esc(s.code||'')+'" placeholder="مثال: 1042"></label>'
      +'<label>المراحل<select id="hhc-s-stages" multiple size="3">'+opt(STAGES, s.stages||[], true)+'</select></label>'
      +'<label>الصفوف<select id="hhc-s-grades" multiple size="4">'+opt(GRADES, s.grades||[], true)+'</select></label>'
      +'<label>جهة الاتصال<input id="hhc-s-contact" type="text" value="'+esc(s.contact||'')+'" placeholder="الاسم · الهاتف أو البريد"></label>'
      +'<label>الترتيب<input id="hhc-s-order" type="number" value="'+esc(s.order||0)+'"></label>'
      +'<label class="hhc-span">ملاحظات<textarea id="hhc-s-notes" rows="2">'+esc(s.notes||'')+'</textarea></label>'
      +'</div>'
      +'<div class="hhc-form-actions">'
      +'<button type="button" class="hhc-btn hhc-btn-primary" onclick="hhcSaveSchool()">حفظ</button>'
      +'<button type="button" class="hhc-btn" onclick="hhcCancelSchool()">إلغاء</button>'
      +'<span class="hhc-hint">تظهر للمعلمين بعد الحفظ، ويمكن إخفاؤها في أي وقت</span>'
      +'</div></div>';
  }
  function readMulti(id){ var el=document.getElementById(id); return el ? Array.prototype.slice.call(el.selectedOptions).map(function(o){ return o.value; }) : []; }
  window.hhcSaveSchool=function(){
    var name=(document.getElementById('hhc-s-name').value||'').trim();
    if(!name){ toastMsg('اكتب اسم المدرسة أولاً','warn'); return; }
    var data={ name:name, type:document.getElementById('hhc-s-type').value, city:(document.getElementById('hhc-s-city').value||'').trim(),
      code:(document.getElementById('hhc-s-code').value||'').trim(), stages:readMulti('hhc-s-stages'), grades:readMulti('hhc-s-grades'),
      contact:(document.getElementById('hhc-s-contact').value||'').trim(), order:parseInt(document.getElementById('hhc-s-order').value||'0',10)||0,
      notes:(document.getElementById('hhc-s-notes').value||'').trim() };
    if(!_S.editS) data.status='live';
    saveDoc(COL_SCHOOLS, _S.editS && _S.editS.id, data).then(function(){
      toastMsg(_S.editS?'تم تحديث المدرسة':'أُضيفت المدرسة','success'); _S.editS=null; _S.formS=false; return loadAll(true);
    }).then(renderAll).catch(function(e){ toastMsg('تعذر الحفظ: '+e.message,'error'); });
  };
  window.hhcCancelSchool=function(){ _S.editS=null; _S.formS=false; renderSchools(); };
  window.hhcNewSchool=function(){ _S.editS=null; _S.formS=true; renderSchools(); };
  window.hhcEditSchool=function(id){ _S.editS=schoolById(id); _S.formS=true; renderSchools(); };
  window.hhcToggleSchool=function(id){ var s=schoolById(id); if(s) toggleStatus(COL_SCHOOLS, s); };
  window.hhcDeleteSchool=function(id){
    var s=schoolById(id); if(!s) return;
    var n=curriculaOf(id).length;
    if(n){ toastMsg('لا يمكن حذف المدرسة: مرتبط بها '+arCount(n,'منهج واحد','منهجان','مناهج','منهجاً')+' · احذف المناهج أو انقلها أولاً','warn'); return; }
    removeDoc(COL_SCHOOLS, s, s.name);
  };
  window.hhcSchoolCurricula=function(id){ _S.fSchool=id; _S.q2=''; _S.fGrade=''; _S.fTerm=''; _S.fSubject=''; if(typeof adminTab==='function') adminTab('curricula'); };
  window.hhcFilterSchools=function(){ _S.q1=(document.getElementById('hhc-s-q')||{}).value||''; _S.fType=(document.getElementById('hhc-s-ftype')||{}).value||''; _S.fStage=(document.getElementById('hhc-s-fstage')||{}).value||''; renderSchools(true); };

  function schoolCardHTML(s){
    var hidden=s.status==='hidden'; var n=curriculaOf(s.id).length;
    return '<div class="hhc-card'+(hidden?' hhc-hidden':'')+'">'
      +'<div class="hhc-card-main">'
      +'<div class="hhc-card-t">'+esc(s.name)+(s.code?' <span class="hhc-code">'+esc(s.code)+'</span>':'')+'</div>'
      +'<div class="hhc-card-d">'+esc(s.type||'—')+' · '+esc(s.city||'—')+' · '+esc((s.stages||[]).join('، ')||'—')+' · '+esc(gradesLabel(s.grades))+'</div>'
      +'<div class="hhc-card-links"><button type="button" class="hhc-chip" onclick="hhcSchoolCurricula(\''+s.id+'\')">'+ico('book')+' '+arCount(n,'منهج واحد','منهجان','مناهج','منهج')+'</button>'
      +(s.contact?'<span class="hhc-chip hhc-chip-plain">'+esc(s.contact)+'</span>':'')+(s.notes?'<span class="hhc-chip hhc-chip-plain">'+esc(s.notes)+'</span>':'')+'</div>'
      +'</div>'
      +'<div class="hhc-card-acts">'
      +'<span class="hhc-status'+(hidden?' off':'')+'">'+(hidden?'مخفية':'ظاهرة')+'</span>'
      +'<button type="button" class="hhc-btn hhc-btn-sm" onclick="hhcEditSchool(\''+s.id+'\')">'+ico('edit')+' تعديل</button>'
      +'<button type="button" class="hhc-btn hhc-btn-sm" onclick="hhcToggleSchool(\''+s.id+'\')">'+ico(hidden?'eye':'eyeoff')+' '+(hidden?'إظهار':'إخفاء')+'</button>'
      +'<button type="button" class="hhc-btn hhc-btn-sm hhc-btn-danger" onclick="hhcDeleteSchool(\''+s.id+'\')">'+ico('trash')+' حذف</button>'
      +'</div></div>';
  }
  function renderSchools(keepFocus){
    var box=document.getElementById('hhc-schools-root'); if(!box) return;
    if(!isAdm()){ box.innerHTML='<div class="hhc-empty">هذا القسم للمشرف فقط</div>'; return; }
    var list=filteredSchools();
    var opts=function(arr,cur,all){ return '<option value="">'+all+'</option>'+arr.map(function(v){ return '<option value="'+esc(v)+'"'+(cur===v?' selected':'')+'>'+esc(v)+'</option>'; }).join(''); };
    var html='<div class="hhc-bar">'
      +'<div class="hhc-search">'+ico('search')+'<input id="hhc-s-q" type="search" placeholder="ابحث بالاسم أو المدينة أو الرمز" value="'+esc(_S.q1)+'" oninput="hhcFilterSchools()"></div>'
      +'<select id="hhc-s-ftype" onchange="hhcFilterSchools()">'+opts(TYPES,_S.fType,'كل الأنواع')+'</select>'
      +'<select id="hhc-s-fstage" onchange="hhcFilterSchools()">'+opts(STAGES,_S.fStage,'كل المراحل')+'</select>'
      +'<button type="button" class="hhc-btn" onclick="hhcReload()" title="تحديث">'+ico('refresh')+'</button>'
      +'<button type="button" class="hhc-btn hhc-btn-primary" onclick="hhcNewSchool()">'+ico('plus')+' مدرسة جديدة</button>'
      +'</div>'
      +(_S.formS ? schoolFormHTML(_S.editS) : '')
      +'<div class="hhc-count">'+arCount(list.length,'مدرسة واحدة','مدرستان','مدارس','مدرسة')+(list.length!==_S.schools.length?' من '+_S.schools.length:'')+'</div>'
      +(list.length ? list.map(schoolCardHTML).join('') : '<div class="hhc-empty">'+(_S.schools.length?'لا نتائج مطابقة للتصفية':'لا مدارس بعد · أضف المدرسة الأولى')+'</div>');
    box.innerHTML=html;
    if(keepFocus){ var q=document.getElementById('hhc-s-q'); if(q){ q.focus(); q.setSelectionRange(q.value.length,q.value.length); } }
  }

  // ═══════════════ المناهج ═══════════════
  function filteredCurricula(){
    var q=_S.q2.trim().toLowerCase();
    return _S.curricula.filter(function(c){
      if(_S.fSchool && c.schoolId!==_S.fSchool) return false;
      if(_S.fGrade && c.grade!==_S.fGrade) return false;
      if(_S.fTerm && c.term!==_S.fTerm) return false;
      if(_S.fSubject && c.subject!==_S.fSubject) return false;
      if(q && ((c.title||'')+' '+(c.subject||'')+' '+(c.description||'')).toLowerCase().indexOf(q)===-1) return false;
      return true;
    });
  }
  function curriculumFormHTML(c){
    c=c||{};
    var sid = c.schoolId || (_S.fSchool||'') || (_S.schools[0]&&_S.schools[0].id) || '';
    var sch = schoolById(sid);
    var stages = sch && sch.stages && sch.stages.length ? sch.stages : STAGES;
    var grades = sch && sch.grades && sch.grades.length ? sch.grades : GRADES;
    function opt(list,val){ return list.map(function(v){ return '<option value="'+esc(v)+'"'+(val===v?' selected':'')+'>'+esc(v)+'</option>'; }).join(''); }
    var srcs=embeddedSources();
    var srcOpts='<option value="cloud"'+(c.sourceKey==='cloud'||!c.sourceKey?' selected':'')+'>سحابي (يُبنى من اللوحة لاحقاً)</option>'
      + srcs.map(function(s){ return '<option value="'+esc(s.key)+'"'+(c.sourceKey===s.key?' selected':'')+'>'+esc(s.label)+' · '+s.units+' وحدات · '+s.lessons+' درساً</option>'; }).join('');
    return '<div class="hhc-form" id="hhc-form-cur">'
      +'<div class="hhc-form-title">'+ico('book')+' '+(c.id?'تعديل منهج':'إضافة منهج')+' <span class="hhc-hint">'+ico('link')+' مربوط بالمدرسة والمرحلة والصف والفصل والمادة</span></div>'
      +'<div class="hhc-grid">'
      +'<label class="hhc-span">عنوان المنهج<input id="hhc-c-title" type="text" value="'+esc(c.title||'')+'" placeholder="الدراسات الاجتماعية · الصف السابع · الفصل الأول"></label>'
      +'<label>المدرسة<select id="hhc-c-school" onchange="hhcSchoolChanged()">'+(_S.schools.length?_S.schools.map(function(s){ return '<option value="'+s.id+'"'+(sid===s.id?' selected':'')+'>'+esc(s.name)+(s.status==='hidden'?' (مخفية)':'')+'</option>'; }).join(''):'<option value="">أضف مدرسة أولاً</option>')+'</select></label>'
      +'<label>المرحلة<select id="hhc-c-stage">'+opt(stages, c.stage||stages[0])+'</select></label>'
      +'<label>الصف<select id="hhc-c-grade">'+opt(grades, c.grade||grades[0])+'</select></label>'
      +'<label>الفصل<select id="hhc-c-term">'+opt(TERMS, c.term||TERMS[0])+'</select></label>'
      +'<label>المادة<input id="hhc-c-subject" type="text" list="hhc-subjects" value="'+esc(c.subject||'')+'" placeholder="الدراسات الاجتماعية"><datalist id="hhc-subjects">'+SUBJECTS.map(function(s){ return '<option value="'+esc(s)+'">'; }).join('')+'</datalist></label>'
      +'<label>المصدر<select id="hhc-c-source">'+srcOpts+'</select></label>'
      +'<label>عدد الوحدات<input id="hhc-c-units" type="number" min="0" value="'+esc(c.unitsCount||0)+'"></label>'
      +'<label>عدد الدروس<input id="hhc-c-lessons" type="number" min="0" value="'+esc(c.lessonsCount||0)+'"></label>'
      +'<label>الترتيب<input id="hhc-c-order" type="number" value="'+esc(c.order||0)+'"></label>'
      +'<label class="hhc-span">الوصف<textarea id="hhc-c-desc" rows="2">'+esc(c.description||'')+'</textarea></label>'
      +'</div>'
      +'<div class="hhc-form-actions">'
      +'<button type="button" class="hhc-btn hhc-btn-primary" onclick="hhcSaveCurriculum()">حفظ</button>'
      +'<button type="button" class="hhc-btn" onclick="hhcCancelCurriculum()">إلغاء</button>'
      +'<span class="hhc-hint">اختيار مصدر مضمّن يملأ عدد الوحدات والدروس تلقائياً</span>'
      +'</div></div>';
  }
  window.hhcSchoolChanged=function(){
    var sid=document.getElementById('hhc-c-school').value; var sch=schoolById(sid);
    var stages = sch && sch.stages && sch.stages.length ? sch.stages : STAGES;
    var grades = sch && sch.grades && sch.grades.length ? sch.grades : GRADES;
    var st=document.getElementById('hhc-c-stage'), gr=document.getElementById('hhc-c-grade');
    if(st) st.innerHTML=stages.map(function(v){ return '<option value="'+esc(v)+'">'+esc(v)+'</option>'; }).join('');
    if(gr) gr.innerHTML=grades.map(function(v){ return '<option value="'+esc(v)+'">'+esc(v)+'</option>'; }).join('');
  };
  function bindSourceAutofill(){
    var sel=document.getElementById('hhc-c-source'); if(!sel) return;
    sel.addEventListener('change', function(){
      var k=sel.value; var srcs=embeddedSources();
      for(var i=0;i<srcs.length;i++) if(srcs[i].key===k){ document.getElementById('hhc-c-units').value=srcs[i].units; document.getElementById('hhc-c-lessons').value=srcs[i].lessons; }
    });
  }
  window.hhcSaveCurriculum=function(){
    var title=(document.getElementById('hhc-c-title').value||'').trim();
    var sid=document.getElementById('hhc-c-school').value;
    if(!title){ toastMsg('اكتب عنوان المنهج أولاً','warn'); return; }
    if(!sid){ toastMsg('اربط المنهج بمدرسة أولاً','warn'); return; }
    var subject=(document.getElementById('hhc-c-subject').value||'').trim();
    if(!subject){ toastMsg('حدد المادة','warn'); return; }
    var data={ title:title, schoolId:sid, stage:document.getElementById('hhc-c-stage').value, grade:document.getElementById('hhc-c-grade').value,
      term:document.getElementById('hhc-c-term').value, subject:subject, sourceKey:document.getElementById('hhc-c-source').value||'cloud',
      unitsCount:parseInt(document.getElementById('hhc-c-units').value||'0',10)||0, lessonsCount:parseInt(document.getElementById('hhc-c-lessons').value||'0',10)||0,
      order:parseInt(document.getElementById('hhc-c-order').value||'0',10)||0, description:(document.getElementById('hhc-c-desc').value||'').trim() };
    if(!_S.editC) data.status='live';
    saveDoc(COL_CURRICULA, _S.editC && _S.editC.id, data).then(function(){
      toastMsg(_S.editC?'تم تحديث المنهج':'أُضيف المنهج','success'); _S.editC=null; _S.formC=false; return loadAll(true);
    }).then(renderAll).catch(function(e){ toastMsg('تعذر الحفظ: '+e.message,'error'); });
  };
  function curById(id){ for(var i=0;i<_S.curricula.length;i++) if(_S.curricula[i].id===id) return _S.curricula[i]; return null; }
  window.hhcCancelCurriculum=function(){ _S.editC=null; _S.formC=false; renderCurricula(); };
  window.hhcNewCurriculum=function(){ if(!_S.schools.length){ toastMsg('أضف مدرسة أولاً ليُربط بها المنهج','warn'); return; } _S.editC=null; _S.formC=true; renderCurricula(); };
  window.hhcEditCurriculum=function(id){ _S.editC=curById(id); _S.formC=true; renderCurricula(); };
  window.hhcToggleCurriculum=function(id){ var c=curById(id); if(c) toggleStatus(COL_CURRICULA, c); };
  window.hhcDeleteCurriculum=function(id){ var c=curById(id); if(c) removeDoc(COL_CURRICULA, c, c.title); };
  window.hhcFilterCurricula=function(){
    _S.q2=(document.getElementById('hhc-c-q')||{}).value||''; _S.fSchool=(document.getElementById('hhc-c-fschool')||{}).value||'';
    _S.fGrade=(document.getElementById('hhc-c-fgrade')||{}).value||''; _S.fTerm=(document.getElementById('hhc-c-fterm')||{}).value||''; _S.fSubject=(document.getElementById('hhc-c-fsubject')||{}).value||'';
    renderCurricula(true);
  };
  function curriculumCardHTML(c){
    var hidden=c.status==='hidden'; var sch=schoolById(c.schoolId);
    var src = c.sourceKey && c.sourceKey!=='cloud' ? 'مضمّن' : 'سحابي';
    return '<div class="hhc-card'+(hidden?' hhc-hidden':'')+'">'
      +'<div class="hhc-card-main">'
      +'<div class="hhc-card-t">'+esc(c.title)+'</div>'
      +'<div class="hhc-card-d">'+ico('link')+' '+(sch?esc(sch.name):'<span class="hhc-warn">مدرسة محذوفة</span>')+' · '+esc(c.stage||'—')+' · الصف '+esc(c.grade||'—')+' · '+esc(c.term||'—')+' · '+esc(c.subject||'—')+'</div>'
      +'<div class="hhc-card-links"><span class="hhc-chip hhc-chip-plain">'+arCount(c.unitsCount||0,'وحدة واحدة','وحدتان','وحدات','وحدة')+' · '+arCount(c.lessonsCount||0,'درس واحد','درسان','دروس','درساً')+'</span><span class="hhc-chip hhc-chip-plain">'+src+(c.sourceKey&&c.sourceKey!=='cloud'?' · '+esc(c.sourceKey):'')+'</span>'+(c.description?'<span class="hhc-chip hhc-chip-plain">'+esc(c.description)+'</span>':'')+'</div>'
      +'</div>'
      +'<div class="hhc-card-acts">'
      +'<span class="hhc-status'+(hidden?' off':'')+'">'+(hidden?'مخفي':'ظاهر')+'</span>'
      +'<button type="button" class="hhc-btn hhc-btn-sm" onclick="hhcEditCurriculum(\''+c.id+'\')">'+ico('edit')+' تعديل</button>'
      +'<button type="button" class="hhc-btn hhc-btn-sm" onclick="hhcToggleCurriculum(\''+c.id+'\')">'+ico(hidden?'eye':'eyeoff')+' '+(hidden?'إظهار':'إخفاء')+'</button>'
      +'<button type="button" class="hhc-btn hhc-btn-sm hhc-btn-danger" onclick="hhcDeleteCurriculum(\''+c.id+'\')">'+ico('trash')+' حذف</button>'
      +'</div></div>';
  }
  function renderCurricula(keepFocus){
    var box=document.getElementById('hhc-curricula-root'); if(!box) return;
    if(!isAdm()){ box.innerHTML='<div class="hhc-empty">هذا القسم للمشرف فقط</div>'; return; }
    var list=filteredCurricula();
    var opts=function(arr,cur,all){ return '<option value="">'+all+'</option>'+arr.map(function(v){ return '<option value="'+esc(v)+'"'+(cur===v?' selected':'')+'>'+esc(v)+'</option>'; }).join(''); };
    var subjects=[]; _S.curricula.forEach(function(c){ if(c.subject && subjects.indexOf(c.subject)===-1) subjects.push(c.subject); });
    var html='<div class="hhc-bar">'
      +'<div class="hhc-search">'+ico('search')+'<input id="hhc-c-q" type="search" placeholder="ابحث بالعنوان أو المادة" value="'+esc(_S.q2)+'" oninput="hhcFilterCurricula()"></div>'
      +'<select id="hhc-c-fschool" onchange="hhcFilterCurricula()"><option value="">كل المدارس</option>'+_S.schools.map(function(s){ return '<option value="'+s.id+'"'+(_S.fSchool===s.id?' selected':'')+'>'+esc(s.name)+'</option>'; }).join('')+'</select>'
      +'<select id="hhc-c-fgrade" onchange="hhcFilterCurricula()">'+opts(GRADES,_S.fGrade,'كل الصفوف')+'</select>'
      +'<select id="hhc-c-fterm" onchange="hhcFilterCurricula()">'+opts(TERMS,_S.fTerm,'الفصلان')+'</select>'
      +'<select id="hhc-c-fsubject" onchange="hhcFilterCurricula()">'+opts(subjects,_S.fSubject,'كل المواد')+'</select>'
      +'<button type="button" class="hhc-btn" onclick="hhcReload()" title="تحديث">'+ico('refresh')+'</button>'
      +'<button type="button" class="hhc-btn hhc-btn-primary" onclick="hhcNewCurriculum()">'+ico('plus')+' منهج جديد</button>'
      +'</div>'
      +(_S.formC ? curriculumFormHTML(_S.editC) : '')
      +'<div class="hhc-count">'+arCount(list.length,'منهج واحد','منهجان','مناهج','منهجاً')+(list.length!==_S.curricula.length?' من '+_S.curricula.length:'')+(_S.fSchool&&schoolById(_S.fSchool)?' · مصفّى على '+esc(schoolById(_S.fSchool).name):'')+'</div>'
      +(list.length ? list.map(curriculumCardHTML).join('') : '<div class="hhc-empty">'+(_S.curricula.length?'لا نتائج مطابقة للتصفية':'لا مناهج بعد · أضف المنهج الأول واربطه بمدرسة')+'</div>');
    box.innerHTML=html;
    if(_S.formC) bindSourceAutofill();
    if(keepFocus){ var q=document.getElementById('hhc-c-q'); if(q){ q.focus(); q.setSelectionRange(q.value.length,q.value.length); } }
  }
  function renderAll(){ updateBadges(); renderSchools(); renderCurricula(); }
  window.hhcReload=function(){ loadAll(true).then(renderAll); };

  // ─────────── واجهة عامة للاستهلاك خارج اللوحة (الظاهر فقط) ───────────
  window.hhCatalogPublic=function(kind){
    var col = kind==='schools' ? COL_SCHOOLS : COL_CURRICULA;
    return db().collection(col).where('status','==','live').get().then(function(qs){ var out=[]; qs.forEach(function(d){ var x=d.data(); x.id=d.id; out.push(x); }); return out; });
  };

  // ─────────── تغليف adminTab بحفظ المرجع ───────────
  var OUR_TABS=['schools','curricula'];
  function showOurPanel(tab){
    OUR_TABS.forEach(function(t){ var p=document.getElementById('admin-'+t+'-panel'); if(p) p.style.display = t===tab ? 'block' : 'none'; });
    document.querySelectorAll('.mc-item[data-tab]').forEach(function(b){ if(OUR_TABS.indexOf(b.dataset.tab)!==-1) b.classList.toggle('active', b.dataset.tab===tab); });
  }
  function install(){
    if(!_origAdminTab && typeof window.adminTab==='function') _origAdminTab = window.adminTab;
    if(!_origAdminTab || (window.adminTab && window.adminTab._hhcWrapped)) return;
    window.adminTab = function(tab){
      var r; try{ r=_origAdminTab.apply(this, arguments); }catch(e){ console.warn('adminTab', e); }
      showOurPanel(tab);
      if(OUR_TABS.indexOf(tab)!==-1){ loadAll(false).then(function(){ renderAll(); }); }
      return r;
    };
    window.adminTab._hhcWrapped=true;
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();
