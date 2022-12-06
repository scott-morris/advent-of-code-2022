// Dependencies

// Types

import "../types/global.d.ts";
import "./types.d.ts";

// Public

export function performInstruction(stacks: Stacks, instruction: Instruction): Stacks {
  const newStacks = [...stacks];      // make a copy of the array instead of mutating the original
  const to = instruction.to - 1;      // adjust for zero-based index
  const from = instruction.from - 1;  // adjust for zero-based index
  const move = instruction.move;
  
  newStacks[to] = newStacks[from].substr(0, move) + newStacks[to];
  newStacks[from] = newStacks[from].substr(move);

  return newStacks;
}

export default function part2(input: Day05Input): Answer {
  const endState = input.instructions.reduce((stacks, instruction) => {
    return performInstruction(stacks, instruction);
  }, input.stacks)

  return endState.map((stack) => stack[0]).join("")
}
