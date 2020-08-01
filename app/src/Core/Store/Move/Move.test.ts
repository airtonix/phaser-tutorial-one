import { MoveModel, MoveMST } from './Move.model'
import { getMoveActions } from './Move.actions'

const moveTS = { ...(new MoveModel()) }
const moveMST = MoveMST.actions(self => getMoveActions(self)).create(moveTS)

it('setCooldown', () => {
  moveMST.setCooldown(100)
  expect(moveMST.cooldown).toBe(100)
  moveMST.setCooldown(0)
  expect(moveMST.cooldown).toBe(0)
})

it('addCooldown', () => {
  moveMST.addCooldown(1)
  expect(moveMST.cooldown).toBe(1)
})

it('minusCooldown', () => {
  moveMST.minusCooldown()
  expect(moveMST.cooldown).toBe(0)
})

it('setIsReaction', () => {
  moveMST.setIsReaction()
  expect(moveMST.isReaction).toBe(true)
})

it('addModifier & removeModifier', () => {
  expect(moveMST.modifiers).toHaveLength(0)
  const mods = moveMST.addModifier()
  expect(moveMST.modifiers).toHaveLength(1)
  moveMST.removeModifier(mods[0])
  expect(moveMST.modifiers).toHaveLength(0)
})