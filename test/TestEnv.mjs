/**
 * Initialize test environment to run unit tests.
 */
import $path from 'path';
import $url from 'url';
import Container from '@teqfw/di';

/* Resolve paths to main folders */
const {path: currentScript} = $url.parse(import.meta.url);
const pathScript = $path.dirname(currentScript);
const pathPrj = $path.join(pathScript, '..');
const pathNode = $path.join(pathPrj, 'node_modules');
const srcApp = $path.join(pathPrj, 'src');
const srcTeqFwDi = $path.join(pathNode, '@teqfw/di/src');

/* Create and setup DI container (once per all imports) */

/** @type {TeqFw_Di_Shared_Container} */
const container = new Container();
// add backend sources to map
container.addSourceMapping('TeqFw_Core', srcApp, true, 'mjs');
container.addSourceMapping('TeqFw_Di', srcTeqFwDi, true, 'mjs');
container.addModuleReplacement('TeqFw_Core_Shared_Api_Util_Crypto', 'TeqFw_Core_Back_Util_Crypto');

/**
 * Setup development environment (if not set before) and return DI container.
 *
 * @returns {Promise<TeqFw_Di_Shared_Container>}
 */
export default async function () {
    return container;
}
