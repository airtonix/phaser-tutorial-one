import { Orientation } from '~/Config/constants'

export class CanMove extends Phaser.GameObjects.Container {
  scene: Phaser.Scene
  body: Phaser.Physics.Arcade.Body
  active: boolean
  prevVelocity = { x: 0, y: 0 }
  speed = 45
  orientation: Orientation
  isIdle = false
  isMoving = false
  isJumping = false

  constructor (
    scene: Phaser.Scene,
    x = 0,
    y = 0
  ) {
    super(scene, x, y)

    if (!this.body) {
      this.scene.physics.add.existing(this)
      this.scene.physics.world.enable(this)
    }

    scene.events.on('update', this.update)
  }

  go (direction: Orientation): void {
    switch (direction) {
      case Orientation.Left:
        this.body.setVelocityX(-this.speed)
        break
      case Orientation.Right:
        this.body.setVelocityX(this.speed)
        break
      case Orientation.Up:
        this.body.setVelocityY(-this.speed)
        break
      case Orientation.Down:
        this.body.setVelocityY(this.speed)
        break
      default:
        break
    }
  }

  update = (
    time: integer,
    delta: integer
  ): void => {
    // if (!this.body) return

    super.update(time, delta)
    this.beforeMove()

    if (this.isMoving) {
      if (this.orientation === Orientation.Down) {
        this.body.setVelocityY(this.speed)
      } else if (this.orientation === Orientation.Up) {
        this.body.setVelocityY(-this.speed)
      }

      if (this.orientation === Orientation.Left) {
        this.body.setVelocityX(-this.speed)
      } else if (this.orientation === Orientation.Right) {
        this.body.setVelocityX(this.speed)
      }
    }

    this.afterMove()
  }

  idle = (): void => {
    if (!this.active) return
    this.isMoving = false
  }

  beforeMove (): void {
    if (!this.active) return
    this.prevVelocity = this.body.velocity.clone()
    // Stop any previous movement from the last frame
    this.body.setVelocity(0)
  }

  afterMove (): void {
    const { x, y } = this.prevVelocity
    this.isIdle = (y === 0 && x === 0)

    if (this.isIdle || !this.active) return
    // Normalize and scale the velocity so that sprite can't move faster along a diagonal
    this.body.velocity.normalize().scale(this.speed)
  }

}
