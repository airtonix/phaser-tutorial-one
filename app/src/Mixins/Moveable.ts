import { Orientation, IOrientation } from '~/Config/constants'
import { WorldEntity } from '~/Objects/WorldEntity'
import { NoWorldEntityError } from '~/Objects/Exceptions'
import { Logger } from '~/Core/Logger'

const log = Logger(module.id)

export class Moveable {
  body: Phaser.Physics.Arcade.Body
  prevVelocity = { x: 0, y: 0 }
  isIdle = false
  isJumping = false

  constructor (
    public entity: WorldEntity,
    private scene: Phaser.Scene,
    public speed = 45,
    public moving: IOrientation = {
      Left: false,
      Right: false,
      Up: false,
      Down: false,
    }
  ) {
    if (!entity) throw new NoWorldEntityError()

    this.scene.physics.add.existing(entity)
    this.scene.physics.world.enable(entity)
    this.body = entity.body
    this.scene.events.on('update', this.update)
  }

  update = (
    time: integer,
    delta: integer
  ): void => {
    this.beforeMove()

    if (this.isMoving) {
      if (this.moving.Down) {
        this.body.setVelocityY(this.speed)
      } else if (this.moving.Up) {
        this.body.setVelocityY(-this.speed)
      }

      if (this.moving.Left) {
        this.body.setVelocityX(-this.speed)
      } else if (this.moving.Right) {
        this.body.setVelocityX(this.speed)
      }
    }

    this.afterMove()
  }

  get isMoving (): boolean {
    return Object.keys(this.moving).some(Boolean)
  }

  beforeMove (): void {
    this.prevVelocity = this.body.velocity.clone()
    // Stop any previous movement from the last frame
    this.body.setVelocity(0)
  }

  afterMove (): void {
    const { x, y } = this.prevVelocity
    this.isIdle = (y === 0 && x === 0)

    if (this.isIdle) return
    // Normalize and scale the velocity so that sprite can't move faster along a diagonal
    this.body.velocity.normalize().scale(this.speed)
  }

}
