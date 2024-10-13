import { cd } from "./cd.mjs";
import { rm as remove } from "node:fs/promises";

export async function rm(currentPath, path) {
  const verifiedPath = await cd(currentPath, path);

  if (verifiedPath) {
    try {
      await remove(verifiedPath);
    } catch {
      console.log("Operation failed");
    }
  } else {
    console.log("Invalid input");
  }
}
