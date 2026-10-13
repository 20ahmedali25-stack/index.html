/* ============================================================
   المُلهم التعليمي، صفحة الرعاة والشركاء (zzzzzzci)
   تصميم مختصر: شعار كبير، اسم، عدد الفئات، زر لعب، ومستويات بسطر واحد.
   تقرأ من إعدادات لوحة التحكم نفسها (_hh_getSponsorsConfig).
   ============================================================ */
(function(){
'use strict';
if(window._hhSpxInit) return; window._hhSpxInit=true;

var CSS=[
'#sp-page.spx{--sx-bg:transparent;--sx-surface:#fff;--sx-soft:#FAF6EE;--sx-line:#E7DCC6;--sx-ink:#3D0918;--sx-muted:#7A6A54;--sx-maroon:#5E0E26;--sx-gold:#B8924A;--sx-goldBg:#FBF1DA;',
'  max-width:1080px;margin:0 auto !important;padding:28px 16px 48px;display:flex;flex-direction:column;gap:36px;font-family:Cairo,Tahoma,sans-serif;color:var(--sx-ink);direction:rtl;width:100%;box-sizing:border-box;}',
'body.dark-mode #sp-page.spx{--sx-surface:#22121A;--sx-soft:#2A1720;--sx-line:#3E2C24;--sx-ink:#F5E6C4;--sx-muted:#B8A68A;--sx-gold:#C9A35A;--sx-goldBg:#3A2A10;}',
'#sp-page.spx *{box-sizing:border-box;}',
'#sp-page.spx h2{margin:0 0 14px;font-size:18px;font-weight:900;color:var(--sx-ink);}',
'#sp-page.spx .sx-ps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;}',
'#sp-page.spx .sx-p{position:relative;background:var(--sx-surface);border:1px solid var(--sx-line);border-radius:16px;padding:22px 18px 18px;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center;}',
'#sp-page.spx .sx-p.hid{opacity:.55;border-style:dashed;}',
'#sp-page.spx .sx-lg{width:120px;height:120px;border-radius:16px;background:#fff;border:1px solid var(--sx-line);display:grid;place-items:center;padding:12px;font-size:44px;font-weight:900;color:#fff;}',
'#sp-page.spx .sx-lg img{max-width:100%;max-height:100%;object-fit:contain;}',
'#sp-page.spx .sx-p h3{margin:0;font-size:17px;font-weight:900;line-height:1.35;color:var(--sx-ink);}',
'#sp-page.spx .sx-n{font-size:13px;font-weight:800;color:var(--sx-muted);}',
'#sp-page.spx .sx-row{display:flex;gap:8px;width:100%;margin-top:auto;}',
'#sp-page.spx .sx-play{flex:1;height:42px;border:0;border-radius:11px;background:var(--sx-maroon);color:#fff;font-family:inherit;font-weight:800;font-size:14px;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;}',
'#sp-page.spx .sx-play svg{width:14px;height:14px;}',
'#sp-page.spx .sx-ic{width:42px;height:42px;border-radius:11px;border:1px solid var(--sx-line);display:grid;place-items:center;color:var(--sx-ink);background:var(--sx-surface);flex-shrink:0;}',
'#sp-page.spx .sx-ic svg{width:18px;height:18px;}',
'#sp-page.spx .sx-adm{position:absolute;top:8px;left:8px;border:1px solid var(--sx-line);background:var(--sx-surface);color:var(--sx-muted);font-family:inherit;font-size:11.5px;font-weight:800;border-radius:8px;padding:2px 8px;cursor:pointer;}',
'#sp-page.spx .sx-ts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;}',
'#sp-page.spx .sx-t{background:var(--sx-surface);border:1px solid var(--sx-line);border-radius:16px;padding:18px;}',
'#sp-page.spx .sx-t.m{border:2px solid var(--sx-gold);background:var(--sx-goldBg);}',
'#sp-page.spx .sx-t b{display:flex;align-items:center;gap:8px;font-size:17px;font-weight:900;color:var(--sx-ink);}',
'#sp-page.spx .sx-t b i{width:10px;height:10px;border-radius:3px;background:var(--c);flex-shrink:0;}',
'#sp-page.spx .sx-t p{margin:6px 0 0;font-size:14px;font-weight:700;color:var(--sx-muted);line-height:1.6;}',
'#sp-page.spx .sx-t em{font-style:normal;font-size:11.5px;font-weight:900;color:#fff;background:var(--sx-gold);padding:1px 9px;border-radius:20px;margin-inline-start:auto;}',
'#sp-page.spx .sx-cta{display:flex;align-items:center;gap:16px;flex-wrap:wrap;background:#5E0E26;color:#fff;border-radius:16px;padding:20px 22px;}',
'#sp-page.spx .sx-cta b{font-size:19px;font-weight:900;flex:1;min-width:200px;}',
'#sp-page.spx .sx-num{direction:ltr;font-weight:800;font-size:15px;color:#E6CE8E;user-select:all;}',
'#sp-page.spx .sx-cta a{height:46px;padding:0 22px;border-radius:12px;background:#fff;color:#5E0E26;font-weight:900;font-size:15px;text-decoration:none;display:inline-flex;align-items:center;}',
'#sp-page.spx .sx-empty{padding:30px;text-align:center;color:var(--sx-muted);font-weight:700;}',
'@media (max-width:860px){',
'  #sp-page.spx{gap:28px;padding-top:22px;}',
'  #sp-page.spx .sx-ps,#sp-page.spx .sx-ts{gap:8px;}',
'  #sp-page.spx .sx-p{padding:12px 8px;gap:8px;border-radius:14px;}',
'  #sp-page.spx .sx-lg{width:100%;height:auto;aspect-ratio:1;max-width:96px;padding:8px;font-size:30px;}',
'  #sp-page.spx .sx-p h3{font-size:12.5px;}',
'  #sp-page.spx .sx-n{font-size:11px;}',
'  #sp-page.spx .sx-row{flex-wrap:wrap;gap:6px;justify-content:center;}',
'  #sp-page.spx .sx-play{flex:1 1 100%;height:36px;font-size:12.5px;border-radius:9px;}',
'  #sp-page.spx .sx-ic{width:34px;height:34px;border-radius:9px;}',
'  #sp-page.spx .sx-t{padding:10px;border-radius:12px;}',
'  #sp-page.spx .sx-t b{font-size:13px;flex-wrap:wrap;gap:5px;}',
'  #sp-page.spx .sx-t em{margin-inline-start:0;font-size:10px;}',
'  #sp-page.spx .sx-t p{font-size:11.5px;line-height:1.5;}',
'  #sp-page.spx .sx-cta a{width:100%;justify-content:center;}',
'}'
].join('\n');
function css(){ if(document.getElementById('hh-spx-css')) return; var s=document.createElement('style'); s.id='hh-spx-css'; s.textContent=CSS; document.head.appendChild(s); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
var PLAY='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 001.5.9l10-6.5a1 1 0 000-1.7l-10-6.5A1 1 0 008 5.5z"/></svg>';
var WEB='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></svg>';
var IG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>';
/* سطر واحد لكل مستوى، ويمكن للأدمن كتابته في الحقل short */
var SHORT={platinum:'فئة كاملة باسم جهتك وحضور دائم في الواجهة',gold:'رعاية نشاط أو مسابقة بالاتفاق',friend:'دعم بمحتوى أو خبرة أو وقت'};
var TC={platinum:'#B8924A',gold:'#8A1538',green:'#2F6A4E'};

/* ربط الشريك بمجموعة فئاته في المنصة بالاسم */
function groupOf(name){
  try{ if(typeof CAT_GROUPS==='undefined') return null; }catch(e){ return null; }
  var n=String(name||'').trim(), best=null;
  CAT_GROUPS.forEach(function(g){ var lb=String(g.label||'').split(' · ')[0].trim(); if(!lb||!g.cats||!g.cats.length) return; if(/شريك/.test(g.label||'')&&(n.indexOf(lb)===0||lb.indexOf(n)===0)){ if(!best||lb.length>String(best.label).split(' · ')[0].length) best=g; } });
  return best;
}
function catCount(pr){ var g=groupOf(pr.name); if(g) return g.cats.length; var m=String(pr.desc||'').match(/(\d+)\s*فئ/); return m?+m[1]:0; }
function waNum(link){ var m=String(link||'').match(/wa\.me\/(\d+)/); if(!m) return ''; var d=m[1]; return d.length===11&&d.indexOf('974')===0?'+974 '+d.slice(3,7)+' '+d.slice(7):'+'+d; }

window.hhSpPlay=function(name){
  var g=groupOf(name), lb=g?String(g.label).split(' · ')[0].trim():'';
  try{ if(typeof hhNavigate==='function') hhNavigate('screen-setup'); else showScreen('screen-setup'); }catch(e){}
  setTimeout(function(){
    try{ if(typeof msSwitchTab==='function') msSwitchTab('partners'); }catch(e){}
    setTimeout(function(){
      if(!lb) return;
      var hs=document.querySelectorAll('#screen-setup .ms-group-header'), t=null;
      for(var i=0;i<hs.length;i++){ if(hs[i].textContent.indexOf(lb)>-1){ t=hs[i]; break; } }
      if(t&&t.scrollIntoView) t.scrollIntoView({block:'start',behavior:'smooth'});
    },250);
  },300);
};
window.renderSponsorsPage=function(){
  var root=document.getElementById('sp-page'); if(!root) return;
  css(); root.classList.add('spx');
  var cfg; try{ cfg=_hh_getSponsorsConfig(); }catch(e){ cfg=null; }
  var tiers=(cfg&&cfg.tiers||[]).filter(function(t){ return t.visible!==false; });
  var adm=false; try{ adm=(typeof isAdminUser==='function')&&isAdminUser(currentUser); }catch(e){}
  var P=[];
  tiers.forEach(function(t){ var ti=cfg.tiers.indexOf(t); (t.partners||[]).forEach(function(pr,pi){ if(pr.hidden&&!adm) return; P.push({pr:pr,ti:ti,pi:pi}); }); });
  var h='';
  if(P.length){
    h+='<section><h2>شركاؤنا</h2><div class="sx-ps">'+P.map(function(x){
      var pr=x.pr, n=catCount(pr), pc=pr.color||'#8A1538';
      var lg=pr.logo?'<img src="'+esc(pr.logo)+'" alt="شعار '+esc(pr.name)+'">':esc(String(pr.name||'؟').trim().charAt(0));
      var links='';
      if(pr.website){ var w=/^https?:\/\//i.test(pr.website)?pr.website:'https://'+pr.website; links+='<a class="sx-ic" href="'+esc(w)+'" target="_blank" rel="noopener" aria-label="موقع '+esc(pr.name)+'">'+WEB+'</a>'; }
      if(pr.instagram){ var ig=/^https?:\/\//i.test(pr.instagram)?pr.instagram:'https://instagram.com/'+String(pr.instagram).replace(/^@/,''); links+='<a class="sx-ic" href="'+esc(ig)+'" target="_blank" rel="noopener" aria-label="إنستغرام '+esc(pr.name)+'">'+IG+'</a>'; }
      var play=groupOf(pr.name)?'<button class="sx-play" type="button" data-sp="'+esc(pr.name)+'">'+PLAY+'العب فئاته</button>':'';
      var ctl=adm?'<button class="sx-adm" type="button" onclick="hhTogglePartnerFromPage('+x.ti+','+x.pi+')">'+(pr.hidden?'إظهار':'إخفاء')+'</button>':'';
      return '<article class="sx-p'+(pr.hidden?' hid':'')+'">'+ctl+'<span class="sx-lg"'+(pr.logo?'':' style="background:'+esc(pc)+'"')+'>'+lg+'</span><h3>'+esc(pr.name)+'</h3>'+(n?'<span class="sx-n">'+n+' فئات على المنصة</span>':'')+'<div class="sx-row">'+play+links+'</div></article>';
    }).join('')+'</div></section>';
  }
  if(tiers.length){
    h+='<section><h2>كن شريكاً</h2><div class="sx-ts">'+tiers.map(function(t){
      var m=t.id==='platinum'||t.color==='platinum';
      var line=t.short||SHORT[t.id]||t.tagline||'';
      return '<div class="sx-t'+(m?' m':'')+'" style="--c:'+(TC[t.color]||'#8A1538')+'"><b><i></i>'+esc(t.name)+(m?'<em>مقعد واحد</em>':'')+'</b><p>'+esc(line)+'</p></div>';
    }).join('')+'</div></section>';
    var link=''; tiers.some(function(t){ if(t.ctaLink){ link=t.ctaLink; return true; } });
    if(link){ var num=waNum(link); h+='<section class="sx-cta"><b>جهتك تصنع الأثر معنا؟</b>'+(num?'<span class="sx-num">'+num+'</span>':'')+'<a href="'+esc(link)+'" target="_blank" rel="noopener">تواصل معنا</a></section>'; }
  }
  if(!h) h='<div class="sx-empty">لا يوجد شركاء معروضون حالياً.</div>';
  root.innerHTML=h.replace(/ · /g,'، ');
  root.querySelectorAll('[data-sp]').forEach(function(b){ b.onclick=function(){ hhSpPlay(b.getAttribute('data-sp')); }; });
};
/* إن كانت الصفحة مفتوحة الآن أعد بناءها بالتصميم الجديد */
try{ var sc=document.getElementById('screen-sponsors'); if(sc&&sc.classList.contains('active')) window.renderSponsorsPage(); }catch(e){}
})();
