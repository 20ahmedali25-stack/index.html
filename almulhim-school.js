/* وحدة مستخرجة من محرك المُلهِم · تُحمَّل بعد almulhim-engine.js */

// ═══ المدرسة: القصص التفاعلية + المسار المتدرج + معالج الدخول + مركز المناهج ═══
// ═══ مسارح الحصص: تُفتح من خانة الدرس · زر «العرض» للمعلم على شاشة الفصل ═══
// المفتاح: معرف الدرس أو عنوانه كما في بيانات المنهج · القيمة: مسار الملف على الاستضافة
window.HH_STAGE_FILES = window.HH_STAGE_FILES || {
  'عناصر المناخ': 'climate.html'
};
// ═══ ملفات الدرس: رفع صور الكتاب من داخل الدرس · تندمج فوراً في العرض والرحلة ═══
function _hhLmRole(){
  try{ if(typeof isAdminUser==='function' && typeof currentUser!=='undefined' && isAdminUser(currentUser)) return 'admin'; }catch(e){}
  return (typeof currentUser!=='undefined' && currentUser) ? 'teacher' : null;
}
async function _hhLmFetch(lid){
  var out=[];
  try{
    var col=firebase.firestore().collection('lesson_media');
    var ids=[lid]; try{ if(typeof currentUser!=='undefined'&&currentUser) ids.push(lid+'__'+currentUser.uid); }catch(e){}
    var rs=await Promise.all(ids.map(function(id){ return col.doc(id).get().catch(function(){return null;}); }));
    rs.forEach(function(d){ if(d&&d.exists){ (d.data().images||[]).forEach(function(im,k){ out.push({url:im.url, caption:im.caption||'', _doc:d.id, _k:k}); }); } });
  }catch(e){}
  try{ localStorage.setItem('hh_li_'+lid, JSON.stringify(out.map(function(x){return {url:x.url, caption:x.caption};}))); }catch(e){}
  return out;
}
window.hhLessonFiles=async function(ui,li){
  var S=hhSchData(); var L=S.units[ui].lessons[li]; var lid=L.id||('u'+ui+'l'+li);
  var role=_hhLmRole(); if(!role){ if(typeof toast==='function') toast('سجل دخولك أولاً','warn'); return; }
  var ov=document.createElement('div');
  ov.id='hh-lf-ov';
  ov.style.cssText='position:fixed;inset:0;background:rgba(30,6,15,.72);z-index:9500;display:flex;align-items:center;justify-content:center;padding:16px;';
  ov.innerHTML='<div style="background:linear-gradient(180deg,#FFFDF8,#FBF5E9);border:2px solid #B8924A;border-radius:18px;max-width:640px;width:100%;max-height:88vh;overflow:auto;padding:16px;font-family:Cairo,sans-serif;" onclick="event.stopPropagation()">'
    +'<div style="display:flex;align-items:center;gap:8px;"><b style="color:#5E0E26;font-size:1rem;flex:1;">ملفات الدرس · '+esc(L.title)+'</b><button onclick="document.getElementById(\'hh-lf-ov\').remove()" style="background:#fff;border:1.5px solid #B8924A;border-radius:9px;width:30px;height:30px;color:#8A1538;font-weight:900;cursor:pointer;">×</button></div>'
    +'<div style="font-size:.72rem;color:#8A7A63;font-weight:700;margin:2px 0 10px;">'+(role==='admin'?'المشرف · تظهر للجميع':'المعلم · تظهر لصفوفك (يتطلب اعتماد المعلم)')+' · تندمج فوراً في العرض التقديمي ورحلة الطالب</div>'
    +'<label id="hh-lf-drop" style="display:block;border:2.5px dashed #B8924A;border-radius:14px;padding:20px;text-align:center;background:rgba(184,146,74,.05);font-weight:800;color:#8A6D2E;font-size:.85rem;cursor:pointer;"><b style="display:block;color:#5E0E26;font-size:.95rem;margin-bottom:2px;">اسحب الصور هنا أو انقر للاختيار</b>صور من الكتاب JPG / PNG · تُضغط تلقائياً<input id="hh-lf-inp" type="file" accept="image/*" multiple style="display:none;"></label>'
    +'<div id="hh-lf-st" style="font-size:.75rem;font-weight:800;color:#3D6B53;min-height:18px;margin-top:6px;"></div>'
    +'<div id="hh-lf-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;margin-top:8px;"></div>'
    +'</div>';
  ov.onclick=function(){ ov.remove(); };
  document.body.appendChild(ov);
  function st(m,err){ var e=document.getElementById('hh-lf-st'); if(e){ e.textContent=m; e.style.color=err?'#8A1538':'#3D6B53'; } }
  async function grid(){
    var g=document.getElementById('hh-lf-grid'); if(!g) return;
    g.innerHTML='<div style="grid-column:1/-1;text-align:center;color:#8A7A63;font-weight:800;font-size:.8rem;padding:8px;">جارٍ التحميل…</div>';
    var imgs=await _hhLmFetch(lid);
    g.innerHTML=imgs.length? imgs.map(function(im){
      return '<div style="background:#fff;border:1.5px solid #D9C79E;border-radius:12px;padding:6px;position:relative;">'
        +'<img src="'+esc(im.url)+'" alt="" style="width:100%;height:88px;object-fit:cover;border-radius:8px;display:block;">'
        +'<div style="font-size:.62rem;font-weight:800;color:#3D6B53;margin-top:4px;">✓ شريحة في العرض · محطة في الرحلة</div>'
        +'<button data-doc="'+esc(im._doc)+'" data-k="'+im._k+'" class="hh-lf-del" style="position:absolute;top:4px;left:4px;background:#fff;border:1px solid #8A1538;color:#8A1538;border-radius:7px;width:22px;height:22px;font-weight:900;cursor:pointer;">×</button>'
        +'</div>';
    }).join('') : '<div style="grid-column:1/-1;text-align:center;color:#8A7A63;font-weight:800;font-size:.8rem;padding:8px;">لا صور بعد · ارفع أول صورة من الكتاب</div>';
    g.querySelectorAll('.hh-lf-del').forEach(function(b){ b.onclick=async function(){
      if(!confirm('حذف الصورة من العرض والرحلة؟')) return;
      try{
        var ref=firebase.firestore().collection('lesson_media').doc(b.getAttribute('data-doc'));
        var d=await ref.get(); var arr=(d.exists&&d.data().images)||[]; arr.splice(+b.getAttribute('data-k'),1);
        await ref.set({lessonId:lid, images:arr, updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});
        st('حُذفت الصورة'); grid(); try{ hhSchRender(); }catch(e){}
      }catch(e){ st('تعذر الحذف: '+e.message, true); }
    }; });
  }
  async function upload(files){
    var role2=_hhLmRole(); var docId = role2==='admin' ? lid : lid+'__'+currentUser.uid;
    var list=[].slice.call(files||[]).filter(function(f){ return /^image\//.test(f.type); });
    if(!list.length){ st('اختر صوراً فقط (JPG/PNG)', true); return; }
    for(var n=0;n<list.length;n++){
      st('جارٍ رفع '+(n+1)+' من '+list.length+'…');
      var b64=await new Promise(function(res){ var r=new FileReader(); r.onload=function(){
        var img=new Image(); img.onload=function(){ var c=document.createElement('canvas'); var sc=Math.min(1,1200/img.width); c.width=Math.round(img.width*sc); c.height=Math.round(img.height*sc); c.getContext('2d').drawImage(img,0,0,c.width,c.height); res(c.toDataURL('image/jpeg',.8)); }; img.src=r.result; }; r.readAsDataURL(list[n]); });
      var url=null; try{ if(typeof hhUploadQImageToStorage==='function') url=await hhUploadQImageToStorage(b64); }catch(e){}
      if(!url){ url=b64; if(url.length>700000){ st('صورة كبيرة والتخزين غير متاح · صغّرها', true); continue; } }
      try{
        var ref=firebase.firestore().collection('lesson_media').doc(docId);
        var d=await ref.get(); var arr=(d.exists&&d.data().images)||[]; arr.push({url:url, caption:'', questions:[]});
        await ref.set({lessonId:lid, images:arr, updatedAt:firebase.firestore.FieldValue.serverTimestamp(), by:currentUser.uid, role:role2},{merge:true});
      }catch(e){ st('تعذر الحفظ: '+e.message+(role2!=='admin'?' · قد يتطلب اعتماد المعلم':''), true); return; }
    }
    st('اكتمل الرفع · الصور الآن في العرض والرحلة'); grid(); try{ hhSchRender(); }catch(e){}
  }
  var inp=document.getElementById('hh-lf-inp'); inp.onchange=function(){ upload(inp.files); inp.value=''; };
  var dz=document.getElementById('hh-lf-drop');
  dz.ondragover=function(e){ e.preventDefault(); dz.style.background='rgba(184,146,74,.15)'; };
  dz.ondragleave=function(){ dz.style.background='rgba(184,146,74,.05)'; };
  dz.ondrop=function(e){ e.preventDefault(); dz.style.background='rgba(184,146,74,.05)'; upload(e.dataTransfer.files); };
  grid();
};

// ═══ العرض التقديمي التلقائي: يُولَّد من بيانات الدرس نفسها ويفتح في تبويب ═══
window.hhAutoStage=function(ui,li){
  try{
    var S=hhSchData(); var U=S.units[ui]; var L=U.lessons[li];
    var qs=(L.q||[]).slice().sort(function(){return Math.random()-.5;}).slice(0,6);
    var slides=[];
    slides.push({t:esc(L.title), h:'<div class="cards">'
      +'<div class="cd"><span>الوحدة</span><b>'+esc(U.unit||'')+'</b></div>'
      +'<div class="cd"><span>الدرس</span><b>'+esc(L.lesson||'')+'</b></div>'
      +((L.vals&&L.vals[0])?'<div class="cd"><span>قيمة الدرس</span><b>'+esc(L.vals[0])+'</b></div>':'')
      +'</div>'});
    if(L.text) slides.push({t:'تمهيد', h:'<p class="big" data-step="1">'+esc(L.text)+'</p>'});
    (L.summary||[]).forEach(function(pt,k){ slides.push({t:'الفكرة '+(k+1)+' من '+(L.summary||[]).length, h:'<p class="big" data-step="1">'+esc(pt)+'</p>'}); });
    if(L.terms&&L.terms.length) slides.push({t:'المصطلحات والمفاهيم', h:(L.terms||[]).map(function(t,k){return '<div class="term" data-step="'+(k+1)+'"><b>'+esc(t[0])+'</b><span>'+esc(t[1])+'</span></div>';}).join('')});
    qs.forEach(function(q,k){ slides.push({t:'سؤال للفصل · '+(k+1), h:'<p class="big">'+esc(q.q)+'</p>'
      +((q.o&&q.o.length)?'<div class="opts">'+q.o.map(function(o){return '<span class="op'+(o===q.a?' ok':'')+'" data-step="2">'+esc(o)+'</span>';}).join('')+'</div>':'')
      +'<div class="ans" data-step="3"><b>الإجابة:</b> '+esc(q.a)+((q.why)?'<br><small>'+esc(q.why)+'</small>':'')+'</div>'}); });
    if(L.vals&&L.vals.length) slides.push({t:'قيم أتعلمها', h:(L.vals||[]).map(function(v,k){return '<p class="big" data-step="'+(k+1)+'">✦ '+esc(v)+'</p>';}).join('')});
    slides.push({t:'الغلق', h:'<p class="big" data-step="1">ما أهم فكرة خرجت بها من درس اليوم؟</p><p class="big" data-step="2">التقويم على المنصة: مراجعة سريعة ثم الاختبار الشامل</p>'});
    var html='<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(L.title)+' · العرض التقديمي · المُلهم</title>'
      +'<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;800;900&display=swap" rel="stylesheet"><style>'
      +'*{box-sizing:border-box}html,body{margin:0;height:100%;font-family:Cairo,sans-serif;background:linear-gradient(180deg,#F6F1E7,#EFE7D6);color:#3D0918;direction:rtl}'
      +'body{display:grid;grid-template-rows:auto 1fr auto;height:100vh}'
      +'.top{background:linear-gradient(175deg,#4A0B1E,#5E0E26);border-bottom:2px solid #B8924A;color:#FDF3DD;padding:8px 18px;display:flex;align-items:center;gap:12px}'
      +'.top b{font-size:1.15rem}.top span{font-size:.75rem;color:#EAD9B0}.top button{margin-right:auto;background:rgba(212,188,133,.12);border:1px solid rgba(212,188,133,.5);border-radius:9px;height:34px;padding:0 14px;color:#FDF3DD;font-family:inherit;font-weight:800;cursor:pointer}'
      +'.stage{margin:12px;background:#FFFDF8;border:2px solid #B8924A;border-radius:18px;padding:26px 34px;overflow:auto;position:relative}'
      +'h2{color:#5E0E26;font-size:clamp(1.5rem,3vw,2.3rem);margin:0 0 14px}'
      +'.big{font-size:clamp(1.25rem,2.3vw,1.9rem);line-height:2;font-weight:800;margin:8px 0}'
      +'.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}'
      +'.cd{background:#fff;border:1.5px solid #D4BC85;border-radius:14px;padding:14px}.cd span{color:#8A7A63;font-size:.85rem;font-weight:800}.cd b{display:block;font-size:clamp(1.05rem,1.8vw,1.5rem);line-height:1.7}'
      +'.term{background:#fff;border:1.5px solid #D4BC85;border-radius:12px;padding:10px 14px;margin:8px 0}.term b{color:#8A1538;font-size:clamp(1.05rem,1.8vw,1.45rem)}.term span{display:block;font-size:clamp(.95rem,1.6vw,1.3rem);font-weight:800;line-height:1.9}'
      +'.opts{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin:12px 0}.op{background:#fff;border:1.5px solid #D4BC85;border-radius:12px;padding:12px;font-size:clamp(1rem,1.8vw,1.4rem);font-weight:900;text-align:center}'
      +'.ans{background:#FDF3DD;border:1.5px dashed #B8924A;border-radius:12px;padding:12px 16px;font-size:clamp(1.05rem,1.9vw,1.5rem);font-weight:800;line-height:1.9}.ans small{color:#8A6D2E}'
      +'[data-step]{opacity:0;transform:translateY(12px);transition:all .4s}[data-step].in{opacity:1;transform:none}'
      +'[data-step].in .ok, .ans.in ~ .opts .ok{background:linear-gradient(135deg,#EAD9B0,#B8924A)}'
      +'.nav{display:flex;justify-content:space-between;align-items:center;padding:8px 18px 14px}.nav button{background:#fff;border:1.5px solid #B8924A;border-radius:11px;padding:9px 20px;color:#8A1538;font-family:inherit;font-weight:900;font-size:1rem;cursor:pointer}.nav .g{background:linear-gradient(135deg,#EAD9B0,#B8924A);color:#3D0918}'
      +'.dots{font-size:.85rem;color:#8A7A63;font-weight:800}.dot{position:absolute;bottom:12px;left:16px;width:11px;height:11px;border-radius:50%;background:#B8924A;display:none;animation:pu 1.3s infinite}.dot.on{display:block}@keyframes pu{50%{transform:scale(1.35)}}'
      +'</style></head><body>'
      +'<div class="top"><b>'+esc(L.title)+'</b><span>'+esc(U.unit||'')+' · المُلهم</span><button onclick="if(!document.fullscreenElement)document.documentElement.requestFullscreen();else document.exitFullscreen()">ملء الشاشة (F)</button></div>'
      +'<div class="stage"><div id="sl"></div><div class="dot" id="dot"></div></div>'
      +'<div class="nav"><button onclick="go(-1)">‹ السابق</button><span class="dots" id="dots"></span><button class="g" onclick="go(1)">التالي ›</button></div>'
      +'<scr'+'ipt>var SL='+JSON.stringify(slides)+';var i=0,st=0;'
      +'function steps(){return [...document.querySelectorAll("#sl [data-step]")].map(function(e){return +e.getAttribute("data-step")}).filter(function(v,x,a){return a.indexOf(v)===x}).sort(function(a,b){return a-b})}'
      +'function ap(){var ss=steps();document.querySelectorAll("#sl [data-step]").forEach(function(e){e.classList.toggle("in",+e.getAttribute("data-step")<=st)});document.getElementById("dot").classList.toggle("on",ss.length>0&&st<ss[ss.length-1])}'
      +'function render(){var s=SL[i];document.getElementById("sl").innerHTML="<h2>"+s.t+"</h2>"+s.h;st=0;ap();document.getElementById("dots").textContent=(i+1)+" / "+SL.length}'
      +'function go(d){var ss=steps();if(d>0){var nx=ss.filter(function(v){return v>st})[0];if(nx!=null){st=nx;ap();return}}if(d<0&&st>0){var pv=ss.filter(function(v){return v<st});st=pv.length?pv[pv.length-1]:0;ap();return}i=Math.max(0,Math.min(SL.length-1,i+d));render()}'
      +'document.addEventListener("keydown",function(e){if(e.key==="ArrowLeft"||e.key===" "||e.key==="PageDown")go(1);else if(e.key==="ArrowRight"||e.key==="PageUp")go(-1);else if(e.key==="f"||e.key==="F"){if(!document.fullscreenElement)document.documentElement.requestFullscreen();else document.exitFullscreen()}});'
      +'document.querySelector(".stage").addEventListener("click",function(e){if(e.target.closest("button"))return;go(1)});render();'
      +'</scr'+'ipt></body></html>';
    var blob=new Blob([html],{type:'text/html;charset=utf-8'});
    var w=window.open(URL.createObjectURL(blob),'_blank');
    if(!w && typeof toast==='function') toast('اسمح بالنوافذ المنبثقة لفتح العرض التقديمي','warn');
    try{ if(typeof hhLogActivity==='function') hhLogActivity('stage','العرض التقديمي: '+L.title); }catch(e){}
  }catch(e){ if(typeof toast==='function') toast('تعذر توليد العرض: '+e.message,'error'); }
};

// ─── ضمان وجود درس عناصر المناخ في بيانات المنهج (إن لم يكن في ملف المنهج) ───
function _hhEnsureClimateLesson(){
  try{
    ['_HH_SCHOOL_T1','_HH_SCHOOL'].forEach(function(k){
      var D=window[k]; if(!D||!Array.isArray(D.units)) return;
      var unit=null;
      D.units.forEach(function(u){ if(((u.unit||u.title||'')+'').indexOf('الأرض من حولي')!==-1) unit=u; });
      if(!unit) return;
      var has=(unit.lessons||[]).some(function(L){ return ((L.title||'')+'').trim()==='عناصر المناخ'; });
      if(has) return;
      unit.lessons=unit.lessons||[];
      unit.lessons.unshift({
        id:'t1u1_climate', lesson:'الدرس الأول', title:'عناصر المناخ',
        text:'تُعد عناصر المناخ من أثر العوامل الطبيعية التي تؤثر بشكل مباشر وغير مباشر في تشكيل سطح الأرض وما عليها من مظاهر، سواءً كانت طبيعية أو بشرية. ويتألف المناخ من مجموعة من العناصر منها: الحرارة، والضغط الجوي، والرياح، والرطوبة والتكاثف. ويمثل الإشعاع الشمسي مصدر الحرارة للكرة الأرضية، وتختلف الحرارة على سطح الأرض باختلاف زاوية سقوط الشمس وطول النهار، وقد قسم العلماء سطح الأرض إلى مجموعة من المناطق الحرارية.',
        summary:[
          'الطقس حالة الجو في فترة قصيرة (يوم – أسبوع)، والمناخ حالته في فترة طويلة (فصل – سنة أو عدة سنوات).',
          'عناصر المناخ: الحرارة، الضغط الجوي، الرياح، الرطوبة والتكاثف.',
          'الحرارة أهم العناصر: تؤثر مباشرة على الإنسان وأنشطته، وتؤثر في بقية العناصر.',
          'الإشعاع الشمسي مصدر الحرارة للأرض، وتختلف الحرارة باختلاف زاوية سقوط الشمس وطول النهار.',
          'قُسمت الأرض إلى مناطق حرارية: الحارة (30 ش–30 ج)، المعتدلة الدفيئة (30–40)، المعتدلة الباردة (40–66.5)، الباردة القطبية (66.5–90).'
        ],
        terms:[
          ['الطقس','حالة الجو في فترة قصيرة قد تكون يوماً أو أسبوعاً من حيث الحرارة والضغط الجوي والرياح والأمطار'],
          ['المناخ','حالة الجو في فترة طويلة قد تكون فصلاً أو سنة أو عدة سنوات من حيث الحرارة والضغط الجوي والرياح والأمطار'],
          ['الإشعاع الشمسي','مقدار الأشعة الشمسية الساقطة على مساحة معينة'],
          ['الإشعاع الأرضي','تحول الإشعاع الشمسي الذي اكتسبه سطح الأرض وما عليه إلى طاقة حرارية تنبعث إلى الجو وتسخن الهواء بصفة أساسية']
        ],
        vals:['أثر الأنشطة البشرية على التغيرات المناخية'],
        q:[
          {d:'easy', q:'ما حالة الجو في فترة قصيرة قد تكون يوماً أو أسبوعاً؟', o:['الطقس','المناخ','الإشعاع الأرضي','الرطوبة'], a:'الطقس', why:'الطقس يوصف بالفترة القصيرة، أما المناخ فبالفترة الطويلة.'},
          {d:'easy', q:'ما حالة الجو في فترة طويلة قد تكون فصلاً أو سنة أو عدة سنوات؟', o:['المناخ','الطقس','الرياح','الضغط الجوي'], a:'المناخ', why:'المناخ متوسط حالة الجو في مدة طويلة.'},
          {d:'easy', q:'أي مما يلي ليس من عناصر المناخ؟', o:['التربة','الحرارة','الرياح','الضغط الجوي'], a:'التربة', why:'عناصر المناخ: الحرارة والضغط الجوي والرياح والرطوبة والتكاثف.'},
          {d:'easy', q:'ما مصدر الحرارة للكرة الأرضية؟', o:['الإشعاع الشمسي','الرياح','الأمطار','الضغط الجوي'], a:'الإشعاع الشمسي', why:'الشمس مصدر الطاقة الحرارية للأرض.'},
          {d:'med', q:'تُعد الحرارة أهم عناصر المناخ لأنها:', o:['تؤثر على الإنسان وعلى بقية العناصر','أسهل عنصر في القياس','لا تتغير بين المناطق','تظهر في الشتاء فقط'], a:'تؤثر على الإنسان وعلى بقية العناصر', why:'تأثيرها مباشر على الإنسان وأنشطته وعلى باقي العناصر.'},
          {d:'med', q:'المنطقة الحرارية الأكبر امتداداً على سطح الأرض هي:', o:['الحارة','المعتدلة الدفيئة','المعتدلة الباردة','الباردة القطبية'], a:'الحارة', why:'تمتد بين دائرتي عرض 30 شمالاً وجنوباً.'},
          {d:'med', q:'تمتد المنطقة المعتدلة الدفيئة بين دائرتي عرض:', o:['30 و40','0 و30','40 و66.5','66.5 و90'], a:'30 و40', why:'كما في شكل المناطق الحرارية ص13.'},
          {d:'med', q:'ما المفهوم الدال على تحول الإشعاع الشمسي المكتسب إلى طاقة حرارية تنبعث إلى الجو؟', o:['الإشعاع الأرضي','الإشعاع الشمسي','التكاثف','الضغط الجوي'], a:'الإشعاع الأرضي', why:'وهو الذي يسخن الهواء بصفة أساسية.'},
          {d:'hard', q:'تبدأ المنطقة الباردة الشمالية من دائرة عرض:', o:['66.5 شمالاً','40 شمالاً','30 شمالاً','23.5 شمالاً'], a:'66.5 شمالاً', why:'وتنتهي عند القطب 90 شمالاً.'},
          {d:'hard', q:'لو ضمّت الأرض منطقة حرارية واحدة فقط، فمن النتائج المتوقعة:', o:['تشابه أشكال الحياة وقلة تنوع النبات','زيادة تنوع المحاصيل','تعدد الحرف والأنشطة','اختلاف أشكال الحياة بين المناطق'], a:'تشابه أشكال الحياة وقلة تنوع النبات', why:'التنوع الحراري سبب تنوع الحياة والأنشطة.'}
        ]
      });
    });
  }catch(e){}
}
try{ _hhEnsureClimateLesson(); }catch(e){}
document.addEventListener('DOMContentLoaded', function(){ setTimeout(_hhEnsureClimateLesson, 400); setTimeout(_hhEnsureClimateLesson, 2000); });

function _hhLessonMastery(lid){
  try{
    var prog=JSON.parse(localStorage.getItem('hh_sch_progress')||'{}');
    if(prog[lid]!=null){ var v=prog[lid]; return Math.max(0,Math.min(100, typeof v==='object'?(v.mastery||v.pct||0):v)); }
  }catch(e){}
  return 0;
}
function hhStageFor(L){
  try{ return HH_STAGE_FILES[L.id] || HH_STAGE_FILES[(L.title||'').trim()] || null; }catch(e){ return null; }
}
window.hhOpenStage=function(ui,li){
  try{
    var S=hhSchData(); var U=S.units[ui]; var L=U.lessons[li]; var f=hhStageFor(L);
    // حمولة الدرس لقالب العرض المعتمد
    try{
      localStorage.setItem('hh_stage_payload', JSON.stringify({
        id:L.id||('u'+ui+'l'+li), title:L.title||'', unit:U.unit||'', lesson:L.lesson||'',
        term:(S.term||''), text:L.text||'', summary:L.summary||[], terms:L.terms||[],
        vals:L.vals||[], q:(L.q||[]).map(function(q){return {q:q.q,o:q.o||[],a:q.a,d:q.d||q.diff||'easy',why:q.why||''};}),
        images:(function(){ var arr=(L.images||[]).map(function(im){return {url:im.url,caption:im.caption||''};}); try{ arr=arr.concat(JSON.parse(localStorage.getItem('hh_li_'+(L.id||''))||'[]')); }catch(e){} return arr; })(),
        at:Date.now()
      }));
    }catch(e){}
    (async function(){ try{ if(L.id){ var fresh=await _hhLmFetch(L.id); var pay=JSON.parse(localStorage.getItem('hh_stage_payload')||'{}'); pay.images=((L.images||[]).map(function(im){return {url:im.url,caption:im.caption||''};})).concat(fresh.map(function(x){return {url:x.url,caption:x.caption};})); pay.at=Date.now(); localStorage.setItem('hh_stage_payload', JSON.stringify(pay)); } }catch(e){} })();
    if(!f || _hhSchRole!=='teacher'){
      var lid=encodeURIComponent(L.id||('u'+ui+'l'+li));
      var w0=window.open('template.html?lid='+lid+(_hhSchRole==='teacher'?'':'&view=1'),'_blank');
      if(!w0 && typeof toast==='function') toast('اسمح بالنوافذ المنبثقة لفتح العرض التقديمي','warn');
      try{ if(typeof hhLogActivity==='function') hhLogActivity('stage','العرض التقديمي: '+L.title); }catch(e){}
      return;
    }
    var code=''; try{ code=localStorage.getItem('hh_current_class')||''; }catch(e){}
    // أسماء الصف تلقائياً: من صف المعلم الحالي (أو صفه الوحيد) إلى ذاكرة المسرح المشتركة
    (async function(){
      try{
        var db2=_hhClsDb(); if(!db2||!currentUser) return;
        if(!code){
          var cq=await db2.collection('classrooms').where('teacherId','==',currentUser.uid).limit(5).get();
          var cls=cq.docs.map(function(d){return d.data()||{};}).filter(function(c){return c.archived!==true;});
          if(cls.length===1 && cls[0].code) code=cls[0].code;
        }
        if(!code) return;
        var qs=await db2.collection('classroom_students').where('teacherId','==',currentUser.uid).where('classCode','==',code).where('active','==',true).get();
        var names=qs.docs.map(function(d){ return ((d.data()||{}).studentName||'').trim(); }).filter(Boolean);
        if(!names.length) return;
        localStorage.setItem('hh_stage_roster', JSON.stringify({name:code, roster:names, team:{}, auto:true, at:Date.now()}));
      }catch(e){}
    })();
    var w=window.open(encodeURI(f)+'?cls='+encodeURIComponent(code),'_blank');
    if(!w && typeof toast==='function') toast('اسمح بالنوافذ المنبثقة لفتح مسرح الحصة','warn');
    try{ if(typeof hhLogActivity==='function') hhLogActivity('stage','مسرح الحصة: '+L.title); }catch(e){}
  }catch(e){}
};

var HH_STORIES = {
  'u1l1': {
    title:'رحلة النوخذة',
    unit:'الوحدة الأولى: النقل والمواصلات',
    intro:'أنت «سالم»، تاجر شاب في الدوحة عام 1935. ورثت عن أبيك بضاعة من اللؤلؤ والتمور، وعليك أن توصلها إلى أسواق بعيدة وتعود بالربح. كل قرار تتخذه يعلّمك شيئاً عن النقل والتجارة.',
    scenes:[
      { id:1, text:'أمامك حِمل ثقيل من التمور، والسوق في الأحساء يبعد مئات الأميال عبر الصحراء. لا طرق معبدة في زمنك. كيف تنقل بضاعتك؟',
        choices:[
          { t:'أستأجر قافلة من الإبل وأسلك دروب القوافل', ok:true, next:2,
            fb:'اختيار موفق. طرق القوافل هي الطرق القديمة للنقل البري، وهي دروب ومسالك غير مرصوفة يسلكها الإنسان مستخدماً الدواب.' },
          { t:'أنتظر حتى تُبنى سكة حديد', ok:false, next:2,
            fb:'لن تنتظر طويلاً فحسب · بل ستفسد التمور. السكك الحديدية نوع من النقل البري لكنها لم تكن متاحة هنا آنذاك.' },
          { t:'أنقلها بحراً رغم أن الوجهة داخلية', ok:false, next:2,
            fb:'النقل المائي ممتاز للمسافات الطويلة، لكن الوجهة الداخلية تحتاج نقلاً برياً. لكل نوع نقل موضعه.' }
        ]},
      { id:2, text:'نجحت في البيع. الآن معك أرباح، وسمعت أن اللؤلؤ القطري مطلوب في الهند بأسعار عالية. ما مقوّم التجارة الذي تحتاجه أولاً لتبدأ هذه الرحلة؟',
        choices:[
          { t:'رأس المال لتنشيط عملية التجارة', ok:true, next:3,
            fb:'صحيح. رؤوس الأموال أحد مقومات التجارة الستة: فائض الإنتاج، الأسواق، الأمن، رؤوس الأموال، وسائل النقل، والأيدي العاملة.' },
          { t:'أبدأ بلا مال معتمداً على الحظ', ok:false, next:3,
            fb:'التجارة تحتاج مقومات لا حظاً. من دون رأس مال لا تستطيع شراء البضاعة ولا تجهيز السفينة.' }
        ]},
      { id:3, text:'في طريقك بحراً، عصفت رياح وتعطلت السفينة قرب ميناء صغير. التجار هناك يعرضون شراء نصف حمولتك بسعر أقل. ما القيمة التي تحكم قرارك؟',
        choices:[
          { t:'ألتزم بالأمانة وجودة المنتج ولا أخفي أي عيب', ok:true, next:4,
            fb:'أحسنت. الالتزام بمعايير الجودة والأمانة يزيد القدرة التنافسية للمنتجات الوطنية ويبني سمعة تدوم.' },
          { t:'أخفي العيوب لأربح أكثر', ok:false, next:4,
            fb:'قد تربح اليوم وتخسر السمعة غداً. الأمانة والجودة أساس التجارة المستدامة.' }
        ]},
      { id:4, text:'عدت إلى الدوحة بأرباح طيبة. جاءك شاب يسألك: ما أهم درس تعلمته عن النقل؟',
        choices:[
          { t:'أن النقل يربط مناطق الإنتاج بالاستهلاك ويحقق التنمية', ok:true, next:0,
            fb:'هذا جوهر الدرس. النقل يحقق التنمية الاقتصادية بالربط بين مناطق الإنتاج والاستهلاك، ويزيد حركة التجارة، وييسّر التبادل الثقافي بين الشعوب.' },
          { t:'أن النقل مجرد وسيلة تنقّل لا أثر لها', ok:false, next:0,
            fb:'بل الإنتاج نفسه يُعد محدود القيمة إذا لم تتوافر وسائل النقل لنقله إلى الأسواق العالمية.' }
        ]}
    ],
    ending:'أتممت رحلتك يا سالم. أدركت أن النقل ليس حركة بضائع فحسب، بل شريان التنمية الذي يربط الناس والأسواق والحضارات.'
  },
  'u2l1': {
    title:'في بلاط بغداد',
    unit:'الوحدة الثانية: الحضارة العباسية',
    intro:'أنت «يحيى»، شاب طموح وصل بغداد في أوج ازدهار الدولة العباسية. تحلم بأن تكون من أرباب الأقلام. رحلتك في المدينة ستكشف لك أسرار هذه الحضارة.',
    scenes:[
      { id:1, text:'تدخل بغداد فتبهرك المكتبات والمساجد والمدارس. تسأل شيخاً: ما سرّ هذا الازدهار؟ أي إجابة تتوقعها؟',
        choices:[
          { t:'الاستقرار السياسي والرخاء الاقتصادي وتشجيع الخلفاء للعلماء', ok:true, next:2,
            fb:'صحيح تماماً. عوامل ازدهار الحضارة: الاستقرار السياسي وندرة الحروب، والرخاء الاقتصادي، وتشجيع الخلفاء والأمراء للعلماء وحركة الترجمة، وانتشار المؤسسات التعليمية.' },
          { t:'كثرة الحروب والفتوحات المستمرة', ok:false, next:2,
            fb:'العكس تماماً · ندرة الحروب الداخلية والخارجية هي أحد أسباب الازدهار، فالاستقرار يتيح للعلم أن ينمو.' }
        ]},
      { id:2, text:'تريد الالتحاق بطبقة أرباب الأقلام. أين تعمل هذه الطبقة؟',
        choices:[
          { t:'في الدواوين كتّاباً ومترجمين', ok:true, next:3,
            fb:'أحسنت. أرباب الأقلام هم الكتّاب والمترجمون الذين اشتغلوا في الدواوين، وكان لهم دور محوري في حركة الترجمة.' },
          { t:'في الثكنات العسكرية', ok:false, next:3,
            fb:'تلك طبقة الجند · الجنود والقادة العسكريون. أرباب الأقلام هم الكتّاب والمترجمون في الدواوين.' }
        ]},
      { id:3, text:'تلتقي في المكتبة بزميل فارسي وآخر من أهل الذمة. كيف كان التعايش في هذا المجتمع؟',
        choices:[
          { t:'اندمجت الفئات وعاش الجميع في ظل قيم العدل والمساواة دون تمييز', ok:true, next:4,
            fb:'صحيح. تكوّن المجتمع من عناصر عربية (الأغلبية) وغير عربية كالفرس والأتراك، واندمجت فئاته، وعاش أهل الذمة في ظل ما يكفله الإسلام من عدل ورحمة ومساواة وتعايش.' },
          { t:'كان كل فريق منعزلاً في حيّه ولا تواصل بينهم', ok:false, next:4,
            fb:'بل حدث اندماج حقيقي بين فئات المجتمع وعناصره، وهذا من أسباب ثراء الحضارة العباسية.' }
        ]},
      { id:4, text:'يسألك الخليفة: كيف يُختار من يخلفك في منصبك يوماً ما، وما نظام الحكم في دولتنا؟',
        choices:[
          { t:'نظام وراثي، فالخليفة يعيّن أحد أبنائه في ولاية العهد', ok:true, next:0,
            fb:'صحيح. نظام الحكم في الدولة العباسية وراثي، امتداداً لما كان عليه الوضع في الدولة الأموية.' },
          { t:'ينتخبه أهل بغداد بالتصويت', ok:false, next:0,
            fb:'لم يكن ذلك نظام الحكم آنذاك · بل كان وراثياً عبر ولاية العهد.' }
        ]}
    ],
    ending:'أصبحت من أرباب الأقلام يا يحيى. فهمت أن الحضارة لا تُبنى بالسيف وحده، بل بالاستقرار والعلم والتعايش.'
  }
  ,
  'u1l2': {
    title:'سوق الدوحة',
    unit:'الوحدة الأولى: التجارة',
    intro:'أنت «مريم»، صاحبة مشروع ناشئ لبيع منتجات قطرية. تريدين توسيع تجارتك إلى الأسواق الخارجية. كل قرار سيعلّمك مقوّمات التجارة الحقيقية.',
    scenes:[
      { id:1, text:'أنتجتِ كمية من التمور تفوق حاجة السوق المحلي. ما التصرف الاقتصادي الصحيح؟',
        choices:[
          { t:'أصرّف الفائض في الأسواق الخارجية', ok:true, next:2,
            fb:'صحيح. من أهمية التجارة تصريف فائض الإنتاج المحلي في الأسواق الخارجية، وهذا يزيد الدخل القومي.' },
          { t:'أتلف الفائض حتى لا تنخفض الأسعار', ok:false, next:2,
            fb:'إتلاف الإنتاج خسارة للوطن. فائض الإنتاج أحد مقومات التجارة، ووجوده فرصة لا مشكلة.' }
        ]},
      { id:2, text:'تحتاجين لنقل بضاعتك عبر البحار. أي وسيلة نقل تسهم بأكثر من ثلاثة أرباع التبادل التجاري العالمي؟',
        choices:[
          { t:'النقل المائي', ok:true, next:3,
            fb:'أحسنتِ. أسهم النقل المائي بأكثر من ثلاثة أرباع التبادل التجاري العالمي، وربط مراكز الإنتاج بالاستهلاك بأقل تكلفة.' },
          { t:'النقل الجوي', ok:false, next:3,
            fb:'النقل الجوي سريع لكنه مكلف للبضائع الثقيلة. النقل المائي هو الأكثر إسهاماً في التجارة العالمية.' }
        ]},
      { id:3, text:'عُرض عليك التوسع لكن ينقصك عنصر أساسي. أي مقوّم من مقومات التجارة يضمن سلامة عمليتي البيع والشراء؟',
        choices:[
          { t:'الأمن', ok:true, next:4,
            fb:'صحيح. الأمن أحد مقومات التجارة الستة: فائض الإنتاج، الأسواق، الأمن، رؤوس الأموال، وسائل النقل، والأيدي العاملة.' },
          { t:'كثرة الإعلانات', ok:false, next:4,
            fb:'الإعلان مهم للتسويق، لكن الأمن هو ما يضمن سلامة عملية البيع والشراء ويشجع المستثمرين.' }
        ]},
      { id:4, text:'نجح مشروعك. يسألك طالب: ما أثر تطور وسائل النقل على التجارة؟',
        choices:[
          { t:'زاد التبادل التجاري بين دول العالم', ok:true, next:0,
            fb:'تماماً. أدى تطور وسائل النقل والمواصلات إلى زيادة التبادل التجاري بين دول العالم وربط مراكز الإنتاج بالاستهلاك.' },
          { t:'لا علاقة بينهما', ok:false, next:0,
            fb:'بل العلاقة وثيقة · وسائل النقل من مقومات التجارة نفسها.' }
        ]}
    ],
    ending:'صارت منتجاتك في أسواق العالم يا مريم. أدركت أن التجارة علمٌ ومقوّمات لا مصادفة.'
  },
  'u2l2': {
    title:'مجلس الحكمة',
    unit:'الوحدة الثانية: الحضارة الاجتماعية والثقافية',
    intro:'أنت «زينب»، عالمة شابة في بغداد العباسية. دُعيتِ إلى مجلس علمي يحضره علماء من كل الأعراق. رحلتك تكشف نسيج هذا المجتمع.',
    scenes:[
      { id:1, text:'في المجلس ترين عرباً وفرساً وأتراكاً. من شكّل الأغلبية في المجتمع العباسي؟',
        choices:[
          { t:'العناصر العربية', ok:true, next:2,
            fb:'صحيح. تكوّن المجتمع من عناصر عربية يشكلون الأغلبية، وعناصر غير عربية مثل الفرس والأتراك.' },
          { t:'الأتراك', ok:false, next:2,
            fb:'الأتراك من العناصر غير العربية في المجتمع، أما الأغلبية فكانت للعناصر العربية.' }
        ]},
      { id:2, text:'يجلس بجوارك عالم من أهل الذمة يناقش بحرية. ما القيم التي أتاحت له ذلك؟',
        choices:[
          { t:'العدل والرحمة والمساواة والتعايش دون تمييز', ok:true, next:3,
            fb:'أحسنتِ. عاش أهل الذمة في ظل ما يكفله الإسلام من قيم العدل والرحمة والمساواة والتعايش دون تمييز.' },
          { t:'دفعوا مقابلاً لحضور المجالس', ok:false, next:3,
            fb:'بل كان التعايش قيمة أصيلة كفلها الإسلام، لا امتيازاً يُشترى.' }
        ]},
      { id:3, text:'يُطلب منك اختيار مساعد يترجم كتاباً يونانياً. من أي طبقة تختارينه؟',
        choices:[
          { t:'أرباب الأقلام · الكتّاب والمترجمون', ok:true, next:4,
            fb:'صحيح. أرباب الأقلام هم الكتّاب والمترجمون الذين اشتغلوا في الدواوين، وكانوا عماد حركة الترجمة.' },
          { t:'طبقة الجند', ok:false, next:4,
            fb:'الجند هم الجنود والقادة العسكريون. الترجمة اختصاص أرباب الأقلام.' }
        ]},
      { id:4, text:'يسألك شيخ المجلس: ما الطبقة التي تمتعت بمركز رفيع في المجتمع الإسلامي؟',
        choices:[
          { t:'الفقهاء والعلماء', ok:true, next:0,
            fb:'صحيح. تمتعت طبقة الفقهاء والعلماء بمركز رفيع، وشملت العلماء والفقهاء والخطباء والقُرّاء.' },
          { t:'أصحاب المِهن والحِرف', ok:false, next:0,
            fb:'كان غالبيتهم من أهل البلاد المفتوحة. أما المركز الرفيع فكان للفقهاء والعلماء.' }
        ]}
    ],
    ending:'صرتِ من علماء بغداد يا زينب. عرفتِ أن قوة الحضارة في تنوّعها وتقديرها للعلم والعلماء.'
  }
  ,
  'u4l1': {
    title:'حارس البيئة',
    unit:'الوحدة الرابعة: التلوث البيئي',
    intro:'أنت «نورة»، طالبة في نادي البيئة المدرسي. لاحظتِ تغيّرات مقلقة في محيط مدرستك، وقررتِ أن تفهمي وتتصرفي. رحلتك ستكشف لك حقيقة التلوث وأثره.',
    scenes:[
      { id:1, text:'ترين دخاناً أسود يتصاعد من موقع قريب، ورائحة خانقة تملأ الهواء. زميلتك تسأل: ما هذا بالضبط؟',
        choices:[
          { t:'هذا تلوث · إدخال مواد ضارة إلى البيئة يؤدي إلى خلل يؤثر على الكائنات الحية', ok:true, next:2,
            fb:'تعريف دقيق. التلوث البيئي هو إدخال مواد ضارة (صلبة أو سائلة أو غازية أو طاقة) إلى البيئة؛ مما يؤدي إلى حدوث خلل يؤثر على الكائنات الحية.' },
          { t:'مجرد رائحة عابرة لا تستحق الاهتمام', ok:false, next:2,
            fb:'تلوث الهواء يُعدّ أكبر خطر على الصحة، ويسبب ملايين حالات الوفاة سنوياً · لا يصح التهاون به.' }
        ]},
      { id:2, text:'تبحثين عن أنواع التلوث لتصنّفي ما رأيتِ. كم نوعاً رئيساً تجدين؟',
        choices:[
          { t:'أربعة: الهواء والمياه والتربة والبحر', ok:true, next:3,
            fb:'صحيح. أنواع التلوث أربعة: تلوث الهواء، وتلوث المياه، وتلوث التربة، وتلوث البحر.' },
          { t:'نوعان فقط: الهواء والماء', ok:false, next:3,
            fb:'الأنواع أربعة · أضيفي تلوث التربة وتلوث البحر.' }
        ]},
      { id:3, text:'تعرضين النتائج على المدير، فيسألك: ولماذا لا تكفي جهود دولتنا وحدها؟',
        choices:[
          { t:'لأن آثار التلوث تتجاوز حدود الدول وتستدعي تعاوناً دولياً', ok:true, next:4,
            fb:'أحسنتِ. يُعدّ تلوث البيئة من التحديات التي تواجه العالم اليوم، والتي تستدعي تعاون الجهود الدولية للحد من آثاره السلبية.' },
          { t:'كل دولة تكفيها جهودها الخاصة', ok:false, next:4,
            fb:'الهواء والماء لا يعرفان حدوداً · ولهذا وُجدت الاتفاقيات الدولية كبروتوكول مونتريال واتفاقية باريس.' }
        ]},
      { id:4, text:'يسألك زميل صغير: وأنا ماذا أفعل؟ أنا مجرد طالب.',
        choices:[
          { t:'الحفاظ على البيئة واجب ومسؤولية كل فرد · ابدأ بترشيد الاستهلاك وإعادة التدوير', ok:true, next:0,
            fb:'هذه هي القيمة المستفادة: الحفاظ على نظافة البيئة من التلوث واجب ومسؤولية كل فرد، فساهم في حماية بيئتك من كافة الملوثات المضرّة بها وبصحتك.' },
          { t:'انتظر حتى تكبر، فالأمر يخص الحكومات', ok:false, next:0,
            fb:'المسؤولية تبدأ من الفرد · كل سلوك صغير يصنع فرقاً.' }
        ]}
    ],
    ending:'أصبحتِ حارسة للبيئة يا نورة. أدركتِ أن المعرفة وحدها لا تكفي، وأن الفعل الصغير المستمر هو ما يحمي كوكبنا.'
  },
  'u5l2': {
    title:'فجر عين جالوت',
    unit:'الوحدة الخامسة: الخطر المغولي',
    intro:'أنت «مظفّر»، جندي شاب في جيش المماليك سنة 658هـ. بغداد سقطت، والمغول يزحفون نحو مصر. اليوم قد يتغيّر مصير الأمة · وقراراتك جزء منه.',
    scenes:[
      { id:1, text:'في المعسكر يتساءل الجنود: كيف سقطت بغداد وهي عاصمة الخلافة؟ من قادهم؟',
        choices:[
          { t:'هولاكو، سنة 1258م، فدُمّرت المكتبات وضاع تراث علمي هائل', ok:true, next:2,
            fb:'صحيح. زحف المغول بقيادة هولاكو على بغداد سنة 656هـ/1258م، فسقطت عاصمة الخلافة العباسية ودُمّرت مكتباتها.' },
          { t:'جنكيز خان، وكان ذلك قبل قرن', ok:false, next:2,
            fb:'جنكيز خان مؤسس الدولة المغولية، لكن الذي أسقط بغداد هو حفيده هولاكو سنة 1258م.' }
        ]},
      { id:2, text:'يقترح بعض القادة الانسحاب إلى مصر وتحصينها. ماذا ترى؟',
        choices:[
          { t:'بل نتقدم ونلاقيهم في فلسطين قبل أن يصلوا مصر', ok:true, next:3,
            fb:'هذا ما فعله المماليك فعلاً · التقوا المغول في عين جالوت بفلسطين سنة 658هـ/1260م.' },
          { t:'ننتظر داخل الأسوار حتى يحاصرونا', ok:false, next:3,
            fb:'الانتظار داخل الأسوار هو ما فعلته بغداد فسقطت. المبادرة كانت سرّ نصر عين جالوت.' }
        ]},
      { id:3, text:'قبل المعركة يسألك جندي: من يقودنا اليوم؟',
        choices:[
          { t:'المماليك بقيادة قطز وبيبرس', ok:true, next:4,
            fb:'صحيح. تصدّى المماليك بقيادة قطز وبيبرس للمغول في عين جالوت وأوقفوا زحفهم.' },
          { t:'الخليفة العباسي نفسه', ok:false, next:4,
            fb:'الخلافة العباسية سقطت في بغداد قبل عامين · المماليك هم من حملوا الراية.' }
        ]},
      { id:4, text:'انتصرتم. يجلس القائد ويسألك: ما أهمية ما فعلناه اليوم في نظرك؟',
        choices:[
          { t:'أوقفنا المدّ المغولي نحو مصر وشمال إفريقيا · إنها نقطة تحوّل', ok:true, next:0,
            fb:'تماماً. تُعدّ عين جالوت نقطة تحوّل في التاريخ الإسلامي، إذ أوقفت المدّ المغولي نحو مصر وشمال إفريقيا.' },
          { t:'مجرد معركة عابرة كغيرها', ok:false, next:0,
            fb:'بل غيّرت مسار التاريخ · ولولاها لامتد المغول إلى شمال إفريقيا كله.' }
        ]}
    ],
    ending:'شهدت التاريخ يُصنع يا مظفّر. تعلّمت أن الأمم لا تُهزم بقوة عدوها بقدر ما تُهزم بتفرّقها · وأن الوحدة والمبادرة تصنعان النصر.'
  }
};

var _hhStory=null;
function hhStoryAvailable(lessonId){ return !!HH_STORIES[lessonId]; }

function hhStartStory(lessonId){
  var S=HH_STORIES[lessonId];
  if(!S){ if(typeof toast==='function') toast('لا توجد قصة لهذا الدرس بعد','info'); return; }
  _hhStory={ id:lessonId, data:S, scene:0, correct:0, total:0, log:[] };
  hhStoryIntro();
}
function hhStoryIntro(){
  var S=_hhStory.data;
  var old=document.getElementById('hh-story'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-story';
  ov.style.cssText='position:fixed;inset:0;background:linear-gradient(160deg,#2B0912,#5E0E26);z-index:999997;display:flex;align-items:center;justify-content:center;padding:20px;overflow-y:auto;direction:rtl;font-family:Cairo,Tajawal,sans-serif;';
  ov.innerHTML='<div style="max-width:560px;width:100%;text-align:center;">'
    +'<div style="color:#D4BC85;font-size:.78rem;font-weight:800;margin-bottom:8px;">'+esc(S.unit)+'</div>'
    +'<div style="color:#fff;font-size:2rem;font-weight:900;margin-bottom:16px;">'+esc(S.title)+'</div>'
    +'<div style="background:rgba(255,255,255,.07);border:1.5px solid rgba(184,146,74,.4);border-radius:16px;padding:20px;color:rgba(255,255,255,.9);font-size:.95rem;line-height:2.1;font-weight:700;margin-bottom:20px;">'+esc(S.intro)+'</div>'
    +'<button onclick="hhStoryScene()" style="background:linear-gradient(135deg,#B8924A,#8A6D2E);color:#fff;border:none;border-radius:13px;padding:13px 40px;font-family:Cairo;font-weight:900;font-size:1rem;cursor:pointer;box-shadow:0 6px 20px rgba(184,146,74,.35);">ابدأ الرحلة</button>'
    +'<button onclick="hhCloseStory()" style="display:block;margin:14px auto 0;background:none;border:none;color:rgba(255,255,255,.45);font-family:Cairo;font-weight:700;font-size:.8rem;cursor:pointer;">خروج</button>'
    +'</div>';
  document.body.appendChild(ov);
}
function hhStoryScene(){
  var T=_hhStory; if(!T) return;
  var scenes=T.data.scenes;
  if(T.scene>=scenes.length){ hhStoryEnd(); return; }
  var sc=scenes[T.scene];
  var ov=document.getElementById('hh-story'); if(!ov) return;
  var pct=Math.round(T.scene/scenes.length*100);
  ov.innerHTML='<div style="max-width:600px;width:100%;">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">'
    +'<span style="color:#D4BC85;font-size:.78rem;font-weight:900;">'+esc(T.data.title)+'</span>'
    +'<span style="color:rgba(255,255,255,.5);font-size:.74rem;font-weight:800;">'+(T.scene+1)+' / '+scenes.length+'</span></div>'
    +'<div style="background:rgba(255,255,255,.12);border-radius:99px;height:7px;margin-bottom:18px;"><div style="background:#B8924A;border-radius:99px;height:7px;width:'+pct+'%;transition:width .4s;"></div></div>'
    +'<div style="background:rgba(255,255,255,.08);border:1.5px solid rgba(184,146,74,.35);border-radius:16px;padding:20px;color:#fff;font-size:1.02rem;line-height:2.05;font-weight:700;margin-bottom:16px;">'+esc(sc.text)+'</div>'
    +'<div id="story-choices" style="display:flex;flex-direction:column;gap:9px;">'
    + sc.choices.map(function(ch,i){
        return '<button onclick="hhStoryChoose('+i+')" style="background:rgba(255,255,255,.95);border:1.5px solid #B8924A;border-radius:13px;padding:14px 17px;font-family:Cairo;font-weight:800;font-size:.9rem;color:#3D0918;cursor:pointer;text-align:right;line-height:1.7;transition:all .15s;">'+esc(ch.t)+'</button>';
      }).join('')
    +'</div>'
    +'<div id="story-fb" style="display:none;margin-top:14px;"></div>'
    +'</div>';
}
function hhStoryChoose(i){
  var T=_hhStory; if(!T) return;
  var sc=T.data.scenes[T.scene];
  var ch=sc.choices[i];
  T.total++;
  if(ch.ok) T.correct++;
  T.log.push({ q:sc.text.slice(0,60), choice:ch.t, ok:ch.ok });
  var btns=document.getElementById('story-choices').querySelectorAll('button');
  btns.forEach(function(b,bi){
    b.disabled=true;
    if(bi===i){
      b.style.background = ch.ok? '#EBF2EE' : '#F7ECEF';
      b.style.borderColor = ch.ok? '#3D6B53' : '#c0392b';
      b.style.color = ch.ok? '#3D6B53' : '#c0392b';
    } else b.style.opacity='.45';
  });
  var fb=document.getElementById('story-fb');
  fb.style.display='block';
  fb.innerHTML='<div style="background:'+(ch.ok?'rgba(61,107,83,.25)':'rgba(192,57,43,.22)')+';border:1.5px solid '+(ch.ok?'#3D6B53':'#c0392b')+';border-radius:13px;padding:14px 16px;color:#fff;font-size:.87rem;line-height:1.95;font-weight:700;">'
    +'<div style="font-weight:900;margin-bottom:5px;color:'+(ch.ok?'#8fd0a8':'#f2a09a')+';">'+(ch.ok?'قرار موفق':'تأمّل معي')+'</div>'
    + esc(ch.fb)+'</div>'
    +'<button onclick="hhStoryNext()" style="width:100%;background:linear-gradient(135deg,#B8924A,#8A6D2E);color:#fff;border:none;border-radius:13px;padding:12px;font-family:Cairo;font-weight:900;font-size:.9rem;cursor:pointer;margin-top:11px;">'
    + (T.scene+1>=T.data.scenes.length ? 'أنهِ الرحلة' : 'تابع القصة') + '</button>';
  fb.scrollIntoView({behavior:'smooth', block:'nearest'});
}
function hhStoryNext(){ _hhStory.scene++; hhStoryScene(); }
function hhStoryEnd(){
  var T=_hhStory; if(!T) return;
  var pct=T.total? Math.round(T.correct/T.total*100):0;
  var col=pct>=80?'#8fd0a8':pct>=50?'#f2c94c':'#f2a09a';
  var ov=document.getElementById('hh-story'); if(!ov) return;
  // حفظ في سجل مدرستي
  try{
    if(typeof _hhSchProg!=='undefined'){
      var key=T.id+'_story';
      if(pct > (_hhSchProg[key]||0)) _hhSchProg[key]=pct;
      if(typeof hhSchSave==='function') hhSchSave();
    }
    if(typeof hhLogActivity==='function') hhLogActivity('generate','قصة: '+T.data.title+' '+pct+'%');
  }catch(e){}
  ov.innerHTML='<div style="max-width:540px;width:100%;text-align:center;">'
    +'<div style="font-size:3.2rem;font-weight:900;color:'+col+';line-height:1;">'+pct+'%</div>'
    +'<div style="color:rgba(255,255,255,.7);font-size:.85rem;font-weight:800;margin:6px 0 18px;">'+T.correct+' قرار صائب من '+T.total+'</div>'
    +'<div style="background:rgba(255,255,255,.08);border:1.5px solid rgba(184,146,74,.4);border-radius:16px;padding:20px;color:#fff;font-size:.98rem;line-height:2.1;font-weight:700;margin-bottom:18px;">'+esc(T.data.ending)+'</div>'
    +'<div style="display:flex;gap:9px;justify-content:center;flex-wrap:wrap;">'
    +'<button onclick="hhStartStory(\''+T.id+'\')" style="background:rgba(255,255,255,.14);color:#fff;border:1.5px solid rgba(184,146,74,.5);border-radius:12px;padding:11px 24px;font-family:Cairo;font-weight:900;font-size:.88rem;cursor:pointer;">أعد الرحلة</button>'
    +'<button onclick="hhCloseStory()" style="background:linear-gradient(135deg,#B8924A,#8A6D2E);color:#fff;border:none;border-radius:12px;padding:11px 28px;font-family:Cairo;font-weight:900;font-size:.88rem;cursor:pointer;">إنهاء</button>'
    +'</div></div>';
}
function hhCloseStory(){
  var e=document.getElementById('hh-story'); if(e) e.remove();
  _hhStory=null;
  if(typeof hhOpenSchool==='function' && document.getElementById('hh-school')===null){ /* لا نعيد الفتح تلقائياً */ }
}

// ═══════════════════════════════════════════════════════════════════
// برامج القادة · بنية قابلة للتوسع · أولها: القائد المُلهِم
// ═══════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════
// برنامج «القائد المُلهِم» · مهارات الإلقاء والتحدث أمام الجمهور
// وصول مقيّد بصلاحية · تمارين عملية · اختبارات
// ═══════════════════════════════════════════════════════════════════

var _hhSchProg = {};
var _hhSchRole = 'student';   // student | teacher

// ═══ دعم الفصلين: الفصل الثاني (الافتراضي) والفصل الأول ═══
var _hhSchTerm = 't2';
function hhSchData(){
  return (_hhSchTerm === 't1' && window._HH_SCHOOL_T1) ? window._HH_SCHOOL_T1 : window._HH_SCHOOL;
}
function hhSchSetTerm(t){
  _hhSchTerm = (t === 't1' && window._HH_SCHOOL_T1) ? 't1' : 't2';
  hhSchLoad();
}
function _hhSchKey(){ return _HH_SCH_KEY + (_hhSchTerm === 't1' ? '_t1' : ''); }

function hhSchLoad(){
  try{ _hhSchProg = JSON.parse(localStorage.getItem(_hhSchKey()) || '{}') || {}; }
  catch(e){ _hhSchProg = {}; }
  return _hhSchProg;
}
function hhSchSave(){
  try{
    localStorage.setItem(_hhSchKey(), JSON.stringify(_hhSchProg));
    if(typeof firebase!=='undefined' && firebase.firestore && typeof currentUser!=='undefined' && currentUser){
      firebase.firestore().collection('school_progress').doc(currentUser.uid)
        .set({ progress:_hhSchProg, name:(currentUser.displayName||currentUser.email||''),
               updatedAt:new Date().toISOString() }, {merge:true}).catch(function(){});
    }
  }catch(e){}
}
hhSchLoad();

function hhSchUnitState(uIdx){
  var S = hhSchData(); if(!S) return 'locked';
  // القاعدة المعتمدة: المدرسة مفتوحة بالكامل · الإتقان شارة تقدم لا قفل
  if(_hhSchProg['u'+uIdx+'_mastery'] >= S.masteryPass) return 'done';
  return 'open';
  if(uIdx === 0) return _hhSchProg['u'+uIdx+'_mastery'] >= S.masteryPass ? 'done' : 'open';
  var prev = _hhSchProg['u'+(uIdx-1)+'_mastery'] || 0;
  if(_hhSchProg['override_u'+uIdx]) return _hhSchProg['u'+uIdx+'_mastery'] >= S.masteryPass ? 'done' : 'open';
  if(prev >= S.masteryPass) return _hhSchProg['u'+uIdx+'_mastery'] >= S.masteryPass ? 'done' : 'open';
  return 'locked';
}
function hhSchAttempts(uIdx){ return _hhSchProg['u'+uIdx+'_attempts'] || 0; }

// ── الواجهة الرئيسة ──
function hhOpenSchool(){
  var S = hhSchData();
  if(!S){ if(typeof toast==='function') toast('لم تُحمَّل بيانات مدرستي','warn'); return; }
  hhSchLoad();
  var old=document.getElementById('hh-school'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-school';
  ov.style.cssText='position:fixed;inset:0;background:linear-gradient(180deg,#F6F1E7,#EFE7D6);z-index:999974;display:flex;align-items:flex-start;justify-content:center;padding:18px 14px 40px;overflow-y:auto;direction:rtl;';

  var cards = S.units.map(function(U, i){
    var st = hhSchUnitState(i);
    var mastery = _hhSchProg['u'+i+'_mastery'] || 0;
    var col = st==='done' ? '#8A6D2E' : st==='open' ? '#8A1538' : '#B8AD94';
    var bg  = st==='done' ? '#FBF5E9' : st==='open' ? '#FFFDF8' : '#F3EFE6';
    var badge = st==='done' ? 'أُتقنت '+mastery+'%' : st==='open' ? 'متاحة الآن' : 'مقفلة';
    var lessons = U.lessons.map(function(L, j){
      var qc = (_hhSchProg[L.id+'_quick']||0), fc = (_hhSchProg[L.id+'_full']||0);
      var CHIP='display:inline-flex;align-items:center;gap:5px;border:1.5px solid #E8DFC9;border-radius:11px;padding:7px 12px;font-family:Cairo;font-size:.78rem;font-weight:800;color:#3D0918;background:linear-gradient(180deg,#fff,#FBF6EC);cursor:pointer;';
      var CHIPG='display:inline-flex;align-items:center;gap:5px;border:1.5px solid #B8924A;border-radius:11px;padding:7px 12px;font-family:Cairo;font-size:.78rem;font-weight:800;color:#3D0918;background:linear-gradient(160deg,#FBF0D8,#EAD9B0);cursor:pointer;';
      var qCount=(L.q||[]).length;
      var imgCount=0; try{ imgCount=(L.images||[]).length + (JSON.parse(localStorage.getItem('hh_li_'+L.id)||'[]')).length; }catch(e){}
      var termCount=(L.terms||[]).length;
      var isLast=(j===U.lessons.length-1);
      if(st==='locked'){
        return '<div style="background:#fff;border:1.5px solid #EDE3CE;border-radius:16px;margin-bottom:12px;padding:16px 18px;opacity:.55;display:flex;align-items:center;gap:12px;">'
          + '<div style="width:36px;height:36px;border-radius:11px;background:#ccc;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-family:Cairo;">'+(j+1)+'</div>'
          + '<div style="flex:1;"><b style="font-family:Cairo;color:#3D0918;font-size:1.05rem;">'+esc(L.title)+'</b></div>'
          + '<span style="font-size:.72rem;color:#999;font-weight:800;font-family:Cairo;">مقفل · أكمل الدرس السابق</span>'
          + '</div>';
      }
      // خدمات المنهج
      var man='<button onclick="hhJourneyOpen('+i+','+j+')" style="'+CHIP+'"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A1538" stroke-width="2"><path d="M9 20l-5-2.5V5l5 2.5m0 12.5l6-3m-6 3V7.5"/></svg>الرحلة</button>';
      if(hhStoryAvailable(L.id)) man+='<button onclick="hhStartStory(&quot;'+L.id+'&quot;)" style="'+CHIP+'">القصة</button>';
      man+='<button onclick="hhSchLesson('+i+','+j+',&quot;summary&quot;)" style="'+CHIP+'">الملخص</button>'
         + '<button onclick="hhSchLesson('+i+','+j+',&quot;terms&quot;)" style="'+CHIP+'">المصطلحات</button>'
         + '<button onclick="hhSchLesson('+i+','+j+',&quot;material&quot;)" style="'+CHIP+'">المادة</button>';
      if(_hhSchRole==='teacher') man+='<button onclick="hhLessonFiles('+i+','+j+')" style="'+CHIPG+'"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A6D2E" stroke-width="2"><rect x="3" y="3" width="18" height="14" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 13l-5-5-9 9"/></svg>ملفات الدرس'+(imgCount?' ('+imgCount+')':'')+'</button>';
      // الاختبارات
      var tst='<button onclick="hhSchTest('+i+','+j+',&quot;quick&quot;)" style="'+CHIP+'">مراجعة سريعة</button>'
            + '<button onclick="hhSchTest('+i+','+j+',&quot;short&quot;)" style="'+CHIP+'">مختصر</button>'
            + '<button onclick="hhSchTest('+i+','+j+',&quot;full&quot;)" style="'+CHIPG+'">الشامل</button>';
      if(isLast) tst+='<button onclick="hhSchTest('+i+',0,&quot;mastery&quot;)" style="background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border:1.5px solid #B8924A;border-radius:11px;padding:7px 12px;font-family:Cairo;font-size:.78rem;font-weight:900;cursor:pointer;">اختبار إتقان الوحدة</button>';
      return '<div style="background:#FFFDF8;border:1.5px solid #B8924A;border-radius:18px;overflow:hidden;box-shadow:0 8px 26px rgba(94,14,38,.12);margin-bottom:14px;">'
        // الرأس
        + '<div style="display:flex;align-items:center;gap:12px;padding:13px 18px;border-bottom:1px solid #F0E7D6;background:linear-gradient(180deg,#FDFAF3,#FBF5E9);">'
        +   '<div style="width:36px;height:36px;border-radius:11px;background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:1.05rem;font-family:Cairo;box-shadow:0 4px 10px rgba(94,14,38,.25);">'+(j+1)+'</div>'
        +   '<div style="flex:1;min-width:0;"><b style="font-family:Cairo;font-size:1.05rem;font-weight:900;color:#3D0918;display:block;line-height:1.2;">'+esc(L.title)+'</b><span style="font-family:Cairo;font-size:.66rem;color:#8A7A63;font-weight:700;">'+esc(U.unit||'')+'</span></div>'
        +   '<span style="background:#EBF2EE;color:#3D6B53;border:1px solid #3D6B53;font-size:.6rem;font-weight:900;border-radius:99px;padding:3px 11px;font-family:Cairo;white-space:nowrap;">متاح الآن</span>'
        + '</div>'
        // الجسم عمودان
        + '<div class="hh-lcard-bd" style="display:grid;grid-template-columns:1fr 264px;gap:0;">'
        +   '<div style="padding:14px 18px;">'
        +     '<div style="font-size:.64rem;font-weight:900;color:#8A1538;margin-bottom:8px;font-family:Cairo;">المنهج</div>'
        +     '<div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:11px;">'+man+'</div>'
        +     '<div style="font-size:.64rem;font-weight:900;color:#3D6B53;margin-bottom:8px;font-family:Cairo;">الاختبارات</div>'
        +     '<div style="display:flex;gap:7px;flex-wrap:wrap;">'+tst+'</div>'
        +   '</div>'
        +   '<div style="background:linear-gradient(160deg,#FBF5E9,#F4EDDE);border-right:1.5px solid #EDE3CE;padding:14px;display:flex;flex-direction:column;gap:11px;">'
        +     '<button onclick="hhOpenStage('+i+','+j+')" style="background:linear-gradient(120deg,#8A1538,#5E0E26);color:#F5E6C4;border:1.5px solid #B8924A;border-radius:14px;padding:13px;font-family:Cairo;font-weight:900;font-size:.95rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:9px;box-shadow:0 8px 20px rgba(94,14,38,.28);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>ابدأ العرض التقديمي</button>'
        +     '<div style="background:#fff;border:1px solid #EDE3CE;border-radius:13px;padding:11px 13px;"><div style="display:flex;justify-content:space-between;font-size:.7rem;font-weight:800;color:#8A7A63;margin-bottom:7px;font-family:Cairo;"><span>إتقان الدرس</span><b style="color:#3D6B53;">'+_hhLessonMastery(L.id)+'%</b></div><div style="height:9px;background:#ece7dc;border-radius:9px;overflow:hidden;"><div style="height:100%;width:'+_hhLessonMastery(L.id)+'%;background:linear-gradient(90deg,#3D6B53,#2C5340);border-radius:9px;"></div></div></div>'
        +     '<div style="display:flex;gap:8px;"><div style="flex:1;background:#fff;border:1px solid #EDE3CE;border-radius:13px;padding:10px 4px;text-align:center;"><b style="display:block;font-size:1.35rem;font-weight:900;color:#8A1538;line-height:1;font-family:Cairo;">'+qCount+'</b><span style="font-size:.56rem;color:#8A7A63;font-weight:700;font-family:Cairo;">سؤالاً</span></div><div style="flex:1;background:#fff;border:1px solid #EDE3CE;border-radius:13px;padding:10px 4px;text-align:center;"><b style="display:block;font-size:1.35rem;font-weight:900;color:#8A1538;line-height:1;font-family:Cairo;">'+imgCount+'</b><span style="font-size:.56rem;color:#8A7A63;font-weight:700;font-family:Cairo;">صور الكتاب</span></div><div style="flex:1;background:#fff;border:1px solid #EDE3CE;border-radius:13px;padding:10px 4px;text-align:center;"><b style="display:block;font-size:1.35rem;font-weight:900;color:#8A1538;line-height:1;font-family:Cairo;">'+termCount+'</b><span style="font-size:.56rem;color:#8A7A63;font-weight:700;font-family:Cairo;">مصطلحات</span></div></div>'
        +   '</div>'
        + '</div>'
        + '</div>';
    }).join('');

    var attempts = hhSchAttempts(i);
    var support = (attempts >= 2 && st === 'open')
      ? '<div style="background:#FDF3DD;border:1.5px solid #B8924A;border-radius:9px;padding:9px 11px;margin-top:6px;font-size:.74rem;color:#8A6D2E;font-weight:800;line-height:1.7;">'
        + 'حاولت '+attempts+' مرات · راجع الملخصات ثم أعد المحاولة. '
        + '<button onclick="hhSchSupport('+i+')" style="background:#B8924A;color:#fff;border:none;border-radius:7px;padding:4px 11px;font-family:Cairo;font-weight:900;font-size:.68rem;cursor:pointer;">مسار الدعم</button></div>'
      : '';

    var topCol = st==='done' ? '#B8924A' : st==='open' ? '#8A1538' : '#C9BFA8';
    return '<div style="background:#fff;border:1px solid '+(st==='locked'?'#DDD6C8':'#B8924A')+';border-top:3px solid '+topCol+';border-radius:0 0 14px 14px;padding:13px;margin-bottom:12px;box-shadow:0 3px 12px rgba(94,14,38,.06);">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:9px;">'
      +   '<div style="font-weight:800;font-size:1.06rem;color:'+topCol+';">'+esc(U.unit)+'</div>'
      +   '<span style="background:'+(st==='locked'?'#C9BFC3':'linear-gradient(135deg,#EAD9B0,#B8924A)')+';color:'+(st==='locked'?'#fff':'#3D0918')+';border-radius:99px;padding:2px 12px;font-size:.76rem;font-weight:700;border:1px solid '+(st==='locked'?'transparent':'#FDF3DD')+';">'+badge+'</span>'
      + '</div>'
      + lessons
      + (st!=='locked'
          ? '<button onclick="hhSchTest('+i+',-1,&quot;mastery&quot;)" style="width:100%;background:'+(st==='done'?'linear-gradient(135deg,#3D6B53,#274a38)':'linear-gradient(135deg,#EAD9B0,#B8924A)')+';color:'+(st==='done'?'#fff':'#3D0918')+';border:1px solid '+(st==='done'?'#3D6B53':'#FDF3DD')+';border-radius:11px;padding:11px;font-weight:700;font-size:.95rem;cursor:pointer;margin-top:7px;box-shadow:0 4px 12px rgba(138,21,56,.18);">'
            + (st==='done' ? 'أعد اختبار الإتقان ('+mastery+'%)' : 'اختبار الإتقان · يفتح الوحدة التالية ('+S.masteryPass+'%)')
            + '</button>'
          : '<div style="text-align:center;font-size:.74rem;color:#888;font-weight:800;padding:8px;">اجتز اختبار إتقان الوحدة السابقة لفتح هذه الوحدة</div>'
            + ((_hhMyRole==='teacher'||(typeof hhIsAdmin==='function'&&hhIsAdmin())) ? '<button onclick="hhSchOverride('+i+')" style="width:100%;background:#fff;color:#8A6D2E;border:1.5px solid #B8924A;border-radius:9px;padding:7px;font-family:Cairo;font-weight:900;font-size:.72rem;cursor:pointer;margin-top:5px;">فتح استثنائي (المعلم)</button>' : ''))
      + support
      + '</div>';
  }).join('');

  var doneCount = S.units.filter(function(U,i){ return hhSchUnitState(i)==='done'; }).length;
  var pct = Math.round(doneCount / S.units.length * 100);

  var orn='<svg width="110" height="110" viewBox="0 0 70 70" style="position:absolute;top:-30px;left:-30px;opacity:.11;pointer-events:none;" aria-hidden="true"><g fill="none" stroke="#D4BC85" stroke-width="1.2"><circle cx="35" cy="35" r="30"/><circle cx="35" cy="35" r="21"/><path d="M35 5v60M5 35h60M14 14l42 42M56 14L14 56"/></g></svg>';
  ov.innerHTML = '<div style="background:#FBF7F0;border:2px solid #B8924A;border-radius:20px;max-width:680px;width:100%;overflow:hidden;margin-bottom:24px;">'
    + '<div style="background:linear-gradient(175deg,#4A0B1E,#5E0E26);color:#fff;padding:16px 18px 14px;position:relative;overflow:hidden;border-bottom:2px solid #B8924A;">'
    +   orn
    +   '<div style="display:flex;justify-content:space-between;align-items:center;position:relative;">'
    +     '<div style="font-weight:700;font-size:1.35rem;">المدرسة</div>'
    +     '<div style="display:flex;gap:7px;">'
    +       '<button onclick="hhSchBack()" title="رجوع خطوة" aria-label="رجوع خطوة" style="background:rgba(212,188,133,.15);border:1px solid rgba(212,188,133,.5);border-radius:9px;height:30px;padding:0 12px;color:#FDF3DD;font-size:.8rem;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:5px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>رجوع</button>'
    +       '<button onclick="hhSchHome()" title="الشاشة الرئيسية" aria-label="الشاشة الرئيسية" style="background:rgba(212,188,133,.15);border:1px solid rgba(212,188,133,.5);border-radius:9px;width:30px;height:30px;color:#FDF3DD;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l9 7v11h-6v-7H9v7H3V10l9-7z"/></svg></button>'
    +     '</div></div>'
    +   '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;position:relative;">'
    +     '<span style="background:rgba(212,188,133,.16);border:1px solid #B8924A;color:#FDF3DD;border-radius:99px;padding:2px 12px;font-size:.82rem;font-weight:700;">'+esc(S.grade)+'</span>'
    +     '<span style="background:rgba(212,188,133,.16);border:1px solid #B8924A;color:#FDF3DD;border-radius:99px;padding:2px 12px;font-size:.82rem;font-weight:700;">'+esc(S.subject)+'</span>'
    +     '<span style="background:rgba(212,188,133,.16);border:1px solid #B8924A;color:#FDF3DD;border-radius:99px;padding:2px 12px;font-size:.82rem;font-weight:700;">'+esc(S.term)+'</span>'
    +   '</div>'
    +   '<div style="display:flex;align-items:center;gap:12px;margin-top:12px;position:relative;">'
    +     '<span style="width:46px;height:46px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#F5E6C4,#B8924A 70%);border:2px solid #FDF3DD;display:inline-flex;align-items:center;justify-content:center;color:#3D0918;font-weight:700;font-size:.92rem;box-shadow:0 0 0 3px rgba(212,188,133,.25);flex-shrink:0;">'+pct+'%</span>'
    +     '<div style="flex:1;">'
    +       '<div style="background:rgba(255,255,255,.13);border-radius:99px;height:9px;border:1px solid rgba(212,188,133,.3);"><div style="background:linear-gradient(90deg,#EAD9B0,#B8924A);border-radius:99px;height:100%;width:'+pct+'%;transition:width .5s;"></div></div>'
    +       '<div style="font-size:.8rem;color:#EAD9B0;margin-top:4px;font-weight:700;">أتممت '+doneCount+' من '+S.units.length+' وحدات في رحلة الإتقان</div>'
    +     '</div>'
    +   '</div>'
    +   (_hhSchRole==='teacher'
        ? '<div style="display:flex;align-items:center;gap:8px;margin-top:11px;position:relative;flex-wrap:wrap;">'
          + '<span style="background:rgba(31,78,121,.35);border:1px solid #6FA8DC;color:#CFE2F3;border-radius:99px;padding:2px 12px;font-size:.76rem;font-weight:700;">وضع المعلم</span>'
          + '<button onclick="hhSchTeacherAdd()" style="background:linear-gradient(135deg,#EAD9B0,#B8924A);color:#3D0918;border:1px solid #FDF3DD;border-radius:99px;padding:5px 16px;font-weight:700;font-size:.82rem;cursor:pointer;">+ إضافة محتوى</button>'
          + '<span style="color:#D4BC85;font-size:.72rem;">ارفع درساً وحوّله تلقائياً إلى اختبار أو قصة</span>'
          + '</div>'
        : '')
    + '</div>'
    + '<div style="padding:15px 18px;">'
    +   (function(){
        var isAdm = (typeof hhIsAdmin==='function' && hhIsAdmin());
        var isTch = (_hhMyRole==='teacher') || isAdm;
        var roleLbl = isAdm ? 'مدير المنصة' : isTch ? 'معلم معتمد' : 'طالب';
        var roleCol = isAdm ? '#8A1538' : isTch ? '#1F4E79' : '#3D6B53';
        var cls = (_hhMyClasses && _hhMyClasses.length)
          ? _hhMyClasses.map(function(c){ return esc(c.name||''); }).join(' · ') : '';
        function svc(on, col, dark, name, d, ico){
          return '<button onclick="'+on+'" style="display:flex;flex-direction:column;align-items:center;gap:7px;background:#fff;border:1.5px solid '+col+';border-radius:14px;padding:13px 8px;font-family:Cairo;cursor:pointer;text-align:center;box-shadow:0 3px 10px rgba(94,14,38,.07);transition:transform .15s,box-shadow .15s;" onmouseover="this.style.transform=\'translateY(-3px)\';this.style.boxShadow=\'0 8px 18px rgba(94,14,38,.16)\'" onmouseout="this.style.transform=\'\';this.style.boxShadow=\'0 3px 10px rgba(94,14,38,.07)\'">'
            + '<span style="width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,'+col+','+dark+');display:inline-flex;align-items:center;justify-content:center;">'
            + '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'+ico+'</svg></span>'
            + '<span style="font-weight:900;font-size:.8rem;color:'+col+';">'+name+'</span>'
            + '<span style="font-weight:700;font-size:.64rem;color:#999;line-height:1.6;">'+d+'</span>'
            + '</button>';
        }
        var I = {
          approve:'<path d="M12 3L2 8l10 5 10-5-10-5z"/><path d="M6 10.5V15c0 1.4 2.7 2.8 6 2.8s6-1.4 6-2.8v-4.5"/><path d="M9 19l2 2 4-4"/>',
          classes:'<path d="M17 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9.5" cy="8" r="3.5"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M15.5 4.6a3.5 3.5 0 010 6.8"/>',
          gradebook:'<path d="M4 4h13a3 3 0 013 3v13H7a3 3 0 01-3-3V4z"/><path d="M8 4v16"/><path d="M12 9h5"/><path d="M12 13h5"/>',
          curriculum:'<path d="M4 4h7a3 3 0 013 3v13a2.5 2.5 0 00-2.5-2H4V4z"/><path d="M20 4h-7a3 3 0 00-3 3v13a2.5 2.5 0 012.5-2H20V4z"/>',
          join:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M7 9h4"/><path d="M7 13h2"/><path d="M14.5 11.5l2 2 3.5-3.5"/>',
          request:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 016-6h1"/><path d="M17 14v6"/><path d="M14 17h6"/>'
        };
        var services = '';
        if(isAdm) services += svc('hhAdminTeachers()','#8A1538','#5E0E26','اعتماد المعلمين','مراجعة طلبات الاعتماد', I.approve);
        if(isTch){
          services += svc('hhOpenClasses()','#1F4E79','#12304d','صفوفي','إنشاء الصفوف وأكواد الدعوة', I.classes);
          services += svc('hhOpenGradebook()','#8A6D2E','#5E4A1E','دفتر المتابعة','درجات وحضور وسلوك', I.gradebook);
          services += svc('hhOpenCurriculum()','#1F4E79','#12304d','مركز المناهج','رفع الدروس وتوليد المحتوى', I.curriculum);
        } else {
          services += svc('hhJoinClassPrompt()','#3D6B53','#26443A','انضم بكود','ادخل صف معلمك برمز من 6 خانات', I.join);
          services += svc('hhRequestTeacher()','#8A6D2E','#5E4A1E','أنا معلم','اطلب اعتمادك كمعلم', I.request);
        }
        return '<div id="hh-sch-services" style="background:#fff;border:1.5px solid '+roleCol+';border-radius:13px;padding:11px 12px;margin-bottom:12px;">'
          + '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px;">'
          + '<span style="background:'+roleCol+';color:#fff;border-radius:8px;padding:3px 12px;font-size:.7rem;font-weight:900;">'+roleLbl+'</span>'
          + (cls?'<span style="font-size:.72rem;color:#888;font-weight:700;">'+cls+'</span>':'')
          + '</div>'
          + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:9px;">'+services+'</div>'
          + '</div>';
      })()
    +   cards
    +   ((_hhMyRole==='teacher'||(typeof hhIsAdmin==='function'&&hhIsAdmin()))
        ? '<button onclick="hhSchTeacherPanel()" style="width:100%;background:linear-gradient(135deg,#1F4E79,#12304d);color:#fff;border:none;border-radius:11px;padding:10px;font-family:Cairo;font-weight:900;font-size:.82rem;cursor:pointer;margin-top:6px;">لوحة متابعة الصف</button>'
        : '')
    + '</div></div>';
  document.body.appendChild(ov);
}
// رجوع خطوة: يغلق أعلى نافذة خدمة فوق المدرسة، وإلا يغلق المدرسة نفسها
var _HH_SCH_LAYERS = ['hh-story','hh-sch-approve','hh-curriculum','hh-gradebook','hh-classes','hh-cert-maker','hh-sch-test'];
function hhSchBack(){
  for(var i=0;i<_HH_SCH_LAYERS.length;i++){
    var e=document.getElementById(_HH_SCH_LAYERS[i]);
    if(e){ e.remove(); return; }
  }
  hhCloseSchool();
}
function hhSchHome(){
  _HH_SCH_LAYERS.forEach(function(id){ var e=document.getElementById(id); if(e) e.remove(); });
  hhCloseSchool();
  if(typeof showScreen==='function') showScreen('screen-menu');
}
function hhCloseSchool(){ var e=document.getElementById('hh-school'); if(e) e.remove(); }

/* ═══════════════════════════════════════════════════════════
   معالج الدخول المتدرج لمدرستي (ترحيب ← الدور ← الوجهة ← الصف ← المادة ← الفصل)
   ═══════════════════════════════════════════════════════════ */
var _hhSchWiz = { step:'welcome', role:null };

// دور المدرسة: يُستنتج من السياق (المسار أو تصنيف المستخدم في المنصة) · لا يُسأل
var _hhSchRole = 'student';
function hhSchResolveRole(explicit){
  if(explicit==='teacher' || explicit==='student'){ _hhSchRole=explicit; return _hhSchRole; }
  try{
    if(typeof hhIsAdmin==='function' && hhIsAdmin()){ _hhSchRole='teacher'; return _hhSchRole; }
    if(typeof _hhMyRole!=='undefined' && _hhMyRole==='teacher'){ _hhSchRole='teacher'; return _hhSchRole; }
    // معلم غير معتمد: اختار دور «معلم» في المنصة · يرى الحرم كاملاً وتُقفل عليه أدوات المعتمد
    var self=localStorage.getItem('hh_user_role'); if(self==='teacher'){ _hhSchRole='teacher'; return _hhSchRole; }
  }catch(e){}
  _hhSchRole='student';
  return _hhSchRole;
}
function hhSchoolEntry(role){
  hhSchResolveRole(role);
  try{ localStorage.setItem('hh_sch_wiz_role', _hhSchRole); }catch(e){}
  // من أتم المعالج سابقاً يدخل مباشرة: المعلم لحرمه والطالب لوحداته
  var done=false; try{ done = localStorage.getItem('hh_sch_wiz_done')==='1'; }catch(e){}
  if(done){ hhSchoolHub(); return; }
  _hhSchWiz = { step:'welcome', role:_hhSchRole };
  hhSchWizRender();
}
function hhSchWizClose(){ var e=document.getElementById('hh-sch-wiz'); if(e) e.remove(); }
function hhSchWizGo(step){ _hhSchWiz.step=step; hhSchWizRender(); }
function hhSchWizRole(r){
  _hhSchWiz.role=r; try{ localStorage.setItem('hh_sch_wiz_role', r); }catch(e){}
  hhSchWizGo('grade');
}

// ═══════════════ الحرم المدرسي الموحد (zzx): جناح ثابت ومسرح تتبدل فيه الخدمات ═══════════════
var _hhHubClasses = null;
var _hhCampus = { dest:'home', obs:null, role:'student' };
// الدور في الحرم: student | teacher (غير معتمد) | approved (معتمد أو مدير)
function hhCampusRole(){
  try{
    if(typeof hhIsAdmin==='function' && hhIsAdmin()) return 'approved';
    if(typeof _hhMyRole!=='undefined' && _hhMyRole==='teacher') return 'approved';
    if(_hhSchRole==='teacher') return 'teacher';
    if(localStorage.getItem('hh_user_role')==='teacher') return 'teacher';
  }catch(e){}
  return 'student';
}
// مصفوفة البوابات: lock = تظهر للمعلم غير المعتمد مقفلة (عرض فقط + طلب الاعتماد)
var _HH_CAMPUS_NAV_ALL = [
  {id:'home',        t:'الرئيسة',            grp:'المدرسة', ico:'home',  roles:['student','teacher','approved']},
  {id:'school',      t:'المنهج · مدرستي',    grp:'المدرسة', ico:'cap',   roles:['student','teacher','approved']},
  {id:'quiz',        t:'الاختبارات والقصص',  grp:'المدرسة', ico:'lab',   roles:['student','teacher','approved']},
  {id:'lessons',     t:'دروسي الخاصة',       grp:'المدرسة', ico:'lib',   roles:['teacher','approved'], lock:['teacher']},
  {id:'myclass',     t:'صفي',                grp:'أنا',     ico:'users', roles:['student']},
  {id:'achievements',t:'إنجازاتي',           grp:'أنا',     ico:'medal', roles:['student']},
  {id:'mycerts',     t:'شهاداتي',            grp:'أنا',     ico:'cert',  roles:['student']},
  {id:'classes',     t:'صفوفي وطلابي',       grp:'طلابي',   ico:'users', roles:['teacher','approved']},
  {id:'gradebook',   t:'دفتر المتابعة',      grp:'طلابي',   ico:'book',  roles:['teacher','approved'], lock:['teacher']},
  {id:'certs',       t:'الشهادات',           grp:'طلابي',   ico:'medal', roles:['teacher','approved'], lock:['teacher']}
];
var _HH_CAMPUS_NAV = _HH_CAMPUS_NAV_ALL;
function hhCampusNavFor(role){ return _HH_CAMPUS_NAV_ALL.filter(function(n){ return n.roles.indexOf(role)!==-1; }); }
function hhCampusIsLocked(id){ var n=null; _HH_CAMPUS_NAV_ALL.forEach(function(x){ if(x.id===id) n=x; }); return !!(n && n.lock && n.lock.indexOf(_hhCampus.role)!==-1); }
function _hhCampusIco(name, sz){
  sz = sz || 16;
  var P = {
    home: '<path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V9.5z"/>',
    cap:  '<path d="M22 9L12 4 2 9l10 5 10-5z"/><path d="M6 11.5V17c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5"/>',
    lab:  '<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3"/>',
    lib:  '<path d="M4 4h5v16H4zM10 4h5v16h-5zM17.5 4.5l4 1-3.5 15-4-1z"/>',
    users:'<path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    book: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 4v16"/>',
    medal:'<circle cx="12" cy="9" r="5"/><path d="M9 13.5L7.5 21l4.5-2.5L16.5 21 15 13.5"/>',
    play: '<polygon points="6 4 20 12 6 20 6 4"/>',
    back: '<polyline points="15 18 9 12 15 6"/>',
    refresh:'<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
    ext:  '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
    chev: '<polyline points="15 18 9 12 15 6"/>',
    cert: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M7 9h10M7 13h6"/><circle cx="17" cy="15" r="2"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    trophy:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3"/>'
  };
  return '<svg width="'+sz+'" height="'+sz+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(P[name]||'')+'</svg>';
}

function hhSchoolHub(){
  try{ document.body.classList.add('hh-immersive'); }catch(e){}
  var old=document.getElementById('hh-school-hub'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-school-hub'; ov.className='hh-campus';
  var _r0 = hhCampusRole();
  var uname = (typeof currentUser!=='undefined' && currentUser && (currentUser.displayName||'').split(' ')[0]) || (_r0==='student' ? 'أيها الطالب' : 'أيها المعلم');

  _hhCampus.role = hhCampusRole();
  var role=_hhCampus.role;
  function navHTML(){
    var out='', lastGrp='';
    hhCampusNavFor(role).forEach(function(n){
      if(n.grp!==lastGrp){ out+='<div class="hh-campus-grp">'+n.grp+'</div>'; lastGrp=n.grp; }
      var locked = n.lock && n.lock.indexOf(role)!==-1;
      out+='<button type="button" class="hh-campus-nav'+(locked?' locked':'')+'" data-dest="'+n.id+'" onclick="hhHubGo(\''+n.id+'\')" title="'+(locked?'للمعلم المعتمد · اطلب الاعتماد':'')+'"><span class="hh-campus-nav-ic">'+_hhCampusIco(n.ico,15)+'</span><span class="hh-campus-nav-t">'+n.t+'</span>'+(locked?'<span class="hh-campus-lock">'+_hhCampusIco('lock',12)+'</span>':'')+'</button>';
    });
    if(role==='student') out+='<button type="button" class="hh-campus-nav hh-campus-nav-minor" onclick="hhSchApprovalForm()"><span class="hh-campus-nav-ic">'+_hhCampusIco('cap',15)+'</span><span class="hh-campus-nav-t">أنا معلم</span></button>';
    if(role==='teacher') out+='<button type="button" class="hh-campus-nav hh-campus-nav-cta" onclick="hhSchApprovalForm()"><span class="hh-campus-nav-ic">'+_hhCampusIco('cap',15)+'</span><span class="hh-campus-nav-t">اطلب الاعتماد</span></button>';
    return out;
  }
  var roleLabel = role==='approved' ? 'معلم معتمد' : role==='teacher' ? 'معلم' : 'طالب';

  ov.innerHTML =
    '<div class="hh-campus-top">'
    +'<div class="hh-campus-top-btns">'
    +  '<button type="button" onclick="hhHubBack()" class="hh-campus-btn-ghost">'+_hhCampusIco('back',14)+' رجوع</button>'
    +  '<button type="button" onclick="hhHubClose()" class="hh-campus-btn-ghost hh-campus-btn-ico" aria-label="الرئيسية"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3l9 7v11h-6v-7H9v7H3V10l9-7z"/></svg></button>'
    +'</div>'
    +'<div class="hh-campus-title"><span>المدرسة · الحرم المدرسي</span><span id="hh-hub-role" class="hh-campus-role">'+roleLabel+'</span></div>'
    +'<span class="hh-campus-top-spacer"></span>'
    +'</div>'

    +'<div class="hh-campus-body">'
    +'<nav class="hh-campus-side" id="hh-campus-side">'+navHTML()+'</nav>'
    +'<section class="hh-campus-stage">'
    +  '<div class="hh-campus-crumb-row">'
    +    '<div class="hh-campus-crumb"><span>المدرسة</span><span id="hh-campus-crumb"></span></div>'
    +    (role!=='student' ? '<button type="button" onclick="hhHubGo(\'classes\')" class="hh-campus-btn-gold">'+_hhCampusIco('play',14)+' ابدأ حصة الآن · رمز فوري</button>' : '<button type="button" onclick="hhHubGo(\'school\')" class="hh-campus-btn-gold">'+_hhCampusIco('play',14)+' تابع رحلتي</button>')
    +  '</div>'

    +  '<div id="hh-campus-home">'
    +    '<div class="hh-campus-hello">حيّاك الله '+esc(uname)+(role==='student'?' · رحلتك بين يديك':' · صفوفك بين يديك')+'</div>'
    +    '<div id="hh-hub-sub" class="hh-campus-sub">'+(role==='student'?'كل درس رحلة على الخريطة · وكل مفهوم تُتقنه راية على قلعتك':'جارٍ تحميل صفوفك…')+'</div>'
    +    (role==='student'
        ? '<div class="hh-campus-stats">'
          +'<div class="hh-campus-stat"><div class="hh-campus-stat-l">وحدات متقنة</div><div class="hh-campus-stat-n" id="hh-campus-n-units">—</div></div>'
          +'<div class="hh-campus-stat"><div class="hh-campus-stat-l">نقاط الرحلات</div><div class="hh-campus-stat-n" id="hh-campus-n-pts">—</div></div>'
          +'<div class="hh-campus-stat"><div class="hh-campus-stat-l">رايات مرفوعة</div><div class="hh-campus-stat-n" id="hh-campus-n-flags">—</div></div>'
          +'</div>'
        : '<div class="hh-campus-stats">'
          +'<div class="hh-campus-stat"><div class="hh-campus-stat-l">صفوف حية</div><div class="hh-campus-stat-n" id="hh-campus-n-classes">—</div></div>'
          +'<div class="hh-campus-stat"><div class="hh-campus-stat-l">طلاب مرتبطون</div><div class="hh-campus-stat-n" id="hh-campus-n-students">—</div></div>'
          +'<div class="hh-campus-stat"><div class="hh-campus-stat-l">وحدات متقنة</div><div class="hh-campus-stat-n" id="hh-campus-n-units">—</div></div>'
          +'</div>')
    +    '<div id="hh-campus-resume"></div>'
    +    (role==='student'
        ? '<div class="hh-campus-sec"><span class="hh-campus-sec-dot"></span>صفي</div><div id="hh-hub-classes" class="hh-campus-classes"><div class="hh-campus-empty">جارٍ التحقق من صفك…</div></div>'
        : '<div class="hh-campus-sec">'+'<span class="hh-campus-sec-dot"></span>'+'صفوفي'+'</div>'
          +'<div id="hh-hub-classes" class="hh-campus-classes"><div class="hh-campus-empty">جارٍ تحميل الصفوف…</div></div>')
    +    '<div id="hh-hub-pulse" class="hh-campus-pulse" style="display:none;"></div>'
    +  '</div>'

    +  '<div id="hh-campus-classes-pane" hidden>'
    +    '<div class="hh-campus-sec"><span class="hh-campus-sec-dot"></span>صفوفي وطلابي</div>'
    +    '<div id="hh-campus-classes-list" class="hh-campus-classes"></div>'
    +  '</div>'

    +  '<div id="hh-campus-myclass-pane" hidden>'
    +    '<div class="hh-campus-sec"><span class="hh-campus-sec-dot"></span>صفي</div>'
    +    '<div id="hh-campus-myclass"><div class="hh-campus-empty">جارٍ التحقق…</div></div>'
    +  '</div>'
    +  '<div id="hh-campus-ach-pane" hidden>'
    +    '<div class="hh-campus-sec"><span class="hh-campus-sec-dot"></span>إنجازاتي</div>'
    +    '<div id="hh-campus-ach"></div>'
    +  '</div>'
    +  '<div id="hh-campus-lockbar" class="hh-campus-lockbar" hidden>'+_hhCampusIco('lock',16)+'<span>هذه الأداة للمعلم المعتمد · تستعرضها الآن للاطلاع فقط</span><button type="button" class="hh-campus-btn-gold" onclick="hhSchApprovalForm()">اطلب الاعتماد الآن</button></div>'
    +  '<div id="hh-campus-mount" class="hh-campus-mount"></div>'
    +  '<div id="hh-campus-notice" class="hh-campus-empty" hidden></div>'
    +'</section>'
    +'</div>';

  document.body.appendChild(ov);
  try{ if(typeof hhIsAdmin==='function' && hhIsAdmin()){ document.getElementById('hh-hub-role').textContent='مدير المنصة'; } }catch(e){}
  _hhCampus.dest='home';
  hhCampusSetNav('home');
  hhCampusWatchMount();
  hhCampusRenderResume();
  hhCampusRenderUnits();
  if(role==='student'){ hhCampusRenderStudentStats(); hhCampusLoadMyClass(); } else { hhHubLoadClasses(); }
}

function hhCampusSetNav(dest){
  var crumb={home:'',school:' · المنهج',quiz:' · الاختبارات والقصص',lessons:' · دروسي الخاصة',classes:' · صفوفي وطلابي',gradebook:' · دفتر المتابعة',certs:' · الشهادات',myclass:' · صفي',achievements:' · إنجازاتي',mycerts:' · شهاداتي'};
  document.querySelectorAll('#hh-campus-side .hh-campus-nav').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-dest')===dest); });
  var c=document.getElementById('hh-campus-crumb'); if(c) c.textContent=crumb[dest]||'';
  var home=document.getElementById('hh-campus-home'), cls=document.getElementById('hh-campus-classes-pane'), mount=document.getElementById('hh-campus-mount'), note=document.getElementById('hh-campus-notice');
  var myc=document.getElementById('hh-campus-myclass-pane'), ach=document.getElementById('hh-campus-ach-pane'), lb=document.getElementById('hh-campus-lockbar');
  var native = (dest==='home'||dest==='classes'||dest==='myclass'||dest==='achievements');
  if(home) home.hidden = dest!=='home';
  if(cls)  cls.hidden  = dest!=='classes';
  if(myc)  myc.hidden  = dest!=='myclass';
  if(ach)  ach.hidden  = dest!=='achievements';
  if(mount){ mount.hidden = native; mount.classList.toggle('hh-campus-locked', hhCampusIsLocked(dest)); }
  if(lb) lb.hidden = !hhCampusIsLocked(dest);
  if(note) note.hidden = true;
  _hhCampus.dest=dest;
  try{ var st=document.querySelector('#hh-school-hub .hh-campus-stage'); if(st) st.scrollTop=0; document.getElementById('hh-school-hub').scrollTop=0; }catch(e){}
}

// تبنّي أي طبقة ثابتة تنشئها الخدمة وإدراجها داخل المسرح بدل ملء الشاشة
function hhCampusAdopt(fn){
  var mount=document.getElementById('hh-campus-mount'); if(!mount) return false;
  while(mount.firstChild) mount.removeChild(mount.firstChild);
  var before=[]; Array.prototype.forEach.call(document.body.children,function(el){ before.push(el); });
  try{ fn(); }catch(e){ console.warn('campus service error', e); }
  var adopted=0;
  Array.prototype.slice.call(document.body.children).forEach(function(el){
    if(before.indexOf(el)!==-1) return;
    if(el.id==='hh-school-hub') return;
    if((el.style && el.style.position)!=='fixed') return;
    el.classList.add('hh-campus-adopted');
    mount.appendChild(el); adopted++;
  });
  return adopted>0;
}
function hhCampusWatchMount(){
  var mount=document.getElementById('hh-campus-mount'); if(!mount || typeof MutationObserver==='undefined') return;
  if(_hhCampus.obs){ try{ _hhCampus.obs.disconnect(); }catch(e){} }
  _hhCampus.obs=new MutationObserver(function(){
    // إذا أغلقت الخدمة نفسها (زر إغلاقها الداخلي) نعود للرئيسة بدل مسرح فارغ
    if(['home','classes','myclass','achievements'].indexOf(_hhCampus.dest)===-1 && !mount.firstChild){ hhHubGo('home'); }
  });
  _hhCampus.obs.observe(mount,{childList:true});
}
function hhCampusNotice(msg){
  var n=document.getElementById('hh-campus-notice'); if(!n) return;
  n.textContent=msg; n.hidden=false;
}

function hhHubGo(dest){
  if(!document.getElementById('hh-school-hub')){ hhSchoolHub(); }
  hhCampusSetNav(dest);
  if(dest==='home'){ var m=document.getElementById('hh-campus-mount'); if(m) while(m.firstChild) m.removeChild(m.firstChild); hhCampusRenderResume(); hhCampusRenderUnits(); return; }
  if(dest==='classes'){ hhCampusRenderClasses(); return; }
  if(dest==='myclass'){ hhCampusLoadMyClass(); return; }
  if(dest==='achievements'){ hhCampusRenderAchievements(); return; }
  if(hhCampusIsLocked(dest)){ hhCampusLockedPreview(dest); return; }
  var ok=false;
  if(dest==='school' || dest==='quiz'){ hhSchSetTerm(_hhSchTerm||'t1'); ok=hhCampusAdopt(function(){ hhOpenSchool(); }); }
  else if(dest==='lessons'){ ok=hhCampusAdopt(function(){ if(typeof hhOpenCurriculum==='function') hhOpenCurriculum(); }); }
  else if(dest==='gradebook'){ ok=hhCampusAdopt(function(){ if(typeof hhOpenGradebook==='function') hhOpenGradebook(); }); }
  else if(dest==='certs' || dest==='mycerts'){ ok=hhCampusAdopt(function(){ if(typeof hhOpenCertificates==='function') hhOpenCertificates(); }); }
  if(!ok){ hhCampusNotice('هذه الخدمة تحتاج صلاحية المعلم أو ما زالت قيد التجهيز'); }
}
function hhHubBack(){
  if(_hhCampus.dest!=='home'){ hhHubGo('home'); return; }
  hhHubClose();
}
function hhHubClose(){
  var e=document.getElementById('hh-school-hub'); if(e) e.remove();
  if(_hhCampus.obs){ try{ _hhCampus.obs.disconnect(); }catch(e2){} _hhCampus.obs=null; }
  try{ document.body.classList.remove('hh-immersive'); }catch(e3){}
  if(typeof showScreen==='function') showScreen('screen-menu');
}
function hhCampusOpenClassrooms(){
  if(typeof openClassroomsScreen==='function'){ hhHubClose(); openClassroomsScreen(); }
}

// بطاقة «تابع من حيث توقفت» من ذاكرة المنهج المحلية
function hhCampusRenderResume(){
  var box=document.getElementById('hh-campus-resume'); if(!box) return;
  var last=null; try{ last=JSON.parse(localStorage.getItem('hh_sch_last_lesson')||'null'); }catch(e){}
  if(!last || !last.title){ box.innerHTML=''; return; }
  box.innerHTML='<div class="hh-campus-card hh-campus-card-accent" onclick="hhCampusResume()">'
    +'<div class="hh-campus-card-t">تابع من حيث توقفت</div>'
    +'<div class="hh-campus-card-d">'+esc(last.unit||'')+(last.unit?' · ':'')+esc(last.title)+(last.kind?' · '+esc(last.kind):'')+'</div>'
    +'<span class="hh-campus-chip">'+_hhCampusIco('chev',12)+' افتح</span>'
    +'</div>';
}
function hhCampusResume(){
  var last=null; try{ last=JSON.parse(localStorage.getItem('hh_sch_last_lesson')||'null'); }catch(e){}
  hhHubGo('school');
  if(last){ try{ hhSchSetTerm(last.term||_hhSchTerm); if(last.kindKey==='journey' && typeof hhJourneyOpen==='function') hhJourneyOpen(last.ui,last.li); else if(typeof hhSchLesson==='function') hhSchLesson(last.ui,last.li,last.kindKey||'summary'); }catch(e){} }
}
function hhCampusRenderUnits(){
  var n=document.getElementById('hh-campus-n-units'); if(!n) return;
  try{ var S=hhSchData(); hhSchLoad(); var done=0; if(S&&S.units) S.units.forEach(function(u,i){ if(hhSchUnitState(i)==='done') done++; }); n.textContent=done+(S&&S.units?' / '+S.units.length:''); }catch(e){ n.textContent='—'; }
}

// ═══ معاينة الأدوات المقفلة للمعلم غير المعتمد (عرض فقط) ═══
function hhCampusLockedPreview(dest){
  var mount=document.getElementById('hh-campus-mount'); if(!mount) return;
  var P={
    lessons:{t:'دروسي الخاصة',d:'أنشئ دروسك بنفسك أو ارفع درساً فيتحول تلقائياً إلى ملخص وأسئلة وقصة، ثم أرسله لصفوفك.',items:['ملخص احترافي بنقاط مرقمة','بنك أسئلة بمستويات سهل ومتوسط وصعب','قصة تفاعلية خماسية المشاهد','رحلة على الخريطة لكل درس']},
    gradebook:{t:'دفتر المتابعة',d:'رصد الدرجات والحضور والسلوك والمهارات لكل طالب، مع جلب درجات مدرستي تلقائياً وتقرير جامع قابل للتصدير.',items:['رصد الدرجات بسبب وتاريخ','الحضور والغياب','السلوك والمهارات','درجات مدرستي للطلاب المرتبطين','تقرير جامع إلى Excel']},
    certs:{t:'الشهادات',d:'إصدار شهادات إتقان بختم المنصة باسمك لطلابك المستحقين، مع سجل يمنع التزوير.',items:['شهادة إتقان الوحدة','شهادة إتمام الفصل','ختم المنصة واسم المعلم','سجل تحقق لكل شهادة']}
  }[dest]; if(!P) return;
  while(mount.firstChild) mount.removeChild(mount.firstChild);
  var el=document.createElement('div'); el.className='hh-campus-preview';
  el.innerHTML='<div class="hh-campus-card"><div class="hh-campus-card-t">'+P.t+'</div><div class="hh-campus-card-d">'+P.d+'</div>'
    +'<div class="hh-campus-sec"><span class="hh-campus-sec-dot"></span>ما ستحصل عليه بعد الاعتماد</div>'
    +'<div class="hh-campus-classes">'+P.items.map(function(x){ return '<div class="hh-campus-card"><div class="hh-campus-card-d" style="color:#3D0918;font-weight:800;">'+_hhCampusIco('lock',12)+' '+x+'</div></div>'; }).join('')+'</div></div>';
  mount.appendChild(el);
}

// ═══ الطالب: صفه وإنجازاته ═══
function hhCampusStudentSummary(){
  var pts=0, flags=0, journeys=0;
  try{
    for(var i=0;i<localStorage.length;i++){ var k=localStorage.key(i); if(k && k.indexOf('hh_journey_')===0){ var j=JSON.parse(localStorage.getItem(k)||'{}'); journeys++; pts+=(j.pts||0); var c=j.concepts||{}; Object.keys(c).forEach(function(n){ if(c[n]>=100) flags++; }); } }
  }catch(e){}
  return {pts:pts, flags:flags, journeys:journeys};
}
function hhCampusRenderStudentStats(){
  var s=hhCampusStudentSummary();
  var a=document.getElementById('hh-campus-n-pts'), b=document.getElementById('hh-campus-n-flags');
  if(a) a.textContent=s.pts; if(b) b.textContent=s.flags;
}
async function hhCampusLoadMyClass(){
  var boxes=[document.getElementById('hh-hub-classes'), document.getElementById('hh-campus-myclass')].filter(Boolean);
  if(!boxes.length) return;
  function put(h){ boxes.forEach(function(b){ b.innerHTML=h; }); }
  function joinForm(msg){
    return '<div class="hh-campus-card" style="grid-column:1/-1;">'
      +'<div class="hh-campus-card-t">'+(msg||'انضم إلى صف معلمك')+'</div>'
      +'<div class="hh-campus-card-d">اطلب من معلمك رمز الصف المكوّن من 6 خانات وأدخله هنا</div>'
      +'<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;">'
      +'<input id="join-class-code" type="text" maxlength="8" placeholder="رمز الصف" style="flex:1;min-width:140px;border:1.5px solid #B8924A;border-radius:10px;padding:10px 12px;font-family:Cairo;font-weight:900;font-size:1.05rem;letter-spacing:2px;text-align:center;direction:ltr;">'
      +'<button type="button" class="hh-campus-btn-maroon" onclick="hhCampusJoin()">'+_hhCampusIco('users',14)+' انضم</button>'
      +'</div></div>';
  }
  try{
    if(typeof currentUser==='undefined' || !currentUser){ put('<div class="hh-campus-empty">سجّل دخولك لتنضم إلى صف معلمك وتُحفظ رحلاتك</div>'); return; }
    var qs=await firebase.firestore().collection('classroom_students').where('userId','==',currentUser.uid).where('active','==',true).limit(3).get();
    if(qs.empty){ put(joinForm()); return; }
    var h=''; qs.forEach(function(d){ var c=d.data();
      h+='<div class="hh-campus-card hh-campus-class"><div class="hh-campus-card-t">'+esc(c.className||c.classCode)+'</div>'
        +'<div class="hh-campus-card-d">'+(c.schoolName?esc(c.schoolName)+' · ':'')+'المعلم: '+esc(c.teacherName||'—')+' · الرمز <b class="hh-campus-code">'+esc(c.classCode)+'</b></div>'
        +'<div class="hh-campus-card-btns"><button type="button" class="hh-campus-btn-maroon" onclick="hhHubGo(\'school\')">'+_hhCampusIco('play',13)+' تابع رحلتي</button><button type="button" class="hh-campus-btn-line" onclick="hhHubGo(\'achievements\')">إنجازاتي</button></div></div>'; });
    put(h);
  }catch(e){ put('<div class="hh-campus-empty"><div class="hh-campus-empty-t">تعذر التحقق من صفك — تحقق من الاتصال</div><button type="button" onclick="hhCampusLoadMyClass()" class="hh-campus-btn-line" style="margin-top:10px;">'+_hhCampusIco('refresh',13)+' أعد المحاولة</button></div>'); }
}
window.hhCampusJoin=async function(){
  if(typeof joinClassroom!=='function'){ if(typeof toast==='function') toast('الانضمام غير متاح الآن','warn'); return; }
  try{ await joinClassroom(); }catch(e){}
  setTimeout(hhCampusLoadMyClass, 600);
};
function hhCampusRenderAchievements(){
  var box=document.getElementById('hh-campus-ach'); if(!box) return;
  var s=hhCampusStudentSummary(); var S=null; try{ S=hhSchData(); hhSchLoad(); }catch(e){}
  var rows='';
  if(S && S.units){
    S.units.forEach(function(U,ui){ (U.lessons||[]).forEach(function(L){
      var full=_hhSchProg[L.id+'_full']||0, j=null; try{ j=JSON.parse(localStorage.getItem('hh_journey_'+L.id)||'null'); }catch(e){}
      if(!full && !j) return;
      var badge = full>=(S.masteryPass||80)?'متقن':full>=60?'جيد':full?'يحتاج دعماً':'في الرحلة';
      var flags=0; if(j&&j.concepts) Object.keys(j.concepts).forEach(function(k){ if(j.concepts[k]>=100) flags++; });
      rows+='<div class="hh-campus-card"><div class="hh-campus-card-t">'+esc(L.title)+' <span class="hh-campus-chip">'+badge+'</span></div><div class="hh-campus-card-d">'+esc(U.unit||'')+(full?' · البوابة '+full+'%':'')+(j?' · '+(j.pts||0)+' نقطة · '+flags+' راية':'')+'</div></div>';
    }); });
  }
  box.innerHTML='<div class="hh-campus-stats">'
    +'<div class="hh-campus-stat"><div class="hh-campus-stat-l">نقاط الرحلات</div><div class="hh-campus-stat-n">'+s.pts+'</div></div>'
    +'<div class="hh-campus-stat"><div class="hh-campus-stat-l">رايات مرفوعة</div><div class="hh-campus-stat-n">'+s.flags+'</div></div>'
    +'<div class="hh-campus-stat"><div class="hh-campus-stat-l">رحلات بدأتها</div><div class="hh-campus-stat-n">'+s.journeys+'</div></div>'
    +'</div>'+(rows||'<div class="hh-campus-empty">لم تبدأ رحلة بعد · افتح المنهج واختر درساً</div>');
}

// بطاقات الصفوف (تُستخدم في الرئيسة وفي جناح الصفوف)
function hhCampusClassCard(c, full){
  return '<div class="hh-campus-card hh-campus-class">'
    +'<div class="hh-campus-card-t">'+esc(c.className||c._code)+'</div>'
    +'<div class="hh-campus-card-d">'+(c.studentCount||0)+' طالباً · رمز الحصة <b class="hh-campus-code">'+esc(c._code)+'</b></div>'
    +'<div class="hh-campus-card-btns">'
    +'<button type="button" onclick="hhClsStartSession(\''+esc(c._code)+'\')" class="hh-campus-btn-maroon">'+_hhCampusIco('play',13)+' حصة</button>'
    +'<button type="button" onclick="hhHubGo(\'gradebook\')" class="hh-campus-btn-line">الدفتر</button>'
    +(full?'<button type="button" onclick="hhHubGo(\'certs\')" class="hh-campus-btn-line">الشهادات</button>':'')
    +'</div></div>';
}
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
function arCountCls(n,one,two,few,many){ if(n===0) return 'لا '+few+' بعد'; if(n===1) return one; if(n===2) return two; if(n<=10) return n+' '+few; return n+' '+many; }
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
    var un=_hhClsDb().collection('classroom_students').where('teacherId','==',currentUser.uid).where('classCode','==',code).where('active','==',true).onSnapshot(function(qs){ var joined=0; qs.forEach(function(d){ if(d.data().userId) joined++; }); var n=document.getElementById('hh-cls-big-n'); if(n) n.textContent=joined+' انضموا حتى الآن'; else un(); });
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
    var qs=await _hhClsDb().collection('classroom_students').where('teacherId','==',currentUser.uid).where('classCode','==',code).where('active','==',true).get();
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
    +(list.length?'<div class="hh-cls-list">'+list.map(function(s){ return '<div class="hh-cls-st"><span>'+esc(s.studentName||'طالب')+(s.sid?' <small>'+esc(s.sid)+'</small>':'')+'</span><span class="hh-cls-st-r">'+(s.userId?'<span class="hh-campus-chip hh-cls-ok">منضم</span>':'<span class="hh-campus-chip">لم ينضم بعد</span>')+'<button type="button" class="hh-cls-ib" title="إزالة" onclick="hhClsRemove(\''+code+'\',\''+s._id+'\')">×</button></span></div>'; }).join('')+'</div>':'<div class="hh-campus-empty">لا طلاب بعد · أضفهم بالاسم أو من ملف Excel، أو شارك الرمز لينضموا بأنفسهم</div>');
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
    _hhCls.open[code]=true; await hhCampusRenderClasses();
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

// الصفوف الحية من Firestore
async function hhHubLoadClasses(){
  var box=document.getElementById('hh-hub-classes'); if(!box) return;
  var sub=document.getElementById('hh-hub-sub');
  function setN(id,v){ var e=document.getElementById(id); if(e) e.textContent=v; }
  function empty(msg, cta, retry){
    box.innerHTML='<div class="hh-campus-empty">'
      +'<div class="hh-campus-empty-t">'+msg+'</div>'
      +(cta?'<button type="button" onclick="hhHubGo(\'classes\');hhClsNew()" class="hh-campus-btn-gold" style="margin-top:10px;">+ أنشئ صفك الأول الآن</button>':'')
      +(retry?'<button type="button" onclick="hhHubLoadClasses()" class="hh-campus-btn-line" style="margin-top:10px;">'+_hhCampusIco('refresh',13)+' أعد المحاولة</button>':'')
      +'</div>';
  }
  try{
    if(typeof currentUser==='undefined' || !currentUser){ if(sub) sub.textContent='سجّل دخولك لتظهر صفوفك وأدواتك'; empty('صفوفك تنتظرك بعد تسجيل الدخول', false, false); setN('hh-campus-n-classes','0'); setN('hh-campus-n-students','0'); return; }
    var qs = await firebase.firestore().collection('classrooms').where('teacherId','==',currentUser.uid).limit(9).get();
    if(qs.empty){ _hhHubClasses=[]; if(sub) sub.textContent='لا صفوف بعد · ابدأ رحلتك بإنشاء صفك الأول'; empty('مقرّ قيادتك جاهز — ينقصه صفك الأول', true, false); setN('hh-campus-n-classes','0'); setN('hh-campus-n-students','0'); hhCampusRenderClasses(); return; }
    _hhHubClasses=[]; var totalStud=0;
    qs.forEach(function(d){ var c=d.data(); c._code=d.id; _hhHubClasses.push(c); totalStud += (c.studentCount||0); });
    if(sub) sub.textContent = _hhHubClasses.length+' صفوف · '+totalStud+' طالباً';
    setN('hh-campus-n-classes',_hhHubClasses.length); setN('hh-campus-n-students',totalStud);
    box.innerHTML = _hhHubClasses.map(function(c){ return hhCampusClassCard(c,false); }).join('');
    hhCampusRenderClasses();
  }catch(e){ if(sub) sub.textContent=''; empty('تعذر تحميل الصفوف — تحقق من الاتصال', false, true); }
}

function hhSchWizFinish(term){
  try{ localStorage.setItem('hh_sch_wiz_done','1'); }catch(e){}
  hhSchSetTerm(term || 't2');
  hhSchWizClose();
  hhSchoolHub();
}
function hhSchWizSoon(){ if(typeof toast==='function') toast('قريباً بإذن الله · التوسعة مستمرة','warn'); }

/* أيقونات SVG احترافية للمعالج (بلا أي إيموجي) */
function _hhSchWizIco(name, col){
  var s='width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="'+col+'" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  var body={
    school:'<path d="M3 21h18"/><path d="M5 21V9l7-5 7 5v12"/><path d="M9 21v-5h6v5"/><path d="M12 4v2"/>',
    teacher:'<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4"/><path d="M8 20h8"/><path d="M7 8h6"/><path d="M7 11h4"/>',
    student:'<path d="M12 4L2 9l10 5 10-5-10-5z"/><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"/><path d="M22 9v5"/>',
    social:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.4 3.8 5.6 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.6-3.8-9S9.5 5.4 12 3z"/>',
    science:'<path d="M9 3h6"/><path d="M10 3v6L4.5 18.5A2 2 0 006.3 21h11.4a2 2 0 001.8-2.5L14 9V3"/><path d="M7.5 14h9"/>',
    term:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M3 10h18"/>',
    units:'<path d="M4 5a2 2 0 012-2h5v18H6a2 2 0 01-2-2V5z"/><path d="M20 5a2 2 0 00-2-2h-5v18h5a2 2 0 002-2V5z"/>'
  }[name]||'';
  return '<svg '+s+'>'+body+'</svg>';
}
/* شارة رقم الصف (رقم داخل درع صغير بدل الإيموجي) */
function _hhSchWizNum(n, col){
  return '<svg width="26" height="26" viewBox="0 0 24 24" fill="none">'
    + '<path d="M12 2l8 3v7c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5l8-3z" stroke="'+col+'" stroke-width="1.8" stroke-linejoin="round"/>'
    + '<text x="12" y="15.5" text-anchor="middle" font-family="Cairo,Arial" font-weight="900" font-size="9.5" fill="'+col+'">'+n+'</text>'
    + '</svg>';
}

function _hhSchWizOpt(o){
  /* o: {icon(html svg), title, sub, on, soon, color} */
  var col = o.color || '#8A1538';
  if(o.soon){
    return '<button onclick="hhSchWizSoon()" style="display:flex;align-items:center;gap:12px;width:100%;background:#F3F0F1;border:2px dashed #C9BFC3;border-radius:14px;padding:14px 16px;font-family:Cairo;cursor:pointer;text-align:right;opacity:.75;">'
      + '<span style="flex-shrink:0;display:inline-flex;">'+o.icon+'</span>'
      + '<span style="flex:1;min-width:0;"><span style="display:block;font-weight:900;font-size:.92rem;color:#777;">'+o.title+'</span>'
      + (o.sub?'<span style="display:block;font-weight:700;font-size:.72rem;color:#999;margin-top:2px;">'+o.sub+'</span>':'')+'</span>'
      + '<span style="background:#C9BFC3;color:#fff;border-radius:8px;padding:3px 11px;font-size:.66rem;font-weight:900;flex-shrink:0;">قريباً</span>'
      + '</button>';
  }
  return '<button onclick="'+o.on+'" style="display:flex;align-items:center;gap:12px;width:100%;background:#fff;border:2px solid '+col+';border-radius:14px;padding:14px 16px;font-family:Cairo;cursor:pointer;text-align:right;box-shadow:0 3px 10px rgba(94,14,38,.08);transition:transform .15s;" onmouseover="this.style.transform=\'translateY(-2px)\'" onmouseout="this.style.transform=\'\'">'
    + '<span style="flex-shrink:0;display:inline-flex;">'+o.icon+'</span>'
    + '<span style="flex:1;min-width:0;"><span style="display:block;font-weight:900;font-size:.92rem;color:'+col+';">'+o.title+'</span>'
    + (o.sub?'<span style="display:block;font-weight:700;font-size:.72rem;color:#888;margin-top:2px;">'+o.sub+'</span>':'')+'</span>'
    + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+col+'" stroke-width="2.5" stroke-linecap="round" style="flex-shrink:0;"><polyline points="15 18 9 12 15 6"/></svg>'
    + '</button>';
}

function hhSchWizRender(){
  var w=_hhSchWiz;
  var old=document.getElementById('hh-sch-wiz'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-sch-wiz';
  ov.style.cssText='position:fixed;inset:0;background:rgba(30,6,15,.78);z-index:999974;display:flex;align-items:center;justify-content:center;padding:16px;overflow-y:auto;direction:rtl;';
  ov.onclick=function(ev){ if(ev.target===ov) hhSchWizClose(); };

  var steps=['role','grade','subject','term'];
  var idx=steps.indexOf(w.step);
  var dots = (idx>=0)
    ? '<div style="display:flex;gap:6px;justify-content:center;margin-top:10px;">'
      + steps.map(function(_,i){ return '<span style="width:'+(i===idx?'22px':'8px')+';height:8px;border-radius:99px;background:'+(i<=idx?'#D4BC85':'rgba(255,255,255,.25)')+';transition:all .3s;"></span>'; }).join('')
      + '</div>'
    : '';

  var back = {role:'welcome', grade:'role', subject:'grade', term:'subject'}[w.step];
  var backBtn = back
    ? '<button onclick="hhSchWizGo(\''+back+'\')" style="background:none;border:none;color:#fff;font-family:Cairo;font-weight:900;font-size:.78rem;cursor:pointer;display:flex;align-items:center;gap:4px;opacity:.85;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>رجوع</button>'
    : '<span></span>';

  var title='', sub='', body='';

  if(w.step==='welcome'){
    var done = localStorage.getItem('hh_sch_wiz_done')==='1';
    title='أهلاً بك في المدرسة';
    sub='رحلتك التعليمية المتدرجة: وحدات ودروس وقصص واختبارات إتقان تفتح الطريق خطوةً بعد خطوة';
    body = '<div style="text-align:center;padding:6px 0 2px;">'
      + '<div style="display:flex;justify-content:center;margin-bottom:12px;">'
      +   '<span style="width:64px;height:64px;border-radius:18px;background:linear-gradient(135deg,#8A1538,#5E0E26);border:2px solid #B8924A;display:inline-flex;align-items:center;justify-content:center;">'
      +   '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#D4BC85" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V9l7-5 7 5v12"/><path d="M9 21v-5h6v5"/><path d="M12 4v2"/></svg>'
      +   '</span></div>'
      + '<button onclick="hhSchWizGo(\'grade\')" style="width:100%;background:linear-gradient(135deg,#8A1538,#5E0E26);color:#fff;border:2px solid #B8924A;border-radius:14px;padding:14px;font-family:Cairo;font-weight:900;font-size:1rem;cursor:pointer;box-shadow:0 6px 18px rgba(94,14,38,.35);">ابدأ الرحلة</button>'
      + (done ? '<button onclick="hhSchWizFinish()" style="width:100%;background:#fff;color:#3D6B53;border:2px solid #3D6B53;border-radius:14px;padding:11px;font-family:Cairo;font-weight:900;font-size:.85rem;cursor:pointer;margin-top:9px;">الدخول مباشرة إلى وحداتي</button>' : '')
      + '</div>';
  }
  else if(w.step==='grade'){
    title='اختر الصف'; sub='الصفوف المتاحة في المدرسة';
    body = '<div style="display:grid;gap:10px;">'
      + _hhSchWizOpt({icon:_hhSchWizNum('7','#8A1538'), title:'الصف السابع', sub:'المسار متاح كاملاً', on:'hhSchWizGo(\'subject\')', color:'#8A1538'})
      + _hhSchWizOpt({icon:_hhSchWizNum('8','#999'), title:'الصف الثامن', soon:true})
      + _hhSchWizOpt({icon:_hhSchWizNum('9','#999'), title:'الصف التاسع', soon:true})
      + '</div>';
  }
  else if(w.step==='subject'){
    title='اختر المادة'; sub='مواد الصف السابع';
    body = '<div style="display:grid;gap:10px;">'
      + _hhSchWizOpt({icon:_hhSchWizIco('social','#8A1538'), title:'الدراسات الاجتماعية', sub:'6 وحدات كاملة بدروسها وقصصها واختباراتها', on:'hhSchWizGo(\'term\')', color:'#8A1538'})
      + _hhSchWizOpt({icon:_hhSchWizIco('science','#999'), title:'العلوم', soon:true})
      + '</div>';
  }
  else if(w.step==='term'){
    title='اختر الفصل الدراسي'; sub='الدراسات الاجتماعية · الصف السابع';
    var t1ok = !!window._HH_SCHOOL_T1;
    body = '<div style="display:grid;gap:10px;">'
      + (t1ok
          ? _hhSchWizOpt({icon:_hhSchWizIco('term','#8A1538'), title:'الفصل الدراسي الأول', sub:'6 وحدات: الأرض من حولي، بلاد الرافدين، السلطات، السكان، العباسية، الأمن الوطني', on:'hhSchWizFinish(\'t1\')', color:'#8A1538'})
          : _hhSchWizOpt({icon:_hhSchWizIco('term','#999'), title:'الفصل الدراسي الأول', soon:true}))
      + _hhSchWizOpt({icon:_hhSchWizIco('units','#3D6B53'), title:'الفصل الدراسي الثاني', sub:'6 وحدات · ابدأ الآن', on:'hhSchWizFinish(\'t2\')', color:'#3D6B53'})
      + '</div>';
  }

  ov.innerHTML = '<div style="background:#FAFBFD;border:2px solid #B8924A;border-radius:22px;max-width:480px;width:100%;overflow:hidden;font-family:Cairo,Tajawal,sans-serif;box-shadow:0 24px 60px rgba(0,0,0,.4);">'
    + '<div style="background:linear-gradient(135deg,#5E0E26,#3D0918);color:#fff;padding:16px 18px;">'
    +   '<div style="display:flex;justify-content:space-between;align-items:center;">'
    +     backBtn
    +     '<button onclick="hhSchWizClose()" style="background:none;border:none;color:#fff;font-size:1.15rem;cursor:pointer;">✕</button>'
    +   '</div>'
    +   '<div style="font-weight:900;font-size:1.15rem;text-align:center;margin-top:4px;">'+title+'</div>'
    +   '<div style="font-size:.76rem;opacity:.85;text-align:center;margin-top:4px;line-height:1.8;">'+sub+'</div>'
    +   dots
    + '</div>'
    + '<div style="padding:18px;">'+body+'</div>'
    + '</div>';
  document.body.appendChild(ov);
}
function hhSchSetRole(r){ _hhSchRole=r; hhOpenSchool(); }
function hhSchOverride(i){
  _hhSchProg['override_u'+i]=true; hhSchSave(); hhOpenSchool();
  if(typeof toast==='function') toast('فُتحت الوحدة استثنائياً','success');
}
function hhSchSupport(i){
  var U=hhSchData().units[i];
  var html = U.lessons.map(function(L){
    return '<div style="background:#fff;border-radius:10px;padding:11px;margin-bottom:8px;">'
      + '<div style="font-weight:900;font-size:.82rem;color:#8A6D2E;margin-bottom:5px;">'+esc(L.title)+'</div>'
      + L.summary.map(function(s){ return '<div style="font-size:.77rem;color:#444;line-height:1.9;margin-bottom:4px;">• '+esc(s)+'</div>'; }).join('')
      + (L.terms&&L.terms.length ? '<div style="margin-top:6px;padding-top:6px;border-top:1px solid #eee;">'
          + L.terms.map(function(t){ return '<div style="font-size:.75rem;"><b style="color:#1F4E79;">'+esc(t[0])+':</b> '+esc(t[1])+'</div>'; }).join('')
          + '</div>' : '')
      + '</div>';
  }).join('');
  hhSchModal('مسار الدعم · '+U.unit, html, '#B8924A');
}
function hhSchLesson(ui, li, kind){
  var S=hhSchData(); var L=S.units[ui].lessons[li];
  try{ var _kn={material:'المادة',summary:'الملخص',terms:'المصطلحات',values:'القيم'}; localStorage.setItem('hh_sch_last_lesson', JSON.stringify({ui:ui,li:li,kindKey:kind,kind:_kn[kind]||'',title:L.title,unit:S.units[ui].unit||'',term:_hhSchTerm})); }catch(_e){}
  function diffChip(d){
    return d==='hard'
      ? '<span style="background:linear-gradient(175deg,#7A1330,#4A0B1E);border:1px solid #B8924A;color:#F5E6C4;border-radius:99px;padding:1px 11px;font-size:.62rem;font-weight:800;">صعب</span>'
      : d==='med'
      ? '<span style="background:rgba(184,146,74,.18);border:1px solid #B8924A;color:#7A5F26;border-radius:99px;padding:1px 11px;font-size:.62rem;font-weight:800;">متوسط</span>'
      : '<span style="background:#F2E7CE;border:1px solid #B8924A;color:#8A6D2E;border-radius:99px;padding:1px 11px;font-size:.62rem;font-weight:800;">سهل</span>';
  }
  var valsCard = (L.vals && L.vals.length)
    ? '<div style="background:linear-gradient(165deg,#5E0E26,#3D0918);border:1px solid rgba(212,188,133,.55);border-radius:14px;padding:12px 15px;margin-top:11px;position:relative;overflow:hidden;">'
      +'<div style="position:absolute;top:0;right:0;left:0;height:3px;background:linear-gradient(90deg,transparent,#D4BC85,transparent);"></div>'
      +'<div style="color:#D4BC85;font-weight:900;font-size:.78rem;margin-bottom:7px;">✦ قيمٌ أتعلمها من الدرس</div>'
      + L.vals.map(function(v){
          return '<div style="display:flex;align-items:flex-start;gap:8px;color:#F5E6C4;font-size:.78rem;font-weight:700;line-height:1.9;margin-bottom:4px;">'
            +'<span style="width:16px;height:16px;border-radius:50%;background:linear-gradient(135deg,#EAD9B0,#B8924A);color:#3D0918;display:inline-flex;align-items:center;justify-content:center;font-size:.56rem;flex-shrink:0;margin-top:4px;border:1px solid #FDF3DD;">✓</span>'
            + esc(v) + '</div>';
        }).join('')
      +'</div>'
    : '';

  if(kind==='material'){
    var qs=(L.q||[]);
    var html = '<div style="background:rgba(184,146,74,.1);border:1px solid rgba(184,146,74,.35);border-radius:10px;padding:6px 13px;color:#8A6D2E;font-size:.7rem;font-weight:800;margin-bottom:11px;">أسئلة الدرس للمراجعة قبل الاختبار · '+qs.length+' سؤالاً</div>'
      + qs.map(function(q,i){
          return '<div style="background:#fff;border:1.5px solid rgba(184,146,74,.5);border-radius:13px;padding:10px 14px;margin-bottom:8px;position:relative;">'
            +'<span style="position:absolute;top:10px;bottom:10px;right:0;width:3px;background:linear-gradient(180deg,#EAD9B0,#B8924A);border-radius:2px;"></span>'
            +'<div style="display:flex;gap:5px;margin-bottom:5px;flex-wrap:wrap;">'+diffChip(q.d)
            +(q.b?'<span style="background:rgba(138,21,56,.07);border:1px solid rgba(184,146,74,.45);border-radius:99px;padding:1px 11px;font-size:.62rem;font-weight:800;color:#8A1538;">'+esc(q.b)+'</span>':'')+'</div>'
            +'<div style="color:#3D0918;font-weight:800;font-size:.9rem;line-height:1.85;">'+(i+1)+'. '+esc(q.q)+'</div>'
            +'<div style="display:flex;align-items:flex-start;gap:6px;margin-top:5px;color:#3D6B53;font-size:.84rem;font-weight:700;line-height:1.85;">'
            +'<span style="width:16px;height:16px;border-radius:50%;background:linear-gradient(135deg,#EAD9B0,#B8924A);color:#3D0918;display:inline-flex;align-items:center;justify-content:center;font-size:.56rem;flex-shrink:0;margin-top:4px;border:1px solid #FDF3DD;">✓</span>'
            +esc(q.a)+'</div></div>';
        }).join('')
      + valsCard;
    hhSchModal('المادة الدراسية · '+esc(L.title), html, '#8A1538');
    return;
  }

  // الملخص الاحترافي: نقاط مرقمة + جدول مصطلحات + قيم الدرس
  var pts=(L.summary||[]);
  var terms=(L.terms||[]);
  var html = '<div style="background:linear-gradient(165deg,#5E0E26,#3D0918);border:1px solid rgba(212,188,133,.55);border-radius:14px;padding:11px 15px;margin-bottom:11px;position:relative;overflow:hidden;">'
    +'<div style="position:absolute;top:0;right:0;left:0;height:3px;background:linear-gradient(90deg,transparent,#D4BC85,transparent);"></div>'
    +'<div style="color:#fff;font-weight:900;font-size:.9rem;">'+esc(L.title)+'</div>'
    +'<div style="color:#C9A96A;font-size:.68rem;margin-top:2px;">'+pts.length+' نقاط رئيسة · '+terms.length+' مصطلحات'+((L.vals&&L.vals.length)?' · '+L.vals.length+' قيم':'')+'</div></div>'
    + pts.map(function(p,i){
        return '<div style="display:flex;gap:10px;background:#fff;border:1.5px solid rgba(184,146,74,.45);border-radius:13px;padding:10px 13px;margin-bottom:7px;">'
          +'<span style="width:24px;height:24px;border-radius:8px;background:linear-gradient(135deg,#EAD9B0,#B8924A);border:1px solid #FDF3DD;color:#3D0918;display:inline-flex;align-items:center;justify-content:center;font-weight:900;font-size:.7rem;flex-shrink:0;margin-top:2px;">'+(i+1)+'</span>'
          +'<div style="color:#3D0918;font-size:.94rem;font-weight:700;line-height:2.05;">'+esc(p)+'</div></div>';
      }).join('');
  if(terms.length){
    html += '<div style="color:#8A1538;font-weight:800;font-size:.8rem;margin:12px 2px 7px;display:flex;align-items:center;gap:7px;"><span style="width:6px;height:6px;background:#B8924A;transform:rotate(45deg);"></span>مصطلحات الدرس</div>'
      +'<div style="background:#FFFDF8;border:1.5px solid #B8924A;border-radius:13px;overflow:hidden;">'
      + terms.map(function(t,i){
          return '<div style="display:grid;grid-template-columns:130px 1fr;'+(i? 'border-top:1px dashed rgba(184,146,74,.35);':'')+'">'
            +'<div style="background:rgba(184,146,74,.1);padding:8px 12px;color:#8A1538;font-weight:900;font-size:.74rem;border-left:1px solid rgba(184,146,74,.35);">'+esc(t[0])+'</div>'
            +'<div style="padding:8px 12px;color:#4A3A2A;font-size:.74rem;font-weight:700;line-height:1.8;">'+esc(t[1])+'</div></div>';
        }).join('')
      +'</div>';
  }
  html += valsCard;
  hhSchModal('ملخص الدرس', html, '#B8924A');
}

function hhSchModal(title, html, color){
  var col = color || '#8A1538';
  var old=document.getElementById('hh-sch-modal'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-sch-modal';
  ov.style.cssText='position:fixed;inset:0;background:rgba(30,6,15,.78);z-index:999995;display:flex;align-items:flex-start;justify-content:center;padding:18px;overflow-y:auto;direction:rtl;font-family:Cairo,Tajawal,sans-serif;';
  ov.onclick=function(ev){ if(ev.target===ov) ov.remove(); };
  ov.innerHTML='<div style="background:#FBF7F0;border:2px solid #B8924A;border-top:5px solid '+col+';border-radius:18px;max-width:620px;width:100%;overflow:hidden;margin-bottom:22px;box-shadow:0 18px 44px rgba(30,6,15,.35);">'
    +'<div style="background:linear-gradient(175deg,#4A0B1E,#5E0E26);border-bottom:2px solid #B8924A;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;gap:10px;">'
    +'<div style="font-weight:900;font-size:.95rem;color:#F5E6C4;">'+title+'</div>'
    +'<button onclick="document.getElementById(\'hh-sch-modal\').remove()" style="width:28px;height:28px;border-radius:9px;background:rgba(212,188,133,.15);border:1px solid rgba(212,188,133,.5);color:#F5E6C4;cursor:pointer;font-size:.85rem;">✕</button></div>'
    +'<div style="padding:14px 16px;max-height:74vh;overflow-y:auto;">'+html+'</div></div>';
  document.body.appendChild(ov);
}

// ── الاختبارات ──
var _hhTest = null;
function hhSchTest(ui, li, kind){
  var S=hhSchData(), U=S.units[ui];
  var pool=[], title='';
  if(kind==='mastery'){
    U.lessons.forEach(function(L){ pool=pool.concat(L.q.map(function(q){return Object.assign({},q,{_l:L.title});})); });
    pool = pool.slice().sort(function(){return Math.random()-.5;}).slice(0,12);
    title='اختبار الإتقان · '+U.unit;
  } else {
    var L=U.lessons[li];
    pool = L.q.slice().sort(function(){return Math.random()-.5;});
    pool = kind==='quick' ? pool.slice(0,5) : (kind==='short' ? pool.slice(0,8) : pool.slice(0,15));
    title = (kind==='quick'?'مراجعة سريعة · ':(kind==='short'?'الاختبار المختصر · ':'الاختبار الشامل · ')) + L.title;
  }
  _hhTest = { ui:ui, li:li, kind:kind, qs:pool, idx:0, answers:[], title:title };
  hhSchRenderQ();
}
function hhSchRenderQ(){
  var T=_hhTest; if(!T) return;
  if(T.idx >= T.qs.length){ hhSchFinish(); return; }
  var q=T.qs[T.idx];
  var opts=(q.o||[]).slice().sort(function(){return Math.random()-.5;});
  var keys=['أ','ب','ج','د','هـ'];
  var old=document.getElementById('hh-sch-test'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-sch-test';
  ov.style.cssText='position:fixed;inset:0;background:linear-gradient(180deg,#F6F1E7,#EFE7D6);z-index:999996;display:flex;align-items:center;justify-content:center;padding:18px;direction:rtl;font-family:Cairo,Tajawal,sans-serif;';
  var pct=Math.round(T.idx/T.qs.length*100);
  ov.innerHTML='<div style="max-width:580px;width:100%;background:transparent;">'
    +'<div style="border:2px solid #B8924A;border-radius:18px;overflow:hidden;box-shadow:0 14px 36px rgba(30,6,15,.18);background:linear-gradient(180deg,#F6F1E7,#EFE7D6);">'
    +'<div style="background:linear-gradient(175deg,#4A0B1E,#5E0E26);border-bottom:2px solid #B8924A;padding:10px 15px;display:flex;justify-content:space-between;align-items:center;gap:10px;">'
    +'<span style="font-weight:900;font-size:.82rem;color:#F5E6C4;">'+esc(T.title)+'</span>'
    +'<span style="display:flex;align-items:center;gap:8px;"><span style="color:#F5E6C4;font-weight:800;font-size:.72rem;">'+(T.idx+1)+' / '+T.qs.length+'</span>'
    +'<span style="width:110px;height:8px;background:rgba(255,255,255,.15);border-radius:99px;overflow:hidden;display:inline-block;"><span style="display:block;height:100%;width:'+pct+'%;background:linear-gradient(90deg,#EAD9B0,#B8924A);transition:width .3s;"></span></span></span></div>'
    +'<div style="padding:16px 17px 14px;">'
    +'<div style="background:#fff;border:1.5px solid #B8924A;border-top:4px solid #8A1538;border-radius:14px;padding:14px 16px;text-align:center;color:#3D0918;font-weight:900;font-size:1.2rem;line-height:1.95;box-shadow:0 4px 14px rgba(94,14,38,.07);">'+esc(q.q)+'</div>'
    +'<div style="display:flex;flex-direction:column;gap:8px;margin-top:11px;">'
    + opts.map(function(o,i){
        return '<button onclick="hhSchAnswer('+i+',this)" data-opt="'+esc(o)+'" style="display:flex;align-items:center;gap:10px;background:linear-gradient(170deg,#FFFDF8,#FBF5E9);border:1.5px solid #D9C79E;border-radius:12px;padding:11px 14px;font-family:Cairo;font-weight:800;font-size:.97rem;color:#3D0918;cursor:pointer;text-align:right;transition:all .15s;">'
          +'<span style="width:24px;height:24px;border-radius:8px;background:rgba(184,146,74,.12);border:1px solid #B8924A;color:#8A6D2E;display:inline-flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:900;flex-shrink:0;">'+keys[i]+'</span>'
          +'<span style="flex:1;">'+esc(o)+'</span></button>';
      }).join('')
    +'</div>'
    +'<div style="text-align:center;margin-top:12px;"><button onclick="hhSchQuit()" style="background:none;border:1px dashed #C9BFA8;border-radius:9px;padding:5px 15px;color:#8A7A63;font-family:Cairo;font-weight:800;font-size:.7rem;cursor:pointer;">إنهاء الاختبار</button></div>'
    +'</div></div></div>';
  document.body.appendChild(ov);
}

function hhSchAnswer(i, btn){
  var T=_hhTest; if(!T) return;
  var q=T.qs[T.idx];
  var chosen=btn.getAttribute('data-opt');
  var correct = (chosen === q.a);
  T.answers.push({ q:q.q, a:q.a, chosen:chosen, correct:correct, d:q.d, b:q.b, l:q._l||'' });
  // تغذية راجعة بصرية فورية
  var all=btn.parentNode.querySelectorAll('button');
  all.forEach(function(b){
    b.disabled=true;
    if(b.getAttribute('data-opt')===q.a){ b.style.background='linear-gradient(170deg,#EBF2EE,#DEEDE4)'; b.style.borderColor='#3D6B53'; b.style.boxShadow='0 0 0 2px rgba(61,107,83,.2)'; var k=b.querySelector('span'); if(k){k.style.background='#3D6B53';k.style.color='#fff';k.style.borderColor='#3D6B53';} }
    else if(b===btn){ b.style.background='linear-gradient(170deg,#F9EDF0,#F3E1E6)'; b.style.borderColor='#7A1330'; var k2=b.querySelector('span'); if(k2){k2.style.background='#7A1330';k2.style.color='#F5E6C4';k2.style.borderColor='#7A1330';} }
    else b.style.opacity='.45';
  });
  setTimeout(function(){ T.idx++; hhSchRenderQ(); }, 850);
}
function hhSchQuit(){ _hhTest=null; var e=document.getElementById('hh-sch-test'); if(e) e.remove(); }
function hhSchFinish(){
  var T=_hhTest; if(!T) return;
  var correct=T.answers.filter(function(a){return a.correct;}).length;
  var pct=Math.round(correct/T.answers.length*100);
  var S=hhSchData();
  var passed = pct >= S.masteryPass;

  // حفظ التقدم
  if(T.kind==='mastery'){
    var prevBest=_hhSchProg['u'+T.ui+'_mastery']||0;
    if(pct>prevBest) _hhSchProg['u'+T.ui+'_mastery']=pct;
    _hhSchProg['u'+T.ui+'_attempts']=(_hhSchProg['u'+T.ui+'_attempts']||0)+1;
  } else {
    var L=S.units[T.ui].lessons[T.li];
    var key=L.id+'_'+T.kind;
    if(pct > (_hhSchProg[key]||0)) _hhSchProg[key]=pct;
  }
  _hhSchProg['last']= new Date().toISOString();
  hhSchSave();
  if(typeof hhLogActivity==='function') hhLogActivity('generate','مدرستي: '+T.kind+' '+pct+'%');

  var wrong=T.answers.filter(function(a){return !a.correct;});
  var verdict = pct>=80 ? 'متقن' : pct>=60 ? 'جيد' : 'يحتاج دعماً';
  var vcol = pct>=80 ? '#3D6B53' : pct>=60 ? '#8A6D2E' : '#7A1330';
  var vbg = pct>=80 ? 'rgba(61,107,83,.1)' : pct>=60 ? 'rgba(184,146,74,.15)' : 'rgba(122,19,48,.08)';
  var msg = T.kind==='mastery'
    ? (passed ? 'أحسنت! اجتزت اختبار الإتقان وفُتحت الوحدة التالية.' : 'لم تجتز الإتقان بعد · تحتاج '+S.masteryPass+'%. راجع الملخصات وحاول مجدداً.')
    : (pct>=80 ? 'أداء متقن يستحق الفخر — واصل التألق.' : pct>=60 ? 'أداء جيد · راجع نقاط الخطأ لتبلغ الإتقان.' : 'لا بأس، التعلم رحلة · راجع الملخص والقيم ثم أعد المحاولة.');

  var e=document.getElementById('hh-sch-test'); if(e) e.remove();
  var ov=document.createElement('div'); ov.id='hh-sch-result';
  ov.style.cssText='position:fixed;inset:0;background:rgba(30,6,15,.8);z-index:999996;display:flex;align-items:flex-start;justify-content:center;padding:18px;overflow-y:auto;direction:rtl;font-family:Cairo,Tajawal,sans-serif;';
  ov.innerHTML='<div style="background:#FBF7F0;border:2px solid #B8924A;border-radius:20px;max-width:560px;width:100%;overflow:hidden;margin-bottom:20px;box-shadow:0 18px 44px rgba(30,6,15,.35);">'
    +'<div style="background:linear-gradient(175deg,#4A0B1E,#5E0E26);border-bottom:2px solid #B8924A;color:#fff;padding:20px;text-align:center;position:relative;overflow:hidden;">'
    +'<div style="position:absolute;top:0;right:0;left:0;height:3px;background:linear-gradient(90deg,transparent,#D4BC85,transparent);"></div>'
    +'<div style="width:86px;height:86px;border-radius:50%;margin:0 auto;background:radial-gradient(circle at 35% 30%,#F5E6C4,#B8924A 78%);border:2.5px solid #FDF3DD;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#3D0918;box-shadow:0 6px 18px rgba(0,0,0,.3);">'
    +'<span style="font-size:1.55rem;font-weight:900;line-height:1;">'+pct+'%</span><span style="font-size:.56rem;font-weight:800;">'+correct+' من '+T.answers.length+'</span></div>'
    +'<div style="margin-top:10px;"><span style="background:'+vbg+';border:1.5px solid '+vcol+';color:'+(pct>=60?vcol:'#F5E6C4')+';'+(pct<60?'background:linear-gradient(175deg,#7A1330,#4A0B1E);border-color:#B8924A;':'')+'border-radius:99px;padding:4px 20px;font-weight:900;font-size:.85rem;">تقييمك: '+verdict+'</span></div>'
    +'<div style="font-size:.76rem;color:#EAD9B0;margin-top:9px;line-height:1.8;font-weight:700;">'+esc(msg)+'</div></div>'
    +'<div style="padding:14px 17px;">'
    +(wrong.length
      ? '<div style="font-weight:900;font-size:.8rem;color:#8A1538;margin-bottom:8px;display:flex;align-items:center;gap:7px;"><span style="width:6px;height:6px;background:#B8924A;transform:rotate(45deg);"></span>راجع هذه النقاط ('+wrong.length+')</div>'
        + wrong.map(function(w){
            return '<div style="background:#fff;border:1.5px solid rgba(184,146,74,.5);border-radius:12px;padding:9px 13px;margin-bottom:7px;position:relative;">'
              +'<span style="position:absolute;top:9px;bottom:9px;right:0;width:3px;background:#7A1330;border-radius:2px;"></span>'
              +'<div style="font-size:.76rem;font-weight:800;color:#3D0918;line-height:1.8;">'+esc(w.q)+'</div>'
              +'<div style="font-size:.7rem;color:#7A1330;margin-top:3px;font-weight:700;">إجابتك: '+esc(w.chosen)+'</div>'
              +'<div style="display:flex;align-items:center;gap:5px;font-size:.7rem;color:#3D6B53;font-weight:800;margin-top:2px;">'
              +'<span style="width:14px;height:14px;border-radius:50%;background:linear-gradient(135deg,#EAD9B0,#B8924A);color:#3D0918;display:inline-flex;align-items:center;justify-content:center;font-size:.5rem;border:1px solid #FDF3DD;">✓</span>الصواب: '+esc(w.a)+'</div></div>';
          }).join('')
      : '<div style="text-align:center;color:#3D6B53;font-weight:900;font-size:.88rem;padding:10px;">إجابات كاملة بلا خطأ — أداء يليق بالمُلهِمين</div>')
    +'<div style="display:flex;gap:8px;margin-top:11px;flex-wrap:wrap;">'
    +'<button onclick="hhSchCloseResult(true)" style="flex:1;background:linear-gradient(175deg,#7A1330,#4A0B1E);color:#F5E6C4;border:1px solid #B8924A;border-radius:11px;padding:10px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;">عودة لمدرستي</button>'
    +(!passed ? '<button onclick="hhSchRetry()" style="background:linear-gradient(135deg,#EAD9B0,#B8924A);color:#3D0918;border:1px solid #FDF3DD;border-radius:11px;padding:10px 18px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;">إعادة المحاولة</button>' : '')
    +'</div></div></div>';
  document.body.appendChild(ov);
  _hhTest=null;
}

function hhSchCloseResult(reopen){
  var e=document.getElementById('hh-sch-result'); if(e) e.remove();
  if(reopen) hhOpenSchool();
}
function hhSchRetry(){
  var e=document.getElementById('hh-sch-result'); if(e) e.remove();
  hhOpenSchool();
}

// ── لوحة متابعة المعلم ──
function hhSchTeacherPanel(){
  var S=hhSchData();
  var rows = S.units.map(function(U,i){
    var st=hhSchUnitState(i);
    var m=_hhSchProg['u'+i+'_mastery']||0;
    var at=hhSchAttempts(i);
    var col=m>=S.masteryPass?'#3D6B53':m>=50?'#b5801f':'#c0392b';
    var lessonRows = U.lessons.map(function(L){
      var q=_hhSchProg[L.id+'_quick']||0, f=_hhSchProg[L.id+'_full']||0;
      return '<tr style="background:#fff;"><td style="padding:5px 9px;font-size:.74rem;padding-right:20px;">'+esc(L.title)+'</td>'
        +'<td style="padding:5px;text-align:center;font-size:.74rem;font-weight:800;color:'+(q>=80?'#3D6B53':q?'#b5801f':'#ccc')+';">'+(q?q+'%':'·')+'</td>'
        +'<td style="padding:5px;text-align:center;font-size:.74rem;font-weight:800;color:'+(f>=80?'#3D6B53':f?'#b5801f':'#ccc')+';">'+(f?f+'%':'·')+'</td>'
        +'<td style="padding:5px;text-align:center;font-size:.7rem;color:#ccc;">·</td></tr>';
    }).join('');
    return '<tr style="background:#E9EEF8;"><td style="padding:7px 9px;font-weight:900;font-size:.78rem;">'+esc(U.unit)+'</td>'
      +'<td style="padding:7px;text-align:center;font-size:.72rem;font-weight:900;">'+(st==='done'?'أُتقنت':st==='open'?'متاحة':'مقفلة')+'</td>'
      +'<td style="padding:7px;text-align:center;font-weight:900;color:'+col+';font-size:.78rem;">'+(m?m+'%':'·')+'</td>'
      +'<td style="padding:7px;text-align:center;font-size:.74rem;">'+at+'</td></tr>'
      + lessonRows;
  }).join('');

  var html='<div style="font-size:.76rem;color:#777;margin-bottom:9px;font-weight:700;line-height:1.8;">'
    +'متابعة تقدّم الطالب في المسار. عند نشر المنصة، تجمع لوحة الإدارة بيانات كل الطلاب سحابياً.</div>'
    +'<div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;">'
    +'<thead><tr style="background:#1F4E79;color:#fff;font-weight:900;font-size:.74rem;">'
    +'<th style="padding:7px 9px;text-align:right;">الوحدة / الدرس</th>'
    +'<th style="padding:7px;">الحالة / سريع</th>'
    +'<th style="padding:7px;">الإتقان / شامل</th>'
    +'<th style="padding:7px;">محاولات</th></tr></thead>'
    +'<tbody>'+rows+'</tbody></table></div>'
    +'<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;">'
    +'<button onclick="hhSchExportCSV()" style="background:#EBF2EE;color:#3D6B53;border:1.5px solid #3D6B53;border-radius:10px;padding:9px 16px;font-family:Cairo;font-weight:900;font-size:.78rem;cursor:pointer;">تصدير التقدّم CSV</button>'
    +'<button onclick="hhSchReset()" style="background:#fff;color:#c0392b;border:1.5px solid #e0c0c0;border-radius:10px;padding:9px 16px;font-family:Cairo;font-weight:900;font-size:.78rem;cursor:pointer;">تصفير التقدّم</button>'
    +'</div>';
  hhSchModal('لوحة متابعة الصف', html, '#1F4E79');
}
function hhSchExportCSV(){
  var S=hhSchData();
  var rows=[['الوحدة','الدرس','اختبار سريع%','اختبار شامل%','الإتقان%','المحاولات','الحالة']];
  S.units.forEach(function(U,i){
    var m=_hhSchProg['u'+i+'_mastery']||0, at=hhSchAttempts(i), st=hhSchUnitState(i);
    U.lessons.forEach(function(L){
      rows.push([U.unit, L.title, _hhSchProg[L.id+'_quick']||0, _hhSchProg[L.id+'_full']||0, m, at,
        st==='done'?'أُتقنت':st==='open'?'متاحة':'مقفلة']);
    });
  });
  var csv=rows.map(function(r){return r.map(function(c){return '"'+String(c).replace(/"/g,'""')+'"';}).join(',');}).join('\n');
  var bl=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'});
  var a=document.createElement('a'); a.href=URL.createObjectURL(bl);
  a.download='madrasati_progress_'+new Date().toISOString().slice(0,10)+'.csv'; a.click();
}
function hhSchReset(){
  _hhSchProg={}; hhSchSave();
  var m=document.getElementById('hh-sch-modal'); if(m) m.remove();
  hhOpenSchool();
  if(typeof toast==='function') toast('صُفّر التقدّم','info');
}

// بوابة إضافة المحتوى للمعلم: تتطلب اعتماد المنصة
function hhSchTeacherAdd(){
  var approved = false;
  try{
    approved = (typeof hhIsAdmin==='function' && hhIsAdmin())
            || (typeof _hhMyRole!=='undefined' && _hhMyRole==='teacher');
  }catch(e){}
  if(approved){ hhOpenCurriculum(); return; }
  hhSchApprovalForm();
}

// نموذج طلب الاعتماد: الاسم، المادة، المدرسة، رقم التواصل، البريد
async function hhSchApprovalForm(){
  if(typeof currentUser==='undefined' || !currentUser){
    if(typeof toast==='function') toast('سجّل دخولك أولاً لتقديم طلب الاعتماد','warn');
    return;
  }
  try{
    if(db){
      var doc = await db.collection('teacher_requests').doc(currentUser.uid).get();
      if(doc.exists && doc.data().status==='pending'){
        if(typeof toast==='function') toast('طلب اعتمادك قيد المراجعة · سنعلمك فور القبول','info');
        return;
      }
    }
  }catch(e){}
  var old=document.getElementById('hh-sch-approve'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-sch-approve';
  ov.style.cssText='position:fixed;inset:0;background:rgba(30,6,15,.7);z-index:999992;display:flex;align-items:center;justify-content:center;padding:16px;direction:rtl;overflow-y:auto;';
  ov.addEventListener('click',function(e){ if(e.target===ov) ov.remove(); });
  function fld(id,label,val,type){
    return '<div style="margin-bottom:10px;"><label style="display:block;font-size:.78rem;color:#8A6D2E;font-weight:700;margin-bottom:4px;">'+label+'</label>'
      +'<input id="'+id+'" type="'+(type||'text')+'" value="'+(val||'')+'" style="width:100%;box-sizing:border-box;background:#fff;border:1.5px solid #D4BC85;border-radius:10px;padding:9px 12px;font-family:Cairo;font-size:.85rem;color:#3D2A16;"></div>';
  }
  ov.innerHTML='<div onclick="event.stopPropagation()" style="background:#FBF7F0;border:2px solid #B8924A;border-top:4px solid #8A1538;border-radius:16px;max-width:420px;width:100%;overflow:hidden;">'
    +'<div style="background:linear-gradient(175deg,#4A0B1E,#5E0E26);color:#fff;padding:14px 16px;border-bottom:2px solid #B8924A;">'
    +'<div style="font-weight:700;font-size:1.05rem;">طلب اعتماد معلم</div>'
    +'<div style="font-size:.78rem;color:#EAD9B0;margin-top:2px;">الاعتماد يمنحك صلاحية إضافة المحتوى وتحويله لاختبارات وقصص</div></div>'
    +'<div style="padding:16px;">'
    + fld('ap-name','اسم المعلم', currentUser.displayName||'')
    + fld('ap-subject','المادة التي تدرّسها','')
    + fld('ap-school','المدرسة','')
    + fld('ap-phone','رقم التواصل','','tel')
    + fld('ap-email','البريد الإلكتروني', currentUser.email||'','email')
    +'<div id="ap-status" style="font-size:.78rem;font-weight:700;margin-bottom:8px;"></div>'
    +'<button onclick="hhSchSubmitApproval()" style="width:100%;background:linear-gradient(135deg,#EAD9B0,#B8924A);color:#3D0918;border:1px solid #FDF3DD;border-radius:11px;padding:11px;font-weight:700;font-size:.95rem;cursor:pointer;">إرسال الطلب</button>'
    +'<button onclick="document.getElementById(\'hh-sch-approve\').remove()" style="width:100%;background:none;border:none;color:#8A6D2E;font-weight:700;font-size:.8rem;cursor:pointer;margin-top:8px;">إلغاء</button>'
    +'</div></div>';
  document.body.appendChild(ov);
}

async function hhSchSubmitApproval(){
  var g=function(id){ var e=document.getElementById(id); return e?e.value.trim():''; };
  var st=document.getElementById('ap-status');
  var name=g('ap-name'), subject=g('ap-subject'), school=g('ap-school'), phone=g('ap-phone'), email=g('ap-email');
  if(!name||!subject||!school||!phone||!email){
    if(st){ st.textContent='أكمل الحقول الخمسة جميعها'; st.style.color='#c0392b'; }
    return;
  }
  try{
    await db.collection('teacher_requests').doc(currentUser.uid).set({
      uid: currentUser.uid, name:name, subject:subject, school:school,
      phone:phone, email:email, status:'pending',
      createdAt: new Date().toISOString()
    });
    var ov=document.getElementById('hh-sch-approve'); if(ov) ov.remove();
    if(typeof toast==='function') toast('أُرسل طلب اعتمادك · ستصلك صلاحية الإضافة فور القبول','success');
    if(typeof hhLogActivity==='function') hhLogActivity('teacher_request', name+' · '+school);
  }catch(e){
    console.error('approval submit', e);
    if(st){ st.textContent='تعذر الإرسال · تأكد من اتصالك وحاول ثانية'; st.style.color='#c0392b'; }
  }
}

function hhOpenCurriculum(){
  hhLoadLessons();
  var old = document.getElementById('hh-curr'); if(old) old.remove();
  var ov = document.createElement('div'); ov.id = 'hh-curr';
  ov.style.cssText = 'position:fixed;inset:0;background:rgba(30,6,15,.66);z-index:999975;display:flex;align-items:flex-start;justify-content:center;padding:16px;overflow-y:auto;direction:rtl;';

  var lessonCards = _hhLessons.length ? _hhLessons.map(function(L, i){
    return '<div style="background:#fff;border:1.5px solid #D9C79E;border-right:4px solid #B8924A;border-radius:13px;background:linear-gradient(170deg,#FFFDF8,#FBF5E9);padding:11px 13px;margin-bottom:8px;">' + '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;flex-wrap:wrap;">' +   '<div style="flex:1;min-width:0;">' +     '<div style="font-weight:900;font-size:.85rem;color:#3D0918;">' + esc(L.lesson||'درس') + '</div>' +     '<div style="font-size:.7rem;color:#888;font-weight:700;margin-top:2px;">' +        esc(L.subject||'') + ' · ' + esc(L.grade||'') + ' · ' + esc(L.unit||'') + '</div>' +     '<div style="font-size:.68rem;color:#aaa;margin-top:3px;">' + (L.text ? L.text.length : 0) + ' حرفاً · ' + esc(L.date||'') + '</div>' +   '</div>' +   '<div style="display:flex;gap:5px;flex-wrap:wrap;">' +     '<button onclick="hhGenerateFromLesson(' + i + ')" style="background:linear-gradient(135deg,#EAD9B0,#B8924A);color:#3D0918;border:1px solid #FDF3DD;border-radius:8px;padding:6px 12px;font-family:Cairo;font-weight:800;font-size:.7rem;cursor:pointer;">ولّد اختباراً</button>' +     '<button onclick="hhLessonToStory(' + i + ')" style="background:linear-gradient(175deg,#7A1330,#4A0B1E);color:#F5E6C4;border:1px solid #B8924A;border-radius:8px;padding:6px 12px;font-family:Cairo;font-weight:800;font-size:.7rem;cursor:pointer;">ولّد قصة</button>' +     '<button onclick="hhViewLesson(' + i + ')" style="background:rgba(184,146,74,.08);color:#8A6D2E;border:1px solid #B8924A;border-radius:8px;padding:6px 10px;font-family:Cairo;font-weight:800;font-size:.7rem;cursor:pointer;">النص</button>' +     '<button onclick="hhDeleteLesson(' + i + ')" style="background:#fff;color:#c0392b;border:1px solid #e0c0c0;border-radius:8px;padding:6px 10px;font-family:Cairo;font-weight:900;font-size:.7rem;cursor:pointer;">حذف</button>' +   '</div></div></div>';
  }).join('') : '<div style="text-align:center;color:#999;font-size:.82rem;font-weight:700;padding:22px;">لم تُضف دروس بعد · ابدأ برفع درسك الأول </div>';

  ov.innerHTML = '<div style="background:#FBF7F0;border:2px solid #B8924A;border-radius:20px;max-width:680px;width:100%;overflow:hidden;margin-bottom:24px;font-family:Cairo,Tajawal,sans-serif;">' + '<div style="background:linear-gradient(175deg,#4A0B1E,#5E0E26);border-bottom:2px solid #B8924A;color:#F5E6C4;padding:14px 18px;display:flex;justify-content:space-between;align-items:center;">' +   '<div style="font-weight:900;font-size:.98rem;">مركز المناهج · دروسي الخاصة</div>' +   '<button onclick="hhCloseCurriculum()" style="background:none;border:none;color:#fff;font-size:1.15rem;cursor:pointer;">✕</button></div>' + '<div style="padding:16px 18px;">' // نموذج الإضافة
    + '<div style="background:linear-gradient(170deg,#FFFDF8,#FBF5E9);border:1.5px solid #B8924A;border-radius:14px;padding:14px;margin-bottom:16px;">' +   '<div style="font-weight:900;font-size:.88rem;color:#5E0E26;margin-bottom:10px;">رفع درس جديد · Word أو PDF أو نص</div>' +   '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">' +     '<input id="cl-subject" placeholder="المادة (مثال: الدراسات الاجتماعية)" style="border:1.5px solid rgba(184,146,74,.5);border-radius:9px;padding:8px 10px;font-family:Cairo;font-size:.8rem;box-sizing:border-box;">' +     '<input id="cl-grade" placeholder="الصف (مثال: السابع)" style="border:1.5px solid rgba(184,146,74,.5);border-radius:9px;padding:8px 10px;font-family:Cairo;font-size:.8rem;box-sizing:border-box;">' +     '<input id="cl-unit" placeholder="الوحدة (مثال: الوحدة الأولى)" style="border:1.5px solid rgba(184,146,74,.5);border-radius:9px;padding:8px 10px;font-family:Cairo;font-size:.8rem;box-sizing:border-box;">' +     '<input id="cl-lesson" placeholder="عنوان الدرس" style="border:1.5px solid rgba(184,146,74,.5);border-radius:9px;padding:8px 10px;font-family:Cairo;font-size:.8rem;box-sizing:border-box;">' +   '</div>' +   '<div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;flex-wrap:wrap;">' +     '<input type="file" id="cl-file" accept=".pdf,.txt,text/plain,application/pdf" onchange="hhLessonFilePicked(this)" style="font-family:Cairo;font-size:.75rem;flex:1;min-width:160px;">' +     '<span style="font-size:.68rem;color:#999;">أو الصق النص أدناه</span>' +   '</div>' +   '<textarea id="cl-text" rows="5" placeholder="نص الدرس · يُملأ تلقائياً عند رفع ملف، أو الصقه هنا مباشرة" style="width:100%;border:1.5px solid rgba(184,146,74,.5);border-radius:10px;padding:9px 11px;font-family:Cairo,Tajawal,sans-serif;font-size:.8rem;line-height:1.8;resize:vertical;box-sizing:border-box;"></textarea>' +   '<div id="cl-status" style="font-size:.72rem;font-weight:800;min-height:16px;margin-top:4px;color:#8A6D2E;"></div>' +   '<button onclick="hhAddLesson()" style="background:linear-gradient(175deg,#7A1330,#4A0B1E);color:#F5E6C4;border:1px solid #B8924A;border-radius:11px;padding:10px 22px;font-family:Cairo;font-weight:900;font-size:.84rem;cursor:pointer;margin-top:6px;">حفظ الدرس في المكتبة</button>' + '</div>' // المكتبة
    + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">' +   '<div style="font-weight:900;font-size:.9rem;color:#5E0E26;"> مكتبة الدروس (' + _hhLessons.length + ')</div>' +   '<div style="display:flex;gap:6px;flex-wrap:wrap;">' +   (window._HH_CURRICULUM_PACK ? '<button onclick="hhImportPack()" style="background:linear-gradient(135deg,#8A1538,#5E0E26);color:#fff;border:none;border-radius:9px;padding:6px 13px;font-family:Cairo;font-weight:900;font-size:.74rem;cursor:pointer;"> استورد المنهج الرسمي</button>' : '')
    +   '<button onclick="hhShowUsageStats()" style="background:#FDF3DD;color:#8A6D2E;border:1.5px solid #B8924A;border-radius:9px;padding:6px 13px;font-family:Cairo;font-weight:900;font-size:.74rem;cursor:pointer;"> إحصاءات</button>' +   '</div>' + '</div>' + lessonCards
    + '</div></div>';
  document.body.appendChild(ov);
}
function hhCloseCurriculum(){ var e=document.getElementById('hh-curr'); if(e) e.remove(); }

function hhLessonFilePicked(input){
  var f = input.files && input.files[0]; if(!f) return;
  var st = document.getElementById('cl-status');
  if(st){ st.textContent = '⏳ جاري استخراج النص...'; st.style.color = '#8A6D2E'; }
  hhExtractText(f, function(err, text){
    if(err){ if(st){ st.textContent = ' ' + err; st.style.color = '#c0392b'; } return; }
    var ta = document.getElementById('cl-text');
    if(ta) ta.value = text;
    // تعبئة اسم الدرس تلقائياً من اسم الملف
    var ln = document.getElementById('cl-lesson');
    if(ln && !ln.value) ln.value = (f.name||'').replace(/\.(pdf|txt)$/i,'').slice(0,60);
    if(st){ st.textContent = '✓ استُخرج ' + text.length + ' حرفاً'; st.style.color = '#3D6B53'; }
  });
}

function hhAddLesson(){
  var g = function(id){ var e=document.getElementById(id); return e ? e.value.trim() : ''; };
  var text = g('cl-text');
  var lesson = g('cl-lesson');
  var st = document.getElementById('cl-status');
  if(!lesson){ if(st){ st.textContent=' اكتب عنوان الدرس'; st.style.color='#c0392b'; } return; }
  if(text.length < 50){ if(st){ st.textContent=' نص الدرس قصير جداً (50 حرفاً على الأقل)'; st.style.color='#c0392b'; } return; }
  _hhLessons.push({
    subject: g('cl-subject') || 'غير محدد',
    grade:   g('cl-grade')   || 'غير محدد',
    unit:    g('cl-unit')    || 'غير محدد',
    lesson:  lesson,
    text:    text.slice(0, 40000),
    date:    new Date().toLocaleDateString('ar-QA',{month:'short',day:'numeric'}),
    ts:      Date.now()
  });
  if(hhSaveLessons()){
    hhLogActivity('lesson_add', lesson);
    if(typeof toast==='function') toast('✓ حُفظ الدرس «'+lesson+'» في المكتبة','success');
    hhOpenCurriculum();
  }
}
function hhDeleteLesson(i){
  if(!_hhLessons[i]) return;
  _hhLessons.splice(i,1);
  hhSaveLessons();
  hhOpenCurriculum();
  if(typeof toast==='function') toast('حُذف الدرس','info');
}
// تحويل درس من مكتبة المعلم إلى قصة تفاعلية تلقائياً
function hhLessonToStory(i){
  var L=_hhLessons[i]; if(!L) return;
  var sents=(L.text||'').replace(/\s+/g,' ').split(/[.؟!،؛\n]+/)
    .map(function(s){return s.trim();})
    .filter(function(s){return s.length>=30 && s.length<=220;});
  if(sents.length<4){
    if(typeof toast==='function') toast('نص الدرس قصير عن توليد قصة · يحتاج 4 جمل معلوماتية على الأقل','warn');
    return;
  }
  var flips=[['يزداد','يقل'],['تزداد','تقل'],['مرتفع','منخفض'],['ارتفاع','انخفاض'],['شمال','جنوب'],['شرق','غرب'],['أكبر','أصغر'],['قبل','بعد'],['صيف','شتاء'],['عكسية','طردية'],['الأول','الأخير'],['جميع','بعض'],['دائماً','نادراً']];
  function distort(s){
    for(var f=0; f<flips.length; f++){
      if(s.indexOf(flips[f][0])!==-1) return s.split(flips[f][0]).join(flips[f][1]);
      if(s.indexOf(flips[f][1])!==-1) return s.split(flips[f][1]).join(flips[f][0]);
    }
    var m=s.match(/\d+/);
    if(m){ var n=parseInt(m[0],10); return s.replace(m[0], String(n+(n>10?Math.round(n/2):3))); }
    return 'ليس صحيحاً أن '+s;
  }
  function shuffle(a){ for(var x=a.length-1;x>0;x--){var j=Math.floor(Math.random()*(x+1));var t=a[x];a[x]=a[j];a[j]=t;} return a; }
  var picked=sents.slice(0, Math.min(5, sents.length));
  var scenes=picked.map(function(s, idx){
    var ch=shuffle([
      { t:s, ok:true,  fb:'أحسنت · هذه هي المعلومة الدقيقة كما وردت في الدرس.' },
      { t:distort(s), ok:false, fb:'انتبه · الصياغة الدقيقة في الدرس هي: «'+s+'».' }
    ]);
    return { id:idx+1, text:'المحطة '+(idx+1)+': أيُّ العبارتين هي الدقيقة علمياً؟', choices:ch };
  });
  var sid='cur_'+(L.ts||Date.now());
  HH_STORIES[sid]={
    title:'رحلة: '+L.lesson,
    unit:'من مناهجي · '+(L.subject||''),
    intro:'قصة مولدة تلقائياً من درسك «'+L.lesson+'»: في كل محطة عبارتان إحداهما دقيقة والأخرى محرفة · ميّز الصواب لتتقدم.',
    scenes:scenes
  };
  if(typeof hhLogActivity==='function') hhLogActivity('generate','قصة من درس: '+L.lesson);
  hhStartStory(sid);
}

function hhViewLesson(i){
  var L=_hhLessons[i]; if(!L) return;
  var ov=document.createElement('div');
  ov.style.cssText='position:fixed;inset:0;background:rgba(30,6,15,.7);z-index:999994;display:flex;align-items:center;justify-content:center;padding:18px;direction:rtl;';
  ov.onclick=function(){ ov.remove(); };
  ov.innerHTML='<div onclick="event.stopPropagation()" style="background:#fff;border:2px solid #B8924A;border-radius:18px;max-width:620px;width:100%;max-height:80vh;overflow:hidden;display:flex;flex-direction:column;font-family:Cairo,Tajawal,sans-serif;">' +'<div style="background:linear-gradient(135deg,#1F4E79,#12304d);color:#fff;padding:12px 16px;font-weight:900;font-size:.9rem;">'+esc(L.lesson)+'</div>' +'<div style="padding:14px 16px;overflow-y:auto;font-size:.82rem;line-height:2;color:#333;white-space:pre-wrap;">'+esc(L.text)+'</div></div>';
  document.body.appendChild(ov);
}

// ── نقطة الربط بالتوليد (تعمل محلياً الآن، وتتحول لنموذج لغوي عند إضافة الوسيط) ──
function hhGenerateFromLesson(i){
  var L = _hhLessons[i]; if(!L) return;
  hhLogActivity('generate', L.lesson);
  var ov=document.createElement('div'); ov.id='hh-gen';
  ov.style.cssText='position:fixed;inset:0;background:rgba(30,6,15,.7);z-index:999993;display:flex;align-items:center;justify-content:center;padding:18px;direction:rtl;';
  ov.innerHTML='<div style="background:#fff;border:2px solid #B8924A;border-radius:18px;max-width:460px;width:100%;overflow:hidden;font-family:Cairo,Tajawal,sans-serif;">' +'<div style="background:linear-gradient(135deg,#3D6B53,#274a38);color:#fff;padding:13px 18px;font-weight:900;font-size:.92rem;"> توليد من: '+esc(L.lesson)+'</div>' +'<div style="padding:16px 18px;">' +'<div style="font-size:.8rem;color:#555;line-height:1.9;margin-bottom:12px;">اختر ما تريد توليده من هذا الدرس:</div>' +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">' +'<button onclick="hhGenRun('+i+',\'questions\')" style="background:#E9EEF8;color:#1F4E79;border:1.5px solid #1F4E79;border-radius:11px;padding:11px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;"> فئة أسئلة</button>' +'<button onclick="hhGenRun('+i+',\'quiz\')" style="background:#EBF2EE;color:#3D6B53;border:1.5px solid #3D6B53;border-radius:11px;padding:11px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;"> اختبار مطبوع</button>' +'<button onclick="hhGenRun('+i+',\'summary\')" style="background:#FDF3DD;color:#8A6D2E;border:1.5px solid #B8924A;border-radius:11px;padding:11px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;"> ملخص الدرس</button>' +'<button onclick="hhGenRun('+i+',\'strategies\')" style="background:#F5E9EE;color:#8A1538;border:1.5px solid #8A1538;border-radius:11px;padding:11px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;"> استراتيجيات</button>' +'<button onclick="hhGenRun('+i+',\'challenge\')" style="background:#FDF3DD;color:#8A6D2E;border:1.5px solid #B8924A;border-radius:11px;padding:11px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;"> تحدي صفي</button>' +'<button onclick="hhAISettings()" style="background:#F3F0F1;color:#666;border:1.5px solid #ddd;border-radius:11px;padding:11px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;"> إعدادات التوليد</button>' +'</div>' +'<div id="hh-gen-out" style="font-size:.78rem;color:#666;line-height:1.9;max-height:260px;overflow-y:auto;"></div>' +'<button onclick="document.getElementById(\'hh-gen\').remove()" style="background:#F3F0F1;color:#666;border:none;border-radius:11px;padding:9px 18px;font-family:Cairo;font-weight:900;font-size:.82rem;cursor:pointer;margin-top:10px;">إغلاق</button>' +'</div></div>';
  document.body.appendChild(ov);
}

async function hhGenRun(i, kind){
  var L=_hhLessons[i]; if(!L) return;
  var out=document.getElementById('hh-gen-out'); if(!out) return;
  var smart = !!hhGetAIEndpoint();
  out.innerHTML='<div style="text-align:center;padding:16px;color:#8A6D2E;font-weight:800;">' + (smart?' جاري التوليد الذكي... قد يستغرق 10-20 ثانية':'⏳ جاري التوليد المحلي...')
    + '<div style="font-size:.7rem;color:#aaa;margin-top:6px;font-weight:700;">'+esc(L.lesson||'')+'</div></div>';
  if(smart){
    try{
      var r = await hhCurrAIGenerate(kind, L);
      out.innerHTML = hhRenderAI(kind, r.data, L)
        + '<div style="font-size:.66rem;color:#3D6B53;margin-top:7px;font-weight:800;"> توليد ذكي' + (typeof r.remaining==='number'? ' · متبقٍ اليوم: '+r.remaining : '') + '</div>';
      if(typeof hhLogActivity==='function') hhLogActivity('generate', kind+': '+(L.lesson||''));
      return;
    }catch(e){
      var msg = (e && e.message==='NO_ENDPOINT') ? '' : (' تعذر التوليد الذكي ('+esc(String(e.message||e)).slice(0,60)+') · عُرض التوليد المحلي بدلاً منه');
      out.innerHTML = (msg?'<div style="background:#FDF3DD;border:1px solid #E3D9C6;border-radius:8px;padding:8px 10px;font-size:.72rem;color:#8A6D2E;font-weight:800;margin-bottom:9px;">'+msg+'</div>':'')
        + hhLocalGenerate(L, kind);
      return;
    }
  }
  setTimeout(function(){
    out.innerHTML = hhLocalGenerate(L, kind)
      + '<div style="background:#E9EEF8;border:1px solid #1F4E79;border-radius:9px;padding:9px 11px;margin-top:9px;font-size:.73rem;color:#1F4E79;font-weight:800;line-height:1.8;">' + ' لتوليد أسئلة احترافية بمستويات بلوم، فعّل التوليد الذكي ' + '<button onclick="hhAISettings()" style="background:#1F4E79;color:#fff;border:none;border-radius:7px;padding:4px 11px;font-family:Cairo;font-weight:900;font-size:.7rem;cursor:pointer;margin-right:4px;">الإعدادات</button></div>';
  }, 350);
}

// مولّد محلي مبدئي (يُستبدل بالنموذج اللغوي عند ربط الوسيط)
function hhLocalGenerate(L, kind){
  var sentences = String(L.text||'').split(/[.。\n!؟?]/).map(function(s){return s.trim();}).filter(function(s){return s.length>25;});
  if(!sentences.length) return '<div style="color:#c0392b;font-weight:800;">النص قصير أو غير صالح للتوليد</div>';

  if(kind==='summary'){
    var top = sentences.slice(0,5);
    return '<div style="background:#FDF8EC;border:1.5px solid #E3D9C6;border-radius:10px;padding:12px;">' + '<div style="font-weight:900;color:#8A6D2E;margin-bottom:7px;"> ملخص «'+esc(L.lesson)+'»</div>' + top.map(function(s,i){ return '<div style="margin-bottom:5px;">• '+esc(s)+'</div>'; }).join('')
      + '</div>';
  }
  if(kind==='strategies'){
    var items = [
      'التعلّم التعاوني: قسّم الطلاب لمجموعات، كل مجموعة تلخّص جزءاً وتعرضه.',
      'خريطة ذهنية: اطلب رسم مفاهيم الدرس وربطها بخطوط مع تعليل الروابط.',
      'الكرسي الساخن: طالب يتقمّص شخصية أو مفهوماً ويجيب أسئلة زملائه.',
      'التقويم الفوري: استخدم لوحة المُلهِم بأسئلة هذا الدرس في آخر 10 دقائق.',
      'الربط بالواقع: اطلب مثالاً من بيئة قطر يوضح الفكرة الرئيسة.' ];
    return '<div style="background:#F5E9EE;border:1.5px solid #E3D9C6;border-radius:10px;padding:12px;">' + '<div style="font-weight:900;color:#8A1538;margin-bottom:7px;"> استراتيجيات مقترحة</div>' + items.map(function(s,i){ return '<div style="margin-bottom:6px;">'+(i+1)+'. '+esc(s)+'</div>'; }).join('')
      + '</div>';
  }
  // أسئلة / اختبار: توليد ملء الفراغ من الجمل
  var qs = [];
  sentences.slice(0,10).forEach(function(s){
    var words = s.split(/\s+/).filter(function(w){return w.length>3;});
    if(words.length < 5) return;
    var key = words[Math.floor(words.length/2)];
    qs.push({ q: s.replace(key, '__________'), a: key });
  });
  if(!qs.length) return '<div style="color:#c0392b;font-weight:800;">تعذر توليد أسئلة من هذا النص</div>';
  var title = kind==='quiz' ? ' اختبار مطبوع' : ' أسئلة مولّدة';
  return '<div style="background:#fff;border:1.5px solid #E3D9C6;border-radius:10px;padding:12px;">' + '<div style="font-weight:900;color:#1F4E79;margin-bottom:8px;">'+title+' · '+esc(L.lesson)+'</div>' + qs.map(function(x,i){
        return '<div style="margin-bottom:9px;padding-bottom:8px;border-bottom:1px dashed #eee;">' + '<div style="font-weight:800;color:#333;">'+(i+1)+'. '+esc(x.q)+'</div>' + '<div style="font-size:.72rem;color:#3D6B53;font-weight:800;margin-top:3px;">الإجابة: '+esc(x.a)+'</div></div>';
      }).join('')
    + '<div style="font-size:.7rem;color:#999;margin-top:8px;line-height:1.7;"> هذه توليدات أولية بقواعد نصية. عند ربط النموذج اللغوي ستصبح أسئلة متدرجة بمستويات بلوم مع خيارات متعددة.</div>' + '</div>';
}

// ── لوحة إحصاءات الاستخدام ──
