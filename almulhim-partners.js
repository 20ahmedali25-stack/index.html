/* ============================================================
   المُلهم التعليمي — إدارة الشركاء (zzzzzzal)
   ------------------------------------------------------------
   تحكم كامل بالشركاء من لوحة الإدارة:
   تعديل المسمّى (صديق → أي مسمّى) · إضافة · تعديل · حذف · إخفاء · ترتيب
   يُحفظ في platform_settings/partners ويُطبّق على العرض دون لمس index.html
   ============================================================ */
(function(){
'use strict';
if(window._hhPartnersAdminInit) return; window._hhPartnersAdminInit=true;
function db(){ return firebase.firestore(); }
function isAdm(){ return (typeof hhIsAdmin==='function' && hhIsAdmin()); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function toastX(m,k){ if(typeof toast==='function') toast(m,k||'info'); }

var _data=null; // {tiers:[{id,name,tag,color,visible,partners:[{name,desc,instagram,color,hidden}]}]}

// القيم الافتراضية (تُقرأ من الإعداد الحالي إن وُجد، وإلا من هذه)
function defaults(){
  return { tiers:[
    { id:'platinum', name:'شريك مميز', tag:'استراتيجي', color:'platinum', visible:true, partners:[] },
    { id:'gold', name:'شريك داعم', tag:'داعم', color:'gold', visible:true, partners:[] },
    { id:'friend', name:'صديق المنصة', tag:'صديق', color:'green', visible:true, partners:[
      { name:'مركز أجيال التربوي', desc:'شريك تربوي', instagram:'', color:'#8A1538', hidden:false },
      { name:'بيرف آب', desc:'شريك صديق', instagram:'perfup', color:'#1b3a5c', hidden:false },
      { name:'طموح للتنمية المجتمعية', desc:'شريك صديق', instagram:'', color:'#3D6B53', hidden:false }
    ] }
  ] };
}

async function load(){
  try{ var d=await db().collection('platform_settings').doc('partners').get();
    if(d.exists && d.data().tiers){ _data=d.data(); return; } }catch(e){}
  _data=defaults();
}
async function save(){
  _data.updatedAt=Date.now();
  try{ await db().collection('platform_settings').doc('partners').set(_data,{merge:false});
    try{ if(typeof hhAudit==='function') hhAudit('partners_edit','تعديل بيانات الشركاء'); }catch(e){}
    toastX('حُفظت بيانات الشركاء','success'); return true; }
  catch(e){ toastX('تعذر الحفظ · '+((e&&e.code)||''),'error'); return false; }
}

var _b='font-family:Cairo;font-weight:900;border-radius:9px;cursor:pointer;font-size:.74rem;';
window.hhPartnersAdmin=async function(){
  if(!isAdm()){ toastX('للمدير فقط','error'); return; }
  await load(); render();
};
function render(){
  var old=document.getElementById('hh-partners-admin'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-partners-admin';
  ov.style.cssText='position:fixed;inset:0;background:rgba(42,8,16,.82);z-index:99996;overflow-y:auto;direction:rtl;font-family:Cairo,sans-serif;padding:16px;';
  var body='<div style="background:#F7ECEF;border:1px solid #E4C4CC;border-radius:11px;padding:10px 13px;margin-bottom:12px;font-size:.72rem;color:#8A1538;font-weight:700;line-height:1.7;">عدّل مسمّى كل فئة (مثل «صديق»)، وأضف الشركاء وعدّلهم واحذفهم وأخفهم ورتّبهم. كل تغيير يُحفظ ويظهر في صفحة الشركاء.</div>';
  (_data.tiers||[]).forEach(function(t,ti){
    body+='<div style="border:1.5px solid #B8924A;border-radius:14px;padding:12px 14px;margin-bottom:12px;background:#fff;">'
      +'<div style="display:flex;gap:8px;align-items:center;margin-bottom:10px;">'
      +'<span style="width:12px;height:12px;border-radius:50%;background:'+(t.color==='platinum'?'#8A8A8A':t.color==='gold'?'#B8924A':'#3D6B53')+';"></span>'
      +'<input value="'+esc(t.name)+'" onchange="hhPtSetTierName('+ti+',this.value)" style="flex:1;border:1.5px solid #B8924A;border-radius:8px;padding:7px 10px;font-family:Cairo;font-weight:900;font-size:.85rem;color:#5E0E26;">'
      +'<label style="font-size:.7rem;font-weight:800;display:flex;align-items:center;gap:4px;cursor:pointer;"><input type="checkbox" '+(t.visible!==false?'checked':'')+' onchange="hhPtSetTierVis('+ti+',this.checked)"> ظاهرة</label>'
      +'</div>';
    // partners in this tier
    (t.partners||[]).forEach(function(p,pi){
      body+='<div style="display:flex;gap:6px;align-items:center;margin-bottom:6px;background:'+(p.hidden?'#F3EDED':'#FBF7F0')+';border:1px solid #EAE0CA;border-radius:10px;padding:7px 9px;">'
        +'<div style="display:flex;flex-direction:column;gap:2px;">'
        +'<button onclick="hhPtMove('+ti+','+pi+',-1)" style="'+_b+'background:#fff;border:1px solid #B8924A;color:#8A6D2E;width:22px;height:18px;line-height:1;padding:0;" title="أعلى">▲</button>'
        +'<button onclick="hhPtMove('+ti+','+pi+',1)" style="'+_b+'background:#fff;border:1px solid #B8924A;color:#8A6D2E;width:22px;height:18px;line-height:1;padding:0;" title="أسفل">▼</button>'
        +'</div>'
        +'<div style="flex:1;display:grid;grid-template-columns:1fr 1fr;gap:5px;">'
        +'<input value="'+esc(p.name)+'" placeholder="اسم الشريك" onchange="hhPtSetP('+ti+','+pi+',\'name\',this.value)" style="border:1.5px solid #B8924A;border-radius:8px;padding:6px 9px;font-family:Cairo;font-weight:800;font-size:.78rem;">'
        +'<input value="'+esc(p.desc||'')+'" placeholder="الوصف/المسمّى" onchange="hhPtSetP('+ti+','+pi+',\'desc\',this.value)" style="border:1.5px solid #B8924A;border-radius:8px;padding:6px 9px;font-family:Cairo;font-weight:700;font-size:.74rem;">'
        +'<input value="'+esc(p.instagram||'')+'" placeholder="إنستغرام (اختياري)" onchange="hhPtSetP('+ti+','+pi+',\'instagram\',this.value)" style="border:1.5px solid #B8924A;border-radius:8px;padding:6px 9px;font-family:Cairo;font-size:.72rem;" dir="ltr">'
        +'<input type="color" value="'+esc(p.color||'#8A1538')+'" onchange="hhPtSetP('+ti+','+pi+',\'color\',this.value)" style="border:1.5px solid #B8924A;border-radius:8px;height:32px;cursor:pointer;">'
        +'</div>'
        +'<div style="display:flex;flex-direction:column;gap:3px;">'
        +'<button onclick="hhPtToggleHide('+ti+','+pi+')" style="'+_b+'background:#fff;border:1px solid #8A6D2E;color:#8A6D2E;padding:3px 8px;">'+(p.hidden?'إظهار':'إخفاء')+'</button>'
        +'<button onclick="hhPtDelP('+ti+','+pi+')" style="'+_b+'background:#fff;border:1px solid #c0392b;color:#c0392b;padding:3px 8px;">حذف</button>'
        +'</div></div>';
    });
    body+='<button onclick="hhPtAddP('+ti+')" style="'+_b+'background:linear-gradient(135deg,#3D6B53,#2C5340);color:#fff;border:none;padding:7px 14px;margin-top:4px;">+ شريك في «'+esc(t.name)+'»</button>';
    body+='</div>';
  });
  body+='<div style="display:flex;gap:8px;justify-content:flex-start;position:sticky;bottom:0;background:linear-gradient(180deg,transparent,#FBF5E9 40%);padding-top:10px;">'
    +'<button onclick="hhPtSave()" style="'+_b+'background:linear-gradient(135deg,#3D6B53,#2C5340);color:#fff;border:none;padding:11px 24px;font-size:.85rem;">حفظ كل التغييرات</button>'
    +'<button onclick="document.getElementById(\'hh-partners-admin\').remove()" style="'+_b+'background:#fff;border:1.5px solid #B8924A;color:#8A6D2E;padding:11px 20px;">إغلاق</button></div>';
  ov.innerHTML='<div style="max-width:720px;margin:0 auto;background:linear-gradient(180deg,#FFFDF8,#FBF5E9);border:2px solid #B8924A;border-radius:20px;overflow:hidden;"><div style="background:linear-gradient(120deg,#2a0810,#5E0E26);padding:13px 18px;display:flex;align-items:center;gap:12px;border-bottom:2px solid #B8924A;"><b style="color:#FFFDF8;font-size:1rem;flex:1;">إدارة الشركاء</b><button onclick="document.getElementById(\'hh-partners-admin\').remove()" style="background:rgba(212,188,133,.15);border:1px solid #B8924A;border-radius:9px;width:34px;height:34px;color:#F5E6C4;cursor:pointer;">✕</button></div><div style="padding:16px 18px;color:#3D0918;">'+body+'</div></div>';
  ov.addEventListener('click',function(e){ if(e.target===ov) ov.remove(); });
  document.body.appendChild(ov);
}
// mutations
window.hhPtSetTierName=function(ti,v){ _data.tiers[ti].name=v; };
window.hhPtSetTierVis=function(ti,v){ _data.tiers[ti].visible=v; };
window.hhPtSetP=function(ti,pi,f,v){ _data.tiers[ti].partners[pi][f]=v; };
window.hhPtToggleHide=function(ti,pi){ var p=_data.tiers[ti].partners[pi]; p.hidden=!p.hidden; render(); };
window.hhPtDelP=function(ti,pi){ if(!confirm('حذف هذا الشريك؟')) return; _data.tiers[ti].partners.splice(pi,1); render(); };
window.hhPtAddP=function(ti){ _data.tiers[ti].partners=_data.tiers[ti].partners||[]; _data.tiers[ti].partners.push({name:'شريك جديد',desc:'',instagram:'',color:'#8A1538',hidden:false}); render(); };
window.hhPtMove=function(ti,pi,dir){ var a=_data.tiers[ti].partners; var ni=pi+dir; if(ni<0||ni>=a.length) return; var tmp=a[pi]; a[pi]=a[ni]; a[ni]=tmp; render(); };
window.hhPtSave=async function(){ if(await save()){ /* keep open */ } };

// حقن زر في لوحة التحكم بجانب أزرار الإدارة
function injectBtn(){
  var tries=0; var iv=setInterval(function(){ tries++; if(tries>30){ clearInterval(iv); return; } if(!isAdm()) return; if(document.getElementById('hh-partners-admin-btn')){ clearInterval(iv); return; }
    var ref=document.getElementById('hh-audit-btn')||document.getElementById('hh-priv-admin-btn')||document.getElementById('hh-ib-entry'); if(!ref) return;
    var b=document.createElement('button'); b.className='hh-crown-btn'; b.id='hh-partners-admin-btn'; b.setAttribute('onclick','hhPartnersAdmin()'); b.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg><span>إدارة الشركاء</span>'; ref.insertAdjacentElement('afterend',b); clearInterval(iv); },1000);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', injectBtn); else injectBtn();
})();
