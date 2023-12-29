import { SpriteObject } from "./Sprite/SpriteObject";
import * as THREE from "three";
import { mapsCrossReferenceHeroCombat } from "./Declarations/MapsDeclaration";
import { mapsCrossReferenceMonsterCombat } from "./Declarations/MapsDeclaration";

export class Combat {

    heroTeam = [];
    monsterTeam = [];

    crystal = 2;
    crystalMax = 10;

    turnActors = [];
    actors = []

    deadHero = [];
    deadMonsters = [];

    scene;

    actions = {
        normalAttack: 0,
        crystalAttack: 1
    }

    //DOM Element
    domCombat;
    controller
    crystalShow;

    //Debug DOM, may change during the development
    pActual;
    chooseEnemyDiv;

    constructor(heroTeam, monsterTeam, scene) {
        this.giveIdToActors(heroTeam, monsterTeam);
        this.scene = scene;
        this.domCombat = document.getElementById("menuCombat");
        this.crystalShow = document.getElementById("numberCrystal");
        this.crystalShow.innerHTML = this.crystal;
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
        for(let i = 0; i < heroTeam.length; i++) {
            this.heroTeam.push({id: i+1, entity: heroTeam[i]});
        }
        for(let i = 0; i < monsterTeam.length; i++) {
            this.monsterTeam.push({id: i+5, entity: monsterTeam[i]});
        }
    }

    deployCharacter() {
        let scale = {x: 1, y: 1, z: 1};
        //Add heroes to the scene
        for(let i = 0; i < this.heroTeam.length; i++) {
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
        let tempHero = structuredClone(this.heroTeam);
        let tempMonster = structuredClone(this.monsterTeam);
        let tempActors = tempHero.concat(tempMonster);
        tempActors.sort(function (a, b){
            return b.entity.vit - a.entity.vit;
        })
        this.turnActors = tempActors;
        console.log(this.turnActors, "final result")
    }

    turnOver() {
        this.turnActors.push(this.turnActors.shift());
        this.checkBuff(this.turnActors[0].entity);
        this.checkStatus(this.turnActors[0].entity);
        this.pActual.innerHTML = this.turnActors[0].entity.name;
        if(this.turnActors[0].entity.isAi === true) {
            this.aiActionSelection()
        }
        else {
            //debug
        }
    }

    newAbort() {
        this.controller = new AbortController()
    }

    gainCrystal() {
        this.crystal += this.turnActors[0].entity.crystalGeneration;
        if(this.crystal > 10) {
            this.crystal = 10;
        }
        this.crystalShow.innerHTML = this.crystal;
    }

    consumeCrystal(ammount) {
        this.crystal -= ammount;
        if(this.crystal < 0) {
            this.crystal = 0;
        }
        this.crystalShow.innerHTML = this.crystal;
    }

    checkEnoughCrystal(cost) {
        if(cost > this.crystal) {
            return false;
        }
        else {
            return true;
        }
    }

    //Generate Buttons

    generateTarget(decision) {
        this.newAbort();
        this.hideMenu();
        if(decision === this.actions.normalAttack) {
            for(let i = 0; i < this.monsterTeam.length; i++) {
                let inputButton = document.createElement("button");
                inputButton.value = this.monsterTeam[i].id;
                inputButton.innerHTML = this.monsterTeam[i].entity.name
                this.chooseEnemyDiv.appendChild(inputButton);
                inputButton.addEventListener('click', () => this.attack(inputButton.value, decision), { signal: this.controller.signal });
            }
        }
        else if(decision === this.actions.crystalAttack){
            for(let i = 0; i < this.turnActors[0].entity.crystalAttacks.length; i++) {
                let inputButton = document.createElement("button");
                let cost = this.turnActors[0].entity.crystalAttacks[i].cost;
                inputButton.value = this.turnActors[0].entity.crystalAttacks[i].id;
                inputButton.title = this.turnActors[0].entity.crystalAttacks[i].desc;
                inputButton.innerHTML = this.turnActors[0].entity.crystalAttacks[i].name + " / crystal: " + cost;
                this.chooseEnemyDiv.appendChild(inputButton);
                inputButton.addEventListener('click', () => this.verifyCrystalNumber(inputButton.value, decision, cost), { signal: this.controller.signal });
            }
        }
        this.generateBackButton();
    }

    verifyCrystalNumber(idAttack, decision, cost) {
        if(this.checkEnoughCrystal(cost) === true) {
            this.generateTargetCrystalAttack(idAttack, decision, cost);
        }
        else {
            this.removeGeneratedTarget()
            this.newAbort();
            alert("Not enough crystal")
        }
    }

    generateTargetCrystalAttack(idAttack, decision, cost) {
        this.removeGeneratedTarget()
        this.newAbort();
        this.hideMenu();
        let crystalAttack = this.turnActors[0].entity.crystalAttacks.filter(entity => entity.id === idAttack);
        crystalAttack = crystalAttack[0];
        if(crystalAttack.isAOE) {
            alert("AOE attack")
        }
        else if(!crystalAttack.isFriendly) {
            for(let i = 0; i < this.monsterTeam.length; i++) {
                let inputButton = document.createElement("button");
                inputButton.value = this.monsterTeam[i].id;
                inputButton.innerHTML = this.monsterTeam[i].entity.name
                this.chooseEnemyDiv.appendChild(inputButton);
                inputButton.addEventListener('click', () => this.attack(inputButton.value, decision, idAttack, cost), { signal: this.controller.signal });
            }
        }
        else {
            for(let i = 0; i < this.heroTeam.length; i++) {
                let inputButton = document.createElement("button");
                inputButton.value = this.heroTeam[i].id;
                inputButton.innerHTML = this.heroTeam[i].entity.name
                this.chooseEnemyDiv.appendChild(inputButton);
                inputButton.addEventListener('click', () => this.attack(inputButton.value, decision, idAttack, cost), { signal: this.controller.signal });
            }
        }
        if(!crystalAttack.isAOE) {
            this.generateBackButton();
        }
    }

    generateBackButton() {
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

    //Generate Buttons

    //AI

    aiActionSelection() {
        let randomNumber = Math.floor(Math.random() * 100);
        if(randomNumber <= 1) {
            this.turnOver()
            alert("ia has done nothing")
        }
        else {
            let arrayProb = this.generateHeroAttackPropability();
            let id = this.aiSelectionWeightedDecisions(this.heroTeam, arrayProb)
            //TODO maybe better alert
            alert("ia has attacked " + this.heroTeam[id-1].entity.name)
            this.normalAttack(id)
        }
    }

    generateHeroAttackPropability() {
        let arrayProb = [];
        for(let i =0; i < this.heroTeam.length; i++) {
            if(this.isHeroUnderWeak(this.heroTeam[i])) {
                console.log("Hero weak")
                arrayProb.push((100 / this.heroTeam.length) + 25);
            }
            else {
                arrayProb.push((100 / this.heroTeam.length));
            }
        }
        return arrayProb;
    }

    isHeroUnderWeak(hero) {
        let heroInTurn = this.turnActors.filter(entity => entity.id === hero.id);
        if(heroInTurn[0].entity.hp < hero.entity.maxHp / 2 ) {
            return true;
        }
        else {
            return false;
        }
    }

    aiSelectionWeightedDecisions(items, weights) {
        let cumulativeWeights = [];
        for (let i = 0; i < weights.length; i++) {
            cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
        }
        const randomNumber = Math.floor(Math.random() * cumulativeWeights[cumulativeWeights.length-1]);
        for (let i = 0; i < items.length; i++) {
            if (cumulativeWeights[i] >= randomNumber) {
                return items[i].id;
            }
        }
    }

    //AI

    //Menu Decisions

    hideMenu() {
        this.domCombat.querySelector("#actionButton").classList.add("menuCombatHiddenButton")
    }

    attack(id, decision, idAttack = 0, cost = 0) {
        this.removeGeneratedTarget();
        if(decision === this.actions.normalAttack) {
            this.normalAttack(id);
        }
        else if(decision === this.actions.crystalAttack) {
            this.consumeCrystal(cost);
            this.crystalAttack(id, idAttack);
        }
    }

    normalAttack(id) { //TODO Shield System
        id = Number(id);
        let indexNumber = this.turnActors.findIndex(actor => actor.id === id);
        let damageAttack = Math.floor(this.turnActors[indexNumber].entity.def*0.5) - this.turnActors[0].entity.atk;
        if(damageAttack > -10) {
            damageAttack = -10;
        }
        this.turnActors[indexNumber].entity.hp += damageAttack;
        this.gainCrystal();
        this.turnOver();
    }

    crystalAttack(id, idAttack) {
        id = Number(id);
        let indexNumber = this.turnActors.findIndex(actor => actor.id === id);
        let crystalAttack = this.turnActors[0].entity.crystalAttacks.filter(entity => entity.id === idAttack);
        crystalAttack = crystalAttack[0];
        console.log(crystalAttack);
        if(crystalAttack.damageMult != 0) {
            let atk = Math.floor(this.turnActors[0].entity.atk * crystalAttack.damageMult);
            let damageAttack = Math.floor(this.turnActors[indexNumber].entity.def*0.5) - atk;
            if(damageAttack > -10) {
                damageAttack = -10;
            }
            this.turnActors[indexNumber].entity.hp += damageAttack;
        }
        if(crystalAttack.healMult != 0) {
            let heal = Math.floor(this.turnActors[0].entity.heal * crystalAttack.healMult);
            this.turnActors[indexNumber].entity.hp += heal;
            if(this.turnActors[indexNumber].entity.hp > this.turnActors[indexNumber].entity.maxHp) {
                this.turnActors[indexNumber].entity.hp = this.turnActors[indexNumber].entity.maxHp
            }
        }
        if(crystalAttack.debuff != 0) {
            alert("debuff enemy")
        }
        if(crystalAttack.status != 0) {
            let statusExists = this.turnActors[indexNumber].entity.status.some(status => status.name === crystalAttack.status.name);
            if(!statusExists) {
                this.turnActors[indexNumber].entity.status.push({
                    name: crystalAttack.status.name,
                    turn: crystalAttack.status.turn,
                    modifier: crystalAttack.status.modifier
                });
            }
        }
        if(crystalAttack.buff != 0) {
            alert("buff ally")
        }
        this.turnOver();
    }

    defend() {
        let modifier = 1.5;
        this.turnActors[0].entity.buffs.push({
            name: "defend",
            turn: 1,
            modifier: modifier
        });
        console.log("before mult", this.turnActors[0].entity.def, this.turnActors[0].entity.defS) //TODO
        Math.floor(this.turnActors[0].entity.def *= modifier);
        Math.floor(this.turnActors[0].entity.defS *= modifier);
        console.log(this.turnActors[0].entity.buffs, this.turnActors[0].entity.def, this.turnActors[0].entity.defS, "turnActorsInfo after defend") //TODO
        this.turnOver()
    }

    //Menu Decisions

    //Buff

    checkBuff(actor) {
        if(actor.buffs.length != 0) {
            console.log("not 0")
            this.decrementBuff(actor.buffs);
        }
    }

    decrementBuff(buff) {
        for(let i = 0; i < buff.length; i++) {
            buff[i].turn --
            console.log(buff[i], "i =")
            if(buff[i].turn === 0) {
                this.removeBuff(buff[i]);
                buff.splice(i, 1);
                i--;
            }
        }
        console.log(buff, "buff after for")
    }

    removeBuff(buff) {
        console.log("removeBuff")
        switch(buff.name) {
            case "defend":
                console.log(buff.name, "reset defense")
                console.log(this.turnActors[0].entity.def, this.turnActors[0].entity.defS, "actorDef", "before reset")
                this.turnActors[0].entity.def /= buff.modifier;
                this.turnActors[0].entity.defS /= buff.modifier;
                console.log(this.turnActors[0].entity.def, this.turnActors[0].entity.defS, "actorDef", "after reset")
                break;
        }
    }

    //Buff

    //Status
    checkStatus(actor) {
        if(actor.status.length != 0) {
            this.decrementStatus(actor.status);
        }
    }

    decrementStatus(status) {
        for(let i = 0; i < status.length; i++) {
            status[i].turn --;
            if(status[i].turn === 0) {
                this.applyStatus(status[i]);
                status.splice(i, 1);
                i--;
            }
            else {
                this.applyStatus(status[i]);
            }
        }
    }

    applyStatus(status) {
        if(status.modifier < 1) {
            let lostHp = Math.floor(this.turnActors[0].entity.maxHp * status.modifier);
            this.turnActors[0].entity.hp -= lostHp;
        }
        else {
            this.turnActors[0].entity.hp -= status.modifier;
        }
    }
    //Status
}