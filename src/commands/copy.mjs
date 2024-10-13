import { cd } from "./cd.mjs";
import { createReadStream, createWriteStream } from "node:fs";
import { parse, join } from "node:path";

export async function cp(currentPath, path, newPath) {
  const verifiedCurrentPath = await cd(currentPath, path);
  const verifiedNewPath = await cd(currentPath, newPath);

  if (verifiedCurrentPath && verifiedNewPath) {
    try {
      const fileName = parse(verifiedCurrentPath).base;
      const writeStream =  createWriteStream(join(verifiedNewPath, fileName), { flags: "wx" });
    
      writeStream.on('error', () => console.log("Operation failed"));

      createReadStream(verifiedCurrentPath).pipe(writeStream);
    } catch {
      console.log("Operation failed");
    }
  } else {
    console.log("Invalid input");
  }
}
