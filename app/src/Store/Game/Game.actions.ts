import { PlayerModel, IPlayer, IPlayerSnapshotIn} from '~/Store/Player/Player.model'

import { IGame } from './Game.model'

export const STORAGE_KEY = 'SOMESPECIALKEY'

export const getGameActions = <T extends IGame>(self: T) => ({
  afterCreate () {
    console.log('afterCreate')
    const save = localStorage.getItem(STORAGE_KEY)
    console.log(save
      ? JSON.parse(save)
      : {})
  }
})
