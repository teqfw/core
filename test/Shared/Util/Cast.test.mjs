import testEnv from '../../TestEnv.mjs';
import assert from 'node:assert';
import {describe, it} from 'mocha';

/** @type {TeqFw_Di_Api_Container} */
const container = await testEnv();
const util = await container.get('TeqFw_Core_Shared_Util_Cast');

/**
 * This is a sample test unit. Base code for future tests in case it will be required.
 */
describe('TeqFw_Core_Shared_Util_Cast', function () {

    describe('castArray', function () {
        const fn = util.castArray;
        it('returns empty array for wrong input', async () => {
            const res = fn(null);
            assert(Array.isArray(res) & res.length === 0, 'expected empty array');
        });
        it('returns copy of input array', async () => {
            const data = [1, 2, 3];
            const res = fn(data);
            assert(res !== data, 'expected result should not be equal to input data ');
            assert(res.length === data.length, 'lengths of input & output arrays should be equal ');
        });
    });

    describe('castBoolean', function () {
        const fn = util.castBoolean;
        it('returns true', async () => {
            const r1 = fn('true');
            const r2 = fn('TRUE');
            const r3 = fn('yes');
            const r4 = fn('YES');
            const r5 = fn(1);
            assert(
                (r1 === true)
                && (r2 === true)
                && (r3 === true)
                && (r4 === true)
                && (r5 === true)
            );
        });
        it('returns false', async () => {
            const r1 = fn(0);
            const r2 = fn(null);
            const r3 = fn(undefined);
            assert(
                (r1 === false)
                && (r2 === false)
                && (r3 === false)
            );
        });
    });

    describe('castBooleanIfExists', function () {
        const fn = util.castBooleanIfExists;
        it('returns true', async () => {
            const r1 = fn('true');
            const r2 = fn('TRUE');
            const r3 = fn('yes');
            const r4 = fn('YES');
            const r5 = fn(1);
            assert(
                (r1 === true)
                && (r2 === true)
                && (r3 === true)
                && (r4 === true)
                && (r5 === true)
            );
        });
        it('returns false', async () => {
            const r1 = fn(0);
            const r2 = fn(null);
            assert(
                (r1 === false)
                && (r2 === null)
            );
        });
        it('returns undefined', async () => {
            const r1 = fn(undefined);
            assert((r1 === undefined));
        });
    });

    describe('castEnum', function () {
        const fn = util.castEnum;
        it('returns value', async () => {
            const data = 'value';
            const enu = {KEY: 'value', OTHER: 'other'};
            const res = fn(data, enu, false);
            assert(res === data);
        });
        it('returns undefined', async () => {
            const data = 'missed';
            const enu = {KEY: 'value', OTHER: 'other'};
            const res = fn(data, enu);
            assert(res === undefined);
        });
    });

});
