/**
 * Transport to redirect logs to console. Default transport for Tequila Framework.
 *
 * @implements TeqFw_Core_Shared_Api_Logger_Transport
 */
export default class TeqFw_Core_Shared_Logger_Transport_Console {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Util_Format.dateTimeForLog|function} */
        const formatTime = spec['TeqFw_Core_Shared_Util_Format.dateTimeForLog'];

        // INSTANCE METHODS

        /**
         * Log entry to some media (console, file, DB, service, ...).
         * @param {TeqFw_Core_Shared_Dto_Log.Dto} dto
         */
        this.log = function (dto) {
            const dt = formatTime(dto.date);
            const level = (dto.isError) ? 'error' : 'info';
            console.log(`${dt} (${level} ${dto.source}}): ${dto.message}`);
        };
    }

}
