/**
 * Order an items using it's before/after attributes.
 *
 * !!! Don't use this code as singleton. Create or reset instances for every usage. !!!
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Shared_Util_BeforeAfter';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Core_Shared_Util_BeforeAfter
 */
class Dto {
    static name = `${NS}.Dto`;
    /** @type {string[]} */
    after;
    /** @type {string[]} */
    before;
    /** @type {string} */
    id;
}

export default class TeqFw_Core_Shared_Util_BeforeAfter {
    constructor(spec) {
        // EXTRACT DEPS
        // DEFINE WORKING VARS / PROPS
        let _needReorder = false;
        /** @type {Object<string, Dto>} */
        let _items = {};
        let _ordered = [];

        // DEFINE INNER FUNCTIONS
        function reorder() {
            // DEFINE INNER FUNCTIONS
            /**
             * Convert 'before/after' notation to 'dependent' notation and compose successors list.
             * @return Object<string, string[]>
             */
            function initSuccessors() {
                /** @type {Object<string, string[]>} */
                const res = {}; // {root => [node, ...]}
                for (const id of Object.keys(_items)) {
                    if (!res[id]) res[id] = [];
                    const item = _items[id];
                    // node / this
                    for (const one of item.after) res[id].push(one);
                    // this / root
                    for (const one of item.before) {
                        if (!res[one]) res[one] = [];
                        res[one].push(id);
                    }
                }
                // make deps unique and delete nodes w/o dependants
                for (const ns of Object.keys(res)) {
                    res[ns] = [...new Set(res[ns])];
                    if (res[ns].length === 0) delete res[ns];
                }
                return res;
            }

            /**
             * Recursive function to update nodes weights in hierarchy.
             * 1 - node has no deps (root), 2 - node has one dep's level below, ...
             *
             * Circular dependencies resolution is out of this scope.
             *
             * @param {string} name
             * @param {number} weight
             * @param {Object<string, string[]>} successors root => [node1, ...]
             * @param {Object<string, number>} weights
             */
            function setWeights(name, weight, successors, weights) {
                if (weights[name]) weight = weights[name] + 1;
                if (successors[name])
                    for (const one of successors[name])
                        if (weights[one])
                            setWeights(one, weights[one] + 1, successors, weights);
                        else
                            setWeights(one, 1, successors, weights);
                weights[name] = weight;
            }


            // MAIN FUNCTIONALITY
            _ordered = [];
            /** @type {Object<string, string[]>} {root => [node, ...]} */
            const successors = initSuccessors();
            /** @type {Object<string, number>} */
            const weights = {};
            for (const one of Object.values(_items)) setWeights(one.id, 1, successors, weights);
            // convert weights to levels, some items may be on one level
            /** @type {Object<number, string[]>} */
            const byLevel = {};
            for (const name of Object.keys(weights)) {
                const weight = weights[name];
                if (!byLevel[weight]) byLevel[weight] = [];
                byLevel[weight].push(name);
            }
            // reverse levels (first level is a root and should be mapped at the end
            const keys = Object.keys(byLevel).map(key => parseInt(key)); // get keys as integers
            keys.sort((a, b) => b - a); // sort as numbers (9..0)
            for (const one of keys)
                for (const id of byLevel[one])
                    if (_items[id]) _ordered.push(id);
            _needReorder = false;
            return _ordered;
        }

        // DEFINE INSTANCE METHODS
        /**
         * @param {TeqFw_Core_Shared_Util_BeforeAfter.Dto} item
         */
        this.addItem = function (item) {
            _items[item.id] = item;
            _needReorder = true;
        }

        this.getOrdered = function () {
            if (_needReorder) reorder();
            return [..._ordered]; // return copy
        }

        this.reset = function () {
            _needReorder = false;
            _items = {};
            _ordered = [];
        }
    }
}

export {
    Dto
}
