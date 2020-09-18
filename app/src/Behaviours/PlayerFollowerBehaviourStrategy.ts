import { CharacterGameObject } from '~/Objects/Characters/Character'

import { BehaviourStrategy } from './BehaviourStrategy'
import { PlayerFollowerBehaviour } from './PlayerFollowerBehaviour'

export class PlayerFollowerBehaviourStrategy extends BehaviourStrategy {
  behaviour = PlayerFollowerBehaviour

  constructor (
    public character: CharacterGameObject,
    public player: CharacterGameObject
  ) {
    super(character)
  }
}