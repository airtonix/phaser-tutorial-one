import { Label, Sizer, RoundRectangle } from 'phaser3-rex-plugins/templates/ui/ui-components'
import ButtonBehaviour from 'phaser3-rex-plugins/plugins/button'
import { merge, get } from 'lodash'

import { COLOURS, BitmapFonts } from '~/Config/constants'
import { Logger } from '~/Core/Logger'

export interface IButtonThemeConfig {
  bg: number
  fg: number
}

export interface IButtonConfig {
  label: string,
  alignment?: 'left' | 'right' | 'center',
  theme?: {
    hover: IButtonThemeConfig,
    normal: IButtonThemeConfig,
    click: IButtonThemeConfig
  },
  data?: {
    [key: string]: any
  },
  onClick?: CallableFunction
}

const log = Logger(module.id)

export class Button extends Label {
  setData: CallableFunction
  getData: CallableFunction
  setInteractive: CallableFunction
  childrenMap: {
    [key: string]: any
  }
  config: IButtonConfig
  behaviour: ButtonBehaviour

  static DEFAULT_THEME = {
    normal: { bg: COLOURS.Grey.Dark, fg: COLOURS.White.Default },
    hover: { bg: COLOURS.Grey.Light, fg: COLOURS.White.Default },
    click: { bg: COLOURS.White.Default, fg: COLOURS.White.Default }
  }

  static PRIMARY_THEME = {
    normal: { bg: COLOURS.Grey.Dark, fg: COLOURS.White.Default },
    hover: { bg: COLOURS.Grey.Light, fg: COLOURS.White.Default },
    click: { bg: COLOURS.White.Default, fg: COLOURS.White.Default }
  }

  constructor (
    scene: Phaser.Scene,
    config: IButtonConfig
  ) {
    super(scene, {
      height: 24,
      background: new RoundRectangle(
        scene, 0, 0, 0, 0, 4, COLOURS.Grey.Dark
      ),
      text: new Phaser.GameObjects.BitmapText(
        scene, 0, 0,
        BitmapFonts.BlackSixteenbfZXFont.key,
        config.label
      ),
      space: {
        left: 8,
        right: 8
      },
      align: config.alignment || 'center'
    })
    this.config = config
    this.setInteractive({ cursor: 'pointer' })

    scene.add.existing(this.childrenMap.background)
    scene.add.existing(this.childrenMap.text)
    scene.add.existing(this)

    this.theme = merge(
      Button.DEFAULT_THEME,
      config.theme || {}
    )

    const text = this.getElement('text')
    log(text)
    // text.setCharacterTint(COLOURS.White.Default)

    this.behaviour = new ButtonBehaviour(this)
    this.behaviour.on('click', this.handleClick)
    this.on('pointerover', this.handleOver)
    this.on('pointerout', this.handleOut)

  }

  handleOver = (): void => {
    const color = get(this.theme, 'hover.bg')
    this.childrenMap.background.setFillStyle(color)
  }

  handleOut = (): void => {
    const color = get(this.theme, 'normal.bg')
    this.childrenMap.background.setFillStyle(color)
  }

  handleClick = (buttonBehaviour, ...args: any[]): void => {
    const color = get(this.theme, 'click.bg')
    const onClick = get(this.config, 'onClick')
    if (typeof onClick !== 'function') return

    this.childrenMap.background.setFillStyle(color)
    onClick(this, ...args)
  }
}
