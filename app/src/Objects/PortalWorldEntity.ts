import Phaser from 'phaser'
import { debounce } from 'lodash'

import { Store } from '~/Store'
import { PortalModel } from '~/Store/Entity/PortalEntityModel'

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
  model: PortalModel

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
    // this.drawIndicator()

    this.add([
      this.indicator,
    ])

    scene.physics.world.enable(this)
    this.body.setAllowGravity(false)
    this.body.moves = false

    scene.add.existing(this)

    this.on('overlap', this.handleOverlap)
    scene.events.on('update', this.update, this)
    scene.events.once('shutdown', this.destroy, this)
  }

  destroy (): void {
    if (this.scene) this.scene.events.off('update', this.update, this);
    super.destroy();
  }

  update = (): void => {
    // this.drawIndicator()
  }

  drawIndicator = () : void => {
    this.indicator.lineStyle(
      1, 0x6699ff, 0.4
    )
    this.indicator.strokeRectShape(this.zoneShape)
  }

  handleOverlap = (...actors: Phaser.GameObjects.GameObject[]): void => {
    if (this.model && this.model.target) {
      this.teleportActor()
    }
  }

  teleportActor = debounce(() => {
    this.scene.cameras.main.fadeOut(300, 0, 0, 0)
    this.scene.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        const targetPortal = this.model && this.model.target
        if (!targetPortal) return

        const character = Store.player && Store.player.character
        if (!character) return

        const x = targetPortal.x + targetPortal.width / 2
        const y = targetPortal.y + targetPortal.height / 2

        character.setDepth(targetPortal.depth)
        character.setPosition(x, y)
        character.setZone(targetPortal.fromZone)
      })
  }, 500, {
    leading: true,
    trailing: false
  })
}
