import { BitmapFonts, ItemIcons } from '~/Config/constants'
import { WritesLogs } from '~/Mixins/WritesLogs'

export interface InventoryItemModel {
    id: string
    count: number
    icon: {
        sheet: {
            key: string
            frame: number,
            frames: number[]
        }
    }
    name: string
}

export class InventoryItemUi extends WritesLogs(Phaser.GameObjects.Container) {

    qty: Phaser.GameObjects.BitmapText
    bg: Phaser.GameObjects.Graphics
    icon: Phaser.GameObjects.Sprite
    item: InventoryItemModel

    constructor (scene, options, item) {
        super(scene, options.x, options.y)
        this.item = item
        this.createLogger(`InventoryItem: ${item.id}`)
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
                count
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

    createIcon (x: integer, y: integer, icon) {
        const sprite = new Phaser.GameObjects.Sprite(
            this.scene,
            x, y,
            icon.sheet.key, icon.frame
        )
        return sprite
    }

    createText (x: integer, y: integer, text: string) {
        const content = new Phaser.GameObjects.BitmapText(
            this.scene, x, y,
            BitmapFonts.BlackSixteenbfZXFont.key,
            text
        )
        content.setAlpha(0.7)
        return content
    }

    handleButtonActiveState = () => {
        this.log('handleButtonActiveState')
    }
    handleButtonRestState = () => {
        this.log('handleButtonRestState')
    }
    handlePointerOver = () => {
        this.log('handlePointerOver')
    }
    handlePointerUp = () => {
        this.log('handlePointerUp')
    }
}