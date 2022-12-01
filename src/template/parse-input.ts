// Dependencies

import { parseNumberArray } from "../helpers/parse.ts";
import "../types/global.d.ts";
import "./types.d.ts";

// Public

export default function parseInput(input: RawInput): Day<%= it.dayString %>Input {
  return parseNumberArray(input);
}
