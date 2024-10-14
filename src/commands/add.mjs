import { writeFile, access } from "node:fs/promises";
import { join } from "node:path";

export async function add(currentPath, filename) {
  const path = join(currentPath, filename);

  try {
    await access(currentPath);
    await writeFile(path, "");
  } catch {
    console.log("Invalid input");
  }
}
