import { NineSlice } from "phaser3-nineslice"
import { Row, Viewport } from 'phaser-ui-tools';
import { Nineslices, BitmapFonts } from "~/constants"

export class DialogUi extends Phaser.GameObjects.Container {
    bg: NineSlice
    ui: Viewport
    shadow: Phaser.GameObjects.Graphics
    content: []
    nineslices = {
        ui: Nineslices.Dialog
    }

    constructor (scene, options) {
        super(scene)
        const {
            x, y, w, h,
            cells, rows
        } = options
        this.options = options

        this.bg = this.createUi()
        this.ui = new Viewport(this.scene, 0, 0, w, h)
        this.shadow = this.createShadow()
        this.content = []
        this.add([
            this.bg,
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

        const bg = this.scene.add.nineslice(
            startX, startY,
            width, height,
            key,
            cornerOffset,
            border
        )
        bg.setSize(128, 64)
        bg.setOrigin(0, 0)
        return bg
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
        this.bg.setSize(width, this.height)
        this.setShadowSize(2, 2, width - 4, this.height + 4)
    }

    setHeight (height: integer) {
        this.setSize(this.width, height)
        this.ui.setSize(this.width, height)
        this.bg.setSize(this.width, height)
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