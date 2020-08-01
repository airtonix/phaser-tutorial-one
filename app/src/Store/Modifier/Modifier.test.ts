import { ModifierModel, ModifierMST } from './Modifier.model'
import { getModifierActions } from './Modifier.actions'

const modifierTS = { ...(new ModifierModel()) }
const modifierMST = ModifierMST.actions(self => getModifierActions(self)).create(modifierTS)

it('setLevel', () => {
  modifierMST.setLevel(100)
  expect(modifierMST.level).toBe(100)
  modifierMST.setLevel(0)
  expect(modifierMST.level).toBe(0)
})

it('addLevel', () => {
  modifierMST.addLevel()
  expect(modifierMST.level).toBe(1)
})

it('minusLevel', () => {
  modifierMST.minusLevel()
  expect(modifierMST.level).toBe(0)
})

it('setDamage', () => {
  modifierMST.setDamage(100)
  expect(modifierMST.damage).toBe(100)
  modifierMST.setDamage(0)
  expect(modifierMST.damage).toBe(0)
})

it('addDamage', () => {
  modifierMST.addDamage()
  expect(modifierMST.damage).toBe(1)
})

it('minusDamage', () => {
  modifierMST.minusDamage()
  expect(modifierMST.damage).toBe(0)
})

it('setDefense', () => {
  modifierMST.setDefense(100)
  expect(modifierMST.defense).toBe(100)
  modifierMST.setDefense(0)
  expect(modifierMST.defense).toBe(0)
})

it('addDefense', () => {
  modifierMST.addDefense()
  expect(modifierMST.defense).toBe(1)
})

it('minusDefense', () => {
  modifierMST.minusDefense()
  expect(modifierMST.defense).toBe(0)
})