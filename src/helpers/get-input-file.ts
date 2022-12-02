// Libraries

import chalk from "https://deno.land/x/chalk_deno@v4.1.1-deno/source/index.js";
import { fileExists, readFile, path } from "./fs.ts";
import "../types/global.d.ts";

// Private

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

// Public

/**
 * Get the input file name for the given day.
 * @param {Number} dayNumber the number of the day to get the input file for
 * @returns {String} the path to the input file
 */
export default async function getInputFile(
  dayNumber: number
): Promise<RawInput> {
  const paddedNumber = dayNumber.toString().padStart(2, "0").slice(-2);
  const fileName = path.resolve(
    __dirname,
    `../../data/input-${paddedNumber}.data`
  );

  // Check for existence of file. If it does not exist, provide a user-friendly error message.
  if (!(await fileExists(fileName))) {
    console.log(
      `${chalk.bold.red("ERROR:")} The input file ${chalk.blue.underline(
        fileName
      )} does not exist. Please create it before continuing.`
    );
    Deno.exit(1);
  }

  return await readFile(fileName);
}
