// Final Project: Music Visualizer

/* 
Wave motion is controlled by BPM, color can be chnageed using arduino joystick module, and LED light matches wave color & blinks to BPM
*/

/* 
Input the BPM of a song to have a cool visualizer running to elevate the space around you <3
*/

// sound intake
// BPM (Enter manually or detect?)
// manipulating wave frequency
// manipulating color
// connecting Ardunio
// UI
// electron
// spotify API??
// button/joystick adds another ring up until 10, then decreases


export {};

import './style.scss';
import * as THREE from 'three';
// import * as PIXI from "pixi.js"
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ShaderMaterial } from 'three';
import { gsap } from "gsap";

let tl = gsap.timeline();

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let clock = new THREE.Clock();
let bpm;
let points: THREE.Mesh;
let pointAr: Array<any> = []

let lightAmbient: THREE.AmbientLight;
let lightPoint: THREE.PointLight;

let controls: OrbitControls;
let stats: any;
let shaderMat: ShaderMaterial;

let plane: THREE.Mesh;
let plane2: THREE.Mesh;
let plane3: THREE.Mesh;
let plane4: THREE.Mesh;

import vertexShader from '../resources/shaders/shader.vert?raw';
import fragmentShader from '../resources/shaders/shader.frag?raw';

const main = async () => {
    initScene();
    initStats();
    initListeners();
    // pointAr.forEach((frame, bpm) => {
    //     let bpmct
    //     let mid = bpm/2
    //     bpmct = bpm
        
    //     if (i % 2 == 0){
    //         tl       
    //             .to(frame,{
    //                 position: window.innerHeight,
    //                 duration: 3.2
    //             }, 0+i/50)
    //             .to(frame,{
    //                 height: 0,
    //                 duration: 1.5
    //             }, 1.7+i/50)
    //     } else {
    //         tl
    //             .to(frame,{
    //                 height: -window.innerHeight+20,
    //                 duration: 1.5
    //             } , i/19)
    //             .to(frame,{
    //                 height: 0,
    //                 duration: 3
    //             }, 1.7+i/20)
    //     }
    // })
    // tl.repeat(-1)
    // .ticker.add(update);
}

// function update(delta:number){
 
// } 



function bpmInput() {
    var x = document.createElement("INPUT");
    x.setAttribute("type", "number");
    x.setAttribute("value", "12345");
    document.body.appendChild(x);
}

function initStats() { // gives readout of frame rate for debugging, 3js lib
    stats = new (Stats as any)();
    document.body.appendChild(stats.dom);
}

function initScene() {
    // background setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x5D6EAF );

    // camera setup
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 400);
    camera.position.set(0,10,60)

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    // restricting how user can control the stage
    controls = new OrbitControls(camera, renderer.domElement);
    // controls.enablePan = false
    // controls.maxDistance = 15
    // controls.minPolarAngle = 0
    // controls.maxPolarAngle = 1.571
    // controls.minAzimuthAngle = -1
    // controls.maxAzimuthAngle = 1

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

    const pointGeo = new THREE.SphereGeometry(0.2)
    const pointMat = new THREE.MeshNormalMaterial({
        // color: 0xfff00f
    });
    let diam = 1;
    let pointCt = 6
    let angle = 0
    // for (let i = angle; i < 50; i+=Math.PI*2/pointCt) {
    //     points = new THREE.Mesh(pointGeo, pointMat)
    //     points.position.x = diam/2*Math.cos(i)
    //     points.position.z = diam/2*Math.sin(i)
    //     points.position.y = 0
    //     points.castShadow = true
    //     scene.add(points);
    //     diam += 1
    //     // angle += 1.571
    // }

    for (let i = -30; i < 30; ++i) {
        for (let j = -30; j < 30; ++j) {
            points = new THREE.Mesh(pointGeo, pointMat)
            points.position.x = i
            points.position.z = j
            points.position.y = 0
            points.castShadow = true
            pointAr.push(points)
            scene.add(points);
        }
        // var duration  = Math.random() *0.5;
        // var frequency = Math.random() *6;
        // var amplitude = Math.random() *40;

        // tl.to(points, duration, { 
        //     y: -points.position.y, 
        //     repeat: -1, 
        //     yoyo: true 
        // }).progress( / segments * frequency);
    }

    

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
   
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

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