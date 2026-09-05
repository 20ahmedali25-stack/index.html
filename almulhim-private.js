/* ============================================================
   المُلهم التعليمي — المسابقات الخاصة (zzzzzzj)
   ------------------------------------------------------------
   الأسئلة والصور لا تغادر السحابة إلا لمن صُرّح له:
     private_banks/{id}   : cat, meta, img, questions, allowed[emails]  (قراءة: المدير أو البريد المصرّح)
     private_access/{code}: نسخة مؤقتة لرمز فعالية بمهلة              (قراءة: من يعرف الرمز وقبل الانتهاء)
     platform_settings/private_comps : أسماء المسابقات الخاصة فقط      (قراءة عامة)
   التسجيل في المحرك يتم بعد المصادقة فقط، ولا تُحفظ الأسئلة الخاصة في admin_qdb ولا في localStorage.
   ============================================================ */
(function(){
'use strict';
var P={ list:[], loaded:{}, codeLoaded:{} };
window._hhPrivateCats=window._hhPrivateCats||new Set();
window._hhPrivateIds={};
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function toastX(m,k){ if(typeof toast==='function') toast(m,k||'info'); }
function db(){ return firebase.firestore(); }
function me(){ try{ return firebase.auth().currentUser; }catch(e){ return null; } }
function isAdm(){ return (typeof hhIsAdmin==='function' && hhIsAdmin()); }

/* ── التسجيل في المحرك ── */
function register(doc, source){
  var cat=doc.cat; var M=doc.meta||{}; var qs=(doc.questions||[]).map(function(q){ return {diff:q.diff,q:q.q,a:q.a,sub:q.sub,img:q.img}; });
  window._hhPrivateCats.add(cat);
  try{
    if(typeof CAT_INFO!=='undefined') CAT_INFO[cat]={emoji:'',label:M.label||cat,color:M.color||'#4A0B1E',bg:M.bg||'#F7ECEF'};
    if(typeof _HH_COMP_CATS!=='undefined') _HH_COMP_CATS.add(cat);
    if(typeof _HH_CHAR_COMPS!=='undefined'){ var ch=JSON.parse(JSON.stringify(M.char||{})); ch.img=doc.img||''; if(!ch.name1) ch.name1=M.label||cat; _HH_CHAR_COMPS[cat]=ch; try{ if(typeof _HH_COMP_DEFAULTS!=='undefined'&&_HH_COMP_DEFAULTS&&_HH_COMP_DEFAULTS.chars) _HH_COMP_DEFAULTS.chars[cat]=JSON.parse(JSON.stringify(ch)); }catch(e){} }
    if(typeof CAT_GROUPS!=='undefined' && !CAT_GROUPS.some(function(g){ return g.id===M.groupId; })){
      var icon=(M.groupIcon||'').replace('{IMG}', doc.img||'');
      CAT_GROUPS.push({ id:M.groupId||('priv_'+cat), label:M.groupLabel||M.label||cat, icon:icon, compSoloNote:M.compSoloNote||'', cats:[cat], private:true });
    }
    if(typeof CAT_LEVELS!=='undefined'){ CAT_LEVELS.forEach(function(l){ if(l.id==='competitions' && l.groupIds && l.groupIds.indexOf(M.groupId)===-1) l.groupIds.push(M.groupId); }); }
    if(typeof QDB==='object'){ QDB[cat]=qs; }
    if(typeof window.QDB_ORIGINAL==='object'&&window.QDB_ORIGINAL) window.QDB_ORIGINAL[cat]=JSON.parse(JSON.stringify(qs));
    if(typeof _HH_PARTNER_QUESTIONS==='object') _HH_PARTNER_QUESTIONS[cat]=qs;
    try{ var hid=JSON.parse(localStorage.getItem('hh_hidden_cats')||'[]'); if(hid.indexOf(cat)>-1) localStorage.setItem('hh_hidden_cats',JSON.stringify(hid.filter(function(c){return c!==cat;}))); }catch(e){}
  }catch(e){ console.warn('private register:', e); }
  P.loaded[cat]={id:doc.id, source:source||'grant'};
  try{ if(typeof buildCatSelect==='function' && document.getElementById('cat-select')) buildCatSelect(); }catch(e){}
  try{ if(typeof populateAQCatSelect==='function' && document.getElementById('aq-cat-select')) populateAQCatSelect(); }catch(e){}
}
function unregisterAll(){
  window._hhPrivateCats.forEach(function(cat){
    try{ if(typeof QDB==='object') delete QDB[cat]; if(window.QDB_ORIGINAL) delete window.QDB_ORIGINAL[cat]; if(typeof _HH_PARTNER_QUESTIONS==='object') delete _HH_PARTNER_QUESTIONS[cat];
      if(typeof CAT_INFO!=='undefined') delete CAT_INFO[cat]; if(typeof _HH_CHAR_COMPS!=='undefined') delete _HH_CHAR_COMPS[cat]; if(typeof _HH_COMP_CATS!=='undefined') _HH_COMP_CATS.delete(cat);
      if(typeof CAT_GROUPS!=='undefined'){ for(var i=CAT_GROUPS.length-1;i>=0;i--){ if(CAT_GROUPS[i].private && CAT_GROUPS[i].cats.indexOf(cat)>-1){ var gid=CAT_GROUPS[i].id; CAT_GROUPS.splice(i,1); if(typeof CAT_LEVELS!=='undefined') CAT_LEVELS.forEach(function(l){ if(l.groupIds) l.groupIds=l.groupIds.filter(function(x){return x!==gid;}); }); } } }
    }catch(e){}
  });
  window._hhPrivateCats.clear(); P.loaded={};
  try{ if(typeof buildCatSelect==='function' && document.getElementById('cat-select')) buildCatSelect(); }catch(e){}
}
// ستارة دفاعية: أي نسخة قديمة من هذه الفئات في admin_qdb أو الكاش المحلي تُزال ما لم تكن مصرّحاً
function scrub(){
  try{ var names=P.list.map(function(x){ return x.cat; }); names.forEach(function(cat){ if(P.loaded[cat]) return; if(typeof QDB==='object'&&QDB[cat]) delete QDB[cat]; if(window.QDB_ORIGINAL&&window.QDB_ORIGINAL[cat]) delete window.QDB_ORIGINAL[cat]; if(typeof CAT_INFO!=='undefined'&&CAT_INFO[cat]&&!P.loaded[cat]) delete CAT_INFO[cat]; }); }catch(e){}
}

/* ── التحميل ── */
async function loadList(){
  try{ var d=await db().collection('platform_settings').doc('private_comps').get(); P.list=(d.exists&&Array.isArray(d.data().items))?d.data().items:[]; }catch(e){ P.list=[]; }
  P.list.forEach(function(it){ window._hhPrivateIds[it.cat]=it.id; });
}
async function loadGranted(){
  var u=me(); if(!u) return;
  for(var i=0;i<P.list.length;i++){
    var it=P.list[i]; if(P.loaded[it.cat]) continue;
    try{ var d=await db().collection('private_banks').doc(it.id).get(); if(d.exists){ var doc=d.data(); doc.id=it.id; register(doc,'grant'); } }catch(e){ /* لا صلاحية: لا أثر */ }
  }
}
async function boot(){
  await loadList(); scrub();
  await loadGranted(); scrub();
  try{ firebase.auth().onAuthStateChanged(function(u){ if(u){ loadGranted().then(scrub); } else { unregisterAll(); scrub(); } }); }catch(e){}
  setTimeout(scrub, 3000); setTimeout(scrub, 8000);
  injectCodeButton(); injectAdminEntry();
}

/* ── رمز الفعالية ── */
window.hhPrivCode=async function(code){
  code=String(code||'').trim().toUpperCase(); if(!code){ return; }
  try{
    var d=await db().collection('private_access').doc(code).get();
    if(!d.exists){ toastX('الرمز غير صحيح أو انتهت مهلته','error'); return false; }
    var doc=d.data(); if((doc.until||0)<Date.now()){ toastX('انتهت مهلة هذا الرمز','error'); return false; }
    doc.id=doc.bankId; register(doc,'code'); toastX('فُتحت '+(doc.meta&&doc.meta.label||doc.cat)+' حتى '+new Date(doc.until).toLocaleString('en-GB'),'success');
    try{ if(typeof msRenderTabContent==='function'){ window._msActiveTab='competitions'; msRenderTabContent('competitions'); } }catch(e){}
    return true;
  }catch(e){ toastX('الرمز غير صحيح أو انتهت مهلته','error'); return false; }
};
function injectCodeButton(){
  var tries=0; var iv=setInterval(function(){
    tries++; var grid=document.getElementById('ms-cat-grid'); var tabs=document.querySelector('#cat-select .ms-tabs, #cat-select [data-tab="competitions"]');
    var host=document.getElementById('cat-select'); if(!host){ if(tries>40) clearInterval(iv); return; }
    if(document.getElementById('hh-priv-code-btn')){ clearInterval(iv); return; }
    var b=document.createElement('button'); b.id='hh-priv-code-btn'; b.type='button';
    b.style.cssText='position:fixed;bottom:14px;left:14px;z-index:60;background:linear-gradient(135deg,#4A0B1E,#5E0E26);color:#EAD9B0;border:1.5px solid #B8924A;border-radius:12px;padding:8px 14px;font-family:Cairo;font-weight:800;font-size:.74rem;cursor:pointer;display:none;';
    b.textContent='لديّ رمز فعالية';
    b.onclick=function(){ var w=document.getElementById('hh-priv-code-wrap'); if(w){ w.remove(); return; } var d=document.createElement('div'); d.id='hh-priv-code-wrap'; d.style.cssText='position:fixed;bottom:56px;left:14px;z-index:61;background:#FFFDF8;border:1.5px solid #B8924A;border-radius:12px;padding:10px;display:flex;gap:6px;direction:rtl;font-family:Cairo;'; d.innerHTML='<input id="hh-priv-code-in" placeholder="رمز الفعالية" maxlength="10" style="border:1.5px solid #B8924A;border-radius:9px;padding:7px 10px;font-family:Cairo;letter-spacing:2px;text-transform:uppercase;width:140px;"><button style="background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;border-radius:9px;padding:7px 12px;font-family:Cairo;font-weight:900;cursor:pointer;">فتح</button>'; d.querySelector('button').onclick=function(){ hhPrivCode(document.getElementById('hh-priv-code-in').value).then(function(ok){ if(ok) d.remove(); }); }; d.querySelector('input').addEventListener('keydown',function(e){ if(e.key==='Enter') d.querySelector('button').click(); }); document.body.appendChild(d); d.querySelector('input').focus(); };
    document.body.appendChild(b);
    // يظهر فقط عندما تكون شاشة الاختيار ظاهرة
    setInterval(function(){ var cs=document.getElementById('cat-select'); var vis=cs && cs.offsetParent!==null && cs.style.display!=='none'; b.style.display=vis?'block':'none'; },800);
    clearInterval(iv);
  },500);
}

/* ── ربط محرر الأسئلة: حفظ الفئات الخاصة في السحابة الخاصة فقط ── */
window.hhPrivSaveCat=async function(cat){
  if(!isAdm()) return false; var id=window._hhPrivateIds[cat]||(P.loaded[cat]&&P.loaded[cat].id); if(!id) return false;
  try{ await db().collection('private_banks').doc(id).set({questions:(QDB[cat]||[]).map(function(q){ var o={diff:q.diff,q:q.q,a:q.a}; if(q.sub!==undefined) o.sub=q.sub; if(q.img) o.img=q.img; return o; }), updatedAt:Date.now()},{merge:true}); toastX('حُفظت الفئة الخاصة في السحابة الخاصة','success'); return true; }
  catch(e){ toastX('تعذر حفظ الفئة الخاصة · '+((e&&e.code)||''),'error'); return true; }
};
try{
  var _origPersist=window.saveAdminQuestion_persist;
  if(typeof _origPersist==='function'){ window.saveAdminQuestion_persist=function(cat){ if(window._hhPrivateCats.has(cat)){ hhPrivSaveCat(cat); return; } return _origPersist.apply(this,arguments); }; }
}catch(e){}

/* ── لوحة إدارة المسابقات الخاصة (المدير فقط) ── */
function injectAdminEntry(){
  var tries=0; var iv=setInterval(function(){ tries++; if(tries>30){ clearInterval(iv); return; } if(!isAdm()) return; if(document.getElementById('hh-priv-admin-btn')){ clearInterval(iv); return; }
    var ref=document.getElementById('hh-ib-entry')||document.querySelector('.hh-crown-btn[onclick="hhOpenLeaderPrograms()"]'); if(!ref) return;
    var b=document.createElement('button'); b.className='hh-crown-btn'; b.id='hh-priv-admin-btn'; b.setAttribute('onclick','hhPrivAdmin()'); b.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg><span>المسابقات الخاصة</span>'; ref.insertAdjacentElement('afterend',b); clearInterval(iv); },1000);
}
function box(title, html, id){
  var old=document.getElementById(id); if(old) old.remove();
  var ov=document.createElement('div'); ov.id=id; ov.style.cssText='position:fixed;inset:0;background:rgba(42,8,16,.82);z-index:99996;overflow-y:auto;direction:rtl;font-family:Cairo,sans-serif;padding:16px;';
  ov.innerHTML='<div style="max-width:760px;margin:0 auto;background:linear-gradient(180deg,#FFFDF8,#FBF5E9);border:2px solid #B8924A;border-radius:20px;overflow:hidden;"><div style="background:linear-gradient(120deg,#2a0810,#5E0E26);padding:13px 18px;display:flex;align-items:center;gap:12px;border-bottom:2px solid #B8924A;"><b style="color:#FFFDF8;font-size:1rem;flex:1;">'+esc(title)+'</b><button onclick="document.getElementById(\''+id+'\').remove()" style="background:rgba(212,188,133,.15);border:1px solid #B8924A;border-radius:9px;width:34px;height:34px;color:#F5E6C4;cursor:pointer;">✕</button></div><div style="padding:16px 18px;color:#3D0918;">'+html+'</div></div>';
  ov.addEventListener('click',function(e){ if(e.target===ov) ov.remove(); }); document.body.appendChild(ov); return ov;
}
var _btn='font-family:Cairo;font-weight:900;border-radius:10px;padding:8px 14px;cursor:pointer;font-size:.76rem;';
window.hhPrivAdmin=async function(){
  if(!isAdm()){ toastX('للمدير فقط','error'); return; }
  await loadList();
  var docs=[]; for(var i=0;i<P.list.length;i++){ try{ var d=await db().collection('private_banks').doc(P.list[i].id).get(); if(d.exists){ var x=d.data(); x.id=P.list[i].id; docs.push(x); } }catch(e){} }
  var codes=[]; try{ var qs=await db().collection('private_access').get(); qs.forEach(function(d){ var c=d.data(); c.code=d.id; codes.push(c); }); }catch(e){}
  var html='<div style="background:#F7ECEF;border:1px solid #E4C4CC;border-radius:11px;padding:10px 13px;margin-bottom:12px;font-size:.72rem;color:#8A1538;font-weight:700;line-height:1.7;">الأسئلة والصور محفوظة في السحابة الخاصة فقط. لا يراها ولا يستطيع تحميلها إلا المدير والبريد المصرّح، أو حامل رمز فعالية سارٍ.</div>';
  if(!docs.length) html+='<div style="text-align:center;padding:14px;color:#8A6D2E;font-weight:800;">لا مسابقات خاصة بعد. استورد ملف الترحيل أدناه.</div>';
  docs.forEach(function(d){
    var allowed=d.allowed||[]; var myCodes=codes.filter(function(c){ return c.bankId===d.id; });
    html+='<div style="border:1.5px solid #B8924A;border-radius:14px;padding:12px 14px;margin-bottom:12px;background:#fff;">'
      +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;"><div style="width:44px;height:44px;border-radius:10px;overflow:hidden;background:#4A0B1E;flex-shrink:0;">'+(d.img?'<img src="'+esc(d.img)+'" style="width:100%;height:100%;object-fit:cover;">':'')+'</div><div style="flex:1;"><b>'+esc(d.meta&&d.meta.label||d.cat)+'</b><div style="font-size:.66rem;color:#8A7A63;font-weight:700;">'+(d.questions||[]).length+' سؤالاً · '+allowed.length+' مصرّح · '+myCodes.filter(function(c){return c.until>Date.now();}).length+' رمز سارٍ</div></div></div>'
      +'<div style="font-size:.72rem;font-weight:800;color:#5E0E26;margin:6px 0 4px;">البريد المصرّح</div><div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px;">'+allowed.map(function(em){ return '<span style="background:#FDF3DD;border:1px solid #EAD9B0;border-radius:99px;padding:3px 10px;font-size:.68rem;font-weight:800;" dir="ltr">'+esc(em)+' <a href="#" onclick="hhPrivRemoveEmail(\''+esc(d.id)+'\',\''+esc(em)+'\');return false;" style="color:#c0392b;text-decoration:none;">✕</a></span>'; }).join('')+(allowed.length?'':'<span style="font-size:.66rem;color:#8A7A63;">لا أحد سوى المدير</span>')+'</div>'
      +'<div style="display:flex;gap:6px;margin-bottom:10px;"><input id="pv-em-'+esc(d.id)+'" type="email" placeholder="بريد Google للمصرّح له" style="flex:1;border:1.5px solid #B8924A;border-radius:9px;padding:7px 10px;font-family:Cairo;font-size:.78rem;" dir="ltr"><button style="'+_btn+'background:linear-gradient(135deg,#3D6B53,#2C5340);color:#fff;border:none;" onclick="hhPrivAddEmail(\''+esc(d.id)+'\')">إضافة</button></div>'
      +'<div style="font-size:.72rem;font-weight:800;color:#5E0E26;margin:6px 0 4px;">رموز الفعاليات</div>'+(myCodes.length?myCodes.sort(function(a,b){return b.until-a.until;}).map(function(c){ var live=c.until>Date.now(); return '<div style="display:flex;align-items:center;gap:8px;font-size:.72rem;font-weight:800;padding:4px 0;border-bottom:1px solid #EFE6D3;"><b dir="ltr" style="letter-spacing:2px;">'+esc(c.code)+'</b><span style="color:'+(live?'#2C5340':'#8a7a63')+';">'+(live?'سارٍ حتى ':'انتهى ')+new Date(c.until).toLocaleString('en-GB')+'</span><span style="flex:1;"></span><button style="'+_btn+'background:#fff;border:1px solid #c0392b;color:#c0392b;padding:4px 10px;" onclick="hhPrivDelCode(\''+esc(c.code)+'\')">حذف</button></div>'; }).join(''):'<div style="font-size:.66rem;color:#8A7A63;">لا رموز</div>')
      +'<div style="display:flex;gap:6px;margin-top:8px;align-items:center;"><select id="pv-h-'+esc(d.id)+'" style="border:1.5px solid #B8924A;border-radius:9px;padding:7px;font-family:Cairo;font-size:.76rem;"><option value="6">6 ساعات</option><option value="24" selected>24 ساعة</option><option value="72">3 أيام</option><option value="168">أسبوع</option></select><button style="'+_btn+'background:linear-gradient(135deg,#EAD9B0,#B8924A);color:#2a0810;border:none;" onclick="hhPrivNewCode(\''+esc(d.id)+'\')">إنشاء رمز فعالية</button><span style="font-size:.64rem;color:#8A7A63;font-weight:700;">للمقدّم بلا حساب، ينتهي تلقائياً</span></div>'
      +'</div>';
  });
  html+='<div style="border:1.5px dashed #B8924A;border-radius:14px;padding:12px 14px;background:#FDF8EC;"><b style="font-size:.82rem;">ترحيل أو استيراد</b><div style="font-size:.68rem;color:#8A7A63;font-weight:700;line-height:1.7;margin:4px 0 8px;">اختر ملف <b dir="ltr">private-banks-export.json</b> المسلَّم لك. يُكتب في السحابة الخاصة، وتُسجَّل الأسماء في الإعدادات، وتُنظَّف نسخها القديمة من admin_qdb.</div><input type="file" id="pv-file" accept="application/json" style="font-family:Cairo;font-size:.74rem;"> <button style="'+_btn+'background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;" onclick="hhPrivImport()">استيراد</button></div>';
  box('المسابقات الخاصة · إدارة الصلاحيات', html, 'hh-priv-admin');
};
window.hhPrivAddEmail=async function(id){ var em=(document.getElementById('pv-em-'+id).value||'').trim().toLowerCase(); if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){ toastX('بريد غير صحيح','error'); return; } try{ await db().collection('private_banks').doc(id).set({allowed:firebase.firestore.FieldValue.arrayUnion(em)},{merge:true}); toastX('أُضيف '+em,'success'); hhPrivAdmin(); }catch(e){ toastX('تعذر','error'); } };
window.hhPrivRemoveEmail=async function(id,em){ try{ await db().collection('private_banks').doc(id).set({allowed:firebase.firestore.FieldValue.arrayRemove(em)},{merge:true}); hhPrivAdmin(); }catch(e){ toastX('تعذر','error'); } };
window.hhPrivNewCode=async function(id){
  var h=parseInt((document.getElementById('pv-h-'+id)||{}).value||'24',10); var A='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; var code=''; for(var i=0;i<8;i++) code+=A[Math.floor(Math.random()*A.length)];
  try{ var d=await db().collection('private_banks').doc(id).get(); if(!d.exists) return; var src=d.data();
    await db().collection('private_access').doc(code).set({bankId:id, cat:src.cat, meta:src.meta, img:src.img||'', questions:src.questions||[], until:Date.now()+h*3600000, createdAt:Date.now()});
    toastX('الرمز: '+code+' · سارٍ '+h+' ساعة','success'); hhPrivAdmin(); }catch(e){ toastX('تعذر إنشاء الرمز','error'); }
};
window.hhPrivDelCode=async function(code){ try{ await db().collection('private_access').doc(code).delete(); hhPrivAdmin(); }catch(e){ toastX('تعذر','error'); } };
window.hhPrivImport=function(){
  var f=document.getElementById('pv-file').files[0]; if(!f){ toastX('اختر الملف أولاً','info'); return; }
  var r=new FileReader(); r.onload=async function(){
    try{
      var data=JSON.parse(r.result); var items=[]; var ids=Object.keys(data);
      for(var i=0;i<ids.length;i++){ var id=ids[i]; var d=data[id]; d.allowed=d.allowed||[]; d.updatedAt=Date.now(); await db().collection('private_banks').doc(id).set(d,{merge:true}); items.push({id:id, cat:d.cat}); }
      await db().collection('platform_settings').doc('private_comps').set({items:items, updatedAt:Date.now()},{merge:true});
      // تنظيف النسخ القديمة من الفئات العامة والكاش المحلي
      try{ items.forEach(function(it){ if(typeof QDB==='object') delete QDB[it.cat]; }); if(typeof saveQDBToCloud==='function') await saveQDBToCloud(); }catch(e){}
      try{ var cc=JSON.parse(localStorage.getItem('hh_custom_cats')||'{}'); items.forEach(function(it){ delete cc[it.cat]; }); localStorage.setItem('hh_custom_cats',JSON.stringify(cc)); }catch(e){}
      P.list=items; P.loaded={}; await loadGranted(); toastX('اكتمل الترحيل: '+items.length+' مسابقة خاصة','success'); hhPrivAdmin();
    }catch(e){ toastX('تعذر الاستيراد · '+((e&&e.message)||''),'error'); }
  }; r.readAsText(f);
};

window._hhPrivState=P;
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(boot,300); }); else setTimeout(boot,300);
})();
