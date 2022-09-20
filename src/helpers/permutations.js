/* eslint-disable max-classes-per-file */
// Dependencies

class Options extends Array {}
class DynamicOptions {
  constructor(fn) {
    this.fn = fn;
  }

  run(...args) {
    return this.fn(...args);
  }
}

// Private

function isOption(val) {
  return val instanceof Options || val instanceof DynamicOptions;
}

function getArrayPermutations(arr) {
  let index = -1;

  if (
    !arr.some((item, i) => {
      if (isOption(item)) {
        index = i;
        return true;
      }
      return false;
    })
  ) {
    return [arr];
  }

  const previousItems = arr.slice(0, index) || [];
  const nextItems = arr.slice(index + 1) || [];

  const permutations = [];

  const addPermutations = (item) => {
    const nextPermutations = getArrayPermutations(nextItems);
    permutations.push(
      ...nextPermutations.map((next) => [...previousItems, ...item, ...next])
    );
  };

  if (arr[index] instanceof DynamicOptions) {
    const result = arr[index].run(nextItems, previousItems, index, arr);
    const options = getArrayPermutations(result);

    if (options[0] === result) {
      result.forEach((item) => addPermutations([item]));
    } else {
      options.forEach(addPermutations);
    }
  } else {
    arr[index].forEach((item) => addPermutations([item]));
  }

  return permutations;
}

function getObjectPermutations(obj) {
  let prop;

  if (
    !Object.keys(obj).some((key) => {
      if (isOption(obj[key])) {
        prop = key;
        return true;
      }
      return false;
    })
  ) {
    return [obj];
  }

  const { [prop]: opts, ...remainingObj } = obj;

  const permutations = [];

  const optsArray =
    opts instanceof DynamicOptions ? opts.run(remainingObj) : opts;
  const optObjs = optsArray.map((opt) => ({ [prop]: opt }));

  optObjs.forEach((optObj) => {
    const nextPermutations = getObjectPermutations(remainingObj);
    permutations.push(
      ...nextPermutations.map((nextObj) => ({ ...optObj, ...nextObj }))
    );
  });

  return permutations;
}

// Public

function getPermutations(obj, fn) {
  return Array.isArray(obj)
    ? getArrayPermutations(obj, fn)
    : getObjectPermutations(obj, fn);
}

module.exports = { Options, DynamicOptions, getPermutations };
