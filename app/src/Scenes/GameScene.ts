import { BaseScene } from './BaseScene';
import { LevelOneScene } from './LevelOneScene';
import { InterfaceScene } from './InterfaceScene';

import { WritesLogs } from '~/Mixins/WritesLogs';
import { Store } from '~/Store';
import { PlayerModel } from '~/Store/Player/Player.model';

@WritesLogs
export class GameScene extends BaseScene {
    static key = 'GameScene'

    constructor () {
        super({ key: GameScene.key })
        this.log('constructed')
    }

    create ():void {
        this.log('created')
        this.scene.launch(LevelOneScene.key)
        this.scene.launch(InterfaceScene.key)
        this.scene.moveUp(InterfaceScene.key)
    }
}
