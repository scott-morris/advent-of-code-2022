// Libraries

import { assertEquals } from "https://deno.land/std@0.164.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.164.0/testing/bdd.ts";
import "../types/global.d.ts";

// Dependencies

import parseInput from "./parse-input.ts";
import part1, { isVisibleThisWay, isVisibleThisAxis } from "./part1.ts";
import part2, {
  getDirectionScore,
  getAxisScore,
  getScenicScore,
} from "./part2.ts";
import Matrix from "../helpers/matrix.ts";
import { Day08Input } from "./types.d.ts";

// Tests

describe("Day 8", () => {
  const rawInput = `30373
25512
65332
33549
35390`;

  const input: Day08Input = new Matrix([
    [3, 0, 3, 7, 3],
    [2, 5, 5, 1, 2],
    [6, 5, 3, 3, 2],
    [3, 3, 5, 4, 9],
    [3, 5, 3, 9, 0],
  ]);

  describe("parseInput", () => {
    it("when given the sample input, it should return an array of arrays containing numbers", () => {
      const parsedInput = parseInput(rawInput);
      assertEquals(parsedInput, input);
    });
  });

  describe("Part 1", () => {
    describe("isVisibleThisWay()", () => {
      it("when given an edge, it should answer true", () => {
        assertEquals(isVisibleThisWay(3, []), true);
      });

      it("when given a visible inner tree, it should answer true", () => {
        assertEquals(isVisibleThisWay(5, [1, 2]), true);
      });

      it("when given a non-visible inner tree, it should answer false", () => {
        assertEquals(isVisibleThisWay(5, [4, 9]), false); // higher values
        assertEquals(isVisibleThisWay(5, [2, 5]), false); // equal values
      });
    });

    describe("isVisibleThisAxis()", () => {
      it("when given an edge, it should answer true", () => {
        assertEquals(isVisibleThisAxis(0, [2, 5, 5, 1, 2]), true);
        assertEquals(isVisibleThisAxis(4, [2, 5, 5, 1, 2]), true);
      });

      it("when given a visible inner tree, it should answer true", () => {
        assertEquals(isVisibleThisAxis(1, [2, 5, 5, 1, 2]), true);
      });

      it("when given a non-visible inner tree due to higher values, it should answer false", () => {
        assertEquals(isVisibleThisAxis(3, [0, 5, 5, 3, 5]), false); // higher values
      });

      it("when given a non-visible inner tree due to equal values, it should answer false", () => {
        assertEquals(isVisibleThisAxis(2, [0, 5, 5, 3, 5]), false);
      });
    });

    describe("part1()", () => {
      it("when given the sample input, the answer should be 21", () => {
        const result = part1(input);
        assertEquals(result, 21);
      });
    });
  });

  describe("Part 2", () => {
    describe("getDirectionScore()", () => {
      it("test the specifics listed in the first example", () => {
        assertEquals(getDirectionScore(5, [3]), 1);
        assertEquals(getDirectionScore(5, [5, 2]), 1);
        assertEquals(getDirectionScore(5, [1, 2]), 2);
        assertEquals(getDirectionScore(5, [3, 5, 3]), 2);
      });
    });

    describe("getAxisScore()", () => {
      it("test the specifics listed in the first example", () => {
        assertEquals(getAxisScore(2, [2, 5, 5, 1, 2]), 2);
        assertEquals(getAxisScore(1, [3, 5, 3, 5, 3]), 2);
      });

      it("test the specifics listed in the second example", () => {
        assertEquals(getAxisScore(2, [3, 3, 5, 4, 9]), 4);
        assertEquals(getAxisScore(3, [3, 5, 3, 5, 3]), 2);
      });
    });

    describe("getScenicScore()", () => {
      it("test the specifics listed in the first example", () => {
        assertEquals(getScenicScore(input, { x: 2, y: 1 }), 4);
      });

      it("test the specifics listed in the second example", () => {
        assertEquals(getScenicScore(input, { x: 2, y: 3 }), 8);
      });
    });

    describe("part2()", () => {
      it("when given the sample input, the answer should be 8", () => {
        const result = part2(input);
        assertEquals(result, 8);
      });
    });
  });
});
