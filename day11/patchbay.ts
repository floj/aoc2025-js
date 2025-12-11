export function parsePatchbay(line: string): Patchbay {
  const parts = line.split(/\s*:\s*/);
  if (parts.length != 2) {
    throw new Error("invalid line: " + line);
  }
  const name = parts[0];
  const outs = parts[1]!.split(/\s+/).map((s) => s.trim());
  return new Patchbay(name!, outs);
}

export class Patchbay {
  name: string;
  outlets: string[];
  cache: Map<string, number>;

  constructor(name: string, outlets: string[]) {
    this.name = name;
    this.outlets = outlets;
    this.cache = new Map<string, number>();
  }

  countPathToDest(
    dest: string,
    bays: Map<string, Patchbay>,
    via: string[]
  ): number {
    if (via.includes(this.name)) {
      via = via.filter((n) => n !== this.name).toSorted();
    }
    const paths = this.cache.get(via.join(","));
    if (paths != null) {
      return paths;
    }

    if (this.outlets.includes(dest)) {
      if (via.length === 0) {
        return 1;
      }
      return 0;
    }
    let sum = 0;
    for (var o of this.outlets) {
      sum += bays.get(o)!.countPathToDest(dest, bays, via);
    }
    this.cache.set(via.join(","), sum);
    return sum;
  }
}
