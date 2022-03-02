import * as PIXI from "pixi.js"
import { gsap } from "gsap";

let tl = gsap.timeline();

let view: Array<PIXI.Graphics> = []
let shapes: Array<any> = []

const main = async () => {
  // Actual app
  let app = new PIXI.Application();

  // Display application properly
  document.body.style.margin = '0';
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';

  // View frame = windows
  app.renderer.resize(window.innerWidth, window.innerHeight);

  // Handle window resizing
  window.addEventListener('resize', (_e) => {
      app.renderer.resize(window.innerWidth, window.innerHeight);
  });

  let span = Math.floor(window.innerWidth / 10);

    for (let i = 0; i < span; ++i) {
        const element = new PIXI.Graphics();
        element.x = 0
        element.y = window.innerHeight
        element.x += 20 * i
    
        view.push(element)
        app.stage.addChild(element)

        shapes[i] = {
            height: 0,
            width: 15
        };
    }

    document.body.appendChild(app.view);

    shapes.forEach((frame, i) => {
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

    tl.repeat(4)
    app.ticker.add(update);
}

function update(delta:number){
    view.forEach((shape, i) => {
        shape.clear()
        shape.beginFill(0xFFDC00)
        shape.drawRoundedRect(0,0,shapes[i].width,shapes[i].height, 0)
    })
} 

main();