/**
 * Transport to redirect logs to console. Default transport for Tequila Framework.
 *
 * @implements TeqFw_Core_Shared_Api_Logger_ITransport
 */
export default class TeqFw_Core_Shared_Mod_Logger_Transport_Console {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Util_Format.formatDateTimeForLog|function} */
        const formatTime = spec['TeqFw_Core_Shared_Util_Format.formatDateTimeForLog'];

        // INSTANCE METHODS
        this.log = (dto) => {
            const dt = formatTime(dto.date);
            const level = (dto.isError) ? 'error' : 'info';
            console.log(`${dt} (${level}): ${dto.message}`);
        }
    }

}
