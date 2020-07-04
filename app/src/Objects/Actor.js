/**
 * A class that wraps up our top down player logic. It creates, animates and moves a sprite in
 * response to WASD keys. Call its update method from the scene's update and call its destroy
 * method when you're done with the player.
 */
// import { HealthBar } from './HealthBar'
import { Orientation } from '~/Assets'
import { Thing } from './Thing'

export class Actor extends Thing {
    constructor ({ scene, ...props }) {
        super({
            scene,
            speed: 10,
            ...props
        })
        scene.physics.world.enable(this)
    }

    handleHealthChanged = (obj, amount, health, maxHealth) => {
        super.handleHealthChanged(obj, amount, health, maxHealth)
        // this.healthbar.set(amount)
    }

    moveAndAnimateTo(orientation) {
        switch (orientation) {
        case Orientation.Left:
            this.moveToLeft()
            this.animateLeft()
            break
        case Orientation.Right:
            this.moveToRight()
            this.animateRight()
            break
        case Orientation.Up:
            this.moveToUp()
            this.animateUp()
            break
        case Orientation.Down:
            this.moveToDown()
            this.animateDown()
            break
        }
    }

    moveToLeft = () => {
        const {
            speed
        } = this.props
        this.body.setVelocityX(-speed)
    }

    animateLeft = () => {
        this.preMotion()
        const {
            movingAnimation
        } = this.props
        this.orientation = Orientation.Left
        this.animate(movingAnimation)
    }

    moveToRight = () => {
        const {
            speed
        } = this.props
        this.body.setVelocityX(speed)
    }

    animateRight = () => {
        this.preMotion()
        const {
            movingAnimation
        } = this.props
        this.orientation = Orientation.Right
        this.animate(movingAnimation)
    }

    moveToDown = () => {
        const {
            speed
        } = this.props
        this.body.setVelocityY(speed)
    }

    animateDown = () => {
        this.preMotion()
        const {
            movingAnimation
        } = this.props
        this.orientation = Orientation.Down
        this.animate(movingAnimation)
    }

    moveToUp = () => {
        const {
            speed
        } = this.props
        this.body.setVelocityY(-speed)
    }

    animateUp = () => {
        this.preMotion()
        const {
            movingAnimation
        } = this.props
        this.orientation = Orientation.Up
        this.animate(movingAnimation)
    }

    preMotion () {
        const prevVelocity = this.body.velocity.clone()
        // Stop any previous movement from the last frame
        this.body.setVelocity(0)
        return prevVelocity
    }

    postMotion () {
        if (this.prevVelocity == 0) return
        // Normalize and scale the velocity so that sprite can't move faster along a diagonal
        this.body.velocity.normalize().scale(this.speed)
    }

    stop = () => {
        this.idle()
    }

    idle = () => {
        const {
            idleAnimation
        } = this.props
        this.animate(idleAnimation)
    }

    chooseRandomOrientation = () => {
        const directions = Object.values(Orientation)
        const direction = Math.floor(Math.random() * directions.length)
        return directions[direction]
    }

    // @ts-ignore
    get attentionSpan () {
        return 2000 * Math.random()
    }
    // @ts-ignore
    get boredomTimeout () {
        return 15000 * Math.random()
    }

    isMeandering = false
    meander = () => {
        if (this.isMeandering) return

        this.isMeandering = true
        const orientation = this.chooseRandomOrientation()
        this.log('Meandering', orientation)

        this.moveAndAnimateTo(orientation)

        this.scene.time.addEvent({
            delay: this.attentionSpan,
            callbackScope: this,
            callback: this.stopMeandering
        })
    }

    stopMeandering = () => {
        if (!this.active) return

        this.scene.time.addEvent({
            delay: this.boredomTimeout,
            callbackScope: this,
            callback: () => {
                this.stop()
                this.log('stopMeandering')
                this.isMeandering = false
            }
        })
    }

    freeze = () => {
        this.body.moves = false
    }
}
