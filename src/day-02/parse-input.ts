// Dependencies

import { parseStringArray } from "../helpers/parse.ts";
import "../types/global.d.ts";
import "./types.d.ts";

// Public

export default function parseInput(input: RawInput): Day02Input {
  const arr = parseStringArray(input, "\n");

  return arr.map((row) => row.split(" "));
}
