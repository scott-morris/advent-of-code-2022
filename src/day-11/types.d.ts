export interface OperationDef {
  operand1: string | number;
  action: string;
  operand2: string | number;
}

export interface ThrowDef {
  onTrue: number;
  onFalse: number;
}

export interface MonkeyDef {
  index: number;
  items: number[];
  operation: OperationDef;
  testDivide: number;
  throwTo: ThrowDef;
}

export type Day11Input = MonkeyDef[];
