import Phaser from 'phaser'

import { Logger } from '~/core/Logger'
import { BaseScene } from '~/core/BaseScene'
import { MenuBackgroundImage } from './BackgroundImage'

const log = Logger(module.id)


export class MenuScene extends BaseScene {
  constructor () {
    log('construct')
    super({ key: 'Menu' })
  }

  create () {
    log('create')
    this.background = new MenuBackgroundImage(this, 400, 150)

    Phaser.Display.Align.In.Center(this.background, this.add.zone(400, 300, 800, 600))
  }

  update () {
    log('update')
  }
}
