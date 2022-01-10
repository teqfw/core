/**
 * Interface for event message.
 * @interface
 * @deprecated use TeqFw_Core_Shared_App_Event_Message.Dto
 */
export default class TeqFw_Core_Shared_Api_IEvent {
    /**
     * Create event DTO from given data.
     * @param [data]
     * @return {Object}
     */
    createDto(data) {}

    /**
     * Get event name (should be unique among all other events names).
     * @return {string}
     */
    getName() {}
}
