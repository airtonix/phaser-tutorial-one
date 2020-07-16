import { Player } from './Player'
import { Animations } from '~/constants'
import { CanAnimate } from '~/Interfaces/CanAnimate'

export class Warrior {
    constructor () {
        this.key = 'WarriorPlayer'
        this.width = 16
        this.height = 32
        this.speed = 55
        this.footprintHeight = 8
        this.footprintWidth = 12
        this.animations = {
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
}

export const PlayerWarrior = Player(Warrior)