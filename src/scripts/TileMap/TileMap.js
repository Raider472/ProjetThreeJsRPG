import * as THREE from 'three';
import { PlayerSprite } from '../Sprite/PlayerSprite';
export {SpriteObject} from './SpriteObject';

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

        this.terrain = [];
        this.characters = [];
        this.monsters = [];
        this.walls = [];
        this.tress = [];
        this.exitDoor = null;


        // Création des différents éléments :

        this.initMap();
        this.createTerrain();
        this.createCharacters();
        this.createMonsters();
        this.createWalls();
        this.createTrees();
        this.createExitDoor();
    }

    initMap() {
        for (let i = 0; i < this.mapData.length; i++) { // i représente les lignes
            for (let j = 0; j < this.mapSize; j++) { // j représente les colonnes

                const tileType = this.mapData[i][j];
                const sprite = this.createSprite(tileType);

                sprite.position.set(j * this.tileSize, 0, i * this.tileSize);

                this.scene.add(sprite);

                this.storeTileReference(tileType, sprite);
            }
        }
    }

    createSprite() {
      const geometry = new THREE.PlaneGeometry(this.tileSize, this.tileSize);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const sprite = new THREE.Mesh(geometry, material);
  
      return sprite;
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

      // Factory des éléments :

      createTerrain() {
        let terrain = {
          'grass': {

          }
        }
      }

      createCharacters() {
        let characters = {
          'character-1': {
            mapCharacter: new THREE.TextureLoader().load("/sprites/TemplateChar.png"),
            materialCharacter: new THREE.SpriteMaterial({map: mapCharacter}),
            characterDeclaration: new PlayerSprite(materialSprite, 8, 8, map, teamHeroes, posHero, scaleHero, [6, 7], arrayQ, arrayD, arrayZ, arrayS)
          }
        };

        characters.forEach(character => {
          this.scene.add(character);
        });
    }
    
      createMonsters() {
        const monsters = {
          'zombie-1': {
            mapZombie: new THREE.TextureLoader().load("/sprite/Zombie.png"),
            materialZombie: new THREE.SpriteMaterial({ map: mapZombie }),
            zombieDeclaration: new MonsterSprite(materialZombie, 4, 4, mapZombie, teamMonsterTest, posMons, scaleMonster, [0, 1, 2, 3])
          }
        };
        
        monsters.forEach(monster => {
          this.scene.add(monster[0]);
        });
    }
    
      createWalls() {
        const walls = {
          'wall-1': {

          }
        };

        walls.forEach(wall => {
          this.scene.add(wall);
        });
    }
    
      createTrees() {
        const trees = {
          'tree-1': {

          }
        };
        
        trees.forEach(tree => {
          this.scene.add(tree);
        });
    }
    
      createExitDoor() {
        const exitDoor = new 
        this.scene.add(this.exitDoor);
    }
}