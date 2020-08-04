import { types, Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree'
import { Guid } from 'guid-typescript'

import { BaseModel } from '~/Store/BaseModel'
import { PlayerMST, IPlayer, PlayerModel, IPlayerSnapshotIn } from '~/Store/Player/Player.model'

const generatedID = Guid.create().toString()

export const GameMST = types.model('Game', {
  id: types.optional(types.identifier, generatedID),
  player: types.maybeNull(PlayerMST),
})

export interface IGame extends Instance<typeof GameMST> {}
export interface IGameMSTSnapshotIn extends SnapshotIn<typeof GameMST> {}
export interface IGameMSTSnapshotOut extends SnapshotOut<typeof GameMST> {}

export class GameModel extends BaseModel implements IGameMSTSnapshotIn {
  id: string
  player: PlayerModel
}
