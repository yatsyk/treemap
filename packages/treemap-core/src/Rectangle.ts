import { IRect } from "squarify";
import { Dir } from "./defs";

export class Rectangle implements IRect {
  x0 = 0;
  x1 = 0;
  y0 = 0;
  y1 = 0;

  constructor(x0, y0, x1, y1) {
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
  }

  clone() {
    return new Rectangle(this.x0, this.y0, this.x1, this.y1);
  }

  dir(d: Dir) {
    if (d == Dir.x) {
      return [this.x0, this.x1];
    } else {
      return [this.y0, this.y1];
    }
  }

  get width() {
    return this.x1 - this.x0;
  }

  get height() {
    return this.y1 - this.y0;
  }
}
