/**
 * Backend encoding/decoding utilities.
 *
 * @implements TeqFw_Core_Shared_Api_Util_Codec
 * TODO: utilities are functions not a classes in TeqFW. Should migrate to Helper.
 */
export default class TeqFw_Core_Back_Util_Codec {
    /**
     * @param {TeqFw_Core_Shared_Util_Codec} modShared
     */

    constructor(
        {
            TeqFw_Core_Shared_Util_Codec: modShared,
        }) {
        // FUNCS
        function validateBase64(s) {
            if (!(/^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(s))) {
                throw new TypeError('invalid encoding');
            }
        }

        // INSTANCE METHODS
        this.ab2hex = modShared.ab2hex;
        this.ab2str = modShared.ab2str;

        this.ab2b64 = function (buf) {
            // see util.encodeBase64 from 'tweetnacl-util'
            return Buffer.from(buf).toString('base64');
        }

        this.ab2utf = function (buf) {
            // see util.encodeUTF8 from 'tweetnacl-util'
            const s = [];
            for (let i = 0; i < buf.length; i++) s.push(String.fromCharCode(buf[i]));
            return decodeURIComponent(escape(s.join('')));
        }

        this.b642ab = function (str) {
            // see util.decodeBase64 from 'tweetnacl-util'
            validateBase64(str);
            return new Uint8Array(Array.prototype.slice.call(Buffer.from(str, 'base64'), 0));
        }

        this.utf2ab = function (str) {
            // see util.decodeUTF8 from 'tweetnacl-util'
            if (typeof str !== 'string') throw new TypeError('expected string');
            const d = unescape(encodeURIComponent(str));
            const b = new Uint8Array(d.length);
            for (let i = 0; i < d.length; i++) b[i] = d.charCodeAt(i);
            return b;
        }
    }
}
