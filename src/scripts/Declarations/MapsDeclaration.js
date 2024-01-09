import * as THREE from "three";

const spriteSheetMilitary1 = "/assets/game_assets/timefantasy_characters/sheets/military1.png";
const spriteSheetCharacter2 = "/assets/game_assets/timefantasy_characters/sheets/chara2.png";
const spriteSheetCharacter4 = "/assets/game_assets/timefantasy_characters/sheets/chara4.png";
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
            id: 1, name: "Goblin", path: spriteSheetCharacter5, idleWorld:[57, 58, 59], idle: [69, 70, 71], horiTile: 12, vertiTile: 8 
        },
        {
            id: 3, name: "Bandit", path: spriteSheetCharacter5, idleWorld:[9, 10, 11], idle: [21, 22, 23], horiTile: 12, vertiTile: 8 
        },
        {
            id: 4, name: "Zombies", path: spriteSheetZombie, idleWorld:[0, 1, 2, 3], idle: [0, 1, 2, 3], horiTile: 4, vertiTile: 4 
        },
        {
            id: 5, name: "Marauder", path: spriteSheetCharacter5, idleWorld:[51, 52, 53], idle: [63, 64, 65], horiTile: 12, vertiTile: 8 
        },
        {
            id: 6, name: "Barbarian", path: spriteSheetCharacter5, idleWorld:[0, 1, 2], idle: [12, 13, 14], horiTile: 12, vertiTile: 8 
        },
        {
            id: 7, name: "Cultist", path: spriteSheetCharacter5, idleWorld:[54, 55, 56], idle: [66, 67, 68], horiTile: 12, vertiTile: 8 
        },
        {
            id: 8, name: "Chief Cultist", path: spriteSheetCharacter4, idleWorld:[48, 49, 50], idle: [60, 61, 62], horiTile: 12, vertiTile: 8 
        },
        {
            id: 9, name: "Champion of Chaos", path: spriteSheetCharacter4, idleWorld:[57, 58, 59], idle: [69, 70, 71], horiTile: 12, vertiTile: 8 
        }
    ]
}