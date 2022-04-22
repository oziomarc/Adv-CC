import { Container, Graphics, Point } from "pixi.js";

export class Swish { 
    // need eight
    root: Container = new Container();
    graphics: Graphics = new Graphics();

    fill = 0x8350B3;
    fill2 = 0x59B378;
    fill3 = 0xFFDCA6;

    width = window.innerWidth; // decreases to 0
    height = window.innerHeight/2; // stays the same
    // radius = 15;
    position: Point;

    constructor(x: number, y: number, w: number, h: number) {
        this.position = new Point(x, y)
        this.width = w;
        this.height = h;

        this.graphics.interactive = true;
        // this.graphics.buttonMode = true;
        // this.graphics.on('pointerover', () => {this.isOver = true})
        // this.graphics.on('pointerout', () => {this.isOver = false})
        // this.graphics.on('pointerdown', () => {this.isPressed = true})
        // this.graphics.on('pointerup', () => {this.isPressed = false})

        // this.text = new Text(text ? text : '')
        // this.text.anchor.set(0.5, 0.5)

        this.root.addChild(this.graphics)
        // this.root.addChild(this.text)
    }

    update() {
        this.root.position.set(this.position.x, this.position.y);
        this.graphics.clear()
        this.graphics.beginFill(this.fill);

        this.graphics.drawRect(0, 0, this.width, this.height,)
        // this.text.position.set(this.width / 2, this.height / 2)
    }

    on(eventType: string, callback: EventListener) {
        this.graphics.on(eventType, callback)
    }
}