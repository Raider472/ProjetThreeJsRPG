import * as THREE from "three";

const pathTemplate = "/sprite/TemplateChar.png";
const spriteSheetMilitary1 = "/assets/game_assets/timefantasy_characters/sheets/military1.png";
const spriteSheetCharacter2 = "/assets/game_assets/timefantasy_characters/sheets/chara2.png";
const spriteSheetCharacter5 = "/assets/game_assets/timefantasy_characters/sheets/chara5.png";
const spriteSheetZombie = "/sprite/Zombie.png";

export const mapsCrossReferenceHeroCombat = {
    entities: [
        {
            id: 1, name: "Leon, the Rookie Knight", path: spriteSheetMilitary1, idle: [27, 28, 29], horiTile: 12, vertiTile: 8 
        },
        {
            id: 2, name: "Edvard", path: spriteSheetMilitary1, idle: [75, 76, 77], horiTile: 12, vertiTile: 8 
        },
        {
            id: 3, name: "Average Herbalist", path: spriteSheetCharacter2, idle: [33, 34, 35], horiTile: 12, vertiTile: 8 
        },
        {
            id: 4, name: "Archer", path: spriteSheetCharacter2, idle: [30, 31, 32], horiTile: 12, vertiTile: 8 
        },
    ]
}

export const mapsCrossReferenceMonsterCombat = {
    entities: [
        {
            id: 4, name: "Zombies", path: spriteSheetZombie, idle: [0, 1, 2, 3], horiTile: 4, vertiTile: 4 
        },
        {
            id: 3, name: "Bandit", path: spriteSheetCharacter5, idle: [21, 22, 23], horiTile: 12, vertiTile: 8 
        },
    ]
}