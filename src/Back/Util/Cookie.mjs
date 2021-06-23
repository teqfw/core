/**
 * Cookie related utilities.
 * @deprecated use TeqFw_Http2_Back_Util instead, should be removed after 2021/10/21
 */
export default class TeqFw_Core_Back_Util_Cookie {

    /**
     * Compose expired HTTP cookie to remove existing cookie with the same name in the browser.
     *
     * @param {String} name
     * @param {String} realm
     * @returns {String}
     * @deprecated use TeqFw_Http2_Back_Util instead, should be removed after 2021/10/21
     */
    clear(name, realm = '') {
        // MAIN FUNCTIONALITY
        const exp = 'Expires=Thu, 01 Jan 1970 00:00:00 GMT';
        const path = `Path=/${realm}`;
        return `${name}=; ${exp}; ${path}`;
    }


    /**
     * Compose HTTP cookie content.
     *
     * @param {String} name
     * @returns {String}
     * @deprecated use TeqFw_Http2_Back_Util instead, should be removed after 2021/10/21
     */
    compose(name) {
        // DEFINE INNER FUNCTIONS


        // MAIN FUNCTIONALITY

        // COMPOSE RESULT
        return '';
    }
}
