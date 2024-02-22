/**
 * Initialize DI container with plugin data (replaces, proxies, etc.).
 */
// MODULE'S IMPORT
import {join} from 'node:path';

// MODULE'S CLASSES
/**
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class TeqFw_Core_Back_App_A_Init_Di {
    /**
     * @param {TeqFw_Di_Api_Container} container
     * @param {TeqFw_Core_Back_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Core_Shared_App_Di_PostProcessor_Proxy} chunkProxy
     * @param {TeqFw_Core_Shared_App_Di_PreProcessor_Replace} chunkReplace
     * @param {typeof TeqFw_Core_Shared_Enum_Sphere} SPHERE
     */
    constructor(
        {
            container,
            TeqFw_Core_Back_Defaults$: DEF,
            TeqFw_Core_Shared_Logger$$: logger, // inject the implementation
            TeqFw_Core_Shared_App_Di_PostProcessor_Proxy$: chunkProxy,
            TeqFw_Core_Shared_App_Di_PreProcessor_Replace$: chunkReplace,
            TeqFw_Core_Shared_Enum_Sphere$: SPHERE,
        }
    ) {
        /**
         * @param {TeqFw_Core_Back_Api_Plugin_Registry} plugins
         * @return {Promise<void>}
         */
        this.act = async function ({plugins}) {
            // FUNCS
            /**
             * Extract autoload data from `@teqfw/di` nodes of descriptors and initialize the resolver.
             * @param {TeqFw_Di_Container_Resolver} resolver
             * @param {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item[]} items
             */
            function initAutoload(resolver, items) {
                for (const item of items) {
                    /** @type {TeqFw_Core_Back_Plugin_Dto_Desc_Di.Dto} */
                    const desc = item.teqfw[DEF.SHARED.NAME_DI];
                    /** @type {TeqFw_Core_Back_Plugin_Dto_Desc_Di_Autoload.Dto} */
                    const auto = desc.autoload;
                    const ext = auto.ext ?? 'js';
                    const ns = auto.ns;
                    if (ns) {
                        const path = join(item.path, auto.path);
                        resolver.addNamespaceRoot(ns, path, ext);
                        logger.info(`'${ns}' namespace with default '${ext}' ext is mapped to '${path}'.`);
                    }
                }
            }

            /**
             * Extract data from ordered `@teqfw/di` nodes and initialize proxy wrappers.
             * @param {TeqFw_Core_Shared_App_Di_PostProcessor_Proxy} chunk
             * @param {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item[]} items - ordered items
             */
            function initProxy(chunk, items) {
                for (const item of items) {
                    /** @type {TeqFw_Core_Back_Plugin_Dto_Desc_Di.Dto} */
                    const desc = item.teqfw[DEF.SHARED.NAME_DI];
                    if (Array.isArray(desc?.proxy))
                        for (const one of desc.proxy)
                            if (
                                (one.sphere === SPHERE.BACK) ||
                                (one.sphere === SPHERE.SHARED)
                            ) chunk.map(one.from, one.to);
                }
            }

            /**
             * Extract data from ordered `@teqfw/di` nodes and initialize replacements for depIds.
             * @param {TeqFw_Core_Shared_App_Di_PreProcessor_Replace} chunk
             * @param {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item[]} items - ordered items
             */
            function initReplaces(chunk, items) {
                for (const item of items) {
                    /** @type {TeqFw_Core_Back_Plugin_Dto_Desc_Di.Dto} */
                    const desc = item.teqfw[DEF.SHARED.NAME_DI];
                    if (Array.isArray(desc?.replaces))
                        for (const one of desc.replaces)
                            if (
                                (one.sphere === SPHERE.BACK) ||
                                (one.sphere === SPHERE.SHARED)
                            ) chunk.add(one.from, one.to);
                }
            }

            // MAIN
            const resolver = container.getResolver();
            const items = plugins.getItemsByLevels();
            initAutoload(resolver, items);
            initProxy(chunkProxy, items);
            initReplaces(chunkReplace, items);
        };
    }

}