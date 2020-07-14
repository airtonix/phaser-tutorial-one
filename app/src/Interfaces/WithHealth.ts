import Health from 'phaser-component-health'

export class WithHealth {
    on: Function
    behaviour: object
    active: boolean

    createHealthManager () {
        const {
            health: {
                min = 0,
                max = 100,
                regen = 5,
                invincible = false
            } = {}
        } = this.props

        if (invincible) return

        const healthManager = Health.AddTo(
            this,
            min,
            max)

        this.on('die', this.handleDeath)
        this.on('revive', this.handleRevived)
        this.on('healthchange', this.handleHealthChanged)
        this.on('heal', this.handleRecieveHealing)
        this.on('damage', this.handleRecieveDamage)

        return healthManager
    }

    handleHealthChanged (obj, amount, health, maxHealth) {
        if (!this.active) return

        super.handleHealthChanged(obj, amount, health, maxHealth)
        // this.healthbar.set(amount)
    }

    handleDeath () {
        if(!this.active) return
        const {
            animations: { death }
        } = this.props
        this.log('handleDeath')
        const sprite = this.sprite

        sprite
            .setActive(false)
            .setVisible(false)

        this.animate(death)
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