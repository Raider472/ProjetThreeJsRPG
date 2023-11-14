import * as THREE from "three";
import { collisionDetection } from "./Collision/Collision";
import * as Move from "./Mouvement";
import { SpriteList } from "./SpriteDeclaration";
import { MovementSpriteObj } from "./SpriteDeclaration";

const scene = new THREE.Scene();

const gameWindow = document.getElementById('game-renderer');

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
gameWindow.appendChild( renderer.domElement );

scene.add(SpriteList.playerSprite, SpriteList.tree, SpriteList.tree2, SpriteList.tree3);
SpriteList.playerSprite.position.y = 2
let animationInProgress = false;
const clock = new THREE.Clock

// Camera :

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const FOV = 75; 
const SCREEN_ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 1000;
const camera = new THREE.PerspectiveCamera(FOV, SCREEN_ASPECT, NEAR, FAR);

const MIN_CAMERA_POSITION = 2;
const DEFAULT_CAMERA_POSITION = camera.position.z = 5;
const MAX_CAMERA_POSITION = 100;

scene.add(camera);

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

const keys = Move.keys

Move.PlayerMovementControlsDown(keys)

window.addEventListener("keyup", (event)=>{
	animationInProgress = false;
	switch(event.code) {
		case "KeyA":
			keys.a.pressed = false
			break;
		case "KeyD":
			keys.d.pressed = false
			break;
		case "KeyW":
			keys.w.pressed = false
			break;
		case "KeyS":
			keys.s.pressed = false
			break;
	}
})

const obstacle = [SpriteList.tree, SpriteList.tree2, SpriteList.tree3]

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

	let deltaTime = clock.getDelta()

	SpriteList.playerSprite.velocity.y = 0
	if(keys.w.pressed) {
        SpriteList.playerSprite.velocity.y = 0.05
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(MovementSpriteObj.arrayZ, 1.5)
            animationInProgress = true
        }
    }
    else if(keys.s.pressed) {
        SpriteList.playerSprite.velocity.y = -0.05
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(MovementSpriteObj.arrayS, 1.5)   
            animationInProgress = true
        }
    }

    SpriteList.playerSprite.velocity.x = 0
    if(keys.d.pressed) {
        SpriteList.playerSprite.velocity.x = 0.05
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(MovementSpriteObj.arrayD, 1.5)
            animationInProgress = true
        }
    }
    else if(keys.a.pressed) {
        SpriteList.playerSprite.velocity.x = -0.05
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(MovementSpriteObj.arrayQ, 1.5)
            animationInProgress = true
        }
    }
	collisionDetection(obstacle, SpriteList.playerSprite)
	SpriteList.playerSprite.update(deltaTime)	
}
animate()
onZoom();