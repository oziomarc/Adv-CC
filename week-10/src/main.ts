// Week 10 Assignment: Interaction

/* 
on mouse/key press create gold coins that are attracted to magnet being controlled by mouse until electricity buttton is turned off
*/

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

let lightAmbient: THREE.AmbientLight;
let lightPoint: THREE.PointLight;

let controls: OrbitControls;
let stats: any;

let b1: THREE.Mesh; // colon vs equal sign
let b2: THREE.Mesh;
let b3: THREE.Mesh;
let b4: THREE.Mesh;
let b5: THREE.Mesh;

let coin: THREE.Mesh;
let magnet; // "Magnet" (https://skfb.ly/6W9ZC) by aidanp is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

let plane: THREE.Mesh;
let exampleModel: THREE.Group;
let exampleTexture: THREE.Texture;

import vertexShader from '../resources/shaders/shader.vert?raw';
import fragmentShader from '../resources/shaders/shader.frag?raw';
let shaderMat: ShaderMaterial;

function main() {
    initScene();
    initStats();
    initListeners();
}

function initStats() { // gives readout of frame rate for debugging, 3js lib
    stats = new (Stats as any)();
    document.body.appendChild(stats.dom);
}

function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    lightAmbient = new THREE.AmbientLight(0xff3c33);
    scene.add(lightAmbient);

    // Add a point light to add shadows
    // https://github.com/mrdoob/three.js/pull/14087#issuecomment-431003830
    const shadowIntensity = 0.25;

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

    // const mapSize = 1024; // Default 512
    // const cameraNear = 0.5; // Default 0.5
    // const cameraFar = 500; // Default 500
    // lightPoint.shadow.mapSize.width = mapSize;
    // lightPoint.shadow.mapSize.height = mapSize;
    // lightPoint.shadow.camera.near = cameraNear;
    // lightPoint.shadow.camera.far = cameraFar;

    // Add a coin

    const coinGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 50)
    const coinMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xFCDB20,
        roughness: 100
    })
    for (let i = 0; i < 25; ++i) {
        coin = new THREE.Mesh(coinGeometry, coinMaterial)
        coin.castShadow = true
        coin.position.y = .05
        coin.position.x = Math.random()*9 - 4.7
        coin.position.z = Math.random()*5 - 2.5
        scene.add(coin);
    }

    // Load magnet

    // SOURCE: https://threejs.org/docs/#manual/en/introduction/Loading-3D-models   
    const loader = new GLTFLoader();
    loader.load( '/resources/models/magnet.gltf', function ( gltf ) {
        scene.add( gltf.scene );
    }, undefined, function ( error ) {
	    console.log('gltf loader error');
    } );
    

    // if magnet x = coin x, coin (x,y) = magnet (x,y)

    // // load a texture
    // var loader = new THREE.TextureLoader();
    // var texture2 = loader.load('/resources/textures/b4.png');
    // var texture3 = loader.load('/resources/textures/b6.jpeg');
    // var texture4 = loader.load('/resources/textures/b5.jpeg');
    // let textureMaterial2 = new THREE.MeshBasicMaterial({ map: texture2 });
    // let textureMaterial3 = new THREE.MeshBasicMaterial({ map: texture3 });
    // let textureMaterial4 = new THREE.MeshBasicMaterial({ map: texture4 });
    // b2.material = textureMaterial2
    // b3.material = textureMaterial3
    // b4.material = textureMaterial4
    // b5.material = textureMaterial2

    // let textureMaterial: THREE.Material;
    // new THREE.TextureLoader().load('/resources/textures/b3.png', function (texture) {

    //     texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    //     texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    //     exampleTexture = texture;

    //     textureMaterial = new THREE.MeshBasicMaterial({ map: texture });
    //     b1.material = textureMaterial;
        

    //     // const loader = new GLTFLoader().setPath('/resources/models/');
    //     // loader.load('exampleModel.gltf', function (gltf) {
    //     //     exampleModel = gltf.scene;

    //     //     interface gltfMesh extends THREE.Object3D<THREE.Event> {
    //     //         material: THREE.Material
    //     //     }

    //     //     console.log(exampleModel);

    //     //     exampleModel.traverse((child: THREE.Object3D<THREE.Event>) => {
    //     //         console.log(child);
    //     //         console.log(child.type === "Mesh");
    //     //         (child as gltfMesh).material = textureMaterial;
    //     //     })

    //     //     scene.add(exampleModel);
    //     // });
    // });



    // // Add a plane
    const geometryPlane = new THREE.PlaneBufferGeometry(10, 5, 10, 10);
    const materialPlane = new THREE.MeshBasicMaterial({ 
        color: 0xCDE4E3
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
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
    });

    plane = new THREE.Mesh(geometryPlane, materialPlane);
    // plane.position.z = -2;
    plane.rotateX(-1.571)
    plane.receiveShadow = true;
    scene.add(plane);

    // Init animation
    animate();
}

function initListeners() {
    window.addEventListener('resize', onWindowResize, false);

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

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(() => {
        animate();
    });

    let delta = clock.getDelta();
    
    shaderMat.uniforms.u_time.value += delta;

    // b1.rotation.x += 0.01;
    // b1.rotation.y += 0.01;

    if (exampleModel != undefined) {
        exampleModel.rotateX(0.01);
        exampleModel.rotateY(0.01);
    }

    if (stats) stats.update();

    // if (controls) controls.update();

    renderer.render(scene, camera);
}

main()