/**
 * Abstraction of coding/encoding functions used both in front & back.
 *
 * 'function' notation is better than 'class' notation for an actions but there were some
 * troubles with 'Find Usages' operation in IDEA for 'function' notation.
 *
 * This is documentation only code (not executable).
 *
 * @interface
 */
export default class TeqFw_Core_Shared_Api_Util_ICodec {

    /**
     * Convert array of bytes to base64 based string.
     * @param {ArrayBuffer|Uint8Array} buf
     */
    ab2b64(buf) {}

    /**
     * Convert array of bytes to string.
     *
     * @param {ArrayBuffer|Uint8Array} buf
     */
    ab2utf(buf) {}

    /**
     * Convert base64 string to array buffer.
     * @param {string} str
     */
    b642ab(str) {}

    /**
     * Convert UTF8 string to array of bytes.
     * @param {string} str
     */
    utf2ab(str) {}
}
