/**
 * Event bus for backend local events.
 *
 * @namespace TeqFw_Core_Back_App_Event_Bus
 */
// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Core_Shared_Api_Event_IBus
 */
export default class TeqFw_Core_Back_App_Event_Bus {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_App_Event_Bus} */
        const baseEventBus = spec['TeqFw_Core_Shared_App_Event_Bus$$']; // instance

        // MAIN
        Object.assign(this, baseEventBus); // new base instance for every current instance
    }
}
