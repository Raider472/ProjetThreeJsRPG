import { SpriteObject } from "./SpriteObject";

export class Shop extends SpriteObject {
    items = []

    constructor(path, horiTile, vertiTile, position, scale) {
        super(path, horiTile, vertiTile, position, scale); 
    }
}