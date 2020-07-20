import { BitmapFonts } from "~/constants"

export class DialogLootItem extends Phaser.GameObjects.Container {
    itemName: Phaser.GameObjects.Text

    constructor (scene, x, y, content) {
        super(scene, x, y)
        // this.icon = this.createText(text)
        this.itemName = this.createText(content.name)
        this.setDepth(2000)
        this.add([
            this.itemName
        ])
    }

    setWidth (width: integer) {
        this.setSize(width, this.height)
    }

    createText (text) {
        const content = new Phaser.GameObjects.BitmapText(
            this.scene,
            this.x + 4, this.y + 4,
            BitmapFonts.SixteenbfZXFont.key,
            text
        )
        return content
    }

}