// Libraries

import { Table } from "npm:console-table-printer";

// Dependencies

import { round } from "./math.ts";

// Types

interface TableRow {
  Part: number;
  Result: Answer;
  Duration: string;
}

// Private

function processResults(
  result1: TimedAnswer | Answer,
  result2: TimedAnswer | Answer
): Array<TableRow> {
  return [result1, result2]
    .filter((r) => r !== undefined)
    .map((answer, i) => {
      return typeof answer === "object"
        ? {
            Part: i + 1,
            Result: answer.result,
            Duration: `${round(answer.duration, 4)} s`,
          }
        : { Part: i + 1, Result: answer, Duration: "n/a" };
    });
}

// Public

export default function displayOutput(
  result1: TimedAnswer | Answer,
  result2: TimedAnswer | Answer
) {
  const results = processResults(result1, result2);

  const table = new Table({
    title: "Advent of Code 2022 Results",
    columns: [
      { name: "Part" },
      { name: "Result", color: "white" },
      { name: "Duration" },
    ],
  });

  table.addRows(results, { color: "blue" });
  table.printTable();
}
