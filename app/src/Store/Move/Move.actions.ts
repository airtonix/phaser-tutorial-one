import { IMove } from './Move.model'

import { ModifierModel } from '~/Core/Store/Modifier/Modifier.model'

export const getMoveActions = <T extends IMove>(self: T) => ({
  setCooldown (cd = 0): number { return self.cooldown = cd },
  addCooldown (cd = 1): number { return self.cooldown += cd },
  minusCooldown (cd = 1): number { return self.cooldown -= cd },
  addModifier (mod = new ModifierModel()): string[] {
    self.modifiers.push(mod.id)
    return self.modifiers.slice()
  },
  removeModifier (modId: string): string[] {
    const filtered = self.modifiers.slice().filter(v => v !== modId)
    self.modifiers.replace(filtered)
    return self.modifiers.slice()
  },
  setIsReaction (rac = true): boolean { return self.isReaction = rac }
})

