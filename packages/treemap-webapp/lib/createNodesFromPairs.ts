import * as mime from "mime/lite";
import { INode } from "@cushiontreemap/core";
import { getColorByType } from "./getColorByName";

let nextId = 0;
function uniqueId(prefix: string) {
  return `${prefix}-${nextId}`;
}

export function createNodesFromPairs(
  data: Array<[string, number]>
): INode<string> {
  class TreefyNode implements INode<string> {
    value?: number;
    children?: Array<TreefyNode>;
    id: string;
    name?: string;
    parent?: TreefyNode;

    constructor(
      parent: TreefyNode,
      id: string,
      name: string,
      children: Array<TreefyNode> | undefined = undefined,
      value: number | undefined = undefined
    ) {
      this.parent = parent;
      this.id = id;
      this.name = name;
      this.children = children;
      this.value = value;
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
  }

  const treeify = (data: Array<[string, number]>): TreefyNode => {
    const tree: TreefyNode = new TreefyNode(undefined, "", "");
    for (const [path, size] of data) {
      const parts = path.replace(/\/$/, "").split("/");
      let t = tree;
      while (parts.length > 0) {
        const id = parts.shift();
        if (!t.children) t.children = [];
        let child = t.children.find((c) => c.id === id);
        if (!child) {
          child = { id, value: 0 };
          t.children.push(child);
        }
        if (parts.length === 0) {
          if (child.value !== 0) {
            throw new Error(`duplicate path ${path} ${child.value}`);
          }
          child.value = size;
        }
        t = child;
      }
    }
    return tree;
  };
  let rootTreefy = treeify(data);
  const req = (node: TreefyNode, parent?: TreefyNode): TreefyNode => {
    const res = new TreefyNode(
      parent,
      parent ? parent.id + "/" + node.id : node.id,
      node.id || ""
    );
    if (!res.id) {
      res.id = uniqueId("nodes");
    }
    res.value = node.value;
    if (node.children) {
      res.children = node.children
        .map((ch) => req(ch, res))
        .filter((ch: INode<string>) => ch.value)
        .sort(
          (ch1: INode<string>, ch2: INode<string>) => ch2.value - ch1.value
        );

      res.value = res.children.reduce((m: number, v: INode<string>) => {
        m = m + v.value;
        return m;
      }, 0) as unknown as number;
    } else {
      res.value = node.value;
    }
    return res;
  };
  let root: INode<string> = req(rootTreefy);
  while (root.children && root.children.length == 1) {
    root = root.children[0];
  }
  return root;
}
