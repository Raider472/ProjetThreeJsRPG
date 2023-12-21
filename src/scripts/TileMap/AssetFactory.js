import { SpriteObject } from '../Sprite/SpriteObject';

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
            // 0 - Terrain du jeu
            '0': (x, y, z = -0.005) => {
                const scale = {x: 1, y: 1, z: 1}
                const terrainDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/Grass/Grass12.png", 1, 1, {x, y, z}, scale);
                terrainDeclaration.userData = '0';
                return terrainDeclaration;
            },
            '0-1': (x, y, z = -0.005) => {
                const scale = {x: 1, y: 1, z: 1}
                const terrainDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/Grass/Grass01.png", 1, 1, {x, y, z}, scale);
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
                const wallDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/brick_wall.png", 1, 1, {x, y, z}, scale);
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
                const scale = {x: 1.5, y: 1.5, z: 1}
                const treesDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/expansion/bonus_trees.png", 3, 3, {x, y, z}, scale);
                treesDeclaration.userData = '2-1';
                return treesDeclaration;
            },
           // 3 - Eau
            '3': (x, y, z = -0.004) => {
                const scale = {x: 1, y: 1, z: 1}
                const oceanDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/ocean.png", 8, 2, {x, y, z}, scale, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
                oceanDeclaration.userData = '3';
                return oceanDeclaration;
            },
            // 3 - Personnages jouables
            // '3': (x, y, z = 0.006) => {
            //     const scale = {x: 1, y: 1, z: 1}
            //     const charactersDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/sheets/$tf_template.png", 3, 4, {x, y, z}, scale, [0, 1, 2, 3]);
            //     charactersDeclaration.userData = '3';
            //     return charactersDeclaration;
            // },
            // 4 - Monstres
            '4': (x, y, z = 0.006) => {
                const scale = {x: 1, y: 1, z: 1}
                const monstersDeclaration = new SpriteObject("/sprite/Monsters/Skeleton/Attack3.png", 1, 6, {x, y, z}, scale);
                monstersDeclaration.userData = '4';
                return monstersDeclaration;
            },
            // 5 - Porte de sortie
            '5': (x, y, z = -0.005) => {
                const scale = {x: 1, y: 1, z: 1}
                const doorDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/door.jpg", 1, 1, {x, y, z}, scale);
                doorDeclaration.userData = '5';
                return doorDeclaration;
            },
            // 6 - Coffres
            '6': (x, y, z = -0.005) => {
                const scale = {x: 0.5, y: 0.5, z: 1}
                const chestDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/frames/chests/chest1/1.png", 1, 1, {x, y, z}, scale);
                chestDeclaration.userData = '6';
                return chestDeclaration;
            },
            // Tuile vide : améliore les performances au chargement de la map
            '': (x, y, z = -0) => {
                return '';
            },

        }
    }

    createAssetInstance(assetId, x, y) {
        if (assetId in this.assets) {
            const xSize = y * this.tileSize;
            const ySize = x * this.tileSize;

            return this.assets[assetId](xSize, ySize);
        } else {
            console.warn(`l'id de l'asset : ${assetId} est introuvable !`);
            return undefined;
        }
    }

    updateObstaclesSprites(deltaTime, animationHandlerArray) {
        for (let i = 0; i < animationHandlerArray.length; i++) {
            let assetInstance = animationHandlerArray[i];
            console.log(assetInstance)
            if (assetInstance instanceof SpriteObject) {
                assetInstance.update(deltaTime);
            }
        }
    }
    
}