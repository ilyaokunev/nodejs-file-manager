import { cd } from "./cd.mjs";
import { createReadStream } from "node:fs";

export async function cat(currentPath, path) {
  const verifiedPath = await cd(currentPath, path);
  if (verifiedPath) {
    const stream = createReadStream(verifiedPath, { encoding: "utf-8" });

    let data = "";

    stream.on("data", (chunk) => (data = data + chunk));

    stream.on("end", () => console.log(data));

    stream.on("error", () => console.log("Operation failed"));
  } else {
    console.log("Invalid input");
  }
}
