/* eslint-disable no-bitwise */
// Dependencies

const math = require('./math');

// Private

function validateCoords({ x, y }) {
  const parsedX = parseInt(x, 10);
  const parsedY = parseInt(y, 10);

  if (
    parsedX !== Number(x) ||
    parsedY !== Number(y) ||
    parsedX < 0 ||
    parsedY < 0
  ) {
    return {};
  }

  return {
    x: parsedX,
    y: parsedY,
  };
}

// Public

const flags = {
  RIGHT: 0b00000001,
  BOTTOM_RIGHT: 0b00000010,
  BOTTOM: 0b00000100,
  BOTTOM_LEFT: 0b00001000,
  LEFT: 0b00010000,
  TOP_LEFT: 0b00100000,
  TOP: 0b01000000,
  TOP_RIGHT: 0b10000000,
};

function translateCoords(coords) {
  let result;
  if (Array.isArray(coords)) {
    const [x, y] = coords;
    result = { x, y };
  } else if (typeof coords === 'string') {
    const [x, y] = coords.split(',');
    result = { x, y };
  } else {
    const { x, y } = coords;
    result = { x, y };
  }

  return validateCoords(result);
}

/**
 * @class
 */
class Matrix {
  constructor(data = [], { processItem = (item) => parseInt(item, 10) } = {}) {
    // Convert incoming data to a 2 dimensional array
    this.data = [...data].map((row) => [...(row || [])].map(processItem));
  }

  /**
   * @param {Matrix~Loop} fn
   */
  forEach(fn) {
    const self = this;
    const rows = this.data;
    rows.forEach((row, y) => {
      row.forEach((val, x) => {
        fn(val, { x, y }, self);
      });
    });
  }

  map(fn) {
    const { width } = this;

    for (let y = 0; y < this.data.length; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const currentValue = this.get({ x, y }, { defaultValue: null });
        const newValue = fn(currentValue, { x, y }, this);
        this.set({ x, y }, newValue, { mustExist: false });
      }
    }

    return this.data;
  }

  reduce(fn, initialValue) {
    const self = this;
    const flattened = this.data
      .map((rows, y) => rows.map((val, x) => ({ val, x, y })))
      .flat();

    return flattened.reduce(
      (previousValue, { val, x, y }) => fn(previousValue, val, { x, y }, self),
      initialValue
    );
  }

  get length() {
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

  get width() {
    // length of the longest row
    return this.data.reduce((widest, row) => Math.max(widest, row.length), 0);
  }

  get height() {
    // number of rows
    return this.data.length;
  }

  get(coords, { defaultValue = -1, includeCoords = false } = {}) {
    const { x, y } = translateCoords(coords);

    const value = this?.data?.[y]?.[x] ?? defaultValue;

    return includeCoords ? { x, y, value } : value;
  }

  set(coords, value, { mustExist = true } = {}) {
    const { x, y } = translateCoords(coords);

    if (x < 0 || y < 0 || x === undefined || y === undefined) {
      return this;
    }

    if (mustExist && (this?.data?.[y]?.[x] ?? 'DNE') === 'DNE') {
      return this;
    }

    this.data[y] = this.data?.[y] ?? [];
    this.data[y][x] = value;

    return this;
  }

  getAdjacents(
    coords,
    { includeDiagonals = false, includeDirections = 0 } = {}
  ) {
    const self = this;
    const { x, y } = translateCoords(coords);
    const adjacents = [];

    let directions;

    // Only set if directions weren't specifically given
    if (includeDirections > 0) {
      directions = includeDirections;
    } else {
      directions = flags.RIGHT + flags.BOTTOM + flags.LEFT + flags.TOP;

      if (includeDiagonals) {
        directions +=
          flags.BOTTOM_RIGHT +
          flags.BOTTOM_LEFT +
          flags.TOP_LEFT +
          flags.TOP_RIGHT;
      }
    }

    if (directions & flags.RIGHT) {
      adjacents.push(this.get({ x: x + 1, y }, { includeCoords: true }));
    }
    if (directions & flags.BOTTOM) {
      adjacents.push(this.get({ x, y: y + 1 }, { includeCoords: true }));
    }
    if (directions & flags.LEFT) {
      adjacents.push(this.get({ x: x - 1, y }, { includeCoords: true }));
    }
    if (directions & flags.TOP) {
      adjacents.push(this.get({ x, y: y - 1 }, { includeCoords: true }));
    }
    if (directions & flags.BOTTOM_RIGHT) {
      adjacents.push(this.get({ x: x + 1, y: y + 1 }, { includeCoords: true }));
    }
    if (directions & flags.BOTTOM_LEFT) {
      adjacents.push(this.get({ x: x - 1, y: y + 1 }, { includeCoords: true }));
    }
    if (directions & flags.TOP_LEFT) {
      adjacents.push(this.get({ x: x - 1, y: y - 1 }, { includeCoords: true }));
    }
    if (directions & flags.TOP_RIGHT) {
      adjacents.push(this.get({ x: x + 1, y: y - 1 }, { includeCoords: true }));
    }

    return adjacents
      .filter(({ x: fx, y: fy }) => (self?.data?.[fy]?.[fx] ?? 'DNE') !== 'DNE')
      .map((c) => self.get(c, { includeCoords: true }));
  }

  flip({ axis = 'y', height = this.height } = {}) {
    if (axis === 'x') {
      const { width } = this;
      this.data = this.data.map((row) => {
        // eslint-disable-next-line no-param-reassign
        row[width - 1] = row[width - 1] || null;
        row.fill(null, row.length, width - 1);
        return row.reverse();
      });
    } else if (axis === 'y') {
      this.data[height - 1] = this.data[height - 1] || [];
      for (let i = 0; i < height; i += 1) {
        this.data[i] = this.data[i] || [];
      }
      this.data.reverse();
    }
    return this;
  }

  split({ axis, index, includeSplit = true } = {}) {
    let result;
    if (axis === 'x') {
      result = this.data.map((row) =>
        row.slice(includeSplit ? index : index + 1)
      );
      this.data = this.data.map((row) => row.slice(0, index));
    } else if (axis === 'y') {
      result = this.data.slice(includeSplit ? index : index + 1);
      this.data = this.data.slice(0, index);
    }

    return new Matrix(result, { processItem: (item) => item });
  }

  merge(matrix, fn = (currentValue, incomingValue) => incomingValue) {
    const self = this;
    matrix.forEach((incomingValue, coords) => {
      const currentValue = self.get(coords, { defaultValue: null });
      const newValue = fn(currentValue, incomingValue);
      self.set(coords, newValue, { mustExist: false });
    });

    return this;
  }

  transpose() {
    this.data = math.transpose(this.data);
    return this;
  }

  toJSON() {
    return {
      Matrix: this.data,
    };
  }

  join({ joinX = '', joinY = '\n' } = {}) {
    return this.data.map((row) => row.join(joinX)).join(joinY);
  }
}

module.exports = { matrixFlags: flags, translateCoords, Matrix };

/**
 * @typedef Matrix~CoordsObject
 * @property {number} x the x coordinate
 * @property {number} y the y coordinate
 */

/**
 * @callback Matrix~Loop
 * @param {*} value the value at the coordinates
 * @param {Matrix~CoordsObject} coords the coordinates object
 * @param {Matrix} matrix the matrix
 */
