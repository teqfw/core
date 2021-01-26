import $fs from 'fs';
import $path from 'path';

class TeqFw_Core_App_Plugin_Scan_Item {
    /**
     * Name of the package.
     * @type {String}
     */
    name;
    /**
     * Path to the root of the package.
     * @type {String}
     */
    path;
    /**
     * 'teqfw' part of the 'package.json'.
     * @type {Object}
     */
    teqfw;
}

class TeqFw_Core_App_Plugin_Scan {
    constructor(spec) {
        /** @type {TeqFw_Core_App_Plugin_Registry} */
        const registry = spec['TeqFw_Core_App_Plugin_Registry$'];   // instance singleton

        /**
         * Scan packages and register TeqFW plugins in the registry.
         * @param {String} root
         * @return {Promise<TeqFw_Core_App_Plugin_Registry>}
         */
        this.exec = async function (root) {
            // DEFINE INNER FUNCTIONS

            /**
             * @param {String} root
             * @return {Promise<TeqFw_Core_App_Plugin_Scan_Item[]>}
             */
            async function getPackages(root) {
                // DEFINE INNER FUNCTIONS

                /**
                 * Check does 'package.json' exist, read content, parse and return data if 'yes'.
                 * @param {String} filename
                 * @return {TeqFw_Core_App_Plugin_Scan_Item|null}
                 */
                function checkPlugin(filename) {
                    let result = null;
                    try {
                        const stat = $fs.statSync(filename);
                        if (stat.isFile()) {
                            const buffer = $fs.readFileSync(filename);
                            const content = buffer.toString();
                            const json = JSON.parse(content);
                            if (json['teqfw']) {
                                result = new TeqFw_Core_App_Plugin_Scan_Item();
                                result.name = json.name;
                                result.path = $path.join(filename, '..');
                                result.teqfw = json.teqfw;
                            }
                        }
                    } catch (e) {
                        // stealth exception if 'package.json' does not exist
                    }
                    return result;
                }

                // MAIN FUNCTIONALITY
                const result = [];
                // get 'package.json' for application itself
                const fileApp = $path.join(root, 'package.json');
                const appItem = checkPlugin(fileApp);
                if (appItem) result.push(appItem);
                // get all 'package.json' from 'node modules' folder of the project
                const rootNodeMods = $path.join(root, 'node_modules');
                const packages = $fs.readdirSync(rootNodeMods);
                for (const pack of packages) {
                    if (pack[0] === '@') {
                        // scan nested packages for a scope
                        const rootVnd = $path.join(rootNodeMods, pack);
                        const nestedPkg = $fs.readdirSync(rootVnd);
                        for (const sub of nestedPkg) {
                            const filePackage = $path.join(rootVnd, sub, 'package.json');
                            const item = checkPlugin(filePackage);
                            if (item) result.push(item);
                        }
                    } else {
                        // scan package from 'node_modules'
                        const filePackage = $path.join(rootNodeMods, pack, 'package.json');
                        const item = checkPlugin(filePackage);
                        if (item) result.push(item);
                    }
                }
                return result;
            }

            // MAIN FUNCTIONALITY
            const items = await getPackages(root);
            for (const item of items) registry.set(item.name, item);
            return registry;
        };

        /**
         * @return {TeqFw_Core_App_Plugin_Registry}
         */
        this.getRegistry = function () {
            return registry;
        };
    }

}

export {
    TeqFw_Core_App_Plugin_Scan as default,
    TeqFw_Core_App_Plugin_Scan_Item as Item,
};
