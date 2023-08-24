/**
 * Encoding/decoding utilities for strings and binaries.
 * @namespace TeqFw_Core_Shared_Util_Codec
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Shared_Util_Codec';

/**
 * Convert ArrayBuffer to HEX-string.
 * @param {ArrayBuffer} buf
 * @return {string}
 * @memberOf TeqFw_Core_Shared_Util_Codec
 * TODO: remove expired code and use one common algorithm (see binToHex)
 */
function ab2hex(buf) {
    return [...new Uint8Array(buf)]
        .map(x => x.toString(0x10).padStart(2, '0'))
        .join('');
}

/**
 * Convert ArrayBuffer to string.
 * @param {ArrayBuffer} buf
 * @return {string}
 * @memberOf TeqFw_Core_Shared_Util_Codec
 */
function ab2str(buf) {
    return String.fromCharCode(...new Uint8Array(buf));
}

/**
 * Convert binary data to HEX-string.
 * @param {Uint8Array} data
 * @return {string}
 * @memberOf TeqFw_Core_Shared_Util_Codec
 */
function binToHex(data) {
    if ((data instanceof Uint8Array) || (data instanceof ArrayBuffer)) {
        const uint = new Uint8Array(data);
        return Array.prototype.map.call(uint, x => ('00' + x.toString(16)).slice(-2)).join('');
    } else if ((data === undefined) || (data === null)) return data;
    else throw new Error('Cannot convert binary to HEX string.');
}

/**
 * Convert HEX-string to binary data.
 * @param {string} data
 * @return {Uint8Array}
 * @memberOf TeqFw_Core_Shared_Util_Codec
 */
function hexToBin(data) {
    if (typeof data === 'string') {
        const len = data.length;
        const res = new Uint8Array(len / 2);
        for (let i = 0; i < len; i += 2)
            res[i / 2] = parseInt(data.substring(i, i + 2), 16);
        return res;
    } else if ((data === undefined) || (data === null)) return data;
    else throw new Error('Cannot convert HEX string to binary.');
}

// finalize code components for this es6-module
Object.defineProperty(ab2hex, 'namespace', {value: NS});
Object.defineProperty(ab2str, 'namespace', {value: NS});
Object.defineProperty(binToHex, 'namespace', {value: NS});
Object.defineProperty(hexToBin, 'namespace', {value: NS});

export {
    ab2hex,
    ab2str,
    binToHex,
    hexToBin,
};
