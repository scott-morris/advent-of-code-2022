// Dependencies

// Types

import "../types/global.d.ts";
import { Day10Input, Instruction } from "./types.d.ts";
import { VideoSystem } from "./part1.ts";

// Public

export class VideoScreen extends VideoSystem {
  screen: string[];
  currentLine: string;

  constructor(input: Instruction[]) {
    super(input);
    this.screen = [];
    this.currentLine = "";
  }

  cycle() {
    const pixelIndex = this.currentLine.length;
    const pixelValue =
      pixelIndex >= this.x - 1 && pixelIndex <= this.x + 1 ? "#" : " ";

    this.currentLine = this.currentLine + pixelValue;

    if (this.currentLine.length === 40) {
      this.screen.push(this.currentLine);
      this.currentLine = "";
    }

    super.cycle();
  }

  get display() {
    return this.screen.join("\n");
  }
}

export function runPart2(input: Day10Input): VideoScreen {
  const videoScreen = new VideoScreen(input);

  videoScreen.waitCycles(40 * 6);

  return videoScreen;
}

export default function part2(input: Day10Input): Answer {
  const videoScreen = runPart2(input);
  console.log(videoScreen.display);
  return "see above";
}
