import * as THREE from 'three';
import { Item } from './Item';

export class Weapon extends Item {
    atkBuff;
    shieldPenetration;
    critBuff;
    vitBuff;
    buffDesc;
    
    constructor(id) {
        super(id);
        this.type = "weapon";
    }

    async fetchJson(filterId) {
        try {
            let response = await fetch("/db_item/Weapon.json");
            let weaponJson = await response.json();
            let weaponJsonFiltered = await weaponJson.weapons.filter(f => f.id === filterId);
            this.atkBuff = weaponJsonFiltered[0].atkBuff;
            this.shieldPenetration = weaponJsonFiltered[0].shieldPenetration;
            this.vitBuff = weaponJsonFiltered[0].vitBuff;
            this.buffDesc = weaponJsonFiltered[0].buffDesc;
            return weaponJsonFiltered;
        } catch (error) {
            console.error("Error fetching JSON :", error);
        }
    }
}