/**
 * Simple logger for the core. It has 2 levels only (info & error) and saves messages into
 * internal store until it receive permission to output logs to console. After that all logs will
 * output to console without delay.
 *
 * This logger saves log messages into internal queue
 * @deprecated use TeqFw_Core_Shared_Api_Logger
 */
// MODULE'S VARS
const LEVEL_INFO = 'info';
const LEVEL_ERROR = 'error';

// MODULE'S FUNCTIONS

/**
 * Convert date as UTC to YYYY/MM/DD HH:MM:SS.
 * @param {Date} date
 * @return {string}
 */
function formatTime(date = null) {
    const y = date.getUTCFullYear();
    const m = `${date.getUTCMonth() + 1}`.padStart(2, '0');
    const d = `${date.getUTCDate()}`.padStart(2, '0');
    const h = `${date.getUTCHours()}`.padStart(2, '0');
    const i = `${date.getUTCMinutes()}`.padStart(2, '0');
    const s = `${date.getUTCSeconds()}`.padStart(2, '0');
    return `${y}/${m}/${d} ${h}:${i}:${s}`;
}

// MODULE'S CLASSES

/**
 * Structure for log record used internally.
 */
class Record {
    /** @type {Date} */
    date;
    /** @type {string} */
    level;
    /** @type {string} */
    message;
}

export default class TeqFw_Core_Shared_Logger {

    constructor() {
        let queue = [];
        let pause = true; // don't output logs to console

        /**
         * Place log record in queue if logger is on pause, otherwise - print logs to console.
         *
         * @param {string} level
         * @param {string} msg
         */
        function write(level, msg) {
            const record = new Record();
            // TODO: use 'process.hrtime()' to get microtime
            record.date = new Date();
            record.level = level;
            record.message = msg;

            if (pause) {
                // put message to internal store
                queue.push(record);
            } else {
                if (queue.length > 0) {
                    // printout all logs then clean internal store
                    for (const one of queue) printLog(one);
                    queue = [];
                }
                printLog(record);
            }
        }

        /**
         * @param {Record} rec
         */
        function printLog(rec) {
            const dt = formatTime(rec.date);
            console.log(`${dt} (${rec.level}): ${rec.message}`);
        }

        /**
         * @param {string} msg
         */
        this.info = function (msg) {
            write(LEVEL_INFO, msg);
        };

        /**
         * @param {string} msg
         */
        this.error = function (msg) {
            write(LEVEL_ERROR, msg);
        };

        /**
         * @param {boolean} data
         */
        this.pause = function (data) {
            pause = data;
        }

        /**
         * Return all stored logs and clean up internal store.
         * @param {boolean} [pause] pause logging output or unfreeze it
         * @return {Array}
         */
        this.reset = function (pause) {
            const res = JSON.parse(JSON.stringify(queue));
            queue = [];
            if (typeof pause === 'boolean') this.pause(pause);
            return res;
        }
    }

}
