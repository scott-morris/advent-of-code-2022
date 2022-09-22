// Libraries

import { Spy } from "https://deno.land/std@0.156.0/testing/mock.ts";

// Type

type Cacheable = string | string[] | number | number[] | null;

interface CacheObject {
  [key: string]: Cacheable;
}

// Public

/**
 * Memoize a function so that if it is called more than once with the same parameter
 * values, it will return a cached value instead of re-running the function multiple
 * times. This is ideal for recursive functions or functions that take time and are
 * called many times or require larger amounts of memory.
 */
// deno-lint-ignore ban-types
export default function memoize(fn: Function | Spy): Function {
  const cache: CacheObject = {};

  return (...args: Cacheable[]) => {
    const key: string = JSON.stringify(args);

    if (cache?.[key] !== undefined) {
      return cache[key];
    }
      
    // Run the function
    const result = fn(...args);
    
    // Cache the results
    cache[key] = result;

    return result;
  };
}
