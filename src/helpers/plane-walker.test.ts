// Libraries

import { assertEquals } from "https://deno.land/std@0.164.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.164.0/testing/bdd.ts";
import {
  spy,
  assertSpyCalls,
} from "https://deno.land/std@0.164.0/testing/mock.ts";

// Dependencies

import PlaneWalker from "./plane-walker.ts";

// Tests

describe("plane-walker.ts", () => {
  describe("constructor function", () => {
    describe("simple implementation", () => {
      const walker = new PlaneWalker();

      it("initially", () => {
        assertEquals(walker.toString(), "0,0");
      });

      it("after moving up", () => {
        walker.up();
        assertEquals(walker.toString(), "0,1");
      });

      it("after moving right", () => {
        walker.right();
        assertEquals(walker.toString(), "1,1");
      });

      it("after moving down", () => {
        walker.down();
        assertEquals(walker.toString(), "1,0");
      });

      it("after moving left", () => {
        walker.left();
        assertEquals(walker.toString(), "0,0");
      });
    });

    describe("with process function", () => {
      const fn = spy();
      const walker = new PlaneWalker({ onMove: fn });

      it("after performing the same four moves", () => {
        walker.up();
        walker.right();
        walker.down();
        walker.left();

        assertSpyCalls(fn, 4);
      });
    });

    describe("coords", () => {
      const walker = new PlaneWalker();

      it("should return a valid coords object", () => {
        assertEquals(walker.coords, { x: 0, y: 0 });

        walker.up();
        assertEquals(walker.coords, { x: 0, y: 1 });
      });
    });

    describe("distanceTo()", () => {
      const walker = new PlaneWalker();

      it("should return a valid coords object", () => {
        assertEquals(walker.distanceTo({ x: 5, y: 5 }), { x: 5, y: 5 });

        walker.up();
        walker.left();
        assertEquals(walker.distanceTo({ x: 5, y: 5 }), { x: 6, y: 4 });
      });
    });
  });
});
