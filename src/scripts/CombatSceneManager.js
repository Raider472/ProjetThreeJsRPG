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
}
animate();
inventoryManagement();