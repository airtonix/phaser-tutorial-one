import { WorldEntityGameObject } from '../WorldEntity'

import { Moveable } from '~/Mixins/Moveable'

export class CharacterGameObject extends WorldEntityGameObject {
  public speed = 45
  public movement: Moveable

  init (): void {
    super.init()
    this.movement = new Moveable(
      this,
      this.scene,
      this.speed
    )
  }

}
