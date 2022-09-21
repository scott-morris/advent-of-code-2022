// Dependencies

const {
  countValues,
  factorial,
  mean,
  median,
  mode,
  round,
  stdDev,
  sum,
  transpose,
} = require('./math');

// Tests

describe('math.js: ', () => {
  describe('countValues', () => {
    test('when given an array, it should return a Map containing the number of times a value appears in the array', () => {
      const result = countValues(['foo', 'bar', 'foo', 'baz', 'foo', 'baz']);

      expect(result).toBeInstanceOf(Map);

      const parsedResult = Array.from(result, ([name, value]) => [name, value]);
      expect(parsedResult).toEqual([
        ['foo', 3],
        ['bar', 1],
        ['baz', 2],
      ]);
    });

    test('when given an object, it should return a Map containing the number of times a value appears in a property', () => {
      const result = countValues({
        a: 'foo',
        b: 'bar',
        c: 'foo',
      });

      expect(result).toBeInstanceOf(Map);

      const parsedResult = Array.from(result, ([name, value]) => [name, value]);
      expect(parsedResult).toEqual([
        ['foo', 2],
        ['bar', 1],
      ]);
    });
  });

  describe('factorial', () => {
    test('it should calculate factorial correctly', () => {
      expect(factorial(3)).toEqual(6);
      expect(factorial(4)).toEqual(10);
    });
  });

  describe('mean', () => {
    test('it should calculate mean correctly', () => {
      expect(mean([3, 5, 4, 4, 1, 1, 2, 3])).toEqual(2.875);
    });
  });

  describe('median', () => {
    test('it should calculate median correctly', () => {
      expect(median([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(5.5);
      expect(median([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual(5);
    });
  });

  describe('mode', () => {
    test('it should calculate mode correctly', () => {
      expect(mode([3, 5, 4, 4, 1, 1, 2, 3])).toEqual([1, 3, 4]);
    });
  });

  describe('round', () => {
    test('it should round to the number of places', () => {
      expect(round(13.284434142114991, 8)).toEqual(13.28443414);
      expect(round(13.284434142114991, 4)).toEqual(13.2844);
      expect(round(13.284434142114991, 1)).toEqual(13.3);
      expect(round(13.284434142114991, 0)).toEqual(13);
      expect(round(Math.PI, 2)).toEqual(3.14);
    });
  });

  describe('stdDev', () => {
    test('it should calculate stdDev correctly', () => {
      const result = stdDev([10, 2, 38, 23, 38, 23, 21]);

      // test at 8 decimal places for consistency
      expect(round(result, 8)).toEqual(13.28443414);
    });

    test('it should calculate stdDev with population correctly', () => {
      const result = stdDev([10, 2, 38, 23, 38, 23, 21], true);

      // test at 8 decimal places for consistency
      expect(round(result, 8)).toEqual(12.29899614);
    });
  });

  describe('sum', () => {
    test('it should calculate sum correctly', () => {
      expect(sum([3, 5, 4, 4, 1, 1, 2, 3])).toEqual(23);
    });
  });

  describe('transpose', () => {
    test('it should transpose a 2-dimensional array', () => {
      const input = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      const expectedOutput = [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ];

      expect(transpose(input)).toEqual(expectedOutput);
    });
  });
});
