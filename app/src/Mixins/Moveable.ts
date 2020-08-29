import { get } from 'lodash'

import { WorldEntity } from '~/Objects/WorldEntity'
import { NoWorldEntityError } from '~/Objects/Exceptions'
import { Logs } from '~/Core/Logger'

@Logs
export class Moveable {
  body: Phaser.Physics.Arcade.Body
  prevVelocity = { x: 0, y: 0 }
  isIdle = false

  constructor (
    public entity: WorldEntity,
    private scene: Phaser.Scene,
    public speed = 45,
  ) {
    if (!entity) throw new NoWorldEntityError()

    this.scene.physics.add.existing(entity)
    this.scene.physics.world.enable(entity)
    this.body = entity.body as Phaser.Physics.Arcade.Body
    this.scene.events.on('update', this.update)
  }

  update = (
    time: integer,
    delta: integer
  ): void => {
    this.beforeMove()
    const moving = get(this.entity, 'moving')

    if (this.isMoving) {
      this.entity.setAction('moving')
      if (moving.Down) {
        this.body.setVelocityY(this.speed)
      } else if (moving.Up) {
        this.body.setVelocityY(-this.speed)
      }

      if (moving.Left) {
        this.body.setVelocityX(-this.speed)
      } else if (moving.Right) {
        this.body.setVelocityX(this.speed)
      }
    } else {
      this.entity.setAction('idle')
    }

    this.afterMove()
  }

  /**
   * Looks at the moving directions
   * to see if at least one is currently
   * active
   */
  get isMoving (): boolean {
    const moving = get(this.entity, 'moving')
    return moving && Object.keys(moving).some( key => !!moving[key] )
  }

  get isMovingTo (): string[] {
    const moving = get(this.entity, 'moving', {})
    return Object.keys(moving)
      .filter(key => !!moving[key])
  }

  /**
   * Stop any previous movement from the last frame
   */
  beforeMove (): void {
    this.prevVelocity = this.body.velocity.clone()
    this.body.setVelocity(0)
  }

  /**
   * Prevent a build up of speed
   */
  afterMove (): void {
    const { x, y } = this.prevVelocity
    this.isIdle = (y === 0 && x === 0)

    if (this.isIdle) return
    // Normalize and scale the velocity so that sprite can't move faster along a diagonal
    this.body.velocity.normalize().scale(this.speed)
  }

}
