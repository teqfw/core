import testEnv from '../../TestEnv.mjs';
import assert from 'node:assert';
import {describe, it} from 'mocha';

/** @type {TeqFw_Di_Shared_Container} */
const container = await testEnv();
/** @type {TeqFw_Core_Shared_Dto_Log} */
const fact = await container.get('TeqFw_Core_Shared_Dto_Log$');

describe('TeqFw_Core_Shared_Dto_Log', function () {

    it('DTO has right namespace', async () => {
        const dto = fact.createDto();
        assert.strictEqual(dto.constructor.namespace, 'TeqFw_Core_Shared_Dto_Log');
    });

    it('can create DTO and clone input data', async () => {
        const now = new Date();
        const input = {
            date: now,
            isError: true,
            message: 'test',
            meta: {data: {id: 4}},
            source: 'namespace',
        };
        const dto = fact.createDto(input);
        assert.deepEqual(input, dto);
        assert.notDeepStrictEqual(input, dto);
    });

});
