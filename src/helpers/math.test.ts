// Libraries

import { assertInstanceOf, assertEquals } from "https://deno.land/std@0.164.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.164.0/testing/bdd.ts";

// Dependencies

import {
  countValues,
  factorial,
  mean,
  median,
  mode,
  round,
  stdDev,
  sum,
  transpose,
} from './math.ts';

// Tests

describe('math.js: ', () => {
  describe('countValues', () => {
    it('when given an array, it should return a Map containing the number of times a value appears in the array', () => {
      const result = countValues(['foo', 'bar', 'foo', 'baz', 'foo', 'baz']);

      assertInstanceOf(result, Map);

      const parsedResult = Array.from(result, ([name, value]) => [name, value]);
      assertEquals(parsedResult, [
        ['foo', 3],
        ['bar', 1],
        ['baz', 2],
      ]);
    });

    it('when given an object, it should return a Map containing the number of times a value appears in a property', () => {
      const result = countValues({
        a: 'foo',
        b: 'bar',
        c: 'foo',
      });

      assertInstanceOf(result, Map);

      const parsedResult = Array.from(result, ([name, value]) => [name, value]);
      assertEquals(parsedResult,[
        ['foo', 2],
        ['bar', 1],
      ]);
    });
  });

  describe('factorial', () => {
    it('it should calculate factorial correctly', () => {
      assertEquals(factorial(3), 6);
      assertEquals(factorial(4), 10);
    });
  });

  describe('mean', () => {
    it('it should calculate mean correctly', () => {
      assertEquals(mean([3, 5, 4, 4, 1, 1, 2, 3]), 2.875);
    });
  });

  describe('median', () => {
    it('it should calculate median correctly', () => {
      assertEquals(median([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 5.5);
      assertEquals(median([1, 2, 3, 4, 5, 6, 7, 8, 9]), 5);
    });
  });

  describe('mode', () => {
    it('it should calculate mode correctly', () => {
      assertEquals(mode([3, 5, 4, 4, 1, 1, 2, 3]), [1, 3, 4]);
    });
  });

  describe('round', () => {
    it('it should round to the number of places', () => {
      assertEquals(round(13.284434142114991, 8), "13.28443414");
      assertEquals(round(13.284434142114991, 4), "13.2844");
      assertEquals(round(13.284434142114991, 1), "13.3");
      assertEquals(round(13.284434142114991, 0), "13");
      assertEquals(round(Math.PI, 2), "3.14");
    });
  });

  describe('stdDev', () => {
    it('it should calculate stdDev correctly', () => {
      const result = stdDev([10, 2, 38, 23, 38, 23, 21]);

      // test at 8 decimal places for consistency
      assertEquals(round(result, 8), "13.28443414");
    });

    it('it should calculate stdDev with population correctly', () => {
      const result = stdDev([10, 2, 38, 23, 38, 23, 21], true);

      // test at 8 decimal places for consistency
      assertEquals(round(result, 8), "12.29899614");
    });
  });

  describe('sum', () => {
    it('it should calculate sum correctly', () => {
      assertEquals(sum([3, 5, 4, 4, 1, 1, 2, 3]), 23);
    });
  });

  describe('transpose', () => {
    it('it should transpose a 2-dimensional array', () => {
      const input = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      const expectedOutput = [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ];

      assertEquals(transpose(input), expectedOutput);
    });
  });
});
