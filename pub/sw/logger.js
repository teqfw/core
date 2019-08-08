(function () {

    /**
     * Logger for Service Worker (is not AMD-module).
     *
     * @return {Readonly<TeqFw_Core_App_Front_Sw_Logger>}
     * @constructor
     * @namespace TeqFw_Core_App_Front_Sw_Logger
     */
    function TeqFw_Core_App_Front_Sw_Logger() {
        /**
         * Service worker log item.
         *
         * @typedef {Object} TeqFw_Core_App_Front_Sw_Logger.LogRecord
         * @property {Number} date
         * @property {Number} level
         * @property {String} message
         */

        /**
         * Service worker log configuration.
         *
         * @typedef {Object} TeqFw_Core_App_Front_Sw_Logger.Config
         * @property {Number} level - Logging level (0 - debug, ..., 3 - error).
         * @property {boolean} use_source - Add source address to the log if "true".
         */

        const LEVEL_DEBUG = 0;
        const LEVEL_INFO = 1;
        const LEVEL_WARN = 2;
        const LEVEL_ERROR = 3;

        /**
         * Internal queue to save log data (FIFO).
         *
         * https://stackoverflow.com/a/53966257/4073821
         *
         * @memberOf TeqFw_Core_App_Front_Sw_Logger
         * @constructor
         * @private
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
             * @param {Object} element
             */
            queue(element) {
                this.set(this.insertionIndex, element);
                this.insertionIndex++;
            }

            /**
             * Get log record from queue.
             *
             * @return {Object}
             */
            dequeue() {
                const result = this.get(this.removalIndex);
                if (result !== undefined) {
                    this.delete(this.removalIndex);
                    this.removalIndex++;
                }
                return result;
            }
        }

        /**
         * Logger configuration.
         *
         * @type {TeqFw_Core_App_Front_Sw_Logger.Config}
         * @private
         */
        const _cfg = {
            level: LEVEL_INFO,
            use_source: false
        };
        /**
         * Internal queue to temporary save log data before processing with transports.
         *
         * @type {TeqFw_Core_App_Front_Sw_Logger.LogQueue}
         * @private
         */
        const _queue = new LogQueue();
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
         * Internal common function to save logs into internal queue and process the queue.
         *
         * @param {Number} level logging level (0..3)
         * @param {String} message
         */
        function log(level, message) {
            if (level >= _cfg.level) {
                // log items with level not less then configured.
                const date = (new Date()).getTime(); // int, UTC
                let msg = message;
                // add link to source to log message
                if (_cfg.use_source) {
                    const stack = get_stack();
                    const source = stack.pop().replace("    at ", "")
                    msg = `${message} (${source})`;
                }
                const record = {date, level, message: msg};
                _queue.queue(record);
                // print or save logs in queue
                process_queue();
            }
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
         * Add transport to logger.
         *
         * @param {Object} transport
         */
        this.addTransport = function (transport) {
            _transports.push(transport);
        };

        /**
         * Log message with "debug" level.
         *
         * @param {String} message
         */
        this.debug = function (message) {
            log(LEVEL_DEBUG, message);
        };

        /**
         * Log message with "info" level.
         *
         * @param {String} message
         */
        this.info = function (message) {
            log(LEVEL_INFO, message);
        };

        /**
         * Log message with "warn" level.
         *
         * @param {String} message
         */
        this.warn = function (message) {
            log(LEVEL_WARN, message);
        };
        /**
         * Log message with "error" level.
         *
         * @param {String} message
         */
        this.error = function (message) {
            log(LEVEL_ERROR, message);
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

    /**
     * Export logger to Service Worker scope.
     *
     * @type {Readonly<TeqFw_Core_App_Front_Sw_Logger>}
     */
    self.logger = new TeqFw_Core_App_Front_Sw_Logger();

}());

