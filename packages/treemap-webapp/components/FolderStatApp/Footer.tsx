import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { FolderStatApp } from "../../store/FolderStatApp/FolderStatApp";

type Props = {
  app: FolderStatApp;
};

export const Footer = observer((props: Props) => {
  const { app } = props;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {app.isFileApiSupported ? (
        <div>
          Click{" "}
          <button
            onClick={() => app.showOpenFolderFileAccess()}
            className="btn btn-primary"
          >
            Select Folder
          </button>{" "}
          to open folder you want to analyze.
        </div>
      ) : (
        <div>
          Your borwser doent's supprt{" "}
          <a href="https://wicg.github.io/file-system-access/" target="wicg">
            File System Access
          </a>{" "}
          , please use{" "}
          <a href="https://caniuse.com/native-filesystem-api" target="caniuse">
            browser that supports this API
          </a>
          to analyze folders on your computer
        </div>
      )}
    </div>
  );
});
