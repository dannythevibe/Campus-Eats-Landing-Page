// Campus Eats Service Worker
// Version bump this string to force cache refresh on deploy
const CACHE_NAME = "campus-eats-v1";

// Assets to pre-cache on install (app shell)
const PRECACHE_URLS = [
    "/",
    "/manifest.json",
    "/logo.png",
    "/offline.html",
];

// ─── Install ─────────────────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting()) // Activate immediately
    );
});

// ─── Activate ────────────────────────────────────────────────────────────────
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) =>
                Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => caches.delete(name))
                )
            )
            .then(() => self.clients.claim()) // Take control of all tabs immediately
    );
});

// ─── Fetch ────────────────────────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET and cross-origin requests (e.g. Supabase API calls)
    if (request.method !== "GET" || url.origin !== self.location.origin) {
        return;
    }

    // Skip Next.js internal routes and API routes
    if (
        url.pathname.startsWith("/_next/") ||
        url.pathname.startsWith("/api/")
    ) {
        return;
    }

    // Strategy: Network First with Cache Fallback
    // Great for pages that need fresh data but still work offline
    event.respondWith(
        fetch(request)
            .then((networkResponse) => {
                // Cache a clone of every successful navigation response
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                // Network failed → try the cache
                return caches.match(request).then((cachedResponse) => {
                    if (cachedResponse) return cachedResponse;
                    // Last resort: serve the offline page for navigation requests
                    if (request.mode === "navigate") {
                        return caches.match("/offline.html");
                    }
                });
            })
    );
});

// ─── Push Notifications (future-ready) ───────────────────────────────────────
self.addEventListener("push", (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || "Campus Eats";
    const options = {
        body: data.body || "Your order is on the way!",
        icon: "/logo.png",
        badge: "/logo.png",
        vibrate: [100, 50, 100],
        data: { url: data.url || "/" },
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url || "/")
    );
});
