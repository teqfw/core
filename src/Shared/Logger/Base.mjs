/**
 * Base logger contains logs queue and transport to send logs to logs store (console, DB, web service).
 * It should be a singleton for an application.
 */
export default class TeqFw_Core_Shared_Logger_Base {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger_Transport} transport
     * @param {TeqFw_Core_Shared_Dto_Log} dtoLog
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger_Transport$: transport,
            TeqFw_Core_Shared_Dto_Log$: dtoLog,
        }) {
        // VARS
        /** @type {TeqFw_Core_Shared_Dto_Log.Dto[]} */
        const _queue = [];
        /** @type {TeqFw_Core_Shared_Api_Logger_Transport} */
        let _transport = transport;

        // FUNCS
        /**
         * Compose DTO and transport or save message.
         * @param {string} message
         * @param {boolean} isError
         * @param {string} source namespace
         * @param {Object} meta additional data for log message
         */
        function log(message, isError, source, meta) {
            // noinspection JSCheckFunctionSignatures
            const entry = dtoLog.createDto({isError, message, meta, source});
            entry.date = new Date();
            if (_transport) _transport.log(entry);
            else _queue.push(entry);
        }

        // INSTANCE METHODS
        this.error = (source, msg, meta = {}) => {
            let txt;
            if (typeof msg === 'string') txt = msg;
            else if (msg instanceof Error) {
                txt = msg.message;
                meta['stack'] = msg.stack;
            } else if (typeof msg === 'object') txt = msg.toString();
            log(txt, true, source, meta);
        }
        this.info = (source, msg, meta) => log(msg, false, source, meta);
        this.setTransport = function (transport) {
            _transport = transport;
            if (_transport) {
                _queue.forEach(_transport.log);
                _queue.length = 0;
            }
        }
    }

}
