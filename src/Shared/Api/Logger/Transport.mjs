/**
 * Logger transport interface.
 *
 * @interface
 */
export default class TeqFw_Core_Shared_Api_Logger_Transport {

    /**
     * Log entry to some media (console, file, DB, service, ...).
     * @param {TeqFw_Core_Shared_Dto_Log.Dto} dto
     */
    log(dto) {}

}
