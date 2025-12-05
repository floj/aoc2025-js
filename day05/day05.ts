import fs from "fs/promises";
import { parseRange, Range } from "./range.ts";

const input = await fs.readFile("input.txt", "utf-8");
const rows = input.split("\n");

const ranges: Range[] = [];

let lineNo = 0;
for (; lineNo < rows.length; lineNo++) {
  const line = rows[lineNo]!;
  if (line.trim() == "") {
    break;
  }
  const range = parseRange(line);
  ranges.push(range);
}

const freshIDs = new Set<number>();
for (; lineNo < rows.length; lineNo++) {
  const line = rows[lineNo]!;
  const id = parseInt(line, 10);
  const isFresh = ranges.find((r) => r.includes(id)) !== undefined;
  if (isFresh) {
    freshIDs.add(id);
  }
}
console.log("Fresh", freshIDs.size);

const sortedRanges = ranges.sort((a, b) => a.compare(b));

let currentRange = sortedRanges.shift()!;
let numFreshIds = 0;
for (const range of sortedRanges) {
  if (currentRange.overlaps(range)) {
    const combined = currentRange.combine(range);
    currentRange = combined;
    continue;
  }
  numFreshIds += currentRange.size();
  currentRange = range;
}
numFreshIds += currentRange.size();

console.log("Total fresh IDs", numFreshIds);
