// Dependencies

// Types

import "../types/global.d.ts";
import "./types.d.ts";

// Public

export function hasUniqueCharacters(str: string): boolean {
  return !/(.)(\1)/.test(str.split("").sort().join(""));
}

export default function part1(input: Day06Input): Answer {
  let answer = -1;
  for (let i = 0; i < input.length - 3; i += 1) {
    const portion = input.substring(i, i + 4);
    if (hasUniqueCharacters(portion)) {
      answer = i + 4;
      break;
    }
  }

  return answer;
}
