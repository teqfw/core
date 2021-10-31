/**
 * Meta information for DTO.
 * @interface
 */
export default class TeqFw_Core_Shared_Api_Dto_IMeta {
    /**
     * Create entity DTO from given data.
     * @param [data]
     * @return {Object}
     */
    createDto(data) {}

    /**
     * Get codifier for entity attributes.
     * @return {Object}
     */
    getAttributes() {}

    /**
     * Return array with names of entity attributes.
     * @return {string[]}
     */
    getAttrNames() {}

}
