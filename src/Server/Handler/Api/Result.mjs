/**
 * Service result contains response object and additional headers.
 */
export default class TeqFw_Core_App_Server_Handler_Api_Result {
    headers = {}; // see nodejs 'http2.constants' with 'HTTP2_HEADER_...' prefixes
    response;
}
