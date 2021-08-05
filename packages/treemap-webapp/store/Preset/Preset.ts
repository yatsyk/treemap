import { makeAutoObservable } from "mobx";

export class Preset {
  constructor() {
    makeAutoObservable(this);
  }
}
