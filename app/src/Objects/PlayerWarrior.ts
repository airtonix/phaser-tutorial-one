import { Animations, SpriteSheets } from '~/constants'
import { IsPlayerControlled } from '~/Mixins/IsPlayerControlled'
import { CanInteract } from '~/Mixins/CanInteract'
import { CanAnimate } from '~/Mixins/CanAnimate'
import { CanEmote } from '~/Mixins/CanEmote'
import { ShouldDisplay } from '~/Mixins/ShouldDisplay'
import { CanMove } from '~/Mixins/CanMove'


@CanAnimate
@CanEmote
@ShouldDisplay
export class Warrior extends Phaser.GameObjects.Container {
    key = 'WarriorPlayer'
    width = 16
    height = 32
    speed = 55
    footprintHeight = 8
    footprintWidth = 12
    usageDistance = 30
    animations = {
        idle: {
            default: { anim: Animations.PlayerWarriorIdle }
        },
        moving: {
            down: {anim: Animations.PlayerWarriorMove },
            up: {anim: Animations.PlayerWarriorMove },
            left: {flip: true, anim: Animations.PlayerWarriorMove },
            right: {flip: false, anim: Animations.PlayerWarriorMove },
        },
        jump: {
            default: { anim: Animations.PlayerWarriorJump },
        }
    }
}

@IsPlayerControlled
@CanMove
@CanInteract
export class PlayerWarrior extends Warrior {}