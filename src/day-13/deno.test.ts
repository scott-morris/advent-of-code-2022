// Libraries

import { assertEquals } from "https://deno.land/std@0.164.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.164.0/testing/bdd.ts";
import { Day13Input, Pair } from "./types.d.ts";
import "../types/global.d.ts";

// Dependencies

import parseInput, { parseInput2 } from "./parse-input.ts";
import part1, { comparePairs, Comparison } from "./part1.ts";
import part2, { findPacket, sortArray } from "./part2.ts";

// Tests

describe("Day 13", () => {
  const rawInput = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

  const input: Day13Input = [
    [
      [1, 1, 3, 1, 1],
      [1, 1, 5, 1, 1],
    ],
    [
      [[1], [2, 3, 4]],
      [[1], 4],
    ],
    [[9], [[8, 7, 6]]],
    [
      [[4, 4], 4, 4],
      [[4, 4], 4, 4, 4],
    ],
    [
      [7, 7, 7, 7],
      [7, 7, 7],
    ],
    [[], [3]],
    [[[[]]], [[]]],
    [
      [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
      [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
    ],
  ];

  const input2: Day13Input = [
    [1, 1, 3, 1, 1],
    [1, 1, 5, 1, 1],
    [[1], [2, 3, 4]],
    [[1], 4],
    [9],
    [[8, 7, 6]],
    [[4, 4], 4, 4],
    [[4, 4], 4, 4, 4],
    [7, 7, 7, 7],
    [7, 7, 7],
    [],
    [3],
    [[[]]],
    [[]],
    [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
    [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
  ];

  describe("parse-input.ts", () => {
    describe("parseInput()", () => {
      it("when given the sample input, it should return what we want to work with", () => {
        const result = parseInput(rawInput);
        assertEquals(result, input);
      });
    });

    describe("parseInput2()", () => {
      it("when given the sample input, it should return what we want to work with", () => {
        const result = parseInput2(rawInput);
        assertEquals(result, input2);
      });
    });
  });

  describe("part1.ts", () => {
    describe("compare()", () => {
      it("Compare [1,1,3,1,1] vs [1,1,5,1,1] are in the right order", () => {
        assertEquals(
          comparePairs([1, 1, 3, 1, 1], [1, 1, 5, 1, 1]),
          Comparison.LESS
        );
      });

      describe("the rules", () => {
        describe("If both values are integers, the lower integer should come first.", () => {
          it("positive test", () => {
            assertEquals(comparePairs(1, 2), Comparison.LESS);
          });

          it("equal test", () => {
            assertEquals(comparePairs(1, 1), Comparison.EQUAL);
          });

          it("negative test", () => {
            assertEquals(comparePairs(2, 1), Comparison.MORE);
          });
        });

        describe("If both values are lists, compare the first value of each list, then the second value, and so on.", () => {
          it("positive test [1] vs [2]", () => {
            assertEquals(comparePairs([1], [2]), Comparison.LESS);
            assertEquals(
              comparePairs([1, 1, 2, 3], [2, 1, 2, 4]),
              Comparison.LESS
            );
          });

          it("positive test [1,1] vs [2,2]", () => {
            assertEquals(comparePairs([1, 1], [2, 2]), Comparison.LESS);
          });

          it("positive test [1,1,2,3] vs [1,1,2,4]", () => {
            assertEquals(
              comparePairs([1, 1, 2, 3], [1, 1, 2, 4]),
              Comparison.LESS
            );
          });

          it("negative test [2] vs [1]", () => {
            assertEquals(comparePairs([2], [1]), Comparison.MORE);
          });

          it("negative test [1,1,2,4] vs [1,1,2,3]", () => {
            assertEquals(
              comparePairs([1, 1, 2, 4], [1, 1, 2, 3]),
              Comparison.MORE
            );
          });
        });

        describe("If the left list runs out of items first, the inputs are in the right order.", () => {
          it("positive test [] vs [[1]]", () => {
            assertEquals(comparePairs([], [[1]]), Comparison.LESS);
          });

          it("positive test [[1,1],1,1] vs [[1,1],1,1,1]", () => {
            assertEquals(
              comparePairs([[1, 1], 1, 1], [[1, 1], 1, 1, 1]),
              Comparison.LESS
            );
          });

          it("positive test [1,1,1] vs [1,1,1,1]", () => {
            assertEquals(
              comparePairs([1, 1, 1], [1, 1, 1, 1]),
              Comparison.LESS
            );
          });

          it("positive test [2,3,4] vs 4", () => {
            assertEquals(comparePairs([2, 3, 4], 4), Comparison.LESS);
          });

          it("positive test [2,3,4] vs [4]", () => {
            assertEquals(comparePairs([2, 3, 4], [4]), Comparison.LESS);
          });

          it("negative test [[1]] vs []", () => {
            assertEquals(comparePairs([[1]], []), Comparison.MORE);
          });

          it("negative test [1,1,1,1] vs [1,1,1]", () => {
            assertEquals(
              comparePairs([1, 1, 1, 1], [1, 1, 1]),
              Comparison.MORE
            );
          });
        });

        describe("If exactly one value is an integer, convert the integer to a list.", () => {
          it("positive test", () => {
            assertEquals(comparePairs(1, [2]), Comparison.LESS);
          });

          it("equality test", () => {
            assertEquals(comparePairs(1, [1]), Comparison.EQUAL);
          });

          it("negative test", () => {
            assertEquals(comparePairs([2], 1), Comparison.MORE);
          });
        });

        describe("If exactly one value is an integer, convert the integer to a list, comparing to a nested array.", () => {
          it("positive test", () => {
            assertEquals(comparePairs([[1]], 2), Comparison.LESS);
          });
          it("equality test", () => {
            assertEquals(comparePairs([[1]], 1), Comparison.EQUAL);
          });
          it("negative test", () => {
            assertEquals(comparePairs(2, [[1]]), Comparison.MORE);
          });
        });
      });

      describe("the given examples", () => {
        it("Compare [[1],[2,3,4]] vs [[1],4] are in the right order", () => {
          assertEquals(
            comparePairs([[1], [2, 3, 4]], [[1], 4]),
            Comparison.LESS
          );
        });

        it("Compare [9] vs [[8,7,6]] are NOT in the right order", () => {
          assertEquals(comparePairs([9], [[8, 7, 6]]), Comparison.MORE);
        });

        it("Compare [[4,4],4,4] vs [[4,4],4,4,4] are in the right order", () => {
          assertEquals(
            comparePairs([[4, 4], 4, 4], [[4, 4], 4, 4, 4]),
            Comparison.LESS
          );
        });

        it("Compare [7,7,7,7] vs [7,7,7] are NOT in the right order", () => {
          assertEquals(comparePairs([7, 7, 7, 7], [7, 7, 7]), Comparison.MORE);
        });

        it("Compare [] vs [3] are in the right order", () => {
          assertEquals(comparePairs([], [3]), Comparison.LESS);
        });

        it("Compare [[[]]] vs [[]] are NOT in the right order", () => {
          assertEquals(comparePairs([[[]]], [[]]), Comparison.MORE);
        });

        it("Compare [1,[2,[3,[4,[5,6,7]]]],8,9] vs [1,[2,[3,[4,[5,6,0]]]],8,9] are NOT in the right order", () => {
          assertEquals(
            comparePairs(
              [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
              [1, [2, [3, [4, [5, 6, 0]]]], 8, 9]
            ),
            Comparison.MORE
          );
        });
      });
    });

    describe("part1()", () => {
      it("when given the sample input, the answer should be 13", () => {
        const result = part1(input);
        assertEquals(result, 13);
      });
    });
  });

  describe("part2.ts", () => {
    describe("sortArray()", () => {
      const sortedExample: Pair[] = [
        [],
        [[]],
        [[[]]],
        [1, 1, 3, 1, 1],
        [1, 1, 5, 1, 1],
        [[1], [2, 3, 4]],
        [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
        [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
        [[1], 4],
        [3],
        [[4, 4], 4, 4],
        [[4, 4], 4, 4, 4],
        [7, 7, 7],
        [7, 7, 7, 7],
        [[8, 7, 6]],
        [9],
      ];

      it("it should properly sort the array based on the example", () => {
        const sorted = sortArray(input2);
        assertEquals(sorted, sortedExample);
      });
    });

    describe("findPacket()", () => {
      const givenExample: Pair[] = [
        [],
        [[]],
        [[[]]],
        [1, 1, 3, 1, 1],
        [1, 1, 5, 1, 1],
        [[1], [2, 3, 4]],
        [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
        [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
        [[1], 4],
        [[2]],
        [3],
        [[4, 4], 4, 4],
        [[4, 4], 4, 4, 4],
        [[6]],
        [7, 7, 7],
        [7, 7, 7, 7],
        [[8, 7, 6]],
        [9],
      ];

      it("it should find the first packet at index 10", () => {
        assertEquals(findPacket(givenExample, [[2]]), 10);
      });

      it("it should find the second packet at index 14", () => {
        assertEquals(findPacket(givenExample, [[6]]), 14);
      });
    });

    describe("part2()", () => {
      it("when given the sample input, the answer should be 140", () => {
        const result = part2(input2);
        assertEquals(result, 140);
      });
    });
  });
});
