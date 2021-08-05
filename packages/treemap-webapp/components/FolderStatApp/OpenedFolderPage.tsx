import { observer } from "mobx-react";
import useDimensions from "react-cool-dimensions";
import React, { useEffect, useState } from "react";
import { FolderStatApp } from "../../store/FolderStatApp/FolderStatApp";
import { FOOTER_HEIGHT, OpenedFolderFooter } from "./OpenedFolderFooter";
import { TreeMapCard } from "./TreemapCard";
import ReactLoading from "react-loading";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

type Props = {
  app: FolderStatApp;
};

export const OpenedFolderPage = observer((props: Props) => {
  const { app } = props;
  const { observe: divRef, width, height } = useDimensions({});

  const renderLoading = () => {
    return (
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: FOOTER_HEIGHT,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReactLoading
          type={"bars"}
          color={"#307fdd"}
          height={"10%"}
          delay={0}
          width={"10%"}
        />
      </div>
    );
  };

  const renderLoaded = () => {
    return (
      <>
        <TreeMapCard app={app} />
        <Sidebar app={app} />
      </>
    );
  };

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
      }}
    >
      <Header app={app} />
      {app.folder.root && renderLoaded()}
      {(!app.folder.root || app.folder.scanning) && renderLoading()}
      <OpenedFolderFooter app={app} />
    </div>
  );
});
