export interface IAnimatedTile {
    tileid: number
    duration: number
}
export interface IAnimatedTiles extends Array<IAnimatedTile> {}

export class AnimatedTile {

  constructor (
    private tile: Phaser.Tilemaps.Tile,
    private tileAnimationData: IAnimatedTiles,
    private firstgid: number,
    private elapsedTime: number = 0,
    private animationDuration: number = 100
  ) {
    this.tile = tile
    this.tileAnimationData = tileAnimationData
    this.firstgid = firstgid
    this.elapsedTime = 0
    this.animationDuration = tileAnimationData[0].duration * tileAnimationData.length
  }

  update (delta: number): void {
    this.elapsedTime += delta
    this.elapsedTime %= this.animationDuration

    const animatonFrameIndex = Math.floor(this.elapsedTime / this.tileAnimationData[0].duration)

    this.tile.index = this.tileAnimationData[animatonFrameIndex].tileid + this.firstgid
  }
}