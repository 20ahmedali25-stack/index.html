/* ============================================================
   المُلهم التعليمي — حركة الظهور عند التمرير (zzzzzzao)
   ------------------------------------------------------------
   تُظهر عناصر الصفحة الرئيسة بنعومة عند التمرير إليها
   إضافة بصرية بحتة · لا تمسّ أي وظيفة · تعمل مرة واحدة لكل عنصر
   تحترم إعداد «تقليل الحركة» لمن يفعّله في نظامه (وصول)
   ============================================================ */
(function(){
'use strict';
if(window._hhRevealInit) return; window._hhRevealInit=true;

// احترام تفضيل تقليل الحركة (إمكانية وصول)
var reduce=false;
try{ reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}

function injectCSS(){
  if(document.getElementById('hh-reveal-css')) return;
  var st=document.createElement('style'); st.id='hh-reveal-css';
  st.textContent=
   '.hh-rv{opacity:0;transform:translateY(34px);transition:opacity .7s cubic-bezier(.2,.8,.2,1),transform .7s cubic-bezier(.2,.8,.2,1);will-change:opacity,transform;}'
  +'.hh-rv.hh-in{opacity:1;transform:none;}'
  +'.hh-rv-sc{opacity:0;transform:scale(.92);transition:opacity .6s ease,transform .6s cubic-bezier(.2,.8,.2,1);}'
  +'.hh-rv-sc.hh-in{opacity:1;transform:none;}'
  +'.hh-rv-d1{transition-delay:.07s}.hh-rv-d2{transition-delay:.14s}.hh-rv-d3{transition-delay:.21s}.hh-rv-d4{transition-delay:.28s}'
  // لمن يفضّل تقليل الحركة: يظهر كل شيء فوراً بلا حركة
  +'@media (prefers-reduced-motion: reduce){.hh-rv,.hh-rv-sc{opacity:1!important;transform:none!important;transition:none!important;}}';
  document.head.appendChild(st);
}

function mark(){
  var landing=document.getElementById('screen-landing'); if(!landing) return 0;
  var n=0;
  // عناوين الأقسام: تظهر بصعود
  landing.querySelectorAll('.lp-section-head').forEach(function(el){ if(!el.classList.contains('hh-rv')){ el.classList.add('hh-rv'); n++; } });
  // بطاقات الإحصاءات: تظهر بتكبير متتابع
  landing.querySelectorAll('.lp-stat-card').forEach(function(el,i){ if(!el.classList.contains('hh-rv-sc')){ el.classList.add('hh-rv-sc'); if(i%4>0) el.classList.add('hh-rv-d'+(i%4)); n++; } });
  // بطاقات الأدوات: صعود متتابع
  landing.querySelectorAll('.lp-tool-card').forEach(function(el,i){ if(!el.classList.contains('hh-rv')){ el.classList.add('hh-rv'); if(i%3>0) el.classList.add('hh-rv-d'+(i%3)); n++; } });
  // أي بطاقات أخرى في الصفحة الرئيسة
  landing.querySelectorAll('.lp-cta-card,.lp-testimonial,.lp-partner-card,.lp-feature-card,.lp-value-card').forEach(function(el){ if(!el.classList.contains('hh-rv')){ el.classList.add('hh-rv'); n++; } });
  return n;
}

var io=null;
function observe(){
  if(!('IntersectionObserver' in window)){
    // متصفح قديم: أظهر كل شيء فوراً
    document.querySelectorAll('.hh-rv,.hh-rv-sc').forEach(function(el){ el.classList.add('hh-in'); });
    return;
  }
  if(!io){
    io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('hh-in'); io.unobserve(e.target); } });
    },{threshold:0.12, rootMargin:'0px 0px -40px 0px'});
  }
  document.querySelectorAll('.hh-rv:not(.hh-in),.hh-rv-sc:not(.hh-in)').forEach(function(el){ io.observe(el); });
}

function run(){
  injectCSS();
  if(reduce){ mark(); document.querySelectorAll('.hh-rv,.hh-rv-sc').forEach(function(el){ el.classList.add('hh-in'); }); return; }
  var n=mark();
  observe();
  // العناصر الظاهرة أصلاً في الشاشة الأولى: أظهرها فوراً بلطف
  requestAnimationFrame(function(){
    document.querySelectorAll('.hh-rv,.hh-rv-sc').forEach(function(el){
      var r=el.getBoundingClientRect();
      if(r.top < (window.innerHeight||800)*0.9){ el.classList.add('hh-in'); if(io) io.unobserve(el); }
    });
  });
}

// شغّل عند تحميل الصفحة، وأعد الوسم كلما عادت الصفحة الرئيسة للظهور
function boot(){
  run();
  // بعض المنصات تعيد بناء الصفحة الرئيسة ديناميكياً؛ نراقب ظهورها
  var landing=document.getElementById('screen-landing');
  if(landing){
    var mo=new MutationObserver(function(){ if(landing.offsetParent!==null) run(); });
    try{ mo.observe(landing,{childList:true,subtree:false}); }catch(e){}
  }
  // إعادة فحص خفيفة بعد ثوانٍ لالتقاط أي محتوى حُقن متأخراً
  setTimeout(run, 1500); setTimeout(run, 4000);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot); else boot();
window.hhRevealRun=run;
})();
