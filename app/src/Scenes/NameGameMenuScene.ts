import { Buttons } from 'phaser3-rex-plugins/templates/ui/ui-components'

import { Logger } from '~/Core/Logger'
import { Store } from '~/Store'
import { Button } from '~/Objects/Ui/Button'

import { GameScene } from './GameScene'
import { MenuScene } from './MenuScene'

const log = Logger(module.id)

enum EnumButtonType {
  Back,
  Klass
}

export class NewGameMenuScene extends Phaser.Scene {
  static key = 'NewGameMenuScene'
  menu: Buttons

  constructor () {
    super({ key: NewGameMenuScene.key })
    log('constructed')
  }

  create (): void {
    log('create')
    this.menu = this.createMenu()
    log('created')
  }

  createMenu (): Buttons {
    const {
      classes = []
    } = Store.library || {}

    const klassButtons = classes
      .map(klass => new Button(this, {
        label: klass.name,
        data: {
          type: EnumButtonType.Klass,
          klass
        },
        onClick: () => {

          const player = Store.createPlayer()
          const character = player.createCharacterFromClass(klass)
          player.setCharacter(character)

          this.scene.start(GameScene.key)
        }
      }))

    const backButton = new Button(this, {
      label: 'Back',
      data: {
        type: EnumButtonType.Back
      },
      onClick: () => {
        this.scene.start(MenuScene.key)
      }
    })

    const menu = new Buttons(this, {
      x: this.cameras.main.width / 2,
      y: this.cameras.main.height / 2,
      orientation: 'y',
      buttons: [
        backButton,
        ...klassButtons
      ],
      space: {
        item: 4
      }
    })
    menu.on('button.click', this.handleButtonClick, this)
    menu.on('button.over', this.handleButtonOver, this)
    menu.on('button.out', this.handleButtonOut, this)
    menu.layout()
    this.add.existing(menu)

    return menu
  }

  handleButtonOver = (button: Button): void  => {
    button.handleOver()
  }

  handleButtonOut = (button: Button): void  => {
    button.handleOut()
  }

  handleButtonClick = (button: Button): void => {
    button.handleClick()
  }
}
