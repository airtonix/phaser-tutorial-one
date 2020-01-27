import Phaser from 'phaser'

import {BaseScene} from './BaseScene'

import logo from '../Images/logo.png'
import mushroom from '../Images/mushroom2.png'

export class PreloaderScene extends BaseScene {

  constructor () {
    super({ key: 'Preloader' })
  }

  preload () {
    const progress = this.add.graphics()

    this.load.on('fileprogress', (file, value) => {
      progress.clear()
      progress.fillStyle(0xffffff, 0.75)
      progress.fillRect(700 - (value * 600), 250, value * 600, 100)
    })

    this.load.image('logo', logo)
    this.load.image('mushroom', mushroom)
  }

  create () {
    this.scene.start('Menu')
  }
}
