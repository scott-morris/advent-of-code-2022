// deno-lint-ignore-file no-explicit-any

// Dependencies

// Types

export type SimpleKey = string | number | symbol;

// Public

(BigInt.prototype as any).toJSON = function () {
  return `${this.toString()}n`;
};

export const copy = <T>(obj: T): T =>
  JSON.parse(JSON.stringify(obj), (_key, value) => {
    return typeof value === "string" && value.match(/^\d+n$/)
      ? BigInt(value.replace("n", ""))
      : value;
  });

export function get(obj: any, key: SimpleKey[], defaultValue: any) {
  return key.reduce((pointer, step) => {
    if (typeof pointer !== "object") {
      return defaultValue;
    }

    const newType = typeof pointer[step];

    return ["string", "number", "object"].includes(newType)
      ? pointer[step]
      : defaultValue;
  }, obj);
}

export function set(obj: any, keys: SimpleKey[], value: any): any {
  if (keys.length === 1) {
    return { ...obj, [keys[0]]: value };
  } else {
    const [firstKey, ...remainingKeys] = keys;
    return {
      ...obj,
      [firstKey]: set(obj[firstKey] || {}, remainingKeys, value),
    };
  }
}
