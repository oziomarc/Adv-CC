import * as PIXI from "pixi.js"
import { gsap } from "gsap";
import {GlowFilter} from '@pixi/filter-glow';
import * as dat from 'dat.gui';
import { Sprite } from "pixi.js";
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

// let tl = gsap.timeline();

// let view: Array<PIXI.Graphics> = []
// let planets: Array<any> = []

let model = {
    planetData: {
      radius: 90,
      color: 0xffffff,
      speed: 10,
    //   isPressed: false
    }
}

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

    // app.stage.interactive = true;

    

    // RINGS

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

    // PLANETS
    const container = new PIXI.Container();
    const container1 = new PIXI.Container();
    const container2 = new PIXI.Container();
    const container3 = new PIXI.Container();
    const container4 = new PIXI.Container();

    app.stage.addChild(container);
    app.stage.addChild(container, container1, container2, container3, container4);
    const texture = PIXI.Texture.from('./dist/assets/star.png');
    const texture1 = PIXI.Texture.from('./dist/assets/p1.png');
    const texture2 = PIXI.Texture.from('./dist/assets/p2.png');
    const texture3 = PIXI.Texture.from('./dist/assets/p3.png');
    const texture4 = PIXI.Texture.from('./dist/assets/p4.png');

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

    // STARS
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
    let oneisPressed = false
    let twoisPressed = false
    let threeisPressed = false
    let fourisPressed = false
    // SOURCE - https://pixijs.io/examples/#/demos-basic/container.js
    app.ticker.add((delta) => {
        // cause the planets' containers to revolve around the sun
        if(oneisPressed){
            container.rotation += 0.00015 * delta;
            container1.rotation += 0.009 * delta;
            container2.rotation -= 0.009 * delta;
            container3.rotation -= 0.009 * delta;
            container4.rotation -= 0.009 * delta;
        } else if(twoisPressed) {
            container.rotation += 0.00015 * delta;
            container1.rotation -= 0.009 * delta;
            container2.rotation += 0.009 * delta;
            container3.rotation -= 0.009 * delta;
            container4.rotation -= 0.009 * delta;
        } else if(threeisPressed) {
            container.rotation += 0.00015 * delta;
            container1.rotation -= 0.009 * delta;
            container2.rotation -= 0.009 * delta;
            container3.rotation += 0.009 * delta;
            container4.rotation -= 0.009 * delta;
        } else if(fourisPressed) {
            container.rotation += 0.00015 * delta;
            container1.rotation -= 0.009 * delta;
            container2.rotation -= 0.009 * delta;
            container3.rotation -= 0.009 * delta;
            container4.rotation += 0.009 * delta;
        }
         else {
            container.rotation += 0.00015 * delta;
            container1.rotation -= 0.009 * delta;
            container2.rotation -= 0.009 * delta;
            container3.rotation -= 0.009 * delta;
            container4.rotation -= 0.009 * delta;
        }
    });

    p1.interactive = true;
    p1.buttonMode = true;
    p1.on('pointerdown',()=>{ // reverse direction of planet revolution on click
        oneisPressed = true
    })
    p2.interactive = true;
    p2.buttonMode = true;
    p2.on('pointerdown',()=>{ // reverse direction of planet revolution on click
        twoisPressed = true
    })
    p3.interactive = true;
    p3.buttonMode = true;
    p3.on('pointerdown',()=>{ // reverse direction of planet revolution on click
        threeisPressed = true
    })
    p4.interactive = true;
    p4.buttonMode = true;
    p4.on('pointerdown',()=>{ // reverse direction of planet revolution on click
        fourisPressed = true
    })

    // SOLAR SYSTEM

    // SUN
    let sun = new PIXI.Graphics()
    sun.beginFill(0xFFAA00)
    sun.drawCircle(innerWidth/2, innerHeight/2, 100)
    let glowFilter = new GlowFilter({ color: 0xFD6B28, distance: 45 });
    sun.filters = [glowFilter]

    // GUI stuff:
    // app.ticker.add(update)
    // gui.add(model.getInstance().data, 'lineWidth', 0, 10)
    // gui.addColor(model.getInstance().data, 'color')

    // color of sun
    var palette = { // SOURCE - https://github.com/dataarts/dat.gui/blob/HEAD/API.md
        color1: '#FF0000', // CSS string
        color2: [ 0, 128, 255 ], // RGB array
        color3: [ 0, 128, 255, 0.3 ], // RGB with alpha
        color4: { h: 350, s: 0.9, v: 0.3 } // Hue, saturation, value
    };

    let gui = new dat.GUI();
    let folder1 = gui.addFolder('My folder');
    // gui.add(model.planetData, "speed", 10, 100)
    gui.add(sun, 'beginFill')
    gui.addColor(palette, 'color1')

    p2.x = 400;
    p2.y = 200;
    p2.width = 100;
    p2.height = 100;

    p3.x = 300;
    p3.y = 200;
    p3.width = 100;
    p3.height = 100;

    p4.x = 100;
    p4.y = 200;
    p4.width = 100;
    p4.height = 100;
    
    document.body.appendChild(app.view);
    app.stage.addChild(sun);

}
main();
// function update(delta:number) {
//     let tempColor = model.planetData.color
//     tempColor = '0x' + tempColor;
    
//     bg.beginFill(tempColor);
//     bg.drawRect(0,0,window.innerWidth,window.innerHeight);
// } 

function showRings(this: any, ring: any) {
    console.log('Pointer over ring');
    ring.clear
    ring.lineStyle(1, 0x000B38)
}

function reversePlanet() {
    console.log('reverse planet')
    // container1.rotation * -1
}

