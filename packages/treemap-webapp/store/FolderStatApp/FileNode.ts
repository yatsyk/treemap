import { INode } from "@cushiontreemap/core";
import * as mime from "mime/lite";
import { uniqBy } from "lodash";
import { makeAutoObservable } from "mobx";
import { getColorByType } from "../../lib/getColorByName";

export class FileNode implements INode<string> {
  value?: number;
  children?: FileNode[];
  parent: FileNode | undefined;
  name: string;
  id: string = "";

  constructor(
    parent: FileNode | undefined,
    name: string,
    children = undefined,
    value = undefined
  ) {
    this.name = name;
    this.parent = parent;
    this.children = children;
    this.value = value;
    this.id = this.parent ? this.parent.id + "/" + this.name : this.name;
    makeAutoObservable(this);
  }

  get isLeaf() {
    return typeof this.children === "undefined";
  }

  get stats() {
    if (this.isLeaf) {
      const mm: string = mime.getType("" + this.name) || "unknown";
      return { [mm]: { count: 1, size: this.value } };
    } else {
      const res = {};
      for (const ch of this.children) {
        const chstats = ch.stats;
        for (const [type, stat] of Object.entries(chstats)) {
          if (!res[type]) {
            const rgb = (...values) => {
              return values
                .reduce((acc, cur) => {
                  let val =
                    cur >= 255
                      ? "ff"
                      : cur <= 0
                      ? "00"
                      : Number(cur).toString(16);
                  return acc + (val.length === 1 ? "0" + val : val);
                }, "")
                .toUpperCase();
            };
            const c = getColorByType(type);

            res[type] = {
              count: 0,
              size: 0,
              color: "#" + rgb(c[0], c[1], c[2]),
            };
          }
          res[type].count += 1;
          res[type].size += stat.size;
        }
      }
      const sortedKeys = Object.keys(res).sort(
        (k1, k2) => res[k2].size - res[k1].size
      );
      const stats = sortedKeys.reduce((m, k) => {
        m[k] = res[k];
        return m;
      }, {});
      return stats;
    }
  }

  prepare() {
    if (typeof this.children !== "undefined") {
      this.children = uniqBy(this.children, (n) => n.id)
        .map((ch) => ch.prepare())
        .filter((ch) => !!ch.value)
        .sort((ch1: FileNode, ch2: FileNode) => ch2.value - ch1.value);

      const value = this.children.reduce((m: number, v: FileNode) => {
        m = m + v.value;
        return m;
      }, 0);

      this.value = value;
    }
    return this;
  }
}
