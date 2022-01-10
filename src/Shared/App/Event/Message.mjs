/**
 * Factory to create Event Message DTO.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Shared_App_Event_Message';

/**
 * @memberOf TeqFw_Core_Shared_App_Event_Message
 * @type {Object}
 */
const ATTR = {
    DATA: 'data',
    META: 'meta',
};

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Core_Shared_App_Event_Message
 */
class Dto {
    static namespace = `${NS}.Dto`;
    /** @type {Object} */
    data;
    /** @type {TeqFw_Core_Shared_App_Event_Message_Meta.Dto} */
    meta;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IMeta
 */
export default class TeqFw_Core_Shared_App_Event_Message {

    constructor(spec) {
        /** @type {TeqFw_Core_Shared_Dto_Formless} */
        const dtoFormless = spec['TeqFw_Core_Shared_Dto_Formless$'];
        /** @type {TeqFw_Core_Shared_App_Event_Message_Meta} */
        const dtoMeta = spec['TeqFw_Core_Shared_App_Event_Message_Meta$'];

        // INSTANCE METHODS
        /**
         * @param {TeqFw_Core_Shared_App_Event_Message.Dto|*} data
         * @return {TeqFw_Core_Shared_App_Event_Message.Dto}
         */
        this.createDto = function (data = null) {
            const res = new Dto();
            res.data = dtoFormless.createDto(data?.[ATTR.DATA]);
            res.meta = dtoMeta.createDto(data?.[ATTR.META]);
            return res;
        }

        this.getAttributes = () => ATTR;

        this.getAttrNames = () => Object.values(ATTR);
    }

}

// finalize code components for this es6-module
Object.freeze(ATTR);
