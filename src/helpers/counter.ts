// Dependencies

// Private

export interface CounterForEachCallback {
  (value: number, key: Key, map: Map<Key, number>): void;
}

export interface CounterObject {
  [key: Key]: number;
}

// Public

export class Counter {
  map: Map<Key, number>;

  constructor(iterable: Iterable<readonly [Key, number]> | null | undefined) {
    this.map =
      iterable instanceof Counter
        ? new Map(Array.from(iterable.map))
        : new Map(iterable);
  }

  clear() {
    this.map.clear();
  }

  delete(key: Key) {
    return this.map.delete(key);
  }

  entries() {
    return this.map.entries();
  }

  forEach(fn: CounterForEachCallback) {
    return this.map.forEach(fn);
  }

  get(key: Key) {
    return this.map.get(key);
  }

  has(key: Key) {
    return this.map.has(key);
  }

  keys() {
    return this.map.keys();
  }

  set(key: Key, value: number) {
    this.map.set(key, value);
  }

  values() {
    return this.map.values();
  }

  increment(key: Key, byHowMuch = 1): number {
    const currentValue = this.map.get(key);
    const newValue =
      currentValue === undefined ? byHowMuch : currentValue + byHowMuch;

    this.map.set(key, newValue);

    return newValue;
  }

  decrement(key: Key, byHowMuch = 1): number {
    const currentValue = this.map.get(key);
    const newValue =
      currentValue === undefined ? 0 - byHowMuch : currentValue - byHowMuch;

    this.map.set(key, newValue);

    return newValue;
  }

  toObject(): CounterObject {
    return Array.from(this.map).reduce(
      (obj, [key, value]) => ({ ...obj, [key]: value }),
      {}
    );
  }
}
