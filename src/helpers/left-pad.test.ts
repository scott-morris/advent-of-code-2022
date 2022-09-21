// Dependencies

const leftPad = require('./left-pad');

// Test

describe('leftPad()', () => {
  describe('when no parameters are specified', () => {
    test('it should pad as a two digit number', () => {
      expect(leftPad('1')).toBe('01');
    });
  });

  describe('when parameters are specified', () => {
    test('it should pad with the given prefix character', () => {
      expect(leftPad('1', { padWith: '.' })).toBe('.1');
    });

    test('it should pad with the given width', () => {
      expect(leftPad('1', { width: 3 })).toBe('001');
    });

    test('it should pad with the given prefix character and width', () => {
      expect(leftPad('1', { padWith: '.', width: 3 })).toBe('..1');
    });
  });
});
