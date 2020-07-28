import { WritesLogs } from "~Mixins/WritesLogs";
import { BaseScene } from "./BaseScene";
import { LevelOneScene } from "./LevelOneScene";
import { InterfaceScene } from "./InterfaceScene";

@WritesLogs
export class GameScene extends BaseScene {
    static key = 'GameScene'

    constructor() {
        super({ key: GameScene.key })
        this.log('constructed')
    }

    create () {
        super.create()
        this.log('created')
        this.scene.launch(LevelOneScene.key)
        this.scene.launch(InterfaceScene.key)
        this.scene.moveUp(InterfaceScene.key)
    }
}
