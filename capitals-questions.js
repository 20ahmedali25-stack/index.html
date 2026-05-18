// ═══════════════════════════════════════════════════════════
// 🏛️ فئة "عواصم الدول" — 24 سؤالاً
// الفلسفة: سؤال قصير مباشر، إجابة كلمة
// التدرج: easy=عواصم مشهورة، med=متوسطة، hard=نادرة
// الأيقونات: SVG واحدة موحدة (مبنى عاصمة) بهوية المنصة
// ═══════════════════════════════════════════════════════════
(function(){
  if(typeof window === 'undefined') return;

  // أيقونة موحدة "مبنى عاصمة" بهوية المنصة الذهبية/النبيتية
  var ICON_CAPITAL = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">' +
    '<defs>' +
      '<radialGradient id="bgCap" cx="50%" cy="40%"><stop offset="0%" stop-color="#5C3A1E"/><stop offset="100%" stop-color="#2a1a0c"/></radialGradient>' +
      '<linearGradient id="gldCap" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#fff5c0"/><stop offset="50%" stop-color="#fcdf65"/><stop offset="100%" stop-color="#7a5818"/></linearGradient>' +
    '</defs>' +
    '<rect width="400" height="400" fill="url(#bgCap)"/>' +
    '<polygon points="50,40 53,48 61,48 55,53 58,61 50,56 42,61 45,53 39,48 47,48" fill="#fcdf65"/>' +
    '<polygon points="350,50 353,58 361,58 355,63 358,71 350,66 342,71 345,63 339,58 347,58" fill="#fcdf65"/>' +
    '<rect x="80" y="200" width="240" height="140" fill="#cfe1f0" stroke="url(#gldCap)" stroke-width="3"/>' +
    '<path d="M200 100 Q160 100 160 160 Q160 200 200 200 Q240 200 240 160 Q240 100 200 100 Z" fill="url(#gldCap)" stroke="#7a5818" stroke-width="2"/>' +
    '<rect x="195" y="80" width="10" height="30" fill="url(#gldCap)"/>' +
    '<circle cx="200" cy="78" r="6" fill="url(#gldCap)"/>' +
    '<rect x="100" y="160" width="20" height="180" fill="url(#gldCap)" stroke="#7a5818" stroke-width="2"/>' +
    '<rect x="280" y="160" width="20" height="180" fill="url(#gldCap)" stroke="#7a5818" stroke-width="2"/>' +
    '<path d="M100 160 Q110 140 120 160" fill="url(#gldCap)" stroke="#7a5818" stroke-width="2"/>' +
    '<path d="M280 160 Q290 140 300 160" fill="url(#gldCap)" stroke="#7a5818" stroke-width="2"/>' +
    '<rect x="180" y="260" width="40" height="80" fill="#5C3A1E"/>' +
    '<ellipse cx="200" cy="370" rx="160" ry="6" fill="#000" opacity=".5"/>' +
    '</svg>'
  );

  var inject = function(){
    if(typeof QDB_ORIGINAL === 'undefined') return false;
    QDB_ORIGINAL['عواصم الدول'] = [

      // ════════ EASY (8) — عواصم مشهورة ════════
      {q:'ما عاصمة قطر؟',             a:'الدوحة',         diff:'easy', img:ICON_CAPITAL},
      {q:'ما عاصمة السعودية؟',         a:'الرياض',         diff:'easy', img:ICON_CAPITAL},
      {q:'ما عاصمة الإمارات؟',         a:'أبوظبي',         diff:'easy', img:ICON_CAPITAL},
      {q:'ما عاصمة مصر؟',              a:'القاهرة',        diff:'easy', img:ICON_CAPITAL},
      {q:'ما عاصمة الكويت؟',           a:'مدينة الكويت',   diff:'easy', img:ICON_CAPITAL},
      {q:'ما عاصمة فرنسا؟',            a:'باريس',          diff:'easy', img:ICON_CAPITAL},
      {q:'ما عاصمة بريطانيا؟',         a:'لندن',           diff:'easy', img:ICON_CAPITAL},
      {q:'ما عاصمة اليابان؟',          a:'طوكيو',          diff:'easy', img:ICON_CAPITAL},

      // ════════ MED (8) — عواصم متوسطة ════════
      {q:'ما عاصمة عُمان؟',            a:'مسقط',           diff:'med', img:ICON_CAPITAL},
      {q:'ما عاصمة الأردن؟',           a:'عمّان',          diff:'med', img:ICON_CAPITAL},
      {q:'ما عاصمة المغرب؟',           a:'الرباط',         diff:'med', img:ICON_CAPITAL},
      {q:'ما عاصمة تركيا؟',            a:'أنقرة',          diff:'med', img:ICON_CAPITAL},
      {q:'ما عاصمة ألمانيا؟',          a:'برلين',          diff:'med', img:ICON_CAPITAL},
      {q:'ما عاصمة إيطاليا؟',          a:'روما',           diff:'med', img:ICON_CAPITAL},
      {q:'ما عاصمة الصين؟',            a:'بكين',           diff:'med', img:ICON_CAPITAL},
      {q:'ما عاصمة كوريا الجنوبية؟',   a:'سيول',           diff:'med', img:ICON_CAPITAL},

      // ════════ HARD (8) — عواصم نادرة ════════
      {q:'ما عاصمة كازاخستان؟',        a:'أستانا',         diff:'hard', img:ICON_CAPITAL},
      {q:'ما عاصمة أستراليا؟',         a:'كانبرا',         diff:'hard', img:ICON_CAPITAL},
      {q:'ما عاصمة كندا؟',             a:'أوتاوا',         diff:'hard', img:ICON_CAPITAL},
      {q:'ما عاصمة البرازيل؟',         a:'برازيليا',       diff:'hard', img:ICON_CAPITAL},
      {q:'ما عاصمة نيوزيلندا؟',        a:'ويلينغتون',      diff:'hard', img:ICON_CAPITAL},
      {q:'ما عاصمة موريتانيا؟',        a:'نواكشوط',        diff:'hard', img:ICON_CAPITAL},
      {q:'ما عاصمة جزر القمر؟',        a:'موروني',         diff:'hard', img:ICON_CAPITAL},
      {q:'ما عاصمة بوتان؟',            a:'تيمفو',          diff:'hard', img:ICON_CAPITAL},

    ];
    return true;
  };
  if(!inject()){ document.addEventListener('DOMContentLoaded', inject); }
})();
