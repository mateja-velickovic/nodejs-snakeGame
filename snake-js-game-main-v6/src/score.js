// Exportation de la classe Score
export default class Score {
    constructor(score) {
        this.score = score;
    }

    // Affichage de temps réel du score sur le haut du jeu
    UpdateScore(score) {
        document.getElementById('score').textContent = 'Score ' + score;
    }

}