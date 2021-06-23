/**
 * Frontend configuration DTO.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Front_Data_Config';

// MODULE'S CLASSES
class TeqFw_Core_Front_Data_Config {
    /**
     * Current frontend area (pub, admin, ...).
     * @type {String}
     */
    area;
    /**
     * Base URL for frontend areas ('site.domain.com').
     * @type {String}
     */
    urlBase;
}

/**
 * Factory to create new DTO instances.
 * @memberOf TeqFw_Core_Front_Data_Config
 */
class Factory {
    constructor() {
        /**
         * @param {TeqFw_Core_Front_Data_Config|null} data
         * @return {TeqFw_Core_Front_Data_Config}
         */
        this.create = function (data = null) {
            const res = new TeqFw_Core_Front_Data_Config();
            res.area = data?.area;
            res.urlBase = data?.urlBase;
            return res;
        }
    }
}

// freeze class to deny attributes changes then export class
Object.freeze(TeqFw_Core_Front_Data_Config);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export {
    TeqFw_Core_Front_Data_Config as default,
    Factory
} ;
