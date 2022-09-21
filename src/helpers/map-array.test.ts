// Libraries

import { describe, it, expect, vi, afterEach } from "vitest";

// Dependencies

const MapArray = require("./map-array");

// Test

describe("Class: MapArray", () => {
  describe("given no constructing data", () => {});

  describe("given constructing data", () => {
    test("it should accept arrays", () => {
      const mapArray = new MapArray([
        ["lukeSkywalker", ["darthVader", "leiaOrgana"]],
      ]);

      expect(mapArray.get("lukeSkywalker")).toBeInstanceOf(Set);
      expect(Array.from(mapArray.get("lukeSkywalker"))).toEqual([
        "darthVader",
        "leiaOrgana",
      ]);
    });

    test("it should accept objects with arrays", () => {
      const mapArray = new MapArray({
        lukeSkywalker: ["darthVader", "leiaOrgana"],
      });

      expect(mapArray.get("lukeSkywalker")).toBeInstanceOf(Set);
      expect(Array.from(mapArray.get("lukeSkywalker"))).toEqual([
        "darthVader",
        "leiaOrgana",
      ]);
    });

    test("it should accept objects with Sets", () => {
      const newSet = new Set(["darthVader", "leiaOrgana"]);

      const mapArray = new MapArray({
        lukeSkywalker: newSet,
      });

      expect(mapArray.map.get("lukeSkywalker")).toEqual(newSet);
      expect(mapArray.map.get("lukeSkywalker")).not.toBe(newSet);
    });

    describe("copying a MapArray", () => {
      const original = new MapArray({
        lukeSkywalker: new Set(["darthVader", "leiaOrgana"]),
      });
      let copy;

      beforeEach(() => {
        copy = new MapArray(original);
      });

      test("it should match the signature of the original", () => {
        expect(copy.map.get("lukeSkywalker")).toEqual(
          new Set(["darthVader", "leiaOrgana"])
        );
      });

      test("it should equal but should not be the same Map", () => {
        expect(copy.map).toEqual(original.map);
        expect(copy.map).not.toBe(original.map);
      });

      test("it should equal but should not contain the same Sets", () => {
        expect(copy.get("lukeSkywalker")).toEqual(
          original.get("lukeSkywalker")
        );
        expect(copy.get("lukeSkywalker")).not.toBe(
          original.get("lukeSkywalker")
        );
      });
    });
  });

  describe("given a known MapArray", () => {
    let mapArray;

    beforeEach(() => {
      mapArray = new MapArray({
        darthVader: new Set(["lukeSkywalker", "leiaOrgana"]),
        lukeSkywalker: new Set(["darthVader", "leiaOrgana", "c3po"]),
        hanSolo: new Set(["leiaOrgana", "chewbacca"]),
        c3po: new Set(["r2d2", "lukeSkywalker"]),
        leiaOrgana: new Set(["lukeSkywalker", "darthVader", "hanSolo"]),
        chewbacca: new Set(["hanSolo"]),
        r2d2: new Set(["c3po"]),
      });
    });

    test("clear()", () => {
      mapArray.clear();
      expect(mapArray.size).toBe(0);
    });

    test("delete()", () => {
      mapArray.delete("darthVader");

      expect(mapArray.size).toBe(6);
      expect(mapArray.has("darthVader")).toBe(false);
    });

    test("entries()", () => {
      const entries = Array.from(mapArray.entries());

      expect(entries).toEqual([
        ["darthVader", new Set(["lukeSkywalker", "leiaOrgana"])],
        ["lukeSkywalker", new Set(["darthVader", "leiaOrgana", "c3po"])],
        ["hanSolo", new Set(["leiaOrgana", "chewbacca"])],
        ["c3po", new Set(["r2d2", "lukeSkywalker"])],
        ["leiaOrgana", new Set(["lukeSkywalker", "darthVader", "hanSolo"])],
        ["chewbacca", new Set(["hanSolo"])],
        ["r2d2", new Set(["c3po"])],
      ]);
    });

    test("forEach()", () => {
      const fn = vi.fn();
      mapArray.forEach(fn);

      expect(fn.mock.calls.length).toBe(7);
    });

    test("keys()", () => {
      const keys = Array.from(mapArray.keys());

      expect(keys).toEqual([
        "darthVader",
        "lukeSkywalker",
        "hanSolo",
        "c3po",
        "leiaOrgana",
        "chewbacca",
        "r2d2",
      ]);
    });

    test("values()", () => {
      const values = Array.from(mapArray.values());

      expect(values).toEqual([
        new Set(["lukeSkywalker", "leiaOrgana"]),
        new Set(["darthVader", "leiaOrgana", "c3po"]),
        new Set(["leiaOrgana", "chewbacca"]),
        new Set(["r2d2", "lukeSkywalker"]),
        new Set(["lukeSkywalker", "darthVader", "hanSolo"]),
        new Set(["hanSolo"]),
        new Set(["c3po"]),
      ]);
    });

    test("toJSON()", () => {
      expect(JSON.stringify(mapArray)).toEqual(
        '{"MapArray":{"darthVader":["lukeSkywalker","leiaOrgana"],"lukeSkywalker":["darthVader","leiaOrgana","c3po"],"hanSolo":["leiaOrgana","chewbacca"],"c3po":["r2d2","lukeSkywalker"],"leiaOrgana":["lukeSkywalker","darthVader","hanSolo"],"chewbacca":["hanSolo"],"r2d2":["c3po"]}}'
      );
    });

    describe("using a missing key", () => {
      test("add(key, Primitive) should create a new Set", () => {
        mapArray.add("emperorPalpatine", "darthVader");

        expect(mapArray.has("emperorPalpatine")).toBe(true);
        expect(mapArray.get("emperorPalpatine")).toEqual(
          new Set(["darthVader"])
        );
      });

      test("add(key, Array) should create a new Set", () => {
        mapArray.add("emperorPalpatine", ["darthVader", "darthMaul"]);

        expect(mapArray.has("emperorPalpatine")).toBe(true);
        expect(mapArray.get("emperorPalpatine")).toEqual(
          new Set(["darthVader", "darthMaul"])
        );
      });

      test("add(key, Set) should create a new copy of the Set", () => {
        const newSet = new Set(["darthVader", "darthMaul"]);
        mapArray.add("emperorPalpatine", newSet);

        expect(mapArray.has("emperorPalpatine")).toBe(true);
        expect(mapArray.get("emperorPalpatine")).toEqual(newSet);
        expect(mapArray.get("emperorPalpatine")).not.toBe(newSet);
      });

      test("get() should return undefined", () => {
        expect(mapArray.get("lukeSkywalker")).toEqual(
          new Set(["darthVader", "leiaOrgana", "c3po"])
        );
      });

      test("getArray() should return an empty array", () => {
        expect(mapArray.getArray("lukeSkywalker")).toEqual([
          "darthVader",
          "leiaOrgana",
          "c3po",
        ]);
      });

      test("has() should be false", () => {
        expect(mapArray.has("emperorPalpatine")).toBe(false);
      });

      test("set(key, String) should create a new Set", () => {
        mapArray.set("hanSolo", "kyloRen");
        expect(mapArray.get("hanSolo")).toEqual(new Set(["kyloRen"]));
      });

      test("set(key, Array) should create a new Set", () => {
        mapArray.set("hanSolo", ["kyloRen", "chewbacca"]);
        expect(mapArray.get("hanSolo")).toEqual(
          new Set(["kyloRen", "chewbacca"])
        );
      });

      test("set(key, Set) should add a copy of the set", () => {
        const newSet = new Set(["kyloRen", "chewbacca"]);
        mapArray.set("hanSolo", newSet);

        expect(mapArray.get("hanSolo")).toEqual(newSet);
        expect(mapArray.get("hanSolo")).not.toBe(newSet);
      });

      test("remove() should not change the MapArray", () => {
        mapArray.remove("emperorPalpatine", "chewbacca");
        expect(Array.from(mapArray.entries())).toEqual([
          ["darthVader", new Set(["lukeSkywalker", "leiaOrgana"])],
          ["lukeSkywalker", new Set(["darthVader", "leiaOrgana", "c3po"])],
          ["hanSolo", new Set(["leiaOrgana", "chewbacca"])],
          ["c3po", new Set(["r2d2", "lukeSkywalker"])],
          ["leiaOrgana", new Set(["lukeSkywalker", "darthVader", "hanSolo"])],
          ["chewbacca", new Set(["hanSolo"])],
          ["r2d2", new Set(["c3po"])],
        ]);
      });
    });

    describe("using a valid key", () => {
      test("add(key, newValue) should be added", () => {
        mapArray.add("lukeSkywalker", "r2d2");

        expect(Array.from(mapArray.entries())).toEqual([
          ["darthVader", new Set(["lukeSkywalker", "leiaOrgana"])],
          [
            "lukeSkywalker",
            new Set(["darthVader", "leiaOrgana", "c3po", "r2d2"]),
          ],
          ["hanSolo", new Set(["leiaOrgana", "chewbacca"])],
          ["c3po", new Set(["r2d2", "lukeSkywalker"])],
          ["leiaOrgana", new Set(["lukeSkywalker", "darthVader", "hanSolo"])],
          ["chewbacca", new Set(["hanSolo"])],
          ["r2d2", new Set(["c3po"])],
        ]);
      });

      test("add(key, existingValue) existing value should not add", () => {
        mapArray.add("lukeSkywalker", "darthVader");
        expect(Array.from(mapArray.entries())).toEqual([
          ["darthVader", new Set(["lukeSkywalker", "leiaOrgana"])],
          ["lukeSkywalker", new Set(["darthVader", "leiaOrgana", "c3po"])],
          ["hanSolo", new Set(["leiaOrgana", "chewbacca"])],
          ["c3po", new Set(["r2d2", "lukeSkywalker"])],
          ["leiaOrgana", new Set(["lukeSkywalker", "darthVader", "hanSolo"])],
          ["chewbacca", new Set(["hanSolo"])],
          ["r2d2", new Set(["c3po"])],
        ]);
      });

      test("get() should return the Set", () => {
        expect(mapArray.get("lukeSkywalker")).toEqual(
          new Set(["darthVader", "leiaOrgana", "c3po"])
        );
      });

      test("getArray() should return an Array", () => {
        expect(mapArray.getArray("lukeSkywalker")).toEqual([
          "darthVader",
          "leiaOrgana",
          "c3po",
        ]);
      });

      test("has() should return true", () => {
        expect(mapArray.has("lukeSkywalker")).toBe(true);
      });

      test("set(key, String) should overwrite with a new Set", () => {
        mapArray.set("r2d2", "obiWanKenobi");
        expect(mapArray.get("r2d2")).toEqual(new Set(["obiWanKenobi"]));
      });

      test("set(key, Array) should overwrite with a new Set", () => {
        mapArray.set("r2d2", ["obiWanKenobi", "quiGonGinn"]);
        expect(mapArray.get("r2d2")).toEqual(
          new Set(["obiWanKenobi", "quiGonGinn"])
        );
      });

      test("set(key, Set) should overwrite with the set", () => {
        mapArray.set("r2d2", new Set(["obiWanKenobi", "quiGonGinn"]));
        expect(mapArray.get("r2d2")).toEqual(
          new Set(["obiWanKenobi", "quiGonGinn"])
        );
      });

      test("remove(key, nonExistingValue) should not change the MapArray", () => {
        mapArray.remove("darthVader", "chewbacca");
        expect(Array.from(mapArray.entries())).toEqual([
          ["darthVader", new Set(["lukeSkywalker", "leiaOrgana"])],
          ["lukeSkywalker", new Set(["darthVader", "leiaOrgana", "c3po"])],
          ["hanSolo", new Set(["leiaOrgana", "chewbacca"])],
          ["c3po", new Set(["r2d2", "lukeSkywalker"])],
          ["leiaOrgana", new Set(["lukeSkywalker", "darthVader", "hanSolo"])],
          ["chewbacca", new Set(["hanSolo"])],
          ["r2d2", new Set(["c3po"])],
        ]);
      });

      test("remove(key, existingValue) should remove the item from the Map", () => {
        mapArray.remove("hanSolo", "leiaOrgana");
        expect(Array.from(mapArray.entries())).toEqual([
          ["darthVader", new Set(["lukeSkywalker", "leiaOrgana"])],
          ["lukeSkywalker", new Set(["darthVader", "leiaOrgana", "c3po"])],
          ["hanSolo", new Set(["chewbacca"])],
          ["c3po", new Set(["r2d2", "lukeSkywalker"])],
          ["leiaOrgana", new Set(["lukeSkywalker", "darthVader", "hanSolo"])],
          ["chewbacca", new Set(["hanSolo"])],
          ["r2d2", new Set(["c3po"])],
        ]);
      });
    });

    describe("when a value does not exist", () => {
      test("removeAll() should not change the MapArray", () => {
        mapArray.removeAll("emperorPalpatine");
        expect(Array.from(mapArray.entries())).toEqual([
          ["darthVader", new Set(["lukeSkywalker", "leiaOrgana"])],
          ["lukeSkywalker", new Set(["darthVader", "leiaOrgana", "c3po"])],
          ["hanSolo", new Set(["leiaOrgana", "chewbacca"])],
          ["c3po", new Set(["r2d2", "lukeSkywalker"])],
          ["leiaOrgana", new Set(["lukeSkywalker", "darthVader", "hanSolo"])],
          ["chewbacca", new Set(["hanSolo"])],
          ["r2d2", new Set(["c3po"])],
        ]);
      });
    });

    describe("when a value exists", () => {
      test("removeAll() should remove the item from the Map", () => {
        mapArray.removeAll("darthVader");
        expect(mapArray.has("darthVader")).toBe(false);
      });

      test("removeAll() should remove the item from all of the Sets", () => {
        mapArray.removeAll("darthVader");
        expect(Array.from(mapArray.entries())).toEqual([
          ["lukeSkywalker", new Set(["leiaOrgana", "c3po"])],
          ["hanSolo", new Set(["leiaOrgana", "chewbacca"])],
          ["c3po", new Set(["r2d2", "lukeSkywalker"])],
          ["leiaOrgana", new Set(["lukeSkywalker", "hanSolo"])],
          ["chewbacca", new Set(["hanSolo"])],
          ["r2d2", new Set(["c3po"])],
        ]);
      });
    });
  });
});
