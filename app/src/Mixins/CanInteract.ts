import { throttle, debounce } from 'lodash'
import { Constructor } from '~/Core/framework'
import { WritesLogs } from "./WritesLogs";
import { Emotes } from "~/constants";
import { isWithin, position } from '~/Core/distance';

export function CanInteract<TBase extends Constructor>(Base: TBase) {
    return class CanInteract extends WritesLogs(Base) {
        interactables: Phaser.GameObjects.GameObject[]

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
        }

        update (...args: any[]) {
            super.update(...args)
            this.removeNoInteractables()
        }

        use = debounce(() => {
            this.log('use', this.interactables)
            const [ target, ..._] = (this.interactables || [])

            if (!target || typeof target.emit != 'function') {
                this.log('Nothing Interactable')
                this.emit('show-emote', { frame: Emotes.Default.frames.Query }, 1500)
                return
            }

            target.emit('perform-use')
        }, 150, { leading: true, trailing: false })

        removeNoInteractables = () => {
            const interactables = this.interactables
                .filter(target => target.active)
                .filter(target => {
                    return isWithin(
                        20,
                        position(this),
                        position(target)
                    )
                })
            this.interactables = interactables
        }

    }
}