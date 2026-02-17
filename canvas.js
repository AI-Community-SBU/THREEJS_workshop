import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// 1.Setup Scene, Camera, and Renderer 
// retrieve the element where the render will be drawn
const container = document.getElementById('canvas-container');
const width = container.clientWidth;
const height = container.clientHeight;

// create the scene. 3D models, lights, and cameras will be used here
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xA9BCD0) // ambient sky coloring

// create a perspective camera
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 6; // move the camera away from the origin (z points out of the screen)

// create a renderer. Acts a layer of abstraction between the THREEJS componen
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
container.appendChild(renderer.domElement); // Append to the DIV, not the BODY




// 2.Creating the scene objects
// creating a 3D objects for our scene. Here, I'm using tetrahedra and cubes
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xFE5F55, shininess:150 });

const tetraGeometry = new THREE.TetrahedronGeometry(0.3)
const tetraMaterial = new THREE.MeshPhongMaterial({ color: 0x7D8CC4, shininess:150 });

const numCubes = 50
const numTetra = 75
// creating random Vector3s so that cubes can have random position and spin
function GetRandomVector3(){
    const min = -5
    const max = 5
    return new THREE.Vector3(
        Math.random() * (max - min + 1) + min,
        Math.random() * (max - min + 1) + min,
        Math.random() * (max - min + 1) + min
    )
}

// instantiating the meshes, and storing their angular velocities (omega)
// cube[i] will get its angular velocity from omegaCubes[i]
const omegaCubes = []
const omegaTetras = []
const cubes = [];
const tetras = [];
for (let i = 0; i < numCubes; i++){
    //creating cubes
    const newCube = new THREE.Mesh(cubeGeometry, cubeMaterial);//creates a new cube with the geometry and material
    newCube.position.copy(GetRandomVector3())
    cubes.push(newCube)
    scene.add(newCube)
    
    omegaCubes.push(GetRandomVector3().multiplyScalar(0.001))
}

for (let i = 0; i < numTetra; i++){
    const newTetra = new THREE.Mesh(tetraGeometry, tetraMaterial);//creates a new tetrahedron with the geometry and material
    newTetra.position.copy(GetRandomVector3())
    tetras.push(newTetra)
    scene.add(newTetra)
    
    omegaTetras.push(GetRandomVector3().multiplyScalar(0.005))
}




// 4. Physics update rule
function PhysicsUpdate(){
    // rotate the cubes
    for(let i = 0; i < numCubes; i++){
        cubes[i].rotation.x += omegaCubes[i].x;
        cubes[i].rotation.y += omegaCubes[i].y;
        cubes[i].rotation.z += omegaCubes[i].z;
    }

    // translate the cubes
    for(let i = 0; i < numCubes; i++){
        cubes[i].position.y += 0.005
        cubes[i].position.y = (cubes[i].position.y + 5) % 10 - 5
    }

    // rotate the tetrahedra
    for(let i = 0; i < numTetra; i++){
        tetras[i].rotation.x += omegaTetras[i].x;
        tetras[i].rotation.y += omegaTetras[i].y;
        tetras[i].rotation.z += omegaTetras[i].z;
    }

    // translate the tetrahedra
    for(let i = 0; i < numTetra; i++){
        tetras[i].position.y += 0.01
        tetras[i].position.y = (tetras[i].position.y + 5) % 10 - 5
    }
}




// 5.Adding Lighting
//add a directional light, coming from behind and our top right
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 2).normalize();
scene.add(light);

//create and add an ambient light, similar to the sun's lighting
const ambientLight = new THREE.AmbientLight(0xCFCFCF)
scene.add(ambientLight); 




//6. Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});




//7. Animation Loop 
function animate() {
    requestAnimationFrame(animate);
    PhysicsUpdate()

    // controls.update(); // Only required if controls.enableDamping = true
    renderer.render(scene, camera);
}

animate();
console.log("Three.js is running! Version:", THREE.REVISION);