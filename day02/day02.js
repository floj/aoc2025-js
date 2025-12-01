import { readFileSync } from "node:fs";

// const inputFile = "sample.txt";
const inputFile = "input.txt";

const ranges = readFileSync(inputFile, "utf-8")
  .trim()
  .split(",")
  .map((r) => r.split("-"))
  .map(([start, end]) => ({
    start: parseInt(start, 10),
    end: parseInt(end, 10),
  }));

let sumPart1 = 0;
let sumPart2 = 0;

for (const range of ranges) {
  for (let i = range.start; i <= range.end; i++) {
    if (isInvalidIdPart1(i)) {
      sumPart1 += i;
    }
    if (isInvalidIdPart2(i)) {
      sumPart2 += i;
    }
  }
}
console.log(`Sum Part 1: ${sumPart1}`);
console.log(`Sum Part 2: ${sumPart2}`);

function isInvalidIdPart2(id) {
  return /^(\d+)(\1)+$/.test(`${id}`);
}

function isInvalidIdPart1(id) {
  var s = `${id}`;
  if (s.length % 2 === 1) {
    return false;
  }
  const mid = s.length / 2;
  const left = s.substring(0, mid);
  const right = s.substring(mid);
  return left === right;
}
