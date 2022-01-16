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
    /** @type {TeqFw_Core_Back_Api_Dto_Plugin_Desc_Plugin} */
    plugin;
}

// attributes names to use as aliases in queries to object props
TeqFw_Core_Back_Api_Dto_Plugin_Desc.COMMANDS = 'commands';
TeqFw_Core_Back_Api_Dto_Plugin_Desc.PLUGIN = 'plugin';

/**
 * Factory to create new DTO instances.
 * @memberOf TeqFw_Core_Back_Api_Dto_Plugin_Desc
 */
export class Factory {
    static namespace = NS;

    constructor(spec) {
        const {castArray} = spec['TeqFw_Core_Shared_Util_Cast'];
        /** @type {TeqFw_Core_Back_Api_Dto_Plugin_Desc_Plugin.Factory} */
        const fPlugin = spec['TeqFw_Core_Back_Api_Dto_Plugin_Desc_Plugin#Factory$'];
        /**
         * @param {TeqFw_Core_Back_Api_Dto_Plugin_Desc|null} data
         * @return {TeqFw_Core_Back_Api_Dto_Plugin_Desc}
         */
        this.create = function (data = null) {
            const res = new TeqFw_Core_Back_Api_Dto_Plugin_Desc();
            res.plugin = fPlugin.create(data?.plugin);
            res.commands = castArray(data?.commands);
            return res;
        }
    }
}

// finalize code components for this es6-module
Object.freeze(TeqFw_Core_Back_Api_Dto_Plugin_Desc);
