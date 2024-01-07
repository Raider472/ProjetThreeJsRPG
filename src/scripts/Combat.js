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

    isFinished = false;
    hasLost = false;

    scene;

    inventory;

    actions = {
        normalAttack: 0,
        crystalAttack: 1,
        crystalAttackAoe: 2,
        ressurection: 3
    }

    //DOM Element
    domCombat;
    controller
    crystalShow;

    //Debug DOM, may change during the development
    pActual;
    chooseEnemyDiv;

    constructor(heroTeam, monsterTeam, scene, inventory) {
        this.giveIdToActors(heroTeam, monsterTeam);
        this.scene = scene;
        this.inventory = inventory;
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
        if(this.turnActors[0].entity.isAi) {
            setTimeout(() => this.turnOver(), 700);
        }
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

            let position = {x: 495, y: 2.25 - i*2, z: 0};
            let hero = new SpriteObject(filteredEntities[0].path, filteredEntities[0].horiTile, filteredEntities[0].vertiTile, position, scale, filteredEntities[0].idle);
            this.actors.push({id: this.heroTeam[i].id, entity: hero, originalPos: position});
            this.scene.add(hero);
        }
        //Add Monsters to the scene
        for(let i = 0; i < this.monsterTeam.length; i++) {
            let filteredEntities = mapsCrossReferenceMonsterCombat.entities.filter(entity => entity.id === this.monsterTeam[i].entity.id);

            let position = {x: 505, y: 2.25 - i*2, z: 0};
            let monster = new SpriteObject(filteredEntities[0].path, filteredEntities[0].horiTile, filteredEntities[0].vertiTile, position, scale, filteredEntities[0].idle);
            this.actors.push({id: this.monsterTeam[i].id, entity: monster, originalPos: position});
            this.scene.add(monster);
        }
    }

    createInitialTurn() {
        let tempHero = structuredClone(this.heroTeam);
        let tempMonster = structuredClone(this.monsterTeam);
        this.checkHasEquipment(tempHero);
        let tempActors = tempHero.concat(tempMonster);
        tempActors.sort(function (a, b){
            return b.entity.vit - a.entity.vit;
        })
        this.turnActors = tempActors;
    }

    checkHasEquipment(heroTeam) {
        for(let i = 0; i <heroTeam.length; i++) {
            let hero = heroTeam[i].entity;
            if(heroTeam[i].entity.head != undefined) {
                this.applyEquipment(hero.head, hero);
            }
            if(heroTeam[i].entity.torso != undefined) {
                this.applyEquipment(hero.torso, hero);
            }
            if(heroTeam[i].entity.legs != undefined) {
                this.applyEquipment(hero.legs, hero);
            }
            if(heroTeam[i].entity.boots != undefined) {
                this.applyEquipment(hero.boots, hero);
            }
        }
    }

    applyEquipment(equipment, hero) {
        if(equipment.defBuff != 0) {
            hero.def += equipment.defBuff;
        }
        if(equipment.defSBuff != 0) {
            hero.defS += equipment.defSBuff;
        }
        if(equipment.shieldBuff != 0) {
            hero.shield += equipment.shieldBuff;
        }
        if(equipment.vitBuff != 0) {
            hero.vit += equipment.vitBuff;
        }
    }

    turnOver() {
        this.checkWipedOutTeam()
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
                if(!this.isActorOnDeathList(this.monsterTeam[i])) {
                    let inputButton = document.createElement("button");
                    inputButton.value = this.monsterTeam[i].id;
                    inputButton.innerHTML = this.monsterTeam[i].entity.name
                    this.chooseEnemyDiv.appendChild(inputButton);
                    inputButton.addEventListener('click', () => this.attack(inputButton.value, decision), { signal: this.controller.signal });
                }
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
            if(crystalAttack.isFriendly) {
                this.attack(this.heroTeam, 2, idAttack, cost)
            }
            else {
                this.attack(this.monsterTeam, 2, idAttack, cost)
            }
        }
        else if(!crystalAttack.isFriendly) {
            for(let i = 0; i < this.monsterTeam.length; i++) {
                if(!this.isActorOnDeathList(this.monsterTeam[i])) {
                    let inputButton = document.createElement("button");
                    inputButton.value = this.monsterTeam[i].id;
                    inputButton.innerHTML = this.monsterTeam[i].entity.name
                    this.chooseEnemyDiv.appendChild(inputButton);
                    inputButton.addEventListener('click', () => this.attack(inputButton.value, decision, idAttack, cost), { signal: this.controller.signal });
                }
            }
        }
        else {
            if(crystalAttack.targetDead) {
                for(let i = 0; i < this.deadHero.length; i++) {
                    let inputButton = document.createElement("button");
                    inputButton.value = this.deadHero[i].id;
                    inputButton.innerHTML = this.deadHero[i].entity.name
                    this.chooseEnemyDiv.appendChild(inputButton);
                    inputButton.addEventListener('click', () => this.attack(inputButton.value, 3, idAttack, cost), { signal: this.controller.signal });
                }
            }
            else {
                for(let i = 0; i < this.heroTeam.length; i++) {
                    if(!this.isActorOnDeathList(this.heroTeam[i])) {
                        let inputButton = document.createElement("button");
                        inputButton.value = this.heroTeam[i].id;
                        inputButton.innerHTML = this.heroTeam[i].entity.name
                        this.chooseEnemyDiv.appendChild(inputButton);
                        inputButton.addEventListener('click', () => this.attack(inputButton.value, decision, idAttack, cost), { signal: this.controller.signal });
                    }
                }
            }
        }
        if(!crystalAttack.isAOE) {
            this.generateBackButton();
        }
    }

    generateTargetItems() {
        this.newAbort();
        this.hideMenu();
        for(let i = 0; i < this.inventory.items.length; i++) {
            if(this.inventory.items[i].type === "consumable") {
                let inputButton = document.createElement("button");
                inputButton.value = i;
                inputButton.title = this.inventory.items[i].desc
                inputButton.innerHTML = this.inventory.items[i].name
                this.chooseEnemyDiv.appendChild(inputButton);
                if(this.inventory.items[i].modifier.targetDead) {
                    inputButton.addEventListener('click', () => this.generateTargetFeather(inputButton.value), { signal: this.controller.signal });
                }
                else {
                    inputButton.addEventListener('click', () => this.applyPotion(inputButton.value), { signal: this.controller.signal });
                }
            }
        }
        this.generateBackButton();
    }

    generateTargetFeather(indexItem) {
        this.removeGeneratedTarget()
        this.newAbort();
        this.hideMenu();
        for(let i = 0; i < this.deadHero.length; i++) {
            let inputButton = document.createElement("button");
            inputButton.value = this.deadHero[i].id;
            inputButton.innerHTML = this.deadHero[i].entity.name
            this.chooseEnemyDiv.appendChild(inputButton);
            inputButton.addEventListener('click', () => this.applyPotion(indexItem, inputButton.value), { signal: this.controller.signal });
        }
        this.generateBackButton();
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
            alert(this.turnActors[0].entity.name + " has done nothing");
            this.turnOver();
        }
        else {
            let arrayProb = this.generateHeroAttackPropability();
            let id = this.aiSelectionWeightedDecisions(this.heroTeam, arrayProb);
            alert(this.turnActors[0].entity.name + " has attacked " + this.heroTeam[id-1].entity.name);
            this.normalAttack(id);
        }
    }

    generateHeroAttackPropability() {
        let arrayProb = [];
        for(let i =0; i < this.heroTeam.length; i++) {
            if (!this.isActorOnDeathList(this.heroTeam[i])) {
                if(this.isHeroUnderWeak(this.heroTeam[i])) {
                    arrayProb.push((100 / this.heroTeam.length - this.deadHero.length) + 25);
                }
                else {
                    arrayProb.push((100 / this.heroTeam.length - this.deadHero.length));
                }
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
        let aliveHero = [];
        for(let i = 0; i < items.length; i++) {
            if(!this.isActorOnDeathList(items[i])) {
                aliveHero.push(items[i]);
            }
        }
        const randomNumber = Math.floor(Math.random() * cumulativeWeights[cumulativeWeights.length-1]);
        for (let i = 0; i < aliveHero.length; i++) {
            if (cumulativeWeights[i] >= randomNumber) {
                return aliveHero[i].id;
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
        else if(decision === this.actions.crystalAttackAoe) {
            this.consumeCrystal(cost);
            this.crystalAttackAOE(id, idAttack);
        }
        else if(decision === this.actions.ressurection) {
            this.consumeCrystal(cost);
            this.resurrection(id, this.deadHero, idAttack);
        }
    }

    normalAttack(id) {
        id = Number(id);
        let indexNumber = this.turnActors.findIndex(actor => actor.id === id);
        let critNumber = Math.random();
        let atk = this.turnActors[0].entity.atk;
        if(this.turnActors[0].entity.crit >= critNumber) {
            atk = Math.floor(2 * this.turnActors[0].entity.atk);
        }
        if(this.turnActors[indexNumber].entity.shield > 0) {
            this.turnActors[indexNumber].entity.shield -= atk;
            if(this.turnActors[indexNumber].entity.shield < 0) {
                atk = (this.turnActors[indexNumber].entity.shield * -1);
                this.turnActors[indexNumber].entity.shield = 0;
            }
            else {
                atk = 0;
            }
        }
        if(atk != 0) {
            let damageAttack = Math.floor(this.turnActors[indexNumber].entity.def*0.5) - atk;
            if(damageAttack > -10) {
                damageAttack = -10;
            }
            this.turnActors[indexNumber].entity.hp += damageAttack;
        }
        this.gainCrystal();
        this.checkDead(this.turnActors[indexNumber]);
        this.turnOver();
    }

    crystalAttack(id, idAttack, AOE = false) {
        id = Number(id);
        let indexNumber = this.turnActors.findIndex(actor => actor.id === id);
        let crystalAttack = this.turnActors[0].entity.crystalAttacks.filter(entity => entity.id === idAttack);
        crystalAttack = crystalAttack[0];
        if(crystalAttack.damageMult != 0) {
            let atk = Math.floor(this.turnActors[0].entity.atk * crystalAttack.damageMult);
            let critNumber = Math.random();
            if(this.turnActors[0].entity.crit >= critNumber) {
                atk = Math.floor(1.75 * this.turnActors[0].entity.atk);
            }
            if(this.turnActors[indexNumber].entity.shield > 0) {
                this.turnActors[indexNumber].entity.shield -= atk;
                if(this.turnActors[indexNumber].entity.shield < 0) {
                    atk = (this.turnActors[indexNumber].entity.shield * -1);
                    this.turnActors[indexNumber].entity.shield = 0;
                }
                else {
                    atk = 0;
                }
            }
            if(atk != 0) {
                let damageAttack = Math.floor(this.turnActors[indexNumber].entity.def*0.5) - atk;
                if(damageAttack > -10) {
                    damageAttack = -10;
                }
                this.turnActors[indexNumber].entity.hp += damageAttack;
            }
        }
        if(crystalAttack.damageSMult != 0) {
            let atkS = Math.floor(this.turnActors[0].entity.atkS * crystalAttack.damageSMult);
            let critNumber = Math.random();
            if(this.turnActors[0].entity.crit >= critNumber) {
                atkS = Math.floor(1.5 * this.turnActors[0].entity.atkS);
            }
            let damageAttack = Math.floor(this.turnActors[indexNumber].entity.defS*0.5) - atkS;
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
            let debuffExists = this.turnActors[indexNumber].entity.buffs.some(debuff => debuff.name === crystalAttack.debuff.name);
            if(!debuffExists) {
                this.turnActors[indexNumber].entity.buffs.push({
                    name: crystalAttack.debuff.name,
                    turn: crystalAttack.debuff.turn,
                    modifier: crystalAttack.debuff.modifier,
                    stats: crystalAttack.debuff.stats,
                    applied: crystalAttack.debuff.applied
                });
            }
            this.applyBuff(this.turnActors[indexNumber]);
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
            let buffExists = this.turnActors[indexNumber].entity.buffs.some(buff => buff.name === crystalAttack.buff.name);
            if(!buffExists) {
                this.turnActors[indexNumber].entity.buffs.push({
                    name: crystalAttack.buff.name,
                    turn: crystalAttack.buff.turn,
                    modifier: crystalAttack.buff.modifier,
                    stats: crystalAttack.buff.stats,
                    applied: crystalAttack.buff.applied
                });
            }
            this.applyBuff(this.turnActors[indexNumber]);
        }
        this.checkDead(this.turnActors[indexNumber]);
        if(!AOE) {
            this.turnOver();
        }
    }

    crystalAttackAOE(teamToAOE, idAttack) {
        for(let i = 0; i < teamToAOE.length; i++) {
            if(!this.isActorOnDeathList(teamToAOE[i])) {
                this.crystalAttack(teamToAOE[i].id, idAttack, true)
            }
        }
        this.turnOver();
    }

    defend() {
        let modifier = 1.5;
        this.turnActors[0].entity.buffs.push({
            name: "defend",
            turn: 1,
            modifier: modifier,
            stats: ["def", "defS"],
            applied: false
        });
        this.applyBuff(this.turnActors[0]);
        this.turnOver()
    }

    applyPotion(indexPotion, idHero) {
        this.removeGeneratedTarget();
        indexPotion = Number(indexPotion);
        if(this.inventory.items[indexPotion].modifier.healMult != 0) {
            if(this.inventory.items[indexPotion].modifier.targetDead) {
                this.resurrection(idHero, this.deadHero, this.inventory.items[indexPotion].modifier, true);
            }
            else {
                this.turnActors[0].entity.hp += Math.floor(this.inventory.items[indexPotion].modifier.healMult * this.turnActors[0].entity.maxHp);
                if(this.turnActors[0].entity.hp > this.turnActors[0].entity.maxHp) {
                    this.turnActors[0].entity.hp = this.turnActors[0].entity.maxHp;
                }
            }
        }
        if(this.inventory.items[indexPotion].modifier.buff != 0) {
            let buffItem = this.inventory.items[indexPotion].modifier.buff;
            let buffExists = this.turnActors[0].entity.buffs.some(buff => buff.name === buffItem.name);
            if(!buffExists) {
                this.turnActors[0].entity.buffs.push({
                    name: buffItem.name,
                    turn: buffItem.turn,
                    modifier: buffItem.modifier,
                    stats: buffItem.stats,
                    applied: buffItem.applied
                });
            }
            this.applyBuff(this.turnActors[0]);
        }
        if(this.inventory.items[indexPotion].modifier.restoreShield) {
            this.turnActors[0].entity.shield = this.turnActors[0].entity.maxShield
        }
        this.inventory.removeItem(indexPotion);
        this.turnOver();
    }

    //Menu Decisions

    //Death
    isActorOnDeathList(actor) {
        if(actor.entity.isAi) {
            return this.deadMonsters.some(monster => monster.id === actor.id)
        }
        else {
            return this.deadHero.some(hero => hero.id === actor.id) 
        }
    }

    checkDead(actor) {
        if(actor.entity.hp <= 0) {
            console.log("actor is dead")
            this.removeActor(actor);
        }
    }

    removeActor(actor) {
        let indexNumber = this.turnActors.findIndex(actorIndex => actorIndex.id === actor.id);
        let splicedElement = this.turnActors.splice(indexNumber, 1);
        splicedElement = splicedElement[0];
        if(actor.entity.isAi) {
            console.log(splicedElement, "splicedElement");
            this.deadMonsters.push(splicedElement);
            console.log(this.deadMonsters, "deadMonster list");
        }
        else {
            console.log(splicedElement, "splicedElement");
            this.deadHero.push(splicedElement);
            console.log(this.deadHero, "deadHero list");
        }
        this.deathAnimation(actor);
    }

    checkWipedOutTeam() {
        if(this.deadMonsters.length === this.monsterTeam.length) {
            this.isFinished = true;
        }
        else if(this.deadHero.length === this.heroTeam.length ) {
            this.isFinished = true;
            this.hasLost = true;
        }
    }

    deathAnimation(actor) {
        let indexActor = this.actors.findIndex(entity => entity.id === actor.id);
        this.actors[indexActor].entity.position.x = 1000
    }

    resurrection(id, faction, idAttack, item = false) { //TODO fix double turn
        id = Number(id);
        let indexNumber = faction.findIndex(entity => entity.id === id);
        if(!item) {
            let crystalAttack = this.turnActors[0].entity.crystalAttacks.filter(entity => entity.id === idAttack);
            crystalAttack = crystalAttack[0];
            faction[indexNumber].entity.hp = Math.floor(crystalAttack.healMult * faction[indexNumber].entity.maxHp);
        }
        else {
            console.log(idAttack)
            console.log(idAttack.healMult)
            faction[indexNumber].entity.hp = Math.floor(idAttack.healMult * faction[indexNumber].entity.maxHp);
        }

        let indexActor = this.actors.findIndex(entity => entity.id === faction[indexNumber].id);
        this.actors[indexActor].entity.position.x = this.actors[indexActor].originalPos.x

        let resurrectedActor = faction.splice(indexNumber, 1);
        resurrectedActor = resurrectedActor[0];
        //Insert resurrected actor
        let index = 0;
        for(let i = 0; i < this.turnActors.length && resurrectedActor.entity.vit < this.turnActors[i].entity.vit; i++) {
            index++;
        }
        this.turnActors.splice(index, 0, resurrectedActor);
        this.turnOver();
    }

    //Death

    //Buff

    applyBuff(actor) {
        let buffList = actor.entity.buffs
        for(let i = 0; i < buffList.length; i++) {
            if(!buffList[i].applied) {
                for(let j = 0; j < buffList[i].stats.length; j++) {
                    switch(buffList[i].stats[j]) {
                        case "atk":
                            actor.entity.atk *= buffList[i].modifier;
                            break;
                        case "atkS":
                            actor.entity.atkS *= buffList[i].modifier;
                            break;
                        case "heal":
                            actor.entity.heal *= buffList[i].modifier;
                            break;
                        case "crit":
                            actor.entity.crit += buffList[i].modifier;
                            break;
                        case "def":
                            actor.entity.def *= buffList[i].modifier;
                            break;
                        case "defS":
                            actor.entity.defS *= buffList[i].modifier;
                            break;
                        case "vit":
                            actor.entity.vit *= buffList[i].modifier;
                            break;
                    }
                }
                buffList[i].applied = true;
            }
        }
    }

    checkBuff(actor) {
        if(actor.buffs.length != 0) {
            this.decrementBuff(actor.buffs);
        }
    }

    decrementBuff(buff) {
        for(let i = 0; i < buff.length; i++) {
            buff[i].turn --
            if(buff[i].turn === 0) {
                this.removeBuff(buff[i]);
                buff.splice(i, 1);
                i--;
            }
        }
    }

    removeBuff(buff) {
        for(let i = 0; i < buff.stats.length; i++) {
            switch(buff.stats[i]) {
                case "atk":
                    this.turnActors[0].entity.atk /= buff.modifier;
                    break;
                case "atkS":
                    this.turnActors[0].entity.atkS /= buff.modifier;
                    break;
                case "heal":
                    this.turnActors[0].entity.heal /= buff.modifier;
                    break;
                case "crit":
                    this.turnActors[0].entity.crit -= buff.modifier;
                    break;
                case "def":
                    this.turnActors[0].entity.def /= buff.modifier;
                    break;
                case "defS":
                    this.turnActors[0].entity.defS /= buff.modifier;
                    break;
                case "vit":
                    this.turnActors[0].entity.vit /= buff.modifier;
                    break;
            }
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
        this.checkDead(this.turnActors[0]);
    }
    //Status

    //Cleanup Combat
    hideMenuCleanup() {
        this.domCombat.classList.remove("menuCombatVisible");
        this.crystalShow.innerHTML = "";
    }

    removeActors() {
        for(let i = 0; i < this.actors.length; i++) {
            this.scene.remove(this.actors[i].entity);
        }
    }
}