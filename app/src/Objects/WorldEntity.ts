import { DisplayableEntity, IAnimations } from '~/Mixins/Displayable'
import { Orientation } from '~/Config/constants'
import { Controllable } from '~/Mixins/Controllable'
import { Logs, LogsAll, logsBefore, logsPropertyBefore } from '~/Core/Logger'

@Logs
export class WorldEntity extends Phaser.GameObjects.Container {
  key: string
  spriteWidth = 16
  spriteHeight = 16
  footprintWidth = 12
  footprintHeight = 8
  orientation: Orientation = Orientation.Right
  animations: IAnimations
  action = 'idle'
  actions: string[]
  renderer: DisplayableEntity
  controller?: Controllable

  init (): void {
    this.setSize(
      this.footprintWidth,
      this.footprintHeight
    )

    this.actions = Object.keys(this.animations)

    this.renderer = new DisplayableEntity(
      this,
      this.scene,
      this.spriteWidth,
      this.spriteHeight,
      this.orientation,
      this.animations
    )

    this.scene.events.on('update', () => {
      this.renderer.animateAction(this.action)
    })
    this.scene.add.existing(this)
  }

  setController (controller: Controllable): void {
    this.controller = controller
  }

  setAction (action: string): void {
    this.action = this.actions.includes(action)
      ? action
      : 'default'
  }
}