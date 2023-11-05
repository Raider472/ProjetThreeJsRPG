import * as THREE from "three";
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

// Cube :

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);

scene.add( cube );

// Camera :

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const FOV = 75; 
const SCREEN_ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 1000;
const MIN_CAMERA_RADIUS = 2;
const MAX_CAMERA_RADIUS = 150;
const camera = new THREE.PerspectiveCamera(FOV, SCREEN_ASPECT, NEAR, FAR);

// Listener de la molette de la souris pour le zoom de la caméra

const SCROLL_MOUSE_UP = 0;
const SCROLL_MOUSE_DOWN = 1;
let isScrollUp = false;
let isScrollDown = false;


let cameraOrigin = new THREE.Vector2();
let cameraRadius = camera.position.z;



scene.add(camera);

// Gestion du zoom avec la molette de la souris
document.addEventListener('wheel', onZoom);

function onZoom(event) {
	const zoomSpeed = 0.01;
  
	camera.position.z -= event.deltaY * zoomSpeed;
	camera.position.z = Math.min(MAX_CAMERA_RADIUS, Math.max(MIN_CAMERA_RADIUS, camera.position.z));
	camera.updateProjectionMatrix();
  }

// Fin camera

const gameWindow = document.getElementById('game-renderer');

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
gameWindow.appendChild( renderer.domElement );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

// Player mouvment controls :

const movementControlsWASD = ['w', 'a', 's', 'd'];
const mouvementControlsZQSD = ['z', 'q', 's', 'd'];

function playerMouvementControls() {
	// Trouver comment obtenir le layout du clavier afin de permettre au joueurs de se déplacer (pour l'instant que en QWERTY)
	document.addEventListener('keydown', (e) => {
		switch(e.key) {
			case movementControlsWASD[0]:
				cube.position.y += 0.3
				//camera.position.y += 0.3 déplace la caméra avec le joueur : besoin d'un arrière plan pour le tester
			break;
			case movementControlsWASD[1]:
				cube.position.x -= 0.3
				//camera.position.x -= 0.3
			break;
			case movementControlsWASD[2]:
				cube.position.y -= 0.3
				//camera.position.y -= 0.3
			break;
			case movementControlsWASD[3]:
				cube.position.x += 0.3
				//camera.position.x += 0.3
			break;
		}
	})

	document.addEventListener('keyup', (e) => {

	})
}

playerMouvementControls();
onZoom();