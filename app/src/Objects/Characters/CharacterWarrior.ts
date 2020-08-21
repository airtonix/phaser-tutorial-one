import { classes } from 'polytype'

import { Animations } from '~/Config/constants'
import { CanInteract } from '~/Mixins/CanInteract'
import { CanMove } from '~/Mixins/CanMove'
import { IAnimations } from '~/Mixins/CanAnimate'

import { Character } from './Character'

export class Warrior
  extends classes(
    Character,
    CanMove,
    CanInteract
  ) {
    key = 'Warrior'
    width = 16
    height = 32
    speed = 55
    footprintHeight = 8
    footprintWidth = 12
    usageDistance = 30
    animations: IAnimations = {
      default: {
        default: { anim: Animations.WarriorIdle }
      },
      idle: {
        default: { anim: Animations.WarriorIdle }
      },
      moving: {
        default: { anim: Animations.WarriorMove },
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
