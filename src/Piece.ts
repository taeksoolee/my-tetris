import { COLORS, SHAPES } from "./constants";
import { Grid, Point } from "./interfaces";

export default class Piece implements Point {
  ctx: CanvasRenderingContext2D;
  typeId!: number;

  shape!: Grid;
  color!: string;
  x!: number;
  y!: number;
  hardDropped!: boolean;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.spawn();
  }

  spawn() {
    this.typeId = this.randomizeTetrominoType(COLORS.length - 1);
    this.shape = SHAPES[this.typeId];
    this.color = COLORS[this.typeId];

    this.x = 0;
    this.y = 0;
    this.hardDropped = false;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
        }
      })
    });
  }

  move(p: Point) {
    if (!this.hardDropped) {
      this.x = p.x;
      this.y = p.y;
    }

    this.shape = p.shape;
  }

  hardDrop() {
    this.hardDropped = true;
  }

  setStartingPosition() {
    this.x = this.typeId === 4 ? 4 : 3;
  }

  randomizeTetrominoType(noOfTypes: number) {
    return Math.floor(
      Math.random() * noOfTypes + 1
    );
  }

  getPoint(p?: Partial<Point>): Point {
    return {
      x: p?.x ?? this.x,
      y: p?.y ?? this.y,
      shape: p?.shape ?? this.shape
    }
  }
}