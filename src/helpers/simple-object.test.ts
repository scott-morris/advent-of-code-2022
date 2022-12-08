// Libraries

import {
  assertEquals,
  assertNotStrictEquals,
} from "https://deno.land/std@0.164.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.164.0/testing/bdd.ts";

// Dependencies

import { copy, get, set } from "./simple-object.ts";

// Test

describe("simple-object.ts", () => {
  describe("copy()", () => {
    describe("given a simple object to copy", () => {
      const originalObject = {
        qux: "qux",
        foo: { bar: "foo.bar" },
        baz: ["lorem", 42, "ipsum"],
      };

      const objectCopy = copy(originalObject);

      it("the values should match", () => {
        assertEquals(originalObject, objectCopy);
      });

      it("the variables should not point to the same object", () => {
        assertNotStrictEquals(originalObject, objectCopy);
      });
    });
  });

  describe("get()", () => {
    const obj = {
      qux: "qux",
      foo: { bar: "foo.bar" },
      baz: ["lorem", 42, "ipsum"],
    };

    describe("from valid paths", () => {
      it("basic get", () => {
        const result = get(obj, ["qux"], "");
        assertEquals(result, "qux");
      });

      it("deeper get", () => {
        const result = get(obj, ["foo", "bar"], "");
        assertEquals(result, "foo.bar");
      });

      it("get from array", () => {
        assertEquals(get(obj, ["baz", 0], -1), "lorem");
        assertEquals(get(obj, ["baz", 1], ""), 42);
      });
    });

    describe("from empty paths", () => {
      it("basic get", () => {
        assertEquals(get(obj, ["notThere"], ""), "");
        assertEquals(get(obj, ["notThere"], "foo"), "foo");
      });

      it("deeper get", () => {
        assertEquals(get(obj, ["foo", "notThere"], ""), "");
        assertEquals(get(obj, ["baz", "notThere"], "foo"), "foo");
        assertEquals(
          get(obj, ["baz", "notThere", "orHere", "either"], "whoa"),
          "whoa"
        );
      });
    });
  });

  describe("set()", () => {
    describe("simple use", () => {
      it("can add a string", () => {
        const result = set({}, ["foo"], "foo value");
        assertEquals(result, { foo: "foo value" });
      });

      it("can add a number", () => {
        const result = set({}, ["foo"], 42);
        assertEquals(result, { foo: 42 });
      });

      it("can add parameters to an existing object", () => {
        const result = set({ foo: "foo" }, ["bar"], "bar");
        assertEquals(result, { foo: "foo", bar: "bar" });
      });
    });

    describe("deeper use", () => {
      it("can add nested objects", () => {
        const result = set({}, ["foo", "bar"], 42);
        assertEquals(result, { foo: { bar: 42 } });
      });

      it("can add nested parameters to existing objects", () => {
        const result = set({ foo: { bar: 42 } }, ["foo", "baz"], "foo.baz");
        assertEquals(result, { foo: { bar: 42, baz: "foo.baz" } });
      });
    });
  });
});
