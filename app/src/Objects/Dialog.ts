import { Nineslices, RetroFonts } from "~/constants"
import { NineSlice } from "phaser3-nineslice"

export class Dialog extends Phaser.GameObjects.Container {
    ui: NineSlice
    content: Phaser.GameObjects.Group
    nineslices = {
        ui: Nineslices.Dialog
    }

    constructor (...args: any[]) {
        super(...args)
        this.ui = this.createUi()
        this.add([
            this.ui
        ])
        const parsedFont = Phaser.GameObjects.RetroFont.Parse(
            this.scene,
            RetroFonts.vormgevers
        )

        this.scene.cache.bitmapFont
            .add(RetroFonts.vormgevers.image, parsedFont)
        this.content = new Phaser.GameObjects.Group(this.scene)

        const text = this.scene.make.bitmapText({
            x: 0,
            y: 0,
            font: RetroFonts.vormgevers.image,
            text: 'Some text'
        })
        this.content.add(
            text
        )

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
        console.log('open')
        this.ui.setPosition(x, y)
        this.ui.setVisible(true)

        this.renderContent(content)
    }

    close = () => {
        console.log('close')
        this.ui.setVisible(false)
        this.content.getChildren().forEach(item => this.content.remove(item, true, true))
    }

    renderContent (content) {
        console.log('renderContent', content)
    }

}