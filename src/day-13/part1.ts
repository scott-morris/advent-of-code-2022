// Dependencies

// Types

import "../types/global.d.ts";
import { Day13Input, Pair } from "./types.d.ts";
import { copy } from "../helpers/simple-object.ts";

// Private

const arrayify = (input: Pair | number) =>
  Array.isArray(input) ? copy(input) : [input];

// Public

export enum Comparison {
  LESS = -1,
  EQUAL = 0,
  MORE = 1,
}

/**
 * Compare a pair of pairs. Say that five times fast.
 */
export function comparePairs(
  left: Pair | number,
  right: Pair | number
): Comparison {
  // If both are arrays
  if (Array.isArray(left) && Array.isArray(right)) {
    if (left.length === 0 && right.length === 0) return Comparison.EQUAL;
    if (right.length === 0) return Comparison.MORE;

    const arrayCompare = left.reduce((comparison: Comparison, item, i) => {
      if (comparison !== Comparison.EQUAL) return comparison;
      if (i >= right.length) return Comparison.MORE;
      return comparison !== Comparison.EQUAL
        ? comparison
        : comparePairs(item, right[i]);
    }, Comparison.EQUAL);

    return arrayCompare !== Comparison.EQUAL
      ? arrayCompare
      : right.length > left.length
      ? Comparison.LESS
      : Comparison.EQUAL;
  }

  // If both are numbers
  if (typeof left === "number" && typeof right === "number") {
    return left === right
      ? Comparison.EQUAL
      : left < right
      ? Comparison.LESS
      : Comparison.MORE;
  }

  // If one is a number and the other array, coerce them both to arrays
  return comparePairs(arrayify(left), arrayify(right));
}

export default function part1(input: Day13Input): Answer {
  return input.reduce((sum, pair, i): number => {
    const [left, right] = pair;
    const comparison = comparePairs(left, right);
    return comparison === Comparison.MORE ? sum : sum + i + 1;
  }, 0);
}
