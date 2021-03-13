/**
 * Action to load I18N resources from filesystem and cache it in memory.
 *
 * @namespace TeqFw_Core_App_I18n_Loader
 */
import $fs from 'fs';
import $path from 'path';

// DEFINE WORKING VARS
const DEV_MODE = true;

class TeqFw_Core_App_I18n_Loader {

    constructor(spec) {
        // CONSTRUCTOR INJECTED DEPS
        /** @type {TeqFw_Core_App_Defaults} */
        const DEF = spec['TeqFw_Core_App_Defaults$'];
        /** @type {TeqFw_Di_Container} */
        const container = spec[DEF.DI_CONTAINER]; // named singleton
        /** @type {TeqFw_Core_App_Config} */
        const config = spec['TeqFw_Core_App_Config$'];  // instance singleton
        /** @type {TeqFw_Core_App_Plugin_Registry} */
        const registry = spec['TeqFw_Core_App_Plugin_Registry$'];   // instance singleton
        const {
            /** @type {TeqFw_Core_App_Shared_Util.deepMerge} */
            deepMerge
        } = spec['TeqFw_Core_App_Shared_Util'];
        // INIT OWN PROPERTIES AND DEFINE WORKING VARS
        let mapDicts = null;
        const mergedDict = {};


        // DEFINE THIS INSTANCE METHODS
        this.loadResources = async function () {
            if (mapDicts === null || DEV_MODE) {
                mapDicts = new Map();
                const rootFs = config.get('/path/root');    // path to project root
                for (const item of registry.items()) {
                    if (item.initClass) {
                        /** @type {TeqFw_Core_App_Plugin_Init} */
                        const init = await container.get(item.initClass);
                        if (typeof init.getI18nResources === 'function') {
                            const realms = init.getI18nResources();
                            for (const realm of Object.keys(realms)) {
                                for (const one of realms[realm]) {
                                    const path = $path.join(rootFs, one);
                                    if ($fs.existsSync(path) && $fs.statSync(path).isFile()) {
                                        const data = $fs.readFileSync(path);
                                        const dict = JSON.parse(data.toString());
                                        mapDicts.set(path, dict);
                                        deepMerge(mergedDict, dict);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return mergedDict;
        };
    }

}

export default TeqFw_Core_App_I18n_Loader;
