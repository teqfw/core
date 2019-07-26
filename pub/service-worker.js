"use strict";

var CACHE = 'teqfw-cache';

self.addEventListener("install", (evt) => {
    console.log("[ServiceWorker] Install");
    self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
    console.log("[ServiceWorker] Activate");
    self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
    console.log("[ServiceWorker] Fetch", evt.request.url);
    log_storage_state();

    evt.respondWith(fetch_resource(evt));
});


/**
 * Log storage capacity & availability.
 */
function log_storage_state() {
    navigator.storage.estimate().then(estimate => {
        const json = JSON.stringify(estimate);
        console.log("storage:" + json);
    });
}

async function fetch_resource(event) {
    // Try to get the response from a cache.
    const cache = await caches.open(CACHE);
    const cachedResponse = await cache.match(event.request);

    if (cachedResponse) {
        console.log(`"${event.request.url}" is got from cache.`);
        return cachedResponse.clone();
    }

    const result = await fetch(event.request);
    if (result && result.ok) {
        // If result was ok save it to cache
        // https://stackoverflow.com/a/37747473/4073821
        await cache.put(event.request, result.clone());
        console.log(`"${event.request.url}" is put to the cache.`);
    }
    return result;
}