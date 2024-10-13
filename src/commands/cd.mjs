import { isAbsolute, normalize, join } from "node:path";
import { access } from "node:fs/promises";

export async function cd(currentPath, cdArg) {
  const targetPath = normalize(cdArg);

  const newPath = isAbsolute(targetPath) ? targetPath : join(currentPath, targetPath);

  try {
    await access(newPath);
    return newPath;
  } catch {
    console.log("Operation failed");
    return null;
  }
}
