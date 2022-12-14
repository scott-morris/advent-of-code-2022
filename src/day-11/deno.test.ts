// Libraries

import { assertEquals } from "https://deno.land/std@0.164.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.164.0/testing/bdd.ts";
import { Day11Input, MonkeyDef } from "./types.d.ts";
import { copy } from "../helpers/simple-object.ts";
import runTimes from "../helpers/run-multiple-times.ts";
import "../types/global.d.ts";

// Dependencies

import parseInput from "./parse-input.ts";
import part1, { playRound, PlayingMonkey } from "./part1.ts";
import part2, { WorryingMonkey } from "./part2.ts";
import { Monkey } from "./monkey.ts";

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
      items: [79n, 98n],
      operation: { operand1: "old", action: "*", operand2: 19n },
      testDivide: 23n,
      throwTo: {
        onTrue: 2,
        onFalse: 3,
      },
    },
    {
      index: 1,
      items: [54n, 65n, 75n, 74n],
      operation: { operand1: "old", action: "+", operand2: 6n },
      testDivide: 19n,
      throwTo: {
        onTrue: 2,
        onFalse: 0,
      },
    },
    {
      index: 2,
      items: [79n, 60n, 97n],
      operation: { operand1: "old", action: "*", operand2: "old" },
      testDivide: 13n,
      throwTo: {
        onTrue: 1,
        onFalse: 3,
      },
    },
    {
      index: 3,
      items: [74n],
      operation: { operand1: "old", action: "+", operand2: 3n },
      testDivide: 17n,
      throwTo: {
        onTrue: 0,
        onFalse: 1,
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

  describe.ignore("monkey.ts", () => {
    const monkey = new Monkey(input[0]);

    it("getWorryLevel()", () => {
      assertEquals(monkey.getWorryLevel(79n), 500n);
      assertEquals(monkey.getWorryLevel(98n), 620n);
    });

    it("chooseThrowTarget()", () => {
      assertEquals(monkey.chooseThrowTarget(500n), 3);
      assertEquals(monkey.chooseThrowTarget(620n), 3);
    });
  });

  describe.ignore("part1.ts", () => {
    describe("playRound()", () => {
      describe("after one round", () => {
        const troop = copy(input).map((monkey) => new PlayingMonkey(monkey));
        playRound(troop);

        it("check monkey #0", () => {
          assertEquals(troop[0].items, [20n, 23n, 27n, 26n]);
        });

        it("check monkey #1", () => {
          assertEquals(troop[1].items, [2080n, 25n, 167n, 207n, 401n, 1046n]);
        });

        it("check monkey #2", () => {
          assertEquals(troop[2].items, []);
        });

        it("check monkey #3", () => {
          assertEquals(troop[3].items, []);
        });
      });

      describe("after another round", () => {
        const troop = copy(input).map((monkey) => new PlayingMonkey(monkey));
        runTimes(2, () => playRound(troop));

        it("check monkey #0", () => {
          assertEquals(troop[0].items, [695n, 10n, 71n, 135n, 350n]);
        });

        it("check monkey #1", () => {
          assertEquals(troop[1].items, [43n, 49n, 58n, 55n, 362n]);
        });

        it("check monkey #2", () => {
          assertEquals(troop[2].items, []);
        });

        it("check monkey #3", () => {
          assertEquals(troop[3].items, []);
        });
      });

      describe("after twenty rounds", () => {
        const troop = copy(input).map((monkey) => new PlayingMonkey(monkey));
        runTimes(20, () => playRound(troop));

        it("check monkey items #0", () => {
          assertEquals(troop[0].items, [10n, 12n, 14n, 26n, 34n]);
        });

        it("check monkey items #1", () => {
          assertEquals(troop[1].items, [245n, 93n, 53n, 199n, 115n]);
        });

        it("check monkey items #2", () => {
          assertEquals(troop[2].items, []);
        });

        it("check monkey items #3", () => {
          assertEquals(troop[3].items, []);
        });

        it("check monkey inspections #0", () => {
          assertEquals(troop[0].numInspections, 101);
        });

        it("check monkey inspections #1", () => {
          assertEquals(troop[1].numInspections, 95);
        });

        it("check monkey inspections #2", () => {
          assertEquals(troop[2].numInspections, 7);
        });

        it("check monkey inspections #3", () => {
          assertEquals(troop[3].numInspections, 105);
        });
      });
    });

    describe("part1()", () => {
      it("when given the sample input, the answer should be 10605", () => {
        const result = part1(input);
        assertEquals(result, 10605n);
      });
    });
  });

  describe.ignore("part2.ts", () => {
    //   describe("class WorryingMonkey vs PlayingMonkey", () => {
    //     const spec: MonkeyDef = {
    //       index: 1,
    //       items: <bigint[]>[],
    //       operation: { operand1: "old", action: "+", operand2: "old" },
    //       testDivide: 19n,
    //       throwTo: {
    //         onTrue: 1,
    //         onFalse: 0,
    //       },
    //     };
    //     const playing = new PlayingMonkey(spec);
    //     const worrying = new WorryingMonkey(spec);
    //     it("the PlayingMonkey should not match", () => {
    //       assertEquals(playing.getWorryLevel(19n), 12n);
    //     });
    //     it("the WorryingMonkey should match", () => {
    //       assertEquals(worrying.getWorryLevel(19n), 38n);
    //     });
    //     it("the PlayingMonkey should not match", () => {
    //       assertEquals(playing.chooseThrowTarget(19n), 0);
    //     });
    //     it("the WorryingMonkey should match", () => {
    //       assertEquals(worrying.chooseThrowTarget(19n), 1);
    //     });
    //   });
    //   describe("playRound()", () => {
    //     const troop = copy(input).map((monkey) => new WorryingMonkey(monkey));
    //     describe("after one round", () => {
    //       playRound(troop);
    //       it("check monkey inventory", () => {
    //         const results = troop.map((monkey) => monkey.items);
    //         assertEquals(results, [
    //           [60n, 71n, 81n, 80n],
    //           [77n, 1504n, 1865n, 6244n, 3603n, 9412n],
    //           [],
    //           [],
    //         ]);
    //       });
    //       it("check monkey inspections", () => {
    //         const results = troop.map((monkey) => monkey.numInspections);
    //         assertEquals(results, [2, 4, 3, 6]);
    //       });
    //     });
    //     describe("after 20 rounds", () => {
    //       // const troop = copy(input).map((monkey) => new WorryingMonkey(monkey));
    //       runTimes(19, () => playRound(troop));
    //       const results = troop.map((monkey) => monkey.numInspections);
    //       it("check monkey inspections", () => {
    //         assertEquals(results, [99, 97, 8, 103]);
    //       });
    //     });
    //     describe.ignore("after 1000 rounds", () => {
    //       const troop = copy(input).map((monkey) => new WorryingMonkey(monkey));
    //       runTimes(980, () => playRound(troop));
    //       const results = troop.map((monkey) => monkey.numInspections);
    //       it("check monkey inspections", () => {
    //         assertEquals(results, [5204, 4792, 199, 5192]);
    //       });
    //     });
    //     describe.ignore("after 2000 rounds", () => {
    //       const troop = copy(input).map((monkey) => new WorryingMonkey(monkey));
    //       runTimes(1000, () => playRound(troop));
    //       const results = troop.map((monkey) => monkey.numInspections);
    //       it("check monkey inspections", () => {
    //         assertEquals(results, [10419, 9577, 392, 10391]);
    //       });
    //     });
    //     describe.ignore("after 3000 rounds", () => {
    //       const troop = copy(input).map((monkey) => new WorryingMonkey(monkey));
    //       runTimes(1000, () => playRound(troop));
    //       const results = troop.map((monkey) => monkey.numInspections);
    //       it("check monkey inspections", () => {
    //         assertEquals(results, [15638, 14358, 587, 15593]);
    //       });
    //     });
    //     describe.ignore("after 4000 rounds", () => {
    //       const troop = copy(input).map((monkey) => new WorryingMonkey(monkey));
    //       runTimes(1000, () => playRound(troop));
    //       const results = troop.map((monkey) => monkey.numInspections);
    //       it("check monkey inspections", () => {
    //         assertEquals(results, [20858, 19138, 780, 20797]);
    //       });
    //     });
    //     describe.ignore("after 5000 rounds", () => {
    //       const troop = copy(input).map((monkey) => new WorryingMonkey(monkey));
    //       runTimes(1000, () => playRound(troop));
    //       const results = troop.map((monkey) => monkey.numInspections);
    //       it("check monkey inspections", () => {
    //         assertEquals(results, [26075, 23921, 974, 26000]);
    //       });
    //     });
    //     describe.ignore("after 6000 rounds", () => {
    //       const troop = copy(input).map((monkey) => new WorryingMonkey(monkey));
    //       runTimes(1000, () => playRound(troop));
    //       const results = troop.map((monkey) => monkey.numInspections);
    //       it("check monkey inspections", () => {
    //         assertEquals(results, [5204, 4792, 199, 5192]);
    //       });
    //     });
    //     describe.ignore("after 10000 rounds", () => {
    //       const troop = copy(input).map((monkey) => new WorryingMonkey(monkey));
    //       runTimes(4000, () => playRound(troop));
    //       const results = troop.map((monkey) => monkey.numInspections);
    //       it("check monkey inspections", () => {
    //         assertEquals(results, [5204, 4792, 199, 5192]);
    //       });
    //     });
  });

  describe("part2()", () => {
    it("when given the sample input, the answer should be 2713310158", () => {
      const result = part2(input);
      assertEquals(result, 2713310158n);
    });
  });
});
