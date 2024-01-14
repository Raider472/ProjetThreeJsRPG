import * as THREE from 'three';
import { Item } from './Item';

export class Armor extends Item {

    slot;
    defBuff;
    defSBuff;
    shieldBuff;
    vitBuff;
    buffDesc;

    constructor(id) {
        super(id);
        this.type = "armor";
    }

    async fetchJson(filterId) {
        try {
            let response = await fetch("/src/db_item/Armor.json");
            let armorJson = await response.json();
            let armorJsonFiltered = await armorJson.armors.filter(f => f.id === filterId);
            this.slot = armorJsonFiltered[0].slot;
            this.defBuff = armorJsonFiltered[0].defBuff;
            this.defSBuff = armorJsonFiltered[0].defSBuff;
            this.shieldBuff = armorJsonFiltered[0].shieldBuff;
            this.vitBuff = armorJsonFiltered[0].vitBuff;
            this.buffDesc = armorJsonFiltered[0].buffDesc;
            return armorJsonFiltered;
        } catch (error) {
            console.error("Error fetching JSON :", error);
        }
    }
}