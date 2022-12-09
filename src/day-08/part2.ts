// Dependencies

// Types

import Matrix, { Coordinates } from "../helpers/matrix.ts";
import "../types/global.d.ts";
import { Day08Input } from "./types.d.ts";

// Public

export function getDirectionScore(treeHeight: number, view: number[]): number {
  let distance = 0;

  view.some((otherTreeHeight) => {
    distance += 1;
    return otherTreeHeight >= treeHeight;
  });

  return distance;
}

export function getAxisScore(index: number, axis: number[]): number {
  const leftSide = axis.slice(0, index).reverse();
  const rightSide = axis.slice(index + 1);

  return (
    getDirectionScore(axis[index], leftSide) *
    getDirectionScore(axis[index], rightSide)
  );
}

export function getScenicScore(matrix: Matrix, coords: Coordinates): number {
  const row = matrix.getRow(coords.y);
  const col = matrix.getColumn(coords.x);

  return getAxisScore(coords.x, row) * getAxisScore(coords.y, col);
}

export default function part2(input: Day08Input): Answer {
  let max = 0;
  input.forEach((_value, coords, matrix) => {
    max = Math.max(max, getScenicScore(matrix, coords));
  });

  return max;
}
