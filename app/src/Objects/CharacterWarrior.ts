import { Animations, SpriteSheets } from '~/Config/constants'
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
    key = 'Warrior'
    width = 16
    height = 32
    speed = 55
    footprintHeight = 8
    footprintWidth = 12
    usageDistance = 30
    animations = {
      idle: {
        default: { anim: Animations.WarriorIdle }
      },
      moving: {
        down: {anim: Animations.WarriorMove },
        up: {anim: Animations.WarriorMove },
        left: {flip: true, anim: Animations.WarriorMove },
        right: {flip: false, anim: Animations.WarriorMove },
      },
      jump: {
        default: { anim: Animations.WarriorJump },
      }
    }
}

@IsPlayerControlled
@CanMove
@CanInteract
export class PlayerWarrior extends Warrior {
  key = 'PlayerWarrior'
}
