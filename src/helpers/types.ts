export type Key = string | number;

export interface MapCallbackFunction {
    (value: any, key: Key, arr: Array<any>): void
}

export interface Result {
    result: any;
    duration: number;
}
  
export type PotentialResult = Result | undefined;

export type Stringable = string | string[] | number | number[] | null