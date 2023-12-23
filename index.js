const COL_NUM = 15;
const ROW_NUM = 30;
const SIZE = 20; // px
const BORDER_LEN = 1; // px

const $board = document.getElementById('board');
const $nextFigureBoard = document.getElementById('nextFigureBoard');
const grid = [];

const initApp = () => {
  $board.style.border = `${BORDER_LEN}px solid lightgray`;
  $board.style.width = `${(SIZE+(BORDER_LEN*2)) * COL_NUM}px`;

  for (let rIdx=0; rIdx<ROW_NUM; rIdx++) {
    grid.push([]);

    const $row = document.createElement('div');
    $row.classList.add('row');
    $row.style.display = 'flex';
    $row.style.width = `${(SIZE+(BORDER_LEN*2)) * COL_NUM}px`;

    for (let colIdx=0; colIdx<COL_NUM; colIdx++) {
      grid[rIdx].push(0);
      const $col = document.createElement('div');
      $col.classList.add('col');
      $col.style.width = `${SIZE}px`;
      $col.style.height = `${SIZE}px`;
      $col.style.border = `${BORDER_LEN}px solid lightgray`;
      
      $row.appendChild($col);
    }

    $board.appendChild($row);
  }

  $nextFigureBoard.style.border = `${BORDER_LEN}px solid lightgray`;
  $nextFigureBoard.style.width = `${(SIZE+(BORDER_LEN*2)) * 5}px`;

  for (let i=0; i<5; i++) {
    const $row = document.createElement('div');
    $row.classList.add('row');
    $row.style.display = 'flex';
    $row.style.width = `${(SIZE+(BORDER_LEN*2)) * COL_NUM}px`;

    for (let j=0; j<5; j++) {
      const $col = document.createElement('div');
      $col.classList.add('col');
      $col.style.width = `${SIZE}px`;
      $col.style.height = `${SIZE}px`;
      $col.style.border = `${BORDER_LEN}px solid lightgray`;
      
      $row.appendChild($col);
    }

    $nextFigureBoard.appendChild($row);
  }
}

initApp();


const figure = [
  (type=0) => {
    type = type % 2;
    switch(type) {
      case 1:
        return [
          [0, 0, 1, 0, 0,],
          [0, 0, 1, 0, 0,],
          [0, 0, 1, 0, 0,],
          [0, 0, 1, 0, 0,],
          [0, 0, 1, 0, 0,],
        ];
      default:
        return [
          [0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0,],
          [1, 1, 1, 1, 1,],
          [0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0,],
        ];
    }
  },
  (type=0) => {
    type = type % 1;
    switch(type) {
      default:
        return [
          [0, 0, 0, 0, 0,],
          [0, 0, 1, 1, 0,],
          [0, 0, 1, 1, 0,],
          [0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0,],
        ];
    }
  },
  (type=0) => {
    type = type % 4;
    switch(type) {
      case 1:
        return [
          [0, 1, 0, 0, 0,],
          [0, 1, 1, 0, 0,],
          [0, 1, 0, 0, 0,],
          [0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0,],
        ];
      case 2:
        return [
          [0, 1, 1, 1, 0,],
          [0, 0, 1, 0, 0,],
          [0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0,],
        ];
      case 3:
        return [
          [0, 0, 0, 1, 0,],
          [0, 0, 1, 1, 0,],
          [0, 0, 0, 1, 0,],
          [0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0,],
        ];
      default:
        return [
          [0, 0, 0, 0, 0,],
          [0, 0, 1, 0, 0,],
          [0, 1, 1, 1, 0,],
          [0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0,],
        ];
    }
  },
  (type=0) => {
    type = type % 2;
    switch(type) {
      case 1:
        return [
          [0, 0, 1, 0, 0,],
          [0, 0, 1, 1, 0,],
          [0, 0, 0, 1, 0,],
          [0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0,],
        ];
      default:
        return [
          [0, 0, 0, 0, 0,],
          [0, 0, 1, 1, 0,],
          [0, 1, 1, 0, 0,],
          [0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0,],
        ];
    }
  },
  (type=0) => {
    type = type % 2;
    switch(type) {
      case 1:
        return [
          [0, 0, 1, 0, 0,],
          [0, 1, 1, 0, 0,],
          [0, 1, 0, 0, 0,],
          [0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0,],
        ];
      default:
        return [
          [0, 0, 0, 0, 0,],
          [0, 1, 1, 0, 0,],
          [0, 0, 1, 1, 0,],
          [0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0,],
        ];
    }
  },
  (type=0) => {
    type = type % 4;
    switch(type) {
      case 1:
        return [
          [0, 0, 1, 0, 0,],
          [0, 0, 1, 0, 0,],
          [0, 0, 1, 0, 0,],
          [0, 1, 1, 0, 0,],
          [0, 0, 0, 0, 0,],
        ];
      case 2:
        return [
          [0, 0, 0, 0, 0,],
          [0, 1, 1, 1, 1,],
          [0, 0, 0, 0, 1,],
          [0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0,],
        ];
      case 3:
        return [
          [0, 0, 1, 1, 0,],
          [0, 0, 1, 0, 0,],
          [0, 0, 1, 0, 0,],
          [0, 0, 1, 0, 0,],
          [0, 0, 0, 0, 0,],
        ];
      default:
        return [
          [0, 0, 0, 0, 0,],
          [0, 1, 0, 0, 0,],
          [0, 1, 1, 1, 1,],
          [0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0,],
        ];
    }
  },
  (type=0) => {
    type = type % 4;
    switch(type) {
      case 1:
        return [
          [0, 1, 0, 0, 0,],
          [0, 1, 0, 0, 0,],
          [0, 1, 0, 0, 0,],
          [0, 1, 1, 0, 0,],
          [0, 0, 0, 0, 0,],
        ];
      case 2:
        return [
          [0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 1,],
          [0, 1, 1, 1, 1,],
          [0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0,],
        ];
      case 3:
        return [
          [0, 0, 1, 1, 0,],
          [0, 0, 0, 1, 0,],
          [0, 0, 0, 1, 0,],
          [0, 0, 0, 1, 0,],
          [0, 0, 0, 0, 0,],
        ];
      default:
        return [
          [0, 0, 0, 0, 0,],
          [0, 1, 1, 1, 1,],
          [0, 1, 0, 0, 0,],
          [0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0,],
        ];
    }
  },
];

const getFigure = () => {
  const idx = Math.round(Math.random() * (figure.length-1));
  console.log(idx);
  return figure[idx];
};

const position = {
  x: Math.floor(COL_NUM / 2), 
  y: 0
}; // x, y
let curFigure = null;
let nextFigure = null;
let rotateCnt = 0;



const generateRenderingGrid = () => {
  const figure = curFigure(rotateCnt);
  
  const x = position.x - 3;
  const y = position.y - 3;

  const renderingGrid = grid.map(r => r.map(v => v));

  for (let i=0; i<5; i++) {
    for (let j=0; j<5; j++) {
      if (!(y+i > -1 && x+j > -1)) continue;
      const value = figure[i][j];
      if (!value) continue;
      if (typeof renderingGrid[y+i] === 'undefined') continue;
      if (typeof renderingGrid[y+i][x+j] === 'undefined') continue;
      renderingGrid[y+i][x+j] = value;
    }
  }

  return renderingGrid;
}

const isEndLine = () => {
  if (!curFigure) return true;

  const figure = curFigure(rotateCnt);

  const x = position.x - 3;
  const y = position.y - 3;

  for (let i=0; i<5; i++) {
    for (let j=0; j<5; j++) {
      const value = figure[i][j];
      if (!value) continue;
      if (y+i+1 >= ROW_NUM) return true;

      if (typeof grid[y+i+1] === 'undefined') continue;
      if (typeof grid[y+i+1][x+j] === 'undefined') continue;
      if (grid[y+i+1][x+j] === 2) return true;
    }
  }

  return false;
}

const attachFigure = () => {
  if (!curFigure) return;

  const figure = curFigure(rotateCnt);

  const x = position.x - 3;
  const y = position.y - 3;

  for (let i=0; i<5; i++) {
    for (let j=0; j<5; j++) {
      const value = figure[i][j];
      if (!value) continue;
      if (typeof grid[y+i] === 'undefined') continue;
      if (typeof grid[y+i][x+j] === 'undefined') continue;
      grid[y+i][x+j] = 2
    }
  }
}

const setNewFigure = () => {
  curFigure = nextFigure ? nextFigure : getFigure();
  nextFigure = getFigure();

  position.x = Math.floor(COL_NUM / 2);
  position.y = 0;


  const $grid = [...$nextFigureBoard.querySelectorAll('.row')].map(row => {
    return [...row.querySelectorAll('.col')]
  });

  const grid = nextFigure();

  grid.forEach((row, rIdx) => {
    row.forEach((value, cIdx) => {
      if (value === 0) {
        $grid[rIdx][cIdx].style.backgroundColor = 'white';
      } else if (value === 1) {
        $grid[rIdx][cIdx].style.backgroundColor = 'red';
      } else if (value === 2) {
        // $grid[rIdx][cIdx].style.backgroundColor = 'gray';
        $grid[rIdx][cIdx].style.backgroundColor = 'red';
      }      
    })
  });
}

const activeEndLine = () => {
  attachFigure();
  setNewFigure();
}

const run = (isDown=true) => {
  if (isEndLine()) {
    activeEndLine();
  } else {
    render(generateRenderingGrid());
    isDown && position.y++;
  }
};

const start = () => {
  setInterval(() => run(), 500);

  window.addEventListener('keydown', (e) => {
    const figure = curFigure(rotateCnt);

    const x = position.x - 3;
    const y = position.y - 3;

    let isBlocked = false;

    switch(e.code) {
      case 'ArrowRight':
        for (let i=0; i<5; i++) {
          for (let j=0; j<5; j++) {
            const value = figure[i][j];
            if (!value) continue;
            if (x+j+1 >= COL_NUM) isBlocked = true;
    
            if (typeof grid[y+i] === 'undefined') continue;
            if (typeof grid[y+i][x+j+1] === 'undefined') continue;
            if (grid[y+i][x+j+1] === 2) isBlocked = true;
          }
        }

        if (!isBlocked) {
          position.x++;
          run(false);
        }
        break;
      case 'ArrowLeft':
        for (let i=0; i<5; i++) {
          for (let j=0; j<5; j++) {
            const value = figure[i][j];
            if (!value) continue;
            if (x+j-1 < 0) isBlocked = true;
    
            if (typeof grid[y+i] === 'undefined') continue;
            if (typeof grid[y+i][x+j-1] === 'undefined') continue;
            if (grid[y+i][x+j-1] === 2) isBlocked = true;
          }
        }

        if (!isBlocked) {
          position.x--;
          run(false);
        }
        break;
      case 'ArrowDown':
        run();
        break;
      case 'ArrowUp':
        rotateCnt++;
        render(generateRenderingGrid());
        break;
      case 'Space':
        e.preventDefault();
        while(!isEndLine()) {
          position.y++
        }
        activeEndLine();
        break;
    }
  });
}

const render = (grid) => {
  const $grid = [...$board.querySelectorAll('.row')].map(row => {
    return [...row.querySelectorAll('.col')]
  });

  grid.forEach((row, rIdx) => {
    row.forEach((value, cIdx) => {
      if (value === 0) {
        $grid[rIdx][cIdx].style.backgroundColor = 'white';
      } else if (value === 1) {
        $grid[rIdx][cIdx].style.backgroundColor = 'red';
      } else if (value === 2) {
        // $grid[rIdx][cIdx].style.backgroundColor = 'gray';
        $grid[rIdx][cIdx].style.backgroundColor = 'red';
      }      
    })
  });
}


document.getElementById('startBtn').addEventListener('click', start);