import * as THREE from 'three';
import { AssetFactory } from './AssetFactory';

export class TileMap {
    constructor(scene) {
        this.scene = scene;
        this.tileSize = 50; // taille d'une tuille en pixels;

        // Variables qui stockent les éléments de la scène : 

        this.mapData = [
            '1', '1', '1', '1', '1', '1', '1', '1', '5', '1',
            '1', '0', '0', '0', '0', '0', '1', '0', '0', '1',
            '1', '0', '0', '0', '0', '2', '1', '0', '0', '1',
            '1', '0', '0', '0', '0', '0', '0', '0', '0', '1',
            '1', '0', '0', '0', '0', '0', '0', '0', '0', '1',
            '1', '3', '0', '0', '0', '0', '0', '0', '0', '1',
            '1', '0', '0', '0', '0', '0', '0', '0', '0', '1',
            '1', '0', '0', '0', '4', '0', '0', '0', '0', '1',
            '1', '0', '0', '0', '0', '0', '0', '0', '0', '1',
            '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
        ];

        // Sauvegardes des éléments : 

        this.terrain = [];
        this.characters = [];
        this.monsters = [];
        this.walls = [];
        this.trees = [];
        this.exitDoor = null;

        // Initialisation de la carte :

        this.initMap();
    }

    initMap() {
        for (let i = 0; i < this.mapData.length; i++) { // i représente les lignes
            for (let j = 0; j < this.mapData[i].length; j++) { // j représente les colonnes
                const createAsset = new AssetFactory(); 

                const tileType = this.mapData[i][j];
                const sprite = createAsset.createAssetInstance(tileType, this.mapData[i][j], this.mapData[j][i]);

                this.storeTileReference(tileType, sprite);
            }
        }
    }

        /**  Les différentes propriétés de la map :
     * 0 - Terrain
     * 1 - Mur (collisions)
     * 2 - Arbres (collisions)
     * 3 - Personnages jouables
     * 4 - Monstres (ennemis)
     * 5 - Porte de fin de niveau
     */

    storeTileReference(type, sprite) {
        switch (type) {
          case '0':
            this.terrain.push(sprite);
            break;
          case '3':
            this.characters.push(sprite);
            break;
          case '4':
            this.monsters.push(sprite);
            break;
          case '1':
            this.walls.push(sprite);
            break;
          case '2':
            this.trees.push(sprite);
            break;
          case '5':
            this.exitDoor = sprite;
            break;
        }
    }
}