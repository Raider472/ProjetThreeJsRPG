import * as THREE from "three";

const scene = new THREE.Scene();

const gameWindow = document.getElementById('game-renderer');

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
gameWindow.appendChild( renderer.domElement );

// Cube : (utilisé pour le prototype)

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

const mouvementControlsWASD = ['w', 'a', 's', 'd'];
const mouvementControlsZQSD = ['z', 'q', 's', 'd']; // Pour les clavier FR AZERTY

function playerMouvementControls() {
	// Trouver comment obtenir le layout du clavier afin de permettre au joueurs de se déplacer (pour l'instant que en QWERTY)
	document.addEventListener('keydown', (e) => {
		switch(e.key) {
			case mouvementControlsWASD[0]:
				cube.position.y += 0.3
				//camera.position.y += 0.3 déplace la caméra avec le joueur : besoin d'un arrière plan pour l'utiliser
			break;
			case mouvementControlsWASD[1]:
				cube.position.x -= 0.3
				//camera.position.x -= 0.3
			break;
			case mouvementControlsWASD[2]:
				cube.position.y -= 0.3
				//camera.position.y -= 0.3
			break;
			case mouvementControlsWASD[3]:
				cube.position.x += 0.3
				//camera.position.x += 0.3
			break;
		}
	})
}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
playerMouvementControls();
onZoom();