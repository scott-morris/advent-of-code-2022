// Libraries

import { assertEquals } from "https://deno.land/std@0.164.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.164.0/testing/bdd.ts";
import "./types.d.ts";
import "../types/global.d.ts";

// Dependencies

import parseInput from "./parse-input.ts";
import part1, { score as score1 } from "./part1.ts";
import part2, { score as score2 } from "./part2.ts";

// Tests

describe("Day 2", () => {
  const rawInput = `A Y
B X
C Z`;

  const input: Day02Input = [
    ["A", "Y"],
    ["B", "X"],
    ["C", "Z"],
  ];

  describe("parseInput", () => {
    it("when given the sample input, it should return an array of arrays containing Games", () => {
      const parsedInput = parseInput(rawInput);
      assertEquals(parsedInput, input);
    });
  });

  describe("Part 1", () => {
    describe("score()", () => {
      it("A,Y ends in a win for you with a score of 8 (2 because you chose Paper + 6 because you won)", () => {
        assertEquals(score1(["A", "Y"]), 8);
      });

      it("B,X ends in a loss for you with a score of 1 (1 + 0)", () => {
        assertEquals(score1(["B", "X"]), 1);
      });

      it("C,Z is a draw with both players choosing Scissors, giving you a score of 3 + 3 = 6", () => {
        assertEquals(score1(["C", "Z"]), 6);
      });
    });

    it("when given the sample input, the answer should be 15", () => {
      const result = part1(input);
      assertEquals(result, 15);
    });
  });

  describe("Part 2", () => {
    describe("score()", () => {
      it("In the first round, your opponent will choose Rock (A), and you need the round to end in a draw (Y), so you also choose Rock. This gives you a score of 1 + 3 = 4.", () => {
        assertEquals(score2(["A", "Y"]), 4);
      });

      it("In the second round, your opponent will choose Paper (B), and you choose Rock so you lose (X) with a score of 1 + 0 = 1.", () => {
        assertEquals(score2(["B", "X"]), 1);
      });

      it("In the third round, you will defeat your opponent's Scissors with Rock for a score of 1 + 6 = 7.", () => {
        assertEquals(score2(["C", "Z"]), 7);
      });
    });

    it("when given the sample input, the answer should be 12", () => {
      const result = part2(input);
      assertEquals(result, 12);
    });
  });
});
