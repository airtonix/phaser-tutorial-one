import Phaser from 'phaser'
import { WritesLogs } from '~/Mixins/WritesLogs'
import { Warrior } from './PlayerWarrior'

@WritesLogs
export class ActorUi extends Phaser.GameObjects.Container {
    avatar: Warrior
    border: Phaser.GameObjects.Graphics
    bg: Phaser.GameObjects.Graphics

    constructor (scene, x, y) {
        super(scene, x, y)

        this.border = new Phaser.GameObjects.Graphics(
            scene,
            {x: 32, y: 32}
        )
        this.border.lineStyle(2,0x666666, 0.6)
        this.border.strokeCircle(0, 0, 16)

        this.bg = new Phaser.GameObjects.Graphics(
            scene,
            {x: 32, y: 32}
        )
        this.bg.fillStyle(0x222222, 1)
        this.bg.fillCircle(0, 0, 16)

        this.avatar = new Warrior(scene)
        this.avatar.setPosition(32, 40)
        this.avatar.setDepth(1)

        this.add([
            this.bg,
            this.border,
            this.avatar
        ])

        scene.add.existing(this)
    }

    update () {
        this.avatar.update()
    }
}