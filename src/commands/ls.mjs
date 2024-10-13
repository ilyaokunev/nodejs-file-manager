import { access, readdir } from "node:fs/promises";

export async function ls(currentPath) {
  try {
    await access(currentPath);
    const files = await readdir(currentPath, { withFileTypes: true });

    const arrayForTable = files
      .map((file) => ({ Name: file.name, Type: file.isDirectory() ? "directory" : "file" }))
      .sort((a, b) => {
        if (
          (a.Type === "directory" && b.Type === "directory") ||
          (a.Type === "file" && b.Type === "file")
        )
          return 0;
        if (a.Type === "directory" && b.Type === "file") return -1;
        if (a.Type === "file" && b.Type === "directory") return 1;
      });

    console.table(arrayForTable);
  } catch (e) {
    console.log(e);
    console.log("Operation failed");
  }
}
