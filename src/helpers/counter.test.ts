// Libraries

import { assertEquals } from "https://deno.land/std@0.156.0/testing/asserts.ts";
import { describe, beforeEach, it } from "https://deno.land/std@0.156.0/testing/bdd.ts";

// Dependencies

import { Counter } from './counter.ts'

// Test

describe('Class: Counter', () => {
  describe('when given an existing Counter', () => {
    let counter: Counter;

    beforeEach(() => {
      counter = new Counter([
        ['a', 10],
        ['b', 100],
        ['c', 1000],
      ]);
    });

    it('increment() should increment just the given key', () => {
      counter.increment('b', 10);
      assertEquals(counter.get('a'), 10);
      assertEquals(counter.get('b'), 110);
      assertEquals(counter.get('c'), 1000);
    });

    it('decrement() should decrement just the given key', () => {
      counter.decrement('b', 10);
      assertEquals(counter.get('a'), 10);
      assertEquals(counter.get('b'), 90);
      assertEquals(counter.get('c'), 1000);
    });
  });
});
