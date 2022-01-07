/**
 * Process is a piece of functionality that can be launched by some event or directly from other code.
 * In general process may require initialization before run.
 *
 * @interface
 */
export default class TeqFw_Core_Shared_Api_Event_IProcess {
    /**
     * Initialize process (optional method).
     * @return {Promise<void>}
     */
    async init() {}

    /**
     * Perform the duties on direct call.
     * @param {*} opt
     * @return {Promise<*>}
     */
    async run(opt = {}) {}
}
