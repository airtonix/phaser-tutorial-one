import { ActorModel, ActorMST } from './Actor.model'
import { getActorActions } from './Actor.actions'

const actorTS = { ...(new ActorModel()) }
const actorMST = ActorMST.actions(self => getActorActions(self)).create(actorTS)

it('setLevel', () => {
  actorMST.setLevel(100)
  expect(actorMST.level).toBe(100)
  actorMST.setLevel(0)
  expect(actorMST.level).toBe(0)
})

it('addLevel', () => {
  actorMST.addLevel()
  expect(actorMST.level).toBe(1)
})

it('minusLevel', () => {
  actorMST.minusLevel()
  expect(actorMST.level).toBe(0)
})

it('setDamage', () => {
  actorMST.setDamage(100)
  expect(actorMST.damage).toBe(100)
  actorMST.setDamage(0)
  expect(actorMST.damage).toBe(0)
})

it('addDamage', () => {
  actorMST.addDamage()
  expect(actorMST.damage).toBe(1)
})

it('minusDamage', () => {
  actorMST.minusDamage()
  expect(actorMST.damage).toBe(0)
})

it('setDefense', () => {
  actorMST.setDefense(100)
  expect(actorMST.defense).toBe(100)
  actorMST.setDefense(0)
  expect(actorMST.defense).toBe(0)
})

it('addDefense', () => {
  actorMST.addDefense()
  expect(actorMST.defense).toBe(1)
})

it('minusDefense', () => {
  actorMST.minusDefense()
  expect(actorMST.defense).toBe(0)
})

it('setIndestructable', () => {
  actorMST.setIndestructable()
  expect(actorMST.indestructable).toBe(true)
})

it('setHitPoints', () => {
  actorMST.setHitPoints(0)
  expect(actorMST.hitPoints).toBe(0)
})
