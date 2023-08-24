/**
 * Plugin constants (hardcoded configuration) for shared code.
 */
export default class TeqFw_Core_Shared_Defaults {
    NAME = '@teqfw/core'; // plugin's node in 'teqfw.json' & './cfg/local.json'
    NAME_DI = '@teqfw/di'; // DI plugin's node in 'teqfw.json' & './cfg/local.json'

    /**
     * @type {string}
     * @deprecated move it to web-plugin
     */
    DIR_SRC_FRONT = 'Auth';
    DIR_SRC_SHARED = 'Shared';

    constructor() {
        Object.freeze(this);
    }
}
