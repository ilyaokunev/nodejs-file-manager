import { cd } from "./cd.mjs";
import { dirname, join } from "node:path";
import { rename } from "node:fs/promises";

export async function rn(currentPath, path, name) {
  const verifiedPath = await cd(currentPath, path);

  if (verifiedPath) {
    try {
      const newPath = join(dirname(verifiedPath), name);
      await rename(verifiedPath, newPath);
    } catch {
      console.log("Operation failed");
    }
  } else {
    console.log("Invalid input");
  }
}
