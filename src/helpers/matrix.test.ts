// Dependencies

import { describe, test, expect, vi } from "vitest";

const { matrixFlags, translateCoords, Matrix } = require("./matrix");

// Tests

describe("translateCoords", () => {
  describe("given valid coordinates", () => {
    test("it should accept an object", () => {
      expect(translateCoords({ x: 1, y: 2 })).toEqual({ x: 1, y: 2 });
    });

    test("it should accept a string", () => {
      expect(translateCoords("1,2")).toEqual({ x: 1, y: 2 });
    });

    test("it should accept an array", () => {
      expect(translateCoords([1, 2])).toEqual({ x: 1, y: 2 });
    });
  });

  describe("given invalid coordinates", () => {
    test("it should return an empty object for negative values", () => {
      expect(translateCoords({ x: -1, y: 2 })).toEqual({});
      expect(translateCoords({ x: 2, y: -1 })).toEqual({});
    });

    test("it should return an empty object for non-integer values", () => {
      expect(translateCoords({ x: 1.1, y: 2 })).toEqual({});
      expect(translateCoords({ x: "foo", y: 2 })).toEqual({});
      expect(translateCoords({ x: null, y: 2 })).toEqual({});
      expect(translateCoords({ x: () => {}, y: 2 })).toEqual({});
      expect(translateCoords({ x: [], y: 2 })).toEqual({});
      expect(translateCoords({ x: {}, y: 2 })).toEqual({});
    });
  });
});

describe("class: Matrix", () => {
  test("should default to an empty array", () => {
    const matrix = new Matrix();

    expect(matrix.data).toEqual([]);
  });

  test("should generate correctly when data is given", () => {
    const matrix = new Matrix([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);

    expect(matrix.data).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });

  describe("given a known 2D array", () => {
    let matrix;

    beforeEach(() => {
      matrix = new Matrix([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
    });

    test("forEach() should run on each node", () => {
      const fn = vi.fn();
      matrix.forEach(fn);

      // It should be called 9 times
      expect(fn.mock.calls.length).toBe(9);

      // Sample the calls
      expect(fn.mock.calls[0][0]).toBe(1);
      expect(fn.mock.calls[0][1]).toEqual({ x: 0, y: 0 });
      expect(fn.mock.calls[0][2]).toBe(matrix);

      expect(fn.mock.calls[4][0]).toBe(5);
      expect(fn.mock.calls[4][1]).toEqual({ x: 1, y: 1 });
      expect(fn.mock.calls[4][2]).toBe(matrix);

      expect(fn.mock.calls[8][0]).toBe(9);
      expect(fn.mock.calls[8][1]).toEqual({ x: 2, y: 2 });
      expect(fn.mock.calls[8][2]).toBe(matrix);
    });

    test("map() should update each node", () => {
      matrix.map((value) => value + 1);

      expect(matrix.data).toEqual([
        [2, 3, 4],
        [5, 6, 7],
        [8, 9, 10],
      ]);
    });

    test("reduce() should operate on each node", () => {
      const result = matrix.reduce((sum, value) => sum + value, 0);

      expect(result).toBe(45);
    });

    test("transpose() should transpose the 2D array", () => {
      matrix.transpose();

      expect(matrix.data).toEqual([
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ]);
    });

    test("JSON.stringify() should return an object with { Matrix: data }", () => {
      expect(JSON.stringify(matrix)).toEqual(
        '{"Matrix":[[1,2,3],[4,5,6],[7,8,9]]}'
      );
    });

    describe("flip()", () => {
      test("flipping on the x-axis should reverse it horizontally", () => {
        matrix.flip({ axis: "x" });
        expect(matrix.data).toEqual([
          [3, 2, 1],
          [6, 5, 4],
          [9, 8, 7],
        ]);
      });

      test("flipping on the y-axis should reverse it vertically", () => {
        matrix.flip({ axis: "y" });
        expect(matrix.data).toEqual([
          [7, 8, 9],
          [4, 5, 6],
          [1, 2, 3],
        ]);
      });

      test("flipping on the y-axis with a given height should reverse it vertically with spaces in front", () => {
        matrix.flip({ axis: "y", height: 5 });
        expect(matrix.data).toEqual([[], [], [7, 8, 9], [4, 5, 6], [1, 2, 3]]);
      });
    });

    describe("split()", () => {
      describe("includeSplit: false", () => {
        test("when splitting on the x-axis, it should split horizontally", () => {
          const split = matrix.split({
            axis: "x",
            index: 1,
            includeSplit: false,
          });

          expect(matrix.data).toEqual([[1], [4], [7]]);
          expect(split.data).toEqual([[3], [6], [9]]);
        });

        test("when splitting on the y-axis, it should split vertically", () => {
          const split = matrix.split({
            axis: "y",
            index: 1,
            includeSplit: false,
          });

          expect(matrix.data).toEqual([[1, 2, 3]]);
          expect(split.data).toEqual([[7, 8, 9]]);
        });
      });

      describe("includeSplit: true", () => {
        test("when splitting on the x-axis, it should split horizontally", () => {
          const split = matrix.split({
            axis: "x",
            index: 1,
          });

          expect(matrix.data).toEqual([[1], [4], [7]]);
          expect(split.data).toEqual([
            [2, 3],
            [5, 6],
            [8, 9],
          ]);
        });

        test("when splitting on the y-axis, it should split vertically", () => {
          const split = matrix.split({
            axis: "y",
            index: 1,
          });

          expect(matrix.data).toEqual([[1, 2, 3]]);
          expect(split.data).toEqual([
            [4, 5, 6],
            [7, 8, 9],
          ]);
        });
      });
    });

    describe("getAdjacents()", () => {
      test("getAdjacents(coords) should return valid adjacent nodes", () => {
        const center = matrix.getAdjacents({ x: 1, y: 1 });
        const corner = matrix.getAdjacents({ x: 0, y: 0 });
        const side = matrix.getAdjacents({ x: 0, y: 1 });

        expect(corner.length).toBe(2);
        expect(corner).toContainEqual({ x: 1, y: 0, value: 2 });
        expect(corner).toContainEqual({ x: 0, y: 1, value: 4 });

        expect(center.length).toBe(4);
        expect(center).toContainEqual({ x: 1, y: 0, value: 2 });
        expect(center).toContainEqual({ x: 0, y: 1, value: 4 });
        expect(center).toContainEqual({ x: 2, y: 1, value: 6 });
        expect(center).toContainEqual({ x: 1, y: 2, value: 8 });

        expect(side.length).toBe(3);
        expect(side).toContainEqual({ x: 0, y: 0, value: 1 });
        expect(side).toContainEqual({ x: 1, y: 1, value: 5 });
        expect(side).toContainEqual({ x: 0, y: 2, value: 7 });
      });

      test("getAdjacents(coords, {includeDiagonals:true}) should return valid adjacent nodes including diagonals", () => {
        const center = matrix.getAdjacents(
          { x: 1, y: 1 },
          { includeDiagonals: true }
        );
        const corner = matrix.getAdjacents(
          { x: 0, y: 0 },
          { includeDiagonals: true }
        );
        const side = matrix.getAdjacents(
          { x: 0, y: 1 },
          { includeDiagonals: true }
        );

        expect(corner.length).toBe(3);
        expect(corner).toContainEqual({ x: 1, y: 0, value: 2 });
        expect(corner).toContainEqual({ x: 0, y: 1, value: 4 });
        expect(corner).toContainEqual({ x: 1, y: 1, value: 5 });

        expect(center.length).toBe(8);
        expect(center).toContainEqual({ x: 0, y: 0, value: 1 });
        expect(center).toContainEqual({ x: 1, y: 0, value: 2 });
        expect(center).toContainEqual({ x: 2, y: 0, value: 3 });
        expect(center).toContainEqual({ x: 0, y: 1, value: 4 });
        expect(center).toContainEqual({ x: 2, y: 1, value: 6 });
        expect(center).toContainEqual({ x: 0, y: 2, value: 7 });
        expect(center).toContainEqual({ x: 1, y: 2, value: 8 });
        expect(center).toContainEqual({ x: 2, y: 2, value: 9 });

        expect(side.length).toBe(5);
        expect(side).toContainEqual({ x: 0, y: 0, value: 1 });
        expect(side).toContainEqual({ x: 1, y: 0, value: 2 });
        expect(side).toContainEqual({ x: 1, y: 1, value: 5 });
        expect(side).toContainEqual({ x: 0, y: 2, value: 7 });
        expect(side).toContainEqual({ x: 1, y: 2, value: 8 });
      });
    });

    test("getAdjacents(coords, {includeDirections}) should return valid adjacent nodes including only given directions", () => {
      const topOnly = matrix.getAdjacents(
        { x: 1, y: 1 },
        { includeDirections: matrixFlags.TOP }
      );

      expect(topOnly.length).toBe(1);
      expect(topOnly).toContainEqual({ x: 1, y: 0, value: 2 });
    });

    describe("when invalid coordinates are provided", () => {
      test("get() should return the default value", () => {
        expect(matrix.get({ x: "foo", y: 2 }, { defaultValue: "foo" })).toBe(
          "foo"
        );
      });

      test("set() should do nothing", () => {
        matrix.set({ x: -1, y: 0 }, "foo");
        expect(matrix.data).toEqual([
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ]);
      });

      test("getAdjacents() should return an empty array", () => {
        expect(matrix.getAdjacents({ x: -1, y: 0 })).toEqual([]);
      });
    });

    describe("when coordinates are outside of bounds", () => {
      test("get() should return the default value", () => {
        expect(matrix.get({ x: 3, y: 0 }, { defaultValue: "foo" })).toBe("foo");
      });

      test("set(value) should do nothing", () => {
        matrix.set({ x: 3, y: 0 }, 10);
        expect(matrix.data).toEqual([
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ]);
      });

      test("set(value, {mustExist:false}) should add the new value", () => {
        matrix.set({ x: 3, y: 0 }, 10, { mustExist: false });
        expect(matrix.data).toEqual([
          [1, 2, 3, 10],
          [4, 5, 6],
          [7, 8, 9],
        ]);
      });

      test("getAdjacents() should return an empty array when far out of bounds", () => {
        expect(matrix.getAdjacents({ x: 10, y: 0 })).toEqual([]);
      });

      test("getAdjacents() should return edge values when just outside bounds", () => {
        expect(matrix.getAdjacents({ x: 3, y: 0 })).toEqual([
          { x: 2, y: 0, value: 3 },
        ]);
      });
    });

    describe("when valid coordinates are provided", () => {
      test("get() should return the correct node", () => {
        expect(matrix.get({ x: 1, y: 1 })).toBe(5);
        expect(matrix.get({ x: 1, y: 1 }, { defaultValue: "foo" })).toBe(5);
        expect(matrix.get({ x: 1, y: 1 }, { includeCoords: true })).toEqual({
          x: 1,
          y: 1,
          value: 5,
        });
      });

      test("set() should update the correct node", () => {
        const result = matrix.set({ x: 1, y: 1 }, 10);
        expect(matrix.data).toEqual([
          [1, 2, 3],
          [4, 10, 6],
          [7, 8, 9],
        ]);
        expect(result).toBe(matrix);
      });
    });

    describe("merge()", () => {
      let toMerge;

      beforeEach(() => {
        matrix = new Matrix([
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ]);

        toMerge = new Matrix();
        toMerge.set([0, 0], 10, { mustExist: false });
        toMerge.set([1, 1], -1, { mustExist: false });
        toMerge.set([2, 2], 100, { mustExist: false });
      });

      test("when called without a function, it should replace the values", () => {
        const result = matrix.merge(toMerge);

        expect(matrix.data).toEqual([
          [10, 2, 3],
          [4, -1, 6],
          [7, 8, 100],
        ]);
        expect(result).toBe(matrix);
      });

      test("when called with a function, it should replace the values based on that function", () => {
        const result = matrix.merge(toMerge, (a, b) => a * b + 1);

        expect(matrix.data).toEqual([
          [11, 2, 3],
          [4, -4, 6],
          [7, 8, 901],
        ]);
        expect(result).toBe(matrix);
      });
    });

    describe("given a sparsely populated matrix", () => {
      beforeEach(() => {
        matrix = new Matrix();
        matrix.set([0, 0], "x", { mustExist: false });
        matrix.set([10, 10], "y", { mustExist: false });
        matrix.set([20, 20], "z", { mustExist: false });
      });

      test("length() should be the number of elements set", () => {
        expect(matrix.length).toBe(3);
      });

      test("width() should be the widest row", () => {
        expect(matrix.width).toBe(21);
      });

      test("height() should be the length of the outer array", () => {
        expect(matrix.height).toBe(21);
      });

      test("forEach() should only run on the 3 elements", () => {
        const fn = vi.fn();
        matrix.forEach(fn);

        // It should be called 3 times
        expect(fn.mock.calls.length).toBe(3);

        // Test the calls
        expect(fn.mock.calls[0][0]).toBe("x");
        expect(fn.mock.calls[0][1]).toEqual({ x: 0, y: 0 });
        expect(fn.mock.calls[0][2]).toBe(matrix);

        expect(fn.mock.calls[1][0]).toBe("y");
        expect(fn.mock.calls[1][1]).toEqual({ x: 10, y: 10 });
        expect(fn.mock.calls[1][2]).toBe(matrix);

        expect(fn.mock.calls[2][0]).toBe("z");
        expect(fn.mock.calls[2][1]).toEqual({ x: 20, y: 20 });
        expect(fn.mock.calls[2][2]).toBe(matrix);
      });
    });
  });
});
