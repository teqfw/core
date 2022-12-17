/**
 * Logger transport interface.
 *
 * @interface
 * TODO: use ..._Dto instead of ..._IDto (we have _Api_ in classname)
 */
export default class TeqFw_Core_Shared_Api_Logger_ITransport {

    /**
     * Log entry to some media (console, file, DB, service, ...).
     * @param {TeqFw_Core_Shared_Dto_Log.Dto} dto
     */
    log(dto) {}

}
