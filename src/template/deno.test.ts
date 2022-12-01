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

describe("Day <%= it.day %>", () => {
  const rawInput = ``;

  const input: Day<%= it.dayString %>Input = [];

  describe("parseInput", () => {
    it("when given the sample input, it should return an array of arrays containing numbers", () => {
      const parsedInput = parseInput(rawInput);
      assertEquals(parsedInput, input);
    });
  });

  describe("Part 1", () => {
    it("when given the sample input, the answer should be 24000", () => {
      const result = part1(input);
      assertEquals(result, 24000);
    });
  });

  describe("Part 2", () => {
    it("when given the sample input, the answer should be 45000", () => {
      const result = part2(input);
      assertEquals(result, 45000);
    });
  });
});
