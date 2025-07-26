// sw.js
self.addEventListener('install', evt => {
  // 安装后立即激活，跳过等待
  evt.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', evt => {
  // 激活后接管所有页面
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // 只对同源请求进行拦截并转发
  if (url.origin === self.location.origin) {
    // 构造新请求，目标指向 yyfh.com，同样的路径、查询、以及**完全相同的 headers** 和 body
    const redirectUrl = 'https://yyfh.com' + url.pathname + url.search;
    const newReq = new Request(redirectUrl, {
      method: event.request.method,
      headers: event.request.headers,
      body: event.request.body,
      mode: 'cors',
      credentials: event.request.credentials,
      redirect: 'manual'
    });
    event.respondWith(fetch(newReq));
  }
  // 其他资源不拦截
});
