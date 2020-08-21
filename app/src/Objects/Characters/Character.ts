import { classes } from 'polytype'

import { CanAnimate } from '~/Mixins/CanAnimate'
import { CanEmote } from '~/Mixins/CanEmote'
import { ShouldDisplay } from '~/Mixins/ShouldDisplay'

export class Character
  extends classes(
    Phaser.GameObjects.Container,
    CanAnimate,
    CanEmote,
    ShouldDisplay
  ) {
  constructor (scene: Phaser.Scene) {
    super(
      {super: Phaser.GameObjects.Container, arguments: [ scene ]}
    )
  }

  init (): void {
    super.init()
    this.scene.events.on('update', this.update, this);
    this.scene.events.once('shutdown', this.destroy, this);
  }

  destroy () : void {
    if (this.scene) this.scene.events.off('update', this.update, this);
    super.destroy();
  }
}