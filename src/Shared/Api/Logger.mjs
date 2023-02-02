/**
 * Logger interface. Every object that need logging creates own instance of logger and set own namespace
 * inside this logger. Logger instance compose log DTO and call logging transport to process this DTO.
 *
 * This is documentation only code (not executable).
 *
 * @interface
 */
export default class TeqFw_Core_Shared_Api_Logger {

    /**
     * @param {string} msg
     * @param {Object} [meta]
     */
    error(msg, meta) {}

    /**
     * Return current logging transport.
     * @return TeqFw_Core_Shared_Api_Logger_Transport
     */
    getTransport() {}

    /**
     * @param {string} msg
     * @param {Object} [meta]
     */
    info(msg, meta) {}

    /**
     * Set namespace to logger.
     * @param {string} namespace
     */
    setNamespace(namespace) {}

    /**
     * @param {TeqFw_Core_Shared_Api_Logger_Transport} transport
     * @deprecated transport should be injected in DI container
     */
    setTransport(transport) {}
}
