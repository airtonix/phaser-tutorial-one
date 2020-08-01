import { IEntity } from './Entity.model'

export const getEntityActions = <T extends IEntity>(self: T) => ({
  setLevel (lvl = 1): number { return self.level = lvl },
  addLevel (lvl = 1): number { return self.level += lvl },
  minusLevel (lvl = 1): number { return self.level -= lvl },
  setDamage (dmg = 0): number { return self.damage = dmg },
  addDamage (dmg = 1): number { return self.damage += dmg },
  minusDamage (dmg = 1): number { return self.damage -= dmg },
  setDefense (def = 0): number { return self.defense = def },
  addDefense (def = 1): number { return self.defense += def },
  minusDefense (def = 1): number { return self.defense -= def },
  setIndestructable (des = true): boolean { return self.indestructable = des },
})
