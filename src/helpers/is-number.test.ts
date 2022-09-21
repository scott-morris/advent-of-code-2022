// Libraries

import { describe, it, expect } from 'bun:test';

// Dependencies

import isNumber from './is-number';

// Tests

describe('isNumber.js', () => {
    it('should be a function', () => {
        expect(typeof isNumber).toBe('function');
    })
    
    describe('when given a value', () => {
        describe('that is an integer', () => {
            it('it should return true', () => {
                expect(isNumber(10)).toBe(true);
            })
        });
    
        describe('that is non-whole number', () => {
            it('it should return true', () => {
                expect(isNumber(3.14159)).toBe(true);
                expect(isNumber(3.14000)).toBe(true);
                expect(isNumber(3.1e8)).toBe(true);
            })
        });

        describe('that is a string', () => {
            describe('that is an integer', () => {
                describe('that is too large to process', () => {
                    it('it should return false', () => {
                        expect(isNumber('9134437236318171116117288148911191769789149391998581842118486728495315197918969961726641911197278519')).toBe(false);
                    });
                });
                describe('that is not too large to process', () => {
                    it('it should return true', () => {
                        expect(isNumber('10')).toBe(true);
                    });
                });
            });
            describe('that is an non-whole number', () => {
                it('it should return true', () => {
                    expect(isNumber('3.14159')).toBe(true);
                    expect(isNumber('3.14000')).toBe(true);
                });
            });
            describe('that is not a number', () => {
                it('it should return false', () => {
                    expect(isNumber('foo')).toBe(false);
                });
            });
        });
    
        describe('that is not a number or string type', () => {
            it('it should return false', () => {
                expect(isNumber(undefined)).toBe(false);
                expect(isNumber(null)).toBe(false);
            })
        });
    })
});

