/**
 * Abstraction for event model. The model defines event data structure (DTO) and collects listeners.
 *
 * @interface
 */
export default class TeqFw_Core_Shared_Api_Event_IModel {
    /**
     * Add handler function to run on event.
     * @param {function} handler
     */
    addListener(handler) {}

    /**
     * Emit event.
     * @param {*} data
     */
    emit(data) {}
}
