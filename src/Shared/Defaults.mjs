/**
 * Plugin constants (hardcoded configuration) for shared code.
 */
export default class TeqFw_Core_Shared_Defaults {
    DI_COMP_AS_IS;
    DI_COMP_FACTORY;
    DI_LIFE_INSTANCE;
    DI_LIFE_SINGLETON;

    DI_WRAP_PROXY = 'proxy'; // wrap DI result as factory proxy
    // TODO: take this name from 'package.json'
    NAME = '@teqfw/core'; // plugin's node in 'teqfw.json' & '.cfg/local.json'
    NAME_DI = '@teqfw/di'; // DI plugin does not have own hardcoded defaults.

    /**
     * @param {TeqFw_Di_Defs} DEF_DI
     */
    constructor(
        {
            TeqFw_Di_Defs$: DEF_DI,
        }
    ) {
        this.DI_COMP_AS_IS = DEF_DI.CA;
        this.DI_COMP_FACTORY = DEF_DI.CF;
        this.DI_LIFE_INSTANCE = DEF_DI.LI;
        this.DI_LIFE_SINGLETON = DEF_DI.LS;
    }
}
