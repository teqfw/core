import testEnv from '../../TestEnv.mjs';
import assert from 'assert';
import {describe, it} from 'mocha';

/** @type {TeqFw_Di_Shared_Container} */
const container = await testEnv();
/** @type {TeqFw_Core_Shared_Dto_Formless} */
const fact = await container.get('TeqFw_Core_Shared_Dto_Formless$');

describe('TeqFw_Core_Shared_Dto_Formless', function () {

    it('DTO has right namespace', async () => {
        const dto = fact.createDto();
        assert.strictEqual(dto.constructor.namespace, 'TeqFw_Core_Shared_Dto_Formless.Dto');
    });

    it('can create DTO and clone input data', async () => {
        const input = {name: 'input', nested: {name: 'nested'}};
        const dto = fact.createDto(input);
        assert.strictEqual(dto.name, 'input');
        assert.strictEqual(dto.nested.name, 'nested');
        dto.nested.name = 'new';
        assert.strictEqual(input.nested.name, 'nested');
        const ns = dto.constructor.namespace;
    });

});
