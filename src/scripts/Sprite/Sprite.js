import * as THREE from 'three';

export class SpriteObject extends THREE.Sprite {

    scaleObj = {
        x: 1,
        y: 1,
        z: 1
    }
    right
    left
    top
    bottom
    front
    back

    currentTile = 0
    horiTile
    vertiTile

    map
    offsetX
    offsetY

    indexSprite = []
    runningTileSprite = 0
    maxDisplayTime = 0
    elapsedTime = 0

    position = {
        x:0,
        y:0,
        z:0
    }

    constructor(material, horiTile, vertiTile, map, position = {x: 0, y:0, z:0}, scaleObj = {x: 1, y: 1, z: 1}) {
        super(material)
        this.horiTile = horiTile
        this.vertiTile = vertiTile
        this.map = map

        this.map.repeat.set(1/horiTile, 1/vertiTile)
        this.map.magFilter = THREE.NearestFilter
        this.scaleObj = scaleObj
        //let vector = new THREE.Vector3(this.scaleObj.x, this.scaleObj.y, this.scaleObj.z)

        this.position.x = position.x
        this.position.y = position.y
        this.position.z = position.z

        this.scale.x = this.scaleObj.x
        this.scale.y = this.scaleObj.y
        this.scale.z = this.scaleObj.z

        this.right = this.position.x + this.scale.x/2
        this.left = this.position.x - this.scale.x/2
        this.top = this.position.y + this.scale.y/2
        this.bottom = this.position.y - this.scale.y/2
        this.front = this.position.z + this.scale.z/2
        this.back = this.position.z - this.scale.z/2
    }

    loop(spriteIndex, timeDuration) {
        this.indexSprite = spriteIndex
        this.runningTileSprite = 0
        this.currentTile = spriteIndex[this.runningTileSprite]
        this.maxDisplayTime = timeDuration / this.indexSprite.length
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
    }
}