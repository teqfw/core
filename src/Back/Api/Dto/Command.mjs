/**
 * Data structure to add command to commander (@see TeqFw_Core_Back_App.init.initCommander.addCommand).
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Api_Dto_Command_Data';

// MODULE'S CLASSES
class TeqFw_Core_Back_Api_Dto_Command_Data {
    /**
     * Commander action (@see https://www.npmjs.com/package/commander#commands).
     *
     *  @type {Function}
     */
    action;
    /** @type {string} */
    desc;
    /** @type {string} */
    name;
    /** @type {string} */
    ns;
}

/**
 * Factory to create new DTO instances.
 * @memberOf TeqFw_Core_Back_Api_Dto_Command_Data
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {typeof TeqFw_Core_Back_Api_Dto_Command_Data_Item} */
        const DItem = spec['TeqFw_Core_Back_Api_Dto_Command_Data_Item#']; // class
        /** @type {TeqFw_Core_Back_Api_Dto_Command_Data_Item.Factory} */
        const fItem = spec['TeqFw_Core_Back_Api_Dto_Command_Data_Item#Factory$']; // singleton

        /**
         * @param {TeqFw_Core_Back_Api_Dto_Command_Data|null} data
         * @return {TeqFw_Core_Back_Api_Dto_Command_Data}
         */
        this.create = function (data = null) {
            const res = new TeqFw_Core_Back_Api_Dto_Command_Data();
            res.amount = data?.amount ?? 0;
            res.success = data?.success ?? false;
            res.currency = data?.currency;
            res.item = (data?.item instanceof DItem) ? data.item : fItem.create(data?.item);
            res.date = data?.date
                ? (data.date instanceof Date) ? data.date : new Date(data?.date)
                : null;
            res.id = data?.id;
            res.items = Array.isArray(data?.items)
                ? data.items.map((one) => (one instanceof DItem) ? one : fItem.create(one))
                : [];
            res.state = data?.state;
            res.userId = data?.userId;
            return res;
        }
    }
}

// freeze class to deny attributes changes then export class
Object.freeze(TeqFw_Core_Back_Api_Dto_Command_Data);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export {
    TeqFw_Core_Back_Api_Dto_Command_Data as default,
    Factory
} ;
