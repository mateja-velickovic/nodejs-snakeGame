// import '../css/style.css';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_BACKGROUND_COLOR = '#000000'
const SNAKE_COLOR = '#018001'
const SNAKE_BORDER_COLOR = '#000000'
const APPLE_COLOR = '#fc0101'

let posY = 40;
let posX = 40;
let snakeWidth = 40;
let snakeHeight = 40;
let dx = +40;

let snake = [
  { x: 160, y: 40 }
];

const InitGame = () => {

  ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
  ctx.fillRect(0, 0, 800, 800);

  ctx.fillStyle = APPLE_COLOR;
  ctx.fillRect(200, 200, 40, 40);

  setTimeout(() => {

    advanceSnake();

    drawSnake();

    MoveLimit();

    requestAnimationFrame(InitGame);

  }, 250);

  drawSnake();


};

const drawSnakePart = (snakePart) => {
  ctx.fillStyle = SNAKE_COLOR,
    ctx.strokestyle = SNAKE_BORDER_COLOR;
  ctx.fillRect(snakePart.x, snakePart.y, 40, 40);
  ctx.strokeRect(snakePart.x, snakePart.y, 40, 40);
}

const drawSnake = () => {
  snake.forEach(drawSnakePart);
}

const MoveLimit = () => {

  if (snake[0].x < 0) {
    snake[0].x = canvas.width - snakeWidth;
  }

  if (snake[0].x > canvas.width - snakeWidth) {
    snake[0].x = 0;
  }

  if (snake[0].y > canvas.height - snakeWidth) {
    snake[0].y = 0;
  }

  if (snake[0].y < 0) {
    snake[0].y = canvas.height - snakeWidth;
  }

}

const advanceSnake = () => {

  document.onkeydown = checkKey;
  const head = { x: snake[0].x + dx, y: snake[0].y };
  snake.unshift(head);
  snake.pop();

  if (snake[0].x == 200-40 & snake[0].y == 200) {
    snake.push(snake.length * 40, snake[0].y);
    snake.unshift(head);
    snake.pop();
    snake.pop();
  }
  function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
      const head = { x: snake[0].x, y: snake[0].y - dx };
      snake.unshift(head);
      snake.pop();
    }
    else if (e.keyCode == '40') {
      const head = { x: snake[0].x, y: snake[0].y + dx };
      snake.unshift(head);
      snake.pop();
    }
    else if (e.keyCode == '37') {
      const head = { x: snake[0].x - dx, y: snake[0].y };
      snake.unshift(head);
      snake.pop();
    }
    /*else if (e.keyCode == '39') {

    }*/

  }


}


requestAnimationFrame(InitGame);
