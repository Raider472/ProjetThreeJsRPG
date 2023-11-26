import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { collisionDetection, collisionMonsters } from "./Collision/Collision";
import * as Move from "./Mouvement";
import { SpriteList } from "./SpriteDeclaration";
import { Hero } from "./Actors/Hero";

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
camera2.position.z = 5;
camera2.position.x = 3

scene.add(camera, camera2);

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
            console.log(SpriteList.playerSprite.team)
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
	renderer.render( scene, camera );

	let deltaTime = clock.getDelta();

	SpriteList.playerSprite.velocity.y = 0;
	if(keys.w.pressed) {
        SpriteList.playerSprite.velocity.y = 0.05;
        //renderer.render( scene, camera );
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(SpriteList.playerSprite.upSprite, 1.5);
            animationInProgress = true;
        }
    }
    else if(keys.s.pressed) {
        SpriteList.playerSprite.velocity.y = -0.05;
        //renderer.render( scene, camera2 );
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(SpriteList.playerSprite.downSprite, 1.5);
            animationInProgress = true;
        }
    }

    SpriteList.playerSprite.velocity.x = 0;
    if(keys.d.pressed) {
        SpriteList.playerSprite.velocity.x = 0.05;
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(SpriteList.playerSprite.rightSprite, 1.5);
            animationInProgress = true;
        }
    }
    else if(keys.a.pressed) {
        SpriteList.playerSprite.velocity.x = -0.05;
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(SpriteList.playerSprite.leftSprite, 1.5);
            animationInProgress = true;
        }
    }
	collisionDetection(obstacle, SpriteList.playerSprite);
    if(collisionMonsters(monsters, SpriteList.playerSprite) === true) {
        console.log("collMonst");
    }
    else {
        console.log("gdtrfjuhybrdfhuy")
    }
	SpriteList.playerSprite.update(deltaTime);
    SpriteList.testMonster.update(deltaTime);

}
animate();
inventoryManagement();
onZoom();
