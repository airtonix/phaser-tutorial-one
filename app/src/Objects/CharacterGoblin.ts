import { Animations } from '~/Config/constants'
import { IsPlayerControlled } from '~/Mixins/IsPlayerControlled'
import { CanInteract } from '~/Mixins/CanInteract'
import { CanAnimate } from '~/Mixins/CanAnimate'
import { CanEmote } from '~/Mixins/CanEmote'
import { ShouldDisplay } from '~/Mixins/ShouldDisplay'
import { CanMove } from '~/Mixins/CanMove'
import { WithBehaviour } from '~/Mixins/WithBehaviour'
import { SidekickCharacterBehaviour } from '~/Behaviours/SidekickCharacterBehaviour'


@CanAnimate
@CanEmote
@ShouldDisplay
export class Goblin extends Phaser.GameObjects.Container {
    key = 'Goblin'
    width = 16
    height = 16
    speed = 30
    footprintHeight = 8
    footprintWidth = 12
    usageDistance = 30
    animations = {
      idle: {
        default: { anim: Animations.GoblinIdle }
      },
      moving: {
        down: {anim: Animations.GoblinMove },
        up: {anim: Animations.GoblinMove },
        left: {flip: true, anim: Animations.GoblinMove },
        right: {flip: false, anim: Animations.GoblinMove },
      },
      jump: {
        default: { anim: Animations.GoblinJump },
      }
    }
}

@CanInteract
@CanMove
@IsPlayerControlled
export class PlayerGoblin extends Goblin {
  key = 'PlayerGoblin'
}

@CanMove
@WithBehaviour
export class SidekickGoblen extends Goblin {
  key = 'SidekickGoblen'
  behaviours = {
    default: SidekickCharacterBehaviour
  }

}
