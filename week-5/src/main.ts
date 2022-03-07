import * as PIXI from "pixi.js"
import { gsap } from "gsap";
import {GlowFilter} from '@pixi/filter-glow';
import * as dat from 'dat.gui';
// import {Container} from 'pixi.js';

const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader
        .add('world1', 'assets/hello-world.png')
        .add('star', './dist/assets/star.png')
        .load(() => {
            resolve();
        });
    });
};

let tl = gsap.timeline();

let view: Array<PIXI.Graphics> = []
let planets: Array<any> = []

let model = {
    planetData: {
      radius: 90,
      color: 0xffffff,
      speed: 10,
      isPressed: false
    }
}
// PLANETS

const main = async () => {
    // Actual app
    let app = new PIXI.Application();

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';
    app.renderer.backgroundColor = 0x000B38;

    // View frame = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);

    await load(app);

    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });

    app.stage.interactive = true;

    // RINGS
        //--> does each planet need it's own delta/update function so they go at different speeds?

    let ringData = {
        isOver: false,
        color: 0xffffff
    }
            
    let rad = 1000
    for (let i = 200; i < rad; i += 160) { 
        let ring = new PIXI.Graphics()
        ring.interactive = true;
        ring.buttonMode = true;
        ring.lineStyle(1, 0xffffff)
        ring.drawCircle(innerWidth/2, innerHeight/2, i) // 200, 360, 520, 680
        ring.on("pointerover", showRings)
        app.stage.addChild(ring)
    }

    // make a container of stars that rotates
    const container = new PIXI.Container();
    const container1 = new PIXI.Container();
    const container2 = new PIXI.Container();
    const container3 = new PIXI.Container();
    const container4 = new PIXI.Container();

    app.stage.addChild(container);
    app.stage.addChild(container, container1, container2, container3, container4);
    const texture = PIXI.Texture.from('./assets/star.png');
    const texture1 = PIXI.Texture.from('./assets/p1.png');
    const texture2 = PIXI.Texture.from('./assets/p2.png');
    const texture3 = PIXI.Texture.from('./assets/p3.png');
    const texture4 = PIXI.Texture.from('./assets/p4.png');

    const p1 = new PIXI.Sprite(texture1);
    const p2 = new PIXI.Sprite(texture2);
    const p3 = new PIXI.Sprite(texture3);
    const p4 = new PIXI.Sprite(texture4);

    p1.scale.set(0.08)
    p1.anchor.set(0.5);
    p1.x = 500;
    p1.y = 150;
    container1.addChild(p1);
    container1.x = app.screen.width / 2;
    container1.y = app.screen.height / 2;
    container1.pivot.x = container1.width / 2;
    container1.pivot.y = container1.height / 2;

    p2.scale.set(0.07)
    // p2.anchor.set(0.5);
    p2.x = 500;
    p2.y = 150;
    container2.addChild(p2);
    container2.x = app.screen.width / 2;
    container2.y = app.screen.height / 2;
    container2.pivot.x = container2.width / 2 + 190;
    container2.pivot.y = container2.height / 2;

    p3.scale.set(30)
    // p3.anchor.set(0.5);
    p3.x = 500;
    p3.y = 150;
    container3.addChild(p3);
    container3.x = app.screen.width / 2;
    container3.y = app.screen.height / 2;
    container3.pivot.x = (container3.width / 2) + 970;
    container3.pivot.y = container3.height / 2;

    p4.scale.set(0.1)
    // p3.anchor.set(0.5);
    p4.x = 500;
    p4.y = 150;
    container4.addChild(p4);
    container4.x = app.screen.width / 2;
    container4.y = app.screen.height / 2;
    container4.pivot.x = container4.width / 2;
    container4.pivot.y = container4.height / 2 + 120;

    for (let i = 0; i < 80; i++) {
        const star = new PIXI.Sprite(texture);
        star.scale.set(0.02)
        star.anchor.set(0.5);
        star.x = Math.floor(Math.random()*window.innerWidth)
        star.y = Math.floor(Math.random()*window.innerHeight)
        container.addChild(star);
        console.log('drawing stars...')
    }
    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;
    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;
    
    // SOURCE - https://pixijs.io/examples/#/demos-basic/container.js
    app.ticker.add((delta) => {
        // rotate the container!
        // use delta to create frame-independent transform
        container.rotation += 0.00015 * delta;
        container1.rotation -= 0.009 * delta;
        container2.rotation -= 0.009 * delta;
        container3.rotation -= 0.009 * delta;
        container4.rotation -= 0.009 * delta;
    });

    // SOLAR SYSTEM

    // SUN
    let sun = new PIXI.Graphics()
    sun.beginFill(0xFFAA00)
    sun.drawCircle(innerWidth/2, innerHeight/2, 100)
    let glowFilter = new GlowFilter({ color: 0xFD6B28, distance: 45 });
    sun.filters = [glowFilter]

    


    // p1.on click -> update color with gui value...
    p1.interactive = true;
    p1.buttonMode = true;
    p2.interactive = true;
    p2.buttonMode = true;
    p3.interactive = true;
    p3.buttonMode = true;
    p4.interactive = true;
    p4.buttonMode = true;

    p1.on('pointerdown', reversePlanet)
    

    
    // p1.width = 100;
    // p1.height = 100;
    
    

    

    // app.ticker.add((delta) => { 
    //     // rotate planet 1 ???
    //     // container1.rotation -= 0.002 * delta;
    // });

    

    p1.on('pointerdown', () => {model.planetData.isPressed = true})
    p1.on('pointerup', () => {model.planetData.isPressed = false})

    p2.x = 400;
    p2.y = 200;
    p2.width = 100;
    p2.height = 100;
    
    // p2.beginFill(0xffffff)
    // p2.drawCircle(p2.x, p2.y, 60)

    p3.x = 300;
    p3.y = 200;
    p3.width = 100;
    p3.height = 100;
    
    // p3.beginFill(0xffffff)
    // p3.drawCircle(p3.x, p3.y, 70)

    p4.x = 100;
    p4.y = 200;
    p4.width = 100;
    p4.height = 100;
    
    // p4.beginFill(0xffffff)
    // p4.drawCircle(p4.x, p4.y, 90)


    // for (let i = 0; i < span; ++i) {
    //     const element = new PIXI.Graphics();
    //     element.x = 0
    //     element.y = window.innerHeight
    //     element.x += 20 * i
    
    //     view.push(element)
    //     app.stage.addChild(element)

    //     planets[i] = {
    //         height: 0,
    //         width: 15
    //     };
    // }

    document.body.appendChild(app.view);
    app.stage.addChild(sun);
    app.stage.addChild()
    

 
    // GUI stuff:
  
    // change size of planets
    const gui = new dat.GUI();
    gui.add(model.planetData, "radius", 50, 100);

    // change color of planets
    var palette = { // SOURCE - https://github.com/dataarts/dat.gui/blob/HEAD/API.md
        color1: '#FF0000', // CSS string
        color2: [ 0, 128, 255 ], // RGB array
        color3: [ 0, 128, 255, 0.3 ], // RGB with alpha
        color4: { h: 350, s: 0.9, v: 0.3 } // Hue, saturation, value
    };

    gui.add(model.planetData, "speed", 10, 100)
    gui.addColor(palette, 'color1');

    // p1.beginFill()
    // p1.drawCircle(p1.x, p1.y, 50)

    // change comet path
    // change comet speed

    // mouse interactions
    
    // app.stage.on("pointerover", showRings);
    // window.addEventListener("pointerdown", drawArt);
    // app.ticker.add(gameLoop1);
    

    planets.forEach((frame, i) => { // move planets
        if (i % 2 == 0){
            tl       
                .to(frame,{
                    height: window.innerHeight,
                    duration: 3.2
                }, 0+i/50)
                .to(frame,{
                    height: 0,
                    duration: 1.5
                }, 1.7+i/50)
        } else {
            tl
                .to(frame,{
                    height: -window.innerHeight+20,
                    duration: 1.5
                } , i/19)
                .to(frame,{
                    height: 0,
                    duration: 3
                }, 1.7+i/20)
        }
    })

    tl.repeat(4) // make infinite
    app.ticker.add(update);
}

function update(){
    
} 

function showRings(this: any, ring: any) {
    console.log('Pointer over ring');
    this.isover = true
    ring.clear
    ring.lineStyle(1, 0x000B38)
}

function reversePlanet() {
    // container1.rotation * -1
}

// function changeColor() {
//     button.clear()
//     if (planetData.isPressed) {
//         planet.beginFill(0xffff00)
//     } else if (buttonData.isOver) {
//         button.beginFill(0xff00ff)
//     } else {
//         button.beginFill(0x0000ff)
//     }
//     button.drawRoundedRect(100, 100, buttonData.width, buttonData.height, 15)
// }

main();