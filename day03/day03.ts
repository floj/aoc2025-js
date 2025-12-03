import fs from "fs/promises";
import { BatteryPack } from "./battery-pack.ts";

const input = await fs.readFile("input.txt", "utf-8");
const batteryPacks = input.split("\n").map((line) => {
  const cells = line.split("").map((e) => parseInt(e, 10));
  return new BatteryPack(cells);
});

// let sumPart1 = 0;
// let sumPart2 = 0;
// for (const pack of batteryPacks) {
//     sumPart1 += pack.findMaxJoltage(2);
//     sumPart2 += pack.findMaxJoltage(12);
// }

function toSum(a: number, b: number) {
  return a + b;
}

const sumPart1 = batteryPacks
  .map((pack) => pack.findMaxJoltage(2))
  .reduce(toSum);

const sumPart2 = batteryPacks
  .map((pack) => pack.findMaxJoltage(12))
  .reduce(toSum);

console.log("Part 1:", sumPart1);
console.log("Part 2:", sumPart2);
