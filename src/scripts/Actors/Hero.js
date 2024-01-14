import { Actors } from "./Actors";

export class Hero extends Actors {

    head;
    torso;
    legs;
    boots;

    constructor(id) {
        super(id);
        this.isAi = false;
    }

    async fetchJson(filterId) {
        try {
            let response = await fetch("../../src/db_character/Hero.json");
            let heroJson = await response.json();
            let heroJsonFiltered = await heroJson.entities.filter(f => f.id === filterId);
            return heroJsonFiltered;
        } catch (error) {
            console.error("Error fetching JSON :", error);
        }
    }
}