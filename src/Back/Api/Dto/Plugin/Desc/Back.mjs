/**
 * Plugin descriptor DTO for '/core/back' node.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Api_Dto_Plugin_Desc_Back';

// MODULE'S CLASSES
export default class TeqFw_Core_Back_Api_Dto_Plugin_Desc_Back {
    /**
     * Es6-module with plugin initialization function to launch it on app init.
     * @type {string}
     */
    onInit;
    /**
     * ES6-module with plugin finalization function to launch it on app stop.
     * @type {string}
     */
    onStop;
}

// attributes names to use as aliases in queries to object props
TeqFw_Core_Back_Api_Dto_Plugin_Desc_Back.ON_INIT = 'onInit';
TeqFw_Core_Back_Api_Dto_Plugin_Desc_Back.ON_STOP = 'onStop';

/**
 * Factory to create new DTO instances.
 * @memberOf TeqFw_Core_Back_Api_Dto_Plugin_Desc_Back
 */
export class Factory {
    constructor() {
        /**
         * @param {TeqFw_Core_Back_Api_Dto_Plugin_Desc_Back|null} data
         * @return {TeqFw_Core_Back_Api_Dto_Plugin_Desc_Back}
         */
        this.create = function (data = null) {
            const res = new TeqFw_Core_Back_Api_Dto_Plugin_Desc_Back();
            res.onInit = data?.onInit;
            res.onStop = data?.onStop;
            return res;
        }
    }
}

// finalize code components for this es6-module
Object.freeze(TeqFw_Core_Back_Api_Dto_Plugin_Desc_Back);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
