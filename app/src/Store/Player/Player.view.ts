import {CharacterModel, ICharacter } from '~/Store/Character/Character.model'

import { IPlayer } from './Player.model'

export const getPlayerViews = <T extends IPlayer>(self: T) => ({

  get inventory () {
    return self.activeCharacter?.inventory?.entities || []
  },

})