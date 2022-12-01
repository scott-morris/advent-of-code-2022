// Libraries

import "../types/global.d.ts";

/**
 * Get the amount of time it takes to execute a function at runtime
 * @param {Function} fn the function to time
 * @returns {Object} an object as `{ result, duration }`
 */
export default function timeExecution(
  fn: Function
): (args: any) => TimedAnswer {
  return (...args) => {
    const start = performance.now();
    const result = fn(...args);
    const stop = performance.now();

    return {
      result,
      duration: (stop - start) / 1000,
    };
  };
}
