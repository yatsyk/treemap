import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import useDimensions from "react-cool-dimensions";
import { FolderStatApp } from "../../store/FolderStatApp/FolderStatApp";
import { CushionTreemap } from "../CushionTreemap/CushionTreemap";
import { HEADER_HEIGHT } from "./Header";
import { FOOTER_HEIGHT, OpenedFolderFooter } from "./OpenedFolderFooter";
import { PADDING } from "./settings";

type Props = {
  app: FolderStatApp;
};

export const TreeMapCard = observer((props: Props) => {
  const { app } = props;
  const { observe: divRef, width, height } = useDimensions({});

  return (
    <div
      ref={divRef}
      className="card"
      style={{
        position: "absolute",
        left: PADDING,
        right: "30%",
        top: HEADER_HEIGHT + PADDING,
        bottom: FOOTER_HEIGHT + PADDING,
        overflow: "hidden",
      }}
    >
      <CushionTreemap
        treemapData={app.folder.treeMapData}
        root={app.folder.root}
        style={{
          position: "relative",
          left: 0,
          top: 0,
          width: width,
          height: height,
        }}
      />
    </div>
  );
});
