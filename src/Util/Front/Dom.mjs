/**
 * Set of utilities for frontend activities.
 */
export default class TeqFw_Core_App_Util_Front_Dom {
    constructor() {

        const idCounters = {};

        /**
         * Generate ID for DOM element: text-1, text-2, ...
         *
         * @param {String} prefix
         * @returns {string}
         */
        this.getUniqueId = function (prefix = null) {
            if (!idCounters[prefix]) idCounters[prefix] = 0;
            idCounters[prefix] += 1;
            return (prefix) ? `${prefix}-${idCounters[prefix]}` : `id-${idCounters[prefix]}`;
        };
    }


}
