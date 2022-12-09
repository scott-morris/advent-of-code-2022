// Libraries

import { assertEquals } from "https://deno.land/std@0.164.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.164.0/testing/bdd.ts";
import "./types.d.ts";
import "../types/global.d.ts";

// Dependencies

import parseInput from "./parse-input.ts";
import part1 from "./part1.ts";
import part2 from "./part2.ts";

// Tests

describe("Day 8", () => {
  const rawInput = `30373
25512
65332
33549
35390`;

  const input: Day08Input = [];

  describe("parseInput", () => {
    it("when given the sample input, it should return an array of arrays containing numbers", () => {
      const parsedInput = parseInput(rawInput);
      assertEquals(parsedInput, input);
    });
  });

  describe("Part 1", () => {
    describe.ignore("part1()", () => {
      it("when given the sample input, the answer should be 0", () => {
        const result = part1(input);
        assertEquals(result, 0);
      });
    });
  });

  describe("Part 2", () => {
    describe.ignore("part2()", () => {
      it("when given the sample input, the answer should be 0", () => {
        const result = part2(input);
        assertEquals(result, 0);
      });
    });
  });
});
