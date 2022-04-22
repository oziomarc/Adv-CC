import * as PIXI from "pixi.js"
import { gsap } from "gsap";
import {GlowFilter} from '@pixi/filter-glow';
import {Container} from 'pixi.js';

const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader.add('world1', 'assets/hello-world.png').load(() => {
            resolve();
        });
    });
};

let tl = gsap.timeline();

let view: Array<PIXI.Graphics> = []
let planets: Array<any> = []

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

    // make a container of stars that rotates/vibrates
    const container = new PIXI.Container();
    app.stage.addChild(container);
    const texture = PIXI.Texture.from('./dist/assets/star.png');

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
    
    // SOURCE https://pixijs.io/examples/#/demos-basic/container.js
    app.ticker.add((delta) => {
        // rotate the container!
        // use delta to create frame-independent transform
        container.rotation -= 0.00015 * delta;
    });

    // solar system

    let sun = new PIXI.Graphics()
    sun.beginFill(0xFFAA00)
    sun.drawCircle(innerWidth/2, innerHeight/2, 100)

    let glowFilter = new GlowFilter({ color: 0xFD6B28, distance: 45 }); // SOURCE: https://www.html5gamedevs.com/topic/42614-how-to-make-a-glow-color-fade-with-pixifiltersglowfilter/
    sun.filters = [glowFilter]

    // Planet Paths:
        //--> does each planet need it's own delta/update function so they go at different speeds?
        // make rings only show on mouse hover
    let rad = 1000
    for (let i = 200; i < rad; i += 160) { 
        let ring = new PIXI.Graphics()
        ring.lineStyle(1, 0xffffff)
        ring.drawCircle(innerWidth/2, innerHeight/2, i) // 200, 360, 520, 680
        app.stage.addChild(ring)
    }

    // Planet 1
    const container1 = new PIXI.Container();
    app.stage.addChild(container1);
    const planet1 = new PIXI.Graphics();
    planet1.x = Math.floor(Math.random()*window.innerWidth)
    planet1.y = Math.floor(Math.random()*window.innerHeight)
    container1.addChild(planet1);
    console.log('drawing planet1')
    container1.x = app.screen.width / 2;
    container1.y = app.screen.height / 2;
    
    container1.pivot.x = container.width / 2;
    container1.pivot.y = container.height / 2;

    app.ticker.add((delta) => {
        container1.rotation -= 0.00015 * delta;
    });


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

    // GUI stuff:
    // change speed of planet
    // change color of planet
    // change size of planet
    // change color of stars
    // change color of sun
    // change comet path
    // change comet speed
    

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
    view.forEach((shape, i) => {
        shape.clear()
        shape.beginFill(0xFFDC00)
        shape.drawRoundedRect(0,0,planets[i].width,planets[i].height, 30)
    })
} 

main();