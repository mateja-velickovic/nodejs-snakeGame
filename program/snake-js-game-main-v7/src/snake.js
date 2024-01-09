/*
Lieu        : ETML, Sébeillon
Auteur      : Mateja Velickovic
Date        : 07.11.2023
Description : Classe Snake qui contiendra l'affichage du
              serpent ainsi que ses limites de déplacement.
*/

import Score from './score.js';
const gameScore = new Score();

export default class Snake {

    /**
     * Affichage du en couleur du serpent sur le plan de jeu
     * @param {*} snake ensemble du serpent
     * @param {*} ctx affichage du serpent
     * @param {*} HEAD_COLOR couleur de la tête du serpent
     * @param {*} SNAKE_COLOR couleur du corps du serpent
     */
    drawSnake(snake, ctx, HEAD_COLOR, SNAKE_COLOR) {


        // Vérification si c'est la tête, ou non afin de mettre une couleur différente à la tête
        snake.forEach((snakePart, index) => {

            const isHead = index === 0;

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

        });
    };

    /**
     * Définition des limites de jeu (bordures)
     */
    moveLimit(snake, canvas) {

        if (snake[0].x < 0 || snake[0].x > canvas.width - 40 || snake[0].y > canvas.height - 40 || snake[0].y < 0) {

            // Affichage un message d'alerte lorsque le joueur a touché un bord
            alert('Perdu');

        }
    };

    /**
     * Vérification de la touche pressée par l'utilisateur en utilisant le code des touches
     * @param {*} e touche pressée par l'utilisateur
     */
    onkeydown = (e) => {

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

}

