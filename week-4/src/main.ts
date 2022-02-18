import * as PIXI from "pixi.js"

const main = async () => {
    let app = new PIXI.Application();

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';
    app.renderer.backgroundColor = 0xE9FFC2;

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);

    const path = new PIXI.Graphics();
    path.lineStyle(1, 0xababab, 1)

    let radius = 1
    let fib = 0
    let temp

    let angle = 0
    let scale = 2

    let fillArray = [0x9CB376, 0xDBE6FF, 0xFFB7A8, 0xB3887F]

    for (let i = 0; i < innerHeight; i += radius) {
        for (let j = 0; j < innerWidth; j += radius) {
            path.drawCircle(innerWidth/2 + Math.cos(angle)*scale, innerHeight/2 + Math.sin(angle)*scale, radius*2)
            angle += 0.2
            scale += radius/13
        }
        let color = fillArray[Math.floor(Math.random()*fillArray.length)]
        path.beginFill(color, 0.7)

        temp = radius
        radius += fib // fibonacci incrementation
        fib = temp 
    }
    
    app.stage.addChild(path);

    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });

    document.body.appendChild(app.view);
};

main();

