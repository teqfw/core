import $path from 'path';
import $fs from 'fs';

export default class TeqFw_Core_App_Cli_Server_Start {

    constructor(spec) {
        // CONSTRUCTOR INJECTED DEPS
        /** @type {TeqFw_Core_App_Defaults} */
        const DEF = spec['TeqFw_Core_App_Defaults$'];   // instance singleton
        /** @type {TeqFw_Core_App_Launcher.Bootstrap} */
        const bootCfg = spec[DEF.DI_BOOTSTRAP]; // named singleton
        /** @type {TeqFw_Di_Container} */
        const container = spec['TeqFw_Di_Container$'];  // instance singleton
        /** @type {typeof TeqFw_Core_App_Cli_Command_Data} */
        const Command = spec['TeqFw_Core_App_Cli_Command#Data'];    // class constructor

        // RUNTIME INJECTED DEPS
        /**  @return {Promise<TeqFw_Core_App_Server>} */
        const getServer = async () => await container.get('TeqFw_Core_App_Server$', this.constructor.name);

        // DEFINE THIS INSTANCE METHODS (NOT IN PROTOTYPE)

        /**
         * @see TeqFw_Core_App_Cli_Command.create
         * @return {Promise<TeqFw_Core_App_Cli_Command>}
         */
        this.create = async function () {
            // this is sample code:
            const result = new Command();
            result.ns = 'core';
            result.name = 'server-stop';
            result.desc = 'Stop the application server.';
            result.action = async function () {
                try {
                    const pidPath = $path.join(bootCfg.root, DEF.PID_FILE_NAME);
                    const data = $fs.readFileSync(pidPath);
                    const strData = data.toString();
                    console.info(`Stop web server (PID: ${strData}).`);
                    process.kill(strData, 'SIGINT');
                } catch (e) {
                    console.error('Cannot kill API server process.');
                }
            };
            return result;
        };
    }
}
