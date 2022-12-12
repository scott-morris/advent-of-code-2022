// Dependencies

import PlaneWalker, { onMoveFunction } from "../helpers/plane-walker.ts";

// Types

import "../types/global.d.ts";
import { Day09Input } from "./types.d.ts";

// Public

export function moveTail(tail: PlaneWalker): onMoveFunction {
  return (coords) => {
    const distance = tail.distanceTo(coords);
    const { x, y } = distance;
    const xDistance = Math.abs(x);
    const yDistance = Math.abs(y);

    let horizontal = "";
    let vertical = "";

    // Covers 2x right and (1x right + 2x up|down)
    if (x > 1 || x + yDistance > 2) {
      horizontal = "east";
    }

    // Covers 2x left and (1x left + 2x up|down)
    if (x < -1 || x - yDistance < -2) {
      horizontal = "west";
    }

    // Covers 2x up and (1x up + 2x left|right)
    if (y > 1 || y + xDistance > 2) {
      vertical = "north";
    }

    // Covers 2x down and (1x down + 2x left|right)
    if (y < -1 || y - xDistance < -2) {
      vertical = "south";
    }

    tail.move(vertical + horizontal);
  };
}

export function processInstruction(walker: PlaneWalker, instruction: string) {
  switch (instruction) {
    case "U":
      walker.north();
      return;

    case "D":
      walker.south();
      return;

    case "L":
      walker.west();
      return;

    case "R":
      walker.east();
  }
}

export default function part1(input: Day09Input): Answer {
  const movements = [...input];
  const tail = new PlaneWalker();
  const head = new PlaneWalker({ onMove: moveTail(tail) });
  const positions = new Set([tail.toString()]);

  movements.forEach((instruction: string) => {
    processInstruction(head, instruction);
    positions.add(tail.toString());
  });

  return positions.size;
}
