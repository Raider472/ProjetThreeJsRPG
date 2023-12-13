import * as THREE from 'three';
import { EntitySprite } from './EntitySprite';
import { Team } from '../Actors/Team';


export class PlayerSprite extends EntitySprite {

    velocity = {
        x: 0,
        y: 0,
        z: 0
    }

    leftSprite
    rightSprite
    upSprite
    downSprite

    constructor(path, horiTile, vertiTile, team, position = {x: 0, y:0, z:0}, scaleObj = {x: 1, y: 1, z: 1}, idle = [], left = [], right = [], up = [], down = []) {
        super(path, horiTile, vertiTile, team, position, scaleObj, idle);
        this.leftSprite = left
        this.rightSprite = right
        this.upSprite = up
        this.downSprite = down
        this.loop(this.idle, 1)
        this.updateSides();
    }

    update(delta) {
        this.elapsedTime += delta;

        if(this.maxDisplayTime > 0 && this.elapsedTime >= this.maxDisplayTime) {
            this.elapsedTime = 0
            this.runningTileSprite = (this.runningTileSprite +1) % this.indexSprite.length;
            this.currentTile = this.indexSprite[this.runningTileSprite];

            this.offsetX = (this.currentTile % this.horiTile) / this.horiTile;
            this.offsetY = (this.vertiTile - Math.floor(this.currentTile / this.horiTile)-1) / this.vertiTile;
            this.map.offset.x = this.offsetX;
            this.map.offset.y = this.offsetY;
        }

        this.position.x += this.velocity.x;
		this.position.z += this.velocity.z;
        this.position.y += this.velocity.y;
        this.updateSides();
    }

    updateSides() {
        this.right = this.position.x + this.scale.x/2;
        this.left = this.position.x - this.scale.x/2;
        this.top = this.position.y + this.scale.y/2;
        this.bottom = this.position.y - this.scale.y/2;
        this.front = this.position.z + this.scale.z/2;
        this.back = this.position.z - this.scale.z/2;
    }
}