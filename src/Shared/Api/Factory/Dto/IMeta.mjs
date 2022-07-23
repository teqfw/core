/**
 * Factory to create DTO and to provide meta information for DTO.
 *
 * This is documentation only code (not executable).
 *
 * @interface
 * @extends TeqFw_Core_Shared_Api_Factory_IDto
 */
export default class TeqFw_Core_Shared_Api_Factory_Dto_IMeta {
    /**
     * Get codifier for entity attributes.
     * @return {Object}
     */
    getAttributes() {}

    /**
     * Return array with names of entity attributes.
     * @return {string[]}
     * @deprecated this method is not used often, use 'getAttributes' and convert to names
     */
    getAttrNames() {}
}
