import { flow, makeAutoObservable } from "mobx";
import { INode} from "@cushiontreemap/core";
import { createNodesFromPairs } from "../../lib/createNodesFromPairs";

export class DocsStore {
  samplesTree?: INode<string> = undefined;

  constructor() {
    makeAutoObservable(this);
    if (typeof window != "undefined") {
      this.createSamples();
    }
  }

  createSamples = flow(function* createSamples(this: DocsStore) {
    const r = yield fetch("/fs.json");
    const root = yield r.json();
    this.samplesTree = root;
  });

  createSamples1 = flow(function* createSamples(this: DocsStore) {
    const r = yield fetch("/du.txt");
    const text = yield r.text();
    const lines = text.split(/[\r\n]+/);
    const namesWithSize: Array<[string, number]> = lines
      .map((line) => line.match(/(\d+)\t+(.*)/))
      .filter((a) => a)
      .map((a) => [a[2], parseInt(a[1])]);

    const root = createNodesFromPairs(namesWithSize);
    this.samplesTree = root;
  });
}

export const docsStore = new DocsStore;