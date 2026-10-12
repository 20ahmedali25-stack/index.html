/* ============================================================
   المُلهم التعليمي، المحبرة: السلوك والتقويم (zzzzzzcf)
   وضع الحصة، دليل سلوك شامل، ملف الطالب، الدرجات، المتابعة الشهرية،
   التقرير الذكي، الشهادات بشعار المُلهم الأصلي. الطلاب بأرقام الجلوس فقط.
   التسجيلات تُحفظ في student_records/{id}.mh والدرجات في mhGrades.
   ============================================================ */
(function(){
'use strict';
if(window.hhMhOpen) return;
var MHCSS="#hh-mh{--bg:#F5F1E8;--surface:#FFFFFF;--soft:#FBF7EE;--ink:#3D0918;--text:#2A1A0E;--muted:#7A6A54;--line:#E7DAC0;--maroon:#5E0E26;--maroon2:#8A1538;--band:#5E0E26;--band2:#4A0B1E;--gold:#B8924A;--goldL:#E6CE8E;--goldBg:#FBF1DA;--green:#2F6A4E;--greenBg:#EEF4F0;--red:#B3261E;--redBg:#FCEEEC;--amber:#A8650F;--amberBg:#FBF1E0;--blue:#1F4E79;--onband:#F5E6C4;--shadow:0 10px 28px rgba(61,9,24,.08);--f-ui:'Cairo',Tahoma,sans-serif;--f-q:'Amiri','Traditional Arabic',serif;}\nbody.dark-mode #hh-mh{--bg:#160A0F;--surface:#22121A;--soft:#2A1720;--ink:#F5E6C4;--text:#EFE3CC;--muted:#B8A68A;--line:#3E2C24;--maroon:#C2405E;--maroon2:#D25A76;--goldBg:#3A2A10;--green:#5FB58A;--greenBg:#173226;--red:#F07A6E;--redBg:#3A1512;--amber:#E0A04A;--amberBg:#3A2810;--blue:#6FA3D6;}\nhtml body #hh-mh{position:fixed;top:var(--hh-bar,80px);bottom:var(--hh-bar-b,0px);left:0;right:0;z-index:2900;overflow-y:auto;background:var(--bg);color:var(--text);direction:rtl;font-family:var(--f-ui);font-size:15px;line-height:1.6;}\n#hh-mh .mh-top{background:var(--band);color:#fff;border-bottom:1px solid rgba(255,255,255,.85);}\n#hh-mh .mh-top .mh-cls{max-width:1200px;margin:0 auto;padding:12px 16px 4px;display:flex;align-items:center;gap:8px;}\n#hh-mh .mh-cls label,.gvh-meta .mh-cls label{font-size:12.5px;font-weight:800;color:#E6CE8E;}\n#hh-mh .mh-cls select,.gvh-meta .mh-cls select{height:38px;border-radius:10px;border:0;padding:0 12px;font-family:Cairo,sans-serif;font-weight:800;font-size:14px;background:#fff;color:#5E0E26;}\n.gvh-meta .mh-cls{display:flex;align-items:center;gap:8px;}\n#hh-mh .mh-tabs{max-width:1200px;margin:0 auto;padding:0 16px;display:flex;gap:2px;overflow-x:auto;}\n#hh-mh .mh-tabs button{border:0;background:none;color:#E6CE8E;font-weight:800;font-size:14px;padding:8px 15px 10px;border-radius:12px 12px 0 0;white-space:nowrap;display:flex;gap:7px;align-items:center;}\n#hh-mh .mh-tabs button.on{background:var(--bg);color:var(--ink);}\n#hh-mh #mh-app{padding-block:18px 40px;}\n#hh-mh .otools{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;}\n@media (max-width:900px){ #hh-mh .otools{grid-template-columns:repeat(2,minmax(0,1fr));} }\n#hh-mh .otools button{border:1.5px solid var(--line);background:var(--surface);border-radius:14px;padding:12px;text-align:start;display:flex;flex-direction:column;gap:2px;color:var(--text);}\n#hh-mh .otools button:hover{border-color:var(--gold);} #hh-mh .otools b{color:var(--ink);font-weight:900;} #hh-mh .otools small{color:var(--muted);font-weight:700;font-size:12.5px;}\n.mh-toast{position:fixed;bottom:18px;left:0;right:0;margin:auto;width:max-content;max-width:90vw;background:#3D0918;color:#F5E6C4;border-radius:12px;padding:10px 16px;font-weight:800;font-size:14px;z-index:100100;font-family:Cairo,sans-serif;}\n#hh-mh .sheet-bg{z-index:100060;}\nhtml body #hh-mh .sheet-bg{top:var(--hh-bar,80px);padding:12px;}\nhtml body #hh-mh .sheet{max-height:calc(100vh - var(--hh-bar,80px) - 24px);}\nhtml body #hh-mh .btn{width:auto;margin-top:0;transform:none;box-shadow:none;flex-shrink:0;}\nhtml body #hh-mh .btn:hover{transform:none;box-shadow:none;filter:brightness(.97);}\n/*CERT*/\n#hh-mh *{box-sizing:border-box}\n#hh-mh ,#hh-mh {direction:rtl}\n#hh-mh {margin:0;background:var(--bg);color:var(--text);font-family:var(--f-ui);font-size:15px;line-height:1.6}\n#hh-mh button{font-family:inherit;cursor:pointer}\n#hh-mh button:focus-visible,#hh-mh input:focus-visible,#hh-mh select:focus-visible{outline:3px solid var(--gold);outline-offset:2px}\n#hh-mh svg{flex-shrink:0}\n#hh-mh .wrap{max-width:1200px;margin:0 auto;padding-inline:16px}\n#hh-mh .num{font-variant-numeric:tabular-nums}\n#hh-mh .top{background:var(--band);border-bottom:1px solid rgba(255,255,255,.8);color:var(--onband)}\n#hh-mh .top .wrap{display:flex;align-items:stretch;gap:2px;height:46px;overflow-x:auto;scrollbar-width:none}\n#hh-mh .top .wrap::-webkit-scrollbar{display:none}\n#hh-mh .top .brand{font-weight:900;font-size:18px;color:#fff;display:flex;align-items:center;padding-left:18px;margin-left:8px;border-left:1px solid rgba(255,255,255,.25);white-space:nowrap}\n#hh-mh .top a{display:flex;align-items:center;padding:0 14px;color:var(--onband);text-decoration:none;font-weight:800;font-size:14px;white-space:nowrap;position:relative}\n#hh-mh .top a.on{background:var(--band2);color:#fff}\n#hh-mh .top a.on::after{content:\"\";position:absolute;inset-inline:0;bottom:-1px;height:3px;background:#fff}\n#hh-mh .top .play{margin-inline-start:auto;align-self:center;height:32px;border-radius:8px;background:linear-gradient(135deg,#C9A24E,#8A6D2E);color:#fff;padding:0 16px;font-weight:900}\n#hh-mh .top .play::after{display:none}\n#hh-mh .band{background:var(--band);color:#fff;border-bottom:1px solid rgba(255,255,255,.8)}\n#hh-mh .band .in{display:flex;align-items:center;gap:14px;padding-block:16px 10px}\n#hh-mh .md{width:48px;height:48px;border-radius:12px;background:#fff;color:#5E0E26;display:grid;place-items:center}\n#hh-mh .bc{font-size:12.5px;font-weight:800;color:var(--goldL)}\n#hh-mh .band h1{margin:0;font-size:24px;font-weight:900;line-height:1.3;text-wrap:balance}\n#hh-mh .band p{margin:0;font-size:13px;font-weight:700;color:var(--onband);opacity:.92}\n#hh-mh .cls{margin-inline-start:auto;display:flex;align-items:center;gap:8px;flex-wrap:wrap}\n#hh-mh .cls label{font-size:12.5px;font-weight:800;color:var(--goldL)}\n#hh-mh .cls select{height:38px;border-radius:10px;border:0;padding:0 12px;font-family:inherit;font-weight:800;font-size:14px;background:#fff;color:#5E0E26}\n#hh-mh .tabs{display:flex;gap:2px;overflow-x:auto;scrollbar-width:none}\n#hh-mh .tabs::-webkit-scrollbar{display:none}\n#hh-mh .tabs button{border:0;background:none;color:var(--goldL);font-weight:800;font-size:14px;padding:8px 15px 10px;border-radius:12px 12px 0 0;white-space:nowrap;display:flex;align-items:center;gap:7px}\n#hh-mh .tabs button:hover{color:#fff;background:rgba(255,255,255,.07)}\n#hh-mh .tabs button.on{background:var(--bg);color:var(--ink)}\n#hh-mh .tabs button em{font-style:normal;font-size:11px;background:rgba(255,255,255,.16);border-radius:99px;padding:0 7px}\n#hh-mh .tabs button.on em{background:var(--goldBg);color:var(--amber)}\n#hh-mh main{padding-block:18px 40px}\n#hh-mh .note{display:flex;align-items:center;gap:10px;background:var(--surface);border:1.5px dashed var(--gold);border-radius:12px;padding:9px 14px;font-size:13px;font-weight:700;color:var(--muted);margin-bottom:16px}\n#hh-mh .note b{color:var(--ink)}\n#hh-mh .sec{display:flex;align-items:baseline;gap:10px;margin:22px 0 10px;flex-wrap:wrap}\n#hh-mh .sec h2{margin:0;font-size:18px;font-weight:900;color:var(--ink);display:flex;align-items:center;gap:9px}\n#hh-mh .sec h2::before{content:\"\";width:9px;height:9px;background:var(--gold);transform:rotate(45deg)}\n#hh-mh .sec small{font-weight:700;color:var(--muted);font-size:13px}\n#hh-mh .sec .r{margin-inline-start:auto;display:flex;gap:8px;flex-wrap:wrap}\n#hh-mh .pn{background:var(--surface);border:1.5px solid var(--line);border-radius:16px;padding:16px}\n#hh-mh .btn{height:40px;border-radius:10px;border:1.5px solid var(--line);background:var(--surface);color:var(--maroon);font-weight:800;font-size:14px;padding:0 14px;display:inline-flex;align-items:center;gap:7px;white-space:nowrap}\n#hh-mh .btn:hover{border-color:var(--gold)}\n#hh-mh .btn.p{background:linear-gradient(135deg,#8A1538,#5E0E26);color:#F5E6C4;border-color:transparent}\n#hh-mh .btn.g{background:linear-gradient(135deg,#C9A24E,#8A6D2E);color:#fff;border-color:transparent}\n#hh-mh .btn.s{height:32px;font-size:12.5px;padding:0 10px;border-radius:8px}\n#hh-mh .chip{display:inline-flex;align-items:center;gap:5px;border-radius:99px;padding:1px 10px;font-size:12px;font-weight:800;white-space:nowrap}\n#hh-mh .c-g{background:var(--greenBg);color:var(--green)}\n#hh-mh .c-r{background:var(--redBg);color:var(--red)}\n#hh-mh .c-a{background:var(--amberBg);color:var(--amber)}\n#hh-mh .c-m{background:var(--goldBg);color:var(--amber)}\n#hh-mh .c-n{background:var(--soft);color:var(--muted)}\n#hh-mh .grid{display:grid;gap:14px}\n#hh-mh .g4{grid-template-columns:repeat(4,minmax(0,1fr))}\n#hh-mh .g3{grid-template-columns:repeat(3,minmax(0,1fr))}\n#hh-mh .g2{grid-template-columns:repeat(2,minmax(0,1fr))}\n@media (max-width:900px){#hh-mh .g4{grid-template-columns:repeat(2,minmax(0,1fr))}\n#hh-mh .g3,#hh-mh .g2{grid-template-columns:1fr}}\n#hh-mh .kpi small{display:block;font-weight:800;color:var(--muted);font-size:12.5px}\n#hh-mh .kpi b{display:block;font-size:30px;font-weight:900;color:var(--ink);line-height:1.2}\n#hh-mh .kpi .bar{height:7px;border-radius:9px;background:var(--soft);overflow:hidden;margin-top:8px}\n#hh-mh .kpi .bar i{display:block;height:100%;background:var(--gold);border-radius:9px}\n#hh-mh .kpi .ft{font-size:12px;font-weight:700;color:var(--muted);margin-top:4px}\n#hh-mh .row{display:flex;align-items:center;gap:10px;padding:10px 4px;border-bottom:1px dashed var(--line)}\n#hh-mh .row:last-child{border-bottom:0}\n#hh-mh .seatb{width:34px;height:34px;border-radius:9px;background:var(--maroon);color:#fff;font-weight:900;display:grid;place-items:center;font-size:14px;flex-shrink:0}\n#hh-mh .row .t{flex:1;min-width:0;font-weight:700}\n#hh-mh .row .t small{display:block;font-weight:600;color:var(--muted);font-size:12.5px}\n#hh-mh .empty{padding:20px;text-align:center;color:var(--muted);font-weight:700}\n#hh-mh .lesson{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:16px;align-items:start}\n@media (max-width:980px){#hh-mh .lesson{grid-template-columns:1fr}}\n#hh-mh .lbar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:12px}\n#hh-mh .seg{display:inline-flex;background:var(--soft);border:1.5px solid var(--line);border-radius:12px;padding:3px}\n#hh-mh .seg button{border:0;background:none;padding:6px 14px;border-radius:9px;font-weight:800;font-size:13.5px;color:var(--muted)}\n#hh-mh .seg button.on{background:var(--surface);color:var(--ink);box-shadow:0 1px 4px rgba(0,0,0,.08)}\n#hh-mh .clock{margin-inline-start:auto;display:flex;align-items:center;gap:8px;font-weight:900;color:var(--ink)}\n#hh-mh .clock span{background:var(--surface);border:1.5px solid var(--line);border-radius:10px;padding:4px 12px;font-size:18px}\n#hh-mh .crit{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}\n#hh-mh .crit button{border:1.5px solid var(--line);background:var(--surface);border-radius:12px;padding:7px 12px;font-weight:800;font-size:13.5px;color:var(--ink);display:flex;align-items:center;gap:7px}\n#hh-mh .crit button i{width:10px;height:10px;border-radius:3px;background:var(--cc)}\n#hh-mh .crit button.on{border-color:var(--cc);box-shadow:0 0 0 3px color-mix(in srgb,var(--cc) 22%,transparent)}\n#hh-mh .crit .hint{font-size:12.5px;font-weight:700;color:var(--muted);align-self:center}\n#hh-mh .seats{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:10px}\n@media (max-width:700px){#hh-mh .seats{grid-template-columns:repeat(4,minmax(0,1fr))}}\n#hh-mh .seat{position:relative;border:2px solid var(--line);background:var(--surface);border-radius:14px;padding:8px 6px 6px;text-align:center;min-height:86px;display:flex;flex-direction:column;align-items:center;gap:3px;transition:transform .12s,border-color .2s}\n#hh-mh .seat:hover{border-color:var(--gold);transform:translateY(-2px)}\n#hh-mh .seat .n{font-size:22px;font-weight:900;color:var(--ink);line-height:1.1}\n#hh-mh .seat .nm{font-size:11px;font-weight:700;color:var(--muted);max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-height:16px}\n#hh-mh .seat .dots{display:flex;gap:3px;flex-wrap:wrap;justify-content:center;min-height:10px}\n#hh-mh .seat .dots i{width:8px;height:8px;border-radius:2px;background:var(--cc)}\n#hh-mh .seat .dots i.neg{background:transparent;box-shadow:inset 0 0 0 2px var(--cc)}\n#hh-mh .seat .sc{position:absolute;top:4px;left:5px;font-size:11px;font-weight:900;border-radius:99px;padding:0 6px}\n#hh-mh .seat.abs{background:var(--soft);border-style:dashed}\n#hh-mh .seat.abs .n{color:var(--muted)}\n#hh-mh .seat.late{border-color:var(--amber)}\n#hh-mh .seat.pop{animation:mh-pop .45s ease-out}\n@keyframes mh-pop{30%{transform:scale(1.08)}100%{transform:none}}\n#hh-mh .seat .flt{position:absolute;top:-8px;inset-inline:0;margin:auto;width:max-content;font-size:12px;font-weight:900;border-radius:99px;padding:0 8px;animation:mh-flt 1s ease-out forwards;pointer-events:none}\n@keyframes mh-flt{to{transform:translateY(-22px);opacity:0}}\n#hh-mh .seat.pick{border-color:var(--gold);box-shadow:0 0 0 4px color-mix(in srgb,var(--gold) 35%,transparent)}\n@media (prefers-reduced-motion:reduce){#hh-mh .seat,#hh-mh .seat.pop,#hh-mh .seat .flt{animation:none;transition:none}}\n#hh-mh .side .pn{padding:14px}\n#hh-mh .feed{max-height:430px;overflow:auto}\n#hh-mh .feed .row{font-size:13.5px}\n#hh-mh .feed .row .t b{font-weight:900}\n#hh-mh .undo{border:0;background:none;color:var(--maroon);font-weight:800;font-size:12.5px}\n#hh-mh .board{background:var(--band);color:#fff;border-radius:16px;padding:14px;margin-top:12px}\n#hh-mh .board h4{margin:0 0 8px;font-size:14px;color:var(--goldL)}\n#hh-mh .board .tops{display:flex;gap:8px;flex-wrap:wrap}\n#hh-mh .board .tops span{background:rgba(255,255,255,.12);border:1px solid rgba(230,206,142,.4);border-radius:10px;padding:4px 10px;font-weight:900}\n#hh-mh .sheet-bg{position:fixed;inset:0;background:rgba(20,5,10,.45);z-index:50;display:flex;align-items:flex-end;justify-content:center}\n@media (min-width:701px){#hh-mh .sheet-bg{align-items:center}}\n#hh-mh .sheet{background:var(--surface);width:min(560px,100%);border-radius:20px 20px 0 0;padding:18px;box-shadow:0 -10px 40px rgba(0,0,0,.25);max-height:90vh;overflow:auto}\n@media (min-width:701px){#hh-mh .sheet{border-radius:20px}}\n#hh-mh .sheet h3{margin:0;font-size:20px;font-weight:900;color:var(--ink);display:flex;align-items:center;gap:10px}\n#hh-mh .sheet .x{margin-inline-start:auto;border:0;background:var(--soft);border-radius:10px;width:36px;height:36px;color:var(--ink)}\n#hh-mh .acts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:14px}\n#hh-mh .acts button{border:1.5px solid var(--line);background:var(--surface);border-radius:12px;padding:10px;font-weight:800;color:var(--ink);display:flex;align-items:center;gap:8px;text-align:start}\n#hh-mh .acts button.pos{border-color:color-mix(in srgb,var(--green) 40%,var(--line))}\n#hh-mh .acts button.pos b{color:var(--green)}\n#hh-mh .acts button.neg{border-color:color-mix(in srgb,var(--red) 35%,var(--line))}\n#hh-mh .acts button.neg b{color:var(--red)}\n#hh-mh .acts button i{width:10px;height:10px;border-radius:3px;background:var(--cc)}\n#hh-mh .att{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}\n#hh-mh .att button{flex:1;min-width:90px}\n#hh-mh .note2{width:100%;margin-top:12px;border:1.5px solid var(--line);border-radius:12px;padding:10px 12px;font-family:inherit;font-size:14px;background:var(--soft);color:var(--text)}\n#hh-mh .tw{overflow-x:auto;border:1.5px solid var(--line);border-radius:14px;background:var(--surface)}\n#hh-mh table{border-collapse:collapse;width:100%;min-width:720px;font-size:14px}\n#hh-mh th,#hh-mh td{padding:9px 10px;border-bottom:1px solid var(--line);text-align:center;white-space:nowrap}\n#hh-mh th{background:var(--soft);font-weight:900;color:var(--ink);font-size:13px;position:sticky;top:0}\n#hh-mh td:first-child,#hh-mh th:first-child{text-align:start}\n#hh-mh td input{width:54px;height:32px;border:1.5px solid var(--line);border-radius:8px;text-align:center;font-family:inherit;font-weight:800;font-size:14px;background:var(--soft);color:var(--text)}\n#hh-mh td .auto{display:inline-flex;align-items:center;gap:4px;font-weight:800}\n#hh-mh td .auto small{font-size:10.5px;color:var(--green);background:var(--greenBg);border-radius:6px;padding:0 5px}\n#hh-mh .tot{font-weight:900;color:var(--ink)}\n#hh-mh .mk{display:inline-grid;place-items:center;width:26px;height:26px;border-radius:7px;font-weight:900;font-size:13px}\n#hh-mh .mk.e{background:var(--greenBg);color:var(--green)}\n#hh-mh .mk.g{background:var(--goldBg);color:var(--amber)}\n#hh-mh .mk.w{background:var(--redBg);color:var(--red)}\n#hh-mh .mk.n{background:var(--soft);color:var(--muted)}\n#hh-mh .prof{display:grid;grid-template-columns:300px minmax(0,1fr);gap:16px;align-items:start}\n@media (max-width:900px){#hh-mh .prof{grid-template-columns:1fr}}\n#hh-mh .list{max-height:560px;overflow:auto}\n#hh-mh .list button{all:unset;box-sizing:border-box;width:100%;cursor:pointer;display:flex;align-items:center;gap:10px;padding:8px 6px;border-radius:10px}\n#hh-mh .list button:hover{background:var(--soft)}\n#hh-mh .list button.on{background:var(--goldBg)}\n#hh-mh .net{flex:1;height:8px;border-radius:9px;background:var(--soft);position:relative;overflow:hidden}\n#hh-mh .net i{position:absolute;top:0;bottom:0;border-radius:9px}\n#hh-mh .tl{position:relative;padding-inline-start:18px}\n#hh-mh .tl::before{content:\"\";position:absolute;inset-inline-start:5px;top:6px;bottom:6px;width:2px;background:var(--line)}\n#hh-mh .tl .ev{position:relative;padding:6px 0 10px}\n#hh-mh .tl .ev::before{content:\"\";position:absolute;inset-inline-start:-17px;top:12px;width:10px;height:10px;border-radius:50%;background:var(--cc);box-shadow:0 0 0 3px var(--surface)}\n#hh-mh .tl .ev small{color:var(--muted);font-weight:700;font-size:12px}\n#hh-mh .plan{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}\n@media (max-width:700px){#hh-mh .plan{grid-template-columns:1fr}}\n#hh-mh .plan div{background:var(--soft);border-radius:12px;padding:10px 12px}\n#hh-mh .plan b{display:block;font-size:13px;color:var(--amber);font-weight:900}\n#hh-mh .plan p{margin:2px 0 0;font-size:13.5px;font-weight:600}\n#hh-mh .lock{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:800;color:var(--muted)}\n#hh-mh .cert{background:#FFFDF8;color:#3D0918;border:3px solid #B8924A;border-radius:6px;padding:28px;text-align:center;position:relative;box-shadow:inset 0 0 0 8px #FFFDF8,inset 0 0 0 9px rgba(184,146,74,.5)}\n#hh-mh .cert .t1{font-weight:800;color:#8A6D2E;font-size:13px}\n#hh-mh .cert h3{margin:6px 0;font-size:30px;font-weight:900}\n#hh-mh .cert .nm{font-family:var(--f-q);font-size:30px;color:#5E0E26;border-bottom:1.5px dashed #B8924A;display:inline-block;min-width:240px;padding:0 10px;margin:8px 0}\n#hh-mh .cert p{margin:6px 0 0;font-weight:700;color:#5E4A36}\n#hh-mh .cert .sg{display:flex;justify-content:space-between;margin-top:22px;font-size:12.5px;font-weight:800;color:#8A6D2E}\n#hh-mh .badges{display:flex;gap:10px;flex-wrap:wrap}\n#hh-mh .badge{display:flex;align-items:center;gap:10px;background:var(--surface);border:1.5px solid var(--line);border-radius:14px;padding:10px 12px;flex:1;min-width:200px}\n#hh-mh .badge .md2{width:42px;height:42px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#F5E6C4,#B8924A);display:grid;place-items:center;color:#5E0E26;box-shadow:inset 0 0 0 2px #fff,0 0 0 1.5px #B8924A}\n#hh-mh .badge b{display:block;font-weight:900;color:var(--ink)}\n#hh-mh .badge small{font-weight:700;color:var(--muted);font-size:12.5px}\n#hh-mh .toast{position:fixed;bottom:18px;inset-inline:0;margin:auto;width:max-content;max-width:90vw;background:#3D0918;color:#F5E6C4;border-radius:12px;padding:10px 16px;font-weight:800;font-size:14px;z-index:60;box-shadow:0 10px 30px rgba(0,0,0,.25)}\n#hh-mh .flow{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}\n@media (max-width:800px){#hh-mh .flow{grid-template-columns:repeat(2,minmax(0,1fr))}}\n#hh-mh .flow div{background:var(--surface);border:1.5px solid var(--line);border-radius:14px;padding:12px}\n#hh-mh .flow b{display:flex;align-items:center;gap:8px;color:var(--ink);font-weight:900}\n#hh-mh .flow b i{font-style:normal;width:24px;height:24px;border-radius:50%;background:var(--maroon);color:#fff;display:grid;place-items:center;font-size:12px}\n#hh-mh .flow p{margin:4px 0 0;font-size:13px;font-weight:600;color:var(--muted)}\n#hh-mh .mini{display:flex;align-items:flex-end;gap:6px;height:90px;padding-top:6px}\n#hh-mh .mini div{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;height:100%;justify-content:flex-end}\n#hh-mh .mini div i{display:block;width:100%;border-radius:6px 6px 0 0;background:var(--gold)}\n#hh-mh .mini div small{font-size:11px;font-weight:800;color:var(--muted)}\n#hh-mh .cg{margin-top:12px}\n#hh-mh .cg h5{margin:0 0 6px;font-size:13px;font-weight:900;color:var(--muted);display:flex;align-items:center;gap:7px}\n#hh-mh .cg h5 i{width:9px;height:9px;border-radius:3px;display:inline-block}\n#hh-mh .cgi{display:flex;flex-wrap:wrap;gap:6px}\n#hh-mh .cgi button{border:1.5px solid var(--line);background:var(--surface);border-radius:10px;padding:6px 10px;font-weight:700;font-size:13px;color:var(--text);display:inline-flex;align-items:center;gap:5px}\n#hh-mh .cgi button.pos b{color:var(--green)}\n#hh-mh .cgi button.neg b{color:var(--red)}\n#hh-mh .cgi button.pos:hover{border-color:var(--green);background:var(--greenBg)}\n#hh-mh .cgi button.neg:hover{border-color:var(--red);background:var(--redBg)}\n#hh-mh .wsteps{list-style:none;margin:0 0 14px;padding:0;display:flex;gap:6px;overflow-x:auto;scrollbar-width:none}\n#hh-mh .wsteps li button{all:unset;cursor:pointer;display:flex;align-items:center;gap:7px;padding:7px 12px;border-radius:99px;background:var(--surface);border:1.5px solid var(--line);font-weight:800;font-size:13px;color:var(--muted);white-space:nowrap}\n#hh-mh .wsteps li button i{font-style:normal;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;background:var(--soft);font-size:12px}\n#hh-mh .wsteps li.d button{color:var(--green)}\n#hh-mh .wsteps li.d button i{background:var(--green);color:#fff}\n#hh-mh .wsteps li.on button{border-color:var(--maroon);color:var(--ink)}\n#hh-mh .wsteps li.on button i{background:var(--maroon);color:#fff}\n#hh-mh .wgrid{display:grid;grid-template-columns:minmax(0,1fr) 380px;gap:16px;align-items:start}\n#hh-mh .wgrid.one{grid-template-columns:1fr}\n@media (max-width:980px){#hh-mh .wgrid{grid-template-columns:1fr}}\n#hh-mh .wq{margin:0 0 12px;font-size:19px;font-weight:900;color:var(--ink);text-wrap:balance}\n#hh-mh .wopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}\n@media (max-width:600px){#hh-mh .wopts{grid-template-columns:1fr}}\n#hh-mh .wopts button{border:2px solid var(--line);background:var(--surface);border-radius:14px;padding:12px 14px;text-align:start;color:var(--text);display:flex;flex-direction:column;gap:3px;min-height:58px;justify-content:center}\n#hh-mh .wopts button b{font-size:15px;font-weight:800}\n#hh-mh .wopts button small{font-size:12px;font-weight:700;color:var(--muted)}\n#hh-mh .wopts button small.sg{color:var(--amber)}\n#hh-mh .wopts button.on{border-color:var(--maroon);background:color-mix(in srgb,var(--maroon) 7%,var(--surface));box-shadow:0 0 0 3px color-mix(in srgb,var(--maroon) 15%,transparent)}\n#hh-mh .wopts button:hover{border-color:var(--gold)}\n#hh-mh .wrec{display:grid;gap:8px;margin-top:12px;background:var(--soft);border-radius:12px;padding:10px 12px}\n#hh-mh .wrec div{display:flex;flex-wrap:wrap;gap:6px;align-items:center}\n#hh-mh .wrec b{font-size:12.5px;color:var(--muted);margin-inline-end:4px}\n#hh-mh .wnav{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px;padding-top:14px;border-top:1px dashed var(--line)}\n#hh-mh .wfield{display:flex;flex-direction:column;gap:5px}\n#hh-mh .wfield label{font-weight:900;color:var(--ink);font-size:14px}\n#hh-mh .wfield select{height:42px;border-radius:10px;border:1.5px solid var(--line);background:var(--soft);color:var(--text);font-family:inherit;font-weight:800;font-size:14px;padding:0 10px}\n#hh-mh .paper{background:#FFFDF8;color:#2A1A0E;border:1px solid #E7DAC0;border-right:4px solid #5E0E26;border-radius:10px;padding:16px 18px;font-family:var(--f-q);font-size:18px;line-height:1.9}\n#hh-mh .paper p{margin:0 0 6px}\n#hh-mh .paper ul{margin:4px 0 8px;padding-inline-start:20px;font-family:var(--f-ui);font-size:14.5px}\n#hh-mh .paper b{font-family:var(--f-ui)}\n#hh-mh .paper.sm{font-size:15.5px;max-height:440px;overflow:auto}\n#hh-mh .tpls{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}\n@media (max-width:1000px){#hh-mh .tpls{grid-template-columns:repeat(3,minmax(0,1fr))}}\n@media (max-width:600px){#hh-mh .tpls{grid-template-columns:repeat(2,minmax(0,1fr))}}\n#hh-mh .tp{border:2px solid var(--line);background:var(--surface);border-radius:14px;padding:8px;text-align:start;display:flex;flex-direction:column;gap:3px;color:var(--text)}\n#hh-mh .tp.on{border-color:var(--maroon);box-shadow:0 0 0 3px color-mix(in srgb,var(--maroon) 15%,transparent)}\n#hh-mh .tp b{font-size:14px;font-weight:900;color:var(--ink)}\n#hh-mh .tp small{font-size:11.5px;font-weight:700;color:var(--muted)}\n#hh-mh .thumb{display:block;height:120px;overflow:hidden;position:relative;border-radius:8px;background:#EFE8DA;pointer-events:none}\n#hh-mh .thumb .ct{position:absolute;top:0;right:0;width:600px;transform:scale(.28);transform-origin:top right}\n#hh-mh .cprev .ct{width:100%}\n#hh-mh .ct{position:relative;background:#FFFDF8;color:#3D0918;font-family:var(--f-ui);text-align:center;aspect-ratio:1.414;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:6% 8%;overflow:hidden}\n#hh-mh .ct small{font-weight:800;color:#8A6D2E;font-size:13px}\n#hh-mh .ct h4{margin:6px 0 2px;font-size:clamp(20px,3vw,32px);font-weight:900;color:#5E0E26}\n#hh-mh .ct p{margin:4px 0;font-weight:700;color:#5E4A36;font-size:14px}\n#hh-mh .ct .cn{font-family:var(--f-q);font-size:clamp(22px,3.2vw,34px);color:#5E0E26;border-bottom:1.5px dashed #B8924A;min-width:60%;padding:0 10px;margin:6px 0;line-height:1.6}\n#hh-mh .ct .cn .ph{font-family:var(--f-ui);font-size:13px;color:#B8AE9A;font-weight:700}\n#hh-mh .ct .rs{max-width:85%;line-height:1.8}\n#hh-mh .ct .sb{font-size:12.5px;color:#8A6D2E}\n#hh-mh .ct .sg{display:flex;justify-content:space-between;width:100%;margin-top:auto;padding-top:10px;font-size:12px;font-weight:800;color:#8A6D2E}\n#hh-mh .ct-classic{border:3px solid #B8924A;box-shadow:inset 0 0 0 8px #FFFDF8,inset 0 0 0 9.5px rgba(184,146,74,.6)}\n#hh-mh .ct-classic::before,#hh-mh .ct-classic::after{content:\"\";position:absolute;width:44px;height:44px;border:3px solid #B8924A}\n#hh-mh .ct-classic::before{top:14px;right:14px;border-left:0;border-bottom:0}\n#hh-mh .ct-classic::after{bottom:14px;left:14px;border-right:0;border-top:0}\n#hh-mh .ct-modern{flex-direction:row;padding:0;align-items:stretch;border:1px solid #E7DAC0}\n#hh-mh .ct-modern .side{width:30%;background:linear-gradient(170deg,#8A1538,#4A0B1E);color:#fff;display:flex;flex-direction:column;justify-content:space-between;padding:8% 6%;text-align:start;border-left:4px solid #B8924A}\n#hh-mh .ct-modern .side b{font-size:clamp(18px,2.4vw,28px);font-weight:900;line-height:1.3}\n#hh-mh .ct-modern .side span{font-size:12px;font-weight:700;color:#E6CE8E}\n#hh-mh .ct-modern .mainc{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:6%}\n#hh-mh .ct-medal{background:radial-gradient(circle at 50% 35%,#6E1030,#3D0918);color:#F5E6C4;border:3px solid #B8924A}\n#hh-mh .ct-medal small,#hh-mh .ct-medal .sg{color:#E6CE8E}\n#hh-mh .ct-medal h4{color:#fff}\n#hh-mh .ct-medal p{color:#F5E6C4}\n#hh-mh .ct-medal .cn{color:#fff;border-color:#E6CE8E}\n#hh-mh .ct-medal .cn .ph{color:#C9B796}\n#hh-mh .med{width:72px;height:72px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#F5E6C4,#B8924A);color:#5E0E26;display:grid;place-items:center;box-shadow:inset 0 0 0 3px #fff,0 0 0 2px #B8924A,0 8px 18px rgba(0,0,0,.25);margin:8px 0}\n#hh-mh .med.sm{width:56px;height:56px;flex-shrink:0}\n#hh-mh .med.sm svg{width:28px;height:28px}\n#hh-mh .ct-star{aspect-ratio:1.6;padding:0;justify-content:flex-start;border:2px solid #B8924A;border-radius:14px}\n#hh-mh .ct-star .tb2{width:100%;background:linear-gradient(135deg,#C9A24E,#8A6D2E);color:#fff;font-weight:900;font-size:clamp(16px,2.2vw,24px);padding:8px}\n#hh-mh .ct-star .bd2{flex:1;display:flex;align-items:center;gap:14px;padding:4% 6%;text-align:start}\n#hh-mh .ct-star .bd2 > div:last-child{display:flex;flex-direction:column;align-items:flex-start}\n#hh-mh .ct-star .cn{min-width:0;margin:0}\n#hh-mh .ct-star .rs{max-width:none}\n#hh-mh .ct-thanks{border:2px solid #2F6A4E;box-shadow:inset 0 0 0 7px #FFFDF8,inset 0 0 0 8px rgba(47,106,78,.45)}\n#hh-mh .ct-thanks .rib{background:#2F6A4E;color:#fff;font-weight:900;font-size:clamp(16px,2.4vw,26px);padding:6px 28px;border-radius:0 0 14px 14px;position:absolute;top:0}\n#hh-mh .ct-thanks small{margin-top:28px}\n#hh-mh .ct .lg{display:block;height:clamp(76px,10vw,112px);width:auto;margin:0 auto 6px;mix-blend-mode:multiply}\n#hh-mh .ct-thanks .lg{margin-top:34px}\n#hh-mh .ct-thanks small{margin-top:0}\n#hh-mh .ct-modern .mainc .lg{margin-bottom:4px}\n#hh-mh .med.big{width:118px;height:118px}\n#hh-mh .ct .med .lg.in{height:76px;margin:0;filter:none}\n#hh-mh .ct .med.sm .lg.in{height:58px}\n#hh-mh .ct-star .bd2{flex-direction:column;justify-content:center;text-align:center;gap:4px;padding:3% 6%}\n#hh-mh .ct-star .bd2 > div:last-child{align-items:center}\n#hh-mh .ct-star .med.sm{width:86px;height:86px;margin:0 0 4px}\n#hh-mh .paper .phd{display:flex;flex-direction:column;align-items:center;text-align:center;gap:4px;padding-bottom:12px;margin-bottom:12px;border-bottom:1.5px solid #E7DAC0;font-family:var(--f-ui)}\n#hh-mh .paper .phd .lg{height:76px;width:auto}\n#hh-mh .paper .phd b{display:block;color:#5E0E26;font-size:16px}\n#hh-mh .paper .phd small{color:#8A6D2E;font-weight:800;font-size:12.5px}";
function mhStyle(){ if(document.getElementById('hh-mh-style')) return; var s=document.createElement('style'); s.id='hh-mh-style'; s.textContent=MHCSS; document.head.appendChild(s); }

'use strict';
/* ── بيانات العينة: وهمية، الطلاب بأرقام الجلوس فقط ── */
var CLASSES=[];
var CRIT=[
  {k:'part',t:'المشاركة',c:'#2F6A4E',pos:'شارك بإجابة',neg:'لم يشارك'},
  {k:'beh',t:'السلوك',c:'#8A1538',pos:'سلوك متميز',neg:'سلوك يحتاج متابعة'},
  {k:'book',t:'الكتاب',c:'#B8924A',pos:'أحضر الكتاب',neg:'لم يحضر الكتاب'},
  {k:'inter',t:'التفاعل',c:'#1F4E79',pos:'تفاعل مع زملائه',neg:'غير متفاعل'}
];
var WEEKS=['الأسبوع 1','الأسبوع 2','الأسبوع 3','الأسبوع 4'];
/* دليل السلوكيات: شامل للإيجابي والسلبي، ويعدّله المعلم ليطابق لائحة مدرسته */
var CAT={
 pos:[
  {g:'المشاركة والتعلم',c:'part',items:['يجيب عن الأسئلة','يطرح سؤالاً عميقاً','يشرح فكرة لزملائه','يكمل المهمة بإتقان','يقدّم عملاً مبدعاً','يستخدم مصدراً إضافياً']},
  {g:'الانضباط والمسؤولية',c:'book',items:['يحضر في الموعد','يحضر الكتاب والأدوات','يلتزم بالتعليمات','يسلّم الواجب في وقته','يحافظ على نظافة المكان','يرتّب دفتره وأعماله']},
  {g:'التعامل مع الآخرين',c:'inter',items:['يتعاون مع زملائه','يساعد زميلاً محتاجاً','يحترم الرأي الآخر','يستمع باهتمام','يقود مجموعته بحكمة','يشجّع زملاءه']},
  {g:'القيم والأخلاق',c:'beh',items:['الصدق في القول','الأمانة','المبادرة بالخير','الاعتذار عند الخطأ','ضبط النفس','احترام المعلم']}
 ],
 neg:[
  {g:'الانضباط',c:'book',items:[['التأخر عن الحصة',1],['عدم إحضار الكتاب',1],['الحديث أثناء الشرح',1],['استخدام الجوال',2],['الخروج دون إذن',2],['الغياب دون عذر',2]]},
  {g:'التعلم',c:'part',items:[['عدم تسليم الواجب',1],['عدم المشاركة',1],['الانشغال عن الدرس',1],['النوم في الحصة',2],['الغش أو محاولته',3]]},
  {g:'التعامل مع الآخرين',c:'inter',items:[['مقاطعة الزملاء',1],['السخرية من زميل',2],['ألفاظ غير لائقة',2],['الإساءة للمعلم',3],['الشجار',3],['التنمّر',3]]},
  {g:'الممتلكات والسلامة',c:'beh',items:[['العبث بالأدوات',2],['الكتابة على المقاعد',2],['إتلاف الممتلكات',3],['سلوك يعرّض الآخرين للخطر',3]]}
 ]
};
var LVL={1:['بسيطة','c-a'],2:['متوسطة','c-r'],3:['عالية','c-r']};

/* ── طبقة البيانات: شعب المعلم الحقيقية بأرقام الجلوس، والتسجيلات في student_records ── */
var MH={demo:false,why:'',whyBtn:'',school:'',subject:'',loading:false};
function fdb(){ return firebase.firestore(); }
function uid(){ try{ return (firebase.auth().currentUser||{}).uid||((typeof currentUser!=='undefined'&&currentUser)?currentUser.uid:''); }catch(e){ return ''; } }
function todayISO(){ var d=new Date(); return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2); }
var MONTHS=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
var DAYS=['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
function monthName(){ return MONTHS[new Date().getMonth()]; }
function todayAr(){ var d=new Date(); return DAYS[d.getDay()]+' '+d.getDate()+' '+MONTHS[d.getMonth()]; }
function daysAgo(iso){ try{ var a=new Date(iso+'T00:00:00'), b=new Date(todayISO()+'T00:00:00'); return Math.max(0,Math.round((b-a)/864e5)); }catch(e){ return 99; } }
function rootScroll(){ var r=document.getElementById('hh-mh'); if(r) r.scrollTo({top:0,behavior:'smooth'}); }
function localNames(code){ try{ var m=JSON.parse(localStorage.getItem('hh_cls_local_'+code)||'{}'); var o={}; Object.keys(m).forEach(function(k){ if(m[k]) o[k]=m[k]; }); return o; }catch(e){ return {}; } }
function profile(){ try{ var p=(window.currentUserData||window._hhUserDoc||{}); MH.school=p.school||p.schoolName||localStorage.getItem('hh_mh_school')||'مدرستي'; MH.subject=p.subject||localStorage.getItem('hh_mh_subject')||'المادة'; }catch(e){ MH.school='مدرستي'; MH.subject='المادة'; } }
/* التقييم الأسبوعي من التسجيلات: متميز، جيد، يحتاج متابعة، أو لا تسجيلات */
function weeksOf(s){
  if(MH.demo&&s.weeks) return s.weeks;
  var d=new Date(), m=d.getMonth(), y=d.getFullYear(), W=[{},{},{},{}];
  CRIT.forEach(function(c){ for(var i=0;i<4;i++) W[i][c.k]={p:0,n:0}; });
  s.ev.forEach(function(e){ if(!e.date) return; var t=new Date(e.date+'T00:00:00'); if(t.getMonth()!==m||t.getFullYear()!==y) return; var wi=Math.min(3,Math.floor((t.getDate()-1)/7)); var b=W[wi][e.c]; if(b){ if(e.p) b.p++; else b.n++; } });
  return W.map(function(o){ var r={}; CRIT.forEach(function(c){ var b=o[c.k]; r[c.k]=(!b.p&&!b.n)?'n':(b.n>=2||b.n>b.p)?'w':(b.p>=2&&!b.n)?'e':'g'; }); return r; });
}
function makeDemo(){
  MH.demo=true; CLASSES=[{k:'7-2',n:'السابع 2',c:32},{k:'7-3',n:'السابع 3',c:31},{k:'8-1',n:'الثامن 1',c:34}]; S.cls='7-2';
  MH.school='مدرسة تجريبية'; MH.subject='الدراسات الاجتماعية';
var seed=7; function rnd(){ seed=(seed*9301+49297)%233280; return seed/233280; }
CLASSES.forEach(function(C){
  var st=[]; for(var i=1;i<=C.c;i++){
    var bias=rnd();
    var s={n:i,att:'p',ev:[],q1:Math.round(5+rnd()*5),task:Math.round(5+rnd()*5),proj:Math.round(11+rnd()*9),games:Math.round(55+rnd()*45),gates:Math.floor(rnd()*7),weeks:[]};
    for(var w=0;w<4;w++){ var o={}; CRIT.forEach(function(cr){ var r=rnd()+bias*.35; o[cr.k]=r>.85?'e':r>.22?'g':'w'; }); s.weeks.push(o); }
    var ne=Math.floor(rnd()*6); for(var e=0;e<ne;e++){ var cr=CRIT[Math.floor(rnd()*4)]; var pos=rnd()<(.45+bias*.5); s.ev.push({c:cr.k,p:pos,d:Math.floor(rnd()*20)+1,txt:pos?cr.pos:cr.neg,lvl:pos?0:1}); }
    st.push(s); }
  st[13].ev=st[13].ev.concat([{c:'book',p:false,d:2,txt:'الحديث أثناء الشرح',lvl:1},{c:'book',p:false,d:4,txt:'التأخر عن الحصة',lvl:1},{c:'inter',p:false,d:6,txt:'السخرية من زميل',lvl:2}]);
  st[6].ev=st[6].ev.concat([{c:'part',p:true,d:1,txt:'شارك بإجابة'},{c:'part',p:true,d:3,txt:'شارك بإجابة'},{c:'inter',p:true,d:5,txt:'ساعد زميله في النشاط'}]);
  DB[C.k]={students:st,log:[],names:{}};
});
DB['7-2'].names={1:'',7:'',12:''};

}
async function loadClasses(){
  profile();
  if(!uid()){ makeDemo(); MH.why='سجّل الدخول لتظهر شعبك الحقيقية هنا.'; MH.whyBtn='<button class="btn s" onclick="showScreen(\'screen-login\')" style="margin-inline-start:auto">تسجيل الدخول</button>'; paintSel(); render(); return; }
  try{
    var qs=(typeof hhClsFetchMine==='function')?await hhClsFetchMine():await fdb().collection('classrooms').where('teacherId','==',uid()).get();
    var r=[]; qs.forEach(function(d){ var c=d.data()||{}; if(c.active===false||c.archived) return; r.push({k:d.id,n:c.className||d.id,c:c.studentCount||0}); });
    r.sort(function(a,b){ return String(a.n).localeCompare(String(b.n),'ar'); });
    if(!r.length){ makeDemo(); MH.why='لا شعب لديك بعد. أنشئ شعبة بعدد طلابها، ثم ارجع إلى المحبرة.'; MH.whyBtn='<button class="btn s p" onclick="hhMhAddClass()" style="margin-inline-start:auto">أنشئ شعبة</button>'; paintSel(); render(); return; }
    MH.demo=false; CLASSES=r;
    var pref=''; try{ pref=localStorage.getItem('hh_mh_cls')||''; }catch(e){}
    S.cls=r.some(function(x){ return x.k===pref; })?pref:r[0].k;
    paintSel(); await loadClass(S.cls);
  }catch(e){ console.warn('mihbara classes',e); makeDemo(); MH.why='تعذّر تحميل شعبك الآن، فهذه عينة مؤقتة.'; paintSel(); render(); }
}
async function loadClass(code){
  if(MH.demo){ render(); return; }
  DB[code]={students:[],log:[],names:localNames(code),loading:true}; render();
  try{
    var qs=await fdb().collection('classroom_students').where('classCode','==',code).where('active','==',true).get();
    var st=[]; qs.forEach(function(d){ var x=d.data()||{}; var n=parseInt(x.num,10); if(!(n>0)){ var m=String(x.studentName||'').match(/(\d+)/); n=m?+m[1]:0; } st.push({id:d.id,n:n,att:'p',ev:[],q1:null,task:null,proj:null,games:null,gates:null}); });
    st.sort(function(a,b){ return (a.n||999)-(b.n||999); }); st.forEach(function(s,i){ if(!s.n) s.n=i+1; });
    var recs=await Promise.all(st.map(function(s){ return fdb().collection('student_records').doc(s.id).get().catch(function(){ return null; }); }));
    recs.forEach(function(r,i){ if(!r||!r.exists) return; var x=r.data()||{}, s=st[i];
      (x.mh||[]).forEach(function(e){ s.ev.push({c:e.c,p:!!e.p,lvl:e.lvl||0,txt:e.txt||'',date:e.date,at:e.at,d:daysAgo(e.date),_o:e}); });
      var g=x.mhGrades||{}; ['q1','task','proj'].forEach(function(k){ if(g[k]!=null) s[k]=g[k]; }); });
    DB[code]={students:st,log:[],names:localNames(code),loading:false};
  }catch(e){ console.warn('mihbara class',e); DB[code]={students:[],log:[],names:{},loading:false,err:true}; }
  render();
}
function persistEv(s,o,remove){ if(MH.demo||!s.id||!uid()) return; var F=firebase.firestore.FieldValue;
  fdb().collection('student_records').doc(s.id).set({mh:remove?F.arrayRemove(o):F.arrayUnion(o),classCode:S.cls,teacherId:uid()},{merge:true}).catch(function(e){ console.warn('mh save',e); toast('تعذّر الحفظ في الحساب، تحقّق من الاتصال','error'); }); }
function persistGrades(s){ if(MH.demo||!s.id||!uid()) return; fdb().collection('student_records').doc(s.id).set({mhGrades:{q1:s.q1,task:s.task,proj:s.proj,at:Date.now()},classCode:S.cls,teacherId:uid()},{merge:true}).catch(function(){ toast('تعذّر حفظ الدرجة','error'); }); }
async function saveAttendance(){ if(MH.demo){ toast('في العينة لا يُحفظ الحضور'); return; } var F=firebase.firestore.FieldValue, d=todayISO(), map={p:'present',a:'absent',l:'late'}, ok=0;
  await Promise.all(D().students.map(function(s){ return fdb().collection('student_records').doc(s.id).set({attendance:F.arrayUnion({date:d,period:'mh',status:map[s.att]||'present',at:Date.now()}),classCode:S.cls,teacherId:uid()},{merge:true}).then(function(){ ok++; }).catch(function(){}); }));
  toast(ok?'حُفظ حضور '+ok+' طالباً':'تعذّر حفظ الحضور',ok?'success':'error'); }
function paintSel(){ var sel=document.getElementById('mh-cls'); if(!sel) return; sel.innerHTML=CLASSES.map(function(c){ return '<option value="'+esc(c.k)+'">'+esc(c.n)+(c.c?'، '+c.c+' طالباً':'')+'</option>'; }).join(''); sel.value=S.cls;
  sel.onchange=function(){ S.cls=sel.value; S.sel=1; S.w=null; try{ localStorage.setItem('hh_mh_cls',S.cls); }catch(e){} if(!DB[S.cls]) loadClass(S.cls); else render(); }; }
window.hhMhAddClass=function(){ try{ if(typeof hhOpenClasses==='function'){ hhMhClose(); hhOpenClasses(); return; } }catch(e){} toast('افتح «صفوفي» لإنشاء شعبة'); };
/* ── التصدير والطباعة ── */
function dl(name,html){ var doc='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><style>body{font-family:"Sakkal Majalla","Traditional Arabic",Arial;direction:rtl}table{border-collapse:collapse;width:100%}td,th{border:1px solid #B8924A;padding:4px;text-align:center;font-size:12pt}th{background:#F5F1E8;color:#5E0E26}h1,h2{color:#5E0E26;margin:4px 0}p{font-size:14pt;line-height:1.7}</style></head><body dir="rtl">'+html+'</body></html>';
  try{ var b=new Blob(['﻿',doc],{type:'application/msword'}); var a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download=name+'.doc'; document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); },800); toast('نُزّل الملف','success'); }catch(e){ toast('تعذّر التنزيل','error'); } }
function exportMonthly(){ var st=D().students, L={e:'متميز',g:'جيد',w:'يحتاج متابعة',n:''};
  var h='<h1>'+esc(MH.school)+'</h1><h2>المتابعة الشهرية، '+esc(cls().n)+'، '+esc(MH.subject)+'، شهر '+monthName()+' '+new Date().getFullYear()+'</h2><table><tr><th rowspan="2">رقم الطالب</th>'+WEEKS.map(function(w){ return '<th colspan="4">'+w+'</th>'; }).join('')+'<th rowspan="2">المستوى</th><th rowspan="2">الإجراء</th></tr><tr>'+WEEKS.map(function(){ return CRIT.map(function(c){ return '<th>'+c.t+'</th>'; }).join(''); }).join('')+'</tr>'
   +st.map(function(s){ var w=0,nn=0; var W=weeksOf(s); W.forEach(function(o){ CRIT.forEach(function(c){ if(o[c.k]==='w') w++; if(o[c.k]==='n') nn++; }); }); var lv=nn===16?'':w>=6?'يحتاج متابعة':w>=3?'جيد':'متميز';
     return '<tr><td>'+s.n+'</td>'+W.map(function(o){ return CRIT.map(function(c){ return '<td>'+({e:'م',g:'ج',w:'ت',n:''}[o[c.k]])+'</td>'; }).join(''); }).join('')+'<td>'+lv+'</td><td>'+(nn===16?'':w>=6?'تواصل مع ولي الأمر':w>=3?'تشجيع ومتابعة':'تعزيز')+'</td></tr>'; }).join('')
   +'</table><p style="font-size:11pt">م: متميز، ج: جيد، ت: يحتاج متابعة</p>';
  dl('المتابعة الشهرية '+cls().n+' '+monthName(),h); }
function exportReport(all){ var ns=all?D().students.map(function(s){ return s.n; }):[S.w.n], keep=S.w?JSON.parse(JSON.stringify({n:S.w.n,out:S.w.out,a:S.w.a,str:S.w.str,need:S.w.need,sug:S.w.sug,step:S.w.step,cls:S.w.cls})):null, parts=[];
  ns.forEach(function(n,i){ if(all){ var o=S.w.out; wzNew(n); S.w.out=o; } parts.push('<h2>'+esc(MH.school)+'</h2><p><b>'+(S.w.out==='admin'?'تقرير متابعة':'تقرير ولي الأمر')+'، الطالب رقم '+n+'، '+esc(cls().n)+'</b></p>'+wzText()); });
  if(keep){ S.w=keep; }
  dl((all?'تقارير ':'تقرير ')+cls().n+(all?'':' الطالب '+ns[0]), parts.join('<br style="page-break-before:always">')); }
function printCert(htmls){ var w=window.open('','_blank'); if(!w){ toast('اسمح بالنوافذ المنبثقة للطباعة','error'); return false; }
  var css=document.getElementById('hh-mh-style').textContent.split('/*CERT*/')[1]||'';
  w.document.write('<!doctype html><html dir="rtl"><head><meta charset="utf-8"><title>شهادة</title><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&family=Amiri:wght@700&display=swap" rel="stylesheet"><style>@page{size:A4 landscape;margin:10mm}body{margin:0;font-family:Cairo,sans-serif}#hh-mh{--f-ui:Cairo,sans-serif;--f-q:Amiri,serif}.pg{page-break-after:always;width:100%;}.pg:last-child{page-break-after:auto}'+css+'</style></head><body><div id="hh-mh">'+htmls.map(function(h){ return '<div class="pg">'+h+'</div>'; }).join('')+'</div><script>window.onload=function(){ setTimeout(function(){ window.print(); },600); };<\/script></body></html>');
  w.document.close(); return true; }
var DB={};
var S={cls:'',tab:'home',crit:'part',mode:'rec',picked:null,board:false,sel:7,certName:'',certSeat:7,t0:Date.now()};
try{ var tb=localStorage.getItem('mh_tab'); if(tb) S.tab=tb; }catch(e){}
function D(){ return DB[S.cls]||{students:[],log:[],names:{},loading:true}; }
function stu(n){ return D().students[n-1]; }
function score(s){ return s.ev.reduce(function(a,e){ return a+(e.p?1:-1); },0); }
function crit(k){ return CRIT.filter(function(c){ return c.k===k; })[0]; }
function esc(x){ return String(x==null?'':x).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function nm(n){ var v=D().names[n]; return v?esc(v):''; }
var ICO={
  plus:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  minus:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h14"/></svg>',
  dice:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1.2" fill="currentColor"/><circle cx="15" cy="15" r="1.2" fill="currentColor"/><circle cx="15" cy="9" r="1.2" fill="currentColor"/><circle cx="9" cy="15" r="1.2" fill="currentColor"/></svg>',
  lock:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  file:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4"/></svg>',
  star:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="m12 3 2.6 5.6 6.1.6-4.6 4.1 1.3 6L12 16.4 6.6 19.3l1.3-6L3.3 9.2l6.1-.6z"/></svg>',
  book:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/></svg>',
  hand:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 11V6a2 2 0 0 1 4 0v5M11 10V4a2 2 0 0 1 4 0v6M15 10V6a2 2 0 0 1 4 0v8a7 7 0 0 1-14 0v-2a2 2 0 0 1 4 0"/></svg>',
  users:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.6"/><path d="M16 14a5 5 0 0 1 5.5 5"/></svg>'
};
var TABS=[['home','الرئيسية'],['lesson','وضع الحصة'],['beh','السلوك'],['eval','التقويم'],['rep','التقارير'],['wiz','التقرير الذكي'],['hon','التكريم'],['cls','صفوفي']];

/* ── رسم الإطار ── */
function tabs(){ var flag=D().students.filter(function(s){ return s.ev.filter(function(e){ return !e.p&&e.d<=7; }).length>=3; }).length;
  document.getElementById('mh-tabs').innerHTML=TABS.map(function(t){ return '<button role="tab" aria-selected="'+(S.tab===t[0])+'" class="'+(S.tab===t[0]?'on':'')+'" data-t="'+t[0]+'">'+t[1]+(t[0]==='beh'&&flag?' <em>'+flag+'</em>':'')+'</button>'; }).join('');
  document.querySelectorAll('#mh-tabs button').forEach(function(b){ b.onclick=function(){ S.tab=b.dataset.t; try{ localStorage.setItem('mh_tab',S.tab); }catch(e){} render(); rootScroll(); }; }); }
function toast(m,k){ if(typeof window.toast==='function'){ try{ window.toast(m,k||'info'); return; }catch(e){} } var t=document.createElement('div'); t.className='mh-toast'; t.textContent=m; document.body.appendChild(t); setTimeout(function(){ t.remove(); },1800); }
function note(){ return MH.demo?'<div class="note">'+ICO.lock+'<span><b>عينة تجريبية ببيانات وهمية.</b> '+(MH.why||'')+'</span>'+(MH.whyBtn||'')+'</div>':'<div class="note">'+ICO.lock+'<span>الطلاب بأرقام الجلوس فقط. الأسماء اختيارية تُحفظ على جهازك ولا تُرفع إلى المنصة.</span></div>'; }

/* ── الرئيسية ── */
function vHome(){
  var st=D().students, n=st.length;
  var present=st.filter(function(s){ return s.att!=='a'; }).length;
  var silent=st.filter(function(s){ return !s.ev.some(function(e){ return e.c==='part'&&e.p&&e.d<=14; }); });
  var flag=st.filter(function(s){ return s.ev.filter(function(e){ return !e.p&&e.d<=7; }).length>=3; });
  var avg=Math.round(st.reduce(function(a,s){ return a+tot(s); },0)/n);
  var gates=MH.demo?Math.round(100*st.reduce(function(a,s){ return a+s.gates; },0)/(n*6)):null;
  var posAll=0, negAll=0; st.forEach(function(s){ s.ev.forEach(function(e){ if(e.p) posAll++; else negAll++; }); });
  return note()
  +'<div class="flow"><div><b><i>1</i>سجّل</b><p>في الحصة بلمستين: رقم الطالب ثم المعيار.</p></div><div><b><i>2</i>تابع</b><p>ملف لكل طالب، وخطة لمن يحتاج متابعة.</p></div><div><b><i>3</i>قيّم</b><p>درجاتك، ونتائج ألعاب المدرسة وبواباتها تلقائياً.</p></div><div><b><i>4</i>كرّم واطبع</b><p>المتابعة الشهرية والشهادات جاهزة.</p></div></div>'
  +'<div class="sec"><h2>اليوم في '+esc(cls().n)+'</h2><small>'+todayAr()+'</small><span class="r"><button class="btn p" data-go="lesson">'+ICO.hand+' ابدأ وضع الحصة</button></span></div>'
  +'<div class="grid g4">'
  +kpi('الحضور',present+' من '+n,Math.round(100*present/n),'آخر حصة مسجّلة')
  +kpi('ملاحظات إيجابية',posAll,Math.round(100*posAll/Math.max(1,posAll+negAll)),negAll+' ملاحظة تحتاج متابعة')
  +kpi('متوسط التقويم',avg+' من 100',avg,MH.demo?'اختبارات ومهام وألعاب':'من سجل الدرجات')
  +(gates==null?kpi('بوابات الإتقان','قريباً',0,'ربطها بالمدرسة في تحديث لاحق'):kpi('بوابات الإتقان',gates+'%',gates,'من المدرسة تلقائياً'))
  +'</div>'
  +'<div class="grid g2" style="margin-top:14px">'
  +'<div class="pn"><div class="sec" style="margin-top:0"><h2>يحتاجون انتباهك</h2><small>حسب تسجيلاتك</small></div>'
  +(flag.length?flag.map(function(s){ return '<div class="row"><span class="seatb">'+s.n+'</span><span class="t">الطالب '+s.n+(nm(s.n)?'، '+nm(s.n):'')+'<small>'+s.ev.filter(function(e){ return !e.p&&e.d<=7; }).length+' ملاحظات سلوك هذا الأسبوع</small></span><span class="chip c-r">متابعة</span><button class="btn s" data-open="'+s.n+'">افتح الملف</button></div>'; }).join(''):'<div class="empty">لا أحد يحتاج متابعة هذا الأسبوع</div>')
  +'<div class="row"><span class="seatb" style="background:var(--amber)">'+silent.length+'</span><span class="t">طلاب لم يشاركوا منذ أسبوعين<small>الأرقام: '+silent.slice(0,10).map(function(s){ return s.n; }).join('، ')+(silent.length>10?' وغيرهم':'')+'</small></span><button class="btn s" data-go="lesson">اسألهم اليوم</button></div></div>'
  +'<div class="pn"><div class="sec" style="margin-top:0"><h2>آخر التسجيلات</h2><small>هذه الشعبة</small></div>'+feedRows(8)+'</div>'
  +'</div>'
  +'<div class="sec"><h2>أدوات أخرى</h2><small>الأدوات السابقة ما زالت متاحة</small></div><div class="otools">'
  +[['hhShowInsight(null)','التقرير التربوي الذكي','تصحيح آلي للاختبارات'],['hhOpenGradebook()','دفتر المتابعة السابق','الدرجات والحضور والمهارات'],['hhOpenCertificates()','الشهادات السابقة','قوالب الشهادات القديمة']].map(function(t){ return '<button data-old="'+t[0]+'"><b>'+t[1]+'</b><small>'+t[2]+'</small></button>'; }).join('')+'</div>'
  +'<div class="sec"><h2>أدوات المحتوى</h2><small>تنتقل إلى المدرسة في تحديثها القادم</small></div><div class="otools">'
  +[['showScreen(\'screen-setup\')','الألعاب التنافسية','فرق طلابك وتنافسوا'],['showScreen(\'screen-custom-q\')','أسئلتي المخصصة','بنك أسئلتك الخاص'],['hhOpenCurriculum()','مركز المنهج','أسئلة واختبارات من دروسك'],['hhSchoolEntry()','مدرستي','مسار متدرج ببوابات إتقان']].map(function(t){ return '<button data-old="'+t[0]+'"><b>'+t[1]+'</b><small>'+t[2]+'</small></button>'; }).join('')+'</div>';
}
function kpi(t,v,p,f){ return '<div class="pn kpi"><small>'+t+'</small><b class="num">'+v+'</b><div class="bar"><i style="width:'+Math.max(3,Math.min(100,p))+'%"></i></div><div class="ft">'+f+'</div></div>'; }
function cls(){ return CLASSES.filter(function(c){ return c.k===S.cls; })[0]; }
function feedRows(max){
  var L=D().log.slice(-max).reverse();
  var base=[{n:7,c:'part',p:true,txt:'شارك بإجابة',ago:'قبل يوم'},{n:14,c:'beh',p:false,txt:'كثير الحديث أثناء الشرح',ago:'قبل يومين'},{n:21,c:'inter',p:true,txt:'تفاعل مع زملائه',ago:'قبل يومين'},{n:3,c:'book',p:false,txt:'لم يحضر الكتاب',ago:'قبل 3 أيام'}];
  if(!MH.demo){ base=[]; var logged=L.map(function(x){ return x.ev; }); D().students.forEach(function(s){ s.ev.forEach(function(e){ if(logged.indexOf(e)<0) base.push({n:s.n,c:e.c,p:e.p,txt:e.txt,at:e.at||0,ago:e.d===0?'اليوم':e.d===1?'أمس':'قبل '+e.d+(e.d<11?' أيام':' يوماً')}); }); }); base.sort(function(a,b){ return b.at-a.at; }); }
  var rows=L.map(function(x){ return {n:x.n,c:x.c,p:x.p,txt:x.txt,ago:'الآن',id:x.id}; }).concat(base).slice(0,max);
  if(!rows.length) return '<div class="empty">لا تسجيلات بعد. ابدأ من «وضع الحصة».</div>';
  return rows.map(function(r){ var cr=crit(r.c); return '<div class="row"><span class="seatb" style="background:'+cr.c+'">'+r.n+'</span><span class="t"><b>'+(r.p?'+ ':'')+esc(r.txt)+'</b><small>'+cr.t+'، '+r.ago+'</small></span>'+(r.id?'<button class="undo" data-undo="'+r.id+'">تراجع</button>':'')+'</div>'; }).join('');
}

/* ── وضع الحصة ── */
function vLesson(){
  var st=D().students, mins=Math.floor((Date.now()-S.t0)/60000);
  var seats=st.map(function(s){
    var today=s.ev.filter(function(e){ return e.d===0; });
    var sc=today.reduce(function(a,e){ return a+(e.p?1:-1); },0);
    return '<button class="seat '+(s.att==='a'?'abs':s.att==='l'?'late':'')+(S.picked===s.n?' pick':'')+'" data-seat="'+s.n+'" aria-label="الطالب '+s.n+'"><span class="n num">'+s.n+'</span><span class="nm">'+(nm(s.n)||(s.att==='a'?'غائب':s.att==='l'?'متأخر':''))+'</span><span class="dots">'+today.slice(-6).map(function(e){ return '<i class="'+(e.p?'':'neg')+'" style="--cc:'+crit(e.c).c+'"></i>'; }).join('')+'</span>'+(sc?'<span class="sc '+(sc>0?'c-g':'c-r')+'">'+(sc>0?'+'+sc:sc)+'</span>':'')+'</button>';
  }).join('');
  var tops=st.map(function(s){ return {n:s.n,p:s.ev.filter(function(e){ return e.d===0&&e.p; }).length}; }).filter(function(x){ return x.p; }).sort(function(a,b){ return b.p-a.p; }).slice(0,8);
  return '<div class="lesson"><div>'
  +'<div class="lbar"><div class="seg" role="group" aria-label="نوع التسجيل"><button class="'+(S.mode==='rec'?'on':'')+'" data-mode="rec">الملاحظات</button><button class="'+(S.mode==='att'?'on':'')+'" data-mode="att">الحضور</button></div>'
  +(S.mode==='att'?'<button class="btn p" id="mh-attsave">احفظ الحضور</button>':'')+'<button class="btn" id="mh-rand">'+ICO.dice+' اختر طالباً</button>'
  +'<label class="btn" style="cursor:pointer"><input type="checkbox" id="mh-board" '+(S.board?'checked':'')+' style="accent-color:#8A1538"> اعرض على شاشة الصف</label>'
  +'<div class="clock">الحصة <span class="num">'+mins+' د</span></div></div>'
  +(S.mode==='rec'?'<div class="crit">'+CRIT.map(function(c){ return '<button class="'+(S.crit===c.k?'on':'')+'" style="--cc:'+c.c+'" data-crit="'+c.k+'"><i></i>'+c.t+'</button>'; }).join('')+'<span class="hint">اضغط رقماً لإضافة نقطة '+crit(S.crit).t+'، أو اضغط مطولاً للخيارات</span></div>'
   :'<div class="crit"><span class="hint">اضغط الرقم للتبديل: حاضر، ثم غائب، ثم متأخر</span></div>')
  +'<div class="seats" id="mh-seats">'+seats+'</div>'
  +(S.board?'<div class="board"><h4>لوحة الصف، تظهر النقاط الإيجابية فقط</h4><div class="tops">'+(tops.length?tops.map(function(t){ return '<span class="num">'+t.n+'، '+t.p+'</span>'; }).join(''):'<span>لم تُسجَّل نقاط بعد</span>')+'</div></div>':'')
  +'</div><aside class="side"><div class="pn"><div class="sec" style="margin-top:0"><h2>هذه الحصة</h2><small class="num">'+D().log.length+' تسجيلاً</small></div><div class="feed" id="mh-feed">'+(D().log.length?lessonFeed():'<div class="empty">لم تسجّل شيئاً بعد. اضغط رقم طالب.</div>')+'</div></div>'
  +'<div class="pn" style="margin-top:12px"><div class="sec" style="margin-top:0"><h2>بعد الحصة</h2></div><p style="margin:0;font-weight:600;font-size:13.5px;color:var(--muted)">تُحفظ تسجيلات اليوم في ملف كل طالب، وتدخل تلقائياً في المتابعة الشهرية.</p><button class="btn p" style="margin-top:10px" data-go="rep">'+ICO.file+' شاهد المتابعة الشهرية</button></div></aside></div>';
}
var lid=0;
function lessonFeed(){ return D().log.slice().reverse().map(function(r){ var cr=crit(r.c); return '<div class="row"><span class="seatb" style="background:'+cr.c+'">'+r.n+'</span><span class="t"><b>'+(r.p?'+ ':'')+esc(r.txt)+'</b><small>'+cr.t+'</small></span><button class="undo" data-undo="'+r.id+'">تراجع</button></div>'; }).join(''); }
function addEv(n,c,p,txt,lvl){
  var s=stu(n), cr=crit(c); txt=txt||(p?cr.pos:cr.neg);
  var o={c:c,p:!!p,lvl:lvl||0,txt:txt,date:todayISO(),at:Date.now(),by:uid()};
  var ev={c:c,p:p,d:0,txt:txt,lvl:lvl||0,date:o.date,at:o.at,_o:o}; s.ev.push(ev); lid++; D().log.push({id:lid,n:n,c:c,p:p,txt:txt,ev:ev}); persistEv(s,o);
  render(); var b=document.querySelector('.seat[data-seat="'+n+'"]');
  if(b){ b.classList.add('pop'); var f=document.createElement('span'); f.className='flt '+(p?'c-g':'c-r'); f.textContent=(p?'+1 ':'') +cr.t; b.appendChild(f); }
}
function undo(id){ var L=D().log, x=L.filter(function(l){ return l.id===id; })[0]; if(!x) return; var s=stu(x.n); var k=s.ev.indexOf(x.ev); if(k>-1){ s.ev.splice(k,1); if(x.ev._o) persistEv(s,x.ev._o,true); } D().log=L.filter(function(l){ return l.id!==id; }); toast('تم التراجع عن تسجيل الطالب '+x.n); render(); }
function sheet(n){
  var s=stu(n); S.shTab=S.shTab||'pos';
  var L=document.getElementById('mh-layer');
  function body(){
    var groups=CAT[S.shTab];
    return '<div class="sheet-bg" id="mh-sb"><div class="sheet" role="dialog" aria-label="الطالب '+n+'"><h3><span class="seatb">'+n+'</span>الطالب '+n+(nm(n)?'، '+nm(n):'')+'<button class="x" id="mh-sx" aria-label="إغلاق">'+ICO.minus.replace('M5 12h14','M6 6l12 12M18 6 6 18')+'</button></h3>'
     +'<div class="seg" style="margin-top:12px;display:flex"><button style="flex:1" class="'+(S.shTab==='pos'?'on':'')+'" data-sh="pos">سلوك إيجابي</button><button style="flex:1" class="'+(S.shTab==='neg'?'on':'')+'" data-sh="neg">يحتاج متابعة</button></div>'
     +groups.map(function(G){ var cr=crit(G.c); return '<div class="cg"><h5><i style="background:'+cr.c+'"></i>'+G.g+'</h5><div class="cgi">'+G.items.map(function(it){ var t=S.shTab==='pos'?it:it[0], lv=S.shTab==='pos'?0:it[1]; return '<button class="'+(S.shTab==='pos'?'pos':'neg')+'" data-cat="'+G.c+'|'+lv+'|'+esc(t)+'">'+(S.shTab==='pos'?'<b>+</b>':'<b>!</b>')+' '+esc(t)+(lv?' <span class="chip '+LVL[lv][1]+'">'+LVL[lv][0]+'</span>':'')+'</button>'; }).join('')+'</div></div>'; }).join('')
     +'<div class="att"><button class="btn'+(s.att==='p'?' p':'')+'" data-att="p">حاضر</button><button class="btn'+(s.att==='l'?' p':'')+'" data-att="l">متأخر</button><button class="btn'+(s.att==='a'?' p':'')+'" data-att="a">غائب</button></div>'
     +'<input class="note2" id="mh-nt" placeholder="ملاحظة قصيرة اختيارية، خاصة بك ولا تظهر لأحد"><div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap"><button class="btn p" id="mh-ntok">احفظ الملاحظة</button><button class="btn" data-open="'+n+'">افتح ملف الطالب</button></div>'
     +'<p class="lock" style="margin-top:10px">'+ICO.lock+' القائمة قابلة للتعديل لتطابق لائحة السلوك المعتمدة في مدرستك</p></div></div>';
  }
  function close(){ L.innerHTML=''; }
  function draw(){ L.innerHTML=body();
    document.getElementById('mh-sb').onclick=function(e){ if(e.target.id==='mh-sb') close(); };
    document.getElementById('mh-sx').onclick=close;
    L.querySelectorAll('[data-sh]').forEach(function(b){ b.onclick=function(){ S.shTab=b.dataset.sh; draw(); }; });
    L.querySelectorAll('[data-cat]').forEach(function(b){ b.onclick=function(){ var p=b.dataset.cat.split('|'); close(); addEv(n,p[0],S.shTab==='pos',p.slice(2).join('|'),+p[1]); }; });
    L.querySelectorAll('[data-att]').forEach(function(b){ b.onclick=function(){ s.att=b.dataset.att; close(); render(); }; });
    document.getElementById('mh-ntok').onclick=function(){ var v=document.getElementById('mh-nt').value.trim(); if(!v){ toast('اكتب الملاحظة أولاً'); return; } close(); addEv(n,'beh',true,v); toast('حُفظت الملاحظة في ملف الطالب '+n); };
    L.querySelectorAll('[data-open]').forEach(function(b){ b.onclick=function(){ close(); S.sel=+b.dataset.open; S.tab='beh'; render(); }; });
  }
  draw();
}

/* ── السلوك وملف الطالب ── */
function vBeh(){
  var st=D().students, s=stu(S.sel)||st[0];
  var max=Math.max.apply(null,st.map(function(x){ return Math.abs(score(x)); }).concat([1]));
  var list=st.map(function(x){ var v=score(x), w=Math.round(50*Math.abs(v)/max); return '<button class="'+(x.n===s.n?'on':'')+'" data-sel="'+x.n+'"><span class="seatb">'+x.n+'</span><span class="net"><i style="'+(v>=0?'right:50%;width:'+w+'%;background:var(--green)':'left:50%;width:'+w+'%;background:var(--red)')+'"></i><i style="right:50%;width:1px;background:var(--line)"></i></span><b class="num" style="width:30px;text-align:center;color:'+(v>=0?'var(--green)':'var(--red)')+'">'+(v>0?'+':'')+v+'</b></button>'; }).join('');
  var ev=s.ev.slice().sort(function(a,b){ return a.d-b.d; });
  var by={}; CRIT.forEach(function(c){ by[c.k]={p:0,n:0}; }); s.ev.forEach(function(e){ by[e.c][e.p?'p':'n']++; });
  var needs=s.ev.filter(function(e){ return !e.p&&e.d<=7; }).length>=3;
  return note()+'<div class="prof"><div class="pn"><div class="sec" style="margin-top:0"><h2>طلاب الشعبة</h2><small>صافي الملاحظات</small></div><div class="list">'+list+'</div></div>'
  +'<div class="grid"><div class="pn"><div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap"><span class="seatb" style="width:48px;height:48px;font-size:20px;border-radius:12px">'+s.n+'</span><div><b style="font-size:20px;color:var(--ink)">الطالب '+s.n+(nm(s.n)?'، '+nm(s.n):'')+'</b><div class="lock">'+ICO.lock+' ملف خاص بالمعلم</div></div>'+(needs?'<span class="chip c-r" style="margin-inline-start:auto">يحتاج متابعة</span>':'<span class="chip c-g" style="margin-inline-start:auto">مستقر</span>')+'</div>'
  +'<div class="grid g4" style="margin-top:14px">'+CRIT.map(function(c){ return '<div style="background:var(--soft);border-radius:12px;padding:10px"><small style="font-weight:800;color:var(--muted);display:flex;align-items:center;gap:6px"><i style="width:9px;height:9px;border-radius:3px;background:'+c.c+';display:inline-block"></i>'+c.t+'</small><b class="num" style="font-size:20px;color:var(--green)">+'+by[c.k].p+'</b> <b class="num" style="font-size:15px;color:var(--red)">'+(by[c.k].n?'، '+by[c.k].n+' للمتابعة':'')+'</b></div>'; }).join('')+'</div></div>'
  +(needs?'<div class="pn"><div class="sec" style="margin-top:0"><h2>خطة المتابعة</h2><small>تكتبها مرة، وتراجعها أسبوعياً</small></div><div class="plan"><div><b>ما لاحظتُه</b><p>كثرة الحديث أثناء الشرح، وتأخر مرتين هذا الأسبوع.</p></div><div><b>ما فعلتُه</b><p>نقلته للمقعد الأمامي، وكلّفته بقراءة سؤال البداية.</p></div><div><b>ما تغيّر</b><p>بانتظار المراجعة يوم الخميس.</p></div></div></div>':'')
  +'<div class="pn"><div class="sec" style="margin-top:0"><h2>السجل</h2><small>الأحدث أولاً</small></div><div class="tl">'+(ev.length?ev.map(function(e){ var cr=crit(e.c); return '<div class="ev" style="--cc:'+(e.p?cr.c:'var(--red)')+'"><b>'+(e.p?'':'متابعة: ')+esc(e.txt)+'</b>'+(e.lvl?' <span class="chip '+LVL[e.lvl][1]+'">'+LVL[e.lvl][0]+'</span>':'')+'<br><small>'+cr.t+'، '+(e.d===0?'اليوم':e.d===1?'أمس':'قبل '+e.d+(e.d<11?' أيام':' يوماً'))+'</small></div>'; }).join(''):'<div class="empty">لا تسجيلات بعد</div>')+'</div></div></div></div>';
}

/* ── التقويم ── */
function tot(s){ if(s.games==null){ return Math.round(((s.q1||0)+(s.task||0)+(s.proj||0))*2.5); } return Math.round(s.q1+s.task+s.proj+s.games*0.3+s.gates*(30/6)*0.67); }
function vEval(){
  var st=D().students;
  var bins=[0,0,0,0,0]; st.forEach(function(s){ var t=Math.min(100,tot(s)); bins[t>=90?4:t>=80?3:t>=70?2:t>=60?1:0]++; });
  var mx=Math.max.apply(null,bins);
  return note()+'<div class="grid g3">'
  +'<div class="pn"><div class="sec" style="margin-top:0"><h2>توزيع الدرجات</h2></div><div class="mini">'+['أقل من 60','60 إلى 69','70 إلى 79','80 إلى 89','90 فأكثر'].map(function(l,i){ return '<div><b class="num" style="font-size:12px;color:var(--ink)">'+bins[i]+'</b><i style="height:'+Math.max(4,Math.round(70*bins[i]/mx))+'px;'+(i===0?'background:var(--red)':'')+'"></i><small>'+l+'</small></div>'; }).join('')+'</div></div>'
  +'<div class="pn"><div class="sec" style="margin-top:0"><h2>التقرير التربوي الذكي</h2></div><p style="margin:0 0 10px;font-weight:600;font-size:13.5px;color:var(--muted)">صوّر أوراق الاختبار، فتُصحَّح وتُكتب الدرجة في عمودها تلقائياً.</p><button class="btn p" id="mh-ai">'+ICO.file+' صحّح اختبار «الإقليم المناخي»</button></div>'
  +'<div class="pn"><div class="sec" style="margin-top:0"><h2>من المدرسة تلقائياً</h2></div><p style="margin:0;font-weight:600;font-size:13.5px;color:var(--muted)">نتائج الألعاب وبوابات الإتقان ستصل بأرقام الجلوس، دون أي اسم، في تحديث لاحق. حالياً يُحسب المجموع من درجاتك الثلاث.</p></div>'
  +'</div>'
  +'<div class="sec"><h2>سجل الدرجات</h2><small>اضغط أي خانة لتعديلها</small></div>'
  +'<div class="tw"><table><thead><tr><th>الطالب</th><th>اختبار قصير (10)</th><th>مهمة أدائية (10)</th><th>مشروع (20)</th><th>ألعاب المدرسة</th><th>بوابات الإتقان</th><th>المجموع (100)</th><th>المستوى</th></tr></thead><tbody>'
  +st.map(function(s){ var t=Math.min(100,tot(s)); var lv=t>=90?['ممتاز','c-g']:t>=75?['جيد جداً','c-g']:t>=60?['جيد','c-a']:['يحتاج دعماً','c-r'];
    return '<tr><td><span style="display:inline-flex;align-items:center;gap:8px"><span class="seatb" style="width:28px;height:28px;font-size:12px">'+s.n+'</span>'+(nm(s.n)||'')+'</span></td><td><input class="num" inputmode="numeric" data-g="'+s.n+'|q1" value="'+(s.q1==null?'':s.q1)+'" aria-label="اختبار قصير للطالب '+s.n+'"></td><td><input class="num" inputmode="numeric" data-g="'+s.n+'|task" value="'+(s.task==null?'':s.task)+'" aria-label="مهمة أدائية للطالب '+s.n+'"></td><td><input class="num" inputmode="numeric" data-g="'+s.n+'|proj" value="'+(s.proj==null?'':s.proj)+'" aria-label="مشروع للطالب '+s.n+'"></td><td>'+(s.games==null?'<span class="chip c-n">قريباً</span>':'<span class="auto num">'+s.games+'%<small>تلقائي</small></span>')+'</td><td>'+(s.gates==null?'<span class="chip c-n">قريباً</span>':'<span class="auto num">'+s.gates+' من 6<small>تلقائي</small></span>')+'</td><td class="tot num">'+t+'</td><td><span class="chip '+lv[1]+'">'+lv[0]+'</span></td></tr>'; }).join('')
  +'</tbody></table></div>';
}

/* ── التقارير ── */
function vRep(){
  var st=D().students, M={e:['م','e'],g:['ج','g'],w:['ت','w'],n:['','n']};
  return note()
  +'<div class="sec" style="margin-top:0"><h2>المتابعة الشهرية</h2><small>'+monthName()+'، تُعبّأ تلقائياً من وضع الحصة</small><span class="r"><button class="btn g" id="mh-exp">'+ICO.file+' صدّر Word لكل الشعب</button></span></div>'
  +'<div class="pn" style="padding:0;overflow:hidden"><div style="padding:14px 16px;display:flex;flex-wrap:wrap;gap:12px;align-items:center;border-bottom:1.5px solid var(--line)"><b style="color:var(--ink);font-size:16px">'+esc(MH.school)+'</b><span class="chip c-n">'+esc(cls().n)+'</span><span class="chip c-n">'+esc(MH.subject)+'</span><span style="margin-inline-start:auto;display:flex;gap:10px;font-size:12.5px;font-weight:800;color:var(--muted)"><span><span class="mk e">م</span> متميز</span><span><span class="mk g">ج</span> جيد</span><span><span class="mk w">ت</span> يحتاج متابعة</span></span></div>'
  +'<div class="tw" style="border:0;border-radius:0"><table><thead><tr><th rowspan="2">الطالب</th>'+WEEKS.map(function(w){ return '<th colspan="4">'+w+'</th>'; }).join('')+'<th rowspan="2">المستوى</th><th rowspan="2">الإجراء</th></tr><tr>'+WEEKS.map(function(){ return CRIT.map(function(c){ return '<th style="font-size:11px">'+c.t+'</th>'; }).join(''); }).join('')+'</tr></thead><tbody>'
  +st.map(function(s){ var w=0,nn=0; weeksOf(s).forEach(function(o){ CRIT.forEach(function(c){ if(o[c.k]==='w') w++; if(o[c.k]==='n') nn++; }); });
    var lv=nn===16?['بلا تسجيلات','c-n']:w>=6?['يحتاج متابعة','c-r']:w>=3?['جيد','c-a']:['متميز','c-g'];
    return '<tr><td><span class="seatb" style="width:28px;height:28px;font-size:12px;display:inline-grid">'+s.n+'</span></td>'+weeksOf(s).map(function(o){ return CRIT.map(function(c){ var m=M[o[c.k]]; return '<td><span class="mk '+m[1]+'">'+m[0]+'</span></td>'; }).join(''); }).join('')+'<td><span class="chip '+lv[1]+'">'+lv[0]+'</span></td><td style="font-size:12.5px;font-weight:700;color:var(--muted)">'+(nn===16?'':w>=6?'تواصل مع ولي الأمر':w>=3?'تشجيع ومتابعة':'تعزيز')+'</td></tr>'; }).join('')
  +'</tbody></table></div></div>'
  +'<div class="grid g2" style="margin-top:14px"><div class="pn"><div class="sec" style="margin-top:0"><h2>تقرير ولي الأمر</h2><small>للطالب '+S.sel+'</small></div><p style="margin:0;font-weight:600;font-size:13.5px">يتضمن المشاركة والسلوك والتقويم بلغة إيجابية. ملاحظاتك الخاصة لا تظهر فيه إلا إذا اخترت ذلك لكل ملاحظة.</p><div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap"><button class="btn" id="mh-par">اكتبه بالتقرير الذكي</button><span class="lock">'+ICO.lock+' الملاحظات الخاصة مخفية</span></div></div>'
  +'<div class="pn"><div class="sec" style="margin-top:0"><h2>تقرير الشعبة للإدارة</h2></div><p style="margin:0;font-weight:600;font-size:13.5px">إحصاء الشعبة، ونسب المستويات، والطلاب الذين يحتاجون متابعة، في صفحة واحدة.</p><button class="btn" style="margin-top:10px" id="mh-adm">اكتبه بالتقرير الذكي</button></div></div>';
}

/* ── التكريم ── */
function vHon(){
  var st=D().students;
  var part=st.map(function(s){ return {n:s.n,v:s.ev.filter(function(e){ return e.c==='part'&&e.p; }).length}; }).sort(function(a,b){ return b.v-a.v; }).slice(0,5);
  var top=st.map(function(s){ return {n:s.n,v:tot(s)}; }).sort(function(a,b){ return b.v-a.v; }).slice(0,5);
  var beh=st.map(function(s){ return {n:s.n,v:score(s)}; }).sort(function(a,b){ return b.v-a.v; }).slice(0,5);
  function sug(t,arr,b){ return '<div class="badge"><span class="md2">'+b+'</span><div style="min-width:0"><b>'+t+'</b><small class="num">الأرقام: '+arr.map(function(x){ return x.n; }).join('، ')+'</small></div><button class="btn s" data-cert="'+arr[0].n+'|'+t+'" style="margin-inline-start:auto">شهادة</button></div>'; }
  var tpl=S.tpl||'classic', title=S.certTitle||'المشارك الملهم';
  return note()+'<div class="sec" style="margin-top:0"><h2>مقترحات هذا الشهر</h2><small>من تسجيلاتك ودرجاتك</small><span class="r"><button class="btn" data-go="wiz">أصدر من التقرير الذكي</button></span></div>'
  +'<div class="badges">'+sug('المشارك الملهم',part,ICO.hand)+sug('التفوق الدراسي',top,ICO.book)+sug('القدوة في السلوك',beh,ICO.star)+'</div>'
  +'<div class="sec"><h2>قوالب الشهادات</h2><small>'+TPLS.length+' قوالب بشعار المُلهم</small></div>'
  +'<div class="tpls">'+TPLS.map(function(t){ return '<button class="tp'+(tpl===t[0]?' on':'')+'" data-tpl="'+t[0]+'"><span class="thumb">'+certHTML(t[0],{title:title,seat:0,name:'',reason:certReasonText(title)})+'</span><b>'+t[1]+'</b><small>'+t[2]+'</small></button>'; }).join('')+'</div>'
  +'<div class="sec"><h2>المعاينة</h2><small>الطالب '+S.certSeat+'</small></div>'
  +'<div class="grid g2" style="align-items:start"><div class="cprev" id="mh-cpv">'+certHTML(tpl,{title:title,seat:S.certSeat,name:S.certName,reason:certReasonText(title)})+'</div>'
  +'<div class="pn"><div class="wfield"><label for="mh-ctitle">نوع الشهادة</label><select id="mh-ctitle">'+Object.keys(REASONS).map(function(k){ return '<option'+(k===title?' selected':'')+'>'+k+'</option>'; }).join('')+'</select></div>'
  +'<div class="wfield" style="margin-top:10px"><label for="mh-certn">اسم الطالب '+S.certSeat+'</label><input id="mh-certn" class="note2" style="margin:0" value="'+esc(S.certName)+'" placeholder="اكتب الاسم كما سيُطبع"></div>'
  +'<p class="lock" style="margin-top:8px">'+ICO.lock+' يُمسح الاسم بعد الطباعة، ولا يُرسل إلى المنصة</p><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><button class="btn p" id="mh-prn">'+ICO.file+' جهّز للطباعة</button><button class="btn" id="mh-prnall">شهادات الخمسة الأوائل دفعة واحدة</button></div></div></div>';
}

/* ── التقرير الذكي: خطوة لكل معيار، ثم الإصدار ── */
var WZ=[
 {k:'who',t:'الطالب والمخرج'},
 {k:'beh',t:'السلوك',q:'كيف تصف سلوكه في الحصة؟',opts:['قدوة لزملائه في الالتزام','ملتزم في أغلب الحصص','يلتزم مع التذكير أحياناً','يحتاج متابعة مستمرة'],
   say:['فهو قدوة لزملائه في الالتزام بالنظام الصفي','وهو ملتزم بالنظام الصفي في أغلب الحصص','ويلتزم بالنظام الصفي مع حاجته إلى التذكير أحياناً','ويحتاج سلوكه في الحصة إلى متابعة مستمرة منّا ومنكم']},
 {k:'part',t:'المشاركة',q:'كيف مشاركته في الدرس؟',opts:['يبادر بالمشاركة دائماً','يشارك عند سؤاله','يشارك قليلاً','نادراً ما يشارك'],
   say:['ويبادر بالمشاركة دائماً','ويشارك عندما يُسأل','ومشاركته قليلة ونطمح إلى زيادتها','ونادراً ما يشارك، ونشجّعه على المبادرة']},
 {k:'book',t:'الكتاب والأدوات',q:'هل يحضر كتابه وأدواته؟',opts:['يحضرها دائماً','يحضرها غالباً','ينساها أحياناً','ينساها كثيراً'],
   say:['ويحرص على إحضار كتابه وأدواته دائماً','ويحضر كتابه وأدواته غالباً','وينسى كتابه أو أدواته أحياناً','ويكثر نسيان كتابه وأدواته']},
 {k:'inter',t:'التفاعل والتعاون',q:'كيف يعمل مع زملائه؟',opts:['يتعاون ويقود مجموعته','يتعاون مع زملائه','يحتاج تشجيعاً على العمل الجماعي','يجد صعوبة في العمل مع زملائه'],
   say:['ويتعاون مع زملائه ويقود مجموعته بحكمة','ويتعاون مع زملائه في الأنشطة','ويحتاج تشجيعاً على العمل الجماعي','ويجد صعوبة في العمل مع زملائه']},
 {k:'ach',t:'التحصيل',q:'ما مستواه الدراسي؟',opts:['ممتاز','جيد جداً','جيد','يحتاج دعماً'],
   say:['ومستواه الدراسي ممتاز','ومستواه الدراسي جيد جداً','ومستواه الدراسي جيد','ويحتاج مستواه الدراسي إلى دعم']},
 {k:'rec',t:'التوصية',q:'بماذا توصي؟ يمكنك اختيار أكثر من توصية',multi:1,opts:['الاستمرار على هذا المستوى','تشجيعه على المبادرة بالمشاركة','متابعة إحضار الكتاب يومياً','تنظيم وقت المذاكرة في البيت','التواصل مع المعلم أسبوعياً','ترشيحه لشهادة تميّز']},
 {k:'out',t:'المعاينة والإصدار'}
];
var OUTS=[['parent','تقرير ولي الأمر'],['admin','تقرير متابعة للإدارة'],['cert','شهادة']];
function wzNew(n){ S.w={step:0,n:n||S.sel||1,out:S.w&&S.w.out||'parent',a:{},str:[],need:[],sug:{}}; wzSuggest(); }
function wzSuggest(){ var s=stu(S.w.n), sug={}, ev=s.ev;
  function lvl(c){ var p=ev.filter(function(e){ return e.c===c&&e.p; }).length, q=ev.filter(function(e){ return e.c===c&&!e.p; }).length; var v=p-q*1.5; return v>=3?0:v>=1?1:v>=-1?2:3; }
  sug.beh=lvl('beh'); sug.part=lvl('part'); sug.book=lvl('book'); sug.inter=lvl('inter');
  var t=Math.min(100,tot(s)); sug.ach=t>=90?0:t>=75?1:t>=60?2:3;
  S.w.sug=sug; S.w.a={}; Object.keys(sug).forEach(function(k){ S.w.a[k]=sug[k]; });
  S.w.a.rec=[]; if(sug.part>=2) S.w.a.rec.push(1); if(sug.book>=2) S.w.a.rec.push(2); if(!S.w.a.rec.length) S.w.a.rec.push(0); if(sug.beh===0&&sug.ach<=1) S.w.a.rec.push(5);
  S.w.str=uniq(ev.filter(function(e){ return e.p; }).map(function(e){ return e.txt; })).slice(0,3);
  S.w.need=uniq(ev.filter(function(e){ return !e.p; }).map(function(e){ return e.txt; })).slice(0,3); }
function uniq(a){ var o=[]; a.forEach(function(x){ if(o.indexOf(x)<0) o.push(x); }); return o; }
function wzText(){ var w=S.w, A=w.a, n=w.n, sp=[];
  ['beh','part','book','inter','ach'].forEach(function(k){ var st=WZ.filter(function(x){ return x.k===k; })[0]; if(A[k]!=null) sp.push(st.say[A[k]]); });
  if(sp.length) sp[0]=sp[0].replace(/^[وف]/,'');
  var recs=(A.rec||[]).map(function(i){ return WZ[6].opts[i]; });
  if(w.out==='admin'){
    return '<p><b>الطالب رقم '+n+'، '+esc(cls().n)+'، شهر '+monthName()+'</b></p><ul>'+['beh','part','book','inter','ach'].map(function(k){ var st=WZ.filter(function(x){ return x.k===k; })[0]; return '<li><b>'+st.t+':</b> '+st.opts[A[k]]+'</li>'; }).join('')+'</ul>'
     +(w.str.length?'<p><b>من سجله الإيجابي:</b> '+w.str.map(esc).join('، ')+'.</p>':'')
     +(w.need.length?'<p><b>ما يحتاج متابعة:</b> '+w.need.map(esc).join('، ')+'.</p>':'')
     +(recs.length?'<p><b>الإجراء المقترح:</b> '+recs.join('، ')+'.</p>':''); }
  return '<p>ولي أمر الطالب المحترم،</p><p>يسعدنا إطلاعكم على مستوى ابنكم في مادة '+esc(MH.subject)+' لشهر '+monthName()+'؛ '+sp.join('، ')+'.</p>'
    +(w.str.length?'<p>ومن أجمل ما لاحظناه عليه: '+w.str.map(esc).join('، ')+'.</p>':'')
    +(w.need.length&&A.beh>=2?'<p>ونأمل أن نعمل معاً على: '+w.need.map(esc).join('، ')+'.</p>':'')
    +(recs.length?'<p>ونوصي بـ'+recs.join('، و')+'.</p>':'')
    +'<p>شاكرين تعاونكم،<br>معلم المادة</p>'; }
function wzCertReason(){ var A=S.w.a; if(A.beh===0) return 'القدوة في السلوك'; if(A.ach===0) return 'التفوق الدراسي'; if(A.part===0) return 'المشارك الملهم'; if(A.inter===0) return 'التعاون والمبادرة'; return 'نجم الأسبوع'; }
function vWiz(){
  if(!S.w||S.w.cls!==S.cls){ wzNew(S.sel); S.w.cls=S.cls; }
  var w=S.w, st=WZ[w.step];
  var steps='<ol class="wsteps">'+WZ.map(function(x,i){ return '<li class="'+(i<w.step?'d':'')+(i===w.step?' on':'')+'"><button data-ws="'+i+'"><i class="num">'+(i<w.step?'✓':i+1)+'</i>'+x.t+'</button></li>'; }).join('')+'</ol>';
  var body='';
  if(st.k==='who'){
    body='<h3 class="wq">لمن التقرير، وماذا تريد أن تُصدر؟</h3><div class="wfield"><label for="mh-wn">رقم الطالب</label><select id="mh-wn">'+D().students.map(function(s){ return '<option value="'+s.n+'"'+(s.n===w.n?' selected':'')+'>الطالب '+s.n+(nm(s.n)?'، '+nm(s.n):'')+'</option>'; }).join('')+'</select></div>'
     +'<div class="wopts" style="margin-top:12px">'+OUTS.map(function(o){ return '<button class="'+(w.out===o[0]?'on':'')+'" data-out="'+o[0]+'"><b>'+o[1]+'</b><small>'+(o[0]==='parent'?'بلغة إيجابية، دون ملاحظاتك الخاصة':o[0]==='admin'?'نقاط مختصرة مع الإجراء المقترح':'تُقترح الشهادة المناسبة من إجاباتك')+'</small></button>'; }).join('')+'</div>'
     +'<p class="lock" style="margin-top:12px">'+ICO.lock+' الإجابات مُعبّأة مسبقاً من سجل الطالب، وأنت تؤكدها أو تغيّرها</p>';
  } else if(st.k==='out'){
    if(w.out==='cert'){ var r=wzCertReason(); body='<h3 class="wq">الشهادة المقترحة: '+r+'</h3><p style="margin:0 0 12px;font-weight:600;color:var(--muted)">اخترناها من إجاباتك. يمكنك تغيير القالب والسبب في التكريم.</p><div class="cprev">'+certHTML(S.tpl||'classic',{title:r,seat:w.n,name:'',reason:certReasonText(r)})+'</div><div class="wnav"><button class="btn p" id="mh-wcert">افتح في التكريم</button></div>'; }
    else body='<h3 class="wq">معاينة '+(w.out==='admin'?'تقرير المتابعة':'تقرير ولي الأمر')+'</h3><div class="paper"><div class="phd">'+LG(0)+'<div><b>'+esc(MH.school)+'</b><small>'+(w.out==='admin'?'تقرير متابعة طالب':'تقرير ولي الأمر')+'، شهر '+monthName()+' '+new Date().getFullYear()+'</small></div></div><div id="mh-wtext">'+wzText()+'</div></div><div class="wnav"><button class="btn g" id="mh-wexp">'+ICO.file+' صدّر Word</button><button class="btn" id="mh-wcopy">انسخ النص</button><button class="btn" id="mh-wall">أصدر تقارير الشعبة كلها</button></div>';
  } else {
    var sg=w.sug[st.k];
    body='<h3 class="wq">'+st.q+'</h3><div class="wopts">'+st.opts.map(function(o,i){ var on=st.multi?(w.a.rec||[]).indexOf(i)>-1:w.a[st.k]===i; return '<button class="'+(on?'on':'')+'" data-opt="'+i+'"><b>'+o+'</b>'+(!st.multi&&sg===i?'<small class="sg">مقترح من سجله</small>':'')+'</button>'; }).join('')+'</div>'
     +(st.k==='beh'&&(w.str.length||w.need.length)?'<div class="wrec">'+(w.str.length?'<div><b>من سجله الإيجابي</b>'+w.str.map(function(x){ return '<span class="chip c-g">'+esc(x)+'</span>'; }).join('')+'</div>':'')+(w.need.length?'<div><b>يحتاج متابعة</b>'+w.need.map(function(x){ return '<span class="chip c-r">'+esc(x)+'</span>'; }).join('')+'</div>':'')+'</div>':'')
     +(st.k==='ach'?'<p class="lock" style="margin-top:10px">مجموعه في التقويم '+Math.min(100,tot(stu(w.n)))+' من 100</p>':'');
  }
  var nav='<div class="wnav">'+(w.step>0?'<button class="btn" id="mh-wprev">السابق</button>':'')+(w.step<WZ.length-1?'<button class="btn p" id="mh-wnext">'+(w.step===WZ.length-2?'عاين التقرير':'التالي')+'</button>':'<button class="btn" id="mh-wnew">طالب آخر</button>')+'</div>';
  var live=st.k!=='out'&&st.k!=='who'?'<aside class="pn"><div class="sec" style="margin-top:0"><h2>يُكتب الآن</h2><small>يتحدّث مع كل اختيار</small></div><div class="paper sm">'+wzText()+'</div></aside>':'';
  return note()+'<div class="sec" style="margin-top:0"><h2>التقرير الذكي</h2><small>اختر في كل خطوة، ويُكتب التقرير أو تُقترح الشهادة</small></div>'+steps
   +'<div class="wgrid'+(live?'':' one')+'"><div class="pn">'+body+(st.k==='out'?'':nav)+(st.k==='out'?'<div class="wnav" style="border-top:0;padding-top:0">'+'<button class="btn" id="mh-wprev">السابق</button><button class="btn" id="mh-wnew">طالب آخر</button></div>':'')+'</div>'+live+'</div>';
}
function bindWiz(r){
  r.querySelectorAll('[data-ws]').forEach(function(b){ b.onclick=function(){ S.w.step=+b.dataset.ws; render(); }; });
  var wn=document.getElementById('mh-wn'); if(wn) wn.onchange=function(){ var o=S.w.out; wzNew(+wn.value); S.w.out=o; S.w.cls=S.cls; render(); };
  r.querySelectorAll('[data-out]').forEach(function(b){ b.onclick=function(){ S.w.out=b.dataset.out; render(); }; });
  r.querySelectorAll('[data-opt]').forEach(function(b){ b.onclick=function(){ var st=WZ[S.w.step], i=+b.dataset.opt;
    if(st.multi){ var a=S.w.a.rec=S.w.a.rec||[]; var j=a.indexOf(i); if(j>-1) a.splice(j,1); else a.push(i); a.sort(); } else S.w.a[st.k]=i; render(); }; });
  var nx=document.getElementById('mh-wnext'); if(nx) nx.onclick=function(){ S.w.step++; render(); };
  var pv=document.getElementById('mh-wprev'); if(pv) pv.onclick=function(){ S.w.step--; render(); };
  var nw=document.getElementById('mh-wnew'); if(nw) nw.onclick=function(){ var o=S.w.out; var n=S.w.n%D().students.length+1; wzNew(n); S.w.out=o; S.w.cls=S.cls; S.w.step=1; render(); };
  var ex=document.getElementById('mh-wexp'); if(ex) ex.onclick=function(){ exportReport(false); };
  var cp=document.getElementById('mh-wcopy'); if(cp) cp.onclick=function(){ var t=document.getElementById('mh-wtext').innerText; try{ navigator.clipboard.writeText(t).then(function(){ toast('نُسخ نص التقرير'); },function(){ toast('حدّد النص وانسخه يدوياً'); }); }catch(e){ toast('حدّد النص وانسخه يدوياً'); } };
  var al=document.getElementById('mh-wall'); if(al) al.onclick=function(){ exportReport(true); };
  var wc=document.getElementById('mh-wcert'); if(wc) wc.onclick=function(){ S.certTitle=wzCertReason(); S.certSeat=S.w.n; S.certName=''; S.tab='hon'; render(); };
}
/* ── قوالب الشهادات ── */
var TPLS=[['classic','الكلاسيكية','إطار ذهبي مزدوج، للتفوق والتميّز'],['modern','الحديثة','شريط عنابي جانبي، لكل المناسبات'],['thanks','شكر وتقدير','للمبادرة والتعاون وخدمة الصف']];
var REASONS={'التفوق الدراسي':'تقديراً لتفوقه الدراسي وتميّزه في المادة','المشارك الملهم':'تقديراً لمشاركته المتميزة ومبادرته الدائمة في الحصة','القدوة في السلوك':'تقديراً لسلوكه القويم والتزامه الذي جعله قدوة لزملائه','التعاون والمبادرة':'تقديراً لتعاونه مع زملائه ومبادرته في خدمة صفه','نجم الأسبوع':'لتميّزه هذا الأسبوع في المشاركة والالتزام','شكر وتقدير':'شكراً لجهوده المخلصة وحرصه على خدمة صفه وزملائه'};
function certReasonText(t){ return REASONS[t]||REASONS['نجم الأسبوع']; }
/* شعار المُلهم المعتمد */

function LG(){ return '<img class="lg" src="'+(window._HH_LOGO_MAROON||'')+'" alt="شعار المُلهم">'; }
var STAR='<svg viewBox="0 0 24 24" width="38" height="38" fill="currentColor"><path d="m12 3 2.6 5.6 6.1.6-4.6 4.1 1.3 6L12 16.4 6.6 19.3l1.3-6L3.3 9.2l6.1-.6z"/></svg>';
function certHTML(tpl,d){
  var nmv=d.name?esc(d.name):'<span class="ph">يُكتب الاسم عند الطباعة</span>';
  var sch=esc(MH.school), subj=esc(MH.subject)+'، شهر '+monthName()+' '+new Date().getFullYear();
  if(tpl==='modern') return '<div class="ct ct-modern"><div class="side"><b>'+esc(d.title)+'</b><span>'+sch+'</span></div><div class="mainc">'+LG(0)+'<small>شهادة تقدير</small><p>يُمنح الطالب</p><div class="cn">'+nmv+'</div><p class="rs">'+esc(d.reason)+'</p><p class="sb">'+subj+'</p><div class="sg"><span>معلم المادة</span><span>مدير المدرسة</span></div></div></div>';
  if(tpl==='thanks') return '<div class="ct ct-thanks"><div class="rib">شكر وتقدير</div>'+LG(0)+'<small>'+sch+'</small><p>يتقدّم معلم المادة بالشكر إلى الطالب</p><div class="cn">'+nmv+'</div><p class="rs">'+esc(d.reason)+'</p><div class="sg"><span>معلم المادة</span><span>مدير المدرسة</span></div></div>';
  return '<div class="ct ct-classic">'+LG(0)+'<small>'+sch+'</small><h4>شهادة '+esc(d.title)+'</h4><p>تُمنح هذه الشهادة للطالب</p><div class="cn">'+nmv+'</div><p class="rs">'+esc(d.reason)+'</p><p class="sb">'+subj+'</p><div class="sg"><span>معلم المادة</span><span>مدير المدرسة</span></div></div>';
}

/* ── صفوفي ── */
function vCls(){
  return note()+'<div class="sec" style="margin-top:0"><h2>شعبك</h2><small>'+CLASSES.length+' شعب</small><span class="r"><button class="btn p" id="mh-addc">'+ICO.plus+' أضف شعبة</button></span></div>'
  +'<div class="grid g3">'+CLASSES.map(function(c){ var d=DB[c.k]||{students:[]}, pos=0; d.students.forEach(function(s){ s.ev.forEach(function(e){ if(e.p) pos++; }); }); return '<div class="pn"><div style="display:flex;align-items:center;gap:10px"><span class="md" style="background:var(--goldBg);color:var(--maroon)">'+ICO.users+'</span><div><b style="font-size:17px;color:var(--ink)">'+c.n+'</b><div style="font-size:12.5px;font-weight:700;color:var(--muted)" class="num">'+(c.c||d.students.length)+' طالباً بأرقام الجلوس</div></div></div><div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap"><span class="chip c-g num">'+pos+' ملاحظة إيجابية</span><span class="chip c-n">رمز الشعبة '+esc(c.k)+'</span></div><div style="display:flex;gap:8px;margin-top:12px"><button class="btn s" data-cls="'+c.k+'">افتح وضع الحصة</button><button class="btn s" data-names="'+c.k+'">الأسماء على جهازي</button></div></div>'; }).join('')+'</div>'
  +'<div class="pn" style="margin-top:14px;display:flex;gap:12px;align-items:flex-start">'+ICO.lock+'<div><b style="color:var(--ink)">لماذا الأرقام؟</b><p style="margin:2px 0 0;font-weight:600;font-size:13.5px;color:var(--muted)">لا تُحفظ أسماء الطلاب في المنصة. يدخل الطالب الألعاب برقم جلوسه، وتربط المحبرة نتائجه بالرقم نفسه. إن أردت رؤية الأسماء فاكتبها على جهازك فقط، ولا تغادره.</p></div></div>';
}

/* ── التوجيه والأحداث ── */
function render(){
  tabs();
  if(!MH.demo&&(!DB[S.cls]||DB[S.cls].loading)){ tabs(); var ap=document.getElementById('mh-app'); if(ap) ap.innerHTML='<div class="pn empty" style="margin-top:16px">جارٍ تحميل الشعبة…</div>'; return; }
  if(!MH.demo&&!D().students.length){ tabs(); var ap2=document.getElementById('mh-app'); if(ap2) ap2.innerHTML=note()+'<div class="pn empty">لا طلاب في هذه الشعبة بعد. حدّد عدد طلابها من «صفوفي».<div style="margin-top:10px"><button class="btn p" onclick="hhMhAddClass()">افتح صفوفي</button></div></div>'; return; }
  var V={home:vHome,lesson:vLesson,beh:vBeh,eval:vEval,rep:vRep,wiz:vWiz,hon:vHon,cls:vCls}[S.tab]||vHome;
  var app=document.getElementById('mh-app'); app.innerHTML=V(); bind(app); if(S.tab==='wiz') bindWiz(app);
}
function bind(r){
  r.querySelectorAll('[data-old]').forEach(function(b){ b.onclick=function(){ var c=b.dataset.old; hhMhClose(); try{ (new Function(c))(); }catch(e){ toast('هذه الأداة غير متاحة الآن'); } }; });
  r.querySelectorAll('[data-go]').forEach(function(b){ b.onclick=function(){ S.tab=b.dataset.go; render(); rootScroll(); }; });
  r.querySelectorAll('[data-open]').forEach(function(b){ b.onclick=function(){ S.sel=+b.dataset.open; S.tab='beh'; render(); }; });
  r.querySelectorAll('[data-undo]').forEach(function(b){ b.onclick=function(){ undo(+b.dataset.undo); }; });
  r.querySelectorAll('[data-mode]').forEach(function(b){ b.onclick=function(){ S.mode=b.dataset.mode; render(); }; });
  r.querySelectorAll('[data-crit]').forEach(function(b){ b.onclick=function(){ S.crit=b.dataset.crit; render(); }; });
  r.querySelectorAll('[data-seat]').forEach(function(b){
    var n=+b.dataset.seat, t=null, long=false;
    b.addEventListener('pointerdown',function(){ long=false; t=setTimeout(function(){ long=true; sheet(n); },450); });
    ['pointerup','pointerleave','pointercancel'].forEach(function(ev){ b.addEventListener(ev,function(){ clearTimeout(t); }); });
    b.addEventListener('contextmenu',function(e){ e.preventDefault(); });
    b.onclick=function(){ if(long) return; S.picked=null;
      if(S.mode==='att'){ var s=stu(n); s.att=s.att==='p'?'a':s.att==='a'?'l':'p'; render(); return; }
      addEv(n,S.crit,true); };
  });
  var rb=document.getElementById('mh-rand'); if(rb) rb.onclick=function(){ var pres=D().students.filter(function(s){ return s.att!=='a'; }); var i=0, k=0, iv=setInterval(function(){ k=pres[Math.floor(Math.random()*pres.length)].n; document.querySelectorAll('.seat').forEach(function(x){ x.classList.toggle('pick',+x.dataset.seat===k); }); if(++i>12){ clearInterval(iv); S.picked=k; toast('الطالب '+k+'، اضغط رقمه لتسجيل مشاركته'); } },80); };
  var as=document.getElementById('mh-attsave'); if(as) as.onclick=function(){ saveAttendance(); };
  var bd=document.getElementById('mh-board'); if(bd) bd.onchange=function(){ S.board=bd.checked; render(); };
  r.querySelectorAll('[data-sel]').forEach(function(b){ b.onclick=function(){ S.sel=+b.dataset.sel; render(); }; });
  r.querySelectorAll('[data-g]').forEach(function(i){ i.onchange=function(){ var p=i.dataset.g.split('|'), s=stu(+p[0]); var mx={q1:10,task:10,proj:20}[p[1]]; var v=Math.max(0,Math.min(mx,parseInt(i.value,10)||0)); s[p[1]]=v; persistGrades(s); toast('حُفظت درجة الطالب '+p[0]); render(); }; });
  var ai=document.getElementById('mh-ai'); if(ai) ai.onclick=function(){ if(typeof hhShowInsight==='function'){ hhMhClose(); hhShowInsight(null); } else toast('التقرير التربوي غير متاح الآن'); };
  var ex=document.getElementById('mh-exp'); if(ex) ex.onclick=function(){ exportMonthly(); };
  ['par','adm'].forEach(function(id){ var b=document.getElementById(id); if(b) b.onclick=function(){ wzNew(S.sel); S.w.cls=S.cls; S.w.out=id==='par'?'parent':'admin'; S.w.step=1; S.tab='wiz'; render(); }; });
  r.querySelectorAll('[data-cert]').forEach(function(b){ b.onclick=function(){ var p=b.dataset.cert.split('|'); S.certSeat=+p[0]; S.certTitle=p[1]; S.certName=''; render(); var f=document.getElementById('mh-certn'); if(f) f.focus(); }; });
  function cpv(){ var o=document.getElementById('mh-cpv'); var t=S.certTitle||'المشارك الملهم'; if(o) o.innerHTML=certHTML(S.tpl||'classic',{title:t,seat:S.certSeat,name:S.certName,reason:certReasonText(t)}); }
  var cn=document.getElementById('mh-certn'); if(cn) cn.oninput=function(){ S.certName=cn.value; cpv(); };
  var ctl=document.getElementById('mh-ctitle'); if(ctl) ctl.onchange=function(){ S.certTitle=ctl.value; render(); };
  r.querySelectorAll('[data-tpl]').forEach(function(b){ b.onclick=function(){ S.tpl=b.dataset.tpl; render(); }; });
  var pa=document.getElementById('mh-prnall'); if(pa) pa.onclick=function(){ var t=S.certTitle||'المشارك الملهم'; var top=D().students.map(function(s){ return {n:s.n,v:t==='التفوق الدراسي'?tot(s):s.ev.filter(function(e){ return e.p; }).length}; }).sort(function(a,b){ return b.v-a.v; }).slice(0,5); printCert(top.map(function(x){ return certHTML(S.tpl||'classic',{title:t,seat:x.n,name:'',reason:certReasonText(t)}); })); };
  var pr=document.getElementById('mh-prn'); if(pr) pr.onclick=function(){ if(!S.certName.trim()){ toast('اكتب الاسم أولاً'); return; } var t=S.certTitle||'المشارك الملهم'; if(printCert([certHTML(S.tpl||'classic',{title:t,seat:S.certSeat,name:S.certName,reason:certReasonText(t)})])){ S.certName=''; setTimeout(render,400); } };
  r.querySelectorAll('[data-cls]').forEach(function(b){ b.onclick=function(){ S.cls=b.dataset.cls; var sl=document.getElementById('mh-cls'); if(sl) sl.value=S.cls; S.tab='lesson'; if(!DB[S.cls]) loadClass(S.cls); else render(); }; });
  r.querySelectorAll('[data-names]').forEach(function(b){ b.onclick=function(){ if(MH.demo){ toast('الأسماء تُكتب لشعبك الحقيقية من صفوفي'); return; } if(typeof hhOpenClasses==='function'){ hhMhClose(); hhOpenClasses(); } }; });
  var ac=document.getElementById('mh-addc'); if(ac) ac.onclick=function(){ hhMhAddClass(); };
}
document.addEventListener('keydown',function(e){ if(e.key==='Escape'){ var l=document.getElementById('mh-layer'); if(l) l.innerHTML=''; } });
setInterval(function(){ if(document.getElementById('hh-mh')&&S.tab==='lesson'){ var c=document.querySelector('.clock span'); if(c) c.textContent=Math.floor((Date.now()-S.t0)/60000)+' د'; } },30000);

window.hhMhOpen=function(tab){
  mhStyle();
  try{ if(window.hhCloseFramedOverlays) hhCloseFramedOverlays('mh'); }catch(e){}
  var old=document.getElementById('hh-mh'); if(old) old.remove();
  try{ document.body.classList.remove('hh-immersive'); }catch(e){}
  var ov=document.createElement('div'); ov.id='hh-mh'; ov.className='mh2';
  ov.innerHTML='<div class="mh-top"><div class="mh-cls"><label for="mh-cls">الشعبة</label><select id="mh-cls"></select></div><div id="mh-tabs" class="mh-tabs" role="tablist"></div></div><main class="wrap" id="mh-app"></main><div id="mh-layer"></div>';
  document.body.appendChild(ov);
  if(tab) S.tab=tab;
  try{ if(window.hhNavMark) hhNavMark('mh'); }catch(e){}
  CLASSES=CLASSES||[]; paintSel(); render(); loadClasses();
};
window.hhMhClose=function(){ var e=document.getElementById('hh-mh'); if(e) e.remove(); var l=document.getElementById('mh-layer'); if(l) l.innerHTML=''; try{ if(window.hhNavMark) hhNavMark(null); }catch(e2){} };
window._hhMh=function(){ return {S:S,DB:DB,MH:MH,CLASSES:CLASSES}; };
/* الإغلاق عند الانتقال لأي وجهة أخرى */
function wrapClose(){ var f=window.hhCloseFramedOverlays; if(f&&!f._mh){ var w=function(keep){ if(keep!=='mh'&&document.getElementById('hh-mh')) hhMhClose(); return f.apply(this,arguments); }; w._mh=1; window.hhCloseFramedOverlays=w; }
  var s=window.showScreen; if(typeof s==='function'&&!s._mh){ var w2=function(){ if(document.getElementById('hh-mh')) hhMhClose(); return s.apply(this,arguments); }; w2._mh=1; window.showScreen=w2; } }
wrapClose(); setTimeout(wrapClose,1500);
})();
