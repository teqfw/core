/**
 * Abstraction for event subscription.
 *
 * @interface
 */
export default class TeqFw_Core_Shared_Api_Event_ISubscription {
    /**
     * Subscribed event name.
     * @return {string}
     */
    getEventName() {}

    /**
     * @return {function}
     */
    getHandler() {}
}
