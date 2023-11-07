import * as THREE from "three";
import { PlayerSprite } from "./Sprite/PlayerSprite";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as Coll from "./Collision/Collision";
import * as Move from "./Mouvement";
//..
class Box extends THREE.Mesh {
	constructor({
		width,
		height,
		depth,
		hex = "#00ff00",
		velocity = {
			x: 0,
			y: 0,
			z: 0
		},
		position = {
			x: 0,
			y: 0,
			z: 0
		},
		zAcceleration = false
	}) {
		super(
			new THREE.BoxGeometry( width, height, depth ),
			new THREE.MeshBasicMaterial( { color: hex } )
		)

		this.height = height
		this.width = width
		this.depth = depth

		this.position.set(position.x, position.y, position.z)

		this.right = this.position.x + this.width / 2
		this.left = this.position.x - this.width / 2

		this.bottom = this.position.y - this.height/2
		this.top = this.position.y + this.height/2

		this.front = this.position.z + this.depth/2
		this.back = this.position.z - this.depth/2

		this.velocity = velocity
		this.gravity = -0.01

		this.zAcceleration = zAcceleration
	}

	updateSides() {
		this.right = this.position.x + this.width / 2
		this.left = this.position.x - this.width / 2
		//permet de calculer les coords du sol et du cube
		this.bottom = this.position.y - this.height/2
		this.top = this.position.y + this.height/2
		//
		this.front = this.position.z + this.depth/2
		this.back = this.position.z - this.depth/2
	}

	update(plane) {
		this.updateSides()

		this.movementPlayer()
		this.applyGravity(plane)
	}

	applyGravity(plane) {
		//Permet une gravité réaliste
		this.velocity.y += this.gravity

		//Quand le cube touche le sol
		if(boxCollision({
			box1: this,
			box2: plane
		})) {
			this.velocity.y *= 0.8 //friction
			this.velocity.y = -this.velocity.y //Permet le rebondissement
		}
		else {
			this.position.y += this.velocity.y
		}
	}

	movementPlayer() {
		if(this.zAcceleration) {
			this.velocity.z += 0.0005
		}

		this.position.x += this.velocity.x
		this.position.z += this.velocity.z
	}
}
//..

const scene = new THREE.Scene();

const gameWindow = document.getElementById('game-renderer');

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
gameWindow.appendChild( renderer.domElement );

// Cube : (utilisé pour le prototype)

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new Box({
    width: 1,
    height: 1,
    depth: 1,
    position: {
        x: 0,
        y: 0,
        z: 0
    }
}) 

scene.add( cube );

//Test De playerSprite
const map = new THREE.TextureLoader().load("/sprite/TemplateChar.png");
const materialSprite = new THREE.SpriteMaterial({map: map});
const testSprite = new PlayerSprite(materialSprite, 8, 8, map);

//Sprite S
const arrayS = [0, 1, 2, 3, 4, 5]
//sprite Z
const arrayZ = [8, 9, 10, 11, 12, 13]
//sprite D
const arrayD = [16, 17, 18, 19, 20, 21]
//sprite Q
const arrayQ = [24, 25, 26, 27, 28, 29]

scene.add(testSprite);
testSprite.position.y = 2
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

//Permet le controle de la camera avec souris
const controls = new OrbitControls(camera, renderer.domElement);

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

window.addEventListener("keydown", (event)=>{
	switch(event.code) {
		case "KeyA":
			keys.a.pressed = true
			break;
		case "KeyD":
			keys.d.pressed = true
			break;
		case "KeyW":
			keys.w.pressed = true
			break;
		case "KeyS":
			keys.s.pressed = true
			break;
	}
})

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

const obstacle = [cube]

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

	let deltaTime = clock.getDelta()

	testSprite.velocity.y = 0
	if(keys.w.pressed) {
        testSprite.velocity.y = 0.05
        if(!animationInProgress) {
            testSprite.loop(arrayZ, 1.5)
            animationInProgress = true
        }
    }
    else if(keys.s.pressed) {
        testSprite.velocity.y = -0.05
        if(!animationInProgress) {
            testSprite.loop(arrayS, 1.5)   
            animationInProgress = true
        }
    }

    testSprite.velocity.x = 0
    if(keys.d.pressed) {
        testSprite.velocity.x = 0.05
        if(!animationInProgress) {
            testSprite.loop(arrayD, 1.5)
            animationInProgress = true
        }
    }
    else if(keys.a.pressed) {
        testSprite.velocity.x = -0.05
        if(!animationInProgress) {
            testSprite.loop(arrayQ, 1.5)
            animationInProgress = true
        }
    }
	obstacle.forEach((obstacles) => {
		if(Coll.collision(obstacles, testSprite, testSprite.velocity)) {
			if(Coll.collisionFromLeft(obstacles, testSprite, testSprite.velocity)) {
                console.log("Left")
                if(testSprite.velocity.x > 0) {
                    testSprite.velocity.x = 0
                }
            }
            if(Coll.collisionFromRight(obstacles, testSprite, testSprite.velocity)) {
                console.log("Right")
                if(testSprite.velocity.x < 0) {
                    testSprite.velocity.x = 0
                }
            }
            if(Coll.collisionFrombottom(obstacles, testSprite, testSprite.velocity)) {
                console.log("Bottom")
                if(testSprite.velocity.y > 0) {
                    testSprite.velocity.y = 0
                }
            }
            if(Coll.collisionFromtop(obstacles, testSprite, testSprite.velocity)) {
                console.log("Top")
                if (testSprite.velocity.y < 0) {
                    testSprite.velocity.y = 0
                }
            }
		}
	})
	console.log(testSprite.top + " Top")
	console.log(testSprite.bottom + "Bottom")
	testSprite.update(deltaTime)	
}
animate()
onZoom();