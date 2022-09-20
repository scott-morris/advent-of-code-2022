// Dependencies

const memoize = require('./memoize');

// Private

// eslint-disable-next-line no-underscore-dangle, no-use-before-define
const _factorial = memoize(factorial);

// Public

/**
 * Get the sum of an array of numbers
 * @param {Array<Number>} arr array of numbers to sum
 * @returns {Number}
 */
function sum(arr) {
  return arr.reduce((a, b) => a + b);
}

/**
 * Get the unique items in an array and how many times they appear
 * @param {Array<*>|Object} val array of primitive values
 * @returns {Map}
 */
function countValues(val) {
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
 * @param {Number} number the number to calculate
 * @returns {Number}
 */
function factorial(number) {
  return number === 0 ? number : number + _factorial(number - 1);
}

/**
 * Get the mean (average) of an array of numbers
 * @param {Array<Number>} arr the array of numbers
 * @returns {Number}
 */
function mean(arr) {
  return sum(arr) / arr.length;
}

/**
 * Get the median of an array of numbers
 * @param {Array<Number>} arr the array of numbers
 * @returns {Number}
 */
function median(arr) {
  const numbers = [...arr];
  const len = numbers.length;
  numbers.sort((a, b) => a - b);
  return len % 2 === 0
    ? (numbers[len / 2 - 1] + numbers[len / 2]) / 2 // average of the two middle numbers
    : numbers[(len - 1) / 2]; // the middle number only
}

/**
 * Get the mode of an array of numbers
 * @param {Array<Number>} arr the array of numbers
 * @returns {Array<Number>} the list of numbers that occur most often
 */
function mode(arr) {
  const modes = [];
  const count = {};
  let maxIndex = 0;

  arr.forEach((number) => {
    count[number] = (count?.[number] ?? 0) + 1;
    maxIndex = Math.max(maxIndex, count[number]);
  });

  Object.keys(count).forEach((key) => {
    if (count[key] === maxIndex) {
      modes.push(Number(key));
    }
  });

  return modes;
}

/**
 * Round a given number to a specific number of places
 * @param {Number} number the number to round
 * @param {Number} [places = 0] the number of places to round the number
 * @returns {Number} the number rounded to the number of places
 */
function round(number, places = 0) {
  return places === 0
    ? parseInt(number, 10)
    : parseFloat(number.toFixed(places));
}

/**
 * Get the Standard Deviation from an array of numbers
 * @param {Array<Number>} arr the array of numbers
 * @param {Boolean} usePopulation whether to use the population
 * @returns {Number}
 */
const stdDev = (arr, usePopulation = false) => {
  const meanValue = mean(arr);
  return Math.sqrt(
    arr
      .reduce((acc, val) => acc.concat((val - meanValue) ** 2), [])
      .reduce((acc, val) => acc + val, 0) /
      (arr.length - (usePopulation ? 0 : 1))
  );
};

/**
 * Transpose a 2-dimensional array
 * @param {Array<Array<Number>>} arr the 2-dimensional array (matrix) of numbers
 * @returns {Array<Array<Number>>} the transposed 2-dimensional array
 */
function transpose(arr) {
  const output = [];

  arr.forEach((row) =>
    row.forEach((item, idx) => {
      output[idx] = [...(output?.[idx] ?? []), item];
      return output;
    })
  );

  return output;
}

module.exports = {
  average: mean,
  countValues,
  factorial,
  mean,
  median,
  mode,
  round,
  stdDev,
  sum,
  transpose,
};
