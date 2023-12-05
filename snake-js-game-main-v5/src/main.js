import Score from './score.js';



const gameScore = new Score();



const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');



// Couleur du serpent

const SNAKE_COLOR = '#7EBDC2';



// Couleur de la pomme

const APPLE_COLOR = '#BB4430';



// Position X & Y de la pomme (par défaut)

let appleX = (Math.floor(Math.random() * 20)) * 40;

let appleY = (Math.floor(Math.random() * 20)) * 40;



// Direction du joueur définie dans la fonction moveSnake() 

let dir;



// Score du joueur incrémenté dans la fonction moveSnake()

let score = 0;



/* Taille du serpent, une valeur est ajoutée à chaque fois que

   le joueur mange une pomme */

let snake = [

  { x: (Math.floor(Math.random() * 20)) * 40, y: (Math.floor(Math.random() * 20)) * 40 }

];





const initGame = () => {





  var img = new Image();

  img.src = '../resources/images/grid.jpg'

  ctx.drawImage(img, 0, 0, 800, 800);



  ctx.fillStyle = APPLE_COLOR;

  ctx.fillRect(appleX, appleY, 40, 40)



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

  ctx.fillRect(snakePart.x, snakePart.y, 40, 40);

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

};



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



  if (snakeBlocs.x == appleX && snakeBlocs.y == appleY) {



    appleX = (Math.floor(Math.random() * 20)) * 40;

    appleY = (Math.floor(Math.random() * 20)) * 40;

    snake.push(0)



    score++;



    gameScore.UpdateScore(score);





  }



  snake.unshift(snakeBlocs);

  snake.pop();



};



requestAnimationFrame(initGame);