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
    }

    async fetchJson(filterId) {
        try {
            let response = await fetch("/db_item/Armor.json");
            let armorJson = await response.json();
            let armorJsonFiltered = await armorJson.armors.filter(f => f.id === filterId);
            return armorJsonFiltered;
        } catch (error) {
            console.error("Error fetching JSON :", error);
        }
    }
}