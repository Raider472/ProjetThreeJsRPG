import * as THREE from 'three';
import { SpriteObject } from '../Sprite/SpriteObject';

export class AssetFactory {
    /**
     * Design pattern de Factory :
     * Stocke les données et produit les données selon l'id de la tile pour la carte du jeu.
     */
    
    constructor() {
        // TODO : La propriété 'y' ne se met pas à jour !
        this.tileSize = 1;
        this.assets = {
            // 0 - Terrain du jeu
            '0': (x, y, z = -0.5) => {
                const scale = {x: 1, y: 1, z: 1}
                const terrainDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/Grass/Grass02.png", 1, 1, {x, y, z}, scale);
                terrainDeclaration.userData = '0';
                return terrainDeclaration;
            },
            // 1 - Murs
            '1': (x, y, z = 0) => {
                const scale = {x: 1, y: 1, z: 1}
                const wallDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/stone_wall02.png", 1, 1, {x, y, z}, scale);
                wallDeclaration.userData = '1';
                return wallDeclaration;
            },
            // 2 - Arbres
            '2': (x, y, z = 1) => {
                const scale = {x: 1, y: 1, z: 1}
                const treesDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/tree.png", 1, 1, {x, y, z}, scale);
                treesDeclaration.userData = '2';
                return treesDeclaration;
            },
           // 2-1 - Eau
            '0-1': (x, y, z = -0.5) => {
                const scale = {x: 1, y: 1, z: 1}
                const oceanDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/ocean.png", 8, 2, {x, y, z}, scale);
                oceanDeclaration.userData = '0';
                return oceanDeclaration;
            },
            // 3 - Personnages jouables
            '3': (x, y, z = 1) => {
                const scale = {x: 1, y: 1, z: 1}
                const charactersDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/sheets/$tf_template.png", 3, 4, {x, y, z}, scale, [0, 1, 2, 3]);
                charactersDeclaration.userData = '3';
                return charactersDeclaration;
            },
            // 4 - Monstres
            '4': (x, y, z = 1) => {
                const scale = {x: 1, y: 1, z: 1}
                const monstersDeclaration = new SpriteObject("/sprite/Monsters/Skeleton/Attack3.png", 1, 6, {x, y, z}, scale);
                monstersDeclaration.userData = '4';
                return monstersDeclaration;
            },
            // 5 - Porte de sortie
            '5': (x, y, z = -0.1) => {
                const scale = {x: 1, y: 1, z: 1}
                const doorDeclaration = new SpriteObject("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/door.jpg", 1, 1, {x, y, z}, scale);
                doorDeclaration.userData = '5';
                return doorDeclaration;
            }
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
}