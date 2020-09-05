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
      LeftDown: {flip: true, anim: Animations.WarriorMove },
      Left: {flip: true, anim: Animations.WarriorMove },
      LeftUp: {flip: true, anim: Animations.WarriorMove },
      Up: {anim: Animations.WarriorMove },
      RightUp: {flip: false, anim: Animations.WarriorMove },
      Right: {flip: false, anim: Animations.WarriorMove },
      RightDown: {flip: false, anim: Animations.WarriorMove },
      Down: {anim: Animations.WarriorMove },
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
