import Phaser from 'phaser'

export class BaseImage extends Phaser.GameObjects.Image {
  constructor (scene, x, y, name = this.name) {
    super(scene, x, y, name)
    scene.add.existing(this)
  }
}
