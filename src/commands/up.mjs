import { dirname } from "node:path";

export function goUp(currentPath) {
  return dirname(currentPath);
}
