/**
 * Factory to create event message DTO and to provide meta information for DTO & event.
 *
 * This is documentation only code (not executable).
 *
 * @interface
 * @extends TeqFw_Core_Shared_Api_Factory_IDto
 * @deprecated define events in other plugin
 * TODO: use ..._Dto instead of ..._IDto (we have _Api_ in classname)
 */
export default class TeqFw_Core_Shared_Api_Factory_Dto_IEvent {
    /**
     * Return event name.
     * @return {string}
     */
    getEventName() {}
}
