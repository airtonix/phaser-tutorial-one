import { WorldEntityGameObject } from '../WorldEntity'

import { Moveable } from '~/Mixins/Moveable'
import { CharacterModel } from '~/Store/Character/CharacterModel'

export class CharacterGameObject extends WorldEntityGameObject {
  public speed = 45
  public movement: Moveable
  public model: CharacterModel
  
  init (): void {
    super.init()
    this.movement = new Moveable(
      this,
      this.scene,
      this.speed
    )
  }

}
