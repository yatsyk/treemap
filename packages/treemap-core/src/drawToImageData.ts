import { INode, DrawSettings, Color } from "./defs";
import { Rectangle } from "./Rectangle";
import { Surface } from "./Surface";

export function drawToImageData<Uid>(
  root: INode<Uid>,
  rects: Map<Uid, Rectangle>,
  surfaces: Map<Uid, Surface>,
  imageData: ImageData,
  getColorForNode: (node: INode<Uid>) => Color,
  settings: DrawSettings = {}
): void {
  const s = new Date().getTime();
  const rect = rects.get(root.id);
  const pixels = imageData.data;
  const st: DrawSettings = {
    ...{
      Ia: 40,
      Is: 215,
      Lx: 0.09759,
      Ly: 0.19518,
      Lz: 0.9759,
    },
    ...settings,
  };

  const round = (v: number) => Math.round(v);

  const drawLeaf = (node: INode<Uid>) => {
    const nodeColor = getColorForNode(node);
    const [red, green, blue] = nodeColor;
    const rect = rects.get(node.id);
    const surface = surfaces.get(node.id);

    const iy1 = round(rect.y0 + 0.5);
    const iy2 = round(rect.y1 - 0.5);
    const ix1 = round(rect.x0 + 0.5);
    const ix2 = round(rect.x1 - 0.5);

    for (let iy = iy1; iy <= iy2; iy++) {
      for (let ix = ix1; ix <= ix2; ix++) {
        const nx = -(2 * surface.x2 * (ix + 0.5) + surface.x1);
        const ny = -(2 * surface.y2 * (iy + 0.5) + surface.y1);
        const cosa =
          (nx * st.Lx + ny * st.Ly + st.Lz) /
          Math.sqrt(nx * nx + ny * ny + 1.0);
        const br = st.Ia + Math.max(0, st.Is * cosa);
        var off = (iy * imageData.width + ix) * 4;
        pixels[off] = (red * br) / 256;
        pixels[off + 1] = (green * br) / 256;
        pixels[off + 2] = (blue * br) / 256;
        pixels[off + 3] = 255;
      }
    }
  };

  const drawNode = (node: INode<Uid>) => {
    if (node.children) {
      for (const n of node.children) {
        drawNode(n);
      }
    } else {
      drawLeaf(node);
    }
  };

  drawNode(root);

  const f = new Date().getTime();
  const time = f - s;
  //console.info(`draw time ${time}`);
}
