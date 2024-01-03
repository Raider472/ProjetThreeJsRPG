import * as THREE from 'three';
import { Item } from './Item';

export class Armor extends Item {

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
            let response = await fetch("/db_item/Armor.json");
            let armorJson = await response.json();
            let armorJsonFiltered = await armorJson.armors.filter(f => f.id === filterId);
            this.defBuff = armorJsonFiltered[0].id;
            this.defSBuff = armorJsonFiltered[0].name;
            this.shieldBuff = armorJsonFiltered[0].desc;
            this.vitBuff = armorJsonFiltered[0].price;
            this.buffDesc = armorJsonFiltered[0].costDesc;
            return armorJsonFiltered;
        } catch (error) {
            console.error("Error fetching JSON :", error);
        }
    }
}