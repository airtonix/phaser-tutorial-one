import { throttle, debounce } from 'lodash'

import { WritesLogs } from './WritesLogs';
import { EVENT_KEY_SHOW_EMOTE } from './CanEmote';

import { Emotes } from '~/Config/constants';
import { Constructor } from '~/Core/framework'
import { getDistance, position } from '~/Core/distance';
import { EVENT_KEY_USE } from '~/Mixins/IsInteractive'


export function CanInteract<TBase extends Constructor> (Base: TBase) {
    return class CanInteract extends WritesLogs(Base) {
        interactables: Phaser.GameObjects.GameObject[]
        usageDistance: integer

        constructor (...args: any[]) {
            super(...args)
            this.log('CanInteract')
            this.interactables = []
            this.on('collide', throttle(this.handleCollide, 500))
        }

        handleCollide = ({actors}) => {
            const targets = (Array.isArray(actors) && actors || [actors])
                .filter(actor => actor.key !== this.key)

            // add new targets to list if they're not already in the list
            this.interactables = targets
                .filter(target => !this.interactables.includes(target))
                .reduce(
                    (result, target) => ([ ...result, target ]),
                    this.interactables
                )

            this.removeNoInteractables()

        }

        use = debounce(() => {
            this.log('use', this.interactables)
            const [ target, ..._] = (this.interactables || [])

            if (!target || typeof target.emit != 'function') {
                this.log('Nothing Interactable')
                // TODO: the emote used needs to be configured by the base class
                this.emit(EVENT_KEY_SHOW_EMOTE, {
                    frame: Emotes.Default.frames.Query
                }, 1500)
                return
            }

            target.emit(EVENT_KEY_USE, { actor: this })
        }, 150, { leading: true, trailing: false })

        removeNoInteractables = () => {
            const myPosition = position(this)
            const interactables = this.interactables
                .filter(target => target.active)
                .filter(target => {
                    const theirPosition = position(target)
                    const distance = getDistance(myPosition, theirPosition)
                    const isCloseEnough = distance <= this.usageDistance
                    return isCloseEnough
                })
            this.interactables = interactables

            // if we still have anything nearby,
            // check again in a few milliseconds
            if (this.interactables.length > 0) {
                setTimeout(this.removeNoInteractables.bind(this), 500)
            }
        }

    }
}