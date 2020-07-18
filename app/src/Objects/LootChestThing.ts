import { State } from 'mistreevous'
import { Animations } from '~/constants'
import { LootChestBehaviour } from '~/Behaviours/LootChestBehaviour'
import { CanAnimate } from '~/Mixins/CanAnimate'
import { ShouldDisplay } from '~/Mixins/ShouldDisplay'
import { IsImovable } from '~/Mixins/IsImovable'
import { IsInteractive } from '~/Mixins/IsInteractive'



const diff = (num1, num2) => {
    if (num1 > num2) {
        return (num1 - num2)
    } else {
        return (num2 - num1)
    }
}

const getDistance = (x1, y1, x2, y2) => {
    var deltaX = diff(x1, x2)
    var deltaY = diff(y1, y2)
    var dist   = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
    return (dist)
}


class LootChest extends Phaser.GameObjects.Container {
    static STATE_CLOSED = 'closed'
    static STATE_OPENED = 'opened'

    requestedState = LootChest.STATE_CLOSED

    key = 'LootChest'
    footprintWidth = 16
    footprintHeight = 6
    width = 16
    height = 16
    speed = 0
    isInvincible = true
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
                anim: Animations.LootChestFull
            },
            empty: {
                anim: Animations.LootChestEmpty
            }
        }
    }

    isPlayerTouchingMe () {
        const player = this.scene?.player
        if (!player) return false

        const yesno = getDistance(
            player.x, player.y,
            this.x, this.y
        ) < 10
        return yesno
    }

    playerHasOpenedMe () {
        return this.requestedState === LootChestThing.STATE_OPENED
            ? State.SUCCEEDED
            : State.FAILED
    }

    playerHasClosedMe () {
        return this.requestedState === LootChestThing.STATE_CLOSED
            ? State.SUCCEEDED
            : State.FAILED
    }

    open () {
        this.log('open')
        const {
            animations: { open }
        } = this.props
        this.animate(open)
    }

    close () {
        this.log('close')
        const {
            animations: { open }
        } = this.props
        this.animate(open)
    }
}

export const LootChestThing = CanAnimate(IsImovable(ShouldDisplay(IsInteractive(LootChest))))