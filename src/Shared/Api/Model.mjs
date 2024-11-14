/**
 * Interface for managing data in a store.
 *
 * @interface TeqFw_Core_Shared_Api_Model
 */
export default class TeqFw_Core_Shared_Api_Model {
    /**
     * Composes a new entity DTO.
     *
     * @param {Object} dto - Initial data for composing the entity.
     * @returns {object} - The composed entity DTO.
     */
    composeEntity(dto) {}

    /**
     * Composes a new list item DTO.
     *
     * @param {Object} dto - Initial data for composing the item.
     * @returns {object} - The composed item DTO.
     */
    composeItem(dto) {}

    /**
     * Creates a new entry in the store.
     *
     * @param {object} opts - Options for creating the entry.
     * @returns {object} - Result of the create operation.
     */
    async create(opts) {}

    /**
     * Deletes a record from the store.
     *
     * @param {object} opts - Options for deleting the record.
     * @returns {object} - Result of the delete operation.
     */
    async delete(opts) {}

    /**
     * Reads a record from the store.
     *
     * @param {object} opts - Options for reading the record.
     * @returns {object} - The retrieved record or result of the read operation.
     */
    async read(opts) {}

    /**
     * Throws an error when attempting to update an entry.
     *
     * @param {object} opts - Options for the update operation.
     * @returns {object} - Result of the update operation.
     */
    async update(opts) {}
}
