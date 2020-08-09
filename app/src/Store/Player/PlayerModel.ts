import {
  prop,
  model,
  modelAction,
  Model,
  Ref,
} from 'mobx-keystone'

import { } from 'mobx'

import { CharacterReference } from '~/Store/Character/CharacterReference'
import { Character } from '~/Store/Character/CharacterModel'
import { NoCharacterError, NoCharactersError } from '~/Store/Player/Exceptions'

export const PLAYER_MODEL_KEY = 'Player'

@model(PLAYER_MODEL_KEY)
export class Player extends Model({
  characters: prop<Character[]>(() => []),
  activeCharacter: prop<Ref<Character> | undefined>(),
}) {
  onAttachedToRootStore (): void {
    const newCharacter = new Character({
      name: 'Test',
      type: 'Warrior',
      hp: 100,
      icon: ''
    })

    this.addCharacter(newCharacter)
    this.setCharacter(newCharacter)
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
