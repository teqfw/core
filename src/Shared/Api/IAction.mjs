/**
 * Abstraction of some functionality with one input & one output argument.
 *
 * @interface
 */
export default class TeqFw_Core_Shared_Api_IAction {
    /**
     *
     * @param {Object} opts
     * @return {Promise<Object>}
     */
    async exec(opts) {}
}
