import { PlayerModel, IPlayer} from '~/Store/Player/Player.model'

import { IGame } from './Game.model'

export const getGameActions = <T extends IGame>(self: T) => ({
  setPlayer (player: IPlayer = new PlayerModel()): PlayerModel {
    self.player = { ...player }
    return player
  },
  afterCreate () {
    console.log('Created a new todo!')
  }
})
