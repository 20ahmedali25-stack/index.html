/* ============================================================
   المُلهم التعليمي — تطوير ملف الطالب · التقدّم والأثر (zzzzzzx)
   ------------------------------------------------------------
   يُثري «نظرة عامة» في ملف الطالب بـ:
     · رسم التحصيل قبل/بعد التلعيب (قلب الدراسة شبه التجريبية)
     · أشرطة إتقان أهداف المنهج
     · دمج نتائج الألعاب والمسابقات في الملف
   يعمل عبر خطاف hhSf2Extra الموجود في almulhim-student-file.js · لا يمسّ الأصل.
   ============================================================ */
(function(){
'use strict';
if(window._hhSf2Init) return; window._hhSf2Init=true;
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

var GD='linear-gradient';
// يستخرج سلسلة الدرجات عبر الزمن من سجل الطالب (grades/exams)، ويقسمها قبل/بعد نقطة التلعيب
function series(rec){
  var pts=[];
  (rec.grades||[]).forEach(function(g){ var v=(g.max?Math.round((g.score/g.max)*100):g.score); if(!isNaN(v)) pts.push({v:v,t:g.ts||g.date||0,label:g.title||''}); });
  (rec.exams||[]).forEach(function(e){ var v=(e.max?Math.round((e.score/e.max)*100):e.score); if(!isNaN(v)) pts.push({v:v,t:e.ts||e.date||0,label:e.title||''}); });
  pts.sort(function(a,b){ return (a.t||0)-(b.t||0); });
  return pts;
}
function bar(v, kind){
  var col = kind==='before' ? (GD+'(#8A6D2E,#5c4816)') : (GD+'(#8A1538,#5E0E26)');
  return '<div style="flex:1;background:'+col+';border-radius:7px 7px 0 0;height:'+Math.max(6,Math.round(v*0.85))+'%;position:relative;display:flex;align-items:flex-end;justify-content:center;color:#EAD9B0;font-size:.55rem;font-weight:900;padding-bottom:3px;">'
    +'<span style="position:absolute;top:-15px;color:#5E0E26;font-size:.6rem;font-weight:900;">'+v+'</span></div>';
}

window.hhSf2Extra = function(rec){
  var pts = series(rec);
  var html = '';

  // 1) رسم التحصيل قبل/بعد التلعيب
  if(pts.length >= 2){
    // نقطة التلعيب: منتصف السلسلة (أو تُضبط لاحقاً من الدفتر عبر rec.gamifyStart)
    var split = rec.gamifyIndex!=null ? rec.gamifyIndex : Math.floor(pts.length/2);
    var before = pts.slice(0, split), after = pts.slice(split);
    var avgB = before.length? Math.round(before.reduce(function(s,p){return s+p.v;},0)/before.length):0;
    var avgA = after.length? Math.round(after.reduce(function(s,p){return s+p.v;},0)/after.length):0;
    var delta = avgA - avgB;
    var bars = pts.map(function(p,i){ return bar(p.v, i<split?'before':'after'); }).join('');
    html += '<div style="background:#FFFDF8;border:1.5px solid #B8924A;border-radius:16px;padding:16px;margin-top:14px;">'
      + '<div style="font-weight:900;font-size:.9rem;color:#5E0E26;margin-bottom:12px;display:flex;align-items:center;gap:8px;"><span style="width:5px;height:18px;background:'+GD+'(#EAD9B0,#B8924A);border-radius:9px;"></span>التحصيل قبل وبعد التلعيب</div>'
      + '<div style="height:150px;display:flex;align-items:flex-end;gap:6px;padding-top:18px;">'+bars+'</div>'
      + '<div style="display:flex;gap:16px;justify-content:center;margin-top:10px;font-size:.66rem;font-weight:800;">'
      +   '<span><i style="display:inline-block;width:11px;height:11px;border-radius:3px;background:'+GD+'(#8A6D2E,#5c4816);margin-left:4px;vertical-align:middle;"></i>قبل ('+avgB+'%)</span>'
      +   '<span><i style="display:inline-block;width:11px;height:11px;border-radius:3px;background:'+GD+'(#8A1538,#5E0E26);margin-left:4px;vertical-align:middle;"></i>بعد ('+avgA+'%)</span>'
      + '</div>'
      + (delta!==0 ? '<div style="background:'+(delta>0?'#E6F2EA':'#FDF3DD')+';border:1px solid '+(delta>0?'#3D6B53':'#8A6D2E')+';border-right:4px solid '+(delta>0?'#3D6B53':'#8A6D2E')+';border-radius:11px;padding:10px 13px;margin-top:12px;font-size:.74rem;color:'+(delta>0?'#2C5340':'#5c4816')+';font-weight:800;line-height:1.6;">'
          + (delta>0 ? ('أثر إيجابي: ارتفع متوسط التحصيل '+delta+' نقطة بعد إدخال الأنشطة المُلعّبة · بيانات جاهزة للتحليل الإحصائي.') : ('تغيّر بمقدار '+delta+' نقطة · راجع النتائج.'))
          + '</div>' : '')
      + '</div>';
  } else {
    html += '<div style="background:#FFFDF8;border:1.5px dashed #B8924A;border-radius:14px;padding:18px;margin-top:14px;text-align:center;color:#8A6D2E;font-weight:800;font-size:.76rem;line-height:1.7;">'
      + 'رسم التحصيل قبل/بعد التلعيب يظهر بعد رصد درجتين على الأقل.<br><span style="font-size:.66rem;color:#8A7A63;">الدرجات تدخل تلقائياً من الاختبارات والألعاب والمسابقات.</span></div>';
  }

  // 2) أشرطة إتقان أهداف المنهج (من مهارات الطالب أو من أداء الفئات)
  var mastered = (rec.skills&&rec.skills.mastered)||[];
  var needs = (rec.skills&&rec.skills.needs)||[];
  var objectives = [];
  mastered.slice(0,4).forEach(function(s){ objectives.push({name:s, pct:88, lvl:'متقن', c:'#3D6B53'}); });
  needs.slice(0,3).forEach(function(s){ objectives.push({name:s, pct:38, lvl:'يحتاج دعماً', c:'#8A1538'}); });
  if(objectives.length){
    html += '<div style="background:#FFFDF8;border:1.5px solid #B8924A;border-radius:16px;padding:16px;margin-top:14px;">'
      + '<div style="font-weight:900;font-size:.9rem;color:#5E0E26;margin-bottom:12px;display:flex;align-items:center;gap:8px;"><span style="width:5px;height:18px;background:'+GD+'(#EAD9B0,#B8924A);border-radius:9px;"></span>إتقان أهداف المنهج</div>'
      + objectives.map(function(o){ return '<div style="margin-bottom:10px;"><div style="display:flex;justify-content:space-between;font-size:.74rem;font-weight:800;color:#3D0918;margin-bottom:3px;"><span>'+esc(o.name)+'</span><span style="color:'+o.c+';">'+o.lvl+'</span></div>'
        + '<div style="height:10px;background:#EDE7DA;border-radius:99px;overflow:hidden;"><i style="display:block;height:100%;border-radius:99px;width:'+o.pct+'%;background:'+GD+'(90deg,'+o.c+',#5E0E26);"></i></div></div>'; }).join('')
      + '</div>';
  }

  // 3) نشاط الألعاب والمسابقات المدمج
  var games = rec.gameResults||[];
  if(games.length){
    html += '<div style="background:#FFFDF8;border:1.5px solid #B8924A;border-radius:16px;padding:16px;margin-top:14px;">'
      + '<div style="font-weight:900;font-size:.9rem;color:#5E0E26;margin-bottom:10px;display:flex;align-items:center;gap:8px;"><span style="width:5px;height:18px;background:'+GD+'(#EAD9B0,#B8924A);border-radius:9px;"></span>نشاط الألعاب والمسابقات</div>'
      + '<div style="display:flex;flex-direction:column;gap:6px;">'
      + games.slice(-6).reverse().map(function(g){ return '<div style="display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #EAE0CA;border-radius:11px;padding:8px 12px;font-size:.72rem;font-weight:800;color:#3D0918;">'
        + '<span style="width:8px;height:8px;border-radius:50%;background:#8A1538;flex-shrink:0;"></span>'+esc(g.name||'نشاط')
        + '<span style="margin-right:auto;color:#5E0E26;">'+(g.score!=null?g.score+' نقطة':'')+(g.rank?' · المركز '+g.rank:'')+'</span></div>'; }).join('')
      + '</div></div>';
  }

  return html;
};
})();
