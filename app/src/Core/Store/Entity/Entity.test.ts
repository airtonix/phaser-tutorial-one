import { EntityModel, EntityMST } from './Entity.model'
import { getEntityActions } from './Entity.actions'

const entityTS = { ...(new EntityModel()) }
const entityMST = EntityMST.actions(self => getEntityActions(self)).create(entityTS)

it('setLevel', () => {
  entityMST.setLevel(100)
  expect(entityMST.level).toBe(100)
  entityMST.setLevel(0)
  expect(entityMST.level).toBe(0)
})

it('addLevel', () => {
  entityMST.addLevel()
  expect(entityMST.level).toBe(1)
})

it('minusLevel', () => {
  entityMST.minusLevel()
  expect(entityMST.level).toBe(0)
})

it('setDamage', () => {
  entityMST.setDamage(100)
  expect(entityMST.damage).toBe(100)
  entityMST.setDamage(0)
  expect(entityMST.damage).toBe(0)
})

it('addDamage', () => {
  entityMST.addDamage()
  expect(entityMST.damage).toBe(1)
})

it('minusDamage', () => {
  entityMST.minusDamage()
  expect(entityMST.damage).toBe(0)
})

it('setDefense', () => {
  entityMST.setDefense(100)
  expect(entityMST.defense).toBe(100)
  entityMST.setDefense(0)
  expect(entityMST.defense).toBe(0)
})

it('addDefense', () => {
  entityMST.addDefense()
  expect(entityMST.defense).toBe(1)
})

it('minusDefense', () => {
  entityMST.minusDefense()
  expect(entityMST.defense).toBe(0)
})

it('setIndestructable', () => {
  entityMST.setIndestructable()
  expect(entityMST.indestructable).toBe(true)
})