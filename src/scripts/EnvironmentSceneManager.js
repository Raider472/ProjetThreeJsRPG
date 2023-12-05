import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { collisionDetection, collisionMonsters } from "./Collision/Collision";
import * as Move from "./Mouvement";
import { SpriteList } from "./Declarations/SpriteDeclaration";
import { Combat } from "./Combat";

//Variable importante
let isInCombat = false;
let combat = null;
let switchCamera1 = false;

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
                console.log(combat, "combat class information");
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
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(SpriteList.playerSprite.upSprite, 1.5);
            animationInProgress = true;
        }
    }
    else if(keys.s.pressed && isInCombat === false) {
        SpriteList.playerSprite.velocity.y = -0.05;
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(SpriteList.playerSprite.downSprite, 1.5);
            animationInProgress = true;
        }
    }

    SpriteList.playerSprite.velocity.x = 0;
    if(keys.d.pressed && isInCombat === false) {
        SpriteList.playerSprite.velocity.x = 0.05;
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(SpriteList.playerSprite.rightSprite, 1.5);
            animationInProgress = true;
        }
    }
    else if(keys.a.pressed && isInCombat === false) {
        SpriteList.playerSprite.velocity.x = -0.05;
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(SpriteList.playerSprite.leftSprite, 1.5);
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
        //Possibly have to remove that
        resultColissionMonster.monster.position.x = 55;
        //Possibly have to remove that
        combat = new Combat(SpriteList.playerSprite.team.teamArray, resultColissionMonster.monster.team.teamArray, scene);
    }
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
onZoom();
