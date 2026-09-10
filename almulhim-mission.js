/* ============================================================
   المُلهم التعليمي — صفحة رسالتنا وقيمنا (zzzzzzae)
   ------------------------------------------------------------
   صفحة تعرّف بروح المنصة الأخلاقية · تُفتح كطبقة مستقلة
   لا تمسّ بنية المنصة · زر «رسالتنا» يُحقن في الشريط
   ============================================================ */
(function(){
'use strict';
if(window._hhMissionInit) return; window._hhMissionInit=true;
var GD='linear-gradient';
window.hhMissionOpen=function(){
  if(document.getElementById('hh-mission-ov')) return;
  var ov=document.createElement('div'); ov.id='hh-mission-ov';
  ov.style.cssText='position:fixed;inset:0;z-index:99995;background:#F3EFE6;overflow-y:auto;direction:rtl;font-family:Cairo,sans-serif;';
  var C={m:'#4A0B1E',m2:'#5E0E26',r:'#8A1538',g:'#B8924A',g2:'#EAD9B0',iv:'#FFFDF8',ink:'#3D0918',mute:'#8A7A63',green:'#3D6B53'};
  function vcard(icon,title,text){
    return '<div style="background:#FFFDF8;border:1.5px solid '+C.g+';border-radius:15px;padding:16px;position:relative;overflow:hidden;">'
      +'<div style="position:absolute;top:0;right:0;width:4px;height:100%;background:'+GD+'('+C.g2+','+C.g+');"></div>'
      +'<div style="width:40px;height:40px;border-radius:11px;background:'+GD+'(135deg,'+C.m+','+C.m2+');display:flex;align-items:center;justify-content:center;margin-bottom:9px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="'+C.g2+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+icon+'</svg></div>'
      +'<b style="font-size:.95rem;color:'+C.ink+';display:block;margin-bottom:3px;">'+title+'</b>'
      +'<p style="font-size:.78rem;color:#6b5a48;font-weight:600;line-height:1.7;margin:0;">'+text+'</p></div>';
  }
  var ic={
    give:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>',
    trust:'<path d="M12 2L4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z"/><path d="M9 12l2 2 4-4"/>',
    master:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v3M3 12h3"/>',
    serve:'<path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M21 21v-2a4 4 0 0 0-3-3.9"/>',
    lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
  };
  ov.innerHTML=
   '<div style="max-width:760px;margin:0 auto;">'
   +'<div style="background:radial-gradient(ellipse at top,#6B1230,'+C.m+' 60%,#2A0810);color:'+C.g2+';padding:44px 30px 38px;text-align:center;position:relative;border-bottom:3px solid '+C.g+';">'
   +'<button onclick="document.getElementById(\'hh-mission-ov\').remove()" style="position:absolute;top:16px;left:16px;background:rgba(212,188,133,.15);border:1px solid '+C.g+';border-radius:10px;width:38px;height:38px;color:'+C.g2+';cursor:pointer;font-size:1rem;">✕</button>'
   +'<div style="width:70px;height:70px;border-radius:18px;background:'+GD+'(135deg,'+C.g2+','+C.g+');display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:2.2rem;font-weight:900;color:#2a0810;">م</div>'
   +'<h1 style="font-size:1.9rem;color:'+C.iv+';margin:0 0 8px;">رسالتنا وقيمنا</h1>'
   +'<div style="font-size:.9rem;color:#D4BC85;font-weight:700;line-height:1.9;max-width:540px;margin:0 auto;">منصة تنبع من أخلاق مجتمعنا، ومن هدي النبي صلى الله عليه وسلم في العطاء والتعليم</div>'
   +'</div>'
   +'<div style="padding:26px 30px;">'
   +'<div style="background:'+GD+'(135deg,'+C.m+','+C.m2+');color:'+C.g2+';border-radius:16px;padding:20px 24px;text-align:center;margin-bottom:24px;border:1.5px solid '+C.g+';">'
   +'<div style="font-family:\'Noto Naskh Arabic\',serif;font-size:1.3rem;color:'+C.iv+';line-height:2;margin-bottom:6px;">«إِنَّمَا العُلَمَاءُ وَرَثَةُ الأَنْبِيَاءِ»</div>'
   +'<small style="color:#D4BC85;font-weight:800;font-size:.72rem;">حديث شريف · رواه أبو داود والترمذي</small></div>'
   +'<div style="font-weight:900;font-size:1.15rem;color:'+C.m2+';margin:6px 0 12px;display:flex;align-items:center;gap:9px;"><span style="width:6px;height:24px;background:'+GD+'('+C.g2+','+C.g+');border-radius:9px;"></span>رسالتنا</div>'
   +'<p style="font-size:.92rem;line-height:2;color:'+C.ink+';font-weight:600;margin-bottom:8px;">نؤمن أن تعليم النشء أمانةٌ وعبادةٌ قبل أن يكون مهنة، وأن المعلم يحمل إرث الأنبياء في نشر العلم النافع. بنينا المُلهم بجهد فردي وعطاء خالص، لنجعل التعلّم تجربة تبني العقل والخُلق معاً، ونقدّمه مجاناً لكل معلم وطالب وولي أمر، احتساباً للأجر وخدمةً لمجتمعنا.</p>'
   +'<div style="font-weight:900;font-size:1.15rem;color:'+C.m2+';margin:22px 0 12px;display:flex;align-items:center;gap:9px;"><span style="width:6px;height:24px;background:'+GD+'('+C.g2+','+C.g+');border-radius:9px;"></span>قيمنا المستمدّة من أخلاق النبي ﷺ</div>'
   +'<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;">'
   + vcard(ic.give,'العطاء','نقدّم المنصة مجاناً بلا مقابل، كما علّمنا النبي ﷺ بذل النفع للناس.')
   + vcard(ic.trust,'الأمانة والصدق','نصون خصوصية طلابنا، ونلتزم الصدق في المحتوى والتعامل.')
   + vcard(ic.master,'الإتقان','نتقن ما نصنع، فإن الله يحب إذا عمل أحدكم عملاً أن يتقنه.')
   + vcard(ic.serve,'خدمة المجتمع','نبني للمجتمع أداةً ترفع أبناءه علماً وخُلقاً.')
   +'</div>'
   +'<div style="background:#EBF2EE;border:1.5px solid '+C.green+';border-right:5px solid '+C.green+';border-radius:14px;padding:16px 18px;margin:18px 0;font-size:.86rem;color:#2C5340;font-weight:700;line-height:1.9;display:flex;gap:12px;align-items:flex-start;">'
   +'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="'+C.green+'" stroke-width="2" style="flex-shrink:0;margin-top:2px;">'+ic.lock+'</svg>'
   +'<span><b>عهدنا في صون الخصوصية:</b> نوثّق أثر برامجنا بالصور والإنجازات، دون نشر أسماء الطلاب أو بياناتهم، حمايةً لهم واحتراماً لأمانتهم في أعناقنا.</span></div>'
   +'<div style="font-weight:900;font-size:1.15rem;color:'+C.m2+';margin:22px 0 12px;display:flex;align-items:center;gap:9px;"><span style="width:6px;height:24px;background:'+GD+'('+C.g2+','+C.g+');border-radius:9px;"></span>من قيمنا إلى محتوانا</div>'
   +'<p style="font-size:.92rem;line-height:2;color:'+C.ink+';font-weight:600;margin-bottom:12px;">لا تبقى قيمنا شعارات، بل تتحوّل إلى تجربة يعيشها الطالب عبر مسابقة أخلاق النبي ﷺ.</p>'
   +'<div style="background:'+GD+'(135deg,#2a0810,'+C.m+');border-radius:18px;padding:22px;border:1.5px solid '+C.g+';">'
   +'<span style="display:inline-block;background:'+C.g+';color:#2a0810;font-weight:900;font-size:.62rem;border-radius:99px;padding:3px 12px;margin-bottom:10px;">مسابقة في المنصة</span>'
   +'<h3 style="color:'+C.iv+';font-size:1.25rem;margin:0 0 6px;">أخلاق النبي ﷺ</h3>'
   +'<p style="color:#D4BC85;font-size:.8rem;font-weight:600;line-height:1.8;margin:0 0 14px;">لوحة تفاعلية تغرس شمائل النبي وسيرته في نفوس الطلاب عبر أربعة محاور، بخمسة مستويات، بروح المُلهم.</p>'
   +'<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:9px;">'
   + ['شمائله ورحمته|#3D6B53','صدقه وأمانته|#B8924A','معاملته وعطاؤه|#8A1538','قيمنا القطرية|#1F4E79'].map(function(x){ var p=x.split('|'); return '<div style="background:rgba(212,188,133,.1);border:1px solid rgba(184,146,74,.5);border-radius:11px;padding:10px 13px;color:'+C.g2+';font-weight:800;font-size:.8rem;display:flex;align-items:center;gap:8px;"><span style="width:8px;height:8px;border-radius:50%;background:'+p[1]+';flex-shrink:0;"></span>'+p[0]+'</div>'; }).join('')
   +'</div></div>'
   +'<div style="height:30px;"></div>'
   +'</div></div>';
  document.body.appendChild(ov);
};
// حقن زر «رسالتنا» في الشريط الرئيس
function inject(){
  var tries=0; var iv=setInterval(function(){ tries++; if(tries>30){ clearInterval(iv); return; }
    if(document.getElementById('hh-mission-btn')){ clearInterval(iv); return; }
    var ref=document.querySelector('.hh-crown-btn[onclick="hhOpenLeaderPrograms()"]');
    if(!ref) return;
    var b=document.createElement('button'); b.className='hh-crown-btn'; b.id='hh-mission-btn'; b.setAttribute('onclick','hhMissionOpen()');
    b.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.6 5.7 21l2.3-7.2-6-4.4h7.6z"/></svg><span>رسالتنا</span>';
    ref.insertAdjacentElement('afterend', b); clearInterval(iv);
  },800);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', inject); else inject();
})();
