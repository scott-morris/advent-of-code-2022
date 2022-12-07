// Libraries

import { assertEquals } from "https://deno.land/std@0.164.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.164.0/testing/bdd.ts";
import "./types.d.ts";
import "../types/global.d.ts";

// Dependencies

import part1, { hasUniqueCharacters } from "./part1.ts";
import part2 from "./part2.ts";

// Tests

describe("Day 6", () => {
  const input: Day06Input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

  describe("Part 1", () => {
    describe("hasUniqueCharacters()", () => {
      it(`when given "mjqj", it should return false`, () => {
        assertEquals(hasUniqueCharacters("mjqj"), false);
      });

      it(`when given "jqjp", it should return false`, () => {
        assertEquals(hasUniqueCharacters("jqjp"), false);
      });

      it(`when given "jpqm", it should return true`, () => {
        assertEquals(hasUniqueCharacters("jpqm"), true);
      });
    });

    describe("part1()", () => {
      it(`when given "mjqjpqmgbljsphdztnvjfqwrcgsmlb", the answer should be 7`, () => {
        const result = part1("mjqjpqmgbljsphdztnvjfqwrcgsmlb");
        assertEquals(result, 7);
      });

      it(`when given "bvwbjplbgvbhsrlpgdmjqwftvncz", the answer should be 5`, () => {
        const result = part1("bvwbjplbgvbhsrlpgdmjqwftvncz");
        assertEquals(result, 5);
      });

      it(`when given "nppdvjthqldpwncqszvftbrmjlhg", the answer should be 6`, () => {
        const result = part1("nppdvjthqldpwncqszvftbrmjlhg");
        assertEquals(result, 6);
      });

      it(`when given "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", the answer should be 10`, () => {
        const result = part1("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg");
        assertEquals(result, 10);
      });

      it(`when given "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", the answer should be 11`, () => {
        const result = part1("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw");
        assertEquals(result, 11);
      });
    });
  });

  describe("Part 2", () => {
    describe("part2()", () => {
      it(`when given "mjqjpqmgbljsphdztnvjfqwrcgsmlb", the answer should be 19`, () => {
        assertEquals(part2("mjqjpqmgbljsphdztnvjfqwrcgsmlb"), 19);
      });

      it(`when given "bvwbjplbgvbhsrlpgdmjqwftvncz", the answer should be 23`, () => {
        assertEquals(part2("bvwbjplbgvbhsrlpgdmjqwftvncz"), 23);
      });

      it(`when given "nppdvjthqldpwncqszvftbrmjlhg", the answer should be 23`, () => {
        assertEquals(part2("nppdvjthqldpwncqszvftbrmjlhg"), 23);
      });

      it(`when given "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", the answer should be 29`, () => {
        assertEquals(part2("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"), 29);
      });

      it(`when given "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", the answer should be 26`, () => {
        assertEquals(part2("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 26);
      });
    });
  });
});
