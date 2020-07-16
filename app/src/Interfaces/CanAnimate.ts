import { Constructor } from "~/Base";
import { Orientation } from '~/constants'
import { get } from 'lodash'
import { WritesLogs } from './WritesLogs'

export interface IAnimationSheetConfig {
    key: string,
    frameRate: integer,
    repeat: integer,
    padding: integer,
    frames: integer[],
    sheet: string,
}

export interface IAnimationConfig {
    flip: boolean,
    anim: IAnimationSheetConfig
}

export interface IAnimationGroup {
    default?: IAnimationConfig
    [animationVariant: string]: IAnimationConfig
}

export interface IAnimations {
    [animationGroup: string]: IAnimationGroup
}

export function CanAnimate<TBase extends Constructor>(Base: TBase) {
    return class CanAnimate extends WritesLogs(Base) {
        sprite: Phaser.GameObjects.Sprite
        active: boolean = true
        animations: IAnimations
        orientation: string
        isIdle: boolean

        constructor(...props: any[]) {
            super(...props)
            this.log('CanAnimate')
        }

        animate (animation: IAnimationConfig) {
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

        getAnimation (action: string, variant: string) {
            if (!this.animations) return

            return get(
                this.animations, [action, variant],
                get(this.animations, [ action, 'default' ], {})
            )
        }

        animateMovement = (time: integer, delta: integer) => {
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