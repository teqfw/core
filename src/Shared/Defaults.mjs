/**
 * Plugin constants (hardcoded configuration) for shared code.
 */
export default class TeqFw_Core_Shared_Defaults {
    DI_WRAP_PROXY = 'proxy'; // wrap DI result as factory proxy
    NAME = '@teqfw/core'; // plugin's node in 'teqfw.json' & '.cfg/local.json'
    NAME_DI = '@teqfw/di'; // DI plugin does not have own hardcoded defaults.

    constructor() {
        Object.freeze(this);
    }
}
