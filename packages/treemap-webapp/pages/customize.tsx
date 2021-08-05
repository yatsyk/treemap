import React, { useRef, useState } from "react";
import { observer } from "mobx-react";
import useDimensions from "react-cool-dimensions";
import { TreemapCustomizer } from "../components/TreemapCustomizer/TreemapCustomizer";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ForkCorner } from "../components/layout/ForkCornet";

const E2 = observer(() => {
  const { observe: divRef, width, height } = useDimensions({});
  return (
    <div
      ref={divRef}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <TreemapCustomizer />
      <Footer />
      <ForkCorner />
    </div>
  );
});

export default E2;
