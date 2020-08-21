export class IsImovable extends Phaser.GameObjects.Container {
  body: Phaser.Physics.Arcade.Body

  constructor (
    scene: Phaser.Scene,
    x: number,
    y: number
  ) {
    super(scene, x, y)
    this.body.immovable = true;
    this.body.moves = false;
  }
}
