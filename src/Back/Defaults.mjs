/**
 * Plugin level constants (hardcoded configuration).
 */
export default class TeqFw_Core_Back_Defaults {
    CLI_PREFIX = 'core';
    DESC_NODE = 'core';
    /** @type {TeqFw_Di_Back_Defaults} */
    MOD_DI;

    constructor(spec) {
        // EXTRACT DEPS
        this.MOD_DI = spec['TeqFw_Di_Back_Defaults$'];

        // MAIN FUNCTIONALITY
        Object.freeze(this);
    }
}
