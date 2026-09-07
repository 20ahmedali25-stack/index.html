/* ============================================================
   المُلهم التعليمي — سجلّ المراجعة الإداري (zzzzzzq)
   ------------------------------------------------------------
   يسجّل أهم الإجراءات الإدارية (من فعل ماذا ومتى) في admin_audit
   طبقة مستقلة تماماً: لا تمسّ لوحة التحكم القائمة، تُغلّف الدوال بالمرجع
   القراءة والكتابة للمدير فقط (قاعدة Firestore)
   ============================================================ */
(function(){
'use strict';
if(window._hhAuditInit) return; window._hhAuditInit=true;
function db(){ return firebase.firestore(); }
function me(){ try{ return firebase.auth().currentUser; }catch(e){ return null; } }
function isAdm(){ return (typeof hhIsAdmin==='function' && hhIsAdmin()); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function toastX(m,k){ if(typeof toast==='function') toast(m,k||'info'); }

// كتابة سطر في السجلّ (صامتة، لا تعطّل شيئاً إن فشلت)
function log(action, detail){
  try{
    if(!isAdm()) return; var u=me(); if(!u) return;
    db().collection('admin_audit').add({ action:action, detail:(detail||'').slice(0,300), by:u.email||u.uid, uid:u.uid, at:Date.now() }).catch(function(){});
  }catch(e){}
}
window.hhAudit=log;

// تغليف الدوال الحساسة بالمرجع (تعمل كما هي ثم تسجّل)
function wrap(name, describe){
  try{
    var orig=window[name]; if(typeof orig!=='function' || orig._audited) return;
    var w=function(){ var r=orig.apply(this, arguments); try{ log(name, describe.apply(null, arguments)); }catch(e){} return r; };
    w._audited=true; window[name]=w;
  }catch(e){}
}
function installWraps(){
  wrap('saveAdminQuestion', function(){ return 'حفظ/تعديل سؤال'; });
  wrap('deleteAdminQuestion', function(i){ return 'حذف سؤال #'+i; });
  wrap('adminDeleteUser', function(id){ return 'حذف مستخدم '+(id||''); });
  wrap('adminDeleteReview', function(id){ return 'حذف تقييم '+(id||''); });
  wrap('hhPrivAddEmail', function(id){ return 'منح صلاحية مسابقة خاصة '+(id||''); });
  wrap('hhPrivRemoveEmail', function(id,em){ return 'سحب صلاحية '+(em||'')+' من '+(id||''); });
  wrap('hhPrivNewCode', function(id){ return 'إنشاء رمز فعالية لـ '+(id||''); });
  wrap('hhPgSave', function(){ return 'حفظ برنامج تربوي'; });
  wrap('hhPgDelete', function(id){ return 'حذف برنامج '+(id||''); });
}

// لوحة عرض السجلّ (زر يُحقن بجانب المسابقات الخاصة)
var _b='font-family:Cairo;font-weight:900;border-radius:10px;padding:8px 14px;cursor:pointer;font-size:.76rem;';
window.hhAuditPanel=async function(){
  if(!isAdm()){ toastX('للمدير فقط','error'); return; }
  var rows=[];
  try{ var qs=await db().collection('admin_audit').orderBy('at','desc').limit(200).get(); qs.forEach(function(d){ rows.push(d.data()); }); }
  catch(e){ try{ var qs2=await db().collection('admin_audit').limit(200).get(); qs2.forEach(function(d){ rows.push(d.data()); }); rows.sort(function(a,b){ return (b.at||0)-(a.at||0); }); }catch(e2){ toastX('تعذّر تحميل السجلّ · '+((e2&&e2.code)||''),'error'); return; } }
  var body=rows.length? '<div style="max-height:60vh;overflow-y:auto;">'+rows.map(function(r){
    return '<div style="display:flex;align-items:center;gap:10px;padding:9px 12px;border:1px solid #EAE0CA;border-radius:11px;margin-bottom:6px;background:#fff;font-size:.76rem;">'
      +'<div style="width:8px;height:8px;border-radius:50%;background:#8A6D2E;flex-shrink:0;"></div>'
      +'<div style="flex:1;min-width:0;"><b style="color:#3D0918;">'+esc(r.detail||r.action)+'</b><div style="color:#8A7A63;font-size:.64rem;font-weight:700;">'+esc(r.by||'')+'</div></div>'
      +'<span style="color:#8A6D2E;font-size:.66rem;font-weight:700;white-space:nowrap;">'+(r.at?new Date(r.at).toLocaleString('en-GB'):'')+'</span></div>';
  }).join('')+'</div>' : '<div style="text-align:center;padding:22px;color:#8A6D2E;font-weight:800;">لا إجراءات مسجّلة بعد.<br><span style="font-size:.7rem;color:#8A7A63;">يبدأ التسجيل من الآن مع كل تعديل أو حذف تقوم به.</span></div>';
  var head='<div style="background:#F7ECEF;border:1px solid #E4C4CC;border-radius:11px;padding:10px 13px;margin-bottom:12px;font-size:.72rem;color:#8A1538;font-weight:700;line-height:1.7;">سجلّ يوثّق أهم الإجراءات الإدارية: من عدّل أو حذف ماذا ومتى. للمراجعة والشفافية، ومفيد لتوثيق البحث.</div>';
  var ov=document.createElement('div'); ov.id='hh-audit-ov'; ov.style.cssText='position:fixed;inset:0;background:rgba(42,8,16,.82);z-index:99996;overflow-y:auto;direction:rtl;font-family:Cairo,sans-serif;padding:16px;';
  ov.innerHTML='<div style="max-width:640px;margin:0 auto;background:linear-gradient(180deg,#FFFDF8,#FBF5E9);border:2px solid #B8924A;border-radius:20px;overflow:hidden;"><div style="background:linear-gradient(120deg,#2a0810,#5E0E26);padding:13px 18px;display:flex;align-items:center;gap:12px;border-bottom:2px solid #B8924A;"><b style="color:#FFFDF8;font-size:1rem;flex:1;">سجلّ المراجعة · '+rows.length+' إجراء</b><button onclick="document.getElementById(\'hh-audit-ov\').remove()" style="background:rgba(212,188,133,.15);border:1px solid #B8924A;border-radius:9px;width:34px;height:34px;color:#F5E6C4;cursor:pointer;">✕</button></div><div style="padding:16px 18px;color:#3D0918;">'+head+body+'</div></div>';
  ov.addEventListener('click',function(e){ if(e.target===ov) ov.remove(); }); document.body.appendChild(ov);
};
function injectBtn(){
  var tries=0; var iv=setInterval(function(){ tries++; if(tries>30){ clearInterval(iv); return; } if(!isAdm()) return; if(document.getElementById('hh-audit-btn')){ clearInterval(iv); return; }
    var ref=document.getElementById('hh-priv-admin-btn')||document.getElementById('hh-ib-entry'); if(!ref) return;
    var b=document.createElement('button'); b.className='hh-crown-btn'; b.id='hh-audit-btn'; b.setAttribute('onclick','hhAuditPanel()'); b.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg><span>سجلّ المراجعة</span>'; ref.insertAdjacentElement('afterend',b); clearInterval(iv); },1000);
}

setTimeout(installWraps, 2500); setTimeout(installWraps, 6000);
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', injectBtn); else injectBtn();
})();
