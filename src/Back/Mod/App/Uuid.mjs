/**
 * Backend application UUID.
 *
 * @namespace TeqFw_Core_Back_Mod_App_Uuid
 */
export default class TeqFw_Core_Back_Mod_App_Uuid {
    constructor() {
        let uuid;
        this.get = () => uuid;
        this.set = (data) => uuid = data;
    }
}
