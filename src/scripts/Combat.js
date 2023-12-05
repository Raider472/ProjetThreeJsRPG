import { SpriteObject } from "./Sprite/SpriteObject";
import * as THREE from "three";
import { mapsCrossReferenceHeroCombat } from "./Declarations/MapsDeclaration";

export class Combat {

    heroTeam;
    monsterTeam;


    turnActors = [];
    actors = []

    scene;

    //DOM Element
    domCombat;

    //Debug DOM, may change during the development
    pActual;

    constructor(heroTeam, monsterTeam, scene) {
        this.heroTeam = heroTeam;
        this.monsterTeam = monsterTeam;
        this.scene = scene;
        this.domCombat = document.getElementById("menuCombatTest");
        this.deployCharacter();
        this.createInitialTurn();
        //debug
        this.pActual = this.domCombat.querySelector("#entityActuel");
        this.pActual.innerHTML = this.turnActors[0].name;
        //debug
        this.domCombat.classList.remove("menuCombatTestHidden")
        this.domCombat.classList.add("menuCombatTestVisible")
    }

    deployCharacter() {
        //Add heroes to the scene
        for(let i = 0; i < this.heroTeam.length; i++) {
            let filteredEntities = mapsCrossReferenceHeroCombat.entities.filter(entity => entity.id === this.heroTeam[i].id);

            let position = {x: 45, y: 2.25 - i*2, z: 0};
            let scale = {x: 1, y: 1, z: 1};
            let hero = new SpriteObject(filteredEntities[0].path, 8, 8, position, scale, filteredEntities[0].idle);
            this.actors.push(hero);
            this.scene.add(hero);
        }
        //Add Monsters to the scene
        
    }

    createInitialTurn() {
        let tempActors = this.heroTeam.concat(this.monsterTeam);
        tempActors.sort(function (a, b){
            return b.vit - a.vit;
        })
        this.turnActors = tempActors;
        console.log(this.turnActors, "final result")
    }

    turnOver() {
        this.turnActors.push(this.turnActors.shift());
    }
}