// ═══════════════════════════════════════════════════════════
// 🚩 فئة "أعلام الدول" — 24 سؤالاً
// الفلسفة: الصورة هي السؤال، النص ثابت قصير، الإجابة كلمة
// التدرج: easy=دول مشهورة، med=متوسطة الشهرة، hard=نادرة
// مصدر الصور: Flagpedia CDN (flagcdn.com) - مجاني وعالي الجودة
// ═══════════════════════════════════════════════════════════
(function(){
  if(typeof window === 'undefined') return;

  function flag(code){
    return 'https://flagcdn.com/w640/' + code + '.png';
  }

  var inject = function(){
    if(typeof QDB_ORIGINAL === 'undefined') return false;
    QDB_ORIGINAL['أعلام الدول'] = [

      // ════════ EASY (8) — دول مشهورة جداً ════════
      {q:'لمن هذا العلم؟', a:'قطر',             diff:'easy', img:flag('qa')},
      {q:'لمن هذا العلم؟', a:'المملكة العربية السعودية', diff:'easy', img:flag('sa')},
      {q:'لمن هذا العلم؟', a:'مصر',             diff:'easy', img:flag('eg')},
      {q:'لمن هذا العلم؟', a:'اليابان',         diff:'easy', img:flag('jp')},
      {q:'لمن هذا العلم؟', a:'فرنسا',           diff:'easy', img:flag('fr')},
      {q:'لمن هذا العلم؟', a:'إيطاليا',          diff:'easy', img:flag('it')},
      {q:'لمن هذا العلم؟', a:'الولايات المتحدة', diff:'easy', img:flag('us')},
      {q:'لمن هذا العلم؟', a:'البرازيل',         diff:'easy', img:flag('br')},

      // ════════ MED (8) — دول متوسطة الشهرة ════════
      {q:'لمن هذا العلم؟', a:'الإمارات',         diff:'med', img:flag('ae')},
      {q:'لمن هذا العلم؟', a:'الكويت',           diff:'med', img:flag('kw')},
      {q:'لمن هذا العلم؟', a:'لبنان',            diff:'med', img:flag('lb')},
      {q:'لمن هذا العلم؟', a:'كندا',             diff:'med', img:flag('ca')},
      {q:'لمن هذا العلم؟', a:'ألمانيا',          diff:'med', img:flag('de')},
      {q:'لمن هذا العلم؟', a:'إسبانيا',          diff:'med', img:flag('es')},
      {q:'لمن هذا العلم؟', a:'الصين',            diff:'med', img:flag('cn')},
      {q:'لمن هذا العلم؟', a:'الأرجنتين',        diff:'med', img:flag('ar')},

      // ════════ HARD (8) — دول نادرة أو مميزة ════════
      {q:'لمن هذا العلم؟', a:'سلطنة عُمان',      diff:'hard', img:flag('om')},
      {q:'لمن هذا العلم؟', a:'موريتانيا',        diff:'hard', img:flag('mr')},
      {q:'لمن هذا العلم؟', a:'جزر القمر',        diff:'hard', img:flag('km')},
      {q:'لمن هذا العلم؟', a:'كازاخستان',        diff:'hard', img:flag('kz')},
      {q:'لمن هذا العلم؟', a:'نيبال',            diff:'hard', img:flag('np')},
      {q:'لمن هذا العلم؟', a:'بوتان',            diff:'hard', img:flag('bt')},
      {q:'لمن هذا العلم؟', a:'سورينام',          diff:'hard', img:flag('sr')},
      {q:'لمن هذا العلم؟', a:'بوركينا فاسو',     diff:'hard', img:flag('bf')},

    ];
    return true;
  };
  if(!inject()){ document.addEventListener('DOMContentLoaded', inject); }
})();
