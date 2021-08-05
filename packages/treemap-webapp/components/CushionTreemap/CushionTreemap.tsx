import React, { CSSProperties, useRef, useState } from "react";
import { useEffect } from "react";
import { observer } from "mobx-react";
import { DrawSettings, INode } from "@cushiontreemap/core";
import { TreemapData } from "../../store/TreemapData/TreemapData";
import useDimensions from "react-cool-dimensions";

type Props = {
  style?: CSSProperties;
  className?: string;
  root: INode<string>;
  customization?: DrawSettings;
  treemapData?: TreemapData;
};

export const CushionTreemap = observer((props: Props) => {
  const DPR = (typeof window !== "undefined" && window.devicePixelRatio) || 1;
  const { style, root, treemapData: passedTreemapData, className } = props;
  const [treemapData, setTreemapData] = useState(
    typeof passedTreemapData != "undefined"
      ? passedTreemapData
      : new TreemapData()
  );
  const canvasRef = useRef(null);
  //const size = useWindowSize();
  const { observe: divRef, width, height } = useDimensions({});
  //console.info("CushionTreeMap comp", { width, height });
  useEffect(() => {
    passedTreemapData && setTreemapData(passedTreemapData);
  }, [passedTreemapData]);
  useEffect(() => {
    treemapData.setRoot(root);
  }, [root]);
  useEffect(() => {
    if (canvasRef.current) {
      const c = canvasRef.current;
      c.width = Math.round(width * DPR);
      c.height = Math.round(height * DPR);
      treemapData.setSize(c.width, c.height);
      if (canvasRef.current && treemapData.canvas) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.drawImage(treemapData.canvas, 0, 0);
      }
    }
  }, [canvasRef.current, width, height, treemapData.canvas, root]);
  const canvasStyle = {
    width: width,
    height: height,
    position: "absolute",
    left: 0,
    top: 0,
  } as CSSProperties;
  return (
    <div
      className={className}
      ref={divRef}
      style={{ overflow: "hidden", ...style }}
    >
      <canvas
        style={{
          ...canvasStyle,
          filter: `hue-rotate(${treemapData.colorsRotation}deg) brightness(${treemapData.brightness}%)`,
        }}
        ref={canvasRef}
        onMouseLeave={(evt) => treemapData.setMousePosition(undefined)}
        onMouseEnter={(evt) => {
          const rect = (
            evt.nativeEvent.target as HTMLElement
          ).getBoundingClientRect();
          treemapData.setMousePosition([
            (evt.clientX - rect.x) * DPR,
            (evt.clientY - rect.y) * DPR,
          ]);
        }}
        onMouseMove={(evt) => {
          const rect = (
            evt.nativeEvent.target as HTMLElement
          ).getBoundingClientRect();
          treemapData.setMousePosition([
            (evt.clientX - rect.x) * DPR,
            (evt.clientY - rect.y) * DPR,
          ]);
        }}
      />
      <div style={{ ...canvasStyle, pointerEvents: "none" }}>
        {treemapData.overNodes.map((n: INode<string>) => {
          const r = treemapData.rects.get(n.id);
          return (
            <div
              style={{
                pointerEvents: "none",
                position: "absolute",
                left: r.x0 / DPR,
                top: r.y0 / DPR,
                width: r.width / DPR,
                height: r.height / DPR,
                outline: "1px solid red",
              }}
              key={n.id}
            ></div>
          );
        })}
      </div>
    </div>
  );
});
