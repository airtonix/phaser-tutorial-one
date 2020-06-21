import Phaser from 'phaser'

export class BaseSprite extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y, name) {
    super(scene, x, y, name)
    scene.add.existing(this)
  }
}
