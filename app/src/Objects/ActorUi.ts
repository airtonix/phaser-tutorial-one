import Phaser from 'phaser'
import { WritesLogs } from '~Mixins/WritesLogs'
import { Warrior } from './PlayerWarrior'
import { Player } from './Player'

@WritesLogs
export class ActorUi extends Phaser.GameObjects.Container {
    avatar: Player
    border: Phaser.GameObjects.Graphics

    create () {
        this.border = new Phaser.GameObjects.Graphics(this.scene)
        this.border.lineStyle(2, 0x999999, 0.5)
        this.border.strokeCircle(32, 32, 16)

        // this.avatar = new Warrior({
        //     scene: this.scene,
        //     width: 16,
        //     height: 32,
        //     x: 0,
        //     y: 0
        // })

        this.add([
            this.border,
            // this.avatar
        ])
    }
}