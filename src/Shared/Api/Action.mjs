/**
 * A new abstraction of functionality with one input and one output argument. Actions are used as units
 * at the runtime level to compose chains of functionality.
 *
 * The class constructor sets up the environment for the action (deps), and the `run` method performs the action itself.
 *
 * 'function' notation is better than 'class' notation for actions, but there were some
 * issues with the 'Find Usages' operation in IDEA for 'function' notation.
 *
 * @interface
 * This code is for documentation purposes only (not executable).
 *
 * @namespace TeqFw_Core_Shared_Api_Act
 * Used to refer to implementations of old versions of this interface.
 */
class TeqFw_Core_Shared_Api_Action {
    /**
     * @param {Object} [params]
     * @returns {Promise<Object>}
     */
    async run(params) {}
}
