import { parse } from "path";

export class Range {
  start: number;
  end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  includes(v: number): boolean {
    return v >= this.start && v <= this.end;
  }

  size(): number {
    return this.end - this.start + 1;
  }

  overlaps(other: Range): boolean {
    return Math.max(this.start, other.start) <= Math.min(this.end, other.end);
  }

  combine(other: Range): Range {
    return new Range(
      Math.min(this.start, other.start),
      Math.max(this.end, other.end),
    );
  }

  compare(other: Range): number {
    const c = this.start - other.start;
    if (c != 0) {
      return c;
    }
    return this.end - other.end;
  }
}

export function parseRange(line: string): Range {
  const [startStr, endStr] = line.split("-");

  const start = parseInt(startStr!, 10);
  const end = parseInt(endStr!, 10);

  return new Range(start, end);
}
