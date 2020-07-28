import { uniqueId } from 'lodash'
import { NineSlice } from "phaser3-nineslice"
import { Row, Viewport } from 'phaser-ui-tools'

import { Nineslices, BitmapFonts } from "~/constants"
import { WritesLogs } from '~/Mixins/WritesLogs'

export interface DialogOpenConfiguration {
    position: {
        x: number
        y: number
    }
    content: string
}

@WritesLogs
export class UiDialog extends Phaser.GameObjects.Container {
    key: string
    bg: NineSlice
    ui: Viewport
    shadow: Phaser.GameObjects.Graphics
    content: []
    nineslices = {
        ui: Nineslices.Dialog
    }

    constructor(scene, options) {
        super(scene)

        const {
            key,
            x, y, w, h,
            cells, rows
        } = options

        this.key = key || uniqueId('dialog')
        this.createLogger(this.key)
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
        this.setPosition(x, y - this.height)
        scene.events.on(
            `open-${this.key}`,
            this.open
        )

        scene.events.on(
            `close-${this.key}`,
            this.close
        )

        scene.add.existing(this)
        this.log('ready')
    }

    createUi(): NineSlice {
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

    createShadow():Phaser.GameObjects.Graphics {
        const shadow = new Phaser.GameObjects.Graphics(this.scene)
        shadow.fillStyle(0x000000, 0.1)
        shadow.fillRect(2, 2, this.width, this.height)
        return shadow
    }

    setShadowSize(x, y, width, height):void {
        this.shadow.clear()
        this.shadow.fillStyle(0x000000, 0.1)
        this.shadow.fillRect(x, y, width, height)
    }

    setWidth(width: integer):void {
        const { x , y } = this.options

        this.setSize(width, this.height)
        this.ui.setSize(width, this.height)
        this.bg.setSize(width, this.height)
        this.setShadowSize(2, 2, width - 4, this.height + 4)
    }

    setHeight(height: integer):void {
        const { x , y } = this.options

        this.setSize(this.width, height)
        this.ui.setSize(this.width, height)
        this.bg.setSize(this.width, height)
        this.setShadowSize(2, 2, this.width - 4, height + 4)
        this.setPosition(x, y - height)

    }

    open = (options: DialogOpenConfiguration):void => {
        const {
            position,
            content
        } = options || {}

        if ( position ) {
            this.setPosition(position.x, position.y)
        }

        this.setVisible(true)
        this.renderContent(content)
    }

    close = ():void => {
        console.log('close')
        this.setVisible(false)
        this.content
            .forEach(
                item => this.remove(item, true)
            )
    }

    toggle = (options: DialogOpenConfiguration):void => {
        if(!this.visible) {
            this.open(options)
        } else {
            this.close()
        }
    }

    renderContent(content: any): void {
        console.log('renderContent', content)
    }

}