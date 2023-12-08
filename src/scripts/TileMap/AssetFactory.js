import * as THREE from 'three';
import { SpriteObject } from '../Sprite/Sprite';

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
                const mapTerrain = new THREE.TextureLoader().load("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/TileSet_V1.png");
                const materialTerrain = new THREE.SpriteMaterial({map: mapTerrain});
                const terrainDeclaration = new SpriteObject(materialTerrain, 8, 14, mapTerrain, {x, y, z}, scale);
                terrainDeclaration.userData = '0';
                return terrainDeclaration;
            },
            // 1 - Murs
            '1': (x, y, z = 0) => {
                const scale = {x: 1, y: 1, z: 1}
                const mapWall = new THREE.TextureLoader().load("/assets/game_assets/timefantasy_characters/RPGMAKERMV/expansion/bonus_pinktrees.png");
                const materialWall = new THREE.SpriteMaterial({map: mapWall});
                const wallDeclaration = new SpriteObject(materialWall, 4, 1, mapWall, {x, y, z}, scale);
                wallDeclaration.userData = '1';
                return wallDeclaration;
            },
            // 2 - Arbres
            '2': (x, y, z = 1) => {
                const scale = {x: 1, y: 1, z: 1}
                const mapTrees = new THREE.TextureLoader().load("/assets/game_assets/timefantasy_characters/RPGMAKERMV/expansion/bonus_trees.png");
                const materialTrees = new THREE.SpriteMaterial({map: mapTrees});
                const treesDeclaration = new SpriteObject(materialTrees, 4, 3, mapTrees, {x, y, z}, scale);
                treesDeclaration.userData = '2';
                return treesDeclaration;
            },
            // 3 - Personnages jouables
            '3': (x, y, z = 1) => {
                const scale = {x: 1, y: 1, z: 1}
                const mapCharacters = new THREE.TextureLoader().load("/assets/game_assets/timefantasy_characters/sheets/$tf_template.png");
                const materialCharacters = new THREE.SpriteMaterial({map: mapCharacters});
                const charactersDeclaration = new SpriteObject(materialCharacters, 3, 4, mapCharacters, {x, y, z}, scale, [0, 1, 2, 3]);
                charactersDeclaration.userData = '3';
                return charactersDeclaration;
            },
            // 4 - Monstres
            '4': (x, y, z = 1) => {
                const scale = {x: 1, y: 1, z: 1}
                const mapMonsters = new THREE.TextureLoader().load("/sprite/Monsters/Skeleton/Attack3.png");
                const materialMonsters = new THREE.SpriteMaterial({map: mapMonsters});
                const monstersDeclaration = new SpriteObject(materialMonsters, 1, 6, mapMonsters, {x, y, z}, scale);
                monstersDeclaration.userData = '4';
                return monstersDeclaration;
            },
            // 5 - Porte de sortie
            '5': (x, y, z = -0.1) => {
                const scale = {x: 1, y: 1, z: 1}
                const mapDoor = new THREE.TextureLoader().load("/assets/game_assets/timefantasy_characters/RPGMAKERMV/characters/!doors.png");
                const materialDoor = new THREE.SpriteMaterial({map: mapDoor});
                const doorDeclaration = new SpriteObject(materialDoor, 12, 8, mapDoor, {x, y, z}, scale);
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