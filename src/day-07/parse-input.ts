// Dependencies

import { parseStringArray } from "../helpers/parse.ts";
import { set } from "../helpers/simple-object.ts";
import "../types/global.d.ts";
import "./types.d.ts";

// Private

const REGEX_CD_COMMAND = /^\$ cd (.*)$/;
const REGEX_FILE = /^(\d+) (.*)$/;

// Turns out I don't need these after all
// const REGEX_LS_COMMAND = /^\$ ls$/;
// const REGEX_FOLDER = /^dir (.*)$/;

type Command = string | null;

interface File {
  fileName: string;
  fileSize: number;
}

function parseCDcommand(line: string): Command {
  const result = line.match(REGEX_CD_COMMAND);

  return result === null ? null : result[1];
}

function parseFileSpec(line: string): File {
  const result = line.match(REGEX_FILE);

  return result === null
    ? { fileName: "NOT FOUND", fileSize: 0 }
    : { fileSize: Number(result[1]), fileName: result[2] };
}

// Public

export default function parseInput(input: RawInput): Day07Input {
  const lines = parseStringArray(input, "\n");

  let fs: Folder = {};

  const pointer: string[] = [];

  const changeFolder = (cmd: Command) => {
    if (cmd === "..") {
      pointer.pop();
    } else if (cmd !== null) {
      pointer.push(cmd);
    }
  };

  const addFile = (file: File) => {
    fs = set(fs, [...pointer, file.fileName], file.fileSize);
  };

  lines.forEach((line) => {
    console.log(`processing: "${line}"`);
    if (REGEX_CD_COMMAND.test(line)) {
      console.log(`changing dir`);
      changeFolder(parseCDcommand(line));
    } else if (REGEX_FILE.test(line)) {
      console.log(`adding file`);
      addFile(parseFileSpec(line));
    }
  });

  return fs;
}
