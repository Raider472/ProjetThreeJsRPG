import * as THREE from 'three';

export class Actors {
    id;
    class;
    name;
    rarity;
    hp;
    atk;
    atkS;
    heal;
    crit;
    def;
    defS;
    shield;
    vit;
    crystalGeneration;
    passiveSkills = [];
    crystalAttacks = [];

    maxHp;
    maxShield;

    status = [];
    buffs = [];

    isAi = true;
    isFreezed = false;

    constructor(id) {
        if(this.constructor === Actors) {
            throw new Error('Abstract class "Actors" cannot be instantiated directly');
        }
        else {
            this.fetchJson(id).then(actor => {
                console.log(actor)
                this.id = actor[0].id;
                this.class = actor[0].class;
                this.name = actor[0].name;
                this.rarity = actor[0].rarity;
                this.hp = actor[0].hp;
                this.maxHp = actor[0].hp;
                this.atk = actor[0].atk;
                this.atkS = actor[0].atkS;
                this.heal = actor[0].heal;
                this.crit = actor[0].crit;
                this.def = actor[0].def;
                this.defS = actor[0].defS;
                this.shield = actor[0].shield;
                this.maxShield = actor[0].shield;
                this.vit = actor[0].vit;
                this.crystalGeneration = actor[0].crystalGeneration;
                this.passiveSkills = actor[0].passiveSkills;
                this.crystalAttacks = actor[0].crystalAttacks;
            })
        }
    }

    async fetchJson(filterId) {
        throw new Error('This function must be implemented');
    }
}