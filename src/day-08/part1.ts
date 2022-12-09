// Dependencies

// Types

import "../types/global.d.ts";
import { Day08Input } from "./types.d.ts";

// Public

/**
 * Is the tree visible this way?
 * @param value the height of the tree in question
 * @param heightsToEdge the list of heights of trees between the given tree and a particular edge
 * @returns true if the given tree is visible in this direction
 */
export function isVisibleThisWay(
  value: number,
  heightsToEdge: number[]
): boolean {
  // Literal edge case.
  if (heightsToEdge.length === 0) {
    return true;
  }

  return heightsToEdge.every((height) => height < value);
}

/**
 * Is the tree visible on this axis?
 * @param index zero-based index of the tree to be checked
 * @param axisValues the column or row in the matrix
 */
export function isVisibleThisAxis(index: number, axisValues: number[]) {
  const leftSide = axisValues.slice(0, index);
  const rightSide = axisValues.slice(index + 1);

  return (
    isVisibleThisWay(axisValues[index], leftSide) ||
    isVisibleThisWay(axisValues[index], rightSide)
  );
}

export default function part1(input: Day08Input): Answer {
  const visible = new Set();

  for (let y = 0; y < input.height; y += 1) {
    const row = input.getRow(y);
    for (let x = 0; x < row.length; x += 1) {
      if (isVisibleThisAxis(x, row)) {
        visible.add(`${x},${y}`);
      }
    }
  }

  for (let x = 0; x < input.width; x += 1) {
    const col = input.getColumn(x);
    for (let y = 0; y < col.length; y += 1) {
      if (isVisibleThisAxis(y, col)) {
        visible.add(`${x},${y}`);
      }
    }
  }

  return visible.size;
}
