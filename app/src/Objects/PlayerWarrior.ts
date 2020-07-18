import { Animations, SpriteSheets } from '~/constants'
import { IsPlayerControlled } from '~/Mixins/IsPlayerControlled'

export class Warrior extends Phaser.GameObjects.Container {
    key = 'WarriorPlayer'
    width = 12
    height = 6
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
        },
        jump: {
            default: { anim: Animations.PlayerWarriorJump },
        }
    }
}

export const PlayerWarrior = IsPlayerControlled(Warrior)