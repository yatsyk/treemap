import { flow, makeAutoObservable } from "mobx";
import { FolderStatApp } from "./FolderStatApp";
import { TreemapData } from "../TreemapData/TreemapData";
import { FileNode } from "./FileNode";

export class OpenedFolderFileSytemAccess {
  app = undefined;
  dir = undefined;
  //root = undefined;
  lastUpdatePath = "";
  itemsScanned = 0;
  treeMapData?: TreemapData;
  cancel = false;
  scanning = false;

  constructor(app: FolderStatApp, dir: any) {
    this.app = app;
    this.dir = dir;

    makeAutoObservable(this);
  }

  setCancel(c = true) {
    this.cancel = c;
  }

  updateProgress(path: string, itemsScanned: number) {
    this.lastUpdatePath = path;
    this.itemsScanned = itemsScanned;
  }

  scan = flow(function* scan(this: OpenedFolderFileSytemAccess) {
    try {
      let itemsScanned = 0;
      this.setCancel(false);
      this.scanning = true;
      let lastUpdatePath = "";
      const interval = setInterval(
        () => this.updateProgress(lastUpdatePath, itemsScanned),
        100
      );
      const listAllFilesAndDirs = async (
        parent: FileNode | undefined,
        path: string,
        dirHandle: any
      ) => {
        const p = path + "/" + dirHandle.name;
        lastUpdatePath = p;
        const res = new FileNode(parent, dirHandle.name, []);
        for await (let [name, handle] of dirHandle.entries()) {
          const { kind } = handle;
          itemsScanned += 1;
          if (this.cancel) {
            return;
          }
          if (handle.kind === "directory") {
            res.children.push(await listAllFilesAndDirs(res, res.id, handle));
          } else {
            const file = await handle.getFile();
            res.children.push(
              new FileNode(res, handle.name, undefined, file.size)
            );
          }
        }
        return res;
      };

      const root = yield listAllFilesAndDirs(undefined, "", this.dir);
      if (this.cancel) {
        this.setCancel(false);
        return;
      }
      root.prepare();
      this.treeMapData = new TreemapData(root);
      clearInterval(interval);
      this.updateProgress("", 0);
    } finally {
      this.scanning = false;
    }
  });

  get root() {
    return this.treeMapData ? this.treeMapData.root : undefined;
  }
}
