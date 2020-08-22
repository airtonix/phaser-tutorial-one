import { reaction } from 'mobx';

import { Logger } from '~/Core/Logger'
import { Store } from '~/Store';

import { InterfaceScene } from './InterfaceScene';
// import { MapScene } from './MapScene';

const log = Logger(module.id)

export class GameScene extends Phaser.Scene {

  static key = 'GameScene'

  constructor () {
    super({ key: GameScene.key })
    log('constructed')
  }

  create (): void {
    log('created')

    const startZone = Store.getStartZone()
    Store.startPlayer(startZone)

    this.scene.launch(InterfaceScene.key)
    this.scene.moveUp(InterfaceScene.key)

    reaction(
      () => Store.player?.character?.currentZone,
      (zone) => {
        if (!zone) return
        log('Launching', zone.name)
        Store.setZone(zone)
        // this.scene.launch(MapScene.key)
      },
      {
        // also run the reaction the first time
        fireImmediately: true,
      }
    )

  }
}
