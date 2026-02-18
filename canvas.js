import * as THREE from 'three';
import { ParameterizedCurve } from './animation/curve.js';


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

// create a renderer. Acts a layer of abstraction between the THREEJS component
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
container.appendChild(renderer.domElement); // creates the rendering on the attached component

//1.5 Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});




// // 2.Creating the scene objects
// // creating a 3D objects for our scene. Here, I'm using tetrahedra and cubes
// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xFE5F55, shininess:150 });

// const tetraGeometry = new THREE.TetrahedronGeometry(0.3)
// const tetraMaterial = new THREE.MeshPhongMaterial({ color: 0x7D8CC4, shininess:150 });

// const numCubes = 150
// const numTetra = 200

// // create a random 3D vector for positions and rotational axes
// function GetRandomVector3(xmin, xmax, ymin, ymax, zmin, zmax){
//     return new THREE.Vector3(
//         Math.random() * (xmax - xmin + 1) + xmin,
//         Math.random() * (ymax - ymin + 1) + ymin,
//         Math.random() * (zmax - zmin + 1) + zmin
//     )
// }

// // instantiating the meshes, and storing their axes of rotation
// // cube[i] will get its rotational axis from axesCubes[i]
// const axesCubes = []
// const axesTetras = []
// const cubes = [];
// const tetras = [];

// // create bounds for the random positions that the objects can start from
// const zmin = -6;
// const zmax = 4
// const xymin = -15 //x and y share the same bounds
// const xymax = 15

// for (let i = 0; i < numCubes; i++){
//     //creating cubes
//     const newCube = new THREE.Mesh(cubeGeometry, cubeMaterial);//creates a new cube with the geometry and material
//     newCube.position.copy(GetRandomVector3(xymin,xymax,xymin,xymax,zmin,zmax))
//     cubes.push(newCube)
//     scene.add(newCube)
    
//     //create a random axis for the cubes to rotate around
//     axesCubes.push(GetRandomVector3(-1,1,-1,1,-1,1).normalize())
// }

// for (let i = 0; i < numTetra; i++){
//     const newTetra = new THREE.Mesh(tetraGeometry, tetraMaterial);//creates a new tetrahedron with the geometry and material
//     newTetra.position.copy(GetRandomVector3(xymin,xymax,xymin,xymax,zmin,zmax))
//     tetras.push(newTetra)
//     scene.add(newTetra)

//     //create a random axis for the tetrahedra to rotate around
//     axesTetras.push(GetRandomVector3(-1,1,-1,1,-1,1).normalize())
// }

// 2.5 Adding Lighting
//add a directional light, coming from behind and our top right
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 2).normalize();
scene.add(light);

//create and add an ambient light, similar to the sun's lighting
const ambientLight = new THREE.AmbientLight(0xCFCFCF)
scene.add(ambientLight); 



// exp
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xFE5F55, shininess:150 });

const numCubes = 150
const axesCubes = [];
const cubes = [];

// create a random 3D vector for positions and rotational axes
function GetRandomVector3(xmin, xmax, ymin, ymax, zmin, zmax){
    return new THREE.Vector3(
        Math.random() * (xmax - xmin + 1) + xmin,
        Math.random() * (ymax - ymin + 1) + ymin,
        Math.random() * (zmax - zmin + 1) + zmin
    )
}

const spiralFunc = (t)=>{
    const r = 2
    const k = 2
    return new THREE.Vector3(r * Math.cos(t), r * Math.sin(t), k * t)
}

// const curve = new ParameterizedCurve((t)=>{return t})
const curve = new ParameterizedCurve(spiralFunc)
// curve.sample()
for(let i = 0; i < numCubes; i++){
    // const pos = curve.sample(i)
    const pos = curve.sample(i)
    const newCube = new THREE.Mesh(cubeGeometry, cubeMaterial);//creates a new cube with the geometry and material
    newCube.position.copy(curve.sample(t))
    cubes.push(newCube)
    scene.add(newCube)
}



// // 3. Physics update rule
// function PhysicsUpdate(){
//     //Cube updates
//     // rotate the cubes
//     for(let i = 0; i < numCubes; i++){
//         cubes[i].rotateOnWorldAxis(axesCubes[i], 0.02)
//     }

//     // translate the cubes
//     for(let i = 0; i < numCubes; i++){
//         cubes[i].position.y += 0.008
//         cubes[i].position.y = ((cubes[i].position.y - xymin) % (xymax-xymin)) + xymin
//     }
//     console.log(cubes[0].position.y)



//     //Tetrahedron updates
//     // rotate the tetrahedra
//     for(let i = 0; i < numTetra; i++){
//         tetras[i].rotateOnWorldAxis(axesTetras[i], 0.04)
//     }

//     // translate the tetrahedra
//     for(let i = 0; i < numTetra; i++){
//         tetras[i].position.y += 0.012
//         tetras[i].position.y = ((tetras[i].position.y - xymin) % (xymax-xymin)) + xymin
//     }
// }




//4. Animation Loop 
function animate() {
    requestAnimationFrame(animate);
    // PhysicsUpdate()
    renderer.render(scene, camera);
}
animate();

console.log("Three.js is running!");