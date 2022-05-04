// Week 10 Assignment: Interaction

/* 
on mouse/key press create gold coins that are attracted to magnet being controlled by mouse until electricity buttton is turned off
*/
export {};

import './style.scss';
import * as THREE from 'three'; 1
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { ShaderMaterial } from 'three';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let clock = new THREE.Clock();
let pointer, raycaster;
let TOUCH;

let lightAmbient: THREE.AmbientLight;
let lightPoint: THREE.PointLight;

let controls: OrbitControls;
// let stats: any;

// let coin: THREE.Mesh;
// let magnet; // "Magnet" (https://skfb.ly/6W9ZC) by aidanp is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

// let plane: THREE.Mesh;
// let plane2: THREE.Mesh;
// let plane3: THREE.Mesh;
// let plane4: THREE.Mesh;

// import vertexShader from '../resources/shaders/shader.vert?raw';
// import fragmentShader from '../resources/shaders/shader.frag?raw';
let shaderMat: ShaderMaterial;

function main() {
    initScene();
    // initStats();
    initListeners();
}

// function initStats() { // gives readout of frame rate for debugging, 3js lib
//     stats = new (Stats as any)();
//     document.body.appendChild(stats.dom);
// }

function initScene() {
    // background setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x5D6EAF );

    // camera setup
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0,2,8)

    pointer = new THREE.Vector2();
    // SOURCE: https://github.com/mrdoob/three.js/blob/master/examples/webgl_interactive_cubes.html
    raycaster = new THREE.Raycaster();

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    // restricting how user can control the stage
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false
    controls.maxDistance = 15
    controls.minPolarAngle = 0
    controls.maxPolarAngle = 1.571
    controls.minAzimuthAngle = -1
    controls.maxAzimuthAngle = 1

    // light stuff
    lightAmbient = new THREE.AmbientLight(0xff3c33);
    scene.add(lightAmbient);

    // https://github.com/mrdoob/three.js/pull/14087#issuecomment-431003830
    const shadowIntensity = 0.55;

    lightPoint = new THREE.PointLight(0xffffff);
    lightPoint.position.set(-0.5, 0.5, 4);
    lightPoint.castShadow = true;
    lightPoint.intensity = shadowIntensity;
    scene.add(lightPoint);

    const lightPoint2 = lightPoint.clone();
    lightPoint2.intensity = 1 - shadowIntensity;
    lightPoint2.castShadow = false;
    scene.add(lightPoint2);

    const lightPoint3 = new THREE.PointLight(0xffffff);
    lightPoint3.position.set(0, 10, 0);
    lightPoint3.castShadow = true;
    lightPoint3.intensity = shadowIntensity;
    scene.add(lightPoint3);

    // coins
    // const coinGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 50)
    // const coinMaterial = new THREE.MeshPhysicalMaterial({
    //     color: 0xFCDB20,
    //     roughness: 100
    // })
    // for (let i = 0; i < 25; ++i) {
    //     coin = new THREE.Mesh(coinGeometry, coinMaterial)
    //     coin.castShadow = true
    //     coin.position.y = -0.9
    //     coin.position.x = Math.random()*9 - 4.7
    //     coin.position.z = Math.random()*5 - 2.5
    //     scene.add(coin);
    // }

    // Add a plane
    const geometryPlane = new THREE.PlaneBufferGeometry(10, 5, 10, 10);
    const geometryPlane2 = new THREE.PlaneBufferGeometry(5, 5, 10, 10);
    const materialPlane = new THREE.MeshNormalMaterial({ 
        // color: 0xCDE4E3
        // side: THREE.DoubleSide 
    });
    
    // what are uniforms?
    const uniforms = { 
        u_time: { type: 'f', value: 1.0 },
        u_resolution: { type: 'v2', value: new THREE.Vector2(800,800) },
        u_mouse: { type: 'v2', value: new THREE.Vector2() },
    };

    shaderMat = new THREE.ShaderMaterial({
        uniforms: uniforms,
        // vertexShader: vertexShader,
        // fragmentShader: fragmentShader,
    });

    // plane = new THREE.Mesh(geometryPlane, materialPlane);
    // // plane.position.z = -2;
    // plane.rotateX(-1.571);
    // plane.receiveShadow = true;
    // plane.position.y = -1

    // plane2 = new THREE.Mesh(geometryPlane, materialPlane);
    // plane2.rotateX(0)
    // plane2.receiveShadow = true;
    // plane2.position.y = 1.5
    // plane2.position.z = -2.5

    // plane3 = new THREE.Mesh(geometryPlane2, materialPlane);
    // // plane3.rotateX(0)
    // plane3.rotateY(1.571)
    // plane3.receiveShadow = true;
    // plane3.position.x = -5
    // plane3.position.y = 1.5

    // plane4 = new THREE.Mesh(geometryPlane2, materialPlane);
    // // plane3.rotateX(0)
    // plane4.rotateY(-1.571)
    // plane4.receiveShadow = true;
    // plane4.position.x = 5
    // plane4.position.y = 1.5


    // scene.add(plane, plane2, plane3, plane4);

    animate();
}

// function onPointerMove( event ) {
// 	// calculate pointer position in normalized device coordinates
// 	// (-1 to +1) for both components
// 	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
// 	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

// }


function initListeners() {
    window.addEventListener('resize', onWindowResize, false);
    // window.addEventListener( 'pointermove', onPointerMove );

    window.addEventListener('keydown', (event) => {
        const { key } = event;

        switch (key) {
            case 'e':
                const win = window.open('', 'Canvas Image');

                const { domElement } = renderer;

                // Makse sure scene is rendered.
                renderer.render(scene, camera);

                const src = domElement.toDataURL();

                if (!win) return;

                win.document.write(`<img src='${src}' width='${domElement.width}' height='${domElement.height}'>`);
                break;

            default:
                break;
        }
    });
}

function onClick() {
    // magnet.position.x = mouseX
    // magnet.position.y = mouseY

    // if (coin.position.x == mouseX):
    //     coin.position.y = 4
    //     coin.position.x = mouseX

    // on onClick, drop all connected coins
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// function moveMagnet() {
//     raycaster.setFromCamera(pointer, camera);
//     const intersects = raycaster.intersectObjects(scene.children, false);
//     for (let i = 0; i < intersects.length; i++) {
//         // intersects[i].object.material.transparent = false
//         intersects[i].object.position.x = pointer.x //?
//     }
//  }
function animate() { // how can you call a function inside itself?
    requestAnimationFrame(() => {
        animate();
    });

    let delta = clock.getDelta();
    
    shaderMat.uniforms.u_time.value += delta;

    // b1.rotation.x += 0.01;
    // b1.rotation.y += 0.01;

    // if (exampleModel != undefined) {
    //     exampleModel.rotateX(0.01);
    //     exampleModel.rotateY(0.01);
    // }

    // if (stats) stats.update();

    // if (controls) controls.update();

    renderer.render(scene, camera);
}

main()