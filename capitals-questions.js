// ═══════════════════════════════════════════════════════════
// 🏛️ فئة "عواصم الدول" — 24 سؤالاً عن العواصم العالمية
// مستويات: easy=8, med=8, hard=8
// الأيقونات: SVG مصممة (مسجد/برج/مبنى) بهوية المنصة الذهبية
// ═══════════════════════════════════════════════════════════
(function(){
  if(typeof window === 'undefined') return;

  // ─── أيقونات SVG موحدة بهوية المنصة (ذهبي/نبيتي/أخضر) ───
  // كل أيقونة تمثل نمطاً معمارياً يربط الطالب بهوية المنطقة

  // 🕌 أيقونة "قبة ومئذنة" — للعواصم الإسلامية/العربية
  var ICON_MOSQUE = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">' +
    '<defs>' +
      '<radialGradient id="bgM" cx="50%" cy="40%"><stop offset="0%" stop-color="#5C3A1E"/><stop offset="100%" stop-color="#2a1a0c"/></radialGradient>' +
      '<linearGradient id="gldM" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#fff5c0"/><stop offset="50%" stop-color="#fcdf65"/><stop offset="100%" stop-color="#7a5818"/></linearGradient>' +
    '</defs>' +
    '<rect width="400" height="400" fill="url(#bgM)"/>' +
    '<polygon points="50,40 53,48 61,48 55,53 58,61 50,56 42,61 45,53 39,48 47,48" fill="#fcdf65"/>' +
    '<polygon points="350,50 353,58 361,58 355,63 358,71 350,66 342,71 345,63 339,58 347,58" fill="#fcdf65"/>' +
    '<rect x="80" y="200" width="240" height="140" fill="#cfe1f0" stroke="url(#gldM)" stroke-width="3"/>' +
    '<path d="M200 100 Q160 100 160 160 Q160 200 200 200 Q240 200 240 160 Q240 100 200 100 Z" fill="url(#gldM)" stroke="#7a5818" stroke-width="2"/>' +
    '<rect x="195" y="80" width="10" height="30" fill="url(#gldM)"/>' +
    '<circle cx="200" cy="78" r="6" fill="url(#gldM)"/>' +
    '<rect x="100" y="160" width="20" height="180" fill="url(#gldM)" stroke="#7a5818" stroke-width="2"/>' +
    '<rect x="280" y="160" width="20" height="180" fill="url(#gldM)" stroke="#7a5818" stroke-width="2"/>' +
    '<path d="M100 160 Q110 140 120 160" fill="url(#gldM)" stroke="#7a5818" stroke-width="2"/>' +
    '<path d="M280 160 Q290 140 300 160" fill="url(#gldM)" stroke="#7a5818" stroke-width="2"/>' +
    '<rect x="180" y="260" width="40" height="80" fill="#5C3A1E"/>' +
    '<path d="M180 260 Q200 240 220 260" fill="#5C3A1E"/>' +
    '<ellipse cx="200" cy="370" rx="160" ry="6" fill="#000" opacity=".5"/>' +
    '</svg>'
  );

  // 🗼 أيقونة "برج عالمي" — للعواصم العالمية الكبرى
  var ICON_TOWER = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">' +
    '<defs>' +
      '<radialGradient id="bgT" cx="50%" cy="40%"><stop offset="0%" stop-color="#1e4d8c"/><stop offset="100%" stop-color="#0a1f3a"/></radialGradient>' +
      '<linearGradient id="gldT" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#fff5c0"/><stop offset="50%" stop-color="#fcdf65"/><stop offset="100%" stop-color="#7a5818"/></linearGradient>' +
    '</defs>' +
    '<rect width="400" height="400" fill="url(#bgT)"/>' +
    '<polygon points="50,40 53,48 61,48 55,53 58,61 50,56 42,61 45,53 39,48 47,48" fill="#fcdf65"/>' +
    '<polygon points="350,50 353,58 361,58 355,63 358,71 350,66 342,71 345,63 339,58 347,58" fill="#fcdf65"/>' +
    '<polygon points="200,60 195,80 205,80" fill="url(#gldT)"/>' +
    '<rect x="197" y="60" width="6" height="20" fill="url(#gldT)"/>' +
    '<polygon points="160,340 240,340 230,200 170,200" fill="url(#gldT)" stroke="#7a5818" stroke-width="2"/>' +
    '<polygon points="170,200 230,200 220,150 180,150" fill="url(#gldT)" stroke="#7a5818" stroke-width="2"/>' +
    '<polygon points="180,150 220,150 215,110 185,110" fill="url(#gldT)" stroke="#7a5818" stroke-width="2"/>' +
    '<polygon points="185,110 215,110 210,80 190,80" fill="url(#gldT)" stroke="#7a5818" stroke-width="2"/>' +
    '<rect x="195" y="220" width="10" height="10" fill="#5C3A1E"/>' +
    '<rect x="195" y="250" width="10" height="10" fill="#5C3A1E"/>' +
    '<rect x="195" y="280" width="10" height="10" fill="#5C3A1E"/>' +
    '<rect x="195" y="310" width="10" height="10" fill="#5C3A1E"/>' +
    '<ellipse cx="200" cy="350" rx="100" ry="6" fill="#000" opacity=".5"/>' +
    '</svg>'
  );

  // 🏛️ أيقونة "مبنى كلاسيكي" — للعواصم الأوروبية/التاريخية
  var ICON_CLASSIC = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">' +
    '<defs>' +
      '<radialGradient id="bgC" cx="50%" cy="40%"><stop offset="0%" stop-color="#1a7a4a"/><stop offset="100%" stop-color="#0a4525"/></radialGradient>' +
      '<linearGradient id="gldC" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#fff5c0"/><stop offset="50%" stop-color="#fcdf65"/><stop offset="100%" stop-color="#7a5818"/></linearGradient>' +
    '</defs>' +
    '<rect width="400" height="400" fill="url(#bgC)"/>' +
    '<polygon points="50,40 53,48 61,48 55,53 58,61 50,56 42,61 45,53 39,48 47,48" fill="#fcdf65"/>' +
    '<polygon points="350,50 353,58 361,58 355,63 358,71 350,66 342,71 345,63 339,58 347,58" fill="#fcdf65"/>' +
    '<polygon points="100,160 200,90 300,160" fill="url(#gldC)" stroke="#7a5818" stroke-width="2"/>' +
    '<rect x="100" y="160" width="200" height="20" fill="url(#gldC)" stroke="#7a5818" stroke-width="2"/>' +
    '<rect x="110" y="180" width="20" height="140" fill="url(#gldC)" stroke="#7a5818" stroke-width="2"/>' +
    '<rect x="160" y="180" width="20" height="140" fill="url(#gldC)" stroke="#7a5818" stroke-width="2"/>' +
    '<rect x="210" y="180" width="20" height="140" fill="url(#gldC)" stroke="#7a5818" stroke-width="2"/>' +
    '<rect x="260" y="180" width="20" height="140" fill="url(#gldC)" stroke="#7a5818" stroke-width="2"/>' +
    '<rect x="80" y="320" width="240" height="20" fill="url(#gldC)" stroke="#7a5818" stroke-width="2"/>' +
    '<circle cx="200" cy="130" r="6" fill="#5C3A1E"/>' +
    '<ellipse cx="200" cy="355" rx="140" ry="6" fill="#000" opacity=".5"/>' +
    '</svg>'
  );

  // 🌍 أيقونة "كرة أرضية" — للعواصم البعيدة/الغريبة
  var ICON_GLOBE = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">' +
    '<defs>' +
      '<radialGradient id="bgG" cx="50%" cy="40%"><stop offset="0%" stop-color="#5a3a8e"/><stop offset="100%" stop-color="#2a1a4a"/></radialGradient>' +
      '<linearGradient id="gldG" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#fff5c0"/><stop offset="50%" stop-color="#fcdf65"/><stop offset="100%" stop-color="#7a5818"/></linearGradient>' +
    '</defs>' +
    '<rect width="400" height="400" fill="url(#bgG)"/>' +
    '<polygon points="50,40 53,48 61,48 55,53 58,61 50,56 42,61 45,53 39,48 47,48" fill="#fcdf65"/>' +
    '<polygon points="350,50 353,58 361,58 355,63 358,71 350,66 342,71 345,63 339,58 347,58" fill="#fcdf65"/>' +
    '<circle cx="200" cy="200" r="120" fill="#cfe1f0" stroke="url(#gldG)" stroke-width="3"/>' +
    '<path d="M200 95 Q280 130 280 200 Q280 270 200 305 Q120 270 120 200 Q120 130 200 95 Z" fill="none" stroke="url(#gldG)" stroke-width="1.5" opacity=".7"/>' +
    '<line x1="120" y1="200" x2="280" y2="200" stroke="url(#gldG)" stroke-width="1.5" opacity=".7"/>' +
    '<line x1="200" y1="95" x2="200" y2="305" stroke="url(#gldG)" stroke-width="1.5" opacity=".7"/>' +
    '<path d="M150 160 Q175 145 200 155 Q225 165 250 155 Q260 175 245 195 L220 220 Q200 235 175 220 Q155 205 150 185 Q145 170 150 160 Z" fill="#1a7a4a" stroke="#0a4525" stroke-width="1.5"/>' +
    '<circle cx="200" cy="200" r="8" fill="url(#gldG)" stroke="#7a5818" stroke-width="2"/>' +
    '<ellipse cx="200" cy="345" rx="140" ry="6" fill="#000" opacity=".5"/>' +
    '</svg>'
  );

  var inject = function(){
    if(typeof QDB_ORIGINAL === 'undefined') return false;
    QDB_ORIGINAL['عواصم الدول'] = [

      // ════════════════ EASY (8) ════════════════
      // عواصم خليجية وعربية مشهورة

      {q:'ما عاصمة دولة قطر الواقعة على الخليج العربي؟', a:'الدوحة', diff:'easy', img:ICON_MOSQUE},
      {q:'ما عاصمة المملكة العربية السعودية؟', a:'الرياض', diff:'easy', img:ICON_MOSQUE},
      {q:'ما عاصمة الإمارات العربية المتحدة؟', a:'أبوظبي', diff:'easy', img:ICON_MOSQUE},
      {q:'ما عاصمة الكويت الواقعة شمال الخليج؟', a:'مدينة الكويت', diff:'easy', img:ICON_MOSQUE},
      {q:'ما عاصمة مصر، أم الدنيا؟', a:'القاهرة', diff:'easy', img:ICON_MOSQUE},
      {q:'ما عاصمة فرنسا، مدينة الأنوار؟', a:'باريس', diff:'easy', img:ICON_TOWER},
      {q:'ما عاصمة المملكة المتحدة وأكبر مدنها؟', a:'لندن', diff:'easy', img:ICON_TOWER},
      {q:'ما عاصمة اليابان وأكبر مدن العالم سكاناً؟', a:'طوكيو', diff:'easy', img:ICON_TOWER},

      // ════════════════ MED (8) ════════════════
      // عواصم تتطلب معرفة جغرافية أعمق

      {q:'ما عاصمة سلطنة عُمان المطلة على بحر العرب؟', a:'مسقط', diff:'med', img:ICON_MOSQUE},
      {q:'ما عاصمة الأردن وأقدم مدنه؟', a:'عمّان', diff:'med', img:ICON_MOSQUE},
      {q:'ما عاصمة المغرب الواقعة على المحيط الأطلسي؟', a:'الرباط', diff:'med', img:ICON_MOSQUE},
      {q:'ما عاصمة تركيا الواقعة في وسط الأناضول؟', a:'أنقرة', diff:'med', img:ICON_CLASSIC},
      {q:'ما عاصمة ألمانيا، أكبر اقتصاد في أوروبا؟', a:'برلين', diff:'med', img:ICON_CLASSIC},
      {q:'ما عاصمة إيطاليا، مهد الإمبراطورية الرومانية؟', a:'روما', diff:'med', img:ICON_CLASSIC},
      {q:'ما عاصمة كوريا الجنوبية ومركزها الاقتصادي؟', a:'سيول', diff:'med', img:ICON_TOWER},
      {q:'ما عاصمة الصين، أكبر دولة آسيوية سكاناً؟', a:'بكين', diff:'med', img:ICON_TOWER},

      // ════════════════ HARD (8) ════════════════
      // عواصم نادرة أو غير مشهورة

      {q:'ما عاصمة كازاخستان، أكبر دولة حبيسة في العالم؟', a:'أستانا', diff:'hard', img:ICON_GLOBE},
      {q:'ما عاصمة أستراليا، وليست سيدني كما يظن البعض؟', a:'كانبرا', diff:'hard', img:ICON_GLOBE},
      {q:'ما عاصمة كندا، ثاني أكبر دولة مساحةً في العالم؟', a:'أوتاوا', diff:'hard', img:ICON_GLOBE},
      {q:'ما عاصمة البرازيل، أكبر دول أمريكا الجنوبية؟', a:'برازيليا', diff:'hard', img:ICON_GLOBE},
      {q:'ما عاصمة نيوزيلندا الواقعة جنوب أوقيانوسيا؟', a:'ويلينغتون', diff:'hard', img:ICON_GLOBE},
      {q:'ما عاصمة جنوب إفريقيا الإدارية الرسمية؟', a:'بريتوريا', diff:'hard', img:ICON_GLOBE},
      {q:'ما عاصمة موريتانيا المطلة على الأطلسي؟', a:'نواكشوط', diff:'hard', img:ICON_MOSQUE},
      {q:'ما عاصمة جزر القمر، الدولة العربية الأبعد عن المشرق؟', a:'موروني', diff:'hard', img:ICON_GLOBE},

    ];
    return true;
  };
  if(!inject()){ document.addEventListener('DOMContentLoaded', inject); }
})();
