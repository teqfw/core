"use strict";
// sync import of the service worker logger & transports
self.importScripts("/pub/teqfw-core-app/sw/logger.js");
/** @type {TeqFw_Core_App_Front_Sw_Logger} logger */
const logger = self.logger;
self.importScripts("/pub/teqfw-core-app/sw/logger/trans/console.js");
/** @type {TeqFw_Core_App_Front_Sw_Logger_Trans_Console} log_trans_console */
const logger_trans_console = self.logger_trans_console;
logger.addTransport(logger_trans_console);

const CACHE = "teqfw-cache";

self.addEventListener("install", (evt) => {
    logger.debug("[ServiceWorker] Install");
    log_storage_state();
    self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
    logger.info("[ServiceWorker] Activate");
    log_storage_state();
    self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
    logger.debug("[ServiceWorker] Fetch: " + evt.request.url);
});


/**
 * Log storage capacity & availability.
 */
function log_storage_state() {
    navigator.storage.estimate().then(estimate => {
        const json = JSON.stringify(estimate);
        logger.debug("storage:" + json);
    });
}