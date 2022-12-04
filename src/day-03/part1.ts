// Dependencies

import { sum } from "../helpers/math.ts";

// Types

import "../types/global.d.ts";
import "./types.d.ts";

// Public

export function findMatch(str1: string, str2: string): string {
  const set1 = new Set(str1.split(""));
  const set2 = new Set(str2.split(""));

  let match = "#";

  Array.from(set1).some((letter) => {
    if (set2.has(letter)) {
      match = letter;
    }

    return set2.has(letter);
  });

  return match;
}

export function letterScore(letter: string): number {
  const charCode = letter.charCodeAt(0);

  if (charCode >= 97 && charCode <= 122) {
    return charCode - 96; // -97 + 1
  } else if (charCode >= 65 && charCode <= 90) {
    return charCode - 38; // -65 + 27
  }

  return 0;
}

export default function part1(input: Day03Input): Answer {
  const priorities = input.map((rucksack) => {
    const match = findMatch(rucksack[0], rucksack[1]);
    return letterScore(match);
  });

  return sum(priorities);
}
