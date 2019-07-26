"use strict";

const CACHE = "teqfw-cache";

self.addEventListener("install", (evt) => {
    console.log("[ServiceWorker] Install");
    log_storage_state();
    self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
    console.log("[ServiceWorker] Activate");
    log_storage_state();
    self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
    console.log("[ServiceWorker] Fetch", evt.request.url);
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