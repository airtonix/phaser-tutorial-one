import Phaser from 'phaser'

export class BaseScene extends Phaser.Scene {

    constructor (props) {
        super({ ...props })
        this.props = props
        this.log('constructed')
    }

    log (...msgs) {
        const {
            key
        } = this.props
        console.log(`[Scene: ${key}]`, ...msgs)
    }

    create () {
        this.log('created')
    }
}