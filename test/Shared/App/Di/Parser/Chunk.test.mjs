// MODULE'S IMPORTS
import {container} from '@teqfw/test';
import {describe, it} from 'mocha';
import assert from 'assert';
import Defs from '@teqfw/di/src/Defs.js';

// MODULE'S VARS
/** @type {TeqFw_Core_Shared_App_Di_Parser_Legacy} */
const parser = await container.get('TeqFw_Core_Shared_App_Di_Parser_Legacy$');


describe('TeqFw_Core_Shared_App_Di_Parser_Legacy', () => {

    describe('should parse manual DI IDs:', () => {
        it('named singleton ID (namedSingleton)', async () => {
            /** @type {TeqFw_Di_DepId} */
            const dto = parser.parse('namedSingleton');
            assert.strictEqual(dto.composition, undefined);
            assert.strictEqual(dto.exportName, undefined);
            assert.strictEqual(dto.life, Defs.LS);
            assert.strictEqual(dto.moduleName, undefined);
            assert.strictEqual(dto.value, 'namedSingleton');
            assert.strictEqual(dto.wrappers.length, 0);
        });
        it('named constructor ID (namedFactory$$)', async () => {
            /** @type {TeqFw_Di_DepId} */
            const dto = parser.parse('namedFactory$$');
            assert.strictEqual(dto.composition, Defs.CF);
            assert.strictEqual(dto.exportName, undefined);
            assert.strictEqual(dto.life, Defs.LI);
            assert.strictEqual(dto.moduleName, undefined);
            assert.strictEqual(dto.value, 'namedFactory$$');
            assert.strictEqual(dto.wrappers.length, 0);
        });
    });

    describe('should parse Logical IDs:', () => {

        describe('simple:', () => {
            it('simple (Ns_Module)', async () => {
                /** @type {TeqFw_Di_DepId} */
                const dto = parser.parse('Ns_Module');
                assert.strictEqual(dto.composition, undefined);
                assert.strictEqual(dto.exportName, undefined);
                assert.strictEqual(dto.life, undefined);
                assert.strictEqual(dto.moduleName, 'Ns_Module');
                assert.strictEqual(dto.value, 'Ns_Module');
                assert.strictEqual(dto.wrappers.length, 0);
            });
        });

        describe('new style (with .):', () => {

            describe('default export:', () => {
                it('as-is (Ns_Module.)', async () => {
                    /** @type {TeqFw_Di_DepId} */
                    const dto = parser.parse('Ns_Module.');
                    assert.strictEqual(dto.composition, Defs.CA);
                    assert.strictEqual(dto.exportName, 'default');
                    assert.strictEqual(dto.life, Defs.LS);
                    assert.strictEqual(dto.moduleName, 'Ns_Module');
                    assert.strictEqual(dto.value, 'Ns_Module.');
                    assert.strictEqual(dto.wrappers.length, 0);
                });
                it('singleton (Ns_Module$)', async () => {
                    /** @type {TeqFw_Di_DepId} */
                    const dto = parser.parse('Ns_Module$');
                    assert.strictEqual(dto.composition, Defs.CF);
                    assert.strictEqual(dto.exportName, 'default');
                    assert.strictEqual(dto.life, Defs.LS);
                    assert.strictEqual(dto.moduleName, 'Ns_Module');
                    assert.strictEqual(dto.value, 'Ns_Module$');
                    assert.strictEqual(dto.wrappers.length, 0);
                });
                it('instance (Ns_Module$$)', async () => {
                    /** @type {TeqFw_Di_DepId} */
                    const dto = parser.parse('Ns_Module$$');
                    assert.strictEqual(dto.composition, Defs.CF);
                    assert.strictEqual(dto.exportName, 'default');
                    assert.strictEqual(dto.life, Defs.LI);
                    assert.strictEqual(dto.moduleName, 'Ns_Module');
                    assert.strictEqual(dto.value, 'Ns_Module$$');
                    assert.strictEqual(dto.wrappers.length, 0);
                });
                it('singleton proxy (Ns_Module@)', async () => {
                    /** @type {TeqFw_Di_DepId} */
                    const dto = parser.parse('Ns_Module@');
                    assert.strictEqual(dto.composition, Defs.CF);
                    assert.strictEqual(dto.exportName, 'default');
                    assert.strictEqual(dto.life, Defs.LS);
                    assert.strictEqual(dto.moduleName, 'Ns_Module');
                    assert.strictEqual(dto.value, 'Ns_Module@');
                    assert.strictEqual(dto.wrappers[0], 'proxy');
                });
                it('instance proxy (Ns_Module@@)', async () => {
                    /** @type {TeqFw_Di_DepId} */
                    const dto = parser.parse('Ns_Module@@');
                    assert.strictEqual(dto.composition, Defs.CF);
                    assert.strictEqual(dto.exportName, 'default');
                    assert.strictEqual(dto.life, Defs.LI);
                    assert.strictEqual(dto.moduleName, 'Ns_Module');
                    assert.strictEqual(dto.value, 'Ns_Module@@');
                    assert.strictEqual(dto.wrappers[0], 'proxy');
                });
            });

            describe('named export:', () => {
                it('simple (Ns_Module.name)', async () => {
                    /** @type {TeqFw_Di_DepId} */
                    const dto = parser.parse('Ns_Module.name');
                    assert.strictEqual(dto.composition, Defs.CA);
                    assert.strictEqual(dto.exportName, 'name');
                    assert.strictEqual(dto.life, Defs.LS);
                    assert.strictEqual(dto.moduleName, 'Ns_Module');
                    assert.strictEqual(dto.value, 'Ns_Module.name');
                    assert.strictEqual(dto.wrappers.length, 0);
                });
                it('singleton (Ns_Module.name$)', async () => {
                    /** @type {TeqFw_Di_DepId} */
                    const dto = parser.parse('Ns_Module.name$');
                    assert.strictEqual(dto.composition, Defs.CF);
                    assert.strictEqual(dto.exportName, 'name');
                    assert.strictEqual(dto.life, Defs.LS);
                    assert.strictEqual(dto.moduleName, 'Ns_Module');
                    assert.strictEqual(dto.value, 'Ns_Module.name$');
                    assert.strictEqual(dto.wrappers.length, 0);
                });
                it('instance (Ns_Module.name$$)', async () => {
                    /** @type {TeqFw_Di_DepId} */
                    const dto = parser.parse('Ns_Module.name$$');
                    assert.strictEqual(dto.composition, Defs.CF);
                    assert.strictEqual(dto.exportName, 'name');
                    assert.strictEqual(dto.life, Defs.LI);
                    assert.strictEqual(dto.moduleName, 'Ns_Module');
                    assert.strictEqual(dto.value, 'Ns_Module.name$$');
                    assert.strictEqual(dto.wrappers.length, 0);
                });
                it('singleton proxy (Ns_Module.name@)', async () => {
                    /** @type {TeqFw_Di_DepId} */
                    const dto = parser.parse('Ns_Module.name@');
                    assert.strictEqual(dto.composition, Defs.CF);
                    assert.strictEqual(dto.exportName, 'name');
                    assert.strictEqual(dto.life, Defs.LS);
                    assert.strictEqual(dto.moduleName, 'Ns_Module');
                    assert.strictEqual(dto.value, 'Ns_Module.name@');
                    assert.strictEqual(dto.wrappers[0], 'proxy');
                });
                it('instance proxy (Ns_Module.name@@)', async () => {
                    /** @type {TeqFw_Di_DepId} */
                    const dto = parser.parse('Ns_Module.name@@');
                    assert.strictEqual(dto.composition, Defs.CF);
                    assert.strictEqual(dto.exportName, 'name');
                    assert.strictEqual(dto.life, Defs.LI);
                    assert.strictEqual(dto.moduleName, 'Ns_Module');
                    assert.strictEqual(dto.value, 'Ns_Module.name@@');
                    assert.strictEqual(dto.wrappers[0], 'proxy');
                });
            });

        });
    });

});
