import { get } from 'lodash'
import { Animations, Nineslices } from '~/constants'
import { LootChestBehaviour } from '~/Behaviours/LootChestBehaviour'
import { CanAnimate, IAnimationConfig } from '~/Mixins/CanAnimate'
import { ShouldDisplay } from '~/Mixins/ShouldDisplay'
import { IsImovable } from '~/Mixins/IsImovable'
import { IsInteractive } from '~/Mixins/IsInteractive'
import { ContainsItems } from '~/Mixins/ContainsItems'

class LootChest extends Phaser.GameObjects.Container {

    key = 'LootChest'
    footprintWidth = 16
    footprintHeight = 6
    width = 16
    height = 16
    speed = 0
    isInvincible = true
    isOpen = false
    contents = true
    loot = [
        {from: '/loot/currency', luck: 0.4, stack: '1-4' },
        {from: '/loot/gems', luck: 0.2, stack: '1-2' },
        {from: '/loot/jewellry', luck: 0.2, stack: 1 },
        {from: '/loot/artifacts', luck: 0.1, stack: 1 },
        {from: '/loot/armour', luck: 0.2, stack: 1 },
        {from: '/loot/weapons', luck: 0.2, stack: 1 }
    ]

    behaviours = {
        default: LootChestBehaviour
    }

    animations = {
        idle: {
            default: {
                anim: Animations.LootChestIdle
            }
        },
        open: {
            full: {
                anim: Animations.LootChestOpenFull
            },
            empty: {
                anim: Animations.LootChestOpenEmpty
            }
        },
        close: {
            full: {
                anim: Animations.LootChestCloseFull
            },
            empty: {
                anim: Animations.LootChestCloseEmpty
            }
        },
    }
}

export const LootChestThing = CanAnimate(IsImovable(ShouldDisplay(IsInteractive(ContainsItems(LootChest)))))