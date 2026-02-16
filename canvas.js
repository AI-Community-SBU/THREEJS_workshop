import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// --- 2. Setup Scene, Camera, and Renderer ---
const container = document.getElementById('canvas-container');

const width = container.clientWidth;
const height = container.clientHeight;
// console.log(width,height)

const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
container.appendChild(renderer.domElement); // Append to the DIV, not the BODY

// --- 4. Create a Rotating Cube ---
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff88 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Creating the scene
const numElements = 10
//      Creating random Vector3s
function GetRandomVector3(){
    const min = -5
    const max = 5
    return new THREE.Vector3(
        Math.random() * (max - min + 1) + min,
        Math.random() * (max - min + 1) + min,
        Math.random() * (max - min + 1) + min
    )
}

//      Creating random cubes
const angularVelocities = []
const cubes = [];
for (let i = 0; i < numElements; i++){
    const newCube = new THREE.Mesh(geometry, material);
    newCube.position.copy(GetRandomVector3())
    cubes.push(newCube)
    scene.add(newCube)
    
    angularVelocities.push(GetRandomVector3().multiplyScalar(0.001))
}

//      Physics update rule
function PhysicsUpdate(){
    // rotate the cubes
    for(let i = 0; i < numElements; i++){
        cubes[i].rotation.x += angularVelocities[i].x;
        cubes[i].rotation.y += angularVelocities[i].y;
        cubes[i].rotation.z += angularVelocities[i].z;
    }

    // translate the cubes
    for(let i = 0; i < numElements; i++){
        cubes[i].position.y += 0.02
        
    }
}

// --- 5. Add Lighting ---
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 2).normalize();
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040)); // Soft white light

// --- 6. Handle Window Resize ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- 7. Animation Loop ---
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    PhysicsUpdate()

    // controls.update(); // Only required if controls.enableDamping = true
    renderer.render(scene, camera);
}

animate();
console.log("Three.js is running! Version:", THREE.REVISION);