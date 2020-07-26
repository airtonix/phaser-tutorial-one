import { BaseScene } from './BaseScene'
import { UiGameBar } from '~Objects/UiGameBar'
import { UiDialogInventory } from '~Objects/UiDialogInventory'
import { WritesLogs } from '~Mixins/WritesLogs'


@WritesLogs
export class InterfaceScene extends BaseScene {
    static key = 'InterfaceScene'

    log: (...args: any[]) => string

    gamebar: UiGameBar
    playerInventory: UiDialogInventory
    containerInventory: UiDialogInventory

    constructor () {
        super({ key: InterfaceScene.key })
    }

    create () {
        super.create()
        this.log('creating')

        this.gamebar = new UiGameBar(this, {
            x: 0,
            y: Number(this.game.config.height) / 2 - 11,
            width: Number(this.game.config.width),
            height: 22,
            bgColor: 0x333333
        })

        this.playerInventory = new UiDialogInventory(this, {
            cells: 5,
            rows: 5
        })

        this.containerInventory = new UiDialogInventory(this, {
            cells: 5,
            rows: 5
        })

    }

}