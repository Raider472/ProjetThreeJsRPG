import * as THREE from "three";

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const FOV = 90; 
const SCREEN_ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 1000;

camera = new THREE.PerspectiveCamera(FOV, SCREEN_ASPECT, NEAR, FAR);