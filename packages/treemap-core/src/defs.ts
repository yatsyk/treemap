import { Rectangle } from "./Rectangle";

export type Color = [number, number, number, number];

export enum Dir {
  x,
  y,
}

export interface INode<Uid> {
  value?: number;
  children?: Array<INode<Uid>>;
  id: Uid;
}

export type DrawSettings = {
  Ia?: number;
  Is?: number;
  Lx?: number;
  Ly?: number;
  Lz?: number;
};
