// Dependencies

import { sum } from "../helpers/math.ts";
import { letterScore } from "./part1.ts";

// Types

import "../types/global.d.ts";
import "./types.d.ts";

// Public

export function findMatchFor3(str1: string, str2: string, str3: string) {
  const set1 = new Set(str1.split(""));
  const set2 = new Set(str2.split(""));
  const set3 = new Set(str3.split(""));

  let match = "#";

  Array.from(set1).some((letter) => {
    if (set2.has(letter) && set3.has(letter)) {
      match = letter;
    }

    return set2.has(letter) && set3.has(letter);
  });

  return match;
}

export function modifyInput(original: Day03Input): Day03Input {
  const input = [...original];
  const output = [];

  for (; input.length > 3; ) {
    const group = input
      .splice(0, 3)
      .map(([section1, section2]) => section1 + section2);

    output.push(group);
  }

  // Add the remainder
  const lastGroup = input
    .splice(0, 3)
    .map(([section1, section2]) => section1 + section2);

  output.push(lastGroup);

  return output;
}

export default function part2(original: Day03Input): Answer {
  const input = modifyInput(original);

  const badges = input.map((group) => {
    const match = findMatchFor3(group[0], group[1], group[2]);
    return letterScore(match);
  });

  return sum(badges);
}
