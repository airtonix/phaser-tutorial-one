import { TILE_MAPPING } from './GameSceneConstants'
import { MapScene } from './MapScene'

export class LevelOneScene extends MapScene {
    static Db = {
        tilesets: [ 'tiles' ],
        layers: [
            { name: 'ground', tilset: 'tiles',
                collisions: {
                    exclusion: [ -1, 6, 7, 8, 26, ]
                }
            },
            { name: 'items', tilset: 'tiles',
                collision: {
                    exclusion: [-1, TILE_MAPPING.TOWER]
                },
            },
        ]
    }

    constructor() {
        super({ key: 'LevelOne', db: LevelOneScene.Db })
    }
}
