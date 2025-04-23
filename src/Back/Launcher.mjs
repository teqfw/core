/**
 * The launcher to set up the DI container and to start the backend app.
 * @namespace TeqFw_Core_Back_Launcher
 */
// MODULE'S IMPORT
import Container from '@teqfw/di';
import {join} from 'node:path';
import {platform} from 'node:process';

// MODULE'S FUNCS
/**
 * Create and manually set up the DI container.
 * @param {string} root - The root folder of the app (where the `node_modules` folder is located).
 * @returns {Promise<TeqFw_Di_Container>}
 */
export async function initContainer(root) {
    /** @type {TeqFw_Di_Container} */
    const res = new Container();
    res.setDebug(false);
    // add path mapping for @teqfw/core to the DI resolver
    const resolver = res.getResolver();
    resolver.setWindowsEnv(platform === 'win32');
    const pathDi = join(root, 'node_modules', '@teqfw', 'di', 'src');
    const pathCore = join(root, 'node_modules', '@teqfw', 'core', 'src');
    resolver.addNamespaceRoot('TeqFw_Di_', pathDi, 'js');
    resolver.addNamespaceRoot('TeqFw_Core_', pathCore, 'mjs');
    // setup parser for the legacy code
    /** @type {TeqFw_Core_Shared_App_Di_Parser_Legacy} */
    const parserLegacy = await res.get('TeqFw_Core_Shared_App_Di_Parser_Legacy$');
    res.getParser().addChunk(parserLegacy);
    // add pre-processors: replace
    const pre = res.getPreProcessor();
    const preReplace = await res.get(`TeqFw_Core_Shared_App_Di_PreProcessor_Replace$`);
    pre.addChunk(preReplace);
    // add post-processors: Factory, Proxy, Logger
    const post = res.getPostProcessor();
    /** @type {TeqFw_Core_Shared_App_Di_PostProcessor_Factory} */
    const postFactory = await res.get('TeqFw_Core_Shared_App_Di_PostProcessor_Factory$');
    post.addChunk(postFactory);
    /** @type {TeqFw_Core_Shared_App_Di_PostProcessor_Proxy} */
    const postProxy = await res.get('TeqFw_Core_Shared_App_Di_PostProcessor_Proxy$');
    post.addChunk(postProxy);
    /** @type {TeqFw_Core_Shared_App_Di_PostProcessor_Logger} */
    const postLogger = await res.get('TeqFw_Core_Shared_App_Di_PostProcessor_Logger$');
    post.addChunk(postLogger);
    return res;
}

/**
 * @param {TeqFw_Di_Container} container
 * @param {string} root
 * @return {Promise<void>}
 */
export async function initPlugins(container, root) {
    /** @type {TeqFw_Core_Back_App_Plugin_Loader} */
    const pluginScan = await container.get('TeqFw_Core_Back_App_Plugin_Loader$');
    /** @type {TeqFw_Core_Back_App_A_Init_Di} */
    const aDi = await container.get('TeqFw_Core_Back_App_A_Init_Di$');
    /** @type {TeqFw_Core_Back_App_A_Init_Plugins} */
    const aInit = await container.get('TeqFw_Core_Back_App_A_Init_Plugins$');
    const plugins = await pluginScan.exec(root);
    await aDi.act({plugins});
    await aInit.act({plugins});
}

/**
 * @param {TeqFw_Di_Container} container
 * @return {Promise<void>}
 */
export async function stopPlugins(container) {
    /** @type {TeqFw_Core_Back_Api_Plugin_Registry} */
    const plugins = await container.get('TeqFw_Core_Back_Api_Plugin_Registry$');
    /** @type {TeqFw_Core_Back_App_A_Stop_Plugins} */
    const aStop = await container.get('TeqFw_Core_Back_App_A_Stop_Plugins$');
    await aStop.act({plugins});
}

/**
 * Set up the DI container and launch the backend application.
 * @param {string} path - the full path to the root of the app (contains `./node_modules/`).
 * @returns {Promise<void>}
 */
export default async function TeqFw_Core_Back_Launcher({path}) {
    // MAIN
    // Initialize the DI container, then create and run the backend teq-app.
    const container = await initContainer(path);
    /**
     * Compose the application object as a singleton and run the application.
     * @type {TeqFw_Core_Back_App}
     */
    const app = await container.get('TeqFw_Core_Back_App$');
    await app.run({path});
}
