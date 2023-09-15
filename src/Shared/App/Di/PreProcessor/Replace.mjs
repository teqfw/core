/**
 * Pre-processor handler to replace one object key with another.
 * @implements TeqFw_Di_Api_Container_PreProcessor_Chunk
 */
export default class TeqFw_Core_Shared_App_Di_PreProcessor_Replace {

    constructor() {
        // VARS
        /**
         * Storage for ES modules replacements (interface => implementation).
         * Sample: {['Vnd_Plug_Interface']:'Vnd_Plug_Impl', ...}
         * @type {Object<string, string>}
         */
        const replacements = {};

        // INSTANCE METHODS

        /**
         * Add replacement for ES6 modules.
         *
         * @param {string} orig ('Vnd_Plug_Interface')
         * @param {string} alter ('Vnd_Plug_Impl')
         */
        this.add = function (orig, alter) {
            replacements[orig] = alter;
        };

        this.modify = function (depId, originalId) {
            let module = depId.moduleName;
            while (replacements[module]) module = replacements[module];
            if (module !== depId.moduleName) {
                const res = Object.assign({}, depId);
                res.moduleName = module;
                return res;
            } else
                return depId;
        };
    }

}