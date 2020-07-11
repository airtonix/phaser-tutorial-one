import { BehaviourTree } from 'mistreevous'
import Health from 'phaser-component-health'
import Phaser from 'phaser'
import debug from 'debug'

import { OutlinePipeline } from '~/Shaders/OutlinePipeline'
import { Orientation } from '~/constants'

export class Thing extends Phaser.GameObjects.Container {
    orientation = Orientation.Down
    behaviour = null

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
            behaviours = {},
            behaviourIntervalMs = 100
        } = props
        if (!scene) throw Error(`[${key}] requires a scene`)

        this.props = props
        this.scene = scene
        this.key = key
        this.x = x
        this.y = y
        this.speed = speed
        this.behaviours = behaviours
        this.behaviourIntervalMs = behaviourIntervalMs

        this.log = debug(key)

        this.setX(x)
        this.setY(y)
        this.setSize(footprintWidth, footprintHeight)

        this.sprite = this.addSprite()
        this.health = this.createHealthManager()

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.scene.physics.world.enable(this)

        this.log('constructed')
    }

    createHealthManager () {
        const {
            health = 100,
            maxHealth = 100,
        } = this.props

        const healthManager = Health.AddTo(
            this,
            health,
            maxHealth)

        this.on('die', this.handleDeath)
        this.on('revive', this.handleRevived)
        this.on('healthchange', this.handleHealthChanged)
        this.on('heal', this.handleRecieveHealing)
        this.on('damage', this.handleRecieveDamage)

        return healthManager
    }
    behaviourStep () {
        if (!this.behaviour) {
            this.log('no behaviour')
            return
        }
        if (!(this.behaviour instanceof BehaviourTree)) {
            this.log('behaviour is not a BehaviourTree')
            return
        }
        this.behaviour.step()
    }

    setBehaviour (behaviour) {
        this.log('setBehaviour', behaviour)
        this.behaviour = new BehaviourTree(behaviour, this)
    }

    addSprite() {
        const sprite = this.createSprite()
        this.add(sprite)
        return sprite
    }

    /**
     * https://medium.com/@ionejunhong/sprite-outline-with-phaser-3-9c17190b04bc
     */
    outlineSprite (sprite) {
        sprite.setPipeline(OutlinePipeline.KEY)
        sprite.pipeline.setFloat2(
            'uTextureSize',
            sprite.texture.getSourceImage().width,
            sprite.texture.getSourceImage().height
        )
    }
    createSprite () {
        const {
            width, height,
            idleAnimation
        } = this.props
        this.log('createSprite', { width, height, idleAnimation })

        const animation = idleAnimation[this.orientation] || idleAnimation.all
        const { key, frame } = animation.anim.frames[0]

        const sprite = this.scene.make.sprite(0, 0, key, frame)//new Phaser.GameObjects.Sprite(this.scene, 0, 0, key, frame)
        sprite.setTexture(key)
        sprite.setFrame(frame)
        sprite.setSize(width, height)
        sprite.setOrigin(0.5, 0.9)

        return sprite
    }

    addShadowSprite(color = 0x000000) {
        const sprite = this.createShadowSprite(color)
        this.add(sprite)
        this.moveDown(sprite)
        return sprite
    }

    createShadowSprite(color = 0x000000) {
        const {
            width,
        } = this.props
        const shadow = this.scene.add.graphics()
        const ellipse = new Phaser.Geom.Ellipse(0, 3, width / 1.5, 4)
        shadow.fillStyle(color, 0.4)
        shadow.fillEllipseShape(ellipse)
        return shadow
    }

    handleDeath () {
        if(!this.active) return
        const {
            deathAnimation
        } = this.props
        this.log('handleDeath')
        const sprite = this.sprite

        sprite
            .setActive(false)
            .setVisible(false)

        this.animate(deathAnimation)
    }

    handleRevived () {
        if(!this.active) return
        const {
            reviveAnimation
        } = this.props
        this.log('handleRevived')
        const sprite = this.sprite

        sprite.setActive(true)
        sprite.setVisible(true)

        this.animate(reviveAnimation)
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
        const {
            damageAnimation
        } = this.props
        this.log('handleRecieveDamage')
        this.animate(damageAnimation)
    }

    animate (animations) {
        if(!this.active) return

        const orientation = this.orientation
        const { flip, anim } = animations[orientation] || animations.all || {}
        const sprite = this.sprite

        if (typeof flip !== 'undefined') {
            this.log('flipping sprite', flip)
            sprite.setFlip(flip, false)
        }

        if (anim) {
            this.log('animate', anim )
            const { key } = anim
            sprite.play(key, true, 0)
        }
    }

    destroy = () => {
        this.log('destroy')
        this.setActive(false)
        const sprite = this.sprite

        sprite.anims.currentAnim.pause()
        sprite.destroy()
    }

    update (time, delta) {
        const tick = Math.floor(time % (this.props.behaviourIntervalMs || 1000)) <= 10
        if (tick) {
            this.behaviourStep()
        }
    }
}
