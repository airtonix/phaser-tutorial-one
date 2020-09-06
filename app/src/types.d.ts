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
  export function unflatten (input: Composed, options?: IUnflattenOptions): Composed
  export default function flatten (input: Composed, options?: IUnflattenOptions): Composed
}


declare module 'phaser3-rex-plugins/templates/ui/ui-components' {

  class RoundRectangle extends Phaser.GameObjects.GameObject {

    /**
    *
    * @param scene
    * @param x
    * @param y
    * @param width
    * @param height
    * @param radiusConfig
    * @param fillColor
    * @param fillAlpha
    */
    constructor (scene : any, x : number, y : number, width : number, height : number, radiusConfig : number, fillColor?: number, fillAlpha?: number);

    /**
    *
    * @return
    */
    updateData(): /* RoundRectangle.prototype.+RoundRectangle */ any;

    /**
    *
    * @param width
    * @param height
    * @return
    */
    resize(width : any, height : any): /* !this */ any;

    /**
    *
    * @param iteration
    * @return
    */
    setIteration(iteration : number): /* !this */ any;

    /**
    *
    * @param value
    * @return
    */
    setRadius(value : number): /* !this */ any;

    /**
    *
    * @param value
    * @return
    */
    setCornerRadius(value : any): RoundRectangle;

    /**
    *
    */
    iteration : number;

    /**
    *
    */
    radius : number;
  }
  class NumberBar extends Phaser.GameObjects.GameObject {

    /**
     *
     * @param scene
     * @param config
     */
    constructor (scene : Phaser.Scene, config : any);

    layout (): void
    /**
     *
     * @param enable
     * @return
     */
    setEnable(enable : boolean): /* NumberBar.prototype.+NumberBar */ any;

    /**
     *
     */
    value : number;

    /**
     *
     * @param value
     * @param min
     * @param max
     * @return
     */
    setValue(value : any, min?: any, max?: any): /* !this */ any;

    /**
     *
     * @param inc
     * @param min
     * @param max
     * @return
     */
    addValue(inc : any, min : any, max : any): /* !this */ any;

    /**
     *
     * @param min
     * @param max
     * @return
     */
    getValue(min : any, max : any): /* !this.value */ any;

    /**
     *
     */
    text : string;

    /**
     *
     * @param value
     * @return
     */
    setText(value : any): /* !this */ any;

    /**
     *
     */
    type : string;
  }

  export {
    RoundRectangle,
    NumberBar
  }
}
