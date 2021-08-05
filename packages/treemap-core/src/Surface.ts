import { Dir } from "./defs";

const H = 0.5;
const F = 0.75;

export class Surface {
  x1 = 0;
  x2 = 0;
  y1 = 0;
  y2 = 0;
  h = H;
  f = F;

  constructor(
    x1: number = 0,
    x2: number = 0,
    y1: number = 0,
    y2: number = 0,
    h = H,
    f = F
  ) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.h = h;
    this.f = f;
  }

  clone() {
    return new Surface(this.x1, this.x2, this.y1, this.y2, this.h, this.f);
  }

  static addRidge(x1: number, x2: number, h: number, s1: number, s2: number) {
    const ns1 = s1 + (4 * h * (x2 + x1)) / (x2 - x1);
    const ns2 = s2 - (4 * h) / (x2 - x1);
    return [ns1, ns2];
  }

  dir(d: Dir) {
    if (d == Dir.x) {
      return [this.x1, this.x2];
    } else {
      return [this.y1, this.y2];
    }
  }
}
