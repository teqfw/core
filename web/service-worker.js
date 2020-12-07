"use strict";
/** =========================================================================================
 * Sync import of the service worker dependencies.
 * ======================================================================================= */
//
self.importScripts("/pub/teqfw-core-app/sw/logger.js");
/** @type {TeqFw_Core_App_Front_Sw_Logger} logger */
const logger = self.logger;
self.importScripts("/pub/teqfw-core-app/sw/logger/trans/console.js");
/** @type {TeqFw_Core_App_Front_Sw_Logger_Trans_Console} log_trans_console */
const logger_trans_console = self.logger_trans_console;
logger.addTransport(logger_trans_console);

/** =========================================================================================
 * Define internal functions to be used by Service Worker itself and
 * by developer (from console).
 * ======================================================================================= */
/**
 * Setup logging level to Service Worker logger. Default: DEBUG (1).
 *
 * @param {Number} level
 * @return {TeqFw_Core_App_Front_Sw_Logger.Config}
 */
function log_debug_level(level = 1) {
    return logger.config({level_default: level});
}

/**
 * Log storage capacity & availability.
 */
function log_storage_state() {
    navigator.storage.estimate().then(estimate => {
        const json = JSON.stringify(estimate);
        logger.info("storage:" + json);
    });
}

/** =========================================================================================
 * Bind listeners on Service Worker events.
 * ======================================================================================= */
self.addEventListener("install", (evt) => {
    logger.debug("Service Worker install.");
    self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
    logger.info("Service Worker activate.");
    log_storage_state();
    self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
    logger.debug("Fetch: " + evt.request.url);
});


