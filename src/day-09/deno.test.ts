// Libraries

import { assertEquals } from "https://deno.land/std@0.164.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.164.0/testing/bdd.ts";
import { Day09Input } from "./types.d.ts";
import "../types/global.d.ts";

// Dependencies

import parseInput from "./parse-input.ts";
import part1 from "./part1.ts";
import part2, { runPart2 } from "./part2.ts";

// Tests

describe("Day 9", () => {
  const rawInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

  const input: Day09Input = "RRRRUUUULLLDRRRRDLLLLLRR";

  describe("parse-input.ts", () => {
    describe("parseInput()", () => {
      it("when given the sample input, it should return what we want to work with", () => {
        const parsedInput = parseInput(rawInput);
        assertEquals(parsedInput, input);
      });
    });
  });

  describe("Part 1", () => {
    describe("part1()", () => {
      it("when given the sample input, the answer should be 13", () => {
        const result = part1(input);
        assertEquals(result, 13);
      });
    });
  });

  describe("Part 2", () => {
    describe("runPart2()", () => {
      it("when given the first 3 lines, the tail should have moved", () => {
        const { positions, knots } = runPart2("RRRRRUUUUUUUULLLLLLLL");

        /*
........H1234.............
............5.............
............6.............
............7.............
............8.............
............9.............
..........................
..........................
...........s..............
*/

        assertEquals(
          knots.map((knot) => knot.toString()),
          [
            "1,3",
            "1,4",
            "1,5",
            "1,6",
            "1,7",
            "1,8",
            "0,8",
            "-1,8",
            "-2,8",
            "-3,8",
          ]
        );
      });

      it("when given the next line, the tail should not have moved", () => {
        const { knots } = runPart2("RRRRRUUUUUUUULLLLLLLLDDD");

        /*
.........2345.............
........1...6.............
........H...7.............
............8.............
............9.............
..........................
..........................
...........s..............
*/

        assertEquals(
          knots.map((knot) => knot.toString()),
          [
            "1,3", // 9
            "1,4", // 8
            "1,5", // 7
            "1,6", // 6
            "1,7", // 5
            "0,7", // 4
            "-1,7", // 3
            "-2,7", // 2
            "-3,6", // 1
            "-3,5", // H
          ]
        );
      });
    });

    describe("part2()", () => {
      it("when given the sample input, the answer should be 36", () => {
        const result = part2(
          "RRRRRUUUUUUUULLLLLLLLDDDRRRRRRRRRRRRRRRRRDDDDDDDDDDLLLLLLLLLLLLLLLLLLLLLLLLLUUUUUUUUUUUUUUUUUUUU"
        );
        assertEquals(result, 36);
      });
    });
  });
});
