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

    actions = {
        normalAttack: 0,
        specialAttack: 1
    }

    //DOM Element
    domCombat;
    controller

    //Debug DOM, may change during the development
    pActual;
    chooseEnemyDiv;

    constructor(heroTeam, monsterTeam, scene) {
        this.giveIdToActors(heroTeam, monsterTeam);
        this.scene = scene;
        this.domCombat = document.getElementById("menuCombat");
        this.deployCharacter();
        this.createInitialTurn();
        //Info Tour Actuel
        this.pActual = this.domCombat.querySelector("#entityActuel");
        this.pActual.innerHTML = this.turnActors[0].entity.name;
        //Dom
        this.domCombat.classList.add("menuCombatVisible")
        this.chooseEnemyDiv = document.getElementById("menuChooseEnnemy")
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
        this.pActual.innerHTML = this.turnActors[0].entity.name;
        if(this.turnActors[0].entity.isAi === true) {
            this.aiActionSelection()
        }
        else {
            //debug
        }
    }

    generateTarget(decision) {
        this.controller = new AbortController()
        this.domCombat.querySelector("#actionButton").classList.add("menuCombatHiddenButton")
        for(let i = 0; i < this.monsterTeam.length; i++) {
            let inputButton = document.createElement("input");
            inputButton.value = this.monsterTeam[i].id;
            inputButton.type = "button"
            this.chooseEnemyDiv.appendChild(inputButton);
            inputButton.addEventListener('click', () => this.attack(inputButton.value, decision), { signal: this.controller.signal });
        }
        let inputButton = document.createElement("input");
        inputButton.value = "back";
        inputButton.type = "button"
        this.chooseEnemyDiv.appendChild(inputButton);
        inputButton.addEventListener('click', () => this.removeGeneratedTarget(), { signal: this.controller.signal });
    }

    removeGeneratedTarget() {
        this.controller.abort();
        this.domCombat.querySelector("#actionButton").classList.remove("menuCombatHiddenButton");
        this.chooseEnemyDiv.innerHTML = "";
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

    attack(index, decision) {
        this.removeGeneratedTarget();
        if(decision === this.actions.normalAttack) {
            this.normalAttack(index);
        }
    }

    //TODO Use DefStats
    normalAttack(index) {
        index = Number(index)
        let indexNumber = this.turnActors.findIndex(actor => actor.id === index);
        this.turnActors[indexNumber].entity.hp -= this.turnActors[0].entity.atk;
        this.turnOver()
    }
}