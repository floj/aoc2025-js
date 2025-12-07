import fs from "fs/promises";
import { Grid, Cell } from "./gird.ts";

const input = await fs.readFile("input.txt", "utf-8");
const rows = input.split("\n");

part1(new Grid(rows));
part2(new Grid(rows));

function part2(grid: Grid) {
  var start = grid.findSymbol("S");
  var timelines = countTimelines(start!, grid, new Map<string, number>());
  console.log("timelines", timelines);
}

function countTimelines(
  cell: Cell,
  grid: Grid,
  cache: Map<string, number>
): number {
  const cached = cache.get(cell.coordinate.toString());
  if (cached !== undefined) {
    return cached;
  }

  // console.log("checking", cell.coordinate);
  const nextCell = cell.getCellY(1);
  if (nextCell === undefined) {
    return 1;
  }

  if (nextCell.symbol === ".") {
    const tl = countTimelines(nextCell, grid, cache);
    cache.set(cell.coordinate.toString(), tl);
    return tl;
  }
  if (nextCell.symbol === "^") {
    let timelines = 0;
    for (const offsetX of [-1, 1]) {
      const c = nextCell.getCellX(offsetX);
      if (c != null) {
        const tl = countTimelines(c, grid, cache);
        timelines += tl;
      }
    }
    cache.set(cell.coordinate.toString(), timelines);
    return timelines;
  }
  throw new Error("unexpected symbol: " + nextCell.symbol);
}

function part1(grid: Grid) {
  const start = grid.findSymbol("S");
  let checkCells = [start!];
  let splits = 0;
  while (checkCells.length > 0) {
    const nextCells = [];

    for (const cell of checkCells) {
      const nextCell = cell.getCellY(1);
      if (nextCell === undefined) {
        continue;
      }
      if (nextCell.symbol === ".") {
        grid.setSymbol(nextCell.coordinate, "|");
        nextCells.push(nextCell);
        continue;
      }
      if (nextCell.symbol === "^") {
        let isSplit = false;
        for (const offsetX of [-1, 1]) {
          const sideCell = nextCell.getCellX(offsetX);
          if (sideCell === undefined) {
            continue;
          }
          nextCells.push(sideCell);
          if (sideCell.symbol === ".") {
            isSplit = true;
          }
          grid.setSymbol(sideCell.coordinate, "|");
        }
        if (isSplit) {
          splits++;
        }
      }
    }
    checkCells = nextCells;
    // console.log(grid.toString());
    // console.log("-----");
  }
  console.log("splits:", splits);
}
