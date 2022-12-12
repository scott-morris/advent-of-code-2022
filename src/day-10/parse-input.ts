// Dependencies

import { parseStringArray } from "../helpers/parse.ts";
import "../types/global.d.ts";
import { Day10Input, Instruction } from "./types.d.ts";

const LINE_REGEX = /^(\w*)\s?(-?\d+)?$/;

// Public

export function parseLine(line: string): Instruction {
  const parsed = line.match(LINE_REGEX);

  if (parsed === null) {
    throw new Error(`bad data`);
  }

  return parsed[2] === undefined
    ? { command: parsed[1] }
    : { command: parsed[1], value: Number(parsed[2]) };
}

export default function parseInput(input: RawInput): Day10Input {
  const lines = parseStringArray(input, "\n");

  return lines.map(parseLine);
}
