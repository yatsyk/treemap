import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { CushionTreemap } from "../CushionTreemap/CushionTreemap";
import { docsStore } from "../../store/DocsStore/DocsStore";
import { TreemapData } from "../../store/TreemapData/TreemapData";

export const MainPreview = observer(() => {
  const [treemapData, setTreemapData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTreemapData(new TreemapData());
    }
  }, []);
  const height = 150;

  return (
    <div className={"preview-wrapper"} style={{ height }}>

      {treemapData && (
        <CushionTreemap
          root={docsStore.samplesTree}
          treemapData={treemapData}
          style={{
            position: "relative",
            left: 0,
            right: 0,
            top: 0,
            height,
            overflow: "hidden",
          }}
        />
      )}
      <style >{`

        .preview-wrapper {
          animation: rotate-hue 10s infinite;
        }

        @keyframes rotate-hue {
          0%, 100% {
            filter: hue-rotate(0deg);
          }
          50% {
            filter: hue-rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
});
