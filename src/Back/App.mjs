/**
 * Backend application itself.
 * @namespace TeqFw_Core_Back_App
 */
// MODULE'S IMPORT
import $commander from 'commander';
import $path from 'path';

// MODULE'S VARS
const NS = 'TeqFw_Core_Back_App';

// MODULE'S CLASSES
/**
 * Define data structure for backend app bootstrap config.
 *
 * CREATE INSTANCES WITH 'new' OPERATOR, NOT WITH DI CONTAINER.
 *
 * @memberOf TeqFw_Core_Back_App
 */
class Bootstrap {
    /** @type {string} absolute path to the root folder of the project */
    root;
    /** @type {string} current version of the application (`0.1.0`) */
    version;

    constructor(data) {
        this.root = data.root;
        this.version = data.version;
    }
}

Object.defineProperty(Bootstrap, 'name', {value: `${NS}.${Bootstrap.name}`});

/**
 * Main class to launch application: read modules meta data, initialize parts of app, start the app.
 */
class TeqFw_Core_Back_App {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Core_Back_Defaults} */
        const DEF = spec['TeqFw_Core_Back_Defaults$'];
        /** @type {TeqFw_Core_Back_App.Bootstrap} */
        const bootCfg = spec['TeqFw_Core_Back_App#Bootstrap$'];
        /** @type {TeqFw_Di_Shared_Container} */
        const container = spec['TeqFw_Di_Shared_Container$'];
        /** @type {TeqFw_Core_Back_Config} */
        const config = spec['TeqFw_Core_Back_Config$'];
        /** @type {TeqFw_Core_Logger} */
        const logger = spec['TeqFw_Core_Logger$'];
        /** @type {TeqFw_Core_Logger_Transport_Console} */
        const logToConsole = spec['TeqFw_Core_Logger_Transport_Console$'];
        /** @type {TeqFw_Core_Back_Scan_Plugin} */
        const pluginScan = spec['TeqFw_Core_Back_Scan_Plugin$'];
        /** @type {typeof TeqFw_Di_Shared_Api_Dto_Plugin_Desc_Replace} */
        const DReplace = spec['TeqFw_Di_Shared_Api_Dto_Plugin_Desc_Replace#'];

        // INIT OWN PROPERTIES AND DEFINE WORKING VARS
        const commander = new $commander.Command();

        /**
         * Initialize TeqFW application (load plugins, register services, etc.).
         * @returns {Promise<void>}
         */
        this.init = async function () {
            // DEFINE INNER FUNCTIONS

            /**
             * Run 'commander' initialization code for all plugins.
             *
             * @param {TeqFw_Core_Back_Scan_Plugin_Registry} plugins
             * @returns {Promise<void>}
             * @memberOf TeqFw_Core_Back_App.init
             */
            async function initCommander(plugins) {
                // DEFINE INNER FUNCTIONS
                /**
                 * Add single command to the app's commander.
                 *
                 * @param {string} factoryName 'Vendor_Module_Cli_Command$'
                 * @returns {Promise<void>}
                 * @memberOf TeqFw_Core_Back_App.init.initCommander
                 */
                async function addCommand(factoryName) {
                    try {
                        /** @type {TeqFw_Core_Back_Api_Dto_Command} */
                        const cmd = await container.get(`${factoryName}$`); // get as instance singleton
                        const fullName = (cmd.realm) ? `${cmd.realm}-${cmd.name}` : cmd.name;
                        commander.command(fullName)
                            .description(cmd.desc)
                            .action(cmd.action);
                        logger.info(`'${fullName}' command is added.`);
                    } catch (e) {
                        logger.error(`Cannot create command using '${factoryName}' factory. Error: ${e.message}`);
                    }
                }

                // MAIN FUNCTIONALITY
                logger.info('Integrate plugins to the Commander.');
                for (const item of plugins.items()) {
                    if (Array.isArray(item.teqfw?.commands)) {
                        for (const id of item.teqfw.commands) {
                            await addCommand(id);
                        }
                    }
                }
            }

            /**
             * Run through all plugins and register namespaces in DI container.
             * @param {TeqFw_Core_Back_Scan_Plugin_Registry} registry
             */
            function initDiContainer(registry) {
                for (const item of registry.items()) {
                    /** @type {TeqFw_Di_Back_Api_Dto_Plugin_Desc} */
                    const desc = item.teqfw[DEF.MOD_DI.DESC_NODE];
                    /** @type {TeqFw_Di_Shared_Api_Dto_Plugin_Desc_Autoload} */
                    const auto = desc.autoload;
                    const ns = auto.ns;
                    const path = $path.join(item.path, auto.path);
                    container.addSourceMapping(ns, path, true);
                    logger.info(`'${ns}' namespace is mapped to '${path}'.`);
                }
                const levels = registry.getLevels();
                const keys = Object.keys(levels).sort();
                for (const key of keys) {
                    const plugins = levels[key];
                    for (const name of plugins) {
                        const item = registry.get(name);
                        /** @type {TeqFw_Di_Back_Api_Dto_Plugin_Desc} */
                        const desc = item.teqfw[DEF.MOD_DI.DESC_NODE];
                        if (Array.isArray(desc?.replace))
                            for (const one of desc.replace)
                                if ((one.area === DReplace.DATA_AREA_BACK) || (one.area === DReplace.DATA_AREA_SHARED))
                                    container.addModuleReplacement(one.orig, one.alter);
                    }
                }
            }

            // MAIN FUNCTIONALITY

            // init backend logger
            logger.addTransport(logToConsole);  // setup default logger transport as console
            logger.info(`Teq-application is started in '${bootCfg.root}' (ver. ${bootCfg.version}).`);
            // load local configuration
            config.load({rootPath: bootCfg.root});
            // scan node modules for teq-plugins
            const registry = await pluginScan.exec(bootCfg.root);
            //
            initDiContainer(registry);
            await initCommander(registry);
        };

        /**
         * Run application (perform requested command).
         *
         * @returns {Promise<void>}
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
         * @returns {Promise<void>}
         */
        this.stop = async function () {
            // TODO: close DB connections here
            // await connector.disconnect();
            console.log('stopped');
        };
    }


}

export {
    TeqFw_Core_Back_App as default,
    Bootstrap
}
