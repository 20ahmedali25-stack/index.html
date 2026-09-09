/* ============================================================
   المُلهم التعليمي — تطوير النظرة العامة للوحة التحكم (zzzzzzw)
   ------------------------------------------------------------
   طبقة مستقلة تُثري تبويب «نظرة عامة» ببطاقات مؤشرات حية،
   رسم النشاط الأسبوعي، وأحدث الإجراءات من سجلّ المراجعة.
   لا تمسّ بنية اللوحة القائمة · تُحقن في حاوية موجودة عند فتح التبويب.
   ============================================================ */
(function(){
'use strict';
if(window._hhOverviewInit) return; window._hhOverviewInit=true;
function db(){ return firebase.firestore(); }
function isAdm(){ return (typeof hhIsAdmin==='function' && hhIsAdmin()); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }

var C={m:'#4A0B1E',m2:'#5E0E26',r:'#8A1538',g:'#B8924A',g2:'#EAD9B0',ink:'#3D0918',mute:'#8A7A63',green:'#3D6B53'};
function ico(n){
  var P={ppl:'<path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/>',
    cls:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    q:'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    tch:'<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>'};
  return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B8924A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+(P[n]||'')+'</svg>';
}

function style(){
  if(document.getElementById('hh-ov-style')) return;
  var st=document.createElement('style'); st.id='hh-ov-style';
  st.textContent=
   '#hh-ov{margin:14px 0;font-family:Cairo,sans-serif;direction:rtl;}'
  +'#hh-ov .kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:14px;}'
  +'@media(max-width:720px){#hh-ov .kpis{grid-template-columns:repeat(2,1fr);}}'
  +'#hh-ov .kpi{background:linear-gradient(160deg,#FFFDF8,#F6EEDC);border:1.5px solid #B8924A;border-radius:14px;padding:14px;position:relative;overflow:hidden;}'
  +'#hh-ov .kpi::before{content:"";position:absolute;top:0;right:0;width:4px;height:100%;background:linear-gradient(#EAD9B0,#B8924A);}'
  +'#hh-ov .kpi .ic{position:absolute;top:12px;left:12px;opacity:.85;}'
  +'#hh-ov .kpi .n{font-size:1.7rem;font-weight:900;color:#5E0E26;line-height:1;}'
  +'#hh-ov .kpi .l{font-size:.66rem;color:#8A7A63;font-weight:700;margin-top:4px;}'
  +'#hh-ov .kpi .t{position:absolute;bottom:12px;left:12px;font-size:.58rem;font-weight:900;padding:2px 8px;border-radius:99px;background:#E6F2EA;color:#2C5340;}'
  +'#hh-ov .grid{display:grid;grid-template-columns:1.4fr 1fr;gap:14px;}'
  +'@media(max-width:720px){#hh-ov .grid{grid-template-columns:1fr;}}'
  +'#hh-ov .card{background:#FFFDF8;border:1.5px solid #B8924A;border-radius:16px;padding:16px;}'
  +'#hh-ov .card h4{margin:0 0 12px;font-size:.9rem;color:#5E0E26;font-weight:900;display:flex;align-items:center;gap:8px;}#hh-ov .card h4::before{content:"";width:5px;height:18px;background:linear-gradient(#EAD9B0,#B8924A);border-radius:9px;}'
  +'#hh-ov .chart{height:150px;display:flex;align-items:flex-end;gap:8px;padding-top:18px;}'
  +'#hh-ov .bar{flex:1;background:linear-gradient(#8A1538,#5E0E26);border-radius:7px 7px 0 0;position:relative;display:flex;align-items:flex-end;justify-content:center;color:#EAD9B0;font-size:.58rem;font-weight:900;padding-bottom:3px;min-height:6px;}'
  +'#hh-ov .bar span{position:absolute;top:-15px;color:#5E0E26;font-size:.6rem;font-weight:900;}'
  +'#hh-ov .rows{display:flex;flex-direction:column;gap:6px;}'
  +'#hh-ov .row{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #EAE0CA;border-radius:11px;padding:8px 12px;font-size:.72rem;font-weight:800;color:#3D0918;}'
  +'#hh-ov .row .av{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#8A1538,#5E0E26);color:#EAD9B0;display:flex;align-items:center;justify-content:center;font-size:.66rem;flex-shrink:0;}'
  +'#hh-ov .row .tm{margin-right:auto;color:#8A7A63;font-size:.6rem;font-weight:700;}'
  +'#hh-ov .empty{text-align:center;color:#8A7A63;font-weight:800;padding:14px;font-size:.72rem;}';
  document.head.appendChild(st);
}

function relTime(t){
  if(!t) return ''; var d=Date.now()-t; var m=Math.floor(d/60000);
  if(m<1) return 'الآن'; if(m<60) return 'قبل '+m+' د'; var h=Math.floor(m/60); if(h<24) return 'قبل '+h+' س';
  var dd=Math.floor(h/24); return 'قبل '+dd+' يوم';
}

async function build(){
  if(!isAdm()) return;
  style();
  var host=document.getElementById('mc-home-stats'); if(!host) return;
  var box=document.getElementById('hh-ov');
  if(!box){ box=document.createElement('div'); box.id='hh-ov'; host.insertAdjacentElement('afterend', box); }
  box.innerHTML='<div class="empty">جارٍ تجهيز النظرة العامة…</div>';

  // جمع البيانات بمحاولات مستقلة (فشل واحدة لا يُسقط الباقي)
  var users=[], regs=[], audit=[], games=0;
  try{ var us=await db().collection('users').get(); us.forEach(function(d){ users.push(d.data()||{}); }); }catch(e){}
  try{ var au=await db().collection('admin_audit').limit(60).get(); au.forEach(function(d){ audit.push(d.data()||{}); }); audit.sort(function(a,b){ return (b.at||0)-(a.at||0); }); }catch(e){}
  try{ var gs=await db().collection('games').get(); games=gs.size; }catch(e){}

  // مؤشرات
  var students=users.filter(function(u){ return u.role==='student'; }).length;
  var teachers=users.filter(function(u){ return u.role==='teacher'; }).length;
  var qCount=0; try{ for(var c in QDB){ qCount+=(QDB[c]||[]).length; } }catch(e){}

  // النشاط الأسبوعي من سجلّ المراجعة (آخر 7 أيام)
  var days=['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
  var now=new Date(); var buckets=[0,0,0,0,0,0,0]; var labels=[];
  for(var i=6;i>=0;i--){ var dt=new Date(now); dt.setDate(now.getDate()-i); labels.push(days[dt.getDay()].slice(0,3)); }
  audit.forEach(function(a){ if(!a.at) return; var diff=Math.floor((now-a.at)/86400000); if(diff>=0&&diff<7){ buckets[6-diff]++; } });
  var maxB=Math.max(1, Math.max.apply(null, buckets));

  var kpi=function(icn,n,l,trend){ return '<div class="kpi"><span class="ic">'+ico(icn)+'</span><div class="n">'+n+'</div><div class="l">'+l+'</div>'+(trend?'<span class="t">'+trend+'</span>':'')+'</div>'; };
  var chartBars='';
  for(var b=0;b<7;b++){ var h=Math.round(buckets[b]/maxB*100); chartBars+='<div class="bar" style="height:'+Math.max(6,h)+'%"><span>'+buckets[b]+'</span>'+labels[b]+'</div>'; }

  var actRows = audit.slice(0,6).map(function(a){
    return '<div class="row"><div class="av">'+esc((a.by||'؟').slice(0,1))+'</div><div style="flex:1;min-width:0;">'+esc(a.detail||a.action||'')+'</div><span class="tm">'+relTime(a.at)+'</span></div>';
  }).join('') || '<div class="empty">لا إجراءات مسجّلة بعد · تبدأ من أول تعديل تقوم به</div>';

  box.innerHTML=
    '<div class="kpis">'
    + kpi('ppl', students||users.length, students?'طالب نشط':'مستخدم', users.length?('إجمالي '+users.length):'')
    + kpi('tch', teachers, 'معلم', teachers?'مسجّل':'')
    + kpi('q', qCount.toLocaleString('en-US'), 'سؤال في البنوك', '')
    + kpi('cls', games, 'لعبة في إبداع', games?'منشأة':'')
    + '</div>'
    + '<div class="grid">'
    +   '<div class="card"><h4>النشاط الأسبوعي (من سجلّ المراجعة)</h4><div class="chart">'+chartBars+'</div></div>'
    +   '<div class="card"><h4>أحدث الإجراءات</h4><div class="rows">'+actRows+'</div></div>'
    + '</div>';
}

// يُشغّل عند فتح تبويب «نظرة عامة» · نغلّف adminTab بالمرجع
function hook(){
  try{
    if(typeof window.adminTab==='function' && !window.adminTab._ovHooked){
      var orig=window.adminTab;
      var w=function(tab){ var r=orig.apply(this, arguments); if(tab==='home'){ setTimeout(function(){ try{ build(); }catch(e){} }, 400); } return r; };
      w._ovHooked=true; window.adminTab=w;
    }
  }catch(e){}
}
var _t=0; var iv=setInterval(function(){ hook(); if((window.adminTab&&window.adminTab._ovHooked) || ++_t>30) clearInterval(iv); }, 800);
// لو كانت اللوحة مفتوحة أصلاً على «نظرة عامة»
setTimeout(function(){ try{ if(document.getElementById('mc-home-stats') && isAdm()) build(); }catch(e){} }, 3000);
window.hhBuildOverview=build;
})();
