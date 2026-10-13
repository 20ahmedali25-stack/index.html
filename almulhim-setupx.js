/* ============================================================
   المُلهم، اختيار الفئات المختصر (zzzzzzco)
   المسابقات: شبكة واحدة مع تصفية بالجهة
   العامة: شرائح المواضيع وشبكة مدمجة
   الكل: شرائط أفقية لكل مصدر مع «عرض الكل»
   شريط الاختيار: حلقة تقدم ورقائق الفئات وزر التالي
   البطاقات الأصلية تُنقل كما هي فتبقى وظائف الاختيار والبحث تعمل
   ============================================================ */
(function(){
'use strict';
if(window._hhSetupX) return; window._hhSetupX=true;
var MAXC=6, MINC=4;
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function saved(){ try{ var s=JSON.parse(localStorage.getItem('hh_saved_cats')||'[]'); return Array.isArray(s)?s:[]; }catch(e){ return []; } }
function info(c){ try{ return (typeof CAT_INFO!=='undefined'&&CAT_INFO[c])||{}; }catch(e){ return {}; } }
function lbl(c){ return String(info(c).label||c).replace(/\s*·\s*/g,'، '); }
function isComp(c){ try{ return typeof _HH_COMP_CATS!=='undefined'&&_HH_COMP_CATS.has(c); }catch(e){ return false; } }
function levels(){ try{ return CAT_LEVELS; }catch(e){ return []; } }
function groups(){ try{ return CAT_GROUPS; }catch(e){ return []; } }
function levelOf(gid){ var L=levels(); for(var i=0;i<L.length;i++){ if((L[i].groupIds||[]).indexOf(gid)>-1) return L[i].id; } return ''; }
function groupLabel(gid){ var g=groups().filter(function(x){ return x.id===gid; })[0]; return g?String(g.label||'').replace(/\s*·\s*/g,'، '):''; }
function orgOf(gid){ if(/^ajyal/.test(gid)) return 'مركز أجيال'; if(/^wellbeing/.test(gid)) return 'الحياة الطيبة'; if(/^perf/.test(gid)) return 'بيرف آب'; if(/^mprog/.test(gid)) return 'المُلهم'; return 'أخرى'; }
var ORGS=['المُلهم','مركز أجيال','الحياة الطيبة','بيرف آب','أخرى'];
var SRC=[['schools','المدارس','من مناهج الصفوف'],['general','العامة','ثقافة ومعرفة'],['partners','الشركاء','فئات الجهات الشريكة'],['competitions','المسابقات','مسابقة كاملة جاهزة']];
var st={org:'الكل', top:'الكل'};
var X='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>';

/* ── ترتيب الشبكة ── */
function cards(grid){ return [].slice.call(grid.querySelectorAll('.cat-btn')); }
function prep(c){ c.classList.remove('ms-grouped-hidden'); return c; }
function decorate(tab){
  var grid=document.getElementById('ms-cat-grid'); if(!grid) return;
  grid.classList.remove('sx-on','sx-comp','sx-gen','sx-all');
  if(tab!=='competitions'&&tab!=='general'&&tab!=='all') return;
  var C=cards(grid); if(!C.length) return;
  grid.classList.add('sx-on','sx-'+(tab==='competitions'?'comp':tab==='general'?'gen':'all'));
  [].forEach.call(grid.querySelectorAll('.ms-group-header'),function(h){ h.classList.add('sx-hh'); });
  if(tab==='competitions') vComp(grid,C);
  else if(tab==='general') vGen(grid,C);
  else vAll(grid,C);
}
function bar(html){ var d=document.createElement('div'); d.className='sx-bar'; d.innerHTML=html; return d; }
function vComp(grid,C){
  var cnt={}; C.forEach(function(c){ var o=orgOf(c.dataset.group||''); c.dataset.sxo=o; cnt[o]=(cnt[o]||0)+1; });
  if(st.org!=='الكل'&&!cnt[st.org]) st.org='الكل';
  var b=bar('<div class="sx-hd"><b>المسابقات</b><small>'+C.length+' مسابقة</small></div><nav class="sx-chips" aria-label="الجهة">'
    +['الكل'].concat(ORGS.filter(function(o){ return cnt[o]; })).map(function(o){ return '<button type="button" data-sxo="'+esc(o)+'" class="'+(st.org===o?'on':'')+'">'+esc(o)+'<em>'+(o==='الكل'?C.length:cnt[o])+'</em></button>'; }).join('')+'</nav>');
  var g=document.createElement('div'); g.className='sx-grid';
  C.forEach(function(c){ g.appendChild(prep(c)); });
  grid.insertBefore(b,grid.firstChild); grid.insertBefore(g,b.nextSibling);
  b.querySelectorAll('[data-sxo]').forEach(function(x){ x.onclick=function(){ st.org=x.getAttribute('data-sxo'); b.querySelectorAll('[data-sxo]').forEach(function(y){ y.classList.toggle('on',y===x); }); filt(g,function(c){ return st.org==='الكل'||c.dataset.sxo===st.org; }); }; });
  filt(g,function(c){ return st.org==='الكل'||c.dataset.sxo===st.org; });
}
function vGen(grid,C){
  var order=[], cnt={};
  C.forEach(function(c){ var gid=c.dataset.group||''; if(!cnt[gid]){ cnt[gid]=0; order.push(gid); } cnt[gid]++; });
  if(st.top!=='الكل'&&!cnt[st.top]) st.top='الكل';
  var b=bar('<nav class="sx-chips" aria-label="الموضوع"><button type="button" data-sxg="الكل" class="'+(st.top==='الكل'?'on':'')+'">الكل<em>'+C.length+'</em></button>'
    +order.map(function(gid){ return '<button type="button" data-sxg="'+esc(gid)+'" class="'+(st.top===gid?'on':'')+'">'+esc(groupLabel(gid)||gid)+'<em>'+cnt[gid]+'</em></button>'; }).join('')+'</nav>');
  var g=document.createElement('div'); g.className='sx-grid sx-cg';
  C.forEach(function(c){ g.appendChild(prep(c)); });
  grid.insertBefore(b,grid.firstChild); grid.insertBefore(g,b.nextSibling);
  function f(c){ return st.top==='الكل'||c.dataset.group===st.top; }
  b.querySelectorAll('[data-sxg]').forEach(function(x){ x.onclick=function(){ st.top=x.getAttribute('data-sxg'); b.querySelectorAll('[data-sxg]').forEach(function(y){ y.classList.toggle('on',y===x); }); filt(g,f); }; });
  filt(g,f);
}
function vAll(grid,C){
  var by={}; C.forEach(function(c){ var lv=levelOf(c.dataset.group||'')||'general'; (by[lv]=by[lv]||[]).push(c); });
  var first=null;
  SRC.forEach(function(s){ var L=by[s[0]]; if(!L||!L.length) return;
    var sec=document.createElement('section'); sec.className='sx-row';
    sec.innerHTML='<div class="sx-rh"><h3>'+s[1]+'</h3><small>'+s[2]+'</small><button type="button" class="sx-more">عرض الكل<em>'+L.length+'</em></button></div>';
    var strip=document.createElement('div'); strip.className='sx-strip'; L.forEach(function(c){ strip.appendChild(prep(c)); });
    sec.appendChild(strip);
    sec.querySelector('.sx-more').onclick=function(){ try{ msSwitchTab(s[0]); }catch(e){} try{ var t=document.getElementById('ms-cat-grid'); t&&t.scrollIntoView({block:'start'}); }catch(e){} };
    if(first) grid.insertBefore(sec,first.nextSibling); else grid.insertBefore(sec,grid.firstChild);
    first=sec;
  });
}
function filt(g,f){ [].forEach.call(g.children,function(c){ c.classList.toggle('sx-off',!f(c)); }); }

/* ── شريط الاختيار ── */
function pickBar(){
  var pk=document.getElementById('sv2-picked'); if(!pk) return;
  var s=saved(), n=s.length, solo=n===1&&isComp(s[0]);
  var msg=solo?'تُلعب منفردة بلوحة مخصصة':n===0?'اختر '+MINC+' إلى '+MAXC+' فئات':n<MINC?'أضف '+(MINC-n===1?'فئة واحدة':MINC-n===2?'فئتين':(MINC-n)+' فئات')+' للبدء':n<MAXC?'يمكنك إضافة '+(MAXC-n):'الحد الأقصى';
  var html='<div class="px-cnt">'+(solo?'<span class="px-ring px-solo"><b><svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4h10v5a5 5 0 01-10 0zM8 21h8M12 17v4" stroke="currentColor" stroke-width="2" fill="none"/></svg></b></span><small><strong>مسابقة</strong>'+msg+'</small>'
    :'<span class="px-ring" style="--p:'+Math.round(100*n/MAXC)+'"><b>'+n+'</b></span><small><strong>من '+MAXC+'</strong>'+msg+'</small>')+'</div>';
  html+=n?'<div class="px-chips">'+s.map(function(c){ var col=info(c).color||'#8A1538'; return '<span class="px-ch" style="--c:'+esc(col)+'"><i></i>'+esc(lbl(c))+'<button type="button" data-pxc="'+esc(c)+'" aria-label="إزالة '+esc(lbl(c))+'">'+X+'</button></span>'; }).join('')+'</div><button type="button" class="px-clr" data-pxclr>مسح</button>'
    :'<div class="px-empty">الفئات التي تختارها تظهر هنا</div>';
  if(pk.dataset.h!==html){ pk.dataset.h=html; pk.innerHTML=html; }
  var barEl=document.getElementById('setup-action-bar'); if(barEl) barEl.classList.add('show');
  var scr=document.getElementById('screen-setup'); if(scr) scr.classList.add('has-action-bar');
  var lb=document.getElementById('setup-action-label'), s2=document.getElementById('ms-step-settings');
  var setL=function(){ if(lb&&!(s2&&!s2.hidden)) lb.textContent=solo?'ابدأ المسابقة':'التالي'; }; setL(); setTimeout(setL,0); setTimeout(setL,60);
}
function setSaved(s){
  localStorage.setItem('hh_saved_cats',JSON.stringify(s));
  document.querySelectorAll('#ms-cat-grid .cat-btn').forEach(function(b){ b.classList.toggle('active',s.indexOf(b.dataset.cat)>-1); });
  try{ if(typeof updateCatHint==='function') updateCatHint(); }catch(e){}
  try{ if(typeof setupActionUpdate==='function') setupActionUpdate(); }catch(e){}
  pickBar();
}
document.addEventListener('click',function(e){
  var t=e.target.closest&&e.target.closest('#sv2-picked [data-pxc]');
  if(t){ e.stopPropagation(); var c=t.getAttribute('data-pxc'); setSaved(saved().filter(function(x){ return x!==c; })); return; }
  if(e.target.closest&&e.target.closest('#sv2-picked [data-pxclr]')){ e.stopPropagation(); setSaved([]); }
},true);

/* ── الربط بالمحرك ── */
function wrap(){
  var f=window.msRenderTabContent;
  if(typeof f==='function'&&!f._sx){ var w=function(tab){ var r=f.apply(this,arguments); try{ decorate(tab); }catch(e){ console.warn('setupx',e); } return r; }; w._sx=1; window.msRenderTabContent=w; try{ msRenderTabContent=w; }catch(e){} }
  var b=window.hhSetupV2Bar;
  if(typeof b==='function'&&!b._sx){ var w2=function(){ var r; try{ r=b.apply(this,arguments); }catch(e){} try{ pickBar(); }catch(e){} return r; }; w2._sx=1; window.hhSetupV2Bar=w2; }
}
wrap(); setTimeout(wrap,800); setTimeout(wrap,2500);
window.hhSetupXRefresh=function(){ wrap(); try{ var t=(typeof _msActiveTab!=='undefined')?_msActiveTab:''; var g=document.getElementById('ms-cat-grid'); if(g&&!g.classList.contains('sx-on')) decorate(t); }catch(e){} pickBar(); };

/* ── الأنماط ── */
var S='#screen-setup.sv2 ';
var css=[
S+'.ms-cat-grid.sx-on{display:block !important;}',
S+'.ms-cat-grid.sx-on > .ms-group-header,'+S+'.ms-cat-grid.sx-on > .sx-hh{display:none !important;}',
S+'#sv2-lay:has(.sx-on) .sv2-jh,'+S+'#sv2-lay:has(.sx-on) .sv2-jl{display:none !important;}',
S+'.sx-bar{display:flex;flex-direction:column;gap:12px;margin:0 0 16px;}',
S+'.sx-hd{display:flex;align-items:baseline;gap:10px;} '+S+'.sx-hd b{font-family:Cairo,sans-serif;font-size:20px;font-weight:900;color:#3D0918;} '+S+'.sx-hd small{font-size:13px;font-weight:800;color:#7A6A54;}',
S+'.sx-chips{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px;}',
S+'.sx-chips::-webkit-scrollbar{display:none;}',
S+'.sx-chips button{flex:0 0 auto;height:36px;border:1.5px solid #E7DCC6;background:#fff;border-radius:20px;padding:0 14px;font-family:Cairo,sans-serif;font-weight:800;font-size:13.5px;color:#3D0918;cursor:pointer;display:inline-flex;align-items:center;gap:6px;}',
S+'.sx-chips button em{font-style:normal;font-size:12px;font-weight:900;color:#7A6A54;}',
S+'.sx-chips button.on{border-color:#8A1538;background:#FBF1DA;}',
S+'.sx-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px;}',
S+'.sx-grid.sx-cg{grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;}',
S+'.sx-grid > .cat-btn.sx-off{display:none !important;}',
S+'.ms-cat-grid.ms-searching .sx-grid > .cat-btn.sx-off:not([style*="none"]){display:flex !important;}',
S+'.ms-cat-grid.ms-searching .sx-bar .sx-chips{display:none;}',
S+'.sx-row{margin:0 0 22px;}',
S+'.sx-rh{display:flex;align-items:center;gap:10px;margin:0 0 10px;}',
S+'.sx-rh h3{margin:0;font-family:Cairo,sans-serif;font-size:17px;font-weight:900;color:#3D0918;}',
S+'.sx-rh small{font-size:12.5px;font-weight:700;color:#7A6A54;}',
S+'.sx-more{margin-inline-start:auto;border:0;background:none;color:#8A1538;font-family:Cairo,sans-serif;font-weight:800;font-size:13.5px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;}',
S+'.sx-more em{font-style:normal;font-size:11.5px;background:#FBF1DA;border-radius:20px;padding:0 8px;color:#8A6D2E;}',
S+'.sx-strip{display:grid;grid-auto-flow:column;grid-auto-columns:150px;gap:10px;overflow-x:auto;padding-bottom:6px;scrollbar-width:thin;}',
S+'.ms-cat-grid.ms-searching .sx-strip{grid-auto-flow:row;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));grid-auto-columns:auto;}',
S+'.ms-cat-grid.ms-searching .sx-row:not(:has(.cat-btn:not([style*="none"]))){display:none;}',
/* شريط الاختيار */
S+'.sv2-picked{gap:14px;}',
S+'.px-cnt{display:flex;align-items:center;gap:10px;flex-shrink:0;padding-inline-end:14px;border-inline-end:1px solid #E7DCC6;}',
S+'.px-ring{--p:0;width:46px;height:46px;border-radius:50%;background:conic-gradient(#B8924A calc(var(--p)*1%),#E7DCC6 0);display:grid;place-items:center;flex-shrink:0;}',
S+'.px-ring b{width:36px;height:36px;border-radius:50%;background:#fff;display:grid;place-items:center;font-family:Cairo,sans-serif;font-size:15px;font-weight:900;color:#3D0918;}',
S+'.px-ring.px-solo{background:#B8924A;} '+S+'.px-ring.px-solo svg{width:18px;height:18px;color:#8A6D2E;}',
S+'.px-cnt small{font-size:12.5px;font-weight:800;color:#7A6A54;line-height:1.4;white-space:nowrap;} '+S+'.px-cnt small strong{display:block;font-size:14px;color:#3D0918;}',
S+'.px-chips{flex:1;min-width:0;display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;}',
S+'.px-chips::-webkit-scrollbar{display:none;}',
S+'.px-ch{flex:0 0 auto;display:inline-flex;align-items:center;gap:6px;height:34px;border-radius:10px;background:#FAF6EE;border:1px solid #E7DCC6;padding:0 6px 0 10px;font-family:Cairo,sans-serif;font-weight:800;font-size:13px;color:#3D0918;white-space:nowrap;}',
S+'.px-ch i{width:8px;height:8px;border-radius:50%;background:var(--c);}',
S+'.px-ch button{width:22px;height:22px;border:0;border-radius:6px;background:transparent;color:#7A6A54;display:grid;place-items:center;padding:0;cursor:pointer;}',
S+'.px-ch button:hover{background:#E7DCC6;color:#3D0918;} '+S+'.px-ch button svg{width:12px;height:12px;}',
S+'.px-empty{flex:1;font-family:Cairo,sans-serif;font-weight:700;font-size:13.5px;color:#7A6A54;}',
S+'.px-clr{flex-shrink:0;border:0;background:none;font-family:Cairo,sans-serif;font-weight:800;font-size:13px;color:#7A6A54;padding:0 4px;cursor:pointer;}',
'html body #screen-setup.sv2 #setup-action-btn{background:#5E0E26 !important;background-image:none !important;border-radius:12px !important;box-shadow:none !important;}',
'html body #screen-setup.sv2 #setup-action-btn[disabled]{background:#E7DCC6 !important;color:#7A6A54 !important;cursor:default;opacity:1 !important;filter:none !important;}',
S+'.setup-action-bar{border-radius:16px !important;}',
'#screen-setup.sv2.sv2-step2 .px-chips,#screen-setup.sv2.sv2-step2 .px-clr,#screen-setup.sv2.sv2-step2 .px-empty{display:none;}',
'@media (max-width:700px){',
' '+S+'.sx-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;}',
' '+S+'.sx-strip{grid-auto-columns:136px;}',
' '+S+'.px-cnt{border:0;padding:0;}',
' '+S+'.px-chips{display:flex !important;order:3;flex-basis:100%;}',
' '+S+'.px-clr{display:none;}',
' '+S+'.px-empty{display:none;}',
'}',
'body.dark-mode #screen-setup #ms-step-title{color:#F5E6C4 !important;-webkit-text-fill-color:#F5E6C4 !important;}',
'body.dark-mode '+S+'.sx-chips button{background:#22121A;border-color:#3E2C24;color:#F5E6C4;}',
'body.dark-mode '+S+'.sx-chips button.on{background:#3A2A10;border-color:#C9A35A;}',
'body.dark-mode '+S+'.sx-hd b,body.dark-mode '+S+'.sx-rh h3{color:#F5E6C4;}',
'body.dark-mode '+S+'.sx-more{color:#E6CE8E;} body.dark-mode '+S+'.sx-more em{background:#3A2A10;color:#E6CE8E;}',
'body.dark-mode '+S+'.px-ring b{background:#22121A;color:#F5E6C4;} body.dark-mode '+S+'.px-cnt small strong{color:#F5E6C4;}',
'body.dark-mode '+S+'.px-ch{background:#2A1720;border-color:#3E2C24;color:#F5E6C4;}',
'html body.dark-mode #screen-setup.sv2 #setup-action-btn[disabled]{background:#3E2C24 !important;color:#B8A68A !important;}'
].join('\n');
var stl=document.createElement('style'); stl.id='hh-setupx-style'; stl.textContent=css; document.head.appendChild(stl);
})();
