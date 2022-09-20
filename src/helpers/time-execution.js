// Libraries

const { JSDOM } = require('jsdom');

// Private

const { window } = new JSDOM();

// Public

/**
 * Get the amount of time it takes to execute a function at runtime
 * @param {Function} fn the function to time
 * @returns {Object} an object as `{ result, duration }`
 */
function timeExecution(fn) {
  return typeof fn === 'function'
    ? (...args) => {
        const start = window.performance.now();
        const result = fn(...args);
        const stop = window.performance.now();

        return {
          result,
          duration: (stop - start) / 1000,
        };
      }
    : Object.keys(fn).reduce(
        (obj, key) => ({
          [key]: timeExecution(fn[key]),
          ...obj,
        }),
        {}
      );
}

module.exports = timeExecution;
