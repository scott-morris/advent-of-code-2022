// Private

function newSet(original) {
  if (original instanceof Set) {
    return new Set(Array.from(original.values()));
  }

  return Array.isArray(original) ? new Set(original) : new Set([original]);
}

// Public

class MapArray {
  constructor(initialData) {
    const initializeArray = (arr) => {
      const init = arr.map(([key, value]) => [key, newSet(value)]);
      this.map = new Map(init);
    };

    const initializeCopy = (mapArray) => {
      this.map = new Map(
        Array.from(mapArray.map.entries()).map(([key, set]) => [
          key,
          newSet(set),
        ])
      );
    };

    const initializeObject = (obj) => {
      if (obj instanceof MapArray) {
        initializeCopy(obj);
        return;
      }

      const init = Object.keys(obj).map((key) => [key, newSet(obj[key])]);
      this.map = new Map(init);
    };

    if (Array.isArray(initialData)) {
      initializeArray(initialData);
    } else if (typeof initialData === 'object') {
      initializeObject(initialData);
    } else {
      this.map = new Map();
    }
  }

  clear() {
    this.map.clear();
  }

  delete(key) {
    this.map.delete(key);
  }

  entries() {
    return this.map.entries();
  }

  forEach(fn) {
    this.map.forEach(fn);
  }

  get(key) {
    return this.map.get(key);
  }

  getArray(key) {
    return Array.from(this.map.get(key) ?? []);
  }

  has(key) {
    return this.map.has(key);
  }

  keys() {
    return this.map.keys();
  }

  set(key, value) {
    const setValue = newSet(value);
    this.map.set(key, setValue);
  }

  values() {
    return this.map.values();
  }

  add(key, value) {
    if (this.map.has(key)) {
      const set = this.map.get(key);
      set.add(value);
      this.map.set(key, set);
    } else {
      this.map.set(key, newSet(value));
    }
  }

  remove(key, value) {
    if (this.map.has(key)) {
      const set = this.map.get(key);
      set.delete(value);
      this.map.set(key, set);
    }
  }

  removeAll(value) {
    if (this.map.has(value)) {
      this.map.delete(value);
    }

    this.map.forEach((set) => {
      set.delete(value);
    });
  }

  get size() {
    return this.map.size;
  }

  toJSON() {
    return {
      MapArray: Array.from(this.map).reduce(
        (obj, [key, value]) => ({ ...obj, [key]: Array.from(value) }),
        {}
      ),
    };
  }
}

module.exports = MapArray;
