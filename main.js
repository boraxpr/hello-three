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
  window.addEventListener('wheel', function (event) {
    console.log(cube.position.z);
    // Allows the maximum zoom to be 1.27
    // When it reaches 1.27, it will stop zooming in and allow zooming out
    if (cube.position.z < 1.27) {
      cube.position.z += event.deltaY * 0.0000007;
    }
    if (cube.position.z > 1.27) {
      cube.position.z = 1.26;
    }
    // Allows the minimum zoom to be 0.5
    // When it reaches 0.5, it will stop zooming out and allow zooming in
    if (cube.position.z > 0.025) {
      cube.position.z += event.deltaY * 0.0000007;
    }
    if (cube.position.z < 0.025) {
      cube.position.z = 0.02505;
    }
  });
  let isDragging = false;

  window.addEventListener('mousedown', function (event) {
    isDragging = true;
  });

  window.addEventListener('mousemove', function (event) {
    if (isDragging) {
      cube.rotation.x += event.movementY * 0.000005;
      cube.rotation.y += event.movementX * 0.000005;
    }
  });

  window.addEventListener('mouseup', function (event) {
    isDragging = false;
  });
}

function detectMobileMovements() {
  let lastTouchPosition = null;

  document.addEventListener('touchstart', function (event) {
    lastTouchPosition = event.touches[0].clientX;
  });

  document.addEventListener('touchmove', function (event) {
    if (lastTouchPosition !== null) {
      const currentTouchPosition = event.touches[0].clientX;
      const delta = currentTouchPosition - lastTouchPosition;
      // do something with delta
      lastTouchPosition = currentTouchPosition;
    }
  });

  document.addEventListener('touchend', function (event) {
    lastTouchPosition = null;
  });
}


function animate() {
  requestAnimationFrame(animate);

  //if no mouse movement for 1 sec, cube will rotate on its own
  cube.rotation.x += 0.0001;
  cube.rotation.y += 0.0001;

  detectMouseMovements();
  detectMobileMovements();

  renderer.render(scene, camera);
}

animate();

