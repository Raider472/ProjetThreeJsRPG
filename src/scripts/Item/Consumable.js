import * as THREE from 'three';
import { Item } from './Item';

export class Consumable extends Item {
    modifier;

    constructor(id) {
        super(id);
        this.type = "consumable";
    }

    async fetchJson(filterId) {
        try {
            let response = await fetch("../../src/db_item/Consumables.json");
            let consumableJson = await response.json();
            let consumableJsonFiltered = await consumableJson.consumables.filter(f => f.id === filterId);
            this.modifier = consumableJsonFiltered[0].modifier;
            return consumableJsonFiltered;
        } catch (error) {
            console.error("Error fetching JSON :", error);
        }
    }
}