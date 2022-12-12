export interface Instruction {
  command: string;
  value?: number;
}

export type Day10Input = Instruction[];
