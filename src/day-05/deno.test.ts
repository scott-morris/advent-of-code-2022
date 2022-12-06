// Libraries

import { assertEquals } from "https://deno.land/std@0.164.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.164.0/testing/bdd.ts";
import "./types.d.ts";
import "../types/global.d.ts";

// Dependencies

import parseInput from "./parse-input.ts";
import part1, { performInstruction } from "./part1.ts";
import part2 from "./part2.ts";

// Tests

describe("Day 5", () => {
  const rawInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

  const input: Day05Input = {
    stacks: ["NZ", "DCM", "P"],
    instructions: [
      { move: 1, from: 2, to: 1 },
      { move: 3, from: 1, to: 3 },
      { move: 2, from: 2, to: 1 },
      { move: 1, from: 1, to: 2 },
    ],
  };

  describe("parseInput", () => {
    it("when given the sample input, it should return an object with the state", () => {
      const parsedInput = parseInput(rawInput);
      assertEquals(parsedInput, input);
    });
  });

  describe("Part 1", () => {
    describe("performInstruction()", () => {
      it("given the first instruction", () => {
        const result = performInstruction(["NZ", "DCM", "P"], {
          move: 1,
          from: 2,
          to: 1,
        });
        assertEquals(result, ["DNZ", "CM", "P"]);
      });

      it("given the second instruction", () => {
        const result = performInstruction(["DNZ", "CM", "P"], {
          move: 3,
          from: 1,
          to: 3,
        });
        assertEquals(result, ["", "CM", "ZNDP"]);
      });

      it("given the third instruction", () => {
        const result = performInstruction(["", "CM", "ZNDP"], {
          move: 2,
          from: 2,
          to: 1,
        });
        assertEquals(result, ["MC", "", "ZNDP"]);
      });

      it("given the fourth instruction", () => {
        const result = performInstruction(["MC", "", "ZNDP"], {
          move: 1,
          from: 1,
          to: 2,
        });
        assertEquals(result, ["C", "M", "ZNDP"]);
      });
    });

    it("when given the sample input, the answer should be CMZ", () => {
      const result = part1(input);
      assertEquals(result, "CMZ");
    });
  });

  describe("Part 2", () => {
    it("when given the sample input, the answer should be 0", () => {
      const result = part2(input);
      assertEquals(result, "MCD");
    });
  });
});
