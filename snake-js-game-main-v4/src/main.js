const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


const CANVAS_BACKGROUND_COLOR = '#000000';
const SNAKE_COLOR = '#018001';
const SNAKE_BORDER_COLOR = '#000000';
const APPLE_COLOR = '#fc0101';

let snake = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 }
];

let dir;

const initGame = () => {
  ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
  ctx.fillRect(0, 0, 800, 800);

  ctx.fillStyle = APPLE_COLOR;
  ctx.fillRect(200, 200, 40, 40);

  setTimeout(() => {
    moveSnake();
    drawSnake();
    moveLimit();
    requestAnimationFrame(initGame);
  }, 100);

  drawSnake();
};

const drawSnakePart = (snakePart) => {
  ctx.fillStyle = SNAKE_COLOR;
  ctx.strokestyle = SNAKE_BORDER_COLOR;
  ctx.fillRect(snakePart.x, snakePart.y, 40, 40);
  ctx.strokeRect(snakePart.x, snakePart.y, 40, 40);
};

const drawSnake = () => {
  snake.forEach(drawSnakePart);
};

const moveLimit = () => {
  if (snake[0].x < 0 || snake[0].x > canvas.width - 40 || snake[0].y > canvas.height - 40 || snake[0].y < 0) {
    alert('Perdu');
  }
};

document.onkeydown = (e) => {
  // UP
  if (e.keyCode == '38') {
    dir = 1;
  }
  // DOWN
  else if (e.keyCode == '40') {
    dir = 2;
  }
  // LEFT
  else if (e.keyCode == '37') {
    dir = 3;
  }
  // RIGHT 
  else if (e.keyCode == '39') {
    dir = 4;
  
}
}

const moveSnake = () => {
  const snakeBlocs = { ...snake[0] };

  if (dir == 1) {
    snakeBlocs.y -= 40;
  } else if (dir == 2) {
    snakeBlocs.y += 40;
  } else if (dir == 3) {
    snakeBlocs.x -= 40;
  } else if (dir == 4) {
    snakeBlocs.x += 40;
  }

  snake.unshift(snakeBlocs);
  snake.pop();
};

requestAnimationFrame(initGame);