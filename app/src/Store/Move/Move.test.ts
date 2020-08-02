import { ModifierModel } from '../Modifier/Modifier.model'

import { MoveModel } from './Move.model'
import { MoveStore } from './Move.store'

const moveTS = { ...(new MoveModel()) }
const moveMST = MoveStore.create(moveTS)

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
  const modifier = new ModifierModel()
  const modifiers = moveMST.addModifier({ ...modifier })
  expect(moveMST.modifiers).toHaveLength(1)
  moveMST.removeModifier(modifier.id)
  expect(moveMST.modifiers).toHaveLength(0)
})