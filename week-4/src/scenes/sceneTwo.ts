// import { Point, Polygon, Sprite } from 'pixi.js'
// import { easeIn, easeOut, lerp } from '../utils/ease';
// import { Model, SceneState } from '../model/model'
// import { SceneOne } from './scenes'

// export class SceneTwo extends SceneOne { // actually scene "two"

//     sprite: Sprite = new Sprite();

//     constructor(model: Model) {
//         super(model)

//         this.swish.on('pointerdown', () => {
//             this.model.sceneState = SceneState.second
//             this.swish.isPressed = false
//             console.log(this.model.sceneState);
//         })
//         this.swish.position.x = 100
//         this.swish.position.y = 100
//     }

//     update(): void {
//         super.update()

//         let tempColor = this.model.buttonData.firstColor.slice(1)
//         tempColor = '0x' + tempColor;

//         this.swish.fill = parseInt(tempColor);
//         this.swish.width = this.model.buttonData.width;
//         this.swish.height = this.model.buttonData.height;
//         this.swish.update()

// 		// this.sprite.y = lerp(this.sprite.y, this.model.mousePos.y, easeOut(0.05))

// 		// this.sprite.x = lerp(this.sprite.x, this.model.mousePos.x, easeOut(0.075))


// 		// this.sprite.x = window.innerWidth/2 + Math.cos(this.model.elapsedTime * 0.05) * 100

// 		// this.sprite.y = window.innerHeight/2 + Math.sin(this.model.elapsedTime * 0.0125) * 100

// 		// this.sprite.scale.set(Math.cos(this.model.elapsedTime * 0.05) * 0.5, Math.sin(this.model.elapsedTime * 0.0125) * 0.5)

// 		// this.sprite.alpha = (Math.cos(this.model.elapsedTime * 0.125) + 1) * 0.5;

//         // this.sprite.x = 
//         //     lerp(this.sprite.x, this.model.mousePos.x, 0.02)

//         // this.sprite.y = 
//         //     lerp(this.sprite.y, this.model.mousePos.y, 0.02)
//     }
// }