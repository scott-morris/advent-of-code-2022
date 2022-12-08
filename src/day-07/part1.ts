// Dependencies

// Types

import "../types/global.d.ts";
import "./types.d.ts";

// Private

const UPPER_LIMIT = 100000;

// Public

export function getFolderSize(
  folder: Folder,
  path = "",
  onFolder?: (path: string, size: number) => void
): number {
  const result = Object.keys(folder).reduce((sum: number, key) => {
    const item = folder[key];

    if (typeof item === "number") {
      return sum + item;
    }

    const trigger = typeof onFolder === "function" ? onFolder : () => {};

    const folderPath = key === "/" ? key : `${path === "/" ? "" : path}/${key}`;

    const size = getFolderSize(item, folderPath, (path, size) => {
      trigger(path, size);
    });

    trigger(folderPath, size);

    return sum + size;
  }, 0);

  return result;
}

export function getAllFolderSizes(folder: Folder): Map<string, number> {
  const folders = new Map();

  getFolderSize(folder, "", (folder, size) => {
    folders.set(folder, size);
  });

  return folders;
}

export default function part1(input: Day07Input): Answer {
  const folders = getAllFolderSizes(input);

  let sum = 0;

  folders.forEach((size) => {
    if (size <= UPPER_LIMIT) {
      sum += size;
    }
  });

  return sum;
}
