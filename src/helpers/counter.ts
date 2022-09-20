// Dependencies

import { Key } from "./types";

// Private

export interface CounterForEachCallback {
  (value: Number, key: Key, map: Map<Key, number>): void;
}

export interface CounterObject {
  [key: Key]: Number
}

// Public

export class Counter {
  map: Map<Key, number>;

  constructor(iterable) {
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

  increment(key: Key, byHowMuch: number = 1): number {
    if (this.map.has(key)) {
      const currentValue = this.map.get(key);
      this.map.set(key, currentValue + byHowMuch);
    } else {
      this.map.set(key, byHowMuch);
    }
    return this.map.get(key);
  }

  decrement(key: Key, byHowMuch: number = 1): number {
    if (this.map.has(key)) {
      const currentValue = this.map.get(key);
      this.map.set(key, currentValue - byHowMuch);
    } else {
      this.map.set(key, 0 - byHowMuch);
    }
    return this.map.get(key);
  }

  toObject(): CounterObject {
    return Array.from(this.map).reduce(
        (obj, [key, value]) => ({ ...obj, [key]: value }),
        {}
      )
  }
}