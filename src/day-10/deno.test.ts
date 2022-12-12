// Libraries

import { assertEquals } from "https://deno.land/std@0.164.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.164.0/testing/bdd.ts";
import { Day10Input } from "./types.d.ts";
import "../types/global.d.ts";

// Dependencies

import parseInput, { parseLine } from "./parse-input.ts";
import part1, { VideoSystem } from "./part1.ts";
import part2 from "./part2.ts";

// Tests

describe("Day 10", () => {
  const rawInput = `noop
addx 3
addx -5`;

  const input: Day10Input = [
    { command: "noop" },
    { command: "addx", value: 3 },
    { command: "addx", value: -5 },
  ];

  const rawInput2 = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

  const input2 = parseInput(rawInput2);

  describe("parse-input.ts", () => {
    describe("parseLine()", () => {
      it("when given an add command, it parses correctly", () => {
        assertEquals(parseLine("addx 15"), { command: "addx", value: 15 });
      });

      it("when given an add command with a negative number, it parses correctly", () => {
        assertEquals(parseLine("addx -11"), { command: "addx", value: -11 });
      });

      it("when given a noop command, it parses correctly", () => {
        assertEquals(parseLine("noop"), { command: "noop" });
      });
    });

    describe("parseInput()", () => {
      it("when given the sample input, it should return what we want to work with", () => {
        const parsedInput = parseInput(rawInput);
        assertEquals(parsedInput, input);
      });
    });
  });

  describe("part1.ts", () => {
    describe("VideoSystem class", () => {
      describe("First example", () => {
        const videoSystem = new VideoSystem(input);

        it("Cycle 1-5", () => {
          videoSystem.cycle();
          assertEquals(videoSystem.x, 1);
        });

        it("Cycle 2", () => {
          videoSystem.cycle();
          assertEquals(videoSystem.x, 1);
        });

        it("Cycle 3", () => {
          videoSystem.cycle();
          assertEquals(videoSystem.x, 4);
        });

        it("Cycle 4", () => {
          videoSystem.cycle();
          assertEquals(videoSystem.x, 4);
        });

        it("Cycle 5", () => {
          videoSystem.cycle();
          assertEquals(videoSystem.x, -1);
        });
      });

      describe("Second example", () => {
        const videoSystem = new VideoSystem(input2);

        it("after the 20th cycle", () => {
          videoSystem.waitCycles(20);
          assertEquals(videoSystem.x, 21);
          assertEquals(videoSystem.signalStrength, 420);
        });

        it("after the 60th cycle", () => {
          videoSystem.waitCycles(40);
          assertEquals(videoSystem.signalStrength, 1140);
        });

        it("after the 100th cycle", () => {
          videoSystem.waitCycles(40);
          assertEquals(videoSystem.signalStrength, 1800);
        });

        it("after the 140th cycle", () => {
          videoSystem.waitCycles(40);
          assertEquals(videoSystem.signalStrength, 2940);
        });

        it("after the 180th cycle", () => {
          videoSystem.waitCycles(40);
          assertEquals(videoSystem.signalStrength, 2880);
        });

        it("after the 220th cycle", () => {
          videoSystem.waitCycles(40);
          assertEquals(videoSystem.signalStrength, 3960);
        });
      });
    });

    describe("part1()", () => {
      it("when given the sample input, the answer should be 13140", () => {
        const result = part1(input2);
        assertEquals(result, 13140);
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
