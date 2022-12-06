type Stack = string;

type Stacks = Stack[];

interface Instruction {
    move: number,
    from: number,
    to: number
}

interface Day05Input {
    stacks: Stacks,
    instructions: Instruction[]
}
