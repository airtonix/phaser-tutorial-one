import { TextButton } from '~/Objects/TextButton'
import { Warrior } from '~/Objects/CharacterWarrior'

import { BaseScene } from './BaseScene'
import { GameScene } from './GameScene'

export class MenuScene extends BaseScene {
  static key = 'MenuScene'
  startButton: TextButton
  logo: Warrior

  constructor () {
    super({ key: MenuScene.key })
  }

  create (): void {
    super.create()
    this.log('create')

    const { width, height } = this.cameras.main

    this.logo = new Warrior(this)
    this.logo.setDepth(100)
    this.logo.setPosition(
      width / 2,
      height / 2
    )
    this.startButton = new TextButton({
      scene: this,
      x: width / 2,
      y: (height / 2) + this.logo.height,
      text: 'Start',
      style: { fill: '#ffffff' },
      onClick: this.handleStartButtonClick
    })
    this.add.existing(this.startButton)
  }

  update (): void {
    this.logo.active = false
    this.logo.update()
  }

  handleStartButtonClick = (): void => {
    this.log('handleStartButtonClick')
    this.scene.start(GameScene.key)
  }
}
