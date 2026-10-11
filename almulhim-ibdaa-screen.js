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
  '#hh-scr .boxes.dense{gap:clamp(6px,.6vw,12px);} #hh-scr .boxes.dense .bx{font-size:clamp(15px,1.5vw,30px);border-width:2px;border-radius:clamp(8px,.7vw,14px);min-height:34px;} #hh-scr .boxes.dense .bx.done small{display:none;}',
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
  '#hh-scr .a4 button.an{border:0;font-family:inherit;text-align:start;width:100%;cursor:pointer;box-shadow:0 6px 0 rgba(0,0,0,.2);transition:transform .1s,box-shadow .1s;}',
  '#hh-scr .a4 button.an:hover{transform:translateY(-2px);box-shadow:0 8px 0 rgba(0,0,0,.2);} #hh-scr .a4 button.an:active{transform:translateY(3px);box-shadow:0 2px 0 rgba(0,0,0,.2);}',
  '#hh-scr .a4 button.an:focus-visible{outline:4px solid #B8924A;outline-offset:3px;}',
  '#hh-scr .a4 .an.x{background:#F3EDED;color:#9B8B8B;text-decoration:line-through;box-shadow:inset 0 0 0 3px #B3261E;opacity:1;cursor:default;}',
  '#hh-scr .a4 .an.x i{background:#E4D9D9;color:#B3261E;} #hh-scr .a4 .an .xk{margin-inline-start:auto;width:42px;height:42px;border-radius:50%;background:#B3261E;color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
  '#hh-scr .aw .wm{color:#B3261E;font-weight:800;} #hh-scr .aw .hn{color:#6B5A4E;font-weight:700;} #hh-scr .aw .cb.sm{min-height:0;padding:6px 14px;font-size:.8em;}',
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
  ].join('\n')+'\n'+"#hh-scr-fx{position:fixed;inset:0;pointer-events:none;z-index:100070;}\n#hh-scr .hh-sfx-btn{display:inline-flex;align-items:center;gap:8px;height:44px;padding:0 14px;border-radius:12px;border:1.5px solid rgba(233,215,174,.5);background:rgba(255,255,255,.08);color:#F5E6C4;font-weight:800;font-size:14px;white-space:nowrap;}\n#hh-scr .hh-sfx-btn .w{opacity:.25;} #hh-scr .hh-sfx-btn.on{background:rgba(233,215,174,.18);border-color:#E9D7AE;} #hh-scr .hh-sfx-btn.on .w{opacity:1;}\n@media (max-width:1100px){ #hh-scr .hh-sfx-btn span{display:none;} }\n#hh-scr .tm{position:relative;transition:transform .35s cubic-bezier(.2,.9,.3,1.2),box-shadow .35s;}\n#hh-scr .tm.on{transform:translateY(3px);box-shadow:0 0 0 4px rgba(233,215,174,.45),0 10px 24px rgba(0,0,0,.28);}\n#hh-scr .tm.on::before{content:\"دوره الآن\";position:absolute;top:-11px;right:14px;background:#E6CE8E;color:#3D0918;font-size:11px;font-weight:900;border-radius:99px;padding:0 9px;line-height:18px;}\n#hh-scr .tm b{position:relative;}\n#hh-scr .hh-fl{position:absolute;inset-inline-start:0;top:-8px;color:#2F6A4E;background:#fff;border-radius:99px;padding:0 8px;font-size:clamp(15px,1.2vw,22px);font-weight:900;animation:hhFl 1.2s ease-out forwards;pointer-events:none;box-shadow:0 4px 10px rgba(0,0,0,.2);}\n@keyframes hhFl{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-34px)}}\n#hh-scr .clock.hot b{color:#FFD7D2;animation:hhPulse .6s infinite;} #hh-scr .clock.hot{background:conic-gradient(#E35D4F var(--p,100%),rgba(255,255,255,.18) 0);}\n@keyframes hhPulse{50%{transform:scale(1.12)}}\n/* لوحة الصناديق الجديدة */\n#hh-scr .ut{display:flex;gap:10px;flex-shrink:0;}\n#hh-scr .ut button{flex:1;min-width:0;background:#fff;border:2px solid #E7DAC0;border-radius:16px;padding:8px 12px;text-align:start;display:flex;flex-direction:column;gap:2px;}\n#hh-scr .ut button b{font-size:clamp(13px,1vw,18px);color:#3D0918;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;} #hh-scr .ut button small{font-size:clamp(11px,.8vw,14px);font-weight:800;color:#8A7A63;}\n#hh-scr .ut button i{display:block;height:6px;border-radius:99px;background:#F0E6D3;overflow:hidden;margin-top:4px;} #hh-scr .ut button i em{display:block;height:100%;background:var(--u);}\n#hh-scr .ut button.on{border-color:var(--u);box-shadow:0 0 0 4px color-mix(in srgb,var(--u) 20%,transparent);background:color-mix(in srgb,var(--u) 6%,#fff);}\n#hh-scr .bands{flex:1;min-height:0;display:flex;flex-direction:column;gap:clamp(8px,1.4vh,18px);}\n#hh-scr .band{flex:1;min-height:0;display:grid;grid-template-columns:clamp(110px,9vw,170px) minmax(0,1fr);gap:clamp(8px,.8vw,14px);}\n#hh-scr .band .bl{border-radius:18px;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;}\n#hh-scr .band .bl::after{content:\"\";position:absolute;inset:6px;border:1px solid rgba(255,255,255,.35);border-radius:13px;}\n#hh-scr .band .bl b{font-size:clamp(16px,1.4vw,26px);font-weight:900;text-align:center;line-height:1.2;} #hh-scr .band .bl span{font-size:clamp(26px,2.4vw,46px);font-weight:900;line-height:1.05;color:#FFE9B0;} #hh-scr .band .bl small{font-weight:800;font-size:clamp(11px,.85vw,15px);opacity:.9;}\n#hh-scr .b-easy .bl,#hh-scr .b-tf .bl{background:linear-gradient(160deg,#3D6B53,#2C5340);} #hh-scr .b-med .bl,#hh-scr .b-mcq .bl{background:linear-gradient(160deg,#B8924A,#8A6D2E);} #hh-scr .b-hard .bl,#hh-scr .b-open .bl{background:linear-gradient(160deg,#8A1538,#5E0E26);}\n#hh-scr .bx2g{display:grid;gap:clamp(6px,.6vw,12px);grid-template-columns:repeat(var(--c,8),minmax(0,1fr));grid-auto-rows:minmax(0,1fr);min-height:0;flex:1;}\n#hh-scr .bands .bx2g{align-items:center;} #hh-scr .bands .bx2{height:100%;max-height:clamp(70px,16vh,200px);} #hh-scr .bx2g > .bx2{max-height:clamp(70px,22vh,240px);height:100%;} #hh-scr .bx2g{align-items:center;}\n#hh-scr .bx2{position:relative;min-height:48px;border-radius:clamp(10px,1vw,18px);background:linear-gradient(160deg,#8A1538,#5E0E26);border:3px solid #B8924A;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;overflow:hidden;box-shadow:0 6px 14px rgba(94,14,38,.18);transition:transform .15s;padding:0;}\n#hh-scr .bx2 b{font-size:clamp(20px,2.2vw,44px);font-weight:900;line-height:1;} #hh-scr .bx2 small{font-size:clamp(10px,.75vw,14px);font-weight:800;color:#E6CE8E;}\n#hh-scr button.bx2::after{content:\"\";position:absolute;top:-60%;left:-60%;width:35%;height:220%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent);transform:rotate(20deg);animation:hhShine2 4.5s ease-in-out infinite;}\n#hh-scr button.bx2:nth-child(3n)::after{animation-delay:1.2s;} #hh-scr button.bx2:nth-child(3n+1)::after{animation-delay:2.4s;}\n@keyframes hhShine2{0%,62%{left:-60%}100%{left:150%}}\n#hh-scr button.bx2:hover{transform:translateY(-3px);} #hh-scr button.bx2:focus-visible{outline:4px solid #E6CE8E;outline-offset:2px;}\n#hh-scr .bx2.flip{animation:hhFlip .38s ease-in forwards;} @keyframes hhFlip{to{transform:perspective(600px) rotateY(90deg) scale(1.08);opacity:.4}}\n#hh-scr .bx2 .kt{position:absolute;top:5px;left:5px;width:clamp(18px,1.4vw,26px);height:clamp(18px,1.4vw,26px);border-radius:7px;background:rgba(255,255,255,.95);color:#8A1538;display:grid;place-items:center;} #hh-scr .bx2 .kt svg{width:70%;height:70%;}\n#hh-scr .bx2.dn{background:#fff;border:2px dashed var(--t);color:var(--t);box-shadow:none;} #hh-scr .bx2.dn b{font-size:clamp(12px,1vw,20px);text-align:center;padding:0 4px;} #hh-scr .bx2.dn small{color:var(--t);}\n#hh-scr .bx2.nn{background:#fff;border:2px dashed #CDBFA6;color:#A89A82;box-shadow:none;} #hh-scr .bx2.nn b{font-size:clamp(12px,.95vw,18px);} #hh-scr .bx2.nn small{color:#A89A82;}\n/* السؤال بملء الشاشة */\n#hh-scr .ov.big{padding:0;background:radial-gradient(ellipse at 50% 0%,rgba(230,206,142,.25),transparent 60%),#F5F1E8;animation:hhPop .35s cubic-bezier(.2,.9,.3,1.15);}\n@keyframes hhPop{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:none}}\n#hh-scr .sx-card.big{width:100%;height:100%;max-height:none;border-radius:0;box-shadow:none;border-top:0;background:transparent;padding:clamp(12px,2.2vh,30px) clamp(16px,3vw,60px);display:flex;flex-direction:column;gap:clamp(10px,1.6vh,22px);}\n#hh-scr .qtop{display:flex;align-items:center;gap:12px;flex-wrap:wrap;}\n#hh-scr .qtop .ch{height:clamp(40px,5vh,58px);border-radius:14px;border:2px solid #E7DAC0;background:#fff;font-weight:900;font-size:clamp(14px,1.15vw,22px);display:inline-flex;align-items:center;padding:0 16px;gap:8px;color:#3D0918;}\n#hh-scr .qtop .ch.tn2{background:var(--a);border-color:var(--a);color:#fff;} #hh-scr .qtop .ch.pt{background:#FBF1DA;border-color:#C98A1B;color:#8A5A10;} #hh-scr .qtop .ch.un{border-color:var(--u,#E7DAC0);}\n#hh-scr .qtop .clock{margin-inline-start:auto;width:clamp(70px,7vw,130px);height:clamp(70px,7vw,130px);background:conic-gradient(#8A1538 var(--p,100%),#EDE3CF 0);} #hh-scr .qtop .clock b{font-size:clamp(26px,2.8vw,54px);background:#fff;color:#3D0918;} #hh-scr .qtop .clock.hot{background:conic-gradient(#E35D4F var(--p,100%),#EDE3CF 0);} #hh-scr .qtop .clock.hot b{color:#B3261E;} #hh-scr .qtop .clock.off{opacity:.5;}\n#hh-scr .sx-card.big .qbx{justify-content:safe center;background:#fff;border:2.5px solid #B8924A;border-radius:26px;padding:clamp(16px,3vh,40px) clamp(16px,3vw,56px);position:relative;flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column;justify-content:safe center;}\n#hh-scr .sx-card.big .qbx::before{content:\"\";position:absolute;inset:8px;border:1px solid rgba(184,146,74,.35);border-radius:19px;pointer-events:none;}\n#hh-scr .sx-card.big .qn{position:absolute;top:12px;right:50%;transform:translateX(50%);background:#5E0E26;color:#F5E6C4;font-weight:900;font-size:clamp(13px,1vw,18px);border-radius:99px;padding:3px 16px;}\n#hh-scr .sx-card.big h2.q{font-size:clamp(28px,3.3vw,66px);text-align:center;line-height:1.45;margin:0 0 clamp(14px,2.4vh,30px);font-weight:900;}\n#hh-scr .sx-card.big .a4 .an{min-height:clamp(70px,11vh,124px);font-size:clamp(20px,2vw,40px);border-radius:22px;}\n#hh-scr .sx-card.big .a4 .an i{width:clamp(44px,3.6vw,70px);height:clamp(44px,3.6vw,70px);}\n#hh-scr .sx-card.big .pts li{font-size:clamp(20px,1.9vw,38px);}\n#hh-scr .sx-card.big .aw .cb{height:clamp(48px,6vh,64px);font-size:clamp(15px,1.1vw,21px);}\n#hh-scr .a4 .an.ok{animation:hhGlow 1.1s ease-out;} @keyframes hhGlow{0%{box-shadow:0 0 0 5px #fff,0 0 0 9px #2F6A4E,0 0 0 9px rgba(47,106,78,.5)}100%{box-shadow:0 0 0 5px #fff,0 0 0 9px #2F6A4E,0 0 0 30px rgba(47,106,78,0)}}\n#hh-scr .a4 .an.x{animation:hhScrShake .4s;}\n/* الافتتاحية والسلسلة */\n#hh-scr .hh-intro{position:absolute;inset:0;z-index:30;background:radial-gradient(circle at 50% 30%,rgba(234,217,176,.22),transparent 55%),linear-gradient(150deg,#7A1230,#5A0A1E 55%,#2A0810);display:flex;align-items:center;justify-content:center;color:#fff;cursor:pointer;transition:opacity .4s;}\n#hh-scr .hh-intro.out{opacity:0;}\n#hh-scr .hh-intro .in{text-align:center;padding:4vh 4vw;border:1.5px solid rgba(230,206,142,.5);border-radius:28px;position:relative;animation:hhPop .6s cubic-bezier(.2,.9,.3,1.2);}\n#hh-scr .hh-intro small{color:#E6CE8E;font-weight:800;font-size:clamp(14px,1.2vw,22px);} #hh-scr .hh-intro b{display:block;font-size:clamp(34px,4.4vw,86px);font-weight:900;margin:6px 0 22px;}\n#hh-scr .hh-intro .tms{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;} #hh-scr .hh-intro .tms span{display:inline-flex;align-items:center;gap:10px;background:#fff;color:#3D0918;border-radius:16px;padding:10px 20px;font-size:clamp(17px,1.6vw,30px);font-weight:900;opacity:0;animation:hhIn .5s cubic-bezier(.2,.9,.3,1.3) forwards;} #hh-scr .hh-intro .tms i{width:16px;height:16px;border-radius:50%;background:var(--a);}\n@keyframes hhIn{from{opacity:0;transform:translateY(24px) scale(.9)}to{opacity:1;transform:none}}\n#hh-scr .hh-stk{position:absolute;top:clamp(80px,11vh,120px);left:50%;transform:translateX(-50%);z-index:20;background:linear-gradient(135deg,#C2410C,#8A1538);color:#fff;border-radius:99px;padding:10px 22px;font-weight:900;font-size:clamp(16px,1.4vw,26px);display:flex;gap:10px;align-items:center;box-shadow:0 14px 30px rgba(138,21,56,.35);animation:hhIn .45s cubic-bezier(.2,.9,.3,1.4);transition:opacity .4s;}\n#hh-scr .hh-stk.out{opacity:0;}\n/* منصة النهاية */\n#hh-scr .rk div{opacity:0;animation:hhIn .55s cubic-bezier(.2,.9,.3,1.2) forwards;} #hh-scr .rk div:nth-child(1){animation-delay:.9s;} #hh-scr .rk div:nth-child(2){animation-delay:.55s;} #hh-scr .rk div:nth-child(3){animation-delay:.3s;} #hh-scr .rk div:nth-child(4){animation-delay:.1s;}\n#hh-scr .rk div.w{transform-origin:center;box-shadow:0 0 0 4px #E6CE8E,0 16px 34px rgba(94,14,38,.3);}\n/* الأسئلة الإضافية */\n#hh-scr .xq{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.6fr);gap:12px;}\n#hh-scr .xq .bk{border:1.5px solid #E7DAC0;border-radius:16px;padding:14px 16px;background:#FFFDF8;display:flex;flex-direction:column;gap:4px;}\n#hh-scr .xq .bk.core{background:linear-gradient(160deg,#FFFFFF,#F5EEDF);border-color:#B8924A;}\n#hh-scr .xq .hdx{display:flex;align-items:center;gap:8px;font-weight:900;font-size:15.5px;color:#3D0918;} #hh-scr .xq .hdx svg{color:#8A6D2E;}\n#hh-scr .xq .big{font-size:36px;font-weight:900;color:#5E0E26;line-height:1.1;}\n#hh-scr .xq small{display:block;font-weight:700;color:#8A7A63;font-size:13px;line-height:1.7;}\n#hh-scr .xq .nm{display:flex;align-items:center;gap:8px;margin:8px 0;}\n#hh-scr .xq .nm button{width:44px;height:44px;border-radius:12px;border:1.5px solid #B8924A;background:#fff;font-size:24px;font-weight:900;color:#5E0E26;}\n#hh-scr .xq .nm input{width:96px;height:44px;border:2px solid #5E0E26;border-radius:12px;text-align:center;font-family:Cairo;font-size:22px;font-weight:900;color:#5E0E26;}\n#hh-scr .xq .nm span{font-weight:700;font-size:13px;color:#8A7A63;}\n#hh-scr .xq .un{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;}\n#hh-scr .xq .un label{display:flex;align-items:center;gap:6px;font-weight:800;font-size:13px;color:#3D2A16;border:1.5px solid #E7DAC0;border-radius:10px;padding:6px 8px;background:#fff;cursor:pointer;}\n#hh-scr .xq .un input{accent-color:#5E0E26;width:16px;height:16px;} #hh-scr .xq .un em{font-style:normal;margin-inline-start:auto;color:#8A7A63;}\n#hh-scr .xq .tot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:10px;padding-top:10px;border-top:1px dashed #D9C08A;font-weight:900;color:#3D0918;} #hh-scr .xq .tot b{font-size:20px;color:#2C5340;}\n#hh-scr .ctl .cb.gd{background:linear-gradient(135deg,#B8924A,#8A6D2E);color:#fff;border-color:#8A6D2E;}\n#hh-scr .rnum{display:flex;align-items:center;gap:8px;margin-top:8px;font-weight:800;color:#3D2A16;} #hh-scr .rnum input{width:90px;height:44px;border:1.5px solid #E7DAC0;border-radius:12px;text-align:center;font-family:Cairo;font-size:18px;font-weight:900;}\n@media (max-width:900px){ #hh-scr .xq{grid-template-columns:1fr;} #hh-scr .xq .un{grid-template-columns:1fr 1fr;} #hh-scr .band{grid-template-columns:84px minmax(0,1fr);} #hh-scr .ut{overflow-x:auto;} #hh-scr .ut button{flex:0 0 150px;} }\n@media (prefers-reduced-motion:reduce){ #hh-scr *{animation:none!important;transition:none!important;} #hh-scr .rk div{opacity:1;} }\n@media (max-width:700px){ #hh-scr .bands .bx2g{grid-template-columns:repeat(4,minmax(0,1fr)) !important;grid-auto-rows:minmax(54px,auto);} #hh-scr .band{grid-template-columns:66px minmax(0,1fr);} #hh-scr .bands{overflow:auto;} #hh-scr .band{flex:0 0 auto;} #hh-scr .bands .bx2{max-height:none;height:58px;} #hh-scr .sx-card.big{padding:10px 12px;} #hh-scr .sx-card.big h2.q{font-size:21px;margin-bottom:12px;} #hh-scr .sx-card.big .a4 .an{min-height:54px;font-size:17px;} #hh-scr .sx-card.big .a4 .an i{width:36px;height:36px;} #hh-scr .qtop .ch{height:34px;font-size:13px;padding:0 10px;} #hh-scr .qtop .clock{width:56px;height:56px;} #hh-scr .qtop .clock b{font-size:20px;} #hh-scr .sx-card.big .qbx{padding:40px 12px 14px;justify-content:flex-start;} #hh-scr .sx-card.big .pts li{font-size:17px;} }\n";
  document.head.appendChild(st);
}

/* ═══ zzzzzzcc · الأصوات والحركات، ولوحة الصناديق الجديدة، والأسئلة الإضافية ═══ */
var SFX_N=['open','select','success','error','unlock','progress-step','streak','forward','achievement'];
window.hhSfx=window.hhSfx||(function(){
  var cache={}, on=true, vol=.6;
  try{ var v=localStorage.getItem('hh_sfx_on'); if(v==='0') on=false; var w=parseFloat(localStorage.getItem('hh_sfx_vol')); if(w>0&&w<=1) vol=w; }catch(e){}
  function src(n){ return 'sfx/'+n+'.mp3'; }
  function play(n){ if(!on||SFX_N.indexOf(n)<0) return; try{ var a=cache[n]; if(!a){ a=cache[n]=new Audio(src(n)); a.preload='auto'; } var b=a.cloneNode(); b.volume=vol; var p=b.play(); if(p&&p.catch) p.catch(function(){}); }catch(e){} }
  function preload(){ SFX_N.forEach(function(n){ if(!cache[n]){ try{ cache[n]=new Audio(src(n)); cache[n].preload='auto'; }catch(e){} } }); }
  function set(v){ on=!!v; try{ localStorage.setItem('hh_sfx_on',on?'1':'0'); }catch(e){} document.querySelectorAll('.hh-sfx-btn').forEach(function(b){ b.classList.toggle('on',on); b.setAttribute('aria-pressed',on?'true':'false'); var s=b.querySelector('span'); if(s) s.textContent=on?'الأصوات تعمل':'الأصوات صامتة'; }); }
  function setVol(v){ vol=Math.max(.05,Math.min(1,v)); try{ localStorage.setItem('hh_sfx_vol',String(vol)); }catch(e){} }
  function btn(){ return '<button type="button" class="hh-sfx-btn'+(on?' on':'')+'" aria-pressed="'+(on?'true':'false')+'" onclick="hhSfx.toggle()" title="المؤثرات الصوتية"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path class="w" d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg><span>'+(on?'الأصوات تعمل':'الأصوات صامتة')+'</span></button>'; }
  return { play:play, preload:preload, set:set, setVol:setVol, vol:function(){ return vol; }, isOn:function(){ return on; }, toggle:function(){ set(!on); if(on) play('select'); }, btn:btn };
})();
function sfx(n){ try{ hhSfx.play(n); }catch(e){} }
var RM=(function(){ try{ return window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){ return false; } })();
/* شرارات وقصاصات */
var FX={parts:[],run:false};
function fxCanvas(){ var r=document.getElementById('hh-scr'); if(!r) return null; var c=document.getElementById('hh-scr-fx'); if(!c){ c=document.createElement('canvas'); c.id='hh-scr-fx'; r.appendChild(c); } if(c.width!==innerWidth||c.height!==innerHeight){ c.width=innerWidth; c.height=innerHeight; } return c; }
function fxLoop(){ if(FX.run) return; FX.run=true; (function f(){ var c=fxCanvas(); if(!c){ FX.run=false; FX.parts=[]; return; } var x=c.getContext('2d'); x.clearRect(0,0,c.width,c.height);
  FX.parts=FX.parts.filter(function(p){ p.x+=p.vx; p.y+=p.vy; p.vy+=p.sq?0.03:0.2; p.l--; if(p.sq) p.r2+=.12; x.globalAlpha=Math.max(0,Math.min(1,p.l/40)); x.fillStyle=p.c; if(p.sq){ x.save(); x.translate(p.x,p.y); x.rotate(p.r2); x.fillRect(-p.r,-p.r/2,p.r*2,p.r); x.restore(); } else { x.beginPath(); x.arc(p.x,p.y,p.r,0,7); x.fill(); } return p.l>0&&p.y<c.height+40; });
  x.globalAlpha=1; if(FX.parts.length) requestAnimationFrame(f); else { FX.run=false; x.clearRect(0,0,c.width,c.height); } })(); }
function burstAt(el){ if(RM||!el) return; var r=el.getBoundingClientRect(); for(var i=0;i<38;i++){ var a=Math.random()*Math.PI*2, s=2+Math.random()*6; FX.parts.push({x:r.left+r.width/2,y:r.top+r.height/2,vx:Math.cos(a)*s,vy:Math.sin(a)*s-2,l:60,c:['#E6CE8E','#B8924A','#F5E6C4','#2F6A4E'][i%4],r:2+Math.random()*3.5}); } fxLoop(); }
function confetti(){ if(RM) return; for(var i=0;i<180;i++) FX.parts.push({x:Math.random()*innerWidth,y:-20-Math.random()*260,vx:(Math.random()-.5)*2,vy:2+Math.random()*3,l:240,c:['#E6CE8E','#B8924A','#8A1538','#F5E6C4','#ffffff'][i%5],r:3+Math.random()*4,sq:1,r2:Math.random()*6}); fxLoop(); }
function floatPts(t,p){ if(!p) return; setTimeout(function(){ var el=document.querySelector('#hh-scr .teams .tm[data-t="'+t+'"] b'); if(!el) return; var f=document.createElement('span'); f.className='hh-fl'; f.textContent='+'+p; el.appendChild(f); setTimeout(function(){ f.remove(); },1300); },40); }
/* صفوف الصناديق: بالنوع في اللعبة المنوّعة، وبالصعوبة في غيرها */
var BANDS={type:[['tf','صح أم خطأ',.5],['mcq','اختيار من متعدد',1],['open','مقالي وترتيب',1.5]],diff:[['easy','سهل',.5],['med','متوسط',1],['hard','صعب',1.5]]};
var KT_ICO={mcq:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3" fill="currentColor"/>',tf:'<path d="M20 6 9 17l-5-5"/>',open:'<path d="M4 20h4L19 9l-4-4L4 16z"/>',order:'<path d="M8 4v16M8 20l-3-3M8 20l3-3M16 20V4M16 4l-3 3M16 4l3 3"/>'};
function ktOf(q){ return q.kt||(q.type==='tf'?'tf':q.type==='open'?'open':'mcq'); }
function bandKey(q){ if(S.bandMode==='type'){ var k=ktOf(q); return k==='order'?'open':k; } return q.diff||'med'; }
function bandMul(q){ var B=BANDS[S.bandMode]||[], k=bandKey(q); for(var i=0;i<B.length;i++) if(B[i][0]===k) return B[i][2]; return 1; }
function setupBands(){
  S.bandMode=null; S.units=[]; S.unitSel=null;
  if(S.tpl!=='boxes'||S.qs.length<4) return;
  var kts={}, dfs={}, nd=0; S.qs.forEach(function(q){ var k=ktOf(q); kts[k==='order'?'open':k]=1; if(q.diff){ dfs[q.diff]=1; nd++; } });
  if(Object.keys(kts).length>1) S.bandMode='type'; else if(nd===S.qs.length&&Object.keys(dfs).length>1) S.bandMode='diff';
  var seen={}; S.qs.forEach(function(q){ if(q.uk&&!seen[q.uk]){ seen[q.uk]=1; S.units.push({k:q.uk,n:q.un||q.uk,c:q.uc||'#5E0E26'}); } });
  if(S.units.length<2||S.qs.length<=12) S.units=[]; else S.unitSel=S.units[0].k;
}
function unitIdx(k){ return S.qs.map(function(_,i){ return i; }).filter(function(i){ return !k||S.qs[i].uk===k; }); }
function boxHTML(i){
  var q=S.qs[i], r=S.res[i], kt=ktOf(q), pts=qPts(q);
  var ic=S.bandMode==='type'||kt==='order'?'<span class="kt" title="'+(kt==='order'?'ترتيب':kt==='open'?'مقالي':kt==='tf'?'صح أم خطأ':'اختيار من متعدد')+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">'+KT_ICO[kt]+'</svg></span>':'';
  if(r) return r.ok?'<div class="bx2 dn" style="--t:'+S.teams[r.team].color+'"><b>'+esc(S.teams[r.team].name)+'</b><small>+'+r.pts+'</small></div>':'<div class="bx2 nn"><b>لم يُجب</b><small>رقم '+(i+1)+'</small></div>';
  return '<button type="button" class="bx2" id="hh-bx-'+i+'" onclick="hhScrBox('+i+')" aria-label="صندوق '+(i+1)+'، '+pts+' نقطة">'+ic+'<b>'+pts+'</b><small>'+(i+1)+'</small></button>';
}
function boxes2Body(){
  var idx=unitIdx(S.unitSel), h='';
  if(S.units.length){ h+='<div class="ut">'+S.units.map(function(u){ var all=unitIdx(u.k), left=all.filter(function(i){ return !S.res[i]; }).length; return '<button type="button" class="'+(S.unitSel===u.k?'on':'')+'" style="--u:'+u.c+'" onclick="hhScrUnit(\''+u.k+'\')"><b>'+esc(u.n)+'</b><small>'+(left?('بقي '+left+' من '+all.length):'انتهت')+'</small><i><em style="width:'+Math.round(100*(all.length-left)/Math.max(1,all.length))+'%"></em></i></button>'; }).join('')+'</div>'; }
  if(!S.bandMode){ var n=idx.length; return h+'<div class="bx2g" style="--c:'+cols(n,12)+'">'+idx.map(boxHTML).join('')+'</div>'; }
  var B=BANDS[S.bandMode];
  h+='<div class="bands">'+B.map(function(b){ var ii=idx.filter(function(i){ return bandKey(S.qs[i])===b[0]; }); if(!ii.length) return ''; var p=Math.round(S.base*b[2]);
    return '<div class="band b-'+b[0]+'"><div class="bl"><b>'+b[1]+'</b><span>'+p+'</span><small>نقطة</small></div><div class="bx2g" style="--c:'+Math.max(8,Math.min(15,ii.length))+'">'+ii.map(boxHTML).join('')+'</div></div>'; }).join('')+'</div>';
  return h;
}
window.hhScrUnit=function(k){ S.unitSel=k; sfx('select'); render(); };
window.hhScrBox=function(i){ if(!S||S.res[i]||S.open!=null) return; var b=document.getElementById('hh-bx-'+i); sfx('open'); if(b&&!RM){ b.classList.add('flip'); setTimeout(function(){ if(S) hhScrOpen(i); },360); } else hhScrOpen(i); };
window.hhScrRandom=function(){ if(!S||S.open!=null) return; var idx=unitIdx(S.unitSel).filter(function(i){ return !S.res[i]; }); if(!idx.length) idx=S.qs.map(function(_,i){ return i; }).filter(function(i){ return !S.res[i]; }); if(!idx.length){ hhScrEnd(); return; } var i=idx[Math.floor(Math.random()*idx.length)]; if(S.qs[i].uk&&S.units.length&&S.qs[i].uk!==S.unitSel){ S.unitSel=S.qs[i].uk; render(); } setTimeout(function(){ hhScrBox(i); },60); };
/* اختيار الأسئلة الإضافية في شاشة الإعداد */
function exUnitsS(){ var o=[], seen={}; (S.extras||[]).forEach(function(q){ if(q.uk&&!seen[q.uk]){ seen[q.uk]=1; o.push({k:q.uk,n:q.un||q.uk}); } }); o.forEach(function(u){ u.c=S.extras.filter(function(q){ return q.uk===u.k; }).length; }); return o; }
function exPool(){ return (S.extras||[]).filter(function(q){ return !S.exU||S.exU.indexOf(q.uk)>-1; }).length; }
function exUI(){
  if(!S.extras||!S.extras.length) return '';
  var U=exUnitsS(), P=exPool(); if(S.exN>P) S.exN=P; var core=S.all.length;
  return '<h3>الأسئلة</h3><div class="xq"><div class="bk core"><div class="hdx">'+ico('lock',18)+' الأساسية، ثابتة</div><div class="big">'+core+'</div><small>'+(core?'أسئلة بنك الأسئلة':'لا أسئلة أساسية لهذه اللعبة بعد')+'</small></div>'
    +'<div class="bk"><div class="hdx">'+ico('plus',18)+' أضف من بنك «مدرستي» (اختياري)</div><small>اكتب العدد الذي تريده، واختر الوحدات التي يأتي منها. تُوزَّع بالتساوي على الوحدات المختارة ومستويات الصعوبة.</small>'
    +'<div class="nm"><button type="button" data-xd="-1" aria-label="أنقص">−</button><input id="scr-exn" type="number" inputmode="numeric" min="0" max="'+P+'" value="'+S.exN+'" aria-label="عدد الأسئلة الإضافية"><button type="button" data-xd="1" aria-label="زد">+</button><span>من '+P+'</span></div>'
    +(U.length>1?'<div class="un">'+U.map(function(u){ return '<label><input type="checkbox" data-xu="'+u.k+'"'+(S.exU.indexOf(u.k)>-1?' checked':'')+'>'+esc(u.n)+'<em>'+u.c+'</em></label>'; }).join('')+'</div>':'')
    +'<div class="tot"><span>مجموع أسئلة اللعبة</span><b>'+plural(core+S.exN,'سؤال','أسئلة','سؤالاً')+'</b></div></div></div>';
}
function exBind(root){
  root.querySelectorAll('[data-xd]').forEach(function(b){ b.onclick=function(){ readNames(); var P=exPool(); S.exN=Math.max(0,Math.min(P,S.exN+(+b.getAttribute('data-xd'))*(P>40?5:1))); renderSetup(); }; });
  var inp=document.getElementById('scr-exn'); if(inp) inp.onchange=function(){ readNames(); S.exN=Math.max(0,Math.min(exPool(),parseInt(inp.value,10)||0)); renderSetup(); };
  root.querySelectorAll('[data-xu]').forEach(function(c){ c.onchange=function(){ readNames(); var k=c.getAttribute('data-xu'); S.exU=S.exU.filter(function(x){ return x!==k; }); if(c.checked) S.exU.push(k); renderSetup(); }; });
}
function chosenAll(){ var ex=(S.extras&&S.exN&&typeof window._hhIbPickExtras==='function')?window._hhIbPickExtras(S.extras,S.exN,S.exU):[]; var all=S.all.concat(ex); if(ex.length){ var D={easy:0,med:1,hard:2}; all=all.map(function(q,i){ return {q:q,i:i}; }).sort(function(a,b){ return ((D[a.q.diff]==null?1:D[a.q.diff])-(D[b.q.diff]==null?1:D[b.q.diff]))||(a.i-b.i); }).map(function(x){ return x.q; }); } return all; }
/* افتتاحية اللعبة */
function intro(){ if(RM) return; var r=document.getElementById('hh-scr'); if(!r) return; var d=document.createElement('div'); d.className='hh-intro'; d.innerHTML='<div class="in"><small>إبداع، على شاشة الصف</small><b>'+esc(S.g.title||'')+'</b><div class="tms">'+S.teams.map(function(t,i){ return '<span style="--a:'+t.color+';animation-delay:'+(.35+i*.18)+'s"><i></i>'+esc(t.name)+'</span>'; }).join('')+'</div></div>'; d.onclick=function(){ d.remove(); }; r.appendChild(d); sfx('forward'); setTimeout(function(){ if(d.parentNode){ d.classList.add('out'); setTimeout(function(){ d.remove(); },420); } },2100); }
/* السلسلة */
function streakHit(t,ok){ S.stk=S.stk||{}; if(!ok){ S.stk[t]=0; return; } S.stk[t]=(S.stk[t]||0)+1; if(S.stk[t]===3||S.stk[t]===5){ var n=S.stk[t]; setTimeout(function(){ sfx('streak'); var r=document.getElementById('hh-scr'); if(!r) return; var b=document.createElement('div'); b.className='hh-stk'; b.innerHTML='<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1 4.5 6 6 6 11a6 6 0 0 1-12 0c0-3 2-5 3-6 .3 2.3 1.5 3.5 3 3.5 0-3.5-1-6 0-8.5z"/></svg>'+esc(S.teams[t]?S.teams[t].name:'')+'، '+n+' إجابات صحيحة متتالية'; r.appendChild(b); setTimeout(function(){ b.classList.add('out'); setTimeout(function(){ b.remove(); },400); },2400); },700); } }

/* ── البدء ── */
window.hhScreenPlay=function(g, opt){
  style();
  var tpl=TPL[g.screenTpl]?g.screenTpl:'boxes';
  var Sx=g.settings||{};
  S={ g:g, all:(g.questions||[]).slice(), tpl:tpl, nTeams:Math.max(1,Math.min(4,parseInt(Sx.teams,10)||2)), names:null, base:parseInt(Sx.basePts,10)||20,
      roster:{mode:'none', n:0, label:'', code:'', picked:{}, tally:{}}, rooms:null, stage:'setup' };
  S.extras=(g.extras||[]).slice(); S.exU=[]; S.extras.forEach(function(q){ if(q.uk&&S.exU.indexOf(q.uk)<0) S.exU.push(q.uk); }); S.exN=S.all.length?0:S.extras.length;
  try{ hhSfx.preload(); }catch(e){}
  var root=document.getElementById('hh-scr'); if(root) root.remove();
  root=document.createElement('div'); root.id='hh-scr'; document.body.appendChild(root);
  document.addEventListener('keydown', onKey, true);
  try{ localStorage.removeItem('hh_scr_roster'); var rn=parseInt(localStorage.getItem('hh_scr_count'),10); if(rn>0){ S.roster.mode='count'; S.roster.n=rn; S.roster.label='الصف'; } }catch(e){} // zzzzzzcc: لا أسماء، أرقام فقط
  renderSetup();
  loadRooms();
};
function fitAll(){ return S.all.concat((S.extras||[]).slice(0,S.exN||0)); }
function fits(t){ return fitAll().filter(function(q){ return TPL[t].types.indexOf(q.type)>-1; }).length; }
async function loadRooms(){
  if(!uid()) return;
  try{ var qs=await db().collection('classrooms').where('teacherId','==',uid()).get(); var r=[]; qs.forEach(function(d){ var c=d.data(); if(c.active===false||c.archived) return; r.push({code:d.id,name:c.className||d.id,n:c.studentCount||0}); }); r.sort(function(a,b){ return a.name.localeCompare(b.name,'ar'); }); S.rooms=r; if(S.stage==='setup') renderSetup(); }catch(e){ S.rooms=[]; }
}
async function loadRoster(code){
  try{ var qs=await db().collection('classroom_students').where('classCode','==',code).where('active','==',true).get(); return qs.size||0; }catch(e){ return 0; }
}
/* أسماء محفوظة في جهاز المعلم فقط (اختيارية)، لا تُرفع إلى المنصة */
function localName(code,k){ try{ var m=JSON.parse(localStorage.getItem('hh_cls_local_'+code)||'{}'); return m[k]||''; }catch(e){ return ''; } }
function renderSetup(){
  var root=document.getElementById('hh-scr'); if(!root) return; S.stage='setup';
  var names=S.names||[]; var tnames=[]; for(var i=0;i<S.nTeams;i++) tnames.push(names[i]||(S.nTeams===1?'الصف':'فريق '+(i+1)));
  var rooms=S.rooms;
  var rosterUI='<div class="chs"><button class="'+(S.roster.mode==='none'?'on':'')+'" data-rm="none">بدون</button>'+(rooms&&rooms.length?rooms.map(function(r){ return '<button class="'+(S.roster.mode==='room'&&S.roster.code===r.code?'on':'')+'" data-room="'+esc(r.code)+'" data-name="'+esc(r.name)+'">'+esc(r.name)+(r.n?'، '+r.n:'')+'</button>'; }).join(''):'')+'<button class="'+(S.roster.mode==='count'?'on':'')+'" data-rm="count">عدد طلاب الصف</button></div>'
    +(S.roster.mode==='count'?'<div class="rnum">عدد الطلاب: <input id="scr-cnt" type="number" inputmode="numeric" min="1" max="60" value="'+(S.roster.n||'')+'" placeholder="28"></div>':'')
    +'<div class="rs">'+(S.roster.mode==='none'?'زر «اختر طالباً» يختار رقماً عشوائياً من كشف الصف، ويسألك عن عدد الطلاب عند أول استخدام.':S.roster.n?'يُختار رقم من 1 إلى '+S.roster.n+'، كل رقم مرة واحدة حتى ينتهي الجميع. لا تُحفظ أسماء الطلاب.':(S.roster.mode==='room'?'جارٍ تحميل عدد الطلاب…':'اكتب عدد طلاب الصف'))+(uid()?'':'، وسجّل الدخول لتظهر شُعبك هنا')+'</div>';
  root.innerHTML='<div class="sh"><div class="ti"><small>إبداع · على شاشة الصف</small><b>'+esc(S.g.title||'')+'</b></div><span style="flex:1"></span><button class="cb" style="height:44px" onclick="hhScrExit()">'+ico('x',18)+' إغلاق</button></div>'
   +'<div class="setup"><div class="sx-sp"><h1>جهّز العرض</h1><div class="sub">'+plural(fitAll().length,'سؤال','أسئلة','سؤالاً')+'، اختر القالب والفرق ثم ابدأ</div>'+exUI()
   +'<h3>القالب</h3><div class="tp5">'+Object.keys(TPL).map(function(k){ var f=fits(k); return '<button class="'+(S.tpl===k?'on':'')+'" '+(f?'':'disabled')+' data-tpl="'+k+'"><span class="i">'+ico(TPL[k].ico,20)+'</span><b>'+TPL[k].name+'</b><small>'+f+' من '+fitAll().length+' تناسبه</small></button>'; }).join('')+'</div>'
   +'<h3>الفرق</h3><div class="chs">'+[1,2,3,4].map(function(n){ return '<button class="'+(S.nTeams===n?'on':'')+'" data-tn="'+n+'">'+(n===1?'بلا فرق':n===2?'فريقان':n+' فرق')+'</button>'; }).join('')+'</div>'
   +(S.nTeams>1?'<div class="tn">'+tnames.map(function(t,i){ return '<label><i style="background:'+TC[i]+'"></i><input data-ti="'+i+'" value="'+esc(t)+'"></label>'; }).join('')+'</div>':'')
   +'<h3>اختيار الطالب</h3>'+rosterUI
   +'<div class="sx-go"><button class="cb" onclick="hhScrExit()">إلغاء</button><button class="cb p" onclick="hhScrStart()">'+ico('play',18)+' ابدأ العرض</button></div></div></div>';
  root.querySelectorAll('[data-tpl]').forEach(function(b){ b.onclick=function(){ S.tpl=b.getAttribute('data-tpl'); renderSetup(); }; });
  root.querySelectorAll('[data-tn]').forEach(function(b){ b.onclick=function(){ readNames(); S.nTeams=+b.getAttribute('data-tn'); renderSetup(); }; });
  root.querySelectorAll('[data-rm]').forEach(function(b){ b.onclick=function(){ readNames(); var m=b.getAttribute('data-rm'); if(m==='none'){ S.roster={mode:'none',n:0,label:'',code:'',picked:{},tally:{}}; } else { S.roster={mode:'count',n:S.roster.n||0,label:'الصف',code:'',picked:{},tally:{}}; } renderSetup(); }; });
  root.querySelectorAll('[data-room]').forEach(function(b){ b.onclick=async function(){ readNames(); var code=b.getAttribute('data-room'); var rr=(S.rooms||[]).filter(function(x){ return x.code===code; })[0]; S.roster={mode:'room',code:code,label:b.getAttribute('data-name'),n:0,picked:{},tally:{}}; renderSetup(); var n=await loadRoster(code); S.roster.n=n||(rr&&rr.n)||0; if(!S.roster.n) toastX('لا طلاب مسجّلون في هذه الشعبة بعد','info'); renderSetup(); }; });
  var cn=document.getElementById('scr-cnt'); if(cn) cn.addEventListener('input',function(){ var v=Math.max(0,Math.min(60,parseInt(cn.value,10)||0)); S.roster.n=v; var rs=root.querySelector('.rs'); if(rs) rs.textContent=v?'يُختار رقم من 1 إلى '+v+'، كل رقم مرة واحدة حتى ينتهي الجميع. لا تُحفظ أسماء الطلاب.':'اكتب عدد طلاب الصف'; });
  exBind(root);
}
function readNames(){ var r=document.getElementById('hh-scr'); if(!r) return; var n=S.names||[]; r.querySelectorAll('[data-ti]').forEach(function(i){ n[+i.getAttribute('data-ti')]=i.value.trim(); }); S.names=n; }
window.hhScrStart=function(){
  readNames();
  var qs=chosenAll().filter(function(q){ return TPL[S.tpl].types.indexOf(q.type)>-1; });
  if(!qs.length){ toastX('لا أسئلة تناسب هذا القالب','error'); return; }
  S.qs=qs; S.teams=[]; for(var i=0;i<S.nTeams;i++) S.teams.push({ name:(S.names&&S.names[i])||(S.nTeams===1?'الصف':'فريق '+(i+1)), score:0, color:TC[i], life:{fifty:true,time:true,ask:true} });
  S.stk={}; setupBands();
  S.turn=0; S.res={}; S.open=null; S.rev=false; S.tried={}; S.idx=0; S.hide={}; S.ptsShown={}; S.pick=null; S.ended=false; S.wrong={}; S.wmsg={}; S.manual={};
  try{ if(window.hhApplause) hhApplause.reset(); }catch(e){} // zzzzzzbv: التصفيق مغلق في بداية كل لعبة
  if(S.roster.mode==='count'&&S.roster.n){ try{ localStorage.setItem('hh_scr_count',String(S.roster.n)); }catch(e){} }
  S.roster.picked={}; S.roster.tally={};
  S.stage='play'; S.wheelRot=0;
  if(TPL[S.tpl].seq) openQ(0); else render();
  intro();
};
window.hhScrExit=function(){
  if(S&&S.stage==='play'&&!S.ended&&Object.keys(S.res).length&&!confirm('إنهاء العرض؟ ستضيع النقاط الحالية.')) return;
  stopTimer(); document.removeEventListener('keydown', onKey, true);
  try{ if(document.fullscreenElement) document.exitFullscreen(); }catch(e){}
  var r=document.getElementById('hh-scr'); if(r) r.remove(); S=null;
};

/* ── المؤقت ── */
function startTimer(sec){ stopTimer(); S.tTotal=sec; S.tLeft=sec; S.tOn=true; paintClock(); S.tIv=setInterval(function(){ if(!S||!S.tOn) return; S.tLeft=Math.max(0,S.tLeft-1); paintClock(); if(S.tLeft>0&&S.tLeft<=3) sfx('progress-step'); if(S.tLeft<=0){ S.tOn=false; clearInterval(S.tIv); } },1000); }
function stopTimer(){ if(S){ S.tOn=false; clearInterval(S.tIv); } }
function paintClock(){ if(!S) return; document.querySelectorAll('#hh-scr .clock').forEach(function(c){ var p=S.tTotal?Math.round(100*S.tLeft/S.tTotal):0; c.style.setProperty('--p',p+'%'); c.classList.toggle('end',S.tLeft<=0&&S.tTotal>0); c.classList.toggle('off',!S.tOn&&S.tLeft>0); c.classList.toggle('hot',S.tOn&&S.tLeft>0&&S.tLeft<=3); var b=c.querySelector('b'); if(b) b.textContent=S.tTotal?S.tLeft:'—'; }); }
function qTime(q){ var t=parseInt(q.time,10)||20; return q.flash?Math.max(5,Math.round(t/2)):t; }
function qPts(q){ var b=S.bandMode?Math.round(S.base*bandMul(q)):S.base; return b*(q.mult>1?q.mult:1)*(q.flash?2:1); }

/* ── الرسم ── */
function head(){
  var done=Object.keys(S.res).length, n=S.qs.length;
  var cnt=TPL[S.tpl].seq?('السؤال '+Math.min(S.idx+1,n)+' من '+n):(done+' من '+n);
  var teams='<div class="teams">'+S.teams.map(function(t,i){ return '<div class="tm '+(i===S.turn&&S.teams.length>1?'on':'')+'" data-t="'+i+'" style="--a:'+t.color+'"><i></i><span>'+esc(t.name)+'</span><b>'+t.score+'</b><div class="pm"><button title="+'+S.base+'" onclick="hhScrAdj('+i+',1)">'+ico('plus',13,2.6)+'</button><button title="-'+S.base+'" onclick="hhScrAdj('+i+',-1)">−</button></div></div>'; }).join('')+'</div>';
  return '<div class="sh"><div class="ti"><small>'+TPL[S.tpl].name+' · على شاشة الصف</small><b>'+esc(S.g.title||'')+'</b></div><span class="cnt">'+cnt+'</span>'+teams+hhSfx.btn()+(window.hhApplause?hhApplause.btn():'')+'<div class="clock off"><b>—</b></div></div>';
}
function ctl(){
  var seq=TPL[S.tpl].seq;
  if(S.tpl==='boxes') return '<div class="ctl">'+(S.open==null?'<button class="cb gd" onclick="hhScrRandom()">'+ico('dice',20)+' اختر صندوقاً عشوائياً</button>':'<button class="cb p" onclick="hhScrNextOpen()">'+(S.rev?ico('back',20)+' رجوع إلى الصناديق':ico('eye',20)+' أظهر الإجابة')+'</button>')
    +'<button class="cb" onclick="hhScrPick()">'+ico('dice',20)+' اختر طالباً</button>'
    +(S.teams.length>1?'<button class="cb" onclick="hhScrTurn()">'+ico('users',20)+' دور الفريق التالي</button>':'')
    +'<button class="cb r" onclick="hhScrEnd()">'+ico('award',20)+' إنهاء وإعلان الفائز</button>'
    +'<span class="kh"><kbd>R</kbd> عشوائي <kbd>A</kbd> الإجابة <kbd>T</kbd> الدور <kbd>S</kbd> طالب <kbd>F</kbd> ملء الشاشة</span><button class="cb" title="ملء الشاشة" onclick="hhScrFull()">'+EXP+'</button></div>';
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
  if(S.tpl==='boxes') body=boxes2Body();
  else if(S.tpl==='flip') body=flipBody();
  else if(S.tpl==='wheel') body=wheelBody();
  else if(S.tpl==='show') body=showBody();
  else if(S.tpl==='tfs') body=tfsBody();
  else if(S.tpl==='match') body=matchBody();
  else if(S.tpl==='memory') body=memBody();
  else if(S.tpl==='order') body=orderBody();
  var over='';
  if(S.open!=null && !TPL[S.tpl].seq) over=S.tpl==='boxes'?'<div class="ov big">'+bigCard(S.open)+'</div>':'<div class="ov" onclick="if(event.target===this)hhScrClose()">'+cardHTML(S.open)+'</div>';
  root.innerHTML=head()+'<div class="sx-body">'+body+over+pickHTML()+'</div>'+ctl();
  paintClock();
  if(S.tpl==='match') setTimeout(drawLines,0);
  if(S.tpl==='wheel'){ var sv=root.querySelector('.whw svg'); if(sv){ sv.style.transition='none'; sv.style.transform='rotate('+S.wheelRot+'deg)'; } }
}
function cols(n,max){ var c=n<=6?Math.min(n,3):n<=12?Math.min(6,Math.ceil(n/2)):n<=18?6:n<=24?8:10; return Math.min(c,max||10); }
function boxesBody(){ var n=S.qs.length, dn=n>60; return '<div class="boxes'+(dn?' dense':'')+'" style="--c:'+(dn?(window.innerWidth<700?6:15):cols(n))+'">'+S.qs.map(function(q,i){ var r=S.res[i]; if(r) return '<div class="bx done">'+(i+1)+'<small class="'+(r.ok?'':'x')+'">'+(r.ok?esc(S.teams[r.team].name)+' · +'+r.pts:'بلا إجابة')+'</small></div>'; return '<button class="bx" onclick="hhScrOpen('+i+')">'+(i+1)+'</button>'; }).join('')+'</div>'; }
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
  // zzzzzzbv: الخيارات قابلة للضغط · المتحكم يضغط إجابة الفريق فتُحكم تلقائياً
  var live=!r&&!S.res[i]&&!(S.manual&&S.manual[i]), wr=(S.wrong&&S.wrong[i])||[];
  h+='<div class="a4">'+opts.map(function(o,k){ if(q.type==='mcq'&&!String(o||'').trim()) return ''; var ok=(q.correct||[]).indexOf(k)>-1; var bad=wr.indexOf(k)>-1; var cls=r?(ok?'ok':(bad?'x':'no')):(bad?'x':''); if(!r&&S.hide[i]&&S.hide[i].indexOf(k)>-1) cls='gone';
    var inner2='<i>'+(q.type==='tf'?(k===0?ico('check',22,3):ico('x',22,3)):OS[k])+'</i>'+esc(o)+(r&&ok?'<em class="ck">'+ico('check',24,3)+'</em>':'')+(bad?'<em class="xk">'+ico('x',22,3)+'</em>':'');
    var sty=' style="--a:'+(q.type==='tf'?(k===0?'#3D6B53':'#B3261E'):OC[k])+'"';
    if(live&&!bad&&cls!=='gone') return '<button type="button" class="an cl"'+sty+' onclick="hhScrPickOpt('+i+','+k+')">'+inner2+'</button>';
    return '<div class="an '+cls+'"'+sty+'>'+inner2+'</div>'; }).join('')+'</div>';
  if(r&&q.note) h+='<div class="sx-note">'+esc(q.note)+'</div>';
  h+=judge(i);
  return h;
}
function bigCard(i){
  var q=S.qs[i], t=S.teams[S.turn], kt=ktOf(q), bl='';
  if(S.bandMode){ var B=BANDS[S.bandMode], k=bandKey(q); B.forEach(function(b){ if(b[0]===k) bl=b[1]; }); }
  var KN={mcq:'اختيار من متعدد',tf:'صح أم خطأ',open:'سؤال مقالي',order:'ترتيب'};
  var top='<div class="qtop">'+(S.teams.length>1?'<span class="ch tn2" style="--a:'+t.color+'">دور '+esc(t.name)+'</span>':'')
    +'<span class="ch pt">'+(S.bandMode==='diff'&&bl?bl+'، ':(kt!=='mcq'?KN[kt]+'، ':''))+qPts(q)+' نقطة'+(q.type==='open'?'، المعلم يحكم':'')+'</span>'
    +(q.un?'<span class="ch un" style="--u:'+(q.uc||'#E7DAC0')+'">'+esc(q.un)+'</span>':'')
    +(q.mult>1?'<span class="ch">×'+q.mult+' درجة مضاعفة</span>':'')+(q.flash?'<span class="ch">سؤال البرق</span>':'')
    +'<div class="clock off"><b>—</b></div></div>';
  var body=qBlock(i);
  if(q.type==='open') body+=judge(i);
  var foot=S.res[i]?'':'<div class="aw" style="margin-top:0">'+(S.rev?'':'<button class="cb g" onclick="hhScrReveal()">'+ico('eye',18)+' أظهر الإجابة</button>')+'<button class="cb" onclick="hhScrClose()">'+ico('back',18)+' رجوع إلى الصناديق</button></div>';
  return '<div class="sx-card big">'+top+'<div class="qbx"><span class="qn">الصندوق '+(i+1)+'</span>'+body+'</div>'+foot+'</div>';
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
  if((q.type==='mcq'||q.type==='tf')&&!S.rev&&!(S.manual&&S.manual[i])){
    var wm=S.wmsg&&S.wmsg[i];
    return '<div class="aw">'+(wm?'<span class="wm">'+ico('x',18)+' '+esc(wm)+'</span>':'<span class="hn">اضغط الخيار الذي اختاره '+(S.teams.length>1?esc(t.name):'الصف')+'</span>')+'<span style="flex:1"></span>'
      +'<button class="cb sm" onclick="hhScrManual('+i+')">احكم يدوياً</button><button class="cb sm" onclick="hhScrJudge('+i+',-1)">'+ico('x',16)+' '+(S.teams.length>1?'لا أحد · أظهر الإجابة':'أظهر الإجابة')+'</button></div>';
  }
  return '<div class="aw">'+(S.teams.length>1?'أجاب '+esc(t.name)+' إجابة صحيحة؟':'أجاب الصف إجابة صحيحة؟')+'<button class="cb g" onclick="hhScrJudge('+i+',1)">'+ico('check',18)+' نعم · +'+qPts(q)+'</button>'
    +(S.teams.length>1&&nextT>-1&&!S.rev?'<button class="cb" onclick="hhScrJudge('+i+',0)">'+ico('x',18)+' لا · ينتقل إلى '+esc(S.teams[nextT].name)+'</button>':'')
    +'<button class="cb" onclick="hhScrJudge('+i+',-1)">'+ico('x',18)+' '+(S.teams.length>1?'لا أحد · أظهر الإجابة':'لا · أظهر الإجابة')+'</button></div>';
}
function nextTeam(i){ var tried=(S.tried[i]||[]).concat([S.turn]); for(var k=1;k<S.teams.length;k++){ var c=(S.turn+k)%S.teams.length; if(tried.indexOf(c)<0) return c; } return -1; }
function pickHTML(){
  if(!S.pick) return '';
  var rem=Math.max(0,(S.roster.n||0)-Object.keys(S.roster.picked).length);
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
function clap(){ try{ if(window.hhApplause) hhApplause.play(); }catch(e){} }
function roundDone(i, ok){ if(ok){ clap(); sfx('success'); } var tot=S.roundPts||0; S.res[i]={ok:ok,team:S.turn,pts:tot}; S.roundPts=0; S.rev=true; stopTimer(); }
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
function openQ(i){ initRound(i); S.open=i; S.rev=false; if(TPL[S.tpl].seq) S.idx=i; if(S.tpl!=='boxes') sfx('open'); render(); var q=S.qs[i]; startTimer((q.type==='open'||S.tpl==='memory')?0:qTime(q)); if(q.type==='open'||S.tpl==='memory') stopTimer(); }
window.hhScrOpen=function(i){ if(S.res[i]&&S.tpl!=='flip') return; if(S.res[i]){ S.open=i; S.rev=true; render(); return; } openQ(i); };
window.hhScrClose=function(){ stopTimer(); S.open=null; S.rev=false; render(); if(S.tpl!=='wheel'&&!TPL[S.tpl].seq&&Object.keys(S.res).length===S.qs.length) setTimeout(function(){ if(S&&!S.ended) hhScrEnd(); },400); };
window.hhScrReveal=function(){ if(S.open==null) return; if(S.tpl==='match'||S.tpl==='memory'||S.tpl==='order'){ revealRound(); return; } if(!S.rev) sfx('unlock'); S.rev=true; stopTimer(); var q=S.qs[S.open]; if(q.type==='open') S.ptsShown[S.open]=ptsOf(q).length; render(); };
window.hhScrPt=function(i,k){ var q=S.qs[i]; var cur2=S.ptsShown[i]||0; S.ptsShown[i]=Math.max(cur2,k+1); if(S.ptsShown[i]>=ptsOf(q).length) S.rev=true; render(); };
window.hhScrJudge=function(i,ok){
  var q=S.qs[i];
  if(ok===1){ stopTimer(); var p=qPts(q), tw=S.turn; S.teams[S.turn].score+=p; S.res[i]={ok:true,team:S.turn,pts:p}; streakHit(tw,true); advanceTurn(); clap(); sfx('success'); S.rev=true; render(); floatPts(tw,p); setTimeout(function(){ burstAt(document.querySelector('#hh-scr .an.ok, #hh-scr .tfb .ok')); },30); return; }
  else if(ok===0){ S.tried[i]=(S.tried[i]||[]).concat([S.turn]); var nt=nextTeam(i); S.tried[i]=S.tried[i]; if(nt>-1){ S.turn=nt; } render(); return; }
  else { stopTimer(); S.res[i]={ok:false,team:S.turn,pts:0}; streakHit(S.turn,false); advanceTurn(); sfx('unlock'); }
  S.rev=true; render();
};
window.hhScrPickOpt=function(i,k){
  var q=S.qs[i]; if(!q||S.res[i]||S.rev) return; S.wrong=S.wrong||{}; S.wmsg=S.wmsg||{}; sfx('select');
  var w=S.wrong[i]=S.wrong[i]||[]; if(w.indexOf(k)>-1) return;
  if((q.correct||[]).indexOf(k)>-1){ S.wmsg[i]=null; hhScrJudge(i,1); return; }
  w.push(k); var who=teamName(S.turn); sfx('error'); streakHit(S.turn,false);
  S.tried[i]=(S.tried[i]||[]).concat([S.turn]); var nt=(S.teams.length>1)?nextTeam(i):-1;
  if(nt>-1){ S.turn=nt; S.wmsg[i]='إجابة '+who+' خاطئة · الدور الآن: '+S.teams[nt].name; render(); return; }
  S.wmsg[i]=null; hhScrJudge(i,-1);
};
window.hhScrManual=function(i){ S.manual=S.manual||{}; S.manual[i]=true; render(); };
window.hhScrScore=function(i,k){ var q=S.qs[i]; var p=k*ptPer(q); if(k>=ptsOf(q).length) p=qPts(q); if(k>0) clap(); var tw=S.turn; S.teams[S.turn].score+=p; S.res[i]={ok:k>0,team:S.turn,pts:p}; S.rev=true; S.ptsShown[i]=ptsOf(q).length; streakHit(tw,k>0); sfx(k>0?'success':'unlock'); advanceTurn(); render(); if(k>0){ floatPts(tw,p); setTimeout(function(){ burstAt(document.querySelector('#hh-scr .pts')); },30); } };
function advanceTurn(){ if(S.teams.length>1) S.turn=(S.turn+1)%S.teams.length; }
window.hhScrTurn=function(){ if(S.teams.length>1){ S.turn=(S.turn+1)%S.teams.length; sfx('forward'); render(); } };
window.hhScrAdj=function(t,d){ S.teams[t].score=Math.max(0,S.teams[t].score+d*S.base); render(); };
window.hhScrNav=function(d){
  var n=S.qs.length; var j=S.idx+d;
  if(j>=n){ hhScrEnd(); return; } if(j<0) return;
  S.hide={}; openQ(j); S.open=j; if(S.res[j]){ if(S.tpl==='match'||S.tpl==='memory'||S.tpl==='order'){ revealRound(); S.msg=null; render(); return; } S.rev=true; stopTimer(); render(); }
};
window.hhScrNextOpen=function(){
  if(S.tpl==='wheel'){ if(S.open!=null){ hhScrClose(); return; } hhScrSpin(); return; }
  if(S.open!=null){ if(!S.rev){ hhScrReveal(); return; } hhScrClose(); return; }
  if(S.tpl==='boxes'){ hhScrRandom(); return; }
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
  if(!S.roster.n){ var raw=prompt('كم عدد طلاب الصف؟ يُختار رقم الطالب من كشف الصف، دون أسماء.'); var v=parseInt(raw,10); if(!(v>0)) return; S.roster.n=Math.min(60,v); if(S.roster.mode==='none'){ S.roster.mode='count'; S.roster.label='الصف'; } try{ localStorage.setItem('hh_scr_count',String(S.roster.n)); }catch(e){} }
  var all=[]; for(var k=1;k<=S.roster.n;k++) all.push(k);
  var left=all.filter(function(k){ return !S.roster.picked[k]; }); if(!left.length){ S.roster.picked={}; left=all.slice(); toastX('اختير الجميع، تبدأ دورة جديدة','info'); }
  var lab=function(k){ var nm=S.roster.code?localName(S.roster.code,k):''; return 'الطالب رقم '+k+(nm?'، '+nm:''); };
  var final=left[Math.floor(Math.random()*left.length)]; var steps=0; sfx('select');
  S.pick={name:lab(left[0]),num:left[0],spin:true}; render();
  var iv=setInterval(function(){ if(!S){ clearInterval(iv); return; } steps++; var r=left[Math.floor(Math.random()*left.length)]; S.pick.name=lab(r); var b=document.querySelector('#hh-scr .pick b'); if(b) b.textContent=S.pick.name; if(steps>12){ clearInterval(iv); S.pick={name:lab(final),num:final,spin:false}; S.roster.picked[final]=true; sfx('open'); render(); } },90);
};
window.hhScrPickClose=function(){ S.pick=null; render(); };
window.hhScrPickRes=function(ok){
  var n=S.pick&&S.pick.num; if(!n) return; n='الطالب رقم '+n; var t=S.roster.tally[n]=S.roster.tally[n]||{ok:0,no:0}; if(ok) t.ok++; else t.no++;
  var i=(S.open!=null)?S.open:(TPL[S.tpl].seq?S.idx:null);
  S.pick=null;
  if(ok&&i!=null&&!S.res[i]){ var q=S.qs[i]; if(q.type==='open'){ S.rev=true; S.ptsShown[i]=ptsOf(q).length; render(); return; } S.rev=true; stopTimer(); hhScrJudge(i,1); return; }
  render();
};
window.hhScrEnd=function(){ stopTimer(); S.open=null; S.pick=null; S.ended=true; render(); sfx('achievement'); if(S.teams.some(function(t){ return t.score>0; })) setTimeout(confetti,700); };
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
  else if((c==='r'||c==='ق')&&S.tpl==='boxes'){ e.preventDefault(); hhScrRandom(); }
  else if(c==='f'||c==='ب'){ e.preventDefault(); hhScrFull(); }
}
window._hhScr=function(){ return S; };
})();
