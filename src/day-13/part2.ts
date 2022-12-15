// Dependencies

// Types

import "../types/global.d.ts";
import { Day13Input, Pair } from "./types.d.ts";
import { comparePairs } from "./part1.ts";
import { copy } from "../helpers/simple-object.ts";
import { Comparison } from "./part1.ts";

// Public

const DIVIDER_PACKETS: Pair[] = [[[2]], [[6]]];

export function sortArray(arr: Pair[]): Pair[] {
  // Make a copy so we don't mutably change the input
  const output = copy(arr);

  output.sort((a, b) => {
    const comparison: Comparison = comparePairs(a, b);

    return comparison.valueOf();
  });

  return output;
}

export function findPacket(sortedArray: Pair[], packet: Pair): number {
  // Coerce the search to a string to make it easier to determine array equality
  const packetString = JSON.stringify(packet);

  for (let i = 0; i < sortedArray.length; i += 1) {
    if (JSON.stringify(sortedArray[i]) === packetString) {
      return i + 1;
    }
  }

  return -1;
}

export default function part2(input: Day13Input): Answer {
  // Make a copy so we don't mutably change the input
  const arr = [...copy(input), ...DIVIDER_PACKETS];
  const sortedArray = sortArray(arr);

  const location1 = findPacket(sortedArray, DIVIDER_PACKETS[0]);
  const location2 = findPacket(sortedArray, DIVIDER_PACKETS[1]);

  return location1 * location2;
}
