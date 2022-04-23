/**
 * Basic functionality for event bus (front or back).
 *
 * Use it as mixins (inject base as instance in child constructor):
 *   const base = spec['TeqFw_Core_Shared_Mod_Event_Bus$$']; // $$ - instance
 *   Object.assign(this, base);
 *
 * @implements TeqFw_Core_Shared_Api_Event_IBus
 */
export default class TeqFw_Core_Shared_Mod_Event_Bus {
    constructor(spec) {
        // DEPS
        /** @type {typeof TeqFw_Core_Shared_Mod_Event_Subscription} */
        const Subscription = spec['TeqFw_Core_Shared_Mod_Event_Subscription#'];

        // VARS
        /** @type {Object<string, function[]>} */
        const _listeners = {};

        // INSTANCE METHODS

        this.publish = function (message) {
            const eventName = message?.meta?.name;
            if (Array.isArray(_listeners[eventName]))
                for (const one of _listeners[eventName]) {
                    one(message);
                }
        }

        this.subscribe = function (eventName, handler) {
            if (!_listeners[eventName]) _listeners[eventName] = [];
            _listeners[eventName].push(handler);
            return new Subscription(eventName, handler);
        }

        this.unsubscribe = function (subscription) {
            const name = subscription.getEventName();
            const handler = subscription.getHandler();
            if (Array.isArray(_listeners[name]))
                _listeners[name] = _listeners[name].filter(item => item !== handler);
        }
    }
}
