import { SpriteList } from '../Declarations/SpriteDeclaration';
import { SpriteObject } from '../Sprite/SpriteObject';
import { Chest } from '../Sprite/Chest';
import { Monsters } from '../Actors/Monsters';
import { EntitySprite } from '../Sprite/EntitySprite';
import { mapsCrossReferenceHeroCombat } from '../Declarations/MapsDeclaration';
import { mapsCrossReferenceMonsterCombat } from '../Declarations/MapsDeclaration';
import { Team } from '../Actors/Team';

export class AssetFactory {
    /**
     * Design pattern de Factory :
     * Produit les sprites selon leurs ids de la tile pour la carte du jeu.
     */
    
    constructor() {
        this.spritesToAnimate = ['3'];
        this.tileSize = 1;
        this.chestSize = 0.5;
        this.assets = {
            // 0 - Sable
            '0': (x, y, z = -0.005) => {
                const scale = {x: 1, y: 1, z: 1}
                const terrainDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/32x32_sand_desert_dune.png", 1, 1, {x, y, z}, scale);
                terrainDeclaration.userData = '0-1';
                return terrainDeclaration;
            },
            // 0-1 - Herbe
            '0-1': (x, y, z = -0.005) => {
                const scale = {x: 1, y: 1, z: 1}
                const terrainDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/Grass/Grass12.png", 1, 1, {x, y, z}, scale);
                terrainDeclaration.userData = '0';
                return terrainDeclaration;
            },
            '0-2': (x, y, z = -0.005) => {
                const scale = {x: 1, y: 1, z: 1}
                const terrainDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/Grass/Grass03.png", 1, 1, {x, y, z}, scale);
                terrainDeclaration.userData = '0';
                return terrainDeclaration;
            },
            '0-3': (x, y, z = -0.005) => {
                const scale = {x: 1, y: 1, z: 1}
                const terrainDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/Grass/Grass04.png", 1, 1, {x, y, z}, scale);
                terrainDeclaration.userData = '0';
                return terrainDeclaration;
            },
            // 1 - Murs
            '1': (x, y, z = 0.005) => {
                const scale = {x: 1, y: 1, z: 1}
                const wallDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/brick_wall_sunny.png", 1, 1, {x, y, z}, scale);
                wallDeclaration.userData = '1';
                return wallDeclaration;
            },
            // 2 - Arbres
            '2': (x, y, z = 0.008) => {
                const scale = {x: 1, y: 1, z: 1}
                const treesDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/tree.png", 1, 1, {x, y, z}, scale);
                treesDeclaration.userData = '2';
                return treesDeclaration;
            },
            '2-1': (x, y, z = 0.008) => {
                const scale = {x: 0.8, y: 0.8, z: 1}
                const treesDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/expansion/bonus_trees.png", 3, 3, {x, y, z}, scale);
                treesDeclaration.userData = '2-1';
                return treesDeclaration;
            },
            // 2-2 Palmier 1
            '2-2': (x, y, z = 0.009) => {
                const scale = {x: 2, y: 2, z: 1}
                const treesDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/palm.png", 1, 1, {x, y, z}, scale);
                treesDeclaration.userData = '2-2';
                return treesDeclaration;
            },
            // 2-3 Palmier 2
            '2-3': (x, y, z = 0.009) => {
                const scale = {x: 2, y: 2, z: 1}
                const treesDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/palm_2.png", 1, 1, {x, y, z}, scale);
                treesDeclaration.userData = '2-3';
                return treesDeclaration;
            },
            // 2-4 Palmier 3
            '2-4': (x, y, z = 0.009) => {
                const scale = {x: 2, y: 2, z: 1}
                const treesDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/palm_3.png", 1, 1, {x, y, z}, scale);
                treesDeclaration.userData = '2-3';
                return treesDeclaration;
            },
            // 2-5 Palmier 4
            '2-5': (x, y, z = 0.009) => {
                const scale = {x: 2, y: 2, z: 1}
                const treesDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/palm_4.png", 1, 1, {x, y, z}, scale);
                treesDeclaration.userData = '2-3';
                return treesDeclaration;
            },
           // 3 - Eau
            '3': (x, y, z = -0.004) => {
                const scale = {x: 1, y: 1, z: 1}
                const oceanDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/ocean.png", 8, 2, {x, y, z}, scale, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
                oceanDeclaration.userData = '3';
                return oceanDeclaration;
            },
            // 4 - Monstres
            '4': (x, y, team, z = 0.009) => {
                const scale = {x: 1, y: 1, z: 1};

                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        try {
                            const filteredEntities = this.generateMonsterSprite(team, scale, x, y, z);
                            resolve(filteredEntities);
                        } catch (error) {
                            reject(error);
                        }
                    }, 1000);
                });
            },
            // 5 - Porte de sortie
            '5': (x, y, z = -0.005) => {
                const scale = {x: 1, y: 1, z: 1}
                const doorDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/door.jpg", 1, 1, {x, y, z}, scale);
                doorDeclaration.userData = '5';
                return doorDeclaration;
            },
            // 6 - Coffres
            '6': (x, y, items, z = -0.005) => {
                const scale = {x: 0.5, y: 0.5, z: 1}
                const chestDeclaration = new Chest(items, "/assets/game_assets/timefantasy_characters/frames/chests/chest1/SpriteSheetChest1.png", 4, 1, {x, y, z}, scale, [0, 1, 2, 3]);
                chestDeclaration.userData = '6';
                return chestDeclaration;
            },
            // Tuile vide : améliore les performances au chargement de la map
            '': (x, y, z = -0) => {
                return '';
            },

        }
    }

    generateMonsterSprite(team, scale, x, y, z) {
        let filteredEntities = mapsCrossReferenceMonsterCombat.entities.filter(entity => entity.id === team[0].id);
        filteredEntities = filteredEntities[0];
        let monsterTeam = new Team(team);
        const monstersDeclaration = new EntitySprite(filteredEntities.path, filteredEntities.horiTile, filteredEntities.vertiTile, monsterTeam, { x, y, z }, scale, filteredEntities.idleWorld);
        monstersDeclaration.userData = '4';
        return monstersDeclaration;
    }
    

    createAssetInstance(assetId, x, y, thirdParameter = 0) {
        if (assetId in this.assets) {
            const xSize = y * this.tileSize;
            const ySize = x * this.tileSize;
            if(thirdParameter != 0) {
                return this.assets[assetId](xSize, ySize, thirdParameter);
            }
            else {
                return this.assets[assetId](xSize, ySize);
            }
        } else {
            console.warn(`l'id de l'asset : ${assetId} est introuvable !`);
            return undefined;
        }
    }

    createItemsInsideChest(separateString) {
        let items = [];
        for(let k = 1; k < separateString.length; k++) {
            let separatedCode = separateString[k].split("-");
            let id = Number(separatedCode[0]);
            let type;
            let quantity = Number(separatedCode[2]);
            if(Number(separatedCode[1]) === 1) {
                type = "consumables";
            }
            else if(Number(separatedCode[1]) === 2) {
                type = "armor";
            }
            else{
                type = "weapon";
            }
            items.push({id: id, type: type, quantity: quantity});
        }
        return items
    }

    createMonsters(separateString) {
        return new Promise((resolve, reject) => {
            try {
                let team = [];
                let monsterInfo = separateString[1].split("-");
                
                for (let k = 0; k < monsterInfo.length; k++) {
                    let id = Number(monsterInfo[k]);
                    let monster = new Monsters(id);
                    team.push(monster);
                }
    
                resolve(team);
            } catch (error) {
                reject(error);
            }
        });
    }
    

    updateObstaclesSprites(deltaTime, animationHandlerArray) {
        for (let i = 0; i < animationHandlerArray.length; i++) {
            let assetInstance = animationHandlerArray[i];
            if (assetInstance instanceof SpriteObject) {
                assetInstance.update(deltaTime);
            }
        }
    }
    
}