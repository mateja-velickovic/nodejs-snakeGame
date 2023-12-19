/*
Lieu        : ETML, Sébeillon
Auteur      : Mateja Velickovic
Date        : 07.11.2023
Description : Classe Apple qui créera une pomme
              et définira sa position lorsqu'elle
              est mangée.
*/

export default class Apple {

    /**
     * Affichage de temps réel du score sur le haut du jeu
     * @param {*} ctx affichage de la pomme
     * @param {*} APPLE_COLOR couleur de la pomme
     * @param {*} appleX_Position position X aléatoire de la pomme
     * @param {*} appleY_Position position Y aléatoire de la pomme
     * @param {*} CASE_SIZE taille d'une case de jeu
     */
    createApple(ctx, APPLE_COLOR, appleX_Position, appleY_Position, CASE_SIZE) {
        
        // Initialisation de la pomme
        ctx.fillStyle = APPLE_COLOR;
        ctx.fillRect(appleX_Position, appleY_Position, CASE_SIZE, CASE_SIZE)

    }

}