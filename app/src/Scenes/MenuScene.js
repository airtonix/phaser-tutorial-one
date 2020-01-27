import Phaser from 'phaser'

import {BaseScene} from './BaseScene'
import { LogoImage } from '../Images/LogoImage'
import { MushroomSprite } from '../Sprites/MushroomSprite'


export class MenuScene extends BaseScene {
  constructor () {
    super({ key: 'Menu' })
  }

  create () {
    this.logo = new LogoImage(this, 400, 150)
    this.mushroom = new MushroomSprite(this, 0, 0)

    Phaser.Display.Align.In.Center(this.logo, this.add.zone(400, 300, 800, 600))
    Phaser.Display.Align.In.Center(this.mushroom, this.add.zone(400, 300, 800, 600))
  }

  update () {
    this.mushroom.update()
  }
}
