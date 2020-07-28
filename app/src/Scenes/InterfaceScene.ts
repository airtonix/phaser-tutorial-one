import { BaseScene } from './BaseScene'
import { UiDialogInventory } from '~/Objects/UiDialogInventory'
import { WritesLogs } from '~/Mixins/WritesLogs'
import { ActorUi } from '~/Objects/ActorUi'
import { EVENT_KEY_INVENTORY_SHOW_DIALOG, EVENT_KEY_INVENTORY_HIDE_DIALOG } from '~/Mixins/ContainsItems'
import { EVENT_KEY_OPEN_PLAYER_INVENTORY } from '~/Mixins/IsPlayerControlled'

@WritesLogs
export class InterfaceScene extends BaseScene {
    static key = 'InterfaceScene'

    log: (...args: any[]) => string
    gamebar: Phaser.GameObjects.Graphics
    player: ActorUi
    playerInventory: UiDialogInventory
    containerInventory: UiDialogInventory

    constructor () {
        super({ key: InterfaceScene.key })
    }

    create (): void {
        super.create()
        this.log('creating')
        const y = Number(this.game.config.height) - 22
        const w = Number(this.game.config.width)

        this.gamebar = this.createBg(
            0, y, w, 22,
            0x333333
        )

        this.player = new ActorUi(this,
            0, Number(this.game.config.height) - 52)

        this.playerInventory = new UiDialogInventory(this, {
            key: 'PlayerInventory',
            x: 48, y,
            cells: 5,
            rows: 5
        })

        this.containerInventory = new UiDialogInventory(this, {
            key: 'ContainerInventory',
            x: 128, y,
            cells: 5,
            rows: 5
        })

        this.game.events
            .on(EVENT_KEY_OPEN_PLAYER_INVENTORY,
                this.playerInventory.toggle)

        this.game.events
            .on(EVENT_KEY_INVENTORY_SHOW_DIALOG,
                this.containerInventory.open)
        this.game.events
            .on(EVENT_KEY_INVENTORY_HIDE_DIALOG,
                this.containerInventory.close)
    }

    createBg (
        x: integer,
        y: integer,
        width: integer,
        height: integer,
        bgColor: integer
    ): Phaser.GameObjects.Graphics {
        const bg = this.make.graphics({ x, y })
        bg.fillStyle(bgColor, 1)
        bg.lineStyle(2, 0x999999, 0.5)
        bg.strokeRect(0, 0, width, 2)
        bg.fillRect(0, 0, width, height)

        this.add.existing(bg)

        return bg
    }

    update () {
        this.player.update()
    }
}