import fs from "fs/promises";
import { Grid } from "./gird.ts";

const input = await fs.readFile("input.txt", "utf-8");
const rows = input.split("\n");

let grid = new Grid(rows)

let round = 0;
let rollsRemoved = 0;

let done = false;
while (!done) {
  done = true;

  const nextGrid = grid.copy();
  let accessible = 0;

  for (const cell of grid) {
    if (cell.symbol != '@') {
      continue;
    }

    const paperRolls = cell.getNeighbors().filter(n => n.symbol == '@').length
    if (paperRolls < 4) {
      done = false;
      accessible++;
      nextGrid.setSymbol(cell.coordinate, '.');
    }
  }
  rollsRemoved += accessible;
  console.log(nextGrid.toString());
  console.log(`[round ${round}] accessible by forklift: ${accessible} | total: ${rollsRemoved}`);
  grid = nextGrid;
  round++;
}
