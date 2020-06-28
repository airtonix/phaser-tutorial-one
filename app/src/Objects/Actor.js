/**
 * A class that wraps up our top down player logic. It creates, animates and moves a sprite in
 * response to WASD keys. Call its update method from the scene's update and call its destroy
 * method when you're done with the player.
 */
import { HealthBar } from './HealthBar'

import { Thing } from './Thing'

export class Actor extends Thing {

    static SPRITE_SHEET_NAME = 'actors'

    static WALK_FORWARD_NAME = 'actor-walk-forward'
    static WALK_FORWARD_FRAME_START = 46
    static WALK_FORWARD_FRAME_END = 49
    static WALK_FORWARD_FRAME_RATE = 8
    static WALK_FORWARD_FRAME_REPEAT = -1

    static WALK_BACKWARD_NAME = 'actor-walk-backward'
    static WALK_BACKWARD_FRAME_START = 65
    static WALK_BACKWARD_FRAME_END = 68
    static WALK_BACKWARD_FRAME_RATE = 8
    static WALK_BACKWARD_FRAME_REPEAT = -1

    static IDLE_ANIMATION_NAME = 'actor-idle'
    static IDLE_ANIMATION_FRAME_START = 65
    static IDLE_ANIMATION_FRAME_END = 65
    static IDLE_ANIMATION_FRAME_RATE = 30

    static STOPPING_ANIMATION_NAME = 'actor-stopping'
    static STOPPING_ANIMATION_FRAME_START = 46
    static STOPPING_ANIMATION_FRAME_END = 46
    static STOPPING_ANIMATION_FRAME_RATE = 30

    constructor (props) {
        super(props)
        this.props = props
        this.healthbar = new HealthBar(this.scene, this)
        this.add([
            this.healthbar
        ])
        this.scene.add.existing(this.healthbar)
    }

    createSprite = () => {
        super.createSprite()

        const anims = this.scene.anims

        anims.create({
            key: this.constructor.WALK_BACKWARD_NAME,
            frames: anims.generateFrameNumbers(
                this.constructor.SPRITE_SHEET_NAME,
                {
                    start: this.constructor.WALK_BACKWARD_FRAME_START,
                    end: this.constructor.WALK_BACKWARD_FRAME_END
                }),
            frameRate: this.constructor.WALK_BACKWARD_FRAME_RATE,
            repeat: this.constructor.WALK_BACKWARD_FRAME_REPEAT
        })

        anims.create({
            key: this.constructor.WALK_FORWARD_NAME,
            frames: anims.generateFrameNumbers(
                this.constructor.SPRITE_SHEET_NAME,
                {
                    start: this.constructor.WALK_FORWARD_FRAME_START,
                    end: this.constructor.WALK_FORWARD_FRAME_END
                }),
            frameRate: this.constructor.WALK_FORWARD_FRAME_RATE,
            repeat: this.constructor.WALK_FORWARD_FRAME_REPEAT
        })

        const sprite = this.scene.add
            .sprite(
                0,
                -22,
                this.constructor.SPRITE_SHEET_NAME,
                0)
            .setSize(22, 33)

        return sprite
    }

    handleDeath = () => {
        super.handleDeath()
        this.healthbar.set(0)
    }

    handleRevive = () => {
        super.handleRevived()
        this.healthbar.set(this.health.max)
    }

    handleHealthChanged = (obj, amount, health, maxHealth) => {
        super.handleHealthChanged(obj, amount, health, maxHealth)
        this.healthbar.set(amount)
    }

    handleRecieveHealing = () => {
        super.handleRecieveHealing()
    }

    handleRecieveDamage = () => {
        super.handleRecieveDamage()
    }

    moveLeft = () => {
        this.preMove()

        const animation_name = this.constructor.WALK_FORWARD_NAME

        this.body.setVelocityX(-this.speed)
        this.sprite.setFlipX(true)
        this.sprite.anims.play(animation_name, true)

    }

    moveRight = () => {
        this.preMove()

        const animation_name = this.constructor.WALK_FORWARD_NAME

        this.body.setVelocityX(this.speed)
        this.sprite.setFlipX(false)
        this.sprite.anims.play(animation_name, true)

    }

    moveDown = () => {
        this.preMove()

        const animation_name = this.constructor.WALK_FORWARD_NAME

        this.body.setVelocityY(this.speed)
        this.sprite.anims.play(animation_name, true)

    }

    moveUp = () => {
        this.preMove()

        const animation_name = this.constructor.WALK_BACKWARD_NAME

        this.body.setVelocityY(-this.speed)
        this.sprite.anims.play(animation_name, true)

    }

    stop = () => {
        this.sprite.anims.stop()
        this.sprite.setTexture(
            this.constructor.SPRITE_SHEET_NAME,
            this.constructor.STOPPING_ANIMATION_FRAME_START)
    }

    idle = () => {
        this.sprite.anims.stop()
        this.sprite.setTexture(
            this.constructor.SPRITE_SHEET_NAME,
            this.constructor.IDLE_ANIMATION_FRAME_START)
    }

    freeze = () => {
        this.body.moves = false
    }

    preMove = () => {
        const prevVelocity = this.body.velocity.clone()
        // Stop any previous movement from the last frame
        this.body.setVelocity(0)
        return prevVelocity
    }

    postMove = () => {
        // Normalize and scale the velocity so that sprite can't move faster along a diagonal
        this.body.velocity.normalize().scale(this.speed)
    }

    destroy = () => {
        this.sprite.destroy()
    }

    update = () => {
    }
}
