import { Nineslices, BitmapFonts } from "~/constants"
import { NineSlice } from "phaser3-nineslice"

export class Dialog extends Phaser.GameObjects.Container {
    ui: NineSlice
    shadow: Phaser.GameObjects.Graphics
    content: []
    nineslices = {
        ui: Nineslices.Dialog
    }

    constructor (...args: any[]) {
        super(...args)
        this.ui = this.createUi()
        this.shadow = this.createShadow()
        this.content = []

        this.add([
            this.ui,
            this.shadow
        ])

        this.sendToBack(this.shadow)
        this.setVisible(false)
    }

    createUi () : NineSlice {
        const {
            startX,
            startY,
            width,
            height,
            key,
            cornerOffset,
            border,
        } = this.nineslices.ui || {}

        const ui = this.scene.add.nineslice(
            startX, startY,
            width, height,
            key,
            cornerOffset,
            border
        )
        ui.setSize(128, 64)
        ui.setOrigin(0, 0)
        return ui
    }

    createShadow () {
        const shadow = new Phaser.GameObjects.Graphics(this.scene)
        shadow.fillStyle(0x000000, 0.1)
        shadow.fillRect(2, 2, this.width, this.height)
        return shadow
    }
    setShadowSize (x, y, width, height) {
        this.shadow.clear()
        this.shadow.fillRect(x, y, width, height)
    }

    setWidth (width: integer) {
        this.setSize(width, this.height)
        this.ui.setSize(width, this.height)
        this.setShadowSize(2, 2, width - 4, this.height + 4)
    }
    setHeight (height: integer) {
        this.setSize(this.width, height)
        this.ui.setSize(this.width, height)
        this.setShadowSize(2, 2, this.width - 4, height + 4)
    }

    open = (args) => {
        const { position, content } = args || {}
        const { x, y } = position || {}

        this.setPosition(x, y)
        this.setVisible(true)

        this.renderContent(content)
    }

    close = () => {
        console.log('close')
        this.setVisible(false)
        this.content
            .forEach(
                item => this.remove(item, true)
            )
    }

    renderContent (content) {
        console.log('renderContent', content)
    }

}