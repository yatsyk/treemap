import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { INode } from "@cushiontreemap/core";
import { FolderStatApp } from "../../store/FolderStatApp/FolderStatApp";
import { FileNode } from "../../store/FolderStatApp/FileNode";
import { LINE_HEIGHT, PADDING, boxShadow, LINE_STYLE, ABS } from "./settings";
import filesize from "filesize";
import { OpenedFolderDu } from "../../store/FolderStatApp/OpenedFolderDu";

export const FOOTER_HEIGHT = LINE_HEIGHT;

type Props = {
  app: FolderStatApp;
};

export const OpenedFolderFooter = observer((props: Props) => {
  const { app } = props;

  const renderOverNodes = () => {
    const leaf = app.folder.treeMapData.overNodes.find(
      (v) => typeof v.children == "undefined"
    );
    if (leaf) {
      const nodes = [];
      let current = leaf;
      for (;;) {
        nodes.unshift(current);
        if (current.parent) {
          current = current.parent;
        } else {
          break;
        }
      }
      return nodes.map((n: FileNode) => {
        const r = app.folder.treeMapData.rects.get(n.id);
        return (
          <li key={n.id} className="breadcrumb-item active" aria-current="page">
            <a href="#" onClick={(evt) => evt.preventDefault()}>
              {n.name}
              {!(app.folder instanceof OpenedFolderDu) && (
                <span className="text-muted">[{filesize(n.value)}]</span>
              )}
            </a>
          </li>
        );
      });
    } else {
      return false;
    }
  };

  return (
    <div
      style={{
        ...ABS,
        top: undefined,
        height: FOOTER_HEIGHT,
        overflow: "hidden",
        boxShadow: "rgb(35 46 60 / 4%) 0 2px 4px 0",
        borderTop: LINE_STYLE,
        padding: PADDING,
        whiteSpace: "nowrap",
        alignItems: "center",
        display: "inline-flex",
        backgroundColor: "white",
        flexDirection: "row",
      }}
    >
      {app.folder.lastUpdatePath ? (
        <>
          <span className="text-blue">{app.folder.itemsScanned}</span>
          {app.folder.lastUpdatePath}
        </>
      ) : (
        <ol className="breadcrumb" aria-label="breadcrumbs">
          {app.folder.treeMapData && renderOverNodes()}
        </ol>
      )}
    </div>
  );
});
