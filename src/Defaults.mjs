export default class TeqFw_Core_App_Defaults {
    API_LOAD_CFG = '/load/config';
    API_LOAD_I18N = '/load/i18n';
    API_LOAD_NS = '/load/namespaces';

    AREA_API = 'api';    // URL prefix for API requests: https://.../realm/api/...
    AREA_SRC = 'src';    // URL prefix for ES6/JS sources: https://.../realm/src/...
    AREA_WEB = 'web';    // URL prefix for static files: https://.../realm/web/...

    BACK_REALM = 'core';  // realm for API services ('/api/core/...') and CLI commands ('core-...')

    DI_APP = 'coreApp'; // DI container label for Vue application singleton.
    DI_BOOTSTRAP = 'bootstrap'; // DI container label for bootstrap configuration.
    DI_CONFIG = 'coreConfig'; // TODO: should we use named singleton or instance 'TeqFw_Di_Container$'?
    DI_CONTAINER = 'container'; // DI container label for container itself (see TeqFw_Di_Container.constructor).
    DI_I18N = 'coreI18n';

    FS_SRC = 'src'; // default folder for plugin's static resources in filesystem
    FS_WEB = 'web'; // default folder for plugin's static resources in filesystem

    I18N_BACK = 'back'; // i18n realm for backend resources in plugin initializer
    I18N_FRONT = 'front'; // i18n realm for frontend resources in plugin initializer
    I18N_SHARED = 'shared'; // i18n realm for shared resources in plugin initializer
}
