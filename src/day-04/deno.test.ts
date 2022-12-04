// Libraries

import { assertEquals } from "https://deno.land/std@0.164.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.164.0/testing/bdd.ts";
import "./types.d.ts";
import "../types/global.d.ts";

// Dependencies

import parseInput from "./parse-input.ts";
import part1, { contains, eitherContains } from "./part1.ts";
import part2, { eitherOverlaps } from "./part2.ts";

// Tests

describe("Day 4", () => {
  const rawInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

  const input: Day04Input = [
    [
      { l: 2, h: 4 },
      { l: 6, h: 8 },
    ],
    [
      { l: 2, h: 3 },
      { l: 4, h: 5 },
    ],
    [
      { l: 5, h: 7 },
      { l: 7, h: 9 },
    ],
    [
      { l: 2, h: 8 },
      { l: 3, h: 7 },
    ],
    [
      { l: 6, h: 6 },
      { l: 4, h: 6 },
    ],
    [
      { l: 2, h: 6 },
      { l: 4, h: 8 },
    ],
  ];

  describe("parseInput", () => {
    it("when given the sample input, it should return an array of arrays containing numbers", () => {
      const parsedInput = parseInput(rawInput);
      assertEquals(parsedInput, input);
    });
  });

  describe("Part 1", () => {
    describe("contains()", () => {
      it("`2-8` fully contains `3-7`", () => {
        assertEquals(contains({ l: 3, h: 7 }, { l: 2, h: 8 }), true);
      });

      it("`6-6` is fully contained by `4-6`", () => {
        assertEquals(contains({ l: 6, h: 6 }, { l: 4, h: 6 }), true);
      });
    });

    describe("eitherContains()", () => {
      it("`2-8` fully contains `3-7`", () => {
        assertEquals(eitherContains({ l: 3, h: 7 }, { l: 2, h: 8 }), true);
      });

      it("`6-6` is fully contained by `4-6`", () => {
        assertEquals(eitherContains({ l: 4, h: 6 }, { l: 6, h: 6 }), true);
      });
    });

    it("when given the sample input, the answer should be 2", () => {
      const result = part1(input);
      assertEquals(result, 2);
    });
  });

  describe("Part 2", () => {
    describe("eitherOverlaps()", () => {
      it("the first two pairs do not overlap", () => {
        const pair1 = input[0];
        const pair2 = input[1];
        assertEquals(eitherOverlaps(pair1[0], pair1[1]), false);
        assertEquals(eitherOverlaps(pair2[0], pair2[1]), false);
      });

      it("5-7,7-9 overlaps in a single section, 7.", () => {
        const pair3 = input[2];
        assertEquals(eitherOverlaps(pair3[0], pair3[1]), true);
      });

      it("2-8,3-7 overlaps all of the sections 3 through 7", () => {
        const pair4 = input[3];
        assertEquals(eitherOverlaps(pair4[0], pair4[1]), true);
      });

      it("6-6,4-6 overlaps in a single section, 6", () => {
        const pair5 = input[4];
        assertEquals(eitherOverlaps(pair5[0], pair5[1]), true);
      });

      it("2-6,4-8 overlaps in sections 4, 5, and 6", () => {
        const pair6 = input[5];
        assertEquals(eitherOverlaps(pair6[0], pair6[1]), true);
      });
    });

    it("when given the sample input, the answer should be 4", () => {
      const result = part2(input);
      assertEquals(result, 4);
    });
  });
});
