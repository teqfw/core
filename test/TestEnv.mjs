/**
 * Initialize test environment to run unit tests.
 */
import Container from '@teqfw/di';
import {fileURLToPath} from 'node:url';
import {dirname, join, resolve} from 'node:path';
import {existsSync} from 'node:fs';


// Get the absolute path to the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkgRoot = join(__dirname, '..');

let projectRoot, pathCore;
if (existsSync(join(pkgRoot, 'node_modules'))) {
    projectRoot = pkgRoot;
    pathCore = join(projectRoot, 'src');
} else {
    projectRoot = resolve(pkgRoot, '..', '..', '..', '..');
    pathCore = join(projectRoot, 'node_modules', '@teqfw', 'core', 'src');
}

/* Create and setup DI container (once per all imports) */

/** @type {TeqFw_Di_Container} */
const container = new Container();
container.setDebug(false);
// add path mapping for @teqfw/core to the DI resolver
const resolver = container.getResolver();
const pathDi = join(projectRoot, 'node_modules', '@teqfw', 'di', 'src');
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
 * @returns {Promise<TeqFw_Di_Container>}
 */
export default async function () {
    return container;
}
