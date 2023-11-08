import * as THREE from 'three';
import { SpriteObject } from './Sprite';

export class PlayerSprite extends SpriteObject {

    velocity = {
        x: 0,
        y: 0,
        z: 0
    }

    constructor(material, horiTile, vertiTile, map, position = {x: 0, y:0, z:0}, scaleObj = {x: 1, y: 1, z: 1}) {
        super(material, horiTile, vertiTile, map, position, scaleObj)

        this.updateSides()
    }

    update(delta) {
        this.elapsedTime += delta

        if(this.maxDisplayTime > 0 && this.elapsedTime >= this.maxDisplayTime) {
            this.elapsedTime = 0
            this.runningTileSprite = (this.runningTileSprite +1) % this.indexSprite.length
            this.currentTile = this.indexSprite[this.runningTileSprite]

            this.offsetX = (this.currentTile %  this.horiTile) / this.vertiTile
            this.offsetY = (this.vertiTile - Math.floor(this.currentTile/ this.horiTile)-1) / this.vertiTile
            this.map.offset.x = this.offsetX
            this.map.offset.y = this.offsetY
        }

        this.position.x += this.velocity.x
		this.position.z += this.velocity.z
        this.position.y += this.velocity.y
        this.updateSides()
    }

    updateSides() {
        this.right = this.position.x + this.scale.x/2
        this.left = this.position.x - this.scale.x/2
        this.top = this.position.y + this.scale.y/2
        this.bottom = this.position.y - this.scale.y/2
        this.front = this.position.z + this.scale.z/2
        this.back = this.position.z - this.scale.z/2
    }
}