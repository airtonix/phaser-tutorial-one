import { Buttons, Label, RoundRectangle } from 'phaser3-rex-plugins/templates/ui/ui-components'

import { Logger } from '~/Core/Logger'
import { Warrior } from '~/Objects/Characters/CharacterWarrior'

import { GameScene } from './GameScene'
import { Character } from '~/Objects/Characters/Character'
import { COLOURS, BitmapFonts } from '~/Config/constants'

const log = Logger(module.id)



enum EnumButtonType {
  NewGame
}

interface IButtonConfig {
  type: EnumButtonType,
  label: string
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
    // this.logo = this.createLogo()
    this.menu = this.createMenu()
    log('created')
  }

  createLogo (): Character {
    const { width, height } = this.sys.cameras.main

    const logo = new Warrior([this])
    logo.setDepth(100)
    logo.setPosition(
      width / 2,
      height / 2
    )
    return logo
  }

  createMenu (): Buttons {

    const menu = new Buttons(this, {
      x: this.cameras.main.width / 2,
      y: this.cameras.main.height / 2,
      orientation: 'y',
      buttons: [
        this.createMenuButton({
          type: EnumButtonType.NewGame,
          label: 'New Game'
        })
      ]
    })
    menu.on('button.click', this.handleButtonClick, this)
    menu.on('button.over', this.handleButtonOver, this)
    menu.on('button.out', this.handleButtonOut, this)
    menu.layout()
    this.add.existing(menu)

    return menu
  }

  createMenuButton (config: IButtonConfig): Label {
    const {
      type,
      label
    } = config
    const background = new RoundRectangle(
      this, 0, 0, 0, 0, 4, COLOURS.Grey.Dark
    )
    const text = new Phaser.GameObjects.BitmapText(
      this, 0, 0,
      BitmapFonts.BlackSixteenbfZXFont.key,
      label
    )

    this.add.existing(background)
    this.add.existing(text)

    const button = new Label(this, {
      height: 24,
      background,
      text,
      space: {
        left: 8,
        right: 8
      },
      align: 'center'
    })

    button.setData('theme.normal.bg', COLOURS.Grey.Dark)
    button.setData('theme.hover.bg', COLOURS.Grey.Light)
    button.setData('theme.click.bg', COLOURS.White.Default)

    this.add.existing(button)
    button.type = type
    return button
  }

  update (): void {
    // this.logo.active = false
    // this.logo.update()
  }

  handleButtonOver = (button, groupName, index, pointer, event) => {
    log('handleButtonOver', button, groupName)
    button.childrenMap.background.setFillStyle(
      button.getData('theme.hover.bg')
    )
  }

  handleButtonOut = (button, groupName, index, pointer, event) => {
    log('handleButtonOut', button, groupName)
    button.childrenMap.background.setFillStyle(
      button.getData('theme.normal.bg')
    )
  }

  handleButtonClick = (button, groupName, index, pointer, event): void => {
    log('handleButtonClick', button.type, groupName)
    switch (button.type) {
      case EnumButtonType.NewGame:
        this.scene.start(GameScene.key)
        break;
    }
  }
}
