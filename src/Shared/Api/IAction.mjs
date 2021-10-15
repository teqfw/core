/**
 * Abstraction of some functionality with one input & one output argument.
 * Both input and output arguments are an objects.
 *
 * 'function' notation is better than 'class' notation for an actions but there was some
 * troubles with 'Find Usages' operation in IDEA for 'function' notation.
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
