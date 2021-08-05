import React, { useState } from "react";
import { observer } from "mobx-react";
import { docsStore } from "../../store/DocsStore/DocsStore";
import { TreemapData } from "../../store/TreemapData/TreemapData";
import { Slider } from "./Slider";

const DRAW_PROPS = {
  Ia: { value: 40, min: 0, max: 500 },
  Is: { value: 215, min: 0, max: 500 },
  Lx: { value: 0.09759, min: -2, max: 2 },
  Ly: { value: 0.19518, min: -2, max: 2 },
  Lz: { value: 0.9759, min: -2, max: 2 },
};

type Props = {
  treemapData: TreemapData;
};
export const CustomizationPanel = observer((props: Props) => {
  const { treemapData } = props;
  return (
    <div className="row">
      <Slider
        label={"Hue"}
        value={treemapData.colorsRotation}
        min={0}
        max={360}
        setValue={(v) => {
          treemapData.setColorRotation(v);
        }}
      />
      <Slider
        label={"Brightness"}
        value={treemapData.brightness}
        min={0}
        max={400}
        setValue={(v) => {
          treemapData.setBrightness(v);
        }}
      />
      {Object.entries(DRAW_PROPS).map(([label, { value, min, max }]) => (
        <Slider
          label={label}
          value={treemapData.drawSettings[label]}
          min={min}
          max={max}
          setValue={(v) => {
            treemapData.setDrawSetting(label, v);
          }}
        />
      ))}
    </div>
  );
});
