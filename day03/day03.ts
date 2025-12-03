import fs from 'fs/promises';


class BatteryPack {
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

const input = await fs.readFile('input.txt', 'utf-8');
const batteryPacks = input.split('\n').map(line => {
    const cells = line.split('').map(e => parseInt(e, 10));
    return new BatteryPack(cells);
});


let sumPart1 = 0;
let sumPart2 = 0;
for (const pack of batteryPacks) {
    sumPart1 += pack.findMaxJoltage(2);
    sumPart2 += pack.findMaxJoltage(12);
}
console.log('Part 1:', sumPart1);
console.log('Part 2:', sumPart2);
