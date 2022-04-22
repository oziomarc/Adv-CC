import { Point } from "pixi.js";

export class Model {
    private static instance: Model

    swishData: any = {
        // width: 200,
        // height: 100,
        firstColor: '#8350B3',
        secondColor: '#59B378',
        thirdColor: '#FFDCA6'
    };

    // mousePos: Point = new Point(window.innerWidth, 0);

    elapsedTime: number = 0;
    sceneState: SceneState = SceneState.first;

    constructor() {
        if (Model.instance) {
            return Model.instance;
        }
        Model.instance = this;
    }

    getInstance(): Model{
        return Model.instance
    }
}

export enum SceneState{
    first = 'scene one',
    second = 'scene two',
    third = 'scene three'
}

// interface swishData {
//     width: number,
//     height: number,
//     firstColor: string,
//     secondColor: string,
// }