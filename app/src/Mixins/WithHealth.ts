import Health from 'phaser-component-health'

import { CanAnimate } from './CanAnimate'


export class WithHealth extends CanAnimate {
  active: boolean
  minHealth: integer = 0
  maxHealth: integer = 100
  regenHealthRate: integer = 5
  isInvincible = false
  health: typeof Health
  sprite: Phaser.GameObjects.Sprite

  constructor (
    scene: Phaser.Scene,
    x: number,
    y: number
  ) {
    super(scene, x, y)
    this.createHealthManager()
  }

  createHealthManager (): void {
    Health.AddTo(
      this,
      this.minHealth,
      this.isInvincible
        ? Infinity
        : this.maxHealth
    )

    this.on('die', this.handleDeath)
    this.on('revive', this.handleRevived)
    this.on('healthchange', this.handleHealthChanged)
    this.on('heal', this.handleRecieveHealing)
    this.on('damage', this.handleRecieveDamage)
  }

  handleHealthChanged = (...args: any[]): void => {
    console.log('healthChanged', ...args)
  }

  handleDeath (): void {
    if (!this.active) return

    const animation = this.getAnimation('death', this.orientation)
    const sprite = this.sprite

    sprite
      .setActive(false)
      .setVisible(false)

    this.animate(animation)
  }

  handleRevived (): void {
    if (!this.active) return

    const animation = this.getAnimation('revive', this.orientation)

    const sprite = this.sprite
    sprite.setActive(true)
    sprite.setVisible(true)

    this.animate(animation)
  }

  handleRecieveHealing (): void {
    if (!this.active) return

    const animation = this.getAnimation('healed', this.orientation)

    this.animate(animation)
  }

  handleRecieveDamage (): void {
    if (!this.active) return

    const animation = this.getAnimation('damaged', this.orientation)

    this.animate(animation)
  }

}