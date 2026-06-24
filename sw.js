// Service Worker لمنصة الملهم — يدعم الأوفلاين والتثبيت
const CACHE_NAME = 'almulhim-v1.5';
const RUNTIME_CACHE = 'almulhim-runtime-v1.5';

// الملفات الأساسية للتخزين المؤقت
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/questions.js',
  '/partners-questions.js',
  '/firebase-app-compat.js',
  '/firebase-auth-compat.js',
  '/firebase-firestore-compat.js',
  '/favicon.svg',
  '/apple-touch-icon.png',
  '/manifest.json'
];

// تثبيت Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS.filter(u => u)))
      .then(() => self.skipWaiting())
      .catch(err => console.warn('SW install error:', err))
  );
});

// تفعيل Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => 
          name !== CACHE_NAME && name !== RUNTIME_CACHE
        ).map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// استراتيجية: Network First، fallback to Cache
self.addEventListener('fetch', event => {
  const req = event.request;
  
  // نتجاهل: غير GET، التطلبات لـ Firebase، التطلبات لـ Anthropic API
  if(req.method !== 'GET') return;
  if(req.url.includes('googleapis.com')) return;
  if(req.url.includes('firestore')) return;
  if(req.url.includes('firebase')) return;
  if(req.url.includes('anthropic.com')) return;
  if(req.url.includes('claude.com')) return;
  
  event.respondWith(
    fetch(req)
      .then(response => {
        // ناجح: نخزن نسخة في cache
        // لكن لا نخزّن index.html أو الصفحة الرئيسية ليحصل المستخدم دائماً على أحدث نسخة
        const _isHTML = req.url.endsWith('/') || req.url.includes('index.html') ||
                        (req.headers.get('accept') || '').includes('text/html');
        if(response && response.status === 200 && response.type === 'basic' && !_isHTML){
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => {
            cache.put(req, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // فشل الشبكة: نرجع من cache
        return caches.match(req).then(cached => {
          if(cached) return cached;
          // لو HTML طلب، نرجع الصفحة الرئيسية
          if(req.headers.get('accept')?.includes('text/html')){
            return caches.match('/index.html');
          }
        });
      })
  );
});

// رسائل من الصفحة الرئيسية
self.addEventListener('message', event => {
  if(event.data && event.data.type === 'SKIP_WAITING'){
    self.skipWaiting();
  }
});
