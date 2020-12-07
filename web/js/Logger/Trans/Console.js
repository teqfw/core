define([],
    function () {

        /**
         * Transport to printout logs to console.
         *
         * @return {Readonly<TeqFw_Core_App_Front_Logger_Trans_Console>}
         * @constructor
         */
        function TeqFw_Core_App_Front_Logger_Trans_Console() {

            const LEVEL_DEBUG = 1;
            const LEVEL_INFO = 2;
            const LEVEL_WARN = 3;
            const LEVEL_ERROR = 4;

            /**
             * Formatter to output time as "hh:mm:ss".
             *
             * @type {Intl.DateTimeFormat}
             * @private
             */
            const _format = new Intl.DateTimeFormat(
                "en-US-u-hc-h24",
                {hour: "2-digit", minute: "2-digit", second: "2-digit"}
            );

            /**
             * Map integer level to string level.
             *
             * @param {Number} level - Log level (0..3)
             * @return {string}
             */
            function map_level_to_str(level) {
                let result = "UNKWN";
                if (level === LEVEL_DEBUG) {
                    result = "DEBUG";
                } else if (level === LEVEL_INFO) {
                    result = "INFO";
                } else if (level === LEVEL_WARN) {
                    result = "WARN";
                } else if (level === LEVEL_ERROR) {
                    result = "ERROR";
                }
                return result;
            }


            /**
             * Process one log record.
             *
             * @param {TeqFw_Core_App_Front_Sw_Logger.LogRecord} log
             */
            this.process = function (log) {
                const dt = new Date(log.date);
                const ms = String(dt.getMilliseconds()).padStart(3, "0"); // 3 digits length
                const date = _format.format(dt) + "." + ms;
                const level = map_level_to_str(log.level);
                const out = `${date}: ${level} - ${log.message}`;
                // print out to console without links to sources
                // (https://stackoverflow.com/questions/34762774/how-to-hide-source-of-log-messages-in-console)
                if (log.level === LEVEL_DEBUG) {
                    setTimeout(console.debug.bind(console, out));
                } else if (log.level === LEVEL_INFO) {
                    setTimeout(console.info.bind(console, out));
                } else if (log.level === LEVEL_WARN) {
                    setTimeout(console.warn.bind(console, out));
                } else if (log.level === LEVEL_ERROR) {
                    setTimeout(console.error.bind(console, out));
                }

            };

            return Object.freeze(this);
        }

        return new TeqFw_Core_App_Front_Logger_Trans_Console();
    }
);