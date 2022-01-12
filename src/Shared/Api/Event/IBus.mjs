/**
 * Event bus interface.
 * This is documentation only code (not executable).
 *
 * @interface
 */
export default class TeqFw_Core_Shared_Api_Event_IBus {
    /**
     * Publish message about event and run all event handlers with given payload.
     * @param {TeqFw_Core_Shared_App_Event_Message.Dto|*} message
     */
    publish(message) {}

    /**
     * Add event listener to event bus.
     * @param {string} eventName
     * @param {function} handler
     * @return {TeqFw_Core_Shared_Api_Event_ISubscription}
     */
    subscribe(eventName, handler) {}

    /**
     * Remove subscription.
     * @param {TeqFw_Core_Shared_Api_Event_ISubscription} subscription
     */
    unsubscribe(subscription) {}
}
