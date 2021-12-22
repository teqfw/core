/**
 * Abstraction of functionality that creates some objects synchronously.
 *
 * 'function' notation is better than 'class' notation for an actions but there were some
 * troubles with 'Find Usages' operation in IDEA for 'function' notation.
 *
 * @interface
 */
export default class TeqFw_Core_Shared_Api_Sync_IFactory {
    /**
     *
     * @param {Object} opts
     * @return {Object}
     */
    create(opts = {}) {}
}
