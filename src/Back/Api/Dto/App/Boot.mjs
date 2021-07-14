/**
 * Application bootstrap configuration DTO to use in backend code.
 * This DTO is created by DI container directly and has no own factory.
 */
export default class TeqFw_Core_Back_Api_Dto_App_Boot {
    /**
     * Absolute path to the root folder of the project.
     *
     * @type {string}
     */
    projectRoot;
    /**
     * Current version of the application (`0.1.0`).
     *
     * @type {string}
     */
    version;
}
