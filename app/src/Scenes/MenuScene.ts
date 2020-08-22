import { Buttons, Label, RoundRectangle } from 'phaser3-rex-plugins/templates/ui/ui-components'

import { Logger } from '~/Core/Logger'
import { Warrior } from '~/Objects/Characters/CharacterWarrior'
import { COLOURS, BitmapFonts } from '~/Config/constants'
import { Button, IButtonConfig } from '~/Objects/Ui/Button'

import { NewGameMenuScene } from './NameGameMenuScene'

const log = Logger(module.id)

enum EnumButtonType {
  NewGame,
  LoadGame,
  Options,
  Quit
}

export class MenuScene extends Phaser.Scene {
  static key = 'MenuScene'
  logo: Warrior
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

    const loadGameButton = new Button(this, { label: 'Load Game' })
    loadGameButton.setData('type', EnumButtonType.LoadGame)

    const optionsButton = new Button(this, { label: 'Options' })
    loadGameButton.setData('type', EnumButtonType.Options)

    const quitButton = new Button(this, { label: 'Quit' })
    loadGameButton.setData('type', EnumButtonType.Quit)

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
    menu.on('button.click', this.handleButtonClick, this)
    menu.on('button.over', this.handleButtonOver, this)
    menu.on('button.out', this.handleButtonOut, this)
    menu.layout()
    this.add.existing(menu)

    return menu
  }

  handleButtonOver = (button: Label): void  => {
    button.handleOver()
  }

  handleButtonOut = (button: Label): void  => {
    button.handleOut()
  }

  handleButtonClick = (button: Label): void => {
    button.handleClick()
  }
}
