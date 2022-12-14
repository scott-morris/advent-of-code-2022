export interface OperationDef {
  operand1: string | bigint;
  action: string;
  operand2: string | bigint;
}

export interface ThrowDef {
  onTrue: number;
  onFalse: number;
}

export interface MonkeyDef {
  index: number;
  items: bigint[];
  operation: OperationDef;
  testDivide: bigint;
  throwTo: ThrowDef;
}

export type Day11Input = MonkeyDef[];
