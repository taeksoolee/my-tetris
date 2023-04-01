import { Grid } from "./interfaces";
import Piece from "./Piece";

export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 30;

export const LINES_PER_LEVEL = 10;
export const NO_OF_HIGH_SCORES = 10;

export const COLORS: string[] = [
  'none',
  'cyan',
  'blue',
  'orange',
  'yellow',
  'green',
  'purple',
  'red'
];

export const SHAPES: Grid[] = [
  [],
  [
    [0, 0, 0, 0], 
    [1, 1, 1, 1], 
    [0, 0, 0, 0], 
    [0, 0, 0, 0]
  ],
  [
    [2, 0, 0], 
    [2, 2, 2], 
    [0, 0, 0]
  ],
  [
    [0, 0, 3], // 0,0 -> 2,0 ; 0,1 -> 1,0 ; 0,2 -> 0,0
    [3, 3, 3], // 1,0 -> 2,1 ; 1,1 -> 1,1 ; 1,2 -> 0,1 
    [0, 0, 0]
  ],// 2,0 -> 2,2 ; 2,1 -> 1,2 ; 2,2 -> 0,2
  [
    [4, 4], 
    [4, 4]
  ],
  [
    [0, 5, 5], 
    [5, 5, 0], 
    [0, 0, 0]],
  [
    [0, 6, 0], 
    [6, 6, 6], 
    [0, 0, 0]
  ],
  [
    [7, 7, 0], 
    [0, 7, 7], 
    [0, 0, 0]
  ]
];

// constraint
if (COLORS.length !== SHAPES.length) {
  console.warn('warn : difference between COLORS array length and SHAPS array length');
}

export const enum Key {
  ESC=27,
  SPACE=32,
  LEFT=37,
  UP=38,
  RIGHT=39,
  DOWN=40,
  P=80,
  Q=81
};

export const enum Direction {
  LEFT='left',
  RIGHT='right'
};

export const enum Score {
  SINGLE=100,
  DOUBLE=300,
  TRIPLE=500,
  TETRIS=800,
  SOFT_DROP=1,
  HARD_DROP=2,
};

export const LEVEL: Record<number, number> = {
  0: 800,
  1: 720,
  2: 630,
  3: 550,
  4: 470,
  5: 380,
  6: 300,
  7: 220,
  8: 130,
  9: 100,
  10: 80,
  11: 80,
  12: 80,
  13: 70,
  14: 70,
  15: 70,
  16: 50,
  17: 50,
  18: 50,
  19: 30,
  20: 30,
  // 29+ is 20ms
};