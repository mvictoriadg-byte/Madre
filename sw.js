// MADRE — Service Worker para notificaciones locales
// v3 — un solo listener de activate, más robusto en iOS

const STORE_KEY = 'madre-notif-pendientes';
const timers = {};

self.addEventListener('install', e => {
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', e => {
  e.waitUntil(
    self.clients.claim().then(() => reprogramarDesdeCache())
  );
});

async function guardarPendientes(pendientes) {
  try {
    const cache = await caches.open(STORE_KEY);
    await cache.put('/madre-notif-data', new Response(JSON.stringify(pendientes)));
  } catch(e) {}
}

async function leerPendientes() {
  try {
    const cache = await caches.open(STORE_KEY);
    const res = await cache.match('/madre-notif-data');
    if (!res) return {};
    return JSON.parse(await res.text());
  } catch(e) { return {}; }
}

async function mostrarNotificacion(id, titulo, mensaje) {
  await self.registration.showNotification(titulo, {
    body: mensaje,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: id,
    requireInteraction: false,
    vibrate: [200, 100, 200],
  });
}

async function reprogramarDesdeCache() {
  const pendientes = await leerPendientes();
  const ahora = Date.now();
  let actualizado = false;

  for (const [id, notif] of Object.entries(pendientes)) {
    const delay = notif.timestamp - ahora;
    if (delay <= 0) {
      await mostrarNotificacion(id, notif.titulo, notif.mensaje);
      delete pendientes[id];
      actualizado = true;
    } else {
      if (!timers[id]) {
        timers[id] = setTimeout(async () => {
          await mostrarNotificacion(id, notif.titulo, notif.mensaje);
          const p = await leerPendientes();
          delete p[id];
          await guardarPendientes(p);
          delete timers[id];
        }, delay);
      }
    }
  }

  if (actualizado) await guardarPendientes(pendientes);
}

self.addEventListener('message', async event => {
  const { type, id, titulo, mensaje, timestamp } = event.data || {};

  if (type === 'PROGRAMAR') {
    const delay = timestamp - Date.now();
    if (delay <= 0) return;

    const pendientes = await leerPendientes();
    pendientes[id] = { titulo, mensaje, timestamp };
    await guardarPendientes(pendientes);

    if (timers[id]) clearTimeout(timers[id]);
    timers[id] = setTimeout(async () => {
      await mostrarNotificacion(id, titulo, mensaje);
      const p = await leerPendientes();
      delete p[id];
      await guardarPendientes(p);
      delete timers[id];
    }, delay);
  }

  if (type === 'CANCELAR') {
    if (timers[id]) { clearTimeout(timers[id]); delete timers[id]; }
    const pendientes = await leerPendientes();
    delete pendientes[id];
    await guardarPendientes(pendientes);
  }

  if (type === 'REPROGRAMAR') {
    await reprogramarDesdeCache();
  }

  if (type === 'CANCELAR_TODAS') {
    for (const id of Object.keys(timers)) {
      clearTimeout(timers[id]);
      delete timers[id];
    }
    await guardarPendientes({});
  }
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
      if (clients.length > 0) clients[0].focus();
      else self.clients.openWindow('/');
    })
  );
});
