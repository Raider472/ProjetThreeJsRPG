import * as THREE from "three";
import { collisionChest, collisionDetection, collisionFinalDoor, collisionFromRight, collisionMonsters } from "./Collision/Collision";
import * as Move from "./Mouvement";
import { TileMap } from "./TileMap/TileMap";
import { SpriteList } from "./Declarations/SpriteDeclaration";
import { Combat } from "./Combat";
import { AssetFactory } from "./TileMap/AssetFactory";
import { Inventory } from "./Item/Inventory";
import { setCookie, getCookie } from "./Cookies";
import { Chest } from "./Sprite/Chest";
import { loadInventory } from "./InventoryDom";
import { SpriteObject } from "./Sprite/SpriteObject";

export const scene = new THREE.Scene();
const gameWindow = document.getElementById('game-renderer');

document.querySelector('[id=attack]').addEventListener('click',() => combat.generateTarget(0));
document.querySelector('[id=crystalAttack]').addEventListener('click',() => combat.generateTarget(1));
document.querySelector('[id=defend]').addEventListener('click',() => combat.defend());
document.querySelector('[id=item]').addEventListener('click',() => combat.generateTargetItems());
document.querySelector('[id=skip]').addEventListener('click',() => combat.turnOver());
document.querySelector('[id=inventoryButton]').addEventListener('click',() => loadInventory(inventory, SpriteList.playerSprite.team.teamArray));

//Variables importantes :
let intervalW = undefined;
let intervalA = undefined;
let intervalS = undefined;
let intervalD = undefined;

let isInCombat = false;
let animationInProgress = false;
let combat = null;
let switchCamera1 = false;
let lastEntityCombat = null;
let indexOfLasteEntity = null;
let isKeyObtained = false;
let inventory = new Inventory();
export const loopSpeed = 1;

// Arrière plan de la scène : 

const loader = new THREE.TextureLoader;
scene.background = loader.load("/assets/game_assets/background_combat_scene/rocky-nowater-demo.jpg");

// Variables globales pour la scène : 

let obstacles = [];
let obstaclesAnim = [];
let chests = [];
let finalGameDoor = [];
let monsters = [];

// Variable cookies :

export let coins = 0;
export let combatWon = 0;
export let combatLost = 0;
export let combatDone = 0;
export let charactersUnlocked = [];
const audioLoader = new THREE.AudioLoader();
const listener = new THREE.AudioListener();


function setCookieForUser() {
  const existingCoins = parseInt(getCookie("coins"));
  const existingCombatWon = parseInt(getCookie("combat_won"));
  console.log(existingCombatWon)
  const existingCombatDone = parseInt(getCookie("combat_done"));
  const existingCombatLost = parseInt(getCookie("combat_lost"));
  const existingCharactersUnlocked = JSON.stringify(getCookie("characters_unlocked")) || [];

  coins = isNaN(existingCoins) ? 0 : existingCoins;
  combatWon = isNaN(existingCombatWon) ? 0 : existingCombatWon;
  combatDone = isNaN(existingCombatDone) ? 0 : existingCombatDone;
  combatLost = isNaN(existingCombatLost) ? 0 : existingCombatLost;
  charactersUnlocked = Array.isArray(existingCharactersUnlocked) ? existingCharactersUnlocked : [];

  if (!existingCoins || !existingCombatWon || !existingCombatDone || !existingCombatLost || !existingCharactersUnlocked.length) {
    setCookie("coins", coins, 1);
    setCookie("combat_won", combatWon, 1);
    setCookie("combat_done", combatDone, 1);
    setCookie("combat_lost", combatLost, 1);
    setCookie("characters_unlocked", JSON.stringify(charactersUnlocked), 1);
  }
}

setCookieForUser();

function cookieUpdateCombatManager(resultOfCombat) {
    combatWon = parseInt(getCookie("combat_won"));
    combatLost = parseInt(getCookie("combat_lost"));
    combatDone = parseInt(getCookie("combat_done"));
    coins = parseInt(getCookie("coins"));

        if (resultOfCombat === true) {
                combatLost++;
                setCookie("combat_lost", combatLost, 1);
                combatDone++;
                setCookie("combat_done", combatDone, 1);
                coins -= 3;
                setCookie("coins", coins, 1);
            } else {
            combatWon++;
            setCookie("combat_won", combatWon, 1);
            combatDone++;
            setCookie("combat_done", combatDone, 1);
            coins += 8;
            setCookie("coins", coins, 1);
        }
}

function keyEndGameManager() {
    const keySound = "/assets/sounds/misc/key-sound.mp3";

    combatDone = parseInt(getCookie("combat_done"));
    combatWon = parseInt(getCookie("combat_won"));

    if (combatDone >= 9 && combatWon >= 9) {
            const audio = new THREE.Audio(listener);
            audioLoader.load(keySound, (buffer) => {
            audio.setBuffer(buffer);
            audio.setLoop(false);
            audio.setVolume(1);
            audio.play()
        });
        isKeyObtained = true;
        console.log("KEY OBTAINED");
    }
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight*8/10 );
gameWindow.appendChild( renderer.domElement );

const clock = new THREE.Clock

// Caméra :

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const FOV = 90; 
const SCREEN_ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 100;

export const camera = new THREE.PerspectiveCamera(FOV, SCREEN_ASPECT, NEAR, FAR);

const MIN_CAMERA_POSITION = 4;
const DEFAULT_CAMERA_POSITION = camera.position.z = 4;
const MAX_CAMERA_POSITION = 6;

camera.position.x = SpriteList.playerSprite.position.x;
camera.position.y = SpriteList.playerSprite.position.y;

const cameraCombat = new THREE.PerspectiveCamera(FOV, SCREEN_ASPECT, NEAR, FAR)
cameraCombat.position.x = 500
cameraCombat.position.z = 5

scene.add(camera, cameraCombat);
scene.add(SpriteList.playerSprite);

// Music de fond du jeu :

camera.add(listener);

//const audioLoader = new THREE.AudioLoader();

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
            const createAsset = new AssetFactory();
            const tileType = tileMap.mapData[i][j];
            if(tileType[0] === "4") {
                let separateString = tileType.split("/");
                createAsset.createMonsters(separateString)
                .then(teams => {
                    // Handle teams here
                    const newSprite = createAsset.createAssetInstance(separateString[0], i, j, teams);
                    return newSprite;
                })
                .then(newSprite => {
                    // Handle the array of fulfilled values (newSprites)
                    scene.add(newSprite);
                    monsters.push(newSprite);
                })
                .catch(error => {
                    // Handle errors here
                    console.error(error);
                });
            }
            else if(tileType[0] === "6") {
                let separateString = tileType.split("/");
                let items = createAsset.createItemsInsideChest(separateString);
                const newSprite = createAsset.createAssetInstance(separateString[0], i, j, items);
                scene.add(newSprite);
                chests.push(newSprite);
                map.push(newSprite);
            } else if (tileType[0] === "5") {
                let separateString = tileType.split("/");
                const newSprite = createAsset.createAssetInstance(separateString[0], i, j);
                scene.add(newSprite);
                finalGameDoor.push(newSprite);
                map.push(newSprite);
            }
            else {
                const newSprite = createAsset.createAssetInstance(tileType, i, j);
                scene.add(newSprite);
                map.push(newSprite);
            }
        }
    }
    for(let i = 0; i < map.length; i++) {
        if(map[i] instanceof SpriteObject && map[i].idle.length != 0) {
            obstaclesAnim.push(map[i]);
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
            clearInterval(intervalA);
            intervalA = setInterval(playRandomFootstepSound, 350);
            break;
        case "KeyD":
            clearInterval(intervalD);
            intervalD = setInterval(playRandomFootstepSound, 350);
            break;
        case "KeyW":
            clearInterval(intervalW);
            intervalW = setInterval(playRandomFootstepSound, 350);
            break;
        case "KeyS":
            clearInterval(intervalS);
            intervalS = setInterval(playRandomFootstepSound, 350);
            break;
    }
});

document.addEventListener("keyup", (event) => {
    animationInProgress = false;

    switch (event.code) {
        case "KeyA":
            keys.a.pressed = false;
            clearInterval(intervalA);
            break;
        case "KeyD":
            keys.d.pressed = false;
            clearInterval(intervalD);
            break;
        case "KeyW":
            keys.w.pressed = false;
            clearInterval(intervalW);
            break;
        case "KeyS":
            keys.s.pressed = false;
            clearInterval(intervalS);
            break;
        case "ShiftLeft":
            keys.shift.pressed = false;
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
            console.log(chests, monsters);
            break;
        case "KeyO":
            console.log(inventory);
            break;
        case "KeyT":
            console.log(SpriteList.playerSprite.team.teamArray)
            break;
    }
});

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
        let velocity = 0.018
        if(keys.shift.pressed) {
            velocity *= 2;
        }
        SpriteList.playerSprite.velocity.y = velocity;
        camera.position.y += velocity;
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(SpriteList.playerSprite.upSprite, loopSpeed);
            animationInProgress = true;
        }
    }
    else if(keys.s.pressed && isInCombat === false) {
        let velocity = -0.018
        if(keys.shift.pressed) {
            velocity *= 2;
        }
        SpriteList.playerSprite.velocity.y = velocity;
        camera.position.y += velocity;
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(SpriteList.playerSprite.downSprite, loopSpeed);
            animationInProgress = true;
        }
    }

    SpriteList.playerSprite.velocity.x = 0;
    if(keys.d.pressed && isInCombat === false) {
        let velocity = 0.018
        if(keys.shift.pressed) {
            velocity *= 2;
        }
        SpriteList.playerSprite.velocity.x = velocity;
        camera.position.x += velocity;
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(SpriteList.playerSprite.rightSprite, loopSpeed);
            animationInProgress = true;
        }
    }
    else if(keys.a.pressed && isInCombat === false) {
        let velocity = -0.018
        if(keys.shift.pressed) {
            velocity *= 2;
        }
        SpriteList.playerSprite.velocity.x = velocity;
        camera.position.x += velocity;
        if(!animationInProgress) {
            SpriteList.playerSprite.loop(SpriteList.playerSprite.leftSprite, loopSpeed);
            animationInProgress = true;
        }
    }
	collisionDetection(obstacles, SpriteList.playerSprite);

    //Colision for player/monster/chests/final door : 

    let resultColissionFinalDoor = collisionFinalDoor(finalGameDoor, SpriteList.playerSprite, isKeyObtained);
    if (resultColissionFinalDoor.collision) {
        if (isKeyObtained === true && isInCombat === false) {
            console.log("Game ended !!");
            return location.href = 'gameEnded.html';
            // TODO : Faire charger une page HTML avec du texte disant que la démo est finie !
        }
    }
    let resultColissionChest = collisionChest(chests, SpriteList.playerSprite)
    if(resultColissionChest.collision) {
        alert("A chest has been opened")
        resultColissionChest.chest.openChest(inventory);
    }
    let resultColissionMonster = collisionMonsters(monsters, SpriteList.playerSprite);
    if(resultColissionMonster.collision === true && isInCombat === false) {
        isInCombat = true;
        lastEntityCombat = resultColissionMonster.monster;
        indexOfLasteEntity = monsters.findIndex(monster => monster === lastEntityCombat);
        combat = new Combat(SpriteList.playerSprite.team.teamArray, resultColissionMonster.monster.team.teamArray, scene, inventory);
    }
    if(isInCombat === true) {
        for(let i = 0; i < combat.actors.length; i++) {
            combat.actors[i].entity.update(deltaTime);
        }
        if(combat.isFinished) {
            let isCombatLost = true;
            combat.hideMenuCleanup();
            combat.removeActors();
            inventory = combat.inventory; //TODO possibly delete          
            if(combat.hasLost) {
                keyEndGameManager();
                cookieUpdateCombatManager(isCombatLost);              
                SpriteList.playerSprite.position.x = 35;
                SpriteList.playerSprite.position.y = 7;
                SpriteList.playerSprite.position.z = 0.008;
            }
            else {
                keyEndGameManager();
                isCombatLost = false;
                cookieUpdateCombatManager(isCombatLost);
                scene.remove(lastEntityCombat);
                monsters.splice(indexOfLasteEntity, 1);
            }
            isInCombat = false;
            combat = null
        }
    }
	SpriteList.playerSprite.update(deltaTime);
    monsters.forEach((monster) =>{
        monster.update(deltaTime);
    });

    const asset = new AssetFactory();

    asset.updateObstaclesSprites(deltaTime *= 0.6, obstacles);
    }

animate();
initializeMap();
onZoom();
