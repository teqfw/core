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
 * TODO: use ..._Dto instead of ..._IDto (we have _Api_ in classname)
 */
export default class TeqFw_Core_Shared_Api_Action_IAsync {
    /**
     * @param {Object} [opts]
     * @return {Promise<Object>}
     */
    async exec(opts) {}
}
