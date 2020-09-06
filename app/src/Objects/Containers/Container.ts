import { WorldEntityGameObject } from '../WorldEntity';

import { DisplayableEntity } from '~/Mixins/Displayable';

export class ContainerGameObject extends WorldEntityGameObject {
  constructor (
    public scene: Phaser.Scene,
    public x: number,
    public y: number
  ) {
    super(scene, x, y)
    this.renderer = new DisplayableEntity(
      this,
      this.scene,
      this.width,
      this.height,
      this.animations
    )
  }
}
