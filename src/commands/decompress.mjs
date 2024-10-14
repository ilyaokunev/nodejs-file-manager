import { cd } from "./cd.mjs";
import { createBrotliDecompress } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { isAbsolute, normalize, join } from "node:path";

export async function decompress(currentPath, path, newPath) {
  const verifiedCurrentPath = await cd(currentPath, path);

  const targetPath = normalize(newPath);

  const verifiedNewPath = isAbsolute(targetPath) ? targetPath : join(currentPath, targetPath);
  
  if (verifiedCurrentPath && verifiedNewPath) {
    try {

      const writeStream = createWriteStream(verifiedNewPath, { flags: "wx" });

      writeStream.on("error", () => console.log("Operation failed"));

      createReadStream(verifiedCurrentPath).pipe(createBrotliDecompress()).pipe(writeStream);
    } catch {
      console.log("Operation failed");
    }
  } else {
    console.log("Invalid input");
  }
}
