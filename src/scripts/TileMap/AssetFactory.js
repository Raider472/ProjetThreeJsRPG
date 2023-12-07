import * as THREE from 'three';
import { SpriteObject } from '../Sprite/Sprite';
import { TileMap } from './TileMap';

export class AssetFactory {
    /**
     * Design pattern de Factory :
     * Stocke les données et produit les données selon l'id de la tile pour la carte du jeu.
     */
    
    constructor() {
        // TODO : La propriété 'y' ne se met pas à jour !
        this.assets = {
            // 0 - Terrain du jeu
            '0': (x, y, z = -0.5) => {
                const scale = {x: 1, y: 1, z: 1}
                const mapTerrain = new THREE.TextureLoader().load("/assets/game_assets/timefantasy_characters/RPGMAKERMV/terrain/Terreno_Verde.png");
                const materialTerrain = new THREE.SpriteMaterial({map: mapTerrain});
                const terrainDeclaration = new SpriteObject(materialTerrain, 8, 8, mapTerrain, {x, y, z}, scale);
                terrainDeclaration.userData = '0';
                return terrainDeclaration;
            },
            // 1 - Murs
            '1': (x, y, z = 1) => {
                const scale = {x: 1, y: 1, z: 1}
                const mapWall = new THREE.TextureLoader().load("/assets/game_assets/timefantasy_characters/frames/chests/chest3/1.png");
                const materialWall = new THREE.SpriteMaterial({map: mapWall});
                const wallDeclaration = new SpriteObject(materialWall, 1, 1, mapWall, {x, y, z}, scale);
                wallDeclaration.userData = '1';
                return wallDeclaration;
            },
            // 2 - Arbres
            '2': (x, y, z = 0) => {
                const scale = {x: 1, y: 1, z: 1}
                const mapTrees = new THREE.TextureLoader().load("/assets/game_assets/timefantasy_characters/RPGMAKERMV/expansion/bonus_trees.png");
                const materialTrees = new THREE.SpriteMaterial({map: mapTrees});
                const treesDeclaration = new SpriteObject(materialTrees, 16, 16, mapTrees, {x, y, z}, scale);
                treesDeclaration.userData = '2';
                return treesDeclaration;
            },
            // 3 - Personnages jouables
            '3': (x, y, z = 1) => {
                const scale = {x: 1, y: 1, z: 1}
                const mapCharacters = new THREE.TextureLoader().load("/assets/game_assets/timefantasy_characters/RPGMAKERMV/characters/npc1.png");
                const materialCharacters = new THREE.SpriteMaterial({map: mapCharacters});
                const charactersDeclaration = new SpriteObject(materialCharacters, 3, 4, mapCharacters, {x, y, z}, scale);
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
            '5': (x, y, z = 1) => {
                const scale = {x: 1, y: 1, z: 1}
                const mapDoor = new THREE.TextureLoader().load("/assets/game_assets/timefantasy_characters/RPGMAKERMV/characters/!doors.png");
                const materialDoor = new THREE.SpriteMaterial({map: mapDoor});
                const doorDeclaration = new SpriteObject(materialDoor, 8, 8, mapDoor, {x, y, z}, scale);
                doorDeclaration.userData = '5';
                return doorDeclaration;
            }
        }
    }

    createAssetInstance(assetId, x, y) {
        if (assetId in this.assets) {
            return this.assets[assetId](x, y);
        } else {
            console.warn(`l'id de l'asset : ${assetId} est introuvable !`);
            return undefined;
        }
    }
}