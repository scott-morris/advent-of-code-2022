// Dependencies

// Types

import "../types/global.d.ts";
import { Day10Input, Instruction } from "./types.d.ts";

// Public

export class VideoSystem {
  instructions: Instruction[];
  x: number;
  pointer: number;
  clock: number;
  buffer: number | null;
  logs: string[];

  constructor(input: Instruction[]) {
    this.instructions = input;
    this.pointer = 0;
    this.clock = 1;
    this.buffer = null;
    this.x = 1;
    this.logs = [];
  }

  cycle() {
    this.clock += 1;

    // If we've prepped to update the register, use this cycle to do it.
    if (this.buffer !== null) {
      this.x += this.buffer;
      this.log(`adding ${this.buffer} from buffer`);
      this.buffer = null; // clear the buffer
      return;
    }

    // Process a new instruction
    if (this.pointer >= this.instructions.length) {
      throw new Error(`Program overrun`);
    }

    const instruction = this.instructions[this.pointer];
    this.pointer += 1;

    if (instruction.command === "noop") {
      this.log("processing noop");
      return;
    }

    if (instruction.value === null) {
      throw new Error(`Invalid value`);
    }

    // If it's a value, then use this cycle to set the value in the buffer.
    this.buffer = instruction.value || 0;
    this.log(`setting buffer to ${this.buffer}`);
  }

  waitCycles(numCycles: number) {
    for (let i = 0; i < numCycles; i += 1) {
      this.cycle();
    }
  }

  log(message: string) {
    this.logs.push(
      `[C${("00" + this.clock).slice(-3)} | P ${("00" + this.pointer).slice(
        -3
      )} | V${("000" + this.x).slice(-4)}]: ${message}`
    );
  }

  get signalStrength(): number {
    return this.clock * this.x;
  }
}

export default function part1(input: Day10Input): Answer {
  const videoSystem = new VideoSystem(input);

  videoSystem.waitCycles(19);
  let sum = videoSystem.signalStrength;

  for (let i = 0; i < 5; i += 1) {
    videoSystem.waitCycles(40);
    sum += videoSystem.signalStrength;
  }

  return sum;
}
