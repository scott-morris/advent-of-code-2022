// Dependencies

import { parseStringArray } from "../helpers/parse.ts";
import "../types/global.d.ts";
import { Day11Input, MonkeyDef, OperationDef, ThrowDef } from "./types.d.ts";

// Private

function getMonkeyIndex(desc: string): number {
  const result = desc.match(/Monkey (\d+)/);

  return Number(result?.[1] ?? -1);
}

function getMonkeyItems(desc: string): bigint[] {
  const result = desc.match(/Starting items: ([^\n]+)/);

  if (result === null) {
    return [];
  }

  return result[1].split(", ").map(BigInt);
}

function getMonkeyOperation(desc: string): OperationDef {
  const result = desc.match(
    /Operation: new = ((?:old|\d+)) ([*+-]) ((?:old|\d+))/
  );

  if (result === null) {
    throw new Error(`invalid operation in "${desc}"`);
  }

  const operand1 = result[1] === "old" ? "old" : BigInt(result[1]);
  const operand2 = result[3] === "old" ? "old" : BigInt(result[3]);

  return {
    operand1,
    action: result[2],
    operand2,
  };
}

function getMonkeyDivisor(desc: string): bigint {
  const result = desc.match(/Test: divisible by (\d+)/);

  if (result === null) {
    throw new Error(`couldn't find divisor in "${desc}"`);
  }

  return BigInt(result[1]);
}

function getMonkeyThrow(desc: string): ThrowDef {
  const resultTrue = desc.match(/If true: throw to monkey (\d+)/);
  const resultFalse = desc.match(/If false: throw to monkey (\d+)/);

  if (resultTrue === null || resultFalse === null) {
    throw new Error(`Bad throw description in "${desc}"`);
  }

  return {
    onTrue: Number(resultTrue[1]),
    onFalse: Number(resultFalse[1]),
  };
}

// Public

export function parseMonkey(monkeyDescription: string[]): MonkeyDef {
  if (monkeyDescription.length !== 6) {
    throw new Error(
      `Invalid monkey description length ${monkeyDescription.length}`
    );
  }

  const monkeyString = monkeyDescription.join("\n");
  const index = getMonkeyIndex(monkeyString);
  const items = getMonkeyItems(monkeyString);
  const operation = getMonkeyOperation(monkeyString);
  const testDivide = getMonkeyDivisor(monkeyString);
  const throwTo = getMonkeyThrow(monkeyString);

  return {
    index,
    items,
    operation,
    testDivide,
    throwTo,
  };
}

export default function parseInput(input: RawInput): Day11Input {
  const lines = parseStringArray(input, "\n");
  const result = [];

  for (; lines.length >= 6; ) {
    const spec = lines.splice(0, 6);
    result.push(parseMonkey(spec));

    if (lines.length && lines[0] === "") {
      lines.shift();
    }
  }

  return result;
}
