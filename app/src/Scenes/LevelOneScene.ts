import { TiledTileMaps } from '~/Config/constants'

import { MapScene } from './MapScene'


export class LevelOneScene extends MapScene {
    static key = 'LevelOneScene'

    constructor () {
      super({
        key: LevelOneScene.key,
        data: {
          ...TiledTileMaps.LevelOne,
          layers: [
            { key: 'Ground' },
            { key: 'Objects' },
            { key: 'Walls' },
            { key: 'Overhead' },
            { key: 'Obstacles' },
          ]
        },
      })
      this.log('constructed')
    }
}
