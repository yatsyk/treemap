import { flow, makeAutoObservable, observable } from "mobx";
import { INode } from "@cushiontreemap/core";

export class FileSystemAccessProvider {
  root: undefined;

  constructor() {
    makeAutoObservable(this, { root: observable.ref });
  }

  pickDirectory = flow(function* () {
    let dir = yield (window as any).showDirectoryPicker();
    console.info(dir);
    const recur = async (d) => {
      const it = d.entries();
      console.info(d, it);
      for await (const n of it) {
        console.info(n);
      }
    };

    class Node implements INode<string> {
      value?: number;
      children?: Node[];
      id: string;

      constructor(id, children = undefined, value = undefined) {
        this.id = id;
        this.children = children;
        this.value = value;
      }

      prepare() {
        if (typeof this.children !=='undefined') {
          this.children = this.children
            .map((ch) => ch.prepare())
            .filter((ch) => !!ch.value)
            .sort((ch1: Node, ch2: Node) => ch2.value - ch1.value);

          const value = this.children.reduce((m: number, v: Node) => {
            m = m + v.value;
            return m;
          }, 0);

          this.value = value;
        }
        return this;
      }
    }

    const listAllFilesAndDirs = async (path, dirHandle) => {
      //const files = [];
      const res = new Node(path + "/" + dirHandle.name, []);

      for await (let [name, handle] of dirHandle.entries()) {
        const { kind } = handle;
        if (handle.kind === "directory") {
          //files.push({ name, handle, kind });
          //files.push(...(await listAllFilesAndDirs(handle)));
          res.children.push(await listAllFilesAndDirs(res.id, handle));
        } else {
          //files.push({ name, handle, kind });
          const file = await handle.getFile();
          res.children.push(
            new Node(path + "/" + handle.name, undefined, file.size)
          );
        }
      }
      return res;
    };

    //if (dir instanceof global.FileSystemDirectoryHandle) {
    console.info("OK");
    const files = yield listAllFilesAndDirs("", dir);
    this.root = files;
    this.root.prepare();
    console.info("after prepare", this.root);
    //recur(dir);
    //}
  });
}
