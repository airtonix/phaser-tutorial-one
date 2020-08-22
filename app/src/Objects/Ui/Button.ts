import { Label, Sizer, RoundRectangle } from 'phaser3-rex-plugins/templates/ui/ui-components'

import { COLOURS, BitmapFonts } from '~/Config/constants'
import { merge, get } from 'lodash'

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

export class Button extends Label {
  setData: CallableFunction
  getData: CallableFunction
  setInteractive: CallableFunction
  childrenMap: {
    [key: string]: any
  }
  config: IButtonConfig

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

    this.setData('data', config.data)

    this.setData('theme', merge(
      config.theme,
      {
        normal: { bg: COLOURS.Grey.Dark },
        hover: { bg: COLOURS.Grey.Light },
        click: { bg: COLOURS.White.Default }
      }
    ))

  }

  handleOver (): void {
    const theme = this.getData('theme')
    const color = get(theme, 'hover.bg')
    this.childrenMap.background.setFillStyle(color)
  }

  handleOut (): void {
    const theme = this.getData('theme')
    const color = get(theme, 'normal.bg')
    this.childrenMap.background.setFillStyle(color)
  }

  handleClick (): void {
    const theme = this.getData('theme')
    const color = get(theme, 'click.bg')
    this.childrenMap.background.setFillStyle(color)

    if (typeof this.config.onClick === 'function') {
      this.config.onClick()
    }
  }
}
