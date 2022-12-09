// Libraries

import { assertEquals } from "https://deno.land/std@0.164.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.164.0/testing/bdd.ts";

// Dependencies

import Matrix from "./matrix.ts";

// Tests

describe("matrix.ts", () => {
  describe("constructor function", () => {
    it("simple implementation", () => {
      const input = [
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["g", "h", "i"],
      ];
      const result = new Matrix(input);

      assertEquals(result.data, input);
    });

    it("with process function", () => {
      const input = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
      ];

      const expected = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];

      const result = new Matrix(input, Number);

      assertEquals(result.data, expected);
    });
  });

  describe("gets", () => {
    const data = [["a", "b", "c"], ["d", "e", "f", "g"], ["h"]];
    const matrix = new Matrix(data);

    it("matrix.length", () => {
      assertEquals(matrix.length, 8);
    });

    it("matrix.width", () => {
      assertEquals(matrix.width, 4);
    });

    it("matrix.height", () => {
      assertEquals(matrix.height, 3);
    });
  });

  describe("functions", () => {
    const input = [
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "i"],
    ];
    const matrix = new Matrix(input);

    it("getRow()", () => {
      assertEquals(matrix.getRow(1), ["d", "e", "f"]);
    });

    it("getColumn()", () => {
      assertEquals(matrix.getColumn(0), ["a", "d", "g"]);
    });
  });
});
