/*
Lieu        : ETML, Sébeillon
Auteur      : Mateja Velickovic
Date        : 07.11.2023
Description : Refonte du célèbre jeu du Snake en Javascript
              dans un environnement Ubuntu
*/

// Importation de la classe Score depuis le fichier score.js
import Score from './score.js';
const gameScore = new Score();

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const SNAKE_COLOR = '#7EBDC2'; // Corps du serpent
const HEAD_COLOR = '#6a9da1'; // Tête du serpent
const APPLE_COLOR = '#BB4430'; // Pomme

// Position X & Y de la pomme (par défaut)
let appleX = (Math.floor(Math.random() * 20)) * 40;
let appleY = (Math.floor(Math.random() * 20)) * 40;

// Direction du joueur définie dans la fonction moveSnake() 
let dir;

// Score du joueur incrémenté dans la fonction moveSnake()
let score = 0;

/* Taille du serpent, une valeur est ajoutée à chaque fois que
   le joueur mange une pomme */
let aleX = (Math.floor(Math.random() * 20)) * 40
let aleY = (Math.floor(Math.random() * 20)) * 40
let snake = [
  { x: aleX, y: aleY, },
];

// Initialisation du jeu
const initGame = () => {

  // Fond d'écran de jeu
  let img = new Image();
  img.src = '../resources/images/grid.jpg'
  ctx.drawImage(img, 0, 0, 800, 800);

  // Initialisation de la pomme
  ctx.fillStyle = APPLE_COLOR;
  ctx.fillRect(appleX, appleY, 40, 40)

  // Définition de la vitesse de jeu
  let time = 100

  setTimeout(() => {

    // Affichage du serpent
    drawSnake();

    // Mouvements du serpent
    moveSnake();

    // Limites du terrain de jeu
    moveLimit();

    requestAnimationFrame(initGame);
  }, time);

  drawSnake();
};

// Parcours
const drawSnakePart = (snakePart, isHead) => {

  // Si ce n'est pas la tête alors : SNAKE_COLOR
  if (!isHead) {
    ctx.fillStyle = SNAKE_COLOR;
    ctx.fillRect(snakePart.x, snakePart.y, 40, 40);
  }

  // Sinon : HEAD_COLOR
  else {
    ctx.fillStyle = HEAD_COLOR;
    ctx.fillRect(snakePart.x, snakePart.y, 40, 40);
  }

};

// Affichage du serpent
const drawSnake = () => {

  snake.forEach((snakePart, index) => {

    const isHead = index === 0;

    // Vérification si c'est la tête, ou non
    drawSnakePart(snakePart, isHead);

  });
};

// Définition des limites de jeu
const moveLimit = () => {

  if (snake[0].x < 0 || snake[0].x > canvas.width - 40 || snake[0].y > canvas.height - 40 || snake[0].y < 0) {

    // Affichage un message d'alerte lorsque le joueur a touché un bord
    alert('Perdu');

  }
};

// Vérification de la touche pressée par l'utilisateur en utilisant le code des touches
document.onkeydown = (e) => {
  // Si flèche du haut alors, on retourne 1
  if (e.keyCode == '38' && dir != 2) {
    dir = 1;
  }
  // Si flèche du bas alors, on retourne 2
  else if (e.keyCode == '40' && dir != 1) {
    dir = 2;
  }
  // Si flèche de gauche alors, on retourne 3
  else if (e.keyCode == '37' && dir != 4) {
    dir = 3;
  }
  // Si flèche de gauche alors, on retourne 4
  else if (e.keyCode == '39' && dir != 3) {
    dir = 4;
  }
};

// Déplacement du serpent
const moveSnake = () => {
  const head = { x: snake[0].x, y: snake[0].y };
  const snakePart = { ...snake[0] }

  // Si dir vaut 1 alors on monte
  if (dir == 1) {
    head.y -= 40;
  }
  // Si dir vaut 2 alors on descend
  else if (dir == 2) {
    head.y += 40;
  }
  // Si dir vaut 3 alors on va à gauche
  else if (dir == 3) {
    head.x -= 40;
  }
  // Si dir vaut 4 alors on va à droite
  else if (dir == 4) {
    head.x += 40;
  }

  // Si le serpent se rentre dedans, alors message d'erreur
  for (let i = 1; i < snake.length; i++) {

    if (head.x === snake[i].x && head.y === snake[i].y) {
      alert('Coll');
      return;
    }

  }

  // Si le serpent mange la pomme alors, on aggrandi le serpent
  if (head.x === appleX && head.y === appleY) {

    do {

      appleX = (Math.floor(Math.random() * 20)) * 40;
      appleY = (Math.floor(Math.random() * 20)) * 40;

      /* Nouvelle position de la pomme, vérification qu'elle
      ne se situe pas dans le serpent */
    } while (appleX == snakePart.x && appleY == snakePart.y)

    // Incrémentation du score et de la longueur du serpent
    snake.push({ x: head.x, y: head.y });
    score++;

    // Mise à jour du score
    gameScore.UpdateScore(score);

  }

  snake.unshift(head);
  snake.pop();
};

requestAnimationFrame(initGame);
