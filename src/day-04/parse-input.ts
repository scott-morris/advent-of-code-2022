// Dependencies

import { parseStringArray } from "../helpers/parse.ts";
import "../types/global.d.ts";
import "./types.d.ts";

// Private

function parseAssignment(str: string): SectionAssignment {
  const [num1, num2] = str.split("-");

  return {
    l: Number(num1),
    h: Number(num2),
  };
}

// Public

export default function parseInput(input: RawInput): Day04Input {
  const lines = parseStringArray(input, "\n");

  return lines.map((line) => line.split(",").map(parseAssignment));
}
