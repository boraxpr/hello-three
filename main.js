import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const cube = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));

scene.add(cube);

camera.position.z = 1;

function detectMouseMovements() {
  let isDragging = false;

  window.addEventListener('mousedown', function (event) {
    isDragging = true;
  });

  window.addEventListener('mousemove', function (event) {
    if (isDragging) {
      cube.rotation.x += event.movementY * 0.00005;
      cube.rotation.y += event.movementX * 0.00005;
    }
  });

  window.addEventListener('mouseup', function (event) {
    isDragging = false;
  });
}

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.001;
  cube.rotation.y += 0.001;

  window.addEventListener('wheel', function (event) {
    console.log(event.deltaY);
    cube.position.z += event.deltaY * 0.000003;
  });

  detectMouseMovements();

  renderer.render(scene, camera);
}

animate();

