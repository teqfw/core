// MODULE'S IMPORTS
import testEnv from '../../TestEnv.mjs';
import assert from 'node:assert';
import {describe, it} from 'mocha';

// MODULE'S VARS
/** @type {TeqFw_Di_Api_Container} */
const container = await testEnv();
const util = await container.get('TeqFw_Core_Shared_Util_BeforeAfter');

// MODULE'S FUNCS
/**
 * 'true' if 'obj' is a class definition (can be used as 'new obj()').
 * @param {*} obj
 * @returns {boolean}
 */
function isClass(obj) {
    let result = false;
    if (typeof obj === 'function') {
        const proto = Object.getOwnPropertyDescriptor(obj, 'prototype');
        result = (proto && !proto.writable);
    }
    return result;
}

// MODULE'S MAIN
describe('TeqFw_Core_Shared_Util_BeforeAfter', function () {

    it('has right export', async () => {
        assert(isClass(util.Dto));
        assert(isClass(util.default));
    });

    it('can order simple case', async () => {
        /** @type {typeof TeqFw_Core_Shared_Util_BeforeAfter.Dto} */
        const Dto = await container.get('TeqFw_Core_Shared_Util_BeforeAfter.Dto');
        /** @type {TeqFw_Core_Shared_Util_BeforeAfter} */
        const util = await container.get('TeqFw_Core_Shared_Util_BeforeAfter$$');
        const final = new Dto();
        final.id = 'final';
        final.before = [];
        final.after = [];
        util.addItem(final);
        const stat = new Dto();
        stat.id = 'stat';
        stat.before = ['final'];
        stat.after = [];
        util.addItem(stat);
        const service = new Dto();
        service.id = 'service';
        service.before = ['stat'];
        service.after = [];
        util.addItem(service);
        const upload = new Dto();
        upload.id = 'upload';
        upload.before = ['final'];
        upload.after = ['stat'];
        util.addItem(upload);
        //
        const ordered = util.getOrdered();
        assert(ordered[0] === 'service');
        assert(ordered[1] === 'stat');
        assert(ordered[2] === 'upload');
        assert(ordered[3] === 'final');
    });

    it('can order items with missed ids', async () => {
        /** @type {typeof TeqFw_Core_Shared_Util_BeforeAfter.Dto} */
        const Dto = await container.get('TeqFw_Core_Shared_Util_BeforeAfter.Dto');
        /** @type {TeqFw_Core_Shared_Util_BeforeAfter} */
        const util = await container.get('TeqFw_Core_Shared_Util_BeforeAfter$$');
        const final = new Dto();
        final.id = 'final';
        final.before = [];
        final.after = [];
        util.addItem(final);
        const service = new Dto();
        service.id = 'service';
        service.before = ['stat'];
        service.after = [];
        util.addItem(service);
        const upload = new Dto();
        upload.id = 'upload';
        upload.before = ['final'];
        upload.after = ['stat'];
        util.addItem(upload);
        //
        const ordered = util.getOrdered();
        assert(ordered[0] === 'service');
        assert(ordered[1] === 'upload');
        assert(ordered[2] === 'final');
    });

});
