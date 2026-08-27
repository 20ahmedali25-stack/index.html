/* ============================================================
   المُلهم التعليمي — رحلة الدرس على الخريطة
   almulhimedu.org · almulhim-journey.js
   ------------------------------------------------------------
   يحوّل أي درس في مدرستي (بياناته كما في الكتاب) إلى رحلة بستة معالم:
   مرصد اللمحة → خيمة القصة → بئر الفحص → سوق الدرس → مجلس القيم → بوابة الإتقان
   - لا اختلاق: كل محطة تُبنى من حقول الدرس نفسها (text, summary, terms, vals, q, story)
   - المفاهيم = المصطلحات (terms) · إتقان كل مفهوم يرفع راية على القلعة
   - المؤقت في الفحص والبوابة فقط · تشجيع مع معلومة · وسام لفظي معتمد
   - صور الكتاب: يقرأها من L.images ومن Firestore lesson_media/{lessonId}
     ويستطيع المشرف والمعلم المعتمد رفع صورة من الكتاب وأسئلة تحتها
   يعتمد على: hhSchData, _hhSchProg, hhSchSave, HH_STORIES, esc, toast, hhUploadQImageToStorage
   ============================================================ */
(function(){
  'use strict';
  var PRAISE=['أحسنت، ميّزت الفكرة بدقة','رائع، هذا فهم لا حفظ','ممتاز، خطوة أقرب إلى الإتقان','صحيح، وبسرعة أيضاً','جميل، استنتاج سليم','بارك الله فيك، إجابة موفقة','أصبت، تابع بهذا التركيز','ما شاء الله، عقل حاضر','إجابة صائبة، هكذا يكون الفهم','متقن، واصل التقدم'];
  var STATIONS=[
    {k:'intro', n:'مرصد اللمحة',  x:70,  y:70,  g:'M-8 6h16M-5 6l5-11 5 11'},
    {k:'story', n:'خيمة القصة',   x:220, y:95,  g:'M-9 7l9-14 9 14zM0-7v14'},
    {k:'quick', n:'بئر الفحص',    x:380, y:140, g:'M-8-2h16M-6-2v9h12v-9M0-2v-6'},
    {k:'lesson',n:'سوق الدرس',    x:530, y:100, g:'M-9 7v-9h18v9zM-9-2l3-6h12l3 6'},
    {k:'values',n:'مجلس القيم',   x:600, y:240, g:'M-9 3h18M-7 3v5M7 3v5M-6-4h12v7'},
    {k:'gate',  n:'بوابة الإتقان', x:360, y:330, g:'M-8 8v-10a8 8 0 0 1 16 0v10M-10 8h20'}
  ];
  var PATH='M70 70 Q140 40 220 95 T380 140 T530 100 T600 240 T360 330 T200 340 T110 260';
  var J=null; // حالة الرحلة الحالية

  function E(s){ return (typeof esc==='function')?esc(s):String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function T(m,k){ if(typeof toast==='function') toast(m,k||'info'); }
  function $(id){ return document.getElementById(id); }
  function shuffle(a){ return a.slice().sort(function(){ return Math.random()-.5; }); }
  function canEdit(){ try{ if(typeof hhIsAdmin==='function'&&hhIsAdmin()) return 'admin'; if(typeof _hhSchRole!=='undefined'&&_hhSchRole==='teacher'&&typeof currentUser!=='undefined'&&currentUser) return 'teacher'; }catch(e){} return null; }
  function normQ(q){ return { q:q.q, o:(q.o||[]).slice(), a:q.a, d:q.d||'', b:q.b||'', why:q.why||q.explain||'' }; }

  // ─────────── فتح الرحلة ───────────
  window.hhJourneyOpen=function(ui, li){
    var S=hhSchData(); if(!S||!S.units||!S.units[ui]) return;
    var U=S.units[ui], L=U.lessons[li]; if(!L) return;
    try{ hhSchLoad(); }catch(e){}
    J={ ui:ui, li:li, U:U, L:L, S:S, cur:0, done:{}, pts:0, streak:0, best:0, media:[], concepts:{}, timer:null, log:[] };
    (L.terms||[]).forEach(function(t){ J.concepts[t[0]]=0; });
    var saved=null; try{ saved=JSON.parse(localStorage.getItem('hh_journey_'+L.id)||'null'); }catch(e){}
    if(saved && saved.done){ J.done=saved.done; J.cur=Math.min(5, Object.keys(J.done).length); J.pts=saved.pts||0; J.concepts=Object.assign(J.concepts, saved.concepts||{}); }
    try{ localStorage.setItem('hh_sch_last_lesson', JSON.stringify({ui:ui,li:li,kindKey:'journey',kind:'الرحلة',title:L.title,unit:U.unit||'',term:_hhSchTerm})); }catch(e){}
    var old=$('hh-journey'); if(old) old.remove();
    var ov=document.createElement('div'); ov.id='hh-journey'; ov.className='hj';
    ov.innerHTML=
      '<div class="hj-top">'
      +'<button type="button" class="hj-back" onclick="hhJourneyClose()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg> رجوع</button>'
      +'<div class="hj-title"><div class="hj-t1">'+E(L.title)+'</div><div class="hj-t2">'+E(U.unit||'')+' · '+E(L.lesson||'')+'</div></div>'
      +'<div class="hj-hud"><span class="hj-pts" id="hj-pts">'+J.pts+'</span><span class="hj-pts-l">نقطة</span><span class="hj-streak" id="hj-streak"></span></div>'
      +'</div>'
      +'<div class="hj-mapwrap">'
      +'<svg class="hj-map" viewBox="0 0 680 400" aria-label="خريطة رحلة الدرس">'
      +'<defs><pattern id="hj-dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="1" fill="#8A6D2E" opacity=".16"/></pattern></defs>'
      +'<rect width="680" height="400" fill="url(#hj-dots)"/>'
      +'<path d="'+PATH+'" fill="none" stroke="#B8924A" stroke-width="6" stroke-dasharray="1 10" stroke-linecap="round" opacity=".6"/>'
      +'<path id="hj-path-done" d="'+PATH+'" fill="none" stroke="#8A1538" stroke-width="6" stroke-linecap="round" stroke-dasharray="1400" stroke-dashoffset="1400"/>'
      +'<g id="hj-lms"></g>'
      +'<g transform="translate(110,260)"><rect x="-36" y="-8" width="72" height="42" rx="5" fill="#FFFDF8" stroke="#B8924A" stroke-width="2"/><rect x="-44" y="-28" width="18" height="62" rx="3" fill="#FFFDF8" stroke="#B8924A" stroke-width="2"/><rect x="26" y="-28" width="18" height="62" rx="3" fill="#FFFDF8" stroke="#B8924A" stroke-width="2"/><path d="M-8 34v-16a8 8 0 0 1 16 0v16" fill="#5E0E26"/><g id="hj-flags"></g><text y="52" text-anchor="middle" font-size="12" font-weight="800" fill="#3D0918" font-family="Cairo">قلعة الإتقان</text></g>'
      +'<g id="hj-avatar"><circle r="13" fill="#8A1538" stroke="#EAD9B0" stroke-width="2"/><circle r="4.5" cy="-3" fill="#F5E6C4"/><path d="M-7 7Q0 1 7 7" fill="#F5E6C4"/></g>'
      +'</svg>'
      +'<div class="hj-toast" id="hj-toast"></div>'
      +'<div class="hj-scroll" id="hj-scroll"><div class="hj-sh"><b id="hj-stitle"></b><button type="button" class="hj-fold" onclick="hhJourneyFold()">طيّ اللفافة</button></div><div id="hj-sbody"></div></div>'
      +'</div>'
      +'<div class="hj-legend">انقر معلماً مضاءً لفتح لفافته · تُفتح المعالم بالتتابع · كل مفهوم يُتقن يرفع راية على القلعة</div>';
    document.body.appendChild(ov);
    drawFlags(); drawLms();
    loadMedia();
    if(!Object.keys(J.done).length) setTimeout(function(){ openStation(0); }, 350);
  };
  window.hhJourneyClose=function(){ if(J&&J.timer) clearInterval(J.timer); var e=$('hh-journey'); if(e) e.remove(); J=null; };
  window.hhJourneyFold=function(){ if(J&&J.timer) clearInterval(J.timer); var s=$('hj-scroll'); if(s) s.classList.remove('on'); };
  function persist(){ try{ localStorage.setItem('hh_journey_'+J.L.id, JSON.stringify({done:J.done,pts:J.pts,concepts:J.concepts})); }catch(e){} }

  // ─────────── الخريطة ───────────
  function drawLms(){
    var g=$('hj-lms'); if(!g) return; var h='';
    STATIONS.forEach(function(s,i){
      var cls='hj-lm'+(J.done[i]?' done':'')+(i>J.cur?' lock':'')+(i===J.cur?' open':'');
      h+='<g class="'+cls+'" data-i="'+i+'" transform="translate('+s.x+','+s.y+')"><circle class="hj-ring" r="24"/><path class="hj-gl" d="'+s.g+'"/><text y="42">'+s.n+'</text></g>';
    });
    g.innerHTML=h;
    g.querySelectorAll('.hj-lm').forEach(function(el){ el.addEventListener('click', function(){ var i=+el.getAttribute('data-i'); if(i>J.cur){ hjToast('أكمل المعلم السابق أولاً'); return; } openStation(i); }); });
    var a=$('hj-avatar'), s=STATIONS[J.cur]; if(a) a.setAttribute('transform','translate('+(s.x+26)+','+(s.y-24)+')');
    var p=$('hj-path-done'); if(p) p.style.strokeDashoffset=1400-Math.round(1400*(J.cur/6));
  }
  function drawFlags(){
    var g=$('hj-flags'); if(!g) return; var keys=Object.keys(J.concepts).slice(0,6); var h='';
    var pos=[[-35,-42],[-14,-18],[8,-18],[35,-42],[-24,-18],[18,-18]];
    keys.forEach(function(k,i){ var p=pos[i]; var on=J.concepts[k]>=100; h+='<line x1="'+p[0]+'" y1="'+p[1]+'" x2="'+p[0]+'" y2="'+(p[1]+16)+'" stroke="#8A6D2E" stroke-width="1.5"/><path d="M'+p[0]+' '+p[1]+'l11 4-11 4z" fill="'+(on?'#8A1538':'#D9C79E')+'"><title>'+E(k)+'</title></path>'; });
    g.innerHTML=h;
  }
  function hjToast(t){ var e=$('hj-toast'); if(!e) return; e.textContent=t; e.classList.add('on'); clearTimeout(e._t); e._t=setTimeout(function(){ e.classList.remove('on'); },1500); }
  function addPts(n){ J.pts+=n; var el=$('hj-pts'); if(!el) return; var v=+el.textContent||0; var iv=setInterval(function(){ v=Math.min(J.pts, v+Math.max(1,Math.ceil(n/8))); el.textContent=v; if(v>=J.pts) clearInterval(iv); },40); persist(); }
  var lastP=-1;
  function hit(ok, concept){
    if(ok){ J.streak++; J.best=Math.max(J.best,J.streak); var p; do{ p=Math.floor(Math.random()*PRAISE.length);}while(p===lastP); lastP=p; hjToast(PRAISE[p]);
      var st=$('hj-streak'); if(st) st.textContent = J.streak>=3 ? 'متتالية '+J.streak : '';
      if(concept && J.concepts.hasOwnProperty(concept)){ J.concepts[concept]=Math.min(100, J.concepts[concept]+50); drawFlags(); }
    } else { J.streak=0; var s2=$('hj-streak'); if(s2) s2.textContent=''; }
  }
  function finish(i){ J.done[i]=1; if(J.cur===i) J.cur=Math.min(5,i+1); persist(); drawLms(); }
  function openStation(i){
    if(J.timer) clearInterval(J.timer);
    var b=BUILD[STATIONS[i].k](); $('hj-stitle').textContent=b.t; $('hj-sbody').innerHTML=b.h; $('hj-scroll').classList.add('on'); $('hj-scroll').scrollTop=0;
    if(i>J.cur) J.cur=i; drawLms(); if(b.b) b.b();
  }
  function nextBtn(i, label){ return '<div class="hj-nav"><button type="button" class="hj-btn hj-btn-gold" onclick="hhJourneyNext('+i+')">'+(label||'التالي')+' <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg></button></div>'; }
  window.hhJourneyNext=function(i){ finish(i); if(i<5) openStation(i+1); };

  // ─────────── المؤقت الحلقي ───────────
  function timerHTML(){ return '<div class="hj-timer" id="hj-tm"><svg width="52" height="52"><circle class="bg" cx="26" cy="26" r="21"/><circle class="fg" cx="26" cy="26" r="21"/></svg><div class="n"></div></div>'; }
  function ring(sec, onEnd){
    var el=$('hj-tm'); if(!el) return; var fg=el.querySelector('.fg'), n=el.querySelector('.n'); var t=sec, C=2*Math.PI*21;
    fg.style.strokeDasharray=C; fg.style.strokeDashoffset=0; n.textContent=t; el.classList.remove('hot');
    clearInterval(J.timer); J.timer=setInterval(function(){ t--; n.textContent=t; fg.style.strokeDashoffset=C*(1-t/sec); if(t<=5) el.classList.add('hot'); if(t<=0){ clearInterval(J.timer); onEnd(); } },1000);
  }
  function timerSec(){ var m=1; try{ if(typeof timerMult!=='undefined') m=timerMult; }catch(e){} return Math.round(20*(m||1)); }

  // سؤال اختيار من متعدد بمؤقت وتشجيع
  function mcq(q, concept, sec){
    var opts=shuffle(q.o);
    var h='<div class="hj-qhead">'+timerHTML()+'<div class="hj-qt">'+E(q.q)+'</div></div>'
      + opts.map(function(o){ return '<button type="button" class="hj-opt" data-o="'+E(o)+'">'+E(o)+'</button>'; }).join('')
      + '<div class="hj-fb" id="hj-fb"></div>';
    return { html:h, bind:function(next){
      var os=document.querySelectorAll('#hj-sbody .hj-opt'); var fb=$('hj-fb'); var doneQ=false;
      function end(chosen, timeout){
        if(doneQ) return; doneQ=true; clearInterval(J.timer);
        var ok = chosen===q.a;
        os.forEach(function(x){ x.disabled=true; if(x.getAttribute('data-o')===q.a) x.classList.add('ok'); else if(x.getAttribute('data-o')===chosen) x.classList.add('bad'); else x.classList.add('dim'); });
        var why = q.why ? ' · '+q.why : ' · الإجابة الصحيحة: '+q.a;
        if(ok){ var left=+($('hj-tm').querySelector('.n').textContent||0); var fast=left>sec/2; fb.className='hj-fb ok'; fb.textContent='صحيح'+(fast?' وبسرعة (+15)':' (+10)')+(q.why?' · '+q.why:''); addPts(fast?15:10); hit(true, concept); }
        else { fb.className='hj-fb bad'; fb.textContent=(timeout?'فاتك السؤال بانتهاء الوقت':'ليس هذا')+why; hit(false); }
        J.log.push({q:q.q, ok:ok}); setTimeout(next, 1400);
      }
      os.forEach(function(o){ o.addEventListener('click', function(){ end(o.getAttribute('data-o'), false); }); });
      ring(sec, function(){ end(null, true); });
    }};
  }
  function conceptFor(q){ var ks=Object.keys(J.concepts); for(var i=0;i<ks.length;i++){ if((q.q+' '+q.a).indexOf(ks[i])!==-1) return ks[i]; } return ks[0]||null; }

  // ─────────── صور الكتاب (Firestore lesson_media) ───────────
  function loadMedia(){
    J.media=(J.L.images||[]).slice();
    try{
      if(typeof firebase==='undefined' || !firebase.firestore) return;
      var col=firebase.firestore().collection('lesson_media');
      var ids=[J.L.id]; try{ if(typeof currentUser!=='undefined'&&currentUser) ids.push(J.L.id+'__'+currentUser.uid); }catch(e){}
      Promise.all(ids.map(function(id){ return col.doc(id).get().catch(function(){ return null; }); })).then(function(rs){
        rs.forEach(function(d){ if(d&&d.exists){ var x=d.data(); (x.images||[]).forEach(function(im){ J.media.push(im); }); } });
        if(J && $('hj-media')) renderMedia();
      });
    }catch(e){}
  }
  function mediaHTML(){
    var role=canEdit();
    var h='<div id="hj-media">';
    J.media.forEach(function(im,i){
      h+='<figure class="hj-fig"><img src="'+E(im.url)+'" alt="'+E(im.caption||'صورة من الكتاب')+'" loading="lazy">'+(im.caption?'<figcaption>'+E(im.caption)+'</figcaption>':'')+'</figure>';
      (im.questions||[]).forEach(function(q,qi){ h+='<div class="hj-imgq" data-mi="'+i+'" data-qi="'+qi+'"><div class="hj-qt">'+E(q.q)+'</div>'+shuffle(q.o||[]).map(function(o){ return '<button type="button" class="hj-opt" data-o="'+E(o)+'">'+E(o)+'</button>'; }).join('')+'<div class="hj-fb"></div></div>'; });
    });
    if(!J.media.length) h+='<div class="hj-empty">لا صور مضافة لهذا الدرس بعد'+(role?' · أضف صورة من الكتاب أدناه':'')+'</div>';
    if(role) h+='<div class="hj-editor"><div class="hj-editor-t">'+(role==='admin'?'المشرف · صورة من الكتاب تظهر للجميع':'المعلم المعتمد · صورة من الكتاب تظهر لصفوفك')+'</div>'
      +'<label class="hj-file"><input type="file" accept="image/*" onchange="hhJourneyPickImage(this)"> اختر صورة من الكتاب</label>'
      +'<img id="hj-prev" class="hj-prev" alt="" style="display:none">'
      +'<input id="hj-cap" type="text" placeholder="تعليق الصورة (اختياري)">'
      +'<input id="hj-iq" type="text" placeholder="سؤال تحت الصورة (اختياري)">'
      +'<div class="hj-row3"><input id="hj-ia" type="text" placeholder="الإجابة الصحيحة"><input id="hj-io1" type="text" placeholder="خيار مشوش 1"><input id="hj-io2" type="text" placeholder="خيار مشوش 2"></div>'
      +'<button type="button" class="hj-btn hj-btn-gold" onclick="hhJourneySaveImage()">حفظ الصورة</button></div>';
    return h+'</div>';
  }
  function renderMedia(){ var m=$('hj-media'); if(!m) return; var wrap=document.createElement('div'); wrap.innerHTML=mediaHTML(); m.replaceWith(wrap.firstChild); bindImgQs(); }
  function bindImgQs(){
    document.querySelectorAll('#hj-media .hj-imgq').forEach(function(box){
      var im=J.media[+box.getAttribute('data-mi')]; var q=(im.questions||[])[+box.getAttribute('data-qi')]; if(!q) return;
      var fb=box.querySelector('.hj-fb');
      box.querySelectorAll('.hj-opt').forEach(function(o){ o.addEventListener('click', function(){ var ok=o.getAttribute('data-o')===q.a; box.querySelectorAll('.hj-opt').forEach(function(x){ x.disabled=true; if(x.getAttribute('data-o')===q.a) x.classList.add('ok'); else if(x===o) x.classList.add('bad'); else x.classList.add('dim'); }); fb.className='hj-fb '+(ok?'ok':'bad'); fb.textContent=ok?'صحيح · قرأت الصورة جيداً':'انظر إلى الصورة مرة أخرى · الإجابة: '+q.a; if(ok){ addPts(8); hit(true, conceptFor(q)); } else hit(false); }); });
    });
  }
  var _pick=null;
  window.hhJourneyPickImage=function(inp){
    var f=inp.files&&inp.files[0]; if(!f) return;
    var r=new FileReader(); r.onload=function(){
      var img=new Image(); img.onload=function(){ var c=document.createElement('canvas'); var s=Math.min(1, 1400/img.width); c.width=Math.round(img.width*s); c.height=Math.round(img.height*s); c.getContext('2d').drawImage(img,0,0,c.width,c.height); _pick=c.toDataURL('image/jpeg',.86); var p=$('hj-prev'); if(p){ p.src=_pick; p.style.display='block'; } };
      img.src=r.result;
    }; r.readAsDataURL(f);
  };
  window.hhJourneySaveImage=async function(){
    var role=canEdit(); if(!role){ T('غير مصرح','error'); return; }
    if(!_pick){ T('اختر صورة أولاً','warn'); return; }
    T('جارٍ رفع الصورة…','info');
    var url=null; try{ if(typeof hhUploadQImageToStorage==='function') url=await hhUploadQImageToStorage(_pick); }catch(e){}
    if(!url){ url=_pick; if(url.length>700000){ T('الصورة كبيرة والتخزين غير متاح · صغّرها وأعد المحاولة','error'); return; } }
    var im={url:url, caption:($('hj-cap').value||'').trim(), questions:[]};
    var qq=($('hj-iq').value||'').trim(), qa=($('hj-ia').value||'').trim(), o1=($('hj-io1').value||'').trim(), o2=($('hj-io2').value||'').trim();
    if(qq && qa){ im.questions.push({q:qq, a:qa, o:[qa].concat([o1,o2].filter(Boolean))}); }
    try{
      var id = role==='admin' ? J.L.id : J.L.id+'__'+currentUser.uid;
      var ref=firebase.firestore().collection('lesson_media').doc(id);
      var d=await ref.get(); var arr=(d.exists&&d.data().images)||[]; arr.push(im);
      await ref.set({lessonId:J.L.id, images:arr, updatedAt:firebase.firestore.FieldValue.serverTimestamp(), by:currentUser.uid, role:role},{merge:true});
      J.media.push(im); _pick=null; renderMedia(); T('حُفظت الصورة وأسئلتها','success');
    }catch(e){ T('تعذر الحفظ: '+e.message,'error'); }
  };

  // ─────────── بناء المحطات من بيانات الدرس ───────────
  var BUILD={
    intro:function(){
      var L=J.L; var first=(L.summary&&L.summary[0])||(L.text||'').split('.')[0]||'';
      var h='<div class="hj-p">'+E(first)+'</div>'
        +'<div class="hj-stats"><div><b>'+(L.terms||[]).length+'</b>مفاهيم</div><div><b>'+(L.summary||[]).length+'</b>أفكار رئيسة</div><div><b>'+(L.q||[]).length+'</b>سؤالاً في البنك</div><div><b>'+(L.vals||[]).length+'</b>قيم</div></div>'
        +(J.media.length?'<figure class="hj-fig"><img src="'+E(J.media[0].url)+'" alt="'+E(J.media[0].caption||'')+'"></figure>':'')
        +nextBtn(0,'انطلق إلى الخيمة');
      return {t:'مرصد اللمحة · '+L.title, h:h};
    },
    story:function(){
      var st=(typeof HH_STORIES!=='undefined')&&HH_STORIES[J.L.id];
      if(!st){ return {t:'خيمة القصة', h:'<div class="hj-p">لا قصة لهذا الدرس بعد؛ تابع إلى بئر الفحص.</div>'+nextBtn(1)}; }
      var sc=st.scenes[0];
      var h='<div class="hj-p hj-story-intro">'+E(st.intro||'')+'</div><div class="hj-p">'+E(sc.text)+'</div>'
        + (sc.choices||[]).map(function(c,i){ return '<button type="button" class="hj-opt" data-i="'+i+'">'+E(c.t)+'</button>'; }).join('')
        + '<div class="hj-fb" id="hj-fb"></div><div class="hj-nav"><button type="button" class="hj-btn" onclick="hhStartStory(\''+E(J.L.id)+'\')">القصة كاملة بمشاهدها</button><button type="button" class="hj-btn hj-btn-gold" onclick="hhJourneyNext(1)">التالي</button></div>';
      return {t:'خيمة القصة · '+E(st.title||''), h:h, b:function(){
        document.querySelectorAll('#hj-sbody .hj-opt').forEach(function(o){ o.addEventListener('click', function(){ var c=sc.choices[+o.getAttribute('data-i')]; document.querySelectorAll('#hj-sbody .hj-opt').forEach(function(x){ x.disabled=true; }); o.classList.add(c.ok?'ok':'bad'); var fb=$('hj-fb'); fb.className='hj-fb '+(c.ok?'ok':'bad'); fb.textContent=c.ok?'قرار صائب'+(c.fb?' · '+c.fb:''):'قرار غير موفق'+(c.fb?' · '+c.fb:''); if(c.ok){ addPts(10); hit(true,null); } else hit(false); }); });
      }};
    },
    quick:function(){
      var qs=shuffle((J.L.q||[]).filter(function(q){ return !q.d||q.d==='easy'||q.d==='سهل'; })).slice(0,3); if(qs.length<2) qs=shuffle(J.L.q||[]).slice(0,3);
      var i=0, ok=0, sec=timerSec();
      function show(){
        if(i>=qs.length){ var weak=Object.keys(J.concepts).sort(function(a,b){ return J.concepts[a]-J.concepts[b]; })[0]; $('hj-sbody').innerHTML='<div class="hj-p"><b>'+ok+' من '+qs.length+'</b> · هذا فحص لا يُحسب درجة'+(weak?' · المرشد: ركّز في سوق الدرس على مفهوم «'+E(weak)+'»':'')+'</div>'+nextBtn(2,'إلى سوق الدرس'); return; }
        var q=normQ(qs[i]); var m=mcq(q, conceptFor(q), sec);
        $('hj-sbody').innerHTML='<div class="hj-meta">سؤال '+(i+1)+' من '+qs.length+' · مؤقت '+sec+' ثانية · لا يُحسب درجة</div>'+m.html;
        m.bind(function(){ if($('hj-fb')&&$('hj-fb').classList.contains('ok')) ok++; i++; show(); });
      }
      return {t:'بئر الفحص السريع', h:'', b:show};
    },
    lesson:function(){
      var L=J.L; var text=L.text||''; var terms=(L.terms||[]);
      // نشاط الكلمات المتقطعة: نستبدل أول ظهور لكل مصطلح في نص الكتاب بفراغ
      var used=[]; var html=E(text);
      terms.forEach(function(t){ var k=E(t[0]); if(html.indexOf(k)!==-1 && used.length<6){ html=html.replace(k,'<span class="hj-blank" data-a="'+k+'">…</span>'); used.push(t[0]); } });
      var pool=shuffle(used.concat(terms.filter(function(t){ return used.indexOf(t[0])===-1; }).map(function(t){ return t[0]; }).slice(0,2)));
      var h='<div class="hj-sec">١ · اقرأ وأكمل · انقر الفراغ ثم الكلمة</div>'
        +'<div class="hj-p hj-text">'+html.replace(/\n+/g,'<br>')+'</div>'
        +(used.length?'<div class="hj-pool" id="hj-pool">'+pool.map(function(w){ return '<button type="button" class="hj-chip">'+E(w)+'</button>'; }).join('')+'</div><div class="hj-fb" id="hj-fb-blank">بلا مؤقت هنا · هذا مكان التفكير</div>':'')
        +'<div class="hj-sec">٢ · الأفكار الرئيسة</div><ol class="hj-ol">'+(L.summary||[]).map(function(s){ return '<li>'+E(s)+'</li>'; }).join('')+'</ol>'
        +'<div class="hj-sec">٣ · صور من الكتاب</div>'+mediaHTML()
        +'<div class="hj-sec">٤ · أسئلة المقطع</div><div id="hj-secq"></div>'
        +nextBtn(3,'إلى مجلس القيم');
      return {t:'سوق الدرس · '+L.title, h:h, b:function(){
        var sel=null; var blanks=document.querySelectorAll('#hj-sbody .hj-blank');
        document.querySelectorAll('#hj-pool .hj-chip').forEach(function(c){ c.addEventListener('click', function(){ document.querySelectorAll('#hj-pool .hj-chip').forEach(function(x){ x.classList.remove('sel'); }); c.classList.add('sel'); sel=c; }); });
        blanks.forEach(function(b){ b.addEventListener('click', function(){ if(!sel){ hjToast('اختر كلمة من السلة أولاً'); return; } var ok=sel.textContent===b.getAttribute('data-a'); var fb=$('hj-fb-blank'); if(ok){ b.textContent=sel.textContent; b.classList.add('ok'); sel.classList.add('used'); addPts(5); hit(true, sel.textContent); fb.className='hj-fb ok'; fb.textContent='صحيح · «'+sel.textContent+'» في مكانها'; } else { fb.className='hj-fb bad'; fb.textContent='ليست هذه الكلمة · اقرأ الجملة وفكّر في التعريف'; hit(false); } sel.classList.remove('sel'); sel=null; if(Array.prototype.every.call(blanks,function(x){ return x.classList.contains('ok'); })){ fb.textContent='اكتمل النص · أحسنت'; addPts(10); } }); });
        bindImgQs();
        // أسئلة المقطع: 3 أسئلة متوسطة بمؤقت
        var qs=shuffle((L.q||[]).filter(function(q){ return q.d==='medium'||q.d==='متوسط'; })); if(qs.length<3) qs=shuffle(L.q||[]); qs=qs.slice(0,3); var i=0, sec=timerSec();
        function show(){ var box=$('hj-secq'); if(!box) return; if(i>=qs.length){ box.innerHTML='<div class="hj-p">انتهت أسئلة المقطع</div>'; return; } var q=normQ(qs[i]); var m=mcq(q, conceptFor(q), sec); box.innerHTML='<div class="hj-meta">سؤال '+(i+1)+' من '+qs.length+'</div>'+m.html; var os=box.querySelectorAll('.hj-opt'); var doneQ=false; function end(ch,to){ if(doneQ) return; doneQ=true; clearInterval(J.timer); var ok=ch===q.a; os.forEach(function(x){ x.disabled=true; if(x.getAttribute('data-o')===q.a) x.classList.add('ok'); else if(x.getAttribute('data-o')===ch) x.classList.add('bad'); else x.classList.add('dim'); }); var fb=box.querySelector('.hj-fb'); if(ok){ fb.className='hj-fb ok'; fb.textContent='صحيح'+(q.why?' · '+q.why:''); addPts(10); hit(true, conceptFor(q)); } else { fb.className='hj-fb bad'; fb.textContent=(to?'فاتك السؤال':'ليس هذا')+' · الإجابة: '+q.a; hit(false); } setTimeout(function(){ i++; show(); },1400); } os.forEach(function(o){ o.addEventListener('click', function(){ end(o.getAttribute('data-o'),false); }); }); ring(sec, function(){ end(null,true); }); }
        show();
      }};
    },
    values:function(){
      var L=J.L;
      var h='<div class="hj-sec">المصطلحات · انقر البطاقة لتقلبها</div><div class="hj-pool">'+(L.terms||[]).map(function(t){ return '<button type="button" class="hj-chip hj-flip" data-f="'+E(t[1])+'">'+E(t[0])+'</button>'; }).join('')+'</div>'
        +((L.vals&&L.vals.length)?'<div class="hj-sec">قيم أتعلمها من الدرس</div><div class="hj-vals">'+L.vals.map(function(v){ return '<div class="hj-val">'+E(typeof v==='string'?v:(v.t||v.text||''))+'</div>'; }).join('')+'</div>':'')
        +nextBtn(4,'إلى بوابة الإتقان');
      return {t:'مجلس القيم والمصطلحات', h:h, b:function(){ document.querySelectorAll('#hj-sbody .hj-flip').forEach(function(f){ var a=f.textContent; f.addEventListener('click', function(){ f.textContent = f.textContent===a ? f.getAttribute('data-f') : a; if(!f._c){ f._c=1; addPts(3); if(J.concepts.hasOwnProperty(a)){ J.concepts[a]=Math.min(100,J.concepts[a]+25); drawFlags(); } } }); }); }};
    },
    gate:function(){
      var pool=shuffle(J.L.q||[]); var qs=pool.slice(0,20); var i=0, ok=0, t0=Date.now(), sec=Math.round(timerSec()*0.75);
      var pass=(J.S&&J.S.masteryPass)||80;
      function show(){
        if(i>=qs.length){
          var acc=qs.length?Math.round(ok/qs.length*100):0; var s=Math.round((Date.now()-t0)/1000); var badge=acc>=pass?'متقن':acc>=60?'جيد':'يحتاج دعماً';
          try{ var key=J.L.id+'_full'; if(typeof _hhSchProg!=='undefined' && acc>(_hhSchProg[key]||0)){ _hhSchProg[key]=acc; if(typeof hhSchSave==='function') hhSchSave(); } if(typeof hhLogActivity==='function') hhLogActivity('quiz','رحلة: '+J.L.title+' '+acc+'%'); }catch(e){}
          var weak=Object.keys(J.concepts).sort(function(a,b){ return J.concepts[a]-J.concepts[b]; })[0];
          $('hj-sbody').innerHTML='<div class="hj-done"><div class="hj-badge '+(acc>=pass?'top':acc>=60?'mid':'low')+'">'+badge+'</div>'
            +'<div class="hj-stats"><div><b>'+acc+'%</b>الدقة</div><div><b>'+s+' ث</b>الوقت</div><div><b>'+J.best+'</b>أفضل متتالية</div><div><b>'+J.pts+'</b>النقاط</div></div>'
            +'<div class="hj-p">'+(acc>=pass?'أُتقن الدرس · فُتح ما بعده ورُفعت الرايات على القلعة':'المرشد: راجع «سوق الدرس»'+(weak?' وركّز على «'+E(weak)+'»':'')+' ثم أعد البوابة بأسئلة مختلفة')+'</div>'
            +'<div class="hj-nav">'+(acc<pass?'<button type="button" class="hj-btn" onclick="hhJourneyReopen(3)">مراجعة سوق الدرس</button><button type="button" class="hj-btn hj-btn-gold" onclick="hhJourneyReopen(5)">إعادة البوابة</button>':'<button type="button" class="hj-btn hj-btn-gold" onclick="hhJourneyClose()">العودة إلى المدرسة</button>')+'</div></div>';
          if(acc>=pass){ Object.keys(J.concepts).forEach(function(k){ J.concepts[k]=100; }); drawFlags(); finish(5); }
          return;
        }
        var q=normQ(qs[i]); var m=mcq(q, conceptFor(q), sec);
        $('hj-sbody').innerHTML='<div class="hj-meta">بوابة الإتقان · سؤال '+(i+1)+' من '+qs.length+' · العتبة '+pass+'% · السرعة تمنح نقاطاً إضافية</div>'+m.html;
        m.bind(function(){ if($('hj-fb')&&$('hj-fb').classList.contains('ok')) ok++; i++; show(); });
      }
      return {t:'بوابة الإتقان', h:'', b:show};
    }
  };
  window.hhJourneyReopen=function(i){ openStation(i); };
})();
