define([
        "./Lib/Queue.js",
    ],
    function (Queue) {

        /**
         * Frontend logger (AMD module).
         * Use "TeqFw_Core_App_Front_Sw_Logger" from service workers.
         *
         * @return {Readonly<TeqFw_Core_App_Front_Logger>}
         * @constructor
         */
        function TeqFw_Core_App_Front_Logger() {
            /**
             * Service worker log item.
             *
             * @typedef {Object} TeqFw_Core_App_Front_Logger.LogRecord
             * @property {Number} date
             * @property {Number} level
             * @property {String} message
             * @property {Object} details
             * @property {Object} markers
             */

            /**
             * Frontend logger configuration.
             *
             * @typedef {Object} TeqFw_Core_App_Front_Logger.Config
             * @property {Number} level_default - Logging level (0 - debug, ..., 3 - error).
             * @property {Object} level_marker - Logging level for logs with given markers
             * (level_marker: {code: {value: 0}}).
             * @property {boolean} trace_source - Add source address to the log if "true".
             */

            const LEVEL_DEBUG = 1;
            const LEVEL_INFO = 2;
            const LEVEL_WARN = 3;
            const LEVEL_ERROR = 4;

            /**
             * Frontend logger configuration.
             *
             * @type {TeqFw_Core_App_Front_Logger.Config}
             * @private
             */
            const _cfg = {
                level_default: LEVEL_DEBUG,
                level_marker: {},
                trace_source: false
            };

            /**
             * Internal queue to temporary save log data before processing with transports.
             *
             * @type {TeqFw_Core_App_Front_Lib_Queue}
             * @private
             */
            const _queue = new Queue();
            /**
             *
             * @type {Array}
             * @private
             */
            const _transports = [];

            /**
             * Compose call stack as array of strings.
             *
             * @param {Number} count number of strings to be skipped (depends from the place where from
             * this function were called).
             * @return {string[]}
             * @private
             */
            function get_stack(count = 3) {
                const stack = Error().stack;
                const lines = stack.split("\n");
                for (let i = 0; i < count; i++) lines.shift();
                return lines;
            }

            /**
             * Temporal implementation of the log output, for console only.
             */
            function process_queue() {
                /* process queue if transports list is not empty */
                if (_transports.length > 0) {
                    let item = _queue.dequeue();
                    while (item !== undefined) {
                        for (const one of _transports) {
                            one.process(item);
                        }
                        item = _queue.dequeue();
                    }
                }
            }

            /**
             * Internal common function to save logs into internal queue and process the queue.
             *
             * @param {Number} level logging level (0..3)
             * @param {String} message
             * @param {Object} details
             * @param {Object} markers
             */
            function log(level, message, details, markers) {

                /**
                 * Scan all markers and define threshold level for logging.
                 *
                 * @param {Object} markers
                 * @return {Number|number} threshold log level for current log record (0..3)
                 */
                function get_threshold_level(markers) {
                    let result = _cfg.level_default || LEVEL_INFO;
                    const level_by_marker = _cfg.level_marker || {};
                    for (const code of Object.keys(markers)) {
                        const value = markers[code];
                        if (
                            (level_by_marker[code] !== undefined) &&
                            (level_by_marker[code][value] !== undefined) &&
                            Number.isInteger(level_by_marker[code][value]) &&
                            (level_by_marker[code][value] < result)
                        ) {
                            // there is special log level for marker bound to the log record
                            result = level_by_marker[code][value];
                        }
                    }
                    return result;
                }

                // get the least log level from config
                const threshold = get_threshold_level(markers);
                if (level >= threshold) {
                    // log items with level not less then configured.
                    const date = (new Date()).getTime(); // int, UTC
                    let msg = message;
                    // add link to source to log message
                    if (_cfg.trace_source) {
                        const stack = get_stack();
                        const source = stack.pop().replace("    at ", "");
                        msg = `${message} (${source})`;
                    }
                    const record = {date, level, message: msg, details, markers};
                    _queue.queue(record);
                    // print or save logs in queue
                    process_queue();
                }
            }

            /**
             * Add transport to logger.
             *
             * @param {Object} transport
             */
            this.addTransport = function (transport) {
                _transports.push(transport);
            };

            this.debug = function (message, details = {}, markers = {}) {
                log(LEVEL_DEBUG, message, details, markers);
            };

            this.info = function (message, details = {}, markers = {}) {
                log(LEVEL_INFO, message, details, markers);
            };

            this.warn = function (message, details = {}, markers = {}) {
                log(LEVEL_WARN, message, details, markers);
            };

            this.error = function (message, details = {}, markers = {}) {
                log(LEVEL_ERROR, message, details, markers);
            };

            /**
             * Merge "spec" with current configuration of the logger.
             * Use this method from browser console.
             *
             * @param {TeqFw_Core_App_Front_Sw_Logger.Config} spec
             */
            this.config = function (spec) {
                Object.assign(_cfg, spec);
                return _cfg;
            };

            return Object.freeze(this);
        }

        return new TeqFw_Core_App_Front_Logger();
    }
);