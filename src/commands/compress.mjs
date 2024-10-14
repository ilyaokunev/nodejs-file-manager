import { cd } from "./cd.mjs";
import { createBrotliCompress } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { parse, join } from "node:path";

export async function compress(currentPath, path, newPath) {
  const verifiedCurrentPath = await cd(currentPath, path);
  const verifiedNewPath = await cd(currentPath, newPath);

  if (verifiedCurrentPath && verifiedNewPath) {
    try {
      const fileName = parse(verifiedCurrentPath).base;
      const lastIndex = fileName.split('.').length -1
      const archiveName = fileName.split(".").slice(0,lastIndex).join("") + ".br";
      const writeStream = createWriteStream(join(verifiedNewPath, archiveName), { flags: "wx" });

      writeStream.on("error", () => console.log("Operation failed"));

      createReadStream(verifiedCurrentPath).pipe(createBrotliCompress()).pipe(writeStream);
    } catch {
      console.log("Operation failed");
    }
  } else {
    console.log("Invalid input");
  }
}
