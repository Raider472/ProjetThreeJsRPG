import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { collisionDetection, collisionMonsters } from "./Collision/Collision";
import * as Move from "./Mouvement";
import { SpriteList } from "./Declarations/SpriteDeclaration";
import { Combat } from "./Combat";


document.querySelector('[id=attack]').addEventListener('click',() => combat.generateTarget(0));
document.querySelector('[id=crystalAttack]').addEventListener('click',() => combat.generateTarget(1));
document.querySelector('[id=defend]').addEventListener('click',() => combat.defend());
document.querySelector('[id=skip]').addEventListener('click',() => combat.turnOver());

//Variable importante
let isInCombat = false;
let combat = null;
let switchCamera1 = false;
export const loopSpeed = 1;

//Fin

export const scene = new THREE.Scene();
const gameWindow = document.getElementById('game-renderer');

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
gameWindow.appendChild( renderer.domElement );

scene.add(SpriteList.playerSprite, SpriteList.tree, SpriteList.tree2, SpriteList.tree3, SpriteList.testMonster, SpriteList.testMonster2);
SpriteList.playerSprite.position.y = 2;
let animationInProgress = false;
const clock = new THREE.Clock

// Caméra :

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const FOV = 90; 
const SCREEN_ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 1000;

const camera = new THREE.PerspectiveCamera(FOV, SCREEN_ASPECT, NEAR, FAR);

const MIN_CAMERA_POSITION = 2;
const DEFAULT_CAMERA_POSITION = camera.position.z = 5;
const MAX_CAMERA_POSITION = 100;

const camera2 = new THREE.PerspectiveCamera(FOV, SCREEN_ASPECT, NEAR, FAR)
camera2.position.x = 50
camera2.position.z = 5

scene.add(camera, camera2);

// Music de fond du jeu :

const listener = new THREE.AudioListener();
camera.add(listener);

const audioLoader = new THREE.AudioLoader();

const backgroundMusic = new THREE.Audio(listener);

const audioPlay = document.getElementById('play-audio');
audioPlay.onclick = () => {audioLoader.load( '/assets/sounds/rpg_background_music.mp3', function( buffer ) {
	backgroundMusic.setBuffer( buffer );
	backgroundMusic.setLoop( true );
	backgroundMusic.setVolume( 0.3 );
	backgroundMusic.play();
})}

console.log(backgroundMusic.isPlaying);

//Remove comm
//const tileMap = new TileMap(scene);

let terrain = [];

function initialize() {
    let map = [];
    for (let x = 0; x < tileMap.mapData.length; x++) {
      const column = [];
      for (let y = 0; y < tileMap.mapData[x].length; y++) {
        const ids = {
            terrainId: '0',
            wallsId: '1',
            treesId: '2',
            charactersId: '3',
            monstersId: '4',
            exitDoorId: '5'
        }
        for (let id in ids) {
            if (tileMap.mapData[x][y] == ids[id]) {
                const newSprite = tileMap.createSprite(ids[id]);
                console.log(tileMap.mapData[x][y])
                console.log(newSprite);
                scene.add(newSprite);
                column.push(newSprite);
            }
        }
      }
      map.push(column);
      map.push([...Array(tileMap.tileSize)]);
    }
  }

// Gestion du zoom avec la molette de la souris avec listener de la molette de la souris pour le zoom de la caméra.

document.addEventListener('wheel', onZoom);

function onZoom(e) {
	const zoomSpeed = 0.01;
	DEFAULT_CAMERA_POSITION;
	camera.position.z -= e.deltaY * zoomSpeed;
	camera.position.z = Math.min(MAX_CAMERA_POSITION, Math.max(MIN_CAMERA_POSITION, camera.position.z));
	camera.updateProjectionMatrix();
}

// Fin camera

// Player mouvement controls :

//const mouvementControlsWASD = ['w', 'a', 's', 'd'];
//const mouvementControlsZQSD = ['z', 'q', 's', 'd']; // Pour les clavier FR AZERTY

const keys = Move.keys;

Move.PlayerMovementControlsDown(keys)

window.addEventListener("keyup", (event)=>{
	animationInProgress = false;
	switch(event.code) {
		case "KeyA":
			keys.a.pressed = false;
			break;
		case "KeyD":
			keys.d.pressed = false;
			break;
		case "KeyW":
			keys.w.pressed = false;
			break;
		case "KeyS":
			keys.s.pressed = false;
			break;
        case "KeyK":
            //debug Key for console log
            if(combat != null) {
                console.log(combat.turnActors, "combat class information");
            }
            break;
        case "KeyJ":
            //debug Key for console log
            if(combat != null) {
                console.log(combat, "combat class information Overall");
            }
            break;
        case "KeyL":
            //debug Key to pass a turn
            if(combat != null) {
                combat.turnOver()
            }
            break;
        case "KeyO":
            switchCamera1 = !switchCamera1
            break;
	}
})

const obstacle = [SpriteList.tree, SpriteList.tree2, SpriteList.tree3];
const monsters = [SpriteList.testMonster, SpriteList.testMonster2];
// UI :

function inventoryManagement() {
    const toolbarItem = document.getElementById('toolbar-item');
    const inventoryUi = document.getElementById('inventory-ui');
    const closeInventory = document.getElementById('close-inventory');

    inventoryUi.hidden = true;

    toolbarItem.addEventListener('click', () => {
        inventoryUi.hidden = false;
        toolbarItem.hidden = true;
    });

    closeInventory.addEventListener('click', () => {
        inventoryUi.hidden = true;
        toolbarItem.hidden = false;
    })
}


function animate() {
	requestAnimationFrame( animate );
    if(isInCombat) {
        renderer.render( scene, camera2 );
    }
    else {
        renderer.render( scene, camera );
    }

	let deltaTime = clock.getDelta();

	SpriteList.playerSprite.velocity.y = 0;

	if(keys.w.pressed && isInCombat === false) {
        SpriteList.playerSprite.velocity.y = 0.05;
        //0.008
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(SpriteList.playerSprite.upSprite, loopSpeed);
            animationInProgress = true;
        }
    }
    else if(keys.s.pressed && isInCombat === false) {
        SpriteList.playerSprite.velocity.y = -0.05;
        //-0.008
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(SpriteList.playerSprite.downSprite, loopSpeed);
            animationInProgress = true;
        }
    }

    SpriteList.playerSprite.velocity.x = 0;
    if(keys.d.pressed && isInCombat === false) {
        SpriteList.playerSprite.velocity.x = 0.05;
        //0.008
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(SpriteList.playerSprite.rightSprite, loopSpeed);
            animationInProgress = true;
        }
    }
    else if(keys.a.pressed && isInCombat === false) {
        SpriteList.playerSprite.velocity.x = -0.05;
        //-0.008
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(SpriteList.playerSprite.leftSprite, loopSpeed);
            animationInProgress = true;
        }
    }
    if(switchCamera1 === true) {
        renderer.render( scene, camera )
        switchCamera1 = false;
    }
	collisionDetection(obstacle, SpriteList.playerSprite);
    //Colision for player/monster
    let resultColissionMonster = collisionMonsters(monsters, SpriteList.playerSprite);
    if(resultColissionMonster.collision === true && isInCombat === false) {
        isInCombat = true;
        combat = new Combat(SpriteList.playerSprite.team.teamArray, resultColissionMonster.monster.team.teamArray, scene);
    }
    //debug
    if(isInCombat === true) {
        for(let i = 0; i < combat.actors.length; i++) {
            combat.actors[i].update(deltaTime);
        }
    }
	SpriteList.playerSprite.update(deltaTime);
    SpriteList.testMonster.update(deltaTime);
    SpriteList.testMonster2.update(deltaTime);

}
animate();
inventoryManagement();
initialize();
onZoom();