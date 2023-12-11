import { SpriteObject } from "./Sprite/SpriteObject";
import * as THREE from "three";
import { mapsCrossReferenceHeroCombat } from "./Declarations/MapsDeclaration";
import { mapsCrossReferenceMonsterCombat } from "./Declarations/MapsDeclaration";

export class Combat {

    heroTeam = [];
    monsterTeam = [];

    crystal = 0;

    turnActors = [];
    actors = []

    scene;

    //DOM Element
    domCombat;

    //Debug DOM, may change during the development
    pActual;
    chooseEnemyDiv;

    constructor(heroTeam, monsterTeam, scene) {
        this.giveIdToActors(heroTeam, monsterTeam);
        this.scene = scene;
        this.domCombat = document.getElementById("menuCombatTest");
        this.deployCharacter();
        this.createInitialTurn();
        //debug
        this.pActual = this.domCombat.querySelector("#entityActuel");
        this.pActual.innerHTML = this.turnActors[0].entity.name;
        //debug
        this.domCombat.classList.add("menuCombatTestVisible")
        //debug
        this.chooseEnemyDiv = document.getElementById("menuChooseEnnemyTest")
        this.chooseEnemyDiv.classList.add("menuChooseTestVisible")
        for(let i = 0; i < this.monsterTeam.length; i++) {
            this.chooseEnemyDiv.children[i].value = this.monsterTeam[i].id
            this.chooseEnemyDiv.children[i].classList.remove("menuButtonTestHidden")
        }
    }

    giveIdToActors(heroTeam, monsterTeam) {
        console.log(heroTeam[0])
        for(let i = 0; i < heroTeam.length; i++) {
            this.heroTeam.push({id: i+1, entity: heroTeam[i]})
        }
        for(let i = 0; i < monsterTeam.length; i++) {
            this.monsterTeam.push({id: i+5, entity: monsterTeam[i]})
        }
    }

    deployCharacter() {
        let scale = {x: 1, y: 1, z: 1};
        //Add heroes to the scene
        for(let i = 0; i < this.heroTeam.length; i++) {
            console.log(this.heroTeam[i].entity.id)
            let filteredEntities = mapsCrossReferenceHeroCombat.entities.filter(entity => entity.id === this.heroTeam[i].entity.id);

            let position = {x: 45, y: 2.25 - i*2, z: 0};
            let hero = new SpriteObject(filteredEntities[0].path, filteredEntities[0].horiTile, filteredEntities[0].vertiTile, position, scale, filteredEntities[0].idle);
            this.actors.push(hero);
            this.scene.add(hero);
        }
        //Add Monsters to the scene
        for(let i = 0; i < this.monsterTeam.length; i++) {
            let filteredEntities = mapsCrossReferenceMonsterCombat.entities.filter(entity => entity.id === this.monsterTeam[i].entity.id);

            let position = {x: 55, y: 2.25 - i*2, z: 0};
            let monster = new SpriteObject(filteredEntities[0].path, filteredEntities[0].horiTile, filteredEntities[0].vertiTile, position, scale, filteredEntities[0].idle);
            this.actors.push(monster);
            this.scene.add(monster);
        }
    }

    createInitialTurn() {
        let tempActors = this.heroTeam.concat(this.monsterTeam);
        tempActors.sort(function (a, b){
            return b.entity.vit - a.entity.vit;
        })
        this.turnActors = tempActors;
        console.log(this.turnActors, "final result")
    }

    turnOver() {
        this.turnActors.push(this.turnActors.shift());
        if(this.turnActors[0].entity.isAi === true) {
            this.pActual.innerHTML = this.turnActors[0].entity.name;
            this.aiActionSelection()
        }
        else {
            //debug
            this.pActual.innerHTML = this.turnActors[0].entity.name;
        }
    }

    aiActionSelection() {
        let randomNumber = Math.floor(Math.random() * 100);
        if(randomNumber <= 30) {
            this.turnOver()
            alert("ia has done nothing")
        }
        else {
            let randomIndex = Math.floor(Math.random() * 5);
            randomIndex = Math.min(Math.max(randomIndex, 1), 4)
            this.normalAttack(randomIndex)
            alert("ia has attacked " + this.turnActors[randomIndex].entity.name)
        }
    }

    normalAttack(index) {
        index = Number(index)
        let indexNumber = this.turnActors.findIndex(actor => actor.id === index);
        this.turnActors[indexNumber].entity.hp -= this.turnActors[0].entity.atk;
        this.turnOver()
    }
}