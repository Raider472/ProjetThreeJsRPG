import { Consumable } from "../Item/Consumable";
import { Armor } from "../Item/Armor";
import { Weapon } from "../Item/Weapon";
import { SpriteObject } from "./SpriteObject";

export class Chest extends SpriteObject {
    content = [];
    open = false;

    openAnimation = [];

    constructor(items, path, horiTile, vertiTile, position, scale, openAnimation) {
        super(path, horiTile, vertiTile, position, scale);
        this.openAnimation = openAnimation;

        for(let i = 0; i < items.length; i++) {
            if(items[i].type === "consumables") {
                for(let j = 0; j < items[i].quantity; j++) {
                    let item = new Consumable(items[i].id);
                    this.content.push(item);
                }
            }
            else if(items[i].type === "armor") {
                for(let j = 0; j < items[i].quantity; j++) {
                    let item = new Armor(items[i].id);
                    this.content.push(item);
                }
            }
            else if(items[i].type === "weapon") {
                for(let j = 0; j < items[i].quantity; j++) {
                    let item = new Weapon(items[i].id);
                    this.content.push(item);
                }
            }
        }
    }

    openChest(inventory) {
        this.loop(this.openAnimation, 0.3);
        for(let i = 0; i < this.content.length; i++) {
            inventory.addItem(this.content[i]);   
        }
        this.open = true;
    }

    update(delta) {
        if(this.currentTile != this.indexSprite.length - 1) {
            this.elapsedTime += delta;

            if(this.maxDisplayTime > 0 && this.elapsedTime >= this.maxDisplayTime) {
                this.elapsedTime = 0;
                this.runningTileSprite = (this.runningTileSprite +1) % this.indexSprite.length;
                this.currentTile = this.indexSprite[this.runningTileSprite];
    
                this.offsetX = (this.currentTile % this.horiTile) / this.horiTile;
                this.offsetY = (this.vertiTile - Math.floor(this.currentTile / this.horiTile)-1) / this.vertiTile;
                this.map.offset.x = this.offsetX;
                this.map.offset.y = this.offsetY;
            }   
        }
    }
}