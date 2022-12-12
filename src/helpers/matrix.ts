// deno-lint-ignore-file no-explicit-any no-this-alias
// Dependencies

// Types

export interface Coordinates {
  x: number;
  y: number;
}

export enum Direction {
  RIGHT = 0b00000001,
  EAST = 0b00000001,
  BOTTOM_RIGHT = 0b00000010,
  SOUTHEAST = 0b00000010,
  BOTTOM = 0b00000100,
  SOUTH = 0b00000100,
  BOTTOM_LEFT = 0b00001000,
  SOUTHWEST = 0b00001000,
  LEFT = 0b00010000,
  WEST = 0b00010000,
  TOP_LEFT = 0b00100000,
  NORTHWEST = 0b00100000,
  TOP = 0b01000000,
  NORTH = 0b01000000,
  TOP_RIGHT = 0b10000000,
  NORTHEAST = 0b10000000,
}

/**
 * Use for `[UP|DOWN|LEFT|RIGHT]` or `[NORTH|SOUTH|EAST|WEST]`, noting that
 * `UP === NORTH`, `DOWN === SOUTH, etc.
 */
export enum CardinalDirection {
  UP = 0b00000001,
  NORTH = 0b00000001,
  DOWN = 0b00000010,
  SOUTH = 0b00000010,
  LEFT = 0b00000100,
  WEST = 0b00000100,
  RIGHT = 0b00001000,
  EAST = 0b00001000,
}

// Public

export default class Matrix {
  data: Array<Array<unknown>>;

  constructor(
    data: Array<Array<unknown>>,
    processItem: (value: unknown, x: number, y: number) => any = (value) =>
      value
  ) {
    this.data = data.map((row, y) => {
      return row.map((item, x) => processItem(item, x, y));
    });
  }

  forEach(fn: (value: any, coords: Coordinates, matrix: Matrix) => void) {
    const self = this;
    const rows = this.data;
    rows.forEach((row, y) => {
      row.forEach((val, x) => {
        fn(val, { x, y }, self);
      });
    });
  }

  map(fn: (value: any, coords: Coordinates, matrix: Matrix) => any): Matrix {
    const { width } = this;

    for (let y = 0; y < this.data.length; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const currentValue = this.get({ x, y }, { defaultValue: null });
        const newValue = fn(currentValue, { x, y }, this);
        this.set({ x, y }, newValue);
      }
    }

    return this;
  }

  reduce(
    fn: (
      previousValue: any,
      value: any,
      coords: Coordinates,
      matrix: Matrix
    ) => any,
    initialValue: any
  ): any {
    const self = this;
    const flattened = this.data
      .map((rows, y) => rows.map((val, x) => ({ val, x, y })))
      .flat();

    return flattened.reduce(
      (previousValue, { val, x, y }) => fn(previousValue, val, { x, y }, self),
      initialValue
    );
  }

  get length(): number {
    // total number of elements
    return this.data.reduce((count, row) => {
      if (!Array.isArray(row)) {
        return count;
      }

      const validEntries = row.filter(
        (entry) => entry !== undefined && entry !== null
      );
      return count + Object.keys(validEntries).length;
    }, 0);
  }

  get width(): number {
    // length of the longest row
    return this.data.reduce((widest, row) => Math.max(widest, row.length), 0);
  }

  get height(): number {
    // number of rows
    return this.data.length;
  }

  get(coords: Coordinates, defaultValue: any = -1) {
    const { x, y } = coords;

    const value = this?.data?.[y]?.[x] ?? defaultValue;

    return { x, y, value };
  }

  set(coords: Coordinates, value: any, mustExist = true) {
    const { x, y } = coords;

    if (x < 0 || y < 0) {
      return this;
    }

    if (mustExist && (this?.data?.[y]?.[x] ?? "DNE") === "DNE") {
      return this;
    }

    this.data[y] = this.data?.[y] ?? [];
    this.data[y][x] = value;

    return this;
  }

  getRow(x: number): any[] {
    return this.data[x];
  }

  getColumn(y: number): any[] {
    return this.data.map((row) => row[y]);
  }
}
