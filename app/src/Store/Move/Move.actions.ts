import { ModifierModel, IModifier } from '~/Store/Modifier/Modifier.model'

import { IMove } from './Move.model'

export const getMoveActions = <T extends IMove>(self: T) => ({
  setCooldown (cd = 0): number { return self.cooldown = cd },
  addCooldown (cd = 1): number { return self.cooldown += cd },
  minusCooldown (cd = 1): number { return self.cooldown -= cd },
  addModifier (modifier = new ModifierModel()): IModifier[] {
    self.modifiers.push(modifier)
    return self.modifiers.slice()
  },
  removeModifier (modifierId: string): IModifier[] {
    const filtered = self.modifiers.slice()
      .filter(modifier => modifier.id !== modifierId)
    self.modifiers.replace(filtered)
    return self.modifiers.slice()
  },
  setIsReaction (rac = true): boolean { return self.isReaction = rac }
})
