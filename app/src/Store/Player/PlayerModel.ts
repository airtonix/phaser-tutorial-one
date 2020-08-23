import {
  prop,
  model,
  modelAction,
  Model,
  Ref,
} from 'mobx-keystone'

import { } from 'mobx'

import { CharacterClass } from '../Character/CharacterClassModel'

import { CharacterReference } from '~/Store/Character/CharacterReference'
import { Character } from '~/Store/Character/CharacterModel'
import { NoCharacterError, NoCharactersError } from '~/Store/Player/Exceptions'

export const PLAYER_MODEL_KEY = 'Player'

@model(PLAYER_MODEL_KEY)
export class Player extends Model({
  characters: prop<Character[]>(() => []),
  activeCharacter: prop<Ref<Character> | undefined>(),
}) {

  startCharacter (character: Character): void {
    if (character && !this.characters.includes(character)) {
      this.addCharacter(character)
    }
    this.setCharacter(character)
  }

  @modelAction
  createCharacterFromClass (characterClass: CharacterClass) : Character {
    const newCharacter = characterClass.createCharacter()
    if (!newCharacter) throw new NoCharacterError(`${characterClass.$modelType} didn't result in a character model`)
    this.addCharacter(newCharacter)
    return newCharacter
  }

  @modelAction
  addCharacter (character: Character): void {
    this.characters.push(character)
  }

  @modelAction
  setCharacter (character: Character | undefined): void {
    const characters = this.characters
    if (!characters) throw new NoCharactersError()
    if (character && !characters.includes(character)) throw new NoCharacterError

    this.activeCharacter = character
      ? CharacterReference(character)
      : undefined
  }

  get character (): Character | undefined {
    if (!this.characters || !this.characters.length) throw new NoCharactersError()

    if (!this.activeCharacter) throw new NoCharacterError

    return this.activeCharacter
      ? this.activeCharacter.current
      : undefined
  }
}
