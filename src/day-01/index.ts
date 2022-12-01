// Dependencies

import * as fs from "../helpers/fs.ts";
import { getInputFile } from "../helpers/get-input-file.ts";
import { timeExecution } from "../helpers/time-execution.ts";
import displayOutput from "../helpers/display-output.ts";
import "../types/global.d.ts";

// This day's files

import parseInput from "./parse-input.ts";
import part1 from "./part1.ts";
import part2 from "./part2.ts";
import "./types.d.ts";

// Public

async function main() {
  const inputFile = await getInputFile(1);
  const raw: RawInput = await fs.readFile(inputFile);

  const input = parseInput(raw);

  const result1 = timeExecution(part1)(input);
  const result2 = timeExecution(part2)(input);

  // const result1 = part1(input);
  // const result2 = part2(input);

  displayOutput(result1, result2);
}

main();
