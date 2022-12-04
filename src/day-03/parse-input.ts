// Dependencies

import { parseStringArray } from "../helpers/parse.ts";
import "../types/global.d.ts";
import "./types.d.ts";

// Public

export default function parseInput(input: RawInput): Day03Input {
  const lines = parseStringArray(input, "\n");

  const output: Day03Input = lines.map((line) => {
    const breakpoint = line.length / 2;

    const firstHalf = line.substring(0, breakpoint);
    const secondHalf = line.substring(breakpoint);

    return [firstHalf, secondHalf];
  });

  return output;
}
