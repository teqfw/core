/**
 * Plugin descriptor DTO for '/core/back' node.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Api_Dto_Plugin_Desc_Plugin';

// MODULE'S CLASSES
export default class TeqFw_Core_Back_Api_Dto_Plugin_Desc_Plugin {
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

// attributes names to use as aliases in queries to object props
TeqFw_Core_Back_Api_Dto_Plugin_Desc_Plugin.ON_INIT = 'onInit';
TeqFw_Core_Back_Api_Dto_Plugin_Desc_Plugin.ON_STOP = 'onStop';

/**
 * Factory to create new DTO instances.
 * @memberOf TeqFw_Core_Back_Api_Dto_Plugin_Desc_Plugin
 */
export class Factory {
    static namespace = NS;

    constructor(spec) {
        const {castString} = spec['TeqFw_Core_Shared_Util_Cast'];
        /**
         * @param {TeqFw_Core_Back_Api_Dto_Plugin_Desc_Plugin|null} data
         * @return {TeqFw_Core_Back_Api_Dto_Plugin_Desc_Plugin}
         */
        this.create = function (data = null) {
            const res = new TeqFw_Core_Back_Api_Dto_Plugin_Desc_Plugin();
            res.onInit = castString(data?.onInit);
            res.onStop = castString(data?.onStop);
            return res;
        }
    }
}

// finalize code components for this es6-module
Object.freeze(TeqFw_Core_Back_Api_Dto_Plugin_Desc_Plugin);
