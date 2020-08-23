import {
  prop,
  model,
  Model,
} from 'mobx-keystone'

import { Character as CharacterGameObject } from '~/Objects/Characters/Character'

import { CharacterGoblin } from './CharacterGoblinModel'
import { CharacterWarrior } from './CharacterWarriorModel'
import { Character } from './CharacterModel'
import { CharacterClassReference } from './CharacterClassReference'

export const CHARACTER_CLASSES = {
  goblin: CharacterGoblin,
  warrior: CharacterWarrior
}
export type TypeofCharacter = CharacterGoblin | CharacterWarrior
export type maybeTypeofCharacter = TypeofCharacter | undefined

export const CHARACTERCLASS_MODEL_KEY = 'CharacterClass'
@model(CHARACTERCLASS_MODEL_KEY)
export class CharacterClass extends Model({
  name: prop<string>()
}) {

  createCharacter (): Character {
    const CharacterClassModel = CHARACTER_CLASSES[this.name]
    return new CharacterClassModel({
      type: this.name,
      class: CharacterClassReference(this)
    })
  }

}
