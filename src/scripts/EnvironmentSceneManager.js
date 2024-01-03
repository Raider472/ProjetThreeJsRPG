import * as THREE from "three";
import { collisionDetection, collisionMonsters } from "./Collision/Collision";
import * as Move from "./Mouvement";
import { TileMap } from "./TileMap/TileMap";
import { SpriteList } from "./Declarations/SpriteDeclaration";
import { Combat } from "./Combat";
import { AssetFactory } from "./TileMap/AssetFactory";

export const scene = new THREE.Scene();
const gameWindow = document.getElementById('game-renderer');

document.querySelector('[id=attack]').addEventListener('click',() => combat.generateTarget(0));
document.querySelector('[id=crystalAttack]').addEventListener('click',() => combat.generateTarget(1));
document.querySelector('[id=defend]').addEventListener('click',() => combat.defend());
document.querySelector('[id=skip]').addEventListener('click',() => combat.turnOver());

//Variables importantes :
let isInCombat = false;
let combat = null;
let switchCamera1 = false;
let lastEntityCombat = null;
let indexOfLasteEntity = null;
export const loopSpeed = 1;

// Variables globales pour la scène : 

let obstacles = [];
let monsters = [];
monsters.push(SpriteList.testMonster, SpriteList.testMonster2)

// Variable cookies :

export let coins = 0;
let combatWon = 0;
let combatLosed = 0;
let combatDone = 0;
export let charactersUnlocked = [];

function cookieSaveManager() {

}

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight*8/10 );
gameWindow.appendChild( renderer.domElement );

let animationInProgress = false;
const clock = new THREE.Clock

// Caméra :

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const FOV = 90; 
const SCREEN_ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 100;

export const camera = new THREE.PerspectiveCamera(FOV, SCREEN_ASPECT, NEAR, FAR);

const MIN_CAMERA_POSITION = 2;
const DEFAULT_CAMERA_POSITION = camera.position.z = 4;
const MAX_CAMERA_POSITION = 8;

camera.position.x = SpriteList.playerSprite.position.x;
camera.position.y = SpriteList.playerSprite.position.y;

const cameraCombat = new THREE.PerspectiveCamera(FOV, SCREEN_ASPECT, NEAR, FAR)
cameraCombat.position.x = 500
cameraCombat.position.z = 5

scene.add(camera, cameraCombat);
scene.add(SpriteList.playerSprite, SpriteList.testMonster, SpriteList.testMonster2);

// Music de fond du jeu :

const listener = new THREE.AudioListener();
camera.add(listener);

//const audioLoader = new THREE.AudioLoader();

const backgroundMusic = new THREE.Audio(listener);

const tileMap = new TileMap(scene);

function initializeMap() {
    let map = [];
    let terrain = [];

    for (let i = 0; i < tileMap.terrainData.length; i++) {
        for (let j = 0; j < tileMap.terrainData[i].length; j++) {
            const tileType = tileMap.terrainData[i][j];
            const createAsset = new AssetFactory();
            const newSprite = createAsset.createAssetInstance(tileType, i, j);

            scene.add(newSprite);
            terrain.push(newSprite);
        }
    }

    for (let i = 0; i < tileMap.mapData.length; i++) {
        for (let j = 0; j < tileMap.mapData[i].length; j++) {
            const tileType = tileMap.mapData[i][j];
            const createAsset = new AssetFactory();
            const newSprite = createAsset.createAssetInstance(tileType, i, j);

            scene.add(newSprite);
            map.push(newSprite);
        }
    }
    obstacles = [...map];
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

const footstepsGravel = [
    "/assets/sounds/footsteps/sand/gravel-footstep-1_1.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-1_2.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-1_10.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-1_11.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-1_12.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-1_13.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-1_14.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-1_15.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-1_16.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-1_17.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-1_18.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-1_19.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-1_20.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-1_21.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-1_22.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-2_3.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-2_28.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-2_29.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-2_30.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-2_31.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-2_32.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-2_33.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-2_34.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-2_35.wav",
    "/assets/sounds/footsteps/sand/gravel-footstep-2_36.wav",
];

const footstepAudioObjects = [];
let footstepIntervalId;

footstepsGravel.forEach((footstepSound) => {
    const audio = new THREE.Audio(listener);
    audioLoader.load(footstepSound, (buffer) => {
        audio.setBuffer(buffer);
        audio.setLoop(false);
        audio.setVolume(0.8);
        footstepAudioObjects.push(audio);
    });
});

function playRandomFootstepSound() {
    const randomIndex = Math.floor(Math.random() * footstepAudioObjects.length);
    const randomFootstepSound = footstepAudioObjects[randomIndex];

    if (randomFootstepSound) {
        randomFootstepSound.setVolume(0.6);
        randomFootstepSound.play();
    }

    switch(SpriteList.playerSprite.velocity) {
        case SpriteList.playerSprite.velocity.y === 0 && SpriteList.playerSprite.velocity.x === 0:
            randomFootstepSound.stop();
        break;
        case SpriteList.playerSprite.velocity.y > 0 && SpriteList.playerSprite.velocity.x > 0:
            randomFootstepSound.play();
        break;
    }
}


document.addEventListener('keydown', (event) => {
    if (animationInProgress) return;

    switch (event.code) {
        case "KeyA":
            footstepIntervalId = setInterval(playRandomFootstepSound, 350);
            break;
        case "KeyD":
            footstepIntervalId = setInterval(playRandomFootstepSound, 350);
            break;
        case "KeyW":
            footstepIntervalId = setInterval(playRandomFootstepSound, 350);
            break;
        case "KeyS":
            footstepIntervalId = setInterval(playRandomFootstepSound, 350);
            break;
    }
});

document.addEventListener("keyup", (event) => {
    animationInProgress = false;

    switch (event.code) {
        case "KeyA":
            keys.a.pressed = false;
            clearInterval(footstepIntervalId);
            break;
        case "KeyD":
            keys.d.pressed = false;
            clearInterval(footstepIntervalId);
            break;
        case "KeyW":
            keys.w.pressed = false;
            clearInterval(footstepIntervalId);
            break;
        case "KeyS":
            keys.s.pressed = false;
            clearInterval(footstepIntervalId);
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
        case "KeyT":
            console.log(SpriteList.playerSprite.team.teamArray)
            break;
    }
});

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

// backgroundMusic.stop();

// const backgroundCombatMusic = new THREE.Audio(listener);;  
// audioLoader.load('/assets/sounds/combat_music.mp3', function( buffer ) {
//     backgroundCombatMusic.setBuffer( buffer );
//     backgroundCombatMusic.setLoop( true );
//     backgroundCombatMusic.setVolume( 0.15 );
//     backgroundCombatMusic.play()
// });

function animate() {
	requestAnimationFrame( animate );
    if(isInCombat) {
        renderer.render( scene, cameraCombat );
    }
    else {
        renderer.render( scene, camera );
    }

	let deltaTime = clock.getDelta();

	SpriteList.playerSprite.velocity.y = 0;

	if(keys.w.pressed && isInCombat === false) {
        SpriteList.playerSprite.velocity.y = 0.018;
        camera.position.y += 0.018;
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(SpriteList.playerSprite.upSprite, loopSpeed);
            animationInProgress = true;
        }
    }
    else if(keys.s.pressed && isInCombat === false) {
        SpriteList.playerSprite.velocity.y = -0.018;
        camera.position.y -= 0.018;
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(SpriteList.playerSprite.downSprite, loopSpeed);
            animationInProgress = true;
        }
    }

    SpriteList.playerSprite.velocity.x = 0;
    if(keys.d.pressed && isInCombat === false) {
        SpriteList.playerSprite.velocity.x = 0.018;
        camera.position.x += 0.018;
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(SpriteList.playerSprite.rightSprite, loopSpeed);
            animationInProgress = true;
        }
    }
    else if(keys.a.pressed && isInCombat === false) {
        SpriteList.playerSprite.velocity.x = -0.018;
        camera.position.x -= 0.018;
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(SpriteList.playerSprite.leftSprite, loopSpeed);
            animationInProgress = true;
        }
    }
	  collisionDetection(obstacles, SpriteList.playerSprite);
    //Colision for player/monster
    let resultColissionMonster = collisionMonsters(monsters, SpriteList.playerSprite);
    if(resultColissionMonster.collision === true && isInCombat === false) {
        isInCombat = true;
        lastEntityCombat = resultColissionMonster.monster;
        indexOfLasteEntity = monsters.findIndex(monster => monster === lastEntityCombat);
        combat = new Combat(SpriteList.playerSprite.team.teamArray, resultColissionMonster.monster.team.teamArray, scene);
    }
    //debug
    if(isInCombat === true) {
        for(let i = 0; i < combat.actors.length; i++) {
            combat.actors[i].entity.update(deltaTime);
        }
        if(combat.isFinished) {
            combat.hideMenuCleanup();
            combat.removeActors();
            if(combat.hasLost) {                
                isInCombat = false;
                combat = null;
                SpriteList.playerSprite.position.x = 20;
                SpriteList.playerSprite.position.y = 1;
                SpriteList.playerSprite.position.z = 0.008;
            }
            else {
                scene.remove(lastEntityCombat);
                monsters.splice(indexOfLasteEntity, 1);
                isInCombat = false;
                combat = null
            }
        }
    }
	  SpriteList.playerSprite.update(deltaTime);
    SpriteList.testMonster.update(deltaTime);
    SpriteList.testMonster2.update(deltaTime);

    const asset = new AssetFactory();

    asset.updateObstaclesSprites(deltaTime *= 0.6, obstacles);
}
animate();
inventoryManagement();
initializeMap();
onZoom();
