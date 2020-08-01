import { PlayerModel, PlayerMST } from './Player.model'
import { getPlayerActions } from './Player.actions'

const playerTS = { ...(new PlayerModel()) }
const playerMST = PlayerMST.actions(self => getPlayerActions(self)).create(playerTS)

it('addCharacter & removeCharacter', () => {
  expect(playerMST.characters).toHaveLength(0)
  const mods = playerMST.addCharacter()
  expect(playerMST.characters).toHaveLength(1)
  playerMST.removeCharacter(mods[0])
  expect(playerMST.characters).toHaveLength(0)
})