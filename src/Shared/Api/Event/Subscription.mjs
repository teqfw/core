/**
 * Abstraction for event subscription.
 * This is documentation only code (not executable).
 * @interface
 * @deprecated define events in other plugin
 */
export default class TeqFw_Core_Shared_Api_Event_Subscription {
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
