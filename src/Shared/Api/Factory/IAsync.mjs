/**
 * Abstraction of functionality that creates some objects asynchronously.
 *
 * 'function' notation is better than 'class' notation for an actions but there were some
 * troubles with 'Find Usages' operation in IDEA for 'function' notation.
 *
 * This is documentation only code (not executable).
 *
 * @interface
 */
export default class TeqFw_Core_Shared_Api_Factory_IAsync {
    /**
     *
     * @param {*} [opts]
     * @return {Promise<*>}
     */
    async create(opts) {}
}
