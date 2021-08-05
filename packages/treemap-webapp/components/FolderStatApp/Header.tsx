import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { FolderStatApp } from "../../store/FolderStatApp/FolderStatApp";
import { OpenedFolderDu } from "../../store/FolderStatApp/OpenedFolderDu";
import { ABS, LINE_HEIGHT, LINE_STYLE, PADDING } from "./settings";

type Props = {
  app: FolderStatApp;
};

export const HEADER_HEIGHT = LINE_HEIGHT;

export const RefreshIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
    <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
  </svg>
);
export const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const Header = observer((props: Props) => {
  const { app } = props;

  const refreshClicked = (evt) => {
    evt.preventDefault();
    app.folder.scan();
  };
  const closeClicked = (evt) => {
    evt.preventDefault();
    app.closeOpenedFolder();
  };
  return (
    <div
      className=""
      style={{
        ...ABS,
        bottom: undefined,
        height: HEADER_HEIGHT,
        boxShadow: "rgb(35 46 60 / 4%) 0 2px 4px 0",
        borderBottom: LINE_STYLE,
        padding: PADDING,
        whiteSpace: "nowrap",
        alignItems: "center",

        display: "inline-flex",
        backgroundColor: "white",
        flexDirection: "row",
      }}
    >
      {!(app.folder instanceof OpenedFolderDu) && <div style={{ marginRight: PADDING }} className="">
        <a
          href="#"
          className={`btn btn-light w-100 ${
            app.folder.scanning ? "disabled" : ""
          }`}
          onClick={refreshClicked}
        >
          <RefreshIcon />
          Refresh
        </a>
      </div>}
      <div className="">
        <a href="#" className="btn btn-light w-100" onClick={closeClicked}>
          <CloseIcon />
          Close
        </a>
      </div>
    </div>
  );
});
