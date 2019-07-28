"use strict";

/**
 * Server side logger. Used by all objects on server side.
 *
 * @return {TeqFw_Core_App_Logger}
 * @constructor
 */
function TeqFw_Core_App_Logger() {

    const LEVEL_DEBUG = 0;
    const LEVEL_INFO = 1;
    const LEVEL_WARN = 2;
    const LEVEL_ERROR = 3;
    const TEQ_FW_LOG_MARKERS = "teqFwLogMarkers";

    class LogQueue extends Map {
        constructor() {
            super();
            this.insertionIndex = 0;
            this.removalIndex = 0;
        }

        queue(element) {
            this.set(this.insertionIndex, element);
            this.insertionIndex++;
        }

        /**
         * Get last queued item.
         *
         * @return {Object}
         */
        getLast() {
            const result = this.get(this.insertionIndex - 1);
            return result;
        }

        dequeue() {
            const el = this.get(this.removalIndex);
            if (typeof el !== "undefined") {
                this.delete(this.removalIndex);
                this.removalIndex++;
            }
            return el;
        }
    }

    const _queue = new LogQueue();

    function log(level, first, second, ...rest) {
        const record = {};
        const date_utc = (new Date()).getTime(); //int
        record.date = date_utc;
        record.level = level;
        if (typeof first === "string") {
            // debug("message"...)
            record.message = first;
            record.markers = [];
            if (second !== undefined) {
                // debug("message", details)
                record.details = second;
            }
        } else if (typeof first === "object") {
            // debug(context...)
            if (first[TEQ_FW_LOG_MARKERS] !== undefined) {
                record.markers = first[TEQ_FW_LOG_MARKERS];
            } else {
                record.markers = [];
            }
            if (typeof second === "string") {
                // debug(context, message...)
                record.message = second;
                if (rest.length === 1) {
                    record.details = rest[0];
                }
            }
        } else {
            throw "Logger signature error. Unexpected types of arguments!";
        }
        _queue.queue(record);
        console.log(JSON.stringify(record));
    };

    this.debug = function () {
        const params = Array.prototype.slice.call(arguments);
        params.unshift(LEVEL_DEBUG);
        log.apply(this, params);
    };

    this.info = function () {
        const params = Array.prototype.slice.call(arguments);
        params.unshift(LEVEL_INFO);
        log.apply(this, params);
    };

    this.warn = function () {
        const params = Array.prototype.slice.call(arguments);
        params.unshift(LEVEL_WARN);
        log.apply(this, params);
    };

    this.error = function () {
        const params = Array.prototype.slice.call(arguments);
        params.unshift(LEVEL_ERROR);
        log.apply(this, params);
    };

    this.getLast = function () {
        return _queue.getLast();
    }

    /* Object finalization (result) */
    return Object.freeze(this);
}

/* Module exports */
module.exports = TeqFw_Core_App_Logger;