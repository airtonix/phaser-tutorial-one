import { GameStore } from './Game.store'
import { GameModel } from './Game.model'

const gameTS = { ...(new GameModel()) }
const gameMST = GameStore.create(gameTS)

it('exists', () => {
  expect(gameMST).toBeDefined()
})
