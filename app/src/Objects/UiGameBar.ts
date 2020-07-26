import { WritesLogs } from "~Mixins/WritesLogs"
import { ActorUi } from "./ActorUi"

export interface UiGameBarConfig {
    x: number
    y: number
    width: number
    height: number,
    bgColor: number
}

@WritesLogs
export class UiGameBar extends Phaser.GameObjects.Container {
    bg: Phaser.GameObjects.Graphics
    config: UiGameBarConfig
    player: ActorUi

    constructor (scene: Phaser.Scene, config: UiGameBarConfig) {
        super(scene, config.x, config.y)
        this.config = config
        this.createBg()
        this.createPlayerUi()

        this.scene.add.existing(this)
    }

    createBg () {
        const {
            x, y,
            width, height,
            bgColor
        } = this.config

        this.bg = this.scene.make.graphics({ x, y })
        this.bg.fillStyle(bgColor, 1)
        this.bg.lineStyle(2, 0x999999, 0.5)
        this.bg.strokeRect(0, 0, width, 2)
        this.bg.fillRect(0, 0, width, height)
        this.add(this.bg)
    }

    createPlayerUi () {
        this.player = new ActorUi(this.scene)
    }
}