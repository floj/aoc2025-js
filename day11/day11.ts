import * as fs from "node:fs/promises";
import { Patchbay, parsePatchbay } from "./patchbay.ts";

const input = await fs.readFile("input.txt", "utf-8");
const bays = new Map<string, Patchbay>();
input
  .split("\n")
  .map((l) => parsePatchbay(l))
  .forEach((bay) => bays.set(bay.name, bay));

{
  const start = bays.get("you")!;
  const via: string[] = [];
  const numPaths = start.countPathToDest("out", bays, via);
  console.log(`path from '${start.name}' to 'out' via [${via}]: ${numPaths}`);
}

{
  const start = bays.get("svr")!;
  const via = ["dac", "fft"];
  const numPaths = start.countPathToDest("out", bays, via);
  console.log(`path from '${start.name}' to 'out' via [${via}]: ${numPaths}`);
}
