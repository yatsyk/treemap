import { IRect, normalizeData, squarify } from "squarify";
import { INode } from "./defs";
import { Rectangle } from "./Rectangle";

export function layoutSquarefy<Uid>(
  root: INode<Uid>,
  width: number,
  height: number
): Map<Uid, Rectangle> {
  const s = new Date().getTime();
  const getArea = (rect: IRect) => (rect.x1 - rect.x0) * (rect.y1 - rect.y0);

  const recur = (data, rect: IRect) => {
    const normalizedData = normalizeData(data, getArea(rect));
    const res = squarify(normalizedData, [], rect, []);
    for (const ch of res) {
      if (ch.children) {
        ch.children = recur(ch.children, ch);
      } else {
      }
    }

    return res;
  };

  const allRect = new Rectangle(0, 0, width, height);
  let laoutedRoot = recur([root], allRect);

  const rects = new Map<Uid, Rectangle>();

  const extractRects = (children) => {
    children.forEach((r) => {
      r.children && extractRects(r.children);
      rects.set(r.id, new Rectangle(r.x0, r.y0, r.x1, r.y1));
    });
  };

  extractRects(laoutedRoot);

  const f = new Date().getTime();
  const time = f - s;
  console.info(`layout time ${time}`);

  return rects;
}