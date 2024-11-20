/**
 * Abstraction of asynchronous functionality with one input & one output argument.
 * Both input and output arguments are an objects.
 *
 * 'function' notation is better than 'class' notation for an actions but there were some
 * troubles with 'Find Usages' operation in IDEA for 'function' notation.
 *
 * This is documentation only code (not executable).
 *
 * @interface
 * @deprecated use TeqFw_Core_Shared_Api_Act
 */
export default class TeqFw_Core_Shared_Api_Action_Async {
    /**
     * @param {Object} [opts]
     * @returns {Promise<Object>}
     */
    async exec(opts) {}
}
