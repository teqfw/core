/**
 * Container for application configuration.
 * Load local configuration from a file (default './cfg/local.json').
 *
 * @namespace TeqFw_Core_Back_Config
 */
// MODULE'S IMPORT
import {existsSync, readFileSync, statSync} from 'node:fs';
import {join} from 'node:path';

export default class TeqFw_Core_Back_Config {

    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Back_Defaults} */
        const DEF = spec['TeqFw_Core_Back_Defaults$'];
        /** @type {TeqFw_Core_Shared_Util_Probe.deepFreeze|function} */
        const deepFreeze = spec['TeqFw_Core_Shared_Util_Probe.deepFreeze'];

        // VARS
        /** @type {Object} storage for local configuration */
        let _local;
        /**
         * Absolute path to the root folder of the project.
         * @type {string}
         */
        let _projectRoot;
        /**
         * Current version of the application (`0.1.0`).
         * @type {string}
         */
        let _version;

        // INSTANCE METHODS

        /**
         * Get local configuration options (all or for given 'node' only).
         *
         * @param {string|null} node
         * @return {*}
         */
        this.getLocal = (node = null) => (node === null) ? _local : (_local) ? _local[node] : null;

        /**
         * Get absolute path to application's root folder (contains 'mode_modules').
         * @return {string}
         */
        this.getPathToRoot = () => _projectRoot;

        /**
         * Get application version.
         * @return {string}
         */
        this.getVersion = () => _version;

        /**
         * Store path to application root and application version.
         * Load local configuration from default location (./cfg/local.json).
         *
         * @param {string} path absolute path to application root
         * @param {string} version application version
         */
        this.init = function (path, version) {
            _projectRoot = path;
            _version = version;
            this.loadLocal(path);
        }

        /**
         * Load local configuration and init internal storage.
         *
         * @param {string} root absolute path to application root folder ('/home/alex/work/pwa/')
         * @param {string} cfg relative path to local configuration JSON (by default: './cfg/local.json')
         */
        this.loadLocal = function (root, cfg = DEF.PATH_CFG_LOCAL) {
            const full = join(root, cfg);
            if (existsSync(full) && statSync(full).isFile()) {
                const data = readFileSync(full);
                _local = JSON.parse(data.toString());
            } else _local = {}; // reset storage if local configuration does not exist
            deepFreeze(_local); // freeze local store
        };

    }
}
