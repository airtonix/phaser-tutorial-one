import Health from 'phaser-component-health'
import Phaser from 'phaser'
import { Orientation } from '~/constants'

export class Thing extends Phaser.GameObjects.Container {
    orientation = Orientation.Down

    constructor(props) {
        super(props.scene, props.x, props.y)
        const {
            key = 'Unknown',
            x = 0,
            y = 0,
            scene,
            health = 100,
            maxHealth = 100,
            speed = 0,
            footprintHeight = 16,
            footprintWidth = 32,
        } = props
        if (!scene) throw Error(`[${key}] requires a scene`)

        this.props = props
        this.scene = scene
        this.key = key
        this.x = x
        this.y = y
        this.speed = speed

        this.setX(x)
        this.setY(y)

        this.setSize(footprintWidth, footprintHeight)

        this.sprite = this.createSprite()

        this.health = Health.AddTo(
            this,
            health,
            maxHealth)

        this.on('die', this.handleDeath)
        this.on('revive', this.handleRevived)
        this.on('healthchange', this.handleHealthChanged)
        this.on('heal', this.handleRecieveHealing)
        this.on('damage', this.handleRecieveDamage)

        this.add([
            this.sprite,
        ])
        // scene.add.existing(this.sprite)
        scene.add.existing(this)
        this.log('constructed')
    }

    createSprite () {
        const {
            width, height,
            idleAnimation
        } = this.props
        this.log('createSprite', { width, height, idleAnimation })

        const animation = idleAnimation[this.orientation] || idleAnimation.all
        const { key, frame } = animation.anim.frames[0]

        const sprite = this.scene.add
            .sprite(0, 0, key, frame)
            .setSize(width, height)
            .setOrigin(0.1, 0.1)

        return sprite
    }

    handleDeath () {
        if(!this.active) return

        this.log('handleDeath')
        this.sprite
            .setActive(false)
            .setVisible(false)

        // TODO: set death animation
    }

    handleRevived () {
        if(!this.active) return

        this.log('handleRevived')
        this.sprite
            .setActive(true)
            .setVisible(true)
    }

    handleHealthChanged (obj, amount, health, maxHealth) {
        if(!this.active) return

        this.log('handleHealthChange', { amount, health, maxHealth })
    }

    handleRecieveHealing () {
        if(!this.active) return

        this.log('handleRecieveHealing')
    }

    handleRecieveDamage () {
        if(!this.active) return

        this.log('handleRecieveDamage')
    }

    animate (animations) {
        if(!this.active) return

        const orientation = this.orientation
        const { flip, anim } = animations[orientation] || animations.all || {}
        this.log('animate', { orientation, anim })

        if (typeof flip !== 'undefined') {
            this.log('flipping sprite', flip)
            this.sprite.setFlip(flip)
        }

        if (anim) {
            const { key } = anim
            this.sprite.play(key, true, 0)
        }
    }

    destroy = () => {
        this.log('destroy')
        this.setActive(false)
        this.sprite.anims.currentAnim.pause()
        this.sprite.destroy()
        // this.scene.remove(this)
    }

    log (...msgs) {
        const {
            key
        } = this.props
        console.log(`[Thing: ${key}]`, ...msgs)
    }
}
