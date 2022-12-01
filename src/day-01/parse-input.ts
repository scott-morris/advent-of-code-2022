// Dependencies

import { parseNumberArray } from "../helpers/parse.ts";
import "../types/global.d.ts";
import "./types.d.ts";

// Public

export default function parseInput(input: RawInput): Day01Input {
  const arr = parseNumberArray(input, "\n");
  const output: Day01Input = [];

  for (
    let i = arr.findIndex((e) => isNaN(e));
    i > 0;
    i = arr.findIndex((e) => isNaN(e))
  ) {
    // Splice off the grouping.
    const group = [...arr.splice(0, i)];

    // Add the group to the output array.
    output.push(group);

    // Remove the delimiter value.
    arr.splice(0, 1);
  }

  // Include the leftovers as the last group.
  output.push(arr);

  return output;
}
