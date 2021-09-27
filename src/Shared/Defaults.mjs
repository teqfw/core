/**
 * Plugin constants (hardcoded configuration) for shared code.
 */
export default class TeqFw_Core_Shared_Defaults {

    // folders names for sources areas ('back' - nodejs imports are allowed, 'front' & 'shared' - disallowed)
    DIR_SRC_BACK = 'Back';
    DIR_SRC_FRONT = 'Front';
    DIR_SRC_SHARED = 'Shared';

    NAME = '@teqfw/core'; // plugin's node in 'teqfw.json' & './cfg/local.json'

    constructor() {
        Object.freeze(this);
    }
}
