// Dependencies

import { hasUniqueCharacters } from "./part1.ts";

// Types

import "../types/global.d.ts";
import "./types.d.ts";

// Public

export default function part2(input: Day06Input): Answer {
  let answer = -1;
  for (let i = 0; i < input.length - 13; i += 1) {
    const portion = input.substring(i, i + 14);
    if (hasUniqueCharacters(portion)) {
      answer = i + 14;
      break;
    }
  }

  return answer;
}
