import { Animations } from '~/Config/constants'

import { Character } from './Character'

export class Warrior extends Character {
  key = 'Warrior'
  speed = 55
  spriteWidth = 16
  spriteHeight = 32
  footprintWidth = 12
  footprintHeight = 8
  usageDistance = 30
  animations = {
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
    }
  }

  constructor (
    scene: Phaser.Scene,
    x: number,
    y: number
  ) {
    super(scene, x, y)
    this.init()
  }

}
