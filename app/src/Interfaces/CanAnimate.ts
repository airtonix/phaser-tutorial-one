import { Orientation } from '~/constants'
import { get } from 'lodash'
import { WritesLogs } from './WritesLogs'
import { Constructor } from "~/Base";

export function CanAnimate<TBase extends Constructor>(Base: TBase) {
    return class CanAnimate extends WritesLogs(Base) {
        sprite: Phaser.GameObjects.Sprite
        active: boolean = true
        orientation: string
        isIdle: boolean

        constructor(...props: any[]) {
            super(...props)
            console.log('CanAnimate')
        }

        animate (animation) {
            if(!this.active) return
            if(!animation) return

            const { flip, anim } = animation

            if (typeof flip !== 'undefined') {
                this.sprite.setFlip(flip, false)
            }

            if (anim) {
                const { key } = anim
                this.sprite.play(key, true, 0)
            }
        }

        getAnimation (action, variant) {
            if (!this.animations) return

            return get(
                this.animations, [action, variant],
                get(this.animations, [ action, 'default' ], {})
            )
        }

        animateMovement = (time, delta) => {
            const animation = this.getAnimation('moving', this.orientation)
            this.animate(animation)
        }

        animateIdle = () => {
            if (!this.active) return
            const animation = this.getAnimation('idle', this.orientation)
            this.animate(animation)
            this.isIdle = true
        }

    }
}