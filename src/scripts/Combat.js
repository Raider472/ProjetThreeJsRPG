
export class Combat {

    heroTeam;
    monsterTeam;

    turnActors = [];

    constructor(heroTeam, monsterTeam) {
        this.heroTeam = heroTeam;
        this.monsterTeam = monsterTeam;
        this.createInitialTurn();
    }

    createInitialTurn() {
        let tempActors = this.heroTeam.concat(this.monsterTeam);
        tempActors.sort(function (a, b){
            return b.vit - a.vit;
        })
        this.turnActors = tempActors;
        //console.log(this.turnActors, "final result")
    }

    turnOver() {
        let tempActors = this.turnActors[0];
        this.turnActors.shift();
        this.turnActors.push(tempActors);
    }
}