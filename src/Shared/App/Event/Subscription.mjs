/**
 * Default implementation for event subscription.
 * @implements TeqFw_Core_Shared_Api_Event_ISubscription
 */
export default class TeqFw_Core_Shared_App_Event_Subscription {
    /**
     * Use this constructor with `new` operator.
     * @param {string} eventName
     * @param {function} handler
     */
    constructor(eventName, handler) {

        this.getEventName = () => eventName;

        this.getHandler = () => handler;
    }
}
