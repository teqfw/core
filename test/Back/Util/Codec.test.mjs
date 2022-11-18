/**
 * We cannot use @teqfw/test from @teqfw/core.
 */
// IMPORTS
import testEnv from '../../TestEnv.mjs';
import assert from 'assert';
import {describe, it} from 'mocha';

/** @type {TeqFw_Di_Shared_Container} */
const container = await testEnv();
// use implementation here, not interface
/** @type {TeqFw_Core_Shared_Api_Util_ICodec} */
const util = await container.get('TeqFw_Core_Back_Util_Codec$');

describe('TeqFw_Core_Back_Util_Codec', function () {

    it('utf => ab => utf', async () => {
        const str1 = 'Тестовая строка';
        const buf = util.utf2ab(str1);
        const str2 = util.ab2utf(buf);
        assert.strictEqual(str2, str1);
    });

    it('utf => ab => b64 => ab => utf', async () => {
        const str1 = 'Тестовая строка';
        const b1 = '0KLQtdGB0YLQvtCy0LDRjyDRgdGC0YDQvtC60LA=';
        const buf1 = util.utf2ab(str1);
        const b2 = util.ab2b64(buf1);
        assert.strictEqual(b2, b1);
        const buf2 = util.b642ab(b2);
        const str2 = util.ab2utf(buf2);
        assert.strictEqual(str2, str1);
    });

});
