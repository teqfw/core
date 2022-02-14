/**
 * Core logger.

 * @implements TeqFw_Core_Shared_Api_ILogger
 */
export default class TeqFw_Core_Shared_Mod_Logger {

    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Dto_Log} */
        const dtoLog = spec['TeqFw_Core_Shared_Dto_Log$'];
        /** @type {TeqFw_Core_Shared_Api_Logger_ITransport} */
        const transport = spec['TeqFw_Core_Shared_Api_Logger_ITransport$'];

        // ENCLOSED VARS
        /** @type {TeqFw_Core_Shared_Dto_Log.Dto[]} */
        const _queue = [];
        /** @type {string} */
        let _namespace;
        /** @type {TeqFw_Core_Shared_Api_Logger_ITransport} */
        let _transport = transport;

        // ENCLOSED FUNCS
        function log(msg, isError, meta) {
            const entry = dtoLog.createDto();
            entry.date = new Date();
            entry.isError = isError;
            entry.message = msg;
            entry.meta = meta;
            entry.source = _namespace;
            if (_transport) _transport.log(entry);
            else _queue.push(entry);
        }

        // INSTANCE METHODS
        this.error = (msg, meta) => log(msg, true, meta);
        this.getTransport = () => _transport;
        this.info = (msg, meta) => log(msg, false, meta);
        this.setNamespace = (namespace) => _namespace = namespace;
        this.setTransport = function (transport) {
            _transport = transport;
            _queue.forEach(_transport.log);
            _queue.length = 0;
        }
    }

}
