/* وحدة مستخرجة من محرك المُلهِم — تُحمَّل بعد almulhim-engine.js */

// ═══ المدرسة: القصص التفاعلية + المسار المتدرج + معالج الدخول + مركز المناهج ═══
var HH_STORIES = {
  'u1l1': {
    title:'رحلة النوخذة',
    unit:'الوحدة الأولى: النقل والمواصلات',
    intro:'أنت «سالم»، تاجر شاب في الدوحة عام 1935. ورثت عن أبيك بضاعة من اللؤلؤ والتمور، وعليك أن توصلها إلى أسواق بعيدة وتعود بالربح. كل قرار تتخذه يعلّمك شيئاً عن النقل والتجارة.',
    scenes:[
      { id:1, text:'أمامك حِمل ثقيل من التمور، والسوق في الأحساء يبعد مئات الأميال عبر الصحراء. لا طرق معبدة في زمنك. كيف تنقل بضاعتك؟',
        choices:[
          { t:'أستأجر قافلة من الإبل وأسلك دروب القوافل', ok:true, next:2,
            fb:'اختيار موفق. طرق القوافل هي الطرق القديمة للنقل البري، وهي دروب ومسالك غير مرصوفة يسلكها الإنسان مستخدماً الدواب.' },
          { t:'أنتظر حتى تُبنى سكة حديد', ok:false, next:2,
            fb:'لن تنتظر طويلاً فحسب — بل ستفسد التمور. السكك الحديدية نوع من النقل البري لكنها لم تكن متاحة هنا آنذاك.' },
          { t:'أنقلها بحراً رغم أن الوجهة داخلية', ok:false, next:2,
            fb:'النقل المائي ممتاز للمسافات الطويلة، لكن الوجهة الداخلية تحتاج نقلاً برياً. لكل نوع نقل موضعه.' }
        ]},
      { id:2, text:'نجحت في البيع. الآن معك أرباح، وسمعت أن اللؤلؤ القطري مطلوب في الهند بأسعار عالية. ما مقوّم التجارة الذي تحتاجه أولاً لتبدأ هذه الرحلة؟',
        choices:[
          { t:'رأس المال لتنشيط عملية التجارة', ok:true, next:3,
            fb:'صحيح. رؤوس الأموال أحد مقومات التجارة الستة: فائض الإنتاج، الأسواق، الأمن، رؤوس الأموال، وسائل النقل، والأيدي العاملة.' },
          { t:'أبدأ بلا مال معتمداً على الحظ', ok:false, next:3,
            fb:'التجارة تحتاج مقومات لا حظاً. من دون رأس مال لا تستطيع شراء البضاعة ولا تجهيز السفينة.' }
        ]},
      { id:3, text:'في طريقك بحراً، عصفت رياح وتعطلت السفينة قرب ميناء صغير. التجار هناك يعرضون شراء نصف حمولتك بسعر أقل. ما القيمة التي تحكم قرارك؟',
        choices:[
          { t:'ألتزم بالأمانة وجودة المنتج ولا أخفي أي عيب', ok:true, next:4,
            fb:'أحسنت. الالتزام بمعايير الجودة والأمانة يزيد القدرة التنافسية للمنتجات الوطنية ويبني سمعة تدوم.' },
          { t:'أخفي العيوب لأربح أكثر', ok:false, next:4,
            fb:'قد تربح اليوم وتخسر السمعة غداً. الأمانة والجودة أساس التجارة المستدامة.' }
        ]},
      { id:4, text:'عدت إلى الدوحة بأرباح طيبة. جاءك شاب يسألك: ما أهم درس تعلمته عن النقل؟',
        choices:[
          { t:'أن النقل يربط مناطق الإنتاج بالاستهلاك ويحقق التنمية', ok:true, next:0,
            fb:'هذا جوهر الدرس. النقل يحقق التنمية الاقتصادية بالربط بين مناطق الإنتاج والاستهلاك، ويزيد حركة التجارة، وييسّر التبادل الثقافي بين الشعوب.' },
          { t:'أن النقل مجرد وسيلة تنقّل لا أثر لها', ok:false, next:0,
            fb:'بل الإنتاج نفسه يُعد محدود القيمة إذا لم تتوافر وسائل النقل لنقله إلى الأسواق العالمية.' }
        ]}
    ],
    ending:'أتممت رحلتك يا سالم. أدركت أن النقل ليس حركة بضائع فحسب، بل شريان التنمية الذي يربط الناس والأسواق والحضارات.'
  },
  'u2l1': {
    title:'في بلاط بغداد',
    unit:'الوحدة الثانية: الحضارة العباسية',
    intro:'أنت «يحيى»، شاب طموح وصل بغداد في أوج ازدهار الدولة العباسية. تحلم بأن تكون من أرباب الأقلام. رحلتك في المدينة ستكشف لك أسرار هذه الحضارة.',
    scenes:[
      { id:1, text:'تدخل بغداد فتبهرك المكتبات والمساجد والمدارس. تسأل شيخاً: ما سرّ هذا الازدهار؟ أي إجابة تتوقعها؟',
        choices:[
          { t:'الاستقرار السياسي والرخاء الاقتصادي وتشجيع الخلفاء للعلماء', ok:true, next:2,
            fb:'صحيح تماماً. عوامل ازدهار الحضارة: الاستقرار السياسي وندرة الحروب، والرخاء الاقتصادي، وتشجيع الخلفاء والأمراء للعلماء وحركة الترجمة، وانتشار المؤسسات التعليمية.' },
          { t:'كثرة الحروب والفتوحات المستمرة', ok:false, next:2,
            fb:'العكس تماماً — ندرة الحروب الداخلية والخارجية هي أحد أسباب الازدهار، فالاستقرار يتيح للعلم أن ينمو.' }
        ]},
      { id:2, text:'تريد الالتحاق بطبقة أرباب الأقلام. أين تعمل هذه الطبقة؟',
        choices:[
          { t:'في الدواوين كتّاباً ومترجمين', ok:true, next:3,
            fb:'أحسنت. أرباب الأقلام هم الكتّاب والمترجمون الذين اشتغلوا في الدواوين، وكان لهم دور محوري في حركة الترجمة.' },
          { t:'في الثكنات العسكرية', ok:false, next:3,
            fb:'تلك طبقة الجند — الجنود والقادة العسكريون. أرباب الأقلام هم الكتّاب والمترجمون في الدواوين.' }
        ]},
      { id:3, text:'تلتقي في المكتبة بزميل فارسي وآخر من أهل الذمة. كيف كان التعايش في هذا المجتمع؟',
        choices:[
          { t:'اندمجت الفئات وعاش الجميع في ظل قيم العدل والمساواة دون تمييز', ok:true, next:4,
            fb:'صحيح. تكوّن المجتمع من عناصر عربية (الأغلبية) وغير عربية كالفرس والأتراك، واندمجت فئاته، وعاش أهل الذمة في ظل ما يكفله الإسلام من عدل ورحمة ومساواة وتعايش.' },
          { t:'كان كل فريق منعزلاً في حيّه ولا تواصل بينهم', ok:false, next:4,
            fb:'بل حدث اندماج حقيقي بين فئات المجتمع وعناصره، وهذا من أسباب ثراء الحضارة العباسية.' }
        ]},
      { id:4, text:'يسألك الخليفة: كيف يُختار من يخلفك في منصبك يوماً ما، وما نظام الحكم في دولتنا؟',
        choices:[
          { t:'نظام وراثي، فالخليفة يعيّن أحد أبنائه في ولاية العهد', ok:true, next:0,
            fb:'صحيح. نظام الحكم في الدولة العباسية وراثي، امتداداً لما كان عليه الوضع في الدولة الأموية.' },
          { t:'ينتخبه أهل بغداد بالتصويت', ok:false, next:0,
            fb:'لم يكن ذلك نظام الحكم آنذاك — بل كان وراثياً عبر ولاية العهد.' }
        ]}
    ],
    ending:'أصبحت من أرباب الأقلام يا يحيى. فهمت أن الحضارة لا تُبنى بالسيف وحده، بل بالاستقرار والعلم والتعايش.'
  }
  ,
  'u1l2': {
    title:'سوق الدوحة',
    unit:'الوحدة الأولى: التجارة',
    intro:'أنت «مريم»، صاحبة مشروع ناشئ لبيع منتجات قطرية. تريدين توسيع تجارتك إلى الأسواق الخارجية. كل قرار سيعلّمك مقوّمات التجارة الحقيقية.',
    scenes:[
      { id:1, text:'أنتجتِ كمية من التمور تفوق حاجة السوق المحلي. ما التصرف الاقتصادي الصحيح؟',
        choices:[
          { t:'أصرّف الفائض في الأسواق الخارجية', ok:true, next:2,
            fb:'صحيح. من أهمية التجارة تصريف فائض الإنتاج المحلي في الأسواق الخارجية، وهذا يزيد الدخل القومي.' },
          { t:'أتلف الفائض حتى لا تنخفض الأسعار', ok:false, next:2,
            fb:'إتلاف الإنتاج خسارة للوطن. فائض الإنتاج أحد مقومات التجارة، ووجوده فرصة لا مشكلة.' }
        ]},
      { id:2, text:'تحتاجين لنقل بضاعتك عبر البحار. أي وسيلة نقل تسهم بأكثر من ثلاثة أرباع التبادل التجاري العالمي؟',
        choices:[
          { t:'النقل المائي', ok:true, next:3,
            fb:'أحسنتِ. أسهم النقل المائي بأكثر من ثلاثة أرباع التبادل التجاري العالمي، وربط مراكز الإنتاج بالاستهلاك بأقل تكلفة.' },
          { t:'النقل الجوي', ok:false, next:3,
            fb:'النقل الجوي سريع لكنه مكلف للبضائع الثقيلة. النقل المائي هو الأكثر إسهاماً في التجارة العالمية.' }
        ]},
      { id:3, text:'عُرض عليك التوسع لكن ينقصك عنصر أساسي. أي مقوّم من مقومات التجارة يضمن سلامة عمليتي البيع والشراء؟',
        choices:[
          { t:'الأمن', ok:true, next:4,
            fb:'صحيح. الأمن أحد مقومات التجارة الستة: فائض الإنتاج، الأسواق، الأمن، رؤوس الأموال، وسائل النقل، والأيدي العاملة.' },
          { t:'كثرة الإعلانات', ok:false, next:4,
            fb:'الإعلان مهم للتسويق، لكن الأمن هو ما يضمن سلامة عملية البيع والشراء ويشجع المستثمرين.' }
        ]},
      { id:4, text:'نجح مشروعك. يسألك طالب: ما أثر تطور وسائل النقل على التجارة؟',
        choices:[
          { t:'زاد التبادل التجاري بين دول العالم', ok:true, next:0,
            fb:'تماماً. أدى تطور وسائل النقل والمواصلات إلى زيادة التبادل التجاري بين دول العالم وربط مراكز الإنتاج بالاستهلاك.' },
          { t:'لا علاقة بينهما', ok:false, next:0,
            fb:'بل العلاقة وثيقة — وسائل النقل من مقومات التجارة نفسها.' }
        ]}
    ],
    ending:'صارت منتجاتك في أسواق العالم يا مريم. أدركت أن التجارة علمٌ ومقوّمات لا مصادفة.'
  },
  'u2l2': {
    title:'مجلس الحكمة',
    unit:'الوحدة الثانية: الحضارة الاجتماعية والثقافية',
    intro:'أنت «زينب»، عالمة شابة في بغداد العباسية. دُعيتِ إلى مجلس علمي يحضره علماء من كل الأعراق. رحلتك تكشف نسيج هذا المجتمع.',
    scenes:[
      { id:1, text:'في المجلس ترين عرباً وفرساً وأتراكاً. من شكّل الأغلبية في المجتمع العباسي؟',
        choices:[
          { t:'العناصر العربية', ok:true, next:2,
            fb:'صحيح. تكوّن المجتمع من عناصر عربية يشكلون الأغلبية، وعناصر غير عربية مثل الفرس والأتراك.' },
          { t:'الأتراك', ok:false, next:2,
            fb:'الأتراك من العناصر غير العربية في المجتمع، أما الأغلبية فكانت للعناصر العربية.' }
        ]},
      { id:2, text:'يجلس بجوارك عالم من أهل الذمة يناقش بحرية. ما القيم التي أتاحت له ذلك؟',
        choices:[
          { t:'العدل والرحمة والمساواة والتعايش دون تمييز', ok:true, next:3,
            fb:'أحسنتِ. عاش أهل الذمة في ظل ما يكفله الإسلام من قيم العدل والرحمة والمساواة والتعايش دون تمييز.' },
          { t:'دفعوا مقابلاً لحضور المجالس', ok:false, next:3,
            fb:'بل كان التعايش قيمة أصيلة كفلها الإسلام، لا امتيازاً يُشترى.' }
        ]},
      { id:3, text:'يُطلب منك اختيار مساعد يترجم كتاباً يونانياً. من أي طبقة تختارينه؟',
        choices:[
          { t:'أرباب الأقلام — الكتّاب والمترجمون', ok:true, next:4,
            fb:'صحيح. أرباب الأقلام هم الكتّاب والمترجمون الذين اشتغلوا في الدواوين، وكانوا عماد حركة الترجمة.' },
          { t:'طبقة الجند', ok:false, next:4,
            fb:'الجند هم الجنود والقادة العسكريون. الترجمة اختصاص أرباب الأقلام.' }
        ]},
      { id:4, text:'يسألك شيخ المجلس: ما الطبقة التي تمتعت بمركز رفيع في المجتمع الإسلامي؟',
        choices:[
          { t:'الفقهاء والعلماء', ok:true, next:0,
            fb:'صحيح. تمتعت طبقة الفقهاء والعلماء بمركز رفيع، وشملت العلماء والفقهاء والخطباء والقُرّاء.' },
          { t:'أصحاب المِهن والحِرف', ok:false, next:0,
            fb:'كان غالبيتهم من أهل البلاد المفتوحة. أما المركز الرفيع فكان للفقهاء والعلماء.' }
        ]}
    ],
    ending:'صرتِ من علماء بغداد يا زينب. عرفتِ أن قوة الحضارة في تنوّعها وتقديرها للعلم والعلماء.'
  }
  ,
  'u4l1': {
    title:'حارس البيئة',
    unit:'الوحدة الرابعة: التلوث البيئي',
    intro:'أنت «نورة»، طالبة في نادي البيئة المدرسي. لاحظتِ تغيّرات مقلقة في محيط مدرستك، وقررتِ أن تفهمي وتتصرفي. رحلتك ستكشف لك حقيقة التلوث وأثره.',
    scenes:[
      { id:1, text:'ترين دخاناً أسود يتصاعد من موقع قريب، ورائحة خانقة تملأ الهواء. زميلتك تسأل: ما هذا بالضبط؟',
        choices:[
          { t:'هذا تلوث — إدخال مواد ضارة إلى البيئة يؤدي إلى خلل يؤثر على الكائنات الحية', ok:true, next:2,
            fb:'تعريف دقيق. التلوث البيئي هو إدخال مواد ضارة (صلبة أو سائلة أو غازية أو طاقة) إلى البيئة؛ مما يؤدي إلى حدوث خلل يؤثر على الكائنات الحية.' },
          { t:'مجرد رائحة عابرة لا تستحق الاهتمام', ok:false, next:2,
            fb:'تلوث الهواء يُعدّ أكبر خطر على الصحة، ويسبب ملايين حالات الوفاة سنوياً — لا يصح التهاون به.' }
        ]},
      { id:2, text:'تبحثين عن أنواع التلوث لتصنّفي ما رأيتِ. كم نوعاً رئيساً تجدين؟',
        choices:[
          { t:'أربعة: الهواء والمياه والتربة والبحر', ok:true, next:3,
            fb:'صحيح. أنواع التلوث أربعة: تلوث الهواء، وتلوث المياه، وتلوث التربة، وتلوث البحر.' },
          { t:'نوعان فقط: الهواء والماء', ok:false, next:3,
            fb:'الأنواع أربعة — أضيفي تلوث التربة وتلوث البحر.' }
        ]},
      { id:3, text:'تعرضين النتائج على المدير، فيسألك: ولماذا لا تكفي جهود دولتنا وحدها؟',
        choices:[
          { t:'لأن آثار التلوث تتجاوز حدود الدول وتستدعي تعاوناً دولياً', ok:true, next:4,
            fb:'أحسنتِ. يُعدّ تلوث البيئة من التحديات التي تواجه العالم اليوم، والتي تستدعي تعاون الجهود الدولية للحد من آثاره السلبية.' },
          { t:'كل دولة تكفيها جهودها الخاصة', ok:false, next:4,
            fb:'الهواء والماء لا يعرفان حدوداً — ولهذا وُجدت الاتفاقيات الدولية كبروتوكول مونتريال واتفاقية باريس.' }
        ]},
      { id:4, text:'يسألك زميل صغير: وأنا ماذا أفعل؟ أنا مجرد طالب.',
        choices:[
          { t:'الحفاظ على البيئة واجب ومسؤولية كل فرد — ابدأ بترشيد الاستهلاك وإعادة التدوير', ok:true, next:0,
            fb:'هذه هي القيمة المستفادة: الحفاظ على نظافة البيئة من التلوث واجب ومسؤولية كل فرد، فساهم في حماية بيئتك من كافة الملوثات المضرّة بها وبصحتك.' },
          { t:'انتظر حتى تكبر، فالأمر يخص الحكومات', ok:false, next:0,
            fb:'المسؤولية تبدأ من الفرد — كل سلوك صغير يصنع فرقاً.' }
        ]}
    ],
    ending:'أصبحتِ حارسة للبيئة يا نورة. أدركتِ أن المعرفة وحدها لا تكفي، وأن الفعل الصغير المستمر هو ما يحمي كوكبنا.'
  },
  'u5l2': {
    title:'فجر عين جالوت',
    unit:'الوحدة الخامسة: الخطر المغولي',
    intro:'أنت «مظفّر»، جندي شاب في جيش المماليك سنة 658هـ. بغداد سقطت، والمغول يزحفون نحو مصر. اليوم قد يتغيّر مصير الأمة — وقراراتك جزء منه.',
    scenes:[
      { id:1, text:'في المعسكر يتساءل الجنود: كيف سقطت بغداد وهي عاصمة الخلافة؟ من قادهم؟',
        choices:[
          { t:'هولاكو، سنة 1258م، فدُمّرت المكتبات وضاع تراث علمي هائل', ok:true, next:2,
            fb:'صحيح. زحف المغول بقيادة هولاكو على بغداد سنة 656هـ/1258م، فسقطت عاصمة الخلافة العباسية ودُمّرت مكتباتها.' },
          { t:'جنكيز خان، وكان ذلك قبل قرن', ok:false, next:2,
            fb:'جنكيز خان مؤسس الدولة المغولية، لكن الذي أسقط بغداد هو حفيده هولاكو سنة 1258م.' }
        ]},
      { id:2, text:'يقترح بعض القادة الانسحاب إلى مصر وتحصينها. ماذا ترى؟',
        choices:[
          { t:'بل نتقدم ونلاقيهم في فلسطين قبل أن يصلوا مصر', ok:true, next:3,
            fb:'هذا ما فعله المماليك فعلاً — التقوا المغول في عين جالوت بفلسطين سنة 658هـ/1260م.' },
          { t:'ننتظر داخل الأسوار حتى يحاصرونا', ok:false, next:3,
            fb:'الانتظار داخل الأسوار هو ما فعلته بغداد فسقطت. المبادرة كانت سرّ نصر عين جالوت.' }
        ]},
      { id:3, text:'قبل المعركة يسألك جندي: من يقودنا اليوم؟',
        choices:[
          { t:'المماليك بقيادة قطز وبيبرس', ok:true, next:4,
            fb:'صحيح. تصدّى المماليك بقيادة قطز وبيبرس للمغول في عين جالوت وأوقفوا زحفهم.' },
          { t:'الخليفة العباسي نفسه', ok:false, next:4,
            fb:'الخلافة العباسية سقطت في بغداد قبل عامين — المماليك هم من حملوا الراية.' }
        ]},
      { id:4, text:'انتصرتم. يجلس القائد ويسألك: ما أهمية ما فعلناه اليوم في نظرك؟',
        choices:[
          { t:'أوقفنا المدّ المغولي نحو مصر وشمال إفريقيا — إنها نقطة تحوّل', ok:true, next:0,
            fb:'تماماً. تُعدّ عين جالوت نقطة تحوّل في التاريخ الإسلامي، إذ أوقفت المدّ المغولي نحو مصر وشمال إفريقيا.' },
          { t:'مجرد معركة عابرة كغيرها', ok:false, next:0,
            fb:'بل غيّرت مسار التاريخ — ولولاها لامتد المغول إلى شمال إفريقيا كله.' }
        ]}
    ],
    ending:'شهدت التاريخ يُصنع يا مظفّر. تعلّمت أن الأمم لا تُهزم بقوة عدوها بقدر ما تُهزم بتفرّقها — وأن الوحدة والمبادرة تصنعان النصر.'
  }
};

var _hhStory=null;
function hhStoryAvailable(lessonId){ return !!HH_STORIES[lessonId]; }

function hhStartStory(lessonId){
  var S=HH_STORIES[lessonId];
  if(!S){ if(typeof toast==='function') toast('لا توجد قصة لهذا الدرس بعد','info'); return; }
  _hhStory={ id:lessonId, data:S, scene:0, correct:0, total:0, log:[] };
  hhStoryIntro();
}
function hhStoryIntro(){
  var S=_hhStory.data;
  var old=document.getElementById('hh-story'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-story';
  ov.style.cssText='position:fixed;inset:0;background:linear-gradient(160deg,#2B0912,#5E0E26);z-index:999997;display:flex;align-items:center;justify-content:center;padding:20px;overflow-y:auto;direction:rtl;font-family:Cairo,Tajawal,sans-serif;';
  ov.innerHTML='<div style="max-width:560px;width:100%;text-align:center;">'
    +'<div style="color:#D4BC85;font-size:.78rem;font-weight:800;margin-bottom:8px;">'+esc(S.unit)+'</div>'
    +'<div style="color:#fff;font-size:2rem;font-weight:900;margin-bottom:16px;">'+esc(S.title)+'</div>'
    +'<div style="background:rgba(255,255,255,.07);border:1.5px solid rgba(184,146,74,.4);border-radius:16px;padding:20px;color:rgba(255,255,255,.9);font-size:.95rem;line-height:2.1;font-weight:700;margin-bottom:20px;">'+esc(S.intro)+'</div>'
    +'<button onclick="hhStoryScene()" style="background:linear-gradient(135deg,#B8924A,#8A6D2E);color:#fff;border:none;border-radius:13px;padding:13px 40px;font-family:Cairo;font-weight:900;font-size:1rem;cursor:pointer;box-shadow:0 6px 20px rgba(184,146,74,.35);">ابدأ الرحلة</button>'
    +'<button onclick="hhCloseStory()" style="display:block;margin:14px auto 0;background:none;border:none;color:rgba(255,255,255,.45);font-family:Cairo;font-weight:700;font-size:.8rem;cursor:pointer;">خروج</button>'
    +'</div>';
  document.body.appendChild(ov);
}
function hhStoryScene(){
  var T=_hhStory; if(!T) return;
  var scenes=T.data.scenes;
  if(T.scene>=scenes.length){ hhStoryEnd(); return; }
  var sc=scenes[T.scene];
  var ov=document.getElementById('hh-story'); if(!ov) return;
  var pct=Math.round(T.scene/scenes.length*100);
  ov.innerHTML='<div style="max-width:600px;width:100%;">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">'
    +'<span style="color:#D4BC85;font-size:.78rem;font-weight:900;">'+esc(T.data.title)+'</span>'
    +'<span style="color:rgba(255,255,255,.5);font-size:.74rem;font-weight:800;">'+(T.scene+1)+' / '+scenes.length+'</span></div>'
    +'<div style="background:rgba(255,255,255,.12);border-radius:99px;height:7px;margin-bottom:18px;"><div style="background:#B8924A;border-radius:99px;height:7px;width:'+pct+'%;transition:width .4s;"></div></div>'
    +'<div style="background:rgba(255,255,255,.08);border:1.5px solid rgba(184,146,74,.35);border-radius:16px;padding:20px;color:#fff;font-size:1.02rem;line-height:2.05;font-weight:700;margin-bottom:16px;">'+esc(sc.text)+'</div>'
    +'<div id="story-choices" style="display:flex;flex-direction:column;gap:9px;">'
    + sc.choices.map(function(ch,i){
        return '<button onclick="hhStoryChoose('+i+')" style="background:rgba(255,255,255,.95);border:1.5px solid #B8924A;border-radius:13px;padding:14px 17px;font-family:Cairo;font-weight:800;font-size:.9rem;color:#3D0918;cursor:pointer;text-align:right;line-height:1.7;transition:all .15s;">'+esc(ch.t)+'</button>';
      }).join('')
    +'</div>'
    +'<div id="story-fb" style="display:none;margin-top:14px;"></div>'
    +'</div>';
}
function hhStoryChoose(i){
  var T=_hhStory; if(!T) return;
  var sc=T.data.scenes[T.scene];
  var ch=sc.choices[i];
  T.total++;
  if(ch.ok) T.correct++;
  T.log.push({ q:sc.text.slice(0,60), choice:ch.t, ok:ch.ok });
  var btns=document.getElementById('story-choices').querySelectorAll('button');
  btns.forEach(function(b,bi){
    b.disabled=true;
    if(bi===i){
      b.style.background = ch.ok? '#EBF2EE' : '#F7ECEF';
      b.style.borderColor = ch.ok? '#3D6B53' : '#c0392b';
      b.style.color = ch.ok? '#3D6B53' : '#c0392b';
    } else b.style.opacity='.45';
  });
  var fb=document.getElementById('story-fb');
  fb.style.display='block';
  fb.innerHTML='<div style="background:'+(ch.ok?'rgba(61,107,83,.25)':'rgba(192,57,43,.22)')+';border:1.5px solid '+(ch.ok?'#3D6B53':'#c0392b')+';border-radius:13px;padding:14px 16px;color:#fff;font-size:.87rem;line-height:1.95;font-weight:700;">'
    +'<div style="font-weight:900;margin-bottom:5px;color:'+(ch.ok?'#8fd0a8':'#f2a09a')+';">'+(ch.ok?'قرار موفق':'تأمّل معي')+'</div>'
    + esc(ch.fb)+'</div>'
    +'<button onclick="hhStoryNext()" style="width:100%;background:linear-gradient(135deg,#B8924A,#8A6D2E);color:#fff;border:none;border-radius:13px;padding:12px;font-family:Cairo;font-weight:900;font-size:.9rem;cursor:pointer;margin-top:11px;">'
    + (T.scene+1>=T.data.scenes.length ? 'أنهِ الرحلة' : 'تابع القصة') + '</button>';
  fb.scrollIntoView({behavior:'smooth', block:'nearest'});
}
function hhStoryNext(){ _hhStory.scene++; hhStoryScene(); }
function hhStoryEnd(){
  var T=_hhStory; if(!T) return;
  var pct=T.total? Math.round(T.correct/T.total*100):0;
  var col=pct>=80?'#8fd0a8':pct>=50?'#f2c94c':'#f2a09a';
  var ov=document.getElementById('hh-story'); if(!ov) return;
  // حفظ في سجل مدرستي
  try{
    if(typeof _hhSchProg!=='undefined'){
      var key=T.id+'_story';
      if(pct > (_hhSchProg[key]||0)) _hhSchProg[key]=pct;
      if(typeof hhSchSave==='function') hhSchSave();
    }
    if(typeof hhLogActivity==='function') hhLogActivity('generate','قصة: '+T.data.title+' '+pct+'%');
  }catch(e){}
  ov.innerHTML='<div style="max-width:540px;width:100%;text-align:center;">'
    +'<div style="font-size:3.2rem;font-weight:900;color:'+col+';line-height:1;">'+pct+'%</div>'
    +'<div style="color:rgba(255,255,255,.7);font-size:.85rem;font-weight:800;margin:6px 0 18px;">'+T.correct+' قرار صائب من '+T.total+'</div>'
    +'<div style="background:rgba(255,255,255,.08);border:1.5px solid rgba(184,146,74,.4);border-radius:16px;padding:20px;color:#fff;font-size:.98rem;line-height:2.1;font-weight:700;margin-bottom:18px;">'+esc(T.data.ending)+'</div>'
    +'<div style="display:flex;gap:9px;justify-content:center;flex-wrap:wrap;">'
    +'<button onclick="hhStartStory(\''+T.id+'\')" style="background:rgba(255,255,255,.14);color:#fff;border:1.5px solid rgba(184,146,74,.5);border-radius:12px;padding:11px 24px;font-family:Cairo;font-weight:900;font-size:.88rem;cursor:pointer;">أعد الرحلة</button>'
    +'<button onclick="hhCloseStory()" style="background:linear-gradient(135deg,#B8924A,#8A6D2E);color:#fff;border:none;border-radius:12px;padding:11px 28px;font-family:Cairo;font-weight:900;font-size:.88rem;cursor:pointer;">إنهاء</button>'
    +'</div></div>';
}
function hhCloseStory(){
  var e=document.getElementById('hh-story'); if(e) e.remove();
  _hhStory=null;
  if(typeof hhOpenSchool==='function' && document.getElementById('hh-school')===null){ /* لا نعيد الفتح تلقائياً */ }
}

// ═══════════════════════════════════════════════════════════════════
// برامج القادة — بنية قابلة للتوسع · أولها: القائد المُلهِم
// ═══════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════
// برنامج «القائد المُلهِم» — مهارات الإلقاء والتحدث أمام الجمهور
// وصول مقيّد بصلاحية · تمارين عملية · اختبارات
// ═══════════════════════════════════════════════════════════════════

var _hhSchProg = {};
var _hhSchRole = 'student';   // student | teacher

// ═══ دعم الفصلين: الفصل الثاني (الافتراضي) والفصل الأول ═══
var _hhSchTerm = 't2';
function hhSchData(){
  return (_hhSchTerm === 't1' && window._HH_SCHOOL_T1) ? window._HH_SCHOOL_T1 : window._HH_SCHOOL;
}
function hhSchSetTerm(t){
  _hhSchTerm = (t === 't1' && window._HH_SCHOOL_T1) ? 't1' : 't2';
  hhSchLoad();
}
function _hhSchKey(){ return _HH_SCH_KEY + (_hhSchTerm === 't1' ? '_t1' : ''); }

function hhSchLoad(){
  try{ _hhSchProg = JSON.parse(localStorage.getItem(_hhSchKey()) || '{}') || {}; }
  catch(e){ _hhSchProg = {}; }
  return _hhSchProg;
}
function hhSchSave(){
  try{
    localStorage.setItem(_hhSchKey(), JSON.stringify(_hhSchProg));
    if(typeof firebase!=='undefined' && firebase.firestore && typeof currentUser!=='undefined' && currentUser){
      firebase.firestore().collection('school_progress').doc(currentUser.uid)
        .set({ progress:_hhSchProg, name:(currentUser.displayName||currentUser.email||''),
               updatedAt:new Date().toISOString() }, {merge:true}).catch(function(){});
    }
  }catch(e){}
}
hhSchLoad();

function hhSchUnitState(uIdx){
  var S = hhSchData(); if(!S) return 'locked';
  if(uIdx === 0) return _hhSchProg['u'+uIdx+'_mastery'] >= S.masteryPass ? 'done' : 'open';
  var prev = _hhSchProg['u'+(uIdx-1)+'_mastery'] || 0;
  if(_hhSchProg['override_u'+uIdx]) return _hhSchProg['u'+uIdx+'_mastery'] >= S.masteryPass ? 'done' : 'open';
  if(prev >= S.masteryPass) return _hhSchProg['u'+uIdx+'_mastery'] >= S.masteryPass ? 'done' : 'open';
  return 'locked';
}
function hhSchAttempts(uIdx){ return _hhSchProg['u'+uIdx+'_attempts'] || 0; }

// ── الواجهة الرئيسة ──
function hhOpenSchool(){
  var S = hhSchData();
  if(!S){ if(typeof toast==='function') toast('لم تُحمَّل بيانات مدرستي','warn'); return; }
  hhSchLoad();
  var old=document.getElementById('hh-school'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-school';
  ov.style.cssText='position:fixed;inset:0;background:rgba(30,6,15,.72);z-index:999974;display:flex;align-items:flex-start;justify-content:center;padding:16px;overflow-y:auto;direction:rtl;';

  var cards = S.units.map(function(U, i){
    var st = hhSchUnitState(i);
    var mastery = _hhSchProg['u'+i+'_mastery'] || 0;
    var col = st==='done' ? '#3D6B53' : st==='open' ? '#1F4E79' : '#999';
    var bg  = st==='done' ? '#EBF2EE' : st==='open' ? '#E9EEF8' : '#F3F0F1';
    var badge = st==='done' ? 'أُتقنت '+mastery+'%' : st==='open' ? 'متاحة الآن' : 'مقفلة';
    var lessons = U.lessons.map(function(L, j){
      var qc = (_hhSchProg[L.id+'_quick']||0), fc = (_hhSchProg[L.id+'_full']||0);
      return '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:7px 10px;background:#fff;border-radius:9px;margin-bottom:5px;'+(st==='locked'?'opacity:.5;':'')+'">'
        + '<div style="font-size:.78rem;font-weight:800;color:#333;flex:1;min-width:0;">'+esc(L.title)+'</div>'
        + (st!=='locked'
            ? '<div style="display:flex;gap:4px;flex-wrap:wrap;">'
              + '<button onclick="hhSchLesson('+i+','+j+',&quot;material&quot;)" style="background:#FDF3DD;color:#8A6D2E;border:1px solid #B8924A;border-radius:7px;padding:4px 9px;font-family:Cairo;font-weight:900;font-size:.65rem;cursor:pointer;">المادة</button>'
              + '<button onclick="hhSchLesson('+i+','+j+',&quot;summary&quot;)" style="background:#F5E9EE;color:#8A1538;border:1px solid #8A1538;border-radius:7px;padding:4px 9px;font-family:Cairo;font-weight:900;font-size:.65rem;cursor:pointer;">الملخص</button>'
              + (hhStoryAvailable(L.id) ? '<button onclick="hhStartStory(&quot;'+L.id+'&quot;)" style="background:linear-gradient(135deg,#5E0E26,#3D0918);color:#fff;border:none;border-radius:7px;padding:4px 9px;font-family:Cairo;font-weight:900;font-size:.65rem;cursor:pointer;">القصة</button>' : '')
              + '<button onclick="hhSchTest('+i+','+j+',&quot;quick&quot;)" style="background:#E9EEF8;color:#1F4E79;border:1px solid #1F4E79;border-radius:7px;padding:4px 9px;font-family:Cairo;font-weight:900;font-size:.65rem;cursor:pointer;">سريع'+(qc?' '+qc+'%':'')+'</button>'
              + '<button onclick="hhSchTest('+i+','+j+',&quot;full&quot;)" style="background:#EBF2EE;color:#3D6B53;border:1px solid #3D6B53;border-radius:7px;padding:4px 9px;font-family:Cairo;font-weight:900;font-size:.65rem;cursor:pointer;">شامل'+(fc?' '+fc+'%':'')+'</button>'
              + '</div>'
            : '<span style="font-size:.68rem;color:#aaa;font-weight:800;">مقفل</span>')
        + '</div>';
    }).join('');

    var attempts = hhSchAttempts(i);
    var support = (attempts >= 2 && st === 'open')
      ? '<div style="background:#FDF3DD;border:1.5px solid #B8924A;border-radius:9px;padding:9px 11px;margin-top:6px;font-size:.74rem;color:#8A6D2E;font-weight:800;line-height:1.7;">'
        + 'حاولت '+attempts+' مرات — راجع الملخصات ثم أعد المحاولة. '
        + '<button onclick="hhSchSupport('+i+')" style="background:#B8924A;color:#fff;border:none;border-radius:7px;padding:4px 11px;font-family:Cairo;font-weight:900;font-size:.68rem;cursor:pointer;">مسار الدعم</button></div>'
      : '';

    var topCol = st==='done' ? '#3D6B53' : st==='open' ? '#8A1538' : '#C9BFC3';
    return '<div style="background:#fff;border:1px solid '+(st==='locked'?'#DDD6C8':'#B8924A')+';border-top:3px solid '+topCol+';border-radius:0 0 14px 14px;padding:13px;margin-bottom:12px;box-shadow:0 3px 12px rgba(94,14,38,.06);">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:9px;">'
      +   '<div style="font-weight:700;font-size:1.02rem;color:'+topCol+';">'+esc(U.unit)+'</div>'
      +   '<span style="background:'+(st==='locked'?'#C9BFC3':'linear-gradient(135deg,#EAD9B0,#B8924A)')+';color:'+(st==='locked'?'#fff':'#3D0918')+';border-radius:99px;padding:2px 12px;font-size:.76rem;font-weight:700;border:1px solid '+(st==='locked'?'transparent':'#FDF3DD')+';">'+badge+'</span>'
      + '</div>'
      + lessons
      + (st!=='locked'
          ? '<button onclick="hhSchTest('+i+',-1,&quot;mastery&quot;)" style="width:100%;background:'+(st==='done'?'linear-gradient(135deg,#3D6B53,#274a38)':'linear-gradient(135deg,#EAD9B0,#B8924A)')+';color:'+(st==='done'?'#fff':'#3D0918')+';border:1px solid '+(st==='done'?'#3D6B53':'#FDF3DD')+';border-radius:11px;padding:11px;font-weight:700;font-size:.95rem;cursor:pointer;margin-top:7px;box-shadow:0 4px 12px rgba(138,21,56,.18);">'
            + (st==='done' ? 'أعد اختبار الإتقان ('+mastery+'%)' : 'اختبار الإتقان — يفتح الوحدة التالية ('+S.masteryPass+'%)')
            + '</button>'
          : '<div style="text-align:center;font-size:.74rem;color:#888;font-weight:800;padding:8px;">اجتز اختبار إتقان الوحدة السابقة لفتح هذه الوحدة</div>'
            + ((_hhMyRole==='teacher'||(typeof hhIsAdmin==='function'&&hhIsAdmin())) ? '<button onclick="hhSchOverride('+i+')" style="width:100%;background:#fff;color:#8A6D2E;border:1.5px solid #B8924A;border-radius:9px;padding:7px;font-family:Cairo;font-weight:900;font-size:.72rem;cursor:pointer;margin-top:5px;">فتح استثنائي (المعلم)</button>' : ''))
      + support
      + '</div>';
  }).join('');

  var doneCount = S.units.filter(function(U,i){ return hhSchUnitState(i)==='done'; }).length;
  var pct = Math.round(doneCount / S.units.length * 100);

  var orn='<svg width="110" height="110" viewBox="0 0 70 70" style="position:absolute;top:-30px;left:-30px;opacity:.11;pointer-events:none;" aria-hidden="true"><g fill="none" stroke="#D4BC85" stroke-width="1.2"><circle cx="35" cy="35" r="30"/><circle cx="35" cy="35" r="21"/><path d="M35 5v60M5 35h60M14 14l42 42M56 14L14 56"/></g></svg>';
  ov.innerHTML = '<div style="background:#FBF7F0;border:2px solid #B8924A;border-radius:20px;max-width:680px;width:100%;overflow:hidden;margin-bottom:24px;">'
    + '<div style="background:linear-gradient(175deg,#4A0B1E,#5E0E26);color:#fff;padding:16px 18px 14px;position:relative;overflow:hidden;border-bottom:2px solid #B8924A;">'
    +   orn
    +   '<div style="display:flex;justify-content:space-between;align-items:center;position:relative;">'
    +     '<div style="font-weight:700;font-size:1.35rem;">المدرسة</div>'
    +     '<button onclick="hhCloseSchool()" style="background:rgba(212,188,133,.15);border:1px solid rgba(212,188,133,.5);border-radius:9px;width:30px;height:30px;color:#FDF3DD;font-size:1rem;cursor:pointer;">✕</button></div>'
    +   '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;position:relative;">'
    +     '<span style="background:rgba(212,188,133,.16);border:1px solid #B8924A;color:#FDF3DD;border-radius:99px;padding:2px 12px;font-size:.82rem;font-weight:700;">'+esc(S.grade)+'</span>'
    +     '<span style="background:rgba(212,188,133,.16);border:1px solid #B8924A;color:#FDF3DD;border-radius:99px;padding:2px 12px;font-size:.82rem;font-weight:700;">'+esc(S.subject)+'</span>'
    +     '<span style="background:rgba(212,188,133,.16);border:1px solid #B8924A;color:#FDF3DD;border-radius:99px;padding:2px 12px;font-size:.82rem;font-weight:700;">'+esc(S.term)+'</span>'
    +   '</div>'
    +   '<div style="display:flex;align-items:center;gap:12px;margin-top:12px;position:relative;">'
    +     '<span style="width:46px;height:46px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#F5E6C4,#B8924A 70%);border:2px solid #FDF3DD;display:inline-flex;align-items:center;justify-content:center;color:#3D0918;font-weight:700;font-size:.92rem;box-shadow:0 0 0 3px rgba(212,188,133,.25);flex-shrink:0;">'+pct+'%</span>'
    +     '<div style="flex:1;">'
    +       '<div style="background:rgba(255,255,255,.13);border-radius:99px;height:9px;border:1px solid rgba(212,188,133,.3);"><div style="background:linear-gradient(90deg,#EAD9B0,#B8924A);border-radius:99px;height:100%;width:'+pct+'%;transition:width .5s;"></div></div>'
    +       '<div style="font-size:.8rem;color:#EAD9B0;margin-top:4px;font-weight:700;">أتممت '+doneCount+' من '+S.units.length+' وحدات في رحلة الإتقان</div>'
    +     '</div>'
    +   '</div>'
    + '</div>'
    + '<div style="padding:15px 18px;">'
    +   (function(){
        var isAdm = (typeof hhIsAdmin==='function' && hhIsAdmin());
        var isTch = (_hhMyRole==='teacher') || isAdm;
        var roleLbl = isAdm ? 'مدير المنصة' : isTch ? 'معلم معتمد' : 'طالب';
        var roleCol = isAdm ? '#8A1538' : isTch ? '#1F4E79' : '#3D6B53';
        var cls = (_hhMyClasses && _hhMyClasses.length)
          ? _hhMyClasses.map(function(c){ return esc(c.name||''); }).join(' · ') : '';
        function svc(on, col, dark, name, d, ico){
          return '<button onclick="'+on+'" style="display:flex;flex-direction:column;align-items:center;gap:7px;background:#fff;border:1.5px solid '+col+';border-radius:14px;padding:13px 8px;font-family:Cairo;cursor:pointer;text-align:center;box-shadow:0 3px 10px rgba(94,14,38,.07);transition:transform .15s,box-shadow .15s;" onmouseover="this.style.transform=\'translateY(-3px)\';this.style.boxShadow=\'0 8px 18px rgba(94,14,38,.16)\'" onmouseout="this.style.transform=\'\';this.style.boxShadow=\'0 3px 10px rgba(94,14,38,.07)\'">'
            + '<span style="width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,'+col+','+dark+');display:inline-flex;align-items:center;justify-content:center;">'
            + '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'+ico+'</svg></span>'
            + '<span style="font-weight:900;font-size:.8rem;color:'+col+';">'+name+'</span>'
            + '<span style="font-weight:700;font-size:.64rem;color:#999;line-height:1.6;">'+d+'</span>'
            + '</button>';
        }
        var I = {
          approve:'<path d="M12 3L2 8l10 5 10-5-10-5z"/><path d="M6 10.5V15c0 1.4 2.7 2.8 6 2.8s6-1.4 6-2.8v-4.5"/><path d="M9 19l2 2 4-4"/>',
          classes:'<path d="M17 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9.5" cy="8" r="3.5"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M15.5 4.6a3.5 3.5 0 010 6.8"/>',
          gradebook:'<path d="M4 4h13a3 3 0 013 3v13H7a3 3 0 01-3-3V4z"/><path d="M8 4v16"/><path d="M12 9h5"/><path d="M12 13h5"/>',
          curriculum:'<path d="M4 4h7a3 3 0 013 3v13a2.5 2.5 0 00-2.5-2H4V4z"/><path d="M20 4h-7a3 3 0 00-3 3v13a2.5 2.5 0 012.5-2H20V4z"/>',
          join:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M7 9h4"/><path d="M7 13h2"/><path d="M14.5 11.5l2 2 3.5-3.5"/>',
          request:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 016-6h1"/><path d="M17 14v6"/><path d="M14 17h6"/>'
        };
        var services = '';
        if(isAdm) services += svc('hhAdminTeachers()','#8A1538','#5E0E26','اعتماد المعلمين','مراجعة طلبات الاعتماد', I.approve);
        if(isTch){
          services += svc('hhOpenClasses()','#1F4E79','#12304d','صفوفي','إنشاء الصفوف وأكواد الدعوة', I.classes);
          services += svc('hhOpenGradebook()','#8A6D2E','#5E4A1E','دفتر المتابعة','درجات وحضور وسلوك', I.gradebook);
          services += svc('hhOpenCurriculum()','#1F4E79','#12304d','مركز المناهج','رفع الدروس وتوليد المحتوى', I.curriculum);
        } else {
          services += svc('hhJoinClassPrompt()','#3D6B53','#26443A','انضم بكود','ادخل صف معلمك برمز من 6 خانات', I.join);
          services += svc('hhRequestTeacher()','#8A6D2E','#5E4A1E','أنا معلم','اطلب اعتمادك كمعلم', I.request);
        }
        return '<div style="background:#fff;border:1.5px solid '+roleCol+';border-radius:13px;padding:11px 12px;margin-bottom:12px;">'
          + '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px;">'
          + '<span style="background:'+roleCol+';color:#fff;border-radius:8px;padding:3px 12px;font-size:.7rem;font-weight:900;">'+roleLbl+'</span>'
          + (cls?'<span style="font-size:.72rem;color:#888;font-weight:700;">'+cls+'</span>':'')
          + '</div>'
          + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:9px;">'+services+'</div>'
          + '</div>';
      })()
    +   cards
    +   ((_hhMyRole==='teacher'||(typeof hhIsAdmin==='function'&&hhIsAdmin()))
        ? '<button onclick="hhSchTeacherPanel()" style="width:100%;background:linear-gradient(135deg,#1F4E79,#12304d);color:#fff;border:none;border-radius:11px;padding:10px;font-family:Cairo;font-weight:900;font-size:.82rem;cursor:pointer;margin-top:6px;">لوحة متابعة الصف</button>'
        : '')
    + '</div></div>';
  document.body.appendChild(ov);
}
function hhCloseSchool(){ var e=document.getElementById('hh-school'); if(e) e.remove(); }

/* ═══════════════════════════════════════════════════════════
   معالج الدخول المتدرج لمدرستي (ترحيب ← الدور ← الوجهة ← الصف ← المادة ← الفصل)
   ═══════════════════════════════════════════════════════════ */
var _hhSchWiz = { step:'welcome', role:null };

function hhSchoolEntry(){
  _hhSchWiz = { step:'welcome', role: (localStorage.getItem('hh_sch_wiz_role')||null) };
  hhSchWizRender();
}
function hhSchWizClose(){ var e=document.getElementById('hh-sch-wiz'); if(e) e.remove(); }
function hhSchWizGo(step){ _hhSchWiz.step=step; hhSchWizRender(); }
function hhSchWizRole(r){
  _hhSchWiz.role=r; try{ localStorage.setItem('hh_sch_wiz_role', r); }catch(e){}
  hhSchWizGo('grade');
}
function hhSchWizFinish(term){
  try{ localStorage.setItem('hh_sch_wiz_done','1'); }catch(e){}
  hhSchSetTerm(term || 't2');
  hhSchWizClose(); hhOpenSchool();
}
function hhSchWizSoon(){ if(typeof toast==='function') toast('قريباً بإذن الله — التوسعة مستمرة','warn'); }

/* أيقونات SVG احترافية للمعالج (بلا أي إيموجي) */
function _hhSchWizIco(name, col){
  var s='width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="'+col+'" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  var body={
    school:'<path d="M3 21h18"/><path d="M5 21V9l7-5 7 5v12"/><path d="M9 21v-5h6v5"/><path d="M12 4v2"/>',
    teacher:'<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4"/><path d="M8 20h8"/><path d="M7 8h6"/><path d="M7 11h4"/>',
    student:'<path d="M12 4L2 9l10 5 10-5-10-5z"/><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"/><path d="M22 9v5"/>',
    social:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.4 3.8 5.6 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.6-3.8-9S9.5 5.4 12 3z"/>',
    science:'<path d="M9 3h6"/><path d="M10 3v6L4.5 18.5A2 2 0 006.3 21h11.4a2 2 0 001.8-2.5L14 9V3"/><path d="M7.5 14h9"/>',
    term:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M3 10h18"/>',
    units:'<path d="M4 5a2 2 0 012-2h5v18H6a2 2 0 01-2-2V5z"/><path d="M20 5a2 2 0 00-2-2h-5v18h5a2 2 0 002-2V5z"/>'
  }[name]||'';
  return '<svg '+s+'>'+body+'</svg>';
}
/* شارة رقم الصف (رقم داخل درع صغير بدل الإيموجي) */
function _hhSchWizNum(n, col){
  return '<svg width="26" height="26" viewBox="0 0 24 24" fill="none">'
    + '<path d="M12 2l8 3v7c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5l8-3z" stroke="'+col+'" stroke-width="1.8" stroke-linejoin="round"/>'
    + '<text x="12" y="15.5" text-anchor="middle" font-family="Cairo,Arial" font-weight="900" font-size="9.5" fill="'+col+'">'+n+'</text>'
    + '</svg>';
}

function _hhSchWizOpt(o){
  /* o: {icon(html svg), title, sub, on, soon, color} */
  var col = o.color || '#8A1538';
  if(o.soon){
    return '<button onclick="hhSchWizSoon()" style="display:flex;align-items:center;gap:12px;width:100%;background:#F3F0F1;border:2px dashed #C9BFC3;border-radius:14px;padding:14px 16px;font-family:Cairo;cursor:pointer;text-align:right;opacity:.75;">'
      + '<span style="flex-shrink:0;display:inline-flex;">'+o.icon+'</span>'
      + '<span style="flex:1;min-width:0;"><span style="display:block;font-weight:900;font-size:.92rem;color:#777;">'+o.title+'</span>'
      + (o.sub?'<span style="display:block;font-weight:700;font-size:.72rem;color:#999;margin-top:2px;">'+o.sub+'</span>':'')+'</span>'
      + '<span style="background:#C9BFC3;color:#fff;border-radius:8px;padding:3px 11px;font-size:.66rem;font-weight:900;flex-shrink:0;">قريباً</span>'
      + '</button>';
  }
  return '<button onclick="'+o.on+'" style="display:flex;align-items:center;gap:12px;width:100%;background:#fff;border:2px solid '+col+';border-radius:14px;padding:14px 16px;font-family:Cairo;cursor:pointer;text-align:right;box-shadow:0 3px 10px rgba(94,14,38,.08);transition:transform .15s;" onmouseover="this.style.transform=\'translateY(-2px)\'" onmouseout="this.style.transform=\'\'">'
    + '<span style="flex-shrink:0;display:inline-flex;">'+o.icon+'</span>'
    + '<span style="flex:1;min-width:0;"><span style="display:block;font-weight:900;font-size:.92rem;color:'+col+';">'+o.title+'</span>'
    + (o.sub?'<span style="display:block;font-weight:700;font-size:.72rem;color:#888;margin-top:2px;">'+o.sub+'</span>':'')+'</span>'
    + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+col+'" stroke-width="2.5" stroke-linecap="round" style="flex-shrink:0;"><polyline points="15 18 9 12 15 6"/></svg>'
    + '</button>';
}

function hhSchWizRender(){
  var w=_hhSchWiz;
  var old=document.getElementById('hh-sch-wiz'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-sch-wiz';
  ov.style.cssText='position:fixed;inset:0;background:rgba(30,6,15,.78);z-index:999974;display:flex;align-items:center;justify-content:center;padding:16px;overflow-y:auto;direction:rtl;';
  ov.onclick=function(ev){ if(ev.target===ov) hhSchWizClose(); };

  var steps=['role','grade','subject','term'];
  var idx=steps.indexOf(w.step);
  var dots = (idx>=0)
    ? '<div style="display:flex;gap:6px;justify-content:center;margin-top:10px;">'
      + steps.map(function(_,i){ return '<span style="width:'+(i===idx?'22px':'8px')+';height:8px;border-radius:99px;background:'+(i<=idx?'#D4BC85':'rgba(255,255,255,.25)')+';transition:all .3s;"></span>'; }).join('')
      + '</div>'
    : '';

  var back = {role:'welcome', grade:'role', subject:'grade', term:'subject'}[w.step];
  var backBtn = back
    ? '<button onclick="hhSchWizGo(\''+back+'\')" style="background:none;border:none;color:#fff;font-family:Cairo;font-weight:900;font-size:.78rem;cursor:pointer;display:flex;align-items:center;gap:4px;opacity:.85;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>رجوع</button>'
    : '<span></span>';

  var title='', sub='', body='';

  if(w.step==='welcome'){
    var done = localStorage.getItem('hh_sch_wiz_done')==='1';
    title='أهلاً بك في المدرسة';
    sub='رحلتك التعليمية المتدرجة: وحدات ودروس وقصص واختبارات إتقان تفتح الطريق خطوةً بعد خطوة';
    body = '<div style="text-align:center;padding:6px 0 2px;">'
      + '<div style="display:flex;justify-content:center;margin-bottom:12px;">'
      +   '<span style="width:64px;height:64px;border-radius:18px;background:linear-gradient(135deg,#8A1538,#5E0E26);border:2px solid #B8924A;display:inline-flex;align-items:center;justify-content:center;">'
      +   '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#D4BC85" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V9l7-5 7 5v12"/><path d="M9 21v-5h6v5"/><path d="M12 4v2"/></svg>'
      +   '</span></div>'
      + '<button onclick="hhSchWizGo(\'role\')" style="width:100%;background:linear-gradient(135deg,#8A1538,#5E0E26);color:#fff;border:2px solid #B8924A;border-radius:14px;padding:14px;font-family:Cairo;font-weight:900;font-size:1rem;cursor:pointer;box-shadow:0 6px 18px rgba(94,14,38,.35);">ابدأ الرحلة</button>'
      + (done ? '<button onclick="hhSchWizFinish()" style="width:100%;background:#fff;color:#3D6B53;border:2px solid #3D6B53;border-radius:14px;padding:11px;font-family:Cairo;font-weight:900;font-size:.85rem;cursor:pointer;margin-top:9px;">الدخول مباشرة إلى وحداتي</button>' : '')
      + '</div>';
  }
  else if(w.step==='role'){
    title='من أنت؟'; sub='اختر دورك لنُهيّئ لك التجربة المناسبة';
    body = '<div style="display:grid;gap:10px;">'
      + _hhSchWizOpt({icon:_hhSchWizIco('teacher','#1F4E79'), title:'معلم', sub:'إدارة الصفوف ودفتر المتابعة ومتابعة تقدم الطلاب', on:'hhSchWizRole(\'teacher\')', color:'#1F4E79'})
      + _hhSchWizOpt({icon:_hhSchWizIco('student','#3D6B53'), title:'طالب', sub:'التعلم المتدرج والاختبارات وشهادات التفوق', on:'hhSchWizRole(\'student\')', color:'#3D6B53'})
      + '</div>';
  }
  else if(w.step==='grade'){
    title='اختر الصف'; sub='الصفوف المتاحة في المدرسة';
    body = '<div style="display:grid;gap:10px;">'
      + _hhSchWizOpt({icon:_hhSchWizNum('7','#8A1538'), title:'الصف السابع', sub:'المسار متاح كاملاً', on:'hhSchWizGo(\'subject\')', color:'#8A1538'})
      + _hhSchWizOpt({icon:_hhSchWizNum('8','#999'), title:'الصف الثامن', soon:true})
      + _hhSchWizOpt({icon:_hhSchWizNum('9','#999'), title:'الصف التاسع', soon:true})
      + '</div>';
  }
  else if(w.step==='subject'){
    title='اختر المادة'; sub='مواد الصف السابع';
    body = '<div style="display:grid;gap:10px;">'
      + _hhSchWizOpt({icon:_hhSchWizIco('social','#8A1538'), title:'الدراسات الاجتماعية', sub:'6 وحدات كاملة بدروسها وقصصها واختباراتها', on:'hhSchWizGo(\'term\')', color:'#8A1538'})
      + _hhSchWizOpt({icon:_hhSchWizIco('science','#999'), title:'العلوم', soon:true})
      + '</div>';
  }
  else if(w.step==='term'){
    title='اختر الفصل الدراسي'; sub='الدراسات الاجتماعية — الصف السابع';
    var t1ok = !!window._HH_SCHOOL_T1;
    body = '<div style="display:grid;gap:10px;">'
      + (t1ok
          ? _hhSchWizOpt({icon:_hhSchWizIco('term','#8A1538'), title:'الفصل الدراسي الأول', sub:'6 وحدات: الأرض من حولي، بلاد الرافدين، السلطات، السكان، العباسية، الأمن الوطني', on:'hhSchWizFinish(\'t1\')', color:'#8A1538'})
          : _hhSchWizOpt({icon:_hhSchWizIco('term','#999'), title:'الفصل الدراسي الأول', soon:true}))
      + _hhSchWizOpt({icon:_hhSchWizIco('units','#3D6B53'), title:'الفصل الدراسي الثاني', sub:'6 وحدات — ابدأ الآن', on:'hhSchWizFinish(\'t2\')', color:'#3D6B53'})
      + '</div>';
  }

  ov.innerHTML = '<div style="background:#FAFBFD;border:2px solid #B8924A;border-radius:22px;max-width:480px;width:100%;overflow:hidden;font-family:Cairo,Tajawal,sans-serif;box-shadow:0 24px 60px rgba(0,0,0,.4);">'
    + '<div style="background:linear-gradient(135deg,#5E0E26,#3D0918);color:#fff;padding:16px 18px;">'
    +   '<div style="display:flex;justify-content:space-between;align-items:center;">'
    +     backBtn
    +     '<button onclick="hhSchWizClose()" style="background:none;border:none;color:#fff;font-size:1.15rem;cursor:pointer;">✕</button>'
    +   '</div>'
    +   '<div style="font-weight:900;font-size:1.15rem;text-align:center;margin-top:4px;">'+title+'</div>'
    +   '<div style="font-size:.76rem;opacity:.85;text-align:center;margin-top:4px;line-height:1.8;">'+sub+'</div>'
    +   dots
    + '</div>'
    + '<div style="padding:18px;">'+body+'</div>'
    + '</div>';
  document.body.appendChild(ov);
}
function hhSchSetRole(r){ _hhSchRole=r; hhOpenSchool(); }
function hhSchOverride(i){
  _hhSchProg['override_u'+i]=true; hhSchSave(); hhOpenSchool();
  if(typeof toast==='function') toast('فُتحت الوحدة استثنائياً','success');
}
function hhSchSupport(i){
  var U=hhSchData().units[i];
  var html = U.lessons.map(function(L){
    return '<div style="background:#fff;border-radius:10px;padding:11px;margin-bottom:8px;">'
      + '<div style="font-weight:900;font-size:.82rem;color:#8A6D2E;margin-bottom:5px;">'+esc(L.title)+'</div>'
      + L.summary.map(function(s){ return '<div style="font-size:.77rem;color:#444;line-height:1.9;margin-bottom:4px;">• '+esc(s)+'</div>'; }).join('')
      + (L.terms&&L.terms.length ? '<div style="margin-top:6px;padding-top:6px;border-top:1px solid #eee;">'
          + L.terms.map(function(t){ return '<div style="font-size:.75rem;"><b style="color:#1F4E79;">'+esc(t[0])+':</b> '+esc(t[1])+'</div>'; }).join('')
          + '</div>' : '')
      + '</div>';
  }).join('');
  hhSchModal('مسار الدعم — '+U.unit, html, '#B8924A');
}
function hhSchLesson(ui, li, kind){
  var L = hhSchData().units[ui].lessons[li];
  if(kind==='summary'){
    var h = L.summary.map(function(s,i){
      return '<div style="background:#fff;border-right:3px solid #8A1538;border-radius:9px;padding:10px 12px;margin-bottom:7px;font-size:.82rem;line-height:1.95;color:#333;">'+esc(s)+'</div>';
    }).join('')
    + (L.terms&&L.terms.length ? '<div style="background:#FDF8EC;border:1.5px solid #E3D9C6;border-radius:10px;padding:11px;margin-top:8px;">'
        + '<div style="font-weight:900;font-size:.8rem;color:#8A6D2E;margin-bottom:6px;">المصطلحات</div>'
        + L.terms.map(function(t){ return '<div style="font-size:.78rem;margin-bottom:4px;"><b style="color:#1F4E79;">'+esc(t[0])+':</b> '+esc(t[1])+'</div>'; }).join('')
        + '</div>' : '');
    hhSchModal('ملخص — '+L.title, h, '#8A1538');
    return;
  }
  // المادة الدراسية: أسئلة المعلم (عرض الأسئلة والإجابات للمراجعة)
  var h2 = '<div style="font-size:.76rem;color:#777;margin-bottom:9px;font-weight:700;">أسئلة المعلم عن الدرس — للمراجعة قبل الاختبار</div>'
    + L.q.map(function(q,i){
        var col=q.d==='hard'?'#c0392b':q.d==='med'?'#b5801f':'#3D6B53';
        return '<div style="background:#fff;border-radius:9px;padding:10px 12px;margin-bottom:6px;">'
          + '<div style="display:flex;gap:5px;margin-bottom:3px;"><span style="background:'+col+';color:#fff;border-radius:6px;padding:1px 7px;font-size:.62rem;font-weight:900;">'+({easy:'سهل',med:'متوسط',hard:'صعب'}[q.d])+'</span>'
          + '<span style="background:#E9EEF8;color:#1F4E79;border-radius:6px;padding:1px 7px;font-size:.62rem;font-weight:900;">'+esc(q.b||'')+'</span></div>'
          + '<div style="font-weight:800;font-size:.8rem;color:#333;">'+(i+1)+'. '+esc(q.q)+'</div>'
          + '<div style="font-size:.75rem;color:#3D6B53;font-weight:800;margin-top:3px;">✓ '+esc(q.a)+'</div></div>';
      }).join('');
  hhSchModal('المادة الدراسية — '+L.title, h2, '#8A6D2E');
}
function hhSchModal(title, html, color){
  var old=document.getElementById('hh-sch-modal'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-sch-modal';
  ov.style.cssText='position:fixed;inset:0;background:rgba(30,6,15,.75);z-index:999995;display:flex;align-items:flex-start;justify-content:center;padding:16px;overflow-y:auto;direction:rtl;';
  ov.onclick=function(e){ if(e.target===ov) ov.remove(); };
  ov.innerHTML='<div onclick="event.stopPropagation()" style="background:#FAFBFD;border:2px solid '+color+';border-radius:18px;max-width:600px;width:100%;overflow:hidden;font-family:Cairo,Tajawal,sans-serif;margin-bottom:20px;">'
    +'<div style="background:'+color+';color:#fff;padding:13px 17px;display:flex;justify-content:space-between;align-items:center;">'
    +'<div style="font-weight:900;font-size:.88rem;">'+esc(title)+'</div>'
    +'<button onclick="document.getElementById(\'hh-sch-modal\').remove()" style="background:none;border:none;color:#fff;font-size:1.1rem;cursor:pointer;">✕</button></div>'
    +'<div style="padding:14px 17px;">'+html+'</div></div>';
  document.body.appendChild(ov);
}

// ── الاختبارات ──
var _hhTest = null;
function hhSchTest(ui, li, kind){
  var S=hhSchData(), U=S.units[ui];
  var pool=[], title='';
  if(kind==='mastery'){
    U.lessons.forEach(function(L){ pool=pool.concat(L.q.map(function(q){return Object.assign({},q,{_l:L.title});})); });
    pool = pool.slice().sort(function(){return Math.random()-.5;}).slice(0,12);
    title='اختبار الإتقان — '+U.unit;
  } else {
    var L=U.lessons[li];
    pool = L.q.slice().sort(function(){return Math.random()-.5;});
    pool = kind==='quick' ? pool.slice(0,5) : pool.slice(0,10);
    title = (kind==='quick'?'اختبار سريع — ':'اختبار شامل — ') + L.title;
  }
  _hhTest = { ui:ui, li:li, kind:kind, qs:pool, idx:0, answers:[], title:title };
  hhSchRenderQ();
}
function hhSchRenderQ(){
  var T=_hhTest; if(!T) return;
  if(T.idx >= T.qs.length){ hhSchFinish(); return; }
  var q=T.qs[T.idx];
  var opts=(q.o||[]).slice().sort(function(){return Math.random()-.5;});
  var old=document.getElementById('hh-sch-test'); if(old) old.remove();
  var ov=document.createElement('div'); ov.id='hh-sch-test';
  ov.style.cssText='position:fixed;inset:0;background:#fff;z-index:999996;display:flex;align-items:center;justify-content:center;padding:20px;direction:rtl;font-family:Cairo,Tajawal,sans-serif;';
  var pct=Math.round(T.idx/T.qs.length*100);
  ov.innerHTML='<div style="max-width:560px;width:100%;">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">'
    +'<span style="font-weight:900;font-size:.84rem;color:#5E0E26;">'+esc(T.title)+'</span>'
    +'<span style="font-size:.74rem;color:#999;font-weight:800;">'+(T.idx+1)+' / '+T.qs.length+'</span></div>'
    +'<div style="background:#eee;border-radius:99px;height:8px;margin-bottom:18px;"><div style="background:linear-gradient(90deg,#8A1538,#B8924A);border-radius:99px;height:8px;width:'+pct+'%;transition:width .3s;"></div></div>'
    +'<div style="background:#F7FBFF;border:2px solid #1F4E79;border-radius:16px;padding:20px;margin-bottom:14px;">'
    +'<div style="font-size:1.05rem;font-weight:900;color:#1F4E79;line-height:1.8;">'+esc(q.q)+'</div></div>'
    +'<div style="display:flex;flex-direction:column;gap:8px;">'
    + opts.map(function(o,i){
        return '<button onclick="hhSchAnswer('+i+',this)" data-opt="'+esc(o)+'" style="background:#fff;border:1.5px solid #C9B37E;border-radius:12px;padding:12px 15px;font-family:Cairo;font-weight:800;font-size:.86rem;color:#333;cursor:pointer;text-align:right;transition:all .15s;">'+esc(o)+'</button>';
      }).join('')
    +'</div>'
    +'<button onclick="hhSchQuit()" style="background:none;border:none;color:#bbb;font-family:Cairo;font-weight:800;font-size:.76rem;cursor:pointer;margin-top:14px;">إنهاء الاختبار</button>'
    +'</div>';
  document.body.appendChild(ov);
}
function hhSchAnswer(i, btn){
  var T=_hhTest; if(!T) return;
  var q=T.qs[T.idx];
  var chosen=btn.getAttribute('data-opt');
  var correct = (chosen === q.a);
  T.answers.push({ q:q.q, a:q.a, chosen:chosen, correct:correct, d:q.d, b:q.b, l:q._l||'' });
  // تغذية راجعة بصرية فورية
  var all=btn.parentNode.querySelectorAll('button');
  all.forEach(function(b){
    b.disabled=true;
    if(b.getAttribute('data-opt')===q.a){ b.style.background='#EBF2EE'; b.style.borderColor='#3D6B53'; b.style.color='#3D6B53'; }
    else if(b===btn){ b.style.background='#F7ECEF'; b.style.borderColor='#c0392b'; b.style.color='#c0392b'; }
    else b.style.opacity='.5';
  });
  setTimeout(function(){ T.idx++; hhSchRenderQ(); }, 850);
}
function hhSchQuit(){ _hhTest=null; var e=document.getElementById('hh-sch-test'); if(e) e.remove(); }
function hhSchFinish(){
  var T=_hhTest; if(!T) return;
  var correct=T.answers.filter(function(a){return a.correct;}).length;
  var pct=Math.round(correct/T.answers.length*100);
  var S=hhSchData();
  var passed = pct >= S.masteryPass;

  // حفظ التقدم
  if(T.kind==='mastery'){
    var prevBest=_hhSchProg['u'+T.ui+'_mastery']||0;
    if(pct>prevBest) _hhSchProg['u'+T.ui+'_mastery']=pct;
    _hhSchProg['u'+T.ui+'_attempts']=(_hhSchProg['u'+T.ui+'_attempts']||0)+1;
  } else {
    var L=S.units[T.ui].lessons[T.li];
    var key=L.id+'_'+T.kind;
    if(pct > (_hhSchProg[key]||0)) _hhSchProg[key]=pct;
  }
  _hhSchProg['last']= new Date().toISOString();
  hhSchSave();
  if(typeof hhLogActivity==='function') hhLogActivity('generate','مدرستي: '+T.kind+' '+pct+'%');

  var wrong=T.answers.filter(function(a){return !a.correct;});
  var col = passed ? '#3D6B53' : pct>=50 ? '#b5801f' : '#c0392b';
  var msg = T.kind==='mastery'
    ? (passed ? 'أحسنت! اجتزت اختبار الإتقان وفُتحت الوحدة التالية.' : 'لم تجتز الإتقان بعد — تحتاج '+S.masteryPass+'%. راجع الملخصات وحاول مجدداً.')
    : (passed ? 'أداء ممتاز في هذا الاختبار.' : 'راجع النقاط التي أخطأت فيها ثم أعد المحاولة.');

  var e=document.getElementById('hh-sch-test'); if(e) e.remove();
  var ov=document.createElement('div'); ov.id='hh-sch-result';
  ov.style.cssText='position:fixed;inset:0;background:rgba(30,6,15,.8);z-index:999996;display:flex;align-items:flex-start;justify-content:center;padding:18px;overflow-y:auto;direction:rtl;font-family:Cairo,Tajawal,sans-serif;';
  ov.innerHTML='<div style="background:#fff;border:2px solid '+col+';border-radius:20px;max-width:560px;width:100%;overflow:hidden;margin-bottom:20px;">'
    +'<div style="background:'+col+';color:#fff;padding:20px;text-align:center;">'
    +'<div style="font-size:2.6rem;font-weight:900;line-height:1;">'+pct+'%</div>'
    +'<div style="font-size:.85rem;font-weight:800;margin-top:5px;">'+correct+' صحيحة من '+T.answers.length+'</div>'
    +'<div style="font-size:.78rem;opacity:.9;margin-top:7px;line-height:1.7;">'+esc(msg)+'</div></div>'
    +'<div style="padding:15px 18px;">'
    +(wrong.length
      ? '<div style="font-weight:900;font-size:.84rem;color:#5E0E26;margin-bottom:8px;">راجع هذه النقاط</div>'
        + wrong.map(function(w){
            return '<div style="background:#FDF8EC;border-right:3px solid #c0392b;border-radius:9px;padding:9px 11px;margin-bottom:6px;">'
              +'<div style="font-size:.79rem;font-weight:800;color:#333;">'+esc(w.q)+'</div>'
              +'<div style="font-size:.74rem;color:#c0392b;margin-top:2px;">إجابتك: '+esc(w.chosen)+'</div>'
              +'<div style="font-size:.74rem;color:#3D6B53;font-weight:800;">الصواب: '+esc(w.a)+'</div></div>';
          }).join('')
      : '<div style="text-align:center;color:#3D6B53;font-weight:900;font-size:.9rem;padding:10px;">إجابات كاملة بلا خطأ</div>')
    +'<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;">'
    +'<button onclick="hhSchCloseResult(true)" style="flex:1;background:linear-gradient(135deg,#8A1538,#5E0E26);color:#fff;border:none;border-radius:11px;padding:10px;font-weight:900;font-size:.82rem;cursor:pointer;">عودة لمدرستي</button>'
    +(!passed ? '<button onclick="hhSchRetry()" style="background:#E9EEF8;color:#1F4E79;border:1.5px solid #1F4E79;border-radius:11px;padding:10px 16px;font-weight:900;font-size:.82rem;cursor:pointer;">إعادة المحاولة</button>' : '')
    +'</div></div></div>';
  document.body.appendChild(ov);
  _hhTest=null;
}
function hhSchCloseResult(reopen){
  var e=document.getElementById('hh-sch-result'); if(e) e.remove();
  if(reopen) hhOpenSchool();
}
function hhSchRetry(){
  var e=document.getElementById('hh-sch-result'); if(e) e.remove();
  hhOpenSchool();
}

// ── لوحة متابعة المعلم ──
function hhSchTeacherPanel(){
  var S=hhSchData();
  var rows = S.units.map(function(U,i){
    var st=hhSchUnitState(i);
    var m=_hhSchProg['u'+i+'_mastery']||0;
    var at=hhSchAttempts(i);
    var col=m>=S.masteryPass?'#3D6B53':m>=50?'#b5801f':'#c0392b';
    var lessonRows = U.lessons.map(function(L){
      var q=_hhSchProg[L.id+'_quick']||0, f=_hhSchProg[L.id+'_full']||0;
      return '<tr style="background:#fff;"><td style="padding:5px 9px;font-size:.74rem;padding-right:20px;">'+esc(L.title)+'</td>'
        +'<td style="padding:5px;text-align:center;font-size:.74rem;font-weight:800;color:'+(q>=80?'#3D6B53':q?'#b5801f':'#ccc')+';">'+(q?q+'%':'—')+'</td>'
        +'<td style="padding:5px;text-align:center;font-size:.74rem;font-weight:800;color:'+(f>=80?'#3D6B53':f?'#b5801f':'#ccc')+';">'+(f?f+'%':'—')+'</td>'
        +'<td style="padding:5px;text-align:center;font-size:.7rem;color:#ccc;">—</td></tr>';
    }).join('');
    return '<tr style="background:#E9EEF8;"><td style="padding:7px 9px;font-weight:900;font-size:.78rem;">'+esc(U.unit)+'</td>'
      +'<td style="padding:7px;text-align:center;font-size:.72rem;font-weight:900;">'+(st==='done'?'أُتقنت':st==='open'?'متاحة':'مقفلة')+'</td>'
      +'<td style="padding:7px;text-align:center;font-weight:900;color:'+col+';font-size:.78rem;">'+(m?m+'%':'—')+'</td>'
      +'<td style="padding:7px;text-align:center;font-size:.74rem;">'+at+'</td></tr>'
      + lessonRows;
  }).join('');

  var html='<div style="font-size:.76rem;color:#777;margin-bottom:9px;font-weight:700;line-height:1.8;">'
    +'متابعة تقدّم الطالب في المسار. عند نشر المنصة، تجمع لوحة الإدارة بيانات كل الطلاب سحابياً.</div>'
    +'<div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;">'
    +'<thead><tr style="background:#1F4E79;color:#fff;font-weight:900;font-size:.74rem;">'
    +'<th style="padding:7px 9px;text-align:right;">الوحدة / الدرس</th>'
    +'<th style="padding:7px;">الحالة / سريع</th>'
    +'<th style="padding:7px;">الإتقان / شامل</th>'
    +'<th style="padding:7px;">محاولات</th></tr></thead>'
    +'<tbody>'+rows+'</tbody></table></div>'
    +'<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;">'
    +'<button onclick="hhSchExportCSV()" style="background:#EBF2EE;color:#3D6B53;border:1.5px solid #3D6B53;border-radius:10px;padding:9px 16px;font-family:Cairo;font-weight:900;font-size:.78rem;cursor:pointer;">تصدير التقدّم CSV</button>'
    +'<button onclick="hhSchReset()" style="background:#fff;color:#c0392b;border:1.5px solid #e0c0c0;border-radius:10px;padding:9px 16px;font-family:Cairo;font-weight:900;font-size:.78rem;cursor:pointer;">تصفير التقدّم</button>'
    +'</div>';
  hhSchModal('لوحة متابعة الصف', html, '#1F4E79');
}
function hhSchExportCSV(){
  var S=hhSchData();
  var rows=[['الوحدة','الدرس','اختبار سريع%','اختبار شامل%','الإتقان%','المحاولات','الحالة']];
  S.units.forEach(function(U,i){
    var m=_hhSchProg['u'+i+'_mastery']||0, at=hhSchAttempts(i), st=hhSchUnitState(i);
    U.lessons.forEach(function(L){
      rows.push([U.unit, L.title, _hhSchProg[L.id+'_quick']||0, _hhSchProg[L.id+'_full']||0, m, at,
        st==='done'?'أُتقنت':st==='open'?'متاحة':'مقفلة']);
    });
  });
  var csv=rows.map(function(r){return r.map(function(c){return '"'+String(c).replace(/"/g,'""')+'"';}).join(',');}).join('\n');
  var bl=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'});
  var a=document.createElement('a'); a.href=URL.createObjectURL(bl);
  a.download='madrasati_progress_'+new Date().toISOString().slice(0,10)+'.csv'; a.click();
}
function hhSchReset(){
  _hhSchProg={}; hhSchSave();
  var m=document.getElementById('hh-sch-modal'); if(m) m.remove();
  hhOpenSchool();
  if(typeof toast==='function') toast('صُفّر التقدّم','info');
}

function hhOpenCurriculum(){
  hhLoadLessons();
  var old = document.getElementById('hh-curr'); if(old) old.remove();
  var ov = document.createElement('div'); ov.id = 'hh-curr';
  ov.style.cssText = 'position:fixed;inset:0;background:rgba(30,6,15,.66);z-index:999975;display:flex;align-items:flex-start;justify-content:center;padding:16px;overflow-y:auto;direction:rtl;';

  var lessonCards = _hhLessons.length ? _hhLessons.map(function(L, i){
    return '<div style="background:#fff;border:1.5px solid #E3D9C6;border-right:4px solid #1F4E79;border-radius:12px;padding:11px 13px;margin-bottom:8px;">' + '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;flex-wrap:wrap;">' +   '<div style="flex:1;min-width:0;">' +     '<div style="font-weight:900;font-size:.85rem;color:#1F4E79;">' + esc(L.lesson||'درس') + '</div>' +     '<div style="font-size:.7rem;color:#888;font-weight:700;margin-top:2px;">' +        esc(L.subject||'') + ' · ' + esc(L.grade||'') + ' · ' + esc(L.unit||'') + '</div>' +     '<div style="font-size:.68rem;color:#aaa;margin-top:3px;">' + (L.text ? L.text.length : 0) + ' حرفاً · ' + esc(L.date||'') + '</div>' +   '</div>' +   '<div style="display:flex;gap:5px;flex-wrap:wrap;">' +     '<button onclick="hhGenerateFromLesson(' + i + ')" style="background:linear-gradient(135deg,#3D6B53,#274a38);color:#fff;border:none;border-radius:8px;padding:6px 12px;font-family:Cairo;font-weight:900;font-size:.7rem;cursor:pointer;"> ولّد</button>' +     '<button onclick="hhViewLesson(' + i + ')" style="background:#E9EEF8;color:#1F4E79;border:1px solid #1F4E79;border-radius:8px;padding:6px 10px;font-family:Cairo;font-weight:900;font-size:.7rem;cursor:pointer;">نص</button>' +     '<button onclick="hhDeleteLesson(' + i + ')" style="background:#fff;color:#c0392b;border:1px solid #e0c0c0;border-radius:8px;padding:6px 10px;font-family:Cairo;font-weight:900;font-size:.7rem;cursor:pointer;">حذف</button>' +   '</div></div></div>';
  }).join('') : '<div style="text-align:center;color:#999;font-size:.82rem;font-weight:700;padding:22px;">لم تُضف دروس بعد — ابدأ برفع درسك الأول </div>';

  ov.innerHTML = '<div style="background:#FAFBFD;border:2px solid #B8924A;border-radius:20px;max-width:680px;width:100%;overflow:hidden;margin-bottom:24px;font-family:Cairo,Tajawal,sans-serif;">' + '<div style="background:linear-gradient(135deg,#1F4E79,#12304d);color:#fff;padding:14px 18px;display:flex;justify-content:space-between;align-items:center;">' +   '<div style="font-weight:900;font-size:.98rem;"> مركز المنهج</div>' +   '<button onclick="hhCloseCurriculum()" style="background:none;border:none;color:#fff;font-size:1.15rem;cursor:pointer;">✕</button></div>' + '<div style="padding:16px 18px;">' // نموذج الإضافة
    + '<div style="background:#fff;border:1.5px solid #C9B37E;border-radius:14px;padding:14px;margin-bottom:16px;">' +   '<div style="font-weight:900;font-size:.88rem;color:#5E0E26;margin-bottom:10px;"> إضافة درس جديد</div>' +   '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">' +     '<input id="cl-subject" placeholder="المادة (مثال: الدراسات الاجتماعية)" style="border:1.5px solid #E3D9C6;border-radius:9px;padding:8px 10px;font-family:Cairo;font-size:.8rem;box-sizing:border-box;">' +     '<input id="cl-grade" placeholder="الصف (مثال: السابع)" style="border:1.5px solid #E3D9C6;border-radius:9px;padding:8px 10px;font-family:Cairo;font-size:.8rem;box-sizing:border-box;">' +     '<input id="cl-unit" placeholder="الوحدة (مثال: الوحدة الأولى)" style="border:1.5px solid #E3D9C6;border-radius:9px;padding:8px 10px;font-family:Cairo;font-size:.8rem;box-sizing:border-box;">' +     '<input id="cl-lesson" placeholder="عنوان الدرس" style="border:1.5px solid #E3D9C6;border-radius:9px;padding:8px 10px;font-family:Cairo;font-size:.8rem;box-sizing:border-box;">' +   '</div>' +   '<div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;flex-wrap:wrap;">' +     '<input type="file" id="cl-file" accept=".pdf,.txt,text/plain,application/pdf" onchange="hhLessonFilePicked(this)" style="font-family:Cairo;font-size:.75rem;flex:1;min-width:160px;">' +     '<span style="font-size:.68rem;color:#999;">أو الصق النص أدناه</span>' +   '</div>' +   '<textarea id="cl-text" rows="5" placeholder="نص الدرس — يُملأ تلقائياً عند رفع ملف، أو الصقه هنا مباشرة" style="width:100%;border:1.5px solid #E3D9C6;border-radius:10px;padding:9px 11px;font-family:Cairo,Tajawal,sans-serif;font-size:.8rem;line-height:1.8;resize:vertical;box-sizing:border-box;"></textarea>' +   '<div id="cl-status" style="font-size:.72rem;font-weight:800;min-height:16px;margin-top:4px;color:#8A6D2E;"></div>' +   '<button onclick="hhAddLesson()" style="background:linear-gradient(135deg,#1F4E79,#12304d);color:#fff;border:none;border-radius:11px;padding:10px 22px;font-family:Cairo;font-weight:900;font-size:.84rem;cursor:pointer;margin-top:6px;">حفظ الدرس في المكتبة</button>' + '</div>' // المكتبة
    + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">' +   '<div style="font-weight:900;font-size:.9rem;color:#5E0E26;"> مكتبة الدروس (' + _hhLessons.length + ')</div>' +   '<div style="display:flex;gap:6px;flex-wrap:wrap;">' +   (window._HH_CURRICULUM_PACK ? '<button onclick="hhImportPack()" style="background:linear-gradient(135deg,#8A1538,#5E0E26);color:#fff;border:none;border-radius:9px;padding:6px 13px;font-family:Cairo;font-weight:900;font-size:.74rem;cursor:pointer;"> استورد المنهج الرسمي</button>' : '')
    +   '<button onclick="hhShowUsageStats()" style="background:#FDF3DD;color:#8A6D2E;border:1.5px solid #B8924A;border-radius:9px;padding:6px 13px;font-family:Cairo;font-weight:900;font-size:.74rem;cursor:pointer;"> إحصاءات</button>' +   '</div>' + '</div>' + lessonCards
    + '</div></div>';
  document.body.appendChild(ov);
}
function hhCloseCurriculum(){ var e=document.getElementById('hh-curr'); if(e) e.remove(); }

function hhLessonFilePicked(input){
  var f = input.files && input.files[0]; if(!f) return;
  var st = document.getElementById('cl-status');
  if(st){ st.textContent = '⏳ جاري استخراج النص...'; st.style.color = '#8A6D2E'; }
  hhExtractText(f, function(err, text){
    if(err){ if(st){ st.textContent = ' ' + err; st.style.color = '#c0392b'; } return; }
    var ta = document.getElementById('cl-text');
    if(ta) ta.value = text;
    // تعبئة اسم الدرس تلقائياً من اسم الملف
    var ln = document.getElementById('cl-lesson');
    if(ln && !ln.value) ln.value = (f.name||'').replace(/\.(pdf|txt)$/i,'').slice(0,60);
    if(st){ st.textContent = '✓ استُخرج ' + text.length + ' حرفاً'; st.style.color = '#3D6B53'; }
  });
}

function hhAddLesson(){
  var g = function(id){ var e=document.getElementById(id); return e ? e.value.trim() : ''; };
  var text = g('cl-text');
  var lesson = g('cl-lesson');
  var st = document.getElementById('cl-status');
  if(!lesson){ if(st){ st.textContent=' اكتب عنوان الدرس'; st.style.color='#c0392b'; } return; }
  if(text.length < 50){ if(st){ st.textContent=' نص الدرس قصير جداً (50 حرفاً على الأقل)'; st.style.color='#c0392b'; } return; }
  _hhLessons.push({
    subject: g('cl-subject') || 'غير محدد',
    grade:   g('cl-grade')   || 'غير محدد',
    unit:    g('cl-unit')    || 'غير محدد',
    lesson:  lesson,
    text:    text.slice(0, 40000),
    date:    new Date().toLocaleDateString('ar-QA',{month:'short',day:'numeric'}),
    ts:      Date.now()
  });
  if(hhSaveLessons()){
    hhLogActivity('lesson_add', lesson);
    if(typeof toast==='function') toast('✓ حُفظ الدرس «'+lesson+'» في المكتبة','success');
    hhOpenCurriculum();
  }
}
function hhDeleteLesson(i){
  if(!_hhLessons[i]) return;
  _hhLessons.splice(i,1);
  hhSaveLessons();
  hhOpenCurriculum();
  if(typeof toast==='function') toast('حُذف الدرس','info');
}
function hhViewLesson(i){
  var L=_hhLessons[i]; if(!L) return;
  var ov=document.createElement('div');
  ov.style.cssText='position:fixed;inset:0;background:rgba(30,6,15,.7);z-index:999994;display:flex;align-items:center;justify-content:center;padding:18px;direction:rtl;';
  ov.onclick=function(){ ov.remove(); };
  ov.innerHTML='<div onclick="event.stopPropagation()" style="background:#fff;border:2px solid #B8924A;border-radius:18px;max-width:620px;width:100%;max-height:80vh;overflow:hidden;display:flex;flex-direction:column;font-family:Cairo,Tajawal,sans-serif;">' +'<div style="background:linear-gradient(135deg,#1F4E79,#12304d);color:#fff;padding:12px 16px;font-weight:900;font-size:.9rem;">'+esc(L.lesson)+'</div>' +'<div style="padding:14px 16px;overflow-y:auto;font-size:.82rem;line-height:2;color:#333;white-space:pre-wrap;">'+esc(L.text)+'</div></div>';
  document.body.appendChild(ov);
}

// ── نقطة الربط بالتوليد (تعمل محلياً الآن، وتتحول لنموذج لغوي عند إضافة الوسيط) ──
function hhGenerateFromLesson(i){
  var L = _hhLessons[i]; if(!L) return;
  hhLogActivity('generate', L.lesson);
  var ov=document.createElement('div'); ov.id='hh-gen';
  ov.style.cssText='position:fixed;inset:0;background:rgba(30,6,15,.7);z-index:999993;display:flex;align-items:center;justify-content:center;padding:18px;direction:rtl;';
  ov.innerHTML='<div style="background:#fff;border:2px solid #B8924A;border-radius:18px;max-width:460px;width:100%;overflow:hidden;font-family:Cairo,Tajawal,sans-serif;">' +'<div style="background:linear-gradient(135deg,#3D6B53,#274a38);color:#fff;padding:13px 18px;font-weight:900;font-size:.92rem;"> توليد من: '+esc(L.lesson)+'</div>' +'<div style="padding:16px 18px;">' +'<div style="font-size:.8rem;color:#555;line-height:1.9;margin-bottom:12px;">اختر ما تريد توليده من هذا الدرس:</div>' +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">' +'<button onclick="hhGenRun('+i+',\'questions\')" style="background:#E9EEF8;color:#1F4E79;border:1.5px solid #1F4E79;border-radius:11px;padding:11px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;"> فئة أسئلة</button>' +'<button onclick="hhGenRun('+i+',\'quiz\')" style="background:#EBF2EE;color:#3D6B53;border:1.5px solid #3D6B53;border-radius:11px;padding:11px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;"> اختبار مطبوع</button>' +'<button onclick="hhGenRun('+i+',\'summary\')" style="background:#FDF3DD;color:#8A6D2E;border:1.5px solid #B8924A;border-radius:11px;padding:11px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;"> ملخص الدرس</button>' +'<button onclick="hhGenRun('+i+',\'strategies\')" style="background:#F5E9EE;color:#8A1538;border:1.5px solid #8A1538;border-radius:11px;padding:11px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;"> استراتيجيات</button>' +'<button onclick="hhGenRun('+i+',\'challenge\')" style="background:#FDF3DD;color:#8A6D2E;border:1.5px solid #B8924A;border-radius:11px;padding:11px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;"> تحدي صفي</button>' +'<button onclick="hhAISettings()" style="background:#F3F0F1;color:#666;border:1.5px solid #ddd;border-radius:11px;padding:11px;font-family:Cairo;font-weight:900;font-size:.8rem;cursor:pointer;"> إعدادات التوليد</button>' +'</div>' +'<div id="hh-gen-out" style="font-size:.78rem;color:#666;line-height:1.9;max-height:260px;overflow-y:auto;"></div>' +'<button onclick="document.getElementById(\'hh-gen\').remove()" style="background:#F3F0F1;color:#666;border:none;border-radius:11px;padding:9px 18px;font-family:Cairo;font-weight:900;font-size:.82rem;cursor:pointer;margin-top:10px;">إغلاق</button>' +'</div></div>';
  document.body.appendChild(ov);
}

async function hhGenRun(i, kind){
  var L=_hhLessons[i]; if(!L) return;
  var out=document.getElementById('hh-gen-out'); if(!out) return;
  var smart = !!hhGetAIEndpoint();
  out.innerHTML='<div style="text-align:center;padding:16px;color:#8A6D2E;font-weight:800;">' + (smart?' جاري التوليد الذكي... قد يستغرق 10-20 ثانية':'⏳ جاري التوليد المحلي...')
    + '<div style="font-size:.7rem;color:#aaa;margin-top:6px;font-weight:700;">'+esc(L.lesson||'')+'</div></div>';
  if(smart){
    try{
      var r = await hhCurrAIGenerate(kind, L);
      out.innerHTML = hhRenderAI(kind, r.data, L)
        + '<div style="font-size:.66rem;color:#3D6B53;margin-top:7px;font-weight:800;"> توليد ذكي' + (typeof r.remaining==='number'? ' · متبقٍ اليوم: '+r.remaining : '') + '</div>';
      if(typeof hhLogActivity==='function') hhLogActivity('generate', kind+': '+(L.lesson||''));
      return;
    }catch(e){
      var msg = (e && e.message==='NO_ENDPOINT') ? '' : (' تعذر التوليد الذكي ('+esc(String(e.message||e)).slice(0,60)+') — عُرض التوليد المحلي بدلاً منه');
      out.innerHTML = (msg?'<div style="background:#FDF3DD;border:1px solid #E3D9C6;border-radius:8px;padding:8px 10px;font-size:.72rem;color:#8A6D2E;font-weight:800;margin-bottom:9px;">'+msg+'</div>':'')
        + hhLocalGenerate(L, kind);
      return;
    }
  }
  setTimeout(function(){
    out.innerHTML = hhLocalGenerate(L, kind)
      + '<div style="background:#E9EEF8;border:1px solid #1F4E79;border-radius:9px;padding:9px 11px;margin-top:9px;font-size:.73rem;color:#1F4E79;font-weight:800;line-height:1.8;">' + ' لتوليد أسئلة احترافية بمستويات بلوم، فعّل التوليد الذكي ' + '<button onclick="hhAISettings()" style="background:#1F4E79;color:#fff;border:none;border-radius:7px;padding:4px 11px;font-family:Cairo;font-weight:900;font-size:.7rem;cursor:pointer;margin-right:4px;">الإعدادات</button></div>';
  }, 350);
}

// مولّد محلي مبدئي (يُستبدل بالنموذج اللغوي عند ربط الوسيط)
function hhLocalGenerate(L, kind){
  var sentences = String(L.text||'').split(/[.。\n!؟?]/).map(function(s){return s.trim();}).filter(function(s){return s.length>25;});
  if(!sentences.length) return '<div style="color:#c0392b;font-weight:800;">النص قصير أو غير صالح للتوليد</div>';

  if(kind==='summary'){
    var top = sentences.slice(0,5);
    return '<div style="background:#FDF8EC;border:1.5px solid #E3D9C6;border-radius:10px;padding:12px;">' + '<div style="font-weight:900;color:#8A6D2E;margin-bottom:7px;"> ملخص «'+esc(L.lesson)+'»</div>' + top.map(function(s,i){ return '<div style="margin-bottom:5px;">• '+esc(s)+'</div>'; }).join('')
      + '</div>';
  }
  if(kind==='strategies'){
    var items = [
      'التعلّم التعاوني: قسّم الطلاب لمجموعات، كل مجموعة تلخّص جزءاً وتعرضه.',
      'خريطة ذهنية: اطلب رسم مفاهيم الدرس وربطها بخطوط مع تعليل الروابط.',
      'الكرسي الساخن: طالب يتقمّص شخصية أو مفهوماً ويجيب أسئلة زملائه.',
      'التقويم الفوري: استخدم لوحة المُلهِم بأسئلة هذا الدرس في آخر 10 دقائق.',
      'الربط بالواقع: اطلب مثالاً من بيئة قطر يوضح الفكرة الرئيسة.' ];
    return '<div style="background:#F5E9EE;border:1.5px solid #E3D9C6;border-radius:10px;padding:12px;">' + '<div style="font-weight:900;color:#8A1538;margin-bottom:7px;"> استراتيجيات مقترحة</div>' + items.map(function(s,i){ return '<div style="margin-bottom:6px;">'+(i+1)+'. '+esc(s)+'</div>'; }).join('')
      + '</div>';
  }
  // أسئلة / اختبار: توليد ملء الفراغ من الجمل
  var qs = [];
  sentences.slice(0,10).forEach(function(s){
    var words = s.split(/\s+/).filter(function(w){return w.length>3;});
    if(words.length < 5) return;
    var key = words[Math.floor(words.length/2)];
    qs.push({ q: s.replace(key, '__________'), a: key });
  });
  if(!qs.length) return '<div style="color:#c0392b;font-weight:800;">تعذر توليد أسئلة من هذا النص</div>';
  var title = kind==='quiz' ? ' اختبار مطبوع' : ' أسئلة مولّدة';
  return '<div style="background:#fff;border:1.5px solid #E3D9C6;border-radius:10px;padding:12px;">' + '<div style="font-weight:900;color:#1F4E79;margin-bottom:8px;">'+title+' — '+esc(L.lesson)+'</div>' + qs.map(function(x,i){
        return '<div style="margin-bottom:9px;padding-bottom:8px;border-bottom:1px dashed #eee;">' + '<div style="font-weight:800;color:#333;">'+(i+1)+'. '+esc(x.q)+'</div>' + '<div style="font-size:.72rem;color:#3D6B53;font-weight:800;margin-top:3px;">الإجابة: '+esc(x.a)+'</div></div>';
      }).join('')
    + '<div style="font-size:.7rem;color:#999;margin-top:8px;line-height:1.7;"> هذه توليدات أولية بقواعد نصية. عند ربط النموذج اللغوي ستصبح أسئلة متدرجة بمستويات بلوم مع خيارات متعددة.</div>' + '</div>';
}

// ── لوحة إحصاءات الاستخدام ──
