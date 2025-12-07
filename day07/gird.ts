export class Coordinate {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  addXY(offsetX: number, offsetY: number): Coordinate {
    return new Coordinate(this.x + offsetX, this.y + offsetY);
  }

  add(coordinate: Coordinate): Coordinate {
    return this.addXY(coordinate.x, coordinate.y);
  }

  toString(): string {
    return `(${this.x},${this.y})`;
  }
}

export class Cell {
  coordinate: Coordinate;
  symbol: string;
  grid: Grid;

  constructor(coordinate: Coordinate, symbol: string, grid: Grid) {
    this.coordinate = coordinate;
    this.symbol = symbol;
    this.grid = grid;
  }

  getCellX(offsetX: number): Cell | undefined {
    const coord = this.coordinate.addXY(offsetX, 0);
    return this.grid.getCell(coord);
  }
  getCellY(offsetY: number): Cell | undefined {
    const coord = this.coordinate.addXY(0, offsetY);
    return this.grid.getCell(coord);
  }

  // @Override
  // public String toString() {
  //   return "(%d,%d) %s".formatted(coordinate.x(), coordinate.y(), symbol);
  // }
}

export class Grid {
  rows: string[];
  numColumns: number;

  constructor(rows: string[]) {
    this.rows = [...rows];
    this.numColumns = rows[0]!.length;
  }

  copy(): Grid {
    return new Grid([...this.rows]);
  }

  findSymbol(symbol: string): Cell | undefined {
    for (const cell of this) {
      if (cell.symbol === symbol) {
        return cell;
      }
    }
    return undefined;
  }

  setSymbol(c: Coordinate, symbol: string) {
    // just to check bounds
    if (this.getCell(c) === undefined) {
      throw Error("invalid coordinate: " + c);
    }
    const row = this.rows[c.y]!;
    const symbols = [...row];
    symbols[c.x] = symbol;
    this.rows[c.y] = symbols.join("");
  }

  getCell(coordinate: Coordinate): Cell | undefined {
    const { x, y } = coordinate;
    const symbol = this.rows[y]?.at(x);
    if (symbol === undefined) {
      return undefined;
    }
    return new Cell(coordinate, symbol, this);
  }

  *[Symbol.iterator]() {
    const maxIndex = this.rows.length * this.numColumns;
    for (let index = 0; index < maxIndex; index++) {
      const row = Math.floor(index / this.numColumns);
      const col = index % this.numColumns;
      yield this.getCell(new Coordinate(col, row))!;
    }
  }

  toString(): string {
    return this.rows.join("\n");
  }
}
