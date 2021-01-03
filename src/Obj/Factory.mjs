export default class TeqFw_Core_App_Obj_Factory {

    /**
     * Copy own methods from 'source' to 'target'.
     *
     * @param {Object} target
     * @param {Object} source
     */
    assignObjectMethods(target, source) {
        const methods = Object.getOwnPropertyNames(source)
            .filter(
                p => (typeof source[p] === 'function' && p !== 'constructor')
            );
        const methodsToAssign = {};
        for (const one of methods) {
            methodsToAssign[one] = source[one];
        }
        Object.assign(target, methodsToAssign);
    }

    /**
     * Copy methods from source.__proto__ to target __proto_ (excluding constructor).
     *
     * @param {Object} target
     * @param {Object} source
     */
    assignPrototypeMethods(target, source) {
        const proto = source.__proto__;
        const methods = Object.getOwnPropertyNames(proto)
            .filter(
                p => (typeof proto[p] === 'function' && p !== 'constructor')
            );
        const methodsToAssign = {};
        for (const one of methods) {
            methodsToAssign[one] = proto[one];
        }
        Object.assign(target.__proto__, methodsToAssign);
    }
}
