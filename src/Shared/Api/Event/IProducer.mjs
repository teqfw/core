/**
 * Event generator interface.
 *
 * @interface
 */
export default class TeqFw_Core_Shared_Api_Event_IProducer {
    /**
     * Emit message about event and run all event handlers with given payload.
     *
     * @param {string} eventName
     * @param {Object} payload
     */
    emit(eventName, payload) {}

    /**
     * Add event listener to event generator.
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
