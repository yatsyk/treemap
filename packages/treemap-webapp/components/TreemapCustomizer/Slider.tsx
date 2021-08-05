import React, { useState } from "react";
import { observer } from "mobx-react";
import { docsStore } from "../../store/DocsStore/DocsStore";
import { TreemapData } from "../../store/TreemapData/TreemapData";

type Props = {
  min: number;
  max: number;
  value: number;
  setValue: (n: number) => void;
  label: string;
};

export const Slider = observer((props: Props) => {
  const { min, max, label, value, setValue } = props;
  return (
    <div className="" style={{}}>
      <label className="form-label">
        {label}
        <span className="">[{value}]</span>
      </label>
      <input
        type="range"
        className="form-range mb-2"
        value={value}
        min={min}
        step="0.0001"
        onChange={(evt) => setValue(parseFloat(evt.target.value))}
        max={max}
      ></input>
    </div>
  );
});
