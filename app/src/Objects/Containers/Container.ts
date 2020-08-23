import { WorldEntity } from '../WorldEntity';

import { DisplayableEntity } from '~/Mixins/Displayable';

export class Container extends WorldEntity {
  constructor (
    public scene: Phaser.Scene,
    public x: number,
    public y: number
  ) {
    this.renderer = new DisplayableEntity(this, this.width, this.height)
  }
}