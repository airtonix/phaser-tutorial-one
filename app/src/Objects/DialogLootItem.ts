// Phaser.GameObjects.RetroFont.Parse(scene, config)

export class DialogLootItem extends Phaser.GameObjects.Container {
    itemName: Phaser.GameObjects.Text

    constructor (scene, x, y, content) {
        super(scene, x, y)
        // this.icon = this.createText(text)
        this.itemName = this.createText(content.name)
        this.add([
            this.itemName
        ])
    }

    setWidth (width: integer) {
        this.setSize(width, this.height)
    }

    createText (text) {
        const content = new Phaser.GameObjects.Text(this.scene, 0, 0, text, {
            wordWrap: {
                useAdvancedWrap: true
            }
        })
        console.log(text)
        return content
    }

}