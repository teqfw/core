/**
 * Application itself.
 */
// NODE.JS IMPORTS
import $commander from 'commander';
import $path from 'path';

/**
 * Define data structure.
 *
 * @typedef {Object} TeqFw_Core_App_Launcher.Bootstrap
 * @property {string} root absolute path to the root folder of the project
 * @property {string} version current version of the application (`0.1.0`)
 */

// MODULE'S EXPORT
export default class TeqFw_Core_App_Launcher {

    constructor(spec) {
        // INJECT DEPENDENCIES INTO THIS INSTANCE
        /** @type {TeqFw_Core_App_Defaults} */
        const DEF = spec['TeqFw_Core_App_Defaults$'];
        /** @type {TeqFw_Core_App_Launcher.Bootstrap} */
        const bootCfg = spec[DEF.DI_BOOTSTRAP]; // named singleton
        /** @type {TeqFw_Di_Container} */
        const container = spec[DEF.DI_CONTAINER];   // named singleton
        /** @type {TeqFw_Core_App_Plugin_Scan} */
        const pluginScan = spec['TeqFw_Core_App_Plugin_Scan$']; // named singleton

        // INIT OWN PROPERTIES AND DEFINE WORKING VARS
        const commander = new $commander.Command();

        /**
         * Initialize TeqFW application (load plugins, register services, etc.).
         * @return {Promise<void>}
         */
        this.init = async function () {
            // DEFINE INNER FUNCTIONS
            /**
             * Run through all plugins and register namespaces in DI container.
             * @param {TeqFw_Core_App_Plugin_Registry} plugins
             */
            function setupDiContainer(plugins) {
                for (const item of plugins.items()) {
                    /** @type {TeqFw_Core_App_Plugin_Package_Data_Autoload} */
                    const auto = item.teqfw.autoload;
                    const ns = auto.ns;
                    const path = $path.join(item.path, auto.path);
                    container.addSourceMapping(ns, path, true);
                }
            }

            // MAIN FUNCTIONALITY
            const plugins = await pluginScan.exec(bootCfg.root);
            setupDiContainer(plugins);
        };

        /**
         * Run application (perform requested command).
         *
         * @return {Promise<void>}
         */
        this.run = async function () {
            commander.parse(process.argv);
            // print out help and stop by default
            if (!process.argv.slice(2).length) {
                commander.outputHelp();
                await this.stop();
            }
        };

        /**
         * Close all connections and stop processes in all plugins.
         * @return {Promise<void>}
         */
        this.stop = async function () {
            // close DB connections here
            console.log('stopped');
        };
    }


}
