/**
 * ═══════════════════════════════════════════════════════════════════
 * منصة المُلهِم — الوسيط السحابي لتوليد المحتوى التربوي
 * ═══════════════════════════════════════════════════════════════════
 *
 * 📌 خطوات التركيب (مرة واحدة فقط):
 *
 * 1) في جهازك، افتح الطرفية (Terminal) ونفّذ:
 *      npm install -g firebase-tools
 *      firebase login
 *      mkdir almulhim-functions && cd almulhim-functions
 *      firebase init functions      ← اختر مشروعك، ثم JavaScript، ثم No للـESLint
 *
 * 2) انسخ هذا الملف كاملاً إلى:  functions/index.js
 *
 * 3) ثبّت المكتبات:
 *      cd functions
 *      npm install firebase-admin firebase-functions
 *
 * 4) ضع مفتاح API بأمان (لا يظهر لأحد أبداً):
 *      firebase functions:config:set ai.key="ضع_مفتاحك_هنا"
 *
 * 5) انشر:
 *      firebase deploy --only functions
 *
 * 6) انسخ الرابط الذي سيظهر لك (يشبه):
 *      https://us-central1-اسم-مشروعك.cloudfunctions.net/generateContent
 *    وضعه في: لوحة التحكم ← مركز المنهج ← إعدادات التوليد
 *
 * ملاحظة: خطة Blaze مطلوبة لتشغيل Functions، وهي مجانية عملياً
 * (2 مليون استدعاء شهرياً مجاناً — لن تقترب منها).
 * ═══════════════════════════════════════════════════════════════════
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// ── إعدادات ──
const AI_ENDPOINT = 'https://api.anthropic.com/v1/messages';
const AI_MODEL = 'claude-sonnet-4-20250514';
const MAX_TEXT = 12000;        // أقصى طول لنص الدرس
const DAILY_LIMIT = 200;       // أقصى عدد توليدات يومياً لكل مستخدم

// ── القوالب التربوية ──
const PROMPTS = {
  questions: (text, meta) => `أنت خبير مناهج قطري. من نص الدرس التالي، ولّد 12 سؤالاً تعليمياً بالعربية الفصحى.

المادة: ${meta.subject} | الصف: ${meta.grade} | الوحدة: ${meta.unit} | الدرس: ${meta.lesson}

قواعد إلزامية:
- كل سؤال يقيس معلومة واحدة فقط (لا أسئلة مركبة).
- التدرج: 4 أسئلة سهلة (تذكّر) + 4 متوسطة (فهم وتطبيق) + 4 صعبة (تحليل واستنتاج).
- الإجابة قصيرة وحاسمة لا تحتمل التأويل.
- لكل سؤال 4 خيارات، الأول هو الصحيح.
- استخدم معلومات من النص فقط، لا تخترع.

أعد النتيجة بصيغة JSON فقط بلا أي نص إضافي:
{"questions":[{"q":"نص السؤال","a":"الإجابة الصحيحة","diff":"easy","opts":["الصحيحة","خيار","خيار","خيار"],"bloom":"تذكّر"}]}

نص الدرس:
${text}`,

  quiz: (text, meta) => `أنت خبير تقويم تربوي. صمم اختباراً من نص الدرس التالي.

المادة: ${meta.subject} | الصف: ${meta.grade} | الدرس: ${meta.lesson}

المطلوب: 10 أسئلة موزعة على مستويات بلوم (تذكّر، فهم، تطبيق، تحليل)، متنوعة الأنماط (اختيار من متعدد، صح/خطأ، إكمال، سؤال مقالي قصير)، مع نموذج إجابة ودرجة لكل سؤال (المجموع 20).

أعد النتيجة بصيغة JSON فقط:
{"title":"عنوان الاختبار","items":[{"n":1,"type":"اختيار من متعدد","q":"السؤال","opts":["أ","ب","ج","د"],"a":"الإجابة","bloom":"تذكّر","marks":2}],"total":20}

نص الدرس:
${text}`,

  summary: (text, meta) => `لخّص نص الدرس التالي تلخيصاً تربوياً لطلاب ${meta.grade}.

أعد النتيجة بصيغة JSON فقط:
{"title":"${meta.lesson}","idea":"الفكرة المحورية في جملة واحدة","points":["نقطة رئيسة","نقطة رئيسة"],"terms":[{"term":"المصطلح","def":"تعريفه المبسّط"}],"conclusion":"خلاصة ختامية"}

نص الدرس:
${text}`,

  strategies: (text, meta) => `أنت مدرب تربوي. اقترح استراتيجيات تدريس لهذا الدرس تحديداً.

المادة: ${meta.subject} | الصف: ${meta.grade} | الدرس: ${meta.lesson}

المطلوب: 5 استراتيجيات عملية قابلة للتنفيذ في حصة 45 دقيقة، كل واحدة مرتبطة بمحتوى الدرس فعلياً (لا عمومات)، مع خطوات تنفيذ وزمن مقترح.

أعد النتيجة بصيغة JSON فقط:
{"strategies":[{"name":"اسم الاستراتيجية","why":"لماذا تناسب هذا الدرس","steps":["خطوة","خطوة"],"time":"10 دقائق"}],"activity":{"name":"نشاط صفي ختامي","desc":"وصفه","materials":"ما يحتاجه"}}

نص الدرس:
${text}`,

  challenge: (text, meta) => `من نص الدرس التالي، صمم تحدياً صفياً واحداً كبيراً يثير التفكير العميق.

أعد النتيجة بصيغة JSON فقط:
{"challenge":"نص التحدي","hints":["تلميح أول","تلميح ثانٍ"],"answer":"الإجابة النموذجية","points":600,"skill":"المهارة المستهدفة"}

نص الدرس:
${text}`
};

/**
 * الدالة الرئيسة — تُستدعى من المنصة
 */
exports.generateContent = functions
  .runWith({ timeoutSeconds: 120, memory: '512MB' })
  .https.onRequest(async (req, res) => {
    // CORS
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') { res.status(204).send(''); return; }
    if (req.method !== 'POST') { res.status(405).json({ error: 'POST فقط' }); return; }

    try {
      const { kind, text, meta, uid, email } = req.body || {};

      // ── التحقق من المدخلات ──
      if (!kind || !PROMPTS[kind]) {
        res.status(400).json({ error: 'نوع التوليد غير معروف' }); return;
      }
      if (!text || text.length < 50) {
        res.status(400).json({ error: 'نص الدرس قصير جداً' }); return;
      }

      // ── حد الاستخدام اليومي (حماية الرصيد) ──
      const today = new Date().toISOString().slice(0, 10);
      const userKey = (uid || email || req.ip || 'anon').replace(/[^\w@.-]/g, '_');
      const quotaRef = admin.firestore().collection('ai_quota').doc(`${today}_${userKey}`);
      const quotaSnap = await quotaRef.get();
      const used = quotaSnap.exists ? (quotaSnap.data().count || 0) : 0;
      if (used >= DAILY_LIMIT) {
        res.status(429).json({ error: 'تجاوزت الحد اليومي للتوليد — حاول غداً' }); return;
      }

      // ── استدعاء النموذج ──
      const apiKey = (functions.config().ai || {}).key;
      if (!apiKey) {
        res.status(500).json({ error: 'مفتاح API غير مضبوط — نفّذ: firebase functions:config:set ai.key="..."' });
        return;
      }

      const prompt = PROMPTS[kind](String(text).slice(0, MAX_TEXT), meta || {});
      const aiRes = await fetch(AI_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: AI_MODEL,
          max_tokens: 4000,
          messages: [{ role: 'user', content: prompt }]
        })
      });

      if (!aiRes.ok) {
        const errTxt = await aiRes.text();
        console.error('AI error:', aiRes.status, errTxt.slice(0, 300));
        res.status(502).json({ error: 'تعذر الاتصال بخدمة التوليد' }); return;
      }

      const data = await aiRes.json();
      let raw = (data.content || [])
        .filter(b => b.type === 'text')
        .map(b => b.text)
        .join('\n')
        .trim();

      // تنظيف أسوار الكود إن وُجدت
      raw = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

      let parsed = null;
      try { parsed = JSON.parse(raw); }
      catch (e) {
        const m = raw.match(/\{[\s\S]*\}/);
        if (m) { try { parsed = JSON.parse(m[0]); } catch (e2) {} }
      }
      if (!parsed) {
        res.status(502).json({ error: 'تعذر تفسير نتيجة التوليد' }); return;
      }

      // ── تحديث الحصة + سجل النشاط ──
      await quotaRef.set({
        count: used + 1,
        user: email || uid || 'مجهول',
        date: today,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      await admin.firestore().collection('ai_activity').add({
        kind,
        lesson: (meta && meta.lesson) || '',
        subject: (meta && meta.subject) || '',
        grade: (meta && meta.grade) || '',
        user: email || uid || 'مجهول',
        chars: String(text).length,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      }).catch(() => {});

      res.json({ ok: true, kind, data: parsed, remaining: DAILY_LIMIT - used - 1 });

    } catch (err) {
      console.error('generateContent:', err);
      res.status(500).json({ error: 'خطأ داخلي في الخادم' });
    }
  });

/**
 * دالة مساعدة: إحصاءات التوليد (للوحة تحكم الأدمن)
 */
exports.aiStats = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') { res.status(204).send(''); return; }
  try {
    const snap = await admin.firestore().collection('ai_activity')
      .orderBy('createdAt', 'desc').limit(100).get();
    const items = [];
    snap.forEach(d => items.push(d.data()));
    const byKind = {};
    items.forEach(x => { byKind[x.kind] = (byKind[x.kind] || 0) + 1; });
    res.json({ ok: true, total: items.length, byKind, recent: items.slice(0, 20) });
  } catch (e) {
    res.status(500).json({ error: 'تعذر جلب الإحصاءات' });
  }
});
