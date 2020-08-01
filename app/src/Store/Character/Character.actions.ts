import { ICharacter } from './Character.model'

import { ModifierModel } from '~/Core/Store/Modifier/Modifier.model'
import { MoveModel } from '~/Core/Store/Move/Move.model'

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
  addModifier (mod = new ModifierModel()): string[] {
    self.modifiers.push(mod.id)
    return self.modifiers.slice()
  },
  removeModifier (modId: string): string[] {
    const filtered = self.modifiers.slice().filter(v => v !== modId)
    self.modifiers.replace(filtered)
    return self.modifiers.slice()
  },
  addMove (move = new MoveModel()): string[] {
    self.moves.push(move.id)
    return self.moves.slice()
  },
  removeMove (moveId: string): string[] {
    const filtered = self.moves.slice().filter(v => v !== moveId)
    self.moves.replace(filtered)
    return self.moves.slice()
  }
})

export default getCharacterActions
