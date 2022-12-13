// Libraries

import { assertEquals } from "https://deno.land/std@0.164.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.164.0/testing/bdd.ts";
import { Day11Input } from "./types.d.ts";
import "../types/global.d.ts";

// Dependencies

import parseInput from "./parse-input.ts";
import part1 from "./part1.ts";
import part2 from "./part2.ts";

// Tests

describe("Day 11", () => {
  const rawInput = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

  const input: Day11Input = [
    {
      index: 0,
      items: [79, 98],
      operation: { operand1: "old", action: "*", operand2: 19 },
      testDivide: 23,
      throwTo: {
        onTrue: 2,
        onFalse: 3,
      },
    },
  ];

  describe("parse-input.ts", () => {
    describe.ignore("parseInput()", () => {
      it("when given the sample input, it should return what we want to work with", () => {
        const parsedInput = parseInput(rawInput);
        assertEquals(parsedInput, input);
      });
    });
  });

  describe("part1.ts", () => {
    describe.ignore("part1()", () => {
      it("when given the sample input, the answer should be 0", () => {
        const result = part1(input);
        assertEquals(result, 0);
      });
    });
  });

  describe("part2.ts", () => {
    describe.ignore("part2()", () => {
      it("when given the sample input, the answer should be 0", () => {
        const result = part2(input);
        assertEquals(result, 0);
      });
    });
  });
});
