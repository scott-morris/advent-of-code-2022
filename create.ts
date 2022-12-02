#!/usr/bin/env -S deno run --allow-env --allow-read --allow-write

// Libraries

import { Command } from "https://deno.land/x/cmd@v1.2.0/commander/index.ts";
import { renderFile, configure } from "https://deno.land/x/eta@v1.11.0/mod.ts";

// Dependencies

import { path } from "./src/helpers/fs.ts";

// Setup

const TEMPLATE_DIRECTORY = path.resolve(Deno.cwd(), "./src/template");
const DATA_DIRECTORY = path.resolve(Deno.cwd(), "./data");
const COOKIE_FILE = path.resolve(Deno.cwd(), "./session.env");

configure({
  views: TEMPLATE_DIRECTORY,
});

const program = new Command("create.ts");

program.version("0.0.1");

let dayValue;
let downloadFlag;
program
  .arguments("[day]")
  ?.option("-d, --download", "download user data")
  ?.option("-n, --no-download", "do not download user data")
  ?.action(function (day, cmdObj) {
    dayValue = day;

    downloadFlag = cmdObj?.download ?? undefined;
  });

program.parse(Deno.args);

// Check parameters

if (isNaN(Number(dayValue))) {
  dayValue = prompt("Please enter a day between 1-25:");
}

if (isNaN(Number(dayValue)) || Number(dayValue) < 1 || Number(dayValue) > 25) {
  console.error(`Invalid day given: "${dayValue}"`);
  Deno.exit(1);
}

(async (dayValue) => {
  const encoder = new TextEncoder();

  const data = {
    day: Number(dayValue),
    dayString: `00${dayValue}`.slice(-2),
  };

  const outputDirectory = path.join(Deno.cwd(), `./src/day-${data.dayString}`);

  await Deno.mkdir(outputDirectory, {
    recursive: true,
  });

  for await (const dirEntry of Deno.readDir(TEMPLATE_DIRECTORY)) {
    const inputFile = path.join(TEMPLATE_DIRECTORY, dirEntry.name);
    const outputFile = path.join(outputDirectory, dirEntry.name);

    const templateResult = await renderFile(inputFile, data);
    await Deno.writeFile(outputFile, encoder.encode(templateResult));
  }

  const getInputData =
    downloadFlag === undefined
      ? confirm("Do you want to download your input data?")
      : downloadFlag;

  if (getInputData) {
    // get input data
  }
})(dayValue);
