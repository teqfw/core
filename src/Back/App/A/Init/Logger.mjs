/**
 * Set the transport for the base logger.
 * TODO: Read the logging configuration and set up logging by namespaces.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class TeqFw_Core_Back_App_A_Init_Logger {
    /**
     * @param {TeqFw_Core_Shared_Logger_Base} base
     * @param {TeqFw_Core_Shared_Logger_Transport_Console} trnCons
     */
    constructor(
        {
            TeqFw_Core_Shared_Logger_Base$: base,
            TeqFw_Core_Shared_Logger_Transport_Console$: trnCons,
        }
    ) {
        /**
         * @returns {Promise<void>}
         */
        this.act = async function ({} = {}) {
            // base.setTransport(trnCons);
            // TODO: pause logging before setting the transport
        };
    }

}