// Dependencies

// Types

import "../types/global.d.ts";
import { Day11Input, MonkeyDef } from "./types.d.ts";
import { PlayingMonkey, playRound } from "./part1.ts";

// Public

export class WorryingMonkey extends PlayingMonkey {
  constructor(spec: MonkeyDef) {
    super(spec);
  }

  getWorryLevel(value: bigint): bigint {
    const operand1 =
      typeof this.operationDef.operand1 === "string"
        ? BigInt(value)
        : this.operationDef.operand1;

    const operand2 =
      typeof this.operationDef.operand2 === "string"
        ? BigInt(value)
        : this.operationDef.operand2;

    return this.operationFunction(operand1, operand2);
  }

  // takeTurn(troop: WorryingMonkey[]) {
  //   this.items.forEach((item) => {
  //     const worryLevel = this.getWorryLevel(item);
  //     const throwTarget = this.chooseThrowTarget(item);
  //     troop[throwTarget].items.push(worryLevel);
  //   });

  //   this.numInspections += this.items.length;
  //   this.items = [];
  // }
}

export default function part2(input: Day11Input): Answer {
  const troop = input.map((monkey) => new PlayingMonkey(monkey));

  // Play 10,000 rounds
  for (let i = 0; i < 10000; i += 1) {
    playRound(troop);
  }

  // Get the list of inspections
  const inspections = troop.map((monkey) => monkey.numInspections);

  // Sort descending
  inspections.sort((a, b) => b - a);

  return inspections[0] * inspections[1];
}
