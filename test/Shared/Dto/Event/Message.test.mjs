import testEnv from '../../../TestEnv.mjs';
import assert from 'assert';
import {describe, it} from 'mocha';

/** @type {TeqFw_Di_Shared_Container} */
const container = await testEnv();
/** @type {TeqFw_Core_Shared_Mod_Event_Message} */
const fact = await container.get('TeqFw_Core_Shared_Mod_Event_Message$');

describe('TeqFw_Core_Shared_Mod_Event_Message', function () {

    it('DTO has right namespace', async () => {
        const dto = fact.createDto();
        assert.strictEqual(dto.constructor.namespace, 'TeqFw_Core_Shared_Mod_Event_Message.Dto');
    });

    it('can create DTO and clone input data', async () => {
        const input = {data: {name: 'data'}, meta: {name: 'eventName'}};
        /** @type {TeqFw_Core_Shared_Mod_Event_Message.Dto} */
        const dto = fact.createDto(input);
        assert.strictEqual(dto.data.name, 'data');
        assert.strictEqual(dto.meta.name, 'eventName');
        assert(dto.meta.published instanceof Date);
        assert(typeof dto.meta.uuid === 'string');
    });

});
