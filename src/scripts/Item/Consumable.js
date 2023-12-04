import * as THREE from 'three';
import { Item } from './Item';

export class Consumable extends Item {
    constructor(id) {
        super(id);
    }

    async fetchJson(filterId) {
        try {
            let response = await fetch("/db_item/Consumable.json");
            let consumableJson = await response.json();
            let consumableJsonFiltered = await consumableJson.consumables.filter(f => f.id === filterId);
            return consumableJsonFiltered;
        } catch (error) {
            console.error("Error fetching JSON :", error);
        }
    }
}