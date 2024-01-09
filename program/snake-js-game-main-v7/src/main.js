/*
Lieu        : ETML, Sébeillon
Auteur      : Mateja Velickovic
Date        : 07.11.2023
Description : Refonte du célèbre jeu du Snake en Javascript
              dans un environnement Ubuntu
*/

// Importation des classes Score & Snake
import Score from './score.js';
import Snake from './snake.js';
import Apple from './apple.js';

// Initialisation des classes dans des constantes
const gameScore = new Score();
const gameSnake = new Snake();
const gameApple = new Apple();

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Constantes
const SNAKE_COLOR = '#7EBDC2';  // Corps du serpent
const HEAD_COLOR = '#6a9da1';   // Tête du serpent
const APPLE_COLOR = '#BB4430';  // Pomme
const CASE_SIZE = 40;           // Taille d'une case de jeu
const SPEED_GAME = 100;       // Vitesse du jeu

// Calcul pour le positionnement aléatoire de la pomme et du serpent
let appleX_Position = (Math.floor(Math.random() * 20)) * CASE_SIZE;
let appleY_Position = (Math.floor(Math.random() * 20)) * CASE_SIZE;

let snakeX_Position = (Math.floor(Math.random() * 20)) * CASE_SIZE;
let snakeY_Position = (Math.floor(Math.random() * 20)) * CASE_SIZE;

// Direction du joueur définie dans la fonction moveSnake() 
let dir;

// Score du joueur incrémenté dans la fonction moveSnake()
let score = 0;

/*
Taille du serpent, une valeur est ajoutée à chaque fois que
le joueur mange une pomme
*/
let snake = [
  { x: snakeX_Position, y: snakeY_Position, },
];

/**
 * Initialise la partie en appellant différentes fonctions
 */
const initGame = () => {

  // Fond d'écran de jeu
  let img = new Image();
  img.src = '../resources/images/grid.jpg'
  ctx.drawImage(img, 0, 0, 800, 800);

  // Initialisation de la pomme
  ctx.fillStyle = APPLE_COLOR;
  ctx.fillRect(appleX_Position, appleY_Position, CASE_SIZE, CASE_SIZE)

  gameApple.createApple(ctx, APPLE_COLOR, appleX_Position, appleY_Position, CASE_SIZE)
  
  setTimeout(() => {

    // Affichage du serpent
    gameSnake.drawSnake(snake, ctx, HEAD_COLOR, SNAKE_COLOR);

    // Mouvements du serpent
    moveSnake();

    // Limites du terrain de jeu
    gameSnake.moveLimit(snake, canvas);

    requestAnimationFrame(initGame);
  }, SPEED_GAME);

  gameSnake.drawSnake(snake, ctx, HEAD_COLOR, SNAKE_COLOR);
};

/**
 * Vérification de la touche pressée par l'utilisateur en utilisant le code des touches
 * @param {*} e touche pressée par l'utilisateur
 */
document.onkeydown = (e) => {

  // Si flèche du haut alors, on retourne 1
  if (e.keyCode == '38' && dir != 2) {
    dir = 1;
  }
  // Si flèche du bas alors, on retourne 2
  if (e.keyCode == '40' && dir != 1) {
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

/**
 * Déplacement du serpent en incrémentant ses mouvements de CASE_SIZE
 */
const moveSnake = () => {
  const head = { x: snake[0].x, y: snake[0].y };
  const snakePart = { ...snake[0] }

  // Dir vaut 1 alors on monte
  if (dir == 1) {
    head.y -= CASE_SIZE;
  }
  // Dir vaut 2 alors on descend
  else if (dir == 2) {
    head.y += CASE_SIZE;
  }
  // Dir vaut 3 alors on va à gauche
  else if (dir == 3) {
    head.x -= CASE_SIZE;
  }
  // Dir vaut 4 alors on va à droite
  else if (dir == 4) {
    head.x += CASE_SIZE;
  }

  // Si le serpent se rentre dedans, alors message d'erreur
  for (let i = 1; i < snake.length; i++) {

    if (head.x === snake[i].x && head.y === snake[i].y) {
      alert('Coll');
    }

  }

  // Si le serpent mange la pomme alors, on aggrandi le serpent
  if (head.x === appleX_Position && head.y === appleY_Position) {

    do {

      appleX_Position = (Math.floor(Math.random() * 20)) * CASE_SIZE;
      appleY_Position = (Math.floor(Math.random() * 20)) * CASE_SIZE;

      /* Nouvelle position de la pomme, vérification qu'elle
      ne se situe pas dans le serpent */
    } while (appleX_Position == snakePart.x && appleY_Position == snakePart.y)

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
