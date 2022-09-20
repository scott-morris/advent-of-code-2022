// Libraries

import { Table } from 'console-table-printer';

// Dependencies

const { round } = require('./math');

// Types

import { PotentialResult } from './types'

interface TableRow {
  Part: number;
  Result: any;
  Duration: string;
}

// Private

function processResults(result1: PotentialResult, result2: PotentialResult): Array<TableRow> {
  return [result1, result2]
    .filter((r) => r !== undefined)
    .map(({ result, duration = -1 }, i) => ({
      Part: i + 1,
      Result: result,
      Duration: `${round(duration, 4)} s`,
    }));
}

// Public

export default function displayOutput(result1: PotentialResult, result2: PotentialResult) {
  const results = processResults(result1, result2);

  const table = new Table({
    title: 'Advent of Code 2022 Results',
    columns: [
      { name: 'Part' },
      { name: 'Result', color: 'white' },
      { name: 'Duration' },
    ],
  });

  table.addRows(results, { color: 'blue' });
  table.printTable();
}