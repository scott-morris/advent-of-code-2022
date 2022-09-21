// Libraries

const fs = require('fs-extra');

// Additional Functions

/**
 * Read a file and return an array of strings from the lines.
 * @param {String} filePath the path to the file
 * @param {Object} options the options to pass along to fs.readFile
 * @returns {Array<String>}
 */
function readArraySync(filePath, { delimiter = '\n', ...fsOptions } = {}) {
  const raw = fs.readFileSync(filePath, fsOptions);

  return raw.toString().split(delimiter);
}

/**
 * Read a file of a list of numbers and return it as an array of numbers.
 * @param {String} filePath the path to the file
 * @param {Object} options the options to pass along to fs.readFile
 * @returns {Array<Number>}
 */
function readNumbersSync(filePath, options) {
  return readArraySync(filePath, options).map(Number);
}

module.exports = {
  ...fs,
  readArraySync,
  readNumbersSync,
};
