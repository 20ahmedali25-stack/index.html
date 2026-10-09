/* ============================================================
   المُلهم التعليمي — إبداع · العرض على شاشة الصف (بلا أجهزة)
   almulhimedu.org · (zzzzzzbr)
   ------------------------------------------------------------
   خمسة قوالب: صناديق الأسرار · المسابقة الكبرى · عجلة الأسئلة
               البطاقات المقلوبة · صح أم خطأ
   فرق ونقاط · اختيار طالب من قائمة الشعبة دون تكرار · مؤقت
   اختصارات: مسافة التالي · A الإجابة · S طالب · T الفريق التالي · F ملء الشاشة · Esc إغلاق
   ============================================================ */
(function(){
'use strict';
var OC=['#8A1538','#3D6B53','#8A6D2E','#1F4E79']; var OS=['◆','●','▲','■'];
var TC=['#8A1538','#1F4E79','#3D6B53','#8A6D2E'];
var TPL={ boxes:{name:'صناديق الأسرار',types:['mcq','tf','open'],ico:'box',seq:false}, show:{name:'المسابقة الكبرى',types:['mcq','tf'],ico:'tv',seq:true}, wheel:{name:'عجلة الأسئلة',types:['mcq','tf','open'],ico:'wheel',seq:false}, flip:{name:'البطاقات المقلوبة',types:['mcq','tf','open'],ico:'flip',seq:false}, tfs:{name:'صح أم خطأ',types:['tf'],ico:'check',seq:true} };
TPL.match={name:'التوصيل',types:['pair'],ico:'link',seq:true}; TPL.memory={name:'بطاقات الذاكرة',types:['pair'],ico:'grid',seq:true}; TPL.order={name:'رتّب الأحداث',types:['order'],ico:'sort',seq:true};
function pairsOf(q){ return (q.pairs||[]).filter(function(p){ return p&&String(p.a||'').trim()&&String(p.b||'').trim(); }); }
function itemsOf(q){ return (q.opts||[]).map(function(o){ return String(o||'').trim(); }).filter(Boolean); }
function shuf(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function shufNot(a){ if(a.length<2) return a.slice(); for(var t=0;t<8;t++){ var b=shuf(a); if(b.some(function(x,i){ return x!==a[i]; })) return b; } return a.slice().reverse(); }
var S=null;
var EXP='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function ico(n,s,w){ return (typeof window._hhIbIco==='function')?window._hhIbIco(n,s,w):''; }
function toastX(m,k){ if(typeof toast==='function') toast(m,k||'info'); }
function uid(){ try{ return (firebase.auth().currentUser||{}).uid||''; }catch(e){ return ''; } }
function db(){ return firebase.firestore(); }
function plural(n,one,few,many){ return n+' '+(n===1?one:(n>2&&n<11)?few:many); }

function style(){
  if(document.getElementById('hh-scr-style')) return;
  var st=document.createElement('style'); st.id='hh-scr-style';
  st.textContent=[
  '#hh-scr{position:fixed;inset:0;z-index:100050;background:#F5F4F2;direction:rtl;font-family:Cairo,Tajawal,sans-serif;display:flex;flex-direction:column;color:#2A1A0E;overflow:hidden;}',
  '#hh-scr *{box-sizing:border-box;}',
  '#hh-scr button{font-family:Cairo,sans-serif;cursor:pointer;}',
  '#hh-scr .sh{min-height:clamp(64px,8.8vh,96px);background:linear-gradient(175deg,#4A0B1E,#5E0E26);border-bottom:3px solid #B8924A;display:flex;align-items:center;gap:clamp(10px,1.2vw,22px);padding:6px clamp(14px,1.9vw,36px);color:#fff;flex-shrink:0;}',
  '#hh-scr .ti{display:flex;flex-direction:column;min-width:0;} #hh-scr .ti small{font-weight:700;font-size:clamp(12px,.9vw,17px);color:#E9D7AE;} #hh-scr .ti b{font-weight:800;font-size:clamp(17px,1.55vw,30px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:34vw;}',
  '#hh-scr .cnt{font-weight:800;font-size:clamp(13px,1.15vw,22px);background:rgba(255,255,255,.12);border:1.5px solid rgba(233,215,174,.4);border-radius:99px;padding:3px 16px;white-space:nowrap;}',
  '#hh-scr .teams{display:flex;gap:10px;margin-inline-start:auto;flex-wrap:wrap;justify-content:flex-end;}',
  '#hh-scr .tm{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.1);border:2px solid rgba(255,255,255,.18);border-radius:16px;padding:5px 8px 5px 14px;}',
  '#hh-scr .tm.on{background:#fff;color:#3D0918;border-color:#fff;}',
  '#hh-scr .tm i{width:14px;height:14px;border-radius:50%;background:var(--a);flex-shrink:0;}',
  '#hh-scr .tm span{font-weight:700;font-size:clamp(13px,1vw,19px);white-space:nowrap;} #hh-scr .tm b{font-weight:800;font-size:clamp(19px,1.55vw,30px);min-width:48px;text-align:center;}',
  '#hh-scr .tm .pm{display:flex;flex-direction:column;gap:3px;} #hh-scr .tm .pm button{width:26px;height:21px;border-radius:6px;background:rgba(0,0,0,.1);border:0;color:inherit;display:flex;align-items:center;justify-content:center;padding:0;}',
  '#hh-scr .clock{width:clamp(56px,4.4vw,84px);height:clamp(56px,4.4vw,84px);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:conic-gradient(#fff var(--p,100%),rgba(255,255,255,.18) 0);}',
  '#hh-scr .clock b{width:82%;height:82%;border-radius:50%;background:#5E0E26;display:flex;align-items:center;justify-content:center;font-size:clamp(18px,1.55vw,30px);font-weight:800;}',
  '#hh-scr .clock.end{background:#E35D4F;} #hh-scr .clock.off{opacity:.35;}',
  '#hh-scr .sx-body{flex:1;min-height:0;padding:clamp(14px,2.2vh,34px) clamp(14px,2.5vw,48px);display:flex;flex-direction:column;gap:18px;position:relative;}',
  '#hh-scr .ctl{min-height:clamp(62px,8.5vh,92px);background:#fff;border-top:1.5px solid #E7DAC0;display:flex;align-items:center;gap:10px;padding:8px clamp(12px,1.9vw,36px);flex-shrink:0;flex-wrap:wrap;}',
  '#hh-scr .cb{display:inline-flex;align-items:center;gap:8px;height:clamp(44px,5.4vh,60px);padding:0 clamp(12px,1.2vw,24px);border-radius:14px;border:1.5px solid #E7DAC0;background:#fff;color:#5E0E26;font-weight:800;font-size:clamp(14px,1.05vw,20px);}',
  '#hh-scr .cb.p{background:linear-gradient(135deg,#8A1538,#5E0E26);color:#fff;border-color:transparent;} #hh-scr .cb.g{background:#EEF4F0;color:#2F6A4E;border-color:#CFE3D7;} #hh-scr .cb.r{color:#B3261E;}',
  '#hh-scr .cb:disabled{opacity:.4;cursor:default;}',
  '#hh-scr .kh{margin-inline-start:auto;font-family:Tajawal;font-size:clamp(12px,.85vw,16px);color:#7A6A54;white-space:nowrap;}',
  '#hh-scr .kh kbd{font-family:Cairo;font-weight:800;background:#F5F3F0;border:1.5px solid #E7DAC0;border-radius:6px;padding:0 7px;margin:0 3px;color:#3D0918;}',
  '@media (max-width:1100px){ #hh-scr .kh{display:none;} }',
  /* الصناديق */
  '#hh-scr .boxes{display:grid;gap:clamp(10px,1.2vw,22px);flex:1;min-height:0;grid-template-columns:repeat(var(--c,6),minmax(0,1fr));grid-auto-rows:minmax(0,1fr);}',
  '#hh-scr .bx{border-radius:clamp(14px,1.2vw,22px);background:linear-gradient(160deg,#8A1538,#5E0E26);border:3px solid #B8924A;display:flex;align-items:center;justify-content:center;color:#fff;font-size:clamp(30px,3.4vw,64px);font-weight:800;position:relative;box-shadow:0 10px 24px rgba(61,9,24,.18);transition:transform .15s;min-height:0;}',
  '#hh-scr .bx:hover{transform:translateY(-3px);} #hh-scr .bx:after{content:"";position:absolute;inset:8px;border:1.5px solid rgba(233,215,174,.3);border-radius:inherit;pointer-events:none;}',
  '#hh-scr .bx.done{background:#ECE8E3;border-color:#ECE8E3;color:#B8AE9A;box-shadow:none;cursor:default;} #hh-scr .bx.done:after{display:none;}',
  '#hh-scr .bx.done small{position:absolute;bottom:10%;font-size:clamp(12px,.9vw,17px);font-weight:700;color:#7A6A54;}',
  '#hh-scr .bx small.x{color:#B3261E;}',
  /* البطاقة المفتوحة */
  '#hh-scr .ov{position:absolute;inset:0;background:rgba(30,6,15,.55);display:flex;align-items:center;justify-content:center;padding:2vh 2vw;z-index:5;}',
  '#hh-scr .sx-card{width:min(1240px,96%);max-width:none;max-height:100%;overflow:auto;background:#fff;border-radius:28px;padding:clamp(18px,2.4vh,36px) clamp(18px,2.2vw,40px);box-shadow:0 30px 80px rgba(0,0,0,.35);border-top:8px solid #B8924A;}',
  '#hh-scr .k2{display:flex;align-items:center;gap:12px;font-weight:800;font-size:clamp(14px,1.05vw,20px);color:#7A6A54;margin-bottom:10px;flex-wrap:wrap;}',
  '#hh-scr .k2 .nb{min-width:48px;height:48px;padding:0 8px;border-radius:14px;background:#5E0E26;color:#fff;font-size:24px;display:flex;align-items:center;justify-content:center;}',
  '#hh-scr .k2 .pt{margin-inline-start:auto;background:#F6E9EE;color:#8A1538;border-radius:99px;padding:4px 16px;}',
  '#hh-scr .k2 .tg{background:#F6E9EE;color:#8A1538;border-radius:99px;padding:4px 14px;font-size:.85em;}',
  '#hh-scr h2.q{margin:0 0 22px;font-size:clamp(24px,2.45vw,48px);color:#2A1A0E;font-weight:800;line-height:1.4;}',
  '#hh-scr .qimg{display:block;max-width:100%;max-height:34vh;margin:-6px auto 18px;border-radius:14px;border:1px solid #ECE8E3;}',
  '#hh-scr .a4{display:grid;grid-template-columns:1fr 1fr;gap:clamp(10px,1vw,16px);}',
  '#hh-scr .a4 .an{min-height:clamp(64px,8.6vh,96px);border-radius:18px;background:var(--a);color:#fff;display:flex;align-items:center;gap:14px;padding:8px 20px;font-size:clamp(18px,1.6vw,30px);font-weight:800;line-height:1.35;transition:opacity .2s;}',
  '#hh-scr .a4 .an i{width:clamp(38px,2.8vw,54px);height:clamp(38px,2.8vw,54px);border-radius:14px;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-style:normal;font-size:.8em;flex-shrink:0;}',
  '#hh-scr .a4 .an.ok{box-shadow:0 0 0 5px #fff,0 0 0 9px #2F6A4E;} #hh-scr .a4 .an.no{opacity:.32;} #hh-scr .a4 .an.gone{visibility:hidden;}',
  '#hh-scr .a4 .an .ck{margin-inline-start:auto;width:46px;height:46px;border-radius:50%;background:#fff;color:#2F6A4E;display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
  '#hh-scr .aw{margin-top:20px;display:flex;align-items:center;gap:12px;font-size:clamp(15px,1.15vw,22px);font-weight:700;color:#3D0918;flex-wrap:wrap;}',
  '#hh-scr .aw .cb{height:52px;font-size:clamp(14px,.95vw,18px);}',
  '#hh-scr .sx-note{margin-top:14px;background:#F5F3F0;border-radius:14px;padding:12px 16px;font-size:clamp(15px,1.1vw,21px);color:#3D0918;font-weight:700;}',
  /* المقالي */
  '#hh-scr .pts{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px;}',
  '#hh-scr .pts li{display:flex;align-items:center;gap:14px;font-size:clamp(18px,1.65vw,32px);font-weight:800;color:#2A1A0E;background:#F5F3F0;border-radius:16px;padding:10px 18px;cursor:pointer;}',
  '#hh-scr .pts li i{width:clamp(36px,2.4vw,46px);height:clamp(36px,2.4vw,46px);border-radius:12px;background:#2F6A4E;color:#fff;font-style:normal;display:flex;align-items:center;justify-content:center;font-size:.75em;flex-shrink:0;}',
  '#hh-scr .pts li.h{background:#fff;border:2px dashed #D9D2C7;color:#B8AE9A;} #hh-scr .pts li.h i{background:#D9D2C7;}',
  '#hh-scr .fl2{display:grid;grid-template-columns:1fr 1fr;border-radius:24px;overflow:hidden;}',
  '#hh-scr .fl2 .fr{background:linear-gradient(160deg,#8A1538,#5E0E26);color:#fff;padding:clamp(18px,2.4vw,40px);display:flex;flex-direction:column;justify-content:center;gap:14px;}',
  '#hh-scr .fl2 .fr small{font-size:clamp(14px,1.05vw,20px);color:#E9D7AE;font-weight:700;} #hh-scr .fl2 .fr b{font-size:clamp(24px,2.3vw,44px);line-height:1.35;} #hh-scr .fl2 .fr img{max-width:100%;max-height:30vh;border-radius:12px;background:#fff;}',
  '#hh-scr .fl2 .bk{padding:clamp(16px,2vw,36px);display:flex;flex-direction:column;gap:12px;}',
  '#hh-scr .fl2 .bk .lb{font-size:clamp(15px,1.05vw,20px);color:#2F6A4E;font-weight:800;display:flex;align-items:center;gap:8px;}',
  '@media (max-width:900px){ #hh-scr .fl2{grid-template-columns:1fr;} #hh-scr .a4{grid-template-columns:1fr;} }',
  /* البطاقات المقلوبة */
  '#hh-scr .sx-fg{display:grid;gap:clamp(12px,1.2vw,22px);flex:1;min-height:0;grid-template-columns:repeat(var(--c,3),minmax(0,1fr));grid-auto-rows:minmax(0,1fr);}',
  '#hh-scr .fc{border-radius:22px;background:linear-gradient(160deg,#8A1538,#5E0E26);border:3px solid #B8924A;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:14px;text-align:center;position:relative;min-height:0;overflow:hidden;}',
  '#hh-scr .fc:after{content:"";position:absolute;inset:8px;border:1.5px solid rgba(233,215,174,.3);border-radius:15px;pointer-events:none;}',
  '#hh-scr .fc .nb{font-size:clamp(14px,1.1vw,22px);font-weight:800;color:#E9D7AE;} #hh-scr .fc b{font-size:clamp(16px,1.5vw,30px);font-weight:800;line-height:1.4;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}',
  '#hh-scr .fc.done{background:#ECE8E3;border-color:#ECE8E3;color:#7A6A54;} #hh-scr .fc.done .nb{color:#7A6A54;} #hh-scr .fc.done:after{display:none;}',
  /* العجلة */
  '#hh-scr .wh{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;gap:4vw;}',
  '#hh-scr .whw{position:relative;height:min(100%,72vh);aspect-ratio:1;}',
  '#hh-scr .whw svg{width:100%;height:100%;transition:transform 4.2s cubic-bezier(.17,.67,.12,1);}',
  '#hh-scr .whw .pin{position:absolute;top:-6px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:22px solid transparent;border-right:22px solid transparent;border-top:42px solid #3D0918;filter:drop-shadow(0 4px 6px rgba(0,0,0,.25));z-index:2;}',
  '#hh-scr .whs{display:flex;flex-direction:column;gap:14px;align-items:flex-start;max-width:380px;}',
  '#hh-scr .whs b{font-size:clamp(20px,1.9vw,36px);color:#3D0918;} #hh-scr .whs p{margin:0;font-size:clamp(14px,1.1vw,20px);color:#7A6A54;line-height:1.7;font-family:Tajawal;}',
  /* المسابقة الكبرى */
  '#hh-scr .gs{display:grid;grid-template-columns:minmax(0,1fr) clamp(240px,19vw,360px);gap:24px;flex:1;min-height:0;}',
  '#hh-scr .qbig{background:#fff;border-radius:28px;border:1.5px solid #E7DAC0;padding:clamp(18px,2.4vh,34px) clamp(18px,2vw,40px);display:flex;flex-direction:column;justify-content:center;min-height:0;overflow:auto;}',
  '#hh-scr .prog{display:flex;gap:6px;margin-bottom:auto;} #hh-scr .prog i{flex:1;height:10px;border-radius:9px;background:#ECE8E3;} #hh-scr .prog i.d{background:#2F6A4E;} #hh-scr .prog i.c{background:#8A1538;} #hh-scr .prog i.x{background:#B3261E;}',
  '#hh-scr .lad{background:#fff;border-radius:28px;border:1.5px solid #E7DAC0;padding:18px;display:flex;flex-direction:column;gap:8px;min-height:0;overflow:auto;}',
  '#hh-scr .lad h4{margin:0 0 6px;font-size:clamp(15px,1.05vw,20px);color:#3D0918;display:flex;align-items:center;gap:8px;}',
  '#hh-scr .lf{display:flex;align-items:center;gap:12px;min-height:58px;border-radius:14px;border:1.5px solid #E7DAC0;padding:0 14px;font-weight:800;font-size:clamp(14px,1vw,19px);color:#3D0918;background:#fff;text-align:right;}',
  '#hh-scr .lf i{width:40px;height:40px;border-radius:10px;background:#F5F3F0;color:#8A6D2E;display:flex;align-items:center;justify-content:center;font-style:normal;flex-shrink:0;}',
  '#hh-scr .lf:disabled{opacity:.4;text-decoration:line-through;cursor:default;}',
  '#hh-scr .turn{margin-top:auto;background:#F5F3F0;border-radius:16px;padding:14px;font-size:clamp(14px,1vw,18px);color:#7A6A54;font-weight:700;}',
  '#hh-scr .turn b{display:flex;align-items:center;gap:10px;font-size:clamp(19px,1.4vw,26px);color:#3D0918;margin-top:4px;} #hh-scr .turn b i{width:16px;height:16px;border-radius:50%;background:var(--a);}',
  '@media (max-width:900px){ #hh-scr .gs{grid-template-columns:1fr;} #hh-scr .lad{display:none;} }',
  /* صح أم خطأ */
  '#hh-scr .tfw{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:3vh;max-width:1400px;width:100%;margin:0 auto;}',
  '#hh-scr .tfs{background:#fff;border:1.5px solid #E7DAC0;border-radius:28px;padding:clamp(22px,4vh,56px) clamp(20px,3vw,56px);font-size:clamp(26px,2.7vw,54px);font-weight:800;line-height:1.45;text-align:center;color:#2A1A0E;}',
  '#hh-scr .tfb{display:grid;grid-template-columns:1fr 1fr;gap:2vw;}',
  '#hh-scr .tfb div{height:clamp(80px,13vh,150px);border-radius:24px;display:flex;align-items:center;justify-content:center;gap:16px;font-size:clamp(28px,2.8vw,56px);font-weight:800;color:#fff;transition:opacity .2s,box-shadow .2s;}',
  '#hh-scr .tfb .t{background:#3D6B53;} #hh-scr .tfb .f{background:#B3261E;} #hh-scr .tfb .no{opacity:.28;} #hh-scr .tfb .ok{box-shadow:0 0 0 6px #fff,0 0 0 11px #2F6A4E;}',
  /* اختيار الطالب */
  '#hh-scr .pick{position:absolute;left:clamp(14px,2.5vw,48px);bottom:clamp(14px,2vh,30px);width:min(440px,92vw);background:#fff;border-radius:24px;padding:20px 22px;box-shadow:0 24px 60px rgba(61,9,24,.28);border:2px solid #B8924A;z-index:8;}',
  '#hh-scr .pick .k{font-weight:800;font-size:16px;color:#7A6A54;display:flex;align-items:center;gap:8px;} #hh-scr .pick .k button{margin-inline-start:auto;border:0;background:#F5F3F0;border-radius:9px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;color:#5E0E26;}',
  '#hh-scr .pick b{display:block;font-size:clamp(28px,2.4vw,46px);color:#3D0918;margin:6px 0 4px;line-height:1.3;} #hh-scr .pick small{font-family:Tajawal;font-size:16px;color:#7A6A54;}',
  '#hh-scr .pick .rw{display:flex;gap:8px;margin-top:14px;} #hh-scr .pick .rw button{flex:1;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;gap:6px;font-weight:800;font-size:16px;border:1.5px solid #E7DAC0;color:#5E0E26;background:#fff;}',
  '#hh-scr .pick .rw button.g{background:#2F6A4E;color:#fff;border-color:#2F6A4E;}',
  '#hh-scr .pick.spin b{animation:hhScrBlink .12s linear infinite;} @keyframes hhScrBlink{50%{opacity:.55;}}',
  /* الإعداد والنهاية */
  '#hh-scr .setup{flex:1;overflow:auto;display:flex;align-items:flex-start;justify-content:center;padding:3vh 2vw;}',
  '#hh-scr .sx-sp{width:min(1000px,100%);background:#fff;border:1.5px solid #E7DAC0;border-radius:26px;padding:clamp(18px,2.6vh,34px) clamp(16px,2.4vw,40px);}',
  '#hh-scr .sx-sp h1{margin:0;font-size:clamp(24px,2vw,36px);color:#3D0918;} #hh-scr .sx-sp .sub{font-family:Tajawal;color:#7A6A54;font-size:17px;margin:4px 0 18px;}',
  '#hh-scr .sx-sp h3{margin:18px 0 10px;font-size:18px;color:#3D0918;display:flex;align-items:center;gap:10px;} #hh-scr .sx-sp h3:before{content:"";width:11px;height:11px;background:#B8924A;transform:rotate(45deg);border-radius:2px;}',
  '#hh-scr .tp5{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;} @media (max-width:900px){ #hh-scr .tp5{grid-template-columns:repeat(2,minmax(0,1fr));} }',
  '#hh-scr .tp5 button{display:flex;flex-direction:column;gap:6px;align-items:flex-start;text-align:right;border:1.5px solid #E7DAC0;border-radius:16px;padding:12px;background:#fff;}',
  '#hh-scr .tp5 button.on{border-color:#5E0E26;background:#FBF4F6;box-shadow:0 0 0 3px rgba(94,14,38,.12);}',
  '#hh-scr .tp5 button:disabled{opacity:.45;cursor:default;}',
  '#hh-scr .tp5 span.i{width:40px;height:40px;border-radius:11px;background:#5E0E26;color:#fff;display:flex;align-items:center;justify-content:center;} #hh-scr .tp5 b{font-size:15px;color:#3D0918;} #hh-scr .tp5 small{font-size:12px;color:#7A6A54;font-weight:700;}',
  '#hh-scr .chs{display:flex;gap:8px;flex-wrap:wrap;} #hh-scr .chs button{height:44px;padding:0 16px;border-radius:12px;border:1.5px solid #E7DAC0;background:#fff;font-weight:800;font-size:15px;color:#3D2A16;} #hh-scr .chs button.on{background:#5E0E26;color:#fff;border-color:#5E0E26;}',
  '#hh-scr .tn{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;margin-top:10px;} #hh-scr .tn label{display:flex;align-items:center;gap:8px;border:1.5px solid #E7DAC0;border-radius:12px;padding:0 10px;height:46px;} #hh-scr .tn label i{width:14px;height:14px;border-radius:50%;flex-shrink:0;} #hh-scr .tn input{border:0;outline:none;flex:1;font-family:Cairo;font-weight:700;font-size:15px;min-width:0;}',
  '#hh-scr textarea{width:100%;min-height:110px;border:1.5px solid #E7DAC0;border-radius:12px;padding:10px 12px;font-family:Cairo;font-size:15px;outline:none;margin-top:8px;}',
  '#hh-scr .rs{font-family:Tajawal;font-size:14px;color:#7A6A54;margin-top:6px;}',
  '#hh-scr .sx-go{display:flex;gap:10px;margin-top:22px;justify-content:flex-end;flex-wrap:wrap;}',
  '#hh-scr .sx-end{flex:1;overflow:auto;display:flex;align-items:center;justify-content:center;padding:3vh 2vw;}',
  '#hh-scr .rk{display:flex;flex-direction:column;gap:12px;margin:16px 0;} #hh-scr .rk div{display:flex;align-items:center;gap:16px;background:#F5F3F0;border-radius:18px;padding:14px 20px;font-size:clamp(18px,1.5vw,28px);font-weight:800;color:#3D0918;}',
  '#hh-scr .rk div.w{background:linear-gradient(135deg,#8A1538,#5E0E26);color:#fff;} #hh-scr .rk div em{font-style:normal;width:46px;height:46px;border-radius:14px;background:#fff;color:#5E0E26;display:flex;align-items:center;justify-content:center;flex-shrink:0;} #hh-scr .rk div b{margin-inline-start:auto;}',
  '#hh-scr .sx-st{font-family:Tajawal;color:#7A6A54;font-size:16px;line-height:1.9;}',
  '#hh-scr .mq{font-size:clamp(20px,1.7vw,32px);font-weight:800;color:#3D0918;display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;}',
  '#hh-scr .mq small{font-family:Tajawal;font-weight:500;font-size:clamp(13px,1vw,18px);color:#7A6A54;}',
  '#hh-scr .mt3{flex:1;min-height:0;overflow:auto;display:grid;grid-template-columns:minmax(0,1fr) minmax(80px,16%) minmax(0,1.35fr);align-items:stretch;}',
  '#hh-scr .mcol{display:flex;flex-direction:column;gap:clamp(6px,.9vh,12px);justify-content:safe center;min-height:0;}',
  '#hh-scr .mcol .mi{flex:0 1 auto;min-height:clamp(44px,6.3vh,80px);border-radius:18px;background:#fff;border:2.5px solid #E7DAC0;display:flex;align-items:center;padding:6px 20px;font-size:clamp(17px,1.55vw,30px);font-weight:800;color:#2A1A0E;gap:14px;text-align:right;line-height:1.35;}',
  '#hh-scr .mcol .mi span{flex:1;} #hh-scr .mcol .mi i{width:20px;height:20px;border-radius:50%;border:3px solid #B8AE9A;flex-shrink:0;}',
  '#hh-scr .mcol.b .mi{font-size:clamp(15px,1.25vw,24px);}',
  '#hh-scr .mcol .mi.ok{border-color:#2F6A4E;background:#EEF4F0;} #hh-scr .mcol .mi.ok i{background:#2F6A4E;border-color:#2F6A4E;}',
  '#hh-scr .mcol .mi.sel{border-color:#5E0E26;box-shadow:0 0 0 5px rgba(94,14,38,.15);} #hh-scr .mcol .mi.sel i{background:#5E0E26;border-color:#5E0E26;}',
  '#hh-scr .mcol .mi.bad{border-color:#B3261E;background:#FCEEEC;animation:hhScrShake .3s;}',
  '@keyframes hhScrShake{25%{transform:translateX(6px);}75%{transform:translateX(-6px);}}',
  '#hh-scr .mln{width:100%;height:100%;overflow:visible;pointer-events:none;}',
  '#hh-scr .mg{flex:1;min-height:0;display:grid;gap:clamp(10px,1.1vw,20px);grid-template-columns:repeat(var(--c,4),minmax(0,1fr));grid-auto-rows:minmax(0,1fr);}',
  '#hh-scr .mc{border-radius:20px;background:linear-gradient(160deg,#8A1538,#5E0E26);border:3px solid #B8924A;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#E9D7AE;font-size:clamp(28px,2.6vw,54px);font-weight:800;position:relative;min-height:0;padding:10px;text-align:center;}',
  '#hh-scr .mc b{font-size:clamp(15px,1.45vw,28px);line-height:1.35;color:inherit;}',
  '#hh-scr .mc.up{background:#fff;color:#2A1A0E;border-color:#5E0E26;box-shadow:0 0 0 5px rgba(94,14,38,.15);}',
  '#hh-scr .mc.ok{background:#EEF4F0;border-color:#2F6A4E;color:#2F6A4E;} #hh-scr .mc.ok small{position:absolute;bottom:8px;font-size:clamp(11px,.8vw,14px);color:#2F6A4E;}',
  '#hh-scr .mc.t b{font-size:clamp(18px,1.8vw,34px);}',
  '#hh-scr .ow{flex:1;min-height:0;display:grid;grid-template-columns:1fr 1fr;gap:clamp(16px,2vw,40px);}',
  '#hh-scr .oc{background:#fff;border:1.5px solid #E7DAC0;border-radius:24px;padding:16px 20px;display:flex;flex-direction:column;gap:clamp(8px,1.2vh,14px);min-height:0;overflow:auto;}',
  '#hh-scr .oc h4{margin:0;font-size:clamp(14px,1.05vw,20px);color:#7A6A54;display:flex;align-items:center;gap:10px;}',
  '#hh-scr .oi{min-height:clamp(54px,8vh,92px);border-radius:18px;border:2.5px solid #E7DAC0;background:#fff;display:flex;align-items:center;gap:16px;padding:6px 20px;font-size:clamp(18px,1.6vw,32px);font-weight:800;color:#2A1A0E;text-align:right;flex-shrink:0;}',
  '#hh-scr .oi i{width:clamp(38px,2.6vw,52px);height:clamp(38px,2.6vw,52px);border-radius:14px;background:#5E0E26;color:#fff;font-style:normal;display:flex;align-items:center;justify-content:center;font-size:.8em;flex-shrink:0;}',
  '#hh-scr .oi .h{margin-inline-start:auto;} #hh-scr .oi.ok{border-color:#2F6A4E;background:#EEF4F0;} #hh-scr .oi.ok i{background:#2F6A4E;} #hh-scr .oi.ok .h{color:#2F6A4E;}',
  '#hh-scr .oi.no{border-color:#B3261E;background:#FCEEEC;} #hh-scr .oi.no i{background:#B3261E;} #hh-scr .oi.no .h{color:#B3261E;}',
  '#hh-scr .oi.sl{border-style:dashed;border-color:#D9D2C7;color:#B8AE9A;background:#FAF9F7;} #hh-scr .oi.sl i{background:#D9D2C7;}',
  '#hh-scr .oi.pk{border-color:#5E0E26;box-shadow:0 0 0 5px rgba(94,14,38,.15);}',
  '@media (max-width:900px){ #hh-scr .ow{grid-template-columns:1fr;} #hh-scr .mt3{grid-template-columns:1fr 40px 1.2fr;} }'
  ].join('\n');
  document.head.appendChild(st);
}

/* ── البدء ── */
window.hhScreenPlay=function(g, opt){
  style();
  var tpl=TPL[g.screenTpl]?g.screenTpl:'boxes';
  var Sx=g.settings||{};
  S={ g:g, all:(g.questions||[]).slice(), tpl:tpl, nTeams:Math.max(1,Math.min(4,parseInt(Sx.teams,10)||2)), names:null, base:parseInt(Sx.basePts,10)||20,
      roster:{mode:'none', names:[], label:'', picked:{}, tally:{}}, rooms:null, stage:'setup' };
  var root=document.getElementById('hh-scr'); if(root) root.remove();
  root=document.createElement('div'); root.id='hh-scr'; document.body.appendChild(root);
  document.addEventListener('keydown', onKey, true);
  try{ var saved=JSON.parse(localStorage.getItem('hh_scr_roster')||'null'); if(saved&&saved.names&&saved.names.length){ S.roster.mode=saved.mode||'paste'; S.roster.names=saved.names; S.roster.label=saved.label||''; S.roster.code=saved.code||''; } }catch(e){}
  renderSetup();
  loadRooms();
};
function fits(t){ return S.all.filter(function(q){ return TPL[t].types.indexOf(q.type)>-1; }).length; }
async function loadRooms(){
  if(!uid()) return;
  try{ var qs=await db().collection('classrooms').where('teacherId','==',uid()).get(); var r=[]; qs.forEach(function(d){ var c=d.data(); if(c.active===false||c.archived) return; r.push({code:d.id,name:c.className||d.id,n:c.studentCount||0}); }); r.sort(function(a,b){ return a.name.localeCompare(b.name,'ar'); }); S.rooms=r; if(S.stage==='setup') renderSetup(); }catch(e){ S.rooms=[]; }
}
async function loadRoster(code){
  try{ var qs=await db().collection('classroom_students').where('classCode','==',code).where('active','==',true).get(); var n=[]; qs.forEach(function(d){ var s=d.data(); var nm=String(s.studentName||s.name||'').trim(); if(nm) n.push(nm); }); n.sort(function(a,b){ return a.localeCompare(b,'ar'); }); return n; }catch(e){ return []; }
}
function renderSetup(){
  var root=document.getElementById('hh-scr'); if(!root) return; S.stage='setup';
  var names=S.names||[]; var tnames=[]; for(var i=0;i<S.nTeams;i++) tnames.push(names[i]||(S.nTeams===1?'الصف':'فريق '+(i+1)));
  var rooms=S.rooms;
  var rosterUI='<div class="chs"><button class="'+(S.roster.mode==='none'?'on':'')+'" data-rm="none">بدون</button>'+(rooms&&rooms.length?rooms.map(function(r){ return '<button class="'+(S.roster.mode==='room'&&S.roster.code===r.code?'on':'')+'" data-room="'+esc(r.code)+'" data-name="'+esc(r.name)+'">'+esc(r.name)+(r.n?' · '+r.n:'')+'</button>'; }).join(''):'')+'<button class="'+(S.roster.mode==='paste'?'on':'')+'" data-rm="paste">لصق أسماء</button></div>'
    +(S.roster.mode==='paste'?'<textarea id="scr-names" placeholder="اسم كل طالب في سطر">'+esc(S.roster.names.join('\n'))+'</textarea>':'')
    +'<div class="rs">'+(S.roster.mode==='none'?'زر «اختر طالباً» يبقى ظاهراً، ويطلب منك قائمة عند استخدامه.':S.roster.names.length?plural(S.roster.names.length,'طالب','طلاب','طالباً')+' · يُختار كل طالب مرة واحدة حتى ينتهي الجميع':(S.roster.mode==='room'?'جارٍ تحميل الأسماء…':'الصق الأسماء'))+(uid()?'':' · سجّل الدخول لتظهر شُعبك هنا')+'</div>';
  root.innerHTML='<div class="sh"><div class="ti"><small>إبداع · على شاشة الصف</small><b>'+esc(S.g.title||'')+'</b></div><span style="flex:1"></span><button class="cb" style="height:44px" onclick="hhScrExit()">'+ico('x',18)+' إغلاق</button></div>'
   +'<div class="setup"><div class="sx-sp"><h1>جهّز العرض</h1><div class="sub">'+plural(S.all.length,'سؤال','أسئلة','سؤالاً')+' · اختر القالب والفرق ثم ابدأ</div>'
   +'<h3>القالب</h3><div class="tp5">'+Object.keys(TPL).map(function(k){ var f=fits(k); return '<button class="'+(S.tpl===k?'on':'')+'" '+(f?'':'disabled')+' data-tpl="'+k+'"><span class="i">'+ico(TPL[k].ico,20)+'</span><b>'+TPL[k].name+'</b><small>'+f+' من '+S.all.length+' تناسبه</small></button>'; }).join('')+'</div>'
   +'<h3>الفرق</h3><div class="chs">'+[1,2,3,4].map(function(n){ return '<button class="'+(S.nTeams===n?'on':'')+'" data-tn="'+n+'">'+(n===1?'بلا فرق':n===2?'فريقان':n+' فرق')+'</button>'; }).join('')+'</div>'
   +(S.nTeams>1?'<div class="tn">'+tnames.map(function(t,i){ return '<label><i style="background:'+TC[i]+'"></i><input data-ti="'+i+'" value="'+esc(t)+'"></label>'; }).join('')+'</div>':'')
   +'<h3>اختيار الطالب</h3>'+rosterUI
   +'<div class="sx-go"><button class="cb" onclick="hhScrExit()">إلغاء</button><button class="cb p" onclick="hhScrStart()">'+ico('play',18)+' ابدأ العرض</button></div></div></div>';
  root.querySelectorAll('[data-tpl]').forEach(function(b){ b.onclick=function(){ S.tpl=b.getAttribute('data-tpl'); renderSetup(); }; });
  root.querySelectorAll('[data-tn]').forEach(function(b){ b.onclick=function(){ readNames(); S.nTeams=+b.getAttribute('data-tn'); renderSetup(); }; });
  root.querySelectorAll('[data-rm]').forEach(function(b){ b.onclick=function(){ readNames(); var m=b.getAttribute('data-rm'); if(m==='none'){ S.roster={mode:'none',names:[],label:'',picked:{},tally:{}}; } else { S.roster.mode='paste'; S.roster.label='قائمة ملصوقة'; } renderSetup(); }; });
  root.querySelectorAll('[data-room]').forEach(function(b){ b.onclick=async function(){ readNames(); S.roster={mode:'room',code:b.getAttribute('data-room'),label:b.getAttribute('data-name'),names:[],picked:{},tally:{}}; renderSetup(); S.roster.names=await loadRoster(S.roster.code); if(!S.roster.names.length) toastX('لا طلاب مسجّلون في هذه الشعبة بعد','info'); renderSetup(); }; });
  var ta=document.getElementById('scr-names'); if(ta) ta.addEventListener('input',function(){ S.roster.names=ta.value.split(/\r?\n/).map(function(x){ return x.trim(); }).filter(Boolean); var rs=root.querySelector('.rs'); if(rs) rs.textContent=plural(S.roster.names.length,'طالب','طلاب','طالباً'); });
}
function readNames(){ var r=document.getElementById('hh-scr'); if(!r) return; var n=S.names||[]; r.querySelectorAll('[data-ti]').forEach(function(i){ n[+i.getAttribute('data-ti')]=i.value.trim(); }); S.names=n; }
window.hhScrStart=function(){
  readNames();
  var qs=S.all.filter(function(q){ return TPL[S.tpl].types.indexOf(q.type)>-1; });
  if(!qs.length){ toastX('لا أسئلة تناسب هذا القالب','error'); return; }
  S.qs=qs; S.teams=[]; for(var i=0;i<S.nTeams;i++) S.teams.push({ name:(S.names&&S.names[i])||(S.nTeams===1?'الصف':'فريق '+(i+1)), score:0, color:TC[i], life:{fifty:true,time:true,ask:true} });
  S.turn=0; S.res={}; S.open=null; S.rev=false; S.tried={}; S.idx=0; S.hide={}; S.ptsShown={}; S.pick=null; S.ended=false;
  if(S.roster.names.length){ try{ localStorage.setItem('hh_scr_roster',JSON.stringify({mode:S.roster.mode,names:S.roster.names,label:S.roster.label,code:S.roster.code||''})); }catch(e){} }
  S.roster.picked={}; S.roster.tally={};
  S.stage='play'; S.wheelRot=0;
  if(TPL[S.tpl].seq) openQ(0); else render();
};
window.hhScrExit=function(){
  if(S&&S.stage==='play'&&!S.ended&&Object.keys(S.res).length&&!confirm('إنهاء العرض؟ ستضيع النقاط الحالية.')) return;
  stopTimer(); document.removeEventListener('keydown', onKey, true);
  try{ if(document.fullscreenElement) document.exitFullscreen(); }catch(e){}
  var r=document.getElementById('hh-scr'); if(r) r.remove(); S=null;
};

/* ── المؤقت ── */
function startTimer(sec){ stopTimer(); S.tTotal=sec; S.tLeft=sec; S.tOn=true; paintClock(); S.tIv=setInterval(function(){ if(!S||!S.tOn) return; S.tLeft=Math.max(0,S.tLeft-1); paintClock(); if(S.tLeft<=0){ S.tOn=false; clearInterval(S.tIv); } },1000); }
function stopTimer(){ if(S){ S.tOn=false; clearInterval(S.tIv); } }
function paintClock(){ var c=document.querySelector('#hh-scr .clock'); if(!c||!S) return; var p=S.tTotal?Math.round(100*S.tLeft/S.tTotal):0; c.style.setProperty('--p',p+'%'); c.classList.toggle('end',S.tLeft<=0&&S.tTotal>0); c.classList.toggle('off',!S.tOn&&S.tLeft>0); var b=c.querySelector('b'); if(b) b.textContent=S.tTotal?S.tLeft:'—'; }
function qTime(q){ var t=parseInt(q.time,10)||20; return q.flash?Math.max(5,Math.round(t/2)):t; }
function qPts(q){ return S.base*(q.mult>1?q.mult:1)*(q.flash?2:1); }

/* ── الرسم ── */
function head(){
  var done=Object.keys(S.res).length, n=S.qs.length;
  var cnt=TPL[S.tpl].seq?('السؤال '+Math.min(S.idx+1,n)+' من '+n):(done+' من '+n);
  var teams='<div class="teams">'+S.teams.map(function(t,i){ return '<div class="tm '+(i===S.turn&&S.teams.length>1?'on':'')+'" style="--a:'+t.color+'"><i></i><span>'+esc(t.name)+'</span><b>'+t.score+'</b><div class="pm"><button title="+'+S.base+'" onclick="hhScrAdj('+i+',1)">'+ico('plus',13,2.6)+'</button><button title="-'+S.base+'" onclick="hhScrAdj('+i+',-1)">−</button></div></div>'; }).join('')+'</div>';
  return '<div class="sh"><div class="ti"><small>'+TPL[S.tpl].name+' · على شاشة الصف</small><b>'+esc(S.g.title||'')+'</b></div><span class="cnt">'+cnt+'</span>'+teams+'<div class="clock off"><b>—</b></div></div>';
}
function ctl(){
  var seq=TPL[S.tpl].seq;
  return '<div class="ctl">'+(seq?'<button class="cb" onclick="hhScrNav(-1)" '+(S.idx<=0?'disabled':'')+'>'+ico('back',20)+' السابق</button><button class="cb p" onclick="hhScrNav(1)">'+(S.idx>=S.qs.length-1?'النتائج':'التالي')+' '+ico('back',20).replace('M9 5l7 7-7 7','M15 5l-7 7 7 7')+'</button>':'<button class="cb p" onclick="hhScrNextOpen()">'+(S.tpl==='wheel'?ico('wheel',20)+' أدر العجلة':'التالي '+ico('back',20).replace('M9 5l7 7-7 7','M15 5l-7 7 7 7'))+'</button>')
    +'<button class="cb g" onclick="hhScrReveal()" '+(S.open==null?'disabled':'')+'>'+ico('eye',20)+' أظهر الإجابة</button>'
    +'<button class="cb" onclick="hhScrPick()">'+ico('dice',20)+' اختر طالباً</button>'
    +(S.teams.length>1?'<button class="cb" onclick="hhScrTurn()">'+ico('users',20)+' دور الفريق التالي</button>':'')
    +'<button class="cb r" onclick="hhScrEnd()">'+ico('award',20)+' إنهاء</button>'
    +'<span class="kh"><kbd>مسافة</kbd> التالي <kbd>A</kbd> الإجابة <kbd>S</kbd> طالب <kbd>F</kbd> ملء الشاشة</span><button class="cb" title="ملء الشاشة" onclick="hhScrFull()">'+EXP+'</button></div>';
}
function render(){
  var root=document.getElementById('hh-scr'); if(!root||!S) return;
  if(S.ended){ root.innerHTML=head()+renderEnd(); return; }
  var body='';
  if(S.tpl==='boxes') body=boxesBody();
  else if(S.tpl==='flip') body=flipBody();
  else if(S.tpl==='wheel') body=wheelBody();
  else if(S.tpl==='show') body=showBody();
  else if(S.tpl==='tfs') body=tfsBody();
  else if(S.tpl==='match') body=matchBody();
  else if(S.tpl==='memory') body=memBody();
  else if(S.tpl==='order') body=orderBody();
  var over='';
  if(S.open!=null && !TPL[S.tpl].seq) over='<div class="ov" onclick="if(event.target===this)hhScrClose()">'+cardHTML(S.open)+'</div>';
  root.innerHTML=head()+'<div class="sx-body">'+body+over+pickHTML()+'</div>'+ctl();
  paintClock();
  if(S.tpl==='match') setTimeout(drawLines,0);
  if(S.tpl==='wheel'){ var sv=root.querySelector('.whw svg'); if(sv){ sv.style.transition='none'; sv.style.transform='rotate('+S.wheelRot+'deg)'; } }
}
function cols(n,max){ var c=n<=6?Math.min(n,3):n<=12?Math.min(6,Math.ceil(n/2)):n<=18?6:n<=24?8:10; return Math.min(c,max||10); }
function boxesBody(){ var n=S.qs.length; return '<div class="boxes" style="--c:'+cols(n)+'">'+S.qs.map(function(q,i){ var r=S.res[i]; if(r) return '<div class="bx done">'+(i+1)+'<small class="'+(r.ok?'':'x')+'">'+(r.ok?esc(S.teams[r.team].name)+' · +'+r.pts:'بلا إجابة')+'</small></div>'; return '<button class="bx" onclick="hhScrOpen('+i+')">'+(i+1)+'</button>'; }).join('')+'</div>'; }
function flipBody(){ var n=S.qs.length; return '<div class="sx-fg" style="--c:'+(n<=4?2:n<=9?3:4)+'">'+S.qs.map(function(q,i){ var r=S.res[i]; return '<button class="fc '+(r?'done':'')+'" onclick="hhScrOpen('+i+')"><span class="nb">بطاقة '+(i+1)+(r?' · '+(r.ok?esc(S.teams[r.team].name)+' +'+r.pts:'بلا نقاط'):'')+'</span><b>'+esc(q.q)+'</b></button>'; }).join('')+'</div>'; }
function wheelBody(){
  var rem=S.qs.map(function(_,i){ return i; }).filter(function(i){ return !S.res[i]; });
  if(!rem.length) return '<div class="wh"><div class="whs"><b>انتهت الأسئلة</b><p>اضغط «إنهاء» لعرض النتائج.</p></div></div>';
  var n=rem.length, R=100, seg=360/n, cs=['#8A1538','#3D6B53','#8A6D2E','#1F4E79','#5E0E26','#2C5340'];
  var p=''; rem.forEach(function(qi,k){ var a0=(k*seg-90)*Math.PI/180, a1=((k+1)*seg-90)*Math.PI/180; var x0=R+R*Math.cos(a0), y0=R+R*Math.sin(a0), x1=R+R*Math.cos(a1), y1=R+R*Math.sin(a1); var mid=((k+.5)*seg-90)*Math.PI/180; var tx=R+R*.7*Math.cos(mid), ty=R+R*.7*Math.sin(mid);
    p+=(n===1?'<circle cx="100" cy="100" r="100" fill="'+cs[0]+'"/>':'<path d="M100 100 L'+x0.toFixed(2)+' '+y0.toFixed(2)+' A100 100 0 '+(seg>180?1:0)+' 1 '+x1.toFixed(2)+' '+y1.toFixed(2)+'Z" fill="'+cs[k%cs.length]+(n%cs.length===1&&k===n-1?'':'')+'" stroke="#fff" stroke-width="1"/>')+'<text x="'+tx.toFixed(1)+'" y="'+ty.toFixed(1)+'" fill="#fff" font-family="Cairo" font-weight="800" font-size="'+(n>16?8:n>10?10:13)+'" text-anchor="middle" dominant-baseline="central">'+(qi+1)+'</text>'; });
  return '<div class="wh"><div class="whw"><span class="pin"></span><svg viewBox="0 0 200 200">'+p+'<circle cx="100" cy="100" r="13" fill="#fff" stroke="#B8924A" stroke-width="3"/></svg></div><div class="whs"><b>'+(S.teams.length>1?'دور '+esc(S.teams[S.turn].name):'أدر العجلة')+'</b><p>'+plural(n,'سؤال باقٍ','أسئلة باقية','سؤالاً باقياً')+'. تقف العجلة على رقم سؤال، فيظهر للفريق.</p><button class="cb p" onclick="hhScrSpin()">'+ico('wheel',20)+' أدر العجلة</button></div></div>';
}
function showBody(){
  var q=S.qs[S.idx], t=S.teams[S.turn]; var prog='<div class="prog">'+S.qs.map(function(_,i){ var r=S.res[i]; return '<i class="'+(r?(r.ok?'d':'x'):i===S.idx?'c':'')+'"></i>'; }).join('')+'</div>';
  var lad='';
  if(S.teams.length){ var L=t.life; lad='<div class="lad"><h4>'+ico('star',18)+' وسائل '+esc(t.name)+'</h4>'
    +'<button class="lf" '+(L.fifty&&q.type==='mcq'&&!S.rev?'':'disabled')+' onclick="hhScrLife(\'fifty\')"><i>50</i>حذف إجابتين</button>'
    +'<button class="lf" '+(L.time&&!S.rev?'':'disabled')+' onclick="hhScrLife(\'time\')"><i>'+ico('clock',18)+'</i>15 ثانية إضافية</button>'
    +'<button class="lf" '+(L.ask&&S.teams.length>1&&!S.rev?'':'disabled')+' onclick="hhScrLife(\'ask\')"><i>'+ico('users',18)+'</i>استشر فريقاً آخر</button>'
    +'<div class="turn">الدور الآن<b style="--a:'+t.color+'"><i></i>'+esc(t.name)+'</b><span style="font-size:14px;font-weight:500;font-family:Tajawal">يتشاور الفريق ثم يعلن قائده الإجابة</span></div></div>'; }
  return '<div class="gs"><div class="qbig">'+prog+qBlock(S.idx,true)+'<div style="margin-bottom:auto"></div></div>'+lad+'</div>';
}
function tfsBody(){
  var q=S.qs[S.idx]; var r=S.rev, v=(q.correct||[0])[0]===0;
  return '<div class="tfw"><div style="display:flex;gap:6px">'+S.qs.map(function(_,i){ var x=S.res[i]; return '<i style="flex:1;height:10px;border-radius:9px;background:'+(x?(x.ok?'#2F6A4E':'#B3261E'):i===S.idx?'#8A1538':'#ECE8E3')+'"></i>'; }).join('')+'</div>'
    +'<div class="tfs">'+esc(q.q)+(q.img?'<img class="qimg" style="margin:16px auto 0" src="'+esc(q.img)+'" alt="">':'')+'</div>'
    +'<div class="tfb"><div class="t '+(r?(v?'ok':'no'):'')+'">'+ico('check',44,3)+' صح</div><div class="f '+(r?(!v?'ok':'no'):'')+'">'+ico('x',44,3)+' خطأ</div></div>'
    +(r&&q.note?'<div class="sx-note">'+esc(q.note)+'</div>':'')+(r||S.res[S.idx]?'':'<div class="sx-st" style="text-align:center">يرفع الطلاب أيديهم: صح أم خطأ؟</div>')+judge(S.idx)+'</div>';
}
function qBlock(i, big){
  var q=S.qs[i], r=S.rev, opts=q.type==='tf'?['صح','خطأ']:(q.opts||[]);
  var h='<h2 class="q">'+esc(q.q)+'</h2>'+(q.img?'<img class="qimg" src="'+esc(q.img)+'" alt="">':'');
  if(q.type==='open'){
    var pts=(q.pts||[]).filter(function(x){ return String(x||'').trim(); }); var shown=S.ptsShown[i]||0;
    h+='<ol class="pts">'+pts.map(function(p,k){ var on=r||k<shown; return '<li class="'+(on?'':'h')+'" onclick="hhScrPt('+i+','+k+')"><i>'+(k+1)+'</i>'+(on?esc(p):'اضغط لإظهار النقطة')+'</li>'; }).join('')+'</ol>';
    return h;
  }
  h+='<div class="a4">'+opts.map(function(o,k){ if(q.type==='mcq'&&!String(o||'').trim()) return ''; var ok=(q.correct||[]).indexOf(k)>-1; var cls=r?(ok?'ok':'no'):''; if(!r&&S.hide[i]&&S.hide[i].indexOf(k)>-1) cls='gone';
    return '<div class="an '+cls+'" style="--a:'+(q.type==='tf'?(k===0?'#3D6B53':'#B3261E'):OC[k])+'"><i>'+(q.type==='tf'?(k===0?ico('check',22,3):ico('x',22,3)):OS[k])+'</i>'+esc(o)+(r&&ok?'<em class="ck">'+ico('check',24,3)+'</em>':'')+'</div>'; }).join('')+'</div>';
  if(r&&q.note) h+='<div class="sx-note">'+esc(q.note)+'</div>';
  h+=judge(i);
  return h;
}
function cardHTML(i){
  var q=S.qs[i], t=S.teams[S.turn];
  if(S.tpl==='flip'||q.type==='open'){
    var front='<div class="fr"><small>بطاقة '+(i+1)+(S.teams.length>1?' · دور '+esc(t.name):'')+'</small><b>'+esc(q.q)+'</b>'+(q.img?'<img src="'+esc(q.img)+'" alt="">':'')+(q.type==='open'?'<span class="k2" style="color:#fff;margin:0"><span class="tg" style="background:rgba(255,255,255,.16);color:#fff">إجابة من '+plural(ptsOf(q).length,'نقطة','نقاط','نقطة')+' · '+ptPer(q)+' لكل نقطة</span></span>':'')+'</div>';
    var back='<div class="bk"><span class="lb">'+ico('check',22,2.4)+' '+(q.type==='open'?'الإجابة النموذجية':'الإجابة')+'</span>';
    if(q.type==='open'){ back+=qBlock(i).replace(/<h2[\s\S]*?<\/h2>/,'').replace(/<img class="qimg"[^>]*>/,'')+(S.rev||(S.ptsShown[i]||0)>0?judge(i):'<div class="sx-st">اضغط على النقاط لكشفها واحدة واحدة، أو «أظهر الإجابة» لكشفها كلها</div>'); }
    else { var opts=q.type==='tf'?['صح','خطأ']:(q.opts||[]); var c=(q.correct||[0])[0]; back+=(S.rev?'<ol class="pts"><li><i>'+ico('check',18,3)+'</i>'+esc(opts[c]||'')+'</li></ol>'+(q.note?'<div class="sx-note">'+esc(q.note)+'</div>':''):'<ol class="pts"><li class="h" onclick="hhScrReveal()"><i>?</i>اضغط لإظهار الإجابة</li></ol>')+judge(i); }
    back+='</div>';
    return '<div class="sx-card" style="padding:0;border-top:0;overflow:auto"><div class="fl2">'+front+back+'</div></div>';
  }
  return '<div class="sx-card"><div class="k2"><span class="nb">'+(i+1)+'</span>'+(S.tpl==='wheel'?'العجلة وقفت على السؤال '+(i+1):'صندوق رقم '+(i+1))+(S.teams.length>1?' · دور '+esc(t.name):'')+(q.mult>1?'<span class="tg">×'+q.mult+' درجة مضاعفة</span>':'')+(q.flash?'<span class="tg">سؤال البرق</span>':'')+'<span class="pt">'+qPts(q)+' نقطة</span></div>'+qBlock(i)+(S.res[i]?'':'<div class="aw" style="margin-top:10px">'+(S.rev?'':'<button class="cb g" onclick="hhScrReveal()">'+ico('eye',18)+' أظهر الإجابة</button>')+'<button class="cb" onclick="hhScrClose()">'+ico('back',18)+' '+(S.tpl==='wheel'?'رجوع للعجلة':'رجوع للصناديق')+'</button></div>')+'</div>';
}
function ptsOf(q){ if(q.type==='pair') return pairsOf(q); return (q.pts||[]).filter(function(x){ return String(x||'').trim(); }); }
function ptPer(q){ if(q.type==='pair') return Math.max(5,Math.round(qPts(q)/2)); var n=Math.max(1,ptsOf(q).length); return Math.max(1,Math.round(qPts(q)/n)); }
function judge(i){
  var q=S.qs[i]; var r=S.res[i]; var t=S.teams[S.turn];
  if(r) return '<div class="aw">'+(r.ok?ico('check',20)+' '+esc(S.teams[r.team].name)+' · +'+r.pts:'لم تُحتسب نقاط')+'<span style="flex:1"></span>'+(TPL[S.tpl].seq?'<button class="cb p" onclick="hhScrNav(1)">'+(S.idx>=S.qs.length-1?'النتائج':'التالي')+'</button>':'<button class="cb p" onclick="hhScrClose()">'+(S.tpl==='flip'?'رجوع للبطاقات':S.tpl==='wheel'?'رجوع للعجلة':'رجوع للصناديق')+'</button>')+'</div>';
  if(q.type==='open'){ var n=ptsOf(q).length, per=ptPer(q); var b=''; for(var k=0;k<=n;k++) b+='<button class="cb'+(k===n?' g':'')+'" onclick="hhScrScore('+i+','+k+')">'+k+'</button>'; return '<div class="aw">كم نقطة ذكر '+(S.teams.length>1?esc(t.name):'الصف')+'؟ '+b+'<span class="sx-st">· '+per+' لكل نقطة</span></div>'; }
  var nextT=nextTeam(i);
  return '<div class="aw">'+(S.teams.length>1?'أجاب '+esc(t.name)+' إجابة صحيحة؟':'أجاب الصف إجابة صحيحة؟')+'<button class="cb g" onclick="hhScrJudge('+i+',1)">'+ico('check',18)+' نعم · +'+qPts(q)+'</button>'
    +(S.teams.length>1&&nextT>-1&&!S.rev?'<button class="cb" onclick="hhScrJudge('+i+',0)">'+ico('x',18)+' لا · ينتقل إلى '+esc(S.teams[nextT].name)+'</button>':'')
    +'<button class="cb" onclick="hhScrJudge('+i+',-1)">'+ico('x',18)+' '+(S.teams.length>1?'لا أحد · أظهر الإجابة':'لا · أظهر الإجابة')+'</button></div>';
}
function nextTeam(i){ var tried=(S.tried[i]||[]).concat([S.turn]); for(var k=1;k<S.teams.length;k++){ var c=(S.turn+k)%S.teams.length; if(tried.indexOf(c)<0) return c; } return -1; }
function pickHTML(){
  if(!S.pick) return '';
  var rem=S.roster.names.filter(function(n){ return !S.roster.picked[n]; }).length;
  return '<div class="pick'+(S.pick.spin?' spin':'')+'"><div class="k">'+ico('dice',18)+' الطالب المختار'+(S.roster.label?' · '+esc(S.roster.label):'')+'<button onclick="hhScrPickClose()">'+ico('x',16)+'</button></div><b>'+esc(S.pick.name)+'</b><small>'+(S.pick.spin?'…':plural(rem,'طالب لم يُختر بعد','طلاب لم يُختاروا بعد','طالباً لم يُختاروا بعد'))+'</small>'
    +(S.pick.spin?'':'<div class="rw"><button class="g" onclick="hhScrPickRes(1)">'+ico('check',18)+' أصاب</button><button onclick="hhScrPickRes(0)">'+ico('x',18)+' أخطأ</button><button onclick="hhScrPick()">'+ico('dice',18)+' غيره</button></div>')+'</div>';
}
function renderEnd(){
  stopTimer();
  var rk=S.teams.map(function(t,i){ return {t:t,i:i}; }).sort(function(a,b){ return b.t.score-a.t.score; });
  var ok=Object.keys(S.res).filter(function(k){ return S.res[k].ok; }).length;
  var tl=Object.keys(S.roster.tally).map(function(n){ return {n:n,c:S.roster.tally[n].ok||0,w:S.roster.tally[n].no||0}; }).filter(function(x){ return x.c; }).sort(function(a,b){ return b.c-a.c; }).slice(0,8);
  return '<div class="sx-end"><div class="sx-sp"><h1>'+(S.teams.length>1?'النتيجة النهائية':'انتهت اللعبة')+'</h1><div class="sub">'+plural(Object.keys(S.res).length,'سؤال','أسئلة','سؤالاً')+' من '+S.qs.length+' · '+ok+' إجابات صحيحة</div>'
    +'<div class="rk">'+rk.map(function(x,k){ return '<div class="'+(k===0&&S.teams.length>1&&x.t.score>0?'w':'')+'"><em>'+(k+1)+'</em>'+esc(x.t.name)+'<b>'+x.t.score+'</b></div>'; }).join('')+'</div>'
    +(tl.length?'<h3>أبرز الطلاب</h3><div class="sx-st">'+tl.map(function(x){ return esc(x.n)+' · '+x.c+' صحيحة'; }).join('<br>')+'</div>':'')
    +'<div class="sx-go"><button class="cb" onclick="hhScrExit()">إغلاق</button><button class="cb p" onclick="hhScrAgain()">'+ico('play',18)+' العب مجدداً</button></div></div></div>';
}


/* ── التوصيل · بطاقات الذاكرة · رتّب الأحداث (المرحلة 2) ── */
function initRound(i){
  var q=S.qs[i]; S.msg=null; S.roundPts=0;
  if(S.tpl==='match'){ var n=pairsOf(q).length, ix=[]; for(var k=0;k<n;k++) ix.push(k); S.m={ qi:i, L:shuf(ix), Rr:shufNot(ix), done:{}, sel:null, bad:null }; }
  else if(S.tpl==='memory'){ var c=[]; pairsOf(q).forEach(function(_,k){ c.push({k:k,s:'a'}); c.push({k:k,s:'b'}); }); S.mm={ qi:i, cards:shuf(c), up:[], got:{}, lock:false }; }
  else if(S.tpl==='order'){ var it=itemsOf(q), ix2=[]; for(var k2=0;k2<it.length;k2++) ix2.push(k2); S.or={ qi:i, pool:shufNot(ix2), slots:it.map(function(){ return null; }), sel:null, checked:false }; }
}
function teamName(t){ return S.teams.length>1?S.teams[t].name:'الصف'; }
function passTurn(){ if(S.teams.length>1) S.turn=(S.turn+1)%S.teams.length; }
function award(p){ S.teams[S.turn].score+=p; return p; }
function roundDone(i, ok){ var tot=S.roundPts||0; S.res[i]={ok:ok,team:S.turn,pts:tot}; S.roundPts=0; S.rev=true; stopTimer(); }
function msgRow(extra){ var m=S.msg; return '<div class="aw" style="margin:0">'+(m?'<span style="color:'+(m.ok?'#2F6A4E':m.ok===false?'#B3261E':'#3D0918')+'">'+(m.ok?ico('check',20):m.ok===false?ico('x',20):'')+' '+esc(m.t)+'</span>':'<span class="sx-st">'+(S.teams.length>1?'الدور: <b style="color:#3D0918">'+esc(S.teams[S.turn].name)+'</b>':'')+'</span>')+'<span style="flex:1"></span>'+(extra||'')+'</div>'; }
function nextBtn(){ return '<button class="cb p" onclick="hhScrNav(1)">'+(S.idx>=S.qs.length-1?'النتائج':'الجولة التالية')+'</button>'; }
function progBar(){ if(S.qs.length<2) return ''; return '<div class="prog" style="margin:0">'+S.qs.map(function(_,i){ var r=S.res[i]; return '<i class="'+(r?(r.ok?'d':'x'):i===S.idx?'c':'')+'"></i>'; }).join('')+'</div>'; }
/* التوصيل */
function matchBody(){
  var q=S.qs[S.idx], P=pairsOf(q); if(!S.m||S.m.qi!==S.idx) initRound(S.idx); var M=S.m;
  var cls=function(side,k){ var c='mi'; if(M.done[k]!=null) c+=' ok'; else if(M.sel&&M.sel.side===side&&M.sel.k===k) c+=' sel'; else if(M.bad&&M.bad.some(function(b){ return b.side===side&&b.k===k; })) c+=' bad'; return c; };
  var colA=M.L.map(function(k){ return '<button class="'+cls('a',k)+'" data-s="a" data-k="'+k+'" onclick="hhScrM(\'a\','+k+')"><span>'+esc(P[k].a)+'</span><i></i></button>'; }).join('');
  var colB=M.Rr.map(function(k){ return '<button class="'+cls('b',k)+'" data-s="b" data-k="'+k+'" onclick="hhScrM(\'b\','+k+')"><i></i><span>'+esc(P[k].b)+'</span></button>'; }).join('');
  var nDone=Object.keys(M.done).filter(function(k){ return M.done[k]>=0; }).length, r=S.res[S.idx];
  var act=r?nextBtn():'<button class="cb g" onclick="hhScrReveal()">'+ico('eye',18)+' أظهر كل الأزواج</button>';
  return progBar()+'<div class="mq">'+esc(q.q||'صل كل مصطلح بمعناه')+'<small>'+nDone+' من '+P.length+' أزواج · '+ptPer(q)+' نقطة لكل زوج</small></div><div class="mt3"><div class="mcol a">'+colA+'</div><svg class="mln"></svg><div class="mcol b">'+colB+'</div></div>'+msgRow(act);
}
function drawLines(){
  var root=document.getElementById('hh-scr'); if(!root||!S||!S.m) return; var box=root.querySelector('.mt3'), sv=root.querySelector('.mln'); if(!box||!sv) return;
  var sr=sv.getBoundingClientRect(); sv.setAttribute('viewBox','0 0 '+Math.round(sr.width)+' '+Math.round(sr.height)); var h='';
  Object.keys(S.m.done).forEach(function(k){ var a=box.querySelector('[data-s="a"][data-k="'+k+'"] i'), b=box.querySelector('[data-s="b"][data-k="'+k+'"] i'); if(!a||!b) return; var ra=a.getBoundingClientRect(), rb=b.getBoundingClientRect();
    var x1=ra.left+ra.width/2-sr.left, y1=ra.top+ra.height/2-sr.top, x2=rb.left+rb.width/2-sr.left, y2=rb.top+rb.height/2-sr.top; var t=S.m.done[k]; var col=(t>=0&&S.teams[t])?S.teams[t].color:'#B8AE9A';
    var mx=(x1+x2)/2; h+='<path d="M'+x1.toFixed(1)+' '+y1.toFixed(1)+' C '+mx.toFixed(1)+' '+y1.toFixed(1)+', '+mx.toFixed(1)+' '+y2.toFixed(1)+', '+x2.toFixed(1)+' '+y2.toFixed(1)+'" stroke="'+col+'" stroke-width="5" fill="none" stroke-linecap="round"'+(t===-1?' stroke-dasharray="10 8"':'')+'/>'; });
  sv.innerHTML=h;
}
window.hhScrM=function(side,k){
  var M=S.m, q=S.qs[S.idx], P=pairsOf(q); if(!M||S.res[S.idx]||M.done[k]!=null) return;
  if(!M.sel||M.sel.side===side){ M.sel={side:side,k:k}; S.msg=null; render(); return; }
  if(M.sel.k===k){ M.done[k]=S.turn; var p=award(ptPer(q)); S.roundPts=(S.roundPts||0)+p; S.msg={ok:true,t:'صحيح · «'+P[k].a+'» ← «'+P[k].b+'» · '+teamName(S.turn)+' +'+p}; M.sel=null;
    if(Object.keys(M.done).length>=P.length){ S.msg={ok:true,t:'اكتملت الأزواج'}; roundDone(S.idx,true); } }
  else { M.bad=[M.sel,{side:side,k:k}]; S.msg={ok:false,t:'ليس زوجاً صحيحاً'+(S.teams.length>1?' · ينتقل الدور إلى '+S.teams[(S.turn+1)%S.teams.length].name:'')}; M.sel=null; passTurn(); setTimeout(function(){ if(S&&S.m===M){ M.bad=null; render(); } },900); }
  render();
};
/* بطاقات الذاكرة */
function memBody(){
  var q=S.qs[S.idx], P=pairsOf(q); if(!S.mm||S.mm.qi!==S.idx) initRound(S.idx); var MM=S.mm;
  var n=MM.cards.length, c=n<=6?3:n<=16?4:5;
  var cards=MM.cards.map(function(cd,i){ var txt=cd.s==='a'?P[cd.k].a:P[cd.k].b; var g=MM.got[cd.k];
    if(g!=null) return '<div class="mc ok'+(cd.s==='a'?' t':'')+'"><b>'+esc(txt)+'</b><small>'+(g>=0?esc(teamName(g))+' · +'+ptPer(q):'')+'</small></div>';
    if(MM.up.indexOf(i)>-1) return '<div class="mc up'+(cd.s==='a'?' t':'')+'"><b>'+esc(txt)+'</b></div>';
    return '<button class="mc" onclick="hhScrMem('+i+')">'+(i+1)+'</button>'; }).join('');
  var r=S.res[S.idx], got=Object.keys(MM.got).filter(function(k){ return MM.got[k]>=0; }).length;
  return progBar()+'<div class="mq">اعثر على الأزواج المتطابقة<small>'+got+' من '+P.length+' أزواج · يقلب الفريق بطاقتين في دوره</small></div><div class="mg" style="--c:'+c+'">'+cards+'</div>'+msgRow(r?nextBtn():'<button class="cb g" onclick="hhScrReveal()">'+ico('eye',18)+' اكشف الكل</button>');
}
window.hhScrMem=function(i){
  var MM=S.mm, q=S.qs[S.idx], P=pairsOf(q); if(!MM||MM.lock||S.res[S.idx]) return; var cd=MM.cards[i]; if(MM.got[cd.k]!=null||MM.up.indexOf(i)>-1) return;
  MM.up.push(i); S.msg=null;
  if(MM.up.length===2){ var a=MM.cards[MM.up[0]], b=MM.cards[MM.up[1]];
    if(a.k===b.k&&a.s!==b.s){ MM.got[a.k]=S.turn; var p=award(ptPer(q)); S.roundPts=(S.roundPts||0)+p; S.msg={ok:true,t:'تطابق! «'+P[a.k].a+'» ← «'+P[a.k].b+'» · '+teamName(S.turn)+' +'+p+(S.teams.length>1?' · يكمل الفريق نفسه':'')}; MM.up=[];
      if(Object.keys(MM.got).length>=P.length){ S.msg={ok:true,t:'اكتملت كل الأزواج'}; roundDone(S.idx,true); } }
    else { MM.lock=true; S.msg={ok:false,t:'لا تطابق'+(S.teams.length>1?' · ينتقل الدور إلى '+S.teams[(S.turn+1)%S.teams.length].name:'')}; render(); setTimeout(function(){ if(!S||S.mm!==MM) return; MM.up=[]; MM.lock=false; passTurn(); render(); },1400); return; } }
  render();
};
/* رتّب الأحداث */
function orderBody(){
  var q=S.qs[S.idx], it=itemsOf(q); if(!S.or||S.or.qi!==S.idx) initRound(S.idx); var O=S.or;
  var pool=O.pool.map(function(k){ return '<button class="oi'+(O.sel===k?' pk':'')+'" onclick="hhScrOPick('+k+')"><i>'+ico('list',22)+'</i>'+esc(it[k])+'</button>'; }).join('')||'<div class="sx-st" style="padding:10px">وُضعت كل العناصر · اضغط «تحقق»</div>';
  var slots=O.slots.map(function(k,j){ var st=''; if(O.checked&&k!=null) st=(k===j)?' ok':' no'; if(k==null) return '<button class="oi sl" onclick="hhScrOSlot('+j+')"><i>'+(j+1)+'</i>ضع العنصر هنا</button>';
    return '<button class="oi'+st+'" onclick="hhScrOSlot('+j+')"><i>'+(j+1)+'</i>'+esc(it[k])+(O.checked?'<span class="h">'+(k===j?ico('check',24,3):ico('x',24,3))+'</span>':'')+'</button>'; }).join('');
  var r=S.res[S.idx], full=O.slots.every(function(k){ return k!=null; });
  var act=r?nextBtn():(O.checked?'<button class="cb" onclick="hhScrORetry()">'+ico('back',18)+' أعد المحاولة'+(S.teams.length>1?' · الفريق التالي':'')+'</button><button class="cb g" onclick="hhScrReveal()">'+ico('eye',18)+' أظهر الترتيب الصحيح</button>':'<button class="cb p" '+(full?'':'disabled')+' onclick="hhScrOCheck()">'+ico('check',18)+' تحقق</button><button class="cb g" onclick="hhScrReveal()">'+ico('eye',18)+' أظهر الترتيب الصحيح</button>');
  return progBar()+'<div class="mq">'+esc(q.q)+'<small>'+(S.teams.length>1?'دور '+esc(S.teams[S.turn].name)+' · ':'')+qPts(q)+' نقطة للترتيب الصحيح كاملاً</small></div><div class="ow"><div class="oc"><h4>'+ico('list',20)+' العناصر · اضغط عنصراً ثم مكانه</h4>'+pool+'</div><div class="oc"><h4>'+ico('sort',20)+' الترتيب</h4>'+slots+'</div></div>'+msgRow(act);
}
window.hhScrOPick=function(k){ var O=S.or; if(!O||S.res[S.idx]) return; O.sel=(O.sel===k?null:k); O.checked=false; render(); };
window.hhScrOSlot=function(j){ var O=S.or; if(!O||S.res[S.idx]) return; O.checked=false; S.msg=null;
  if(O.sel!=null){ var prev=O.slots[j]; O.slots[j]=O.sel; var sel=O.sel; O.pool=O.pool.filter(function(x){ return x!==sel; }); if(prev!=null) O.pool.push(prev); O.sel=null; }
  else if(O.slots[j]!=null){ O.pool.push(O.slots[j]); O.slots[j]=null; }
  else if(O.pool.length){ O.slots[j]=O.pool.shift(); }
  render(); };
window.hhScrOCheck=function(){ var O=S.or, q=S.qs[S.idx]; O.checked=true; var ok=O.slots.filter(function(k,j){ return k===j; }).length, n=O.slots.length;
  if(ok===n){ var p=award(qPts(q)); S.roundPts=p; S.msg={ok:true,t:'ترتيب صحيح كامل · '+teamName(S.turn)+' +'+p}; roundDone(S.idx,true); passTurn(); }
  else S.msg={ok:false,t:ok+' من '+n+' في مكانه الصحيح'};
  render(); };
window.hhScrORetry=function(){ var O=S.or; O.slots=O.slots.map(function(k,j){ if(k!=null&&k!==j){ O.pool.push(k); return null; } return k; }); O.checked=false; S.msg=null; passTurn(); render(); };
function revealRound(){
  var i=S.idx, q=S.qs[i];
  if(S.tpl==='match'&&S.m){ pairsOf(q).forEach(function(_,k){ if(S.m.done[k]==null) S.m.done[k]=-1; }); S.m.sel=null; }
  if(S.tpl==='memory'&&S.mm){ pairsOf(q).forEach(function(_,k){ if(S.mm.got[k]==null) S.mm.got[k]=-1; }); S.mm.up=[]; }
  if(S.tpl==='order'&&S.or){ S.or.slots=itemsOf(q).map(function(_,k){ return k; }); S.or.pool=[]; S.or.checked=true; }
  if(!S.res[i]){ var got=(S.roundPts||0); S.res[i]={ok:got>0,team:S.turn,pts:got}; S.roundPts=0; }
  S.rev=true; stopTimer(); S.msg={t:'الإجابة الكاملة ظاهرة'}; render();
}

/* ── الأفعال ── */
function openQ(i){ initRound(i); S.open=i; S.rev=false; if(TPL[S.tpl].seq) S.idx=i; render(); var q=S.qs[i]; startTimer((q.type==='open'||S.tpl==='memory')?0:qTime(q)); if(q.type==='open'||S.tpl==='memory') stopTimer(); }
window.hhScrOpen=function(i){ if(S.res[i]&&S.tpl!=='flip') return; if(S.res[i]){ S.open=i; S.rev=true; render(); return; } openQ(i); };
window.hhScrClose=function(){ stopTimer(); S.open=null; S.rev=false; render(); if(S.tpl!=='wheel'&&!TPL[S.tpl].seq&&Object.keys(S.res).length===S.qs.length) setTimeout(function(){ if(S&&!S.ended) hhScrEnd(); },400); };
window.hhScrReveal=function(){ if(S.open==null) return; if(S.tpl==='match'||S.tpl==='memory'||S.tpl==='order'){ revealRound(); return; } S.rev=true; stopTimer(); var q=S.qs[S.open]; if(q.type==='open') S.ptsShown[S.open]=ptsOf(q).length; render(); };
window.hhScrPt=function(i,k){ var q=S.qs[i]; var cur2=S.ptsShown[i]||0; S.ptsShown[i]=Math.max(cur2,k+1); if(S.ptsShown[i]>=ptsOf(q).length) S.rev=true; render(); };
window.hhScrJudge=function(i,ok){
  var q=S.qs[i];
  if(ok===1){ var p=qPts(q); S.teams[S.turn].score+=p; S.res[i]={ok:true,team:S.turn,pts:p}; advanceTurn(); }
  else if(ok===0){ S.tried[i]=(S.tried[i]||[]).concat([S.turn]); var nt=nextTeam(i); S.tried[i]=S.tried[i]; if(nt>-1){ S.turn=nt; } render(); return; }
  else { S.res[i]={ok:false,team:S.turn,pts:0}; advanceTurn(); }
  S.rev=true; render();
};
window.hhScrScore=function(i,k){ var q=S.qs[i]; var p=k*ptPer(q); if(k>=ptsOf(q).length) p=qPts(q); S.teams[S.turn].score+=p; S.res[i]={ok:k>0,team:S.turn,pts:p}; S.rev=true; S.ptsShown[i]=ptsOf(q).length; advanceTurn(); render(); };
function advanceTurn(){ if(S.teams.length>1) S.turn=(S.turn+1)%S.teams.length; }
window.hhScrTurn=function(){ if(S.teams.length>1){ S.turn=(S.turn+1)%S.teams.length; render(); } };
window.hhScrAdj=function(t,d){ S.teams[t].score=Math.max(0,S.teams[t].score+d*S.base); render(); };
window.hhScrNav=function(d){
  var n=S.qs.length; var j=S.idx+d;
  if(j>=n){ hhScrEnd(); return; } if(j<0) return;
  S.hide={}; openQ(j); S.open=j; if(S.res[j]){ if(S.tpl==='match'||S.tpl==='memory'||S.tpl==='order'){ revealRound(); S.msg=null; render(); return; } S.rev=true; stopTimer(); render(); }
};
window.hhScrNextOpen=function(){
  if(S.tpl==='wheel'){ if(S.open!=null){ hhScrClose(); return; } hhScrSpin(); return; }
  if(S.open!=null){ if(!S.rev){ hhScrReveal(); return; } hhScrClose(); return; }
  for(var i=0;i<S.qs.length;i++){ if(!S.res[i]){ hhScrOpen(i); return; } } hhScrEnd();
};
window.hhScrSpin=function(){
  if(S.spinning) return; var rem=S.qs.map(function(_,i){ return i; }).filter(function(i){ return !S.res[i]; }); if(!rem.length){ hhScrEnd(); return; }
  var k=Math.floor(Math.random()*rem.length), seg=360/rem.length;
  var target=360*5 + (360 - (k*seg + seg/2)); var base=Math.ceil(S.wheelRot/360)*360; S.wheelRot=base+target;
  var sv=document.querySelector('#hh-scr .whw svg'); if(!sv){ openQ(rem[k]); return; }
  S.spinning=true; void sv.getBoundingClientRect(); sv.style.transition='transform 4.2s cubic-bezier(.17,.67,.12,1)'; sv.style.transform='rotate('+S.wheelRot+'deg)';
  setTimeout(function(){ if(!S) return; S.spinning=false; openQ(rem[k]); }, 4300);
};
window.hhScrLife=function(k){
  var t=S.teams[S.turn]; if(!t.life[k]) return; var i=S.idx, q=S.qs[i];
  if(k==='fifty'){ if(q.type!=='mcq') return; var c=(q.correct||[0])[0]; var wrong=(q.opts||[]).map(function(o,j){ return j; }).filter(function(j){ return j!==c&&String(q.opts[j]||'').trim(); }).sort(function(){ return Math.random()-.5; }).slice(0,2); S.hide[i]=wrong; }
  if(k==='time'){ S.tLeft+=15; S.tTotal+=15; if(!S.tOn&&!S.rev){ S.tOn=true; clearInterval(S.tIv); S.tIv=setInterval(function(){ if(!S||!S.tOn) return; S.tLeft=Math.max(0,S.tLeft-1); paintClock(); if(S.tLeft<=0){ S.tOn=false; clearInterval(S.tIv); } },1000); } }
  if(k==='ask'){ toastX('يستشير '+t.name+' فريقاً آخر لمدة 20 ثانية','info'); }
  t.life[k]=false; render();
};
window.hhScrPick=function(){
  if(!S.roster.names.length){
    var raw=prompt('الصق أسماء الطلاب، اسم في كل سطر أو مفصولة بفواصل:'); if(!raw) return;
    S.roster.names=raw.split(/[\n,،]+/).map(function(x){ return x.trim(); }).filter(Boolean); S.roster.label='قائمة ملصوقة'; if(!S.roster.names.length) return;
  }
  var left=S.roster.names.filter(function(n){ return !S.roster.picked[n]; }); if(!left.length){ S.roster.picked={}; left=S.roster.names.slice(); toastX('اختير الجميع · تبدأ دورة جديدة','info'); }
  var final=left[Math.floor(Math.random()*left.length)]; var steps=0;
  S.pick={name:left[0],spin:true}; render();
  var iv=setInterval(function(){ if(!S){ clearInterval(iv); return; } steps++; S.pick.name=left[Math.floor(Math.random()*left.length)]; var b=document.querySelector('#hh-scr .pick b'); if(b) b.textContent=S.pick.name; if(steps>12){ clearInterval(iv); S.pick={name:final,spin:false}; S.roster.picked[final]=true; render(); } },90);
};
window.hhScrPickClose=function(){ S.pick=null; render(); };
window.hhScrPickRes=function(ok){
  var n=S.pick&&S.pick.name; if(!n) return; var t=S.roster.tally[n]=S.roster.tally[n]||{ok:0,no:0}; if(ok) t.ok++; else t.no++;
  var i=(S.open!=null)?S.open:(TPL[S.tpl].seq?S.idx:null);
  S.pick=null;
  if(ok&&i!=null&&!S.res[i]){ var q=S.qs[i]; if(q.type==='open'){ S.rev=true; S.ptsShown[i]=ptsOf(q).length; render(); return; } S.rev=true; stopTimer(); hhScrJudge(i,1); return; }
  render();
};
window.hhScrEnd=function(){ stopTimer(); S.open=null; S.pick=null; S.ended=true; render(); };
window.hhScrAgain=function(){ S.ended=false; renderSetup(); };
window.hhScrFull=function(){ var r=document.getElementById('hh-scr'); try{ if(document.fullscreenElement) document.exitFullscreen(); else if(r&&r.requestFullscreen) r.requestFullscreen(); }catch(e){} };
function onKey(e){
  if(!S||!document.getElementById('hh-scr')) return;
  var tg=e.target&&e.target.tagName; if(tg==='INPUT'||tg==='TEXTAREA'||tg==='SELECT') return;
  var k=e.key;
  if(k==='Escape'){ e.preventDefault(); if(S.pick){ hhScrPickClose(); return; } if(S.stage==='play'&&S.open!=null&&!TPL[S.tpl].seq){ hhScrClose(); return; } if(document.fullscreenElement) return; hhScrExit(); return; }
  if(S.stage!=='play'||S.ended) return;
  if(k===' '||k==='Enter'||k==='ArrowLeft'||k==='PageDown'){ e.preventDefault(); if(TPL[S.tpl].seq){ if(!S.rev){ hhScrReveal(); } else hhScrNav(1); } else hhScrNextOpen(); return; }
  if(k==='ArrowRight'||k==='PageUp'){ e.preventDefault(); if(TPL[S.tpl].seq) hhScrNav(-1); return; }
  var c=(k||'').toLowerCase();
  if(c==='a'||c==='ش'){ e.preventDefault(); hhScrReveal(); }
  else if(c==='s'||c==='س'){ e.preventDefault(); hhScrPick(); }
  else if(c==='t'||c==='ف'){ e.preventDefault(); hhScrTurn(); }
  else if(c==='f'||c==='ب'){ e.preventDefault(); hhScrFull(); }
}
window._hhScr=function(){ return S; };
})();
