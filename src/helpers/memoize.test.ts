// Libraries

import { assertEquals } from "https://deno.land/std@0.156.0/testing/asserts.ts";
import { describe, it, afterEach } from "https://deno.land/std@0.156.0/testing/bdd.ts";
import { spy, restore, assertSpyCalls } from "https://deno.land/std@0.156.0/testing/mock.ts";

// Dependencies

import memoize from './memoize.ts';

// Private

export default function double (x: number): number {
  return x * 2;
}

// Tests

describe('memoize.ts:', () => {
  afterEach(() => {
    restore();
  });

  it('when called for the first time, it should call the function', () => {
    const mockFn = spy(double)

    const memoizedMock = memoize(mockFn);
    const result = memoizedMock(2);

    assertEquals(result, 4);
    assertSpyCalls(mockFn, 1);
  });

  it('when called with different parameters, it should call the function each time', () => {
    const mockFn = spy(double);
    const memoizedMock = memoize(mockFn);

    const result1 = memoizedMock(2);
    const result2 = memoizedMock(3);

    assertEquals(result1, 4);
    assertEquals(result2, 6);
    assertSpyCalls(mockFn, 2);
  });

  it('when called with the same parameters, it should not call the function again but return correctly', () => {
    const mockFn = spy(double);
    const memoizedMock = memoize(mockFn);

    const result1 = memoizedMock(2);
    const result2 = memoizedMock(2);

    assertEquals(result1, 4);
    assertEquals(result2, 4);
    assertSpyCalls(mockFn, 1);
  });
});
