/* ============================================================
   المُلهم التعليمي — Service Worker
   almulhimedu.org
   ------------------------------------------------------------
   مهم جداً: عند كل نشر جديد، غيّر رقم النسخة في السطر التالي فقط
   (مثلاً من v1 إلى v2). هذا وحده يجبر المتصفحات على جلب النسخة
   الجديدة وتفعيل آلية التحديث التلقائي عند المستخدمين.
   ============================================================ */
const SW_VERSION = 'almulhim-zzzd-classes-inline';

// الملفات المحلية الأساسية التي نخزّنها للعمل دون اتصال (App Shell)
// لا نضع هنا أي ملف من Firestore/Firebase/Google حتى لا نعطّل التحديث اللحظي
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/almulhim.css',
  '/almulhim-engine.js',
  '/almulhim-admin-catalog.js',
  '/almulhim-journey.js',
  '/almulhim-programs.js',
  '/almulhim-wathiq.js',
  '/almulhim-school.js',
  '/curriculum-social7.js',
  '/madrasati-social7.js',
  '/madrasati-social7-t1.js',
  '/questions.js',
  '/maps-questions.js',
  '/flags-questions.js',
  '/capitals-questions.js',
  '/partners-questions.js',
  '/legend-maps-questions.js',
  '/favicon.svg',
  '/favicon-32.png',
  '/favicon-16.png',
  '/apple-touch-icon.png',
  '/site.webmanifest'
];

// النطاقات التي يجب ألا يلمسها الـ Service Worker إطلاقاً
// (تمر مباشرة للشبكة دائماً — بيانات لحظية وحيّة)
const BYPASS_HOSTS = [
  'firestore.googleapis.com',
  'firebase.googleapis.com',
  'firebaseinstallations.googleapis.com',
  'identitytoolkit.googleapis.com',
  'securetoken.googleapis.com',
  'www.gstatic.com',
  'apis.google.com',
  'www.googleapis.com',
  'firebaselogging-pa.googleapis.com'
];

// ═══════════════════ التثبيت ═══════════════════
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SW_VERSION).then((cache) => {
      // نضيف الملفات واحداً واحداً حتى لا يفشل التثبيت كله لو غاب ملف
      return Promise.allSettled(
        CORE_ASSETS.map((url) => cache.add(url).catch((e) => {
          console.warn('SW: تعذّر تخزين', url, e);
        }))
      );
    })
  );
  // تفعيل فوري: النسخة الجديدة تحل محل القديمة دون انتظار موافقة.
  // آمن للحصص الجارية: الصفحة المفتوحة تواصل عملها بذاكرتها الحالية
  // (لا إعادة تحميل قسرية)، والملفات الجديدة تُستخدم من الفتح التالي.
  self.skipWaiting();
});

// ═══════════════════ التفعيل ═══════════════════
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // حذف الكاشات القديمة من النسخ السابقة
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== SW_VERSION).map((k) => caches.delete(k))
      );
      // السيطرة على كل الصفحات المفتوحة فوراً
      await self.clients.claim();
    })()
  );
});

// ═══════════════════ استقبال الرسائل ═══════════════════
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    // المستخدم وافق على التحديث → نفعّل النسخة الجديدة فوراً
    self.skipWaiting();
  }
});

// ═══════════════════ اعتراض الطلبات ═══════════════════
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // 1) نتعامل فقط مع طلبات GET
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (e) { return; }

  // 2) نتجاهل أي نطاق حيّ (Firestore/Firebase/Google) — يمر مباشرة للشبكة
  if (BYPASS_HOSTS.some((h) => url.hostname.endsWith(h))) {
    return; // لا نعترض — المتصفح يتولّاه طبيعياً
  }

  // 3) نتعامل فقط مع طلبات نفس الأصل (الموقع نفسه)
  if (url.origin !== self.location.origin) {
    return; // الخطوط وغيرها من CDN تمر طبيعياً
  }

  // 4) صفحات HTML (التنقّل): الشبكة أولاً ثم الكاش (Network-First)
  //    حتى يحصل المستخدم دائماً على أحدث index.html إن كان متصلاً
  const isHTML = req.mode === 'navigate' ||
                 (req.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(SW_VERSION).then((c) => c.put('/index.html', copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match('/index.html').then((r) => r || caches.match('/')))
    );
    return;
  }

  // 5) باقي الملفات المحلية (JS/أيقونات): الكاش أولاً ثم الشبكة (Cache-First)
  //    أسرع، ومع تحديث الكاش في الخلفية
  event.respondWith(
    caches.match(req).then((cached) => {
      const networkFetch = fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(SW_VERSION).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
