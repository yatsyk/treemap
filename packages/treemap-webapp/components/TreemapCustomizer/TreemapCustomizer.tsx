import React, { useState } from "react";
import { observer } from "mobx-react";
import { CushionTreemap } from "../CushionTreemap/CushionTreemap";
import { docsStore } from "../../store/DocsStore/DocsStore";
import { TreemapData } from "../../store/TreemapData/TreemapData";
import { CustomizationPanel } from "./CustomizationPanel";

export const TreemapCustomizer = observer(() => {
  const [treemapData] = useState(new TreemapData());
  return (
    <div
      className="container-xl"
      style={{
        display: "flex",
        flexGrow: 4,
        marginTop: 10,
        minHeight: 0,
        maxHeight: "100%",
      }}
    >
      <div
        className="row row-cards row-deck "
        style={{
          marginBottom: 20,
          flexGrow: 4,
          minHeight: 0,
          //border: "1px solid red",
          maxHeight: "100%",
        }}
      >
        <div
          className="col-lg-8 "
          style={{
            flexGrow: 4,
            minHeight: 0,
            maxHeight: "100%",
            //border: "1px solid red",
          }}
        >
          <div className="card">
            <div className="card-body" style={{display: 'flex'}}>
              <CushionTreemap
                className=""
                root={docsStore.samplesTree}
                treemapData={treemapData}
                style={{
                  display: 'flex',
                  flexGrow: 4,
                  position: 'relative',
                  left: 0, right: 0, top: 0, bottom: 0,
                  overflow: "hidden",
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <CustomizationPanel treemapData={treemapData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
