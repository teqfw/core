/**
 * Factory to create 'Meta-data for Event Message' DTO.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Shared_App_Event_Message_Meta';

/**
 * @memberOf TeqFw_Core_Shared_App_Event_Message_Meta
 * @type {Object}
 */
const ATTR = {
    NAME: 'name',
    PUBLISHED: 'published',
    UUID: 'uuid',
};

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Core_Shared_App_Event_Message_Meta
 */
class Dto {
    static namespace = NS;
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
export default class TeqFw_Core_Shared_App_Event_Message_Meta {

    constructor(spec) {
        /** @type {TeqFw_Core_Shared_Util_Cast.castDate|function} */
        const castDate = spec['TeqFw_Core_Shared_Util_Cast.castDate'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];
        /** @type {TeqFw_Core_Shared_Lib_Uuid.v4|function} */
        const v4 = spec['TeqFw_Core_Shared_Lib_Uuid.v4'];

        // INSTANCE METHODS
        /**
         * @param {TeqFw_Core_Shared_App_Event_Message_Meta.Dto} data
         * @return {TeqFw_Core_Shared_App_Event_Message_Meta.Dto}
         */
        this.createDto = function (data = null) {
            const res = new Dto();
            res.name = castString(data?.name);
            res.published = castDate(data?.published) ?? new Date();
            res.uuid = castString(data?.uuid) ?? v4();
            return res;
        }

        this.getAttributes = () => ATTR;

        this.getAttrNames = () => Object.values(ATTR);
    }

}

// finalize code components for this es6-module
Object.freeze(ATTR);
