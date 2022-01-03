/**
 * Abstraction of functionality with one input & one output argument.
 * Both input and output arguments are an objects.
 *
 * 'function' notation is better than 'class' notation for an actions but there were some
 * troubles with 'Find Usages' operation in IDEA for 'function' notation.
 *
 * @interface
 * @deprecated we should not separate by sync/async on top level (./Action/IAsync is better than ./Async/IAction)
 */
export default class TeqFw_Core_Shared_Api_Async_IAction {
    /**
     * @param {Object} opts
     * @return {Promise<Object>}
     */
    async exec(opts = {}) {}
}
