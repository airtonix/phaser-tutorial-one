import Phaser from 'phaser'

export class BaseScene extends Phaser.Scene {

    constructor ({ key, ...props }) {
        super({ key, ...props })
        this.key = key
        this.props = props
        this.log('[BaseScene] constructed')
    }

    create () {
        const {
            isInteractive
        } = this.props
        this.log('[BaseScene] create')

        if (isInteractive) {
            this.log('create.isInteractive')
            this.keys = this.input.keyboard.createCursorKeys()
        }
    }

    log (...msgs) {
        console.log(`[Scene: ${this.key}]`, ...msgs)
    }
}