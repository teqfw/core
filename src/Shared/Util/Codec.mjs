/**
 * Encoding/decoding utilities for strings and array buffers.
 * @namespace TeqFw_Core_Shared_Util_Codec
 */
// DEFINE WORKING VARS
const NS = 'TeqFw_Core_Shared_Util_Codec';

/**
 * Convert ArrayBuffer to HEX-string.
 * @param {ArrayBuffer} buf
 * @return {string}
 * @memberOf TeqFw_Core_Shared_Util_Codec
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

// finalize code components for this es6-module
Object.defineProperty(ab2hex, 'namespace', {value: NS});
Object.defineProperty(ab2str, 'namespace', {value: NS});

export {
    ab2hex,
    ab2str,
}
