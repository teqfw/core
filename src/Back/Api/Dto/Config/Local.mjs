/**
 * DTO for local configuration object loaded from './cfg/local.json'.
 * This DTO has no permanent structure.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Api_Dto_Config_Local';

// MODULE'S CLASSES
export default class TeqFw_Core_Back_Api_Dto_Config_Local {}

/**
 * Factory to create new DTO instances.
 * @memberOf TeqFw_Core_Back_Api_Dto_Config_Local
 */
export class Factory {
    constructor() {
        /**
         * @param {TeqFw_Core_Back_Api_Dto_Config_Local|null} data
         * @return {TeqFw_Core_Back_Api_Dto_Config_Local}
         */
        this.create = function (data = null) {
            const obj = (typeof data === 'object')
                ? JSON.parse(JSON.stringify(data)) // make a copy
                : {};
            return Object.assign(new TeqFw_Core_Back_Api_Dto_Config_Local(), obj);
        }
    }
}

// freeze class to deny attributes changes then export class
// Object.freeze(TeqFw_Core_Back_Api_Dto_Config_Local);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
