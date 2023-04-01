import { account } from "./account";
import { Board } from "./Board";
import { BLOCK_SIZE, Key, LEVEL, Score } from "./constants";
import Sound from "./sound";
import { time } from "./time";

const pauseBtn = document.getElementById('pause-btn') as HTMLButtonElement;
const playBtn = document.getElementById('play-btn') as HTMLButtonElement;

const canvas = document.getElementById('board') as HTMLCanvasElement;
const canvasNext = document.getElementById('next') as HTMLCanvasElement;

const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const ctxNext = canvasNext.getContext('2d') as CanvasRenderingContext2D;

const board = new Board(ctx, ctxNext);

const sound = new Sound(document.querySelector("#sound-div"));
const backgroundSound =  sound.create("./assets/sounds/Dungeon_Theme.mp3", "background_sound", true);
const movesSound = sound.create("./assets/sounds/moves.mp3", "moves_sound");
const dropSound = sound.create("./assets/sounds/drop.mp3", "drop_sound");
const pointsSound = sound.create("./assets/sounds/points.mp3", "points_sound");
const finishSound = sound.create("./assets/sounds/finish.mp3", "finish_sound");

function main() {
  // initNext
  ctxNext.canvas.width = 4 * BLOCK_SIZE;
  ctxNext.canvas.height = 4 * BLOCK_SIZE;
  ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);

  showHighScores();

  sound.muteToggle();
  sound.soundSetting();

  playBtn.addEventListener('click', play);
  pauseBtn.addEventListener('click', pause);
}

main();

/*************************************
 * functions
 ************************************/
function addEventListener() {
  document.removeEventListener('keydown', handleKeyPress);
  document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(event: KeyboardEvent) {
  if (event.keyCode === Key.P) {
    pause();
  } else if (event.keyCode === Key.ESC) {
    gameOver();
  } else {
    event.preventDefault();

    try {
      let p = board.move(event.keyCode, board.piece);

      if (event.keyCode === Key.SPACE) {
        const pauseBtn = document.getElementById('pause-btn') as HTMLButtonElement;
        // Hard Drop
        if (pauseBtn.style.display === 'block') {
          console.log(dropSound);
          dropSound.play();
        } else {
          return;
        }

        while (board.valid(p)) {
          account.score += Score.HARD_DROP;
          board.piece.move(p);
          p = board.move(Key.DOWN, board.piece);
        }
        board.piece.hardDrop();
      } else if (board.valid(p)) {
        const isPause = pauseBtn.style.display === 'block';

        if (isPause) {
          movesSound.play();
        }
        board.piece.move(p);

        if (event.keyCode === Key.DOWN && isPause) {
          account.score += Score.SOFT_DROP;
        }
      }
    } catch(err) {
      // invalid key
      // console.warn(err);
    }
  }
}

function resetGame() {
  account.score = 0;
  account.lines = 0;
  account.level = 0;

  board.reset();

  time.start = performance.now();
  time.elapsed = 0;
  time.level = LEVEL[account.level];
}


let requestId: number = 0;
function play() {
  addEventListener();

  if (playBtn.style.display === '') {
    resetGame();
  }

  if (requestId) {
    cancelAnimationFrame(requestId);
  }

  animate();
  playBtn.style.display = 'none';
  pauseBtn.style.display = 'block';
  backgroundSound.play();
}

function animate(now = 0) {
  time.elapsed = now - time.start;
  if (time.elapsed > time.level) {
    time.start = now;
    if (!board.drop()) {
      gameOver();
      return;
    }
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  board.draw();
  requestId = requestAnimationFrame(animate);
}

function gameOver() {
  cancelAnimationFrame(requestId);

  ctx.fillStyle = 'black';
  ctx.fillRect(1, 3, 8, 1.2);
  ctx.font = '1px Arial';
  ctx.fillStyle = 'red';
  ctx.fillText('GAME OVER', 1.8, 4);
  
  sound.pause();
  finishSound.play();
  checkHighScore(account.score);

  pauseBtn.style.display = 'none';
  playBtn.style.display = '';
}

function pause() {
  if (!requestId) {
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    animate();
    backgroundSound.play();
    return;
  }

  cancelAnimationFrame(requestId);
  requestId = 0;

  ctx.fillStyle = 'black';
  ctx.fillRect(1, 3, 8, 1.2);
  ctx.font = '1px Arial';
  ctx.fillStyle = 'yellow';
  ctx.fillText('PAUSED', 3, 4);
  playBtn.style.display = 'block';
  pauseBtn.style.display = 'none';
  sound.pause();
}

function showHighScores() {

}

function checkHighScore(score: number) {

}

function saveHighScroe(scroe: number, highScores: number) {

}