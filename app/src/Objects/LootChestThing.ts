import { get } from 'lodash'
import { State } from 'mistreevous'
import { Animations } from '~/constants'
import { getDistance, isWithin, position } from '~/Core/distance'
import { LootChestBehaviour } from '~/Behaviours/LootChestBehaviour'
import { CanAnimate, IAnimationConfig } from '~/Mixins/CanAnimate'
import { ShouldDisplay } from '~/Mixins/ShouldDisplay'
import { IsImovable } from '~/Mixins/IsImovable'
import { IsInteractive } from '~/Mixins/IsInteractive'

class LootChest extends Phaser.GameObjects.Container {
    static LID_STATE_CLOSED = 'close'
    static LID_STATE_OPENED = 'open'
    static CONTENT_STATE_FULL = 'full'
    static CONTENT_STATE_EMPTY = 'empty'

    key = 'LootChest'
    footprintWidth = 16
    footprintHeight = 6
    width = 16
    height = 16
    speed = 0
    isInvincible = true
    isOpen = false
    contents = true
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

    handlePerformUse (...args: any[]) {
        this.isOpen = !this.isOpen
        const lidState = this.isOpen
            ? LootChest.LID_STATE_OPENED
            : LootChest.LID_STATE_CLOSED
        const contentState = this.contents
            ? LootChest.CONTENT_STATE_FULL
            : LootChest.CONTENT_STATE_EMPTY

        this.log('onPerformUse', lidState, contentState)

        const animation: IAnimationConfig = get(
            this.animations, [lidState, contentState],
            this.animations.idle.default
        )
        this.log('onPerformUse', animation)
        this.animate(animation)
    }
}

export const LootChestThing = CanAnimate(IsImovable(ShouldDisplay(IsInteractive(LootChest))))