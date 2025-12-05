import { readFileSync } from "node:fs";

// const inputFile = "sample.txt";
const inputFile = "input.txt";
const input = readFileSync(inputFile, "utf-8").trim().split("\n");

const dial = {
  turns: 100,
  currentPosition: 50,
  stoppedAtZero: 0,
  passedZero: 0,
  dialLeft(clicks) {
    while (clicks > 0) {
      clicks--;
      this.currentPosition--;
      if (this.currentPosition < 0) {
        this.currentPosition = this.turns - 1;
      }
      if (this.currentPosition === 0) {
        this.passedZero++;
      }
    }
    if (this.currentPosition === 0) {
      this.stoppedAtZero++;
    }
  },
  dialRight(clicks) {
    while (clicks > 0) {
      clicks--;
      this.currentPosition++;
      if (this.currentPosition === this.turns) {
        this.currentPosition = 0;
      }
      if (this.currentPosition === 0) {
        this.passedZero++;
      }
    }
    if (this.currentPosition === 0) {
      this.stoppedAtZero++;
    }
  },
};

for (const line of input) {
  const direction = line[0];
  const clicks = parseInt(line.slice(1), 10);
  if (direction === "L") {
    dial.dialLeft(clicks);
  } else if (direction === "R") {
    dial.dialRight(clicks);
  }
  console.log(
    `Direction: ${direction}, Clicks: ${clicks}, Position: ${dial.currentPosition}`,
  );
}

console.log(`Stopped at 0: ${dial.stoppedAtZero}`);
console.log(`Passed 0: ${dial.passedZero}`);
