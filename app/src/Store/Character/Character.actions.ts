import { ModifierModel, IModifier } from '~/Store/Modifier/Modifier.model'
import { MoveModel, IMove } from '~/Store/Move/Move.model'

import { ICharacter } from './Character.model'

export const getCharacterActions = <T extends ICharacter>(self: T) => ({
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
  setHitPoints (hp = 100): number { return self.hitPoints = hp },
  addModifier (mod = new ModifierModel()): IModifier[] {
    self.modifiers.push({ ...mod })
    return self.modifiers.slice()
  },
  removeModifier (modifierId: string): IModifier[] {
    const filtered = self.modifiers.slice()
      .filter(modifier => modifier.id !== modifierId)
    self.modifiers.replace(filtered)
    return self.modifiers.slice()
  },
  addMove (move = new MoveModel()): IMove[] {
    self.moves.push({ ...move })
    return self.moves.slice()
  },
  removeMove (moveId: string): IMove[] {
    const filtered = self.moves.slice()
      .filter(move => move.id !== moveId)
    self.moves.replace(filtered)
    return self.moves.slice()
  }
})

export default getCharacterActions
