---
title: Cushion Treemap
---

Npm module for cushion treemap visualization. Treemap uses nested rectangles to display structure of hierarchical data.
Size of each rectangle proportial of value (for example file or directory size in case of file system) associated with particular node.

## Examples:

- [Customize DrawSettings](/customize)
- [FolderStatsApp](/folderstat)

## @cushiontreemap/core

@cushiontreemap/core was written with as few assumptions as possible about javascript environment. It could be used in worker, react-native, browser or server.

### Installation

```
yarn add @cushiontreemap/core
```

### Usage:

```javascript

import {
  createSurfaces,
  drawToImageData,
  INode,
  layoutSquarefy
} from "@cushiontreemap/core";

const width = 1000;
const height = 500;

function getColor(node: INode<Uid>) {
  // return RGBA array of color components for particular node
  return [255, 0, 0, 255];
}

const root = { ... } // root INode
const rects = layoutSquarefy(root, width, height);
const surfaces = createSurfaces(root, rects);
canvas = document.createElement("canvas");
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext("2d");
const imageData = ctx.getImageData(0, 0, width, height);
drawToImageData(
  root,
  rects,
  surfaces,
  imageData,
  getColor
);
ctx.putImageData(imageData, 0, 0);

```

Input data should implement INode interface:

```typescript

interface INode<Uid> {
  value?: number;
  children?: Array<INode<Uid>>;
  id: Uid;
}

```

## TODO

- [ ] react/vue/react-native etc. wrappers

## Resources

- [Treemaps on Wikipedia](https://en.wikipedia.org/wiki/Treemapping)
- [Treemaps](https://www3.cs.stonybrook.edu/~mueller/teaching/cse591_visAnalytics/treeMaps.pdf)
- [huy-nguyen/squarify](https://github.com/huy-nguyen/squarify) - squarify algorithm used in @cushiontreemap/core
- [Squarified Treemaps](https://cgl.ethz.ch/teaching/scivis_common/Literature/squarifiedTreeMaps.pdf) layout algorithm description
- [Cushion Treemaps: Visualization of Hierarchical Information](https://www.win.tue.nl/~vanwijk/ctm.pdf) cushion ttreemap algorithm used in this library
