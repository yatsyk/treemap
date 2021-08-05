import { INode } from "./defs";
import { Rectangle } from "./Rectangle";
import { Surface } from "./Surface";

export function createSurfaces<Uid>(
  root: INode<Uid>,
  rects: Map<Uid, Rectangle>
): Map<Uid, Surface> {
  const res = new Map<Uid, Surface>();

  const addSurface = (items: Array<INode<Uid>>, surface: Surface) => {
    for (const item of items) {
      const rect = rects.get(item.id);
      if (rect) {
        const [sx1, sx2] = Surface.addRidge(
          rect.x0,
          rect.x1,
          surface.h,
          surface.x1,
          surface.x2
        );
        const [sy1, sy2] = Surface.addRidge(
          rect.y0,
          rect.y1,
          surface.h,
          surface.y1,
          surface.y2
        );
        const s = new Surface(sx1, sx2, sy1, sy2);
        s.h = surface.h * surface.f;
        res.set(item.id, s);
        if (item.children) {
          addSurface(item.children, s);
        }
      } else {
        console.error(`no rect for ${item.id}`);
        if (item.children) {
          addSurface(item.children, new Surface());
        }
      }
    }
  };

  addSurface([root], new Surface());

  return res;
}
