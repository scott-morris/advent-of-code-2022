// Dependencies

import { parseStringArray } from "../helpers/parse.ts";
import "../types/global.d.ts";
import { Day09Input } from "./types.d.ts";

// Private

const pattern = /^([U|D|L|R]) (\d+)$/;

// Public

export function parseLine(line: string): string {
  const parsed = line.match(pattern);
  const direction = parsed?.[1] ?? "";
  const distance = Number(parsed?.[2] ?? 0);

  return direction.repeat(distance);
}

export default function parseInput(input: RawInput): Day09Input {
  return parseStringArray(input, "\n").reduce(
    (output, line) => output + parseLine(line),
    ""
  );
}
