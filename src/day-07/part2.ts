// Dependencies

import { getAllFolderSizes } from "./part1.ts";

// Types

import "../types/global.d.ts";
import "./types.d.ts";

// Private

const TOTAL_DISK_SPACE = 70000000;
const REQUIRED_SPACE = 30000000;

// Public

export default function part2(input: Day07Input): Answer {
  const folders = getAllFolderSizes(input);

  const freeSpace = TOTAL_DISK_SPACE - (folders.get("/") || 0);
  const purgeRequired = REQUIRED_SPACE - freeSpace;

  const folderSizes = [...folders.values()];
  const foldersToConsider = folderSizes.filter((size) => size >= purgeRequired);
  foldersToConsider.sort((a, b) => a - b);

  return foldersToConsider[0];
}
