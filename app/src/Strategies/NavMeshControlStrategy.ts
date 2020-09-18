import { PhaserNavmesh } from 'phaser-navmesh'
import { set } from 'lodash'

import { WorldEntityGameObject } from '~/Objects/WorldEntity'

import { ControlStrategy } from './ControlStrategy'

export class NavMeshControlStrategy extends ControlStrategy {
  constructor (
      public scene: Phaser.Scene,
      public entity: WorldEntityGameObject,
      public navMesh: PhaserNavmesh
  ) {
    super(scene, entity)
  }

  update (): void {
    super.update()
    // this.setOrientation()
  }

}