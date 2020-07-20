import { Nineslices, BitmapFonts } from "~/constants"
import { NineSlice } from "phaser3-nineslice"

export class Dialog extends Phaser.GameObjects.Container {
    ui: NineSlice
    content: []
    nineslices = {
        ui: Nineslices.Dialog
    }

    constructor (...args: any[]) {
        super(...args)
        this.ui = this.createUi()
        this.content = []

        this.add([
            this.ui
        ])


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
        ui.setOrigin(-0.1, 0.2)
        ui.setVisible(false)
        return ui
    }

    open = (args) => {
        const { position, content } = args || {}
        const { x, y } = position || {}

        this.ui.setPosition(x, y)
        this.ui.setVisible(true)

        this.renderContent(content)
    }

    close = () => {
        console.log('close')
        this.ui.setVisible(false)
        this.content
            .forEach(
                item => this.remove(item, true)
            )
    }

    renderContent (content) {
        console.log('renderContent', content)
    }

}