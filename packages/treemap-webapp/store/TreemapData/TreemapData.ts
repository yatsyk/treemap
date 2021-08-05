import {
  createSurfaces,
  drawToImageData,
  INode,
  DrawSettings,
  Color,
  layoutSquarefy,
  Rectangle,
} from "@cushiontreemap/core";
import { makeAutoObservable, observable, observe } from "mobx";
import { debounce, bind } from "lodash";
import Flatbush from "flatbush";
import { getColorByName } from "../../lib/getColorByName";

export class TreemapData {
  root?: INode<string>;
  width = -1;
  height = -1;
  mousePosition?: [number, number];
  rects?: Map<string, Rectangle> = undefined;
  tree?: Flatbush;
  redraw: () => void;
  canvas?: HTMLCanvasElement = undefined;
  drawSettings: DrawSettings = {
    Ia: 40,
    Is: 215,
    Lx: 0.09759,
    Ly: 0.19518,
    Lz: 0.9759,
  };
  colorsRotation = 0;
  brightness = 100;

  constructor(root?: INode<string>) {
    this.root = root;
    makeAutoObservable(this, { tree: observable.ref, rects: observable.ref });
    this.redraw = debounce(() => {
      console.info("redraw");
      this.draw();
    }, 1);

    observe(this, "width", this.redraw, true);
    observe(this, "height", this.redraw, true);
    observe(this, "root", this.redraw, true);
  }

  setMousePosition(mousePosition?: [number, number]) {
    this.mousePosition = mousePosition;
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  setBrightness(v: number) {
    this.brightness = v;
  }

  setColorRotation(v: number) {
    this.colorsRotation = v;
  }

  setRoot(root: INode<string>) {
    this.root = root;
  }

  get nodesArray() {
    const res = [];
    const req = (node: INode<string>) => {
      res.push(node);
      if (node.children) {
        node.children.forEach((n) => req(n));
      }
    };
    req(this.root);
    return res;
  }

  setDrawSetting(n: string, v: number) {
    this.drawSettings[n] = v;
    this.redraw();
  }

  get overNodes() {
    if (this.mousePosition && this.tree) {
      const nodes = this.getNodes(
        new Rectangle(
          this.mousePosition[0],
          this.mousePosition[1],
          this.mousePosition[0],
          this.mousePosition[1]
        )
      );
      return nodes;
    } else {
      return [];
    }
  }

  draw() {
    console.info(
      `draw1 ${this.width} ${this.height} ${this.root}`,
      new Date().getTime(),
      JSON.stringify(this.drawSettings)
    );
    if (this.width > 0 && this.height > 0 && this.root) {
      this.rects = layoutSquarefy(this.root, this.width, this.height);
      const surfaces = createSurfaces(this.root, this.rects);
      this.tree = new Flatbush(this.nodesArray.length);
      const colors = new Map<string, Color>();
      for (const t of this.nodesArray) {
        const r = this.rects.get(t.id);
        this.tree.add(r.x0, r.y0, r.x1, r.y1);
        if (typeof t.children == "undefined") {
          colors.set(t.id, getColorByName(t.id, 0 /*, this.colorsRotation*/));
        }
      }
      this.tree.finish();
      //this.canvas = drawToCanvas(this.root, this.rects, surfaces, this.drawSettings);
      this.canvas = document.createElement("canvas");
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      const ctx = this.canvas.getContext("2d");
      const imageData = ctx.getImageData(0, 0, this.width, this.height);
      drawToImageData(
        this.root,
        this.rects,
        surfaces,
        imageData,
        (node) =>
          colors.get(node.id) ? colors.get(node.id) : [100, 255, 100, 2555],
        this.drawSettings
      );
      ctx.putImageData(imageData, 0, 0);
      console.info("drawn");
    }
  }

  getNodes(rect: Rectangle) {
    if (!this.tree) {
      return [];
    } else {
      const indexes = this.tree.search(rect.x0, rect.y0, rect.x1, rect.y1);
      const res = indexes.map((i: number) => this.nodesArray[i]);
      return res;
    }
  }
}
