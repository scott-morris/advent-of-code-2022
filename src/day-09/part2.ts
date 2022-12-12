// Dependencies

// Types

import "../types/global.d.ts";
import { Day09Input } from "./types.d.ts";
import { processInstruction, moveTail } from "./part1.ts";
import PlaneWalker from "../helpers/plane-walker.ts";

// Public

export function runPart2(input: Day09Input): {
  positions: Set<string>;
  knots: PlaneWalker[];
} {
  const movements = [...input];
  const knots: PlaneWalker[] = Array.apply(null, Array(10)).map(
    () => new PlaneWalker()
  );

  knots.forEach((knot, index) => {
    if (index === 0) {
      return;
    }

    knot.onMove = moveTail(knots[index - 1]);
  });

  const positions = new Set([knots[0].toString()]);

  movements.forEach((instruction: string) => {
    processInstruction(knots[9], instruction);
    positions.add(knots[0].toString());
  });

  return { positions, knots };
}

export default function part2(input: Day09Input): Answer {
  const { positions } = runPart2(input);

  return positions.size;
}
