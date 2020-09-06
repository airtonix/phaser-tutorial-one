import Phaser from 'phaser'

import { CharacterGameObject } from '../Characters/Character'

import { Store } from '~/Store'
import { NoActiveCharacterError } from '~/Store/Character/Exceptions'

export interface IActorUiConfig {
  key: string,
  x: number,
  y: number,
  onClick?: CallableFunction
}

export class ActorUi extends Phaser.GameObjects.Container {
    static key = 'ActorUi'

    avatar: CharacterGameObject
    border: Phaser.GameObjects.Graphics
    bg: Phaser.GameObjects.Graphics


    constructor (
      scene: Phaser.Scene,
      config: IActorUiConfig
    ) {
      super(scene, config.x || 0, config.y || 0)

      this.bg = new Phaser.GameObjects.Graphics(
        scene,
        {x: 32, y: 32}
      )
      this.bg.fillStyle(0x222222, 1)
      this.bg.fillCircle(0, 0, 16)

      this.border = new Phaser.GameObjects.Graphics(
        scene,
        {x: 32, y: 32}
      )
      this.border.lineStyle(2,0x666666, 0.6)
      this.border.strokeCircle(0, 0, 16)

      this.avatar = this.createAvatar()

      if (config.onClick) {
        this.setInteractive(new Phaser.Geom.Circle(32, 32, 18), Phaser.Geom.Circle.Contains)
          .on('pointerdown', config.onClick)
        this.scene.input.enableDebug(this);

      }

      scene.add.existing(this)
    }

    createAvatar (): CharacterGameObject {
      const character = Store.player && Store.player.character
      if (!character) throw new NoActiveCharacterError()

      const avatar = character.createGameObject(this.scene)
      this.add(avatar)
      return avatar
    }

    update (): void {
      this.avatar.update()
    }
}
