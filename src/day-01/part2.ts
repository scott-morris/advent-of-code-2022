// Dependencies

import { sum } from "../helpers/math.ts";
import { getCalories } from "./part1.ts";
import "./types.d.ts";

// Public

export default function part2(input: Day1Input): Answer {
  const calories = input.map(getCalories);

  // Put the calories in order.
  calories.sort((a, b) => a - b);

  // Pull off the largest 3.
  const largest = calories.slice(-3);

  // Return the sum of the largest 3.
  return sum(largest);
}
