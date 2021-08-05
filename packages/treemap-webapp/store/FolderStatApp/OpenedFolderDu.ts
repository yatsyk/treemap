import { makeAutoObservable } from "mobx";
import { FolderStatApp } from "./FolderStatApp";
import { TreemapData } from "../TreemapData/TreemapData";

export class OpenedFolderDu {
  app = undefined;
  treeMapData: TreemapData;

  constructor(app: FolderStatApp, root) {
    this.app = app;
    this.treeMapData = new TreemapData(root)

    makeAutoObservable(this);
  }

  setCancel(c = true) {
  }

  get root() {
    return this.treeMapData.root 
  }
}
