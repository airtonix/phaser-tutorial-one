import { IPlayer } from './Player.model'

import Character from '~/Core/Store/Character/Character.model'

export const getPlayerActions = <T extends IPlayer>(self: T) => ({

  addCharacter (char = new Character()): string[] {
    self.characters.push(char.id)
    return self.characters.slice()
  },

  removeCharacter (charId = ''): string[] {
    const filtered = self.characters.slice().filter(v => v !== charId)
    self.characters.replace(filtered)
    return self.characters.slice()
  }
})

