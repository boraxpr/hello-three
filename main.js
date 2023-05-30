import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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
const gltf = await new GLTFLoader().loadAsync('assets/model/donut.glb');
const cube = gltf.scene;
scene.add(cube);



const dirLight = new THREE.DirectionalLight(0xefefff, 1.5);
dirLight.position.set(10, 10, 10);
scene.add(dirLight);

// function detectMouseMovements() {
//   window.addEventListener('wheel', function (event) {
//     console.log(cube.position.z);
//     // Allows the maximum zoom to be 1.27
//     // When it reaches 1.27, it will stop zooming in and allow zooming out
//     if (cube.position.z < 1.27) {
//       cube.position.z += event.deltaY * 0.0000007;
//     }
//     if (cube.position.z > 1.27) {
//       cube.position.z = 1.26;
//     }
//     // Allows the minimum zoom to be 0.5
//     // When it reaches 0.5, it will stop zooming out and allow zooming in
//     if (cube.position.z > 0.025) {
//       cube.position.z += event.deltaY * 0.0000007;
//     }
//     if (cube.position.z < 0.025) {
//       cube.position.z = 0.02505;
//     }
//   });
//   let isDragging = false;

//   window.addEventListener('mousedown', function (event) {
//     isDragging = true;
//   });

//   window.addEventListener('mousemove', function (event) {
//     if (isDragging) {
//       cube.rotation.x += event.movementY * 0.000005;
//       cube.rotation.y += event.movementX * 0.000005;
//     }
//   });

//   window.addEventListener('mouseup', function (event) {
//     isDragging = false;
//   });
// }




function animate() {
  requestAnimationFrame(animate);
  console.log(camera.position);
  //if no mouse movement for 1 sec, cube will rotate on its own
  // cube.rotation.x += 0.001;
  cube.rotation.y += 0.001;

  // detectMouseMovements();

  renderer.render(scene, camera);
}

animate();

