/**
 * Set of utilities for type casting of input data on the backend.
 * @namespace TeqFw_Core_Back_Util_Cast
 */
// MODULE'S IMPORT
import {Buffer} from 'node:buffer';

// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Util_Cast';

// MODULE'S CLASSES
export default class TeqFw_Core_Back_Util_Cast {
    /**
     * Cast input data into 'Buffer' data type.
     * @param {*} data
     * @return {Buffer}
     */
    buffer(data) {
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

    /**
     * Cast input data into 'Uint8Array' data type.
     * @param {*} data
     * @return {Uint8Array}
     */
    uint8(data) {
        return new Uint8Array(data);
    }
}

// MODULE'S MAIN
const tmp = new TeqFw_Core_Back_Util_Cast();
/**
 * @type {(function(*): Buffer)|*}
 * @deprecated user the class-based form
 */
const castBuffer = tmp.buffer;

// finalize code components for this es6-module
Object.defineProperty(castBuffer, 'namespace', {value: NS});

export {
    castBuffer,
};
