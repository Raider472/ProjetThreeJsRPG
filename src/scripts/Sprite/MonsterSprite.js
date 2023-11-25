import { SpriteObject } from "./Sprite";
import { Team } from "../Actors/Team";

export class MonsterSprite extends SpriteObject {

    team;

    constructor(material, horiTile, vertiTile, map, team, position = {x: 0, y:0, z:0}, scaleObj = {x: 1, y: 1, z: 1}, idle) {
        super(material, horiTile, vertiTile, map, position, scaleObj, idle);
        this.team = new Team(team);
        this.loop(this.idle, 1.5)
    }

}