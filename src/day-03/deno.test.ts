// Libraries

import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.164.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.164.0/testing/bdd.ts";
import "./types.d.ts";
import "../types/global.d.ts";

// Dependencies

import parseInput from "./parse-input.ts";
import part1, { findMatch, letterScore } from "./part1.ts";
import part2, { modifyInput, findMatchFor3 } from "./part2.ts";

// Tests

describe("Day 3", () => {
  const rawInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

  const input: Day03Input = [
    ["vJrwpWtwJgWr", "hcsFMMfFFhFp"],
    ["jqHRNqRjqzjGDLGL", "rsFMfFZSrLrFZsSL"],
    ["PmmdzqPrV", "vPwwTWBwg"],
    ["wMqvLMZHhHMvwLH", "jbvcjnnSBnvTQFn"],
    ["ttgJtRGJ", "QctTZtZT"],
    ["CrZsJsPPZsGz", "wwsLwLmpwMDw"],
  ];

  const input_part2: Day03Input = [
    [
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
    ],
    [
      "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
      "ttgJtRGJQctTZtZT",
      "CrZsJsPPZsGzwwsLwLmpwMDw",
    ],
  ];

  describe("parseInput", () => {
    it("when given the sample input, it should return an array of arrays containing numbers", () => {
      const parsedInput = parseInput(rawInput);
      assertEquals(parsedInput, input);
    });
  });

  describe("Part 1", () => {
    describe("findMatch()", () => {
      const expectedResults = ["p", "L", "P", "v", "t", "s"];
      input.forEach((row, i) => {
        it(`when given the inputs "${row[0]}" and "${row[1]}", it finds "${expectedResults[i]}"`, () => {
          assertEquals(findMatch(row[0], row[1]), expectedResults[i]);
        });
      });
    });

    describe("letterScore()", () => {
      const testCases = [
        { input: "p", expected: 16 },
        { input: "L", expected: 38 },
        { input: "P", expected: 42 },
        { input: "v", expected: 22 },
        { input: "t", expected: 20 },
        { input: "s", expected: 19 },
      ];

      testCases.forEach((test) => {
        it(`when given "${test.input}", it returns ${test.expected}`, () => {
          assertEquals(letterScore(test.input), test.expected);
        });
      });
    });

    it("when given the sample input, the answer should be 157", () => {
      const result = part1(input);
      assertEquals(result, 157);
    });
  });

  describe("Part 2", () => {
    describe("modifyInput()", () => {
      it("given the test input, modify it properly", () => {
        assertEquals(modifyInput(input), input_part2);
      });
    });

    describe("findMatchFor3()", () => {
      const [first, second] = input_part2;

      it(`given the test input, the first output should be "r"`, () => {
        assertEquals(findMatchFor3(first[0], first[1], first[2]), "r");
      });

      it(`given the test input, the second output should be "Z"`, () => {
        assertEquals(findMatchFor3(second[0], second[1], second[2]), "Z");
      });
    });

    it("when given the sample input, the answer should be 70", () => {
      const result = part2(input);
      assertEquals(result, 70);
    });
  });
});
