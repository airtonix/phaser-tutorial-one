import { PlayerModel } from './Player.model'
import { PlayerStore } from './Player.store'

const playerTS = { ...(new PlayerModel()) }
const playerMST = PlayerStore.create(playerTS)

it('addCharacter & removeCharacter', () => {
  expect(playerMST.characters).toHaveLength(0)
  const characters = playerMST.addCharacter()
  expect(playerMST.characters).toHaveLength(1)
  playerMST.removeCharacter(characters[0].id)
  expect(playerMST.characters).toHaveLength(0)
})

it('reveals current inventory', () => {
  expect(playerMST.inventory).toHaveLength(0)
})
