import { BLOCK_SIZE, COLORS, COLS, Direction, Key, LEVEL, LINES_PER_LEVEL, ROWS, Score } from "./constants";
import { Grid, Point, Row } from "./interfaces";
import Piece from "./Piece";
import { account } from './account';
import { time } from './time';

export class Board {
  ctx: CanvasRenderingContext2D;
  ctxNext: CanvasRenderingContext2D;
  grid!: Grid;

  piece!: Piece;
  next!: Piece;

  constructor(ctx: CanvasRenderingContext2D, ctxNext: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.ctxNext = ctxNext;

    this.init();
  }

  init(): void {
    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;

    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  reset(): void {
    this.grid = this.getEmptyGrid();
    this.piece = new Piece(this.ctx);
    this.piece.setStartingPosition();
    this.getNewPiece();
  }

  getNewPiece(): void {
    const { width, height } = this.ctxNext.canvas;
    this.next = new Piece(this.ctxNext);
    this.ctxNext.clearRect(0, 0, width, height);
    this.next.draw();
  }

  draw(): void {
    this.piece.draw();
    this.drawBoard();
  }


  /**
   * @returns isGameOver
   */
  drop(): boolean {
    let p = this.move(Key.DOWN, this.piece);

    if (this.valid(p)) {
      this.piece.move(p);
    } else {
      this.freeze();
      this.clearLines();

      // Game Over
      if (this.piece.y === 0) {
        return false;
      }

      this.piece = this.next;
      this.piece.ctx = this.ctx;
      this.piece.setStartingPosition();
      this.getNewPiece();
    }
    return true;
  }

  clearLines() {
    let lines = 0;

    this.grid.forEach((row, y) => {
      if (row.every((value) => value > 0)) {
        lines++;
        this.grid.splice(y, 1);
        this.grid.unshift(this.getEmptyRow());
      }
    });

    if (lines > 0) {

      account.score += this.getLinesClearedPoints(lines);
      account.lines += lines;

      if (account.lines >= LINES_PER_LEVEL) {
        account.level++;
        account.lines -= LINES_PER_LEVEL;
        time.level = LEVEL[account.level];
      }
    }
  }

  valid(p: Point): boolean {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = p.x + dx;
        let y = p.y + dy;
        return value === 0 || (this.isInsideWalls(x, y) && this.notOccupied(x, y));
      })
    })
  }

  freeze(): void {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.grid[y + this.piece.y][x + this.piece.x] = value;
        }
      })
    })
  }

  drawBoard() {
    this.grid.forEach((row, y) => {
      row?.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = COLORS[value];
          this.ctx.fillRect(x, y, 1, 1);
        }
      })
    })
  }

  getEmptyRow(): Row {
    return Array(COLS).fill(0);
  }

  getEmptyGrid(): Grid {
    return Array.from({
      length: ROWS,
    }).map(() => this.getEmptyRow());
  }

  isInsideWalls(x: number, y: number) {
    return x >= 0 && x < COLS && y <= ROWS;
  }

  notOccupied(x: number, y: number) {
    return this.grid[y] && this.grid[y][x] === 0;
  }

  rotate(piece: Piece, direction: Direction): Point {
    const p = piece.getPoint();

    if (!piece.hardDropped) {
      // Transpose matrix
      for (let y=0; y < p.shape.length; ++y) {
        for (let x=0; x < y; ++x) {
          [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
        }
      }

      switch(direction) {
        case Direction.RIGHT:
          p.shape.forEach((row) => row.reverse());
          break;
        case Direction.LEFT:
          p.shape.reverse();
          break;
      }
    }

    return p;
  }

  move(key: Key, p: Piece): Point {
    switch(key) {
      case Key.LEFT:
        return p.getPoint({
          x: p.x - 1
        });
      case Key.RIGHT:
        return p.getPoint({
          x: p.x + 1
        });
      case Key.DOWN:
        return p.getPoint({
          y: p.y + 1
        });
      case Key.SPACE:
        return p.getPoint({
          y: p.y + 1
        });
      case Key.UP:
        return this.rotate(p, Direction.RIGHT);
      case Key.Q:
        return this.rotate(p, Direction.LEFT);
      default:
        throw Error('invalid key type');
        // console.warn('invalid key type');
        // return p.getPoint();
    }
  }

  getLinesClearedPoints(lines: number, _level?: number): number {
    const lineClearPoints =
      lines === 1
        ? Score.SINGLE
        : lines === 2
          ? Score.DOUBLE
          : lines === 3
            ? Score.TRIPLE
            : lines === 4
              ? Score.TETRIS
              : 0;
    // pointsSound.play();
    return (account.level + 1) * lineClearPoints;
  }
}