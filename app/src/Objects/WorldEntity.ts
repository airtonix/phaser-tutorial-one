import { DisplayableEntity, ICharacterAnimationMap } from '~/Mixins/Displayable'
import { Orientation } from '~/Config/constants'
import { ControlStrategy } from '~/Strategies/ControlStrategy'
import { Logs } from '~/Core/Logger'
import { WorldEntityModel } from '~/Store/Entity/EntityModel'
import { BehaviourStrategy } from '~/Behaviours/BehaviourStrategy'

@Logs
export class WorldEntityGameObject extends Phaser.GameObjects.Container {
  key: string
  spriteWidth = 16
  spriteHeight = 16
  footprintWidth = 12
  footprintHeight = 8
  animations: ICharacterAnimationMap
  // orientation: Orientation = Orientation.Right
  orientation: string
  action = 'idle'
  actions: string[]
  renderer: DisplayableEntity
  controller?: ControlStrategy
  behaviour?: BehaviourStrategy
  model: WorldEntityModel

  public init (): void {
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
      this.animations
    )

    this.scene.add.existing(this)
  }

  setControllerStrategy (controller: ControlStrategy): void {
    this.controller = controller
  }

  setBehaviourStrategy (behaviour: BehaviourStrategy): void {
    this.behaviour = behaviour
  }

  setOrientation (orientation: Orientation): void {
    this.orientation = orientation
  }

  setAction (action: string): void {
    this.action = this.actions.includes(action)
      ? action
      : 'default'
  }
}
