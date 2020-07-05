import { Player } from './Player'
import { Animations } from '~/constants'

export class PlayerWarrior extends Player {
    constructor (props) {
        super({
            key: 'Warrior',
            footprintHeight: 8,
            footprintWidth: 16,
            width: 16,
            height: 32,
            idleAnimation: {
                all: { anim: Animations.PlayerWarriorIdle },
            },
            movingAnimation: {
                down: {flip: true, anim: Animations.PlayerWarriorMove },
                up: {flip: true, anim: Animations.PlayerWarriorMove },
                left: {flip: true, anim: Animations.PlayerWarriorMove },
                right: {flip: false, anim: Animations.PlayerWarriorMove },
            },
            ...props
        })
    }
}