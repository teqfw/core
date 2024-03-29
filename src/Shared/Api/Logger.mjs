/**
 * Logger interface. Every object that need logging creates own instance of logger and set own namespace
 * inside this logger. Logger instance compose log DTO and call logging transport to process this DTO.
 *
 * Use this interface to get logger instance from objects container:
 *
 *          const logger = spec['TeqFw_Core_Shared_Api_Logger$$']; // instance
 *          logger.setNamespace(this.constructor.name);
 *
 * This is documentation only code (not executable).
 *
 * @interface
 */
export default class TeqFw_Core_Shared_Api_Logger {

    /**
     * Log the business level errors.
     * @param {string} msg
     * @param {Object} [meta]
     */
    error(msg, meta) {}

    /**
     * Log the exceptions in `try-catch` & `Promise.catch()` blocks.
     * @param {Error} e
     */
    exception(e) {}

    /**
     * Log the regular messages.
     * @param {string} msg
     * @param {Object} [meta]
     */
    info(msg, meta) {}

    /**
     * Set namespace to logger.
     * @param {string} namespace
     */
    setNamespace(namespace) {}

}
