import { GameMST, GameModel } from './Game/Game.model'
import { GameStore } from './Game/Game.store'

const gameTS = new GameModel()
export const Store = GameStore
    .create({ ...gameTS })

window.Store = Store