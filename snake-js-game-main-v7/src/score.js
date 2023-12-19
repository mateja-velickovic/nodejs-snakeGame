/*
Lieu        : ETML, Sébeillon
Auteur      : Mateja Velickovic
Date        : 07.11.2023
Description : Classe Score qui contiendra la mise à
              jour du score en direct.
*/

export default class Score {

    /**
     * Mise à jour du score du joueur en l'affichant grâce à une balise HTML
     * @param {*} score score du joueur
     */
    UpdateScore(score) {
        document.getElementById('score').textContent = 'Score ' + score;
    }

}


