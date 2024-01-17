/**
 * Initialize test environment to run unit tests.
 */
import $path from 'path';
import $url from 'url';
import Container from '@teqfw/di';
import {join} from 'node:path';

/* Resolve paths to main folders */
const {path: currentScript} = $url.parse(import.meta.url);
const pathScript = $path.dirname(currentScript);
const pathPrj = $path.join(pathScript, '..', '..', '..', '..');

/* Create and setup DI container (once per all imports) */

/** @type {TeqFw_Di_Api_Container} */
const container = new Container();
container.setDebug(false);
// add path mapping for @teqfw/core to the DI resolver
const resolver = container.getResolver();
const pathDi = join(pathPrj, 'node_modules', '@teqfw', 'di', 'src');
const pathCore = join(pathPrj, 'node_modules', '@teqfw', 'core', 'src');
resolver.addNamespaceRoot('TeqFw_Di_', pathDi, 'js');
resolver.addNamespaceRoot('TeqFw_Core_', pathCore, 'mjs');
// setup parser for the legacy code
/** @type {TeqFw_Core_Shared_App_Di_Parser_Legacy} */
const parserLegacy = await container.get('TeqFw_Core_Shared_App_Di_Parser_Legacy$');
container.getParser().addChunk(parserLegacy);
// add post-processor with Factory wrapper & logger setup
const post = container.getPostProcessor();
/** @type {TeqFw_Core_Shared_App_Di_PostProcessor_Factory} */
const postFactory = await container.get('TeqFw_Core_Shared_App_Di_PostProcessor_Factory$');
post.addChunk(postFactory);
/** @type {TeqFw_Core_Shared_App_Di_PostProcessor_Logger} */
const postLogger = await container.get('TeqFw_Core_Shared_App_Di_PostProcessor_Logger$');
post.addChunk(postLogger);

/**
 * Setup development environment (if not set before) and return DI container.
 *
 * @returns {Promise<TeqFw_Di_Api_Container>}
 */
export default async function () {
    return container;
}
