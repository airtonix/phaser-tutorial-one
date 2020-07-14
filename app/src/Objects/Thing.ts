import { Mixin, mix } from 'ts-mixer'
import debug from 'debug'
import { throttle, get } from 'lodash'
import Phaser from 'phaser'

import { OutlinePipeline } from '~/Shaders/OutlinePipeline'
import { Orientation, SpriteSheets } from '~/constants'

export class Thing extends Phaser.GameObjects.Container {

    constructor(props) {
        super(props.scene, props.x, props.y)
        const {
            key = 'Unknown',
            x = 0,
            y = 0,
            scene,
            speed = 0,
            footprintHeight = 16,
            footprintWidth = 24,
        } = props
        if (!scene) throw Error(`[${key}] requires a scene`)

        this.props = props
        this.scene = scene
        this.key = key
        this.x = x
        this.y = y
        this.speed = speed

        this.log = debug(key)

        this.setX(x)
        this.setY(y)
        this.setSize(footprintWidth, footprintHeight)

        this.sprite = this.addSprite()
        this.emote = this.addEmoteSprite()
        this.health = this.createHealthManager()

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.scene.physics.world.enable(this)

        this.log('constructed')
    }



    destroy = () => {
        this.log('destroy')
        this.setActive(false)
        const sprite = this.sprite
        sprite.destroy()
    }

}
