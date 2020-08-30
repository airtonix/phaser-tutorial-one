declare module 'phaser-component-health' {
  const Health: {
    AddTo (
      obj: Phaser.GameObjects.GameObject,
      health: number,
      maxHealth: number
    ): Phaser.GameObjects.GameObject
  }

  export = Health
}

declare module 'phaser-navmesh' {
  interface IPoint {
    x: number,
    y: number,
  }
  interface IPath extends Array<IPoint> {}
  export class PhaserNavmesh {
    findPath(
      here: IPoint,
      there: IPoint
    ): IPath

    debugDrawClear(): void

    debugDrawPath(
      path: IPath,
      color: number
    ): void

    enableDebug(
      graphics: Phaser.GameObjects.Graphics
    ): void
    disableDebug(): void
  }

  export default class PhaserNavmeshPlugin {
    buildMeshFromTiled(
      key: string,
      objectLayer: Phaser.Tilemaps.ObjectLayer,
      padding: number
    ): PhaserNavmesh
  }
}

declare module 'flat' {
  interface Composed {
    [key: string]:
      string |
      string[] |
      number |
      number[] |
      boolean |
      boolean[] |
      Composed |
      Composed[]
  }
  interface IUnflattenOptions {
    delimiter?: string,
    safe?: boolean,
    object?: boolean,
    overwrite?: boolean,
    maxDepth?: number,
    transformKey?: (key: string) => string,
  }
  export function unflatten (input: Composed, options?: IUnflattenOptions): Composed {}
  export default function flatten (input: Composed, options?: IUnflattenOptions): Composed {}
}
