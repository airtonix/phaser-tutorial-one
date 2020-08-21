import { classes } from 'polytype'

import { Animations } from '~/Config/constants'
import { LootChestBehaviour } from '~/Behaviours/LootChestBehaviour'
import { CanAnimate, IAnimations } from '~/Mixins/CanAnimate'
import { ShouldDisplay } from '~/Mixins/ShouldDisplay'
import { IsImovable } from '~/Mixins/IsImovable'
import { ContainsItems } from '~/Mixins/ContainsItems'
import { ILootTable } from '~/Items/Loot'

export class ContainerChest
  extends classes(
    Phaser.GameObjects.Container,
    CanAnimate,
    IsImovable,
    ShouldDisplay,
    ContainsItems,
  ) {

  key = 'ContainerChest'
  footprintWidth = 16
  footprintHeight = 6
  width = 16
  height = 16
  speed = 0
  isInvincible = true
  isOpen = false
  contents = true
  loot: ILootTable = [
    { from: '/loot/currency', luck: 1, stack: '5-100' },
    { from: '/loot/gems', luck: 0.05, stack: '1-2' },
    { from: '/loot/jewellry', luck: 0.05, stack: 1 },
    { from: '/loot/artifacts', luck: 1, stack: 1 },
    { from: '/loot/armour', luck: 0.01, stack: 1 },
    { from: '/loot/weapons/swords', luck: 1, depth: Infinity, stack: 1 },
    { from: '/loot/weapons/spears', luck: 1, depth: Infinity, stack: 1 },
    { from: '/loot/weapons/bows', luck: 1, depth: Infinity, stack: 1 }
  ]

  behaviours = {
    default: LootChestBehaviour
  }

  animations: IAnimations = {
    default: {
      default: { anim: Animations.LootChestIdle }
    },
    idle: {
      default: { anim: Animations.LootChestIdle }
    },
    open: {
      default: { anim: Animations.LootChestOpenEmpty },
      full: { anim: Animations.LootChestOpenFull },
      empty: { anim: Animations.LootChestOpenEmpty }
    },
    close: {
      default: { anim: Animations.LootChestCloseEmpty },
      full: { anim: Animations.LootChestCloseFull },
      empty: { anim: Animations.LootChestCloseEmpty }
    },
  }
}
