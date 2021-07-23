/**
 * DTO to represent plugin descriptor (teqfw.json) structure that is related to 'core' plugin.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Api_Dto_Plugin_Desc';

// MODULE'S CLASSES
export default class TeqFw_Core_Back_Api_Dto_Plugin_Desc {
    /**
     * List of modules with CLI commands.
     * @type {string[]}
     */
    commands;
    /**
     * Module with plugin initialization function to launch it on app init.
     * @type {string}
     */
    onInit;
    /**
     * Module with plugin finalization function to launch it on app stop.
     * @type {string}
     */
    onStop;
}

// attributes names to use as aliases in queries to object props
TeqFw_Core_Back_Api_Dto_Plugin_Desc.COMMANDS = 'commands';
TeqFw_Core_Back_Api_Dto_Plugin_Desc.ON_INIT = 'onInit';
TeqFw_Core_Back_Api_Dto_Plugin_Desc.ON_STOP = 'onStop';

/**
 * Factory to create new DTO instances.
 * @memberOf TeqFw_Core_Back_Api_Dto_Plugin_Desc
 */
export class Factory {
    constructor() {
        /**
         * @param {TeqFw_Core_Back_Api_Dto_Plugin_Desc|null} data
         * @return {TeqFw_Core_Back_Api_Dto_Plugin_Desc}
         */
        this.create = function (data = null) {
            const res = new TeqFw_Core_Back_Api_Dto_Plugin_Desc();
            res.commands = Array.isArray(data?.commands) ? data.commands : [];
            res.onInit = data?.onInit;
            res.onStop = data?.onStop;
            return res;
        }
    }
}

// finalize code components for this es6-module
Object.freeze(TeqFw_Core_Back_Api_Dto_Plugin_Desc);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
