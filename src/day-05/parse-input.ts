// Dependencies

import { parseStringArray } from "../helpers/parse.ts";
import "../types/global.d.ts";
import "./types.d.ts";

// Private

function findBreak(lines: string[]): number {
  let found = -1;
  lines.some((line, index) => {
    if(line.trim() === '') {
      found = index;
      return true;
    }

    return false;
  });

  return found;
}

function parseStacks(lines: string[]): string[] {
  // remove the last line that contains the numbers
  lines.pop();

  // determine how many stacks there are
  const numStacks = (lines[0].length + 1) / 4;

  const verticalStacks = lines.map((line) => {
    const output = [];

    for (let i = 0; i < numStacks; i += 1) {
      const container = line.substr(i * 4, 4).trim();
      if (container.match(/^\[.\]$/)) {
        output.push(container[1])
      } else {
        output.push("");
      }
    }

    return output;
  });

  const stacks: string[] = [];
  verticalStacks.forEach((line) => {
    line.forEach((item, index) => {
      stacks[index] = (stacks[index] || "") + item;
    });
  });

  return stacks;
}

function parseInstructions(line: string): Instruction {
  const result = line.match(/^move (\d+) from (\d+) to (\d+)$/);

  if (result == null) {
    return { move: 0, from: 0, to: 0 };
  }

  return {
    move: Number(result[1]),
    from: Number(result[2]),
    to: Number(result[3])
  }
}

// Public

export default function parseInput(input: RawInput): Day05Input {
  const lines = parseStringArray(input, "\n");
  const lineBreak = findBreak(lines);

  const stacks = parseStacks(lines.slice(0,lineBreak));
  const instructions = lines.slice(lineBreak+1).map(parseInstructions);

  return {
    stacks,
    instructions
  }
}
