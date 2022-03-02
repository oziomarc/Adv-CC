import * as PIXI from "pixi.js"
import { gsap } from "gsap";

let tl = gsap.timeline();

let graphs: Array<PIXI.Graphics> = []
let sizes: Array<any> = []

const main = async () => {
  // Actual app
  let app = new PIXI.Application();

  // Display application properly
  document.body.style.margin = '0';
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';

  // View size = windows
  app.renderer.resize(window.innerWidth, window.innerHeight);

  // Handle window resizing
  window.addEventListener('resize', (_e) => {
      app.renderer.resize(window.innerWidth, window.innerHeight);
  });

  //WORK GOES HERsE
  let total = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < total; i++) {

        if (i % 2 == 0){

            const element = new PIXI.Graphics();
            element.x = 0
            element.y = window.innerHeight
    
            element.x += 30 * i
    
            graphs.push(element)
            app.stage.addChild(element)


        } else {

            const element = new PIXI.Graphics();
            element.x = 0
            element.y = 0
    
            element.x += 30 * i
    
            graphs.push(element)
            app.stage.addChild(element)

        }

        sizes[i] = {
            height: 0,
            width: 20,
            radius: 20
        };

    }

    document.body.appendChild(app.view);

    sizes.forEach((size, i) => {

        if (i % 2 == 0){

            tl       
                .to(size,{
                    height: -window.innerHeight,
                    duration: 2
                }, 0+i/50)
                .to(size,{
                    height: 0,
                    duration: 2
                }, 0.8+i/50)


        } else {

            tl
                .to(size,{
                    height: window.innerHeight,
                    duration: 2
                } , 0+i/50)
                .to(size,{
                    height: 0,
                    duration: 2
                }, 0.8+i/50)


        }


    })

    tl.repeat(2)

    app.ticker.add(update);
}

function update(delta:number){
    graphs.forEach((graph, i) => {
        graph.clear()
        graph.beginFill(0xffffff)
        graph.drawRoundedRect(0,0,sizes[i].width,sizes[i].height,sizes[i].radius)
    })
} 


main();