// Libraries

import { assertEquals } from "https://deno.land/std@0.164.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.164.0/testing/bdd.ts";
import "./types.d.ts";
import "../types/global.d.ts";

// Dependencies

import { get } from "../helpers/simple-object.ts";
import parseInput from "./parse-input.ts";
import part1, { getAllFolderSizes, getFolderSize } from "./part1.ts";
import part2 from "./part2.ts";

// Tests

describe("Day 7", () => {
  const rawInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

  const input: Day07Input = {
    "/": {
      a: {
        e: {
          i: 584,
        },
        f: 29116,
        g: 2557,
        "h.lst": 62596,
      },
      "b.txt": 14848514,
      "c.dat": 8504156,
      d: {
        j: 4060174,
        "d.log": 8033020,
        "d.ext": 5626152,
        k: 7214296,
      },
    },
  };

  describe("parseInput", () => {
    it("when given the sample input, it should return an array of arrays containing numbers", () => {
      const parsedInput = parseInput(rawInput);
      assertEquals(parsedInput, input);
    });
  });

  describe("Part 1", () => {
    describe("getFolderSize()", () => {
      it("The total size of directory e is 584 because it contains a single file i of size 584 and no other directories.", () => {
        const folder = get(input, ["/", "a", "e"], {});
        const result = getFolderSize(folder);
        assertEquals(result, 584);
      });

      it("The directory a has total size 94853 because it contains files f (size 29116), g (size 2557), and h.lst (size 62596), plus file i indirectly (a contains e which contains i).", () => {
        const folder = get(input, ["/", "a"], {});
        const result = getFolderSize(folder);
        assertEquals(result, 94853);
      });

      it("Directory d has total size 24933642.", () => {
        const folder = get(input, ["/", "d"], {});
        const result = getFolderSize(folder);
        assertEquals(result, 24933642);
      });

      it("As the outermost directory, / contains every file. Its total size is 48381165, the sum of the size of every file.", () => {
        const folder = get(input, ["/"], {});
        const result = getFolderSize(folder);
        assertEquals(result, 48381165);
      });
    });

    describe("getAllFolderSizes()", () => {
      it("It should capture the folder sizes as expected", () => {
        const expected = new Map([
          ["/", 48381165],
          ["/a", 94853],
          ["/a/e", 584],
          ["/d", 24933642],
        ]);
        assertEquals(getAllFolderSizes(input), expected);
      });
    });

    describe("part1()", () => {
      it("when given the sample input, the answer should be 95437", () => {
        const result = part1(input);
        assertEquals(result, 95437);
      });
    });
  });

  describe("Part 2", () => {
    describe("part2()", () => {
      it("when given the sample input, the answer should be 24933642", () => {
        const result = part2(input);
        assertEquals(result, 24933642);
      });
    });
  });
});
