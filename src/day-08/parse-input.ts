// Dependencies

import { parseNumberMatrix } from "../helpers/parse.ts";
import "../types/global.d.ts";
import { Day08Input } from "./types.d.ts";
import Matrix from "../helpers/matrix.ts";

// Public

export default function parseInput(input: RawInput): Day08Input {
  return new Matrix(parseNumberMatrix(input));
}
