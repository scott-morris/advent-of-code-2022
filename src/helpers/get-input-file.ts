// Libraries

import chalk from 'chalk';
import { path } from 'path';

// Dependencies

const fs = require('./fs-extravaganza');

// Public

/**
 * Get the input file name for the given day.
 * @param {Number} dayNumber the number of the day to get the input file for
 * @returns {String} the path to the input file
 */
function getInputFile(dayNumber) {
  const paddedNumber = dayNumber.toString().padStart(2, '0').slice(-2);
  const fileName = path.resolve(
    __dirname,
    `../../data/input-${paddedNumber}.data`
  );

  // Check for existence of file. If it does not exist, provide a user-friendly error message.
  if (!fs.existsSync(fileName)) {
    console.log(
      `${chalk.bold.red('ERROR:')} The input file ${chalk.blue.underline(
        fileName
      )} does not exist. Please create it before continuing.`
    );
    process.exit(1);
  }

  return fileName;
}

module.exports = getInputFile;
