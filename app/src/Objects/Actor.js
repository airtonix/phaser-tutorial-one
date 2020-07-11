// import { HealthBar } from './HealthBar'
import { Orientation } from '~/constants'
import { Thing } from './Thing'

export class Actor extends Thing {
    constructor({ scene, ...props }) {
        super({
            scene,
            speed: 10,
            ...props
        })

        this.prevVelocity = { x: 0, y: 0 }
        this.isIdle = false
        this.isMoving = false
    }

    handleHealthChanged = (obj, amount, health, maxHealth) => {
        if (!this.active) return

        super.handleHealthChanged(obj, amount, health, maxHealth)
        // this.healthbar.set(amount)
    }

    moveAndAnimateToOrientation(orientation) {
        if (!this.active) return

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
        if (!this.active) return
        const {
            speed
        } = this.props
        // @ts-ignore
        this.log('moveToLeft', -speed, this.prevVelocity)
        this.body.setVelocityX(-speed)
    }

    animateLeft = () => {
        if (!this.active) return

        const {
            movingAnimation
        } = this.props
        this.orientation = Orientation.Left
        this.animate(movingAnimation)
    }

    moveToRight = () => {
        if (!this.active) return

        const {
            speed
        } = this.props
        // @ts-ignore
        this.log('moveToRight', speed, this.prevVelocity)
        this.body.setVelocityX(speed)
    }

    animateRight = () => {
        if (!this.active) return

        const {
            movingAnimation
        } = this.props
        this.orientation = Orientation.Right
        this.animate(movingAnimation)
    }

    moveToDown = () => {
        if (!this.active) return

        const {
            speed
        } = this.props
        // @ts-ignore
        this.log('moveToDown', speed, this.prevVelocity)
        this.body.setVelocityY(speed)
    }

    animateDown = () => {
        if (!this.active) return

        const {
            movingAnimation
        } = this.props
        this.orientation = Orientation.Down
        this.animate(movingAnimation)
    }

    moveToUp = () => {
        if (!this.active) return

        const {
            speed
        } = this.props
        // @ts-ignore
        this.log('moveToUp', speed, this.prevVelocity)
        this.body.setVelocityY(-speed)
    }

    animateUp = () => {
        if (!this.active) return
        const {
            movingAnimation
        } = this.props
        this.orientation = Orientation.Up
        this.animate(movingAnimation)
    }

    preMotion() {
        if (!this.active) return

        // @ts-ignore
        this.prevVelocity = this.body.velocity.clone()
        // Stop any previous movement from the last frame
        // @ts-ignore
        this.body.setVelocity(0)
    }

    postMotion() {
        if (!this.active) return
        const { x, y } = this.prevVelocity
        this.isIdle = (y === 0 && x === 0)

        if (this.isIdle) return

        // Normalize and scale the velocity so that sprite can't move faster along a diagonal
        // @ts-ignore
        this.body.velocity.normalize().scale(this.speed)
    }

    stop = () => {
        if (!this.active) return

        this.log('stop')
        this.idle()
    }

    idle = () => {
        if (!this.active) return

        const {
            idleAnimation
        } = this.props

        this.log('idle')
        this.animate(idleAnimation)
        this.isIdle = true
    }

    chooseRandomOrientation = () => {
        const directions = Object.values(Orientation)
        const direction = Math.floor(Math.random() * directions.length)
        return directions[direction]
    }

    // @ts-ignore
    get attentionSpan() {
        return 2000 * Math.random()
    }
    // @ts-ignore
    get boredomTimeout() {
        return 15000 * Math.random()
    }

    isMeandering = false
    meander = () => {
        if (!this.active || this.isMeandering) return

        this.isMeandering = true
        this.orientation = this.chooseRandomOrientation()
        this.log('Meandering', this.orientation)

        this.moveAndAnimateToOrientation(this.orientation)

        this.scene.time.addEvent({
            delay: this.attentionSpan,
            callbackScope: this,
            callback: this.stopMeandering
        })
    }

    stopMeandering = () => {
        if (!this.active) return

        this.stop()

        this.scene.time.addEvent({
            delay: this.boredomTimeout,
            callbackScope: this,
            callback: () => {
                this.isMeandering = false
            }
        })
    }

    freeze = () => {
        // @ts-ignore
        this.body.moves = false
    }
}
