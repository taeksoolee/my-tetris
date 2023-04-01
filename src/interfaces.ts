export type Row = number[];

export type Grid = Row[];

export interface Point {
  x: number;
  y: number;
  shape: Grid;
}