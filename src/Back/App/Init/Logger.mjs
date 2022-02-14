/**
 * Application logger logs events on app startup, when DI is not fully initialized yet.
 * We have no custom rewrites for logger transport interface on this stage.
 * Init logger just collect logs inside and process it after transport will be set manually.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_App_Init_Logger';

// MODULE'S CLASSES
export default class TeqFw_Core_Back_App_Init_Logger {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Dto_Log} */
        const dtoLog = spec['TeqFw_Core_Shared_Dto_Log$'];

        // ENCLOSED VARS
        /** @type {TeqFw_Core_Shared_Dto_Log.Dto[]} */
        const _queue = [];
        /** @type {TeqFw_Core_Shared_Api_Logger_ITransport} */
        let _transport;

        // ENCLOSED FUNCS

        function log(msg, isError) {
            const entry = dtoLog.createDto();
            entry.date = new Date();
            entry.isError = isError;
            entry.message = msg;
            entry.source = NS;
            if (_transport) _transport.log(entry);
            else _queue.push(entry);
        }

        // INSTANCE METHODS
        this.error = (msg) => log(msg, true);
        this.info = (msg) => log(msg, false);
        this.setTransport = function (transport) {
            _transport = transport;
            _queue.forEach(_transport.log);
            _queue.length = 0;
        }
    }
}
