/**
 * Backend implementation of TeqFw_Core_Shared_Api_Util_ICrypto.
 *
 * @namespace TeqFw_Core_Back_Util_Crypto
 */
// MODULE'S IMPORT
import {randomUUID} from 'node:crypto';

// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Util_Crypto';

// MAIN
Object.defineProperty(randomUUID, 'namespace', {value: NS});

export {
    randomUUID,
}
