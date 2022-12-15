// Dependencies

import { parseStringArray } from "../helpers/parse.ts";
import "../types/global.d.ts";
import { Day13Input, Pair } from "./types.d.ts";

// Public

export default function parseInput(input: RawInput): Day13Input {
  const lines = parseStringArray(input, "\n");

  const output: Pair[] = [];

  const lastPair = lines.reduce((arr, line) => {
    if (line === "") {
      output.push(arr);
      return <Pair[]>[];
    }

    const obj: Pair = JSON.parse(line);
    arr.push(obj);
    return arr;
  }, <Pair[]>[]);

  output.push(lastPair);

  return output;
}

export function parseInput2(input: RawInput): Day13Input {
  const lines = parseStringArray(input, "\n");

  return lines
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const obj: Pair = JSON.parse(line);
      return obj;
    });
}
