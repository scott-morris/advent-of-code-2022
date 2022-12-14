// Dependencies

// Types

import "../types/global.d.ts";
import { Monkey } from "./monkey.ts";
import { Day11Input, MonkeyDef } from "./types.d.ts";
import runTimes from "../helpers/run-multiple-times.ts";

// Public

export class PlayingMonkey extends Monkey {
  numInspections: number;

  constructor(spec: MonkeyDef) {
    super(spec);
    this.numInspections = 0;
  }

  chooseThrowTarget(value: bigint): number {
    const worryLevel = this.getWorryLevel(value);
    return super.chooseThrowTarget(worryLevel);
  }

  takeTurn(troop: PlayingMonkey[]) {
    this.items.forEach((item) => {
      const worryLevel = this.getWorryLevel(item);
      const throwTarget = this.chooseThrowTarget(item);
      troop[throwTarget].items.push(worryLevel);
    });

    this.numInspections += this.items.length;
    this.items = [];
  }
}

export function playRound(troop: PlayingMonkey[]) {
  // Take your turns.
  troop.forEach((monkey) => {
    monkey.takeTurn(troop);
  });
}

export default function part1(input: Day11Input): Answer {
  const troop = input.map((monkey) => new PlayingMonkey(monkey));

  // Play 20 rounds
  runTimes(20, (i) => {
    console.log(`Running round ${i}`);
    playRound(troop);
  });
  // [...Array(20)].forEach(() => playRound(troop));

  // Get the list of inspections
  const inspections = troop.map((monkey) => monkey.numInspections);

  // Sort descending
  inspections.sort((a, b) => b - a);

  return inspections[0] * inspections[1];
}
