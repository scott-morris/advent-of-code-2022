export type Key = string | number;

export interface MapCallbackFunction {
    (value: unknown, key: Key, arr: Array<unknown>): void
}

export interface Result {
    result: unknown;
    duration: number;
}
  
export type PotentialResult = Result | undefined;

export type Stringable = string | string[] | number | number[] | null

export type SimpleObject = {
    [property: string | number]: string | number;
}