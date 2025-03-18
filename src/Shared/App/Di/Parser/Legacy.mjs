/**
 * This is the parser for old-style depIds used in TeqFW packages before @teqfw/di v0.20.0.
 *   - Vnd_Pkg_Prj_Mod[.|#]export$$
 *
 * @namespace TeqFw_Core_Shared_App_Di_Parser_Legacy
 */

// VARS
/** @type {string} default export keyword */
const DEF_EXP = 'default';
/** @type {string} logical namespace export mark (Ns_Mod.export) */
const EXP = '.';
/** @type {string} filesystem export mark (@vendor/package!module#export$$) and old logical export mark */
const EXP_OLD = '#';
/** @type {string} new instance mark (Ns_Mod.export$$) */
const INST = '$$';
/** @type {RegExp} expression for logical namespace IDs (Ns_Module[.|#]export$$@@) */
const REGEXP = /^((([A-Z])[A-Za-z0-9_]*)((#|.)?([A-Za-z0-9_]*)(\${1,2}|@{1,2})?)?)$/;
/** @type {RegExp} expression for objects that manually added to DI container (singleton, namedFactory$$)  */
const MANUAL = /^((([a-z])[A-Za-z0-9_]*)(\$\$)?)$/s;
/** @type {string} new instance proxy mark (Ns_Mod.export@@) */
const P_INST = '@@';
/** @type {string} singleton proxy mark (Ns_Mod.export@) */
const P_SNGLT = '@';
/** @type {string} singleton mark (Ns_Mod.export$) */
const SNGLT = '$';

// MAIN
/**
 * @implements TeqFw_Di_Api_Container_Parser_Chunk
 */
export default class TeqFw_Core_Shared_App_Di_Parser_Legacy {
    /**
     * @param {typeof TeqFw_Di_DepId} Dto
     * @param {TeqFw_Core_Shared_Defaults} DEF - core defaults
     */
    constructor(
        {
            'TeqFw_Di_DepId.default': Dto,
            TeqFw_Core_Shared_Defaults$: DEF,
        }
    ) {
        this.parse = function (objectKey) {
            const res = new Dto();
            res.value = objectKey;
            const parts = REGEXP.exec(objectKey);
            if (parts) {
                res.moduleName = parts[2];
                // Ns_Module.name$$[@@] - named instance [proxy]
                if (
                    ((parts[5] === EXP) || (parts[5] === EXP_OLD))
                    && ((parts[7] === INST) || (parts[7] === P_INST))
                ) {
                    if (parts[7] === P_INST)
                        res.wrappers.push(DEF.DI_WRAP_PROXY);
                    res.composition = DEF.DI_COMP_FACTORY;
                    res.life = DEF.DI_LIFE_INSTANCE;
                    res.exportName = parts[6];
                }
                // Ns_Module.name$[@] - named singleton [proxy]
                else if (
                    ((parts[5] === EXP) || (parts[5] === EXP_OLD))
                    && ((parts[7] === SNGLT) || (parts[7] === P_SNGLT))
                ) {
                    if (parts[7] === P_SNGLT)
                        res.wrappers.push(DEF.DI_WRAP_PROXY);
                    res.composition = DEF.DI_COMP_FACTORY;
                    res.life = DEF.DI_LIFE_SINGLETON;
                    res.exportName = parts[6];
                }
                // Ns_Module.name - named export
                else if (
                    ((parts[5] === EXP) || (parts[5] === EXP_OLD))
                    && ((parts[6] !== undefined) && (parts[6] !== ''))
                ) {
                    res.composition = DEF.DI_COMP_AS_IS;
                    res.exportName = parts[6];
                    res.life = DEF.DI_LIFE_SINGLETON;
                }
                // Ns_Module$$[@@]- default instance [proxy]
                else if ((parts[4] === INST) || (parts[4] === P_INST)) {
                    if (parts[4] === P_INST)
                        res.wrappers.push(DEF.DI_WRAP_PROXY);
                    res.composition = DEF.DI_COMP_FACTORY;
                    res.life = DEF.DI_LIFE_INSTANCE;
                    res.exportName = DEF_EXP;
                }
                // Ns_Module$[@] - default singleton [proxy]
                else if ((parts[4] === SNGLT) || (parts[4] === P_SNGLT)) {
                    if (parts[4] === P_SNGLT)
                        res.wrappers.push(DEF.DI_WRAP_PROXY);
                    res.composition = DEF.DI_COMP_FACTORY;
                    res.life = DEF.DI_LIFE_SINGLETON;
                    res.exportName = DEF_EXP;
                }
                // Ns_Module#[.] - default export
                else if (
                    ((parts[5] === EXP) || (parts[5] === EXP_OLD))
                    && (parts[7] === undefined)
                ) {
                    res.composition = DEF.DI_COMP_AS_IS;
                    res.life = DEF.DI_LIFE_SINGLETON;
                    res.exportName = DEF_EXP;
                } else {
                    // just a es6-module (deprecated)

                }
            } else {
                const manual = MANUAL.exec(objectKey);
                if (manual) {
                    if (manual[4] === '$$') {
                        res.composition = DEF.DI_COMP_FACTORY;
                        res.life = DEF.DI_LIFE_INSTANCE;
                    } else {
                        res.life = DEF.DI_LIFE_SINGLETON;
                    }
                } else {
                    // TODO: add exception
                }
            }
            return res;
        };
    }

    canParse(depId) {
        return (depId.indexOf('TeqFw_Web_Event_') === 0) ||
            (depId.indexOf('TeqFw_Web_Push_') === 0) ||
            (depId.indexOf('Ra_') === 0);
    }
}