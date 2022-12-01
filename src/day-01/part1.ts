// Dependencies

import { sum } from "../helpers/math.ts";

// Types

import "../types/global.d.ts";
import "./types.d.ts";

// Public

export function getCalories(elf: number[]): number {
  return sum(elf);
}

export default function part1(input: Day01Input): Answer {
  // Determine the total calories per elf.
  const calories = input.map(getCalories);

  // Return the largest.
  return Math.max(...calories);
}
