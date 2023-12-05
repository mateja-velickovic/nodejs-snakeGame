// import '../css/style.css';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let posY = 300;
let posX = 400;
let snakeWidth = 40;
let snakeHeight = 40;




// Tableau bidimensionnel 
const gameArray = [,];

const Apple = () => {
  // Position aléatoire de Apple();
  const appleX = Math.random() * (770);
  const appleY = Math.random() * (770);
  ctx.fillStyle = 'red';
  ctx.fillRect(appleX, appleY, snakeWidth, snakeHeight);

}

const SnakeMove = () => {

  ctx.fillStyle = '#a3d04a';
  ctx.fillRect(0, 0, 800, 800);

  ctx.fillStyle = '#2b58bf';
  ctx.fillRect(posX, posY, snakeWidth, snakeHeight);



  setTimeout(() => {
    posX += 2;


    if (posX < 0) {
      posX = canvas.width - snakeWidth
    }

    if (posX > canvas.width - snakeWidth) {
      posX = 0;
    }

    if (posY > canvas.height - snakeWidth) {
      posY = 0;
    }

    if (posY < 0) {
      posY = canvas.height - snakeWidth
    }

  }, 1000);

  Apple();

  requestAnimationFrame(SnakeMove);

};
requestAnimationFrame(SnakeMove);
