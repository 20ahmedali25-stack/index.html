/* وحدة مستخرجة من محرك المُلهِم — تُحمَّل بعد almulhim-engine.js */

// ═══ البرامج التربوية: برنامج القائد الملهم + الدورات + السجل واللوحة ═══
var HH_SPEAK_PROGRAM = {
  id: 'speak_master',
  name: 'القائد المُلهِم',
  subtitle: 'فنّ الإلقاء والتأثير',
  tagline: 'من الرهبة إلى المنصّة — رحلة صناعة متحدّث واثق',
  color: '#8A1538', dark: '#5E0E26', accent: '#B8924A',
  price: 750, currency: 'ر.ق',
  duration: '6 وحدات · 18 مهارة · 24 تمريناً عملياً',
  level: 'المرحلة الإعدادية والثانوية',

  overview: 'برنامج تدريبي متكامل يصنع من الطالب متحدثاً واثقاً مؤثراً. يجمع بين المعرفة النظرية والتمارين العملية المصوّرة، وينتهي باختبار إتقان وشهادة معتمدة من منصة المُلهِم.',

  goals: [
    'أن يتغلّب المتدرب على رهبة المواجهة ويتحدث بثقة أمام الجمهور.',
    'أن يوظّف لغة الجسد توظيفاً واعياً يدعم رسالته لا يشتّتها.',
    'أن يتحكم في نبرات صوته تنويعاً وتشديداً ووقفاً بما يخدم المعنى.',
    'أن يبني خطاباً متماسكاً له مقدمة جاذبة وجسد منظّم وخاتمة مؤثرة.',
    'أن يرتجل بثقة في المواقف غير المتوقعة ويدير أسئلة الجمهور.',
    'أن يقيس تقدّمه بنفسه عبر معايير أداء واضحة قابلة للملاحظة.'
  ],

  units: [
    { id:'sp1', title:'الوحدة الأولى: الثقة بالنفس',
      skills:['فهم رهبة المسرح وأسبابها','تقنيات التنفس والتهدئة','بناء الحضور الذهني قبل الإلقاء'],
      lesson:'رهبة المسرح استجابة طبيعية لا عيب فيها؛ الجسد يستنفر استعداداً للموقف. المتحدث المحترف لا يُلغيها بل يحوّلها طاقة. أول أدواتك: التنفس العميق البطيء (أربع ثوانٍ شهيق، أربع حبس، ستّ زفير) قبل الصعود بدقيقتين. ثانيها: الوصول مبكراً وتفقّد المكان لتألف المساحة. ثالثها: تثبيت النظر على ثلاث نقاط ودّية في الجمهور بدل مسح الوجوه كلها.',
      exercises:[
        { t:'تمرين التنفس الرباعي', d:'طبّق دورة التنفس (4-4-6) خمس مرات قبل أي عرض. سجّل شعورك قبل وبعد على مقياس 1-10.', time:'5 دقائق' },
        { t:'المرآة الصامتة', d:'قف أمام المرآة وتحدث دقيقتين عن يومك بلا توقف. لاحظ: أين تنظر؟ ماذا تفعل بيديك؟', time:'3 دقائق' },
        { t:'الجمهور المتدرّج', d:'ألقِ فقرتك أمام شخص واحد، ثم ثلاثة، ثم عشرة — على ثلاثة أيام متتالية.', time:'أسبوع' },
        { t:'إعادة التأطير', d:'اكتب ثلاث جمل تحوّل «أنا خائف» إلى «أنا متحمّس». استخدمها قبل كل إلقاء.', time:'10 دقائق' }
      ],
      quiz:[
        { q:'ما التفسير العلمي لرهبة المسرح؟', a:'استجابة طبيعية يستنفر فيها الجسد استعداداً للموقف', d:'easy',
          o:['استجابة طبيعية يستنفر فيها الجسد استعداداً للموقف','ضعف في الشخصية','قلة الذكاء','مرض نفسي يحتاج علاجاً'] },
        { q:'ما نمط التنفس المقترح قبل الإلقاء؟', a:'4 شهيق · 4 حبس · 6 زفير', d:'med',
          o:['4 شهيق · 4 حبس · 6 زفير','شهيق سريع متتابع','حبس النفس طويلاً','التنفس من الفم فقط'] },
        { q:'أين يثبّت المتحدث نظره في البداية؟', a:'على ثلاث نقاط ودّية في الجمهور', d:'med',
          o:['على ثلاث نقاط ودّية في الجمهور','على الأرض','على الشاشة خلفه','على شخص واحد طوال الوقت'] },
        { q:'ما الفائدة من الوصول مبكراً لمكان الإلقاء؟', a:'ألفة المكان تقلّل التوتر', d:'hard',
          o:['ألفة المكان تقلّل التوتر','إظهار الالتزام فقط','مقابلة المنظمين','اختيار مقعد مريح'] }
      ]},

    { id:'sp2', title:'الوحدة الثانية: لغة الجسد',
      skills:['الوقفة المتوازنة','حركة اليدين الهادفة','التواصل البصري الفعّال'],
      lesson:'جسدك يتحدث قبل لسانك. الوقفة المتوازنة: القدمان بعرض الكتفين، الوزن موزّع، الظهر مستقيم بلا تصنّع. اليدان أداة إيضاح لا أداة إخفاء — أخرجهما من الجيوب ولا تعقد ذراعيك. الحركة في المساحة تكون هادفة: انتقل عند الانتقال بين الأفكار لا عشوائياً. والتواصل البصري يمنح كل جزء من القاعة نصيبه ثلاث إلى خمس ثوانٍ.',
      exercises:[
        { t:'وقفة الجبل', d:'قف بوقفة متوازنة لمدة دقيقتين دون حركة. صوّر نفسك ولاحظ ثباتك.', time:'2 دقيقة' },
        { t:'اليدان تحكيان', d:'اشرح فكرة بلا كلام — بيديك فقط. اطلب من زميلك أن يخمّنها.', time:'5 دقائق' },
        { t:'خريطة النظر', d:'قسّم القاعة ذهنياً إلى ثلاث مناطق، ووزّع نظرك عليها بالتساوي أثناء الإلقاء.', time:'أثناء العرض' },
        { t:'الفيديو الصامت', d:'صوّر نفسك تلقي دقيقتين، ثم شاهدها بلا صوت. هل رسالتك واضحة من الجسد وحده؟', time:'10 دقائق' }
      ],
      quiz:[
        { q:'ما المسافة الصحيحة بين القدمين في الوقفة المتوازنة؟', a:'بعرض الكتفين', d:'easy',
          o:['بعرض الكتفين','متلاصقتان','متباعدتان جداً','قدم أمام أخرى'] },
        { q:'كم ثانية يستغرق التواصل البصري مع كل منطقة؟', a:'من ثلاث إلى خمس ثوانٍ', d:'med',
          o:['من ثلاث إلى خمس ثوانٍ','ثانية واحدة','عشرون ثانية','دقيقة كاملة'] },
        { q:'متى يتحرك المتحدث في المساحة؟', a:'عند الانتقال بين الأفكار', d:'hard',
          o:['عند الانتقال بين الأفكار','باستمرار بلا توقف','لا يتحرك إطلاقاً','عند شعوره بالملل'] },
        { q:'ما الخطأ الشائع في وضع اليدين؟', a:'إخفاؤهما في الجيوب أو عقد الذراعين', d:'easy',
          o:['إخفاؤهما في الجيوب أو عقد الذراعين','استخدامهما للإيضاح','تحريكهما مع الأفكار','فتح الكفين'] }
      ]},

    { id:'sp3', title:'الوحدة الثالثة: نبرات الصوت',
      skills:['التنويع في الطبقة','الوقفات المؤثرة','الإيقاع والسرعة'],
      lesson:'الصوت الرتيب يقتل أجمل المحتوى. ثلاث أدوات تصنع الفرق: التنويع في الطبقة (اخفض عند السرّ، ارفع عند الحماسة)، والوقفة الصامتة قبل الفكرة المهمة وبعدها — فالصمت يصنع ترقّباً أقوى من الصياح، والإيقاع المتغيّر (أبطئ عند الرقم والاسم المهم، أسرع عند السرد المألوف). واحرص على إنهاء الجملة بنبرة هابطة لا صاعدة، فالصاعدة تُشعر السامع بالتردد.',
      exercises:[
        { t:'الجملة بسبع نبرات', d:'قل «لم أقل ذلك» سبع مرات مع تشديد كلمة مختلفة كل مرة. لاحظ تغيّر المعنى.', time:'5 دقائق' },
        { t:'قوة الصمت', d:'ألقِ فقرة وضع وقفة ثانيتين قبل كل فكرة رئيسة. سجّل وقارن.', time:'6 دقائق' },
        { t:'قراءة الطبقات', d:'اقرأ نصاً بثلاث طبقات: همس، عادي، حماسي. سجّل الثلاث واختر الأنسب لكل مقطع.', time:'10 دقائق' },
        { t:'النهاية الهابطة', d:'سجّل عشر جمل وتأكد أن كل واحدة تنتهي بنبرة هابطة حازمة.', time:'7 دقائق' }
      ],
      quiz:[
        { q:'ما أثر الوقفة الصامتة قبل الفكرة المهمة؟', a:'تصنع ترقّباً وتلفت الانتباه', d:'easy',
          o:['تصنع ترقّباً وتلفت الانتباه','تُشعر الجمهور بالملل','تدل على النسيان','تضيّع الوقت'] },
        { q:'كيف تُنهى الجملة الحازمة؟', a:'بنبرة هابطة', d:'med',
          o:['بنبرة هابطة','بنبرة صاعدة','بصوت مرتفع','بصمت طويل'] },
        { q:'متى يُبطئ المتحدث إيقاعه؟', a:'عند الأرقام والأسماء المهمة', d:'med',
          o:['عند الأرقام والأسماء المهمة','في السرد المألوف','في المقدمة فقط','عند الخاتمة فقط'] },
        { q:'ما عيب الصوت الرتيب؟', a:'يفقد الجمهور تركيزه مهما كان المحتوى جيداً', d:'hard',
          o:['يفقد الجمهور تركيزه مهما كان المحتوى جيداً','يدل على الهدوء','يناسب كل المواضيع','يزيد الفهم'] }
      ]},

    { id:'sp4', title:'الوحدة الرابعة: بناء الخطاب',
      skills:['المقدمة الجاذبة','تنظيم الأفكار','الخاتمة المؤثرة'],
      lesson:'الخطاب المؤثر بناء لا كلام مرسل. المقدمة تملك عشر ثوانٍ لتكسب الجمهور: ابدأ بسؤال مثير أو قصة قصيرة أو رقم صادم — لا بـ«اليوم سأتحدث عن». الجسد ينظَّم في ثلاث نقاط لا أكثر، فالذاكرة تحتفظ بالثلاث ولا تحتفظ بالسبع. والخاتمة تعيد الفكرة المحورية في جملة واحدة تُحفظ، وتنتهي بدعوة واضحة للعمل.',
      exercises:[
        { t:'عشر ثوانٍ', d:'اكتب ثلاث مقدمات مختلفة لموضوع واحد: سؤال، قصة، رقم. جرّبها على زملائك.', time:'12 دقيقة' },
        { t:'قاعدة الثلاث', d:'لخّص موضوعاً في ثلاث نقاط فقط، وتدرّب على شرح كل نقطة في دقيقة.', time:'10 دقائق' },
        { t:'الجملة التي تُحفظ', d:'اصنع جملة ختامية واحدة قوية لموضوعك، واختبر: هل يتذكرها زميلك بعد يوم؟', time:'8 دقائق' },
        { t:'الخطاب الكامل', d:'ابنِ خطاباً من ثلاث دقائق بمقدمة وثلاث نقاط وخاتمة، وألقه مصوَّراً.', time:'20 دقيقة' }
      ],
      quiz:[
        { q:'كم ثانية تملك المقدمة لكسب الجمهور؟', a:'عشر ثوانٍ', d:'easy',
          o:['عشر ثوانٍ','دقيقتان','خمس دقائق','لا حدّ لها'] },
        { q:'كم نقطة رئيسة يُنصح بها في جسد الخطاب؟', a:'ثلاث', d:'easy',
          o:['ثلاث','سبع','عشر','واحدة'] },
        { q:'ما الافتتاحية الضعيفة؟', a:'«اليوم سأتحدث عن...»', d:'med',
          o:['«اليوم سأتحدث عن...»','سؤال مثير','قصة قصيرة','رقم صادم'] },
        { q:'بم تنتهي الخاتمة المؤثرة؟', a:'بدعوة واضحة للعمل', d:'hard',
          o:['بدعوة واضحة للعمل','بالاعتذار عن الإطالة','بتكرار كل النقاط','بسؤال مفتوح بلا إجابة'] }
      ]},

    { id:'sp5', title:'الوحدة الخامسة: الارتجال وإدارة الأسئلة',
      skills:['التفكير السريع المنظّم','التعامل مع السؤال الصعب','استعادة السيطرة عند التعثّر'],
      lesson:'الارتجال مهارة تُكتسب بقالب لا بموهبة. قالب «نقطة-سبب-مثال-خلاصة» ينقذك في أي موقف: اذكر رأيك، علّله، مثّل له، ثم اختم. وعند السؤال الصعب: أعد صياغته لتكسب وقتاً، وأجب بما تعرف بصدق، وقل «لا أعلم، سأبحث» عند الجهل — فالصدق أقوى من التخمين. وإن تعثّرت: توقف، تنفّس، وأعد الجملة الأخيرة — الجمهور أرحم مما تظن.',
      exercises:[
        { t:'قالب الأربع', d:'اطلب موضوعاً عشوائياً وتحدث دقيقة بقالب: نقطة، سبب، مثال، خلاصة.', time:'دقيقة لكل موضوع' },
        { t:'السؤال المباغت', d:'اطلب من زميلك ثلاثة أسئلة صعبة عن عرضك، وتدرّب على الإجابة بهدوء.', time:'10 دقائق' },
        { t:'التعافي من التعثّر', d:'تعمّد التوقف في منتصف فقرة، ثم تدرّب على استئنافها بثبات.', time:'5 دقائق' },
        { t:'الكلمة والصورة', d:'افتح صورة عشوائية وتحدث عنها دقيقتين مرتجلاً.', time:'يومياً' }
      ],
      quiz:[
        { q:'ما قالب الارتجال المقترح؟', a:'نقطة · سبب · مثال · خلاصة', d:'easy',
          o:['نقطة · سبب · مثال · خلاصة','مقدمة · خاتمة','سؤال · جواب','سرد متصل'] },
        { q:'ماذا تفعل عند سؤال لا تعرف إجابته؟', a:'تقول «لا أعلم، سأبحث»', d:'med',
          o:['تقول «لا أعلم، سأبحث»','تخمّن بثقة','تتجاهل السؤال','تغيّر الموضوع'] },
        { q:'ما فائدة إعادة صياغة السؤال الصعب؟', a:'كسب وقت للتفكير وضمان الفهم', d:'hard',
          o:['كسب وقت للتفكير وضمان الفهم','إحراج السائل','إطالة الوقت فقط','تجنّب الإجابة'] },
        { q:'كيف تتعافى عند التعثّر أثناء الإلقاء؟', a:'تتوقف وتتنفس وتعيد الجملة الأخيرة', d:'med',
          o:['تتوقف وتتنفس وتعيد الجملة الأخيرة','تعتذر وتنسحب','تسرع لتخفي الخطأ','تصمت طويلاً'] }
      ]},

    { id:'sp6', title:'الوحدة السادسة: الحضور والتأثير',
      skills:['بناء الكاريزما','قراءة الجمهور','الأثر بعد الإلقاء'],
      lesson:'الحضور ليس صخباً بل صدقاً وحضوراً ذهنياً كاملاً. الكاريزما تُبنى من ثلاثة: الشغف الظاهر بموضوعك، والاهتمام الصادق بجمهورك، والثبات الداخلي. اقرأ جمهورك أثناء الحديث: العيون الشاردة تعني أن تسرّع أو تغيّر الأسلوب، والإيماءات تعني أنك في الطريق الصحيح. والأثر الحقيقي يُقاس بما يفعله الجمهور بعد أن يغادر لا بتصفيقه.',
      exercises:[
        { t:'الشغف المرئي', d:'تحدث دقيقتين عن شيء تحبه فعلاً، وسجّل. قارنه بحديثك عن موضوع محايد.', time:'6 دقائق' },
        { t:'قراءة الوجوه', d:'أثناء إلقائك راقب ثلاثة أشخاص وسجّل بعدها: متى تفاعلوا؟ متى شردوا؟', time:'أثناء العرض' },
        { t:'الأثر المقاس', d:'اسأل ثلاثة من جمهورك بعد يوم: ما الذي بقي معك؟ قارن بما أردت إيصاله.', time:'يوم' },
        { t:'العرض الختامي', d:'قدّم عرضاً كاملاً من خمس دقائق أمام جمهور حقيقي مطبّقاً كل ما تعلمت.', time:'أسبوع تحضير' }
      ],
      quiz:[
        { q:'مِمَّ تُبنى الكاريزما؟', a:'الشغف والاهتمام بالجمهور والثبات الداخلي', d:'med',
          o:['الشغف والاهتمام بالجمهور والثبات الداخلي','الصوت المرتفع','الملابس الفاخرة','الحركة الكثيرة'] },
        { q:'ماذا تعني العيون الشاردة في الجمهور؟', a:'أن تسرّع أو تغيّر الأسلوب', d:'easy',
          o:['أن تسرّع أو تغيّر الأسلوب','أن تخفض صوتك','أن تنهي العرض فوراً','أن تعيد من البداية'] },
        { q:'بمَ يُقاس أثر المتحدث الحقيقي؟', a:'بما يفعله الجمهور بعد أن يغادر', d:'hard',
          o:['بما يفعله الجمهور بعد أن يغادر','بشدة التصفيق','بعدد الحضور','بطول العرض'] },
        { q:'ما جوهر الحضور القوي؟', a:'الصدق والحضور الذهني الكامل', d:'med',
          o:['الصدق والحضور الذهني الكامل','الصخب','الحفظ الحرفي','السرعة في الكلام'] }
      ]}
  ],

  rubric: [
    ['الثقة والحضور','ثبات الوقفة وقلة التوتر الظاهر'],
    ['لغة الجسد','توظيف اليدين والحركة والتواصل البصري'],
    ['الصوت','التنويع والوقفات ووضوح المخارج'],
    ['بناء المحتوى','مقدمة وجسد منظّم وخاتمة'],
    ['التفاعل','قراءة الجمهور وإدارة الأسئلة'],
    ['الأثر','وضوح الرسالة وبقاؤها في الذهن']
  ]
};

// ═══════════════════════════════════════════════════════════════════
// واجهة برنامج القائد المُلهِم + نظام صلاحية الوصول
// ═══════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════
// محرر برنامج القائد المُلهِم — تحرير كامل من لوحة التحكم
// ═══════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════
// دورات البرنامج — مواعيد · تسجيل أساسي · قائمة انتظار
// ═══════════════════════════════════════════════════════════════════
var _HH_COHORTS = [];   // [{id,title,start,end,days,time,venue,seats,mode,status}]
var _HH_MY_ENROLL = {}; // {cohortId: 'enrolled'|'waitlist'}

var HH_DAY_NAMES = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];

async function hhCohortsLoad(){
  // محلي أولاً للسرعة
  try{
    var raw=localStorage.getItem('hh_cohorts');
    if(raw) _HH_COHORTS=JSON.parse(raw)||[];
  }catch(e){}
  try{
    if(typeof firebase==='undefined' || !firebase.firestore) return _HH_COHORTS;
    var snap=await firebase.firestore().collection('program_cohorts')
      .where('program','==','speak_master').limit(30).get();
    var arr=[]; snap.forEach(function(d){ arr.push(Object.assign({id:d.id}, d.data())); });
    arr.sort(function(a,b){ return String(a.start||'').localeCompare(String(b.start||'')); });
    _HH_COHORTS=arr;
    try{ localStorage.setItem('hh_cohorts', JSON.stringify(arr)); }catch(e){}
    // تسجيلاتي
    if(typeof currentUser!=='undefined' && currentUser){
      var es=await firebase.firestore().collection('program_enrollments')
        .where('uid','==',currentUser.uid).limit(30).get();
      _HH_MY_ENROLL={};
      es.forEach(function(d){ var v=d.data(); _HH_MY_ENROLL[v.cohortId]=v.type; });
    }
  }catch(e){}
  return _HH_COHORTS;
}

function hhCohortSeatsLeft(C){
  var cap=parseInt(C.seats||0);
  var taken=parseInt(C.enrolled||0);
  return Math.max(0, cap-taken);
}
function hhCohortStatus(C){
  if(C.status==='closed') return 'مغلقة';
  if(C.status==='running') return 'جارية';
  if(C.status==='done') return 'منتهية';
  return hhCohortSeatsLeft(C)>0 ? 'التسجيل مفتوح' : 'مكتملة — قائمة انتظار';
}
function hhFmtDate(iso){
  if(!iso) return '';
  try{
    var d=new Date(iso+'T00:00:00');
    return d.toLocaleDateString('ar-QA',{year:'numeric',month:'long',day:'numeric'});
  }catch(e){ return iso; }
}

// ── عرض الدورات للمتدرب ──
function hhCohortsHTML(){
  if(!_HH_COHORTS.length){
    return '<div style="background:#FDF8EC;border:1.5px solid #E3D9C6;border-radius:12px;padding:16px;text-align:center;color:#8A6D2E;font-weight:800;font-size:.8rem;line-height:1.9;">'
      +'لم تُعلن مواعيد الدورات بعد.<br><span style="font-size:.73rem;color:#aaa;font-weight:700;">تابع المنصة — ستُفتح قريباً.</span></div>';
  }
  return _HH_COHORTS.map(function(C){
    var left=hhCohortSeatsLeft(C);
    var st=hhCohortStatus(C);
    var full=left<=0;
    var mine=_HH_MY_ENROLL[C.id];
    var col = mine==='enrolled' ? '#3D6B53' : mine==='waitlist' ? '#b5801f' : full ? '#c0392b' : '#1F4E79';
    var days=(C.days||[]).map(function(d){ return HH_DAY_NAMES[d]||''; }).filter(Boolean).join(' · ');
    return '<div style="background:#fff;border:1.5px solid #E3D9C6;border-right:4px solid '+col+';border-radius:13px;padding:13px 15px;margin-bottom:9px;">'
      +'<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:9px;flex-wrap:wrap;margin-bottom:7px;">'
      +'<div style="flex:1;min-width:0;">'
      +'<div style="font-weight:900;font-size:.88rem;color:'+col+';">'+esc(C.title||'دورة')+'</div>'
      +'<div style="font-size:.73rem;color:#888;font-weight:700;margin-top:3px;">'
      + esc(hhFmtDate(C.start)) + (C.end? ' — ' + esc(hhFmtDate(C.end)) : '') +'</div></div>'
      +'<span style="background:'+col+';color:#fff;border-radius:8px;padding:3px 10px;font-size:.64rem;font-weight:900;white-space:nowrap;">'+esc(st)+'</span>'
      +'</div>'
      +'<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:6px;font-size:.73rem;color:#666;font-weight:700;margin-bottom:9px;">'
      + (days? '<div>الأيام: <b style="color:#5E0E26;">'+esc(days)+'</b></div>':'')
      + (C.time? '<div>التوقيت: <b style="color:#5E0E26;">'+esc(C.time)+'</b></div>':'')
      + (C.venue? '<div>المكان: <b style="color:#5E0E26;">'+esc(C.venue)+'</b></div>':'')
      + (C.mode? '<div>النمط: <b style="color:#5E0E26;">'+esc(C.mode)+'</b></div>':'')
      +'</div>'
      +'<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">'
      +'<div style="font-size:.72rem;color:#888;font-weight:800;">'
      + (C.seats? ('المقاعد: '+(C.enrolled||0)+' / '+C.seats + (left>0? ' · <span style="color:#3D6B53;">'+left+' متاح</span>' : ' · <span style="color:#c0392b;">مكتملة</span>')) : '')
      + (C.waitlist? ' · <span style="color:#b5801f;">'+C.waitlist+' بالانتظار</span>' : '')
      +'</div>'
      + (mine
         ? '<span style="background:'+col+';color:#fff;border-radius:9px;padding:6px 14px;font-size:.72rem;font-weight:900;">'
           + (mine==='enrolled'?'أنت مسجّل':'أنت في قائمة الانتظار') +'</span>'
         : (C.status==='closed'||C.status==='done'
            ? '<span style="font-size:.72rem;color:#aaa;font-weight:800;">التسجيل مغلق</span>'
            : (full
               ? '<button onclick="hhEnroll(\''+C.id+'\',\'waitlist\')" style="background:linear-gradient(135deg,#b5801f,#8A6D2E);color:#fff;border:none;border-radius:10px;padding:8px 18px;font-family:Cairo;font-weight:900;font-size:.76rem;cursor:pointer;">انضم لقائمة الانتظار</button>'
               : '<button onclick="hhEnroll(\''+C.id+'\',\'enrolled\')" style="background:linear-gradient(135deg,#3D6B53,#274a38);color:#fff;border:none;border-radius:10px;padding:8px 20px;font-family:Cairo;font-weight:900;font-size:.76rem;cursor:pointer;">تسجيل أساسي</button>')))
      +'</div></div>';
  }).join('');
}

// ── التسجيل ──
async function hhEnroll(cohortId, type){
  if(typeof currentUser==='undefined' || !currentUser){
    if(typeof toast==='function') toast('سجّل الدخول أولاً','warn'); return;
  }
  var C=_HH_COHORTS.filter(function(x){return x.id===cohortId;})[0];
  if(!C) return;
  try{
    var db=firebase.firestore();
    // منع التكرار
    var ex=await db.collection('program_enrollments')
      .where('uid','==',currentUser.uid).where('cohortId','==',cohortId).limit(1).get();
    if(!ex.empty){ if(typeof toast==='function') toast('أنت مسجّل في هذه الدورة','info'); return; }

    await db.collection('program_enrollments').add({
      program:'speak_master', cohortId:cohortId, cohortTitle:C.title||'',
      uid:currentUser.uid, email:currentUser.email||'', name:currentUser.displayName||'',
      type:type, status:'pending', createdAt:new Date().toISOString()
    });
    // تحديث العداد
    var ref=db.collection('program_cohorts').doc(cohortId);
    if(type==='enrolled') await ref.update({ enrolled: firebase.firestore.FieldValue.increment(1) });
    else await ref.update({ waitlist: firebase.firestore.FieldValue.increment(1) });

    _HH_MY_ENROLL[cohortId]=type;
    if(type==='enrolled') C.enrolled=(C.enrolled||0)+1; else C.waitlist=(C.waitlist||0)+1;
    if(typeof toast==='function') toast(type==='enrolled'?'سُجّلت في الدورة':'أُضفت لقائمة الانتظار','success');
    if(typeof hhLogActivity==='function') hhLogActivity('generate','تسجيل دورة: '+(C.title||''));
    hhSpkCheckAccess().then(function(h){ hhSpkRender(h); });
  }catch(e){
    if(typeof toast==='function') toast('تعذر التسجيل','error');
  }
}

// ── إدارة الدورات (أدمن) ──
async function hhCohortsAdmin(){
  if(!(typeof hhIsAdmin==='function' && hhIsAdmin())){
    if(typeof toast==='function') toast('إدارة الدورات صلاحية إدارية','error'); return;
  }
  await hhCohortsLoad();
  var dayBoxes=HH_DAY_NAMES.map(function(n,i){
    return '<label style="display:inline-flex;align-items:center;gap:4px;background:#fff;border:1.5px solid #E3D9C6;border-radius:8px;padding:4px 9px;margin:0 4px 5px 0;cursor:pointer;font-size:.73rem;font-weight:800;">'
      +'<input type="checkbox" class="coh-day" value="'+i+'" style="width:15px;height:15px;accent-color:#1F4E79;cursor:pointer;">'+esc(n)+'</label>';
  }).join('');
  var list=_HH_COHORTS.map(function(C){
    return '<div style="background:#fff;border:1.5px solid #E3D9C6;border-radius:11px;padding:11px 13px;margin-bottom:7px;">'
      +'<div style="display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap;">'
      +'<div style="flex:1;min-width:0;"><div style="font-weight:900;font-size:.82rem;color:#1F4E79;">'+esc(C.title||'')+'</div>'
      +'<div style="font-size:.7rem;color:#888;">'+esc(hhFmtDate(C.start))+' · '+esc(C.time||'')+' · '
      + (C.enrolled||0)+'/'+(C.seats||0)+' مسجّل · '+(C.waitlist||0)+' انتظار</div></div>'
      +'<div style="display:flex;gap:5px;flex-wrap:wrap;">'
      +'<button onclick="hhCohortRoster(\''+C.id+'\')" style="background:#E9EEF8;color:#1F4E79;border:1px solid #1F4E79;border-radius:7px;padding:4px 10px;font-family:Cairo;font-weight:900;font-size:.66rem;cursor:pointer;">المسجّلون</button>'
      +'<button onclick="hhCohortDelete(\''+C.id+'\')" style="background:#fff;color:#c0392b;border:1px solid #e0c0c0;border-radius:7px;padding:4px 10px;font-family:Cairo;font-weight:900;font-size:.66rem;cursor:pointer;">حذف</button>'
      +'</div></div></div>';
  }).join('');

  var html='<div style="background:#fff;border:1.5px solid #C9B37E;border-radius:12px;padding:13px;margin-bottom:13px;">'
    +'<div style="font-weight:900;font-size:.85rem;color:#1F4E79;margin-bottom:9px;">دورة جديدة</div>'
    +'<input id="coh-title" placeholder="اسم الدورة (الدفعة الأولى — خريف 2026)" style="width:100%;border:1.5px solid #E3D9C6;border-radius:9px;padding:8px 11px;font-family:Cairo;font-size:.8rem;box-sizing:border-box;margin-bottom:8px;">'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">'
    +'<div><div style="font-size:.72rem;font-weight:800;color:#8A6D2E;margin-bottom:3px;">تاريخ البداية</div>'
    +'<input id="coh-start" type="date" style="width:100%;border:1.5px solid #E3D9C6;border-radius:9px;padding:8px;font-family:Cairo;font-size:.8rem;box-sizing:border-box;"></div>'
    +'<div><div style="font-size:.72rem;font-weight:800;color:#8A6D2E;margin-bottom:3px;">تاريخ النهاية</div>'
    +'<input id="coh-end" type="date" style="width:100%;border:1.5px solid #E3D9C6;border-radius:9px;padding:8px;font-family:Cairo;font-size:.8rem;box-sizing:border-box;"></div>'
    +'</div>'
    +'<div style="font-size:.72rem;font-weight:800;color:#8A6D2E;margin-bottom:4px;">أيام الأسبوع</div>'
    +'<div style="margin-bottom:8px;">'+dayBoxes+'</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">'
    +'<input id="coh-time" placeholder="التوقيت (4:00 — 6:00 مساءً)" style="border:1.5px solid #E3D9C6;border-radius:9px;padding:8px 11px;font-family:Cairo;font-size:.8rem;box-sizing:border-box;">'
    +'<input id="coh-venue" placeholder="المكان (قاعة المركز)" style="border:1.5px solid #E3D9C6;border-radius:9px;padding:8px 11px;font-family:Cairo;font-size:.8rem;box-sizing:border-box;">'
    +'<input id="coh-seats" type="number" min="1" placeholder="عدد المقاعد" style="border:1.5px solid #E3D9C6;border-radius:9px;padding:8px 11px;font-family:Cairo;font-size:.8rem;box-sizing:border-box;">'
    +'<select id="coh-mode" style="border:1.5px solid #E3D9C6;border-radius:9px;padding:8px;font-family:Cairo;font-size:.8rem;box-sizing:border-box;">'
    +'<option>حضوري</option><option>عن بُعد</option><option>مدمج</option></select>'
    +'</div>'
    +'<button onclick="hhCohortAdd()" style="background:linear-gradient(135deg,#1F4E79,#12304d);color:#fff;border:none;border-radius:10px;padding:9px 22px;font-family:Cairo;font-weight:900;font-size:.82rem;cursor:pointer;">إضافة الدورة</button>'
    +'</div>'
    +'<div style="font-weight:900;font-size:.85rem;color:#1F4E79;margin-bottom:7px;">الدورات المعلنة ('+_HH_COHORTS.length+')</div>'
    + (list || '<div style="color:#999;font-size:.78rem;text-align:center;padding:14px;">لا دورات بعد</div>');
  if(typeof hhSchModal==='function') hhSchModal('إدارة دورات البرنامج', html, '#1F4E79');
}

async function hhCohortAdd(){
  var v=function(id){ var e=document.getElementById(id); return e? e.value.trim():''; };
  var title=v('coh-title'), start=v('coh-start');
  if(!title || !start){ if(typeof toast==='function') toast('اكتب اسم الدورة وتاريخ البداية','warn'); return; }
  var days=[].slice.call(document.querySelectorAll('.coh-day:checked')).map(function(c){return parseInt(c.value);});
  try{
    await firebase.firestore().collection('program_cohorts').add({
      program:'speak_master', title:title, start:start, end:v('coh-end'),
      days:days, time:v('coh-time'), venue:v('coh-venue'),
      seats:parseInt(v('coh-seats'))||20, mode:v('coh-mode')||'حضوري',
      enrolled:0, waitlist:0, status:'open',
      createdBy:currentUser.email, createdAt:new Date().toISOString()
    });
    if(typeof toast==='function') toast('أُضيفت الدورة','success');
    hhCohortsAdmin();
  }catch(e){ if(typeof toast==='function') toast('تعذرت الإضافة','error'); }
}
async function hhCohortDelete(id){
  if(!confirm('حذف هذه الدورة وكل تسجيلاتها؟')) return;
  try{
    await firebase.firestore().collection('program_cohorts').doc(id).delete();
    if(typeof toast==='function') toast('حُذفت الدورة','info');
    hhCohortsAdmin();
  }catch(e){}
}
async function hhCohortRoster(id){
  try{
    var snap=await firebase.firestore().collection('program_enrollments')
      .where('cohortId','==',id).limit(200).get();
    var enr=[], wait=[];
    snap.forEach(function(d){ var v=Object.assign({id:d.id}, d.data());
      (v.type==='waitlist'? wait : enr).push(v); });
    var row=function(v,isWait){
      return '<tr style="background:#fff;"><td style="padding:6px 9px;font-weight:800;font-size:.76rem;">'+esc(v.name||v.email||'')+'</td>'
        +'<td style="padding:6px;font-size:.7rem;color:#888;">'+esc(v.email||'')+'</td>'
        +'<td style="padding:6px;text-align:center;font-size:.68rem;color:#aaa;">'+esc((v.createdAt||'').slice(0,10))+'</td>'
        + (isWait? '<td style="padding:4px;text-align:center;"><button onclick="hhPromoteWait(\''+v.id+'\',\''+id+'\')" style="background:#3D6B53;color:#fff;border:none;border-radius:7px;padding:3px 10px;font-family:Cairo;font-weight:900;font-size:.65rem;cursor:pointer;">ترقية</button></td>' : '<td></td>')
        +'</tr>';
    };
    var html='<div style="font-weight:900;font-size:.84rem;color:#3D6B53;margin-bottom:6px;">المسجّلون ('+enr.length+')</div>'
      + (enr.length? '<table style="width:100%;border-collapse:collapse;margin-bottom:14px;"><tbody>'+enr.map(function(v){return row(v,false);}).join('')+'</tbody></table>'
         : '<div style="color:#999;font-size:.76rem;margin-bottom:12px;">لا مسجّلين</div>')
      +'<div style="font-weight:900;font-size:.84rem;color:#b5801f;margin-bottom:6px;">قائمة الانتظار ('+wait.length+')</div>'
      + (wait.length? '<table style="width:100%;border-collapse:collapse;"><tbody>'+wait.map(function(v){return row(v,true);}).join('')+'</tbody></table>'
         : '<div style="color:#999;font-size:.76rem;">لا أحد بالانتظار</div>')
      +'<button onclick="hhRosterCSV(\''+id+'\')" style="width:100%;background:#EBF2EE;color:#3D6B53;border:1.5px solid #3D6B53;border-radius:10px;padding:9px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;margin-top:12px;">تصدير القائمة CSV</button>';
    window._hhRoster={enr:enr, wait:wait};
    if(typeof hhSchModal==='function') hhSchModal('قائمة الدورة', html, '#1F4E79');
  }catch(e){ if(typeof toast==='function') toast('تعذر التحميل','error'); }
}
async function hhPromoteWait(enrollId, cohortId){
  try{
    var db=firebase.firestore();
    await db.collection('program_enrollments').doc(enrollId).update({ type:'enrolled', promotedAt:new Date().toISOString() });
    await db.collection('program_cohorts').doc(cohortId).update({
      enrolled: firebase.firestore.FieldValue.increment(1),
      waitlist: firebase.firestore.FieldValue.increment(-1)
    });
    if(typeof toast==='function') toast('رُقّي إلى التسجيل الأساسي','success');
    hhCohortRoster(cohortId);
  }catch(e){ if(typeof toast==='function') toast('تعذرت الترقية','error'); }
}
function hhRosterCSV(){
  var R=window._hhRoster; if(!R) return;
  var rows=[['النوع','الاسم','البريد','تاريخ التسجيل']];
  R.enr.forEach(function(v){ rows.push(['مسجّل', v.name||'', v.email||'', (v.createdAt||'').slice(0,10)]); });
  R.wait.forEach(function(v){ rows.push(['انتظار', v.name||'', v.email||'', (v.createdAt||'').slice(0,10)]); });
  var csv=rows.map(function(r){return r.map(function(c){return '"'+String(c).replace(/"/g,'""')+'"';}).join(',');}).join('\n');
  var bl=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'});
  var a=document.createElement('a'); a.href=URL.createObjectURL(bl);
  a.download='cohort_roster.csv'; a.click();
}

var _HH_SPK_OVR_KEY = 'hh_speak_override';

// تحميل التجاوزات ودمجها مع الأصل
function hhSpkLoadOverride(){
  try{
    var raw=localStorage.getItem(_HH_SPK_OVR_KEY);
    if(raw){ var d=JSON.parse(raw); if(d) hhSpkApplyOverride(d); }
  }catch(e){}
  // السحابة هي المصدر الموثوق
  try{
    if(typeof firebase!=='undefined' && firebase.firestore){
      firebase.firestore().collection('platform_settings').doc('speak_program').get()
        .then(function(doc){
          if(doc.exists && doc.data().data){
            var d=doc.data().data;
            hhSpkApplyOverride(d);
            try{ localStorage.setItem(_HH_SPK_OVR_KEY, JSON.stringify(d)); }catch(e){}
          }
        }).catch(function(){});
    }
  }catch(e){}
}
function hhSpkApplyOverride(d){
  if(!d || typeof HH_SPEAK_PROGRAM==='undefined') return;
  ['name','subtitle','tagline','overview','duration','level','currency','color','dark','accent'].forEach(function(k){
    if(typeof d[k]==='string' && d[k].trim()) HH_SPEAK_PROGRAM[k]=d[k];
  });
  if(typeof d.price==='number' && d.price>=0) HH_SPEAK_PROGRAM.price=d.price;
  if(Array.isArray(d.goals) && d.goals.length) HH_SPEAK_PROGRAM.goals=d.goals;
  if(Array.isArray(d.rubric) && d.rubric.length) HH_SPEAK_PROGRAM.rubric=d.rubric;
  if(Array.isArray(d.units) && d.units.length) HH_SPEAK_PROGRAM.units=d.units;
}
setTimeout(hhSpkLoadOverride, 1200);

// حفظ التعديلات
async function hhSpkSaveOverride(){
  if(!(typeof hhIsAdmin==='function' && hhIsAdmin())){
    if(typeof toast==='function') toast('التعديل صلاحية إدارية','error'); return false;
  }
  var payload={
    name:HH_SPEAK_PROGRAM.name, subtitle:HH_SPEAK_PROGRAM.subtitle,
    tagline:HH_SPEAK_PROGRAM.tagline, overview:HH_SPEAK_PROGRAM.overview,
    duration:HH_SPEAK_PROGRAM.duration, level:HH_SPEAK_PROGRAM.level,
    price:HH_SPEAK_PROGRAM.price, currency:HH_SPEAK_PROGRAM.currency,
    color:HH_SPEAK_PROGRAM.color, dark:HH_SPEAK_PROGRAM.dark, accent:HH_SPEAK_PROGRAM.accent,
    goals:HH_SPEAK_PROGRAM.goals, rubric:HH_SPEAK_PROGRAM.rubric, units:HH_SPEAK_PROGRAM.units
  };
  try{ localStorage.setItem(_HH_SPK_OVR_KEY, JSON.stringify(payload)); }catch(e){}
  try{
    var s=JSON.stringify(payload);
    if(s.length > 900*1024){
      if(typeof toast==='function') toast('حجم البرنامج كبير جداً — اختصر النصوص','error');
      return false;
    }
    await firebase.firestore().collection('platform_settings').doc('speak_program')
      .set({ data:payload, updatedBy:currentUser.email, updatedAt:new Date().toISOString() }, {merge:true});
    if(typeof toast==='function') toast('حُفظ البرنامج سحابياً','success');
    return true;
  }catch(e){
    if(typeof toast==='function') toast('حُفظ محلياً — تعذرت المزامنة','warn');
    return false;
  }
}

// ── المحرر الرئيس ──
function hhSpkEditor(){
  if(!(typeof hhIsAdmin==='function' && hhIsAdmin())){
    if(typeof toast==='function') toast('التعديل صلاحية إدارية فقط','error'); return;
  }
  var P=HH_SPEAK_PROGRAM;
  var old=document.getElementById('hh-spk-ed'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-spk-ed';
  ov.style.cssText='position:fixed;inset:0;background:rgba(30,6,15,.8);z-index:999998;display:flex;align-items:flex-start;justify-content:center;padding:16px;overflow-y:auto;direction:rtl;font-family:Cairo,Tajawal,sans-serif;';
  var inp=function(id,label,val,type){
    return '<div style="margin-bottom:9px;"><div style="font-size:.74rem;font-weight:800;color:#8A6D2E;margin-bottom:3px;">'+esc(label)+'</div>'
      +'<input id="'+id+'" type="'+(type||'text')+'" value="'+esc(String(val==null?'':val))+'" style="width:100%;border:1.5px solid #E3D9C6;border-radius:9px;padding:8px 11px;font-family:Cairo;font-size:.82rem;box-sizing:border-box;"></div>';
  };
  var ta=function(id,label,val,rows){
    return '<div style="margin-bottom:9px;"><div style="font-size:.74rem;font-weight:800;color:#8A6D2E;margin-bottom:3px;">'+esc(label)+'</div>'
      +'<textarea id="'+id+'" rows="'+(rows||3)+'" style="width:100%;border:1.5px solid #E3D9C6;border-radius:9px;padding:8px 11px;font-family:Cairo;font-size:.82rem;line-height:1.9;box-sizing:border-box;resize:vertical;">'+esc(String(val==null?'':val))+'</textarea></div>';
  };

  ov.innerHTML='<div style="background:#FAFBFD;border:2px solid #1F4E79;border-radius:20px;max-width:720px;width:100%;overflow:hidden;margin-bottom:24px;">'
    +'<div style="background:linear-gradient(135deg,#1F4E79,#12304d);color:#fff;padding:15px 18px;display:flex;justify-content:space-between;align-items:center;">'
    +'<div><div style="font-weight:900;font-size:1rem;">محرر البرنامج</div>'
    +'<div style="font-size:.73rem;opacity:.85;margin-top:2px;">عدّل كل شيء — يُحفظ سحابياً ويسري على الجميع</div></div>'
    +'<button onclick="hhSpkCloseEd()" style="background:none;border:none;color:#fff;font-size:1.15rem;cursor:pointer;">✕</button></div>'
    +'<div style="padding:16px 18px;">'
    // تبويبات
    +'<div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap;">'
    +'<button onclick="hhSpkEdTab(\'info\')" id="sped-info" style="flex:1;min-width:78px;background:#1F4E79;color:#fff;border:none;border-radius:9px;padding:8px;font-family:Cairo;font-weight:900;font-size:.76rem;cursor:pointer;">الأساسيات</button>'
    +'<button onclick="hhSpkEdTab(\'goals\')" id="sped-goals" style="flex:1;min-width:78px;background:#fff;color:#8A6D2E;border:1.5px solid #B8924A;border-radius:9px;padding:8px;font-family:Cairo;font-weight:900;font-size:.76rem;cursor:pointer;">الأهداف</button>'
    +'<button onclick="hhSpkEdTab(\'units\')" id="sped-units" style="flex:1;min-width:78px;background:#fff;color:#8A1538;border:1.5px solid #8A1538;border-radius:9px;padding:8px;font-family:Cairo;font-weight:900;font-size:.76rem;cursor:pointer;">الوحدات</button>'
    +'<button onclick="hhSpkEdTab(\'rubric\')" id="sped-rubric" style="flex:1;min-width:78px;background:#fff;color:#3D6B53;border:1.5px solid #3D6B53;border-radius:9px;padding:8px;font-family:Cairo;font-weight:900;font-size:.76rem;cursor:pointer;">المعايير</button>'
    +'</div>'
    +'<div id="sped-body"></div>'
    +'<div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap;border-top:1.5px solid #E3D9C6;padding-top:13px;">'
    +'<button onclick="hhSpkApplyAll()" style="flex:1;min-width:140px;background:linear-gradient(135deg,#3D6B53,#274a38);color:#fff;border:none;border-radius:11px;padding:11px;font-family:Cairo;font-weight:900;font-size:.85rem;cursor:pointer;">حفظ كل التعديلات</button>'
    +'<button onclick="hhSpkExportJSON()" style="background:#E9EEF8;color:#1F4E79;border:1.5px solid #1F4E79;border-radius:11px;padding:11px 16px;font-family:Cairo;font-weight:900;font-size:.82rem;cursor:pointer;">تصدير</button>'
    +'<button onclick="hhSpkImportJSON()" style="background:#FDF3DD;color:#8A6D2E;border:1.5px solid #B8924A;border-radius:11px;padding:11px 16px;font-family:Cairo;font-weight:900;font-size:.82rem;cursor:pointer;">استيراد</button>'
    +'<button onclick="hhSpkResetOverride()" style="background:#fff;color:#c0392b;border:1.5px solid #e0c0c0;border-radius:11px;padding:11px 16px;font-family:Cairo;font-weight:900;font-size:.82rem;cursor:pointer;">استعادة الأصل</button>'
    +'</div></div></div>';
  document.body.appendChild(ov);
  window._hhSpkInp=inp; window._hhSpkTa=ta;
  hhSpkEdTab('info');
}
function hhSpkCloseEd(){ var e=document.getElementById('hh-spk-ed'); if(e) e.remove(); }

function hhSpkEdTab(t){
  ['info','goals','units','rubric'].forEach(function(k){
    var b=document.getElementById('sped-'+k); if(!b) return;
    var on=(k===t);
    var col=k==='info'?'#1F4E79':k==='goals'?'#8A6D2E':k==='units'?'#8A1538':'#3D6B53';
    b.style.background=on?col:'#fff'; b.style.color=on?'#fff':col;
    b.style.border=on?'none':'1.5px solid '+col;
  });
  var body=document.getElementById('sped-body'); if(!body) return;
  var P=HH_SPEAK_PROGRAM, inp=window._hhSpkInp, ta=window._hhSpkTa;

  if(t==='info'){
    body.innerHTML = inp('spe-name','اسم البرنامج',P.name)
      + inp('spe-sub','العنوان الفرعي',P.subtitle)
      + inp('spe-tag','الشعار',P.tagline)
      + ta('spe-ov','نظرة عامة',P.overview,4)
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;">'
      + inp('spe-price','السعر',P.price,'number')
      + inp('spe-cur','العملة',P.currency)
      + inp('spe-dur','مدة/حجم البرنامج',P.duration)
      + inp('spe-lvl','الفئة المستهدفة',P.level)
      + '</div>'
      + '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px;">'
      + inp('spe-c1','اللون الأساسي',P.color)
      + inp('spe-c2','اللون الغامق',P.dark)
      + inp('spe-c3','لون التمييز',P.accent)
      + '</div>';
  }
  else if(t==='goals'){
    body.innerHTML='<div style="font-size:.76rem;color:#888;margin-bottom:9px;line-height:1.8;">هدف في كل سطر. أضف أو احذف بحرية.</div>'
      + ta('spe-goals','أهداف البرنامج', P.goals.join('\n'), Math.max(6,P.goals.length+1));
  }
  else if(t==='rubric'){
    body.innerHTML='<div style="font-size:.76rem;color:#888;margin-bottom:9px;line-height:1.8;">سطر لكل معيار بالصيغة: المعيار | الوصف</div>'
      + ta('spe-rubric','معايير التقييم', P.rubric.map(function(r){return r[0]+' | '+r[1];}).join('\n'), Math.max(6,P.rubric.length+1));
  }
  else {
    var list=P.units.map(function(U,i){
      return '<div style="background:#fff;border:1.5px solid #E3D9C6;border-right:4px solid #8A1538;border-radius:12px;padding:12px 14px;margin-bottom:8px;">'
        +'<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">'
        +'<div style="flex:1;min-width:0;"><div style="font-weight:900;font-size:.84rem;color:#5E0E26;">'+esc(U.title)+'</div>'
        +'<div style="font-size:.7rem;color:#999;margin-top:2px;">'+U.skills.length+' مهارات · '+U.exercises.length+' تمارين · '+U.quiz.length+' أسئلة</div></div>'
        +'<div style="display:flex;gap:5px;flex-wrap:wrap;">'
        +'<button onclick="hhSpkEditUnit('+i+')" style="background:#8A1538;color:#fff;border:none;border-radius:8px;padding:5px 12px;font-family:Cairo;font-weight:900;font-size:.68rem;cursor:pointer;">تحرير</button>'
        +'<button onclick="hhSpkDelUnit('+i+')" style="background:#fff;color:#c0392b;border:1px solid #e0c0c0;border-radius:8px;padding:5px 11px;font-family:Cairo;font-weight:900;font-size:.68rem;cursor:pointer;">حذف</button>'
        +'</div></div></div>';
    }).join('');
    body.innerHTML = list
      +'<button onclick="hhSpkAddUnit()" style="width:100%;background:#FDF3DD;color:#8A6D2E;border:1.5px dashed #B8924A;border-radius:11px;padding:11px;font-family:Cairo;font-weight:900;font-size:.82rem;cursor:pointer;">+ إضافة وحدة جديدة</button>';
  }
}

// ── تحرير وحدة ──
function hhSpkEditUnit(i){
  var U=HH_SPEAK_PROGRAM.units[i]; if(!U) return;
  var g=function(v){ return esc(String(v==null?'':v)); };
  var html='<div style="font-size:.74rem;font-weight:800;color:#8A6D2E;margin-bottom:3px;">عنوان الوحدة</div>'
    +'<input id="spu-title" value="'+g(U.title)+'" style="width:100%;border:1.5px solid #E3D9C6;border-radius:9px;padding:8px 11px;font-family:Cairo;font-size:.82rem;box-sizing:border-box;margin-bottom:9px;">'
    +'<div style="font-size:.74rem;font-weight:800;color:#8A6D2E;margin-bottom:3px;">المهارات (سطر لكل مهارة)</div>'
    +'<textarea id="spu-skills" rows="3" style="width:100%;border:1.5px solid #E3D9C6;border-radius:9px;padding:8px 11px;font-family:Cairo;font-size:.82rem;box-sizing:border-box;margin-bottom:9px;">'+g(U.skills.join('\n'))+'</textarea>'
    +'<div style="font-size:.74rem;font-weight:800;color:#8A6D2E;margin-bottom:3px;">نص الدرس</div>'
    +'<textarea id="spu-lesson" rows="6" style="width:100%;border:1.5px solid #E3D9C6;border-radius:9px;padding:8px 11px;font-family:Cairo;font-size:.82rem;line-height:1.9;box-sizing:border-box;margin-bottom:9px;">'+g(U.lesson)+'</textarea>'
    +'<div style="font-size:.74rem;font-weight:800;color:#8A6D2E;margin-bottom:3px;">التمارين — سطر لكل تمرين بالصيغة: العنوان | الوصف | الزمن</div>'
    +'<textarea id="spu-ex" rows="5" style="width:100%;border:1.5px solid #E3D9C6;border-radius:9px;padding:8px 11px;font-family:Cairo;font-size:.8rem;box-sizing:border-box;margin-bottom:9px;">'
    + g(U.exercises.map(function(e){return e.t+' | '+e.d+' | '+e.time;}).join('\n')) +'</textarea>'
    +'<div style="font-size:.74rem;font-weight:800;color:#8A6D2E;margin-bottom:3px;">الأسئلة — سطر لكل سؤال: السؤال | الإجابة | المستوى | خيار٬خيار٬خيار</div>'
    +'<div style="font-size:.68rem;color:#aaa;margin-bottom:3px;">المستوى: easy أو med أو hard · الخيارات مفصولة بفاصلة والإجابة تُضاف تلقائياً</div>'
    +'<textarea id="spu-q" rows="6" style="width:100%;border:1.5px solid #E3D9C6;border-radius:9px;padding:8px 11px;font-family:Cairo;font-size:.78rem;box-sizing:border-box;margin-bottom:11px;">'
    + g(U.quiz.map(function(q){
        var others=(q.o||[]).filter(function(o){return o!==q.a;});
        return q.q+' | '+q.a+' | '+(q.d||'med')+' | '+others.join('،');
      }).join('\n')) +'</textarea>'
    +'<button onclick="hhSpkSaveUnit('+i+')" style="width:100%;background:linear-gradient(135deg,#8A1538,#5E0E26);color:#fff;border:none;border-radius:11px;padding:10px;font-family:Cairo;font-weight:900;font-size:.84rem;cursor:pointer;">حفظ الوحدة</button>';
  if(typeof hhSchModal==='function') hhSchModal('تحرير: '+U.title, html, '#8A1538');
}
function hhSpkSaveUnit(i){
  var U=HH_SPEAK_PROGRAM.units[i]; if(!U) return;
  var v=function(id){ var e=document.getElementById(id); return e? e.value:''; };
  U.title=v('spu-title').trim()||U.title;
  U.skills=v('spu-skills').split('\n').map(function(x){return x.trim();}).filter(Boolean);
  U.lesson=v('spu-lesson').trim();
  U.exercises=v('spu-ex').split('\n').map(function(l){
    var p=l.split('|').map(function(x){return x.trim();});
    return p[0] ? {t:p[0], d:p[1]||'', time:p[2]||''} : null;
  }).filter(Boolean);
  U.quiz=v('spu-q').split('\n').map(function(l){
    var p=l.split('|').map(function(x){return x.trim();});
    if(!p[0]||!p[1]) return null;
    var others=(p[3]||'').split(/[،,]/).map(function(x){return x.trim();}).filter(Boolean);
    return { q:p[0], a:p[1], d:(p[2]||'med'), o:[p[1]].concat(others) };
  }).filter(Boolean);
  var m=document.getElementById('hh-sch-modal'); if(m) m.remove();
  hhSpkEdTab('units');
  if(typeof toast==='function') toast('حُدّثت الوحدة — اضغط «حفظ كل التعديلات»','info');
}
function hhSpkAddUnit(){
  var n=HH_SPEAK_PROGRAM.units.length+1;
  HH_SPEAK_PROGRAM.units.push({
    id:'sp_new'+Date.now().toString(36).slice(-4),
    title:'الوحدة '+n+': عنوان جديد',
    skills:['مهارة أولى'], lesson:'اكتب نص الدرس هنا.',
    exercises:[{t:'تمرين أول', d:'وصف التمرين', time:'5 دقائق'}],
    quiz:[{q:'سؤال؟', a:'الإجابة', d:'easy', o:['الإجابة','خيار','خيار','خيار']}]
  });
  hhSpkEdTab('units');
}
function hhSpkDelUnit(i){
  if(!confirm('حذف هذه الوحدة نهائياً؟')) return;
  HH_SPEAK_PROGRAM.units.splice(i,1);
  hhSpkEdTab('units');
}

// ── حفظ كل التعديلات ──
async function hhSpkApplyAll(){
  var v=function(id){ var e=document.getElementById(id); return e? e.value:null; };
  var P=HH_SPEAK_PROGRAM;
  // الأساسيات (إن كان التبويب مفتوحاً)
  if(v('spe-name')!==null){
    P.name=(v('spe-name')||'').trim()||P.name;
    P.subtitle=(v('spe-sub')||'').trim();
    P.tagline=(v('spe-tag')||'').trim();
    P.overview=(v('spe-ov')||'').trim();
    var pr=parseFloat(v('spe-price')); if(!isNaN(pr)&&pr>=0) P.price=pr;
    P.currency=(v('spe-cur')||'').trim()||P.currency;
    P.duration=(v('spe-dur')||'').trim();
    P.level=(v('spe-lvl')||'').trim();
    var c1=(v('spe-c1')||'').trim(), c2=(v('spe-c2')||'').trim(), c3=(v('spe-c3')||'').trim();
    if(/^#[0-9a-fA-F]{6}$/.test(c1)) P.color=c1;
    if(/^#[0-9a-fA-F]{6}$/.test(c2)) P.dark=c2;
    if(/^#[0-9a-fA-F]{6}$/.test(c3)) P.accent=c3;
  }
  if(v('spe-goals')!==null){
    var gs=(v('spe-goals')||'').split('\n').map(function(x){return x.trim();}).filter(Boolean);
    if(gs.length) P.goals=gs;
  }
  if(v('spe-rubric')!==null){
    var rs=(v('spe-rubric')||'').split('\n').map(function(l){
      var p=l.split('|').map(function(x){return x.trim();});
      return p[0] ? [p[0], p[1]||''] : null;
    }).filter(Boolean);
    if(rs.length) P.rubric=rs;
  }
  var ok=await hhSpkSaveOverride();
  if(typeof hhLogActivity==='function') hhLogActivity('generate','تحديث برنامج القائد المُلهِم');
  // تحديث سجل برامج القادة
  try{
    var reg=HH_LEADER_PROGRAMS.filter(function(x){return x.id==='speak_master';})[0];
    if(reg){ reg.name=P.name; reg.color=P.color; reg.dark=P.dark; reg.desc=P.overview; }
  }catch(e){}
}
function hhSpkExportJSON(){
  var P=HH_SPEAK_PROGRAM;
  var blob=new Blob([JSON.stringify(P,null,2)],{type:'application/json;charset=utf-8'});
  var a=document.createElement('a'); a.href=URL.createObjectURL(blob);
  a.download='speak_program.json'; a.click();
}
function hhSpkImportJSON(){
  var inp=document.createElement('input'); inp.type='file'; inp.accept='.json,application/json';
  inp.onchange=function(){
    var f=inp.files&&inp.files[0]; if(!f) return;
    var r=new FileReader();
    r.onload=function(e){
      try{
        var d=JSON.parse(String(e.target.result));
        hhSpkApplyOverride(d);
        hhSpkEdTab('info');
        if(typeof toast==='function') toast('استُورد البرنامج — اضغط حفظ','success');
      }catch(err){ if(typeof toast==='function') toast('ملف غير صالح','error'); }
    };
    r.readAsText(f,'utf-8');
  };
  inp.click();
}
async function hhSpkResetOverride(){
  if(!confirm('استعادة البرنامج الأصلي وحذف كل تعديلاتك؟')) return;
  try{ localStorage.removeItem(_HH_SPK_OVR_KEY); }catch(e){}
  try{
    await firebase.firestore().collection('platform_settings').doc('speak_program').delete();
  }catch(e){}
  if(typeof toast==='function') toast('استُعيد الأصل — أعد تحميل الصفحة','info');
  hhSpkCloseEd();
}

var _HH_SPK_KEY = 'hh_speak_progress';
var _hhSpkProg = {};
var _hhSpkAccess = null;   // null=غير معروف | true | false

function hhSpkLoad(){
  try{ _hhSpkProg = JSON.parse(localStorage.getItem(_HH_SPK_KEY)||'{}')||{}; }catch(e){ _hhSpkProg={}; }
  return _hhSpkProg;
}
function hhSpkSave(){
  try{
    localStorage.setItem(_HH_SPK_KEY, JSON.stringify(_hhSpkProg));
    if(typeof firebase!=='undefined' && firebase.firestore && typeof currentUser!=='undefined' && currentUser){
      firebase.firestore().collection('program_progress').doc(currentUser.uid)
        .set({ speak:_hhSpkProg, updatedAt:new Date().toISOString() }, {merge:true}).catch(function(){});
    }
  }catch(e){}
}
hhSpkLoad();

// ── التحقق من صلاحية الوصول ──
async function hhSpkCheckAccess(){
  if(typeof hhIsAdmin==='function' && hhIsAdmin()){ _hhSpkAccess=true; return true; }
  if(typeof currentUser==='undefined' || !currentUser){ _hhSpkAccess=false; return false; }
  try{
    var doc = await firebase.firestore().collection('program_access')
      .doc(currentUser.uid).get();
    _hhSpkAccess = !!(doc.exists && doc.data().speak_master === true);
    return _hhSpkAccess;
  }catch(e){ _hhSpkAccess=false; return false; }
}

function hhOpenSpeakProgram(){
  var P = HH_SPEAK_PROGRAM;
  hhSpkLoad();
  var old=document.getElementById('hh-spk'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-spk';
  ov.style.cssText='position:fixed;inset:0;background:rgba(30,6,15,.78);z-index:999970;display:flex;align-items:flex-start;justify-content:center;padding:16px;overflow-y:auto;direction:rtl;font-family:Cairo,Tajawal,sans-serif;';
  ov.innerHTML='<div id="spk-box" style="background:#FAFBFD;border:2px solid '+P.color+';border-radius:20px;max-width:680px;width:100%;overflow:hidden;margin-bottom:24px;">'
    +'<div style="background:linear-gradient(135deg,'+P.color+','+P.dark+');color:#fff;padding:18px;">'
    +'<div style="display:flex;justify-content:space-between;align-items:flex-start;">'
    +'<div><div style="font-weight:900;font-size:1.15rem;">'+esc(P.name)+'</div>'
    +'<div style="font-size:.82rem;opacity:.9;margin-top:2px;">'+esc(P.subtitle)+'</div></div>'
    +'<button onclick="hhCloseSpk()" style="background:none;border:none;color:#fff;font-size:1.15rem;cursor:pointer;">✕</button></div>'
    +'<div style="font-size:.78rem;opacity:.85;margin-top:8px;line-height:1.8;">'+esc(P.tagline)+'</div>'
    +'</div>'
    +'<div id="spk-body" style="padding:16px 18px;"><div style="text-align:center;color:'+P.color+';font-weight:800;padding:24px;">جاري التحقق من الصلاحية...</div></div>'
    +'</div>';
  document.body.appendChild(ov);
  Promise.all([hhSpkCheckAccess(), hhCohortsLoad()]).then(function(r){ hhSpkRender(r[0]); });
}
function hhCloseSpk(){ var e=document.getElementById('hh-spk'); if(e) e.remove(); }

function hhSpkRender(hasAccess){
  var P=HH_SPEAK_PROGRAM;
  var body=document.getElementById('spk-body'); if(!body) return;

  // نظرة عامة تظهر للجميع
  var goals = P.goals.map(function(g,i){
    return '<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:6px;">'
      +'<span style="background:'+P.accent+';color:#fff;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:.66rem;font-weight:900;flex-shrink:0;">'+(i+1)+'</span>'
      +'<span style="font-size:.79rem;color:#555;line-height:1.85;">'+esc(g)+'</span></div>';
  }).join('');

  var unitsList = P.units.map(function(U,i){
    var done = _hhSpkProg[U.id+'_quiz'] || 0;
    var locked = !hasAccess;
    var col = done>=80 ? '#3D6B53' : done ? '#b5801f' : (locked?'#bbb':P.color);
    return '<div style="background:#fff;border:1.5px solid '+(locked?'#eee':'#E3D9C6')+';border-right:4px solid '+col+';border-radius:12px;padding:12px 14px;margin-bottom:8px;'+(locked?'opacity:.65;':'')+'">'
      +'<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">'
      +'<div style="flex:1;min-width:0;">'
      +'<div style="font-weight:900;font-size:.85rem;color:'+(locked?'#999':P.dark)+';">'+esc(U.title)+'</div>'
      +'<div style="font-size:.71rem;color:#999;font-weight:700;margin-top:3px;">'+U.skills.map(esc).join(' · ')+'</div></div>'
      + (locked
         ? '<span style="font-size:.7rem;color:#aaa;font-weight:800;">مقفلة</span>'
         : '<div style="display:flex;gap:5px;flex-wrap:wrap;">'
           +'<button onclick="hhSpkLesson('+i+')" style="background:#F5E9EE;color:'+P.color+';border:1px solid '+P.color+';border-radius:8px;padding:5px 11px;font-family:Cairo;font-weight:900;font-size:.68rem;cursor:pointer;">الدرس</button>'
           +'<button onclick="hhSpkDrills('+i+')" style="background:#FDF3DD;color:#8A6D2E;border:1px solid #B8924A;border-radius:8px;padding:5px 11px;font-family:Cairo;font-weight:900;font-size:.68rem;cursor:pointer;">تمارين</button>'
           +'<button onclick="hhSpkQuiz('+i+')" style="background:#EBF2EE;color:#3D6B53;border:1px solid #3D6B53;border-radius:8px;padding:5px 11px;font-family:Cairo;font-weight:900;font-size:.68rem;cursor:pointer;">اختبار'+(done?' '+done+'%':'')+'</button>'
           +'</div>')
      +'</div></div>';
  }).join('');

  var head='<div style="display:flex;gap:9px;flex-wrap:wrap;margin-bottom:14px;">'
    +'<div style="background:#F5E9EE;border-radius:11px;padding:10px;text-align:center;flex:1;min-width:98px;">'
    +'<div style="font-size:1.1rem;font-weight:900;color:'+P.color+';">'+P.units.length+'</div><div style="font-size:.66rem;color:#666;font-weight:800;">وحدات</div></div>'
    +'<div style="background:#FDF3DD;border-radius:11px;padding:10px;text-align:center;flex:1;min-width:98px;">'
    +'<div style="font-size:1.1rem;font-weight:900;color:#8A6D2E;">24</div><div style="font-size:.66rem;color:#666;font-weight:800;">تمريناً عملياً</div></div>'
    +'<div style="background:#EBF2EE;border-radius:11px;padding:10px;text-align:center;flex:1;min-width:98px;">'
    +'<div style="font-size:1.1rem;font-weight:900;color:#3D6B53;">'+P.price+'</div><div style="font-size:.66rem;color:#666;font-weight:800;">'+esc(P.currency)+'</div></div>'
    +'</div>'
    +'<div style="background:#fff;border:1.5px solid #E3D9C6;border-radius:12px;padding:13px;margin-bottom:14px;">'
    +'<div style="font-size:.8rem;color:#555;line-height:1.95;">'+esc(P.overview)+'</div>'
    +'<div style="font-size:.72rem;color:#999;font-weight:700;margin-top:8px;">'+esc(P.duration)+' · '+esc(P.level)+'</div>'
    +'</div>'
    +'<div style="font-weight:900;font-size:.88rem;color:'+P.dark+';margin-bottom:7px;">أهداف البرنامج</div>'
    +'<div style="background:#FDF8EC;border:1.5px solid #E3D9C6;border-radius:12px;padding:12px;margin-bottom:14px;">'+goals+'</div>';

  var gate = hasAccess ? '' :
    '<div style="background:linear-gradient(135deg,'+P.color+','+P.dark+');color:#fff;border-radius:14px;padding:16px;margin-bottom:14px;text-align:center;">'
    +'<div style="font-weight:900;font-size:.95rem;margin-bottom:6px;">هذا البرنامج يتطلّب صلاحية وصول</div>'
    +'<div style="font-size:.79rem;opacity:.9;line-height:1.9;margin-bottom:11px;">المحتوى والتمارين والاختبارات متاحة للمشتركين فقط. للاشتراك تواصل مع إدارة المنصة.</div>'
    +'<div style="font-size:1.6rem;font-weight:900;color:#EAD9A8;">'+P.price+' <span style="font-size:.8rem;">'+esc(P.currency)+'</span></div>'
    +'<button onclick="hhSpkRequestAccess()" style="background:#fff;color:'+P.dark+';border:none;border-radius:11px;padding:10px 26px;font-family:Cairo;font-weight:900;font-size:.85rem;cursor:pointer;margin-top:11px;">طلب الاشتراك</button>'
    +'</div>';

  var adminBar = (typeof hhIsAdmin==='function' && hhIsAdmin())
    ? '<div style="background:#E9EEF8;border:1.5px solid #1F4E79;border-radius:11px;padding:10px 12px;margin-bottom:13px;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">'
      +'<span style="font-size:.76rem;font-weight:800;color:#1F4E79;">أنت مدير — الوصول مفتوح · تدير الصلاحيات من هنا</span>'
      +'<div style="display:flex;gap:6px;flex-wrap:wrap;">'
      +'<button onclick="hhSpkEditor()" style="background:#8A1538;color:#fff;border:none;border-radius:9px;padding:6px 14px;font-family:Cairo;font-weight:900;font-size:.71rem;cursor:pointer;">تحرير البرنامج</button>'
      +'<button onclick="hhSpkAdminAccess()" style="background:#1F4E79;color:#fff;border:none;border-radius:9px;padding:6px 14px;font-family:Cairo;font-weight:900;font-size:.71rem;cursor:pointer;">إدارة المشتركين</button></div></div>'
    : '';

  var rubric = hasAccess
    ? '<div style="font-weight:900;font-size:.86rem;color:'+P.dark+';margin:14px 0 7px;">معايير تقييم الأداء</div>'
      +'<div style="background:#fff;border:1.5px solid #E3D9C6;border-radius:12px;padding:11px;">'
      + P.rubric.map(function(r){
          return '<div style="display:flex;justify-content:space-between;gap:8px;padding:6px 0;border-bottom:1px dashed #f0e8d8;">'
            +'<span style="font-weight:900;font-size:.77rem;color:'+P.color+';">'+esc(r[0])+'</span>'
            +'<span style="font-size:.73rem;color:#888;text-align:left;flex:1;">'+esc(r[1])+'</span></div>';
        }).join('')
      +'</div>' : '';

  var cohortsBlock = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:7px;">'
    + '<span style="font-weight:900;font-size:.88rem;color:'+P.dark+';">مواعيد الدورات والتسجيل</span>'
    + ((typeof hhIsAdmin==='function' && hhIsAdmin())
       ? '<button onclick="hhCohortsAdmin()" style="background:#1F4E79;color:#fff;border:none;border-radius:8px;padding:5px 13px;font-family:Cairo;font-weight:900;font-size:.7rem;cursor:pointer;">إدارة الدورات</button>' : '')
    + '</div>'
    + (typeof hhCohortsHTML==='function' ? hhCohortsHTML() : '');

  body.innerHTML = adminBar + head + gate
    + cohortsBlock
    + '<div style="font-weight:900;font-size:.88rem;color:'+P.dark+';margin:16px 0 7px;">وحدات البرنامج</div>'
    + unitsList + rubric;
}

// ── طلب الاشتراك ──
async function hhSpkRequestAccess(){
  if(typeof currentUser==='undefined' || !currentUser){
    if(typeof toast==='function') toast('سجّل الدخول أولاً','warn'); return;
  }
  try{
    await firebase.firestore().collection('program_requests').add({
      program:'speak_master', uid:currentUser.uid, email:currentUser.email||'',
      name:currentUser.displayName||'', status:'pending',
      createdAt:new Date().toISOString()
    });
    if(typeof toast==='function') toast('أُرسل طلب الاشتراك — ستُبلَّغ عند التفعيل','success');
    if(typeof hhLogActivity==='function') hhLogActivity('generate','طلب اشتراك: القائد المُلهِم');
  }catch(e){ if(typeof toast==='function') toast('تعذر الإرسال','error'); }
}

// ── إدارة المشتركين (أدمن) ──
async function hhSpkAdminAccess(){
  if(!(typeof hhIsAdmin==='function' && hhIsAdmin())) return;
  var html='<div style="font-size:.77rem;color:#666;line-height:1.85;margin-bottom:10px;">امنح صلاحية الوصول لبريد المشترك بعد تأكيد الدفع.</div>'
    +'<input id="spk-email" placeholder="بريد المشترك" style="width:100%;border:1.5px solid #C9B37E;border-radius:10px;padding:9px 12px;font-family:Cairo;font-size:.84rem;box-sizing:border-box;margin-bottom:9px;">'
    +'<div style="display:flex;gap:8px;margin-bottom:12px;">'
    +'<button onclick="hhSpkGrant(true)" style="flex:1;background:linear-gradient(135deg,#3D6B53,#274a38);color:#fff;border:none;border-radius:10px;padding:9px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;">منح الوصول</button>'
    +'<button onclick="hhSpkGrant(false)" style="background:#fff;color:#c0392b;border:1.5px solid #e0c0c0;border-radius:10px;padding:9px 16px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;">سحب</button>'
    +'</div>'
    +'<div id="spk-adm-status" style="font-size:.75rem;font-weight:800;min-height:16px;margin-bottom:10px;"></div>'
    +'<div style="font-weight:900;font-size:.82rem;color:#1F4E79;margin-bottom:6px;">طلبات الاشتراك</div>'
    +'<div id="spk-reqs" style="font-size:.78rem;color:#999;">جاري التحميل...</div>';
  if(typeof hhSchModal==='function') hhSchModal('إدارة مشتركي البرنامج', html, '#1F4E79');
  try{
    var snap=await firebase.firestore().collection('program_requests').limit(50).get();
    var items=[]; snap.forEach(function(d){ items.push(Object.assign({id:d.id}, d.data())); });
    var box=document.getElementById('spk-reqs'); if(!box) return;
    box.innerHTML = items.length ? items.map(function(r){
      return '<div style="background:#fff;border:1px solid #E3D9C6;border-radius:9px;padding:8px 11px;margin-bottom:5px;display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap;">'
        +'<div><div style="font-weight:800;font-size:.78rem;">'+esc(r.name||r.email||'')+'</div>'
        +'<div style="font-size:.7rem;color:#aaa;">'+esc(r.email||'')+'</div></div>'
        +'<button onclick="hhSpkGrantUid(\''+esc(r.uid)+'\',\''+esc(r.email||'')+'\')" style="background:#3D6B53;color:#fff;border:none;border-radius:7px;padding:4px 11px;font-family:Cairo;font-weight:900;font-size:.68rem;cursor:pointer;">تفعيل</button></div>';
    }).join('') : '<div style="color:#999;font-size:.76rem;">لا طلبات بعد</div>';
  }catch(e){
    var b2=document.getElementById('spk-reqs'); if(b2) b2.innerHTML='<span style="color:#c0392b;">تعذر التحميل</span>';
  }
}
async function hhSpkGrantUid(uid, email){
  try{
    await firebase.firestore().collection('program_access').doc(uid)
      .set({ speak_master:true, email:email, grantedBy:currentUser.email, grantedAt:new Date().toISOString() }, {merge:true});
    await firebase.firestore().collection('user_notifications').add({
      toUid:uid, title:'فُعّل اشتراكك في القائد المُلهِم',
      body:'أهلاً بك! فُعّل وصولك لبرنامج «القائد المُلهِم — فنّ الإلقاء والتأثير». ابدأ رحلتك من مدرستي ← برامج القادة.',
      from:'إدارة المُلهِم', read:false, createdAt:new Date().toISOString()
    }).catch(function(){});
    if(typeof toast==='function') toast('فُعّل الوصول','success');
  }catch(e){ if(typeof toast==='function') toast('تعذر التفعيل','error'); }
}
async function hhSpkGrant(grant){
  var em=((document.getElementById('spk-email')||{}).value||'').trim().toLowerCase();
  var st=document.getElementById('spk-adm-status');
  if(!em){ if(st){st.textContent='أدخل البريد'; st.style.color='#c0392b';} return; }
  try{
    var snap=await firebase.firestore().collection('program_requests').where('email','==',em).limit(1).get();
    if(snap.empty){ if(st){st.textContent='لا يوجد طلب بهذا البريد — اطلب منه التسجيل أولاً'; st.style.color='#b5801f';} return; }
    var uid=snap.docs[0].data().uid;
    await firebase.firestore().collection('program_access').doc(uid)
      .set({ speak_master:grant, email:em, grantedBy:currentUser.email, grantedAt:new Date().toISOString() }, {merge:true});
    if(st){ st.textContent = grant?'فُعّل الوصول لـ'+em:'سُحب الوصول'; st.style.color = grant?'#3D6B53':'#c0392b'; }
  }catch(e){ if(st){st.textContent='تعذر التنفيذ'; st.style.color='#c0392b';} }
}

// ── الدرس والتمارين والاختبار ──
function hhSpkLesson(i){
  var U=HH_SPEAK_PROGRAM.units[i]; if(!U) return;
  var html='<div style="background:#fff;border-right:4px solid '+HH_SPEAK_PROGRAM.color+';border-radius:12px;padding:14px;font-size:.85rem;line-height:2.1;color:#333;">'+esc(U.lesson)+'</div>'
    +'<div style="font-weight:900;font-size:.82rem;color:'+HH_SPEAK_PROGRAM.dark+';margin:12px 0 6px;">المهارات المستهدفة</div>'
    + U.skills.map(function(s){ return '<span style="background:#F5E9EE;color:'+HH_SPEAK_PROGRAM.color+';border:1px solid '+HH_SPEAK_PROGRAM.color+';border-radius:99px;padding:4px 12px;font-size:.74rem;font-weight:900;margin:0 4px 5px 0;display:inline-block;">'+esc(s)+'</span>'; }).join('');
  if(typeof hhSchModal==='function') hhSchModal(U.title, html, HH_SPEAK_PROGRAM.color);
}
function hhSpkDrills(i){
  var U=HH_SPEAK_PROGRAM.units[i]; if(!U) return;
  var html=U.exercises.map(function(e,k){
    var doneKey=U.id+'_ex'+k;
    var done=!!_hhSpkProg[doneKey];
    return '<div style="background:#fff;border:1.5px solid '+(done?'#3D6B53':'#E3D9C6')+';border-radius:12px;padding:12px 14px;margin-bottom:8px;">'
      +'<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">'
      +'<div style="font-weight:900;font-size:.83rem;color:#8A6D2E;">'+(k+1)+'. '+esc(e.t)+'</div>'
      +'<span style="font-size:.68rem;color:#aaa;font-weight:800;white-space:nowrap;">'+esc(e.time)+'</span></div>'
      +'<div style="font-size:.79rem;color:#555;line-height:1.9;margin:5px 0 8px;">'+esc(e.d)+'</div>'
      +'<button onclick="hhSpkToggleEx(\''+doneKey+'\','+i+')" style="background:'+(done?'#3D6B53':'#fff')+';color:'+(done?'#fff':'#3D6B53')+';border:1.5px solid #3D6B53;border-radius:9px;padding:5px 14px;font-family:Cairo;font-weight:900;font-size:.71rem;cursor:pointer;">'
      + (done?'✓ أُنجز':'وسمه منجزاً') +'</button></div>';
  }).join('');
  if(typeof hhSchModal==='function') hhSchModal('تمارين — '+U.title, html, '#8A6D2E');
}
function hhSpkToggleEx(key, i){
  _hhSpkProg[key] = !_hhSpkProg[key];
  hhSpkSave(); hhSpkDrills(i);
}

var _hhSpkQuiz=null;
function hhSpkQuiz(i){
  var U=HH_SPEAK_PROGRAM.units[i]; if(!U) return;
  _hhSpkQuiz={ ui:i, qs:U.quiz.slice().sort(function(){return Math.random()-.5;}), idx:0, correct:0, answers:[] };
  hhSpkQRender();
}
function hhSpkQRender(){
  var T=_hhSpkQuiz; if(!T) return;
  if(T.idx>=T.qs.length){ hhSpkQEnd(); return; }
  var q=T.qs[T.idx];
  var opts=(q.o||[]).slice().sort(function(){return Math.random()-.5;});
  var old=document.getElementById('hh-spk-quiz'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-spk-quiz';
  ov.style.cssText='position:fixed;inset:0;background:#fff;z-index:999997;display:flex;align-items:center;justify-content:center;padding:20px;direction:rtl;font-family:Cairo,Tajawal,sans-serif;';
  var pct=Math.round(T.idx/T.qs.length*100);
  ov.innerHTML='<div style="max-width:560px;width:100%;">'
    +'<div style="display:flex;justify-content:space-between;margin-bottom:8px;">'
    +'<span style="font-weight:900;font-size:.84rem;color:'+HH_SPEAK_PROGRAM.dark+';">'+esc(HH_SPEAK_PROGRAM.units[T.ui].title)+'</span>'
    +'<span style="font-size:.74rem;color:#999;font-weight:800;">'+(T.idx+1)+' / '+T.qs.length+'</span></div>'
    +'<div style="background:#eee;border-radius:99px;height:8px;margin-bottom:18px;"><div style="background:linear-gradient(90deg,'+HH_SPEAK_PROGRAM.color+','+HH_SPEAK_PROGRAM.accent+');border-radius:99px;height:8px;width:'+pct+'%;"></div></div>'
    +'<div style="background:#FDF8EC;border:2px solid '+HH_SPEAK_PROGRAM.color+';border-radius:16px;padding:20px;margin-bottom:14px;">'
    +'<div style="font-size:1.02rem;font-weight:900;color:'+HH_SPEAK_PROGRAM.dark+';line-height:1.85;">'+esc(q.q)+'</div></div>'
    +'<div id="spkq-opts" style="display:flex;flex-direction:column;gap:8px;">'
    + opts.map(function(o,k){ return '<button onclick="hhSpkAnswer('+k+',this)" data-opt="'+esc(o)+'" style="background:#fff;border:1.5px solid #C9B37E;border-radius:12px;padding:12px 15px;font-family:Cairo;font-weight:800;font-size:.86rem;color:#333;cursor:pointer;text-align:right;line-height:1.7;">'+esc(o)+'</button>'; }).join('')
    +'</div>'
    +'<button onclick="hhSpkQuit()" style="background:none;border:none;color:#bbb;font-family:Cairo;font-weight:800;font-size:.76rem;cursor:pointer;margin-top:14px;">إنهاء</button></div>';
  document.body.appendChild(ov);
}
function hhSpkAnswer(k, btn){
  var T=_hhSpkQuiz; if(!T) return;
  var q=T.qs[T.idx];
  var chosen=btn.getAttribute('data-opt');
  var ok=(chosen===q.a);
  if(ok) T.correct++;
  T.answers.push({q:q.q, a:q.a, chosen:chosen, ok:ok});
  btn.parentNode.querySelectorAll('button').forEach(function(b){
    b.disabled=true;
    if(b.getAttribute('data-opt')===q.a){ b.style.background='#EBF2EE'; b.style.borderColor='#3D6B53'; b.style.color='#3D6B53'; }
    else if(b===btn){ b.style.background='#F7ECEF'; b.style.borderColor='#c0392b'; b.style.color='#c0392b'; }
    else b.style.opacity='.5';
  });
  setTimeout(function(){ T.idx++; hhSpkQRender(); }, 850);
}
function hhSpkQuit(){ _hhSpkQuiz=null; var e=document.getElementById('hh-spk-quiz'); if(e) e.remove(); }
function hhSpkQEnd(){
  var T=_hhSpkQuiz; if(!T) return;
  var pct=Math.round(T.correct/T.answers.length*100);
  var U=HH_SPEAK_PROGRAM.units[T.ui];
  if(pct > (_hhSpkProg[U.id+'_quiz']||0)) _hhSpkProg[U.id+'_quiz']=pct;
  hhSpkSave();
  if(typeof hhLogActivity==='function') hhLogActivity('generate','القائد المُلهِم: '+U.title+' '+pct+'%');
  var wrong=T.answers.filter(function(a){return !a.ok;});
  var col=pct>=80?'#3D6B53':pct>=50?'#b5801f':'#c0392b';
  var e=document.getElementById('hh-spk-quiz'); if(e) e.remove();
  var ov=document.createElement('div'); ov.id='hh-spk-res';
  ov.style.cssText='position:fixed;inset:0;background:rgba(30,6,15,.8);z-index:999997;display:flex;align-items:flex-start;justify-content:center;padding:18px;overflow-y:auto;direction:rtl;font-family:Cairo,Tajawal,sans-serif;';
  ov.innerHTML='<div style="background:#fff;border:2px solid '+col+';border-radius:20px;max-width:540px;width:100%;overflow:hidden;margin-bottom:20px;">'
    +'<div style="background:'+col+';color:#fff;padding:20px;text-align:center;">'
    +'<div style="font-size:2.6rem;font-weight:900;">'+pct+'%</div>'
    +'<div style="font-size:.85rem;font-weight:800;margin-top:4px;">'+T.correct+' من '+T.answers.length+'</div>'
    +'<div style="font-size:.78rem;opacity:.9;margin-top:6px;">'+(pct>=80?'أتقنت هذه الوحدة':'راجع الدرس وأعد المحاولة')+'</div></div>'
    +'<div style="padding:15px 18px;">'
    + (wrong.length ? '<div style="font-weight:900;font-size:.83rem;color:'+HH_SPEAK_PROGRAM.dark+';margin-bottom:7px;">راجع هذه النقاط</div>'
      + wrong.map(function(w){ return '<div style="background:#FDF8EC;border-right:3px solid #c0392b;border-radius:9px;padding:9px 11px;margin-bottom:6px;">'
        +'<div style="font-size:.79rem;font-weight:800;">'+esc(w.q)+'</div>'
        +'<div style="font-size:.74rem;color:#3D6B53;font-weight:800;margin-top:3px;">الصواب: '+esc(w.a)+'</div></div>'; }).join('')
      : '<div style="text-align:center;color:#3D6B53;font-weight:900;padding:10px;">إجابات كاملة</div>')
    +'<button onclick="hhSpkCloseRes()" style="width:100%;background:linear-gradient(135deg,'+HH_SPEAK_PROGRAM.color+','+HH_SPEAK_PROGRAM.dark+');color:#fff;border:none;border-radius:11px;padding:10px;font-weight:900;font-size:.83rem;cursor:pointer;margin-top:11px;">عودة للبرنامج</button>'
    +'</div></div>';
  document.body.appendChild(ov);
  _hhSpkQuiz=null;
}
function hhSpkCloseRes(){
  var e=document.getElementById('hh-spk-res'); if(e) e.remove();
  hhSpkCheckAccess().then(function(h){ hhSpkRender(h); });
}

var HH_LEADER_PROGRAMS = [
  {
    id: 'speak_master',
    name: 'القائد المُلهِم',
    tagline: 'فنّ الإلقاء والتأثير — برنامج تدريبي مدفوع',
    color: '#8A1538', dark: '#5E0E26',
    status: 'active', premium: true, threshold: 0,
    desc: 'برنامج تدريبي متكامل في مهارات الإلقاء والخطابة والتحدث أمام الجمهور: الثقة بالنفس، لغة الجسد، نبرات الصوت، بناء الخطاب، الارتجال، والحضور المؤثر. ست وحدات و24 تمريناً عملياً واختبار لكل وحدة.',
    pillars: [
      { t:'الثقة أمام الجمهور' },
      { t:'لغة الجسد ونبرات الصوت' },
      { t:'بناء الخطاب والارتجال' },
      { t:'اختبار إتقان وشهادة معتمدة' }
    ]
  }
  // برامج قادمة تُضاف هنا مستقبلاً
];

function hhOpenLeaderPrograms(){
  var old=document.getElementById('hh-leaders'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-leaders';
  ov.style.cssText='position:fixed;inset:0;background:rgba(30,6,15,.75);z-index:999973;display:flex;align-items:flex-start;justify-content:center;padding:16px;overflow-y:auto;direction:rtl;font-family:Cairo,Tajawal,sans-serif;';

  var cards = HH_LEADER_PROGRAMS.map(function(P){
    var pillSrc = (P.pillars||[]).map(function(x){return x.t;});
    if(!pillSrc.length && P.goals) pillSrc = ['6 وحدات تدريبية','تمارين عملية مصوّرة','اختبار إتقان','شهادة معتمدة'];
    var pills = pillSrc.slice(0,4).map(function(t){ return {t:t}; }).map(function(pl){
      return '<span style="background:#FDF9EF;border:1px solid #B8924A;color:#8A6D2E;border-radius:99px;padding:2px 11px;font-size:.74rem;font-weight:700;">'+esc(pl.t)+'</span>';
    }).join('');
    var stBadge = (P.premium||P.price)?('مدفوع'+(P.price?(' · '+P.price+' '+(P.currency||'ر.ق')):'')):(P.status==='active'?'نشط الآن':'قريباً');
    return '<div style="background:#fff;border:1px solid #B8924A;border-top:3px solid '+P.dark+';border-radius:0 0 16px 16px;padding:16px;margin-bottom:12px;box-shadow:0 4px 14px rgba(94,14,38,.07);transition:transform .18s ease,box-shadow .18s ease;" onmouseover="this.style.transform=\'translateY(-4px)\';this.style.boxShadow=\'0 12px 26px rgba(94,14,38,.15)\'" onmouseout="this.style.transform=\'\';this.style.boxShadow=\'0 4px 14px rgba(94,14,56,.07)\'">'
      +'<div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:9px;">'
      +'<span style="width:48px;height:48px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#F5E6C4,#B8924A 70%);border:2px solid #FDF3DD;display:inline-flex;align-items:center;justify-content:center;color:#3D0918;box-shadow:0 0 0 3px rgba(212,188,133,.25);flex-shrink:0;">'
      +'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="5"/><path d="M9 13.5L7.5 21l4.5-2.5L16.5 21 15 13.5"/></svg></span>'
      +'<div style="flex:1;min-width:0;"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">'
      +'<div style="font-weight:700;font-size:1.15rem;color:'+P.dark+';">'+esc(P.name)+'</div>'
      +'<span style="background:linear-gradient(135deg,#EAD9B0,#B8924A);color:#3D0918;border:1px solid #FDF3DD;border-radius:99px;padding:2px 12px;font-size:.76rem;font-weight:700;">'+stBadge+'</span></div>'
      +'<div style="font-size:.88rem;color:#8A6D2E;font-weight:700;margin-top:2px;">'+esc(P.tagline)+'</div></div></div>'
      +'<div style="font-size:.95rem;color:#4A3A2A;line-height:1.9;margin-bottom:10px;">'+esc(P.desc||P.overview||'')+'</div>'
      +(P.duration?'<div style="font-size:.82rem;color:#8A6D2E;font-weight:700;margin:-4px 0 10px;">'+esc(P.duration)+(P.level?' · '+esc(P.level):'')+'</div>':'')
      +(pills?'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">'+pills+'</div>':'')
      +'<button onclick="hhOpenProgram(\''+P.id+'\')" style="width:100%;background:linear-gradient(135deg,#EAD9B0,#B8924A);color:#3D0918;border:1px solid #FDF3DD;border-radius:11px;padding:11px;font-weight:700;font-size:1rem;cursor:pointer;box-shadow:0 4px 12px rgba(138,109,46,.25);">فتح البرنامج</button>'
      +'</div>';
  }).join('');

  var ornL='<svg width="110" height="110" viewBox="0 0 70 70" style="position:absolute;top:-30px;left:-30px;opacity:.11;pointer-events:none;" aria-hidden="true"><g fill="none" stroke="#D4BC85" stroke-width="1.2"><circle cx="35" cy="35" r="30"/><circle cx="35" cy="35" r="21"/><path d="M35 5v60M5 35h60M14 14l42 42M56 14L14 56"/></g></svg>';
  ov.innerHTML='<div style="background:#FBF7F0;border:2px solid #B8924A;border-radius:20px;max-width:640px;width:100%;overflow:hidden;margin-bottom:24px;">'
    +'<div style="background:linear-gradient(175deg,#4A0B1E,#5E0E26);color:#fff;padding:16px 18px 14px;position:relative;overflow:hidden;border-bottom:2px solid #B8924A;">'
    +ornL
    +'<div style="display:flex;justify-content:space-between;align-items:center;position:relative;">'
    +'<div><div style="font-weight:700;font-size:1.35rem;">البرامج التربوية</div>'
    +'<div style="font-size:.85rem;color:#EAD9B0;margin-top:2px;font-weight:700;">اكتشاف القيادات الطلابية ورعايتها وصناعة أثرها</div></div>'
    +'<button onclick="hhCloseLeaders()" style="background:rgba(212,188,133,.15);border:1px solid rgba(212,188,133,.5);border-radius:9px;width:30px;height:30px;color:#FDF3DD;font-size:1rem;cursor:pointer;">✕</button></div></div>'
    +'<div style="padding:16px 18px;">'+cards+'</div></div>';
  document.body.appendChild(ov);
}
function hhCloseLeaders(){ var e=document.getElementById('hh-leaders'); if(e) e.remove(); }

function hhOpenProgram(pid){
  if(pid==='speak_master'){ if(typeof hhOpenSpeakProgram==='function'){ hhCloseLeaders(); hhOpenSpeakProgram(); } return; }
  var P = HH_LEADER_PROGRAMS.filter(function(x){return x.id===pid;})[0];
  if(!P) return;
  var studs = (typeof hhGBStudents==='function') ? hhGBStudents() : [];
  var ranked = studs.map(function(s,i){
    var D = hhDiagnoseStudent(s.name);
    return { i:i, name:s.name, cls:s.cls||'', score:D.leadership, level:D.level, color:D.color, D:D };
  }).filter(function(r){ return r.score!==null; })
    .sort(function(a,b){ return b.score-a.score; });

  var qualified = ranked.filter(function(r){ return r.score>=P.threshold; });

  var pillars = P.pillars.map(function(pl){
    return '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;background:#fff;border-radius:9px;padding:9px 12px;margin-bottom:5px;">'
      +'<div><div style="font-weight:900;font-size:.79rem;color:'+P.dark+';">'+esc(pl.t)+'</div>'
      +'<div style="font-size:.7rem;color:#999;font-weight:700;">'+esc(pl.d)+'</div></div>'
      +'<span style="background:'+P.color+';color:#fff;border-radius:99px;padding:3px 11px;font-size:.72rem;font-weight:900;">'+pl.w+'%</span></div>';
  }).join('');

  var rows = ranked.length ? ranked.map(function(r,idx){
    var medal = idx===0?'الأول':idx===1?'الثاني':idx===2?'الثالث':String(idx+1);
    var qual = r.score>=P.threshold;
    return '<tr style="background:'+(qual?'#FDF8EC':(idx%2?'#F7FBFF':'#fff'))+';">'
      +'<td style="padding:7px 9px;text-align:center;font-weight:900;font-size:.72rem;color:'+(idx<3?P.dark:'#bbb')+';">'+medal+'</td>'
      +'<td style="padding:7px 9px;font-weight:800;font-size:.78rem;">'+esc(r.name)
      + (qual?' <span style="background:'+P.color+';color:#fff;border-radius:6px;padding:1px 7px;font-size:.6rem;">مرشّح</span>':'')+'</td>'
      +'<td style="padding:7px;text-align:center;font-size:.71rem;color:#888;">'+esc(r.cls)+'</td>'
      +'<td style="padding:7px;text-align:center;font-weight:900;color:'+r.color+';font-size:.8rem;">'+r.score+'</td>'
      +'<td style="padding:7px;text-align:center;font-size:.7rem;color:'+r.color+';font-weight:800;">'+esc(r.level)+'</td>'
      +'<td style="padding:4px;text-align:center;"><button onclick="hhShowDiagnosis('+r.i+')" style="background:#E9EEF8;color:#1F4E79;border:1px solid #1F4E79;border-radius:7px;padding:3px 9px;font-family:Cairo;font-weight:900;font-size:.65rem;cursor:pointer;">تشخيص</button></td></tr>';
  }).join('') : '';

  var html='<div style="background:linear-gradient(135deg,'+P.color+','+P.dark+');border-radius:14px;padding:15px;color:#fff;margin-bottom:14px;">'
    +'<div style="font-weight:900;font-size:1rem;">'+esc(P.name)+'</div>'
    +'<div style="font-size:.78rem;opacity:.9;line-height:1.9;margin-top:5px;">'+esc(P.desc)+'</div>'
    +'<div style="display:flex;gap:9px;margin-top:12px;flex-wrap:wrap;">'
    +'<div style="background:rgba(255,255,255,.16);border-radius:10px;padding:9px 14px;text-align:center;flex:1;min-width:88px;">'
    +'<div style="font-size:1.3rem;font-weight:900;">'+ranked.length+'</div><div style="font-size:.65rem;opacity:.85;">طالب مُقيَّم</div></div>'
    +'<div style="background:rgba(255,255,255,.16);border-radius:10px;padding:9px 14px;text-align:center;flex:1;min-width:88px;">'
    +'<div style="font-size:1.3rem;font-weight:900;">'+qualified.length+'</div><div style="font-size:.65rem;opacity:.85;">مرشّح للبرنامج</div></div>'
    +'<div style="background:rgba(255,255,255,.16);border-radius:10px;padding:9px 14px;text-align:center;flex:1;min-width:88px;">'
    +'<div style="font-size:1.3rem;font-weight:900;">'+P.threshold+'</div><div style="font-size:.65rem;opacity:.85;">عتبة الترشّح</div></div>'
    +'</div></div>'
    +'<div style="font-weight:900;font-size:.86rem;color:'+P.dark+';margin-bottom:7px;">ركائز التقييم</div>'
    +'<div style="background:#FDF8EC;border:1.5px solid #E3D9C6;border-radius:12px;padding:10px;margin-bottom:14px;">'+pillars+'</div>'
    + (rows
      ? '<div style="font-weight:900;font-size:.86rem;color:'+P.dark+';margin-bottom:7px;">لوحة الترتيب</div>'
        +'<div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;">'
        +'<thead><tr style="background:'+P.dark+';color:#fff;font-size:.7rem;font-weight:900;">'
        +'<th style="padding:7px;">#</th><th style="padding:7px 9px;text-align:right;">الطالب</th>'
        +'<th style="padding:7px;">الصف</th><th style="padding:7px;">المؤشر</th>'
        +'<th style="padding:7px;">التصنيف</th><th style="padding:7px;"></th></tr></thead>'
        +'<tbody>'+rows+'</tbody></table></div>'
      : '<div style="text-align:center;color:#999;padding:20px;font-weight:700;font-size:.82rem;line-height:1.9;">'
        +'لا بيانات كافية بعد.<br>ارصد درجات وحضوراً وملاحظات في دفتر المتابعة ليظهر الترتيب تلقائياً.</div>')
    +'<div style="background:#E9EEF8;border-radius:11px;padding:11px 13px;margin-top:13px;font-size:.74rem;color:#1F4E79;font-weight:700;line-height:1.85;">'
    +'تُحدَّث لوحة الترتيب تلقائياً من دفتر المتابعة — كلما رصدت بيانات أدق، صار الترشيح أعدل.</div>';

  if(typeof hhSchModal==='function') hhSchModal(P.name, html, P.color);
}

// ═══════════════════════════════════════════════════════════════════
// شهادات التفوق — تصميم قطري فاخر · دقة طباعة عالية
// ═══════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════
// شهادات التفوق — نسخة محصّنة: الجهة المُصدِرة بيد الأدمن وحده
// ═══════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════
// أختام المنصة — أربعة تصاميم متجهة بالهوية القطرية
// ═══════════════════════════════════════════════════════════════════
