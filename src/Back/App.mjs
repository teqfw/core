/**
 * The backend application loads all teq-plugins, parses the CLI arguments, and runs the requested command.
 * @namespace TeqFw_Core_Back_App
 */
// MODULE'S IMPORT
import {join} from 'node:path';
import {existsSync, readFileSync, statSync} from 'node:fs';
import process from 'node:process';
import {program} from 'commander/esm.mjs';

// MODULE'S CLASSES
export default class TeqFw_Core_Back_App {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Core_Back_Config} config
     * @param {TeqFw_Core_Back_App_Plugin_Loader} pluginScan
     * @param {TeqFw_Core_Back_App_A_Init_Cmd} initCmd
     * @param {TeqFw_Core_Back_App_A_Init_Di} initDi
     * @param {TeqFw_Core_Back_App_A_Init_Logger} initLogger
     * @param {TeqFw_Core_Back_App_A_Init_Plugins} initPlugins
     * @param {TeqFw_Core_Back_App_A_Stop_Plugins} stopPlugins
     */
    constructor(
        {
            TeqFw_Core_Shared_Logger$$: logger, // inject the implementation
            TeqFw_Core_Back_Config$: config,
            TeqFw_Core_Back_App_Plugin_Loader$: pluginScan,
            TeqFw_Core_Back_App_A_Init_Cmd$: initCmd,
            TeqFw_Core_Back_App_A_Init_Di$: initDi,
            TeqFw_Core_Back_App_A_Init_Logger$: initLogger,
            TeqFw_Core_Back_App_A_Init_Plugins$: initPlugins,
            TeqFw_Core_Back_App_A_Stop_Plugins$: stopPlugins,
        }
    ) {
        // VARS
        /** @type {TeqFw_Core_Back_Api_Plugin_Registry} */
        let _plugins;
        let _name, _version;

        // INSTANCE METHODS

        /**
         * @param {string} path absolute path to the root of the project files (where ./node_modules/ is placed)
         * @return {Promise<void>}
         */
        this.run = async function ({path}) {
            // VARS
            const me = this;

            // FUNCS

            /**
             * Validate existence of the './node_modules/' directory.
             *
             * @param {string} path
             */
            function checkNodeModules(path) {
                const pathNode = join(path, 'node_modules');
                if (!existsSync(pathNode) || !statSync(pathNode).isDirectory())
                    throw new Error(`Cannot find './node_modules/' in '${path}'.`);
            }

            /**
             * Event handler to run application finalization on stop events.
             * @return {Promise<void>}
             */
            async function onStop() {
                await me.stop();
                process.exit();
            }

            /**
             * Read the project name and version from './package.json' or use the default one.
             * @param root
             * @return {{name: string, version: string}}
             */
            function readAppMeta(root) {
                const filename = join(root, 'package.json');
                const buffer = readFileSync(filename);
                const content = buffer.toString();
                const json = JSON.parse(content);
                const name = json.name;
                const version = json?.version ?? '0.0.0';
                return {name, version};
            }

            // MAIN
            try {
                process.on('SIGINT', onStop);
                process.on('SIGTERM', onStop);
                process.on('SIGQUIT', onStop);
                // Check installation and load local configuration.
                checkNodeModules(path);
                const {name, version} = readAppMeta(path);
                _name = name;
                _version = version;
                logger.info(`Starting teq-app '${name}:${version}'...`);
                config.init(path, version);
                logger.info(`Local configuration has been loaded.`);
                // load and save plugins definitions (`teqfw.json`)
                _plugins = await pluginScan.exec(path);
                logger.info(`Teq-plugins have been loaded.`);
                await initDi.act({plugins: _plugins});
                logger.info(`The DI container has been initialized with teq-plugin data.`);
                await initLogger.act();
                logger.info(`The logger has been initialized. Starting the initialization of teq-plugins...`);
                await initPlugins.act({plugins: _plugins});
                logger.info(`All teq-plugins have been initialized. Adding the CLI commands...`);
                // run the commander
                await initCmd.act({program, plugins: _plugins});
                logger.info(`All CLI commands have been added.`);
                if (!process.argv.slice(2).length) {
                    // print out help and stop by default
                    program.outputHelp();
                    await this.stop();
                } else {
                    // perform the requested command
                    program.parse();
                }
            } catch (e) {
                await initLogger.act();
                logger.error(e);
                this.stop().catch(logger.exception);
            }
        };

        this.stop = async function () {
            const app = `'${_name}:${_version}'`;
            logger.info(`Stopping the teq-plugins for ${app}...`);
            await stopPlugins.act({plugins: _plugins});
            logger.info(`The teq-app ${app} has been stopped.`);
        };
    }
}
