/**
 * Event bus interface.
 * This is documentation only code (not executable).
 *
 * @interface
 * @deprecated define events in other plugin
 */
export default class TeqFw_Core_Shared_Api_Event_Bus {
    /**
     * Publish message about event and run all event handlers with given payload.
     * @param {TeqFw_Core_Shared_Mod_Event_Message.Dto|*} message
     */
    publish(message) {}

    /**
     * Add event listener to event bus.
     * @param {string} eventName
     * @param {function} handler
     * @return {TeqFw_Core_Shared_Api_Event_Subscription}
     */
    subscribe(eventName, handler) {}

    /**
     * Remove subscription.
     * @param {TeqFw_Core_Shared_Api_Event_Subscription} subscription
     */
    unsubscribe(subscription) {}
}
