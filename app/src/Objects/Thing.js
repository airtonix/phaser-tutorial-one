import Phaser from 'phaser'
import Health from 'phaser-component-health'
import { Orientation } from '~/Assets'

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
        scene.add.existing(this.sprite)
        scene.add.existing(this)
    }

    createSprite () {
        const {
            width, height,
            idleAnimation
        } = this.props
        const animation = idleAnimation[this.orientation] || idleAnimation.all
        this.log('animation', animation)
        const { key, frame } = animation.anim.frames[0]
        this.log('IdleFrame', { key, frame })

        const sprite = this.scene.add
            .sprite(0, 0, key, frame)
            .setSize(width, height)
            .setOrigin(0.5, 1)

        return sprite
    }

    handleDeath () {
        console.log(`${this.class}[${this.name}] DEATH`)
        this.sprite
            .setActive(false)
            .setVisible(false)

        // TODO: set death animation
    }

    handleRevived () {
        console.log(`${this.class}[${this.name}] REVIVED`)
        this.sprite
            .setActive(true)
            .setVisible(true)
    }

    handleHealthChanged (obj, amount, health, maxHealth) {
        console.log(`[${this.name}] HEALTHCHANGE: ${amount} > now ${health}/${maxHealth}`)
    }

    handleRecieveHealing () {
        console.log(`${this.class}[${this.name}] WASHEALED`)
    }

    handleRecieveDamage () {
        console.log(`${this.class}[${this.name}] WASDAMAGED`)
    }

    animate (animations) {
        const orientation = this.orientation
        const { flip, anim } = animations[orientation] || animations.all || {}
        this.log({ orientation, anim })
        if (typeof flip !== 'undefined') {
            this.log('flipping sprite', flip)
            this.sprite.setFlip(flip)
        }
        if (anim) {
            const { key } = anim
            this.sprite.play(key, true, 0)
        }
    }

    destroy = () => {
        this.sprite.destroy()
    }

    log (...msgs) {
        const {
            key
        } = this.props
        console.log(`[Thing: ${key}]`, ...msgs)
    }
}
