// Service Worker for Book-kro
// Provides offline functionality and caching

const CACHE_NAME = 'book-kro-v1';
const STATIC_CACHE = 'book-kro-static-v1';
const API_CACHE = 'book-kro-api-v1';

// Files to cache for offline functionality
const STATIC_FILES = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/api.js',
    '/js/header.js',
    '/js/movieCard.js',
    '/js/pagination.js',
    '/js/search.js',
    '/js/movieModal.js',
    '/js/favorites.js',
    '/js/booking.js',
    '/css/styles.css',
    '/assets/placeHolder.webp',
    '/assets/darkMode.svg',
    'https://cdn.tailwindcss.com/3.3.0'
];

// API endpoints to cache
const API_ENDPOINTS = [
    'https://api.themoviedb.org/3/movie/upcoming',
    'https://api.themoviedb.org/3/discover/movie',
    'https://api.themoviedb.org/3/search/movie'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        Promise.all([
            // Cache static files
            caches.open(STATIC_CACHE).then((cache) => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES.map(url => new Request(url, { mode: 'no-cors' })));
            }).catch(err => {
                console.warn('Service Worker: Failed to cache some static files', err);
                // Try to cache files individually
                return caches.open(STATIC_CACHE).then((cache) => {
                    return Promise.allSettled(
                        STATIC_FILES.map(url => 
                            cache.add(new Request(url, { mode: 'no-cors' }))
                                .catch(err => console.warn(`Failed to cache ${url}:`, err))
                        )
                    );
                });
            })
        ])
    );
    
    // Force activation of new service worker
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        Promise.all([
            // Clean up old caches
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== API_CACHE) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            // Claim all clients
            self.clients.claim()
        ])
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Handle API requests
    if (url.hostname === 'api.themoviedb.org') {
        event.respondWith(handleApiRequest(request));
        return;
    }
    
    // Handle image requests
    if (url.hostname === 'image.tmdb.org') {
        event.respondWith(handleImageRequest(request));
        return;
    }
    
    // Handle static files
    event.respondWith(handleStaticRequest(request));
});

// Handle API requests with cache-first strategy for better performance
async function handleApiRequest(request) {
    const cache = await caches.open(API_CACHE);
    
    try {
        // Try network first for fresh data
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // Clone response for caching
            const responseClone = networkResponse.clone();
            
            // Cache successful responses
            cache.put(request, responseClone);
            
            return networkResponse;
        }
        
        throw new Error('Network response not ok');
    } catch (error) {
        console.log('Service Worker: API request failed, serving from cache', error);
        
        // Fallback to cache
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            // Add offline indicator to cached responses
            const response = cachedResponse.clone();
            const data = await response.json();
            
            return new Response(JSON.stringify({
                ...data,
                _cached: true,
                _timestamp: Date.now()
            }), {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Served-By': 'ServiceWorker-Cache'
                }
            });
        }
        
        // Return offline fallback
        return new Response(JSON.stringify({
            error: 'Offline',
            message: 'No cached data available',
            results: []
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// Handle image requests with cache-first strategy
async function handleImageRequest(request) {
    const cache = await caches.open(API_CACHE);
    
    // Check cache first
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        // Try network
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // Cache image
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }
        
        throw new Error('Network response not ok');
    } catch (error) {
        console.log('Service Worker: Image request failed', error);
        
        // Return placeholder image
        return new Response('', {
            status: 200,
            statusText: 'OK',
            headers: {
                'Content-Type': 'image/svg+xml'
            }
        });
    }
}

// Handle static file requests
async function handleStaticRequest(request) {
    const cache = await caches.open(STATIC_CACHE);
    
    // Check cache first
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        // Try network
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // Cache successful responses
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }
        
        throw new Error('Network response not ok');
    } catch (error) {
        console.log('Service Worker: Static request failed', error);
        
        // For HTML requests, return a basic offline page
        if (request.destination === 'document') {
            return new Response(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Book-kro - Offline</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body { font-family: sans-serif; text-align: center; padding: 2rem; background: #f9fafb; }
                        .container { max-width: 400px; margin: 0 auto; }
                        .emoji { font-size: 4rem; margin-bottom: 1rem; }
                        h1 { color: #1f2937; margin-bottom: 1rem; }
                        p { color: #6b7280; margin-bottom: 2rem; }
                        button { background: #3b82f6; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 0.5rem; cursor: pointer; }
                        button:hover { background: #2563eb; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="emoji">📱</div>
                        <h1>You're Offline</h1>
                        <p>Please check your internet connection and try again.</p>
                        <button onclick="window.location.reload()">Retry</button>
                    </div>
                </body>
                </html>
            `, {
                headers: { 'Content-Type': 'text/html' }
            });
        }
        
        return new Response('Network error', { status: 408 });
    }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-favorites') {
        event.waitUntil(syncFavorites());
    }
    
    if (event.tag === 'sync-bookings') {
        event.waitUntil(syncBookings());
    }
});

// Sync favorites when back online
async function syncFavorites() {
    console.log('Service Worker: Syncing favorites...');
    
    try {
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({
                type: 'SYNC_FAVORITES',
                message: 'Syncing favorites...'
            });
        });
    } catch (error) {
        console.error('Service Worker: Failed to sync favorites', error);
    }
}

// Sync bookings when back online
async function syncBookings() {
    console.log('Service Worker: Syncing bookings...');
    
    try {
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({
                type: 'SYNC_BOOKINGS',
                message: 'Syncing bookings...'
            });
        });
    } catch (error) {
        console.error('Service Worker: Failed to sync bookings', error);
    }
}

// Push notification handling
self.addEventListener('push', (event) => {
    const options = {
        body: 'New movies available!',
        icon: '/assets/icon-192x192.png',
        badge: '/assets/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Explore',
                icon: '/assets/checkmark.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/assets/xmark.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Book-kro', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Handle messages from main thread
self.addEventListener('message', (event) => {
    const { type, data } = event.data;
    
    switch (type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;
            
        case 'GET_VERSION':
            event.ports[0].postMessage({ version: CACHE_NAME });
            break;
            
        case 'CLEAR_CACHE':
            clearAllCaches().then(() => {
                event.ports[0].postMessage({ success: true });
            });
            break;
    }
});

// Clear all caches
async function clearAllCaches() {
    const cacheNames = await caches.keys();
    return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
    );
}

console.log('Service Worker: Loaded');
