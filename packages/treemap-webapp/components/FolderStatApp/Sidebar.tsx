import fileSize from "filesize";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { getColorByType } from "../../lib/getColorByName";
import { FileNode } from "../../store/FolderStatApp/FileNode";
import { FolderStatApp } from "../../store/FolderStatApp/FolderStatApp";
import { OpenedFolderDu } from "../../store/FolderStatApp/OpenedFolderDu";
import { HEADER_HEIGHT } from "./Header";
import { FOOTER_HEIGHT } from "./OpenedFolderFooter";
import { ABS, PADDING } from "./settings";

type Props = {
  app: FolderStatApp;
};

export const Sidebar = observer((props: Props) => {
  const { app } = props;

  const stats = (app.folder.root as FileNode).stats;

  return (
    <div
      className="card"
      style={{
        ...ABS,
        left: undefined,
        right: PADDING,
        top: HEADER_HEIGHT + PADDING,
        bottom: FOOTER_HEIGHT + PADDING,
        width: `calc( 30% - ${2 * PADDING}px)`,
      }}
    >
      <div className="card-header">
        <h3 className="card-title">Stats</h3>
      </div>
      <div
        className="card-body"
        style={{
          overflowY: "auto",
          padding: 0,
        }}
      >
        <table className="table card-table">
          <thead>
            <tr>
              <th colSpan={2}>Type</th>
              <th colSpan={2}>Size</th>
            </tr>
          </thead>
          <tbody style={{ overflowY: "auto" }}>
            {Object.keys(stats).map((type) => (
              <tr key={type}>
                <td>
                  <div
                    className="badge"
                    style={{ backgroundColor: stats[type].color }}
                  />
                </td>
                <td className="" style={{}}>
                  <div className="text-truncate">{type}</div>
                </td>
                {!(app.folder instanceof OpenedFolderDu) && (
                  <td className="">
                    <div className="text-truncate">
                      {fileSize(stats[type].size)}
                    </div>
                  </td>
                )}
                <td style={{ width: "40%", verticalAlign: "middle" }}>
                  <div className="progress progress-xs">
                    <div
                      className="progress-bar bg-primary"
                      style={{
                        width: `${
                          (stats[type].size * 100) / app.folder.root.value
                        }%`,
                      }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
