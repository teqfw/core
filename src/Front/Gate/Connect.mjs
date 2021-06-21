/**
 * Used by gates to connect to backend services (API).
 * TODO: move gate functionality to 'http2' plugin
 */
export default class TeqFw_Core_App_Front_Gate_Connect {
    constructor(spec) {
        /** @type {TeqFw_Core_App_Defaults} */
        const DEF = spec['TeqFw_Core_App_Defaults$'];   // singleton
        /** @type {TeqFw_Core_App_Front_Data_Config} */
        const config = spec[DEF.DI_CONFIG]; // singleton
        /** @type {TeqFw_Core_App_Front_Gate_Connect_AjaxLed} */
        const ajaxLed = spec['TeqFw_Core_App_Front_Gate_Connect_AjaxLed$']; // singleton
        /** @type {TeqFw_Core_App_Front_Gate_Connect_ErrorHandler} */
        const errHndl = spec['TeqFw_Core_App_Front_Gate_Connect_ErrorHandler$']; // singleton

        const BASE = `https://${config.urlBase}/${config.realm}/${DEF.AREA_API}`;

        /**
         * Send API service request to backend.
         *
         * @param {Object} data JS-object to be sent as request
         * @param {String} realm 'user'
         * @param {String} route '/path/to/service'
         * @returns {Promise<Object|Boolean>}
         */
        this.send = async function (data, realm, route) {
            let result = false;
            ajaxLed.on();
            try {
                const URL = `${BASE}/${realm}${route}`;
                const res = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({data})
                });
                const json = await res.json();
                if (json.data) {
                    result = json.data;  // normal result
                } else {
                    errHndl.business(json.error);
                }
                return result;
            } catch (e) {
                errHndl.infrastructure(e);
            } finally {
                ajaxLed.off();
            }
        };
    }

}
