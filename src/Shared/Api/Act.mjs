/**
 * A new abstraction of functionality with one input and one output argument. Actions are used as units
 * at the runtime level to compose chains of functionality.
 *
 * The class constructor sets up the environment for the action (deps), and the `act` method performs the action itself.
 *
 * 'function' notation is better than 'class' notation for actions, but there were some
 * issues with the 'Find Usages' operation in IDEA for 'function' notation.
 *
 * This code is for documentation purposes only (not executable).
 *
 * @interface
 */
export default class TeqFw_Core_Shared_Api_Act {
    /**
     * @param {Object} [opts]
     * @return {Promise<Object>}
     */
    act(opts) {}
}
