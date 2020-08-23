import { Buttons } from 'phaser3-rex-plugins/templates/ui/ui-components'

import { Logger } from '~/Core/Logger'
import { Button } from '~/Objects/Ui/Button'

import { NewGameMenuScene } from './NewGameMenuScene'

const log = Logger(module.id)

export class MenuScene extends Phaser.Scene {
  static key = 'MenuScene'
  menu: Buttons

  constructor () {
    super({ key: MenuScene.key })
    log('constructed')
  }

  create (): void {
    log('create')
    this.menu = this.createMenu()
    log('created')
  }

  createMenu (): Buttons {
    const newGameButton = new Button(this, {
      label: 'New Game',
      onClick: () => {
        this.scene.start(NewGameMenuScene.key)
      }
    })

    const loadGameButton = new Button(this, {
      label: 'Load Game'
    })
    const optionsButton = new Button(this, {
      label: 'Options'
    })
    const quitButton = new Button(this, {
      label: 'Quit'
    })

    const menu = new Buttons(this, {
      x: this.cameras.main.width / 2,
      y: this.cameras.main.height / 2,
      orientation: 'y',
      buttons: [
        newGameButton,
        loadGameButton,
        optionsButton,
        quitButton
      ],
      space: {
        item: 4
      }
    })
    menu.layout()
    this.add.existing(menu)

    return menu
  }

}
