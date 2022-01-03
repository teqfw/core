/**
 * Abstraction for event generator.
 *
 * @interface
 */
export default class TeqFw_Core_Shared_Api_Event_IProducer {

    /**
     * Emit message about event and run all event handlers.
     *
     * @param {string} eventName
     * @param {Object} message
     */
    emit(eventName, message) {}

    /**
     * Add event listener to event generator.
     * @param {string} eventName
     * @param {function} handler
     * @return {TeqFw_Core_Shared_Api_Event_ISubscription}
     */
    subscribe(eventName, handler) {}
}
