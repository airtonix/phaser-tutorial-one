import { WritesLogs } from '~/Mixins/WritesLogs';
import { Store } from '~/Store';

import { BaseScene } from './BaseScene';
import { InterfaceScene } from './InterfaceScene';
import { MapScene } from './MapScene';

@WritesLogs
export class GameScene extends BaseScene {
  static key = 'GameScene'

  constructor () {
    super({ key: GameScene.key })
    this.log('constructed')
  }

  create (): void {
    this.log('created')

    if (!Store.player) {
      Store.startPlayer(
        Store.getStartZone()
      )

    }

    const currentCharacter = Store.player?.character
    if (!currentCharacter?.currentZone) {
      currentCharacter?.setZone(Store.zones[0])
    }
    Store.setZone(currentCharacter?.currentZone)

    this.log('Launching', Store.currentZone?.map.key)
    this.scene.launch(MapScene.key)

    this.scene.launch(InterfaceScene.key)
    this.scene.moveUp(InterfaceScene.key)
  }
}
