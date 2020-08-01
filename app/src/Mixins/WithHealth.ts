import Health from 'phaser-component-health'

import { CanAnimate, IAnimationConfig } from './CanAnimate'
import { WritesLogs } from './WritesLogs'

import { Constructor } from '~/Core/framework'

export function WithHealth<Tbase extends Constructor<{}>> (Base: Tbase) {
    return class WithHealth extends CanAnimate(WritesLogs(Base)) {
        on: CallableFunction
        behaviour: any
        active: boolean
        minHealth: integer = 0
        maxHealth: integer = 100
        regenHealthRate: integer = 5
        isInvincible = false
        health: Health
        sprite: Phaser.GameObjects.Sprite

        constructor (...args: any[]) {
            super(...args)
            this.log('WithHealth')
            this.health = this.createHealthManager()
        }

        createHealthManager () : Health {
            if (this.isInvincible) return

            const health = Health.AddTo(
                this, this.minHealth, this.maxHealth)

            this.on('die', this.handleDeath)
            this.on('revive', this.handleRevived)
            this.on('healthchange', this.handleHealthChanged)
            this.on('heal', this.handleRecieveHealing)
            this.on('damage', this.handleRecieveDamage)

            return health
        }

        handleDeath () {
            if(!this.active) return

            this.log('handleDeath')
            const sprite = this.sprite

            sprite
                .setActive(false)
                .setVisible(false)

            const animation: IAnimationConfig = this.animations?.death?.default
            this.animate(animation)
        }

        handleRevived () {
            if(!this.active) return
            const {
                animations: { revive }
            } = this.props
            this.log('handleRevived')
            const sprite = this.sprite

            sprite.setActive(true)
            sprite.setVisible(true)

            this.animate(revive)
        }

        handleHealthChanged (obj, amount, health, maxHealth) {
            if(!this.active) return

            this.log('handleHealthChange', { amount, health, maxHealth })
        }

        handleRecieveHealing () {
            if(!this.active) return

            this.log('handleRecieveHealing')
        }

        handleRecieveDamage () {
            if(!this.active) return
            const {
                animations: { damaged }
            } = this.props
            this.log('handleRecieveDamage')
            this.animate(damaged)
        }

    }
}