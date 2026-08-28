// Service worker de Luz Amiga — scope limitado a /luzamiga.
// Precachea el shell de la página y cachea los tiles del mapa en tiempo de ejecución.

const VERSION = "luzamiga-v1"
const SHELL_CACHE = `${VERSION}-shell`
const TILE_CACHE = `${VERSION}-tiles`

const SHELL_ASSETS = [
  "/luzamiga",
  "/luzamiga/manifest.webmanifest",
  "/luzamiga/icon-192.png",
  "/luzamiga/icon-512.png",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
      .catch(() => {}),
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  )
})

function isTileRequest(url) {
  return url.hostname.endsWith("tile.openstreetmap.org")
}

self.addEventListener("fetch", (event) => {
  const { request } = event
  if (request.method !== "GET") return

  const url = new URL(request.url)

  // Tiles del mapa: cache-first (stale-while-revalidate).
  if (isTileRequest(url)) {
    event.respondWith(
      caches.open(TILE_CACHE).then(async (cache) => {
        const cached = await cache.match(request)
        const network = fetch(request)
          .then((res) => {
            if (res.ok) cache.put(request, res.clone())
            return res
          })
          .catch(() => cached)
        return cached || network
      }),
    )
    return
  }

  // No interferir con las llamadas al backend (siempre red).
  if (url.pathname.startsWith("/api/")) return

  // Navegación/documentos dentro de /luzamiga: network-first con respaldo al shell.
  if (url.origin === self.location.origin && url.pathname.startsWith("/luzamiga")) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone()
          caches.open(SHELL_CACHE).then((cache) => cache.put(request, copy)).catch(() => {})
          return res
        })
        .catch(async () => {
          const cached = await caches.match(request)
          return cached || caches.match("/luzamiga")
        }),
    )
  }
})
