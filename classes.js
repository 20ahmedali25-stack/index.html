// ═══════════════ جناح «صفوفي وطلابي» داخل الحرم (zzzd): إنشاء بخطوة، رمز للمشاركة، طلاب داخل البطاقة، استيراد Excel ═══════════════
var _hhCls = { all:[], students:{}, open:{}, form:false, schools:null, bulk:{code:null, rows:[]} };
function _hhClsDb(){ return firebase.firestore(); }
function _hhClsCode(){ return (typeof _generateClassCode==='function') ? _generateClassCode() : ('HH-'+Math.random().toString(36).slice(2,8).toUpperCase()); }
function _hhClsToast(m,k){ if(typeof toast==='function') toast(m,k||'info'); }

async function hhCampusRenderClasses(){
  var box=document.getElementById('hh-campus-classes-list'); if(!box) return;
  if(typeof currentUser==='undefined' || !currentUser){ box.innerHTML='<div class="hh-campus-empty">سجّل دخولك لتنشئ صفوفك</div>'; return; }
  if(!_hhCls.loaded){
    box.innerHTML='<div class="hh-campus-empty">جارٍ تحميل الصفوف…</div>';
    try{
      var qs=await _hhClsDb().collection('classrooms').where('teacherId','==',currentUser.uid).get();
      _hhCls.all=[]; qs.forEach(function(d){ var c=d.data(); c._code=d.id; _hhCls.all.push(c); });
      _hhCls.all.sort(function(a,b){ return (b.active?1:0)-(a.active?1:0) || String(a.className||'').localeCompare(String(b.className||''),'ar'); });
      _hhCls.loaded=true; _hhHubClasses=_hhCls.all.filter(function(c){ return c.active!==false; });
    }catch(e){ box.innerHTML='<div class="hh-campus-empty"><div class="hh-campus-empty-t">تعذر تحميل الصفوف — تحقق من الاتصال</div><button type="button" onclick="_hhCls.loaded=false;hhCampusRenderClasses()" class="hh-campus-btn-line" style="margin-top:10px;">'+_hhCampusIco('refresh',13)+' أعد المحاولة</button></div>'; return; }
  }
  var active=_hhCls.all.filter(function(c){ return c.active!==false; }), archived=_hhCls.all.filter(function(c){ return c.active===false; });
  var tot=0; active.forEach(function(c){ tot+=(c.studentCount||0); });
  var h='<div class="hh-campus-crumb-row" style="margin-bottom:8px;"><div><div class="hh-campus-card-t">'+arCountCls(active.length,'صف واحد','صفان','صفوف','صفاً')+' · '+arCountCls(tot,'طالب واحد','طالبان','طلاب','طالباً')+'</div></div>'
    +'<button type="button" class="hh-campus-btn-gold" onclick="hhClsNew()">'+_hhCampusIco('plus',14)+' صف جديد</button></div>'
    +(_hhCls.form?hhClsFormHTML():'')
    +(active.length?active.map(hhClsCardHTML).join(''):'<div class="hh-campus-empty"><div class="hh-campus-empty-t">مقرّ قيادتك جاهز — ينقصه صفك الأول</div><div style="margin-top:6px;">أنشئ الصف، شارك رمزه مع طلابك، وابدأ الحصة</div></div>')
    +(archived.length?'<div class="hh-campus-sec"><span class="hh-campus-sec-dot"></span>مؤرشفة</div>'+archived.map(hhClsCardHTML).join(''):'');
  box.innerHTML=h;
  Object.keys(_hhCls.open).forEach(function(code){ if(_hhCls.open[code]) hhClsLoadStudents(code); });
}
function arCountCls(n,one,two,few,many){ if(n===0) return 'بلا '+many; if(n===1) return one; if(n===2) return two; if(n<=10) return n+' '+few; return n+' '+many; }
function _hhClsIco(){ return {plus:'<path d="M12 5v14M5 12h14"/>',copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',tv:'<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',chev:'<polyline points="6 9 12 15 18 9"/>',archive:'<rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v12h14V8M10 12h4"/>'}; }
function _hhClsSvg(n,sz){ return '<svg width="'+(sz||14)+'" height="'+(sz||14)+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(_hhClsIco()[n]||'')+'</svg>'; }

function hhClsFormHTML(){
  var schools=_hhCls.schools||[];
  return '<div class="hh-campus-card hh-cls-form">'
    +'<div class="hh-campus-card-t">صف جديد · خطوة واحدة</div>'
    +'<div class="hh-cls-grid">'
    +'<label>اسم الصف<input id="hh-cls-name" type="text" placeholder="7/1"></label>'
    +'<label>المدرسة'+(schools.length?'<select id="hh-cls-school">'+schools.map(function(s){ return '<option value="'+esc(s.name)+'">'+esc(s.name)+'</option>'; }).join('')+'<option value="__other">أخرى…</option></select>':'<input id="hh-cls-school-txt" type="text" placeholder="اسم المدرسة">')+'</label>'
    +'<label>المادة<input id="hh-cls-subject" type="text" list="hh-cls-subj" placeholder="الدراسات الاجتماعية"><datalist id="hh-cls-subj"><option value="الدراسات الاجتماعية"><option value="العلوم"><option value="التربية الإسلامية"><option value="اللغة العربية"></datalist></label>'
    +'</div>'
    +'<div class="hh-campus-card-btns" style="justify-content:flex-start;"><button type="button" class="hh-campus-btn-gold" onclick="hhClsCreate()">أنشئ وأظهر الرمز</button><button type="button" class="hh-campus-btn-line" onclick="_hhCls.form=false;hhCampusRenderClasses()">إلغاء</button><span class="hh-campus-sub" style="margin:0;">الرمز يتولّد تلقائياً ويُشارك عبر واتساب أو يُعرض على الشاشة</span></div>'
    +'</div>';
}
async function hhClsNew(){
  _hhCls.form=true;
  if(_hhCls.schools===null){ _hhCls.schools=[]; try{ if(typeof hhCatalogPublic==='function') _hhCls.schools=await hhCatalogPublic('schools'); }catch(e){} }
  hhCampusRenderClasses(); setTimeout(function(){ var i=document.getElementById('hh-cls-name'); if(i) i.focus(); },50);
}
async function hhClsCreate(){
  var name=(document.getElementById('hh-cls-name').value||'').trim(); if(name.length<1){ _hhClsToast('اكتب اسم الصف','warn'); return; }
  var sel=document.getElementById('hh-cls-school'); var school = sel ? sel.value : ((document.getElementById('hh-cls-school-txt')||{}).value||'').trim();
  if(school==='__other'){ school=prompt('اسم المدرسة')||''; }
  var subject=(document.getElementById('hh-cls-subject').value||'').trim();
  try{
    var db=_hhClsDb(), code=null;
    for(var i=0;i<5;i++){ var cand=_hhClsCode(); var d=await db.collection('classrooms').doc(cand).get(); if(!d.exists){ code=cand; break; } }
    if(!code){ _hhClsToast('تعذر توليد رمز فريد · حاول مرة أخرى','error'); return; }
    var doc={ code:code, className:name, schoolName:school||'', subject:subject||'', teacherId:currentUser.uid, teacherName:currentUser.displayName||currentUser.email||'', teacherEmail:currentUser.email||'', studentCount:0, quizCount:0, active:true, createdAt:firebase.firestore.FieldValue.serverTimestamp() };
    await db.collection('classrooms').doc(code).set(doc);
    doc._code=code; _hhCls.all.unshift(doc); _hhCls.form=false; _hhHubClasses=_hhCls.all.filter(function(c){ return c.active!==false; });
    hhCampusRenderClasses(); hhClsShowCode(code);
    try{ if(typeof hhLogActivity==='function') hhLogActivity('class','صف جديد: '+name); }catch(e){}
  }catch(e){ _hhClsToast('تعذر إنشاء الصف: '+e.message,'error'); }
}

function hhClsCardHTML(c){
  var code=c._code, arch=c.active===false, open=!!_hhCls.open[code];
  return '<div class="hh-campus-card hh-cls-card'+(arch?' hh-cls-arch':'')+'" id="hh-cls-'+code+'">'
    +'<div class="hh-cls-head">'
    +'<div class="hh-cls-main"><div class="hh-campus-card-t">'+esc(c.className)+(c.subject?' · '+esc(c.subject):'')+'</div><div class="hh-campus-card-d">'+(c.schoolName?esc(c.schoolName)+' · ':'')+arCountCls(c.studentCount||0,'طالب واحد','طالبان','طلاب','طالباً')+(arch?' · <b>مؤرشف</b>':'')+'</div></div>'
    +(arch?'':'<div class="hh-cls-codebox"><span class="hh-cls-code" dir="ltr">'+esc(code)+'</span>'
      +'<button type="button" class="hh-cls-ib" title="نسخ الرمز" onclick="hhClsCopy(\''+code+'\')">'+_hhClsSvg('copy')+'</button>'
      +'<button type="button" class="hh-cls-ib" title="مشاركة عبر واتساب" onclick="hhClsShare(\''+code+'\')">'+_hhClsSvg('share')+'</button>'
      +'<button type="button" class="hh-cls-ib" title="اعرض على الشاشة" onclick="hhClsShowCode(\''+code+'\')">'+_hhClsSvg('tv')+'</button></div>')
    +'</div>'
    +'<div class="hh-campus-card-btns">'
    +(arch
      ? '<button type="button" class="hh-campus-btn-line" onclick="hhClsArchive(\''+code+'\',false)">استعادة</button><button type="button" class="hh-campus-btn-line" onclick="hhClsDelete(\''+code+'\')">حذف نهائي</button>'
      : '<button type="button" class="hh-campus-btn-maroon" onclick="hhClsStartSession(\''+code+'\')">'+_hhCampusIco('play',13)+' ابدأ حصة</button>'
       +'<button type="button" class="hh-campus-btn-line" onclick="hhHubGo(\'gradebook\')">الدفتر</button>'
       +'<button type="button" class="hh-campus-btn-line" onclick="hhOpenSmartFollowup(\''+code+'\')">الدفتر الذكي</button>'
       +'<button type="button" class="hh-campus-btn-line" onclick="hhHubGo(\'certs\')">الشهادات</button>'
       +'<button type="button" class="hh-campus-btn-line" onclick="hhClsToggle(\''+code+'\')">الطلاب '+_hhClsSvg('chev',12)+'</button>'
       +'<button type="button" class="hh-campus-btn-line" title="أرشفة نهاية الفصل" onclick="hhClsArchive(\''+code+'\',true)">'+_hhClsSvg('archive',13)+'</button>')
    +'</div>'
    +'<div class="hh-cls-fold" id="hh-cls-fold-'+code+'"'+(open?'':' hidden')+'></div>'
    +'</div>';
}
function hhClsCopy(code){ try{ navigator.clipboard.writeText(code); _hhClsToast('نُسخ الرمز '+code,'success'); }catch(e){ prompt('انسخ الرمز:',code); } }
function hhClsShare(code){
  var c=_hhCls.all.filter(function(x){ return x._code===code; })[0]||{};
  var txt='انضم إلى صف «'+(c.className||'')+'» على منصة المُلهم: افتح almulhimedu.org ← المدرسة ← صفي ← أدخل الرمز '+code;
  window.open('https://wa.me/?text='+encodeURIComponent(txt),'_blank');
}
function hhClsShowCode(code){
  var c=_hhCls.all.filter(function(x){ return x._code===code; })[0]||{};
  var old=document.getElementById('hh-cls-big'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-cls-big'; ov.className='hh-cls-big';
  ov.innerHTML='<div class="hh-cls-big-in"><div class="hh-cls-big-t">'+esc(c.className||'')+'</div><div class="hh-cls-big-l">رمز الانضمام</div><div class="hh-cls-big-code" dir="ltr">'+esc(code)+'</div><div class="hh-cls-big-h">المدرسة ← صفي ← أدخل الرمز</div><div class="hh-cls-big-n" id="hh-cls-big-n"></div><button type="button" class="hh-campus-btn-gold" onclick="document.getElementById(\'hh-cls-big\').remove()">إغلاق</button></div>';
  document.body.appendChild(ov);
  try{ // عدّاد المنضمين الحي
    var un=_hhClsDb().collection('classroom_students').where('classCode','==',code).where('active','==',true).onSnapshot(function(qs){ var joined=0; qs.forEach(function(d){ if(d.data().userId) joined++; }); var n=document.getElementById('hh-cls-big-n'); if(n) n.textContent=joined+' انضموا حتى الآن'; else un(); });
  }catch(e){}
}
function hhClsStartSession(code){
  try{ localStorage.setItem('hh_current_class', code); }catch(e){}
  hhHubClose(); if(typeof showScreen==='function') showScreen('screen-setup');
  _hhClsToast('الحصة على صف '+code+' · اختر الفئات وابدأ','info');
}
async function hhClsArchive(code, arch){
  try{ await _hhClsDb().collection('classrooms').doc(code).update({active:!arch, archivedAt: arch?firebase.firestore.FieldValue.serverTimestamp():null});
    _hhCls.all.forEach(function(c){ if(c._code===code) c.active=!arch; }); _hhHubClasses=_hhCls.all.filter(function(c){ return c.active!==false; }); hhCampusRenderClasses(); _hhClsToast(arch?'أُرشف الصف':'استُعيد الصف','success');
  }catch(e){ _hhClsToast('تعذر: '+e.message,'error'); }
}
async function hhClsDelete(code){
  if(!confirm('حذف الصف '+code+' نهائياً مع سجلات طلابه؟')) return;
  try{ await _hhClsDb().collection('classrooms').doc(code).delete(); _hhCls.all=_hhCls.all.filter(function(c){ return c._code!==code; }); hhCampusRenderClasses(); _hhClsToast('حُذف الصف','success'); }catch(e){ _hhClsToast('تعذر الحذف: '+e.message,'error'); }
}

// ── الطلاب داخل البطاقة ──
function hhClsToggle(code){ _hhCls.open[code]=!_hhCls.open[code]; var f=document.getElementById('hh-cls-fold-'+code); if(!f) return; f.hidden=!_hhCls.open[code]; if(_hhCls.open[code]) hhClsLoadStudents(code); }
async function hhClsLoadStudents(code){
  var f=document.getElementById('hh-cls-fold-'+code); if(!f) return;
  f.innerHTML='<div class="hh-campus-sub">جارٍ تحميل الطلاب…</div>';
  try{
    var qs=await _hhClsDb().collection('classroom_students').where('classCode','==',code).where('active','==',true).get();
    var list=[]; qs.forEach(function(d){ var s=d.data(); s._id=d.id; list.push(s); });
    list.sort(function(a,b){ return String(a.studentName||'').localeCompare(String(b.studentName||''),'ar'); });
    _hhCls.students[code]=list; hhClsRenderStudents(code);
  }catch(e){ f.innerHTML='<div class="hh-campus-empty">تعذر تحميل الطلاب</div>'; }
}
function hhClsRenderStudents(code){
  var f=document.getElementById('hh-cls-fold-'+code); if(!f) return; var list=_hhCls.students[code]||[];
  var joined=list.filter(function(s){ return s.userId; }).length;
  f.innerHTML='<div class="hh-cls-tools">'
    +'<input id="hh-cls-add-'+code+'" type="text" placeholder="أضف طالباً بالاسم" onkeydown="if(event.key===\'Enter\')hhClsAddOne(\''+code+'\')">'
    +'<button type="button" class="hh-campus-btn-maroon" onclick="hhClsAddOne(\''+code+'\')">'+_hhClsSvg('plus',13)+' أضف</button>'
    +'<button type="button" class="hh-campus-btn-line" onclick="hhClsBulkOpen(\''+code+'\')">'+_hhClsSvg('file',13)+' من ملف Excel / قائمة</button>'
    +'<span class="hh-campus-sub" style="margin:0;">'+list.length+' طالباً · '+joined+' منضمون</span>'
    +'</div>'
    +'<div id="hh-cls-bulk-'+code+'"></div>'
    +(list.length?'<div class="hh-cls-list">'+list.map(function(s){ return '<div class="hh-cls-st"><span onclick="hhOpenStudentFile(\''+s._id+'\',\''+code+'\')" style="cursor:pointer;" title="افتح ملف الطالب">'+esc(s.studentName||'طالب')+(s.sid?' <small>'+esc(s.sid)+'</small>':'')+'</span><span class="hh-cls-st-r">'+(s.userId?'<span class="hh-campus-chip hh-cls-ok">منضم</span>':'<span class="hh-campus-chip">لم ينضم بعد</span>')+'<button type="button" class="hh-cls-ib" title="ملف الطالب" onclick="hhOpenStudentFile(\''+s._id+'\',\''+code+'\')" style="color:#8A6D2E;">↗</button><button type="button" class="hh-cls-ib" title="إزالة" onclick="hhClsRemove(\''+code+'\',\''+s._id+'\')">×</button></span></div>'; }).join('')+'</div>':'<div class="hh-campus-empty">لا طلاب بعد · أضفهم بالاسم أو من ملف Excel، أو شارك الرمز لينضموا بأنفسهم</div>');
}
async function hhClsAddOne(code){
  var i=document.getElementById('hh-cls-add-'+code); var name=(i.value||'').trim(); if(!name) return;
  await hhClsAddMany(code,[{name:name}]); i.value=''; i.focus();
}
function _hhClsMeta(code){ return _hhCls.all.filter(function(x){ return x._code===code; })[0]||{}; }
async function hhClsAddMany(code, rows){
  var c=_hhClsMeta(code); var db=_hhClsDb(); var existing={}; (_hhCls.students[code]||[]).forEach(function(s){ existing[(s.studentName||'').trim()]=1; });
  var fresh=rows.filter(function(r){ return r.name && !existing[r.name.trim()]; });
  if(!fresh.length){ _hhClsToast('كل الأسماء موجودة مسبقاً','info'); return; }
  try{
    for(var i=0;i<fresh.length;i+=400){
      var batch=db.batch();
      fresh.slice(i,i+400).forEach(function(r){ var ref=db.collection('classroom_students').doc(); batch.set(ref,{ classCode:code, className:c.className||'', schoolName:c.schoolName||'', teacherId:currentUser.uid, teacherName:c.teacherName||'', studentName:r.name.trim(), sid:r.sid||'', email:r.email||'', userId:null, active:true, addedAt:firebase.firestore.FieldValue.serverTimestamp() }); });
      await batch.commit();
    }
    await db.collection('classrooms').doc(code).update({studentCount: firebase.firestore.FieldValue.increment(fresh.length)});
    c.studentCount=(c.studentCount||0)+fresh.length;
    _hhClsToast('أُضيف '+arCountCls(fresh.length,'طالب واحد','طالبان','طلاب','طالباً'),'success');
    await hhClsLoadStudents(code); var card=document.getElementById('hh-cls-'+code); if(card){ var d=card.querySelector('.hh-campus-card-d'); if(d) d.innerHTML=(c.schoolName?esc(c.schoolName)+' · ':'')+arCountCls(c.studentCount,'طالب واحد','طالبان','طلاب','طالباً'); }
  }catch(e){ _hhClsToast('تعذرت الإضافة: '+e.message,'error'); }
}
async function hhClsRemove(code,id){
  if(!confirm('إزالة الطالب من الصف؟')) return;
  try{ await _hhClsDb().collection('classroom_students').doc(id).update({active:false}); await _hhClsDb().collection('classrooms').doc(code).update({studentCount: firebase.firestore.FieldValue.increment(-1)}); var c=_hhClsMeta(code); c.studentCount=Math.max(0,(c.studentCount||1)-1); hhClsLoadStudents(code); }catch(e){ _hhClsToast('تعذر: '+e.message,'error'); }
}

// ── الاستيراد الجماعي: لصق قائمة أو ملف CSV/TXT/Excel (xlsx عبر SheetJS يُحمَّل عند الحاجة) ──
function hhClsBulkOpen(code){
  var b=document.getElementById('hh-cls-bulk-'+code); if(!b) return; _hhCls.bulk={code:code, rows:[]};
  b.innerHTML='<div class="hh-cls-bulk">'
    +'<div class="hh-campus-card-t" style="font-size:.95rem;">إضافة جماعية · حتى مئات الطلاب دفعة واحدة</div>'
    +'<div class="hh-campus-card-d">ارفع ملف Excel أو CSV فيه عمود الأسماء (وأعمدة اختيارية: الرقم، البريد)، أو الصق الأسماء سطراً سطراً. الصف الأول إن كان عناوين يُتخطى تلقائياً.</div>'
    +'<div class="hh-cls-tools"><label class="hh-campus-btn-gold hh-cls-file">'+_hhClsSvg('file',13)+' اختر ملف Excel / CSV<input type="file" accept=".xlsx,.xls,.csv,.txt" onchange="hhClsBulkFile(this)" style="display:none;"></label><button type="button" class="hh-campus-btn-line" onclick="hhClsBulkTemplate()">قالب Excel</button></div>'
    +'<textarea id="hh-cls-bulk-txt" rows="5" placeholder="محمد الكواري&#10;علي المري&#10;خالد النعيمي" oninput="hhClsBulkPreview()"></textarea>'
    +'<div id="hh-cls-bulk-prev" class="hh-campus-sub" style="margin:6px 0;"></div>'
    +'<div class="hh-campus-card-btns" style="justify-content:flex-start;"><button type="button" class="hh-campus-btn-maroon" id="hh-cls-bulk-go" onclick="hhClsBulkCommit()" disabled>أضف الطلاب</button><button type="button" class="hh-campus-btn-line" onclick="document.getElementById(\'hh-cls-bulk-'+code+'\').innerHTML=\'\'">إغلاق</button></div>'
    +'</div>';
}
function _hhClsRowsFromMatrix(rows){
  var out=[]; var start=0;
  if(rows.length && /اسم|name|الطالب|student/i.test(String(rows[0].join(' ')))) start=1;
  for(var i=start;i<rows.length;i++){ var r=rows[i].map(function(x){ return String(x==null?'':x).trim(); }); var name=r[0]; if(!name) continue; var rec={name:name}; for(var k=1;k<r.length;k++){ var v=r[k]; if(!v) continue; if(/@/.test(v)&&!rec.email) rec.email=v.toLowerCase(); else if(/^\d{4,}$/.test(v)&&!rec.sid) rec.sid=v; } out.push(rec); }
  return out;
}
function hhClsBulkFile(inp){
  var f=inp.files&&inp.files[0]; if(!f) return;
  if(/\.xlsx?$/i.test(f.name)){
    _hhClsToast('جارٍ قراءة ملف Excel…','info');
    hhClsLoadSheetJS().then(function(){
      var r=new FileReader(); r.onload=function(e){ try{ var wb=XLSX.read(new Uint8Array(e.target.result),{type:'array'}); var ws=wb.Sheets[wb.SheetNames[0]]; var m=XLSX.utils.sheet_to_json(ws,{header:1,blankrows:false}); _hhCls.bulk.rows=_hhClsRowsFromMatrix(m); var ta=document.getElementById('hh-cls-bulk-txt'); if(ta) ta.value=_hhCls.bulk.rows.map(function(x){ return x.name+(x.sid?', '+x.sid:''); }).join('\n'); hhClsBulkPreview(true); }catch(err){ _hhClsToast('تعذرت قراءة الملف: '+err.message,'error'); } }; r.readAsArrayBuffer(f);
    }).catch(function(){ _hhClsToast('تعذر تحميل قارئ Excel · احفظ الملف بصيغة CSV وأعد المحاولة','error'); });
    return;
  }
  var rd=new FileReader(); rd.onload=function(e){ var ta=document.getElementById('hh-cls-bulk-txt'); if(ta) ta.value=String(e.target.result||''); hhClsBulkPreview(); }; rd.readAsText(f,'utf-8');
}
function hhClsLoadSheetJS(){
  if(window.XLSX) return Promise.resolve();
  return new Promise(function(res,rej){ var s=document.createElement('script'); s.src='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'; s.onload=res; s.onerror=rej; document.head.appendChild(s); });
}
function hhClsBulkPreview(fromFile){
  if(!fromFile){ var txt=(document.getElementById('hh-cls-bulk-txt')||{}).value||''; _hhCls.bulk.rows = (typeof hhParseStudentRows==='function') ? hhParseStudentRows(txt) : txt.split(/\r?\n/).map(function(l){ return {name:l.trim()}; }).filter(function(r){ return r.name; }); }
  var rows=_hhCls.bulk.rows; var code=_hhCls.bulk.code; var existing={}; (_hhCls.students[code]||[]).forEach(function(s){ existing[(s.studentName||'').trim()]=1; });
  var dups=rows.filter(function(r){ return existing[r.name.trim()]; }).length;
  var p=document.getElementById('hh-cls-bulk-prev'), go=document.getElementById('hh-cls-bulk-go'); if(!p) return;
  p.textContent = rows.length ? ('سيُضاف '+arCountCls(rows.length-dups,'طالب واحد','طالبان','طلاب','طالباً')+(dups?' · '+dups+' مكررون سيُتخطون':'')+' · أول الأسماء: '+rows.slice(0,3).map(function(r){ return r.name; }).join('، ')) : 'لم يُقرأ أي اسم بعد';
  if(go) go.disabled = !(rows.length-dups);
}
function hhClsBulkCommit(){ var code=_hhCls.bulk.code; hhClsAddMany(code,_hhCls.bulk.rows).then(function(){ var b=document.getElementById('hh-cls-bulk-'+code); if(b) b.innerHTML=''; }); }
function hhClsBulkTemplate(){ var csv='\ufeffاسم الطالب,الرقم,البريد\nمحمد الكواري,10234,\nعلي المري,10235,\n'; var a=document.createElement('a'); a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv); a.download='قالب_طلاب_الصف.csv'; a.click(); }
