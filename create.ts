#!/usr/bin/env -S deno run --allow-env --allow-read --allow-write

// Libraries

import { Command } from "https://deno.land/x/cmd@v1.2.0/commander/index.ts";
import { renderFile, configure } from "https://deno.land/x/eta@v1.11.0/mod.ts";
import * as path from "https://deno.land/std@0.166.0/path/mod.ts";

// Dependencies

// Setup

const TEMPLATE_DIRECTORY = path.resolve(Deno.cwd(), "./src/template");

configure({
  views: TEMPLATE_DIRECTORY,
});

const program = new Command("create.ts");

program.version("0.0.1");

let dayValue;
program
  .arguments("<day>")
  ?.option("-v, --verbose", "enable verbose mode")
  ?.action(function (day) {
    dayValue = day;
  });

program.parse(Deno.args);

// Check parameters

if (isNaN(Number(dayValue))) {
  console.error(`Invalid day given: "${dayValue}"`);
  Deno.exit(1);
}

(async function applyTemplate(dayValue) {
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
})(dayValue);
