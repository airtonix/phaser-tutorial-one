import { BitmapFonts, ItemIcons } from "~/constants"
import { sample } from 'lodash'

export class DialogLootItem extends Phaser.GameObjects.Container {
    itemName: Phaser.GameObjects.BitmapText
    icon: Phaser.GameObjects.Sprite
    bg: Phaser.GameObjects.Graphics

    constructor (scene, x, y, content) {
        super(scene, x, y)
        this.icon = this.createIcon(8, 8, 4, content.type)
        this.itemName = this.createText(content.name)
        this.setDepth(2000)
        this.add([
            this.icon,
            this.itemName,
        ])
    }

    setWidth (width: integer) {
        this.setSize(width, this.height)
    }

    setHeight (height: integer) {
        this.setSize(this.width, height)
    }

    createIcon (x: integer, y: integer, margin: integer, type: string) {
        const ItemTypeIconSheet = ItemIcons[type]
        const icon = new Phaser.GameObjects.Sprite(
            this.scene, x + margin, y + margin,
            ItemTypeIconSheet.sheet.key,
            sample(ItemTypeIconSheet.frames)
        )

        this.setWidth(x + 32 + margin)
        this.setHeight(y + 32 + margin)
        return icon
    }

    createText (text) {
        const content = new Phaser.GameObjects.BitmapText(
            this.scene, 38, 6,
            BitmapFonts.BlackSixteenbfZXFont.key,
            text
        )
        content.setAlpha(0.7)
        const height = this.height < content.height
            ? content.height + 8
            : this.height

        this.setSize(
            this.width + content.width + 8,
            height,
        )
        return content
    }

}