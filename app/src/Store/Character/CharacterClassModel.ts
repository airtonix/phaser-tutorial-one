import {
  prop,
  model,
  Model,
} from 'mobx-keystone'

import { CharacterGameObject } from '~/Objects/Characters/Character'

import { CharacterGoblinModel } from './CharacterGoblinModel'
import { CharacterWarriorModel } from './CharacterWarriorModel'
import { CharacterModel } from './CharacterModel'
import { CharacterClassReference } from './CharacterClassReference'
import { NoCharacterClassError } from './Exceptions'

export const CHARACTER_CLASSES = {
  goblin: CharacterGoblinModel,
  warrior: CharacterWarriorModel
}
export type TypeofCharacter = CharacterGoblinModel | CharacterWarriorModel
export type maybeTypeofCharacter = TypeofCharacter | undefined

export const CHARACTERCLASS_MODEL_KEY = 'CharacterClass'
@model(CHARACTERCLASS_MODEL_KEY)
export class CharacterClassModel extends Model({
  name: prop<string>()
}) {

  createCharacter (): CharacterModel {
    const SelectedCharacterClass = CHARACTER_CLASSES[this.name]
    if (!SelectedCharacterClass) throw new NoCharacterClassError(this.name)

    return new SelectedCharacterClass({
      type: this.name,
      class: CharacterClassReference(this)
    })
  }

}
