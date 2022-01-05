/**
 * Basic functionality for event producers.
 *
 * Use it as mixins (inject base as instance in child constructor):
 *   const base = spec['TeqFw_Core_Shared_App_Event_Producer$$']; // $$ - instance
 *   Object.assign(this, base);
 *
 * @implements TeqFw_Core_Shared_Api_Event_IProducer
 */
export default class TeqFw_Core_Shared_App_Event_Producer {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {typeof TeqFw_Core_Shared_App_Event_Subscription} */
        const Subscription = spec['TeqFw_Core_Shared_App_Event_Subscription#'];

        // DEFINE WORKING VARS / PROPS
        /** @type {Object<string, function[]>} */
        const _listeners = {};

        // DEFINE INSTANCE METHODS

        this.emit = function (eventName, payload) {
            if (Array.isArray(_listeners[eventName]))
                for (const one of _listeners[eventName]) {
                    one(payload);
                }
        }

        this.subscribe = function (event, handler) {
            if (!_listeners[event]) _listeners[event] = [];
            _listeners[event].push(handler);
            return new Subscription(event, handler);
        }

        this.unsubscribe = function (subscription) {
            const name = subscription.getEventName();
            const handler = subscription.getHandler();
            if (Array.isArray(_listeners[name]))
                _listeners[name] = _listeners[name].filter(item => item !== handler);
        }
    }
}
