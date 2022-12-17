/**
 * Factory to create 'Meta-data for Event Message' DTO.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Shared_Mod_Event_Message_Meta';

/**
 * @memberOf TeqFw_Core_Shared_Mod_Event_Message_Meta
 * @type {Object}
 */
const ATTR = {
    EXPIRATION: 'expiration',
    NAME: 'name',
    PUBLISHED: 'published',
    UUID: 'uuid',
};

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Core_Shared_Mod_Event_Message_Meta
 */
class Dto {
    static namespace = NS;
    /** @type {Date} */
    expiration;
    /** @type {string} */
    name;
    /** @type {Date} */
    published;
    /** @type {string} */
    uuid;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IMeta
 */
export default class TeqFw_Core_Shared_Mod_Event_Message_Meta {

    constructor(spec) {
        /** @type {TeqFw_Core_Shared_Util_Cast.castDate|function} */
        const castDate = spec['TeqFw_Core_Shared_Util_Cast.castDate'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];
        /** @type {TeqFw_Core_Shared_Api_Util_Crypto.randomUUID|function} */
        const randomUUID = spec['TeqFw_Core_Shared_Api_Util_Crypto.randomUUID'];

        // INSTANCE METHODS
        /**
         * @param {TeqFw_Core_Shared_Mod_Event_Message_Meta.Dto} data
         * @return {TeqFw_Core_Shared_Mod_Event_Message_Meta.Dto}
         */
        this.createDto = function (data = null) {
            // create DTO and copy input data to this DTO
            const res = Object.assign(new Dto(), data);
            // then init this DTO props
            res.expiration = castDate(data?.expiration);
            if (!res.expiration) {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                res.expiration = tomorrow;
            }
            res.name = castString(data?.name);
            res.published = castDate(data?.published) ?? new Date();
            res.uuid = castString(data?.uuid) ?? randomUUID();
            return res;
        }

        this.getAttributes = () => ATTR;

    }

}

// finalize code components for this es6-module
Object.freeze(ATTR);
