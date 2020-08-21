import { classes } from 'polytype'
import { reaction } from 'mobx';

import { Store } from '~/Store';

import { BaseScene } from './BaseScene';
import { InterfaceScene } from './InterfaceScene';
import { MapScene } from './MapScene';

export class GameScene
  extends classes(
    BaseScene,
  ) {

  static key = 'GameScene'

  constructor () {
    super(
      { super: BaseScene, arguments: [{ key: GameScene.key }] },
    )
    this.log('constructed')
  }

  create (): void {
    this.log('created')

    if (!Store.player) {
      const startZone = Store.getStartZone()
      Store.startPlayer(startZone)
    }

    this.scene.launch(InterfaceScene.key)
    this.scene.moveUp(InterfaceScene.key)

    reaction(
      () => Store.player?.character?.currentZone,
      (zone) => {
        if (!zone) return
        this.log('Launching', zone.name)
        Store.setZone(zone)
        this.scene.launch(MapScene.key)
      },
      {
        // also run the reaction the first time
        fireImmediately: true,
      }
    )

  }
}
