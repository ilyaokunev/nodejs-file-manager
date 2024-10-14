import { cd } from "./cd.mjs";
import {createHash} from "node:crypto";
import { createReadStream } from "node:fs";
import { stdout } from "node:process";

export async function hash(currentPath, path) {
  const verifiedPath = await cd(currentPath, path);

  if (verifiedPath) {
    let data = '';
    try {
      const hashStream = createHash('sha256').setEncoding('hex');
      const stream = createReadStream(verifiedPath);
      
    stream.on("data", (chunk) => hashStream.update(chunk));
    stream.on("end", () => hashStream.end());
    stream.on("error", () => console.log("Operation failed"));

    hashStream.on('data', (chunk) => data = data + chunk);
    hashStream.on('end', () => console.log(data));
    hashStream.on('error', () =>  console.log("Operation failed"))
    } catch {
      console.log("Operation failed");
    }

  } else {
    console.log("Invalid input");
  }
}