import { Container, Graphics } from "pixi.js";
import { Swish } from "../components/swish";
import { Model } from "../model/model";

export class SceneOne {
    model: Model;
    container: Container;
    swish: Swish;

    constructor(model: Model) {
        this.model = model;

        this.container = new Container();
        this.container.sortableChildren = true;
        this.container.width = window.innerWidth
        this.container.height = window.innerHeight

        this.swish = new Swish(0,0,200,100);
        this.swish.root.zIndex = 100;
        this.container.addChild(this.swish.root)
    }

    update() { }
}