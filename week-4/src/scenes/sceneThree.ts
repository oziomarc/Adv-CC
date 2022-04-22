// import { Model, SceneState } from '../model/model'
// import { SceneOne } from './scenes'

// export class SceneThree extends SceneOne {

//     constructor(model: Model) {
//         super(model)

//         this.swish.on('pointerdown', () => {
//             this.model.sceneState = SceneState.first
//             this.swish.isPressed = false
//             console.log(this.model.sceneState);
//         })
//         this.swish.position.x = 100
//         this.swish.position.y = 200
//     }

//     update(): void {
//         super.update()

//         let tempColor = this.model.buttonData.secondColor.slice(1)
//         tempColor = '0x' + tempColor;

//         this.swish.fill = parseInt(tempColor);
//         this.swish.width = this.model.buttonData.width;
//         this.swish.height = this.model.buttonData.height;
//         this.swish.update()
//     }
// }