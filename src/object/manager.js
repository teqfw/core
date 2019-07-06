/**
 * Scan modules in `node_modules` and compose list of TeqFW modules.
 */
"use strict";
const NS = "teqfw_core_all_object_manager";

/**
 *
 * @param spec
 * @constructor
 */
function TeqFw_Core_Object_Manager(
    TeqFw_Core_Server,
    TeqFw_Core_Commander
) {
    const modules = {};

    this.addModule = function (spec) {
        let {module, ns, path, src} = spec;
        modules[module] = {
            ns: ns,
            path: path,
            src: src
        };
    }

    this.get = function (spec) {
        const boo = TeqFw_Core_Object_Manager;
        const params = getParamNames(boo);
        const result = new boo();
        return result;
    }

    /**
     * Get array of function parameters.
     *
     * @param {Function} fn
     * @returns {RegExpMatchArray}
     */
    function getParamNames(fn) {
        const funStr = fn.toString();
        return funStr.slice(funStr.indexOf("(") + 1, funStr.indexOf(")")).match(/([^\s,]+)/g);
    }
}


module.exports = TeqFw_Core_Object_Manager;