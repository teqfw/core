/**
 * Request and response for "Load namespaces" service.
 */
class TeqFw_Core_App_Shared_Service_Route_Load_Namespaces_Request {
}

class TeqFw_Core_App_Shared_Service_Route_Load_Namespaces_Response {
    /** @type {Object.<String, TeqFw_Core_App_Shared_Service_Route_Load_Namespaces_ResponseItem>} */
    items;
}

class TeqFw_Core_App_Shared_Service_Route_Load_Namespaces_ResponseItem {
    /**
     * Extension for ES6 modules ('mjs' or 'js').
     * @type {String}
     */
    ext;
    /**
     * Namespace ('Vendor_Project')
     * @type {String}
     */
    ns;
    /**
     * Path to the sources in URL ('/src/@vendor/prj').
     * (@see TeqFw_Http2_Back_Server_Handler_Static)
     * @type {String}
     */
    path;
}

export {
    TeqFw_Core_App_Shared_Service_Route_Load_Namespaces_Request as Request,
    TeqFw_Core_App_Shared_Service_Route_Load_Namespaces_Response as Response,
    TeqFw_Core_App_Shared_Service_Route_Load_Namespaces_ResponseItem as ResponseItem,
};
