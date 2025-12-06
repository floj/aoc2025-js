import fs from "fs/promises";

const input = await fs.readFile("input.txt", "utf-8");
const rows = input.split("\n");

const OPERATORS = new Map<string, (a: number, b: number) => number>([
  ["+", (a: number, b: number) => a + b],
  ["*", (a: number, b: number) => a * b],
]);

part1(rows);
part2(rows);

function part2(lines: string[]) {
  const org = lines.map((l) => l.split(""));
  const rotated = rotateCounterClockwise(org);

  let total = 0;
  let nums: number[] = [];
  for (const chars of rotated) {
    const line = chars.join("").trim();
    if (line === "") {
      continue;
    }
    // console.log("checking line", line);
    let op: ((a: number, b: number) => number) | undefined = undefined;
    let v = 0;
    for (const c of line) {
      if (c.match(/\d/)) {
        v = v * 10 + parseInt(c, 10);
      }
      if (OPERATORS.has(c)) {
        op = OPERATORS.get(c)!;
      }
    }
    // console.log("adding", v);
    nums.push(v);
    if (op == null) {
      continue;
    }
    console.log("applying operation to", nums);
    const sum = nums.reduce((a, b) => op!(a, b));
    console.log("sum: %d", sum);
    nums = [];
    total += sum;
  }
  console.log("total", total);
}

function part1(lines: string[]) {
  const fields = lines
    .map((line) => line.split(/\s+/))
    .map((f) => f.map((s) => s.trim()).filter((s) => s !== ""));
  console.log("fields:", fields);

  const operators = fields.at(-1)!.map((o) => OPERATORS.get(o)!);
  const operands = fields.slice(0, -1).map((l) => l.map(Number));
  let total = 0;
  for (let i = 0; i < operators.length; i++) {
    const reducer = operators[i]!;

    let sum = operands[0]![i]!;
    for (const ops of operands.slice(1)) {
      const v = ops[i]!;
      console.log("v:", v);
      sum = reducer(sum, v);
    }
    console.log("sum:", sum);
    total += sum;
  }
  console.log("total:", total);
}

function rotateCounterClockwise(matrix: string[][]): string[][] {
  const rows = matrix.length;
  const cols = matrix[0]!.length;

  const rotated: string[][] = Array.from({ length: cols }, () =>
    Array<string>(rows)
  );

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rotated[cols - 1 - c]![r] = matrix[r]![c]!;
    }
  }
  return rotated;
}
