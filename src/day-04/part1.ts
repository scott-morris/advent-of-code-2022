// Dependencies

import parseInput from "./parse-input.ts";

// Types

import "../types/global.d.ts";
import "./types.d.ts";

// Public

export function contains(
  searchFor: SectionAssignment,
  searchIn: SectionAssignment
): boolean {
  return searchFor.l >= searchIn.l && searchFor.h <= searchIn.h;
}

export function eitherContains(
  section1: SectionAssignment,
  section2: SectionAssignment
) {
  return contains(section1, section2) || contains(section2, section1);
}

export default function part1(input: Day04Input): Answer {
  return input.reduce((count, pair) => {
    return eitherContains(pair[0], pair[1]) ? count + 1 : count;
  }, 0);
}
