import { Thing } from './Thing'
import { Animations } from '~/constants'
import { LootChestBehaviour } from '~/Behaviours/LootChestBehaviour'

export class LootChestThing extends Thing {

    constructor(props) {
        super({
            key: 'LootChest',
            footprintHeight: 16,
            footprintWidth: 16,
            width: 16,
            height: 16,
            speed: 0,
            behaviours: {
                default: LootChestBehaviour
            },
            idleAnimation: {
                all: { anim: Animations.LootChestIdle },
                full: { anim: Animations.LootChestFull },
                empty: { anim: Animations.LootChestEmpty }
            },
            ...props
        })

        this.setBehaviour(this.behaviours.default)
        this.addShadowSprite(0xffffff)

    }

    isPlayerTouchingMe () {
        if (!this.scene?.player) return
    }

    showEmote (emote) {
        this.log('showEmote', emote)
    }
    showHelpfulEmote () {
        this.showEmote('helpful')
    }
    showExclamationEmote () {
        this.showEmote('exlamation')
    }
    showClosedEmote () {
        this.showEmote('closed')
    }
    showStarEmote () {
        this.showEmote('star')
    }
}