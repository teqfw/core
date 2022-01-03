/**
 * Abstraction of functionality that creates some objects synchronously.
 *
 * 'function' notation is better than 'class' notation for an actions but there were some
 * troubles with 'Find Usages' operation in IDEA for 'function' notation.
 *
 * @interface
 * @deprecated we should not separate by sync/async on top level (./Factory/ISync is better than ./Sync/IFactory)
 */
export default class TeqFw_Core_Shared_Api_Sync_IFactory {
    /**
     *
     * @param {Object} opts
     * @return {Object}
     */
    create(opts = {}) {}
}
