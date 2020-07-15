import { Mixin } from "ts-mixer";
import { Player } from './Player'
import { Animations } from '~/constants'
import { WritesLogs } from "~/Interfaces/WritesLogs";
import { CanAnimate } from "~/Interfaces/CanAnimate";

export class PlayerWarrior extends Mixin(Player) {

    constructor (...props) {
        super(...props)
        console.log('PlayerWarrior')
    }

    init (...props) {
        console.log('PlayerWarrior.init', props)

        this.footprintHeight = 8
        this.footprintHeight = 12
        this.width = 16
        this.height = 32
        this.speed = 55
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

        super.init(...props)
    }
}