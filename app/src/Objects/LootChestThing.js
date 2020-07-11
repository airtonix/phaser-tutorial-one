import { State } from 'mistreevous'
import { Thing } from './Thing'
import { Animations, SpriteSheets } from '~/constants'
import { LootChestBehaviour } from '~/Behaviours/LootChestBehaviour'

const diff = (num1, num2) => {
    if (num1 > num2) {
        return (num1 - num2)
    } else {
        return (num2 - num1)
    }
}

const getDistance = (x1, y1, x2, y2) => {
    var deltaX = diff(x1, x2)
    var deltaY = diff(y1, y2)
    var dist   = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
    return (dist)
}


export class LootChestThing extends Thing {
    lastGreetedPlayer = null

    constructor(props) {
        super({
            key: 'LootChest',
            footprintHeight: 16,
            footprintWidth: 16,
            width: 16,
            height: 16,
            speed: 0,
            health: {
                invincible: true
            },
            behaviours: {
                default: LootChestBehaviour
            },
            emotes: {
                width: 16,
                height: 16,
                sheet: SpriteSheets.EmotesStyleOne.key,
                frames: {
                    Helpful: 7,
                    Close: 23,
                    Exclamation: 22,
                    Star: 10,
                    Cash: 9
                }
            },
            idleAnimation: {
                all: { anim: Animations.LootChestIdle },
                full: { anim: Animations.LootChestFull },
                empty: { anim: Animations.LootChestEmpty }
            },
            ...props
        })

        this.setBehaviour(this.behaviours.default)
        this.addShadowSprite()

    }

    isPlayerTouchingMe () {
        const player = this.scene?.player
        if (!player) return State.FAILED

        const yesno = getDistance(
            player.x, player.y,
            this.x, this.y
        ) < 10
        this.log('isPlayerTouchingMe', yesno)
        return yesno
    }

    hasNotYetGreetedPlayer () {
        const player = this.scene?.player
        return !player || !this.lastGreetedPlayer
    }

    forgetAboutPlayer () {
        this.log('forgetting player')
        this.lastGreetedPlayer = null
    }

    showEmote (emote) {
        this.log('showEmote', emote)
        this.showEmoteFrame(emote)
        this.lastGreetedPlayer = Date.now()
    }
    hideEmote () {
        this.log('hideEmote')
        this.emote.setVisible(false)
        return State.SUCCEEDED
    }
    showHelpfulEmote () {
        this.showEmote(this.props.emotes.frames.Helpful)
        return State.SUCCEEDED
    }
    showExclamationEmote () {
        this.showEmote(this.props.emotes.frames.Exclamation)
        return State.SUCCEEDED
    }
    showClosedEmote () {
        this.showEmote(this.props.emotes.frames.Closed)
        return State.SUCCEEDED
    }
    showStarEmote () {
        this.showEmote(this.props.emotes.frames.Star)
        return State.SUCCEEDED
    }
    showCashEmote () {
        this.showEmote(this.props.emotes.frames.Cash)
        return State.SUCCEEDED
    }
}