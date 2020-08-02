import { CharacterModel, CharacterMST } from './Character.model'
import { getCharacterActions } from './Character.actions'

const characterTS = { ...(new CharacterModel()) }
const characterMST = CharacterMST.actions(self => getCharacterActions(self)).create(characterTS)

it('setLevel', () => {
  characterMST.setLevel(100)
  expect(characterMST.level).toBe(100)
  characterMST.setLevel(0)
  expect(characterMST.level).toBe(0)
})

it('addLevel', () => {
  characterMST.addLevel()
  expect(characterMST.level).toBe(1)
})

it('minusLevel', () => {
  characterMST.minusLevel()
  expect(characterMST.level).toBe(0)
})

it('setDamage', () => {
  characterMST.setDamage(100)
  expect(characterMST.damage).toBe(100)
  characterMST.setDamage(0)
  expect(characterMST.damage).toBe(0)
})

it('addDamage', () => {
  characterMST.addDamage()
  expect(characterMST.damage).toBe(1)
})

it('minusDamage', () => {
  characterMST.minusDamage()
  expect(characterMST.damage).toBe(0)
})

it('setDefense', () => {
  characterMST.setDefense(100)
  expect(characterMST.defense).toBe(100)
  characterMST.setDefense(0)
  expect(characterMST.defense).toBe(0)
})

it('addDefense', () => {
  characterMST.addDefense()
  expect(characterMST.defense).toBe(1)
})

it('minusDefense', () => {
  characterMST.minusDefense()
  expect(characterMST.defense).toBe(0)
})

it('setIndestructable', () => {
  characterMST.setIndestructable()
  expect(characterMST.indestructable).toBe(true)
})

it('setHitPoints', () => {
  characterMST.setHitPoints(0)
  expect(characterMST.hitPoints).toBe(0)
})

it('addModifier & removeModifier', () => {
  expect(characterMST.modifiers).toHaveLength(0)
  const mods = characterMST.addModifier()
  expect(characterMST.modifiers).toHaveLength(1)
  characterMST.removeModifier(mods[0].id)
  expect(characterMST.modifiers).toHaveLength(0)
})

it('addMove & removeMove', () => {
  expect(characterMST.moves).toHaveLength(0)
  const moves = characterMST.addMove()
  expect(characterMST.moves).toHaveLength(1)
  characterMST.removeMove(moves[0].id)
  expect(characterMST.moves).toHaveLength(0)
})