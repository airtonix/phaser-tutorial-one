import { Player } from './Player'
import { Animations } from '~/constants'
import { CanAnimate } from '~/Interfaces/CanAnimate'

export class Warrior extends Phaser.GameObjects.Container {
    key = 'WarriorPlayer'
    width = 16
    height = 32
    speed = 55
    footprintHeight = 8
    footprintWidth = 12
    animations = {
        idle: {
            default: { anim: Animations.PlayerWarriorIdle }
        },
        moving: {
            down: {anim: Animations.PlayerWarriorMove },
            up: {anim: Animations.PlayerWarriorMove },
            left: {flip: true, anim: Animations.PlayerWarriorMove },
            right: {flip: false, anim: Animations.PlayerWarriorMove },
        }
    }
}

export const PlayerWarrior = Player(Warrior)