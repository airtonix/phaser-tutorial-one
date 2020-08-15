import Phaser from 'phaser'

import { WritesLogs } from '~/Mixins/WritesLogs'
import { Store } from '~/Store'
import { debounce } from 'lodash'

@WritesLogs
export class PortalWorldEntity extends Phaser.GameObjects.Container {
  zone: Phaser.GameObjects.Zone

  body: Phaser.Physics.Arcade.Body

  /**
   * The shape of the collision area
   */
  zoneShape: Phaser.Geom.Rectangle

  /**
   * Visual indicator
   */
  indicator: Phaser.GameObjects.Graphics

  /**
   * The datamodel
   */
  model: PortalWorldEntity

  key = 'Portal'

  constructor (
    scene: Phaser.Scene,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    // make a container so we can add visual objects later
    super(
      scene,
      x + (w / 2),
      y + (h / 2),
    )
    this.setSize(w || 4, h || 4)

    this.zoneShape = new Phaser.Geom.Rectangle(
      -( w / 2 ),
      -( h / 2 ),
      w, h
    )

    this.indicator = new Phaser.GameObjects.Graphics(scene)
    this.drawIndicator()

    this.add([
      this.indicator,
    ])

    scene.physics.world.enable(this)
    this.body.setAllowGravity(false)
    this.body.moves = false

    scene.add.existing(this)

    this.on('overlap', this.handleOverlap)
  }

  update = (): void => {
    this.drawIndicator({
      touching: this.body.touching.none
    })
  }

  drawIndicator = ({
    touching = false
  } = {}) : void => {
    this.indicator.lineStyle(
      touching
        ? 2
        : 1,
      touching
        ? 0xffffff
        : 0x6699ff,
      touching
        ? 1
        : 0.4
    )
    this.indicator.strokeRectShape(this.zoneShape)

  }

  handleOverlap = (...actors: Phaser.GameObjects.GameObject[]): void => {
    this.teleportActor(...actors)
  }

  teleportActor = debounce((actor, ...actors) => {
    const targetPortal = this.model?.target
    this.log(this.model, `teleporting`, actor)

    if (!targetPortal) return

    const x = targetPortal.x + targetPortal.width / 2
    const y = targetPortal.y + targetPortal.height / 2

    Store.player?.character?.setDepth(targetPortal.depth)
    Store.player?.character?.setPosition(x, y)
    Store.player?.character?.setZone(targetPortal.fromZone)

  }, 500, {
    leading: true,
    trailing: false
  })
}
