import Phaser from 'phaser'
import debug from 'debug'
import { OutlinePipeline } from '~/Shaders/OutlinePipeline'

export class BaseScene extends Phaser.Scene {

    constructor ({ key, ...props }) {
        super({ key, ...props })
        this.key = key
        this.props = props
        this.log = debug(`${key}.Scene`)
        this.log('constructed')
    }

    init () {
        if (this.game.renderer instanceof Phaser.Renderer.WebGL.WebGLRenderer) {
            this.game.renderer.addPipeline(
                OutlinePipeline.KEY,
                new OutlinePipeline(this.game)
            )
        }
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
}