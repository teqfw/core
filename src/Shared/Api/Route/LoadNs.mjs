/**
 * Request and response for "Save one field of user profile" service.
 */
class TeqFw_Core_App_Shared_Api_Route_LoadNs_Request {

}

class TeqFw_Core_App_Shared_Api_Route_LoadNs_Response {
    /** @type {Object.<String, TeqFw_Core_App_Shared_Api_Route_LoadNs_ResponseItem>} */
    items;
}

class TeqFw_Core_App_Shared_Api_Route_LoadNs_ResponseItem {
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
     * (@see TeqFw_Core_App_Server_Handler_Static)
     * @type {String}
     */
    path;
}

export {
    TeqFw_Core_App_Shared_Api_Route_LoadNs_Request as Request,
    TeqFw_Core_App_Shared_Api_Route_LoadNs_Response as Response,
    TeqFw_Core_App_Shared_Api_Route_LoadNs_ResponseItem as ResponseItem,
};
