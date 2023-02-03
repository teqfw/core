/**
 * Default implementation for '..._Api_Logger' is a wrapper for base logger that allows to store separate namespace
 * for wrapper. All wrappers use the same base logger and add own namespace for the logs.
 *
 * @implements TeqFw_Core_Shared_Api_Logger
 */
export default class TeqFw_Core_Shared_Logger {

    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Logger_Base} */
        const base = spec['TeqFw_Core_Shared_Logger_Base$'];

        // VARS
        let _ns = this.constructor.name; // default namespace should be changed after instantiation

        // INSTANCE METHODS
        this.error = (msg, meta) => base.error(_ns, msg, meta);
        this.info = (msg, meta) => base.info(_ns, msg, meta);
        this.setNamespace = (namespace) => _ns = namespace;
    }

}
