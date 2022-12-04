// Dependencies

// Types

import "../types/global.d.ts";
import "./types.d.ts";

// Public

export function overlaps(
  searchFor: SectionAssignment,
  searchIn: SectionAssignment
): boolean {
  return searchFor.l <= searchIn.h && searchFor.h >= searchIn.l;
}

export function eitherOverlaps(
  section1: SectionAssignment,
  section2: SectionAssignment
): boolean {
  return overlaps(section1, section2) || overlaps(section2, section1);
}

export default function part2(input: Day04Input): Answer {
  return input.reduce((count, pair) => {
    return eitherOverlaps(pair[0], pair[1]) ? count + 1 : count;
  }, 0);
}
