import { Constructor } from '~/Core/framework'
import { WritesLogs } from "./WritesLogs"

export function CanMove<TBase extends Constructor>(Base: TBase) {

    return class CanMove extends WritesLogs(Base) {
        scene: Phaser.Scene
        body: any
        active: boolean
        prevVelocity = { x: 0, y: 0 }
        speed = 45

        isIdle = false
        isMoving = false
        isJumping = false

        constructor (...args: any[]) {
            super(args[0], args[1], args[2])
            this.log('CanMove')
            this.scene.physics.add.existing(this)
            this.scene.physics.world.enable(this)
        }

        moveToLeft = () => {
            if (!this.active) return
            this.log('moveToLeft', -this.speed, this.prevVelocity)
            this.body.setVelocityX(-this.speed)
        }

        moveToRight = () => {
            if (!this.active) return
            this.log('moveToRight', this.speed, this.prevVelocity)
            this.body.setVelocityX(this.speed)
        }

        moveToDown = () => {
            if (!this.active) return

            // @ts-ignore
            this.log('moveToDown', this.speed, this.prevVelocity)
            this.body.setVelocityY(this.speed)
        }

        moveToUp = () => {
            if (!this.active) return

            // @ts-ignore
            this.log('moveToUp', this.speed, this.prevVelocity)
            this.body.setVelocityY(-this.speed)
        }

        jump = () => {
            if (!this.active) return
            this.isJumping = true
            this.sprite.setY(this.sprite.y-0.3)
            this.shadow.scale = 0.8
            this.scene.time.addEvent({
                delay: 800,
                callbackScope: this,
                callback: () => {
                    this.isJumping = false
                    this.sprite.setY(this.sprite.y+0.3)
                    this.shadow.scale = 1
                }
            })
        }
        idle = () => {
            if (!this.active) return
        }

        beforeMove() {
            if (!this.active) return

            // @ts-ignore
            this.prevVelocity = this.body.velocity.clone()
            // Stop any previous movement from the last frame
            // @ts-ignore
            this.body.setVelocity(0)
        }

        afterMove() {
            if (!this.active) return
            const { x, y } = this.prevVelocity
            this.isIdle = (y === 0 && x === 0)

            if (this.isIdle) return

            // Normalize and scale the velocity so that sprite can't move faster along a diagonal
            // @ts-ignore
            this.body.velocity.normalize().scale(this.speed)
        }

    }
}
