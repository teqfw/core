export default class TeqFw_Core_App_Defaults {
    API_LOAD_CFG = '/load/config';
    API_LOAD_NS = '/load/namespaces';
    BACK_REALM = 'core';  // realm for API services ('/api/core/...') and CLI commands ('core-...')
    DI_BOOTSTRAP = 'bootstrap'; // DI container label for bootstrap configuration.
    DI_CONTAINER = 'container'; // DI container label for container itself (see TeqFw_Di_Container.constructor).
    DI_I18N = 'core_i18n';  // TODO: move to 'vue' plugin
    FS_SRC = 'src'; // default folder for plugin's static resources in filesystem
    FS_WEB = 'web'; // default folder for plugin's static resources in filesystem
    HTTP_REQ_CTX_BODY = 'body';
    HTTP_REQ_CTX_FLAGS = 'flags';
    HTTP_REQ_CTX_HEADERS = 'headers';
    HTTP_REQ_CTX_STREAM = 'stream';
    HTTP_REQ_CTX_TRANS = 'transaction';
    PID_FILE_NAME = './var/server.pid'; // PID file to stop running server.
    REALM_API = 'api';    // URL prefix for API requests: https://.../api/...
    REALM_SRC = 'src';    // URL prefix for ES6/JS sources: https://.../src/...
    REALM_WEB = 'web';    // URL prefix for static files: https://.../web/...
    SERVER_DEFAULT_PORT = 3000; // Default port for listing.
}
