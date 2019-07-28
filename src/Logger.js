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

    /**
     * Internal queue to save log data (FIFO).
     *
     * https://stackoverflow.com/a/53966257/4073821
     */
    class LogQueue extends Map {
        constructor() {
            super();
            this.insertionIndex = 0;
            this.removalIndex = 0;
        }

        /**
         * Put log record into the queue.
         *
         * @param element
         */
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

        /**
         * Get log record from queue.
         *
         * @return {Object}
         */
        dequeue() {
            const result = this.get(this.removalIndex);
            if (typeof result !== "undefined") {
                this.delete(this.removalIndex);
                this.removalIndex++;
            }
            return result;
        }
    }

    /**
     * Internal queue to temporary save log data before processing.
     *
     * @type {LogQueue}
     * @private
     */
    const _queue = new LogQueue();


    /**
     * Place log record in queue, then process queue against existing transports.
     *
     * @private
     * @param {Number} level
     * @param {string|Object} first
     * @param {string|Object} [second]
     * @param {Object} [third]
     */
    function write(level, first, second, third) {
        const record = {};
        record.date = (new Date()).getTime(); // int, UTC
        record.level = level;
        record.markers = [];

        if (arguments.length === 2) {
            if (typeof first === "string") {
                // debug("message")
                record.message = first;
            } else {
                // OK, it is not a first argument in this function but first argument in public wrapper.
                throw "Logger error. String message is expected as first argument!";
            }
        } else if (arguments.length === 3) {
            if ((typeof first === "object") && (typeof second === "string")) {
                // debug(this, message)
                if (first[TEQ_FW_LOG_MARKERS] !== undefined) {
                    record.markers = first[TEQ_FW_LOG_MARKERS];
                }
                record.message = second;
            } else if (typeof first === "string") {
                // debug(message, details)
                record.message = first;
                record.details = second;
            } else {
                // OK, it is not a first & second argument in this function, but (see upper)).
                throw "Logger error. Check first & second arguments (should be object/string or string/object)!";
            }
        } else if (arguments.length === 4) {
            if (
                (typeof first === "object") &&
                (typeof second === "string") &&
                (typeof third === "object")
            ) {
                // debug(this, message, details)
                if (first[TEQ_FW_LOG_MARKERS] !== undefined) {
                    record.markers = first[TEQ_FW_LOG_MARKERS];
                }
                record.message = second;
                record.details = third;
            } else {
                throw "Logger error. Check arguments types (object/string/object are expected)!";
            }
        } else {
            // OK, it is 4 arguments max are expected, but (see upper)).
            throw "Logger error. Max 3 arguments are expected!";
        }
        _queue.queue(record);
        // print or save logs in queue
        process_queue();
    }

    /**
     * Temporal implementation of the log output, for console only.
     */
    function process_queue() {
        let item = _queue.dequeue();
        while (item !== undefined) {
            console.log(JSON.stringify(item));
            item = _queue.dequeue();
        }
    }

    this.debug = function () {
        const params = Array.prototype.slice.call(arguments);
        params.unshift(LEVEL_DEBUG);
        write.apply(this, params);
    };

    this.info = function () {
        const params = Array.prototype.slice.call(arguments);
        params.unshift(LEVEL_INFO);
        write.apply(this, params);
    };

    this.warn = function () {
        const params = Array.prototype.slice.call(arguments);
        params.unshift(LEVEL_WARN);
        write.apply(this, params);
    };

    this.error = function () {
        const params = Array.prototype.slice.call(arguments);
        params.unshift(LEVEL_ERROR);
        write.apply(this, params);
    };

    this.getLast = function () {
        return _queue.getLast();
    }

    /* Object finalization (result) */
    return Object.freeze(this);
}

/* Module exports */
module.exports = TeqFw_Core_App_Logger;