// Dependencies

import { parseStringArray } from "../helpers/parse.ts";
import "../types/global.d.ts";
import { Day<%= it.dayString %>Input } from "./types.d.ts";

// Public

export default function parseInput(input: RawInput): Day<%= it.dayString %>Input {
  return parseStringArray(input);
}
