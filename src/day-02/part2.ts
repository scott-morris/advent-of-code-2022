// Dependencies

import { sum } from "../helpers/math.ts";

// Types

import "../types/global.d.ts";
import "./types.d.ts";

// Private

type ChoiceValue = { [n: string]: number };
type OutcomeValue = { [n: string]: ChoiceValue };

const OUTCOMES: OutcomeValue = {
  A: { X: 0 + 3, Y: 3 + 1, Z: 6 + 2 },
  B: { X: 0 + 1, Y: 3 + 2, Z: 6 + 3 },
  C: { X: 0 + 2, Y: 3 + 3, Z: 6 + 1 },
};

// Public

export function score(game: Game): number {
  const [opponent, you] = game;

  return OUTCOMES[opponent][you];
}

export default function part1(input: Day02Input): Answer {
  return sum(input.map(score));
}
