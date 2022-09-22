// Libraries

import { assertEquals } from "https://deno.land/std@0.156.0/testing/asserts.ts";

// Dependencies

import isNumber from './is-number.ts';

// Tests

Deno.test('isNumber.ts', async (t) => {
    const numbers = [10, 3.14159, 3.14000, 3.1e8];
    const validStrings = ['10', '3.14159', '3.14000'];
    const invalidStrings = ['9134437236318171116117288148911191769789149391998581842118486728495315197918969961726641911197278519','foo']

    await Promise.all(numbers.map((input) => t.step({ name: `when given a number (${input}), it should return true`, fn: () => {
        assertEquals(isNumber(input), true);
    }, sanitizeExit: false, sanitizeOps: false, sanitizeResources: false })));

    await Promise.all(validStrings.map((input) => t.step({ name: `when given a valid number string ("${input}"), it should return true`, fn: () => {
        assertEquals(isNumber(input), true);   
    }, sanitizeExit: false, sanitizeOps: false, sanitizeResources: false })));

    await Promise.all(invalidStrings.map((input) => t.step({ name: `when given an invalid number string ("${input}"), it should return true`, fn: () => {
        assertEquals(isNumber(input), false);   
    }, sanitizeExit: false, sanitizeOps: false, sanitizeResources: false })));
});