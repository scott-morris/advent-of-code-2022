// Dependencies.

import { MonkeyDef, OperationDef, ThrowDef } from "./types.d.ts";

// Private.

const add = (operand1: bigint, operand2: bigint): bigint => operand1 + operand2;
const multiply = (operand1: bigint, operand2: bigint): bigint =>
  operand1 * operand2;

// Public

export class Monkey {
  id: number;
  items: bigint[];
  operationDef: OperationDef;
  operationFunction: (operand1: bigint, operand2: bigint) => bigint;
  testDivide: bigint;
  throw: ThrowDef;

  constructor(spec: MonkeyDef) {
    this.id = spec.index;
    this.items = spec.items;
    this.operationDef = spec.operation;
    this.operationFunction = spec.operation.action === "+" ? add : multiply;
    this.testDivide = spec.testDivide;
    this.throw = spec.throwTo;
  }

  getWorryLevel(value: bigint): bigint {
    const operand1 =
      typeof this.operationDef.operand1 === "string"
        ? value
        : this.operationDef.operand1;

    const operand2 =
      typeof this.operationDef.operand2 === "string"
        ? value
        : this.operationDef.operand2;

    return this.operationFunction(operand1, operand2) / 3n;
  }

  chooseThrowTarget(worryLevel: bigint): number {
    const remainder = worryLevel % this.testDivide;

    return remainder.toString() === "0"
      ? this.throw.onTrue
      : this.throw.onFalse;
  }
}
