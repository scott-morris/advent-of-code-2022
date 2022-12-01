// Public

export async function pathExists(path: string | URL): Promise<boolean> {
  try {
    await Deno.stat(path);
    return true;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw err;
    }
  }
}

export async function directoryExists(path: string | URL): Promise<boolean> {
  try {
    const fileInfo = await Deno.stat(path);
    return fileInfo.isDirectory;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw err;
    }
  }
}

export async function fileExists(path: string | URL): Promise<boolean> {
  try {
    const fileInfo = await Deno.stat(path);
    return fileInfo.isFile;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw err;
    }
  }
}

export async function readFile(
  path: string | URL,
  options?: Deno.ReadFileOptions | undefined
): Promise<string> {
  if (!(await fileExists(path))) {
    return "";
  }
  const data = await Deno.readFile(path, options);
  return new TextDecoder("utf-8").decode(data);
}
