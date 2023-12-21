import * as THREE from "three";

const pathTemplate = "/assets/sprites/characters/players/char_test1/template_char.png";
const spriteSheetDPS = "/assets/sprites/characters/players/dps/military1.png";
const spriteSheetTank = "/assets/sprites/characters/players/tank/military1.png";
const spriteSheetHealer = "/assets/sprites/characters/players/healer/chara2.png";
const spriteSheetArcher = "/assets/sprites/characters/players/archer/chara5.png";
const spriteSheetZombie = "/assets/sprites/characters/monsters/zombie/zombie.png";
const spriteSheetBandit = "/assets/sprites/characters/monsters/bandit/bandit1.png";

export const mapsCrossReferenceHeroCombat = {
    entities: [
        {
            id: 1, name: "Leon, the Rookie Knight", path: spriteSheetDPS, idle: [27, 28, 29], horiTile: 12, vertiTile: 8 
        },
        {
            id: 2, name: "Edvard", path: spriteSheetTank, idle: [75, 76, 77], horiTile: 12, vertiTile: 8 
        },
        {
            id: 3, name: "Average Herbalist", path: spriteSheetHealer, idle: [33, 34, 35], horiTile: 12, vertiTile: 8 
        },
        {
            id: 4, name: "Archer", path: spriteSheetArcher, idle: [30, 31, 32], horiTile: 12, vertiTile: 8 
        },
    ]
}

export const mapsCrossReferenceMonsterCombat = {
    entities: [
        {
            id: 4, name: "Zombies", path: spriteSheetZombie, idle: [0, 1, 2, 3], horiTile: 4, vertiTile: 4 
        },
        {
            id: 3, name: "Bandit", path: spriteSheetBandit, idle: [21, 22, 23], horiTile: 12, vertiTile: 8 
        },
    ]
}