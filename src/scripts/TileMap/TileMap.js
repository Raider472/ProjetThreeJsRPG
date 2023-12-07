import * as THREE from 'three';
import { AssetFactory } from './AssetFactory';

export class TileMap {
    constructor(scene) {
        this.scene = scene;
        this.tileSize = 1; // taille d'une tuille en pixels;

        // Variables qui stockent les éléments de la scène : 

        this.mapData = [
            '1', '1', '1', '1', '1',
            '1', '0', '0', '0', '1',
            '1', '0', '0', '0', '1', 
            '1', '1', '1', '1', '1', 
        ];

        // Sauvegardes des éléments : 

        this.terrain = [];
        this.characters = [];
        this.monsters = [];
        this.walls = [];
        this.trees = [];
        this.exitDoor = null;
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