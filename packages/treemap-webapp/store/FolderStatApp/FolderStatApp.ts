import { action, flow, makeAutoObservable } from "mobx";
import { OpenedFolderFileSytemAccess } from "./OpenedFolderFileSystemAccess";
import { defer } from "lodash";
import { FileSystemAccessProvider } from "../TreeNodesProviders/FileSystemAccessProvider/FileSystemAccessProvider";
import fileToArrayBuffer from "file-to-array-buffer";
import { OpenedFolderDu } from "./OpenedFolderDu";
import { createNodesFromPairs } from "../../lib/createNodesFromPairs";

export class FolderStatApp {

  folder?: OpenedFolderFileSytemAccess | OpenedFolderDu; 
  isFileApiSupported = false;

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== "undefined") {
      defer(
        action(() => {
          this.isFileApiSupported = !!(window as any).showDirectoryPicker;
        })
      );
    }
  }

  showOpenFolderFileAccess = flow(function* (this: FolderStatApp) {
    try {
      const ap = new FileSystemAccessProvider();
      let dir = yield (window as any).showDirectoryPicker();
      console.info(dir);
      if (dir) {
        this.folder = new OpenedFolderFileSytemAccess(this, dir);
        this.folder.scan();
      }
    } catch (ee) {
      console.error(ee);
    }
  });

  closeOpenedFolder() {
    this.folder.setCancel(true);
    this.folder = undefined;
  }

  loadDuFile = flow(function* loadDuFile(this: FolderStatApp, file: File) {
    const buffer = yield fileToArrayBuffer(file);
    var enc = new TextDecoder("utf-8");
    const str = enc.decode(buffer);
    const lines = str.match(/[^\r\n]+/g);

    const pairs = lines.map(s => {
      const m = s.match(/(\d+)\t+(.*)/)
      if (m) {
        return [ m[2], parseInt(m[1])]
      } else {
        return false;
      }
    }).filter(r => !!r) as [string, number][]

    const root = createNodesFromPairs(pairs)

    this.folder = new OpenedFolderDu(this, root);
  });
}
