import * as THREE from "three";
import { collisionDetection } from "./Collision/Collision";
import * as Move from "./Mouvement";
import { SpriteList } from "./SpriteDeclaration";

const scene = new THREE.Scene();

const gameWindow = document.getElementById('game-renderer');

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
gameWindow.appendChild( renderer.domElement );

scene.add(SpriteList.playerSprite, SpriteList.skeleton, SpriteList.goblin);
SpriteList.playerSprite.position.y = 0
SpriteList.playerSprite.position.x = -1
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

const DEFAULT_CAMERA_POSITION = camera.position.z = 2;
DEFAULT_CAMERA_POSITION

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

	let deltaTime = clock.getDelta();

	SpriteList.playerSprite.velocity.y = 0;
	if(keys.w.pressed) {
        SpriteList.playerSprite.velocity.y = 0.05;
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(SpriteList.playerSprite.upSprite, 1.5);
            animationInProgress = true;
        }
    }
}
animate();
inventoryManagement();