
export class IsPlaceable extends Phaser.GameObjects.Container {

  place (
    x: number,
    y: number,
    depth: number
  ): void {
    this.setPosition(x, y)

    if (depth) {
      this.setDepth(depth)
    }
  }
}