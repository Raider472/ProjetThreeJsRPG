import * as THREE from "three";
import { PlayerSprite } from "./Sprite/PlayerSprite";
import { SpriteObject } from "./Sprite/Sprite";
export { SpriteList, MovementSpriteObj }

//Test De Sprite
const map = new THREE.TextureLoader().load("/sprite/TemplateChar.png");
const materialSprite = new THREE.SpriteMaterial({map: map});

const pos = {
    x: 2,
    y:0,
    z:0
}
const pos2 = {
    x: 3,
    y:0,
    z:0
}
const pos3 = {
    x: 3,
    y:1,
    z:0
}
const pos4 = {
    x: 3,
    y:0,
    z:0
}

const mapTree = new THREE.TextureLoader().load("/sprite/TreeTest.png");
const materialTree = new THREE.SpriteMaterial({map: mapTree});

const mapSkeleton = new THREE.TextureLoader().load("/sprite/Monsters/Skeleton/Attack3.png");
const materialSkeleton = new THREE.SpriteMaterial({map: mapSkeleton});

const mapGoblin = new THREE.TextureLoader().load("/sprite/Monsters/Goblin/Attack3.png");
const materialGoblin = new THREE.SpriteMaterial({map: mapGoblin});

const testSprite = new PlayerSprite(materialSprite, 8, 8, map);
const arbre = new SpriteObject(materialTree, 1, 1, mapTree, pos);
const arbre2 = new SpriteObject(materialTree, 1, 1, mapTree, pos2);
const arbre3 = new SpriteObject(materialTree, 1, 1, mapTree, pos3);
const skeletonSprite = new SpriteObject(materialSkeleton, 6, 1, mapSkeleton, pos);
const goblinSprite = new SpriteObject(materialGoblin, 12, 1, mapGoblin, pos4);

const SpriteList = {
    playerSprite: testSprite,
    tree: arbre,
    tree2: arbre2,
    tree3: arbre3,
    skeleton: skeletonSprite,
    goblin: goblinSprite
}

//Sprite S
const arrayS = [0, 1, 2, 3, 4, 5]
//sprite Z
const arrayZ = [8, 9, 10, 11, 12, 13]
//sprite D
const arrayD = [16, 17, 18, 19, 20, 21]
//sprite Q
const arrayQ = [24, 25, 26, 27, 28, 29]

const MovementSpriteObj = {
    arrayS: arrayS,
    arrayZ: arrayZ,
    arrayD: arrayD,
    arrayQ: arrayQ
}