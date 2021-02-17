/**
 * Class to integrate plugin into TeqFW application.
 * @extends TeqFw_Core_App_Plugin_Init_Base
 */
export default class TeqFw_Core_App_Plugin_Init {

    constructor(spec) {
        /** @type {TeqFw_Core_App_Defaults} */
        const DEF = spec['TeqFw_Core_App_Defaults$'];    // instance singleton

        this.getCommands = function () {
            return [
                'TeqFw_Core_App_Cli_Server_Start$',
                'TeqFw_Core_App_Cli_Server_Stop$',
                'TeqFw_Core_App_Cli_Version$',
            ];
        };

        this.getHttp2StaticMaps = function () {
            return {
                '/i18next-detect/': '/i18next-browser-languagedetector/dist/umd/',
                '/i18next/': '/i18next/dist/umd/',
                '/quasar/': '/quasar/dist/',
                '/vue-router/': '/vue-router/dist/',
                '/vue/': '/vue/dist/',
                '/vuex/': '/vuex/dist/',
            };
        };

        this.getHttp2BackRealm = function () {
            return DEF.BACK_REALM;
        };

        this.getHttp2Services = function () {
            return [
                'TeqFw_Core_App_Back_Service_Load_Config$',
                'TeqFw_Core_App_Back_Service_Load_Namespaces$',
            ];
        };
    }


}
