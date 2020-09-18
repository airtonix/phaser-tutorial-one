import {
  prop,
  model,
  modelAction,
  Model,
  Ref,
} from 'mobx-keystone'

import { } from 'mobx'

import { CharacterClassModel } from '../Character/CharacterClassModel'
import { NoActiveCharacterError, CharacterModelNotInStateTreeError } from '../Character/Exceptions'

import { CharacterReference } from '~/Store/Character/CharacterReference'
import { CharacterModel } from '~/Store/Character/CharacterModel'
import { NoCharacterError, NoCharactersError } from '~/Store/Player/Exceptions'

export const PLAYER_MODEL_KEY = 'Player'

@model(PLAYER_MODEL_KEY)
export class Player extends Model({
  characters: prop<CharacterModel[]>(() => []),
  activeCharacter: prop<Ref<CharacterModel> | undefined>(),
}) {

  startCharacter (character: CharacterModel): void {
    if (!this.characters.includes(character)) {
      this.addCharacter(character)
    }
    this.setCharacter(character)
  }

  @modelAction
  createCharacterFromClass (characterClass: CharacterClassModel) : CharacterModel {
    const newCharacter = characterClass.createCharacter()
    if (!newCharacter) throw new NoCharacterError(`${characterClass.$modelType} didn't result in a character model`)
    this.addCharacter(newCharacter)
    return newCharacter
  }

  @modelAction
  addCharacter (character: CharacterModel): void {
    this.characters.push(character)
  }

  @modelAction
  setCharacter (character: CharacterModel): void {
    const characters = this.characters
    if (!characters) throw new NoCharactersError()
    if (character && !characters.includes(character)) throw new CharacterModelNotInStateTreeError()

    this.activeCharacter = character
      ? CharacterReference(character)
      : undefined
  }

  get character (): CharacterModel | undefined {
    return this.activeCharacter
      ? this.activeCharacter.current
      : undefined
  }
}
