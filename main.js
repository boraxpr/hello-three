import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import donut from './assets/model/donut.glb';
// Allocate space for the scene
const renderer = new THREE.WebGLRenderer();
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the scene and the camera
const scene = new THREE.Scene();

// Set a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

// Add an OrbitControls object to the scene to allow for camera control
const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(0.13, 0.27, 0.32);
orbit.update();
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

// Vite supports top-level await
const gltf = await new GLTFLoader().loadAsync(donut);
const cube = gltf.scene;
scene.add(cube);



const dirLight = new THREE.DirectionalLight(0xefefff, 1.5);
dirLight.position.set(10, 10, 10);
scene.add(dirLight);

// Add an arrow helper to visualize the directional light
// const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 5);
// scene.add(dirLightHelper);

function animate() {
  requestAnimationFrame(animate);
  // console.log(camera.position);
  //if no mouse movement for 1 sec, cube will rotate on its own
  // cube.rotation.x += 0.001;
  cube.rotation.y += 0.001;

  renderer.render(scene, camera);
}

animate();

