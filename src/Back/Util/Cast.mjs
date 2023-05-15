/**
 * Set of utilities for type casting of input data on the backend.
 * @namespace TeqFw_Core_Back_Util_Cast
 */
// MODULE'S IMPORT
import {Buffer} from 'node:buffer';

// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Util_Cast';

// MODULE'S FUNCTIONS

/**
 * Cast input data into 'Uint8Array' data type.
 * @param {*} data
 * @return {Buffer}
 * @memberOf TeqFw_Core_Back_Util_Cast
 */
function castBuffer(data) {
    if (data instanceof Buffer) {
        const res = Buffer.alloc(data.length);
        data.copy(res);
        return res;
    } else if (data instanceof Uint8Array) {
        return Buffer.from(data);
    } else {
        return Buffer.from(data);
    }

}

// MODULE'S MAIN
// finalize code components for this es6-module
Object.defineProperty(castBuffer, 'namespace', {value: NS});

export {
    castBuffer,
};
