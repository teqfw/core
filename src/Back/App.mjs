/**
 * Backend application itself.
 * @namespace TeqFw_Core_Back_App
 */
// MODULE'S IMPORT
import {Command} from 'commander';
import {join} from 'path';
import {existsSync, statSync} from 'fs';

/**
 * Main class to launch application: read modules meta data, initialize parts of app, start the app.
 */
export default class TeqFw_Core_Back_App {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Core_Back_Defaults} */
        const DEF = spec['TeqFw_Core_Back_Defaults$'];
        /** @type {TeqFw_Core_Back_Api_Dto_App_Boot.Factory} */
        const fBootCfg = spec['TeqFw_Core_Back_Api_Dto_App_Boot#Factory$'];
        /** @type {TeqFw_Di_Shared_Container} */
        const container = spec['TeqFw_Di_Shared_Container$'];
        /** @type {TeqFw_Core_Back_Config} */
        const config = spec['TeqFw_Core_Back_Config$'];
        /** @type {TeqFw_Core_Shared_Logger} */
        const logger = spec['TeqFw_Core_Shared_Logger$'];
        /** @type {TeqFw_Core_Back_Scan_Plugin} */
        const pluginScan = spec['TeqFw_Core_Back_Scan_Plugin$'];
        /** @type {typeof TeqFw_Di_Shared_Api_Dto_Plugin_Desc_Replace} */
        const DReplace = spec['TeqFw_Di_Shared_Api_Dto_Plugin_Desc_Replace#'];

        // INIT OWN PROPERTIES AND DEFINE WORKING VARS
        const commander = new Command();

        /**
         * Initialize TeqFW application (DI, config, plugins, etc.).
         *
         * @param {string} path absolute path to the root of the project files (where ./node_modules/ is placed)
         * @param {string} version version for the application ('0.1.0')
         * @returns {Promise<void>}
         */
        this.init = async function ({path, version}) {
            // DEFINE INNER FUNCTIONS

            /**
             * Create bootstrap configuration and put it into DI container as singleton.
             *
             * @param {string} path
             * @param {string} version
             * @param {TeqFw_Di_Shared_Container} container
             * @return {TeqFw_Core_Back_Api_Dto_App_Boot}
             */
            function initBootConfig(path, version, container) {
                // validate path to './node_modules/'
                const pathNode = join(path, 'node_modules');
                if (!existsSync(pathNode) || !statSync(pathNode).isDirectory())
                    throw new Error(`Cannot find './node_modules/' in '${path}'.`);
                // create config and put it into DI container
                const cfg = fBootCfg.create();
                cfg.projectRoot = path;
                cfg.version = version;
                container.set('TeqFw_Core_Back_Api_Dto_App_Boot$', cfg);
                return cfg;
            }

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
                    const path = join(item.path, auto.path);
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
            const bootCfg = initBootConfig(path, version, container);

            // init backend logger
            logger.info(`Teq-application is started in '${bootCfg.projectRoot}' (ver. ${bootCfg.version}).`);
            // load local configuration
            config.load({rootPath: bootCfg.projectRoot});
            // scan node modules for teq-plugins
            const registry = await pluginScan.exec(bootCfg.projectRoot);
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
