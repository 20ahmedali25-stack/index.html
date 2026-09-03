// ═══════════════════════════════════════════════════════════
//  المُلهم · وحدة المتابعة الموسعة (دفتر + ملف الطالب)
//  إعدادات المعلم (قوالب · عدادات · تقرير) في وثيقته users/{uid}
//  تقارير PDF وExcel بشعار المدرسة واسمي المعلم والمنسق
//  استيراد Excel متعدد الصفوف · لوحة المدارس للمدير
// ═══════════════════════════════════════════════════════════
(function(){
  'use strict';
  function db(){ return firebase.firestore(); }
  function esc2(s){ return (typeof esc==='function') ? esc(s) : String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function toast2(m,k){ if(typeof toast==='function') toast(m,k||'info'); }
  function today(){ return new Date().toISOString().slice(0,10); }

  // ═══ إعدادات المعلم · تُحمَّل مرة وتُحفظ في وثيقته ═══
  var CFG={ tpls:[], counters:[], report:{ logo:'', school:'', teacher:'', coord:'', show:{logo:true,teacher:true,coord:true,opinion:true,sign:true} } };
  var cfgLoaded=false;
  window._hhDPlusCfg=function(){ return CFG; };
  window._hhDPlusLoadCfg=function(){ return loadCfg(); };
  async function loadCfg(){
    if(cfgLoaded) return CFG;
    cfgLoaded=true;
    try{
      var d=await db().collection('users').doc(currentUser.uid).get();
      if(d.exists && d.data().followCfg){
        var c=d.data().followCfg;
        CFG.tpls=c.tpls||[]; CFG.counters=c.counters||[];
        if(c.report){ CFG.report=Object.assign(CFG.report, c.report); CFG.report.show=Object.assign({logo:true,teacher:true,coord:true,opinion:true,sign:true}, c.report.show||{}); if(CFG.report.school===undefined) CFG.report.school=''; }
      }
    }catch(e){}
    return CFG;
  }
  function saveCfg(){
    try{
      db().collection('users').doc(currentUser.uid).set({followCfg:CFG},{merge:true})
        .then(function(){ toast2('حُفظت الإعدادات','success'); })
        .catch(function(){ toast2('تعذر حفظ الإعدادات','error'); });
    }catch(e){}
  }
  if(typeof currentUser!=='undefined' && currentUser){ loadCfg(); }
  else { document.addEventListener('DOMContentLoaded', function(){ setTimeout(function(){ if(typeof currentUser!=='undefined'&&currentUser) loadCfg(); }, 2500); }); }

  // ═══ لوحة الإعدادات ═══
  window.hhDPlusSettings=async function(){
    await loadCfg();
    var old=document.getElementById('hh-dps'); if(old) old.remove();
    var ov=document.createElement('div'); ov.id='hh-dps';
    ov.style.cssText='position:fixed;inset:0;background:rgba(42,8,16,.78);z-index:2147483000;display:flex;align-items:flex-start;justify-content:center;padding:14px;overflow-y:auto;direction:rtl;font-family:Cairo,sans-serif;';
    function render(){
      var tpls=(CFG.tpls.length?CFG.tpls:[]).map(function(t,i){
        return '<div style="display:flex;align-items:center;gap:6px;background:#FFFDF8;border:1px solid #EDE3CE;border-radius:10px;padding:6px 10px;margin-bottom:5px;">'
          +'<span style="flex:1;font-weight:700;font-size:.7rem;color:#5a4a30;">'+esc2(t)+'</span>'
          +'<b data-deltpl="'+i+'" style="color:#8A1538;cursor:pointer;">✕</b></div>';
      }).join('') || '<div style="font-size:.66rem;color:#8A7A63;font-weight:700;margin-bottom:5px;">تُستخدم القوالب الجاهزة الافتراضية، أضف قوالبك لتحل محلها</div>';
      var ctrs=CFG.counters.map(function(c,i){
        return '<span style="background:#FFFDF8;border:1.5px solid #8A6D2E;border-radius:15px;padding:4px 11px;font-size:.68rem;font-weight:900;color:#8A6D2E;margin-left:4px;display:inline-block;margin-bottom:4px;">'+esc2(c.name)
          +' <b data-delctr="'+i+'" style="color:#8A1538;cursor:pointer;">✕</b></span>';
      }).join('') || '<span style="font-size:.66rem;color:#8A7A63;font-weight:700;">لا عدادات بعد</span>';
      var R=CFG.report;
      function cb(k,l){ return '<label style="font-size:.66rem;font-weight:800;color:#5a4a30;margin-left:9px;"><input type="checkbox" data-show="'+k+'"'+(R.show[k]?' checked':'')+'> '+l+'</label>'; }
      ov.innerHTML='<div style="background:#F6F1E7;border:2px solid #B8924A;border-radius:20px;max-width:560px;width:100%;overflow:hidden;margin-bottom:22px;">'
        +'<div style="background:linear-gradient(135deg,#4A0B1E,#5E0E26);color:#F5E6C4;padding:14px 17px;display:flex;justify-content:space-between;align-items:center;">'
        +'<div><div style="font-weight:900;font-size:1rem;">إعدادات المتابعة والتقارير</div>'
        +'<div style="font-size:.7rem;opacity:.85;">تتبعك على كل أجهزتك</div></div>'
        +'<button id="dps-close" style="background:none;border:none;color:#F5E6C4;font-size:1.15rem;cursor:pointer;">✕</button></div>'
        +'<div style="padding:13px 16px;">'
        +'<div style="font-weight:900;font-size:.78rem;color:#3D0918;margin:4px 0 6px;">قوالب الملاحظات السريعة</div>'
        + tpls
        +'<button id="dps-addtpl" style="background:#FFFDF8;color:#3D6B53;border:1.5px solid #3D6B53;border-radius:10px;padding:6px 12px;font-family:Cairo;font-weight:900;font-size:.68rem;cursor:pointer;">إضافة قالب</button>'
        +'<div style="font-weight:900;font-size:.78rem;color:#3D0918;margin:13px 0 6px;">العدادات المخصصة (أزرار في الدفتر الذكي)</div>'
        + ctrs
        +'<div style="margin-top:6px;"><button id="dps-addctr" style="background:#FFFDF8;color:#8A6D2E;border:1.5px solid #B8924A;border-radius:10px;padding:6px 12px;font-family:Cairo;font-weight:900;font-size:.68rem;cursor:pointer;">إضافة عداد</button></div>'
        +'<div style="font-weight:900;font-size:.78rem;color:#3D0918;margin:13px 0 6px;">إعدادات التقارير</div>'
        +'<div style="display:flex;align-items:center;gap:9px;margin-bottom:8px;">'
        +(R.logo?'<img src="'+R.logo+'" style="height:38px;max-width:80px;object-fit:contain;border:1px solid #EDE3CE;border-radius:8px;background:#fff;padding:2px;">':'')
        +'<label style="background:#FFFDF8;color:#1F4E79;border:1.5px solid #1F4E79;border-radius:10px;padding:6px 12px;font-family:Cairo;font-weight:900;font-size:.68rem;cursor:pointer;">'
        +(R.logo?'تغيير شعار المدرسة':'رفع شعار المدرسة')
        +'<input type="file" id="dps-logo" accept="image/*" style="display:none;"></label>'
        +(R.logo?'<b id="dps-dellogo" style="color:#8A1538;cursor:pointer;font-size:.7rem;">إزالة</b>':'')
        +'</div>'
        +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:7px;">'
        +'<input id="dps-school" value="'+esc2(R.school||'')+'" placeholder="اسم المدرسة" style="grid-column:1/3;border:1.5px solid #EDE3CE;border-radius:9px;padding:7px 10px;font-family:Cairo;font-size:.72rem;font-weight:700;">'
        +'<input id="dps-teacher" value="'+esc2(R.teacher)+'" placeholder="اسم المعلم" style="border:1.5px solid #EDE3CE;border-radius:9px;padding:7px 10px;font-family:Cairo;font-size:.72rem;font-weight:700;">'
        +'<input id="dps-coord" value="'+esc2(R.coord)+'" placeholder="اسم المنسق" style="border:1.5px solid #EDE3CE;border-radius:9px;padding:7px 10px;font-family:Cairo;font-size:.72rem;font-weight:700;">'
        +'</div>'
        +'<div style="line-height:2.2;">'+cb('logo','الشعار')+cb('teacher','اسم المعلم')+cb('coord','اسم المنسق')+cb('opinion','رأي المعلم')+cb('sign','التواقيع')+'</div>'
        +'<button id="dps-save" style="margin-top:8px;background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;border-radius:10px;padding:9px 18px;font-family:Cairo;font-weight:900;font-size:.74rem;cursor:pointer;">حفظ الإعدادات</button>'
        +'</div></div>';
      ov.querySelector('#dps-close').onclick=function(){ ov.remove(); };
      ov.querySelector('#dps-addtpl').onclick=function(){ var t=prompt('نص القالب الجديد:'); if(t&&t.trim()){ CFG.tpls.push(t.trim().slice(0,140)); render(); } };
      ov.querySelector('#dps-addctr').onclick=function(){ var n=prompt('اسم العداد (مثال: نقطة نظام، حفظ، إحضار الأدوات):'); if(n&&n.trim()){ CFG.counters.push({name:n.trim().slice(0,24)}); render(); } };
      ov.querySelectorAll('[data-deltpl]').forEach(function(b){ b.onclick=function(){ CFG.tpls.splice(parseInt(b.getAttribute('data-deltpl'),10),1); render(); }; });
      ov.querySelectorAll('[data-delctr]').forEach(function(b){ b.onclick=function(){ CFG.counters.splice(parseInt(b.getAttribute('data-delctr'),10),1); render(); }; });
      var lg=ov.querySelector('#dps-logo');
      if(lg) lg.onchange=function(){
        var f=this.files&&this.files[0]; if(!f)return;
        if(f.size>250000){ toast2('الشعار كبير، اختر صورة أقل من 250 كيلوبايت','error'); return; }
        var r=new FileReader();
        r.onload=function(e){ CFG.report.logo=String(e.target.result||''); render(); };
        r.readAsDataURL(f);
      };
      var dl=ov.querySelector('#dps-dellogo');
      if(dl) dl.onclick=function(){ CFG.report.logo=''; render(); };
      ov.querySelector('#dps-save').onclick=function(){
        CFG.report.school=((ov.querySelector('#dps-school')||{}).value||'').trim().slice(0,80);
        CFG.report.teacher=(ov.querySelector('#dps-teacher').value||'').trim().slice(0,60);
        CFG.report.coord=(ov.querySelector('#dps-coord').value||'').trim().slice(0,60);
        ov.querySelectorAll('[data-show]').forEach(function(c){ CFG.report.show[c.getAttribute('data-show')]=!!c.checked; });
        saveCfg(); ov.remove();
      };
    }
    render();
    document.body.appendChild(ov);
  };

  // ═══ رأي المعلم التلقائي من بيانات ملف الطالب ═══
  window.hhDPlusOpinionDraft=function(rec){
    var p=[];
    var att=rec.attendance||[];
    var pres=att.filter(function(a){return a.status==='present'||a.status==='late';}).length;
    var attPct=att.length?Math.round(pres/att.length*100):null;
    if(attPct!==null) p.push(attPct>=90?'يلتزم الطالب بالحضور التزاماً ممتازاً':attPct>=75?'حضوره جيد مع غيابات محدودة':'يحتاج إلى ضبط حضوره ومتابعته');
    var gr=(rec.grades||[]).filter(function(g){return typeof g.score==='number';});
    if(gr.length){
      var avg=Math.round(gr.reduce(function(a,g){return a+g.score;},0)/gr.length);
      var d14=new Date(); d14.setDate(d14.getDate()-14); var s14=d14.toISOString().slice(0,10);
      var rec2=gr.filter(function(g){return (g.date||'')>=s14;}), old2=gr.filter(function(g){return (g.date||'')<s14;});
      var trend='';
      if(rec2.length&&old2.length){
        var a2=rec2.reduce(function(a,g){return a+g.score;},0)/rec2.length, b2=old2.reduce(function(a,g){return a+g.score;},0)/old2.length;
        trend = a2-b2>=8?'ويتقدم مستواه بوضوح':a2-b2<=-8?'ومستواه في تراجع يستدعي الانتباه':'ومستواه مستقر';
      }
      p.push('تحصيله الدراسي عند '+avg+'%'+(trend?' '+trend:''));
    }
    var hw=rec.homework||[];
    if(hw.length){
      var done=hw.filter(function(h){return h.status==='done'||h.status==='hwlate'||h.done===true;}).length;
      var hp=Math.round(done/hw.length*100);
      p.push(hp>=80?'وهو ملتزم بواجباته':hp>=50?'والتزامه بالواجبات متفاوت':'ويحتاج متابعة حازمة في الواجبات');
    }
    if(((rec.participation||[]).length+(rec.achievements||[]).length)>=4) p.push('وهو عنصر فاعل في الصف مشاركةً وتميزاً');
    var tr=rec.traits||{};
    if((tr.strength||[]).length) p.push('من أبرز نقاط قوته: '+tr.strength.slice(0,2).join(' و'));
    if((tr.growth||[]).length) p.push('ونوصي بالتركيز على تطوير: '+tr.growth.slice(0,2).join(' و'));
    if(!p.length) return 'لا تتوفر بيانات كافية بعد لتكوين رأي، تابع الرصد اليومي وسيتكون الرأي تلقائياً.';
    return p.join('، ')+'.';
  };

  // ═══ رأس التقرير وتواقيعه ═══
  function repHead(sub){
    var R=CFG.report;
    var d=new Date().toLocaleDateString('ar',{year:'numeric',month:'long',day:'numeric'});
    var logo=(R.show.logo&&R.logo)?'<img src="'+R.logo+'" style="height:52px;max-width:120px;object-fit:contain;">':'';
    var who=[];
    if(R.show.teacher&&R.teacher) who.push('المعلم: '+esc2(R.teacher));
    if(R.show.coord&&R.coord) who.push('المنسق: '+esc2(R.coord));
    return '<div class="hd"><div style="display:flex;align-items:center;gap:12px;">'+logo
      +'<div class="logo">منصة المُلهم التعليمية<small>'+sub+'</small></div></div>'
      +'<div style="text-align:left;font-size:.7rem;font-weight:800;color:#5a4a30;">'+esc2(d)
      +(who.length?'<br>'+who.join(' · '):'')+'</div></div>';
  }
  function repSig(){
    var R=CFG.report;
    if(!R.show.sign) return '';
    var t=R.teacher?('<br><span style="font-size:.68rem;color:#8A6D2E;">'+esc2(R.teacher)+'</span>'):'';
    var c=R.coord?('<br><span style="font-size:.68rem;color:#8A6D2E;">'+esc2(R.coord)+'</span>'):'';
    return '<div class="sig"><div>توقيع المعلم'+t+'</div><div>توقيع المنسق'+c+'</div><div>اطلاع ولي الأمر</div></div>';
  }
  var REP_CSS='body{font-family:"Cairo","Tajawal",sans-serif;margin:0;padding:26px 32px;color:#2b1016;}'
    +'.hd{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #B8924A;padding-bottom:12px;margin-bottom:14px;}'
    +'.logo{font-weight:900;font-size:1.25rem;color:#4A0B1E;} .logo small{display:block;font-size:.66rem;color:#8A6D2E;font-weight:800;}'
    +'h2{font-size:.95rem;color:#4A0B1E;border-right:4px solid #B8924A;padding-right:8px;margin:16px 0 8px;}'
    +'.grid{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;} .grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;}'
    +'.st{border:1.5px solid #E3D9C6;border-radius:10px;text-align:center;padding:8px 4px;background:#FFFDF8;}'
    +'.st b{display:block;font-size:1.02rem;color:#4A0B1E;} .st span{font-size:.6rem;color:#8A6D2E;font-weight:800;}'
    +'table{width:100%;border-collapse:collapse;font-size:.74rem;} td,th{border:1px solid #E3D9C6;padding:4px 7px;} th{background:#FBF7EE;color:#4A0B1E;}'
    +'.box{border:1.5px solid #B8924A;border-radius:10px;padding:10px 13px;font-size:.78rem;background:#FFFDF8;}'
    +'.sig{margin-top:30px;display:flex;justify-content:space-between;font-size:.74rem;font-weight:800;color:#5a4a30;}'
    +'.sig div{border-top:1.5px solid #B8924A;padding-top:5px;min-width:150px;text-align:center;}'
    +'@media print{.noprint{display:none;} body{padding:10px 14px;}}'+'.wm{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;opacity:.045;font-size:210px;font-weight:900;color:#4A0B1E;pointer-events:none;z-index:0;}'+'.mhd{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #B8924A;padding-bottom:12px;position:relative;z-index:1;}'+'.mhd .b1{display:flex;gap:12px;align-items:center;} .mlogo{width:52px;height:52px;border-radius:50%;border:2.5px solid #4A0B1E;display:flex;align-items:center;justify-content:center;font-weight:900;color:#4A0B1E;font-size:.6rem;text-align:center;overflow:hidden;}'+'.mhd h1{margin:0;font-size:1.1rem;color:#4A0B1E;font-weight:900;} .mhd .msub{font-size:.6rem;color:#8A6D2E;font-weight:800;} .mhd .mmeta{text-align:left;font-size:.58rem;font-weight:800;color:#5a4a30;line-height:1.9;}'+'.stub{display:flex;gap:14px;align-items:center;background:linear-gradient(135deg,#4A0B1E,#5E0E26);border-radius:14px;padding:13px 18px;margin:14px 0;position:relative;z-index:1;}'+'.stub .who{flex:1;} .stub .who b{color:#FFFDF8;font-size:1.05rem;font-weight:900;display:block;} .stub .who span{color:#D4BC85;font-size:.62rem;font-weight:800;}'+'.stub .lvl{border-radius:11px;padding:7px 16px;font-weight:900;font-size:.8rem;text-align:center;color:#2a0810;} .stub .lvl small{display:block;font-size:.5rem;font-weight:800;}'+'.rings{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;position:relative;z-index:1;}'+'.ring{text-align:center;} .rc{width:70px;height:70px;border-radius:50%;margin:0 auto;display:flex;align-items:center;justify-content:center;}'+'.rc .in{width:54px;height:54px;border-radius:50%;background:#FFFDF8;display:flex;flex-direction:column;align-items:center;justify-content:center;}'+'.rc .in b{font-size:.82rem;color:#2b1016;font-weight:900;line-height:1;} .rc .in i{font-style:normal;font-size:.44rem;color:#8A6D2E;font-weight:800;} .ring .rt{font-size:.56rem;font-weight:900;color:#5a4a30;margin-top:4px;}'+'.cols{display:grid;grid-template-columns:1.25fr 1fr;gap:14px;position:relative;z-index:1;} .trend{width:100%;height:auto;display:block;}'+'.cmp{display:flex;flex-direction:column;gap:6px;} .cmp .cr{display:flex;align-items:center;gap:6px;font-size:.58rem;font-weight:800;color:#5a4a30;}'+'.cmp .cbar{flex:1;height:10px;background:#F1EBDF;border-radius:6px;overflow:hidden;} .cmp .cbar span{display:block;height:100%;}'+'.qual{display:grid;grid-template-columns:1fr 1fr;gap:10px;position:relative;z-index:1;} .tagset{display:flex;gap:4px;flex-wrap:wrap;margin-top:5px;}'+'.tg{border-radius:12px;padding:3px 10px;font-size:.56rem;font-weight:900;}'+'.opin{background:#FBF7EE;border:1.5px solid #B8924A;border-radius:12px;padding:11px 14px;font-size:.66rem;font-weight:700;color:#3b2a1a;line-height:2;position:relative;z-index:1;}'+'.msig{margin-top:16px;display:flex;justify-content:space-between;align-items:flex-end;position:relative;z-index:1;} .msig .s{border-top:1.5px solid #B8924A;padding-top:4px;min-width:120px;text-align:center;font-size:.58rem;font-weight:800;color:#5a4a30;}'+'.ver{text-align:center;font-size:.48rem;color:#8A6D2E;font-weight:800;} .ver .qr{width:40px;height:40px;margin:0 auto 3px;background:conic-gradient(#4A0B1E 25%,#fff 0 50%,#4A0B1E 0 75%,#fff 0);border:2px solid #4A0B1E;border-radius:6px;}'+'.dist{display:flex;align-items:flex-end;gap:9px;height:88px;padding:4px 6px 0;} .dist .d{flex:1;text-align:center;} .dist .bar2{border-radius:6px 6px 0 0;margin:0 auto;width:72%;} .dist .dn{font-size:.6rem;font-weight:900;color:#2b1016;} .dist .dt{font-size:.48rem;font-weight:800;color:#8A6D2E;}'+'.heat{display:grid;grid-template-columns:repeat(12,1fr);gap:3px;} .hcell{height:16px;border-radius:4px;}'+'.exec{background:linear-gradient(135deg,#FBF7EE,#f6efdd);border:1.5px solid #B8924A;border-radius:12px;padding:12px 15px;font-size:.66rem;font-weight:700;color:#3b2a1a;line-height:2.05;position:relative;z-index:1;}'+'.page{position:relative;}';
  function openPrint(html){
    // نعرض التقرير كطبقة داخل الصفحة (لا نافذة جديدة تُحجب على الهاتف)
    var old=document.getElementById('hh-report-layer'); if(old) old.remove();
    // نستخرج جسم <body> ونمط <style> من الـHTML الكامل
    var styleM=html.match(/<style>([\s\S]*?)<\/style>/i);
    var bodyM=html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    var css=styleM?styleM[1]:'';
    var body=bodyM?bodyM[1]:html;
    // نحذف أزرار الطباعة/التنزيل الأصلية (سنضع شريطاً علوياً ثابتاً بدلها)
    body=body.replace(/<div class="noprint"[\s\S]*?<\/div>\s*(?=<\/div>\s*$|$)/i,'');
    var layer=document.createElement('div');
    layer.id='hh-report-layer';
    layer.style.cssText='position:fixed;inset:0;background:rgba(42,8,16,.6);z-index:2147483647;display:flex;flex-direction:column;direction:rtl;font-family:Cairo,sans-serif;';
    layer.innerHTML=
      '<div style="background:linear-gradient(135deg,#4A0B1E,#5E0E26);padding:11px 16px;display:flex;gap:8px;align-items:center;flex-shrink:0;box-shadow:0 3px 12px rgba(42,8,16,.3);">'
      +'<button onclick="var e=document.getElementById(\'hh-report-layer\');if(e)e.remove();" style="background:rgba(255,253,248,.16);border:1.5px solid #D4BC85;color:#F5E6C4;border-radius:9px;padding:9px 18px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;">\u25c0 رجوع للدفتر</button>'
      +'<div style="flex:1;"></div>'
      +'<button id="hh-report-csv" style="background:rgba(255,253,248,.14);color:#F5E6C4;border:1.5px solid #D4BC85;border-radius:9px;padding:9px 18px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;">تنزيل Excel</button>'
      +'<button onclick="hhReportPrint()" style="background:#B8924A;color:#2a0810;border:none;border-radius:9px;padding:9px 20px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;">طباعة أو حفظ PDF</button>'
      +'</div>'
      +'<div id="hh-report-scroll" style="flex:1;overflow-y:auto;background:#eee;padding:14px;display:flex;justify-content:center;">'
      +'<div id="hh-report-paper" style="background:#fff;width:100%;max-width:900px;box-shadow:0 6px 24px rgba(0,0,0,.2);"></div>'
      +'</div>';
    (document.body||document.documentElement).appendChild(layer);
    // نضمن أنه آخر عنصر في body فيعلو كل شيء
    try{ document.body.appendChild(layer); }catch(e){}
    // نحقن النمط في الورقة
    var st=document.createElement('style');
    st.textContent='#hh-report-paper{'+'}'+css.replace(/body\s*\{/g,'#hh-report-paper{');
    layer.appendChild(st);
    document.getElementById('hh-report-paper').innerHTML=body;
    // ربط زر التنزيل بآخر دالة CSV مسجّلة
    var csvBtn=document.getElementById('hh-report-csv');
    if(csvBtn) csvBtn.onclick=function(){ if(window._hhReportCsvFn) window._hhReportCsvFn(); };
  }
  // طباعة الورقة وحدها
  // ═══ نافذة إعداد الطباعة · البيانات محفوظة تلقائياً وقابلة للتغيير ═══
  window.hhReportPrint=function(){
    var R=(window._hhDPlusCfg&&window._hhDPlusCfg().report)||{};
    R.show=R.show||{logo:true,teacher:true,coord:true,sign:true};
    var old=document.getElementById('hh-print-dlg'); if(old) old.remove();
    var ov=document.createElement('div'); ov.id='hh-print-dlg';
    ov.style.cssText='position:fixed;inset:0;background:rgba(42,8,16,.7);z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:16px;direction:rtl;font-family:Cairo,sans-serif;';
    function row(key, icon, label, val, actLabel, actFn){
      var checked = R.show[key]!==false;
      return '<div style="display:flex;align-items:center;gap:9px;background:#fff;border:1.3px solid #E3D9C6;border-radius:9px;padding:8px 11px;margin-bottom:6px;">'
        +'<input type="checkbox" data-k="'+key+'" '+(checked?'checked':'')+' style="width:16px;height:16px;accent-color:#3D6B53;flex-shrink:0;">'
        +'<span style="flex:1;font-size:.72rem;color:#5a4a30;font-weight:800;">'+icon+' '+label+'</span>'
        +(val?'<span style="font-size:.62rem;color:#8a7a63;font-weight:700;">'+esc2(val)+'</span>':'')
        +(actLabel?'<button onclick="'+actFn+'" style="font-size:.6rem;color:#1F4E79;font-weight:900;text-decoration:underline;background:none;border:none;cursor:pointer;font-family:Cairo;">'+actLabel+'</button>':'')
        +'</div>';
    }
    ov.innerHTML='<div style="background:#F6F1E7;border:2px solid #B8924A;border-radius:16px;max-width:400px;width:100%;overflow:hidden;">'
      +'<div style="background:linear-gradient(135deg,#4A0B1E,#5E0E26);color:#F5E6C4;padding:12px 15px;">'
      +'<div style="font-weight:900;font-size:.9rem;">إعداد الطباعة</div>'
      +'<div style="font-size:.6rem;opacity:.85;font-weight:700;">بياناتك محفوظة · فعّل ما تريد إرفاقه على الورقة</div></div>'
      +'<div style="padding:13px 15px;">'
      + row('logo','🖼','شعار المدرسة', R.logo?'مرفوع':'لم يُرفع', R.logo?'تغيير':'رفع', 'hhPrintEditSettings()')
      + row('school','🏫','اسم المدرسة', R.school||'لم يُضف', 'تعديل', 'hhPrintEditSettings()')
      + row('teacher','✍','اسم المعلم', R.teacher||'لم يُضف', 'تعديل', 'hhPrintEditSettings()')
      + row('coord','✍','اسم المنسق', R.coord||'لم يُضف', 'تعديل', 'hhPrintEditSettings()')
      + row('sign','✒','فراغات التواقيع', '', '', '')
      +'<div style="display:flex;gap:7px;margin-top:8px;">'
      +'<button onclick="hhPrintConfirm()" style="flex:1;background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;border-radius:10px;padding:11px;font-family:Cairo;font-weight:900;font-size:.78rem;cursor:pointer;">طباعة النسخة النهائية</button>'
      +'<button onclick="document.getElementById(\'hh-print-dlg\').remove()" style="background:#FFFDF8;border:1.4px solid #ddd;color:#999;border-radius:10px;padding:11px 16px;font-family:Cairo;font-weight:900;font-size:.78rem;cursor:pointer;">إلغاء</button>'
      +'</div></div></div>';
    document.body.appendChild(ov);
  };
  // زر تعديل البيانات يفتح الإعدادات الكاملة (تُحفظ تلقائياً)
  window.hhPrintEditSettings=function(){
    var d=document.getElementById('hh-print-dlg'); if(d) d.remove();
    if(window.hhDPlusSettings) hhDPlusSettings();
  };
  // تأكيد الطباعة · يطبّق خيارات الإظهار ويطبع
  window.hhPrintConfirm=function(){
    var dlg=document.getElementById('hh-print-dlg');
    var show={};
    if(dlg) dlg.querySelectorAll('input[data-k]').forEach(function(cb){ show[cb.getAttribute('data-k')]=cb.checked; });
    // نحفظ خيارات الإظهار في إعدادات المعلم (تلقائياً لكل مرة قادمة)
    try{
      var cfg=window._hhDPlusCfg&&window._hhDPlusCfg();
      if(cfg&&cfg.report){ cfg.report.show=Object.assign(cfg.report.show||{}, show);
        db().collection('users').doc(currentUser.uid).set({followCfg:cfg},{merge:true}).catch(function(){}); }
    }catch(e){}
    if(dlg) dlg.remove();
    // نطبّق الإظهار على الورقة الحالية (إخفاء ما أُلغي)
    var paper=document.getElementById('hh-report-paper'); if(!paper) return;
    var clone=paper.cloneNode(true);
    if(show.logo===false) clone.querySelectorAll('.mlogo,.rlogo,img').forEach(function(e){e.style.display='none';});
    if(show.sign===false) clone.querySelectorAll('.sig,.msig,.rsig').forEach(function(e){e.style.display='none';});
    // الطباعة
    var w=window.open('','_blank');
    if(w){
      var st=document.querySelector('#hh-report-layer style');
      w.document.open();
      w.document.write('<!doctype html><html dir="rtl"><head><meta charset="utf-8"><title>طباعة التقرير</title>'
        +(st?'<style>'+st.textContent.replace(/#hh-report-paper/g,'body')+'</style>':'')
        +'<style>@page{size:A4 landscape;margin:10mm;}</style>'
        +'</head><body>'+clone.innerHTML+'<scr'+'ipt>window.onload=function(){setTimeout(function(){window.print();},300);};</scr'+'ipt></body></html>');
      w.document.close();
    } else { window.print(); }
  };
  function csvDownload(name, rows){
    var csv=rows.map(function(r){ return r.map(function(c){ return '"'+String(c==null?'':c).replace(/"/g,'""')+'"'; }).join(','); }).join('\r\n');
    var bl=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'});
    var a=document.createElement('a');
    a.href=URL.createObjectURL(bl); a.download=name;
    document.body.appendChild(a); a.click();
    setTimeout(function(){ a.remove(); URL.revokeObjectURL(a.href); },800);
  }
  window.hhDPlusCsv=csvDownload;

  // ═══ حسابات مؤشرات موحدة من سجل طالب ═══
  function statsOf(r){
    var att=r.attendance||[];
    var pres=att.filter(function(a){return a.status==='present'||a.status==='late';}).length;
    var gr=(r.grades||[]).filter(function(g){return typeof g.score==='number';});
    var hw=r.homework||[];
    var done=hw.filter(function(h){return h.status==='done'||h.status==='hwlate'||h.done===true;}).length;
    return {
      attPct: att.length?Math.round(pres/att.length*100):null,
      avg: gr.length?Math.round(gr.reduce(function(a,g){return a+g.score;},0)/gr.length):null,
      hwPct: hw.length?Math.round(done/hw.length*100):null,
      partN:(r.participation||[]).length,
      starN:(r.achievements||[]).filter(function(x){return x.type==='star';}).reduce(function(a,x){return a+(x.n||1);},0),
      noteN:(r.notes||[]).length
    };
  }
  window.hhDPlusStats=statsOf;

  // مؤشرات موسّعة للتقرير الوزاري
  function statsPlus(r){
    var b=statsOf(r);
    // دافعية المشاركة: مقياس 0..100 من عدد المشاركات (سقف 20)
    b.motiv = Math.min(100, Math.round((b.partN/20)*100));
    // المؤشر السلوكي: يبدأ 80، +، والسلبيات تخصم
    var bh=(r.behavior||[]);
    var good=bh.filter(function(x){return x.type==='good';}).length;
    var bad=bh.filter(function(x){return x.type==='bad';}).length;
    b.behavPct = Math.max(0, Math.min(100, 80 + good*4 - bad*8));
    // مستوى عام
    var core=[b.attPct,b.avg,b.hwPct].filter(function(x){return x!==null;});
    var overall = core.length?Math.round(core.reduce(function(a,c){return a+c;},0)/core.length):null;
    b.level = overall===null?'قيد الرصد':(overall>=85?'متقدم':overall>=70?'ممكّن':overall>=55?'نامٍ':'يحتاج دعماً');
    b.levelColor = overall===null?'#8A6D2E':(overall>=85?'#3D6B53':overall>=70?'#7ba98f':overall>=55?'#C9B37E':'#c77');
    return b;
  }
  // اتجاه التحصيل عبر أسبوعين
  function gradeTrend(r){
    var gr=(r.grades||[]).filter(function(g){return typeof g.score==='number'&&g.date;}).sort(function(a,b){return (a.date<b.date)?-1:1;});
    if(gr.length<2) return null;
    var half=Math.ceil(gr.length/2);
    var older=gr.slice(0,half), recent=gr.slice(half);
    var ao=older.reduce(function(a,g){return a+g.score;},0)/older.length;
    var ar=recent.reduce(function(a,g){return a+g.score;},0)/recent.length;
    return Math.round(ar-ao);
  }
  // منحنى ستة أسابيع (تحصيل + مشاركة)
  function growthSvg(r){
    function wk(back, field){
      var end=new Date(); end.setDate(end.getDate()-7*back);
      var start=new Date(end); start.setDate(start.getDate()-6);
      var a=start.toISOString().slice(0,10), b2=end.toISOString().slice(0,10);
      if(field==='avg'){
        var gr=(r.grades||[]).filter(function(g){return typeof g.score==='number'&&g.date>=a&&g.date<=b2;});
        return gr.length?Math.round(gr.reduce(function(s,g){return s+g.score;},0)/gr.length):null;
      } else {
        return (r.participation||r.__part||[]).filter(function(p){return p.date>=a&&p.date<=b2;}).length;
      }
    }
    var g=[],pt=[];
    for(var w=5;w>=0;w--){ g.push(wk(w,'avg')); }
    var have=g.filter(function(x){return x!==null;});
    if(have.length<2) return '';
    function y(v){ return v===null?92:88-(v/100)*60; }
    var pts=g.map(function(v,i){ return (20+i*58)+','+y(v); }).join(' ');
    return '<svg class="trend" viewBox="0 0 340 110">'
      +'<line x1="8" y1="88" x2="332" y2="88" stroke="#EDE3CE"/><line x1="8" y1="58" x2="332" y2="58" stroke="#F1EBDF"/><line x1="8" y1="28" x2="332" y2="28" stroke="#F1EBDF"/>'
      +'<polyline points="'+pts+'" fill="none" stroke="#3D6B53" stroke-width="3" stroke-linecap="round"/>'
      +'<text x="20" y="103" font-size="7" font-weight="800" fill="#a99" font-family="Cairo">الأقدم</text>'
      +'<text x="286" y="103" font-size="7" font-weight="800" fill="#a99" font-family="Cairo">هذا الأسبوع</text>'
      +'</svg>';
  }
  window._hhStatsPlus=statsPlus;

  // ═══ التقرير التربوي الفردي · مستوى وزاري ═══
  window.hhDPlusStudentReport=async function(rec, classStats){
    await loadCfg();
    var st=statsPlus(rec);
    var trend=gradeTrend(rec);
    function pv(v,suf){ return v===null?'·':v+(suf||''); }
    var R=CFG.report, d=new Date().toLocaleDateString('ar',{year:'numeric',month:'long',day:'numeric'});
    var logo=(R.show.logo&&R.logo)?'<img src="'+R.logo+'" style="width:100%;height:100%;object-fit:contain;">':'شعار<br>المدرسة';
    var totalRecords=((rec.attendance||[]).length+(rec.grades||[]).length+(rec.homework||[]).length+(rec.participation||[]).length+(rec.achievements||[]).length);
    // الحلقات الست
    function ringHtml(pct,color,big,small,label){
      var deg=Math.round(Math.max(0,Math.min(100,pct||0))*3.6);
      return '<div class="ring"><div class="rc" style="background:conic-gradient('+color+' 0 '+deg+'%,#EDE3CE 0);"><div class="in"><b>'+big+'</b><i>'+small+'</i></div></div><div class="rt">'+label+'</div></div>';
    }
    var ringsHtml=''
      + ringHtml(st.avg,'#3D6B53', pv(st.avg,'%'),'تحصيل','المعدل التحصيلي')
      + ringHtml(st.motiv,'#1F4E79', st.motiv>=66?'مرتفع':st.motiv>=33?'متوسط':'منخفض', st.partN+' مشاركة','دافعية المشاركة')
      + ringHtml(st.hwPct,'#B8924A', pv(st.hwPct,'%'),'التزام','الواجبات')
      + ringHtml(st.behavPct,'#3D6B53', st.behavPct>=80?'إيجابي':st.behavPct>=50?'مقبول':'متابعة', st.behavPct+'','المؤشر السلوكي')
      + ringHtml(Math.min(100,st.starN*14),'#8A6D2E', st.starN+' ★','تميز','نجوم التميز')
      + ringHtml(st.attPct,'#5E0E26', pv(st.attPct,'%'),'انتظام','الانتظام');
    // موقعه من الفصل
    var cmpHtml='';
    if(classStats && classStats.avgG!==null){
      function cbar(lbl,val,cls,col){ var w=Math.max(0,Math.min(100,val||0)); return '<div class="cr"><span style="width:56px;">'+lbl+'</span><span class="cbar"><span style="width:'+w+'%;background:'+col+';"></span></span><b>'+(val===null?'·':val+(cls?'%':''))+'</b></div>'; }
      cmpHtml='<div class="box"><h2 style="margin-top:0;">موقعه من فصله</h2><div class="cmp">'
        + cbar('التحصيل', st.avg, true, '#3D6B53')
        + cbar('متوسط الفصل', classStats.avgG, true, '#C9B37E')
        + cbar('الواجبات', st.hwPct, true, '#1F4E79')
        + cbar('متوسط الفصل', classStats.avgH, true, '#C9B37E')
        +'</div>'
        + (st.avg!==null&&classStats.avgG!==null ? '<div style="font-size:.56rem;font-weight:900;color:'+(st.avg>=classStats.avgG?'#3D6B53':'#8A1538')+';margin-top:7px;">'+(st.avg>=classStats.avgG?'أعلى من متوسط الفصل بـ'+(st.avg-classStats.avgG)+' نقطة':'دون متوسط الفصل بـ'+(classStats.avgG-st.avg)+' نقطة، ومرشح للدعم')+'</div>':'')
        +'</div>';
    }
    var growth=growthSvg(rec);
    var growthHtml = growth ? '<div class="box"><h2 style="margin-top:0;">منحنى النمو · ستة أسابيع</h2>'+growth
      + (trend!==null?'<div style="font-size:.58rem;font-weight:900;color:'+(trend>=0?'#3D6B53':'#8A1538')+';margin-top:2px;">'+(trend>=0?'اتجاه صاعد · تحسّن '+trend+' نقطة':'اتجاه هابط · '+Math.abs(trend)+' نقطة، يستدعي الانتباه')+'</div>':'')
      +'</div>' : '';
    // الصورة النوعية
    var tr=rec.traits||{};
    var strengths=(tr.strength||[]).map(function(t){return '<span class="tg" style="background:#3D6B53;color:#fff;">'+esc2(t)+'</span>';}).join('');
    var growths=(tr.growth||[]).map(function(t){return '<span class="tg" style="border:1.3px solid #8A1538;color:#8A1538;">'+esc2(t)+'</span>';}).join('');
    var plan=(rec.plans||[]).slice(-1)[0];
    var planHtml=plan&&plan.reason ? '<div class="box"><b style="font-size:.62rem;color:#1F4E79;">خطة الدعم النشطة</b><div style="font-size:.6rem;font-weight:700;color:#5a4a30;line-height:1.9;margin-top:4px;">'
      +'السبب: '+esc2(plan.reason)
      +(plan.goal?'<br>الهدف: '+esc2(plan.goal):'')
      +(plan.action?'<br>الإجراء: '+esc2(plan.action):'')
      +(plan.review?'<br>المراجعة: '+esc2(plan.review):'')
      +'<br>الحالة: <b style="color:#3D6B53;">'+esc2(plan.statusLabel||plan.status||'قيد التنفيذ')+'</b></div></div>'
      : '<div class="box"><b style="font-size:.62rem;color:#8A6D2E;">لا خطة دعم نشطة</b><div style="font-size:.58rem;color:#8a7a63;font-weight:700;margin-top:4px;">الطالب لا يحتاج خطة دعم حالياً</div></div>';
    var contacts=(rec.contacts||[]).length;
    var opinion = R.show.opinion ? (rec.opinion || window.hhDPlusOpinionDraft(rec)) : '';
    var verId='ALM-'+((rec.name||'S').length*7+totalRecords).toString(36).toUpperCase().slice(0,4)+(''+Date.now()).slice(-3);
    var html='<!doctype html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>التقرير التربوي · '+esc2(rec.name||'')+'</title><style>'+REP_CSS+'</style></head><body>'
      +'<div class="page">'
      +'<div class="wm">المُلهم</div>'
      +'<div class="mhd"><div class="b1"><div class="mlogo">'+logo+'</div>'
      +'<div><h1>التقرير التربوي الشامل للطالب</h1><div class="msub">منصة المُلهم التعليمية'+(R.school?' · '+esc2(R.school):'')+' · دولة قطر</div></div></div>'
      +'<div class="mmeta">'+esc2(d)+'<br>'+(rec.classCode?'الفصل: '+esc2(rec.classCode)+'<br>':'')+'حُرّر تلقائياً من '+totalRecords+' رصداً ميدانياً</div></div>'
      +'<div class="stub"><div class="who"><b>'+esc2(rec.name||'')+'</b><span>'+(rec.classCode?esc2(rec.classCode)+' · ':'')+(R.teacher?'المعلم: '+esc2(R.teacher):'')+'</span></div>'
      +'<div class="lvl" style="background:linear-gradient(135deg,#EAD9B0,'+st.levelColor+');">'+st.level+'<small>المستوى العام</small></div></div>'
      +'<h2>لوحة المؤشرات التربوية</h2><div class="rings">'+ringsHtml+'</div>'
      +'<div style="height:12px;"></div>'
      +((growthHtml||cmpHtml)?'<div class="cols">'+(growthHtml||'<div></div>')+(cmpHtml||'<div class="box"><h2 style="margin-top:0;">ملخص</h2><div style="font-size:.6rem;color:#5a4a30;font-weight:700;">'+totalRecords+' رصداً · '+contacts+' تواصل مع ولي الأمر</div></div>')+'</div><div style="height:12px;"></div>':'')
      +'<h2>الصورة النوعية</h2><div class="qual">'
      +'<div class="box"><b style="font-size:.62rem;color:#3D6B53;">نقاط القوة الموثقة</b><div class="tagset">'+(strengths||'<span style="font-size:.56rem;color:#8a7a63;font-weight:700;">تُوثّق من تبويب الشخصية</span>')+'</div>'
      +'<b style="font-size:.62rem;color:#8A1538;display:block;margin-top:8px;">أولويات التطوير</b><div class="tagset">'+(growths||'<span style="font-size:.56rem;color:#8a7a63;font-weight:700;">—</span>')+'</div></div>'
      + planHtml
      +'</div>'
      +(opinion?'<div style="height:10px;"></div><div class="opin"><b style="color:#4A0B1E;">رأي المعلم: </b>'+esc2(opinion)+'</div>':'')
      + repSig().replace('class="sig"','class="msig"')
      +'<div class="noprint" style="margin-top:18px;text-align:center;display:flex;gap:8px;justify-content:center;">'
      +'<button onclick="window.print()" style="background:#4A0B1E;color:#fff;border:none;border-radius:10px;padding:11px 26px;font-family:Cairo;font-weight:900;font-size:.85rem;cursor:pointer;">طباعة أو حفظ PDF</button>'
      +'<button onclick="window.opener&&window.opener.hhDPlusStudentCsv&&window.opener.hhDPlusStudentCsv()" style="background:#fff;color:#3D6B53;border:1.5px solid #3D6B53;border-radius:10px;padding:11px 22px;font-family:Cairo;font-weight:900;font-size:.85rem;cursor:pointer;">تنزيل Excel</button>'
      +'</div></div></body></html>';
    window._hhDPlusLastRec=rec;
    window._hhReportCsvFn=function(){ if(window.hhDPlusStudentCsv) hhDPlusStudentCsv(); };
    openPrint(html);
  };
  window.hhDPlusStudentCsv=function(){
    var rec=window._hhDPlusLastRec; if(!rec) return;
    var rows=[['النوع','التفاصيل','التاريخ']];
    (rec.attendance||[]).forEach(function(a){ rows.push(['حضور',a.status||'',a.date||'']); });
    (rec.grades||[]).forEach(function(g){ rows.push(['درجة',(g.title||'')+' '+g.score+'%',g.date||'']); });
    (rec.homework||[]).forEach(function(h){ rows.push(['واجب',h.status||(h.done?'سلّم':'لم يسلّم'),h.date||'']); });
    (rec.notes||[]).forEach(function(n){ rows.push(['ملاحظة',n.text||'',n.date||'']); });
    csvDownload('سجل-'+(rec.name||'طالب')+'-'+today()+'.csv', rows);
  };

  // ═══ تقرير الصف الجامع · PDF + Excel ═══
  window.hhDPlusClassReport=async function(classCode, students){
    await loadCfg();
    if(!students||!students.length){ toast2('لا طلاب في الفصل','info'); return; }
    toast2('جارٍ تجهيز تقرير الفصل…','info');
    var rows='', csv=[['الطالب','الانتظام %','التحصيل %','الواجبات %','مشاركات','تميز','ملاحظات']];
    var sumA=0,nA=0,sumG=0,nG=0,sumH=0,nH=0, best=null, support=[];
    var snaps=await Promise.all(students.map(function(s){
      return db().collection('student_records').doc(s.id).get().catch(function(){ return null; });
    }));
    for(var i=0;i<students.length;i++){
      var s=students[i], r={};
      var snap=snaps[i]; if(snap && snap.exists) r=snap.data();
      var st=statsOf(r);
      if(st.attPct!==null){sumA+=st.attPct;nA++;}
      if(st.avg!==null){sumG+=st.avg;nG++; if(!best||st.avg>best.v) best={n:s.name,v:st.avg};}
      if(st.hwPct!==null){sumH+=st.hwPct;nH++;}
      if((st.avg!==null&&st.avg<60)||(st.hwPct!==null&&st.hwPct<50)||(st.attPct!==null&&st.attPct<70)) support.push(s.name);
      function d(v){return v===null?'·':v+'%';}
      rows+='<tr><td>'+esc2(s.name)+'</td><td style="text-align:center;">'+d(st.attPct)+'</td><td style="text-align:center;">'+d(st.avg)+'</td><td style="text-align:center;">'+d(st.hwPct)+'</td><td style="text-align:center;">'+st.partN+'</td><td style="text-align:center;">'+st.starN+'</td><td style="text-align:center;">'+st.noteN+'</td></tr>';
      csv.push([s.name, st.attPct===null?'':st.attPct, st.avg===null?'':st.avg, st.hwPct===null?'':st.hwPct, st.partN, st.starN, st.noteN]);
    }
    function avg(sm,n){return n?Math.round(sm/n)+'%':'·';}
    window._hhDPlusClassCsv=csv; window._hhDPlusClassCode=classCode;
    var html='<!doctype html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>تقرير الفصل</title><style>'+REP_CSS+'</style></head><body>'
      + repHead('التقرير الجامع للفصل · '+esc2(classCode||''))
      +'<div class="grid4">'
      +'<div class="st"><b>'+students.length+'</b><span>عدد الطلاب</span></div>'
      +'<div class="st"><b>'+avg(sumA,nA)+'</b><span>متوسط الانتظام</span></div>'
      +'<div class="st"><b>'+avg(sumG,nG)+'</b><span>متوسط التحصيل</span></div>'
      +'<div class="st"><b>'+avg(sumH,nH)+'</b><span>متوسط الواجبات</span></div>'
      +'</div>'
      +(best?'<div style="font-size:.78rem;font-weight:800;margin:8px 0;">أعلى تحصيل: '+esc2(best.n)+' ('+best.v+'%)</div>':'')
      +'<table><tr><th>الطالب</th><th>الانتظام</th><th>التحصيل</th><th>الواجبات</th><th>مشاركات</th><th>تميز</th><th>ملاحظات</th></tr>'+rows+'</table>'
      +(support.length?'<div class="box" style="border-color:#8A1538;background:#fff6f4;margin-top:12px;"><b>طلاب يحتاجون دعماً:</b> '+support.map(esc2).join('، ')+'</div>':'')
      + repSig()
      +'<div class="noprint" style="margin-top:20px;text-align:center;display:flex;gap:8px;justify-content:center;">'
      +'<button onclick="window.print()" style="background:#4A0B1E;color:#fff;border:none;border-radius:10px;padding:11px 26px;font-family:Cairo;font-weight:900;font-size:.85rem;cursor:pointer;">طباعة أو حفظ PDF</button>'
      +'<button onclick="window.opener&&window.opener.hhDPlusClassCsvDl&&window.opener.hhDPlusClassCsvDl()" style="background:#fff;color:#3D6B53;border:1.5px solid #3D6B53;border-radius:10px;padding:11px 22px;font-family:Cairo;font-weight:900;font-size:.85rem;cursor:pointer;">تنزيل Excel</button>'
      +'</div></body></html>';
    window._hhReportCsvFn=function(){ if(window.hhDPlusClassCsvDl) hhDPlusClassCsvDl(); };
    openPrint(html);
  };
  window.hhDPlusClassCsvDl=function(){
    if(window._hhDPlusClassCsv) csvDownload('تقرير-الفصل-'+(window._hhDPlusClassCode||'')+'-'+today()+'.csv', window._hhDPlusClassCsv);
  };

  // ═══ استيراد Excel متعدد الفصول: عمود الفصل ينشئ الفصول تلقائياً ═══
  function parseRows(text){
    var lines=String(text||'').split(/\r?\n/).map(function(l){return l.trim();}).filter(Boolean);
    if(!lines.length) return [];
    var first=lines[0];
    var sep=(first.split('\t').length>first.split(',').length)?'\t':(first.split(';').length>first.split(',').length)?';':',';
    var out=[], startIdx=0;
    var hdr=lines[0].toLowerCase();
    if(/اسم|name|الطالب|student|رقم|id|بريد|email|صف|فصل|class/.test(hdr)&&!/^\d/.test(lines[0])) startIdx=1;
    for(var i=startIdx;i<lines.length;i++){
      var cells=lines[i].split(sep).map(function(c){return c.replace(/^["']|["']$/g,'').trim();});
      var name=cells[0]||''; if(!name) continue;
      var rec={name:name};
      for(var k=1;k<cells.length;k++){
        var v=cells[k]; if(!v) continue;
        if(/@/.test(v)&&!rec.email) rec.email=v.toLowerCase();
        else if(/^\d{4,}$/.test(v)&&!rec.sid) rec.sid=v;
        else if(!rec.cls) rec.cls=v;
      }
      out.push(rec);
    }
    return out;
  }
  function genCode(){
    var chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789', c='';
    for(var i=0;i<6;i++) c+=chars.charAt(Math.floor(Math.random()*chars.length));
    return c;
  }
  window.hhDPlusImport=function(){
    var old=document.getElementById('hh-dpi'); if(old) old.remove();
    var ov=document.createElement('div'); ov.id='hh-dpi';
    ov.style.cssText='position:fixed;inset:0;background:rgba(42,8,16,.78);z-index:2147483000;display:flex;align-items:flex-start;justify-content:center;padding:14px;overflow-y:auto;direction:rtl;font-family:Cairo,sans-serif;';
    ov.innerHTML='<div style="background:#F6F1E7;border:2px solid #1F4E79;border-radius:20px;max-width:600px;width:100%;overflow:hidden;margin-bottom:22px;">'
      +'<div style="background:linear-gradient(135deg,#1F4E79,#12304d);color:#fff;padding:14px 17px;display:flex;justify-content:space-between;align-items:center;">'
      +'<div><div style="font-weight:900;font-size:1rem;">استيراد الطلاب من Excel</div>'
      +'<div style="font-size:.7rem;opacity:.86;">عمود «الفصل» في الملف ينشئ الفصول تلقائياً</div></div>'
      +'<button onclick="document.getElementById(\'hh-dpi\').remove()" style="background:none;border:none;color:#fff;font-size:1.15rem;cursor:pointer;">✕</button></div>'
      +'<div style="padding:14px 17px;">'
      +'<input type="file" id="dpi-file" accept=".csv,.txt,text/csv" style="width:100%;font-family:Cairo;font-size:.77rem;margin-bottom:6px;">'
      +'<div style="font-size:.66rem;color:#8A7A63;line-height:1.8;margin-bottom:8px;">من Excel: ملف ← حفظ باسم ← CSV UTF-8 · الأعمدة: الاسم، الرقم، الفصل</div>'
      +'<textarea id="dpi-text" rows="7" placeholder="أو الصق هنا: الاسم، الرقم، الفصل&#10;أحمد محمد,10201,السابع (أ)&#10;سارة علي,10202,السابع (ب)" style="width:100%;border:1.5px solid #EDE3CE;border-radius:10px;padding:9px 12px;font-family:Cairo;font-size:.78rem;line-height:1.9;box-sizing:border-box;resize:vertical;"></textarea>'
      +'<button id="dpi-prev" style="background:#1F4E79;color:#fff;border:none;border-radius:10px;padding:9px 20px;font-family:Cairo;font-weight:900;font-size:.78rem;cursor:pointer;margin-top:9px;">معاينة</button>'
      +'<div id="dpi-preview" style="margin-top:10px;"></div>'
      +'</div></div>';
    document.body.appendChild(ov);
    var rowsCache=[];
    document.getElementById('dpi-file').onchange=function(){
      var f=this.files&&this.files[0]; if(!f)return;
      var r=new FileReader();
      r.onload=function(e){ document.getElementById('dpi-text').value=String(e.target.result||''); };
      r.readAsText(f,'utf-8');
    };
    document.getElementById('dpi-prev').onclick=function(){
      rowsCache=parseRows(document.getElementById('dpi-text').value);
      var box=document.getElementById('dpi-preview');
      if(!rowsCache.length){ box.innerHTML='<div style="color:#8A1538;font-weight:800;font-size:.76rem;">لم يُقرأ أي اسم</div>'; return; }
      var groups={};
      rowsCache.forEach(function(r){ var g=r.cls||'بدون فصل'; (groups[g]=groups[g]||[]).push(r); });
      box.innerHTML=Object.keys(groups).map(function(g){
        return '<div style="background:#FFFDF8;border:1px solid #EDE3CE;border-radius:10px;padding:8px 11px;margin-bottom:6px;">'
          +'<b style="font-size:.74rem;color:#1F4E79;">'+esc2(g)+'</b> <span style="font-size:.66rem;color:#8A7A63;font-weight:800;">'+groups[g].length+' طالباً</span></div>';
      }).join('')
      +'<button id="dpi-go" style="width:100%;background:linear-gradient(135deg,#3D6B53,#274a38);color:#fff;border:none;border-radius:11px;padding:11px;font-family:Cairo;font-weight:900;font-size:.82rem;cursor:pointer;margin-top:6px;">استيراد '+rowsCache.length+' طالباً الآن</button>';
      document.getElementById('dpi-go').onclick=async function(){
        this.disabled=true; this.textContent='جارٍ الاستيراد…';
        var groups2={};
        rowsCache.forEach(function(r){ var g=(r.cls||'').trim(); (groups2[g]=groups2[g]||[]).push(r); });
        var madeCls=0, added=0;
        try{
          var existing={};
          var qs=await db().collection('classrooms').where('teacherId','==',currentUser.uid).get();
          qs.forEach(function(d){ var c=d.data(); existing[(c.className||'').trim()]=d.id; });
          var names=Object.keys(groups2);
          for(var gi=0; gi<names.length; gi++){
            var gName=names[gi];
            var code = gName ? existing[gName] : '';
            if(gName && !code){
              code=genCode();
              await db().collection('classrooms').doc(code).set({
                code:code, className:gName, schoolName:'', subject:'',
                teacherId:currentUser.uid, active:true, studentCount:0,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
              });
              existing[gName]=code; madeCls++;
            }
            var grp=groups2[gName];
            await Promise.all(grp.map(function(r){
              return db().collection('classroom_students').add({
                classCode:code||'', teacherId:currentUser.uid,
                studentName:r.name, name:r.name, sid:r.sid||'', email:r.email||'',
                active:true, addedAt: firebase.firestore.FieldValue.serverTimestamp()
              }).then(function(){ added++; });
            }));
            if(code){
              try{ await db().collection('classrooms').doc(code).set({ studentCount: firebase.firestore.FieldValue.increment(grp.length) },{merge:true}); }catch(e){}
            }
          }
          toast2((madeCls?('أُنشئ '+madeCls+' فصول و'):'')+'استُورد '+added+' طالباً','success');
          document.getElementById('hh-dpi').remove();
        }catch(e){
          console.warn(e);
          toast2('تعذر الاستيراد، تحقق من الاتصال والصلاحيات','error');
          this.disabled=false; this.textContent='إعادة المحاولة';
        }
      };
    };
  };

  // ═══ لوحة المدير: المدارس والفصول والطلاب ═══
  window.hhDPlusAdminSchools=async function(){
    if(!(typeof hhIsAdmin==='function' && hhIsAdmin())){ toast2('هذه اللوحة للمدير فقط','error'); return; }
    var old=document.getElementById('hh-dpa'); if(old) old.remove();
    var ov=document.createElement('div'); ov.id='hh-dpa';
    ov.style.cssText='position:fixed;inset:0;background:rgba(42,8,16,.8);z-index:2147483000;display:flex;align-items:flex-start;justify-content:center;padding:14px;overflow-y:auto;direction:rtl;font-family:Cairo,sans-serif;';
    ov.innerHTML='<div style="background:#F6F1E7;border:2px solid #B8924A;border-radius:20px;max-width:680px;width:100%;padding:40px;text-align:center;font-weight:900;color:#8A6D2E;">جارٍ جمع البيانات…</div>';
    document.body.appendChild(ov);
    var teachers={}, rooms=[], counts={};
    try{
      var ts=await db().collection('teacher_requests').where('status','==','approved').limit(200).get();
      ts.forEach(function(d){ teachers[d.id]=d.data(); });
      var cs=await db().collection('classrooms').limit(500).get();
      cs.forEach(function(d){ var c=d.data(); if(c.active!==false) rooms.push(Object.assign({code:d.id}, c)); });
      var ss=await db().collection('classroom_students').limit(1000).get();
      ss.forEach(function(d){ var x=d.data(); if(x.active!==false){ counts[x.classCode]=(counts[x.classCode]||[]); counts[x.classCode].push(x.studentName||x.name||'طالب'); } });
    }catch(e){
      ov.innerHTML='<div style="background:#F6F1E7;border-radius:20px;padding:30px;text-align:center;font-weight:900;color:#8A1538;">تعذر جلب البيانات، تحقق من الاتصال والصلاحيات</div>';
      return;
    }
    var schools={};
    rooms.forEach(function(c){
      var T=teachers[c.teacherId]||{};
      var sch=(T.school||c.schoolName||'غير محددة').trim()||'غير محددة';
      var S=(schools[sch]=schools[sch]||{teachers:{},classes:[],students:0});
      if(c.teacherId) S.teachers[c.teacherId]=T.name||T.email||'معلم';
      var list=counts[c.code]||[];
      S.students+=list.length;
      S.classes.push({name:c.className||'فصل', n:list.length, list:list});
    });
    var names=Object.keys(schools).sort(function(a,b){ return schools[b].students-schools[a].students; });
    var totT=Object.keys(teachers).length, totC=rooms.length;
    var totS=names.reduce(function(a,n){return a+schools[n].students;},0);
    function stat(v,l,c){ return '<div style="background:#FFFDF8;border:1.5px solid #EDE3CE;border-radius:12px;padding:10px 6px;text-align:center;">'
      +'<div style="font-weight:900;font-size:1.15rem;color:'+c+';">'+v+'</div><div style="font-size:.62rem;font-weight:800;color:#8a7a60;">'+l+'</div></div>'; }
    var rows=names.map(function(n,i){
      var S=schools[n];
      var cls=S.classes.map(function(c){
        var chips=c.list.length?('<div style="display:flex;gap:3px;flex-wrap:wrap;margin-top:4px;">'
          +c.list.map(function(x){return '<span style="background:#FBF5E9;border:1px solid #E8DCC2;border-radius:12px;padding:2px 9px;font-size:.62rem;font-weight:800;color:#3D0918;">'+esc2(x)+'</span>';}).join('')+'</div>'):'';
        return '<div style="background:#FBF5E9;border-radius:9px;padding:7px 10px;margin-top:5px;">'
          +'<span style="font-weight:900;font-size:.7rem;color:#8A1538;">'+esc2(c.name)+'</span>'
          +'<span style="font-size:.64rem;font-weight:800;color:#8A6D2E;margin-right:8px;">'+c.n+' طالباً</span>'+chips+'</div>';
      }).join('');
      return '<div style="background:#FFFDF8;border:1.5px solid #EDE3CE;border-radius:13px;padding:10px 13px;margin-bottom:8px;">'
        +'<div data-sch="'+i+'" style="display:flex;justify-content:space-between;align-items:center;cursor:pointer;gap:8px;">'
        +'<span style="font-weight:900;font-size:.8rem;color:#2b1016;">'+esc2(n)+'</span>'
        +'<span style="font-size:.64rem;font-weight:800;color:#8A6D2E;flex-shrink:0;">'+Object.keys(S.teachers).length+' معلم · '+S.classes.length+' فصل · '+S.students+' طالب</span></div>'
        +'<div id="dpa-'+i+'" style="display:none;">'+cls+'</div></div>';
    }).join('') || '<div style="text-align:center;color:#8A7A63;font-weight:800;padding:20px;">لا بيانات بعد</div>';
    ov.innerHTML='<div style="background:#F6F1E7;border:2px solid #B8924A;border-radius:20px;max-width:680px;width:100%;overflow:hidden;margin-bottom:22px;">'
      +'<div style="background:linear-gradient(135deg,#4A0B1E,#5E0E26);color:#F5E6C4;padding:14px 17px;display:flex;justify-content:space-between;align-items:center;">'
      +'<div><div style="font-weight:900;font-size:1rem;">المدارس والطلاب</div>'
      +'<div style="font-size:.7rem;opacity:.85;">لوحة المدير · اضغط أي مدرسة للتفاصيل</div></div>'
      +'<button onclick="document.getElementById(\'hh-dpa\').remove()" style="background:none;border:none;color:#F5E6C4;font-size:1.15rem;cursor:pointer;">✕</button></div>'
      +'<div style="padding:13px 16px;">'
      +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px;">'
      + stat(names.length,'مدرسة','#4A0B1E') + stat(totT,'معلماً','#1F4E79') + stat(totC,'فصلاً','#8A6D2E') + stat(totS,'طالباً','#3D6B53')
      +'</div>'+rows+'</div></div>';
    ov.querySelectorAll('[data-sch]').forEach(function(h){ h.onclick=function(){
      var e=document.getElementById('dpa-'+h.getAttribute('data-sch'));
      if(e) e.style.display=e.style.display==='none'?'block':'none';
    }; });
  };

})();

// ═══════════════════════════════════════════════════════════
//  توسعة ملف الطالب: الشخصية · أولياء الأمر · التواصل ·
//  خطة الدعم · رأي المعلم والرسم الأسبوعي · تبويب التقرير
// ═══════════════════════════════════════════════════════════
(function(){
  'use strict';
  function db(){ return firebase.firestore(); }
  function esc2(s){ return (typeof esc==='function') ? esc(s) : String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function toast2(m,k){ if(typeof toast==='function') toast(m,k||'info'); }
  function today(){ return new Date().toISOString().slice(0,10); }
  function rec(){ return window._hhSfRec||{}; }
  function sid(){ return window._hhSfId||''; }
  function rerender(tab){ if(window._hhSfRender) window._hhSfRender(tab); }
  function saveField(obj, done){
    db().collection('student_records').doc(sid()).set(obj,{merge:true})
      .then(function(){ Object.assign(rec(), obj); if(done) done(); })
      .catch(function(){ toast2('تعذر الحفظ، تحقق من الاتصال','error'); });
  }
  var REL=['الأب','الأم','الأخ','الأخت','الجد','الجدة','الوصي'];
  var DISP=[['high','متعاون جداً','#3D6B53'],['ok','مستجيب','#1F4E79'],['mid','متوسط التجاوب','#B8924A'],['low','يصعب الوصول إليه','#8A1538']];
  var CKINDS=['اتصال هاتفي','رسالة نصية','اجتماع','بريد إلكتروني','مقابلة في المدرسة'];
  var PHRASES=[
    'أشكر لكم متابعتكم المستمرة لابنكم.',
    'لمسنا تحسناً واضحاً ونرجو تعزيزه في المنزل.',
    'نرجو متابعة حل الواجبات اليومية والتوقيع عليها.',
    'اتفقنا على تقرير أسبوعي مختصر عن مستواه.',
    'ندعوكم لزيارة المدرسة لمناقشة خطة الدعم.'];
  var STR_BANK=['قيادة','ثقة بالنفس','تعاون','إلقاء متميز','تنظيم','مبادرة','إبداع','خلق رفيع','حفظ سريع','روح رياضية'];
  var GRO_BANK=['التركيز داخل الحصة','إدارة الوقت','الالتزام بالواجبات','الجرأة في المشاركة','الخط والترتيب','ضبط الانفعال','التحضير المسبق','العمل ضمن فريق'];
  var PSTATUS=[['new','جديدة','#1F4E79'],['run','قيد التنفيذ','#B8924A'],['up','تحسن','#3D6B53'],['done','مكتملة','#3D6B53'],['need','تحتاج تدخلاً','#8A1538']];
  function box(title, inner, extraHead){
    return '<div style="margin-bottom:16px;"><div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px;">'
      +'<div style="display:flex;align-items:center;gap:8px;"><span style="width:4px;height:16px;background:linear-gradient(#EAD9B0,#B8924A);border-radius:9px;"></span>'
      +'<b style="color:#3D0918;font-size:.92rem;font-weight:900;">'+title+'</b></div>'+(extraHead||'')+'</div>'+inner+'</div>';
  }

  // ═══ نظرة عامة: الرأي + الرسم ═══
  window.hhSf2Extra=function(r){
    var opinion = r.opinion || (window.hhDPlusOpinionDraft?window.hhDPlusOpinionDraft(r):'');
    var op='<div style="background:#FFFDF8;border:1.5px solid #B8924A;border-radius:14px;padding:11px 13px;">'
      +'<textarea id="sf2-op" style="width:100%;box-sizing:border-box;border:1.5px solid #EDE3CE;border-radius:9px;padding:8px 10px;font-family:Cairo;font-size:.76rem;font-weight:700;line-height:1.9;min-height:76px;">'+esc2(opinion)+'</textarea>'
      +'<div style="display:flex;gap:6px;margin-top:6px;">'
      +'<button onclick="hhSf2OpSave()" style="background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;border-radius:9px;padding:7px 16px;font-family:Cairo;font-weight:900;font-size:.7rem;cursor:pointer;">حفظ الرأي</button>'
      +'<button onclick="hhSf2OpRegen()" style="background:#FFFDF8;color:#8A6D2E;border:1.5px solid #B8924A;border-radius:9px;padding:7px 13px;font-family:Cairo;font-weight:900;font-size:.7rem;cursor:pointer;">إعادة توليد</button>'
      +'</div></div>';
    return box('رأي المعلم'+(r.opinion?'':' (صياغة تلقائية)'), op) + chartBox(r);
  };
  window.hhSf2OpSave=function(){
    var t=((document.getElementById('sf2-op')||{}).value||'').trim().slice(0,700);
    if(!t) return;
    saveField({opinion:t}, function(){ toast2('حُفظ رأي المعلم','success'); });
  };
  window.hhSf2OpRegen=function(){
    var ta=document.getElementById('sf2-op');
    if(ta && window.hhDPlusOpinionDraft) ta.value=window.hhDPlusOpinionDraft(rec());
  };
  function weekStats(r, back){
    var end=new Date(); end.setDate(end.getDate()-7*back);
    var start=new Date(end); start.setDate(start.getDate()-6);
    var a=start.toISOString().slice(0,10), b=end.toISOString().slice(0,10);
    function inW(x){ return (x.date||'')>=a && (x.date||'')<=b; }
    var att=(r.attendance||[]).filter(inW), hw=(r.homework||[]).filter(inW), gr=(r.grades||[]).filter(inW).filter(function(g){return typeof g.score==='number';});
    var p=att.filter(function(x){return x.status==='present'||x.status==='late';}).length;
    var d=hw.filter(function(x){return x.status==='done'||x.status==='hwlate'||x.done===true;}).length;
    return {
      att: att.length?Math.round(p/att.length*100):null,
      hw: hw.length?Math.round(d/hw.length*100):null,
      avg: gr.length?Math.round(gr.reduce(function(s,g){return s+g.score;},0)/gr.length):null
    };
  }
  function chartBox(r){
    var weeks=[]; for(var w=5;w>=0;w--) weeks.push(weekStats(r,w));
    if(!weeks.some(function(x){return x.att!==null||x.hw!==null||x.avg!==null;})) return '';
    var W=340,H=110,pad=16,bw=10;
    var svg='<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;height:auto;display:block;">';
    [25,50,75,100].forEach(function(g){
      var y=H-14-(g/100)*(H-30);
      svg+='<line x1="'+pad+'" y1="'+y+'" x2="'+(W-4)+'" y2="'+y+'" stroke="#F1EBDF" stroke-width="1"/>';
    });
    weeks.forEach(function(wk,i){
      var x0=pad+8+i*((W-pad-16)/6);
      [[wk.att,'#3D6B53'],[wk.avg,'#1F4E79'],[wk.hw,'#B8924A']].forEach(function(sr,j){
        if(sr[0]===null) return;
        var h=(sr[0]/100)*(H-30);
        svg+='<rect x="'+(x0+j*(bw+2))+'" y="'+(H-14-h)+'" width="'+bw+'" height="'+h+'" rx="2.5" fill="'+sr[1]+'"/>';
      });
      svg+='<text x="'+(x0+bw*1.5)+'" y="'+(H-3)+'" font-size="8" font-weight="800" fill="#a99" text-anchor="middle" font-family="Cairo">'+(i===5?'هذا الأسبوع':'أسبوع '+(6-i))+'</text>';
    });
    svg+='</svg>';
    return box('التطور خلال ستة أسابيع',
      '<div style="background:#FFFDF8;border:1.5px solid #EDE3CE;border-radius:14px;padding:10px 8px 4px;">'+svg
      +'<div style="display:flex;gap:11px;justify-content:center;padding:5px 0 7px;font-size:.62rem;font-weight:800;">'
      +'<span style="color:#3D6B53;">■ الانتظام</span><span style="color:#1F4E79;">■ التحصيل</span><span style="color:#B8924A;">■ الواجبات</span></div></div>');
  }

  // ═══ محتوى التبويبات الجديدة ═══
  window.hhSf2TabHtml=function(tab, r){
    if(tab==='traits'){
      var tr=r.traits||{strength:[],growth:[]};
      function blk(kind,label,bank,col){
        var mine=tr[kind]||[];
        var chips=mine.map(function(t,i){
          return '<span onclick="hhSf2TraitDel(\''+kind+'\','+i+')" title="اضغط للحذف" style="background:'+col+';color:#fff;border-radius:15px;padding:4px 12px;font-size:.68rem;font-weight:900;cursor:pointer;">'+esc2(t)+'</span>';
        }).join(' ');
        var have={}; mine.forEach(function(t){have[t]=1;});
        var sugg=bank.filter(function(b){return !have[b];}).slice(0,6).map(function(b){
          return '<span onclick="hhSf2TraitAdd(\''+kind+'\',\''+b+'\')" style="background:#FFFDF8;border:1.5px dashed '+col+';color:'+col+';border-radius:15px;padding:3px 11px;font-size:.66rem;font-weight:800;cursor:pointer;">+ '+b+'</span>';
        }).join(' ');
        return box(label, '<div style="display:flex;gap:5px;flex-wrap:wrap;">'+chips+(chips&&sugg?' ':'')+sugg+'</div>',
          '<button onclick="hhSf2TraitCustom(\''+kind+'\')" style="background:none;border:none;color:'+col+';font-family:Cairo;font-weight:900;font-size:.66rem;cursor:pointer;text-decoration:underline;">كتابة حرة</button>');
      }
      return '<div style="font-size:.7rem;color:#8A7A63;font-weight:700;margin-bottom:12px;">صورة شخصية الطالب: تظهر في رأي المعلم والتقرير، وهدفها بناء شخصية قوية أو رعاية من يحتاج العناية</div>'
        + blk('strength','نقاط القوة',STR_BANK,'#3D6B53')
        + blk('growth','نقاط التطوير',GRO_BANK,'#8A1538');
    }
    if(tab==='guard'){
      var gs=r.guardians||[];
      var list=gs.map(function(g,i){
        var d=DISP.filter(function(x){return x[0]===g.disposition;})[0]||DISP[1];
        return '<span onclick="hhSf2GuardDel('+i+')" title="اضغط للحذف" style="background:#FFFDF8;border:1.5px solid '+d[2]+';border-radius:16px;padding:5px 13px;font-size:.7rem;font-weight:900;color:'+d[2]+';cursor:pointer;">'
          +esc2(g.relation||'ولي أمر')+(g.name?' · '+esc2(g.name):'')+' · '+d[1]+'</span>';
      }).join(' ') || '<span style="font-size:.7rem;color:#8A7A63;font-weight:700;">لم يُسجل ولي أمر بعد</span>';
      var rel=REL.map(function(x){return '<option>'+x+'</option>';}).join('');
      var disp=DISP.map(function(x){return '<option value="'+x[0]+'">'+x[1]+'</option>';}).join('');
      return box('أولياء الأمر','<div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:12px;">'+list+'</div>')
        + box('إضافة ولي أمر',
          '<div style="background:#FFFDF8;border:1.5px solid #EDE3CE;border-radius:14px;padding:12px 13px;">'
          +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">'
          +'<select id="sf2-grel" style="border:1.5px solid #EDE3CE;border-radius:9px;padding:7px;font-family:Cairo;font-size:.74rem;font-weight:800;background:#fff;">'+rel+'</select>'
          +'<select id="sf2-gdisp" style="border:1.5px solid #EDE3CE;border-radius:9px;padding:7px;font-family:Cairo;font-size:.74rem;font-weight:800;background:#fff;">'+disp+'</select></div>'
          +'<input id="sf2-gname" placeholder="الاسم (اختياري)" style="width:100%;box-sizing:border-box;border:1.5px solid #EDE3CE;border-radius:9px;padding:8px 10px;font-family:Cairo;font-size:.75rem;font-weight:700;margin-bottom:8px;">'
          +'<button onclick="hhSf2GuardAdd()" style="background:linear-gradient(135deg,#3D6B53,#274a38);color:#fff;border:none;border-radius:10px;padding:9px 20px;font-family:Cairo;font-weight:900;font-size:.76rem;cursor:pointer;">حفظ</button></div>');
    }
    if(tab==='contact'){
      var cs=(r.contacts||[]).slice().reverse();
      var list=cs.map(function(c){
        return '<div style="background:#FFFDF8;border:1.5px solid #EDE3CE;border-radius:12px;padding:10px 13px;margin-bottom:7px;">'
          +'<div style="display:flex;justify-content:space-between;gap:7px;">'
          +'<span style="font-weight:900;font-size:.74rem;color:#3D0918;">'+esc2(c.kind||'اتصال')+(c.relation?' مع '+esc2(c.relation):'')+'</span>'
          +'<span style="font-size:.64rem;color:#B8AD94;font-weight:700;">'+esc2(c.date||'')+'</span></div>'
          +(c.reason?'<div style="font-size:.7rem;color:#5E0E26;font-weight:800;margin-top:3px;">'+esc2(c.reason)+'</div>':'')
          +(c.text?'<div style="font-size:.68rem;color:#6a5a48;font-weight:700;margin-top:2px;line-height:1.7;">'+esc2(c.text)+'</div>':'')
          +(c.review?'<div style="font-size:.64rem;color:#8A1538;font-weight:800;margin-top:3px;">متابعة قادمة: '+esc2(c.review)+'</div>':'')
          +'</div>';
      }).join('') || '<div style="font-size:.7rem;color:#8A7A63;font-weight:700;">لا تواصل مسجل بعد</div>';
      var gsel=(r.guardians||[]).map(function(g){
        var d=DISP.filter(function(x){return x[0]===g.disposition;})[0]||DISP[1];
        return '<option>'+esc2(g.relation+(g.name?' · '+g.name:'')+' ('+d[1]+')')+'</option>';
      }).join('');
      var phr=PHRASES.map(function(p,i){
        return '<button onclick="hhSf2Phrase('+i+')" style="background:#FBF5E9;border:1px solid #E8DCC2;border-radius:13px;padding:3px 10px;font-family:Cairo;font-weight:800;font-size:.62rem;color:#5a4a30;cursor:pointer;margin:2px;">'+esc2(p.slice(0,28))+(p.length>28?'…':'')+'</button>';
      }).join('');
      return box('تسجيل تواصل جديد',
        '<div style="background:#FFFDF8;border:1.5px solid #EDE3CE;border-radius:14px;padding:12px 13px;">'
        +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">'
        +'<select id="sf2-ckind" style="border:1.5px solid #EDE3CE;border-radius:9px;padding:7px;font-family:Cairo;font-size:.74rem;font-weight:800;background:#fff;">'+CKINDS.map(function(k){return '<option>'+k+'</option>';}).join('')+'</select>'
        +'<input id="sf2-crev" type="date" style="border:1.5px solid #EDE3CE;border-radius:9px;padding:7px;font-family:Cairo;font-size:.72rem;">'
        +'</div>'
        +(gsel?'<select id="sf2-cguard" style="width:100%;box-sizing:border-box;border:1.5px solid #EDE3CE;border-radius:9px;padding:7px;font-family:Cairo;font-size:.74rem;font-weight:800;background:#fff;margin-bottom:8px;">'+gsel+'</select>':'')
        +'<input id="sf2-creason" placeholder="سبب التواصل" style="width:100%;box-sizing:border-box;border:1.5px solid #EDE3CE;border-radius:9px;padding:8px 10px;font-family:Cairo;font-size:.75rem;font-weight:700;margin-bottom:7px;">'
        +'<div style="margin-bottom:6px;">'+phr+'</div>'
        +'<textarea id="sf2-ctext" placeholder="ملخص الحديث والإجراء المتفق عليه" style="width:100%;box-sizing:border-box;border:1.5px solid #EDE3CE;border-radius:9px;padding:8px 10px;font-family:Cairo;font-size:.75rem;min-height:64px;margin-bottom:8px;"></textarea>'
        +'<button onclick="hhSf2ContactSave()" style="background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;border-radius:10px;padding:9px 20px;font-family:Cairo;font-weight:900;font-size:.76rem;cursor:pointer;">حفظ التواصل</button></div>')
        + box('السجل', list);
    }
    if(tab==='plans'){
      var ps=(r.plans||[]).slice().reverse();
      var list=ps.map(function(p){
        var st=PSTATUS.filter(function(x){return x[0]===p.status;})[0]||PSTATUS[0];
        return '<div style="background:#FFFDF8;border:1.5px solid '+st[2]+';border-radius:12px;padding:11px 13px;margin-bottom:7px;">'
          +'<div style="display:flex;justify-content:space-between;gap:7px;align-items:center;">'
          +'<span style="font-weight:900;font-size:.76rem;color:#3D0918;">'+esc2(p.reason||p.title||'خطة')+'</span>'
          +'<span style="background:'+st[2]+';color:#fff;border-radius:11px;padding:2px 10px;font-size:.62rem;font-weight:900;">'+st[1]+'</span></div>'
          +(p.strength?'<div style="font-size:.68rem;color:#3D6B53;font-weight:700;margin-top:3px;">نقطة القوة: '+esc2(p.strength)+'</div>':'')
          +(p.goal?'<div style="font-size:.68rem;color:#6a5a48;font-weight:700;margin-top:2px;">الهدف: '+esc2(p.goal)+'</div>':'')
          +(p.action?'<div style="font-size:.68rem;color:#6a5a48;font-weight:700;margin-top:2px;">الإجراء: '+esc2(p.action)+'</div>':'')
          +(p.review?'<div style="font-size:.64rem;color:#8A1538;font-weight:800;margin-top:3px;">المراجعة: '+esc2(p.review)+'</div>':'')
          +'</div>';
      }).join('') || '<div style="font-size:.7rem;color:#8A7A63;font-weight:700;">لا خطط بعد</div>';
      return box('خطة دعم جديدة',
        '<div style="background:#FFFDF8;border:1.5px solid #EDE3CE;border-radius:14px;padding:12px 13px;">'
        +'<input id="sf2-preason" placeholder="سبب المتابعة" style="width:100%;box-sizing:border-box;border:1.5px solid #EDE3CE;border-radius:9px;padding:8px 10px;font-family:Cairo;font-size:.75rem;font-weight:700;margin-bottom:7px;">'
        +'<input id="sf2-pstrength" placeholder="نقطة قوة نبني عليها" style="width:100%;box-sizing:border-box;border:1.5px solid #EDE3CE;border-radius:9px;padding:8px 10px;font-family:Cairo;font-size:.75rem;font-weight:700;margin-bottom:7px;">'
        +'<input id="sf2-pgoal" placeholder="الهدف" style="width:100%;box-sizing:border-box;border:1.5px solid #EDE3CE;border-radius:9px;padding:8px 10px;font-family:Cairo;font-size:.75rem;font-weight:700;margin-bottom:7px;">'
        +'<input id="sf2-paction" placeholder="الإجراء المتفق عليه" style="width:100%;box-sizing:border-box;border:1.5px solid #EDE3CE;border-radius:9px;padding:8px 10px;font-family:Cairo;font-size:.75rem;font-weight:700;margin-bottom:7px;">'
        +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">'
        +'<input id="sf2-preview" type="date" style="border:1.5px solid #EDE3CE;border-radius:9px;padding:7px;font-family:Cairo;font-size:.72rem;">'
        +'<select id="sf2-pstatus" style="border:1.5px solid #EDE3CE;border-radius:9px;padding:7px;font-family:Cairo;font-size:.74rem;font-weight:800;background:#fff;">'+PSTATUS.map(function(x){return '<option value="'+x[0]+'">'+x[1]+'</option>';}).join('')+'</select></div>'
        +'<button onclick="hhSf2PlanSave()" style="background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;border-radius:10px;padding:9px 20px;font-family:Cairo;font-weight:900;font-size:.76rem;cursor:pointer;">حفظ الخطة</button></div>')
        + box('الخطط الحالية', list);
    }
    if(tab==='report'){
      return box('تقرير الطالب',
        '<div style="display:flex;gap:8px;flex-wrap:wrap;">'
        +'<button onclick="if(window.hhDPlusStudentReport)hhDPlusStudentReport(window._hhSfRec)" style="flex:1;min-width:150px;background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;border-radius:12px;padding:12px;font-family:Cairo;font-weight:900;font-size:.82rem;cursor:pointer;">تقرير PDF للطباعة</button>'
        +'<button onclick="window._hhDPlusLastRec=window._hhSfRec;if(window.hhDPlusStudentCsv)hhDPlusStudentCsv()" style="flex:1;min-width:150px;background:#FFFDF8;color:#3D6B53;border:1.5px solid #3D6B53;border-radius:12px;padding:12px;font-family:Cairo;font-weight:900;font-size:.82rem;cursor:pointer;">تنزيل Excel</button>'
        +'</div>'
        +'<div style="font-size:.68rem;color:#8A7A63;font-weight:700;margin-top:9px;line-height:1.8;">يشمل التقرير المؤشرات والدرجات والملاحظات وخطة الدعم ورأي المعلم، بشعار المدرسة واسمي المعلم والمنسق وفراغات التوقيع. عدّل ذلك كله من زر الإعدادات في الدفتر الذكي.</div>')
        + box('إعدادات التقرير','<button onclick="if(window.hhDPlusSettings)hhDPlusSettings()" style="background:#FFFDF8;color:#8A6D2E;border:1.5px solid #B8924A;border-radius:11px;padding:10px 18px;font-family:Cairo;font-weight:900;font-size:.76rem;cursor:pointer;">⚙ فتح الإعدادات</button>');
    }
    return '';
  };
  window.hhSf2AfterRender=function(){};
  // إجراءات الحفظ
  window.hhSf2TraitAdd=function(kind,text){
    var tr=rec().traits||{strength:[],growth:[]};
    tr[kind]=tr[kind]||[];
    if(tr[kind].indexOf(text)>=0) return;
    tr[kind]=tr[kind].concat([String(text).slice(0,60)]);
    saveField({traits:tr}, function(){ rerender('traits'); });
  };
  window.hhSf2TraitCustom=function(kind){
    var t=prompt(kind==='strength'?'نقطة قوة جديدة:':'نقطة تطوير جديدة:');
    if(t&&t.trim()) window.hhSf2TraitAdd(kind, t.trim());
  };
  window.hhSf2TraitDel=function(kind,i){
    var tr=rec().traits||{strength:[],growth:[]};
    (tr[kind]||[]).splice(i,1);
    saveField({traits:tr}, function(){ rerender('traits'); });
  };
  window.hhSf2GuardAdd=function(){
    var g={ relation:((document.getElementById('sf2-grel')||{}).value)||'الأب',
            disposition:((document.getElementById('sf2-gdisp')||{}).value)||'ok',
            name:(((document.getElementById('sf2-gname')||{}).value)||'').trim().slice(0,60),
            at:Date.now() };
    var gs=(rec().guardians||[]).concat([g]);
    saveField({guardians:gs}, function(){ toast2('أُضيف ولي الأمر','success'); rerender('guard'); });
  };
  window.hhSf2GuardDel=function(i){
    if(!window.confirm('حذف ولي الأمر هذا؟')) return;
    var gs=(rec().guardians||[]).slice(); gs.splice(i,1);
    saveField({guardians:gs}, function(){ rerender('guard'); });
  };
  window.hhSf2Phrase=function(i){
    var t=document.getElementById('sf2-ctext');
    if(t) t.value=(t.value?t.value+' ':'')+PHRASES[i];
  };
  window.hhSf2ContactSave=function(){
    var reason=(((document.getElementById('sf2-creason')||{}).value)||'').trim().slice(0,200);
    if(!reason){ toast2('اكتب سبب التواصل أولاً','info'); return; }
    var gsel=document.getElementById('sf2-cguard');
    var c={ kind:((document.getElementById('sf2-ckind')||{}).value)||CKINDS[0],
            relation: gsel&&gsel.value ? gsel.value.split(' ·')[0].split(' (')[0] : '',
            reason:reason,
            text:(((document.getElementById('sf2-ctext')||{}).value)||'').trim().slice(0,500),
            review:(((document.getElementById('sf2-crev')||{}).value)||''),
            date:today(), at:Date.now() };
    db().collection('student_records').doc(sid()).set({
      contacts: firebase.firestore.FieldValue.arrayUnion(c)
    },{merge:true}).then(function(){
      rec().contacts=(rec().contacts||[]).concat([c]);
      toast2('سُجّل التواصل','success'); rerender('contact');
    }).catch(function(){ toast2('تعذر الحفظ','error'); });
  };
  window.hhSf2PlanSave=function(){
    var reason=(((document.getElementById('sf2-preason')||{}).value)||'').trim().slice(0,200);
    if(!reason){ toast2('اكتب سبب المتابعة أولاً','info'); return; }
    var stVal=((document.getElementById('sf2-pstatus')||{}).value)||'new';
    var stLbl=(PSTATUS.filter(function(x){return x[0]===stVal;})[0]||PSTATUS[0])[1];
    var p={ type:'support', reason:reason,
            strength:(((document.getElementById('sf2-pstrength')||{}).value)||'').trim().slice(0,200),
            goal:(((document.getElementById('sf2-pgoal')||{}).value)||'').trim().slice(0,200),
            action:(((document.getElementById('sf2-paction')||{}).value)||'').trim().slice(0,200),
            review:(((document.getElementById('sf2-preview')||{}).value)||''),
            status:stVal, statusLabel:stLbl, date:today(), at:Date.now() };
    db().collection('student_records').doc(sid()).set({
      plans: firebase.firestore.FieldValue.arrayUnion(p)
    },{merge:true}).then(function(){
      rec().plans=(rec().plans||[]).concat([p]);
      toast2('حُفظت خطة الدعم','success'); rerender('plans');
    }).catch(function(){ toast2('تعذر الحفظ','error'); });
  };
})();

// ═══════════════════════════════════════════════════════════
//  نوافذ ملكية عامة: تأكيد وإدخال (بديل نوافذ المتصفح)
// ═══════════════════════════════════════════════════════════
(function(){
  'use strict';
  function base(inner){
    var ov=document.createElement('div');
    ov.className='hh-royal-dlg';
    ov.style.cssText='position:fixed;inset:0;background:rgba(42,8,16,.78);z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;direction:rtl;font-family:Cairo,sans-serif;';
    ov.innerHTML='<div style="background:#FFFDF8;border:2px solid #B8924A;border-radius:20px;max-width:380px;width:100%;padding:20px 19px;text-align:center;">'+inner+'</div>';
    document.body.appendChild(ov);
    return ov;
  }
  window._hhRoyalConfirm=function(title, sub, danger){
    return new Promise(function(res){
      var ov=base('<div style="font-weight:900;font-size:.95rem;color:'+(danger?'#8A1538':'#3D0918')+';margin-bottom:6px;">'+title+'</div>'
        +(sub?'<div style="font-size:.72rem;color:#8A7A63;font-weight:700;line-height:1.9;margin-bottom:13px;">'+sub+'</div>':'<div style="height:8px;"></div>')
        +'<div style="display:flex;gap:8px;">'
        +'<button class="rc-ok" style="flex:1;background:linear-gradient(135deg,'+(danger?'#8A1538,#5E0E26':'#3D6B53,#274a38')+');color:#F5E6C4;border:none;border-radius:11px;padding:11px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;">تأكيد</button>'
        +'<button class="rc-no" style="background:#FFFDF8;color:#999;border:1.5px solid #ddd;border-radius:11px;padding:11px 16px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;">إلغاء</button></div>');
      ov.querySelector('.rc-ok').onclick=function(){ ov.remove(); res(true); };
      ov.querySelector('.rc-no').onclick=function(){ ov.remove(); res(false); };
    });
  };
  window._hhRoyalPrompt=function(title, def, ph){
    return new Promise(function(res){
      var ov=base('<div style="font-weight:900;font-size:.92rem;color:#3D0918;margin-bottom:11px;">'+title+'</div>'
        +'<input class="rp-in" value="'+String(def||'').replace(/"/g,'&quot;')+'" placeholder="'+(ph||'')+'" style="width:100%;box-sizing:border-box;border:1.5px solid #E3D9C6;border-radius:10px;padding:10px;font-family:Cairo;font-weight:800;font-size:.82rem;text-align:center;margin-bottom:12px;">'
        +'<div style="display:flex;gap:8px;">'
        +'<button class="rp-ok" style="flex:1;background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;border-radius:11px;padding:11px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;">حفظ</button>'
        +'<button class="rp-no" style="background:#FFFDF8;color:#999;border:1.5px solid #ddd;border-radius:11px;padding:11px 16px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;">إلغاء</button></div>');
      var inp=ov.querySelector('.rp-in');
      setTimeout(function(){ inp.focus(); inp.select(); },80);
      function ok(){ var v=inp.value.trim(); ov.remove(); res(v||null); }
      ov.querySelector('.rp-ok').onclick=ok;
      inp.onkeydown=function(e){ if(e.key==='Enter') ok(); };
      ov.querySelector('.rp-no').onclick=function(){ ov.remove(); res(null); };
    });
  };
})();

// ═══════════════════════════════════════════════════════════
//  لوحة التحكم: مركز عمليات كامل، كل شيء يُنجز من داخلها
// ═══════════════════════════════════════════════════════════
(function(){
  'use strict';
  function db(){ return firebase.firestore(); }
  function esc2(s){ return (typeof esc==='function') ? esc(s) : String(s==null?'':s); }
  function toast2(m,k){ if(typeof toast==='function') toast(m,k||'info'); }
  function today(){ return new Date().toISOString().slice(0,10); }
  function genCode(){
    var chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789', c='HH-';
    for(var i=0;i<6;i++) c+=chars.charAt(Math.floor(Math.random()*chars.length));
    return c;
  }
  var P={ rooms:[], recorded:{} };

  async function fetchData(){
    P.rooms=[]; P.recorded={}; P.certN=0;
    try{ if(window._hhDPlusLoadCfg) await window._hhDPlusLoadCfg(); }catch(e){}
    var qs=await db().collection('classrooms').where('teacherId','==',currentUser.uid).get();
    qs.forEach(function(d){ var c=d.data(); if(c.active===false||c.archived) return; P.rooms.push(Object.assign({code:d.id}, c)); });
    P.rooms.sort(function(a,b){ return (a.className||'').localeCompare(b.className||'','ar'); });
    try{
      var ss=await db().collection('follow_up_sessions').where('teacherId','==',currentUser.uid).where('date','==',today()).get();
      ss.forEach(function(d){ P.recorded[d.data().classCode]=true; });
    }catch(e){}
    try{
      var cs=await db().collection('certificates').where('teacherId','==',currentUser.uid).get();
      P.certN=cs.size||0;
    }catch(e){ P.certN=0; }
  }
  function statCard(v,l,c){
    return '<div style="background:#FFFDF8;border:1.5px solid #EDE3CE;border-radius:13px;text-align:center;padding:11px 4px;">'
      +'<div style="font-weight:900;font-size:1.3rem;color:'+c+';">'+v+'</div>'
      +'<div style="font-size:.6rem;color:#8A6D2E;font-weight:800;">'+l+'</div></div>';
  }
  function actBtn(label, col, fn, solid){
    return '<button onclick="'+fn+'" style="background:'+(solid?('linear-gradient(135deg,'+col+')'):'#FFFDF8')+';color:'+(solid?'#F5E6C4':col.split(',')[0])+';border:'+(solid?'none':'1.5px solid '+col.split(',')[0])+';border-radius:11px;padding:9px 14px;font-family:Cairo;font-weight:900;font-size:.72rem;cursor:pointer;">'+label+'</button>';
  }
  function render(){
    var old=document.getElementById('hh-tpanel'); if(old) old.remove();
    var totS=P.rooms.reduce(function(a,c){return a+(c.studentCount||0);},0);
    var recN=P.rooms.filter(function(c){return P.recorded[c.code];}).length;
    var R=(window._hhDPlusCfg&&window._hhDPlusCfg().report)||{};
    var ov=document.createElement('div'); ov.id='hh-tpanel';
    ov.style.cssText='position:fixed;inset:0;background:rgba(42,8,16,.82);z-index:2147483000;display:flex;align-items:flex-start;justify-content:center;padding:14px;overflow-y:auto;direction:rtl;font-family:Cairo,sans-serif;';
    function statCard(v,l,c){ return '<div style="background:#FFFDF8;border:1.5px solid #EDE3CE;border-radius:13px;text-align:center;padding:11px 4px;"><div style="font-weight:900;font-size:1.3rem;color:'+c+';">'+v+'</div><div style="font-size:.58rem;color:#8A6D2E;font-weight:800;">'+l+'</div></div>'; }
    function sech(t){ return '<div style="display:flex;align-items:center;gap:7px;font-weight:900;font-size:.76rem;color:#8A6D2E;margin:14px 0 8px;"><span style="width:4px;height:15px;background:linear-gradient(#EAD9B0,#B8924A);border-radius:9px;"></span>'+t+'</div>'; }
    function tile(title,sub,col,onclick){ return '<button onclick="'+onclick+'" style="background:#FFFDF8;border:1.5px solid #EDE3CE;border-right:5px solid '+col+';border-radius:13px;padding:11px 13px;text-align:right;cursor:pointer;font-family:Cairo;"><div style="font-weight:900;font-size:.78rem;color:#3D0918;">'+title+'</div><div style="font-size:.6rem;color:#8A7A63;font-weight:700;">'+sub+'</div></button>'; }
    // صفوف الفصول
    var rows=P.rooms.map(function(c){
      var rec=P.recorded[c.code];
      return '<div style="display:flex;align-items:center;gap:8px;background:#FFFDF8;border:1.5px solid #EDE3CE;border-radius:12px;padding:9px 12px;margin-bottom:6px;flex-wrap:wrap;">'
        +'<div style="flex:1;min-width:120px;"><div style="font-weight:900;font-size:.76rem;color:#3D0918;">'+esc2(c.className||'فصل')+'</div>'
        +'<div style="font-size:.6rem;color:#8A7A63;font-weight:700;">'+(c.studentCount||0)+' طالباً · <span dir="ltr">'+esc2(c.code)+'</span> · '+(rec?'<b style="color:#3D6B53;">رُصد اليوم ✓</b>':'<b style="color:#B8924A;">لم يُرصد</b>')+'</div></div>'
        +'<button onclick="hhTPGo(\''+esc2(c.code)+'\')" style="background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:none;border-radius:9px;padding:7px 13px;font-family:Cairo;font-weight:900;font-size:.64rem;cursor:pointer;">الدفتر</button>'
        +'<button onclick="hhTPRename(\''+esc2(c.code)+'\')" style="background:#fff;border:1.4px solid #1F4E79;color:#1F4E79;border-radius:9px;padding:7px 11px;font-family:Cairo;font-weight:900;font-size:.64rem;cursor:pointer;">تعديل</button>'
        +'<button onclick="hhTPDelete(\''+esc2(c.code)+'\')" style="background:#fff;border:1.4px solid #8A1538;color:#8A1538;border-radius:9px;padding:7px 11px;font-family:Cairo;font-weight:900;font-size:.64rem;cursor:pointer;">حذف</button>'
        +'</div>';
    }).join('') || '<div style="text-align:center;color:#8A7A63;font-weight:800;padding:16px;background:#FFFDF8;border:1.5px dashed #C9B37E;border-radius:13px;">لا فصول بعد، أنشئ أول فصل أو استورد ملف Excel</div>';
    // هوية المدرسة
    var logoInner = R.logo ? '<img src="'+R.logo+'" style="width:100%;height:100%;object-fit:contain;border-radius:12px;">' : '📷<br>شعار<br>المدرسة';
    var schoolBox='<div style="display:flex;gap:13px;align-items:center;background:#FFFDF8;border:1.5px solid #EDE3CE;border-radius:15px;padding:13px 15px;">'
      +'<div style="width:64px;height:64px;border-radius:14px;border:2px '+(R.logo?'solid #B8924A':'dashed #B8924A')+';display:flex;flex-direction:column;align-items:center;justify-content:center;color:#8A6D2E;font-size:.52rem;font-weight:900;text-align:center;flex-shrink:0;background:#FBF5E9;overflow:hidden;">'+logoInner+'</div>'
      +'<div style="flex:1;"><div style="font-weight:900;font-size:.9rem;color:#3D0918;">'+(R.school?esc2(R.school):'اسم مدرستك لم يُضبط بعد')+'</div>'
      +'<div style="font-size:.62rem;color:#8A7A63;font-weight:700;margin-top:3px;">يظهر الشعار والاسم على كل شهادة وتقرير · المعلم: '+(R.teacher?esc2(R.teacher):'—')+' · المنسق: '+(R.coord?esc2(R.coord):'—')+'</div></div>'
      +'<button onclick="if(window.hhDPlusSettings){document.getElementById(\'hh-tpanel\').remove();hhDPlusSettings();}" style="background:#FFFDF8;border:1.4px solid #1F4E79;color:#1F4E79;border-radius:9px;padding:6px 12px;font-family:Cairo;font-weight:900;font-size:.62rem;cursor:pointer;flex-shrink:0;">'+(R.logo?'تعديل الشعار والبيانات':'رفع الشعار وتعديل البيانات')+'</button>'
      +'</div>';
    var isAdmin=(typeof hhIsAdmin==='function' && hhIsAdmin());
    var links='<button onclick="if(window.hhSfuGuide)hhSfuGuide()" style="background:none;border:none;color:#8A6D2E;font-family:Cairo;font-weight:900;font-size:.66rem;cursor:pointer;text-decoration:underline;">الدليل الكامل</button>'
      +(isAdmin?'<span style="color:#D9C79E;">·</span><button onclick="if(window.hhDPlusAdminSchools)hhDPlusAdminSchools()" style="background:none;border:none;color:#8A6D2E;font-family:Cairo;font-weight:900;font-size:.66rem;cursor:pointer;text-decoration:underline;">لوحة المدارس (للمدير)</button>':'');
    ov.innerHTML='<div style="background:#F6F1E7;border:2px solid #B8924A;border-radius:20px;max-width:660px;width:100%;overflow:hidden;margin-bottom:24px;">'
      +'<div style="background:linear-gradient(135deg,#4A0B1E,#5E0E26);color:#F5E6C4;padding:16px 18px;display:flex;justify-content:space-between;align-items:center;">'
      +'<div><div style="font-weight:900;font-size:1.1rem;">لوحة تحكم المدرسة</div><div style="font-size:.66rem;opacity:.85;margin-top:2px;">'+(R.school?esc2(R.school)+' · ':'')+'مركز عملياتك الكامل</div></div>'
      +'<button onclick="document.getElementById(\'hh-tpanel\').remove()" style="background:none;border:none;color:#F5E6C4;font-size:1.2rem;cursor:pointer;">✕</button></div>'
      +'<div style="padding:14px 15px 4px;">'
      + sech('هوية المدرسة والتقارير') + schoolBox
      +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:12px;">'
      + statCard(P.rooms.length,'فصولي','#4A0B1E') + statCard(totS,'طلابي','#1F4E79') + statCard(recN+'/'+P.rooms.length,'رُصد اليوم','#3D6B53') + statCard(P.certN||0,'شهادة صادرة','#8A6D2E')
      +'</div>'
      + sech('فصولي وإدارتها') + rows
      +'<button onclick="hhTPNewClass()" style="width:100%;background:linear-gradient(135deg,#3D6B53,#274a38);color:#fff;border:none;border-radius:11px;padding:10px;font-family:Cairo;font-weight:900;font-size:.72rem;cursor:pointer;margin-top:3px;">+ إنشاء فصل جديد</button>'
      + sech('الأدوات والخدمات')
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">'
      + tile('استيراد الطلاب','Excel واحد يوزّع الشعب تلقائياً','#3D6B53','if(window.hhDPlusImport){document.getElementById(\'hh-tpanel\').remove();hhDPlusImport();}')
      + tile('المنهج والدروس','وحدات المنهج ودروسك الخاصة','#1F4E79','hhTPNav(\'school\')')
      + tile('الشهادات','إصدار موثق بختم المنصة','#8A6D2E','hhTPNav(\'certs\')')
      + tile('مركز القيادة','تحليل كل الفصول أسبوعياً','#5E0E26','if(window.hhDPlusSettings){}hhTPCommand()')
      + tile('قوالب الملاحظات والعدادات','خصّص أدوات الرصد','#B8924A','if(window.hhDPlusSettings){document.getElementById(\'hh-tpanel\').remove();hhDPlusSettings();}')
      + (typeof hhOpenGradebook==='function' ? tile('أدوات الدرجات المتقدمة','استيراد ودرجات مدرستي','#8A1538','document.getElementById(\'hh-tpanel\').remove();hhOpenGradebook();') : '')
      +'</div>'
      + sech('إعدادات المتابعة والتقارير')
      +'<div style="display:grid;grid-template-columns:1fr;gap:8px;">'
      + tile('الإعدادات وشعار المدرسة والتواقيع','رفع الشعار وأسماء التقارير وخيارات الإظهار','#4A0B1E','if(window.hhDPlusSettings){document.getElementById(\'hh-tpanel\').remove();hhDPlusSettings();}')
      +'</div>'
      +'<div style="padding:12px 0 16px;display:flex;gap:5px;flex-wrap:wrap;justify-content:center;border-top:1px solid #EDE3CE;margin-top:14px;">'+links+'</div>'
      +'</div></div>';
    document.body.appendChild(ov);
  }

  window.hhTeacherPanel=async function(){
    var isApproved = (typeof _hhMyRole!=='undefined' && _hhMyRole==='teacher') || (typeof hhIsAdmin==='function' && hhIsAdmin());
    if(!isApproved){ toast2('هذه الخدمة للمعلم المعتمد','info'); return; }
    // حُسمت لوحة التحكم: كانت مكررة مع القائمة الجانبية، فصار بندها يفتح
    // مباشرة إعدادات المدرسة والشعار والتقارير (أهم ما يخص المدرسة)
    if(window.hhDPlusSettings){ hhDPlusSettings(); }
    else { toast2('حدّث الصفحة لتحميل الإعدادات','info'); }
  };
  // النسخة الكاملة للوحة (متاحة لمن يريدها برمجياً، غير مربوطة بالقائمة)
  window.hhTeacherPanelFull=async function(){
    var isApproved = (typeof _hhMyRole!=='undefined' && _hhMyRole==='teacher') || (typeof hhIsAdmin==='function' && hhIsAdmin());
    if(!isApproved){ toast2('للمعلم المعتمد','info'); return; }
    var old=document.getElementById('hh-tpanel'); if(old) old.remove();
    var ld=document.createElement('div'); ld.id='hh-tpanel';
    ld.style.cssText='position:fixed;inset:0;background:rgba(42,8,16,.82);z-index:2147483000;display:flex;align-items:center;justify-content:center;direction:rtl;font-family:Cairo,sans-serif;';
    ld.innerHTML='<div style="background:#F6F1E7;border-radius:18px;padding:26px 40px;font-weight:900;color:#8A6D2E;">جارٍ تجهيز لوحتك…</div>';
    document.body.appendChild(ld);
    try{ await fetchData(); }catch(e){}
    render();
  };
  window.hhTPCommand=function(){
    if(!P.rooms.length){ toast2('لا فصول بعد','info'); return; }
    var e=document.getElementById('hh-tpanel'); if(e) e.remove();
    if(typeof hhOpenSmartFollowup==='function'){
      hhOpenSmartFollowup(P.rooms[0].code);
      setTimeout(function(){ if(typeof hhSfuCommand==='function') hhSfuCommand(); }, 900);
    }
  };
  window.hhTPGo=function(code){
    var e=document.getElementById('hh-tpanel'); if(e) e.remove();
    if(typeof hhOpenSmartFollowup==='function') hhOpenSmartFollowup(code);
  };
  window.hhTPNav=function(dest){
    var e=document.getElementById('hh-tpanel'); if(e) e.remove();
    if(typeof hhCampusGo==='function') hhCampusGo(dest);
  };
  window.hhTPRename=async function(code){
    var c=P.rooms.filter(function(x){return x.code===code;})[0]; if(!c) return;
    var n=await _hhRoyalPrompt('الاسم الجديد للفصل', c.className||'', 'مثال: السابع (أ)');
    if(!n) return;
    n=n.slice(0,60);
    try{
      await db().collection('classrooms').doc(code).set({className:n},{merge:true});
      c.className=n; render();
      toast2('عُدّل اسم الفصل','success');
      try{ if(typeof _hhCls!=='undefined') _hhCls.loaded=false; }catch(e){}
    }catch(e){ toast2('تعذر التعديل','error'); }
  };
  window.hhTPDelete=async function(code){
    var c=P.rooms.filter(function(x){return x.code===code;})[0]; if(!c) return;
    var yes=await _hhRoyalConfirm('حذف فصل «'+esc2(c.className||code)+'» نهائياً',
      'يُحذف الفصل ورمزه من قوائمك.<br>سجلات طلابه التاريخية تبقى محفوظة في ملفاتهم.', true);
    if(!yes) return;
    try{
      await db().collection('classrooms').doc(code).delete();
      P.rooms=P.rooms.filter(function(x){return x.code!==code;});
      render();
      toast2('حُذف الفصل','success');
      try{ if(typeof _hhCls!=='undefined') _hhCls.loaded=false; }catch(e){}
    }catch(e){ toast2('تعذر الحذف','error'); }
  };
  window.hhTPNewClass=async function(){
    var n=await _hhRoyalPrompt('اسم الفصل الجديد','', 'مثال: السابع (د)');
    if(!n) return;
    var code=genCode();
    try{
      await db().collection('classrooms').doc(code).set({
        code:code, className:n.slice(0,60), schoolName:'', subject:'',
        teacherId:currentUser.uid, active:true, studentCount:0,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      P.rooms.push({code:code, className:n, studentCount:0, teacherId:currentUser.uid});
      P.rooms.sort(function(a,b){ return (a.className||'').localeCompare(b.className||'','ar'); });
      render();
      toast2('أُنشئ الفصل برمز '+code,'success');
      try{ if(typeof _hhCls!=='undefined') _hhCls.loaded=false; }catch(e){}
    }catch(e){ toast2('تعذر الإنشاء','error'); }
  };
})();
