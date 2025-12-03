export class BatteryPack {
  cells: number[];
  constructor(cells: number[]) {
    this.cells = cells;
  }
  indexOf(start: number, search: number) {
    for (let i = start; i < this.cells.length; i++) {
      if (this.cells[i] == search) {
        return i;
      }
    }
    return -1;
  }
  findMaxJoltage(activateCells: number): number {
    let max = 0;
    let pos = 0;

    let remaining = activateCells;
    while (remaining > 0) {
      let searchCharge = 9;

      while (searchCharge > 0 && remaining > 0) {
        let i = this.indexOf(pos, searchCharge);
        if (i >= 0 && i <= this.cells.length - remaining) {
          pos = i + 1;
          max = max * 10 + searchCharge;
          remaining--;
          break;
        }
        searchCharge--;
      }
    }

    return max;
  }
}
