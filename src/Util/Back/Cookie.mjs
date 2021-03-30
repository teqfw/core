/**
 * Cookie related utilities.
 */
export default class TeqFw_Core_App_Util_Back_Cookie {

    /**
     * Compose expired HTTP cookie to remove existing cookie with the same name in the browser.
     *
     * @param {String} name
     * @param {String} realm
     * @returns {String}
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
     */
    compose(name) {
        // DEFINE INNER FUNCTIONS


        // MAIN FUNCTIONALITY

        // COMPOSE RESULT
        return '';
    }
}
