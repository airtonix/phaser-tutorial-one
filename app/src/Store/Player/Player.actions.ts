import {CharacterModel, ICharacter } from '~/Store/Character/Character.model'

import { IPlayer } from './Player.model'

export const getPlayerActions = <T extends IPlayer>(self: T) => ({

  addCharacter (character = new CharacterModel()): ICharacter[] {
    self.characters.push({ ...character })
    return self.characters.slice()
  },

  removeCharacter (characterId = ''): ICharacter[] {
    const filtered = self.characters.slice()
      .filter(character => character.id !== characterId)
    self.characters.replace(filtered)
    return self.characters.slice()
  }
})

