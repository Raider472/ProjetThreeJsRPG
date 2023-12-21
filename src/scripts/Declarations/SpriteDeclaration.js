import * as THREE from "three";
import { PlayerSprite } from "../Sprite/PlayerSprite";
import { EntitySprite } from "../Sprite/EntitySprite";
import { SpriteObject } from "../Sprite/SpriteObject";
import { teamHeroes, teamMonsterTest } from "./ActorDeclaration";
export { SpriteList }

//Sprite S
const arrayS = [3, 4, 5]
//sprite Z
const arrayZ = [39, 40, 41]
//sprite D
const arrayD = [27, 28, 29]
//sprite Q
const arrayQ = [15, 16, 17]

//Test De Sprite

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
const posMons = {
    x:0,
    y:0,
    z:0
}
const posMons2 = {
    x:-1,
    y:0,
    z:0
}
const posHero = {
    x:0,
    y:2,
    z:0
}
const scaleHero = {
    x:1,
    y:1,
    z:1
}
const scaleMonster = {
    x:0.5,
    y:0.5,
    z:0.5
}

const testMonster = new EntitySprite("/assets/sprites/characters/monsters/zombie/zombie.png", 4, 4, teamMonsterTest, posMons, scaleMonster, [0, 1, 2, 3]);
const testMonster2 = new EntitySprite("/assets/sprites/characters/monsters/zombie/zombie.png", 4, 4, teamMonsterTest, posMons2, scaleMonster, [0, 1, 2, 3]);
const testSprite = new PlayerSprite("/assets/sprites/characters/players/dps/military1.png", 12, 8, teamHeroes, posHero, scaleHero, arrayS, arrayQ, arrayD, arrayZ, arrayS);

const arbre = new SpriteObject("/assets/sprites/environment/tree/tree_test.png", 1, 1, pos);
const arbre2 = new SpriteObject("/assets/sprites/environment/tree/tree_test.png", 1, 1, pos2);
const arbre3 = new SpriteObject("/assets/sprites/environment/tree/tree_test.png", 1, 1, pos3);
const skeletonSprite = new SpriteObject("/assets/sprites/characters/monsters/skeleton/attack3.png", 6, 1, pos);
const goblinSprite = new SpriteObject("/assets/sprites/characters/monsters/goblin/attack3.png", 12, 1, pos3);

const SpriteList = {
    playerSprite: testSprite,
    testMonster: testMonster,
    testMonster2: testMonster2,
    tree: arbre,
    tree2: arbre2,
    tree3: arbre3,
    skeleton: skeletonSprite,
    goblin: goblinSprite
}
/*
testSprite.upSprite = arrayZ
testSprite.downSprite = arrayS
testSprite.rightSprite = arrayD
testSprite.leftSprite = arrayQ
*/