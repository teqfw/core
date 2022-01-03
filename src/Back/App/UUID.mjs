/**
 * Backend application UUID.
 *
 * @namespace TeqFw_Core_Back_App_UUID
 */
export default class TeqFw_Core_Back_App_UUID {
    constructor() {
        let uuid;
        this.get = () => uuid;
        this.set = (data) => uuid = data;
    }
}
