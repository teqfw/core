import assert from 'assert';
import {describe, it} from 'mocha';
import {dirname, join} from 'path';
import Container from '@teqfw/di';

// compose paths
const url = new URL(import.meta.url);
const script = url.pathname;
const currentDir = dirname(script);
const ROOT = join(currentDir, '..', '..', '..', '..', '..', '..'); // contains './node_modules/@teqfw/core/...'
const DATA_ROOT = join(currentDir, '..', '..', '_data', 'Back', 'Plugin', 'Scanner'); // .../@teqfw/core/test/_data/

// setup DI
const container = new Container();
// setup resolver
const resolver = container.getResolver();
const pathDi = join(ROOT, 'node_modules', '@teqfw', 'di', 'src');
const pathCore = join(ROOT, 'node_modules', '@teqfw', 'core', 'src');
resolver.addNamespaceRoot('TeqFw_Di_', pathDi, 'mjs');
resolver.addNamespaceRoot('TeqFw_Core_', pathCore, 'mjs');

/** @type {TeqFw_Core_Back_App_Plugin_Loader_A_Scan|function} */
const scan = await container.get('TeqFw_Core_Back_App_Plugin_Loader_A_Scan$');

describe('TeqFw_Core_Back_App_Plugin_Loader_A_Scan', () => {

    describe('scans descriptors', () => {

        it('normally', () => {
            const path = join(DATA_ROOT, 'd01.scan');
            const descriptors = scan(path);
            assert(Object.keys(descriptors).length === 3);
        });

        it('in folders w/o descriptors', () => {
            const path = join(DATA_ROOT, 'd02.empty');
            const descriptors = scan(path);
            assert(Object.keys(descriptors).length === 0);
        });

        it('and throws error for wrong descriptors', () => {
            const path = join(DATA_ROOT, 'd03.error');
            try {
                scan(path);
            } catch (e) {
                assert.strictEqual(e.message, 'Unexpected token W in JSON at position 0');
            }
        });

    });

});
