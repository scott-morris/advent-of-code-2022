// Dependencies

import memoize from './memoize.ts';

// Types

import { SimpleObject, Stringable } from './types.ts';

// Private

// eslint-disable-next-line no-underscore-dangle, no-use-before-define
const _factorial = memoize(factorial);

// Public

/**
 * Get the sum of an array of numbers
 */
export function sum(arr: Array<number>): number {
  return arr.reduce((a, b) => a + b);
}

/**
 * Get the unique items in an array and how many times they appear
 */
export function countValues(val: Array<Stringable> | SimpleObject): Map<Stringable, number> {
  return Array.isArray(val)
    ? val.reduce((res, item) => {
        res.set(item, (res?.get(item) ?? 0) + 1);
        return res;
      }, new Map())
    : Object.keys(val).reduce((res, key) => {
        const item = val[key];
        res.set(item, (res?.get(item) ?? 0) + 1);
        return res;
      }, new Map());
}

/**
 * Get the factorial of the given number
 */
export function factorial(number: number): number {
  return number === 0 ? number : number + _factorial(number - 1);
}

/**
 * Get the mean (average) of an array of numbers
 */
export function mean(arr: Array<number>): number {
  return sum(arr) / arr.length;
}

// Alias
export const average = mean;

/**
 * Get the median of an array of numbers
 */
export function median(arr: Array<number>): number {
  const numbers = [...arr];
  const len = numbers.length;
  numbers.sort((a, b) => a - b);
  return len % 2 === 0
    ? (numbers[len / 2 - 1] + numbers[len / 2]) / 2 // average of the two middle numbers
    : numbers[(len - 1) / 2]; // the middle number only
}

/**
 * Get the mode of an array of numbers
 */
export function mode(arr: Array<number>): Array<number> {
  interface CountObject {
    [index: number]: number
  }
  
  const modes: Array<number> = [];
  const count: CountObject = {};
  let maxIndex = 0;

  arr.forEach((number) => {
    count[number] = (count?.[number] ?? 0) + 1;
    maxIndex = Math.max(maxIndex, count[number]);
  });

  Object.keys(count).forEach((strKey) => {
    const key = Number(strKey);
    if (count[key] === maxIndex) {
      modes.push(Number(key));
    }
  });

  return modes;
}

/**
 * Round a given number to a specific number of places
 */
export function round(number: number, places = 0): string {
  return places === 0
    ? String(Math.round(number))
    : number.toFixed(places);
}

/**
 * Get the Standard Deviation from an array of numbers
 */
export const stdDev = (arr: Array<number>, usePopulation = false): number => {
  const meanValue = mean(arr);

  return Math.sqrt(
    arr
      .reduce((acc: Array<number>, val) => acc.concat((val - meanValue) ** 2), [])
      .reduce((acc, val) => acc + val, 0) /
      (arr.length - (usePopulation ? 0 : 1))
  );
};

/**
 * Transpose a 2-dimensional array
 * @param {Array<Array<Number>>} arr the 2-dimensional array (matrix) of numbers
 * @returns {Array<Array<Number>>} the transposed 2-dimensional array
 */
export function transpose(arr: Array<Array<number>>) {
  const output: Array<Array<number>> = [];

  arr.forEach((row) =>
    row.forEach((item, idx) => {
      output[idx] = [...(output?.[idx] ?? []), item];
      return output;
    })
  );

  return output;
}