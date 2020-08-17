import { Constructor } from '~/Core/framework'
import { Orientation } from '~/Config/constants'

import { WritesLogs } from './WritesLogs'


export function CanMove<TBase extends Constructor> (Base: TBase) {

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
      if (!this.body) {
        this.scene.physics.add.existing(this)
        this.scene.physics.world.enable(this)
      }
    }

    update (time: integer, delta: integer) {
      // if (!this.body) return

      super.update(time, delta)
      this.beforeMove()

      if (this.isMoving) {
        if (this.orientation === Orientation.Down) {
          this.log('moveToDown', this.speed, this.prevVelocity)
          this.body.setVelocityY(this.speed)
        } else if (this.orientation === Orientation.Up) {
          this.log('moveToUp', this.speed, this.prevVelocity)
          this.body.setVelocityY(-this.speed)
        }

        if (this.orientation === Orientation.Left) {
          this.log('moveToLeft', -this.speed, this.prevVelocity)
          this.body.setVelocityX(-this.speed)
        } else if (this.orientation === Orientation.Right) {
          this.log('moveToRight', this.speed, this.prevVelocity)
          this.body.setVelocityX(this.speed)
        }
      }

      this.afterMove()
    }

    moveToLeft = () => {
      this.orientation = Orientation.Left
    }

    moveToRight = () => {
      this.orientation = Orientation.Right
    }

    moveToDown = () => {
      this.orientation = Orientation.Down
    }

    moveToUp = () => {
      this.orientation = Orientation.Up
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
      this.isMoving = false
    }

    beforeMove () {
      if (!this.active) return
      this.prevVelocity = this.body.velocity.clone()
      // Stop any previous movement from the last frame
      this.body.setVelocity(0)
    }

    afterMove () {
      const { x, y } = this.prevVelocity
      this.isIdle = (y === 0 && x === 0)

      if (this.isIdle || !this.active) return
      // Normalize and scale the velocity so that sprite can't move faster along a diagonal
      this.body.velocity.normalize().scale(this.speed)
    }

  }
}
