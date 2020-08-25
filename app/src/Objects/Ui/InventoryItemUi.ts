import { BitmapFonts, ItemIcons, IIconConfig } from '~/Config/constants'
import { Logs } from '~/Core/Logger'

export interface InventoryItemModel {
    id: string
    count: number
    icon: IIconConfig,
    name: string
}

export interface IIconInventoryConfig {
    x: number,
    y: number,
    w: number,
    h: number,
}

@Logs
export class InventoryItemUi extends Phaser.GameObjects.Container {

    log: CallableFunction
    qty: Phaser.GameObjects.BitmapText
    bg: Phaser.GameObjects.Graphics
    icon: Phaser.GameObjects.Sprite

    constructor (
      public scene: Phaser.Scene,
      public options: IIconInventoryConfig,
      public item: InventoryItemModel
    ) {
      super(scene, options.x, options.y)
      this.item = item

      const {
        x, y, w, h
      } = options
      const {
        count,
        icon
      } = item || {}

      this.setSize(w, h)
      this.bg = new Phaser.GameObjects.Graphics(
        this.scene,
        { x: 0, y: 0}
      )
      this.bg.fillStyle(0x000000, 0.2)
      this.bg.fillRect(0, 0, w, h)
      this.add(this.bg)

      this.icon = new Phaser.GameObjects.Sprite(
        this.scene,
        w / 2, h / 2,
        icon.sheet.key,
        icon.frame
      )
      this.add(this.icon)

      if (count > 1) {
        this.qty = this.createText(
          w - (Number(count).toString().length * 8),
          h - 10,
          count.toString()
        )
        this.add(this.qty)
      }

      this.setInteractive({ useHandCursor: true })
        .on('pointerover', this.handlePointerOver)
        .on('pointerout', this.handleButtonRestState)
        .on('pointerdown', this.handleButtonActiveState)
        .on('pointerup', this.handlePointerUp)

      this.setDepth(2000)
    }

    createIcon (
      x: number,
      y: number,
      icon: IIconConfig
    ): Phaser.GameObjects.Sprite {
      const sprite = new Phaser.GameObjects.Sprite(
        this.scene,
        x, y,
        icon.sheet.key,
        icon.frame
      )
      return sprite
    }

    createText (
      x: integer,
      y: integer,
      text: string
    ): Phaser.GameObjects.BitmapText {
      const content = new Phaser.GameObjects.BitmapText(
        this.scene, x, y,
        BitmapFonts.BlackSixteenbfZXFont.key,
        text
      )
      content.setAlpha(0.7)
      return content
    }

    handleButtonActiveState = (): void => {
      this.log('handleButtonActiveState')
    }
    handleButtonRestState = (): void => {
      this.log('handleButtonRestState')
    }
    handlePointerOver = (): void => {
      this.log('handlePointerOver')
    }
    handlePointerUp = (): void => {
      this.log('handlePointerUp')
    }
}