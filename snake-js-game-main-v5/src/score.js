export default class Score {

    constructor(score) {

        this.score = score;

    }



    UpdateScore(score) {

        document.getElementById('score').textContent = 'Score ' + score;

    }



}