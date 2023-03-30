/**
 * Namespaces for objects that initialize and stop any plugin on application start/stop.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Plugin_Dto_Desc_Plugin';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Core_Back_Plugin_Dto_Desc_Plugin
 */
class Dto {
    static namespace = NS;
    /**
     * Identifier of es6-module with plugin initialization function to launch it on app init.
     * @type {string}
     */
    onInit;
    /**
     * Identifier of es6-module with plugin finalization function to launch it on app stop.
     * @type {string}
     */
    onStop;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class TeqFw_Core_Back_Plugin_Dto_Desc_Plugin {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        // INSTANCE METHODS
        /**
         * @param {TeqFw_Core_Back_Plugin_Dto_Desc_Plugin.Dto} [data]
         * @return {TeqFw_Core_Back_Plugin_Dto_Desc_Plugin.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.onInit = castString(data?.onInit);
            res.onStop = castString(data?.onStop);
            return res;
        }
    }
}