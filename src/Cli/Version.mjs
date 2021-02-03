/**
 * Factory class to create CLI command to get application version.
 */
export default class TeqFw_Core_App_Cli_Version {

    constructor(spec) {
        // CONSTRUCTOR INJECTED DEPS
        /** @type {TeqFw_Core_App_Defaults} */
        const DEF = spec['TeqFw_Core_App_Defaults$'];   // instance singleton
        /** @type {TeqFw_Core_App_Launcher.Bootstrap} */
        const bootCfg = spec[DEF.DI_BOOTSTRAP]; // named singleton
        /** @type {typeof TeqFw_Core_App_Cli_Command_Data} */
        const DCommand = spec['TeqFw_Core_App_Cli_Command#Data'];    // class constructor

        // DEFINE THIS INSTANCE METHODS (NOT IN PROTOTYPE)

        /**
         * @see TeqFw_Core_App_Cli_Command.create
         * @return {Promise<TeqFw_Core_App_Cli_Command_Data>}
         */
        this.create = async function () {
            // this is sample code:
            const result = new DCommand();
            result.ns = DEF.BACK_REALM;
            result.name = 'version';
            result.desc = 'Get version of the application.';
            result.action = async function () {
                console.log(`Application version: ${bootCfg.version}.`);
            };
            return result;
        };
    }
}
