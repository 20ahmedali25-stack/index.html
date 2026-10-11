/* ============================================================
   المُلهم التعليمي — سباق المُلهم المباشر (التشغيل الحي) · واجهة zzzzzzbt
   ------------------------------------------------------------
   المضيف: hhLiveHost(game) · الاستئناف: hhLiveResume(code) · النتائج: hhLiveResults(code)
   اللاعب: يُفتح تلقائياً عند وجود ?join=CODE في الرابط (بلا حساب)
   Firestore: game_sessions/{code} + game_sessions/{code}/players/{pid}
   ============================================================ */
(function(){
'use strict';
var L={ code:null, game:null, sess:null, unsub:null, unsubP:null, players:{}, timer:null, order:[], lastN:5, revealCache:{}, host:false, pid:null, pname:'', myAns:{}, myShop:{}, qReceivedAt:0 };
var OC=['#8A1538','#3D6B53','#8A6D2E','#1F4E79']; var OS=['◆','●','▲','■'];
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function toastX(m,k){ if(typeof toast==='function') toast(m,k||'info'); }
function db(){ return firebase.firestore(); }
function uid(){ try{ return (firebase.auth().currentUser||{}).uid||''; }catch(e){ return ''; } }
function code5(){ var A='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; var s=''; for(var i=0;i<5;i++) s+=A[Math.floor(Math.random()*A.length)]; return s; }
function joinUrl(code){ return location.origin+location.pathname+'?join='+code; }
function icon(n){ var P={play:'<path d="M6 4l14 8-14 8z"/>',next:'<path d="M5 12h14M12 5l7 7-7 7"/>',pause:'<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',stop:'<rect x="5" y="5" width="14" height="14" rx="2"/>',users:'<path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/>',bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',back:'<path d="M9 5l7 7-7 7"/>',dl:'<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',eye:'<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>'}; return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'+(P[n]||'')+'</svg>'; }

function style(){
  if(document.getElementById('hh-lv-style')) return;
  var st=document.createElement('style'); st.id='hh-lv-style';
  st.textContent=[
  /* المضيف · zzzzzzbt */
  '#hh-lv{position:fixed;inset:0;background:#F5F4F2;z-index:99992;direction:rtl;font-family:Cairo,Tajawal,sans-serif;color:#2A1A0E;display:flex;flex-direction:column;overflow:hidden;}',
  '#hh-lv *{box-sizing:border-box;} #hh-lv button{font-family:Cairo,sans-serif;cursor:pointer;}',
  '#hh-lv .hd{min-height:clamp(64px,8.8vh,96px);background:linear-gradient(175deg,#4A0B1E,#5E0E26);border-bottom:3px solid #B8924A;display:flex;align-items:center;gap:clamp(10px,1.1vw,20px);padding:6px clamp(14px,1.9vw,36px);color:#fff;flex-shrink:0;flex-wrap:wrap;}',
  '#hh-lv .lvt{display:flex;flex-direction:column;min-width:0;} #hh-lv .lvt small{font-weight:700;font-size:clamp(12px,.9vw,17px);color:#E9D7AE;} #hh-lv .lvt b{font-weight:800;font-size:clamp(17px,1.55vw,30px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:36vw;}',
  '#hh-lv .lvp{font-weight:800;font-size:clamp(13px,1.1vw,21px);background:rgba(255,255,255,.12);border:1.5px solid rgba(233,215,174,.4);border-radius:99px;padding:4px 16px;display:inline-flex;align-items:center;gap:8px;white-space:nowrap;}',
  '#hh-lv .lvcode{margin-inline-start:auto;display:flex;align-items:center;gap:10px;background:#fff;color:#3D0918;border-radius:16px;padding:5px 16px;font-weight:800;font-size:clamp(13px,.95vw,18px);}',
  '#hh-lv .lvcode b{font-size:clamp(22px,1.8vw,34px);letter-spacing:5px;direction:ltr;}',
  '#hh-lv .main{flex:1;min-height:0;display:flex;flex-direction:column;gap:clamp(12px,2vh,22px);padding:clamp(14px,3vh,34px) clamp(14px,2.5vw,48px);overflow:auto;}',
  '#hh-lv .ctl{min-height:clamp(62px,8.5vh,92px);background:#fff;border-top:1.5px solid #E7DAC0;display:flex;align-items:center;gap:10px;padding:8px clamp(12px,1.9vw,36px);flex-shrink:0;flex-wrap:wrap;}',
  '#hh-lv .tb{display:inline-flex;align-items:center;gap:8px;height:clamp(44px,5.4vh,58px);padding:0 clamp(12px,1.2vw,22px);border-radius:14px;border:1.5px solid #E7DAC0;background:#fff;color:#5E0E26;font-weight:800;font-size:clamp(14px,1vw,19px);}',
  '#hh-lv .tb svg{width:20px;height:20px;} #hh-lv .tb.gold{background:linear-gradient(135deg,#8A1538,#5E0E26);color:#fff;border-color:transparent;} #hh-lv .tb.red{color:#B3261E;} #hh-lv .tb:disabled{opacity:.4;cursor:default;}',
  '#hh-lv .kh{margin-inline-start:auto;font-family:Tajawal;font-size:clamp(12px,.85vw,16px);color:#7A6A54;white-space:nowrap;} #hh-lv .kh kbd{font-family:Cairo;font-weight:800;background:#F5F3F0;border:1.5px solid #E7DAC0;border-radius:6px;padding:0 7px;margin:0 3px;color:#3D0918;}',
  '@media (max-width:1100px){ #hh-lv .kh{display:none;} }',
  /* الانتظار */
  '#hh-lv .lby{display:grid;grid-template-columns:minmax(300px,560px) 1fr;gap:clamp(14px,1.5vw,28px);flex:1;min-height:0;} @media(max-width:900px){#hh-lv .lby{grid-template-columns:1fr;}}',
  '#hh-lv .jn{background:#fff;border:1.5px solid #E7DAC0;border-radius:28px;padding:clamp(16px,2.4vh,30px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(8px,1.4vh,16px);text-align:center;}',
  '#hh-lv .jn h3{margin:0;font-size:clamp(16px,1.25vw,24px);color:#7A6A54;}',
  '#hh-lv #lv-qr{width:clamp(180px,26vh,280px);height:clamp(180px,26vh,280px);display:flex;align-items:center;justify-content:center;border:2px solid #E7DAC0;border-radius:18px;padding:10px;background:#fff;} #hh-lv #lv-qr img,#hh-lv #lv-qr canvas{width:100%!important;height:100%!important;}',
  '#hh-lv .bigc{font-size:clamp(46px,4.4vw,84px);font-weight:800;color:#3D0918;letter-spacing:10px;direction:ltr;line-height:1;}',
  '#hh-lv .url{font-size:clamp(14px,1.15vw,22px);font-weight:700;color:#5E0E26;direction:ltr;background:#F5F3F0;border-radius:12px;padding:6px 14px;word-break:break-all;}',
  '#hh-lv .pls{background:#fff;border:1.5px solid #E7DAC0;border-radius:28px;padding:clamp(16px,2vh,26px) clamp(16px,1.6vw,30px);display:flex;flex-direction:column;gap:14px;min-height:0;overflow:auto;}',
  '#hh-lv .pls h3{margin:0;font-size:clamp(20px,1.45vw,28px);color:#3D0918;display:flex;align-items:center;gap:12px;flex-wrap:wrap;} #hh-lv .pls h3 em{font-style:normal;background:#5E0E26;color:#fff;border-radius:14px;padding:0 16px;} #hh-lv .pls h3 small{margin-inline-start:auto;font-size:clamp(13px,.95vw,18px);color:#2F6A4E;}',
  '#hh-lv .pgd{display:grid;grid-template-columns:repeat(auto-fill,minmax(clamp(150px,13vw,240px),1fr));gap:10px;}',
  '#hh-lv .pgd span{min-height:clamp(46px,5.8vh,64px);border-radius:16px;background:#F5F3F0;display:flex;align-items:center;gap:10px;padding:6px 14px;font-size:clamp(15px,1.15vw,22px);font-weight:800;color:#2A1A0E;animation:hhLvIn .35s both;overflow:hidden;}',
  '#hh-lv .pgd span i{width:clamp(30px,2vw,38px);height:clamp(30px,2vw,38px);border-radius:11px;background:var(--a);color:#fff;font-style:normal;display:flex;align-items:center;justify-content:center;font-size:.85em;flex-shrink:0;}',
  '#hh-lv .pgd span.nw{background:#EEF4F0;box-shadow:inset 0 0 0 2px #2F6A4E;}',
  '#hh-lv .wait{color:#7A6A54;font-weight:700;font-size:clamp(15px,1.1vw,20px);}',
  '@keyframes hhLvIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}',
  /* السؤال والكشف */
  '#hh-lv .qc{background:#fff;border:1.5px solid #E7DAC0;border-radius:28px;padding:clamp(16px,2.4vh,30px) clamp(18px,2vw,40px);display:flex;align-items:center;gap:clamp(14px,1.4vw,28px);}',
  '#hh-lv .qc h2{margin:0;flex:1;font-size:clamp(26px,2.6vw,50px);line-height:1.35;color:#2A1A0E;font-weight:800;}',
  '#hh-lv .qtag{background:#F6E9EE;color:#8A1538;border-radius:99px;padding:5px 16px;font-size:clamp(13px,1.05vw,20px);font-weight:800;white-space:nowrap;}',
  '#hh-lv .ring{width:clamp(84px,6.8vw,130px);height:clamp(84px,6.8vw,130px);border-radius:50%;background:conic-gradient(#5E0E26 var(--p,100%),#ECE8E3 0);display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
  '#hh-lv .ring i{width:80%;height:80%;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:clamp(28px,2.5vw,48px);font-weight:800;color:#3D0918;}',
  '#hh-lv .ring.end{background:#E35D4F;}',
  '#hh-lv .opts{display:grid;grid-template-columns:1fr 1fr;gap:clamp(10px,1vw,18px);flex:1;min-height:0;grid-auto-rows:minmax(clamp(70px,11vh,160px),1fr);}',
  '#hh-lv .opt{border-radius:22px;background:var(--a);color:#fff;display:flex;align-items:center;gap:clamp(12px,1vw,20px);padding:8px clamp(16px,1.6vw,30px);font-size:clamp(20px,2.1vw,40px);font-weight:800;position:relative;overflow:hidden;line-height:1.3;transition:opacity .25s;}',
  '#hh-lv .opt > b{width:clamp(44px,3.8vw,72px);height:clamp(44px,3.8vw,72px);border-radius:18px;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:.75em;flex-shrink:0;}',
  '#hh-lv .opt.dim{opacity:.3;} #hh-lv .opt.ok{box-shadow:0 0 0 6px #fff,0 0 0 11px #2F6A4E;}',
  '#hh-lv .opt .cnt{margin-inline-start:auto;font-size:.7em;background:rgba(0,0,0,.18);border-radius:14px;padding:3px 14px;white-space:nowrap;}',
  '#hh-lv .opt .bar{position:absolute;bottom:0;right:0;height:10px;background:rgba(255,255,255,.75);}',
  '#hh-lv .meter{display:flex;align-items:center;gap:16px;background:#fff;border:1.5px solid #E7DAC0;border-radius:20px;padding:12px 20px;font-size:clamp(16px,1.25vw,24px);font-weight:800;color:#3D0918;flex-wrap:wrap;}',
  '#hh-lv .meter .mb{flex:1;min-width:120px;height:16px;background:#ECE8E3;border-radius:99px;overflow:hidden;} #hh-lv .meter .mb i{display:block;height:100%;background:#2F6A4E;border-radius:99px;transition:width .3s;}',
  '#hh-lv .meter small{color:#7A6A54;font-size:.82em;}',
  '#hh-lv .note{background:#EEF4F0;border-radius:20px;padding:12px 20px;font-size:clamp(15px,1.25vw,24px);font-weight:700;color:#24513C;display:flex;gap:12px;align-items:center;flex-wrap:wrap;}',
  '#hh-lv .note small{margin-inline-start:auto;color:#7A6A54;}',
  '#hh-lv .evs{display:flex;flex-wrap:wrap;gap:8px;} #hh-lv .evs span{border-radius:99px;padding:5px 14px;font-weight:800;font-size:clamp(13px,1vw,18px);background:#F6E9EE;color:#8A1538;} #hh-lv .evs span.b{background:#EEF4F0;color:#2F6A4E;}',
  '#hh-lv .cloud{background:#fff;border:1.5px solid #E7DAC0;border-radius:28px;padding:24px;flex:1;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;text-align:center;}',
  /* الترتيب */
  '#hh-lv .rkw{display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,560px);gap:clamp(18px,2.5vw,48px);flex:1;min-height:0;align-items:stretch;} @media(max-width:900px){#hh-lv .rkw{grid-template-columns:1fr;}}',
  '#hh-lv .podm{display:flex;align-items:flex-end;justify-content:center;gap:clamp(10px,1.3vw,24px);min-height:0;}',
  '#hh-lv .pcm{width:clamp(110px,13vw,250px);display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;}',
  '#hh-lv .pcm b{font-size:clamp(17px,1.65vw,32px);color:#3D0918;line-height:1.3;} #hh-lv .pcm small{font-size:clamp(14px,1.25vw,24px);color:#7A6A54;font-weight:800;}',
  '#hh-lv .pcm .stp{width:100%;border-radius:20px 20px 0 0;background:linear-gradient(175deg,#8A1538,#5E0E26);border-top:5px solid #B8924A;color:#fff;font-size:clamp(38px,3.6vw,70px);font-weight:800;display:flex;justify-content:center;padding-top:12px;animation:hhLvUp .6s both;}',
  '@keyframes hhLvUp{from{transform:scaleY(.2);transform-origin:bottom;opacity:0;}to{transform:none;opacity:1;}}',
  '#hh-lv .rlst{display:flex;flex-direction:column;gap:10px;align-self:center;width:100%;}',
  '#hh-lv .rlst div{min-height:clamp(48px,6vh,64px);border-radius:16px;background:#fff;border:1.5px solid #E7DAC0;display:flex;align-items:center;gap:14px;padding:6px 18px;font-size:clamp(16px,1.25vw,24px);font-weight:800;color:#2A1A0E;animation:hhLvIn .35s both;}',
  '#hh-lv .rlst div em{font-style:normal;width:40px;height:40px;border-radius:12px;background:#F5F3F0;display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
  '#hh-lv .rlst div .mv{color:#2F6A4E;font-size:.75em;display:flex;align-items:center;gap:2px;} #hh-lv .rlst div .mv.dn{color:#B3261E;} #hh-lv .rlst div b{margin-inline-start:auto;}',
  '#hh-lv .hidden-note{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-size:clamp(24px,2.2vw,42px);font-weight:800;color:#3D0918;gap:10px;}',
  '#hh-lv .hidden-note small{font-size:.5em;color:#7A6A54;font-weight:700;}',
  '#hh-lv .final h1{margin:0;text-align:center;font-size:clamp(28px,2.6vw,50px);color:#3D0918;} #hh-lv .final .sub{text-align:center;color:#7A6A54;font-weight:700;font-size:clamp(14px,1.1vw,20px);}',
  '#hh-lv .shp{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;} #hh-lv .shp div{background:#fff;border:1.5px solid #E7DAC0;border-radius:22px;padding:18px;display:flex;flex-direction:column;gap:6px;font-weight:800;color:#3D0918;font-size:clamp(17px,1.4vw,26px);} #hh-lv .shp small{color:#7A6A54;font-size:.6em;font-weight:700;} #hh-lv .shp em{font-style:normal;align-self:flex-start;background:#F5F3F0;border-radius:99px;padding:2px 12px;font-size:.7em;}',
  /* اللاعب */
  '#hh-pl{position:fixed;inset:0;background:#F5F4F2;z-index:99995;direction:rtl;font-family:Cairo,Tajawal,sans-serif;display:flex;flex-direction:column;color:#2A1A0E;overflow:hidden;}',
  '#hh-pl *{box-sizing:border-box;}',
  '#hh-pl .top{background:linear-gradient(175deg,#4A0B1E,#5E0E26);border-bottom:2px solid #B8924A;color:#fff;padding:12px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0;}',
  '#hh-pl .top b{display:block;font-size:16px;color:#fff;} #hh-pl .top span{display:block;font-size:12px;font-weight:700;color:#E9D7AE;} #hh-pl .top .sc{margin-inline-start:auto;background:#fff;color:#3D0918;border-radius:99px;padding:3px 12px;font-weight:800;font-size:14px;white-space:nowrap;}',
  '#hh-pl .body{flex:1;display:flex;flex-direction:column;padding:16px;gap:12px;min-height:0;}',
  '#hh-pl .center{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:12px;padding:10px;} #hh-pl .center b{font-size:24px;color:#3D0918;} #hh-pl .center p{color:#7A6A54;font-weight:700;font-size:16px;margin:0;line-height:1.7;}',
  '#hh-pl input{width:100%;height:60px;border:2px solid #E7DAC0;border-radius:16px;padding:0 12px;font-family:Cairo;font-size:20px;font-weight:700;text-align:center;color:#2A1A0E;background:#fff;outline:none;} #hh-pl input:focus{border-color:#B8924A;}',
  '#hh-lv .hh-sfx-btn{display:inline-flex;align-items:center;gap:8px;height:42px;padding:0 14px;border-radius:12px;border:1.5px solid rgba(233,215,174,.5);background:rgba(255,255,255,.08);color:#F5E6C4;font-family:Cairo;font-weight:800;font-size:14px;white-space:nowrap;cursor:pointer;} #hh-lv .hh-sfx-btn .w{opacity:.25;} #hh-lv .hh-sfx-btn.on .w{opacity:1;}',
  '#hh-pl .jn2{justify-content:flex-start;padding-top:18px;} #hh-pl .avg{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;width:100%;margin:4px 0 6px;} #hh-pl .av{height:84px;border:2px solid #E7DAC0;border-radius:16px;background:#fff;color:var(--a);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;font-family:Cairo;padding:0;} #hh-pl .av svg{width:30px;height:30px;} #hh-pl .av span{font-size:13px;font-weight:800;color:#3D2A16;} #hh-pl .av.on{border-color:var(--a);background:color-mix(in srgb,var(--a) 10%,#fff);box-shadow:0 0 0 3px color-mix(in srgb,var(--a) 25%,transparent);} #hh-pl .jn2 input{font-size:17px;} #hh-pl .jn2 .pv{font-size:13px;color:#2C5340;}',
  '#hh-pl .go{width:100%;height:58px;background:linear-gradient(135deg,#8A1538,#5E0E26);color:#fff;border:none;border-radius:16px;font-family:Cairo;font-weight:800;font-size:20px;cursor:pointer;} #hh-pl .go:disabled{opacity:.6;}',
  '#hh-pl .pq{background:#fff;border:1.5px solid #E7DAC0;border-radius:18px;padding:12px 14px;font-size:18px;font-weight:800;color:#2A1A0E;text-align:center;line-height:1.5;} #hh-pl .pq small{display:block;font-size:13px;color:#8A1538;margin-top:4px;}',
  '#hh-pl .ans{flex:1;display:grid;grid-template-rows:repeat(4,1fr);gap:10px;min-height:0;} #hh-pl .ans.two{grid-template-rows:repeat(2,1fr);}',
  '#hh-pl .ans button{border:none;border-radius:18px;color:#fff;font-family:Cairo;font-weight:800;font-size:20px;display:flex;align-items:center;gap:14px;padding:0 18px;text-align:right;cursor:pointer;line-height:1.3;}',
  '#hh-pl .ans button span{width:46px;height:46px;border-radius:13px;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;} #hh-pl .ans button:disabled{opacity:.45;}',
  '#hh-pl .ans button small{display:block;font-size:13px;font-weight:700;opacity:.85;}',
  '#hh-pl .bar{height:8px;background:#ECE8E3;border-radius:99px;overflow:hidden;flex-shrink:0;} #hh-pl .bar i{display:block;height:100%;background:#8A1538;transition:width .25s linear;}',
  '#hh-pl .sel{width:100%;border-radius:18px;background:var(--a);color:#fff;min-height:84px;display:flex;align-items:center;justify-content:center;gap:14px;font-size:24px;font-weight:800;padding:8px 14px;}',
  '#hh-pl .full{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;text-align:center;color:#fff;padding:20px;margin:-16px;}',
  '#hh-pl .full.okb{background:linear-gradient(170deg,#3D6B53,#24513C);} #hh-pl .full.bad{background:linear-gradient(170deg,#B3261E,#7A1A14);} #hh-pl .full.mar{background:linear-gradient(170deg,#8A1538,#5E0E26);} #hh-pl .full.neu{background:linear-gradient(170deg,#7A6A54,#5A4C3A);}',
  '#hh-pl .full .ic{width:110px;height:110px;border-radius:50%;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;}',
  '#hh-pl .full b{font-size:34px;color:#fff;} #hh-pl .full p{margin:0;font-size:19px;font-weight:700;opacity:.95;color:#fff;} #hh-pl .full .rk{font-size:110px;font-weight:800;line-height:1;}',
  '#hh-pl .chip{background:rgba(255,255,255,.18);border-radius:99px;padding:6px 16px;font-size:16px;font-weight:800;display:inline-flex;gap:6px;align-items:center;}',
  '#hh-pl .big{font-size:3rem;font-weight:900;line-height:1;} #hh-pl .okc{color:#3D6B53;} #hh-pl .badc{color:#c0392b;}'
  ].join('\n');
  document.head.appendChild(st);
}

/* ═══════════ المضيف ═══════════ */
window.hhLiveHost=async function(game){
  if(!uid()){ toastX('سجّل الدخول أولاً','error'); return; }
  style();
  var qs=(game.questions||[]).filter(function(q){ return q.q && ((q.correct||[]).length || q.type==='poll' || q.type==='order'); });
  if(!qs.length){ toastX('لا أسئلة صالحة في اللعبة','error'); return; }
  var S=game.settings||{}; var order=qs.map(function(_,i){ return i; }); if(S.shuffleQ) order.sort(function(){ return Math.random()-.5; });
  var code=code5();
  var sess={ code:code, gameId:game.id, hostUid:uid(), title:game.title||'', state:'lobby', qIndex:0, total:qs.length, order:order, qStartedAt:0, settings:S,
    questions:qs.map(function(q){ return { id:q.id, type:q.type, q:q.q, opts:q.opts, correct:q.correct, time:q.flash?Math.max(5,Math.round(q.time/2)):q.time, mult:(q.mult||1)*(q.flash?2:1), flash:!!q.flash, note:q.note||'' }; }),
    scores:{}, names:{}, playersCount:0, createdAt:Date.now(), updatedAt:Date.now() };
  try{ await db().collection('game_sessions').doc(code).set(sess); }catch(e){ toastX('تعذر إنشاء الجولة · '+((e&&e.code)||''),'error'); return; }
  hostOpen(code);
};
window.hhLiveResume=async function(code){ if(!uid()) return; style(); hostOpen(code); };
window.hhLiveEndSession=async function(code){ if(!confirm('إنهاء الجولة '+code+' نهائياً؟')) return; try{ await db().collection('game_sessions').doc(code).set({state:'ended',updatedAt:Date.now()},{merge:true}); toastX('أُنهيت الجولة','success'); if(typeof hhIbRefresh==='function') hhIbRefresh(); }catch(e){ toastX('تعذر الإنهاء','error'); } };
window.hhLiveResults=async function(code){ style(); hostOpen(code, true); };

function hostOpen(code, viewOnly){
  try{ if(window.hhApplause) hhApplause.reset(); }catch(e){} // zzzzzzbv: التصفيق مغلق في بداية كل جولة
  L.host=true; L.code=code; L.players={};
  var old=document.getElementById('hh-lv'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-lv'; ov.innerHTML='<div class="hd"></div><div class="main"><div class="hidden-note">جارٍ التحميل…</div></div><div class="ctl"></div>'; document.body.appendChild(ov);
  if(L.unsub) L.unsub(); if(L.unsubP) L.unsubP();
  L.unsub=db().collection('game_sessions').doc(code).onSnapshot(function(d){ if(!d.exists){ return; } L.sess=d.data(); L.sess.code=code; hostRender(); }, function(e){ toastX('انقطع الاتصال بالجولة','error'); });
  L.unsubP=db().collection('game_sessions').doc(code).collection('players').onSnapshot(function(qs){ L.players={}; qs.forEach(function(d){ L.players[d.id]=d.data(); }); hostRender(); });
}
function hostClose(){ if(L.unsub){ L.unsub(); L.unsub=null; } if(L.unsubP){ L.unsubP(); L.unsubP=null; } clearInterval(L.timer); var e=document.getElementById('hh-lv'); if(e) e.remove(); L.host=false; if(typeof hhIbRefresh==='function') hhIbRefresh(); }
window.hhLiveClose=hostClose;
async function setState(patch){ patch.updatedAt=Date.now(); try{ await db().collection('game_sessions').doc(L.code).set(patch,{merge:true}); }catch(e){ toastX('تعذر التحديث','error'); } }

function curQ(){ var s=L.sess; if(!s) return null; var oi=(s.order||[])[s.qIndex]; return s.questions[oi==null?s.qIndex:oi]; }
function rankHidden(){ var s=L.sess; var S=s.settings||{}; if(S.hideRank==='always') return true; if(S.hideRank==='last'){ return (s.total-(s.qIndex+1)) < (S.hideLastN||5); } return false; }
function pointsFor(q, ans, S){
  if(!ans||!ans.c||!ans.c.length) return 0;
  var corr=(q.correct||[]).slice().sort().join(','); var got=(ans.c||[]).slice().sort().join(','); if(corr!==got) return 0;
  var base=1000; if((S.scoring||'speed')==='speed'){ var frac=Math.min(1,Math.max(0,(ans.t||0)/(q.time*1000))); base=Math.round(1000*(1-frac/2)); }
  return base*(q.mult||1);
}
var SHOP={ x2:{label:'مضاعف ×2',desc:'السؤال التالي يمنح ضعف العملات',cost:300,ico:'✕2'}, shield:{label:'درع',desc:'يصدّ أول سطو عليك',cost:250,ico:'◈'}, steal:{label:'سطو',desc:'تأخذ 15% من محفظة المتصدر عند الكشف التالي',cost:400,ico:'➶'} };
function isMarket(){ return ((L.sess&&L.sess.settings)||{}).mode==='market'; }
function qAt(qi){ var s=L.sess; var oi=(s.order||[])[qi]; return s.questions[oi==null?qi:oi]; }
// إعادة احتساب كاملة وحتمية من إجابات اللاعبين ومشترياتهم: المضيف هو المرجع الوحيد للأرقام
function computeScores(uptoQ){
  var s=L.sess; var S=s.settings||{}; var scores={}; var names={}; var events=[]; var market=(S.mode==='market');
  var pids=Object.keys(L.players); pids.forEach(function(pid){ names[pid]=L.players[pid].name||'لاعب'; scores[pid]=0; });
  var last=(uptoQ==null)?s.qIndex:uptoQ; var shields={}; var x2={};
  for(var qi=0; qi<=last; qi++){
    var q=qAt(qi); if(!q) continue;
    var steals=[];
    if(market && qi>0){
      pids.forEach(function(pid){ var sh=(L.players[pid].shop||{})[qi]; if(!sh||!SHOP[sh.buy]) return; var cost=SHOP[sh.buy].cost; if(scores[pid]<cost) return; scores[pid]-=cost;
        if(sh.buy==='x2') x2[pid]=true; else if(sh.buy==='shield') shields[pid]=true; else if(sh.buy==='steal') steals.push(pid); });
    }
    pids.forEach(function(pid){ var a=(L.players[pid].a||{})[qi]; var pts=pointsFor(q,a,S); if(market && x2[pid]){ pts*=2; delete x2[pid]; } scores[pid]+=pts; });
    steals.forEach(function(thief){
      var leader=null; pids.forEach(function(pid){ if(pid===thief) return; if(leader===null||scores[pid]>scores[leader]) leader=pid; });
      if(leader===null) return;
      if(shields[leader]){ delete shields[leader]; events.push({qi:qi,type:'blocked',from:names[thief],to:names[leader]}); return; }
      var amt=Math.round(scores[leader]*0.15); scores[leader]-=amt; scores[thief]+=amt; events.push({qi:qi,type:'steal',from:names[thief],to:names[leader],amt:amt});
    });
  }
  return {scores:scores,names:names,events:events};
}
function playersArr(){ return Object.keys(L.players).map(function(pid){ return {pid:pid, name:(L.players[pid].name||'لاعب')}; }); }

function ic2(n,s){ var P={play:'<path d="M6 4l14 8-14 8z"/>',next:'<path d="M15 5l-7 7 7 7"/>',pause:'<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',stop:'<rect x="5" y="5" width="14" height="14" rx="2"/>',users:'<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14c3 0 5 2 5 5"/>',bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',back:'<path d="M9 5l7 7-7 7"/>',dl:'<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',check:'<path d="M20 6L9 17l-5-5"/>',x:'<path d="M18 6L6 18M6 6l12 12"/>',award:'<circle cx="12" cy="9" r="5"/><path d="M9 13l-1 8 4-2 4 2-1-8"/>',up:'<path d="M6 15l6-6 6 6"/>',down:'<path d="M6 9l6 6 6-6"/>',fire:'<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 2-7 2 1 3 3 3 5 1-2 0-5 0-8z"/>',expand:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',shop:'<path d="M4 7h16l-1.5 11h-13z"/><path d="M9 7a3 3 0 0 1 6 0"/>'};
  var z=s||20; return '<svg width="'+z+'" height="'+z+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'+(P[n]||'')+'</svg>'; }
var TCOL=['#8A1538','#1F4E79','#3D6B53','#8A6D2E','#5E0E26','#2C5340','#132f4a','#7A1636'];
function initial(n){ n=String(n||'').trim(); return n?n.charAt(0):'؟'; }
function fmt(n){ return (n||0).toLocaleString('en-US'); }
function shortUrl(code){ var h=location.host||'almulhimedu.org'; return h+'/?join='+code; }
function ranksOf(sc){ var arr=Object.keys(sc||{}).sort(function(a,b){ return (sc[b]||0)-(sc[a]||0); }); var m={}; arr.forEach(function(p,i){ m[p]=i+1; }); return m; }
function fastest(qi){ var q=qAt(qi); if(!q) return null; var best=null; Object.keys(L.players).forEach(function(pid){ var a=(L.players[pid].a||{})[qi]; if(!a||!a.c) return; var ok=(q.correct||[]).slice().sort().join(',')===(a.c||[]).slice().sort().join(','); if(ok&&(best===null||a.t<best.t)) best={pid:pid,t:a.t,name:L.players[pid].name||'لاعب'}; }); return best; }
function hostRender(){
  var s=L.sess; var root=document.getElementById('hh-lv'); if(!root||!s) return;
  var hd=root.querySelector('.hd'); var main=root.querySelector('.main'); var cb=root.querySelector('.ctl');
  var n=Object.keys(L.players).length; var q=curQ();
  var answered=q?Object.keys(L.players).filter(function(pid){ var A=L.players[pid].a||{}; return !!A[s.qIndex]; }).length:0;
  var stTxt={lobby:ic2('users',18)+' '+n+' منضمين',question:'السؤال '+(s.qIndex+1)+' من '+s.total,reveal:'السؤال '+(s.qIndex+1)+' من '+s.total+' · الكشف',shop:'السوق مفتوح',rank:'الترتيب بعد السؤال '+(s.qIndex+1)+' من '+s.total,paused:'متوقفة مؤقتاً',ended:'النتيجة النهائية'}[s.state]||'';
  hd.innerHTML='<div class="lvt"><small>سباق المُلهم المباشر</small><b>'+esc(s.title||'')+'</b></div><span class="lvp">'+stTxt+'</span>'+(s.state!=='lobby'&&s.state!=='ended'?'<span class="lvp">'+ic2('users',18)+' '+n+'</span>':'')+(s.state!=='ended'&&window.hhApplause?hhApplause.btn():'')+(window.hhSfx?hhSfx.btn():'')+(s.state!=='ended'?'<div class="lvcode">ادخل الرمز <b>'+esc(s.code)+'</b></div>':'');
  var B=function(fn,ico,t,c,dis){ return '<button class="tb '+(c||'')+'" '+(dis?'disabled':'')+' onclick="'+fn+'">'+ic2(ico)+' '+t+'</button>'; };
  var ctl='';
  if(s.state==='lobby') ctl=B('hhLvStart()','play','ابدأ السباق','gold',!n)+B('hhLiveClose()','back','رجوع · تبقى الجولة محفوظة');
  else if(s.state==='question') ctl=B('hhLvReveal()','eye','اكشف الإجابة','gold')+B('hhLvPause()','pause','إيقاف مؤقت');
  else if(s.state==='reveal') ctl=(isMarket()&&s.qIndex+1<s.total?B('hhLvShop()','shop','افتح السوق','gold'):B('hhLvRank()','award',(rankHidden()?'التالي':'الترتيب'),'gold'))+B('hhLvPause()','pause','إيقاف مؤقت');
  else if(s.state==='shop') ctl=B('hhLvRank()','next','أغلق السوق','gold')+B('hhLvPause()','pause','إيقاف مؤقت');
  else if(s.state==='rank') ctl=B('hhLvNext()','next',(s.qIndex+1>=s.total?'الختام':'السؤال التالي'),'gold')+B('hhLvPause()','pause','إيقاف مؤقت');
  else if(s.state==='paused') ctl=B('hhLvUnpause()','play','استئناف','gold')+B('hhLiveClose()','back','رجوع')+B('hhLvEnd()','stop','إنهاء','red');
  else if(s.state==='ended') ctl=B('hhLvCSV()','dl','تصدير النتائج CSV','gold')+B('hhLiveClose()','back','رجوع');
  if(s.state!=='ended'&&s.state!=='lobby'&&s.state!=='paused') ctl+=B('hhLvEnd()','stop','إنهاء','red');
  ctl+='<span class="kh"><kbd>مسافة</kbd> التالي <kbd>P</kbd> إيقاف <kbd>F</kbd> ملء الشاشة</span><button class="tb" title="ملء الشاشة" onclick="hhLvFull()">'+ic2('expand')+'</button>';
  if(cb) cb.innerHTML=ctl;

  var vk=s.state+':'+s.qIndex+':'+(s.qStartedAt||0);
  if(s.state==='question' && L.viewKey===vk){ var e1=document.getElementById('lv-ans'); if(e1) e1.textContent='أجاب '+answered+' من '+n; var m1=document.getElementById('lv-mb'); if(m1) m1.style.width=(n?Math.round(answered/n*100):0)+'%'; return; }
  if(s.state==='lobby' && L.viewKey===vk){ renderPlayers(); return; }
  L.viewKey=vk;
  clearInterval(L.timer);
  if(s.state==='lobby'){
    main.innerHTML='<div class="lby"><div class="jn"><h3>امسح الرمز بالجوال</h3><div id="lv-qr"></div><div class="bigc">'+esc(s.code)+'</div><div class="url">'+esc(shortUrl(s.code))+'</div><div class="wait" style="font-size:clamp(13px,.95vw,18px)">لا يحتاج الطالب حساباً · يكتب اسمه فقط</div></div>'
      +'<div class="pls"><h3>المنضمون <em id="lv-n">'+n+'</em><small id="lv-new"></small></h3><div class="pgd" id="lv-pgd"></div></div></div>';
    L._seen={}; renderPlayers(); drawQR(joinUrl(s.code));
  } else if(s.state==='question'&&q){
    var left=Math.max(0, Math.round((q.time*1000-(Date.now()-(s.qStartedAt||Date.now())))/1000));
    var two=(q.opts||[]).length===2;
    main.innerHTML='<div class="qc"><div class="ring" id="lv-ring" style="--p:100%"><i id="lv-left">'+left+'</i></div><h2>'+esc(q.q)+'</h2>'+(q.flash?'<span class="qtag">'+ic2('bolt',16)+' سؤال البرق</span>':'')+(q.mult>1?'<span class="qtag">×'+q.mult+' درجة مضاعفة</span>':'')+'</div>'
      +(q.type==='poll'?'<div class="cloud"><span class="wait">يكتب الطلاب إجاباتهم على الجوال…</span></div>':'<div class="opts"'+(two?' style="grid-template-columns:1fr 1fr;grid-auto-rows:minmax(120px,1fr)"':'')+'>'+(q.opts||[]).map(function(o,i){ return '<div class="opt" style="--a:'+(q.type==='tf'?(i===0?'#3D6B53':'#B3261E'):OC[i])+'"><b>'+(q.type==='tf'?(i===0?ic2('check',30):ic2('x',30)):OS[i])+'</b>'+esc(o)+'</div>'; }).join('')+'</div>')
      +'<div class="meter">'+ic2('users',24)+' <span id="lv-ans">أجاب '+answered+' من '+n+'</span><div class="mb"><i id="lv-mb" style="width:'+(n?Math.round(answered/n*100):0)+'%"></i></div><small>'+(isMarket()?'العملات تنقص مع الوقت · الصحيحة الفورية تمنح 1000':((s.settings||{}).scoring==='fixed'?'1000 نقطة للإجابة الصحيحة':'النقاط تقل مع الوقت · حتى 1000'))+'</small></div>';
    L.timer=setInterval(function(){ var ms=q.time*1000-(Date.now()-(s.qStartedAt||Date.now())); var sec=Math.max(0,Math.ceil(ms/1000)); var e=document.getElementById('lv-left'); var r=document.getElementById('lv-ring'); if(e){ if(e.textContent!==String(sec)&&sec>0&&sec<=3) lvSfx('progress-step'); e.textContent=sec; } if(r){ r.style.setProperty('--p',Math.max(0,ms/(q.time*1000)*100)+'%'); r.classList.toggle('end',ms<=0); } if(ms<=0){ clearInterval(L.timer); if(L.sess&&L.sess.state==='question') window.hhLvReveal(); } },250);
  } else if(s.state==='reveal'&&q&&q.type==='poll'){
    var words={}; var total=0;
    Object.keys(L.players).forEach(function(pid){ var a=(L.players[pid].a||{})[s.qIndex]; if(a&&a.text){ var w=String(a.text).trim(); if(w){ words[w]=(words[w]||0)+1; total++; } } });
    var arr=Object.keys(words).map(function(w){ return {w:w,c:words[w]}; }).sort(function(a,b){ return b.c-a.c; });
    var maxC=arr.length?arr[0].c:1;
    var cloud=arr.map(function(x){ var sz=1.2+(x.c/maxC)*2.6; var op=0.55+(x.c/maxC)*0.45; return '<span style="display:inline-block;margin:8px 14px;font-weight:800;font-size:'+sz.toFixed(2)+'rem;color:#5E0E26;opacity:'+op.toFixed(2)+';">'+esc(x.w)+(x.c>1?'<sub style="font-size:.45em;color:#8A6D2E;"> '+x.c+'</sub>':'')+'</span>'; }).join('');
    main.innerHTML='<div class="qc"><h2>'+esc(q.q)+'</h2></div><div class="cloud">'+(cloud||'<span class="wait">لم تصل إجابات</span>')+'</div><div class="note">'+total+' إجابة · '+arr.length+' كلمة مختلفة</div>';
  } else if(s.state==='reveal'&&q){
    var cnt=[0,0,0,0]; var tot=0; Object.keys(L.players).forEach(function(pid){ var a=(L.players[pid].a||{})[s.qIndex]; if(a&&a.c){ a.c.forEach(function(c){ cnt[c]=(cnt[c]||0)+1; }); tot++; } });
    var okN=0; Object.keys(L.players).forEach(function(pid){ var a=(L.players[pid].a||{})[s.qIndex]; if(a&&a.c&&(q.correct||[]).slice().sort().join(',')===a.c.slice().sort().join(',')) okN++; });
    var fx=fastest(s.qIndex);
    var evs=(isMarket()?(s.events||[]).filter(function(e){ return e.qi===s.qIndex; }):[]);
    main.innerHTML='<div class="qc"><h2>'+esc(q.q)+'</h2></div>'
      +'<div class="opts">'+(q.opts||[]).map(function(o,i){ var ok=(q.correct||[]).indexOf(i)>-1; var pc=tot?Math.round(cnt[i]/tot*100):0; return '<div class="opt '+(ok?'ok':'dim')+'" style="--a:'+(q.type==='tf'?(i===0?'#3D6B53':'#B3261E'):OC[i])+'"><b>'+(q.type==='tf'?(i===0?ic2('check',30):ic2('x',30)):OS[i])+'</b>'+esc(o)+'<span class="cnt">'+cnt[i]+' · '+pc+'%</span><i class="bar" style="width:'+pc+'%"></i></div>'; }).join('')+'</div>'
      +'<div class="note">'+ic2('check',24)+' الإجابة: '+(q.correct||[]).map(function(i){ return esc(q.opts[i]); }).join(' · ')+(fx?' · أسرع إجابة صحيحة: '+esc(fx.name)+' في '+(fx.t/1000).toFixed(1)+' ثانية':'')+'<small>'+okN+' من '+n+' أصابوا</small></div>'
      +(q.note?'<div class="note" style="background:#F5F3F0;color:#3D0918">'+esc(q.note)+'</div>':'')
      +(evs.length?'<div class="evs">'+evs.map(function(e){ return '<span class="'+(e.type==='steal'?'':'b')+'">'+(e.type==='steal'?('سطو: '+esc(e.from)+' أخذ '+fmt(e.amt)+' من '+esc(e.to)):('الدرع صدّ سطو '+esc(e.from)+' على '+esc(e.to)))+'</span>'; }).join('')+'</div>':'');
  } else if(s.state==='shop'){
    var cs={x2:0,shield:0,steal:0,save:0}; Object.keys(L.players).forEach(function(pid){ var sh=(L.players[pid].shop||{})[s.qIndex+1]; if(sh&&cs[sh.buy]!=null) cs[sh.buy]++; });
    main.innerHTML='<div class="hidden-note" style="flex:0;padding-top:10px">السوق مفتوح<small>كل لاعب يقرر على جواله: يشتري تعزيزاً للسؤال التالي أو يحتفظ بعملاته</small></div>'
      +'<div class="shp">'+['x2','shield','steal'].map(function(k){ return '<div>'+SHOP[k].label+'<small>'+SHOP[k].desc+' · '+SHOP[k].cost+'</small><em>'+cs[k]+' اشتروا</em></div>'; }).join('')+'<div>احتفظ<small>بلا شراء</small><em>'+cs.save+'</em></div></div>';
  } else if(s.state==='rank'){
    if(rankHidden()){ main.innerHTML='<div class="hidden-note">الترتيب مخفي حتى النهاية<small>لا أحد يعرف من يتصدر… كل سؤال يغيّر كل شيء</small></div>'; }
    else main.innerHTML=rankView(false);
  } else if(s.state==='paused'){
    main.innerHTML='<div class="hidden-note">الجولة متوقفة مؤقتاً<small>محفوظة بنقاطها عند السؤال '+(s.qIndex+1)+' من '+s.total+' · استأنفها من هنا أو من «ألعابي» في أي وقت</small></div>';
  } else if(s.state==='ended'){
    main.innerHTML='<div class="final"><h1>النتيجة النهائية</h1><div class="sub">'+esc(s.title)+' · '+n+' لاعباً · '+s.total+' سؤالاً</div></div>'+rankView(true);
  }
}
function renderPlayers(){
  var box=document.getElementById('lv-pgd'); if(!box) return; L._seen=L._seen||{};
  var arr=playersArr().sort(function(a,b){ return ((L.players[a.pid].joinedAt||0)-(L.players[b.pid].joinedAt||0)); });
  var newest=null; arr.forEach(function(p){ if(!L._seen[p.pid]){ L._seen[p.pid]=1; newest=p; } });
  var nEl=document.getElementById('lv-n'); if(nEl) nEl.textContent=arr.length;
  if(newest){ var nw=document.getElementById('lv-new'); if(nw) nw.textContent=newest.name+' انضم الآن'; }
  box.innerHTML=arr.length?arr.map(function(p,i){ return '<span class="'+(newest&&p.pid===newest.pid?'nw':'')+'"><i style="--a:'+TCOL[i%TCOL.length]+'">'+esc(initial(p.name))+'</i>'+esc(p.name)+'</span>'; }).join(''):'<span class="wait" style="background:transparent">بانتظار أول لاعب…</span>';
}
function rankView(final){
  var s=L.sess; var sc=s.scores||{}; var nm=s.names||{};
  var arr=Object.keys(sc).map(function(pid){ return {pid:pid,name:nm[pid]||'لاعب',pts:sc[pid]||0}; }).sort(function(a,b){ return b.pts-a.pts; });
  if(!arr.length) return '<div class="hidden-note">لا نتائج بعد</div>';
  var prev={}; try{ if(!final&&s.qIndex>0){ prev=ranksOf(computeScores(s.qIndex-1).scores); } }catch(e){}
  var pod=arr.slice(0,3); var H=[340,250,190];
  var order=pod.length===3?[1,0,2]:pod.length===2?[1,0]:[0];
  var podHtml='<div class="podm">'+order.map(function(k){ var p=pod[k]; return '<div class="pcm"><b>'+esc(p.name)+'</b><small>'+fmt(p.pts)+'</small><div class="stp" style="height:clamp('+Math.round(H[k]*.45)+'px,'+Math.round(H[k]/10.8)+'vh,'+H[k]+'px);animation-delay:'+(final?(2-k)*0.5:0)+'s">'+(k+1)+'</div></div>'; }).join('')+'</div>';
  var rest=arr.slice(3,final?10:8).map(function(p,i){ var r=i+4; var mv=''; if(prev[p.pid]){ var d=prev[p.pid]-r; if(d>0) mv='<span class="mv">'+ic2('up',16)+d+'</span>'; else if(d<0) mv='<span class="mv dn">'+ic2('down',16)+(-d)+'</span>'; } return '<div style="animation-delay:'+(i*0.06)+'s"><em>'+r+'</em>'+esc(p.name)+mv+'<b>'+fmt(p.pts)+'</b></div>'; }).join('');
  return '<div class="rkw">'+podHtml+(rest?'<div class="rlst">'+rest+'</div>':'<div></div>')+'</div>';
}
window.hhLvFull=function(){ var r=document.getElementById('hh-lv'); try{ if(document.fullscreenElement) document.exitFullscreen(); else if(r&&r.requestFullscreen) r.requestFullscreen(); }catch(e){} };
function lvKey(e){
  if(!document.getElementById('hh-lv')||!L.sess||!L.host) return; var tg=e.target&&e.target.tagName; if(tg==='INPUT'||tg==='TEXTAREA') return;
  var s=L.sess, k=(e.key||'').toLowerCase();
  if(k===' '||k==='enter'){ e.preventDefault(); var b=document.querySelector('#hh-lv .ctl .tb.gold'); if(b&&!b.disabled) b.click(); }
  else if(k==='p'||k==='ح'){ e.preventDefault(); if(s.state==='paused') hhLvUnpause(); else if(['question','reveal','shop','rank'].indexOf(s.state)>-1) hhLvPause(); }
  else if(k==='f'||k==='ب'){ e.preventDefault(); hhLvFull(); }
}
document.addEventListener('keydown', lvKey, true);

function rankHTML(limit, full){
  var s=L.sess; var sc=s.scores||{}; var nm=s.names||{};
  var arr=Object.keys(sc).map(function(pid){ return {pid:pid,name:nm[pid]||'لاعب',pts:sc[pid]||0}; }).sort(function(a,b){ return b.pts-a.pts; }).slice(0,limit);
  return '<div class="rank">'+arr.map(function(p,i){ return '<div class="rk '+(i===0?'g1':'')+'" data-i="'+i+'"><span class="n">'+(i+1)+'</span><span class="nm">'+esc(p.name)+'</span><span class="pt">'+p.pts.toLocaleString('en-US')+'</span></div>'; }).join('')+(arr.length?'':'<div class="hidden-note">لا نتائج بعد</div>')+'</div>';
}
function progressiveReveal(){
  var rows=Array.prototype.slice.call(document.querySelectorAll('#hh-lv .rk')); rows.forEach(function(r){ r.style.opacity='0'; });
  var top=rows.slice(0,5).reverse(); var rest=rows.slice(5);
  rest.forEach(function(r){ r.style.opacity='1'; });
  top.forEach(function(r,i){ setTimeout(function(){ r.style.opacity='1'; r.style.animation='slide .5s both'; },700*i+400); });
}
function drawQR(url){
  var box=document.getElementById('lv-qr'); if(!box) return; box.innerHTML='';
  var go=function(){ try{ new QRCode(box,{text:url,width:220,height:220,colorDark:'#3D0918',colorLight:'#FFFDF8',correctLevel:QRCode.CorrectLevel.M}); }catch(e){ box.innerHTML='<div style="font-size:.72rem;color:#8A6D2E;">استخدم الرمز أو الرابط</div>'; } };
  if(window.QRCode) return go();
  var sc=document.createElement('script'); sc.src='https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'; sc.onload=go; sc.onerror=function(){ box.innerHTML='<div style="font-size:.72rem;color:#8A6D2E;">تعذر رسم الباركود · استخدم الرمز أو الرابط</div>'; }; document.head.appendChild(sc);
}
function lvSfx(n){ try{ if(window.hhSfx) hhSfx.play(n); }catch(e){} } /* zzzzzzcc: أصوات السباق على شاشة المعلم */
window.hhLvStart=function(){ L._revealed=false; lvSfx('open'); setState({state:'question', qIndex:0, qStartedAt:Date.now()}); };
window.hhLvReveal=async function(){ var r=computeScores();
  try{ var _q=curQ(), _s=L.sess; if(_q&&_q.type!=='poll'&&window.hhApplause){ var _ck=(_q.correct||[]).slice().sort().join(','); var _any=Object.keys(L.players).some(function(pid){ var a=(L.players[pid].a||{})[_s.qIndex]; return a&&a.c&&a.c.slice().sort().join(',')===_ck; }); if(_any) hhApplause.play(); lvSfx(_any?'success':'unlock'); } }catch(e){} /* zzzzzzbv */
  await setState({state:'reveal', scores:r.scores, names:r.names, events:r.events, playersCount:Object.keys(L.players).length}); };
window.hhLvRank=function(){ setState({state:'rank'}); };
window.hhLvShop=function(){ setState({state:'shop'}); };
window.hhLvNext=function(){ var s=L.sess; if(s.qIndex+1>=s.total){ window.hhLvEnd(); return; } lvSfx('open'); setState({state:'question', qIndex:s.qIndex+1, qStartedAt:Date.now()}); };
window.hhLvPause=function(){ setState({state:'paused', pausedFrom:L.sess.state}); };
window.hhLvUnpause=function(){ var s=L.sess; var from=s.pausedFrom||'question'; if(from==='question') setState({state:'question', qStartedAt:Date.now()}); else setState({state:from}); };
window.hhLvEnd=async function(){ var r=computeScores(); lvSfx('achievement'); await setState({state:'ended', scores:r.scores, names:r.names, events:r.events, playersCount:Object.keys(L.players).length}); };
window.hhLvCSV=function(){
  var s=L.sess; var sc=s.scores||{}; var nm=s.names||{}; var q=function(x){ return '"'+String(x==null?'':x).replace(/"/g,'""')+'"'; };
  var head=['الترتيب','اللاعب','النقاط'].concat(s.questions.map(function(_,i){ return 'س'+(i+1); }));
  var arr=Object.keys(sc).map(function(pid){ return {pid:pid,name:nm[pid],pts:sc[pid]}; }).sort(function(a,b){ return b.pts-a.pts; });
  var lines=[head.map(q).join(',')].concat(arr.map(function(p,i){ var P=L.players[p.pid]||{}; var A=P.a||{}; return [i+1,p.name,p.pts].concat(s.questions.map(function(_,qi){ var oi=(s.order||[]).indexOf(qi); var a=A[oi]; if(!a) return ''; var qq=s.questions[qi]; return (qq.correct.slice().sort().join(',')===(a.c||[]).slice().sort().join(','))?'✓':'✗'; })).map(q).join(','); }));
  var blob=new Blob(['\ufeff'+lines.join('\r\n')],{type:'text/csv;charset=utf-8'}); var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='سباق-'+(s.title||'').replace(/[\\/:*?"<>|]/g,' ')+'-'+s.code+'.csv'; document.body.appendChild(a); a.click(); setTimeout(function(){ a.remove(); },500);
};

/* ═══════════ اللاعب ═══════════ */
/* zzzzzzcc · خصوصية الطلاب: لا أسماء. شعار ورقم فقط */
var AVS=[['النجمة','<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>','#8A1538'],
 ['الهلال','<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>','#1F4E79'],
 ['الشمس','<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>','#B5801F'],
 ['الموجة','<path d="M2 12c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-2 5-1"/><path d="M2 17c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-2 5-1"/>','#0F6E56'],
 ['الجبل','<path d="M3 20l6.5-11 4 6.5 2.5-4L21 20z"/>','#5A3A8E'],
 ['الدرع','<path d="M12 3l8 3v6c0 4.5-3.4 7.8-8 9-4.6-1.2-8-4.5-8-9V6z"/>','#3D6B53'],
 ['الشعلة','<path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-4 2.5-5 .3 2 1.3 3 2.5 3 0-3-1-5 0-8z"/>','#C2410C'],
 ['اللؤلؤة','<circle cx="12" cy="12" r="8"/><path d="M8.5 9.5a4 4 0 0 1 3-2.5"/>','#3D4A7A']];
window.hhPlAv=function(i){ L.av=i; try{ localStorage.setItem('hh_lv_av',String(i)); }catch(e){} document.querySelectorAll('#hh-pl .av').forEach(function(b,k){ b.classList.toggle('on',k===i); }); };
function playerBoot(){
  var m=location.search.match(/[?&]join=([A-Za-z0-9]{4,8})/); if(!m) return;
  var code=m[1].toUpperCase(); style();
  L.code=code; L.pname=''; L.pid=deviceId(); try{ localStorage.removeItem('hh_lv_name'); var av=parseInt(localStorage.getItem('hh_lv_av'),10); L.av=isNaN(av)?null:av; }catch(e){ L.av=null; }
  var ov=document.createElement('div'); ov.id='hh-pl'; document.body.appendChild(ov);
  try{ document.body.classList.add('hh-immersive'); }catch(e){}
  playerRender('join');
}
// هوية جهاز محلية ثابتة (تعمل على آيفون وكل جهاز حتى لو حُجب الدخول المجهول)
function deviceId(){
  var k='hh_lv_device';
  try{ var v=localStorage.getItem(k); if(v) return v; v='d_'+Date.now().toString(36)+Math.random().toString(36).slice(2,10); localStorage.setItem(k,v); return v; }
  catch(e){ if(!window.__hhDev) window.__hhDev='d_'+Math.random().toString(36).slice(2,12); return window.__hhDev; }
}
// لا مصادقة في مسار اللاعب: الانضمام بهوية الجهاز فقط (يعمل على آيفون بلا تعليق)
function ensureAnon(){ return Promise.resolve(L.pid||deviceId()); }
function playerRender(mode, extra){
  var ov=document.getElementById('hh-pl'); if(!ov) return; var s=L.sess;
  var myPts=(s&&s.scores&&s.scores[L.pid]!=null&&!playerRankHidden())?s.scores[L.pid]:null;
  var top='<div class="top"><div><b>'+esc(L.pname||'سباق المُلهم المباشر')+'</b><span>'+(s?(esc(s.title)+' · '+esc(L.code)):'انضم بالرمز '+esc(L.code))+'</span></div>'+(myPts!=null?'<span class="sc">'+fmt(myPts)+'</span>':'')+'</div>';
  var body='';
  var colOf=function(q,i){ return q.type==='tf'?(i===0?'#3D6B53':'#B3261E'):OC[i]; };
  var shpOf=function(q,i){ return q.type==='tf'?(i===0?ic2('check',24):ic2('x',24)):OS[i]; };
  if(mode==='join'){ var avs=AVS.map(function(v,i){ return '<button type="button" class="av'+(L.av===i?' on':'')+'" style="--a:'+v[2]+'" onclick="hhPlAv('+i+')" aria-label="'+v[0]+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'+v[1]+'</svg><span>'+v[0]+'</span></button>'; }).join('');
    body='<div class="center jn2"><b>انضم إلى السباق</b><p>الرمز <bdi dir="ltr">'+esc(L.code)+'</bdi>. اختر شعارك، ولا نطلب اسمك.</p><div class="avg">'+avs+'</div><input id="pl-seat" inputmode="numeric" maxlength="2" value="'+esc(L.seat||'')+'" placeholder="رقمك في كشف الصف (اختياري)" oninput="this.value=this.value.replace(/[^0-9]/g,\'\')"><button class="go" onclick="hhPlJoin()">ادخل</button><p class="pv">لا يحتاج حساباً، ولا يُحفظ اسم أي طالب.</p></div>'; }
  else if(mode==='wait') body='<div class="center"><b>'+esc(extra||'أنت في السباق')+'</b><p>عيناك على الشاشة الرئيسة، والأزرار تظهر هنا مع كل سؤال</p></div>';
  else if(mode==='question' && L.curQ && L.curQ.type==='poll'){ var qp=L.curQ;
    body='<div class="bar"><i id="pl-bar" style="width:100%"></i></div><div class="pq">'+esc(qp.q)+'<small>السؤال '+(s.qIndex+1)+' من '+s.total+'</small></div>'
      +'<input id="pl-poll-in" placeholder="اكتب إجابتك بكلمة أو كلمتين" maxlength="30"><button class="go" onclick="hhPlPoll()">إرسال</button>'; }
  else if(mode==='question'){ var q=L.curQ; var two=(q.opts||[]).length===2; var order=L.optOrder;
    body='<div class="bar"><i id="pl-bar" style="width:100%"></i></div><div class="pq">'+esc(q.q)+'<small>السؤال '+(s.qIndex+1)+' من '+s.total+(q.mult>1?' · ×'+q.mult:'')+(q.flash?' · سؤال البرق':'')+'</small></div>'
      +'<div class="ans '+(two?'two':'')+'">'+order.map(function(i){ return '<button style="background:'+colOf(q,i)+'" onclick="hhPlAnswer('+i+')"><span>'+shpOf(q,i)+'</span>'+esc(q.opts[i])+'</button>'; }).join('')+'</div>'; }
  else if(mode==='answered'){ var qa=L.curQ; var my=s&&L.myAns[s.qIndex]; var ci=(my&&my.c)?my.c[0]:null;
    body='<div class="center"><p>إجابتك</p>'+(qa&&ci!=null?'<div class="sel" style="--a:'+colOf(qa,ci)+'"><span>'+shpOf(qa,ci)+'</span>'+esc(qa.opts[ci])+'</div>':'')+'<b>بانتظار الكشف</b><p>'+(my&&my.t!=null?'أجبت في '+(my.t/1000).toFixed(1)+' ثانية':'')+'</p></div>'; }
  else if(mode==='polldone') body='<div class="full okb"><div class="ic">'+ic2('check',60)+'</div><b>شكراً لمشاركتك</b><p>إجابتك تظهر في السحابة على الشاشة</p></div>';
  else if(mode==='reveal'){ var r=extra||{};
    body='<div class="full '+(r.ok?'okb':r.none?'neu':'bad')+'"><div class="ic">'+(r.ok?ic2('check',64):ic2('x',64))+'</div><b>'+(r.ok?'إجابة صحيحة':(r.none?'لم تُجب':'إجابة خاطئة'))+'</b>'
      +(r.ok?'<p>+'+fmt(r.pts)+(isMarket()?' عملة':' نقطة')+'</p>':'')
      +(r.streak>1?'<span class="chip">'+ic2('fire',16)+' '+r.streak+' إجابات صحيحة متتالية</span>':'')
      +(!r.ok&&r.showAns&&r.ans?'<p>الإجابة: '+esc(r.ans)+'</p>':'')+'</div>'; }
  else if(mode==='rank'){ if(extra.hidden) body='<div class="full mar"><b>الترتيب مخفي</b><p>تابع السباق، كل سؤال يغيّر كل شيء</p></div>';
    else body='<div class="full mar"><p>ترتيبك</p><div class="rk">'+extra.rank+'</div><p>من '+extra.n+' · '+fmt(extra.pts)+' نقطة</p>'+(extra.gap!=null?'<span class="chip">'+(extra.rank===1?ic2('up',16)+' متقدم على الثاني بـ '+fmt(extra.gap)+' نقطة':'خلف '+esc(extra.aheadName||'من قبلك')+' بـ '+fmt(extra.gap)+' نقطة')+'</span>':'')+'</div>'; }
  else if(mode==='shop'){ var bal=(s.scores||{})[L.pid]||0; var mine=L.myShop[s.qIndex+1];
    body='<div class="pq">محفظتك: '+fmt(bal)+'<small>'+(mine?('اخترت: '+(mine==='save'?'الاحتفاظ':SHOP[mine].label)):'اختر تعزيزاً للسؤال التالي أو احتفظ بعملاتك')+'</small></div>'
      +'<div class="ans">'+['x2','shield','steal'].map(function(k){ var can=bal>=SHOP[k].cost && !mine; return '<button style="background:'+(k==='x2'?'#8A1538':k==='shield'?'#1F4E79':'#8A6D2E')+'" '+(can?'':'disabled')+' onclick="hhPlBuy(\''+k+'\')"><span>'+SHOP[k].ico+'</span><div>'+SHOP[k].label+'<small>'+SHOP[k].desc+' · '+SHOP[k].cost+'</small></div></button>'; }).join('')
      +'<button style="background:#3D6B53" '+(mine?'disabled':'')+' onclick="hhPlBuy(\'save\')"><span>◇</span>احتفظ بعملاتي</button></div>'; }
  else if(mode==='paused') body='<div class="center"><b>توقفت الجولة مؤقتاً</b><p>ابقَ في الصفحة، ستُستأنف من المكان نفسه بنقاطك</p></div>';
  else if(mode==='ended') body='<div class="full mar"><p>انتهى السباق</p><div class="rk">'+extra.rank+'</div><p>ترتيبك من '+extra.n+' · '+fmt(extra.pts)+' نقطة</p><span class="chip">شكراً لمشاركتك في المُلهم</span></div>';
  ov.innerHTML=top+'<div class="body">'+body+'</div>';
}
function myStreak(){ var s=L.sess; if(!s) return 0; var n=0; for(var qi=s.qIndex; qi>=0; qi--){ var a=L.myAns[qi]; var q=qAt(qi); if(!a||!q||!a.c) break; var ok=(q.correct||[]).slice().sort().join(',')===(a.c||[]).slice().sort().join(','); if(!ok) break; n++; } return n; }
function playerRankHidden(){ var s=L.sess; if(!s) return true; var S=s.settings||{}; if(S.hideRank==='always') return true; if(S.hideRank==='last') return (s.total-(s.qIndex+1)) < (S.hideLastN||5); return false; }
window.hhPlJoin=async function(){
  if(L.av==null||!AVS[L.av]){ toastX('اختر شعارك أولاً','info'); return; }
  var se=document.getElementById('pl-seat'), seat=String(se&&se.value||'').replace(/[^0-9]/g,'').slice(0,2); L.seat=seat;
  var nm=AVS[L.av][0]+' '+(seat||String(10+Math.floor(Math.random()*90)));
  var btn=document.querySelector('#hh-pl .go'); if(btn){ btn.disabled=true; btn.textContent='جارٍ الانضمام…'; }
  L.pid=deviceId(); L.pname=nm;
  var reset=function(){ if(btn){ btn.disabled=false; btn.textContent='انضم إلى السباق'; } };
  // حارس صارم: إن لم تكتمل الكتابة خلال 8 ثوانٍ، لا نبقى معلّقين
  var guard=setTimeout(function(){ reset(); toastX('الاتصال بطيء · تأكد من الإنترنت وحاول ثانية','error'); playerRender('join'); var e0=document.getElementById('pl-name'); if(e0) e0.value=nm; }, 8000);
  try{
    var ref=db().collection('game_sessions').doc(L.code);
    // نكتب المستند مباشرة (upsert) دون قراءة مسبقة تتطلب مصادقة
    await ref.collection('players').doc(L.pid).set({name:nm, joinedAt:Date.now()},{merge:true});
    clearTimeout(guard);
    playerRender('wait');
    if(L.unsub) L.unsub();
    L.unsub=ref.onSnapshot(function(snap){ if(!snap.exists){ return; } var prev=L.sess; L.sess=snap.data(); L.sess.code=L.code; playerOnState(prev); }, function(e){ playerRender('wait','انقطع الاتصال، أعد تحميل الصفحة'); });
  }catch(e){
    clearTimeout(guard); reset();
    var code=(e&&e.code)||''; var msg='تعذر الانضمام';
    if(code.indexOf('permission')>-1) msg='تعذر الانضمام · انشر قاعدة Firestore الأخيرة (zzzzzzm)';
    else if(code.indexOf('not-found')>-1) msg='الرمز غير صحيح';
    else if(code) msg='تعذر الانضمام · '+code;
    toastX(msg,'error'); playerRender('join'); var e2=document.getElementById('pl-name'); if(e2) e2.value=nm;
  }
}
function playerOnState(prev){
  var s=L.sess; var key=s.state+':'+s.qIndex+':'+(s.qStartedAt||0);
  if(L.lastKey===key) return; L.lastKey=key;
  if(s.state==='lobby') playerRender('wait');
  else if(s.state==='question'){ var oi=(s.order||[])[s.qIndex]; var q=s.questions[oi==null?s.qIndex:oi]; L.curQ=q; L.qReceivedAt=Date.now(); var n=(q.opts||[]).length; L.optOrder=[]; for(var i=0;i<n;i++) L.optOrder.push(i); if((s.settings||{}).shuffleOpts!==false && n>2) L.optOrder.sort(function(){ return Math.random()-.5; });
    if(L.myAns[s.qIndex]) { playerRender('answered'); return; }
    playerRender('question'); clearInterval(L.timer); L.timer=setInterval(function(){ var ms=q.time*1000-(Date.now()-L.qReceivedAt); var b=document.getElementById('pl-bar'); if(b) b.style.width=Math.max(0,ms/(q.time*1000)*100)+'%'; if(ms<=0){ clearInterval(L.timer); var btns=document.querySelectorAll('#hh-pl .ans button'); btns.forEach(function(x){ x.disabled=true; }); } },200); }
  else if(s.state==='reveal' && (L.curQ&&L.curQ.type==='poll')){ clearInterval(L.timer); playerRender('polldone'); }
  else if(s.state==='reveal'){ clearInterval(L.timer); var q2=L.curQ||s.questions[(s.order||[])[s.qIndex]]; var a=L.myAns[s.qIndex]; var ok=false; if(a&&q2){ ok=(q2.correct||[]).slice().sort().join(',')===(a.c||[]).slice().sort().join(','); }
    var pts=0; if(ok&&q2){ var S=s.settings||{}; var base=1000; if((S.scoring||'speed')==='speed'){ var frac=Math.min(1,Math.max(0,(a.t||0)/(q2.time*1000))); base=Math.round(1000*(1-frac/2)); } pts=base*(q2.mult||1); }
    playerRender('reveal',{ok:ok,none:!a,pts:pts,streak:(ok?myStreak():0),showAns:(s.settings||{}).showAnswerEach!==false,ans:q2?(q2.correct||[]).map(function(i){ return q2.opts[i]; }).join(' · '):''}); }
  else if(s.state==='rank'){ var sc=s.scores||{}; var arr=Object.keys(sc).sort(function(x,y){ return sc[y]-sc[x]; }); var ri=arr.indexOf(L.pid); var gp=null, an=''; if(ri===0&&arr.length>1) gp=(sc[L.pid]||0)-(sc[arr[1]]||0); else if(ri>0){ gp=(sc[arr[ri-1]]||0)-(sc[L.pid]||0); an=(s.names||{})[arr[ri-1]]||''; } playerRender('rank',{hidden:playerRankHidden(), rank:ri+1, n:arr.length, pts:sc[L.pid]||0, gap:gp, aheadName:an}); }
  else if(s.state==='shop'){ playerRender('shop'); }
  else if(s.state==='paused') playerRender('paused');
  else if(s.state==='ended'){ var sc2=s.scores||{}; var arr2=Object.keys(sc2).sort(function(x,y){ return sc2[y]-sc2[x]; }); playerRender('ended',{rank:arr2.indexOf(L.pid)+1||'·', n:arr2.length, pts:sc2[L.pid]||0}); }
}
window.hhPlBuy=async function(k){
  var s=L.sess; if(!s||s.state!=='shop') return; var target=s.qIndex+1; if(L.myShop[target]) return;
  var bal=(s.scores||{})[L.pid]||0; if(k!=='save' && (!SHOP[k] || bal<SHOP[k].cost)){ toastX('عملاتك لا تكفي','info'); return; }
  L.myShop[target]=k; playerRender('shop');
  try{ var o={}; o[target]={buy:k, t:Date.now()}; await db().collection('game_sessions').doc(L.code).collection('players').doc(L.pid).set({shop:o, name:L.pname},{merge:true}); }catch(e){ toastX('تعذر إرسال الاختيار','error'); }
};
window.hhPlPoll=async function(){
  var s=L.sess; if(!s||s.state!=='question') return; if(L.myAns[s.qIndex]) return;
  var inp=document.getElementById('pl-poll-in'); var val=(inp&&inp.value||'').trim().slice(0,30);
  if(!val){ toastX('اكتب إجابتك','info'); return; }
  var ans={ text:val, t:Date.now()-L.qReceivedAt }; L.myAns[s.qIndex]=ans; playerRender('answered');
  try{ var o={}; o[s.qIndex]=ans; await db().collection('game_sessions').doc(L.code).collection('players').doc(L.pid).set({a:o, name:L.pname},{merge:true}); }catch(e){ toastX('تعذّر الإرسال','error'); L.myAns[s.qIndex]=null; playerRender('question'); }
};
window.hhPlAnswer=async function(i){
  var s=L.sess; if(!s||s.state!=='question') return; if(L.myAns[s.qIndex]) return;
  var t=Date.now()-L.qReceivedAt; var ans={c:[i], t:t}; L.myAns[s.qIndex]=ans; playerRender('answered');
  try{ await db().collection('game_sessions').doc(L.code).collection('players').doc(L.pid).set({a:(function(){ var o={}; o[s.qIndex]=ans; return o; })(), name:L.pname},{merge:true}); }catch(e){ toastX('تعذر إرسال الإجابة','error'); }
};
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', playerBoot); else playerBoot();
})();
