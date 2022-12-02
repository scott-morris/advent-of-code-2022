// Dependencies

import { sum } from "../helpers/math.ts";

// Types

import "../types/global.d.ts";
import "./types.d.ts";

// Private

type ChoiceValue = { [n: string]: number };
type OutcomeValue = { [n: string]: ChoiceValue };

const CHOICE_VALUE: ChoiceValue = {
  X: 1,
  Y: 2,
  Z: 3,
};

const OUTCOMES: OutcomeValue = {
  A: { X: 3, Y: 6, Z: 0 },
  B: { X: 0, Y: 3, Z: 6 },
  C: { X: 6, Y: 0, Z: 3 },
};

// Public

export function score(game: Game): number {
  const [opponent, you] = game;

  return OUTCOMES[opponent][you] + CHOICE_VALUE[you];
}

export default function part1(input: Day02Input): Answer {
  return sum(input.map(score));
}
