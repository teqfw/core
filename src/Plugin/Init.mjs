/**
 * Class to integrate plugin into TeqFW application.
 */
export default class TeqFw_Core_App_Plugin_Init {

    constructor() {

        this.getCommands = function () {
            return [
                'TeqFw_Core_App_Cli_Server_Start$',
                'TeqFw_Core_App_Cli_Server_Stop$',
            ];
        };

        this.getHttp2StaticMaps = function () {
            // TODO: what about wrong mapping? Perhaps, we need mapping below 'node_modules' folder:
            // '/i18next-detect/' => '/i18next-browser-languagedetector/dist/umd/'
            // and map as '$path.join(rootFs, 'node_modules', map[key])'
            return {
                '/i18next-detect/': '/i18next-browser-languagedetector/dist/umd/',
                '/i18next/': '/i18next/dist/umd/',
                '/vue-router/': '/vue-router/dist/',
                '/vue/': '/vue/dist/',
                '/vuex/': '/vuex/dist/',
            };
        };

        this.getHttp2BackRealm = function () {
            return 'core';
        };

        this.getHttp2Services = function () {
            return [
                'TeqFw_Core_App_Back_Service_LoadNs$'
            ];
        };
    }


}
