import { WorldEntityGameObject } from '~/Objects/WorldEntity';

export interface ControlStrategyConstructor {
  new (
    scene: Phaser.Scene,
    entity: WorldEntityGameObject
  ): ControlStrategy
}

export interface IControlStrategy {
  init (): void
  update (): void
}

export class ControlStrategy implements IControlStrategy {
  constructor (
    public scene: Phaser.Scene,
    public entity: WorldEntityGameObject
  ) {
    this.init()
    scene.events.on('update', this.update)
  }

  public init (): void {
    return
  }

  public update (): void {
    return
  }
  
}