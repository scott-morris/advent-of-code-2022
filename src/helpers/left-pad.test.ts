// Libraries

import { assertEquals } from "https://deno.land/std@0.156.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.156.0/testing/bdd.ts";

// Dependencies

import leftPad from './left-pad.ts';

// Test

describe('leftPad()', () => {
  describe('when no parameters are specified', () => {
    it('it should pad as a two digit number', () => {
      assertEquals(leftPad('1'),'01');
    });
  });

  describe('when parameters are specified', () => {
    it('it should pad with the given prefix character', () => {
      assertEquals(leftPad('1', { padWith: '.' }),'.1');
    });

    it('it should pad with the given width', () => {
      assertEquals(leftPad('1', { width: 3 }),'001');
    });

    it('it should pad with the given prefix character and width', () => {
      assertEquals(leftPad('1', { padWith: '.', width: 3 }),'..1');
    });
  });
});
